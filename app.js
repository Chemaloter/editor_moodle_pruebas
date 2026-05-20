// ══════════════════════════════════════════════════════════════
//  ESTILOS DE EXPORTACIÓN MOODLE (inline, TinyMCE/Atto compatible)
// ══════════════════════════════════════════════════════════════
const EX = {
  h1:   "display:inline-block;background-color:#C0272D;color:#ffffff;padding:12px 24px;border-radius:6px;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:20px;font-weight:700;letter-spacing:0.3px;line-height:1.3;",
  h2:   "display:inline-block;background-color:#8E1B1F;color:#ffffff;padding:10px 20px;border-radius:6px;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:17px;font-weight:700;letter-spacing:0.2px;line-height:1.3;",
  h3:   "display:inline-block;background-color:#fff0f0;color:#6b1215;border-left:4px solid #C0272D;padding:8px 18px;border-radius:0 5px 5px 0;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:15px;font-weight:700;line-height:1.4;",
  h4:   "display:inline-block;color:#C0272D;border-bottom:2px solid #e8b4b5;padding:4px 2px;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:14px;font-weight:700;letter-spacing:0.1px;",
  h5:   "display:inline-block;color:#7a1518;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:13px;font-weight:700;",
  h6:   "display:inline-block;color:#999;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:12px;font-weight:700;font-style:italic;",
  p:    "font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:15px;line-height:2.05;color:#111111;margin:0 auto 20px auto;max-width:754px;width:100%;box-sizing:border-box;",
  ul:   "font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:15px;line-height:2.05;color:#111111;margin:0 auto 20px auto;max-width:754px;width:100%;box-sizing:border-box;padding-left:28px;",
  ol:   "font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:15px;line-height:2.05;color:#111111;margin:0 auto 20px auto;max-width:754px;width:100%;box-sizing:border-box;padding-left:28px;",
  li:   "margin:0 0 7px 0;font-weight:normal;line-height:2.05;",
  table:"width:100%;border-collapse:collapse;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:14px;",
  th:   "background-color:#C0272D;color:#ffffff;padding:10px 14px;text-align:left;font-weight:700;border:1px solid #9b1f23;font-size:14px;",
  td:   "padding:9px 14px;border:1px solid #e0e0e0;color:#2d2d2d;vertical-align:middle;font-size:14px;line-height:1.6;",
  tdalt:"padding:9px 14px;border:1px solid #e0e0e0;color:#2d2d2d;vertical-align:middle;background-color:#fdf5f5;font-size:14px;line-height:1.6;",
  goal: "display:inline-block;background-color:#f0faf1;border-left:5px solid #2e7d32;color:#1a4d1e;padding:12px 20px;border-radius:0 6px 6px 0;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:15px;font-weight:700;line-height:1.6;",
  think:"display:inline-block;background-color:#faf5ff;border-left:5px solid #7b1fa2;color:#4a1570;padding:12px 20px;border-radius:0 6px 6px 0;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:15px;font-style:italic;line-height:1.6;",
  note: "display:inline-block;background-color:#fffbeb;border-top:4px solid #f59e0b;border-left:4px solid #f59e0b;color:#78350f;padding:12px 20px;border-radius:0 6px 6px 6px;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:15px;font-weight:700;line-height:1.6;",
  info: "display:inline-block;background-color:#eff6ff;border-left:5px solid #1d4ed8;color:#1e3a8a;padding:12px 20px;border-radius:0 6px 6px 0;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:15px;font-weight:600;line-height:1.6;",
  tip:  "display:inline-block;background-color:#f0fdfa;border-left:5px solid #0d9488;color:#134e4a;padding:12px 20px;border-radius:0 6px 6px 0;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:15px;font-weight:600;line-height:1.6;",
  step: "display:inline-block;background-color:#eef2ff;border-left:5px solid #4338ca;color:#1e1b4b;padding:12px 20px;border-radius:0 6px 6px 0;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:15px;font-weight:700;line-height:1.6;",
  quote:"display:inline-block;background-color:#f8fafc;border-left:5px solid #94a3b8;color:#334155;padding:12px 22px;border-radius:0 6px 6px 0;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:15px;font-style:italic;line-height:1.7;",
  extra:"display:inline-block;background-color:#f9fafb;border:1px solid #d1d5db;border-left:4px solid #6b7280;color:#374151;padding:10px 18px;border-radius:0 6px 6px 6px;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:14px;font-weight:600;line-height:1.6;",
  practice:"display:inline-block;background-color:#f0fdfa;border:2px solid #0f766e;border-left:6px solid #0f766e;color:#134e4a;padding:12px 20px;border-radius:0 6px 6px 0;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:15px;font-weight:700;line-height:1.6;",
  defterm:"display:block;background-color:#eeeeee;color:#263238;padding:10px 14px;border-radius:6px 6px 0 0;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:14px;font-weight:bold;line-height:1.4;",
  defbody:   "display:block;padding:0;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:15px;line-height:2.05;color:#111111;margin:0 auto 20px auto;max-width:754px;width:100%;box-sizing:border-box;",
  body:   "display:inline-block;padding:6px 10px;color:#2d2d2d;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:15px;line-height:1.8;",
  list:   "font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:15px;line-height:2.05;color:#111111;margin:0 auto 20px auto;max-width:754px;width:100%;box-sizing:border-box;",
  divider:"display:block;border:none;border-top:2px solid #e5e7eb;margin:16px 0;"
};

// ══════════════════════════════════════════════════════════════
//  DETECCIÓN DE ENCABEZADOS WORD
// ══════════════════════════════════════════════════════════════
function detectHeading(el) {
  if (!el || el.nodeType !== 1) return 0;
  const tag = el.tagName.toLowerCase();
  const m = tag.match(/^h([1-6])$/);
  if (m) return +m[1];
  const cls = (el.className || '').toString();
  for (let n = 1; n <= 6; n++) {
    if (cls.includes('MsoHeading' + n) || cls.includes('Heading' + n) ||
        cls.includes('heading' + n) || cls.includes('Titulo' + n) || cls.includes('Ttulo' + n)) return n;
  }
  const ol = (el.getAttribute('style') || '').match(/mso-outline-level\s*:\s*(\d)/i);
  if (ol) return Math.min(+ol[1], 6);
  return 0;
}

function isWordList(el) {
  if (!el || el.nodeType !== 1 || el.tagName.toLowerCase() !== 'p') return false;
  const cls = (el.className || '').toString();
  return cls.includes('MsoListParagraph') || cls.includes('ListParagraph') || cls.includes('MsoList');
}


// ══════════════════════════════════════════════════════════════
//  ANCHO INSTITUCIONAL SOLO EN EXPORTACIÓN MOODLE
// ══════════════════════════════════════════════════════════════
const EXPORT_CONTENT_MAX = "754px";  
const EXPORT_TEXT_MAX    = "754px";  
const EXPORT_TEXT_STYLE  = "font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:15px;line-height:2.05;color:#111111;margin:0 auto 20px auto;max-width:754px;width:100%;box-sizing:border-box;";  
const EXPORT_UL_STYLE    = EXPORT_TEXT_STYLE + "padding-left:28px;";  
const EXPORT_WRAP_STYLE  = "max-width:754px;width:100%;margin:0 auto;box-sizing:border-box;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:15px;line-height:2.05;color:#111111;";  
const EXPORT_RESPONSIVE_STYLE = '<style>@media screen and (max-width:600px){.scorm-content-754{max-width:100%!important;width:100%!important;padding-left:16px!important;padding-right:16px!important;}.scorm-content-754 p,.scorm-content-754 ul,.scorm-content-754 ol{font-size:16.5px!important;line-height:1.9!important;max-width:100%!important;}.scorm-content-754 li{font-size:16.5px!important;line-height:1.9!important;margin-bottom:8px!important;}}@media screen and (min-width:601px) and (max-width:900px){.scorm-content-754{max-width:754px!important;width:100%!important;padding-left:22px!important;padding-right:22px!important;}}</style>';  
function setExportBox(el, maxWidth, topBottom) {
  if (!el || !el.style) return;
  el.style.maxWidth = maxWidth || EXPORT_CONTENT_MAX;
  el.style.width = '100%';
  el.style.marginLeft = 'auto';
  el.style.marginRight = 'auto';
  el.style.marginTop = topBottom || '24px';
  el.style.marginBottom = topBottom || '24px';
  el.style.boxSizing = 'border-box';
}
function applyOptimizedReadingWidthForExport(clone) {
  clone.querySelectorAll('p').forEach(el => { if (!el.closest('td,th')) el.setAttribute('style', EXPORT_TEXT_STYLE); });
  clone.querySelectorAll('ul').forEach(el => { if (!el.closest('td,th')) el.setAttribute('style', EXPORT_UL_STYLE); });
  clone.querySelectorAll('ol').forEach(el => { if (!el.closest('td,th')) el.setAttribute('style', EXPORT_UL_STYLE); });
  Array.from(clone.children).forEach(el => {
    if (!el || el.nodeType !== 1) return;
    const tag = el.tagName.toLowerCase();
    if (tag === 'table') { setExportBox(el, EXPORT_CONTENT_MAX, '24px'); return; }
    if (tag === 'div' && el.querySelector('table')) { if (!el.style.overflowX) el.style.overflowX = 'auto'; setExportBox(el, EXPORT_CONTENT_MAX, '24px'); return; }
    if (tag === 'div' && el.querySelector('iframe,video,audio,img')) { setExportBox(el, EXPORT_CONTENT_MAX, '24px'); return; }
    if (tag === 'div') {
      const first = el.firstElementChild;
      const style = el.getAttribute('style') || '';
      const firstStyle = first ? (first.getAttribute('style') || '') : '';
      const isTextualBlock = style.includes('margin:') || firstStyle.includes('display:inline-block') || el.classList.contains('sequence-block');
      if (isTextualBlock) setExportBox(el, EXPORT_CONTENT_MAX, '24px');
    }
  });
  clone.querySelectorAll('.sequence-block').forEach(el => setExportBox(el, EXPORT_CONTENT_MAX, '24px'));
}

// ══════════════════════════════════════════════════════════════
//  UTILIDADES
// ══════════════════════════════════════════════════════════════
function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function getInline(node) {
  let out = '';
  for (const child of node.childNodes) {
    if (child.nodeType === 3) {
      const txt = child.textContent.replace(/[\r\n]+/g, ' ');
      out += esc(txt);
      continue;
    }
    if (child.nodeType !== 1) continue;
    const tag = child.tagName.toLowerCase();
    const st  = child.getAttribute('style') || '';
    const inner = getInline(child);
    if (tag === 'b' || tag === 'strong') { out += '<strong style="font-weight:bold;">' + inner + '</strong>'; }
    else if (tag === 'i' || tag === 'em') { out += '<em style="font-style:italic;">' + inner + '</em>'; }
    else if (tag === 'u') { out += '<span style="text-decoration:underline;">' + inner + '</span>'; }
    else if (tag === 'a') {
      const href = child.getAttribute('href') || '';
      if (href && !href.startsWith('file:') && href !== '#')
        out += '<a href="' + esc(href) + '" style="color:#C0272D;text-decoration:underline;" target="_blank">' + inner + '</a>';
      else out += inner;
    }
    else if (tag === 'br') { out += ' '; }
    else if (tag === 'span' || tag === 'font') {
      const bold = st.includes('font-weight') && (st.includes('bold') || /[67]\d\d|800/.test(st));
      const italic = st.includes('font-style') && st.includes('italic');
      const underline = st.includes('text-decoration') && st.includes('underline');
      let w = inner;
      if (bold) w = '<strong style="font-weight:bold;">' + w + '</strong>';
      if (italic) w = '<em style="font-style:italic;">' + w + '</em>';
      if (underline) w = '<span style="text-decoration:underline;">' + w + '</span>';
      out += w;
    } else { out += inner; }
  }
  return out;
}

function extractWordCellStyle(cell) {
  const raw = cell.getAttribute('style') || '';
  const props = {};
  const get = (pattern) => {
    const m = raw.match(pattern);
    return m ? m[1].trim() : null;
  };
  const bg = get(/background(?:-color)?\s*:\s*([^;]+)/i);
  if (bg && !/auto|none|transparent|#fff(?:fff)?$|white|rgb\(255,\s*255,\s*255\)/i.test(bg)) {
    props.backgroundColor = bg;
  }
  const col = get(/(?:^|;)\s*color\s*:\s*([^;]+)/i);
  if (col && !/auto|windowtext/i.test(col)) { props.color = col; }
  const align = get(/text-align\s*:\s*([^;]+)/i);
  if (align && !/auto/i.test(align)) props.textAlign = align;
  const fw = get(/font-weight\s*:\s*([^;]+)/i);
  if (fw) props.fontWeight = fw;
  return Object.entries(props)
    .map(([k, v]) => k.replace(/([A-Z])/g, '-$1').toLowerCase() + ':' + v)
    .join(';');
}

function procTable(tableEl) {
  const hasWordColors = Array.from(tableEl.querySelectorAll('td,th')).some(c => {
    const s = c.getAttribute('style') || '';
    return /background(?:-color)?\s*:\s*(?!auto|none|transparent|#fff(?:fff)?|white)/i.test(s);
  });
  let out = '<table style="' + EX.table + '">';
  Array.from(tableEl.querySelectorAll('tr')).forEach((row, ri) => {
    out += '<tr>';
    Array.from(row.querySelectorAll('td, th')).forEach(cell => {
      const isH = cell.tagName.toLowerCase() === 'th' || ri === 0;
      const content = getInline(cell);
      const colspan = cell.getAttribute('colspan');
      const rowspan = cell.getAttribute('rowspan');
      const spanAttrs = (colspan && colspan !== '1' ? ' colspan="' + colspan + '"' : '')
                      + (rowspan && rowspan !== '1' ? ' rowspan="' + rowspan + '"' : '');
      let cellStyle;
      if (hasWordColors) {
        const baseStyle = isH
          ? 'padding:10px 14px;text-align:left;font-weight:700;border:1px solid #ccc;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:14px;'
          : 'padding:9px 14px;border:1px solid #e0e0e0;vertical-align:middle;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;font-size:14px;line-height:1.6;';
        const wordStyle = extractWordCellStyle(cell);
        cellStyle = baseStyle + (wordStyle ? wordStyle + ';' : '');
      } else {
        cellStyle = isH ? EX.th : (ri % 2 === 0 ? EX.td : EX.tdalt);
      }
      const hasSpan = (rowspan && rowspan !== '1') || (colspan && colspan !== '1');
      if (hasSpan) {
        cellStyle = cellStyle.replace(/vertical-align:[^;]+;?/g, '');
        cellStyle += 'vertical-align:middle;text-align:center;';
      }
      const tag = isH ? 'th' : 'td';
      out += '<' + tag + spanAttrs + ' style="' + cellStyle + '">' + content + '</' + tag + '>';
    });
    out += '</tr>';
  });
  return out + '</table>';
}

function stripBullet(h) { return h.replace(/^[\s\u00b7\u2022\u25cf\u25aa\u25ab\uf0b7\u2023\u2043\u204c\u204d\u2219\u25d8\u25d9\-–•·]\s*/,''); }
function stripNumber(h) { return h.replace(/^\d+[\.\)]\s*/,''); }

// ══════════════════════════════════════════════════════════════
//  DETECCIÓN HEURÍSTICA DE ENCABEZADO
// ══════════════════════════════════════════════════════════════
function detectHeadingHeuristic(node) {
  const text = node.textContent.trim();
  if (!text || text.length > 120) return 0;
  const style = node.getAttribute('style') || '';
  const childNodes = Array.from(node.childNodes).filter(n =>
    n.nodeType === 3 ? n.textContent.trim() : n.nodeType === 1
  );
  const fsMatch = style.match(/font-size\s*:\s*([\d.]+)(pt|px)/i);
  if (fsMatch) {
    const size = parseFloat(fsMatch[1]);
    const unit = fsMatch[2].toLowerCase();
    const px = unit === 'pt' ? size * 1.333 : size;
    if (px >= 24) return 1;
    if (px >= 18) return 2;
    if (px >= 15) return 3;
    if (px >= 13) return 4;
  }
  const msoName = style.match(/mso-style-name\s*:\s*["']?([^;"']+)/i);
  if (msoName) {
    const n = msoName[1].toLowerCase().trim();
    if (n.includes('title') || n.includes('ttulo') || n.includes('titulo')) return 1;
    if (n.includes('heading 1') || n.includes('encabezado 1')) return 1;
    if (n.includes('heading 2') || n.includes('encabezado 2')) return 2;
    if (n.includes('heading 3') || n.includes('encabezado 3')) return 3;
    if (n.includes('heading 4') || n.includes('encabezado 4')) return 4;
  }
  const isAllBold = (n) => {
    if (n.nodeType === 3) return n.textContent.trim() === '';
    const t = n.tagName.toLowerCase();
    const s = n.getAttribute('style') || '';
    if (t === 'b' || t === 'strong') return true;
    if (s.match(/font-weight\s*:\s*(bold|[6-9]\d\d)/i)) return true;
    return Array.from(n.childNodes).every(isAllBold);
  };
  const allBold = childNodes.length > 0 && childNodes.every(isAllBold);
  const letters = text.replace(/[^a-záéíóúüñA-ZÁÉÍÓÚÜÑ]/g, '');
  const upperRatio = letters.length > 0
    ? (text.replace(/[^A-ZÁÉÍÓÚÜÑ]/g, '').length / letters.length)
    : 0;
  const isAllCaps = upperRatio >= 0.75;
  const numMatch = text.match(/^(\d+)(\.(\d+))?(\.(\d+))?[\s\.\-–]/);
  let numDepth = 0;
  if (numMatch) {
    numDepth = numMatch[3] ? (numMatch[5] ? 3 : 2) : 1;
  }
  if (allBold && isAllCaps && text.length <= 60) return 1;
  if (allBold && isAllCaps) return 2;
  if (allBold && numDepth === 1) return 2;
  if (allBold && numDepth === 2) return 3;
  if (allBold && numDepth === 3) return 4;
  if (allBold && text.length <= 50) return 3;
  if (isAllCaps && text.length <= 40) return 2;
  return 0;
}

// ══════════════════════════════════════════════════════════════
//  CONVERTIR BODY DE WORD
// ══════════════════════════════════════════════════════════════
function convertWordBody(body) {
  const st = {h1:0,h2:0,h3:0,h4:0,p:0,li:0,tb:0};
  let out = '';

  function walk(container) {
    const kids = Array.from(container.childNodes);
    let i = 0;
    while (i < kids.length) {
      const node = kids[i];
      if (node.nodeType === 3) { const t = node.textContent.trim(); if (t) { out += '<p style="'+EX.p+'">'+esc(t)+'</p>\n'; st.p++; } i++; continue; }
      if (node.nodeType !== 1) { i++; continue; }
      const tag = node.tagName.toLowerCase();
      const lvl = detectHeading(node);
      if (lvl > 0) {
        const content = getInline(node).replace(/[\r\n]+/g, ' ').replace(/^[\s\r\n]+|[\s\r\n]+$/g, '');
        if (content) {
          out += '<div style="margin:12px 0 8px 0;"><div style="' + EX['h'+lvl] + '">' + content + '</div></div>\n';
          if (lvl===1) st.h1++; else if (lvl===2) st.h2++; else if (lvl===3) st.h3++; else st.h4++;
        }
        i++; continue;
      }
      if (isWordList(node)) {
        const items = []; let ordered = false;
        while (i < kids.length && isWordList(kids[i])) {
          if (/^\d+[\.\)]\s/.test(kids[i].textContent.trim())) ordered = true;
          items.push(kids[i]); i++;
        }
        const lt = ordered ? 'ol' : 'ul';
        out += '<' + lt + ' style="' + EX[lt] + '">\n';
        items.forEach(item => {
          let c = getInline(item); c = stripBullet(c); if (ordered) c = stripNumber(c);
          if (c.trim()) out += '  <li style="' + EX.li + '">' + c + '</li>\n';
        });
        out += '</' + lt + '>\n'; st.li++; continue;
      }
      if (tag === 'ul' || tag === 'ol') {
        const lt = tag;
        out += '<' + lt + ' style="' + EX[lt] + '">\n';
        while (i < kids.length && kids[i].nodeType === 1 && kids[i].tagName.toLowerCase() === lt) {
          kids[i].querySelectorAll('li').forEach(li => {
            const c = getInline(li).replace(/[\r\n]+/g, ' ').trim();
            if (c) out += '  <li style="' + EX.li + '">' + c + '</li>\n';
          });
          i++;
        }
        out += '</' + lt + '>\n'; st.li++;
        continue;
      }
      if (tag === 'table') { out += '<div style="overflow-x:auto;margin:12px 0;">' + procTable(node) + '</div>\n'; st.tb++; i++; continue; }
      if (tag === 'img') {
        const src = node.getAttribute('src') || '';
        const alt = node.getAttribute('alt') || '';
        if (src) out += buildImageHTML(src, alt, '100%') + '\n';
        i++; continue;
      }
      if (tag === 'figure') {
        const img = node.querySelector('img');
        if (img) {
          const src = img.getAttribute('src') || '';
          const caption = node.querySelector('figcaption');
          const capText = caption ? caption.textContent.trim() : '';
          if (src) out += buildImageHTML(src, capText, 'auto') + '\n';
        }
        i++; continue;
      }
      if (tag === 'p') {
        const onlyImg = node.querySelector('img');
        const textContent = node.textContent.trim();
        if (onlyImg && !textContent) {
          const src = onlyImg.getAttribute('src') || '';
          const alt = onlyImg.getAttribute('alt') || '';
          if (src) out += buildImageHTML(src, alt, '100%') + '\n';
          i++; continue;
        }
        const content = getInline(node).replace(/[\r\n]+/g, ' ').replace(/^[\s\r\n]+|[\s\r\n]+$/g, '');
        if (!content) {
          if (!out.endsWith('>&nbsp;</p>\n')) {
            out += '<p style="' + EX.p + '">&nbsp;</p>\n';
          }
          i++; continue;
        }
        const hLvl = detectHeadingHeuristic(node);
        if (hLvl > 0) {
          out += '<div style="margin:12px 0 8px 0;"><div style="' + EX['h'+hLvl] + '">' + content + '</div></div>\n';
          if (hLvl===1) st.h1++; else if (hLvl===2) st.h2++; else if (hLvl===3) st.h3++; else st.h4++;
        } else {
          out += '<p style="' + EX.p + '">' + content + '</p>\n';
          st.p++;
        }
        i++; continue;
      }
      if (['div','section','article','main','header','footer','aside','nav','figure','blockquote'].includes(tag)) { walk(node); i++; continue; }
      i++;
    }
  }
  walk(body);

  function mergeLists(html) {
    html = html.replace(/<\/ol>\s*\n<ol[^>]*>/gi, '');
    html = html.replace(/<\/ul>\s*\n<ul[^>]*>/gi, '');
    return html;
  }
  return { html: mergeLists(out.trim()), stats: st };
}

// ══════════════════════════════════════════════════════════════
//  ESTADO GLOBAL DEL EDITOR
// ══════════════════════════════════════════════════════════════
const editor = document.getElementById('editor');
let savedRange = null;
let refreshTimer = null;

// ══════════════════════════════════════════════════════════════
//  SISTEMA DE DESHACER UNIVERSAL
// ══════════════════════════════════════════════════════════════
const undoStack  = [];
const redoStack  = [];
const MAX_UNDO   = 100;
let   undoLocked = false;
let   undoTimer  = null;
let   lastCursor = null;

function saveCursorPath() {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return null;
  const range = sel.getRangeAt(0);
  const path = [];
  let node = range.startContainer;
  while (node && node !== editor) {
    const parent = node.parentNode;
    if (!parent) return null;
    path.unshift(Array.from(parent.childNodes).indexOf(node));
    node = parent;
  }
  if (node !== editor) return null;
  return { path, offset: range.startOffset };
}

function restoreCursorPath(saved) {
  if (!saved) return;
  try {
    let node = editor;
    for (const idx of saved.path) {
      if (!node.childNodes[idx]) throw new Error();
      node = node.childNodes[idx];
    }
    if (!node || node === editor) throw new Error();
    const maxOff = node.nodeType === 3 ? node.textContent.length : node.childNodes.length;
    const r = document.createRange();
    r.setStart(node, Math.min(saved.offset, maxOff));
    r.collapse(true);
    const s = window.getSelection();
    s.removeAllRanges();
    s.addRange(r);
  } catch(e) {
    const r = document.createRange();
    r.selectNodeContents(editor);
    r.collapse(false);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
  }
}

function captureEditorCursor() {
  const c = saveCursorPath();
  if (c) lastCursor = c;
}

editor.addEventListener('keydown', captureEditorCursor, true);
editor.addEventListener('mouseup', captureEditorCursor, true);

document.querySelectorAll('.btn-action, .btn-copy').forEach(btn => {
  btn.addEventListener('mousedown', captureEditorCursor, true);
});

function snapshotUndo() {
  if (undoLocked) return;
  const html = editor.innerHTML;
  if (undoStack.length > 0 && undoStack[undoStack.length - 1].html === html) return;
  undoStack.push({ html, cursor: lastCursor });
  if (undoStack.length > MAX_UNDO) undoStack.shift();
  redoStack.length = 0;
}

function scheduleSnapshot() {
  clearTimeout(undoTimer);
  undoTimer = setTimeout(snapshotUndo, 500);
}

function saveBlockUndo() {
  captureEditorCursor();
  clearTimeout(undoTimer);
  snapshotUndo();
}

const undoObserver = new MutationObserver(() => {
  if (undoLocked) return;
  scheduleSnapshot();
});

function doUndo() {
  clearTimeout(undoTimer);
  const html = editor.innerHTML;
  if (undoStack.length === 0 || undoStack[undoStack.length-1].html !== html) {
    undoStack.push({ html, cursor: lastCursor });
  }
  if (undoStack.length < 2) { editor.focus(); return; }
  const current = undoStack.pop();
  redoStack.push(current);
  const prev = undoStack[undoStack.length - 1];
  undoLocked = true;
  editor.innerHTML = prev.html;
  savedRange = null;
  undoLocked = false;
  editor.focus();
  setTimeout(() => restoreCursorPath(current.cursor), 0);
  refreshOutput();
}

function doRedo() {
  if (redoStack.length === 0) { editor.focus(); return; }
  const next = redoStack.pop();
  undoStack.push({ html: editor.innerHTML, cursor: lastCursor });
  undoLocked = true;
  editor.innerHTML = next.html;
  savedRange = null;
  undoLocked = false;
  editor.focus();
  setTimeout(() => restoreCursorPath(next.cursor), 0);
  refreshOutput();
}

undoObserver.observe(editor, { childList: true, subtree: true, characterData: true });
undoStack.push({ html: editor.innerHTML, cursor: null });

document.querySelector('.toolbar').addEventListener('mousedown', function(e) {
  if (!e.target.closest('.btn-el')) return;
  captureEditorCursor();
  const sel = window.getSelection();
  if (sel && sel.rangeCount > 0) {
    const r = sel.getRangeAt(0);
    if (editor.contains(r.commonAncestorContainer)) {
      savedRange = r.cloneRange();
    }
  }
}, true);

// ══════════════════════════════════════════════════════════════
//  INSERCIÓN DE HTML
// ══════════════════════════════════════════════════════════════
function insertHTMLAtCursor(html) {
  saveBlockUndo();
  editor.focus();
  let range;
  const sel = window.getSelection();
  if (lastCursor) {
    restoreCursorPath(lastCursor);
    if (sel.rangeCount > 0) {
      range = sel.getRangeAt(0).cloneRange();
    }
  }
  if (!range && savedRange) {
    try {
      sel.removeAllRanges();
      sel.addRange(savedRange);
      range = sel.getRangeAt(0).cloneRange();
    } catch(e) { range = null; }
  }
  if (!range && sel.rangeCount > 0) {
    range = sel.getRangeAt(0).cloneRange();
  }
  if (!range) {
    range = document.createRange();
    range.selectNodeContents(editor);
    range.collapse(false);
  }
  savedRange = null;
  if (!editor.contains(range.commonAncestorContainer)) {
    range = document.createRange();
    range.selectNodeContents(editor);
    range.collapse(false);
  }
  range.deleteContents();
  const frag = document.createDocumentFragment();
  const tmp  = document.createElement('div');
  tmp.innerHTML = html;
  let lastNode = null;
  while (tmp.firstChild) { lastNode = tmp.firstChild; frag.appendChild(lastNode); }
  const after = document.createElement('p');
  after.innerHTML = '<br>';
  frag.appendChild(after);
  lastNode = after;
  range.insertNode(frag);
  const newRange = document.createRange();
  newRange.setStart(lastNode, 0);
  newRange.collapse(true);
  sel.removeAllRanges();
  sel.addRange(newRange);
  editor.dispatchEvent(new Event('input'));
}

function appendHTMLToEditor(html) {
  saveBlockUndo();
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  while (tmp.firstChild) editor.appendChild(tmp.firstChild);
  const sep = document.createElement('p'); sep.innerHTML = '<br>';
  editor.appendChild(sep);
  editor.dispatchEvent(new Event('input'));
}

function buildStyledParagraphsFromPlainText(text) {
  const normalized = String(text || '').replaceAll('\r\n', '\n').replaceAll('\r', '\n');
  const paragraphs = [];
  let current = [];
  normalized.split('\n').forEach(line => {
    if (line.trim()) {
      current.push(line);
    } else if (current.length) {
      paragraphs.push(current.join('\n'));
      current = [];
    }
  });
  if (current.length) paragraphs.push(current.join('\n'));
  return paragraphs
    .map(part => '<p style="' + EX.p + '">' + part.split('\n').map(esc).join('<br>') + '</p>')
    .join('\n');
}

// ══════════════════════════════════════════════════════════════
//  EVENTOS DEL EDITOR
// ══════════════════════════════════════════════════════════════
editor.addEventListener('input', function() {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(refreshOutput, 300);
});

editor.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); doUndo(); return; }
  if ((e.ctrlKey || e.metaKey) && e.key === 'y') { e.preventDefault(); doRedo(); return; }

  if (e.key !== 'Enter') return;
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return;
  const range = sel.getRangeAt(0);
  const node  = range.startContainer;
  const el    = node.nodeType === 3 ? node.parentElement : node;
  
  // 1. Añadimos 'li' a las excepciones para que las listas funcionen nativamente dentro del bloque
  if (el.closest('td, th, li')) return; 
  
  const styled = el.closest('div[style*="inline-block"]');
  if (!styled) return;
  
  e.preventDefault();

  // 2. Si es un Enter normal, insertamos un salto de línea DENTRO del bloque
  if (!e.shiftKey) {
    document.execCommand('insertLineBreak', false, null);
    refreshOutput();
    return;
  }

  // 3. Si pulsa SHIFT + ENTER, ejecutamos la lógica original para SALIR del bloque
  saveBlockUndo();
  const container = styled.closest('div[style*="margin"]') || styled;
  const beforeRange = document.createRange();
  beforeRange.selectNodeContents(styled);
  beforeRange.setEnd(range.startContainer, range.startOffset);
  const afterRange = document.createRange();
  afterRange.selectNodeContents(styled);
  afterRange.setStart(range.startContainer, range.startOffset);
  const atStart = beforeRange.toString().trim() === '';
  const atEnd   = afterRange.toString().trim() === '';
  function emptyP() { const p = document.createElement('p'); p.innerHTML = '<br>'; return p; }
  function moveCursorTo(el) {
    const r = document.createRange();
    r.setStart(el.firstChild || el, 0);
    r.collapse(true);
    sel.removeAllRanges();
    sel.addRange(r);
  }
  if (atStart) {
    container.parentNode.insertBefore(emptyP(), container);
  } else if (atEnd) {
    const p = emptyP();
    container.parentNode.insertBefore(p, container.nextSibling);
    moveCursorTo(p);
  } else {
    const splitRange = document.createRange();
    splitRange.setStart(range.startContainer, range.startOffset);
    splitRange.setEndAfter(styled.lastChild || styled);
    const extractedFrag = splitRange.extractContents();
    const afterText = extractedFrag.textContent || '';
    const newStyled = styled.cloneNode(false);
    newStyled.textContent = afterText;
    let newContainer;
    if (container !== styled) {
      newContainer = container.cloneNode(false);
      newContainer.appendChild(newStyled);
    } else {
      newContainer = newStyled;
    }
    const sep = emptyP();
    const insertBefore = container.nextSibling;
    container.parentNode.insertBefore(sep, insertBefore);
    container.parentNode.insertBefore(newContainer, sep.nextSibling);
    moveCursorTo(newStyled);
  }
  refreshOutput();
});

editor.addEventListener('paste', function(e) {
  const html = e.clipboardData.getData('text/html');
  const text = e.clipboardData.getData('text/plain');
  const isFromWord = html && (
    html.includes('urn:schemas-microsoft-com') ||
    html.includes('mso-') ||
    html.includes('MsoNormal') ||
    html.includes('w:WordDocument') ||
    html.includes('Microsoft Word')
  );
  if (isFromWord) {
    e.preventDefault();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const result = convertWordBody(doc.body);
    if (result.html) {
      insertHTMLAtCursor(result.html);
      updateStats(result.stats);
      setTimeout(() => {
        editor.querySelectorAll('td, th').forEach(cell => {
          if (!cell.getAttribute('contenteditable')) {
            cell.setAttribute('contenteditable', 'true');
            cell.style.outline = 'none';
            cell.style.cursor = 'text';
          }
        });
      }, 0);
    }
    return;
  }
  if (text && text.trim()) {
    e.preventDefault();
    const html = buildStyledParagraphsFromPlainText(text);
    if (html) insertHTMLAtCursor(html);
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(refreshOutput, 300);
    return;
  }
});

editor.addEventListener('dragover',  e => { e.preventDefault(); editor.classList.add('dragover'); });
editor.addEventListener('dragleave', ()  => editor.classList.remove('dragover'));
editor.addEventListener('drop', function(e) {
  e.preventDefault();
  editor.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (!file) return;
  if (file.name.toLowerCase().endsWith('.docx')) {
    handleDocxFile(file);
  } else if (file.type.startsWith('image/')) {
    compressAndInsertImage(file, '100%', '');
  } else {
    showToast('⚠️ Solo se admiten archivos .docx e imágenes');
  }
});

// ══════════════════════════════════════════════════════════════
//  BLOQUES DE ELEMENTOS
// ══════════════════════════════════════════════════════════════
const BLOCK_CFG = {
  h1:     { defaultText:'Título del módulo' },
  h2:     { defaultText:'Subtítulo de sección' },
  h3:     { defaultText:'Apartado' },
  h4:     { defaultText:'Subapartado' },
  body:   { defaultText:'Escribe aquí el texto del párrafo.' },
  goal:   { defaultText:'🎯 Al finalizar esta unidad, el bombero será capaz de identificar y aplicar correctamente el protocolo de actuación en...' },
  think:  { defaultText:'🤔 Antes de continuar, reflexiona: ¿cómo actuarías ante un incendio con baja visibilidad y salidas bloqueadas?' },
  note:   { defaultText:'⚠️ IMPORTANTE: Este procedimiento solo debe ejecutarse con el equipo de protección individual (EPI) completo y homologado.' },
  info:   { defaultText:'ℹ️ Información adicional: según el protocolo del CEIS, en situaciones de riesgo eléctrico se debe mantener una distancia mínima de seguridad de...' },
  tip:    { defaultText:'💡 Consejo práctico: durante los ejercicios de ventilación táctica, comprueba siempre la dirección del viento antes de abrir nuevas vías de entrada de aire.' },
  step:   { defaultText:'🔢 Paso 1: Evalúa el perímetro exterior del inmueble antes de acceder al interior.' },
  quote:    { defaultText:'«La seguridad no es un procedimiento, es una actitud.»' },
  extra:    { defaultText:'📚 Para ampliar conocimientos sobre este tema, consulta el Manual de Intervención en Incendios Estructurales del CEIS Madrid.' },
  practice: { defaultText:'🛠️ Práctica: Realiza el siguiente ejercicio siguiendo los pasos indicados por el instructor.' },
  divider:{ isSep:true },
  list:   { isList:true },
  def:    { isDef:true },
sequence: { isSequence:true }, // <--- LÍNEA NUEVA
};

function addBlock(type) {
  const cfg = BLOCK_CFG[type]; if (!cfg) return;
  saveBlockUndo(); // Guardamos el estado para que funcione el Ctrl+Z (Deshacer)
  let html = '';

  if (cfg.isSequence) {
    // 1. Preguntamos el número de pasos
    const numSteps = prompt("¿Cuántos pasos tiene la secuencia operativa?", "Escribe número de pasos de tu secuencia");
    if (!numSteps || isNaN(numSteps) || numSteps < 1) return;

    // 2. Generamos los pasos dinámicamente
    let stepsHtml = '';
    for (let i = 1; i <= parseInt(numSteps); i++) {
      const isOdd = i % 2 !== 0;
      const color = isOdd ? '#c0272d' : '#1a1a1a'; // Rojo para impares, negro para pares
      const shadow = isOdd ? 'box-shadow: 0 3px 6px rgba(192,39,45,0.2);' : '';

      stepsHtml += `
        <div style="display: flex; gap: 20px; margin-bottom: 25px;">
          <div style="flex-shrink: 0; width: 40px; height: 40px; background: ${color}; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; ${shadow}">${i}</div>
          <div style="border-bottom: 1px solid #f0f0f0; padding-bottom: 15px; width: 100%;">
            <h4 contenteditable="true" style="margin: 0 0 5px 0; color: #1a1a1a; font-size: 1.1rem; font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;">Título del Paso ${i}</h4>
            <p contenteditable="true" style="margin: 0; color: #666; font-size: 0.95rem; line-height: 1.6; font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;">Descripción detallada de la fase operativa ${i}.</p>
          </div>
        </div>`;
    }

    // 3. Montamos el bloque completo
    html = `
      <div class="sequence-block" style="margin:30px 0;font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;">
        <div style="width:100%;max-width:none;margin:0;background-color: #ffffff; padding: 10px;">
          <div style="border: 1px solid #eee; padding: 30px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
            <p style="color: #c0272d; font-size: 0.80rem; text-transform: uppercase; margin-bottom: 25px; font-weight: 800; letter-spacing: 1.5px; border-bottom: 1px solid #eee; padding-bottom: 5px; display: inline-block;">
              Bloque: Secuencia Operativa
            </p>
            ${stepsHtml}
          </div>
        </div>
      </div><p><br></p>`;

  } else if (cfg.isSep) {
    html = '<hr style="' + EX.divider + '">';
  } else if (cfg.isList) {
    html = '<ul style="' + EX.ul + '"><li style="' + EX.li + '">Elemento 1</li><li style="' + EX.li + '">Elemento 2</li><li style="' + EX.li + '">Elemento 3</li></ul>';
  } else if (cfg.isDef) {
    html = '<div style="margin:16px 0;">'
         + '<div style="' + EX.defterm + '" contenteditable="true">Término o concepto</div>'
         + '<div style="' + EX.defbody + '" contenteditable="true">Escribe aquí la definición o explicación del término.</div>'
         + '</div>';
  } else {
    html = '<div style="margin:12px 0;"><div style="' + EX[type] + '" contenteditable="true">' + esc(cfg.defaultText) + '</div></div>';
  }
  
  insertHTMLAtCursor(html);
}

// ══════════════════════════════════════════════════════════════
//  TABLA
// ══════════════════════════════════════════════════════════════
function openTableModal()  { document.getElementById('tableModal').classList.add('open'); setTimeout(()=>document.getElementById('tableCols').focus(),50); }
function closeTableModal() { document.getElementById('tableModal').classList.remove('open'); }
function confirmTable() {
  const cols = Math.max(1, Math.min(10, parseInt(document.getElementById('tableCols').value)||3));
  const rows = Math.max(1, Math.min(30, parseInt(document.getElementById('tableRows').value)||3));
  const head = document.getElementById('tableHeader').checked;
  closeTableModal();
  let t = '<div style="overflow-x:auto;margin:12px 0;"><table style="' + EX.table + '">';
  if (head) {
    t += '<tr>';
    for (let i=0;i<cols;i++) t += '<th style="' + EX.th + '">Columna '+(i+1)+'</th>';
    t += '</tr>';
  }
  for (let r=0;r<rows;r++) {
    t += '<tr>';
    for (let c=0;c<cols;c++) t += '<td style="' + (r%2===0 ? EX.td : EX.tdalt) + '">Dato '+(r*cols+c+1)+'</td>';
    t += '</tr>';
  }
  t += '</table></div>';
  insertHTMLAtCursor(t);
}
document.getElementById('tableModal').addEventListener('click', e => {
  if (e.target.id === 'tableModal') closeTableModal();
});

// ══════════════════════════════════════════════════════════════
//  MODAL MULTIMEDIA
// ══════════════════════════════════════════════════════════════
let currentMediaType = null;

const MEDIA_CFG = {
  imgurl: {
    title:'🔗 Insertar imagen desde URL',
    label:'URL de la imagen',
    hint: 'Introduce la URL de la imagen. Puede ser una imagen de internet, de tu servidor o de Moodle. La imagen se mostrará directamente en Moodle siempre que el alumno tenga acceso a esa URL.',
    placeholder:'https://ejemplo.com/imagen.jpg',
    extra:`<div style="margin-top:4px;">
      <label class="modal-label">Título / pie de foto</label>
      <input id="mediaCaption-imgurl" class="modal-input" type="text"
        style="font-size:13px;text-align:left;font-weight:400;letter-spacing:0;"
        placeholder="Ej: Figura 1 — Fases de un incendio">
    </div>
    <div style="margin-top:4px;">
      <label class="modal-label">Ancho máximo</label>
      <select id="mediaWidth-imgurl" class="modal-input" style="font-size:13px;text-align:left;font-weight:400;">
        <option value="100%">100% — ocupa todo el ancho</option>
        <option value="75%">75%</option>
        <option value="50%">50%</option>
        <option value="auto">Auto — tamaño original</option>
      </select>
    </div>`
  },
  img: {
    title:'🖼️ Insertar imagen',
    isFile: true,
    hint: 'Selecciona una imagen de tu ordenador. Se comprimirá automáticamente y quedará incrustada en el contenido — no necesitas subirla a ningún servidor.',
    extra:`
    <div style="margin-top:4px;">
      <label class="modal-label">Título / pie de foto</label>
      <input id="mediaCaption-img" class="modal-input" type="text"
        style="font-size:13px;text-align:left;font-weight:400;letter-spacing:0;"
        placeholder="Ej: Figura 1 — Fases de un incendio">
    </div>
    <div style="margin-top:4px;">
      <label class="modal-label">Ancho máximo</label>
      <select id="mediaWidth" class="modal-input" style="font-size:13px;text-align:left;font-weight:400;">
        <option value="100%">100% — ocupa todo el ancho</option>
        <option value="75%">75%</option>
        <option value="50%">50%</option>
        <option value="auto">Auto — tamaño original</option>
      </select>
    </div>`
  },
  video: {
    title:'🎬 Insertar vídeo',
    label:'URL del vídeo',
    hint: 'Pega la URL del vídeo. YouTube y YouTube Shorts se convierten automáticamente. Para la Mediateca EducaMadrid: abre el vídeo → Compartir/Insertar → copia la URL del iframe. Para cualquier otra plataforma: usa la URL directa del iframe embed.',
    placeholder:'https://mediateca.educa.madrid.org/video/... · https://youtube.com/watch?v=... · o cualquier URL embed',
    extra:`<div style="margin-top:4px;">
      <label class="modal-label">Título del vídeo</label>
      <input id="mediaCaption" class="modal-input" type="text"
        style="font-size:13px;text-align:left;font-weight:400;letter-spacing:0;"
        placeholder="Título que aparecerá debajo del vídeo">
    </div>`
  },
  pdf: {
    title:'📄 Insertar PDF',
    label:'URL del PDF',
    hint: 'Sube el PDF en el gestor de archivos de tu Página en Moodle y copia la URL (pluginfile.php/...).',
    placeholder:'https://tu-moodle.es/pluginfile.php/.../documento.pdf',
    extra:`<div style="margin-top:4px;">
      <label class="modal-label">Título del documento</label>
      <input id="mediaCaption" class="modal-input" type="text"
        style="font-size:13px;text-align:left;font-weight:400;letter-spacing:0;"
        placeholder="Título que aparecerá debajo del PDF">
    </div>
    <div style="margin-top:4px;">
      <label class="modal-label">Altura del visor</label>
      <select id="mediaHeight" class="modal-input" style="font-size:13px;text-align:left;font-weight:400;">
        <option value="60vh">60% de la pantalla</option>
        <option value="75vh" selected>75% de la pantalla</option>
        <option value="90vh">90% de la pantalla</option>
        <option value="100vh">100% — pantalla completa</option>
      </select>
    </div>
    <div style="margin-top:10px;background:#f8f9fa;border:1.5px solid #e4e7ec;border-radius:8px;padding:12px 14px;">
      <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;">
        <input type="checkbox" id="pdfProtect"
          style="width:16px;height:16px;margin-top:2px;accent-color:#C0272D;flex-shrink:0;">
        <span style="font-size:12px;color:#374151;line-height:1.5;">
          <strong>Proteger contra descarga e impresión</strong><br>
          <span style="color:#6b7280;">Oculta la barra de herramientas y el panel lateral del visor. Los alumnos podrán leer y navegar el documento, pero no verán los botones de descarga ni impresión. Funciona en Chrome y Edge.</span>
        </span>
      </label>
    </div>`
  },
  ppt: {
    title:'📊 Insertar presentación PowerPoint',
    label:'URL de la presentación',
    hint: 'Pega la URL según el origen. Ver opciones de compatibilidad abajo.',
    placeholder:'https://... (OneDrive, Google Slides, SharePoint o pluginfile Moodle)',
    extra:`<div style="margin-top:4px;">
      <label class="modal-label">Título de la presentación</label>
      <input id="pptCaption" class="modal-input" type="text"
        style="font-size:13px;text-align:left;font-weight:400;letter-spacing:0;"
        placeholder="Título que aparecerá debajo de la presentación">
    </div>
    <div style="margin-top:4px;">
      <label class="modal-label">Altura del visor</label>
      <select id="pptHeight" class="modal-input" style="font-size:13px;text-align:left;font-weight:400;">
        <option value="500px">Compacto (~500px)</option>
        <option value="600px" selected>Normal (~600px)</option>
        <option value="75vh">75% de la pantalla</option>
        <option value="90vh">90% de la pantalla</option>
      </select>
    </div>
    <div style="margin-top:10px;background:#fff8f0;border:1.5px solid #f59e0b;border-radius:8px;padding:10px 12px;font-size:11px;color:#374151;line-height:1.6;">
      <strong style="color:#92400e;">Fuentes compatibles:</strong><br>
      • <strong>OneDrive / SharePoint:</strong> abre la presentación → Compartir → Insertar → copia la URL del <code>src</code> del iframe.<br>
      • <strong>Google Slides:</strong> Archivo → Publicar en la web → Insertar → copia la URL del iframe. Se detecta automáticamente.<br>
      • <strong>Moodle (pluginfile.php):</strong> solo funciona si el curso permite acceso de invitado, o si el archivo es público.<br>
      • <strong>Cualquier URL embed</strong> de otra plataforma también funciona.
    </div>`
  }
};

function openMediaModal(type) {
  currentMediaType = type;
  const cfg = MEDIA_CFG[type];
  if (!cfg) return;
  document.getElementById('mediaModal-title').textContent = cfg.title;
  document.getElementById('mediaModal-label').textContent = cfg.label || '';
  document.getElementById('mediaModal-hint').textContent  = cfg.hint  || '';
  document.getElementById('mediaUrl').placeholder = cfg.placeholder || '';
  document.getElementById('mediaUrl').value = '';
  document.getElementById('mediaExtra').innerHTML = cfg.extra || '';
  const fileRow = document.getElementById('mediaFileRow');
  const urlRow  = document.getElementById('mediaUrlRow');
  if (cfg.isFile) {
    fileRow.style.display = '';
    urlRow.style.display  = 'none';
    const fi = document.getElementById('mediaFileInput');
    if (fi) fi.value = '';
    document.getElementById('imgPreviewWrap').style.display = 'none';
  } else {
    fileRow.style.display = 'none';
    urlRow.style.display  = '';
    setTimeout(() => document.getElementById('mediaUrl').focus(), 60);
  }
  document.getElementById('mediaModal').classList.add('open');
}

function closeMediaModal() {
  document.getElementById('mediaModal').classList.remove('open');
  currentMediaType = null;
}

// ══════════════════════════════════════════════════════════════
//  COMPRESIÓN DE IMÁGENES
// ══════════════════════════════════════════════════════════════
function compressBase64Image(dataUrl, maxW, quality, cb) {
  const img = new Image();
  img.onload = function() {
    const canvas = document.createElement('canvas');
    let w = img.width, h = img.height;
    if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    const useJpeg = dataUrl.startsWith('data:image/jpeg') || dataUrl.startsWith('data:image/jpg');
    if (useJpeg) { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h); }
    ctx.drawImage(img, 0, 0, w, h);
    cb(useJpeg ? canvas.toDataURL('image/jpeg', quality) : canvas.toDataURL('image/png'));
  };
  img.onerror = function() { cb(dataUrl); };
  img.src = dataUrl;
}

function compressAllImages(doc) {
  return new Promise(function(resolve) {
    const imgs = Array.from(doc.querySelectorAll('img'));
    const base64Imgs = imgs.filter(function(img) {
      return (img.getAttribute('src') || '').startsWith('data:image');
    });
    if (base64Imgs.length === 0) { resolve(); return; }
    let done = 0;
    base64Imgs.forEach(function(img) {
      compressBase64Image(img.src, 1200, 0.82, function(compressed) {
        img.src = compressed;
        done++;
        if (done === base64Imgs.length) resolve();
      });
    });
  });
}

// ══════════════════════════════════════════════════════════════
//  CARGA DE ARCHIVO .DOCX
// ══════════════════════════════════════════════════════════════
function handleDocxFile(file) {
  if (!file) return;
  if (!file.name.toLowerCase().endsWith('.docx')) {
    showToast('⚠️ Solo se admiten archivos .docx de Word'); return;
  }
  showToast('⏳ Procesando ' + file.name + '...');
  const reader = new FileReader();
  reader.onerror = function() { showToast('❌ No se pudo leer el archivo'); };
  reader.onload = function(e) {
    const arrayBuffer = e.target.result;
    mammoth.convertToHtml({ arrayBuffer }, {
      convertImage: mammoth.images.imgElement(function(image) {
        return image.read('base64').then(function(b64) {
          const type = image.contentType || '';
          if (/emf|wmf/i.test(type)) {
            const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="420" height="80"><rect width="420" height="80" fill="#fff8f0" stroke="#f59e0b" stroke-width="2" rx="6"/><text x="210" y="30" text-anchor="middle" font-family="Montserrat, Arial" font-size="13" fill="#92400e">Imagen EMF: no compatible con navegadores</text><text x="210" y="55" text-anchor="middle" font-family="Montserrat, Arial" font-size="11" fill="#b45309">Sustituye en Word por PNG o JPG antes de insertar</text></svg>';
            return { src: 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg))), alt: 'Imagen EMF no compatible' };
          }
          return { src: 'data:' + type + ';base64,' + b64 };
        });
      }),
      styleMap: [
        "p[style-name='Heading 1'] => h1", "p[style-name='Heading 2'] => h2",
        "p[style-name='Heading 3'] => h3", "p[style-name='Heading 4'] => h4",
        "p[style-name='Título 1']  => h1", "p[style-name='Título 2']  => h2",
        "p[style-name='Título 3']  => h3", "p[style-name='Título 4']  => h4",
        "p[style-name='Title']     => h1", "b => strong", "i => em", "u => u",
      ]
    })
    .then(function(result) {
      const html = result.value;
      if (!html || !html.trim()) { showToast('⚠️ El documento parece estar vacío'); return; }
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const imgCount = doc.querySelectorAll('img').length;
      return compressAllImages(doc).then(function() {
        const conv = convertWordBody(doc.body);
        appendHTMLToEditor(conv.html);
        updateStats(conv.stats);
        const imgMsg = imgCount > 0 ? ' · ' + imgCount + ' imagen(es)' : '';
        showToast('✅ ' + file.name + ' cargado' + imgMsg);
      });
    })
    .catch(function(err) {
      showToast('❌ Error al procesar el archivo: ' + (err.message || err));
    });
  };
  reader.readAsArrayBuffer(file);
}

function compressAndInsertImage(file, width, caption) {
  const MAX_W = 1200, QUALITY = 0.82;
  const useJpeg = /^image\/(jpe?g)$/i.test(file.type);
  const reader = new FileReader();
  reader.onerror = function() { showToast('❌ No se pudo leer la imagen'); };
  reader.onload = function(ev) {
    const img = new Image();
    img.onerror = function() { showToast('❌ Formato de imagen no válido'); };
    img.onload = function() {
      const canvas = document.createElement('canvas');
      let w = img.width, h = img.height;
      if (w > MAX_W) { h = Math.round(h * MAX_W / w); w = MAX_W; }
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (useJpeg) { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h); }
      ctx.drawImage(img, 0, 0, w, h);
      const dataUrl = useJpeg
        ? canvas.toDataURL('image/jpeg', QUALITY)
        : canvas.toDataURL('image/png');
      const kb = Math.round(dataUrl.length * 0.75 / 1024);
      if (kb > 800) showToast('⚠️ Imagen grande (' + kb + ' KB) — considera reducirla', 4000);
      const html = buildImageHTML(dataUrl, caption, width);
      closeMediaModal();
      insertHTMLAtCursor(html);
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

// ══════════════════════════════════════════════════════════════
//  CONSTRUCTORES DE HTML DE RECURSOS
// ══════════════════════════════════════════════════════════════
function buildImageHTML(src, caption, width) {
  const isAuto = !width || width === 'auto';
  const containerW = isAuto ? 'max-width:100%;' : 'width:' + width + ';';
  const imgStyle   = isAuto
    ? 'max-width:100%;width:auto;height:auto;border-radius:6px;display:block;margin:0 auto;'
    : 'width:100%;height:auto;border-radius:6px;display:block;';
  return '<div style="text-align:center;margin:20px 0;">' +
         '<div style="display:inline-block;' + containerW + 'background:#fff;' +
         'border:1px solid #d1d1d1;border-radius:10px;overflow:hidden;' +
         'box-shadow:0 4px 12px rgba(0,0,0,.12);font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;">' +
         '<div style="text-align:center;background:#f0f0f0;padding:16px;">' +
         '<img src="' + src + '" alt="' + esc(caption || 'Imagen') + '" ' +
         'style="' + imgStyle + '">' +
         '</div>' +
         '<div style="padding:12px 16px;background:#f9f9f9;border-top:1px solid #d1d1d1;text-align:center;">' +
         '<span contenteditable="true" style="font-weight:700;color:#333;font-size:1em;display:block;outline:none;cursor:text;" ' +
         'title="Haz clic para editar el título">🖼️ ' + (caption ? esc(caption) : 'Haz clic para escribir el título') + '</span>' +
         '</div>' +
         '</div>' +
         '</div>';
}

function buildPPTHTML(embedUrl, caption, height) {
  return '<div style="width:100%;margin:20px auto;background:#fff;border:1px solid #d1d1d1;'
       + 'border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.12);font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;">'
       + '<div style="position:relative;width:100%;height:' + height + ';background:#f5f5f5;">'
       + '<iframe src="' + embedUrl + '" '
       + 'style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" '
       + 'allowfullscreen></iframe>'
       + '</div>'
       + '<div style="padding:10px 16px;background:#f9f9f9;border-top:1px solid #d1d1d1;text-align:center;">'
       + '<span contenteditable="true" style="font-weight:700;color:#333;font-size:1em;display:block;outline:none;cursor:text;" '
       + 'title="Haz clic para editar el título">📊 ' + (caption ? esc(caption) : 'Haz clic para escribir el título') + '</span>'
       + '</div>'
       + '</div>';
}

// Previsualizar imagen en modal al seleccionarla
document.getElementById('mediaModal').addEventListener('change', function(e) {
  if (e.target.id !== 'mediaFileInput') return;
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    const prev = document.getElementById('imgPreview');
    const wrap = document.getElementById('imgPreviewWrap');
    const info = document.getElementById('imgFileInfo');
    prev.src = ev.target.result;
    info.textContent = file.name + ' · ' + Math.round(file.size/1024) + ' KB — se comprimirá automáticamente';
    wrap.style.display = 'block';
  };
  reader.readAsDataURL(file);
});

function confirmMedia() {
  if (currentMediaType === 'img') {
    const fileInput = document.getElementById('mediaFileInput');
    const file    = fileInput && fileInput.files && fileInput.files[0];
    const width   = (document.getElementById('mediaWidth')       || {value:'100%'}).value;
    const caption = (document.getElementById('mediaCaption-img') || {value:''}).value.trim();
    if (!file) { showToast('⚠️ Selecciona una imagen primero'); return; }
    compressAndInsertImage(file, width, caption);
    return;
  }
  if (currentMediaType === 'imgurl') {
    const url     = (document.getElementById('mediaUrl')            || {value:''}).value.trim();
    const caption = (document.getElementById('mediaCaption-imgurl') || {value:''}).value.trim();
    const width   = (document.getElementById('mediaWidth-imgurl')   || {value:'100%'}).value;
    if (!url) { showToast('⚠️ Introduce la URL de la imagen'); return; }
    const html = buildImageHTML(url, caption, width);
    closeMediaModal();
    insertHTMLAtCursor(html);
    return;
  }
  if (currentMediaType === 'ppt') {
    const raw     = (document.getElementById('mediaUrl')  || {value:''}).value.trim();
    const caption = (document.getElementById('pptCaption')|| {value:''}).value.trim();
    const height  = (document.getElementById('pptHeight') || {value:'600px'}).value;
    if (!raw) { showToast('⚠️ Introduce la URL de la presentación'); return; }
    let embedUrl = raw;
    const gsMatch = raw.match(/docs\.google\.com\/presentation\/d\/([^/]+)/);
    if (gsMatch) {
      embedUrl = 'https://docs.google.com/presentation/d/' + gsMatch[1] + '/embed?start=false&loop=false&delayms=3000';
    } else if (/onedrive\.live\.com|sharepoint\.com/.test(raw) && !raw.includes('view.officeapps')) {
      embedUrl = 'https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURIComponent(raw);
    } else if (/\.pptx?(\?|$)/i.test(raw) && !raw.includes('view.officeapps')) {
      embedUrl = 'https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURIComponent(raw);
    }
    const html = buildPPTHTML(embedUrl, caption, height);
    closeMediaModal();
    insertHTMLAtCursor(html);
    return;
  }
  const url = (document.getElementById('mediaUrl') || {value:''}).value.trim();
  if (!url) { showToast('⚠️ Introduce una URL'); return; }
  let html = '';
  if (currentMediaType === 'video') {
    const caption = (document.getElementById('mediaCaption') || {value:''}).value.trim();
    let embedUrl = url;
    const ytMatch  = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const ytShorts = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
    if (ytMatch)  embedUrl = 'https://www.youtube.com/embed/' + ytMatch[1];
    if (ytShorts) embedUrl = 'https://www.youtube.com/embed/' + ytShorts[1];
    html = '<div style="width:100%;margin:20px auto;background:#fff;border:1px solid #d1d1d1;' +
           'border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.12);font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;">' +
           '<div style="position:relative;width:100%;padding-bottom:56.25%;background:#000;">' +
           '<iframe src="' + embedUrl + '" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen></iframe>' +
           '</div>' +
           '<div style="padding:14px 18px;background:#f9f9f9;border-top:1px solid #d1d1d1;text-align:center;">' +
           '<span contenteditable="true" style="font-weight:700;color:#333;font-size:1.05em;display:block;outline:none;cursor:text;" ' +
           'title="Haz clic para editar el título">🎬 ' + (caption ? esc(caption) : 'Haz clic para escribir el título') + '</span>' +
           '</div>' +
           '</div>';
  }
  if (currentMediaType === 'pdf') {
    const caption   = (document.getElementById('mediaCaption') || {value:''}).value.trim();
    const height    = (document.getElementById('mediaHeight')  || {value:'75vh'}).value;
    const protect   = document.getElementById('pdfProtect');
    const doProtect = protect ? protect.checked : false;
    const params = doProtect ? '#toolbar=0&navpanes=0&scrollbar=1' : '#scrollbar=1';
    html = '<div style="width:100%;margin:20px auto;border-radius:10px;' +
           'overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.12);font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;">' +
           '<iframe src="' + url + params + '" ' +
           'style="width:100%;height:' + height + ';border:0;display:block;min-height:300px;">' +
           '</iframe>' +
           (caption ? '<div style="padding:14px 18px;background:#f9f9f9;border-top:1px solid #d1d1d1;text-align:center;">' +
             '<span style="font-weight:700;color:#333;font-size:1.05em;">📄 ' + esc(caption) + '</span></div>' : '') +
           '</div>';
  }
  if (html) { closeMediaModal(); insertHTMLAtCursor(html); }
}

document.getElementById('mediaModal').addEventListener('click', e => {
  if (e.target.id === 'mediaModal') closeMediaModal();
});
document.getElementById('mediaModal').addEventListener('keydown', e => {
  if (e.key === 'Enter') confirmMedia();
  if (e.key === 'Escape') closeMediaModal();
});

// ══════════════════════════════════════════════════════════════
//  BANNER INSTITUCIONAL + ESCUDO
// ══════════════════════════════════════════════════════════════
const ESCUDO_B64 = 'data:image/jpeg;base64,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';

function onBannerToggle() {
  const on = document.getElementById('toggle-banner').checked;
  document.getElementById('banner-toggle-label').textContent =
    on ? '📄 Documento completo' : '🧩 Solo bloque';
}

function onAreaChange() {
  const sel = document.getElementById('area-select');
  sel.classList.toggle('has-value', sel.value !== '');
}

function buildBanner(position) {
  const sel   = document.getElementById('area-select');
  const val   = sel ? sel.value : '';
  const parts = val ? val.split('|') : [];
  const code  = parts[0] || '';
  const name  = parts[1] || '';
  const marginTop    = position === 'footer' ? 'margin-top:24px;' : '';
  const marginBottom = position === 'header' ? 'margin-bottom:24px;' : '';
  const moduleHtml = code
    ? '<div style="flex:1 1 0;min-width:0;text-align:right;padding-left:10px;border-left:1px solid #ead1d2;box-sizing:border-box;word-break:break-word;overflow-wrap:anywhere;">'
      + '<div style="font-size:12px;font-weight:800;color:#c0272d;letter-spacing:.8px;line-height:1.25;">' + esc(code) + '</div>'
      + '<div style="font-size:10px;font-weight:600;color:#374151;margin-top:4px;line-height:1.25;text-transform:uppercase;">' + esc(name) + '</div>'
      + '</div>'
    : '<div style="flex:1 1 0;min-width:0;">&nbsp;</div>';
  return '<div style="font-family:Montserrat,'IBM Plex Sans','Segoe UI',Arial,sans-serif;max-width:850px;width:100%;box-sizing:border-box;margin-left:auto;margin-right:auto;' + marginTop + marginBottom
    + 'border:2px solid #c0272d;border-radius:8px;background:#f9f9f9;padding:10px 12px;overflow:hidden;">'
    + '<div style="display:flex;flex-direction:row;flex-wrap:nowrap;align-items:center;justify-content:space-between;gap:10px;width:100%;box-sizing:border-box;">'
    + '<div style="flex:1 1 0;min-width:0;display:flex;align-items:center;gap:8px;text-align:left;box-sizing:border-box;word-break:break-word;overflow-wrap:anywhere;">'
    + '<img src="' + ESCUDO_B64 + '" alt="Escudo Bomberos" style="width:44px;height:44px;display:block;flex:0 0 auto;">'
    + '<div style="min-width:0;">'
    + '<div style="font-size:10.5px;font-weight:800;color:#0a1628;letter-spacing:.25px;text-transform:uppercase;line-height:1.22;">Cuerpo de Bomberos<br>Comunidad de Madrid</div>'
    + '<div style="font-size:9.5px;color:#c0272d;font-weight:700;margin-top:3px;line-height:1.2;">Área de Formación</div>'
    + '</div>'
    + '</div>'
    + moduleHtml
    + '</div>'
    + '</div>';
}

// ══════════════════════════════════════════════════════════════
//  IDENTIFICAR BLOQUES
// ══════════════════════════════════════════════════════════════
function getBlockLabel(el) {
  const s = (el.getAttribute && el.getAttribute('style')) || '';
  const tag = el.tagName ? el.tagName.toLowerCase() : '';
  if (tag === 'p') return null;
  if (tag === 'hr') return '── Línea divisoria';
  if (s.includes('background:#C0272D') || s.includes('background:#c0272d')) return '── Título H1';
  if (s.includes('background:#8E1B1F') || s.includes('background:#8e1b1f')) return '── Título H2';
  if (s.includes('background:#fff0f0')) return '── Título H3';
  if (s.includes('border-bottom:2px solid #e8b4b5')) return '── Título H4';
  if (s.includes('#2e7d32')) return '── Bloque: Objetivo';
  if (s.includes('#7b1fa2')) return '── Bloque: Reflexión';
  if (s.includes('#f59e0b')) return '── Bloque: Aviso';
  if (s.includes('#1d4ed8')) return '── Bloque: Info';
  if (s.includes('#0d9488') && !s.includes('#0f766e')) return '── Bloque: Consejo';
  if (s.includes('#4338ca')) return '── Bloque: Paso';
  if (s.includes('#0f766e')) return '── Bloque: Práctica';
  if (s.includes('#94a3b8')) return '── Bloque: Cita';
  if (s.includes('#6b7280')) return '── Bloque: Extra';
  if (tag === 'ul') return '── Lista';
  if (tag === 'ol') return '── Lista numerada';
  if (tag === 'div' && el.querySelector('ul')) return '── Lista';
  if (tag === 'div' && el.querySelector('ol')) return '── Lista numerada';
  if (tag === 'div' && el.querySelector('table')) return '── Tabla';
  if (tag === 'table') return '── Tabla';
  if (el.querySelector && el.querySelector('img')) return '── Imagen';
  if (el.querySelector && el.querySelector('[style*="background-color:#eeeeee"]')) return '── Definición';
  if (el.querySelector && el.querySelector('iframe')) {
    const src = (el.querySelector('iframe').getAttribute('src') || '');
    if (src.includes('youtube') || src.includes('youtu')) return '── Vídeo: YouTube';
    if (src.includes('educamadrid')) return '── Vídeo: Mediateca EducaMadrid';
    if (src.includes('docs.google.com/presentation') || src.includes('view.officeapps') || src.includes('sharepoint') || src.includes('onedrive')) return '── Presentación PowerPoint';
    return '── Vídeo';
  }
  return null;
}

// ══════════════════════════════════════════════════════════════
//  CONSTRUIR HTML FINAL
// ══════════════════════════════════════════════════════════════
function buildFinalHTML() {
  const clone = editor.cloneNode(true);
  clone.querySelectorAll('[contenteditable]').forEach(el => el.removeAttribute('contenteditable'));
  clone.querySelectorAll('[bis_skin_checked]').forEach(el => el.removeAttribute('bis_skin_checked'));
  applyOptimizedReadingWidthForExport(clone);
  let blockIndex = 0;
  Array.from(clone.childNodes).forEach(node => {
    const label = getBlockLabel(node);
    if (label) {
      blockIndex++;
      const comment = document.createComment(` BLOQUE ${blockIndex}: ${label} `);
      clone.insertBefore(comment, node);
    }
  });
  let html = clone.innerHTML || '';
  html = html.replace(/ style="outline: none; cursor: text;"/gi, '');
  html = html.replace(/<p><br><\/p>/gi, '<p>&nbsp;</p>');
  const PLACEHOLDER = '\x00BR\x00';
  html = html.replace(/(<t[dh][^>]*>[\s\S]*?<\/t[dh]>)/gi, match =>
    match.replace(/<br\s*\/?>/gi, PLACEHOLDER)
  );
  html = html.replace(/<br\s*\/?>/gi, '');
  html = html.replace(/\x00BR\x00/g, '<br>');
  html = html.trim();
  if (html && html !== '<p>&nbsp;</p>') {  
    const includeBanner = document.getElementById('toggle-banner')?.checked !== false;  
    if (includeBanner) {  
      html = buildBanner('header') + '\n' + html + '\n' + buildBanner('footer');  
    }  
    html = EXPORT_RESPONSIVE_STYLE + '<div class="scorm-content-754" style="' + EXPORT_WRAP_STYLE + '">' + html + '</div>';  
  }  
  return html;
}

// ══════════════════════════════════════════════════════════════
//  REFRESCAR OUTPUT / STATS / LIMPIAR / COPIAR
// ══════════════════════════════════════════════════════════════
function refreshOutput() {
  const html    = buildFinalHTML();
  const btnCopy = document.getElementById('btn-copy');
  if (btnCopy) btnCopy.disabled = !html || html === '<p>&nbsp;</p>';
}

function updateStats(st) {
  const set = (id, label, val) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = label + ': ' + (val > 0 ? val : '—');
    el.classList.toggle('on', val > 0);
  };
  set('s-h1','H1',st.h1); set('s-h2','H2',st.h2); set('s-h3','H3',st.h3); set('s-h4','H4+',st.h4);
  set('s-p','Párrs',st.p); set('s-li','Listas',st.li); set('s-tb','Tablas',st.tb);
}

function clearAll() {
  editor.innerHTML = '';
  updateStats({h1:0,h2:0,h3:0,h4:0,p:0,li:0,tb:0});
  refreshOutput();
}

async function copyHTML() {
  const areaSel = document.getElementById('area-select');
  if (!areaSel || !areaSel.value) {
    document.getElementById('moduleWarnModal').classList.add('open');
    return;
  }
  const html = buildFinalHTML();
  if (!html) return;
  try {
    await navigator.clipboard.writeText(html);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = html; ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
    document.body.appendChild(ta); ta.focus(); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
  }
  const overlay = document.getElementById('copy-success');
  overlay.classList.add('show');
  setTimeout(() => overlay.classList.remove('show'), 3500);
}

function closeModuleWarn() {
  document.getElementById('moduleWarnModal').classList.remove('open');
  setTimeout(() => {
    const s = document.getElementById('area-select');
    if (s) { s.focus(); s.classList.add('area-select-warn'); setTimeout(()=>s.classList.remove('area-select-warn'),3000); }
  }, 100);
}

// ══════════════════════════════════════════════════════════════
//  TOAST
// ══════════════════════════════════════════════════════════════
function showToast(msg, duration) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => t.classList.remove('show'), duration || 3000);
}

// ══════════════════════════════════════════════════════════════
//  FORMATO DE TEXTO
// ══════════════════════════════════════════════════════════════
function applyFmt(cmd, val = null) {
  saveBlockUndo();
  editor.focus();

  if (cmd === 'fontSize') {
    // Mapeo de valores 1-7 a píxeles reales (estándar Moodle)
    const sizeMap = {
      '1': '10px',
      '2': '13px',
      '3': '15px', // Normal
      '4': '18px',
      '5': '24px',
      '6': '32px',
      '7': '48px'
    };
    
    // Forzamos al navegador a usar estilos CSS en lugar de etiquetas <font>
    document.execCommand('styleWithCSS', false, true);
    document.execCommand(cmd, false, val);
    
    // Si el navegador ha creado un <font> a pesar de lo anterior, lo corregimos
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const parent = selection.getRangeAt(0).commonAncestorContainer.parentElement;
      if (parent && parent.nodeName === 'FONT') {
        const span = document.createElement('span');
        span.style.fontSize = sizeMap[val] || '15px';
        if (parent.face) span.style.fontFamily = parent.face;
        span.innerHTML = parent.innerHTML;
        parent.parentNode.replaceChild(span, parent);
      }
    }
    document.execCommand('styleWithCSS', false, false);
  } else if (cmd === 'fontName') {
    // También forzamos CSS para el nombre de la fuente
    document.execCommand('styleWithCSS', false, true);
    document.execCommand(cmd, false, val);
    document.execCommand('styleWithCSS', false, false);
  } else {
    // Comandos normales (bold, italic, etc.)
    document.execCommand(cmd, false, val);
  }

  updateFormatButtons();
  refreshOutput();
}

function updateFormatButtons() {
  // 1. Botones de estado (Negrita, Cursiva, etc.)
  const cmds = ['bold','italic','underline','justifyLeft','justifyCenter','justifyRight'];
  cmds.forEach(cmd => {
    const btns = document.querySelectorAll('.fmt-btn[onclick*="' + cmd + '"]');
    btns.forEach(btn => btn.classList.toggle('active', document.queryCommandState(cmd)));
  });

  // 2. Actualizar selector de Fuente
  const fontNameSel = document.querySelector('select[onchange*="fontName"]');
  if (fontNameSel) {
    let currentFont = document.queryCommandValue('fontName').replace(/"/g, "");
    fontNameSel.value = currentFont || "Montserrat"; 
  }

  // 3. Actualizar selector de Tamaño
  const fontSizeSel = document.querySelector('select[onchange*="fontSize"]');
  if (fontSizeSel) {
    let currentSize = document.queryCommandValue('fontSize');
    
    // Si el navegador nos devuelve un tamaño en PX (ej: "24px"), lo mapeamos de vuelta al 1-7
    if (currentSize && currentSize.includes('px')) {
        const pxMap = { '10px':'1','13px':'2','15px':'3','18px':'4','24px':'5','32px':'6','48px':'7' };
        currentSize = pxMap[currentSize] || "3";
    }
    fontSizeSel.value = currentSize || "3";
  }
}

editor.addEventListener('keyup',   updateFormatButtons);
editor.addEventListener('mouseup', updateFormatButtons);
editor.addEventListener('selectionchange', updateFormatButtons);

// ══════════════════════════════════════════════════════════════
//  SISTEMA DE AYUDA
// ══════════════════════════════════════════════════════════════
const HELP_CONTENT = {
  s1: {
    icon:'📝', title:'Crear contenido',
    html:`
      <p>Tienes tres formas de crear contenido en el editor:</p>
      <ol>
        <li><strong>Escribir directamente:</strong> haz clic en el área blanca del editor y escribe como en cualquier procesador de texto.</li>
        <li><strong>Pegar desde Word:</strong> copia el texto en Word con <kbd>Ctrl+C</kbd>, haz clic en el editor y pega con <kbd>Ctrl+V</kbd>. El asistente detecta automáticamente los títulos, párrafos, listas, tablas y formatos.</li>
        <li><strong>Abrir un archivo .docx:</strong> pulsa el botón rojo <strong>📂 Abrir Word (.docx)</strong> o arrastra el archivo directamente sobre el editor. El documento se convierte automáticamente.</li>
      </ol>
      <p>Si pegas desde <strong>Word Online</strong> (el navegador), el reconocimiento de títulos puede ser menos preciso. Para mejores resultados usa <strong>Word de escritorio</strong>.</p>

<p>El asistente también detecta automáticamente:</p>
<ul>
  <li>Tablas complejas (con colores y celdas combinadas)</li>
  <li>Imágenes incluidas en el documento</li>
  <li>Estructura de títulos jerárquicos</li>
</ul>

<div class="help-tip">
💡 Cuanto mejor esté estructurado el documento en Word, mejor será el resultado en Moodle.
</div>

      <div class="help-tip">💡 Para que los títulos se detecten correctamente, aplica en Word los estilos <strong>Título 1, Título 2, Título 3</strong> (no solo negrita manual). Atajo: <kbd>Ctrl+Alt+1</kbd>, <kbd>Ctrl+Alt+2</kbd>, <kbd>Ctrl+Alt+3</kbd>.</div>`
  },
  s2: {
    icon:'🧩', title:'Bloques especiales',
    html:`
      <p>Los bloques especiales son elementos visuales que destacan contenido importante. Para insertarlos:</p>
      <ol>
        <li>Coloca el cursor en el editor en la posición donde quieres el bloque.</li>
        <li>Pulsa el botón correspondiente en la barra de herramientas.</li>
        <li>El bloque aparece en la posición del cursor con texto de ejemplo.</li>
        <li>Haz clic sobre el texto del bloque para editarlo.</li>
      </ol>
      <p>Bloques disponibles:</p>
      <ul>
        <li><strong>🎯 Objetivo:</strong> qué aprenderá el alumno al finalizar la unidad.</li>
        <li><strong>🤔 Reflexión:</strong> pregunta para que el alumno piense antes de continuar.</li>
        <li><strong>⚠️ Aviso:</strong> información crítica de seguridad o advertencia importante.</li>
        <li><strong>ℹ️ Info:</strong> información complementaria no crítica.</li>
        <li><strong>💡 Consejo:</strong> buena práctica o recomendación del instructor.</li>
        <li><strong>🔢 Paso:</strong> instrucción numerada dentro de un procedimiento.</li>
        <li><strong>🛠️ Práctica:</strong> ejercicio o actividad práctica para el alumno.</li>
        <li><strong>«» Cita:</strong> referencia, fuente o cita textual.</li>
        <li><strong>📚 Extra:</strong> material de ampliación opcional.</li>
      </ul>

<div class="help-tip">
💡 Los bloques son editables directamente: haz clic sobre el texto para modificarlo.
</div>

<div class="help-tip">
💡 <strong>Escribir en bloques:</strong> Pulsa <kbd>Enter</kbd> para añadir texto o crear listas <strong>dentro</strong> del propio bloque.
</div>

<div class="help-tip">
💡 <strong>Salir del bloque:</strong> Pulsa <kbd>Mayús</kbd> + <kbd>Enter</kbd> para finalizar el bloque y crear un párrafo nuevo debajo.
</div>

<div class="help-tip">
💡 <strong>Mover bloques:</strong> Selecciónalo con el ratón, córtalo con <kbd>Ctrl+X</kbd> y pégalo donde quieras con <kbd>Ctrl+V</kbd>.
</div>`
  },
  s3: {
    icon:'🖼️', title:'Imágenes',
    html:`
      <p>Tienes cuatro formas de insertar imágenes:</p>
      <p><strong>1. Desde tu equipo — botón 🖼️ Imagen (recomendado)</strong></p>
     <ol>
  <li>Coloca el cursor donde quieres la imagen.</li>
  <li>Pulsa <strong>🖼️ Imagen</strong>.</li>
  <li>Selecciona el archivo.</li>
  <li>Configura <strong>pie de foto</strong> y <strong>ancho</strong>.</li>
  <li>Pulsa <strong>Insertar</strong>.</li>
</ol>
      <p><strong>2. Desde una URL — botón 🔗 Imagen URL</strong></p>
      <ol>
        <li>Coloca el cursor donde quieres la imagen.</li>
        <li>Pulsa <strong>🔗 Imagen URL</strong> en la barra de herramientas.</li>
        <li>Pega la URL completa de la imagen.</li>
        <li>Escribe un pie de foto y elige el ancho.</li>
        <li>Pulsa <strong>Insertar</strong>.</li>
      </ol>
      <p><strong>3. Arrastrando al editor</strong></p>
      <p>Arrastra un archivo de imagen desde tu ordenador directamente sobre el área del editor.</p>
      <p><strong>4. Desde un documento Word (.docx)</strong></p>
<p>Las imágenes se detectan automáticamente al importar el documento.</p>

<ul>
  <li>Se comprimen automáticamente</li>
  <li>Se insertan en el flujo del contenido</li>
  <li>Se adaptan al ancho del editor</li>
</ul>

<div class="help-tip">
💡 <strong>NUEVO:</strong> Tras importar desde Word, puedes ajustar el tamaño modificando el ancho desde el propio bloque si lo reinsertas o editas.
</div>

      <div class="help-tip">💡 El pie de foto es editable directamente haciendo clic sobre él en el editor.</div>`
  },
  s4: {
    icon:'🎬', title:'Vídeos',
    html:`
      <p>Puedes insertar vídeos de cualquier plataforma. En el asistente, coloca el cursor donde quieras el vídeo y pulsa <strong>🎬 Vídeo</strong>.</p>
      <p><strong>YouTube</strong></p>
      <ol>
        <li>Abre el vídeo en YouTube.</li>
        <li>Copia la URL de la barra del navegador.</li>
        <li>Pégala en el asistente — se convierte automáticamente al formato embed.</li>
      </ol>
      <p><strong>Mediateca EducaMadrid</strong></p>
      <ol>
        <li>Abre el vídeo en la Mediateca.</li>
        <li>Pulsa el botón <strong>Compartir</strong> o <strong>Insertar</strong>.</li>
        <li>Copia la URL del iframe.</li>
      </ol>

<div class="help-tip">
💡 El vídeo se adapta automáticamente al ancho del contenido.
</div>

      <div class="help-tip">💡 La Mediateca de EducaMadrid es la opción más recomendada para contenido institucional.</div>`
  },
  s5: {
    icon:'📄', title:'PDF incrustado',
    html:`
      <p>Para insertar un PDF que los alumnos puedan leer sin descargar:</p>
      <ol>
        <li>Sube el PDF a tu Página en Moodle y copia la URL (<code>pluginfile.php/...</code>).</li>
        <li>En el asistente, pulsa <strong>📄 PDF</strong>.</li>
        <li>Pega la URL, escribe un título y elige la altura del visor.</li>
        <li>Pulsa <strong>Insertar</strong>.</li>
      </ol>
      <p>En Chrome y Edge el visor no muestra botones de descarga ni impresión si activas la protección.</p>
      <div class="help-tip">⚠️ La URL debe empezar por <code>pluginfile.php</code>, no por <code>draftfile.php</code>.</div>`
  },
  s6: {
    icon:'📊', title:'Tablas',
    html:`
      <p>Tienes dos formas de trabajar con tablas:</p>
      <p><strong>Desde Word (recomendado):</strong> diseña la tabla en Word y pégala con <kbd>Ctrl+V</kbd>. El asistente detecta automáticamente el formato, los colores y las celdas combinadas.</p>
      <p><strong>Desde el asistente:</strong></p>
      <ol>
        <li>Pulsa <strong>📊 Tabla</strong> en la barra de herramientas.</li>
        <li>Indica el número de columnas, filas y si quieres fila de cabecera.</li>
        <li>Pulsa <strong>Insertar tabla</strong>.</li>
        <li>Haz clic en cualquier celda para editar su contenido.</li>
      </ol>

<div class="help-tip">
💡 Las tablas importadas desde Word mantienen:
<ul>
  <li>Colores de fondo</li>
  <li>Formato de texto</li>
  <li>Celdas combinadas</li>
</ul>
</div>

<div class="help-tip">
💡 Puedes editar cualquier celda directamente haciendo clic sobre ella.
</div>

      <div class="help-tip">💡 Dentro de las celdas puedes pulsar <kbd>Enter</kbd> para añadir saltos de línea sin salir de la celda.</div>`
  },
  s7: {
    icon:'📋', title:'Copiar a Moodle',
    html:`
      <p>Una vez tengas el contenido listo en el editor:</p>
      <ol>
        <li><strong>Selecciona tu módulo</strong> en el desplegable de la barra inferior.</li>
        <li>Pulsa el botón rojo <strong>📋 Copiar para pegar en Moodle</strong>.</li>
        <li>Ve a tu curso en Moodle y entra en la Página o Libro donde quieres pegar.</li>
        <li>Activa la edición y abre el editor de texto.</li>
        <li>En la barra del editor de Moodle, busca el botón <strong>&lt;/&gt;</strong> (editor HTML).</li>
        <li>Dentro del editor HTML de Moodle, pega con <kbd>Ctrl+V</kbd>.</li>
        <li>Cierra el editor HTML y guarda la página.</li>
      </ol>

<div class="help-tip">
💡 El contenido se copia con estilos inline compatibles con Moodle (TinyMCE / Atto).
</div>

<div class="help-tip">
⚠️ No modifiques el HTML directamente en Moodle después de pegar, ya que puedes romper el diseño.
</div>

      <div class="help-tip">⚠️ No pegues directamente en el editor visual de Moodle. Usa siempre el editor HTML <kbd>&lt;/&gt;</kbd>.</div>`
  },
  s8: {
    icon:'⌨️', title:'Atajos de teclado',
    html:`
      <p>Atajos útiles mientras trabajas en el editor:</p>
      <ul>
        <li><kbd>Ctrl+V</kbd> — pegar</li>
        <li><kbd>Ctrl+X</kbd> — cortar</li>
        <li><kbd>Ctrl+Z</kbd> — deshacer</li>
        <li><kbd>Ctrl+B</kbd> — negrita</li>
        <li><kbd>Ctrl+I</kbd> — cursiva</li>
        <li><kbd>Enter</kbd> al final de un bloque especial — crea párrafo nuevo después</li>
        <li><kbd>Enter</kbd> al inicio de un bloque especial — inserta párrafo vacío antes</li>
        <li><kbd>Enter</kbd> dentro de una celda de tabla — salto de línea sin salir de la celda</li>
      </ul>
      <p>Atajos en Word para aplicar estilos de título:</p>
      <ul>
        <li><kbd>Ctrl+Alt+1</kbd> — Título 1 | <kbd>Ctrl+Alt+2</kbd> — Título 2 | <kbd>Ctrl+Alt+3</kbd> — Título 3</li>
        <li><kbd>Ctrl+0</kbd> — volver al estilo Normal</li>
      </ul>`
  },
  s9: {
    icon:'✉️', title:'Contacto y sugerencias',
    html:`
      <p>Si encuentras algún problema o tienes sugerencias, escríbenos a:</p>
      <div style="text-align:center;margin:20px 0;">
        <a href="mailto:aulavirtualcbcm@madrid.org"
           style="display:inline-block;background:#C0272D;color:#fff;padding:12px 28px;
           border-radius:8px;font-weight:700;font-size:15px;text-decoration:none;
           box-shadow:0 4px 12px rgba(192,39,45,.3);">
          ✉️ aulavirtualcbcm@madrid.org
        </a>
      </div>
      <p>Al escribirnos, indica el navegador, el problema o sugerencia, y si es posible un ejemplo del contenido.</p>
      <div class="help-tip">💡 Para incidencias urgentes, incluye el nombre del curso y la fecha límite en el asunto del correo.</div>`
  },
  s10: {
    icon:'📚', title:'Selector de módulo',
    html:`
      <p>El selector de módulo está en la <strong>barra inferior</strong> del asistente.</p>
      <p>Es <strong>obligatorio</strong> seleccionar un módulo antes de copiar el contenido.</p>
      <p>Al seleccionar un módulo:</p>
      <ul>
        <li>El desplegable se pone verde para confirmar la selección.</li>
        <li>El módulo aparece en el <strong>encabezado y pie</strong> del HTML exportado.</li>
      </ul>
      <div class="help-tip">💡 El módulo que selecciones solo aplica a la sesión actual.</div>`
  },

s11: {
  icon:'⚙️',
  title:'Cómo funciona el editor',
  html:`
  <p>El editor funciona como un sistema estructurado basado en bloques.</p>

  <ul>
    <li>Cada elemento se inserta como HTML limpio compatible con Moodle</li>
    <li>Los estilos se aplican en línea (inline CSS)</li>
    <li>El contenido es totalmente editable después de insertarlo</li>
  </ul>

  <div class="help-tip">
  💡 Esto evita problemas de compatibilidad con Moodle y asegura que el diseño se mantenga estable.
  </div>
  `
}

};

function openHelp()  {
  showHelpCards();
  document.getElementById('helpModal').classList.add('open');
}
function closeHelp() { document.getElementById('helpModal').classList.remove('open'); }

function showHelpCards() {
  document.getElementById('helpCards').style.display = 'block';
  document.getElementById('helpSection').style.display = 'none';
  document.getElementById('helpBody').scrollTop = 0;
}

function showHelpSection(id) {
  const data = HELP_CONTENT[id];
  if (!data) return;
  document.getElementById('helpCards').style.display = 'none';
  document.getElementById('helpSectionContent').innerHTML =
    '<div class="help-section-title"><span>' + data.icon + '</span>' + data.title + '</div>' +
    '<div class="help-section-body">' + data.html + '</div>';
  document.getElementById('helpSection').style.display = 'block';
  document.getElementById('helpBody').scrollTop = 0;
}

document.getElementById('helpModal').addEventListener('click', e => {
  if (e.target.id === 'helpModal') closeHelp();
});
document.getElementById('helpModal').addEventListener('keydown', e => {
  if (e.key === 'Escape') closeHelp();
});

// ══════════════════════════════════════════════════════════════
//  TABLAS EDITABLES
// ══════════════════════════════════════════════════════════════
const tableObserver = new MutationObserver(mutations => {
  mutations.forEach(m => {
    m.addedNodes.forEach(node => {
      if (node.nodeType !== 1) return;
      const cells = node.querySelectorAll ? node.querySelectorAll('td, th') : [];
      cells.forEach(cell => {
        if (!cell.getAttribute('contenteditable')) {
          cell.setAttribute('contenteditable', 'true');
          cell.style.outline = 'none';
          cell.style.cursor = 'text';
          cell.addEventListener('input', () => {
            clearTimeout(refreshTimer);
            refreshTimer = setTimeout(refreshOutput, 300);
          });
        }
      });
    });
  });
});
tableObserver.observe(editor, { childList: true, subtree: true });

// ══════════════════════════════════════════════════════════════
//  INPUT FILE
// ══════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════
//  IMAGE SIZE TOOLBAR
// ══════════════════════════════════════════════════════════════
(function() {
  let _target = null;
  const toolbar = document.getElementById('img-size-toolbar');

  function getImgContainer(el) {
    let node = el;
    while (node && node !== editor) {
      if (node.nodeType === 1 && node.tagName === 'DIV') {
        const s = node.getAttribute('style') || '';
        if ((s.includes('inline-block') || s.includes('width:')) && node.querySelector('img')) return node;
      }
      node = node.parentElement;
    }
    return null;
  }

  function positionToolbar(container) {
    toolbar.classList.add('visible');
    const r = container.getBoundingClientRect();
    const tb = toolbar.getBoundingClientRect();
    let top = r.top - tb.height - 8;
    if (top < 8) top = r.bottom + 8;
    let left = r.left + r.width / 2 - tb.width / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - tb.width - 8));
    toolbar.style.top = top + 'px';
    toolbar.style.left = left + 'px';
    const currentW = container.style.width;
    toolbar.querySelectorAll('.img-size-btn').forEach(btn => {
      btn.classList.toggle('active',
        (btn.dataset.size === 'auto' && !currentW) || btn.dataset.size === currentW);
    });
  }

  function hide() {
    toolbar.classList.remove('visible');
    _target = null;
  }

  editor.addEventListener('click', function(e) {
    if (e.target.getAttribute('contenteditable') === 'true') { hide(); return; }
    const c = getImgContainer(e.target);
    if (c) { _target = c; positionToolbar(c); }
    else hide();
  });

  toolbar.addEventListener('click', function(e) {
    const btn = e.target.closest('.img-size-btn');
    if (!btn || !_target) return;
    saveBlockUndo();
    const size = btn.dataset.size;
    const img = _target.querySelector('img');
    if (size === 'auto') {
      _target.style.width = '';
      _target.style.maxWidth = '100%';
      if (img) { img.style.width = 'auto'; img.style.maxWidth = '100%'; }
    } else {
      _target.style.width = size;
      _target.style.maxWidth = '';
      if (img) { img.style.width = '100%'; img.style.maxWidth = ''; }
    }
    toolbar.querySelectorAll('.img-size-btn').forEach(b => b.classList.toggle('active', b === btn));
    refreshOutput();
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('#img-size-toolbar') && !e.target.closest('.editor-area')) hide();
  });

  document.querySelector('.editor-wrap').addEventListener('scroll', hide);
})();

document.getElementById('file-input').addEventListener('change', function() {
  const file = this.files && this.files[0];
  if (file) {
    handleDocxFile(file);
    setTimeout(() => { this.value = ''; }, 500);
  }
});


// ══════════════════════════════════════════════════════════════
//  MODAL GENERADOR DE MANIOBRAS
// ══════════════════════════════════════════════════════════════
function openManiobrasModal() {
  captureEditorCursor();
  document.getElementById('maniobrasModal').classList.add('open');
}
function closeManiobrasModal() {
  document.getElementById('maniobrasModal').classList.remove('open');
}
document.getElementById('maniobrasModal').addEventListener('click', e => {
  if (e.target.id === 'maniobrasModal') closeManiobrasModal();
});