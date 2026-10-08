<?php
/**
 * MusicMap settings: admin page under MusicMap > Settings.
 *
 * API keys are stored server-side only (not autoloaded, never sent to the browser) and are
 * shown masked after saving: leaving a key field blank keeps the saved key.
 */

defined( 'ABSPATH' ) || exit;

class MusicMap_Settings {

	const OPTION = 'musicmap_settings';
	const PAGE   = 'musicmap';

	/** Keys that hold secrets: masked in the form, never output in full. */
	const SECRETS = array( 'lastfm_key', 'youtube_key' );

	public static function defaults() {
		return array(
			'lastfm_key'          => '',
			'youtube_key'         => '',
			'contact_email'       => '',
			'spotify_client_id'   => '',
			'support_url'         => '',
			'apple_team_id'       => '',
			'apple_key_id'        => '',
			'apple_private_key'   => '',
			'trusted_ip_header'   => '',
			'save_rate_per_hour'  => 30,
			'pack_max_kb'         => 400,
			'pack_expiry_days'    => 365,
			'cache_days'          => 7,
			'youtube_daily_units' => 9000,
			'delete_on_uninstall' => 0,
			'report_email'        => 1,
		);
	}

	public static function init() {
		add_action( 'admin_menu', array( __CLASS__, 'menu' ) );
		add_action( 'admin_init', array( __CLASS__, 'register' ) );
	}

	/** All settings merged over defaults. */
	public static function all() {
		$saved = get_option( self::OPTION, array() );
		return array_merge( self::defaults(), is_array( $saved ) ? $saved : array() );
	}

	public static function get( $key ) {
		$all = self::all();
		return isset( $all[ $key ] ) ? $all[ $key ] : null;
	}

	public static function menu() {
		add_menu_page(
			__( 'MusicMap', 'musicmap' ),
			__( 'MusicMap', 'musicmap' ),
			'manage_options',
			self::PAGE,
			array( __CLASS__, 'render' ),
			'dashicons-location-alt',
			58
		);
		add_submenu_page( self::PAGE, __( 'MusicMap Settings', 'musicmap' ), __( 'Settings', 'musicmap' ), 'manage_options', self::PAGE, array( __CLASS__, 'render' ) );
	}

	public static function register() {
		register_setting(
			'musicmap_settings_group',
			self::OPTION,
			array(
				'type'              => 'array',
				'sanitize_callback' => array( __CLASS__, 'sanitize' ),
				'default'           => self::defaults(),
				'show_in_rest'      => false,
			)
		);
	}

	/** Validate every field; secrets keep their old value unless replaced or explicitly cleared. */
	public static function sanitize( $input ) {
		$old = self::all();
		$in  = is_array( $input ) ? $input : array();
		$out = self::defaults();

		foreach ( self::SECRETS as $key ) {
			$new = isset( $in[ $key ] ) ? trim( (string) $in[ $key ] ) : '';
			if ( ! empty( $in[ $key . '_clear' ] ) ) {
				$out[ $key ] = '';
			} elseif ( '' === $new ) {
				$out[ $key ] = $old[ $key ];
			} elseif ( preg_match( '/^[A-Za-z0-9_\-]{16,100}$/', $new ) ) {
				$out[ $key ] = $new;
			} else {
				$out[ $key ] = $old[ $key ];
				add_settings_error( self::OPTION, $key, __( 'That API key has unexpected characters, so it was not saved.', 'musicmap' ) );
			}
		}

		$email                = isset( $in['contact_email'] ) ? sanitize_email( $in['contact_email'] ) : '';
		$out['contact_email'] = is_email( $email ) ? $email : '';

		$sp                       = isset( $in['spotify_client_id'] ) ? trim( (string) $in['spotify_client_id'] ) : '';
		$out['spotify_client_id'] = preg_match( '/^[0-9a-f]{32}$/i', $sp ) ? strtolower( $sp ) : '';
		if ( '' !== $sp && '' === $out['spotify_client_id'] ) {
			add_settings_error( self::OPTION, 'spotify_client_id', __( 'A Spotify Client ID is 32 letters and numbers; it was not saved.', 'musicmap' ) );
		}

		// "Buy me a coffee" style link shown in the app (https only)
		$support            = isset( $in['support_url'] ) ? trim( (string) $in['support_url'] ) : '';
		$support_clean      = esc_url_raw( $support, array( 'https' ) );
		$out['support_url'] = ( '' !== $support_clean && strlen( $support_clean ) <= 200 ) ? $support_clean : '';
		if ( '' !== $support && '' === $out['support_url'] ) {
			add_settings_error( self::OPTION, 'support_url', __( 'The support link must be a full https:// address; it was not saved.', 'musicmap' ) );
		}

		// Apple Music (MusicKit): the private key signs short-lived tokens here and never leaves the server
		foreach ( array( 'apple_team_id', 'apple_key_id' ) as $key ) {
			$v           = isset( $in[ $key ] ) ? strtoupper( trim( (string) $in[ $key ] ) ) : '';
			$out[ $key ] = preg_match( '/^[A-Z0-9]{10}$/', $v ) ? $v : '';
			if ( '' !== $v && '' === $out[ $key ] ) {
				add_settings_error( self::OPTION, $key, __( 'Apple Team and Key IDs are 10 letters and numbers; one was not saved.', 'musicmap' ) );
			}
		}
		$pk = isset( $in['apple_private_key'] ) ? trim( (string) $in['apple_private_key'] ) : '';
		if ( ! empty( $in['apple_private_key_clear'] ) ) {
			$out['apple_private_key'] = '';
		} elseif ( '' === $pk ) {
			$out['apple_private_key'] = $old['apple_private_key'];
		} elseif ( self::is_ec_key( $pk ) ) {
			$out['apple_private_key'] = $pk;
		} else {
			$out['apple_private_key'] = $old['apple_private_key'];
			add_settings_error( self::OPTION, 'apple_private_key', __( 'That is not a MusicKit private key (.p8), so it was not saved.', 'musicmap' ) );
		}
		if ( $out['apple_team_id'] !== $old['apple_team_id'] || $out['apple_key_id'] !== $old['apple_key_id'] || $out['apple_private_key'] !== $old['apple_private_key'] ) {
			delete_transient( 'musicmap_musickit_token' ); // signed with the old details
		}

		$header                   = isset( $in['trusted_ip_header'] ) ? (string) $in['trusted_ip_header'] : '';
		$out['trusted_ip_header'] = in_array( $header, array( '', 'HTTP_CF_CONNECTING_IP', 'HTTP_X_REAL_IP' ), true ) ? $header : '';

		$out['save_rate_per_hour']  = self::int_between( $in, 'save_rate_per_hour', 1, 1000 );
		$out['pack_max_kb']         = self::int_between( $in, 'pack_max_kb', 10, 2000 );
		$out['pack_expiry_days']    = self::int_between( $in, 'pack_expiry_days', 1, 3650 );
		$out['cache_days']          = self::int_between( $in, 'cache_days', 1, 90 );
		$out['youtube_daily_units'] = self::int_between( $in, 'youtube_daily_units', 100, 1000000 );
		$out['delete_on_uninstall'] = empty( $in['delete_on_uninstall'] ) ? 0 : 1;
		$out['report_email']        = empty( $in['report_email'] ) ? 0 : 1;

		return $out;
	}

	/** A PEM private key that OpenSSL reads as an elliptic-curve key (what Apple's .p8 files are). */
	private static function is_ec_key( $pem ) {
		if ( strlen( $pem ) > 4000 || false === strpos( $pem, 'PRIVATE KEY-----' ) || ! function_exists( 'openssl_pkey_get_private' ) ) {
			return false;
		}
		$k = openssl_pkey_get_private( $pem );
		if ( ! $k ) {
			return false;
		}
		$d = openssl_pkey_get_details( $k );
		return is_array( $d ) && OPENSSL_KEYTYPE_EC === $d['type'];
	}

	private static function int_between( $in, $key, $min, $max ) {
		$d = self::defaults();
		$v = isset( $in[ $key ] ) ? (int) $in[ $key ] : $d[ $key ];
		return max( $min, min( $max, $v ) );
	}

	/** "•••• abcd" for a saved secret, "" when none is saved. */
	private static function masked( $value ) {
		return '' === $value ? '' : '•••• ' . substr( $value, -4 );
	}

	public static function render() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$s = self::all();
		?>
		<div class="wrap">
			<h1><?php esc_html_e( 'MusicMap Settings', 'musicmap' ); ?></h1>
			<p><?php echo wp_kses( __( 'Add <code>[musicmap]</code> to any page or post to show the app.', 'musicmap' ), array( 'code' => array() ) ); ?></p>
			<?php settings_errors( self::OPTION ); ?>
			<form method="post" action="options.php" autocomplete="off">
				<?php settings_fields( 'musicmap_settings_group' ); ?>

				<h2><?php esc_html_e( 'API keys', 'musicmap' ); ?></h2>
				<p class="description"><?php esc_html_e( 'Free keys used by the Local Listening channels. They stay on this server and are never sent to visitors. Leave a field blank to keep the saved key.', 'musicmap' ); ?></p>
				<table class="form-table" role="presentation">
					<?php
					self::secret_row( 'lastfm_key', __( 'Last.fm API key', 'musicmap' ), 'https://www.last.fm/api/account/create', $s );
					self::secret_row( 'youtube_key', __( 'YouTube Data API v3 key', 'musicmap' ), 'https://console.cloud.google.com/apis/library/youtube.googleapis.com', $s );
					?>
					<tr>
						<th scope="row"><label for="mm_contact_email"><?php esc_html_e( 'Contact email', 'musicmap' ); ?></label></th>
						<td>
							<input type="email" class="regular-text" id="mm_contact_email" name="<?php echo esc_attr( self::OPTION ); ?>[contact_email]" value="<?php echo esc_attr( $s['contact_email'] ); ?>">
							<p class="description"><?php esc_html_e( 'Sent with lookups to OpenStreetMap and MusicBrainz, as their usage policies require. Never shown to visitors.', 'musicmap' ); ?></p>
						</td>
					</tr>
					<tr>
						<th scope="row"><label for="mm_spotify"><?php esc_html_e( 'Spotify Client ID', 'musicmap' ); ?></label></th>
						<td>
							<input type="text" class="regular-text code" id="mm_spotify" maxlength="32" name="<?php echo esc_attr( self::OPTION ); ?>[spotify_client_id]" value="<?php echo esc_attr( $s['spotify_client_id'] ); ?>" placeholder="bc016b83d9a147428d49e5e9c84a0c5d">
							<p class="description"><?php esc_html_e( 'Optional. Public by design (it appears in every Spotify login link). Blank uses the built-in MusicMap app ID. Register this page\'s address as a Redirect URI in your Spotify dashboard.', 'musicmap' ); ?></p>
						</td>
					</tr>
				</table>

				<h2><?php esc_html_e( 'Support link', 'musicmap' ); ?></h2>
				<table class="form-table" role="presentation">
					<tr>
						<th scope="row"><label for="mm_support"><?php esc_html_e( 'Buy Me a Coffee (or similar) link', 'musicmap' ); ?></label></th>
						<td>
							<input type="url" class="regular-text code" id="mm_support" maxlength="200" name="<?php echo esc_attr( self::OPTION ); ?>[support_url]" value="<?php echo esc_attr( $s['support_url'] ); ?>" placeholder="https://buymeacoffee.com/yourname">
							<p class="description"><?php esc_html_e( 'Optional. When set, the app shows "If you\'re enjoying it, please consider buying me a coffee" in its footer and at the top of its Credits, and a note beside Apple Music that the Apple developer account it needs costs money.', 'musicmap' ); ?></p>
						</td>
					</tr>
				</table>

				<h2><?php esc_html_e( 'Apple Music', 'musicmap' ); ?></h2>
				<p class="description"><?php echo wp_kses( __( 'Optional. Lets visitors play songs with their own Apple Music subscription. Needs an Apple Developer Program membership: under <em>Certificates, Identifiers &amp; Profiles</em>, create a Media ID and a key with MusicKit enabled, then enter its details here. The private key stays on this server; visitors only get short-lived tokens that work on this site.', 'musicmap' ), array( 'em' => array() ) ); ?></p>
				<table class="form-table" role="presentation">
					<tr>
						<th scope="row"><label for="mm_apple_team"><?php esc_html_e( 'Team ID', 'musicmap' ); ?></label></th>
						<td><input type="text" class="regular-text code" id="mm_apple_team" maxlength="10" name="<?php echo esc_attr( self::OPTION ); ?>[apple_team_id]" value="<?php echo esc_attr( $s['apple_team_id'] ); ?>" placeholder="ABCDE12345"></td>
					</tr>
					<tr>
						<th scope="row"><label for="mm_apple_kid"><?php esc_html_e( 'MusicKit Key ID', 'musicmap' ); ?></label></th>
						<td><input type="text" class="regular-text code" id="mm_apple_kid" maxlength="10" name="<?php echo esc_attr( self::OPTION ); ?>[apple_key_id]" value="<?php echo esc_attr( $s['apple_key_id'] ); ?>" placeholder="XYZ9876543"></td>
					</tr>
					<tr>
						<th scope="row"><label for="mm_apple_pk"><?php esc_html_e( 'Private key (.p8)', 'musicmap' ); ?></label></th>
						<td>
							<textarea class="large-text code" rows="4" id="mm_apple_pk" name="<?php echo esc_attr( self::OPTION ); ?>[apple_private_key]" autocomplete="off" spellcheck="false"
								placeholder="<?php echo esc_attr( '' !== $s['apple_private_key'] ? __( 'Saved. Paste a new key to replace it.', 'musicmap' ) : __( 'Paste the whole AuthKey_….p8 file, including the BEGIN and END lines', 'musicmap' ) ); ?>"></textarea>
							<?php if ( '' !== $s['apple_private_key'] ) : ?>
								<label><input type="checkbox" name="<?php echo esc_attr( self::OPTION . '[apple_private_key_clear]' ); ?>" value="1"> <?php esc_html_e( 'Remove saved key', 'musicmap' ); ?></label>
							<?php endif; ?>
							<p class="description">
								<?php
								echo esc_html(
									class_exists( 'MusicMap_Channels' ) && MusicMap_Channels::apple_music_ready()
										? __( 'Apple Music is on: visitors can connect it in Settings → Connections.', 'musicmap' )
										: __( 'Apple Music is off until all three are saved.', 'musicmap' )
								);
								?>
							</p>
						</td>
					</tr>
				</table>

				<h2><?php esc_html_e( 'YouTube usage', 'musicmap' ); ?></h2>
				<table class="form-table" role="presentation">
					<?php self::number_row( 'youtube_daily_units', __( 'YouTube units to use per day', 'musicmap' ), 100, 1000000, $s ); ?>
					<tr>
						<th scope="row"><?php esc_html_e( 'Used today', 'musicmap' ); ?></th>
						<td>
							<?php
							$q = class_exists( 'MusicMap_Channels' ) ? MusicMap_Channels::quota_status() : array( 'used' => 0, 'limit' => $s['youtube_daily_units'] );
							/* translators: 1: units used, 2: daily limit, 3: songs looked up */
							echo esc_html( sprintf( __( '%1$d of %2$d units (%3$d new song lookups). Resets at midnight Pacific time.', 'musicmap' ), $q['used'], $q['limit'], (int) floor( $q['used'] / 101 ) ) );
							?>
							<p class="description"><?php esc_html_e( 'Each new song lookup costs 101 units (a search, plus a length check that keeps out Shorts); Google gives 10,000 free per day. Lookups are cached for everyone, so each song is only looked up once. Keep this under 10,000 to leave headroom.', 'musicmap' ); ?></p>
						</td>
					</tr>
				</table>

				<h2><?php esc_html_e( 'Share codes', 'musicmap' ); ?></h2>
				<table class="form-table" role="presentation">
					<?php
					self::number_row( 'save_rate_per_hour', __( 'Saves per visitor per hour', 'musicmap' ), 1, 1000, $s );
					self::number_row( 'pack_max_kb', __( 'Largest pack (KB)', 'musicmap' ), 10, 2000, $s );
					self::number_row( 'pack_expiry_days', __( 'Delete share codes after (days)', 'musicmap' ), 1, 3650, $s );
					?>
					<tr>
						<th scope="row"><label for="mm_ip_header"><?php esc_html_e( 'Visitor IP comes from', 'musicmap' ); ?></label></th>
						<td>
							<select id="mm_ip_header" name="<?php echo esc_attr( self::OPTION ); ?>[trusted_ip_header]">
								<option value="" <?php selected( $s['trusted_ip_header'], '' ); ?>><?php esc_html_e( 'The connection (no proxy)', 'musicmap' ); ?></option>
								<option value="HTTP_CF_CONNECTING_IP" <?php selected( $s['trusted_ip_header'], 'HTTP_CF_CONNECTING_IP' ); ?>><?php esc_html_e( 'Cloudflare (CF-Connecting-IP)', 'musicmap' ); ?></option>
								<option value="HTTP_X_REAL_IP" <?php selected( $s['trusted_ip_header'], 'HTTP_X_REAL_IP' ); ?>><?php esc_html_e( 'Reverse proxy (X-Real-IP)', 'musicmap' ); ?></option>
							</select>
							<p class="description"><?php esc_html_e( 'Only change this if your site really sits behind that proxy; otherwise visitors could fake their IP and dodge the rate limit.', 'musicmap' ); ?></p>
						</td>
					</tr>
				</table>

				<h2><?php esc_html_e( 'Problem reports', 'musicmap' ); ?></h2>
				<table class="form-table" role="presentation">
					<tr>
						<th scope="row"><?php esc_html_e( 'New reports', 'musicmap' ); ?></th>
						<td>
							<label><input type="checkbox" name="<?php echo esc_attr( self::OPTION ); ?>[report_email]" value="1" <?php checked( $s['report_email'], 1 ); ?>>
							<?php
							/* translators: %s: the site's admin email address */
							echo esc_html( sprintf( __( 'Email me (%s) when someone sends a problem report', 'musicmap' ), get_option( 'admin_email' ) ) );
							?>
							</label>
							<p class="description"><?php esc_html_e( 'Reports are listed under MusicMap → Reports either way. The email only has the message and a link, never the screenshot or details.', 'musicmap' ); ?></p>
						</td>
					</tr>
				</table>

				<h2><?php esc_html_e( 'Cache and data', 'musicmap' ); ?></h2>
				<table class="form-table" role="presentation">
					<?php self::number_row( 'cache_days', __( 'Keep cached lookups for (days)', 'musicmap' ), 1, 90, $s ); ?>
					<tr>
						<th scope="row"><?php esc_html_e( 'When the plugin is deleted', 'musicmap' ); ?></th>
						<td>
							<label><input type="checkbox" name="<?php echo esc_attr( self::OPTION ); ?>[delete_on_uninstall]" value="1" <?php checked( $s['delete_on_uninstall'], 1 ); ?>>
							<?php esc_html_e( 'Also delete all MusicMap data (share codes, cache, settings)', 'musicmap' ); ?></label>
						</td>
					</tr>
				</table>

				<?php submit_button(); ?>
			</form>
		</div>
		<?php
	}

	private static function secret_row( $key, $label, $help_url, $s ) {
		$name = self::OPTION . '[' . $key . ']';
		?>
		<tr>
			<th scope="row"><label for="mm_<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $label ); ?></label></th>
			<td>
				<input type="password" class="regular-text code" id="mm_<?php echo esc_attr( $key ); ?>" name="<?php echo esc_attr( $name ); ?>" value="" autocomplete="new-password" spellcheck="false"
					placeholder="<?php echo esc_attr( '' !== $s[ $key ] ? self::masked( $s[ $key ] ) . ' ' . __( '(saved)', 'musicmap' ) : __( 'Not set', 'musicmap' ) ); ?>">
				<?php if ( '' !== $s[ $key ] ) : ?>
					<label style="margin-left:8px"><input type="checkbox" name="<?php echo esc_attr( self::OPTION . '[' . $key . '_clear]' ); ?>" value="1"> <?php esc_html_e( 'Remove saved key', 'musicmap' ); ?></label>
				<?php endif; ?>
				<p class="description"><a href="<?php echo esc_url( $help_url ); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Get a free key', 'musicmap' ); ?></a></p>
			</td>
		</tr>
		<?php
	}

	private static function number_row( $key, $label, $min, $max, $s ) {
		?>
		<tr>
			<th scope="row"><label for="mm_<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $label ); ?></label></th>
			<td><input type="number" class="small-text" id="mm_<?php echo esc_attr( $key ); ?>" min="<?php echo (int) $min; ?>" max="<?php echo (int) $max; ?>"
				name="<?php echo esc_attr( self::OPTION . '[' . $key . ']' ); ?>" value="<?php echo (int) $s[ $key ]; ?>"></td>
		</tr>
		<?php
	}
}
