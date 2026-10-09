<?php
/**
 * MusicMap > Data: view and delete what MusicMap stores.
 *
 * Every page checks manage_options; every change goes through admin-post.php with a nonce,
 * then redirects back with a notice (no changes on plain GET page loads).
 */

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'WP_List_Table' ) ) {
	require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}

class MusicMap_Packs_Table extends WP_List_Table {

	public function __construct() {
		parent::__construct(
			array(
				'singular' => 'share code',
				'plural'   => 'share codes',
				'ajax'     => false,
			)
		);
	}

	public function get_columns() {
		return array(
			'cb'          => '<input type="checkbox">',
			'code'        => __( 'Code', 'musicmap' ),
			'name'        => __( 'Pack name', 'musicmap' ),
			'track_count' => __( 'Tracks', 'musicmap' ),
			'size_bytes'  => __( 'Size', 'musicmap' ),
			'views'       => __( 'Views', 'musicmap' ),
			'created_gmt' => __( 'Created', 'musicmap' ),
			'public'      => __( 'Public Packs', 'musicmap' ),
			'installs'    => __( 'Installed on', 'musicmap' ),
			'rating_count' => __( 'Rating', 'musicmap' ),
		);
	}

	protected function get_sortable_columns() {
		return array(
			'code'        => array( 'code', false ),
			'name'        => array( 'name', false ),
			'track_count' => array( 'track_count', false ),
			'size_bytes'  => array( 'size_bytes', false ),
			'views'       => array( 'views', false ),
			'created_gmt' => array( 'created_gmt', true ),
			'public'      => array( 'public', true ),
			'installs'    => array( 'installs', true ),
			'rating_count' => array( 'rating_count', true ),
		);
	}

	protected function get_bulk_actions() {
		return array(
			'delete' => __( 'Delete', 'musicmap' ),
			'unlist' => __( 'Remove from Public Packs', 'musicmap' ),
			'list'   => __( 'Add to Public Packs', 'musicmap' ),
		);
	}

	protected function column_cb( $item ) {
		return '<input type="checkbox" name="codes[]" value="' . esc_attr( $item['code'] ) . '">';
	}

	protected function column_code( $item ) {
		$view   = add_query_arg(
			array(
				'page' => MusicMap_Admin_Data::PAGE,
				'view' => $item['code'],
			),
			admin_url( 'admin.php' )
		);
		$delete = wp_nonce_url(
			add_query_arg(
				array(
					'action' => 'musicmap_delete_packs',
					'codes'  => array( $item['code'] ),
				),
				admin_url( 'admin-post.php' )
			),
			'musicmap_delete_packs'
		);
		$actions = array(
			'view'   => '<a href="' . esc_url( $view ) . '">' . esc_html__( 'View', 'musicmap' ) . '</a>',
			'delete' => '<a href="' . esc_url( $delete ) . '" class="submitdelete" onclick="return confirm(\'' . esc_js( __( 'Delete this share code? Anyone with the code will no longer be able to import it.', 'musicmap' ) ) . '\');">' . esc_html__( 'Delete', 'musicmap' ) . '</a>',
		);
		return '<strong><code>' . esc_html( $item['code'] ) . '</code></strong>' . $this->row_actions( $actions );
	}

	protected function column_default( $item, $col ) {
		switch ( $col ) {
			case 'size_bytes':
				return esc_html( size_format( (int) $item['size_bytes'], 1 ) );
			case 'installs':
				/* translators: %d: number of devices */
				return esc_html( sprintf( _n( '%d device', '%d devices', (int) $item['installs'], 'musicmap' ), (int) $item['installs'] ) );
			case 'rating_count':
				$avg = MusicMap_Store::average( $item );
				/* translators: 1: average stars, 2: number of ratings */
				return null === $avg ? '—' : esc_html( sprintf( _n( '★ %1$s (%2$d rating)', '★ %1$s (%2$d ratings)', (int) $item['rating_count'], 'musicmap' ), number_format_i18n( $avg, 1 ), (int) $item['rating_count'] ) );
			case 'public':
				return empty( $item['public'] ) ? '—' : '<strong>' . esc_html__( 'Listed', 'musicmap' ) . '</strong>';
			case 'created_gmt':
				$ts = strtotime( $item['created_gmt'] . ' UTC' );
				$s  = esc_html( wp_date( get_option( 'date_format' ) . ' ' . get_option( 'time_format' ), $ts ) );
				return empty( $item['public'] ) && MusicMap_Store::is_expired( $item['created_gmt'] ) ? $s . ' <span style="color:#b32d2e">(' . esc_html__( 'expired', 'musicmap' ) . ')</span>' : $s;
			default:
				return esc_html( (string) $item[ $col ] );
		}
	}

	public function no_items() {
		esc_html_e( 'No share codes yet.', 'musicmap' );
	}

	public function prepare_items() {
		$per_page = 25;
		$search   = isset( $_REQUEST['s'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['s'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification -- read-only listing
		$orderby  = isset( $_REQUEST['orderby'] ) ? sanitize_key( wp_unslash( $_REQUEST['orderby'] ) ) : 'created_gmt'; // phpcs:ignore WordPress.Security.NonceVerification
		$order    = isset( $_REQUEST['order'] ) ? sanitize_key( wp_unslash( $_REQUEST['order'] ) ) : 'desc'; // phpcs:ignore WordPress.Security.NonceVerification
		list( $rows, $total ) = MusicMap_Store::list_packs( $search, $orderby, $order, $per_page, $this->get_pagenum() );
		$this->items           = $rows;
		$this->_column_headers = array( $this->get_columns(), array(), $this->get_sortable_columns() );
		$this->set_pagination_args(
			array(
				'total_items' => $total,
				'per_page'    => $per_page,
			)
		);
	}
}

class MusicMap_Admin_Data {

	const PAGE = 'musicmap-data';

	public static function init() {
		add_action( 'admin_menu', array( __CLASS__, 'menu' ), 20 );
		foreach ( array( 'delete_packs', 'purge_packs', 'clear_cache', 'clear_rate', 'migrate_files', 'delete_files' ) as $a ) {
			add_action( 'admin_post_musicmap_' . $a, array( __CLASS__, 'handle_' . $a ) );
		}
	}

	public static function menu() {
		add_submenu_page( MusicMap_Settings::PAGE, __( 'MusicMap Data', 'musicmap' ), __( 'Data', 'musicmap' ), 'manage_options', self::PAGE, array( __CLASS__, 'render' ) );
	}

	private static function url( $args = array() ) {
		return add_query_arg( array_merge( array( 'page' => self::PAGE ), $args ), admin_url( 'admin.php' ) );
	}

	/** Shared guard for every change. */
	private static function guard( $nonce_action ) {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'You are not allowed to do that.', 'musicmap' ), 403 );
		}
		check_admin_referer( $nonce_action );
	}

	private static function done( $tab, $msg ) {
		wp_safe_redirect( self::url( array( 'tab' => $tab, 'mm_notice' => rawurlencode( $msg ) ) ) );
		exit;
	}

	// ── Handlers ────────────────────────────────────────────────────────

	public static function handle_delete_packs() {
		self::guard( 'musicmap_delete_packs' );
		$codes = isset( $_REQUEST['codes'] ) ? array_map( 'sanitize_text_field', (array) wp_unslash( $_REQUEST['codes'] ) ) : array();
		// Bulk form: act on what was chosen in either bulk-action dropdown
		if ( isset( $_POST['bulk_action'] ) || isset( $_POST['bulk_action2'] ) ) {
			$bulk = array( sanitize_key( wp_unslash( $_POST['bulk_action'] ?? '' ) ), sanitize_key( wp_unslash( $_POST['bulk_action2'] ?? '' ) ) );
			foreach ( array( 'unlist', 'list' ) as $b ) {
				if ( in_array( $b, $bulk, true ) ) {
					$n = MusicMap_Store::set_public( $codes, 'list' === $b );
					/* translators: %d: number of share codes */
					self::done( 'packs', sprintf( 'list' === $b ? _n( 'Added %d pack to Public Packs.', 'Added %d packs to Public Packs.', $n, 'musicmap' ) : _n( 'Removed %d pack from Public Packs.', 'Removed %d packs from Public Packs.', $n, 'musicmap' ), $n ) );
				}
			}
			if ( ! in_array( 'delete', $bulk, true ) ) {
				self::done( 'packs', __( 'Choose an action in Bulk actions first.', 'musicmap' ) );
			}
		}
		$n     = MusicMap_Store::delete_packs( $codes );
		/* translators: %d: number of share codes */
		self::done( 'packs', sprintf( _n( 'Deleted %d share code.', 'Deleted %d share codes.', $n, 'musicmap' ), $n ) );
	}

	public static function handle_purge_packs() {
		self::guard( 'musicmap_purge_packs' );
		$n = MusicMap_Store::purge_expired_packs();
		/* translators: %d: number of share codes */
		self::done( 'packs', sprintf( _n( 'Deleted %d expired share code.', 'Deleted %d expired share codes.', $n, 'musicmap' ), $n ) );
	}

	public static function handle_clear_cache() {
		self::guard( 'musicmap_clear_cache' );
		$type = isset( $_POST['type'] ) ? sanitize_key( wp_unslash( $_POST['type'] ) ) : '';
		$n    = 'expired' === $type ? MusicMap_Store::cache_purge_expired() : MusicMap_Store::cache_delete_type( $type );
		/* translators: %d: number of cache entries */
		self::done( 'cache', sprintf( _n( 'Deleted %d cache entry.', 'Deleted %d cache entries.', $n, 'musicmap' ), $n ) );
	}

	public static function handle_clear_rate() {
		self::guard( 'musicmap_clear_rate' );
		$n = MusicMap_Store::rate_clear();
		/* translators: %d: number of records */
		self::done( 'rate', sprintf( _n( 'Cleared %d rate-limit record.', 'Cleared %d rate-limit records.', $n, 'musicmap' ), $n ) );
	}

	public static function handle_migrate_files() {
		self::guard( 'musicmap_migrate_files' );
		$n = MusicMap_Store::migrate_legacy_files();
		/* translators: %d: number of share codes */
		self::done( 'legacy', sprintf( __( 'Copied %d share codes from the old files.', 'musicmap' ), $n ) );
	}

	public static function handle_delete_files() {
		self::guard( 'musicmap_delete_files' );
		MusicMap_Store::migrate_legacy_files(); // never delete a file that hasn't been copied
		$n = MusicMap_Store::delete_legacy_files();
		/* translators: %d: number of files */
		self::done( 'legacy', sprintf( __( 'Deleted %d old files.', 'musicmap' ), $n ) );
	}

	// ── Page ────────────────────────────────────────────────────────────

	public static function render() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$tabs = array(
			'packs'  => __( 'Share codes', 'musicmap' ) . ' (' . MusicMap_Store::count( 'packs' ) . ')',
			'cache'  => __( 'Cache', 'musicmap' ) . ' (' . MusicMap_Store::count( 'cache' ) . ')',
			'rate'   => __( 'Rate limits', 'musicmap' ) . ' (' . MusicMap_Store::count( 'rate' ) . ')',
			'legacy' => __( 'Old snippet files', 'musicmap' ) . ' (' . MusicMap_Store::legacy_file_count() . ')',
		);
		$tab = isset( $_GET['tab'] ) ? sanitize_key( wp_unslash( $_GET['tab'] ) ) : 'packs'; // phpcs:ignore WordPress.Security.NonceVerification
		$tab = isset( $tabs[ $tab ] ) ? $tab : 'packs';
		?>
		<div class="wrap">
			<h1><?php esc_html_e( 'MusicMap Data', 'musicmap' ); ?></h1>
			<?php
			if ( isset( $_GET['mm_notice'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification -- display only
				echo '<div class="notice notice-success is-dismissible"><p>' . esc_html( sanitize_text_field( rawurldecode( wp_unslash( $_GET['mm_notice'] ) ) ) ) . '</p></div>'; // phpcs:ignore WordPress.Security.NonceVerification
			}
			?>
			<nav class="nav-tab-wrapper">
				<?php foreach ( $tabs as $id => $label ) : ?>
					<a href="<?php echo esc_url( self::url( array( 'tab' => $id ) ) ); ?>" class="nav-tab <?php echo $tab === $id ? 'nav-tab-active' : ''; ?>"><?php echo esc_html( $label ); ?></a>
				<?php endforeach; ?>
			</nav>
			<?php
			$view = isset( $_GET['view'] ) ? strtoupper( sanitize_text_field( wp_unslash( $_GET['view'] ) ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification
			if ( '' !== $view ) {
				self::render_pack( $view );
			} else {
				call_user_func( array( __CLASS__, 'render_' . $tab ) );
			}
			?>
		</div>
		<?php
	}

	private static function post_button( $action, $label, $fields = array(), $confirm = '', $class = 'button' ) {
		?>
		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" style="display:inline-block;margin:0 6px 6px 0"
			<?php echo $confirm ? 'onsubmit="return confirm(\'' . esc_js( $confirm ) . '\');"' : ''; ?>>
			<input type="hidden" name="action" value="musicmap_<?php echo esc_attr( $action ); ?>">
			<?php wp_nonce_field( 'musicmap_' . $action ); ?>
			<?php foreach ( $fields as $k => $v ) : ?>
				<input type="hidden" name="<?php echo esc_attr( $k ); ?>" value="<?php echo esc_attr( $v ); ?>">
			<?php endforeach; ?>
			<button type="submit" class="<?php echo esc_attr( $class ); ?>"><?php echo esc_html( $label ); ?></button>
		</form>
		<?php
	}

	private static function render_packs() {
		$table = new MusicMap_Packs_Table();
		$table->prepare_items();
		?>
		<p><?php echo esc_html( sprintf( /* translators: %d: days */ __( 'Packs people shared with a 6-character code. Codes older than %d days expire (change this in Settings); packs listed in Public Packs don\'t.', 'musicmap' ), (int) MusicMap_Settings::get( 'pack_expiry_days' ) ) ); ?></p>
		<?php self::post_button( 'purge_packs', __( 'Delete all expired codes', 'musicmap' ), array(), __( 'Delete every expired share code?', 'musicmap' ) ); ?>
		<form method="get">
			<input type="hidden" name="page" value="<?php echo esc_attr( self::PAGE ); ?>">
			<input type="hidden" name="tab" value="packs">
			<?php $table->search_box( __( 'Search codes', 'musicmap' ), 'musicmap-pack' ); ?>
		</form>
		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" onsubmit="return ![].some.call(this.querySelectorAll('select[name^=bulk_]'),function(s){return s.value==='delete';})||confirm('<?php echo esc_js( __( 'Delete the selected share codes?', 'musicmap' ) ); ?>');">
			<input type="hidden" name="action" value="musicmap_delete_packs">
			<?php $table->display(); ?>
			<?php wp_nonce_field( 'musicmap_delete_packs' ); // after the table: its own _wpnonce field would otherwise win ?>
		</form>
		<script>
		// WP_List_Table's bulk-action <select> is named "action"; keep ours as the real admin-post action
		document.querySelectorAll('select[name="action"],select[name="action2"]').forEach(function(s){s.name='bulk_'+s.name;});
		</script>
		<?php
	}

	private static function render_pack( $code ) {
		$row = MusicMap_Store::get_pack_row( $code );
		echo '<p><a href="' . esc_url( self::url( array( 'tab' => 'packs' ) ) ) . '">&larr; ' . esc_html__( 'All share codes', 'musicmap' ) . '</a></p>';
		if ( ! $row ) {
			echo '<p>' . esc_html__( 'That share code does not exist.', 'musicmap' ) . '</p>';
			return;
		}
		$pack   = json_decode( $row['pack'], true );
		$pretty = wp_json_encode( $pack, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES );
		?>
		<h2><code><?php echo esc_html( $row['code'] ); ?></code> &middot; <?php echo esc_html( $row['name'] ); ?></h2>
		<p>
			<?php
			echo esc_html(
				sprintf(
					/* translators: 1: tracks, 2: size, 3: views, 4: date */
					__( '%1$d tracks · %2$s · %3$d views · created %4$s', 'musicmap' ),
					(int) $row['track_count'],
					size_format( (int) $row['size_bytes'], 1 ),
					(int) $row['views'],
					wp_date( get_option( 'date_format' ), strtotime( $row['created_gmt'] . ' UTC' ) )
				)
			);
			?>
		</p>
		<?php self::post_button( 'delete_packs', __( 'Delete this share code', 'musicmap' ), array( 'codes[]' => $row['code'] ), __( 'Delete this share code?', 'musicmap' ), 'button button-link-delete' ); ?>
		<pre style="max-height:60vh;overflow:auto;background:#fff;border:1px solid #c3c4c7;padding:12px;white-space:pre-wrap"><?php echo esc_html( (string) $pretty ); ?></pre>
		<?php
	}

	private static function render_cache() {
		$rows = MusicMap_Store::cache_summary();
		echo '<p>' . esc_html__( 'Saved results of outside lookups (charts, radio now-playing, YouTube matches) so they are not repeated. Safe to clear; entries are rebuilt when needed.', 'musicmap' ) . '</p>';
		self::post_button( 'clear_cache', __( 'Delete expired entries', 'musicmap' ), array( 'type' => 'expired' ) );
		self::post_button( 'clear_cache', __( 'Clear all cache', 'musicmap' ), array( 'type' => '' ), __( 'Clear the whole cache?', 'musicmap' ), 'button button-link-delete' );
		if ( ! $rows ) {
			echo '<p><em>' . esc_html__( 'The cache is empty.', 'musicmap' ) . '</em></p>';
			return;
		}
		echo '<table class="widefat striped" style="max-width:900px"><thead><tr><th>' . esc_html__( 'Type', 'musicmap' ) . '</th><th>' . esc_html__( 'Entries', 'musicmap' ) . '</th><th>' . esc_html__( 'Size', 'musicmap' ) . '</th><th>' . esc_html__( 'Newest', 'musicmap' ) . '</th><th></th></tr></thead><tbody>';
		foreach ( $rows as $r ) {
			echo '<tr><td><code>' . esc_html( $r['type'] ) . '</code></td><td>' . (int) $r['entries'] . '</td><td>' . esc_html( size_format( (int) $r['bytes'], 1 ) ) . '</td><td>' . esc_html( $r['newest'] ) . ' UTC</td><td>';
			self::post_button( 'clear_cache', __( 'Clear', 'musicmap' ), array( 'type' => $r['type'] ) );
			echo '</td></tr>';
		}
		echo '</tbody></table>';
	}

	private static function render_rate() {
		$rows = MusicMap_Store::rate_summary();
		echo '<p>' . esc_html__( 'Counters that limit how often one visitor can save share codes. Visitors are stored only as one-way hashes, never as IP addresses.', 'musicmap' ) . '</p>';
		self::post_button( 'clear_rate', __( 'Clear all rate limits', 'musicmap' ), array(), __( 'Reset every visitor\'s rate limit?', 'musicmap' ) );
		if ( ! $rows ) {
			echo '<p><em>' . esc_html__( 'No rate-limit records.', 'musicmap' ) . '</em></p>';
			return;
		}
		echo '<table class="widefat striped" style="max-width:700px"><thead><tr><th>' . esc_html__( 'Action', 'musicmap' ) . '</th><th>' . esc_html__( 'Visitors', 'musicmap' ) . '</th><th>' . esc_html__( 'Hits', 'musicmap' ) . '</th><th>' . esc_html__( 'Latest window', 'musicmap' ) . '</th></tr></thead><tbody>';
		foreach ( $rows as $r ) {
			echo '<tr><td><code>' . esc_html( $r['action'] ) . '</code></td><td>' . (int) $r['visitors'] . '</td><td>' . (int) $r['hits'] . '</td><td>' . esc_html( wp_date( 'Y-m-d H:i', (int) $r['latest'] ) ) . '</td></tr>';
		}
		echo '</tbody></table>';
	}

	private static function render_legacy() {
		$n = MusicMap_Store::legacy_file_count();
		echo '<p>' . esc_html__( 'Before the plugin, the WPCode / PHP Snippets version of the share API saved packs as files in wp-content/uploads/musicmap_packs/. The plugin copies them into its database on activation, so existing codes keep working.', 'musicmap' ) . '</p>';
		if ( ! $n ) {
			echo '<p><em>' . esc_html__( 'No old files found.', 'musicmap' ) . '</em></p>';
			return;
		}
		/* translators: %d: number of files */
		echo '<p>' . esc_html( sprintf( __( '%d old files are still on disk.', 'musicmap' ), $n ) ) . '</p>';
		self::post_button( 'migrate_files', __( 'Copy again', 'musicmap' ) );
		self::post_button( 'delete_files', __( 'Delete old files', 'musicmap' ), array(), __( 'Delete the old snippet files? Their share codes are already copied into the database.', 'musicmap' ), 'button button-link-delete' );
		echo '<p class="description">' . esc_html__( 'Also turn off the old MusicMap snippet in WPCode / PHP Snippets: both answering the same requests would clash.', 'musicmap' ) . '</p>';
	}
}
