/* ============================================================
   GENERADOR DE CUADROS DE COLOR · CBCM
   Inserta cuadros con texto editable y 6 colores disponibles.
   ============================================================ */
(function(){
  'use strict';

  if (window.__cuadrosColorInit) return;
  window.__cuadrosColorInit = true;

  const TIPOS = {
    negro:    { bg: '#111827', border: '#000000', title: '#ffffff', text: '#f9fafb' },
    gris:     { bg: '#f3f4f6', border: '#6b7280', title: '#374151', text: '#1f2937' },
    rojo:     { bg: '#fff1f2', border: '#C0272D', title: '#9b1e23', text: '#7f1d1d' },
    amarillo: { bg: '#fffbeb', border: '#f59e0b', title: '#92400e', text: '#78350f' },
    verde:    { bg: '#ecfdf5', border: '#10b981', title: '#065f46', text: '#064e3b' },
    azul:     { bg: '#eff6ff', border: '#3b82f6', title: '#1e3a8a', text: '#1e40af' }
  };

  function buildCuadroHTML(tipo){
    const cfg = TIPOS[tipo] || TIPOS.gris;
    // Textos por defecto que el usuario podrá editar directamente en el editor
    const tituloDefecto = 'Escribe el título aquí';
    const textoDefecto = 'Escribe el texto aquí';

    return '<div data-editor-block="cuadro-' + tipo + '" style="display:block;width:100%;max-width:800px;margin:16px auto;box-sizing:border-box;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background-color:' + cfg.bg + ';border-left:6px solid ' + cfg.border + ';color:' + cfg.text + ';padding:14px 20px;border-radius:0 8px 8px 0;box-shadow:0 3px 12px rgba(15,23,42,.08);line-height:1.7;overflow-wrap:anywhere;">' +
      '<div style="font-weight:900;font-size:16px;line-height:1.4;margin-bottom:6px;color:' + cfg.title + ';">' + tituloDefecto + '</div>' +
      '<div style="font-size:15px;line-height:1.75;color:' + cfg.text + ';">' + textoDefecto + '</div>' +
      '</div>';
  }

  function insertarCuadro(tipo){
    const html = buildCuadroHTML(tipo);
    const fn = window.insertHTMLAtCursor ||
      (typeof insertHTMLAtCursor === 'function' ? insertHTMLAtCursor : null);

    if (!fn) {
      alert('No se encontró insertHTMLAtCursor. Comprueba que el editor está cargado.');
      return;
    }

    fn(html);
    closeCuadrosModal();

    if (typeof window.showToast === 'function') {
      window.showToast('✅ Caja insertada. Haz clic en el texto para editarlo.');
    }
  }

  function ensureModal(){
    if (document.getElementById('cuadrosColorModal')) return;

    const wrap = document.createElement('div');
    wrap.id = 'cuadrosColorModal';
    wrap.className = 'modal-overlay';
    wrap.innerHTML = `
      <div class="modal" style="max-width:420px;">
        <div class="modal-hdr" style="background:#f8fafc;border-bottom:2px solid #cbd5e1;">
          <span style="color:#334155;font-weight:800;">🎨 Elige el color de la caja</span>
          <button class="modal-close" onclick="closeCuadrosModal()">✕</button>
        </div>
        <div class="modal-pad" style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center; padding:24px 16px;">
          <button type="button" class="modal-btn" onclick="insertarCuadro('negro')" style="background:#111827; color:#fff; border:none; flex:1 1 40%; padding:12px; font-size:14px; border-radius:8px; cursor:pointer;">⬛ Negro</button>
          <button type="button" class="modal-btn" onclick="insertarCuadro('gris')" style="background:#f3f4f6; color:#374151; border:1px solid #d1d5db; flex:1 1 40%; padding:12px; font-size:14px; border-radius:8px; cursor:pointer;">⬜ Gris</button>
          <button type="button" class="modal-btn" onclick="insertarCuadro('rojo')" style="background:#fff1f2; color:#9b1e23; border:1px solid #fecdd3; flex:1 1 40%; padding:12px; font-size:14px; border-radius:8px; cursor:pointer;">🟥 Rojo</button>
          <button type="button" class="modal-btn" onclick="insertarCuadro('amarillo')" style="background:#fffbeb; color:#92400e; border:1px solid #fde68a; flex:1 1 40%; padding:12px; font-size:14px; border-radius:8px; cursor:pointer;">🟨 Amarillo</button>
          <button type="button" class="modal-btn" onclick="insertarCuadro('verde')" style="background:#ecfdf5; color:#065f46; border:1px solid #a7f3d0; flex:1 1 40%; padding:12px; font-size:14px; border-radius:8px; cursor:pointer;">🟩 Verde</button>
          <button type="button" class="modal-btn" onclick="insertarCuadro('azul')" style="background:#eff6ff; color:#1e3a8a; border:1px solid #bfdbfe; flex:1 1 40%; padding:12px; font-size:14px; border-radius:8px; cursor:pointer;">🟦 Azul</button>
        </div>
      </div>`;

    document.body.appendChild(wrap);

    // Cerrar al hacer clic fuera
    wrap.addEventListener('click', function(e){
      if (e.target === wrap) closeCuadrosModal();
    });
  }

  window.openCuadrosModal = function(){
    if (typeof window.captureEditorCursor === 'function') {
      window.captureEditorCursor();
    }
    ensureModal();
    document.getElementById('cuadrosColorModal').classList.add('open');
  };

  window.closeCuadrosModal = function(){
    const modal = document.getElementById('cuadrosColorModal');
    if (modal) modal.classList.remove('open');
  };

  window.insertarCuadro = insertarCuadro;

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') window.closeCuadrosModal();
  });
})();
