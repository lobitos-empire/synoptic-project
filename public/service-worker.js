'use strict';

//Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1';

//List of files to cache locally
const FILES_TO_CACHE = [
    '/',
    '/tourist',
    '/attractions',
    '/business',
    '/explore',
    '/hotels',
    '/localBusiness',
    '/upload',
    '/styles/style.css',
    '/styles/spectre.min.css',
    '/styles/spectre.icon.css',
    '/styles/mdtoast.min.css',
    '/scripts/translations.json',
    '/scripts/business.js',
    '/scripts/loadingBusiness.js',
    '/scripts/main.js',
    '/scripts/mdtoast.min.js',
    '/scripts/service-worker-init.js',
    '/scripts/tourist.js',
    '/manifest.webmanifest'



];

//Launch when install button clicked
self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

//Wait for activate event
self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    // CODELAB: Remove previous cached data from disk.
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});


//Wait for fetch event
self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
//Add fetch event handler here.
    if (evt.request.mode !== 'navigate') {
        // Not a page navigation, bail.
        return;
    }
    evt.respondWith(
        fetch(evt.request)
            .catch(() => {
                return caches.open(CACHE_NAME)
                    .then((cache) => {
                        return cache.match(evt.request);
                    });
            })
    );
});