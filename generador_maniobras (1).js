/* ══════════════════════════════════════════════════════════════
   GENERADOR DE MANIOBRAS DE PARQUE — CBCM
   Cargado con Babel Standalone (sin Node.js / sin bundler)
   Requiere: React 18 CDN · ReactDOM 18 CDN · Babel Standalone CDN
   ══════════════════════════════════════════════════════════════ */

const { useState } = React;

/* ─── HTML HELPERS ─────────────────────────────────────────── */
/* Renombrado a mEsc para no colisionar con esc() de app.js    */
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

/* ─── HTML GENERATOR ────────────────────────────────────────── */
function generateHTML(d) {
  const epiItems = d.epis.filter(e => e.trim())
    .map(e => `<li style="margin-bottom:4px;">${mEsc(e)}</li>`).join("\n              ");

  const matItems = d.materiales.filter(m => m.trim())
    .map(m => `<li style="margin-bottom:4px;">${mEsc(m)}</li>`).join("\n              ");

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

  const videoBlock = d.videoUrl.trim()
    ? `      <p style="margin:0 0 14px 0;"><a href="${mEsc(d.videoUrl)}" target="_blank" style="display:inline-block;background:#1565C0;color:#ffffff;text-decoration:none;padding:8px 16px;border-radius:4px;font-weight:bold;font-size:13px;">&#9654;&nbsp; Ver v&iacute;deo explicativo</a></p>\n`
    : "";

  const recordadBlock = d.recordad.trim()
    ? `        <p style="margin:8px 0 0 0;"><strong>Recordad:</strong> ${mEsc(d.recordad)}</p>\n`
    : "";

  return `<!-- MANIOBRA DE PARQUE - CBCM -->
<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1a1a1a;max-width:860px;margin:0 auto;box-sizing:border-box;">

  <table style="width:100%;border-collapse:collapse;overflow:hidden;background-color:#B22222;color:#ffffff;" cellpadding="0" cellspacing="0">
    <tr>
      <td style="width:60px;background-color:#7a1515;text-align:center;vertical-align:middle;padding:14px 8px;font-size:13px;font-weight:bold;color:#ffffff;">CBCM</td>
      <td style="padding:12px 16px;vertical-align:middle;">
        <div style="font-size:16px;font-weight:bold;text-transform:uppercase;letter-spacing:0.5px;">PR&Aacute;CTICA: ${mEsc(d.titulo)}</div>
        <div style="font-size:12px;margin-top:4px;opacity:0.85;">${mEsc(d.subtitulo)}</div>
      </td>
      <td style="width:130px;background-color:#7a1515;text-align:center;vertical-align:middle;padding:12px 10px;font-size:11px;color:#ffffff;">INSTRUCCI&Oacute;N T&Eacute;CNICA<br><span style="font-weight:bold;font-size:13px;letter-spacing:1px;">${mEsc(d.itCode)}</span></td>
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
      <div style="background:#fff3f3;border:1px solid #f0c0c0;border-radius:3px;padding:10px 14px;">
        <div style="font-weight:bold;color:#8b0000;font-size:12px;text-transform:uppercase;margin-bottom:6px;">Materiales y Herramientas</div>
        <ul style="margin:0;padding-left:20px;">${matItems}</ul>
      </div>
    </div>
  </div>

  <div style="margin-top:18px;border-left:4px solid #B22222;padding-left:12px;">
    <div style="font-size:12px;font-weight:bold;text-transform:uppercase;color:#B22222;letter-spacing:0.8px;margin-bottom:8px;">6. Organizaci&oacute;n del Grupo</div>
    <div style="background:#fafafa;border:1px solid #e0e0e0;border-radius:3px;padding:12px 14px;">
      <div style="background:#fff8e1;border:1px solid #ffe082;border-radius:3px;padding:10px 14px;margin-bottom:12px;">${mEsc(d.organizacion)}</div>
      <p style="margin:0 0 6px 0;"><strong>Rol del Jefe de Turno:</strong></p>
      <ul style="margin:0;padding-left:20px;">
        <li style="margin-bottom:6px;">Explicar&aacute; a los BX el desarrollo de la pr&aacute;ctica, identificando los objetivos, riesgos, secuencia de acciones y el Plan SOS.</li>
        <li>Supervisar&aacute; que la ejecuci&oacute;n se ajuste a la Ficha de Pr&aacute;cticas y a la Evaluaci&oacute;n de Riesgos, controlando en todo momento las condiciones de seguridad. En caso de incidente, activar&aacute; el Plan SOS.</li>
      </ul>
    </div>
  </div>

  <div style="margin-top:18px;border-left:4px solid #B22222;padding-left:12px;">
    <div style="font-size:12px;font-weight:bold;text-transform:uppercase;color:#B22222;letter-spacing:0.8px;margin-bottom:8px;">7. Desarrollo Explicativo de la Pr&aacute;ctica</div>
    <div style="background:#fafafa;border:1px solid #e0e0e0;border-radius:3px;padding:12px 14px;">
      <p style="margin:0 0 10px 0;"><strong>Documentaci&oacute;n de referencia:</strong> ${mEsc(d.refDoc)}</p>
${videoBlock}      <p style="margin:0 0 10px 0;"><strong>Explicaci&oacute;n secuencial de la maniobra:</strong></p>
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
      <div style="background:#b71c1c;color:#ffffff;text-align:center;font-weight:bold;padding:10px;border-radius:3px;margin-bottom:12px;letter-spacing:1px;font-size:13px;">SE&Ntilde;AL DE EMERGENCIA: 3 REPETICIONES DE LA PALABRA &laquo;EMERGENCIA&raquo;</div>
      <p style="margin:0 0 8px 0;">En caso de accidente durante el desarrollo de la pr&aacute;ctica, cualquier integrante podr&aacute; alertar con la se&ntilde;al indicada. A partir de ese momento, <strong>todo el personal paraliza su actuaci&oacute;n</strong> con seguridad y sigue las instrucciones de los instructores.</p>
      <p style="margin:0 0 12px 0;">Cuando haya personal disperso en el terreno, se dispondr&aacute; necesariamente de emisoras.</p>
      <div style="background:#ffffff;border:1px solid #ef9a9a;border-radius:3px;padding:10px 14px;margin-bottom:8px;">
        <div style="font-weight:bold;color:#b71c1c;text-transform:uppercase;font-size:12px;margin-bottom:6px;">Accidente Leve</div>
        <ul style="margin:0;padding-left:20px;">
          <li style="margin-bottom:4px;">Primera atenci&oacute;n b&aacute;sica con medios disponibles (botiqu&iacute;n, DESA, etc.).</li>
          <li style="margin-bottom:4px;">Avisar al m&eacute;dico de alerta si afecta a personal del CBCM.</li>
          <li>Si se necesitan recursos de guardia: aviso inmediato a CECOP (<strong>${mEsc(d.cecop)}</strong>).</li>
        </ul>
      </div>
      <div style="background:#ffffff;border:1px solid #ef9a9a;border-radius:3px;padding:10px 14px;margin-bottom:10px;">
        <div style="font-weight:bold;color:#b71c1c;text-transform:uppercase;font-size:12px;margin-bottom:6px;">Accidente Grave o Muy Grave</div>
        <ul style="margin:0;padding-left:20px;">
          <li style="margin-bottom:4px;">Todo lo previsto para accidente leve.</li>
          <li>Traslado de aviso al <strong>112</strong>.</li>
        </ul>
      </div>
      <p style="margin:0;font-size:12px;">En ambos casos, el Parte de Accidente/Suceso (PAS) se realizar&aacute; conforme a la normativa interna del CBCM.</p>
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
  { label: "6 · Riesgos",      short: "Rie."      },
  { label: "7 · Pie",          short: "Pie"       },
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
    titulo: "", subtitulo: "", itCode: "",
    descripcion: "", objetivo: "", destinatarios: "", escenario: "",
    epis: ["", "", ""],
    materiales: ["", "", "", ""],
    organizacion: "",
    refDoc: "", videoUrl: "",
    pasos: ["", "", "", "", "", ""],
    precauciones: "", recordad: "",
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

  const generate = () => { setHtml(generateHTML(d)); setTab(7); setPreview(false); setInserted(false); };

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
      <Hint>EPIs y materiales necesarios para la maniobra.</Hint>
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
    </div>,

    /* 3 · Organización */
    <div style={spY}>
      <SectionTitle>Organización del Grupo</SectionTitle>
      <Hint>El apartado del Jefe de Turno se incluye automáticamente en el documento.</Hint>
      <div><Label required>Descripción general</Label>
        <Txt value={d.organizacion} onChange={v => upd("organizacion", v)} rows={4}
          placeholder="ej: Práctica para todos los componentes del turno operativo." /></div>
      <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:"6px",
        padding:"12px 14px", fontSize:"12px", color:"#92400e" }}>
        <strong>Incluido automáticamente:</strong> el rol del Jefe de Turno (explicación de objetivos, supervisión y activación del Plan SOS) se inserta siempre en el documento.
      </div>
    </div>,

    /* 4 · Desarrollo */
    <div style={spY}>
      <SectionTitle>Desarrollo Explicativo</SectionTitle>
      <Hint>Referencia, vídeo, pasos secuenciales y precauciones de la maniobra.</Hint>
      <div><Label>Documentación de referencia</Label>
        <Inp value={d.refDoc} onChange={v => upd("refDoc", v)}
          placeholder="ej: 2023 Reciclaje Hidráulica y Abastecimientos" /></div>
      <div>
        <Label>URL del vídeo (opcional)</Label>
        <Inp value={d.videoUrl} onChange={v => upd("videoUrl", v)} placeholder="https://..." />
        <p style={{ fontSize:"12px", color:"#9ca3af", marginTop:"4px" }}>Si se deja vacío, el botón de vídeo no aparecerá.</p>
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

    /* 6 · Pie */
    <div style={spY}>
      <SectionTitle>Pie de Página</SectionTitle>
      <Hint>Fecha de revisión y teléfono CECOP para el Plan SOS.</Hint>
      <div>
        <Label required>Fecha de revisión</Label>
        <Inp value={d.revision} onChange={v => upd("revision", v)} placeholder="ej: 20260322" />
        <p style={{ fontSize:"12px", color:"#9ca3af", marginTop:"4px" }}>Formato AAAAMMDD — ej: 20260322 = 22 de marzo de 2026</p>
      </div>
      <div>
        <Label>Teléfono CECOP (Plan SOS)</Label>
        <Inp value={d.cecop} onChange={v => upd("cecop", v)} placeholder="918 354 918" />
      </div>
    </div>,

    /* 7 · Generar */
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
