const CACHE_NAME = 'miku-birthday-v500'; 
const ASSETS = [
    './',
    './index.html',
    './site.webmanifest',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/The%20Stranglers%20-%20Golden%20Brown%2C%201981%20(HQ%20Instrumental)%20%2B%20Lyrics%20-%20Lunytunes62.mp3',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/love%20story%20(Instrumental)%20-%20indila%20%5Bedit%20audio%5D%20-%20Bgm%20Spice.mp3',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Miku_Young.jpg',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/Miku_Present.jpg',
    'https://raw.githubusercontent.com/MRadhwan/Miku-bd/main/android-chrome-512x512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

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
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});

self.addEventListener('message', (event) => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});
