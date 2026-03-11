const CACHE_NAME = 'etuve-v1';
const PRECACHE = ['/', '/le-programme', '/parcours',
  '/pathologies/v2/gonarthrose', '/pathologies/v2/lombalgie-chronique',
  '/pathologies/v2/insuffisance-veineuse', '/pathologies/v2/bpco',
  '/pathologies/v2/otites-repetition-enfant'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(PRECACHE)));
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || e.request.url.includes('plausible.io')) return;
  e.respondWith(
    fetch(e.request).then((r) => { if (r.ok) { const c = r.clone(); caches.open(CACHE_NAME).then((ca) => ca.put(e.request, c)); } return r; })
    .catch(() => caches.match(e.request).then((r) => r || caches.match('/')))
  );
});
