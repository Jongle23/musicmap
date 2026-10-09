<?php
/**
 * [musicmap] shortcode (also [MusicMap]): renders the app on any page or post.
 *
 * The markup, CSS and JS in assets/ are generated from musicmap.html by tools/build_plugin.py.
 * Server settings reach the app as window.MUSICMAP_CONFIG; API keys are never included.
 */

defined( 'ABSPATH' ) || exit;

class MusicMap_Shortcode {

	const LEAFLET_VER = '1.9.4';
	const LEAFLET_SRI = array(
		'css' => 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=',
		'js'  => 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=',
	);

	private static $rendered = false;

	public static function init() {
		add_shortcode( 'musicmap', array( __CLASS__, 'render' ) );
		add_shortcode( 'MusicMap', array( __CLASS__, 'render' ) ); // shortcode tags are case-sensitive
		add_action( 'wp_enqueue_scripts', array( __CLASS__, 'early_enqueue' ) );
		add_filter( 'style_loader_tag', array( __CLASS__, 'add_sri' ), 10, 2 );
		add_filter( 'script_loader_tag', array( __CLASS__, 'add_sri' ), 10, 2 );
	}

	/** Pin Leaflet from the CDN to the exact published file (Subresource Integrity). */
	public static function add_sri( $tag, $handle ) {
		$map = array(
			'musicmap-leaflet'    => self::LEAFLET_SRI['css'],
			'musicmap-leaflet-js' => self::LEAFLET_SRI['js'],
		);
		if ( isset( $map[ $handle ] ) && false === strpos( $tag, 'integrity=' ) ) {
			$tag = preg_replace( '/(<(?:link|script)\b)/', '$1 integrity="' . esc_attr( $map[ $handle ] ) . '" crossorigin="anonymous"', $tag, 1 );
		}
		return $tag;
	}

	public static function render() {
		// One app per page: the markup uses fixed element ids
		if ( self::$rendered ) {
			return '<!-- MusicMap is already on this page -->';
		}
		$markup_file = MUSICMAP_DIR . 'assets/musicmap-markup.html';
		if ( ! is_readable( $markup_file ) ) {
			return current_user_can( 'manage_options' )
				? '<p><strong>MusicMap:</strong> assets are missing. Run <code>python tools/build_plugin.py</code> and re-upload the plugin.</p>'
				: '';
		}
		self::$rendered = true;

		self::enqueue();
		return (string) file_get_contents( $markup_file ); // phpcs:ignore WordPress.WP.AlternativeFunctions -- local plugin file
	}

	/** On singular pages whose content has the shortcode, load styles in <head> (no flash of unstyled app). */
	public static function early_enqueue() {
		$post = get_post();
		if ( is_singular() && $post && ( has_shortcode( $post->post_content, 'musicmap' ) || has_shortcode( $post->post_content, 'MusicMap' ) ) ) {
			self::enqueue();
		}
	}

	/** Safe to call twice: WordPress de-duplicates handles and inline config is added once. */
	public static function enqueue() {
		static $done = false;
		if ( $done ) {
			return;
		}
		$done = true;
		$ver = MUSICMAP_VERSION . '.' . filemtime( MUSICMAP_DIR . 'assets/musicmap.js' );
		$lf  = 'https://unpkg.com/leaflet@' . self::LEAFLET_VER . '/dist/';
		wp_enqueue_style( 'musicmap-leaflet', $lf . 'leaflet.css', array(), null ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion -- version is in the pinned URL
		wp_enqueue_style( 'musicmap', MUSICMAP_URL . 'assets/musicmap.css', array( 'musicmap-leaflet' ), $ver );
		wp_enqueue_script( 'musicmap-leaflet-js', $lf . 'leaflet.js', array(), null, true ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
		wp_enqueue_script( 'musicmap', MUSICMAP_URL . 'assets/musicmap.js', array( 'musicmap-leaflet-js' ), $ver, true );

		$config = array(
			'version'     => MUSICMAP_VERSION,
			// the app appends "ping" / "save" / "load&code=…", so this must end in "mm_action="
			// (add_query_arg() would drop the "=" for an empty value)
			'shareApi'    => esc_url_raw( home_url( '/' ) ) . ( false === strpos( home_url( '/' ), '?' ) ? '?' : '&' ) . 'mm_action=',
			'restBase'    => esc_url_raw( rest_url( 'musicmap/v1/' ) ),
			'publicPacks' => (bool) MusicMap_Settings::get( 'public_packs' ),
			'logoUrl'     => MUSICMAP_URL . 'assets/musicmap-logo-512.png', // header uses the 192px copy; lock screens the 512px one
		);
		$spotify = (string) MusicMap_Settings::get( 'spotify_client_id' );
		if ( '' !== $spotify ) {
			$config['spotifyClientId'] = $spotify;
		}
		$support = (string) MusicMap_Settings::get( 'support_url' );
		if ( '' !== $support ) {
			$config['supportUrl'] = esc_url_raw( $support, array( 'https' ) );
		}
		if ( class_exists( 'MusicMap_Channels' ) && MusicMap_Channels::apple_music_ready() ) {
			$config['appleMusic'] = true; // the key stays on the server; the app asks /musickit for a token
		}
		wp_add_inline_script( 'musicmap', 'window.MUSICMAP_CONFIG=' . wp_json_encode( $config ) . ';', 'before' );
	}
}
