const CACHE_NAME = 'miku-birthday-v200';
const ASSETS = [
    './',
    './index.html',
    './site.webmanifest',
    // Main Song
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/The%20Stranglers%20-%20Golden%20Brown%2C%201981%20(HQ%20Instrumental)%20%2B%20Lyrics%20-%20Lunytunes62.mp3',
    // Grandma Mode Song
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/love%20story%20(Instrumental)%20-%20indila%20%5Bedit%20audio%5D%20-%20Bgm%20Spice.mp3',
    // Images
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Miku_Young.jpg',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Miku_Present.jpg',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/android-chrome-512x512.png'
];

// 1. Install: Download everything to the phone's storage
self.addEventListener('install', (event) => {
    // skipWaiting() is NOT here. This allows the "Manual" banner to work.
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching assets for version: ' + CACHE_NAME);
            return cache.addAll(ASSETS);
        })
    );
});

// 2. Activate: Clean up old versions so Miku's phone doesn't get cluttered
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// 3. Fetch: Load from Cache first for speed, then try Network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// 4. THE MANUAL TRIGGER:
// This listens for your HTML button's 'skipWaiting' message
self.addEventListener('message', (event) => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});
