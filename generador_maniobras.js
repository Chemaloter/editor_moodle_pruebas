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
    return `<div style="margin-bottom:14px;overflow-x:auto;"><video style="width:100%;max-width:100%;border-radius:4px;" controls><source src="${mEsc(src)}" type="video/mp4">Tu navegador no soporta vídeo.</video></div>`;
  }
  return `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;border-radius:4px;margin-bottom:14px;"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;" src="${mEsc(src)}" allowfullscreen></iframe></div>`;
}

function renderImage(item) {
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

  const matAdicItems = (d.materialAdicional || []).filter(m => m.trim())
    .map(m => `<li style="margin-bottom:4px;">${mEsc(m)}</li>`).join("\n              ");

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
    return img.mode === "file" ? img.src : (img.url || "").trim();
  }).map(img => renderImage(img)).join("\n");
  
  const desVideosHtml = d.videos.filter(vid => vid.trim()).map(vid => embedVideoUrl(vid)).join("\n");

  const recordadBlock = d.recordad.trim()
    ? `        <p style="margin:8px 0 0 0;"><strong>Recordad:</strong> ${mEsc(d.recordad)}</p>\n`
    : "";

  const planSosLeveItems = d.planSOS.leveItems.filter(i => i.trim()).map(i => `<li style="margin-bottom:4px;">${mEsc(i)}</li>`).join("");
  const planSosGraveItems = d.planSOS.graveItems.filter(i => i.trim()).map(i => `<li style="margin-bottom:4px;">${mEsc(i)}</li>`).join("");

  // NUEVO: Generación de Criterios de Evaluación
  let evaluacionHtml = "";
  if (d.mostrarEvaluacion) {
    const critItems = d.evaluacion.criticos.filter(i => i.trim()).map(i => `<li style="margin-bottom:4px;">${mEsc(i)}</li>`).join("");
    const tecItems = d.evaluacion.tecnicos.filter(i => i.trim()).map(i => `<li style="margin-bottom:4px;">${mEsc(i)}</li>`).join("");
    const actItems = d.evaluacion.actitudinales.filter(i => i.trim()).map(i => `<li style="margin-bottom:4px;">${mEsc(i)}</li>`).join("");

    evaluacionHtml = `
  <div style="margin-top:18px;border-left:4px solid #B22222;padding-left:12px;">
    <div style="font-size:12px;font-weight:bold;text-transform:uppercase;color:#B22222;letter-spacing:0.8px;margin-bottom:8px;">Anexo &mdash; Criterios de Evaluaci&oacute;n</div>
    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:3px;padding:12px 14px;">
      <p style="margin:0 0 12px 0; font-size:13px;">Durante las maniobras se realizar&aacute;n unas r&uacute;bricas de evaluaci&oacute;n divididas en los siguientes bloques:</p>
      
      <div style="background:#fff5f5;border:1px solid #feb2b2;border-radius:3px;padding:10px 14px;margin-bottom:10px;">
        <div style="font-weight:bold;color:#c53030;font-size:12px;text-transform:uppercase;margin-bottom:6px;">BLOQUE 1 - CR&Iacute;TICOS (Aseguran el aprobado)</div>
        <ul style="margin:0;padding-left:20px;font-size:13px;">${critItems || "<li>Sin ítems definidos.</li>"}</ul>
      </div>

      <div style="background:#f0fff4;border:1px solid #9ae6b4;border-radius:3px;padding:10px 14px;margin-bottom:10px;">
        <div style="font-weight:bold;color:#276749;font-size:12px;text-transform:uppercase;margin-bottom:6px;">BLOQUE 2 - T&Eacute;CNICOS (Hasta 10 puntos)</div>
        <ul style="margin:0;padding-left:20px;font-size:13px;">${tecItems || "<li>Sin ítems definidos.</li>"}</ul>
      </div>

      <div style="background:#fffaf0;border:1px solid #fbd38d;border-radius:3px;padding:10px 14px;">
        <div style="font-weight:bold;color:#9c4221;font-size:12px;text-transform:uppercase;margin-bottom:6px;">BLOQUE 3 - ACTITUDINALES (Restan puntuaci&oacute;n)</div>
        <ul style="margin:0;padding-left:20px;font-size:13px;">${actItems || "<li>Sin ítems definidos.</li>"}</ul>
      </div>
    </div>
  </div>`;
  }

  const validItCodes = d.itCodes.filter(c => c.trim());
  let itCodeHtml = "";
  if (validItCodes.length > 0) {
    const codesStr = validItCodes.map(c => `<div style="font-weight:bold;font-size:13px;letter-spacing:1px;margin-top:4px;">${mEsc(c)}</div>`).join("");
    itCodeHtml = `\n      <td style="width:130px;background-color:#7a1515;text-align:center;vertical-align:middle;padding:12px 10px;font-size:11px;color:#ffffff;">INSTRUCCI&Oacute;N T&Eacute;CNICA${codesStr}</td>`;
  }

  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1a1a1a;max-width:860px;margin:0 auto;box-sizing:border-box;">

  <table style="width:100%;border-collapse:collapse;overflow:hidden;background-color:#B22222;color:#ffffff;" cellpadding="0" cellspacing="0">
    <tr>
      <td style="width:60px;background-color:#7a1515;text-align:center;vertical-align:middle;padding:14px 8px;font-size:13px;font-weight:bold;color:#ffffff;">CBCM</td>
      <td style="padding:12px 16px;vertical-align:middle;">
        <div style="font-size:16px;font-weight:bold;text-transform:uppercase;letter-spacing:0.5px;">PR&Aacute;CTICA: ${mEsc(d.titulo)}</div>
        <div style="font-size:12px;margin-top:4px;opacity:0.85;">${mEsc(d.subtitulo)}</div>
      </td>${itCodeHtml}
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
    <div style="background:#fafafa;border:1px solid #e0e0e0;border-radius:3px;padding:12px 14px;">
      <div style="margin-bottom:${escImagenesHtml ? '14px' : '0'};">${mEsc(d.escenario)}</div>
${escImagenesHtml}
    </div>
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
${matAdicItems ? `      <div style="background:#fff3f3;border:1px solid #f0c0c0;border-radius:3px;padding:10px 14px;margin-bottom:10px;">
        <div style="font-weight:bold;color:#8b0000;font-size:12px;text-transform:uppercase;margin-bottom:6px;">Material Adicional</div>
        <ul style="margin:0;padding-left:20px;">${matAdicItems}</ul>
      </div>` : ""}
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

${evaluacionHtml}

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

/* ─── UI COMPONENTS ─── */
const TABS = [
  { label: "1 · Cabecera",     short: "Cab."      },
  { label: "2 · Info General", short: "Info"      },
  { label: "3 · Recursos",     short: "Rec."      },
  { label: "4 · Organización", short: "Org."      },
  { label: "5 · Desarrollo",   short: "Des."      },
  { label: "6 · Plan SOS",     short: "SOS"       },
  { label: "7 · Evaluación",   short: "Ev."       }, // NUEVA TAB
  { label: "8 · Riesgos",      short: "Rie."      },
  { label: "9 · Pie",          short: "Pie"       },
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

  const initialData = {
    titulo: "", subtitulo: "", itCodes: [""],
    descripcion: "", objetivo: "", destinatarios: "", escenario: "",
    escenarioImagenes: [],
    epis: ["", "", ""],
    materiales: ["", "", "", ""],
    materialAdicional: [""],
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
    mostrarEvaluacion: false, // <-- NUEVO
    evaluacion: { // <-- NUEVO
      criticos: [""],
      tecnicos: [""],
      actitudinales: [""]
    },
    cecop: "918 354 918",
    riesgos: [{ riesgo: "", causa: "", grado: "Notable", medida: "" }],
    revision: today,
  };

  const [d, setD] = useState(initialData);

  const upd    = (k, v) => setD(p => ({ ...p, [k]: v }));
  const updArr = (k, i, v) => setD(p => { const a = [...p[k]]; a[i] = v; return { ...p, [k]: a }; });
  const addArr = (k, def = "") => setD(p => ({ ...p, [k]: [...p[k], def] }));
  const remArr = (k, i) => setD(p => ({ ...p, [k]: p[k].filter((_, j) => j !== i) }));
  
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

  // Handlers para Evaluación (NUEVO)
  const updEvalArr = (f, i, v) => setD(p => {
    const a = [...p.evaluacion[f]]; a[i] = v;
    return { ...p, evaluacion: { ...p.evaluacion, [f]: a } };
  });
  const addEvalArr = (f) => setD(p => ({ ...p, evaluacion: { ...p.evaluacion, [f]: [...p.evaluacion[f], ""] } }));
  const remEvalArr = (f, i) => setD(p => ({ ...p, evaluacion: { ...p.evaluacion, [f]: p.evaluacion[f].filter((_, j) => j !== i) } }));

  const generate = () => { setHtml(generateHTML(d)); setTab(TABS.length - 1); setPreview(false); setInserted(false); };

  const resetAll = () => {
    if (!window.confirm("¿Borrar todo y empezar una maniobra nueva?")) return;
    setD(initialData);
    setHtml(""); setTab(0); setPreview(false); setInserted(false); setCopied(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(html).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2500);
    });
  };

  const insertInEditor = () => {
    if (typeof window.insertHTMLAtCursor === 'function') {
      window.insertHTMLAtCursor(html);
      setInserted(true);
      setTimeout(() => { if (typeof window.closeManiobrasModal === 'function') window.closeManiobrasModal(); }, 800);
    }
  };

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
        <Txt value={d.descripcion} onChange={v => upd("descripcion", v)} rows={10} placeholder="Qué se monta, qué se verifica..." /></div>
      <Divider />
      <div><Label required>2 · Objetivo Pedagógico</Label>
        <Txt value={d.objetivo} onChange={v => upd("objetivo", v)} rows={5} placeholder="ej: Comprobar ventajas e inconvenientes..." /></div>
      <Divider />
      <div><Label required>3 · Destinatarios</Label>
        <Txt value={d.destinatarios} onChange={v => upd("destinatarios", v)} rows={3} placeholder="ej: Personal operativo de guardia" /></div>
      <Divider />
      <div><Label required>4 · Escenario</Label>
        <Txt value={d.escenario} onChange={v => upd("escenario", v)} rows={5} placeholder="ej: Hidrante de abastecimiento del parque" /></div>
    </div>,

    /* 2 · Recursos */
    <div style={spY} key="tab2">
      <SectionTitle>Recursos</SectionTitle>
      <div>
        <Label>EPI's</Label>
        {d.epis.map((e, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", marginBottom:"8px" }}>
            <Inp value={e} onChange={v => updArr("epis", i, v)} placeholder="EPI..." />
            {d.epis.length > 1 && <RemBtn onClick={() => remArr("epis", i)} />}
          </div>
        ))}
        <AddBtn onClick={() => addArr("epis")} label="＋ Añadir EPI" />
      </div>
      <Divider />
      <div>
        <Label>Materiales y Herramientas</Label>
        {d.materiales.map((m, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", marginBottom:"8px" }}>
            <Inp value={m} onChange={v => updArr("materiales", i, v)} placeholder="Material..." />
            {d.materiales.length > 1 && <RemBtn onClick={() => remArr("materiales", i)} />}
          </div>
        ))}
        <AddBtn onClick={() => addArr("materiales")} label="＋ Añadir material" />
      </div>
    </div>,

    /* 3 · Organización */
    <div style={spY} key="tab3">
      <SectionTitle>Organización del Grupo</SectionTitle>
      <div><Label required>Descripción general</Label>
        <Txt value={d.organizacion} onChange={v => upd("organizacion", v)} rows={5} /></div>
      <div style={{ background:"#f3f4f6", padding:"12px", borderRadius:"6px" }}>
        <Label>Rol del Jefe de Turno</Label>
        <Txt value={d.jt1} onChange={v => upd("jt1", v)} rows={2} style={{marginBottom:"8px"}} />
        <Txt value={d.jt2} onChange={v => upd("jt2", v)} rows={3} />
      </div>
    </div>,

    /* 4 · Desarrollo */
    <div style={spY} key="tab4">
      <SectionTitle>Desarrollo Explicativo</SectionTitle>
      <div><Label>Referencia</Label><Inp value={d.refDoc} onChange={v => upd("refDoc", v)} /></div>
      <Divider />
      <div>
        <Label required>Pasos secuenciales</Label>
        {d.pasos.map((p, i) => (
          <div key={i} style={{ display:"flex", gap:"8px", marginBottom:"8px" }}>
            <div style={{ background:"#B22222", color:"#fff", minWidth:"28px", height:"28px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"bold" }}>{i+1}</div>
            <Txt value={p} onChange={v => updArr("pasos", i, v)} rows={2} />
            {d.pasos.length > 1 && <RemBtn onClick={() => remArr("pasos", i)} />}
          </div>
        ))}
        <AddBtn onClick={() => addArr("pasos")} label="＋ Añadir paso" />
      </div>
      <Divider />
      <div><Label required>Precauciones</Label><Txt value={d.precauciones} onChange={v => upd("precauciones", v)} /></div>
    </div>,

    /* 5 · Plan SOS */
    <div style={spY} key="tab5">
      <SectionTitle>Plan SOS</SectionTitle>
      <div><Label required>Señal de Emergencia</Label><Inp value={d.planSOS.senal} onChange={v => updSos("senal", v)} /></div>
      <Divider />
      <div><Label>Paso Leve</Label>
        {d.planSOS.leveItems.map((item, i) => (
          <div key={i} style={{ display:"flex", marginBottom:"8px" }}>
            <Inp value={item} onChange={v => updSosArr("leveItems", i, v)} />
            {d.planSOS.leveItems.length > 1 && <RemBtn onClick={() => remSosArr("leveItems", i)} />}
          </div>
        ))}
        <AddBtn onClick={() => addSosArr("leveItems")} label="＋ Añadir paso leve" />
      </div>
    </div>,

    /* 6 · Criterios de Evaluación (NUEVO) */
    <div style={spY} key="tab6">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <SectionTitle>Criterios de Evaluación</SectionTitle>
        <button 
          onClick={() => upd("mostrarEvaluacion", !d.mostrarEvaluacion)}
          style={{ 
            padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold",
            cursor: "pointer", border: "1px solid",
            background: d.mostrarEvaluacion ? "#16a34a" : "#fff",
            color: d.mostrarEvaluacion ? "#fff" : "#6b7280",
            borderColor: d.mostrarEvaluacion ? "#16a34a" : "#d1d5db"
          }}>
          {d.mostrarEvaluacion ? "✓ ACTIVADO" : "○ DESACTIVADO"}
        </button>
      </div>
      <Hint>Define los ítems que se evaluarán durante la práctica. Puedes ocultar este bloque del HTML final con el botón superior.</Hint>

      {!d.mostrarEvaluacion && (
        <div style={{ background:"#fef2f2", color:"#991b1b", padding:"12px", borderRadius:"6px", fontSize:"13px", border:"1px solid #fee2e2" }}>
          Esta sección está actualmente <strong>desactivada</strong>. No aparecerá en el código HTML generado.
        </div>
      )}

      <div style={{ opacity: d.mostrarEvaluacion ? 1 : 0.4, pointerEvents: d.mostrarEvaluacion ? "auto" : "none", transition: "opacity 0.2s" }}>
        <div style={{ background: "#fff5f5", padding: "16px", borderRadius: "8px", border: "1px solid #feb2b2" }}>
          <Label>Bloque 1 - Ítems Críticos (Obligatorios)</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {d.evaluacion.criticos.map((item, i) => (
              <div key={i} style={{ display: "flex" }}>
                <Inp value={item} onChange={v => updEvalArr("criticos", i, v)} placeholder="Ítem crítico..." />
                {d.evaluacion.criticos.length > 1 && <RemBtn onClick={() => remEvalArr("criticos", i)} />}
              </div>
            ))}
          </div>
          <AddBtn onClick={() => addEvalArr("criticos")} label="＋ Añadir ítem crítico" />
        </div>

        <Divider />

        <div style={{ background: "#f0fff4", padding: "16px", borderRadius: "8px", border: "1px solid #9ae6b4" }}>
          <Label>Bloque 2 - Ítems Técnicos (Puntuables)</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {d.evaluacion.tecnicos.map((item, i) => (
              <div key={i} style={{ display: "flex" }}>
                <Inp value={item} onChange={v => updEvalArr("tecnicos", i, v)} placeholder="Ítem técnico..." />
                {d.evaluacion.tecnicos.length > 1 && <RemBtn onClick={() => remEvalArr("tecnicos", i)} />}
              </div>
            ))}
          </div>
          <AddBtn onClick={() => addEvalArr("tecnicos")} label="＋ Añadir ítem técnico" />
        </div>

        <Divider />

        <div style={{ background: "#fffaf0", padding: "16px", borderRadius: "8px", border: "1px solid #fbd38d" }}>
          <Label>Bloque 3 - Actitudinales (Restan)</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {d.evaluacion.actitudinales.map((item, i) => (
              <div key={i} style={{ display: "flex" }}>
                <Inp value={item} onChange={v => updEvalArr("actitudinales", i, v)} placeholder="Ítem actitudinal..." />
                {d.evaluacion.actitudinales.length > 1 && <RemBtn onClick={() => remEvalArr("actitudinales", i)} />}
              </div>
            ))}
          </div>
          <AddBtn onClick={() => addEvalArr("actitudinales")} label="＋ Añadir ítem actitudinal" />
        </div>
      </div>
    </div>,

    /* 7 · Riesgos */
    <div style={spY} key="tab7">
      <SectionTitle>Evaluación de Riesgos</SectionTitle>
      {d.riesgos.map((r, i) => (
        <div key={i} style={{ border:"1px solid #e5e7eb", padding:"12px", borderRadius:"6px", marginBottom:"10px" }}>
          <Label>Riesgo {i+1}</Label>
          <Inp value={r.riesgo} onChange={v => updRisk(i, "riesgo", v)} placeholder="Riesgo..." />
          <AddBtn onClick={() => addArr("riesgos", { riesgo: "", causa: "", grado: "Notable", medida: "" })} label="＋ Añadir riesgo" />
        </div>
      ))}
    </div>,

    /* 8 · Pie */
    <div style={spY} key="tab8">
      <SectionTitle>Pie de Página</SectionTitle>
      <Label>Fecha Revisión</Label><Inp value={d.revision} onChange={v => upd("revision", v)} />
    </div>,

    /* 9 · Generar */
    <div style={spY} key="tab9">
      <SectionTitle>HTML generado para Moodle</SectionTitle>
      {html && (
        <div style={spY}>
          <div style={{ display:"flex", gap:"8px" }}>
            <button onClick={insertInEditor} style={{ flex:"1", padding:"10px", background:"#B22222", color:"#fff", border:"none", borderRadius:"6px", fontWeight:"bold", cursor:"pointer" }}>Insertar en el editor</button>
            <button onClick={copy} style={{ flex:"1", padding:"10px", background:"#374151", color:"#fff", border:"none", borderRadius:"6px", fontWeight:"bold", cursor:"pointer" }}>Copiar Código</button>
          </div>
          <textarea readOnly value={html} rows={12} style={{ width:"100%", background:"#111827", color:"#86efac", fontFamily:"monospace", padding:"12px", borderRadius:"6px" }} />
          {preview && <div style={{ border:"1px solid #ddd", borderRadius:"6px", marginTop:"10px", padding:"10px" }} dangerouslySetInnerHTML={{ __html: html }} />}
        </div>
      )}
    </div>
  ];

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:"#f9fafb" }}>
      <div style={{ height:"3px", background:"#7f1d1d" }}><div style={{ height:"100%", background:"#fca5a5", width:`${((tab + 1) / TABS.length) * 100}%` }} /></div>
      <div style={{ background:"#fff", borderBottom:"1px solid #e5e7eb", display:"flex", overflowX:"auto" }}>
        {TABS.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{ padding:"12px", fontSize:"12px", fontWeight:"600", border:"none", borderBottom: tab === i ? "2px solid #B22222" : "2px solid transparent", color: tab === i ? "#B22222" : "#9ca3af", background:"none", cursor:"pointer", whiteSpace:"nowrap" }}>{t.label}</button>
        ))}
      </div>
      <div style={{ flex:"1", overflowY:"auto", padding:"20px" }}><div style={{ maxWidth:"800px", margin:"0 auto" }}>{panels[tab]}</div></div>
      <div style={{ background:"#fff", borderTop:"1px solid #e5e7eb", padding:"12px 20px", display:"flex", justifyContent:"space-between", gap:"10px" }}>
        <button onClick={() => setTab(Math.max(0, tab-1))} style={{ padding:"8px 16px", borderRadius:"6px", border:"1px solid #ddd" }}>← Anterior</button>
        <button onClick={generate} style={{ flex:"1", background:"#B22222", color:"#fff", border:"none", borderRadius:"6px", fontWeight:"bold" }}>⚡ GENERAR HTML</button>
        <button onClick={() => setTab(Math.min(TABS.length-1, tab+1))} style={{ padding:"8px 16px", borderRadius:"6px", border:"1px solid #ddd" }}>Siguiente →</button>
      </div>
    </div>
  );
}

/* ─── MOUNT ─────────────────────────────────────────────────── */
(function mountGenerador() {
  const el = document.getElementById('maniobras-root');
  if (el) ReactDOM.createRoot(el).render(<GeneradorManiobras />);
})();
