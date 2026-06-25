// Service worker — кешує застосунок для роботи офлайн.
// Підвищуй версію CACHE при оновленні контенту, щоб користувачі отримали свіжу версію.
const CACHE = "u-gory-v16";
const ASSETS = [
  "./",
  "./index.html",
  "./data.js",
  "./css/base.css",
  "./css/components.css",
  "./css/safety-nav.css",
  "./js/state.js",
  "./js/gear.js",
  "./js/controls.js",
  "./js/render.js",
  "./js/i18n.js",
  "./js/main.js",
  "./manifest.json",
  "./images/icons/favicon.png",
  "./images/icons/icon-192.png",
  "./images/icons/icon-512.png",
  "./images/icons/icon-maskable-512.png",
  "./images/icons/apple-touch-icon.png",
  "./images/routes/parashka.svg",
  "./images/routes/hora_lopata.jpg",
];

self.addEventListener("install", (e) => {
  // НЕ робимо skipWaiting автоматично — новий SW чекає, поки користувач
  // натисне «Оновити» в тості (повідомлення SKIP_WAITING нижче).
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

// Активувати новий SW на вимогу сторінки (кнопка «Оновити»)
self.addEventListener("message", (e) => {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
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
