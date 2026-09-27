<?php
/**
 * Plugin Name: MusicMap API
 * Description: REST backend for the MusicMap location-based music discovery app (Made Here / Most Popular Here / Genre Popular Songs), proxying Nominatim, MusicBrainz, Last.fm, and YouTube so the static frontend can call them without hitting CORS restrictions.
 * Version: 0.1.0
 * Author: Jongle IT
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'MUSICMAP_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

require_once MUSICMAP_PLUGIN_DIR . 'includes/class-http.php';
require_once MUSICMAP_PLUGIN_DIR . 'includes/class-geocode.php';
require_once MUSICMAP_PLUGIN_DIR . 'includes/class-musicbrainz.php';
require_once MUSICMAP_PLUGIN_DIR . 'includes/class-lastfm.php';
require_once MUSICMAP_PLUGIN_DIR . 'includes/class-genre-map.php';
require_once MUSICMAP_PLUGIN_DIR . 'includes/class-youtube.php';

register_activation_hook( __FILE__, array( 'MusicMap_YouTube', 'install_table' ) );

/* ---------------------------------------------------------------------
 * Settings page: Settings > MusicMap — Last.fm key, YouTube key, contact email.
 * ------------------------------------------------------------------ */

add_action( 'admin_menu', function () {
	add_options_page( 'MusicMap', 'MusicMap', 'manage_options', 'musicmap-settings', 'musicmap_render_settings_page' );
} );

add_action( 'admin_init', function () {
	register_setting( 'musicmap_settings', 'musicmap_lastfm_api_key', array( 'sanitize_callback' => 'sanitize_text_field' ) );
	register_setting( 'musicmap_settings', 'musicmap_youtube_api_key', array( 'sanitize_callback' => 'sanitize_text_field' ) );
	register_setting( 'musicmap_settings', 'musicmap_contact_email', array( 'sanitize_callback' => 'sanitize_email' ) );
} );

function musicmap_render_settings_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	?>
	<div class="wrap">
		<h1>MusicMap Settings</h1>
		<form method="post" action="options.php">
			<?php settings_fields( 'musicmap_settings' ); ?>
			<table class="form-table">
				<tr>
					<th><label for="musicmap_lastfm_api_key">Last.fm API key</label></th>
					<td>
						<input type="text" class="regular-text" id="musicmap_lastfm_api_key" name="musicmap_lastfm_api_key" value="<?php echo esc_attr( get_option( 'musicmap_lastfm_api_key', '' ) ); ?>" />
						<p class="description">Free key from <a href="https://www.last.fm/api/account/create" target="_blank" rel="noopener">last.fm/api/account/create</a>.</p>
					</td>
				</tr>
				<tr>
					<th><label for="musicmap_youtube_api_key">YouTube Data API v3 key</label></th>
					<td>
						<input type="text" class="regular-text" id="musicmap_youtube_api_key" name="musicmap_youtube_api_key" value="<?php echo esc_attr( get_option( 'musicmap_youtube_api_key', '' ) ); ?>" />
						<p class="description">From a Google Cloud project with the YouTube Data API v3 enabled. Free quota is 10,000 units/day (~100 searches); results are cached permanently once resolved.</p>
					</td>
				</tr>
				<tr>
					<th><label for="musicmap_contact_email">Contact email</label></th>
					<td>
						<input type="email" class="regular-text" id="musicmap_contact_email" name="musicmap_contact_email" value="<?php echo esc_attr( get_option( 'musicmap_contact_email', '' ) ); ?>" />
						<p class="description">Used in the User-Agent sent to Nominatim/MusicBrainz, as required by their usage policies.</p>
					</td>
				</tr>
			</table>
			<?php submit_button(); ?>
		</form>
	</div>
	<?php
}

/* ---------------------------------------------------------------------
 * REST routes: /wp-json/musicmap/v1/*
 * ------------------------------------------------------------------ */

add_action( 'rest_api_init', function () {
	register_rest_route( 'musicmap/v1', '/location', array(
		'methods'             => 'GET',
		'permission_callback' => '__return_true',
		'callback'            => 'musicmap_route_location',
		'args'                => array(
			'lat' => array( 'required' => true ),
			'lng' => array( 'required' => true ),
		),
	) );

	register_rest_route( 'musicmap/v1', '/made-here', array(
		'methods'             => 'GET',
		'permission_callback' => '__return_true',
		'callback'            => 'musicmap_route_made_here',
	) );

	register_rest_route( 'musicmap/v1', '/popular-here', array(
		'methods'             => 'GET',
		'permission_callback' => '__return_true',
		'callback'            => 'musicmap_route_popular_here',
	) );

	register_rest_route( 'musicmap/v1', '/genres', array(
		'methods'             => 'GET',
		'permission_callback' => '__return_true',
		'callback'            => 'musicmap_route_genres',
	) );

	register_rest_route( 'musicmap/v1', '/resolve-video', array(
		'methods'             => 'GET',
		'permission_callback' => '__return_true',
		'callback'            => 'musicmap_route_resolve_video',
	) );
} );

function musicmap_wp_error_response( $wp_error ) {
	return new WP_REST_Response( array( 'error' => $wp_error->get_error_message() ), 502 );
}

function musicmap_video_thumbnail( $video_id ) {
	return "https://i.ytimg.com/vi/{$video_id}/mqdefault.jpg";
}

/**
 * Resolves a list of ['artist','track'] pairs to playable video entries,
 * silently skipping any that fail to resolve (missing key, no result, etc.)
 * rather than failing the whole preset over one bad lookup.
 */
function musicmap_resolve_tracks( $pairs, $limit ) {
	$results = array();
	foreach ( array_slice( $pairs, 0, $limit ) as $pair ) {
		$video = MusicMap_YouTube::resolve( $pair['artist'], $pair['track'] );
		if ( is_wp_error( $video ) ) {
			continue;
		}
		$results[] = array(
			'artist'    => $pair['artist'],
			'track'     => $pair['track'],
			'video_id'  => $video['video_id'],
			'title'     => $video['title'],
			'thumbnail' => musicmap_video_thumbnail( $video['video_id'] ),
		);
	}
	return $results;
}

function musicmap_route_location( $request ) {
	$place = MusicMap_Geocode::reverse( $request->get_param( 'lat' ), $request->get_param( 'lng' ) );

	if ( is_wp_error( $place ) ) {
		return musicmap_wp_error_response( $place );
	}

	return new WP_REST_Response( $place, 200 );
}

function musicmap_route_made_here( $request ) {
	$place = array(
		'city'    => $request->get_param( 'city' ),
		'region'  => $request->get_param( 'region' ),
		'country' => $request->get_param( 'country' ),
	);

	$artists = MusicMap_MusicBrainz::artists_from( $place, 12 );
	if ( is_wp_error( $artists ) ) {
		return musicmap_wp_error_response( $artists );
	}

	$pairs = array_map( function ( $artist ) {
		return array( 'artist' => $artist['name'], 'track' => null );
	}, $artists );

	$tracks = musicmap_resolve_tracks( $pairs, 8 );

	// Carry the "matched_on" (city/region/country) precision info through for the UI.
	foreach ( $tracks as $i => &$track ) {
		$track['matched_on'] = isset( $artists[ $i ]['matched_on'] ) ? $artists[ $i ]['matched_on'] : null;
	}

	return new WP_REST_Response( array( 'tracks' => $tracks ), 200 );
}

function musicmap_route_popular_here( $request ) {
	$country = $request->get_param( 'country' );
	if ( ! $country ) {
		return musicmap_wp_error_response( new WP_Error( 'musicmap_missing_country', 'A country is required.' ) );
	}

	$pairs = MusicMap_LastFm::top_tracks_for_country( $country, 12 );
	if ( is_wp_error( $pairs ) ) {
		return musicmap_wp_error_response( $pairs );
	}

	$tracks = musicmap_resolve_tracks( $pairs, 8 );

	return new WP_REST_Response( array( 'tracks' => $tracks ), 200 );
}

function musicmap_route_genres( $request ) {
	$country = $request->get_param( 'country' );
	if ( ! $country ) {
		return musicmap_wp_error_response( new WP_Error( 'musicmap_missing_country', 'A country is required.' ) );
	}

	$top_artists = MusicMap_LastFm::top_artists_for_country( $country, 40 );
	if ( is_wp_error( $top_artists ) ) {
		return musicmap_wp_error_response( $top_artists );
	}

	$tracks_per_genre = 5;
	$max_artists_scanned = 40;

	$buckets = array_fill_keys( MusicMap_GenreMap::all_bucket_keys(), array() );

	foreach ( array_slice( $top_artists, 0, $max_artists_scanned ) as $artist_name ) {
		// Stop scanning once every bucket has enough artists to fill its playlist.
		$still_needed = false;
		foreach ( $buckets as $bucket_tracks ) {
			if ( count( $bucket_tracks ) < $tracks_per_genre ) {
				$still_needed = true;
				break;
			}
		}
		if ( ! $still_needed ) {
			break;
		}

		$tags = MusicMap_LastFm::top_tags_for_artist( $artist_name );
		if ( is_wp_error( $tags ) || empty( $tags ) ) {
			continue;
		}

		$bucket_key = MusicMap_GenreMap::bucket_for_tags( $tags );
		if ( ! $bucket_key || count( $buckets[ $bucket_key ] ) >= $tracks_per_genre ) {
			continue;
		}

		$artist_tracks = MusicMap_LastFm::top_tracks_for_artist( $artist_name, 2 );
		if ( is_wp_error( $artist_tracks ) ) {
			continue;
		}

		foreach ( $artist_tracks as $pair ) {
			if ( count( $buckets[ $bucket_key ] ) >= $tracks_per_genre ) {
				break;
			}
			$buckets[ $bucket_key ][] = $pair;
		}
	}

	$playlists = array();
	foreach ( $buckets as $bucket_key => $pairs ) {
		if ( empty( $pairs ) ) {
			continue;
		}
		$resolved = musicmap_resolve_tracks( $pairs, $tracks_per_genre );
		if ( empty( $resolved ) ) {
			continue;
		}
		$playlists[] = array(
			'genre'  => MusicMap_GenreMap::label_for_bucket( $bucket_key ),
			'tracks' => $resolved,
		);
	}

	return new WP_REST_Response( array( 'playlists' => $playlists ), 200 );
}

function musicmap_route_resolve_video( $request ) {
	$artist = $request->get_param( 'artist' );
	$track  = $request->get_param( 'track' );

	if ( ! $artist ) {
		return musicmap_wp_error_response( new WP_Error( 'musicmap_missing_artist', 'An artist is required.' ) );
	}

	$video = MusicMap_YouTube::resolve( $artist, $track );
	if ( is_wp_error( $video ) ) {
		return musicmap_wp_error_response( $video );
	}

	return new WP_REST_Response( array_merge( $video, array( 'thumbnail' => musicmap_video_thumbnail( $video['video_id'] ) ) ), 200 );
}
