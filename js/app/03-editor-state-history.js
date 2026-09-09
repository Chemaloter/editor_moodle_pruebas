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

