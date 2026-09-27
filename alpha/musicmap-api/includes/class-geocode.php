<?php
/**
 * Reverse geocoding via OpenStreetMap's Nominatim: lat/lng -> city/region/country.
 * Free, no API key, but requires a descriptive User-Agent and ~1 req/sec throttling
 * per Nominatim's usage policy: https://operations.osmfoundation.org/policies/nominatim/
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class MusicMap_Geocode {

	const CACHE_TTL     = MONTH_IN_SECONDS;
	const THROTTLE_KEY  = 'musicmap_nominatim_throttle';
	const MIN_INTERVAL  = 1.0;

	/**
	 * Resolve a lat/lng pair to place info.
	 *
	 * @return array|WP_Error {
	 *     @type string $city         City/town/village name, or '' if none found.
	 *     @type string $region       State/region name, or ''.
	 *     @type string $country      Country name (matches Last.fm's expected ISO 3166-1 country name).
	 *     @type string $country_code Two-letter ISO country code, lowercase.
	 * }
	 */
	public static function reverse( $lat, $lng ) {
		$lat = round( (float) $lat, 3 );
		$lng = round( (float) $lng, 3 );

		$cache_key = 'musicmap_geo_' . md5( "{$lat},{$lng}" );

		$url = add_query_arg(
			array(
				'format'      => 'jsonv2',
				'lat'         => $lat,
				'lon'         => $lng,
				'zoom'        => 10,
				'addressdetails' => 1,
			),
			'https://nominatim.openstreetmap.org/reverse'
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

		if ( empty( $data['address'] ) ) {
			return new WP_Error( 'musicmap_geo_not_found', 'Could not resolve a place for that location.' );
		}

		$address = $data['address'];

		$city = '';
		foreach ( array( 'city', 'town', 'village', 'municipality', 'hamlet' ) as $field ) {
			if ( ! empty( $address[ $field ] ) ) {
				$city = $address[ $field ];
				break;
			}
		}

		$region = '';
		foreach ( array( 'state', 'region', 'county' ) as $field ) {
			if ( ! empty( $address[ $field ] ) ) {
				$region = $address[ $field ];
				break;
			}
		}

		return array(
			'city'         => $city,
			'region'       => $region,
			'country'      => isset( $address['country'] ) ? $address['country'] : '',
			'country_code' => isset( $address['country_code'] ) ? strtolower( $address['country_code'] ) : '',
		);
	}
}
