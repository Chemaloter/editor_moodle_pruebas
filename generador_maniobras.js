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

/* Función para embeber vídeos de forma responsiva */
function embedVideoUrl(url) {
  if (!url || !url.trim()) return "";
  let src = url.trim();
  
  if (src.includes("youtube.com/watch")) {
    const urlParams = new URLSearchParams(src.split("?")[1]);
    src = "https://www.youtube.com/embed/" + urlParams.get("v");
  } else if (src.includes("youtu.be/")) {
    src = "https://www.youtube.com/embed/" + src.split("youtu.be/")[1].split("?")[0];
  } else if (src.includes("vimeo.com/")) {
    src = "https://player.vimeo.com/video/" + src.split("vimeo.com/")[1].split("?")[0];
  }

  if (src.match(/\.(mp4|webm|ogg)$/i)) {
    return `<div style="margin-bottom:14px;overflow-x:auto;"><video style="width:100%;max-width:100%;border-radius:4px;" controls><source src="${mEsc(src)}" type="video/mp4">Tu navegador no soporta vídeo.</video></div>`;
  }
  return `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;border-radius:4px;margin-bottom:14px;"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;" src="${mEsc(src)}" allowfullscreen></iframe></div>`;
}

function renderImage(item) {
  // Acepta tanto string (legacy) como objeto {mode, url, src, name}
  const src = typeof item === "string" ? item.trim()
    : item.mode === "file" ? item.src : (item.url || "").trim();
  if (!src) return "";
  return `<div style="margin-bottom:14px;overflow-x:auto;"><img src="${item.mode === "file" ? src : mEsc(src)}" style="max-width:100%;height:auto;border-radius:4px;display:block;" alt="Recurso visual" /></div>`;
}

/* ─── HTML GENERATOR ────────────────────────────────────────── */
function generateHTML(d) {
  const epiItems = d.epis.filter(e => e.trim())
    .map(e => `<li style="margin-bottom:4px;">${mEsc(e)}</li>`).join("\n              ");

  const matItems = d.materiales.filter(m => m.trim())
    .map(m => `<li style="margin-bottom:4px;">${mEsc(m)}</li>`).join("\n              ");

  const recImagenesHtml = d.recursosImagenes.filter(img => {
    if (typeof img === "string") return img.trim();
    return img.mode === "file" ? img.src : img.url.trim();
  }).map(img => renderImage(img)).join("\n");
  const recVideosHtml = d.recursosVideos.filter(vid => vid.trim()).map(vid => embedVideoUrl(vid)).join("\n");

  const stepRows = d.pasos.filter(p => p.trim()).map((p, i) => `
      <table style="width:100%;border-collapse:collapse;margin-bottom:8px;" cellpadding="0" cellspacing="0">
        <tr>
          <td style="width:36px;vertical-align:top;padding-right:10px;">
            <div style="background:#B22222;color:#ffffff;font-weight:bold;font-size:13px;width:28px;height:28px;border-radius:50%;text-align:center;line-height:28px;">${i + 1}</div>
          </td>
          <td style="vertical-align:top;background:#ffffff;border:1px solid #e0e0e0;border-radius:3px;padding:8px 12px;">${mEsc(p)}</td>
        </tr>
      </table>`).join("");

  const riskRows = d.riesgos.map((r, i) => `
          <tr${i % 2 === 1 ? ' style="background:#fdf5f5;"' : ""}>
            <td style="border:1px solid #ddd;padding:7px 10px;vertical-align:top;">${mEsc(r.riesgo)}</td>
            <td style="border:1px solid #ddd;padding:7px 10px;vertical-align:top;">${mEsc(r.causa)}</td>
            <td style="border:1px solid #ddd;padding:7px 10px;vertical-align:top;text-align:center;"><span style="${badgeStyle(r.grado)}">${r.grado}</span></td>
            <td style="border:1px solid #ddd;padding:7px 10px;vertical-align:top;">${mEsc(r.medida)}</td>
          </tr>`).join("");

  const desImagenesHtml = d.desarrolloImagenes.filter(img => {
    if (typeof img === "string") return img.trim();
    return img.mode === "file" ? img.src : img.url.trim();
  }).map(img => renderImage(img)).join("\n");
  const desVideosHtml = d.videos.filter(vid => vid.trim()).map(vid => embedVideoUrl(vid)).join("\n");

  const recordadBlock = d.recordad.trim()
    ? `        <p style="margin:8px 0 0 0;"><strong>Recordad:</strong> ${mEsc(d.recordad)}</p>\n`
    : "";

  const planSosLeveItems = d.planSOS.leveItems.filter(i => i.trim()).map(i => `<li style="margin-bottom:4px;">${mEsc(i)}</li>`).join("");
  const planSosGraveItems = d.planSOS.graveItems.filter(i => i.trim()).map(i => `<li style="margin-bottom:4px;">${mEsc(i)}</li>`).join("");

  return `<!-- MANIOBRA DE PARQUE - CBCM -->
<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1a1a1a;max-width:860px;margin:0 auto;box-sizing:border-box;">

  <table style="width:100%;border-collapse:collapse;overflow:hidden;background-color:#B22222;color:#ffffff;" cellpadding="0" cellspacing="0">
    <tr>
      <td style="width:60px;background-color:#7a1515;text-align:center;vertical-align:middle;padding:14px 8px;font-size:13px;font-weight:bold;color:#ffffff;">CBCM</td>
      <td style="padding:12px 16px;vertical-align:middle;">
        <div style="font-size:16px;font-weight:bold;text-transform:uppercase;letter-spacing:0.5px;">PR&Aacute;CTICA: ${mEsc(d.titulo)}</div>
        <div style="font-size:12px;margin-top:4px;opacity:0.85;">${mEsc(d.subtitulo)}</div>
      </td>
      ${d.mostrarIT ? `
<td style="width:130px;background-color:#7a1515;text-align:center;vertical-align:middle;padding:12px 10px;font-size:11px;color:#ffffff;">
  INSTRUCCI&Oacute;N T&Eacute;CNICA<br>
  <span style="font-weight:bold;font-size:13px;letter-spacing:1px;">${mEsc(d.itCode)}</span>
</td>
` : ""}
    </tr>
  </table>

  <div style="margin-top:18px;border-left:4px solid #B22222;padding-left:12px;">
    <div style="font-size:12px;font-weight:bold;text-transform:uppercase;color:#B22222;letter-spacing:0.8px;margin-bottom:8px;">1. Descripci&oacute;n</div>
    <div style="background:#fafafa;border:1px solid #e0e0e0;border-radius:3px;padding:12px 14px;">${mEsc(d.descripcion)}</div>
  </div>

  <div style="margin-top:18px;border-left:4px solid #B22222;padding-left:12px;">
    <div style="font-size:12px;font-weight:bold;text-transform:uppercase;color:#B22222;letter-spacing:0.8px;margin-bottom:8px;">2. Objetivo Pedag&oacute;gico</div>
    <div style="background:#fafafa;border:1px solid #e0e0e0;border-radius:3px;padding:12px 14px;">${mEsc(d.objetivo)}</div>
  </div>

  <div style="margin-top:18px;border-left:4px solid #B22222;padding-left:12px;">
    <div style="font-size:12px;font-weight:bold;text-transform:uppercase;color:#B22222;letter-spacing:0.8px;margin-bottom:8px;">3. Destinatarios</div>
    <div style="background:#fafafa;border:1px solid #e0e0e0;border-radius:3px;padding:12px 14px;">${mEsc(d.destinatarios)}</div>
  </div>

  <div style="margin-top:18px;border-left:4px solid #B22222;padding-left:12px;">
    <div style="font-size:12px;font-weight:bold;text-transform:uppercase;color:#B22222;letter-spacing:0.8px;margin-bottom:8px;">4. Escenario</div>
    <div style="background:#fafafa;border:1px solid #e0e0e0;border-radius:3px;padding:12px 14px;">${mEsc(d.escenario)}</div>
  </div>

  <div style="margin-top:18px;border-left:4px solid #B22222;padding-left:12px;">
    <div style="font-size:12px;font-weight:bold;text-transform:uppercase;color:#B22222;letter-spacing:0.8px;margin-bottom:8px;">5. Recursos</div>
    <div style="background:#fafafa;border:1px solid #e0e0e0;border-radius:3px;padding:12px 14px;">
      <div style="background:#fff3f3;border:1px solid #f0c0c0;border-radius:3px;padding:10px 14px;margin-bottom:10px;">
        <div style="font-weight:bold;color:#8b0000;font-size:12px;text-transform:uppercase;margin-bottom:6px;">EPI&apos;s</div>
        <ul style="margin:0;padding-left:20px;">${epiItems}</ul>
      </div>
      <div style="background:#fff3f3;border:1px solid #f0c0c0;border-radius:3px;padding:10px 14px;margin-bottom:10px;">
        <div style="font-weight:bold;color:#8b0000;font-size:12px;text-transform:uppercase;margin-bottom:6px;">Materiales y Herramientas</div>
        <ul style="margin:0;padding-left:20px;">${matItems}</ul>
      </div>
${recImagenesHtml}${recVideosHtml}    </div>
  </div>

  <div style="margin-top:18px;border-left:4px solid #B22222;padding-left:12px;">
    <div style="font-size:12px;font-weight:bold;text-transform:uppercase;color:#B22222;letter-spacing:0.8px;margin-bottom:8px;">6. Organizaci&oacute;n del Grupo</div>
    <div style="background:#fafafa;border:1px solid #e0e0e0;border-radius:3px;padding:12px 14px;">
      <div style="background:#fff8e1;border:1px solid #ffe082;border-radius:3px;padding:10px 14px;margin-bottom:12px;">${mEsc(d.organizacion)}</div>
      <p style="margin:0 0 6px 0;"><strong>Rol del Jefe de Turno:</strong></p>
      <ul style="margin:0;padding-left:20px;">
        <li style="margin-bottom:6px;">${mEsc(d.jt1)}</li>
        <li>${mEsc(d.jt2)}</li>
      </ul>
    </div>
  </div>

  <div style="margin-top:18px;border-left:4px solid #B22222;padding-left:12px;">
    <div style="font-size:12px;font-weight:bold;text-transform:uppercase;color:#B22222;letter-spacing:0.8px;margin-bottom:8px;">7. Desarrollo Explicativo de la Pr&aacute;ctica</div>
    <div style="background:#fafafa;border:1px solid #e0e0e0;border-radius:3px;padding:12px 14px;">
      <p style="margin:0 0 10px 0;"><strong>Documentaci&oacute;n de referencia:</strong> ${mEsc(d.refDoc)}</p>
${desImagenesHtml}${desVideosHtml}      <p style="margin:0 0 10px 0;"><strong>Explicaci&oacute;n secuencial de la maniobra:</strong></p>
${stepRows}
      <div style="background:#fff3cd;border-left:4px solid #ff8800;border-radius:0 3px 3px 0;padding:10px 14px;margin-top:14px;">
        <div style="font-weight:bold;color:#7a4f00;text-transform:uppercase;font-size:12px;margin-bottom:6px;">PRECAUCIONES</div>
        <p style="margin:0;">${mEsc(d.precauciones)}</p>
${recordadBlock}      </div>
    </div>
  </div>

  <div style="margin-top:18px;border-left:4px solid #B22222;padding-left:12px;">
    <div style="font-size:12px;font-weight:bold;text-transform:uppercase;color:#B22222;letter-spacing:0.8px;margin-bottom:8px;">Anexo &mdash; Plan SOS</div>
    <div style="background:#fce4ec;border:1px solid #f48fb1;border-radius:3px;padding:12px 14px;">
      <div style="background:#b71c1c;color:#ffffff;text-align:center;font-weight:bold;padding:10px;border-radius:3px;margin-bottom:12px;letter-spacing:1px;font-size:13px;">${mEsc(d.planSOS.senal)}</div>
      <p style="margin:0 0 8px 0;">${mEsc(d.planSOS.intro1)}</p>
      <p style="margin:0 0 12px 0;">${mEsc(d.planSOS.intro2)}</p>
      <div style="background:#ffffff;border:1px solid #ef9a9a;border-radius:3px;padding:10px 14px;margin-bottom:8px;">
        <div style="font-weight:bold;color:#b71c1c;text-transform:uppercase;font-size:12px;margin-bottom:6px;">${mEsc(d.planSOS.leveTitulo)}</div>
        <ul style="margin:0;padding-left:20px;">
          ${planSosLeveItems}
        </ul>
      </div>
      <div style="background:#ffffff;border:1px solid #ef9a9a;border-radius:3px;padding:10px 14px;margin-bottom:10px;">
        <div style="font-weight:bold;color:#b71c1c;text-transform:uppercase;font-size:12px;margin-bottom:6px;">${mEsc(d.planSOS.graveTitulo)}</div>
        <ul style="margin:0;padding-left:20px;">
          ${planSosGraveItems}
        </ul>
      </div>
      <p style="margin:0;font-size:12px;">${mEsc(d.planSOS.cierre)}</p>
    </div>
  </div>

  <div style="margin-top:18px;border-left:4px solid #B22222;padding-left:12px;">
    <div style="font-size:12px;font-weight:bold;text-transform:uppercase;color:#B22222;letter-spacing:0.8px;margin-bottom:8px;">8. Evaluaci&oacute;n de Riesgos de la Maniobra</div>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;font-size:12px;min-width:500px;" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th style="background:#B22222;color:#ffffff;padding:8px 10px;text-align:left;font-weight:bold;border:1px solid #921a1a;width:22%;">Riesgo</th>
            <th style="background:#B22222;color:#ffffff;padding:8px 10px;text-align:left;font-weight:bold;border:1px solid #921a1a;width:28%;">Causa</th>
            <th style="background:#B22222;color:#ffffff;padding:8px 10px;text-align:center;font-weight:bold;border:1px solid #921a1a;width:12%;">Grado</th>
            <th style="background:#B22222;color:#ffffff;padding:8px 10px;text-align:left;font-weight:bold;border:1px solid #921a1a;width:38%;">Medida Preventiva</th>
          </tr>
        </thead>
        <tbody>${riskRows}
        </tbody>
      </table>
    </div>
  </div>

  <table style="width:100%;border-collapse:collapse;margin-top:20px;border-top:2px solid #B22222;font-size:11px;color:#666;" cellpadding="6" cellspacing="0">
    <tr>
      <td style="white-space:nowrap;vertical-align:top;width:1%;">Revisi&oacute;n ${mEsc(d.revision)}</td>
      <td style="text-align:center;vertical-align:top;font-size:10px;padding:6px 12px;">Este documento es propiedad del Cuerpo de Bomberos de la Comunidad de Madrid, protegido bajo licencia <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" style="color:#B22222;">CC BY-NC-SA 4.0</a>. Se permite la copia y distribuci&oacute;n acreditando autor&iacute;a, sin fines comerciales y compartiendo bajo la misma licencia.</td>
      <td style="white-space:nowrap;vertical-align:top;width:1%;text-align:right;">P&aacute;g. 1 de 1</td>
    </tr>
  </table>

</div>`;
}

/* ─── UI COMPONENTS ─────────────────────────────────────────── */
const TABS = [
  { label: "1 · Cabecera",     short: "Cab."      },
  { label: "2 · Info General", short: "Info"      },
  { label: "3 · Recursos",     short: "Rec."      },
  { label: "4 · Organización", short: "Org."      },
  { label: "5 · Desarrollo",   short: "Des."      },
  { label: "6 · Plan SOS",     short: "SOS"       },
  { label: "7 · Riesgos",      short: "Rie."      },
  { label: "8 · Pie",          short: "Pie"       },
  { label: "⚡ Generar",       short: "⚡"        },
];

const SectionTitle = ({ children }) => (
  <h2 style={{ fontSize:"15px", fontWeight:"700", color:"#1f2937", marginBottom:"4px", marginTop:"0" }}>{children}</h2>
);
const Hint = ({ children }) => (
  <p style={{ fontSize:"12px", color:"#9ca3af", marginBottom:"20px", marginTop:"0" }}>{children}</p>
);
const Label = ({ children, required }) => (
  <label style={{ display:"block", fontSize:"11px", fontWeight:"700", color:"#6b7280",
    textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"4px" }}>
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
  <button onClick={onClick} style={{ marginTop:"8px", fontSize:"12px", fontWeight:"700",
    color:"#B22222", border:"1px solid #fca5a5", borderRadius:"6px",
    padding:"5px 12px", background:"none", cursor:"pointer" }}>
    {label}
  </button>
);
const RemBtn = ({ onClick }) => (
  <button onClick={onClick} title="Eliminar" style={{ marginLeft:"8px", width:"24px", height:"24px",
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
    titulo: "", subtitulo: "",mostrarIT: true, itCode: "",
    descripcion: "", objetivo: "", destinatarios: "", escenario: "",
    epis: ["", "", ""],
    materiales: ["", "", "", ""],
    recursosImagenes: [{ mode: "url", url: "", src: "", name: "" }],
    recursosVideos: [""],
    organizacion: "",
    jt1: "Explicará a los BX el desarrollo de la práctica, identificando los objetivos, riesgos, secuencia de acciones y el Plan SOS.",
    jt2: "Supervisará que la ejecución se ajuste a la Ficha de Prácticas y a la Evaluación de Riesgos, controlando en todo momento las condiciones de seguridad. En caso de incidente, activará el Plan SOS.",
    refDoc: "",
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
    cecop: "918 354 918",
    riesgos: [{ riesgo: "", causa: "", grado: "Notable", medida: "" }],
    revision: today,
  });

  const upd    = (k, v) => setD(p => ({ ...p, [k]: v }));
  const updArr = (k, i, v) => setD(p => { const a = [...p[k]]; a[i] = v; return { ...p, [k]: a }; });
  const addArr = (k, def = "") => setD(p => ({ ...p, [k]: [...p[k], def] }));
  const remArr = (k, i) => setD(p => ({ ...p, [k]: p[k].filter((_, j) => j !== i) }));
  
  const updRisk = (i, f, v) => setD(p => {
    const a = [...p.riesgos]; a[i] = { ...a[i], [f]: v }; return { ...p, riesgos: a };
  });

  /* ── Handlers imagen con soporte URL + archivo local ── */
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

  const generate = () => { setHtml(generateHTML(d)); setTab(8); setPreview(false); setInserted(false); };

  const resetAll = () => {
    if (!window.confirm("¿Borrar todo y empezar una maniobra nueva?")) return;
    const t = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    setD({
      titulo: "", subtitulo: "",mostrarIT: true, itCode: "",
      descripcion: "", objetivo: "", destinatarios: "", escenario: "",
      epis: ["", "", ""],
      materiales: ["", "", "", ""],
      recursosImagenes: [{ mode: "url", url: "", src: "", name: "" }],
      recursosVideos: [""],
      organizacion: "",
      jt1: "Explicará a los BX el desarrollo de la práctica, identificando los objetivos, riesgos, secuencia de acciones y el Plan SOS.",
      jt2: "Supervisará que la ejecución se ajuste a la Ficha de Prácticas y a la Evaluación de Riesgos, controlando en todo momento las condiciones de seguridad. En caso de incidente, activará el Plan SOS.",
      refDoc: "",
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
      cecop: "918 354 918",
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

  /* ── Insertar en el editor principal ── */
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
    <div style={spY}>
      <SectionTitle>Cabecera del documento</SectionTitle>
      <Hint>Identificación de la maniobra y su código de instrucción técnica.</Hint>
      <div><Label required>Título de la práctica</Label>
        <Inp value={d.titulo} onChange={v => upd("titulo", v)} placeholder="ej: BOMBEO EN SERIE DESDE HIDRANTE" /></div>
      <div><Label>Subtítulo (opcional)</Label>
        <Inp value={d.subtitulo} onChange={v => upd("subtitulo", v)} placeholder="ej: Verificación de presión de red y riesgo de cavitación" /></div>
     <div style={{ marginBottom:"10px" }}>
  <label style={{
    display:"flex",
    alignItems:"center",
    gap:"8px",
    fontSize:"14px"
  }}>
    <input
      type="checkbox"
      checked={d.mostrarIT}
      onChange={e => upd("mostrarIT", e.target.checked)}
    />

    Mostrar instrucción técnica
  </label>
</div> 
     <div><Label required>Código instrucción técnica</Label>
        <Inp value={d.itCode} onChange={v => upd("itCode", v)} placeholder="ej: IT.JUT1.102" /></div>
    </div>,

    /* 1 · Info General */
    <div style={spY}>
      <SectionTitle>Información General</SectionTitle>
      <Hint>Secciones 1 a 4 del documento generado.</Hint>
      <div><Label required>1 · Descripción</Label>
        <Txt value={d.descripcion} onChange={v => upd("descripcion", v)} rows={3}
          placeholder="Qué se monta, qué se verifica, aspectos técnicos clave..." /></div>
      <Divider />
      <div><Label required>2 · Objetivo Pedagógico</Label>
        <Txt value={d.objetivo} onChange={v => upd("objetivo", v)} rows={2}
          placeholder="ej: Comprobar ventajas e inconvenientes de un bombeo en serie desde un hidrante" /></div>
      <Divider />
      <div><Label required>3 · Destinatarios</Label>
        <Inp value={d.destinatarios} onChange={v => upd("destinatarios", v)}
          placeholder="ej: Personal operativo de guardia" /></div>
      <Divider />
      <div><Label required>4 · Escenario</Label>
        <Txt value={d.escenario} onChange={v => upd("escenario", v)} rows={2}
          placeholder="ej: La práctica se desarrollará en el hidrante de abastecimiento del parque" /></div>
    </div>,

    /* 2 · Recursos */
    <div style={spY}>
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
        <Label>Imágenes</Label>
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          {d.recursosImagenes.map((img, i) => (
            <div key={i} style={{ border:"1px solid #e5e7eb", borderRadius:"6px", padding:"10px", background:"#fff" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
                {/* toggle URL / Archivo */}
                <div style={{ display:"flex", gap:"4px" }}>
                  {["url", "file"].map(mode => (
                    <button key={mode} onClick={() => updImg("recursosImagenes", i, "mode", mode)}
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
    <div style={spY}>
      <SectionTitle>Organización del Grupo</SectionTitle>
      <Hint>Define la estructura y las funciones del personal durante la maniobra.</Hint>
      <div><Label required>Descripción general</Label>
        <Txt value={d.organizacion} onChange={v => upd("organizacion", v)} rows={4}
          placeholder="ej: Práctica para todos los componentes del turno operativo." /></div>
      
      <div style={{ background:"#f3f4f6", border:"1px solid #d1d5db", borderRadius:"6px", padding:"12px 14px" }}>
        <Label>Rol del Jefe de Turno (Editable)</Label>
        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
          <Txt value={d.jt1} onChange={v => upd("jt1", v)} rows={2} />
          <Txt value={d.jt2} onChange={v => upd("jt2", v)} rows={3} />
        </div>
      </div>
    </div>,

    /* 4 · Desarrollo */
    <div style={spY}>
      <SectionTitle>Desarrollo Explicativo</SectionTitle>
      <Hint>Referencia, multimedia, pasos secuenciales y precauciones de la maniobra.</Hint>
      <div><Label>Documentación de referencia</Label>
        <Inp value={d.refDoc} onChange={v => upd("refDoc", v)}
          placeholder="ej: 2023 Reciclaje Hidráulica y Abastecimientos" /></div>
      
      <Divider />
      <div>
        <Label>Imágenes del desarrollo</Label>
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          {d.desarrolloImagenes.map((img, i) => (
            <div key={i} style={{ border:"1px solid #e5e7eb", borderRadius:"6px", padding:"10px", background:"#fff" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
                {/* toggle URL / Archivo */}
                <div style={{ display:"flex", gap:"4px" }}>
                  {["url", "file"].map(mode => (
                    <button key={mode} onClick={() => updImg("desarrolloImagenes", i, "mode", mode)}
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

    /* 5 · Plan SOS */
    <div style={spY}>
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

    /* 6 · Riesgos */
    <div style={spY}>
      <SectionTitle>Evaluación de Riesgos</SectionTitle>
      <Hint>Añade una fila por cada riesgo identificado.</Hint>
      {d.riesgos.map((r, i) => (
        <div key={i} style={{ border:"1px solid #e5e7eb", borderRadius:"8px",
          padding:"16px", background:"#fff" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"12px" }}>
            <span style={{ fontSize:"11px", fontWeight:"700", color:"#9ca3af",
              textTransform:"uppercase", letterSpacing:"0.08em" }}>Riesgo {i + 1}</span>
            {d.riesgos.length > 1 && (
              <button onClick={() => remArr("riesgos", i)}
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

    /* 7 · Pie */
    <div style={spY}>
      <SectionTitle>Pie de Página</SectionTitle>
      <Hint>Fecha de revisión y teléfono CECOP para referencias directas.</Hint>
      <div>
        <Label required>Fecha de revisión</Label>
        <Inp value={d.revision} onChange={v => upd("revision", v)} placeholder="ej: 20260322" />
        <p style={{ fontSize:"12px", color:"#9ca3af", marginTop:"4px" }}>Formato AAAAMMDD — ej: 20260322 = 22 de marzo de 2026</p>
      </div>
      <div>
        <Label>Teléfono CECOP</Label>
        <Inp value={d.cecop} onChange={v => upd("cecop", v)} placeholder="918 354 918" />
      </div>
    </div>,

    /* 8 · Generar */
    <div style={spY}>
      <SectionTitle>HTML generado para Moodle</SectionTitle>
      <Hint>Insértalo directamente en el editor, o copia el código y pégalo en el editor HTML de Moodle.</Hint>
      {!html ? (
        <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:"6px",
          padding:"20px", fontSize:"13px", color:"#92400e", textAlign:"center" }}>
          <div style={{ fontSize:"24px", marginBottom:"8px" }}>⚡</div>
          Pulsa el botón <strong>⚡ Generar HTML</strong> de la barra inferior para crear el documento.
        </div>
      ) : (
        <div style={spY}>
          {/* Botones de acción */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
            <button onClick={insertInEditor}
              style={{ padding:"10px 20px", borderRadius:"6px", fontSize:"13px",
                fontWeight:"700", border:"none", cursor:"pointer",
                background: inserted ? "#16a34a" : "#B22222",
                color:"#fff", transition:"background 0.2s" }}>
              {inserted ? "✓ ¡Insertado en el editor!" : "⬆️ Insertar en el editor"}
            </button>
            <button onClick={copy}
              style={{ padding:"10px 20px", borderRadius:"6px", fontSize:"13px",
                fontWeight:"700", border:"none", cursor:"pointer",
                background: copied ? "#16a34a" : "#374151",
                color:"#fff", transition:"background 0.2s" }}>
              {copied ? "✓ ¡Copiado!" : "📋 Copiar al portapapeles"}
            </button>
            <button onClick={() => setPreview(p => !p)}
              style={{ padding:"10px 20px", borderRadius:"6px", fontSize:"13px",
                fontWeight:"600", border:"1.5px solid #e5e7eb", cursor:"pointer",
                background:"#fff", color:"#374151" }}>
              {preview ? "Ocultar previsualización" : "👁️ Ver previsualización"}
            </button>
          </div>

          {/* Código HTML */}
          <textarea readOnly value={html} rows={14}
            style={{ width:"100%", border:"1px solid #374151", borderRadius:"6px",
              background:"#111827", color:"#86efac", fontSize:"12px",
              fontFamily:"monospace", padding:"12px 14px", outline:"none",
              resize:"vertical", boxSizing:"border-box" }} />

          {/* Preview */}
          {preview && (
            <div>
              <div style={{ fontSize:"11px", fontWeight:"700", color:"#9ca3af",
                textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"8px" }}>
                Previsualización
              </div>
              <div style={{ border:"1px solid #e5e7eb", borderRadius:"6px", overflow:"hidden" }}>
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

  /* ── RENDER ── */
  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column",
      fontFamily:"system-ui, -apple-system, sans-serif", background:"#f9fafb" }}>

      {/* Progress bar */}
      <div style={{ height:"3px", background:"#7f1d1d", flexShrink:"0" }}>
        <div style={{ height:"100%", background:"#fca5a5",
          width:`${((tab + 1) / TABS.length) * 100}%`, transition:"width 0.3s" }} />
      </div>

      {/* Tabs */}
      <div style={{ background:"#fff", borderBottom:"1px solid #e5e7eb",
        flexShrink:"0", overflowX:"auto" }}>
        <div style={{ display:"flex", minWidth:"max-content" }}>
          {TABS.map((t, i) => (
            <button key={i} onClick={() => setTab(i)}
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

      {/* Content */}
      <div style={{ flex:"1", overflowY:"auto", paddingBottom:"70px" }}>
        <div style={{ maxWidth:"720px", margin:"0 auto", padding:"20px 16px" }}>
          {panels[tab]}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ position:"sticky", bottom:"0", background:"#fff",
        borderTop:"1px solid #e5e7eb", padding:"10px 16px", zIndex:"10" }}>
        <div style={{ maxWidth:"720px", margin:"0 auto",
          display:"flex", alignItems:"center", justifyContent:"space-between", gap:"12px" }}>
          <button onClick={() => setTab(t => Math.max(0, t - 1))} disabled={tab === 0}
            style={{ padding:"8px 16px", fontSize:"13px", border:"1.5px solid #e5e7eb",
              borderRadius:"6px", background:"#fff", color: tab === 0 ? "#d1d5db" : "#6b7280",
              cursor: tab === 0 ? "not-allowed" : "pointer", whiteSpace:"nowrap" }}>
            ← Anterior
          </button>
          <button onClick={generate}
            style={{ flex:"1", maxWidth:"240px", padding:"10px", background:"#B22222",
              color:"#fff", fontSize:"13px", fontWeight:"700", border:"none",
              borderRadius:"6px", cursor:"pointer" }}>
            ⚡ Generar HTML
          </button>
          <button onClick={() => setTab(t => Math.min(TABS.length - 1, t + 1))}
            disabled={tab === TABS.length - 1}
            style={{ padding:"8px 16px", fontSize:"13px", border:"1.5px solid #e5e7eb",
              borderRadius:"6px", background:"#fff",
              color: tab === TABS.length - 1 ? "#d1d5db" : "#6b7280",
              cursor: tab === TABS.length - 1 ? "not-allowed" : "pointer", whiteSpace:"nowrap" }}>
            Siguiente →
          </button>
          <button onClick={resetAll}
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
  const el = document.getElementById('maniobras-root');
  if (!el) return;
  /* React 18 createRoot */
  const root = ReactDOM.createRoot(el);
  root.render(<GeneradorManiobras />);
})();
