const cacheName='v2';



//INSTALL
self.addEventListener('install', e=>{
    console.log('Service Worker: installed');
});

//ACTIVATE
self.addEventListener('activate', e=>{
    console.log('Service Worker: Activated');

});

//FETCH EVENT
self.addEventListener('fetch', e=>{
    console.log('service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
            .then(res =>{
                //make clone of response
                const resClone = res.clone();

                //open clone
                caches
                    .open(cacheName)
                    .then(cache =>{
                        //add response to cache
                        cache.put(e.request, resClone);
                    } );
                return res;    
            }).catch(err=> caches.match(e.request).then(res => res))
        );
});
