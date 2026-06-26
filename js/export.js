// export.js — експорт чек-листа: XLSX і DOCX (генеруємо вручну, без бібліотек),
// PDF — через нативний друк (кирилиця коректна, без вшивання шрифтів).
// Класичний скрипт; покладається на спільний глобальний скоуп (D, day, ...).
"use strict";

/* ===================== низькорівневі утиліти ===================== */
const _enc = new TextEncoder();
function xmlEsc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// CRC32 (таблиця рахується один раз)
let _crcTable = null;
function crc32(bytes) {
  if (!_crcTable) {
    _crcTable = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      _crcTable[n] = c >>> 0;
    }
  }
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++)
    crc = _crcTable[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

// ZIP без стиснення (method 0 = stored). files: [{name, bytes:Uint8Array}]
function makeZip(files) {
  const parts = [];
  const central = [];
  let offset = 0;
  const u16 = (n) => [n & 0xff, (n >>> 8) & 0xff];
  const u32 = (n) => [n & 0xff, (n >>> 8) & 0xff, (n >>> 16) & 0xff, (n >>> 24) & 0xff];
  for (const f of files) {
    const nameBytes = _enc.encode(f.name);
    const crc = crc32(f.bytes);
    const size = f.bytes.length;
    const local = [].concat(
      u32(0x04034b50), u16(20), u16(0), u16(0), u16(0), u16(0),
      u32(crc), u32(size), u32(size), u16(nameBytes.length), u16(0),
    );
    parts.push(new Uint8Array(local), nameBytes, f.bytes);
    const cdir = [].concat(
      u32(0x02014b50), u16(20), u16(20), u16(0), u16(0), u16(0), u16(0),
      u32(crc), u32(size), u32(size), u16(nameBytes.length),
      u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset),
    );
    central.push(new Uint8Array(cdir), nameBytes);
    offset += local.length + nameBytes.length + size;
  }
  let cdSize = 0;
  for (const c of central) cdSize += c.length;
  const end = new Uint8Array(
    [].concat(
      u32(0x06054b50), u16(0), u16(0), u16(files.length), u16(files.length),
      u32(cdSize), u32(offset), u16(0),
    ),
  );
  const all = parts.concat(central, [end]);
  let total = 0;
  for (const p of all) total += p.length;
  const out = new Uint8Array(total);
  let pos = 0;
  for (const p of all) {
    out.set(p, pos);
    pos += p.length;
  }
  return out;
}

/* ===================== XLSX ===================== */
function colName(i) {
  // 0 -> A
  let s = "";
  i += 1;
  while (i > 0) {
    const m = (i - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    i = Math.floor((i - 1) / 26);
  }
  return s;
}
// rows: масив масивів рядків
function buildXlsx(rows, sheetName) {
  let sd = "";
  rows.forEach((row, r) => {
    sd += '<row r="' + (r + 1) + '">';
    row.forEach((val, c) => {
      sd +=
        '<c r="' + colName(c) + (r + 1) + '" t="inlineStr"><is><t xml:space="preserve">' +
        xmlEsc(val == null ? "" : val) +
        "</t></is></c>";
    });
    sd += "</row>";
  });
  const files = [
    {
      name: "[Content_Types].xml",
      str:
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
        '<Default Extension="xml" ContentType="application/xml"/>' +
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' +
        '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' +
        "</Types>",
    },
    {
      name: "_rels/.rels",
      str:
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' +
        "</Relationships>",
    },
    {
      name: "xl/workbook.xml",
      str:
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
        '<sheets><sheet name="' + xmlEsc(sheetName || "Sheet1") + '" sheetId="1" r:id="rId1"/></sheets>' +
        "</workbook>",
    },
    {
      name: "xl/_rels/workbook.xml.rels",
      str:
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>' +
        "</Relationships>",
    },
    {
      name: "xl/worksheets/sheet1.xml",
      str:
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
        "<sheetData>" + sd + "</sheetData></worksheet>",
    },
  ];
  return makeZip(files.map((f) => ({ name: f.name, bytes: _enc.encode(f.str) })));
}

/* ===================== DOCX ===================== */
// blocks: [{text, style:"title"|"h"|"p", bold?}]
function buildDocx(blocks) {
  let body = "";
  for (const b of blocks) {
    const sz = b.style === "title" ? 36 : b.style === "h" ? 26 : 22; // half-points
    const bold = b.bold || b.style === "title" || b.style === "h";
    const before = b.style === "h" ? 200 : b.style === "title" ? 0 : 0;
    body +=
      '<w:p><w:pPr><w:spacing w:before="' + before + '" w:after="60"/></w:pPr>' +
      "<w:r><w:rPr>" + (bold ? "<w:b/>" : "") + '<w:sz w:val="' + sz + '"/></w:rPr>' +
      '<w:t xml:space="preserve">' + xmlEsc(b.text) + "</w:t></w:r></w:p>";
  }
  const doc =
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>' +
    body +
    '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134"/></w:sectPr>' +
    "</w:body></w:document>";
  const files = [
    {
      name: "[Content_Types].xml",
      str:
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
        '<Default Extension="xml" ContentType="application/xml"/>' +
        '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
        "</Types>",
    },
    {
      name: "_rels/.rels",
      str:
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
        "</Relationships>",
    },
    { name: "word/document.xml", str: doc },
  ];
  return makeZip(files.map((f) => ({ name: f.name, bytes: _enc.encode(f.str) })));
}

// для node-тестів
if (typeof window !== "undefined")
  window.UGExport = { makeZip, buildXlsx, buildDocx, crc32 };

/* ===================== рядки експорту (двомовно) ===================== */
const EXP = {
  uk: {
    title: "Експорт списку",
    scope: "Що включити",
    all: "Усі речі",
    checked: "Лише зібране",
    must: "Лише необхідне",
    format: "Формат",
    pdfHint: "друк / зберегти як PDF",
    close: "Закрити",
    empty: "Немає що експортувати в цьому виборі.",
    cCat: "Категорія",
    cItem: "Річ",
    cNote: "Опис",
    cOpt: "Опційне",
    cPacked: "Зібрано",
    yes: "так",
    no: "ні",
    listWord: "чек-лист",
    day1: "1 день",
    day2: "2 дні",
    winter: "холодна пора",
  },
  en: {
    title: "Export list",
    scope: "Include",
    all: "All items",
    checked: "Only packed",
    must: "Only essential",
    format: "Format",
    pdfHint: "print / save as PDF",
    close: "Close",
    empty: "Nothing to export in this selection.",
    cCat: "Category",
    cItem: "Item",
    cNote: "Note",
    cOpt: "Optional",
    cPacked: "Packed",
    yes: "yes",
    no: "no",
    listWord: "checklist",
    day1: "1 day",
    day2: "2 days",
    winter: "cold season",
  },
};
function expT() {
  return EXP[lang] || EXP.uk;
}

/* ===================== збір даних ===================== */
function gatherExport(scope) {
  const t = expT();
  const cats = [];
  visibleCats().forEach(({ c, ci }) => {
    const items = [];
    c.items.forEach((raw, ii) => {
      const it = norm(raw);
      const on = !!checked[keyOf(day, ci, ii)];
      if (scope === "checked" && !on) return;
      if (scope === "must" && it.opt) return;
      items.push({ name: it.n, desc: it.desc || "", opt: !!it.opt, checked: on });
    });
    if (items.length) cats.push({ cat: c.cat, items: items });
  });
  const title =
    D.ui.brand + " — " + (day === "2" ? t.day2 : t.day1);
  const sub = season === "cold" ? "❄ " + t.winter : "";
  return { title: title, sub: sub, cats: cats };
}

/* ===================== формати ===================== */
function expFilename(ext) {
  return "u-gory-" + (day === "2" ? "2d" : "1d") + "-" + lang + "." + ext;
}
function downloadBytes(bytes, name, mime) {
  const blob = new Blob([bytes], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(function () {
    URL.revokeObjectURL(url);
  }, 1000);
}
function exportXlsx(data) {
  const t = expT();
  const rows = [[t.cCat, t.cItem, t.cNote, t.cOpt, t.cPacked]];
  data.cats.forEach((c) =>
    c.items.forEach((it) =>
      rows.push([
        c.cat,
        it.name,
        it.desc,
        it.opt ? t.yes : t.no,
        it.checked ? t.yes : t.no,
      ]),
    ),
  );
  downloadBytes(
    buildXlsx(rows, t.listWord),
    expFilename("xlsx"),
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  );
}
function exportDocx(data) {
  const t = expT();
  const blocks = [{ text: data.title, style: "title" }];
  if (data.sub) blocks.push({ text: data.sub, style: "p" });
  data.cats.forEach((c) => {
    blocks.push({ text: c.cat, style: "h" });
    c.items.forEach((it) => {
      let line =
        (it.checked ? "☑ " : "☐ ") +
        it.name +
        (it.opt ? " (" + t.cOpt.toLowerCase() + ")" : "");
      if (it.desc) line += " — " + it.desc;
      blocks.push({ text: line, style: "p" });
    });
  });
  downloadBytes(
    buildDocx(blocks),
    expFilename("docx"),
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  );
}
function exportPdfPrint(data) {
  const t = expT();
  let html =
    '<h1>' + xmlEsc(data.title) + "</h1>" +
    (data.sub ? "<p class='sub'>" + xmlEsc(data.sub) + "</p>" : "");
  data.cats.forEach((c) => {
    html += "<h2>" + xmlEsc(c.cat) + "</h2><ul>";
    c.items.forEach((it) => {
      html +=
        "<li>" +
        (it.checked ? "☑" : "☐") +
        " <b>" + xmlEsc(it.name) + "</b>" +
        (it.opt ? " <i>(" + xmlEsc(t.cOpt.toLowerCase()) + ")</i>" : "") +
        (it.desc ? " — " + xmlEsc(it.desc) : "") +
        "</li>";
    });
    html += "</ul>";
  });
  let area = document.getElementById("printArea");
  if (!area) {
    area = document.createElement("div");
    area.id = "printArea";
    document.body.appendChild(area);
  }
  area.innerHTML = html;
  window.print();
}

/* ===================== модалка ===================== */
function openExportModal() {
  const t = expT();
  const back = document.createElement("div");
  back.className = "modal-back";
  back.innerHTML =
    '<div class="modal" role="dialog" aria-modal="true">' +
    '<button class="modal-x" aria-label="' + xmlEsc(t.close) + '">×</button>' +
    "<h3>" + xmlEsc(t.title) + "</h3>" +
    '<div class="modal-sec">' + xmlEsc(t.scope) + "</div>" +
    '<div class="seg-scope">' +
    '<button data-scope="all" aria-pressed="true">' + xmlEsc(t.all) + "</button>" +
    '<button data-scope="checked" aria-pressed="false">' + xmlEsc(t.checked) + "</button>" +
    '<button data-scope="must" aria-pressed="false">' + xmlEsc(t.must) + "</button>" +
    "</div>" +
    '<div class="modal-sec">' + xmlEsc(t.format) + "</div>" +
    '<div class="fmt-row">' +
    '<button data-fmt="pdf"><b>PDF</b><span>' + xmlEsc(t.pdfHint) + "</span></button>" +
    '<button data-fmt="docx"><b>DOCX</b><span>Word</span></button>' +
    '<button data-fmt="xlsx"><b>XLSX</b><span>Excel</span></button>' +
    "</div></div>";
  let scope = "all";
  function close() {
    back.remove();
  }
  back.addEventListener("click", (e) => {
    if (e.target === back || e.target.closest(".modal-x")) return close();
    const sc = e.target.closest("button[data-scope]");
    if (sc) {
      scope = sc.getAttribute("data-scope");
      back
        .querySelectorAll("button[data-scope]")
        .forEach((b) =>
          b.setAttribute("aria-pressed", b === sc ? "true" : "false"),
        );
      return;
    }
    const fb = e.target.closest("button[data-fmt]");
    if (fb) {
      const data = gatherExport(scope);
      if (!data.cats.length) {
        alert(t.empty);
        return;
      }
      const fmt = fb.getAttribute("data-fmt");
      close();
      if (fmt === "xlsx") exportXlsx(data);
      else if (fmt === "docx") exportDocx(data);
      else exportPdfPrint(data);
    }
  });
  document.body.appendChild(back);
}
const _exportBtn = document.getElementById("exportBtn");
if (_exportBtn) _exportBtn.addEventListener("click", openExportModal);
