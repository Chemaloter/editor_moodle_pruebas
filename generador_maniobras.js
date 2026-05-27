/* ══════════════════════════════════════════════════════════════
   GENERADOR DE MANIOBRAS DE PARQUE · CBCM · v2.0
   Cargado con Babel Standalone. Requiere React 18 + ReactDOM 18.
   Genera HTML Moodle-safe, coherente con la estética del editor principal.
   ══════════════════════════════════════════════════════════════ */

const { useState } = React;

/* ─────────────────────────────────────────────────────────────
   Utilidades HTML
   ───────────────────────────────────────────────────────────── */
function mEsc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function nl2br(s) {
  return mEsc(s).replace(/\r?\n/g, "<br>");
}
function hasText(v) {
  return String(v || "").trim().length > 0;
}
function cleanArr(arr) {
  return (arr || []).filter(x => hasText(typeof x === "string" ? x : JSON.stringify(x || {})));
}
function todayRevision() {
  return new Date().toISOString().slice(0, 10).replace(/-/g, "");
}
function newImage() {
  return { mode: "url", url: "", src: "", name: "", caption: "", width: "100%" };
}
function newVideo() {
  return { url: "", titulo: "", descripcion: "" };
}
function newStep() {
  return { titulo: "", texto: "", imagenes: [], videos: [] };
}
function newRole() {
  return { nombre: "", acciones: [""] };
}

function newPractica() {
  return {
    titulo: "",
    descripcion: "",
    organizacion: "",
    roles: [newRole()],
    pasos: [newStep()],
    imagenes: [],
    videos: [],
    precauciones: "",
    recordatorio: ""
  };
}
function newRisk() {
  return { riesgo: "", causa: "", grado: "Notable", medida: "" };
}
function newChecklistItem() {
  return { campo: "", descripcion: "" };
}

const TEMPLATE_OPTIONS = [
  { value: "hidraulica-y-tendidos", label: "hidráulica y tendidos" },
  { value: "extincion-incendios-urbanos-industriales", label: "extinción de incendios urbanos e industriales" },
  { value: "extincion-incendios-forestales", label: "extinción de incendios forestales" },
  { value: "sustancias-peligrosas", label: "intervención con sustancias peligrosas" },
  { value: "poligono-de-fuego", label: "polígono de fuego" },
  { value: "conduccion-todo-terreno", label: "conducción todo terreno" },
  { value: "conduccion-urbana", label: "conducción urbana" },
  { value: "salvamento-altura-espacios-confinados", label: "salvamento en altura y espacios confinados" },
  { value: "rescates-accidentes-trafico", label: "rescates en accidentes de tráfico" },
  { value: "rescates-medio-acuatico", label: "rescates en medio acuático" },
  { value: "phtls-soporte-vital-basico", label: "PHTLS y soporte vital básico" },
  { value: "fenomenos-naturales", label: "actuación en fenómenos naturales" },
  { value: "apeos-apuntalamientos-saneamientos", label: "apeos, apuntalamientos y saneamientos I" },
  { value: "riesgo-electrico", label: "riesgo eléctrico" },
  { value: "instalaciones-gas", label: "instalaciones de gas" },
  { value: "sistemas-comunicaciones-prl-igualdad-ef", label: "sistemas, comunicaciones, PRL, igualdad y educación física" },
  { value: "tentativa-suicida", label: "intervenciones por tentativa suicida" },
  { value: "autoescala-camion-grua", label: "autoescala y camión-grúa" },
  { value: "practicas-conduccion-i", label: "prácticas de conducción I" },
  { value: "practicas-conduccion-ii", label: "prácticas de conducción II" },
  { value: "practicas-parque", label: "prácticas de parque" },
  { value: "eras-y-tendidos", label: "eras y tendidos" },
  { value: "rescate-ascensores", label: "rescate en ascensores" },
  { value: "accesos-forzosos", label: "accesos forzosos" },
  { value: "rescate-animales", label: "rescate de animales" }
];
function templateLabel(value) {
  const item = TEMPLATE_OPTIONS.find(t => t.value === value);
  return item ? item.label : "maniobra estándar";
}

/* ─────────────────────────────────────────────────────────────
   Estilos de salida: coherentes con el editor principal
   ───────────────────────────────────────────────────────────── */
const OUT = {
  font: "Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
  red: "#C0272D",
  redDark: "#9b1e23",
  text: "#2d2d2d",
  muted: "#6b7280",
  border: "#e4e7ec",
  borderSoft: "#edf0f4",
  contentMax: "800px",
  mediaMax: "1000px"
};
const pageStyle = `font-family:${OUT.font};font-size:16px;line-height:1.8;color:${OUT.text};background:transparent;width:100%;max-width:none;margin:0 auto;box-sizing:border-box;`;
const contentBox = `max-width:${OUT.contentMax};width:100%;margin-left:auto;margin-right:auto;box-sizing:border-box;`;
const mediaBox = `max-width:${OUT.mediaMax};width:100%;margin-left:auto;margin-right:auto;box-sizing:border-box;`;
const pStyle = `font-family:${OUT.font};font-size:15px;line-height:1.8;color:${OUT.text};margin:10px 0;`;
const smallStyle = `font-family:${OUT.font};font-size:14px;line-height:1.65;color:${OUT.muted};margin:8px 0;`;
const h1Style = `display:inline-block;background-color:${OUT.red};color:#ffffff;padding:12px 24px;border-radius:6px;font-family:${OUT.font};font-size:20px;font-weight:800;letter-spacing:.3px;line-height:1.3;`;
const h2Style = `display:inline-block;background-color:#8E1B1F;color:#ffffff;padding:10px 20px;border-radius:6px;font-family:${OUT.font};font-size:17px;font-weight:800;letter-spacing:.2px;line-height:1.3;`;
const h3Style = `display:inline-block;background-color:#fff0f0;color:#6b1215;border-left:4px solid ${OUT.red};padding:8px 18px;border-radius:0 5px 5px 0;font-family:${OUT.font};font-size:15px;font-weight:800;line-height:1.4;`;
const h4Style = `display:inline-block;color:${OUT.red};border-bottom:2px solid #e8b4b5;padding:4px 2px;font-family:${OUT.font};font-size:14px;font-weight:800;letter-spacing:.1px;`;
const blockStyle = `display:block;width:100%;max-width:${OUT.contentMax};margin:18px auto;box-sizing:border-box;overflow-wrap:anywhere;word-break:normal;font-family:${OUT.font};font-size:16px;background-color:#ffffff;border:1px solid ${OUT.border};border-left:5px solid ${OUT.red};color:${OUT.text};padding:14px 20px;border-radius:0 8px 8px 0;line-height:1.7;`;
const infoBlockStyle = `display:block;width:100%;max-width:${OUT.contentMax};margin:14px auto;box-sizing:border-box;font-family:${OUT.font};font-size:15px;background-color:#eff6ff;border-left:5px solid #1d4ed8;color:#1e3a8a;padding:12px 20px;border-radius:0 6px 6px 0;font-weight:600;line-height:1.6;`;
const noteBlockStyle = `display:block;width:100%;max-width:${OUT.contentMax};margin:14px auto;box-sizing:border-box;font-family:${OUT.font};font-size:15px;background-color:#fffbeb;border-top:4px solid #f59e0b;border-left:4px solid #f59e0b;color:#78350f;padding:12px 20px;border-radius:0 6px 6px 6px;font-weight:700;line-height:1.6;`;
const tableStyle = `width:100%;border-collapse:separate;border-spacing:0;font-family:${OUT.font};font-size:14px;border:1px solid ${OUT.borderSoft};border-radius:12px;overflow:hidden;background:#ffffff;box-sizing:border-box;`;
const thStyle = `background-color:#fff7f7;color:${OUT.redDark};padding:10px 14px;text-align:left;font-weight:800;border:none;border-right:1px solid ${OUT.borderSoft};border-bottom:1px solid ${OUT.borderSoft};font-size:13px;line-height:1.55;`;
const tdStyle = `padding:9px 14px;border:none;border-right:1px solid ${OUT.borderSoft};border-bottom:1px solid ${OUT.borderSoft};color:${OUT.text};vertical-align:top;font-size:14px;line-height:1.6;`;

function wrapContent(html) {
  return `<div style="${contentBox}">${html}</div>`;
}
function heading(level, text) {
  if (!hasText(text)) return "";
  const style = level === 1 ? h1Style : level === 2 ? h2Style : level === 3 ? h3Style : h4Style;
  return `<div style="${contentBox};margin-top:18px;margin-bottom:10px;"><div style="${style}">${mEsc(text)}</div></div>`;
}
function paragraph(text, style = pStyle) {
  return hasText(text) ? `<p style="${style}">${nl2br(text)}</p>` : "";
}
function listBlock(items) {
  const vals = (items || []).filter(v => hasText(v));
  if (!vals.length) return "";
  return `<ul style="font-family:${OUT.font};font-size:15px;line-height:1.8;color:${OUT.text};margin:10px 0;padding-left:28px;">${vals.map(v => `<li style="margin:5px 0;">${nl2br(v)}</li>`).join("")}</ul>`;
}
function fieldListBlock(title, items) {
  const vals = (items || []).filter(v => hasText(v));
  if (!vals.length) return "";
  return `${heading(4, title)}${wrapContent(listBlock(vals))}`;
}
function renderImages(images) {
  return (images || []).map(img => {
    const src = img.mode === "file" ? img.src : img.url;
    if (!hasText(src)) return "";
    const width = img.width || "100%";
    const isAuto = width === "auto";
    const containerW = isAuto ? "max-width:100%;" : `width:${width};max-width:100%;`;
    const imgStyle = isAuto
      ? "max-width:100%;width:auto;height:auto;border-radius:6px;display:block;margin:0 auto;box-sizing:border-box;"
      : "width:100%;max-width:100%;height:auto;border-radius:6px;display:block;box-sizing:border-box;";
    const caption = img.caption || img.name || "Recurso visual";
    return `<div class="moodle-media-block" style="text-align:center;margin:20px auto;width:100%;max-width:${OUT.mediaMax};box-sizing:border-box;">
      <div style="display:inline-block;${containerW}background:#fff;border:1px solid #d1d1d1;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.12);font-family:${OUT.font};box-sizing:border-box;">
        <div style="text-align:center;background:#f0f0f0;padding:16px;box-sizing:border-box;"><img src="${src}" alt="${mEsc(caption)}" style="${imgStyle}"></div>
        <div style="padding:12px 16px;background:#f9f9f9;border-top:1px solid #d1d1d1;text-align:center;box-sizing:border-box;"><span style="font-weight:700;color:#333;font-size:16px;line-height:1.5;display:block;overflow-wrap:anywhere;">🖼️ ${mEsc(caption)}</span></div>
      </div>
    </div>`;
  }).join("\n");
}
function normalizeVideoUrl(url) {
  let src = String(url || "").trim();
  try {
    const ytWatch = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const ytShort = src.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
    const vimeo = src.match(/vimeo\.com\/(\d+)/);
    if (ytWatch) src = "https://www.youtube.com/embed/" + ytWatch[1];
    else if (ytShort) src = "https://www.youtube.com/embed/" + ytShort[1];
    else if (vimeo) src = "https://player.vimeo.com/video/" + vimeo[1];
  } catch(e) {}
  return src;
}
function renderVideos(videos) {
  return (videos || []).map(v => {
    const url = typeof v === "string" ? v : v.url;
    if (!hasText(url)) return "";
    const src = normalizeVideoUrl(url);
    const title = typeof v === "string" ? "Vídeo explicativo" : (v.titulo || "Vídeo explicativo");
    const desc = typeof v === "string" ? "" : v.descripcion;
    return `<div class="moodle-media-block" style="width:100%;max-width:${OUT.mediaMax};margin:20px auto;background:#fff;border:1px solid #d1d1d1;box-sizing:border-box;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.12);font-family:${OUT.font};">
      <div style="position:relative;width:100%;padding-bottom:56.25%;background:#000;"><iframe src="${mEsc(src)}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen></iframe></div>
      <div style="padding:14px 18px;background:#f9f9f9;border-top:1px solid #d1d1d1;text-align:center;"><span style="font-weight:700;color:#333;font-size:1.05em;display:block;">🎬 ${mEsc(title)}</span>${hasText(desc) ? `<div style="${smallStyle};margin-top:6px;">${nl2br(desc)}</div>` : ""}</div>
    </div>`;
  }).join("\n");
}
function renderStep(step, idx) {
  if (!hasText(step.titulo) && !hasText(step.texto) && !(step.imagenes || []).some(i => hasText(i.url) || hasText(i.src)) && !(step.videos || []).some(v => hasText(v.url))) return "";
  return `<div style="${blockStyle};border-left-color:#4338ca;background-color:#eef2ff;color:#1e1b4b;">
    <div style="display:flex;gap:14px;align-items:flex-start;">
      <div style="flex:0 0 auto;width:34px;height:34px;border-radius:50%;background:#4338ca;color:#fff;font-weight:800;display:flex;align-items:center;justify-content:center;">${idx + 1}</div>
      <div style="flex:1 1 auto;min-width:0;">
        ${hasText(step.titulo) ? `<div style="font-weight:800;margin-bottom:6px;">${mEsc(step.titulo)}</div>` : ""}
        ${paragraph(step.texto, `font-family:${OUT.font};font-size:15px;line-height:1.75;color:#1e1b4b;margin:0 0 10px 0;`)}
      </div>
    </div>
  </div>${renderImages(step.imagenes)}${renderVideos(step.videos)}`;
}
function renderSubmaniobra(sm, idx) {
  if (!hasText(sm.titulo) && !hasText(sm.descripcion) && !(sm.pasos || []).length) return "";
  return `${heading(4, `Submaniobra ${idx + 1}${hasText(sm.titulo) ? " · " + sm.titulo : ""}`)}
    ${wrapContent(paragraph(sm.descripcion))}
    ${renderImages(sm.imagenes)}${renderVideos(sm.videos)}
    ${(sm.pasos || []).map(renderStep).join("\n")}`;
}
function renderPractice(pr, idx) {
  if (!hasText(pr.titulo) && !hasText(pr.descripcion) && !(pr.pasos || []).length ) return "";
  const rolesHtml = (pr.roles || []).filter(r => hasText(r.nombre) || (r.acciones || []).some(hasText)).map(r => {
    return `<div style="${infoBlockStyle};background-color:#f8fafc;border-left-color:#94a3b8;color:#334155;"><strong>${mEsc(r.nombre || "Rol")}</strong>${listBlock(r.acciones)}</div>`;
  }).join("\n");
  return `${heading(3, `PRÁCTICA ${String(idx + 1).padStart(2, "0")}${hasText(pr.titulo) ? ": " + pr.titulo : ""}`)}
    ${wrapContent(paragraph(pr.descripcion))}
    ${hasText(pr.organizacion) ? `${heading(4, "Organización de esta práctica")}${wrapContent(paragraph(pr.organizacion))}` : ""}
    ${rolesHtml}
    ${renderImages(pr.imagenes)}${renderVideos(pr.videos)}
    ${heading(4, "Secuencia operativa")}
    ${(pr.pasos || []).map(renderStep).join("\n")}
    ${hasText(pr.precauciones) ? `<div style="${noteBlockStyle}">⚠️ ${nl2br(pr.precauciones)}</div>` : ""}
    ${hasText(pr.recordatorio) ? `<div style="${infoBlockStyle}">💡 <strong>Recordad:</strong> ${nl2br(pr.recordatorio)}</div>` : ""}`;
}
function renderRiskTable(riesgos, titulo) {
  const rows = (riesgos || []).filter(r => hasText(r.riesgo) || hasText(r.causa) || hasText(r.medida));
  if (!rows.length) return "";
  const body = rows.map(r => `<tr>
    <td style="${tdStyle}">${nl2br(r.riesgo)}</td>
    <td style="${tdStyle}">${nl2br(r.causa)}</td>
    <td style="${tdStyle};text-align:center;"><span style="display:inline-block;padding:3px 9px;border-radius:999px;font-size:11px;font-weight:800;background:${r.grado === "Notable" ? "#fff7ed" : r.grado === "Moderado" ? "#fffbeb" : "#f0fdf4"};color:${r.grado === "Notable" ? "#9a3412" : r.grado === "Moderado" ? "#92400e" : "#166534"};border:1px solid ${r.grado === "Notable" ? "#fed7aa" : r.grado === "Moderado" ? "#fde68a" : "#bbf7d0"};">${mEsc(r.grado || "")}</span></td>
    <td style="${tdStyle};border-right:none;">${nl2br(r.medida)}</td>
  </tr>`).join("");
  return `<div class="moodle-media-block" style="overflow-x:auto;margin:18px auto;width:100%;max-width:${OUT.mediaMax};box-sizing:border-box;">
    <table style="${tableStyle}">
      <tr><th colspan="4" style="${thStyle};border-right:none;text-align:center;font-size:14px;">${mEsc(titulo || "Evaluación de riesgos de la maniobra")}</th></tr>
      <tr><th style="${thStyle}">RIESGO</th><th style="${thStyle}">CAUSA</th><th style="${thStyle};text-align:center;">GRADO</th><th style="${thStyle};border-right:none;">MEDIDA PREVENTIVA</th></tr>
      ${body}
    </table>
  </div>`;
}
function renderPlanSOS(plan) {
  const priorities = listBlock(plan.prioridades || []);
  return `${heading(3, "ANEXO · PLAN SOS")}
    <div style="${noteBlockStyle}">${nl2br(plan.senal || "SEÑAL DE EMERGENCIA: 3 REPETICIONES DE LA PALABRA «EMERGENCIA»")}</div>
    ${wrapContent(paragraph(plan.intro1) + paragraph(plan.intro2))}
    ${priorities ? `${heading(4, "Prioridades del plan")}${wrapContent(priorities)}` : ""}
    ${fieldListBlock(plan.leveTitulo || "En caso de accidente leve", plan.leveItems)}
    ${fieldListBlock(plan.graveTitulo || "En caso de accidente grave o muy grave", plan.graveItems)}
    ${wrapContent(paragraph(plan.cierre))}`;
}
function renderChecklist(checklist) {
  if (!checklist.mostrar) return "";
  const rows = (checklist.items || []).filter(it => hasText(it.campo) || hasText(it.descripcion));
  if (!rows.length && !hasText(checklist.intro)) return "";
  const rowHtml = rows.map(it => `<tr><td style="${tdStyle};font-weight:800;width:32%;">${nl2br(it.campo)}</td><td style="${tdStyle};border-right:none;">${nl2br(it.descripcion)}</td></tr>`).join("");
  return `${heading(3, checklist.titulo || "Checklist operativo")}${wrapContent(paragraph(checklist.intro))}
    ${rows.length ? `<div class="moodle-media-block" style="overflow-x:auto;margin:18px auto;width:100%;max-width:${OUT.mediaMax};box-sizing:border-box;"><table style="${tableStyle}"><tr><th style="${thStyle}">COMPROBACIÓN</th><th style="${thStyle};border-right:none;">DETALLE / CRITERIO</th></tr>${rowHtml}</table></div>` : ""}
    ${renderImages(checklist.imagenes || [])}${renderVideos(checklist.videos || [])}`;
}
function renderEvaluacion(ev) {
  if (!ev.mostrar) return "";
  return `${heading(3, "ANEXO · Criterios de evaluación")}
    ${fieldListBlock("Bloque 1 — Críticos", ev.criticos)}
    ${fieldListBlock("Bloque 2 — Técnicos", ev.tecnicos)}
    ${fieldListBlock("Bloque 3 — Actitudinales", ev.actitudinales)}`;
}
function renderHeader(d) {
  const codes = cleanArr([d.codigoIT, ...(d.itCodes || [])]).map(c => `<span style="display:inline-block;color:#17365D;font-weight:800;margin-right:8px;">${mEsc(c)}</span>`).join("");
  return `<div style="${contentBox};margin-top:4px;margin-bottom:20px;border:1.5px solid ${OUT.border};border-left:6px solid ${OUT.red};border-radius:12px;background:#ffffff;padding:18px 22px;box-sizing:border-box;box-shadow:0 3px 12px rgba(15,23,42,.05);">
    <div style="display:flex;justify-content:space-between;gap:14px;align-items:flex-start;flex-wrap:wrap;">
      <div style="min-width:0;flex:1 1 360px;">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:1.5px;color:${OUT.red};font-weight:800;margin-bottom:6px;">${mEsc(d.tipoDocumento || "PRACTICA")}</div>
        <div style="font-size:22px;line-height:1.25;color:${OUT.redDark};font-weight:900;text-transform:uppercase;overflow-wrap:anywhere;">${mEsc(d.titulo || "Maniobra de parque")}</div>
        ${hasText(d.subtitulo) ? `<div style="font-size:14px;color:${OUT.muted};font-weight:600;margin-top:6px;">${nl2br(d.subtitulo)}</div>` : ""}
        ${hasText(d.campania) ? `<div style="font-size:13px;color:#0e7490;font-weight:800;margin-top:8px;">${mEsc(d.campania)}</div>` : ""}
      </div>
      <div style="flex:0 1 220px;text-align:right;">
        <div style="font-size:12px;font-weight:800;color:#111827;">INSTRUCCIÓN TÉCNICA</div>
        <div style="margin-top:4px;">${codes || `<span style="color:${OUT.muted};font-size:12px;">Sin código IT</span>`}</div>
        <div style="margin-top:10px;color:#00B0F0;font-weight:900;font-size:13px;">${mEsc(d.ident || "< IDENT >")}</div>
      </div>
    </div>
  </div>`;
}
function generateHTML(d) {
  const recursosHtml = [
    fieldListBlock("EPI", d.recursos.epis),
    fieldListBlock("Materiales y herramientas", d.recursos.materiales),
    fieldListBlock("Material sanitario", d.recursos.sanitario),
    fieldListBlock("Vehículos", d.recursos.vehiculos),
    fieldListBlock("Escenario", d.recursos.escenario),
    fieldListBlock("Recursos didácticos", d.recursos.didacticos),
    renderImages(d.recursos.imagenes),
    renderVideos(d.recursos.videos)
  ].join("\n");
  const orgHtml = [
    paragraph(d.organizacion.general),
    paragraph(d.organizacion.grupos),
    paragraph(d.organizacion.rotacion),
    fieldListBlock("Funciones del responsable", d.organizacion.funciones),
    fieldListBlock("Roles de participantes", d.organizacion.roles),
    hasText(d.organizacion.seguridad) ? `<div style="${noteBlockStyle}">⚠️ ${nl2br(d.organizacion.seguridad)}</div>` : ""
  ].join("\n");
  return `<div style="${pageStyle}">
    ${renderHeader(d)}
    ${heading(2, "1.- DESCRIPCIÓN")}${wrapContent(paragraph(d.descripcion))}${renderImages(d.descripcionImagenes)}
    ${heading(2, "2.- OBJETIVO PEDAGÓGICO")}${wrapContent(paragraph(d.objetivo))}${renderImages(d.objetivoImagenes)}
    ${heading(2, "3.- DESTINATARIOS")}${wrapContent(paragraph(d.destinatarios))}
    ${heading(2, "4.- ESCENARIO")}${wrapContent(paragraph(d.escenario))}${renderImages(d.escenarioImagenes)}${renderVideos(d.escenarioVideos)}
    ${heading(2, "5.- RECURSOS")}${recursosHtml}
    ${heading(2, "6.- ORGANIZACIÓN DEL GRUPO")}${wrapContent(orgHtml)}
    ${heading(2, "7.- DESARROLLO EXPLICATIVO DE LA PRÁCTICA")}
    ${hasText(d.refDoc) ? `${heading(4, "Documentación de referencia")}${wrapContent(paragraph(d.refDoc, smallStyle))}` : ""}
    ${(d.practicas || []).map(renderPractice).join("\n")}
    ${renderPlanSOS(d.planSOS)}
    ${renderChecklist(d.checklist)}
    ${heading(2, "8.- EVALUACIÓN DE RIESGOS DE LA MANIOBRA")}${renderRiskTable(d.riesgos, d.riesgosTitulo)}
    ${renderEvaluacion(d.evaluacion)}
    <div style="${contentBox};margin-top:26px;margin-bottom:8px;border-top:2px solid ${OUT.border};padding-top:10px;color:${OUT.muted};font-size:12px;line-height:1.5;">
      <strong>Revisión ${mEsc(d.revision)}</strong><br>${nl2br(d.pieTexto)}
    </div>
  </div>`;
}

/* ─────────────────────────────────────────────────────────────
   Estado inicial y plantillas
   ───────────────────────────────────────────────────────────── */
function baseData() {
  return {
    plantilla: "hidraulica-y-tendidos",
    tipoDocumento: "PRACTICA",
    titulo: "",
    subtitulo: "",
    campania: "",
    codigoIT: "IT.JUT1.102",
    itCodes: [],
    ident: "< IDENT >",
    revision: todayRevision(),
    descripcion: "",
    descripcionImagenes: [],
    objetivo: "",
    objetivoImagenes: [],
    destinatarios: "Personal operativo de guardia.",
    escenario: "",
    escenarioImagenes: [],
    escenarioVideos: [],
    recursos: {
      epis: ["U2 completo"],
      materiales: [""],
      sanitario: [""],
      vehiculos: [""],
      escenario: [""],
      didacticos: [""],
      imagenes: [],
      videos: []
    },
    organizacion: {
      general: "Práctica para realizar por los componentes del turno operativo de guardia.",
      grupos: "",
      rotacion: "",
      funciones: [
        "Explicará el desarrollo de la práctica, identificando objetivos, riesgos, secuencia de acciones y Plan SOS.",
        "Supervisará que la ejecución se ajuste a la Ficha de Prácticas y a la Evaluación de Riesgos, controlando las condiciones de seguridad."
      ],
      roles: [""],
      seguridad: "En caso de incidente o accidente, se activará el Plan SOS."
    },
    refDoc: "",
    practicas: [newPractica()],
    planSOS: {
      senal: "SEÑAL DE EMERGENCIA: 3 REPETICIONES DE LA PALABRA «EMERGENCIA»",
      intro1: "En caso de accidente durante el desarrollo de la práctica, cualquier integrante podrá alertar con la señal indicada. A partir de ese momento, todo el personal paraliza su actuación con seguridad y sigue las instrucciones de los instructores / organizadores.",
      intro2: "Cuando haya personal disperso en el terreno, se dispondrá necesariamente de emisoras.",
      prioridades: [
        "Rescate del accidentado cuando fuera necesario.",
        "Primera atención sanitaria in situ con los medios disponibles.",
        "Gestión posterior del accidente conforme a los procedimientos establecidos."
      ],
      leveTitulo: "EN CASO DE ACCIDENTE LEVE",
      leveItems: [
        "Primera atención básica con medios disponibles en el lugar de la práctica.",
        "Avisar al médico de alerta si afecta a personal del CBCM.",
        "Si son necesarios recursos de guardia, aviso inmediato a CECOP (918 354 918)."
      ],
      graveTitulo: "EN CASO DE ACCIDENTE GRAVE O MUY GRAVE",
      graveItems: ["Además de lo previsto para el accidente leve, se trasladará aviso al 112."],
      cierre: "En ambos casos, el parte de accidente/suceso se realizará conforme a la normativa interna del CBCM."
    },
    checklist: { mostrar: false, titulo: "Checklist operativo", intro: "", items: [newChecklistItem()], imagenes: [], videos: [] },
    riesgosTitulo: "EVALUACIÓN DE RIESGOS DE LA MANIOBRA",
    riesgos: [newRisk()],
    evaluacion: { mostrar: false, criticos: [""], tecnicos: [""], actitudinales: [""] },
    pieTexto: "Este documento es propiedad del Cuerpo de Bomberos de la Comunidad de Madrid, y está protegido bajo licencia Creative Commons CC BY-NC-SA 4.0. Se permite la copia, distribución y comunicación siempre que se acredite tanto propiedad como autor/es, no haya fines comerciales y la obra se comparta bajo el mismo tipo de licencia."
  };
}
function templateMayday() {
  const d = baseData();
  d.plantilla = "mayday";
  d.titulo = "MAYDAY RECICLAJE";
  d.campania = "RECICLAJE 2025-2026";
  d.descripcion = "Práctica orientada a reforzar las técnicas de localización, rescate y atención inicial de un bombero en situación de emergencia comprometida.";
  d.objetivo = "Garantizar la seguridad del equipo, reduciendo lesiones, atrapamiento o pérdida de bomberos en intervenciones de incendio estructural.";
  d.recursos.epis = ["U2 completo", "ERA con botella vacía", "Verdugo y guantes de fuego"];
  d.recursos.materiales = ["Lona grande", "Espaldera", "Cinta de rescate Rhinoevac V2"];
  d.recursos.sanitario = ["Botella de O2 con funda", "Mochila sanitaria completa", "Botiquín", "DESA"];
  d.organizacion.grupos = "Para la primera práctica se dividirá a los participantes en grupos de 4. Para la segunda práctica se trabajará por tríos.";
  d.practicas = [
    { ...newPractica(), titulo: "RCP a BX y desvestido rápido", descripcion: "Maniobra en la que un BX sufre una parada cardiorrespiratoria y debe ser extraído a zona segura para iniciar asistencia y retirada de equipo.", roles: [{ nombre:"BX 1", acciones:["Coloca al BX en decúbito supino.","Bloquea el pulmoautomático y retira máscara/casco."] }, { nombre:"BX 2", acciones:["Realiza compresiones torácicas sin interrupciones."] }, { nombre:"BX 3", acciones:["Libera correas y ayuda a retirar chaquetón y ERA."] }], pasos:[newStep()] },
    { ...newPractica(), titulo: "Técnicas de arrastre y rescate con cinta Rhinoevac V2", descripcion: "Práctica de técnicas de arrastre en zonas críticas, pasos estrechos, escaleras y evacuaciones con cinta de rescate.", pasos:[newStep()] }
  ];
  d.checklist = { mostrar:true, titulo:"Checklist · Evaluación y comunicación de emergencia", intro:"Chequeo rápido en zona segura y comunicación de emergencia al exterior.", items:[{campo:"Estado de consciencia", descripcion:"Comprobar respuesta del BX."},{campo:"Máscara", descripcion:"Revisar patillas, visor y fugas de aire."},{campo:"Pulmoautomático", descripcion:"Pulsar y confirmar respiración."},{campo:"Bodyguard", descripcion:"Comprobar presión y tiempo de aire restante."}], imagenes: [], videos: [] };
  d.riesgos = [{riesgo:"Caída de personas al mismo nivel", causa:"Obstáculos, visibilidad reducida o desplazamientos con ERA.", grado:"Notable", medida:"Verificar entorno, coordinar movimientos y extremar precauciones."}];
  return d;
}
function templateSanitaria() {
  const d = baseData();
  d.plantilla = "sanitaria";
  d.titulo = "MANIOBRA DE RAUTEK, COLOCACIÓN DE COLLARÍN CERVICAL Y EVALUACIÓN PRIMARIA";
  d.descripcion = "Extracción de una víctima siguiendo la maniobra de Rautek, colocación de collarín cervical y evaluación primaria de la víctima.";
  d.objetivo = "Realizar movilizaciones adecuadas a las lesiones y posicionamiento de la persona afectada, evitando agravar sus lesiones.";
  d.recursos.epis = ["U2 completo", "Botas", "Casco F1 o F2", "Guantes de intervención y nitrilo"];
  d.recursos.materiales = ["Vehículo ligero", "Collarín cervical"];
  d.recursos.vehiculos = ["Vehículo estabilizado sobre sus cuatro ruedas"];
  d.practicas = [
    { ...newPractica(), titulo:"Maniobra de Rautek", descripcion:"Extracción de víctima desde asiento de piloto o copiloto.", pasos:[newStep()] },
    { ...newPractica(), titulo:"Colocación de collarín cervical", descripcion:"Presentación al paciente, control cervical y ajuste del collarín.", pasos:[newStep()] },
    { ...newPractica(), titulo:"Evaluación primaria de la víctima", descripcion:"Secuencia de valoración inicial siguiendo instrucciones del vídeo de referencia.", pasos:[newStep()] }
  ];
  d.riesgos = [{riesgo:"Sobreesfuerzos", causa:"Movilización de víctimas", grado:"Moderado", medida:"Trabajar con piernas flexionadas y solicitar ayuda para el transporte."}];
  return d;
}
function applyTemplate(name) {
  // Plantillas basadas en las áreas formativas del selector de módulo.
  // No se muestran números de módulo; solo la temática.
  if (name === "rescates-accidentes-trafico" || name === "phtls-soporte-vital-basico") {
    const d = templateSanitaria();
    d.plantilla = name;
    d.titulo = templateLabel(name).toUpperCase();
    return d;
  }
  if (name === "practicas-parque" || name === "extincion-incendios-urbanos-industriales") {
    const d = templateMayday();
    d.plantilla = name;
    d.titulo = templateLabel(name).toUpperCase();
    return d;
  }
  const d = baseData();
  d.plantilla = name;
  d.titulo = templateLabel(name).toUpperCase();
  return d;
}

/* ─────────────────────────────────────────────────────────────
   UI helpers
   ───────────────────────────────────────────────────────────── */
const UI = {
  red: "#C0272D", redDark: "#9b1e23", redSoft: "rgba(192,39,45,.08)",
  border: "#d9dee7", panel: "#f7f8fa", text: "#111827", muted: "#6b7280",
  font: "Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif"
};
const inputStyle = { width:"100%", border:"1.5px solid #d9dee7", borderRadius:"10px", background:"#fff", padding:"9px 12px", fontSize:"13px", color:UI.text, outline:"none", fontFamily:"inherit", boxSizing:"border-box" };
const btnStyle = { padding:"8px 12px", fontSize:"12px", fontWeight:"750", border:"1.5px solid #d9dee7", borderRadius:"10px", background:"#fff", color:UI.muted, cursor:"pointer", fontFamily:"inherit" };
const primaryBtn = { ...btnStyle, background:UI.red, color:"#fff", border:"none", boxShadow:"0 3px 10px rgba(192,39,45,.22)" };
function Panel({children}) { return <div style={{display:"flex", flexDirection:"column", gap:"16px"}}>{children}</div>; }
function Box({title, children, hint}) { return <div style={{border:"1px solid #e5e7eb", borderRadius:"14px", padding:"14px", background:"#fff"}}><div style={{fontWeight:900, color:UI.redDark, marginBottom:hint?4:10}}>{title}</div>{hint && <div style={{fontSize:12,color:UI.muted,lineHeight:1.45,marginBottom:10}}>{hint}</div>}{children}</div>; }
function Label({children}) { return <label style={{fontSize:11,fontWeight:800,color:UI.muted,textTransform:"uppercase",letterSpacing:".08em",marginBottom:5,display:"block"}}>{children}</label>; }
function Inp({value,onChange,placeholder}) { return <input style={inputStyle} value={value || ""} placeholder={placeholder || ""} onChange={e=>onChange(e.target.value)} />; }
function Txt({value,onChange,placeholder,rows=3}) { return <textarea style={{...inputStyle, minHeight: rows*24+24, resize:"vertical", lineHeight:1.45}} rows={rows} value={value || ""} placeholder={placeholder || ""} onChange={e=>onChange(e.target.value)} />; }
function AddBtn({onClick,label}) { return <button type="button" style={btnStyle} onClick={onClick}>{label || "＋ Añadir"}</button>; }
function DelBtn({onClick}) { return <button type="button" style={{...btnStyle,color:"#b91c1c",padding:"6px 10px"}} onClick={onClick}>Eliminar</button>; }
function Row({children}) { return <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12}}>{children}</div>; }
function SimpleListEditor({items,onChange,placeholder}) {
  const arr = items || [];
  const setAt = (i,v)=>onChange(arr.map((x,idx)=>idx===i?v:x));
  const add = ()=>onChange([...arr,""]);
  const rem = (i)=>onChange(arr.filter((_,idx)=>idx!==i));
  return <div style={{display:"flex",flexDirection:"column",gap:8}}>{arr.map((x,i)=><div key={i} style={{display:"flex",gap:8,alignItems:"flex-start"}}><div style={{flex:1}}><Inp value={x} onChange={v=>setAt(i,v)} placeholder={placeholder}/></div>{arr.length>1&&<DelBtn onClick={()=>rem(i)}/>}</div>)}<AddBtn onClick={add} label="＋ Añadir elemento"/></div>;
}
function ImageEditor({items,onChange}) {
  const arr = items || [];
  const setAt = (i,obj)=>onChange(arr.map((x,idx)=>idx===i?obj:x));
  const add = ()=>onChange([...arr,newImage()]);
  const rem = i=>onChange(arr.filter((_,idx)=>idx!==i));
  const handleFile = (i,file)=>{
    if(!file) return;
    const reader = new FileReader();
    reader.onload = e => setAt(i,{...arr[i],mode:"file",src:e.target.result,name:file.name});
    reader.readAsDataURL(file);
  };
  return <div style={{display:"flex",flexDirection:"column",gap:10}}>{arr.map((img,i)=><div key={i} style={{border:"1px solid #edf0f4",borderRadius:12,padding:10,background:"#fafafa"}}>
    <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8,flexWrap:"wrap"}}>
      <button type="button" style={{...btnStyle,borderColor:img.mode==="url"?UI.red:UI.border,color:img.mode==="url"?UI.redDark:UI.muted}} onClick={()=>setAt(i,{...img,mode:"url"})}>URL</button>
      <button type="button" style={{...btnStyle,borderColor:img.mode==="file"?UI.red:UI.border,color:img.mode==="file"?UI.redDark:UI.muted}} onClick={()=>setAt(i,{...img,mode:"file"})}>Archivo</button>
      <div style={{marginLeft:"auto"}}><DelBtn onClick={()=>rem(i)}/></div>
    </div>
    {img.mode==="url" ? <><Label>URL de imagen</Label><Inp value={img.url} onChange={v=>setAt(i,{...img,url:v})} placeholder="https://..."/></> : <><Label>Archivo local</Label><input type="file" accept="image/*" onChange={e=>handleFile(i,e.target.files[0])}/>{img.src&&<div style={{fontSize:12,color:UI.muted,marginTop:4}}>✓ {img.name}</div>}</>}
    <Row><div><Label>Pie de foto</Label><Inp value={img.caption} onChange={v=>setAt(i,{...img,caption:v})}/></div><div><Label>Ancho</Label><select style={inputStyle} value={img.width||"100%"} onChange={e=>setAt(i,{...img,width:e.target.value})}><option value="100%">100%</option><option value="75%">75%</option><option value="50%">50%</option><option value="auto">Auto</option></select></div></Row>
  </div>)}<AddBtn onClick={add} label="＋ Añadir imagen"/></div>;
}
function VideoEditor({items,onChange}) {
  const arr = items || [];
  const setAt = (i,obj)=>onChange(arr.map((x,idx)=>idx===i?obj:x));
  const add = ()=>onChange([...arr,newVideo()]);
  const rem = i=>onChange(arr.filter((_,idx)=>idx!==i));
  return <div style={{display:"flex",flexDirection:"column",gap:10}}>{arr.map((v,i)=><div key={i} style={{border:"1px solid #edf0f4",borderRadius:12,padding:10,background:"#fafafa"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><strong style={{fontSize:13}}>Vídeo {i+1}</strong>{arr.length>0&&<DelBtn onClick={()=>rem(i)}/>}</div>
    <Label>URL</Label><Inp value={v.url} onChange={x=>setAt(i,{...v,url:x})} placeholder="YouTube, Mediateca, Vimeo o embed"/>
    <Row><div><Label>Título</Label><Inp value={v.titulo} onChange={x=>setAt(i,{...v,titulo:x})}/></div><div><Label>Descripción breve</Label><Inp value={v.descripcion} onChange={x=>setAt(i,{...v,descripcion:x})}/></div></Row>
  </div>)}<AddBtn onClick={add} label="＋ Añadir vídeo"/></div>;
}
function StepEditor({steps,onChange}) {
  const arr = steps || [];
  const setAt = (i,obj)=>onChange(arr.map((x,idx)=>idx===i?obj:x));
  const add = ()=>onChange([...arr,newStep()]);
  const rem = i=>onChange(arr.filter((_,idx)=>idx!==i));
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>{arr.map((st,i)=><Box key={i} title={`Paso ${i+1}`}>
    <div style={{display:"flex",justifyContent:"flex-end"}}>{arr.length>1&&<DelBtn onClick={()=>rem(i)}/>}</div>
    <Label>Título del paso</Label><Inp value={st.titulo} onChange={v=>setAt(i,{...st,titulo:v})}/>
    <Label>Explicación</Label><Txt rows={4} value={st.texto} onChange={v=>setAt(i,{...st,texto:v})}/>
    <Box title="Imágenes del paso" hint="Puedes añadir tantas imágenes como necesites para explicar este paso."><ImageEditor items={st.imagenes} onChange={v=>setAt(i,{...st,imagenes:v})}/></Box>
    <Box title="Vídeos del paso" hint="Puedes asociar tantos vídeos como necesites a este paso."><VideoEditor items={st.videos} onChange={v=>setAt(i,{...st,videos:v})}/></Box>
  </Box>)}<AddBtn onClick={add} label="＋ Añadir paso"/></div>;
}

/* ─────────────────────────────────────────────────────────────
   Componente principal
   ───────────────────────────────────────────────────────────── */
function GeneradorManiobras() {
  const [d,setD] = useState(baseData());
  const [tab,setTab] = useState(0);
  const [html,setHtml] = useState("");
  const [preview,setPreview] = useState(false);
  const [copied,setCopied] = useState(false);
  const [inserted,setInserted] = useState(false);
  const upd = (k,v)=>setD(p=>({...p,[k]:v}));
  const setNested = (section,k,v)=>setD(p=>({...p,[section]:{...p[section],[k]:v}}));
  const setRec = (k,v)=>setD(p=>({...p,recursos:{...p.recursos,[k]:v}}));
  const setOrg = (k,v)=>setD(p=>({...p,organizacion:{...p.organizacion,[k]:v}}));
  const setSos = (k,v)=>setD(p=>({...p,planSOS:{...p.planSOS,[k]:v}}));
  const setChecklist = (k,v)=>setD(p=>({...p,checklist:{...p.checklist,[k]:v}}));
  const setEval = (k,v)=>setD(p=>({...p,evaluacion:{...p.evaluacion,[k]:v}}));
  const changeTemplate = (name)=>{ if(window.confirm("¿Cargar plantilla y sustituir los datos actuales?")) { setD(applyTemplate(name)); setHtml(""); setInserted(false); } };
  const gen = ()=>{ setHtml(generateHTML(d)); setTab(10); setPreview(false); setInserted(false); };
  const insert = ()=>{ if(html && typeof window.insertHTMLAtCursor === "function") { window.insertHTMLAtCursor(html); setInserted(true); setTimeout(()=>{ if(typeof window.closeManiobrasModal === "function") window.closeManiobrasModal(); }, 800); } };
  const copy = ()=>{ if(!html) return; navigator.clipboard.writeText(html).then(()=>{ setCopied(true); setTimeout(()=>setCopied(false),2200); }); };
  const reset = ()=>{ if(window.confirm("¿Borrar todo y empezar de nuevo?")) { setD(baseData()); setHtml(""); setTab(0); } };

  const setPracticas = v=>upd("practicas",v);
  const updatePractice = (i,obj)=>setPracticas(d.practicas.map((p,idx)=>idx===i?obj:p));
  const addPractice = ()=>setPracticas([...d.practicas,newPractica()]);
  const remPractice = i=>setPracticas(d.practicas.filter((_,idx)=>idx!==i));
  const updateRisk = (i,obj)=>upd("riesgos",d.riesgos.map((r,idx)=>idx===i?obj:r));

  const tabs = ["1 · Identificación","2 · Descripción","3 · Escenario","4 · Recursos","5 · Organización","6 · Desarrollo","7 · Plan SOS","8 · Riesgos","9 · Checklist/Eval.","10 · Pie","⚡ Generar"];
  const panel = [
    <Panel>
      <Box title="Plantilla base" hint="Puedes partir de una plantilla y después añadir o quitar lo que necesites."><Label>Tipo de plantilla</Label><select style={inputStyle} value={d.plantilla} onChange={e=>changeTemplate(e.target.value)}>{TEMPLATE_OPTIONS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></Box>
      <Box title="Identificación documental"><Row><div><Label>Tipo de documento</Label><Inp value={d.tipoDocumento} onChange={v=>upd("tipoDocumento",v)}/></div><div><Label>Identificador</Label><Inp value={d.ident} onChange={v=>upd("ident",v)} placeholder="< IDENT >"/></div></Row><Label>Título</Label><Inp value={d.titulo} onChange={v=>upd("titulo",v)} placeholder="Título de la maniobra"/><Label>Subtítulo</Label><Inp value={d.subtitulo} onChange={v=>upd("subtitulo",v)}/><Row><div><Label>Código IT principal</Label><Inp value={d.codigoIT} onChange={v=>upd("codigoIT",v)}/></div><div><Label>Campaña / reciclaje</Label><Inp value={d.campania} onChange={v=>upd("campania",v)} placeholder="RECICLAJE 2025-2026"/></div></Row><Label>Códigos adicionales</Label><SimpleListEditor items={d.itCodes} onChange={v=>upd("itCodes",v)} placeholder="IT..."/></Box>
    </Panel>,
    <Panel><Box title="1.- Descripción"><Txt rows={7} value={d.descripcion} onChange={v=>upd("descripcion",v)}/><Box title="Imágenes de la descripción"><ImageEditor items={d.descripcionImagenes} onChange={v=>upd("descripcionImagenes",v)}/></Box></Box><Box title="2.- Objetivo pedagógico"><Txt rows={7} value={d.objetivo} onChange={v=>upd("objetivo",v)}/><Box title="Imágenes de objetivos"><ImageEditor items={d.objetivoImagenes} onChange={v=>upd("objetivoImagenes",v)}/></Box></Box><Box title="3.- Destinatarios"><Txt rows={3} value={d.destinatarios} onChange={v=>upd("destinatarios",v)}/></Box></Panel>,
    <Panel><Box title="4.- Escenario"><Txt rows={7} value={d.escenario} onChange={v=>upd("escenario",v)}/><Box title="Imágenes del escenario"><ImageEditor items={d.escenarioImagenes} onChange={v=>upd("escenarioImagenes",v)}/></Box><Box title="Vídeos del escenario"><VideoEditor items={d.escenarioVideos} onChange={v=>upd("escenarioVideos",v)}/></Box></Box></Panel>,
    <Panel><Box title="5.- Recursos" hint="Todos los bloques permiten añadir tantos elementos como necesites."><Row><Box title="EPI"><SimpleListEditor items={d.recursos.epis} onChange={v=>setRec("epis",v)} placeholder="EPI..."/></Box><Box title="Materiales y herramientas"><SimpleListEditor items={d.recursos.materiales} onChange={v=>setRec("materiales",v)} placeholder="Material..."/></Box><Box title="Material sanitario"><SimpleListEditor items={d.recursos.sanitario} onChange={v=>setRec("sanitario",v)} placeholder="Material sanitario..."/></Box><Box title="Vehículos"><SimpleListEditor items={d.recursos.vehiculos} onChange={v=>setRec("vehiculos",v)} placeholder="Vehículo..."/></Box><Box title="Escenario"><SimpleListEditor items={d.recursos.escenario} onChange={v=>setRec("escenario",v)} placeholder="Elemento del escenario..."/></Box><Box title="Recursos didácticos"><SimpleListEditor items={d.recursos.didacticos} onChange={v=>setRec("didacticos",v)} placeholder="Ficha, manual, vídeo..."/></Box></Row><Box title="Imágenes de recursos"><ImageEditor items={d.recursos.imagenes} onChange={v=>setRec("imagenes",v)}/></Box><Box title="Vídeos de recursos"><VideoEditor items={d.recursos.videos} onChange={v=>setRec("videos",v)}/></Box></Box></Panel>,
    <Panel><Box title="6.- Organización del grupo"><Label>Descripción general</Label><Txt rows={4} value={d.organizacion.general} onChange={v=>setOrg("general",v)}/><Row><div><Label>Grupos</Label><Txt rows={3} value={d.organizacion.grupos} onChange={v=>setOrg("grupos",v)}/></div><div><Label>Rotación de roles</Label><Txt rows={3} value={d.organizacion.rotacion} onChange={v=>setOrg("rotacion",v)}/></div></Row><Label>Funciones del responsable</Label><SimpleListEditor items={d.organizacion.funciones} onChange={v=>setOrg("funciones",v)} placeholder="Función..."/><Label>Roles de participantes</Label><SimpleListEditor items={d.organizacion.roles} onChange={v=>setOrg("roles",v)} placeholder="Rol..."/><Label>Condiciones de seguridad</Label><Txt rows={3} value={d.organizacion.seguridad} onChange={v=>setOrg("seguridad",v)}/></Box></Panel>,
    <Panel><Box title="7.- Desarrollo explicativo"><Label>Documentación de referencia</Label><Inp value={d.refDoc} onChange={v=>upd("refDoc",v)}/>{d.practicas.map((pr,i)=><Box key={i} title={`Práctica interna ${i+1}`} hint="Cada práctica puede contener roles, pasos, imágenes, vídeos y submaniobras."><div style={{display:"flex",justifyContent:"flex-end"}}>{d.practicas.length>1&&<DelBtn onClick={()=>remPractice(i)}/>}</div><Label>Título</Label><Inp value={pr.titulo} onChange={v=>updatePractice(i,{...pr,titulo:v})}/><Label>Descripción</Label><Txt rows={4} value={pr.descripcion} onChange={v=>updatePractice(i,{...pr,descripcion:v})}/><Label>Organización específica</Label><Txt rows={3} value={pr.organizacion} onChange={v=>updatePractice(i,{...pr,organizacion:v})}/><Box title="Roles de esta práctica"><RoleEditor roles={pr.roles} onChange={v=>updatePractice(i,{...pr,roles:v})}/></Box><Box title="Imágenes generales de esta práctica"><ImageEditor items={pr.imagenes} onChange={v=>updatePractice(i,{...pr,imagenes:v})}/></Box><Box title="Vídeos generales de esta práctica"><VideoEditor items={pr.videos} onChange={v=>updatePractice(i,{...pr,videos:v})}/></Box><Box title="Pasos de la práctica"><StepEditor steps={pr.pasos} onChange={v=>updatePractice(i,{...pr,pasos:v})}/></Box><Row><div><Label>Precauciones</Label><Txt rows={3} value={pr.precauciones} onChange={v=>updatePractice(i,{...pr,precauciones:v})}/></div><div><Label>Recordatorio final</Label><Txt rows={3} value={pr.recordatorio} onChange={v=>updatePractice(i,{...pr,recordatorio:v})}/></div></Row></Box>)}<AddBtn onClick={addPractice} label="＋ Añadir práctica interna"/></Box></Panel>,
    <Panel><Box title="Plan SOS institucional"><Label>Señal de emergencia</Label><Inp value={d.planSOS.senal} onChange={v=>setSos("senal",v)}/><Label>Introducción 1</Label><Txt rows={3} value={d.planSOS.intro1} onChange={v=>setSos("intro1",v)}/><Label>Introducción 2</Label><Txt rows={2} value={d.planSOS.intro2} onChange={v=>setSos("intro2",v)}/><Label>Prioridades</Label><SimpleListEditor items={d.planSOS.prioridades} onChange={v=>setSos("prioridades",v)} placeholder="Prioridad..."/><Row><div><Label>Título accidente leve</Label><Inp value={d.planSOS.leveTitulo} onChange={v=>setSos("leveTitulo",v)}/><SimpleListEditor items={d.planSOS.leveItems} onChange={v=>setSos("leveItems",v)} placeholder="Paso..."/></div><div><Label>Título accidente grave</Label><Inp value={d.planSOS.graveTitulo} onChange={v=>setSos("graveTitulo",v)}/><SimpleListEditor items={d.planSOS.graveItems} onChange={v=>setSos("graveItems",v)} placeholder="Paso..."/></div></Row><Label>Cierre</Label><Txt rows={2} value={d.planSOS.cierre} onChange={v=>setSos("cierre",v)}/></Box></Panel>,
    <Panel><Box title="8.- Evaluación de riesgos"><Label>Título de la tabla</Label><Inp value={d.riesgosTitulo} onChange={v=>upd("riesgosTitulo",v)}/>{d.riesgos.map((r,i)=><Box key={i} title={`Riesgo ${i+1}`}><div style={{display:"flex",justifyContent:"flex-end"}}>{d.riesgos.length>1&&<DelBtn onClick={()=>upd("riesgos",d.riesgos.filter((_,idx)=>idx!==i))}/>}</div><Row><div><Label>Riesgo</Label><Inp value={r.riesgo} onChange={v=>updateRisk(i,{...r,riesgo:v})}/></div><div><Label>Grado</Label><select style={inputStyle} value={r.grado} onChange={e=>updateRisk(i,{...r,grado:e.target.value})}><option>Notable</option><option>Moderado</option><option>Aceptable</option></select></div></Row><Label>Causa</Label><Txt rows={2} value={r.causa} onChange={v=>updateRisk(i,{...r,causa:v})}/><Label>Medida preventiva</Label><Txt rows={2} value={r.medida} onChange={v=>updateRisk(i,{...r,medida:v})}/></Box>)}<AddBtn onClick={()=>upd("riesgos",[...d.riesgos,newRisk()])} label="＋ Añadir riesgo"/></Box></Panel>,
    <Panel><Box title="Checklist operativo flexible"><label style={{display:"flex",gap:8,alignItems:"center",fontWeight:800}}><input type="checkbox" checked={d.checklist.mostrar} onChange={e=>setChecklist("mostrar",e.target.checked)} /> Incluir checklist</label>{d.checklist.mostrar&&<><Label>Título</Label><Inp value={d.checklist.titulo} onChange={v=>setChecklist("titulo",v)}/><Label>Introducción</Label><Txt rows={3} value={d.checklist.intro} onChange={v=>setChecklist("intro",v)}/><ChecklistEditor items={d.checklist.items} onChange={v=>setChecklist("items",v)}/><Box title="Imágenes del checklist"><ImageEditor items={d.checklist.imagenes || []} onChange={v=>setChecklist("imagenes",v)}/></Box><Box title="Vídeos del checklist"><VideoEditor items={d.checklist.videos || []} onChange={v=>setChecklist("videos",v)}/></>}</Box><Box title="Criterios de evaluación"><label style={{display:"flex",gap:8,alignItems:"center",fontWeight:800}}><input type="checkbox" checked={d.evaluacion.mostrar} onChange={e=>setEval("mostrar",e.target.checked)} /> Incluir criterios de evaluación</label>{d.evaluacion.mostrar&&<Row><Box title="Críticos"><SimpleListEditor items={d.evaluacion.criticos} onChange={v=>setEval("criticos",v)}/></Box><Box title="Técnicos"><SimpleListEditor items={d.evaluacion.tecnicos} onChange={v=>setEval("tecnicos",v)}/></Box><Box title="Actitudinales"><SimpleListEditor items={d.evaluacion.actitudinales} onChange={v=>setEval("actitudinales",v)}/></Box></Row>}</Box></Panel>,
    <Panel><Box title="Pie y revisión"><Row><div><Label>Revisión</Label><Inp value={d.revision} onChange={v=>upd("revision",v)} placeholder="AAAAMMDD"/></div></Row><Label>Texto legal</Label><Txt rows={5} value={d.pieTexto} onChange={v=>upd("pieTexto",v)}/></Box></Panel>,
    <Panel><Box title="Generar e insertar"><div style={{display:"flex",gap:10,flexWrap:"wrap"}}><button type="button" style={primaryBtn} onClick={gen}>⚡ Generar HTML</button>{html&&<button type="button" style={primaryBtn} onClick={insert}>{inserted?"✓ Insertado":"⬆️ Insertar en el editor"}</button>}{html&&<button type="button" style={btnStyle} onClick={copy}>{copied?"✓ Copiado":"📋 Copiar HTML"}</button>}{html&&<button type="button" style={btnStyle} onClick={()=>setPreview(!preview)}>{preview?"Ocultar vista previa":"👁️ Ver vista previa"}</button>}<button type="button" style={{...btnStyle,color:"#b91c1c"}} onClick={reset}>🗑 Borrar todo</button></div>{!html&&<div style={{fontSize:13,color:UI.muted,marginTop:12}}>Pulsa “Generar HTML” para procesar el documento.</div>}{preview&&html&&<div style={{marginTop:16,border:"1px solid #e5e7eb",borderRadius:12,padding:14,maxHeight:"50vh",overflow:"auto",background:"#fff"}} dangerouslySetInnerHTML={{__html:html}}/>}</Box></Panel>
  ];
  return <div style={{height:"100%",display:"flex",flexDirection:"column",fontFamily:UI.font,color:UI.text,background:"#f8fafc"}}>
    <div style={{padding:"12px 14px",borderBottom:"1px solid #e5e7eb",background:"#fff",display:"flex",gap:8,flexWrap:"wrap"}}>{tabs.map((t,i)=><button key={t} type="button" onClick={()=>setTab(i)} style={{padding:"8px 11px",fontSize:12,fontWeight:900,border:"1.5px solid",borderRadius:999,cursor:"pointer",fontFamily:"inherit",background:tab===i?UI.redSoft:"#fff",borderColor:tab===i?"#efd3d5":UI.border,color:tab===i?UI.redDark:UI.muted}}>{t}</button>)}</div>
    <div style={{flex:1,overflow:"auto",padding:18}}>{panel[tab]}</div>
    <div style={{padding:"10px 14px",borderTop:"1px solid #e5e7eb",background:"#fff",display:"flex",gap:8,alignItems:"center"}}><button type="button" style={btnStyle} disabled={tab===0} onClick={()=>setTab(Math.max(0,tab-1))}>← Anterior</button><button type="button" style={primaryBtn} onClick={gen}>⚡ Generar HTML</button><button type="button" style={btnStyle} disabled={tab===tabs.length-1} onClick={()=>setTab(Math.min(tabs.length-1,tab+1))}>Siguiente →</button></div>
  </div>;
}
function RoleEditor({roles,onChange}) {
  const arr = roles || [];
  const setAt=(i,obj)=>onChange(arr.map((x,idx)=>idx===i?obj:x));
  return <div style={{display:"flex",flexDirection:"column",gap:10}}>{arr.map((r,i)=><div key={i} style={{border:"1px solid #edf0f4",borderRadius:12,padding:10}}><div style={{display:"flex",justifyContent:"flex-end"}}>{arr.length>1&&<DelBtn onClick={()=>onChange(arr.filter((_,idx)=>idx!==i))}/>}</div><Label>Nombre del rol</Label><Inp value={r.nombre} onChange={v=>setAt(i,{...r,nombre:v})}/><Label>Acciones</Label><SimpleListEditor items={r.acciones} onChange={v=>setAt(i,{...r,acciones:v})} placeholder="Acción..."/></div>)}<AddBtn onClick={()=>onChange([...arr,newRole()])} label="＋ Añadir rol"/></div>;
}
function ChecklistEditor({items,onChange}) {
  const arr = items || [];
  const setAt=(i,obj)=>onChange(arr.map((x,idx)=>idx===i?obj:x));
  return <div style={{display:"flex",flexDirection:"column",gap:10}}>{arr.map((it,i)=><div key={i} style={{border:"1px solid #edf0f4",borderRadius:12,padding:10}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><strong style={{fontSize:13}}>Campo {i+1}</strong>{arr.length>1&&<DelBtn onClick={()=>onChange(arr.filter((_,idx)=>idx!==i))}/>}</div><Row><div><Label>Campo / comprobación</Label><Inp value={it.campo} onChange={v=>setAt(i,{...it,campo:v})}/></div><div><Label>Detalle / criterio</Label><Inp value={it.descripcion} onChange={v=>setAt(i,{...it,descripcion:v})}/></div></Row></div>)}<AddBtn onClick={()=>onChange([...arr,newChecklistItem()])} label="＋ Añadir campo de checklist"/></div>;
}

/* ─────────────────────────────────────────────────────────────
   Montaje
   ───────────────────────────────────────────────────────────── */
(function mountGenerador() {
  function init() {
    const el = document.getElementById('maniobras-root');
    if (!el) return;
    const root = ReactDOM.createRoot(el);
    root.render(<GeneradorManiobras />);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
