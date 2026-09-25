# MusicMap Changelog

## v1.0.13 — Current
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
