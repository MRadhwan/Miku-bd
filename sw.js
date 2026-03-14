const CACHE_NAME = 'miku-birthday-v7';
const ASSETS = [
    './',
    './index.html',
    './apple-touch-icon.png',
    './favicon-32x32.png',
    './favicon-16x16.png',
    './site.webmanifest',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Golden%20Brown%20-%20The%20Stranglers.mp3',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Miku_Young.jpg',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Miku_Present.jpg',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/android-chrome-512x512.png'
];

// Install Event - Caching the new v7 assets
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Forces the waiting service worker to become active immediately
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Activate Event - Cleaning up ALL old caches (v1-v6)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing Old Cache', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Takes control of the page immediately
    );
});

// Fetch Event - Serving assets from cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
