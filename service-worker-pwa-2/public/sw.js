const CACHE_NAME = 'v1';
const CACHED_FILES = [
    'static/js/bundle.js',
    'index.html',
    '/',
    '/users',
    '/about',
];
const self = this;

self.addEventListener('install', (event) => {
    event.waitUntill && event.waitUntill(
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(CACHED_FILES)
        })
    );
    
});

self.addEventListener('fetch', (event) => {
    console.log('IN FETCH')
    if (!navigator.onLine) {
    console.log('IN OFFLINE', event.reques)

        event.respondWith && event.respondWith(
            caches.match(event.request).then(res => {
    console.log('IN MATCH', res)

                if (res) {
    console.log('IN RETURN MATCHED')

                    return res
                }
                // let requestUrl = event?.request?.colne();
                // fetch(requestUrl);
            })
        );
    }
})

// activate sw
self.addEventListener('activate', (event) => {
    // on activate we want to remove all old cache versions
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    // wait untill caches delete resolve
    event.waitUntill && event.waitUntill(
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