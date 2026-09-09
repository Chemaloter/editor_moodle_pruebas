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
editor.addEventListener('keyup', captureEditorCursor, true);
editor.addEventListener('mouseup', captureEditorCursor, true);
editor.addEventListener('input', captureEditorCursor, true);

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

const UNDO_OBSERVER_OPTIONS = { childList: true, subtree: true, characterData: true };
const undoObserver = new MutationObserver(() => {
  if (undoLocked) return;
  scheduleSnapshot();
});

function applyHistoryState(state) {
  if (!state) return;
  undoLocked = true;
  undoObserver.disconnect();
  editor.innerHTML = state.html;
  savedRange = null;
  undoObserver.observe(editor, UNDO_OBSERVER_OPTIONS);
  undoLocked = false;
  editor.focus();
  setTimeout(() => {
    restoreCursorPath(state.cursor);
    captureEditorCursor();
  }, 0);
  refreshOutput();
}

function doUndo() {
  clearTimeout(undoTimer);
  captureEditorCursor();
  const html = editor.innerHTML;
  if (undoStack.length === 0 || undoStack[undoStack.length - 1].html !== html) {
    undoStack.push({ html, cursor: lastCursor });
    if (undoStack.length > MAX_UNDO) undoStack.shift();
  } else {
    undoStack[undoStack.length - 1].cursor = lastCursor;
  }
  if (undoStack.length < 2) { editor.focus(); return; }
  const current = undoStack.pop();
  redoStack.push(current);
  const prev = undoStack[undoStack.length - 1];
  applyHistoryState(prev);
}

function doRedo() {
  clearTimeout(undoTimer);
  if (redoStack.length === 0) { editor.focus(); return; }
  captureEditorCursor();
  const current = { html: editor.innerHTML, cursor: lastCursor };
  if (undoStack.length === 0 || undoStack[undoStack.length - 1].html !== current.html) {
    undoStack.push(current);
    if (undoStack.length > MAX_UNDO) undoStack.shift();
  } else {
    undoStack[undoStack.length - 1].cursor = current.cursor;
  }
  const next = redoStack.pop();
  if (undoStack.length === 0 || undoStack[undoStack.length - 1].html !== next.html) {
    undoStack.push(next);
    if (undoStack.length > MAX_UNDO) undoStack.shift();
  } else {
    undoStack[undoStack.length - 1].cursor = next.cursor;
  }
  applyHistoryState(next);
}

undoObserver.observe(editor, UNDO_OBSERVER_OPTIONS);
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

