/* ============================================================
   GENERADOR DE GUÍA DE EVALUACIÓN · CVC-CBCM · v2.0
   Archivo independiente. No modifica app.js.
   Cambios v2:
   - Datos: curso antes que módulo.
   - Coordinador de módulo en lugar de profesorado responsable.
   - Eliminada modalidad.
   - Duración estimada -> Duración del módulo.
   - Eliminadas pestañas Actividades y Moodle.
   - Evaluación: apartado "ELIGE LOS INSTRUMENTOS DE EVALUACIÓN" con
     instrumento evaluable como desplegable.
   ============================================================ */
(function(){
  const CONTENT_MAX = '800px';
  const MEDIA_MAX = '1000px';

  const INSTRUMENTOS = [
    'Cuestionario o prueba de conocimientos',
    'Actividad práctica o maniobra evaluable',
    'Tarea entregable en el aula virtual',
    'Foro o participación',
    'Observación directa',
    'Checklist / lista de comprobación',
    'Rúbrica',
    'Otro'
  ];

  function esc(s){
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function lines(s){
    const t = String(s || '').trim();
    if(!t) return '';
    return esc(t).replace(/\r\n/g,'\n').replace(/\r/g,'\n').replace(/\n/g,'<br>');
  }
  function val(id){
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }
  function outerTextBlock(inner, my){
    return '<div data-editor-block="text" style="max-width:'+CONTENT_MAX+';width:100%;margin:'+(my||'14px')+' auto;box-sizing:border-box;">'+inner+'</div>';
  }
  function h1(text){
    if(!String(text||'').trim()) return '';
    return outerTextBlock('<div style="display:inline-block;background-color:#C0272D;color:#ffffff;padding:12px 24px;border-radius:6px;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:20px;font-weight:700;letter-spacing:0.3px;line-height:1.3;">'+esc(text)+'</div>', '12px');
  }
  function h2(text){
    if(!String(text||'').trim()) return '';
    return outerTextBlock('<div style="display:inline-block;background-color:#8E1B1F;color:#ffffff;padding:10px 20px;border-radius:6px;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:17px;font-weight:700;letter-spacing:0.2px;line-height:1.3;">'+esc(text)+'</div>', '18px');
  }
  function h3(text){
    if(!String(text||'').trim()) return '';
    return outerTextBlock('<div style="display:inline-block;background-color:#fff0f0;color:#6b1215;border-left:4px solid #C0272D;padding:8px 18px;border-radius:0 5px 5px 0;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;line-height:1.4;">'+esc(text)+'</div>', '12px');
  }
  function p(text){
    const body = lines(text);
    if(!body) return '';
    return '<p style="font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.8;color:#2d2d2d;margin:14px auto;max-width:'+CONTENT_MAX+';width:100%;box-sizing:border-box;">'+body+'</p>';
  }
  function note(title, text){
    const body = lines(text);
    if(!body) return '';
    return '<div data-editor-block="text" style="display:block;width:100%;max-width:'+CONTENT_MAX+';margin:14px auto;box-sizing:border-box;overflow-wrap:anywhere;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;background-color:#eff6ff;border-left:5px solid #1d4ed8;color:#1e3a8a;padding:12px 20px;border-radius:0 6px 6px 0;line-height:1.7;">' +
      '<strong style="display:block;margin-bottom:4px;">'+esc(title)+'</strong>' + body + '</div>';
  }
  function table(headers, rows){
    rows = (rows || []).filter(r => r && r.some(c => String(c||'').trim()));
    if(!rows.length) return '';
    let html = '<div class="moodle-media-block" style="overflow-x:auto;margin:24px auto;width:100%;max-width:'+MEDIA_MAX+';box-sizing:border-box;">';
    html += '<table style="width:100%;border-collapse:separate;border-spacing:0;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;border:1px solid #edf0f4;border-radius:10px;overflow:hidden;background:#ffffff;">';
    html += '<tr>' + headers.map(h => '<th style="background-color:#fff7f7;color:#9b1e23;padding:10px 14px;text-align:left;font-weight:800;border:none;border-right:1px solid #edf0f4;border-bottom:1px solid #edf0f4;font-size:13px;">'+esc(h)+'</th>').join('') + '</tr>';
    rows.forEach(r => {
      html += '<tr>' + r.map(c => '<td style="padding:9px 14px;border:none;border-right:1px solid #edf0f4;border-bottom:1px solid #edf0f4;color:#2d2d2d;vertical-align:middle;background-color:#ffffff;font-size:14px;line-height:1.6;">'+(lines(c)||'&nbsp;')+'</td>').join('') + '</tr>';
    });
    html += '</table></div>';
    return html;
  }

  function input(label, id, placeholder){
    return '<div class="gev-field"><label>'+esc(label)+'</label><input id="'+id+'" type="text" placeholder="'+esc(placeholder||'')+'"></div>';
  }
  function select(label, id, options){
    return '<div class="gev-field"><label>'+esc(label)+'</label><select id="'+id+'">'+options.map(o => '<option value="'+esc(o)+'">'+esc(o)+'</option>').join('')+'</select></div>';
  }
  function sectionTextarea(label, id, placeholder){
    return '<div class="gev-field gev-full"><label>'+esc(label)+'</label><textarea id="'+id+'" placeholder="'+esc(placeholder||'')+'"></textarea></div>';
  }
  function instrumentSelectHtml(){
    return '<select data-k="instrumento">' + INSTRUMENTOS.map(o => '<option value="'+esc(o)+'">'+esc(o)+'</option>').join('') + '</select>';
  }

  function addInstrumentRow(){
    const el = document.getElementById('gev-instrumentos-rows');
    if(!el) return;
    const div = document.createElement('div');
    div.className = 'gev-row-card gev-row-instrumento';
    div.innerHTML =
      '<div class="gev-field"><label>Elemento evaluable</label>'+instrumentSelectHtml()+'</div>'+
      '<div class="gev-field"><label>Peso</label><input data-k="peso" type="text" placeholder="Ej.: 40 %"></div>'+
      '<div class="gev-field"><label>Obligatorio</label><select data-k="obligatorio"><option>Sí</option><option>No</option><option>No lo sé</option></select></div>'+
      '<button type="button" class="gev-mini-del">Eliminar</button>'+
      '<div class="gev-field gev-full"><label>Descripción / criterios</label><textarea data-k="descripcion" placeholder="Explique cómo se aplica este instrumento, qué debe hacer el alumnado y cómo se valorará."></textarea></div>';
    div.querySelector('.gev-mini-del').onclick = function(){ div.remove(); };
    el.appendChild(div);
  }
  function readInstrumentRows(){
    return Array.from(document.querySelectorAll('#gev-instrumentos-rows .gev-row-card')).map(card => {
      const obj = {};
      card.querySelectorAll('[data-k]').forEach(el => obj[el.dataset.k] = el.value.trim());
      return obj;
    });
  }

  function buildGuideHTML(){
    const instrumentos = readInstrumentRows();
    let html = '';
    html += h1('GUÍA DE EVALUACIÓN DEL MÓDULO');
    html += h2('DATOS DEL MÓDULO');
    html += table(['Campo','Información'], [
      ['Curso / acción formativa', val('gev-curso')],
      ['Módulo / sección', val('gev-modulo')],
      ['Coordinador de módulo', val('gev-coordinador')],
      ['Duración del módulo', val('gev-duracion')],
      ['Fecha / versión', val('gev-version')]
    ]);
    html += h2('DESCRIPCIÓN GENERAL DE LA EVALUACIÓN') + p(val('gev-descripcion'));
    html += h2('RESULTADOS DE APRENDIZAJE / OBJETIVOS EVALUABLES') + p(val('gev-resultados'));
    html += h2('CONTENIDOS EVALUABLES') + p(val('gev-contenidos'));
    html += h2('ELIGE LOS INSTRUMENTOS DE EVALUACIÓN');
    html += table(['Elemento evaluable','Peso','Obligatorio','Descripción / criterios'], instrumentos.map(r => [r.instrumento, r.peso, r.obligatorio, r.descripcion]));
    html += p(val('gev-instrumentos-texto'));
    html += h2('CRITERIOS DE SUPERACIÓN') + p(val('gev-criterios'));
    html += h2('RETROALIMENTACIÓN AL ALUMNADO') + p(val('gev-retroalimentacion'));
    html += h2('RESUMEN PARA EL ALUMNADO') + note('Resumen publicable', val('gev-resumen'));
    return html;
  }

  function insertGuide(){
    const html = buildGuideHTML();
    const fn = window.insertHTMLAtCursor || (typeof insertHTMLAtCursor === 'function' ? insertHTMLAtCursor : null);
    if(!fn){ alert('No se encontró la función de inserción del editor.'); return; }
    fn(html);
    if(typeof closeGuiaEvaluacionModal === 'function') closeGuiaEvaluacionModal();
    if(typeof showToast === 'function') showToast('✅ Guía de evaluación insertada en el editor');
    if(typeof refreshOutput === 'function') refreshOutput();
  }

  function render(){
    const root = document.getElementById('guia-evaluacion-root');
    if(!root) return;
    root.innerHTML = `
      <style>
        .gev-shell{height:100%;display:flex;flex-direction:column;background:#f8fafc;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111827;}
        .gev-tabs{display:flex;gap:6px;flex-wrap:wrap;padding:10px 12px;background:#fff;border-bottom:1px solid #e5e7eb;}
        .gev-tab{border:1px solid #d1d5db;background:#fff;border-radius:999px;padding:7px 12px;font-size:12px;font-weight:800;color:#475569;cursor:pointer;}
        .gev-tab.active{background:#4338ca;color:#fff;border-color:#4338ca;}
        .gev-body{flex:1;overflow:auto;padding:16px;}
        .gev-panel{display:none;max-width:980px;margin:0 auto;}
        .gev-panel.active{display:block;}
        .gev-card{background:#fff;border:1px solid #e5e7eb;border-left:6px solid #4338ca;border-radius:12px;padding:16px;margin-bottom:14px;box-shadow:0 3px 12px rgba(15,23,42,.06);}
        .gev-card h3{margin:0 0 12px;color:#4338ca;font-size:15px;text-transform:uppercase;letter-spacing:.4px;}
        .gev-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .gev-field{display:flex;flex-direction:column;gap:5px;min-width:0;}
        .gev-field.gev-full{grid-column:1/-1;}
        .gev-field label{font-size:12px;font-weight:800;color:#374151;}
        .gev-field input,.gev-field select,.gev-field textarea{width:100%;border:1px solid #cbd5e1;border-radius:8px;padding:9px 10px;font-family:inherit;font-size:13px;box-sizing:border-box;background:#fff;color:#111827;}
        .gev-field textarea{min-height:110px;resize:vertical;line-height:1.5;}
        .gev-row-card{display:grid;grid-template-columns:minmax(220px,1fr) 120px 150px auto;gap:10px;align-items:end;border:1px solid #e5e7eb;border-radius:10px;padding:12px;margin:10px 0;background:#f9fafb;}
        .gev-row-card .gev-full{grid-column:1/-1;}
        .gev-mini-del{border:1px solid #fecdd3;background:#fff1f2;color:#9f1239;border-radius:8px;padding:9px 10px;font-weight:800;cursor:pointer;}
        .gev-add{border:1px solid #bfdbfe;background:#eff6ff;color:#1d4ed8;border-radius:8px;padding:9px 12px;font-weight:800;cursor:pointer;margin-top:8px;}
        .gev-footer{display:flex;gap:10px;justify-content:flex-end;padding:12px;background:#fff;border-top:1px solid #e5e7eb;}
        .gev-btn{border:0;border-radius:9px;padding:10px 16px;font-weight:900;letter-spacing:.3px;cursor:pointer;}
        .gev-btn.gray{background:#f1f5f9;color:#334155;border:1px solid #cbd5e1;}
        .gev-btn.main{background:#4338ca;color:#fff;box-shadow:0 3px 10px rgba(67,56,202,.25);}
        .gev-help{font-size:12px;color:#64748b;line-height:1.5;margin-top:6px;}
        @media(max-width:760px){.gev-grid{grid-template-columns:1fr}.gev-row-card{grid-template-columns:1fr}.gev-footer{flex-direction:column}.gev-btn{width:100%;}}
      </style>
      <div class="gev-shell">
        <div class="gev-tabs">
          <button class="gev-tab active" data-panel="p1">1 · Datos</button>
          <button class="gev-tab" data-panel="p2">2 · Evaluación</button>
          <button class="gev-tab" data-panel="p3">3 · Resumen</button>
        </div>
        <div class="gev-body">
          <div class="gev-panel active" id="p1">
            <div class="gev-card"><h3>Datos del módulo</h3><div class="gev-grid">
              ${input('Curso / acción formativa','gev-curso','Nombre del curso')}
              ${input('Módulo / sección','gev-modulo','Ej.: M11 · PHTLS y soporte vital básico')}
              ${input('Coordinador de módulo','gev-coordinador','Nombre del coordinador del módulo')}
              ${input('Duración del módulo','gev-duracion','Ej.: 6 horas / 2 sesiones / 1 semana')}
              ${input('Fecha / versión','gev-version','Ej.: Julio 2026 · v1.0')}
            </div></div>
            <div class="gev-card"><h3>Descripción general</h3><div class="gev-grid">
              ${sectionTextarea('Descripción general de la evaluación','gev-descripcion','Explique brevemente cómo se evaluará el módulo.')}
            </div></div>
          </div>
          <div class="gev-panel" id="p2">
            <div class="gev-card"><h3>Resultados y contenidos evaluables</h3><div class="gev-grid">
              ${sectionTextarea('Resultados de aprendizaje / objetivos evaluables','gev-resultados','Indique qué debe saber, comprender o realizar el alumnado.')}
              ${sectionTextarea('Contenidos evaluables','gev-contenidos','Indique los contenidos, técnicas o procedimientos que serán objeto de evaluación.')}
            </div></div>
            <div class="gev-card"><h3>Elige los instrumentos de evaluación</h3>
              <div class="gev-help">Añada aquí todos los elementos evaluables del módulo. En cada fila seleccione el instrumento, indique su peso, si es obligatorio y describa los criterios o condiciones de realización.</div>
              <div id="gev-instrumentos-rows"></div>
              <button class="gev-add" id="gev-add-instrumento" type="button">+ Añadir instrumento de evaluación</button>
              <div class="gev-grid" style="margin-top:12px;">${sectionTextarea('Aclaraciones sobre instrumentos de evaluación','gev-instrumentos-texto','Añada aquí condiciones generales, mínimos obligatorios, reglas de apto/no apto o cualquier aclaración sobre la evaluación.')}</div>
            </div>
            <div class="gev-card"><h3>Criterios de superación</h3><div class="gev-grid">${sectionTextarea('Criterios de superación','gev-criterios','Indique qué debe cumplir el alumnado para superar el módulo.')}</div></div>
            <div class="gev-card"><h3>Retroalimentación al alumnado</h3><div class="gev-grid">${sectionTextarea('Retroalimentación al alumnado','gev-retroalimentacion','Explique cómo y cuándo se comunicará la corrección, calificación o feedback.')}</div></div>
          </div>
          <div class="gev-panel" id="p3">
            <div class="gev-card"><h3>Resumen para el alumnado</h3><div class="gev-grid">${sectionTextarea('Resumen para publicar al inicio del módulo','gev-resumen','Redacte un resumen claro y directo: qué se evalúa, cómo se supera el módulo y qué debe tener en cuenta el alumnado.')}</div><div class="gev-help">Este apartado se mostrará como bloque destacado al final de la guía generada.</div></div>
          </div>
        </div>
        <div class="gev-footer">
          <button class="gev-btn gray" type="button" onclick="closeGuiaEvaluacionModal()">Cancelar</button>
          <button class="gev-btn main" id="gev-insert" type="button">Insertar guía en el editor</button>
        </div>
      </div>`;
    root.querySelectorAll('.gev-tab').forEach(btn => btn.addEventListener('click', () => {
      root.querySelectorAll('.gev-tab').forEach(b => b.classList.remove('active'));
      root.querySelectorAll('.gev-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      root.querySelector('#'+btn.dataset.panel).classList.add('active');
    }));
    document.getElementById('gev-add-instrumento').onclick = addInstrumentRow;
    document.getElementById('gev-insert').onclick = insertGuide;
    addInstrumentRow();
  }

  window.openGuiaEvaluacionModal = function(){
    if(typeof captureEditorCursor === 'function') captureEditorCursor();
    render();
    const modal = document.getElementById('guiaEvaluacionModal');
    if(modal) modal.classList.add('open');
  };
  window.closeGuiaEvaluacionModal = function(){
    const modal = document.getElementById('guiaEvaluacionModal');
    if(modal) modal.classList.remove('open');
  };
  document.addEventListener('click', function(e){
    if(e.target && e.target.id === 'guiaEvaluacionModal') window.closeGuiaEvaluacionModal();
  });
})();
