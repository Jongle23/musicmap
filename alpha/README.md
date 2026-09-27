# MusicMap — Location-Based Music Discovery (alpha 0.1.0)

> **Alpha prototype — not deployed.** This is the starting point for the
> upcoming **Local Music Vibes** mode (see "Coming Soon" in the main
> README). It will be merged into `musicmap.html` behind a menu toggle, and
> its proxy routes folded into the main `musicmap-api.php`. The setup steps
> below describe the standalone prototype and aren't used by the live app.

Beta web app: pick a spot on an OpenStreetMap map and get three playlists —
**Made Here** (artists who originated there), **Most Popular Here** (country
charts), and **Genre Popular Songs** (genre playlists built from that
country's top artists). Playback is full-length via YouTube.

## How it's built

- **`musicmap-api/`** — a WordPress plugin providing a REST proxy
  (`/wp-json/musicmap/v1/*`) in front of Nominatim, MusicBrainz, Last.fm, and
  YouTube. Needed because those APIs either lack CORS headers or require a
  server-side API key.
- **`frontend/`** — a static, build-free page (Leaflet map + vanilla JS) that
  calls the plugin's REST routes and plays results via the YouTube IFrame
  Player. Drop its contents into a WordPress page/custom HTML block, or serve
  it as a plugin page template.

## One-time setup

1. **Last.fm API key** (free) — register at
   [last.fm/api/account/create](https://www.last.fm/api/account/create).
2. **YouTube Data API v3 key** (free) — create a project in
   [Google Cloud Console](https://console.cloud.google.com/), enable "YouTube
   Data API v3," and create an API key. The free quota is 10,000 units/day; a
   search costs 100 units (~100 searches/day). Every resolved artist/track is
   cached permanently in a DB table, so quota is only spent on lookups that
   have never been made before — but a slow start (new/rare locations) will
   burn through it faster than well-trodden cities.
3. **Contact email** — required by Nominatim's and MusicBrainz's usage
   policies; enter any email you're fine receiving abuse reports at (should
   basically never be needed).

Enter all three in **WP Admin → Settings → MusicMap** after installing the
plugin.

## Installing on Jongle.me

1. Zip the `musicmap-api` folder and upload it via **Plugins → Add New →
   Upload Plugin** (or copy it directly into `wp-content/plugins/` via
   FTP/File Manager).
2. Activate it. This creates the `wp_musicmap_video_cache` table.
3. Fill in the three settings above.
4. Create a new WordPress page and paste the contents of `frontend/index.html`
   into a Custom HTML block (or use a "raw HTML" page template if your theme
   supports one) — the CSS/JS files (`styles.css`, `app.js`) need to be
   reachable at the same relative path as `index.html`, so upload them
   alongside it (e.g. via the Media Library or a small child-theme folder)
   and adjust the `<link>`/`<script>` `src` paths if WordPress serves them
   from a different URL than a plain relative path.
5. Confirm `frontend/app.js`'s `API_BASE` constant matches where the REST
   routes actually live — it defaults to `/wp-json/musicmap/v1`, which is
   correct as long as the page is served from the same WordPress site as the
   plugin.

## What's in v1 vs. later

- **v1 (this build):** guest and "YouTube Music" both play full songs via
  YouTube's embeddable player — no login required either way.
- **Fast-follow, not yet built:** Spotify (OAuth + Premium), Apple Music
  (OAuth + Apple Developer Program membership, $99/yr), and SoundCloud (API
  app-registration approval) sign-in, each swapping in as an alternate
  playback backend once a user authenticates. The provider-picker UI already
  has buttons for these, marked "Coming soon."

## Known limitations

- "Most Popular Here" and "Genre Popular Songs" are **country-level**, not
  city-level — no free public API provides reliable arbitrary-city charts.
  "Made Here" can be city-level when MusicBrainz has `begin-area` data for
  that city, falling back to region/country otherwise (the UI tags each
  Made Here result with which level actually matched).
- MusicBrainz results are *not* ranked by fame — there's no free "how popular
  is this artist" signal from MusicBrainz itself, so results are left in the
  search API's own relevance order.

## Manual verification checklist (do this after deploying)

1. Hit each REST route directly first, e.g.
   `https://jongle.me/wp-json/musicmap/v1/location?lat=47.6&lng=-122.3`,
   to confirm keys are configured correctly and JSON comes back before
   testing the UI.
2. Load the page, confirm the provider-picker modal appears, and that both
   "Continue with YouTube Music" and "Continue as guest" dismiss it (the
   other three should be visibly disabled with a "Coming soon" tag).
3. Drop a pin on a well-covered city (e.g. Seattle, London, Nashville) and
   confirm all three tabs populate with playable tracks.
4. Drop a pin on a small town with little MusicBrainz coverage and confirm
   Made Here falls back gracefully (region/country tag shown) instead of
   showing an empty/broken state.
5. Click a track and confirm YouTube playback starts on a user click (not
   autoplay — browsers block that), and that next/prev/play-pause work.
