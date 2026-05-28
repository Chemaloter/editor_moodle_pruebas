/* ══════════════════════════════════════════════════════════════
   GENERADOR DE VEHÍCULOS · CBCM · v1.0
   Archivo independiente. No modifica app.js ni generador_maniobras.js.
   Requiere React 18 + ReactDOM 18 ya cargados en index.html.
   ══════════════════════════════════════════════════════════════ */
(function(){
'use strict';

const h = React.createElement;
const { useState } = React;

const UI = {
  red:'#C0272D', redDark:'#9b1e23', redSoft:'rgba(192,39,45,.08)',
  border:'#d9dee7', borderSoft:'#edf0f4', panel:'#f7f8fa', text:'#111827', muted:'#6b7280',
  font:'Montserrat,Segoe UI,Roboto,Helvetica,Arial,sans-serif', contentMax:'800px', mediaMax:'1000px'
};

function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function br(s){return esc(s).replace(/\r?\n/g,'<br>');}
function hasText(s){return String(s||'').trim().length>0;}
function newImage(){return {mode:'url', url:'', src:'', name:'', caption:'', texto:'', observaciones:'', width:'75%'};}
function newText(){return {texto:''};}
function newCompartimento(){return {nombre:'', descripcion:'', materiales:[''], textos:[newText()], imagenes:[]};}
function emptyData(){return {parque:'', vehiculo:'', matricula:'', imagenes:[], compartimentos:[newCompartimento()], observaciones:''};}

const inputStyle = {width:'100%', border:'1.5px solid #d9dee7', borderRadius:'10px', background:'#fff', padding:'9px 12px', fontSize:'13px', color:UI.text, outline:'none', fontFamily:'inherit', boxSizing:'border-box'};
const btnStyle = {padding:'8px 12px', fontSize:'12px', fontWeight:'750', border:'1.5px solid #d9dee7', borderRadius:'10px', background:'#fff', color:UI.muted, cursor:'pointer', fontFamily:'inherit'};
const primaryBtn = {...btnStyle, background:UI.red, color:'#fff', border:'none', boxShadow:'0 3px 10px rgba(192,39,45,.22)'};

function Box({title, hint, children}){
  return h('div',{style:{border:'1px solid #e5e7eb',borderRadius:14,padding:14,background:'#fff'}},
    h('div',{style:{fontWeight:900,color:UI.redDark,marginBottom:hint?4:10}},title),
    hint ? h('div',{style:{fontSize:12,color:UI.muted,lineHeight:1.45,marginBottom:10}},hint) : null,
    children
  );
}
function Label({children}){return h('label',{style:{fontSize:11,fontWeight:800,color:UI.muted,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:5,display:'block'}},children);}
function Inp({value,onChange,placeholder}){return h('input',{style:inputStyle,value:value||'',placeholder:placeholder||'',onChange:e=>onChange(e.target.value)});}
function Txt({value,onChange,placeholder,rows=3}){return h('textarea',{style:{...inputStyle,minHeight:rows*24+24,resize:'vertical',lineHeight:1.45},rows,value:value||'',placeholder:placeholder||'',onChange:e=>onChange(e.target.value)});}
function AddBtn({onClick,label}){return h('button',{type:'button',style:btnStyle,onClick},label||'＋ Añadir');}
function DelBtn({onClick}){return h('button',{type:'button',style:{...btnStyle,color:'#b91c1c',padding:'6px 10px'},onClick},'Eliminar');}
function Row({children}){return h('div',{style:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}},children);}

function SimpleListEditor({items,onChange,placeholder}){
  const arr = items || [];
  const setAt = (i,v)=>onChange(arr.map((x,j)=>j===i?v:x));
  const rem = i=>onChange(arr.filter((_,j)=>j!==i));
  return h('div',{style:{display:'flex',flexDirection:'column',gap:8}},
    arr.map((x,i)=>h('div',{key:i,style:{display:'flex',gap:8,alignItems:'flex-start'}},
      h('div',{style:{flex:1}},h(Inp,{value:x,onChange:v=>setAt(i,v),placeholder})),
      arr.length>1 ? h(DelBtn,{onClick:()=>rem(i)}) : null
    )),
    h(AddBtn,{onClick:()=>onChange([...arr,'']),label:'＋ Añadir elemento'})
  );
}

function TextBlocksEditor({items,onChange}){
  const arr = items || [];
  const setAt = (i,obj)=>onChange(arr.map((x,j)=>j===i?obj:x));
  const rem = i=>onChange(arr.filter((_,j)=>j!==i));
  return h('div',{style:{display:'flex',flexDirection:'column',gap:10}},
    arr.map((it,i)=>h('div',{key:i,style:{border:'1px solid #edf0f4',borderRadius:12,padding:10,background:'#fafafa'}},
      h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}},
        h('strong',{style:{fontSize:13}},'Campo de texto ',i+1),
        arr.length>1 ? h(DelBtn,{onClick:()=>rem(i)}) : null
      ),
      h(Txt,{rows:3,value:it.texto,onChange:v=>setAt(i,{...it,texto:v}),placeholder:'Texto descriptivo del material, ubicación, notas de uso...'})
    )),
    h(AddBtn,{onClick:()=>onChange([...arr,newText()]),label:'＋ Añadir campo de texto'})
  );
}

function ImageEditor({items,onChange}){
  const arr = items || [];
  const setAt = (i,obj)=>onChange(arr.map((x,j)=>j===i?obj:x));
  const rem = i=>onChange(arr.filter((_,j)=>j!==i));
  const pill = (active)=>({
    padding:'4px 11px', fontSize:'11px', fontWeight:'800', border:'1.5px solid', borderRadius:'999px', cursor:'pointer',
    borderColor:active?UI.red:'#e5e7eb', background:active?'#fff0f0':'#ffffff', color:active?UI.redDark:UI.muted,
    fontFamily:'inherit', lineHeight:1.2
  });
  const fileLabel = {
    display:'flex',alignItems:'center',justifyContent:'center',gap:8,padding:'12px',border:'2px dashed #d9dee7',
    borderRadius:'10px',cursor:'pointer',fontSize:'13px',color:UI.muted,background:'#fff',fontWeight:700
  };
  function handleFile(i,file){
    if(!file) return;
    const reader = new FileReader();
    reader.onload = e => setAt(i,{...arr[i],mode:'file',src:e.target.result,name:file.name});
    reader.readAsDataURL(file);
  }
  return h('div',{style:{display:'flex',flexDirection:'column',gap:10}},
    arr.map((img,i)=>h('div',{key:i,style:{border:'1px solid #edf0f4',borderRadius:14,padding:12,background:'#ffffff',boxShadow:'0 1px 3px rgba(15,23,42,.04)'}},
      h('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:10,flexWrap:'wrap'}},
        h('strong',{style:{fontSize:13,color:UI.text,marginRight:4}},'Imagen ',i+1),
        h('button',{type:'button',style:pill(img.mode==='url'),onClick:()=>setAt(i,{...img,mode:'url'})},'URL'),
        h('button',{type:'button',style:pill(img.mode==='file'),onClick:()=>setAt(i,{...img,mode:'file'})},'Archivo local'),
        h('div',{style:{marginLeft:'auto'}},h(DelBtn,{onClick:()=>rem(i)}))
      ),
      img.mode==='url'
        ? h(React.Fragment,null,
            h(Label,null,'URL de imagen'),
            h(Inp,{value:img.url,onChange:v=>setAt(i,{...img,url:v}),placeholder:'https://ejemplo.com/imagen.jpg'})
          )
        : h(React.Fragment,null,
            h(Label,null,'Archivo local'),
            h('label',{style:fileLabel},'📁 ',img.name || 'Elegir imagen...',h('input',{type:'file',accept:'image/*',style:{display:'none'},onChange:e=>handleFile(i,e.target.files[0])})),
            img.src ? h('div',{style:{marginTop:8,textAlign:'center'}},
              h('img',{src:img.src,alt:'Vista previa',style:{maxHeight:120,maxWidth:'100%',borderRadius:8,border:'1px solid #e5e7eb'}}),
              h('div',{style:{fontSize:11,color:UI.muted,marginTop:4}},'✓ ',img.name || 'Imagen cargada')
            ) : null
          ),
      h(Row,null,
        h('div',null,
          h(Label,null,'Título / pie de foto'),
          h(Inp,{value:img.caption,onChange:v=>setAt(i,{...img,caption:v}),placeholder:'Ej: Persiana lateral derecha · Material de excarcelación'})
        ),
        h('div',null,
          h(Label,null,'Ancho máximo'),
          h('select',{style:inputStyle,value:img.width||'75%',onChange:e=>setAt(i,{...img,width:e.target.value})},
            h('option',{value:'100%'},'100% — ocupa todo el ancho'),
            h('option',{value:'75%'},'75% — recomendado'),
            h('option',{value:'50%'},'50%'),
            h('option',{value:'auto'},'Auto — tamaño original')
          )
        )
      ),
      h(Row,null,
        h('div',null,
          h(Label,null,'Texto explicativo de la imagen'),
          h(Txt,{rows:3,value:img.texto,onChange:v=>setAt(i,{...img,texto:v}),placeholder:'Describe qué material se ve, dónde está colocado o cómo se identifica...'})
        ),
        h('div',null,
          h(Label,null,'Observaciones de la imagen'),
          h(Txt,{rows:3,value:img.observaciones,onChange:v=>setAt(i,{...img,observaciones:v}),placeholder:'Observaciones específicas de esta imagen o del material mostrado...'})
        )
      )
    )),
    h(AddBtn,{onClick:()=>onChange([...arr,newImage()]),label:'＋ Añadir imagen'})
  );
}

function CompartimentosEditor({items,onChange}){
  const arr = items || [];
  const setAt = (i,obj)=>onChange(arr.map((x,j)=>j===i?obj:x));
  const rem = i=>onChange(arr.filter((_,j)=>j!==i));
  return h('div',{style:{display:'flex',flexDirection:'column',gap:14}},
    arr.map((c,i)=>h(Box,{key:i,title:'Persiana / compartimento '+(i+1),hint:'Puedes añadir texto, listado de material e imágenes del compartimento.'},
      h('div',{style:{display:'flex',justifyContent:'flex-end',marginBottom:8}},arr.length>1?h(DelBtn,{onClick:()=>rem(i)}):null),
      h(Label,null,'Nombre del compartimento'),
      h(Inp,{value:c.nombre,onChange:v=>setAt(i,{...c,nombre:v}),placeholder:'Ej: Lateral derecho · Persiana 1'}),
      h(Label,null,'Descripción'),
      h(Txt,{rows:3,value:c.descripcion,onChange:v=>setAt(i,{...c,descripcion:v}),placeholder:'Descripción general del compartimento'}),
      h(Box,{title:'Material del compartimento'},h(SimpleListEditor,{items:c.materiales,onChange:v=>setAt(i,{...c,materiales:v}),placeholder:'Ej: Lanza, bifurcación, manguera...'})),
      h(Box,{title:'Campos de texto del compartimento'},h(TextBlocksEditor,{items:c.textos,onChange:v=>setAt(i,{...c,textos:v})})),
      h(Box,{title:'Imágenes del compartimento'},h(ImageEditor,{items:c.imagenes,onChange:v=>setAt(i,{...c,imagenes:v})}))
    )),
    h(AddBtn,{onClick:()=>onChange([...arr,newCompartimento()]),label:'＋ Añadir persiana / compartimento'})
  );
}

function renderImages(images){
  return (images||[]).map(img=>{
    const src = img.mode==='file' ? img.src : img.url;
    if(!hasText(src)) return '';
    const width = img.width || '75%';
    const isAuto = width==='auto';
    const containerW = isAuto ? 'max-width:100%;' : 'width:'+width+';max-width:100%;';
    const imgStyle = isAuto ? 'max-width:100%;width:auto;height:auto;border-radius:6px;display:block;margin:0 auto;box-sizing:border-box;' : 'width:100%;max-width:100%;height:auto;border-radius:6px;display:block;box-sizing:border-box;';
    const caption = img.caption || img.name || 'Imagen del vehículo';
    const textoImg = hasText(img.texto) ? '<div style="padding:12px 16px;background:#ffffff;border-top:1px solid #edf0f4;text-align:left;box-sizing:border-box;color:#2d2d2d;font-size:14px;line-height:1.65;">'+br(img.texto)+'</div>' : '';
    const obsImg = hasText(img.observaciones) ? '<div style="padding:12px 16px;background:#eff6ff;border-top:1px solid #dbeafe;text-align:left;box-sizing:border-box;color:#1e3a8a;font-size:14px;line-height:1.65;font-weight:600;"><strong>ℹ️ Observaciones:</strong><br>'+br(img.observaciones)+'</div>' : '';
    return '<div class="moodle-media-block" style="text-align:center;margin:20px auto;width:100%;max-width:'+UI.mediaMax+';box-sizing:border-box;">'
      + '<div style="display:inline-block;'+containerW+'background:#fff;border:1px solid #d1d1d1;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.12);font-family:'+UI.font+';box-sizing:border-box;">'
      + '<div style="text-align:center;background:#f0f0f0;padding:16px;box-sizing:border-box;"><img src="'+src+'" alt="'+esc(caption)+'" style="'+imgStyle+'"></div>'
      + '<div style="padding:12px 16px;background:#f9f9f9;border-top:1px solid #d1d1d1;text-align:center;box-sizing:border-box;"><span style="font-weight:700;color:#333;font-size:16px;line-height:1.5;display:block;overflow-wrap:anywhere;">🖼️ '+esc(caption)+'</span></div>'
      + textoImg + obsImg
      + '</div></div>';
  }).join('\n');
}

function paragraph(text){return hasText(text)?'<p style="font-family:'+UI.font+';font-size:15px;line-height:1.8;color:#2d2d2d;margin:10px 0;">'+br(text)+'</p>':'';}
function heading(text,level){
  const style = level===2
    ? 'display:inline-block;background-color:#8E1B1F;color:#ffffff;padding:10px 20px;border-radius:6px;font-family:'+UI.font+';font-size:17px;font-weight:800;line-height:1.3;'
    : 'display:inline-block;background-color:#fff0f0;color:#6b1215;border-left:4px solid '+UI.red+';padding:8px 18px;border-radius:0 5px 5px 0;font-family:'+UI.font+';font-size:15px;font-weight:800;line-height:1.4;';
  return '<div style="max-width:'+UI.contentMax+';width:100%;margin:18px auto 10px auto;box-sizing:border-box;"><div style="'+style+'">'+esc(text)+'</div></div>';
}
function wrap(html){return '<div style="max-width:'+UI.contentMax+';width:100%;margin-left:auto;margin-right:auto;box-sizing:border-box;">'+(html||'')+'</div>';}
function renderVehicleHTML(d){
  const idBlock = '<div style="max-width:'+UI.contentMax+';width:100%;margin:4px auto 20px auto;border:1.5px solid '+UI.border+';border-left:6px solid '+UI.red+';border-radius:12px;background:#ffffff;padding:18px 22px;box-sizing:border-box;box-shadow:0 3px 12px rgba(15,23,42,.05);font-family:'+UI.font+';">'
    + '<div style="font-size:12px;text-transform:uppercase;letter-spacing:1.5px;color:'+UI.red+';font-weight:800;margin-bottom:6px;">Inventario de vehículo</div>'
    + '<div style="font-size:22px;line-height:1.25;color:'+UI.redDark+';font-weight:900;text-transform:uppercase;overflow-wrap:anywhere;">🚒 '+esc(d.vehiculo || 'Vehículo')+'</div>'
    + '<div style="margin-top:10px;font-size:13px;color:#374151;line-height:1.65;"><strong>Parque:</strong> '+esc(d.parque || '—')+'<br><strong>Matrícula:</strong> '+esc(d.matricula || '—')+'</div>'
    + '</div>';

  const generalImages = renderImages(d.imagenes);
  const comps = (d.compartimentos||[]).map((c,idx)=>{
    const mats = (c.materiales||[]).filter(hasText);
    const texts = (c.textos||[]).filter(t=>hasText(t.texto));
    const matsHtml = mats.length ? '<ul style="font-family:'+UI.font+';font-size:15px;line-height:1.8;color:#2d2d2d;margin:10px 0;padding-left:28px;">'+mats.map(m=>'<li style="margin:5px 0;">'+br(m)+'</li>').join('')+'</ul>' : '';
    const textsHtml = texts.map(t=>'<div style="display:block;width:100%;max-width:'+UI.contentMax+';margin:12px auto;box-sizing:border-box;font-family:'+UI.font+';font-size:15px;background-color:#eff6ff;border-left:5px solid #1d4ed8;color:#1e3a8a;padding:12px 20px;border-radius:0 6px 6px 0;font-weight:600;line-height:1.6;">'+br(t.texto)+'</div>').join('');
    return heading(hasText(c.nombre) ? c.nombre : 'Persiana / compartimento '+(idx+1),3)
      + wrap(paragraph(c.descripcion)+matsHtml)
      + textsHtml
      + renderImages(c.imagenes);
  }).join('\n');
  const obs = hasText(d.observaciones)
    ? '<div style="display:block;width:100%;max-width:'+UI.contentMax+';margin:18px auto;box-sizing:border-box;font-family:'+UI.font+';font-size:15px;background-color:#eff6ff;border-left:5px solid #1d4ed8;color:#1e3a8a;padding:14px 20px;border-radius:0 6px 6px 0;font-weight:600;line-height:1.7;"><strong>ℹ️ Observaciones</strong><br>'+br(d.observaciones)+'</div>'
    : '';
  return '<div style="font-family:'+UI.font+';font-size:16px;line-height:1.8;color:#2d2d2d;background:transparent;width:100%;max-width:none;margin:0 auto;box-sizing:border-box;">'
    + idBlock
    + (generalImages ? heading('VEHÍCULO',2)+generalImages : '')
    + heading('MATERIAL',2)
    + comps
    + obs
    + '</div>';
}

function GeneradorVehiculos(){
  const [tab,setTab] = useState(0);
  const [d,setD] = useState(emptyData());
  const [html,setHtml] = useState('');
  const [preview,setPreview] = useState(false);
  const [inserted,setInserted] = useState(false);
  const update = (k,v)=>setD(p=>({...p,[k]:v}));
  const tabs = ['1 · Identificación','2 · Imágenes','3 · Compartimentos','4 · Observaciones','⚡ Generar'];
  const generate = ()=>{setHtml(renderVehicleHTML(d));setTab(4);setPreview(false);setInserted(false);};
  const insert = ()=>{
    if(!html) return;
    if(typeof window.insertHTMLAtCursor === 'function'){
      window.insertHTMLAtCursor(html);
      setInserted(true);
      setTimeout(()=>{ if(typeof window.closeVehiculosModal==='function') window.closeVehiculosModal(); }, 700);
    } else {
      alert('No se ha encontrado insertHTMLAtCursor. Comprueba que app.js se carga correctamente.');
    }
  };
  const panel = [
    h('div',{style:{display:'flex',flexDirection:'column',gap:16}},
      h(Box,{title:'Identificación del vehículo'},
        h(Row,null,
          h('div',null,h(Label,null,'Parque'),h(Inp,{value:d.parque,onChange:v=>update('parque',v),placeholder:'Ej: Parque de Las Rozas'})),
          h('div',null,h(Label,null,'Vehículo'),h(Inp,{value:d.vehiculo,onChange:v=>update('vehiculo',v),placeholder:'Ej: BUP, BUL, FSV...'})),
          h('div',null,h(Label,null,'Matrícula'),h(Inp,{value:d.matricula,onChange:v=>update('matricula',v),placeholder:'Ej: 0000 XXX'}))
        )
      )
    ),
    h('div',{style:{display:'flex',flexDirection:'column',gap:16}},
      h(Box,{title:'VEHÍCULO',hint:'Añade tantas imágenes generales como necesites: exterior, laterales, frontal, trasera, cabina, etc.'},
        h(ImageEditor,{items:d.imagenes,onChange:v=>update('imagenes',v)})
      )
    ),
    h('div',{style:{display:'flex',flexDirection:'column',gap:16}},
      h(Box,{title:'MATERIAL',hint:'Cada persiana o compartimento puede contener materiales, textos explicativos e imágenes.'},
        h(CompartimentosEditor,{items:d.compartimentos,onChange:v=>update('compartimentos',v)})
      )
    ),
    h('div',{style:{display:'flex',flexDirection:'column',gap:16}},
      h(Box,{title:'Observaciones',hint:'Campo libre para notas operativas, cambios de dotación, material pendiente, recomendaciones de revisión, etc.'},
        h(Txt,{rows:8,value:d.observaciones,onChange:v=>update('observaciones',v),placeholder:'Escribe aquí las observaciones generales del vehículo...'})
      )
    ),
    h('div',{style:{display:'flex',flexDirection:'column',gap:16}},
      h(Box,{title:'Generar e insertar'},
        h('div',{style:{display:'flex',gap:10,flexWrap:'wrap'}},
          h('button',{type:'button',style:primaryBtn,onClick:generate},'⚡ Generar HTML'),
          html ? h('button',{type:'button',style:primaryBtn,onClick:insert},inserted?'✓ Insertado':'⬆️ Insertar en el editor') : null,
          html ? h('button',{type:'button',style:btnStyle,onClick:()=>setPreview(!preview)},preview?'Ocultar vista previa':'👁️ Ver vista previa') : null,
          h('button',{type:'button',style:{...btnStyle,color:'#b91c1c'},onClick:()=>{ if(confirm('¿Borrar los datos del vehículo?')){setD(emptyData());setHtml('');setTab(0);} }},'🗑 Borrar todo')
        ),
        !html ? h('div',{style:{fontSize:13,color:UI.muted,marginTop:12}},'Pulsa “Generar HTML” para procesar el inventario del vehículo.') : null,
        preview && html ? h('div',{style:{marginTop:16,border:'1px solid #e5e7eb',borderRadius:12,padding:14,maxHeight:'50vh',overflow:'auto',background:'#fff'},dangerouslySetInnerHTML:{__html:html}}) : null
      )
    )
  ];
  return h('div',{style:{height:'100%',display:'flex',flexDirection:'column',fontFamily:UI.font,color:UI.text,background:'#f8fafc'}},
    h('div',{style:{padding:'12px 14px',borderBottom:'1px solid #e5e7eb',background:'#fff',display:'flex',gap:8,flexWrap:'wrap'}},
      tabs.map((t,i)=>h('button',{key:t,type:'button',onClick:()=>setTab(i),style:{padding:'8px 11px',fontSize:12,fontWeight:900,border:'1.5px solid',borderRadius:999,cursor:'pointer',fontFamily:'inherit',background:tab===i?UI.redSoft:'#fff',borderColor:tab===i?'#efd3d5':UI.border,color:tab===i?UI.redDark:UI.muted}},t))
    ),
    h('div',{style:{flex:1,overflow:'auto',padding:18}},panel[tab]),
    h('div',{style:{padding:'10px 14px',borderTop:'1px solid #e5e7eb',background:'#fff',display:'flex',gap:8,alignItems:'center'}},
      h('button',{type:'button',style:btnStyle,disabled:tab===0,onClick:()=>setTab(Math.max(0,tab-1))},'← Anterior'),
      h('button',{type:'button',style:primaryBtn,onClick:generate},'⚡ Generar HTML'),
      h('button',{type:'button',style:btnStyle,disabled:tab===tabs.length-1,onClick:()=>setTab(Math.min(tabs.length-1,tab+1))},'Siguiente →')
    )
  );
}

function mountVehiculos(){
  const el = document.getElementById('vehiculos-root');
  if(!el || !window.React || !window.ReactDOM) return;
  if(el.dataset.mounted === '1') return;
  el.dataset.mounted = '1';
  ReactDOM.createRoot(el).render(h(GeneradorVehiculos));
}
window.openVehiculosModal = function(){
  const modal = document.getElementById('vehiculosModal');
  if(modal) modal.classList.add('open');
  mountVehiculos();
};
window.closeVehiculosModal = function(){
  const modal = document.getElementById('vehiculosModal');
  if(modal) modal.classList.remove('open');
};

document.addEventListener('DOMContentLoaded', mountVehiculos);
document.addEventListener('keydown', function(e){ if(e.key === 'Escape') window.closeVehiculosModal(); });
document.addEventListener('click', function(e){ if(e.target && e.target.id === 'vehiculosModal') window.closeVehiculosModal(); });
})();
