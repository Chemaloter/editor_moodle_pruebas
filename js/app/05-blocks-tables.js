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
sequence: { isSequence:true }, // <--- LÍNEA NUEVA
};

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

  saveBlockUndo(); // Guardamos el estado para que funcione el Ctrl+Z (Deshacer)
  let html = '';

  if (cfg.isSequence) {
    // 1. Preguntamos el número de pasos
    const numSteps = prompt("¿Cuántos pasos tiene la secuencia operativa?", "Escribe número de pasos de tu secuencia");
    if (!numSteps || isNaN(numSteps) || numSteps < 1) return;

    // 2. Generamos los pasos dinámicamente
    let stepsHtml = '';
    for (let i = 1; i <= parseInt(numSteps); i++) {
      const isOdd = i % 2 !== 0;
      const color = isOdd ? '#c0272d' : '#1a1a1a'; // Rojo para impares, negro para pares
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

    // 3. Montamos el bloque completo
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
