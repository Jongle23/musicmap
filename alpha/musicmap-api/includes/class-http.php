<?php
/**
 * Shared HTTP helper: transient caching + best-effort per-service throttling.
 * Used by any wrapper that must respect a "max N requests/sec" policy
 * (Nominatim, MusicBrainz) or just wants simple response caching (Last.fm, YouTube).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class MusicMap_Http {

	/**
	 * GET a URL with optional transient caching and optional throttling.
	 *
	 * @param string      $url          Full request URL.
	 * @param array       $args         Extra args passed to wp_remote_get (headers, timeout, ...).
	 * @param string|null $cache_key    Transient key; null disables caching.
	 * @param int         $cache_ttl    Cache lifetime in seconds.
	 * @param string|null $throttle_key Transient key used to enforce $min_interval between calls
	 *                                  to the same service; null disables throttling.
	 * @param float       $min_interval Minimum seconds between calls sharing $throttle_key.
	 *
	 * @return array|WP_Error Decoded JSON as an associative array, or WP_Error on failure.
	 */
	public static function get_json( $url, $args = array(), $cache_key = null, $cache_ttl = HOUR_IN_SECONDS, $throttle_key = null, $min_interval = 1.0 ) {
		if ( $cache_key ) {
			$cached = get_transient( $cache_key );
			if ( false !== $cached ) {
				return $cached;
			}
		}

		if ( $throttle_key ) {
			self::throttle( $throttle_key, $min_interval );
		}

		$defaults = array(
			'timeout' => 10,
		);
		$response = wp_remote_get( $url, array_merge( $defaults, $args ) );

		if ( $throttle_key ) {
			set_transient( $throttle_key, microtime( true ), 60 );
		}

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$code = wp_remote_retrieve_response_code( $response );
		$body = wp_remote_retrieve_body( $response );

		if ( $code < 200 || $code >= 300 ) {
			return new WP_Error( 'musicmap_http_error', "Upstream request failed with HTTP {$code}", array( 'url' => $url, 'body' => $body ) );
		}

		$decoded = json_decode( $body, true );
		if ( null === $decoded && JSON_ERROR_NONE !== json_last_error() ) {
			return new WP_Error( 'musicmap_json_error', 'Failed to decode upstream JSON response', array( 'url' => $url ) );
		}

		if ( $cache_key ) {
			set_transient( $cache_key, $decoded, $cache_ttl );
		}

		return $decoded;
	}

	/**
	 * Best-effort throttle: sleeps if the last call sharing $throttle_key was
	 * too recent. Only guarantees spacing within a single PHP process/request
	 * cycle plus whatever the transient store makes visible across requests;
	 * it is not a perfectly atomic rate limiter, but is enough to stay a
	 * respectful client of free public APIs like Nominatim/MusicBrainz.
	 */
	private static function throttle( $throttle_key, $min_interval ) {
		$last = get_transient( $throttle_key );
		if ( false === $last ) {
			return;
		}

		$elapsed = microtime( true ) - (float) $last;
		if ( $elapsed < $min_interval ) {
			usleep( (int) ( ( $min_interval - $elapsed ) * 1000000 ) );
		}
	}

	/**
	 * Build the contact-identifying User-Agent required by Nominatim's and
	 * MusicBrainz's usage policies. Pulled from the plugin settings so the
	 * site admin's real contact info is used instead of a placeholder.
	 */
	public static function contact_user_agent( $app_label ) {
		$contact = get_option( 'musicmap_contact_email', '' );
		$contact = $contact ? $contact : get_bloginfo( 'admin_email' );
		return sprintf( '%s (%s; %s)', $app_label, home_url(), $contact );
	}
}
