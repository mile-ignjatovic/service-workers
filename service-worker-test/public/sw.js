// ovde se radi precaching i url cacheing

const cacheName = 'myCacheV1';
// pages/assets to cache
// const cachedAssets = [
//     '/index.html'
// ]

// install event
// here i can precache files
self.addEventListener('install', (e) => {
    console.log('Service worker: Install');
    // // wait untill the install is done
    // e.waitUntill && e.waitUntill(
    //     // open a cache in storage
    //     caches.open(cacheName)
    //         .then((cache) => {
    //             // add cached files (precache)
    //             cache.addAll(cachedAssets)
    //         })
    //         .then(() => 
    //             // TODO: check why this is here. why am i skiping wait?
    //             self.skipWaiting()
    //         )
    // )   
})

// activate event
self.addEventListener('activate', (e) => {
    console.log('Service worker: Activate');
    // after activate we can remove old cache
    // waitUntill takes a promise
    e.waitUntill && e.waitUntill(
        // caches is the cache object in the browser
        // caches.keys returns all cache names
        caches.keys().then(cacheNames => {
            // have to return a promise because of waitUntill
            return Promise.all(
                // map through cacheNames and return caches.delete promise to remove all unused caches
                cacheNames.map((cache) => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                }))
        })
    );
})

// do something with cached files
self.addEventListener('fetch', (e) => {
    console.log('Service worker: Fetch');
    // TODO: test with cached files. dono how to do it in react
    // e.respondWith && e.respondWith(e.request).then((res) => {
    //     console.log('in then of fetch request')
    //     return res
    // }).catch(error => {
    //     console.log('in error of fetch', error)
    // })
    e.respondWith && e.respondWith(
        // we refetch the request i guess
        fetch(e.request)
            .then(res => {
                console.log('Service worker: returning original response')
                // we clone the response so that we can add it to cache later
                const resClone = res.clone();
                // open a cache entry
                caches.open(cacheName)
                    .then(cache => {
                        // add cloned response to cache
                        cache.put(e.request, resClone);
                    })
                // if everything is ok return original response
                return res
        }).catch(err => {
            console.log('Service worker: returning cached response')
            // if in error (offline or any other err) return cached response
            return caches.match(e.request).then(res => res)
        })
        )
})