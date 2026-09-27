<?php
/**
 * "Made Here": artists whose MusicBrainz `begin-area` (formation/birth
 * location) matches the resolved place. Free, no API key, but requires a
 * descriptive User-Agent and ~1 req/sec throttling per MusicBrainz's policy:
 * https://musicbrainz.org/doc/MusicBrainz_API/Rate_Limiting
 *
 * MusicBrainz has no popularity ranking, so results are left in the order
 * the search API returns them (its own relevance score), not resorted by fame.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class MusicMap_MusicBrainz {

	const CACHE_TTL    = WEEK_IN_SECONDS;
	const THROTTLE_KEY = 'musicmap_musicbrainz_throttle';
	const MIN_INTERVAL = 1.0;
	const MIN_RESULTS_BEFORE_FALLBACK = 5;

	/**
	 * Find artists that originated in the given place, preferring city-level
	 * matches and falling back to region, then country, when too few are found.
	 *
	 * @param array $place ['city' => ..., 'region' => ..., 'country' => ...]
	 * @param int   $limit Max artists to return.
	 *
	 * @return array|WP_Error List of ['name', 'mbid', 'area', 'disambiguation', 'matched_on'].
	 */
	public static function artists_from( $place, $limit = 15 ) {
		$attempts = array();
		if ( ! empty( $place['city'] ) ) {
			$attempts[] = array( 'field' => 'beginarea', 'value' => $place['city'], 'matched_on' => 'city' );
		}
		if ( ! empty( $place['region'] ) ) {
			$attempts[] = array( 'field' => 'beginarea', 'value' => $place['region'], 'matched_on' => 'region' );
		}
		if ( ! empty( $place['country'] ) ) {
			$attempts[] = array( 'field' => 'beginarea', 'value' => $place['country'], 'matched_on' => 'country' );
		}

		if ( empty( $attempts ) ) {
			return new WP_Error( 'musicmap_no_place', 'No place information to search MusicBrainz with.' );
		}

		$last_error = null;

		foreach ( $attempts as $attempt ) {
			$result = self::search( $attempt['field'], $attempt['value'], $limit );

			if ( is_wp_error( $result ) ) {
				$last_error = $result;
				continue;
			}

			if ( count( $result ) >= self::MIN_RESULTS_BEFORE_FALLBACK || $attempt === end( $attempts ) ) {
				return array_map(
					function ( $artist ) use ( $attempt ) {
						$artist['matched_on'] = $attempt['matched_on'];
						return $artist;
					},
					$result
				);
			}
		}

		return $last_error ? $last_error : array();
	}

	private static function search( $field, $value, $limit ) {
		$query = sprintf( '%s:"%s"', $field, addcslashes( $value, '"' ) );
		$cache_key = 'musicmap_mb_' . md5( $query . $limit );

		$url = add_query_arg(
			array(
				'query' => $query,
				'fmt'   => 'json',
				'limit' => $limit,
			),
			'https://musicbrainz.org/ws/2/artist/'
		);

		$args = array(
			'headers' => array(
				'User-Agent' => MusicMap_Http::contact_user_agent( 'MusicMap/1.0' ),
			),
		);

		$data = MusicMap_Http::get_json( $url, $args, $cache_key, self::CACHE_TTL, self::THROTTLE_KEY, self::MIN_INTERVAL );

		if ( is_wp_error( $data ) ) {
			return $data;
		}

		if ( empty( $data['artists'] ) ) {
			return array();
		}

		$artists = array();
		foreach ( $data['artists'] as $artist ) {
			$artists[] = array(
				'name'            => $artist['name'],
				'mbid'            => $artist['id'],
				'area'            => isset( $artist['begin-area']['name'] ) ? $artist['begin-area']['name'] : '',
				'disambiguation'  => isset( $artist['disambiguation'] ) ? $artist['disambiguation'] : '',
			);
		}

		return $artists;
	}
}
