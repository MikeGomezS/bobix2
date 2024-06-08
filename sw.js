const STATIC_CACHE = "static-v1";

const APP_SHELL = [
  "/",
  "index.html",
  "editar-persona.html",
  "nueva-persona.html",
  "ver-persona.html",
  "css/tailwind.min.css",
  "js/app.js",
  "js/editarpersona.js",
  "js/nuevapersona.js",
  "js/verpersona.js",
  "js/script.js",
  "img/bobix.png",
];

self.addEventListener("install", (e) => {
  const cacheStatic = caches
    .open(STATIC_CACHE)
    .then((cache) => cache.addAll(APP_SHELL));

  e.waitUntil(cacheStatic);
});

self.addEventListener("fetch", (e) => {
  console.log("fetch! ", e.request);
  e.respondWith(
    caches
      .match(e.request)
      .then((res) => {
        return res || fetch(e.request);
      })
      .catch(console.log)
  );
  //   e.waitUntil(response);
});
