// Service worker — кешує застосунок для роботи офлайн.
// Підвищуй версію CACHE при оновленні контенту, щоб користувачі отримали свіжу версію.
const CACHE = "u-gory-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./data.js",
  "./manifest.json",
  "./favicon.png",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png",
  "./images/parashka.svg",
  "./images/hoverla.svg",
  "./images/pip-ivan.svg",
  "./images/synevyr.svg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  // Зовнішні ресурси (прев'ю YouTube тощо) не кешуємо
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Навігація: спершу мережа, при невдачі — кеш (офлайн)
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).catch(() => caches.match("./index.html")));
    return;
  }

  // Локальні файли: спершу кеш, потім мережа
  e.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req)
          .then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
            return res;
          })
          .catch(() => hit),
    ),
  );
});
