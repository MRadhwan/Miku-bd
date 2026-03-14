const cacheName = 'miku-bd-v1';
const assets = [
  './',
  './index.html',
  'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Golden%20Brown%20-%20The%20Stranglers.mp3',
  'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Miku_Young.jpg',
  'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Miku_Present.jpg',
  'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/android-chrome-512x512.png',
  './favicon-32x32.png',
  './favicon-16x16.png',
  './apple-touch-icon.png',
  './site.webmanifest'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
