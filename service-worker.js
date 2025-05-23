// Nama cache untuk versioning
const CACHE_NAME = 'kiddyhope-cache-v2';

// Daftar file dan sumber daya yang akan di-cache
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    '/favicon.png',
    '/favicon.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/main.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    'https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/main.min.js'
];

// Event: Install
// Menyimpan file ke cache saat service worker diinstal
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching files');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Cache installation failed:', error);
            })
    );
    // Langsung aktifkan service worker tanpa menunggu reload
    self.skipWaiting();
});

// Event: Activate
// Membersihkan cache lama jika ada perubahan versi
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            console.log('Service worker activated');
            return self.clients.claim();
        })
        .catch(error => {
            console.error('Activation failed:', error);
        })
    );
});

// Event: Fetch
// Menangani permintaan jaringan dengan strategi cache-first
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Kembalikan dari cache jika ada
                if (response) {
                    return response;
                }
                // Jika tidak ada di cache, ambil dari jaringan
                return fetch(event.request)
                    .then(networkResponse => {
                        // Cache respons baru untuk permintaan GET
                        if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
                            return caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, networkResponse.clone());
                                return networkResponse;
                            });
                        }
                        return networkResponse;
                    })
                    .catch(error => {
                        console.error('Fetch failed:', error);
                        // Kembalikan index.html untuk navigasi offline
                        if (event.request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }
                    });
            })
            .catch(error => {
                console.error('Cache match failed:', error);
            })
    );
});