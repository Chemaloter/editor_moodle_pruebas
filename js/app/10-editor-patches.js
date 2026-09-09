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
  const __buildFinalHTML_v68 = (typeof buildFinalHTML_PATCH_v631 === 'function')
  ? buildFinalHTML_PATCH_v631
  : buildFinalHTML;
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



/* ============================================================
   PARCHE v7.5 · NORMALIZADOR DEFENSIVO DE IMÁGENES IMPORTADAS
   Si Moodle devuelve tarjetas de imagen anidadas, las aplana en
   una única estructura canónica antes de redimensionar o exportar.
   ============================================================ */
(function(){
  if (!window.editor) return;
  function cssText(el){ return String((el && el.getAttribute && el.getAttribute('style')) || '').toLowerCase().replace(/\s+/g,''); }
  function compact(t){ return String(t || '').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim().toLowerCase(); }
  function isEscudo(img){ const alt=compact(img.getAttribute('alt')||''); return alt.includes('escudo') || alt.includes('bomberos'); }
  function looksLikeImagePanel(el){
    if (!el || el.nodeType !== 1 || !el.querySelector || !el.querySelector('img')) return false;
    const s=cssText(el); const tag=el.tagName;
    return (tag==='DIV' || tag==='P' || tag==='FIGURE') && (
      el.classList.contains('moodle-media-block') || s.includes('background:#f0f0f0') || s.includes('background-color:#f0f0f0') || s.includes('background:rgb(240,240,240)') ||
      s.includes('padding:16px') || s.includes('display:inline-block') || s.includes('border:1pxsolid#d1d1d1') || s.includes('border:1pxsolidrgb(209,209,209)') ||
      s.includes('box-shadow') || s.includes('max-width:1000px') || s.includes('text-align:center') || s.includes('margin:20px') || s.includes('margin:24px')
    );
  }
  function hasMeaningfulTextOutsideImages(el){
    const clone=el.cloneNode(true);
    clone.querySelectorAll('img,iframe,video,audio,table').forEach(n=>n.remove());
    clone.querySelectorAll('div,span,p').forEach(n=>{ const st=cssText(n); if (st.includes('border-top:1pxsolid#d1d1d1')) n.remove(); });
    return compact(clone.textContent).length > 120;
  }
  function findVisualRoot(img){
    let node=img.parentElement, candidate=null;
    while(node && node!==editor && node!==document.body){
      if (looksLikeImagePanel(node) && !hasMeaningfulTextOutsideImages(node)) { candidate=node; node=node.parentElement; continue; }
      break;
    }
    return candidate;
  }
  function readWidth(img, root){
    let node=img.parentElement;
    while(node && node!==root.parentElement){
      const raw=String(node.getAttribute && node.getAttribute('style') || '');
      const m=raw.match(/width\s*:\s*(100%|75%|50%|auto|[0-9.]+%)/i);
      if (m) return m[1];
      node=node.parentElement;
    }
    return '100%';
  }
  function styleImg(img, width){
    img.style.maxWidth='100%'; img.style.height='auto'; img.style.borderRadius=img.style.borderRadius || '6px';
    img.style.display='block'; img.style.marginLeft='auto'; img.style.marginRight='auto'; img.style.boxSizing='border-box';
    img.style.width = width === 'auto' ? 'auto' : '100%';
  }
  function build(img, width){
    const clean=img.cloneNode(true); styleImg(clean,width);
    const block=document.createElement('div'); block.className='moodle-media-block';
    block.setAttribute('style','text-align:center;margin:20px auto;width:100%;max-width:' + (window.EXPORT_MEDIA_MAX || '1000px') + ';box-sizing:border-box;border:none;background:transparent;box-shadow:none;border-radius:0;padding:0;overflow:visible;');
    const frame=document.createElement('div'); frame.setAttribute('style','display:inline-block;width:' + width + ';max-width:100%;background:#fff;border:1px solid #d1d1d1;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.12);font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;box-sizing:border-box;');
    const panel=document.createElement('div'); panel.setAttribute('style','text-align:center;background:#f0f0f0;padding:16px;box-sizing:border-box;');
    panel.appendChild(clean); frame.appendChild(panel); block.appendChild(frame); return block;
  }
  window.normalizeImportedImageCardsInEditor = function(root){
    root = root || editor;
    Array.from(root.querySelectorAll('img')).forEach(img=>{
      if (!root.contains(img) || isEscudo(img)) return;
      const visualRoot=findVisualRoot(img);
      if (!visualRoot) return;
      // Si ya es canónico y no está dentro de otro panel visual, no tocar.
      if (visualRoot.classList && visualRoot.classList.contains('moodle-media-block') && !looksLikeImagePanel(visualRoot.parentElement)) return;
      const width=readWidth(img, visualRoot);
      visualRoot.replaceWith(build(img,width));
    });
  };
  editor.addEventListener('click', function(){ window.normalizeImportedImageCardsInEditor(editor); }, true);
  editor.addEventListener('input', function(){ window.normalizeImportedImageCardsInEditor(editor); }, true);
})();


/* ============================================================
   PARCHE v7.6 · PEGADO NEUTRO DENTRO DE BLOQUES DEL EDITOR
   Objetivo:
   - Si se pega texto/HTML dentro de un bloque contenteditable del editor
     (H1-H6, objetivo, aviso, info, consejo, paso, cita, extra,
     práctica, definición, pies de recurso, etc.), se pega como texto
     limpio y hereda SIEMPRE el estilo del bloque contenedor.
   - También limpia estilos inline residuales que el navegador pueda crear
     al escribir/pegar dentro de esos bloques.
   ============================================================ */
(function(){
  if (!window.editor) return;

  const BLOCK_INLINE_SELECTOR = [
    'span','font','strong','b','em','i','u','a','code','mark','small','big',
    'sub','sup','div','p','section','article','header','footer','h1','h2','h3','h4','h5','h6',
    'ul','ol','li'
  ].join(',');

  function closestElement(node) {
    if (!node) return null;
    return node.nodeType === 1 ? node : node.parentElement;
  }

  function getEditableHost(node) {
    const el = closestElement(node);
    if (!el || !editor.contains(el)) return null;
    const host = el.closest('[contenteditable="true"]');
    if (!host || host === editor || !editor.contains(host)) return null;
    return host;
  }

  function isEditorManagedTextBlock(host) {
    if (!host || host === editor || !editor.contains(host)) return false;
    // Tablas y listas mantienen comportamiento propio: nuevos <li>, celdas, etc.
    if (host.closest('td,th,li')) return false;
    if (host.closest('.sequence-block') && /^(H4|P)$/.test(host.tagName || '')) return true;
    return host.getAttribute('contenteditable') === 'true';
  }

  function htmlToPlainText(html) {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    tmp.querySelectorAll('script,style,link,meta,title,object,embed,iframe,img,table').forEach(n => n.remove());
    tmp.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
    tmp.querySelectorAll('p,div,section,article,header,footer,h1,h2,h3,h4,h5,h6,li').forEach(el => {
      if (!el.nextSibling || el.nextSibling.nodeType !== 3 || !/^\n/.test(el.nextSibling.textContent || '')) {
        el.appendChild(document.createTextNode('\n'));
      }
    });
    return (tmp.textContent || '')
      .replace(/\u00a0/g, ' ')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  function textFromClipboard(e) {
    const cd = e.clipboardData || window.clipboardData;
    if (!cd) return '';
    const plain = cd.getData('text/plain');
    if (plain && plain.trim()) return plain.replace(/\u00a0/g, ' ');
    const html = cd.getData('text/html');
    return htmlToPlainText(html);
  }

  function insertPlainTextAtSelection(text) {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return false;
    const range = sel.getRangeAt(0);
    range.deleteContents();
    const frag = document.createDocumentFragment();
    const normalized = String(text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = normalized.split('\n');
    lines.forEach((line, idx) => {
      if (idx > 0) frag.appendChild(document.createElement('br'));
      if (line) frag.appendChild(document.createTextNode(line));
    });
    const marker = document.createTextNode('');
    frag.appendChild(marker);
    range.insertNode(frag);
    const r = document.createRange();
    r.setStartAfter(marker);
    r.collapse(true);
    sel.removeAllRanges();
    sel.addRange(r);
    marker.remove();
    return true;
  }

  function caretOffsetWithin(root) {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return null;
    const range = sel.getRangeAt(0);
    if (!root.contains(range.startContainer)) return null;
    const pre = range.cloneRange();
    pre.selectNodeContents(root);
    pre.setEnd(range.startContainer, range.startOffset);
    return pre.toString().length;
  }

  function restoreCaretFromOffset(root, offset) {
    if (offset == null) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    let current = 0;
    let node;
    while ((node = walker.nextNode())) {
      const len = node.textContent.length;
      if (current + len >= offset) {
        const r = document.createRange();
        r.setStart(node, Math.max(0, Math.min(len, offset - current)));
        r.collapse(true);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
        return;
      }
      current += len;
    }
    const r = document.createRange();
    r.selectNodeContents(root);
    r.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(r);
  }

  function plainFragmentFromNode(node, addLeadingBreak) {
    const frag = document.createDocumentFragment();
    if (addLeadingBreak) frag.appendChild(document.createElement('br'));
    Array.from(node.childNodes).forEach(child => {
      if (child.nodeType === 3) {
        frag.appendChild(document.createTextNode(child.textContent || ''));
      } else if (child.nodeType === 1) {
        const tag = child.tagName.toLowerCase();
        if (tag === 'br') {
          frag.appendChild(document.createElement('br'));
        } else if (child.matches('img,iframe,video,audio,table')) {
          // No se permiten recursos dentro de bloques de texto: se descartan.
        } else {
          frag.appendChild(plainFragmentFromNode(child, false));
          if (/^(div|p|section|article|header|footer|h1|h2|h3|h4|h5|h6|li)$/i.test(tag)) {
            frag.appendChild(document.createElement('br'));
          }
        }
      }
    });
    return frag;
  }

  function normalizeManagedBlockContent(host) {
    if (!isEditorManagedTextBlock(host)) return;
    if (!host.querySelector(BLOCK_INLINE_SELECTOR + ', img,iframe,video,audio,table')) return;
    const offset = caretOffsetWithin(host);
    const frag = document.createDocumentFragment();
    Array.from(host.childNodes).forEach((child, idx) => {
      if (child.nodeType === 3) {
        frag.appendChild(document.createTextNode(child.textContent || ''));
      } else if (child.nodeType === 1) {
        const tag = child.tagName.toLowerCase();
        if (tag === 'br') frag.appendChild(document.createElement('br'));
        else frag.appendChild(plainFragmentFromNode(child, idx > 0 && /^(div|p|h1|h2|h3|h4|h5|h6|li)$/i.test(tag)));
      }
    });
    host.replaceChildren(frag);
    // Evita acumulación de <br> al final tras convertir bloques pegados.
    while (host.lastChild && host.lastChild.nodeType === 1 && host.lastChild.tagName === 'BR' &&
           host.lastChild.previousSibling && host.lastChild.previousSibling.nodeType === 1 && host.lastChild.previousSibling.tagName === 'BR') {
      host.lastChild.remove();
    }
    restoreCaretFromOffset(host, offset);
  }

  editor.addEventListener('paste', function(e) {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    const host = getEditableHost(sel.getRangeAt(0).startContainer);
    if (!isEditorManagedTextBlock(host)) return;

    const text = textFromClipboard(e);
    if (!text) return;

    e.preventDefault();
    e.stopImmediatePropagation();
    if (typeof saveBlockUndo === 'function') saveBlockUndo();
    insertPlainTextAtSelection(text);
    normalizeManagedBlockContent(host);
    if (typeof captureEditorCursor === 'function') captureEditorCursor();
    editor.dispatchEvent(new Event('input', { bubbles:true }));
    if (typeof refreshOutput === 'function') refreshOutput();
  }, true);

  editor.addEventListener('input', function(e) {
    const host = getEditableHost(e.target);
    if (!isEditorManagedTextBlock(host)) return;
    normalizeManagedBlockContent(host);
  }, true);
})();


/* ============================================================
   PARCHE v7.7 · RETÍCULA VISUAL UNIVERSAL DEL EDITOR
   Garantiza que absolutamente todos los elementos insertables del editor
   respeten el mismo carril visual:
   - Texto, encabezados, listas, separadores, definiciones y bloques didácticos: 800px.
   - Imágenes, tablas, vídeos, PDF, presentaciones y audio: 1000px.
   ============================================================ */
(function(){
  if (!window.editor) return;
  const CONTENT_MAX = typeof EXPORT_CONTENT_MAX !== 'undefined' ? EXPORT_CONTENT_MAX : '800px';
  const MEDIA_MAX = typeof EXPORT_MEDIA_MAX !== 'undefined' ? EXPORT_MEDIA_MAX : '1000px';
  let locked = false;

  function norm(el){ return String((el && el.getAttribute && el.getAttribute('style')) || '').toLowerCase().replace(/\s+/g,''); }
  function hasMedia(el){ return !!(el && el.querySelector && el.querySelector('img,iframe,video,audio,table')); }
  function isPureImageBlock(el){ return el && el.classList && el.classList.contains('moodle-media-block') && el.querySelector('img') && !el.querySelector('iframe,video,audio,table'); }
  function isHeadingInner(el){
    const s = norm(el);
    return s.includes('background-color:#c0272d') || s.includes('background:#c0272d') ||
           s.includes('background-color:#8e1b1f') || s.includes('background:#8e1b1f') ||
           s.includes('background-color:#fff0f0') || s.includes('background:#fff0f0') ||
           s.includes('border-bottom:2pxsolid#e8b4b5');
  }
  function isSpecialText(el){
    const s = norm(el);
    return ['#2e7d32','#7b1fa2','#f59e0b','#1d4ed8','#0d9488','#4338ca','#0f766e','#94a3b8','#6b7280','#eeeeee'].some(m => s.includes(m));
  }
  function setBox(el, max, my){
    if (!el || !el.style || el.closest('td,th')) return;
    el.style.width = '100%';
    el.style.maxWidth = max;
    el.style.marginLeft = 'auto';
    el.style.marginRight = 'auto';
    if (my) { el.style.marginTop = my; el.style.marginBottom = my; }
    el.style.boxSizing = 'border-box';
  }
  function setTextBox(el, my){
    el.classList.remove('moodle-media-block-preview');
    el.classList.add('moodle-content-block');
    setBox(el, CONTENT_MAX, my || '14px');
  }
  function setMediaBox(el, my){
    el.classList.remove('moodle-content-block');
    if (!isPureImageBlock(el)) el.classList.add('moodle-media-block-preview');
    setBox(el, MEDIA_MAX, my || '24px');
  }
  function isHeadingWrapper(el){ return !!(el && el.tagName === 'DIV' && el.firstElementChild && isHeadingInner(el.firstElementChild)); }
  function isTextualWrapper(el){
    if (!el || el.nodeType !== 1 || el.closest('td,th')) return false;
    const tag = el.tagName.toLowerCase();
    if (tag === 'p' || tag === 'ul' || tag === 'ol' || tag === 'hr') return true;
    if (isHeadingWrapper(el) || isSpecialText(el) || el.classList.contains('sequence-block')) return true;
    if (tag === 'div' && !hasMedia(el)) {
      const first = el.firstElementChild;
      if (first && (isHeadingInner(first) || isSpecialText(first))) return true;
      const s = norm(el);
      return s.includes('max-width:800px') || s.includes('margin:') || s.includes('border-left') || s.includes('background-color');
    }
    return false;
  }

  window.normalizeEditorVisualGrid = function(root){
    if (locked) return;
    locked = true;
    try {
      root = root || editor;
      Array.from(root.children).forEach(el => {
        if (!el || el.nodeType !== 1) return;
        el.classList.remove('moodle-content-block','moodle-media-block-preview');
        const tag = el.tagName.toLowerCase();
        const media = hasMedia(el) || tag === 'table' || el.classList.contains('moodle-media-block');
        if (media) {
          setMediaBox(el, '24px');
          if (isPureImageBlock(el)) {
            el.style.textAlign = 'center';
            el.style.border = 'none'; el.style.background = 'transparent'; el.style.backgroundColor = 'transparent';
            el.style.boxShadow = 'none'; el.style.borderRadius = '0'; el.style.padding = '0'; el.style.overflow = 'visible';
          }
          if ((tag === 'div' || tag === 'p') && el.querySelector('table') && !el.style.overflowX) el.style.overflowX = 'auto';
          return;
        }
        if (isTextualWrapper(el)) {
          setTextBox(el, tag === 'hr' ? '20px' : (tag === 'ul' || tag === 'ol' ? '18px' : '14px'));
          return;
        }
        if (tag === 'div' || tag === 'p' || tag === 'section' || tag === 'article' || tag === 'blockquote') setTextBox(el, '14px');
      });
    } finally { locked = false; }
  };

  const oldInsert = window.insertHTMLAtCursor || (typeof insertHTMLAtCursor === 'function' ? insertHTMLAtCursor : null);
  if (oldInsert && !oldInsert.__gridWrapped) {
    const wrapped = function(html){
      const result = oldInsert.apply(this, arguments);
      setTimeout(() => window.normalizeEditorVisualGrid(editor), 0);
      return result;
    };
    wrapped.__gridWrapped = true;
    window.insertHTMLAtCursor = wrapped;
    try { insertHTMLAtCursor = wrapped; } catch(e) {}
  }

  editor.addEventListener('input', () => window.normalizeEditorVisualGrid(editor), true);
  setTimeout(() => window.normalizeEditorVisualGrid(editor), 0);
})();

