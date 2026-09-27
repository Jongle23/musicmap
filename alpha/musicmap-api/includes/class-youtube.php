<?php
/**
 * Resolves an artist/track pair to a playable YouTube video ID.
 *
 * YouTube Data API v3's free quota is small (10,000 units/day; a search.list
 * call costs 100 units, i.e. ~100 searches/day). Every unique lookup is
 * therefore cached permanently in a custom DB table (not just a transient,
 * which could expire and silently re-burn quota) so repeat visitors and
 * repeat locations don't re-search the same artist/track.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class MusicMap_YouTube {

	const CACHE_TTL    = 0; // Unused for DB cache; DB rows are kept indefinitely.
	const API_ROOT     = 'https://www.googleapis.com/youtube/v3/search';

	public static function table_name() {
		global $wpdb;
		return $wpdb->prefix . 'musicmap_video_cache';
	}

	/**
	 * Called on plugin activation.
	 */
	public static function install_table() {
		global $wpdb;

		$table_name      = self::table_name();
		$charset_collate = $wpdb->get_charset_collate();

		$sql = "CREATE TABLE {$table_name} (
			id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
			query_hash CHAR(32) NOT NULL,
			artist VARCHAR(255) NOT NULL,
			track VARCHAR(255) NOT NULL DEFAULT '',
			video_id VARCHAR(32) NOT NULL,
			video_title VARCHAR(255) NOT NULL DEFAULT '',
			created_at DATETIME NOT NULL,
			PRIMARY KEY  (id),
			UNIQUE KEY query_hash (query_hash)
		) {$charset_collate};";

		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		dbDelta( $sql );
	}

	private static function api_key() {
		return get_option( 'musicmap_youtube_api_key', '' );
	}

	/**
	 * @param string      $artist
	 * @param string|null $track  Track title, or null to just find a representative song by the artist.
	 *
	 * @return array|WP_Error ['video_id' => ..., 'title' => ...]
	 */
	public static function resolve( $artist, $track = null ) {
		global $wpdb;

		$query_text = $track ? "{$artist} {$track}" : "{$artist} popular song";
		$query_hash = md5( strtolower( trim( $query_text ) ) );
		$table      = self::table_name();

		$row = $wpdb->get_row(
			$wpdb->prepare( "SELECT video_id, video_title FROM {$table} WHERE query_hash = %s", $query_hash )
		);

		if ( $row ) {
			return array( 'video_id' => $row->video_id, 'title' => $row->video_title );
		}

		$api_key = self::api_key();
		if ( ! $api_key ) {
			return new WP_Error( 'musicmap_youtube_no_key', 'YouTube Data API key is not configured.' );
		}

		$url = add_query_arg(
			array(
				'part'            => 'snippet',
				'q'               => $query_text,
				'type'            => 'video',
				'videoCategoryId' => 10, // Music
				'maxResults'      => 1,
				'key'             => $api_key,
			),
			self::API_ROOT
		);

		$data = MusicMap_Http::get_json( $url, array( 'timeout' => 8 ) );

		if ( is_wp_error( $data ) ) {
			return $data;
		}

		if ( empty( $data['items'][0]['id']['videoId'] ) ) {
			return new WP_Error( 'musicmap_youtube_no_result', "No YouTube result for \"{$query_text}\"." );
		}

		$video_id = $data['items'][0]['id']['videoId'];
		$title    = isset( $data['items'][0]['snippet']['title'] ) ? $data['items'][0]['snippet']['title'] : $query_text;

		$wpdb->insert(
			$table,
			array(
				'query_hash'  => $query_hash,
				'artist'      => $artist,
				'track'       => (string) $track,
				'video_id'    => $video_id,
				'video_title' => $title,
				'created_at'  => current_time( 'mysql' ),
			)
		);

		return array( 'video_id' => $video_id, 'title' => $title );
	}
}
