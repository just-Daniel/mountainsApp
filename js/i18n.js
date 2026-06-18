// i18n.js — застосування рядків мови, renderAll, перемикач мови
// Класичний скрипт (не модуль): усі файли ділять спільний глобальний скоуп,
// тож порядок підключення в index.html важливий. Працює і через file://.
"use strict";

/* ---------- I18N: статичні рядки + перемикач мови ---------- */
function applyStrings() {
  const ui = D.ui;
  document.documentElement.lang = ui.htmlLang;
  document.title = ui.docTitle;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = ui[el.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = fmt(ui[el.dataset.i18nHtml]);
  });
}
function renderAll() {
  applyStrings();
  renderExamples();
  renderVideos();
  renderArticles();
  renderRoutes();
  renderApps();
  renderSafety();
  updateViewLabel();
  setSeason(season); // оновлює підпис сезону + перемальовує чек-лист
}
const langButtons = document.querySelectorAll(".lang-switch button");
function setLang(v) {
  if (!DATA[v] || v === lang) return;
  lang = v;
  D = DATA[v];
  localStorage.setItem(LS_LANG, v);
  langButtons.forEach((b) =>
    b.setAttribute(
      "aria-pressed",
      b.dataset.lang === v ? "true" : "false",
    ),
  );
  renderAll();
}
langButtons.forEach((b) => {
  b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false");
  b.addEventListener("click", () => setLang(b.dataset.lang));
});
