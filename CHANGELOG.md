# MusicMap Changelog

## v1.4.1 — Current
**Release date:** 2026-10-07

### Fixed
- **"There's no chart for United States"** on Popular and Genre Mixes: Apple's chart feed refused the plugin's custom User-Agent, and that refusal was cached for 6 hours as "no chart". Apple is now asked with WordPress's standard User-Agent, the older iTunes chart feed is used as a backup, and only a real "this country has no chart" answer is cached; a temporary outage shows a "try again in a minute" message instead (old cached answers are skipped automatically)

### Changed
- Tapping **Made Here** now shuffle-plays: it starts a random local artist right away, and next/previous follow the shuffled order. Artists with a YouTube channel play one song each before moving on

## v1.4
**Release date:** 2026-10-07

### Added
- **Popular**, **Made Here** and **Genre Mixes** channels are live:
  - Popular: the country's 100 most-played songs (Apple Music charts), with album art
  - Made Here: well-known artists born or formed near the pin (Wikidata), most famous first; only artists with a Spotify, YouTube or record-label presence
  - Genre Mixes: the country's chart grouped into genre playlists (no Last.fm needed)
- Songs play through YouTube's official player (the video shows while it plays; the next song starts when one ends); artists with a YouTube channel play their uploads without using any quota
- A **Spotify** button on every song/artist row, shown only to visitors who connected Spotify
- A **share** button on every channel row (stations, songs, artists, genre mixes): the link, built on tap, opens MusicMap at the same spot and channel with that item ready to play
- Plugin routes `/wp-json/musicmap/v1/chart`, `/made` and `/resolve`, cached in the plugin's database for every visitor; a daily YouTube budget (Settings → YouTube usage shows today's use)
- Credits list Apple Music charts and Wikidata

### Fixed
- **Seek bar out of sync**: Biome Beats timed tracks with a stopwatch from when it asked YouTube/Spotify to play, so buffering, ads and pauses made it drift. It now reads the real position from YouTube's player and from Spotify
- **Pause restarted the track** in Biome Beats; it now resumes where it stopped
- **Music stopping after a song with the screen off**: Spotify is now handed the upcoming queue (Biome Beats) or the next song is added to Spotify's own queue (channels), so Spotify moves on by itself; YouTube channels hand the player the current and next song; Biome Beats soundtracks keep playing into their next track while the screen is off (labels and the lock screen follow along), and the biome's shuffle resumes once that song ends
- Biome Beats now uses YouTube's IFrame Player API (the same player as the channels) and has lock-screen controls

### Changed
- The MusicMap logo is now in the header (replacing the text title), the browser tab and home-screen icon, and is the lock-screen artwork fallback; the plugin serves crisp 192/512 px copies
- Share, heart and Spotify buttons are now small icons inside each row, like the Biome Beats track list
- The game-pack mode is now called **Biome Beats**, a nod to MusicMap's original name
- The map and the first Local Listening spot default to Tampa, FL
- The bottom tab bar no longer shows a scrollbar

### Security
- All channel data is validated server-side (country codes, coordinates, text lengths), upstream hosts are fixed, artwork only loads from Apple's image host, and YouTube video IDs are checked; the YouTube key never leaves the server
- Shared links are validated before use and removed from the address bar

---

## v1.3
**Release date:** 2026-10-05

### Added
- **Local Listening mode**, switched with the new **Biome Packs | Local Listening** control right above the player
- A draggable listening pin on the Map (or tap the map to move it); **Listen to World** live tracking moves it as you go
- Channels for the pin's location: **Local Radio** works now (stations near the pin from the free Radio Browser directory, plays with the screen off); **Popular** (labelled with the country, since charts are country-wide), **Made Here** and **Genre Mixes** are marked coming soon
- Lock-screen / notification controls for radio via the Media Session API (also groundwork for the Android and iOS apps)
- In Local Listening the **Packs** tab becomes **Saved**: favourite stations (heart on each station, or the heart in the player, which replaces the video button in this mode) and saved spots (**Save spot** next to Move pin; tapping one jumps the pin back there with its channel)

### WordPress plugin
- New **MusicMap plugin** (`wordpress-plugin/musicmap`): add `[musicmap]` to any page. It serves the app (styles scoped so they can't affect the theme), loads Leaflet with integrity checks, and passes only public settings to the page
- **MusicMap → Settings**: Last.fm and YouTube keys (stored server-side, masked after saving, blank keeps the saved key), contact email, Spotify Client ID, rate limit, pack size, share-code expiry, cache length, and an opt-in "delete data on uninstall"
- **MusicMap → Data**: browse, search, view and delete share codes (single or bulk), delete expired codes, view and clear cache and rate-limit records, and copy or delete the old snippet's files
- Share codes move to a database table; the old snippet's files are copied in on activation (expired ones skipped), so existing codes keep working. The `?mm_action=` API is unchanged and also available at `/wp-json/musicmap/v1/`
- Every admin change checks permissions and a security token; saves are rate-limited per hashed IP; all queries are prepared
- `tools/build_plugin.py` builds the plugin's assets and zip from `musicmap.html`; a ready-to-upload `dist/musicmap.zip` is kept in the repo

### Added
- **Credits & Sources** in Settings (and a Credits link in the footer): every service and tool MusicMap uses, with links, logos and licences

### Fixed
- The app now starts after the whole page has loaded; dialogs placed after the script (like Make a Pack) were missing when it started
- Removed the old offline service worker, which browsers never registered

### Changed
- Channel picker moved from the header into a sub-menu at the top of the Channels tab: **Popular · Made Here · Genre Mixes · Radio** (Popular's list title still names the country)
- Tapping the map or dragging the pin in Local Listening switches playback to that spot immediately; if there's nothing to play there, a pop-up explains why, the pin goes back and the current station keeps playing
- Distances use miles for visitors in the US (and the UK, Liberia, Myanmar), kilometres elsewhere, with an override under Settings → Display; saved-place radii show in feet/miles or metres
- The map key was rebuilt to match what the map actually shows: you, the listening pin, and your saved places with their range — plus a note that biomes aren't drawn and which one is active. Saved places are hidden on the map in Local Listening
- Local Listening opens on the Channels tab
- Removed Tracks moved to the bottom of Settings, collapsed by default with a count (Biome Packs only)

### Security
- Radio directory data is user-submitted: only HTTPS streams, valid station ids and plain-text names are used, and websites open with `noopener`

---

## v1.2.1
**Release date:** 2026-10-05

### Added
- Spotify links work in **Make a Pack** just like YouTube links: paste a Spotify playlist, album or track link and every song comes in automatically. The link box tells you what it detected; without Spotify connected it warns about Premium + a developer Client ID, and after sign-in the link is waiting for you
- Packs can mix YouTube videos and Spotify links
- Two AI prompts in Import: **YouTube** builds a pack from links + timestamps (now including Home/Work/School/Gym), **Spotify** writes a pack's song list into a prompt so an AI can sort the songs into places; paste the answer back to apply it
- Album art while Spotify plays: Spotify gives apps no video, so the video button shows the album cover (over a blurred copy) in the same 16:9 slot

### Changed
- The separate Spotify import tab is gone; Spotify links go in the same box as YouTube links

### Security
- AI answers are treated as untrusted: only valid YouTube ids, cleaned track fields, known places and in-range song numbers are kept

### Fixed
- Spotify songs in multi-video packs no longer inherit a YouTube video id
- Spotify album art from `image-cdn-*.spotifycdn.com` was blocked; both of Spotify's image hosts are now allowed

---

## v1.2
**Release date:** 2026-10-05

### Added
- Spotify Premium playback in the browser (Web Playback SDK), with sign-in via PKCE — no Client Secret
- MusicMap's shared Spotify Client ID built in; a warning before sign-in explains Spotify only allows invited testers, and anyone refused is guided to use their own free Client ID
- Spotify search in the track picker, and **Import a Spotify playlist** as a pack (playlists you own or collaborate on)
- **PachiPatch** built-in pack: 474 songs from Jongle's Spotify playlist, sorted one-per-place across the 9 biomes and Home/Work/School/Gym (33 left for you to place)
- Source icons on every pack card and in now-playing (YouTube, Spotify, or other)

### Changed
- Spotify-only songs never fall back to an empty YouTube player; a pop-up explains what's needed instead
- Clear message when a browser can't play Spotify (no DRM) instead of "Connecting…" forever

### Security
- Spotify search results are escaped (song and artist names are user-published), album art only loads from Spotify's image server
- Spotify sign-in replies are checked against the saved state, and only treated as sign-in replies when a sign-in was started

### Fixed
- Spotify songs no longer skip twice at the end (the stopwatch and Spotify's own end event both advanced)
- Spotify tracks in older-format packs no longer inherit the pack's YouTube video

---

## v1.1.1
**Release date:** 2026-09-27

### Security
- Pack and location text (names, emojis, track titles, video titles) is now HTML-escaped everywhere it's rendered. A crafted share code could previously run scripts on the page.

### Changed
- Redesigned, mobile-first player: one consistent round button row (video · prev · play · next · YouTube) with 44px+ touch targets, a track-length display on the progress bar, a now-playing indicator next to the title, and a 16:9 video
- "Listen to World" and "Change pack" buttons are now the same size, side by side or stacked
- The location pill, NEARBY badge and "You are here" line are merged into one status chip that follows the data: finding you, your address and movement in the open world, "You're here" at a saved place, "Near X · switching after this track" before a change, or a GPS error
- Footer credit now reads "Built by Jongle", linked to jongle.me
- UI-chrome emoji replaced with a consistent inline SVG icon set
- `API_URL` ships blank so self-hosters set their own; share links now use the page's own URL instead of a hardcoded domain
- License is now the MusicMap Source Available License (`LICENSE.md`), replacing GPLv3

### Share API (`musicmap-api.php`)
- Added to the repo (it was referenced by the README but missing)
- `ping` now reports the API version
- Rate limit uses `REMOTE_ADDR` by default; proxy headers like Cloudflare's are only trusted when configured, so they can't be spoofed
- Titles containing `&` are no longer corrupted to `&amp;`, and packs saved by older versions are repaired on load
- Share codes are claimed atomically, so two simultaneous saves can't overwrite each other
- `save` requires POST
- Stored IP hashes are keyed with the site's salt so they can't be reversed
- Upload folder protection works on both Apache 2.2 and 2.4 and is refreshed on existing installs
- No longer requires PHP 8.1 (PHP 7.4+), and does no work on normal page loads

---

## v1.1
**Release date:** 2026-06-08

- First public GitHub release
- Five built-in packs: Hoenn, Kanto, Super Mario Bros. 3, Halo Reach, Terraria

---

## v1.0.13
**Release date:** 2026-05-27

### Added
- PHP share API — self-host `musicmap-api.php` on your own site and set `API_URL` to enable it
- Short 6-character server share codes (e.g. `HX7K2M`) replacing long `MM-` local codes
- `MM-` local codes retained as offline fallback
- Version constant `MM_VERSION` in JS, shown in Settings tab
- "Listen to World" / "Detect My Location" hero button label
- Toggling location on now starts music automatically on first fix
- Tab bar emojis enlarged with stacked layout
- All biomes (including default pack biomes) now deletable per-pack
- Duplicate pack button (⧉) on every pack card
- Expanded emoji picker: 64 location emojis, 48 pack emojis
- Custom emoji input field in both pickers (type any emoji from keyboard)

### Fixed
- PHP Snippets 400 error — API now uses `?mm_action=` param to avoid collision with WordPress's internal `action` param; falls back to `$_POST` if `php://input` is empty
- Share code generation now async with server fallback to local encoding
- Import detects short server codes vs long `MM-` local codes automatically

---

## v1.0.12
- Privacy modal before sharing: warns about personal location data (Home, Work, School, Gym default to excluded)
- Custom biome radius visualised as dashed circle on Leaflet map
- Custom locations always override default biomes when inside radius
- Popup on map pins: Play + Edit buttons

## v1.0.11
- Share codes (`MM-` prefix, base64) replacing broken URL parameter sharing
- Import box with live preview before confirming
- `ShareBackend` abstraction layer with PHP stubs ready for wiring

## v1.0.10
- Location tracking toggle (replaces one-shot detect button)
- Adaptive polling: 30s when moving >50m, 3min when stationary
- Music only interrupts on actual biome change
- Leaflet.js + OpenStreetMap replacing hand-drawn SVG world map
- Map auto-zooms to user pin when tracking is active
- Click map to drop a custom location pin (opens editor pre-filled)
- Custom location emoji markers on map

## v1.0.9
- Pack system: Hoenn Pack (92 tracks, verified timestamps) + Kanto Pack (32 tracks)
- Switch packs from Packs tab
- Add custom pack from any YouTube URL
- Biome and custom location names/emojis now editable (per-pack overrides)
- Share packs (broken in this version — fixed in v1.0.11)

## v1.0.8
- Custom locations: Home, Work, School, Gym presets + user-created
- Custom locations act as biomes with their own track lists
- Proximity detection: auto-switches to nearby custom location
- Track picker modal: browse all tracks in current pack, add to any location
- Pin a track to always play first in a location
- Remove tracks per location, restore from Settings

## v1.0.7
- Biome entry toast notification (slides from top, auto-dismisses, accent bar countdown)
- Two-iframe crossfade attempted; reverted to single iframe in v1.0.7.1 due to buffering delay

## v1.0.6
- Real Leaflet map, location toggle, custom pin drops (earlier iteration)

## v1.0.5
- Scoped all CSS/JS to `#geovibes-app` root div for Elementor compatibility

## v1.0.4
- App renamed to **MusicMap**

## v1.0.3
- Remove track / restore from Settings
- Browser localStorage caching (pins, removed tracks)
- Service worker for offline HTML caching
- Export preferences as JSON

## v1.0.2
- Hoenn Pack track list corrected to use verified YouTube timestamps
- Single OST video (`mz3pL7xNBbY`) with `start=` param for all tracks
- Fixed blank play/skip/back buttons (SVG → Unicode)

## v1.0.1
- GeoVibes prototype: GPS → OpenStreetMap geocode → Claude AI biome classification
- 9 biomes, YouTube deep links for Spotify/Apple Music
- Basic player controls, genre chips, local artist badges

## v1.0.0
- Initial concept: location-aware music app using browser geolocation
