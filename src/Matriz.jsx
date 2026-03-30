import { useState } from "react";

const UVT = 52374;
const uvt = (n) => `$${(n * UVT).toLocaleString("es-CO")}`;

const data = [
  {
    producto: "Alimentación", emoji: "🍽️", color: "emerald",
    constituyeSalario: false, gravadoEmpleado: false, retencionFuente: false, deducibleEmpresa: true,
    normaLaboral: "Art. 128 CST / Art. 30 Ley 1393/2010",
    normaTributaria: "Art. 387-1 ET / Decreto 1345/1999",
    tope: `Hasta 41 UVT/mes (${uvt(41)}). Salario ≤ 310 UVT (${uvt(310)}). No superar el 40% del salario total.`,
    requisito: "Tarjeta restringida a MCC de alimentación. Glim debe ser administrador independiente con objeto social principal en esta actividad (Decreto 1345/1999).",
    mcc: "Supermercados, restaurantes, tiendas de barrio, domicilios",
    soporte: "Factura Glim + Certificación contador + Reporte de transacciones + Facturas consumo final",
    ahorro: "Sí — base principal para recomposición salarial",
  },
  {
    producto: "Movilidad", emoji: "🚗", color: "sky",
    constituyeSalario: false, gravadoEmpleado: false, retencionFuente: false, deducibleEmpresa: true,
    normaLaboral: "Art. 128 CST / Concepto DIAN 19952 jul. 30/1987 / Art. 10 Decreto 535/1987",
    normaTributaria: "Art. 1.2.4.7 DUR 1625/2016",
    tope: "Sin límite UVT específico. Solo aplica si el empleado requiere transporte para su trabajo (rodamiento). Límite global: 40%.",
    requisito: "No sujeto a retención si se entregan facturas al pagador (Concepto DIAN 19952/1987). Para deducibilidad, la factura debe estar a nombre de la empresa (Art. 10 Decreto 535/1987).",
    mcc: "Gasolina, parqueaderos, talleres, Uber/Cabify/taxis, buses y trenes, alquiler de carros",
    soporte: "Certificación Glim + Reporte de transacciones + Facturas a nombre de la empresa",
    ahorro: "Sí — no impacta base prestacional ni seguridad social",
  },
  {
    producto: "Dotación", emoji: "👔", color: "rose",
    constituyeSalario: false, gravadoEmpleado: false, retencionFuente: false, deducibleEmpresa: true,
    normaLaboral: "Arts. 230-234 CST / Concepto MPS 203/2006",
    normaTributaria: "Prestación social — no gravable (no es ingreso del trabajador)",
    tope: "Trabajadores con salario ≤ 2 SMMLV ($2.000.000). Obligación cuatrimestral: 30 abr / 31 ago / 20 dic.",
    requisito: "Está PROHIBIDO realizar la entrega de dotación pagando el equivalente en efectivo (Art. 232 CST). La entrega mediante tarjeta restringida a vestuario/calzado es válida (Concepto MPS 203/2006).",
    mcc: "Almacenes de ropa, zapatos, uniformes, accesorios laborales",
    soporte: "Nómina electrónica + Certificación Glim + Reporte de transacciones",
    ahorro: "Sí — obligación legal cumplida sin carga salarial",
  },
  {
    producto: "Educación y Capacitación", emoji: "📚", color: "indigo",
    constituyeSalario: false, gravadoEmpleado: false, retencionFuente: false, deducibleEmpresa: true,
    normaLaboral: "Art. 128 CST / Art. 30 Ley 1393/2010",
    normaTributaria: "Art. 107-2 ET (becas, créditos condonables, centros educativos)",
    tope: "Para aplicar exención del Art. 107-2 ET: (a) becas o créditos condonables; (b) centros desarrollo infantil hijos <7 años; (c) aportes a instituciones reconocidas por MinEducación.",
    requisito: "No gravable si cumple Art. 107-2 ET. Si el pago es para cursos de libre elección sin estructura de beca, puede ser pago en especie gravable (Art. 29-1 ET).",
    mcc: "Universidades, colegios, Coursera/Udemy, cursos online, librerías",
    soporte: "Certificación Glim + Política interna de capacitación + Facturas de la institución + Reporte de transacciones",
    ahorro: "Sí — no gravable bajo supuestos del Art. 107-2 ET",
  },
  {
    producto: "Viáticos Accidentales", emoji: "✈️", color: "violet",
    constituyeSalario: false, gravadoEmpleado: false, retencionFuente: false, deducibleEmpresa: true,
    normaLaboral: "Art. 130 CST (requerimientos extraordinarios, poco frecuentes)",
    normaTributaria: "Art. 1.2.4.7 DUR 1625/2016",
    tope: "Sin límite UVT. Debe ser puntual (<180 días/año). Cubre: manutención, alojamiento, transporte y gastos de representación.",
    requisito: "Certificación Glim + reporte de transacciones + facturas del consumo final = soporte suficiente ante DIAN.",
    mcc: "Aerolíneas, hoteles, restaurantes, transporte terrestre, agencias de viajes",
    soporte: "Factura Glim (ingresos para terceros) + Certificación contador + Reporte de transacciones + Facturas consumo final",
    ahorro: "Sí — no es ingreso ni salario, 100% deducible",
  },
  {
    producto: "Guarderías y Cuidado", emoji: "👶", color: "pink",
    constituyeSalario: false, gravadoEmpleado: false, retencionFuente: false, deducibleEmpresa: true,
    normaLaboral: "Art. 128 CST / Art. 30 Ley 1393/2010",
    normaTributaria: "Art. 107-2 ET lit. b): centros de desarrollo integral para hijos <7 años NO son pagos indirectos gravables.",
    tope: "Exención para hijos menores de 7 años en programas establecidos por la empresa. Para otros casos, aplica Art. 29-1 ET (gravable).",
    requisito: "El programa debe estar formalmente establecido por la empresa. Si se usa sin programa empresarial estructurado, puede ser gravable.",
    mcc: "Guarderías, jardines infantiles, centros de estimulación, niñeras, actividades extracurriculares",
    soporte: "Política del programa empresarial + Certificación Glim + Reporte de transacciones + Facturas del centro",
    ahorro: "Sí (menores de 7 años con programa empresarial — Art. 107-2 ET)",
  },
  {
    producto: "Salud y Bienestar", emoji: "🏥", color: "teal",
    constituyeSalario: false, gravadoEmpleado: true, retencionFuente: true, deducibleEmpresa: true,
    normaLaboral: "Art. 128 CST / Art. 30 Ley 1393/2010",
    normaTributaria: "Art. 29-1 ET (pago en especie gravable). Excepción parcial: Art. 107-2 ET para programas de salud.",
    tope: "Límite global: 40% de la remuneración total.",
    requisito: "Deducible para la empresa y no es salario prestacional, pero SÍ es ingreso gravable para el empleado. Incluir en retención en la fuente y nómina electrónica.",
    mcc: "Gimnasios, spas, farmacias, hospitales, centros médicos, psicólogos/terapeutas",
    soporte: "Certificación Glim + Nómina electrónica + Reporte de transacciones",
    ahorro: "Parcial — deducible empresa; gravado empleado",
  },
  {
    producto: "Trabajo Remoto", emoji: "💻", color: "slate",
    constituyeSalario: false, gravadoEmpleado: true, retencionFuente: true, deducibleEmpresa: true,
    normaLaboral: "Art. 128 CST / Ley 2121/2021 (Trabajo en Casa) / Ley 1221/2008 (Teletrabajo)",
    normaTributaria: "Art. 29-1 ET (pago en especie gravable). Sin exención expresa para home office.",
    tope: "Límite global: 40% de la remuneración total.",
    requisito: "Gravable para el empleado. Alternativa: estructurar como reembolso con facturas a nombre de la empresa para excluirlo del ingreso del trabajador.",
    mcc: "Internet, telecomunicaciones, servicios domésticos, muebles de oficina, tecnología",
    soporte: "Certificación Glim + Facturas a nombre de la empresa + Nómina electrónica + Reporte de transacciones",
    ahorro: "Parcial — deducible empresa; gravado empleado (salvo reembolso documentado)",
  },
  {
    producto: "Viáticos Permanentes (Manut./Alojam.)", emoji: "🏨", color: "amber",
    constituyeSalario: true, gravadoEmpleado: true, retencionFuente: true, deducibleEmpresa: true,
    normaLaboral: "Art. 130 CST — manutención y alojamiento habituales SÍ son salario.",
    normaTributaria: "Art. 1.2.4.7 DUR 1625/2016. Al ser salario, sujetos a retención.",
    tope: "Permanentes cuando superan 180 días/año. El componente de transporte y representación NO es salario.",
    requisito: "Incluir en base de liquidación de prestaciones sociales, seguridad social y parafiscales. Distinguir componente salarial del no salarial.",
    mcc: "Hoteles, restaurantes, transporte (con distinción por componente)",
    soporte: "Nómina electrónica + Certificación Glim + Reporte de transacciones + Facturas de consumo",
    ahorro: "No en componente salarial — sí en transporte/representación",
  },
  {
    producto: "Rewards (Reconocimientos e Incentivos)", emoji: "🎁", color: "orange",
    constituyeSalario: false, gravadoEmpleado: true, retencionFuente: true, deducibleEmpresa: true,
    normaLaboral: "Art. 128 CST — no son salario si son ocasionales y por mera liberalidad.",
    normaTributaria: "Art. 29-1 ET (pago en especie gravable para el empleado).",
    tope: "Debe ser OCASIONAL (no periódico ni habitual). Si se vuelve recurrente, pierde la naturaleza no salarial. Límite global 40%.",
    requisito: "Deducible para la empresa, no es salario, pero SÍ es ingreso gravable para el empleado. Requiere soporte del carácter ocasional.",
    mcc: "Uso libre — sin restricciones (toda la red Mastercard)",
    soporte: "Política/acta interna + Certificación Glim + Nómina electrónica + Reporte de transacciones",
    ahorro: "Parcial — deducible empresa; gravado empleado",
  },
  {
    producto: "Mascotas", emoji: "🐾", color: "lime",
    constituyeSalario: false, gravadoEmpleado: true, retencionFuente: true, deducibleEmpresa: true,
    normaLaboral: "Art. 128 CST — beneficio extralegal por mera liberalidad.",
    normaTributaria: "Art. 29-1 ET — pago en especie gravable. Sin exención expresa.",
    tope: "Límite global: 40% de la remuneración total.",
    requisito: "Deducible para la empresa y no es salario prestacional, pero SÍ es ingreso gravable para el empleado. Incluir en retención en la fuente y nómina electrónica.",
    mcc: "Veterinarias, pet shops, clínicas veterinarias, peluquerías caninas",
    soporte: "Certificación Glim + Nómina electrónica + Reporte de transacciones",
    ahorro: "Parcial — deducible empresa; gravado empleado",
  },
  {
    producto: "Entretenimiento", emoji: "🎬", color: "fuchsia",
    constituyeSalario: false, gravadoEmpleado: true, retencionFuente: true, deducibleEmpresa: true,
    normaLaboral: "Art. 128 CST — beneficio extralegal.",
    normaTributaria: "Art. 29-1 ET — pago en especie gravable. Sin exención expresa.",
    tope: "Límite global: 40% de la remuneración total.",
    requisito: "Deducible para la empresa y no es salario prestacional, pero SÍ es ingreso gravable para el empleado. No confundir con gastos de representación.",
    mcc: "Cines, teatro, eventos, gaming, deportes, conciertos, streaming",
    soporte: "Certificación Glim + Nómina electrónica + Reporte de transacciones",
    ahorro: "Parcial — deducible empresa; gravado empleado",
  },
];

const G = "#00C37A", DARK = "#0F1117", CARD = "#1A1D27", CARD2 = "#22263A";
const BORDER = "rgba(255,255,255,0.08)", MUTED = "rgba(255,255,255,0.45)";

const colorAccent = {
  emerald:"#10b981", sky:"#0ea5e9", rose:"#f43f5e", indigo:"#6366f1",
  violet:"#8b5cf6", pink:"#ec4899", teal:"#14b8a6", slate:"#64748b",
  amber:"#f59e0b", orange:"#f97316", lime:"#84cc16", fuchsia:"#d946ef",
};

const Yes = () => <span style={{padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:600,background:"rgba(0,195,122,0.12)",color:"#00C37A"}}>✔ Sí</span>;
const No  = () => <span style={{padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:600,background:"rgba(239,68,68,0.1)",color:"#f87171"}}>✘ No</span>;

const tabs = ["Resumen", "Pacto Colectivo", "Comp. Flexible", "Motor IA", "Documentación", "Comercios MCC"];
const filters = ["Todos", "Sin carga empleado", "Con carga empleado"];

const compData = [
  { label:"Seguridad Social", pct:"12,522%", base:626100, flex:532185 },
  { label:"Vacaciones",       pct:"4,170%",  base:208500, flex:177225 },
  { label:"Cesantías e int.", pct:"9,330%",  base:466500, flex:396525 },
  { label:"Prima de serv.",   pct:"8,330%",  base:416500, flex:354025 },
  { label:"Parafiscales",     pct:"4,000%",  base:200000, flex:170000 },
];
const fmt = (n) => "$" + n.toLocaleString("es-CO");

const s = {
  page:  { background:DARK, minHeight:"100vh", padding:"1.25rem 1rem", fontFamily:"Inter, system-ui, sans-serif", color:"#fff" },
  card:  { background:CARD, border:`1px solid ${BORDER}`, borderRadius:16, padding:"1.25rem 1.5rem", marginBottom:"1rem" },
  label: { fontSize:11, fontWeight:500, color:MUTED, textTransform:"uppercase", letterSpacing:"0.07em", display:"block", marginBottom:6 },
  th:    { fontSize:11, fontWeight:500, color:MUTED, textTransform:"uppercase", letterSpacing:"0.06em", padding:"0 0 10px", borderBottom:`1px solid ${BORDER}` },
  td:    { padding:"9px 0", color:"rgba(255,255,255,0.7)", borderBottom:`1px solid ${BORDER}`, fontSize:13 },
};

export default function Matriz() {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("Resumen");
  const [filter, setFilter] = useState("Todos");

  const filtered = data.filter(r => {
    if (filter === "Sin carga empleado") return !r.gravadoEmpleado;
    if (filter === "Con carga empleado") return r.gravadoEmpleado;
    return true;
  });

  return (
    <div style={s.page}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
        <div style={{ width:28, height:28, borderRadius:8, background:G, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ color:DARK, fontWeight:700, fontSize:14 }}>G</span>
        </div>
        <span style={{ fontSize:15, fontWeight:600, letterSpacing:"-0.01em" }}>glim</span>
        <span style={{ fontSize:13, color:MUTED, marginLeft:8 }}>/ Matriz Tributaria y Laboral</span>
        <a href="/" style={{ marginLeft:"auto", fontSize:12, color:G, textDecoration:"none", padding:"4px 12px", border:`1px solid rgba(0,195,122,0.3)`, borderRadius:8 }}>← Calculadora</a>
      </div>
      <h1 style={{ margin:"4px 0 2px", fontSize:20, fontWeight:600, letterSpacing:"-0.02em" }}>12 Beneficios Glim — Marco Legal</h1>
      <p style={{ margin:"0 0 1.25rem", fontSize:12, color:MUTED }}>Normativa colombiana 2026 · Brick Abogados (oct. 2025) · UVT 2026: $52.374 · Res. DIAN 000238/2025</p>

      <div style={{ display:"flex", gap:6, marginBottom:"1rem", flexWrap:"wrap" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => { setActiveTab(t); setSelected(null); }}
            style={{ padding:"6px 14px", borderRadius:8, fontSize:12, fontWeight:500, cursor:"pointer", border:"none",
              background: activeTab===t ? G : "rgba(255,255,255,0.07)",
              color: activeTab===t ? DARK : "rgba(255,255,255,0.7)",
            }}>{t}</button>
        ))}
      </div>

      {activeTab === "Resumen" && (
        <>
          <div style={{ display:"flex", gap:6, marginBottom:"0.75rem", flexWrap:"wrap" }}>
            {filters.map(f => (
              <button key={f} onClick={() => { setFilter(f); setSelected(null); }}
                style={{ padding:"4px 12px", borderRadius:20, fontSize:11, fontWeight:500, cursor:"pointer",
                  border:`1px solid ${filter===f ? G : BORDER}`,
                  background: filter===f ? "rgba(0,195,122,0.12)" : "transparent",
                  color: filter===f ? G : MUTED,
                }}>{f}</button>
            ))}
          </div>
          <div style={{ ...s.card, padding:0, overflow:"hidden" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr style={{ background:"rgba(255,255,255,0.03)" }}>
                  <th style={{ ...s.th, textAlign:"left", padding:"12px 16px" }}>Beneficio</th>
                  <th style={{ ...s.th, textAlign:"center", padding:"12px 8px" }}>¿Salario?</th>
                  <th style={{ ...s.th, textAlign:"center", padding:"12px 8px" }}>¿Gravado empleado?</th>
                  <th style={{ ...s.th, textAlign:"center", padding:"12px 8px" }}>¿Retención?</th>
                  <th style={{ ...s.th, textAlign:"center", padding:"12px 8px" }}>¿Deducible?</th>
                  <th style={{ ...s.th, textAlign:"center", padding:"12px 8px" }}>Detalle</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => {
                  const idx = data.indexOf(row);
                  const acc = colorAccent[row.color] || G;
                  const isOpen = selected === idx;
                  return (
                    <>
                      <tr key={idx} style={{ borderTop:`1px solid ${BORDER}`, cursor:"pointer", background: isOpen ? "rgba(255,255,255,0.03)" : "transparent" }}
                        onClick={() => setSelected(isOpen ? null : idx)}>
                        <td style={{ padding:"10px 16px", fontWeight:500 }}><span style={{ marginRight:8 }}>{row.emoji}</span>{row.producto}</td>
                        <td style={{ textAlign:"center", padding:"10px 8px" }}>{row.constituyeSalario ? <Yes/> : <No/>}</td>
                        <td style={{ textAlign:"center", padding:"10px 8px" }}>{row.gravadoEmpleado ? <Yes/> : <No/>}</td>
                        <td style={{ textAlign:"center", padding:"10px 8px" }}>{row.retencionFuente ? <Yes/> : <No/>}</td>
                        <td style={{ textAlign:"center", padding:"10px 8px" }}>{row.deducibleEmpresa ? <Yes/> : <No/>}</td>
                        <td style={{ textAlign:"center", padding:"10px 8px" }}>
                          <span style={{ padding:"3px 10px", borderRadius:8, fontSize:11, fontWeight:500, background:"rgba(255,255,255,0.08)", color: acc }}>{isOpen ? "▲" : "▼ Ver"}</span>
                        </td>
                      </tr>
                      {isOpen && (
                        <tr key={`d${idx}`}>
                          <td colSpan={6} style={{ padding:"16px 20px", background:"rgba(255,255,255,0.02)", borderTop:`1px solid ${BORDER}` }}>
                            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:12 }}>
                              <div><p style={{ ...s.label, marginBottom:4 }}>Norma Laboral</p><p style={{ margin:0, fontSize:13, color:"rgba(255,255,255,0.75)" }}>{row.normaLaboral}</p></div>
                              <div><p style={{ ...s.label, marginBottom:4 }}>Norma Tributaria</p><p style={{ margin:0, fontSize:13, color:"rgba(255,255,255,0.75)" }}>{row.normaTributaria}</p></div>
                            </div>
                            <div style={{ marginBottom:10 }}><p style={{ ...s.label, marginBottom:4 }}>Tope / Condición</p><p style={{ margin:0, fontSize:13, color:"rgba(255,255,255,0.75)" }}>{row.tope}</p></div>
                            <div style={{ background:CARD2, border:`1px solid rgba(255,255,255,0.1)`, borderRadius:10, padding:"10px 14px", marginBottom:8 }}>
                              <p style={{ ...s.label, marginBottom:4 }}>⚠️ Requisito clave</p>
                              <p style={{ margin:0, fontSize:13, color:"rgba(255,255,255,0.75)" }}>{row.requisito}</p>
                            </div>
                            <div style={{ background:CARD2, borderRadius:10, padding:"10px 14px" }}>
                              <p style={{ ...s.label, marginBottom:4 }}>💡 Potencial de ahorro</p>
                              <p style={{ margin:0, fontSize:13, color:"rgba(255,255,255,0.75)" }}>{row.ahorro}</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
            <div style={{ background:"rgba(0,195,122,0.06)", border:"1px solid rgba(0,195,122,0.2)", borderRadius:12, padding:"12px 16px" }}>
              <p style={{ margin:"0 0 4px", fontSize:12, fontWeight:600, color:G }}>✅ Sin carga tributaria para el empleado</p>
              <p style={{ margin:0, fontSize:12, color:"rgba(255,255,255,0.55)" }}>Alimentación · Movilidad · Dotación · Educación · Viáticos Accidentales · Guarderías (menores 7 años)</p>
            </div>
            <div style={{ background:"rgba(245,158,11,0.06)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:12, padding:"12px 16px" }}>
              <p style={{ margin:"0 0 4px", fontSize:12, fontWeight:600, color:"#f59e0b" }}>⚠️ Con ingreso gravable para el empleado</p>
              <p style={{ margin:0, fontSize:12, color:"rgba(255,255,255,0.55)" }}>Salud · Trabajo Remoto · Viáticos Permanentes · Rewards · Mascotas · Entretenimiento</p>
            </div>
          </div>
          <div style={{ background:"rgba(245,158,11,0.06)", border:"1px solid rgba(245,158,11,0.25)", borderRadius:12, padding:"12px 16px" }}>
            <p style={{ margin:"0 0 4px", fontSize:13, fontWeight:600, color:"#f59e0b" }}>⚖️ Regla del 40% — Art. 30, Ley 1393/2010</p>
            <p style={{ margin:0, fontSize:12, color:"rgba(255,255,255,0.6)" }}>El conjunto de todos los pagos no constitutivos de salario no puede superar el 40% de la remuneración total del trabajador.</p>
          </div>
        </>
      )}

      {activeTab === "Pacto Colectivo" && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ ...s.card, background:"#111827" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
              <span style={{ fontSize:28 }}>📜</span>
              <div>
                <p style={{ margin:0, fontSize:16, fontWeight:600 }}>Pacto Colectivo — La excepción más poderosa</p>
                <p style={{ margin:0, fontSize:12, color:MUTED }}>Art. 29-1 ET, Parágrafo 1° / Art. 128 CST</p>
              </div>
            </div>
            <p style={{ margin:0, fontSize:13, color:"rgba(255,255,255,0.7)", lineHeight:1.6 }}>Cuando los beneficios están amparados en un pacto colectivo o convención colectiva, los pagos en especie efectuados a terceras personas <strong style={{color:"#fff"}}>dejan de ser ingreso gravable para el empleado</strong>, independientemente de los topes de UVT o de si el beneficio normalmente sería gravable.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <div style={{ ...s.card, background:"rgba(0,195,122,0.05)", border:"1px solid rgba(0,195,122,0.2)" }}>
              <p style={{ margin:"0 0 8px", fontSize:13, fontWeight:600, color:G }}>✅ Qué CAMBIA con el pacto colectivo</p>
              {["Beneficios gravables (Salud, Trabajo Remoto, Mascotas, Entretenimiento, Rewards, Guarderías) → dejan de ser ingreso gravable","Límite de 310 UVT de salario para alimentación → deja de aplicar","Topes de UVT por categoría → dejan de aplicar","Limitaciones de los Arts. 387-1 y 107-2 ET → no aplican"].map((t,i)=>(
                <p key={i} style={{ margin:"0 0 4px", fontSize:12, color:"rgba(255,255,255,0.65)" }}>• {t}</p>
              ))}
            </div>
            <div style={{ ...s.card, background:"rgba(255,255,255,0.02)" }}>
              <p style={{ margin:"0 0 8px", fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.8)" }}>⚠️ Qué NO cambia</p>
              {["Deducibilidad para la empresa — sigue igual (Art. 107 ET)","Regla del 40% no salarial (Art. 30, Ley 1393/2010)","Documentación de Glim (factura, certificación, reporte)","El pacto debe contemplar expresamente cada beneficio"].map((t,i)=>(
                <p key={i} style={{ margin:"0 0 4px", fontSize:12, color:"rgba(255,255,255,0.55)" }}>• {t}</p>
              ))}
            </div>
          </div>
          <div style={{ ...s.card, padding:0, overflow:"hidden" }}>
            <div style={{ padding:"12px 16px", background:"rgba(255,255,255,0.03)", borderBottom:`1px solid ${BORDER}` }}>
              <p style={{ margin:0, fontSize:13, fontWeight:500 }}>Impacto por beneficio: sin pacto vs. con pacto colectivo</p>
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead>
                <tr style={{ background:"rgba(255,255,255,0.02)" }}>
                  {["Beneficio","Sin pacto — empleado","Con pacto — empleado","Empresa (ambos casos)"].map(h=>(
                    <th key={h} style={{ ...s.th, padding:"10px 12px", textAlign: h==="Beneficio"?"left":"center" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { e:"🍽️", b:"Alimentación",     sin:"No gravable (tope 41 UVT / sal. ≤310 UVT)", con:"No gravable — SIN topes de UVT", h:false },
                  { e:"🚗", b:"Movilidad",         sin:"No gravable", con:"No gravable (reforzado)", h:false },
                  { e:"👔", b:"Dotación",          sin:"No gravable", con:"No gravable (reforzado)", h:false },
                  { e:"📚", b:"Educación",         sin:"No gravable (bajo Art. 107-2 ET)", con:"No gravable — sin condiciones", h:false },
                  { e:"✈️", b:"Viáticos accid.",  sin:"No gravable", con:"No gravable (reforzado)", h:false },
                  { e:"👶", b:"Guarderías",        sin:"No gravable (programa empresarial)", con:"No gravable — sin condición de edad", h:true },
                  { e:"🏥", b:"Salud y Bienestar", sin:"⚠️ Gravable", con:"✅ No gravable", h:true },
                  { e:"💻", b:"Trabajo Remoto",    sin:"⚠️ Gravable", con:"✅ No gravable", h:true },
                  { e:"🎁", b:"Rewards",           sin:"⚠️ Gravable", con:"✅ No gravable", h:true },
                  { e:"🐾", b:"Mascotas",          sin:"⚠️ Gravable", con:"✅ No gravable", h:true },
                  { e:"🎬", b:"Entretenimiento",   sin:"⚠️ Gravable", con:"✅ No gravable", h:true },
                  { e:"🏨", b:"Viáticos perm.",    sin:"⚠️ Constituye salario", con:"⚠️ Sigue siendo salario*", h:false },
                ].map((row,i)=>(
                  <tr key={i} style={{ borderTop:`1px solid ${BORDER}`, background: row.h ? "rgba(0,195,122,0.04)" : "transparent" }}>
                    <td style={{ padding:"8px 12px", fontWeight:500 }}><span style={{ marginRight:6 }}>{row.e}</span>{row.b}</td>
                    <td style={{ textAlign:"center", padding:"8px 12px", color:"rgba(255,255,255,0.6)" }}>{row.sin}</td>
                    <td style={{ textAlign:"center", padding:"8px 12px", fontWeight:row.h?500:400, color:row.h?G:"rgba(255,255,255,0.6)" }}>{row.con}</td>
                    <td style={{ textAlign:"center", padding:"8px 12px", color:G, fontWeight:500 }}>Deducible</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding:"8px 16px", background:"rgba(255,255,255,0.02)", borderTop:`1px solid ${BORDER}` }}>
              <p style={{ margin:0, fontSize:11, color:MUTED }}>* Los viáticos permanentes de manutención y alojamiento constituyen salario por su naturaleza retributiva (Art. 130 CST).</p>
            </div>
          </div>
          <div style={{ background:"rgba(245,158,11,0.06)", border:"1px solid rgba(245,158,11,0.25)", borderRadius:12, padding:"12px 16px" }}>
            <p style={{ margin:"0 0 4px", fontSize:13, fontWeight:600, color:"#f59e0b" }}>📌 Requisito esencial</p>
            <p style={{ margin:0, fontSize:12, color:"rgba(255,255,255,0.65)", lineHeight:1.6 }}>El pacto colectivo debe contemplar expresamente cada beneficio: identificar el auxilio reconocido, su monto o condiciones, y la voluntad expresa de las partes de que no constituya salario ni ingreso gravable. Se requiere asesoría jurídica laboral para su correcta redacción.</p>
          </div>
        </div>
      )}

      {activeTab === "Comp. Flexible" && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={s.card}>
            <p style={{ margin:"0 0 8px", fontSize:15, fontWeight:600 }}>¿Qué es la Compensación Flexible?</p>
            <p style={{ margin:"0 0 12px", fontSize:13, color:"rgba(255,255,255,0.7)", lineHeight:1.6 }}>Es una figura que permite recomponer la remuneración de un trabajador entre pagos salariales y no salariales. Los pagos que no constituyen salario no se toman en cuenta para el cálculo, deducción y aporte a la seguridad social, las prestaciones sociales y los parafiscales.</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <div style={{ background:"rgba(59,130,246,0.07)", border:"1px solid rgba(59,130,246,0.2)", borderRadius:10, padding:"12px 14px" }}>
                <p style={{ margin:"0 0 4px", fontSize:11, fontWeight:600, color:"#60a5fa", textTransform:"uppercase", letterSpacing:"0.06em" }}>Art. 128 CST</p>
                <p style={{ margin:0, fontSize:12, color:"rgba(255,255,255,0.65)", lineHeight:1.5 }}>No constituyen salario los beneficios o auxilios habituales acordados convencional o contractualmente u otorgados en forma extralegal por el empleador, cuando las partes lo hayan dispuesto expresamente.</p>
              </div>
              <div style={{ background:"rgba(245,158,11,0.07)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:10, padding:"12px 14px" }}>
                <p style={{ margin:"0 0 4px", fontSize:11, fontWeight:600, color:"#f59e0b", textTransform:"uppercase", letterSpacing:"0.06em" }}>Art. 30 Ley 1393/2010</p>
                <p style={{ margin:0, fontSize:12, color:"rgba(255,255,255,0.65)", lineHeight:1.5 }}>Los pagos laborales no constitutivos de salario de los trabajadores particulares no podrán ser superiores al 40% del total de la remuneración.</p>
              </div>
            </div>
          </div>
          <div style={s.card}>
            <p style={{ margin:"0 0 16px", fontSize:15, fontWeight:600 }}>📊 Ejemplo: Ahorro con Alimentación al 15%</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:16 }}>
              {[
                { label:"Salario original", val:"$5.000.000", color:"rgba(255,255,255,0.8)" },
                { label:"🍽️ Alimentación (15%)", val:"$750.000", color:G },
                { label:"Nuevo salario base", val:"$4.250.000", color:"#60a5fa" },
              ].map((c,i)=>(
                <div key={i} style={{ background:CARD2, borderRadius:10, padding:"12px", textAlign:"center" }}>
                  <p style={{ margin:"0 0 4px", fontSize:11, color:MUTED, textTransform:"uppercase", letterSpacing:"0.06em" }}>{c.label}</p>
                  <p style={{ margin:0, fontSize:20, fontWeight:700, color:c.color }}>{c.val}</p>
                </div>
              ))}
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, marginBottom:16 }}>
              <thead>
                <tr>
                  {["Concepto","%","Sin beneficio","Con beneficio"].map(h=>(
                    <th key={h} style={{ ...s.th, textAlign:h==="Concepto"?"left":"right", padding:"0 0 10px" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compData.map((r,i)=>(
                  <tr key={i}>
                    <td style={s.td}>{r.label}</td>
                    <td style={{ ...s.td, textAlign:"right", color:MUTED }}>{r.pct}</td>
                    <td style={{ ...s.td, textAlign:"right" }}>{fmt(r.base)}</td>
                    <td style={{ ...s.td, textAlign:"right" }}>{fmt(r.flex)}</td>
                  </tr>
                ))}
                <tr style={{ borderTop:`2px solid rgba(255,255,255,0.15)` }}>
                  <td style={{ padding:"10px 0", fontWeight:600, fontSize:13 }} colSpan={2}>Carga prestacional total</td>
                  <td style={{ textAlign:"right", padding:"10px 0", fontWeight:600, fontSize:13 }}>{fmt(1917600)}</td>
                  <td style={{ textAlign:"right", padding:"10px 0", fontWeight:600, fontSize:13 }}>{fmt(1629960)}</td>
                </tr>
              </tbody>
            </table>
            <div style={{ background:"rgba(0,195,122,0.1)", border:"1px solid rgba(0,195,122,0.3)", borderRadius:12, padding:"16px 20px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <p style={{ margin:"0 0 2px", fontSize:11, color:G, textTransform:"uppercase", letterSpacing:"0.06em" }}>Ahorro mensual por empleado</p>
                <p style={{ margin:0, fontSize:28, fontWeight:700, color:G }}>$287.640</p>
              </div>
              <div style={{ textAlign:"right" }}>
                <p style={{ margin:"0 0 2px", fontSize:11, color:G, textTransform:"uppercase", letterSpacing:"0.06em" }}>Equivale anualmente a</p>
                <p style={{ margin:0, fontSize:22, fontWeight:700, color:G }}>$3.451.680</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Motor IA" && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ ...s.card, background:"#111827" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
              <span style={{ fontSize:28 }}>🤖</span>
              <div>
                <p style={{ margin:0, fontSize:16, fontWeight:600 }}>Motor de IA para Control de Cumplimiento</p>
                <p style={{ margin:0, fontSize:12, color:MUTED }}>La ventaja tecnológica que diferencia a Glim en el mercado</p>
              </div>
            </div>
            <p style={{ margin:0, fontSize:13, color:"rgba(255,255,255,0.7)", lineHeight:1.6 }}>Mientras la competencia depende únicamente del código MCC de Mastercard para validar transacciones, Glim opera un motor de inteligencia artificial propio que enriquece cada validación con múltiples capas de información — maximizando las aprobaciones válidas sin comprometer el cumplimiento tributario.</p>
          </div>
          <div style={{ background:"rgba(239,68,68,0.07)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:12, padding:"12px 16px" }}>
            <p style={{ margin:"0 0 6px", fontSize:13, fontWeight:600, color:"#f87171" }}>⚠️ El problema de depender solo del MCC</p>
            <p style={{ margin:0, fontSize:13, color:"rgba(255,255,255,0.65)", lineHeight:1.6 }}>Los códigos MCC (Merchant Category Codes) de Mastercard tienen una limitación conocida: <strong style={{color:"rgba(255,255,255,0.85)"}}>muchos comercios tienen un código incorrecto o desactualizado</strong>. Esto genera falsos rechazos de transacciones válidas, frustrando al empleado, o puede aprobar usos incorrectos. Ninguna plataforma que dependa solo del MCC puede garantizar ni máxima cobertura ni cumplimiento real.</p>
          </div>
          <div style={s.card}>
            <p style={{ margin:"0 0 12px", fontSize:14, fontWeight:600 }}>🔍 Capas de validación del Motor IA de Glim</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {[
                { icon:"🔍", title:"Clasificación multicapa", desc:"Señales adicionales al MCC que permiten identificar correctamente el tipo de comercio y el destino del gasto.", badge:"Motor propio", bc:"rgba(0,195,122,0.15)", tc:G },
                { icon:"🧠", title:"Aprendizaje continuo", desc:"Cada transacción procesada mejora la capacidad de clasificación futura del sistema.", badge:"IA", bc:"rgba(139,92,246,0.15)", tc:"#a78bfa" },
                { icon:"👨‍💻", title:"Intervención experta", desc:"El equipo de Glim puede forzar reglas manualmente para casos específicos, complementando la automatización.", badge:"Híbrido", bc:"rgba(59,130,246,0.15)", tc:"#60a5fa" },
                { icon:"📊", title:"Trazabilidad total", desc:"Cada transacción queda registrada con su clasificación, garantizando el soporte ante DIAN y UGPP.", badge:"Cumplimiento", bc:"rgba(245,158,11,0.15)", tc:"#f59e0b" },
              ].map((item,i)=>(
                <div key={i} style={{ background:CARD2, borderRadius:12, padding:"12px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                    <span style={{ fontSize:18 }}>{item.icon}</span>
                    <span style={{ fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:20, background:item.bc, color:item.tc }}>{item.badge}</span>
                  </div>
                  <p style={{ margin:"0 0 4px", fontSize:13, fontWeight:500 }}>{item.title}</p>
                  <p style={{ margin:0, fontSize:12, color:MUTED, lineHeight:1.4 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={s.card}>
            <p style={{ margin:"0 0 12px", fontSize:14, fontWeight:600 }}>⚡ ¿Cómo funciona en tiempo real?</p>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[
                { n:"1", color:"#3b82f6", title:"Transacción iniciada", desc:"El empleado paga con su tarjeta Glim en un comercio." },
                { n:"2", color:"#8b5cf6", title:"Validación multicapa", desc:"El motor IA analiza simultáneamente MCC, nombre del comercio, descripción y datos de Google Maps." },
                { n:"3", color:"#f59e0b", title:"Primera transacción incierta", desc:"Si no hay suficiente información, puede generarse un primer intento fallido mientras el sistema completa las validaciones adicionales." },
                { n:"4", color:G,         title:"Aprendizaje y aprobación", desc:"El motor aprende de la validación y ya puede aprobar transacciones similares en el futuro. El equipo Glim también puede forzar reglas manualmente." },
              ].map((item,i)=>(
                <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", paddingBottom:10, borderBottom: i<3 ? `1px solid ${BORDER}` : "none" }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", background:item.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, flexShrink:0 }}>{item.n}</div>
                  <div>
                    <p style={{ margin:"0 0 2px", fontSize:13, fontWeight:500 }}>{item.title}</p>
                    <p style={{ margin:0, fontSize:12, color:MUTED, lineHeight:1.4 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={s.card}>
            <p style={{ margin:"0 0 12px", fontSize:14, fontWeight:600 }}>🏆 Glim vs. Competencia</p>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead>
                <tr style={{ background:"rgba(255,255,255,0.03)" }}>
                  {["Capacidad","Competencia tradicional","Glim"].map(h=>(
                    <th key={h} style={{ ...s.th, padding:"8px 12px", textAlign:h==="Capacidad"?"left":"center" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Validación por MCC","✔ Sí","✔ Sí (como base)"],
                  ["Validación por nombre de comercio","✘ No","✔ Sí"],
                  ["Análisis de descripción de transacción","✘ No","✔ Sí"],
                  ["Enriquecimiento con Google Maps","✘ No","✔ Sí"],
                  ["Aprendizaje automático","✘ No","✔ Sí"],
                  ["Reglas manuales por el equipo","Limitado","✔ Sí"],
                  ["Falsos rechazos por MCC erróneo","Frecuentes","Minimizados"],
                  ["Cobertura de comercios válidos","Restringida al catálogo MCC","Máxima dentro de la ley"],
                ].map(([cap,comp,glim],i)=>(
                  <tr key={i} style={{ borderTop:`1px solid ${BORDER}` }}>
                    <td style={{ padding:"8px 12px", color:"rgba(255,255,255,0.75)" }}>{cap}</td>
                    <td style={{ textAlign:"center", padding:"8px 12px", color:"#f87171" }}>{comp}</td>
                    <td style={{ textAlign:"center", padding:"8px 12px", color:G, fontWeight:500 }}>{glim}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ background:"rgba(0,195,122,0.06)", border:"1px solid rgba(0,195,122,0.2)", borderRadius:12, padding:"12px 16px" }}>
            <p style={{ margin:"0 0 4px", fontSize:13, color:"rgba(255,255,255,0.8)" }}><strong style={{color:G}}>Resultado para el empleado:</strong> mayor libertad de uso en comercios válidos, menos rechazos innecesarios y una experiencia fluida.</p>
            <p style={{ margin:0, fontSize:13, color:"rgba(255,255,255,0.8)", marginTop:6 }}><strong style={{color:G}}>Resultado para la empresa:</strong> cumplimiento tributario garantizado con trazabilidad completa, respaldado por el reporte de transacciones ante la DIAN y la UGPP.</p>
          </div>
        </div>
      )}

      {activeTab === "Documentación" && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={s.card}>
            <p style={{ margin:"0 0 12px", fontSize:15, fontWeight:600 }}>📄 Documentos que Glim genera automáticamente</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {[
                { n:"1", icon:"🧾", t:"Factura de servicios", d:"Honorarios de Glim con IVA descontable para el mandante." },
                { n:"2", icon:"💳", t:"Factura por valores cargados", d:"Identifica recursos como ingresos para terceros (no son ingresos propios de Glim)." },
                { n:"3", icon:"✅", t:"Certificación contable", d:"Firmada por contador/revisor fiscal. Sustituye legalmente la factura del proveedor. Soporte ante DIAN y UGPP." },
                { n:"4", icon:"📊", t:"Reporte de transacciones", d:"Detalle de consumos por empleado, producto y comercio. Demuestra el cumplimiento de la destinación específica de cada beneficio." },
              ].map(item=>(
                <div key={item.n} style={{ background:CARD2, borderRadius:10, padding:"12px", display:"flex", gap:10 }}>
                  <div style={{ width:24, height:24, borderRadius:"50%", background:G, color:DARK, fontSize:11, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{item.n}</div>
                  <div>
                    <p style={{ margin:"0 0 2px", fontSize:16 }}>{item.icon}</p>
                    <p style={{ margin:"0 0 2px", fontSize:12, fontWeight:600 }}>{item.t}</p>
                    <p style={{ margin:0, fontSize:11, color:MUTED, lineHeight:1.4 }}>{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <div style={{ ...s.card, background:"rgba(0,195,122,0.05)", border:"1px solid rgba(0,195,122,0.2)" }}>
              <p style={{ margin:"0 0 8px", fontSize:13, fontWeight:600, color:G }}>✅ Mandante (empresa) reporta</p>
              {["Sus operaciones directas únicamente","Honorarios pagados a Glim","Retenciones practicadas a Glim"].map(t=><p key={t} style={{ margin:"0 0 3px", fontSize:12, color:"rgba(255,255,255,0.65)" }}>• {t}</p>)}
              <p style={{ margin:"10px 0 6px", fontSize:13, fontWeight:600, color:"#f87171" }}>❌ NO reporta</p>
              {["Pagos a terceros realizados por Glim","Consumos de empleados vía tarjeta","Retenciones practicadas por Glim a comercios"].map(t=><p key={t} style={{ margin:"0 0 3px", fontSize:12, color:"rgba(255,255,255,0.55)" }}>• {t}</p>)}
            </div>
            <div style={{ ...s.card, background:"rgba(59,130,246,0.05)", border:"1px solid rgba(59,130,246,0.2)" }}>
              <p style={{ margin:"0 0 8px", fontSize:13, fontWeight:600, color:"#60a5fa" }}>📋 Glim (mandatario) reporta</p>
              {["Formatos especiales DIAN 5247-5252","Formato 1647 (ingresos para terceros)","Pagos a proveedores (formato 1001)","Información de comercios terceros","Identificación del mandante en todos los reportes"].map(t=><p key={t} style={{ margin:"0 0 3px", fontSize:12, color:"rgba(255,255,255,0.65)" }}>• {t}</p>)}
            </div>
          </div>
          <div style={{ ...s.card, background:"rgba(255,255,255,0.02)" }}>
            <p style={{ margin:"0 0 10px", fontSize:13, fontWeight:600 }}>📚 Doctrina DIAN aplicable</p>
            {[
              { ref:"Concepto 015705 de 2001:", txt:"Existe ingreso para terceros cuando una persona actúa por cuenta ajena y recibe recursos que debe transferir al titular legítimo." },
              { ref:"Oficio 905603 de 2021:", txt:"Los valores administrados por el mandatario no constituyen ingresos propios, sino recursos destinados al pago de bienes y servicios del mandante." },
              { ref:"Decreto 1625/2016, Art. 1.6.1.4.9:", txt:"El mandatario debe expedir certificación firmada por contador público o revisor fiscal para que el mandante soporte sus costos y deducciones." },
            ].map((d,i)=>(
              <p key={i} style={{ margin:"0 0 8px", fontSize:12, color:"rgba(255,255,255,0.65)", lineHeight:1.5 }}>• <strong style={{color:"rgba(255,255,255,0.85)"}}>{d.ref}</strong> {d.txt}</p>
            ))}
          </div>
        </div>
      )}

      {activeTab === "Comercios MCC" && (
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          <p style={{ margin:"0 0 8px", fontSize:13, color:MUTED }}>Los <strong style={{color:"rgba(255,255,255,0.8)"}}>códigos MCC (Merchant Category Codes) de Mastercard</strong> restringen cada tarjeta Glim a su categoría de gasto autorizada, garantizando el destino laboral de los fondos.</p>
          {data.map((row,i)=>{
            const acc = colorAccent[row.color] || G;
            return (
              <div key={i} style={{ background:CARD, border:`1px solid rgba(255,255,255,0.06)`, borderRadius:12, padding:"12px 16px", borderLeft:`3px solid ${acc}` }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                  <span style={{ fontSize:18 }}>{row.emoji}</span>
                  <p style={{ margin:0, fontSize:13, fontWeight:600 }}>{row.producto}</p>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <div>
                    <p style={{ ...s.label, marginBottom:3 }}>Comercios permitidos</p>
                    <p style={{ margin:0, fontSize:12, color:"rgba(255,255,255,0.65)" }}>{row.mcc}</p>
                  </div>
                  <div>
                    <p style={{ ...s.label, marginBottom:3 }}>Soporte requerido</p>
                    <p style={{ margin:0, fontSize:12, color:"rgba(255,255,255,0.65)" }}>{row.soporte}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p style={{ fontSize:11, color:"rgba(255,255,255,0.15)", textAlign:"center", margin:"1.5rem 0 0" }}>
        Brick Abogados · Oct. 2025 · UVT 2026: $52.374 (Res. DIAN 000238/2025) · SMMLV 2026: $2.000.000 · getglim.com
      </p>
    </div>
  );
}
