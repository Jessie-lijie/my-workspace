const CACHE_NAME = "workbench-v4";

const FILES = [
  "/",
  "/index.html",
  "/style.css",
  "/manifest.json"
];


// 安装
self.addEventListener("install", event => {

  self.skipWaiting();

  event.waitUntil(

    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(FILES))

  );

});



// 激活
self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys()
    .then(keys => {

      return Promise.all(

        keys.map(key => {

          if(key !== CACHE_NAME){

            return caches.delete(key);

          }

        })

      );

    })

  );

  self.clients.claim();

});



// 网络优先
self.addEventListener("fetch", event => {

  event.respondWith(

    fetch(event.request)
    .catch(()=>{

      return caches.match(event.request);

    })

  );

});
