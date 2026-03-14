const CACHE_NAME = 'miku-birthday-v11';
const ASSETS = [
    './',
    './index.html',
    './apple-touch-icon.png',
    './favicon-32x32.png',
    './favicon-16x16.png',
    './site.webmanifest',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Golden%20Brown%20-%20The%20Stranglers.mp3',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Miku_Young.jpg',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Miku_Present.jpg'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
        return;
    }
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
