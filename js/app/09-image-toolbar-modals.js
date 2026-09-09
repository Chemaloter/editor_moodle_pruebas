//  INPUT FILE
// ══════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════
//  IMAGE SIZE TOOLBAR · v7.3
//  Corrige imágenes recuperadas desde Moodle:
//  - el ancho se aplica al marco interno redimensionable;
//  - si Moodle devuelve una imagen dentro de un panel gris grande, el panel
//    se mete dentro del marco, en vez de crear un marco dentro del panel;
//  - el contenedor exterior .moodle-media-block queda neutro a 1000px.
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


// PANEL BLOQUES VISIBLES v6.4: reconfiguración visual del panel izquierdo sin cambios funcionales.

// PANEL IZQUIERDO AMIGABLE v6.5: mejora visual de botones y legibilidad sin cambios funcionales.
// PANEL IZQUIERDO SCROLL GENERAL v6.6: scroll vertical único para todo el panel izquierdo; sin cambios funcionales.

