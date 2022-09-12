const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// install sw
self.addEventListener('install', (event) => {
    // wait untill caches are added
    event.waitUntill(
        // open a chache with cache name that returns a cache promise
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                // add to cache
                return cache.addAll(urlsToCache)
            })
    );
});

// listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                console.log('in success', event.request)
                return fetch(event.request) 
                    .catch(() => {
                        console.log('in error')
                        return caches.match('offline.html')
                    })
            })
    )
});

// activate sw
self.addEventListener('activate', (event) => {
    // on activate we want to remove all old cache versions
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    // wait untill caches delete resolve
    event.waitUntill(
        // get all cache keys as a promise
        caches.keys()
            .then(chacheNames => {
                // delete all caches that are not on the white list
                return Promise.all(chacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                }))
            })
    );
});

