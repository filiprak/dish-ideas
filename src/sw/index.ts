/// <reference lib="webworker" />

const CACHE_NAME = `dish-ideas-v1`;

function log(msg: string, ...args: unknown[]) {
    console.log(`[sw.js] ${msg}`, ...args)
}

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', (event: ExtendableEvent) => {
    log('installed', import.meta.env.VITE_VERSION);

    event.waitUntil((async () => {
        const cache = await caches.delete(CACHE_NAME);
        // const cache = await caches.open(CACHE_NAME);
        // cache.addAll([
        //     '/',
        //     '/converter.js',
        //     '/converter.css'
        // ]);
    })());
});

self.addEventListener('fetch', (event: FetchEvent) => {
    log('fetch', event.request.url);

    // event.respondWith((async () => {
    //     const cache = await caches.open(CACHE_NAME);

    //     // Get the resource from the cache.
    //     const cachedResponse = await cache.match(event.request);
    //     if (cachedResponse) {
    //         return cachedResponse;
    //     } else {
    //         try {
    //             // If the resource was not in the cache, try the network.
    //             const fetchResponse = await fetch(event.request);

    //             // Save the resource in the cache and return it.
    //             // cache.put(event.request, fetchResponse.clone());
    //             return fetchResponse;
    //         } catch (e) {
    //             // The network failed.
    //         }
    //     }
    // })());
});
