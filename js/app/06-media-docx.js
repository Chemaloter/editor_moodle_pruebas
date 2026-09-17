//  MODAL MULTIMEDIA
// ══════════════════════════════════════════════════════════════
let currentMediaType = null;

const MEDIA_CFG = {
  imgurl: {
    title:'🔗 Insertar imagen desde URL',
    label:'URL de la imagen',
    hint: 'Introduce la URL de la imagen. Puede ser una imagen de internet, de tu servidor o de Moodle. La imagen se mostrará directamente en Moodle siempre que el alumno tenga acceso a esa URL.',
    placeholder:'https://ejemplo.com/imagen.jpg',
    extra:`<div style="margin-top:4px;">
      <label class="modal-label">Título / pie de foto</label>
      <input id="mediaCaption-imgurl" class="modal-input" type="text"
        style="font-size:13px;text-align:left;font-weight:400;letter-spacing:0;"
        placeholder="Ej: Figura 1 — Fases de un incendio">
    </div>
    <div style="margin-top:4px;">
      <label class="modal-label">Ancho máximo</label>
      <select id="mediaWidth-imgurl" class="modal-input" style="font-size:13px;text-align:left;font-weight:400;">
        <option value="100%">100% — ocupa todo el ancho</option>
        <option value="75%">75%</option>
        <option value="50%">50%</option>
        <option value="auto">Auto — tamaño original</option>
      </select>
    </div>`
  },
  img: {
    title:'🖼️ Insertar imagen',
    isFile: true,
    hint: 'Selecciona una imagen de tu ordenador. Se comprimirá automáticamente y quedará incrustada en el contenido — no necesitas subirla a ningún servidor.',
    extra:`
    <div style="margin-top:4px;">
      <label class="modal-label">Título / pie de foto</label>
      <input id="mediaCaption-img" class="modal-input" type="text"
        style="font-size:13px;text-align:left;font-weight:400;letter-spacing:0;"
        placeholder="Ej: Figura 1 — Fases de un incendio">
    </div>
    <div style="margin-top:4px;">
      <label class="modal-label">Ancho máximo</label>
      <select id="mediaWidth" class="modal-input" style="font-size:13px;text-align:left;font-weight:400;">
        <option value="100%">100% — ocupa todo el ancho</option>
        <option value="75%">75%</option>
        <option value="50%">50%</option>
        <option value="auto">Auto — tamaño original</option>
      </select>
    </div>`
  },
  video: {
    title:'🎬 Insertar vídeo',
    label:'URL del vídeo',
    hint: 'Pega la URL del vídeo. YouTube y YouTube Shorts se convierten automáticamente. Para la Mediateca EducaMadrid: abre el vídeo → Compartir/Insertar → copia la URL del iframe. Para cualquier otra plataforma: usa la URL directa del iframe embed.',
    placeholder:'https://mediateca.educa.madrid.org/video/... · https://youtube.com/watch?v=... · o cualquier URL embed',
    extra:`<div style="margin-top:4px;">
      <label class="modal-label">Título del vídeo</label>
      <input id="mediaCaption" class="modal-input" type="text"
        style="font-size:13px;text-align:left;font-weight:400;letter-spacing:0;"
        placeholder="Título que aparecerá debajo del vídeo">
    </div>`
  },
  pdf: {
    title:'📄 Insertar PDF',
    label:'URL del PDF',
    hint: 'Sube el PDF en el gestor de archivos de tu Página en Moodle y copia la URL (pluginfile.php/...).',
    placeholder:'https://tu-moodle.es/pluginfile.php/.../documento.pdf',
    extra:`<div style="margin-top:4px;">
      <label class="modal-label">Título del documento</label>
      <input id="mediaCaption" class="modal-input" type="text"
        style="font-size:13px;text-align:left;font-weight:400;letter-spacing:0;"
        placeholder="Título que aparecerá debajo del PDF">
    </div>
    <div style="margin-top:4px;">
      <label class="modal-label">Altura del visor</label>
      <select id="mediaHeight" class="modal-input" style="font-size:13px;text-align:left;font-weight:400;">
        <option value="60vh">60% de la pantalla</option>
        <option value="75vh" selected>75% de la pantalla</option>
        <option value="90vh">90% de la pantalla</option>
        <option value="100vh">100% — pantalla completa</option>
      </select>
    </div>
    <div style="margin-top:10px;background:#f8f9fa;border:1.5px solid #e4e7ec;border-radius:8px;padding:12px 14px;">
      <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;">
        <input type="checkbox" id="pdfProtect"
          style="width:16px;height:16px;margin-top:2px;accent-color:#C0272D;flex-shrink:0;">
        <span style="font-size:12px;color:#374151;line-height:1.5;">
          <strong>Proteger contra descarga e impresión</strong><br>
          <span style="color:#6b7280;">Oculta la barra de herramientas y el panel lateral del visor. Los alumnos podrán leer y navegar el documento, pero no verán los botones de descarga ni impresión. Funciona en Chrome y Edge.</span>
        </span>
      </label>
    </div>`
  },
  ppt: {
    title:'📊 Insertar presentación PowerPoint',
    label:'URL de la presentación',
    hint: 'Pega la URL según el origen. Ver opciones de compatibilidad abajo.',
    placeholder:'https://... (OneDrive, Google Slides, SharePoint o pluginfile Moodle)',
    extra:`<div style="margin-top:4px;">
      <label class="modal-label">Título de la presentación</label>
      <input id="pptCaption" class="modal-input" type="text"
        style="font-size:13px;text-align:left;font-weight:400;letter-spacing:0;"
        placeholder="Título que aparecerá debajo de la presentación">
    </div>
    <div style="margin-top:4px;">
      <label class="modal-label">Altura del visor</label>
      <select id="pptHeight" class="modal-input" style="font-size:13px;text-align:left;font-weight:400;">
        <option value="500px">Compacto (~500px)</option>
        <option value="600px" selected>Normal (~600px)</option>
        <option value="75vh">75% de la pantalla</option>
        <option value="90vh">90% de la pantalla</option>
      </select>
    </div>
    <div style="margin-top:10px;background:#fff8f0;border:1.5px solid #f59e0b;border-radius:8px;padding:10px 12px;font-size:11px;color:#374151;line-height:1.6;">
      <strong style="color:#92400e;">Fuentes compatibles:</strong><br>
      • <strong>OneDrive / SharePoint:</strong> abre la presentación → Compartir → Insertar → copia la URL del <code>src</code> del iframe.<br>
      • <strong>Google Slides:</strong> Archivo → Publicar en la web → Insertar → copia la URL del iframe. Se detecta automáticamente.<br>
      • <strong>Moodle (pluginfile.php):</strong> solo funciona si el curso permite acceso de invitado, o si el archivo es público.<br>
      • <strong>Cualquier URL embed</strong> de otra plataforma también funciona.
    </div>`
  }
};

function openMediaModal(type) {
  currentMediaType = type;
  const cfg = MEDIA_CFG[type];
  if (!cfg) return;
  document.getElementById('mediaModal-title').textContent = cfg.title;
  document.getElementById('mediaModal-label').textContent = cfg.label || '';
  document.getElementById('mediaModal-hint').textContent  = cfg.hint  || '';
  document.getElementById('mediaUrl').placeholder = cfg.placeholder || '';
  document.getElementById('mediaUrl').value = '';
  document.getElementById('mediaExtra').innerHTML = cfg.extra || '';
  const fileRow = document.getElementById('mediaFileRow');
  const urlRow  = document.getElementById('mediaUrlRow');
  if (cfg.isFile) {
    fileRow.style.display = '';
    urlRow.style.display  = 'none';
    const fi = document.getElementById('mediaFileInput');
    if (fi) fi.value = '';
    document.getElementById('imgPreviewWrap').style.display = 'none';
  } else {
    fileRow.style.display = 'none';
    urlRow.style.display  = '';
    setTimeout(() => document.getElementById('mediaUrl').focus(), 60);
  }
  document.getElementById('mediaModal').classList.add('open');
}

function closeMediaModal() {
  document.getElementById('mediaModal').classList.remove('open');
  currentMediaType = null;
}

// ══════════════════════════════════════════════════════════════
//  COMPRESIÓN DE IMÁGENES
// ══════════════════════════════════════════════════════════════
function compressBase64Image(dataUrl, maxW, quality, cb) {
  const img = new Image();
  img.onload = function() {
    const canvas = document.createElement('canvas');
    let w = img.width, h = img.height;
    if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    const useJpeg = dataUrl.startsWith('data:image/jpeg') || dataUrl.startsWith('data:image/jpg');
    if (useJpeg) { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h); }
    ctx.drawImage(img, 0, 0, w, h);
    cb(useJpeg ? canvas.toDataURL('image/jpeg', quality) : canvas.toDataURL('image/png'));
  };
  img.onerror = function() { cb(dataUrl); };
  img.src = dataUrl;
}

function compressAllImages(doc) {
  return new Promise(function(resolve) {
    const imgs = Array.from(doc.querySelectorAll('img'));
    const base64Imgs = imgs.filter(function(img) {
      return (img.getAttribute('src') || '').startsWith('data:image');
    });
    if (base64Imgs.length === 0) { resolve(); return; }
    let done = 0;
    base64Imgs.forEach(function(img) {
      compressBase64Image(img.src, 1200, 0.82, function(compressed) {
        img.src = compressed;
        done++;
        if (done === base64Imgs.length) resolve();
      });
    });
  });
}

// ══════════════════════════════════════════════════════════════
//  CARGA DE ARCHIVO .DOCX
// ══════════════════════════════════════════════════════════════
function handleDocxFile(file) {
  if (!file) return;
  if (!file.name.toLowerCase().endsWith('.docx')) {
    showToast('⚠️ Solo se admiten archivos .docx de Word'); return;
  }
  showToast('⏳ Procesando ' + file.name + '...');
  const reader = new FileReader();
  reader.onerror = function() { showToast('❌ No se pudo leer el archivo'); };
  reader.onload = function(e) {
    const arrayBuffer = e.target.result;
    mammoth.convertToHtml({ arrayBuffer }, {
      convertImage: mammoth.images.imgElement(function(image) {
        return image.read('base64').then(function(b64) {
          const type = image.contentType || '';
          if (/emf|wmf/i.test(type)) {
            const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="420" height="80"><rect width="420" height="80" fill="#fff8f0" stroke="#f59e0b" stroke-width="2" rx="6"/><text x="210" y="30" text-anchor="middle" font-family="Montserrat, Arial" font-size="13" fill="#92400e">Imagen EMF: no compatible con navegadores</text><text x="210" y="55" text-anchor="middle" font-family="Montserrat, Arial" font-size="11" fill="#b45309">Sustituye en Word por PNG o JPG antes de insertar</text></svg>';
            return { src: 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg))), alt: 'Imagen EMF no compatible' };
          }
          return { src: 'data:' + type + ';base64,' + b64 };
        });
      }),
      styleMap: [
        "p[style-name='Heading 1'] => h1", "p[style-name='Heading 2'] => h2",
        "p[style-name='Heading 3'] => h3", "p[style-name='Heading 4'] => h4",
        "p[style-name='Título 1']  => h1", "p[style-name='Título 2']  => h2",
        "p[style-name='Título 3']  => h3", "p[style-name='Título 4']  => h4",
        "p[style-name='Title']     => h1", "b => strong", "i => em", "u => u",
      ]
    })
    .then(function(result) {
      const html = result.value;
      if (!html || !html.trim()) { showToast('⚠️ El documento parece estar vacío'); return; }
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const imgCount = doc.querySelectorAll('img').length;
      return compressAllImages(doc).then(function() {
        const conv = convertWordBody(doc.body);
        appendHTMLToEditor(conv.html);
        updateStats(conv.stats);
        const imgMsg = imgCount > 0 ? ' · ' + imgCount + ' imagen(es)' : '';
        showToast('✅ ' + file.name + ' cargado' + imgMsg);
      });
    })
    .catch(function(err) {
      showToast('❌ Error al procesar el archivo: ' + (err.message || err));
    });
  };
  reader.readAsArrayBuffer(file);
}

function compressAndInsertImage(file, width, caption) {
  const MAX_W = 1200, QUALITY = 0.82;
  const useJpeg = /^image\/(jpe?g)$/i.test(file.type);
  const reader = new FileReader();
  reader.onerror = function() { showToast('❌ No se pudo leer la imagen'); };
  reader.onload = function(ev) {
    const img = new Image();
    img.onerror = function() { showToast('❌ Formato de imagen no válido'); };
    img.onload = function() {
      const canvas = document.createElement('canvas');
      let w = img.width, h = img.height;
      if (w > MAX_W) { h = Math.round(h * MAX_W / w); w = MAX_W; }
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (useJpeg) { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h); }
      ctx.drawImage(img, 0, 0, w, h);
      const dataUrl = useJpeg
        ? canvas.toDataURL('image/jpeg', QUALITY)
        : canvas.toDataURL('image/png');
      const kb = Math.round(dataUrl.length * 0.75 / 1024);
      if (kb > 800) showToast('⚠️ Imagen grande (' + kb + ' KB) — considera reducirla', 4000);
      const html = buildImageHTML(dataUrl, caption, width);
      closeMediaModal();
      insertHTMLAtCursor(html);
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

// ══════════════════════════════════════════════════════════════
//  CONSTRUCTORES DE HTML DE RECURSOS
// ══════════════════════════════════════════════════════════════
function buildImageHTML(src, caption, width) {
  const isAuto = !width || width === 'auto';
  const containerW = isAuto ? 'max-width:100%;' : 'width:' + width + ';max-width:100%;';
  const imgStyle   = isAuto
    ? 'max-width:100%;width:auto;height:auto;border-radius:6px;display:block;margin:0 auto;box-sizing:border-box;'
    : 'width:100%;max-width:100%;height:auto;border-radius:6px;display:block;box-sizing:border-box;';
  return '<div class="moodle-media-block" style="text-align:center;margin:20px auto;width:100%;max-width:' + EXPORT_MEDIA_MAX + ';box-sizing:border-box;">' +
         '<div style="display:inline-block;' + containerW + 'background:#fff;' +
         'border:1px solid #d1d1d1;border-radius:10px;overflow:hidden;' +
         'box-shadow:0 4px 12px rgba(0,0,0,.12);font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;box-sizing:border-box;">' +
         '<div style="text-align:center;background:#f0f0f0;padding:16px;box-sizing:border-box;">' +
         '<img src="' + src + '" alt="' + esc(caption || 'Imagen') + '" ' +
         'style="' + imgStyle + '">' +
         '</div>' +
         '<div style="padding:12px 16px;background:#f9f9f9;border-top:1px solid #d1d1d1;text-align:center;box-sizing:border-box;">' +
         '<span contenteditable="true" style="font-weight:700;color:#333;font-size:16px;line-height:1.5;display:block;outline:none;cursor:text;overflow-wrap:anywhere;" ' +
         'title="Haz clic para editar el título">🖼️ ' + (caption ? esc(caption) : 'Haz clic para escribir el título') + '</span>' +
         '</div>' +
         '</div>' +
         '</div>';
}

function buildPPTHTML(embedUrl, caption, height) {
  return '<div class="moodle-media-block" style="width:100%;max-width:' + EXPORT_MEDIA_MAX + ';margin:20px auto;background:#fff;border:1px solid #d1d1d1;'
       + 'border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.12);font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;box-sizing:border-box;">'
       + '<div style="position:relative;width:100%;height:' + height + ';background:#f5f5f5;box-sizing:border-box;">'
       + '<iframe src="' + embedUrl + '" '
       + 'style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;max-width:100%;box-sizing:border-box;" '
       + 'allowfullscreen></iframe>'
       + '</div>'
       + '<div style="padding:10px 16px;background:#f9f9f9;border-top:1px solid #d1d1d1;text-align:center;box-sizing:border-box;">'
       + '<span contenteditable="true" style="font-weight:700;color:#333;font-size:16px;line-height:1.5;display:block;outline:none;cursor:text;overflow-wrap:anywhere;" '
       + 'title="Haz clic para editar el título">📊 ' + (caption ? esc(caption) : 'Haz clic para escribir el título') + '</span>'
       + '</div>'
       + '</div>';
}

// Previsualizar imagen en modal al seleccionarla
document.getElementById('mediaModal').addEventListener('change', function(e) {
  if (e.target.id !== 'mediaFileInput') return;
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    const prev = document.getElementById('imgPreview');
    const wrap = document.getElementById('imgPreviewWrap');
    const info = document.getElementById('imgFileInfo');
    prev.src = ev.target.result;
    info.textContent = file.name + ' · ' + Math.round(file.size/1024) + ' KB — se comprimirá automáticamente';
    wrap.style.display = 'block';
  };
  reader.readAsDataURL(file);
});

function confirmMedia() {
  if (currentMediaType === 'img') {
    const fileInput = document.getElementById('mediaFileInput');
    const file    = fileInput && fileInput.files && fileInput.files[0];
    const width   = (document.getElementById('mediaWidth')       || {value:'100%'}).value;
    const caption = (document.getElementById('mediaCaption-img') || {value:''}).value.trim();
    if (!file) { showToast('⚠️ Selecciona una imagen primero'); return; }
    compressAndInsertImage(file, width, caption);
    return;
  }
  if (currentMediaType === 'imgurl') {
    const url     = (document.getElementById('mediaUrl')            || {value:''}).value.trim();
    const caption = (document.getElementById('mediaCaption-imgurl') || {value:''}).value.trim();
    const width   = (document.getElementById('mediaWidth-imgurl')   || {value:'100%'}).value;
    if (!url) { showToast('⚠️ Introduce la URL de la imagen'); return; }
    const html = buildImageHTML(url, caption, width);
    closeMediaModal();
    insertHTMLAtCursor(html);
    return;
  }
  if (currentMediaType === 'ppt') {
    const raw     = (document.getElementById('mediaUrl')  || {value:''}).value.trim();
    const caption = (document.getElementById('pptCaption')|| {value:''}).value.trim();
    const height  = (document.getElementById('pptHeight') || {value:'600px'}).value;
    if (!raw) { showToast('⚠️ Introduce la URL de la presentación'); return; }
    let embedUrl = raw;
    const gsMatch = raw.match(/docs\.google\.com\/presentation\/d\/([^/]+)/);
    if (gsMatch) {
      embedUrl = 'https://docs.google.com/presentation/d/' + gsMatch[1] + '/embed?start=false&loop=false&delayms=3000';
    } else if (/onedrive\.live\.com|sharepoint\.com/.test(raw) && !raw.includes('view.officeapps')) {
      embedUrl = 'https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURIComponent(raw);
    } else if (/\.pptx?(\?|$)/i.test(raw) && !raw.includes('view.officeapps')) {
      embedUrl = 'https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURIComponent(raw);
    }
    const html = buildPPTHTML(embedUrl, caption, height);
    closeMediaModal();
    insertHTMLAtCursor(html);
    return;
  }
  const url = (document.getElementById('mediaUrl') || {value:''}).value.trim();
  if (!url) { showToast('⚠️ Introduce una URL'); return; }
  let html = '';
  if (currentMediaType === 'video') {
    const caption = (document.getElementById('mediaCaption') || {value:''}).value.trim();
    let embedUrl = url;
    const ytMatch  = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const ytShorts = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
    if (ytMatch)  embedUrl = 'https://www.youtube.com/embed/' + ytMatch[1];
    if (ytShorts) embedUrl = 'https://www.youtube.com/embed/' + ytShorts[1];
    html = '<div class="moodle-media-block" style="width:100%;max-width:' + EXPORT_MEDIA_MAX + ';margin:20px auto;background:#fff;border:1px solid #d1d1d1;box-sizing:border-box;' +
           'border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.12);font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">' +
           '<div style="position:relative;width:100%;padding-bottom:56.25%;background:#000;">' +
           '<iframe src="' + embedUrl + '" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen></iframe>' +
           '</div>' +
           '<div style="padding:14px 18px;background:#f9f9f9;border-top:1px solid #d1d1d1;text-align:center;">' +
           '<span contenteditable="true" style="font-weight:700;color:#333;font-size:1.05em;display:block;outline:none;cursor:text;" ' +
           'title="Haz clic para editar el título">🎬 ' + (caption ? esc(caption) : 'Haz clic para escribir el título') + '</span>' +
           '</div>' +
           '</div>';
  }
  if (currentMediaType === 'pdf') {
    const caption   = (document.getElementById('mediaCaption') || {value:''}).value.trim();
    const height    = (document.getElementById('mediaHeight')  || {value:'75vh'}).value;
    const protect   = document.getElementById('pdfProtect');
    const doProtect = protect ? protect.checked : false;
    const params = doProtect ? '#toolbar=0&navpanes=0&scrollbar=1' : '#scrollbar=1';
    html = '<div class="moodle-media-block" style="width:100%;max-width:' + EXPORT_MEDIA_MAX + ';margin:20px auto;border-radius:10px;box-sizing:border-box;' +
           'overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.12);font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">' +
           '<iframe src="' + url + params + '" ' +
           'style="width:100%;height:' + height + ';border:0;display:block;min-height:300px;">' +
           '</iframe>' +
           (caption ? '<div style="padding:14px 18px;background:#f9f9f9;border-top:1px solid #d1d1d1;text-align:center;">' +
             '<span style="font-weight:700;color:#333;font-size:1.05em;">📄 ' + esc(caption) + '</span></div>' : '') +
           '</div>';
  }
  if (html) { closeMediaModal(); insertHTMLAtCursor(html); }
}

document.getElementById('mediaModal').addEventListener('click', e => {
  if (e.target.id === 'mediaModal') closeMediaModal();
});
document.getElementById('mediaModal').addEventListener('keydown', e => {
  if (e.key === 'Enter') confirmMedia();
  if (e.key === 'Escape') closeMediaModal();
});

// ══════════════════════════════════════════════════════════════
//  CARGA DE ARCHIVO .PDF (v2.0)
//  Mejoras respecto a v1.0:
//  - Detección y eliminación de cabeceras/pies repetidos entre páginas.
//  - Descartar números de página como títulos (regex 1-3 dígitos).
//  - Detección de viñetas (•, -, –, —, *, ·, 1., 2. …) y agrupación en <ul>/<ol>.
//  - Segmentación de párrafos por hueco vertical real (mediana por página).
//  - Ordenación previa de items por (Y desc, X asc) para PDFs con texto desordenado.
//  - Extracción ampliada de imágenes: paintImageXObject + paintInlineImageXObject + paintJpegXObject.
//  Requiere: window.pdfjsLib disponible (PDF.js 3.x UMD).
// ══════════════════════════════════════════════════════════════

// Normaliza una línea para comparar cabeceras/pies entre páginas:
// "Página 3" y "Página 5" se convierten en "página n", y por tanto coinciden.
function _pdfNormalizeLine(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[\d]+/g, 'n')
    .replace(/[^a-záéíóúüñn\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Agrupa items de texto en líneas por proximidad vertical.
// Antes de agrupar, ordena por (Y descendente, X ascendente) para que
// los items que el PDF tenga desordenados internamente se coloquen bien.
function _pdfGroupItemsIntoLines(items, medianHeight) {
  const tolerance = Math.max(3, medianHeight * 0.45);
  const sorted = items.slice().sort((a, b) => {
    const ya = (a.transform && a.transform[5]) || 0;
    const yb = (b.transform && b.transform[5]) || 0;
    if (Math.abs(ya - yb) > tolerance) return yb - ya; // arriba → abajo
    const xa = (a.transform && a.transform[4]) || 0;
    const xb = (b.transform && b.transform[4]) || 0;
    return xa - xb; // izquierda → derecha
  });

  const lines = [];
  let current = null;
  sorted.forEach(it => {
    const text = (it.str || '').replace(/\s+$/g, '');
    if (!text) return;
    const y = (it.transform && it.transform[5]) || 0;
    const x = (it.transform && it.transform[4]) || 0;
    const h = it.height || medianHeight;
    if (!current || Math.abs(current.y - y) > tolerance) {
      if (current) lines.push(current);
      current = { y, x, height: h, parts: [text] };
    } else {
      current.parts.push(text);
      current.height = Math.max(current.height, h);
    }
  });
  if (current) lines.push(current);
  return lines
    .map(l => ({ y: l.y, x: l.x, height: l.height, text: l.parts.join(' ').replace(/\s+/g, ' ').trim() }))
    .filter(l => l.text);
}

// Detecta el patrón de viñeta y devuelve {ordered, text} o null.
function _pdfDetectBullet(text) {
  const m = text.match(/^([•\-–—*·▪▫◦‣⁃]|\d{1,2}[.)])\s+(.+)$/);
  if (!m) return null;
  return { ordered: /^\d/.test(m[1]), text: m[2].trim() };
}

// Agrupa líneas en bloques: heading, paragraph, ul, ol.
// Usa el hueco vertical para separar párrafos.
function _pdfBuildBlocks(lines, medianHeight, medianLineGap) {
  const blocks = [];
  let current = null;

  lines.forEach(line => {
    const text = line.text;
    const isHeading = line.height >= medianHeight * 1.35 && text.length < 120 && !/^\d{1,3}$/.test(text);
    const bullet = _pdfDetectBullet(text);
    const blockType = isHeading ? 'heading' : (bullet ? (bullet.ordered ? 'ol' : 'ul') : 'paragraph');

    const prevLine = current && current.lines && current.lines.length
      ? current.lines[current.lines.length - 1] : null;
    const gap = prevLine ? (prevLine.y - line.y) : 0;
    const isParagraphBreak = prevLine && gap > medianLineGap * 1.5;

    const normalizedText = bullet ? bullet.text : text;

    if (current && current.type === blockType && !isParagraphBreak) {
      if (blockType === 'ul' || blockType === 'ol') {
        current.items.push(normalizedText);
      } else {
        current.lines.push({ y: line.y, text: normalizedText });
      }
      return;
    }

    if (current) blocks.push(current);

    if (blockType === 'heading') {
      current = { type: 'heading', height: line.height, lines: [{ y: line.y, text }] };
    } else if (blockType === 'ul' || blockType === 'ol') {
      current = { type: blockType, items: [normalizedText], lines: [{ y: line.y, text: normalizedText }] };
    } else {
      current = { type: 'paragraph', lines: [{ y: line.y, text }] };
    }
  });

  if (current) blocks.push(current);

  return blocks.map(b => {
    if (b.type === 'heading') {
      return { type: 'heading', height: b.height, text: b.lines.map(l => l.text).join(' ') };
    }
    if (b.type === 'ul' || b.type === 'ol') {
      return { type: b.type, items: b.items.slice() };
    }
    return { type: 'paragraph', text: b.lines.map(l => l.text).join(' ') };
  });
}

async function handlePdfFile(file) {
  if (!file) return;
  if (!file.name.toLowerCase().endsWith('.pdf')) {
    showToast('⚠️ Solo se admiten archivos .pdf');
    return;
  }
  if (!window.pdfjsLib) {
    showToast('❌ PDF.js no está cargado. Revisa el index.html.');
    return;
  }

  showToast('⏳ Procesando ' + file.name + '...');

  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;

    // ── PASO 1 · Recolectar líneas por página ────────────────
    const pagesData = [];
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const items = textContent.items || [];

      const heights = items.map(it => it.height || 0).filter(h => h > 0).sort((a, b) => a - b);
      const medianHeight = heights.length ? heights[Math.floor(heights.length / 2)] : 12;

      const lines = _pdfGroupItemsIntoLines(items, medianHeight);

      // Mediana de la separación vertical entre líneas consecutivas.
      const lineGaps = [];
      for (let i = 1; i < lines.length; i++) {
        const gap = lines[i - 1].y - lines[i].y;
        if (gap > 0 && gap < 80) lineGaps.push(gap);
      }
      lineGaps.sort((a, b) => a - b);
      const medianLineGap = lineGaps.length
        ? lineGaps[Math.floor(lineGaps.length / 2)]
        : Math.max(medianHeight * 1.4, 12);

      pagesData.push({ pageNum, page, lines, medianHeight, medianLineGap });
    }

    // ── PASO 2 · Detectar cabeceras/pies repetidos ───────────
    // Cuenta cuántas páginas contienen cada línea normalizada.
    const lineFrequency = new Map();
    pagesData.forEach(pd => {
      const seen = new Set();
      pd.lines.forEach(line => {
        const norm = _pdfNormalizeLine(line.text);
        if (!norm || norm.length < 4) return;
        if (seen.has(norm)) return;
        seen.add(norm);
        lineFrequency.set(norm, (lineFrequency.get(norm) || 0) + 1);
      });
    });
    const repeatThreshold = Math.max(2, Math.floor(numPages * 0.8));
    const repeatedLines = new Set();
    lineFrequency.forEach((count, norm) => {
      if (count >= repeatThreshold) repeatedLines.add(norm);
    });

    // ── PASO 3 · Construir HTML ──────────────────────────────
    let html = '';
    let totalHeadings = 0, totalParagraphs = 0, totalImages = 0, totalListItems = 0, totalRemoved = 0;

    for (const pd of pagesData) {
      const { pageNum, page, lines, medianHeight, medianLineGap } = pd;

      // Filtrar líneas repetidas (cabeceras/pies).
      const filteredLines = lines.filter(line => {
        const norm = _pdfNormalizeLine(line.text);
        if (repeatedLines.has(norm)) { totalRemoved++; return false; }
        return true;
      });

      // Construir bloques a partir de las líneas filtradas.
      const blocks = _pdfBuildBlocks(filteredLines, medianHeight, medianLineGap);

      let pageHtml = '';
      blocks.forEach(block => {
        if (block.type === 'heading') {
          const lvl = block.height >= medianHeight * 1.9 ? 1
                    : block.height >= medianHeight * 1.55 ? 2
                    : 3;
          pageHtml += '<div data-editor-block="text" style="max-width:' + EXPORT_CONTENT_MAX + ';width:100%;margin:12px auto 8px auto;box-sizing:border-box;text-align:left;">'
                   + '<div style="' + EX['h' + lvl] + '">' + esc(block.text) + '</div></div>\n';
          totalHeadings++;
        } else if (block.type === 'ul' || block.type === 'ol') {
          const tag = block.type;
          const listStyle = (tag === 'ul' ? EX.ul : EX.ol);
          const itemsHtml = block.items.map(it => '<li style="' + EX.li + '">' + esc(it) + '</li>').join('');
          pageHtml += '<' + tag + ' data-editor-block="text" style="' + listStyle
                   + ';max-width:' + EXPORT_CONTENT_MAX + ';width:100%;margin:14px auto;box-sizing:border-box;">'
                   + itemsHtml + '</' + tag + '>\n';
          totalListItems += block.items.length;
        } else {
          pageHtml += '<p style="' + EX.p + '">' + esc(block.text) + '</p>\n';
          totalParagraphs++;
        }
      });

      // ── Extracción de imágenes ampliada ────────────────────
      try {
        const ops = await page.getOperatorList();
        const imageJobs = [];
        for (let i = 0; i < ops.fnArray.length; i++) {
          const fn = ops.fnArray[i];
          const arg = ops.argsArray[i] ? ops.argsArray[i][0] : null;
          if (!arg) continue;
          if (fn === window.pdfjsLib.OPS.paintInlineImageXObject) {
            imageJobs.push({ inline: true, data: arg });
          } else if (fn === window.pdfjsLib.OPS.paintImageXObject || fn === window.pdfjsLib.OPS.paintJpegXObject) {
            imageJobs.push({ inline: false, name: arg });
          }
        }

        for (const job of imageJobs) {
          try {
            let imgData = null;
            if (job.inline) {
              imgData = job.data;
            } else {
              imgData = await new Promise((resolve) => {
                let resolved = false;
                const timer = setTimeout(() => { if (!resolved) { resolved = true; resolve(null); } }, 2000);
                try {
                  page.objs.get(job.name, (img) => {
                    if (resolved) return;
                    resolved = true;
                    clearTimeout(timer);
                    resolve(img || null);
                  });
                } catch (e) {
                  if (!resolved) { resolved = true; clearTimeout(timer); resolve(null); }
                }
              });
            }
            if (!imgData || !imgData.width || !imgData.height) continue;
            if (!imgData.data) continue;
            if (imgData.width < 60 || imgData.height < 60) continue; // descarta iconos mínimos

            const canvas = document.createElement('canvas');
            canvas.width = imgData.width;
            canvas.height = imgData.height;
            const ctx = canvas.getContext('2d');
            const imageData = ctx.createImageData(imgData.width, imgData.height);
            const src = imgData.data;
            const dst = imageData.data;
            const pixels = imgData.width * imgData.height;
            if (src.length === pixels * 4) {
              dst.set(src);
            } else if (src.length === pixels * 3) {
              for (let p = 0, q = 0; p < pixels; p++, q += 3) {
                dst[p * 4]     = src[q];
                dst[p * 4 + 1] = src[q + 1];
                dst[p * 4 + 2] = src[q + 2];
                dst[p * 4 + 3] = 255;
              }
            } else if (src.length === pixels) {
              for (let p = 0; p < pixels; p++) {
                const v = src[p];
                dst[p * 4] = v; dst[p * 4 + 1] = v; dst[p * 4 + 2] = v; dst[p * 4 + 3] = 255;
              }
            } else {
              continue;
            }
            ctx.putImageData(imageData, 0, 0);
            const dataUrl = canvas.toDataURL('image/png');
            pageHtml += buildImageHTML(dataUrl, 'Imagen · página ' + pageNum, '100%') + '\n';
            totalImages++;
          } catch (e) {
            // Ignorar imagen problemática
          }
        }
      } catch (e) {
        // Si falla la extracción de imágenes, seguimos con el texto
      }

      if (pageHtml.trim()) {
        html += '<div data-pdf-page="' + pageNum + '">\n' + pageHtml + '</div>\n';
      }
      if (pageNum < numPages) {
        html += '<hr data-editor-block="text" style="' + EX.divider + ';max-width:' + EXPORT_CONTENT_MAX + ';width:100%;margin:16px auto;box-sizing:border-box;">\n';
      }
    }

    if (!html.trim()) {
      showToast('⚠️ No se encontró texto ni imágenes extraíbles en el PDF. Si el PDF es un escaneo, necesitará OCR externo.', 6000);
      return;
    }

    appendHTMLToEditor(html);
    const parts = [];
    if (totalHeadings) parts.push(totalHeadings + ' título(s)');
    if (totalParagraphs) parts.push(totalParagraphs + ' párrafo(s)');
    if (totalListItems) parts.push(totalListItems + ' ítem(s) de lista');
    if (totalImages) parts.push(totalImages + ' imagen(es)');
    if (totalRemoved) parts.push(totalRemoved + ' línea(s) de cabecera/pie descartada(s)');
    const summary = parts.length ? ' · ' + parts.join(' · ') : '';
    showToast('✅ ' + file.name + ' cargado · ' + numPages + ' página(s)' + summary, 6000);

  } catch (err) {
    console.error('Error procesando PDF:', err);
    showToast('❌ Error al procesar el PDF: ' + (err.message || err), 5000);
  }
}
