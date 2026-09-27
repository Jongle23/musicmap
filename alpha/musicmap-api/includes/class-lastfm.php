<?php
/**
 * Last.fm wrappers used for:
 *  - "Most Popular Here": geo.getTopTracks(country) — Last.fm accepts an
 *    explicit ISO 3166-1 country name, unlike most chart APIs which only
 *    geolocate by the calling server's IP.
 *  - "Genre Popular Songs" (location-aware): geo.getTopArtists(country) to
 *    get the country's top artists, artist.getTopTags to learn each artist's
 *    genre, and artist.getTopTracks to pull tracks once bucketed by genre.
 *
 * Requires a free API key: https://www.last.fm/api/account/create
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class MusicMap_LastFm {

	const API_ROOT     = 'https://ws.audioscrobbler.com/2.0/';
	const CACHE_TTL     = DAY_IN_SECONDS;
	const THROTTLE_KEY  = 'musicmap_lastfm_throttle';
	const MIN_INTERVAL  = 0.25;

	private static function api_key() {
		return get_option( 'musicmap_lastfm_api_key', '' );
	}

	private static function call( $method, $params, $cache_bucket ) {
		$api_key = self::api_key();
		if ( ! $api_key ) {
			return new WP_Error( 'musicmap_lastfm_no_key', 'Last.fm API key is not configured.' );
		}

		$params = array_merge(
			$params,
			array(
				'method'  => $method,
				'api_key' => $api_key,
				'format'  => 'json',
			)
		);

		$url       = add_query_arg( $params, self::API_ROOT );
		$cache_key = 'musicmap_lastfm_' . $cache_bucket . '_' . md5( serialize( $params ) );

		return MusicMap_Http::get_json( $url, array(), $cache_key, self::CACHE_TTL, self::THROTTLE_KEY, self::MIN_INTERVAL );
	}

	/**
	 * @return array|WP_Error List of ['artist' => ..., 'track' => ...]
	 */
	public static function top_tracks_for_country( $country, $limit = 15 ) {
		$data = self::call( 'geo.gettoptracks', array( 'country' => $country, 'limit' => $limit ), 'toptracks' );

		if ( is_wp_error( $data ) ) {
			return $data;
		}

		if ( empty( $data['tracks']['track'] ) ) {
			return array();
		}

		$tracks = array();
		foreach ( $data['tracks']['track'] as $track ) {
			$tracks[] = array(
				'artist' => $track['artist']['name'],
				'track'  => $track['name'],
			);
		}

		return $tracks;
	}

	/**
	 * @return array|WP_Error List of artist names, top artists for the country.
	 */
	public static function top_artists_for_country( $country, $limit = 40 ) {
		$data = self::call( 'geo.gettopartists', array( 'country' => $country, 'limit' => $limit ), 'topartists' );

		if ( is_wp_error( $data ) ) {
			return $data;
		}

		if ( empty( $data['topartists']['artist'] ) ) {
			return array();
		}

		return wp_list_pluck( $data['topartists']['artist'], 'name' );
	}

	/**
	 * @return array|WP_Error List of lowercase tag names for an artist, most relevant first.
	 */
	public static function top_tags_for_artist( $artist ) {
		$data = self::call( 'artist.gettoptags', array( 'artist' => $artist, 'autocorrect' => 1 ), 'toptags' );

		if ( is_wp_error( $data ) ) {
			return $data;
		}

		if ( empty( $data['toptags']['tag'] ) ) {
			return array();
		}

		return array_map(
			function ( $tag ) {
				return strtolower( $tag['name'] );
			},
			$data['toptags']['tag']
		);
	}

	/**
	 * @return array|WP_Error List of ['artist' => ..., 'track' => ...] for an artist's top tracks.
	 */
	public static function top_tracks_for_artist( $artist, $limit = 3 ) {
		$data = self::call( 'artist.gettoptracks', array( 'artist' => $artist, 'autocorrect' => 1, 'limit' => $limit ), 'artisttracks' );

		if ( is_wp_error( $data ) ) {
			return $data;
		}

		if ( empty( $data['toptracks']['track'] ) ) {
			return array();
		}

		$tracks = array();
		foreach ( $data['toptracks']['track'] as $track ) {
			$tracks[] = array(
				'artist' => $track['artist']['name'],
				'track'  => $track['name'],
			);
		}

		return $tracks;
	}
}
