/* ============================================================
   GENERADOR DE ÍNDICE Y NAVEGACIÓN INTERNA · CBCM · v1.0
   Añade:
   - Botón "📑 Insertar índice" en el toolbar.
   - Detección automática de encabezados H2/H3/H4.
   - IDs únicos + scroll-margin-top en el div exterior.
   - Índice jerárquico dentro de <details open>.
   - Botones "↑ Volver al índice" al final de cada sección.
   Compatible con la exportación actual (los id/href sobreviven).
   ============================================================ */
(function(){
  'use strict';

  const SCROLL_MARGIN = '90px';
  const TOC_CONTAINER_ID = 'indice-tema';
  const BACK_LINK_TEXT = '↑ Volver al índice';

  // ── Utilidades ─────────────────────────────────────────────
  function slugify(text) {
    return String(text || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')  // quita tildes
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 60) || 'seccion';
  }

  function getHeadingLevel(el) {
    if (!el || el.nodeType !== 1) return 0;
    const tag = el.tagName.toLowerCase();
    const m = tag.match(/^h([2-4])$/);
    return m ? parseInt(m[1], 10) : 0;
  }

  // Detecta encabezados del editor: div exterior + div/h* interior con estilo conocido
  function findHeadingWrappers() {
    const wrappers = [];
    Array.from(editor.children).forEach(child => {
      if (!child || child.nodeType !== 1) return;

      // Caso A: bloque clásico → <div data-editor-block="text"> > <div style="...EX.hN...">
      // Caso B: moodle-seccion-block → <div class="moodle-seccion-block"> > <div style="...EX.hN...">
      let inner = child.querySelector(':scope > div, :scope > h1, :scope > h2, :scope > h3, :scope > h4');
      if (!inner) return;

      // El encabezado real es el que tiene el estilo institucional
      const style = (inner.getAttribute('style') || '').toLowerCase().replace(/\s+/g, '');
      let level = 0;
      if (style.includes('background-color:#c0272d') || style.includes('background:#c0272d')) level = 2;
      else if (style.includes('background-color:#8e1b1f') || style.includes('background:#8e1b1f')) level = 3;
      else if (style.includes('background-color:#fff0f0') || style.includes('background:#fff0f0')) level = 4;
      else if (style.includes('border-bottom:2pxsolid#e8b4b5')) level = 4;

      if (level === 0) return;

      wrappers.push({
        wrapper: child,
        inner: inner,
        level: level,
        text: (inner.textContent || '').replace(/\s+/g, ' ').trim()
      });
    });
    return wrappers;
  }

  function ensureUniqueId(baseId, used) {
    let id = baseId;
    let n = 1;
    while (used.has(id)) { n++; id = baseId + '-' + n; }
    used.add(id);
    return id;
  }

  // ── Generación principal ───────────────────────────────────
  function buildTOC() {
    const headings = findHeadingWrappers();
    if (!headings.length) {
      showToast('⚠️ No se han encontrado encabezados H2/H3/H4');
      return null;
    }

    const used = new Set();
    const entries = [];

    // 1) Asignar IDs a cada wrapper + scroll-margin-top
    headings.forEach(h => {
      const baseId = 'apartado-' + slugify(h.text);
      const id = ensureUniqueId(baseId, used);
      h.wrapper.setAttribute('id', id);
      // Preservar el style existente y añadir scroll-margin-top
      const currentStyle = h.wrapper.getAttribute('style') || '';
      if (!/scroll-margin-top/i.test(currentStyle)) {
        h.wrapper.setAttribute('style',
          currentStyle.replace(/;?\s*$/, '') + ';scroll-margin-top:' + SCROLL_MARGIN + ';'
        );
      }
      entries.push({ id: id, level: h.level, text: h.text });
    });

    // 2) Construir el HTML del índice
    const itemsHtml = entries.map(e => {
      const indent = (e.level - 2) * 18; // h2→0, h3→18, h4→36
      return '<p style="margin:0 0 6px 0;padding-left:' + indent + 'px;color:#2d2d2d;font-size:15px;line-height:1.7;">'
        + '<a href="#' + e.id + '" style="color:#2d2d2d;text-decoration:none;border-bottom:1px dotted #d7a4a6;font-weight:600;">'
        + esc(e.text)
        + '</a></p>';
    }).join('');

    return '<div id="' + TOC_CONTAINER_ID + '" style="max-width:800px;width:100%;margin:16px auto 24px auto;box-sizing:border-box;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;scroll-margin-top:' + SCROLL_MARGIN + ';">'
      + '<details open style="border:1px solid #e5e7eb;border-radius:12px;background:#ffffff;box-shadow:0 3px 10px rgba(45,45,45,0.07);overflow:hidden;">'
      + '<summary style="cursor:pointer;padding:14px 18px;background:#f7f7f7;color:#8E1B1F;font-size:16px;line-height:1.4;font-weight:800;">Contenido</summary>'
      + '<div style="padding:14px 18px 16px 18px;">' + itemsHtml + '</div>'
      + '</details>'
      + '</div>';
  }

  function buildBackLink() {
    return '<div style="max-width:800px;width:100%;margin:20px auto 26px auto;box-sizing:border-box;text-align:right;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">'
      + '<a href="#' + TOC_CONTAINER_ID + '" style="display:inline-block;padding:8px 13px;border:1px solid #d7a4a6;border-radius:8px;background:#fffafa;color:#8E1B1F;font-size:14px;line-height:1.3;font-weight:800;text-decoration:none;">'
      + BACK_LINK_TEXT
      + '</a></div>';
  }

  // ── API pública ────────────────────────────────────────────
  window.insertTOCAndAnchors = function() {
    saveBlockUndo();
    const tocHtml = buildTOC();
    if (!tocHtml) return;

    // Insertar el índice al principio del editor
    editor.insertAdjacentHTML('afterbegin', tocHtml);

    // Insertar botones "Volver al índice" al final de cada sección
    // (antes de cada encabezado H2 siguiente, y al final del documento)
    const headings = findHeadingWrappers().filter(h => h.level === 2);
    headings.forEach((h, idx) => {
      const nextH = headings[idx + 1];
      const block = document.createElement('div');
      block.innerHTML = buildBackLink();
      const link = block.firstChild;
      if (nextH) {
        nextH.wrapper.parentNode.insertBefore(link, nextH.wrapper);
      } else {
        editor.appendChild(link);
      }
    });

    // Refrescar
    if (typeof normalizeEditorVisualGrid === 'function') normalizeEditorVisualGrid(editor);
    if (typeof syncPreviewExportClasses === 'function') syncPreviewExportClasses();
    if (typeof refreshOutput === 'function') refreshOutput();
    editor.dispatchEvent(new Event('input', { bubbles: true }));
    showToast('✅ Índice y anclas insertados (' + headings.length + ' secciones)');
  };

  // ── Botón en el toolbar ────────────────────────────────────
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
    btn.addEventListener('mousedown', function(e) {
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