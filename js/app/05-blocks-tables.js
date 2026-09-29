// ══════════════════════════════════════════════════════════════
//  BLOQUES DE ELEMENTOS
// ══════════════════════════════════════════════════════════════
const BLOCK_CFG = {
  h1:     { defaultText:'Título del módulo' },
  h2:     { defaultText:'Subtítulo de sección' },
  h3:     { defaultText:'Apartado' },
  h4:     { defaultText:'Subapartado' },
  body:   { defaultText:'Escribe aquí el texto del párrafo.' },
  goal:   { defaultText:'🎯 Al finalizar esta unidad, el bombero será capaz de identificar y aplicar correctamente el protocolo de actuación en...' },
  think:  { defaultText:'🤔 Antes de continuar, reflexiona: ¿cómo actuarías ante un incendio con baja visibilidad y salidas bloqueadas?' },
  note:   { defaultText:'⚠️ IMPORTANTE: Este procedimiento solo debe ejecutarse con el equipo de protección individual (EPI) completo y homologado.' },
  info:   { defaultText:'ℹ️ Información adicional: según el protocolo del CEIS, en situaciones de riesgo eléctrico se debe mantener una distancia mínima de seguridad de...' },
  tip:    { defaultText:'💡 Consejo práctico: durante los ejercicios de ventilación táctica, comprueba siempre la dirección del viento antes de abrir nuevas vías de entrada de aire.' },
  step:   { defaultText:'🔢 Paso 1: Evalúa el perímetro exterior del inmueble antes de acceder al interior.' },
  quote:    { defaultText:'«La seguridad no es un procedimiento, es una actitud.»' },
  extra:    { defaultText:'📚 Para ampliar conocimientos sobre este tema, consulta el Manual de Intervención en Incendios Estructurales del CEIS Madrid.' },
  practice: { defaultText:'🛠️ Práctica: Realiza el siguiente ejercicio siguiendo los pasos indicados por el instructor.' },
  divider:{ isSep:true },
  list:   { isList:true },
  def:    { isDef:true },
  sequence: { isSequence:true },
  // ── GRUPO B · Componentes HTML/CSS puros (compatibles con Moodle) ──
  acordeon: { isAcordeon:true },
  timeline: { isTimeline:true },
  checklist:{ isChecklist:true },
  progreso: { isProgreso:true }
};

// ══════════════════════════════════════════════════════════════
//  SECCIONES / SUBSECCIONES MOODLE
//  Genera H1–H4 con la estructura EXACTA de plantilla.txt.
//  Ancladas a la IZQUIERDA del editor (no respetan retícula 800/1000).
// ══════════════════════════════════════════════════════════════
const SECCIONES_CFG = {
  h1: { defaultText: '🚒 [ESCRIBE AQUÍ EL TEXTO H1]' },
  h2: { defaultText: '⛑️ [ESCRIBE AQUÍ EL TEXTO H2]' },
  h3: { defaultText: '🪓 [ESCRIBE AQUÍ EL TEXTO H3]' },
  h4: { defaultText: '🔥 [ESCRIBE AQUÍ EL TEXTO H4]' }
};

function openSeccionesModal() {
  if (typeof captureEditorCursor === 'function') captureEditorCursor();
  const modal = document.getElementById('seccionesModal');
  if (modal) modal.classList.add('open');
}

function closeSeccionesModal() {
  const modal = document.getElementById('seccionesModal');
  if (modal) modal.classList.remove('open');
}

function insertSeccion(tipo) {
  const cfg = SECCIONES_CFG[tipo];
  if (!cfg) return;
  if (typeof saveBlockUndo === 'function') saveBlockUndo();

  const innerStyle = (typeof EX !== 'undefined' && EX[tipo]) ? EX[tipo] : '';

  const html =
    '<div class="moodle-seccion-block" data-editor-block="text" ' +
    'style="width:100%;margin:14px 0;box-sizing:border-box;text-align:left;">' +
      '<div style="' + innerStyle + '" contenteditable="true">' +
        esc(cfg.defaultText) +
      '</div>' +
    '</div>';

  if (typeof insertHTMLAtCursor === 'function') {
    insertHTMLAtCursor(html);
  }
  closeSeccionesModal();

  setTimeout(() => {
    if (typeof refreshOutput === 'function') refreshOutput();
  }, 0);
}

(function bindSeccionesModal() {
  const modal = document.getElementById('seccionesModal');
  if (!modal) return;
  modal.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'seccionesModal') {
      closeSeccionesModal();
      return;
    }
    const item = e.target.closest && e.target.closest('.seccion-item');
    if (item) {
      const tipo = item.getAttribute('data-seccion');
      if (tipo) insertSeccion(tipo);
    }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeSeccionesModal();
  });
})();

// ══════════════════════════════════════════════════════════════
//  GRUPO B · CONSTRUCTORES DE COMPONENTES HTML/CSS PUROS
// ══════════════════════════════════════════════════════════════

const _GRUPOB_FONT = "Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif";

// ── 1 · Acordeón / FAQ con <details> + <summary> ──
function buildAcordeon() {
  const raw = prompt("¿Cuántas preguntas tendrá el acordeón? (1–20)", "3");
  if (raw === null) return '';
  const n = Math.max(1, Math.min(20, parseInt(raw, 10) || 3));
  const items = [];
  for (let i = 1; i <= n; i++) {
    items.push(
      '<details style="background:#ffffff;border:1px solid #e4e7ec;border-left:5px solid #C0272D;border-radius:0 8px 8px 0;margin-bottom:10px;overflow:hidden;">' +
        '<summary style="cursor:pointer;padding:14px 18px;font-family:' + _GRUPOB_FONT + ';font-size:15px;font-weight:700;color:#6b1215;background:#fff7f7;list-style:none;">' +
          '<span style="display:inline-block;width:22px;color:#C0272D;font-weight:800;">▶</span>' +
          '<span contenteditable="true" style="outline:none;">Pregunta ' + i + '</span>' +
        '</summary>' +
        '<div style="padding:14px 18px;font-family:' + _GRUPOB_FONT + ';font-size:15px;line-height:1.7;color:#2d2d2d;">' +
          '<span contenteditable="true" style="outline:none;">Respuesta ' + i + '.</span>' +
        '</div>' +
      '</details>'
    );
  }
  return '<div data-editor-block="text" style="max-width:800px;width:100%;margin:16px auto;box-sizing:border-box;">' +
    items.join('') +
    '</div>';
}

// ── 2 · Timeline vertical con dots y línea CSS ──
function buildTimeline() {
  const raw = prompt("¿Cuántos hitos tendrá la línea de tiempo? (1–20)", "3");
  if (raw === null) return '';
  const n = Math.max(1, Math.min(20, parseInt(raw, 10) || 3));
  const milestones = [];
  for (let i = 1; i <= n; i++) {
    milestones.push(
      '<div style="position:relative;margin-bottom:24px;">' +
        '<div style="position:absolute;left:-24px;top:4px;width:16px;height:16px;border-radius:50%;background:#C0272D;box-shadow:0 0 0 2px #ffffff;box-sizing:border-box;"></div>' +
        '<div style="font-family:' + _GRUPOB_FONT + ';font-size:12px;font-weight:800;color:#C0272D;text-transform:uppercase;letter-spacing:.7px;">FASE ' + i + '</div>' +
        '<div contenteditable="true" style="outline:none;font-family:' + _GRUPOB_FONT + ';font-size:16px;font-weight:700;color:#1f2937;margin:4px 0 6px 0;">Título del hito ' + i + '</div>' +
        '<div contenteditable="true" style="outline:none;font-family:' + _GRUPOB_FONT + ';font-size:15px;line-height:1.7;color:#2d2d2d;">Descripción del hito ' + i + '.</div>' +
      '</div>'
    );
  }
  return '<div data-editor-block="text" style="max-width:800px;width:100%;margin:24px auto;box-sizing:border-box;position:relative;padding-left:32px;">' +
    '<div style="position:absolute;left:14px;top:8px;bottom:8px;width:2px;background:#e4e7ec;"></div>' +
    milestones.join('') +
    '</div>';
}

// ── 3 · Etiquetas de estado (chips) — selección múltiple ──
// El botón del toolbar abre un modal donde se pueden marcar VARIAS
// etiquetas a la vez y se insertan todas juntas en la MISMA línea.
// Los presets están orientados a la formación de bomberos del CBCM.
const ETIQUETAS_PRESETS = [
  { grupo:'Estado', items:[
    { texto:'NUEVO',       bg:'#C0272D' },
    { texto:'ACTUALIZADO', bg:'#16a34a' },
    { texto:'COMPLETADO',  bg:'#16a34a' },
    { texto:'PENDIENTE',   bg:'#6b7280' }
  ]},
  { grupo:'Obligatoriedad', items:[
    { texto:'OBLIGATORIO', bg:'#C0272D' },
    { texto:'RECOMENDADO', bg:'#d97706' },
    { texto:'OPCIONAL',    bg:'#6b7280' }
  ]},
  { grupo:'Nivel', items:[
    { texto:'BÁSICO',      bg:'#16a34a' },
    { texto:'INTERMEDIO',  bg:'#d97706' },
    { texto:'AVANZADO',    bg:'#b91c1c' }
  ]},
  { grupo:'Formato', items:[
    { texto:'VÍDEO',       bg:'#7c3aed' },
    { texto:'PDF',         bg:'#b91c1c' },
    { texto:'LECTURA',     bg:'#6b7280' },
    { texto:'PRÁCTICA',    bg:'#0f766e' },
    { texto:'TEST',        bg:'#1d4ed8' }
  ]},
  { grupo:'Seguridad', items:[
    { texto:'PELIGRO',     bg:'#b91c1c' },
    { texto:'PRECAUCIÓN',  bg:'#d97706' },
    { texto:'SEGURO',      bg:'#15803d' }
  ]},
  { grupo:'Institucional', items:[
    { texto:'CBCM',            bg:'#7a1515' },
    { texto:'ÁREA FORMACIÓN',  bg:'#7a1515' },
    { texto:'RECICLAJE',       bg:'#ea580c' }
  ]}
];

let _etiqSeleccion = []; // [{texto, bg}]

function _buildEtiquetaSpan(texto, bg) {
  return '<span contenteditable="true" style="outline:none;display:inline-block;background:' + bg + ';color:#ffffff;padding:6px 16px;border-radius:999px;font-family:' + _GRUPOB_FONT + ';font-size:12px;font-weight:800;letter-spacing:.6px;text-transform:uppercase;">' + esc(texto) + '</span>';
}

function _buildEtiquetasWrapper(items) {
  // Un ÚNICO wrapper flex para todas las etiquetas -> misma línea.
  const spans = items.map(function(it){ return _buildEtiquetaSpan(it.texto, it.bg); }).join('');
  return '<div data-editor-block="text" style="max-width:800px;width:100%;margin:14px auto;box-sizing:border-box;display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-start;align-items:center;">' + spans + '</div>';
}

function _etiqKey(it) { return it.texto + '|' + it.bg; }

function _renderEtiqSelectionUI() {
  const root = document.getElementById('etiquetasModalBody');
  const countEl = document.getElementById('etiqSelectedCount');
  const insertBtn = document.getElementById('etiqInsertAll');
  if (countEl) countEl.textContent = String(_etiqSeleccion.length);
  if (insertBtn) insertBtn.disabled = _etiqSeleccion.length === 0;
  if (!root) return;
  const selected = new Set(_etiqSeleccion.map(_etiqKey));
  root.querySelectorAll('.etiq-chip').forEach(function(btn){
    const key = btn.getAttribute('data-texto') + '|' + btn.getAttribute('data-bg');
    btn.classList.toggle('is-selected', selected.has(key));
  });
}

function _etiqToggle(texto, bg) {
  const idx = _etiqSeleccion.findIndex(function(it){ return it.texto === texto && it.bg === bg; });
  if (idx >= 0) _etiqSeleccion.splice(idx, 1);
  else _etiqSeleccion.push({ texto: texto, bg: bg });
  _renderEtiqSelectionUI();
}

function openEtiquetasModal() {
  if (typeof captureEditorCursor === 'function') captureEditorCursor();
  _etiqSeleccion = [];
  const root = document.getElementById('etiquetasModalBody');
  if (!root) return;
  let html = '';
  ETIQUETAS_PRESETS.forEach(function(grupo){
    html += '<div class="etiq-group">';
    html += '<div class="etiq-group-title">' + esc(grupo.grupo) + '</div>';
    html += '<div class="etiq-row">';
    grupo.items.forEach(function(it){
      html += '<button type="button" class="etiq-chip" data-texto="' + esc(it.texto) + '" data-bg="' + it.bg + '" style="background:' + it.bg + ';">' + esc(it.texto) + '</button>';
    });
    html += '</div></div>';
  });
  root.innerHTML = html;
  _renderEtiqSelectionUI();
  const modal = document.getElementById('etiquetasModal');
  if (modal) modal.classList.add('open');
}

function closeEtiquetasModal() {
  _etiqSeleccion = [];
  const modal = document.getElementById('etiquetasModal');
  if (modal) modal.classList.remove('open');
}

function _etiqInsertAll() {
  if (!_etiqSeleccion.length) return;
  if (typeof saveBlockUndo === 'function') saveBlockUndo();
  const html = _buildEtiquetasWrapper(_etiqSeleccion.slice());
  if (typeof insertHTMLAtCursor === 'function') insertHTMLAtCursor(html);
  const n = _etiqSeleccion.length;
  closeEtiquetasModal();
  if (typeof showToast === 'function') showToast('✅ ' + n + ' etiqueta' + (n > 1 ? 's' : '') + ' insertada' + (n > 1 ? 's' : '') + ' en una sola línea');
  setTimeout(function(){
    if (typeof refreshOutput === 'function') refreshOutput();
  }, 0);
}

function _etiqAddCustomToSelection() {
  const txtEl = document.getElementById('etiqCustomText');
  const colEl = document.getElementById('etiqCustomColor');
  const texto = txtEl ? txtEl.value.trim() : '';
  const bg = colEl ? colEl.value : '#C0272D';
  if (!texto) {
    if (typeof showToast === 'function') showToast('⚠️ Escribe un texto para la etiqueta');
    return;
  }
  const already = _etiqSeleccion.some(function(it){ return it.texto === texto && it.bg === bg; });
  if (!already) _etiqSeleccion.push({ texto: texto, bg: bg });
  if (txtEl) txtEl.value = '';
  _renderEtiqSelectionUI();
  if (txtEl) txtEl.focus();
}

function _etiqClearSelection() {
  _etiqSeleccion = [];
  const txtEl = document.getElementById('etiqCustomText');
  if (txtEl) txtEl.value = '';
  _renderEtiqSelectionUI();
}

(function bindEtiquetasModal(){
  const modal = document.getElementById('etiquetasModal');
  if (!modal) return;
  modal.addEventListener('click', function(e){
    if (e.target && e.target.id === 'etiquetasModal') { closeEtiquetasModal(); return; }
    const chip = e.target.closest && e.target.closest('.etiq-chip');
    if (chip) {
      _etiqToggle(chip.getAttribute('data-texto') || '', chip.getAttribute('data-bg') || '#C0272D');
      return;
    }
    if (e.target && e.target.id === 'etiqInsertAll') { _etiqInsertAll(); return; }
    if (e.target && e.target.id === 'etiqClearSelection') { _etiqClearSelection(); return; }
    if (e.target && e.target.id === 'etiqAddCustom') { _etiqAddCustomToSelection(); return; }
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeEtiquetasModal();
    if (e.key === 'Enter' && modal.classList.contains('open')) {
      const active = document.activeElement;
      if (active && active.id === 'etiqCustomText') {
        e.preventDefault();
        _etiqAddCustomToSelection();
      } else if (active && active.id === 'etiqInsertAll') {
        e.preventDefault();
        _etiqInsertAll();
      }
    }
  });
})();

// ── 4 · Checklist interactivo con <input type="checkbox"> ──
function buildChecklist() {
  const raw = prompt("¿Cuántos ítems tendrá el checklist? (1–30)", "4");
  if (raw === null) return '';
  const n = Math.max(1, Math.min(30, parseInt(raw, 10) || 4));
  const items = [];
  for (let i = 1; i <= n; i++) {
    items.push(
      '<label style="display:flex;align-items:flex-start;gap:10px;font-family:' + _GRUPOB_FONT + ';font-size:15px;line-height:1.65;color:#2d2d2d;margin-bottom:8px;cursor:pointer;">' +
        '<input type="checkbox" contenteditable="false" style="margin-top:5px;width:16px;height:16px;accent-color:#0f766e;flex-shrink:0;cursor:pointer;">' +
        '<span contenteditable="true" style="outline:none;flex:1;min-width:0;">Elemento ' + i + ' del checklist</span>' +
      '</label>'
    );
  }
  return '<div data-editor-block="text" style="max-width:800px;width:100%;margin:16px auto;box-sizing:border-box;background:#f0fdfa;border-left:5px solid #0f766e;border-radius:0 6px 6px 0;padding:16px 20px;">' +
    '<div contenteditable="true" style="outline:none;font-family:' + _GRUPOB_FONT + ';font-size:13px;font-weight:800;color:#0f766e;text-transform:uppercase;letter-spacing:.6px;margin-bottom:12px;">Checklist</div>' +
    items.join('') +
    '</div>';
}

// ── 5 · Barra de progreso decorativa ──
function buildProgreso() {
  const raw = prompt("¿Qué porcentaje de progreso mostrar? (0–100)", "50");
  if (raw === null) return '';
  const pct = Math.max(0, Math.min(100, parseInt(raw, 10) || 0));
  return '<div data-editor-block="text" style="max-width:800px;width:100%;margin:16px auto;box-sizing:border-box;">' +
    '<div style="display:flex;justify-content:space-between;align-items:baseline;font-family:' + _GRUPOB_FONT + ';font-size:13px;font-weight:700;color:#374151;margin-bottom:6px;">' +
      '<span contenteditable="true" style="outline:none;">Progreso del módulo</span>' +
      '<span contenteditable="true" style="outline:none;font-weight:800;color:#C0272D;">' + pct + '%</span>' +
    '</div>' +
    '<div style="width:100%;height:14px;background:#e5e7eb;border-radius:999px;overflow:hidden;box-sizing:border-box;">' +
      '<div style="width:' + pct + '%;height:100%;background:linear-gradient(90deg,#C0272D 0%,#8E1B1F 100%);border-radius:999px;"></div>' +
    '</div>' +
    '</div>';
}

// ══════════════════════════════════════════════════════════════
//  UTILIDADES DE LISTAS
// ══════════════════════════════════════════════════════════════
function getSelectedLinesForList(range) {
  if (!range || range.collapsed || !editor.contains(range.commonAncestorContainer)) return [];

  const fragment = range.cloneContents();
  const temp = document.createElement('div');
  temp.appendChild(fragment);

  temp.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
  temp.querySelectorAll('p,div,li,h1,h2,h3,h4,h5,h6,section,article,blockquote').forEach(el => {
    if (el.nextSibling) el.appendChild(document.createTextNode('\n'));
  });

  return (temp.textContent || '')
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/\u00a0/g, ' ')
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => line.replace(/^[•·▪▫◦‣⁃\-*–—]+\s*/, '').replace(/^\d+[.)]\s*/, '').trim())
    .filter(Boolean);
}

function convertSelectionToList(range) {
  const lines = getSelectedLinesForList(range);
  if (!lines.length) return false;

  saveBlockUndo();

  const list = document.createElement('ul');
  list.setAttribute('data-editor-block', 'text');
  list.setAttribute('style', EX.ul + ';max-width:' + EXPORT_CONTENT_MAX + ';width:100%;margin:14px auto;box-sizing:border-box;');

  lines.forEach(line => {
    const item = document.createElement('li');
    item.setAttribute('style', EX.li);
    item.textContent = line;
    list.appendChild(item);
  });

  range.deleteContents();
  range.insertNode(list);

  const after = document.createElement('p');
  after.innerHTML = '<br>';
  list.parentNode.insertBefore(after, list.nextSibling);

  const selection = window.getSelection();
  const newRange = document.createRange();
  newRange.setStart(after, 0);
  newRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(newRange);
  savedRange = null;
  captureEditorCursor();
  editor.dispatchEvent(new Event('input', { bubbles:true }));
  if (typeof normalizeEditorVisualGrid === 'function') normalizeEditorVisualGrid(editor);
  refreshOutput();
  return true;
}

function addBlock(type) {
  const cfg = BLOCK_CFG[type]; if (!cfg) return;

  if (cfg.isList) {
    const selection = window.getSelection();
    let listRange = null;
    if (savedRange && !savedRange.collapsed && editor.contains(savedRange.commonAncestorContainer)) {
      listRange = savedRange.cloneRange();
    } else if (selection && selection.rangeCount > 0) {
      const currentRange = selection.getRangeAt(0);
      if (!currentRange.collapsed && editor.contains(currentRange.commonAncestorContainer)) {
        listRange = currentRange.cloneRange();
      }
    }
    if (listRange && convertSelectionToList(listRange)) return;
  }

  saveBlockUndo();
  let html = '';

  if (cfg.isAcordeon) {
    html = buildAcordeon();
    if (!html) return;
  } else if (cfg.isTimeline) {
    html = buildTimeline();
    if (!html) return;
  } else if (cfg.isChecklist) {
    html = buildChecklist();
    if (!html) return;
  } else if (cfg.isProgreso) {
    html = buildProgreso();
    if (!html) return;
  } else if (cfg.isSequence) {
    const numSteps = prompt("¿Cuántos pasos tiene la secuencia operativa?", "Escribe número de pasos de tu secuencia");
    if (!numSteps || isNaN(numSteps) || numSteps < 1) return;

    let stepsHtml = '';
    for (let i = 1; i <= parseInt(numSteps); i++) {
      const isOdd = i % 2 !== 0;
      const color = isOdd ? '#c0272d' : '#1a1a1a';
      const shadow = isOdd ? 'box-shadow: 0 3px 6px rgba(192,39,45,0.2);' : '';

      stepsHtml += `
        <div style="display: flex; gap: 20px; margin-bottom: 25px;">
          <div style="flex-shrink: 0; width: 40px; height: 40px; background: ${color}; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; ${shadow}">${i}</div>
          <div style="border-bottom: 1px solid #f0f0f0; padding-bottom: 15px; width: 100%;">
            <h4 contenteditable="true" style="margin: 0 0 5px 0; color: #1a1a1a; font-size: 1.1rem; font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">Título del Paso ${i}</h4>
            <p contenteditable="true" style="margin: 0; color: #666; font-size: 0.95rem; line-height: 1.6; font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">Descripción detallada de la fase operativa ${i}.</p>
          </div>
        </div>`;
    }

    html = `
      <div class="sequence-block" data-editor-block="text" style="max-width:800px;width:100%;margin:30px auto;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;box-sizing:border-box;">
        <div style="width:100%;max-width:none;margin:0;background-color: #ffffff; padding: 10px;">
          <div style="border: 1px solid #eee; padding: 30px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
            <p style="color: #c0272d; font-size: 0.80rem; text-transform: uppercase; margin-bottom: 25px; font-weight: 800; letter-spacing: 1.5px; border-bottom: 1px solid #eee; padding-bottom: 5px; display: inline-block;">
              Bloque: Secuencia Operativa
            </p>
            ${stepsHtml}
          </div>
        </div>
      </div><p><br></p>`;

  } else if (cfg.isSep) {
    html = '<hr data-editor-block="text" style="' + EX.divider + ';max-width:' + EXPORT_CONTENT_MAX + ';width:100%;margin:16px auto;box-sizing:border-box;">';
  } else if (cfg.isList) {
    html = '<ul data-editor-block="text" style="' + EX.ul + ';max-width:' + EXPORT_CONTENT_MAX + ';width:100%;margin:14px auto;box-sizing:border-box;"><li style="' + EX.li + '">Elemento 1</li><li style="' + EX.li + '">Elemento 2</li><li style="' + EX.li + '">Elemento 3</li></ul>';
  } else if (cfg.isDef) {
    html = '<div data-editor-block="text" style="max-width:' + EXPORT_CONTENT_MAX + ';width:100%;margin:16px auto;box-sizing:border-box;">'
         + '<div style="' + EX.defterm + '" contenteditable="true">Término o concepto</div>'
         + '<div style="' + EX.defbody + '" contenteditable="true">Escribe aquí la definición o explicación del término.</div>'
         + '</div>';
  } else {
    html = '<div data-editor-block="text" style="max-width:' + EXPORT_CONTENT_MAX + ';width:100%;margin:12px auto 8px auto;box-sizing:border-box;text-align:left;"><div style="' + EX[type] + '" contenteditable="true">' + esc(cfg.defaultText) + '</div></div>';
  }

  if (!html) return;
  insertHTMLAtCursor(html);
  setTimeout(() => { if (typeof normalizeEditorVisualGrid === 'function') normalizeEditorVisualGrid(editor); }, 0);
}

// ══════════════════════════════════════════════════════════════
//  TABLA
// ══════════════════════════════════════════════════════════════
function openTableModal()  { document.getElementById('tableModal').classList.add('open'); setTimeout(()=>document.getElementById('tableCols').focus(),50); }
function closeTableModal() { document.getElementById('tableModal').classList.remove('open'); }
function confirmTable() {
  const cols = Math.max(1, Math.min(10, parseInt(document.getElementById('tableCols').value)||3));
  const rows = Math.max(1, Math.min(30, parseInt(document.getElementById('tableRows').value)||3));
  const head = document.getElementById('tableHeader').checked;
  closeTableModal();
  let t = '<div class="moodle-media-block" style="overflow-x:auto;margin:12px auto;width:100%;max-width:' + EXPORT_MEDIA_MAX + ';box-sizing:border-box;"><table style="' + EX.table + '">';
  if (head) {
    t += '<tr>';
    for (let i=0;i<cols;i++) t += '<th style="' + EX.th + '">Columna '+(i+1)+'</th>';
    t += '</tr>';
  }
  for (let r=0;r<rows;r++) {
    t += '<tr>';
    for (let c=0;c<cols;c++) t += '<td style="' + (r%2===0 ? EX.td : EX.tdalt) + '">Dato '+(r*cols+c+1)+'</td>';
    t += '</tr>';
  }
  t += '</table></div>';
  insertHTMLAtCursor(t);
}
document.getElementById('tableModal').addEventListener('click', e => {
  if (e.target.id === 'tableModal') closeTableModal();
});

// ══════════════════════════════════════════════════════════════
//  GRUPO B · SINCRONIZACIÓN DEL ESTADO "checked" DE LOS CHECKBOX
//  El atributo `checked` persiste al exportar; la propiedad no.
//  Al marcar/desmarcar un checkbox, sincronizamos el atributo.
// ══════════════════════════════════════════════════════════════
editor.addEventListener('change', function(e) {
  const t = e.target;
  if (t && t.tagName === 'INPUT' && t.type === 'checkbox') {
    if (t.checked) t.setAttribute('checked', '');
    else t.removeAttribute('checked');
  }
}, true);
