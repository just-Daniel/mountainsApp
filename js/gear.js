// gear.js — рендер чек-листа (renderGear), прогрес, кліки по списку
// Класичний скрипт (не модуль): усі файли ділять спільний глобальний скоуп,
// тож порядок підключення в index.html важливий. Працює і через file://.
"use strict";

function renderGear() {
  const ui = D.ui;
  let html = "";
  let baseTotal = 0,
    hiddenPacked = 0;
  visibleCats().forEach(({ c, ci }) => {
    const cls = c.must ? " cat--must" : c.season ? " cat--season" : "";
    const base = itemsFor(c); // після фільтра
    if (!base.length) return; // у цьому фільтрі категорія порожня
    baseTotal += base.length;
    const done = base.filter(
      (x) => checked[keyOf(day, ci, x.ii)],
    ).length;
    const complete = done === base.length;
    const shown = hidePacked
      ? base.filter((x) => !checked[keyOf(day, ci, x.ii)])
      : base;
    if (hidePacked) hiddenPacked += base.length - shown.length;
    if (!shown.length) return; // усе зібрано (режим «сховати зібране»)

    // згортання: ручний стан має пріоритет над авто-згортанням повної
    const st = catState[catKey(ci)];
    const collapsed = st === "closed" || (st !== "open" && complete);
    const countLabel = complete
      ? ui.catDone
      : done + "/" + base.length;

    html +=
      '<div class="cat' +
      cls +
      (collapsed ? " collapsed" : "") +
      (complete ? " complete" : "") +
      '"><button class="cat-head" aria-expanded="' +
      !collapsed +
      '" data-cat="' +
      escAttr(catKey(ci)) +
      '"><span class="blaze"></span><h2>' +
      esc(c.cat) +
      "</h2>" +
      '<span class="cat-count">' +
      countLabel +
      "</span>" +
      CHEV +
      "</button>";
    if (c.note && !collapsed)
      html += '<p class="cat-note">' + esc(c.note) + "</p>";
    if (!collapsed) {
      html += '<ul class="list">';
      shown.forEach((x) => {
        const it = x.it,
          k = keyOf(day, ci, x.ii),
          on = !!checked[k];
        html +=
          '<button class="item" role="checkbox" aria-checked="' +
          on +
          '" data-k="' +
          escAttr(k) +
          '">' +
          TICK +
          '<span class="label"><span class="item-title">' +
          esc(it.n) +
          "</span>" +
          (it.desc
            ? '<span class="item-desc">' + esc(it.desc) + "</span>"
            : "") +
          "</span>" +
          (it.opt
            ? '<span class="badge">' + esc(ui.optBadge) + "</span>"
            : "") +
          "</button>";
      });
      html += "</ul>";
    }
    html += "</div>";
  });

  // Підказка про сховане, щоб не було відчуття «а де поділись речі?»
  let hiddenByFilter = 0;
  if (filter !== "all")
    visibleCats().forEach(({ c }) =>
      c.items.map(norm).forEach((it) => {
        const passes = filter === "opt" ? !!it.opt : !it.opt;
        if (!passes) hiddenByFilter++;
      }),
    );
  const parts = [];
  if (hiddenByFilter)
    parts.push(
      hiddenByFilter +
        " " +
        (filter === "must" ? ui.hiddenOpt : ui.hiddenMust),
    );
  if (hidePacked && hiddenPacked)
    parts.push(hiddenPacked + " " + ui.hiddenPacked);
  const hiddenNote = parts.length
    ? '<p class="hidden-note">' +
      esc(ui.hiddenPrefix) +
      parts.join(" · ") +
      "</p>"
    : "";

  const hasCats = html !== "";
  if (!hasCats) {
    html =
      '<div class="info">' +
      (baseTotal > 0 ? fmt(ui.emptyAllPacked) : fmt(ui.emptyFilter)) +
      "</div>";
  }
  gearEl.innerHTML = (hasCats ? hiddenNote : "") + html;
  updateProgress();
}
function updateProgress() {
  const ui = D.ui;
  let total = 0,
    done = 0;
  visibleCats().forEach(({ c, ci }) =>
    itemsFor(c).forEach((x) => {
      total++;
      if (checked[keyOf(day, ci, x.ii)]) done++;
    }),
  );
  document.getElementById("progressText").textContent =
    ui.packed + " " + done + " / " + total;
  document.getElementById("progressBar").style.width = total
    ? (done / total) * 100 + "%"
    : "0%";
  const allDone = total > 0 && done === total;
  const flag = document.getElementById("doneFlag");
  flag.classList.toggle("show", allDone);
  if (allDone)
    flag.textContent =
      filter === "must"
        ? ui.doneMust
        : filter === "opt"
          ? ui.doneOpt
          : ui.doneAll;
}
gearEl.addEventListener("click", (e) => {
  const head = e.target.closest(".cat-head");
  if (head) {
    const key = head.getAttribute("data-cat");
    catState[key] =
      head.getAttribute("aria-expanded") === "true" ? "closed" : "open";
    renderGear();
    return;
  }
  const btn = e.target.closest(".item");
  if (!btn) return;
  const k = btn.getAttribute("data-k");
  if (checked[k]) delete checked[k];
  else checked[k] = true;
  saveChecked();
  renderGear();
});
