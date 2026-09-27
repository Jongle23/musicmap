<?php
/**
 * Normalizes messy, user-submitted Last.fm tags into a fixed set of main
 * genre buckets, so "Genre Popular Songs" playlists group artists sensibly
 * instead of splintering across hundreds of micro-genre tags.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class MusicMap_GenreMap {

	/**
	 * Ordered list of [bucket_key, label, [tag substrings that map to it]].
	 * Order matters: first match wins, so more specific buckets are checked
	 * before broad ones (e.g. "hip hop" before "pop" would wrongly not match
	 * anyway since substrings differ, but ordering keeps this easy to extend).
	 */
	private static $buckets = array(
		'hiphop'      => array(
			'label' => 'Hip-Hop/Rap',
			'tags'  => array( 'hip hop', 'hip-hop', 'rap', 'trap' ),
		),
		'electronic'  => array(
			'label' => 'Electronic/Dance',
			'tags'  => array( 'electronic', 'edm', 'dance', 'house', 'techno', 'trance', 'dubstep' ),
		),
		'rnb'         => array(
			'label' => 'R&B/Soul',
			'tags'  => array( 'r&b', 'rnb', 'soul', 'funk' ),
		),
		'latin'       => array(
			'label' => 'Latin',
			'tags'  => array( 'latin', 'reggaeton', 'salsa', 'bachata' ),
		),
		'country'     => array(
			'label' => 'Country',
			'tags'  => array( 'country', 'americana', 'bluegrass' ),
		),
		'classical'   => array(
			'label' => 'Classical',
			'tags'  => array( 'classical', 'orchestra', 'opera' ),
		),
		'rock'        => array(
			'label' => 'Rock',
			'tags'  => array( 'rock', 'metal', 'punk', 'indie' ),
		),
		'pop'         => array(
			'label' => 'Pop',
			'tags'  => array( 'pop' ),
		),
	);

	/**
	 * @param string[] $tags Lowercase tags, most relevant first (as returned by Last.fm).
	 * @return string|null Bucket key, or null if nothing matched.
	 */
	public static function bucket_for_tags( $tags ) {
		foreach ( $tags as $tag ) {
			foreach ( self::$buckets as $key => $bucket ) {
				foreach ( $bucket['tags'] as $needle ) {
					if ( false !== strpos( $tag, $needle ) ) {
						return $key;
					}
				}
			}
		}

		return null;
	}

	public static function label_for_bucket( $key ) {
		return isset( self::$buckets[ $key ] ) ? self::$buckets[ $key ]['label'] : $key;
	}

	public static function all_bucket_keys() {
		return array_keys( self::$buckets );
	}
}
