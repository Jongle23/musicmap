(function () {
  'use strict';

  // Points at the WordPress site hosting the musicmap-api plugin's REST routes.
  // Defaults to a relative path, which works when this page is served from the
  // same WordPress install. Point it at an absolute URL if the frontend is
  // ever hosted separately from the WordPress backend.
  const API_BASE = '/wp-json/musicmap/v1';

  let map, marker;
  let currentPlace = null; // { city, region, country, country_code }
  let selectedProvider = null; // 'youtube' | 'guest' (both play via YouTube in v1)

  // Per-location cache so switching tabs back and forth doesn't re-fetch.
  const dataCache = { madeHere: null, popularHere: null, genres: null };
  let activeGenreIndex = 0;

  let ytPlayer = null;
  let ytReady = false;
  let playQueue = [];
  let queueIndex = -1;
  let isPlaying = false;

  /* ---------------- Provider picker ---------------- */

  function initProviderPicker() {
    const modal = document.getElementById('provider-modal');

    document.querySelectorAll('.provider-btn[data-provider="youtube"]').forEach((btn) => {
      btn.addEventListener('click', () => selectProvider('youtube', modal));
    });

    document.getElementById('guest-btn').addEventListener('click', () => selectProvider('guest', modal));
  }

  function selectProvider(provider, modal) {
    selectedProvider = provider;
    modal.classList.add('hidden');
  }

  /* ---------------- Map ---------------- */

  function initMap() {
    map = L.map('map').setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    map.on('click', (e) => handleLocationPicked(e.latlng.lat, e.latlng.lng));

    document.getElementById('locate-btn').addEventListener('click', useMyLocation);
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        map.setView([pos.coords.latitude, pos.coords.longitude], 11);
        handleLocationPicked(pos.coords.latitude, pos.coords.longitude);
      },
      () => alert('Could not get your location. You can still click the map to pick one.')
    );
  }

  function handleLocationPicked(lat, lng) {
    if (marker) {
      marker.setLatLng([lat, lng]);
    } else {
      marker = L.marker([lat, lng]).addTo(map);
    }

    setLocationLabel('Finding place…');
    dataCache.madeHere = null;
    dataCache.popularHere = null;
    dataCache.genres = null;

    fetchJSON(`${API_BASE}/location?lat=${lat}&lng=${lng}`)
      .then((place) => {
        currentPlace = place;
        const label = [place.city, place.region, place.country].filter(Boolean).join(', ');
        setLocationLabel(label || 'Location resolved');
        loadActivePreset();
      })
      .catch((err) => setLocationLabel(`Could not resolve this location (${err.message})`));
  }

  function setLocationLabel(text) {
    document.getElementById('location-label').textContent = text;
  }

  /* ---------------- Preset tabs ---------------- */

  function initTabs() {
    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
        document.querySelectorAll('.preset-panel').forEach((p) => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`preset-${btn.dataset.preset}`).classList.add('active');
        loadActivePreset();
      });
    });
  }

  function activePresetKey() {
    return document.querySelector('.tab-btn.active').dataset.preset;
  }

  function loadActivePreset() {
    if (!currentPlace) return;

    const preset = activePresetKey();
    if (preset === 'made-here') loadMadeHere();
    else if (preset === 'popular-here') loadPopularHere();
    else if (preset === 'genres') loadGenres();
  }

  function loadMadeHere() {
    const panel = document.getElementById('preset-made-here');
    if (dataCache.madeHere) {
      renderTrackList(panel.querySelector('.track-list'), dataCache.madeHere, panel.querySelector('.preset-empty'), true);
      return;
    }
    setPanelLoading(panel);
    const q = new URLSearchParams({
      city: currentPlace.city || '',
      region: currentPlace.region || '',
      country: currentPlace.country || '',
    });
    fetchJSON(`${API_BASE}/made-here?${q}`)
      .then((data) => {
        dataCache.madeHere = data.tracks;
        renderTrackList(panel.querySelector('.track-list'), data.tracks, panel.querySelector('.preset-empty'), true);
      })
      .catch((err) => setPanelError(panel, err));
  }

  function loadPopularHere() {
    const panel = document.getElementById('preset-popular-here');
    if (dataCache.popularHere) {
      renderTrackList(panel.querySelector('.track-list'), dataCache.popularHere, panel.querySelector('.preset-empty'));
      return;
    }
    if (!currentPlace.country) {
      setPanelError(panel, new Error('No country resolved for this location.'));
      return;
    }
    setPanelLoading(panel);
    fetchJSON(`${API_BASE}/popular-here?country=${encodeURIComponent(currentPlace.country)}`)
      .then((data) => {
        dataCache.popularHere = data.tracks;
        renderTrackList(panel.querySelector('.track-list'), data.tracks, panel.querySelector('.preset-empty'));
      })
      .catch((err) => setPanelError(panel, err));
  }

  function loadGenres() {
    const panel = document.getElementById('preset-genres');
    if (dataCache.genres) {
      renderGenrePlaylists(panel, dataCache.genres);
      return;
    }
    if (!currentPlace.country) {
      setPanelError(panel, new Error('No country resolved for this location.'));
      return;
    }
    setPanelLoading(panel);
    fetchJSON(`${API_BASE}/genres?country=${encodeURIComponent(currentPlace.country)}`)
      .then((data) => {
        dataCache.genres = data.playlists;
        activeGenreIndex = 0;
        renderGenrePlaylists(panel, data.playlists);
      })
      .catch((err) => setPanelError(panel, err));
  }

  function renderGenrePlaylists(panel, playlists) {
    const tabsEl = panel.querySelector('.genre-tabs');
    const listEl = panel.querySelector('.track-list');
    const emptyEl = panel.querySelector('.preset-empty');

    tabsEl.innerHTML = '';

    if (!playlists || playlists.length === 0) {
      emptyEl.textContent = 'No genre data available for this location yet.';
      emptyEl.style.display = 'block';
      listEl.innerHTML = '';
      return;
    }

    emptyEl.style.display = 'none';

    playlists.forEach((playlist, i) => {
      const btn = document.createElement('button');
      btn.textContent = playlist.genre;
      if (i === activeGenreIndex) btn.classList.add('active');
      btn.addEventListener('click', () => {
        activeGenreIndex = i;
        tabsEl.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        renderTrackList(listEl, playlists[i].tracks, emptyEl);
      });
      tabsEl.appendChild(btn);
    });

    renderTrackList(listEl, playlists[activeGenreIndex].tracks, emptyEl);
  }

  function setPanelLoading(panel) {
    const empty = panel.querySelector('.preset-empty');
    empty.textContent = 'Loading…';
    empty.style.display = 'block';
    panel.querySelector('.track-list').innerHTML = '';
  }

  function setPanelError(panel, err) {
    const empty = panel.querySelector('.preset-empty');
    empty.textContent = `Couldn't load this: ${err.message}`;
    empty.style.display = 'block';
    panel.querySelector('.track-list').innerHTML = '';
  }

  function renderTrackList(listEl, tracks, emptyEl, showMatchTag) {
    listEl.innerHTML = '';

    if (!tracks || tracks.length === 0) {
      if (emptyEl) {
        emptyEl.textContent = 'No results for this location yet.';
        emptyEl.style.display = 'block';
      }
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';

    tracks.forEach((track) => {
      const li = document.createElement('li');
      li.className = 'track-item';

      const img = document.createElement('img');
      img.src = track.thumbnail || '';
      img.alt = '';

      const meta = document.createElement('div');
      meta.className = 'track-meta';
      const title = document.createElement('div');
      title.className = 'track-title';
      title.textContent = track.track || track.title;
      const artist = document.createElement('div');
      artist.className = 'track-artist';
      artist.textContent = track.artist;
      meta.appendChild(title);
      meta.appendChild(artist);

      li.appendChild(img);
      li.appendChild(meta);

      if (showMatchTag && track.matched_on) {
        const tag = document.createElement('span');
        tag.className = 'track-tag';
        tag.textContent = track.matched_on;
        li.appendChild(tag);
      }

      li.addEventListener('click', () => playFromList(tracks, track));

      listEl.appendChild(li);
    });
  }

  /* ---------------- YouTube playback ---------------- */

  window.onYouTubeIframeAPIReady = function () {
    ytPlayer = new YT.Player('yt-player', {
      height: '50',
      width: '90',
      events: {
        onReady: () => { ytReady = true; },
        onStateChange: onPlayerStateChange,
      },
    });
  };

  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      playNext();
    }
    isPlaying = event.data === YT.PlayerState.PLAYING;
    updatePlayPauseIcon();
  }

  function playFromList(list, track) {
    playQueue = list;
    queueIndex = list.indexOf(track);
    playCurrent();
  }

  function playCurrent() {
    if (queueIndex < 0 || queueIndex >= playQueue.length) return;
    const track = playQueue[queueIndex];

    if (!ytReady) {
      alert('Player is still loading, try again in a moment.');
      return;
    }

    ytPlayer.loadVideoById(track.video_id);
    isPlaying = true;
    updatePlayPauseIcon();
    updateNowPlaying(track);
    highlightPlayingItem(track);
  }

  function playNext() {
    if (queueIndex + 1 < playQueue.length) {
      queueIndex += 1;
      playCurrent();
    }
  }

  function playPrev() {
    if (queueIndex - 1 >= 0) {
      queueIndex -= 1;
      playCurrent();
    }
  }

  function togglePlayPause() {
    if (!ytReady || queueIndex < 0) return;
    if (isPlaying) {
      ytPlayer.pauseVideo();
    } else {
      ytPlayer.playVideo();
    }
  }

  function updatePlayPauseIcon() {
    document.getElementById('play-pause-btn').textContent = isPlaying ? '⏸' : '▶';
  }

  function updateNowPlaying(track) {
    document.getElementById('now-playing-title').textContent = track.track || track.title;
    document.getElementById('now-playing-artist').textContent = track.artist;
    document.getElementById('now-playing-thumb').src = track.thumbnail || '';
  }

  function highlightPlayingItem(track) {
    document.querySelectorAll('.track-item').forEach((el) => el.classList.remove('playing'));
    document.querySelectorAll('.track-item').forEach((el) => {
      const titleEl = el.querySelector('.track-title');
      const artistEl = el.querySelector('.track-artist');
      if (titleEl && artistEl && titleEl.textContent === (track.track || track.title) && artistEl.textContent === track.artist) {
        el.classList.add('playing');
      }
    });
  }

  function initPlayerControls() {
    document.getElementById('play-pause-btn').addEventListener('click', togglePlayPause);
    document.getElementById('next-btn').addEventListener('click', playNext);
    document.getElementById('prev-btn').addEventListener('click', playPrev);
  }

  /* ---------------- Utilities ---------------- */

  function fetchJSON(url) {
    return fetch(url).then((res) => {
      if (!res.ok) {
        return res.json().catch(() => ({})).then((body) => {
          throw new Error(body.error || `Request failed (${res.status})`);
        });
      }
      return res.json();
    });
  }

  /* ---------------- Init ---------------- */

  document.addEventListener('DOMContentLoaded', () => {
    initProviderPicker();
    initMap();
    initTabs();
    initPlayerControls();
  });
})();
