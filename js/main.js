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
}
tabButtons.forEach((b) =>
  b.addEventListener("click", () => showTab(b.dataset.tab)),
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
