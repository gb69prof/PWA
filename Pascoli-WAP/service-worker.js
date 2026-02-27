/* Pascoli01 PWA Service Worker */
const CACHE_VERSION = 'v1.0.0';
const PRECACHE = `pascoli-precache-${CACHE_VERSION}`;
const RUNTIME = `pascoli-runtime-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  "./apple-touch-icon.png",
  "./icon-512.png",
  "./icon-192.png",
  "./offline.html",
  "./manifest.json",
  "./",
  "./Index1.html",
  "./approfondimenti/fiore.html",
  "./digitale/digitale.html",
  "./forma.html",
  "./gelsomino/gelsomino.html",
  "./index.html",
  "./mondo.html",
  "./poetica.html",
  "./simbolismo.html",
  "./test/test-digitale.html",
  "./test/test-forma.html",
  "./test/test-gelsomino.html",
  "./test/test-immagine.html",
  "./test/test-poetica.html",
  "./test/test-simbolismo.html",
  "./testi/x-agosto.html",
  "./vita.html",
  "./mondo.css",
  "./gelsomino/script.js"
];

// Install: precache app shell
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(PRECACHE).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

// Activate: cleanup old caches + claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((k) => ![PRECACHE, RUNTIME].includes(k))
        .map((k) => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

// Allow page to trigger skipWaiting when update is ready
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

const isHTML = (request) => request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html');
const isStaticAsset = (url) => (
  url.pathname.match(/\.(?:css|js|png|jpg|jpeg|gif|svg|webp|ico)$/i) ||
  url.pathname.match(/\.(?:woff2?|ttf|otf)$/i) ||
  url.pathname.match(/\.(?:pdf)$/i) ||
  url.pathname.match(/\.(?:glb|gltf)$/i)
);

// Fetch strategies:
// - HTML: network-first with offline fallback
// - Static assets: cache-first
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only handle same-origin
  if (url.origin !== self.location.origin) return;

  if (isHTML(event.request)) {
    event.respondWith((async () => {
      try {
        const networkResp = await fetch(event.request);
        const cache = await caches.open(RUNTIME);
        cache.put(event.request, networkResp.clone());
        return networkResp;
      } catch (e) {
        const cached = await caches.match(event.request);
        return cached || caches.match('./offline.html');
      }
    })());
    return;
  }

  if (isStaticAsset(url)) {
    event.respondWith((async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      try {
        const resp = await fetch(event.request);
        const cache = await caches.open(RUNTIME);
        cache.put(event.request, resp.clone());
        return resp;
      } catch (e) {
        return cached;
      }
    })());
  }
});
