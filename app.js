// ══════════════════════════════════════════════════════════════
//  ESTILOS DE EXPORTACIÓN MOODLE (inline, TinyMCE/Atto compatible)
// ══════════════════════════════════════════════════════════════
const EX = {
  h1:   "display:inline-block;background-color:#C0272D;color:#ffffff;padding:12px 24px;border-radius:6px;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:20px;font-weight:700;letter-spacing:0.3px;line-height:1.3;",
  h2:   "display:inline-block;background-color:#8E1B1F;color:#ffffff;padding:10px 20px;border-radius:6px;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:17px;font-weight:700;letter-spacing:0.2px;line-height:1.3;",
  h3:   "display:inline-block;background-color:#fff0f0;color:#6b1215;border-left:4px solid #C0272D;padding:8px 18px;border-radius:0 5px 5px 0;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;line-height:1.4;",
  h4:   "display:inline-block;color:#C0272D;border-bottom:2px solid #e8b4b5;padding:4px 2px;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;letter-spacing:0.1px;",
  h5:   "display:inline-block;color:#7a1518;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;",
  h6:   "display:inline-block;color:#999;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;font-style:italic;",
  p:    "font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.8;color:#2d2d2d;margin:10px 0;",
  ul:   "font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.8;color:#2d2d2d;margin:10px 0;padding-left:28px;",
  ol:   "font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.8;color:#2d2d2d;margin:10px 0;padding-left:28px;",
  li:   "margin:5px 0;font-weight:normal;",
  table:"width:100%;border-collapse:separate;border-spacing:0;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;border:1px solid #edf0f4;border-radius:10px;overflow:hidden;background:#ffffff;",
  th:   "background-color:#fff7f7;color:#9b1e23;padding:10px 14px;text-align:left;font-weight:800;border:none;border-right:1px solid #edf0f4;border-bottom:1px solid #edf0f4;font-size:13px;",
  td:   "padding:9px 14px;border:none;border-right:1px solid #edf0f4;border-bottom:1px solid #edf0f4;color:#2d2d2d;vertical-align:middle;font-size:14px;line-height:1.6;",
  tdalt:"padding:9px 14px;border:none;border-right:1px solid #edf0f4;border-bottom:1px solid #edf0f4;color:#2d2d2d;vertical-align:middle;background-color:#ffffff;font-size:14px;line-height:1.6;",
  goal: "display:block;width:100%;max-width:800px;margin:14px auto;box-sizing:border-box;overflow-wrap:anywhere;word-break:normal;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:16px;background-color:#f0faf1;border-left:5px solid #2e7d32;color:#1a4d1e;padding:12px 20px;border-radius:0 6px 6px 0;font-weight:700;line-height:1.6;",
  think:"display:block;width:100%;max-width:800px;margin:14px auto;box-sizing:border-box;overflow-wrap:anywhere;word-break:normal;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:16px;background-color:#faf5ff;border-left:5px solid #7b1fa2;color:#4a1570;padding:12px 20px;border-radius:0 6px 6px 0;font-style:italic;line-height:1.6;",
  note: "display:block;width:100%;max-width:800px;margin:14px auto;box-sizing:border-box;overflow-wrap:anywhere;word-break:normal;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:16px;background-color:#fffbeb;border-top:4px solid #f59e0b;border-left:4px solid #f59e0b;color:#78350f;padding:12px 20px;border-radius:0 6px 6px 6px;font-weight:700;line-height:1.6;",
  info: "display:block;width:100%;max-width:800px;margin:14px auto;box-sizing:border-box;overflow-wrap:anywhere;word-break:normal;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:16px;background-color:#eff6ff;border-left:5px solid #1d4ed8;color:#1e3a8a;padding:12px 20px;border-radius:0 6px 6px 0;font-weight:600;line-height:1.6;",
  tip:  "display:block;width:100%;max-width:800px;margin:14px auto;box-sizing:border-box;overflow-wrap:anywhere;word-break:normal;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:16px;background-color:#f0fdfa;border-left:5px solid #0d9488;color:#134e4a;padding:12px 20px;border-radius:0 6px 6px 0;font-weight:600;line-height:1.6;",
  step: "display:block;width:100%;max-width:800px;margin:14px auto;box-sizing:border-box;overflow-wrap:anywhere;word-break:normal;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:16px;background-color:#eef2ff;border-left:5px solid #4338ca;color:#1e1b4b;padding:12px 20px;border-radius:0 6px 6px 0;font-weight:700;line-height:1.6;",
  quote:"display:block;width:100%;max-width:800px;margin:14px auto;box-sizing:border-box;overflow-wrap:anywhere;word-break:normal;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:16px;background-color:#f8fafc;border-left:5px solid #94a3b8;color:#334155;padding:12px 22px;border-radius:0 6px 6px 0;font-style:italic;line-height:1.7;",
  extra:"display:block;width:100%;max-width:800px;margin:14px auto;box-sizing:border-box;overflow-wrap:anywhere;word-break:normal;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:16px;background-color:#f9fafb;border:1px solid #d1d5db;border-left:4px solid #6b7280;color:#374151;padding:10px 18px;border-radius:0 6px 6px 6px;font-weight:600;line-height:1.6;",
  practice:"display:block;width:100%;max-width:800px;margin:14px auto;box-sizing:border-box;overflow-wrap:anywhere;word-break:normal;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:16px;background-color:#f0fdfa;border:2px solid #0f766e;border-left:6px solid #0f766e;color:#134e4a;padding:12px 20px;border-radius:0 6px 6px 0;font-weight:700;line-height:1.6;",
  defterm:"display:block;background-color:#eeeeee;color:#263238;padding:10px 14px;border-radius:6px 6px 0 0;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;line-height:1.4;",
  defbody:"display:block;padding:12px 14px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 6px 6px;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#2d2d2d;",
  body:   "display:inline-block;padding:6px 10px;color:#2d2d2d;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.8;",
  list:   "font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.8;color:#2d2d2d;",
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
const EXPORT_CONTENT_MAX = "800px";
const EXPORT_MEDIA_MAX   = "1000px";
const EXPORT_TEXT_MAX    = "800px";
const EXPORT_TEXT_STYLE  = "font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.8;color:#2d2d2d;margin:14px auto;max-width:" + EXPORT_TEXT_MAX + ";width:100%;box-sizing:border-box;";
const EXPORT_UL_STYLE    = EXPORT_TEXT_STYLE + "padding-left:28px;";
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
  // Criterio único:
  // - Texto, títulos, listas y bloques institucionales: 800px.
  // - Recursos visuales: imágenes, vídeos, PDF, presentaciones, audio y tablas: 1000px.
  clone.querySelectorAll('p').forEach(el => {
    if (el.closest('td,th')) return;
    if (el.querySelector('img,iframe,video,audio,table,div,section,article,figure,blockquote,ul,ol,hr')) return;
    el.setAttribute('style', EXPORT_TEXT_STYLE);
  });
  clone.querySelectorAll('ul').forEach(el => { if (!el.closest('td,th')) el.setAttribute('style', EXPORT_UL_STYLE); });
  clone.querySelectorAll('ol').forEach(el => { if (!el.closest('td,th')) el.setAttribute('style', EXPORT_UL_STYLE); });
  clone.querySelectorAll('img,iframe,video,audio,table').forEach(el => {
    if (!el || !el.style || el.closest('td,th')) return;
    el.style.maxWidth = '100%';
    el.style.boxSizing = 'border-box';
  });
  Array.from(clone.children).forEach(el => {
    if (!el || el.nodeType !== 1) return;
    const tag = el.tagName.toLowerCase();
    const hasMedia = !!(el.querySelector && el.querySelector('img,iframe,video,audio,table'));
    if (tag === 'table') { setExportBox(el, EXPORT_MEDIA_MAX, '24px'); return; }
    if ((tag === 'div' || tag === 'p') && el.querySelector('table')) {
      if (!el.style.overflowX) el.style.overflowX = 'auto';
      setExportBox(el, EXPORT_MEDIA_MAX, '24px');
      return;
    }
    if ((tag === 'div' || tag === 'p') && hasMedia) { setExportBox(el, EXPORT_MEDIA_MAX, '24px'); return; }
    if (tag === 'ul' || tag === 'ol') { setExportBox(el, EXPORT_CONTENT_MAX, '18px'); return; }
    if (tag === 'hr') { setExportBox(el, EXPORT_CONTENT_MAX, '20px'); return; }
    if (tag === 'div') {
      const first = el.firstElementChild;
      const style = el.getAttribute('style') || '';
      const firstStyle = first ? (first.getAttribute('style') || '') : '';
      const isTextualBlock = style.includes('margin:') || firstStyle.includes('display:inline-block') || firstStyle.includes('display:block') || el.classList.contains('sequence-block');
      if (isTextualBlock) setExportBox(el, EXPORT_CONTENT_MAX, '24px');
    }
  });
  clone.querySelectorAll('.sequence-block').forEach(el => setExportBox(el, EXPORT_CONTENT_MAX, '24px'));
  // Bloques especiales por color: mantienen 800px aunque estén dentro de un contenedor mayor.
  const markers = ['#2e7d32','#7b1fa2','#f59e0b','#1d4ed8','#0d9488','#4338ca','#0f766e','#94a3b8','#6b7280'];
  clone.querySelectorAll('div').forEach(el => {
    const s = (el.getAttribute('style') || '').toLowerCase();
    if (!markers.some(m => s.includes(m))) return;
    if (el.closest('td,th')) return;
    el.style.display = 'block';
    el.style.width = '100%';
    el.style.maxWidth = EXPORT_CONTENT_MAX;
    el.style.marginLeft = 'auto';
    el.style.marginRight = 'auto';
    el.style.boxSizing = 'border-box';
    el.style.overflowWrap = 'anywhere';
  });
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
          ? 'padding:10px 14px;text-align:left;font-weight:700;border:1px solid #ccc;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;'
          : 'padding:9px 14px;border:1px solid #e0e0e0;vertical-align:middle;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;';
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
window.editor = editor;
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
            <h4 contenteditable="true" style="margin: 0 0 5px 0; color: #1a1a1a; font-size: 1.1rem; font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">Título del Paso ${i}</h4>
            <p contenteditable="true" style="margin: 0; color: #666; font-size: 0.95rem; line-height: 1.6; font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">Descripción detallada de la fase operativa ${i}.</p>
          </div>
        </div>`;
    }

    // 3. Montamos el bloque completo
    html = `
      <div class="sequence-block" style="margin:30px 0;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
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
  let t = '<div class="moodle-media-block" style="overflow-x:auto;margin:12px auto;width:100%;max-width:' + EXPORT_MEDIA_MAX + ';box-sizing:border-box;"><table style="' + EX.table + '">';
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
  const containerW = isAuto ? 'max-width:100%;' : 'width:' + width + ';max-width:100%;';
  const imgStyle   = isAuto
    ? 'max-width:100%;width:auto;height:auto;border-radius:6px;display:block;margin:0 auto;box-sizing:border-box;'
    : 'width:100%;max-width:100%;height:auto;border-radius:6px;display:block;box-sizing:border-box;';
  return '<div class="moodle-media-block" style="text-align:center;margin:20px auto;width:100%;max-width:' + EXPORT_MEDIA_MAX + ';box-sizing:border-box;">' +
         '<div style="display:inline-block;' + containerW + 'background:#fff;' +
         'border:1px solid #d1d1d1;border-radius:10px;overflow:hidden;' +
         'box-shadow:0 4px 12px rgba(0,0,0,.12);font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;box-sizing:border-box;">' +
         '<div style="text-align:center;background:#f0f0f0;padding:16px;box-sizing:border-box;">' +
         '<img src="' + src + '" alt="' + esc(caption || 'Imagen') + '" ' +
         'style="' + imgStyle + '">' +
         '</div>' +
         '<div style="padding:12px 16px;background:#f9f9f9;border-top:1px solid #d1d1d1;text-align:center;box-sizing:border-box;">' +
         '<span contenteditable="true" style="font-weight:700;color:#333;font-size:16px;line-height:1.5;display:block;outline:none;cursor:text;overflow-wrap:anywhere;" ' +
         'title="Haz clic para editar el título">🖼️ ' + (caption ? esc(caption) : 'Haz clic para escribir el título') + '</span>' +
         '</div>' +
         '</div>' +
         '</div>';
}

function buildPPTHTML(embedUrl, caption, height) {
  return '<div class="moodle-media-block" style="width:100%;max-width:' + EXPORT_MEDIA_MAX + ';margin:20px auto;background:#fff;border:1px solid #d1d1d1;'
       + 'border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.12);font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;box-sizing:border-box;">'
       + '<div style="position:relative;width:100%;height:' + height + ';background:#f5f5f5;box-sizing:border-box;">'
       + '<iframe src="' + embedUrl + '" '
       + 'style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;max-width:100%;box-sizing:border-box;" '
       + 'allowfullscreen></iframe>'
       + '</div>'
       + '<div style="padding:10px 16px;background:#f9f9f9;border-top:1px solid #d1d1d1;text-align:center;box-sizing:border-box;">'
       + '<span contenteditable="true" style="font-weight:700;color:#333;font-size:16px;line-height:1.5;display:block;outline:none;cursor:text;overflow-wrap:anywhere;" '
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
    html = '<div class="moodle-media-block" style="width:100%;max-width:' + EXPORT_MEDIA_MAX + ';margin:20px auto;background:#fff;border:1px solid #d1d1d1;box-sizing:border-box;' +
           'border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.12);font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">' +
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
    html = '<div class="moodle-media-block" style="width:100%;max-width:' + EXPORT_MEDIA_MAX + ';margin:20px auto;border-radius:10px;box-sizing:border-box;' +
           'overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.12);font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">' +
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
const ESCUDO_B64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBAUEBAYFBQUGBgYHCQ4JCQgICRINDQoOFRIWFhUSFBQXGiEcFxgfGRQUHScdHyIjJSUlFhwpLCgkKyEkJST/2wBDAQYGBgkICREJCREkGBQYJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCT/wAARCACgAKADASIAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAYHAwQFAQgC/8QASBAAAQMDAwIDBAQJCQcFAAAAAQIDBAAFEQYSIQcxE0FRFCJhcRYykbEIFTdCUmKBodEXI1NjcnR1krMkJTNDVoKUNLLB0vD/xAAcAQABBQEBAQAAAAAAAAAAAAAAAgMEBQYHAQj/xAA6EQABAwIFAAcFBgUFAAAAAAABAgMRAAQFEiExQQYTIlFhcYEUMqGx8EJSkcHR4SQ0YnLxFSM1osL/2gAMAwEAAhEDEQA/APnulKVo6o6UpSiilKUoopSlKKKUrNEiSJ8luLEYdkPuq2ttNJKlLPoAO9S9vozrx1sODTzyQRnat5tKvsKqh3WIWtqQLh1KJ7yB86dbYcc1QknyFQqldu9aJ1Jp1BcutknRGh3dW3lH+YZH764lPM3DT6c7Sgod4Mj4UlbakGFCKUpSnqRSlKUUUpSlFFKUpRRSlKUUUpSlFFKUqRaK0Jd9dXEw7Y2lLbeC/JdyG2QfU+ZPkByaYublq2aLz6glI3JpbbanFBCBJNR2utpjTNw1XdW7db0J3EFbjrhw2w2PrLWfJIqT6s6bRLJqa26WtV5/GV3lKSl4ONpaaYKvqgnJ5PfHpjzIFeavvMPS0B/RGnVLS0he27T1J2OTnk8FHPKWkngDz++pOLi6QhNhqpYkEggBO2YgwY+6PteUkSha9WSXth8T3fr3VbfR7TGlIipt30+mbJUz/u/26TjZIUnBW40O6QSQPkB8as2od0fhJg9N7GkJCS6yX1fErWpWfsIqY18+9IrhT2IvFSiqCUgkyYGn71uLFsIYTAiROnjXikpWhSFAFKhggjII9CPOqC629K4lmjq1PYmEsRt4TMioHuNlRwHEDyBPBHYEgir+rk6stqbxpe7W9adwkQ3UAfHaSP3gU70bxl7DL1DrauySAocEc/tSb+0RcMlKhrxXxjStiBIZjSUOyoiJbP8AzGVKKNw88KHKT6H9xqe/yVtaospvmhpyrg0jh+2ysJlR1d9uR7q/geMjtmvoq8xJmzKfaDlSdM32Z7iePWB41g2rdboOTUjjmq6pWR+O7FecYfaW062opW2tJSpJHcEHsax1PBBEimCI3pSlK9opSlKKKUpSiilKV19J6fVqrUMKzIlMRFS3NgdeztHBPbzJxwPM0088hltTrhhKQSfIUpCCtQSnc1l0dpC5a1vTVrtqOT7zzyh7jDfmtX/wPM8V9Y6V0vbtHWVi1Wxva037y1qHvPL81q9Sf3DisOj9G2rRNoTbrW13wp59fLj6/wBJR+4dhUf6ldVI3T6XbYoiCa/JV4j7QXtLbA43D9Yntnjg1wvHscu+k12LKxScgmBtMcn8hx5mtlZWbWHtda8deT3eAqjurlh+jOvZqWH5S0yFCYh14KCgpRyQFn62D+cPl3Fdi23NvXz0a4R3rfF1tFR4ZE1tCo92SBgKwsFIeA9e/wB1gX2RpzqJZJNzuNxnv2ZMxDUVEZloKaV4SFK5UncFbioHnFRT6B9Nf6fU3+Zv+Fa63xhtyzbZukKDzYyyE5uBIUDEg/aT37GQDTLeB3byy9aozNqP1H5Gt+PfOuKCI4s6EJR7u5yGyhtI/tZCcV2bLqjqLCuLC7/N0i5ACsSEe3MtOIT5kEE4I79jUdc0h0+db8Ny4atWj9FTyCPsIrB9Aemf9LqX7W//AK1XuosHklK2UifusGfxz6VOTg2KpIIQo+av2qeK69aNbu78ByRJDLRCUzUNFbLh88Y97APnjBqR2/qJo+7DbF1Ha1lQ+o48Gyf2KxVQ/QTpr/T6n/zN/wAKfQPpoe7+pj81N/wqsf6P4IoDquuSf7QfX6NSEWWNA9poEVo9UekrFmbf1Dpl9mRaR770dLoUqNk90nPvI57dx8RXF6LSrvH6gW9m1Lwl8lMtCslCmACVbsemOD649alA0H00AwH9TAfBTf8ACpJEu2nulFkg3K2e1rtswyULadZb8eQ6hI2ArCc989zgDyrRLxhZw5WHQp5xYKUlSMs6c6qkiNNp5PNVL+CXFs6Lp5HVoB11/wAV0us/TyDqKwS75HjqRd4LRcC2kZVIQnuhQHfAyQe4x6V8zfKr30P1+l3fUjFv1BGgxIck+G28wFDwnCfd3Ek+6e2eMcGuF106dQdNyW7/AGxbMePOeKHIecFDuCSpsfonzHkfgeF9Fbq7wl5ODYmNVaoMyPFM/XyqDiTTV0k3Vvxv+tVLSlK6TWfpSlKKKUpSiilbiosm3sQZ4WppT+51hSThQCFY3A+XvA4/s1qDuKtv6OQGdH2bW01tmTb7dZEMsRV8penF5wAKHmkFW4jzxj1qqxPEU2fV5xOc5Y7yQYHqalWzBdzRxr+9SHQv4QMKRGahasCo8lICfb2kbm3PitI5SfUgEfKqm6h6l+lmsbldErK2FO+HH+DSPdT9oGf21HXXFvOKcWrctZKlHGMk/KvzUPDejNjh92u8tk5VKERwOTHd9RFO3GIPPthpZkCri0L+SR3/ABpX+kmvzX60L+SR3/Glf6Sa8ShSzhKSogE4AzwOTWSc/mrj+9X5V2HolphjdeUpXqkKRjckjcNwyO49aK0teUr1KFKCilJISMnA7D1/eK8r2ilYuqP5N9Nf3+T91ZloUhW1aSlXHBGDWHqj+TfTX9/k/dSrb+etv7//ACqsp0z/AOMUfEVUlbt0vdzvbjbtznyZi2kBtCn3CrYkdgM9hWlWaHKchSmpLIQXGlhaQtIUkkeRB4IPYiujrQkkLgFQ2/zxNcXSo7TpX7RAdct705HLbLqGnP1d4UUn5HaoVrVbV80vb7doS+6ktyUNWi+R4LsRjdksP+MS42PPCcKx8DjyqpTVfheJJvkrWjZKo9YBIPiCSD5U/c25ZIB5E/E0pSlWlRqUpSiilS2BebtdtAy9MR2zIZhSU3Lak5WlrCgvA80hRSo47ZJ7dolXQsF8m6bvEW7W9zZJir3pz2UOxSfUEZB+BqHfW/XNykAqSQpM7SNvLunxp5hzIrU6HQ+Vc+lXm/030x1XtX0i0lJbtE5f/qYahlpDvmlSRyg+hHBHOKgtx6K65tzpSLKZaR2ciuoWk/vB+0VUWfSiwfJbdX1bg0KV9kg+uh9Kku4c8jtJGZJ2I1qU6F/JI7/jSv8ASTVhdLH9KMImSdRNMxi2n2ZEpx9WHPFBSU+H6hOfeHYHmoTpyzz7B0zkW+6RVxZbd5ytpeMpBZSR2+BrRHcHGayrb6fan3UQoFZjkHaur4DZ+04OlhRKfLQ/XnXfmN25jVK2mrNut7cn2YRxLWd/OAfF9SOQe3wqW9Tfoiu3QU6cZYmPsYtxdakKPgBAykbfzycnC+Rx51sRHNEnp4thcBgXR1BuIt/tq9ylIBQDv7jKcq2ZyR9tRvpq9YW9Q+0X2K0mPFBlpkl9SQwUEFI287wTgAd/nU7LHY07Xw+FPFwufxELHU6RPvf9tfz/AKtq7/Tr6HKsMxu+sMxJc3MBJXKUPaey+B/y/eCQVds4+VQ+xt22bqZlqdaAm3yniyWjKWgMDPJ8Q99o5Of3cVta+VY2tSrNlhsGCrEgOpfWsSQv3j5+4MkjaORg1Kr8rRaNBMsRILC7nFQmUYRmrKmFPYCiVD6+MJyny4zivIzdnTs/H4V7nLf+6As9fxPu+PvacfqNq5fVWTpiZJizNPNMviUja5LQ8rCS3hAR4fkdoScnuO3rVd9Ufyb6a/v8n7qy1s63sVz1FoTTUG0w3Zkn2yW54TeN20Dk8ketRBcJF9buuEJGfXgDsKqH0kszb4P1CSVQRvqfryqlqVPLV0R1xcnQldpEFs93JbyUAfsBJP2VN16L0v0YtQvl6dbvV+OfYo604a8T1SjuQPNSu3kASK1F30osWlBlhXWuK0CUmZPiRoB3k1y1rDnlDMsZUjcmq51HeLpD0lZNJTG1R0xS5NW0o+//ADhJb3D83CSSE9/eyaiVbNzuUq8XCRcJzynpUlxTrriu6lE81rVcWVuGGssAEkkxtJMn41FeczqnjYeQpSlKl01SlKUUUpSlFFdXTeqLvpK4puFnmKjPDhQ7ocT+ipPZQ/8Awq6tP/hH2x9pLd/tUiM9jBdiYcbUfXaSFD99VFo7RFw1lLdSw41Dgxk75U+QdrMdPxPmT5CrC6e9Dva7xMXqZ5pTFve8P2NlfvSOMpWo+TahyMcq57YNYbpS3gLoWrEIzoH2fe8Bpv5HaeJq5w1V6kgM7Hv2qT3TUEDVOmLldrYtxcR+7oCFOIKCdsdAPB+INRSp1q+OzEtN1jx2m2WWrqylDbaQlKUiK3gADsKgtZbCSgsktAhM6TqYgRNdf6OT7GM28mlKUq0q9pSlKKKVLoup7dpGy6Zul1W8iKl2c2VNNlZyoDHA++ojU/0zFYnQtORZTLb7Dv4xQ404kKStJSnIIPcVU4uWw2kvAlMmQNDGRWx1rPdJgo2gy75hUa1H+EfEbaW1py1POukYD83CUJ+OxJJP7SKpW+3+56kuLlxu0xyXJc4K19gPJKR2AHoKtHW/Qz2bUsJjT0tpMW4LUpTD6juhoSMrcJ82x6nnJA5zVe6y0VdNEXUwbi2FIWNzElsHw5CP0kn7x3Fa/ounAmgn/ToC1idfejY7+PA8/GuRYib1RPX7A8bVwKUpW1qopSlKKKUpSiilZYkSROktRYrLj77yghtptO5S1HsAPWsVdHTt8kaavsG8RUpW9DeS6lK+ysdwfmCR+2mnisNqLQlUGB48UpABUM21X5YNG3DTuhYtn1CYrEJ1RW6thG5UF9SsodcUThaedihjCcJOe5HTtibmxNNnCWLdereyGYD2XH0SmtpUoPcDLQJQc+7tUransQebZesdu17counY7T1nM1KkPOvlKyvj/hN+W5QyNyh27DJFdu92ZFnhqiTHZAtHhKYjXNBUp62IUMFp05ytg9tx7DhWMBQ4Vdqu0uqaxFOVxZKojvO4GoPIKdZH9W+ybDRSFMGUjSfr58Hw2rga7e0qzPsOv7LdJ1yenKmqebeShKwUpSkpPmnA4xxjArB/KfoX/pa8/wDmpqwptql6kuTOntS2iHc7XJBcjS4rZQiMkIzlpwE4SPdABOSSfLAqtrp0Oemb5mj7vHvUFK8KbJCX2hn04Cuxx2z5VpLB/CHz/GS2owZSpQQZ00gwnbYxtoTTftmJWyclq4cvdz+/nXd0vqXTOsbsm12nSF2ckFCnCXLglKEJHcqPl5D5mtjWF503oeXHiXfS04PSGy6lLFzS5hOcc8DHIP2VKOn8HSGgLauIJhiTnQFSn7m0YzrhHkAoYCRzgJJ+ZNUH1F1YNZ6um3VtX+zEhmMCezSeE/byr9tJwmzRieJrbaStNugblS5J4jXY/IeNPXON31vbhSnyVngHarZ0dcNPa6MtNn0tNKogSXEv3NKDhWcEcHI4Nc/UWrdKaVu79pumkbw1KZwVBM5KkqBGQUnzB9agfSbWLejdYxpMl0Igyh7LKJPCUKIwr/tUAflmrm6kWbSvUKIG48pcm7x0kR37awqSR+osp90oz6qGO488+YlaN4biqWbhKzbrGigpcg8zrsDv4EUMY1fv2xWh45xwTvUD/lP0H/0vev8AzE/xrYRrOdrOXZLX09tVwt8q2yXJCnpDqVtoQsYV4h/RPmD38ua0bT0RFtbTP1veI9qipwoxWFeI+sZA8gcDJA4Cu9WNp2WYSW2NIQYNosMNbxlSpadzMhKFAJd8UHJJw555BTzxgUrEXsLYGaxBdUJ1UpRbBgjn3iQYAE77imRd4hcpyXbhy93P7edZbk1MXM/FKvaJb16iFcm7xiEoKcEbUHkIZRnJSfrBR5Jzni6v0reNa6IMeyJbkQYi21QhJUpT8zYCFvIWonCVZwlJ4KRnIyKkkGxRNSe0pgwl27TkpRW8pO5t255zwnzbYyScDG4k4ABO6P3jrfA0bOm2J5h29PwSG2pLJS2leB9Rzy3JPBKRg47A8VnbFV2t5Iw5GZ1BCiO7iTrAOwgHsjbWQlboaCSXzCTpP1+Pj8/nd9h2M8tl9tbTrailaFjCkkdwQexr8VuXi5v3u6zLnJ2+PLeW+5t7BSjnA+Fadd2bKigFYgxr51jlRJjalKUpdJpSlKKKUpSiivULU2pK0KKVJOQQcEH1FXZoT8IER47dv1a068Ejam4Mp3KI/rEeZ/WHfzFUlSqnF8EtMUa6q6TMbEaEeR+hUq1vHbZWZs19PRtR6WQ2t7S2q7MxHdyXbXNe2Rl577QcKZJyfqgp/VrhuXTRk+eliBc7dpy5paLXhl7fHyQAlbTrSwkKRztHA945Tya+fe9KzbXQdpskpfVPfpPrwr1E+NT1YwpW6B9d3dX1hEkargFl24qjXu0urV4nsjfjuNp98pICUjcMBAP1uSTwKwQHLNd3WI900ZBZuDsoMOtLhg+Ggt7vEKijBGQU8HvXzHbr3dLOrfbrjMhq/qHlI+41IGOrWuo6QhGp7gUjyWUr+8Gqm46C3IJLK0yeRmR8EyPPyFSUYy3pnB+B+dXnBudrjXh2K1oSOw0w/wCGt9iGHFJQFlBXhLfP5pwOcE+lZ3Xtb3KA84t2DpuIGQUF0BvBKc4yeU4I5PGArgZ5FCSOrGuZKdrmp7gB/VqSj/2gVHrhd7jdl77hPlTFesh5Tn3mnGug76lZnFIG33nPwzQNfWkqxhAEJB+A+VXqLpo+HeHEC/jUNwWkoWHJSWIpRk4Drqyc4CinCSokAcZGa7kjUek0bJmqtWWeb4SvEat0Ne6K0ruD4acqdX+svjPZIr5jp27VZu9CG3SCp9WnMCfTSE+gnvJqOnF1JmED4/R9aufX/X9y4x3bbpVt6K04Clye6NrpHn4afzf7R59AKpknJyTk15StJhODWmFtdTaJgcnk+ZqBc3btwrM4aUpSrWo1KUpRRSlKUUUq6On/AE+0ncunA1JeLTcJ8ltb29ENxZccSleAEoSRk1S9Xt011fp6H0xTZJeq27FcFuPYdQT4rOXMhQ4xyPvrJdMV3SLNs2pUDnTOWZy6z7smKs8KS2XT1kbHeN/WuL1F6Z2CBabDN083NgzLtJbjogTlneQsdyk+8kpOM8kc12bpo3phoGRbLFqGNOuFwnJG6UFqCW8q27yEqG1O7OAATgZNYuoHUPT7Gm7PBt15Opbxb5jMpM5xvBGxW4lSsAZIwnA8uTW7qGX056mTbVqKZqlFrdiISHobxCVqSFbthz5gkjKc5BrJofxIsM+2KdDUuSU5sxP2J0zR3SN96tChjOrqgnN2dDEePhNc4dGrRbeqEWzSg9Ks06G/IZSp0pcQpGAUlScZwSDnzBr26dHLS11QtFrjR3hYpURcp5HjKJHh5Chv7jJLf21v/wArFhu/ViDOM1Eaz26FIYRKeBSHXF4JIGMgcADPpW1J6sWFOlr4pu5RV3RmRLjQcZ3uMuOgpWk4+rg5/wCymVXPSBK2yc8qbCSNYBUVAK7sw7JPPfSg3ZEKiICp9BGnkda5916VaUi9SrFYmoT4gTIMh95HtKyVLRnaQrORXTT0l0DcLlc7Qiz323LhIClT3HFpYOQOULUSlWM5OR5Gsd317pZ7qnp26M3yGqBFt8ll18E7W1KztB47musjqBpK33ufeJHUFc6G+ghFpCCtprgfUATkng+g945qE9cY1kahTubq/wCvVWc7wDrH3tIjwp5LdpKtExPhtA+tKhPS/pzpfUGlLpdLpClXN2HMebbMV1aVPNoSkgJSCMk5OPmK0r9prRyblp+3w9LajtL0+5NNOG5BaEusk4WlJKjzynkdqkPTHXOmIOnL9HdvcewOTblJeioUPfjtrSnYoDBHHp24rmaiuVkXc9O3N7qQrULkG5sq8J1lCAy0VArcykDttFXKX8QOJvdapwJk5R2493SIGTfvIqKW2PZ05Qmedu/x12qQz+mfTqHqWJp1divhkS2/ERIZddUyge99Zefd+r6eYqNWPotbZ3UO92t2Y+uy2gNqUQoBxanE7g2VDtgZycZ4HbNSa89Z47HUO0xbffYLumnWh7Y5sylCyV87sZBGEfCubZeo2ldM9Sr+lqQwbFeUsuiSwCptDwT7xI7gEqVnjg/CoFq5jzduuC4VKakSSrXOAdx2VZZhInvp1xNkpY2gKju408xPNY7Xovpt1Ij3OBpaPNttxgj+bfcWopcySEqwVHKSRg9iM1r9O+l1kkaOfv13tUy+T0vutfi+M7sKS2vYUj3k5VwTye3YV0NO3Dp90mbut2t2pU3qTLSEsRWSFKCQSoI4+OMqOOB2ridOb1YHLVLd+mM7S+oXnluvKcdCorxKioKDahtPBwQSCKlOu35t3vZnHepCkZSoKKtjnEjthMxJA043ptKWc6OsCc0GQIjw8JqNdUbLpa0yop081c4DywfabfOYcQWuMhSSscjuCASPQ1BauHrdrexX6y2q0QbizeJ8ZzxHprLe1A9zBA8veJzgcDFU9W56Muvu4ehVwFBWvvGSddDqAY7pExVNiCUJfIQRHhSlKVf1CpSlKKKVYWm9FWB3TNrul5/Hcl68zHYcdu1pSosbB9YpIJWon80Y4qva7Vl1nqLTsR6JabxMhMPHcttpeBnGMjPY48xg1W4pb3L7QTarymddYkQdJgxrB21iOakWy20KlwSK746U3By3iUm4xEvKZMxMN1K0vezeL4XiHjaDk5KM5rfe6KT2nHGk6hs7jyFyWQ2nxQVPMp3qbGU/o857eXNRFrWeombUm0t3iYmCkhQZ38DCt2M98bucZxnyr9fTjUvjeP8AjqX4viuv7twz4jidriu3dSeDVaq1xkk5XkgSY0444/H51IDlp9w1IYvSG6ypXs6LjBSrMEZIXj/agSny/Nxz+6syelTkeHMeXNi3JJtrsqK5FdU2kOoeS0pJCke9hRx5A+tR5PUPViI8aOm/zgzF8PwUbhhHh/U8vLyzWp9L7+YpifjaV4BacYLe4Y8Na9609uxVz86SbXGVHtPJiRsOOeAdT8yKA7ajZJqcTOjqY8BiM1dmpF2NzchSFsocWywEM+IpJSEbioHzHHI7Vjh9GZDN7SxdrxCat6XYaC8jeFP+OTtQgYO1WAeTxnFRpzqVrB11p1zUM5a2iSgqKTyU7TkY5ykkHOc1jZ6iasjyHJDV/modcbQ0pQUOUoJKB2xxk4+dMCyx3IU9enUfEnjs6abfRpzrrOQch+vWttjQ34x1JqGBHnswoFlU8t2VL3EJbS5sTkJBJJOOwqTXrolJTdLim13COzCYdDEb21z333A0lagVAAJGTgE+ePnUAgapvVruci6QrlIYmyd4eeSRl3ccq3eRyefnW39PtUkyib5MUZZ3PFSgSpW3Zu5HB2gDIwcVKuLTFy4FMvJCQkDUc6SdvA69xiBvTaHbXKQtJmf1rvdO+n8XWln1A446+3cISEJhISsBLjygvCVZHOSkDgjvXav/AEZjtXeBb7TcXEBUH2iU/ISp1Ic8TwyE7E8DOfrHy7mq6tOpLxYUOItdxkQ0uONurDRxuWg5Qf2Gt1nX2qGP+HfJgHh+DgkEbN5XjkfpEnPcE03dWGLG6U6w+Ag7JPGgHcedR50pt+1DYStGvJ9al9l6OlE59u/XSO0hC5rLTMdSvFkKYb3FSSU4CQccHBIzWsnpQuJEnpkT4U2ci3NTGmI7ykKZLikBG8FPOd54yO2c1G2+oerGkyUIv85KZTinXhuHvrUMKPbzHfHetRzVl9dXIcXdJRXJjoivK3craRjYg/AYGPlXibLGSsqW+mNNAO4+Wmm+uvlpR11qBAQakmsunsTSOmm5RuSJ1xTdHYEjwCQ02UICinCkg7ge57GoLXZvesdQakYQxd7tJmtNr8RKHSMBWMbuB3xXGq4wxm6aZy3iwpckyNvkPlUS4W2pctCBSlKVYUxX/9k=';

function onBannerToggle() {
  const on = document.getElementById('toggle-banner').checked;
  document.getElementById('banner-toggle-label').textContent =
    on ? 'Documento completo' : 'Solo bloque';
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
  return '<div style="font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:800px;width:100%;box-sizing:border-box;margin-left:auto;margin-right:auto;' + marginTop + marginBottom
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
//  LIMPIEZA FINAL DE EXPORTACIÓN MOODLE
// ══════════════════════════════════════════════════════════════
const EXPORT_BLOCK_CHILD_SELECTOR = 'div,section,article,main,header,footer,aside,nav,figure,blockquote,table,ul,ol,hr,iframe,video,audio';
const EXPORT_MEDIA_SELECTOR = 'img,iframe,video,audio,table';
function isMeaningfulTextNode(node) {
  return node && node.nodeType === 3 && node.textContent.replace(/\u00a0/g, ' ').trim() !== '';
}
function nodeNeedsOwnExportBlock(node) {
  if (!node || node.nodeType !== 1) return false;
  if (node.matches(EXPORT_BLOCK_CHILD_SELECTOR)) return true;
  if (node.matches(EXPORT_MEDIA_SELECTOR)) return true;
  return !!(node.querySelector && node.querySelector(EXPORT_MEDIA_SELECTOR));
}
function normalizeInvalidParagraphBlocks(root) {
  // Evita HTML frágil en Moodle: un <p> no debe envolver divs, tablas ni iframes.
  // Si un párrafo contiene bloques/recursos, se divide en párrafos de texto y bloques independientes.
  Array.from(root.querySelectorAll('p')).forEach(p => {
    if (!p || p.closest('td,th')) return;
    const children = Array.from(p.childNodes);
    if (!children.some(nodeNeedsOwnExportBlock)) return;
    const frag = document.createDocumentFragment();
    let inlineP = null;
    function ensureInlineP() {
      if (!inlineP) {
        inlineP = document.createElement('p');
        inlineP.setAttribute('style', EXPORT_TEXT_STYLE);
      }
      return inlineP;
    }
    function flushInlineP() {
      if (!inlineP) return;
      const txt = inlineP.textContent.replace(/\u00a0/g, ' ').trim();
      if (txt || inlineP.querySelector('img,span,strong,em,u,a,br')) frag.appendChild(inlineP);
      inlineP = null;
    }
    children.forEach(node => {
      if (nodeNeedsOwnExportBlock(node)) {
        flushInlineP();
        frag.appendChild(node);
      } else if (isMeaningfulTextNode(node) || node.nodeType === 1) {
        ensureInlineP().appendChild(node);
      }
    });
    flushInlineP();
    if (frag.childNodes.length) p.parentNode.insertBefore(frag, p);
    p.remove();
  });
}
function removeDefaultResourcePlaceholders(root) {
  const defaults = new Set([
    '🖼️ Haz clic para escribir el título',
    '🎬 Haz clic para escribir el título',
    '📊 Haz clic para escribir el título',
    'Haz clic para escribir el título'
  ]);
  Array.from(root.querySelectorAll('span')).forEach(span => {
    const text = span.textContent.replace(/\s+/g, ' ').trim();
    if (!defaults.has(text)) return;
    const captionRow = span.closest('div');
    if (captionRow && captionRow.parentElement && !captionRow.querySelector('img,iframe,video,audio,table')) {
      captionRow.remove();
    } else {
      span.remove();
    }
  });
}
function neutralizeBrokenInternalLinks(root) {
  const targets = new Set();
  root.querySelectorAll('[id]').forEach(el => { if (el.id) targets.add(el.id); });
  root.querySelectorAll('a[name]').forEach(el => { if (el.getAttribute('name')) targets.add(el.getAttribute('name')); });
  Array.from(root.querySelectorAll('a[href^="#"]')).forEach(a => {
    const href = a.getAttribute('href') || '';
    const id = decodeURIComponent(href.slice(1));
    if (!id || targets.has(id)) return;
    const frag = document.createDocumentFragment();
    while (a.firstChild) frag.appendChild(a.firstChild);
    a.parentNode.replaceChild(frag, a);
  });
}
function cleanPreviewOnlyClasses(root) {
  root.querySelectorAll('.moodle-content-block, .moodle-media-block-preview').forEach(el => {
    el.classList.remove('moodle-content-block', 'moodle-media-block-preview');
    if (!el.getAttribute('class')) el.removeAttribute('class');
  });
}
function cleanExportAttributes(root) {
  root.querySelectorAll('[contenteditable]').forEach(el => el.removeAttribute('contenteditable'));
  root.querySelectorAll('[bis_skin_checked]').forEach(el => el.removeAttribute('bis_skin_checked'));
  root.querySelectorAll('[data-placeholder]').forEach(el => el.removeAttribute('data-placeholder'));
  root.querySelectorAll('[spellcheck]').forEach(el => el.removeAttribute('spellcheck'));
}
// ══════════════════════════════════════════════════════════════
//  CONSTRUIR HTML FINAL
// ══════════════════════════════════════════════════════════════
function buildFinalHTML() {
  const clone = editor.cloneNode(true);
  cleanExportAttributes(clone);
  normalizeInvalidParagraphBlocks(clone);
  removeDefaultResourcePlaceholders(clone);
  neutralizeBrokenInternalLinks(clone);
  cleanPreviewOnlyClasses(clone);
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
  html = html.replace(/\sclass=""/gi, '');
  html = html.replace(/<p><br><\/p>/gi, '<p>&nbsp;</p>');
  const PLACEHOLDER = '\x00BR\x00';
  html = html.replace(/(<t[dh][^>]*>[\s\S]*?<\/t[dh]>)/gi, match =>
    match.replace(/<br\s*\/?\>/gi, PLACEHOLDER)
  );
  html = html.replace(/<br\s*\/?\>/gi, '');
  html = html.replace(/\x00BR\x00/g, '<br>');
  html = html.trim();
  if (html && html !== '<p>&nbsp;</p>') {
    const includeBanner = document.getElementById('toggle-banner')?.checked !== false;
    if (includeBanner) {
      html = buildBanner('header') + '\n' + html + '\n' + buildBanner('footer');
    }
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
      '3': '16px', // Normal
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
        span.style.fontSize = sizeMap[val] || '16px';
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
    fontNameSel.value = currentFont || "Arial"; 
  }

  // 3. Actualizar selector de Tamaño
  const fontSizeSel = document.querySelector('select[onchange*="fontSize"]');
  if (fontSizeSel) {
    let currentSize = document.queryCommandValue('fontSize');
    
    // Si el navegador nos devuelve un tamaño en PX (ej: "24px"), lo mapeamos de vuelta al 1-7
    if (currentSize && currentSize.includes('px')) {
        const pxMap = { '10px':'1','13px':'2','16px':'3','18px':'4','24px':'5','32px':'6','48px':'7' };
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
      <p>El editor permite crear contenido Moodle de varias formas, según el material de partida:</p>
      <ol>
        <li><strong>Escribir directamente:</strong> haz clic en la zona blanca del editor y redacta el contenido como en un procesador de textos.</li>
        <li><strong>Abrir Word (.docx):</strong> pulsa <strong>📂 Abrir Word (.docx)</strong> para convertir automáticamente títulos, párrafos, listas, tablas e imágenes.</li>
        <li><strong>Pegar desde Word:</strong> copia en Word con <kbd>Ctrl+C</kbd>, haz clic en el editor y pega con <kbd>Ctrl+V</kbd>. Si el contenido viene de Word, el editor lo limpia y lo adapta.</li>
        <li><strong>Pegar texto simple:</strong> si pegas texto sin formato, el editor lo convierte en párrafos legibles compatibles con Moodle.</li>
        <li><strong>Reabrir contenido ya publicado:</strong> usa <strong>📥 Añadir HTML Moodle</strong> para recuperar HTML generado previamente con este editor y copiado desde Moodle.</li>
      </ol>
      <p>Para obtener mejores resultados desde Word, usa estilos reales de título: <strong>Título 1, Título 2, Título 3</strong>. No basta con poner el texto en negrita o aumentar el tamaño manualmente.</p>
      <div class="help-tip">💡 Atajos útiles en Word: <kbd>Ctrl+Alt+1</kbd> para Título 1, <kbd>Ctrl+Alt+2</kbd> para Título 2, <kbd>Ctrl+Alt+3</kbd> para Título 3 y <kbd>Ctrl+0</kbd> para volver a texto normal.</div>
      <div class="help-tip">⚠️ Si pegas desde Word Online, la detección de títulos puede ser menos precisa. Para documentos complejos, es preferible Word de escritorio o abrir el archivo .docx directamente.</div>`
  },
  s2: {
    icon:'🧩', title:'Bloques especiales',
    html:`
      <p>Los bloques especiales sirven para destacar información didáctica o institucional sin tener que escribir HTML manualmente.</p>
      <ol>
        <li>Coloca el cursor donde quieres insertar el bloque.</li>
        <li>Pulsa el botón correspondiente en el panel de herramientas.</li>
        <li>Edita el texto directamente dentro del bloque.</li>
        <li>Pulsa <kbd>Enter</kbd> para añadir líneas dentro del bloque.</li>
        <li>Pulsa <kbd>Alt+Enter</kbd> para salir del bloque y crear una línea nueva fuera de él.</li>
      </ol>
      <p>Bloques disponibles:</p>
      <ul>
        <li><strong>🎯 Objetivo:</strong> aprendizaje esperado o capacidad que debe adquirir el alumno.</li>
        <li><strong>🤔 Reflexión:</strong> pregunta para activar pensamiento crítico antes de continuar.</li>
        <li><strong>⚠️ Aviso:</strong> advertencia importante, especialmente útil en seguridad o procedimientos.</li>
        <li><strong>ℹ️ Info:</strong> información complementaria o aclaratoria.</li>
        <li><strong>💡 Consejo:</strong> recomendación práctica del instructor.</li>
        <li><strong>🔢 Paso:</strong> fase o instrucción dentro de un procedimiento.</li>
        <li><strong>🛠️ Práctica:</strong> actividad, ejercicio o tarea aplicada.</li>
        <li><strong>«» Cita:</strong> referencia, cita textual o idea destacada.</li>
        <li><strong>📚 Extra:</strong> ampliación o material opcional.</li>
        <li><strong>Definición:</strong> término y explicación en formato de ficha.</li>
        <li><strong>Secuencia:</strong> bloque guiado con varios pasos operativos.</li>
      </ul>
      <div class="help-tip">💡 Regla clave: <kbd>Enter</kbd> escribe dentro del bloque; <kbd>Alt+Enter</kbd> sale del bloque y te deja continuar debajo.</div>
      <div class="help-tip">💡 Para mover un bloque, selecciónalo, córtalo con <kbd>Ctrl+X</kbd> y pégalo donde quieras con <kbd>Ctrl+V</kbd>.</div>`
  },
  s3: {
    icon:'🖼️', title:'Imágenes',
    html:`
      <p>Puedes insertar imágenes de cuatro formas:</p>
      <ol>
        <li><strong>Desde tu equipo:</strong> pulsa <strong>🖼️ Imagen</strong>, elige el archivo, define pie de foto y ancho.</li>
        <li><strong>Desde URL:</strong> pulsa <strong>Imagen URL</strong>, pega la dirección de la imagen y define pie de foto y ancho.</li>
        <li><strong>Arrastrando:</strong> suelta una imagen directamente sobre el editor.</li>
        <li><strong>Desde Word:</strong> las imágenes incluidas en un .docx se detectan e incrustan automáticamente.</li>
      </ol>
      <p>Las imágenes locales se comprimen automáticamente para que el contenido no sea excesivamente pesado.</p>
      <p>Al hacer clic sobre una imagen aparece una barra rápida para ajustar el tamaño a <strong>100%</strong>, <strong>75%</strong>, <strong>50%</strong> o <strong>Auto</strong>.</p>
      <div class="help-tip">💡 El pie de foto es editable. Si estás escribiendo en él, <kbd>Enter</kbd> añade línea dentro del título y <kbd>Alt+Enter</kbd> sale del bloque de imagen.</div>
      <div class="help-tip">⚠️ Si usas una imagen por URL, asegúrate de que el alumnado tendrá permiso para verla desde Moodle.</div>`
  },
  s4: {
    icon:'🎬', title:'Vídeos',
    html:`
      <p>Para insertar un vídeo, coloca el cursor donde quieras el recurso y pulsa <strong>🎬 Vídeo</strong>.</p>
      <ul>
        <li><strong>YouTube:</strong> pega la URL normal del vídeo o de YouTube Shorts. El editor la convierte automáticamente a formato insertable.</li>
        <li><strong>Mediateca EducaMadrid:</strong> usa la URL del iframe o la dirección de inserción que proporciona la mediateca.</li>
        <li><strong>Otras plataformas:</strong> usa una URL embed compatible mediante iframe.</li>
      </ul>
      <p>El vídeo se inserta dentro de un bloque visual adaptado al ancho del contenido y con título editable.</p>
      <div class="help-tip">💡 Si estás editando el título del vídeo, <kbd>Alt+Enter</kbd> te saca del recurso y crea una línea nueva debajo.</div>
      <div class="help-tip">⚠️ Comprueba siempre que el vídeo está accesible para el alumnado y no depende de una sesión privada.</div>`
  },
  s5: {
    icon:'📄', title:'PDF y presentaciones',
    html:`
      <p>El editor permite incrustar documentos para que el alumnado los consulte dentro de Moodle.</p>
      <p><strong>PDF:</strong></p>
      <ol>
        <li>Sube el PDF a Moodle y copia una URL definitiva, preferiblemente <code>pluginfile.php</code>.</li>
        <li>Pulsa <strong>📄 PDF</strong>.</li>
        <li>Pega la URL, escribe título y elige altura del visor.</li>
        <li>Opcionalmente activa la protección para ocultar botones de descarga e impresión en navegadores compatibles.</li>
      </ol>
      <p><strong>Presentaciones:</strong></p>
      <ul>
        <li>OneDrive / SharePoint: usa el enlace de inserción o una URL compatible con Office online.</li>
        <li>Google Slides: usa la opción publicar/insertar.</li>
        <li>Moodle: usa enlaces accesibles para el alumnado.</li>
      </ul>
      <div class="help-tip">💡 Si editas el título de un PDF o presentación, <kbd>Alt+Enter</kbd> sale del recurso y crea una línea nueva debajo.</div>
      <div class="help-tip">⚠️ Evita URLs <code>draftfile.php</code>; suelen dejar de funcionar al guardar o al cambiar de usuario.</div>`
  },
  s6: {
    icon:'📊', title:'Tablas',
    html:`
      <p>Puedes crear tablas desde el asistente o importarlas desde Word.</p>
      <p><strong>Desde el asistente:</strong></p>
      <ol>
        <li>Pulsa <strong>📊 Tabla</strong>.</li>
        <li>Indica columnas, filas y si quieres fila de cabecera.</li>
        <li>Edita cualquier celda haciendo clic sobre ella.</li>
      </ol>
      <p><strong>Desde Word:</strong> el editor intenta conservar colores, celdas combinadas y formato básico.</p>
      <ul>
        <li><kbd>Enter</kbd> dentro de una celda crea salto de línea dentro de esa celda.</li>
        <li><kbd>Alt+Enter</kbd> dentro de una celda sale de la tabla completa y crea una línea debajo.</li>
      </ul>
      <div class="help-tip">💡 Las tablas se envuelven en un bloque adaptable para evitar que se salgan del ancho en Moodle.</div>
      <div class="help-tip">⚠️ Evita tablas demasiado anchas o con demasiadas columnas si el alumnado las verá en móvil.</div>`
  },
  s7: {
    icon:'📋', title:'Copiar a Moodle',
    html:`
      <p>Cuando el contenido esté listo:</p>
      <ol>
        <li>Selecciona el <strong>módulo</strong> en el desplegable inferior.</li>
        <li>Elige si quieres exportar como <strong>Documento completo</strong> o <strong>Solo bloque</strong>.</li>
        <li>Pulsa <strong>📋 Copiar para pegar en Moodle</strong>.</li>
        <li>En Moodle, abre la página, libro o recurso donde quieres pegar.</li>
        <li>Abre el editor HTML con el botón <strong>&lt;/&gt;</strong>.</li>
        <li>Pega con <kbd>Ctrl+V</kbd> y guarda.</li>
      </ol>
      <p>Si está activado <strong>Documento completo</strong>, el editor añade cabecera y pie institucional con el módulo seleccionado.</p>
      <div class="help-tip">💡 Usa siempre el modo HTML de Moodle. No pegues este código directamente en la vista visual del editor.</div>
      <div class="help-tip">⚠️ Si después editas mucho el HTML directamente en Moodle, puede ser más difícil reabrirlo en el editor sin perder estructura.</div>`
  },
  s8: {
    icon:'⌨️', title:'Atajos de teclado',
    html:`
      <p>Atajos principales dentro del editor:</p>
      <ul>
        <li><kbd>Ctrl+Z</kbd> — deshacer.</li>
        <li><kbd>Ctrl+Y</kbd> — rehacer.</li>
        <li><kbd>Ctrl+V</kbd> — pegar texto o contenido desde Word.</li>
        <li><kbd>Ctrl+X</kbd> — cortar selección o bloque seleccionado.</li>
        <li><kbd>Ctrl+B</kbd> — negrita.</li>
        <li><kbd>Ctrl+I</kbd> — cursiva.</li>
        <li><kbd>Ctrl+U</kbd> — subrayado.</li>
        <li><kbd>Enter</kbd> dentro de un bloque editable — añade una línea dentro del mismo bloque.</li>
        <li><kbd>Alt+Enter</kbd> dentro de un bloque, tabla o recurso — sale del bloque actual y crea una línea nueva debajo.</li>
        <li><kbd>Enter</kbd> dentro de una celda — salto de línea dentro de la celda.</li>
        <li><kbd>Escape</kbd> — cierra algunos modales abiertos.</li>
      </ul>
      <p>Atajos recomendados en Word antes de importar:</p>
      <ul>
        <li><kbd>Ctrl+Alt+1</kbd> — Título 1.</li>
        <li><kbd>Ctrl+Alt+2</kbd> — Título 2.</li>
        <li><kbd>Ctrl+Alt+3</kbd> — Título 3.</li>
        <li><kbd>Ctrl+0</kbd> — volver al estilo normal.</li>
      </ul>
      <div class="help-tip">💡 Recuerda: <kbd>Enter</kbd> escribe dentro; <kbd>Alt+Enter</kbd> te permite continuar fuera.</div>`
  },
  s9: {
    icon:'✉️', title:'Contacto y sugerencias',
    html:`
      <p>Si encuentras algún problema o tienes sugerencias, escribe al equipo técnico:</p>
      <div style="text-align:center;margin:20px 0;">
        <a href="mailto:aulavirtualcbcm@madrid.org"
           style="display:inline-block;background:#C0272D;color:#fff;padding:12px 28px;border-radius:8px;font-weight:700;font-size:15px;text-decoration:none;box-shadow:0 4px 12px rgba(192,39,45,.3);">
          ✉️ aulavirtualcbcm@madrid.org
        </a>
      </div>
      <p>Incluye siempre:</p>
      <ul>
        <li>curso o módulo afectado,</li>
        <li>navegador utilizado,</li>
        <li>qué estabas intentando hacer,</li>
        <li>captura o ejemplo del contenido si es posible.</li>
      </ul>
      <div class="help-tip">💡 Para incidencias urgentes, indica la fecha límite en el asunto del correo.</div>`
  },
  s10: {
    icon:'📚', title:'Selector de módulo',
    html:`
      <p>El selector de módulo está en la zona inferior del panel de herramientas.</p>
      <p>Es obligatorio seleccionarlo antes de copiar si vas a exportar como <strong>Documento completo</strong>, porque el módulo aparece en la cabecera y el pie institucional.</p>
      <ul>
        <li>Cuando eliges un módulo, el desplegable se marca visualmente.</li>
        <li>Si intentas copiar sin módulo, el editor muestra un aviso.</li>
        <li>La opción <strong>Ayuda · Equipo Técnico</strong> sirve para contenidos de soporte o documentación interna.</li>
      </ul>
      <div class="help-tip">💡 Si solo necesitas un fragmento sin cabecera ni pie, desactiva <strong>Documento completo</strong> antes de copiar.</div>`
  },
  s11: {
    icon:'⚙️', title:'Cómo funciona el editor',
    html:`
      <p>El editor genera HTML compatible con Moodle mediante estilos inline. Esto evita depender de hojas CSS externas que Moodle podría eliminar o no cargar.</p>
      <ul>
        <li>Los textos y bloques institucionales se optimizan a un ancho aproximado de 800px.</li>
        <li>Los recursos visuales —imágenes, vídeos, PDF, presentaciones y tablas— se optimizan a un ancho aproximado de 1000px.</li>
        <li>Al copiar, se eliminan atributos de edición y clases internas que Moodle no necesita.</li>
        <li>Las tablas se suavizan para evitar bordes negros o estilos heredados.</li>
        <li>Los saltos de línea dentro de bloques se conservan en la exportación.</li>
      </ul>
      <div class="help-tip">💡 El objetivo es que lo que ves en la previsualización sea lo más parecido posible a lo que verá el alumnado en Moodle.</div>
      <div class="help-tip">⚠️ No añadas scripts ni widgets externos dentro del HTML: Moodle puede bloquearlos y además pueden comprometer la estabilidad del contenido.</div>`
  },
  s12: {
    icon:'📥', title:'Reabrir HTML Moodle',
    html:`
      <p>La opción <strong>📥 Añadir HTML Moodle</strong> permite recuperar contenido que fue creado con este editor, pegado en Moodle y después copiado de nuevo desde el modo HTML de Moodle.</p>
      <ol>
        <li>En Moodle, abre el recurso o página que contiene el material.</li>
        <li>Entra en el editor HTML con el botón <strong>&lt;/&gt;</strong>.</li>
        <li>Copia todo el HTML.</li>
        <li>Vuelve a este editor y pulsa <strong>📥 Añadir HTML Moodle</strong>.</li>
        <li>Pega el HTML en la ventana.</li>
        <li>Elige si quieres sustituir el contenido actual o añadirlo al final.</li>
        <li>Pulsa <strong>Procesar e insertar</strong>.</li>
      </ol>
      <p>El importador limpia envoltorios de Moodle, elimina cabeceras y pies antiguos para evitar duplicados, conserva estilos inline, tablas, imágenes, vídeos, PDF y presentaciones.</p>
      <div class="help-tip">💡 Esta función está pensada para HTML generado previamente con este editor, no para importar cualquier HTML externo de internet.</div>
      <div class="help-tip">⚠️ Si Moodle ha modificado mucho el HTML manualmente, revisa el resultado antes de volver a copiarlo.</div>`
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
//  PREVISUALIZACIÓN FIEL A EXPORTACIÓN MOODLE
//  Texto/bloques: 800px · Recursos: 1000px
// ══════════════════════════════════════════════════════════════
function syncPreviewExportClasses() {
  if (!editor) return;
  Array.from(editor.children).forEach(el => {
    if (!el || el.nodeType !== 1) return;
    el.classList.remove('moodle-content-block', 'moodle-media-block-preview');
    const tag = el.tagName ? el.tagName.toLowerCase() : '';
    const hasMedia = !!(el.querySelector && el.querySelector('img,iframe,video,audio,table'));
    const isImageMediaBlock = el.classList.contains('moodle-media-block')
      && !!el.querySelector('img')
      && !el.querySelector('iframe,video,audio,table');

    if (isImageMediaBlock) {
      // Las imágenes ya tienen una tarjeta interna redimensionable.
      // No añadimos moodle-media-block-preview porque esa clase pinta
      // un marco grande de 1000px alrededor de la imagen en la vista editor.
      el.style.textAlign = 'center';
      el.style.width = '100%';
      el.style.maxWidth = EXPORT_MEDIA_MAX;
      el.style.marginLeft = 'auto';
      el.style.marginRight = 'auto';
      el.style.boxSizing = 'border-box';
      el.style.border = 'none';
      el.style.background = 'transparent';
      el.style.backgroundColor = 'transparent';
      el.style.boxShadow = 'none';
      el.style.borderRadius = '0';
      el.style.padding = '0';
      el.style.overflow = 'visible';
      return;
    }

    if (tag === 'table' || hasMedia || el.classList.contains('moodle-media-block')) {
      el.classList.add('moodle-media-block-preview');
    } else {
      el.classList.add('moodle-content-block');
    }
  });
}
const previewExportObserver = new MutationObserver(() => syncPreviewExportClasses());
previewExportObserver.observe(editor, { childList:true, subtree:false });
editor.addEventListener('input', syncPreviewExportClasses);
setTimeout(syncPreviewExportClasses, 0);

// ══════════════════════════════════════════════════════════════
//  INPUT FILE
// ══════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════
//  IMAGE SIZE TOOLBAR · v7.2
//  Corrige imágenes recuperadas desde Moodle:
//  - el ancho se aplica al marco interno redimensionable;
//  - si Moodle devuelve una imagen dentro de un panel gris grande, el panel
//    se mete dentro del marco, en vez de crear un marco dentro del panel;
//  - el contenedor exterior .moodle-media-block queda neutro a 1000px y sin clase de marco grande.
// ══════════════════════════════════════════════════════════════
(function() {
  let _target = null;
  const toolbar = document.getElementById('img-size-toolbar');
  if (!toolbar || !editor) return;

  function cssText(el) {
    return String((el && el.getAttribute && el.getAttribute('style')) || '').toLowerCase().replace(/\s+/g, '');
  }

  function closestImage(el) {
    if (!el) return null;
    if (el.tagName && el.tagName.toLowerCase() === 'img') return el;
    return el.closest ? el.closest('img') : null;
  }

  function isCaptionLike(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.getAttribute('contenteditable') === 'true') return true;
    const s = cssText(el);
    return s.includes('border-top:1pxsolid#d1d1d1') && !el.querySelector('img');
  }

  function isImagePanel(el) {
    if (!el || el.nodeType !== 1 || el.tagName !== 'DIV') return false;
    const s = cssText(el);
    return el.querySelector('img') && (
      s.includes('background:#f0f0f0') ||
      s.includes('background-color:#f0f0f0') ||
      s.includes('padding:16px') ||
      s.includes('text-align:center')
    );
  }

  function findMediaBlock(img) {
    const existing = img.closest('.moodle-media-block');
    if (existing && editor.contains(existing)) return existing;

    let node = img;
    while (node && node.parentElement && node.parentElement !== editor) node = node.parentElement;
    if (node && node !== img && editor.contains(node) && node.querySelector('img')) return node;

    const block = document.createElement('div');
    block.className = 'moodle-media-block';
    block.setAttribute('style', 'text-align:center;margin:20px auto;width:100%;max-width:' + EXPORT_MEDIA_MAX + ';box-sizing:border-box;');
    img.parentNode.insertBefore(block, img);
    block.appendChild(img);
    return block;
  }

  function ensureMediaBlockStyle(block) {
    if (!block || !block.style) return;
    if (!block.classList.contains('moodle-media-block')) block.classList.add('moodle-media-block');

    // El bloque exterior solo debe actuar como límite institucional de 1000px.
    // No debe pintar borde, fondo, sombra ni relleno; si Moodle nos lo devuelve
    // con esos estilos, se ve como un rectángulo enorme alrededor de la imagen.
    block.style.textAlign = 'center';
    block.style.marginLeft = 'auto';
    block.style.marginRight = 'auto';
    if (!block.style.marginTop) block.style.marginTop = '20px';
    if (!block.style.marginBottom) block.style.marginBottom = '20px';
    block.style.width = '100%';
    block.style.maxWidth = EXPORT_MEDIA_MAX;
    block.style.boxSizing = 'border-box';
    block.style.border = 'none';
    block.style.background = 'transparent';
    block.style.backgroundColor = 'transparent';
    block.style.boxShadow = 'none';
    block.style.borderRadius = '0';
    block.style.padding = '0';
    block.style.overflow = 'visible';
  }

  function findExistingResizableFrame(img, block) {
    let node = img.parentElement;
    while (node && node !== editor && node !== block) {
      if (node.nodeType === 1 && node.tagName === 'DIV') {
        const s = cssText(node);
        if (s.includes('display:inline-block') && node.querySelector('img')) return node;
      }
      node = node.parentElement;
    }
    return null;
  }

  function styleResizableFrame(frame) {
    frame.style.display = 'inline-block';
    if (!frame.style.width) frame.style.width = '100%';
    frame.style.maxWidth = '100%';
    frame.style.background = '#fff';
    frame.style.border = '1px solid #d1d1d1';
    frame.style.borderRadius = '10px';
    frame.style.overflow = 'hidden';
    frame.style.boxShadow = '0 4px 12px rgba(0,0,0,.12)';
    frame.style.fontFamily = 'Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif';
    frame.style.boxSizing = 'border-box';
  }

  function styleImagePanel(panel) {
    if (!panel || !panel.style) return;
    panel.style.textAlign = 'center';
    panel.style.background = '#f0f0f0';
    panel.style.padding = '16px';
    panel.style.boxSizing = 'border-box';
  }

  function styleImage(img, mode) {
    if (!img || !img.style) return;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.borderRadius = img.style.borderRadius || '6px';
    img.style.display = 'block';
    img.style.marginLeft = 'auto';
    img.style.marginRight = 'auto';
    img.style.boxSizing = 'border-box';
    if (mode === 'auto') {
      img.style.width = 'auto';
    } else {
      img.style.width = '100%';
    }
  }

  function ensureResizableFrame(img) {
    const block = findMediaBlock(img);
    ensureMediaBlockStyle(block);

    const existing = findExistingResizableFrame(img, block);
    if (existing) {
      styleResizableFrame(existing);
      const panel = img.parentElement;
      if (isImagePanel(panel)) styleImagePanel(panel);
      return existing;
    }

    const parent = img.parentNode;
    const panelCandidate = isImagePanel(parent) ? parent : null;
    const frame = document.createElement('div');
    styleResizableFrame(frame);

    if (panelCandidate && panelCandidate.parentNode) {
      // Caso problemático de Moodle: .moodle-media-block > panel gris 100% > img.
      // Movemos el panel gris completo dentro del marco redimensionable.
      panelCandidate.parentNode.insertBefore(frame, panelCandidate);
      frame.appendChild(panelCandidate);
      styleImagePanel(panelCandidate);
    } else {
      // Imagen suelta: creamos panel gris normal dentro del marco.
      const imagePanel = document.createElement('div');
      styleImagePanel(imagePanel);
      parent.insertBefore(frame, img);
      frame.appendChild(imagePanel);
      imagePanel.appendChild(img);
    }

    styleImage(img, frame.style.width ? 'scaled' : 'auto');
    return frame;
  }

  function getImgContainer(el) {
    if (!el || (el.getAttribute && el.getAttribute('contenteditable') === 'true')) return null;
    if (isCaptionLike(el)) return null;
    const img = closestImage(el) || (el.querySelector ? el.querySelector('img') : null);
    if (!img || !editor.contains(img)) return null;
    return ensureResizableFrame(img);
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
    const c = getImgContainer(e.target);
    if (c) { _target = c; positionToolbar(c); }
    else hide();
  });

  toolbar.addEventListener('click', function(e) {
    const btn = e.target.closest('.img-size-btn');
    if (!btn || !_target) return;
    e.preventDefault();
    e.stopPropagation();

    saveBlockUndo();
    const size = btn.dataset.size;
    const img = _target.querySelector('img');

    styleResizableFrame(_target);

    if (size === 'auto') {
      _target.style.width = '';
      _target.style.maxWidth = '100%';
      styleImage(img, 'auto');
    } else {
      _target.style.width = size;
      _target.style.maxWidth = '100%';
      styleImage(img, 'scaled');
    }

    toolbar.querySelectorAll('.img-size-btn').forEach(b => b.classList.toggle('active', b === btn));
    if (typeof syncPreviewExportClasses === 'function') syncPreviewExportClasses();
    editor.dispatchEvent(new Event('input', { bubbles:true }));
    if (typeof syncPreviewExportClasses === 'function') syncPreviewExportClasses();
    refreshOutput();
    positionToolbar(_target);
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('#img-size-toolbar') && !e.target.closest('.editor-area')) hide();
  });
  const wrap = document.querySelector('.editor-wrap');
  if (wrap) wrap.addEventListener('scroll', hide);
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

// LAYOUT SPLIT v6.3 aplicado por CSS: herramientas a la izquierda y previsualización a la derecha.


/* ============================================================
   PARCHE v6.3.1 · CONSERVAR SALTOS DE LÍNEA EN EXPORTACIÓN
   Coloca este bloque AL FINAL de app.js, o carga este archivo después de app.js.
   Motivo: la versión anterior eliminaba todos los <br> fuera de tablas.
   ============================================================ */
(function(){
  if (typeof buildFinalHTML !== 'function') {
    console.warn('Parche saltos de línea: no se encontró buildFinalHTML.');
    return;
  }

  function fallbackCleanExportAttributes(root) {
    root.querySelectorAll('[contenteditable]').forEach(el => el.removeAttribute('contenteditable'));
    root.querySelectorAll('[bis_skin_checked]').forEach(el => el.removeAttribute('bis_skin_checked'));
    root.querySelectorAll('[data-placeholder]').forEach(el => el.removeAttribute('data-placeholder'));
    root.querySelectorAll('[spellcheck]').forEach(el => el.removeAttribute('spellcheck'));
  }

  // Reemplaza buildFinalHTML conservando los <br> introducidos por el usuario.
  buildFinalHTML = function() {
    const clone = editor.cloneNode(true);

    if (typeof cleanExportAttributes === 'function') cleanExportAttributes(clone);
    else fallbackCleanExportAttributes(clone);

    if (typeof normalizeInvalidParagraphBlocks === 'function') normalizeInvalidParagraphBlocks(clone);
    if (typeof removeDefaultResourcePlaceholders === 'function') removeDefaultResourcePlaceholders(clone);
    if (typeof neutralizeBrokenInternalLinks === 'function') neutralizeBrokenInternalLinks(clone);
    if (typeof cleanPreviewOnlyClasses === 'function') cleanPreviewOnlyClasses(clone);
    if (typeof applyOptimizedReadingWidthForExport === 'function') applyOptimizedReadingWidthForExport(clone);

    let blockIndex = 0;
    Array.from(clone.childNodes).forEach(node => {
      const label = typeof getBlockLabel === 'function' ? getBlockLabel(node) : null;
      if (label) {
        blockIndex++;
        const comment = document.createComment(` BLOQUE ${blockIndex}: ${label} `);
        clone.insertBefore(comment, node);
      }
    });

    let html = clone.innerHTML || '';
    html = html.replace(/ style="outline: none; cursor: text;"/gi, '');
    html = html.replace(/\sclass=""/gi, '');

    // Mantener los párrafos vacíos como separadores legibles en Moodle.
    html = html.replace(/<p><br\s*\/?><\/p>/gi, '<p>&nbsp;</p>');

    // CORRECCIÓN PRINCIPAL:
    // Antes se eliminaban todos los <br> fuera de celdas de tabla.
    // Ahora se normalizan y se conservan para respetar los saltos de línea
    // escritos dentro de bloques como Aviso, Objetivo, Consejo, Paso, etc.
    html = html.replace(/<br\s*\/?\>/gi, '<br>');

    html = html.trim();

    if (html && html !== '<p>&nbsp;</p>') {
      const includeBanner = document.getElementById('toggle-banner')?.checked !== false;
      if (includeBanner && typeof buildBanner === 'function') {
        html = buildBanner('header') + '\n' + html + '\n' + buildBanner('footer');
      }
    }
    return html;
  };

  // Fuerza refresco del estado del botón Copiar si ya hay contenido.
  if (typeof refreshOutput === 'function') refreshOutput();
})();

// PANEL BLOQUES VISIBLES v6.4: reconfiguración visual del panel izquierdo sin cambios funcionales.

// PANEL IZQUIERDO AMIGABLE v6.5: mejora visual de botones y legibilidad sin cambios funcionales.
// PANEL IZQUIERDO SCROLL GENERAL v6.6: scroll vertical único para todo el panel izquierdo; sin cambios funcionales.

/* ============================================================
   PARCHE v6.7 · INTRO COHERENTE EN TODOS LOS BLOQUES EDITABLES
   Comportamiento único: Enter dentro de cualquier bloque editable
   inserta un salto de línea dentro del MISMO bloque, sin dividirlo
   ni crear una nueva tarjeta/bloque visual. Se dejan las listas con
   comportamiento nativo para crear nuevos <li>.
   ============================================================ */
(function(){
  if (!window.editor) return;

  function isInsideEditor(node) {
    return !!(node && (node === editor || editor.contains(node)));
  }

  function closestElement(node) {
    if (!node) return null;
    return node.nodeType === 1 ? node : node.parentElement;
  }

  function getEditableHostInsideEditor(node) {
    const el = closestElement(node);
    if (!el || !isInsideEditor(el)) return null;
    const host = el.closest('[contenteditable="true"]');
    if (!host || host === editor || !isInsideEditor(host)) return null;
    return host;
  }

  function isManagedEditableBlock(host) {
    if (!host || host === editor) return false;
    if (host.closest('li')) return false; // Las listas mantienen Enter nativo para nuevos elementos.
    if (host.closest('td,th')) return true;
    const style = (host.getAttribute('style') || '').toLowerCase();
    const parentStyle = (host.parentElement && host.parentElement.getAttribute('style') || '').toLowerCase();
    const blockMarkers = [
      '#c0272d','#8e1b1f','#fff0f0','#e8b4b5',
      '#2e7d32','#7b1fa2','#f59e0b','#1d4ed8','#0d9488',
      '#4338ca','#0f766e','#94a3b8','#6b7280','#eeeeee'
    ];
    return host.hasAttribute('contenteditable') && (
      style.includes('display:inline-block') ||
      style.includes('display:block') ||
      style.includes('border-left') ||
      style.includes('background') ||
      parentStyle.includes('margin:') ||
      blockMarkers.some(m => style.includes(m) || parentStyle.includes(m))
    );
  }

  function insertLineBreakAtSelection() {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return false;
    const range = sel.getRangeAt(0);
    range.deleteContents();

    const br = document.createElement('br');
    range.insertNode(br);

    // Si el salto se inserta al final del bloque, un segundo <br> garantiza
    // que el cursor quede en una línea visible en Chrome/Edge.
    const afterRange = document.createRange();
    afterRange.setStartAfter(br);
    afterRange.collapse(true);
    sel.removeAllRanges();
    sel.addRange(afterRange);

    const host = getEditableHostInsideEditor(br);
    if (host) {
      const test = document.createRange();
      test.selectNodeContents(host);
      test.setStartAfter(br);
      const afterText = test.toString().replace(/\u00a0/g, ' ').trim();
      const hasAfterElements = Array.from(host.childNodes).some(n => {
        if (n === br) return false;
        if (n.nodeType === 3) return n.textContent.replace(/\u00a0/g, ' ').trim() !== '' && (n.compareDocumentPosition(br) & Node.DOCUMENT_POSITION_PRECEDING);
        return (n.compareDocumentPosition(br) & Node.DOCUMENT_POSITION_PRECEDING);
      });
      if (!afterText && !hasAfterElements) {
        const br2 = document.createElement('br');
        br.parentNode.insertBefore(br2, br.nextSibling);
        const r = document.createRange();
        r.setStartAfter(br);
        r.collapse(true);
        sel.removeAllRanges();
        sel.addRange(r);
      }
    }
    return true;
  }

  editor.addEventListener('keydown', function(e) {
    if (e.key !== 'Enter') return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    const host = getEditableHostInsideEditor(sel.getRangeAt(0).startContainer);
    if (!isManagedEditableBlock(host)) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    if (typeof saveBlockUndo === 'function') saveBlockUndo();
    insertLineBreakAtSelection();
    if (typeof captureEditorCursor === 'function') captureEditorCursor();
    editor.dispatchEvent(new Event('input', { bubbles:true }));
    if (typeof refreshOutput === 'function') refreshOutput();
  }, true);

  // Limpieza preventiva: si el navegador o un pegado genera divs/p internos
  // dentro de un bloque editable, los convertimos a saltos <br> para mantener
  // el bloque como una sola unidad visual.
  function normalizeNestedBlocksInsideEditable(host) {
    if (!isManagedEditableBlock(host) || host.closest('td,th,li')) return;
    const nested = Array.from(host.querySelectorAll(':scope > div, :scope > p'));
    if (!nested.length) return;
    nested.forEach((node, idx) => {
      const frag = document.createDocumentFragment();
      if (idx > 0) frag.appendChild(document.createElement('br'));
      while (node.firstChild) frag.appendChild(node.firstChild);
      node.parentNode.replaceChild(frag, node);
    });
  }

  editor.addEventListener('input', function(e) {
    const host = getEditableHostInsideEditor(e.target);
    if (host) normalizeNestedBlocksInsideEditable(host);
  }, true);
})();

// v6.7: Intro uniforme dentro de bloques editables.


/* ============================================================
   PARCHE v6.8 · TABLAS MOODLE SIN BORDES NEGROS
   - El generador de maniobras ya no usa tablas reales para pasos/riesgos.
   - Si queda alguna tabla antigua o importada, se fuerza borde suave inline.
   ============================================================ */
(function(){
  if (typeof buildFinalHTML !== 'function') return;
  const __buildFinalHTML_v68 = buildFinalHTML;
  function softenTablesInHtml(html) {
    if (!html || html.indexOf('<table') === -1) return html;
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    tmp.querySelectorAll('table').forEach(table => {
      table.style.borderCollapse = 'separate';
      table.style.borderSpacing = '0';
      table.style.border = '1px solid #edf0f4';
      table.style.borderRadius = '12px';
      table.style.overflow = 'hidden';
      table.style.background = '#ffffff';
      table.style.boxSizing = 'border-box';
      table.style.width = table.style.width || '100%';
    });
    tmp.querySelectorAll('th').forEach(th => {
      th.style.backgroundColor = th.style.backgroundColor || '#fff7f7';
      th.style.color = th.style.color || '#9b1e23';
      th.style.borderTop = 'none';
      th.style.borderLeft = 'none';
      th.style.borderRight = '1px solid #edf0f4';
      th.style.borderBottom = '1px solid #edf0f4';
      th.style.fontWeight = th.style.fontWeight || '800';
      th.style.boxSizing = 'border-box';
    });
    tmp.querySelectorAll('td').forEach(td => {
      td.style.borderTop = 'none';
      td.style.borderLeft = 'none';
      td.style.borderRight = '1px solid #edf0f4';
      td.style.borderBottom = '1px solid #edf0f4';
      td.style.boxSizing = 'border-box';
    });
    tmp.querySelectorAll('tr').forEach(tr => {
      const cells = Array.from(tr.children).filter(el => /^(TD|TH)$/.test(el.tagName));
      if (cells.length) cells[cells.length - 1].style.borderRight = 'none';
    });
    tmp.querySelectorAll('table').forEach(table => {
      const rows = Array.from(table.querySelectorAll('tr'));
      if (!rows.length) return;
      Array.from(rows[rows.length - 1].children).forEach(cell => {
        if (/^(TD|TH)$/.test(cell.tagName)) cell.style.borderBottom = 'none';
      });
    });
    return tmp.innerHTML;
  }
  buildFinalHTML = function() {
    return softenTablesInHtml(__buildFinalHTML_v68());
  };
  if (typeof refreshOutput === 'function') refreshOutput();
})();

/* ============================================================
   PARCHE v6.9 · SALIR DE BLOQUE CON ALT + ENTER
   - Enter mantiene el comportamiento actual: salto dentro del bloque.
   - Alt+Enter crea o reutiliza una línea editable justo después del bloque actual.
   - Funciona desde bloques de texto, recursos multimedia, pies de foto y tablas.
   ============================================================ */
(function(){
  if (!window.editor) return;

  function closestElement(node) {
    if (!node) return null;
    return node.nodeType === 1 ? node : node.parentElement;
  }

  function getTopLevelBlockFromSelection() {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return null;
    let el = closestElement(sel.getRangeAt(0).startContainer);
    if (!el || !editor.contains(el) || el === editor) return null;
    while (el.parentElement && el.parentElement !== editor) {
      el = el.parentElement;
    }
    return el && el.parentElement === editor ? el : null;
  }

  function isEmptyEditableParagraph(el) {
    if (!el || el.nodeType !== 1 || el.tagName.toLowerCase() !== 'p') return false;
    const text = el.textContent.replace(/\u00a0/g, ' ').trim();
    const hasContentElement = !!el.querySelector('img,iframe,video,audio,table,ul,ol,div,section,article,figure,blockquote');
    return !text && !hasContentElement;
  }

  function placeCursorAtStart(el) {
    const range = document.createRange();
    range.setStart(el, 0);
    range.collapse(true);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function ensureExitParagraphAfter(block) {
    let target = block.nextElementSibling;
    if (!isEmptyEditableParagraph(target)) {
      target = document.createElement('p');
      target.innerHTML = '<br>';
      block.parentNode.insertBefore(target, block.nextSibling);
    }
    return target;
  }

  function exitCurrentBlock() {
    const block = getTopLevelBlockFromSelection();
    if (!block) return false;
    const target = ensureExitParagraphAfter(block);
    editor.focus();
    placeCursorAtStart(target);
    if (typeof captureEditorCursor === 'function') captureEditorCursor();
    editor.dispatchEvent(new Event('input', { bubbles:true }));
    if (typeof refreshOutput === 'function') refreshOutput();
    return true;
  }

  editor.addEventListener('keydown', function(e) {
    if (e.key !== 'Enter') return;
    if (!e.altKey || e.ctrlKey || e.metaKey) return;
    if (typeof saveBlockUndo === 'function') saveBlockUndo();
    const ok = exitCurrentBlock();
    if (!ok) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }, true);
})();

