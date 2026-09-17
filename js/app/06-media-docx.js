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
   CARGA DE ARCHIVO .PDF (v3.7 · parches flujo PDF → Moodle)
   ============================================================
   Cambios v3.7 (sobre v3.6):
   ✅ FIX BULLET-1: los bullets sueltos (un solo ítem consecutivo)
      ya no se convierten en párrafo con el marcador "•" pegado al
      texto. Ahora siempre se emiten como <ul><li>…</li></ul>,
      aunque la lista tenga un único elemento.
   ✅ FIX BOLD-HYPHEN: la desguionización de palabras cortadas al
      final de línea también se aplica cuando el párrafo contiene
      negritas (<strong>) u otras marcas inline. Antes se perdía
      por completo en cualquier párrafo con al menos una negrita.
   ✅ FIX HEADING-CE: los encabezados extraídos del PDF se emiten
      con `contenteditable="true"` en el div interno. Sin esto no
      eran bloques gestionados por el editor (parche v6.7) y Enter
      los partía en dos bloques sueltos.
   ✅ FIX P-DATA: los párrafos extraídos del PDF se emiten con
      `data-editor-block="text"` para mantener coherencia con el
      resto del editor y con la exportación a Moodle.
   ✅ FIX HR-HUERFANO: ya no se inserta un <hr> de separación
      cuando la página no ha producido ningún contenido real
      (portadas en blanco, separadores vacíos, etc.).
   ✅ FIX ISFIRSTPAGE: el flag isFirstPage se recalcula por página
      según tenga o no contenido, evitando promociones espurias
      de títulos de la página 2 a H1.
   ✅ FIX CAPTION-FALLBACK: el pie de foto del render de página
      completa pierde el emoji y el "(imagen)" redundante.
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
  // ── Añadidos v3.6 ────────────────────────────────────────
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

// ✅ FIX BOLD · helper para detectar negritas por fuente
function _pdfIsBoldFont(fontName) {
  if (!fontName) return false;
  return /bold|black|heavy|semibold|demibold|extrabold|ultrabold/i.test(fontName);
}

// ✅ FIX ESCUDOS · hash simple y rápido para identificar imágenes repetidas
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

function _pdfDetectBullet(text) {
  let m = text.match(/^([•·▪▫◦‣⁃])\s+(.+)$/);
  if (m) return { ordered: false, text: m[2].trim() };
  m = text.match(/^(\d{1,2})[.)]\s+(.+)$/);
  if (m) return { ordered: true, text: m[2].trim() };
  m = text.match(/^([a-z])[.)]\s+(.+)$/);
  if (m) return { ordered: false, text: m[2].trim() };
  m = text.match(/^[-–—*]\s+(.+)$/);
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

// ✅ FIX BOLD · _pdfGroupItemsIntoLines ahora genera también `html`
//    con <strong> insertados en los fragmentos en negrita.
function _pdfGroupItemsIntoLines(items, medianHeight) {
  const tolerance = Math.max(3, medianHeight * 0.45);
  const sorted = items.slice().sort((a, b) => {
    const ya = (a.transform && a.transform[5]) || 0;
    const yb = (b.transform && b.transform[5]) || 0;
    if (Math.abs(ya - yb) > tolerance) return yb - ya;
    const xa = (a.transform && a.transform[4]) || 0;
    const xb = (b.transform && b.transform[4]) || 0;
    return xa - xb;
  });

  const lines = [];
  let current = null;

  sorted.forEach(it => {
    let rawText = it.str || '';
    if (!rawText) return;
    const hadLeading  = /^\s/.test(rawText);
    const hadTrailing = /\s$/.test(rawText);
    rawText = rawText.replace(/^\s+/, '').replace(/\s+$/, '');
    if (!rawText) return;

    const y = (it.transform && it.transform[5]) || 0;
    const x = (it.transform && it.transform[4]) || 0;
    const w = it.width || 0;
    const h = it.height || medianHeight;
    const bold = _pdfIsBoldFont(it.fontName);

    if (!current || Math.abs(current.y - y) > tolerance) {
      if (current) lines.push(current);
      current = {
        y, x, xStart: x, xEnd: x + w, height: h,
        parts: [{ text: rawText, hasLeading: hadLeading, hasTrailing: hadTrailing, gap: 0, bold }]
      };
    } else {
      const gap = x - current.xEnd;
      current.parts.push({ text: rawText, hasLeading: hadLeading, hasTrailing: hadTrailing, gap, bold });
      current.xEnd = Math.max(current.xEnd, x + w);
      current.height = Math.max(current.height, h);
    }
  });
  if (current) lines.push(current);

  return lines
    .map(l => {
      let text = '';
      let html = '';
      l.parts.forEach((p, idx) => {
        let sep = '';
        if (idx > 0) {
          const prev = l.parts[idx - 1];
          if (p.hasLeading || prev.hasTrailing) sep = ' ';
          else if (p.gap > (l.height || 12) * 0.15) sep = ' ';
        }
        text += sep + p.text;
        const escaped = esc(p.text);
        html += sep + (p.bold ? '<strong>' + escaped + '</strong>' : escaped);
      });
      // Limpieza del texto plano (para detección de encabezados, listas, etc.)
      text = text
        .replace(/\s+/g, ' ')
        .replace(/\s+([,.;:!?»)\]])/g, '$1')
        .replace(/([«¡¿(\[])\s+/g, '$1')
        .replace(/\s+'/g, "'")
        .trim();
      // Limpieza ligera del html (colapsar espacios duplicados entre tags)
      html = html.replace(/ {2,}/g, ' ').trim();
      return { y: l.y, x: l.xStart, xEnd: l.xEnd, height: l.height, text, html };
    })
    .filter(l => l.text);
}

// ✅ FIX BULLET-1 + FIX BOLD-HYPHEN
function _pdfBuildBlocks(lines, medianHeight, medianLineGap) {
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const text = line.text;

    const headingLevel = _pdfClassifyHeading(text, line.height, medianHeight);
    if (headingLevel > 0) {
      blocks.push({
        type: 'heading',
        level: headingLevel,
        height: line.height,
        text,
        html: line.html || esc(text)
      });
      i++;
      continue;
    }

    // ✅ FIX BULLET-1 · siempre se emite como lista, aunque haya 1 solo ítem.
    //    Antes, un único bullet caía al ramal de párrafo y dejaba el marcador
    //    "•" pegado al texto.
    const bullet = _pdfDetectBullet(text);
    if (bullet) {
      const ordered = bullet.ordered;
      const items = [bullet.text];
      let j = i + 1;
      while (j < lines.length) {
        const b2 = _pdfDetectBullet(lines[j].text);
        if (b2 && b2.ordered === ordered) { items.push(b2.text); j++; } else break;
      }
      blocks.push({ type: 'list', ordered, items });
      i = j;
      continue;
    }

    const def = _pdfLooksLikeDefinitionLine(text);
    if (def) {
      const items = [text];
      let j = i + 1;
      while (j < lines.length) {
        const def2 = _pdfLooksLikeDefinitionLine(lines[j].text);
        if (!def2) break;
        items.push(lines[j].text);
        j++;
      }
      if (items.length >= 3) {
        blocks.push({ type: 'list', ordered: false, items });
        i = j;
        continue;
      }
    }

    const paragraphLines = [text];
    const paragraphHtmls = [line.html || esc(text)];
    const paragraphHasBold = [line.parts ? line.parts.some(p => p.bold) : false];
    let j = i + 1;
    while (j < lines.length) {
      const nextLine = lines[j];
      const nextText = nextLine.text;
      const nextIsHeading = _pdfClassifyHeading(nextText, nextLine.height, medianHeight) > 0;
      const nextBullet = _pdfDetectBullet(nextText);
      const nextDef = _pdfLooksLikeDefinitionLine(nextText);

      if (nextIsHeading || nextBullet || nextDef) break;
      const gap = lines[j - 1].y - nextLine.y;
      if (gap > medianLineGap * 1.5) break;

      paragraphLines.push(nextText);
      paragraphHtmls.push(nextLine.html || esc(nextText));
      paragraphHasBold.push(nextLine.parts ? nextLine.parts.some(p => p.bold) : false);
      j++;
    }

    let paragraphText = paragraphLines.join(' ').replace(/(\w)-\s+([a-záéíóúüñ])/g, '$1$2');
    const anyBold = paragraphHasBold.some(b => b);

    // ✅ FIX BOLD-HYPHEN · la desguionización se aplica también al HTML
    //    cuando hay negritas, evitando que queden cosas como "infor- mación".
    //    El lookahead salta por las etiquetas inline que pueda haber entre
    //    el guion y la letra minúscula siguiente.
    let paragraphHtml;
    if (anyBold) {
      paragraphHtml = paragraphHtmls.join(' ');
      paragraphHtml = paragraphHtml.replace(
        /([a-záéíóúüñ])-\s+(?=(?:<\/?(?:strong|em|b|i|u|span|sub|sup)[^>]*>)*[a-záéíóúüñ])/gi,
        '$1'
      );
    } else {
      paragraphHtml = esc(paragraphText);
    }

    blocks.push({ type: 'paragraph', text: paragraphText, html: paragraphHtml });
    i = j;
  }

  return blocks;
}

function _pdfMergeConsecutiveHeadings(blocks) {
  const merged = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === 'heading' && merged.length) {
      const prev = merged[merged.length - 1];
      const sameOrAdjacent = prev.type === 'heading' && Math.abs(prev.level - b.level) <= 1;
      if (sameOrAdjacent) {
        const prevEndsClean = /[.,;:!?]$/.test(prev.text.trim());
        const heightClose = Math.abs((prev.height || 0) - (b.height || 0)) /
                            Math.max(prev.height || 1, b.height || 1) < 0.25;
        if (!prevEndsClean && heightClose) {
          prev.text = (prev.text.trim() + ' ' + b.text.trim()).replace(/\s+/g, ' ');
          prev.html = (prev.html || esc(prev.text)) + ' ' + (b.html || esc(b.text));
          prev.height = Math.max(prev.height || 0, b.height || 0);
          if (b.level < prev.level) prev.level = b.level;
          continue;
        }
      }
    }
    merged.push({ ...b });
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
      canvas.width  = imgData.width;
      canvas.height = imgData.height;
      const ctx = canvas.getContext('2d');

      if (imgData.bitmap) {
        ctx.drawImage(imgData.bitmap, 0, 0, imgData.width, imgData.height);
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
        ctx.putImageData(out, 0, 0);
      } else {
        if (DEBUG) console.log('[PDF p' + pageNum + '] objeto sin data ni bitmap');
        return null;
      }

      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
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
      const viewport = page.getViewport({ scale: 1 });
      const textContent = await page.getTextContent();
      const items = textContent.items || [];

      const heights = items.map(it => it.height || 0).filter(h => h > 0).sort((a,b) => a-b);
      const medianHeight = heights.length ? heights[Math.floor(heights.length / 2)] : 12;

      const lines = _pdfGroupItemsIntoLines(items, medianHeight);

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
        const fullPage = await _pdfRenderPageAsJpeg(page, 1.4, 0.78);
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
        // ✅ FIX CAPTION-FALLBACK · caption limpio, sin emoji ni "(imagen)"
        html += buildImageHTML(pageImages[0].dataUrl, 'Vista de la página ' + pageNum, '100%') + '\n';
        totalImages++;
        totalFallback++;
        // ✅ FIX HR-HUERFANO · solo añadimos <hr> si no es la última página
        if (pageNum < numPages) {
          html += '<hr data-editor-block="text" style="' + EX.divider + ';max-width:' + EXPORT_CONTENT_MAX + ';width:100%;margin:16px auto;box-sizing:border-box;">\n';
        }
        continue;
      }

      // ✅ FIX ISFIRSTPAGE · el flag se recalcula por página según contenido real
      const isFirstPage = (pageNum === 1);

      let blocks = _pdfBuildBlocks(filteredLines, medianHeight, medianLineGap);
      blocks = _pdfMergeConsecutiveHeadings(blocks);

      let pageHtml = '';
      blocks.forEach(block => {
        if (block.type === 'heading') {
          let lvl = block.level || 3;
          if (isFirstPage && pageHtml === '' && lvl <= 2 && block.text.length > 15) lvl = 1;
          const headingInner = block.html || esc(block.text);
          // ✅ FIX HEADING-CE · contenteditable=true en el div interno,
          //    para que el editor lo trate como bloque gestionado (v6.7)
          //    y Enter inserte salto interno en vez de partir el bloque.
          pageHtml += '<div data-editor-block="text" style="max-width:' + EXPORT_CONTENT_MAX + ';width:100%;margin:12px auto 8px auto;box-sizing:border-box;text-align:left;">'
                   + '<div style="' + EX['h' + lvl] + '" contenteditable="true">' + headingInner + '</div></div>\n';
          totalHeadings++;
        } else if (block.type === 'list') {
          const tag = block.ordered ? 'ol' : 'ul';
          const listStyle = tag === 'ul' ? EX.ul : EX.ol;
          const itemsHtml = block.items.map(it => '<li style="' + EX.li + '">' + esc(it) + '</li>').join('');
          pageHtml += '<' + tag + ' data-editor-block="text" style="' + listStyle
                   + ';max-width:' + EXPORT_CONTENT_MAX + ';width:100%;margin:14px auto;box-sizing:border-box;">'
                   + itemsHtml + '</' + tag + '>\n';
          totalListItems += block.items.length;
        } else {
          const pInner = block.html || esc(block.text);
          // ✅ FIX P-DATA · data-editor-block="text" para coherencia con el editor
          pageHtml += '<p data-editor-block="text" style="' + EX.p + '">' + pInner + '</p>\n';
          totalParagraphs++;
        }
      });

      if (pageImages.length) {
        pageImages.forEach(img => {
          pageHtml += buildImageHTML(img.dataUrl, 'Imagen', '100%') + '\n';
          totalImages++;
        });
      }

      // ✅ FIX HR-HUERFANO · solo añadimos el bloque y el <hr> si la página
      //    ha producido contenido real. Portadas vacías o páginas en blanco
      //    ya no generan separadores huérfanos.
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
