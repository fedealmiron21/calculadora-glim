import { useState, useMemo } from "react";

const UVT = 52374;
const GLIM_GREEN  = "#00C37A";
const GLIM_DARK   = "#0F1117";
const GLIM_CARD   = "#1A1D27";
const GLIM_CARD2  = "#22263A";
const GLIM_BORDER = "rgba(255,255,255,0.08)";
const GLIM_MUTED  = "rgba(255,255,255,0.45)";
const GLIM_TEXT   = "#FFFFFF";
const WARN_COLOR  = "#F59E0B";
const DANGER_COLOR= "#EF4444";

const beneficios = [
  { id:"alimentacion",    nombre:"Alimentación",         emoji:"🍽️", gravado:false, topeUVT:41   },
  { id:"movilidad",       nombre:"Movilidad",            emoji:"🚗", gravado:false, topeUVT:null },
  { id:"dotacion",        nombre:"Dotación",             emoji:"👔", gravado:false, topeUVT:null },
  { id:"educacion",       nombre:"Educación",            emoji:"📚", gravado:false, topeUVT:null },
  { id:"viaticos",        nombre:"Viáticos Accidentales",emoji:"✈️", gravado:false, topeUVT:null },
  { id:"guarderias",      nombre:"Guarderías",           emoji:"👶", gravado:false, topeUVT:null },
  { id:"salud",           nombre:"Salud y Bienestar",    emoji:"🏥", gravado:true,  topeUVT:null },
  { id:"remoto",          nombre:"Trabajo Remoto",       emoji:"💻", gravado:true,  topeUVT:null },
  { id:"rewards",         nombre:"Rewards",              emoji:"🎁", gravado:true,  topeUVT:null },
  { id:"mascotas",        nombre:"Mascotas",             emoji:"🐾", gravado:true,  topeUVT:null },
  { id:"entretenimiento", nombre:"Entretenimiento",      emoji:"🎬", gravado:true,  topeUVT:null },
];

const TASAS = {
  segSocial:    0.12522,
  vacaciones:   0.04170,
  cesantias:    0.09330,
  prima:        0.08330,
  parafiscales: 0.04000,
};
const TASA_TOTAL = Object.values(TASAS).reduce((a, b) => a + b, 0);

const fmt    = n => "$" + Math.round(n).toLocaleString("es-CO");
const fmtPct = n => (n * 100).toFixed(1) + "%";

const Tag = ({ color, bg, children }) => (
  <span style={{ fontSize:10, fontWeight:500, padding:"2px 7px", borderRadius:20, background:bg, color, letterSpacing:"0.03em" }}>
    {children}
  </span>
);

export default function App() {
  const [salario,   setSalario]   = useState(5000000);
  const [pacto,     setPacto]     = useState(false);
  const [retencion, setRetencion] = useState(19);
  const [empleados, setEmpleados] = useState(10);
  const [montos, setMontos] = useState({
    alimentacion:750000, movilidad:0, dotacion:0, educacion:0,
    viaticos:0, guarderias:0, salud:300000, remoto:0,
    rewards:0, mascotas:0, entretenimiento:0,
  });

  const set = (id, v) => setMontos(p => ({ ...p, [id]: Math.max(0, Number(v) || 0) }));

  const totalBenef  = useMemo(() => Object.values(montos).reduce((a, b) => a + b, 0), [montos]);
  const pct40       = salario > 0 ? totalBenef / salario : 0;
  const excede40    = pct40 > 0.40;
  const nuevoBase   = salario - totalBenef;
  const cargaOrig   = salario   * TASA_TOTAL;
  const cargaNueva  = nuevoBase * TASA_TOTAL;
  const ahorroPrest = cargaOrig - cargaNueva;
  const ahorroRet   = pacto
    ? beneficios.filter(b => b.gravado).reduce((a, b) => a + (montos[b.id] || 0) * (retencion / 100), 0)
    : 0;
  const ahorroMes   = ahorroPrest + ahorroRet;
  const ahorroAnio  = ahorroMes * 12 * empleados;

  const limAlim = 41 * UVT;
  const alimOk  = montos.alimentacion <= limAlim;
  const salUVT  = salario / UVT;
  const salOk   = salUVT <= 310;

  const cardStyle = { background:GLIM_CARD, border:`1px solid ${GLIM_BORDER}`, borderRadius:16, padding:"1.25rem 1.5rem", marginBottom:"1rem" };
  const labelStyle = { fontSize:11, fontWeight:500, color:GLIM_MUTED, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6, display:"block" };
  const inputStyle = { width:"100%", boxSizing:"border-box", background:"rgba(255,255,255,0.05)", border:`1px solid ${GLIM_BORDER}`, borderRadius:8, color:GLIM_TEXT, padding:"8px 12px", fontSize:14, outline:"none", fontFamily:"inherit" };
  const smallInputStyle = { ...inputStyle, padding:"6px 10px", fontSize:13, background:"rgba(255,255,255,0.04)" };

  return (
    <div style={{ background:GLIM_DARK, minHeight:"100vh", padding:"1.5rem 1rem", fontFamily:"Inter, system-ui, sans-serif", color:GLIM_TEXT }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1.5rem" }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
            <div style={{ width:28, height:28, borderRadius:8, background:GLIM_GREEN, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ color:GLIM_DARK, fontWeight:700, fontSize:14 }}>G</span>
            </div>
            <span style={{ fontSize:15, fontWeight:600, color:GLIM_TEXT, letterSpacing:"-0.01em" }}>glim</span>
          </div>
          <h1 style={{ margin:0, fontSize:20, fontWeight:600, color:GLIM_TEXT, letterSpacing:"-0.02em" }}>Calculadora de ahorro</h1>
          <p style={{ margin:"2px 0 0", fontSize:12, color:GLIM_MUTED }}>UVT 2026: $52.374 · Res. DIAN 000238/2025</p>
        </div>
        <div style={{ textAlign:"right" }}>
          <span style={{ display:"block", fontSize:11, fontWeight:500, color:GLIM_MUTED, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6 }}>Pacto colectivo</span>
          <div style={{ display:"flex", alignItems:"center", gap:8, justifyContent:"flex-end" }}>
            <span style={{ fontSize:12, color: pacto ? GLIM_GREEN : GLIM_MUTED }}>{pacto ? "Activo" : "Inactivo"}</span>
            <div onClick={() => setPacto(p => !p)} style={{ width:44, height:24, borderRadius:12, cursor:"pointer", background: pacto ? GLIM_GREEN : "rgba(255,255,255,0.12)", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
              <div style={{ position:"absolute", top:3, left: pacto ? 23 : 3, width:18, height:18, borderRadius:"50%", background: pacto ? GLIM_DARK : "white", transition:"left 0.2s" }} />
            </div>
          </div>
          {pacto && <span style={{ fontSize:11, color:GLIM_GREEN, display:"block", marginTop:4 }}>Art. 29-1 ET, Párr. 1°</span>}
        </div>
      </div>

      <div style={cardStyle}>
        <span style={labelStyle}>Parámetros base</span>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"12px 16px" }}>
          <div>
            <label style={labelStyle}>Salario bruto / empleado</label>
            <input type="number" value={salario} step="100000" onChange={e => setSalario(Math.max(0, Number(e.target.value)))} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Número de empleados</label>
            <input type="number" value={empleados} min="1" step="1" onChange={e => setEmpleados(Math.max(1, Number(e.target.value)))} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Tarifa retención: <span style={{ color:GLIM_GREEN }}>{retencion}%</span></label>
            <input type="range" min="0" max="39" step="1" value={retencion} onChange={e => setRetencion(Number(e.target.value))} style={{ width:"100%", accentColor:GLIM_GREEN, marginTop:6 }} />
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1rem" }}>
          <span style={labelStyle}>Monto mensual por beneficio</span>
          <span style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:20, background: excede40 ? "rgba(239,68,68,0.15)" : "rgba(0,195,122,0.12)", color: excede40 ? DANGER_COLOR : GLIM_GREEN }}>
            {fmtPct(pct40)} del salario {excede40 ? "— supera el 40%" : "— dentro del 40%"}
          </span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
          {beneficios.map(b => {
            const esGravado   = b.gravado && !pacto;
            const esFavorable = b.gravado && pacto;
            const monto = montos[b.id] || 0;
            return (
              <div key={b.id} style={{ background:GLIM_CARD2, border:`1px solid ${monto > 0 ? esFavorable ? "rgba(0,195,122,0.3)" : esGravado ? "rgba(245,158,11,0.3)" : "rgba(0,195,122,0.25)" : GLIM_BORDER}`, borderRadius:12, padding:"10px 12px" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                    <span style={{ fontSize:14 }}>{b.emoji}</span>
                    <span style={{ fontSize:12, fontWeight:500, color:GLIM_TEXT }}>{b.nombre}</span>
                  </div>
                  {esGravado   && <Tag color={WARN_COLOR}  bg="rgba(245,158,11,0.12)">gravable</Tag>}
                  {esFavorable && <Tag color={GLIM_GREEN}  bg="rgba(0,195,122,0.12)">exento</Tag>}
                  {!b.gravado  && <Tag color={GLIM_GREEN}  bg="rgba(0,195,122,0.08)">libre</Tag>}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <span style={{ fontSize:12, color:GLIM_MUTED }}>$</span>
                  <input type="number" value={monto} min="0" step="50000" onChange={e => set(b.id, e.target.value)} style={{ ...smallInputStyle, flex:1 }} />
                </div>
                {b.id === "alimentacion" && monto > 0 && (
                  <p style={{ margin:"5px 0 0", fontSize:10, color: !alimOk ? DANGER_COLOR : !salOk ? WARN_COLOR : GLIM_GREEN }}>
                    {!alimOk ? `Excede 41 UVT (${fmt(limAlim)})` : !salOk ? "Salario > 310 UVT" : "Dentro del tope"}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={cardStyle}>
        <span style={labelStyle}>Desglose carga prestacional</span>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead>
            <tr>
              {["Concepto","Sin beneficios","Con Glim","Ahorro"].map(h => (
                <th key={h} style={{ textAlign:h==="Concepto"?"left":"right", padding:"0 0 10px", fontSize:11, fontWeight:500, color:GLIM_MUTED, textTransform:"uppercase", letterSpacing:"0.06em", borderBottom:`1px solid ${GLIM_BORDER}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { l:"Seguridad Social (12,522%)", t:TASAS.segSocial },
              { l:"Vacaciones (4,170%)", t:TASAS.vacaciones },
              { l:"Cesantías e intereses (9,330%)", t:TASAS.cesantias },
              { l:"Prima de servicios (8,330%)", t:TASAS.prima },
              { l:"Parafiscales (4,000%)", t:TASAS.parafiscales },
            ].map((r, i) => {
              const orig = salario * r.t, nueva = nuevoBase * r.t, diff = orig - nueva;
              return (
                <tr key={i}>
                  <td style={{ padding:"9px 0", color:"rgba(255,255,255,0.7)", borderBottom:`1px solid ${GLIM_BORDER}` }}>{r.l}</td>
                  <td style={{ textAlign:"right", padding:"9px 0", color:"rgba(255,255,255,0.7)", borderBottom:`1px solid ${GLIM_BORDER}` }}>{fmt(orig)}</td>
                  <td style={{ textAlign:"right", padding:"9px 0", color:"rgba(255,255,255,0.7)", borderBottom:`1px solid ${GLIM_BORDER}` }}>{fmt(nueva)}</td>
                  <td style={{ textAlign:"right", padding:"9px 0", color: diff>0 ? GLIM_GREEN : "rgba(255,255,255,0.3)", fontWeight:diff>0?500:400, borderBottom:`1px solid ${GLIM_BORDER}` }}>{diff > 0 ? fmt(diff) : "—"}</td>
                </tr>
              );
            })}
            <tr>
              <td style={{ padding:"10px 0", fontWeight:600, color:GLIM_TEXT }}>Total carga prestacional</td>
              <td style={{ textAlign:"right", padding:"10px 0", fontWeight:600, color:GLIM_TEXT }}>{fmt(cargaOrig)}</td>
              <td style={{ textAlign:"right", padding:"10px 0", fontWeight:600, color:GLIM_TEXT }}>{fmt(cargaNueva)}</td>
              <td style={{ textAlign:"right", padding:"10px 0", fontWeight:700, color:GLIM_GREEN }}>{fmt(ahorroPrest)}</td>
            </tr>
            {pacto && ahorroRet > 0 && (
              <tr>
                <td style={{ padding:"8px 0", color:GLIM_GREEN, fontSize:12 }}>Retención ahorrada (pacto colectivo)</td>
                <td style={{ textAlign:"right", padding:"8px 0", color:GLIM_MUTED, fontSize:12 }}>—</td>
                <td style={{ textAlign:"right", padding:"8px 0", color:GLIM_MUTED, fontSize:12 }}>—</td>
                <td style={{ textAlign:"right", padding:"8px 0", color:GLIM_GREEN, fontWeight:600, fontSize:12 }}>{fmt(ahorroRet)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:"1rem" }}>
        <div style={{ background:GLIM_CARD, border:`1px solid ${GLIM_BORDER}`, borderRadius:16, padding:"1rem 1.25rem" }}>
          <span style={{ ...labelStyle, marginBottom:8 }}>Ahorro prestacional / mes</span>
          <p style={{ margin:0, fontSize:22, fontWeight:700, color:GLIM_TEXT, letterSpacing:"-0.02em" }}>{fmt(ahorroPrest)}</p>
          <p style={{ margin:"3px 0 0", fontSize:11, color:GLIM_MUTED }}>por empleado</p>
        </div>
        <div style={{ background:GLIM_CARD, border:`1px solid ${GLIM_BORDER}`, borderRadius:16, padding:"1rem 1.25rem" }}>
          <span style={{ ...labelStyle, marginBottom:8 }}>Ahorro total / mes</span>
          <p style={{ margin:0, fontSize:22, fontWeight:700, color:ahorroMes>0?GLIM_GREEN:GLIM_TEXT, letterSpacing:"-0.02em" }}>{fmt(ahorroMes)}</p>
          <p style={{ margin:"3px 0 0", fontSize:11, color:GLIM_MUTED }}>empresa + empleado{pacto?" (c/pacto)":""}</p>
        </div>
        <div style={{ background:ahorroAnio>0?"rgba(0,195,122,0.1)":GLIM_CARD, border:`1px solid ${ahorroAnio>0?"rgba(0,195,122,0.3)":GLIM_BORDER}`, borderRadius:16, padding:"1rem 1.25rem" }}>
          <span style={{ ...labelStyle, color:ahorroAnio>0?GLIM_GREEN:GLIM_MUTED, marginBottom:8 }}>Ahorro anual total</span>
          <p style={{ margin:0, fontSize:22, fontWeight:700, color:ahorroAnio>0?GLIM_GREEN:GLIM_TEXT, letterSpacing:"-0.02em" }}>{fmt(ahorroAnio)}</p>
          <p style={{ margin:"3px 0 0", fontSize:11, color:ahorroAnio>0?GLIM_GREEN:GLIM_MUTED }}>{empleados} empleado{empleados!==1?"s":""} × 12 meses</p>
        </div>
      </div>

      {excede40 && (
        <div style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:12, padding:"10px 16px", marginBottom:"1rem" }}>
          <p style={{ margin:0, fontSize:13, color:DANGER_COLOR }}>Los beneficios configurados ({fmtPct(pct40)}) superan el límite del 40% — Art. 30, Ley 1393/2010.</p>
        </div>
      )}

      <p style={{ fontSize:11, color:"rgba(255,255,255,0.2)", textAlign:"center", margin:0 }}>
        Estimación orientativa · Brick Abogados oct. 2025 · UVT 2026: $52.374 · SMMLV 2026: $2.000.000
      </p>
    </div>
  );
}
