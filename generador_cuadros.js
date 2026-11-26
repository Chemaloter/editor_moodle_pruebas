/* ============================================================
   GENERADOR DE CUADROS DE COLOR · CBCM
   Añade un generador versátil de cuadros con 6 colores.
   ============================================================ */
(function(){
  'use strict';

  if (window.__cuadrosColorInit) return;
  window.__cuadrosColorInit = true;

  const TIPOS = {
    negro: {
      label: '⬛ Negro',
      bg: '#111827',
      border: '#000000',
      title: '#ffffff',
      text: '#f9fafb'
    },
    gris: {
      label: '⬜ Gris',
      bg: '#f3f4f6',
      border: '#6b7280',
      title: '#374151',
      text: '#1f2937'
    },
    rojo: {
      label: '🟥 Rojo',
      bg: '#fff1f2',
      border: '#C0272D',
      title: '#9b1e23',
      text: '#7f1d1d'
    },
    amarillo: {
      label: '🟨 Amarillo',
      bg: '#fffbeb',
      border: '#f59e0b',
      title: '#92400e',
      text: '#78350f'
    },
    verde: {
      label: '🟩 Verde',
      bg: '#ecfdf5',
      border: '#10b981',
      title: '#065f46',
      text: '#064e3b'
    },
    azul: {
      label: '🟦 Azul',
      bg: '#eff6ff',
      border: '#3b82f6',
      title: '#1e3a8a',
      text: '#1e40af'
    }
  };

  function esc(s){
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function br(s){
    return esc(s).replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n/g, '<br>');
  }

  function byId(id){
    return document.getElementById(id);
  }

  function val(id){
    const el = byId(id);
    return el ? el.value.trim() : '';
  }

  function buildCuadroHTML(tipo, titulo, texto){
    const cfg = TIPOS[tipo] || TIPOS.gris;
    const t = String(titulo || '').trim();
    const body = br(texto);

    if (!t && !body) return '';

    const titleHtml = t
      ? '<div style="font-weight:900;font-size:16px;line-height:1.4;margin-bottom:6px;color:' + cfg.title + ';">' + esc(t) + '</div>'
      : '';

    const bodyHtml = body
      ? '<div style="font-size:15px;line-height:1.75;color:' + cfg.text + ';">' + body + '</div>'
      : '';

    // Bloque HTML con estilos en línea para que Moodle lo respete
    return '<div data-editor-block="cuadro-' + tipo + '" style="display:block;width:100%;max-width:800px;margin:16px auto;box-sizing:border-box;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background-color:' + cfg.bg + ';border-left:6px solid ' + cfg.border + ';color:' + cfg.text + ';padding:14px 20px;border-radius:0 8px 8px 0;box-shadow:0 3px 12px rgba(15,23,42,.08);line-height:1.7;overflow-wrap:anywhere;">' +
      titleHtml +
      bodyHtml +
      '</div>';
  }

  function insertarCuadro(){
    const tipo = val('cq-tipo') || 'gris';
    const titulo = val('cq-titulo');
    const texto = val('cq-texto');
    const html = buildCuadroHTML(tipo, titulo, texto);

    if (!html) {
      alert('Escribe al menos un título o un texto para el cuadro.');
      return;
    }

    const fn = window.insertHTMLAtCursor ||
      (typeof insertHTMLAtCursor === 'function' ? insertHTMLAtCursor : null);

    if (!fn) {
      alert('No se encontró insertHTMLAtCursor. Comprueba que el editor está cargado.');
      return;
    }

    fn(html);
    closeCuadrosModal();

    if (typeof window.showToast === 'function') {
      window.showToast('✅ Cuadro de color insertado');
    }
  }

  function ensureModal(){
    if (byId('cuadrosColorModal')) return;

    const wrap = document.createElement('div');
    wrap.id = 'cuadrosColorModal';
    wrap.className = 'modal-overlay'; // Usa la clase de tus modales existentes
    wrap.innerHTML = `
      <div class="modal" style="max-width:500px;">
        <div class="modal-hdr" style="background:#f8fafc;border-bottom:2px solid #cbd5e1;">
          <span style="color:#334155;font-weight:800;">🎨 Insertar cuadro de color</span>
          <button class="modal-close" id="cq-close">✕</button>
        </div>
        <div class="modal-pad" style="gap:14px;">
          <div>
            <label class="modal-label">Color del cuadro</label>
            <select id="cq-tipo" class="modal-input">
              ${Object.keys(TIPOS).map(k => '<option value="' + k + '">' + TIPOS[k].label + '</option>').join('')}
            </select>
          </div>
          <div>
            <label class="modal-label">Título (opcional)</label>
            <input id="cq-titulo" class="modal-input" type="text" placeholder="Ej.: IMPORTANTE · Antes de continuar">
          </div>
          <div>
            <label class="modal-label">Texto del cuadro</label>
            <textarea id="cq-texto" class="modal-input" style="min-height:120px;resize:vertical;font-family:inherit;padding:10px;" placeholder="Escribe aquí el contenido..."></textarea>
          </div>
          <div class="modal-btns">
            <button type="button" class="modal-btn modal-btn-gray" id="cq-cancel">Cancelar</button>
            <button type="button" class="modal-btn modal-btn-red" id="cq-insert">Insertar cuadro</button>
          </div>
        </div>
      </div>`;

    document.body.appendChild(wrap);

    byId('cq-close').onclick = closeCuadrosModal;
    byId('cq-cancel').onclick = closeCuadrosModal;
    byId('cq-insert').onclick = insertarCuadro;

    wrap.addEventListener('click', function(e){
      if (e.target === wrap) closeCuadrosModal();
    });
  }

  function openCuadrosModal(tipo){
    if (typeof window.captureEditorCursor === 'function') {
      window.captureEditorCursor();
    }
    ensureModal();
    const modal = byId('cuadrosColorModal');
    
    // Si se pasa un tipo válido lo selecciona, si no, deja el primero o gris por defecto
    if (byId('cq-tipo')) {
        byId('cq-tipo').value = TIPOS[tipo] ? tipo : 'gris';
    }
    if (byId('cq-titulo')) byId('cq-titulo').value = '';
    if (byId('cq-texto')) byId('cq-texto').value = '';
    
    modal.classList.add('open');
    setTimeout(() => { if (byId('cq-titulo')) byId('cq-titulo').focus(); }, 100);
  }

  function closeCuadrosModal(){
    const modal = byId('cuadrosColorModal');
    if (modal) modal.classList.remove('open');
  }

  window.openCuadrosModal = openCuadrosModal;
  window.closeCuadrosModal = closeCuadrosModal;

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeCuadrosModal();
  });
})();
