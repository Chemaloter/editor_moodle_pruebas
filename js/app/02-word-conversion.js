// ══════════════════════════════════════════════════════════════
//  UTILIDADES
// ══════════════════════════════════════════════════════════════
function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

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
    if (tag === 'b' || tag === 'strong') { out += '<strong style="font-weight:bold;">' + inner + '</strong>'; }
    else if (tag === 'i' || tag === 'em') { out += '<em style="font-style:italic;">' + inner + '</em>'; }
    else if (tag === 'u') { out += '<span style="text-decoration:underline;">' + inner + '</span>'; }
    else if (tag === 'a') {
      const href = child.getAttribute('href') || '';
      if (href && !href.startsWith('file:') && href !== '#')
        out += '<a href="' + esc(href) + '" style="color:#C0272D;text-decoration:underline;" target="_blank">' + inner + '</a>';
      else out += inner;
    }
    else if (tag === 'br') { out += ' '; }
    else if (tag === 'span' || tag === 'font') {
      const bold = st.includes('font-weight') && (st.includes('bold') || /[67]\d\d|800/.test(st));
      const italic = st.includes('font-style') && st.includes('italic');
      const underline = st.includes('text-decoration') && st.includes('underline');
      let w = inner;
      if (bold) w = '<strong style="font-weight:bold;">' + w + '</strong>';
      if (italic) w = '<em style="font-style:italic;">' + w + '</em>';
      if (underline) w = '<span style="text-decoration:underline;">' + w + '</span>';
      out += w;
    } else { out += inner; }
  }
  return out;
}

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

function stripBullet(h) { return h.replace(/^[\s\u00b7\u2022\u25cf\u25aa\u25ab\uf0b7\u2023\u2043\u204c\u204d\u2219\u25d8\u25d9\-–•·]\s*/,''); }
function stripNumber(h) { return h.replace(/^\d+[\.\)]\s*/,''); }

// ══════════════════════════════════════════════════════════════
//  DETECCIÓN HEURÍSTICA DE ENCABEZADO
// ══════════════════════════════════════════════════════════════
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
  if (numMatch) {
    numDepth = numMatch[3] ? (numMatch[5] ? 3 : 2) : 1;
  }
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
//  CONVERTIR BODY DE WORD
// ══════════════════════════════════════════════════════════════
function convertWordBody(body) {
  const st = {h1:0,h2:0,h3:0,h4:0,p:0,li:0,tb:0};
  let out = '';

  function walk(container) {
    const kids = Array.from(container.childNodes);
    let i = 0;
    while (i < kids.length) {
      const node = kids[i];
      if (node.nodeType === 3) { const t = node.textContent.trim(); if (t) { out += '<p style="'+EX.p+'">'+esc(t)+'</p>\n'; st.p++; } i++; continue; }
      if (node.nodeType !== 1) { i++; continue; }
      const tag = node.tagName.toLowerCase();
      const lvl = detectHeading(node);
      if (lvl > 0) {
        const content = getInline(node).replace(/[\r\n]+/g, ' ').replace(/^[\s\r\n]+|[\s\r\n]+$/g, '');
        if (content) {
          out += '<div data-editor-block="text" style="max-width:' + EXPORT_CONTENT_MAX + ';width:100%;margin:12px auto 8px auto;box-sizing:border-box;text-align:left;"><div style="' + EX['h'+lvl] + '">' + content + '</div></div>\n';
          if (lvl===1) st.h1++; else if (lvl===2) st.h2++; else if (lvl===3) st.h3++; else st.h4++;
        }
        i++; continue;
      }
      if (isWordList(node)) {
        const items = []; let ordered = false;
        while (i < kids.length && isWordList(kids[i])) {
          if (/^\d+[\.\)]\s/.test(kids[i].textContent.trim())) ordered = true;
          items.push(kids[i]); i++;
        }
        const lt = ordered ? 'ol' : 'ul';
        out += '<' + lt + ' style="' + EX[lt] + '">\n';
        items.forEach(item => {
          let c = getInline(item); c = stripBullet(c); if (ordered) c = stripNumber(c);
          if (c.trim()) out += '  <li style="' + EX.li + '">' + c + '</li>\n';
        });
        out += '</' + lt + '>\n'; st.li++; continue;
      }
      if (tag === 'ul' || tag === 'ol') {
        const lt = tag;
        out += '<' + lt + ' style="' + EX[lt] + '">\n';
        while (i < kids.length && kids[i].nodeType === 1 && kids[i].tagName.toLowerCase() === lt) {
          kids[i].querySelectorAll('li').forEach(li => {
            const c = getInline(li).replace(/[\r\n]+/g, ' ').trim();
            if (c) out += '  <li style="' + EX.li + '">' + c + '</li>\n';
          });
          i++;
        }
        out += '</' + lt + '>\n'; st.li++;
        continue;
      }
      if (tag === 'table') { out += '<div class="moodle-media-block" data-editor-block="media" style="overflow-x:auto;margin:24px auto;width:100%;max-width:' + EXPORT_MEDIA_MAX + ';box-sizing:border-box;">' + procTable(node) + '</div>\n'; st.tb++; i++; continue; }
      if (tag === 'img') {
        const src = node.getAttribute('src') || '';
        const alt = node.getAttribute('alt') || '';
        if (src) out += buildImageHTML(src, alt, '100%') + '\n';
        i++; continue;
      }
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
      if (tag === 'p') {
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
          out += '<div data-editor-block="text" style="max-width:' + EXPORT_CONTENT_MAX + ';width:100%;margin:12px auto 8px auto;box-sizing:border-box;text-align:left;"><div style="' + EX['h'+hLvl] + '">' + content + '</div></div>\n';
          if (hLvl===1) st.h1++; else if (hLvl===2) st.h2++; else if (hLvl===3) st.h3++; else st.h4++;
        } else {
          out += '<p style="' + EX.p + '">' + content + '</p>\n';
          st.p++;
        }
        i++; continue;
      }
      if (['div','section','article','main','header','footer','aside','nav','figure','blockquote'].includes(tag)) { walk(node); i++; continue; }
      i++;
    }
  }
  walk(body);

  function mergeLists(html) {
    html = html.replace(/<\/ol>\s*\n<ol[^>]*>/gi, '');
    html = html.replace(/<\/ul>\s*\n<ul[^>]*>/gi, '');
    return html;
  }
  return { html: mergeLists(out.trim()), stats: st };
}

