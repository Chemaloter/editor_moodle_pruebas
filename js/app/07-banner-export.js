//  BANNER INSTITUCIONAL + ESCUDO
// ══════════════════════════════════════════════════════════════
const ESCUDO_B64 = 'data:image/jpeg;base64,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';

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
html = html.replace(/<br\s*\/?>/gi, '<br>');
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
  const includeBanner = document.getElementById('toggle-banner')?.checked !== false;
  const areaSel = document.getElementById('area-select');

  // El módulo solo es obligatorio cuando se exporta el documento completo,
  // porque únicamente entonces se genera la cabecera y el pie institucional.
  if (includeBanner && (!areaSel || !areaSel.value)) {
    const warnModal = document.getElementById('moduleWarnModal');
    if (warnModal) warnModal.classList.add('open');
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
