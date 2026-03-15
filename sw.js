const CACHE_NAME = 'miku-birthday-v16';
const ASSETS = [
    './',
    './index.html',
    './site.webmanifest',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Golden%20Brown%20-%20The%20Stranglers.mp3',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Miku_Young.jpg',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Miku_Present.jpg'
];

// 1. Install: Force immediate activation
self.addEventListener('install', (event) => {
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

// 2. Activate: Clear ALL old caches and take control
self.addEventListener('activate', (event) => {
    event.waitUntil(
        Promise.all([
            caches.keys().then((keys) => {
                return Promise.all(
                    keys.map((key) => {
                        if (key !== CACHE_NAME) return caches.delete(key);
                    })
                );
            }),
            self.clients.claim() // Take control of open pages immediately
        ])
    );
});

// 3. Fetch: Network-first approach (Optional, but better for updates)
// If you want it super aggressive, we check the network first. 
// If offline, it falls back to cache.
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});

// Message listener for the manual refresh button
self.addEventListener('message', (event) => {
    if (event.data === 'skipWaiting') self.skipWaiting();
});
