//  TOAST
// ══════════════════════════════════════════════════════════════
function showToast(msg, duration) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => t.classList.remove('show'), duration || 3000);
}

// ══════════════════════════════════════════════════════════════
//  FORMATO DE TEXTO
// ══════════════════════════════════════════════════════════════
function applyFmt(cmd, val = null) {
  saveBlockUndo();
  editor.focus();

  if (cmd === 'fontSize') {
    // Mapeo de valores 1-7 a píxeles reales (estándar Moodle)
    const sizeMap = {
      '1': '10px',
      '2': '13px',
      '3': '16px', // Normal
      '4': '18px',
      '5': '24px',
      '6': '32px',
      '7': '48px'
    };
    
    // Forzamos al navegador a usar estilos CSS en lugar de etiquetas <font>
    document.execCommand('styleWithCSS', false, true);
    document.execCommand(cmd, false, val);
    
    // Si el navegador ha creado un <font> a pesar de lo anterior, lo corregimos
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const parent = selection.getRangeAt(0).commonAncestorContainer.parentElement;
      if (parent && parent.nodeName === 'FONT') {
        const span = document.createElement('span');
        span.style.fontSize = sizeMap[val] || '16px';
        if (parent.face) span.style.fontFamily = parent.face;
        span.innerHTML = parent.innerHTML;
        parent.parentNode.replaceChild(span, parent);
      }
    }
    document.execCommand('styleWithCSS', false, false);
  } else if (cmd === 'fontName') {
    // También forzamos CSS para el nombre de la fuente
    document.execCommand('styleWithCSS', false, true);
    document.execCommand(cmd, false, val);
    document.execCommand('styleWithCSS', false, false);
  } else {
    // Comandos normales (bold, italic, etc.)
    document.execCommand(cmd, false, val);
  }

  updateFormatButtons();
  refreshOutput();
}

function updateFormatButtons() {
  // 1. Botones de estado (Negrita, Cursiva, etc.)
  const cmds = ['bold','italic','underline','justifyLeft','justifyCenter','justifyRight'];
  cmds.forEach(cmd => {
    const btns = document.querySelectorAll('.fmt-btn[onclick*="' + cmd + '"]');
    btns.forEach(btn => btn.classList.toggle('active', document.queryCommandState(cmd)));
  });

  // 2. Actualizar selector de Fuente
  const fontNameSel = document.querySelector('select[onchange*="fontName"]');
  if (fontNameSel) {
    let currentFont = document.queryCommandValue('fontName').replace(/"/g, "");
    fontNameSel.value = currentFont || "Arial"; 
  }

  // 3. Actualizar selector de Tamaño
  const fontSizeSel = document.querySelector('select[onchange*="fontSize"]');
  if (fontSizeSel) {
    let currentSize = document.queryCommandValue('fontSize');
    
    // Si el navegador nos devuelve un tamaño en PX (ej: "24px"), lo mapeamos de vuelta al 1-7
    if (currentSize && currentSize.includes('px')) {
        const pxMap = { '10px':'1','13px':'2','16px':'3','18px':'4','24px':'5','32px':'6','48px':'7' };
        currentSize = pxMap[currentSize] || "3";
    }
    fontSizeSel.value = currentSize || "3";
  }
}

editor.addEventListener('keyup',   updateFormatButtons);
editor.addEventListener('mouseup', updateFormatButtons);
editor.addEventListener('selectionchange', updateFormatButtons);

// ══════════════════════════════════════════════════════════════
//  SISTEMA DE AYUDA
// ══════════════════════════════════════════════════════════════
const HELP_CONTENT = {
  s1: {
    icon:'📝', title:'Crear contenido',
    html:`
      <p>El editor permite crear contenido Moodle de varias formas, según el material de partida:</p>
      <ol>
        <li><strong>Escribir directamente:</strong> haz clic en la zona blanca del editor y redacta el contenido como en un procesador de textos.</li>
        <li><strong>Abrir Word (.docx):</strong> pulsa <strong>📂 Abrir Word (.docx)</strong> para convertir automáticamente títulos, párrafos, listas, tablas e imágenes.</li>
        <li><strong>Pegar desde Word:</strong> copia en Word con <kbd>Ctrl+C</kbd>, haz clic en el editor y pega con <kbd>Ctrl+V</kbd>. Si el contenido viene de Word, el editor lo limpia y lo adapta.</li>
        <li><strong>Pegar texto simple:</strong> si pegas texto sin formato, el editor lo convierte en párrafos legibles compatibles con Moodle.</li>
        <li><strong>Reabrir contenido ya publicado:</strong> usa <strong>📥 Añadir HTML Moodle</strong> para recuperar HTML generado previamente con este editor y copiado desde Moodle.</li>
      </ol>
      <p>Para obtener mejores resultados desde Word, usa estilos reales de título: <strong>Título 1, Título 2, Título 3</strong>. No basta con poner el texto en negrita o aumentar el tamaño manualmente.</p>
      <div class="help-tip">💡 Atajos útiles en Word: <kbd>Ctrl+Alt+1</kbd> para Título 1, <kbd>Ctrl+Alt+2</kbd> para Título 2, <kbd>Ctrl+Alt+3</kbd> para Título 3 y <kbd>Ctrl+0</kbd> para volver a texto normal.</div>
      <div class="help-tip">⚠️ Si pegas desde Word Online, la detección de títulos puede ser menos precisa. Para documentos complejos, es preferible Word de escritorio o abrir el archivo .docx directamente.</div>`
  },
  s2: {
    icon:'🧩', title:'Bloques especiales',
    html:`
      <p>Los bloques especiales sirven para destacar información didáctica o institucional sin tener que escribir HTML manualmente.</p>
      <ol>
        <li>Coloca el cursor donde quieres insertar el bloque.</li>
        <li>Pulsa el botón correspondiente en el panel de herramientas.</li>
        <li>Edita el texto directamente dentro del bloque.</li>
        <li>Pulsa <kbd>Enter</kbd> para añadir líneas dentro del bloque.</li>
        <li>Pulsa <kbd>Alt+Enter</kbd> para salir del bloque y crear una línea nueva fuera de él.</li>
      </ol>
      <p>Bloques disponibles:</p>
      <ul>
        <li><strong>🎯 Objetivo:</strong> aprendizaje esperado o capacidad que debe adquirir el alumno.</li>
        <li><strong>🤔 Reflexión:</strong> pregunta para activar pensamiento crítico antes de continuar.</li>
        <li><strong>⚠️ Aviso:</strong> advertencia importante, especialmente útil en seguridad o procedimientos.</li>
        <li><strong>ℹ️ Info:</strong> información complementaria o aclaratoria.</li>
        <li><strong>💡 Consejo:</strong> recomendación práctica del instructor.</li>
        <li><strong>🔢 Paso:</strong> fase o instrucción dentro de un procedimiento.</li>
        <li><strong>🛠️ Práctica:</strong> actividad, ejercicio o tarea aplicada.</li>
        <li><strong>«» Cita:</strong> referencia, cita textual o idea destacada.</li>
        <li><strong>📚 Extra:</strong> ampliación o material opcional.</li>
        <li><strong>Definición:</strong> término y explicación en formato de ficha.</li>
        <li><strong>Secuencia:</strong> bloque guiado con varios pasos operativos.</li>
      </ul>
      <div class="help-tip">💡 Regla clave: <kbd>Enter</kbd> escribe dentro del bloque; <kbd>Alt+Enter</kbd> sale del bloque y te deja continuar debajo.</div>
      <div class="help-tip">💡 Para mover un bloque, selecciónalo, córtalo con <kbd>Ctrl+X</kbd> y pégalo donde quieras con <kbd>Ctrl+V</kbd>.</div>`
  },
  s3: {
    icon:'🖼️', title:'Imágenes',
    html:`
      <p>Puedes insertar imágenes de cuatro formas:</p>
      <ol>
        <li><strong>Desde tu equipo:</strong> pulsa <strong>🖼️ Imagen</strong>, elige el archivo, define pie de foto y ancho.</li>
        <li><strong>Desde URL:</strong> pulsa <strong>Imagen URL</strong>, pega la dirección de la imagen y define pie de foto y ancho.</li>
        <li><strong>Arrastrando:</strong> suelta una imagen directamente sobre el editor.</li>
        <li><strong>Desde Word:</strong> las imágenes incluidas en un .docx se detectan e incrustan automáticamente.</li>
      </ol>
      <p>Las imágenes locales se comprimen automáticamente para que el contenido no sea excesivamente pesado.</p>
      <p>Al hacer clic sobre una imagen aparece una barra rápida para ajustar el tamaño a <strong>100%</strong>, <strong>75%</strong>, <strong>50%</strong> o <strong>Auto</strong>.</p>
      <div class="help-tip">💡 El pie de foto es editable. Si estás escribiendo en él, <kbd>Enter</kbd> añade línea dentro del título y <kbd>Alt+Enter</kbd> sale del bloque de imagen.</div>
      <div class="help-tip">⚠️ Si usas una imagen por URL, asegúrate de que el alumnado tendrá permiso para verla desde Moodle.</div>`
  },
  s4: {
    icon:'🎬', title:'Vídeos',
    html:`
      <p>Para insertar un vídeo, coloca el cursor donde quieras el recurso y pulsa <strong>🎬 Vídeo</strong>.</p>
      <ul>
        <li><strong>YouTube:</strong> pega la URL normal del vídeo o de YouTube Shorts. El editor la convierte automáticamente a formato insertable.</li>
        <li><strong>Mediateca EducaMadrid:</strong> usa la URL del iframe o la dirección de inserción que proporciona la mediateca.</li>
        <li><strong>Otras plataformas:</strong> usa una URL embed compatible mediante iframe.</li>
      </ul>
      <p>El vídeo se inserta dentro de un bloque visual adaptado al ancho del contenido y con título editable.</p>
      <div class="help-tip">💡 Si estás editando el título del vídeo, <kbd>Alt+Enter</kbd> te saca del recurso y crea una línea nueva debajo.</div>
      <div class="help-tip">⚠️ Comprueba siempre que el vídeo está accesible para el alumnado y no depende de una sesión privada.</div>`
  },
  s5: {
    icon:'📄', title:'PDF y presentaciones',
    html:`
      <p>El editor permite incrustar documentos para que el alumnado los consulte dentro de Moodle.</p>
      <p><strong>PDF:</strong></p>
      <ol>
        <li>Sube el PDF a Moodle y copia una URL definitiva, preferiblemente <code>pluginfile.php</code>.</li>
        <li>Pulsa <strong>📄 PDF</strong>.</li>
        <li>Pega la URL, escribe título y elige altura del visor.</li>
        <li>Opcionalmente activa la protección para ocultar botones de descarga e impresión en navegadores compatibles.</li>
      </ol>
      <p><strong>Presentaciones:</strong></p>
      <ul>
        <li>OneDrive / SharePoint: usa el enlace de inserción o una URL compatible con Office online.</li>
        <li>Google Slides: usa la opción publicar/insertar.</li>
        <li>Moodle: usa enlaces accesibles para el alumnado.</li>
      </ul>
      <div class="help-tip">💡 Si editas el título de un PDF o presentación, <kbd>Alt+Enter</kbd> sale del recurso y crea una línea nueva debajo.</div>
      <div class="help-tip">⚠️ Evita URLs <code>draftfile.php</code>; suelen dejar de funcionar al guardar o al cambiar de usuario.</div>`
  },
  s6: {
    icon:'📊', title:'Tablas',
    html:`
      <p>Puedes crear tablas desde el asistente o importarlas desde Word.</p>
      <p><strong>Desde el asistente:</strong></p>
      <ol>
        <li>Pulsa <strong>📊 Tabla</strong>.</li>
        <li>Indica columnas, filas y si quieres fila de cabecera.</li>
        <li>Edita cualquier celda haciendo clic sobre ella.</li>
      </ol>
      <p><strong>Desde Word:</strong> el editor intenta conservar colores, celdas combinadas y formato básico.</p>
      <ul>
        <li><kbd>Enter</kbd> dentro de una celda crea salto de línea dentro de esa celda.</li>
        <li><kbd>Alt+Enter</kbd> dentro de una celda sale de la tabla completa y crea una línea debajo.</li>
      </ul>
      <div class="help-tip">💡 Las tablas se envuelven en un bloque adaptable para evitar que se salgan del ancho en Moodle.</div>
      <div class="help-tip">⚠️ Evita tablas demasiado anchas o con demasiadas columnas si el alumnado las verá en móvil.</div>`
  },
  s7: {
    icon:'📋', title:'Copiar a Moodle',
    html:`
      <p>Cuando el contenido esté listo:</p>
      <ol>
        <li>Selecciona el <strong>módulo</strong> en el desplegable inferior.</li>
        <li>Elige si quieres exportar como <strong>Documento completo</strong> o <strong>Solo bloque</strong>.</li>
        <li>Pulsa <strong>📋 Copiar para pegar en Moodle</strong>.</li>
        <li>En Moodle, abre la página, libro o recurso donde quieres pegar.</li>
        <li>Abre el editor HTML con el botón <strong>&lt;/&gt;</strong>.</li>
        <li>Pega con <kbd>Ctrl+V</kbd> y guarda.</li>
      </ol>
      <p>Si está activado <strong>Documento completo</strong>, el editor añade cabecera y pie institucional con el módulo seleccionado.</p>
      <div class="help-tip">💡 Usa siempre el modo HTML de Moodle. No pegues este código directamente en la vista visual del editor.</div>
      <div class="help-tip">⚠️ Si después editas mucho el HTML directamente en Moodle, puede ser más difícil reabrirlo en el editor sin perder estructura.</div>`
  },
  s8: {
    icon:'⌨️', title:'Atajos de teclado',
    html:`
      <p>Atajos principales dentro del editor:</p>
      <ul>
        <li><kbd>Ctrl+Z</kbd> — deshacer.</li>
        <li><kbd>Ctrl+Y</kbd> — rehacer.</li>
        <li><kbd>Ctrl+V</kbd> — pegar texto o contenido desde Word.</li>
        <li><kbd>Ctrl+X</kbd> — cortar selección o bloque seleccionado.</li>
        <li><kbd>Ctrl+B</kbd> — negrita.</li>
        <li><kbd>Ctrl+I</kbd> — cursiva.</li>
        <li><kbd>Ctrl+U</kbd> — subrayado.</li>
        <li><kbd>Enter</kbd> dentro de un bloque editable — añade una línea dentro del mismo bloque.</li>
        <li><kbd>Alt+Enter</kbd> dentro de un bloque, tabla o recurso — sale del bloque actual y crea una línea nueva debajo.</li>
        <li><kbd>Enter</kbd> dentro de una celda — salto de línea dentro de la celda.</li>
        <li><kbd>Escape</kbd> — cierra algunos modales abiertos.</li>
      </ul>
      <p>Atajos recomendados en Word antes de importar:</p>
      <ul>
        <li><kbd>Ctrl+Alt+1</kbd> — Título 1.</li>
        <li><kbd>Ctrl+Alt+2</kbd> — Título 2.</li>
        <li><kbd>Ctrl+Alt+3</kbd> — Título 3.</li>
        <li><kbd>Ctrl+0</kbd> — volver al estilo normal.</li>
      </ul>
      <div class="help-tip">💡 Recuerda: <kbd>Enter</kbd> escribe dentro; <kbd>Alt+Enter</kbd> te permite continuar fuera.</div>`
  },
  s9: {
    icon:'✉️', title:'Contacto y sugerencias',
    html:`
      <p>Si encuentras algún problema o tienes sugerencias, escribe al equipo técnico:</p>
      <div style="text-align:center;margin:20px 0;">
        <a href="mailto:aulavirtualcbcm@madrid.org"
           style="display:inline-block;background:#C0272D;color:#fff;padding:12px 28px;border-radius:8px;font-weight:700;font-size:15px;text-decoration:none;box-shadow:0 4px 12px rgba(192,39,45,.3);">
          ✉️ aulavirtualcbcm@madrid.org
        </a>
      </div>
      <p>Incluye siempre:</p>
      <ul>
        <li>curso o módulo afectado,</li>
        <li>navegador utilizado,</li>
        <li>qué estabas intentando hacer,</li>
        <li>captura o ejemplo del contenido si es posible.</li>
      </ul>
      <div class="help-tip">💡 Para incidencias urgentes, indica la fecha límite en el asunto del correo.</div>`
  },
  s10: {
    icon:'📚', title:'Selector de módulo',
    html:`
      <p>El selector de módulo está en la zona inferior del panel de herramientas.</p>
      <p>Es obligatorio seleccionarlo antes de copiar si vas a exportar como <strong>Documento completo</strong>, porque el módulo aparece en la cabecera y el pie institucional.</p>
      <ul>
        <li>Cuando eliges un módulo, el desplegable se marca visualmente.</li>
        <li>Si intentas copiar sin módulo, el editor muestra un aviso.</li>
        <li>La opción <strong>Ayuda · Equipo Técnico</strong> sirve para contenidos de soporte o documentación interna.</li>
      </ul>
      <div class="help-tip">💡 Si solo necesitas un fragmento sin cabecera ni pie, desactiva <strong>Documento completo</strong> antes de copiar.</div>`
  },
  s11: {
    icon:'⚙️', title:'Cómo funciona el editor',
    html:`
      <p>El editor genera HTML compatible con Moodle mediante estilos inline. Esto evita depender de hojas CSS externas que Moodle podría eliminar o no cargar.</p>
      <ul>
        <li>Los textos y bloques institucionales se optimizan a un ancho aproximado de 800px.</li>
        <li>Los recursos visuales —imágenes, vídeos, PDF, presentaciones y tablas— se optimizan a un ancho aproximado de 1000px.</li>
        <li>Al copiar, se eliminan atributos de edición y clases internas que Moodle no necesita.</li>
        <li>Las tablas se suavizan para evitar bordes negros o estilos heredados.</li>
        <li>Los saltos de línea dentro de bloques se conservan en la exportación.</li>
      </ul>
      <div class="help-tip">💡 El objetivo es que lo que ves en la previsualización sea lo más parecido posible a lo que verá el alumnado en Moodle.</div>
      <div class="help-tip">⚠️ No añadas scripts ni widgets externos dentro del HTML: Moodle puede bloquearlos y además pueden comprometer la estabilidad del contenido.</div>`
  },
  s12: {
    icon:'📥', title:'Reabrir HTML Moodle',
    html:`
      <p>La opción <strong>📥 Añadir HTML Moodle</strong> permite recuperar contenido que fue creado con este editor, pegado en Moodle y después copiado de nuevo desde el modo HTML de Moodle.</p>
      <ol>
        <li>En Moodle, abre el recurso o página que contiene el material.</li>
        <li>Entra en el editor HTML con el botón <strong>&lt;/&gt;</strong>.</li>
        <li>Copia todo el HTML.</li>
        <li>Vuelve a este editor y pulsa <strong>📥 Añadir HTML Moodle</strong>.</li>
        <li>Pega el HTML en la ventana.</li>
        <li>Elige si quieres sustituir el contenido actual o añadirlo al final.</li>
        <li>Pulsa <strong>Procesar e insertar</strong>.</li>
      </ol>
      <p>El importador limpia envoltorios de Moodle, elimina cabeceras y pies antiguos para evitar duplicados, conserva estilos inline, tablas, imágenes, vídeos, PDF y presentaciones.</p>
      <div class="help-tip">💡 Esta función está pensada para HTML generado previamente con este editor, no para importar cualquier HTML externo de internet.</div>
      <div class="help-tip">⚠️ Si Moodle ha modificado mucho el HTML manualmente, revisa el resultado antes de volver a copiarlo.</div>`
  }
};

function openHelp()  {
  showHelpCards();
  document.getElementById('helpModal').classList.add('open');
}
function closeHelp() { document.getElementById('helpModal').classList.remove('open'); }

function showHelpCards() {
  document.getElementById('helpCards').style.display = 'block';
  document.getElementById('helpSection').style.display = 'none';
  document.getElementById('helpBody').scrollTop = 0;
}

function showHelpSection(id) {
  const data = HELP_CONTENT[id];
  if (!data) return;
  document.getElementById('helpCards').style.display = 'none';
  document.getElementById('helpSectionContent').innerHTML =
    '<div class="help-section-title"><span>' + data.icon + '</span>' + data.title + '</div>' +
    '<div class="help-section-body">' + data.html + '</div>';
  document.getElementById('helpSection').style.display = 'block';
  document.getElementById('helpBody').scrollTop = 0;
}

document.getElementById('helpModal').addEventListener('click', e => {
  if (e.target.id === 'helpModal') closeHelp();
});
document.getElementById('helpModal').addEventListener('keydown', e => {
  if (e.key === 'Escape') closeHelp();
});

// ══════════════════════════════════════════════════════════════
//  TABLAS EDITABLES
// ══════════════════════════════════════════════════════════════
const tableObserver = new MutationObserver(mutations => {
  mutations.forEach(m => {
    m.addedNodes.forEach(node => {
      if (node.nodeType !== 1) return;
      const cells = node.querySelectorAll ? node.querySelectorAll('td, th') : [];
      cells.forEach(cell => {
        if (!cell.getAttribute('contenteditable')) {
          cell.setAttribute('contenteditable', 'true');
          cell.style.outline = 'none';
          cell.style.cursor = 'text';
          cell.addEventListener('input', () => {
            clearTimeout(refreshTimer);
            refreshTimer = setTimeout(refreshOutput, 300);
          });
        }
      });
    });
  });
});
tableObserver.observe(editor, { childList: true, subtree: true });


// ══════════════════════════════════════════════════════════════
//  PREVISUALIZACIÓN FIEL A EXPORTACIÓN MOODLE
//  Texto/bloques: 800px · Recursos: 1000px
// ══════════════════════════════════════════════════════════════
function syncPreviewExportClasses() {
  if (!editor) return;
  if (typeof normalizeEditorVisualGrid === 'function') {
    normalizeEditorVisualGrid(editor);
    return;
  }
  Array.from(editor.children).forEach(el => {
    if (!el || el.nodeType !== 1) return;
    el.classList.remove('moodle-content-block', 'moodle-media-block-preview');
    const tag = el.tagName ? el.tagName.toLowerCase() : '';
    const hasMedia = !!(el.querySelector && el.querySelector('img,iframe,video,audio,table'));
    const isPureImageMediaBlock = el.classList.contains('moodle-media-block') && !!el.querySelector('img') && !el.querySelector('iframe,video,audio,table');
    if (isPureImageMediaBlock) {
      el.style.textAlign = 'center'; el.style.width = '100%'; el.style.maxWidth = EXPORT_MEDIA_MAX;
      el.style.marginLeft = 'auto'; el.style.marginRight = 'auto'; el.style.boxSizing = 'border-box';
      el.style.border = 'none'; el.style.background = 'transparent'; el.style.backgroundColor = 'transparent';
      el.style.boxShadow = 'none'; el.style.borderRadius = '0'; el.style.padding = '0'; el.style.overflow = 'visible';
      return;
    }
    if (tag === 'table' || hasMedia || el.classList.contains('moodle-media-block')) el.classList.add('moodle-media-block-preview');
    else el.classList.add('moodle-content-block');
  });
}
const previewExportObserver = new MutationObserver(() => syncPreviewExportClasses());
previewExportObserver.observe(editor, { childList:true, subtree:false });
editor.addEventListener('input', syncPreviewExportClasses);
setTimeout(syncPreviewExportClasses, 0);

// ══════════════════════════════════════════════════════════════
