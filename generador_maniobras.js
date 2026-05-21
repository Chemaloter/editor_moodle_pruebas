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
  if (g === "Notable") return "display:inline-block;padding:3px 9px;border-radius:999px;font-size:11px;font-weight:800;background:#fff7ed;color:#9a3412;border:1px solid #fed7aa;";
  if (g === "Moderado") return "display:inline-block;padding:3px 9px;border-radius:999px;font-size:11px;font-weight:800;background:#fffbeb;color:#92400e;border:1px solid #fde68a;";
  return "display:inline-block;padding:3px 9px;border-radius:999px;font-size:11px;font-weight:800;background:#f0fdf4;color:#166534;border:1px solid #bbf7d0;";
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
  const red = "#C0272D";
  const redDark = "#9b1e23";
  const textColor = "#1f2937";
  const muted = "#6b7280";
  const border = "#e4e7ec";
  const contentMax = "800px";
  const mediaMax = "1000px";

  const pageStyle = `font-family:${fontStack};font-size:16px;line-height:1.8;color:${textColor};background:transparent;width:100%;max-width:none;margin:0 auto;box-sizing:border-box;`;
  const mediaWrapStyle = `max-width:${mediaMax};width:100%;margin:18px auto;box-sizing:border-box;`;
  const sectionStyle = `max-width:${contentMax};width:100%;margin:22px auto;padding:20px 22px;background:#ffffff;border:1px solid ${border};border-left:6px solid ${red};border-radius:14px;box-sizing:border-box;box-shadow:0 3px 12px rgba(15,23,42,.05);`;
  const h2Style = `font-family:${fontStack};font-size:21px;line-height:1.25;font-weight:800;color:${redDark};margin:0 0 14px 0;`;
  const h3Style = `font-family:${fontStack};font-size:17px;line-height:1.35;font-weight:800;color:#374151;margin:18px 0 8px 0;`;
  const pStyle = `margin:0 0 12px 0;line-height:1.8;color:${textColor};`;
  const smallPStyle = `margin:0 0 10px 0;line-height:1.65;color:${muted};font-size:14px;`;
  const listStyle = `margin:8px 0 14px 0;padding-left:24px;line-height:1.75;color:${textColor};`;
  const liStyle = `margin:0 0 7px 0;line-height:1.75;`;
  const tableWrapStyle = `max-width:${mediaMax};width:100%;margin:18px auto;overflow-x:auto;-webkit-overflow-scrolling:touch;box-sizing:border-box;`;
  const tableStyle = `width:100%;border-collapse:separate;border-spacing:0;border:1px solid ${border};border-radius:12px;overflow:hidden;background:#fff;box-sizing:border-box;`;
  const thStyle = `background:#fff7f7;color:${redDark};font-weight:800;font-size:13px;text-align:left;padding:10px 12px;border-bottom:1px solid ${border};`;
  const tdStyle = `padding:10px 12px;border-bottom:1px solid ${border};vertical-align:top;font-size:14px;line-height:1.65;color:${textColor};`;

  const nl2br = (s) => mEsc(s).replace(/\r?\n/g, "<br>");
  const paragraph = (txt, extraStyle) => txt && String(txt).trim() ? `<p style="${extraStyle || pStyle}">${nl2br(txt)}</p>` : "";
  const listItems = (arr) => (arr || []).filter(x => String(x || "").trim()).map(x => `<li style="${liStyle}">${nl2br(x)}</li>`).join("");
  const listBlock = (arr) => { const items = listItems(arr); return items ? `<ul style="${listStyle}">${items}</ul>` : ""; };
  const subsection = (title, body) => body ? `<h4 style="${h3Style}">${mEsc(title)}</h4>${body}` : "";
  const section = (num, title, body) => body ? `<div style="${sectionStyle}"><div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;"><span style="display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:30px;border-radius:9px;background:${red};color:#fff;font-weight:800;font-size:14px;">${mEsc(num)}</span><h3 style="${h2Style}">${mEsc(title)}</h3></div>${body}</div>` : "";

  const renderImageSafe = (item) => {
    const src = typeof item === "string" ? item.trim() : item && item.mode === "file" ? item.src : ((item && item.url) || "").trim();
    if (!src) return "";
    return `<div style="${mediaWrapStyle}"><img src="${mEsc(src)}" alt="Recurso visual" style="display:block;width:100%;max-width:100%;height:auto;border-radius:12px;border:1px solid ${border};box-sizing:border-box;" /></div>`;
  };
  const renderImages = (arr) => (arr || []).filter(img => typeof img === "string" ? img.trim() : img && (img.mode === "file" ? img.src : (img.url || "").trim())).map(renderImageSafe).join("\n");
  const renderVideos = (arr) => (arr || []).filter(v => String(v || "").trim()).map(v => `<div style="${mediaWrapStyle}">${embedVideoUrl(v)}</div>`).join("\n");

  const validItCodes = (d.itCodes || []).filter(c => String(c || "").trim());
  const codesHtml = validItCodes.length ? `<div style="margin-top:10px;">${validItCodes.map(c => `<span style="display:inline-block;margin:3px 5px 0 0;padding:4px 9px;border-radius:999px;background:#fff;border:1px solid rgba(255,255,255,.45);color:#fff;font-size:12px;font-weight:700;">${mEsc(c)}</span>`).join("")}</div>` : "";

  const recursosBody = [
    subsection("EPI's", listBlock(d.epis)),
    subsection("Materiales y herramientas", listBlock(d.materiales)),
    listBlock(d.materialAdicional || []) ? subsection("Material adicional", listBlock(d.materialAdicional || [])) : "",
    renderImages(d.recursosImagenes),
    renderVideos(d.recursosVideos)
  ].join("\n");

  const stepRows = (d.pasos || []).filter(p => String(p || "").trim()).map((p, i) => `<tr><td style="${tdStyle}width:54px;text-align:center;"><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:8px;background:${red};color:#fff;font-weight:800;">${i + 1}</span></td><td style="${tdStyle}">${nl2br(p)}</td></tr>`).join("");
  const stepsHtml = stepRows ? `<div style="${tableWrapStyle}"><table style="${tableStyle}"><tbody>${stepRows}</tbody></table></div>` : "";
  const riskRows = (d.riesgos || []).map(r => `<tr><td style="${tdStyle}">${nl2br(r.riesgo)}</td><td style="${tdStyle}">${nl2br(r.causa)}</td><td style="${tdStyle}"><span style="${badgeStyle(r.grado)}">${mEsc(r.grado)}</span></td><td style="${tdStyle}">${nl2br(r.medida)}</td></tr>`).join("");

  const recordadBlock = d.recordad && d.recordad.trim() ? `<div style="margin:14px 0 0 0;padding:12px 14px;border-radius:12px;background:#fff7ed;border:1px solid #fed7aa;border-left:5px solid #f97316;color:#713f12;"><strong>Recordad:</strong> ${nl2br(d.recordad)}</div>` : "";
  const planSosBody = `<div style="padding:14px 16px;border-radius:12px;background:#fff7f7;border:1px solid #f0d6d6;border-left:5px solid ${red};">${paragraph(d.planSOS.senal, `margin:0 0 10px 0;line-height:1.7;color:${redDark};font-weight:800;`)}${paragraph(d.planSOS.intro1)}${paragraph(d.planSOS.intro2)}${subsection(d.planSOS.leveTitulo, listBlock(d.planSOS.leveItems))}${subsection(d.planSOS.graveTitulo, listBlock(d.planSOS.graveItems))}${paragraph(d.planSOS.cierre)}</div>`;

  let evaluacionHtml = "";
  if (d.evaluacion.mostrar) {
    evaluacionHtml = section("II", "Anexo II — Criterios de evaluación", `${paragraph("Durante las maniobras se realizarán rúbricas de evaluación divididas en tres bloques diferenciados.")}${subsection("Bloque 1 — Críticos", paragraph("Será necesario cumplirlos todos para poder dar por apta la maniobra; aseguran el aprobado.") + (listBlock(d.evaluacion.criticos) || listBlock(["Sin ítems definidos"])))}${subsection("Bloque 2 — Técnicos", paragraph("Estos ítems permiten alcanzar la máxima calificación técnica.") + (listBlock(d.evaluacion.tecnicos) || listBlock(["Sin ítems definidos"])))}${subsection("Bloque 3 — Actitudinales", paragraph("Estos ítems no suman, pero sí pueden restar.") + (listBlock(d.evaluacion.actitudinales) || listBlock(["Sin ítems definidos"])))}`);
  }

  return `<div style="${pageStyle}"><div style="max-width:${mediaMax};width:100%;margin:0 auto 26px auto;background:${red};border-radius:16px;overflow:hidden;box-shadow:0 8px 22px rgba(192,39,45,.18);box-sizing:border-box;"><div style="padding:18px 22px;color:#fff;box-sizing:border-box;"><div style="display:inline-block;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.32);border-radius:999px;padding:4px 10px;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;">CBCM · Práctica</div><h2 style="font-family:${fontStack};font-size:25px;line-height:1.25;font-weight:800;margin:12px 0 4px 0;color:#fff;">${mEsc(d.titulo || "Maniobra de parque")}</h2>${d.subtitulo ? `<p style="margin:0;color:rgba(255,255,255,.86);font-size:15px;line-height:1.55;">${nl2br(d.subtitulo)}</p>` : ""}${codesHtml}</div></div>${section("1", "Descripción", paragraph(d.descripcion))}${section("2", "Objetivo pedagógico", paragraph(d.objetivo))}${section("3", "Destinatarios", paragraph(d.destinatarios))}${section("4", "Escenario", `${paragraph(d.escenario)}${renderImages(d.escenarioImagenes || [])}`)}${section("5", "Recursos", recursosBody)}${section("6", "Organización del grupo", `${paragraph(d.organizacion)}${subsection("Rol del " + (d.rolMandoTitulo || "responsable"), listBlock(d.rolesJT || []))}`)}${section("7", "Desarrollo explicativo de la práctica", `${paragraph("Documentación de referencia: " + (d.refDoc || ""), smallPStyle)}${d.aspectosGenerales && d.aspectosGenerales.trim() ? subsection("Aspectos generales", paragraph(d.aspectosGenerales)) : ""}${d.desarrolloManiobra && d.desarrolloManiobra.trim() ? subsection("Desarrollo de la maniobra", paragraph(d.desarrolloManiobra)) : ""}${d.escenarioDesarrollo && d.escenarioDesarrollo.trim() ? subsection("Escenario", paragraph(d.escenarioDesarrollo)) : ""}${renderImages(d.desarrolloImagenes || [])}${renderVideos(d.videos || [])}${subsection("Explicación secuencial de la maniobra", stepsHtml)}${subsection("Precauciones", paragraph(d.precauciones) + recordadBlock)}`)}<div style="${sectionStyle}"><div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;"><span style="display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:30px;border-radius:9px;background:${red};color:#fff;font-weight:800;font-size:14px;">8</span><h3 style="${h2Style}">Evaluación de riesgos de la maniobra</h3></div><div style="${tableWrapStyle}"><table style="${tableStyle}"><thead><tr><th style="${thStyle}">Riesgo</th><th style="${thStyle}">Causa</th><th style="${thStyle}">Grado</th><th style="${thStyle}">Medida preventiva</th></tr></thead><tbody>${riskRows}</tbody></table></div></div>${section("I", "Anexo I — Plan SOS", planSosBody)}${evaluacionHtml}<div style="max-width:${mediaMax};width:100%;margin:26px auto 0 auto;border-top:1px solid ${border};padding-top:12px;color:${muted};font-size:12px;line-height:1.55;box-sizing:border-box;"><table style="width:100%;border-collapse:collapse;"><tbody><tr><td style="vertical-align:top;padding:4px 8px 4px 0;width:140px;"><strong>Revisión ${mEsc(d.revision)}</strong></td><td style="vertical-align:top;padding:4px 8px;">${nl2br(d.pieTexto)}</td><td style="vertical-align:top;padding:4px 0 4px 8px;text-align:right;width:90px;">Pág. 1 de 1</td></tr></tbody></table></div></div>`;
}

/* ─── UI COMPONENTS ─── */
const UI = { red:"#C0272D", redDark:"#9b1e23", redSoft:"rgba(192,39,45,.08)", surface:"#ffffff", panel:"#f7f8fa", border:"#d9dee7", text:"#111827", muted:"#6b7280", sub:"#9ca3af", font:"'Montserrat','Segoe UI',Roboto,Helvetica,Arial,sans-serif" };
const uiInput = { width:"100%", border:"1.5px solid #d9dee7", borderRadius:"10px", background:"#fff", padding:"9px 12px", fontSize:"13px", color:UI.text, outline:"none", fontFamily:"inherit", boxSizing:"border-box", transition:"border-color .15s, box-shadow .15s" };
const uiBtnSecondary = { padding:"8px 14px", fontSize:"12px", fontWeight:"750", border:"1.5px solid #d9dee7", borderRadius:"10px", background:"#fff", color:UI.muted, cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit", transition:"all .15s" };
const uiBtnPrimary = { padding:"10px 18px", background:UI.red, color:"#fff", fontSize:"13px", fontWeight:"800", border:"none", borderRadius:"10px", cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit", boxShadow:"0 3px 10px rgba(192,39,45,.22)", transition:"all .15s" };
const TABS = [
  { label: "1 · Cabecera", short: "Cab." }, { label: "2 · Info General", short: "Info" }, { label: "3 · Recursos", short: "Rec." }, { label: "4 · Organización", short: "Org." }, { label: "5 · Desarrollo", short: "Des." }, { label: "6 · Riesgos", short: "Rie." }, { label: "7 · Plan SOS", short: "SOS" }, { label: "8 · Evaluación", short: "Eva." }, { label: "9 · Pie", short: "Pie" }, { label: "⚡ Generar", short: "⚡" },
];
const SectionTitle = ({ children }) => (<h2 style={{ fontSize:"18px", fontWeight:"800", color:UI.redDark, marginBottom:"5px", marginTop:"0", letterSpacing:".01em" }}>{children}</h2>);
const Hint = ({ children }) => (<p style={{ fontSize:"13px", color:UI.muted, marginBottom:"18px", marginTop:"0", lineHeight:"1.55" }}>{children}</p>);
const Label = ({ children, required, style }) => (<label style={{ display:"block", fontSize:"11px", fontWeight:"800", color:UI.redDark, textTransform:"uppercase", letterSpacing:"0.11em", marginBottom:"6px", ...style }}>{children}{required && <span style={{ color:UI.red, marginLeft:"2px" }}>*</span>}</label>);
const Inp = ({ value, onChange, placeholder }) => (<input style={uiInput} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} onFocus={e => { e.target.style.borderColor = UI.red; e.target.style.boxShadow = "0 0 0 3px rgba(192,39,45,.08)"; }} onBlur={e => { e.target.style.borderColor = UI.border; e.target.style.boxShadow = "none"; }} />);
const Txt = ({ value, onChange, placeholder, rows = 3 }) => (<textarea style={{ ...uiInput, resize:"vertical", minHeight:"74px", lineHeight:"1.55" }} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} onFocus={e => { e.target.style.borderColor = UI.red; e.target.style.boxShadow = "0 0 0 3px rgba(192,39,45,.08)"; }} onBlur={e => { e.target.style.borderColor = UI.border; e.target.style.boxShadow = "none"; }} />);
const AddBtn = ({ onClick, label }) => (<button type="button" onClick={onClick} style={{ marginTop:"9px", fontSize:"12px", fontWeight:"800", color:UI.redDark, border:"1.5px solid #efd3d5", borderLeft:`5px solid ${UI.red}`, borderRadius:"10px", padding:"7px 12px", background:"#fff", cursor:"pointer", fontFamily:"inherit" }}>{label}</button>);
const RemBtn = ({ onClick }) => (<button type="button" onClick={onClick} title="Eliminar" aria-label="Eliminar" style={{ marginLeft:"8px", width:"28px", height:"28px", flexShrink:"0", display:"flex", alignItems:"center", justifyContent:"center", color:"#9ca3af", background:"#fff", border:"1px solid #e4e7ec", borderRadius:"9px", fontSize:"18px", lineHeight:"1", cursor:"pointer", transition:"all .15s" }}>×</button>);
const Divider = () => (<div style={{ borderTop:"1px solid #eef0f3", margin:"22px 0" }} />);

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
                        borderRadius:"9px", cursor:"pointer",
                        borderColor: img.mode === mode ? "#C0272D" : "#e5e7eb",
                        background:  img.mode === mode ? "#fff0f0" : "#f9fafb",
                        color:       img.mode === mode ? "#C0272D" : "#6b7280" }}>
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
                      style={{ marginTop:"6px", maxHeight:"70px", maxWidth:"100%", borderRadius:"9px", display:"block" }} />
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
                        borderRadius:"9px", cursor:"pointer",
                        borderColor: img.mode === mode ? "#C0272D" : "#e5e7eb",
                        background:  img.mode === mode ? "#fff0f0" : "#f9fafb",
                        color:       img.mode === mode ? "#C0272D" : "#6b7280" }}>
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
                      style={{ marginTop:"6px", maxHeight:"70px", maxWidth:"100%", borderRadius:"9px", display:"block" }} />
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
                style={{ marginRight:"8px", accentColor:UI.red }}
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
                borderRadius:"9px", background:"#f3f4f6", border:"1px solid #d1d5db", 
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
                        borderRadius:"9px", cursor:"pointer",
                        borderColor: img.mode === mode ? "#C0272D" : "#e5e7eb",
                        background:  img.mode === mode ? "#fff0f0" : "#f9fafb",
                        color:       img.mode === mode ? "#C0272D" : "#6b7280" }}>
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
                      style={{ marginTop:"6px", maxHeight:"70px", maxWidth:"100%", borderRadius:"9px", display:"block" }} />
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
                borderRadius:"50%", background:"#C0272D", color:"#fff",
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
          style={{ accentColor: UI.red, width:"16px", height:"16px", cursor:"pointer" }} 
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
                background: inserted ? "#16a34a" : "#C0272D",
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
    <div style={{ height:"100%", display:"flex", flexDirection:"column", fontFamily:UI.font, background:"linear-gradient(180deg,#f3f4f6 0%,#eef0f3 100%)", color:UI.text }}>
      <div style={{ height:"4px", background:"#f1d5d7", flexShrink:"0" }}><div style={{ height:"100%", background:UI.red, width:`${((tab + 1) / TABS.length) * 100}%`, transition:"width 0.25s ease" }} /></div>
      <div style={{ background:"#fff", borderBottom:"1px solid #dfe3ea", flexShrink:"0", overflowX:"auto", padding:"10px 12px" }}>
        <div style={{ display:"flex", minWidth:"max-content", gap:"7px" }}>
          {TABS.map((t, i) => (<button type="button" key={i} onClick={() => setTab(i)} aria-current={tab === i ? "step" : undefined} style={{ padding:"8px 11px", fontSize:"12px", fontWeight:"800", whiteSpace:"nowrap", border:"1.5px solid", borderRadius:"999px", cursor:"pointer", transition:"all 0.15s", fontFamily:"inherit", background: tab === i ? UI.redSoft : "#fff", borderColor: tab === i ? "#efd3d5" : UI.border, color: tab === i ? UI.redDark : UI.muted, boxShadow: tab === i ? "0 2px 8px rgba(192,39,45,.08)" : "none" }}><span>{t.label}</span></button>))}
        </div>
      </div>
      <div style={{ flex:"1", overflowY:"auto", paddingBottom:"78px" }}><div style={{ maxWidth:"980px", margin:"0 auto", padding:"20px 16px" }}><div style={{ background:"#fff", border:"1px solid #d9dee7", borderRadius:"16px", padding:"20px", boxShadow:"0 10px 28px rgba(15,23,42,.07)" }}>{panels[tab]}</div></div></div>
      <div style={{ position:"sticky", bottom:"0", background:"rgba(255,255,255,.96)", borderTop:"1px solid #dfe3ea", padding:"10px 16px", zIndex:"10", boxShadow:"0 -8px 20px rgba(15,23,42,.06)" }}>
        <div style={{ maxWidth:"980px", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"10px", flexWrap:"wrap" }}>
          <button type="button" onClick={() => setTab(t => Math.max(0, t - 1))} disabled={tab === 0} style={{ ...uiBtnSecondary, color: tab === 0 ? "#c9cfd8" : UI.muted, cursor: tab === 0 ? "not-allowed" : "pointer", opacity: tab === 0 ? .65 : 1 }}>← Anterior</button>
          <button type="button" onClick={generate} style={{ ...uiBtnPrimary, flex:"1", maxWidth:"260px" }}>⚡ Generar HTML</button>
          <button type="button" onClick={() => setTab(t => Math.min(TABS.length - 1, t + 1))} disabled={tab === TABS.length - 1} style={{ ...uiBtnSecondary, color: tab === TABS.length - 1 ? "#c9cfd8" : UI.muted, cursor: tab === TABS.length - 1 ? "not-allowed" : "pointer", opacity: tab === TABS.length - 1 ? .65 : 1 }}>Siguiente →</button>
          <button type="button" onClick={resetAll} style={{ ...uiBtnSecondary, borderColor:"#efd3d5", color:UI.redDark }}>🗑 Borrar todo</button>
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
