# 🎵 MusicMap v1.20.1

**Wander your world in Music. Vibe, Customize and Share.**

MusicMap is a geolocation-aware music player that detects your real-world environment and plays music that matches it — forests, beaches, cities, mountains and more. Built for the web, designed to feel like a game.

---

## 🌍 How It Works

1. **Tap "Listen to World"** — MusicMap uses your GPS to detect your surroundings
2. **OpenStreetMap** classifies your environment into a biome (beach, forest, city, etc.)
3. **Music plays automatically** from the active pack that matches your biome
4. **Biomes change at track boundaries** — no jarring mid-song interruptions
5. **Custom locations** let you pin specific spots (Home, Work, Gym) with their own music

---

## 🚀 Getting Started

### Play It
Visit **[jongle.me/musicmap](https://jongle.me/musicmap)** — no install required. Works in any modern browser.

### WordPress Plugin (recommended)
1. Download **[`dist/musicmap.zip`](dist/musicmap.zip)** from this repo (or rebuild it with `python tools/build_plugin.py --zip`)
2. In WP Admin go to **Plugins → Add New → Upload Plugin**, upload `musicmap.zip`, and activate it — or copy the `wordpress-plugin/musicmap` folder into `wp-content/plugins/` by FTP / File Manager instead
3. Add **`[musicmap]`** (or `[MusicMap]`) to any page or post — a Shortcode block works, and so does Elementor's Shortcode widget
4. Open **MusicMap → Settings** for API keys, the contact email, an optional Spotify Client ID, optional Apple Music (MusicKit) details and share-code limits
5. Open **MusicMap → Data** to view and delete share codes, cached lookups and rate-limit records

The plugin serves the app, runs the share-code API (`?mm_action=` and `/wp-json/musicmap/v1/`) and stores everything in its own database tables. Keys stay on the server and are shown masked after saving. If you used the old snippet, turn it off after activating; the plugin copies its saved share codes into the database automatically.

For Spotify sign-in, add each page that shows MusicMap as a Redirect URI in your Spotify dashboard (for example `https://jongle.me/musicmap/`).

### Self-Host (no WordPress)
`musicmap.html` is a single file with no build step — drop it anywhere that serves HTML. It's also the source the plugin and the future Android/iOS apps are built from.

---

## 📦 Default Packs

MusicMap ships with six built-in packs:

| Pack | Tracks | Source |
|---|---|---|
| 🌿 Hoenn Pack | 92 | Pokémon Ruby & Sapphire |
| 🔴 Kanto Pack | 32 | Pokémon Red & Blue |
| 🍄 Super Mario Bros. 3 | 45 | Super Mario Bros. 3 (NES) |
| 🪖 Halo Reach | 20 | Halo Reach OST |
| ⛏️ Terraria | 90 | Terraria OST |
| 🎧 PachiPatch | 474 | Jongle's Spotify playlist (needs Spotify, see below) |

Each pack card shows where it plays from (YouTube, Spotify or both). Game packs stream via YouTube; PachiPatch streams via Spotify. No audio files are bundled.

---

## 🎮 Features

- **5 built-in game music packs** with verified track timestamps, plus the PachiPatch Spotify pack
- **Spotify (optional)** — play Spotify tracks in the browser with Premium, import your own playlists as packs
- **OSM-powered biome detection** — uses real map data, not just address guessing
- **Custom location pins** — drop multiple pins per location with individual proximity radii
- **Pack builder** — add YouTube videos/playlists and Spotify playlists/albums/tracks to a custom pack
- **Timestamp importer** — paste YouTube chapter lists to populate tracks instantly
- **AI pack builder** — use the built-in prompt with any AI to generate packs from any OST
- **Share codes** — share custom packs with a 6-character code
- **Shuffle queue** — Fisher-Yates shuffle ensures every track plays before repeating
- **Track picker** — see which biomes already use each track while building playlists
- **Favourite tracks (♡)** — heart a Biome Beats track; favourites are listed in the Packs tab and can be shuffle-played per pack
- **Don't play this again (👎)** — remove a track from a biome or a whole pack, or hide a song, artist or station in Local Listening; restore anything from Settings > Removed & disliked
- **Tour** — a short, skippable first-visit guide (reopen it with the ? or Settings > Help)
- **Report a problem** — visitors can send a report with optional technical details and a screenshot; read them in WordPress under MusicMap > Reports (needs the plugin)

---

## 🔧 API Setup (Share Codes)

**With the WordPress plugin there's nothing to set up** — share codes work as soon as it's activated. The steps below are for the older standalone snippet (`musicmap-api.php`), kept for sites that don't use the plugin.

To enable 6-character share codes with the snippet:

1. Copy the contents of `musicmap-api.php` (requires PHP 7.4+)
2. In WordPress, install the **WPCode** or **PHP Snippets** plugin
3. Create a new snippet, paste the PHP, set it to run everywhere
4. Test it: visit `https://yoursite.com/?mm_action=ping` — you should see `{"ok":true,"status":"ok","version":"1.20.1"}`
5. Standalone only: pass the endpoint to the app with `<script>window.MUSICMAP_CONFIG={shareApi:'https://yoursite.com/?mm_action='}</script>` before the app script

Without the API, MusicMap falls back to local `MM-` encoded share codes (longer but functional).

If your site is behind Cloudflare or another proxy, set `$TRUSTED_IP_HEADER` in the snippet (e.g. `'HTTP_CF_CONNECTING_IP'`) so the save rate limit applies per visitor. Packs are stored in `wp-content/uploads/musicmap_packs/`; on nginx hosts, the `.htaccess` there is ignored, so add a server rule if you want to block direct downloads.

---

## 🎧 Spotify (Optional)

Spotify tracks play in the browser through Spotify's Web Playback SDK, which needs **Spotify Premium**.

- **Connect:** Settings → Connections → Spotify → Connect. MusicMap's shared Spotify app is in Spotify's Development Mode, so only accounts invited to it can sign in; the app warns you before you try.
- **Your own Client ID:** anyone else can create a free app at [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard) (Web API + Web Playback SDK), add the Redirect URI shown in Settings, and paste the Client ID under "Use my own Spotify app". No Client Secret is needed.
- **Add Spotify links:** Packs → Make or Import Pack → paste a Spotify playlist, album or track link (as many as you like, one at a time). Playlists must be ones you own or collaborate on; any album or track works. A pack uses one service, so Spotify links can't be mixed with YouTube or SoundCloud links in the same pack.
- Spotify-only packs have no YouTube fallback; without Spotify connected, the app explains what's needed instead of playing.
- **Plays on:** choose *This browser* or one of your Spotify apps (Spotify Connect). On a phone, pick the Spotify app: it keeps playing with the screen off, and it works on iPhone, where the browser player doesn't.

## ☁️ SoundCloud (Custom Packs)

Paste a SoundCloud track or playlist link (`https://soundcloud.com/artist/track` or `…/sets/playlist`) into **Make or Import Pack** (as many as you like; a pack uses one service, so don't mix them with YouTube or Spotify links). The songs play in SoundCloud's own embedded player, in the same spot as the video, and the next one starts when a song ends. No account or key is needed.

Good to know:
- Some tracks only play a **30-second preview** (SoundCloud Go+ tracks); MusicMap says so when you add them and when they play.
- Some uploaders don't allow their tracks to be embedded, and private or removed tracks can't play; those are skipped.
- Short links (`on.soundcloud.com/…`) can't be read: open them and copy the full `soundcloud.com` address.
- SoundCloud is for custom packs only. Its search needs an approved API key, so Local Listening channels can't look songs up there.

## 🍎 Apple Music (Optional)

Visitors with an Apple Music subscription can play Local Listening songs through Apple Music (without one, Apple plays 30-second previews).

1. In your [Apple Developer account](https://developer.apple.com/account) (Apple Developer Program membership required), go to **Certificates, Identifiers & Profiles**, create a **Media ID**, then a **Key** with **MusicKit** enabled, and download its `.p8` file
2. In WordPress, open **MusicMap → Settings → Apple Music** and enter your **Team ID**, the **Key ID** and the contents of the `.p8` file
3. Visitors then see Apple Music under **Settings → Connections**

The private key never leaves your server: the plugin signs a developer token that lasts a day, works only on your site's address, and is cached so it is signed about twice a day.

---

## 🤖 AI Pack Builder

### Making a pack from links

1. **Packs → Make or Import Pack**: paste links one at a time (playlists, albums, or single songs/videos). All links in a pack come from **one service**: YouTube, Spotify or SoundCloud.
2. Name it, pick an icon, **Save Pack**.
3. Choose how to sort the tracks into biomes:
   - **Sort them myself**: opens your biomes with a "Sorting…" banner; tap a biome, then **Add tracks**, and tap **Done** when finished
   - **Let an AI sort them**: copy the ready-made prompt (it lists the pack's tracks) into ChatGPT, Claude or Gemini, and paste its JSON answer into the box right there
   - **Not now**: until it's sorted, the whole pack plays everywhere, shuffled

Whatever you place while setting up becomes the pack's starting layout, so none of it shows under **Removed tracks**. Change it later from **Packs → Edit biomes**.

### Prompts in the Import tab

**Packs → Make or Import Pack → Import** also has two prompts:

**YouTube — build a pack**
1. Find a full game OST on YouTube
2. Choose **YouTube**, tap **Copy YouTube prompt**, fill in the URL(s) and timestamps
3. Paste the AI's JSON answer back into the Import box

**Sort a pack — place an existing pack's tracks**
1. Choose **Sort a pack** and pick the pack (any service)
2. Copy the prompt (it includes the track list)
3. Paste the AI's JSON answer back into the Import box; it replaces that pack's places

AIs can't open Spotify or SoundCloud links, so this prompt sorts tracks you already have instead of inventing new ones. Both formats cover the 9 biomes plus Home, Work, School and Gym.

---

## 📻 Local Listening Mode

Switch between **Biome Beats** (the game-pack mode — a nod to MusicMap's original name) and **Local Listening** with the control right above the player. Local Listening plays real-world music from wherever the listening pin is: drag it anywhere on the map, tap the map to jump there (playback switches right away), or turn on live tracking. It starts in Tampa, FL until you choose a spot.

Pick a channel from the sub-menu at the top of the **Channels** tab:

- **Popular** — the country's top songs (Apple Music charts) plus the same chart split into genre mixes (Pop, Country, Hip-Hop/Rap…). Tap the top songs or a genre to open it: it shuffles and starts playing
- **Homegrown** — well-known artists born or formed near the pin, most famous first
- **Radio** — live stations broadcasting near the pin; keeps playing with the screen off

Songs and artists play through YouTube by default (the video shows while it plays, as YouTube requires), or on Spotify or Apple Music for visitors who connected one: **Settings → Connections → Play songs on** picks which, and the small buttons on each row play it on the others. Each channel has a **Shuffle** button (Homegrown starts shuffled), and while a Homegrown artist plays, the player shows the song. Every row has a **share** button: the link opens MusicMap at the same spot, on the same channel, with that item ready to play. Favourite stations and spots go in the **Saved** tab.

Data comes from free sources only — Apple Music charts, Wikidata, Radio Browser and your free YouTube Data API key — fetched by the WordPress plugin and cached in its database for every visitor. Each new song costs 101 of YouTube's 10,000 free daily units (about 99 new songs a day; the extra unit checks video lengths so Shorts are skipped); songs played before are free. Set the daily budget and see today's usage under **MusicMap → Settings**. Charts are country-level (no free source has city charts); Homegrown and Radio are local. An early prototype of this mode lives in `alpha/`.

---

## 📁 File Structure

```
musicmap.html       — The full app (single file, self-contained) — the source of truth
wordpress-plugin/   — The MusicMap WordPress plugin ([musicmap] shortcode, settings, data, API)
tools/              — build_plugin.py: builds the plugin's assets (and zip) from musicmap.html
                      bump_version.py: sets the version everywhere (`patch` for fixes, `minor` for features)
                      make_share_card.py: redraws the link-preview image (needs Pillow)
dist/musicmap.zip   — Ready-to-upload plugin zip (rebuilt with tools/build_plugin.py --zip)
musicmap-api.php    — Legacy standalone share-code snippet (WPCode / PHP Snippets)
CHANGELOG.md        — Version history
LICENSE.md          — License terms
README.md           — This file
alpha/              — Prototype of the upcoming Local Music Vibes mode (not live)
```

---

## 🛠️ Built With

- [OpenStreetMap](https://www.openstreetmap.org/) + [Nominatim](https://nominatim.org/) — reverse geocoding
- [Overpass API](https://overpass-api.de/) — OSM biome tag detection
- [Leaflet.js](https://leafletjs.com/) — interactive maps
- [YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference) — music playback
- [html2canvas](https://html2canvas.hertzen.com/) — screenshots for problem reports (loaded only when the form opens)
- [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) — pixel font
- Generated with assistance from [Claude](https://claude.ai) (Anthropic)

---

## 📄 License

**MusicMap Source Available License**

Free for personal, non-commercial use. You may view, fork and self-host this project for personal use provided you retain attribution.

Commercial use, resale, incorporation into a paid product or service, or use as a managed/hosted service requires a written license from the author.

© 2026 Jongle — All commercial rights reserved.

For licensing enquiries: contact via [jongle.me](https://jongle.me)

---

## 🙏 Thank You

Thank you for checking out MusicMap.

This project started as a simple idea — *what if the music changed based on where you actually are?* — and grew into something I'm genuinely proud of.

A huge thank you to:

- **The OpenStreetMap community** for maintaining the free, open map data that makes location-aware features possible
- **The game music composers** whose work forms the heart of this app — Junichi Masuda (Pokémon), Koji Kondo (Mario), Martin O'Donnell (Halo), Scott Lloyd Shelly (Terraria) and the many others whose music has soundtracked countless adventures
- **Anthropic / Claude** for AI assistance throughout development
- Everyone who has played with it, shared packs, and sent feedback

If MusicMap has made a walk, a commute, or a lazy afternoon feel a little more like an adventure — that's everything.

*Wander your world in Music.*

— **Jongle**
