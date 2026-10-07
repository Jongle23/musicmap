# MusicMap Changelog

## v1.12.1 — Current
**Release date:** 2026-10-07

### Changed
- Support wording is now "If you're enjoying it, please consider buying me a coffee" (footer and Apple Music note), and **Credits & Sources** opens with a "Support MusicMap" note ("MusicMap is built by Jongle…") so anyone reading the credits sees where to support. All of it shows only when a support link is set in MusicMap → Settings

## v1.12
**Release date:** 2026-10-07

### Added
- **Link previews**: links to the MusicMap page now show a proper preview card in chats and social apps (iMessage, WhatsApp, Discord, Facebook, X…), with a 1200×630 MusicMap image. Share links get their own text: "♪ Song — Artist", "Listen to 95.7 WDAE near Tampa, Florida", "Listen around Jacksonville, Florida". Share links now carry the item and place names for this (the app ignores them). Text from links is length-limited, stripped of tags, kept inside a fixed sentence and escaped. If an SEO plugin (Yoast, Rank Math…) handles the page's tags, MusicMap only steps in for share links
- `tools/make_share_card.py` redraws the preview image

## v1.11.5
**Release date:** 2026-10-07

### Changed
- Opening a shared link to a place (a spot, station or channel) starts the map centred on that place instead of the whole-state view

## v1.11.4
**Release date:** 2026-10-07

### Changed
- **"Made Here" is now "Homegrown"**: the channel of well-known artists born or formed near the pin. Its list reads "Homegrown around (city)". Old share links and saved spots for it still work

## v1.11.3
**Release date:** 2026-10-07

### Fixed
- The Spotify cast button no longer covers the song title when it shows a device's name: it now sits on its own small row at the top of the player

### Changed
- **Wide-screen layout tidied up**: the player is a rounded card that stays in view, sized to the window with the player centred in it; the right side has a sticky tab header, even spacing between sections, and the map key laid out in a row

## v1.11.2
**Release date:** 2026-10-07

### Changed
- **Finding your location shows it's working**: after tapping Listen to World, the button's pin turns into a spinner ("FINDING YOU…"), the player shows its loading ring, and Local Listening shows "Finding you…" under the place name, until your location comes back (or the GPS gives up). Then the usual loading takes over for the biome's song or the channel list

## v1.11.1
**Release date:** 2026-10-07

### Changed
- The map now opens showing the whole state of Florida (fitted to the map's width, phones included) instead of street level around the pin. With live tracking on, it still zooms in to where you are, and "Move pin" still takes you to the pin

## v1.11
**Release date:** 2026-10-07

### Changed
- **The map moved into Channels (Local Listening) and Biomes (Biome Beats)**: it sits at the top of that tab with a **Hide map / Show map** toggle (remembered), so the tab bar is now just Channels/Biomes, Saved/Packs and Settings. "Move pin" and anything else that opened the Map tab shows the map in place

### Added
- **Saved items on the map** (Local Listening): saved songs, stations and spots appear as heart icons where they were saved. Tap one to play it or go there; when several were saved at the same place, the icon shows how many and opens a list to pick from. Songs saved from now on remember where you saved them
- **Edit biomes** button on every pack in the Packs tab: switches to that pack if needed and takes you straight to its biomes

## v1.10
**Release date:** 2026-10-07

### Added
- **Share buttons on everything you can save**: every saved song, station and spot in the Saved tab (and songs in the Saved Songs list) has a share button
  - a **song** link opens MusicMap with that one song ready to play ("Shared with you"), on the listener's own preferred service; songs saved from YouTube carry their video, so opening the link costs no YouTube quota
  - a **station** link opens that station near where you saved it (if it isn't near the pin, MusicMap looks it up directly)
  - a **spot** link opens that place on the channel you saved it with

## v1.9
**Release date:** 2026-10-07

### Added
- **Cast button for Spotify** in the player (when Spotify is connected): pick "This browser" or any of your Spotify apps and speakers. If something is playing it moves over straight away (same song, same spot), like Spotify's own device picker; the button turns green and shows the device's name while it plays elsewhere
- **Play button on the track list** (Biome Beats): shuffle-plays the biome's tracks, or the whole pack when the biome has none ("Play all")

### Changed
- **Empty biomes**: a pack biome with no tracks now shuffle-plays the pack's whole track list instead of staying silent; a saved place (Home, Work…) with no tracks is ignored by live location, so you hear the biome around you
- Spotify's device list no longer shows other MusicMap tabs (they all share one name)

## v1.8.1
**Release date:** 2026-10-07

### Fixed
- **Songs that can't play no longer stop the music**: a Spotify song that isn't available in your region (Spotify just sits at the start, or reports a playback error), a YouTube video that's removed, region-locked or not allowed on other sites, or a SoundCloud track the uploader limits is now skipped with a short note, in both modes. A Spotify song you paused part-way (even from another Spotify app) is left alone. After five unplayable songs in a row, playback stops and says so instead of looping
- When YouTube silently jumped past a video it couldn't play, the player kept showing the skipped song's name; it now follows the video that's really playing

## v1.8
**Release date:** 2026-10-07

### Added
- **SoundCloud in custom packs**: paste a SoundCloud track or playlist link in Make or Import Pack. Songs play in SoundCloud's own embedded player (no account needed), with the seek bar, pause, next and "open on SoundCloud" working like any other track, and the next song starting by itself. MusicMap notes when a track only allows a 30-second preview (SoundCloud Go+), and skips tracks the uploader doesn't let other sites play. Pack cards show the SoundCloud icon; SoundCloud is listed in Credits

## v1.7
**Release date:** 2026-10-07

### Added
- **Save songs**: the heart in the player saves the song that's playing (Made Here: once the song name shows) to a new **Saved Songs** list at the top of the Saved tab. Tapping one plays your saved songs as a list on your preferred service; songs saved from YouTube replay without using any YouTube quota
- **Wide-screen layout**: when the app has room (about 880px or more), the player sits on the left and stays in view while the tabs scroll beside it; lists use two columns and the map gets taller. It goes by the app's own width, so a narrow site column keeps the phone layout
- **Support link** ("☕ Enjoying MusicMap? Buy me a coffee"): set it under MusicMap → Settings → Support link and it shows in the app's footer, with a note beside Apple Music that the Apple developer account it needs costs $99 a year

### Changed
- When live location moves you somewhere new while a song keeps playing, the location pop-up stays up until the song (or station) changes; tap it to dismiss it
- Moving the pin yourself (or opening a saved spot) shows the player's loading ring straight away, even while music plays, until the new spot is ready

### Fixed
- **Dropdowns turning white** (Play songs on, Plays on, Distances): some site themes make a focused dropdown white, which hid the app's white text. Dropdowns and their option lists now keep the app's dark colours
- The location pop-up could fail to appear when the page was in the background (it waited for animation frames, which pause there)

## v1.6
**Release date:** 2026-10-07

### Added
- **Popular and Genre Mixes are one tab**: Popular now opens on "Top N in (country)" followed by the genre mixes; tapping one opens its songs and shuffle-plays a random one straight away. "← Top songs & genres" goes back without stopping the music. Old Genre Mixes share links and saved spots open Popular
- **Location chimes**: a soft ping when live location notices you've reached a new place (a new biome in Biome Beats, a new town or city in Local Listening), and a gentle two-note chime when the music switches to it. Made with Web Audio (no sound files); turn them off in **Settings → Display → Location chimes**
- **Location pop-up in Local Listening**: when the channel lists update for a new place, the same pop-up as a Biome Beats biome change shows where you are now and what's there (e.g. "📻 Orlando, Florida · 12 radio stations nearby")
- **Loading animations** so it's clear the player is still working: a spinning ring on the play button and a sweep across the seek bar while a song, station, channel or biome is starting (cleared once it plays, fails or pauses, and never left spinning); a spinner with placeholder rows while a channel list loads after changing location or channel; spinners for finding the place name, Spotify connecting, finding your Spotify apps, loading Apple Music, share codes, pack imports and Spotify searches

### Fixed
- Switching from Local Listening to Biome Beats no longer leaves the pause icon showing when nothing plays
- **Couldn't scroll the song list when adding tracks to a biome**: the Add tracks sheet's list was cut off at the bottom instead of scrolling (both tabs)
- **A second location reading could cancel a move**: when live location reported twice in quick succession, the second (small) move cancelled the channel reload for the first; moves are now measured from where the lists were loaded
- **Spotify channels playing one song and stopping**: Spotify accepts "add to queue" requests but doesn't reliably play them. Channels now hand Spotify the current song plus the next 15 in play order (shuffled or not) as one list, like Biome Beats, so it plays on by itself for about an hour, screen off or not
- Version numbers now go up with every change (`tools/bump_version.py` updates all of them at once)

## v1.5
**Release date:** 2026-10-07

### Added
- **Settings → Connections**: Spotify and Apple Music in one place, plus **Play songs on** (YouTube, Spotify or Apple Music). Tapping a Local Listening song plays it on your choice; the small buttons on each row play it on your other services. Biome Beats uses your choice for tracks that have both a YouTube and a Spotify version
- **Apple Music** (MusicKit): visitors sign in with their own Apple Account and play Local Listening songs (full songs with a subscription, 30-second previews without). Chart songs carry their Apple Music id, so the exact song plays and the rest of the list queues up behind it. The site owner adds a MusicKit key under **MusicMap → Settings → Apple Music**; the private key stays on the server and visitors only get day-long tokens locked to the site
- **Spotify "Plays on"**: play through any of your Spotify apps (Spotify Connect) instead of the browser. On a phone, pick the Spotify app so music keeps going with the screen off; it also makes Spotify work where the browser player can't (iPhone)
- If your chosen service doesn't have a song (or can't play here), that one song plays from YouTube and the next goes back to your choice
- **Shuffle button** on Popular, Genre Mixes, Made Here and Radio: turning it on starts a random song or station, and next/previous (and the songs YouTube, Spotify or Apple Music move on to by themselves) follow the shuffled order. Remembered per channel; Made Here starts shuffled
- **Song titles for Made Here**: while an artist plays, the player and lock screen show the actual song (from YouTube, Spotify or Apple Music) with "Artist · Made around …" underneath

### Fixed
- **Spotify kept disconnecting**: after an hour the expired access token counted as "not connected", so a reload or mode change dropped you. The saved sign-in is now renewed automatically; only Spotify itself ending the sign-in signs you out (network blips no longer do), two tabs no longer fight over the renewal, and the browser player reconnects after sleep
- **Spotify stopping after a song with the screen off**: the end of a song no longer races Spotify's own queue, and coming back to the page carries on (or resumes where it paused). If the phone won't start audio without a tap, the player says "Tap play to carry on" instead of pretending to play
- **Location forgotten when switching modes**: live location is now one setting shared by both modes and remembered between visits (it switches back on by itself if the browser already allows it). Switching to Local Listening moves the pin to where you are; switching to Biome Beats finds your biome. Both modes take a fresh reading near the end of each track, as well as on the regular timer
- Spotify's `ubi` tracking tag no longer stays in the page address after signing in
- Made Here artists whose YouTube channel has no playable uploads are looked up by name instead of sitting silent
- **YouTube playing Shorts and non-music videos**: song lookups now check the top five results, skip Shorts, interviews, trailers, reactions and similar, and prefer official audio and artist "Topic" channels (each new lookup costs 101 units instead of 100). Made Here plays an artist's long-form uploads only and skips anything that doesn't look like a song

## v1.4.1
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
