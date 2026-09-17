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
        // ── Encabezados por estilo ────────────────────────
        "p[style-name='Heading 1'] => h1",
        "p[style-name='Heading 2'] => h2",
        "p[style-name='Heading 3'] => h3",
        "p[style-name='Heading 4'] => h4",
        "p[style-name='Título 1']  => h1",
        "p[style-name='Título 2']  => h2",
        "p[style-name='Título 3']  => h3",
        "p[style-name='Título 4']  => h4",
        "p[style-name='Title']     => h1",

        // ── Listas: párrafos con estilo de lista de Word
        //    se convierten en <li> reales dentro de <ul>/<ol>.
        //    Consecutivos del mismo tipo se agrupan en la misma lista.
        "p[style-name='List Bullet']     => ul > li",
        "p[style-name='List Bullet 2']   => ul > li",
        "p[style-name='List Bullet 3']   => ul > li",
        "p[style-name='List Number']     => ol > li",
        "p[style-name='List Number 2']   => ol > li",
        "p[style-name='List Number 3']   => ol > li",
        "p[style-name='List Paragraph']  => ul > li",
        "p[style-name='Lista con viñetas'] => ul > li",
        "p[style-name='Lista numerada']    => ol > li",
        "p[style-name='Lista con viñetas 2'] => ul > li",
        "p[style-name='Lista numerada 2']   => ol > li",

        // ── Estilos inline ────────────────────────────────
        "b => strong",
        "i => em",
        "u => u",
        "strike => s",
        "del => s",
        "sub => sub",
        "sup => sup"
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

/* ============================================================
   CARGA DE ARCHIVO .PDF (v4.0 · unión geométrica segura de fragmentos)
   ============================================================
   Cambios v3.8 (sobre v3.7):
   ✅ FIX BULLET-SYMBOL: pdf.js devuelve caracteres de viñeta
      procedentes de fuentes de símbolos (Wingdings, Symbol,
      Monotype Sorts...) como caracteres Unicode de reemplazo,
      habitualmente el cuadrado blanco "□" (U+25A1) o el bullet
      de zona privada "\uF0B7". Antes NINGUNO de esos caracteres
      estaba en la lista de detección y el bullet pasaba
      desapercibido: los ítems se fusionaban en un único párrafo
      y la viñeta quedaba pegada al texto ("□Borde: ...").
      Ahora se reconocen todos los caracteres de viñeta
      habituales + los de zona privada de fuentes simbólicas.

   ✅ FIX BULLET-NO-SPACE: en muchos PDFs el glifo de viñeta va
      pegado a la primera palabra del ítem, sin espacio
      ("□Borde:"). El patrón antiguo exigía un espacio
      obligatorio tras el bullet. Ahora hay un segundo patrón
      específico para viñetas sin espacio.

   ✅ FIX BOLD-FONT-OBJ: pdf.js NO expone el nombre real de la
      fuente en `textContent.items[i].fontName` — expone un ID
      interno del tipo "g_d0_f1". Ese ID nunca contiene la
      palabra "bold", así que la heurística anterior jamás
      detectaba negritas reales. El nombre real y los flags
      `.bold` / `.black` están en el objeto font resuelto vía
      `page.commonObjs.get(fontName)`. Se pre-cargan los fonts
      de cada página con `await page.getOperatorList()` y se
      construye un `boldMap` antes de agrupar líneas.

   ✅ FIX BOLD-HYPHEN: la desguionización de palabras cortadas al
      final de línea ("infor- mación") también se aplica cuando
      el párrafo contiene tramos en negrita, gracias a un
      lookahead que salta las etiquetas inline intermedias.

   ✅ FIX HEADING-CE: los encabezados extraídos del PDF se
      emiten con `contenteditable="true"` en el div interno,
      para que el parche v6.7 los trate como bloques gestionados
      y Enter inserte un salto interno en vez de partirlos.

   ✅ FIX P-DATA: los párrafos extraídos del PDF se emiten con
      `data-editor-block="text"` para mantener coherencia con el
      resto del editor y con la exportación a Moodle.

   ✅ FIX HR-HUERFANO: ya no se inserta un <hr> entre páginas
      cuando la página no ha producido contenido real (portadas
      en blanco, páginas con solo cabecera/pie repetidos, etc.).

   ✅ FIX ISFIRSTPAGE: el flag isFirstPage se recalcula por
      página, evitando promociones espurias del primer título
      de la página 2 a H1.
   ============================================================ */

const PDF_BLACKLIST_LINES = [
  /^\s*instructor\s+sfb\s+.+$/i,
  /^\s*direcci[oó]n\s+general\s+de\s+emergencias\s*$/i,
  /^\s*cuerpo\s+de\s+bomberos\s+de\s+la\s+c\.?\s*m\.?\s*$/i,
  /^\s*curso\s+nuevo\s+ingreso\s+\d{4}\s*[-–]\s*\d{4}\s*$/i,
  /^\s*sfb\s+m[oó]dulo\s+0?\d+\s+.*$/i,
  /^\s*conceptos\s+b[aá]sicos\s+en\s+incendios\s+forestales\s*$/i,
  /^\s*operaciones\s+de\s+extinci[oó]n\s+de\s+incendios\s+forestales\s+i\s*$/i,
  /^\s*comunidad\s+de\s+madrid\s*$/i,
  /^\s*bomberos\s+c\.?\s*a\.?\s*m\.?\s*$/i,
  /^\s*centro\s+de\s+formaci[oó]n\s+.*$/i,
  /^\s*p[áa]gina\s+\d+\s*(de\s+\d+)?\s*$/i,
  /^\s*\d+\s*\/\s*\d+\s*$/,
  /^\s*\d+\s+de\s+\d+\s*$/,
  /^\s*©\s*.+$/,
  /^\s*todos\s+los\s+derechos\s+reservados\s*$/i,
  /^\s*m[oó]dulo\s+0?\d+\s+.*$/i,
  /^\s*operaciones\s+de\s+extinci[oó]n\s+de\s+incendios\s+forestales\s*$/i,
  /^\s*c\.?\s*o\.?\s*r\.?\s*p\.?\s*o\.?\s*$/i
];

function _pdfIsBlacklisted(text) {
  return PDF_BLACKLIST_LINES.some(rx => rx.test(text));
}

function _pdfIsPageNumber(text) {
  const t = String(text || '').trim();
  if (!t) return false;
  if (/^[\-–—\s]*\d{1,4}[\-–—\s]*$/.test(t)) return true;
  if (/^p[aá]g(?:ina)?\.?\s*\d+/i.test(t)) return true;
  return false;
}

function _pdfIsGarbageLine(text) {
  if (!text || text.length < 3) return false;
  if (text.trim().length <= 1) return true;
  const suspicious = (text.match(/[\u00A0-\u00BF\u00C0-\u00FF]/g) || []);
  const validES = (text.match(/[áéíóúüñÁÉÍÓÚÜÑ¿¡«»]/g) || []);
  const garbage = suspicious.length - validES.length;
  const letters = (text.match(/[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/g) || []).length;
  if (letters === 0) return text.length > 5;
  return garbage > letters * 0.4;
}

function _pdfNormalizeLine(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[\d]+/g, 'n')
    .replace(/[^a-záéíóúüñn\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ✅ FIX BOLD-FONT-OBJ · helper básico sobre fontName, usado como
// último recurso cuando el objeto font no está disponible.
function _pdfIsBoldFont(fontName) {
  if (!fontName) return false;
  return /(?:^|[\s,+_-])(bold|black|heavy|semibold|semi-bold|demibold|demi-bold|extrabold|extra-bold|ultrabold|ultra-bold)(?:$|[\s,+_-])/i.test(String(fontName))
      || /(bold|black|heavy|semibold|demibold|extrabold|ultrabold)/i.test(String(fontName));
}
function _pdfFontIsBold(font, fallbackName, styleInfo) {
  const candidates = [];
  if (fallbackName) candidates.push(fallbackName);
  if (font) {
    ['name','loadedName','fallbackName','fontFamily','baseFontName'].forEach(k => {
      if (typeof font[k] === 'string') candidates.push(font[k]);
    });
    if (font.bold === true || font.black === true) return true;
    if (font.fontWeight != null && parseInt(font.fontWeight, 10) >= 600) return true;
  }
  if (styleInfo) {
    ['fontFamily','fontWeight'].forEach(k => {
      if (styleInfo[k] != null) candidates.push(String(styleInfo[k]));
    });
  }
  if (candidates.some(_pdfIsBoldFont)) return true;
  if (font && (font.bold === false || font.black === false)) return false;
  return false;
}
function _pdfResolveFont(page, name) {
  return new Promise(resolve => {
    let settled = false;
    const finish = value => {
      if (settled) return;
      settled = true;
      resolve(value || null);
    };
    function tryStore(store) {
      if (!store || settled) return;
      try {
        const direct = store.get(name);
        if (direct) { finish(direct); return; }
      } catch(e) {}
      try { store.get(name, finish); } catch(e) {}
    }
    tryStore(page.commonObjs);
    tryStore(page.objs);
    setTimeout(() => finish(null), 800);
  });
}
async function _pdfBuildFontBoldMap(page, items, styles) {
  const names = new Set();
  (items || []).forEach(it => { if (it && it.fontName) names.add(it.fontName); });
  const map = new Map();
  for (const name of names) {
    const font = await _pdfResolveFont(page, name);
    const styleInfo = styles && styles[name] ? styles[name] : null;
    map.set(name, _pdfFontIsBold(font, name, styleInfo));
  }
  if (window.PDF_DEBUG) console.log('[PDF] Font map:', Array.from(map.entries()));
  return map;
}
// ✅ FIX BULLET-SYMBOL + FIX BULLET-NO-SPACE
// Lista de caracteres reconocidos como viñeta. Incluye:
//  · Bullets Unicode estándar (•·▪▫◦‣⁃●○◆◇▶▷…)
//  · Cuadrados de relleno "missing glyph" (□■◻◼◽◾❑❒)
//  · Ballot boxes y checkmarks (☐☑☒✓✔✗✘)
//  · Private Use Area de fuentes simbólicas (Symbol, Wingdings...):
//    \uF0B7, \uF0A7, \uF0FC, \uF076, \uF0D8, \uF0E8
const _PDF_BULLET_CHARS = [
  '\\u2022','\\u00b7','\\u25aa','\\u25ab','\\u25e6','\\u2023','\\u2043',
  '\\u25cf','\\u25cb','\\u25a0','\\u25a1','\\u25fb','\\u25fc','\\u25fd','\\u25fe',
  '\\u2751','\\u2752','\\u2610','\\u2611','\\u2612',
  '\\u2713','\\u2714','\\u2717','\\u2718',
  '\\u25c6','\\u25c7','\\u25b6','\\u25b7',
  '\\u25d8','\\u25d9','\\u2219',
  '\\uf0b7','\\uf0a7','\\uf0fc','\\uf076','\\uf0d8','\\uf0e8'
].join('');

const _PDF_BULLET_RE_SPACE   = new RegExp('^([' + _PDF_BULLET_CHARS + '])\\s+(.+)$');
const _PDF_BULLET_RE_NOSPACE = new RegExp('^([' + _PDF_BULLET_CHARS + '])(\\S.*)$');

function _pdfDetectBullet(text) {
  const t = String(text || '');
  if (!t) return null;

  // 1. Viñeta con espacio: "• texto" o "□ texto"
  let m = t.match(_PDF_BULLET_RE_SPACE);
  if (m) return { ordered: false, text: m[2].trim() };

  // 2. Viñeta pegada al texto: "•texto" o "□Borde: ..."
  //    (típico cuando pdf.js extrae un glifo de fuente simbólica
  //     y lo pega al primer carácter del ítem siguiente)
  m = t.match(_PDF_BULLET_RE_NOSPACE);
  if (m) return { ordered: false, text: m[2].trim() };

  // 3. Numerado: "1. texto" o "1) texto"
  m = t.match(/^(\d{1,2})[.)]\s+(.+)$/);
  if (m) return { ordered: true, text: m[2].trim() };

  // 4. Letra: "a) texto"
  m = t.match(/^([a-z])[.)]\s+(.+)$/);
  if (m) return { ordered: false, text: m[2].trim() };

  // 5. Guion con espacio obligatorio (para no cortar palabras tipo
  //    "well-known" cuando el guion va en medio del texto)
  m = t.match(/^[-–—*]\s+(.+)$/);
  if (m) return { ordered: false, text: m[1].trim() };

  return null;
}

function _pdfLooksLikeDefinitionLine(text) {
  const m = text.match(/^([A-ZÁÉÍÓÚÑ][a-záéíóúüñA-Z\s]{0,40}?)\s*:\s+(.+)$/);
  if (!m) return null;
  const head = m[1].trim();
  const body = m[2].trim();
  if (head.length < 3 || head.length > 45) return null;
  if (body.length < 15) return null;
  return { head, body };
}

// ✅ FIX BOLD-FONT-OBJ · _pdfGroupItemsIntoLines acepta opcionalmente
// un `boldMap` { fontName → bool } construido por _pdfBuildFontBoldMap.
// Si el map no trae el fontName, cae al heurístico por ID de fuente.
function _pdfGroupItemsIntoLines(items, medianHeight, boldMap) {
  const tolerance = Math.max(2.5, medianHeight * 0.38);
  const sorted = items.slice().sort((a, b) => {
    const ya = (a.transform && a.transform[5]) || 0;
    const yb = (b.transform && b.transform[5]) || 0;
    if (Math.abs(ya - yb) > tolerance) return yb - ya;
    return ((a.transform && a.transform[4]) || 0) - ((b.transform && b.transform[4]) || 0);
  });
  const groups = [];
  sorted.forEach(it => {
    const original = String(it.str || '');
    if (!original.trim()) return;
    const y = (it.transform && it.transform[5]) || 0;
    const x = (it.transform && it.transform[4]) || 0;
    const w = Math.abs(it.width || 0);
    const h = Math.abs(it.height || medianHeight);
    const bold = !!(boldMap && it.fontName && boldMap.get(it.fontName));
    let line = groups.find(g => Math.abs(g.y - y) <= tolerance);
    if (!line) {
      line = { y, height:h, parts:[] };
      groups.push(line);
    }
    line.height = Math.max(line.height, h);
    line.parts.push({ text:original, x, xEnd:x+w, width:w, bold });
  });
  groups.sort((a,b) => b.y-a.y);
  return groups.map(line => {
    line.parts.sort((a,b) => a.x-b.x);
    let text = '', html = '', xEnd = null;
    let boldChars = 0, visibleChars = 0;
    line.parts.forEach((part, idx) => {
      const raw = part.text.replace(/^\s+|\s+$/g, '');
      if (!raw) return;
      let sep = '';
      if (idx > 0) {
        const prev = line.parts[idx-1];
        const gap = part.x - (prev.xEnd || prev.x);
        const explicitSpace = /\s$/.test(prev.text) || /^\s/.test(part.text);
        const punctuationJoin = /^[,.;:!?%»)\]}]/.test(raw) || /[«¿¡([{/-]$/.test(text);

        // PDF.js puede dividir una misma palabra en dos fragmentos, por ejemplo
        // "P" + "lantas" o "l" + "os". Solo los unimos si el PDF NO
        // aporta un espacio explícito y la distancia geométrica es mínima.
        // Así se conserva correctamente "A efectos", "y otros", etc.
        const prevRaw = String(prev.text || '').trim();
        const singleLetterContinuation =
          !explicitSpace &&
          /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]$/.test(prevRaw) &&
          /^[a-záéíóúüñ]{2,}/.test(raw) &&
          gap <= Math.max(2.4, line.height * 0.18);

        if (!punctuationJoin && !singleLetterContinuation &&
            (explicitSpace || gap > Math.max(1.2, line.height * 0.09))) {
          sep = ' ';
        }
      }
      text += sep + raw;
      const safe = esc(raw);
      html += sep + (part.bold ? '<strong style="font-weight:700;">' + safe + '</strong>' : safe);
      const n = raw.replace(/\s/g,'').length;
      visibleChars += n;
      if (part.bold) boldChars += n;
      xEnd = Math.max(xEnd == null ? part.xEnd : xEnd, part.xEnd);
    });
    text = text.replace(/\s+/g,' ').replace(/\s+([,.;:!?%»)\]}])/g,'$1').replace(/([«¿¡([{])\s+/g,'$1').trim();
    html = html.replace(/ {2,}/g,' ').trim();
    return {
      y:line.y,
      x:line.parts.length ? line.parts[0].x : 0,
      xEnd:xEnd || 0,
      height:line.height,
      text,
      html,
      hasBold:boldChars > 0,
      mostlyBold:visibleChars > 0 && boldChars / visibleChars >= 0.65
    };
  }).filter(line => line.text);
}
function _pdfStripBulletFromHtml(html) {
  const box = document.createElement('div');
  box.innerHTML = html || '';
  const walker = document.createTreeWalker(box, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (!node.textContent || !node.textContent.trim()) continue;
    node.textContent = node.textContent
      .replace(new RegExp('^[\\s\\u00a0]*[' + _PDF_BULLET_CHARS + '][\\s\\u00a0]*'), '')
      .replace(/^[\s\u00a0]*\d{1,3}[.)][\s\u00a0]+/, '')
      .replace(/^[\s\u00a0]*[a-z][.)][\s\u00a0]+/i, '')
      .replace(/^[\s\u00a0]*[-–—*][\s\u00a0]+/, '');
    break;
  }
  return box.innerHTML.trim();
}
function _pdfClassifyHeading(text, height, medianHeight) {
  const t = String(text || '').trim();
  if (!t) return 0;
  const heightRatio = medianHeight > 0 ? height / medianHeight : 1;
  const len = t.length;

  const numMatch = t.match(/^(\d+(?:\.\d+)*)\.?\s+\S/);
  const numDepth = numMatch ? (numMatch[1].match(/\./g) || []).length : 0;

  const lettersArr = t.match(/[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/g) || [];
  const upperArr   = t.match(/[A-ZÁÉÍÓÚÜÑ]/g) || [];
  const upperRatio = lettersArr.length ? upperArr.length / lettersArr.length : 0;
  const isAllCaps  = upperRatio >= 0.8 && len <= 90;

  if (heightRatio >= 2.0 && len <= 90) return 1;
  if (heightRatio >= 1.5) {
    if (numDepth >= 2) return 4;
    if (numDepth === 1) return 3;
    if (isAllCaps) return 2;
    return 2;
  }
  if (heightRatio >= 1.2) {
    if (numDepth >= 2) return 4;
    if (numDepth === 1) return 3;
    if (isAllCaps) return 2;
    return 3;
  }
  if (numDepth >= 1 && len <= 80 && heightRatio >= 0.95) {
    if (numDepth >= 2) return 4;
    if (isAllCaps) return 2;
    return 3;
  }
  if (isAllCaps && len <= 60 && heightRatio >= 0.95) return 2;

  return 0;
}

function _pdfNumberingInfo(text) {
  const t = String(text || '').trim();
  const m = t.match(/^(\d+(?:\.\d+){0,5})\.?\s+(?=\S)/);
  return m ? { token:m[1], depth:m[1].split('.').length } : null;
}
function _pdfLooksLikeTocLine(text) {
  const t = String(text || '').trim();
  return /\.{4,}\s*\d{1,4}\s*$/.test(t) || /\s{3,}\d{1,4}\s*$/.test(t);
}
function _pdfMergeAdjacentStrong(html) {
  if (!html || html.indexOf('<strong') === -1) return html || '';
  const box = document.createElement('div'); box.innerHTML = html;
  let changed = true;
  while (changed) {
    changed = false;
    Array.from(box.querySelectorAll('strong')).forEach(left => {
      if (!left.parentNode) return;
      let node=left.nextSibling, spaces='';
      while (node && node.nodeType===3 && !node.textContent.trim()) { spaces+=node.textContent; node=node.nextSibling; }
      if (!node || node.nodeType!==1 || node.tagName!=='STRONG') return;
      if ((left.getAttribute('style')||'') !== (node.getAttribute('style')||'')) return;
      left.appendChild(document.createTextNode(spaces || ' '));
      while (node.firstChild) left.appendChild(node.firstChild);
      let cur=left.nextSibling;
      while (cur && cur!==node) { const next=cur.nextSibling; cur.remove(); cur=next; }
      node.remove(); changed=true;
    });
  }
  return box.innerHTML;
}
function _pdfRepairSplitTokens(text, html) {
  // La decisión de unir letras se toma antes, en _pdfGroupItemsIntoLines,
  // donde todavía disponemos de coordenadas y espacios explícitos del PDF.
  // Aquí no hacemos sustituciones lingüísticas globales, porque podrían
  // convertir expresiones válidas como "A efectos" en "Aefectos".
  return {
    text: String(text || ''),
    html: _pdfMergeAdjacentStrong(String(html || ''))
  };
}
function _pdfBuildBlocks(lines, medianHeight, medianLineGap) {
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const headingLevel = _pdfClassifyHeading(line.text, line.height, medianHeight);
    if (headingLevel > 0) {
      blocks.push({ type:'heading', level:headingLevel, height:line.height, text:line.text, html:line.html || esc(line.text) });
      i++;
      continue;
    }
    const bullet = _pdfDetectBullet(line.text);
    if (bullet) {
      const ordered = bullet.ordered;
      const baseX = line.x;
      const items = [{ text:bullet.text, html:_pdfStripBulletFromHtml(line.html || esc(line.text)) }];
      let j = i + 1;
      while (j < lines.length) {
        const next = lines[j];
        const nextBullet = _pdfDetectBullet(next.text);
        if (nextBullet) {
          if (nextBullet.ordered !== ordered) break;
          items.push({ text:nextBullet.text, html:_pdfStripBulletFromHtml(next.html || esc(next.text)) });
          j++;
          continue;
        }
        const nextHeading = _pdfClassifyHeading(next.text, next.height, medianHeight) > 0;
        const gap = lines[j-1].y - next.y;
        const isContinuation = !nextHeading && gap <= medianLineGap * 1.45 && next.x > baseX + Math.max(6, medianHeight * 0.35);
        if (!isContinuation) break;
        const last = items[items.length-1];
        const joinWithoutSpace = /-\s*$/.test(last.text) && /^[a-záéíóúüñ]/i.test(next.text);
        last.text = joinWithoutSpace ? last.text.replace(/-\s*$/,'') + next.text : last.text + ' ' + next.text;
        last.html = joinWithoutSpace ? last.html.replace(/-\s*$/,'') + (next.html || esc(next.text)) : last.html + ' ' + (next.html || esc(next.text));
        j++;
      }
      blocks.push({ type:'list', ordered, items });
      i = j;
      continue;
    }
    const def = _pdfLooksLikeDefinitionLine(line.text);
    if (def) {
      const defs = [{text:line.text, html:line.html || esc(line.text)}];
      let j = i + 1;
      while (j < lines.length && _pdfLooksLikeDefinitionLine(lines[j].text)) {
        defs.push({text:lines[j].text, html:lines[j].html || esc(lines[j].text)}); j++;
      }
      if (defs.length >= 3) { blocks.push({type:'list', ordered:false, items:defs}); i=j; continue; }
    }
    const paragraphLines = [line.text];
    const paragraphHtmls = [line.html || esc(line.text)];
    let j = i + 1;
    while (j < lines.length) {
      const next = lines[j];
      if (_pdfClassifyHeading(next.text, next.height, medianHeight) > 0 || _pdfDetectBullet(next.text) || _pdfLooksLikeDefinitionLine(next.text)) break;
      const gap = lines[j-1].y - next.y;
      if (gap > medianLineGap * 1.5) break;
      paragraphLines.push(next.text);
      paragraphHtmls.push(next.html || esc(next.text));
      j++;
    }
    const paragraphText = paragraphLines.join(' ').replace(/(\w)-\s+([a-záéíóúüñ])/gi,'$1$2');
    let paragraphHtml = paragraphHtmls.join(' ');
    paragraphHtml = paragraphHtml.replace(/([a-záéíóúüñ])-\s+(?=(?:<\/?(?:strong|em|b|i|u|span|sub|sup)[^>]*>)*[a-záéíóúüñ])/gi,'$1');
    const repaired = _pdfRepairSplitTokens(paragraphText, paragraphHtml);
    const tocCount = paragraphLines.filter(_pdfLooksLikeTocLine).length;
    if (tocCount >= 2) repaired.html = paragraphHtmls.map(_pdfMergeAdjacentStrong).join('<br>');
    blocks.push({type:'paragraph', text:repaired.text, html:repaired.html});
    i = j;
  }
  return blocks;
}
function _pdfPostProcessBlocks(blocks) {
  const out=[];
  (blocks||[]).forEach(block=>{
    if(block.type==='paragraph'){
      const bullet=_pdfDetectBullet(block.text);
      if(bullet){
        const item={text:bullet.text,html:_pdfStripBulletFromHtml(block.html||esc(block.text))};
        const prev=out[out.length-1];
        if(prev&&prev.type==='list'&&prev.ordered===bullet.ordered) prev.items.push(item);
        else out.push({type:'list',ordered:bullet.ordered,items:[item]});
        return;
      }
    }
    out.push(block);
  });
  return out;
}
function _pdfMergeConsecutiveHeadings(blocks) {
  const merged=[];
  for(let i=0;i<blocks.length;i++){
    const b=blocks[i];
    if(b.type==='heading'&&merged.length){
      const prev=merged[merged.length-1];
      const prevNum=_pdfNumberingInfo(prev.text), currNum=_pdfNumberingInfo(b.text);
      const distinct=prevNum&&currNum&&prevNum.token!==currNum.token;
      const adjacent=prev.type==='heading'&&Math.abs(prev.level-b.level)<=1;
      if(adjacent&&!distinct){
        const clean=/[.,;:!?]$/.test(prev.text.trim());
        const heightClose=Math.abs((prev.height||0)-(b.height||0))/Math.max(prev.height||1,b.height||1)<0.25;
        if(!clean&&heightClose){
          prev.text=(prev.text.trim()+' '+b.text.trim()).replace(/\s+/g,' ');
          prev.html=_pdfMergeAdjacentStrong((prev.html||esc(prev.text))+' '+(b.html||esc(b.text)));
          prev.height=Math.max(prev.height||0,b.height||0);
          if(b.level<prev.level) prev.level=b.level;
          continue;
        }
      }
    }
    merged.push({...b});
  }
  return merged;
}
/* ✅ Extracción de imágenes PDF robusta. */
async function _pdfExtractImages(page, pageNum) {
  const OPS = window.pdfjsLib && window.pdfjsLib.OPS;
  const DEBUG = !!window.PDF_DEBUG;
  if (!OPS) return { images: [], opCount: 0 };

  let ops;
  try { ops = await page.getOperatorList(); }
  catch(e) {
    if (DEBUG) console.warn('[PDF p' + pageNum + '] getOperatorList falló:', e);
    return { images: [], opCount: 0 };
  }

  const xobjNames = [];
  const inlineImgs = [];
  const seenNames = new Set();
  let opCount = 0;
  for (let i = 0; i < ops.fnArray.length; i++) {
    const fn = ops.fnArray[i];
    const args = ops.argsArray[i];
    if (!args || !args.length) continue;
    if (fn === OPS.paintImageXObject || fn === OPS.paintJpegXObject || fn === OPS.paintImageXObjectRepeat) {
      opCount++;
      const name = args[0];
      if (typeof name === 'string' && !seenNames.has(name)) {
        seenNames.add(name);
        xobjNames.push(name);
      }
    } else if (fn === OPS.paintInlineImageXObject) {
      opCount++;
      inlineImgs.push(args[0]);
    }
  }

  function getXObject(name, timeoutMs) {
    timeoutMs = timeoutMs || 3000;
    return new Promise(resolve => {
      let done = false;
      const finish = v => {
        if (done || !v) return;
        const hasData = v.data && v.data.length > 0;
        const hasBitmap = !!v.bitmap;
        if (hasData || hasBitmap) {
          done = true;
          resolve(v);
        }
      };
      try { page.objs.get(name, finish); } catch(e) {}
      try { page.commonObjs.get(name, finish); } catch(e) {}
      setTimeout(() => { if (!done) { done = true; resolve(null); } }, timeoutMs);
    });
  }

  const MIN_W = 80, MIN_H = 80, MAX_AR = 12;

  function toDataUrl(imgData) {
    if (!imgData || !imgData.width || !imgData.height) return null;
    if (imgData.width < MIN_W || imgData.height < MIN_H) {
      if (DEBUG) console.log('[PDF p' + pageNum + '] descartada por tamaño ' + imgData.width + '×' + imgData.height);
      return null;
    }
    const ar = imgData.width / imgData.height;
    if (ar > MAX_AR || ar < 1 / MAX_AR) {
      if (DEBUG) console.log('[PDF p' + pageNum + '] descartada por ratio ' + ar.toFixed(2));
      return null;
    }
    try {
      const canvas = document.createElement('canvas');
      const MAX_PDF_IMAGE_W = 1100;
      const scale = imgData.width > MAX_PDF_IMAGE_W ? MAX_PDF_IMAGE_W / imgData.width : 1;
      canvas.width  = Math.max(1, Math.round(imgData.width * scale));
      canvas.height = Math.max(1, Math.round(imgData.height * scale));
      const ctx = canvas.getContext('2d');

      if (imgData.bitmap) {
        ctx.drawImage(imgData.bitmap, 0, 0, canvas.width, canvas.height);
      } else if (imgData.data && imgData.data.length > 0) {
        const src = imgData.data;
        const nPix = imgData.width * imgData.height;
        const out = ctx.createImageData(imgData.width, imgData.height);
        const dst = out.data;
        if (src.length === nPix * 4) {
          dst.set(src);
        } else if (src.length === nPix * 3) {
          for (let p = 0, q = 0; p < src.length; p += 3, q += 4) {
            dst[q] = src[p]; dst[q+1] = src[p+1]; dst[q+2] = src[p+2]; dst[q+3] = 255;
          }
        } else if (src.length === nPix) {
          for (let p = 0, q = 0; p < src.length; p++, q += 4) {
            const v = src[p];
            dst[q] = v; dst[q+1] = v; dst[q+2] = v; dst[q+3] = 255;
          }
        } else {
          if (DEBUG) console.warn('[PDF p' + pageNum + '] formato desconocido len=' + src.length + ' pixeles=' + nPix);
          return null;
        }
        if (scale === 1) ctx.putImageData(out, 0, 0);
        else {
          const sourceCanvas=document.createElement('canvas');
          sourceCanvas.width=imgData.width; sourceCanvas.height=imgData.height;
          sourceCanvas.getContext('2d').putImageData(out,0,0);
          ctx.drawImage(sourceCanvas,0,0,canvas.width,canvas.height);
        }
      } else {
        if (DEBUG) console.log('[PDF p' + pageNum + '] objeto sin data ni bitmap');
        return null;
      }

      const dataUrl = canvas.toDataURL('image/jpeg', 0.76);
      return { dataUrl, width: imgData.width, height: imgData.height };
    } catch(e) {
      if (DEBUG) console.warn('[PDF p' + pageNum + '] excepción canvas:', e);
      return null;
    }
  }

  const images = [];
  for (const inline of inlineImgs) {
    const r = toDataUrl(inline);
    if (r) images.push(r);
  }
  const resolved = await Promise.all(xobjNames.map(n => getXObject(n)));
  for (const imgData of resolved) {
    const r = toDataUrl(imgData);
    if (r) images.push(r);
  }

  if (DEBUG) {
    console.log('[PDF p' + pageNum + '] ops=' + ops.fnArray.length +
      ' · xobj=' + xobjNames.length +
      ' · inline=' + inlineImgs.length +
      ' · resueltas=' + images.length +
      ' · opCount=' + opCount);
  }

  return { images, opCount };
}

/* ✅ Renderiza la página completa como JPEG para el fallback. */
async function _pdfRenderPageAsJpeg(page, scale, quality) {
  try {
    const viewport = page.getViewport({ scale: scale || 1.4 });
    const canvas = document.createElement('canvas');
    canvas.width  = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport }).promise;
    return canvas.toDataURL('image/jpeg', quality || 0.78);
  } catch(e) {
    if (window.PDF_DEBUG) console.warn('[PDF] render de página falló:', e);
    return null;
  }
}

/* ✅ FIX ESCUDOS · Elimina imágenes que aparecen en más del 50%
   de las páginas (típico de escudos/cabeceras).
   No toca las imágenes fallback (isFullPage). */
function _pdfFilterRepeatedImages(pagesData) {
  const DEBUG = !!window.PDF_DEBUG;
  const numPages = pagesData.length;
  if (numPages < 2) return pagesData;

  const hashCount = new Map();
  pagesData.forEach(page => {
    const seenOnPage = new Set();
    page.pageImages.forEach(img => {
      if (img.isFullPage) return;
      const h = _pdfSimpleHash(img.dataUrl);
      if (seenOnPage.has(h)) return;
      seenOnPage.add(h);
      hashCount.set(h, (hashCount.get(h) || 0) + 1);
    });
  });

  const threshold = Math.max(2, Math.floor(numPages * 0.5));
  const repeatedHashes = new Set();
  hashCount.forEach((count, h) => {
    if (count >= threshold) repeatedHashes.add(h);
  });

  if (repeatedHashes.size === 0) return pagesData;

  let removed = 0;
  pagesData.forEach(page => {
    const before = page.pageImages.length;
    page.pageImages = page.pageImages.filter(img => {
      if (img.isFullPage) return true;
      return !repeatedHashes.has(_pdfSimpleHash(img.dataUrl));
    });
    removed += (before - page.pageImages.length);
  });

  if (DEBUG) console.log('[PDF] Imágenes repetidas filtradas: ' + removed + ' (en ' + numPages + ' páginas)');
  return pagesData;
}

function _pdfSimpleHash(str) {
  if (!str) return '0';
  let h = 5381;
  const step = Math.max(1, Math.floor(str.length / 1500));
  for (let i = 0; i < str.length; i += step) {
    h = ((h << 5) + h) ^ str.charCodeAt(i);
    h = h & 0x7fffffff;
  }
  return h.toString(36) + '-' + str.length;
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

    // ── PASO 1 · Recolectar datos ─────────────────────────
    const pagesData = [];
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);

      // ✅ FIX BOLD-FONT-OBJ · pre-calentamos el cache de fuentes
      // llamando al operator list. pdf.js entonces envía al hilo
      // principal los objetos font con .bold / .black / .name.
      // La llamada es idempotente y cacheada, así que _pdfExtractImages
      // después no repite trabajo.
      try { await page.getOperatorList(); } catch(e) {}

      const viewport = page.getViewport({ scale: 1 });
      const textContent = await page.getTextContent();
      const items = textContent.items || [];

      // ✅ FIX BOLD-FONT-OBJ · resolvemos el boldMap para esta página
      // antes de agrupar las líneas. Ya podemos saber qué fontName
      // corresponde a una fuente realmente bold.
      const boldMap = await _pdfBuildFontBoldMap(page, items, textContent.styles || {});

      const heights = items.map(it => it.height || 0).filter(h => h > 0).sort((a,b) => a-b);
      const medianHeight = heights.length ? heights[Math.floor(heights.length / 2)] : 12;

      const lines = _pdfGroupItemsIntoLines(items, medianHeight, boldMap);

      const lineGaps = [];
      for (let k = 1; k < lines.length; k++) {
        const gap = lines[k-1].y - lines[k].y;
        if (gap > 0 && gap < 80) lineGaps.push(gap);
      }
      lineGaps.sort((a,b) => a-b);
      const medianLineGap = lineGaps.length
        ? lineGaps[Math.floor(lineGaps.length / 2)]
        : Math.max(medianHeight * 1.4, 12);

      const extraction = await _pdfExtractImages(page, pageNum);
      let pageImages = extraction.images;
      const opCount = extraction.opCount;

      let usedFallback = false;
      if (pageImages.length === 0 && opCount > 0) {
        if (window.PDF_DEBUG) {
          console.log('[PDF p' + pageNum + '] fallback: renderizando página completa (opCount=' + opCount + ')');
        }
        const fullPage = await _pdfRenderPageAsJpeg(page, 1.15, 0.72);
        if (fullPage) {
          pageImages = [{ dataUrl: fullPage, width: 0, height: 0, isFullPage: true }];
          usedFallback = true;
        }
      }

      pagesData.push({
        pageNum,
        viewportHeight: viewport.height,
        lines, medianHeight, medianLineGap,
        textChars: lines.reduce((a, l) => a + l.text.length, 0),
        pageImages,
        usedFallback
      });
    }

    // ✅ FIX ESCUDOS · Filtramos imágenes repetidas ANTES de construir el HTML
    _pdfFilterRepeatedImages(pagesData);

    // ── PASO 2 · Cabeceras/pies repetidos ─────────────────
    const lineFrequency = new Map();
    const lineTopFrequency = new Map();
    const lineBottomFrequency = new Map();
    pagesData.forEach(pd => {
      const seen = new Set();
      pd.lines.forEach(line => {
        const norm = _pdfNormalizeLine(line.text);
        if (!norm || norm.length < 4) return;
        if (!seen.has(norm)) {
          seen.add(norm);
          lineFrequency.set(norm, (lineFrequency.get(norm) || 0) + 1);
          const rel = pd.viewportHeight ? (line.y / pd.viewportHeight) : 0.5;
          if (rel > 0.90) lineTopFrequency.set(norm, (lineTopFrequency.get(norm) || 0) + 1);
          if (rel < 0.10) lineBottomFrequency.set(norm, (lineBottomFrequency.get(norm) || 0) + 1);
        }
      });
    });

    const freqThreshold = Math.max(2, Math.floor(numPages * 0.35));
    const posThreshold  = Math.max(2, Math.floor(numPages * 0.25));
    const repeatedLines = new Set();
    lineFrequency.forEach((c, n) => { if (c >= freqThreshold) repeatedLines.add(n); });
    lineTopFrequency.forEach((c, n) => { if (c >= posThreshold) repeatedLines.add(n); });
    lineBottomFrequency.forEach((c, n) => { if (c >= posThreshold) repeatedLines.add(n); });

    // ── PASO 3 · Construir HTML ───────────────────────────
    let html = '';
    let totalHeadings = 0, totalParagraphs = 0, totalImages = 0;
    let totalListItems = 0, totalRemoved = 0, totalFallback = 0;

    for (const pd of pagesData) {
      const { pageNum, lines, medianHeight, medianLineGap, textChars, pageImages, usedFallback } = pd;

      const filteredLines = lines.filter(line => {
        const norm = _pdfNormalizeLine(line.text);
        if (repeatedLines.has(norm)) { totalRemoved++; return false; }
        if (_pdfIsBlacklisted(line.text)) { totalRemoved++; return false; }
        if (_pdfIsPageNumber(line.text)) { totalRemoved++; return false; }
        if (_pdfIsGarbageLine(line.text)) { totalRemoved++; return false; }
        return true;
      });

      if (usedFallback && pageImages.length === 1 && pageImages[0].isFullPage) {
        html += buildImageHTML(pageImages[0].dataUrl, 'Vista de la página ' + pageNum, '100%') + '\n';
        totalImages++;
        totalFallback++;
        if (pageNum < numPages) {
          html += '<hr data-editor-block="text" style="' + EX.divider + ';max-width:' + EXPORT_CONTENT_MAX + ';width:100%;margin:16px auto;box-sizing:border-box;">\n';
        }
        continue;
      }

      // ✅ FIX ISFIRSTPAGE · solo la página 1 promueve el primer título a H1.
      const isFirstPage = (pageNum === 1);

      let blocks = _pdfBuildBlocks(filteredLines, medianHeight, medianLineGap);
      blocks = _pdfPostProcessBlocks(_pdfMergeConsecutiveHeadings(blocks));

      let pageHtml = '';
      blocks.forEach(block => {
        if (block.type === 'heading') {
          let lvl = block.level || 3;
          if (isFirstPage && pageHtml === '' && lvl <= 2 && block.text.length > 15) lvl = 1;
          const headingInner = block.html || esc(block.text);
          // ✅ FIX HEADING-CE · contenteditable=true en el div interno
          // para que el editor (parche v6.7) lo trate como bloque
          // gestionado y Enter inserte salto interno en lugar de
          // partir el bloque en dos.
          pageHtml += '<div data-editor-block="text" style="max-width:' + EXPORT_CONTENT_MAX + ';width:100%;margin:12px auto 8px auto;box-sizing:border-box;text-align:left;">'
                   + '<div style="' + EX['h' + lvl] + '" contenteditable="true">' + headingInner + '</div></div>\n';
          totalHeadings++;
        } else if (block.type === 'list') {
          const tag = block.ordered ? 'ol' : 'ul';
          const listStyle = tag === 'ul' ? EX.ul : EX.ol;
          const itemsHtml = block.items.map(it => {
            const itemHtml = typeof it === 'string' ? esc(it) : (it.html || esc(it.text || ''));
            return '<li style="' + EX.li + '">' + itemHtml + '</li>';
          }).join('');
          pageHtml += '<' + tag + ' data-editor-block="text" style="' + listStyle
                   + ';max-width:' + EXPORT_CONTENT_MAX + ';width:100%;margin:14px auto;box-sizing:border-box;">'
                   + itemsHtml + '</' + tag + '>\n';
          totalListItems += block.items.length;
        } else {
          const pInner = block.html || esc(block.text);
          // ✅ FIX P-DATA · data-editor-block="text" para coherencia
          // con el resto de bloques del editor y con la exportación.
          pageHtml += '<p data-editor-block="text" style="' + EX.p + '">' + pInner + '</p>\n';
          totalParagraphs++;
        }
      });

      if (pageImages.length) {
        // ⚠️ PENDIENTE (a implementar tras tu decisión):
        // aquí es donde iría la heurística de anchura recomendada
        // según aspect ratio + tamaño en píxeles. De momento todo a 100%.
        pageImages.forEach(img => {
          pageHtml += buildImageHTML(img.dataUrl, '', '100%') + '\n';
          totalImages++;
        });
      }

      // ✅ FIX HR-HUERFANO · solo emitimos separador si la página
      // aportó contenido real. Evita <hr> colgando tras portadas
      // en blanco o páginas con solo cabecera/pie repetidos.
      const hasContent = pageHtml.trim().length > 0;
      if (hasContent) html += pageHtml;
      if (hasContent && pageNum < numPages) {
        html += '<hr data-editor-block="text" style="' + EX.divider + ';max-width:' + EXPORT_CONTENT_MAX + ';width:100%;margin:16px auto;box-sizing:border-box;">\n';
      }
    }

    if (!html.trim()) {
      showToast('⚠️ No se encontró texto ni imágenes extraíbles en el PDF.', 6000);
      return;
    }

    appendHTMLToEditor(html);
    const parts = [];
    if (totalHeadings) parts.push(totalHeadings + ' título(s)');
    if (totalParagraphs) parts.push(totalParagraphs + ' párrafo(s)');
    if (totalListItems) parts.push(totalListItems + ' ítem(s) de lista');
    if (totalImages) parts.push(totalImages + ' imagen(es)');
    if (totalFallback) parts.push(totalFallback + ' página(s) renderizada(s)');
    if (totalRemoved) parts.push(totalRemoved + ' línea(s) descartada(s)');
    const summary = parts.length ? parts.join(' · ') : '';
    showToast('✅ ' + file.name + ' cargado · ' + numPages + ' página(s)' + (summary ? ' · ' + summary : ''), 7000);

  } catch (err) {
    console.error('Error procesando PDF:', err);
    showToast('❌ Error al procesar el PDF: ' + (err.message || err), 5000);
  }
}
