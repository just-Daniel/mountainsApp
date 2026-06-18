// controls.js — дні, сезон, скинути, панель фільтра (контроли чек-листа)
// Класичний скрипт (не модуль): усі файли ділять спільний глобальний скоуп,
// тож порядок підключення в index.html важливий. Працює і через file://.
"use strict";

/* ---------- CONTROLS ---------- */
const d1 = document.getElementById("day1"),
  d2 = document.getElementById("day2");
function setDay(v) {
  day = v;
  localStorage.setItem(LS_DAY, v);
  d1.setAttribute("aria-pressed", v === "1");
  d2.setAttribute("aria-pressed", v === "2");
  renderGear();
}
d1.addEventListener("click", () => setDay("1"));
d2.addEventListener("click", () => setDay("2"));
const seasonChip = document.getElementById("seasonChip");
function setSeason(v) {
  season = v;
  localStorage.setItem(LS_SEASON, v);
  const cold = v === "cold";
  seasonChip.setAttribute("aria-checked", cold);
  seasonChip.querySelector(".switch-hint").textContent = cold
    ? D.ui.seasonOn
    : D.ui.seasonOff;
  renderGear();
}
seasonChip.addEventListener("click", () =>
  setSeason(season === "cold" ? "warm" : "cold"),
);
document.getElementById("resetBtn").addEventListener("click", () => {
  const cats = visibleCats();
  let n = 0;
  cats.forEach(({ c, ci }) =>
    c.items.forEach((it, ii) => {
      if (checked[keyOf(day, ci, ii)]) n++;
    }),
  );
  if (n === 0 || confirm(D.ui.resetConfirm)) {
    cats.forEach(({ c, ci }) =>
      c.items.forEach((it, ii) => delete checked[keyOf(day, ci, ii)]),
    );
    saveChecked();
    renderGear();
  }
});

/* ---------- ПЕРЕГЛЯД: фільтр / сховати зібране / масова дія ---------- */
const viewToggle = document.getElementById("viewToggle"),
  viewPanel = document.getElementById("viewPanel"),
  viewToggleLabel = document.getElementById("viewToggleLabel"),
  filterBox = document.querySelector(".filters"),
  hidePackedToggle = document.getElementById("hidePackedToggle");
function updateViewLabel() {
  const ui = D.ui;
  const LBL = { must: ui.filterMust, opt: ui.filterOpt };
  const parts = [];
  if (filter !== "all") parts.push(LBL[filter]);
  if (hidePacked) parts.push(ui.withoutPacked);
  viewToggleLabel.textContent = parts.length
    ? parts.join(" · ")
    : ui.filterLabel;
  viewToggle.classList.toggle("active", filter !== "all" || hidePacked);
}
viewToggle.addEventListener("click", () => {
  const open = viewToggle.getAttribute("aria-expanded") === "true";
  viewToggle.setAttribute("aria-expanded", !open);
  viewPanel.hidden = open;
});
filterBox.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-filter]");
  if (!btn) return;
  filter = btn.getAttribute("data-filter");
  filterBox
    .querySelectorAll("button")
    .forEach((b) =>
      b.setAttribute("aria-pressed", b === btn ? "true" : "false"),
    );
  updateViewLabel();
  renderGear();
});
hidePackedToggle.addEventListener("click", () => {
  hidePacked = !hidePacked;
  hidePackedToggle.setAttribute("aria-checked", hidePacked);
  updateViewLabel();
  renderGear();
});
