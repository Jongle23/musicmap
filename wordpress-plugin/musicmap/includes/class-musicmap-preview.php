<?php
/**
 * Link previews: Open Graph / Twitter tags for pages that show MusicMap.
 *
 * Chat apps and social sites build a preview from these tags without running JavaScript, so they are
 * written here, server-side. A MusicMap share link (?ml_ch=…) gets text about what was shared:
 *   ml_ch=song  + ml_t / ml_a           → "♪ Title — Artist"
 *   ml_ch=radio|popular|made + ml_n/ml_p → "Listen to <name> near <place>" / "Listen around <place>"
 * Everything from the address is untrusted: limited in length, stripped of tags, always placed inside a
 * fixed sentence (so a link can't make the preview say just anything), and escaped on output.
 */

defined( 'ABSPATH' ) || exit;

class MusicMap_Preview {

	const CHANNELS = array(
		'popular' => 'Popular',
		'made'    => 'Homegrown',
		'genres'  => 'Popular',
		'radio'   => 'Radio',
		'song'    => '',
	);

	public static function init() {
		add_action( 'template_redirect', array( __CLASS__, 'prepare' ) ); // before <head>: other plugins' tags must step aside in time
		add_action( 'wp_head', array( __CLASS__, 'tags' ), 1 );
	}

	public static function prepare() {
		if ( self::on_app_page() && self::describe()[1] ) {
			self::quiet_other_tags();
		}
	}

	private static function on_app_page() {
		$post = get_post();
		return is_singular() && $post && ( has_shortcode( $post->post_content, 'musicmap' ) || has_shortcode( $post->post_content, 'MusicMap' ) );
	}

	/** A short, plain-text value from the address (or ''). */
	private static function arg( $key, $max ) {
		if ( ! isset( $_GET[ $key ] ) ) { // phpcs:ignore WordPress.Security.NonceVerification -- read-only display text
			return '';
		}
		$v = wp_strip_all_tags( wp_unslash( (string) $_GET[ $key ] ) ); // phpcs:ignore WordPress.Security.NonceVerification
		$v = preg_replace( '/[\x00-\x1F\x7F]+|\s+/u', ' ', $v );
		return mb_substr( trim( (string) $v ), 0, $max );
	}

	/** Title and description for this request. */
	private static function describe() {
		$site = array(
			'title' => 'MusicMap',
			'desc'  => 'Wander your world in music: biome soundtracks, live local radio, and the songs and artists from wherever you are.',
		);
		$ch = isset( $_GET['ml_ch'] ) ? sanitize_key( wp_unslash( $_GET['ml_ch'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification
		if ( '' === $ch || ! array_key_exists( $ch, self::CHANNELS ) ) {
			return array( $site, false );
		}
		$place = self::arg( 'ml_p', 60 );
		if ( 'song' === $ch ) {
			$t = self::arg( 'ml_t', 90 );
			$a = self::arg( 'ml_a', 70 );
			if ( '' === $t || '' === $a ) {
				return array( $site, false );
			}
			return array(
				array(
					'title' => '♪ ' . $t . ' — ' . $a,
					'desc'  => 'Someone shared a song with you on MusicMap. Tap to listen.',
				),
				true,
			);
		}
		$name  = self::arg( 'ml_n', 70 );
		$label = self::CHANNELS[ $ch ];
		if ( '' !== $name ) {
			$title = 'Listen to ' . $name . ( '' !== $place ? ' near ' . $place : '' );
		} elseif ( '' !== $place ) {
			$title = 'Listen around ' . $place;
		} else {
			$title = 'Listen on MusicMap';
		}
		$desc = ( '' !== $place ? $label . ' around ' . $place : $label ) . ' on MusicMap: live local radio, the area\'s top songs and its homegrown artists. Tap to listen.';
		return array(
			array(
				'title' => $title,
				'desc'  => $desc,
			),
			true,
		);
	}

	public static function tags() {
		if ( ! self::on_app_page() ) {
			return;
		}
		list( $d, $is_share ) = self::describe();

		// SEO plugins write their own tags for the page. For a share link ours are the useful ones, so theirs
		// step aside; for the plain page, theirs win and we add nothing.
		$seo = defined( 'WPSEO_VERSION' ) || class_exists( 'RankMath' ) || defined( 'AIOSEO_VERSION' ) || defined( 'SEOPRESS_VERSION' );
		if ( $seo && ! $is_share ) {
			return;
		}

		$url   = $is_share ? self::current_url() : get_permalink();
		$image = MUSICMAP_URL . 'assets/musicmap-share-card.png';
		$tags  = array(
			'og:type'             => 'website',
			'og:site_name'        => get_bloginfo( 'name' ) ? get_bloginfo( 'name' ) : 'MusicMap',
			'og:title'            => $d['title'],
			'og:description'      => $d['desc'],
			'og:url'              => $url,
			'og:image'            => $image,
			'og:image:width'      => '1200',
			'og:image:height'     => '630',
			'og:image:alt'        => 'MusicMap: wander your world in music',
			'twitter:card'        => 'summary_large_image',
			'twitter:title'       => $d['title'],
			'twitter:description' => $d['desc'],
			'twitter:image'       => $image,
		);
		echo "\n<!-- MusicMap link preview -->\n";
		foreach ( $tags as $prop => $content ) {
			$attr = 0 === strpos( $prop, 'twitter:' ) ? 'name' : 'property';
			$val  = in_array( $prop, array( 'og:url', 'og:image', 'twitter:image' ), true ) ? esc_url( $content ) : esc_attr( $content );
			printf( "<meta %s=\"%s\" content=\"%s\">\n", esc_attr( $attr ), esc_attr( $prop ), $val ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped just above
		}
		if ( $is_share ) {
			printf( "<meta name=\"description\" content=\"%s\">\n", esc_attr( $d['desc'] ) );
		}
	}

	/** This page's address with only MusicMap's share parameters kept (and nothing else from the request). */
	private static function current_url() {
		$keep = array();
		foreach ( array( 'ml_lat', 'ml_lon', 'ml_ch', 'ml_st', 'ml_t', 'ml_a', 'ml_g', 'ml_v', 'ml_n', 'ml_p' ) as $k ) {
			$v = self::arg( $k, 160 );
			if ( '' !== $v ) {
				$keep[ $k ] = $v;
			}
		}
		return add_query_arg( array_map( 'rawurlencode', $keep ), get_permalink() );
	}

	/** Stop other plugins' Open Graph tags for this request (so a share link's preview isn't overridden). */
	private static function quiet_other_tags() {
		add_filter( 'jetpack_enable_open_graph', '__return_false' );
		add_filter(
			'wpseo_frontend_presenters',
			function ( $presenters ) {
				return array_filter(
					(array) $presenters,
					function ( $p ) {
						$c = is_object( $p ) ? get_class( $p ) : '';
						return false === strpos( $c, 'Open_Graph' ) && false === strpos( $c, 'Twitter' ) && false === strpos( $c, 'Meta_Description' );
					}
				);
			}
		);
		add_filter( 'rank_math/opengraph/facebook', '__return_false' );
		add_filter( 'rank_math/opengraph/twitter', '__return_false' );
	}
}
