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

