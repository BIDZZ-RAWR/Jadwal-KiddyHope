const CACHE_NAME = 'shift-schedule-v1.0.0';
const OFFLINE_URL = '/offline.html';

const STATIC_RESOURCES = [
    '/',
    '/index.html',
    '/offline.html',
    '/styles.css',
    '/script.js',
    '/favicon.png',
    '/manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        Promise.all([
            caches.open(CACHE_NAME).then((cache) => {
                return cache.addAll(STATIC_RESOURCES);
            }),
            // Cache offline page separately
            caches.open(CACHE_NAME).then((cache) => {
                return cache.add(OFFLINE_URL);
            })
        ]).then(() => {
            return self.skipWaiting();
        })
    );
});

// Activate Event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== CACHE_NAME)
                    .map((cacheName) => caches.delete(cacheName))
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    // Handle navigation requests
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .catch(() => {
                    return caches.match(OFFLINE_URL);
                })
        );
        return;
    }

    // Handle other requests
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }

                // Clone the request because it's a stream and can only be consumed once
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest)
                    .then((response) => {
                        // Check if valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response because it's a stream and can only be consumed once
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // Return offline page for HTML requests
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match(OFFLINE_URL);
                        }
                    });
            })
    );
});

// Background Sync
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-schedule') {
        event.waitUntil(
            // Implement your sync logic here
            syncSchedule()
        );
    }
});

// Push Notification
self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Lihat Jadwal',
                icon: '/icons/checkmark.png'
            },
            {
                action: 'close',
                title: 'Tutup',
                icon: '/icons/xmark.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Jadwal Shift Update', options)
    );
});

// Notification Click
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Helper Functions
async function syncSchedule() {
    try {
        const response = await fetch('/api/sync-schedule');
        if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put('/api/schedule', response);
        }
    } catch (error) {
        console.error('Sync failed:', error);
    }
}

// Periodic Background Sync
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'update-schedule') {
        event.waitUntil(syncSchedule());
    }
});

// Share Target
self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/share-target/')) {
        // Handle share target here
    }
});