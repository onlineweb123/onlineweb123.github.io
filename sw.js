const CACHE_NAME = 'cuddalore-connect-v1';
const ASSETS = [
  'index.html',
  'about.html',
  'AC-Mechanic.html',
  'Plumber.html',
  'buss%20time.html',
  'contact%20us.html',
  'contact.html',
  'disclaimer.html',
  'electrician.html',
  'emergency.html',
  'fridge.html',
  'places.html',
  'privacy%20policy.html',
  'store%20list.html',
  'taxi.html',
  'test.html',
  'web.html',
  'manifest.json',
  'icon-128x128.png',
  'icon-144x144.png',
  'icon-152x152.png',
  'icon-192x192.png',
  'icon-256x256.png',
  'icon-512x512.png'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching all assets');
      return cache.addAll(ASSETS);
    })
  );
});

// Fetching Assets
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate & Cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
