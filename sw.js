const CACHE_NAME = 'miku-birthday-v18';
const ASSETS = [
    './',
    './index.html',
    './site.webmanifest',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Golden%20Brown%20-%20The%20Stranglers.mp3',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Miku_Young.jpg',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Miku_Present.jpg'
];

// Install: Cache everything but DON'T take control yet
// This prevents the page from refreshing automatically the moment it installs
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('V17 Cache opened');
            return cache.addAll(ASSETS);
        })
    );
});

// Activate: Clean up old versions (v16 and below)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('Removing old cache:', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Fetch: Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});

// Manual Skip Waiting:
// This ONLY runs when you click the "Update Ready" button on the website
self.addEventListener('message', (event) => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});
