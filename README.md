# 🎵 MusicMap v1.3

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

### Embed It (WordPress / Elementor)
1. Download `musicmap.html`
2. In Elementor, drag an **HTML widget** onto your page
3. Paste the full contents of `musicmap.html` into the widget
4. Publish

### Self-Host
MusicMap is a single HTML file with no build step. Drop it anywhere that serves HTML.

For share code functionality, deploy `musicmap-api.php` as a PHP snippet on your WordPress site (see API Setup below).

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

---

## 🔧 API Setup (Share Codes)

To enable 6-character share codes:

1. Copy the contents of `musicmap-api.php` (requires PHP 7.4+)
2. In WordPress, install the **WPCode** or **PHP Snippets** plugin
3. Create a new snippet, paste the PHP, set it to run everywhere
4. Test it: visit `https://yoursite.com/?mm_action=ping` — you should see `{"ok":true,"status":"ok","version":"1.3"}`
5. In `musicmap.html`, find `const API_URL` and set it to `'https://yoursite.com/?mm_action='`

Without the API, MusicMap falls back to local `MM-` encoded share codes (longer but functional).

If your site is behind Cloudflare or another proxy, set `$TRUSTED_IP_HEADER` in the snippet (e.g. `'HTTP_CF_CONNECTING_IP'`) so the save rate limit applies per visitor. Packs are stored in `wp-content/uploads/musicmap_packs/`; on nginx hosts, the `.htaccess` there is ignored, so add a server rule if you want to block direct downloads.

---

## 🎧 Spotify (Optional)

Spotify tracks play in the browser through Spotify's Web Playback SDK, which needs **Spotify Premium**.

- **Connect:** Settings → Spotify → Connect. MusicMap's shared Spotify app is in Spotify's Development Mode, so only accounts invited to it can sign in; the app warns you before you try.
- **Your own Client ID:** anyone else can create a free app at [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard) (Web API + Web Playback SDK), add the Redirect URI shown in Settings, and paste the Client ID under "Use my own Spotify app". No Client Secret is needed.
- **Add Spotify links:** Packs → Make or Import Pack → paste a Spotify playlist, album or track link in the same box as YouTube links. Playlists must be ones you own or collaborate on; any album or track works. Packs can mix YouTube and Spotify.
- Spotify-only packs have no YouTube fallback; without Spotify connected, the app explains what's needed instead of playing.

---

## 🤖 AI Pack Builder

MusicMap includes two built-in prompts for any AI assistant (ChatGPT, Claude, Gemini…), under **Packs → Make or Import Pack → Import**:

**YouTube — build a pack**
1. Find a full game OST on YouTube
2. Choose **YouTube**, tap **Copy YouTube prompt**, fill in the URL(s) and timestamps
3. Paste the AI's JSON answer back into the Import box

**Spotify — sort a pack's songs into places**
1. Add a Spotify playlist, album or track link in **Make a Pack** and save it
2. Choose **Spotify**, pick the pack, tap **Copy Spotify prompt** (it includes the song list)
3. Paste the AI's JSON answer back into the Import box; it replaces that pack's places

AIs can't open Spotify links, so the Spotify prompt sorts songs you already have instead of inventing new ones. Both formats cover the 9 biomes plus Home, Work, School and Gym.

---

## 🔜 Coming Soon: Local Music Vibes Mode

**Started in v1.3:** the **Biome Packs | Local Listening** switch sits above the player. Local Listening has a draggable pin and live tracking, and the **Local Radio** channel works today. The other channels are next.

A second mode that plays real-world music from wherever you are instead of game packs. Drag the pin anywhere on the map, or turn on live tracking and let it follow you:

- **Popular** — the most-played songs in that country right now (always labelled with the country)
- **Made Here** — artists from that city or nearby, ranked by how well known they are
- **Genre Mixes** — playlists built from the area's top genres
- **Local Radio** — live stations broadcasting near the pin, which keep playing with the screen off

It will use free data sources only (Apple Music charts, Last.fm, Wikidata, MusicBrainz, Radio Browser, YouTube's free quota), looked up through the same `musicmap-api.php` with server-side caching. Most-popular charts are country-level, because no free source has city-level charts; Made Here and Local Radio are city-level. An early prototype lives in `alpha/` and isn't part of the live app yet.

---

## 📁 File Structure

```
musicmap.html       — The full app (single file, self-contained)
musicmap-api.php    — PHP share code API (WordPress/PHP Snippets)
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
