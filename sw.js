const cacheName = 'miku-bd-v6'; 
const assets = [
  './',
  './index.html',
  './site.webmanifest',
  './favicon-16x16.png',
  './favicon-32x32.png',
  './apple-touch-icon.png',
  'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Golden%20Brown%20-%20The%20Stranglers.mp3',
  'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Miku_Young.jpg',
  'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Miku_Present.jpg'
];

// 1. Install Event - Force the new Service Worker to activate immediately
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Caching assets for v5');
      return cache.addAll(assets);
    })
  );
  // This skips the "waiting" phase and activates the new SW as soon as it's finished installing
  self.skipWaiting();
});

// 2. Activate Event - Clean up old caches and take control of the page
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      );
    })
  );
  // This allows the Service Worker to start controlling the page immediately without a manual refresh
  return self.clients.claim();
});

// 3. Fetch Event - Serve assets from cache
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
