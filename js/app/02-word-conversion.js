// ══════════════════════════════════════════════════════════════
//  02-word-conversion.js · v2.0
//
//  Cambios respecto a v1.x:
//
//  ✅ FIX A · Listas con anidamiento real
//     - Se recorre cada <li> y se extraen SUS sublistas directas
//       (antes se hacía querySelectorAll('li'), que arrastraba
//       también los <li> de sublistas anidadas y las aplanaba).
//     - Se construye el HTML respetando la jerarquía.
//     - Se eliminó mergeLists(), que fusionaba listas vecinas de
//       forma indiscriminada (podía unir dos listas separadas).
//
//  ✅ FIX B · Detección robusta de estilos inline
//     - font-weight: cualquier valor ≥ 600 (antes solo [67]\d\d|800,
//       que se perdía 550, 650, 750, 900...).
//     - Se reconoce mso-bidi-font-weight:bold de Word.
//     - Se reconoce font-style:oblique (Word lo usa a veces).
//     - Se reconoce text-decoration:line-through (<s>/<strike>/<del>).
//     - <sub> y <sup> se conservan.
//
//  ✅ FIX C · Marcadores de lista al inicio del <li>
//     - Antes se hacía stripBullet sobre el HTML ya montado, lo que
//       fallaba si el bullet venía dentro de un <span> o de un
//       <span style="mso-list:...">. Ahora se elimina el marcador
//       del primer nodo de texto del <li>, sin tocar el resto.
//
//  ✅ FIX D · Word MsoListParagraph con jerarquía
//     - Se agrupan los <p class="MsoListParagraph"> consecutivos y
//       se reconstruye la jerarquía usando el nivel de mso-list.
//     - Si todos los párrafos están al mismo nivel, la lista sale
//       plana como antes.
//     - Si hay varios niveles, se anidan correctamente.
//
//  ✅ FIX E · Compatibilidad con HTML procedente de PDF
//     - processListElement() funciona igual con <ul>/<ol> estándar,
//       así que el HTML que genera el importador de PDF (que ya usa
//       <ul>/<ol> nativos) se procesa correctamente si en algún
//       momento se reinyecta por esta vía.
//
//  Nota: la función convertWordBody() no se invoca desde el flujo
//  de importación de PDF (ese va directo a appendHTMLToEditor). Si
//  quieres que las listas de PDF también se reconstruyan con esta
//  misma lógica, en el siguiente paso ajustamos 06-media-docx.js.
// ══════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════
//  UTILIDADES
// ══════════════════════════════════════════════════════════════
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ✅ FIX B · Helpers de detección de estilos inline
function _fwIsBold(value) {
  if (!value) return false;
  const v = String(value).trim().toLowerCase();
  if (v === 'bold' || v === 'bolder') return true;
  const n = parseInt(v, 10);
  if (!isNaN(n) && n >= 600) return true;
  return false;
}
function _getStyleProp(style, prop) {
  const re = new RegExp(prop + '\\s*:\\s*([^;]+)', 'i');
  const m = String(style || '').match(re);
  return m ? m[1].trim() : '';
}
function _isBold(st) {
  const s = String(st || '').toLowerCase();
  if (_fwIsBold(_getStyleProp(s, 'font-weight'))) return true;
  if (_fwIsBold(_getStyleProp(s, 'mso-bidi-font-weight'))) return true;
  return false;
}
function _isItalic(st) {
  const s = String(st || '').toLowerCase();
  return /font-style\s*:\s*(italic|oblique)/i.test(s)
      || /mso-bidi-font-style\s*:\s*italic/i.test(s);
}
function _isUnderline(st) {
  const s = String(st || '').toLowerCase();
  return /text-decoration[^;]*underline/i.test(s);
}
function _isStrike(st) {
  const s = String(st || '').toLowerCase();
  return /text-decoration[^;]*(line-through|strike)/i.test(s);
}

// ══════════════════════════════════════════════════════════════
//  CONVERSIÓN DE CONTENIDO INLINE
// ══════════════════════════════════════════════════════════════
function getInline(node) {
  let out = '';
  for (const child of node.childNodes) {
    if (child.nodeType === 3) {
      const txt = child.textContent.replace(/[\r\n]+/g, ' ');
      out += esc(txt);
      continue;
    }
    if (child.nodeType !== 1) continue;

    const tag = child.tagName.toLowerCase();
    const st  = child.getAttribute('style') || '';
    const inner = getInline(child);

    if (tag === 'b' || tag === 'strong') {
      out += '<strong style="font-weight:bold;">' + inner + '</strong>';
    }
    else if (tag === 'i' || tag === 'em') {
      out += '<em style="font-style:italic;">' + inner + '</em>';
    }
    else if (tag === 'u') {
      out += '<span style="text-decoration:underline;">' + inner + '</span>';
    }
    // ✅ FIX B · tachado
    else if (tag === 's' || tag === 'strike' || tag === 'del') {
      out += '<span style="text-decoration:line-through;">' + inner + '</span>';
    }
    // ✅ FIX B · sub/sup
    else if (tag === 'sub') {
      out += '<sub>' + inner + '</sub>';
    }
    else if (tag === 'sup') {
      out += '<sup>' + inner + '</sup>';
    }
    else if (tag === 'a') {
      const href = child.getAttribute('href') || '';
      if (href && !href.startsWith('file:') && href !== '#')
        out += '<a href="' + esc(href) + '" style="color:#C0272D;text-decoration:underline;" target="_blank">' + inner + '</a>';
      else out += inner;
    }
    else if (tag === 'br') {
      out += ' ';
    }
    else if (tag === 'span' || tag === 'font') {
      const bold      = _isBold(st);
      const italic    = _isItalic(st);
      const underline = _isUnderline(st);
      const strike    = _isStrike(st);
      let w = inner;
      if (strike)    w = '<span style="text-decoration:line-through;">' + w + '</span>';
      if (bold)      w = '<strong style="font-weight:bold;">' + w + '</strong>';
      if (italic)    w = '<em style="font-style:italic;">' + w + '</em>';
      if (underline) w = '<span style="text-decoration:underline;">' + w + '</span>';
      out += w;
    } else {
      out += inner;
    }
  }
  return out;
}

// ══════════════════════════════════════════════════════════════
//  ✅ FIX C · Limpieza de marcadores de lista al inicio de un <li>
//
//  Elimina el bullet/número que Word a veces incluye como texto
//  (a veces dentro de un <span style="mso-list:...">) del PRIMER
//  nodo de texto significativo del nodo dado. No toca el resto.
// ══════════════════════════════════════════════════════════════
const _LIST_BULLET_RE = /^[\s\u00a0]*[·•▪▫◦‣⁃\u2022\u25cf\u25aa\u25ab\uf0b7\u2023\u2043\u204c\u204d\u2219\u25d8\u25d9•·\-–—]+\s*/;
const _LIST_NUMBER_RE = /^[\s\u00a0]*\d{1,3}[.)]\s+/;

function _stripMarkerFromNode(node, regex) {
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null);
  let textNode;
  while ((textNode = walker.nextNode())) {
    const text = textNode.textContent;
    if (!text) continue;
    // Saltamos nodos que solo tienen espacios
    if (!text.replace(/[\s\u00a0]/g, '')) continue;
    // Primer texto significativo → intentamos quitar el marcador
    if (regex.test(text)) {
      textNode.textContent = text.replace(regex, '');
    }
    return;
  }
}

// Versiones string heredadas (por compatibilidad, siguen disponibles)
function stripBullet(h) {
  if (!h) return h;
  let prev, out = h, guard = 0;
  const wrapped = /^<span[^>]*>\s*[·•▪▫◦‣⁃\u2022\u25cf\u25aa\u25ab\uf0b7\u2023\u2043\u204c\u204d\u2219\u25d8\u25d9•·\-–—]+\s*<\/span>\s*/i;
  do {
    prev = out;
    out = out.replace(_LIST_BULLET_RE, '').replace(wrapped, '');
    guard++;
  } while (prev !== out && guard < 5);
  return out;
}
function stripNumber(h) {
  if (!h) return h;
  let prev, out = h, guard = 0;
  const wrapped = /^<span[^>]*>\s*\d{1,3}[.)]\s*<\/span>\s*/i;
  do {
    prev = out;
    out = out.replace(_LIST_NUMBER_RE, '').replace(wrapped, '');
    guard++;
  } while (prev !== out && guard < 5);
  return out;
}

// ══════════════════════════════════════════════════════════════
//  DETECCIÓN HEURÍSTICA DE ENCABEZADO
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
  if (cls.includes('MsoListParagraph') || cls.includes('ListParagraph') || cls.includes('MsoList')) return true;
  // ✅ FIX D · Word también marca listas con mso-list en style
  const style = el.getAttribute('style') || '';
  if (/mso-list\s*:/i.test(style)) return true;
  return false;
}

function detectHeadingHeuristic(node) {
  const text = node.textContent.trim();
  if (!text || text.length > 120) return 0;
  const style = node.getAttribute('style') || '';
  const childNodes = Array.from(node.childNodes).filter(n =>
    n.nodeType === 3 ? n.textContent.trim() : n.nodeType === 1
  );
  const fsMatch = style.match(/font-size\s*:\s*([\d.]+)(pt|px)/i);
  if (fsMatch) {
    const size = parseFloat(fsMatch[1]);
    const unit = fsMatch[2].toLowerCase();
    const px = unit === 'pt' ? size * 1.333 : size;
    if (px >= 24) return 1;
    if (px >= 18) return 2;
    if (px >= 15) return 3;
    if (px >= 13) return 4;
  }
  const msoName = style.match(/mso-style-name\s*:\s*["']?([^;"']+)/i);
  if (msoName) {
    const n = msoName[1].toLowerCase().trim();
    if (n.includes('title') || n.includes('ttulo') || n.includes('titulo')) return 1;
    if (n.includes('heading 1') || n.includes('encabezado 1')) return 1;
    if (n.includes('heading 2') || n.includes('encabezado 2')) return 2;
    if (n.includes('heading 3') || n.includes('encabezado 3')) return 3;
    if (n.includes('heading 4') || n.includes('encabezado 4')) return 4;
  }
  const isAllBold = (n) => {
    if (n.nodeType === 3) return n.textContent.trim() === '';
    const t = n.tagName.toLowerCase();
    const s = n.getAttribute('style') || '';
    if (t === 'b' || t === 'strong') return true;
    if (s.match(/font-weight\s*:\s*(bold|[6-9]\d\d)/i)) return true;
    return Array.from(n.childNodes).every(isAllBold);
  };
  const allBold = childNodes.length > 0 && childNodes.every(isAllBold);
  const letters = text.replace(/[^a-záéíóúüñA-ZÁÉÍÓÚÜÑ]/g, '');
  const upperRatio = letters.length > 0
    ? (text.replace(/[^A-ZÁÉÍÓÚÜÑ]/g, '').length / letters.length)
    : 0;
  const isAllCaps = upperRatio >= 0.75;
  const numMatch = text.match(/^(\d+)(\.(\d+))?(\.(\d+))?[\s\.\-–]/);
  let numDepth = 0;
  if (numMatch) numDepth = numMatch[3] ? (numMatch[5] ? 3 : 2) : 1;
  if (allBold && isAllCaps && text.length <= 60) return 1;
  if (allBold && isAllCaps) return 2;
  if (allBold && numDepth === 1) return 2;
  if (allBold && numDepth === 2) return 3;
  if (allBold && numDepth === 3) return 4;
  if (allBold && text.length <= 50) return 3;
  if (isAllCaps && text.length <= 40) return 2;
  return 0;
}

// ══════════════════════════════════════════════════════════════
//  ✅ FIX A · PROCESAMIENTO DE LISTAS HTML REALES CON ANIDAMIENTO
//
//  processListElement(<ul>/<ol>) → string HTML con <li> anidados
//  correctamente. Solo mira los <li> hijos DIRECTOS de la lista
//  actual y, para cada uno, procesa sus sublistas como hijos.
// ══════════════════════════════════════════════════════════════
function _directChildLists(li) {
  const lists = [];
  Array.from(li.children).forEach(child => {
    const t = child.tagName.toLowerCase();
    if (t === 'ul' || t === 'ol') lists.push(child);
  });
  return lists;
}

function _liContentWithoutSubLists(li) {
  const clone = li.cloneNode(true);
  Array.from(clone.children).forEach(child => {
    const t = child.tagName.toLowerCase();
    if (t === 'ul' || t === 'ol') child.remove();
  });
  return clone;
}

function processListElement(listEl, stats) {
  const tag = listEl.tagName.toLowerCase();
  const lt  = tag === 'ol' ? 'ol' : 'ul';
  const isOrdered = lt === 'ol';

  const itemsHtml = [];

  Array.from(listEl.children).forEach(child => {
    if (child.tagName.toLowerCase() !== 'li') return;

    // Contenido del <li> sin las sublistas
    const contentClone = _liContentWithoutSubLists(child);
    _stripMarkerFromNode(contentClone, _LIST_BULLET_RE);
    if (isOrdered) _stripMarkerFromNode(contentClone, _LIST_NUMBER_RE);

    const contentHtml = getInline(contentClone)
      .replace(/[\r\n]+/g, ' ')
      .replace(/^[\s\u00a0]+|[\s\u00a0]+$/g, '');

    // Sublistas anidadas (solo las DIRECTAS de este <li>)
    const subLists = _directChildLists(child);
    let nestedHtml = '';
    subLists.forEach(sub => { nestedHtml += processListElement(sub, stats); });

    itemsHtml.push(
      '  <li style="' + EX.li + '">' + contentHtml + nestedHtml + '</li>'
    );
    if (stats) stats.li++;
  });

  if (!itemsHtml.length) return '';
  return '<' + lt + ' style="' + EX[lt] + '">\n' + itemsHtml.join('\n') + '\n</' + lt + '>\n';
}

// ══════════════════════════════════════════════════════════════
//  ✅ FIX D · Word MsoListParagraph → lista anidada
//
//  Agrupa los <p class="MsoListParagraph"> consecutivos y
//  reconstruye la jerarquía según el nivel declarado en
//  mso-list (o, en su defecto, según margin-left).
// ══════════════════════════════════════════════════════════════
function _getMsoListLevel(p) {
  const st = p.getAttribute('style') || '';
  const m = st.match(/mso-list\s*:[^;]*\blevel(\d+)/i);
  if (m) return parseInt(m[1], 10);
  // Fallback: pista por margin-left
  const ml = st.match(/margin-left\s*:\s*([\d.]+)(pt|px|cm)?/i);
  if (ml) {
    const v = parseFloat(ml[1]);
    const u = (ml[2] || 'pt').toLowerCase();
    const px = u === 'pt' ? v * 1.333 : u === 'cm' ? v * 37.8 : v;
    if (px >= 100) return 3;
    if (px >= 60) return 2;
    return 1;
  }
  return 1;
}

function _getMsoOrdered(p) {
  const txt = (p.textContent || '').trim();
  if (/^\d+[.)]\s/.test(txt)) return true;
  const st = p.getAttribute('style') || '';
  // Word a veces declara el tipo en mso-list; casi nunca lo expone
  // en el style final, así que la heurística por texto es la más fiable.
  return false;
}

function buildMsoListHtml(paragraphs, stats) {
  const items = paragraphs.map(p => ({
    level: _getMsoListLevel(p),
    ordered: _getMsoOrdered(p),
    node: p
  }));

  // Normalizamos niveles para que el mínimo sea 1
  const minLevel = Math.min.apply(null, items.map(it => it.level));
  items.forEach(it => { it.level = it.level - minLevel + 1; });

  // Construcción de árbol con pila
  const root = { level: 0, children: [] };
  const stack = [root];
  items.forEach(item => {
    while (stack.length > 1 && stack[stack.length - 1].level >= item.level) {
      stack.pop();
    }
    const parent = stack[stack.length - 1];
    const node = { level: item.level, ordered: item.ordered, node: item.node, children: [] };
    parent.children.push(node);
    stack.push(node);
  });

  function renderNode(n) {
    if (!n.children || !n.children.length) return '';
    const firstOrdered = n.children[0].ordered;
    const tag = firstOrdered ? 'ol' : 'ul';
    let html = '<' + tag + ' style="' + EX[tag] + '">\n';
    n.children.forEach(child => {
      const contentClone = child.node.cloneNode(true);
      _stripMarkerFromNode(contentClone, _LIST_BULLET_RE);
      if (firstOrdered) _stripMarkerFromNode(contentClone, _LIST_NUMBER_RE);
      const contentHtml = getInline(contentClone)
        .replace(/[\r\n]+/g, ' ')
        .replace(/^[\s\u00a0]+|[\s\u00a0]+$/g, '');
      const nestedHtml = renderNode(child);
      html += '  <li style="' + EX.li + '">' + contentHtml + nestedHtml + '</li>\n';
      if (stats) stats.li++;
    });
    html += '</' + tag + '>\n';
    return html;
  }

  return renderNode(root);
}

// ══════════════════════════════════════════════════════════════
//  TABLAS (sin cambios funcionales)
// ══════════════════════════════════════════════════════════════
function extractWordCellStyle(cell) {
  const raw = cell.getAttribute('style') || '';
  const props = {};
  const get = (pattern) => {
    const m = raw.match(pattern);
    return m ? m[1].trim() : null;
  };
  const bg = get(/background(?:-color)?\s*:\s*([^;]+)/i);
  if (bg && !/auto|none|transparent|#fff(?:fff)?$|white|rgb\(255,\s*255,\s*255\)/i.test(bg)) {
    props.backgroundColor = bg;
  }
  const col = get(/(?:^|;)\s*color\s*:\s*([^;]+)/i);
  if (col && !/auto|windowtext/i.test(col)) { props.color = col; }
  const align = get(/text-align\s*:\s*([^;]+)/i);
  if (align && !/auto/i.test(align)) props.textAlign = align;
  const fw = get(/font-weight\s*:\s*([^;]+)/i);
  if (fw) props.fontWeight = fw;
  return Object.entries(props)
    .map(([k, v]) => k.replace(/([A-Z])/g, '-$1').toLowerCase() + ':' + v)
    .join(';');
}

function procTable(tableEl) {
  const hasWordColors = Array.from(tableEl.querySelectorAll('td,th')).some(c => {
    const s = c.getAttribute('style') || '';
    return /background(?:-color)?\s*:\s*(?!auto|none|transparent|#fff(?:fff)?|white)/i.test(s);
  });
  let out = '<table style="' + EX.table + '">';
  Array.from(tableEl.querySelectorAll('tr')).forEach((row, ri) => {
    out += '<tr>';
    Array.from(row.querySelectorAll('td, th')).forEach(cell => {
      const isH = cell.tagName.toLowerCase() === 'th' || ri === 0;
      const content = getInline(cell);
      const colspan = cell.getAttribute('colspan');
      const rowspan = cell.getAttribute('rowspan');
      const spanAttrs = (colspan && colspan !== '1' ? ' colspan="' + colspan + '"' : '')
                      + (rowspan && rowspan !== '1' ? ' rowspan="' + rowspan + '"' : '');
      let cellStyle;
      if (hasWordColors) {
        const baseStyle = isH
          ? 'padding:10px 14px;text-align:left;font-weight:700;border:1px solid #ccc;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;'
          : 'padding:9px 14px;border:1px solid #e0e0e0;vertical-align:middle;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;';
        const wordStyle = extractWordCellStyle(cell);
        cellStyle = baseStyle + (wordStyle ? wordStyle + ';' : '');
      } else {
        cellStyle = isH ? EX.th : (ri % 2 === 0 ? EX.td : EX.tdalt);
      }
      const hasSpan = (rowspan && rowspan !== '1') || (colspan && colspan !== '1');
      if (hasSpan) {
        cellStyle = cellStyle.replace(/vertical-align:[^;]+;?/g, '');
        cellStyle += 'vertical-align:middle;text-align:center;';
      }
      const tag = isH ? 'th' : 'td';
      out += '<' + tag + spanAttrs + ' style="' + cellStyle + '">' + content + '</' + tag + '>';
    });
    out += '</tr>';
  });
  return out + '</table>';
}

// ══════════════════════════════════════════════════════════════
//  CONVERSIÓN DEL BODY COMPLETO
// ══════════════════════════════════════════════════════════════
function convertWordBody(body) {
  const st = { h1:0, h2:0, h3:0, h4:0, p:0, li:0, tb:0 };
  let out = '';

  function walk(container) {
    const kids = Array.from(container.childNodes);
    let i = 0;
    while (i < kids.length) {
      const node = kids[i];

      // Texto suelto
      if (node.nodeType === 3) {
        const t = node.textContent.trim();
        if (t) { out += '<p style="' + EX.p + '">' + esc(t) + '</p>\n'; st.p++; }
        i++; continue;
      }
      if (node.nodeType !== 1) { i++; continue; }

      const tag = node.tagName.toLowerCase();

      // Encabezados nativos
      const lvl = detectHeading(node);
      if (lvl > 0) {
        const content = getInline(node).replace(/[\r\n]+/g, ' ').replace(/^[\s\r\n]+|[\s\r\n]+$/g, '');
        if (content) {
          out += '<div data-editor-block="text" style="max-width:' + EXPORT_CONTENT_MAX + ';width:100%;margin:12px auto 8px auto;box-sizing:border-box;text-align:left;"><div style="' + EX['h' + lvl] + '">' + content + '</div></div>\n';
          if (lvl === 1) st.h1++; else if (lvl === 2) st.h2++; else if (lvl === 3) st.h3++; else st.h4++;
        }
        i++; continue;
      }

      // ✅ FIX D · Word MsoListParagraph agrupados con jerarquía
      if (isWordList(node)) {
        const group = [];
        while (i < kids.length && isWordList(kids[i])) {
          group.push(kids[i]);
          i++;
        }
        out += buildMsoListHtml(group, st);
        continue;
      }

      // ✅ FIX A · Listas HTML reales con anidamiento correcto
      if (tag === 'ul' || tag === 'ol') {
        out += processListElement(node, st);
        i++;
        continue;
      }

      // Tablas
      if (tag === 'table') {
        out += '<div class="moodle-media-block" data-editor-block="media" style="overflow-x:auto;margin:24px auto;width:100%;max-width:' + EXPORT_MEDIA_MAX + ';box-sizing:border-box;">' + procTable(node) + '</div>\n';
        st.tb++; i++; continue;
      }

      // Imagen suelta
      if (tag === 'img') {
        const src = node.getAttribute('src') || '';
        const alt = node.getAttribute('alt') || '';
        if (src) out += buildImageHTML(src, alt, '100%') + '\n';
        i++; continue;
      }

      // Figura con imagen y posible figcaption
      if (tag === 'figure') {
        const img = node.querySelector('img');
        if (img) {
          const src = img.getAttribute('src') || '';
          const caption = node.querySelector('figcaption');
          const capText = caption ? caption.textContent.trim() : '';
          if (src) out += buildImageHTML(src, capText, 'auto') + '\n';
        }
        i++; continue;
      }

      // Párrafos
      if (tag === 'p') {
        // Si contiene una lista dentro, la procesamos por separado
        const innerList = node.querySelector(':scope > ul, :scope > ol');
        if (innerList) {
          walk(node);
          i++; continue;
        }

        const onlyImg = node.querySelector('img');
        const textContent = node.textContent.trim();
        if (onlyImg && !textContent) {
          const src = onlyImg.getAttribute('src') || '';
          const alt = onlyImg.getAttribute('alt') || '';
          if (src) out += buildImageHTML(src, alt, '100%') + '\n';
          i++; continue;
        }

        const content = getInline(node).replace(/[\r\n]+/g, ' ').replace(/^[\s\r\n]+|[\s\r\n]+$/g, '');
        if (!content) {
          if (!out.endsWith('>&nbsp;</p>\n')) {
            out += '<p style="' + EX.p + '">&nbsp;</p>\n';
          }
          i++; continue;
        }

        const hLvl = detectHeadingHeuristic(node);
        if (hLvl > 0) {
          out += '<div data-editor-block="text" style="max-width:' + EXPORT_CONTENT_MAX + ';width:100%;margin:12px auto 8px auto;box-sizing:border-box;text-align:left;"><div style="' + EX['h' + hLvl] + '">' + content + '</div></div>\n';
          if (hLvl === 1) st.h1++; else if (hLvl === 2) st.h2++; else if (hLvl === 3) st.h3++; else st.h4++;
        } else {
          out += '<p style="' + EX.p + '">' + content + '</p>\n';
          st.p++;
        }
        i++; continue;
      }

      // Contenedores genéricos → recursión
      if (['div','section','article','main','header','footer','aside','nav','blockquote'].includes(tag)) {
        walk(node);
        i++; continue;
      }

      i++;
    }
  }

  walk(body);

  // ✅ FIX A · Se eliminó mergeLists(): fusionaba listas vecinas de
  // forma indiscriminada (podía unir dos listas separadas por nada,
  // o peor, colar un cierre huérfano). El procesamiento actual ya
  // genera exactamente una etiqueta <ul>/<ol> por lista de origen,
  // así que no es necesaria esa fusión posterior.

  return { html: out.trim(), stats: st };
}
