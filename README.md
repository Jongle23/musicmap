# MusicMap v1.1

**Wander your world in Music. Vibe, Customize and Share.**

MusicMap is a geolocation-aware music player that detects your real-world environment and plays music that matches it — forests, beaches, cities, mountains and more. Built for the web, designed to feel like a game.

---

## How It Works

1. **Tap "Listen to World"** — MusicMap uses your GPS to detect your surroundings
2. **OpenStreetMap** classifies your environment into a biome (beach, forest, city, etc.)
3. **Music plays automatically** from the active pack that matches your biome
4. **Biomes change at track boundaries** — no jarring mid-song interruptions
5. **Custom locations** let you pin specific spots (Home, Work, Gym) with their own music

---

## Getting Started

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

## Default Packs

MusicMap ships with five built-in packs:

| Pack | Tracks | Source |
|---|---|---|
| 🌿 Hoenn Pack | 92 | Pokémon Ruby & Sapphire |
| 🔴 Kanto Pack | 32 | Pokémon Red & Blue |
| 🍄 Super Mario Bros. 3 | 45 | Super Mario Bros. 3 (NES) |
| 🪖 Halo Reach | 20 | Halo Reach OST |
| ⛏️ Terraria | 90 | Terraria OST |

All music is streamed via YouTube. No audio files are bundled.

---

## Features

- **5 built-in game music packs** with verified track timestamps
- **OSM-powered biome detection** — uses real map data, not just address guessing
- **Custom location pins** — drop multiple pins per location with individual proximity radii
- **Pack builder** — add any YouTube video or playlist as a custom pack
- **Timestamp importer** — paste YouTube chapter lists to populate tracks instantly
- **AI pack builder** — use the built-in prompt with any AI to generate packs from any OST
- **Share codes** — share custom packs with a 6-character code
- **Shuffle queue** — Fisher-Yates shuffle ensures every track plays before repeating
- **Track picker** — see which biomes already use each track while building playlists

---

## API Setup (Share Codes)

To enable 6-character share codes:

1. Copy the contents of `musicmap-api.php`
2. In WordPress, install the **WPCode** or **PHP Snippets** plugin
3. Create a new snippet, paste the PHP, set it to run everywhere
4. Test it: visit `https://yoursite.com/?mm_action=ping` — you should see `{"ok":true}`
5. In `musicmap.html`, find `const API_URL` and set it to `'https://yoursite.com/?mm_action='`

Without the API, MusicMap falls back to local `MM-` encoded share codes (longer but functional).

---

## AI Pack Builder

MusicMap includes a built-in prompt for generating packs with any AI assistant:

1. Find a full game OST on YouTube
2. Open **Packs → Make or Import Pack → Import**
3. Tap **Copy prompt**, fill in the YouTube URL and timestamps
4. Paste into ChatGPT, Claude, Gemini or any AI
5. Paste the JSON response back into the Import box

The AI format supports multiple videos and playlists.

---

## File Structure

```
musicmap.html       — The full app (single file, self-contained)
musicmap-api.php    — PHP share code API (WordPress/PHP Snippets)
LICENSE.md          — License terms
README.md           — This file
```

---

## Built With

- [OpenStreetMap](https://www.openstreetmap.org/) + [Nominatim](https://nominatim.org/) — reverse geocoding
- [Overpass API](https://overpass-api.de/) — OSM biome tag detection
- [Leaflet.js](https://leafletjs.com/) — interactive maps
- [YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference) — music playback
- [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) — pixel font
- Generated with assistance from [Claude](https://claude.ai) (Anthropic)

---

## License

**MusicMap Source Available License**

Free for personal, non-commercial use. You may view, fork and self-host this project for personal use provided you retain attribution.

Commercial use, resale, incorporation into a paid product or service, or use as a managed/hosted service requires a written license from the author.

© 2026 Jongle — All commercial rights reserved.

For licensing enquiries: contact via [jongle.me](https://jongle.me)

---

## Thank You

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
