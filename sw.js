const cacheName = 'miku-bd-v4'; // Bumped to v4 to force the lock screen update
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

// Install Service Worker
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Caching all assets for v4');
      return cache.addAll(assets);
    })
  );
});

// Activate & Cleanup Old Caches (This is what clears v3)
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Fetching assets
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
