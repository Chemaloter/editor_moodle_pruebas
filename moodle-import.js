/*
 * moodle-import.js · Importador de HTML generado por este editor y recuperado desde Moodle
 * --------------------------------------------------------------------------------------
 * Flujo previsto:
 *   Editor -> Moodle -> copiar HTML desde Moodle -> Editor -> editar -> copiar -> Moodle
 *
 * Este módulo NO intenta importar HTML arbitrario. Está optimizado para HTML creado antes
 * con este mismo editor, pegado en Moodle y posteriormente recuperado desde el modo HTML.
 */
(function () {
  'use strict';

  const IMPORT_MODAL_ID = 'moodleImportModal';
  const IMPORT_TEXTAREA_ID = 'moodle-html-input';
  const IMPORT_REPLACE_ID = 'moodle-html-replace';
  const IMPORT_BUTTON_ID = 'btn-import-moodle-html';

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function getEditor() {
    return document.getElementById('editor');
  }

  function notify(message, duration) {
    if (typeof window.showToast === 'function') {
      window.showToast(message, duration);
    } else {
      console.log(message);
    }
  }

  function callIfExists(name, ...args) {
    if (typeof window[name] === 'function') {
      return window[name](...args);
    }
    return undefined;
  }

  function refreshEditorState(editor) {
    editor.dispatchEvent(new Event('input', { bubbles: true }));
    callIfExists('syncPreviewExportClasses');
    callIfExists('refreshOutput');
  }

  function createImportButton() {
    if (document.getElementById(IMPORT_BUTTON_ID)) return;

    const uploadZone = document.querySelector('.upload-zone');
    if (!uploadZone) return;

    const btn = document.createElement('button');
    btn.id = IMPORT_BUTTON_ID;
    btn.type = 'button';
    btn.className = 'btn-upload';
    btn.style.border = 'none';
    btn.style.background = '#374151';
    btn.textContent = '📥 Añadir HTML Moodle';
    btn.addEventListener('click', openMoodleHTMLModal);

    uploadZone.appendChild(btn);
  }

  function createImportModal() {
    if (document.getElementById(IMPORT_MODAL_ID)) return;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = IMPORT_MODAL_ID;
    modal.innerHTML = `
      <div class="modal" style="max-width:760px;width:94%;">
        <div class="modal-hdr">
          <span>📥 Añadir HTML desde Moodle</span>
          <button class="modal-close" type="button" data-moodle-import-close>✕</button>
        </div>
        <div class="modal-pad" style="gap:12px;">
          <p class="modal-hint" style="margin:0;white-space:normal;">
            Pega aquí el código HTML copiado desde el editor HTML de Moodle. Esta importación está pensada para contenido generado previamente con este editor.
          </p>

          <label class="modal-label" for="${IMPORT_TEXTAREA_ID}">Código HTML de Moodle</label>
          <textarea id="${IMPORT_TEXTAREA_ID}" class="modal-input"
            style="min-height:280px;resize:vertical;font-family:Consolas,Monaco,'Courier New',monospace;font-size:12px;line-height:1.45;text-align:left;font-weight:400;letter-spacing:0;white-space:pre;"
            placeholder="Pega aquí el HTML copiado desde Moodle..."></textarea>

          <label class="modal-check" style="align-items:flex-start;">
            <input id="${IMPORT_REPLACE_ID}" type="checkbox"
              style="width:15px;height:15px;cursor:pointer;accent-color:var(--red);margin-top:2px;">
            <span>
              Sustituir el contenido actual del editor.
              <br><small style="color:var(--muted);">Si no lo marcas, el HTML importado se añadirá al final.</small>
            </span>
          </label>

          <div class="modal-btns">
            <button class="modal-btn modal-btn-gray" type="button" data-moodle-import-close>Cancelar</button>
            <button class="modal-btn modal-btn-red" type="button" id="moodle-html-confirm">Procesar e insertar</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', function (e) {
      if (e.target.id === IMPORT_MODAL_ID || e.target.hasAttribute('data-moodle-import-close')) {
        closeMoodleHTMLModal();
      }
    });

    modal.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMoodleHTMLModal();
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') confirmMoodleHTMLImport();
    });

    const confirmBtn = document.getElementById('moodle-html-confirm');
    if (confirmBtn) confirmBtn.addEventListener('click', confirmMoodleHTMLImport);
  }

  function openMoodleHTMLModal() {
    createImportModal();
    const modal = document.getElementById(IMPORT_MODAL_ID);
    const textarea = document.getElementById(IMPORT_TEXTAREA_ID);
    if (!modal || !textarea) return;

    textarea.value = '';
    modal.classList.add('open');
    setTimeout(function () { textarea.focus(); }, 60);
  }

  function closeMoodleHTMLModal() {
    const modal = document.getElementById(IMPORT_MODAL_ID);
    if (modal) modal.classList.remove('open');
  }

  function confirmMoodleHTMLImport() {
    const textarea = document.getElementById(IMPORT_TEXTAREA_ID);
    const replaceInput = document.getElementById(IMPORT_REPLACE_ID);
    const rawHTML = textarea ? textarea.value : '';

    if (!rawHTML || !rawHTML.trim()) {
      notify('⚠️ Pega primero el HTML copiado desde Moodle');
      return;
    }

    try {
      const cleanedHTML = importEditorGeneratedMoodleHTML(rawHTML);

      if (!cleanedHTML || !cleanedHTML.trim()) {
        notify('⚠️ No se ha encontrado contenido importable');
        return;
      }

      insertImportedMoodleHTML(cleanedHTML, !!(replaceInput && replaceInput.checked));
      closeMoodleHTMLModal();
      notify('✅ HTML de Moodle importado y preparado para editar');
    } catch (err) {
      console.error(err);
      notify('❌ Error al procesar el HTML: ' + (err && err.message ? err.message : err), 5000);
    }
  }

  function importEditorGeneratedMoodleHTML(rawHTML) {
    const decodedHTML = decodeIfEscapedHTML(String(rawHTML || '').trim());
    const parser = new DOMParser();
    const doc = parser.parseFromString(decodedHTML, 'text/html');
    const root = doc.body || doc.documentElement;

    if (!root) return '';

    removeDangerousNodes(root);
    unwrapKnownMoodleContainers(root);
    removeEditorGeneratedBanners(root);
    removeEditorBlockComments(root);
    cleanImportedAttributes(root);
    normalizeImportedTables(root);
    normalizeImportedMedia(root);
    normalizeInvalidParagraphs(root);
    removeEmptyNeutralSpans(root);

    return root.innerHTML.trim();
  }

  function decodeIfEscapedHTML(html) {
    const hasEscapedTags = /&lt;\/?[a-z][\s\S]*?&gt;/i.test(html);
    const hasRealTags = /<\/?[a-z][\s\S]*?>/i.test(html);
    if (!hasEscapedTags || hasRealTags) return html;

    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
  }

  function removeDangerousNodes(root) {
    root.querySelectorAll('script,style,link,meta,title,object,embed,applet,base').forEach(function (el) {
      el.remove();
    });
  }

  function unwrapKnownMoodleContainers(root) {
    const selectors = [
      '.editor_atto_content',
      '.mce-content-body',
      '.no-overflow',
      '.text_to_html',
      '.mediaplugin',
      '.resourcecontent',
      '[data-region="content"]'
    ];

    selectors.forEach(function (selector) {
      Array.from(root.querySelectorAll(selector)).forEach(unwrapElement);
    });
  }

  function unwrapElement(el) {
    if (!el || !el.parentNode) return;
    const parent = el.parentNode;
    while (el.firstChild) parent.insertBefore(el.firstChild, el);
    el.remove();
  }

  function removeEditorGeneratedBanners(root) {
    Array.from(root.querySelectorAll('div')).forEach(function (el) {
      if (!el.parentNode) return;
      const text = compactText(el.textContent || '');
      const style = String(el.getAttribute('style') || '').toLowerCase().replace(/\s+/g, '');

      const isBanner =
        style.includes('border:2pxsolid#c0272d') &&
        text.includes('cuerpo de bomberos') &&
        text.includes('comunidad de madrid') &&
        text.includes('área de formación');

      if (isBanner) el.remove();
    });
  }

  function removeEditorBlockComments(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_COMMENT);
    const comments = [];
    let node;
    while ((node = walker.nextNode())) comments.push(node);
    comments.forEach(function (comment) { comment.remove(); });
  }

  function cleanImportedAttributes(root) {
    root.querySelectorAll('*').forEach(function (el) {
      Array.from(el.attributes).forEach(function (attr) {
        const name = attr.name.toLowerCase();
        const value = String(attr.value || '').trim();

        if (name.startsWith('on')) {
          el.removeAttribute(attr.name);
          return;
        }

        if (name.startsWith('data-')) {
          el.removeAttribute(attr.name);
          return;
        }

        if (name === 'contenteditable' || name === 'spellcheck' || name === 'draggable' || name === 'bis_skin_checked') {
          el.removeAttribute(attr.name);
          return;
        }

        if ((name === 'href' || name === 'src') && /^javascript:/i.test(value)) {
          el.removeAttribute(attr.name);
          return;
        }

        if (name === 'id' && /^(yui_|mce_|atto_|module-|section-|random|id_)/i.test(value)) {
          el.removeAttribute(attr.name);
        }
      });

      if (el.hasAttribute('class')) {
        const keptClasses = String(el.getAttribute('class') || '')
          .split(/\s+/)
          .filter(function (cls) {
            return cls === 'moodle-media-block' || cls === 'sequence-block';
          });

        if (keptClasses.length) el.setAttribute('class', keptClasses.join(' '));
        else el.removeAttribute('class');
      }

      if (el.hasAttribute('style') && !String(el.getAttribute('style') || '').trim()) {
        el.removeAttribute('style');
      }
    });
  }

  function normalizeImportedTables(root) {
    root.querySelectorAll('table').forEach(function (table) {
      if (!table.closest('.moodle-media-block')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'moodle-media-block';
        wrapper.setAttribute('style', 'overflow-x:auto;margin:12px auto;width:100%;max-width:1000px;box-sizing:border-box;');
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }

      table.style.maxWidth = '100%';
      table.style.boxSizing = 'border-box';

      table.querySelectorAll('td,th').forEach(function (cell) {
        cell.setAttribute('contenteditable', 'true');
        cell.style.outline = 'none';
        cell.style.cursor = 'text';
      });
    });
  }

  function normalizeImportedMedia(root) {
    function cssText(el) {
      return String((el && el.getAttribute && el.getAttribute('style')) || '')
        .toLowerCase()
        .replace(/\s+/g, '');
    }

    function isPanel(el) {
      if (!el || el.nodeType !== 1 || el.tagName !== 'DIV') return false;
      const s = cssText(el);
      return el.querySelector('img') && (
        s.includes('background:#f0f0f0') ||
        s.includes('background-color:#f0f0f0') ||
        s.includes('padding:16px') ||
        s.includes('text-align:center')
      );
    }

    function isCard(el) {
      if (!el || el.nodeType !== 1 || el.tagName !== 'DIV') return false;
      const s = cssText(el);
      return el.querySelector('img') &&
        s.includes('display:inline-block') &&
        (s.includes('border:1pxsolid#d1d1d1') || s.includes('box-shadow'));
    }

    function isOuter(el) {
      if (!el || el.nodeType !== 1 || el.tagName !== 'DIV') return false;
      const s = cssText(el);
      return el.querySelector('img') &&
        (s.includes('max-width:1000px') || s.includes('margin:24pxauto') || s.includes('text-align:center'));
    }

    function readWidth(el) {
      const raw = String((el && el.getAttribute && el.getAttribute('style')) || '');
      const m = raw.match(/width\s*:\s*(100%|75%|50%|auto|[0-9.]+%)/i);
      return m ? m[1] : '100%';
    }

    function styleImportedImage(img, widthMode) {
      if (!img.getAttribute('alt')) img.setAttribute('alt', 'Imagen');
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      img.style.borderRadius = img.style.borderRadius || '6px';
      img.style.display = 'block';
      img.style.marginLeft = 'auto';
      img.style.marginRight = 'auto';
      img.style.boxSizing = 'border-box';
      img.style.width = widthMode === 'auto' ? 'auto' : '100%';
    }

    function buildCanonicalImageBlock(img, width, captionNodes) {
      const cleanImg = img.cloneNode(true);
      styleImportedImage(cleanImg, width === 'auto' ? 'auto' : 'scaled');

      const block = document.createElement('div');
      block.className = 'moodle-media-block';
      block.setAttribute('style', 'text-align:center;margin:20px auto;width:100%;max-width:1000px;box-sizing:border-box;border:none;background:transparent;box-shadow:none;border-radius:0;padding:0;overflow:visible;');

      const frame = document.createElement('div');
      frame.setAttribute('style', 'display:inline-block;width:' + width + ';max-width:100%;background:#fff;border:1px solid #d1d1d1;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.12);font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;box-sizing:border-box;');

      const panel = document.createElement('div');
      panel.setAttribute('style', 'text-align:center;background:#f0f0f0;padding:16px;box-sizing:border-box;');

      panel.appendChild(cleanImg);
      frame.appendChild(panel);

      (captionNodes || []).forEach(function (n) {
        const clone = n.cloneNode(true);
        clone.querySelectorAll('[contenteditable]').forEach(function (el) { el.removeAttribute('contenteditable'); });
        frame.appendChild(clone);
      });

      block.appendChild(frame);
      return block;
    }

    function alreadyHasResizableFrame(img) {
      const block = img.closest('.moodle-media-block');
      if (!block) return false;
      let node = img.parentElement;
      while (node && node !== block) {
        if (node.tagName === 'DIV' && cssText(node).includes('display:inline-block')) return true;
        node = node.parentElement;
      }
      return false;
    }

    function canonicalizeLegacyEditorCard(img) {
      if (!root.contains(img)) return false;

      const block = img.closest('.moodle-media-block');
      if (!block) return false;

      const panel = block.parentElement;
      const card = panel && panel.parentElement;
      const outer = card && card.parentElement;

      // Caso exacto detectado en el HTML de Moodle:
      // outer 1000px > card inline-block > panel gris > moodle-media-block > img
      if (isPanel(panel) && isCard(card) && isOuter(outer)) {
        const width = readWidth(card);
        const captions = Array.from(card.children).filter(function (child) {
          return child !== panel && child.nodeType === 1 && !child.querySelector('img');
        });
        const canonical = buildCanonicalImageBlock(img, width, captions);
        outer.replaceWith(canonical);
        return true;
      }

      return false;
    }

    function normalizePlainImage(img) {
      if (!root.contains(img)) return;
      if (canonicalizeLegacyEditorCard(img)) return;
      if (alreadyHasResizableFrame(img)) {
        styleImportedImage(img, 'scaled');
        const block = img.closest('.moodle-media-block');
        if (block) {
          block.setAttribute('style', 'text-align:center;margin:20px auto;width:100%;max-width:1000px;box-sizing:border-box;border:none;background:transparent;box-shadow:none;border-radius:0;padding:0;overflow:visible;');
        }
        return;
      }

      let block = img.closest('.moodle-media-block');
      if (!block) {
        block = document.createElement('div');
        block.className = 'moodle-media-block';
        img.parentNode.insertBefore(block, img);
        block.appendChild(img);
      }

      const canonical = buildCanonicalImageBlock(img, '100%', []);
      block.replaceWith(canonical);
    }

    // Importante: trabajamos sobre una copia estática porque al reemplazar nodos
    // cambia el árbol DOM durante el recorrido.
    Array.from(root.querySelectorAll('img')).forEach(normalizePlainImage);

    root.querySelectorAll('iframe,video,audio').forEach(function (media) {
      media.style.maxWidth = '100%';
      media.style.boxSizing = 'border-box';
      if (!media.closest('.moodle-media-block')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'moodle-media-block';
        wrapper.setAttribute('style', 'width:100%;max-width:1000px;margin:20px auto;box-sizing:border-box;text-align:center;');
        media.parentNode.insertBefore(wrapper, media);
        wrapper.appendChild(media);
      }
    });
  }

  function normalizeInvalidParagraphs(root) {
    if (typeof window.normalizeInvalidParagraphBlocks === 'function') {
      window.normalizeInvalidParagraphBlocks(root);
      return;
    }

    const blockSelector = 'div,section,article,main,header,footer,aside,nav,figure,blockquote,table,ul,ol,hr,iframe,video,audio';
    Array.from(root.querySelectorAll('p')).forEach(function (p) {
      if (!p.querySelector(blockSelector)) return;
      const fragment = document.createDocumentFragment();
      while (p.firstChild) fragment.appendChild(p.firstChild);
      p.parentNode.insertBefore(fragment, p);
      p.remove();
    });
  }

  function removeEmptyNeutralSpans(root) {
    root.querySelectorAll('span').forEach(function (span) {
      if (span.attributes.length) return;
      if (compactText(span.textContent || '')) return;
      if (span.querySelector('img,iframe,video,audio,br')) return;
      span.remove();
    });
  }

  function insertImportedMoodleHTML(cleanedHTML, replaceCurrent) {
    const editor = getEditor();
    if (!editor) throw new Error('No se ha encontrado el área editable principal (#editor).');

    callIfExists('saveBlockUndo');

    if (replaceCurrent) {
      editor.innerHTML = cleanedHTML;
    } else {
      const temp = document.createElement('div');
      temp.innerHTML = cleanedHTML;

      if (editor.innerHTML.trim()) {
        const separator = document.createElement('p');
        separator.innerHTML = '<br>';
        editor.appendChild(separator);
      }

      while (temp.firstChild) editor.appendChild(temp.firstChild);
    }

    editor.querySelectorAll('td,th').forEach(function (cell) {
      cell.setAttribute('contenteditable', 'true');
      cell.style.outline = 'none';
      cell.style.cursor = 'text';
    });

    refreshEditorState(editor);
  }

  function compactText(text) {
    return String(text || '')
      .replace(/\u00a0/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  window.openMoodleHTMLModal = openMoodleHTMLModal;
  window.importEditorGeneratedMoodleHTML = importEditorGeneratedMoodleHTML;

  ready(function () {
    createImportButton();
    createImportModal();
  });
})();
