<?php
/**
 * MusicMap public API.
 *
 *   Legacy (what the app uses, and what the old snippet served):
 *     GET  /?mm_action=ping
 *     POST /?mm_action=save            body: pack JSON          → {"ok":true,"code":"HX7K2M"}
 *     GET  /?mm_action=load&code=CODE                            → {"ok":true,"pack":{…},"views":N}
 *   REST (same behaviour):
 *     GET  /wp-json/musicmap/v1/ping
 *     POST /wp-json/musicmap/v1/packs
 *     GET  /wp-json/musicmap/v1/packs/CODE
 *
 * Everything here is public by design, so input is validated, sizes are capped and saves
 * are rate-limited per (hashed) visitor IP.
 */

defined( 'ABSPATH' ) || exit;

class MusicMap_Api {

	public static function init() {
		add_action( 'init', array( __CLASS__, 'handle_legacy' ), 0 );
		add_action( 'rest_api_init', array( __CLASS__, 'routes' ) );
	}

	// ── Visitor identity (hashed, never stored raw) ─────────────────────

	public static function client_ip() {
		$header = (string) MusicMap_Settings::get( 'trusted_ip_header' );
		if ( '' !== $header && ! empty( $_SERVER[ $header ] ) ) {
			$ip = trim( explode( ',', sanitize_text_field( wp_unslash( $_SERVER[ $header ] ) ) )[0] );
			if ( filter_var( $ip, FILTER_VALIDATE_IP ) ) {
				return $ip;
			}
		}
		$ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
		return filter_var( $ip, FILTER_VALIDATE_IP ) ? $ip : '0.0.0.0';
	}

	public static function ip_hash() {
		return hash_hmac( 'sha256', self::client_ip(), wp_salt( 'auth' ) );
	}

	// ── Core actions: return array( http_status, data ) ─────────────────

	public static function do_ping() {
		return array(
			200,
			array(
				'ok'      => true,
				'status'  => 'ok',
				'version' => MUSICMAP_VERSION,
			),
		);
	}

	public static function do_save( $raw ) {
		$max_bytes = (int) MusicMap_Settings::get( 'pack_max_kb' ) * 1024;
		if ( ! MusicMap_Store::rate_hit( self::ip_hash(), 'save', (int) MusicMap_Settings::get( 'save_rate_per_hour' ), HOUR_IN_SECONDS ) ) {
			return self::err( 429, 'Rate limit exceeded — try again later' );
		}
		if ( '' === $raw ) {
			return self::err( 400, 'Empty request body — no data received' );
		}
		if ( strlen( $raw ) > $max_bytes ) {
			return self::err( 413, 'Pack too large (' . strlen( $raw ) . ' bytes, max ' . $max_bytes . ')' );
		}
		$pack = json_decode( $raw, true, 32 );
		if ( JSON_ERROR_NONE !== json_last_error() || ! is_array( $pack ) ) {
			return self::err( 400, 'Pack must be a JSON object' );
		}
		if ( ! is_string( $pack['name'] ?? null ) || '' === trim( $pack['name'] ) ) {
			return self::err( 400, 'Missing required field: name' );
		}
		$has_tracks = is_array( $pack['tracks'] ?? null ) || is_array( $pack['videos'] ?? null );
		if ( ! $has_tracks || ! is_array( $pack['biomes'] ?? null ) ) {
			return self::err( 400, 'tracks and biomes must be arrays' );
		}
		$pack = self::clean( $pack );
		$code = MusicMap_Store::save_pack( $pack, self::ip_hash() );
		if ( '' === $code ) {
			return self::err( 500, 'Could not store the pack, please try again' );
		}
		return array(
			200,
			array(
				'ok'   => true,
				'code' => $code,
			),
		);
	}

	public static function do_load( $raw_code ) {
		$code = strtoupper( preg_replace( '/[^A-Za-z0-9]/', '', (string) $raw_code ) );
		if ( ! preg_match( MusicMap_Store::CODE_RE, $code ) ) {
			return self::err( 400, 'Invalid code format' );
		}
		$row = MusicMap_Store::load_pack( $code );
		if ( ! $row || ! is_array( $row['pack'] ) ) {
			return self::err( 404, 'Pack not found — code may have expired or been mistyped' );
		}
		return array(
			200,
			array(
				'ok'    => true,
				'pack'  => $row['pack'],
				'views' => (int) $row['views'],
			),
		);
	}

	/** Strip tags from every string (the app also escapes on render) and cap lengths. */
	private static function clean( $value ) {
		if ( is_array( $value ) ) {
			$out = array();
			foreach ( $value as $k => $v ) {
				$out[ is_int( $k ) ? $k : mb_substr( wp_strip_all_tags( (string) $k ), 0, 64 ) ] = self::clean( $v );
			}
			return $out;
		}
		if ( is_string( $value ) ) {
			return mb_substr( wp_strip_all_tags( $value ), 0, 2000 );
		}
		return is_bool( $value ) || is_int( $value ) || is_float( $value ) || null === $value ? $value : null;
	}

	private static function err( $status, $msg ) {
		return array(
			$status,
			array(
				'ok'    => false,
				'error' => $msg,
			),
		);
	}

	// ── Legacy ?mm_action= endpoint ─────────────────────────────────────

	public static function handle_legacy() {
		if ( ! isset( $_GET['mm_action'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification -- public API, no session
			return;
		}
		$action = strtolower( sanitize_key( wp_unslash( $_GET['mm_action'] ) ) ); // phpcs:ignore WordPress.Security.NonceVerification
		$method = isset( $_SERVER['REQUEST_METHOD'] ) ? strtoupper( sanitize_key( wp_unslash( $_SERVER['REQUEST_METHOD'] ) ) ) : 'GET';

		nocache_headers();
		header( 'Content-Type: application/json; charset=utf-8' );
		header( 'Access-Control-Allow-Origin: *' );
		header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
		header( 'Access-Control-Allow-Headers: Content-Type' );
		header( 'X-Content-Type-Options: nosniff' );

		if ( 'OPTIONS' === $method ) {
			status_header( 204 );
			exit;
		}

		switch ( $action ) {
			case 'ping':
				$res = self::do_ping();
				break;
			case 'save':
				$res = 'POST' === $method
					? self::do_save( (string) file_get_contents( 'php://input' ) )
					: self::err( 405, 'save requires POST' );
				break;
			case 'load':
				$res = self::do_load( isset( $_GET['code'] ) ? sanitize_text_field( wp_unslash( $_GET['code'] ) ) : '' ); // phpcs:ignore WordPress.Security.NonceVerification
				break;
			default:
				$res = self::err( 400, 'Unknown action' );
		}
		status_header( $res[0] );
		echo wp_json_encode( $res[1] );
		exit;
	}

	// ── REST routes ─────────────────────────────────────────────────────

	public static function routes() {
		register_rest_route(
			'musicmap/v1',
			'/ping',
			array(
				'methods'             => 'GET',
				'permission_callback' => '__return_true',
				'callback'            => function () {
					return self::rest( self::do_ping() );
				},
			)
		);
		register_rest_route(
			'musicmap/v1',
			'/packs',
			array(
				'methods'             => 'POST',
				'permission_callback' => '__return_true',
				'callback'            => function ( WP_REST_Request $req ) {
					return self::rest( self::do_save( (string) $req->get_body() ) );
				},
			)
		);
		register_rest_route(
			'musicmap/v1',
			'/packs/(?P<code>[A-Za-z0-9]{4,12})',
			array(
				'methods'             => 'GET',
				'permission_callback' => '__return_true',
				'callback'            => function ( WP_REST_Request $req ) {
					return self::rest( self::do_load( $req['code'] ) );
				},
			)
		);
	}

	private static function rest( $res ) {
		$r = new WP_REST_Response( $res[1], $res[0] );
		$r->header( 'Cache-Control', 'no-store' );
		return $r;
	}
}
