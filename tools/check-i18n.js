#!/usr/bin/env node
/* Перевірка парності мовних блоків у data.js.
   Стан чек-листа зберігається ЗА ПОЗИЦІЄЮ, тож структура uk/en має збігатися.
   Запуск:  node tools/check-i18n.js   (код виходу 1 при розбіжностях). */
"use strict";
const path = require("path");
global.window = {};
require(path.join(__dirname, "..", "data.js"));
const DATA = global.window.MOUNTAIN_DATA;

const errors = [];
const langs = Object.keys(DATA || {});
if (langs.length < 2) {
  console.log("Лише одна мова — нема з чим порівнювати.");
  process.exit(0);
}
const base = langs[0];

function keys(o) {
  return Object.keys(o || {}).sort();
}
function eqArr(a, b) {
  return a.length === b.length && a.every((x, i) => x === b[i]);
}

for (const lang of langs.slice(1)) {
  const A = DATA[base],
    B = DATA[lang];
  const tag = `${base}↔${lang}`;

  // ui keys
  if (!eqArr(keys(A.ui), keys(B.ui)))
    errors.push(`[${tag}] ui: різні ключі: ${base}=${keys(A.ui)} ${lang}=${keys(B.ui)}`);

  // прості масиви — однакова довжина
  for (const k of ["videos", "routes", "routeApps", "gearExamples"]) {
    if ((A[k] || []).length !== (B[k] || []).length)
      errors.push(`[${tag}] ${k}: ${(A[k]||[]).length} vs ${(B[k]||[]).length}`);
  }

  // routeApps: tag/tagType мають бути в обох
  (A.routeApps || []).forEach((a, i) => {
    const b = (B.routeApps || [])[i] || {};
    if (!!a.tag !== !!b.tag || !!a.tagType !== !!b.tagType)
      errors.push(`[${tag}] routeApps[${i}] (${a.name}): tag/tagType розбіжність`);
    if (a.tagType !== b.tagType)
      errors.push(`[${tag}] routeApps[${i}] (${a.name}): tagType "${a.tagType}" vs "${b.tagType}"`);
  });

  // gear: дні, категорії, кількість пунктів, прапорці, opt-маска
  for (const day of keys(A.gear)) {
    const ca = A.gear[day] || [],
      cb = B.gear[day] || [];
    if (ca.length !== cb.length) {
      errors.push(`[${tag}] gear[${day}]: ${ca.length} vs ${cb.length} категорій`);
      continue;
    }
    ca.forEach((cat, ci) => {
      const cbt = cb[ci];
      if (cat.items.length !== cbt.items.length)
        errors.push(`[${tag}] gear[${day}][${ci}] (${cat.cat}/${cbt.cat}): ${cat.items.length} vs ${cbt.items.length} пунктів`);
      if (!!cat.must !== !!cbt.must || !!cat.season !== !!cbt.season)
        errors.push(`[${tag}] gear[${day}][${ci}] (${cat.cat}): прапорці must/season розбіжні`);
      const optA = cat.items.map((x) => !!(x && x.opt)).join("");
      const optB = cbt.items.map((x) => !!(x && x.opt)).join("");
      if (optA !== optB)
        errors.push(`[${tag}] gear[${day}][${ci}] (${cat.cat}): opt-маска розбіжна (${optA} vs ${optB})`);
    });
  }

  // articles: кроки/застереження
  (A.articles || []).forEach((art, i) => {
    const b = (B.articles || [])[i] || {};
    if ((art.steps || []).length !== (b.steps || []).length)
      errors.push(`[${tag}] articles[${i}]: steps ${(art.steps||[]).length} vs ${(b.steps||[]).length}`);
    if ((art.warnings || []).length !== (b.warnings || []).length)
      errors.push(`[${tag}] articles[${i}]: warnings ${(art.warnings||[]).length} vs ${(b.warnings||[]).length}`);
  });

  // safety: картки та їх пункти
  const sa = A.safety || {},
    sb = B.safety || {};
  if ((sa.cards || []).length !== (sb.cards || []).length)
    errors.push(`[${tag}] safety.cards: ${(sa.cards||[]).length} vs ${(sb.cards||[]).length}`);
  (sa.cards || []).forEach((c, i) => {
    const d = (sb.cards || [])[i] || {};
    if ((c.items || []).length !== (d.items || []).length)
      errors.push(`[${tag}] safety.cards[${i}]: ${(c.items||[]).length} vs ${(d.items||[]).length} пунктів`);
  });
}

if (errors.length) {
  console.error("✗ Знайдено розбіжності uk/en:\n" + errors.map((e) => "  - " + e).join("\n"));
  process.exit(1);
}
console.log("✓ Парність мов OK (" + langs.join(", ") + ").");
