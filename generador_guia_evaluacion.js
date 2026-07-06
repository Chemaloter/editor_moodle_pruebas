/* ============================================================
   GENERADOR DE GUÍA DE EVALUACIÓN · CVC-CBCM · v1.0
   Archivo independiente. No modifica app.js.
   Genera HTML institucional compatible con Moodle y lo inserta
   en el editor principal mediante insertHTMLAtCursor().
   ============================================================ */
(function(){
  const CONTENT_MAX = '800px';
  const UI = {
    red:'#C0272D', redDark:'#8E1B1F', blue:'#4338ca', text:'#111827', muted:'#64748b', border:'#e5e7eb', soft:'#f9fafb'
  };

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
  function checkedValues(name){
    return Array.from(document.querySelectorAll('input[name="'+name+'"]:checked')).map(x => x.value);
  }

  function outerTextBlock(inner, my='14px'){
    return '<div data-editor-block="text" style="max-width:'+CONTENT_MAX+';width:100%;margin:'+my+' auto;box-sizing:border-box;">'+inner+'</div>';
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
    rows = rows.filter(r => r.some(c => String(c||'').trim()));
    if(!rows.length) return '';
    let html = '<div class="moodle-media-block" style="overflow-x:auto;margin:24px auto;width:100%;max-width:1000px;box-sizing:border-box;">';
    html += '<table style="width:100%;border-collapse:separate;border-spacing:0;font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;border:1px solid #edf0f4;border-radius:10px;overflow:hidden;background:#ffffff;">';
    html += '<tr>' + headers.map(h => '<th style="background-color:#fff7f7;color:#9b1e23;padding:10px 14px;text-align:left;font-weight:800;border:none;border-right:1px solid #edf0f4;border-bottom:1px solid #edf0f4;font-size:13px;">'+esc(h)+'</th>').join('') + '</tr>';
    rows.forEach((r, idx) => {
      html += '<tr>' + r.map(c => '<td style="padding:9px 14px;border:none;border-right:1px solid #edf0f4;border-bottom:1px solid #edf0f4;color:#2d2d2d;vertical-align:middle;background-color:#ffffff;font-size:14px;line-height:1.6;">'+(lines(c)||'&nbsp;')+'</td>').join('') + '</tr>';
    });
    html += '</table></div>';
    return html;
  }
  function list(title, arr){
    arr = (arr||[]).filter(Boolean);
    if(!arr.length) return '';
    return h3(title) + '<ul data-editor-block="text" style="font-family:Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.8;color:#2d2d2d;margin:14px auto;padding-left:28px;max-width:'+CONTENT_MAX+';width:100%;box-sizing:border-box;">' + arr.map(x => '<li style="margin:5px 0;font-weight:normal;">'+esc(x)+'</li>').join('') + '</ul>';
  }

  function sectionTextarea(label, id, placeholder){
    return '<div class="gev-field gev-full"><label>'+label+'</label><textarea id="'+id+'" placeholder="'+esc(placeholder||'')+'"></textarea></div>';
  }
  function input(label, id, placeholder){
    return '<div class="gev-field"><label>'+label+'</label><input id="'+id+'" type="text" placeholder="'+esc(placeholder||'')+'"></div>';
  }
  function select(label, id, options){
    return '<div class="gev-field"><label>'+label+'</label><select id="'+id+'">'+options.map(o => '<option value="'+esc(o)+'">'+esc(o)+'</option>').join('')+'</select></div>';
  }
  function checkboxList(name, options){
    return '<div class="gev-checks">'+options.map(o => '<label><input type="checkbox" name="'+name+'" value="'+esc(o)+'"> '+esc(o)+'</label>').join('')+'</div>';
  }

  function renderRows(containerId, type){
    const el = document.getElementById(containerId);
    if(!el) return;
    const div = document.createElement('div');
    div.className = 'gev-row-card';
    if(type === 'ponderacion'){
      div.innerHTML = input('Elemento evaluable','', 'Cuestionario / práctica / tarea').replace('id=""','data-k="elemento"') +
        input('Peso','', 'Ej.: 40 %').replace('id=""','data-k="peso"') +
        select('Obligatorio','', ['Sí','No','No lo sé']).replace('id=""','data-k="obligatorio"') +
        '<button type="button" class="gev-mini-del">Eliminar</button>' +
        sectionTextarea('Descripción','', 'Breve explicación del elemento evaluable.').replace('id=""','data-k="descripcion"');
    } else {
      div.innerHTML = input('Nombre de la actividad','', 'Ej.: Cuestionario final').replace('id=""','data-k="nombre"') +
        input('Tipo','', 'Cuestionario / tarea / práctica / foro').replace('id=""','data-k="tipo"') +
        input('Peso','', 'Ej.: 20 % / Apto-No apto').replace('id=""','data-k="peso"') +
        '<button type="button" class="gev-mini-del">Eliminar</button>' +
        sectionTextarea('Descripción e instrucciones','', 'Qué debe hacer el alumnado, cómo se entrega o realiza y cómo se valorará.').replace('id=""','data-k="descripcion"');
    }
    div.querySelector('.gev-mini-del').onclick = () => div.remove();
    el.appendChild(div);
  }

  function readDynamicRows(containerId){
    return Array.from(document.querySelectorAll('#'+containerId+' .gev-row-card')).map(card => {
      const obj = {};
      card.querySelectorAll('[data-k]').forEach(el => obj[el.dataset.k] = el.value.trim());
      return obj;
    });
  }

  function buildGuideHTML(){
    const instruments = checkedValues('gev-instrumentos');
    const ponderacion = readDynamicRows('gev-ponderacion-rows');
    const actividades = readDynamicRows('gev-actividades-rows');
    let html = '';
    html += h1('GUÍA DE EVALUACIÓN DEL MÓDULO');
    html += h2('DATOS DEL MÓDULO');
    html += table(['Campo','Información'], [
      ['Módulo / sección', val('gev-modulo')],
      ['Curso / acción formativa', val('gev-curso')],
      ['Profesorado responsable', val('gev-profesorado')],
      ['Modalidad', val('gev-modalidad')],
      ['Duración estimada', val('gev-duracion')],
      ['Fecha / versión', val('gev-version')]
    ]);
    html += h2('DESCRIPCIÓN GENERAL DE LA EVALUACIÓN') + p(val('gev-descripcion'));
    html += h2('RESULTADOS DE APRENDIZAJE / OBJETIVOS EVALUABLES') + p(val('gev-resultados'));
    html += h2('CONTENIDOS EVALUABLES') + p(val('gev-contenidos'));
    html += h2('INSTRUMENTOS DE EVALUACIÓN') + list('Instrumentos seleccionados', instruments) + p(val('gev-instrumentos-texto'));
    html += h2('PONDERACIÓN DE LA EVALUACIÓN');
    html += table(['Elemento evaluable','Peso','Obligatorio','Descripción'], ponderacion.map(r => [r.elemento,r.peso,r.obligatorio,r.descripcion]));
    html += p(val('gev-ponderacion-texto'));
    html += h2('CRITERIOS DE SUPERACIÓN') + p(val('gev-criterios'));
    html += h2('DETALLE DE ACTIVIDADES EVALUABLES');
    html += table(['Actividad','Tipo','Peso','Descripción / instrucciones'], actividades.map(r => [r.nombre,r.tipo,r.peso,r.descripcion]));
    html += h2('RETROALIMENTACIÓN AL ALUMNADO') + p(val('gev-retroalimentacion'));
    html += h2('CONFIGURACIÓN EN MOODLE') + p(val('gev-moodle'));
    html += h2('OBSERVACIONES') + p(val('gev-observaciones'));
    html += h2('RESUMEN PARA EL ALUMNADO') + note('Resumen publicable', val('gev-resumen'));
    return html;
  }

  function insertGuide(){
    const html = buildGuideHTML();
    if(!html.trim()) return;
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
        .gev-checks{display:grid;grid-template-columns:1fr 1fr;gap:8px 12px;font-size:13px;}
        .gev-checks label{background:#f8fafc;border:1px solid #e5e7eb;border-radius:8px;padding:8px 10px;}
        .gev-row-card{display:grid;grid-template-columns:1fr 140px 160px auto;gap:10px;align-items:end;border:1px solid #e5e7eb;border-radius:10px;padding:12px;margin:10px 0;background:#f9fafb;}
        .gev-row-card .gev-full{grid-column:1/-1;}
        .gev-mini-del{border:1px solid #fecdd3;background:#fff1f2;color:#9f1239;border-radius:8px;padding:9px 10px;font-weight:800;cursor:pointer;}
        .gev-add{border:1px solid #bfdbfe;background:#eff6ff;color:#1d4ed8;border-radius:8px;padding:9px 12px;font-weight:800;cursor:pointer;margin-top:8px;}
        .gev-footer{display:flex;gap:10px;justify-content:flex-end;padding:12px;background:#fff;border-top:1px solid #e5e7eb;}
        .gev-btn{border:0;border-radius:9px;padding:10px 16px;font-weight:900;letter-spacing:.3px;cursor:pointer;}
        .gev-btn.gray{background:#f1f5f9;color:#334155;border:1px solid #cbd5e1;}
        .gev-btn.main{background:#4338ca;color:#fff;box-shadow:0 3px 10px rgba(67,56,202,.25);}
        .gev-help{font-size:12px;color:#64748b;line-height:1.5;margin-top:6px;}
        @media(max-width:760px){.gev-grid,.gev-checks{grid-template-columns:1fr}.gev-row-card{grid-template-columns:1fr}.gev-footer{flex-direction:column}.gev-btn{width:100%;}}
      </style>
      <div class="gev-shell">
        <div class="gev-tabs">
          <button class="gev-tab active" data-panel="p1">1 · Datos</button>
          <button class="gev-tab" data-panel="p2">2 · Evaluación</button>
          <button class="gev-tab" data-panel="p3">3 · Actividades</button>
          <button class="gev-tab" data-panel="p4">4 · Moodle</button>
          <button class="gev-tab" data-panel="p5">5 · Resumen</button>
        </div>
        <div class="gev-body">
          <div class="gev-panel active" id="p1">
            <div class="gev-card"><h3>Datos del módulo</h3><div class="gev-grid">
              ${input('Módulo / sección','gev-modulo','Ej.: M11 · PHTLS y soporte vital básico')}
              ${input('Curso / acción formativa','gev-curso','Nombre del curso')}
              ${input('Profesorado responsable','gev-profesorado','Nombre del profesor o equipo docente')}
              ${select('Modalidad','gev-modalidad',['Presencial','Semipresencial','Online','Mixta','No procede'])}
              ${input('Duración estimada','gev-duracion','Ej.: 6 horas / 2 sesiones / 1 semana')}
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
            <div class="gev-card"><h3>Instrumentos de evaluación</h3>
              ${checkboxList('gev-instrumentos',['Cuestionario o prueba de conocimientos','Actividad práctica o maniobra evaluable','Tarea entregable en el aula virtual','Foro o participación','Observación directa','Checklist / lista de comprobación','Rúbrica','Otro'])}
              <div class="gev-grid" style="margin-top:12px;">${sectionTextarea('Aclaraciones sobre instrumentos','gev-instrumentos-texto','Añada cualquier aclaración necesaria.')}</div>
            </div>
            <div class="gev-card"><h3>Ponderación</h3><div id="gev-ponderacion-rows"></div><button class="gev-add" id="gev-add-ponderacion" type="button">+ Añadir elemento de evaluación</button><div class="gev-grid" style="margin-top:12px;">${sectionTextarea('Aclaraciones sobre ponderación','gev-ponderacion-texto','Explique si la evaluación es apto/no apto, si hay mínimos obligatorios o cualquier condición especial.')}</div></div>
            <div class="gev-card"><h3>Criterios de superación</h3><div class="gev-grid">${sectionTextarea('Criterios de superación','gev-criterios','Indique qué debe cumplir el alumnado para superar el módulo.')}</div></div>
          </div>
          <div class="gev-panel" id="p3">
            <div class="gev-card"><h3>Detalle de actividades evaluables</h3><div id="gev-actividades-rows"></div><button class="gev-add" id="gev-add-actividad" type="button">+ Añadir actividad evaluable</button></div>
            <div class="gev-card"><h3>Retroalimentación</h3><div class="gev-grid">${sectionTextarea('Retroalimentación al alumnado','gev-retroalimentacion','Explique cómo y cuándo se comunicará la corrección, calificación o feedback.')}</div></div>
          </div>
          <div class="gev-panel" id="p4">
            <div class="gev-card"><h3>Configuración en Moodle</h3><div class="gev-grid">${sectionTextarea('Configuración necesaria en Moodle','gev-moodle','Indique cuestionarios, tareas, finalización de actividad, calificaciones, grupos, restricciones de acceso u otros ajustes necesarios.')}</div></div>
            <div class="gev-card"><h3>Observaciones</h3><div class="gev-grid">${sectionTextarea('Observaciones','gev-observaciones','Añada cualquier consideración relevante para el alumnado, profesorado o ETD.')}</div></div>
          </div>
          <div class="gev-panel" id="p5">
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
    document.getElementById('gev-add-ponderacion').onclick = () => renderRows('gev-ponderacion-rows','ponderacion');
    document.getElementById('gev-add-actividad').onclick = () => renderRows('gev-actividades-rows','actividad');
    document.getElementById('gev-insert').onclick = insertGuide;
    renderRows('gev-ponderacion-rows','ponderacion');
    renderRows('gev-actividades-rows','actividad');
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
