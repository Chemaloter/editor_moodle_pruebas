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
window.EXPORT_CONTENT_MAX = EXPORT_CONTENT_MAX;
window.EXPORT_MEDIA_MAX = EXPORT_MEDIA_MAX;
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
  const CONTENT_MAX = typeof EXPORT_CONTENT_MAX !== 'undefined' ? EXPORT_CONTENT_MAX : '800px';
  const MEDIA_MAX = typeof EXPORT_MEDIA_MAX !== 'undefined' ? EXPORT_MEDIA_MAX : '1000px';

  function norm(el) { return String((el && el.getAttribute && el.getAttribute('style')) || '').toLowerCase().replace(/\s+/g, ''); }
  function hasMedia(el) { return !!(el && el.querySelector && el.querySelector('img,iframe,video,audio,table')); }
  function isHeadingInner(el) {
    const s = norm(el);
    return s.includes('background-color:#c0272d') || s.includes('background:#c0272d') ||
           s.includes('background-color:#8e1b1f') || s.includes('background:#8e1b1f') ||
           s.includes('background-color:#fff0f0') || s.includes('background:#fff0f0') ||
           s.includes('border-bottom:2pxsolid#e8b4b5') ||
           s.includes('color:#c0272d') && s.includes('font-weight:700');
  }
  function isSpecialText(el) {
    const s = norm(el);
    return ['#2e7d32','#7b1fa2','#f59e0b','#1d4ed8','#0d9488','#4338ca','#0f766e','#94a3b8','#6b7280','#eeeeee'].some(m => s.includes(m));
  }
  function isTextual(el) {
    if (!el || el.nodeType !== 1 || el.closest('td,th')) return false;
    const tag = el.tagName.toLowerCase();
    if (tag === 'p' || tag === 'ul' || tag === 'ol' || tag === 'hr') return true;
    if (tag === 'div') {
      const first = el.firstElementChild;
      if (first && isHeadingInner(first)) return true;
      if (isSpecialText(el) || el.classList.contains('sequence-block')) return true;
      if (!hasMedia(el) && (norm(el).includes('margin:') || norm(el).includes('max-width:800px'))) return true;
    }
    return false;
  }
  function setBox(el, max, my) {
    if (!el || !el.style || el.closest('td,th')) return;
    el.style.width = '100%';
    el.style.maxWidth = max;
    el.style.marginLeft = 'auto';
    el.style.marginRight = 'auto';
    if (my) { el.style.marginTop = my; el.style.marginBottom = my; }
    el.style.boxSizing = 'border-box';
  }

  clone.querySelectorAll('[contenteditable]').forEach(el => el.removeAttribute('contenteditable'));
  clone.querySelectorAll('img,iframe,video,audio,table').forEach(el => {
    if (!el.style || el.closest('td,th')) return;
    el.style.maxWidth = '100%';
    el.style.boxSizing = 'border-box';
  });

  clone.querySelectorAll('p').forEach(el => {
    if (el.closest('td,th')) return;
    if (el.querySelector('img,iframe,video,audio,table,div,section,article,figure,blockquote,ul,ol,hr')) return;
    el.setAttribute('style', EXPORT_TEXT_STYLE);
  });
  clone.querySelectorAll('ul,ol').forEach(el => {
    if (el.closest('td,th')) return;
    el.setAttribute('style', EXPORT_UL_STYLE);
    setBox(el, CONTENT_MAX, '18px');
  });

  clone.querySelectorAll('div').forEach(el => {
    if (el.closest('td,th')) return;
    const first = el.firstElementChild;
    if (first && isHeadingInner(first)) setBox(el, CONTENT_MAX, '12px');
    if (isSpecialText(el) && !hasMedia(el)) setBox(el, CONTENT_MAX, '14px');
    if (el.classList.contains('sequence-block')) setBox(el, CONTENT_MAX, '24px');
  });

  Array.from(clone.children).forEach(el => {
    if (!el || el.nodeType !== 1) return;
    const tag = el.tagName.toLowerCase();
    if (hasMedia(el) || tag === 'table' || el.classList.contains('moodle-media-block')) {
      setBox(el, MEDIA_MAX, '24px');
      if ((tag === 'div' || tag === 'p') && el.querySelector('table') && !el.style.overflowX) el.style.overflowX = 'auto';
      return;
    }
    if (isTextual(el)) {
      setBox(el, CONTENT_MAX, tag === 'hr' ? '20px' : (tag === 'ul' || tag === 'ol' ? '18px' : '14px'));
      return;
    }
    if (tag === 'div' || tag === 'p' || tag === 'section' || tag === 'article' || tag === 'blockquote') setBox(el, CONTENT_MAX, '14px');
  });
}

