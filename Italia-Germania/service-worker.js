const CACHE_VERSION = 'v1.0.0';
const PRECACHE = `precache-${CACHE_VERSION}`;
const RUNTIME = `runtime-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  './',
  './index.html',
  './lezione.html',
  './offline.html',
  './manifest.json',
  './assets/css/style.css',
  './assets/js/pwa.js',
  './assets/js/lezione.js',
  './assets/img/copertina.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-180.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(PRECACHE).then((cache) => cache.addAll(PRECACHE_URLS)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => (![PRECACHE, RUNTIME].includes(k) ? caches.delete(k) : null)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

function isHTML(request){
  return request.mode === 'navigate' || (request.headers.get('accept')||'').includes('text/html');
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (isHTML(request)) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        const cache = await caches.open(RUNTIME);
        cache.put(request, fresh.clone());
        return fresh;
      } catch (e) {
        return (await caches.match(request)) || (await caches.match('./offline.html'));
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const resp = await fetch(request);
      const cache = await caches.open(RUNTIME);
      cache.put(request, resp.clone());
      return resp;
    } catch (e) {
      return cached || Response.error();
    }
  })());
});
