const VERSION = 'v1.0.0';
const PRECACHE = `precache-${VERSION}`;
const RUNTIME = `runtime-${VERSION}`;

const PRECACHE_URLS = [
  './',
  './index.html',
  './lezione.html',
  './vocabolario.html',
  './approfondimenti.html',
  './offline.html',
  './manifest.json',
  './assets/css/app.css',
  './assets/js/app.js',
  './assets/js/pwa.js',
  './assets/img/copertina.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-180.png',
  './assets/icons/favicon-32.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async ()=>{
    const cache = await caches.open(PRECACHE);
    await cache.addAll(PRECACHE_URLS);
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async ()=>{
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => ![PRECACHE, RUNTIME].includes(k)).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

function isNav(req){
  return req.mode === 'navigate' ||
    (req.method === 'GET' && (req.headers.get('accept')||'').includes('text/html'));
}

async function networkFirst(req){
  const cache = await caches.open(RUNTIME);
  try{
    const fresh = await fetch(req);
    cache.put(req, fresh.clone());
    return fresh;
  }catch(_){
    const cached = await cache.match(req);
    return cached || caches.match('./offline.html');
  }
}
async function cacheFirst(req){
  const cached = await caches.match(req);
  if(cached) return cached;
  const cache = await caches.open(RUNTIME);
  const fresh = await fetch(req);
  cache.put(req, fresh.clone());
  return fresh;
}
async function swr(req){
  const cache = await caches.open(RUNTIME);
  const cached = await cache.match(req);
  const fetchPromise = fetch(req).then(fresh=>{
    cache.put(req, fresh.clone());
    return fresh;
  }).catch(()=>null);
  return cached || (await fetchPromise) || caches.match('./offline.html');
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  if (isNav(req)) { event.respondWith(networkFirst(req)); return; }

  const dest = req.destination;

  if (dest === 'image') { event.respondWith(swr(req)); return; }
  if (dest === 'font') { event.respondWith(cacheFirst(req)); return; }
  if (dest === 'script' || dest === 'style') { event.respondWith(swr(req)); return; }

  if (/\.(pdf|glb|gltf|bin|mp4|webm|mp3|wav|ogg)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(req)); return;
  }

  event.respondWith(swr(req));
});
