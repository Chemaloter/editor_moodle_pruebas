/* ============================================================
   GENERADOR DE ÍNDICE Y NAVEGACIÓN INTERNA · CBCM · v2.0
   Cambios v2.0:
   - Fix niveles: alineados con EX.h1..h4 (1..4).
   - Fix filtro back-links: usa el nivel mínimo presente
     (funciona con o sin H1 en el documento).
   - Formato nuevo del índice y del botón "Volver al índice".
   ============================================================ */
(function(){
  'use strict';

  const SCROLL_MARGIN   = '90px';
  const TOC_CONTAINER_ID = 'indice-tema';
  const BACK_LINK_TEXT   = '↑ Volver al índice';

  const COLORS = {
    red:      '#C0272D',
    redDark:  '#8E1B1F',
    redSoft:  '#fff0f0',
    text:     '#2d2d2d',
    muted:    '#6b7280',
    border:   '#e4e7ec',
    softLink: '#d7a4a6'
  };
  const FONT = 'Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif';

  function slugify(text) {
    return String(text || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 60) || 'seccion';
  }

  // Ahora los niveles coinciden EXACTAMENTE con EX.h1..h4
  //   EX.h1 = #C0272D              → level 1
  //   EX.h2 = #8E1B1F              → level 2
  //   EX.h3 = #fff0f0              → level 3
  //   EX.h4 = border-bottom #e8b4b5 → level 4
  function findHeadingWrappers() {
    const wrappers = [];
    Array.from(editor.children).forEach(child => {
      if (!child || child.nodeType !== 1) return;

      const inner = child.querySelector(':scope > div, :scope > h1, :scope > h2, :scope > h3, :scope > h4');
      if (!inner) return;

      const style = (inner.getAttribute('style') || '').toLowerCase().replace(/\s+/g, '');
      let level = 0;

      if (style.includes('background-color:#c0272d') || style.includes('background:#c0272d')) level = 1;
      else if (style.includes('background-color:#8e1b1f') || style.includes('background:#8e1b1f')) level = 2;
      else if (style.includes('background-color:#fff0f0') || style.includes('background:#fff0f0')) level = 3;
      else if (style.includes('border-bottom:2pxsolid#e8b4b5')) level = 4;

      if (level === 0) return;

      wrappers.push({
        wrapper: child,
        inner,
        level,
        text: (inner.textContent || '').replace(/\s+/g, ' ').trim()
      });
    });
    return wrappers;
  }

  function ensureUniqueId(baseId, used) {
    let id = baseId, n = 1;
    while (used.has(id)) { n++; id = baseId + '-' + n; }
    used.add(id);
    return id;
  }

  // Marcador según profundidad relativa al nivel superior del documento.
  function markerFor(rel) {
    if (rel === 0) {
      return '<span style="display:inline-block;width:8px;height:8px;background:' + COLORS.red
           + ';border-radius:2px;transform:rotate(45deg);vertical-align:middle;margin-right:10px;"></span>';
    }
    if (rel === 1) {
      return '<span style="display:inline-block;width:6px;height:6px;background:' + COLORS.redDark
           + ';border-radius:50%;vertical-align:middle;margin-right:9px;"></span>';
    }
    if (rel === 2) {
      return '<span style="display:inline-block;width:5px;height:5px;background:#b45309'
           + ';border-radius:50%;vertical-align:middle;margin-right:8px;"></span>';
    }
    return '<span style="display:inline-block;width:4px;height:4px;background:' + COLORS.muted
         + ';border-radius:50%;vertical-align:middle;margin-right:8px;"></span>';
  }

  function buildTOC() {
    const headings = findHeadingWrappers();
    if (!headings.length) {
      showToast('⚠️ No se han encontrado encabezados H1/H2/H3/H4');
      return null;
    }

    const minLevel = Math.min.apply(null, headings.map(h => h.level));

    const used = new Set();
    const entries = [];

    headings.forEach(h => {
      const baseId = 'apartado-' + slugify(h.text);
      const id = ensureUniqueId(baseId, used);
      h.wrapper.setAttribute('id', id);

      const cur = h.wrapper.getAttribute('style') || '';
      if (!/scroll-margin-top/i.test(cur)) {
        h.wrapper.setAttribute('style', cur.replace(/;?\s*$/, '') + ';scroll-margin-top:' + SCROLL_MARGIN + ';');
      }
      entries.push({ id, level: h.level, text: h.text });
    });

    const itemsHtml = entries.map(e => {
      const rel = e.level - minLevel;
      const indent = rel * 18;
      const isTop = rel === 0;
      const fontSize   = isTop ? '15px' : (rel === 1 ? '14px' : '13.5px');
      const fontWeight = isTop ? '700'  : (rel === 1 ? '600'  : '500');
      const color      = isTop ? COLORS.redDark : (rel === 1 ? COLORS.text : COLORS.muted);
      const borderCol  = isTop ? COLORS.red : COLORS.softLink;

      const linkStyle = [
        'color:' + color,
        'text-decoration:none',
        'font-weight:' + fontWeight,
        'font-family:' + FONT,
        'font-size:' + fontSize,
        'line-height:1.55',
        'border-bottom:1px dotted ' + borderCol,
        'padding-bottom:1px'
      ].join(';');

      return '<div style="display:block;margin:0 0 ' + (isTop ? '10px' : '6px') + ' 0;padding-left:' + indent + 'px;box-sizing:border-box;">'
        + markerFor(rel)
        + '<a href="#' + e.id + '" style="' + linkStyle + '">' + esc(e.text) + '</a>'
        + '</div>';
    }).join('');

    const count = entries.length;
    const countLabel = count + ' apartado' + (count === 1 ? '' : 's');

    return '<div id="' + TOC_CONTAINER_ID + '" style="max-width:800px;width:100%;margin:18px auto 28px auto;box-sizing:border-box;font-family:' + FONT + ';scroll-margin-top:' + SCROLL_MARGIN + ';">'
      +   '<details open style="border:1px solid ' + COLORS.border + ';border-left:6px solid ' + COLORS.red + ';border-radius:10px;background:#ffffff;box-shadow:0 3px 12px rgba(15,23,42,.06);overflow:hidden;">'
      +     '<summary style="cursor:pointer;display:block;padding:13px 20px 12px 20px;'
      +                'background:linear-gradient(180deg,#fff7f7 0%,#ffffff 100%);'
      +                'border-bottom:2px solid ' + COLORS.red + ';'
      +                'color:' + COLORS.redDark + ';'
      +                'font-family:' + FONT + ';'
      +                'font-size:12.5px;font-weight:800;letter-spacing:1.6px;text-transform:uppercase;'
      +                'line-height:1.3;list-style:none;">'
      +       'Contenido'
      +       '<span style="display:inline-block;margin-left:10px;padding:2px 9px;background:' + COLORS.redSoft + ';color:' + COLORS.red + ';border-radius:999px;font-size:10.5px;font-weight:800;letter-spacing:.6px;vertical-align:middle;">'
      +         countLabel
      +       '</span>'
      +     '</summary>'
      +     '<div style="padding:16px 20px 14px 20px;background:#ffffff;">' + itemsHtml + '</div>'
      +   '</details>'
      + '</div>';
  }

  function buildBackLink() {
    return '<div style="max-width:800px;width:100%;margin:22px auto 26px auto;box-sizing:border-box;text-align:right;font-family:' + FONT + ';">'
      +   '<a href="#' + TOC_CONTAINER_ID + '" style="display:inline-block;padding:8px 14px;border:1.5px solid ' + COLORS.red + ';border-radius:999px;background:#ffffff;color:' + COLORS.red + ';font-family:' + FONT + ';font-size:12.5px;font-weight:800;text-decoration:none;letter-spacing:.4px;line-height:1.2;">'
      +     BACK_LINK_TEXT
      +   '</a>'
      + '</div>';
  }

  window.insertTOCAndAnchors = function() {
    if (typeof saveBlockUndo === 'function') saveBlockUndo();

    const tocHtml = buildTOC();
    if (!tocHtml) return;

    // 1) Índice al principio del editor
    editor.insertAdjacentHTML('afterbegin', tocHtml);

    // 2) Back-links: usamos el NIVEL MÍNIMO presente.
    //    Si el documento empieza en H2 (habitual), se insertan tras cada H2.
    //    Si empieza en H1, tras cada H1. Si empieza en H3, tras cada H3.
    const headings = findHeadingWrappers();
    if (!headings.length) return;

        let minLevel = Math.min.apply(null, headings.map(h => h.level));
    let topHeadings = headings.filter(h => h.level === minLevel);

    // FIX v2.1 · Si solo hay UN encabezado en el nivel mínimo (caso típico:
    // un único H1 de título global), bajamos un nivel para que los H2 sean
    // las secciones reales y ahí se inserten los botones "Volver al índice".
    if (topHeadings.length < 2 && minLevel < 4) {
      const candidateLevel = minLevel + 1;
      const candidates = headings.filter(h => h.level === candidateLevel);
      if (candidates.length >= 2) {
        minLevel = candidateLevel;
        topHeadings = candidates;
      }
    }

   const headings = findHeadingWrappers();
if (!headings.length) return;

let minLevel = Math.min.apply(null, headings.map(h => h.level));
let topHeadings = headings.filter(h => h.level === minLevel);

// FIX: si solo hay UN encabezado en el nivel mínimo, casi siempre es el
// título global del documento (H1 único al principio). En ese caso, los
// apartados reales están un nivel por debajo y es ahí donde deben ir los
// botones "Volver al índice".
if (topHeadings.length < 2 && minLevel < 4) {
  const candidateLevel = minLevel + 1;
  const candidates = headings.filter(h => h.level === candidateLevel);
  if (candidates.length >= 2) {
    minLevel = candidateLevel;
    topHeadings = candidates;
  }
}
     topHeadings.forEach((h, idx) => {
      const nextH = topHeadings[idx + 1];
      const block = document.createElement('div');
      block.innerHTML = buildBackLink();
      const link = block.firstElementChild;
      if (!link) return;

      if (nextH) {
        nextH.wrapper.parentNode.insertBefore(link, nextH.wrapper);
      } else {
        editor.appendChild(link);
      }
    });

    if (typeof normalizeEditorVisualGrid === 'function') normalizeEditorVisualGrid(editor);
    if (typeof syncPreviewExportClasses === 'function') syncPreviewExportClasses();
    if (typeof refreshOutput === 'function') refreshOutput();
    editor.dispatchEvent(new Event('input', { bubbles: true }));
    showToast('✅ Índice y anclas insertados · ' + topHeadings.length + ' secciones con "Volver al índice"');
  };

  function injectButton() {
    const toolbar = document.querySelector('.tools-interact') || document.querySelector('.toolbar');
    if (!toolbar || document.getElementById('btn-toc')) return;
    const btn = document.createElement('button');
    btn.id = 'btn-toc';
    btn.type = 'button';
    btn.className = 'btn-el be-insignia';
    btn.style.background = '#8E1B1F';
    btn.textContent = '📑 Índice + anclas';
    btn.title = 'Genera un índice jerárquico con enlaces internos y botones "Volver al índice"';
    btn.addEventListener('mousedown', function() {
      if (typeof captureEditorCursor === 'function') captureEditorCursor();
    }, true);
    btn.addEventListener('click', function() {
      if (typeof saveBlockUndo === 'function') saveBlockUndo();
      window.insertTOCAndAnchors();
    });
    toolbar.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectButton);
  } else {
    injectButton();
  }
})();
