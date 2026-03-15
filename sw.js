const CACHE_NAME = 'miku-birthday-v27';
const ASSETS = [
    './',
    './index.html',
    './site.webmanifest',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Golden%20Brown%20-%20The%20Stranglers.mp3',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Miku_Young.jpg',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Miku_Present.jpg'
];

// Install: Cache assets and skip waiting to activate immediately
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log(CACHE_NAME + ' opened');
            return cache.addAll(ASSETS);
        }).then(() => {
            // Forces the waiting service worker to become the active service worker
            return self.skipWaiting();
        })
    );
});

// Activate: Clean up old versions and take control of all tabs immediately
self.addEventListener('activate', (event) => {
    event.waitUntil(
        Promise.all([
            // Delete old caches (anything that isn't v27)
            caches.keys().then((keys) => {
                return Promise.all(
                    keys.map((key) => {
                        if (key !== CACHE_NAME) {
                            console.log('Removing old cache:', key);
                            return caches.delete(key);
                        }
                    })
                );
            }),
            // Allows the service worker to take control of pages without a reload
            self.clients.claim()
        ])
    );
});

// Fetch: Network-first approach with cache fallback
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});

// Manual Skip Waiting listener:
self.addEventListener('message', (event) => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});
