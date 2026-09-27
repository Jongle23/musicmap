# MusicMap Changelog

## v1.1.1 — Current
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
