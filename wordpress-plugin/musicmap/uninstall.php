<?php
/**
 * Runs when the plugin is deleted from WP Admin > Plugins.
 * Data is only removed if "Also delete all MusicMap data" was ticked in MusicMap > Settings.
 */

defined( 'WP_UNINSTALL_PLUGIN' ) || exit;

$musicmap_settings = get_option( 'musicmap_settings', array() );
if ( empty( $musicmap_settings['delete_on_uninstall'] ) ) {
	return;
}

global $wpdb;
foreach ( array( 'packs', 'cache', 'rate', 'reports' ) as $musicmap_table ) {
	$wpdb->query( 'DROP TABLE IF EXISTS ' . $wpdb->prefix . 'musicmap_' . $musicmap_table ); // phpcs:ignore WordPress.DB.PreparedSQL,WordPress.DB.DirectDatabaseQuery
}
delete_option( 'musicmap_settings' );
delete_option( 'musicmap_db_version' );
