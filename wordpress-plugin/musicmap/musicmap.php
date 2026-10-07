<?php
/**
 * Plugin Name:       MusicMap
 * Plugin URI:        https://jongle.me/musicmap
 * Description:       Location-aware music player. Add the [musicmap] shortcode to any page. Settings and data live under the MusicMap admin menu.
 * Version:           1.10
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Jongle
 * Author URI:        https://jongle.me
 * License:           MusicMap Source Available License
 * Text Domain:       musicmap
 */

defined( 'ABSPATH' ) || exit;

define( 'MUSICMAP_VERSION', '1.10' );
define( 'MUSICMAP_FILE', __FILE__ );
define( 'MUSICMAP_DIR', plugin_dir_path( __FILE__ ) );
define( 'MUSICMAP_URL', plugin_dir_url( __FILE__ ) );

require_once MUSICMAP_DIR . 'includes/class-musicmap-settings.php';
require_once MUSICMAP_DIR . 'includes/class-musicmap-store.php';
require_once MUSICMAP_DIR . 'includes/class-musicmap-api.php';
require_once MUSICMAP_DIR . 'includes/class-musicmap-shortcode.php';
require_once MUSICMAP_DIR . 'includes/class-musicmap-channels.php';

register_activation_hook( __FILE__, array( 'MusicMap_Store', 'activate' ) );

add_action( 'plugins_loaded', array( 'MusicMap_Store', 'maybe_upgrade' ) );

MusicMap_Settings::init();
MusicMap_Api::init();
MusicMap_Shortcode::init();
MusicMap_Channels::init();

if ( is_admin() ) {
	require_once MUSICMAP_DIR . 'includes/class-musicmap-admin-data.php';
	MusicMap_Admin_Data::init();
}
