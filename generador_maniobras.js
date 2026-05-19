/* ══════════════════════════════════════════════════════════════
   GENERADOR DE MANIOBRAS DE PARQUE — CBCM
   Cargado con Babel Standalone (sin Node.js / sin bundler)
   Requiere: React 18 CDN · ReactDOM 18 CDN · Babel Standalone CDN
   ══════════════════════════════════════════════════════════════ */

const { useState } = React;

/* ─── HTML HELPERS ─────────────────────────────────────────── */
function mEsc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function badgeStyle(g) {
  if (g === "Notable")  return "display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:bold;background:#ffe0b2;color:#bf360c;";
  if (g === "Moderado") return "display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:bold;background:#fff9c4;color:#827717;";
  return "display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:bold;background:#e8f5e9;color:#1b5e20;";
}

function embedVideoUrl(url) {
  if (!url || !url.trim()) return "";
  let src = url.trim();
  
  try {
    if (src.includes("youtube.com/watch")) {
      const queryParams = src.split("?")[1];
      if (queryParams) {
        const urlParams = new URLSearchParams(queryParams);
        const v = urlParams.get("v");
        if (v) src = "https://www.youtube.com/embed/" + v;
      }
    } else if (src.includes("youtu.be/")) {
      const part = src.split("youtu.be/")[1];
      if (part) src = "https://www.youtube.com/embed/" + part.split("?")[0];
    } else if (src.includes("vimeo.com/")) {
      const part = src.split("vimeo.com/")[1];
      if (part) src = "https://player.vimeo.com/video/" + part.split("?")[0];
    }
  } catch (e) {
    console.warn("Error al procesar URL de vídeo:", e);
  }

  if (src.match(/\.(mp4|webm|ogg)$/i)) {
    return `<div style="width:95%;max-width:850px;margin:24px auto;overflow:hidden;border-radius:24px;box-shadow:0 15px 35px rgba(0,0,0,0.12);background:#ffffff;"><video style="width:100%;max-width:100%;height:auto;display:block;border-radius:24px;" controls><source src="${mEsc(src)}" type="video/mp4">Tu navegador no soporta vídeo.</video></div>`;
  }
  return `<div style="width:95%;max-width:850px;margin:24px auto;overflow:hidden;border-radius:24px;box-shadow:0 15px 35px rgba(0,0,0,0.12);background:#111827;"><div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;" src="${mEsc(src)}" allowfullscreen></iframe></div></div>`;
}

function renderImage(item) {
  const src = typeof item === "string" ? item.trim()
    : item.mode === "file" ? item.src : (item.url || "").trim();
  if (!src) return "";
  return `<div style="width:95%;max-width:850px;margin:24px auto;overflow:hidden;border-radius:24px;box-shadow:0 15px 35px rgba(0,0,0,0.12);background:#ffffff;"><img src="${item.mode === "file" ? src : mEsc(src)}" style="width:100%;max-width:100%;height:auto;border-radius:24px;display:block;" alt="Recurso visual" /></div>`;
}

/* ─── HTML GENERATOR ────────────────────────────────────────── */
function generateHTML(d) {
  const fontStack = "'Montserrat','Segoe UI',Roboto,Helvetica,Arial,sans-serif";
  const pageStyle = `font-family:${fontStack};font-size:16px;line-height:1.8;color:#1f2937;background:transparent;background-color:transparent;width:100%;max-width:none;margin:0 auto;box-sizing:border-box;overflow:hidden;`;
  const cardStyle = "background:#ffffff;border-radius:24px;box-shadow:0 15px 35px rgba(0,0,0,0.12);padding:28px;margin:40px auto;width:95%;max-width:850px;box-sizing:border-box;overflow:hidden;";
  const textStyle = "max-width:800px;margin:0 auto 14px auto;line-height:1.8;";
  const h2Style = "font-family:" + fontStack + ";font-size:24px;line-height:1.3;font-weight:800;color:#B22222;margin:0 0 18px 0;border-bottom:2px solid #f3d4d4;padding-bottom:10px;";
  const h3Style = "font-family:" + fontStack + ";font-size:18px;line-height:1.4;font-weight:800;color:#374151;margin:20px 0 10px 0;";
  const listStyle = "max-width:800px;margin:8px auto 16px auto;padding-left:24px;line-height:1.8;";
  const liStyle = "margin-bottom:8px;line-height:1.8;";
  const tableWrapStyle = "width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;";

  const section = (num, title, body) => `
    <div style="${cardStyle}">
      <h2 style="${h2Style}">${num}. ${title}</h2>
      ${body}
    </div>`;

  const paragraph = (txt) => `<p style="${textStyle}">${mEsc(txt)}</p>`;

  const epiItems = d.epis.filter(e => e.trim())
    .map(e => `<li style="${liStyle}">${mEsc(e)}</li>`).join("\n              ");

  const matItems = d.materiales.filter(m => m.trim())
    .map(m => `<li style="${liStyle}">${mEsc(m)}</li>`).join("\n              ");

  const matAdicItems = (d.materialAdicional || []).filter(m => m.trim())
    .map(m => `<li style="${liStyle}">${mEsc(m)}</li>`).join("\n              ");

  const escImagenesHtml = (d.escenarioImagenes || []).filter(img => {
    if (typeof img === "string") return img.trim();
    return img.mode === "file" ? img.src : (img.url || "").trim();
  }).map(img => renderImage(img)).join("\n");

  const recImagenesHtml = d.recursosImagenes.filter(img => {
    if (typeof img === "string") return img.trim();
    return img.mode === "file" ? img.src : (img.url || "").trim();
  }).map(img => renderImage(img)).join("\n");
  
  const recVideosHtml = d.recursosVideos.filter(vid => vid.trim()).map(vid => embedVideoUrl(vid)).join("\n");

  const stepRows = d.pasos.filter(p => p.trim()).map((p, i) => `
      <table style="width:100%;border-collapse:separate;border-spacing:0;margin-bottom:14px;table-layout:fixed;" cellpadding="0" cellspacing="0">
        <tr>
          <td style="width:46px;vertical-align:top;padding-right:12px;">
            <div style="background:#B22222;color:#ffffff;font-weight:800;font-size:15px;width:34px;height:34px;border-radius:50%;text-align:center;line-height:34px;box-shadow:0 8px 18px rgba(178,34,34,0.25);">${i + 1}</div>
          </td>
          <td style="vertical-align:top;background:#ffffff;border:1px solid #f0d6d6;border-radius:20px;padding:14px 16px;line-height:1.8;word-wrap:break-word;overflow-wrap:anywhere;box-shadow:0 8px 18px rgba(0,0,0,0.06);">${mEsc(p)}</td>
        </tr>
      </table>`).join("");

  const riskRows = d.riesgos.map((r, i) => `
          <tr${i % 2 === 1 ? ' style="background:#fff7f7;"' : ""}>
            <td style="border:1px solid #f0d6d6;padding:12px 14px;vertical-align:top;line-height:1.8;min-width:160px;">${mEsc(r.riesgo)}</td>
            <td style="border:1px solid #f0d6d6;padding:12px 14px;vertical-align:top;line-height:1.8;min-width:180px;">${mEsc(r.causa)}</td>
            <td style="border:1px solid #f0d6d6;padding:12px 14px;vertical-align:top;text-align:center;min-width:120px;"><span style="${badgeStyle(r.grado)}">${r.grado}</span></td>
            <td style="border:1px solid #f0d6d6;padding:12px 14px;vertical-align:top;line-height:1.8;min-width:220px;">${mEsc(r.medida)}</td>
          </tr>`).join("");

  const desImagenesHtml = d.desarrolloImagenes.filter(img => {
    if (typeof img === "string") return img.trim();
    return img.mode === "file" ? img.src : (img.url || "").trim();
  }).map(img => renderImage(img)).join("\n");
  
  const desVideosHtml = d.videos.filter(vid => vid.trim()).map(vid => embedVideoUrl(vid)).join("\n");

  const recordadBlock = d.recordad.trim()
    ? `        <div style="max-width:800px;margin:22px auto 0 auto;background:#fff7ed;border-left:6px solid #f97316;border-radius:20px;padding:16px 18px;line-height:1.8;box-shadow:0 8px 18px rgba(0,0,0,0.06);"><strong style="font-weight:800;color:#9a3412;">Recordad:</strong> ${mEsc(d.recordad)}</div>\n`
    : "";

  const planSosLeveItems = d.planSOS.leveItems.filter(i => i.trim()).map(i => `<li style="${liStyle}">${mEsc(i)}</li>`).join("");
  const planSosGraveItems = d.planSOS.graveItems.filter(i => i.trim()).map(i => `<li style="${liStyle}">${mEsc(i)}</li>`).join("");

  const jtItems = (d.rolesJT || []).filter(r => r.trim())
    .map(r => `<li style="${liStyle}">${mEsc(r)}</li>`).join("\n        ");

  const validItCodes = d.itCodes.filter(c => c.trim());
  let itCodeHtml = "";
  if (validItCodes.length > 0) {
    const codesStr = validItCodes.map(c => `<div style="font-weight:800;font-size:13px;letter-spacing:1px;margin-top:6px;line-height:1.4;">${mEsc(c)}</div>`).join("");
    itCodeHtml = `\n      <td style="width:150px;background-color:#7a1515;text-align:center;vertical-align:middle;padding:16px 12px;font-size:11px;color:#ffffff;line-height:1.5;border:0!important;border:none!important;outline:0!important;margin:0!important;">INSTRUCCI&Oacute;N T&Eacute;CNICA${codesStr}</td>`;
  }

  /* HTML Criterios de Evaluación */
  let evaluacionHtml = "";
  if (d.evaluacion.mostrar) {
    const criticosItems = d.evaluacion.criticos.filter(i => i.trim()).map(i => `<li style="${liStyle}">${mEsc(i)}</li>`).join("");
    const tecnicosItems = d.evaluacion.tecnicos.filter(i => i.trim()).map(i => `<li style="${liStyle}">${mEsc(i)}</li>`).join("");
    const actitudinalesItems = d.evaluacion.actitudinales.filter(i => i.trim()).map(i => `<li style="${liStyle}">${mEsc(i)}</li>`).join("");

    evaluacionHtml = `
    <div style="${cardStyle}">
      <h2 style="${h2Style}">ANEXO II — Criterios de Evaluación</h2>
      <p style="${textStyle}">Durante las maniobras se realizarán unas rúbricas de evaluación divididas en tres bloques diferenciados:</p>
      <h3 style="${h3Style}">BLOQUE 1 - CRÍTICOS</h3>
      <p style="${textStyle}">Será necesario cumplirlos todos para poder dar por apta la maniobra, aseguran el aprobado.</p>
      <ul style="${listStyle}">${criticosItems || '<li style="margin-bottom:8px;line-height:1.8;">Sin ítems definidos</li>'}</ul>
      <h3 style="${h3Style}">BLOQUE 2 - TÉCNICOS</h3>
      <p style="${textStyle}">Estos ítems son los que nos permitirán alcanzar el 10 (los 5 puntos restantes).</p>
      <ul style="${listStyle}">${tecnicosItems || '<li style="margin-bottom:8px;line-height:1.8;">Sin ítems definidos</li>'}</ul>
      <h3 style="${h3Style}">BLOQUE 3 - ACTITUDINALES</h3>
      <p style="${textStyle}">Estos ítems no suman, pero sí que restan.</p>
      <ul style="${listStyle}">${actitudinalesItems || '<li style="margin-bottom:8px;line-height:1.8;">Sin ítems definidos</li>'}</ul>
    </div>`;
  }

  return `
<div style="${pageStyle}">
  <div style="width:95%;max-width:850px;margin:40px auto;border-radius:28px;overflow:hidden;box-shadow:0 15px 35px rgba(0,0,0,0.12);background:transparent;background-color:transparent;border:0!important;border:none!important;outline:0!important;padding:0!important;line-height:0;">
    <div style="width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;border:0!important;border:none!important;outline:0!important;margin:0!important;margin-bottom:0!important;padding:0!important;line-height:0;">
      <table style="width:100%;border-collapse:separate;border-spacing:0;min-width:520px;border:0!important;border:none!important;outline:0!important;margin:0!important;margin-bottom:0!important;padding:0!important;line-height:1.8;" cellpadding="0" cellspacing="0" border="0">
        <tr style="border:0!important;border:none!important;outline:0!important;margin:0!important;padding:0!important;">
          <td style="width:110px;background-color:#B22222;color:#ffffff;text-align:center;vertical-align:middle;padding:20px 14px;font-weight:800;font-size:20px;letter-spacing:1px;border:0!important;border:none!important;outline:0!important;margin:0!important;line-height:1.8;">CBCM</td>
          <td style="background-color:#ffffff;color:#111827;vertical-align:middle;padding:20px 18px;border:0!important;border:none!important;outline:0!important;margin:0!important;line-height:1.8;">
            <div style="font-size:22px;font-weight:800;line-height:1.35;">PRÁCTICA: ${mEsc(d.titulo)}</div>
            <div style="font-size:15px;font-weight:400;line-height:1.6;color:#4b5563;margin-top:4px;">${mEsc(d.subtitulo)}</div>
          </td>${itCodeHtml}
        </tr>
      </table>
    </div>
  </div>

  ${section("1", "Descripción", paragraph(d.descripcion))}
  ${section("2", "Objetivo Pedagógico", paragraph(d.objetivo))}
  ${section("3", "Destinatarios", paragraph(d.destinatarios))}
  ${section("4", "Escenario", `${paragraph(d.escenario)}${escImagenesHtml}`)}
  ${section("5", "Recursos", `
      <h3 style="${h3Style}">EPI's</h3>
      <ul style="${listStyle}">${epiItems}</ul>
      <h3 style="${h3Style}">Materiales y Herramientas</h3>
      <ul style="${listStyle}">${matItems}</ul>
      ${matAdicItems ? `<h3 style="${h3Style}">Material Adicional</h3><ul style="${listStyle}">${matAdicItems}</ul>` : ""}
      ${recImagenesHtml}${recVideosHtml}`)}
  ${section("6", "Organización del Grupo", `
      ${paragraph(d.organizacion)}
      <h3 style="${h3Style}">Rol del ${mEsc(d.rolMandoTitulo)}:</h3>
      <ul style="${listStyle}">${jtItems}</ul>`)}
  ${section("7", "Desarrollo Explicativo de la Práctica", `
      <p style="${textStyle}"><strong style="font-weight:800;color:#111827;">Documentación de referencia:</strong> ${mEsc(d.refDoc)}</p>
      ${d.aspectosGenerales.trim() ? `<h3 style="${h3Style}">Aspectos generales:</h3>${paragraph(d.aspectosGenerales)}` : ""}
      ${d.desarrolloManiobra.trim() ? `<h3 style="${h3Style}">Desarrollo de la maniobra:</h3>${paragraph(d.desarrolloManiobra)}` : ""}
      ${d.escenarioDesarrollo.trim() ? `<h3 style="${h3Style}">Escenario:</h3>${paragraph(d.escenarioDesarrollo)}` : ""}
      ${desImagenesHtml}${desVideosHtml}
      <h3 style="${h3Style}">Explicación secuencial de la maniobra:</h3>
      <div style="max-width:800px;margin:0 auto;">${stepRows}</div>
      <h3 style="${h3Style}">PRECAUCIONES</h3>
      ${paragraph(d.precauciones)}
      ${recordadBlock}`)}
  <div style="${cardStyle}">
    <h2 style="${h2Style}">8. Evaluación de Riesgos de la Maniobra</h2>
    <div style="${tableWrapStyle}">
      <table style="width:100%;border-collapse:separate;border-spacing:0;min-width:760px;background:#ffffff;border-radius:20px;overflow:hidden;" cellpadding="0" cellspacing="0">
        <tr>
          <th style="background:#B22222;color:#ffffff;border:1px solid #B22222;padding:13px 14px;text-align:left;font-weight:800;line-height:1.4;">Riesgo</th>
          <th style="background:#B22222;color:#ffffff;border:1px solid #B22222;padding:13px 14px;text-align:left;font-weight:800;line-height:1.4;">Causa</th>
          <th style="background:#B22222;color:#ffffff;border:1px solid #B22222;padding:13px 14px;text-align:center;font-weight:800;line-height:1.4;">Grado</th>
          <th style="background:#B22222;color:#ffffff;border:1px solid #B22222;padding:13px 14px;text-align:left;font-weight:800;line-height:1.4;">Medida Preventiva</th>
        </tr>
        ${riskRows}
      </table>
    </div>
  </div>

  <div style="${cardStyle}">
    <h2 style="${h2Style}">ANEXO I — Plan SOS</h2>
    <div style="max-width:800px;margin:0 auto;background:#fee2e2;border-left:6px solid #B22222;border-radius:20px;padding:16px 18px;line-height:1.8;font-weight:800;color:#7f1d1d;box-shadow:0 8px 18px rgba(0,0,0,0.06);">${mEsc(d.planSOS.senal)}</div>
    <p style="${textStyle};margin-top:18px;">${mEsc(d.planSOS.intro1)}</p>
    <p style="${textStyle}">${mEsc(d.planSOS.intro2)}</p>
    <h3 style="${h3Style}">${mEsc(d.planSOS.leveTitulo)}</h3>
    <ul style="${listStyle}">${planSosLeveItems}</ul>
    <h3 style="${h3Style}">${mEsc(d.planSOS.graveTitulo)}</h3>
    <ul style="${listStyle}">${planSosGraveItems}</ul>
    <p style="${textStyle}">${mEsc(d.planSOS.cierre)}</p>
  </div>

  ${evaluacionHtml}

  <div style="width:95%;max-width:850px;margin:40px auto;border-radius:24px;overflow:hidden;box-shadow:0 15px 35px rgba(0,0,0,0.12);background:#ffffff;">
    <div style="${tableWrapStyle}">
      <table style="width:100%;border-collapse:separate;border-spacing:0;min-width:620px;border:0!important;border:none!important;outline:0!important;margin:0!important;margin-bottom:0!important;" cellpadding="0" cellspacing="0" border="0">
        <tr style="border:0!important;border:none!important;outline:0!important;margin:0!important;padding:0!important;">
          <td style="width:20%;background:#f3f4f6;color:#374151;padding:16px 14px;vertical-align:middle;font-weight:800;line-height:1.6;border:0!important;border:none!important;outline:0!important;margin:0!important;">Revisión ${mEsc(d.revision)}</td>
          <td style="width:60%;background:#ffffff;color:#4b5563;padding:16px 14px;vertical-align:middle;font-size:12px;line-height:1.8;border:0!important;border:none!important;outline:0!important;margin:0!important;">${mEsc(d.pieTexto)}</td>
          <td style="width:20%;background:#f3f4f6;color:#374151;padding:16px 14px;vertical-align:middle;text-align:right;font-weight:800;line-height:1.6;border:0!important;border:none!important;outline:0!important;margin:0!important;">Pág. 1 de 1</td>
        </tr>
      </table>
    </div>
  </div>
</div>`;
}

/* ─── UI COMPONENTS ─── */
const TABS = [
  { label: "1 · Cabecera",     short: "Cab."      },
  { label: "2 · Info General", short: "Info"      },
  { label: "3 · Recursos",     short: "Rec."      },
  { label: "4 · Organización", short: "Org."      },
  { label: "5 · Desarrollo",   short: "Des."      },
  { label: "6 · Riesgos",      short: "Rie."      },
  { label: "7 · Plan SOS",     short: "SOS"       },
  { label: "8 · Evaluación",   short: "Eva."      },
  { label: "9 · Pie",          short: "Pie"       },
  { label: "⚡ Generar",       short: "⚡"        },
];

const SectionTitle = ({ children }) => (
  <h2 style={{ fontSize:"15px", fontWeight:"700", color:"#1f2937", marginBottom:"4px", marginTop:"0" }}>{children}</h2>
);
const Hint = ({ children }) => (
  <p style={{ fontSize:"12px", color:"#9ca3af", marginBottom:"20px", marginTop:"0" }}>{children}</p>
);
const Label = ({ children, required, style }) => (
  <label style={{ display:"block", fontSize:"11px", fontWeight:"700", color:"#6b7280",
    textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"4px", ...style }}>
    {children}{required && <span style={{ color:"#ef4444", marginLeft:"2px" }}>*</span>}
  </label>
);
const Inp = ({ value, onChange, placeholder }) => (
  <input
    style={{ width:"100%", border:"1.5px solid #e5e7eb", borderRadius:"6px",
      background:"#fff", padding:"7px 10px", fontSize:"13px", color:"#1f2937",
      outline:"none", fontFamily:"inherit", boxSizing:"border-box" }}
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    onFocus={e => e.target.style.borderColor = "#B22222"}
    onBlur={e  => e.target.style.borderColor = "#e5e7eb"}
  />
);
const Txt = ({ value, onChange, placeholder, rows = 3 }) => (
  <textarea
    style={{ width:"100%", border:"1.5px solid #e5e7eb", borderRadius:"6px",
      background:"#fff", padding:"7px 10px", fontSize:"13px", color:"#1f2937",
      outline:"none", fontFamily:"inherit", resize:"vertical", boxSizing:"border-box" }}
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    rows={rows}
    onFocus={e => e.target.style.borderColor = "#B22222"}
    onBlur={e  => e.target.style.borderColor = "#e5e7eb"}
  />
);
const AddBtn = ({ onClick, label }) => (
  <button type="button" onClick={onClick} style={{ marginTop:"8px", fontSize:"12px", fontWeight:"700",
    color:"#B22222", border:"1px solid #fca5a5", borderRadius:"6px",
    padding:"5px 12px", background:"none", cursor:"pointer" }}>
    {label}
  </button>
);
const RemBtn = ({ onClick }) => (
  <button type="button" onClick={onClick} title="Eliminar" style={{ marginLeft:"8px", width:"24px", height:"24px",
    flexShrink:"0", display:"flex", alignItems:"center", justifyContent:"center",
    color:"#d1d5db", background:"none", border:"none", fontSize:"20px",
    lineHeight:"1", cursor:"pointer" }}>
    ×
  </button>
);
const Divider = () => (
  <div style={{ borderTop:"1px solid #f3f4f6", margin:"20px 0" }} />
);

/* ─── MAIN COMPONENT ────────────────────────────────────────── */
function GeneradorManiobras() {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const [tab, setTab]       = useState(0);
  const [html, setHtml]     = useState("");
  const [copied, setCopied] = useState(false);
  const [preview, setPreview] = useState(false);
  const [inserted, setInserted] = useState(false);

  const [d, setD] = useState({
    titulo: "", subtitulo: "", itCodes: [""],
    descripcion: "", objetivo: "", destinatarios: "", escenario: "",
    escenarioImagenes: [],
    epis: ["", "", ""],
    materiales: ["", "", "", ""],
    materialAdicional: [""],
    recursosImagenes: [{ mode: "url", url: "", src: "", name: "" }],
    recursosVideos: [""],
    organizacion: "",
    rolMandoTitulo: "JEFE DE TURNO",
    rolesJT: [
        "Explicará a los BX el desarrollo de la práctica, identificando los objetivos, riesgos, secuencia de acciones y el Plan SOS.",
        "Supervisará que la ejecución se ajuste a la Ficha de Prácticas y a la Evaluación de Riesgos, controlando en todo momento las condiciones de seguridad. En caso de incidente, activará el Plan SOS."
    ],
    refDoc: "",
    aspectosGenerales: "",
    desarrolloManiobra: "",
    escenarioDesarrollo: "",
    videos: [""],
    desarrolloImagenes: [{ mode: "url", url: "", src: "", name: "" }],
    pasos: ["", "", "", "", "", ""],
    precauciones: "", recordad: "",
    planSOS: {
      senal: "SEÑAL DE EMERGENCIA: 3 REPETICIONES DE LA PALABRA «EMERGENCIA»",
      intro1: "En caso de accidente durante el desarrollo de la práctica, cualquier integrante podrá alertar con la señal indicada. A partir de ese momento, todo el personal paraliza su actuación con seguridad y sigue las instrucciones de los instructores.",
      intro2: "Cuando haya personal disperso en el terreno, se dispondrá necesariamente de emisoras.",
      leveTitulo: "Accidente Leve",
      leveItems: [
        "Primera atención básica con medios disponibles (botiquín, DESA, etc.).",
        "Avisar al médico de alerta si afecta a personal del CBCM.",
        "Si se necesitan recursos de guardia: aviso inmediato a CECOP (918 354 918)."
      ],
      graveTitulo: "Accidente Grave o Muy Grave",
      graveItems: [
        "Todo lo previsto para accidente leve.",
        "Traslado de aviso al 112."
      ],
      cierre: "En ambos casos, el Parte de Accidente/Suceso (PAS) se realizará conforme a la normativa interna del CBCM."
    },
    evaluacion: {
      mostrar: false,
      criticos: [""],
      tecnicos: [""],
      actitudinales: [""]
    },
    pieTexto: "Este documento es propiedad del Cuerpo de Bomberos de la Comunidad de Madrid, protegido bajo licencia CC BY-NC-SA 4.0. Se permite la copia y distribución acreditando autoría, sin fines comerciales y compartiendo bajo la misma licencia.",
    riesgos: [{ riesgo: "", causa: "", grado: "Notable", medida: "" }],
    revision: today,
  });

  const upd    = (k, v) => setD(p => ({ ...p, [k]: v }));
  const updArr = (k, i, v) => setD(p => { const a = [...p[k]]; a[i] = v; return { ...p, [k]: a }; });
  const addArr = (k, def = "") => setD(p => ({ ...p, [k]: [...p[k], def] }));
  const remArr = (k, i) => setD(p => { const a = [...p[k]]; a.splice(i, 1); return { ...p, [k]: a }; });
  
  const updRisk = (i, f, v) => setD(p => {
    const a = [...p.riesgos]; a[i] = { ...a[i], [f]: v }; return { ...p, riesgos: a };
  });

  const updImg = (key, i, field, val) => setD(p => {
    const a = [...p[key]]; a[i] = { ...a[i], [field]: val }; return { ...p, [key]: a };
  });
  const handleImgFile = (key, i, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => setD(p => {
      const a = [...p[key]];
      a[i] = { ...a[i], src: e.target.result, name: file.name };
      return { ...p, [key]: a };
    });
    reader.readAsDataURL(file);
  };
  const addImg = (key) => setD(p => ({ ...p, [key]: [...p[key], { mode: "url", url: "", src: "", name: "" }] }));
  const remImg = (key, i) => setD(p => ({ ...p, [key]: p[key].filter((_, j) => j !== i) }));

  const updSos = (f, v) => setD(p => ({ ...p, planSOS: { ...p.planSOS, [f]: v } }));
  const updSosArr = (f, i, v) => setD(p => {
    const a = [...p.planSOS[f]]; a[i] = v; 
    return { ...p, planSOS: { ...p.planSOS, [f]: a } };
  });
  const addSosArr = (f, def = "") => setD(p => ({ ...p, planSOS: { ...p.planSOS, [f]: [...p.planSOS[f], def] } }));
  const remSosArr = (f, i) => setD(p => ({ ...p, planSOS: { ...p.planSOS, [f]: p.planSOS[f].filter((_, j) => j !== i) } }));

  /* Helpers Criterios Evaluación */
  const updEval = (f, v) => setD(p => ({ ...p, evaluacion: { ...p.evaluacion, [f]: v } }));
  const updEvalArr = (f, i, v) => setD(p => {
    const a = [...p.evaluacion[f]]; a[i] = v; 
    return { ...p, evaluacion: { ...p.evaluacion, [f]: a } };
  });
  const addEvalArr = (f, def = "") => setD(p => ({ ...p, evaluacion: { ...p.evaluacion, [f]: [...p.evaluacion[f], def] } }));
  const remEvalArr = (f, i) => setD(p => ({ ...p, evaluacion: { ...p.evaluacion, [f]: p.evaluacion[f].filter((_, j) => j !== i) } }));

  const generate = () => { setHtml(generateHTML(d)); setTab(9); setPreview(false); setInserted(false); };

  const resetAll = () => {
    if (!window.confirm("¿Borrar todo y empezar una maniobra nueva?")) return;
    const t = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    setD({
      titulo: "", subtitulo: "", itCodes: [""],
      descripcion: "", objetivo: "", destinatarios: "", escenario: "",
      escenarioImagenes: [],
      epis: ["", "", ""],
      materiales: ["", "", "", ""],
      materialAdicional: [""],
      recursosImagenes: [{ mode: "url", url: "", src: "", name: "" }],
      recursosVideos: [""],
      organizacion: "",
      rolMandoTitulo: "JEFE DE TURNO",
      rolesJT: [
        "Explicará a los BX el desarrollo de la práctica, identificando los objetivos, riesgos, secuencia de acciones y el Plan SOS.",
        "Supervisará que la ejecución se ajuste a la Ficha de Prácticas y a la Evaluación de Riesgos, controlando en todo momento las condiciones de seguridad. En caso de incidente, activará el Plan SOS."
      ],
      refDoc: "",
      aspectosGenerales: "",
      desarrolloManiobra: "",
      escenarioDesarrollo: "",
      videos: [""],
      desarrolloImagenes: [{ mode: "url", url: "", src: "", name: "" }],
      pasos: ["", "", "", "", "", ""],
      precauciones: "", recordad: "",
      planSOS: {
        senal: "SEÑAL DE EMERGENCIA: 3 REPETICIONES DE LA PALABRA «EMERGENCIA»",
        intro1: "En caso de accidente durante el desarrollo de la práctica, cualquier integrante podrá alertar con la señal indicada. A partir de ese momento, todo el personal paraliza su actuación con seguridad y sigue las instrucciones de los instructores.",
        intro2: "Cuando haya personal disperso en el terreno, se dispondrá necesariamente de emisoras.",
        leveTitulo: "Accidente Leve",
        leveItems: [
          "Primera atención básica con medios disponibles (botiquín, DESA, etc.).",
          "Avisar al médico de alerta si afecta a personal del CBCM.",
          "Si se necesitan recursos de guardia: aviso inmediato a CECOP (918 354 918)."
        ],
        graveTitulo: "Accidente Grave o Muy Grave",
        graveItems: [
          "Todo lo previsto para accidente leve.",
          "Traslado de aviso al 112."
        ],
        cierre: "En ambos casos, el Parte de Accidente/Suceso (PAS) se realizará conforme a la normativa interna del CBCM."
      },
      evaluacion: {
        mostrar: false,
        criticos: [""],
        tecnicos: [""],
        actitudinales: [""]
      },
      pieTexto: "Este documento es propiedad del Cuerpo de Bomberos de la Comunidad de Madrid, protegido bajo licencia CC BY-NC-SA 4.0. Se permite la copia y distribución acreditando autoría, sin fines comerciales y compartiendo bajo la misma licencia.",
      riesgos: [{ riesgo: "", causa: "", grado: "Notable", medida: "" }],
      revision: t,
    });
    setHtml(""); setTab(0); setPreview(false); setInserted(false); setCopied(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(html).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = html; ta.style.cssText = 'position:fixed;opacity:0;';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true); setTimeout(() => setCopied(false), 2500);
    });
  };

  const insertInEditor = () => {
    if (typeof window.insertHTMLAtCursor === 'function') {
      window.insertHTMLAtCursor(html);
      setInserted(true);
      setTimeout(() => {
        if (typeof window.closeManiobrasModal === 'function') window.closeManiobrasModal();
      }, 800);
    }
  };

  /* ── TAB PANELS ── */
  const spY = { display:"flex", flexDirection:"column", gap:"20px" };

  const panels = [

    /* 0 · Cabecera */
    <div style={spY} key="tab0">
      <SectionTitle>Cabecera del documento</SectionTitle>
      <Hint>Identificación de la maniobra y sus códigos de instrucción técnica (si aplica).</Hint>
      <div><Label required>Título de la práctica</Label>
        <Inp value={d.titulo} onChange={v => upd("titulo", v)} placeholder="ej: BOMBEO EN SERIE DESDE HIDRANTE" /></div>
      <div><Label>Subtítulo (opcional)</Label>
        <Inp value={d.subtitulo} onChange={v => upd("subtitulo", v)} placeholder="ej: Verificación de presión de red y riesgo de cavitación" /></div>
      <div>
        <Label>Códigos de Instrucción Técnica (Opcional)</Label>
        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
          {d.itCodes.map((c, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center" }}>
              <div style={{ flex:"1" }}>
                <Inp value={c} onChange={v => updArr("itCodes", i, v)} placeholder="ej: IT.JUT1.102" />
              </div>
              {d.itCodes.length > 1 && <RemBtn onClick={() => remArr("itCodes", i)} />}
            </div>
          ))}
        </div>
        <AddBtn onClick={() => addArr("itCodes")} label="＋ Añadir código" />
      </div>
    </div>,

    /* 1 · Info General */
    <div style={spY} key="tab1">
      <SectionTitle>Información General</SectionTitle>
      <Hint>Secciones 1 a 4 del documento generado.</Hint>
      <div><Label required>1 · Descripción</Label>
        <Txt value={d.descripcion} onChange={v => upd("descripcion", v)} rows={10}
          placeholder="Qué se monta, qué se verifica, aspectos técnicos clave..." /></div>
      <Divider />
      <div><Label required>2 · Objetivo Pedag&oacute;gico</Label>
        <Txt value={d.objetivo} onChange={v => upd("objetivo", v)} rows={10}
          placeholder="ej: Comprobar ventajas e inconvenientes de un bombeo en serie desde un hidrante" /></div>
      <Divider />
      <div><Label required>3 · Destinatarios</Label>
        <Txt value={d.destinatarios} onChange={v => upd("destinatarios", v)} rows={10}
          placeholder="ej: Personal operativo de guardia" /></div>
      <Divider />
      <div><Label required>4 · Escenario</Label>
        <Txt value={d.escenario} onChange={v => upd("escenario", v)} rows={10}
          placeholder="ej: La práctica se desarrollará en el hidrante de abastecimiento del parque" /></div>
      <Divider />
      <div>
        <Label>Imágenes para el Escenario (Opcional)</Label>
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          {d.escenarioImagenes && d.escenarioImagenes.map((img, i) => (
            <div key={i} style={{ border:"1px solid #e5e7eb", borderRadius:"6px", padding:"10px", background:"#fff" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
                <div style={{ display:"flex", gap:"4px" }}>
                  {["url", "file"].map(mode => (
                    <button type="button" key={mode} onClick={() => updImg("escenarioImagenes", i, "mode", mode)}
                      style={{ padding:"3px 10px", fontSize:"11px", fontWeight:"700", border:"1.5px solid",
                        borderRadius:"4px", cursor:"pointer",
                        borderColor: img.mode === mode ? "#B22222" : "#e5e7eb",
                        background:  img.mode === mode ? "#fff0f0" : "#f9fafb",
                        color:       img.mode === mode ? "#B22222" : "#6b7280" }}>
                      {mode === "url" ? "URL" : "Archivo local"}
                    </button>
                  ))}
                </div>
                <RemBtn onClick={() => remImg("escenarioImagenes", i)} />
              </div>
              {img.mode === "url" ? (
                <Inp value={img.url} onChange={v => updImg("escenarioImagenes", i, "url", v)} placeholder="https://ejemplo.com/imagen.jpg" />
              ) : (
                <div>
                  <label style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px",
                    padding:"10px", border:"2px dashed #e5e7eb", borderRadius:"6px", cursor:"pointer",
                    fontSize:"13px", color: img.src ? "#16a34a" : "#6b7280", background:"#f9fafb" }}>
                    {img.src ? `✓ ${img.name}` : "📁 Elegir imagen..."}
                    <input type="file" accept="image/*" style={{ display:"none" }}
                      onChange={e => handleImgFile("escenarioImagenes", i, e.target.files[0])} />
                  </label>
                  {img.src && (
                    <img src={img.src} alt="preview"
                      style={{ marginTop:"6px", maxHeight:"70px", maxWidth:"100%", borderRadius:"4px", display:"block" }} />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <AddBtn onClick={() => addImg("escenarioImagenes")} label="＋ Añadir imagen al escenario" />
      </div>
    </div>,

    /* 2 · Recursos */
    <div style={spY} key="tab2">
      <SectionTitle>Recursos</SectionTitle>
      <Hint>EPIs, materiales y recursos multimedia necesarios para la maniobra.</Hint>
      <div>
        <Label>EPI's</Label>
        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
          {d.epis.map((e, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center" }}>
              <span style={{ fontSize:"12px", color:"#9ca3af", width:"24px", textAlign:"right", marginRight:"8px" }}>{i + 1}.</span>
              <div style={{ flex:"1" }}>
                <Inp value={e} onChange={v => updArr("epis", i, v)}
                  placeholder={["U1 completo + casco F1", "Botas de intervención con punta de acero", "Guantes de protección"][i] || "EPI..."} />
              </div>
              {d.epis.length > 1 && <RemBtn onClick={() => remArr("epis", i)} />}
            </div>
          ))}
        </div>
        <AddBtn onClick={() => addArr("epis")} label="＋ Añadir EPI" />
      </div>
      <Divider />
      <div>
        <Label>Materiales y Herramientas</Label>
        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
          {d.materiales.map((m, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center" }}>
              <span style={{ fontSize:"12px", color:"#9ca3af", width:"24px", textAlign:"right", marginRight:"8px" }}>{i + 1}.</span>
              <div style={{ flex:"1" }}>
                <Inp value={m} onChange={v => updArr("materiales", i, v)}
                  placeholder={["BRP o BFP", "Llave de hidrante / columna", "2 mangueras de 70Ø", "1 manguera de 45Ø"][i] || "Material..."} />
              </div>
              {d.materiales.length > 1 && <RemBtn onClick={() => remArr("materiales", i)} />}
            </div>
          ))}
        </div>
        <AddBtn onClick={() => addArr("materiales")} label="＋ Añadir material" />
      </div>
      <Divider />
      <div>
        <Label>Material Adicional (Opcional)</Label>
        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
          {(d.materialAdicional || []).map((m, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center" }}>
              <span style={{ fontSize:"12px", color:"#9ca3af", width:"24px", textAlign:"right", marginRight:"8px" }}>{i + 1}.</span>
              <div style={{ flex:"1" }}>
                <Inp value={m} onChange={v => updArr("materialAdicional", i, v)}
                  placeholder="Material adicional, herramientas específicas..." />
              </div>
              {(d.materialAdicional || []).length > 1 && <RemBtn onClick={() => remArr("materialAdicional", i)} />}
            </div>
          ))}
        </div>
        <AddBtn onClick={() => addArr("materialAdicional")} label="＋ Añadir material adicional" />
      </div>

      <Divider />
             
      <div>
        <Label>Imágenes</Label>
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          {d.recursosImagenes.map((img, i) => (
            <div key={i} style={{ border:"1px solid #e5e7eb", borderRadius:"6px", padding:"10px", background:"#fff" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
                <div style={{ display:"flex", gap:"4px" }}>
                  {["url", "file"].map(mode => (
                    <button type="button" key={mode} onClick={() => updImg("recursosImagenes", i, "mode", mode)}
                      style={{ padding:"3px 10px", fontSize:"11px", fontWeight:"700", border:"1.5px solid",
                        borderRadius:"4px", cursor:"pointer",
                        borderColor: img.mode === mode ? "#B22222" : "#e5e7eb",
                        background:  img.mode === mode ? "#fff0f0" : "#f9fafb",
                        color:       img.mode === mode ? "#B22222" : "#6b7280" }}>
                      {mode === "url" ? "URL" : "Archivo local"}
                    </button>
                  ))}
                </div>
                {d.recursosImagenes.length > 1 && <RemBtn onClick={() => remImg("recursosImagenes", i)} />}
              </div>
              {img.mode === "url" ? (
                <Inp value={img.url} onChange={v => updImg("recursosImagenes", i, "url", v)} placeholder="https://ejemplo.com/imagen.jpg" />
              ) : (
                <div>
                  <label style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px",
                    padding:"10px", border:"2px dashed #e5e7eb", borderRadius:"6px", cursor:"pointer",
                    fontSize:"13px", color: img.src ? "#16a34a" : "#6b7280", background:"#f9fafb" }}>
                    {img.src ? `✓ ${img.name}` : "📁 Elegir imagen..."}
                    <input type="file" accept="image/*" style={{ display:"none" }}
                      onChange={e => handleImgFile("recursosImagenes", i, e.target.files[0])} />
                  </label>
                  {img.src && (
                    <img src={img.src} alt="preview"
                      style={{ marginTop:"6px", maxHeight:"70px", maxWidth:"100%", borderRadius:"4px", display:"block" }} />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <AddBtn onClick={() => addImg("recursosImagenes")} label="＋ Añadir imagen" />
      </div>
      <Divider />
      <div>
        <Label>Vídeos (URLs - YouTube, Vimeo, mp4)</Label>
        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
          {d.recursosVideos.map((vid, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center" }}>
              <div style={{ flex:"1" }}>
                <Inp value={vid} onChange={v => updArr("recursosVideos", i, v)} placeholder="https://youtube.com/..." />
              </div>
              {d.recursosVideos.length > 1 && <RemBtn onClick={() => remArr("recursosVideos", i)} />}
            </div>
          ))}
        </div>
        <AddBtn onClick={() => addArr("recursosVideos")} label="＋ Añadir vídeo" />
      </div>
    </div>,

    /* 3 · Organización */
    <div style={spY} key="tab3">
      <SectionTitle>Organización del Grupo</SectionTitle>
      <Hint>Define la estructura y las funciones del personal durante la maniobra.</Hint>
      <div><Label required>Descripción general</Label>
        <Txt value={d.organizacion} onChange={v => upd("organizacion", v)} rows={10}
          placeholder="ej: Práctica para todos los componentes del turno operativo." /></div>
      
      <Divider />
      
      <div>
        <Label>Título del Responsable</Label>
        <div style={{ display:"flex", gap:"20px", marginBottom:"15px", background:"#fff", padding:"12px", borderRadius:"6px", border:"1.5px solid #e5e7eb" }}>
          {["JEFE DE TURNO", "RESPONSABLE DE LA MANIOBRA"].map(opcion => (
            <label key={opcion} style={{ display:"flex", alignItems:"center", fontSize:"13px", cursor:"pointer", fontWeight:"600", color:"#374151" }}>
              <input
                type="radio"
                name="rolMandoTitulo"
                value={opcion}
                checked={d.rolMandoTitulo === opcion}
                onChange={() => upd("rolMandoTitulo", opcion)}
                style={{ marginRight:"8px", accentColor:"#B22222" }}
              />
              {opcion}
            </label>
          ))}
        </div>
        
        <Label>Funciones del {d.rolMandoTitulo}</Label>
        <Hint>Añade las responsabilidades específicas para el mando de la maniobra.</Hint>
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          {(d.rolesJT || []).map((rol, i) => (
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"8px" }}>
              <div style={{ marginTop:"12px", flexShrink:"0", width:"22px", height:"22px",
                borderRadius:"4px", background:"#f3f4f6", border:"1px solid #d1d5db", 
                color:"#374151", fontSize:"11px", fontWeight:"bold", display:"flex",
                alignItems:"center", justifyContent:"center" }}>
                {i + 1}
              </div>
              <div style={{ flex:"1" }}>
                <Txt value={rol} onChange={v => updArr("rolesJT", i, v)} rows={3} 
                  placeholder={`Describa la función del ${d.rolMandoTitulo}...`} />
              </div>
              {d.rolesJT.length > 1 && <RemBtn onClick={() => remArr("rolesJT", i)} />}
            </div>
          ))}
        </div>
        <AddBtn onClick={() => addArr("rolesJT", "")} label={`＋ Añadir función al ${d.rolMandoTitulo}`} />
      </div>
    </div>,

    /* 4 · Desarrollo */
    <div style={spY} key="tab4">
      <SectionTitle>Desarrollo Explicativo</SectionTitle>
      <Hint>Referencia, bloques de contexto, multimedia, pasos secuenciales y precauciones.</Hint>
      <div><Label>Documentación de referencia</Label>
        <Inp value={d.refDoc} onChange={v => upd("refDoc", v)}
          placeholder="ej: 2023 Reciclaje Hidráulica y Abastecimientos" /></div>
      
      <div><Label>Aspectos generales</Label>
        <Txt value={d.aspectosGenerales} onChange={v => upd("aspectosGenerales", v)} rows={4}
          placeholder="Descripción de los aspectos generales clave..." /></div>
      
      <div><Label>Desarrollo de la maniobra</Label>
        <Txt value={d.desarrolloManiobra} onChange={v => upd("desarrolloManiobra", v)} rows={4}
          placeholder="Explicación detallada del desarrollo..." /></div>

      <div><Label>Escenario</Label>
        <Txt value={d.escenarioDesarrollo} onChange={v => upd("escenarioDesarrollo", v)} rows={4}
          placeholder="Detalles específicos sobre el escenario de trabajo..." /></div>
      
      <Divider />
      <div>
        <Label>Imágenes del desarrollo</Label>
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          {d.desarrolloImagenes.map((img, i) => (
            <div key={i} style={{ border:"1px solid #e5e7eb", borderRadius:"6px", padding:"10px", background:"#fff" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
                <div style={{ display:"flex", gap:"4px" }}>
                  {["url", "file"].map(mode => (
                    <button type="button" key={mode} onClick={() => updImg("desarrolloImagenes", i, "mode", mode)}
                      style={{ padding:"3px 10px", fontSize:"11px", fontWeight:"700", border:"1.5px solid",
                        borderRadius:"4px", cursor:"pointer",
                        borderColor: img.mode === mode ? "#B22222" : "#e5e7eb",
                        background:  img.mode === mode ? "#fff0f0" : "#f9fafb",
                        color:       img.mode === mode ? "#B22222" : "#6b7280" }}>
                      {mode === "url" ? "URL" : "Archivo local"}
                    </button>
                  ))}
                </div>
                {d.desarrolloImagenes.length > 1 && <RemBtn onClick={() => remImg("desarrolloImagenes", i)} />}
              </div>
              {img.mode === "url" ? (
                <Inp value={img.url} onChange={v => updImg("desarrolloImagenes", i, "url", v)} placeholder="https://ejemplo.com/esquema.jpg" />
              ) : (
                <div>
                  <label style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px",
                    padding:"10px", border:"2px dashed #e5e7eb", borderRadius:"6px", cursor:"pointer",
                    fontSize:"13px", color: img.src ? "#16a34a" : "#6b7280", background:"#f9fafb" }}>
                    {img.src ? `✓ ${img.name}` : "📁 Elegir imagen..."}
                    <input type="file" accept="image/*" style={{ display:"none" }}
                      onChange={e => handleImgFile("desarrolloImagenes", i, e.target.files[0])} />
                  </label>
                  {img.src && (
                    <img src={img.src} alt="preview"
                      style={{ marginTop:"6px", maxHeight:"70px", maxWidth:"100%", borderRadius:"4px", display:"block" }} />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <AddBtn onClick={() => addImg("desarrolloImagenes")} label="＋ Añadir imagen" />
      </div>

      <Divider />
      <div>
        <Label>Vídeos del desarrollo (URLs)</Label>
        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
          {d.videos.map((vid, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center" }}>
              <div style={{ flex:"1" }}>
                <Inp value={vid} onChange={v => updArr("videos", i, v)} placeholder="https://youtube.com/..." />
              </div>
              {d.videos.length > 1 && <RemBtn onClick={() => remArr("videos", i)} />}
            </div>
          ))}
        </div>
        <AddBtn onClick={() => addArr("videos")} label="＋ Añadir vídeo" />
      </div>

      <Divider />
      <div>
        <Label required>Pasos secuenciales</Label>
        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
          {d.pasos.map((p, i) => (
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"8px" }}>
              <div style={{ marginTop:"8px", flexShrink:"0", width:"28px", height:"28px",
                borderRadius:"50%", background:"#B22222", color:"#fff",
                fontSize:"12px", fontWeight:"bold", display:"flex",
                alignItems:"center", justifyContent:"center" }}>
                {i + 1}
              </div>
              <div style={{ flex:"1" }}>
                <Txt value={p} onChange={v => updArr("pasos", i, v)} rows={2} placeholder={`Paso ${i + 1}...`} />
              </div>
              {d.pasos.length > 1 && <RemBtn onClick={() => remArr("pasos", i)} />}
            </div>
          ))}
        </div>
        <AddBtn onClick={() => addArr("pasos")} label="＋ Añadir paso" />
      </div>
      <Divider />
      <div><Label required>Precauciones</Label>
        <Txt value={d.precauciones} onChange={v => upd("precauciones", v)} rows={3}
          placeholder="ej: Para evitar la cavitación, si la presión baja de 0 bares, reducir la demanda inmediatamente..." /></div>
      <div><Label>«Recordad» — nota de cierre (opcional)</Label>
        <Txt value={d.recordad} onChange={v => upd("recordad", v)} rows={2}
          placeholder="ej: No podemos demandar más prestaciones al sistema de las que puede proporcionar..." /></div>
    </div>,

    /* 5 · Riesgos */
    <div style={spY} key="tab5">
      <SectionTitle>Evaluación de Riesgos</SectionTitle>
      <Hint>Añade una fila por cada riesgo identificado.</Hint>
      {d.riesgos.map((r, i) => (
        <div key={i} style={{ border:"1px solid #e5e7eb", borderRadius:"8px",
          padding:"16px", background:"#fff" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"12px" }}>
            <span style={{ fontSize:"11px", fontWeight:"700", color:"#9ca3af",
              textTransform:"uppercase", letterSpacing:"0.08em" }}>Riesgo {i + 1}</span>
            {d.riesgos.length > 1 && (
              <button type="button" onClick={() => remArr("riesgos", i)}
                style={{ fontSize:"12px", color:"#f87171", background:"none", border:"none",
                  fontWeight:"600", cursor:"pointer" }}>Eliminar</button>
            )}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            <div><Label>Tipo de riesgo</Label>
              <Inp value={r.riesgo} onChange={v => updRisk(i, "riesgo", v)}
                placeholder="ej: Caída de personas al mismo nivel" /></div>
            <div><Label>Causa</Label>
              <Txt value={r.causa} onChange={v => updRisk(i, "causa", v)} rows={2}
                placeholder="ej: Mangueras en carga que pueden conllevar tropiezos" /></div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:"12px" }}>
              <div style={{ flex:"1" }}><Label>Grado de riesgo</Label>
                <select value={r.grado} onChange={e => updRisk(i, "grado", e.target.value)}
                  style={{ width:"100%", border:"1.5px solid #e5e7eb", borderRadius:"6px",
                    background:"#fff", padding:"7px 10px", fontSize:"13px",
                    fontFamily:"inherit", outline:"none" }}>
                  <option>Notable</option>
                  <option>Moderado</option>
                  <option>Aceptable</option>
                </select>
              </div>
              <div style={{ paddingBottom:"4px" }}>
                <span style={{
                  fontSize:"12px", fontWeight:"700", padding:"4px 12px",
                  borderRadius:"50px",
                  background: r.grado === "Notable" ? "#ffedd5" : r.grado === "Moderado" ? "#fef9c3" : "#dcfce7",
                  color:      r.grado === "Notable" ? "#9a3412" : r.grado === "Moderado" ? "#713f12" : "#14532d",
                }}>
                  {r.grado}
                </span>
              </div>
            </div>
            <div><Label>Medida preventiva</Label>
              <Txt value={r.medida} onChange={v => updRisk(i, "medida", v)} rows={2}
                placeholder="ej: El JD comunica que la instalación ha entrado en carga." /></div>
          </div>
        </div>
      ))}
      <AddBtn
        onClick={() => addArr("riesgos", { riesgo: "", causa: "", grado: "Notable", medida: "" })}
        label="＋ Añadir riesgo" />
    </div>,

    /* 6 · Plan SOS */
    <div style={spY} key="tab6">
      <SectionTitle>Plan SOS</SectionTitle>
      <Hint>Edición completa de los parámetros del Plan SOS del anexo.</Hint>
      <div><Label required>Señal de Emergencia</Label>
        <Inp value={d.planSOS.senal} onChange={v => updSos("senal", v)} /></div>
      
      <div><Label required>Párrafos introductorios</Label>
        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
          <Txt value={d.planSOS.intro1} onChange={v => updSos("intro1", v)} rows={3} />
          <Txt value={d.planSOS.intro2} onChange={v => updSos("intro2", v)} rows={2} />
        </div>
      </div>

      <Divider />
      <div>
        <Label>Sección: Accidente Leve (Título)</Label>
        <Inp value={d.planSOS.leveTitulo} onChange={v => updSos("leveTitulo", v)} />
        <Label style={{marginTop:"8px"}}>Pasos Accidente Leve</Label>
        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
          {d.planSOS.leveItems.map((item, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center" }}>
              <div style={{ flex:"1" }}>
                <Inp value={item} onChange={v => updSosArr("leveItems", i, v)} />
              </div>
              {d.planSOS.leveItems.length > 1 && <RemBtn onClick={() => remSosArr("leveItems", i)} />}
            </div>
          ))}
        </div>
        <AddBtn onClick={() => addSosArr("leveItems")} label="＋ Añadir paso leve" />
      </div>

      <Divider />
      <div>
        <Label>Sección: Accidente Grave (Título)</Label>
        <Inp value={d.planSOS.graveTitulo} onChange={v => updSos("graveTitulo", v)} />
        <Label style={{marginTop:"8px"}}>Pasos Accidente Grave</Label>
        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
          {d.planSOS.graveItems.map((item, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center" }}>
              <div style={{ flex:"1" }}>
                <Inp value={item} onChange={v => updSosArr("graveItems", i, v)} />
              </div>
              {d.planSOS.graveItems.length > 1 && <RemBtn onClick={() => remSosArr("graveItems", i)} />}
            </div>
          ))}
        </div>
        <AddBtn onClick={() => addSosArr("graveItems")} label="＋ Añadir paso grave" />
      </div>

      <Divider />
      <div><Label required>Cierre del Plan SOS</Label>
        <Txt value={d.planSOS.cierre} onChange={v => updSos("cierre", v)} rows={2} /></div>
    </div>,

    /* 7 · Evaluación */
    <div style={spY} key="tab7">
      <SectionTitle>Criterios de Evaluación</SectionTitle>
      <Hint>Rúbricas de evaluación divididas por criticidad (opcional).</Hint>

      <div style={{ display:"flex", alignItems:"center", gap:"8px", background:"#fff", padding:"12px", borderRadius:"6px", border:"1.5px solid #e5e7eb" }}>
        <input 
          type="checkbox" 
          id="eval_mostrar" 
          checked={d.evaluacion.mostrar} 
          onChange={e => updEval("mostrar", e.target.checked)} 
          style={{ accentColor: "#B22222", width:"16px", height:"16px", cursor:"pointer" }} 
        />
        <label htmlFor="eval_mostrar" style={{ fontSize:"13px", fontWeight:"600", color:"#374151", cursor:"pointer", userSelect:"none" }}>
          Incluir bloque de Criterios de Evaluación en el documento
        </label>
      </div>

      {d.evaluacion.mostrar && (
        <div style={{ display:"flex", flexDirection:"column", gap:"20px", marginTop:"8px" }}>
          
          {/* BLOQUE 1 - CRÍTICOS */}
          <div style={{ border:"1px solid #f0c0c0", borderRadius:"6px", padding:"16px", background:"#fff3f3" }}>
            <Label style={{color:"#8b0000", fontSize:"12px"}}>BLOQUE 1 - CRÍTICOS</Label>
            <p style={{fontSize:"11px", color:"#666", marginBottom:"12px", marginTop:"0"}}>
              Es necesario cumplirlos todos para poder dar por apta la maniobra, aseguran el aprobado.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
              {d.evaluacion.criticos.map((item, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center" }}>
                  <div style={{ flex:"1" }}>
                    <Inp value={item} onChange={v => updEvalArr("criticos", i, v)} placeholder="Ítem crítico..." />
                  </div>
                  {d.evaluacion.criticos.length > 1 && <RemBtn onClick={() => remEvalArr("criticos", i)} />}
                </div>
              ))}
            </div>
            <AddBtn onClick={() => addEvalArr("criticos")} label="＋ Añadir ítem crítico" />
          </div>

          {/* BLOQUE 2 - TÉCNICOS */}
          <div style={{ border:"1px solid #c8e6c9", borderRadius:"6px", padding:"16px", background:"#e8f5e9" }}>
            <Label style={{color:"#1b5e20", fontSize:"12px"}}>BLOQUE 2 - TÉCNICOS</Label>
            <p style={{fontSize:"11px", color:"#666", marginBottom:"12px", marginTop:"0"}}>
              Estos ítems son los que nos permitirán alcanzar el 10 (los 5 puntos restantes).
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
              {d.evaluacion.tecnicos.map((item, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center" }}>
                  <div style={{ flex:"1" }}>
                    <Inp value={item} onChange={v => updEvalArr("tecnicos", i, v)} placeholder="Ítem técnico..." />
                  </div>
                  {d.evaluacion.tecnicos.length > 1 && <RemBtn onClick={() => remEvalArr("tecnicos", i)} />}
                </div>
              ))}
            </div>
            <AddBtn onClick={() => addEvalArr("tecnicos")} label="＋ Añadir ítem técnico" />
          </div>

          {/* BLOQUE 3 - ACTITUDINALES */}
          <div style={{ border:"1px solid #ffe082", borderRadius:"6px", padding:"16px", background:"#fff8e1" }}>
            <Label style={{color:"#f57f17", fontSize:"12px"}}>BLOQUE 3 - ACTITUDINALES</Label>
            <p style={{fontSize:"11px", color:"#666", marginBottom:"12px", marginTop:"0"}}>
              Estos ítems no suman, pero sí que restan.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
              {d.evaluacion.actitudinales.map((item, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center" }}>
                  <div style={{ flex:"1" }}>
                    <Inp value={item} onChange={v => updEvalArr("actitudinales", i, v)} placeholder="Ítem actitudinal..." />
                  </div>
                  {d.evaluacion.actitudinales.length > 1 && <RemBtn onClick={() => remEvalArr("actitudinales", i)} />}
                </div>
              ))}
            </div>
            <AddBtn onClick={() => addEvalArr("actitudinales")} label="＋ Añadir ítem actitudinal" />
          </div>

        </div>
      )}
    </div>,

    /* 8 · Pie */
    <div style={spY} key="tab8">
      <SectionTitle>Pie de Página</SectionTitle>
      <Hint>Fecha de revisión y texto legal del pie de página.</Hint>
      <div>
        <Label required>Fecha de revisión</Label>
        <Inp value={d.revision} onChange={v => upd("revision", v)} placeholder="ej: 20260322" />
        <p style={{ fontSize:"12px", color:"#9ca3af", marginTop:"4px" }}>Formato AAAAMMDD — ej: 20260322 = 22 de marzo de 2026</p>
      </div>
      <div>
        <Label>Texto del Pie de Página</Label>
        <Txt value={d.pieTexto} onChange={v => upd("pieTexto", v)} rows={3} />
      </div>
    </div>,

    /* 9 · Generar (Modificado: Sin visualización de código) */
    <div style={spY} key="tab9">
      <SectionTitle>Gestión de la Maniobra</SectionTitle>
      <Hint>Insértalo en el editor o copia el contenido para usarlo en Moodle.</Hint>
      {!html ? (
        <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:"6px",
          padding:"20px", fontSize:"13px", color:"#92400e", textAlign:"center" }}>
          <div style={{ fontSize:"24px", marginBottom:"8px" }}>⚡</div>
          Pulsa el botón <strong>⚡ Generar HTML</strong> de la barra inferior para procesar el documento.
        </div>
      ) : (
        <div style={spY}>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", justifyContent:"center", background:"#fff", padding:"20px", borderRadius:"8px", border:"1.5px solid #e5e7eb" }}>
            <button type="button" onClick={insertInEditor}
              style={{ padding:"12px 24px", borderRadius:"6px", fontSize:"14px",
                fontWeight:"700", border:"none", cursor:"pointer",
                background: inserted ? "#16a34a" : "#B22222",
                color:"#fff", transition:"background 0.2s" }}>
              {inserted ? "✓ ¡Insertado en el editor!" : "⬆️ Insertar en el editor"}
            </button>
            <button type="button" onClick={copy}
              style={{ padding:"12px 24px", borderRadius:"6px", fontSize:"14px",
                fontWeight:"700", border:"none", cursor:"pointer",
                background: copied ? "#16a34a" : "#374151",
                color:"#fff", transition:"background 0.2s" }}>
              {copied ? "✓ ¡Copiado!" : "📋 Copiar contenido"}
            </button>
            <button type="button" onClick={() => setPreview(p => !p)}
              style={{ padding:"12px 24px", borderRadius:"6px", fontSize:"14px",
                fontWeight:"600", border:"1.5px solid #e5e7eb", cursor:"pointer",
                background:"#fff", color:"#374151" }}>
              {preview ? "Ocultar previsualización" : "👁️ Ver previsualización"}
            </button>
          </div>

          {preview && (
            <div style={{ marginTop:"10px" }}>
              <div style={{ fontSize:"11px", fontWeight:"700", color:"#9ca3af",
                textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"8px" }}>
                Previsualización del documento final
              </div>
              <div style={{ border:"1px solid #e5e7eb", borderRadius:"6px", overflow:"hidden", background:"#fff" }}>
                <iframe
                  srcDoc={`<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="padding:16px;margin:0;">${html}</body></html>`}
                  style={{ width:"100%", height:"600px", border:"none" }}
                  title="Previsualización del documento"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>,
  ];

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column",
      fontFamily:"system-ui, -apple-system, sans-serif", background:"#f9fafb" }}>

      <div style={{ height:"3px", background:"#7f1d1d", flexShrink:"0" }}>
        <div style={{ height:"100%", background:"#fca5a5",
          width:`${((tab + 1) / TABS.length) * 100}%`, transition:"width 0.3s" }} />
      </div>

      <div style={{ background:"#fff", borderBottom:"1px solid #e5e7eb",
        flexShrink:"0", overflowX:"auto" }}>
        <div style={{ display:"flex", minWidth:"max-content" }}>
          {TABS.map((t, i) => (
            <button type="button" key={i} onClick={() => setTab(i)}
              style={{ padding:"10px 12px", fontSize:"12px", fontWeight:"600",
                whiteSpace:"nowrap", border:"none", borderBottom:"2px solid",
                cursor:"pointer", transition:"all 0.15s", background:"transparent",
                borderBottomColor: tab === i ? "#B22222" : "transparent",
                color: tab === i ? "#B22222" : "#9ca3af" }}>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex:"1", overflowY:"auto", paddingBottom:"70px" }}>
        <div style={{ maxWidth:"1000px", margin:"0 auto", padding:"20px 16px" }}>
          {panels[tab]}
        </div>
      </div>

      <div style={{ position:"sticky", bottom:"0", background:"#fff",
        borderTop:"1px solid #e5e7eb", padding:"10px 16px", zIndex:"10" }}>
        <div style={{ maxWidth:"1000px", margin:"0 auto",
          display:"flex", alignItems:"center", justifyContent:"space-between", gap:"12px" }}>
          <button type="button" onClick={() => setTab(t => Math.max(0, t - 1))} disabled={tab === 0}
            style={{ padding:"8px 16px", fontSize:"13px", border:"1.5px solid #e5e7eb",
              borderRadius:"6px", background:"#fff", color: tab === 0 ? "#d1d5db" : "#6b7280",
              cursor: tab === 0 ? "not-allowed" : "pointer", whiteSpace:"nowrap" }}>
            ← Anterior
          </button>
          <button type="button" onClick={generate}
            style={{ flex:"1", maxWidth:"240px", padding:"10px", background:"#B22222",
              color:"#fff", fontSize:"13px", fontWeight:"700", border:"none",
              borderRadius:"6px", cursor:"pointer" }}>
            ⚡ Generar HTML
          </button>
          <button type="button" onClick={() => setTab(t => Math.min(TABS.length - 1, t + 1))}
            disabled={tab === TABS.length - 1}
            style={{ padding:"8px 16px", fontSize:"13px", border:"1.5px solid #e5e7eb",
              borderRadius:"6px", background:"#fff",
              color: tab === TABS.length - 1 ? "#d1d5db" : "#6b7280",
              cursor: tab === TABS.length - 1 ? "not-allowed" : "pointer", whiteSpace:"nowrap" }}>
            Siguiente →
          </button>
          <button type="button" onClick={resetAll}
            style={{ padding:"8px 14px", fontSize:"12px", fontWeight:"700", border:"1.5px solid #fca5a5",
              borderRadius:"6px", background:"#fff", color:"#B22222", cursor:"pointer", whiteSpace:"nowrap" }}>
            🗑 Borrar todo
          </button>
        </div>
      </div>

    </div>
  );
}

/* ─── MOUNT ─────────────────────────────────────────────────── */
(function mountGenerador() {
  function init() {
    const el = document.getElementById('maniobras-root');
    if (!el) return;
    const root = ReactDOM.createRoot(el);
    root.render(<GeneradorManiobras />);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
