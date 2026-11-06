// main.js — вкладки, перевірка даних і запуск (підключати ОСТАННІМ)
// Класичний скрипт (не модуль): усі файли ділять спільний глобальний скоуп,
// тож порядок підключення в index.html важливий. Працює і через file://.
"use strict";

/* ---------- TABS ---------- */
const tabButtons = document.querySelectorAll(".dock button");
const sections = document.querySelectorAll("main > section");
const controls = document.getElementById("controls");
function showTab(name) {
  sections.forEach((s) => s.classList.toggle("active", s.id === name));
  tabButtons.forEach((b) =>
    b.setAttribute(
      "aria-current",
      b.dataset.tab === name ? "true" : "false",
    ),
  );
  controls.style.display = name === "gear" ? "" : "none";
  window.scrollTo(0, 0);
  setControlsCollapsed(false);
  scrollAnchorY = 0;
}
tabButtons.forEach((b) =>
  b.addEventListener("click", () => showTab(b.dataset.tab)),
);

/* ---------- СТИСКАННЯ ПЕРЕМИКАЧА ДНІВ/СЕЗОНУ ПРИ СКРОЛІ ----------
   На «Рюкзаку» при скролі вниз ховаємо день/зимове спорядження, щоб
   список речей мав більше місця; при скролі вгору (чи вгорі сторінки)
   повертаємо назад.
   Поріг (24px від точки останнього перемикання) + коротке блокування
   одразу після перемикання — це гасить "тряску": без них зміна висоти
   липкого блока під час анімації сама породжує дрібні scroll-події,
   які миттю перемикали клас туди-сюди. */
let scrollAnchorY = window.scrollY;
let scrollTicking = false;
let collapseLocked = false;
function setControlsCollapsed(collapsed) {
  if (controls.classList.contains("collapsed") === collapsed) return;
  controls.classList.toggle("collapsed", collapsed);
  collapseLocked = true;
  setTimeout(() => {
    collapseLocked = false;
  }, 320);
}
function updateControlsOnScroll() {
  const y = window.scrollY;
  if (controls.style.display !== "none" && !collapseLocked) {
    if (y <= 8) {
      setControlsCollapsed(false);
      scrollAnchorY = y;
    } else if (y - scrollAnchorY > 24) {
      setControlsCollapsed(true);
      scrollAnchorY = y;
    } else if (scrollAnchorY - y > 24) {
      setControlsCollapsed(false);
      scrollAnchorY = y;
    }
  }
  scrollTicking = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!scrollTicking) {
      requestAnimationFrame(updateControlsOnScroll);
      scrollTicking = true;
    }
  },
  { passive: true },
);

/* ---------- INIT ---------- */
if (!DATA || !DATA.uk || !DATA.uk.gear) {
  document.getElementById("gear").innerHTML =
    '<div class="info info--warn"><b>Не вдалося завантажити контент (data.js).</b> ' +
    "Переконайся, що файл <b>data.js</b> лежить поряд з index.html.</div>";
} else {
  /* ---------- INIT ---------- */
  d1.setAttribute("aria-pressed", day === "1");
  d2.setAttribute("aria-pressed", day === "2");
  renderAll(); // applyStrings + усі розділи + setSeason(→renderGear)
  showTab("gear");
}
