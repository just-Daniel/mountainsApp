// state.js — дані/мова, service worker, helpers, стан, базові функції gear
// Класичний скрипт (не модуль): усі файли ділять спільний глобальний скоуп,
// тож порядок підключення в index.html важливий. Працює і через file://.
"use strict";

const DATA = window.MOUNTAIN_DATA;

/* ---------- SERVICE WORKER ----------
   На справжньому хостингу (https) — реєструємо для офлайну.
   Локально (localhost / file://) — НЕ реєструємо, а наявний SW і кеш
   прибираємо: інакше під час розробки браузер віддає застарілий вміст
   (звідси бувала помилка «Не вдалося завантажити контент»).
   Має стояти ДО перевірки даних нижче, щоб самоочищення спрацювало
   навіть коли з кешу прийшов зламаний data.js. */
(function manageSW() {
  if (!("serviceWorker" in navigator)) return;
  const h = location.hostname;
  const dev =
    location.protocol === "file:" ||
    h === "localhost" ||
    h === "127.0.0.1" ||
    h === "" ||
    /^192\.168\./.test(h) ||
    /^10\./.test(h);
  if (dev) {
    const hadCtrl = !!navigator.serviceWorker.controller;
    Promise.all([
      navigator.serviceWorker
        .getRegistrations()
        .then((rs) => Promise.all(rs.map((r) => r.unregister()))),
      window.caches
        ? caches
            .keys()
            .then((ks) => Promise.all(ks.map((k) => caches.delete(k))))
        : null,
    ]).then(() => {
      // Якщо сторінку контролював старий SW — одноразово перезавантажуємо,
      // щоб отримати свіжі файли вже без нього.
      if (hadCtrl && !sessionStorage.getItem("sw-cleaned")) {
        sessionStorage.setItem("sw-cleaned", "1");
        location.reload();
      }
    });
    return;
  }
  // Якщо сторінку вже контролює SW — нова версія активується сама
  // (skipWaiting) і ми один раз перезавантажуємось, щоб підхопити свіжі
  // ассети. На першому візиті контролера ще немає → зайвого reload не буде.
  if (navigator.serviceWorker.controller) {
    let reloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloaded) return;
      reloaded = true;
      location.reload();
    });
  }
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
})();

function esc(s) {
  return String(s).replace(
    /[&<>]/g,
    (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[m],
  );
}
function escAttr(s) {
  return esc(s).replace(/"/g, "&quot;");
}
// esc + проста розмітка **жирний**
function fmt(s) {
  return esc(s).replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
}

/* ---------- STATE ---------- */
const LS_CHECKED = "gory-pack-v2",
  LS_DAY = "gory-day-v1",
  LS_SEASON = "gory-season-v1",
  LS_LANG = "gory-lang-v1";
let lang = localStorage.getItem(LS_LANG) || "uk";
if (!DATA || !DATA[lang]) lang = "uk";
let D = DATA ? DATA[lang] : undefined; // активна мова; перепризначається в setLang
let day = localStorage.getItem(LS_DAY) || "1";
let season = localStorage.getItem(LS_SEASON) || "warm";
let checked = loadChecked();
function loadChecked() {
  try {
    return JSON.parse(localStorage.getItem(LS_CHECKED)) || {};
  } catch (e) {
    return {};
  }
}
function saveChecked() {
  localStorage.setItem(LS_CHECKED, JSON.stringify(checked));
}
// Ключі — за ПОЗИЦІЄЮ (день|індекс категорії|індекс пункту), не за текстом,
// щоб галочки зберігалися при перемиканні мови.
function keyOf(d, ci, ii) {
  return d + "|" + ci + "|" + ii;
}
function norm(it) {
  return typeof it === "string" ? { n: it } : it;
}

/* ---------- GEAR ---------- */
const gearEl = document.getElementById("gear");
// Стан перегляду (не зберігається — скидається при відкритті):
//   filter: "all" усі · "must" лише необхідне · "opt" лише опційне
//   hidePacked: показувати лише ще не зібране
//   catState: ручне згортання категорій (catKey -> "open" | "closed")
let filter = "all";
let hidePacked = false;
const catState = {};
function catKey(ci) {
  return day + "|c" + ci;
}
// Видимі категорії з їх СТАЛИМ індексом у повному масиві дня (ci)
function visibleCats() {
  const out = [];
  D.gear[day].forEach((c, ci) => {
    if (!c.season || season === "cold") out.push({ c: c, ci: ci });
  });
  return out;
}
// Пункти категорії з фільтром; зберігаємо сталий індекс пункту (ii)
function itemsFor(c) {
  return c.items
    .map((it, ii) => ({ it: norm(it), ii: ii }))
    .filter((x) =>
      filter === "all" ? true : filter === "opt" ? !!x.it.opt : !x.it.opt,
    );
}
const TICK =
  '<span class="tick"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg></span>';
const CHEV =
  '<span class="chev" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span>';
