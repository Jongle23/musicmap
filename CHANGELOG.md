# MusicMap Changelog

## v1.20.1 — Current
**Release date:** 2026-10-08

### Fixed
- **Firefox: "Unable to load image data:image/svg+xml…" errors** when taking the Report a problem screenshot. The screenshot draws the app's icons as images, and Firefox refuses SVG images without their namespace (Chrome doesn't mind). The screenshot copy now adds it, so the icons appear in Firefox screenshots too.
- Biome detection checks the Overpass reply before reading it (a busy server answers with an HTML page).

## v1.20
**Release date:** 2026-10-08

### Added
- **A quick tour for first-time visitors**:
  - **What it covers:** six short steps (Biome Beats, Listen to World, ♡ and 👎, Local Listening, your own packs), each highlighting the part it's about.
  - **The demo:** a button that plays "The Hall of Fame" from the Hoenn pack.
  - **Dismissing it:** the app stays usable while it's open, and ✕, Skip or Esc closes it. It shows once, and not to visitors arriving from a shared link.
  - **Reopening it:** the **?** at the top of the app, or **Settings > Help > Take the tour**.

### Changed
- The Local Listening pop-up says **NOW ENTERING** (it said "ENTERING BIOME").
- Pop-ups that stay until the song changes now have a ✕, can be swiped away (up or sideways), and still close on a tap anywhere on them.
- **Live location only starts from a tap on Listen to World.** It used to switch itself back on (without music) when the page opened, if it had been on last time and the browser already allowed location.

### Fixed
- The player's controls overflowed on narrow phones. They now shrink to fit the card (checked at 320 px wide).

## v1.19.2
**Release date:** 2026-10-08

### Fixed
- **Local Listening stopped playing once the day's YouTube lookups ran out** (or with no YouTube API key). It showed "Can't play right now" even for songs whose video had been found before. Songs now keep playing in the YouTube player:
  - **Videos found before are sent with the lists.** The Popular chart and Homegrown lists arrive with every video found before (from the server's cache). Those play straight away, with no lookup and no quota used.
  - **Found videos are kept.** A found video is now kept for 3 years (was 180 days). A lookup that can't run returns the video found before, even an expired one.
  - **This browser remembers videos it has played** (the latest 400).
  - **Songs with no known video:** they play on your connected Spotify or Apple Music if there is one. Otherwise MusicMap moves on to the next song with a known video, and stops asking for 30 minutes.
  - **Biome Beats was never affected.** Packs keep each track's video, so they play in the YouTube player without any lookup.

## v1.19.1
**Release date:** 2026-10-08

### Fixed
- **Report a problem: "Couldn't take a screenshot (unsupported color function "color")"**. v1.19's brighter active-tab label used `color-mix()`, which the screenshot tool (html2canvas 1.4) can't read, so every screenshot failed.
  - The label now uses a plain colour (the same lavender).
  - The screenshot also swaps any newer colour format it finds for a plain one in its own copy of the page, so a future style can't break screenshots again.

## v1.19
**Release date:** 2026-10-08

### Changed
- **One player layout in both modes**: ♡ 👎 ⏮ ▶ ⏭ ↗.
  - **♡:** saves the song or station in Local Listening, and adds the track to favourites in Biome Beats. It replaces the heart that sat beside the title.
  - **Video & album art:** now a setting (Settings, under Location chimes) instead of a player button. It's on by default in both modes, since YouTube's terms ask for its player to stay visible while it plays. With nothing playing, the area takes no space.
  - **Spotify's "play on…" button:** now a small chip next to the source line. It fades in when Spotify connects and doesn't move anything else.

### Fixed
- **WordPress themes restyling the app.** For example, Astra's `button:hover` turned buttons into black boxes or made icons vanish on hover. Its input styles also made the map search box light grey, and its focus style turned typed text dark on dark fields.
  - The plugin build now scopes every MusicMap rule to the app, with enough priority to beat theme element styles. The standalone app is unchanged.
- **On a light page (or a site's light mode)** the app showed the page's white through its main area, so white icons and hover colours disappeared. The app now has its own dark background and dark form controls (`color-scheme: dark`).
- **The 👎 menu on WordPress** lost the app's colours, because it was attached outside the app's wrapper.
- **Contrast:** the active tab's label, the footer text and links, and the make-a-pack step numbers are easier to read.

## v1.18.1
**Release date:** 2026-10-08

### Added
- **⚠ Report** button at the end of the tab bar, on every screen. The screenshot is taken the moment you tap it, so it shows the problem you're looking at. The Report a problem row stays in Settings > Help, which now mentions the new button.

## v1.18
**Release date:** 2026-10-08

### Added
- **♡ Favourite tracks in Biome Beats**: a heart next to the track name saves the playing track. Favourites are listed in the Packs tab, grouped by pack:
  - tap one to play it, or the pack's row to shuffle-play all its favourites; then the biome carries on;
  - the heart there removes one;
  - "♥ Favourites" shows under the title while they play;
  - favourites play through Spotify too (the whole list is handed over, so they keep going with the screen off).

### Fixed
- **Spotify in Biome Beats only played one song.**
  - Spotify was given just the current song instead of the biome's shuffled list.
  - When a song ended, the app thought nothing had changed. About 6 seconds later it wrongly said the song "can't play here" and skipped. After five of those false skips in a row it stopped playback.
  - Now Spotify gets the whole list, and the end of a song moves straight on with no false message.
- **Picking up after the phone sleeps (Spotify).**
  - Coming back to the page now waits for the browser's Spotify player to reconnect, then carries on with the same song from about the same second, with the rest of the list queued. Before, it often restarted the song or said "still connecting".
  - If the browser player stalls at the end of a song while the page is hidden, MusicMap notices and moves on.
- "🎵 Spotify ready!" no longer pops up every time the browser player reconnects.

## v1.17
**Release date:** 2026-10-07

### Added
- **👎 Don't play this again** in the player:
  - **Biome Beats:** choose "In <this biome or place>" or "Anywhere in <pack>". "Anywhere in <pack>" takes the track out of every biome and place in the pack, and out of the whole-pack shuffle in empty biomes.
  - **Local Listening:** one tap hides the song from Popular (all its genre mixes, in every country), the artist from Homegrown, or the station from Radio, then moves on to the next one. Not shown for Saved or shared songs.
- **Settings > Removed & disliked** (was "Removed tracks", now in both modes): tabs for Biomes & places, Whole pack, Popular, Homegrown and Radio, each with a count and a Restore button. Tracks removed with ✕ in a track list still show under Biomes & places.

### Fixed
- The track picker offered **Spotify search on YouTube packs**, and Spotify tracks added there never showed up. Spotify search now appears only in your own Spotify packs.

## v1.16
**Release date:** 2026-10-07

### Added
- **Report a problem**: in Settings > Help and in the footer. Visitors describe what went wrong, can leave an email for a reply, and choose to include:
  - **technical details**: app version, mode, channel or pack, what's playing, connected services, browser and screen size, the town they're listening in (never exact coordinates) and the app's recent errors and messages. Sign-in tokens, keys and codes are scrubbed out of the log;
  - **a screenshot of MusicMap only** (html2canvas, loaded only when the form opens, pinned with an SRI hash). It's previewed before sending. Video players show as blank boxes.
- **MusicMap > Reports** in WordPress admin: a list with a count of new reports, each report with its screenshot and details, and buttons to mark it fixed or delete it. You can choose to get an email for each new report (Settings > Problem reports; on by default; the email has the message and a link only).
- Reports are rate-limited (5 an hour per visitor) and checked on the server. Screenshots must be real JPEG/PNG images up to 1.5 MB and are re-encoded before saving. Reports are kept for 90 days, at most 500. Visitor IPs are stored only as a hash, and the reports table is removed on uninstall.

## v1.15
**Release date:** 2026-10-07

### Added
- **Search the map**: a search box above the map finds cities, towns, states, regions and countries (OpenStreetMap's Nominatim, names in English). Pick a result to go there: in Local Listening it also moves your listening pin there; in Biome Beats tap the map to add a saved place. Cities are centred on the place itself; states, regions and countries show their whole area (countries with far-off territories are centred at country level)

### Changed
- Place names in Biome Beats' location line are now in English too (Local Listening already was)

## v1.14
**Release date:** 2026-10-07

### Added
- **Artist photos in Homegrown**: artists show a small round photo from Wikimedia Commons (via Wikidata) instead of a letter, also on the lock screen while they play. Most well-known artists have one (38 of 39 around Seattle, 18 of 19 around Tampa in testing); otherwise, or if a photo can't load, the letter stays. Wikimedia Commons is listed in Credits (each photo has its own free licence and author)

### Fixed
- Homegrown rows could show a Wikidata id such as "Q49255" where the place name should be; an id is never shown now

## v1.13
**Release date:** 2026-10-07

### Changed
- **New flow for making a pack from links**:
  - the steps now say you can paste several links (playlists, albums or single songs/videos), one at a time, and that all links in a pack come from **one service** (YouTube, Spotify or SoundCloud). A link from a different service is refused with the reason, and a summary shows the service, links and tracks so far
  - after **Save Pack**, a new step asks how to sort the tracks into biomes: **Sort them myself** (opens your biomes with a "Sorting…" banner and a Done button), **Let an AI sort them** (a ready-made prompt listing the pack's tracks, plus a box right there for the AI's JSON answer, with a preview before placing), or **Not now** (the whole pack plays everywhere, shuffled)
  - new packs start with empty biomes (Spotify and SoundCloud packs used to put every track in every biome)
- The Import tab's Spotify-only sort prompt is now **Sort a pack**, for packs from any service

### Fixed
- **Setting up a new pack filled "Removed tracks"**: whatever you place while setting up a pack (by hand or with an AI) is now the pack's starting layout, so it no longer shows as removed tracks. Changes made after setup still do. An AI sort of one of your own packs also becomes its layout

## v1.12.6
**Release date:** 2026-10-07

### Added
- **Scrolling titles**: when the song title (or the line under it) is too long for the player, it slides across with soft faded edges, pauses at the end, and slides back. Short titles stay still; with "reduce motion" on, long ones are trimmed with "…" instead

## v1.12.5
**Release date:** 2026-10-07

### Added
- **SoundCloud in Settings → Connections**: a card explaining that SoundCloud needs no sign-in and plays the tracks and playlists you add to custom packs in SoundCloud's own player (with the note about 30-second Go+ previews and tracks that can't be played on other sites)

## v1.12.4
**Release date:** 2026-10-07

### Changed
- Credits: OpenStreetMap, Nominatim and the Overpass API are one OpenStreetMap entry (map tiles and data, place names, and the map features that pick your biome)

## v1.12.3
**Release date:** 2026-10-07

### Changed
- Credits: **Nighthawk.club** is listed as MusicMap's host; WordPress is credited as what MusicMap runs on (as a plugin) rather than its host. The Apple Music charts credit now says Popular (top songs and genre mixes)

## v1.12.2
**Release date:** 2026-10-07

### Changed
- Support wording no longer implies Apple Music is already live: Credits now says it "helps cover running costs and supports future projects and integrations like Apple Music", and the note in Connections says Apple Music needs a $99-a-year Apple developer account

## v1.12.1
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
