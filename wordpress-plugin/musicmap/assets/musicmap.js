/* Generated from musicmap.html by tools/build_plugin.py. Edit musicmap.html, not this file. */
// ── Recent problems, kept in memory for "Report a problem" (never sent unless the visitor ticks it) ──
// Tokens, keys and sign-in codes are scrubbed before anything is kept.
window.mmLog=[];
(function(){
  const t0=Date.now();
  const scrub=s=>String(s==null?'':s)
    .replace(/(Bearer\s+)[A-Za-z0-9._~+\/-]+=*/gi,'$1…')
    .replace(/(\b(?:access_token|refresh_token|id_token|token|code|key|api_key|apikey|secret|password|state|code_verifier)["']?\s*[=:]\s*["']?)[^&#\s"',}]+/gi,'$1…')
    .replace(/[A-Za-z0-9_\-]{40,}/g,'…')
    .slice(0,300);
  const push=(level,args)=>{ try{
    const msg=Array.from(args).map(a=>a instanceof Error?(a.name+': '+a.message):typeof a==='object'?(()=>{ try{return JSON.stringify(a);}catch(e){return String(a);} })():String(a)).join(' ');
    window.mmLog.push({t:Math.round((Date.now()-t0)/1000), level, msg:scrub(msg)});
    if(window.mmLog.length>60) window.mmLog.shift();
  }catch(e){} };
  window.mmLogNote=(msg)=>push('note',[msg]);
  ['error','warn'].forEach(l=>{ const orig=console[l]; console[l]=function(){ push(l,arguments); return orig.apply(console,arguments); }; });
  window.addEventListener('error',e=>push('error',[(e.message||'Error')+(e.filename?' @'+String(e.filename).split('/').pop()+':'+e.lineno:'')]));
  window.addEventListener('unhandledrejection',e=>push('error',['Unhandled: '+(e.reason?.message||e.reason||'promise rejected')]));
})();

// ═══════════════════════════════════════════
// ICONS — inline SVG set for UI chrome (tabs/buttons).
// Emoji are reserved for pack + biome identity, not used here.
// ═══════════════════════════════════════════
const ICONS = {
  plus:       '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  x:          '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  check:      '<polyline points="20 6 9 17 4 12"/>',
  edit:       '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"/>',
  trash:      '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
  share:      '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="10.5" x2="15.4" y2="6.5"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/>',
  copy:       '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  clipboard:  '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3"/>',
  key:        '<circle cx="8" cy="16" r="4"/><line x1="10.5" y1="13.5" x2="20" y2="4"/><line x1="16.5" y1="7.5" x2="19" y2="10"/><line x1="13" y1="11" x2="15.5" y2="13.5"/>',
  bookmark:   '<path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z"/>',
  mapPin:     '<path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z"/><circle cx="12" cy="9" r="2.5"/>',
  crosshair:  '<circle cx="12" cy="12" r="8"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>',
  map:        '<polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>',
  compass:    '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  box:        '<path d="M21 8l-9-5-9 5 9 5 9-5Z"/><path d="M3 8v8l9 5 9-5V8"/><line x1="12" y1="13" x2="12" y2="21"/>',
  sliders:    '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
  monitor:    '<rect x="2" y="4" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="18" x2="12" y2="21"/>',
  extLink:    '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  bookOpen:   '<path d="M2 3h7a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2Z"/><path d="M22 3h-7a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h8Z"/>',
  alert:      '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  sparkles:   '<path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5Z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z"/>',
  chevronDn:  '<polyline points="6 9 12 15 18 9"/>',
  download:   '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
};
const ICONS_FILLED = {
  play:       '<polygon points="6 3 20 12 6 21 6 3"/>',
  pause:      '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
  skipBack:   '<polygon points="11 19 2 12 11 5 11 19"/><polygon points="22 19 13 12 22 5 22 19"/>',
  skipFwd:    '<polygon points="13 19 22 12 13 5 13 19"/><polygon points="2 19 11 12 2 5 2 19"/>',
};
function ic(name, size){
  const cls='ic '+(size||'ic-md');
  if(ICONS_FILLED[name]) return `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" stroke="none">${ICONS_FILLED[name]}</svg>`;
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]||''}</svg>`;
}
// Escape text before it goes into innerHTML — pack/location data can come from shared codes
function esc(s){
  return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ═══════════════════════════════════════════
// BUILT-IN PACKS
// ═══════════════════════════════════════════

const BUILTIN_PACKS = [
  {
    id: 'hoenn',
    name: 'Hoenn Pack',
    icon: '🌿',
    videoId: 'mz3pL7xNBbY',
    source: 'Pokémon Ruby & Sapphire',
    subtitle: '',
    builtin: true,
    tracks: [  // 92 tracks — fully verified from video description
      {title:'Opening Movie',start:0,dur:57},
      {title:'Title Screen: Main Theme',start:57,dur:106},
      {title:'Introductions',start:163,dur:107},
      {title:'Littleroot Town',start:270,dur:122},
      {title:'Birch Pokémon Lab',start:392,dur:72},
      {title:'May',start:464,dur:76},
      {title:'H-Help Me!',start:540,dur:27},
      {title:'Battle! (Wild Pokémon)',start:567,dur:105},
      {title:'Route 101',start:672,dur:83},
      {title:'Oldale Town',start:755,dur:95},
      {title:'Pokémon Center',start:850,dur:89},
      {title:'Trainers\' Eyes Meet (Youngster)',start:939,dur:39},
      {title:'Trainers\' Eyes Meet (Lass)',start:978,dur:35},
      {title:'Battle! (Trainer Battle)',start:1013,dur:173},
      {title:'Victory! (Trainer Battle)',start:1186,dur:38},
      {title:'Petalburg City',start:1224,dur:78},
      {title:'Hurry Along',start:1302,dur:64},
      {title:'Route 104',start:1366,dur:94},
      {title:'Petalburg Woods',start:1460,dur:94},
      {title:'Team Magma Appears!',start:1554,dur:55},
      {title:'Battle! (Team Aqua / Magma)',start:1609,dur:206},
      {title:'Victory! (Team Aqua / Magma)',start:1815,dur:30},
      {title:'Rustboro City',start:1845,dur:136},
      {title:'Trainers\' School',start:1981,dur:90},
      {title:'Crossing The Sea',start:2071,dur:69},
      {title:'Dewford Town',start:2140,dur:152},
      {title:'Trainers\' Eyes Meet (Tuber ♀)',start:2292,dur:41},
      {title:'Slateport City',start:2333,dur:188},
      {title:'Oceanic Museum',start:2521,dur:161},
      {title:'Route 110',start:2682,dur:88},
      {title:'Cycling',start:2770,dur:111},
      {title:'Game Corner',start:2881,dur:162},
      {title:'Verdanturf Town',start:3043,dur:109},
      {title:'Route 113',start:3152,dur:159},
      {title:'Twins',start:3311,dur:28},
      {title:'Fallarbor Town',start:3339,dur:126},
      {title:'Cable Car',start:3465,dur:18},
      {title:'Mt. Chimney',start:3483,dur:209},
      {title:'Trainers\' Eyes Meet (Hiker)',start:3692,dur:43},
      {title:'Route 111',start:3735,dur:98},
      {title:'Pokémon Gym',start:3833,dur:87},
      {title:'Battle! (Gym Leader)',start:3920,dur:163},
      {title:'Victory! (Gym Leader)',start:4083,dur:107},
      {title:'Surf',start:4190,dur:161},
      {title:'Route 119',start:4351,dur:156},
      {title:'Fortree City',start:4507,dur:77},
      {title:'Route 120',start:4584,dur:134},
      {title:'Interviewers',start:4718,dur:32},
      {title:'Safari Zone',start:4750,dur:56},
      {title:'Trainers\' Eyes Meet (Gentleman)',start:4806,dur:46},
      {title:'Lilycove City',start:4852,dur:140},
      {title:'Museum',start:4992,dur:206},
      {title:'Brendan',start:5198,dur:79},
      {title:'Battle! (Brendan / May)',start:5277,dur:135},
      {title:'Poké Mart',start:5412,dur:98},
      {title:'Mt. Pyre',start:5510,dur:122},
      {title:'Trainers\' Eyes Meet (Psychic)',start:5632,dur:35},
      {title:'Trainers\' Eyes Meet (Hex Maniac)',start:5667,dur:54},
      {title:'Mt. Pyre Exterior',start:5721,dur:169},
      {title:'Hideout',start:5890,dur:98},
      {title:'Team Aqua Appears!',start:5988,dur:71},
      {title:'Battle! (Archie / Maxie)',start:6059,dur:143},
      {title:'The Super-Ancient Pokémon Awaken!',start:6202,dur:17},
      {title:'Drought',start:6219,dur:69},
      {title:'Heavy Rain',start:6288,dur:75},
      {title:'Dive',start:6363,dur:184},
      {title:'Sootopolis City',start:6547,dur:127},
      {title:'Meteor Falls/Cave of Origin',start:6674,dur:110},
      {title:'Battle! (Super-Ancient Pokémon)',start:6784,dur:104},
      {title:'Trainers\' Eyes Meet (Swimmer)',start:6888,dur:30},
      {title:'Ever Grande City',start:6918,dur:155},
      {title:'Contest Lobby',start:7073,dur:76},
      {title:'Pokémon Contest!',start:7149,dur:98},
      {title:'Results Announcement',start:7247,dur:41},
      {title:'Contest Winner',start:7288,dur:37},
      {title:'Sealed Chamber',start:7325,dur:94},
      {title:'Battle! (Regirock/Regice/Registeel)',start:7419,dur:98},
      {title:'The Trick House',start:7517,dur:102},
      {title:'Abandoned Ship',start:7619,dur:95},
      {title:'Battle Tent',start:7714,dur:99},
      {title:'Victory Road',start:7813,dur:121},
      {title:'Trainers\' Eyes Meet (Cooltrainer)',start:7934,dur:70},
      {title:'The Elite Four Appear!',start:8004,dur:51},
      {title:'Battle! (Elite Four)',start:8055,dur:139},
      {title:'Champion Steven',start:8194,dur:70},
      {title:'Battle! (Champion)',start:8264,dur:142},
      {title:'Victory! (Elite Four)',start:8406,dur:80},
      {title:'The Room of Glory',start:8486,dur:83},
      {title:'The Hall of Fame',start:8569,dur:89},
      {title:'Credits',start:8658,dur:175},
      {title:'The End',start:8833,dur:220},
      {title:'Steven Stone',start:9053,dur:180},
    ],
    biomes: [
      {id:'beach',name:'Coastal Route',emoji:'🌊',cssClass:'biome-beach',keywords:['beach','coast','sea','bay','shore','harbor','surf','island','cove','marina','waterfront'],defaultTracks:[15,22,69,58]},
      {id:'city',name:'Urban City',emoji:'🏙️',cssClass:'biome-city',keywords:['city','downtown','urban','metro','avenue','street','plaza','district','midtown'],defaultTracks:[20,44,23,25]},
      {id:'forest',name:'Petalburg Woods',emoji:'🌲',cssClass:'biome-forest',keywords:['forest','woods','park','trail','nature','grove','jungle','botanical','garden','wilderness','hiking'],defaultTracks:[16,8,3,40]},
      {id:'mountain',name:'Mt. Chimney',emoji:'🌋',cssClass:'biome-mountain',keywords:['mountain','hill','summit','peak','cliff','canyon','valley','ridge','alpine','volcano','rocky'],defaultTracks:[33,59,71,49]},
      {id:'desert',name:'Route 111 Desert',emoji:'🏜️',cssClass:'biome-desert',keywords:['desert','sand','dune','arid','mesa','plateau','badlands','scrub','dry','nevada','arizona','mojave'],defaultTracks:[34,29,31]},
      {id:'town',name:'Verdanturf Town',emoji:'🏘️',cssClass:'biome-town',keywords:['suburb','town','village','neighborhood','residential','hamlet','township','borough','community','estate'],defaultTracks:[28,9,13,31]},
      {id:'ocean',name:'Open Ocean',emoji:'🐋',cssClass:'biome-ocean',keywords:['ocean','gulf','strait','channel','pacific','atlantic','lake','river'],defaultTracks:[38,57,61,39]},
      {id:'shopping',name:'Lilycove Dept.',emoji:'🛍️',cssClass:'biome-shopping',keywords:['mall','shopping','market','store','retail','plaza','center','outlet','commercial','arcade'],defaultTracks:[10,27,63,45]},
      {id:'port',name:'SS Tidal / Port',emoji:'⚓',cssClass:'biome-port',keywords:['port','dock','pier','wharf','terminal','shipyard','industrial','warehouse','harbor','freight','airport'],defaultTracks:[21,24,51,66]},
    ]
  },
  {
    id: 'kanto',
    name: 'Kanto Pack',
    icon: '🔴',
    videoId: '3Q0nQQIKESw',
    source: 'Pokémon Red & Blue',
    subtitle: '',
    builtin: true,
    tracks: [
      {title:'Opening',start:0,dur:118},
      {title:'Palette Town',start:118,dur:78},
      {title:'Professor Oak',start:196,dur:49},
      {title:'Oak Research Lab',start:245,dur:46},
      {title:'Rival Appears',start:291,dur:43},
      {title:'Route 1',start:334,dur:60},
      {title:'Battle! (Wild)',start:394,dur:90},
      {title:'Pewter City',start:521,dur:131},
      {title:'Pokémon Center',start:652,dur:74},
      {title:'Viridian Forest',start:734,dur:113},
      {title:'Battle! (Trainer)',start:910,dur:197},
      {title:'Mt. Moon',start:1138,dur:100},
      {title:'Cerulean City',start:1327,dur:77},
      {title:'Pokémon Gym',start:1404,dur:75},
      {title:'Route to Cerulean',start:1479,dur:52},
      {title:'Vermillion City',start:1542,dur:63},
      {title:'S.S. Anne',start:1605,dur:84},
      {title:'Route to Lavender',start:1689,dur:77},
      {title:'Battle! (Gym Leader)',start:1810,dur:120},
      {title:'Cycling',start:1987,dur:85},
      {title:'Lavender Town',start:2072,dur:109},
      {title:'Pokémon Tower',start:2181,dur:141},
      {title:'Celadon City',start:2322,dur:77},
      {title:'Casino',start:2399,dur:90},
      {title:'Team Rocket Hideout',start:2517,dur:149},
      {title:'Silph Co.',start:2666,dur:81},
      {title:'Ocean',start:2747,dur:91},
      {title:'Cinnabar Island',start:2838,dur:59},
      {title:'Pokémon Mansion',start:2897,dur:84},
      {title:'Final Road',start:3016,dur:75},
      {title:'Last Battle (Rival)',start:3091,dur:150},
      {title:'Ending',start:3305,dur:120},
    ],
    biomes: [
      {id:'beach',name:'Sea Route',emoji:'🌊',cssClass:'biome-beach',keywords:['beach','coast','sea','bay','shore','harbor','surf','island','cove','marina','waterfront'],defaultTracks:[26,27,16]},
      {id:'city',name:'Celadon City',emoji:'🏙️',cssClass:'biome-city',keywords:['city','downtown','urban','metro','avenue','street','plaza','district','midtown'],defaultTracks:[22,25,15]},
      {id:'forest',name:'Viridian Forest',emoji:'🌲',cssClass:'biome-forest',keywords:['forest','woods','park','trail','nature','grove','jungle','botanical','garden','wilderness','hiking'],defaultTracks:[9,5,14]},
      {id:'mountain',name:'Mt. Moon',emoji:'🌋',cssClass:'biome-mountain',keywords:['mountain','hill','summit','peak','cliff','canyon','valley','ridge','alpine','volcano','rocky'],defaultTracks:[11,21,30]},
      {id:'desert',name:'Safari Zone',emoji:'🏜️',cssClass:'biome-desert',keywords:['desert','sand','dune','arid','mesa','plateau','badlands','scrub','dry','nevada','arizona','mojave'],defaultTracks:[30,5,17]},
      {id:'town',name:'Palette Town',emoji:'🏘️',cssClass:'biome-town',keywords:['suburb','town','village','neighborhood','residential','hamlet','township','borough','community','estate'],defaultTracks:[1,8,2]},
      {id:'ocean',name:'Open Ocean',emoji:'🐋',cssClass:'biome-ocean',keywords:['ocean','gulf','strait','channel','pacific','atlantic','lake','river'],defaultTracks:[26,16,31]},
      {id:'shopping',name:'Celadon Dept.',emoji:'🛍️',cssClass:'biome-shopping',keywords:['mall','shopping','market','store','retail','plaza','center','outlet','commercial','arcade'],defaultTracks:[22,23,8]},
      {id:'port',name:'Vermillion Port',emoji:'⚓',cssClass:'biome-port',keywords:['port','dock','pier','wharf','terminal','shipyard','industrial','warehouse','harbor','freight','airport'],defaultTracks:[16,25,24]},
    ]
  },{
    id: 'smb3',
    name: 'Super Mario Bros. 3',
    icon: '🍄',
    videoId: 'dqN0iyQypjM',
    source: 'Super Mario Bros. 3 (NES)',
    subtitle: '',
    builtin: true,
    videos: [{id: 'dqN0iyQypjM', tracks: [
      {title:'World 1 Map',start:0,dur:52},
      {title:'Level Selected',start:52,dur:30},
      {title:'Overworld BGM',start:54,dur:165},
      {title:'Invincible BGM',start:219,dur:34},
      {title:'Miss',start:253,dur:30},
      {title:'World 2 Map',start:257,dur:35},
      {title:'Athletic BGM',start:292,dur:135},
      {title:'Course Clear Fanfare',start:427,dur:30},
      {title:'World 3 Map',start:431,dur:47},
      {title:'Underwater BGM',start:478,dur:115},
      {title:'Music Box',start:593,dur:42},
      {title:'Slot BGM / Nervous Breakdown',start:635,dur:28},
      {title:'World 4 Map',start:663,dur:47},
      {title:'Underground BGM',start:710,dur:85},
      {title:'World 5 Map',start:795,dur:43},
      {title:'World 5 Sky Map',start:838,dur:51},
      {title:'Enemy Battle',start:889,dur:104},
      {title:"Toad's House / P-Switch BGM",start:993,dur:34},
      {title:'World 6 Map',start:1027,dur:34},
      {title:'Fortress BGM',start:1061,dur:81},
      {title:'Fortress Boss',start:1142,dur:77},
      {title:'Fireworks Fanfare',start:1219,dur:30},
      {title:'Whistle Sound ~ Warp Island',start:1224,dur:45},
      {title:'World 7 Map',start:1269,dur:41},
      {title:"King's Room",start:1310,dur:38},
      {title:'Airship BGM',start:1348,dur:98},
      {title:'Princess Kidnapped!',start:1446,dur:30},
      {title:'World 8 Map',start:1448,dur:42},
      {title:'King Koopa',start:1490,dur:70},
      {title:'Koopa Defeated',start:1560,dur:30},
      {title:'World Clear Fanfare',start:1563,dur:30},
      {title:'Ending',start:1571,dur:199},
      {title:'Game Over',start:1770,dur:30},
      {title:'Overworld BGM (Hurry!)',start:1776,dur:97},
      {title:'Athletic BGM (Hurry!)',start:1873,dur:88},
      {title:'Underwater BGM (Hurry!)',start:1961,dur:61},
      {title:'Underground BGM (Hurry!)',start:2022,dur:59},
      {title:'Invincible BGM (Hurry!)',start:2081,dur:30},
      {title:'P-Switch BGM (Hurry!)',start:2102,dur:32},
      {title:'Enemy Battle BGM (Hurry!)',start:2134,dur:77},
      {title:'Fortress BGM (Hurry!)',start:2211,dur:42},
      {title:'Airship BGM (Hurry!)',start:2253,dur:64},
      {title:'Fortress Boss (Hurry!)',start:2317,dur:56},
      {title:'King Koopa (Hurry!)',start:2373,dur:48},
      {title:'SMB3 Medley',start:2421,dur:180},
    ]}],
    tracks: [], // legacy compat — populated below
    biomes: [
      {id:'beach',   name:'Beach',emoji:'🌿',cssClass:'biome-beach',
       keywords:['beach','coast','sea','bay','shore','harbor','surf','island','cove','marina','waterfront'],
       defaultTracks:[2,6,14,15]},   // Overworld BGM, Athletic BGM, World 5 Map, Sky Map
      {id:'city',    name:'City',emoji:'🗺️',cssClass:'biome-city',
       keywords:['city','downtown','urban','metro','avenue','street','plaza','district','midtown'],
       defaultTracks:[0,5,12,23]},   // World 1 Map, World 2 Map, World 4 Map, World 7 Map
      {id:'forest',  name:'Forest',emoji:'🌲',cssClass:'biome-forest',
       keywords:['forest','woods','park','trail','nature','grove','jungle','botanical','garden','wilderness','hiking'],
       defaultTracks:[6,15,2,34]},   // Athletic BGM, Sky Map, Overworld, Overworld Hurry
      {id:'mountain',name:'Mountain',emoji:'🏰',cssClass:'biome-mountain',
       keywords:['mountain','hill','summit','peak','cliff','canyon','valley','ridge','alpine','volcano','rocky'],
       defaultTracks:[19,20,28,27]}, // Fortress BGM, Fortress Boss, King Koopa, World 8 Map
      {id:'desert',  name:'Desert',emoji:'🏜️',cssClass:'biome-desert',
       keywords:['desert','sand','dune','arid','mesa','plateau','badlands','scrub','dry','nevada','arizona','mojave'],
       defaultTracks:[13,36,37,11]}, // Underground BGM, Underground Hurry, Slot BGM, World 4 Map -- cave vibes
      {id:'town',    name:'Town',emoji:'🏘️',cssClass:'biome-town',
       keywords:['suburb','town','village','neighborhood','residential','hamlet','township','borough','community','estate'],
       defaultTracks:[0,8,17,22]},   // World 1 Map, World 3 Map, Toad House, Warp Island
      {id:'ocean',   name:'Ocean',emoji:'🐋',cssClass:'biome-ocean',
       keywords:['ocean','gulf','strait','channel','pacific','atlantic','lake','river'],
       defaultTracks:[9,10,35,31]},  // Underwater BGM, Music Box, Underwater Hurry, Ending
      {id:'shopping',name:'Shopping',emoji:'🛍️',cssClass:'biome-shopping',
       keywords:['mall','shopping','market','store','retail','plaza','center','outlet','commercial','arcade'],
       defaultTracks:[17,1,10,21]},  // Toad House, Level Selected, Music Box, Fireworks
      {id:'port',    name:'Port',emoji:'✈️',cssClass:'biome-port',
       keywords:['port','dock','pier','wharf','terminal','shipyard','industrial','warehouse','harbor','freight','airport'],
       defaultTracks:[25,42,16,40]}, // Airship BGM, Airship Hurry, Enemy Battle, Enemy Hurry
    ]
  }
  ,{
    id: 'halo_reach',
    name: 'Halo Reach',
    icon: '🪖',
    videoId: '53_CUSmf8fQ',
    source: 'Halo Reach OST',
    subtitle: "Martin O'Donnell / Bungie",
    builtin: true,
    videos: [{id: '53_CUSmf8fQ', tracks: [
      {title:'Overture',start:0,dur:287},
      {title:'Winter Contingency',start:287,dur:300},
      {title:'ONI: Sword Base',start:1016,dur:300},
      {title:'Nightfall',start:1525,dur:300},
      {title:'Tip Of The Spear',start:1866,dur:300},
      {title:'Long Night Of Solace',start:2232,dur:300},
      {title:'Exodus',start:2939,dur:300},
      {title:'New Alexandria',start:3378,dur:300},
      {title:'The Package',start:3901,dur:300},
      {title:'The Pillar Of Autumn',start:4317,dur:300},
      {title:'Epilogue',start:4898,dur:270},
      {title:'From The Vault',start:5168,dur:299},
      {title:'Ashes',start:5467,dur:166},
      {title:'Fortress',start:5633,dur:68},
      {title:"We're Not Going Anywhere",start:5701,dur:74},
      {title:'At Any Cost',start:5775,dur:151},
      {title:'Both Ways (Remix)',start:5926,dur:137},
      {title:'Walking Away',start:6063,dur:113},
      {title:'Ghosts And Glass',start:6176,dur:162},
      {title:'We Remember',start:6338,dur:180},
    ]}],
    tracks: [],
    biomes: [
      {id:'beach',   name:'Beach',emoji:'🌙',cssClass:'biome-beach',
       keywords:['beach','coast','sea','bay','shore','harbor','surf','island','cove','marina','waterfront'],
       defaultTracks:[3,17,18,19]},
      {id:'city',    name:'City',emoji:'🏙️',cssClass:'biome-city',
       keywords:['city','downtown','urban','metro','avenue','street','plaza','district','midtown'],
       defaultTracks:[7,6,15,16]},
      {id:'forest',  name:'Forest',emoji:'❄️',cssClass:'biome-forest',
       keywords:['forest','woods','park','trail','nature','grove','jungle','botanical','garden','wilderness','hiking'],
       defaultTracks:[1,3,11,17]},
      {id:'mountain',name:'Mountain',emoji:'🌋',cssClass:'biome-mountain',
       keywords:['mountain','hill','summit','peak','cliff','canyon','valley','ridge','alpine','volcano','rocky'],
       defaultTracks:[4,5,8,13]},
      {id:'desert',  name:'Desert',emoji:'🏜️',cssClass:'biome-desert',
       keywords:['desert','sand','dune','arid','mesa','plateau','badlands','scrub','dry','nevada','arizona','mojave'],
       defaultTracks:[2,13,15,14]},
      {id:'town',    name:'Town',emoji:'🏘️',cssClass:'biome-town',
       keywords:['suburb','town','village','neighborhood','residential','hamlet','township','borough','community','estate'],
       defaultTracks:[10,11,12,19]},
      {id:'ocean',   name:'Ocean',emoji:'🌊',cssClass:'biome-ocean',
       keywords:['ocean','gulf','strait','channel','pacific','atlantic','lake','river'],
       defaultTracks:[0,10,18,19]},
      {id:'shopping',name:'Shopping',emoji:'🛍️',cssClass:'biome-shopping',
       keywords:['mall','shopping','market','store','retail','plaza','center','outlet','commercial','arcade'],
       defaultTracks:[7,6,4,2]},
      {id:'port',    name:'Port',emoji:'⚓',cssClass:'biome-port',
       keywords:['port','dock','pier','wharf','terminal','shipyard','industrial','warehouse','harbor','freight','airport'],
       defaultTracks:[9,5,4,8]},
    ]
  }
  ,{
    id: 'terraria',
    name: 'Terraria',
    icon: '⛏️',
    videoId: 'C0seWTv_MS8',
    source: 'Terraria OST',
    subtitle: 'Scott Lloyd Shelly & Re-Logic',
    builtin: true,
    videos: [{id: 'C0seWTv_MS8', tracks: [
      {title:'Title (Console)',start:0,dur:96},
      {title:'Overworld Day',start:96,dur:137},
      {title:'Eerie',start:233,dur:161},
      {title:'Overworld Night',start:394,dur:121},
      {title:'Title Screen',start:515,dur:78},
      {title:'Underground',start:593,dur:179},
      {title:'Boss 1',start:772,dur:137},
      {title:'Jungle',start:909,dur:164},
      {title:'Corruption',start:1073,dur:155},
      {title:'Underground Corruption',start:1228,dur:143},
      {title:'The Hallow',start:1371,dur:127},
      {title:'Boss 2',start:1498,dur:120},
      {title:'Underground Hallow',start:1618,dur:174},
      {title:'Boss 3',start:1792,dur:110},
      {title:'Tutorial (Console)',start:1902,dur:60},
      {title:'Ocean (Console)',start:1962,dur:92},
      {title:'Ocean',start:2054,dur:89},
      {title:'Eclipse',start:2143,dur:97},
      {title:'Rain',start:2240,dur:96},
      {title:'Alternate Day',start:2336,dur:101},
      {title:'Space',start:2437,dur:96},
      {title:'Golem',start:2533,dur:88},
      {title:'Mushrooms',start:2621,dur:76},
      {title:'Crimson',start:2697,dur:128},
      {title:'Lihzahrd',start:2825,dur:97},
      {title:'Ice',start:2922,dur:95},
      {title:'Plantera',start:3017,dur:77},
      {title:'Dungeon',start:3094,dur:100},
      {title:'Lunar Boss',start:3194,dur:87},
      {title:'Space (Console)',start:3281,dur:84},
      {title:'Alternate Underground',start:3365,dur:72},
      {title:'Underground Crimson',start:3437,dur:161},
      {title:'Goblin Army',start:3598,dur:106},
      {title:'Underworld',start:3704,dur:130},
      {title:'Pirate Invasion',start:3834,dur:111},
      {title:'Pumpkin Moon',start:3945,dur:86},
      {title:'Frost Moon',start:4031,dur:69},
      {title:'Martian Madness',start:4100,dur:101},
      {title:'Lunar Towers',start:4201,dur:87},
      {title:'Moon Lord',start:4288,dur:113},
      {title:'The Journey Begins',start:4401,dur:84},
      {title:'Underground Ice',start:4485,dur:84},
      {title:'Space Day',start:4569,dur:84},
      {title:'Empress of Light',start:4653,dur:168},
      {title:'Queen Slime',start:4821,dur:90},
      {title:'Slime Rain',start:4911,dur:83},
      {title:'Desert',start:4994,dur:90},
      {title:'Underground Desert',start:5084,dur:121},
      {title:'Sandstorm',start:5205,dur:99},
      {title:"Old One's Army",start:5304,dur:142},
      {title:'Underground Jungle',start:5446,dur:109},
      {title:'Jungle Night',start:5555,dur:96},
      {title:'Queen Bee',start:5651,dur:87},
      {title:'Graveyard',start:5738,dur:117},
      {title:'Town Day',start:5855,dur:127},
      {title:'High Wind',start:5982,dur:80},
      {title:'Storm',start:6062,dur:96},
      {title:'Duke Fishron',start:6158,dur:102},
      {title:'Morning Rain',start:6260,dur:61},
      {title:'Ocean Night',start:6321,dur:92},
      {title:'Town Night',start:6413,dur:117},
      {title:'Alt Title',start:6530,dur:96},
      {title:"Journey's End - Credits",start:6626,dur:132},
      {title:'Terraria Day Theme Remix',start:6758,dur:212},
      {title:'Prelude',start:6970,dur:97},
      {title:'Every Adventure Has A Beginning',start:7067,dur:155},
      {title:'Night Falls Darkness Emerges',start:7222,dur:191},
      {title:'Below the Surface',start:7413,dur:188},
      {title:'Secret of the Sands',start:7601,dur:215},
      {title:'Glimmers Of Vibrance',start:7816,dur:186},
      {title:'Enchanted Blue',start:8002,dur:168},
      {title:'Sky Guardian',start:8170,dur:195},
      {title:'The Endless Void',start:8365,dur:230},
      {title:'Celestial Caverns',start:8595,dur:185},
      {title:'Journey to the Core',start:8780,dur:136},
      {title:'Ancient Citadel',start:8916,dur:195},
      {title:'Shadows Of Corruption',start:9111,dur:196},
      {title:'Decay And Corrosion',start:9307,dur:191},
      {title:'Behold the OctoEye',start:9498,dur:178},
      {title:'Blood Crawlers',start:9676,dur:141},
      {title:'Crimson Chasm',start:9817,dur:181},
      {title:'Fighting Off The Invasion',start:9998,dur:164},
      {title:'Twisted Virtue',start:10162,dur:185},
      {title:'A Sweet Menace',start:10347,dur:176},
      {title:'Rage Of Tarunnk',start:10523,dur:139},
      {title:'Enter Darkness',start:10662,dur:157},
      {title:'Fighting the Night',start:10819,dur:181},
      {title:'Sinkholes of Darkness',start:11000,dur:165},
      {title:'Consumed by Darkness',start:11165,dur:171},
      {title:'Postlude - Credits',start:11336,dur:180},
    ]}],
    tracks: [],
    biomes: [
      {id:'beach',   name:'Beach',    emoji:'🌊',cssClass:'biome-beach',
       keywords:['beach','coast','sea','bay','shore','harbor','surf','island','cove','marina','waterfront'],
       defaultTracks:[16,15,58,59]},
      {id:'city',    name:'City',     emoji:'🏙️',cssClass:'biome-city',
       keywords:['city','downtown','urban','metro','avenue','street','plaza','district','midtown'],
       defaultTracks:[54,60,1,19]},
      {id:'forest',  name:'Forest',   emoji:'🌲',cssClass:'biome-forest',
       keywords:['forest','woods','park','trail','nature','grove','jungle','botanical','garden','wilderness','hiking'],
       defaultTracks:[7,1,26,50]},
      {id:'mountain',name:'Mountain', emoji:'🌋',cssClass:'biome-mountain',
       keywords:['mountain','hill','summit','peak','cliff','canyon','valley','ridge','alpine','volcano','rocky'],
       defaultTracks:[5,41,67,73]},
      {id:'desert',  name:'Desert',   emoji:'🏜️',cssClass:'biome-desert',
       keywords:['desert','sand','dune','arid','mesa','plateau','badlands','scrub','dry','nevada','arizona','mojave'],
       defaultTracks:[46,48,68,47]},
      {id:'town',    name:'Town',     emoji:'🏘️',cssClass:'biome-town',
       keywords:['suburb','town','village','neighborhood','residential','hamlet','township','borough','community','estate'],
       defaultTracks:[54,60,40,65]},
      {id:'ocean',   name:'Ocean',    emoji:'🐋',cssClass:'biome-ocean',
       keywords:['ocean','gulf','strait','channel','pacific','atlantic','lake','river'],
       defaultTracks:[16,59,57,18]},
      {id:'shopping',name:'Shopping', emoji:'🛍️',cssClass:'biome-shopping',
       keywords:['mall','shopping','market','store','retail','plaza','center','outlet','commercial','arcade'],
       defaultTracks:[54,14,22,45]},
      {id:'port',    name:'Port',     emoji:'⚓',cssClass:'biome-port',
       keywords:['port','dock','pier','wharf','terminal','shipyard','industrial','warehouse','harbor','freight','airport'],
       defaultTracks:[34,57,16,56]},
    ]
  }
  ,{
    id: 'pachipatch',
    name: 'PachiPatch',
    icon: '🎧',
    source: 'Spotify playlist',
    subtitle: 'Jongle · Spotify',
    builtin: true,
    spotifyPlaylistId: "4PNjwi5dDxHNB4udHTvzq5",
    // Spotify-only: plays through the Spotify Web Playback SDK (Premium). 474 songs;
    // 33 not yet placed in a biome or preset place, for Jongle to assign in the app.
    tracks: [
      {title:"Growing Up — Bronze Whale",start:0,dur:199,spotifyUri:"spotify:track:2wCd938Oz5t957hi71eQ4Z",videoId:null},
      {title:"Cities — Throttle",start:0,dur:180,spotifyUri:"spotify:track:6t67COokESOCeqHkMNroSu",videoId:null},
      {title:"Universe — Egzod, Tanjent",start:0,dur:205,spotifyUri:"spotify:track:0Oy0OpBIOcW5n9uPeLEH9X",videoId:null},
      {title:"BUBBLES — Tokyo Machine",start:0,dur:231,spotifyUri:"spotify:track:7hFZu37rmQxzAp0M1NqJ7P",videoId:null},
      {title:"We Wept — Bereft",start:0,dur:778,spotifyUri:"spotify:track:1PXPvnG6wREVelO000qz1M",videoId:null},
      {title:"Painting (Masterpiece) — Lewis Del Mar",start:0,dur:243,spotifyUri:"spotify:track:4kK14radw0XfwxJDPt9tnP",videoId:null},
      {title:"Dreamcatcher — Robotaki, Koko Love",start:0,dur:201,spotifyUri:"spotify:track:1kVX2EWEkkkBQFSm2HNwj3",videoId:null},
      {title:"Give Me Everything (feat. Nayer) — Pitbull, AFROJACK, Ne-Yo, Nayer",start:0,dur:252,spotifyUri:"spotify:track:4QNpBfC0zvjKqPJcyqBy9W",videoId:null},
      {title:"Home — Tom Misch",start:0,dur:268,spotifyUri:"spotify:track:4LPraPfByX8L6YuqmJ4DJX",videoId:null},
      {title:"Zombie — Bad Wolves",start:0,dur:255,spotifyUri:"spotify:track:1vNoA9F5ASnlBISFekDmg3",videoId:null},
      {title:"Make Your Move - TWO LANES Remix — Running Touch, TWO LANES",start:0,dur:248,spotifyUri:"spotify:track:6CA8KygDswsNQhW0WPRiTh",videoId:null},
      {title:"Miss Your Mind — Big Words",start:0,dur:193,spotifyUri:"spotify:track:7npd2ILfxPQq3uOrHisuo7",videoId:null},
      {title:"Can You Feel My Heart — Varien, Andrew Zink",start:0,dur:232,spotifyUri:"spotify:track:4cuBQhxCjoXW9EX2UqeQwo",videoId:null},
      {title:"Tonight (I Wish I Was Your Boy) — The 1975",start:0,dur:247,spotifyUri:"spotify:track:7DmTaJoM7L020qm3egqNsM",videoId:null},
      {title:"Feel That Way — ellis",start:0,dur:184,spotifyUri:"spotify:track:1qMak6TgZIdfcCzuGIAZyU",videoId:null},
      {title:"Walls — Overnight Oats, DOMENICO, Disco Fries",start:0,dur:218,spotifyUri:"spotify:track:5WzGjAPRx4LivIbASosoiO",videoId:null},
      {title:"You & I — REAL DAZE",start:0,dur:252,spotifyUri:"spotify:track:6XZDwbaqOiTHLBnch5ac5A",videoId:null},
      {title:"Now That We've Been in Love — Robotaki, Pell",start:0,dur:198,spotifyUri:"spotify:track:34iAzuabEBt2RT31v7g5sU",videoId:null},
      {title:"Give You Up - Darius Remix — Crayon, KLP, Darius",start:0,dur:325,spotifyUri:"spotify:track:232HDN1OQ12Pdw4qb9wzKu",videoId:null},
      {title:"Ascend — TheDooo",start:0,dur:180,spotifyUri:"spotify:track:4a4UrMYz1oLrdF1CzLcsGZ",videoId:null},
      {title:"Sewers — Lewis Del Mar",start:0,dur:289,spotifyUri:"spotify:track:4K5m5bjXjWy7O3zElyW0wT",videoId:null},
      {title:"So Long, And Thanks For All The Fish — A Perfect Circle",start:0,dur:266,spotifyUri:"spotify:track:4R5kwDx0ryIMiK2PKqbNVY",videoId:null},
      {title:"Lights Up — Harry Styles",start:0,dur:172,spotifyUri:"spotify:track:4jAIqgrPjKLTY9Gbez25Qb",videoId:null},
      {title:"Mark Twain — Half an Orange",start:0,dur:169,spotifyUri:"spotify:track:6tVUYXoARGbnPVegcWsIEt",videoId:null},
      {title:"Celebrate — The HamilTones",start:0,dur:235,spotifyUri:"spotify:track:2aiGoTb7zVtfNpkI93LDDC",videoId:null},
      {title:"Bang! — AJR",start:0,dur:171,spotifyUri:"spotify:track:53BHUFdQphHiZUUG3nx9zn",videoId:null},
      {title:"‎sleepyhead — Knapsack",start:0,dur:172,spotifyUri:"spotify:track:1AL0YfYo06L9c2vZaFBBfO",videoId:null},
      {title:"5am — Joey Pecoraro",start:0,dur:143,spotifyUri:"spotify:track:0HfNi5c7Zt3UAkTo5ilwKV",videoId:null},
      {title:"as long as you care — Ruel",start:0,dur:193,spotifyUri:"spotify:track:0GQqQ7dA7B4mcEktSZaOUp",videoId:null},
      {title:"Take Over — League of Legends, MAX, Jeremy McKinnon of A Day To Remember, HENRY LAU",start:0,dur:214,spotifyUri:"spotify:track:7asFSf2pkWNEG3E5EuN1QR",videoId:null},
      {title:"overwhelmed — Royal & the Serpent",start:0,dur:159,spotifyUri:"spotify:track:5jjZikDrEd0by1o7V3fO4y",videoId:null},
      {title:"Revolving (feat. Marc E. Bassy) — Yung Bae, Marc E. Bassy",start:0,dur:176,spotifyUri:"spotify:track:2bo4n2JP6aPLAvEO1Yie1B",videoId:null},
      {title:"Guilty Pleasures — Wake the Wild",start:0,dur:258,spotifyUri:"spotify:track:42Bax5tepDSjA1pDu8Mpn1",videoId:null},
      {title:"After Hours — Uppermost",start:0,dur:219,spotifyUri:"spotify:track:5DnzlmWkmsRoTByghUtj6b",videoId:null},
      {title:"Flesh and Blood — Franc Moody",start:0,dur:239,spotifyUri:"spotify:track:3ApDLA7FGUlDc7rNM4bzkb",videoId:null},
      {title:"Harmony — The Avalanches",start:0,dur:229,spotifyUri:"spotify:track:5v1YfIEGXWfNPTGhCCW80h",videoId:null},
      {title:"Flamethrower — Brock Berrigan",start:0,dur:116,spotifyUri:"spotify:track:6Jgr1ixJmoFJG5tcdhJLdv",videoId:null},
      {title:"The Phoenix — Fall Out Boy",start:0,dur:245,spotifyUri:"spotify:track:7jwDuO7UZvWs77KNj9HbvF",videoId:null},
      {title:"Eye of the Storm — GHOST DATA, Skye Light",start:0,dur:384,spotifyUri:"spotify:track:52hjCtXYUmWzenheYbeCJr",videoId:null},
      {title:"MIA - Robotaki Remix — RAC, Robotaki, Danny Dwyer",start:0,dur:240,spotifyUri:"spotify:track:6pGeWf3SxSkpX8ZcvcbtYC",videoId:null},
      {title:"Bodies - Tycho Remix — The Knocks, MUNA, Tycho",start:0,dur:290,spotifyUri:"spotify:track:4MGqoguZVEOACg9g9Q3I94",videoId:null},
      {title:"better off alone — Besphrenz",start:0,dur:198,spotifyUri:"spotify:track:41C5pt0dZL4YxjjbChlrGV",videoId:null},
      {title:"Honeybody - Mattsoro Remix — Kishi Bashi, Mattsoro",start:0,dur:192,spotifyUri:"spotify:track:3VgdLvs5lb7anIjH92uA08",videoId:null},
      {title:"Tasty Jam — Engelwood",start:0,dur:130,spotifyUri:"spotify:track:6smHuWvMAMQfVO855qtTDw",videoId:null},
      {title:"Donuts (feat. Yung Bae) — kenzie, Yung Bae",start:0,dur:216,spotifyUri:"spotify:track:2xubfBD4QUOmcMUq1EZz6h",videoId:null},
      {title:"Going Home — The Avalanches",start:0,dur:127,spotifyUri:"spotify:track:2RTwPzWk8u31Z7ruZmXe2A",videoId:null},
      {title:"Questions — Tristam",start:0,dur:250,spotifyUri:"spotify:track:6wv7nGvhdFLZD4XmFEt33C",videoId:null},
      {title:"Chicken Tenders — Dominic Fike",start:0,dur:170,spotifyUri:"spotify:track:3D8sT8D3f5egWSQnF0fbqu",videoId:null},
      {title:"religion (u can lay your hands on me) — Shura",start:0,dur:247,spotifyUri:"spotify:track:3sPpFnxfeb2grY6cH9JYk9",videoId:null},
      {title:"Rainbows — Yung Bae",start:0,dur:169,spotifyUri:"spotify:track:6QIAe4bx7ccUbvbiixaj7I",videoId:null},
      {title:"Bob Ross Goes to Hollywood — Birocratic",start:0,dur:190,spotifyUri:"spotify:track:4vYcORoPBqumJgue4Zlivj",videoId:null},
      {title:"Grounded — KOAN Sound, Javeon",start:0,dur:252,spotifyUri:"spotify:track:3iqevy6L0Pt3kPu8MOoJ6w",videoId:null},
      {title:"Break Loose — Televisor, SPLITBREED",start:0,dur:219,spotifyUri:"spotify:track:40vxyMiqiIpiRmHqQkdQj2",videoId:null},
      {title:"Staying In Bed Too Late (feat. Jimi Somewhere) — Internet Girl, Jimi Somewhere",start:0,dur:206,spotifyUri:"spotify:track:59IgXH4eku2CIqRDinAGGJ",videoId:null},
      {title:"I'LL SHOW YOU — K/DA, TWICE, Bekuh Boom, Annika Wells, League of Legends",start:0,dur:199,spotifyUri:"spotify:track:6LDIVpVNBRy7LCw7jIdci6",videoId:null},
      {title:"RISE — League of Legends, Mako, The Word Alive, The Glitch Mob",start:0,dur:193,spotifyUri:"spotify:track:69Sy7207dnixZ6w7RSV9Kb",videoId:null},
      {title:"The Diner — Kaskade, Sara Diamond",start:0,dur:178,spotifyUri:"spotify:track:69ElIV7RAxE7AfuqsDnkBf",videoId:null},
      {title:"Hanako's Shoujo Manga Spinoff! — Sithu Aye",start:0,dur:302,spotifyUri:"spotify:track:2vW4btjMZQVP2LMMNxsegT",videoId:null},
      {title:"ANGEL VOICES — Virtual Self",start:0,dur:392,spotifyUri:"spotify:track:69urju2iS7zKGTxNVLYt5D",videoId:null},
      {title:"Cipher — LEMMiNO",start:0,dur:195,spotifyUri:"spotify:track:1ov4hZO5md2qGjtEIUCTK0",videoId:null},
      {title:"Disco Man — Remi Wolf",start:0,dur:192,spotifyUri:"spotify:track:0T7aTl1t15HKHfwep4nANV",videoId:null},
      {title:"scorton's creek - re-imagined by filous — Isaac Dunbar, filous",start:0,dur:180,spotifyUri:"spotify:track:5uSwYU4V1hFDZYEHF87RmK",videoId:null},
      {title:"Free - Remix — Cam Stacey, TYGKO, VALENTINE, Laxcity",start:0,dur:260,spotifyUri:"spotify:track:7HwfJTRtKQuKKMXaRjOSjC",videoId:null},
      {title:"Daze — Frank Ivy",start:0,dur:220,spotifyUri:"spotify:track:0vF4Td3zBHXAjRkjirNIqh",videoId:null},
      {title:"Love Is Real — Moods",start:0,dur:202,spotifyUri:"spotify:track:4UvGBQU3zPO5IcagzHDIxS",videoId:null},
      {title:"Pretty Cvnt — Sewerslvt",start:0,dur:221,spotifyUri:"spotify:track:0hz0bTQC2VVb4CEjLxmKiH",videoId:null},
      {title:"Don't Be — Godspeed",start:0,dur:239,spotifyUri:"spotify:track:4XMviR8kezcZICyys1YKJo",videoId:null},
      {title:"Moonlight in my Bedroom — nodisco.",start:0,dur:212,spotifyUri:"spotify:track:0uzagSru8XWeSjuwWkxlCc",videoId:null},
      {title:"Facing the Sea — DROELOE, Sem",start:0,dur:231,spotifyUri:"spotify:track:2eKV5ctkPkHOol3u2j4HLy",videoId:null},
      {title:"Foreground — Adam Tell",start:0,dur:228,spotifyUri:"spotify:track:06rbzZo4uFR0Ddz6aPYLMI",videoId:null},
      {title:"Good 4 Me — Vindata",start:0,dur:205,spotifyUri:"spotify:track:5dkTQlAVdA49mAXQSS5P9t",videoId:null},
      {title:"Just Groove — Kill Paris",start:0,dur:190,spotifyUri:"spotify:track:0Gqrn1coTb9abAiwMmiWra",videoId:null},
      {title:"Hydrogenuine — USS (Ubiquitous Synergy Seeker)",start:0,dur:235,spotifyUri:"spotify:track:7xJuyFNwolBuhf6g6hSgzG",videoId:null},
      {title:"You — Regard, Troye Sivan, Tate McRae",start:0,dur:233,spotifyUri:"spotify:track:2cc8Sw1OnCuA5bV8nqWqpE",videoId:null},
      {title:"Alive feat. Lara Woolf - Original Mix — Case & Point, Lara Woolf",start:0,dur:338,spotifyUri:"spotify:track:1Btdt8tgW5QatxnKlbaCk5",videoId:null},
      {title:"waves - Tame Impala Remix — Miguel, Tame Impala",start:0,dur:253,spotifyUri:"spotify:track:3lB0GMiI5KxDbTOG8V3bOx",videoId:null},
      {title:"ʅ͡͡͡͡͡͡͡͡͡͡͡(ƟӨ)ʃ͡͡͡͡͡͡͡͡͡͡ ꐑ(ཀ ඊູ ఠీੂ೧ູ࿃ूੂ✧✧✧✧✧✧ළඕั࿃ूੂ࿃ूੂ — ⣎⡇ꉺლ༽இ•̛)ྀ◞ ༎ຶ ༽ৣৢ؞ৢ؞ؖ ꉺლ",start:0,dur:279,spotifyUri:"spotify:track:2SJo1P387WJHJx1uFbyrRj",videoId:null},
      {title:"Fora — Southern Shores",start:0,dur:232,spotifyUri:"spotify:track:2StKHkAF6pvefAI3S61Alm",videoId:null},
      {title:"Secret Lover — Satin Jackets, Jon Paul",start:0,dur:168,spotifyUri:"spotify:track:0wB0ikhn5PQh3P4TZxA0ix",videoId:null},
      {title:"Mountain — Cult of Flesh",start:0,dur:595,spotifyUri:"spotify:track:30wGSs2mYmJCxFw092hIEy",videoId:null},
      {title:"Valkyrie III: Atonement — Varien, Laura Brehm",start:0,dur:350,spotifyUri:"spotify:track:5WZoxaz9arcXk41N3I7qlL",videoId:null},
      {title:"Xenogenesis — TheFatRat",start:0,dur:233,spotifyUri:"spotify:track:5iRVNYbhfWNO2VzBykX7GS",videoId:null},
      {title:"Space Makes Me Sad — Fiji Blue",start:0,dur:136,spotifyUri:"spotify:track:4CdAmV6qgACPWHxjCrf7fp",videoId:null},
      {title:"Young & Alive - Bazzi vs. Haywyre Remix — Bazzi vs., Haywyre",start:0,dur:168,spotifyUri:"spotify:track:3x7FcYzHsZs3tCmnj52ZHy",videoId:null},
      {title:"Rock You — Dirty Loops",start:0,dur:273,spotifyUri:"spotify:track:7uhNZLztCq43f0X47zBKkn",videoId:null},
      {title:"New World — KIRA",start:0,dur:219,spotifyUri:"spotify:track:2xrPfFf1jKgWRGLmB4nQbD",videoId:null},
      {title:"Я Не Коммунист — Molchat Doma",start:0,dur:193,spotifyUri:"spotify:track:5z7q66tSLgt23wPtCm5z3x",videoId:null},
      {title:"Дома Молчат — Molchat Doma",start:0,dur:177,spotifyUri:"spotify:track:0aR5pCYZiKgkZxoCAcBjiR",videoId:null},
      {title:"Ready or Not (feat. Terror Jr & umru) — MELVV, Terror Jr, umru",start:0,dur:217,spotifyUri:"spotify:track:1olOdYUVdYxskIUStWzseQ",videoId:null},
      {title:"Bitter End — Young & Sick",start:0,dur:218,spotifyUri:"spotify:track:4H7idM1mgHoCInZ91Adbj3",videoId:null},
      {title:"Seven Nation Army - The Glitch Mob Remix — The White Stripes, The Glitch Mob",start:0,dur:257,spotifyUri:"spotify:track:4IiuExPFijOGZnVxGsKWcc",videoId:null},
      {title:"Don't Think So Hard — On Planets",start:0,dur:216,spotifyUri:"spotify:track:3hWnEM3FbJHGvOBo3aRcKM",videoId:null},
      {title:"Elixir — Matt Chibbs",start:0,dur:183,spotifyUri:"spotify:track:1hiZ4zgIWct1TWOXELXDZQ",videoId:null},
      {title:"Hold On — Diamond Eyes",start:0,dur:237,spotifyUri:"spotify:track:5GWAhJPWrvfeva6BroUw34",videoId:null},
      {title:"Centuries — Fall Out Boy",start:0,dur:228,spotifyUri:"spotify:track:04aAxqtGp5pv12UXAg4pkq",videoId:null},
      {title:"Close To The Sun — TheFatRat, Anjulie",start:0,dur:192,spotifyUri:"spotify:track:7CQjnYsGLdtcrsp95oBpCv",videoId:null},
      {title:"Walk Over My Grave — Yours Truly",start:0,dur:200,spotifyUri:"spotify:track:43c7a2qXSry2me3tYfowdZ",videoId:null},
      {title:"Daydream — Cream Blade, romi",start:0,dur:234,spotifyUri:"spotify:track:3o9NWxu4L3u22WBJTfq1Nj",videoId:null},
      {title:"Bury the Light — Casey Edwards",start:0,dur:582,spotifyUri:"spotify:track:6tUcFEXos6TGhESFlkAyCm",videoId:null},
      {title:"Stabilisers For Big Boys — Panchiko",start:0,dur:252,spotifyUri:"spotify:track:5WmDndgVTaQGeh2aykREq1",videoId:null},
      {title:"My Sputnik Sweetheart — Weatherday",start:0,dur:824,spotifyUri:"spotify:track:2LVZKJQbZm8P9d5kcegDGt",videoId:null},
      {title:"I'm Still Here (Jim's Theme) - From \"Treasure Planet\"/Soundtrack Version — John Rzeznik",start:0,dur:251,spotifyUri:"spotify:track:6BfOhpHADzrvKN2kMPTMPv",videoId:null},
      {title:"Everything Black (feat. Mike Taylor) — Unlike Pluto, Mike Taylor",start:0,dur:229,spotifyUri:"spotify:track:5PwCuqzezD4a7mfxMNwk86",videoId:null},
      {title:"Shelter — Porter Robinson, Madeon",start:0,dur:219,spotifyUri:"spotify:track:2CgOd0Lj5MuvOqzqdaAXtS",videoId:null},
      {title:"Black Betty - Single Edit — Spiderbait",start:0,dur:206,spotifyUri:"spotify:track:7uSsHbBFFAnkRQR1rDwP3L",videoId:null},
      {title:"Flyers — BRADIO",start:0,dur:210,spotifyUri:"spotify:track:6VBQ4DF4fwPJNA96RbMQWT",videoId:null},
      {title:"ずるいね — chelmico",start:0,dur:229,spotifyUri:"spotify:track:0btLLjOMp8mQ1q1NA18XpU",videoId:null},
      {title:"Face Down — The Red Jumpsuit Apparatus",start:0,dur:192,spotifyUri:"spotify:track:4wzjNqjKAKDU82e8uMhzmr",videoId:null},
      {title:"Since U Been Gone — Kelly Clarkson",start:0,dur:189,spotifyUri:"spotify:track:3xrn9i8zhNZsTtcoWgQEAd",videoId:null},
      {title:"Pouring — Cyberbully Mom Club",start:0,dur:207,spotifyUri:"spotify:track:1h0Ev2rq8Fo0vhlhHNEDdt",videoId:null},
      {title:"Weightless — smle, Nick Smith",start:0,dur:179,spotifyUri:"spotify:track:3Bi5Rw7VoxyfXPBDGQKObV",videoId:null},
      {title:"Esther — BAYNK, Tinashe",start:0,dur:192,spotifyUri:"spotify:track:3PWpjbSHuAe5UIKLmeEtj9",videoId:null},
      {title:"Ticks of the Clock — ATYYA",start:0,dur:203,spotifyUri:"spotify:track:6conkBOpsqhb6RVwArcisc",videoId:null},
      {title:"Fortress of Light — ATYYA",start:0,dur:334,spotifyUri:"spotify:track:4e7hFrAWIr7liGqkRo0PnD",videoId:null},
      {title:"The Giver (Reprise) — Duke Dumont",start:0,dur:196,spotifyUri:"spotify:track:0ccSl4LZ7dksMNmJgkN7NO",videoId:null},
      {title:"Tokyo Drifting — Glass Animals, Denzel Curry",start:0,dur:217,spotifyUri:"spotify:track:2MA6YoaFF7fnWqkuOAWjUg",videoId:null},
      {title:"Traditions in Verses — Frail Body",start:0,dur:249,spotifyUri:"spotify:track:2BkfXHl90IHifgm9hYE1lP",videoId:null},
      {title:"Freaks — Surf Curse",start:0,dur:147,spotifyUri:"spotify:track:7EkWXAI1wn8Ii883ecd9xr",videoId:null},
      {title:"In the Water (with Quinn XCII / Party Pupils Remix) — CAL, Party Pupils, Quinn XCII",start:0,dur:159,spotifyUri:"spotify:track:5F2OBaLZbhMlNSZ0XxUjgy",videoId:null},
      {title:"Breathe (GHOST DATA Remix) — Static, GHOST DATA",start:0,dur:300,spotifyUri:"spotify:track:0etfehlj3zXviCWWqnOtxZ",videoId:null},
      {title:"Firework — Hollywood Principle",start:0,dur:187,spotifyUri:"spotify:track:6szLqHKGtFLISbzOOawZ4h",videoId:null},
      {title:"Wounds — Papa Khan",start:0,dur:169,spotifyUri:"spotify:track:2UgOEfleDjg3Pfip9EUdWo",videoId:null},
      {title:"Demons — Drawn To The Sky, Braden Barrie",start:0,dur:196,spotifyUri:"spotify:track:2FNqsRvizeD3fbdIgN75jL",videoId:null},
      {title:"tic tac toe — Tails, laye, Kelland",start:0,dur:172,spotifyUri:"spotify:track:0ObiilKtl2cNkpiSscSVP6",videoId:null},
      {title:"Phoenix — Netrum, Halvorsen",start:0,dur:238,spotifyUri:"spotify:track:7CkTv4SjCYliV3ZgkZn6om",videoId:null},
      {title:"Expedition — Hyper Potions, Nokae",start:0,dur:287,spotifyUri:"spotify:track:3ZxPJQeGt7r0E3w7de2Yxs",videoId:null},
      {title:"Light of Mine — WHIPPED CREAM, Jimorrow",start:0,dur:150,spotifyUri:"spotify:track:3jMeoTAxDrZfkVxMmWcWCg",videoId:null},
      {title:"The Ghost — NIVIRO",start:0,dur:188,spotifyUri:"spotify:track:067xZRE14tdQJgKokA2q4Y",videoId:null},
      {title:"MilkyWay (Battle) — Ben Prunty",start:0,dur:160,spotifyUri:"spotify:track:2XhhDIT2AXoDVTOIbu9Uz9",videoId:null},
      {title:"Federation — Ben Prunty",start:0,dur:247,spotifyUri:"spotify:track:6JbNC9SP5jdJRzZea3k9JN",videoId:null},
      {title:"Colonial (Battle) — Ben Prunty",start:0,dur:222,spotifyUri:"spotify:track:5Vc6fR0X0JObmI0ilfqJTm",videoId:null},
      {title:"Mantis (Battle) — Ben Prunty",start:0,dur:183,spotifyUri:"spotify:track:7uVVvkdCntsraScPAd8ZxQ",videoId:null},
      {title:"Infinite Being (From Stellaris Original Game Soundtrack) — Andreas Waldetoft",start:0,dur:453,spotifyUri:"spotify:track:4QjAXpcwPIMU64WUUJ62Jh",videoId:null},
      {title:"The Birth Of A Star (From Stellaris Original Game Soundtrack) — Andreas Waldetoft",start:0,dur:663,spotifyUri:"spotify:track:63p5Adidx7LBN2ScVYd6u8",videoId:null},
      {title:"Alpha Centauri (From Stellaris Original Game Soundtrack) — Andreas Waldetoft",start:0,dur:324,spotifyUri:"spotify:track:0RIp0PyzAJ93CBOKK1xGrI",videoId:null},
      {title:"Distant Nebula (From Stellaris Original Game Soundtrack) — Andreas Waldetoft",start:0,dur:477,spotifyUri:"spotify:track:6alAW4Z7IMHlypNubMMyFn",videoId:null},
      {title:"Dark Minds — Martin Hall",start:0,dur:250,spotifyUri:"spotify:track:0acbtewPBkQgdrBs4bF1YE",videoId:null},
      {title:"The March Of Profits — Martin Hall",start:0,dur:232,spotifyUri:"spotify:track:3tOicFKLuwprgqPx5pr9EW",videoId:null},
      {title:"Enemy (with JID) - from the series Arcane League of Legends — Imagine Dragons, JID, Arcane, League of Legends",start:0,dur:173,spotifyUri:"spotify:track:1r9xUipOqoNwggBpENDsvJ",videoId:null},
      {title:"Digital Baptism — Falconite",start:0,dur:215,spotifyUri:"spotify:track:587yWjYOx7VVGyeI9m574a",videoId:null},
      {title:"pity party (feat. Royal & the Serpent) — Stand Atlantic, Royal & the Serpent",start:0,dur:162,spotifyUri:"spotify:track:7A9JSq4XOYn9bhSFcGJxto",videoId:null},
      {title:"GHOST — Camellia",start:0,dur:349,spotifyUri:"spotify:track:4HntG3WOZFqZ26jJXYrod3",videoId:null},
      {title:"U (From \"Belle\" Soundtrack) - English Version — ꉈꀧ꒒꒒ꁄꍈꍈꀧ꒦ꉈ ꉣꅔꎡꅔꁕꁄ, Belle",start:0,dur:184,spotifyUri:"spotify:track:169YBmYRX0JNR3o4CJVWXY",videoId:null},
      {title:"melt bitter — satomoka",start:0,dur:310,spotifyUri:"spotify:track:6uSe3ACORUIVrAyiP84RZi",videoId:null},
      {title:"Eternal - Similar Outskirts Remix — Fokushi, Angela Lorenzana, Similar Outskirts",start:0,dur:306,spotifyUri:"spotify:track:2oFxcdVuQS5tOuKMVhzi4n",videoId:null},
      {title:"hair out — Stand Atlantic",start:0,dur:160,spotifyUri:"spotify:track:0lRlsjGhgUDCjJzz3RjwNb",videoId:null},
      {title:"Let Love Win — TheFatRat, Anjulie",start:0,dur:199,spotifyUri:"spotify:track:5jB0IkgKoNeHcCObpZuPXP",videoId:null},
      {title:"Sept29 — lvusm",start:0,dur:116,spotifyUri:"spotify:track:6bGBaoXGvghpxKkZd2VgUF",videoId:null},
      {title:"Bosanska Artiljerija — National Radio",start:0,dur:216,spotifyUri:"spotify:track:3cTx37u4yl9oAJM41JqNB1",videoId:null},
      {title:"Thousands feat. Maya Payne — Camikaze, Maya Payne",start:0,dur:320,spotifyUri:"spotify:track:2DfN5FuPWTNjg1IoXzmIsF",videoId:null},
      {title:"Glitter (feat. Ambré Perkins) — Keys N Krates, Ambré",start:0,dur:214,spotifyUri:"spotify:track:3pEWIQo3WBQNyMQRjEwAJG",videoId:null},
      {title:"A Moment Apart — ODESZA",start:0,dur:234,spotifyUri:"spotify:track:59wlTaYOL5tDUgXnbBQ3my",videoId:null},
      {title:"Sad Looks Pretty on Me — Rivals",start:0,dur:223,spotifyUri:"spotify:track:5LBhFaJVkTqLKBPYaLPnav",videoId:null},
      {title:"van gogh — Stand Atlantic",start:0,dur:186,spotifyUri:"spotify:track:5C4EndmEC3U51PEiUEJuiL",videoId:null},
      {title:"bloodclot — Stand Atlantic",start:0,dur:201,spotifyUri:"spotify:track:4XU6ndhcUU1DFE8n8E3rgi",videoId:null},
      {title:"Are We Still Young — Grant, Juneau",start:0,dur:216,spotifyUri:"spotify:track:7zPAsqqz9M5qcpG42YUiug",videoId:null},
      {title:"Wonders — Envoi",start:0,dur:206,spotifyUri:"spotify:track:72J6yh9W7P3DevLclGZI3x",videoId:null},
      {title:"Running Up That Hill (A Deal with God) — Kate Bush",start:0,dur:300,spotifyUri:"spotify:track:6VfKhnmbqCj14zcjZNjZTk",videoId:null},
      {title:"Everything Goes On — Porter Robinson, League of Legends",start:0,dur:203,spotifyUri:"spotify:track:3WBRfkOozHEsG0hbrBzwlm",videoId:null},
      {title:"RISE — Darius, Benny Sings",start:0,dur:304,spotifyUri:"spotify:track:3SDueX9beH4jK4WQi0KVYP",videoId:null},
      {title:"Forever Beloved — Flipboitamidles",start:0,dur:219,spotifyUri:"spotify:track:2UvZpBTzTQ0QQMG7zYR5FZ",videoId:null},
      {title:"Thanks, I Hate It — Catapults",start:0,dur:173,spotifyUri:"spotify:track:6tqpbfB0qJZdzf1VED796e",videoId:null},
      {title:"Newfound Home — Catapults",start:0,dur:202,spotifyUri:"spotify:track:2gfgqSNTXDonXBNp58WJuJ",videoId:null},
      {title:"NEVER BACK DOWN — Vo Williams, Klergy",start:0,dur:148,spotifyUri:"spotify:track:3Tsylo2vmr3BspE2u0cbLm",videoId:null},
      {title:"Searching — Xan Griffin",start:0,dur:200,spotifyUri:"spotify:track:4DPofVIbpsPFeMx2TZxmWR",videoId:null},
      {title:"This Time (I'm Gonna Try It My Way) — DJ Shadow",start:0,dur:185,spotifyUri:"spotify:track:5kt9kEI6OrnwYYNcij1lbF",videoId:null},
      {title:"Sleep Sound — Closure",start:0,dur:191,spotifyUri:"spotify:track:6PkSwUwALlae2gkvSmnwCy",videoId:null},
      {title:"I'm In Love With You — The 1975",start:0,dur:263,spotifyUri:"spotify:track:0uBdQzKghx88d2Lp8SLFKJ",videoId:null},
      {title:"1985 — Haken",start:0,dur:549,spotifyUri:"spotify:track:3Llikc7f9KKGYwbrEfAYtk",videoId:null},
      {title:"Svensk Sås — Todd Terje",start:0,dur:164,spotifyUri:"spotify:track:0Def9GQnjyliBmy7LmoXvn",videoId:null},
      {title:"Strandbar — Todd Terje",start:0,dur:268,spotifyUri:"spotify:track:6reLfBSO38qmFgHgz6kAs0",videoId:null},
      {title:"Delorean Dynamite — Todd Terje",start:0,dur:406,spotifyUri:"spotify:track:43DnalVz4tL1pR1GWCpfCj",videoId:null},
      {title:"Full Circle - William Crooks Remix — Wave Racer, William Crooks",start:0,dur:160,spotifyUri:"spotify:track:4ALJcAs0hpc0lHfYqHf4Ll",videoId:null},
      {title:"The Wall - Buunshin Remix — ABIS, Signal, Tasha Baxter, Buunshin",start:0,dur:340,spotifyUri:"spotify:track:1W90gCLChfslZvuWbvhLfx",videoId:null},
      {title:"(The World Covered In) Purple Shrouds — Blood Command",start:0,dur:362,spotifyUri:"spotify:track:33V5l9ZX1AUJYzzxXQ6trF",videoId:null},
      {title:"Cyberia lyr3 — Sewerslvt",start:0,dur:218,spotifyUri:"spotify:track:3AbIvwEMtuSspLL6eXwt4p",videoId:null},
      {title:"Jurassic | Cretaceous — The Ocean, Katatonia",start:0,dur:805,spotifyUri:"spotify:track:0ontughxaUxe6EQD7d9gFf",videoId:null},
      {title:"Pump It — Electric Callboy",start:0,dur:173,spotifyUri:"spotify:track:3iXNlPQNYPrtimAEM49PsG",videoId:null},
      {title:"OH! TENGO SUERTE — Masayoshi Takanaka",start:0,dur:253,spotifyUri:"spotify:track:7E4qUlNYocWix5FKBdw5CN",videoId:null},
      {title:"Groove District — Starjunk 95",start:0,dur:186,spotifyUri:"spotify:track:7Kv0yPSr550uUxbAwAhH01",videoId:null},
      {title:"Sine From Above (with Elton John) - Chester Lockhart, Mood Killer & Lil Texas Remix — Lady Gaga, Elton John, Chester Lockhart, Mood Killer, Lil Texas",start:0,dur:250,spotifyUri:"spotify:track:4LgB8rYhW4HVQDfznTMG9I",videoId:null},
      {title:"We Will Fall Together — Streetlight Manifesto",start:0,dur:289,spotifyUri:"spotify:track:0plo6KjgjTcRhj7Fn8oemk",videoId:null},
      {title:"Flame Devourer — Alon Mor",start:0,dur:421,spotifyUri:"spotify:track:7q5AXFHOPcLWgdZHnZoLWZ",videoId:null},
      {title:"Жужжалка76 — Camellia",start:0,dur:275,spotifyUri:"spotify:track:6DCXZSdM41pDDRYJXPyPYL",videoId:null},
      {title:"Blackest Eyes — Porcupine Tree",start:0,dur:264,spotifyUri:"spotify:track:2WObDBPZ4UZ8yBBf1R41QL",videoId:null},
      {title:"Unintentional — Clockvice, Shurk",start:0,dur:233,spotifyUri:"spotify:track:5uUCPEZAP5xPxFnxaoHm4d",videoId:null},
      {title:"Travelling Light — Daydreamer",start:0,dur:466,spotifyUri:"spotify:track:7t7M7qD2xy6SoWzuL5kNNk",videoId:null},
      {title:"THE HILLS — KLOUD",start:0,dur:259,spotifyUri:"spotify:track:77eEBtXwACqL0Udd37NQjU",videoId:null},
      {title:"Falling Back To Earth — Haken",start:0,dur:711,spotifyUri:"spotify:track:7JytQiV4Mxh7mWPxqvjvWF",videoId:null},
      {title:"Chromology — Thank You Scientist",start:0,dur:589,spotifyUri:"spotify:track:4784hQtZrlvAy2KIu1Buft",videoId:null},
      {title:"The Midelar — Alon Mor",start:0,dur:637,spotifyUri:"spotify:track:3O6xChdZZxBuQXK4lvJiBZ",videoId:null},
      {title:"Subside — Ephixa, Bossfight",start:0,dur:215,spotifyUri:"spotify:track:5VAYOq7nRtXrR0ahB0InsK",videoId:null},
      {title:"The Sky Is Red — Leprous",start:0,dur:682,spotifyUri:"spotify:track:7cqnK70AUCBypcveB7OCs1",videoId:null},
      {title:"Atlas Novus — Scale The Summit",start:0,dur:307,spotifyUri:"spotify:track:02v81HQA1yS0DSZ4dw3YzF",videoId:null},
      {title:"Mr. Invisible — Thank You Scientist",start:0,dur:456,spotifyUri:"spotify:track:01enyHIxGijVS56im5qZaH",videoId:null},
      {title:"Feels Pretty Good — TWRP",start:0,dur:295,spotifyUri:"spotify:track:7Fp6I5Rnf7x3YVkPR0fznY",videoId:null},
      {title:"Sidetracked Day — VINXIS",start:0,dur:338,spotifyUri:"spotify:track:04tHEujy90CzUZB9PPDhzC",videoId:null},
      {title:"A Fool Moon Night — THE KOXX",start:0,dur:277,spotifyUri:"spotify:track:6c7JQdDL94DF8ECGCwT3zG",videoId:null},
      {title:"Sound Chimera — Laur",start:0,dur:308,spotifyUri:"spotify:track:1d14xCnYqUAIWZiGJnqg8D",videoId:null},
      {title:"Houmous — Igorrr",start:0,dur:212,spotifyUri:"spotify:track:0Zy1tSVAQ8pIugxsEbeAar",videoId:null},
      {title:"Cocaine Princess — Samuel Orson",start:0,dur:482,spotifyUri:"spotify:track:7AMCl6hWdgxLc25OjeNfdY",videoId:null},
      {title:"Gloria — The Dear Hunter",start:0,dur:317,spotifyUri:"spotify:track:15qxRClwyQyaKziOCGz4ZR",videoId:null},
      {title:"Piano Tune - Live — Dovydas",start:0,dur:497,spotifyUri:"spotify:track:4uPcc3RpxhFWy8H0EWXQ9T",videoId:null},
      {title:"The Macrocosm — Rings of Saturn",start:0,dur:381,spotifyUri:"spotify:track:33JOjI7umOIAIowD3NH8Jq",videoId:null},
      {title:"Cockroach King — Haken",start:0,dur:495,spotifyUri:"spotify:track:0J1CIpL8IuUf0OyijwkMFj",videoId:null},
      {title:"Honey — salute",start:0,dur:274,spotifyUri:"spotify:track:2ipbVg9oVEJ6VJMOAwZOVG",videoId:null},
      {title:"All About U — salute",start:0,dur:225,spotifyUri:"spotify:track:50wmUC3yAds4R1E3PMuPjD",videoId:null},
      {title:"Joy — salute",start:0,dur:281,spotifyUri:"spotify:track:17E3lZxFJnO49Gb0tdgVn0",videoId:null},
      {title:"Tonight — Magnolia Park, LiL Lotus",start:0,dur:196,spotifyUri:"spotify:track:2cSN1sp45VfUpiQh2X7T0W",videoId:null},
      {title:"Addison Rae — Magnolia Park",start:0,dur:199,spotifyUri:"spotify:track:5G7JTfXmgI7BXiT8ijEhn7",videoId:null},
      {title:"The Thin Line Between Hope & Despair — Those Without",start:0,dur:232,spotifyUri:"spotify:track:605sb9qMsdNPnEAR8cxnDT",videoId:null},
      {title:"I Hate the Way You’re Looking at Me (Lately). — milk.",start:0,dur:210,spotifyUri:"spotify:track:0UM7vkU0iebMwazpm9QLtC",videoId:null},
      {title:"Anti-Hero — Taylor Swift",start:0,dur:201,spotifyUri:"spotify:track:02Zkkf2zMkwRGQjZ7T4p8f",videoId:null},
      {title:"Apologies — The Stars Above",start:0,dur:189,spotifyUri:"spotify:track:18nlCJeWFOyAtQ2KDoCmVZ",videoId:null},
      {title:"Time Travel Kool Aid — Half an Orange, Ephixa",start:0,dur:191,spotifyUri:"spotify:track:2gwH0dT4aDth8VqbPl1uEj",videoId:null},
      {title:"The Ballad Of Me And My Brain — The 1975",start:0,dur:171,spotifyUri:"spotify:track:54XGKvGZwA7xB3Uu5vef0C",videoId:null},
      {title:"Ambulances — Driveways",start:0,dur:219,spotifyUri:"spotify:track:0iUvapmkRzjC8MYop4RTLB",videoId:null},
      {title:"Nice Now — Point North",start:0,dur:190,spotifyUri:"spotify:track:4niOZOWhEIGtUQqrByN4Dj",videoId:null},
      {title:"Carousel — Eat Your Heart Out",start:0,dur:235,spotifyUri:"spotify:track:4b6jdpUJGDQ9ImXMDpEt7l",videoId:null},
      {title:"Same Stars — Eat Your Heart Out",start:0,dur:192,spotifyUri:"spotify:track:2VYfXrMNNKPo8gvsQcfXAu",videoId:null},
      {title:"Object Permanence — Arm's Length",start:0,dur:230,spotifyUri:"spotify:track:28BW0WwfqqNFOnBnt2aR0l",videoId:null},
      {title:"Whiskey — Young Culture",start:0,dur:202,spotifyUri:"spotify:track:2SZy9gWmA3q6B2JgsM68te",videoId:null},
      {title:"Flow — LeMarquis",start:0,dur:192,spotifyUri:"spotify:track:63b3gUaspAhi92HQgraOqc",videoId:null},
      {title:"Halloween — Novo Amor",start:0,dur:155,spotifyUri:"spotify:track:7AkPusgKsrTqbOcTTbRnFr",videoId:null},
      {title:"Sentimental Surgery — RedHook",start:0,dur:154,spotifyUri:"spotify:track:22W2mAzEEk42hS8G5SKWBP",videoId:null},
      {title:"Hate Me (Sometimes) — Stand Atlantic",start:0,dur:233,spotifyUri:"spotify:track:69Y6dB1U7AZ0FfDdzol6ir",videoId:null},
      {title:"Siamese Souls — Yours Truly",start:0,dur:262,spotifyUri:"spotify:track:0EBkBXoktl83CgIqxw4bUZ",videoId:null},
      {title:"body like gossip — dreamfone",start:0,dur:193,spotifyUri:"spotify:track:422wpciRSX4nENEb1iaMwl",videoId:null},
      {title:"One Last Time — Broadside",start:0,dur:180,spotifyUri:"spotify:track:58NAlwbMyFUWb8GUEoOpOi",videoId:null},
      {title:"Notre Dame — The Bombpops",start:0,dur:153,spotifyUri:"spotify:track:1QT3Is0dh27Avn6aRtGOZ8",videoId:null},
      {title:"ALMOST FAMOUS — BEAUTY SCHOOL DROPOUT, Mark Hoppus",start:0,dur:188,spotifyUri:"spotify:track:7lXAfpNbrQmbsqs9ZmsPv7",videoId:null},
      {title:"Fake It — State Champs",start:0,dur:183,spotifyUri:"spotify:track:7AnCtWxVQGZKe01rbSuMbS",videoId:null},
      {title:"Bad Behavior — The Maine",start:0,dur:190,spotifyUri:"spotify:track:4Kc1BGRuyicJaqIXi3Rysi",videoId:null},
      {title:"Watercress — Bad Snacks",start:0,dur:187,spotifyUri:"spotify:track:52j2phG245ZhsXRVLkeEdq",videoId:null},
      {title:"Rerun — Honey Revenge",start:0,dur:153,spotifyUri:"spotify:track:3fpeuWrtDz4yadTNBh2BI2",videoId:null},
      {title:"Ride — Honey Revenge",start:0,dur:162,spotifyUri:"spotify:track:5sGh9s5A6qit1vuKSpct0Q",videoId:null},
      {title:"ice water — shallow pools",start:0,dur:172,spotifyUri:"spotify:track:2gvHXYRtO6m3jVL0jZL57O",videoId:null},
      {title:"Into The Barrens — Grizfolk",start:0,dur:196,spotifyUri:"spotify:track:5w2FeR7c1LUwsxKub9iFHC",videoId:null},
      {title:"Seasons — Broadside",start:0,dur:189,spotifyUri:"spotify:track:4wrG4XK6MBmOjJWvsZQ3UU",videoId:null},
      {title:"Cardinals — The Wonder Years",start:0,dur:195,spotifyUri:"spotify:track:2rZZGEzS9rbXJBwVfb0NNP",videoId:null},
      {title:"KILL[H]ER — Stand Atlantic",start:0,dur:146,spotifyUri:"spotify:track:2vcgd86VuJbv5jbzn4zau4",videoId:null},
      {title:"Lingus — Snarky Puppy",start:0,dur:646,spotifyUri:"spotify:track:68d6ZfyMUYURol2y15Ta2Y",videoId:null},
      {title:"One Big Party — Shaun Martin",start:0,dur:369,spotifyUri:"spotify:track:3jft7L9axJRK2PxhI60HDG",videoId:null},
      {title:"under the weather — CORPSE",start:0,dur:107,spotifyUri:"spotify:track:3PYFSGwWNZWnQpiuGke2J9",videoId:null},
      {title:"Under the Moment — Sleep On It",start:0,dur:198,spotifyUri:"spotify:track:69oLbKpRTL4rnHnob9luIF",videoId:null},
      {title:"Overexposed — Sleep On It",start:0,dur:218,spotifyUri:"spotify:track:1vJ1jC6m1EECmggfYlzsM2",videoId:null},
      {title:"PS5 - Fortnite Battle Pass Gamer Remix — salem ilese, Alan Walker, Abdul Cisse",start:0,dur:149,spotifyUri:"spotify:track:1yfB3md0KA0skylW7IClP5",videoId:null},
      {title:"Are You Impressed? — Honey Revenge",start:0,dur:188,spotifyUri:"spotify:track:26hI6Cea82njvwJfG6t3Jl",videoId:null},
      {title:"Trinity — Sanjaux",start:0,dur:266,spotifyUri:"spotify:track:5IUaSX4HKmxl82kB2O9o1K",videoId:null},
      {title:"Shooting Stars — Bag Raiders",start:0,dur:236,spotifyUri:"spotify:track:0UeYCHOETPfai02uskjJ3x",videoId:null},
      {title:"lockdown — GARDENA, Ethan Dufault",start:0,dur:201,spotifyUri:"spotify:track:6JvM4RyaFmEdiV58dpv1Jr",videoId:null},
      {title:"I've Grown Accustomed To Her Face — Tsuyoshi Yamamoto Trio",start:0,dur:164,spotifyUri:"spotify:track:0HOUoD0VEFUrzqzDWwk4Mi",videoId:null},
      {title:"Color bath — Kie Katagi",start:0,dur:215,spotifyUri:"spotify:track:2hr9CW9r0JW1QfyiPXg53w",videoId:null},
      {title:"Distracted — Honey Revenge",start:0,dur:200,spotifyUri:"spotify:track:08ekedAGATztErIr09gnUw",videoId:null},
      {title:"UFOs in the Sky — Driveways",start:0,dur:246,spotifyUri:"spotify:track:5395yqt6OBJ4yLQrg50YWX",videoId:null},
      {title:"Better Days — Between You & Me",start:0,dur:215,spotifyUri:"spotify:track:55Q02ZnA48zY5Qq4jDkMnJ",videoId:null},
      {title:"Opaline — Novo Amor",start:0,dur:192,spotifyUri:"spotify:track:732Zsh1L5ixRNgAmiPyvrp",videoId:null},
      {title:"Airhead — Honey Revenge",start:0,dur:164,spotifyUri:"spotify:track:5inDa524Pc1x4NJmyrZ5pp",videoId:null},
      {title:"Whatever I Do — Cartoon, Jéja, Kóstja",start:0,dur:230,spotifyUri:"spotify:track:6VRW5Sd66acLIKkUUkOR6X",videoId:null},
      {title:"Simple — Joe Hertz, JONES",start:0,dur:229,spotifyUri:"spotify:track:0CrNNcc7foWuCvI8g9eyFu",videoId:null},
      {title:"Fake Out — Fall Out Boy",start:0,dur:210,spotifyUri:"spotify:track:325pIhoHocYWIMMi5Ik2UB",videoId:null},
      {title:"The Credits — Arrows in Action, Loveless, Magnolia Park",start:0,dur:184,spotifyUri:"spotify:track:7LeRrm1Cg4yCLe3YtrxC3n",videoId:null},
      {title:"I Can't Go For That (No Can Do) - Pomo Remix — Daryl Hall, John Oates, Pomo",start:0,dur:308,spotifyUri:"spotify:track:0uBZvS31BoiROea01VyUG7",videoId:null},
      {title:"Song To The Pharoah Kings — Return To Forever, Chick Corea",start:0,dur:863,spotifyUri:"spotify:track:2IA2dYPbwRqgWk62SFaTE8",videoId:null},
      {title:"\"good guy\" — Against The Current",start:0,dur:208,spotifyUri:"spotify:track:3bfElZNhtvtGvWMVgCBgZK",videoId:null},
      {title:"Blue Eyed Boy — Trophy Eyes",start:0,dur:178,spotifyUri:"spotify:track:0ei2L33JNElnE8txjR2ptr",videoId:null},
      {title:"Stupid for You — Waterparks",start:0,dur:192,spotifyUri:"spotify:track:1N7Aep1OewK9diaN9WbuuR",videoId:null},
      {title:"Friday Forever — Trophy Eyes",start:0,dur:192,spotifyUri:"spotify:track:6tcauDXxM4icA4Nj9ODzWA",videoId:null},
      {title:"Places I'll Go — Blonde Maze, Half an Orange",start:0,dur:225,spotifyUri:"spotify:track:3w1GhLK1nwUxz38PVwHYa6",videoId:null},
      {title:"guitar — iZNiiK",start:0,dur:269,spotifyUri:"spotify:track:3YN1mefn8oP0vd9XvKWsVc",videoId:null},
      {title:"What Hurts the Most — Trophy Eyes",start:0,dur:205,spotifyUri:"spotify:track:0wsNK27DKBwXXOC1JK6s4D",videoId:null},
      {title:"Favorite Song — Honey Revenge",start:0,dur:163,spotifyUri:"spotify:track:3Kbyen54jldTKLx3ofcWjr",videoId:null},
      {title:"Insanity — ILLENIUM, American Teeth",start:0,dur:183,spotifyUri:"spotify:track:15KGYDSw1BJR9KMhp3UWpF",videoId:null},
      {title:"Portions for Foxes — Spanish Love Songs",start:0,dur:286,spotifyUri:"spotify:track:0U7w9f0cr2X1eWDCGwyzSn",videoId:null},
      {title:"Haunted — Spanish Love Songs",start:0,dur:223,spotifyUri:"spotify:track:2gIgCnJIJxk8hqjyRzKV3d",videoId:null},
      {title:"Pay Per View (Keep It Cool) — Summer Hoop",start:0,dur:166,spotifyUri:"spotify:track:7C4PD4bNi8BYZhPRmtQj6X",videoId:null},
      {title:"Always — LEISURE",start:0,dur:208,spotifyUri:"spotify:track:5uHgKIUzqrpRt10p1crJma",videoId:null},
      {title:"Die For You (with Ariana Grande) - Remix — The Weeknd, Ariana Grande",start:0,dur:233,spotifyUri:"spotify:track:4JNdwEfqwFRiAeEISC8RU8",videoId:null},
      {title:"SABOTAGE// — KennyHoopla, Travis Barker",start:0,dur:201,spotifyUri:"spotify:track:4Wkk6Soil0Oq5HZkbx73rd",videoId:null},
      {title:"Alive — RÜFÜS DU SOL",start:0,dur:335,spotifyUri:"spotify:track:5IKaBEdCQlfB6aikIFKuR8",videoId:null},
      {title:"Beyond Language — Spiritual Chaos",start:0,dur:295,spotifyUri:"spotify:track:2TdScfCx2oaqFCKHklw5uK",videoId:null},
      {title:"Shotgun Wedding — Short Stack",start:0,dur:157,spotifyUri:"spotify:track:0giHgzxiziVnf8vyWpJYR0",videoId:null},
      {title:"Begin Again — Knife Party",start:0,dur:355,spotifyUri:"spotify:track:19u20B0E3KO1copzKVSJxi",videoId:null},
      {title:"Predators — We Are the Catalyst",start:0,dur:306,spotifyUri:"spotify:track:0eOvLSntiezP3uvXraejRW",videoId:null},
      {title:"Hey Mario — Bowling For Soup",start:0,dur:181,spotifyUri:"spotify:track:2lkBxeNq4F1TYx720IE0uc",videoId:null},
      {title:"Ozan Koukle - Remastered — Lafayette Afro Rock Band",start:0,dur:348,spotifyUri:"spotify:track:4JOKcpwwyf1IikEfgA6raB",videoId:null},
      {title:"sanctuary — iRis.EXE",start:0,dur:216,spotifyUri:"spotify:track:3eNo8fSYJZOYmBnMbY4Ljo",videoId:null},
      {title:"On My Knees — RÜFÜS DU SOL",start:0,dur:261,spotifyUri:"spotify:track:2ouFrmMwYik8nQX2n9SeZu",videoId:null},
      {title:"GOOD ENEMY — PVRIS",start:0,dur:131,spotifyUri:"spotify:track:6dZs7mu5SC42LofoapXg8S",videoId:null},
      {title:"If You're Drowning (I'll Learn How To Hold My Breath) — Yours Truly",start:0,dur:158,spotifyUri:"spotify:track:1wmieYSeK1fT0mNp4Xr94v",videoId:null},
      {title:"Moving Trains — Slowly Slowly, Dashboard Confessional",start:0,dur:193,spotifyUri:"spotify:track:0UMrMQSH9iXJke3kxnyvRE",videoId:null},
      {title:"F.A.K.E. — CLIFFDIVER",start:0,dur:137,spotifyUri:"spotify:track:4wwOhNPQXD88Tz0AY5a7Lj",videoId:null},
      {title:"The Taste of Ink — The Used",start:0,dur:209,spotifyUri:"spotify:track:5jZ1Z2GFTf2gwmFc3qiUxs",videoId:null},
      {title:"BLOODSTREAM — Hot Milk",start:0,dur:189,spotifyUri:"spotify:track:3ey44BzqrH2Si5FmeFZ300",videoId:null},
      {title:"Unholy Heart — Magnolia Park, Honey Revenge, Joshua Roberts",start:0,dur:187,spotifyUri:"spotify:track:7E7kniaKKtEfL0SsRfqCQQ",videoId:null},
      {title:"Interspace — Starcadian",start:0,dur:324,spotifyUri:"spotify:track:4sZ3hUbwzxGo2ERNoekmzI",videoId:null},
      {title:"PSYCHE! — Say Anything",start:0,dur:335,spotifyUri:"spotify:track:5X46KFIG4wAwMTjaA0ZX2p",videoId:null},
      {title:"Not Afraid To Die — Grayscale",start:0,dur:205,spotifyUri:"spotify:track:28dH3pe1JYjOZPdL0gzIqN",videoId:null},
      {title:"Lucid — Broadside, Devin Papadol",start:0,dur:183,spotifyUri:"spotify:track:1vDkZAZgUkGnaiKYYw3x1R",videoId:null},
      {title:"Weightless — Those Without",start:0,dur:164,spotifyUri:"spotify:track:00vsgZFwdnh9kzdRxGQAxT",videoId:null},
      {title:"Endeavor — Arrows in Action",start:0,dur:188,spotifyUri:"spotify:track:5q76zlTIN57VFdJBUGtjSz",videoId:null},
      {title:"get him back! — Olivia Rodrigo",start:0,dur:211,spotifyUri:"spotify:track:2gyxAWHebV7xPYVxqoi86f",videoId:null},
      {title:"Endless Summer — The Midnight",start:0,dur:406,spotifyUri:"spotify:track:2jq5avJCdvIzelo7PiZNjW",videoId:null},
      {title:"Golden — Scott Vlassis",start:0,dur:183,spotifyUri:"spotify:track:0hYB0OXzY2YBftLiyFoQU0",videoId:null},
      {title:"Do It To Myself — Benedict",start:0,dur:196,spotifyUri:"spotify:track:52AzE8DHbr5Hu7u54ZBB9m",videoId:null},
      {title:"Jazz Club — Accelio, ROOXG",start:0,dur:349,spotifyUri:"spotify:track:3QbP1zDo7MJNApxXt2zwoP",videoId:null},
      {title:"Jaded — Spiritbox",start:0,dur:263,spotifyUri:"spotify:track:6IdyYbGg1jxiWhfwm2Ykjn",videoId:null},
      {title:"Too Close / Too Late — Spiritbox",start:0,dur:281,spotifyUri:"spotify:track:4hvCxgioUiT85MCgfIhDP3",videoId:null},
      {title:"Bordeaux — SERAPHINE NOIR, Alexandra Rotmann",start:0,dur:307,spotifyUri:"spotify:track:7F80jeq0Nn8QeyNufWeV3D",videoId:null},
      {title:"On You — YOGA BEAR",start:0,dur:166,spotifyUri:"spotify:track:3MGbygEdY01dkHWo3lsJAy",videoId:null},
      {title:"Collide — Normandie",start:0,dur:215,spotifyUri:"spotify:track:6JjEVbuOBrlWwrAGuiRWHk",videoId:null},
      {title:"Up In Smoke — Arm's Length",start:0,dur:174,spotifyUri:"spotify:track:2ebBXyuDIYdyGZR2Sb06kK",videoId:null},
      {title:"I'd Do Anything — Simple Plan",start:0,dur:198,spotifyUri:"spotify:track:4uVjbl6daCwjhDur7qLddu",videoId:null},
      {title:"Breath — Hold Close",start:0,dur:216,spotifyUri:"spotify:track:0PGcUNjX147Jzi8zhFJTC1",videoId:null},
      {title:"Temper — Hold Close",start:0,dur:214,spotifyUri:"spotify:track:3C3omJMqif4iYjgcRNsUne",videoId:null},
      {title:"Pretense — Knuckle Puck",start:0,dur:186,spotifyUri:"spotify:track:7CBtPFRJk0u21xFv8uVOjj",videoId:null},
      {title:"Hurt — Trophy Eyes",start:0,dur:253,spotifyUri:"spotify:track:3TFvaueX6X7adRsMV1z6KS",videoId:null},
      {title:"YEAH! — Between You & Me",start:0,dur:183,spotifyUri:"spotify:track:2bgJCXFcRZkedHVpjOZO52",videoId:null},
      {title:"TURPENTINE — blink-182",start:0,dur:185,spotifyUri:"spotify:track:6x9cdTMZpecg309UDzsLgr",videoId:null},
      {title:"Nightmare — PVRIS",start:0,dur:188,spotifyUri:"spotify:track:5FKakl8vve5e5NbSZDkcYf",videoId:null},
      {title:"Misery — The Beautiful Monument",start:0,dur:241,spotifyUri:"spotify:track:4jGJU7drH4VcADP5jdy2db",videoId:null},
      {title:"November First — Driveways",start:0,dur:260,spotifyUri:"spotify:track:2SSrGiJsD90YEWOeXKhI8p",videoId:null},
      {title:"Children of the Eye — Amenra",start:0,dur:581,spotifyUri:"spotify:track:6d3g6U6iWfTPtsj8BbP3M5",videoId:null},
      {title:"Hope — CAMELPHAT, Max Milner",start:0,dur:222,spotifyUri:"spotify:track:5HcFTUjrIn2Z2H87Rr9X7z",videoId:null},
      {title:"Enisey — Grima",start:0,dur:273,spotifyUri:"spotify:track:66wdQM7TKtmu9XHjchUBoz",videoId:null},
      {title:"Transcendence — Ante-Inferno",start:0,dur:370,spotifyUri:"spotify:track:6fI8mKXLTkyJQ9wFsN0JFc",videoId:null},
      {title:"The Weekend - Radio Edit — Michael Gray",start:0,dur:192,spotifyUri:"spotify:track:4c2wdAMuL7KkGVeyRqmYQu",videoId:null},
      {title:"In The Middle — Between You & Me",start:0,dur:182,spotifyUri:"spotify:track:47q1ldPZ1Ey0PQso5XaShr",videoId:null},
      {title:"Till The End Of Time — Hotel Apache",start:0,dur:247,spotifyUri:"spotify:track:4zILMJR7Z3hnOqvcAnLs5L",videoId:null},
      {title:"Go To Hell (feat. Yours Truly) — Between You & Me, Yours Truly",start:0,dur:187,spotifyUri:"spotify:track:21bRzGDnsSLUjnVV07LSCA",videoId:null},
      {title:"Veesha — Parker Wilkins",start:0,dur:154,spotifyUri:"spotify:track:40TVYUkRQ5GgLApjXOxq3O",videoId:null},
      {title:"Lust & Giants — Kings & Creatures, Aeph",start:0,dur:144,spotifyUri:"spotify:track:48GMQzFeMtlS2vC8uLPTGA",videoId:null},
      {title:"Solar Eclipses — Hollywood Principle, Dr. Awkward",start:0,dur:209,spotifyUri:"spotify:track:3ovUC1otltR64PMTj8kaVV",videoId:null},
      {title:"Dimman - forte — Vildhjarta",start:0,dur:242,spotifyUri:"spotify:track:3GhGod9Ve38wYypwe7HXaa",videoId:null},
      {title:"All Ur Luv — Wavedash, Madeon, Toro y Moi",start:0,dur:162,spotifyUri:"spotify:track:3K1RnBxBkrMwoBE8gC63eY",videoId:null},
      {title:"halved halved halved — Hundotte, Frums",start:0,dur:246,spotifyUri:"spotify:track:576ZiaPRxHyXG4xB8Rgj67",videoId:null},
      {title:"Always Ascending — HAAi, Jon Hopkins, KAM-BU",start:0,dur:351,spotifyUri:"spotify:track:3neH0qCEd7nNYPOJCoB7xr",videoId:null},
      {title:"Oh Joy — Todd Terje",start:0,dur:429,spotifyUri:"spotify:track:07Wr8BA8v4hsvczK43fZw4",videoId:null},
      {title:"Determinism — Kindrid",start:0,dur:269,spotifyUri:"spotify:track:1PbS37pIudncXiZEkdYomh",videoId:null},
      {title:"HERETIC — Kindrid, RetiredOrphan",start:0,dur:255,spotifyUri:"spotify:track:30IhnIaW2KkXoGNYiPlCkN",videoId:null},
      {title:"Heartsleeve — Yours Truly",start:0,dur:285,spotifyUri:"spotify:track:33X1ycMycrh1HaklcGbtx0",videoId:null},
      {title:"Coffee at Midnight — Stand Atlantic",start:0,dur:225,spotifyUri:"spotify:track:4L4w3SWUZI2KeKnXK1wjql",videoId:null},
      {title:"Gold Steps — Neck Deep",start:0,dur:193,spotifyUri:"spotify:track:3wcT7Bndd1w4dVsKhEXcEm",videoId:null},
      {title:"In Bloom — Neck Deep",start:0,dur:218,spotifyUri:"spotify:track:6WoyghnMAvDDRbZfFbpwEo",videoId:null},
      {title:"Worth the Wait — Terrian",start:0,dur:206,spotifyUri:"spotify:track:3MIcezihJbvdXioEBAZESx",videoId:null},
      {title:"Canvas — Rezonate",start:0,dur:396,spotifyUri:"spotify:track:5fq4dhW2pwbhnTb7D2TAhd",videoId:null},
      {title:"Make Believe — EASY FREAK",start:0,dur:275,spotifyUri:"spotify:track:1Se5FWW7FBhCulx990MWsb",videoId:null},
      {title:"Ride with You — spring gang, Andy Delos Santos",start:0,dur:213,spotifyUri:"spotify:track:7l3VQbWDfHykJw91nroXWl",videoId:null},
      {title:"Are You Feeling Alive? — Hot Milk",start:0,dur:184,spotifyUri:"spotify:track:1cOeERJefV9nRr03ooDrIE",videoId:null},
      {title:"Friendly Fire — Linkin Park",start:0,dur:177,spotifyUri:"spotify:track:1rAzOr3zpUDRtN2zsqGHiG",videoId:null},
      {title:"Barefoot Ghost Dance on Blood Soaked Soil — Blackbraid",start:0,dur:385,spotifyUri:"spotify:track:094cQcbTZcolZdtBoMbjSc",videoId:null},
      {title:"Hot N Cold — Katy Perry",start:0,dur:220,spotifyUri:"spotify:track:1y4eb6hmAvsqlDOl3fx9kk",videoId:null},
      {title:"High Tide - Oliver Nelson & Tobtok Remix — Lemaitre, Oliver Nelson, Tobtok",start:0,dur:246,spotifyUri:"spotify:track:3ejf2TjoBbnBXXbFNic2if",videoId:null},
      {title:"Leave Me Again - Radio Edit — HYOSE",start:0,dur:199,spotifyUri:"spotify:track:4ws64jMaBUISYnuX0of6Yq",videoId:null},
      {title:"CALLING OUT — Sam Atlast",start:0,dur:197,spotifyUri:"spotify:track:69JeqKrz2P4SrvpY5clGcn",videoId:null},
      {title:"Magnetic — Annabel Jones",start:0,dur:176,spotifyUri:"spotify:track:3crtG5PZq451mE83TbHJpI",videoId:null},
      {title:"Sour — Yours Truly",start:0,dur:166,spotifyUri:"spotify:track:1eEq2illl2lZlqawke83S8",videoId:null},
      {title:"Nobody - from Kaiju No. 8 — OneRepublic",start:0,dur:154,spotifyUri:"spotify:track:47N81NMkB488fuOwOC3Oip",videoId:null},
      {title:"New Sky — RÜFÜS DU SOL",start:0,dur:328,spotifyUri:"spotify:track:29tIhq8ByVaG5GVlnS4XRL",videoId:null},
      {title:"Never Come Down — Brave Shores",start:0,dur:146,spotifyUri:"spotify:track:2SqLkcztfDC9xtMt3zW9ow",videoId:null},
      {title:"LOVE U ANYWAY — Stand Atlantic",start:0,dur:176,spotifyUri:"spotify:track:6lficC9CzeHGY7FnmJkZPx",videoId:null},
      {title:"Recipe For Disaster — Honey Revenge",start:0,dur:166,spotifyUri:"spotify:track:4S3CGPuEmleAmk36HLa5Lj",videoId:null},
      {title:"Believe It (with Madeon) — Louis The Child, Madeon",start:0,dur:150,spotifyUri:"spotify:track:5glaxT4IXZtym1ea6RFW49",videoId:null},
      {title:"Sept29 — lvusm",start:0,dur:116,spotifyUri:"spotify:track:4bY6LiwFgZIKVAXaPVAKj8",videoId:null},
      {title:"Swarm — Sycco",start:0,dur:163,spotifyUri:"spotify:track:1UcsKMDTZksX9AeVIQVL7j",videoId:null},
      {title:"MAYDAY — TheFatRat, Laura Brehm",start:0,dur:247,spotifyUri:"spotify:track:5xXB7wVgRmBHoMBmcfEE3C",videoId:null},
      {title:"The Particle Noise — Spotlights",start:0,dur:297,spotifyUri:"spotify:track:0gKLC3xDK5ebycyG7TPLV1",videoId:null},
      {title:"Lifetime — SG Lewis",start:0,dur:286,spotifyUri:"spotify:track:4bmRJGOIegqYIBQrOga05Q",videoId:null},
      {title:"Seasons — Envoi",start:0,dur:197,spotifyUri:"spotify:track:48v2ON1RjkaANkXQfxns6V",videoId:null},
      {title:"Doublewide Stomp — Bodybox",start:0,dur:150,spotifyUri:"spotify:track:04Rx3Aov050pc9qvBIRUr1",videoId:null},
      {title:"Beneath the Lights - Jean Tonique Remix — Cool Company, Jean Tonique",start:0,dur:208,spotifyUri:"spotify:track:7lgWYZoQJR5JshT8BhDSZz",videoId:null},
      {title:"Out of the Shadows — Ely Eira",start:0,dur:201,spotifyUri:"spotify:track:7fBW6T3yvz3CqNRNA88unC",videoId:null},
      {title:"Maleny Drive — Upsetter",start:0,dur:168,spotifyUri:"spotify:track:46PJicWRDQU8L2ujtSdLUr",videoId:null},
      {title:"One More Weekend — Against The Current",start:0,dur:185,spotifyUri:"spotify:track:3w5ECOVehiYqMvrmqOxkoH",videoId:null},
      {title:"Hellion — Stateside",start:0,dur:210,spotifyUri:"spotify:track:31oZ7nYiBdrxue8zNc1wrh",videoId:null},
      {title:"Some Kind of Savior — Envoi",start:0,dur:179,spotifyUri:"spotify:track:4lg7lKE1ZTYKwRVhHB8H18",videoId:null},
      {title:"California Sober — Yours Truly",start:0,dur:163,spotifyUri:"spotify:track:7s5TCAqfDLMmOUqwsOXdId",videoId:null},
      {title:"All for One — Ely Eira, That Kid CG",start:0,dur:188,spotifyUri:"spotify:track:4f13rmavaGuReWwPx5Lovl",videoId:null},
      {title:"Compulsion (Ecstasy) — Malconfort",start:0,dur:237,spotifyUri:"spotify:track:2jJoe6dCpOx2tEI2NH4NIR",videoId:null},
      {title:"Everybody Move — Lucky Weather, Virgil Arles",start:0,dur:228,spotifyUri:"spotify:track:6BLWDimwf8eq6HGS2XEry6",videoId:null},
      {title:"Dead of Night — Daniel Olsén, Jonathan Eng, Linnea Olsson",start:0,dur:162,spotifyUri:"spotify:track:4LR9lsiSMySmMzZsbjkTMY",videoId:null},
      {title:"Once, My Home — Falaise",start:0,dur:436,spotifyUri:"spotify:track:0e2Onr27IkNYRzqH5Z5jlv",videoId:null},
      {title:"Finally Find You — Derivakat, Netrum",start:0,dur:229,spotifyUri:"spotify:track:331VMJ47qzIHs66FVntJyh",videoId:null},
      {title:"Lion Kid — Glass Cristina",start:0,dur:288,spotifyUri:"spotify:track:5mmnTsVaZnLr0Pd3v2VqOF",videoId:null},
      {title:"Soul Eater — Cactus Erectus",start:0,dur:105,spotifyUri:"spotify:track:7bNXZBciRdtpfy60G3SoUf",videoId:null},
      {title:"All Night — Formal One, Zack Banton",start:0,dur:203,spotifyUri:"spotify:track:3UoDW65JkDgGwynAthcnXM",videoId:null},
      {title:"Come Alive — Ely Eira",start:0,dur:235,spotifyUri:"spotify:track:1Qy1MGFGsEwqen3Uwnhb6p",videoId:null},
      {title:"The G Code — PeelingFlesh, Despised Icon",start:0,dur:301,spotifyUri:"spotify:track:5GJ5tFMFgRICqChCRu7iwP",videoId:null},
      {title:"Slaughterhouse 2 (feat. Chris Motionless) — Knocked Loose, Motionless In White, Chris Motionless",start:0,dur:184,spotifyUri:"spotify:track:3IXBQaQJ5ljpWwndAVvixg",videoId:null},
      {title:"Nano — Tanger",start:0,dur:209,spotifyUri:"spotify:track:1EQqlnq4x0Tybn09W2BldN",videoId:null},
      {title:"Passage D — The Flashbulb",start:0,dur:120,spotifyUri:"spotify:track:0rS0eglXz6PClT30yiHUsL",videoId:null},
      {title:"White Shirt Blue Jeans (feat. Dwara) — Kevin The Bear, Dwara",start:0,dur:161,spotifyUri:"spotify:track:5BdEwGuAyhRN2p12oEmWII",videoId:null},
      {title:"Mr. Magic — Nathalia",start:0,dur:190,spotifyUri:"spotify:track:3uD9UK1C4FcScyc4Zl8v7U",videoId:null},
      {title:"Days — Car Kiss",start:0,dur:256,spotifyUri:"spotify:track:2Ov9lxystESQN3V1PUcIow",videoId:null},
      {title:"WARM NIGHTS — veggi, narou, daste.",start:0,dur:177,spotifyUri:"spotify:track:3bwKRxUkoiavDuu088mVOH",videoId:null},
      {title:"Not for Nothing — Driveways",start:0,dur:241,spotifyUri:"spotify:track:3EWQPqIIIv7A0Unj9B5Hr1",videoId:null},
      {title:"All That I'm Not — Yours Truly",start:0,dur:187,spotifyUri:"spotify:track:5enpPnbMM3dWBhy7bZn7BX",videoId:null},
      {title:"NEVER MADE SENSE — DANI",start:0,dur:157,spotifyUri:"spotify:track:28qJbl3fuzqxk95RBuoUhp",videoId:null},
      {title:"You Said You Were Ready — Valienta",start:0,dur:196,spotifyUri:"spotify:track:4TXxaOgc8OquVPLvZhtsJR",videoId:null},
      {title:"But, What If I Fly? — Chrissy Costanza",start:0,dur:200,spotifyUri:"spotify:track:2SdZ011bvuNC0N1Hlkel05",videoId:null},
      {title:"Dr. Frankenstein — RedHook, Holding Absence",start:0,dur:201,spotifyUri:"spotify:track:2NV0wCTYTVHLIwxf4hBdOO",videoId:null},
      {title:"Story Of Us — In Her Own Words",start:0,dur:197,spotifyUri:"spotify:track:3wWDksNeeyLYT1eAD97r5a",videoId:null},
      {title:"Forever Ain't Long Enough (To Love You The Way I Want To) - Extended Version — Mathien, Soul Food Horns, Sam Howden, DESH, Aaron Paris",start:0,dur:460,spotifyUri:"spotify:track:5O4fQDVMrXxxEhmUdA0AIj",videoId:null},
      {title:"Red Line — Anna Yvette",start:0,dur:266,spotifyUri:"spotify:track:2JYDzji1fUnYRasWXI0qtH",videoId:null},
      {title:"Automatic — half•alive",start:0,dur:194,spotifyUri:"spotify:track:4WDzpyln8Ac9JbElIEv2bl",videoId:null},
      {title:"Lucky (Song 7) — Busty and the Bass",start:0,dur:232,spotifyUri:"spotify:track:2mLnBJjlMOcDWQcuMYqkOR",videoId:null},
      {title:"Walk This World With Me — The Home Team",start:0,dur:228,spotifyUri:"spotify:track:3YAbKZu8vQYOg8ddPOBV3T",videoId:null},
      {title:"I'm Your Man — Charles Fauna",start:0,dur:276,spotifyUri:"spotify:track:2Zn9mAxJ8ymoKM89dqdT4k",videoId:null},
      {title:"Septic — Axioma",start:0,dur:187,spotifyUri:"spotify:track:0xUTmUb6ulJJv3PJ8mPqbb",videoId:null},
      {title:"Who's Going Home With You Tonight? — Trapt",start:0,dur:215,spotifyUri:"spotify:track:2zK2Ap2flza7yxKyiNThF3",videoId:null},
      {title:"Call My Name — Yours Truly",start:0,dur:231,spotifyUri:"spotify:track:68nTQ2rSxgdjkalQpOdHbZ",videoId:null},
      {title:"The Line - from the series Arcane League of Legends — Twenty One Pilots, Arcane, League of Legends",start:0,dur:192,spotifyUri:"spotify:track:3qrTll9OQ9wcejTxPFY0qg",videoId:null},
      {title:"Stand By Me (feat. Morgan Wallen) — Lil Durk, Morgan Wallen",start:0,dur:219,spotifyUri:"spotify:track:1fXnu2HzxbDtoyvFPWG3Bw",videoId:null},
      {title:"Copy Planet — Circle of Sighs, NYTE VYPR, zombAe",start:0,dur:174,spotifyUri:"spotify:track:6tipFo23Px4e3EV23XhMfn",videoId:null},
      {title:"Regarding Still Being Addicted... — Jeremy Elliot",start:0,dur:171,spotifyUri:"spotify:track:6MwSCsBprtyWJL1v87N55g",videoId:null},
      {title:"The Movement — PYJÆN",start:0,dur:219,spotifyUri:"spotify:track:2gOl35EUQ2OYDFM4NnF3OV",videoId:null},
      {title:"80 Degrees — Isaac Lewis, My Favorite Color",start:0,dur:206,spotifyUri:"spotify:track:1mSRzlMxxZ1CSRMUIx8wyo",videoId:null},
      {title:"Cut Your Ribbon — Sparta",start:0,dur:185,spotifyUri:"spotify:track:1DYud4lcStjYxJ8JBBva6g",videoId:null},
      {title:"Moonside — Robotaki",start:0,dur:150,spotifyUri:"spotify:track:4CxzGNssLWrUwexAphiXgY",videoId:null},
      {title:"Transcendence — Labyrinthus Stellarum",start:0,dur:398,spotifyUri:"spotify:track:56m3H4IrnOC3TYdVoELSqA",videoId:null},
      {title:"Petricor — Svdestada",start:0,dur:233,spotifyUri:"spotify:track:6cWWrwRzSDcHW341wN7zTm",videoId:null},
      {title:"Mute — Native Construct",start:0,dur:381,spotifyUri:"spotify:track:22aqrz9Kehs2rL5u7HYypu",videoId:null},
      {title:"The Promise — When In Rome",start:0,dur:221,spotifyUri:"spotify:track:48p5E25cFPanxuwCTmTpuL",videoId:null},
      {title:"REMEMBER — Miami Horror, Tim Ayre",start:0,dur:219,spotifyUri:"spotify:track:3kuSEpeOT2IuPaIynwpcjq",videoId:null},
      {title:"I DON'T LEAVE THE HOUSE ANYMORE — rabu",start:0,dur:188,spotifyUri:"spotify:track:34VpQg6COT7CkGYXWqwFLd",videoId:null},
      {title:"Nocturnal — Disclosure, The Weeknd",start:0,dur:405,spotifyUri:"spotify:track:2ZbqLzPVJxwJ5KPVXb3KaL",videoId:null},
      {title:"What Have They Done To Us (ft. Sasha Alex Sloan) (from the series Arcane League of Legends) — Mako, Grey, Sasha Alex Sloan, Arcane, League of Legends",start:0,dur:200,spotifyUri:"spotify:track:0KyJJxfwWhcAHo06dahkQK",videoId:null},
      {title:"Blood Sport — Sleep Token",start:0,dur:247,spotifyUri:"spotify:track:30uhVtb7vfBoUkyGpcvYGJ",videoId:null},
      {title:"Stare at Me — JANE HANDCOCK, Anderson .Paak",start:0,dur:236,spotifyUri:"spotify:track:5OQGljb4oGPYojBFpNrQ4a",videoId:null},
      {title:"Clubbed to Death - Kurayamino Variation — Rob Dougan",start:0,dur:447,spotifyUri:"spotify:track:0vSVDF2fHaxL2L9eEmRdAK",videoId:null},
      {title:"Ohio Rizz — Putrid Stu, Disfiguring The Goddess",start:0,dur:167,spotifyUri:"spotify:track:4IEiEXYKF70Y9AtIZBDLEC",videoId:null},
      {title:"Ocean Prime — Skrilla",start:0,dur:162,spotifyUri:"spotify:track:568q2Pgt6Mlxxi2uo3UOCN",videoId:null},
      {title:"Pulse — Luminist",start:0,dur:236,spotifyUri:"spotify:track:0QpkvTXjcvGJ11uNiFCmcp",videoId:null},
      {title:"I Can't — Bace",start:0,dur:234,spotifyUri:"spotify:track:5ChUUHDOnD8vSH3R9DjILA",videoId:null},
      {title:"Beautiful Colors - from Kaiju No. 8 — OneRepublic",start:0,dur:157,spotifyUri:"spotify:track:3Tdih47Fm5lGlwc4qsqFGr",videoId:null},
      {title:"The Reply — Agriculture",start:0,dur:389,spotifyUri:"spotify:track:6C4MS01E2CU2vp8FkHbOHT",videoId:null},
      {title:"VOIDS — Pretty Patterns, vally.exe",start:0,dur:229,spotifyUri:"spotify:track:66XoO4zJgMsW1zJ9STn0oC",videoId:null},
      {title:"Ghosts 'n' Stuff — deadmau5",start:0,dur:195,spotifyUri:"spotify:track:5m4taQjTIjgEBU6mWpv5OC",videoId:null},
      {title:"Stone Age — Antonio Barret",start:0,dur:202,spotifyUri:"spotify:track:4wn47KBZsGSKxkjJA3MHiU",videoId:null},
      {title:"The Ladder — Johnny Booth",start:0,dur:260,spotifyUri:"spotify:track:25vVtf3MSsuZWkbA4lFK0L",videoId:null},
      {title:"Thank You (feat. Liv Campbell) - Winslow Remix — Rudimental, Liv Campbell, Winslow",start:0,dur:327,spotifyUri:"spotify:track:5DWbfbyJO9B5s8tkLBdgcV",videoId:null},
      {title:"SNOWFLAKE.001 — Take A Daytrip, NEW STATIC",start:0,dur:173,spotifyUri:"spotify:track:7xcZcJMlm2FqqM3PWW83gk",videoId:null},
      {title:"Valor — Sarah Schachner",start:0,dur:168,spotifyUri:"spotify:track:6ieTsp8CHXEi0gWgvCOm0Y",videoId:null},
      {title:"Blackout — Breathe Carolina",start:0,dur:210,spotifyUri:"spotify:track:0Xm1uwAeW0ujb1AWRgZOdT",videoId:null},
      {title:"FRESH BAKED BREAD — Daily Bread, EAZYBAKED",start:0,dur:181,spotifyUri:"spotify:track:4wj0LATYaC2mt9wSOrmbzC",videoId:null},
      {title:"Water Baby — Tom Misch, Loyle Carner",start:0,dur:272,spotifyUri:"spotify:track:2xOdFPQn17smnZrFCtFNSv",videoId:null},
      {title:"Starman - 2012 Remaster — David Bowie",start:0,dur:254,spotifyUri:"spotify:track:0pQskrTITgmCMyr85tb9qq",videoId:null},
      {title:"Ultraviolet — Redside",start:0,dur:218,spotifyUri:"spotify:track:6nxWD7jiwzwtHA3cNcWi1l",videoId:null},
      {title:"Wishes — Grant, McCall",start:0,dur:241,spotifyUri:"spotify:track:4H1FdAyWZBNzwcHFQYeGy6",videoId:null},
      {title:"Velcro — Stand Atlantic",start:0,dur:208,spotifyUri:"spotify:track:3a76rzObHzW2ybgktTS4Ga",videoId:null},
      {title:"Shimmer — KOAN Sound",start:0,dur:240,spotifyUri:"spotify:track:7FdSNNPfY6N0PBoYDEQUtN",videoId:null},
      {title:"Say My Name — ODESZA, Zyra",start:0,dur:263,spotifyUri:"spotify:track:1LeItUMezKA1HdCHxYICed",videoId:null},
      {title:"What's In Your Heart — Effin",start:0,dur:243,spotifyUri:"spotify:track:2xGFTN4MLVZyl2kKdyQQ8z",videoId:null},
      {title:"Arco Iris — 48 Ocean",start:0,dur:273,spotifyUri:"spotify:track:5krhik0f5RIWWjGxJgWTPA",videoId:null},
      {title:"Late Night — ODESZA",start:0,dur:229,spotifyUri:"spotify:track:5Nu5Uyoauauy9LFePYL1Z3",videoId:null},
      {title:"Life Goes On — Oliver Tree",start:0,dur:162,spotifyUri:"spotify:track:0eu4C55hL6x29mmeAjytzC",videoId:null},
      {title:"Ode to 55th Street — Wiggavisceration, Acid Ingestion",start:0,dur:169,spotifyUri:"spotify:track:6LIwOgQVlE1pC11ipCOe6F",videoId:null},
      {title:"If Time Has Gone — The Maneken",start:0,dur:275,spotifyUri:"spotify:track:06H210X9BtpgjwpdX238OF",videoId:null},
      {title:"Bengalas — Svdestada",start:0,dur:170,spotifyUri:"spotify:track:0TKx90nKZ1amdvyiaD67N7",videoId:null},
      {title:"Lost In Thought — KOAN Sound",start:0,dur:400,spotifyUri:"spotify:track:4kas7msUGWdehI8RSe6f8j",videoId:null},
      {title:"Raindrops — Mblue, George Cooksey",start:0,dur:162,spotifyUri:"spotify:track:0egvzw5Yk1e4iX4DFwM4kx",videoId:null},
      {title:"Will Be Stronger — Collect 200",start:0,dur:268,spotifyUri:"spotify:track:3v0cCZ81250KozWh3gbDwb",videoId:null},
      {title:"Altered Course - Remastered — ISIS",start:0,dur:597,spotifyUri:"spotify:track:1SZu5cBAoGYQAL8PoZ2atZ",videoId:null},
      {title:"Призраки зимы — Bird Bone",start:0,dur:234,spotifyUri:"spotify:track:2eIYFKztFOgr04rDeh4sWC",videoId:null},
      {title:"gimme gimme — Duumu",start:0,dur:142,spotifyUri:"spotify:track:7c9FjnBJlEIzGArWX6LvOe",videoId:null},
      {title:"Give You Up - Darius Edit — Crayon, Partyfine, KLP, Darius",start:0,dur:281,spotifyUri:"spotify:track:3fClspmh9jTFNj60iHqu2X",videoId:null},
      {title:"farewell, i found peace — jinkasei",start:0,dur:384,spotifyUri:"spotify:track:4hmBsGVoucl4S4lBktBPxt",videoId:null},
      {title:"Can't Sleep at Night — Erythh",start:0,dur:208,spotifyUri:"spotify:track:4g6DFFIbZLOMThyYjZqRIa",videoId:null},
      {title:"DISKO MUSHROOM — Sunni Colón",start:0,dur:212,spotifyUri:"spotify:track:2NE7hPzpkNG2aKR8ydWBuX",videoId:null},
      {title:"Assumptions - slowed down version — Sam Gellaitry",start:0,dur:278,spotifyUri:"spotify:track:4QhTDQlt5M2sp2DNWnVift",videoId:null},
      {title:"Corners Of The Earth — ODESZA, RY X",start:0,dur:305,spotifyUri:"spotify:track:2pD1x1iL0gsvg7Kbhpuf8W",videoId:null},
      {title:"Closer to the Ground — Supertaste",start:0,dur:238,spotifyUri:"spotify:track:7MPEw28Mx76PpgKw9aftL9",videoId:null},
      {title:"DON'T BELIEVE IT - GRiZ Remix — John Summit, Absolutely, GRiZ",start:0,dur:213,spotifyUri:"spotify:track:4Xw0xSHDXAkilxAt2X9hIZ",videoId:null},
      {title:"Spinnin — ilysm",start:0,dur:117,spotifyUri:"spotify:track:1nyBYBqXKCEiNKomS992bU",videoId:null},
    ],
    biomes: [
      {id:"beach",name:"Sunset Strandbar",emoji:"🌊",cssClass:"biome-beach",keywords:["beach", "coast", "sea", "bay", "shore", "harbor", "surf", "island", "cove", "marina", "waterfront"],defaultTracks:[6, 16, 17, 31, 35, 39, 49, 64, 77, 97, 117, 159, 169, 170, 172, 178, 249, 258, 275, 276, 302, 303, 337, 347, 359, 376, 391, 416, 423, 440, 445, 453, 465]},
      {id:"city",name:"Neon Downtown",emoji:"🏙️",cssClass:"biome-city",keywords:["city", "downtown", "urban", "metro", "avenue", "street", "plaza", "district", "midtown"],defaultTracks:[1, 10, 13, 18, 33, 48, 69, 71, 78, 89, 111, 114, 115, 150, 165, 171, 173, 179, 197, 206, 214, 222, 259, 262, 277, 295, 305, 308, 319, 323, 328, 353, 367, 370, 385, 405, 409, 422, 425, 428, 429, 437, 454, 472]},
      {id:"forest",name:"Mossy Trail",emoji:"🌲",cssClass:"biome-forest",keywords:["forest", "woods", "park", "trail", "nature", "grove", "jungle", "botanical", "garden", "wilderness", "hiking"],defaultTracks:[5, 32, 42, 50, 61, 125, 201, 202, 223, 233, 238, 256, 268, 321, 324, 343, 350, 364, 372, 381, 420, 458, 460, 468, 470, 471]},
      {id:"mountain",name:"The Summit",emoji:"🌋",cssClass:"biome-mountain",keywords:["mountain", "hill", "summit", "peak", "cliff", "canyon", "valley", "ridge", "alpine", "volcano", "rocky"],defaultTracks:[4, 79, 80, 94, 113, 116, 124, 151, 157, 184, 187, 188, 192, 193, 280, 307, 322, 325, 331, 333, 336, 366, 399, 421, 427, 435, 441, 442, 462, 463]},
      {id:"desert",name:"Mirage Highway",emoji:"🏜️",cssClass:"biome-desert",keywords:["desert", "sand", "dune", "arid", "mesa", "plateau", "badlands", "scrub", "dry", "nevada", "arizona", "mojave"],defaultTracks:[63, 75, 90, 95, 104, 182, 190, 199, 237, 254, 263, 279, 285, 287, 332, 358, 369, 383, 384, 438, 469]},
      {id:"town",name:"Pop-Punk Suburbia",emoji:"🏘️",cssClass:"biome-town",keywords:["suburb", "town", "village", "neighborhood", "residential", "hamlet", "township", "borough", "community", "estate"],defaultTracks:[11, 15, 47, 56, 72, 91, 96, 99, 109, 140, 145, 152, 161, 181, 208, 210, 211, 213, 216, 217, 218, 219, 221, 226, 228, 229, 235, 239, 244, 255, 261, 265, 267, 270, 273, 274, 281, 294, 296, 297, 298, 300, 311, 313, 314, 315, 316, 320, 327, 340, 342, 356, 374, 395, 396, 401, 406, 410, 417, 455]},
      {id:"ocean",name:"Deep Blue",emoji:"🐋",cssClass:"biome-ocean",keywords:["ocean", "gulf", "strait", "channel", "pacific", "atlantic", "lake", "river"],defaultTracks:[2, 21, 23, 62, 68, 110, 118, 126, 132, 133, 134, 135, 144, 149, 164, 176, 186, 236, 289, 299, 345, 352, 382, 419, 446, 457]},
      {id:"shopping",name:"Mall Pop",emoji:"🛍️",cssClass:"biome-shopping",keywords:["mall", "shopping", "market", "store", "retail", "plaza", "center", "outlet", "commercial", "arcade"],defaultTracks:[3, 22, 24, 34, 44, 60, 70, 73, 84, 105, 106, 108, 137, 167, 180, 195, 207, 212, 227, 252, 266, 271, 317, 326, 334, 351, 355, 361, 362, 379, 392, 402, 404, 443, 451, 464]},
      {id:"port",name:"Dockyard Static",emoji:"⚓",cssClass:"biome-port",keywords:["port", "dock", "pier", "wharf", "terminal", "shipyard", "industrial", "warehouse", "harbor", "freight", "airport"],defaultTracks:[20, 38, 51, 65, 86, 87, 119, 121, 128, 129, 130, 131, 139, 174, 175, 183, 191, 282, 290, 365, 403, 413]},
    ]
  }
];

const PRESET_CUSTOM = [
  {id:'home',  name:'Home',   emoji:'🏠', cssClass:'biome-home',   isCustom:true,isPreset:true,lat:null,lon:null,radius:200,
   packTracks:{'hoenn':[3,9,28,10],'kanto':[1,2,8,12],'smb3':[0,8,17,31],'halo_reach':[10,11,12,19],'terraria':[54,60,1,40],'pachipatch':[0, 8, 14, 26, 27, 28, 43, 45, 53, 67, 82, 100, 103, 143, 147, 160, 162, 166, 205, 220, 243, 250, 251, 269, 309, 341, 363, 394, 418, 424, 444, 466, 467]}},
  {id:'work',  name:'Work',   emoji:'💼', cssClass:'biome-work',   isCustom:true,isPreset:true,lat:null,lon:null,radius:200,
   packTracks:{'hoenn':[20,23,25,44],'kanto':[7,25,15,22],'smb3':[25,16,19,6],'halo_reach':[7,6,4,2],'terraria':[34,49,37,56],'pachipatch':[19, 36, 40, 57, 59, 112, 136, 156, 168, 189, 194, 196, 204, 241, 242, 368, 375, 389, 390, 432, 450, 459]}},
  {id:'school',name:'School', emoji:'🎓', cssClass:'biome-school', isCustom:true,isPreset:true,lat:null,lon:null,radius:200,
   packTracks:{'hoenn':[35,11,4,14],'kanto':[3,13,10,2],'smb3':[17,1,0,2],'halo_reach':[11,12,10,0],'terraria':[54,14,1,40],'pachipatch':[25, 30, 54, 83, 85, 101, 107, 123, 138, 142, 153, 155, 158, 198, 209, 215, 224, 225, 230, 231, 232, 234, 245, 246, 247, 253, 257, 260, 264, 284, 291, 292, 301, 312, 318, 335, 357, 360, 373, 411, 426, 434, 448, 449]}},
  {id:'gym',   name:'Gym',    emoji:'🏋️', cssClass:'biome-gym',    isCustom:true,isPreset:true,lat:null,lon:null,radius:200,
   packTracks:{'hoenn':[36,37,11,73],'kanto':[18,30,10,29],'smb3':[16,28,40,3],'halo_reach':[4,5,9,8],'terraria':[6,11,13,39],'pachipatch':[7, 9, 12, 29, 37, 46, 52, 55, 58, 74, 81, 88, 93, 98, 102, 120, 122, 127, 141, 146, 154, 163, 177, 203, 240, 272, 278, 283, 288, 293, 306, 310, 329, 338, 339, 348, 349, 387, 388, 400, 430, 439, 456, 461]}},
];

const EMOJI_OPTIONS = [
  '🏠','💼','🎓','🏋️','☕','🍕','🎮','🏖️','🌙','🌄','🎵','🏥','🏪','🌳',
  '⛽','🎪','🏨','🍔','🎯','🚂','🌸','🏔️','🎨','🎭','🏕️','🎸','🍜','🏄',
  '🚴','🎻','🦋','🌺','🎬','🍻','🏊','🎤','🚗','✈️','🚢','🏰','🗼','🎡',
  '🌊','🏜️','🌲','🌋','🏙️','⚓','🛍️','🌿','🔴','⚡','❄️','🌴','🏆','⭐',
  '🔮','🎲','🦁','🐺','🦊','🐉','🦅','🌈','💎','🗺️','📍','🎯','🏹','⚔️'
];
const PACK_EMOJIS = [
  '🌿','🔴','🌊','⚡','🌙','🌸','🔥','❄️','🌴','🎮','🏆','⭐',
  '🎵','🎸','🎹','🎺','🥁','🎤','🎼','🎧','📻','🎷','🪗','🎻',
  '🌍','🌎','🌏','🗺️','🏔️','🌋','🏝️','🌃','🌆','🌇','🌉','🎆',
  '🔮','💎','👾','🤖','👻','🐉','🦄','🌈','💫','✨','🌟','💥'
];

// ═══════════════════════════════════════════
// PERSISTENCE
// ═══════════════════════════════════════════
const STORE_KEY = 'geovibes_v4';
function loadStore(){try{return JSON.parse(localStorage.getItem(STORE_KEY)||'{}')}catch(e){return{}}}
function saveStore(d){try{localStorage.setItem(STORE_KEY,JSON.stringify(d))}catch(e){}}
function gs(k,def){const s=loadStore();return s[k]!==undefined?s[k]:def}
function ss(k,v){const s=loadStore();s[k]=v;saveStore(s)}

// pack id
function getActivePackId(){return gs('activePackId','hoenn')}
function setActivePackId(id){ss('activePackId',id)}
function getUserPacks(){return gs('userPacks',[])}
function saveUserPacks(arr){ss('userPacks',arr)}

function getAllPacks(){return [...BUILTIN_PACKS,...getUserPacks()]}
function getActivePack(){return getAllPacks().find(p=>p.id===getActivePackId())||BUILTIN_PACKS[0]}

// per-pack overrides: names, emojis, track lists, pins
function packKey(packId,key){return `pack_${packId}_${key}`}
function getBiomeOverride(packId,biomeId){return gs(packKey(packId,'biomeOverrides'),{})[biomeId]||{}}
function setBiomeOverride(packId,biomeId,obj){
  const all=gs(packKey(packId,'biomeOverrides'),{});
  all[biomeId]={...all[biomeId],...obj};
  ss(packKey(packId,'biomeOverrides'),all);
}
function getLocTracks(packId,locId){
  const overrides=gs(packKey(packId,'locTracks'),{});
  if(overrides[locId]!==undefined)return overrides[locId];
  // default from pack biomes
  const pack=getAllPacks().find(p=>p.id===packId);
  if(pack){const b=pack.biomes.find(b=>b.id===locId);if(b)return[...(b.defaultTracks||[])];}
  // preset custom locations — use pack-specific defaults if available
  const preset=PRESET_CUSTOM.find(p=>p.id===locId);
  if(preset&&preset.packTracks){
    // Use the base pack id (strip 'custom_' forks back to original)
    const baseId=pack?._forkedFrom||packId;
    if(preset.packTracks[baseId])return[...preset.packTracks[baseId]];
    if(preset.packTracks[packId])return[...preset.packTracks[packId]];
    // Fallback: first available
    const first=Object.values(preset.packTracks)[0];
    if(first)return[...first];
  }
  const cl=getAllCustomLocs().find(l=>l.id===locId);
  if(cl)return cl.defaultTracks||[];
  return[];
}
function setLocTracks(packId,locId,arr){
  const t=gs(packKey(packId,'locTracks'),{});t[locId]=arr;ss(packKey(packId,'locTracks'),t);
  if(packSetupId&&packSetupId===packId) commitPackSetup(packId); // still setting up: becomes the starting layout
}
function getPinnedIdx(packId,locId){return gs(packKey(packId,'pins'),{})[locId]}
function setPinnedIdx(packId,locId,idx){
  const p=gs(packKey(packId,'pins'),{});
  if(idx===undefined)delete p[locId];else p[locId]=idx;
  ss(packKey(packId,'pins'),p);
}

function getAllCustomLocs(){
  const saved=gs('customLocs',[]);
  const presets=PRESET_CUSTOM.map(p=>({...p,...(saved.find(c=>c.id===p.id)||{})}));
  const userLocs=saved.filter(c=>!PRESET_CUSTOM.find(p=>p.id===c.id));
  return[...presets,...userLocs];
}
function saveCustomLocs(arr){ss('customLocs',arr)}

function getEffectiveBiome(packId,biomeId){
  const pack=getAllPacks().find(p=>p.id===packId);
  const base=pack?.biomes.find(b=>b.id===biomeId)||{};
  const ov=getBiomeOverride(packId,biomeId);
  return{...base,...ov};
}

// ═══════════════════════════════════════════
// PACK CUSTOMIZATION HELPERS
// ═══════════════════════════════════════════

// When a builtin pack is first customized (rename, emoji, add video, add track),
// transparently fork it into a user copy and activate that instead.
function ensurePackEditable(packId){
  const pack = getAllPacks().find(p => p.id === packId);
  if(!pack) return packId;
  if(!pack.builtin) return packId; // already user-owned

  // Fork it
  const newId = 'custom_' + packId + '_' + Date.now();
  const forked = {
    ...JSON.parse(JSON.stringify(pack)), // deep copy
    id: newId,
    name: pack.name + ' Custom',
    builtin: false,
    _forkedFrom: packId,
  };
  // Copy any existing per-pack store data
  ['biomeOverrides','locTracks','pins','deletedBiomes'].forEach(key => {
    const val = gs(packKey(packId, key), null);
    if(val !== null) ss(packKey(newId, key), val);
  });
  saveUserPacks([...getUserPacks(), forked]);
  setActivePackId(newId);
  renderPacksList();
  renderLocGrid();
  return newId;
}

// Get all tracks across all videos in a pack (flat, with videoIdx + trackIdx)
// ── TRACK / PACK SOURCES ──
// A track plays from Spotify if it has a spotifyUri, otherwise YouTube if it has a videoId.
const SOURCE_ORDER=['youtube','spotify','soundcloud','other'];
const SOURCE_LABELS={youtube:'YouTube',spotify:'Spotify',soundcloud:'SoundCloud',apple:'Apple Music',radio:'Local radio',other:'Other source'};
const SOURCE_ICONS={
  youtube:'<svg class="src-ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="1.5" y="4.5" width="21" height="15" rx="4.5" fill="#FF0033"/><path d="M10 8.8v6.4l5.6-3.2z" fill="#fff"/></svg>',
  spotify:'<svg class="src-ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.5" fill="#1DB954"/><path d="M6.6 9.3c3.6-1.1 7.7-.8 10.9 1M7.2 12.4c3-.9 6.2-.6 8.8.9M7.8 15.3c2.4-.6 4.8-.4 6.9.7" fill="none" stroke="#000" stroke-width="1.6" stroke-linecap="round"/></svg>',
  soundcloud:'<svg class="src-ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.5" fill="#FF5500"/><path d="M6.2 15.2h10.2a2.4 2.4 0 0 0 .3-4.8 3.6 3.6 0 0 0-6.6-1.2v6M8.8 10.4v4.8M7.5 11.6v3.6" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  apple:'<svg class="src-ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="1.5" y="1.5" width="21" height="21" rx="5.5" fill="#FA2D48"/><path d="M15.6 6v8.2a2.2 2.2 0 1 1-1.4-2V8.5l-4.6 1.1v6.1a2.2 2.2 0 1 1-1.4-2V8.4z" fill="#fff"/></svg>',
  radio:'<svg class="src-ic" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="2" fill="#fca5a5"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/></svg>',
  other:'<svg class="src-ic other" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'
};
function trackSource(t){
  if(t&&t.spotifyUri) return 'spotify';
  if(t&&t.soundcloudUrl) return 'soundcloud';
  if(t&&t.videoId) return 'youtube';
  return 'other';
}
function packSources(pack){
  const found=new Set(getAllPackTracks(pack).map(trackSource));
  if(!found.size && (pack?.videoId||pack?.videos?.length)) found.add('youtube'); // empty pack, but has a video set up
  return SOURCE_ORDER.filter(s=>found.has(s));
}
function sourceIconsHtml(sources){
  if(!sources.length) return '';
  const label='Plays from '+sources.map(s=>SOURCE_LABELS[s]).join(' + ');
  return '<span class="pack-sources" role="img" aria-label="'+esc(label)+'" title="'+esc(label)+'">'
    +sources.map(s=>SOURCE_ICONS[s]).join('')+'</span>';
}

function getAllPackTracks(pack){
  if(!pack) return [];
  // Legacy packs: single videoId + tracks array
  if(!pack.videos){
    return (pack.tracks||[]).map((t,i) => ({...t, videoId: ('videoId' in t) ? t.videoId : pack.videoId, globalIdx: i}));
  }
  // Multi-video packs
  let result = [], offset = 0;
  pack.videos.forEach((v,vi) => {
    (v.tracks||[]).forEach((t,ti) => {
      result.push({...t, videoId: ('videoId' in t) ? t.videoId : v.id, videoIdx: vi, trackIdx: ti, globalIdx: offset+ti});
    });
    offset += (v.tracks||[]).length;
  });
  return result;
}

// Get the videoId for a given global track index
function getTrackVideoId(pack, globalIdx){
  const allTracks = getAllPackTracks(pack);
  return allTracks[globalIdx]?.videoId || pack.videoId;
}

// ═══════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════
let currentLocId='beach', currentTrackPlayIdx=0, isPlaying=false, videoVisible=false;
let progressTimer=null, progressSeconds=0, lastLat=null, lastLon=null;
// ── TRACKING STATE ──
let trackingActive=false, trackingTimer=null, lastPollLat=null, lastPollLon=null;
let leafletMap=null, userMarker=null, customPinMarkers=[], radiusCircles=[];
const MOVE_THRESHOLD=50;    // metres — considered "driving" if exceeded
const POLL_FAST=30000;      // 30s when moving fast
const POLL_SLOW=180000;     // 3min when stationary
let editingLocId=null, editingLocIsCustom=false, editingPins=[];
// Shuffle queue — ensures every track plays before any repeats
let shuffleQueue=[];
// Biome Beats favourites playing right now (track numbers in the active pack); empty = the biome's own list
let favPlaying=null, favQueue=[], favTag='♥ Favourites · ';
function currentPackTIdx(){ if(favPlaying!=null) return favPlaying; const idxs=playIdxs(); return idxs[currentTrackPlayIdx]??idxs[0]; }
let pendingBiomeId=null; // biome queued to switch at next track end
let noticedBiomeId=null; // last pending biome we pinged about (so each new place chimes once)
function biomeDisplayName(id){
  const b=getActivePack()?.biomes?.find(x=>x.id===id);
  const ov=b?getBiomeOverride(getPackId(),id):null;
  return ov?.name||b?.name||getAllCustomLocs().find(l=>l.id===id)?.name||'';
}
// Live location found a different biome: ping, and say it switches after this track
function noticeBiome(id){
  if(!id||id===currentLocId){ noticedBiomeId=null; return; }
  if(noticedBiomeId===id) return;
  noticedBiomeId=id; chime('notice');
  const n=biomeDisplayName(id);
  if(trackingActive&&n) setTrackingUI(true,'Near '+n+' · switching after this track','pending');
}
function buildShuffleQueue(len, currentIdx){
  // Fisher-Yates shuffle of all indices except current
  const pool=[];
  for(let i=0;i<len;i++) if(i!==currentIdx) pool.push(i);
  for(let i=pool.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [pool[i],pool[j]]=[pool[j],pool[i]];
  }
  return pool;
}
let selectedLocEmoji='🏠', selectedPackEmoji='🌿';
let pickerTargetLocId=null;

// ── PLAYBACK HELPERS ──
function getActiveIframe(){return document.getElementById('ytFrameA');}

function crossfadeTo(src){
  // Crossfade removed — direct switch for now
  getActiveIframe().src=src;
}

function hardSwitchTo(src){
  getActiveIframe().src=src;
}

// ── SKIP WHAT CAN'T PLAY ── (Spotify, YouTube, SoundCloud; both modes)
// A song that can't play here (region-locked, removed, not allowed to embed) moves on to the next one
// with a short note, instead of leaving playback stuck. Five in a row stops, rather than looping forever.
let skipStreak=0, lastSkipFor='';
const SKIP_WHY={
  spotify:'That Spotify song can’t play here (it may not be available in your region). Skipping.',
  youtube:'That YouTube video can’t play here (removed, region-locked or not allowed on other sites). Skipping.',
  soundcloud:'That SoundCloud track can’t play here (the uploader limits it). Skipping.'
};
function playedOk(){ skipStreak=0; } // something really started playing
function skipUnplayable(source){
  const local=appMode==='local';
  // each play attempt is skipped once, even if its failure is reported twice (an error event and the stall check)
  const attempt=(local?'c':'p')+(local?chanPlayToken:packsPlayToken);
  if(attempt===lastSkipFor) return;
  lastSkipFor=attempt; setPlayerBusy(false);
  if(++skipStreak>5){
    skipStreak=0;
    spotifyShowSnack('Several songs in a row couldn’t play here, so playback stopped. Try another '+(local?'channel':'pack')+'.');
    if(local) stopChanPlayback(); else { isPlaying=false; pauseTrack(); }
    setPlayIcon(false); document.getElementById('playingBars').style.display='none';
    return;
  }
  spotifyShowSnack(SKIP_WHY[source]||'That song can’t play here. Skipping.');
  if(local){ if(chanItems.length>1) chanStep(1); else { stopChanPlayback(); setPlayIcon(false); } }
  else { isPlaying=true; nextTrack(); }
}
// Spotify doesn't always report a song it can't play: it just sits at the start. A song still at the very
// start ~6 s after it should have begun is skipped; one paused part-way (by you, anywhere) is left alone.
let spStall=null, spOverrunFor='', spLast=null;
function spotifyWatch(st,wantPlaying){
  if(!st||!wantPlaying){ spStall=null; return; }
  const uri=st.uris?.[0]||'', pos=st.position||0;
  if(!st.paused&&pos>0&&pos<=(st.duration||Infinity)) spLast={uris:st.uris||[], pos}; // where it got to, for picking up after sleep
  // "Playing" well past the end of the song: the browser player stalled at the boundary (page hidden, phone
  // asleep) and won't start the next one by itself. Move on, as the end of the song would have.
  if(!st.paused&&st.duration>0&&pos>st.duration+4000){
    if(spOverrunFor===uri) return;
    spOverrunFor=uri; spStall=null; window.mmLogNote?.('Spotify stalled at the end of a song: moving on');
    if(appMode==='local'){ if(chanItems.length>1) chanStep(1); } else nextTrack();
    return;
  }
  if(pos<st.duration) spOverrunFor='';
  if(pos>3000){ spStall=null; playedOk(); return; }
  if(uri&&uri===spHeard){ spStall=null; return; } // it played: back at 0:00 means it ended (handled in onSpotifyState)
  if(pos<1500&&(st.paused||(spStall&&spStall.uri===uri&&spStall.pos===pos))){
    if(!spStall||spStall.uri!==uri){ spStall={uri,pos,since:Date.now()}; return; }
    if(Date.now()-spStall.since>6000){ spStall=null; skipUnplayable('spotify'); }
  } else spStall=null;
}

// ── SOUNDCLOUD (custom packs) ──
// Plays in SoundCloud's own embedded player (its Widget API): no account or key needed. Some tracks are limited by
// SoundCloud or the uploader: Go+ tracks only play a 30-second preview, and some can't be embedded at all (skipped).
const SC_URL_RE=/^https:\/\/(?:www\.|m\.)?soundcloud\.com\/([A-Za-z0-9_-]{1,100})\/(sets\/)?([A-Za-z0-9_-]{1,200})\/?(?:[?#].*)?$/;
const SC_RESERVED=['discover','search','you','stream','upload','charts','pages','people','tags','stations','messages','notifications','settings','terms-of-use','pro','mobile'];
function parseSoundCloudLink(raw){
  const m=String(raw||'').trim().match(SC_URL_RE);
  if(!m||SC_RESERVED.includes(m[1].toLowerCase())) return null;
  return {kind:m[2]?'set':'track', url:'https://soundcloud.com/'+m[1]+'/'+(m[2]||'')+m[3], slug:m[3]};
}
function scTrackUrl(u){ const p=parseSoundCloudLink(u); return p&&p.kind==='track'?p.url:''; }
function scEmbedSrc(url,autoplay){
  return 'https://w.soundcloud.com/player/?url='+encodeURIComponent(url)+'&auto_play='+(autoplay?'true':'false')+'&visual=true&show_comments=false&hide_related=true&show_reposts=false&show_teaser=false';
}
let scApiReady=null;
function scLoadApi(){
  if(window.SC?.Widget) return Promise.resolve();
  if(scApiReady) return scApiReady;
  scApiReady=new Promise((res,rej)=>{
    const s=document.createElement('script'); s.src='https://w.soundcloud.com/player/api.js'; s.async=true;
    s.onload=()=>res(); s.onerror=()=>{ scApiReady=null; rej(new Error('SoundCloud could not load. Check your connection.')); };
    document.head.appendChild(s);
  });
  return scApiReady;
}
const scIsPreview=s=>!!s&&(s.policy==='SNIP'||(s.full_duration>0&&s.duration>0&&s.duration<s.full_duration-1000));
// Read a track or playlist link in a hidden player: its songs, lengths and permalinks
async function scReadLink(link){
  await scLoadApi();
  return new Promise((resolve,reject)=>{
    const fr=document.createElement('iframe');
    fr.style.cssText='position:absolute;width:2px;height:2px;left:-9999px;top:0;border:0'; fr.title='SoundCloud'; fr.allow='autoplay';
    fr.src=scEmbedSrc(link.url,false); document.body.appendChild(fr);
    let done=false;
    const finish=(v,e)=>{ if(done) return; done=true; clearTimeout(to); fr.remove(); e?reject(e):resolve(v); };
    const to=setTimeout(()=>finish(null,new Error('SoundCloud didn’t answer. The link may be private or not allowed to embed.')),20000);
    const w=SC.Widget(fr);
    w.bind(SC.Widget.Events.ERROR,()=>finish(null,new Error('SoundCloud can’t play that link here (private, removed, or not allowed to embed).')));
    w.bind(SC.Widget.Events.READY,()=>w.getSounds(sounds=>{
      const list=(Array.isArray(sounds)?sounds:[]).filter(s=>s&&typeof s.title==='string'&&scTrackUrl(s.permalink_url)).slice(0,500);
      if(!list.length) return finish(null,new Error('No playable SoundCloud tracks found in that link.'));
      const tracks=list.map(s=>({
        title:String(s.title).slice(0,120)+(s.user?.username?' — '+String(s.user.username).slice(0,60):''),
        start:0, dur:Math.max(1,Math.round((s.duration||0)/1000))||180, soundcloudUrl:scTrackUrl(s.permalink_url), videoId:null
      }));
      const title=link.kind==='set'?link.slug.replace(/[-_]+/g,' '):tracks[0].title;
      finish({title, tracks, previews:list.filter(scIsPreview).length});
    }));
  });
}
async function miAddSoundCloud(link){
  const status=document.getElementById('miUrlStatus');
  if(miVideos.find(v=>v.type==='soundcloud'&&v.url===link.url)){ status.textContent='Already added'; return; }
  busyText(status,'Reading SoundCloud '+(link.kind==='set'?'playlist':'track')+'…'); status.className='url-status';
  try{
    const got=await scReadLink(link);
    miVideos.push({type:'soundcloud', kind:link.kind, url:link.url, title:String(got.title).slice(0,80), tracks:got.tracks, previews:got.previews});
    const nameEl=document.getElementById('miPackName');
    if(!nameEl.value.trim()) nameEl.value=String(got.title).slice(0,32);
    document.getElementById('miUrlInput').value='';
    status.textContent='✓ Added '+got.tracks.length+' song'+(got.tracks.length!==1?'s':'')+' from SoundCloud'
      +(got.previews?'. Note: '+got.previews+' of them only play a 30-second preview (SoundCloud Go+).':'');
    status.className=got.previews?'url-status warn':'url-status ok';
    renderMiVideoList();
  }catch(e){ status.textContent=e.message||'SoundCloud could not read that link.'; status.className='url-status err'; }
}
// Biome Beats playback: one player, reloaded with each track
let scWidget=null, scActive=false, scPos=0, scDur=0, scErrors=0, scWarned='', scFinishedAt=0;
function scBind(w){
  const E=SC.Widget.Events;
  w.bind(E.READY,()=>{ scErrors=0; });
  w.bind(E.PLAY,()=>{
    if(!scActive) return;
    scErrors=0; playedOk(); isPlaying=true; setPlayIcon(true); document.getElementById('playingBars').style.display='flex';
    w.getDuration(d=>{ scDur=d||0; });
    w.getCurrentSound(s=>{ if(scIsPreview(s)&&scWarned!==s.permalink_url){ scWarned=s.permalink_url; spotifyShowSnack('SoundCloud only allows a 30-second preview of this track.'); } });
  });
  // SoundCloud reports "paused" just before "finished": wait a moment so the end of a song isn't taken for a pause
  w.bind(E.PAUSE,()=>{ if(!scActive||!isPlaying) return; setTimeout(()=>{
    if(!scActive||!isPlaying||Date.now()-scFinishedAt<2000||document.visibilityState!=='visible') return;
    isPlaying=false; setPlayIcon(false); document.getElementById('playingBars').style.display='none';
  },500); });
  w.bind(E.PLAY_PROGRESS,e=>{ if(scActive) scPos=e?.currentPosition||0; });
  w.bind(E.FINISH,()=>{ scFinishedAt=Date.now(); if(scActive&&appMode!=='local'){ isPlaying=true; nextTrack(); } });
  w.bind(E.ERROR,()=>{ if(scActive&&appMode!=='local') skipUnplayable('soundcloud'); });
}
async function scPlay(url){
  await scLoadApi();
  scPos=0; scDur=0;
  const box=document.getElementById('ytContainer'); box?.classList.add('sc-mode');
  document.getElementById('scWrap').hidden=false;
  if(!scWidget){
    const fr=document.getElementById('scFrame');
    fr.src=scEmbedSrc(url,true);
    scWidget=SC.Widget(fr); scBind(scWidget);
  } else {
    scWidget.load(url,{auto_play:true,visual:true,show_comments:false,hide_related:true,show_reposts:false,show_teaser:false});
  }
}
function stopSoundCloud(){
  if(!scActive&&!scWidget) return;
  scActive=false;
  try{ scWidget?.pause(); }catch(e){}
  document.getElementById('ytContainer')?.classList.remove('sc-mode');
  const wrap=document.getElementById('scWrap'); if(wrap) wrap.hidden=true;
}

// ── TOUR ── a short, skippable first-visit guide (Settings > Help or the ? at the top reopen it)
const TOUR=[
  {title:'Welcome to MusicMap', text:'Music that fits where you are. Here’s a quick look around. Skip any time.'},
  {title:'Biome Beats', target:'.hero-player', text:'Game soundtracks that change with your surroundings: beach, city, forest and more. Here’s one of our favourites:',
    action:{label:'▶ Play “The Hall of Fame” · Hoenn Pack', run:()=>tourPlayHallOfFame()}},
  {title:'Listen to World', target:'#heroDetectBtn', text:'Tap it and MusicMap follows you, changing the music as you move. It only asks for your location when you tap it.'},
  {title:'Keep or skip', target:'.hero-controls', text:'♡ saves a track you love. 👎 stops one from playing again (undo it in Settings).'},
  {title:'Local Listening', target:'#modeBtnLocal', text:'Real music from where the pin is: the Popular chart, Homegrown artists and local Radio.'},
  {title:'Make it yours', target:'#tourHelpBtn', text:'Build your own packs from YouTube, Spotify or SoundCloud links in Packs. This tour is always here on the ?.'}
];
let tourAt=-1;
function openTour(e){
  if(e?.preventDefault) e.preventDefault();
  tourAt=0; showTourStep();
  document.getElementById('tourCard').hidden=false;
  setTimeout(()=>document.getElementById('tourNext')?.focus(),50);
}
function closeTour(){
  tourAt=-1; ss('tourSeen',true);
  document.getElementById('tourCard').hidden=true; document.getElementById('tourRing').hidden=true;
}
function tourGo(d){ const n=tourAt+d; if(n>=TOUR.length) return closeTour(); if(n<0) return; tourAt=n; showTourStep(); }
function showTourStep(){
  const s=TOUR[tourAt]; if(!s) return;
  document.getElementById('tourStep').textContent=(tourAt+1)+' / '+TOUR.length;
  document.getElementById('tourTitle').textContent=s.title;
  document.getElementById('tourText').textContent=s.text;
  const act=document.getElementById('tourAction'); act.innerHTML='';
  if(s.action){ const b=document.createElement('button'); b.type='button'; b.textContent=s.action.label; b.onclick=s.action.run; act.append(b); }
  const dots=document.getElementById('tourDots'); dots.innerHTML='';
  TOUR.forEach((_,i)=>{ const d=document.createElement('span'); if(i===tourAt) d.className='on'; dots.append(d); });
  document.getElementById('tourBack').hidden=tourAt===0;
  document.getElementById('tourNext').textContent=tourAt===TOUR.length-1?'Done':'Next';
  const el=s.target?document.querySelector(s.target):null;
  if(el&&el.offsetParent){ el.scrollIntoView({block:'center',behavior:'smooth'}); setTimeout(placeTourRing,450); }
  placeTourRing();
}
function placeTourRing(){
  const ring=document.getElementById('tourRing'), s=TOUR[tourAt];
  const el=s?.target?document.querySelector(s.target):null;
  if(!el||!el.offsetParent){ ring.hidden=true; return; }
  const r=el.getBoundingClientRect(), pad=6;
  Object.assign(ring.style,{left:(r.left-pad)+'px',top:(r.top-pad)+'px',width:(r.width+pad*2)+'px',height:(r.height+pad*2)+'px'});
  ring.hidden=false;
}
window.addEventListener('scroll',()=>{ if(tourAt>=0) placeTourRing(); },{passive:true});
window.addEventListener('resize',()=>{ if(tourAt>=0) placeTourRing(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&tourAt>=0) closeTour(); });
// The tour's demo: Hoenn's "The Hall of Fame", then the biome carries on
async function tourPlayHallOfFame(){
  if(appMode==='local') await setAppMode('packs');
  const pack=getAllPacks().find(p=>p.id==='hoenn'); if(!pack) return;
  const t=getAllPackTracks(pack).findIndex(x=>/hall of fame/i.test(x.title||'')); if(t<0) return;
  spotifyUnlockAudio();
  if(getActivePackId()!=='hoenn'){ isPlaying=false; await pauseTrack(); activatePack('hoenn'); }
  else switchTab('player');
  favPlaying=t; favQueue=[]; favTag='Tour · '; shuffleQueue=[];
  isPlaying=true; renderTrackList(); updateNowPlaying(); playCurrentTrack(false);
  setTimeout(placeTourRing,500);
}

// ── REPORT A PROBLEM ── sent to the site's MusicMap plugin (MusicMap > Reports); needs the plugin
const H2C_SRC='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
const H2C_SRI='sha384-ZZ1pncU3bQe8y31yfZdMFdSpttDoPmOZg2wguVK9almUodir1PghgT0eY7Mrty8H';
let reportShotData='', reportShotSeq=0;
function reportsAvailable(){ return /^https?:\/\//.test(MM_CONFIG.restBase||''); }
function applyReportButtons(){
  const on=reportsAvailable();
  ['reportRow','footerReport','tabReportBtn'].forEach(id=>{ const el=document.getElementById(id); if(el) el.hidden=!on; });
}
function openReport(e){
  if(e) e.preventDefault();
  if(!reportsAvailable()) return;
  document.getElementById('reportStatus').textContent='';
  document.getElementById('reportSend').disabled=false;
  document.getElementById('reportOverlay').classList.add('open');
  setTimeout(()=>document.getElementById('reportMessage').focus(),50);
  reportShotToggled(); // takes the screenshot now, so it shows the app as it was
}
function closeReport(){ document.getElementById('reportOverlay').classList.remove('open'); }
function loadHtml2canvas(){
  if(window.html2canvas) return Promise.resolve();
  return new Promise((res,rej)=>{
    const s=document.createElement('script'); s.src=H2C_SRC; s.integrity=H2C_SRI; s.crossOrigin='anonymous'; s.referrerPolicy='no-referrer';
    s.onload=()=>res(); s.onerror=()=>rej(new Error('Screenshot tool could not load'));
    document.head.appendChild(s);
  });
}
async function reportShotToggled(){
  const box=document.getElementById('reportShotBox'), want=document.getElementById('reportShot').checked;
  const seq=++reportShotSeq; reportShotData=''; box.innerHTML='';
  if(!want) return;
  const note=document.createElement('div'); note.className='note'; busyText(note,'Taking a screenshot of MusicMap…'); box.append(note);
  try{
    await loadHtml2canvas();
    const app=document.getElementById('geovibes-app');
    const scale=Math.min(1,1100/Math.max(app.scrollWidth,1));
    const canvas=await window.html2canvas(app,{useCORS:true,logging:false,backgroundColor:'#1a1a2e',scale,
      windowWidth:document.documentElement.clientWidth, ignoreElements:el=>el.id==='reportOverlay'||el.tagName==='IFRAME',
      onclone:safeColorsForScreenshot});
    if(seq!==reportShotSeq) return;
    let data=canvas.toDataURL('image/jpeg',0.72);
    if(data.length>1900000) data=canvas.toDataURL('image/jpeg',0.5);
    if(data.length>1900000) throw new Error('Screenshot too large');
    reportShotData=data;
    box.innerHTML='';
    const img=document.createElement('img'); img.alt='Screenshot that will be sent'; img.src=data;
    const n2=document.createElement('div'); n2.className='note'; n2.textContent='This screenshot will be sent with your report. Untick above to leave it out.';
    box.append(img,n2);
  }catch(e){
    if(seq!==reportShotSeq) return;
    box.innerHTML=''; const n3=document.createElement('div'); n3.className='note'; n3.textContent='Couldn’t take a screenshot ('+(e.message||'error')+'). You can still send the report.'; box.append(n3);
  }
}
// html2canvas 1.4 can't read newer colour formats (color(), oklch(), lab()…) and gives up on the whole
// screenshot. In its copy of the page, swap any such colour for a plain one it can draw.
function safeColorsForScreenshot(doc){
  // the app's inline icons leave out the SVG namespace (fine in a page); as images, Firefox refuses them without it
  doc.querySelectorAll('svg').forEach(s=>{ if(!s.getAttribute('xmlns')) s.setAttribute('xmlns','http://www.w3.org/2000/svg'); });
  const bad=/\b(color|oklch|oklab|lab|lch|hwb|color-mix|light-dark)\(/;
  const win=doc.defaultView;
  doc.querySelectorAll('#geovibes-app, #geovibes-app *').forEach(el=>{
    let cs; try{ cs=win.getComputedStyle(el); }catch(e){ return; }
    [['color','#e8e8e8'],['backgroundColor','transparent'],['borderTopColor','transparent'],['borderRightColor','transparent'],
     ['borderBottomColor','transparent'],['borderLeftColor','transparent'],['outlineColor','transparent'],['fill',''],['stroke','']].forEach(([prop,fallback])=>{
      const v=cs[prop]; if(v&&bad.test(v)) el.style[prop]=fallback||'currentColor';
    });
    if(bad.test(cs.backgroundImage||'')) el.style.backgroundImage='none';
    if(bad.test(cs.boxShadow||'')) el.style.boxShadow='none';
  });
}
function reportDetails(){
  const pl=localPoint?.place;
  return {
    version:MM_VERSION, mode:appMode, tab:document.querySelector('.tab-pane.active')?.id||'',
    channel:appMode==='local'?localChannel:'', pack:appMode!=='local'?(getActivePack()?.name||''):'', biome:appMode!=='local'?(currentLocId||''):'',
    nowPlaying:(document.getElementById('npTrack')?.textContent||'').slice(0,120), source:document.getElementById('npSource')?.title||'',
    playing:appMode==='local'?(chanPlaying||localPlaying):isPlaying,
    place:[pl?.city,pl?.region,pl?.country].filter(Boolean).join(', '), liveLocation:trackingActive,
    services:{spotify:isSpotifyConnected()?(spotifyCanPlay()?(spRemoteDevice()?'connected, plays on another device':'connected, this browser'):'connected, not ready'):'not connected',
      apple:APPLE_MUSIC_ON?(isAppleConnected()?'connected':'not connected'):'not set up', preferred:preferredPlatform()},
    layout:{wide:document.getElementById('geovibes-app')?.classList.contains('mm-wide')||false, mapShown:mapShown()},
    screen:innerWidth+'x'+innerHeight+' @'+(window.devicePixelRatio||1)+'x', language:navigator.language||'', online:navigator.onLine,
    browser:String(navigator.userAgent||'').slice(0,300), page:location.origin+location.pathname,
    log:(window.mmLog||[]).slice(-50)
  };
}
async function sendReport(){
  const msg=document.getElementById('reportMessage').value.trim(), email=document.getElementById('reportEmail').value.trim();
  const st=document.getElementById('reportStatus'), btn=document.getElementById('reportSend');
  if(msg.length<3){ st.textContent='Please describe what went wrong.'; st.className='url-status err'; return; }
  const body={message:msg.slice(0,2000)};
  if(email) body.email=email.slice(0,190);
  if(document.getElementById('reportDetails').checked) body.details=reportDetails();
  if(document.getElementById('reportShot').checked&&reportShotData) body.screenshot=reportShotData;
  btn.disabled=true; busyText(st,'Sending…'); st.className='url-status';
  try{
    const r=await fetch(MM_CONFIG.restBase+'report',{method:'POST',credentials:'omit',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    let j=null; try{ j=await r.json(); }catch(e){}
    if(!r.ok||!j?.ok) throw new Error(j?.error||'The report couldn’t be sent. Please try again later.');
    closeReport();
    document.getElementById('reportMessage').value=''; document.getElementById('reportEmail').value='';
    spotifyShowSnack('Thanks! Your report was sent.');
  }catch(e){ st.textContent=e.message; st.className='url-status err'; btn.disabled=false; }
}

// ── SUPPORT LINK ── "Buy me a coffee", set by the site owner in MusicMap > Settings
function applySupportLink(){ // runs from init(), once the site's settings (MM_CONFIG) exist
  const url=/^https:\/\/[^\s"'<>]{4,200}$/.test(MM_CONFIG.supportUrl||'')?MM_CONFIG.supportUrl:'';
  if(!url) return;
  document.querySelectorAll('a[data-support]').forEach(a=>{ a.href=url; });
  ['supportLink','amSupportNote','creditsSupport'].forEach(id=>{ const el=document.getElementById(id); if(el) el.hidden=false; });
}

// ── SCROLLING TITLES ── the now-playing lines slide when the text is too long to fit
let mqBusy=false;
function fitMarquee(el){
  if(!el) return;
  const text=el.textContent;
  let inner=el.firstElementChild;
  if(!inner||!inner.classList.contains('mq-inner')||el.childNodes.length!==1||inner.textContent!==text){
    mqBusy=true; el.textContent=''; inner=document.createElement('span'); inner.className='mq-inner'; inner.textContent=text; el.append(inner); mqBusy=false;
  }
  el.classList.remove('mq-on');
  const over=inner.scrollWidth-el.clientWidth;
  if(over>4){
    el.style.setProperty('--mq-shift',-(over+28)+'px'); // +28: the faded edges added while it scrolls
    el.style.setProperty('--mq-dur',Math.min(14,Math.max(6,3+over/30)).toFixed(1)+'s'); // about the same speed for any length
    el.classList.add('mq-on');
  }
}
['npTrack','npGame'].forEach(id=>{
  const el=document.getElementById(id); if(!el) return;
  let t=null; const refit=()=>{ if(mqBusy) return; clearTimeout(t); t=setTimeout(()=>fitMarquee(el),30); };
  new MutationObserver(refit).observe(el,{childList:true,characterData:true,subtree:true});
  if(window.ResizeObserver) new ResizeObserver(refit).observe(el);
  refit();
});

// ── WIDE LAYOUT ── player beside the tabs when the app itself is wide enough
function fitWideLayout(){
  const app=document.getElementById('geovibes-app'); if(!app) return;
  const wide=app.clientWidth>=880;
  if(app.classList.contains('mm-wide')===wide) return;
  app.classList.toggle('mm-wide',wide);
  if(leafletMap) setTimeout(()=>leafletMap.invalidateSize(),60); // the map's box changed size
}
if(window.ResizeObserver){ const app=document.getElementById('geovibes-app'); if(app) new ResizeObserver(fitWideLayout).observe(app); }
window.addEventListener('resize',fitWideLayout);

// ── LOCATION CHIMES ──
// A soft ping when a new place is noticed, and a gentle two-note chime when the music switches to it.
// Made with Web Audio (no sound files). Browsers only allow sound after a tap, so the first tap unlocks it.
let chimeCtx=null;
function chimesOn(){ return gs('locationChimes',true)!==false; }
function unlockChimes(){
  try{ chimeCtx=chimeCtx||new (window.AudioContext||window.webkitAudioContext)(); if(chimeCtx.state==='suspended') chimeCtx.resume(); }catch(e){}
}
document.addEventListener('pointerdown',unlockChimes,{once:true,capture:true});
function chime(kind){ // 'notice' | 'switch'
  if(!chimesOn()||!chimeCtx) return;
  try{
    if(chimeCtx.state==='suspended') chimeCtx.resume();
    const t0=chimeCtx.currentTime+0.03;
    const notes=kind==='switch'?[[659.25,0],[987.77,0.16]]:[[880,0]]; // E5 then B5 · a single A5
    notes.forEach(([f,dt])=>{
      [[f,0.07],[f*2,0.018]].forEach(([freq,vol])=>{ // the note plus a faint overtone: bell-like, not beepy
        const o=chimeCtx.createOscillator(), g=chimeCtx.createGain();
        o.type='sine'; o.frequency.value=freq;
        g.gain.setValueAtTime(0.0001,t0+dt);
        g.gain.exponentialRampToValueAtTime(vol,t0+dt+0.025);
        g.gain.exponentialRampToValueAtTime(0.0001,t0+dt+1.3);
        o.connect(g); g.connect(chimeCtx.destination);
        o.start(t0+dt); o.stop(t0+dt+1.4);
      });
    });
  }catch(e){}
}
function setLocationChimes(on){ ss('locationChimes',!!on); if(on){ unlockChimes(); chime('switch'); } }

// ── TOAST ──
let toastTimeout=null;
// plain: the third line is information, not a song (no ♪)
// sticky: stay up until the song or station changes (or a tap), instead of a few seconds
function showBiomeToast(emoji, biomeName, trackName, accentCss, plain, sticky){
  const toast=document.getElementById('biomeToast');
  toast.classList.toggle('sticky',!!sticky);
  toast.onclick=sticky?dismissStickyToast:null; // tap anywhere on it to dismiss (it also has ✕, and swipes away)
  document.getElementById('toastEntering').textContent=appMode==='local'?'NOW ENTERING':'ENTERING BIOME';
  const inner=document.getElementById('biomeToastInner');
  // Update content
  document.getElementById('toastEmoji').textContent=emoji;
  document.getElementById('toastBiomeName').textContent=biomeName;
  document.getElementById('toastTrackName').textContent=trackName?(plain?'':'♪ ')+trackName:'';
  // Update accent colour by re-applying CSS var inline
  const bar=document.getElementById('toastAccentBar');
  bar.style.background=accentCss||'var(--accent)';
  inner.style.borderColor=accentCss?accentCss+'44':'rgba(255,255,255,0.12)';
  // Re-trigger bar animation by cloning
  const newBar=bar.cloneNode(true);
  bar.parentNode.replaceChild(newBar,bar);
  // Dismiss any existing toast first
  toast.classList.remove('show');
  clearTimeout(toastTimeout);
  // Small delay so re-trigger animates properly
  // (a short timer, not animation frames: those pause while the page is hidden, and the pop-up would never show)
  toastTimeout=setTimeout(()=>{
    toast.classList.add('show');
    if(!sticky) toastTimeout=setTimeout(()=>toast.classList.remove('show'), 3800);
  },40);
}
// Swipe a pop-up that stays (up or sideways) to dismiss it
(function(){
  let x0=null,y0=null;
  const el=()=>document.getElementById('biomeToast');
  document.addEventListener('touchstart',e=>{ const t=el(); if(!t?.classList.contains('sticky')||!t.contains(e.target)) return; x0=e.touches[0].clientX; y0=e.touches[0].clientY; t.classList.add('dragging'); },{passive:true});
  document.addEventListener('touchmove',e=>{ const t=el(); if(x0===null||!t) return; const dx=e.touches[0].clientX-x0, dy=Math.min(0,e.touches[0].clientY-y0);
    t.style.transform='translateX(calc(-50% + '+dx+'px)) translateY('+dy+'px)'; t.style.opacity=String(Math.max(.3,1-(Math.abs(dx)+Math.abs(dy))/250)); },{passive:true});
  document.addEventListener('touchend',e=>{ const t=el(); if(x0===null||!t) return; const p=e.changedTouches[0], dx=p.clientX-x0, dy=p.clientY-y0; x0=y0=null;
    t.classList.remove('dragging'); t.style.transform=''; t.style.opacity='';
    if(Math.abs(dx)>70||dy<-40) dismissStickyToast(); });
})();
// the song or station changed: a "you're somewhere new" pop-up that waited for it can go
function dismissStickyToast(){
  const toast=document.getElementById('biomeToast');
  if(!toast?.classList.contains('sticky')) return;
  toast.classList.remove('show','sticky'); toast.onclick=null;
}

function getPackId(){return getActivePackId();}
// What plays in the current place: its own tracks, or (a pack biome with none) the whole pack, shuffled
function biomeUsesWholePack(id){
  id=id||currentLocId;
  return !getLocTracks(getPackId(),id).length && !!getActivePack()?.biomes?.some(b=>b.id===id);
}
function playIdxs(id){
  id=id||currentLocId;
  const own=getLocTracks(getPackId(),id);
  if(own.length||!biomeUsesWholePack(id)) return own;
  const gone=packDisliked(getPackId());
  return getAllPackTracks(getActivePack()).map((_,i)=>i).filter(i=>!gone.has(i));
}
// Saved places with no tracks don't count for live location (you hear the biome around you instead)
function customLocsWithTracks(){ return getAllCustomLocs().filter(l=>getLocTracks(getPackId(),l.id).length>0); }
// The Play button on the track list: shuffle-play this place's list (or the whole pack)
function playTrackList(){
  const n=playIdxs().length;
  if(!n){ spotifyShowSnack('Add some tracks first.'); return; }
  spotifyUnlockAudio();
  favPlaying=null; favQueue=[];
  currentTrackPlayIdx=Math.floor(Math.random()*n);
  shuffleQueue=buildShuffleQueue(n,currentTrackPlayIdx);
  isPlaying=true; renderTrackList(); updateNowPlaying(); playCurrentTrack(false);
}
function currentTracks(){return playIdxs();}

// ═══════════════════════════════════════════
// INIT + IMPORT FROM URL
// ═══════════════════════════════════════════
async function init(){
  // Handle Spotify OAuth callback before anything else
  const qs=new URLSearchParams(window.location.search);
  if(qs.has('state') && (qs.has('code')||qs.has('error')) && sessionStorage.getItem('sp_state')){
    await handleSpotifyCallback();
  }
  renderPacksList();
  renderLocGrid();
  loadLocation('beach',false,false);
  if(packSetupId&&!getUserPacks().some(p=>p.id===packSetupId)){ packSetupId=null; ss('packSetupId',null); } // that pack is gone
  renderSetupBanner();
  updateCacheStatus();
  const fv=document.getElementById('footerVersion');
  if(fv) fv.textContent='Version '+MM_VERSION;
  // Restore Spotify if previously connected (an expired access token is renewed with the saved refresh token)
  if(isSpotifyConnected()) initSpotifySdk();
  renderConnectionsUI();
  syncSpotifyOwnAppUI();
  resumePendingSpotifyLink();
  // Apple Music: check the saved sign-in is still good
  if(isAppleConnected()) amLoad().then(m=>{ if(!m.isAuthorized){ ss('appleMusicLinked',false); renderConnectionsUI(); } }).catch(()=>{});
  setShowVideo(gs('showVideo',true));
  applyLogo(); applySupportLink(); applyReportButtons(); fitWideLayout(); setMapShown(mapShown(),false,true);
  applyModeUI();
  // the last known location, shared by both modes (a week at most)
  const lf=gs('lastFix',null);
  if(lf&&Number.isFinite(lf.lat)&&Number.isFinite(lf.lon)&&Math.abs(lf.lat)<=90&&Math.abs(lf.lon)<=180&&Date.now()-(Number(lf.t)||0)<7*864e5){ lastLat=lf.lat; lastLon=lf.lon; }
  const fromShare=readShareLink();
  if(fromShare){ appMode='local'; ss('appMode','local'); applyModeUI(); }
  if(appMode==='local'){
    // opening in Local Listening: start on the channel list (the default Packs tab doesn't apply)
    if(document.getElementById('tab-packs')?.classList.contains('active')) switchTab('player');
    enterLocalMode(false);
    if(pendingShare?.ch==='song'){ document.getElementById('localListTitle').textContent='SHARED WITH YOU'; renderChannelTabs(); applyPendingShare(); }
  }
  // live location was on last time: turn it back on, but only if the browser already allows it (never prompt
  // on page load), and not when a shared link chose the spot
  // Live location starts only from a tap on Listen to World (never by itself when the page opens)
  if(!fromShare&&!gs('tourSeen',false)) setTimeout(()=>{ if(tourAt<0) openTour(); },900);
}

// Back from the lock screen / another app: if Spotify stopped while the screen was off, carry on
document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='visible') setTimeout(resumeAfterScreenOff,400); });
let resumeBusy=false;
async function resumeAfterScreenOff(){
  if(!isSpotifyConnected()||resumeBusy) return;
  const remote=!!spRemoteDevice();
  const wanted=()=>appMode==='local'?(chanVia==='spotify'&&chanPlaying):(spotifyActive&&isPlaying);
  if(!remote&&spotifyPlayer&&!spotifyReady) try{ await spotifyPlayer.connect(); }catch(e){}
  if(!wanted()||!spotifyActive) return;
  resumeBusy=true;
  try{
    // the browser player drops off Spotify while the phone sleeps: give it a few seconds to come back
    if(!remote) for(let i=0;i<16&&!spotifyReady;i++) await new Promise(r=>setTimeout(r,500));
    if(remote) await pollSpotifyRemote(); // catch up on what the Spotify app did meanwhile
    let s=await spotifyGetState(), sameDevice=!!s;
    if(!s) s=await spotifyApiState(); // reconnected as a new device: ask Spotify where it got to
    if(!wanted()) return;
    if(s){ onSpotifyState(s); if(sameDevice) s=await spotifyGetState()||s; } // follow any songs Spotify moved through
    if(s&&!s.paused) return; // still going
    if(s&&s.position>0&&sameDevice){ await spotifyResumePlayback(); } // paused part-way (e.g. by the system): resume
    else if(appMode!=='local'&&packsSpQueue?.length&&(s?s.uris.includes(packsSpQueue[0].uri):true)
      &&(s?.position>0||spLast?.uris?.includes(packsSpQueue[0].uri))){
      // the same song, on the new browser player: carry on from about where it stopped, with the rest of the list after it
      // (Spotify often reports 0:00 for a browser player that dropped off, so our own last reading is used then)
      const at=s?.position>0?s.position:(spLast?.uris?.includes(packsSpQueue[0].uri)?spLast.pos:0);
      const ok=(await spotifyPlayBody({uris:packsSpQueue.map(q=>q.uri), position_ms:Math.max(0,at-1500)})).ok;
      if(!ok) playCurrentTrack();
    }
    else if(appMode==='local') playChanItem(chanIdx>=0?chanIdx:0,'spotify'); // the player lost its place: start again
    else playCurrentTrack();
  } finally { resumeBusy=false; }
  // phones may still refuse to start audio without a tap: say so instead of pretending to play
  setTimeout(async()=>{
    const st=await spotifyGetState();
    if(st&&!st.paused) return;
    if(appMode==='local'){ chanPlaying=false; renderChanList(); } else isPlaying=false;
    setPlayIcon(false); document.getElementById('playingBars').style.display='none';
    document.getElementById('npGame').textContent='Tap play to carry on';
  },2500);
}

function importSharedPack(pack, silent){
  if(!pack||!pack.id||!pack.tracks||!pack.biomes) return false;
  const existing=getUserPacks();
  // Assign a fresh id to avoid collision with existing packs
  const freshId='imported_'+Date.now();
  const toSave={...pack, id:freshId, builtin:false};
  // Restore any bundled overrides into the store
  if(pack._biomeOverrides){
    ss(packKey(freshId,'biomeOverrides'), pack._biomeOverrides);
  }
  if(pack._locTracks){
    ss(packKey(freshId,'locTracks'), pack._locTracks);
  }
  delete toSave._biomeOverrides;
  delete toSave._locTracks;
  existing.push(toSave);
  saveUserPacks(existing);
  if(!silent){
    setActivePackId(freshId);
    renderPacksList();
    renderLocGrid();
    loadLocation('beach',false,false);
  }
  return true;
}

// ═══════════════════════════════════════════
// TABS
// ═══════════════════════════════════════════
function goToPacks(){
  switchTab('packs');
  // Scroll the packs list into view smoothly
  setTimeout(()=>{
    const el=document.getElementById('packsList');
    if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
  },80);
}

function switchTab(id){
  const order=isLocalMode()?['player','saved','settings']:['player','packs','settings'];
  const toMap=id==='map'; if(toMap) id='player'; // the map lives at the top of Channels / Biomes
  if(isLocalMode()&&id==='packs') id='saved';      // Packs don't apply in Local Listening
  if(!isLocalMode()&&id==='saved') id='packs';
  document.querySelectorAll('.tab-btn').forEach((b,i)=>{
    b.classList.toggle('active',order[i]===id);
  });
  document.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('active'));
  document.getElementById('tab-'+id).classList.add('active');
  if(id==='packs') renderFavList();
  if(id==='settings'){
    syncDistUnitsSelect();
    const ct=document.getElementById('chimesToggle'); if(ct) ct.checked=chimesOn();
    const vt=document.getElementById('showVideoToggle'); if(vt) vt.checked=videoVisible;
    renderCredits();
    renderHiddenTracks();
    renderConnectionsUI();
    syncSpotifyOwnAppUI();
    if(isSpotifyConnected()&&!spDeviceList.length) loadSpotifyDevices(false);
    // load Apple Music ahead of time, so the sign-in window can open straight from the Connect tap
    if(APPLE_MUSIC_ON&&!isAppleConnected()) amLoad().catch(()=>{});
  }
  if(id==='player'){
    if(toMap) setMapShown(true,true);
    else if(mapShown()) refreshMap();
  }
  if(id==='packs')renderPacksList();
  if(id==='saved')renderSavedList();
}
// ── The map, at the top of Channels / Biomes (hide it with its toggle; remembered) ──
let mapCenterOnPin=false; // set by a shared link to a place: the map opens on it instead of the state view
function mapShown(){ return gs('mapShown',true)!==false; }
function refreshMap(){
  // Leaflet needs its box visible to measure it: set up on first show, re-measure after
  setTimeout(()=>{
    initLeafletMap(); if(!leafletMap) return;
    leafletMap.invalidateSize();
    renderCustomPins(); renderSavedMarkers();
    if(lastLat!==null) updateMapPin(lastLat,lastLon,trackingActive); // only zoom in while live tracking
    renderListenPin(trackingActive);
    // opened from a shared link: start centred on that place (once)
    if(mapCenterOnPin&&localPoint){ mapCenterOnPin=false; leafletMap.setView([localPoint.lat,localPoint.lon],11,{animate:false}); }
    renderMapLegend();
  },50);
}
function setMapShown(on,scroll,quiet){ // quiet: only set the toggle (page start; the map loads when the tab shows)
  ss('mapShown',!!on);
  const body=document.getElementById('mapBody'), btn=document.getElementById('mapToggleBtn');
  if(body) body.hidden=!on;
  if(btn){ btn.setAttribute('aria-expanded',!!on); btn.querySelector('span').textContent=on?'Hide map':'Show map'; }
  if(on&&!quiet){ refreshMap(); if(scroll) setTimeout(()=>document.getElementById('mapSection')?.scrollIntoView({block:'start',behavior:'smooth'}),80); }
}
function toggleMap(){ setMapShown(!mapShown()); }
// ── Place search above the map (OpenStreetMap's Nominatim, names in English) ──
// Runs on Enter/Search only and at most once a second, as Nominatim's usage policy asks.
const MAP_SEARCH_TYPES=['city','town','village','municipality','borough','suburb','county','state','province','region','state_district','country','island','archipelago','territory','hamlet'];
let mapSearchAt=0, mapSearchSeq=0;
async function searchMapPlace(){
  const input=document.getElementById('mapSearchInput'), box=document.getElementById('mapSearchResults');
  const q=input.value.trim().slice(0,100);
  if(q.length<2){ box.hidden=true; return; }
  const seq=++mapSearchSeq;
  box.hidden=false; box.innerHTML=''; const note=document.createElement('div'); note.className='note'; busyText(note,'Searching…'); box.append(note);
  const wait=1100-(Date.now()-mapSearchAt); if(wait>0) await new Promise(r=>setTimeout(r,wait));
  if(seq!==mapSearchSeq) return;
  mapSearchAt=Date.now();
  let rows=[], failed=false;
  try{
    const r=await fetch('https://nominatim.openstreetmap.org/search?format=jsonv2&limit=8&addressdetails=1&accept-language=en&q='+encodeURIComponent(q));
    if(r.ok) rows=await r.json(); else failed=true;
  }catch(e){ failed=true; }
  if(seq!==mapSearchSeq) return;
  const places=(Array.isArray(rows)?rows:[]).filter(p=>Number.isFinite(+p.lat)&&Number.isFinite(+p.lon)&&(MAP_SEARCH_TYPES.includes(p.addresstype)||p.category==='place'||p.category==='boundary')).slice(0,5);
  box.innerHTML='';
  if(!places.length){ const n=document.createElement('div'); n.className='note'; n.textContent=failed?'Search isn’t reachable right now. Try again in a moment.':'No city, state or country found for “'+q+'”.'; box.append(n); return; }
  places.forEach(p=>{
    const a=p.address||{};
    const name=String(p.name||a.city||a.town||a.state||a.country||q).slice(0,80);
    const kind=String(p.addresstype||p.type||'').replace(/_/g,' ');
    const within=[a.state&&a.state!==name?a.state:'', a.country&&a.country!==name?a.country:''].filter(Boolean).join(', ');
    const b=document.createElement('button'); b.type='button'; b.setAttribute('role','option');
    const t=document.createElement('span'); t.textContent=name;
    const s=document.createElement('small'); s.textContent=[kind?kind[0].toUpperCase()+kind.slice(1):'',within].filter(Boolean).join(' · ');
    b.append(t,s); b.onclick=()=>goToSearchPlace(p,name); box.append(b);
  });
}
function goToSearchPlace(p,name){
  document.getElementById('mapSearchResults').hidden=true;
  document.getElementById('mapSearchInput').value=name;
  initLeafletMap(); if(!leafletMap) return;
  const lat=+p.lat, lon=+p.lon, bb=(p.boundingbox||[]).map(Number);
  // towns and cities: centre on the place (some city limits reach far-off islands); bigger areas: show all of them
  const wide=['state','province','region','state_district','country','territory','archipelago','county'].includes(p.addresstype);
  // (countries too can reach overseas: if the outline would zoom out past a continent, centre at country level instead)
  if(wide&&bb.length===4&&bb.every(Number.isFinite)){
    const z=leafletMap.getBoundsZoom([[bb[0],bb[2]],[bb[1],bb[3]]]);
    if(z>=4) leafletMap.fitBounds([[bb[0],bb[2]],[bb[1],bb[3]]],{maxZoom:12,padding:[10,10]});
    else leafletMap.setView([lat,lon],5);
  } else leafletMap.setView([lat,lon],11);
  // Local Listening: listen there. Biome Beats: tap the map to add a saved place.
  if(appMode==='local') moveListenPinTo(+lat.toFixed(5),+lon.toFixed(5));
  else spotifyShowSnack('Tap the map to add a saved place around '+name+'.');
}
document.addEventListener('click',e=>{ const box=document.getElementById('mapSearchResults'); if(box&&!box.hidden&&!e.target.closest('#mapSearchResults,#mapSearchForm')) box.hidden=true; });
document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ const box=document.getElementById('mapSearchResults'); if(box&&!box.hidden){ box.hidden=true; document.getElementById('mapSearchInput')?.focus(); } } });

// ── Saved songs, stations and spots on the map (Local Listening). Several at one place share an icon with a list ──
let savedLayer=null;
function renderSavedMarkers(){
  if(!leafletMap) return;
  if(!savedLayer) savedLayer=L.layerGroup().addTo(leafletMap);
  savedLayer.clearLayers();
  if(appMode!=='local') return;
  const d=getSaved(), groups=new Map();
  const add=(lat,lon,item)=>{
    if(!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>90||Math.abs(lon)>180) return;
    const k=lat.toFixed(3)+','+lon.toFixed(3); // about 100 m: "the same place"
    if(!groups.has(k)) groups.set(k,{lat,lon,items:[]});
    groups.get(k).items.push(item);
  };
  d.spots.forEach(sp=>add(sp.lat,sp.lon,{label:'📍 '+(placeLabel(sp.place)||'Saved spot'), act:'Go there', go:()=>goToSavedSpot(sp)}));
  d.stations.forEach(st=>add(st.lat,st.lon,{label:'📻 '+st.name, act:'Play station', go:()=>playSavedStation(st)}));
  d.songs.forEach((so,i)=>add(so.lat,so.lon,{label:'♪ '+so.title+' — '+so.artist, act:'Play song', go:()=>playSavedSongs(i)}));
  groups.forEach(g=>{
    const n=g.items.length;
    const icon=L.divIcon({className:'',iconSize:[30,30],iconAnchor:[15,15],popupAnchor:[0,-14],
      html:'<div class="mm-saved-marker">'+SAVE_BTN_HTML+(n>1?'<span class="mm-saved-count">'+n+'</span>':'')+'</div>'});
    const m=L.marker([g.lat,g.lon],{icon,bubblingMouseEvents:false,keyboard:true,title:n>1?n+' saved here':g.items[0].label.slice(2)});
    m.bindPopup(()=>savedPopup(g.items,m),{closeButton:true});
    savedLayer.addLayer(m);
  });
}
// Popup (built from text, never HTML strings): one item = its name and a button; several = a list to pick from
function savedPopup(items,marker){
  const box=document.createElement('div'); box.className='mm-saved-pop';
  const t=document.createElement('div'); t.className='t'; t.textContent=items.length>1?items.length+' saved here':'Saved';
  box.append(t);
  let pick=()=>items[0];
  if(items.length>1){
    const sel=document.createElement('select'); sel.setAttribute('aria-label','Pick a saved item');
    items.forEach((it,i)=>{ const o=document.createElement('option'); o.value=i; o.textContent=it.label; sel.append(o); });
    box.append(sel); pick=()=>items[Number(sel.value)]||items[0];
    const btn=document.createElement('button'); btn.type='button';
    const label=()=>{ btn.textContent=pick().act; }; sel.onchange=label; label();
    btn.onclick=()=>{ marker.closePopup(); pick().go(); };
    box.append(btn);
  } else {
    const one=document.createElement('div'); one.className='one'; one.textContent=items[0].label; box.append(one);
    const btn=document.createElement('button'); btn.type='button'; btn.textContent=items[0].act;
    btn.onclick=()=>{ marker.closePopup(); items[0].go(); };
    box.append(btn);
  }
  return box;
}

// Safe to call before the Local Listening section has initialised
function isLocalMode(){ try{ return appMode==='local'; }catch(e){ return false; } }

// ═══════════════════════════════════════════
// PACKS
// ═══════════════════════════════════════════
function renderPacksList(){
  const el=document.getElementById('packsList');
  if(!el)return;
  el.innerHTML='';
  const all=getAllPacks();
  const activeId=getActivePackId();

  // Active pack first, then rest
  const activePack=all.find(p=>p.id===activeId);
  const otherPacks=all.filter(p=>p.id!==activeId);

  // Section label + active pack
  if(activePack){
    const activeLabel=document.createElement('div');
    activeLabel.style.cssText='font-family:var(--pixel);font-size:7px;color:var(--green);letter-spacing:1.5px;margin-bottom:7px;opacity:.8';
    activeLabel.innerHTML=ic('play','ic-sm')+' NOW PLAYING';
    el.appendChild(activeLabel);
  }

  const packsToRender=activePack?[activePack,...otherPacks]:otherPacks;
  let addedDivider=!activePack; // skip divider if no active pack

  packsToRender.forEach(pack=>{
    // Insert divider before the "other packs" section
    if(!addedDivider && pack.id!==activeId){
      addedDivider=true;
      const divider=document.createElement('div');
      divider.style.cssText='display:flex;align-items:center;gap:10px;margin:12px 0 10px';
      divider.innerHTML='<div style="flex:1;height:1px;background:var(--border)"></div>'
        +'<span style="font-family:var(--pixel);font-size:7px;color:var(--muted);letter-spacing:1.5px;white-space:nowrap">ALL PACKS</span>'
        +'<div style="flex:1;height:1px;background:var(--border)"></div>';
      el.appendChild(divider);
    }

    const card=document.createElement('div');
    const isActive=pack.id===activeId;
    card.className='pack-card'+(isActive?' active':'');
    // Clicking the card body (not buttons) activates the pack
    card.onclick=(e)=>{ if(!e.target.closest('.pack-actions')) activatePack(pack.id); };
    const allTracks=getAllPackTracks(pack);
    const videoCount=pack.videos?pack.videos.length:1;
    const packSubtitle=pack.subtitle||pack.source||pack.videoId||'';
    const metaText=packSubtitle+' · '+allTracks.length+' track'+(allTracks.length!==1?'s':'')+(videoCount>1?' · '+videoCount+' videos':'');
    // Top row: icon + name + active badge
    const topRow=document.createElement('div');
    topRow.className='pack-card-top';
    topRow.innerHTML='<div class="pack-icon">'+esc(pack.icon||'🎵')+'</div>'
      +'<div class="pack-info"><div class="pack-name-row"><div class="pack-name">'+esc(pack.name)+'</div>'+sourceIconsHtml(packSources(pack))+'</div><div class="pack-meta">'+esc(metaText)+'</div></div>';
    if(isActive){
      const badge=document.createElement('span');
      badge.style.cssText='font-size:10px;color:var(--green);font-family:var(--pixel);letter-spacing:.5px;flex-shrink:0';
      badge.textContent='✓ ACTIVE';
      topRow.appendChild(badge);
    }
    card.appendChild(topRow);
    // Button row (separate line)
    const actionsDiv=document.createElement('div');
    actionsDiv.className='pack-actions';
    const biomesBtn=document.createElement('button');
    biomesBtn.className='pack-action-btn';
    biomesBtn.innerHTML=ic('mapPin','ic-sm')+' Edit biomes';
    biomesBtn.title='Choose which tracks play in each biome';
    biomesBtn.onclick=(e)=>{ e.stopPropagation(); editPackBiomes(pack.id); };
    actionsDiv.appendChild(biomesBtn);
    const editBtn=document.createElement('button');
    editBtn.className='pack-action-btn';
    editBtn.innerHTML=ic('edit','ic-sm')+' Edit';
    editBtn.onclick=(e)=>{ e.stopPropagation(); openPackEdit(pack.id); };
    actionsDiv.appendChild(editBtn);
    const shareBtn=document.createElement('button');
    shareBtn.className='pack-action-btn';
    shareBtn.innerHTML=ic('share','ic-sm')+' Share';
    shareBtn.onclick=(e)=>{ e.stopPropagation(); sharePackById(pack.id); };
    actionsDiv.appendChild(shareBtn);
    const dupBtn=document.createElement('button');
    dupBtn.className='pack-action-btn';
    dupBtn.innerHTML=ic('copy','ic-sm')+' Copy';
    dupBtn.onclick=(e)=>{ e.stopPropagation(); duplicatePack(pack.id); };
    actionsDiv.appendChild(dupBtn);
    if(!pack.builtin){
      const delBtn=document.createElement('button');
      delBtn.className='pack-action-btn danger';
      delBtn.innerHTML=ic('trash','ic-sm')+' Delete';
      delBtn.onclick=(e)=>{ e.stopPropagation(); deletePack(pack.id); };
      actionsDiv.appendChild(delBtn);
    }
    card.appendChild(actionsDiv);
    el.appendChild(card);
  });
  document.getElementById('packEyebrowName').textContent=(getActivePack()?.name||'').toUpperCase();
  const iconEl=document.getElementById('packEyebrowIcon');
  if(iconEl) iconEl.textContent=getActivePack()?.icon||'🎵';
}

function packNeedsSpotify(pack){
  const src=packSources(pack);
  return src.length===1 && src[0]==='spotify';
}
function activatePack(id){
  if(packSetupId&&packSetupId!==id) finishSetup(true); // left the pack being set up: keep what was placed
  const target=getAllPacks().find(p=>p.id===id);
  if(target && packNeedsSpotify(target) && !isSpotifyConnected()) setTimeout(openSpotifyNeeded,0);
  setActivePackId(id);
  renderPacksList();
  renderLocGrid();
  loadLocation('beach',false,false);
  switchTab('player');
  renderSetupBanner();
}

// From the Packs tab straight to a pack's biomes (switching to that pack first if needed)
function editPackBiomes(id){
  if(getActivePackId()!==id) activatePack(id); else switchTab('player');
  setTimeout(()=>{
    const grid=document.getElementById('locGrid'); if(!grid) return;
    const banner=document.getElementById('setupBanner');
    (banner&&!banner.hidden?banner:grid.closest('.section'))?.scrollIntoView({block:'start',behavior:'smooth'});
    grid.classList.add('flash'); setTimeout(()=>grid.classList.remove('flash'),1600);
    spotifyShowSnack('Tap a biome to see its tracks, or its ✎ to rename it. Add tracks under the list.');
  },120);
}
function deletePack(id){
  if(!confirm('Delete this pack?'))return;
  saveUserPacks(getUserPacks().filter(p=>p.id!==id));
  if(getActivePackId()===id)setActivePackId('hoenn');
  renderPacksList();
}

function duplicatePack(id){
  const src=getAllPacks().find(p=>p.id===id);
  if(!src)return;
  const newId='dup_'+Date.now();
  const dup={...JSON.parse(JSON.stringify(src)), id:newId, name:src.name+' (Copy)', builtin:false};
  ['biomeOverrides','locTracks','pins','deletedBiomes'].forEach(key=>{
    const val=gs(packKey(id,key),null);
    if(val!==null) ss(packKey(newId,key),JSON.parse(JSON.stringify(val)));
  });
  saveUserPacks([...getUserPacks(),dup]);
  renderPacksList();
  // Open edit menu for the new pack instead of switching to biomes
  openPackEdit(newId);
}

function openAddPackModal(){ openPackEdit(null); }
function closeAddPackModal(){ document.getElementById('packEditOverlay').classList.remove('open'); }
function renderPackEmojiPicker(){
  const p=document.getElementById('packEmojiPicker');
  if(!p)return;
  p.innerHTML='';
  PACK_EMOJIS.forEach(em=>{
    const b=document.createElement('button');
    b.className='emoji-opt'+(em===selectedPackEmoji?' sel':'');
    b.textContent=em;b.type='button';
    b.onclick=()=>{selectedPackEmoji=em;renderPackEmojiPicker();};
    p.appendChild(b);
  });
  const wrap=document.createElement('div');
  wrap.style.cssText='display:flex;gap:5px;margin-top:6px;width:100%';
  wrap.innerHTML=`<input id="customPackEmojiInput" placeholder="Type emoji…" maxlength="4"
    style="flex:1;background:var(--surface2);border:1px solid var(--border2);border-radius:7px;padding:5px 9px;color:#fff;font-size:16px;outline:none;min-width:0"
    oninput="if(this.value.trim()){selectedPackEmoji=this.value.trim();renderPackEmojiPicker()}"/>
  <button type="button" class="emoji-opt sel" style="flex-shrink:0;min-width:40px;font-size:16px"
    onclick="document.getElementById('customPackEmojiInput').focus()">${selectedPackEmoji}</button>`;
  p.appendChild(wrap);
}
// saveNewPack merged into savePackEdit
// ═══════════════════════════════════════════
// VERSION + SHARE BACKEND
// ═══════════════════════════════════════════
const MM_VERSION = '1.20.1';
// Settings injected by the WordPress plugin's [musicmap] shortcode (absent when this file runs standalone)
const MM_CONFIG = (typeof window!=='undefined' && window.MUSICMAP_CONFIG && typeof window.MUSICMAP_CONFIG==='object') ? window.MUSICMAP_CONFIG : {};
// Share-code API endpoint. The plugin sets it automatically; standalone, set your own (see README "API Setup")
// or leave blank to use local MM- encoded share codes only.
const API_URL = typeof MM_CONFIG.shareApi==='string' && /^https?:\/\//.test(MM_CONFIG.shareApi) ? MM_CONFIG.shareApi : '';
// Swap ShareBackend.encode/decode for PHP fetch calls when backend is ready.
// Everything else in the UI stays identical.
// ═══════════════════════════════════════════
const ShareBackend = {
  // ── LOCAL (code-based) ──
  encode(packObj){
    try{
      const json=JSON.stringify(packObj);
      // btoa requires ASCII; handle unicode via encodeURIComponent
      const b64=btoa(encodeURIComponent(json).replace(/%([0-9A-F]{2})/g,
        (_,p1)=>String.fromCharCode('0x'+p1)));
      return 'MM-'+b64;
    }catch(e){return null;}
  },
  decode(code){
    try{
      if(!code.startsWith('MM-')) return null;
      const b64=code.slice(3);
      const json=decodeURIComponent(Array.from(atob(b64),
        c=>'%'+c.charCodeAt(0).toString(16).padStart(2,'0')).join(''));
      return JSON.parse(json);
    }catch(e){return null;}
  },

  // ── PHP BACKEND (active when API_URL is set) ──
  async saveToServer(packObj) {
    const r = await fetch(API_URL + 'save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(packObj)
    });
    const d = await r.json();
    if (!r.ok || !d.code) throw new Error(d.error || 'Save failed');
    return d.code;
  },
  async loadFromServer(code) {
    const r = await fetch(API_URL + 'load&code=' + encodeURIComponent(code));
    const d = await r.json();
    if (!r.ok || !d.pack) throw new Error(d.error || 'Not found');
    return d.pack;
  },
};

// Personal biome IDs that always get a warning
const PERSONAL_BIOME_IDS=new Set(['home','work','school','gym']);

let sharingPackId = null;

function sharePack(){ sharePackById(getActivePackId()); }
function sharePackById(packId){
  sharingPackId = packId;
  const pack = getAllPacks().find(p=>p.id===packId);
  if(!pack) return;
  // Reset state
  document.getElementById('shareResultBox').style.display='none';
  document.getElementById('sharePrivacyBox').style.display='block';
  document.getElementById('shareModalTitle').textContent='SHARE: '+pack.name.toUpperCase();
  document.getElementById('copyFlash').textContent='';
  openPrivacyModal();
}

function openPrivacyModal(){
  const locs=getAllCustomLocs().filter(l=>l.lat&&l.lon);
  const list=document.getElementById('privLocList');
  const label=document.getElementById('privLocLabel');
  list.innerHTML='';

  if(locs.length===0){
    label.style.display='none';
    list.innerHTML='<div style="font-size:12px;color:var(--muted);padding:4px 0">No custom locations with coordinates in this pack.</div>';
  } else {
    label.style.display='block';
  }

  locs.forEach(loc=>{
    const isPersonal=PERSONAL_BIOME_IDS.has(loc.id)||PERSONAL_BIOME_IDS.has(loc.id.replace(/^preset_/,''));
    const firstPin=(loc.pins&&loc.pins[0])||null;
    const coordStr=firstPin?firstPin.lat.toFixed(4)+', '+firstPin.lon.toFixed(4)
      :(loc.lat?loc.lat.toFixed(4)+', '+loc.lon.toFixed(4):'');
    const pinCount=loc.pins?loc.pins.length:(loc.lat?1:0);
    const row=document.createElement('div');
    row.className='priv-loc-row';
    const uid='priv_'+loc.id;
    row.innerHTML=`
      <div class="priv-loc-emoji">${esc(loc.emoji)}</div>
      <div class="priv-loc-info">
        <div class="priv-loc-name">${esc(loc.name)}</div>
        <div class="priv-loc-coords">${coordStr}${pinCount>1?" (+"+( pinCount-1)+" more)":""}</div>
      </div>
      ${isPersonal?'<div class="priv-warn-icon" title="Personal location — consider removing">'+ic('alert','ic-sm')+'</div>':''}
      <label class="priv-toggle" title="Toggle off to exclude from share">
        <input type="checkbox" id="${esc(uid)}" ${isPersonal?'':'checked'}>
        <div class="priv-toggle-track"></div>
        <div class="priv-toggle-thumb"></div>
      </label>`;
    // Personal ones default to OFF (excluded), others default ON
    list.appendChild(row);
    // Set default: personal = unchecked (excluded), others = checked (included)
    // Already set via the ${isPersonal?'':'checked'} above
  });

  document.getElementById('shareModalOverlay').classList.add('open');
}

function closePrivacyModal(){ closeShareModal(); }
function closeShareModal(e){
  if(!e||e.target===document.getElementById('shareModalOverlay'))
    document.getElementById('shareModalOverlay').classList.remove('open');
}

async function confirmShare(){
  const packId=sharingPackId||getPackId();
  const pack=getAllPacks().find(p=>p.id===packId)||getActivePack();
  const biomeOverrides=gs(packKey(packId,'biomeOverrides'),{});
  const locTracks=gs(packKey(packId,'locTracks'),{});

  // Collect which custom locs are included
  const locs=getAllCustomLocs().filter(l=>l.lat&&l.lon);
  const excluded=new Set();
  locs.forEach(loc=>{
    const cb=document.getElementById('priv_'+loc.id);
    if(cb&&!cb.checked) excluded.add(loc.id);
  });

  const allLocs=getAllCustomLocs().map(loc=>{
    if(excluded.has(loc.id)){
      const {lat,lon,radius,...rest}=loc;
      return rest;
    }
    return loc;
  });

  const shareable={
    ...pack,
    builtin:false,
    _biomeOverrides:biomeOverrides,
    _locTracks:locTracks,
    _customLocs:allLocs.filter(l=>!PERSONAL_BIOME_IDS.has(l.id)),
  };

  // Switch to result view BEFORE async work — keep modal open
  document.getElementById('sharePrivacyBox').style.display='none';
  document.getElementById('shareResultBox').style.display='block';
  busyText(document.getElementById('shareCodeDisplay'),'Generating…');
  document.getElementById('copyFlash').textContent='';

  let code;
  if(API_URL){
    try{ code=await ShareBackend.saveToServer(shareable); }
    catch(e){ code=ShareBackend.encode(shareable); }
  } else {
    code=ShareBackend.encode(shareable);
  }

  if(!code){
    document.getElementById('shareCodeDisplay').textContent='Failed to generate code.';
    return;
  }

  // Build rich share text: code + link + instructions
  const pageUrl=location.href.split('?')[0];
  const trackCount=getAllPackTracks(pack).length;
  const richText=
    'MusicMap Pack: '+pack.name+'\n'
    +(pack.subtitle?pack.subtitle+'\n':'')
    +trackCount+' tracks · '+pack.biomes.length+' biomes\n'
    +'\n'
    +'Import code: '+code+'\n'
    +'\n'
    +'How to play:\n'
    +'1. Visit: '+pageUrl+'\n'
    +'2. Open the Packs tab → Make or Import Pack → Import\n'
    +'3. Paste the code above and hit Import\n'
    +'4. Turn on "Listen to World" and explore!';

  document.getElementById('shareCodeDisplay').textContent=richText;
  // Store just the code for the copy button, store rich text for the share button
  document.getElementById('shareCodeDisplay').dataset.code=code;
  document.getElementById('shareCodeDisplay').dataset.rich=richText;
}

function copyShareCode(richOnly){
  const el=document.getElementById('shareCodeDisplay');
  const text=richOnly?el.dataset.rich:el.dataset.code||el.textContent;
  if(!text||text==='Generating…') return;
  navigator.clipboard.writeText(text).then(()=>{
    const flash=document.getElementById('copyFlash');
    flash.textContent=richOnly?'✓ Full message copied!':'✓ Code copied!';
    setTimeout(()=>flash.textContent='',2500);
  }).catch(()=>{
    document.getElementById('copyFlash').textContent='Select text above and copy manually';
  });
}

function previewImportCode(){
  const raw=document.getElementById('importCodeInput').value.trim();
  const preview=document.getElementById('importPreview');
  const nameEl=document.getElementById('importPreviewName');
  const metaEl=document.getElementById('importPreviewMeta');
  if(raw.length < 4){preview.classList.remove('visible');return;}
  // JSON import
  if(raw.startsWith('{')){
    try{
      const j=JSON.parse(raw);
      const pack=normaliseAiJson(j);
      if(pack){
        nameEl.textContent=(pack.icon||'🎵')+' '+pack.name;
        metaEl.textContent=pack.tracks.length+' tracks · '+pack.biomes.length+' biomes';
        preview.classList.add('visible');
      } else {
        nameEl.textContent='Invalid JSON format';
        metaEl.textContent='Missing name, videoId or tracks fields';
        preview.classList.add('visible');
      }
    }catch(e){preview.classList.remove('visible');}
    return;
  }
  if(!raw.startsWith('MM-')&&API_URL&&raw.length<=12){
    nameEl.innerHTML=ic('extLink','ic-sm')+' Server code detected';
    metaEl.textContent='Will fetch from server on import';
    preview.classList.add('visible');
    return;
  }
  const pack=ShareBackend.decode(raw);
  if(pack&&pack.name&&pack.tracks){
    nameEl.textContent=`${pack.icon||'🎵'} ${pack.name}`;
    metaEl.textContent=`${pack.tracks.length} tracks · ${pack.biomes?.length||0} biomes · ${pack.source||'Custom pack'}`;
    preview.classList.add('visible');
  } else {
    nameEl.textContent='Invalid code';
    metaEl.textContent='Could not read this code — make sure it starts with MM-';
    preview.classList.add('visible');
  }
}

async function importFromCode(){
  const raw=document.getElementById('importCodeInput').value.trim();
  const flash=document.getElementById('importFlash');
  if(!raw){flash.textContent='Paste a share code or JSON first.';return;}

  busyText(flash,'Loading…');
  let pack=null;

  if(raw.startsWith('{')){
    try{
      const j=JSON.parse(raw);
      pack=normaliseAiJson(j);
      if(!pack){flash.textContent='❌ JSON missing required fields (name, videoId, tracks)';return;}
    }catch(e){flash.textContent='❌ Invalid JSON — check formatting';return;}
  } else if(!raw.startsWith('MM-')&&API_URL){
    try{
      pack=await ShareBackend.loadFromServer(raw);
    }catch(e){
      flash.textContent='❌ '+(e.message||'Code not found on server');
      return;
    }
  } else {
    pack=ShareBackend.decode(raw);
    if(!pack){flash.textContent='❌ Invalid code — should start with MM- or {';return;}
  }

  const ok=importSharedPack(pack,false);
  if(ok){
    flash.textContent=`✓ "${pack.name}" imported and activated!`;
    document.getElementById('importCodeInput').value='';
    document.getElementById('importPreview').classList.remove('visible');
    switchTab('player');
    setTimeout(()=>flash.textContent='',3000);
  } else {
    flash.textContent='❌ Import failed — pack data looks invalid.';
  }
}

function normaliseAiJson(j){
  if(!j||!j.name||!j.tracks||!j.videoId) return null;
  const BD={
    beach:  {emoji:'🌊',cssClass:'biome-beach',  keywords:['beach','coast','sea','bay','shore','harbor','surf','island','cove']},
    city:   {emoji:'🏙️',cssClass:'biome-city',   keywords:['city','downtown','urban','metro','avenue','street','plaza']},
    forest: {emoji:'🌲',cssClass:'biome-forest',  keywords:['forest','woods','park','trail','nature','grove','jungle']},
    mountain:{emoji:'🌋',cssClass:'biome-mountain',keywords:['mountain','hill','summit','peak','cliff','canyon','valley']},
    desert: {emoji:'🏜️',cssClass:'biome-desert',  keywords:['desert','sand','dune','arid','mesa','plateau','badlands']},
    town:   {emoji:'🏘️',cssClass:'biome-town',    keywords:['suburb','town','village','neighborhood','residential']},
    ocean:  {emoji:'🐋',cssClass:'biome-ocean',   keywords:['ocean','gulf','strait','channel','pacific','atlantic','lake']},
    shopping:{emoji:'🛍️',cssClass:'biome-shopping',keywords:['mall','shopping','market','store','retail','plaza']},
    port:   {emoji:'⚓',cssClass:'biome-port',    keywords:['port','dock','pier','wharf','terminal','shipyard','harbor']},
  };
  const BN={beach:'Beach',city:'City',forest:'Forest',mountain:'Mountain',desert:'Desert',town:'Town',ocean:'Ocean',shopping:'Shopping',port:'Port'};
  const biomes=Object.entries(j.biomes||{}).map(([id,tracks])=>({
    id, name:BN[id]||id,
    emoji:BD[id]?.emoji||'📍',
    cssClass:BD[id]?.cssClass||'biome-custom',
    keywords:BD[id]?.keywords||[],
    defaultTracks:Array.isArray(tracks)?tracks:[],
  }));
  return {
    id:'ai_'+Date.now(), name:j.name, subtitle:j.subtitle||'',
    icon:j.icon||'🎵', videoId:j.videoId,
    source:j.subtitle||'Custom Pack', builtin:false,
    videos:[{id:j.videoId,tracks:j.tracks}],
    tracks:j.tracks, biomes,
  };
}

function copyAiPrompt(){
  const txt=document.getElementById('aiPromptBox').textContent;
  navigator.clipboard.writeText(txt).then(()=>{
    const el=document.getElementById('aiPromptFlash');
    el.textContent='✓ Prompt copied!';
    setTimeout(()=>el.textContent='',2500);
  });
}

// ═══════════════════════════════════════════
// LOCATION GRID
// ═══════════════════════════════════════════
function renderLocGrid(){
  const g=document.getElementById('locGrid');
  if(!g)return;
  g.innerHTML='';
  const packId=getPackId();
  const pack=getActivePack();
  const deletedBiomes=new Set(gs(packKey(packId,'deletedBiomes'),[]));
  const allBiomes=(pack?.biomes||[]).filter(b=>!deletedBiomes.has(b.id));
  const customLocs=getAllCustomLocs();

  const allLocs=[
    ...allBiomes.map(b=>({...getEffectiveBiome(packId,b.id),...b,...getBiomeOverride(packId,b.id),isCustom:false})),
    ...customLocs.map(cl=>({...cl,isCustom:true}))
  ];

  allLocs.forEach(loc=>{
    const btn=document.createElement('button');
    btn.className='loc-btn'+(loc.isCustom?' custom-loc':'')+(loc.id===currentLocId?' active':'');
    const tracks=getLocTracks(packId,loc.id);
    const isNear=lastLat&&(
      (loc.pins&&loc.pins.length>0&&loc.pins.some(p=>dist(lastLat,lastLon,p.lat,p.lon)<=(p.radius||200)))||
      (loc.lat&&dist(lastLat,lastLon,loc.lat,loc.lon)<=(loc.radius||200))
    );
    if(isNear){const dot=document.createElement('div');dot.className='loc-proximity';btn.appendChild(dot);}
    const editBtn=document.createElement('button');
    editBtn.className='loc-edit-btn';
    editBtn.innerHTML=ic('edit','ic-sm');
    editBtn.onclick=e=>{e.stopPropagation();openLocEdit(loc.id,loc.isCustom);};
    btn.appendChild(editBtn);
    const emojiEl=document.createElement('span');
    emojiEl.className='loc-btn-emoji';
    emojiEl.textContent=loc.emoji;
    btn.appendChild(emojiEl);
    const nameEl2=document.createElement('span');
    nameEl2.className='loc-btn-name';
    nameEl2.textContent=loc.name;
    btn.appendChild(nameEl2);
    // Show canonical biome name as subtext if overridden
    const canonicalName={'beach':'Beach','city':'City','forest':'Forest','mountain':'Mountain','desert':'Desert','town':'Town','ocean':'Ocean','shopping':'Shopping','port':'Port'}[loc.id];
    if(canonicalName && loc.name !== canonicalName){
      const sub=document.createElement('span');
      sub.className='loc-btn-subtext';
      sub.textContent=canonicalName;
      btn.appendChild(sub);
    }
    if(tracks.length===0){const e2=document.createElement('span');e2.style.cssText='font-size:9px;color:var(--muted)';e2.textContent='empty';btn.appendChild(e2);}
    btn.onclick=()=>loadLocation(loc.id,true);
    g.appendChild(btn);
  });

  // add custom location button
  const addBtn=document.createElement('button');
  addBtn.className='loc-btn add-loc';
  addBtn.innerHTML='<span class="loc-btn-emoji">'+ic('plus','ic-md')+'</span><span class="loc-btn-name">New place</span>';
  addBtn.onclick=()=>openLocEdit(null,true);
  g.appendChild(addBtn);
}

// ═══════════════════════════════════════════
// LOAD LOCATION
// ═══════════════════════════════════════════
function loadLocation(id,manual,showToast){
  const wasPlaying=isPlaying;
  if(favPlaying!=null){ favPlaying=null; favQueue=[]; setTimeout(renderFavList,0); }
  const prevLocId=currentLocId;
  currentLocId=id;
  const packId=getPackId();
  const pack=getActivePack();
  let loc=pack?.biomes.find(b=>b.id===id);
  if(loc){
    const ov=getBiomeOverride(packId,id);
    loc={...loc,...ov};
  } else {
    loc=getAllCustomLocs().find(l=>l.id===id);
  }
  if(!loc)return;

  document.getElementById('heroBanner').className=loc.cssClass||'biome-custom';
  document.getElementById('biomeEmoji').textContent=loc.emoji;
  document.getElementById('biomeName').textContent=loc.name;
  const _canonMap={'beach':'Beach','city':'City','forest':'Forest','mountain':'Mountain','desert':'Desert','town':'Town','ocean':'Ocean','shopping':'Shopping','port':'Port'};
  const _sub=document.getElementById('biomeNameSub');
  if(_sub){const _can=_canonMap[id];_sub.textContent=(_can&&loc.name!==_can)?_can:'';}

  const tracks=playIdxs(id);
  const pinned=getPinnedIdx(packId,id);
  shuffleQueue=[]; // reset queue on biome change
  if(tracks.length===0){currentTrackPlayIdx=0;}
  else if(pinned!==undefined&&tracks.includes(pinned)){
    currentTrackPlayIdx=tracks.indexOf(pinned);
  } else {
    currentTrackPlayIdx=Math.floor(Math.random()*tracks.length);
  }
  renderLocGrid();
  renderTrackList();
  updateNowPlaying();
  updatePinStatus();

  const isBiomeChange=(prevLocId!==id);
  const useFade=wasPlaying&&isBiomeChange;
  if(wasPlaying||manual){playCurrentTrack(useFade);isPlaying=true;}

  // Show toast when entering a new biome/location
  if((showToast||manual)&&isBiomeChange){
    const tIdx=(tracks.length>0)?tracks[currentTrackPlayIdx]:null;
    const trackTitle=tIdx!==null&&pack?.tracks[tIdx]?pack.tracks[tIdx].title:null;
    // Get accent colour from CSS var for this biome
    const accentMap={
      'biome-beach':'#00b4d8','biome-city':'#7c3aed','biome-forest':'#16a34a',
      'biome-mountain':'#9f1239','biome-desert':'#d97706','biome-town':'#0891b2',
      'biome-ocean':'#0284c7','biome-shopping':'#db2777','biome-port':'#0d9488',
      'biome-home':'#f59e0b','biome-work':'#6366f1','biome-school':'#10b981',
      'biome-gym':'#ef4444','biome-custom':'#8b5cf6'
    };
    const accent=accentMap[loc.cssClass||'biome-custom']||'#7c3aed';
    showBiomeToast(loc.emoji, loc.name, trackTitle, accent);
  }
}

// ═══════════════════════════════════════════
// TRACK LIST
// ═══════════════════════════════════════════
function renderTrackList(){
  const packId=getPackId();
  const pack=getActivePack();
  let loc=pack?.biomes.find(b=>b.id===currentLocId);
  if(loc){const ov=getBiomeOverride(packId,currentLocId);loc={...loc,...ov};}
  else loc=getAllCustomLocs().find(l=>l.id===currentLocId);
  const label=document.getElementById('trackListLabel');
  if(loc)label.textContent=(loc.name).toUpperCase()+' TRACKS';

  const list=document.getElementById('trackList');
  list.innerHTML='';
  const trackIdxs=getLocTracks(packId,currentLocId);
  const packTracks=getAllPackTracks(pack);
  const playBtn=document.getElementById('trackListPlayBtn');
  if(playBtn){ const whole=biomeUsesWholePack(); playBtn.title=whole?'Shuffle-play the whole pack':'Shuffle-play this list'; playBtn.querySelector('span').textContent=whole?'Play all':'Play'; playBtn.disabled=!playIdxs().length; }
  if(trackIdxs.length===0){
    list.innerHTML=biomeUsesWholePack()
      ? '<div class="empty-state">No tracks in this biome yet, so the whole pack plays here, shuffled.<br>Tap Add below to give it its own.</div>'
      : '<div class="empty-state">No tracks yet. Until it has some, live location skips this place and plays the biome around you.<br>Tap Add below to add some.</div>';
    return;
  }
  trackIdxs.forEach((tIdx,i)=>{
    const t=packTracks[tIdx];
    if(!t)return;
    const item=document.createElement('div');
    const here=favPlaying==null&&i===currentTrackPlayIdx;
    item.className='track-item clickable'+(here?' playing':'');
    item.onclick=e=>{if(!e.target.closest('.track-actions'))selectTrack(i)};
    const pinned=getPinnedIdx(packId,currentLocId)===tIdx;
    const numEl=document.createElement('div');
    numEl.className='track-num';
    numEl.innerHTML=here?ic('play','ic-sm'):(i+1);
    item.appendChild(numEl);
    const infoEl=document.createElement('div');
    infoEl.className='track-info';
    infoEl.innerHTML='<div class="track-title">'+esc(t.title)+'</div><div class="track-game">'+fmt(t.dur)+'</div>';
    item.appendChild(infoEl);
    const actEl=document.createElement('div');
    actEl.className='track-actions';
    const pinBtn=document.createElement('button');
    pinBtn.className='t-btn'+(pinned?' on':'');
    pinBtn.title='Pin';
    pinBtn.innerHTML=ic('bookmark','ic-sm');
    pinBtn.onclick=()=>doTogglePin(tIdx);
    actEl.appendChild(pinBtn);
    const remBtn=document.createElement('button');
    remBtn.className='t-btn danger';
    remBtn.title='Remove';
    remBtn.innerHTML=ic('x','ic-sm');
    remBtn.onclick=()=>doRemoveTrack(tIdx);
    actEl.appendChild(remBtn);
    item.appendChild(actEl);
    list.appendChild(item);
  });
}

function doTogglePin(tIdx){
  const packId=getPackId();
  const cur=getPinnedIdx(packId,currentLocId);
  setPinnedIdx(packId,currentLocId,cur===tIdx?undefined:tIdx);
  renderTrackList();updatePinStatus();
}
function doRemoveTrack(tIdx){
  const packId=getPackId();
  const tracks=getLocTracks(packId,currentLocId).filter(t=>t!==tIdx);
  setLocTracks(packId,currentLocId,tracks);
  if(currentTrackPlayIdx>=tracks.length)currentTrackPlayIdx=Math.max(0,tracks.length-1);
  renderTrackList();updateNowPlaying();
  if(tracks.length===0){isPlaying=false;pauseTrack();}
  else if(isPlaying)playCurrentTrack();
}
function selectTrack(i){
  favPlaying=null; favQueue=[];
  currentTrackPlayIdx=i;renderTrackList();updateNowPlaying();playCurrentTrack(false);isPlaying=true;
}
function updatePinStatus(){
  const packId=getPackId();
  const pinned=getPinnedIdx(packId,currentLocId);
  const pack=getActivePack();
  const el=document.getElementById('pinStatus');
  const allT=getAllPackTracks(pack);
  if(pinned!==undefined&&allT[pinned]){el.innerHTML=ic('bookmark','ic-sm')+` ${esc(allT[pinned].title)}`;}
  else el.textContent='';
}

// ═══════════════════════════════════════════
// NOW PLAYING + PLAYBACK
// ═══════════════════════════════════════════
function updateNowPlaying(){
  const packId=getPackId();
  const pack=getActivePack();
  const trackIdxs=playIdxs();
  if(trackIdxs.length===0&&favPlaying==null){
    updateFavBtn();
    document.getElementById('npTrack').textContent='No tracks';
    document.getElementById('npGame').textContent='Add tracks below ↓';
    setNowPlayingSource(null);
    {const yb=document.getElementById('npYtBtn');yb.onclick=null;yb.disabled=true;}
    resetProgress();return;
  }
  const tIdx=currentPackTIdx();
  const allTracks=getAllPackTracks(pack);
  const t=allTracks?.[tIdx];
  updateFavBtn();
  if(!t)return;
  document.getElementById('npTrack').textContent=t.title;
  document.getElementById('npGame').textContent=(favPlaying!=null?favTag:'')+(pack?.source||pack?.name||'');
  setNowPlayingSource(t);
  const ytVid=t.videoId||pack?.videoId;
  {const yb=document.getElementById('npYtBtn');yb.disabled=false;yb.onclick=()=>window.open('https://www.youtube.com/watch?v='+encodeURIComponent(ytVid)+'&t='+(parseInt(t.start,10)||0),'_blank','noopener');}
  resetProgress();
}
function getTrackSrc(pack, t, autoplay){
  const vid = t.videoId || pack.videoId;
  return `https://www.youtube-nocookie.com/embed/${vid}?autoplay=${autoplay?1:0}&start=${t.start}&controls=1&modestbranding=1&rel=0`;
}
async function playCurrentTrack(useFade){
  const packId=getPackId();
  const pack=getActivePack();
  const trackIdxs=playIdxs();
  if((trackIdxs.length===0&&favPlaying==null)||!pack)return;
  const tIdx=currentPackTIdx();
  const allTracks=getAllPackTracks(pack);
  const t=allTracks[tIdx];
  if(!t)return;
  const token=++packsPlayToken;
  stopPacksTicker(); setPlayerBusy(true);
  // SoundCloud track (custom packs): SoundCloud's own player, in the video slot
  if(scTrackUrl(t.soundcloudUrl)){
    if(ytPlayer?.stopVideo) try{ ytPlayer.stopVideo(); }catch(e){}
    if(spotifyActive){ spotifyPausePlayback(); spotifyActive=false; }
    packsSpQueue=null; packsYtTrack=null; updateSpotifyNowPlaying(false,t);
    scActive=true;
    try{ await scPlay(scTrackUrl(t.soundcloudUrl)); }
    catch(e){ scActive=false; setPlayerBusy(false); isPlaying=false; setPlayIcon(false); spotifyShowSnack(e.message||'SoundCloud could not load.'); return; }
    if(token!==packsPlayToken) return;
    setPlayIcon(true); setPlayerBusy(true); // spins until SoundCloud actually starts
    document.getElementById('playingBars').style.display='flex';
    const btn=document.getElementById('npYtBtn');
    if(btn){ btn.disabled=false; btn.title='Open on SoundCloud'; btn.setAttribute('aria-label',btn.title); btn.onclick=()=>window.open(scTrackUrl(t.soundcloudUrl),'_blank','noopener'); }
    setPacksMediaSession(t); startPacksTicker(t);
    return;
  }
  stopSoundCloud();
  // Spotify path: hand Spotify the whole upcoming queue, so it keeps playing with the screen off
  if(t.spotifyUri && spotifyCanPlay() && (preferredPlatform()!=='youtube' || !t.videoId)){
    if(ytPlayer?.stopVideo) try{ ytPlayer.stopVideo(); }catch(e){}
    const queue=packsSpotifyQueue();
    const ok=await spotifyPlayUris(queue.map(q=>q.uri));
    if(token!==packsPlayToken) return;
    if(ok){
      packsSpQueue=queue;
      spotifyActive=true;
      setPlayIcon(true);
      document.getElementById('playingBars').style.display='flex';
      updateSpotifyNowPlaying(true, t);
      setPacksMediaSession(t);
      startPacksTicker(t);
      return;
    }
  }
  spotifyActive=false; packsSpQueue=null;
  updateSpotifyNowPlaying(false, t);
  // Spotify-only track and Spotify can't play it: there is no YouTube to fall back to
  if(t.spotifyUri && !t.videoId && spotifyCanPlay() && (playIdxs().length>1||favQueue.length)){
    skipUnplayable('spotify'); // Spotify refused this one (e.g. region-locked): move on
    return;
  }
  if(t.spotifyUri && !t.videoId){
    isPlaying=false;
    if(ytPlayer?.stopVideo) try{ ytPlayer.stopVideo(); }catch(e){}
    setPlayIcon(false); stopProgress(); setPlayerBusy(false);
    document.getElementById('playingBars').style.display='none';
    if(isSpotifyConnected() && !spotifyCanPlay()) spotifyShowSnack(spotifyWhyNot());
    else if(isSpotifyConnected()) spotifyShowSnack('Spotify could not play this track.');
    else openSpotifyNeeded();
    return;
  }
  // YouTube: the IFrame API player, started at the track's timestamp. No end time is set, so with
  // the screen off the soundtrack simply carries on into its next track instead of stopping.
  const vid=t.videoId||pack.videoId;
  if(!YT_ID.test(vid||'')){ setPlayerBusy(false); spotifyShowSnack('This track has no playable video.'); return; }
  try{
    const p=await ensureYtPlayer();
    if(token!==packsPlayToken) return;
    p.loadVideoById({videoId:vid, startSeconds:Math.max(0,Number(t.start)||0)});
    packsYtTrack={key:vid+'@'+t.start, vid, start:Number(t.start)||0, dur:Number(t.dur)||0};
  }catch(e){ setPlayerBusy(false); spotifyShowSnack('YouTube could not load. Check your connection.'); return; }
  setPlayIcon(true); setPlayerBusy(true); // spins until YouTube actually starts
  document.getElementById('playingBars').style.display='flex';
  setPacksMediaSession(t);
  startPacksTicker(t);
}
async function pauseTrack(){
  setPlayerBusy(false);
  if(scActive){
    try{ scWidget?.pause(); }catch(e){}
  } else if(spotifyActive){
    await spotifyPausePlayback();
  } else if(ytPlayer?.pauseVideo){
    try{ ytPlayer.pauseVideo(); }catch(e){}
  }
  setPlayIcon(false);
  document.getElementById('playingBars').style.display='none';
}
async function togglePlay(){
  spotifyUnlockAudio();
  if(appMode==='local') return localTogglePlay();
  if(isPlaying){
    isPlaying=false;
    await pauseTrack();
  } else {
    isPlaying=true;
    if(scActive&&scWidget){
      scWidget.play(); setPlayIcon(true);
      document.getElementById('playingBars').style.display='flex';
    } else if(spotifyActive){
      await spotifyResumePlayback();
      setPlayIcon(true);
      document.getElementById('playingBars').style.display='flex';
    } else if(packsYtTrack&&ytPlayer?.playVideo&&packsYtTrack.key===currentPacksTrackKey()){
      ytPlayer.playVideo(); // resume where it paused (it used to restart the track)
      setPlayIcon(true);
      document.getElementById('playingBars').style.display='flex';
    } else {
      playCurrentTrack();
    }
  }
}
function nextTrack(){
  if(appMode==='local') return localStep(1);
  if(favPlaying!=null){
    if(favQueue.length&&!(pendingBiomeId&&pendingBiomeId!==currentLocId)){
      favPlaying=favQueue.shift(); renderTrackList(); updateNowPlaying(); renderFavList();
      if(isPlaying) playCurrentTrack(true);
      return;
    }
    favPlaying=null; favQueue=[]; renderFavList(); // favourites done: back to the biome's own list
  }
  // Apply pending biome change at track boundary
  if(pendingBiomeId && pendingBiomeId !== currentLocId){
    const bid=pendingBiomeId;
    pendingBiomeId=null;
    loadLocation(bid, false, true); // true = show toast
    chime('switch'); noticedBiomeId=null;
    // Arrived at a saved place — the "switching after this track" notice is now done
    if(trackingActive && getAllCustomLocs().some(l=>l.id===bid)) setTrackingUI(true,'You\'re here','here');
    else if(trackingActive&&biomeDisplayName(bid)) setTrackingUI(true,'Now in '+biomeDisplayName(bid),'world');
    return; // loadLocation will call playCurrentTrack
  }
  pendingBiomeId=null;
  const t=currentTracks();
  if(t.length<=1){currentTrackPlayIdx=0;}
  else{
    if(shuffleQueue.length===0) shuffleQueue=buildShuffleQueue(t.length,currentTrackPlayIdx);
    currentTrackPlayIdx=shuffleQueue.shift();
  }
  renderTrackList();updateNowPlaying();if(isPlaying)playCurrentTrack(true);
}
function prevTrack(){
  if(appMode==='local') return localStep(-1);
  if(favPlaying!=null){ if(isPlaying) playCurrentTrack(true); return; } // favourites: back to the start of this one
  const t=currentTracks();
  currentTrackPlayIdx=(currentTrackPlayIdx-1+t.length)%t.length;
  renderTrackList();updateNowPlaying();if(isPlaying)playCurrentTrack(true);
}
function setPlayIcon(p){document.getElementById('playBtn').innerHTML=p?ic('pause'):ic('play'); if(p) setPlayerBusy(false);}
// The player is working on something (starting a song or station, loading a channel or biome).
// Cleared when playback starts, fails, pauses or stops; never left spinning longer than 20 seconds.
let playerBusyTimer=null;
function setPlayerBusy(on){
  document.getElementById('geovibes-app')?.classList.toggle('player-busy',!!on);
  document.getElementById('playBtn')?.setAttribute('aria-busy',on?'true':'false');
  clearTimeout(playerBusyTimer);
  if(on) playerBusyTimer=setTimeout(()=>setPlayerBusy(false),20000);
}
// A status line that is waiting on something: spinner + text (text is escaped)
function busyText(el,text){ if(el) el.innerHTML='<span class="mm-busy-text"><span class="mm-spinner" aria-hidden="true"></span><span>'+esc(text)+'</span></span>'; }
// Video (or Spotify album art) above the song name: a setting (Settings > Play songs), the same in both modes.
// On by default: YouTube's terms ask for its player to stay visible while it plays.
function setShowVideo(on){
  videoVisible=!!on; ss('showVideo',videoVisible);
  document.getElementById('ytContainer').style.display=videoVisible?'block':'none';
  document.getElementById('geovibes-app')?.classList.toggle('mm-novideo',!videoVisible);
}
function toggleVideo(){ setShowVideo(!videoVisible); }
function updateVideoToggleLabel(){} // (the player button moved to Settings)
let progressTrackStart=0; // wall-clock ms when track started playing
let progressTrackDur=0;
let progressPaused=false;

function startProgress(dur){
  stopProgress();
  progressSeconds=0;
  progressTrackDur=dur;
  progressTrackStart=Date.now();
  progressPaused=false;
  document.getElementById('progressDur').textContent=dur?fmt(dur):'0:00';
  // Schedule biome check 10s before track ends
  if(trackingActive && dur > 15){
    const checkDelay = Math.max((dur - 10) * 1000, 2000);
    setTimeout(()=>{ if(isPlaying && trackingActive) checkBiomeInBackground(); }, checkDelay);
  }
  progressTimer=setInterval(()=>{
    if(progressPaused) return;
    // Use real elapsed time as source of truth
    const elapsed=Math.floor((Date.now()-progressTrackStart)/1000);
    progressSeconds=Math.min(elapsed,dur);
    document.getElementById('progressFill').style.width=(progressSeconds/dur*100)+'%';
    document.getElementById('progressTime').textContent=fmt(progressSeconds);
    if(progressSeconds>=dur && !spotifyActive) nextTrack();
  },500); // 500ms ticks for smoother bar
}
function pauseProgress(){
  progressPaused=true;
}
function resumeProgress(){
  // Recalculate start so elapsed time is correct after pause
  progressTrackStart=Date.now()-progressSeconds*1000;
  progressPaused=false;
}
function stopProgress(){if(progressTimer){clearInterval(progressTimer);progressTimer=null;}}
function resetProgress(){stopProgress();progressSeconds=0;progressTrackDur=0;document.getElementById('progressFill').style.width='0%';document.getElementById('progressTime').textContent='0:00';document.getElementById('progressDur').textContent='0:00';}
function fmt(s){return`${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`}

// ═══════════════════════════════════════════
// TRACK PICKER
// ═══════════════════════════════════════════
function openTrackPicker(){
  pickerTargetLocId=currentLocId;
  const packId=getPackId();
  const pack=getActivePack();
  const loc=pack?.biomes.find(b=>b.id===currentLocId)||getAllCustomLocs().find(l=>l.id===currentLocId);
  const ov=getBiomeOverride(packId,currentLocId);
  const displayName=(ov.name||loc?.name||currentLocId).toUpperCase();
  document.getElementById('pickerTitle').textContent='ADD TO '+displayName;
  document.getElementById('pickerSearch').value='';
  // Spotify search adds Spotify tracks, so it's only offered in your own Spotify packs
  const spOk=pickerCanAddSpotify(pack);
  document.getElementById('pickerTabs').hidden=!spOk;
  switchPickerTab('yt');
  document.getElementById('trackPickerOverlay').classList.add('open');
  renderPickerList('');
}
function closeTrackPicker(e){if(e.target===document.getElementById('trackPickerOverlay'))closeTrackPickerDirect();}
function closeTrackPickerDirect(){document.getElementById('trackPickerOverlay').classList.remove('open');}
function filterPicker(){renderPickerList(document.getElementById('pickerSearch').value.toLowerCase());}
function buildTrackBiomeIndex(packId, pack){
  // Returns Map<globalIdx, [{id, name, emoji}]> — all biomes/locs that contain each track
  const index = new Map();
  const deletedBiomes = new Set(gs(packKey(packId,'deletedBiomes'),[]));
  const allBiomes = (pack?.biomes||[]).filter(b=>!deletedBiomes.has(b.id));
  const customLocs = getAllCustomLocs();
  const allLocs = [
    ...allBiomes.map(b=>{ const ov=getBiomeOverride(packId,b.id); return {id:b.id, name:ov.name||b.name, emoji:ov.emoji||b.emoji}; }),
    ...customLocs.map(cl=>({id:cl.id, name:cl.name, emoji:cl.emoji}))
  ];
  allLocs.forEach(loc=>{
    getLocTracks(packId,loc.id).forEach(gIdx=>{
      if(!index.has(gIdx)) index.set(gIdx,[]);
      index.get(gIdx).push(loc);
    });
  });
  return index;
}

function renderPickerList(q){
  const packId=getPackId();
  const pack=getActivePack();
  const existing=new Set(getLocTracks(packId,pickerTargetLocId));
  const biomeIndex=buildTrackBiomeIndex(packId,pack);
  const list=document.getElementById('pickerList');
  list.innerHTML='';
  const tracks=getAllPackTracks(pack);
  if(tracks.length===0){list.innerHTML='<div class="empty-state">This pack has no tracks yet.<br>Tap Add videos to add a YouTube video, then import its timestamps.</div>';return;}
  const filtered=tracks.filter(t=>!q||t.title.toLowerCase().includes(q));
  filtered.forEach(t=>{
    const gIdx=t.globalIdx;
    const added=existing.has(gIdx);
    const item=document.createElement('div');
    item.className='modal-track-item';
    item.style.cssText=added?'opacity:1;background:rgba(74,222,128,.07);border-color:rgba(74,222,128,.3)':'';
    const addIcon=document.createElement('span');
    addIcon.className='modal-track-add';
    addIcon.style.color=added?'var(--green)':'var(--accent2)';
    addIcon.innerHTML=added?ic('check','ic-sm'):ic('plus','ic-sm');
    item.appendChild(addIcon);
    const infoD=document.createElement('div');
    infoD.style.flex='1';
    // Track title + duration
    const titleRow=document.createElement('div');
    titleRow.style.cssText='font-size:13px;font-weight:500;color:#fff;display:flex;align-items:baseline;gap:6px;flex-wrap:wrap';
    const titleSpan=document.createElement('span');
    titleSpan.textContent=t.title;
    titleRow.appendChild(titleSpan);
    // Show video label when pack has multiple videos
    if(t.videoId && pack.videos && pack.videos.length > 1){
      const vidLabel=document.createElement('span');
      vidLabel.style.cssText='font-size:10px;color:var(--muted);font-style:italic';
      vidLabel.textContent='| '+(videoTitleCache[t.videoId]||t.videoId);
      titleRow.appendChild(vidLabel);
      // Fetch title async if not cached
      if(!videoTitleCache[t.videoId]){
        fetchVideoTitle(t.videoId).then(title=>{
          vidLabel.textContent='| '+title;
        });
      }
    }
    infoD.appendChild(titleRow);
    const metaRow=document.createElement('div');
    metaRow.style.cssText='font-size:11px;color:var(--muted)';
    metaRow.textContent=fmt(t.dur)+(added?' · tap to remove':'');
    infoD.appendChild(metaRow);
    // Biome usage row — show emojis of all biomes this track appears in
    const usedIn=(biomeIndex.get(gIdx)||[]).filter(loc=>loc.id!==pickerTargetLocId);
    if(usedIn.length>0){
      const usageRow=document.createElement('div');
      usageRow.style.cssText='font-size:11px;margin-top:2px;display:flex;align-items:center;gap:3px;flex-wrap:wrap';
      const usageLabel=document.createElement('span');
      usageLabel.style.cssText='color:var(--muted);font-size:10px;margin-right:2px';
      usageLabel.textContent='also in:';
      usageRow.appendChild(usageLabel);
      usedIn.forEach(loc=>{
        const chip=document.createElement('span');
        chip.title=loc.name;
        chip.style.cssText='font-size:13px;line-height:1;cursor:default';
        chip.textContent=loc.emoji;
        usageRow.appendChild(chip);
      });
      infoD.appendChild(usageRow);
    }
    item.appendChild(infoD);
    item.onclick=()=>{
      const cur=getLocTracks(packId,pickerTargetLocId);
      if(added){
        setLocTracks(packId,pickerTargetLocId,cur.filter(x=>x!==gIdx));
      } else {
        setLocTracks(packId,pickerTargetLocId,[...cur,gIdx]);
      }
      if(pickerTargetLocId===currentLocId){renderTrackList();updateNowPlaying();}
      renderPickerList(q);
    };
    list.appendChild(item);
  });
  if(filtered.length===0)list.innerHTML='<div class="empty-state">No tracks found.</div>';
}

// ═══════════════════════════════════════════
// LOCATION EDIT MODAL (biomes + custom)
// ═══════════════════════════════════════════
function openLocEdit(locId,isCustom,prefillLat,prefillLon){
  editingLocId=locId;
  editingLocIsCustom=isCustom;
  const packId=getPackId();
  let loc, name, emoji, lat='', lon='', radius=200;

  if(!isCustom&&locId){
    // editing a biome: load from pack + overrides
    const pack=getActivePack();
    const base=pack?.biomes.find(b=>b.id===locId)||{};
    const ov=getBiomeOverride(packId,locId);
    name=ov.name||base.name||'';
    emoji=ov.emoji||base.emoji||'📍';
    selectedLocEmoji=emoji;
  } else if(locId){
    loc=getAllCustomLocs().find(l=>l.id===locId)||{};
    name=loc.name||''; emoji=loc.emoji||'🏠';
    selectedLocEmoji=emoji;
    // Migrate legacy single-pin to pins array
    editingPins = loc.pins ? JSON.parse(JSON.stringify(loc.pins))
      : (loc.lat ? [{lat:loc.lat,lon:loc.lon,radius:loc.radius||200}] : []);
  } else {
    name=''; selectedLocEmoji='🏠';
    editingPins = [];
    // Pre-fill from map click or current location
    if(prefillLat!==undefined) editingPins=[{lat:prefillLat,lon:prefillLon,radius:200}];
  }

  document.getElementById('locEditTitle').textContent=locId?'EDIT LOCATION':'NEW LOCATION';
  const tracksBtnRow=document.getElementById('leTracksBtnRow');
  if(tracksBtnRow) tracksBtnRow.style.display=locId?'block':'none';
  document.getElementById('leNameInput').value=name;
  document.getElementById('leCoordSection').style.display=(isCustom||!locId)?'block':'none';
  renderLePinList();

  const delBtn=document.getElementById('leDeleteBtn');
  // Show delete for: any custom loc, any preset custom loc, any biome override
  // Hide only when creating a new location (no locId)
  delBtn.style.display=locId?'block':'none';

  renderLocEmojiPicker();
  document.getElementById('locEditOverlay').classList.add('open');
}
function closeLocEdit(e){if(!e||e.target===document.getElementById('locEditOverlay'))document.getElementById('locEditOverlay').classList.remove('open');}

function openTrackPickerFromLocEdit(){
  // Save current edits silently first so the picker reflects this location
  const name=document.getElementById('leNameInput').value.trim();
  if(name) saveLocEdit(); // saveLocEdit closes the modal — reopen picker after
  // If editingLocId is set, open picker for it; otherwise use currentLocId
  const targetId=editingLocId||currentLocId;
  document.getElementById('locEditOverlay').classList.remove('open');
  // Small delay so modal close animation doesn't conflict
  setTimeout(()=>{
    pickerTargetLocId=targetId;
    const packId=getPackId();
    const pack=getActivePack();
    const loc=pack?.biomes.find(b=>b.id===targetId)||getAllCustomLocs().find(l=>l.id===targetId);
    const ov=getBiomeOverride(packId,targetId);
    const displayName=(ov.name||loc?.name||targetId).toUpperCase();
    document.getElementById('pickerTitle').textContent='TRACKS FOR '+displayName;
    document.getElementById('pickerSearch').value='';
    document.getElementById('trackPickerOverlay').classList.add('open');
    renderPickerList('');
  },150);
}
function renderLocEmojiPicker(){
  const p=document.getElementById('leEmojiPicker');
  if(!p)return;
  p.innerHTML='';
  EMOJI_OPTIONS.forEach(em=>{
    const b=document.createElement('button');
    b.className='emoji-opt'+(em===selectedLocEmoji?' sel':'');
    b.textContent=em;b.type='button';
    b.onclick=()=>{selectedLocEmoji=em;renderLocEmojiPicker();};
    p.appendChild(b);
  });
  // Custom emoji input
  const wrap=document.createElement('div');
  wrap.style.cssText='display:flex;gap:5px;margin-top:6px;width:100%';
  wrap.innerHTML=`<input id="customLocEmojiInput" placeholder="Type emoji…" maxlength="4"
    style="flex:1;background:var(--surface2);border:1px solid var(--border2);border-radius:7px;padding:5px 9px;color:#fff;font-size:16px;outline:none;min-width:0"
    oninput="if(this.value.trim()){selectedLocEmoji=this.value.trim();renderLocEmojiPicker()}"/>
  <button type="button" class="emoji-opt sel" style="flex-shrink:0;min-width:40px;font-size:16px"
    onclick="document.getElementById('customLocEmojiInput').focus()">${selectedLocEmoji}</button>`;
  p.appendChild(wrap);
}
function fillCurrentCoords(){ addCurrentLocationPin(); } // legacy alias
function addCurrentLocationPin(){
  if(lastLat!==null){
    editingPins.push({lat:lastLat,lon:lastLon,radius:200});
    renderLePinList();
  } else {
    navigator.geolocation&&navigator.geolocation.getCurrentPosition(pos=>{
      lastLat=pos.coords.latitude;lastLon=pos.coords.longitude;
      editingPins.push({lat:lastLat,lon:lastLon,radius:200});
      renderLePinList();
    });
  }
}

function renderLePinList(){
  const list=document.getElementById('lePinList');
  if(!list) return;
  list.innerHTML='';
  if(editingPins.length===0){
    list.innerHTML='<div style="font-size:12px;color:var(--muted);padding:4px 0">No pins yet — add from map or use your location.</div>';
    return;
  }
  editingPins.forEach((pin,i)=>{
    const row=document.createElement('div');
    row.className='pin-row';
    const coordsDiv=document.createElement('div');
    coordsDiv.className='pin-row-coords';
    coordsDiv.innerHTML=pin.lat.toFixed(5)+', '+pin.lon.toFixed(5)
      +'<div class="pin-row-radius">'+esc(fmtRadius(pin.radius))+' radius</div>';
    // Radius input
    const radInput=document.createElement('input');
    radInput.type='number';
    radInput.value=pin.radius;
    radInput.min=50;radInput.max=5000;radInput.step=50;
    radInput.style.cssText='width:70px;background:var(--surface);border:1px solid var(--border2);border-radius:6px;padding:4px 7px;color:#fff;font-size:12px;text-align:center;outline:none';
    radInput.oninput=function(){ editingPins[i].radius=parseInt(this.value)||200; coordsDiv.querySelector('.pin-row-radius').textContent=fmtRadius(editingPins[i].radius)+' radius'; };
    const delBtn=document.createElement('button');
    delBtn.className='pin-row-del';
    delBtn.innerHTML=ic('x','ic-sm');
    delBtn.onclick=()=>{ editingPins.splice(i,1); renderLePinList(); };
    row.appendChild(coordsDiv);
    row.appendChild(radInput);
    row.appendChild(delBtn);
    list.appendChild(row);
  });
}
function saveLocEdit(){
  const name=document.getElementById('leNameInput').value.trim();
  if(!name){alert('Please enter a name.');return;}
  const packId=getPackId();

  if(!editingLocIsCustom&&editingLocId){
    // Save biome override (name + emoji only)
    setBiomeOverride(packId,editingLocId,{name,emoji:selectedLocEmoji});
    document.getElementById('locEditOverlay').classList.remove('open');
    renderLocGrid();
    if(currentLocId===editingLocId)loadLocation(editingLocId,false);
    return;
  }

  // Custom location — use pins array
  const locs=gs('customLocs',[]);
  // Legacy compat: also store first pin's lat/lon/radius at top level
  const firstPin=editingPins[0]||null;
  const legacyLat=firstPin?firstPin.lat:null;
  const legacyLon=firstPin?firstPin.lon:null;
  const legacyRadius=firstPin?firstPin.radius:200;

  if(editingLocId){
    const preset=PRESET_CUSTOM.find(p=>p.id===editingLocId);
    if(preset){
      const idx=locs.findIndex(l=>l.id===editingLocId);
      const updated={...preset,name,emoji:selectedLocEmoji,lat:legacyLat,lon:legacyLon,radius:legacyRadius,pins:editingPins};
      if(idx>=0)locs[idx]=updated;else locs.push(updated);
    } else {
      const idx=locs.findIndex(l=>l.id===editingLocId);
      if(idx>=0)locs[idx]={...locs[idx],name,emoji:selectedLocEmoji,lat:legacyLat,lon:legacyLon,radius:legacyRadius,pins:editingPins};
    }
  } else {
    const newId='custom_'+Date.now();
    locs.push({id:newId,name,emoji:selectedLocEmoji,cssClass:'biome-custom',isCustom:true,isPreset:false,lat:legacyLat,lon:legacyLon,radius:legacyRadius,pins:editingPins,defaultTracks:[]});
  }
  saveCustomLocs(locs);
  document.getElementById('locEditOverlay').classList.remove('open');
  renderLocGrid();
  renderCustomPins();
  if(leafletMap&&lastLat) updateMapPin(lastLat,lastLon,false);
}
function deleteCustomLoc(){
  if(!editingLocId||!confirm('Delete this location? This will also remove its tracks from the playlist.'))return;
  document.getElementById('locEditOverlay').classList.remove('open');

  if(!editingLocIsCustom){
    // Deleting a biome from the pack — store as a deleted biome override
    const packId=getPackId();
    const deleted=gs(packKey(packId,'deletedBiomes'),[]);
    if(!deleted.includes(editingLocId)) deleted.push(editingLocId);
    ss(packKey(packId,'deletedBiomes'),deleted);
  } else {
    saveCustomLocs(gs('customLocs',[]).filter(l=>l.id!==editingLocId));
  }

  if(currentLocId===editingLocId) loadLocation('beach',false,false);
  else{ renderLocGrid(); renderCustomPins(); }
}

// ═══════════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════════
// ── FAVOURITE TRACKS (Biome Beats) ── the ♡ next to the track name; listed in the Packs tab
const FAV_KEY='packFavs';
function getFavs(){
  const a=gs(FAV_KEY,[]);
  return (Array.isArray(a)?a:[]).filter(f=>f&&typeof f.packId==='string'&&Number.isInteger(f.tIdx)&&f.tIdx>=0);
}
function putFavs(a){ ss(FAV_KEY,a.slice(-500)); }
const isFav=(packId,tIdx)=>getFavs().some(f=>f.packId===packId&&f.tIdx===tIdx);
function toggleFav(packId,tIdx,title,packName){
  const all=getFavs(), had=all.some(f=>f.packId===packId&&f.tIdx===tIdx);
  putFavs(had?all.filter(f=>!(f.packId===packId&&f.tIdx===tIdx))
    :[...all,{packId,tIdx,title:String(title||'').slice(0,160),pack:String(packName||'').slice(0,80),at:Date.now()}]);
  spotifyShowSnack(had?'Removed from favourites':'Added to favourites (Packs tab)');
  updateFavBtn(); renderFavList();
}
function toggleFavCurrent(){
  const pack=getActivePack(), tIdx=currentPackTIdx(), t=getAllPackTracks(pack)[tIdx];
  if(t) toggleFav(pack.id,tIdx,t.title,pack.name);
}
function updateFavBtn(){
  const b=document.getElementById('npHeartBtn'); if(!b||isLocalMode()) return;
  const pack=getActivePack(), tIdx=currentPackTIdx(), t=getAllPackTracks(pack)[tIdx];
  const on=!!t&&isFav(pack.id,tIdx);
  b.disabled=!t; b.classList.toggle('saved',on); b.setAttribute('aria-pressed',on);
  const label=on?'Remove from favourites':'Add to favourites'; b.setAttribute('aria-label',label); b.title=label;
}
function renderFavList(){
  const el=document.getElementById('favTracks'); if(!el) return;
  el.innerHTML='';
  const favs=getFavs();
  if(!favs.length){ const n=document.createElement('div'); n.className='local-note'; n.textContent='No favourites yet. While a track plays, tap the ♡ next to its name.'; el.append(n); return; }
  const packs=getAllPacks(), activeId=getActivePackId();
  const groups=new Map(); // newest first, grouped by pack
  favs.slice().reverse().forEach(f=>{ if(!groups.has(f.packId)) groups.set(f.packId,[]); groups.get(f.packId).push(f); });
  groups.forEach((list,packId)=>{
    const pack=packs.find(p=>p.id===packId), all=pack?getAllPackTracks(pack):[];
    const packName=pack?.name||list[0].pack||'Removed pack';
    const head=document.createElement('div'); head.className='local-row-wrap';
    const hb=document.createElement('button'); hb.type='button'; hb.className='local-item local-item-top'; hb.disabled=!pack;
    const hi=document.createElement('span'); hi.className='local-item-ic'; hi.textContent='▶';
    const hm=document.createElement('span'); hm.className='local-item-main';
    const hn=document.createElement('span'); hn.className='local-item-name'; hn.style.display='block'; hn.textContent=packName;
    const hs=document.createElement('span'); hs.className='local-item-sub'; hs.style.display='block';
    hs.textContent=pack?'Shuffle-play '+list.length+' favourite'+(list.length===1?'':'s')+', then back to your biome':'This pack is no longer installed';
    hm.append(hn,hs); hb.append(hi,hm); hb.onclick=()=>playFavourites(packId);
    head.append(hb); el.append(head);
    list.forEach(f=>{
      const title=all[f.tIdx]?.title||f.title||'Track';
      const row=document.createElement('div'); row.className='local-row-wrap';
      const b=document.createElement('button'); b.type='button';
      b.className='local-item'+(packId===activeId&&favPlaying===f.tIdx?' active':''); b.disabled=!pack||!all[f.tIdx];
      const icon=document.createElement('span'); icon.className='local-item-ic'; icon.textContent='♪';
      const main=document.createElement('span'); main.className='local-item-main';
      const name=document.createElement('span'); name.className='local-item-name'; name.style.display='block'; name.textContent=title;
      const sub=document.createElement('span'); sub.className='local-item-sub'; sub.style.display='block'; sub.textContent=packName;
      main.append(name,sub); b.append(icon,main);
      b.onclick=()=>playFavourites(packId,f.tIdx);
      const del=document.createElement('button'); del.type='button'; del.className='heart-btn on';
      del.setAttribute('aria-pressed','true'); del.setAttribute('aria-label','Remove '+title+' from favourites'); del.innerHTML=SAVE_BTN_HTML;
      del.onclick=()=>toggleFav(packId,f.tIdx,title,packName);
      row.append(b,del); el.append(row);
    });
  });
}
// Plays a pack's favourites, shuffled (the tapped one first), then the biome carries on
function playFavourites(packId,startTIdx){
  const pack=getAllPacks().find(p=>p.id===packId);
  if(!pack){ spotifyShowSnack('That pack isn’t installed any more.'); return; }
  const all=getAllPackTracks(pack);
  let list=[...new Set(getFavs().filter(f=>f.packId===packId&&all[f.tIdx]).map(f=>f.tIdx))];
  if(!list.length) return;
  spotifyUnlockAudio();
  if(getActivePackId()!==packId){ isPlaying=false; pauseTrack(); activatePack(packId); } else switchTab('player');
  list=shuffledIdx(list.length).map(i=>list[i]);
  if(startTIdx!=null&&list.includes(startTIdx)) list=[startTIdx,...list.filter(x=>x!==startTIdx)];
  favPlaying=list[0]; favQueue=list.slice(1); favTag='♥ Favourites · '; shuffleQueue=[];
  isPlaying=true; renderTrackList(); updateNowPlaying(); renderFavList(); playCurrentTrack(false);
}

// ── REMOVED & DISLIKED ──
// One list of everything removed with 👎 (Settings > Removed & disliked). Biome removals change the biome's
// own list too; "whole pack" takes the track out of every biome and place in that pack and out of whole-pack shuffles;
// Popular songs, Homegrown artists and radio stations are hidden from those lists wherever you listen.
const DISLIKE_KEY='dislikes';
const DISLIKE_TABS=[['biome','Biomes & places'],['pack','Whole pack'],['popular','Popular'],['made','Homegrown'],['radio','Radio']];
function getDislikes(){
  const d=gs(DISLIKE_KEY,[]);
  return (Array.isArray(d)?d:[]).filter(x=>x&&typeof x==='object'&&DISLIKE_TABS.some(t=>t[0]===x.kind)&&typeof x.key==='string'&&x.key);
}
function putDislikes(a){ ss(DISLIKE_KEY,a.slice(-500)); }
function addDislike(entry){
  const all=getDislikes().filter(d=>!(d.kind===entry.kind&&d.key===entry.key));
  all.push({...entry, title:String(entry.title||'').slice(0,160), sub:String(entry.sub||'').slice(0,160), at:Date.now()});
  putDislikes(all);
}
function dropDislike(kind,key){ putDislikes(getDislikes().filter(d=>!(d.kind===kind&&d.key===key))); }
const dislikedKeys=kind=>new Set(getDislikes().filter(d=>d.kind===kind).map(d=>d.key));
// keys for Local Listening (the same song or station anywhere)
const chanDislikeKey=it=>it.kind==='artist'?String(it.name||'').toLowerCase():songKey(it);
function chanItemsWithoutDisliked(items){
  if(localChannel!=='popular'&&localChannel!=='made') return items;
  const gone=dislikedKeys(localChannel); if(!gone.size) return items;
  return items.filter(x=>!gone.has(chanDislikeKey(x)));
}
function stationsWithoutDisliked(arr){
  const gone=dislikedKeys('radio'); return gone.size?(arr||[]).filter(s=>!gone.has(s.uuid)):arr;
}
// whole-pack dislikes for a pack (track numbers)
const packDisliked=packId=>new Set(getDislikes().filter(d=>d.kind==='pack'&&d.packId===packId).map(d=>d.tIdx));

let removedTab=null;
function removedRows(){
  const rows={biome:[],pack:[],popular:[],made:[],radio:[]};
  const all=getDislikes();
  all.forEach(d=>rows[d.kind].push({title:d.title, sub:d.sub, restore:()=>restoreDislike(d)}));
  // tracks taken out of a biome another way (the ✕ in a track list), for the pack in use
  const packId=getPackId(), pack=getActivePack(), allTracks=getAllPackTracks(pack);
  const listed=new Set(all.filter(d=>d.kind==='biome').map(d=>d.key));
  const wholePack=packDisliked(packId);
  (pack?.biomes||[]).forEach(b=>{
    const current=new Set(getLocTracks(packId,b.id));
    const ov=getBiomeOverride(packId,b.id);
    (b.defaultTracks||[]).forEach(tIdx=>{
      if(current.has(tIdx)||!allTracks[tIdx]||wholePack.has(tIdx)||listed.has(packId+'|'+b.id+'|'+tIdx)) return;
      rows.biome.push({title:allTracks[tIdx].title, sub:(ov.emoji||b.emoji)+' '+(ov.name||b.name)+' · '+(pack.name||''), restore:()=>restoreTrack(b.id,tIdx)});
    });
  });
  rows.biome.reverse(); rows.pack.reverse(); rows.popular.reverse(); rows.made.reverse(); rows.radio.reverse(); // newest first
  return rows;
}
function renderHiddenTracksList(){
  const list=document.getElementById('hiddenTrackList'), tabs=document.getElementById('removedTabs');
  if(!list||!tabs) return 0;
  const rows=removedRows();
  const total=Object.values(rows).reduce((n,r)=>n+r.length,0);
  if(!removedTab||!rows[removedTab]){
    const mine=isLocalMode()?['popular','made','radio']:['biome','pack'];
    removedTab=mine.find(k=>rows[k].length)||DISLIKE_TABS.map(t=>t[0]).find(k=>rows[k].length)||mine[0];
  }
  tabs.innerHTML='';
  DISLIKE_TABS.forEach(([k,label])=>{
    const b=document.createElement('button'); b.type='button'; b.setAttribute('role','tab'); b.setAttribute('aria-selected',k===removedTab);
    b.textContent=label; const n=document.createElement('span'); n.className='n'; n.textContent=rows[k].length; b.append(n);
    b.onclick=()=>{ removedTab=k; renderHiddenTracksList(); };
    tabs.append(b);
  });
  list.innerHTML='';
  rows[removedTab].forEach(r=>{
    const item=document.createElement('div'); item.className='track-item';
    const info=document.createElement('div'); info.className='track-info';
    const t=document.createElement('div'); t.className='track-title'; t.textContent=r.title;
    const g=document.createElement('div'); g.className='track-game'; g.textContent=r.sub||'';
    info.append(t,g);
    const btn=document.createElement('button'); btn.className='pill-btn'; btn.textContent='Restore'; btn.onclick=r.restore;
    item.append(info,btn); list.append(item);
  });
  if(!rows[removedTab].length){
    const e=document.createElement('div'); e.className='empty-state';
    e.textContent=removedTab==='biome'?'Nothing removed from a biome or place.':removedTab==='pack'?'Nothing removed from a whole pack.':'Nothing removed from '+DISLIKE_TABS.find(t=>t[0]===removedTab)[1]+'.';
    list.append(e);
  }
  return total;
}
function renderHiddenTracks(){
  const n=renderHiddenTracksList();
  const c=document.getElementById('removedTracksCount'); if(c) c.textContent=n?'('+n+')':'(none)';
}
function restoreDislike(d){
  dropDislike(d.kind,d.key);
  if(d.kind==='biome'||d.kind==='pack'){
    const locs=d.kind==='biome'?[d.locId]:(Array.isArray(d.locs)?d.locs:[]);
    locs.forEach(id=>{ if(typeof id!=='string') return; const t=getLocTracks(d.packId,id); if(Number.isInteger(d.tIdx)&&!t.includes(d.tIdx)) setLocTracks(d.packId,id,[...t,d.tIdx]); });
    if(d.packId===getPackId()&&appMode!=='local') renderTrackList();
    spotifyShowSnack('Restored: '+d.title);
  } else spotifyShowSnack('Restored. '+d.title+' is back next time the list loads.');
  renderHiddenTracks();
}

// ── 👎 in the player ──
function closeDislikeMenu(){ document.getElementById('dislikeMenu')?.remove(); }
function dislikeCurrent(e){
  if(e) e.stopPropagation();
  if(document.getElementById('dislikeMenu')){ closeDislikeMenu(); return; }
  if(appMode==='local') return dislikeLocal();
  const packId=getPackId(), pack=getActivePack();
  const tIdx=currentPackTIdx(), t=getAllPackTracks(pack)[tIdx];
  if(!t){ spotifyShowSnack('Nothing playing to remove.'); return; }
  const inHere=getLocTracks(packId,currentLocId).includes(tIdx);
  const here=biomeDisplayName(currentLocId)||'this place';
  const menu=document.createElement('div'); menu.className='dislike-menu'; menu.id='dislikeMenu'; menu.setAttribute('role','menu');
  const head=document.createElement('div'); head.className='t'; head.textContent='Don’t play “'+t.title+'”…'; menu.append(head);
  const opt=(label,sub,fn)=>{ const b=document.createElement('button'); b.type='button'; b.setAttribute('role','menuitem'); b.textContent=label;
    const sm=document.createElement('small'); sm.textContent=sub; b.append(sm); b.onclick=()=>{ closeDislikeMenu(); fn(); }; menu.append(b); return b; };
  if(inHere) opt('In '+here,'Takes it off this list. Other biomes keep it.',()=>dislikeTrack('biome',tIdx));
  opt('Anywhere in '+(pack.name||'this pack'),'Takes it out of every biome and place in this pack.',()=>dislikeTrack('pack',tIdx));
  opt('Cancel','',()=>{});
  (document.getElementById('geovibes-app')?.parentElement||document.body).append(menu); // inside the plugin's wrapper, so it keeps the app's colours
  const r=document.getElementById('npDislikeBtn').getBoundingClientRect(), m=menu.getBoundingClientRect();
  menu.style.left=Math.max(16,Math.min(innerWidth-m.width-16,r.left+r.width/2-m.width/2))+'px';
  menu.style.top=(r.bottom+8+m.height<innerHeight?r.bottom+8:Math.max(8,r.top-m.height-8))+'px';
  menu.querySelector('button')?.focus();
}
document.addEventListener('click',e=>{ if(!e.target.closest('#dislikeMenu,#npDislikeBtn')) closeDislikeMenu(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&document.getElementById('dislikeMenu')){ closeDislikeMenu(); document.getElementById('npDislikeBtn')?.focus(); } });
function dislikeTrack(scope,tIdx){
  const packId=getPackId(), pack=getActivePack(), t=getAllPackTracks(pack)[tIdx]; if(!t) return;
  if(scope==='biome'){
    setLocTracks(packId,currentLocId,getLocTracks(packId,currentLocId).filter(x=>x!==tIdx));
    addDislike({kind:'biome', key:packId+'|'+currentLocId+'|'+tIdx, packId, locId:currentLocId, tIdx, title:t.title, sub:(biomeDisplayName(currentLocId)||currentLocId)+' · '+(pack.name||'')});
    spotifyShowSnack('Won’t play in '+(biomeDisplayName(currentLocId)||'this place')+'. Restore it in Settings.');
  } else {
    const locs=[...(pack.biomes||[]).map(b=>b.id), ...getAllCustomLocs().map(l=>l.id)].filter(id=>getLocTracks(packId,id).includes(tIdx));
    locs.forEach(id=>setLocTracks(packId,id,getLocTracks(packId,id).filter(x=>x!==tIdx)));
    addDislike({kind:'pack', key:packId+'|'+tIdx, packId, tIdx, locs, title:t.title, sub:pack.name||''});
    spotifyShowSnack('Won’t play anywhere in '+(pack.name||'this pack')+'. Restore it in Settings.');
  }
  if(scope==='pack') putFavs(getFavs().filter(f=>!(f.packId===packId&&f.tIdx===tIdx)));
  // carry on with something else from what's left
  if(favPlaying!=null){
    favQueue=favQueue.filter(x=>x!==tIdx);
    if(favPlaying===tIdx){ favPlaying=null; if(favQueue.length) favPlaying=favQueue.shift(); }
    if(favPlaying!=null){ renderTrackList(); updateNowPlaying(); renderHiddenTracks(); renderFavList(); if(isPlaying) playCurrentTrack(true); return; }
    renderFavList();
  }
  shuffleQueue=[];
  const left=playIdxs();
  if(!left.length){ isPlaying=false; pauseTrack(); currentTrackPlayIdx=0; renderTrackList(); updateNowPlaying(); renderHiddenTracks(); return; }
  currentTrackPlayIdx=Math.floor(Math.random()*left.length);
  renderTrackList(); updateNowPlaying(); renderHiddenTracks();
  if(isPlaying) playCurrentTrack(true);
}
function dislikeLocal(){
  const where=placeLabel(localPoint?.place)||'';
  if(localChannel==='radio'){
    const st=localStations[localIdx]; if(!st){ spotifyShowSnack('Nothing playing to remove.'); return; }
    addDislike({kind:'radio', key:st.uuid, title:st.name, sub:where});
    const next=localStations.length>1?localStations[radOrder[(radOrder.indexOf(localIdx)+1)%radOrder.length]]:null;
    const was=localPlaying;
    localStations=localStations.filter(s=>s!==st); buildRadOrder();
    const ni=next?localStations.indexOf(next):-1;
    spotifyShowSnack('Won’t show '+st.name+' again. Restore it in Settings.');
    if(ni>=0&&was){ radOrderPos=Math.max(0,radOrder.indexOf(ni)); playStation(ni); }
    else { if(was){ stopRadio(); setPlayIcon(false); } localIdx=-1; renderLocalList(); }
    renderHiddenTracks(); return;
  }
  if(localChannel!=='popular'&&localChannel!=='made'){ spotifyShowSnack('Saved and shared songs can be removed in Saved.'); return; }
  const it=chanItems[chanIdx]; if(!it){ spotifyShowSnack('Nothing playing to remove.'); return; }
  const made=localChannel==='made';
  addDislike({kind:localChannel, key:chanDislikeKey(it), title:made?it.name:it.title+' — '+it.artist, sub:made?[it.genre,it.place||where].filter(Boolean).join(' · '):(it.genre||'')});
  const next=chanItems.length>1?chanItems[chanNextIdx(chanIdx)]:null, was=chanPlaying;
  chanItems=chanItems.filter(x=>x!==it); chanIdx=-1; buildChanOrder();
  // the same song is also in the other Popular lists: take it out of those too
  if(!made&&chanData?.mixes) chanData.mixes.forEach(m=>{ m.list=m.list.filter(x=>songKey(x)!==songKey(it)); });
  spotifyShowSnack(made?'Won’t show '+it.name+' in Homegrown again. Restore it in Settings.':'Won’t play '+it.title+' again. Restore it in Settings.');
  const ni=next?chanItems.indexOf(next):-1;
  if(ni>=0&&was){ chanOrderPos=Math.max(0,chanOrder.indexOf(ni)); playChanItem(ni); }
  else { if(was) stopChanPlayback(); renderChanList(); setLocalIdle(); }
  renderHiddenTracks();
}
function updateDislikeBtn(){
  const b=document.getElementById('npDislikeBtn'); if(!b) return;
  b.hidden=isLocalMode()&&!['popular','made','radio'].includes(localChannel);
}
function restoreTrack(locId,tIdx){
  const packId=getPackId();
  dropDislike('biome',packId+'|'+locId+'|'+tIdx);
  const tracks=getLocTracks(packId,locId);
  if(!tracks.includes(tIdx))setLocTracks(packId,locId,[...tracks,tIdx]);
  renderHiddenTracks();
  if(locId===currentLocId)renderTrackList();
}
function exportData(){
  const blob=new Blob([JSON.stringify(loadStore(),null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='musicmap-preferences.json';a.click();
}
function clearAllData(){
  if(confirm('Clear all saved data?')){localStorage.removeItem(STORE_KEY);location.reload();}
}
function updateCacheStatus(){
  const s=loadStore();
  const custom=(s.customLocs||[]).length;
  const packs=(s.userPacks||[]).length;
  const el=document.getElementById('cacheStatus');
  if(el)el.textContent=`${packs} custom pack(s), ${custom} custom location(s) saved in localStorage.`;
}

// ═══════════════════════════════════════════
// MAP
// ═══════════════════════════════════════════
// ── LEAFLET MAP ──
// Where the map starts, and the first Local Listening spot, before any location is known
const DEFAULT_SPOT={latlng:[27.9506,-82.4572], zoom:11, place:{city:'Tampa',region:'Florida',country:'United States',cc:'us'}};
// The map opens on the whole state of Florida (fitted to the map's width, so phones see all of it too)
const START_BOUNDS=[[24.4,-87.7],[31.1,-79.9]];
function initLeafletMap(){
  if(leafletMap) return; // already initialised
  const el=document.getElementById('leafletMap');
  if(!el||typeof L==='undefined') return;

  leafletMap=L.map('leafletMap',{zoomControl:true, attributionControl:true, zoomSnap:0.25}); // quarter steps: the state fits snugly
  leafletMap.fitBounds(START_BOUNDS,{padding:[8,8]}); // all of Florida; live tracking zooms in to you

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom:19
  }).addTo(leafletMap);

  // Click to drop a pin
  leafletMap.on('click', e=>{
    const {lat,lng}=e.latlng;
    if(appMode==='local'){ moveListenPinTo(lat,lng); return; }
    openLocEdit(null,true,lat,lng);
  });

  // Render existing custom pins
  renderCustomPins();

  // Live tracking: go to you. Otherwise stay on the state view (pins still show where they are)
  if(lastLat!==null) updateMapPin(lastLat,lastLon,trackingActive);
  renderListenPin();
}

// Accent colours per biome cssClass for radius circles
const BIOME_COLORS={
  'biome-beach':'#00b4d8','biome-city':'#7c3aed','biome-forest':'#16a34a',
  'biome-mountain':'#9f1239','biome-desert':'#d97706','biome-town':'#0891b2',
  'biome-ocean':'#0284c7','biome-shopping':'#db2777','biome-port':'#0d9488',
  'biome-home':'#f59e0b','biome-work':'#6366f1','biome-school':'#10b981',
  'biome-gym':'#ef4444','biome-custom':'#8b5cf6'
};

function renderCustomPins(){
  if(!leafletMap) return;
  // Remove old markers + circles
  customPinMarkers.forEach(m=>leafletMap.removeLayer(m));
  radiusCircles.forEach(c=>leafletMap.removeLayer(c));
  customPinMarkers=[];
  radiusCircles=[];
  renderMapLegend();
  if(isLocalMode()) return; // saved places belong to Biome Beats

  getAllCustomLocs().filter(l=>l.lat&&l.lon).forEach(loc=>{
    const color=BIOME_COLORS[loc.cssClass||'biome-custom']||'#8b5cf6';
    const radius=loc.radius||200;

    // Radius circle
    const circle=L.circle([loc.lat,loc.lon],{
      radius,
      color,
      fillColor:color,
      fillOpacity:0.13,
      weight:1.5,
      opacity:0.55,
      dashArray:'4 4'
    }).addTo(leafletMap);
    radiusCircles.push(circle);

    // Emoji marker
    const icon=L.divIcon({
      className:'',
      html:`<div class="mm-marker" title="${esc(loc.name)}">${esc(loc.emoji)}</div>`,
      iconSize:[30,30],iconAnchor:[15,15]
    });
    const marker=L.marker([loc.lat,loc.lon],{icon}).addTo(leafletMap);
    const popupDiv=document.createElement('div');
    popupDiv.style.cssText='font-family:sans-serif;min-width:140px';
    popupDiv.innerHTML='<div style="font-size:15px;font-weight:600;margin-bottom:3px">'+esc(loc.emoji)+' '+esc(loc.name)+'</div>'
      +'<div style="font-size:11px;color:#888;margin-bottom:8px">Custom &middot; '+esc(fmtRadius(radius))+' radius</div>';
    const playPop=document.createElement('button');
    playPop.innerHTML=ic('play','ic-sm')+' Play this biome';
    playPop.style.cssText='width:100%;padding:6px 10px;border-radius:7px;border:none;background:'+color+';color:#fff;cursor:pointer;font-size:12px;font-weight:600';
    playPop.onclick=()=>{loadLocation(loc.id,true,true);closeAllPopups();};
    popupDiv.appendChild(playPop);
    const editPop=document.createElement('button');
    editPop.innerHTML=ic('edit','ic-sm')+' Edit location';
    editPop.style.cssText='width:100%;margin-top:5px;padding:5px 10px;border-radius:7px;border:1px solid #ccc;background:none;color:#555;cursor:pointer;font-size:11px';
    editPop.onclick=()=>{openLocEdit(loc.id,true);closeAllPopups();};
    popupDiv.appendChild(editPop);
    marker.bindPopup(popupDiv);
    customPinMarkers.push(marker);
  });
}

function closeAllPopups(){
  if(leafletMap) leafletMap.closePopup();
}

function updateMapPin(lat,lon,flyTo){
  if(!leafletMap) return;
  if(!userMarker){
    const icon=L.divIcon({
      className:'',
      html:'<div class="mm-user-marker"></div>',
      iconSize:[22,22],
      iconAnchor:[11,11]
    });
    userMarker=L.marker([lat,lon],{icon,zIndexOffset:1000}).addTo(leafletMap);
    userMarker.bindPopup('<b>'+ic('mapPin','ic-sm')+' You are here</b>');
  } else {
    userMarker.setLatLng([lat,lon]);
  }
  if(flyTo||trackingActive){
    const zoom=leafletMap.getZoom()<10?13:leafletMap.getZoom();
    leafletMap.flyTo([lat,lon],zoom,{duration:1.2});
  }
}

// Legacy stub — called in some places
function updateMapDot(lat,lon){ updateMapPin(lat,lon,false); }

// ═══════════════════════════════════════════
// GEO
// ═══════════════════════════════════════════
function dist(lat1,lon1,lat2,lon2){
  const R=6371000,d=Math.PI/180;
  const a=Math.sin((lat2-lat1)*d/2)**2+Math.cos(lat1*d)*Math.cos(lat2*d)*Math.sin((lon2-lon1)*d/2)**2;
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}
// ── TOGGLE TRACKING ──
function toggleTracking(){
  if(trackingActive){
    stopTracking();
  } else {
    startTracking();
  }
}

// Live location is shared by both modes: one on/off setting (remembered across visits) and one last fix.
// opts.autoplay:false = find the place but don't start music (mode switch, page reopened)
function startTracking(opts){
  if(!navigator.geolocation){
    setTrackingUI(false,'Location isn\'t supported on this device','error');return;
  }
  trackingActive=true; ss('liveLocation',true);
  locatingNow=true; setPlayerBusy(true); // until your location comes back (or fails)
  setTrackingUI(true,'Finding you…','locating');
  if(appMode==='local') renderLocalHeader();
  clearTimeout(trackingTimer);
  pollLocation(true,opts); // immediate first poll
}

let locatingNow=false; // waiting for the first location fix after turning live location on
function locatingDone(){
  if(!locatingNow) return;
  locatingNow=false; setPlayerBusy(false);
  if(trackingActive) setTrackingUI(true,'Location found','world'); // the button stops spinning (Biome Beats then names the place)
  if(appMode==='local') renderLocalHeader();
}
function stopTracking(){
  locatingDone();
  trackingActive=false; ss('liveLocation',false);
  clearTimeout(trackingTimer);
  setTrackingUI(false,'');
  if(appMode==='local'&&localPoint?.source==='gps'){ localPoint.source='pin'; ss('localPoint',localPoint); renderLocalHeader(); }
}
function saveFix(lat,lon){ lastLat=lat; lastLon=lon; ss('lastFix',{lat:+lat.toFixed(5),lon:+lon.toFixed(5),t:Date.now()}); }
// A fresh reading right now (near the end of a track), without disturbing the regular schedule
function freshFix(){
  return new Promise(res=>{
    if(!navigator.geolocation||!trackingActive) return res(null);
    navigator.geolocation.getCurrentPosition(pos=>{
      const lat=pos.coords.latitude, lon=pos.coords.longitude;
      saveFix(lat,lon); updateMapPin(lat,lon); res({lat,lon});
    },()=>res(null),{timeout:12000,enableHighAccuracy:true,maximumAge:15000});
  });
}
// Same place, new mode: carry the live location over and look again
function relocateForMode(){
  if(!trackingActive) return;
  startTracking({autoplay:false});
}

// One location notice under the biome name. state:
//   locating — waiting for GPS          world   — open world, shows address + movement
//   here     — inside a saved place     pending — in range of a saved place, switches after this track
//   error    — GPS problem              ''      — hidden (tracking off)
function setTrackingUI(on, statusText, state){
  const btn=document.getElementById('heroDetectBtn');
  const label=document.getElementById('heroDetectLabel');
  const sub=document.getElementById('heroDetectSub');
  const status=document.getElementById('locStatus');
  btn.classList.toggle('tracking', on);
  const locating=on&&!!statusText&&state==='locating';
  btn.classList.toggle('locating', locating); btn.setAttribute('aria-busy',locating?'true':'false');
  label.textContent = on ? 'LISTENING' : 'LISTEN TO WORLD';
  if(sub) sub.textContent = locating ? 'FINDING YOU…' : on ? 'TRACKING ON · TAP TO STOP' : 'DETECT MY LOCATION';
  if(!status) return;
  state = statusText ? (state||'world') : '';
  status.dataset.state = state;
  if(!state){ status.innerHTML=''; return; }
  const lead = state==='locating' ? '<span class="loc-status-dot"></span>'
             : state==='error'    ? ic('alert','ic-sm')
             : ic('mapPin','ic-sm');
  status.innerHTML = lead+'<span class="loc-status-text">'+esc(statusText)+'</span>';
}

// ── POLL LOCATION ──
async function pollLocation(isFirstPoll,opts){
  if(!trackingActive) return;
  const autoplay=isFirstPoll&&opts?.autoplay!==false;

  navigator.geolocation.getCurrentPosition(async pos=>{
    const lat=pos.coords.latitude, lon=pos.coords.longitude;
    locatingDone(); // found you: whatever loads next (a biome's song, the channel list) shows its own loading

    // Determine if moving fast (schedule next poll)
    let moved=0;
    if(lastPollLat!==null) moved=dist(lastPollLat,lastPollLon,lat,lon);
    const nextPoll = (moved > MOVE_THRESHOLD) ? POLL_FAST : POLL_SLOW;
    lastPollLat=lat; lastPollLon=lon;
    saveFix(lat,lon);

    // Update map pin
    updateMapPin(lat,lon);

    // Local Listening: the GPS fix moves the listening pin; biomes don't apply
    if(appMode==='local'){
      setListenPoint(lat,lon,'gps',{autoplay});
      if(trackingActive) trackingTimer=setTimeout(()=>pollLocation(false), nextPoll);
      return;
    }

    // Custom locations ALWAYS override default biomes — checked first
    const nearby=customLocsWithTracks().find(l=>{
      if(l.pins&&l.pins.length>0) return l.pins.some(p=>dist(lat,lon,p.lat,p.lon)<=(p.radius||200));
      return l.lat&&l.lon&&dist(lat,lon,l.lat,l.lon)<=(l.radius||200);
    });
    const newLocId = nearby ? nearby.id : null;

    if(!newLocId){
      // Open world: address + how you're moving (lightweight, no biome classify)
      try{
        const locName=await revGeo(lat,lon);
        const place=locName||`${lat.toFixed(3)}, ${lon.toFixed(3)}`;
        const motion=isFirstPoll?'':(moved>MOVE_THRESHOLD?' · On the move':moved>0?' · Walking':' · Standing by');
        setTrackingUI(true, place+motion, 'world');
      }catch(e){}
      // On first poll, do an immediate biome classify to set initial biome
      if(isFirstPoll){
        try{
          const locName2=await revGeo(lat,lon);
          const id=await classifyBiome(lat,lon,locName2);
          if(id!==currentLocId){
            // already playing (mode switch): change biome at the end of this track, like any other move
            if(isPlaying&&!autoplay){ pendingBiomeId=id; noticeBiome(id); }
            else { loadLocation(id,false,true); chime('switch'); }
          }
          if(autoplay&&!isPlaying){ playCurrentTrack(false); isPlaying=true; }
        }catch(e){}
      }
    } else {
      // Saved place: the hero already shows its name, so the notice just confirms it
      setTrackingUI(true, 'You\'re here', 'here');
      if(nearby.id!==currentLocId || isFirstPoll){
        if(isFirstPoll&&!(isPlaying&&!autoplay)){
          loadLocation(nearby.id,false,false);
          if(autoplay&&!isPlaying){ playCurrentTrack(false); isPlaying=true; }
        } else {
          // Hero still shows the old place until the track ends — name the new one here
          pendingBiomeId=nearby.id; noticeBiome(nearby.id);
          setTrackingUI(true, `Near ${nearby.name} · switching after this track`, 'pending');
        }
        renderLocGrid();
      }
    }

    // Lightweight GPS refresh — just update coords, biome check happens at track end
    if(trackingActive){
      const nextPollDelay = moved > MOVE_THRESHOLD ? POLL_FAST : POLL_SLOW;
      trackingTimer=setTimeout(()=>pollLocation(false), nextPollDelay);
    }
  }, err=>{
    locatingDone();
    const m={1:'Location permission denied',2:'Location unavailable · retrying',3:'GPS timed out · retrying'};
    if(err.code===1){ stopTracking(); setTrackingUI(false, m[1], 'error'); return; }
    setTrackingUI(trackingActive, m[err.code]||'GPS error', 'error');
    if(trackingActive) trackingTimer=setTimeout(()=>pollLocation(false), POLL_SLOW);
  },{timeout:15000,enableHighAccuracy:true,maximumAge:20000});
}
async function revGeo(lat,lon){
  try{const r=await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`);const d=await r.json();const a=d.address||{};return[a.city||a.town||a.village||a.county,a.state].filter(Boolean).join(', ');}catch(e){return null;}
}
// ── OSM TAG → BIOME MAPPING ──
const OSM_BIOME_MAP = [
  // [tag_key, tag_value, biome_id] — checked in order, first match wins
  ['natural','beach',    'beach'],
  ['natural','coastline','beach'],
  ['natural','sand',     'desert'],
  ['natural','desert',   'desert'],
  ['natural','water',    'beach'],
  ['natural','bay',      'ocean'],
  ['natural','strait',   'ocean'],
  ['natural','lake',     'ocean'],
  ['natural','river',    'ocean'],
  ['natural','wetland',  'forest'],
  ['natural','wood',     'forest'],
  ['natural','forest',   'forest'],
  ['natural','scrub',    'forest'],
  ['natural','heath',    'forest'],
  ['natural','grassland','forest'],
  ['natural','peak',     'mountain'],
  ['natural','cliff',    'mountain'],
  ['natural','rock',     'mountain'],
  ['natural','scree',    'mountain'],
  ['landuse','forest',   'forest'],
  ['landuse','orchard',  'forest'],
  ['landuse','vineyard', 'forest'],
  ['landuse','meadow',   'forest'],
  ['landuse','farmland', 'desert'],
  ['landuse','reservoir','ocean'],
  ['landuse','basin',    'ocean'],
  ['landuse','retail',   'shopping'],
  ['landuse','commercial','shopping'],
  ['landuse','industrial','port'],
  ['landuse','port',     'port'],
  ['landuse','railway',  'port'],
  ['landuse','residential','town'],
  ['landuse','village_green','town'],
  ['landuse','allotments','town'],
  ['landuse','recreation_ground','town'],
  ['leisure','beach_resort','beach'],
  ['leisure','marina',   'port'],
  ['leisure','nature_reserve','forest'],
  ['amenity','marketplace','shopping'],
  ['place',  'island',   'beach'],
];

async function queryOSMBiome(lat, lon){
  // Query Overpass for features within 300m
  const query = `[out:json][timeout:8];
(
  way(around:300,${lat},${lon})[natural];
  way(around:300,${lat},${lon})[landuse];
  way(around:300,${lat},${lon})[leisure~"^(beach_resort|marina|nature_reserve)$"];
  way(around:300,${lat},${lon})[amenity=marketplace];
  node(around:300,${lat},${lon})[natural~"^(peak|cliff|beach|coastline)$"];
  relation(around:300,${lat},${lon})[natural];
);
out tags 20;`;

  const r = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: 'data=' + encodeURIComponent(query),
    headers: {'Content-Type':'application/x-www-form-urlencoded'}
  });
  if (!r.ok) throw new Error('Overpass is busy (HTTP ' + r.status + ')'); // busy/rate-limited answers are an HTML page, not JSON
  const d = await r.json();
  const elements = d.elements || [];

  // Score each biome by how many matching features we find
  const scores = {};
  for(const el of elements){
    const tags = el.tags || {};
    for(const [key, val, biomeId] of OSM_BIOME_MAP){
      if(tags[key] && (val === '*' || tags[key] === val)){
        scores[biomeId] = (scores[biomeId]||0) + 1;
      }
    }
  }

  if(Object.keys(scores).length === 0) return null;
  // Return the highest-scoring biome
  return Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0];
}

async function classifyBiome(lat, lon, name){
  const pack = getActivePack();
  const biomes = pack?.biomes || [];

  // 1. OSM tags — most accurate
  try{
    const osmBiome = await queryOSMBiome(lat, lon);
    if(osmBiome && biomes.find(b => b.id === osmBiome)){
      return osmBiome;
    }
  }catch(e){ /* Overpass unavailable — fall through */ }

  // 2. Keyword matching on address name
  if(name){
    const l = name.toLowerCase();
    for(const b of biomes){
      if(b.keywords?.some(k => l.includes(k))) return b.id;
    }
  }

  // 3. Default
  return 'town';
}
// (The old blob: service worker was removed in v1.3: browsers never registered it, and a cache-first
// worker would have pinned visitors to a stale page. Offline support comes with the native app.)

// ═══════════════════════════════════════════
// PACK EDIT MODAL
// ═══════════════════════════════════════════
let editingPackId = null;
let peSelectedEmoji = '🌿';
let peVideos = []; // [{id, tracks[]}]

function openPackEdit(packId){
  editingPackId = packId;
  const guide = document.getElementById('peGuide');
  const metaSection = document.getElementById('peMetaSection');
  const videoLabel = document.getElementById('peVideoSectionLabel');
  document.getElementById('peNewVideoUrl').value = '';
  document.getElementById('peUrlStatus').textContent = '';
  document.getElementById('peUrlStatus').className = 'url-status';

  if(!packId){
    // NEW PACK mode
    peSelectedEmoji = '🌿';
    peVideos = [];
    document.getElementById('packEditTitle').textContent = 'ADD PACK';
    document.getElementById('peNameInput').value = '';
    document.getElementById('peSubtitleInput').value = '';
    if(guide) guide.style.display = 'block';
    videoLabel.textContent = 'ADD YOUTUBE VIDEO';
  } else {
    const pack = getAllPacks().find(p => p.id === packId);
    if(!pack) return;
    peSelectedEmoji = pack.icon || '🌿';
    peVideos = pack.videos
      ? JSON.parse(JSON.stringify(pack.videos))
      : [{id: pack.videoId, tracks: JSON.parse(JSON.stringify(pack.tracks||[]))}];
    document.getElementById('packEditTitle').textContent = pack.builtin ? 'CUSTOMISE PACK' : 'EDIT PACK';
    document.getElementById('peNameInput').value = pack.name;
    document.getElementById('peSubtitleInput').value = pack.subtitle||pack.source||'';
    if(guide) guide.style.display = 'none';
    videoLabel.textContent = 'ADD ANOTHER VIDEO';
  }
  renderPeEmojiPicker();
  renderPeVideoList();
  document.getElementById('packEditOverlay').classList.add('open');
  warmVideoTitles(editingPackId?getAllPacks().find(p=>p.id===editingPackId):null);
}

function closePackEdit(e){
  if(!e||e.target===document.getElementById('packEditOverlay'))
    document.getElementById('packEditOverlay').classList.remove('open');
}

function peExtractVideoId(raw){
  if(!raw) return null;
  const m = raw.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  if(m) return m[1];
  if(/^[A-Za-z0-9_-]{11}$/.test(raw.trim())) return raw.trim();
  return null;
}

function peOnUrlInput(raw){
  const status = document.getElementById('peUrlStatus');
  const vid = peExtractVideoId(raw);
  if(!raw.trim()){ status.textContent=''; status.className='url-status'; return; }
  if(!vid){
    status.textContent = '✗ Could not find a valid YouTube video ID';
    status.className = 'url-status err';
    return;
  }
  if(peVideos.find(v => v.id === vid)){
    status.textContent = '✓ Already in pack';
    status.className = 'url-status ok';
    return;
  }
  status.textContent = '✓ Valid video ID: ' + vid + ' — click Add or paste timestamps below';
  status.className = 'url-status ok';
}

function peAddVideo(){
  const raw = document.getElementById('peNewVideoUrl').value.trim();
  const vid = peExtractVideoId(raw);
  if(!vid){ alert('Could not find a valid YouTube video ID.'); return; }
  if(peVideos.find(v => v.id === vid)){ alert('This video is already in the pack.'); return; }
  peVideos.push({id: vid, tracks: []});
  document.getElementById('peNewVideoUrl').value = '';
  document.getElementById('peUrlStatus').textContent = '';
  document.getElementById('peUrlStatus').className = 'url-status';
  // Auto-fill pack name from video id if blank
  const nameInput = document.getElementById('peNameInput');
  if(!nameInput.value.trim()) nameInput.placeholder = 'Name your pack…';
  renderPeVideoList();
  // Scroll to the new video section
  setTimeout(()=>{
    const sections = document.querySelectorAll('.pe-video-section');
    if(sections.length) sections[sections.length-1].scrollIntoView({behavior:'smooth',block:'nearest'});
  }, 50);
}

function renderPeEmojiPicker(){
  const p = document.getElementById('peEmojiPicker');
  if(!p) return;
  p.innerHTML = '';
  PACK_EMOJIS.forEach(em => {
    const b = document.createElement('button');
    b.className = 'emoji-opt' + (em === peSelectedEmoji ? ' sel' : '');
    b.textContent = em; b.type = 'button';
    b.onclick = () => { peSelectedEmoji = em; renderPeEmojiPicker(); };
    p.appendChild(b);
  });
  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;gap:5px;margin-top:6px;width:100%';
  const peInput = document.createElement('input');
  peInput.id = 'peCustomEmojiInput';
  peInput.placeholder = 'Type emoji…';
  peInput.maxLength = 4;
  peInput.style.cssText = 'flex:1;background:var(--surface2);border:1px solid var(--border2);border-radius:7px;padding:5px 9px;color:#fff;font-size:16px;outline:none;min-width:0';
  peInput.oninput = function(){ if(this.value.trim()){ peSelectedEmoji=this.value.trim(); renderPeEmojiPicker(); } };
  const pePreview = document.createElement('button');
  pePreview.type = 'button';
  pePreview.className = 'emoji-opt sel';
  pePreview.style.cssText = 'flex-shrink:0;min-width:40px;font-size:16px';
  pePreview.textContent = peSelectedEmoji;
  pePreview.onclick = () => peInput.focus();
  wrap.appendChild(peInput);
  wrap.appendChild(pePreview);
  p.appendChild(wrap);
}

function renderPeVideoList(){
  const list = document.getElementById('peVideoList');
  if(!list) return;
  list.innerHTML = '';
  peVideos.forEach((v, vi) => {
    const section = document.createElement('div');
    section.className = 'pe-video-section';

    // Header
    const header = document.createElement('div');
    header.className = 'pe-video-section-header';
    const infoDiv = document.createElement('div');
    infoDiv.innerHTML = '<div class="pe-video-id">' + esc(v.id) + '</div>'
      + '<div class="pe-video-track-count">' + (v.tracks||[]).length + ' tracks imported</div>';
    const delBtn = document.createElement('button');
    delBtn.className = 'pill-btn';
    delBtn.style.color = 'var(--red)';
    delBtn.innerHTML = ic('trash','ic-sm')+' Remove';
    delBtn.onclick = () => { peVideos.splice(vi,1); renderPeVideoList(); };
    header.appendChild(infoDiv);
    header.appendChild(delBtn);
    section.appendChild(header);

    // Inline timestamp importer for this video
    const tsLabel = document.createElement('label');
    tsLabel.className = 'form-label';
    tsLabel.style.marginBottom = '5px';
    tsLabel.textContent = (v.tracks||[]).length > 0 ? 'PASTE MORE TIMESTAMPS (APPENDS)' : 'PASTE TIMESTAMPS';
    section.appendChild(tsLabel);

    const tsHint = document.createElement('div');
    tsHint.style.cssText = 'font-size:11px;color:var(--muted);margin-bottom:6px;line-height:1.5';
    tsHint.textContent = 'Copy the chapter list from the YouTube video description and paste it here.';
    section.appendChild(tsHint);

    const ta = document.createElement('textarea');
    ta.className = 'ts-import-area';
    ta.placeholder = 'e.g. 001. Route 101: [0:00:38](url)\nor plain:\n0:38 Route 101';
    ta.style.minHeight = '80px';
    const previewDiv = document.createElement('div');
    previewDiv.className = 'ts-parse-result';
    const countDiv = document.createElement('div');
    countDiv.className = 'ts-parse-count';
    const trackDiv = document.createElement('div');
    trackDiv.className = 'ts-track-preview';
    previewDiv.appendChild(countDiv);
    previewDiv.appendChild(trackDiv);
    const importBtn = document.createElement('button');
    importBtn.className = 'btn-primary';
    importBtn.style.cssText = 'width:100%;padding:9px;margin-top:8px';
    importBtn.textContent = 'Import tracks';
    importBtn.disabled = true;

    let parsedForThis = [];
    ta.oninput = function(){
      parsedForThis = parseTimestamps(this.value);
      if(parsedForThis.length > 0){
        countDiv.textContent = parsedForThis.length + ' TRACKS DETECTED';
        trackDiv.innerHTML = parsedForThis.slice(0,6).map(t =>
          '<div>' + fmt(t.start) + ' — ' + esc(t.title) + ' (' + fmt(t.dur) + ')</div>'
        ).join('') + (parsedForThis.length > 6 ? '<div style="opacity:.5">…and ' + (parsedForThis.length-6) + ' more</div>' : '');
        previewDiv.classList.add('visible');
        importBtn.disabled = false;
      } else {
        previewDiv.classList.remove('visible');
        importBtn.disabled = true;
      }
    };
    importBtn.onclick = () => {
      if(!parsedForThis.length) return;
      peVideos[vi].tracks = [...(peVideos[vi].tracks||[]), ...parsedForThis];
      ta.value = '';
      parsedForThis = [];
      previewDiv.classList.remove('visible');
      importBtn.disabled = true;
      renderPeVideoList();
    };

    section.appendChild(ta);
    section.appendChild(previewDiv);
    section.appendChild(importBtn);
    list.appendChild(section);
  });
}

function savePackEdit(){
  const name = document.getElementById('peNameInput').value.trim();
  const subtitle = document.getElementById('peSubtitleInput').value.trim();
  if(!name){ alert('Please enter a pack name.'); return; }

  // If URL field has a valid unregistered video, add it automatically
  const rawUrl = document.getElementById('peNewVideoUrl').value.trim();
  if(rawUrl){
    const vid = peExtractVideoId(rawUrl);
    if(vid && !peVideos.find(v => v.id === vid)) peVideos.push({id:vid, tracks:[]});
  }

  if(!editingPackId){
    // CREATE
    if(peVideos.length === 0){ alert('Please add at least one YouTube video.'); return; }
    const newPack = {
      id: 'user_' + Date.now(),
      name, subtitle, icon: peSelectedEmoji,
      videoId: peVideos[0].id,
      source: 'Custom Pack', builtin: false,
      videos: peVideos,
      tracks: peVideos.flatMap(v => v.tracks||[]),
      biomes: [
        {id:'beach',name:'Beach',emoji:'🌊',cssClass:'biome-beach',keywords:['beach','coast','sea','bay','shore'],defaultTracks:[]},
        {id:'city',name:'City',emoji:'🏙️',cssClass:'biome-city',keywords:['city','downtown','urban','metro'],defaultTracks:[]},
        {id:'forest',name:'Forest',emoji:'🌲',cssClass:'biome-forest',keywords:['forest','woods','park','trail'],defaultTracks:[]},
        {id:'mountain',name:'Mountain',emoji:'🌋',cssClass:'biome-mountain',keywords:['mountain','hill','summit'],defaultTracks:[]},
        {id:'desert',name:'Desert',emoji:'🏜️',cssClass:'biome-desert',keywords:['desert','sand','dune','arid'],defaultTracks:[]},
        {id:'town',name:'Town',emoji:'🏘️',cssClass:'biome-town',keywords:['suburb','town','village'],defaultTracks:[]},
        {id:'ocean',name:'Ocean',emoji:'🐋',cssClass:'biome-ocean',keywords:['ocean','gulf','pacific'],defaultTracks:[]},
        {id:'shopping',name:'Shopping',emoji:'🛍️',cssClass:'biome-shopping',keywords:['mall','shopping','store'],defaultTracks:[]},
        {id:'port',name:'Port',emoji:'⚓',cssClass:'biome-port',keywords:['port','dock','pier','harbor'],defaultTracks:[]},
      ]
    };
    saveUserPacks([...getUserPacks(), newPack]);
    document.getElementById('packEditOverlay').classList.remove('open');
    activatePack(newPack.id);
    return;
  }

  // EDIT EXISTING
  const realId = ensurePackEditable(editingPackId);
  const allPacks = getAllPacks();
  const pack = allPacks.find(p => p.id === realId);
  if(!pack){ alert('Pack not found.'); return; }
  pack.name = name;
  pack.subtitle = subtitle;
  pack.icon = peSelectedEmoji;
  pack.videos = peVideos;
  if(peVideos.length > 0){
    pack.videoId = peVideos[0].id;
    pack.tracks = peVideos.flatMap(v => v.tracks||[]);
  }
  pack.builtin = false;
  const userPacks = getUserPacks();
  const idx = userPacks.findIndex(p => p.id === realId);
  if(idx >= 0) userPacks[idx] = pack; else userPacks.push(pack);
  saveUserPacks(userPacks);
  document.getElementById('packEditOverlay').classList.remove('open');
  renderPacksList();
  if(getActivePackId() === realId) renderLocGrid();
}
// ═══════════════════════════════════════════
// TIMESTAMP IMPORTER
// ═══════════════════════════════════════════
let tsImportVideoIdx = -1;
let tsParsedTracks = [];

function openTsImport(videoIdx){
  tsImportVideoIdx = videoIdx;
  tsParsedTracks = [];
  const vid = peVideos[videoIdx];
  document.getElementById('tsImportVideoLabel').textContent = 'Video: ' + (vid?.id || '');
  document.getElementById('tsImportInput').value = '';
  document.getElementById('tsParseResult').classList.remove('visible');
  document.getElementById('tsImportBtn').disabled = true;
  document.getElementById('tsImportOverlay').classList.add('open');
}
function closeTsImport(e){
  if(!e||e.target===document.getElementById('tsImportOverlay'))
    document.getElementById('tsImportOverlay').classList.remove('open');
}

function parseTimestamps(text){
  const tracks = [];
  // Format 1: markdown link  "NNN. Title: [H:MM:SS](url?t=Ns)"
  const mdRe = new RegExp('(?:\\d+\\.\\s+)?([^:\\[\\]\\n]+?):\\s*\\[(\\d+:\\d+:\\d+|\\d+:\\d+)\\]\\(https?://[^)]*?(?:[?&]t=(\\d+)s?)?\\)', 'g');
  const mdMatches = [...text.matchAll(mdRe)];
  if(mdMatches.length > 0){
    const starts = mdMatches.map(m => {
      const title = m[1].trim().replace(/^\d+\.\s*/, '');
      const start = m[3] ? parseInt(m[3]) : (() => {
        const p = m[2].split(':').map(Number);
        return p.length===3 ? p[0]*3600+p[1]*60+p[2] : p[0]*60+p[1];
      })();
      return {title, start};
    });
    starts.forEach((s,i) => {
      const dur = i+1 < starts.length ? Math.min(starts[i+1].start - s.start, 300) : 180;
      tracks.push({title:s.title, start:s.start, dur});
    });
    return tracks;
  }
  // Format 2: plain "H:MM:SS Title" or "M:SS Title" lines
  const lines = text.split('\n').map(l=>l.trim()).filter(Boolean);
  const plainRe = /^(\d+:\d+(?::\d+)?)\s+(.+)$/;
  const starts2 = [];
  lines.forEach(line => {
    const m = line.match(plainRe);
    if(m){
      const p = m[1].split(':').map(Number);
      const start = p.length===3 ? p[0]*3600+p[1]*60+p[2] : p[0]*60+p[1];
      starts2.push({title: m[2].trim(), start});
    }
  });
  starts2.forEach((s,i) => {
    const dur = i+1 < starts2.length ? Math.min(starts2[i+1].start - s.start, 300) : 180;
    tracks.push({title:s.title, start:s.start, dur});
  });
  return tracks;
}

function parseTsPreview(){
  const text = document.getElementById('tsImportInput').value;
  const result = document.getElementById('tsParseResult');
  const btn = document.getElementById('tsImportBtn');
  tsParsedTracks = parseTimestamps(text);
  if(tsParsedTracks.length === 0){
    result.classList.remove('visible');
    btn.disabled = true;
    return;
  }
  document.getElementById('tsParseCount').textContent = tsParsedTracks.length + ' TRACKS DETECTED';
  document.getElementById('tsTrackPreview').innerHTML = tsParsedTracks.slice(0,8).map(t =>
    '<div>' + fmt(t.start) + ' — ' + esc(t.title) + ' (' + fmt(t.dur) + ')</div>'
  ).join('') + (tsParsedTracks.length > 8 ? '<div style="opacity:.5">…and ' + (tsParsedTracks.length-8) + ' more</div>' : '');
  result.classList.add('visible');
  btn.disabled = false;
}

function confirmTsImport(){
  if(tsImportVideoIdx < 0 || tsParsedTracks.length === 0) return;
  const existing = peVideos[tsImportVideoIdx].tracks || [];
  // Append (don't replace — user may be adding more tracks from a second video)
  peVideos[tsImportVideoIdx].tracks = [...existing, ...tsParsedTracks];
  document.getElementById('tsImportOverlay').classList.remove('open');
  renderPeVideoList();
}


// ═══════════════════════════════════════════
// MAP PIN PICKER
// ═══════════════════════════════════════════
let mapPickerMap=null, mapPickerMarker=null, mapPickerCircle=null;
let mapPickerPendingLat=null, mapPickerPendingLon=null;

function openMapPicker(){
  document.getElementById('mapPickerOverlay').classList.add('open');
  document.getElementById('mapPickerPending').classList.remove('visible');
  document.getElementById('mapPickerConfirmBtn').disabled=true;
  mapPickerPendingLat=null; mapPickerPendingLon=null;

  setTimeout(()=>{
    if(!mapPickerMap){
      mapPickerMap=L.map('mapPickerMap',{zoomControl:true,attributionControl:false});
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(mapPickerMap);
      mapPickerMap.on('click',e=>mapPickerPlacePin(e.latlng.lat,e.latlng.lng));
    }
    // Center on existing pins or last known location
    const firstPin=editingPins[0];
    const center=firstPin?[firstPin.lat,firstPin.lon]:lastLat?[lastLat,lastLon]:[20,0];
    const zoom=firstPin||lastLat?14:2;
    mapPickerMap.setView(center,zoom);
    mapPickerMap.invalidateSize();
    // Show existing pins as faint markers
    if(mapPickerMarker){mapPickerMap.removeLayer(mapPickerMarker);mapPickerMarker=null;}
    if(mapPickerCircle){mapPickerMap.removeLayer(mapPickerCircle);mapPickerCircle=null;}
  },80);
}

function closeMapPicker(){
  document.getElementById('mapPickerOverlay').classList.remove('open');
}

function mapPickerPlacePin(lat,lng){
  mapPickerPendingLat=lat; mapPickerPendingLon=lng;
  const radius=parseInt(document.getElementById('mapPickerRadiusSlider').value)||200;

  // Update marker
  if(mapPickerMarker) mapPickerMap.removeLayer(mapPickerMarker);
  if(mapPickerCircle) mapPickerMap.removeLayer(mapPickerCircle);

  const icon=L.divIcon({className:'',html:'<div class="mm-user-marker" style="background:var(--accent,#7c3aed)"></div>',iconSize:[22,22],iconAnchor:[11,11]});
  mapPickerMarker=L.marker([lat,lng],{icon}).addTo(mapPickerMap);
  mapPickerCircle=L.circle([lat,lng],{radius,color:'#7c3aed',fillColor:'#7c3aed',fillOpacity:0.15,weight:1.5,dashArray:'4 4'}).addTo(mapPickerMap);

  // Update footer
  document.getElementById('mapPickerCoords').textContent=lat.toFixed(6)+', '+lng.toFixed(6);
  document.getElementById('mapPickerPending').classList.add('visible');
  document.getElementById('mapPickerConfirmBtn').disabled=false;
}

function updateMapPickerRadius(){
  const radius=parseInt(document.getElementById('mapPickerRadiusSlider').value)||200;
  document.getElementById('mapPickerRadiusVal').textContent=fmtRadius(radius);
  if(mapPickerCircle) mapPickerCircle.setRadius(radius);
}

function confirmMapPin(){
  if(mapPickerPendingLat===null) return;
  const radius=parseInt(document.getElementById('mapPickerRadiusSlider').value)||200;
  editingPins.push({lat:mapPickerPendingLat,lon:mapPickerPendingLon,radius});
  renderLePinList();
  closeMapPicker();
}

// ── BACKGROUND BIOME CHECK (called 10s before track ends) ──
async function checkBiomeInBackground(){
  if(trackingActive) await freshFix(); // where are you now, not at the last scheduled poll
  if(lastLat===null||lastLon===null) return;
  // Check custom location proximity first
  const nearby=customLocsWithTracks().find(l=>{
    if(l.pins&&l.pins.length>0) return l.pins.some(p=>dist(lastLat,lastLon,p.lat,p.lon)<=(p.radius||200));
    return l.lat&&l.lon&&dist(lastLat,lastLon,l.lat,l.lon)<=(l.radius||200);
  });
  if(nearby){
    pendingBiomeId = nearby.id !== currentLocId ? nearby.id : null;
    noticeBiome(pendingBiomeId);
    return;
  }
  try{
    const locName=await revGeo(lastLat,lastLon);
    const id=await classifyBiome(lastLat,lastLon,locName);
    pendingBiomeId = id !== currentLocId ? id : null;
    noticeBiome(pendingBiomeId);
  }catch(e){ pendingBiomeId=null; }
}


// ═══════════════════════════════════════════
// MAKE OR IMPORT MODAL
// ═══════════════════════════════════════════
let miSelectedEmoji = '🎵';
let miVideos = []; // [{type:'video'|'playlist', rawUrl, videoId, title, trackCount, tracks:[]}]

function openMakeImportModal(){
  miVideos = [];
  miSelectedEmoji = '🎵';
  document.getElementById('miPackName').value = '';
  document.getElementById('miSubtitle').value = '';
  document.getElementById('miUrlInput').value = '';
  document.getElementById('miUrlStatus').textContent = '';
  document.getElementById('miUrlStatus').className = 'url-status';
  document.getElementById('miImportInput').value = '';
  document.getElementById('miImportPreview').classList.remove('visible');
  document.getElementById('miImportFlash').textContent = '';
  miAiTab('yt');
  renderMiEmojiPicker();
  renderMiVideoList();
  document.getElementById('miTabs').hidden=false; miSortPackId=null; miRenderSourceNote();
  miSwitchTab('make');
  document.getElementById('makeImportOverlay').classList.add('open');
}

function closeMakeImport(e){
  if(!e||e.target===document.getElementById('makeImportOverlay'))
    document.getElementById('makeImportOverlay').classList.remove('open');
}

function miSwitchTab(tab){
  document.querySelectorAll('.mi-tab').forEach((b,i)=>{
    b.classList.toggle('active',['make','import'][i]===tab);
  });
  document.querySelectorAll('.mi-pane').forEach(p=>p.classList.remove('active'));
  document.getElementById('mi-'+tab).classList.add('active');
}

function renderMiEmojiPicker(){
  const p = document.getElementById('miEmojiPicker');
  if(!p) return;
  p.innerHTML = '';
  PACK_EMOJIS.forEach(em=>{
    const b=document.createElement('button');
    b.className='emoji-opt'+(em===miSelectedEmoji?' sel':'');
    b.textContent=em; b.type='button';
    b.onclick=()=>{miSelectedEmoji=em;renderMiEmojiPicker();};
    p.appendChild(b);
  });
  const wrap=document.createElement('div');
  wrap.style.cssText='display:flex;gap:5px;margin-top:6px;width:100%';
  const inp=document.createElement('input');
  inp.placeholder='Type emoji…'; inp.maxLength=4;
  inp.style.cssText='flex:1;background:var(--surface2);border:1px solid var(--border2);border-radius:7px;padding:5px 9px;color:#fff;font-size:16px;outline:none;min-width:0';
  inp.oninput=function(){if(this.value.trim()){miSelectedEmoji=this.value.trim();renderMiEmojiPicker();}};
  const prev=document.createElement('button');
  prev.type='button'; prev.className='emoji-opt sel';
  prev.style.cssText='flex-shrink:0;min-width:40px;font-size:16px';
  prev.textContent=miSelectedEmoji;
  prev.onclick=()=>inp.focus();
  wrap.appendChild(inp); wrap.appendChild(prev); p.appendChild(wrap);
}

// ── URL detection ──
function miExtractVideoId(url){
  const m=url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  return m?m[1]:null;
}
function miExtractPlaylistId(url){
  const m=url.match(/[?&]list=([A-Za-z0-9_-]+)/);
  return m?m[1]:null;
}

function miOnUrlInput(){
  const raw=document.getElementById('miUrlInput').value.trim();
  const status=document.getElementById('miUrlStatus');
  if(!raw){status.textContent='';status.className='url-status';return;}
  if(!miCheckSameSource(raw,status)) return;
  const sc=parseSoundCloudLink(raw);
  if(sc){
    status.textContent='SoundCloud '+(sc.kind==='set'?'playlist':'track')+' detected. Click Add. Note: songs play in SoundCloud’s own player; some only allow a 30-second preview (SoundCloud Go+) and some can’t be embedded (those are skipped).';
    status.className='url-status warn';
    return;
  }
  if(/^https?:\/\/on\.soundcloud\.com\//i.test(raw)){
    status.textContent='That’s a SoundCloud short link. Open it, then copy the full soundcloud.com address from the browser.';
    status.className='url-status err'; return;
  }
  const sp=parseSpotifyLink(raw);
  if(sp){
    if(isSpotifyConnected()){
      status.textContent='✓ Spotify '+sp.kind+' detected. Click Add to bring in its songs.';
      status.className='url-status ok';
    } else {
      status.textContent='Spotify '+sp.kind+' detected. Spotify songs only play with Spotify Premium and a Spotify developer Client ID.';
      status.className='url-status warn';
    }
    return;
  }
  const vid=miExtractVideoId(raw);
  const pid=miExtractPlaylistId(raw);
  if(pid){
    status.textContent='✓ Playlist detected — click Add to resolve tracks';
    status.className='url-status ok';
  } else if(vid){
    status.textContent='✓ Video ID: '+vid;
    status.className='url-status ok';
  } else {
    status.textContent='✗ Not a YouTube, Spotify or SoundCloud link';
    status.className='url-status err';
  }
}

// Which service a link or added entry belongs to (a pack uses one)
function miSourceOfEntry(v){ return v.type==='spotify'?'spotify':v.type==='soundcloud'?'soundcloud':'youtube'; }
function miSourceOfLink(raw){
  if(parseSpotifyLink(raw)) return 'spotify';
  if(parseSoundCloudLink(raw)) return 'soundcloud';
  if(miExtractVideoId(raw)||miExtractPlaylistId(raw)) return 'youtube';
  return '';
}
function miPackSource(){ return miVideos.length?miSourceOfEntry(miVideos[0]):''; }
// Refuse a second service, with the reason (returns true when the link is fine)
function miCheckSameSource(raw,status){
  const have=miPackSource(), got=miSourceOfLink(raw);
  if(!have||!got||have===got) return true;
  status.textContent='This pack uses '+SOURCE_LABELS[have]+' links. A pack can only use one service, so make a separate pack for '+SOURCE_LABELS[got]+'.';
  status.className='url-status err';
  return false;
}
function miRenderSourceNote(){
  const el=document.getElementById('miSourceNote'); if(!el) return;
  const src=miPackSource();
  if(!src){ el.hidden=true; return; }
  const tracks=miVideos.reduce((n,v)=>n+(v.tracks?.length||0),0);
  el.hidden=false;
  el.innerHTML='';
  const b=document.createElement('b'); b.textContent=SOURCE_LABELS[src];
  el.append('This pack uses ',b,' · '+miVideos.length+' link'+(miVideos.length!==1?'s':'')+(tracks?' · '+tracks+' track'+(tracks!==1?'s':''):'')+'. Paste another '+SOURCE_LABELS[src]+' link to add more.');
}
async function miAddUrl(){
  const raw=document.getElementById('miUrlInput').value.trim();
  const status=document.getElementById('miUrlStatus');
  if(!raw) return;
  if(!miCheckSameSource(raw,status)) return;

  const sp=parseSpotifyLink(raw);
  if(sp) return miAddSpotify(sp, raw);
  const sc=parseSoundCloudLink(raw);
  if(sc) return miAddSoundCloud(sc);

  const pid=miExtractPlaylistId(raw);
  const vid=miExtractVideoId(raw);

  if(!pid&&!vid){status.textContent='✗ Not a YouTube, Spotify or SoundCloud link';status.className='url-status err';return;}

  if(pid){
    // Playlist — resolve via oEmbed per video (no API key needed)
    // We can't enumerate playlist videos without the YouTube Data API key
    // Instead: add as a single playlist entry with a note, let user import timestamps
    if(miVideos.find(v=>v.playlistId===pid)){status.textContent='Already added';return;}
    const entry={type:'playlist',rawUrl:raw,playlistId:pid,videoId:null,title:'Loading…',trackCount:0,tracks:[]};
    miVideos.push(entry);
    renderMiVideoList();
    document.getElementById('miUrlInput').value='';
    status.textContent='';status.className='url-status';
    // Try to get playlist title via oEmbed
    try{
      const r=await fetch('https://www.youtube.com/oembed?url='+encodeURIComponent('https://www.youtube.com/playlist?list='+pid)+'&format=json');
      if(r.ok){const d=await r.json();entry.title=d.title||'Playlist '+pid;}
      else entry.title='Playlist '+pid;
    }catch(e){entry.title='Playlist '+pid;}
    renderMiVideoList();
  } else {
    if(miVideos.find(v=>v.videoId===vid)){status.textContent='Already added';return;}
    const entry={type:'video',rawUrl:raw,videoId:vid,title:'Loading…',trackCount:0,tracks:[]};
    miVideos.push(entry);
    renderMiVideoList();
    document.getElementById('miUrlInput').value='';
    status.textContent='';status.className='url-status';
    // Fetch video title
    try{
      const title=await fetchVideoTitle(vid);
      entry.title=title;
    }catch(e){}
    renderMiVideoList();
  }
}

function renderMiVideoList(){
  const list=document.getElementById('miVideoList');
  if(!list) return;
  list.innerHTML='';
  miRenderSourceNote();
  miVideos.forEach((v,vi)=>{
    const sec=document.createElement('div');
    sec.className='pe-video-section';

    // Header row
    const hdr=document.createElement('div');
    hdr.className='pe-video-section-header';
    const info=document.createElement('div');
    if(v.type==='spotify'){
      info.innerHTML='<div class="pe-video-id" style="display:flex;align-items:center;gap:6px">'+SOURCE_ICONS.spotify+'<span>'+esc(v.title)+'</span></div>'
        +'<div class="pe-video-track-count">Spotify '+esc(v.kind)+' · '+v.tracks.length+' song'+(v.tracks.length!==1?'s':'')+'</div>';
    } else if(v.type==='soundcloud'){
      info.innerHTML='<div class="pe-video-id" style="display:flex;align-items:center;gap:6px">'+SOURCE_ICONS.soundcloud+'<span>'+esc(v.title)+'</span></div>'
        +'<div class="pe-video-track-count">SoundCloud '+(v.kind==='set'?'playlist':'track')+' · '+v.tracks.length+' song'+(v.tracks.length!==1?'s':'')
        +(v.previews?' · '+v.previews+' preview-only':'')+'</div>';
    } else
    info.innerHTML='<div class="pe-video-id">'+(v.title==='Loading…'?'<span class="mm-spinner" aria-hidden="true"></span> ':'')+(v.type==='playlist'?'Playlist: ':'')+esc(v.title)+'</div>'
      +'<div class="pe-video-track-count">'+(v.type==='playlist'?'Playlist · '+(v.tracks.length||0)+' tracks imported':v.videoId+' · '+(v.tracks.length||0)+' tracks')+'</div>';
    const del=document.createElement('button');
    del.className='pill-btn'; del.style.color='var(--red)'; del.innerHTML=ic('trash','ic-sm')+' Remove';
    del.onclick=()=>{miVideos.splice(vi,1);renderMiVideoList();};
    hdr.appendChild(info); hdr.appendChild(del); sec.appendChild(hdr);
    if(v.type==='spotify'||v.type==='soundcloud'){ list.appendChild(sec); return; } // songs come complete from Spotify / SoundCloud

    // For playlists: each video = one track, but user can also paste timestamps
    // For regular videos: timestamp importer
    const tsLabel=document.createElement('label');
    tsLabel.className='form-label'; tsLabel.style.marginBottom='5px';
    tsLabel.textContent=v.type==='playlist'
      ?'PASTE PLAYLIST VIDEO TITLES (one per line = one track, or paste timestamps)'
      :(v.tracks.length>0?'PASTE MORE TIMESTAMPS (APPENDS)':'PASTE TIMESTAMPS');
    const hint=document.createElement('div');
    hint.style.cssText='font-size:11px;color:var(--muted);margin-bottom:6px;line-height:1.5';
    hint.textContent=v.type==='playlist'
      ?'Each line = one track starting from 0s. Or paste a full timestamp list.'
      :'Copy chapter list from the YouTube video description.';
    sec.appendChild(tsLabel); sec.appendChild(hint);

    const ta=document.createElement('textarea');
    ta.className='ts-import-area'; ta.style.minHeight='80px';
    ta.placeholder=v.type==='playlist'?'Song Title One\nSong Title Two\nSong Title Three\u2026\n\nor paste timestamps:\n0:00 Track Name':'e.g. 001. Route 101: [0:00:38](url)\nor plain: 0:38 Route 101';

    const preview=document.createElement('div'); preview.className='ts-parse-result';
    const countD=document.createElement('div'); countD.className='ts-parse-count';
    const trackD=document.createElement('div'); trackD.className='ts-track-preview';
    preview.appendChild(countD); preview.appendChild(trackD);

    const importBtn=document.createElement('button');
    importBtn.className='btn-primary';
    importBtn.style.cssText='width:100%;padding:9px;margin-top:8px';
    importBtn.textContent='Import tracks';
    importBtn.disabled=true;

    let parsed=[];
    ta.oninput=function(){
      const text=this.value;
      if(v.type==='playlist' && !text.match(/\d+:\d+/)){
        // Plain line-by-line mode — each line is a track title, start=0, playlist video
        const lines=text.split('\n').map(l=>l.trim()).filter(Boolean);
        parsed=lines.map((title,i)=>({title,start:0,dur:300,isPlaylistItem:true,lineIdx:i}));
      } else {
        parsed=parseTimestamps(text);
      }
      if(parsed.length>0){
        countD.textContent=parsed.length+' TRACKS DETECTED';
        trackD.innerHTML=parsed.slice(0,5).map(t=>
          '<div>'+(t.isPlaylistItem?'🎵':'⏱ '+fmt(t.start))+' — '+esc(t.title)+'</div>'
        ).join('')+(parsed.length>5?'<div style="opacity:.5">…and '+(parsed.length-5)+' more</div>':'');
        preview.classList.add('visible');
        importBtn.disabled=false;
      } else {
        preview.classList.remove('visible');
        importBtn.disabled=true;
      }
    };
    importBtn.onclick=()=>{
      if(!parsed.length) return;
      miVideos[vi].tracks=[...(miVideos[vi].tracks||[]),...parsed];
      ta.value=''; parsed=[];
      preview.classList.remove('visible');
      importBtn.disabled=true;
      renderMiVideoList();
    };

    sec.appendChild(ta); sec.appendChild(preview); sec.appendChild(importBtn);
    list.appendChild(sec);
  });
}

function defaultPackBiomes(){
  return [
    {id:'beach',  name:'Beach',   emoji:'🌊',cssClass:'biome-beach',  keywords:['beach','coast','sea','bay','shore'],defaultTracks:[]},
    {id:'city',   name:'City',    emoji:'🏙️',cssClass:'biome-city',   keywords:['city','downtown','urban','metro'],defaultTracks:[]},
    {id:'forest', name:'Forest',  emoji:'🌲',cssClass:'biome-forest', keywords:['forest','woods','park','trail'],defaultTracks:[]},
    {id:'mountain',name:'Mountain',emoji:'🌋',cssClass:'biome-mountain',keywords:['mountain','hill','summit'],defaultTracks:[]},
    {id:'desert', name:'Desert',  emoji:'🏜️',cssClass:'biome-desert', keywords:['desert','sand','dune','arid'],defaultTracks:[]},
    {id:'town',   name:'Town',    emoji:'🏘️',cssClass:'biome-town',   keywords:['suburb','town','village'],defaultTracks:[]},
    {id:'ocean',  name:'Ocean',   emoji:'🐋',cssClass:'biome-ocean',  keywords:['ocean','gulf','pacific'],defaultTracks:[]},
    {id:'shopping',name:'Shopping',emoji:'🛍️',cssClass:'biome-shopping',keywords:['mall','shopping','store'],defaultTracks:[]},
    {id:'port',   name:'Port',    emoji:'⚓',cssClass:'biome-port',   keywords:['port','dock','pier','harbor'],defaultTracks:[]},
  ];
}

function miSavePack(){
  const firstSp=miVideos.find(v=>v.type==='spotify'||v.type==='soundcloud');
  const name=document.getElementById('miPackName').value.trim()||(firstSp?String(firstSp.title).slice(0,32):'');
  const subtitle=document.getElementById('miSubtitle').value.trim()||(firstSp?String(firstSp.owner||'').slice(0,60):'');
  if(!name){alert('Please enter a pack name.');return;}
  if(miVideos.length===0){alert('Please add at least one YouTube, Spotify or SoundCloud link.');return;}

  // Check URL input for any unregistered video
  const rawUrl=document.getElementById('miUrlInput').value.trim();
  if(rawUrl){
    const vid=miExtractVideoId(rawUrl);
    if(vid&&!miVideos.find(v=>v.videoId===vid)) miVideos.push({type:'video',videoId:vid,title:vid,tracks:[]});
  }

  // Build flat tracks array across all videos
  const videos=miVideos.map(v=>v.type==='spotify'
    ? {id:null, spotify:{kind:v.kind,id:v.spotifyId}, tracks:v.tracks||[]}
    : v.type==='soundcloud'
    ? {id:null, soundcloud:{kind:v.kind,url:v.url}, tracks:v.tracks||[]}
    : {id:v.videoId||v.playlistId, tracks:v.tracks||[]});
  const allTracks=videos.flatMap(v=>v.tracks);

  const newPack={
    id:'user_'+Date.now(),
    name, subtitle, icon:miSelectedEmoji,
    videoId:(videos.find(v=>v.id)||{}).id||null,
    source:subtitle||(firstSp?(firstSp.type==='soundcloud'?'SoundCloud':'Spotify'):'Custom Pack'), builtin:false,
    videos, tracks:allTracks,
    biomes:[
      {id:'beach',  name:'Beach',   emoji:'🌊',cssClass:'biome-beach',  keywords:['beach','coast','sea','bay','shore'],defaultTracks:[]},
      {id:'city',   name:'City',    emoji:'🏙️',cssClass:'biome-city',   keywords:['city','downtown','urban','metro'],defaultTracks:[]},
      {id:'forest', name:'Forest',  emoji:'🌲',cssClass:'biome-forest', keywords:['forest','woods','park','trail'],defaultTracks:[]},
      {id:'mountain',name:'Mountain',emoji:'🌋',cssClass:'biome-mountain',keywords:['mountain','hill','summit'],defaultTracks:[]},
      {id:'desert', name:'Desert',  emoji:'🏜️',cssClass:'biome-desert', keywords:['desert','sand','dune','arid'],defaultTracks:[]},
      {id:'town',   name:'Town',    emoji:'🏘️',cssClass:'biome-town',   keywords:['suburb','town','village'],defaultTracks:[]},
      {id:'ocean',  name:'Ocean',   emoji:'🐋',cssClass:'biome-ocean',  keywords:['ocean','gulf','pacific'],defaultTracks:[]},
      {id:'shopping',name:'Shopping',emoji:'🛍️',cssClass:'biome-shopping',keywords:['mall','shopping','store'],defaultTracks:[]},
      {id:'port',   name:'Port',    emoji:'⚓',cssClass:'biome-port',   keywords:['port','dock','pier','harbor'],defaultTracks:[]},
    ]
  };
  // biomes start empty: the whole pack plays everywhere until it's sorted (next step)
  saveUserPacks([...getUserPacks(),newPack]);
  activatePack(newPack.id);
  miShowSortStep(newPack.id);
}
// ── After saving: sort the new pack's tracks into biomes (by hand, by AI, or later) ──
let miSortPackId=null;
function miShowSortStep(packId){
  miSortPackId=packId;
  const pack=getAllPacks().find(p=>p.id===packId); if(!pack) return;
  const n=getAllPackTracks(pack).length;
  document.getElementById('miTabs').hidden=true;
  document.querySelectorAll('.mi-pane').forEach(p=>p.classList.remove('active'));
  document.getElementById('mi-sort').classList.add('active');
  document.getElementById('miSortDone').textContent='✓ '+pack.name+' is saved with '+n+' track'+(n!==1?'s':'')+'.';
  showSortChoices();
  document.getElementById('mi-sort').scrollIntoView({block:'start'});
}
function showSortChoices(){
  document.getElementById('miSortChoices').hidden=false;
  document.getElementById('miSortAi').hidden=true;
}
function showAiSortStep(){
  const pack=getAllPacks().find(p=>p.id===miSortPackId); if(!pack) return;
  document.getElementById('miSortChoices').hidden=true;
  document.getElementById('miSortAi').hidden=false;
  document.getElementById('miSortPrompt').textContent=buildSortPrompt(pack);
  document.getElementById('miSortAnswer').value='';
  document.getElementById('miSortPreview').textContent='';
}
function previewAiSortAnswer(){
  const el=document.getElementById('miSortPreview'), raw=document.getElementById('miSortAnswer').value.trim();
  if(!raw){ el.textContent=''; return null; }
  let j; try{ j=JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g,'')); }catch(e){ el.textContent='That isn’t complete JSON yet. Paste the whole answer.'; el.className='url-status err'; return null; }
  const sort=parseAiSort(j);
  if(!sort){ el.textContent='That doesn’t look like a sort answer. Paste the JSON the AI returned for the prompt above.'; el.className='url-status err'; return null; }
  if(sort.error||sort.pack.id!==miSortPackId){ el.textContent=sort.error||'That answer is for a different pack.'; el.className='url-status err'; return null; }
  el.textContent='✓ '+sort.placed+' of '+sort.total+' tracks placed across '+sort.used+' places'+(sort.total-sort.placed?' ('+(sort.total-sort.placed)+' left out; those still play in biomes that end up with no tracks).':'.');
  el.className='url-status ok';
  return sort;
}
function applyAiSortAnswer(){
  const sort=previewAiSortAnswer(); if(!sort) return;
  applyAiSort(sort);
  document.getElementById('makeImportOverlay').classList.remove('open');
  editPackBiomes(sort.pack.id);
  spotifyShowSnack('Sorted '+sort.placed+' tracks into biomes. Tap a biome to check its list.');
}
function skipSortStep(){
  document.getElementById('makeImportOverlay').classList.remove('open');
  spotifyShowSnack('Saved. The whole pack plays everywhere until you sort it (Packs → Edit biomes).');
}
// Sorting by hand: the Biomes view with a banner; what you place now is the pack's starting layout
let packSetupId=gs('packSetupId',null);
function startManualSetup(){
  const id=miSortPackId; if(!id) return;
  document.getElementById('makeImportOverlay').classList.remove('open');
  packSetupId=id; ss('packSetupId',id);
  editPackBiomes(id); renderSetupBanner();
}
function renderSetupBanner(){
  const b=document.getElementById('setupBanner'); if(!b) return;
  const on=!!packSetupId&&getActivePackId()===packSetupId;
  b.hidden=!on;
  if(on) document.getElementById('setupBannerTitle').textContent='Sorting '+(getActivePack()?.name||'your pack');
}
function finishSetup(quiet){
  if(!packSetupId) return;
  commitPackSetup(packSetupId);
  packSetupId=null; ss('packSetupId',null);
  renderSetupBanner(); renderHiddenTracks?.();
  if(!quiet) spotifyShowSnack('Biomes saved. Change them any time from Packs → Edit biomes.');
}
// Make the current biome lists a user pack's own starting layout (so they don't count as "removed tracks")
function commitPackSetup(packId){
  const packs=getUserPacks(); const p=packs.find(x=>x.id===packId); if(!p) return;
  const key=packKey(packId,'locTracks'); const ov=gs(key,{}); let changed=false;
  (p.biomes||[]).forEach(b=>{ if(ov[b.id]!==undefined){ b.defaultTracks=[...ov[b.id]]; delete ov[b.id]; changed=true; } });
  if(changed){ saveUserPacks(packs); ss(key,ov); }
}

// ── IMPORT TAB ──
function miPreviewImport(){
  const raw=document.getElementById('miImportInput').value.trim();
  const preview=document.getElementById('miImportPreview');
  const nameEl=document.getElementById('miImportPreviewName');
  const metaEl=document.getElementById('miImportPreviewMeta');
  if(raw.length<4){preview.classList.remove('visible');return;}

  if(raw.startsWith('{')){
    try{
      const j=JSON.parse(raw);
      const sort=parseAiSort(j);
      if(sort){
        if(sort.error){ nameEl.textContent='⚠ '+sort.error; metaEl.textContent=''; }
        else {
          nameEl.textContent='AI sort for '+sort.pack.name;
          metaEl.textContent=sort.placed+' of '+sort.total+' songs placed across '+sort.used+' places ('+(sort.total-sort.placed)+' left out). Importing replaces this pack\'s current places.';
        }
        preview.classList.add('visible');
        return;
      }
      // Handle multi-video AI format
      const pack=miNormaliseAiJson(j);
      if(pack){
        nameEl.textContent=(pack.icon||'🎵')+' '+pack.name;
        const tc=getAllPackTracks(pack).length;
        metaEl.textContent=tc+' tracks · '+(pack.biomes?.length||0)+' biomes';
        preview.classList.add('visible');
      }
    }catch(e){preview.classList.remove('visible');}
    return;
  }
  if(!raw.startsWith('MM-')&&API_URL&&raw.length<=12){
    nameEl.innerHTML=ic('extLink','ic-sm')+' Server code — will fetch on import';
    metaEl.textContent=''; preview.classList.add('visible'); return;
  }
  const pack=ShareBackend.decode(raw);
  if(pack&&pack.name){
    nameEl.textContent=(pack.icon||'🎵')+' '+pack.name;
    metaEl.textContent=(pack.tracks?.length||0)+' tracks';
    preview.classList.add('visible');
  } else {
    preview.classList.remove('visible');
  }
}

async function miDoImport(){
  const raw=document.getElementById('miImportInput').value.trim();
  const flash=document.getElementById('miImportFlash');
  if(!raw){flash.textContent='Paste a code or JSON first.';return;}
  busyText(flash,'Loading…');
  let pack=null;

  if(raw.startsWith('{')){
    let j;
    try{ j=JSON.parse(raw); }catch(e){flash.textContent='❌ Invalid JSON';return;}
    const sort=parseAiSort(j);
    if(sort){
      if(sort.error){ flash.textContent='❌ '+sort.error; return; }
      applyAiSort(sort);
      flash.textContent='✓ Sorted '+sort.placed+' songs in "'+sort.pack.name+'"';
      document.getElementById('miImportInput').value='';
      document.getElementById('miImportPreview').classList.remove('visible');
      document.getElementById('makeImportOverlay').classList.remove('open');
      setTimeout(()=>flash.textContent='',3000);
      return;
    }
    pack=miNormaliseAiJson(j);
    if(!pack){flash.textContent='❌ Missing required fields';return;}
  } else if(!raw.startsWith('MM-')&&API_URL){
    try{pack=await ShareBackend.loadFromServer(raw);}
    catch(e){flash.textContent='❌ '+(e.message||'Not found');return;}
  } else {
    pack=ShareBackend.decode(raw);
    if(!pack){flash.textContent='❌ Invalid code';return;}
  }

  const ok=importSharedPack(pack,false);
  if(ok){
    flash.textContent='✓ "'+pack.name+'" imported!';
    document.getElementById('miImportInput').value='';
    document.getElementById('miImportPreview').classList.remove('visible');
    document.getElementById('makeImportOverlay').classList.remove('open');
    setTimeout(()=>flash.textContent='',3000);
  } else {
    flash.textContent='❌ Import failed';
  }
}

function miNormaliseAiJson(j){
  if(!j||!j.name) return null;
  const BD={
    beach:{emoji:'🌊',cssClass:'biome-beach',keywords:['beach','coast','sea']},
    city:{emoji:'🏙️',cssClass:'biome-city',keywords:['city','downtown','urban']},
    forest:{emoji:'🌲',cssClass:'biome-forest',keywords:['forest','woods','park']},
    mountain:{emoji:'🌋',cssClass:'biome-mountain',keywords:['mountain','hill','summit']},
    desert:{emoji:'🏜️',cssClass:'biome-desert',keywords:['desert','sand','dune']},
    town:{emoji:'🏘️',cssClass:'biome-town',keywords:['suburb','town','village']},
    ocean:{emoji:'🐋',cssClass:'biome-ocean',keywords:['ocean','gulf','lake']},
    shopping:{emoji:'🛍️',cssClass:'biome-shopping',keywords:['mall','shopping','store']},
    port:{emoji:'⚓',cssClass:'biome-port',keywords:['port','dock','harbor']},
  };
  const BN={beach:'Beach',city:'City',forest:'Forest',mountain:'Mountain',desert:'Desert',town:'Town',ocean:'Ocean',shopping:'Shopping',port:'Port'};

  // Multi-video format (new) or legacy single-video
  // AI output is untrusted: keep only well-formed video ids, tracks and indices
  const YT_ID=/^[A-Za-z0-9_-]{11}$/;
  const vidOf=v=>{ const id=String(v?.videoId||'').trim(); if(YT_ID.test(id)) return id;
    const m=String(v?.url||'').match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/); return m?m[1]:''; };
  const cleanTracks=arr=>(Array.isArray(arr)?arr:[]).filter(t=>t&&t.title).map(t=>({
    title:String(t.title).slice(0,200),
    start:Math.max(0,Math.floor(Number(t.start)||0)),
    dur:Math.min(3600,Math.max(1,Math.floor(Number(t.dur)||300)))
  }));
  let videos=[], allTracks=[];
  if(j.videos&&Array.isArray(j.videos)){
    videos=j.videos.map(v=>({id:vidOf(v),tracks:cleanTracks(v.tracks)})).filter(v=>v.id);
    allTracks=videos.flatMap(v=>v.tracks);
  } else if(j.tracks&&j.videoId&&YT_ID.test(String(j.videoId))){
    videos=[{id:String(j.videoId),tracks:cleanTracks(j.tracks)}];
    allTracks=videos[0].tracks;
  } else return null;
  if(!videos.length||!allTracks.length) return null;

  const n=allTracks.length;
  const idx=arr=>[...new Set((Array.isArray(arr)?arr:[]).filter(i=>Number.isInteger(i)&&i>=0&&i<n))];
  const src=(j.biomes&&typeof j.biomes==='object')?j.biomes:{};
  const biomes=Object.keys(BN).map(id=>({
    id, name:BN[id], emoji:BD[id].emoji, cssClass:BD[id].cssClass,
    keywords:BD[id].keywords, defaultTracks:idx(src[id]),
  }));
  // Home/Work/School/Gym aren't pack biomes; importSharedPack stores _locTracks as the pack's place lists
  const presets={};
  ['home','work','school','gym'].forEach(id=>{ if(src[id]!==undefined) presets[id]=idx(src[id]); });

  return{
    id:'ai_'+Date.now(), name:String(j.name).slice(0,60), subtitle:String(j.subtitle||'').slice(0,60),
    icon:String(j.icon||'🎵').slice(0,8), videoId:videos[0].id,
    source:String(j.subtitle||'Custom Pack').slice(0,60), builtin:false,
    videos, tracks:allTracks, biomes,
    ...(Object.keys(presets).length?{_locTracks:presets}:{}),
  };
}

function miCopyPrompt(id){
  const box=document.getElementById(id||'miAiPrompt');
  const txt=box?.textContent||'';
  const el=document.getElementById(id==='miSortPrompt'?'miPromptFlash2':'miPromptFlash');
  if(!txt||box.dataset.empty){ el.textContent='Nothing to copy yet.'; return; }
  navigator.clipboard.writeText(txt).then(()=>{
    el.textContent='✓ Prompt copied!';
    setTimeout(()=>el.textContent='',2500);
  }).catch(()=>{ el.textContent='Copy failed. Select the prompt and copy it manually.'; });
}

// ── AI prompts: YouTube (build a pack) / Spotify (sort an existing pack's songs) ──
const AI_PLACES=[
  ['beach','sunny, breezy, summery'],['city','busy, night lights, club'],['forest','calm, natural, organic'],
  ['mountain','epic, climbing, heavy'],['desert','dry, hypnotic, hazy'],['town','friendly, everyday, singalong'],
  ['ocean','vast, flowing, spacious'],['shopping','upbeat, catchy, playful'],['port','industrial, gritty, mechanical'],
  ['home','cozy, soft, relaxed'],['work','focused, instrumental'],['school','light, youthful, nerdy'],['gym','high energy, hype']
];
const AI_PRESETS=['home','work','school','gym'];
function miAiTab(which){
  const yt=which!=='sp';
  document.getElementById('aiPaneYt').hidden=!yt;
  document.getElementById('aiPaneSp').hidden=yt;
  document.getElementById('aiTabYt').classList.toggle('active',yt);
  document.getElementById('aiTabSp').classList.toggle('active',!yt);
  document.getElementById('aiTabYt').setAttribute('aria-selected',yt);
  document.getElementById('aiTabSp').setAttribute('aria-selected',!yt);
  if(!yt) miFillSpotifyPackSelect();
}
function packsWithSpotify(){ return getAllPacks().filter(p=>getAllPackTracks(p).some(t=>t.spotifyUri)); }
function packsForSorting(){ return getAllPacks().filter(p=>getAllPackTracks(p).length); }
function miFillSpotifyPackSelect(){
  const sel=document.getElementById('miAiSpPack');
  const keep=sel.value;
  sel.innerHTML='';
  const packs=packsForSorting();
  packs.forEach(p=>{ const o=document.createElement('option'); o.value=p.id; o.textContent=p.name+' ('+getAllPackTracks(p).length+' tracks)'; sel.appendChild(o); });
  if(packs.some(p=>p.id===keep)) sel.value=keep;
  else if(packs.some(p=>p.id===getPackId())) sel.value=getPackId();
  sel.disabled=!packs.length;
  miBuildSpotifyPrompt();
}
function miBuildSpotifyPrompt(){
  const box=document.getElementById('miAiPromptSp');
  const pack=packsForSorting().find(p=>p.id===document.getElementById('miAiSpPack').value);
  if(!pack){
    box.textContent='No packs with tracks yet. Make one first.';
    box.dataset.empty='1'; return;
  }
  delete box.dataset.empty;
  box.textContent=buildSortPrompt(pack);
}
// The "sort these tracks into places" prompt for any pack (its answer is read by parseAiSort)
function buildSortPrompt(pack){
  const tracks=getAllPackTracks(pack);
  const minPer=Math.max(1,Math.min(10,Math.floor(tracks.length/AI_PLACES.length)));
  const example='{\n  "musicmapSort": 1,\n  "packId": '+JSON.stringify(pack.id)+',\n  "places": {\n'
    +AI_PLACES.map(([id],i)=>'    "'+id+'": ['+(i*3)+','+(i*3+1)+','+(i*3+2)+']').join(',\n')+'\n  }\n}';
  return [
    'Sort these songs into MusicMap places.',
    '',
    'MusicMap plays music that matches where the listener is. Put each song in the place whose mood fits it best:',
    AI_PLACES.map(([id,mood])=>'- '+id+': '+mood).join('\n'),
    '',
    'Pack: '+pack.name,
    'Songs (index. title — artist):',
    tracks.map((t,i)=>i+'. '+String(t.title).replace(/\s+/g,' ')).join('\n'),
    '',
    'Rules:',
    '- Put each song in exactly one place. If a song doesn\'t clearly fit anywhere, leave it out.',
    '- Aim for at least '+minPer+' songs in every place.',
    '- Use only the index numbers listed above (0 to '+(tracks.length-1)+').',
    '- Keep "packId" exactly as shown.',
    '',
    'Return ONLY valid JSON, no explanation:',
    example
  ].join('\n');
}

// ── Applying an AI sort answer ({"musicmapSort":1,"packId":…,"places":{…}}) ──
// The answer is untrusted text: only known places and in-range integer indices are kept.
function parseAiSort(j){
  if(!j || j.musicmapSort===undefined || typeof j.places!=='object' || !j.places) return null;
  const pack=getAllPacks().find(p=>p.id===j.packId);
  if(!pack) return {error:'That answer is for a pack that isn\'t on this device.'};
  const n=getAllPackTracks(pack).length;
  const places={}; const seen=new Set();
  for(const [id] of AI_PLACES){
    const arr=Array.isArray(j.places[id])?j.places[id]:[];
    places[id]=[...new Set(arr.filter(i=>Number.isInteger(i)&&i>=0&&i<n))];
    places[id].forEach(i=>seen.add(i));
  }
  return {pack, places, placed:seen.size, total:n, used:Object.values(places).filter(a=>a.length).length};
}
function applyAiSort(sort){
  const key=packKey(sort.pack.id,'locTracks');
  const ov=gs(key,{});
  for(const [id] of AI_PLACES) ov[id]=sort.places[id];
  ss(key,ov);
  if(!sort.pack.builtin) commitPackSetup(sort.pack.id); // your own pack: this is its layout, not a list of removals
  activatePack(sort.pack.id);
  renderLocGrid();
}

// ── REDIRECT old entry points ──
function openAddPackModal(){ openMakeImportModal(); }

// ── VIDEO TITLE CACHE ──
const videoTitleCache = {};
async function fetchVideoTitle(videoId){
  if(videoTitleCache[videoId]) return videoTitleCache[videoId];
  try{
    // Use oEmbed — no API key needed
    const r=await fetch('https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v='+videoId+'&format=json');
    const d=await r.json();
    // Take first 4 words as short label
    const words=d.title.split(/\s+/).slice(0,4).join(' ');
    videoTitleCache[videoId]=words;
    return words;
  }catch(e){
    videoTitleCache[videoId]=videoId;
    return videoId;
  }
}
async function warmVideoTitles(pack){
  if(!pack) return;
  const vids=pack.videos?pack.videos.map(v=>v.id):[pack.videoId];
  await Promise.all(vids.filter(Boolean).map(fetchVideoTitle));
}

// ═══════════════════════════════════════════
// SPOTIFY INTEGRATION
// ═══════════════════════════════════════════
const SPOTIFY_SCOPES='streaming user-read-email user-read-private user-modify-playback-state user-read-playback-state';

// Signed in = we hold a refresh token. The access token only lasts an hour and is renewed on demand,
// so an expired one must not count as "disconnected" (that used to drop people after an hour).
function isSpotifyConnected(){ return !!(gs('spotifyRefreshToken',null) || (gs('spotifyToken',null) && gs('spotifyExpiry',0) > Date.now())); }

function setSpotifyTokens(access, refresh, expiresIn){
  ss('spotifyToken',access);
  if(refresh) ss('spotifyRefreshToken',refresh);
  ss('spotifyExpiry', Date.now() + expiresIn*1000 - 60000);
}
function clearSpotifyTokens(){
  ss('spotifyToken',null); ss('spotifyRefreshToken',null); ss('spotifyExpiry',0); ss('spotifyTokenClientId',null);
}
function spotifyRedirectUri(){
  return window.location.origin + window.location.pathname;
}
function spotifyRandStr(len){
  const arr=new Uint8Array(len);
  crypto.getRandomValues(arr);
  return btoa(String.fromCharCode(...arr)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'').slice(0,len);
}
async function spotifyCodeChallenge(verifier){
  const data=new TextEncoder().encode(verifier);
  const digest=await crypto.subtle.digest('SHA-256',data);
  return btoa(String.fromCharCode(...new Uint8Array(digest))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}

// MusicMap's shared Spotify app. A Client ID is public (it's in every login link); the
// Client Secret is never used — PKCE login doesn't need it. Spotify Development Mode only
// lets accounts invited in the dashboard use this app, so others can bring their own.
const SPOTIFY_SHARED_CLIENT_ID=/^[0-9a-f]{32}$/i.test(MM_CONFIG.spotifyClientId||'')?MM_CONFIG.spotifyClientId:'bc016b83d9a147428d49e5e9c84a0c5d';
const SPOTIFY_CLIENT_ID_RE=/^[0-9a-f]{32}$/i;
function ownSpotifyClientId(){
  const id=String(gs('spotifyClientId','')||'').trim();
  return SPOTIFY_CLIENT_ID_RE.test(id)?id:'';
}
function spotifyClientId(){ return ownSpotifyClientId()||SPOTIFY_SHARED_CLIENT_ID; }
function usingSharedSpotifyApp(){ return !ownSpotifyClientId(); }

function showSpotifyNotice(kind){
  const box=document.getElementById('spotifyNotice');
  const text=document.getElementById('spotifyNoticeText');
  const actions=document.getElementById('spotifyNoticeActions');
  if(!box) return;
  if(!kind){ box.hidden=true; return; }
  box.dataset.kind=kind;
  if(kind==='warn'){
    text.textContent="Heads up: Spotify only lets invited testers use MusicMap's shared Spotify app, and playback needs Spotify Premium. If you haven't been invited, sign-in will fail unless you use your own free Spotify developer Client ID.";
    actions.hidden=false;
  } else if(kind==='denied'){
    text.textContent="Spotify didn't let this account use MusicMap's shared Spotify app (it's limited to invited testers). To use Spotify, create your own free Spotify developer app and paste its Client ID below.";
    actions.hidden=true;
  } else if(kind==='premium'){
    text.textContent="You're signed in, but in-browser Spotify playback needs a Spotify Premium account. Tracks will keep playing from YouTube.";
    actions.hidden=true;
  }
  box.hidden=false;
}
function openSpotifyOwnApp(){
  const d=document.getElementById('spotifyOwnApp');
  if(d){ d.open=true; document.getElementById('spotifyClientIdInput')?.focus(); }
}
function saveOwnSpotifyClientId(){
  const input=document.getElementById('spotifyClientIdInput');
  const msg=document.getElementById('spotifyClientIdMsg');
  const id=input.value.trim();
  if(id && !SPOTIFY_CLIENT_ID_RE.test(id)){ msg.textContent="That doesn't look like a Client ID. It should be 32 letters and numbers."; return; }
  if(id!==ownSpotifyClientId()){
    if(isSpotifyConnected()) spotifyDisconnect(); // tokens belong to the app that issued them
    ss('spotifyClientId',id);
  }
  msg.textContent=id?'Saved. Tap Connect to sign in with your own app.':"Cleared. Using MusicMap's shared Spotify app.";
  showSpotifyNotice(null);
}
function syncSpotifyOwnAppUI(){
  const input=document.getElementById('spotifyClientIdInput');
  if(input) input.value=ownSpotifyClientId();
  const uri=document.getElementById('spRedirectUri');
  if(uri) uri.textContent=spotifyRedirectUri();
}

async function spotifyLogin(confirmed){
  // Warn before sending people off to Spotify with the shared app, unless it already worked for them
  if(usingSharedSpotifyApp() && confirmed!==true && !gs('spotifySharedOk',false)){
    switchTab('settings');
    showSpotifyNotice('warn');
    document.getElementById('spotifyNotice')?.scrollIntoView({block:'center',behavior:'smooth'});
    return;
  }
  const clientId=spotifyClientId();
  const verifier=spotifyRandStr(64);
  const challenge=await spotifyCodeChallenge(verifier);
  const state=spotifyRandStr(16);
  sessionStorage.setItem('sp_verifier',verifier);
  sessionStorage.setItem('sp_state',state);
  sessionStorage.setItem('sp_client',clientId); // the callback must use the same app
  const params=new URLSearchParams({
    response_type:'code', client_id:clientId, scope:SPOTIFY_SCOPES,
    redirect_uri:spotifyRedirectUri(), state, code_challenge_method:'S256', code_challenge:challenge
  });
  window.location.href='https://accounts.spotify.com/authorize?'+params;
}

async function handleSpotifyCallback(){
  const params=new URLSearchParams(window.location.search);
  const code=params.get('code');
  const error=params.get('error');
  const state=params.get('state');
  const expected=sessionStorage.getItem('sp_state');
  cleanSpotifyUrlParams();
  sessionStorage.removeItem('sp_state');
  // Reject replies we didn't ask for (login CSRF) before touching the code
  if(!expected || state!==expected){ spotifyShowSnack('Spotify sign-in did not match. Please try again.'); return; }
  const clientId=sessionStorage.getItem('sp_client')||'';
  sessionStorage.removeItem('sp_client');
  if(error||!code){
    // access_denied: cancelled, or the account isn't allowed on this app
    if(error && clientId===SPOTIFY_SHARED_CLIENT_ID){ switchTab('settings'); showSpotifyNotice('denied'); openSpotifyOwnApp(); }
    return;
  }
  const verifier=sessionStorage.getItem('sp_verifier');
  if(!verifier||!SPOTIFY_CLIENT_ID_RE.test(clientId)) return;
  try{
    const resp=await fetch('https://accounts.spotify.com/api/token',{
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body:new URLSearchParams({
        grant_type:'authorization_code', code, redirect_uri:spotifyRedirectUri(),
        client_id:clientId, code_verifier:verifier
      })
    });
    if(!resp.ok) throw new Error(await resp.text());
    const data=await resp.json();
    setSpotifyTokens(data.access_token, data.refresh_token, data.expires_in);
    ss('spotifyTokenClientId',clientId);
    sessionStorage.removeItem('sp_verifier');
    await checkSpotifyAccess(clientId);
  }catch(e){
    console.error('Spotify token exchange failed:',e);
    spotifyShowSnack('Spotify connection failed. Check your Client ID.');
  }
}

// After sign-in: does Spotify let this account use the app, and is it Premium?
async function checkSpotifyAccess(clientId){
  try{
    const r=await fetch('https://api.spotify.com/v1/me',{headers:{'Authorization':'Bearer '+gs('spotifyToken','')}});
    if(r.status===403){
      // Development Mode: account isn't on this app's user list
      clearSpotifyTokens();
      switchTab('settings');
      if(clientId===SPOTIFY_SHARED_CLIENT_ID) showSpotifyNotice('denied');
      else spotifyShowSnack('Spotify refused this account. Add it under Users and Access in your Spotify app.');
      openSpotifyOwnApp();
      return false;
    }
    if(r.ok){
      const me=await r.json();
      if(clientId===SPOTIFY_SHARED_CLIENT_ID) ss('spotifySharedOk',true);
      if(me.product && me.product!=='premium'){ switchTab('settings'); showSpotifyNotice('premium'); }
      else showSpotifyNotice(null);
    }
    return r.ok;
  }catch(e){ return false; }
}

// One refresh at a time: Spotify swaps the refresh token on every use, so two at once would
// leave the second holding a dead token. Result: 'ok' | 'revoked' (sign in again) | 'offline' (keep the sign-in)
let spRefreshing=null;
function spotifyRefreshAccessToken(){
  if(!spRefreshing) spRefreshing=spotifyDoRefresh().finally(()=>{ spRefreshing=null; });
  return spRefreshing;
}
async function spotifyDoRefresh(){
  const refresh=gs('spotifyRefreshToken',null);
  const clientId=gs('spotifyTokenClientId','')||spotifyClientId(); // refresh with the app that issued the token
  if(!refresh||!SPOTIFY_CLIENT_ID_RE.test(clientId)) return 'revoked';
  try{
    const resp=await fetch('https://accounts.spotify.com/api/token',{
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body:new URLSearchParams({grant_type:'refresh_token',refresh_token:refresh,client_id:clientId})
    });
    if(resp.status===400||resp.status===401){
      // another tab may have used this refresh token a moment ago and saved a fresh pair
      if(gs('spotifyRefreshToken',null)!==refresh && gs('spotifyExpiry',0)>Date.now()) return 'ok';
      return 'revoked';
    }
    if(!resp.ok) return 'offline';
    const data=await resp.json();
    if(!data.access_token) return 'offline';
    setSpotifyTokens(data.access_token, data.refresh_token||refresh, Number(data.expires_in)||3600);
    return 'ok';
  }catch(e){ return 'offline'; }
}
async function getValidSpotifyToken(){
  if(!isSpotifyConnected()) return null;
  if(!gs('spotifyToken',null) || gs('spotifyExpiry',0) < Date.now()){
    const r=await spotifyRefreshAccessToken();
    if(r==='revoked'){ spotifySignedOut(); return null; }
    if(r!=='ok') return null; // offline for now: keep the sign-in and try again next time
  }
  return gs('spotifyToken',null);
}
// Spotify itself ended the sign-in (revoked, password changed, app removed)
function spotifySignedOut(){
  if(!isSpotifyConnected()) return;
  if(spotifyPlayer){ try{ spotifyPlayer.disconnect(); }catch(e){} spotifyPlayer=null; }
  spotifyDeviceId=null; spotifyReady=false;
  clearSpotifyTokens(); updateSpotifySettingsUI(); renderConnectionsUI();
  if(appMode==='local'&&chanItems.length) renderChanList();
  spotifyShowSnack('Spotify ended the sign-in. Reconnect in Settings → Connections.');
}

function cleanSpotifyUrlParams(){
  const url=new URL(window.location);
  ['code','state','error','ubi'].forEach(k=>url.searchParams.delete(k)); // ubi: Spotify's own tracking tag
  history.replaceState({},'',url.toString());
}

// ── Web Playback SDK ──
let spotifyPlayer=null;
let spotifyDeviceId=null;
let spotifyReady=false;
let spotifyActive=false;
let spotifyInitFailed=false;

async function initSpotifySdk(){
  if(spotifyPlayer) return;
  return new Promise(resolve=>{
    window.onSpotifyWebPlaybackSDKReady=async()=>{
      const token=await getValidSpotifyToken();
      if(!token){resolve();return;}
      spotifyPlayer=new Spotify.Player({
        name:'MusicMap',
        getOAuthToken:async cb=>{
          const t=await getValidSpotifyToken();
          if(t) cb(t);
        },
        volume:0.8
      });
      spotifyPlayer.addListener('ready',({device_id})=>{
        const first=!spotifyDeviceId; spotifyDeviceId=device_id; spotifyReady=true;
        updateSpotifySettingsUI();
        if(first) spotifyShowSnack('🎵 Spotify ready!');
        resolve();
      });
      // the browser player dropped off Spotify (sleep, network change): reconnect instead of waiting forever
      spotifyPlayer.addListener('not_ready',()=>{
        spotifyReady=false; updateSpotifySettingsUI();
        setTimeout(()=>{ if(spotifyPlayer&&!spotifyReady) spotifyPlayer.connect(); },3000);
      });
      spotifyPlayer.addListener('player_state_changed',state=>{
        if(!state||!spotifyActive||spRemoteDevice()) return;
        const cur=state.track_window?.current_track;
        onSpotifyState({uris:[cur?.uri,cur?.linked_from?.uri].filter(Boolean), paused:state.paused, position:state.position,
          duration:state.duration, loading:state.loading, images:cur?.album?.images, album:cur?.album?.name, name:cur?.name});
      });
      // e.g. no Widevine/DRM (some embedded or privacy browsers) — say so instead of "Connecting…" forever
      spotifyPlayer.addListener('initialization_error',()=>{
        spotifyInitFailed=true; updateSpotifySettingsUI();
        spotifyShowSnack('This browser can’t play Spotify. Try Chrome, Edge, Firefox or Safari.');
        resolve();
      });
      // usually just an access token that ran out: renew it and reconnect; only a refused renewal signs out
      spotifyPlayer.addListener('authentication_error',async()=>{
        resolve();
        const r=await spotifyRefreshAccessToken();
        if(r==='revoked') spotifySignedOut();
        else setTimeout(()=>{ if(spotifyPlayer&&!spotifyReady) spotifyPlayer.connect(); },2000);
      });
      // a song Spotify can't play (e.g. not licensed in your country)
      spotifyPlayer.addListener('playback_error',()=>{
        if(!spotifyActive) return;
        if(appMode==='local'?(chanVia==='spotify'&&chanPlaying):isPlaying) skipUnplayable('spotify');
      });
      spotifyPlayer.addListener('account_error',()=>{ spotifyShowSnack('Spotify Premium required for playback.'); showSpotifyNotice('premium'); resolve(); });
      spotifyPlayer.connect();
    };
    const existing=document.querySelector('script[src*="spotify-player"]');
    if(existing && window.Spotify){ window.onSpotifyWebPlaybackSDKReady(); }
    else if(!existing){
      const s=document.createElement('script');
      s.src='https://sdk.scdn.co/spotify-player.js';
      document.head.appendChild(s);
    }
  });
}

function spotifyDisconnect(){
  if(spotifyPlayer){ spotifyPlayer.disconnect(); spotifyPlayer=null; }
  spotifyDeviceId=null; spotifyReady=false; spotifyActive=false;
  clearSpotifyTokens(); ss('spotifyDevice',null);
  updateSpotifySettingsUI(); renderConnectionsUI();
  if(appMode==='local'&&chanItems.length) renderChanList();
  spotifyShowSnack('Spotify disconnected');
}

// ── Where Spotify plays: this browser (Web Playback SDK) or one of your Spotify apps (Spotify Connect).
// Your phone's Spotify app keeps going with the screen off, and works where the browser player can't (iPhone).
function spRemoteDevice(){ const d=gs('spotifyDevice',null); return d&&/^[A-Za-z0-9_-]{1,64}$/.test(d.id||'')?d:null; }
function spTargetId(){ return spRemoteDevice()?.id||spotifyDeviceId; }
function spotifyCanPlay(){ return isSpotifyConnected() && (!!spRemoteDevice() || spotifyReady); }
function spotifyWhyNot(){
  if(!isSpotifyConnected()) return 'Connect Spotify in Settings first.';
  if(spotifyInitFailed) return 'This browser can’t play Spotify. In Settings → Connections, choose your Spotify app to play there.';
  return 'Spotify is still connecting. Try again in a moment.';
}
async function spotifyPlayBody(body){
  const token=await getValidSpotifyToken(); const dev=spTargetId();
  if(!token||!dev) return {ok:false};
  try{
    const r=await fetch('https://api.spotify.com/v1/me/player/play?device_id='+encodeURIComponent(dev),{
      method:'PUT',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(body)});
    if(r.status===404&&spRemoteDevice()) spotifyShowSnack('Can’t reach '+spRemoteDevice().name+'. Open Spotify there, or choose This browser in Settings → Connections.');
    return {ok:r.ok||r.status===204, status:r.status};
  }catch(e){ return {ok:false}; }
}
async function spotifyPlayUri(uri){ return (await spotifyPlayBody({uris:[uri]})).ok; }
async function spotifyRemoteCmd(cmd){
  const token=await getValidSpotifyToken(); const dev=spRemoteDevice(); if(!token||!dev) return;
  try{ await fetch('https://api.spotify.com/v1/me/player/'+cmd+'?device_id='+encodeURIComponent(dev.id),{method:'PUT',headers:{'Authorization':'Bearer '+token}}); }catch(e){}
}
async function spotifyPausePlayback(){
  if(spRemoteDevice()) return spotifyRemoteCmd('pause');
  if(spotifyPlayer) try{ await spotifyPlayer.pause(); }catch(e){}
}
async function spotifyResumePlayback(){
  if(spRemoteDevice()) return spotifyRemoteCmd('play');
  if(spotifyPlayer) try{ spotifyPlayer.activateElement?.(); await spotifyPlayer.resume(); }catch(e){}
}
// Phones only let a page start audio from a tap: unlock the browser player while we have one
function spotifyUnlockAudio(){ if(spotifyPlayer&&!spRemoteDevice()) try{ spotifyPlayer.activateElement?.(); }catch(e){} }

// What Spotify is playing, the same shape for both players: {uris,paused,position,duration,loading,images,album} (ms)
let spRemoteLast=null; // last remote reading + when it was taken, so the seek bar can run between polls
async function spotifyGetState(){
  if(!spRemoteDevice()){
    const st=await spotifyPlayer?.getCurrentState?.(); if(!st) return null;
    const cur=st.track_window?.current_track;
    return {uris:[cur?.uri,cur?.linked_from?.uri].filter(Boolean), paused:st.paused, position:st.position, duration:st.duration, loading:st.loading, images:cur?.album?.images, album:cur?.album?.name};
  }
  if(spRemoteLast){
    const s=spRemoteLast.s, live=!s.paused?Date.now()-spRemoteLast.at:0;
    return {...s, position:Math.min(s.duration||Infinity, s.position+live)};
  }
  return null;
}
// What Spotify itself says is playing (any device), in the same shape as spotifyGetState()
async function spotifyApiState(){
  const token=await getValidSpotifyToken(); if(!token) return null;
  try{
    const r=await fetch('https://api.spotify.com/v1/me/player?additional_types=track',{headers:{'Authorization':'Bearer '+token}});
    if(r.status!==200) return null;
    const d=await r.json(), it=d.item; if(!it) return null;
    return {uris:[it.uri,it.linked_from?.uri].filter(Boolean), paused:!d.is_playing, position:d.progress_ms||0, duration:it.duration_ms||0, loading:false, images:it.album?.images, album:it.album?.name, name:it.name};
  }catch(e){ return null; }
}
async function pollSpotifyRemote(){
  const token=await getValidSpotifyToken(); if(!token) return;
  try{
    const r=await fetch('https://api.spotify.com/v1/me/player?additional_types=track',{headers:{'Authorization':'Bearer '+token}});
    if(r.status===204){ spRemoteLast=null; return; }
    if(!r.ok) return;
    const d=await r.json(), it=d.item;
    if(!it) return;
    const s={uris:[it.uri,it.linked_from?.uri].filter(Boolean), paused:!d.is_playing, position:d.progress_ms||0, duration:it.duration_ms||0, loading:false, images:it.album?.images, album:it.album?.name, name:it.name};
    spRemoteLast={s,at:Date.now()};
    if(spotifyActive) onSpotifyState(s);
  }catch(e){}
}
setInterval(()=>{ if(spotifyActive&&spRemoteDevice()) pollSpotifyRemote(); },3000);

// One handler for both players' updates
let spHeard=''; // the song Spotify has really been playing (so a stop at 0:00 afterwards is its end, not a failure)
function onSpotifyState(s){
  if(!spotifyActive) return;
  if(!s.paused&&s.position>2000) spHeard=s.uris[0]||'';
  setSpotifyArt(s.images, s.album);
  if(appMode==='local'&&chanVia==='spotify'&&s.name) showArtistSong(s.name);
  // Spotify moved on by itself (screen may be off): follow it instead of starting anything
  if(appMode!=='local' && packsSpQueue && followPacksSpotify(s.uris)) return;
  if(appMode==='local' && chanVia==='spotify' && followChanSpotify(s.uris)) return;
  if(s.paused && s.position===0 && !s.loading){
    // end of what we handed Spotify: move on ourselves (unless Spotify already has the next song lined up)
    if(appMode!=='local' && packsSpQueue && packsSpQueue.length>1) return;
    if(appMode!=='local' && packsSpQueue && spHeard!==(s.uris[0]||'')) return; // just starting, not finished
    if(appMode==='local' && (chanVia!=='spotify' || !chanPlaying || chanSpHasMore())) return;
    if(appMode!=='local' && !isPlaying) return;
    nextTrack();
  }
}

// Small source icon before the album/game line. Spotify only counts while it's really playing
// through the SDK — otherwise the track falls back to YouTube.
function setNowPlayingSource(t, viaSpotify){
  const el=document.getElementById('npSource');
  if(!el) return;
  const src=!t?null:(viaSpotify?'spotify':(trackSource(t)==='spotify'?'other':trackSource(t)));
  el.innerHTML=src?SOURCE_ICONS[src]:'';
  el.title=src?'Playing from '+SOURCE_LABELS[src]:'';
}
// Album art from the Spotify SDK's player state. Only Spotify's own image host is accepted.
const SPOTIFY_ART_RE=/^https:\/\/(?:i\.scdn\.co|image-cdn-[a-z]{2}\.spotifycdn\.com)\/image\/[A-Za-z0-9]+$/;
function setSpotifyArt(images, albumName){
  const imgs=(Array.isArray(images)?images:[]).filter(i=>SPOTIFY_ART_RE.test(String(i?.url||'')));
  if(!imgs.length) return;
  // biggest image up to 640px (the SDK lists sizes; 640 is plenty for this slot)
  const pick=imgs.filter(i=>(i.width||i.size||0)<=640).sort((a,b)=>(b.width||0)-(a.width||0))[0]||imgs[0];
  const small=imgs.slice().sort((a,b)=>(a.width||0)-(b.width||0))[0];
  const img=document.getElementById('spArtImg'), bg=document.getElementById('spArtBg');
  if(img.src!==pick.url){ img.src=pick.url; bg.src=small.url; }
  img.alt=albumName?'Album art: '+albumName:'Album art';
}
function showSpotifyArtMode(on){
  document.getElementById('ytContainer')?.classList.toggle('sp-mode',on);
  const art=document.getElementById('spArt');
  if(art) art.hidden=!on;
  if(!on){ const img=document.getElementById('spArtImg'); if(img){ img.removeAttribute('src'); document.getElementById('spArtBg').removeAttribute('src'); } }
  updateVideoToggleLabel();
}
function updateSpotifyNowPlaying(active, t){
  setNowPlayingSource(t, active);
  showSpotifyArtMode(!!active);
  const btn=document.getElementById('npYtBtn');
  if(!btn) return;
  const id=active&&t?.spotifyUri?String(t.spotifyUri).split(':').pop():'';
  if(id && /^[A-Za-z0-9]{22}$/.test(id)){
    btn.disabled=false;
    btn.setAttribute('aria-label','Open in Spotify'); btn.title='Open in Spotify';
    btn.onclick=()=>window.open('https://open.spotify.com/track/'+id,'_blank','noopener');
  } else {
    btn.setAttribute('aria-label','Open on YouTube'); btn.title='Open on YouTube';
  }
}

function updateSpotifySettingsUI(){
  const connected=isSpotifyConnected();
  const btn=document.getElementById('spotifyConnectBtn');
  const status=document.getElementById('spotifyStatus');
  if(!btn||!status) return;
  if(connected){
    btn.textContent='Disconnect';
    btn.onclick=spotifyDisconnect;
    status.innerHTML=spotifyReady
      ? '<span style="color:var(--green)">● Connected & ready</span>'
      : spotifyInitFailed
        ? '<span style="color:var(--red)">● Signed in, but this browser can’t play Spotify</span>'
        : '<span class="mm-busy-text" style="color:var(--yellow)"><span class="mm-spinner" aria-hidden="true"></span>Connecting…</span>';
  } else {
    btn.textContent='Connect';
    btn.onclick=spotifyLogin;
    status.innerHTML='<span style="color:var(--muted)">● Not connected</span>';
  }
}

// ═══════════════════════════════════════════
// APPLE MUSIC (MusicKit JS)
// ═══════════════════════════════════════════
// The site's developer token comes from the plugin, signed on the server with the site's MusicKit key
// (the key itself never reaches the page). Each visitor signs in with their own Apple Account;
// without an Apple Music subscription, Apple plays 30-second previews.
const APPLE_MUSIC_ON=MM_CONFIG.appleMusic===true;
const AM_ID=/^\d{1,15}$/;
let amMusic=null, amLoading=null, amActive=false, amQueue=null;
function isAppleConnected(){ return APPLE_MUSIC_ON && gs('appleMusicLinked',false)===true; }
function amLoad(){
  if(amMusic) return Promise.resolve(amMusic);
  if(amLoading) return amLoading;
  amLoading=(async()=>{
    const d=await mmApi('musickit');
    if(typeof d?.token!=='string'||!/^[\w-]+\.[\w-]+\.[\w-]+$/.test(d.token)) throw new Error('Apple Music isn’t set up on this site.');
    if(!window.MusicKit?.configure){
      await new Promise((res,rej)=>{
        document.addEventListener('musickitloaded',res,{once:true});
        const s=document.createElement('script'); s.src='https://js-cdn.music.apple.com/musickit/v3/musickit.js'; s.async=true;
        s.onerror=()=>rej(new Error('Apple Music could not load. Check your connection.'));
        document.head.appendChild(s);
      });
    }
    const m=await MusicKit.configure({developerToken:d.token, app:{name:'MusicMap', build:MM_VERSION}});
    m.addEventListener('nowPlayingItemDidChange',amOnItem);
    m.addEventListener('playbackStateDidChange',amOnState);
    amMusic=m; return m;
  })().finally(()=>{ amLoading=null; });
  return amLoading;
}
function amStorefront(){ const s=String(amMusic?.storefrontId||''); return /^[a-z]{2}$/.test(s)?s:'us'; }
async function amApi(path,params){ const m=await amLoad(); const r=await m.api.music(path,params); return r?.data; }
async function appleConnect(){
  const msg=document.getElementById('amMsg'); if(msg) msg.textContent='';
  try{
    if(!amMusic){
      // the sign-in window must open straight from a tap: load first, then ask for one more tap
      busyText(msg,'Loading Apple Music…');
      await amLoad();
      if(msg) msg.textContent='Ready. Tap Connect again to sign in.';
      return;
    }
    await amMusic.authorize();
    if(!amMusic.isAuthorized) return;
    ss('appleMusicLinked',true);
    if(msg) msg.textContent='';
    renderConnectionsUI(); if(appMode==='local'&&chanItems.length) renderChanList();
    spotifyShowSnack('Apple Music connected');
  }catch(e){ if(msg) msg.textContent=e?.message||'Apple Music sign-in didn’t finish. Try again.'; }
}
async function appleDisconnect(){
  if(amActive) stopChanPlayback();
  try{ await amMusic?.unauthorize(); }catch(e){}
  ss('appleMusicLinked',false); chanWantVia=null;
  renderConnectionsUI(); if(appMode==='local'&&chanItems.length) renderChanList();
  spotifyShowSnack('Apple Music disconnected');
}
// A chart song already carries its Apple Music id; anything else is looked up in your storefront
async function amFindSong(it){
  if(AM_ID.test(String(it.am||''))) return String(it.am);
  const d=await amApi('/v1/catalog/{{storefrontId}}/search',{term:(it.title+' '+it.artist).slice(0,200),types:'songs',limit:1});
  const id=d?.results?.songs?.data?.[0]?.id; return AM_ID.test(id||'')?id:'';
}
async function chanPlayApple(it,playTok){
  const cant=m=>Object.assign(new Error(m),{code:'cant_play'});
  if(!isAppleConnected()) throw cant('Connect Apple Music in Settings first.');
  let m; try{ m=await amLoad(); }catch(e){ throw cant(e.message); }
  if(!m.isAuthorized){ ss('appleMusicLinked',false); renderConnectionsUI(); throw cant('Your Apple Music sign-in ended. Reconnect in Settings.'); }
  let queue=[];
  try{
    if(it.kind==='artist'){
      // Homegrown: the artist's best-known songs, shuffled
      const d=await amApi('/v1/catalog/{{storefrontId}}/search',{term:it.name.slice(0,200),types:'artists',limit:1});
      const aid=d?.results?.artists?.data?.[0]?.id;
      if(AM_ID.test(aid||'')){
        const t=await amApi('/v1/catalog/{{storefrontId}}/artists/'+aid+'/view/top-songs',{limit:10});
        const ids=(t?.data||[]).map(s=>s.id).filter(id=>AM_ID.test(id||''));
        for(let k=ids.length-1;k>0;k--){ const j=Math.floor(Math.random()*(k+1)); [ids[k],ids[j]]=[ids[j],ids[k]]; }
        queue=ids.map(id=>({idx:chanIdx,id}));
        it._am='https://music.apple.com/'+amStorefront()+'/artist/'+aid;
      }
    } else {
      // this song, then the rest of the list, so Apple Music carries on by itself with the screen off
      const first=await amFindSong(it);
      if(first){
        queue=[{idx:chanIdx,id:first}];
        for(let k=1,j=chanIdx;k<chanItems.length&&queue.length<25;k++){
          j=chanNextIdx(j); const x=chanItems[j];
          if(x.kind==='song'&&AM_ID.test(String(x.am||''))) queue.push({idx:j,id:String(x.am)});
        }
        it._am='https://music.apple.com/'+amStorefront()+'/song/'+first;
      }
    }
  }catch(e){ throw cant('Apple Music didn’t answer. Try again in a moment.'); }
  if(playTok!==chanPlayToken) return;
  if(!queue.length) throw Object.assign(new Error('Not found on Apple Music.'),{code:'not_found'});
  amQueue={token:playTok, items:queue}; amActive=true;
  try{ await m.setQueue({songs:queue.map(q=>q.id), startPlaying:true}); }
  catch(e){ amActive=false; amQueue=null; throw cant('Apple Music couldn’t play this.'); }
  if(playTok!==chanPlayToken) return;
  chanPlaying=true; setPlayIcon(true); document.getElementById('playingBars').style.display='flex';
  startChanProgress();
}
// Apple Music moved on to the next song in its queue (screen may be off): follow it
function amOnItem(){
  if(!amActive||!amQueue||amQueue.token!==chanPlayToken) return;
  const id=String(amMusic?.nowPlayingItem?.id||''); const q=amQueue.items.find(x=>x.id===id);
  if(q&&q.idx===chanIdx) showArtistSong(amMusic.nowPlayingItem?.title||amMusic.nowPlayingItem?.attributes?.name);
  if(!q||q.idx===chanIdx) return;
  chanIdx=q.idx; chanSkips=0; dismissStickyToast();
  const it=chanItems[chanIdx]; if(!it) return;
  if(it.kind==='song') it._am='https://music.apple.com/'+amStorefront()+'/song/'+id;
  const at=chanOrder.indexOf(chanIdx); if(at>=0) chanOrderPos=at;
  renderChanList(); setChanNowPlaying(it,null,null,'apple'); setChanMediaSession(it);
}
function amOnState(){
  if(!amActive||!amMusic||!window.MusicKit) return;
  const S=MusicKit.PlaybackStates, st=amMusic.playbackState;
  const was=chanPlaying;
  if(st===S.playing) chanPlaying=true;
  else if(st===S.paused||st===S.stopped) chanPlaying=false;
  else if(st===S.completed||st===S.ended){
    chanPlaying=false;
    // the end of what we handed Apple Music: carry on down the list
    if(st===S.completed&&amQueue?.token===chanPlayToken) return chanStep(1);
  } else return;
  setPlayIcon(chanPlaying); document.getElementById('playingBars').style.display=chanPlaying?'flex':'none';
  if(was!==chanPlaying) renderChanList();
}

// ── Connections (Settings): Spotify, Apple Music, and which one plays songs ──
// Preferred service for songs. Unset: the first service you connected, else YouTube.
function preferredPlatform(){
  const p=gs('preferredPlatform',null);
  if(p==='spotify'&&isSpotifyConnected()) return 'spotify';
  if(p==='apple'&&isAppleConnected()) return 'apple';
  if(p) return 'youtube';
  return isSpotifyConnected()?'spotify':isAppleConnected()?'apple':'youtube';
}
function altPlatforms(){
  const pref=preferredPlatform();
  return ['spotify','apple','youtube'].filter(p=>p!==pref&&(p==='youtube'||(p==='spotify'?isSpotifyConnected():isAppleConnected())));
}
function setPreferredPlatform(v){
  if(!['youtube','spotify','apple'].includes(v)) return;
  ss('preferredPlatform',v); chanWantVia=null;
  if(appMode==='local'&&chanItems.length) renderChanList();
  renderConnectionsUI();
}
let spDeviceList=[];
async function loadSpotifyDevices(announce){
  const btn=document.querySelector('#spotifyDeviceRow button'); btn?.setAttribute('aria-busy','true');
  try{ await loadSpotifyDevicesNow(announce); } finally { btn?.setAttribute('aria-busy','false'); }
}
async function loadSpotifyDevicesNow(announce){
  const token=await getValidSpotifyToken(); if(!token) return;
  try{
    const r=await fetch('https://api.spotify.com/v1/me/player/devices',{headers:{'Authorization':'Bearer '+token}});
    if(!r.ok) throw new Error();
    const d=await r.json();
    spDeviceList=(d.devices||[]).filter(x=>x&&typeof x.id==='string'&&/^[A-Za-z0-9_-]{1,64}$/.test(x.id)&&!x.is_restricted&&x.id!==spotifyDeviceId&&x.name!=='MusicMap') // other MusicMap tabs' players: same name, confusing
      .map(x=>({id:x.id, name:String(x.name||'Spotify').slice(0,60), type:String(x.type||'').slice(0,20)}));
    if(announce) spotifyShowSnack(spDeviceList.length?'Found '+spDeviceList.length+' Spotify app'+(spDeviceList.length>1?'s':''):'No Spotify apps found. Open Spotify on your phone, then try again.');
  }catch(e){ if(announce) spotifyShowSnack('Couldn’t list your Spotify apps right now.'); }
  renderConnectionsUI();
}
async function setSpotifyDevice(id){
  let d=null;
  if(id){
    d=spDeviceList.find(x=>x.id===id)||(spRemoteDevice()?.id===id?spRemoteDevice():null);
    if(!d) return;
  } else if(!spotifyReady){ spotifyShowSnack(spotifyWhyNot()); renderConnectionsUI(); return; }
  ss('spotifyDevice',d?{id:d.id,name:d.name}:null);
  spRemoteLast=null;
  renderConnectionsUI();
  if(!spotifyActive){ spotifyShowSnack(d?'Spotify will play on '+d.name+'. Keep the Spotify app open there.':'Spotify will play in this browser.'); return; }
  // something is playing: hand it over (same song, same spot), like Spotify's own device picker
  const token=await getValidSpotifyToken(); const target=d?d.id:spotifyDeviceId;
  try{
    const r=await fetch('https://api.spotify.com/v1/me/player',{method:'PUT',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify({device_ids:[target],play:true})});
    if(r.ok||r.status===204){ spotifyShowSnack('Now playing on '+(d?d.name:'this browser')); if(d) pollSpotifyRemote(); return; }
  }catch(e){}
  spotifyShowSnack('Couldn’t move playback to '+(d?d.name:'this browser')+'. '+(d?'Open Spotify there and try again.':''));
}
// ── Cast button in the player (Spotify connected only) ──
function renderCastBtn(){
  const wrap=document.getElementById('castWrap'); if(!wrap) return;
  wrap.hidden=!isSpotifyConnected();
  const rd=spRemoteDevice(), btn=document.getElementById('castBtn');
  btn.classList.toggle('remote',!!rd);
  document.getElementById('castName').textContent=rd?rd.name:'';
  btn.title=rd?'Spotify plays on '+rd.name+' (tap to change)':'Play Spotify on another device';
  btn.setAttribute('aria-label',btn.title);
}
async function toggleCastMenu(force){
  const menu=document.getElementById('castMenu'), btn=document.getElementById('castBtn');
  const open=force!==undefined?force:menu.hidden;
  menu.hidden=!open; btn.setAttribute('aria-expanded',open);
  if(!open) return;
  renderCastMenu(true);
  await loadSpotifyDevices(false);
  if(!menu.hidden) renderCastMenu(false);
}
function renderCastMenu(loading){
  const menu=document.getElementById('castMenu'); if(!menu) return;
  const cur=spRemoteDevice()?.id||'';
  menu.innerHTML='';
  const t=document.createElement('div'); t.className='cast-title'; t.textContent='Play Spotify on'; menu.append(t);
  const opts=[{id:'',name:'This browser'}].concat(spDeviceList.map(d=>({id:d.id,name:d.name+(d.type?' · '+d.type:'')})));
  if(cur&&!opts.some(o=>o.id===cur)) opts.push({id:cur,name:spRemoteDevice().name});
  opts.forEach(o=>{
    const b=document.createElement('button'); b.type='button'; b.setAttribute('role','menuitemradio'); b.setAttribute('aria-checked',o.id===cur);
    b.innerHTML=o.id===cur?'<span aria-hidden="true">✓</span>':'<span aria-hidden="true" style="width:.8em"></span>';
    const name=document.createElement('span'); name.textContent=o.name; b.append(name);
    b.onclick=()=>{ toggleCastMenu(false); if(o.id!==cur) setSpotifyDevice(o.id); };
    menu.append(b);
  });
  const note=document.createElement('div'); note.className='cast-note';
  if(loading) busyText(note,'Finding your Spotify apps…');
  else note.textContent=spDeviceList.length?'On a phone, pick its Spotify app to keep playing with the screen off.':'No other Spotify apps found. Open Spotify on another device, then tap the cast button again.';
  menu.append(note);
}
document.addEventListener('click',e=>{ const w=document.getElementById('castWrap'); if(w&&!w.contains(e.target)&&!document.getElementById('castMenu')?.hidden) toggleCastMenu(false); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&!document.getElementById('castMenu')?.hidden){ toggleCastMenu(false); document.getElementById('castBtn')?.focus(); } });
function renderConnectionsUI(){
  updateSpotifySettingsUI(); renderCastBtn();
  const logoSp=document.getElementById('connLogoSpotify'); if(logoSp&&!logoSp.innerHTML) logoSp.innerHTML=SOURCE_ICONS.spotify;
  const logoAm=document.getElementById('connLogoApple'); if(logoAm&&!logoAm.innerHTML) logoAm.innerHTML=SOURCE_ICONS.apple;
  const logoSc=document.getElementById('connLogoSoundcloud'); if(logoSc&&!logoSc.innerHTML) logoSc.innerHTML=SOURCE_ICONS.soundcloud;
  // where Spotify plays
  const row=document.getElementById('spotifyDeviceRow'), hint=document.getElementById('spotifyDeviceHint'), sel=document.getElementById('spotifyDeviceSelect');
  const spOn=isSpotifyConnected();
  if(row) row.hidden=!spOn; if(hint) hint.hidden=!spOn;
  if(sel&&spOn){
    const cur=spRemoteDevice();
    const opts=[{id:'',name:'This browser'}].concat(spDeviceList.map(d=>({id:d.id,name:d.name+(d.type?' ('+d.type+')':'')})));
    if(cur&&!opts.some(o=>o.id===cur.id)) opts.push({id:cur.id,name:cur.name});
    sel.innerHTML='';
    opts.forEach(o=>{ const op=document.createElement('option'); op.value=o.id; op.textContent=o.name; sel.append(op); });
    sel.value=cur?cur.id:'';
  }
  // Apple Music
  const amStatus=document.getElementById('amStatus'), amBtn=document.getElementById('amConnectBtn');
  if(amStatus&&amBtn){
    if(!APPLE_MUSIC_ON){ amStatus.innerHTML='<span style="color:var(--muted)">● Not available on this site yet</span>'; amBtn.hidden=true; }
    else if(isAppleConnected()){ amStatus.innerHTML='<span style="color:var(--green)">● Connected</span>'; amBtn.hidden=false; amBtn.textContent='Disconnect'; amBtn.onclick=appleDisconnect; }
    else { amStatus.innerHTML='<span style="color:var(--muted)">● Not connected</span>'; amBtn.hidden=false; amBtn.textContent='Connect'; amBtn.onclick=appleConnect; }
  }
  // preferred service
  const pref=document.getElementById('preferredPlatformSelect');
  if(pref){
    pref.innerHTML='';
    [['youtube',true],['spotify',isSpotifyConnected()],['apple',isAppleConnected()]].forEach(([p,ok])=>{
      if(p==='apple'&&!APPLE_MUSIC_ON) return;
      const op=document.createElement('option'); op.value=p; op.disabled=!ok;
      op.textContent=SOURCE_LABELS[p]+(ok?'':' (connect first)'); pref.append(op);
    });
    pref.value=preferredPlatform();
  }
}

// ── "Needs Spotify" pop-up ──
function openSpotifyNeeded(context){
  const title=document.getElementById('spotifyNeededTitle');
  const lead=document.getElementById('spotifyNeededLead');
  if(title) title.textContent=context==='link'?'SPOTIFY LINKS NEED SPOTIFY':'THIS PACK PLAYS FROM SPOTIFY';
  if(lead) lead.innerHTML=context==='link'
    ? 'Spotify songs only play with <b>Spotify Premium</b>, signed in with your own free <b>Spotify developer Client ID</b>. Sign in first, then add the link again.'
    : 'To play it you need <b>Spotify Premium</b> and to sign in with your own free <b>Spotify developer Client ID</b>.';
  document.getElementById('spotifyNeededOverlay')?.classList.add('open');
}
function closeSpotifyNeeded(e){
  if(e && e.target!==e.currentTarget) return; // clicks inside the box don't close it
  document.getElementById('spotifyNeededOverlay')?.classList.remove('open');
}
function goSetUpSpotify(){
  closeSpotifyNeeded();
  document.getElementById('makeImportOverlay')?.classList.remove('open');
  switchTab('settings');
  if(usingSharedSpotifyApp()) openSpotifyOwnApp();
  document.getElementById('spotifyOwnApp')?.scrollIntoView({block:'center',behavior:'smooth'});
}

// ── Spotify links in the Make a Pack box ──
// Development Mode still allows: playlists the signed-in user owns or collaborates on,
// any album, and single tracks (batch endpoints were removed in 2026).
const SPOTIFY_IMPORT_MAX=1000;
function parseSpotifyLink(raw){
  const m=String(raw||'').trim().match(/^(?:(?:https?:\/\/)?open\.spotify\.com\/(?:intl-[a-z-]+\/)?(playlist|album|track)\/|spotify:(playlist|album|track):)([A-Za-z0-9]{22})(?:[?#/].*)?$/);
  return m?{kind:m[1]||m[2], id:m[3]}:null;
}
async function spotifyApiGet(path, token){
  const r=await fetch('https://api.spotify.com/v1'+path,{headers:{'Authorization':'Bearer '+token}});
  if(!r.ok){ const e=new Error('HTTP '+r.status); e.status=r.status; throw e; }
  return r.json();
}
function spotifyToMmTrack(tr){
  if(!tr || tr.type!=='track' || tr.is_local || !/^spotify:track:[A-Za-z0-9]{22}$/.test(tr.uri||'')) return null;
  const artists=(tr.artists||[]).map(a=>a.name).filter(Boolean).join(', ');
  return {title:artists?tr.name+' — '+artists:tr.name, start:0, dur:Math.round((tr.duration_ms||0)/1000)||180, spotifyUri:tr.uri, videoId:null};
}
// Follow Spotify's own paging links, but only on api.spotify.com
function spotifyNextPath(next){
  const base='https://api.spotify.com/v1/';
  return next&&String(next).startsWith(base)?String(next).slice(base.length-1):null;
}
async function spotifyFetchLink(sp, token, progress){
  const tracks=[]; let title='', owner='', path=null;
  if(sp.kind==='track'){
    const tr=await spotifyApiGet('/tracks/'+sp.id,token);
    const t=spotifyToMmTrack(tr); if(t) tracks.push(t);
    return {title:tr.name||'Spotify track', owner:(tr.artists||[]).map(a=>a.name).join(', '), tracks};
  }
  if(sp.kind==='album'){
    const al=await spotifyApiGet('/albums/'+sp.id,token);
    title=al.name; owner=(al.artists||[]).map(a=>a.name).join(', ');
    path='/albums/'+sp.id+'/tracks?limit=50&offset=0';
  } else {
    const pl=await spotifyApiGet('/playlists/'+sp.id+'?fields=name,owner(display_name)',token);
    title=pl.name; owner=pl.owner?.display_name||'';
    path='/playlists/'+sp.id+'/items?limit=50&offset=0';
  }
  while(path && tracks.length<SPOTIFY_IMPORT_MAX){
    const page=await spotifyApiGet(path,token);
    for(const row of (page.items||[])){
      const t=spotifyToMmTrack(row.item||row.track||row); // playlists wrap tracks (item/track), albums don't
      if(t) tracks.push(t);
    }
    progress&&progress(tracks.length);
    path=spotifyNextPath(page.next);
  }
  return {title:title||'Spotify '+sp.kind, owner, tracks};
}
async function miAddSpotify(sp, raw){
  const status=document.getElementById('miUrlStatus');
  if(!isSpotifyConnected()){
    // Remember the link so it's waiting after Spotify sign-in sends the user back
    try{ sessionStorage.setItem('mm_pending_link',raw); }catch(e){}
    status.textContent='Spotify songs need Spotify Premium and a Spotify developer Client ID.';
    status.className='url-status warn';
    openSpotifyNeeded('link');
    return;
  }
  if(miVideos.find(v=>v.type==='spotify'&&v.spotifyId===sp.id)){ status.textContent='Already added'; return; }
  const token=await getValidSpotifyToken();
  if(!token){ status.textContent='Your Spotify sign-in expired. Reconnect in Settings.'; status.className='url-status err'; return; }
  busyText(status,'Reading Spotify '+sp.kind+'…'); status.className='url-status';
  try{
    const got=await spotifyFetchLink(sp,token,n=>{ busyText(status,'Reading Spotify '+sp.kind+'… '+n+' songs'); });
    if(!got.tracks.length){ status.textContent='No playable songs found in that link.'; status.className='url-status err'; return; }
    miVideos.push({type:'spotify', kind:sp.kind, spotifyId:sp.id, title:String(got.title).slice(0,80), owner:String(got.owner||'').slice(0,60), tracks:got.tracks});
    const nameEl=document.getElementById('miPackName');
    if(!nameEl.value.trim()) nameEl.value=String(got.title).slice(0,32);
    if(miSelectedEmoji==='🎵'){ miSelectedEmoji='🎧'; renderMiEmojiPicker(); }
    document.getElementById('miUrlInput').value='';
    status.textContent='✓ Added '+got.tracks.length+' song'+(got.tracks.length!==1?'s':'')+(got.tracks.length>=SPOTIFY_IMPORT_MAX?' (limit reached)':'');
    status.className='url-status ok';
    renderMiVideoList();
  }catch(e){
    status.className='url-status err';
    status.textContent = e.status===403 ? (sp.kind==='playlist'
        ? 'Spotify only shares playlists you own or collaborate on.'
        : 'Spotify refused this request for your account.')
      : e.status===404 ? 'Not found. It may be private or the link is wrong.'
      : e.status===401 ? 'Your Spotify sign-in expired. Reconnect in Settings.'
      : 'Could not read that Spotify link. Please try again.';
  }
}
// After Spotify sign-in, reopen Make a Pack with the link the user was adding
function resumePendingSpotifyLink(){
  let raw=null;
  try{ raw=sessionStorage.getItem('mm_pending_link'); sessionStorage.removeItem('mm_pending_link'); }catch(e){}
  if(!raw || !isSpotifyConnected() || !parseSpotifyLink(raw)) return;
  openMakeImportModal();
  document.getElementById('miUrlInput').value=raw;
  miOnUrlInput();
}

// Spotify tracks can go in a user's own Spotify pack (one service per pack; YouTube packs keep tracks per video)
function pickerCanAddSpotify(pack){
  if(!pack||pack.builtin||pack.videos?.length) return false;
  const src=packSources(pack);
  return src.length===1&&src[0]==='spotify';
}
// ── Picker tab switching ──
let pickerActiveTab='yt';
function switchPickerTab(tab){
  pickerActiveTab=tab;
  const ytPane=document.getElementById('pickerTabYtPane');
  const spPane=document.getElementById('pickerTabSpPane');
  const ytBtn=document.getElementById('pickerTabYt');
  const spBtn=document.getElementById('pickerTabSp');
  if(tab==='yt'){
    ytPane.style.display=''; spPane.style.display='none';
    ytBtn.style.background='rgba(124,58,237,.25)'; ytBtn.style.borderColor='rgba(124,58,237,.5)';
    spBtn.style.background=''; spBtn.style.borderColor='';
  } else {
    ytPane.style.display='none'; spPane.style.display='block';
    spBtn.style.background='rgba(30,180,90,.2)'; spBtn.style.borderColor='rgba(30,180,90,.5)';
    ytBtn.style.background=''; ytBtn.style.borderColor='';
    if(!isSpotifyConnected()){
      document.getElementById('spSearchStatus').textContent='Connect Spotify in Settings to search.';
    }
  }
}

// ── Spotify track search ──
async function doSpotifySearch(){
  const q=document.getElementById('spSearchInput').value.trim();
  if(!q) return;
  const statusEl=document.getElementById('spSearchStatus');
  const listEl=document.getElementById('spPickerList');
  if(!isSpotifyConnected()){ statusEl.textContent='Connect Spotify in Settings first.'; return; }
  busyText(statusEl,'Searching…'); listEl.innerHTML='';
  const token=await getValidSpotifyToken();
  if(!token){ statusEl.textContent='Token expired — please reconnect.'; return; }
  try{
    const resp=await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=10`,{
      headers:{'Authorization':'Bearer '+token}
    });
    const data=await resp.json();
    const items=data.tracks?.items||[];
    statusEl.textContent=items.length?items.length+' results':'No results.';
    renderSpotifyPickerResults(items);
  }catch(e){ statusEl.textContent='Search failed.'; }
}

function renderSpotifyPickerResults(items){
  const listEl=document.getElementById('spPickerList');
  listEl.innerHTML='';
  items.forEach(item=>{
    const dur=Math.round(item.duration_ms/1000);
    const artists=item.artists.map(a=>a.name).join(', ');
    const art=String(item.album?.images?.[2]?.url||'');
    const div=document.createElement('div');
    div.className='modal-track-item';
    div.style.cursor='pointer';
    div.innerHTML=`
      <span class="modal-track-add" style="color:var(--accent2)">＋</span>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:500;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(item.name)}</div>
        <div style="font-size:11px;color:var(--muted)">${esc(artists)} · ${fmt(dur)}</div>
      </div>
      ${SPOTIFY_ART_RE.test(art)?`<img src="${esc(art)}" alt="" style="width:36px;height:36px;border-radius:4px;object-fit:cover;flex-shrink:0">`:''}
    `;
    div.onclick=()=>addSpotifyTrackToPack(item,div);
    listEl.appendChild(div);
  });
}

async function addSpotifyTrackToPack(item,rowEl){
  const packId=getPackId();
  const pack=getActivePack();
  if(!pickerCanAddSpotify(pack)){ spotifyShowSnack('Spotify tracks can only be added to your own Spotify packs.'); return; }
  const dur=Math.round(item.duration_ms/1000);
  const artists=item.artists.map(a=>a.name).join(', ');
  const newTrack={ title:`${item.name} — ${artists}`, start:0, dur, spotifyUri:item.uri, videoId:null };
  const packs=getUserPacks();
  const pidx=packs.findIndex(p=>p.id===packId);
  if(pidx<0){ spotifyShowSnack('Could not find pack.'); return; }
  if(!packs[pidx].tracks) packs[pidx].tracks=[];
  packs[pidx].tracks.push(newTrack);
  saveUserPacks(packs);
  const globalIdx=packs[pidx].tracks.length-1;
  const cur=getLocTracks(packId,pickerTargetLocId);
  if(!cur.includes(globalIdx)){
    const ov=gs(packKey(packId,'locTracks'),{});
    ov[pickerTargetLocId]=[...cur,globalIdx];
    ss(packKey(packId,'locTracks'),ov);
  }
  renderTrackList();
  rowEl.querySelector('.modal-track-add').textContent='✓';
  rowEl.querySelector('.modal-track-add').style.color='var(--green)';
  rowEl.style.background='rgba(74,222,128,.07)';
  spotifyShowSnack(`Added: ${item.name}`);
}

function spotifyShowSnack(msg){
  window.mmLogNote?.('Shown: '+msg);
  let snack=document.getElementById('spSnack');
  if(!snack){
    snack=document.createElement('div');
    snack.id='spSnack';
    snack.style.cssText='position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:rgba(10,10,24,.95);border:1px solid rgba(255,255,255,.15);border-radius:12px;padding:10px 18px;font-size:12px;color:#fff;z-index:9999;pointer-events:none;transition:opacity .3s;white-space:nowrap;backdrop-filter:blur(8px)';
    document.body.appendChild(snack);
  }
  snack.textContent=msg;
  snack.style.opacity='1';
  clearTimeout(snack._t);
  snack._t=setTimeout(()=>snack.style.opacity='0',3000);
}

// ═══════════════════════════════════════════
// LOCAL LISTENING MODE
// Channels for wherever the listening pin is. The pin is dragged on the map or follows
// live tracking. Built on web APIs that also work in Android/iOS WebViews (Capacitor):
// <audio>, Media Session, Geolocation, localStorage via gs/ss.
// ═══════════════════════════════════════════
let appMode=gs('appMode','packs')==='local'?'local':'packs';
let localPoint=null;      // {lat,lon,source:'pin'|'gps',place:{city,region,country,cc}}
let localChannel='radio';
let localStations=[], localIdx=-1, localPlaying=false, radioAudio=null;
let localLoadToken=0, localGeoTimer=null, lastNominatimAt=0, listenMarker=null;
const localPlaceCache={};

(function restoreLocalPoint(){
  const p=gs('localPoint',null);
  if(p&&Number.isFinite(p.lat)&&Number.isFinite(p.lon)&&Math.abs(p.lat)<=90&&Math.abs(p.lon)<=180) localPoint=p;
  const c=gs('localChannel','radio');
  localChannel=c==='genres'?'popular':['popular','made','radio'].includes(c)?c:'radio';
})();

const LOCAL_CHANNELS=[
  {id:'popular', label:'Popular'}, // top songs and genre mixes for the country (Genre Mixes was its own tab before v1.5)
  {id:'made',    label:'Homegrown'},
  {id:'radio',   label:'Radio'},
];
let chanOverview=false; // Popular's front page is showing (the list that's playing stays loaded behind it)
const CHART_TOP='__top'; // the "Top N" list inside Popular (the others are genre names)
const chartCountry=()=>localPoint?.place?.country||'this country';
function mixLabel(m){ return m.genre===CHART_TOP?'Top '+m.list.length+' in '+chartCountry():m.genre+' mix'; }
function mixTitle(m){ return (m.genre===CHART_TOP?'Top '+m.list.length:m.genre+' mix')+' · '+chartCountry(); }

function placeLabel(pl){ return pl?[pl.city,pl.region].filter(Boolean).join(', ')||pl.country||'':''; }

// ── Mode switching ──
function applyLogo(){
  const el=document.getElementById('mmLogo');
  if(el&&typeof MM_CONFIG.logoUrl==='string'&&/^https?:\/\//.test(MM_CONFIG.logoUrl)) el.src=MM_CONFIG.logoUrl.replace('-512.png','-192.png');
}
function applyModeUI(){
  updateDislikeBtn(); closeDislikeMenu();
  const root=document.getElementById('geovibes-app');
  if(root){ root.classList.toggle('mode-local',appMode==='local'); root.classList.toggle('mode-packs',appMode!=='local'); }
  [['modeBtnPacks','packs'],['modeBtnLocal','local']].forEach(([id,m])=>{
    const b=document.getElementById(id); if(!b) return;
    b.classList.toggle('active',appMode===m); b.setAttribute('aria-selected',appMode===m);
  });
  const tl=document.getElementById('tabLabelPlayer'); if(tl) tl.textContent=appMode==='local'?'Channels':'Biomes';
  syncVideoBtnForMode();
  renderCustomPins(); renderSavedMarkers(); renderMapLegend();
}
// The heart in the player: Saved (Local Listening) or favourites (Biome Beats)
const SAVE_BTN_HTML='<svg class="ic ic-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
function syncVideoBtnForMode(){ if(appMode==='local') updateSaveStationBtn(); else updateFavBtn(); }
function onHeartBtn(){ if(isLocalMode()) toggleSaveCurrentStation(); else toggleFavCurrent(); }
async function setAppMode(mode){
  mode=mode==='local'?'local':'packs';
  if(mode===appMode) return;
  appMode=mode; ss('appMode',mode);
  applyModeUI();
  const onPacksTab=document.getElementById('tab-packs')?.classList.contains('active')||document.getElementById('tab-saved')?.classList.contains('active');
  if(onPacksTab) switchTab(mode==='local'?'saved':'packs');
  if(mode==='local'){
    // stop pack playback (YouTube or Spotify) before radio takes over
    if(isPlaying){ isPlaying=false; await pauseTrack(); }
    stopPacksTicker(); packsSpQueue=null; stopSoundCloud();
    if(ytPlayer?.stopVideo) try{ ytPlayer.stopVideo(); }catch(e){}
    enterLocalMode(true);
  } else {
    stopRadio();
    stopChanPlayback();
    clearMediaSession();
    if(!isPlaying){ setPlayIcon(false); document.getElementById('playingBars').style.display='none'; } // radio/channel icons don't carry over
    document.querySelector('.hero-progress')?.classList.remove('live');
    renderListenPin();
    updateNowPlaying(); renderLocGrid(); renderTrackList();
  }
  relocateForMode(); // live location carries over: find your biome / move the listening pin to you
}
function enterLocalMode(fromSwitch){
  if(localAnnounced===null&&placeLabel(localPoint?.place)) localAnnounced=placeLabel(localPoint.place); // moves from here on get the pop-up
  // live location is on: listen from where you are (from the last fix right away; the next poll refines it)
  if(trackingActive&&lastLat!==null&&(!localPoint||localPoint.source!=='gps'||dist(localPoint.lat,localPoint.lon,lastLat,lastLon)>500)){
    setListenPoint(lastLat,lastLon,'gps',{force:true});
    setLocalNowPlaying(localChannel==='radio'?'Finding stations…':'Loading channel…','Local Listening · near you'); setPlayerBusy(true);
    return;
  }
  renderLocalHeader(); renderListenPin(); updateSaveSpotBtn();
  if(localPoint&&!localPoint.place){
    // e.g. opened from a shared link: fill in the place name (channels that need the country wait for it)
    const pt=localPoint;
    localGeocode(pt.lat,pt.lon).then(place=>{
      if(!place||localPoint!==pt||pt.place) return;
      pt.place=place; ss('localPoint',pt); renderLocalHeader(); renderMapLegend();
      if(localChannel==='made') document.getElementById('localListTitle').textContent='HOMEGROWN AROUND '+(place.city||'THE PIN').toUpperCase();
      if(localChannel==='radio') document.getElementById('localListTitle').textContent='STATIONS NEAR '+(place.city||'THE PIN').toUpperCase();
    });
  }
  if(localPoint){
    // never leave pack text in the player while the channel loads
    setLocalNowPlaying(localChannel==='radio'?'Finding stations…':'Loading channel…','Local Listening · '+(placeLabel(localPoint.place)||'near the pin')); setPlayerBusy(true);
    loadLocalChannel();
  }
  else {
    // no spot yet: your location if we have it, otherwise start in Tampa (move the pin any time)
    if(lastLat!==null) setListenPoint(lastLat,lastLon,trackingActive?'gps':'pin',{force:true});
    else {
      localPoint={lat:DEFAULT_SPOT.latlng[0], lon:DEFAULT_SPOT.latlng[1], source:'pin', place:{...DEFAULT_SPOT.place}};
      ss('localPoint',localPoint);
      renderLocalHeader(); renderListenPin(); updateSaveSpotBtn();
      setLocalNowPlaying(localChannel==='radio'?'Finding stations…':'Loading channel…','Local Listening · '+placeLabel(localPoint.place)); setPlayerBusy(true);
      loadLocalChannel();
    }
  }
}

// ── Listening pin ──
function setListenPoint(lat,lon,source,opts){
  if(!Number.isFinite(lat)||!Number.isFinite(lon)) return;
  const prev=localPoint;
  const moved=prev?dist(prev.lat,prev.lon,lat,lon):Infinity;
  localPoint={lat:+lat.toFixed(5), lon:+lon.toFixed(5), source:source==='gps'?'gps':'pin', place:moved<1500?prev.place:null};
  ss('localPoint',localPoint);
  renderListenPin(); renderLocalHeader(); updateSaveSpotBtn();
  if(appMode==='local'&&(opts?.force||!localListAt||dist(localListAt.lat,localListAt.lon,localPoint.lat,localPoint.lon)>2000)) renderLocalLoading(localChannel==='radio'?'Finding stations near the new spot…':'Moving to the new spot…');
  clearTimeout(localGeoTimer);
  // wait for the pin to settle before looking anything up (Nominatim allows ~1 request/second)
  localGeoTimer=setTimeout(async()=>{
    const pt=localPoint;
    if(!pt.place) pt.place=await localGeocode(pt.lat,pt.lon);
    if(localPoint!==pt) return;
    ss('localPoint',pt); renderLocalHeader();
    // a new town or city (not just a few streets on): live location pings as soon as it notices
    const label=placeLabel(pt.place);
    const newPlace=appMode==='local'&&!!label&&localAnnounced!==null&&label!==localAnnounced;
    if(newPlace&&source==='gps') chime('notice');
    // channels only need refreshing when the pin is really somewhere else than the lists are for
    // (measured from where they were loaded, so a quick second reading can't cancel a real move)
    const far=!localListAt||dist(localListAt.lat,localListAt.lon,pt.lat,pt.lon)>2000;
    if(appMode==='local' && (far || !localStations.length || opts?.force)){
      await loadLocalChannel(opts);
      if(appMode!=='local'||!localPoint?.place) return;
      // the lists now match the new place: the same pop-up as a biome change (and a chime for live location)
      const now=placeLabel(localPoint.place);
      if(newPlace&&now===label) announceLocalPlace(source==='gps', !opts?.switchNow&&(chanPlaying||localPlaying));
      if(!opts?.switchNow) setPlayerBusy(false); // a pin you moved: done processing (a new song clears it itself)
      if(now) localAnnounced=now;
    } else if(label&&localAnnounced===null) localAnnounced=label;
  },700);
}
let localAnnounced=null; // the place the channel lists were last announced for (set on the first load, no pop-up)
function announceLocalPlace(fromGps,sticky){
  const pl=localPoint?.place; if(!pl) return;
  const what=isSongList(localChannel)?'Your songs keep playing':localChannel==='radio'?(localStations.length?localStations.length+' radio stations nearby':'Local radio')
    :localChannel==='made'?(chanItems.length?chanItems.length+' artists from around here':'Homegrown')
    :'Popular in '+(pl.country||'this country');
  showBiomeToast(isSongList(localChannel)?'📍':localChannel==='radio'?'📻':localChannel==='made'?'🎤':'🔥', placeLabel(pl)||'New spot', what, '#a78bfa', true, !!sticky);
  if(fromGps) chime('switch');
}
function moveListenPinTo(lat,lon){
  if(trackingActive){ stopTracking(); spotifyShowSnack('Live tracking off. Listening from the pin.'); }
  const prev=localPoint?{...localPoint}:null;
  setPlayerBusy(true); // your input is being processed (cleared when the new spot plays or turns out empty)
  // switchNow: play the new spot straight away, or explain and put the pin back if nothing is there
  setListenPoint(lat,lon,'pin',{force:true, switchNow:true, prev});
}
function revertListenPoint(prev){
  if(!prev) return;
  localPoint=prev; ss('localPoint',prev);
  renderListenPin(); renderLocalHeader(); updateSaveSpotBtn();
}
function renderListenPin(fly){
  if(!leafletMap||typeof L==='undefined') return;
  if(appMode!=='local'||!localPoint){ if(listenMarker){ leafletMap.removeLayer(listenMarker); listenMarker=null; } return; }
  if(!listenMarker){
    const icon=L.divIcon({className:'',iconSize:[38,38],iconAnchor:[19,38],
      html:'<div class="mm-listen-marker"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg></div>'});
    listenMarker=L.marker([localPoint.lat,localPoint.lon],{icon,draggable:true,zIndexOffset:2000,keyboard:true,title:'Listening pin (drag to move)'}).addTo(leafletMap);
    listenMarker.on('dragend',()=>{ const ll=listenMarker.getLatLng(); moveListenPinTo(ll.lat,ll.lng); });
  } else listenMarker.setLatLng([localPoint.lat,localPoint.lon]);
  if(fly) leafletMap.flyTo([localPoint.lat,localPoint.lon],Math.max(leafletMap.getZoom(),10),{duration:1});
}
function openLocalPinOnMap(){
  switchTab('map');
  setTimeout(()=>{
    if(!localPoint){
      const c=leafletMap?.getCenter();
      if(lastLat!==null) setListenPoint(lastLat,lastLon,'pin',{force:true});
      else if(c) setListenPoint(c.lat,c.lng,'pin',{force:true});
    }
    renderListenPin(true);
    spotifyShowSnack('Drag the pin or tap the map to choose where to listen.');
  },120);
}

// ── Place names (OpenStreetMap Nominatim, cached, ≤1 request/second) ──
async function localGeocode(lat,lon){
  const key=lat.toFixed(2)+','+lon.toFixed(2);
  if(localPlaceCache[key]) return localPlaceCache[key];
  const wait=lastNominatimAt+1100-Date.now();
  if(wait>0) await new Promise(r=>setTimeout(r,wait));
  lastNominatimAt=Date.now();
  try{
    const r=await fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=10&addressdetails=1&accept-language=en&lat='+encodeURIComponent(lat)+'&lon='+encodeURIComponent(lon));
    if(!r.ok) return null;
    const a=(await r.json()).address||{};
    const place={
      city:String(a.city||a.town||a.village||a.municipality||a.county||'').slice(0,60),
      region:String(a.state||a.region||'').slice(0,60),
      country:String(a.country||'').slice(0,60),
      cc:/^[a-z]{2}$/i.test(a.country_code||'')?a.country_code.toLowerCase():''
    };
    localPlaceCache[key]=place;
    return place;
  }catch(e){ return null; }
}

// ── Header + channel chips ──
function renderLocalHeader(){
  const nameEl=document.getElementById('localPlaceName'), subEl=document.getElementById('localPlaceSub');
  if(!nameEl) return;
  const pl=localPoint?.place;
  if(localPoint&&!placeLabel(pl)) busyText(nameEl,'Finding place…');
  else nameEl.textContent=!localPoint?'Choose a spot':placeLabel(pl);
  if(locatingNow) busyText(subEl,'Finding you…');
  else subEl.textContent=!localPoint?'':
    [pl?.country||'', localPoint.source==='gps'?'Live tracking':'Pinned spot'].filter(Boolean).join(' · ');
  renderChannelTabs();
}
// Channel sub-menu at the top of the Channels tab
function renderChannelTabs(){
  const pl=localPoint?.place;
  const chips=document.getElementById('channelChips'); if(!chips) return;
  chips.innerHTML='';
  LOCAL_CHANNELS.forEach(ch=>{
    const b=document.createElement('button');
    b.type='button'; b.className='channel-tab'+(ch.id===localChannel?' active':'');
    b.setAttribute('role','tab'); b.setAttribute('aria-selected',ch.id===localChannel);
    // Popular is country-level: the list title says which country; the tooltip does too
    if(ch.id==='popular') b.title=pl?.country?'Popular in '+pl.country:'Popular in your country';
    b.append(ch.label);
    if(ch.soon){ const s=document.createElement('span'); s.className='soon'; s.textContent='SOON'; b.append(s); }
    b.onclick=()=>selectLocalChannel(ch.id);
    chips.appendChild(b);
  });
  chips.querySelector('.active')?.scrollIntoView({block:'nearest',inline:'nearest'});
  renderShuffleBtn();
}
function selectLocalChannel(id){
  if(!LOCAL_CHANNELS.some(c=>c.id===id)) return;
  localChannel=id; ss('localChannel',id);
  chanGenre=null;
  renderLocalHeader(); loadLocalChannel(id==='made'?{autoplay:true}:undefined); updateSaveStationBtn();
}

// ── Channel content ──
function renderLocalNote(html){
  const list=document.getElementById('localList'); if(!list) return;
  list.innerHTML='<div class="local-note">'+html+'</div>'; // only ever called with app-written text
  if(!chanPlaying&&!localPlaying) setPlayerBusy(false);
}
// The list is loading (new spot or channel): spinner, what we're doing, and placeholder rows
function renderLocalLoading(html){
  const list=document.getElementById('localList'); if(!list) return;
  list.innerHTML='<div class="local-note local-loading" role="status"><span class="mm-spinner" aria-hidden="true"></span><span>'+html+'</span></div>'
    +'<div class="skel-row" aria-hidden="true"></div>'.repeat(4); // only ever called with app-written text
  if(!chanPlaying&&!localPlaying) setPlayerBusy(true);
}
let localListAt=null; // where the channel lists were last loaded for
async function loadLocalChannel(opts){
  if(localPoint) localListAt={lat:localPoint.lat,lon:localPoint.lon};
  const title=document.getElementById('localListTitle');
  const pl=localPoint?.place;
  const where=esc(placeLabel(pl)||'this spot');
  const country=esc(pl?.country||'this country');
  if(localChannel!=='radio'){ return loadSongChannel(opts); }
  // Local Radio
  title.textContent='STATIONS NEAR '+(pl?.city||'THE PIN').toUpperCase();
  if(!localPoint){ renderLocalNote('Choose a spot first: tap <b>Move pin</b>.'); return; }
  const token=++localLoadToken;
  renderLocalLoading('Finding stations near <b>'+where+'</b>…');
  const stations=await fetchStationsNear(localPoint.lat,localPoint.lon);
  if(token!==localLoadToken) return; // the pin moved again meanwhile
  if(opts?.switchNow){
    if(!stations||!stations.length){
      // Nothing to switch to: say so, put the pin back, keep whatever was playing
      const nowName=localPlaying?localStations[localIdx]?.name:'';
      showLocalAlert(stations?'No radio here':'Can\u2019t reach the radio directory',
        (stations?'No radio stations found within '+fmtDist(200)+' of '+(placeLabel(pl)||'that spot')+'.':'Check your connection and try again.')
          +(nowName?' Still playing '+nowName+'.':''),
        [{label:'OK', primary:true}]);
      revertListenPoint(opts.prev); setPlayerBusy(false);
      title.textContent='STATIONS NEAR '+(localPoint?.place?.city||'THE PIN').toUpperCase();
      if(localStations.length) renderLocalList(); else renderLocalNote('Choose a spot with radio nearby: tap <b>Move pin</b>.');
      return;
    }
    localStations=stationsWithoutDisliked(stations); localIdx=-1; buildRadOrder();
    renderLocalList();
    playStation(radOrder[0]??0);
    return;
  }
  // Keep the selected station (playing or still buffering) when the list refreshes
  const current=localIdx>=0&&radioAudio?.getAttribute('src')?localStations[localIdx]:null;
  localStations=stationsWithoutDisliked(stations||[]);
  localIdx=current?localStations.findIndex(s=>s.uuid===current.uuid):-1;
  if(current&&localIdx<0){ localStations.unshift(current); localIdx=0; } // moved away: keep it listed while it plays
  buildRadOrder(); if(localIdx>=0) radOrderPos=Math.max(0,radOrder.indexOf(localIdx));
  if(stations===null){ renderLocalNote('Could not reach the radio directory. Check your connection and try again.'); return; }
  if(!localStations.length){ renderLocalNote('No stations found within '+fmtDist(200)+' of <b>'+where+'</b>. Try moving the pin.'); return; }
  renderLocalList();
  if(!localPlaying){ setLocalNowPlaying(localStations.length+' stations near '+(placeLabel(pl)||'the pin'),'Tap play or pick a station'); setPlayerBusy(false); }
  applyPendingShare();
  if(opts?.autoplay && !localPlaying) playStation(radOrder[0]??0);
}
function renderLocalList(){
  const list=document.getElementById('localList'); if(!list) return;
  list.innerHTML='';
  localStations.forEach((st,i)=>{
    const row=document.createElement('div'); row.className='local-row-wrap';
    const b=document.createElement('button');
    b.type='button'; b.className='local-item'+(i===localIdx?' active':'');
    const icon=document.createElement('span'); icon.className='local-item-ic'; icon.innerHTML=SOURCE_ICONS.radio;
    const main=document.createElement('span'); main.className='local-item-main';
    const name=document.createElement('span'); name.className='local-item-name'; name.style.display='block'; name.textContent=st.name;
    const sub=document.createElement('span'); sub.className='local-item-sub'; sub.style.display='block';
    sub.textContent=[st.km==null?'':fmtDist(st.km), st.tags].filter(Boolean).join(' · ');
    main.append(name,sub); b.append(icon,main);
    if(i===localIdx&&localPlaying){ const bars=document.createElement('span'); bars.className='playing-bars'; bars.innerHTML='<span></span><span></span><span></span>'; b.append(bars); }
    b.onclick=()=>playStation(i);
    row.append(b, shareButton({ch:'radio', st:st.uuid}, st.name), heartButton(st));
    list.appendChild(row);
  });
}

// ── Radio Browser (free, open, no key). Several community servers; try them in turn. ──
const RADIO_SERVERS=['de1','de2','fi1'];
const RADIO_UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const RADIO_SKIP=/\b(weather|noaa|police|scanner|fire ?dept|aviation|atc|traffic)\b/i;
let radioServer=null;
async function radioGet(path){
  const order=radioServer?[radioServer,...RADIO_SERVERS.filter(s=>s!==radioServer)]:RADIO_SERVERS.slice().sort(()=>Math.random()-.5);
  for(const s of order){
    const ctl=new AbortController(); const t=setTimeout(()=>ctl.abort(),8000);
    try{
      const r=await fetch('https://'+s+'.api.radio-browser.info'+path,{signal:ctl.signal});
      clearTimeout(t);
      if(r.ok){ radioServer=s; return await r.json(); }
    }catch(e){ clearTimeout(t); }
  }
  return null;
}
async function fetchStationsNear(lat,lon){
  let found=[];
  for(const radius of [50000,200000]){
    const rows=await radioGet('/json/stations/search?geo_lat='+lat.toFixed(4)+'&geo_long='+lon.toFixed(4)+'&geo_distance='+radius+'&hidebroken=true&is_https=true&order=clickcount&reverse=true&limit=80');
    if(rows===null) return null;
    found=cleanStations(rows,lat,lon);
    if(found.length>=6) break;
  }
  return found.slice(0,40);
}
// Directory data is user-submitted: keep only well-formed fields, HTTPS streams, no duplicates
function cleanStations(rows,lat,lon){
  const seen=new Set(), out=[];
  for(const r of (Array.isArray(rows)?rows:[])){
    const url=String(r.url_resolved||'');
    const name=String(r.name||'').replace(/\s+/g,' ').trim().slice(0,80);
    if(!RADIO_UUID.test(r.stationuuid||'') || !/^https:\/\//i.test(url) || !name) continue;
    if(RADIO_SKIP.test(name+' '+(r.tags||''))) continue;
    const k=name.toLowerCase(); if(seen.has(k)) continue; seen.add(k);
    const slat=Number(r.geo_lat), slon=Number(r.geo_long);
    const homepage=String(r.homepage||'');
    out.push({
      uuid:r.stationuuid, name, url,
      tags:String(r.tags||'').split(',').map(t=>t.trim()).filter(Boolean).slice(0,3).join(', ').slice(0,60),
      km:Number.isFinite(slat)&&Number.isFinite(slon)&&(slat||slon)?dist(lat,lon,slat,slon)/1000:null,
      homepage:/^https?:\/\//i.test(homepage)?homepage:'',
      favicon:/^https:\/\//i.test(r.favicon||'')?String(r.favicon):''
    });
  }
  return out;
}

// ── Radio playback: plain <audio>, so it keeps playing with the screen off ──
function ensureRadioAudio(){
  if(radioAudio) return radioAudio;
  radioAudio=new Audio(); radioAudio.preload='none';
  radioAudio.addEventListener('playing',()=>{ playedOk(); localPlaying=true; setPlayIcon(true); document.getElementById('playingBars').style.display='flex'; updateLocalSub(); renderLocalList(); });
  radioAudio.addEventListener('waiting',()=>{ updateLocalSub('Buffering…'); setPlayerBusy(true); });
  radioAudio.addEventListener('pause',()=>{ localPlaying=false; setPlayIcon(false); setPlayerBusy(false); document.getElementById('playingBars').style.display='none'; renderLocalList(); });
  radioAudio.addEventListener('error',()=>{
    if(!radioAudio.getAttribute('src')) return;
    localPlaying=false; setPlayIcon(false); setPlayerBusy(false); document.getElementById('playingBars').style.display='none';
    updateLocalSub('This station isn’t working right now. Try the next one.');
    renderLocalList();
  });
  return radioAudio;
}
function playStation(i){
  const st=localStations[i]; if(!st) return;
  stopChanPlayback(); dismissStickyToast();
  localIdx=i;
  const at=radOrder.indexOf(i); if(at>=0) radOrderPos=at; // keep the play order in step with taps
  const a=ensureRadioAudio();
  a.src=st.url;
  a.play().catch(()=>{ updateLocalSub('Tap play to start'); setPlayerBusy(false); });
  setLocalNowPlaying(st.name,'Local Radio · '+(placeLabel(localPoint?.place)||'near the pin'));
  setPlayerBusy(true); // until the stream starts
  const yb=document.getElementById('npYtBtn');
  yb.disabled=!st.homepage; yb.title='Station website'; yb.setAttribute('aria-label','Station website');
  yb.onclick=st.homepage?()=>window.open(st.homepage,'_blank','noopener'):null;
  setRadioMediaSession(st);
  renderLocalList(); updateSaveStationBtn();
  // Radio Browser asks apps to report plays (it also keeps its popularity ranking honest)
  if(radioServer) fetch('https://'+radioServer+'.api.radio-browser.info/json/url/'+st.uuid,{keepalive:true}).catch(()=>{});
}
function stopRadio(){
  if(!radioAudio) return;
  setPlayerBusy(false);
  radioAudio.pause(); radioAudio.removeAttribute('src'); radioAudio.load();
  localPlaying=false;
}
function localTogglePlay(){
  if(localChannel!=='radio'){ chanToggle(); return; }
  if(localPlaying){ radioAudio?.pause(); return; }
  if(localIdx>=0&&radioAudio?.getAttribute('src')){ radioAudio.play().catch(()=>{}); return; }
  if(localStations.length) playStation(Math.max(0,localIdx));
  else if(localPoint) loadLocalChannel({autoplay:true});
  else openLocalPinOnMap();
}
function localStep(dir){
  if(localChannel!=='radio'){ chanStep(dir); return; }
  if(!localStations.length) return;
  if(radOrder.length!==localStations.length) buildRadOrder();
  radOrderPos=((radOrderPos+(localIdx<0?0:dir))%radOrder.length+radOrder.length)%radOrder.length; // follows the shuffle when it's on
  playStation(radOrder[radOrderPos]);
}

// ── Now playing in Local Listening ──
function setLocalNowPlaying(title,sub){
  document.getElementById('npTrack').textContent=title;
  document.getElementById('npGame').textContent=sub||'';
  const src=document.getElementById('npSource'); src.innerHTML=SOURCE_ICONS.radio; src.title='Local radio';
  stopProgress();
  const prog=document.querySelector('.hero-progress'); prog.classList.add('live');
  document.getElementById('progressTime').textContent='● LIVE';
  document.getElementById('progressDur').textContent='';
  setPlayIcon(localPlaying);
  document.getElementById('playingBars').style.display=localPlaying?'flex':'none';
}
function updateLocalSub(msg){
  const st=localStations[localIdx];
  document.getElementById('npGame').textContent=msg||('Local Radio · '+(placeLabel(localPoint?.place)||'near the pin')+(st?.tags?' · '+st.tags:''));
}


// ── Saved (Local Listening favourites) ──
// Stored with gs/ss so it carries over to the native app. Re-validated on every read,
// since localStorage can be edited by hand or by an old version.
const SAVED_KEY='localSaved';
function validSavedStation(st){ return st&&RADIO_UUID.test(st.uuid||'')&&/^https:\/\//i.test(st.url||'')&&typeof st.name==='string'&&st.name; }
function validSavedSpot(sp){ return sp&&Number.isFinite(sp.lat)&&Number.isFinite(sp.lon)&&Math.abs(sp.lat)<=90&&Math.abs(sp.lon)<=180; }
function validSavedSong(s){ return s&&typeof s.title==='string'&&s.title&&typeof s.artist==='string'&&s.artist; }
// stored songs are re-checked on the way out: only known-good ids and art hosts are used
function cleanSavedSong(s){
  return {title:String(s.title).slice(0,160), artist:String(s.artist).slice(0,120),
    art:ART_OK.test(s.art||'')?s.art:'', am:AM_ID.test(String(s.am||''))?String(s.am):'',
    sp:/^spotify:track:[A-Za-z0-9]{22}$/.test(s.sp||'')?s.sp:'', yt:YT_ID.test(s.yt||'')?s.yt:'',
    where:String(s.where||'').slice(0,80),
    lat:Number.isFinite(s.lat)&&Math.abs(s.lat)<=90?+(+s.lat).toFixed(4):undefined,
    lon:Number.isFinite(s.lon)&&Math.abs(s.lon)<=180?+(+s.lon).toFixed(4):undefined};
}
function getSaved(){
  const d=gs(SAVED_KEY,{})||{};
  return {
    songs:(Array.isArray(d.songs)?d.songs:[]).filter(validSavedSong).map(cleanSavedSong),
    stations:(Array.isArray(d.stations)?d.stations:[]).filter(validSavedStation),
    spots:(Array.isArray(d.spots)?d.spots:[]).filter(validSavedSpot)
  };
}
const songKey=s=>(s.artist+'|'+s.title).toLowerCase();
function isSongSaved(s){ return !!s&&getSaved().songs.some(x=>songKey(x)===songKey(s)); }
// The song playing in a song channel, in the shape Saved keeps (Homegrown: once we know which song it is)
function currentSongForSave(){
  const it=chanItems[chanIdx]; if(!it) return null;
  const here={where:placeLabel(localPoint?.place), lat:localPoint?.lat, lon:localPoint?.lon};
  if(it.kind==='song') return cleanSavedSong({title:it.title, artist:it.artist, art:it.art, am:it.am,
    sp:/^spotify:track:/.test(it._sp||'')?it._sp:'', yt:it._yt?.id, ...here});
  if(it.kind==='artist'&&it._song) return cleanSavedSong({title:it._song, artist:it.name,
    yt:chanVia==='youtube'?ytPlayer?.getVideoData?.()?.video_id:'', ...here});
  return null;
}
function toggleSongSaved(s){
  if(!s) return;
  const d=getSaved(), had=d.songs.some(x=>songKey(x)===songKey(s));
  d.songs=had?d.songs.filter(x=>songKey(x)!==songKey(s)):[s,...d.songs].slice(0,300);
  putSaved(d);
  spotifyShowSnack(had?'Removed from Saved':'Saved: '+s.title+' — '+s.artist);
  updateSaveStationBtn();
  if(document.getElementById('tab-saved')?.classList.contains('active')) renderSavedList();
}
// Saved songs play as their own list in the Channels tab (not a channel tab of its own)
function playSavedSongs(start){
  const songs=getSaved().songs; if(!songs.length) return;
  localChannel='saved'; chanGenre=null; chanOverview=false; chanData=null; // not persisted: a reload goes back to the channel
  chanItems=songs.map(s=>({kind:'song',title:s.title,artist:s.artist,art:s.art,am:s.am,_sp:s.sp||undefined,_yt:s.yt?{id:s.yt}:undefined,where:s.where}));
  chanIdx=-1; buildChanOrder(); renderChannelTabs(); renderShuffleBtn();
  document.getElementById('localListTitle').textContent='SAVED SONGS';
  renderChanList(); switchTab('player');
  playChanItem(Number.isInteger(start)?start:(chanOrder[0]??0));
}
function putSaved(d){ ss(SAVED_KEY,d); renderSavedMarkers(); }
function isStationSaved(uuid){ return getSaved().stations.some(s=>s.uuid===uuid); }
function toggleStationSaved(st){
  if(!st) return;
  const d=getSaved();
  const had=d.stations.some(s=>s.uuid===st.uuid);
  d.stations=had?d.stations.filter(s=>s.uuid!==st.uuid)
    :[{uuid:st.uuid,name:String(st.name).slice(0,80),url:st.url,tags:String(st.tags||'').slice(0,60),homepage:st.homepage||'',favicon:st.favicon||'',where:placeLabel(localPoint?.place)||st.where||'',
       lat:localPoint?+localPoint.lat.toFixed(4):undefined, lon:localPoint?+localPoint.lon.toFixed(4):undefined},...d.stations];
  putSaved(d);
  spotifyShowSnack(had?'Removed from Saved':'Saved: '+st.name);
  renderLocalList(); updateSaveStationBtn();
  if(document.getElementById('tab-saved')?.classList.contains('active')) renderSavedList();
}
function toggleSaveCurrentStation(){
  if(localChannel!=='radio'){
    const s=currentSongForSave();
    if(!s){ spotifyShowSnack(chanItems[chanIdx]?.kind==='artist'?'Save works once the song name shows.':'Play a song first, then save it.'); return; }
    return toggleSongSaved(s);
  }
  const st=localStations[localIdx];
  if(!st){ spotifyShowSnack('Pick a station first, then save it.'); return; }
  toggleStationSaved(st);
}
function heartButton(st){
  const on=isStationSaved(st.uuid);
  const h=document.createElement('button');
  h.type='button'; h.className='heart-btn'+(on?' on':'');
  h.setAttribute('aria-pressed',on); h.setAttribute('aria-label',(on?'Remove ':'Save ')+st.name);
  h.innerHTML=SAVE_BTN_HTML;
  h.onclick=()=>toggleStationSaved(st);
  return h;
}
function updateSaveStationBtn(){
  updateDislikeBtn();
  const vb=document.getElementById('npHeartBtn');
  if(!vb||!isLocalMode()) return;
  if(localChannel!=='radio'){
    const s=currentSongForSave(), on=!!s&&isSongSaved(s);
    vb.disabled=!s; vb.classList.toggle('saved',on); vb.setAttribute('aria-pressed',on);
    const label=!s?'Save song':(on?'Remove song from Saved':'Save song to Saved');
    vb.setAttribute('aria-label',label); vb.title=label;
    return;
  }
  const st=localStations[localIdx];
  const on=!!st&&isStationSaved(st.uuid);
  vb.disabled=!st;
  vb.classList.toggle('saved',on);
  vb.setAttribute('aria-pressed',on);
  const label=!st?'Save station':(on?'Remove station from Saved':'Save station');
  vb.setAttribute('aria-label',label); vb.title=label;
}
function nearbySavedSpot(){
  if(!localPoint) return null;
  return getSaved().spots.find(sp=>dist(sp.lat,sp.lon,localPoint.lat,localPoint.lon)<300)||null;
}
function toggleSaveSpot(){
  if(!localPoint){ openLocalPinOnMap(); return; }
  const d=getSaved(), near=nearbySavedSpot();
  if(near){ d.spots=d.spots.filter(sp=>sp!==near&&!(sp.lat===near.lat&&sp.lon===near.lon)); spotifyShowSnack('Spot removed'); }
  else {
    d.spots=[{lat:localPoint.lat,lon:localPoint.lon,place:localPoint.place||null,channel:localChannel},...d.spots].slice(0,50);
    spotifyShowSnack('Saved spot: '+(placeLabel(localPoint.place)||'this pin'));
  }
  putSaved(d); updateSaveSpotBtn();
  if(document.getElementById('tab-saved')?.classList.contains('active')) renderSavedList();
}
function updateSaveSpotBtn(){
  const b=document.getElementById('saveSpotBtn'); if(!b) return;
  const on=!!nearbySavedSpot();
  b.classList.toggle('on',on); b.setAttribute('aria-pressed',on);
  b.querySelector('span').textContent=on?'Saved spot':'Save spot';
}
function renderSavedList(){
  const d=getSaved();
  const stEl=document.getElementById('savedStations'), spEl=document.getElementById('savedSpots'), soEl=document.getElementById('savedSongs');
  if(!stEl||!spEl) return;
  stEl.innerHTML=''; spEl.innerHTML='';
  if(soEl){
    soEl.innerHTML='';
    if(!d.songs.length) soEl.innerHTML='<div class="local-note">No saved songs yet. While a song plays, tap the heart in the player.</div>';
    const nowKey=localChannel!=='radio'&&chanPlaying&&chanItems[chanIdx]?songKey(currentSongForSave()||{title:'',artist:''}):'';
    d.songs.forEach((s,i)=>{
      const row=document.createElement('div'); row.className='local-row-wrap';
      const b=document.createElement('button'); b.type='button'; b.className='local-item'+(nowKey===songKey(s)?' active':'');
      if(s.art){ const img=document.createElement('img'); img.className='local-item-art'; img.alt=''; img.loading='lazy'; img.referrerPolicy='no-referrer'; img.src=s.art; b.append(img); }
      else { const icon=document.createElement('span'); icon.className='local-item-ic'; icon.textContent='♪'; b.append(icon); }
      const main=document.createElement('span'); main.className='local-item-main';
      const name=document.createElement('span'); name.className='local-item-name'; name.style.display='block'; name.textContent=s.title;
      const sub=document.createElement('span'); sub.className='local-item-sub'; sub.style.display='block';
      sub.textContent=[s.artist,s.where].filter(Boolean).join(' · ');
      main.append(name,sub); b.append(main);
      b.onclick=()=>playSavedSongs(i);
      const del=document.createElement('button'); del.type='button'; del.className='heart-btn on';
      del.setAttribute('aria-pressed','true'); del.setAttribute('aria-label','Remove '+s.title+' from Saved'); del.innerHTML=SAVE_BTN_HTML;
      del.onclick=()=>toggleSongSaved(s);
      row.append(b, shareButton(songShareParams(s), s.title+' — '+s.artist), del); soEl.appendChild(row);
    });
  }
  if(!d.stations.length) stEl.innerHTML='<div class="local-note">No saved stations yet. Tap the heart next to a station, or the heart in the player.</div>';
  d.stations.forEach(st=>{
    const row=document.createElement('div'); row.className='local-row-wrap';
    const b=document.createElement('button'); b.type='button';
    const playingThis=localPlaying&&localStations[localIdx]?.uuid===st.uuid;
    b.className='local-item'+(playingThis?' active':'');
    const icon=document.createElement('span'); icon.className='local-item-ic'; icon.innerHTML=SOURCE_ICONS.radio;
    const main=document.createElement('span'); main.className='local-item-main';
    const name=document.createElement('span'); name.className='local-item-name'; name.style.display='block'; name.textContent=st.name;
    const sub=document.createElement('span'); sub.className='local-item-sub'; sub.style.display='block';
    sub.textContent=[st.where,st.tags].filter(Boolean).join(' · ');
    main.append(name,sub); b.append(icon,main);
    b.onclick=()=>playSavedStation(st);
    const geo=Number.isFinite(st.lat)&&Number.isFinite(st.lon)&&Math.abs(st.lat)<=90&&Math.abs(st.lon)<=180;
    row.append(b, shareButton({ch:'radio', st:st.uuid, lat:geo?st.lat:undefined, lon:geo?st.lon:undefined, where:st.where}, st.name), heartButton(st));
    stEl.appendChild(row);
  });
  if(!d.spots.length) spEl.innerHTML='<div class="local-note">No saved spots yet. Move the pin somewhere you like and tap <b>Save spot</b>.</div>';
  d.spots.forEach(sp=>{
    const row=document.createElement('div'); row.className='local-row-wrap';
    const b=document.createElement('button'); b.type='button'; b.className='local-item';
    const icon=document.createElement('span'); icon.className='local-item-ic';
    icon.innerHTML='<svg class="ic ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z"/><circle cx="12" cy="9" r="2.5"/></svg>';
    const main=document.createElement('span'); main.className='local-item-main';
    const name=document.createElement('span'); name.className='local-item-name'; name.style.display='block';
    name.textContent=placeLabel(sp.place)||(sp.lat.toFixed(3)+', '+sp.lon.toFixed(3));
    const sub=document.createElement('span'); sub.className='local-item-sub'; sub.style.display='block';
    sub.textContent=[sp.place?.country, (LOCAL_CHANNELS.find(c=>c.id===sp.channel)||{}).label].filter(Boolean).join(' · ');
    main.append(name,sub); b.append(icon,main);
    b.onclick=()=>goToSavedSpot(sp);
    const del=document.createElement('button'); del.type='button'; del.className='heart-btn on';
    del.setAttribute('aria-label','Remove saved spot '+name.textContent);
    del.innerHTML='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>';
    del.onclick=()=>{ const dd=getSaved(); dd.spots=dd.spots.filter(x=>!(x.lat===sp.lat&&x.lon===sp.lon)); putSaved(dd); renderSavedList(); updateSaveSpotBtn(); };
    const spCh=['popular','made','radio'].includes(sp.channel)?sp.channel:sp.channel==='genres'?'popular':'radio';
    row.append(b, shareButton({ch:spCh, lat:sp.lat, lon:sp.lon, place:sp.place||null, spot:true}, name.textContent), del);
    spEl.appendChild(row);
  });
}
function playSavedStation(st){
  if(!validSavedStation(st)) return;
  if(localChannel!=='radio'){ localChannel='radio'; ss('localChannel','radio'); renderLocalHeader(); }
  let i=localStations.findIndex(s=>s.uuid===st.uuid);
  if(i<0){ localStations.unshift({...st,km:null}); i=0; }
  playStation(i);
}
function goToSavedSpot(sp){
  if(trackingActive) stopTracking();
  if(['popular','made','genres','radio'].includes(sp.channel)){ localChannel=sp.channel==='genres'?'popular':sp.channel; ss('localChannel',localChannel); }
  setPlayerBusy(true); // your input is being processed
  setListenPoint(sp.lat,sp.lon,'pin',{force:true});
  if(sp.place&&localPoint){ localPoint.place=sp.place; ss('localPoint',localPoint); }
  renderLocalHeader(); updateSaveSpotBtn();
  switchTab('player');
}


// ── Credits & sources ──
// Static list (no user data). Logos load from each project's own site, only when Settings is opened,
// without a referrer; a letter badge shows if a logo can't load.
const CREDITS=[
  // one entry for everything from OpenStreetMap (its data, plus the Nominatim and Overpass services built on it)
  {name:'OpenStreetMap', role:'Map tiles and data, place names (Nominatim) and the nearby map features that pick your biome (Overpass API). © OpenStreetMap contributors', lic:'ODbL', url:'https://www.openstreetmap.org/copyright', icon:'https://www.openstreetmap.org/favicon.ico'},
  {name:'Leaflet', role:'The interactive map', lic:'BSD-2', url:'https://leafletjs.com', icon:'https://leafletjs.com/docs/images/favicon.ico'},
  {name:'YouTube', role:'Plays game soundtracks and channel songs (IFrame Player API, oEmbed, Data API search)', url:'https://www.youtube.com', icon:'https://www.youtube.com/favicon.ico'},
  {name:'Apple Music charts', role:'Most-played songs per country for Popular (top songs and genre mixes)', url:'https://rss.marketingtools.apple.com', icon:'https://www.apple.com/favicon.ico'},
  {name:'Wikidata', role:'Artists born or formed near the pin, for Homegrown', lic:'CC0', url:'https://www.wikidata.org', icon:'https://www.wikidata.org/static/favicon/wikidata.ico'},
  {name:'Wikimedia Commons', role:'Artist photos in Homegrown (each photo has its own free licence and author on Commons)', lic:'CC BY-SA & more', url:'https://commons.wikimedia.org', icon:'https://commons.wikimedia.org/static/favicon/commons.ico'},
  {name:'Spotify', role:'Spotify playback, search and playlist import (Web Playback SDK, Web API)', url:'https://developer.spotify.com', icon:'https://open.spotify.com/favicon.ico'},
  {name:'SoundCloud', role:'SoundCloud tracks in custom packs (embedded player / Widget API)', url:'https://developers.soundcloud.com/docs/api/html5-widget', icon:'https://soundcloud.com/favicon.ico'},
  {name:'Radio Browser', role:'Community directory of radio stations near the pin', lic:'Public domain', url:'https://www.radio-browser.info', icon:'https://www.radio-browser.info/favicon.ico'},
  {name:'html2canvas', role:'Takes the optional screenshot in Report a problem', lic:'MIT', url:'https://html2canvas.hertzen.com'},
  {name:'Google Fonts', role:'Press Start 2P and DM Sans typefaces', lic:'OFL', url:'https://fonts.google.com', icon:'https://www.gstatic.com/images/icons/material/apps/fonts/1x/catalog/v5/favicon.svg'},
  {name:'Lucide', role:'Icon designs', lic:'ISC', url:'https://lucide.dev', icon:'https://lucide.dev/favicon.ico'},
  {name:'unpkg', role:'Delivers the Leaflet library', url:'https://unpkg.com', icon:'https://unpkg.com/favicon.ico'},
  {name:'Nighthawk.club', role:'Hosts MusicMap', url:'https://nighthawk.club', icon:'https://nighthawk.club/favicon.ico'},
  {name:'WordPress', role:'MusicMap runs on it as a plugin: the site, share codes and saved lookups', lic:'GPL', url:'https://wordpress.org', icon:'https://s.w.org/favicon.ico'},
];
let creditsRendered=false;
function renderCredits(){
  if(creditsRendered) return;
  const list=document.getElementById('creditsList'); if(!list) return;
  creditsRendered=true;
  CREDITS.forEach(c=>{
    const a=document.createElement('a');
    a.className='credit'; a.href=c.url; a.target='_blank'; a.rel='noopener noreferrer';
    const ic=document.createElement('span'); ic.className='credit-ic';
    const img=document.createElement('img');
    img.alt=''; img.loading='lazy'; img.decoding='async'; img.referrerPolicy='no-referrer'; img.src=c.icon;
    img.onerror=()=>{ img.remove(); ic.textContent=c.name[0]; };
    ic.appendChild(img);
    const main=document.createElement('span'); main.className='credit-main';
    const n=document.createElement('span'); n.className='credit-name'; n.style.display='block'; n.textContent=c.name;
    const r=document.createElement('span'); r.className='credit-role'; r.style.display='block'; r.textContent=c.role;
    main.append(n,r); a.append(ic,main);
    if(c.lic){ const l=document.createElement('span'); l.className='credit-lic'; l.textContent=c.lic; a.append(l); }
    list.appendChild(a);
  });
  document.getElementById('creditsNote').textContent=
    'Music in the built-in game packs belongs to its composers and publishers and streams from YouTube. '
    +'Chart and channel songs, and Spotify songs, belong to their artists and labels. Radio streams belong to their broadcasters. '
    +'MusicMap does not host or copy any audio.';
}
function openCredits(e){
  if(e) e.preventDefault();
  switchTab('settings');
  setTimeout(()=>document.getElementById('creditsSection')?.scrollIntoView({block:'start',behavior:'smooth'}),60);
}


// ── Units: miles where people use miles (by the visitor's locale), overridable in Settings ──
const MILE_REGIONS=['US','GB','LR','MM'];
function autoDistUnits(){
  const tag=(navigator.languages&&navigator.languages[0])||navigator.language||'';
  let region='';
  try{ region=new Intl.Locale(tag).maximize().region||''; }catch(e){ region=(tag.split('-')[1]||'').toUpperCase(); }
  return MILE_REGIONS.includes(region)?'mi':'km';
}
function distUnits(){
  const pref=gs('distUnits','auto');
  return pref==='mi'||pref==='km'?pref:autoDistUnits();
}
function fmtDist(km){                 // station distances, search radius
  if(distUnits()==='mi'){ const mi=km*0.621371; return mi<1?'<1 mi':Math.round(mi)+' mi'; }
  return km<1?'<1 km':Math.round(km)+' km';
}
function fmtRadius(m){                 // small radii of saved places (metres in storage)
  m=Number(m)||0;
  if(distUnits()==='mi'){ const ft=m*3.28084; return ft<1000?Math.round(ft/10)*10+' ft':(m/1609.344).toFixed(1)+' mi'; }
  return m<1000?Math.round(m)+' m':(m/1000).toFixed(1)+' km';
}
function setDistUnits(v){
  ss('distUnits',['mi','km'].includes(v)?v:'auto');
  if(localStations.length) renderLocalList();
  renderCustomPins();
  if(typeof updateMapPickerRadius==='function'&&document.getElementById('mapPickerRadiusVal')) updateMapPickerRadius();
}
function syncDistUnitsSelect(){
  const sel=document.getElementById('distUnitsSelect'); if(!sel) return;
  sel.value=gs('distUnits','auto');
  sel.options[0].textContent='Automatic ('+(autoDistUnits()==='mi'?'miles':'kilometres')+')';
}

// ── Alert pop-up for Local Listening ──
function showLocalAlert(title,msg,actions){
  document.getElementById('localAlertTitle').textContent=title;
  document.getElementById('localAlertMsg').textContent=msg;
  const box=document.getElementById('localAlertActions'); box.innerHTML='';
  (actions&&actions.length?actions:[{label:'OK',primary:true}]).forEach(a=>{
    const b=document.createElement('button'); b.type='button';
    b.className=a.primary?'btn-primary':'pill-btn'; b.style.flex='1'; b.textContent=a.label;
    b.onclick=()=>{ closeLocalAlert(); a.fn&&a.fn(); };
    box.appendChild(b);
  });
  document.getElementById('localAlertOverlay').classList.add('open');
  box.querySelector('button')?.focus();
}
function closeLocalAlert(){ document.getElementById('localAlertOverlay').classList.remove('open'); }

// ── Map key: only what is actually drawn on the map ──
function renderMapLegend(){
  const el=document.getElementById('mapLegend'), hint=document.getElementById('mapHint');
  if(!el) return;
  el.innerHTML='';
  const item=(sw,label,sub)=>{
    const d=document.createElement('div'); d.className='legend-item';
    const swEl=document.createElement('span'); swEl.className='legend-sw'; swEl.innerHTML=sw; // app-written markup only
    const t=document.createElement('span'); t.className='legend-text';
    const l=document.createElement('span'); l.className='legend-label'; l.textContent=label;
    const s2=document.createElement('span'); s2.className='legend-sub'; s2.textContent=sub;
    t.append(l,s2); d.append(swEl,t); el.appendChild(d);
  };
  const YOU='<span class="mm-user-marker"></span>';
  const youSub=trackingActive?'Your live location':'Appears while Listen to World is on';
  if(isLocalMode()){
    hint.textContent='Tap the map to listen there (it switches right away) · Pinch or scroll to zoom';
    item('<span class="mm-listen-marker"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg></span>',
      'Listening pin', localPoint?('Listening near '+(placeLabel(localPoint.place)||'this spot')+'. Drag it or tap the map.'):'Tap the map to drop it');
    item(YOU,'You',youSub);
    const sv=getSaved(); const onMap=[...sv.songs,...sv.stations,...sv.spots].filter(x=>Number.isFinite(x.lat)&&Number.isFinite(x.lon)).length;
    item('<span class="mm-saved-marker" style="width:24px;height:24px">'+SAVE_BTN_HTML+'</span>','Saved',
      onMap?'Your saved songs, stations and spots. Tap one to play it or go there; a number means several were saved at that place.':'Songs, stations and spots you save show here, where you saved them.');
    return;
  }
  hint.textContent='Tap the map to add a saved place (Home, Gym…) · Pinch or scroll to zoom';
  item(YOU,'You',youSub);
  const places=getAllCustomLocs().filter(l=>l.lat&&l.lon);
  if(!places.length) item('<span style="font-size:18px">📍</span>','No saved places yet','Tap the map to add one; each gets its own music and a dashed circle showing its range');
  places.forEach(loc=>{
    const color=BIOME_COLORS[loc.cssClass||'biome-custom']||'#8b5cf6';
    item('<span style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;border:2px dashed '+color+';font-size:16px">'+esc(loc.emoji||'📍')+'</span>',
      loc.name, 'Saved place · plays its own tracks within '+fmtRadius((loc.pins&&loc.pins[0]?.radius)||loc.radius||200));
  });
  // Biomes aren't drawn: say how they work and which one is active
  const pack=getActivePack();
  const cur=pack?.biomes?.find(b=>b.id===currentLocId);
  const curOv=cur?{...cur,...getBiomeOverride(getPackId(),cur.id)}:null;
  const note=document.createElement('div'); note.className='legend-note';
  note.textContent='Biomes aren’t drawn on the map: MusicMap reads the map data where you are and picks the closest match (beach, city, forest…).'
    +(curOv?' Right now: '+(curOv.emoji||'')+' '+curOv.name+'.':'');
  el.appendChild(note);
}



// ═══════════════════════════════════════════
// BIOME BEATS PLAYBACK HELPERS
// Real positions (not a stopwatch) drive the seek bar; Spotify gets the upcoming queue so it
// can keep going while the phone is locked; YouTube soundtracks run on past a track's end when
// the page is hidden.
// ═══════════════════════════════════════════
let packsPlayToken=0, packsTicker=null, packsYtTrack=null, packsSpQueue=null, packsBiomeChecked=false;
function currentPacksTrack(){
  const pack=getActivePack();
  const t=getAllPackTracks(pack)[currentPackTIdx()];
  return t?{pack,t}:null;
}
function currentPacksTrackKey(){ const c=currentPacksTrack(); return c?(c.t.videoId||c.pack.videoId)+'@'+c.t.start:''; }
// Upcoming Spotify tracks in play order (current first), stopping at the first non-Spotify track
function packsSpotifyQueue(){
  const pack=getActivePack(); const idxs=playIdxs(); const all=getAllPackTracks(pack);
  const fav=favPlaying!=null;
  // the shuffle order is normally made at the first "next": make it now, so Spotify gets the whole list
  if(!fav&&!shuffleQueue.length&&idxs.length>1) shuffleQueue=buildShuffleQueue(idxs.length,currentTrackPlayIdx);
  const order=fav?[favPlaying,...favQueue]:[currentTrackPlayIdx,...shuffleQueue];
  const out=[];
  for(const k of order){
    const t=all[fav?k:idxs[k]];
    if(!t||!/^spotify:track:[A-Za-z0-9]{22}$/.test(t.spotifyUri||'')) break;
    out.push({k,uri:t.spotifyUri});
    if(out.length>=50) break;
  }
  return out;
}
async function spotifyPlayUris(uris){
  if(!uris.length) return false;
  return (await spotifyPlayBody({uris})).ok;
}
// Spotify reached a later track in our queue: catch our state up (no playback calls)
function followPacksSpotify(uris){
  const at=packsSpQueue.findIndex(q=>uris.includes(q.uri));
  if(at<=0) return false; // same song (or not ours): the end-of-list check in onSpotifyState decides
  if(pendingBiomeId&&pendingBiomeId!==currentLocId){ packsSpQueue=null; nextTrack(); return true; } // biome change waits for a track boundary
  const step=packsSpQueue[at];
  if(favPlaying!=null){ favPlaying=step.k; favQueue=favQueue.slice(at); renderFavList(); } // [favourite, ...favQueue], the same way
  else {
    shuffleQueue=shuffleQueue.slice(at); // the queue was [current, ...shuffleQueue]: drop everything up to and including this track
    currentTrackPlayIdx=step.k;
  }
  packsSpQueue=packsSpQueue.slice(at);
  renderTrackList(); updateNowPlaying();
  const c=currentPacksTrack(); if(c){ updateSpotifyNowPlaying(true,c.t); setPacksMediaSession(c.t); startPacksTicker(c.t); }
  return true;
}
function stopPacksTicker(){ clearInterval(packsTicker); packsTicker=null; }
function startPacksTicker(t){
  stopPacksTicker(); packsBiomeChecked=false;
  const show=(pos,dur)=>{
    pos=Math.max(0,pos);
    document.getElementById('progressTime').textContent=fmt(Math.floor(Math.min(pos,dur||pos)));
    document.getElementById('progressDur').textContent=dur?fmt(Math.floor(dur)):'';
    document.getElementById('progressFill').style.width=dur?Math.min(100,pos/dur*100)+'%':'0%';
    // look ahead for a biome change ~10s before the end
    if(trackingActive&&dur>15&&!packsBiomeChecked&&dur-pos<=10){ packsBiomeChecked=true; checkBiomeInBackground(); }
  };
  const tick=async()=>{
    if(appMode==='local'){ stopPacksTicker(); return; }
    if(scActive){ show(scPos/1000, (scDur/1000)||Number(t.dur)||0); return; }
    if(spotifyActive){
      const st=await spotifyGetState(); if(!st) return;
      spotifyWatch(st, isPlaying&&spotifyActive);
      show(st.position/1000, st.duration/1000);
      return;
    }
    if(!ytPlayer?.getCurrentTime||!packsYtTrack) return;
    const cur=ytPlayer.getCurrentTime()||0, dur=packsYtTrack.dur||(ytPlayer.getDuration()-packsYtTrack.start);
    const pos=cur-packsYtTrack.start;
    if(dur&&pos>=dur&&isPlaying){
      if(document.visibilityState==='visible'){ nextTrack(); return; }
      followPacksYouTube(cur); // hidden: let the soundtrack play on, just keep the labels right
      return;
    }
    show(pos,dur);
  };
  tick(); packsTicker=setInterval(tick,500);
}
// Screen off on a YouTube soundtrack: name whichever pack track the video has run into
function followPacksYouTube(cur){
  const c=currentPacksTrack(); if(!c) return;
  const vid=packsYtTrack.vid;
  const next=getAllPackTracks(c.pack).find(x=>(x.videoId||c.pack.videoId)===vid&&cur>=x.start&&cur<x.start+(x.dur||0));
  if(!next||next.start===packsYtTrack.start) return;
  packsYtTrack={key:vid+'@'+next.start, vid, start:Number(next.start)||0, dur:Number(next.dur)||0};
  document.getElementById('npTrack').textContent=next.title;
  setPacksMediaSession(next);
}
// Coming back to the page after the soundtrack ran on: the song that's playing finishes first
// (the ticker follows it), then the biome's own shuffle carries on at that boundary.
function packsYtState(e){
  if(e.data===YT.PlayerState.PLAYING){ playedOk(); isPlaying=true; setPlayIcon(true); document.getElementById('playingBars').style.display='flex'; }
  else if(e.data===YT.PlayerState.BUFFERING&&isPlaying) setPlayerBusy(true);
  else if(e.data===YT.PlayerState.PAUSED&&document.visibilityState==='visible'&&!isPlaying){ setPlayIcon(false); }
  else if(e.data===YT.PlayerState.ENDED&&isPlaying){ nextTrack(); } // the whole video finished
}
// Lock-screen controls and artwork for Biome Beats
function setPacksMediaSession(t){
  if(!('mediaSession' in navigator)) return;
  const pack=getActivePack();
  try{
    navigator.mediaSession.metadata=new MediaMetadata({title:t.title, artist:pack?.source||pack?.name||'MusicMap', album:'MusicMap · Biome Beats', artwork:mmLogoArtwork()});
    navigator.mediaSession.setActionHandler('play',()=>{ if(!isPlaying) togglePlay(); });
    navigator.mediaSession.setActionHandler('pause',()=>{ if(isPlaying) togglePlay(); });
    navigator.mediaSession.setActionHandler('nexttrack',()=>nextTrack());
    navigator.mediaSession.setActionHandler('previoustrack',()=>prevTrack());
  }catch(e){}
}
function mmLogoArtwork(){
  const big=typeof MM_CONFIG.logoUrl==='string'&&/^https?:\/\//.test(MM_CONFIG.logoUrl)?MM_CONFIG.logoUrl:'';
  return big?[{src:big,sizes:'512x512',type:'image/png'}]:[{src:document.getElementById('mmLogo')?.src||'',sizes:'96x96',type:'image/png'}];
}

// ═══════════════════════════════════════════
// SONG CHANNELS: Popular · Homegrown · Genre Mixes
// Data comes from the MusicMap plugin (MM_CONFIG.restBase): country charts (Apple Music),
// local artists (Wikidata) and cached YouTube lookups. Plays on YouTube by default;
// visitors who connected Spotify also get a Spotify button on each row.
// ═══════════════════════════════════════════
let chanItems=[], chanIdx=-1, chanPlaying=false, chanVia=null, chanGenre=null, chanData=null;
let ytPlayer=null, ytReadyPromise=null, chanProgTimer=null, chanSkips=0;
let chanPlayToken=0, chanStartedToken=-1, chanYtNext=null, chanSpList=null;
let chanOrder=[], chanOrderPos=0; // play order of chanItems (list order, or shuffled)
let radOrder=[], radOrderPos=0;   // the same for radio stations
// Shuffle is remembered per channel; Homegrown starts shuffled
function shuffleOn(ch){ const s=gs('chanShuffle',{}); return s[ch||localChannel]!==undefined?s[ch||localChannel]===true:(ch||localChannel)==='made'; }
function shuffledIdx(n){ const a=[...Array(n).keys()]; for(let i=n-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function buildChanOrder(){ chanOrder=shuffleOn()?shuffledIdx(chanItems.length):[...Array(chanItems.length).keys()]; chanOrderPos=0; }
function buildRadOrder(){ radOrder=shuffleOn('radio')?shuffledIdx(localStations.length):[...Array(localStations.length).keys()]; radOrderPos=0; }
// the item after `from` in play order (what plays next by itself)
function chanNextIdx(from){
  if(chanOrder.length===chanItems.length){ const at=chanOrder.indexOf(from); if(at>=0) return chanOrder[(at+1)%chanOrder.length]; }
  return (from+1)%chanItems.length;
}
function renderShuffleBtn(){
  const b=document.getElementById('chanShuffleBtn'); if(!b) return;
  const on=shuffleOn(); b.setAttribute('aria-pressed',on); b.title=on?'Shuffle is on (tap to play in order)':'Shuffle play';
}
// Off → on: shuffle and start a random one now. On → off: carry on in list order.
function toggleChanShuffle(){
  const on=!shuffleOn(); const s=gs('chanShuffle',{}); s[localChannel]=on; ss('chanShuffle',s);
  renderShuffleBtn();
  if(localChannel==='radio'){
    buildRadOrder();
    if(on&&localStations.length){ playStation(radOrder[0]); }
    else if(localIdx>=0){ radOrderPos=Math.max(0,radOrder.indexOf(localIdx)); }
    else if(on&&localPoint) loadLocalChannel({autoplay:true});
    return;
  }
  if(localChannel==='popular'&&(chanGenre===null||chanOverview)&&chanData?.mixes?.length){
    if(on) openMix(chanData.mixes[Math.floor(Math.random()*chanData.mixes.length)].genre,true);
    return;
  }
  buildChanOrder();
  if(!chanItems.length) return;
  if(on){ playChanItem(chanOrder[0]); return; }
  if(chanIdx>=0) chanOrderPos=Math.max(0,chanOrder.indexOf(chanIdx));
}
let chanWantVia=null; // the service the visitor chose for this channel (one missing song may still come from YouTube) // newest play wins; 'ended' only counts for a song that really started
const chanCache={};
const YT_ID=/^[A-Za-z0-9_-]{11}$/;
const ART_OK=/^https:\/\/is\d+-ssl\.mzstatic\.com\/image\/thumb\/[^\s"'<>]+$/;
// artist photos (Homegrown): Wikimedia Commons thumbnails as the plugin builds them
const COMMONS_OK=/^https:\/\/commons\.wikimedia\.org\/wiki\/Special:FilePath\/[^\s"'<>?#\/]+\?width=160$/;

async function mmApi(path){
  const base=typeof MM_CONFIG.restBase==='string'&&/^https?:\/\//.test(MM_CONFIG.restBase)?MM_CONFIG.restBase:'';
  if(!base){ const e=new Error('This channel needs the MusicMap server (the WordPress plugin).'); e.code='no_server'; throw e; }
  const r=await fetch(base+path,{credentials:'omit'});
  let j=null; try{ j=await r.json(); }catch(e){}
  if(!r.ok||!j||j.ok===false){ const e=new Error(j?.error||'Request failed'); e.code=j?.code||('http_'+r.status); e.status=r.status; throw e; }
  return j;
}
async function getChart(cc){
  const k='chart:'+cc; if(chanCache[k]) return chanCache[k];
  return chanCache[k]=await mmApi('chart?cc='+encodeURIComponent(cc));
}
async function getMade(lat,lon){
  const k='made:'+lat.toFixed(1)+','+lon.toFixed(1); if(chanCache[k]) return chanCache[k];
  return chanCache[k]=await mmApi('made?lat='+lat.toFixed(4)+'&lon='+lon.toFixed(4));
}
function genreMixes(songs){
  const by={};
  songs.forEach(s=>{ if(s.genre){ (by[s.genre]=by[s.genre]||[]).push(s); } });
  return Object.entries(by).filter(([,l])=>l.length>=3).sort((a,b)=>b[1].length-a[1].length).map(([genre,list])=>({genre,list}));
}
// Song lists that aren't channels: your saved songs, or a song someone shared with you
const isSongList=c=>c==='saved'||c==='shared';
const SONG_LIST_LABEL={saved:'Saved songs',shared:'Shared with you'};
function chanLabel(){ return isSongList(localChannel)?SONG_LIST_LABEL[localChannel]:(LOCAL_CHANNELS.find(c=>c.id===localChannel)||{}).label||''; }

async function loadSongChannel(opts){
  const title=document.getElementById('localListTitle');
  if(isSongList(localChannel)){ title.textContent=SONG_LIST_LABEL[localChannel].toUpperCase(); renderChanList(); if(!chanPlaying) setLocalIdle(); return; }
  const pl=localPoint?.place;
  const token=++localLoadToken;
  const fail=(msg)=>{
    if(opts?.switchNow){
      showLocalAlert('Nothing to play here', msg+(chanPlaying&&chanItems[chanIdx]?' Still playing '+itemTitle(chanItems[chanIdx])+'.':''), [{label:'OK',primary:true}]);
      revertListenPoint(opts.prev); setPlayerBusy(false);
      renderChanList(); return;
    }
    renderLocalNote(esc(msg));
  };
  if(!localPoint){ renderLocalNote('Choose a spot first: tap <b>Move pin</b>.'); return; }
  try{
    if(localChannel==='made'){
      title.textContent='HOMEGROWN AROUND '+(pl?.city||'THE PIN').toUpperCase();
      renderLocalLoading('Finding artists from around <b>'+esc(placeLabel(pl)||'this spot')+'</b>…');
      const d=await getMade(localPoint.lat,localPoint.lon);
      if(token!==localLoadToken) return;
      if(!d.artists.length) return fail('No well-known artists found within '+fmtDist(d.radius_km||80)+' of '+(placeLabel(pl)||'that spot')+'.');
      setChanList(d.artists.map(a=>({kind:'artist',...a})), d, opts);
    } else {
      // Popular and Genre Mixes are country-wide: they always say which country
      const cc=pl?.cc;
      if(!cc){
        if(!pl){
          // place not looked up yet (e.g. opened from a shared link): look it up, then load
          renderLocalLoading('Finding where the pin is…');
          const pt=localPoint, place=await localGeocode(pt.lat,pt.lon);
          if(token!==localLoadToken||localPoint!==pt) return;
          if(place){ pt.place=place; ss('localPoint',pt); renderLocalHeader(); return loadSongChannel(opts); }
          return fail('Couldn’t work out which country that spot is in.');
        }
        return fail('That spot isn’t in a country with music charts.');
      }
      title.textContent='POPULAR IN '+(pl.country||cc).toUpperCase();
      renderLocalLoading('Loading the chart for <b>'+esc(pl.country||cc.toUpperCase())+'</b>…');
      const d=await getChart(cc);
      if(token!==localLoadToken) return;
      // one tab: the country's top songs first, then the same chart split into genre mixes
      const mixes=[{genre:CHART_TOP, list:d.songs}, ...genreMixes(d.songs)];
      chanData={...d, mixes};
      const open=mixes.find(m=>m.genre===chanGenre);
      if(open){ chanOverview=false; title.textContent=mixTitle(open).toUpperCase(); setChanList(open.list.map(x=>({kind:'song',...x})), chanData, opts, true); }
      else {
        chanGenre=null; chanOverview=true; chanItems=[]; renderChanList(); renderShuffleBtn();
        if(opts?.switchNow||opts?.autoplay) openMix(CHART_TOP,true,true);
        else if(!chanPlaying&&!localPlaying) setLocalIdle();
      }
    }
  }catch(e){
    if(token!==localLoadToken) return;
    fail(e.code==='no_chart'?'There’s no chart for '+(pl?.country||'this country')+'.':e.message);
  }
}
function setChanList(items, data, opts, keepGenre){
  if(!keepGenre) chanData=data;
  ensureYtPlayer().catch(()=>{});
  const playing=chanPlaying?chanItems[chanIdx]:null;
  items=chanItemsWithoutDisliked(items);
  chanItems=items;
  chanIdx=playing?items.findIndex(x=>itemKey(x)===itemKey(playing)):-1;
  // a fresh order every time the list loads (random when shuffle is on)
  buildChanOrder(); renderShuffleBtn();
  if(chanIdx>=0){ const at=chanOrder.indexOf(chanIdx); if(at>=0) chanOrderPos=at; }
  renderChanList();
  if(opts?.switchNow||opts?.autoplay) playChanItem(chanOrder[0]??0);
  else if(!chanPlaying&&!localPlaying) setLocalIdle();
  applyPendingShare();
}
function setLocalIdle(){
  setPlayerBusy(false);
  const pl=localPoint?.place;
  const n=chanItems.length;
  const what=localChannel==='shared'?'Shared with you':localChannel==='saved'?n+' saved song'+(n===1?'':'s'):localChannel==='made'?n+' artists from around '+(placeLabel(pl)||'the pin')
    :n?(chanGenre&&chanGenre!==CHART_TOP?chanGenre+' mix · '+(pl?.country||''):'Top '+n+' in '+(pl?.country||'this country'))
    :'Top songs and genre mixes for '+(pl?.country||'this country');
  setChanNowPlaying(null,what,localChannel==='made'?'Tap play or pick an artist':n?'Tap play or pick a song':'Pick the top songs or a genre: it shuffles and plays');
}
const itemKey=x=>x.kind==='artist'?'a:'+x.name:'s:'+x.artist+'|'+x.title;
const itemTitle=x=>x.kind==='artist'?x.name:x.title+' — '+x.artist;

function renderChanList(){
  const list=document.getElementById('localList'); if(!list) return;
  list.innerHTML='';
  // Popular's front page: the top songs, then genre mixes. Tapping one shuffles it and starts playing.
  if(localChannel==='popular'&&chanData?.mixes&&(chanOverview||!chanItems.length)){
    chanData.mixes.forEach(m=>{
      const top=m.genre===CHART_TOP;
      const row=document.createElement('div'); row.className='local-row-wrap';
      const b=document.createElement('button'); b.type='button'; b.className='local-item'+(top?' local-item-top':'');
      if(top&&ART_OK.test(m.list[0]?.art||'')){ const img=document.createElement('img'); img.className='local-item-art'; img.alt=''; img.loading='lazy'; img.referrerPolicy='no-referrer'; img.src=m.list[0].art; b.append(img); }
      else { const icon=document.createElement('span'); icon.className='local-item-ic'; icon.textContent=top?'★':'♫'; b.append(icon); }
      const main=document.createElement('span'); main.className='local-item-main';
      const name=document.createElement('span'); name.className='local-item-name'; name.style.display='block'; name.textContent=mixLabel(m);
      const sub=document.createElement('span'); sub.className='local-item-sub'; sub.style.display='block';
      sub.textContent=(top?'Most played right now · ':m.list.length+' songs · ')+[...new Set(m.list.map(x=>x.artist))].slice(0,3).join(', ');
      main.append(name,sub); b.append(main);
      b.onclick=()=>openMix(m.genre,true,true);
      b.setAttribute('aria-label','Shuffle play '+mixLabel(m));
      row.append(b, shareButton({ch:'popular', g:top?'':m.genre}, mixLabel(m)));
      list.appendChild(row);
    });
    return;
  }
  if(localChannel==='popular'&&chanGenre){
    const back=document.createElement('button'); back.type='button'; back.className='local-back';
    back.textContent='← Top songs & genres';
    back.onclick=()=>{ chanOverview=true; document.getElementById('localListTitle').textContent='POPULAR IN '+chartCountry().toUpperCase(); renderChanList(); if(!chanPlaying) setLocalIdle(); };
    list.appendChild(back);
  }
  chanItems.forEach((it,i)=>{
    const row=document.createElement('div'); row.className='local-row-wrap';
    const b=document.createElement('button'); b.type='button'; b.className='local-item'+(i===chanIdx?' active':'');
    if(it.kind==='song'){
      const rank=document.createElement('span'); rank.className='local-item-rank'; rank.textContent=it.rank||'';
      b.append(rank);
      if(ART_OK.test(it.art||'')){ const img=document.createElement('img'); img.className='local-item-art'; img.alt=''; img.loading='lazy'; img.referrerPolicy='no-referrer'; img.src=it.art; b.append(img); }
    } else {
      const icon=document.createElement('span'); icon.className='local-item-ic'; icon.textContent=(it.name||'?')[0];
      if(COMMONS_OK.test(it.image||'')){
        // their photo from Wikimedia Commons; the letter again if it can't load
        const img=document.createElement('img'); img.className='local-item-art artist-photo'; img.alt=''; img.loading='lazy'; img.decoding='async';
        img.referrerPolicy='no-referrer'; img.title='Photo: Wikimedia Commons'; img.src=it.image; img.onerror=()=>img.replaceWith(icon);
        b.append(img);
      } else b.append(icon);
    }
    const main=document.createElement('span'); main.className='local-item-main';
    const name=document.createElement('span'); name.className='local-item-name'; name.style.display='block';
    name.textContent=it.kind==='song'?it.title:it.name;
    const sub=document.createElement('span'); sub.className='local-item-sub'; sub.style.display='block';
    sub.textContent=it.kind==='song'?[it.artist,localChannel==='popular'?it.genre:''].filter(Boolean).join(' · '):[it.genre,it.place].filter(Boolean).join(' · ');
    main.append(name,sub); b.append(main);
    if(i===chanIdx&&chanPlaying){ const bars=document.createElement('span'); bars.className='playing-bars'; bars.innerHTML='<span></span><span></span><span></span>'; b.append(bars); }
    b.onclick=()=>playChanItem(i,preferredPlatform());
    row.append(b);
    // the other ways to play it: services this visitor connected, and YouTube when it isn't their first choice
    altPlatforms().forEach(p=>{
      const x=document.createElement('button'); x.type='button'; x.className='row-btn';
      x.innerHTML=SOURCE_ICONS[p]; x.title='Play on '+SOURCE_LABELS[p]; x.setAttribute('aria-label','Play '+name.textContent+' on '+SOURCE_LABELS[p]);
      x.onclick=()=>playChanItem(i,p);
      row.append(x);
    });
    row.append(shareButton(it.kind==='artist'?{ch:'made',a:it.name}
      :isSongList(localChannel)?songShareParams(it)
      :{ch:localChannel,t:it.title,a:it.artist,g:chanGenre&&chanGenre!==CHART_TOP?chanGenre:''}, itemTitle(it)));
    list.appendChild(row);
  });
}
// shuffle: opened by tapping it on Popular's front page, which turns shuffle on and starts a random song
function openMix(genre,autoplay,shuffle){
  const m=chanData?.mixes?.find(x=>x.genre===genre); if(!m) return;
  chanGenre=genre; chanOverview=false;
  if(shuffle){ const s=gs('chanShuffle',{}); s.popular=true; ss('chanShuffle',s); renderShuffleBtn(); }
  document.getElementById('localListTitle').textContent=mixTitle(m).toUpperCase();
  chanItems=chanItemsWithoutDisliked(m.list.map(x=>({kind:'song',...x}))); chanIdx=-1;
  buildChanOrder(); renderChanList();
  if(autoplay) playChanItem(chanOrder[0]??0);
  else if(!chanPlaying&&!localPlaying) setLocalIdle();
}

// ── Playback ──
function stopChanPlayback(){
  setPlayerBusy(false);
  clearInterval(chanProgTimer); chanProgTimer=null;
  stopPacksTicker();
  if(ytPlayer&&ytPlayer.stopVideo) try{ ytPlayer.stopVideo(); }catch(e){}
  document.getElementById('ytContainer')?.classList.remove('local-video');
  if(chanVia==='spotify'&&spotifyActive){ spotifyPausePlayback(); spotifyActive=false; }
  if(amActive){ amActive=false; amQueue=null; try{ amMusic?.stop(); }catch(e){} }
  chanPlaying=false; chanVia=null;
}
// via: 'youtube' | 'spotify' | 'apple'. Left out: the service already in use, else the visitor's preferred one.
// opts.fallback: the chosen service didn't have this song, so this one plays from YouTube (the next goes back to the choice)
async function playChanItem(i,via,opts){
  const it=chanItems[i]; if(!it) return;
  if(!via) via=chanWantVia||preferredPlatform();
  if(via!=='spotify'&&via!=='apple') via='youtube';
  if(!opts?.fallback) chanWantVia=via;
  if(via==='spotify') spotifyUnlockAudio();
  dismissStickyToast();
  it._song=null;
  const token=++chanPlayToken;
  stopRadio(); stopChanPlayback();
  chanIdx=i; renderChanList();
  const at=chanOrder.indexOf(i); if(at>=0) chanOrderPos=at; // keep the shuffle position in step
  setChanNowPlaying(it,null,'Loading…',via); setPlayerBusy(true);
  try{
    if(via==='spotify') await chanPlaySpotify(it,token);
    else if(via==='apple') await chanPlayApple(it,token);
    else await chanPlayYouTube(it,token);
    if(token!==chanPlayToken) return; // a newer play took over
    chanVia=via;
    setChanNowPlaying(it,null,null,via);
    setChanMediaSession(it);
    if(via==='youtube') setTimeout(()=>{
      // browsers may block playback that starts after a network wait; one more tap fixes it
      if(token===chanPlayToken&&chanStartedToken!==token){ document.getElementById('npGame').textContent='Tap play to start'; setPlayerBusy(false); }
    },3000);
  }catch(e){
    if(token!==chanPlayToken) return;
    chanPlaying=false; setPlayIcon(false); setPlayerBusy(false);
    const msg=e.message||'Could not play this.';
    // Spotify/Apple Music doesn't have it (or can't play here): this one plays from YouTube instead
    if(via!=='youtube'&&(e.code==='not_found'||e.code==='cant_play')){
      spotifyShowSnack((e.code==='not_found'?'Not on '+SOURCE_LABELS[via]+'.':msg)+' Playing from YouTube.');
      return playChanItem(i,'youtube',{fallback:true});
    }
    if(e.code==='not_found'&&chanSkips<3&&chanItems.length>1){ chanSkips++; spotifyShowSnack('Couldn’t find '+itemTitle(it)+'. Skipping.'); return chanStep(1); }
    // YouTube lookups used up (or not set up): another service you connected, else the songs whose video is already known
    if(via==='youtube'&&['quota','no_youtube_key','rate_limited'].includes(e.code)){
      ytLookupsDownUntil=Date.now()+(e.code==='rate_limited'?10:30)*60000;
      const other=!opts?.fallback?(spotifyCanPlay()?'spotify':isAppleConnected()?'apple':''):'';
      if(other){ spotifyShowSnack('YouTube lookups are used up for now. Playing on '+SOURCE_LABELS[other]+'.'); return playChanItem(i,other,{fallback:true}); }
      it._noYt=true;
      const next=chanNextYtReady(i);
      if(next>=0){ spotifyShowSnack('YouTube lookups are used up for today, so songs played before come first.'); return playChanItem(next,'youtube',{fallback:true}); }
    }
    setChanNowPlaying(it,null,msg,via);
    const other=isSpotifyConnected()?'Spotify':isAppleConnected()?'Apple Music':'';
    if(e.code==='quota'||e.code==='no_youtube_key'||e.code==='no_server') showLocalAlert('Can’t play right now', msg+(other?' You can still play it on '+other+'.':''), [{label:'OK',primary:true}]);
  }
}
function chanToggle(){
  if(chanIdx<0||!chanItems[chanIdx]){ if(chanItems.length) playChanItem(chanOrder[chanOrderPos]??0); else if(localChannel==='popular'&&chanData?.mixes?.length) openMix(CHART_TOP,true); return; }
  if(chanVia==='spotify'){ if(chanPlaying){ spotifyPausePlayback(); chanPlaying=false; } else { spotifyResumePlayback(); chanPlaying=true; } setPlayIcon(chanPlaying); renderChanList(); return; }
  if(chanVia==='apple'&&amMusic&&amActive){ try{ chanPlaying?amMusic.pause():amMusic.play(); }catch(e){} return; }
  if(ytPlayer&&chanVia==='youtube'){ chanPlaying?ytPlayer.pauseVideo():ytPlayer.playVideo(); return; }
  playChanItem(chanIdx);
}
function chanStep(dir){
  if(!chanItems.length) return;
  if(chanOrder.length===chanItems.length){
    chanOrderPos=((chanOrderPos+dir)%chanOrder.length+chanOrder.length)%chanOrder.length;
    return playChanItem(chanOrder[chanOrderPos]);
  }
  playChanItem(((chanIdx<0?0:chanIdx+dir)%chanItems.length+chanItems.length)%chanItems.length);
}

// YouTube: the official IFrame player (reports when a song ends, so the next one starts)
function ytReady(){
  if(ytReadyPromise) return ytReadyPromise;
  ytReadyPromise=new Promise((resolve,reject)=>{
    if(window.YT&&window.YT.Player) return resolve();
    const prev=window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady=()=>{ if(typeof prev==='function') try{prev();}catch(e){} resolve(); };
    const sc=document.createElement('script'); sc.src='https://www.youtube.com/iframe_api'; sc.async=true;
    sc.onerror=()=>{ ytReadyPromise=null; reject(Object.assign(new Error('YouTube could not load.'),{code:'yt_load'})); };
    document.head.appendChild(sc);
  });
  return ytReadyPromise;
}
async function ensureYtPlayer(){
  await ytReady();
  if(ytPlayer) return ytPlayer;
  return new Promise(resolve=>{
    ytPlayer=new YT.Player('localYtPlayer',{
      host:'https://www.youtube-nocookie.com',
      playerVars:{playsinline:1,rel:0,modestbranding:1,origin:location.origin},
      events:{
        onReady:()=>resolve(ytPlayer),
        onStateChange:e=>{
          if(appMode!=='local') return packsYtState(e);
          if(chanVia!=='youtube'&&chanVia!==null) return;
          // YouTube moved on to the queued next song by itself. Go by the video that's really playing: YouTube also
          // jumps there silently when the first one can't play (its playlist position can still say 0)
          if(e.data===YT.PlayerState.PLAYING&&chanYtNext&&chanYtNext.token===chanPlayToken&&ytPlayer.getVideoData?.()?.video_id===chanYtNext.id){
            if(chanStartedToken!==chanPlayToken) spotifyShowSnack(SKIP_WHY.youtube); // the first song never played
            const nx=chanYtNext; chanYtNext=null; chanIdx=nx.idx; chanSkips=0; dismissStickyToast();
            setChanNowPlaying(chanItems[chanIdx],null,null,'youtube'); setChanMediaSession(chanItems[chanIdx]);
          }
          const curIt=chanItems[chanIdx];
          if(e.data===YT.PlayerState.PLAYING&&curIt?.kind==='artist'&&curIt._yt?.list){
            const pi=ytPlayer.getPlaylistIndex?.();
            if(curIt._ytStart!=null){ if(pi!==curIt._ytStart&&chanStartedToken===chanPlayToken){ chanStep(1); return; } } // one song per artist, then shuffle on
            // an artist's uploads also hold interviews, trailers and vlogs: skip on to one that looks like a song
            else if(!ytLooksLikeSong()&&(curIt._ytSkips=(curIt._ytSkips||0)+1)<=8){ ytPlayer.nextVideo(); return; }
            else curIt._ytStart=pi;
            if(curIt._ytStart===pi) showArtistSong(cleanVideoTitle(ytPlayer.getVideoData?.()?.title,curIt.name));
          }
          if(e.data===YT.PlayerState.PLAYING){ chanStartedToken=chanPlayToken; chanSkips=0; playedOk(); chanPlaying=true; setPlayIcon(true); document.getElementById('playingBars').style.display='flex'; renderChanList(); startChanProgress(); }
          else if(e.data===YT.PlayerState.PAUSED){ chanPlaying=false; setPlayIcon(false); setPlayerBusy(false); document.getElementById('playingBars').style.display='none'; renderChanList(); }
          else if(e.data===YT.PlayerState.BUFFERING&&chanStartedToken===chanPlayToken) setPlayerBusy(true);
          else if(e.data===YT.PlayerState.ENDED){
            chanPlaying=false;
            if(chanStartedToken!==chanPlayToken) return; // never actually started: don't skip ahead
            chanStep(1);
          }
        },
        onError:()=>{
          setPlayerBusy(false);
          if(appMode!=='local'){ if(isPlaying&&!spotifyActive&&!scActive) skipUnplayable('youtube'); return; }
          if(chanVia==='spotify'||chanVia==='apple'||amActive) return; // not the YouTube player's song
          chanPlaying=false; skipUnplayable('youtube');
        }
      }
    });
  });
}
// Same idea as the plugin's song lookup: Shorts, interviews and the like aren't songs
const YT_NOT_MUSIC=/#shorts?\b|\b(interview|vlog|podcast|trailer|teaser|behind the scenes|reaction|reacts?|unboxing|q\s*&\s*a|livestream|live stream|announcement|documentary|episode|tutorial|lesson|press conference|making of|snippet|preview|tiktok|compilation|full album)\b/i;
// ── Known YouTube videos ── Finding a song's video uses the site's daily YouTube quota. Videos found before
// still play once it's used up: the server sends them with the chart / Homegrown list (ytv, ytt), and this
// browser remembers the ones it played.
const YT_KNOWN_KEY='ytKnown';
let ytLookupsDownUntil=0; // the server said lookups are used up (or unavailable): don't ask again until then
const ytKnownKey=x=>(x.kind==='artist'?'a:'+(x.name||''):'s:'+(x.artist||'')+'|'+(x.title||'')).toLowerCase().slice(0,300);
function ytKnownGet(x){ const v=(gs(YT_KNOWN_KEY,{})||{})[ytKnownKey(x)]; return v&&YT_ID.test(v.id||'')?{id:v.id,t:String(v.t||'')}:null; }
function ytKnownPut(x,id,title){
  if(!YT_ID.test(id||'')) return;
  const m=gs(YT_KNOWN_KEY,{})||{}, k=ytKnownKey(x);
  delete m[k]; m[k]={id, t:String(title||'').slice(0,160)};
  const keys=Object.keys(m); if(keys.length>400) keys.slice(0,keys.length-400).forEach(old=>delete m[old]); // newest 400
  ss(YT_KNOWN_KEY,m);
}
function knownVideo(x){
  if(YT_ID.test(x._yt?.id||'')) return {id:x._yt.id,t:''};
  if(YT_ID.test(x.ytv||'')) return {id:x.ytv,t:String(x.ytt||'').slice(0,160)};
  return ytKnownGet(x);
}
// can it play from YouTube right now without a lookup?
const ytPlayableNow=x=>!x._noYt&&(!!knownVideo(x)||(x.kind==='artist'&&/^UC[A-Za-z0-9_-]{22}$/.test(x.youtube||'')&&!x._ytEmpty));
// the next item in play order that can, or -1
function chanNextYtReady(from){
  const n=chanItems.length, order=chanOrder.length===n?chanOrder:[...Array(n).keys()];
  const at=Math.max(0,order.indexOf(from));
  for(let s=1;s<n;s++){ const i=order[(at+s)%n]; if(i!==from&&chanItems[i]&&ytPlayableNow(chanItems[i])) return i; }
  return -1;
}
function ytLooksLikeSong(){
  const title=ytPlayer?.getVideoData?.()?.title||'', dur=ytPlayer?.getDuration?.()||0;
  return !YT_NOT_MUSIC.test(title) && (!dur || (dur>=70 && dur<=900));
}
async function chanPlayYouTube(it,token){
  const p=await ensureYtPlayer();
  if(token!==chanPlayToken) return;
  document.getElementById('ytContainer').classList.add('local-video');
  if(it.kind==='artist'&&/^UC[A-Za-z0-9_-]{22}$/.test(it.youtube||'')&&!it._ytEmpty){
    // the artist's own uploads, long-form only ("UULF": no Shorts or live streams): no lookup (and no quota) needed
    const load=prefix=>{
      const list=prefix+it.youtube.slice(2);
      p.loadPlaylist({list,listType:'playlist',index:prefix==='UULF'?Math.floor(Math.random()*5):0});
      it._yt={list}; it._ytStart=null; it._ytSkips=0; // _ytStart is set when a song starts; moving off it = next artist
    };
    load('UULF');
    // some channels have no long-form list: use all their uploads instead (the song check still skips Shorts)
    // and if the channel has nothing playable at all, look the artist up like any other song
    const check=(prefix,next)=>setTimeout(()=>{
      if(token!==chanPlayToken||it._yt?.list!==prefix+it.youtube.slice(2)||(p.getPlaylist?.()||[]).length) return;
      next();
    },3500);
    check('UULF',()=>{ load('UU'); check('UU',()=>{ it._ytEmpty=true; playChanItem(chanIdx,'youtube',{fallback:true}); }); });
    return;
  }
  // a video already known (this list, the server's cache, or this browser) plays without a lookup
  const lookup=x=>{
    const k=knownVideo(x);
    if(k) return Promise.resolve({ok:true,videoId:k.id,title:k.t||''});
    if(Date.now()<ytLookupsDownUntil) return Promise.reject(Object.assign(new Error('Today’s YouTube lookups are used up. Songs played before still work; new ones will be back tomorrow.'),{code:'quota'}));
    return mmApi('resolve?artist='+encodeURIComponent(x.kind==='artist'?x.name:x.artist)+(x.kind==='song'?'&title='+encodeURIComponent(x.title):''))
      .then(r=>{ ytKnownPut(x,r.videoId,r.title); return r; });
  };
  const nextIdx=chanItems.length>1?chanNextIdx(chanIdx):-1;
  const nextIt=nextIdx>=0&&chanItems[nextIdx]?.kind==='song'?chanItems[nextIdx]:null;
  // look up this song and the next together, so YouTube can move on by itself (e.g. screen off)
  const [r,rn]=await Promise.all([lookup(it), nextIt?lookup(nextIt).catch(()=>null):Promise.resolve(null)]);
  if(token!==chanPlayToken) return;
  if(!YT_ID.test(r.videoId||'')) throw Object.assign(new Error('No playable video found.'),{code:'not_found'});
  it._yt={id:r.videoId};
  if(it.kind==='artist'&&r.title) it._song=cleanVideoTitle(r.title,it.name); // shown once playback starts
  if(rn&&YT_ID.test(rn.videoId||'')){
    nextIt._yt={id:rn.videoId};
    chanYtNext={idx:nextIdx,id:rn.videoId,token};
    p.loadPlaylist({playlist:[r.videoId,rn.videoId],index:0});
  } else { chanYtNext=null; p.loadVideoById(r.videoId); }
}
// Spotify: search with the visitor's own Spotify sign-in (no server key involved)
async function chanPlaySpotify(it,playTok){
  if(!spotifyCanPlay()) throw Object.assign(new Error(spotifyWhyNot()),{code:'cant_play'});
  const token=await getValidSpotifyToken(); if(!token) throw Object.assign(new Error('Can’t reach Spotify right now. Check your connection.'),{code:'cant_play'});
  let uri='', ctx='';
  if(it.kind==='artist'){
    if(/^[A-Za-z0-9]{22}$/.test(it.spotify||'')) ctx='spotify:artist:'+it.spotify;
    else { const r=await spotifyApiGet('/search?type=artist&limit=1&q='+encodeURIComponent(it.name),token); ctx=r?.artists?.items?.[0]?.uri||''; }
  } else {
    // this song and the next ones in play order, handed to Spotify as one list: Spotify moves through
    // them by itself (screen off too). Its "add to queue" can't be relied on, so it isn't used.
    const order=[chanIdx]; for(let j=chanIdx,k=0;k<CHAN_SP_AHEAD&&order.length<chanItems.length;k++){ j=chanNextIdx(j); if(order.includes(j)) break; order.push(j); }
    const found=await Promise.all(order.map(j=>chanItems[j]?.kind==='song'?spotifyFindTrack(chanItems[j],token).catch(()=>''):Promise.resolve('')));
    uri=found[0];
    if(uri){
      chanSpList={token:playTok, items:order.map((j,k)=>({idx:j,uri:found[k]})).filter(x=>x.uri)};
      chanSpList.items.forEach(x=>{ if(chanItems[x.idx]) chanItems[x.idx]._sp=x.uri; });
    }
  }
  if(playTok!==chanPlayToken) return;
  if(!/^spotify:(track|artist):[A-Za-z0-9]{22}$/.test(uri||ctx)) throw Object.assign(new Error('Not found on Spotify.'),{code:'not_found'});
  if(!uri) chanSpList=null;
  const resp=await spotifyPlayBody(uri?{uris:chanSpList.items.map(x=>x.uri)}:{context_uri:ctx});
  if(!resp.ok) throw Object.assign(new Error('Spotify couldn’t start playback.'),{code:'cant_play'});
  it._sp=uri||ctx;
  spotifyActive=true; chanPlaying=true;
  setPlayIcon(true); document.getElementById('playingBars').style.display='flex';
  startChanProgress();
}

const CHAN_SP_AHEAD=15; // songs handed to Spotify after the current one (about an hour)
async function spotifyFindTrack(it,token){
  if(/^spotify:track:[A-Za-z0-9]{22}$/.test(it._sp||'')) return it._sp;
  const r=await spotifyApiGet('/search?type=track&limit=1&q='+encodeURIComponent('track:'+it.title+' artist:'+it.artist),token);
  const uri=r?.tracks?.items?.[0]?.uri||'';
  return /^spotify:track:[A-Za-z0-9]{22}$/.test(uri)?uri:'';
}
// Spotify moved to another song in the list we gave it: catch the labels up (no playback calls)
function followChanSpotify(uris){
  if(!chanSpList||chanSpList.token!==chanPlayToken) return false;
  const at=chanSpList.items.findIndex(x=>uris.includes(x.uri));
  if(at<0) return false;
  const step=chanSpList.items[at];
  if(step.idx===chanIdx) return false; // same song: let the end-of-list check below see it
  chanIdx=step.idx; chanSkips=0; dismissStickyToast();
  const pos=chanOrder.indexOf(chanIdx); if(pos>=0) chanOrderPos=pos;
  const it=chanItems[chanIdx];
  renderChanList(); setChanNowPlaying(it,null,null,'spotify'); setChanMediaSession(it);
  return true;
}
// is Spotify still working through our list (so the end of one song isn't the end of playback)?
function chanSpHasMore(){
  if(!chanSpList||chanSpList.token!==chanPlayToken) return false;
  const at=chanSpList.items.findIndex(x=>x.idx===chanIdx);
  return at>=0&&at<chanSpList.items.length-1;
}

let chanLocKey=null;
function startChanProgress(){
  clearInterval(chanProgTimer);
  const tick=async()=>{
    let pos=0,dur=0;
    if(chanVia==='spotify'||spotifyActive){ const st=await spotifyGetState(); spotifyWatch(st, chanVia==='spotify'&&chanPlaying&&spotifyActive); pos=(st?.position||0)/1000; dur=(st?.duration||0)/1000; }
    else if(amActive&&amMusic){ pos=amMusic.currentPlaybackTime||0; dur=amMusic.currentPlaybackDuration||0; }
    else if(ytPlayer?.getCurrentTime){ pos=ytPlayer.getCurrentTime()||0; dur=ytPlayer.getDuration()||0; }
    // near the end of each song, check where you are now (live tracking) so the next one fits
    const key=chanPlayToken+':'+chanIdx;
    if(trackingActive&&dur>20&&dur-pos<=15&&chanLocKey!==key){
      chanLocKey=key;
      freshFix().then(f=>{ if(f&&appMode==='local'&&trackingActive) setListenPoint(f.lat,f.lon,'gps'); });
    }
    document.getElementById('progressTime').textContent=fmt(Math.floor(pos));
    document.getElementById('progressDur').textContent=dur?fmt(Math.floor(dur)):'';
    document.getElementById('progressFill').style.width=dur?Math.min(100,pos/dur*100)+'%':'0%';
  };
  tick(); chanProgTimer=setInterval(tick,1000);
}
function setChanNowPlaying(it,title,sub,via){
  const pl=localPoint?.place;
  const where=isSongList(localChannel)?SONG_LIST_LABEL[localChannel]:localChannel==='made'?'Homegrown around '+(pl?.city||'the pin'):chanGenre&&chanGenre!==CHART_TOP?chanGenre+' mix · '+(pl?.country||''):'Popular in '+(pl?.country||'this country');
  document.getElementById('npTrack').textContent=title||(it?(it.kind==='song'?it.title:(it._song||it.name)):'');
  document.getElementById('npGame').textContent=sub||(it?(it.kind==='song'||it._song?(it.artist||it.name)+' · '+where:(it.genre?it.genre+' · ':'')+where):'');
  const src=document.getElementById('npSource');
  const s2=it?(via==='spotify'||via==='apple'?via:'youtube'):null;
  src.innerHTML=s2?SOURCE_ICONS[s2]:''; src.title=s2?'Playing from '+SOURCE_LABELS[s2]:'';
  document.querySelector('.hero-progress').classList.remove('live');
  if(!it){ document.getElementById('progressTime').textContent='0:00'; document.getElementById('progressDur').textContent=''; document.getElementById('progressFill').style.width='0%'; }
  setPlayIcon(chanPlaying);
  // 5th button: open the song where it plays
  const yb=document.getElementById('npYtBtn');
  const link=it?._yt?.id?'https://www.youtube.com/watch?v='+it._yt.id:it?._yt?.list?'https://www.youtube.com/playlist?list='+it._yt.list
    :/^spotify:(track|artist):/.test(it?._sp||'')?'https://open.spotify.com/'+it._sp.split(':')[1]+'/'+it._sp.split(':')[2]
    :/^https:\/\/music\.apple\.com\//.test(it?._am||'')?it._am:'';
  yb.disabled=!link; yb.title=link.includes('spotify')?'Open in Spotify':link.includes('music.apple.com')?'Open in Apple Music':'Open on YouTube'; yb.setAttribute('aria-label',yb.title);
  yb.onclick=link?()=>window.open(link,'_blank','noopener'):null;
  updateSaveStationBtn();
}
// Homegrown plays an artist: once we know which song is on, show it (player and lock screen)
function showArtistSong(title){
  const it=chanItems[chanIdx]; title=String(title||'').trim().slice(0,160);
  if(!it||it.kind!=='artist'||!title||it._song===title) return;
  it._song=title;
  setChanNowPlaying(it,null,null,chanVia||'youtube'); setChanMediaSession(it);
}
// "Artist - Song (Official Video)" -> "Song"
function cleanVideoTitle(t,artist){
  const raw=String(t||''); let s=raw;
  if(artist) s=s.replace(new RegExp('^\\s*'+artist.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\s*[-–—:|]\\s*','i'),'');
  s=s.replace(/\s*[(\[](official(\s+music)?(\s+(video|audio|lyric video|visuali[sz]er))?|lyrics?|lyric video|audio|hd|hq|4k|visuali[sz]er|remaster(ed)?[^)\]]*)[)\]]/gi,'');
  return s.trim()||raw.trim();
}
function setChanMediaSession(it){
  if(!('mediaSession' in navigator)) return;
  try{
    navigator.mediaSession.metadata=new MediaMetadata({
      title:it.kind==='song'?it.title:(it._song||it.name), artist:it.kind==='song'?it.artist:(it._song?it.name:(it.genre||'Homegrown')),
      album:'MusicMap · '+chanLabel(), artwork:ART_OK.test(it.art||'')?[{src:it.art.replace('100x100bb','512x512bb'),sizes:'512x512'}]
        :COMMONS_OK.test(it.image||'')?[{src:it.image.replace('?width=160','?width=512'),sizes:'512x512'}]:mmLogoArtwork()
    });
    navigator.mediaSession.setActionHandler('play',()=>chanToggle());
    navigator.mediaSession.setActionHandler('pause',()=>chanToggle());
    navigator.mediaSession.setActionHandler('nexttrack',()=>chanStep(1));
    navigator.mediaSession.setActionHandler('previoustrack',()=>chanStep(-1));
  }catch(e){}
}

// ═══════════════════════════════════════════
// SHARE: every channel row has a share button. The link is built on tap:
// it opens MusicMap at the same spot, on the same channel, with that item ready to play.
// ═══════════════════════════════════════════
const SHARE_SHARE_SVG='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';
function shareButton(params,label){
  const b=document.createElement('button'); b.type='button'; b.className='row-btn';
  b.innerHTML=SHARE_SHARE_SVG; b.title='Share'; b.setAttribute('aria-label','Share '+label);
  b.onclick=()=>shareListen(params,label);
  return b;
}
// A single song (saved, or in a saved/shared list): title + artist, plus its YouTube video when known (no lookup needed)
function songShareParams(s){ return {ch:'song', t:s.title, a:s.artist, v:YT_ID.test(s.yt||s._yt?.id||'')?(s.yt||s._yt.id):''}; }
// params: ch + item fields; lat/lon/place for a specific spot (saved spots and stations), else the current pin
function buildShareLink(params){
  const u=new URL(location.href.split('#')[0]);
  [...u.searchParams.keys()].forEach(k=>{ if(/^(mm_|ml_)/.test(k)||['code','state','error','ubi'].includes(k)) u.searchParams.delete(k); });
  const lat=Number.isFinite(params.lat)?params.lat:localPoint?.lat, lon=Number.isFinite(params.lon)?params.lon:localPoint?.lon;
  if(params.ch!=='song'&&Number.isFinite(lat)&&Number.isFinite(lon)){ u.searchParams.set('ml_lat',lat.toFixed(4)); u.searchParams.set('ml_lon',lon.toFixed(4)); }
  u.searchParams.set('ml_ch',params.ch);
  ['st','t','a','g','v'].forEach(k=>{ if(params[k]) u.searchParams.set('ml_'+k,String(params[k]).slice(0,160)); });
  // names for the link preview (the site writes "Listen to <n> near <p>"; the app itself ignores them)
  ['n','p'].forEach(k=>{ if(params[k]) u.searchParams.set('ml_'+k,String(params[k]).slice(0,80)); });
  return u.toString();
}
async function shareListen(params,label){
  if(params.ch!=='song'&&!localPoint&&!Number.isFinite(params.lat)) return;
  const where=params.where||placeLabel(params.place!==undefined?params.place:localPoint?.place)||'this spot'; // a saved station: where it was saved
  const url=buildShareLink(params.ch==='song'?params:{...params,
    n:params.spot?'':label, p:params.spot?label:(where!=='this spot'?where:'')});
  const text=params.ch==='song'?'Listen to '+label+' on MusicMap'
    :params.spot?'Listen around '+label+' on MusicMap'
    :'Listen to '+label+' near '+where+' on MusicMap';
  try{
    if(navigator.share){ await navigator.share({title:'MusicMap',text,url}); return; }
  }catch(e){ if(e&&e.name==='AbortError') return; }
  try{ await navigator.clipboard.writeText(url); spotifyShowSnack('Link copied'); }
  catch(e){ showLocalAlert('Share link', url, [{label:'OK',primary:true}]); }
}
// Opening a shared link: validate everything, then set the pin and channel. Playback still
// waits for a tap (browsers block autoplay), but the shared item is highlighted and ready.
let pendingShare=null;
function readShareLink(){
  const q=new URLSearchParams(location.search);
  if(!q.has('ml_ch')) return false;
  const lat=Number(q.get('ml_lat')), lon=Number(q.get('ml_lon')), ch=q.get('ml_ch');
  const vals={}; ['st','t','a','g','v'].forEach(k=>vals[k]=(q.get('ml_'+k)||'').slice(0,160)); // read before tidying the address
  const clean=k=>vals[k];
  ['ml_lat','ml_lon','ml_ch','ml_st','ml_t','ml_a','ml_g','ml_v','ml_n','ml_p'].forEach(k=>q.delete(k));
  history.replaceState({},'',location.pathname+(q.toString()?'?'+q:'')+location.hash);
  // a single shared song: no place needed, it opens as a one-song list ready to play
  if(ch==='song'){
    const t=clean('t').trim(), a=clean('a').trim(); if(!t||!a) return false;
    pendingShare={ch:'song'};
    localChannel='shared'; chanGenre=null; // not persisted: a reload goes back to the channel
    chanItems=[{kind:'song', title:t, artist:a, _yt:YT_ID.test(clean('v'))?{id:clean('v')}:undefined}];
    chanIdx=-1; chanOrder=[0]; chanOrderPos=0;
    return true;
  }
  if(!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>90||Math.abs(lon)>180||!['popular','made','genres','radio'].includes(ch)) return false;
  const chan=ch==='genres'?'popular':ch; // Genre Mixes now lives inside Popular
  pendingShare={ch:chan, st:RADIO_UUID.test(clean('st'))?clean('st'):'', t:clean('t'), a:clean('a'), g:clean('g')};
  localChannel=chan; ss('localChannel',chan);
  chanGenre=chan==='popular'?(pendingShare.g||(pendingShare.t?CHART_TOP:null)):null;
  localPoint={lat:+lat.toFixed(5),lon:+lon.toFixed(5),source:'pin',place:null}; ss('localPoint',localPoint);
  if(trackingActive) stopTracking();
  mapCenterOnPin=true;
  return true;
}
function applyPendingShare(){
  const ps=pendingShare;
  if(ps?.ch==='song'&&localChannel==='shared'){ // one-song list from a shared link
    pendingShare=null; chanIdx=0; renderChanList(); setChanNowPlaying(chanItems[0],null,'Shared with you · tap play'); switchTab('player'); return;
  }
  if(!ps||ps.ch!==localChannel) return;
  let i=-1;
  if(ps.ch==='radio') i=localStations.findIndex(s=>s.uuid===ps.st);
  // a shared station that isn't near this pin (e.g. saved somewhere else): look it up directly
  if(ps.ch==='radio'&&i<0&&ps.st){
    pendingShare=null;
    radioGet('/json/stations/byuuid/'+ps.st).then(rows=>{
      const st=cleanStations(rows||[],localPoint?.lat||0,localPoint?.lon||0)[0]; if(!st||localChannel!=='radio') return;
      localStations=[{...st,km:null},...localStations.filter(s=>s.uuid!==st.uuid)]; buildRadOrder();
      localIdx=0; renderLocalList(); setLocalNowPlaying(st.name,'Shared with you · tap play'); switchTab('player');
    }).catch(()=>{});
    return;
  }
  else if(ps.ch==='made') i=chanItems.findIndex(x=>x.name===ps.a);
  else i=chanItems.findIndex(x=>x.title===ps.t&&x.artist===ps.a);
  pendingShare=null;
  if(i<0) return;
  if(ps.ch==='radio'){ localIdx=i; renderLocalList(); setLocalNowPlaying(localStations[i].name,'Shared with you · tap play'); }
  else { chanIdx=i; renderChanList(); setChanNowPlaying(chanItems[i],null,'Shared with you · tap play'); }
  switchTab('player');
}

// ── Lock-screen / notification controls (Media Session; also used by the native app later) ──
function setRadioMediaSession(st){
  if(!('mediaSession' in navigator)) return;
  try{
    navigator.mediaSession.metadata=new MediaMetadata({
      title:st.name, artist:'Local Radio', album:placeLabel(localPoint?.place)||'MusicMap',
      artwork:st.favicon?[{src:st.favicon,sizes:'256x256'}]:mmLogoArtwork()
    });
    navigator.mediaSession.setActionHandler('play',()=>localTogglePlay());
    navigator.mediaSession.setActionHandler('pause',()=>radioAudio?.pause());
    navigator.mediaSession.setActionHandler('nexttrack',()=>localStep(1));
    navigator.mediaSession.setActionHandler('previoustrack',()=>localStep(-1));
  }catch(e){}
}
function clearMediaSession(){
  if(!('mediaSession' in navigator)) return;
  try{
    navigator.mediaSession.metadata=null;
    ['play','pause','nexttrack','previoustrack'].forEach(a=>navigator.mediaSession.setActionHandler(a,null));
  }catch(e){}
}


// Start once the whole page is parsed: several dialogs are defined after this script
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
