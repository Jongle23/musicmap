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
 *     GET  /wp-json/musicmap/v1/public?q=&sort=popular|rating|new|title&page=N   → packs shared to everyone (list fields only)
 *     POST /wp-json/musicmap/v1/packs/CODE/rate     body {"device":"<32 hex>","stars":0-5}  → {"ok":true,"rating":4.3|null}
 *     POST /wp-json/musicmap/v1/packs/CODE/install  body {"device":"<32 hex>","on":true|false}
 *
 * Ratings are averaged; how many there are is only shown to admins. Device ids are random ids made by the
 * app, stored only as an HMAC, and every write is also rate-limited per (hashed) IP.
 *
 * A pack saved with "_public": true is listed in Public Packs. Its Home / Work / School / Gym
 * locations never keep their coordinates, whatever the app sent.
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
		$public = ! empty( $pack['_public'] );
		unset( $pack['_public'] );
		if ( $public ) {
			if ( ! MusicMap_Settings::get( 'public_packs' ) ) {
				return self::err( 403, 'Public packs are turned off on this site' );
			}
			if ( ! MusicMap_Store::rate_hit( self::ip_hash(), 'save_public', 10, DAY_IN_SECONDS ) ) {
				return self::err( 429, 'You can make 10 packs public a day — try again tomorrow' );
			}
			$pack = self::without_personal_places( $pack );
		}
		$pack = self::clean( $pack );
		$code = MusicMap_Store::save_pack( $pack, self::ip_hash(), $public );
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

	/** Home / Work / School / Gym (and their preset_ forms) keep their name and tracks but lose where they are. */
	private static function without_personal_places( array $pack ) {
		if ( ! is_array( $pack['_customLocs'] ?? null ) ) {
			return $pack;
		}
		foreach ( $pack['_customLocs'] as $i => $loc ) {
			$id = is_array( $loc ) && is_string( $loc['id'] ?? null ) ? preg_replace( '/^preset_/', '', $loc['id'] ) : '';
			if ( in_array( $id, array( 'home', 'work', 'school', 'gym' ), true ) ) {
				unset( $pack['_customLocs'][ $i ]['lat'], $pack['_customLocs'][ $i ]['lon'], $pack['_customLocs'][ $i ]['radius'], $pack['_customLocs'][ $i ]['pins'] );
			}
		}
		return $pack;
	}

	public static function do_public_list( $q, $sort, $page ) {
		if ( ! MusicMap_Settings::get( 'public_packs' ) ) {
			return self::err( 403, 'Public packs are turned off on this site' );
		}
		if ( ! MusicMap_Store::rate_hit( self::ip_hash(), 'public_list', 300, HOUR_IN_SECONDS ) ) {
			return self::err( 429, 'Too many requests — try again later' );
		}
		$q        = mb_substr( trim( wp_strip_all_tags( (string) $q ) ), 0, 60 );
		$page     = max( 1, min( 50, (int) $page ) );
		$per_page = 24;
		$sort     = in_array( $sort, array( 'popular', 'rating', 'new', 'title' ), true ) ? $sort : 'popular';
		list( $rows, $total ) = MusicMap_Store::list_public( $q, $sort, $per_page, $page );
		$packs = array();
		foreach ( $rows as $r ) {
			$packs[] = array(
				'code'     => (string) $r['code'],
				'name'     => (string) $r['name'],
				'icon'     => (string) $r['icon'],
				'subtitle' => (string) $r['subtitle'],
				'tracks'   => (int) $r['track_count'],
				'rating'   => MusicMap_Store::average( $r ),
				'created'  => gmdate( 'Y-m-d', strtotime( $r['created_gmt'] . ' UTC' ) ),
			);
		}
		return array(
			200,
			array(
				'ok'    => true,
				'packs' => $packs,
				'total' => $total,
				'page'  => $page,
				'more'  => $page * $per_page < $total,
			),
		);
	}

	/** The app's random device id (32 hex characters) as the HMAC that is stored, or '' when it isn't one. */
	private static function device_hash( $device ) {
		return is_string( $device ) && preg_match( '/^[a-f0-9]{32}$/', $device ) ? hash_hmac( 'sha256', 'device|' . $device, wp_salt( 'auth' ) ) : '';
	}

	/** Read a small JSON body ({device, stars|on}) and the pack it's about. @return array|WP_Error-like error tuple */
	private static function pack_action_input( $raw_code, $body ) {
		$code = strtoupper( preg_replace( '/[^A-Za-z0-9]/', '', (string) $raw_code ) );
		$in   = strlen( (string) $body ) <= 512 ? json_decode( (string) $body, true ) : null;
		if ( ! preg_match( MusicMap_Store::CODE_RE, $code ) || ! is_array( $in ) ) {
			return array( null, self::err( 400, 'Bad request' ) );
		}
		$device = self::device_hash( $in['device'] ?? '' );
		if ( '' === $device ) {
			return array( null, self::err( 400, 'Bad request' ) );
		}
		$row = MusicMap_Store::get_pack_row( $code );
		if ( ! $row ) {
			return array( null, self::err( 404, 'Pack not found' ) );
		}
		return array( array( $code, $device, $in, $row ), null );
	}

	public static function do_rate( $raw_code, $body ) {
		if ( ! MusicMap_Store::rate_hit( self::ip_hash(), 'rate', 60, HOUR_IN_SECONDS ) ) {
			return self::err( 429, 'Too many ratings — try again later' );
		}
		list( $ok, $fail ) = self::pack_action_input( $raw_code, $body );
		if ( $fail ) {
			return $fail;
		}
		list( $code, $device, $in, $row ) = $ok;
		$stars = (int) ( $in['stars'] ?? -1 );
		if ( $stars < 0 || $stars > 5 ) {
			return self::err( 400, 'Rate it from 1 to 5 stars' );
		}
		if ( $stars > 0 && '' !== $row['ip_hash'] && hash_equals( (string) $row['ip_hash'], self::ip_hash() ) ) {
			return self::err( 403, 'You can’t rate a pack you shared' );
		}
		return array(
			200,
			array(
				'ok'     => true,
				'rating' => MusicMap_Store::rate_pack( $code, $device, $stars ),
			),
		);
	}

	public static function do_install( $raw_code, $body ) {
		if ( ! MusicMap_Store::rate_hit( self::ip_hash(), 'install', 120, HOUR_IN_SECONDS ) ) {
			return self::err( 429, 'Too many requests — try again later' );
		}
		list( $ok, $fail ) = self::pack_action_input( $raw_code, $body );
		if ( $fail ) {
			return $fail;
		}
		list( $code, $device, $in ) = $ok;
		MusicMap_Store::set_installed( $code, $device, ! empty( $in['on'] ) );
		return array( 200, array( 'ok' => true ) );
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
			'/public',
			array(
				'methods'             => 'GET',
				'permission_callback' => '__return_true',
				'callback'            => function ( WP_REST_Request $req ) {
					return self::rest( self::do_public_list( (string) $req['q'], (string) $req['sort'], (int) $req['page'] ) );
				},
			)
		);
		foreach ( array( 'rate', 'install' ) as $act ) {
			register_rest_route(
				'musicmap/v1',
				'/packs/(?P<code>[A-Za-z0-9]{4,12})/' . $act,
				array(
					'methods'             => 'POST',
					'permission_callback' => '__return_true',
					'callback'            => function ( WP_REST_Request $req ) use ( $act ) {
						return self::rest( 'rate' === $act ? self::do_rate( $req['code'], $req->get_body() ) : self::do_install( $req['code'], $req->get_body() ) );
					},
				)
			);
		}
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
