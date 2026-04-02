const CACHE = 'foscolo-v2';
const ASSETS = [
  './index.html','./style.css','./app.js','./manifest.json',
  './icons/icon-192.svg','./icons/icon-512.svg',
  './images/ritratto.jpg','./images/schema_poetica.jpg',
  './images/neoclassicismo.jpg','./images/preromanticismo.jpg',
  './images/foscolo_parini.jpg',
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap'
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).catch(()=>caches.match('./index.html'))));
});
