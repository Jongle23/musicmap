<?php
/**
 * Problem reports from the app (Settings > Report a problem).
 *
 *   POST /wp-json/musicmap/v1/report  { message, email?, details?, screenshot? }
 *
 * Anyone can send one, so: strict size and type checks, a per-visitor rate limit, a cap on stored
 * reports, screenshots kept in the database (never as public files) and only shown to admins,
 * and everything escaped when displayed. Admins see them under MusicMap > Reports.
 */

defined( 'ABSPATH' ) || exit;

class MusicMap_Reports {

	const PAGE         = 'musicmap-reports';
	const MAX_MESSAGE  = 2000;
	const MAX_DETAILS  = 24000;   // bytes of JSON
	const MAX_SHOT     = 1500000; // bytes of image data
	const PER_HOUR     = 5;
	const KEEP_DAYS    = 90;
	const MAX_STORED   = 500;

	public static function init() {
		add_action( 'rest_api_init', array( __CLASS__, 'routes' ) );
		if ( is_admin() ) {
			add_action( 'admin_menu', array( __CLASS__, 'menu' ), 21 );
			foreach ( array( 'delete_report', 'report_status' ) as $a ) {
				add_action( 'admin_post_musicmap_' . $a, array( __CLASS__, 'handle_' . $a ) );
			}
		}
	}

	public static function routes() {
		register_rest_route(
			'musicmap/v1',
			'/report',
			array(
				'methods'             => 'POST',
				'permission_callback' => '__return_true',
				'callback'            => array( __CLASS__, 'receive' ),
			)
		);
	}

	private static function fail( $code, $msg, $status ) {
		return new WP_REST_Response(
			array(
				'ok'    => false,
				'code'  => $code,
				'error' => $msg,
			),
			$status
		);
	}

	// ── Receiving ───────────────────────────────────────────────────────

	public static function receive( WP_REST_Request $req ) {
		$body = $req->get_json_params();
		if ( ! is_array( $body ) ) {
			return self::fail( 'bad_request', 'Send the report as JSON.', 400 );
		}
		$message = isset( $body['message'] ) && is_string( $body['message'] ) ? trim( sanitize_textarea_field( $body['message'] ) ) : '';
		if ( mb_strlen( $message ) < 3 ) {
			return self::fail( 'no_message', 'Please describe what went wrong.', 400 );
		}
		$message = mb_substr( $message, 0, self::MAX_MESSAGE );

		$email = '';
		if ( isset( $body['email'] ) && is_string( $body['email'] ) && '' !== trim( $body['email'] ) ) {
			$email = sanitize_email( $body['email'] );
			if ( ! is_email( $email ) || strlen( $email ) > 190 ) {
				return self::fail( 'bad_email', 'That email address doesn\'t look right.', 400 );
			}
		}

		$details = '';
		if ( isset( $body['details'] ) && is_array( $body['details'] ) ) {
			$clean   = self::clean_details( $body['details'], 0 );
			$details = (string) wp_json_encode( $clean );
			if ( strlen( $details ) > self::MAX_DETAILS ) {
				$details = (string) wp_json_encode( array( 'note' => 'Details were too large and were dropped.' ) );
			}
		}

		$shot = '';
		if ( isset( $body['screenshot'] ) && is_string( $body['screenshot'] ) && '' !== $body['screenshot'] ) {
			$shot = self::clean_screenshot( $body['screenshot'] );
			if ( '' === $shot ) {
				return self::fail( 'bad_screenshot', 'The screenshot couldn\'t be used. Try sending without it.', 400 );
			}
		}

		if ( ! MusicMap_Store::rate_hit( MusicMap_Api::ip_hash(), 'report', self::PER_HOUR, HOUR_IN_SECONDS ) ) {
			return self::fail( 'rate_limited', 'You\'ve sent several reports already. Please try again in an hour.', 429 );
		}

		global $wpdb;
		$t = MusicMap_Store::table( 'reports' );
		$wpdb->insert( // phpcs:ignore WordPress.DB.DirectDatabaseQuery
			$t,
			array(
				'created_gmt' => gmdate( 'Y-m-d H:i:s' ),
				'status'      => 'new',
				'message'     => $message,
				'email'       => $email,
				'details'     => $details,
				'screenshot'  => $shot,
				'ip_hash'     => MusicMap_Api::ip_hash(),
			),
			array( '%s', '%s', '%s', '%s', '%s', '%s', '%s' )
		);
		$id = (int) $wpdb->insert_id;
		if ( ! $id ) {
			return self::fail( 'store_failed', 'The report couldn\'t be saved. Please try again later.', 500 );
		}
		self::prune();
		self::notify( $id, $message, $email );
		return new WP_REST_Response( array( 'ok' => true ), 200 );
	}

	/** Keeps only plain values (strings, numbers, booleans) in nested arrays, with sizes capped. */
	private static function clean_details( $in, $depth ) {
		$out = array();
		$n   = 0;
		foreach ( $in as $k => $v ) {
			if ( ++$n > 80 ) {
				break;
			}
			$key = is_int( $k ) ? $k : mb_substr( preg_replace( '/[^A-Za-z0-9_\- ]/', '', (string) $k ), 0, 40 );
			if ( is_array( $v ) ) {
				if ( $depth < 3 ) {
					$out[ $key ] = self::clean_details( $v, $depth + 1 );
				}
			} elseif ( is_bool( $v ) || is_int( $v ) || is_float( $v ) ) {
				$out[ $key ] = $v;
			} elseif ( is_string( $v ) ) {
				$out[ $key ] = mb_substr( wp_strip_all_tags( $v ), 0, 600 );
			}
		}
		return $out;
	}

	/** A JPEG or PNG data URL that really is an image of sensible size, or ''. */
	private static function clean_screenshot( $data ) {
		if ( ! preg_match( '#^data:image/(jpeg|png);base64,([A-Za-z0-9+/]+={0,2})$#', $data, $m ) ) {
			return '';
		}
		if ( strlen( $m[2] ) > self::MAX_SHOT * 4 / 3 + 4 ) {
			return '';
		}
		$bin = base64_decode( $m[2], true ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions -- image data
		if ( false === $bin || strlen( $bin ) > self::MAX_SHOT ) {
			return '';
		}
		$info = function_exists( 'getimagesizefromstring' ) ? getimagesizefromstring( $bin ) : false;
		if ( ! $info || ! in_array( $info[2], array( IMAGETYPE_JPEG, IMAGETYPE_PNG ), true ) || $info[0] > 4000 || $info[1] > 6000 ) {
			return '';
		}
		$type = IMAGETYPE_PNG === $info[2] ? 'png' : 'jpeg';
		return 'data:image/' . $type . ';base64,' . base64_encode( $bin ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions -- re-encoded from the checked bytes
	}

	/** Drop reports older than KEEP_DAYS and beyond MAX_STORED. */
	private static function prune() {
		global $wpdb;
		$t = MusicMap_Store::table( 'reports' );
		$wpdb->query( $wpdb->prepare( "DELETE FROM $t WHERE created_gmt < %s", gmdate( 'Y-m-d H:i:s', time() - self::KEEP_DAYS * DAY_IN_SECONDS ) ) ); // phpcs:ignore WordPress.DB
		$count = (int) $wpdb->get_var( "SELECT COUNT(*) FROM $t" ); // phpcs:ignore WordPress.DB
		if ( $count > self::MAX_STORED ) {
			$wpdb->query( $wpdb->prepare( "DELETE FROM $t ORDER BY id ASC LIMIT %d", $count - self::MAX_STORED ) ); // phpcs:ignore WordPress.DB
		}
	}

	private static function notify( $id, $message, $email ) {
		if ( ! MusicMap_Settings::get( 'report_email' ) ) {
			return;
		}
		$to = get_option( 'admin_email' );
		if ( ! is_email( $to ) ) {
			return;
		}
		$link = add_query_arg(
			array(
				'page'   => self::PAGE,
				'report' => $id,
			),
			admin_url( 'admin.php' )
		);
		$body = "Someone sent a MusicMap problem report:\n\n" . $message . "\n\n"
			. ( '' !== $email ? 'Reply to: ' . $email . "\n\n" : '' )
			. "Details and screenshot: " . $link . "\n";
		wp_mail( $to, '[MusicMap] New problem report', $body );
	}

	// ── Admin ───────────────────────────────────────────────────────────

	public static function menu() {
		global $wpdb;
		$t   = MusicMap_Store::table( 'reports' );
		$new = (int) $wpdb->get_var( "SELECT COUNT(*) FROM $t WHERE status = 'new'" ); // phpcs:ignore WordPress.DB
		$label = __( 'Reports', 'musicmap' ) . ( $new ? ' <span class="awaiting-mod">' . (int) $new . '</span>' : '' );
		add_submenu_page( MusicMap_Settings::PAGE, __( 'MusicMap Reports', 'musicmap' ), $label, 'manage_options', self::PAGE, array( __CLASS__, 'render' ) );
	}

	private static function guard( $action ) {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'You are not allowed to do that.', 'musicmap' ), 403 );
		}
		check_admin_referer( $action );
	}

	private static function back( $msg, $args = array() ) {
		wp_safe_redirect( add_query_arg( array_merge( array( 'page' => self::PAGE, 'mm_notice' => rawurlencode( $msg ) ), $args ), admin_url( 'admin.php' ) ) );
		exit;
	}

	public static function handle_delete_report() {
		self::guard( 'musicmap_delete_report' );
		global $wpdb;
		$id = isset( $_POST['id'] ) ? absint( $_POST['id'] ) : 0;
		$wpdb->delete( MusicMap_Store::table( 'reports' ), array( 'id' => $id ), array( '%d' ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		self::back( __( 'Report deleted.', 'musicmap' ) );
	}

	public static function handle_report_status() {
		self::guard( 'musicmap_report_status' );
		global $wpdb;
		$id     = isset( $_POST['id'] ) ? absint( $_POST['id'] ) : 0;
		$status = isset( $_POST['status'] ) && in_array( $_POST['status'], array( 'new', 'fixed' ), true ) ? sanitize_key( $_POST['status'] ) : 'new';
		$wpdb->update( MusicMap_Store::table( 'reports' ), array( 'status' => $status ), array( 'id' => $id ), array( '%s' ), array( '%d' ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		self::back( 'fixed' === $status ? __( 'Marked as fixed.', 'musicmap' ) : __( 'Marked as new.', 'musicmap' ), array( 'report' => $id ) );
	}

	private static function button( $action, $label, $fields, $confirm = '', $class = 'button' ) {
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

	public static function render() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		global $wpdb;
		$t = MusicMap_Store::table( 'reports' );
		echo '<div class="wrap"><h1>' . esc_html__( 'MusicMap Reports', 'musicmap' ) . '</h1>';
		if ( isset( $_GET['mm_notice'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification -- display only
			echo '<div class="notice notice-success is-dismissible"><p>' . esc_html( sanitize_text_field( rawurldecode( wp_unslash( $_GET['mm_notice'] ) ) ) ) . '</p></div>'; // phpcs:ignore WordPress.Security.NonceVerification
		}
		$id = isset( $_GET['report'] ) ? absint( $_GET['report'] ) : 0; // phpcs:ignore WordPress.Security.NonceVerification
		if ( $id ) {
			$r = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $t WHERE id = %d", $id ), ARRAY_A ); // phpcs:ignore WordPress.DB
			echo '<p><a href="' . esc_url( add_query_arg( 'page', self::PAGE, admin_url( 'admin.php' ) ) ) . '">&larr; ' . esc_html__( 'All reports', 'musicmap' ) . '</a></p>';
			if ( ! $r ) {
				echo '<p>' . esc_html__( 'That report is gone.', 'musicmap' ) . '</p></div>';
				return;
			}
			self::render_one( $r );
			echo '</div>';
			return;
		}
		$rows = $wpdb->get_results( "SELECT id, created_gmt, status, message, email, screenshot <> '' AS has_shot FROM $t ORDER BY id DESC LIMIT 200", ARRAY_A ); // phpcs:ignore WordPress.DB
		echo '<p class="description">' . esc_html( sprintf( /* translators: %d: days */ __( 'Problem reports sent from the app. Reports older than %d days are removed automatically.', 'musicmap' ), self::KEEP_DAYS ) ) . '</p>';
		if ( ! $rows ) {
			echo '<p>' . esc_html__( 'No reports yet.', 'musicmap' ) . '</p></div>';
			return;
		}
		echo '<table class="widefat striped"><thead><tr><th>' . esc_html__( 'Sent', 'musicmap' ) . '</th><th>' . esc_html__( 'Status', 'musicmap' ) . '</th><th>' . esc_html__( 'Message', 'musicmap' ) . '</th><th>' . esc_html__( 'Reply to', 'musicmap' ) . '</th><th>' . esc_html__( 'Screenshot', 'musicmap' ) . '</th></tr></thead><tbody>';
		foreach ( $rows as $r ) {
			$url = add_query_arg(
				array(
					'page'   => self::PAGE,
					'report' => (int) $r['id'],
				),
				admin_url( 'admin.php' )
			);
			echo '<tr><td>' . esc_html( get_date_from_gmt( $r['created_gmt'], 'M j, Y g:i a' ) ) . '</td>'
				. '<td>' . ( 'fixed' === $r['status'] ? '✓ ' . esc_html__( 'Fixed', 'musicmap' ) : '<strong>' . esc_html__( 'New', 'musicmap' ) . '</strong>' ) . '</td>'
				. '<td><a href="' . esc_url( $url ) . '">' . esc_html( mb_strimwidth( $r['message'], 0, 140, '…' ) ) . '</a></td>'
				. '<td>' . esc_html( $r['email'] ) . '</td>'
				. '<td>' . ( $r['has_shot'] ? esc_html__( 'Yes', 'musicmap' ) : '—' ) . '</td></tr>';
		}
		echo '</tbody></table></div>';
	}

	private static function render_one( $r ) {
		echo '<h2>' . esc_html( sprintf( /* translators: %s: date */ __( 'Report sent %s', 'musicmap' ), get_date_from_gmt( $r['created_gmt'], 'M j, Y g:i a' ) ) ) . '</h2>';
		self::button( 'report_status', 'fixed' === $r['status'] ? __( 'Mark as new', 'musicmap' ) : __( 'Mark as fixed', 'musicmap' ), array( 'id' => $r['id'], 'status' => 'fixed' === $r['status'] ? 'new' : 'fixed' ), '', 'button button-primary' );
		self::button( 'delete_report', __( 'Delete', 'musicmap' ), array( 'id' => $r['id'] ), __( 'Delete this report?', 'musicmap' ) );
		echo '<h3>' . esc_html__( 'What went wrong', 'musicmap' ) . '</h3><div style="max-width:760px;white-space:pre-wrap;background:#fff;border:1px solid #dcdcde;padding:12px">' . esc_html( $r['message'] ) . '</div>';
		if ( '' !== $r['email'] ) {
			echo '<p><strong>' . esc_html__( 'Reply to:', 'musicmap' ) . '</strong> <a href="' . esc_url( 'mailto:' . $r['email'] ) . '">' . esc_html( $r['email'] ) . '</a></p>';
		}
		if ( '' !== $r['screenshot'] && preg_match( '#^data:image/(jpeg|png);base64,[A-Za-z0-9+/]+={0,2}$#', $r['screenshot'] ) ) {
			echo '<h3>' . esc_html__( 'Screenshot', 'musicmap' ) . '</h3><img alt="" style="max-width:100%;width:520px;border:1px solid #dcdcde" src="' . esc_attr( $r['screenshot'] ) . '">';
		}
		if ( '' !== $r['details'] ) {
			$d = json_decode( $r['details'], true );
			echo '<h3>' . esc_html__( 'Technical details', 'musicmap' ) . '</h3><pre style="max-width:760px;max-height:520px;overflow:auto;background:#fff;border:1px solid #dcdcde;padding:12px;white-space:pre-wrap">' . esc_html( (string) wp_json_encode( $d, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) ) . '</pre>';
		}
	}
}
