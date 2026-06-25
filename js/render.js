// render.js — рендер розділів: стаф, відео, статті, маршрути, безпека
// Класичний скрипт (не модуль): усі файли ділять спільний глобальний скоуп,
// тож порядок підключення в index.html важливий. Працює і через file://.
"use strict";

/* ---------- STUFF (examples) ---------- */
function renderExamples() {
  document.getElementById("exampleList").innerHTML = D.gearExamples
    .map(
      (e) =>
        '<div class="ex-card"><div class="ex-head"><h3>' +
        esc(e.item) +
        "</h3>" +
        (e.layer
          ? '<span class="ex-layer">' + esc(e.layer) + "</span>"
          : "") +
        "</div>" +
        '<div class="ex-row wrong"><span class="mark">✗</span><span>' +
        esc(e.wrong) +
        "</span></div>" +
        '<div class="ex-row right"><span class="mark">✓</span><span>' +
        esc(e.right) +
        "</span></div></div>",
    )
    .join("");
}

/* ---------- VIDEOS ---------- */
function renderVideos() {
  document.getElementById("videoList").innerHTML = D.videos
    .map(
      (v) =>
        '<a class="vcard" href="https://www.youtube.com/watch?v=' +
        escAttr(v.id) +
        '" target="_blank" rel="noopener">' +
        '<span class="thumb"><img loading="lazy" src="https://i.ytimg.com/vi/' +
        escAttr(v.id) +
        '/hqdefault.jpg" alt="">' +
        '<span class="play"><span><svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M8 5l11 7-11 7V5z"/></svg></span></span></span>' +
        '<span class="vmeta"><h3>' +
        esc(v.title) +
        "</h3><p>" +
        esc(v.desc) +
        '</p><span class="src">' +
        esc(D.ui.youtube) +
        "</span></span></a>",
    )
    .join("");
}

/* ---------- ARTICLES ---------- */
const articleList = document.getElementById("articleList");
function renderArticles() {
  articleList.innerHTML = (D.articles || [])
    .map(
      (a, i) =>
        '<div class="acard">' +
        '<button class="acard-head" aria-expanded="false" data-a="' +
        i +
        '"><h3>' +
        esc(a.title) +
        "</h3>" +
        CHEV +
        "</button>" +
        '<div class="acard-body">' +
        (a.intro ? '<p class="a-intro">' + esc(a.intro) + "</p>" : "") +
        '<ol class="asteps">' +
        (a.steps || [])
          .map((s) => "<li><b>" + esc(s.t) + "</b> " + esc(s.d) + "</li>")
          .join("") +
        "</ol>" +
        (a.warnings && a.warnings.length
          ? (a.warnIntro
              ? '<p class="a-intro a-warn-intro">' +
                esc(a.warnIntro) +
                "</p>"
              : "") +
            '<ul class="awarn">' +
            a.warnings
              .map(
                (w) =>
                  "<li><b>" + esc(w.t) + "</b> " + esc(w.d) + "</li>",
              )
              .join("") +
            "</ul>"
          : "") +
        "</div></div>",
    )
    .join("");
}
articleList.addEventListener("click", (e) => {
  const head = e.target.closest(".acard-head");
  if (!head) return;
  const card = head.closest(".acard");
  head.setAttribute("aria-expanded", card.classList.toggle("open"));
});

/* ---------- ROUTES ---------- */
function diffClass(d) {
  d = (d || "").toLowerCase();
  if (/склад|hard|важк/.test(d)) return "pill--hard";
  if (/серед|medium|moder/.test(d)) return "pill--mid";
  return "pill--easy";
}
function renderRoutes() {
  document.getElementById("routeList").innerHTML = D.routes
    .map((r) => {
      const badge = r.days === 2 ? D.ui.day2 : D.ui.day1;
      return (
        '<article class="route-card">' +
        '<div class="route-img"><img loading="lazy" src="' +
        escAttr(r.image) +
        '" alt="' +
        escAttr(r.name) +
        '" onerror="this.style.display=\'none\'"></div>' +
        '<div class="route-body"><div class="route-top"><h3>' +
        esc(r.name) +
        '</h3><span class="days-badge">' +
        esc(badge) +
        "</span></div>" +
        '<p class="route-area">' +
        esc(r.area) +
        "</p>" +
        '<div class="route-meta"><span>⛰ ' +
        esc(r.height) +
        '</span><span class="m">' +
        esc(r.duration) +
        "</span>" +
        '<span class="pill ' +
        diffClass(r.difficulty) +
        '">' +
        esc(r.difficulty) +
        "</span></div>" +
        '<p class="route-desc">' +
        esc(r.desc) +
        "</p>" +
        (r.tip ? '<p class="route-tip">💡 ' + esc(r.tip) + "</p>" : "") +
        "</div></article>"
      );
    })
    .join("");
}
function renderApps() {
  document.getElementById("appList").innerHTML = D.routeApps
    .map(
      (a) =>
        '<a class="link-card" href="' +
        escAttr(a.url) +
        '" target="_blank" rel="noopener">' +
        '<span class="lc-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E6B4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg></span>' +
        '<span class="lc-body"><div class="lc-top"><h3>' +
        esc(a.name) +
        "</h3>" +
        (a.tag
          ? '<span class="lc-tag" data-t="' +
            escAttr(a.tagType || "") +
            '">' +
            esc(a.tag) +
            "</span>"
          : "") +
        "</div><p>" +
        esc(a.desc) +
        "</p></span>" +
        '<span class="lc-go"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg></span></a>',
    )
    .join("");
}

/* ---------- SAFETY (rendered from data) ---------- */
const SAFE_SHIELD =
  '<svg class="si" viewBox="0 0 24 24" fill="none" stroke="#F26A1B" stroke-width="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z"/></svg>';
const SAFE_ICONS = [
  '<svg class="si" viewBox="0 0 24 24" fill="none" stroke="#2E6B4F" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v6m0 4h.01"/></svg>',
  '<svg class="si" viewBox="0 0 24 24" fill="none" stroke="#2E6B4F" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
  '<svg class="si" viewBox="0 0 24 24" fill="none" stroke="#2E6B4F" stroke-width="2"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.2"/><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5M15 20c0-2 1-3.5 3-3.5"/></svg>',
];
function renderSafety() {
  const s = D.safety;
  let html =
    '<h2 class="panel-title">' +
    esc(D.ui.safetyTitle) +
    '</h2><p class="lead">' +
    esc(s.lead) +
    "</p>";
  // екстрені номери
  html +=
    '<div class="scard"><h3>' +
    SAFE_SHIELD +
    esc(s.emergency.title) +
    '</h3><div class="emergency">' +
    s.emergency.numbers
      .map(
        (num) =>
          '<a' +
          (num.alt ? ' class="alt"' : "") +
          ' href="tel:' +
          escAttr(num.n) +
          '"><span class="num">' +
          esc(num.n) +
          '</span><span class="who">' +
          esc(num.who) +
          "</span></a>",
      )
      .join("") +
    '</div><ul style="margin-top:12px">' +
    s.emergency.notes.map((n) => "<li>" + fmt(n) + "</li>").join("") +
    "</ul></div>";
  // картки
  html += s.cards
    .map(
      (card, i) =>
        '<div class="scard"><h3>' +
        (SAFE_ICONS[i] || "") +
        esc(card.title) +
        "</h3><ul>" +
        card.items.map((it) => "<li>" + fmt(it) + "</li>").join("") +
        "</ul></div>",
    )
    .join("");
  if (s.footnote)
    html += '<p class="footnote">' + esc(s.footnote) + "</p>";
  document.getElementById("safety").innerHTML = html;
}

/* ---------- ТОСТ «ДОСТУПНЕ ОНОВЛЕННЯ» ----------
   Викликається з manageSW (state.js), коли новий service worker готовий. */
function showUpdateToast(sw) {
  const t = document.getElementById("updateToast");
  if (!t) return;
  t.hidden = false;
  const btn = document.getElementById("updateBtn");
  if (btn)
    btn.onclick = function () {
      try {
        if (sw) sw.postMessage({ type: "SKIP_WAITING" });
      } catch (e) {}
      t.hidden = true;
    };
}
