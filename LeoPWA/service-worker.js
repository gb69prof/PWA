
const CACHE_NAME = 'eco-leopardi-v1';
const APP_SHELL = [
  "index.html",
  "style.css",
  "script.js",
  "glossario.js",
  "manifest.json",
  "quiz.html",
  "video.html",
  "schemi.html",
  "conclusione.html",
  "biografia.html",
  "leopardi-romanticismo.html",
  "filosofia.html",
  "sensismo.html",
  "meccanicismo.html",
  "stoicismo.html",
  "pessimismo-storico.html",
  "poetica.html",
  "infinito.html",
  "pessimismo-cosmico.html",
  "presa-coscienza.html",
  "sconforto.html",
  "saffo.html",
  "bruto.html",
  "titanismo.html",
  "assets/images/bruto.webp",
  "assets/images/filosofia.webp",
  "assets/images/idillio.webp",
  "assets/images/infinito.webp",
  "assets/images/Islandese-Natura.webp",
  "assets/images/leopardi_ritratto.webp",
  "assets/images/leopardi_romanticismo.webp",
  "assets/images/meccanicismo.webp",
  "assets/images/pessimismo-cosmico.webp",
  "assets/images/pessimismo-storico.webp",
  "assets/images/poetica-vago-indefinito.webp",
  "assets/images/saffo.webp",
  "assets/images/sconforto.webp",
  "assets/images/sensismo.webp",
  "assets/images/teoria-visione-suono.webp",
  "assets/images/titanismo.webp",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/icons/apple-touch-icon.png",
  "assets/icons/favicon.png"
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return resp;
    }).catch(() => caches.match('index.html')))
  );
});
