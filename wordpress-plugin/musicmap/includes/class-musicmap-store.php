<?php
/**
 * MusicMap database storage.
 *
 * Tables (prefix + ):
 *   musicmap_packs  shared packs, one row per share code
 *   musicmap_cache  cached third-party lookups (charts, now playing, YouTube matches…)
 *   musicmap_rate   per-visitor rate-limit counters (hashed IPs only)
 *
 * All queries go through $wpdb->prepare / insert / delete. IPs are never stored raw.
 */

defined( 'ABSPATH' ) || exit;

class MusicMap_Store {

	const DB_VERSION = '1';
	const CODE_RE    = '/^[A-Z0-9]{4,12}$/';
	const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

	public static function table( $name ) {
		global $wpdb;
		return $wpdb->prefix . 'musicmap_' . $name;
	}

	// ── Install / upgrade ───────────────────────────────────────────────

	public static function activate() {
		self::create_tables();
		add_option( MusicMap_Settings::OPTION, MusicMap_Settings::defaults(), '', 'no' );
		self::migrate_legacy_files();
	}

	public static function maybe_upgrade() {
		if ( get_option( 'musicmap_db_version' ) !== self::DB_VERSION ) {
			self::create_tables();
		}
	}

	private static function create_tables() {
		global $wpdb;
		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		$c = $wpdb->get_charset_collate();

		dbDelta(
			'CREATE TABLE ' . self::table( 'packs' ) . " (
  code varchar(12) NOT NULL,
  name varchar(80) NOT NULL DEFAULT '',
  track_count int(10) unsigned NOT NULL DEFAULT 0,
  size_bytes int(10) unsigned NOT NULL DEFAULT 0,
  views int(10) unsigned NOT NULL DEFAULT 0,
  ip_hash char(64) NOT NULL DEFAULT '',
  created_gmt datetime NOT NULL,
  pack longtext NOT NULL,
  PRIMARY KEY  (code),
  KEY created_gmt (created_gmt)
) $c;"
		);
		dbDelta(
			'CREATE TABLE ' . self::table( 'cache' ) . " (
  cache_key varchar(190) NOT NULL,
  type varchar(32) NOT NULL DEFAULT '',
  value longtext NOT NULL,
  created_gmt datetime NOT NULL,
  expires_gmt datetime NOT NULL,
  PRIMARY KEY  (cache_key),
  KEY type (type),
  KEY expires_gmt (expires_gmt)
) $c;"
		);
		dbDelta(
			'CREATE TABLE ' . self::table( 'rate' ) . " (
  rate_key char(64) NOT NULL,
  action varchar(32) NOT NULL DEFAULT '',
  hits int(10) unsigned NOT NULL DEFAULT 0,
  window_start int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY  (rate_key),
  KEY window_start (window_start)
) $c;"
		);
		update_option( 'musicmap_db_version', self::DB_VERSION, false );
	}

	/** Folder used by the old WPCode/PHP Snippets version of the share API. */
	public static function legacy_dir() {
		return trailingslashit( WP_CONTENT_DIR ) . 'uploads/musicmap_packs/';
	}

	/** Copy share codes saved by the old snippet (JSON files) into the packs table. Files are left in place. */
	public static function migrate_legacy_files() {
		global $wpdb;
		$dir = self::legacy_dir();
		if ( ! is_dir( $dir ) ) {
			return 0;
		}
		$moved = 0;
		foreach ( (array) glob( $dir . '*.json' ) as $file ) {
			$code = strtoupper( basename( $file, '.json' ) );
			if ( ! preg_match( self::CODE_RE, $code ) ) {
				continue; // rate-limit files (mmrl_…) and anything unexpected
			}
			$payload = json_decode( (string) file_get_contents( $file ), true );
			if ( ! is_array( $payload ) || ! isset( $payload['pack'] ) || ! is_array( $payload['pack'] ) ) {
				continue;
			}
			$pack = $payload['pack'];
			// files written before v1.1.1 stored "&" as "&amp;"
			if ( (int) ( $payload['fmt'] ?? 1 ) < 2 ) {
				array_walk_recursive(
					$pack,
					function ( &$v ) {
						if ( is_string( $v ) ) {
							$v = html_entity_decode( $v, ENT_QUOTES | ENT_HTML5, 'UTF-8' );
						}
					}
				);
			}
			$json    = wp_json_encode( $pack );
			$created = (int) ( $payload['created'] ?? time() );
			if ( self::is_expired( gmdate( 'Y-m-d H:i:s', $created ) ) ) {
				continue; // don't resurrect codes that have already expired
			}
			$ok      = $wpdb->query(
				$wpdb->prepare(
					'INSERT IGNORE INTO ' . self::table( 'packs' ) . ' (code,name,track_count,size_bytes,views,ip_hash,created_gmt,pack) VALUES (%s,%s,%d,%d,%d,%s,%s,%s)',
					$code,
					self::pack_name( $pack ),
					self::track_count( $pack ),
					strlen( $json ),
					(int) ( $payload['views'] ?? 0 ),
					preg_match( '/^[0-9a-f]{64}$/', (string) ( $payload['ip'] ?? '' ) ) ? $payload['ip'] : '',
					gmdate( 'Y-m-d H:i:s', $created ),
					$json
				)
			);
			$moved += $ok ? 1 : 0;
		}
		return $moved;
	}

	/** Old snippet files still on disk (packs + rate-limit logs). */
	public static function legacy_file_count() {
		$dir = self::legacy_dir();
		return is_dir( $dir ) ? count( (array) glob( $dir . '*.json' ) ) : 0;
	}

	/** Delete the old snippet's JSON files and folder (only .json + its own index.php/.htaccess). */
	public static function delete_legacy_files() {
		$dir = self::legacy_dir();
		if ( ! is_dir( $dir ) ) {
			return 0;
		}
		$n = 0;
		foreach ( (array) glob( $dir . '*.json' ) as $f ) {
			wp_delete_file( $f );
			$n += file_exists( $f ) ? 0 : 1;
		}
		foreach ( array( 'index.php', '.htaccess' ) as $f ) {
			if ( file_exists( $dir . $f ) ) {
				wp_delete_file( $dir . $f );
			}
		}
		@rmdir( $dir ); // phpcs:ignore WordPress.PHP.NoSilencedErrors -- only succeeds if now empty
		return $n;
	}

	// ── Packs ───────────────────────────────────────────────────────────

	public static function pack_name( $pack ) {
		return mb_substr( is_string( $pack['name'] ?? null ) ? $pack['name'] : '', 0, 80 );
	}

	public static function track_count( $pack ) {
		$n = is_array( $pack['tracks'] ?? null ) ? count( $pack['tracks'] ) : 0;
		if ( ! $n && is_array( $pack['videos'] ?? null ) ) {
			foreach ( $pack['videos'] as $v ) {
				$n += is_array( $v['tracks'] ?? null ) ? count( $v['tracks'] ) : 0;
			}
		}
		return $n;
	}

	private static function new_code() {
		$code = '';
		for ( $i = 0; $i < 6; $i++ ) {
			$code .= self::CODE_CHARS[ random_int( 0, strlen( self::CODE_CHARS ) - 1 ) ];
		}
		return $code;
	}

	/** Store a (sanitised) pack and return its new code, or '' if no free code was found. */
	public static function save_pack( array $pack, $ip_hash ) {
		global $wpdb;
		$json = wp_json_encode( $pack );
		for ( $tries = 0; $tries < 20; $tries++ ) {
			$code = self::new_code();
			// INSERT IGNORE + primary key = atomic claim; a taken code simply inserts 0 rows
			$ok = $wpdb->query(
				$wpdb->prepare(
					'INSERT IGNORE INTO ' . self::table( 'packs' ) . ' (code,name,track_count,size_bytes,views,ip_hash,created_gmt,pack) VALUES (%s,%s,%d,%d,0,%s,%s,%s)',
					$code,
					self::pack_name( $pack ),
					self::track_count( $pack ),
					strlen( $json ),
					$ip_hash,
					gmdate( 'Y-m-d H:i:s' ),
					$json
				)
			);
			if ( $ok ) {
				return $code;
			}
		}
		return '';
	}

	/** Fetch a pack by code and count the view. Returns null if missing or expired. */
	public static function load_pack( $code ) {
		global $wpdb;
		if ( ! preg_match( self::CODE_RE, $code ) ) {
			return null;
		}
		$t   = self::table( 'packs' );
		$row = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $t WHERE code = %s", $code ), ARRAY_A ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- table name
		if ( ! $row ) {
			return null;
		}
		if ( self::is_expired( $row['created_gmt'] ) ) {
			self::delete_packs( array( $code ) );
			return null;
		}
		$wpdb->query( $wpdb->prepare( "UPDATE $t SET views = views + 1 WHERE code = %s", $code ) ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
		$row['views'] = (int) $row['views'] + 1;
		$row['pack']  = json_decode( $row['pack'], true );
		return $row;
	}

	public static function get_pack_row( $code ) {
		global $wpdb;
		if ( ! preg_match( self::CODE_RE, $code ) ) {
			return null;
		}
		$t = self::table( 'packs' );
		return $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $t WHERE code = %s", $code ), ARRAY_A ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
	}

	public static function is_expired( $created_gmt ) {
		$days = (int) MusicMap_Settings::get( 'pack_expiry_days' );
		return strtotime( $created_gmt . ' UTC' ) < time() - $days * DAY_IN_SECONDS;
	}

	/** Admin listing. $orderby is whitelisted. */
	public static function list_packs( $search, $orderby, $order, $per_page, $page ) {
		global $wpdb;
		$t       = self::table( 'packs' );
		$cols    = array( 'code', 'name', 'track_count', 'size_bytes', 'views', 'created_gmt' );
		$orderby = in_array( $orderby, $cols, true ) ? $orderby : 'created_gmt';
		$order   = 'ASC' === strtoupper( (string) $order ) ? 'ASC' : 'DESC';
		$where   = '';
		$args    = array();
		if ( '' !== $search ) {
			$like  = '%' . $wpdb->esc_like( $search ) . '%';
			$where = 'WHERE code LIKE %s OR name LIKE %s';
			$args  = array( $like, $like );
		}
		$total_sql = "SELECT COUNT(*) FROM $t $where";
		$total     = (int) ( $args ? $wpdb->get_var( $wpdb->prepare( $total_sql, $args ) ) : $wpdb->get_var( $total_sql ) ); // phpcs:ignore WordPress.DB.PreparedSQL
		$rows_sql  = "SELECT code,name,track_count,size_bytes,views,created_gmt FROM $t $where ORDER BY $orderby $order LIMIT %d OFFSET %d";
		$rows      = $wpdb->get_results( $wpdb->prepare( $rows_sql, array_merge( $args, array( $per_page, ( $page - 1 ) * $per_page ) ) ), ARRAY_A ); // phpcs:ignore WordPress.DB.PreparedSQL
		return array( $rows, $total );
	}

	public static function delete_packs( array $codes ) {
		global $wpdb;
		$n = 0;
		foreach ( $codes as $code ) {
			if ( preg_match( self::CODE_RE, (string) $code ) ) {
				$n += (int) $wpdb->delete( self::table( 'packs' ), array( 'code' => $code ), array( '%s' ) );
			}
		}
		return $n;
	}

	public static function purge_expired_packs() {
		global $wpdb;
		$days   = (int) MusicMap_Settings::get( 'pack_expiry_days' );
		$cutoff = gmdate( 'Y-m-d H:i:s', time() - $days * DAY_IN_SECONDS );
		$t      = self::table( 'packs' );
		return (int) $wpdb->query( $wpdb->prepare( "DELETE FROM $t WHERE created_gmt < %s", $cutoff ) ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
	}

	public static function count( $table ) {
		global $wpdb;
		return (int) $wpdb->get_var( 'SELECT COUNT(*) FROM ' . self::table( $table ) ); // phpcs:ignore WordPress.DB.PreparedSQL
	}

	// ── Cache ───────────────────────────────────────────────────────────

	public static function cache_get( $key ) {
		global $wpdb;
		$t   = self::table( 'cache' );
		$row = $wpdb->get_row( $wpdb->prepare( "SELECT value, expires_gmt FROM $t WHERE cache_key = %s", $key ), ARRAY_A ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
		if ( ! $row || strtotime( $row['expires_gmt'] . ' UTC' ) < time() ) {
			return null;
		}
		return json_decode( $row['value'], true );
	}

	public static function cache_set( $key, $type, $value, $ttl ) {
		global $wpdb;
		$wpdb->replace(
			self::table( 'cache' ),
			array(
				'cache_key'   => substr( $key, 0, 190 ),
				'type'        => substr( $type, 0, 32 ),
				'value'       => wp_json_encode( $value ),
				'created_gmt' => gmdate( 'Y-m-d H:i:s' ),
				'expires_gmt' => gmdate( 'Y-m-d H:i:s', time() + (int) $ttl ),
			),
			array( '%s', '%s', '%s', '%s', '%s' )
		);
	}

	public static function cache_summary() {
		global $wpdb;
		$t = self::table( 'cache' );
		return $wpdb->get_results( "SELECT type, COUNT(*) AS entries, SUM(LENGTH(value)) AS bytes, MIN(created_gmt) AS oldest, MAX(created_gmt) AS newest FROM $t GROUP BY type ORDER BY type", ARRAY_A ); // phpcs:ignore WordPress.DB.PreparedSQL
	}

	public static function cache_list( $type, $limit = 200 ) {
		global $wpdb;
		$t = self::table( 'cache' );
		return $wpdb->get_results( $wpdb->prepare( "SELECT cache_key, type, LENGTH(value) AS bytes, created_gmt, expires_gmt FROM $t WHERE type = %s ORDER BY created_gmt DESC LIMIT %d", $type, $limit ), ARRAY_A ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
	}

	public static function cache_delete_type( $type ) {
		global $wpdb;
		return '' === $type
			? (int) $wpdb->query( 'DELETE FROM ' . self::table( 'cache' ) ) // phpcs:ignore WordPress.DB.PreparedSQL
			: (int) $wpdb->delete( self::table( 'cache' ), array( 'type' => $type ), array( '%s' ) );
	}

	public static function cache_purge_expired() {
		global $wpdb;
		$t = self::table( 'cache' );
		return (int) $wpdb->query( $wpdb->prepare( "DELETE FROM $t WHERE expires_gmt < %s", gmdate( 'Y-m-d H:i:s' ) ) ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
	}

	// ── Rate limits ─────────────────────────────────────────────────────

	/** Count one hit for this hashed IP + action; false when over $max within $window seconds. */
	public static function rate_hit( $ip_hash, $action, $max, $window ) {
		global $wpdb;
		$t   = self::table( 'rate' );
		$key = hash( 'sha256', $ip_hash . '|' . $action );
		$now = time();
		$row = $wpdb->get_row( $wpdb->prepare( "SELECT hits, window_start FROM $t WHERE rate_key = %s", $key ), ARRAY_A ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
		if ( ! $row || (int) $row['window_start'] < $now - $window ) {
			$wpdb->replace( $t, array( 'rate_key' => $key, 'action' => $action, 'hits' => 1, 'window_start' => $now ), array( '%s', '%s', '%d', '%d' ) );
			return true;
		}
		if ( (int) $row['hits'] >= $max ) {
			return false;
		}
		$wpdb->query( $wpdb->prepare( "UPDATE $t SET hits = hits + 1 WHERE rate_key = %s", $key ) ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
		return true;
	}

	public static function rate_summary() {
		global $wpdb;
		$t = self::table( 'rate' );
		return $wpdb->get_results( "SELECT action, COUNT(*) AS visitors, SUM(hits) AS hits, MAX(window_start) AS latest FROM $t GROUP BY action ORDER BY action", ARRAY_A ); // phpcs:ignore WordPress.DB.PreparedSQL
	}

	public static function rate_clear() {
		global $wpdb;
		return (int) $wpdb->query( 'DELETE FROM ' . self::table( 'rate' ) ); // phpcs:ignore WordPress.DB.PreparedSQL
	}
}
