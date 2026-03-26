const CACHE_VERSION = 'locandiera-pwa-v1';
const SHELL_CACHE = `shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;
const OFFLINE_URL = './offline.html';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './trama.html',
  './personaggi.html',
  './fabrizio.html',
  './soliloquio.html',
  './vocabolario.html',
  './nobilta.html',
  './offline.html',
  './manifest.json',
  './pwa.js',
  './assets/css/style.css',
  './assets/js/app.js',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/apple-touch-icon.png',
  './assets/images/mirandolina-ritratto.png',
  './assets/images/trama-mappa.png',
  './assets/images/personaggi-mappa.png',
  './assets/images/perche-fabrizio.png',
  './assets/images/soliloquio-mappa.png',
  './assets/images/nobilta-toga-spada.png',
  './assets/docs/Lezione-su-la-Locandiera.pdf'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(SHELL_CACHE).then((cache) => cache.addAll(PRECACHE_ASSETS)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => ![SHELL_CACHE, RUNTIME_CACHE].includes(name)).map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const network = await fetch(request);
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(request, network.clone());
        return network;
      } catch {
        return (await caches.match(request)) || (await caches.match(OFFLINE_URL));
      }
    })());
    return;
  }

  const assetPattern = /\.(?:png|jpg|jpeg|gif|webp|svg|pdf|glb|gltf|woff2?|ttf|otf)$/i;
  const isYouTubeEmbed = /(^|\.)youtube\.com$|(^|\.)youtube-nocookie\.com$|(^|\.)ytimg\.com$/i.test(url.hostname);

  if (assetPattern.test(url.pathname) || isYouTubeEmbed) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request, { mode: request.mode, credentials: request.credentials, cache: 'no-cache' });
        if (response && response.ok && !isYouTubeEmbed) {
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(request, response.clone());
        }
        return response;
      } catch {
        return cached || Response.error();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response && response.ok && url.origin === self.location.origin) {
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(request, response.clone());
      }
      return response;
    } catch {
      return cached || Response.error();
    }
  })());
});
