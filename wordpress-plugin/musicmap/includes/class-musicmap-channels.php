<?php
/**
 * Local Listening channels (server side).
 *
 *   GET /wp-json/musicmap/v1/chart?cc=us                → country's most-played songs (Apple Music charts, no key)
 *   GET /wp-json/musicmap/v1/made?lat=..&lon=..         → well-known artists from around a point (Wikidata, no key)
 *   GET /wp-json/musicmap/v1/resolve?artist=..&title=.. → a playable YouTube video for a song or artist (YouTube key)
 *
 * Everything is public, so: strict parameter validation, per-visitor rate limits, fixed upstream
 * hosts only (no user-supplied URLs), results cached in the musicmap_cache table and shared by all
 * visitors, and a daily guard on the YouTube quota. API keys never leave the server.
 */

defined( 'ABSPATH' ) || exit;

class MusicMap_Channels {

	const NS            = 'musicmap/v1';
	const YT_SEARCH_COST = 100; // YouTube Data API units per search.list call

	public static function init() {
		add_action( 'rest_api_init', array( __CLASS__, 'routes' ) );
	}

	public static function routes() {
		$public = '__return_true';
		register_rest_route(
			self::NS,
			'/chart',
			array(
				'methods'             => 'GET',
				'permission_callback' => $public,
				'callback'            => array( __CLASS__, 'chart' ),
				'args'                => array(
					'cc' => array(
						'required'          => true,
						'validate_callback' => function ( $v ) {
							return is_string( $v ) && preg_match( '/^[A-Za-z]{2}$/', $v );
						},
					),
				),
			)
		);
		register_rest_route(
			self::NS,
			'/made',
			array(
				'methods'             => 'GET',
				'permission_callback' => $public,
				'callback'            => array( __CLASS__, 'made' ),
				'args'                => array(
					'lat' => array(
						'required'          => true,
						'validate_callback' => function ( $v ) {
							return is_numeric( $v ) && abs( (float) $v ) <= 90;
						},
					),
					'lon' => array(
						'required'          => true,
						'validate_callback' => function ( $v ) {
							return is_numeric( $v ) && abs( (float) $v ) <= 180;
						},
					),
				),
			)
		);
		register_rest_route(
			self::NS,
			'/resolve',
			array(
				'methods'             => 'GET',
				'permission_callback' => $public,
				'callback'            => array( __CLASS__, 'resolve' ),
				'args'                => array(
					'artist' => array(
						'required'          => true,
						'validate_callback' => function ( $v ) {
							return is_string( $v ) && '' !== trim( $v ) && mb_strlen( $v ) <= 120;
						},
					),
					'title'  => array(
						'required'          => false,
						'validate_callback' => function ( $v ) {
							return is_string( $v ) && mb_strlen( $v ) <= 160;
						},
					),
				),
			)
		);
	}

	// ── Helpers ─────────────────────────────────────────────────────────

	private static function reply( $data, $status = 200, $max_age = 0 ) {
		$r = new WP_REST_Response( $data, $status );
		$r->header( 'Cache-Control', $max_age ? 'public, max-age=' . (int) $max_age : 'no-store' );
		return $r;
	}

	private static function fail( $code, $msg, $status ) {
		return self::reply(
			array(
				'ok'    => false,
				'code'  => $code,
				'error' => $msg,
			),
			$status
		);
	}

	/** Per-visitor limit for these routes (hashed IP, see MusicMap_Api). */
	private static function allowed( $action, $per_hour ) {
		return MusicMap_Store::rate_hit( MusicMap_Api::ip_hash(), $action, $per_hour, HOUR_IN_SECONDS );
	}

	/** Identify ourselves to upstream APIs, as Wikimedia's and others' policies require. */
	private static function user_agent() {
		$email = (string) MusicMap_Settings::get( 'contact_email' );
		return 'MusicMap/' . MUSICMAP_VERSION . ' (' . home_url( '/' ) . ( $email ? '; ' . $email : '' ) . ')';
	}

	/**
	 * @param bool $describe Send MusicMap's descriptive User-Agent (Wikimedia requires one). Apple's
	 *                       chart feeds reject such agents with 403, so they get WordPress's default.
	 */
	private static function get_json( $url, $timeout = 15, $describe = true ) {
		$args = array(
			'timeout'     => $timeout,
			'redirection' => 2,
			'headers'     => array( 'Accept' => 'application/json' ),
		);
		if ( $describe ) {
			$args['user-agent'] = self::user_agent();
		}
		$res = wp_safe_remote_get( $url, $args );
		if ( is_wp_error( $res ) ) {
			return array( 0, null );
		}
		return array( (int) wp_remote_retrieve_response_code( $res ), json_decode( wp_remote_retrieve_body( $res ), true ) );
	}

	private static function str( $v, $max ) {
		return mb_substr( trim( wp_strip_all_tags( (string) $v ) ), 0, $max );
	}

	// ── Popular: Apple Music most-played songs for a country ────────────

	public static function chart( WP_REST_Request $req ) {
		$cc  = strtolower( $req['cc'] );
		$key = 'chart2:' . $cc; // v2 key: bypasses "no chart" answers cached by v1.4.0 after Apple refused its User-Agent
		$hit = MusicMap_Store::cache_get( $key );
		if ( is_array( $hit ) ) {
			return $hit['ok'] ? self::reply( $hit, 200, 1800 ) : self::reply( $hit, 404 );
		}
		if ( ! self::allowed( 'chart', 120 ) ) {
			return self::fail( 'rate_limited', 'Too many requests — try again later', 429 );
		}

		// Main feed, then the older iTunes feed as a backup
		list( $songs, $status ) = self::chart_marketingtools( $cc );
		if ( null === $songs ) {
			list( $songs, $status2 ) = self::chart_itunes( $cc );
			$status = array( $status, $status2 );
		}
		if ( null === $songs ) {
			// Only a definite "not found" from both feeds means the country has no chart
			if ( array( 404, 404 ) === $status || array( 404, 400 ) === $status ) {
				$out = array(
					'ok'      => false,
					'code'    => 'no_chart',
					'error'   => 'No chart is available for this country.',
					'country' => $cc,
				);
				MusicMap_Store::cache_set( $key, 'chart', $out, 6 * HOUR_IN_SECONDS );
				return self::reply( $out, 404 );
			}
			return self::fail( 'upstream', 'Couldn\'t reach the Apple Music charts right now (HTTP ' . implode( '/', (array) $status ) . '). Please try again in a minute.', 502 );
		}
		$out = array(
			'ok'      => true,
			'country' => $cc,
			'source'  => 'Apple Music',
			'updated' => gmdate( 'c' ),
			'songs'   => $songs,
		);
		MusicMap_Store::cache_set( $key, 'chart', $out, 6 * HOUR_IN_SECONDS );
		return self::reply( $out, 200, 1800 );
	}

	private static function art( $url ) {
		$url = (string) $url;
		return preg_match( '#^https://is\d+-ssl\.mzstatic\.com/image/thumb/[^\s"\'<>]+$#', $url ) ? $url : '';
	}

	/** @return array{0:?array,1:int} songs (null on failure) and the HTTP status */
	private static function chart_marketingtools( $cc ) {
		list( $code, $data ) = self::get_json( 'https://rss.marketingtools.apple.com/api/v2/' . $cc . '/music/most-played/100/songs.json', 15, false );
		if ( 200 !== $code || ! isset( $data['feed']['results'] ) || ! is_array( $data['feed']['results'] ) ) {
			return array( null, $code );
		}
		$songs = array();
		foreach ( $data['feed']['results'] as $r ) {
			$title  = self::str( $r['name'] ?? '', 160 );
			$artist = self::str( $r['artistName'] ?? '', 120 );
			if ( '' === $title || '' === $artist ) {
				continue;
			}
			$genre = '';
			foreach ( (array) ( $r['genres'] ?? array() ) as $g ) {
				if ( isset( $g['name'] ) && 'Music' !== $g['name'] ) {
					$genre = self::str( $g['name'], 40 );
					break;
				}
			}
			$songs[] = array(
				'rank'   => count( $songs ) + 1,
				'title'  => $title,
				'artist' => $artist,
				'genre'  => $genre,
				'art'    => self::art( $r['artworkUrl100'] ?? '' ),
			);
		}
		return array( $songs ? $songs : null, $code );
	}

	/** Older iTunes "top songs" feed, used when the main feed fails. */
	private static function chart_itunes( $cc ) {
		list( $code, $data ) = self::get_json( 'https://itunes.apple.com/' . $cc . '/rss/topsongs/limit=100/json', 15, false );
		$entries = $data['feed']['entry'] ?? null;
		if ( 200 !== $code || ! is_array( $entries ) ) {
			return array( null, $code );
		}
		if ( isset( $entries['im:name'] ) ) {
			$entries = array( $entries ); // a single entry isn't wrapped in a list
		}
		$songs = array();
		foreach ( $entries as $e ) {
			$title  = self::str( $e['im:name']['label'] ?? '', 160 );
			$artist = self::str( $e['im:artist']['label'] ?? '', 120 );
			if ( '' === $title || '' === $artist ) {
				continue;
			}
			$imgs    = (array) ( $e['im:image'] ?? array() );
			$last    = end( $imgs );
			$songs[] = array(
				'rank'   => count( $songs ) + 1,
				'title'  => $title,
				'artist' => $artist,
				'genre'  => self::str( $e['category']['attributes']['label'] ?? '', 40 ),
				'art'    => self::art( is_array( $last ) ? ( $last['label'] ?? '' ) : '' ),
			);
		}
		return array( $songs ? $songs : null, $code );
	}

	// ── Made Here: notable artists born or formed near a point (Wikidata) ─

	public static function made( WP_REST_Request $req ) {
		$lat = round( (float) $req['lat'], 1 ); // ~10 km cells: nearby pins share one cached answer
		$lon = round( (float) $req['lon'], 1 );
		$key = sprintf( 'made:%.1f,%.1f', $lat, $lon );
		$hit = MusicMap_Store::cache_get( $key );
		if ( is_array( $hit ) ) {
			return self::reply( $hit, 200, 3600 );
		}
		if ( ! self::allowed( 'made', 60 ) ) {
			return self::fail( 'rate_limited', 'Too many requests — try again later', 429 );
		}
		$artists = array();
		$radius  = 0;
		foreach ( array( 25, 80 ) as $radius ) {
			$artists = self::wikidata_artists( $lat, $lon, $radius );
			if ( null === $artists ) {
				return self::fail( 'upstream', 'Could not reach Wikidata. Please try again.', 502 );
			}
			if ( count( $artists ) >= 8 ) {
				break;
			}
		}
		$out = array(
			'ok'        => true,
			'radius_km' => $radius,
			'source'    => 'Wikidata',
			'artists'   => $artists,
		);
		MusicMap_Store::cache_set( $key, 'made', $out, 30 * DAY_IN_SECONDS );
		return self::reply( $out, 200, 3600 );
	}

	/** @return array|null null when Wikidata can't be reached */
	private static function wikidata_artists( $lat, $lon, $radius_km ) {
		// Only numbers go into the query (formatted here), so nothing user-supplied reaches SPARQL as text
		$point = sprintf( 'Point(%.4F %.4F)', $lon, $lat );
		$sparql = 'SELECT ?artist ?artistLabel ?placeLabel ?links (SAMPLE(?genreLabel) AS ?genre) (SAMPLE(?yt) AS ?ytc) (SAMPLE(?sp) AS ?spotify) WHERE {
  SERVICE wikibase:around { ?place wdt:P625 ?loc . bd:serviceParam wikibase:center "' . $point . '"^^geo:wktLiteral . bd:serviceParam wikibase:radius "' . (int) $radius_km . '" . }
  { ?artist wdt:P740 ?place . ?artist wdt:P31/wdt:P279* wd:Q215380 . }
  UNION
  { ?artist wdt:P19 ?place . ?artist wdt:P106/wdt:P279* wd:Q639669 . }
  ?artist wikibase:sitelinks ?links . FILTER(?links > 8)
  OPTIONAL { ?artist wdt:P136 ?g . ?g rdfs:label ?genreLabel . FILTER(LANG(?genreLabel) = "en") }
  OPTIONAL { ?artist wdt:P2397 ?yt . }
  OPTIONAL { ?artist wdt:P1902 ?sp . }
  # must have a real music presence (Spotify artist, YouTube channel or record label), so famous
  # people who are only incidentally "musicians" do not crowd out actual artists
  FILTER(BOUND(?sp) || BOUND(?yt) || EXISTS { ?artist wdt:P264 ?label . })
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
} GROUP BY ?artist ?artistLabel ?placeLabel ?links ORDER BY DESC(?links) LIMIT 40';

		list( $code, $data ) = self::get_json( 'https://query.wikidata.org/sparql?format=json&query=' . rawurlencode( $sparql ), 30 );
		if ( 200 !== $code || ! isset( $data['results']['bindings'] ) ) {
			return null;
		}
		$out  = array();
		$seen = array();
		foreach ( $data['results']['bindings'] as $b ) {
			$name = self::str( $b['artistLabel']['value'] ?? '', 120 );
			$qid  = preg_replace( '#^.*/#', '', (string) ( $b['artist']['value'] ?? '' ) );
			if ( '' === $name || preg_match( '/^Q\d+$/', $name ) || isset( $seen[ $qid ] ) ) {
				continue; // no English label, or a duplicate row
			}
			$seen[ $qid ] = true;
			$yt           = (string) ( $b['ytc']['value'] ?? '' );
			$sp           = (string) ( $b['spotify']['value'] ?? '' );
			$out[]        = array(
				'name'       => $name,
				'place'      => self::str( $b['placeLabel']['value'] ?? '', 80 ),
				'genre'      => self::str( $b['genre']['value'] ?? '', 40 ),
				'fame'       => (int) ( $b['links']['value'] ?? 0 ),
				'youtube'    => preg_match( '/^UC[A-Za-z0-9_-]{22}$/', $yt ) ? $yt : '',
				'spotify'    => preg_match( '/^[A-Za-z0-9]{22}$/', $sp ) ? $sp : '',
				'wikidata'   => preg_match( '/^Q\d+$/', $qid ) ? $qid : '',
			);
		}
		return $out;
	}

	// ── YouTube lookup, cached for everyone, with a daily quota guard ────

	public static function resolve( WP_REST_Request $req ) {
		$artist = self::str( $req['artist'], 120 );
		$title  = self::str( (string) $req['title'], 160 );
		$q      = trim( $artist . ' ' . $title ) . ( '' === $title ? ' music' : '' );
		$key    = 'yt:' . md5( mb_strtolower( $q ) );

		$hit = MusicMap_Store::cache_get( $key );
		if ( is_array( $hit ) ) {
			return self::reply( $hit, $hit['ok'] ? 200 : 404, 86400 );
		}
		$api_key = (string) MusicMap_Settings::get( 'youtube_key' );
		if ( '' === $api_key ) {
			return self::fail( 'no_youtube_key', 'YouTube lookups need a YouTube API key in MusicMap > Settings.', 503 );
		}
		if ( ! self::allowed( 'resolve', 80 ) ) {
			return self::fail( 'rate_limited', 'Too many lookups — try again later', 429 );
		}
		if ( ! self::quota_take( self::YT_SEARCH_COST ) ) {
			return self::fail( 'quota', 'Today\'s YouTube lookups are used up. Songs played before still work; new ones will be back tomorrow.', 503 );
		}

		$url = add_query_arg(
			array(
				'part'            => 'snippet',
				'type'            => 'video',
				'maxResults'      => 1,
				'videoEmbeddable' => 'true',
				'videoCategoryId' => '10', // Music
				'q'               => $q,
				'key'             => $api_key,
			),
			'https://www.googleapis.com/youtube/v3/search'
		);
		list( $code, $data ) = self::get_json( $url );
		if ( 403 === $code && false !== strpos( wp_json_encode( $data ), 'quota' ) ) {
			self::quota_exhaust();
			return self::fail( 'quota', 'Today\'s YouTube lookups are used up. Songs played before still work; new ones will be back tomorrow.', 503 );
		}
		if ( 200 !== $code ) {
			return self::fail( 'upstream', 'YouTube lookup failed' . ( 400 === $code || 403 === $code ? ' (check the YouTube API key in Settings)' : '' ) . '.', 502 );
		}
		$item = $data['items'][0] ?? null;
		$vid  = (string) ( $item['id']['videoId'] ?? '' );
		if ( ! preg_match( '/^[A-Za-z0-9_-]{11}$/', $vid ) ) {
			$out = array(
				'ok'    => false,
				'code'  => 'not_found',
				'error' => 'No playable video found.',
			);
			MusicMap_Store::cache_set( $key, 'yt', $out, 7 * DAY_IN_SECONDS );
			return self::reply( $out, 404 );
		}
		$out = array(
			'ok'      => true,
			'videoId' => $vid,
			'title'   => self::str( html_entity_decode( (string) ( $item['snippet']['title'] ?? '' ), ENT_QUOTES | ENT_HTML5, 'UTF-8' ), 160 ),
			'channel' => self::str( (string) ( $item['snippet']['channelTitle'] ?? '' ), 80 ),
		);
		MusicMap_Store::cache_set( $key, 'yt', $out, 180 * DAY_IN_SECONDS );
		return self::reply( $out, 200, 86400 );
	}

	/** YouTube's quota resets at midnight Pacific time. */
	private static function quota_day() {
		$dt = new DateTime( 'now', new DateTimeZone( 'America/Los_Angeles' ) );
		return $dt->format( 'Y-m-d' );
	}

	public static function quota_status() {
		$q = get_option( 'musicmap_yt_quota', array() );
		$used = ( is_array( $q ) && ( $q['day'] ?? '' ) === self::quota_day() ) ? (int) $q['used'] : 0;
		return array(
			'day'   => self::quota_day(),
			'used'  => $used,
			'limit' => (int) MusicMap_Settings::get( 'youtube_daily_units' ),
		);
	}

	private static function quota_take( $units ) {
		$s = self::quota_status();
		if ( $s['used'] + $units > $s['limit'] ) {
			return false;
		}
		update_option(
			'musicmap_yt_quota',
			array(
				'day'  => $s['day'],
				'used' => $s['used'] + $units,
			),
			false
		);
		return true;
	}

	private static function quota_exhaust() {
		$s = self::quota_status();
		update_option(
			'musicmap_yt_quota',
			array(
				'day'  => $s['day'],
				'used' => $s['limit'],
			),
			false
		);
	}
}
