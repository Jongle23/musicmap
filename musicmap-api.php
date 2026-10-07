<?php
/**
 * MusicMap Share API — v1.13
 * ===========================
 * Add via PHP Snippets / WPCode using the "Run Everywhere" or "Auto Run" option.
 * Requires PHP 7.4+.
 *
 * Endpoints (all via ?mm_action=, never WordPress's own ?action=):
 *   GET  ?mm_action=ping              → {"ok":true,"status":"ok","version":"…"}
 *   POST ?mm_action=save  (JSON pack) → {"ok":true,"code":"HX7K2M"}
 *   GET  ?mm_action=load&code=HX7K2M  → {"ok":true,"pack":{…},"views":N}
 */

// ── Only run when our query param is present ──────────────────────────────
// Everything below this line (including function definitions) is skipped on
// normal page loads, so the snippet costs nothing outside API calls.
$mm_action = $_GET['mm_action'] ?? '';

if ( empty($mm_action) ) {
    // Not our request — let WordPress continue normally
    return;
}

// ── CONFIG ────────────────────────────────────────────────────────────────
$MM_API_VERSION = '1.13';
$DATA_DIR  = WP_CONTENT_DIR . '/uploads/musicmap_packs/';
$CODE_LEN  = 6;
$MAX_BYTES = 400 * 1024;   // 400 KB
$MAX_AGE   = 365 * 86400;  // 1 year
$RATE_MAX  = 30;           // saves per IP per hour

// Header holding the real visitor IP when the site sits behind a proxy/CDN,
// e.g. 'HTTP_CF_CONNECTING_IP' for Cloudflare. Leave empty to use REMOTE_ADDR.
// Only set this if the proxy is guaranteed to overwrite the header —
// otherwise any client can fake it and bypass the rate limit.
$TRUSTED_IP_HEADER = '';

// ═══════════════════════════════════════════════════════════════════════════
// HANDLERS + HELPERS (defined only on API requests)
// ═══════════════════════════════════════════════════════════════════════════

if ( ! function_exists('mm_handle_save') ) {

function mm_handle_save(
    string $dir,
    int $max_bytes,
    int $rate_max,
    int $code_len,
    string $ip
): void {

    if ( $_SERVER['REQUEST_METHOD'] !== 'POST' ) {
        mm_error('save requires POST', 405);
    }

    // ── Rate limit ──
    if ( ! mm_rate_ok($dir, $ip, $rate_max) ) {
        mm_error('Rate limit exceeded — try again later', 429);
    }

    // ── Read body ──
    $raw = file_get_contents('php://input');

    // Fallback
    if ( empty($raw) && ! empty($_POST) ) {
        $raw = json_encode($_POST);
    }

    if ( empty($raw) ) {
        mm_error('Empty request body — no data received', 400);
    }

    if ( strlen($raw) > $max_bytes ) {
        mm_error(
            'Pack too large (' .
            strlen($raw) .
            ' bytes, max ' .
            $max_bytes .
            ')',
            413
        );
    }

    // ── Decode JSON ──
    $pack = json_decode($raw, true);

    if ( json_last_error() !== JSON_ERROR_NONE ) {
        mm_error(
            'JSON parse error: ' . json_last_error_msg(),
            400
        );
    }

    if ( ! is_array($pack) ) {
        mm_error('Pack must be a JSON object', 400);
    }

    // ── Validate minimum fields ──
    $missing = [];

    foreach ( ['name', 'tracks', 'biomes'] as $f ) {
        if ( ! isset($pack[$f]) ) {
            $missing[] = $f;
        }
    }

    if ( ! empty($missing) ) {
        mm_error(
            'Missing required fields: ' .
            implode(', ', $missing),
            400
        );
    }

    if (
        ! is_array($pack['tracks']) ||
        ! is_array($pack['biomes'])
    ) {
        mm_error('tracks and biomes must be arrays', 400);
    }

    // ── Sanitise strings ──
    // Strip tags only. wp_kses() was used before, but it also rewrites "&"
    // into "&amp;", which corrupted titles like "Rock & Roll". The app
    // escapes all pack text when rendering, so this is defence in depth.
    array_walk_recursive($pack, function(&$v) {
        if ( is_string($v) ) {
            $v = wp_strip_all_tags($v);
        }
    });

    $payload = json_encode([
        'pack'    => $pack,
        'created' => time(),
        'ip'      => mm_hash($ip),
        'views'   => 0,
        'fmt'     => 2,   // 2 = saved without HTML-entity encoding
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    if ( $payload === false ) {
        mm_error('Could not encode pack: ' . json_last_error_msg(), 400);
    }

    // ── Claim a unique code ──
    // fopen 'x' fails if the file already exists, so two saves can never
    // land on the same code and overwrite each other.
    $fh = false;

    for ( $tries = 0; $tries < 20 && $fh === false; $tries++ ) {
        $code = mm_gen_code($code_len);
        $fh   = @fopen($dir . $code . '.json', 'x');
    }

    if ( $fh === false ) {
        mm_error(
            'Could not write pack file — check directory permissions on: ' . $dir,
            500
        );
    }

    fwrite($fh, $payload);
    fclose($fh);

    mm_ok(['code' => $code]);
}

function mm_handle_load(string $dir, int $max_age): void {

    $raw_code = $_GET['code'] ?? '';

    $code = strtoupper(
        preg_replace('/[^A-Za-z0-9]/', '', $raw_code)
    );

    if ( strlen($code) < 4 || strlen($code) > 12 ) {
        mm_error('Invalid code format', 400);
    }

    $path = $dir . $code . '.json';

    if ( ! file_exists($path) ) {
        mm_error(
            'Pack not found — code may have expired or been mistyped',
            404
        );
    }

    $content = file_get_contents($path);

    if ( $content === false ) {
        mm_error('Could not read pack file', 500);
    }

    $payload = json_decode($content, true);

    if ( ! is_array($payload) || ! isset($payload['pack']) ) {
        mm_error('Pack file is corrupted', 500);
    }

    // TTL check
    $age = time() - ($payload['created'] ?? 0);

    if ( $age > $max_age ) {
        @unlink($path);
        mm_error(
            'Pack has expired (older than 1 year)',
            410
        );
    }

    // Increment views
    $payload['views'] = (int)($payload['views'] ?? 0) + 1;

    @file_put_contents(
        $path,
        json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        LOCK_EX
    );

    $pack = $payload['pack'];

    // Packs saved before v1.1.1 went through wp_kses(), which stored "&" as
    // "&amp;" — undo that so they display correctly.
    if ( ($payload['fmt'] ?? 1) < 2 ) {
        array_walk_recursive($pack, function(&$v) {
            if ( is_string($v) ) {
                $v = html_entity_decode($v, ENT_QUOTES | ENT_HTML5, 'UTF-8');
            }
        });
    }

    mm_ok([
        'pack'  => $pack,
        'views' => $payload['views']
    ]);
}

function mm_protect_dir(string $dir): void {

    if ( ! is_dir($dir) ) {
        wp_mkdir_p($dir);
    }

    // Blocks direct downloads on Apache 2.2 and 2.4. nginx ignores
    // .htaccess — add a "location" deny rule there if you need it.
    $htaccess = "Options -Indexes\n"
        . "<IfModule mod_authz_core.c>\n  Require all denied\n</IfModule>\n"
        . "<IfModule !mod_authz_core.c>\n  Order allow,deny\n  Deny from all\n</IfModule>\n";

    if ( @file_get_contents($dir . '.htaccess') !== $htaccess ) {
        @file_put_contents($dir . '.htaccess', $htaccess);
    }

    if ( ! file_exists($dir . 'index.php') ) {
        @file_put_contents($dir . 'index.php', '<?php // silence');
    }
}

function mm_gen_code(int $len): string {

    $chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    $code  = '';

    for ($i = 0; $i < $len; $i++) {
        $code .= $chars[
            random_int(0, strlen($chars) - 1)
        ];
    }

    return $code;
}

function mm_client_ip(string $trusted_header): string {

    if ( $trusted_header !== '' && ! empty($_SERVER[$trusted_header]) ) {
        return trim(explode(',', $_SERVER[$trusted_header])[0]);
    }

    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

// Keyed hash so stored IP hashes can't be reversed by hashing every IPv4 address
function mm_hash(string $ip): string {

    $key = defined('AUTH_SALT') ? AUTH_SALT : 'musicmap';

    return hash_hmac('sha256', $ip, $key);
}

function mm_rate_ok(
    string $dir,
    string $ip,
    int $max
): bool {

    $key  = 'mmrl_' . substr(mm_hash($ip), 0, 16);
    $path = $dir . $key . '.json';
    $now  = time();
    $log  = [];

    if ( file_exists($path) ) {
        $log = json_decode(
            file_get_contents($path),
            true
        );

        if ( ! is_array($log) ) {
            $log = [];
        }
    }

    // Keep only entries from last hour
    $log = array_values(array_filter(
        $log,
        fn($t) => is_int($t) && ($now - $t) < 3600
    ));

    if ( count($log) >= $max ) {
        return false;
    }

    $log[] = $now;

    @file_put_contents(
        $path,
        json_encode($log),
        LOCK_EX
    );

    return true;
}

function mm_ok(array $data): void {

    echo json_encode(
        array_merge(['ok' => true], $data),
        JSON_UNESCAPED_UNICODE
    );

    exit;
}

function mm_error(string $msg, int $code = 400): void {

    http_response_code($code);

    echo json_encode([
        'ok'    => false,
        'error' => $msg
    ]);

    exit;
}

} // end function_exists guard

// ── CORS + JSON headers ───────────────────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Cache-Control: no-store');

if ( $_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
    http_response_code(204);
    exit;
}

// ── Bootstrap ────────────────────────────────────────────────────────────
mm_protect_dir($DATA_DIR);

// ── Route ─────────────────────────────────────────────────────────────────
switch ( strtolower($mm_action) ) {

    case 'save':
        mm_handle_save(
            $DATA_DIR,
            $MAX_BYTES,
            $RATE_MAX,
            $CODE_LEN,
            mm_client_ip($TRUSTED_IP_HEADER)
        );
        break;

    case 'load':
        mm_handle_load($DATA_DIR, $MAX_AGE);
        break;

    case 'ping':
        mm_ok([
            'status'  => 'ok',
            'version' => $MM_API_VERSION
        ]);
        break;

    default:
        mm_error(
            'Unknown action: ' . htmlspecialchars($mm_action),
            400
        );
}

exit;
