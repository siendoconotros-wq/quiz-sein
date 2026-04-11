import { useState, useEffect, useRef } from "react";

const SHEETDB_URL = "https://sheetdb.io/api/v1/m7xhw6zoiev27";

const PREGUNTAS = [
  { texto: "Después de un buen entrenamiento, ¿cómo te sientes?", categoria: "Emocional", opciones: [
    { texto: "Con fuerza. Como si nada pudiera frenarme.", plan: "FUERZA" },
    { texto: "Con energía activa. Firme y en forma.", plan: "TONIFICA" },
    { texto: "Libre. Todo se descargó y hay energía nueva.", plan: "ENERGÍA" },
    { texto: "En paz. Con una calma profunda y real.", plan: "BALANCE" },
  ]},
  { texto: "¿Cómo es tu mañana ideal?", categoria: "Estilo de vida", opciones: [
    { texto: "Arrancar temprano con disciplina y foco total.", plan: "FUERZA" },
    { texto: "Desayunar con calma y hacer algo que active sin agotar.", plan: "TONIFICA" },
    { texto: "Moverse rápido, poner música y salir a comerse el día.", plan: "ENERGÍA" },
    { texto: "Estirarse, respirar profundo, no apurarse.", plan: "BALANCE" },
  ]},
  { texto: "Si pudieras elegir una sensación durante la clase, ¿cuál sería?", categoria: "Preferencia", opciones: [
    { texto: "Sentir exigencia y superación.", plan: "FUERZA" },
    { texto: "Sentir que cada músculo trabaja con precisión.", plan: "TONIFICA" },
    { texto: "Sentir sudor, movimiento y diversión.", plan: "ENERGÍA" },
    { texto: "Sentir conexión con el cuerpo y la respiración.", plan: "BALANCE" },
  ]},
  { texto: "Imagina una playlist. ¿Qué tipo de canción te representa más?", categoria: "Comportamental", opciones: [
    { texto: "Algo intenso y poderoso, para sentirse imparable.", plan: "FUERZA" },
    { texto: "Algo con ritmo constante, moderno y con buena vibra.", plan: "TONIFICA" },
    { texto: "Algo bailable, para moverse sin pensar.", plan: "ENERGÍA" },
    { texto: "Algo suave, con profundidad, que invite a ir hacia adentro.", plan: "BALANCE" },
  ]},
  { texto: "¿Qué te gustaría que la gente notara en ti con el tiempo?", categoria: "Emocional", opciones: [
    { texto: "Más seguridad y presencia.", plan: "FUERZA" },
    { texto: "Un cuerpo cuidado, constancia visible.", plan: "TONIFICA" },
    { texto: "Más chispa, más energía, más actitud.", plan: "ENERGÍA" },
    { texto: "Más tranquilidad, más centro, más paz.", plan: "BALANCE" },
  ]},
  { texto: "¿Cómo es tu relación con la agenda semanal?", categoria: "Estilo de vida", opciones: [
    { texto: "Me gusta tener todo planeado y cumplirlo.", plan: "FUERZA" },
    { texto: "Tengo rutina, pero con flexibilidad.", plan: "TONIFICA" },
    { texto: "Depende de la energía del día.", plan: "ENERGÍA" },
    { texto: "Necesito momentos de pausa para no saturarme.", plan: "BALANCE" },
  ]},
  { texto: "Al pensar en moverte, ¿qué es lo que más motiva?", categoria: "Preferencia", opciones: [
    { texto: "Sentir progreso. Poder hoy algo que antes no se podía.", plan: "FUERZA" },
    { texto: "Verse bien. Sentir que el cuerpo responde.", plan: "TONIFICA" },
    { texto: "Descargar. Sacar estrés, mover todo, transpirar.", plan: "ENERGÍA" },
    { texto: "Soltar. Estirar, respirar, reconectarse.", plan: "BALANCE" },
  ]},
  { texto: "¿Cómo es tu relación con los retos?", categoria: "Comportamental", opciones: [
    { texto: "Me encantan. Empujan a dar más.", plan: "FUERZA" },
    { texto: "Me gustan si son medibles y alcanzables.", plan: "TONIFICA" },
    { texto: "Me motivan si son divertidos y dinámicos.", plan: "ENERGÍA" },
    { texto: "Los acepto si generan crecimiento interno.", plan: "BALANCE" },
  ]},
  { texto: "Si tu cuerpo pudiera hablar, ¿qué crees que pediría?", categoria: "Emocional", opciones: [
    { texto: "Más fuerza. Sostenme mejor.", plan: "FUERZA" },
    { texto: "Más constancia. No me abandones.", plan: "TONIFICA" },
    { texto: "Más movimiento. Déjame expresarme.", plan: "ENERGÍA" },
    { texto: "Más calma. Escúchame más.", plan: "BALANCE" },
  ]},
  { texto: "¿Cuántos días a la semana te gustaría realmente entrenar?", categoria: "Estilo de vida", opciones: [
    { texto: "4–5 días. Con compromiso real.", plan: "FUERZA" },
    { texto: "3–4 días. Con constancia, sin presión.", plan: "TONIFICA" },
    { texto: "3–5 días, según la semana.", plan: "ENERGÍA" },
    { texto: "2–3 días. Calidad sobre cantidad.", plan: "BALANCE" },
  ]},
];

const CLASES = {
  FUERZA: { soft: "2 Pilates Strength + 1 Barre Power", hard: "2 Pilates Strength + 2 Barre Power + 1 Rocket Yoga" },
  TONIFICA: { soft: "1 Barre Power + 1 Barre Fusión + 1 Step", hard: "2 Barre Power + 1 Barre Fusión + 1 Step + 1 Rocket Yoga o Yoguilates" },
  ENERGÍA: { soft: "2 Step + 1 Yoga Flow o Yoguilates", hard: "3 Step + 1 Barre Power + 1 Rocket Yoga o Yoga Flow" },
  BALANCE: { soft: "1 Pilates Essential + 1 Yoga Flow + 1 Yoguilates", hard: "1 Pilates Strength + 1 Pilates Essential + 1 Rocket Yoga + 1 Barre Fusión + 1 Meditación" },
};

const RESULTADOS = {
  FUERZA: {
    color: "#B83B2E", colorLight: "#FDF1F0", colorMid: "#EDCBC8",
    subtitulo: "Build & Strength · Fuerza Consciente",
    titulo: "Tu energía es FUERZA",
    descripcion: "Hay algo en ti que busca firmeza. No solo en el cuerpo — en la vida. Lo que construyes necesita base sólida. Tu forma de entrenar refleja eso: no buscas lo fácil, buscas lo que transforma de adentro hacia afuera.",
    porQue: "El plan FUERZA está diseñado para quienes necesitan sentir progreso real. Pilates Strength y Barre Power van a desafiarte con control, precisión y trabajo profundo. No se trata de levantar más peso, sino de descubrir una fuerza que se siente inquebrantable.",
    sentir: 'Más presencia. Más estabilidad emocional. Una postura que habla por sí sola. Y esa sensación de "hoy pude más que ayer" que engancha como pocas cosas.',
    cta: "Tu cuerpo ya lo está pidiendo. Dale el primer paso.",
    soft: "3 días a la semana es todo lo necesario para sentir la diferencia. Pilates Strength trabaja fuerza consciente y movimiento eficiente; Barre Power suma intensidad y cardio. Sin presión, con constancia — cada clase cuenta.",
    hard: "5 días. Compromiso real. Pilates Strength como columna de fuerza consciente, Barre Power para intensidad y cardio, y Rocket Yoga para llevar el cuerpo al siguiente nivel con secuencias dinámicas de fuerza, resistencia y movilidad. La transformación se nota en semanas.",
  },
  TONIFICA: {
    color: "#C07A2F", colorLight: "#FDF6EE", colorMid: "#F0DBBF",
    subtitulo: "Tone & Sculpt · Define & Activa",
    titulo: "Tu energía es TONIFICA",
    descripcion: "Lo que buscas es algo que se note. No desde lo extremo, sino desde la constancia. Cuidarse, ser consistente, y ver resultados que hablan solos. Sin necesidad de gritar lo que se hace — el cuerpo lo muestra.",
    porQue: "TONIFICA mezcla activación muscular con trabajo controlado. Barre Power, Barre Fusión y Step en combinaciones que moldean sin agotar. Entrenamiento inteligente: cada clase tiene propósito, cada movimiento cuenta.",
    sentir: "Más definición, más activación, más control. Pero también algo más sutil: la satisfacción de la constancia. Saber que lo que se ve en el espejo es resultado de una disciplina silenciosa.",
    cta: "Constancia es lo que transforma. Empieza hoy.",
    soft: "3 días bien puestos hacen más que 5 sin intención. Barre Power da la intensidad, Barre Fusión trabaja fuerza funcional con estabilidad, y Step activa con cardio dinámico. Estructura sin agobio. La constancia hace el resto.",
    hard: "5 días de entrenamiento con propósito. Barre Power como doble dosis de fuerza e intensidad, Barre Fusión para estabilidad funcional, Step para cardio, y el quinto día a elegir: Rocket Yoga para un desafío dinámico, o Yoguilates para equilibrio y estabilidad.",
  },
  ENERGÍA: {
    color: "#B8991E", colorLight: "#FDFAED", colorMid: "#F2EAC5",
    subtitulo: "Sweat & Cardio · Activa tu Energía",
    titulo: "Tu energía es ENERGÍA",
    descripcion: "Necesitas moverte para sentirte con vida. Nada de quedarse quieto. Al entrenar, se descarga, se libera y se sale con carga nueva. El movimiento no es una obligación — es medicina.",
    porQue: "ENERGÍA es intensidad con alegría. Step como protagonista, clases de alta activación diseñadas para sudar, sonreír y salir con la sensación de ser invencible.",
    sentir: "Salir de cada clase con una descarga total. Más claridad mental. Más actitud. Ese subidón que no da el café, lo dan 45 minutos de movimiento sin pensar.",
    cta: "Tu energía necesita un espacio. Este es.",
    soft: "3 días para soltar, sudar y reconectarse. Step da el cardio intenso que se necesita, y Yoga Flow o Yoguilates cierra la semana con movimiento fluido — el complemento perfecto para no quedarse solo en la intensidad.",
    hard: "5 días a pura energía. Triple dosis de Step para cardio y resistencia, Barre Power para sumar fuerza, y el quinto día a elegir: Rocket Yoga para un desafío de fuerza y movilidad, o Yoga Flow para cerrar con movimiento fluido.",
  },
  BALANCE: {
    color: "#4A7D5C", colorLight: "#EFF7F2", colorMid: "#CCDFCF",
    subtitulo: "Flow & Balance",
    titulo: "Tu energía es BALANCE",
    descripcion: "No todo tiene que ser intenso para ser transformador. Lo que buscas es algo más profundo: conexión. Con el cuerpo, con la respiración, con ese espacio interno que el ruido del día a día tapa. Entrenar es volver a uno mismo.",
    porQue: "BALANCE combina Yoga Flow, Pilates Essential y Yoguilates — movimiento consciente, core, postura y equilibrio. Entrenamiento que se siente como autocuidado: estirar, respirar, fortalecer sin forzar.",
    sentir: "Más calma. Más flexibilidad — no solo física. La sensación de estar presente, de habitar el cuerpo con más conciencia. Y eso se nota en todo: en cómo se duerme, en cómo se responde, en cómo uno se sostiene.",
    cta: "El movimiento más poderoso a veces es el más suave. Empieza a sentirlo.",
    soft: "Pilates Essential trabaja core, postura y control; Yoga Flow conecta con movimiento fluido y respiración; Yoguilates fusiona lo mejor de ambos mundos. Sin prisa, sin presión. Este plan respeta el ritmo.",
    hard: "Pilates Strength y Pilates Essential trabajan fuerza y core de adentro hacia afuera, Rocket Yoga desafía con secuencias dinámicas, Barre Fusión suma estabilidad, y Meditación cierra la semana con regulación mental y conexión interna. No es intensidad bruta, es profundidad.",
  },
};

const DESCRIPTORES = {
  FUERZA: "momentos de desafío y control",
  TONIFICA: "trabajo de activación y definición",
  ENERGÍA: "sesiones de descarga y movimiento libre",
  BALANCE: "pausas de conexión y respiración",
};

function calcularResultado(respuestas) {
  const puntajes = { FUERZA: 0, TONIFICA: 0, ENERGÍA: 0, BALANCE: 0 };
  respuestas.forEach((p) => { puntajes[p] += 1; });
  const ranking = Object.entries(puntajes).sort((a, b) => b[1] - a[1]);
  let principal = ranking[0][0];
  let secundario = ranking[1][0];
  if (ranking[0][1] === ranking[1][1]) {
    const emp = [ranking[0][0], ranking[1][0]];
    if (emp.includes(respuestas[8])) {
      principal = respuestas[8];
      secundario = emp.find((p) => p !== principal);
    } else {
      const pri = ["TONIFICA", "ENERGÍA", "FUERZA", "BALANCE"];
      principal = pri.find((p) => emp.includes(p));
      secundario = emp.find((p) => p !== principal);
    }
  }
  const tf = { FUERZA: 2, TONIFICA: 1, ENERGÍA: 1, BALANCE: 0 };
  const te = { FUERZA: 2, TONIFICA: 1, ENERGÍA: 1, BALANCE: 0 };
  const tc = { FUERZA: 2, TONIFICA: 1, ENERGÍA: 0, BALANCE: 0 };
  const intensidad = tf[respuestas[9]] + te[respuestas[7]] + tc[respuestas[5]];
  const version = intensidad >= 4 ? "HARD" : "SOFT";
  return { principal, secundario, version, puntajes, intensidad };
}

async function guardarLead(lead, resultado) {
  try {
    await fetch(SHEETDB_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [{
          fecha: new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" }),
          nombre: lead.nombre,
          telefono: lead.telefono,
          plan: resultado.principal,
          version: resultado.version,
          secundario: resultado.secundario,
          intensidad: String(resultado.intensidad),
          puntajes: `F:${resultado.puntajes.FUERZA} T:${resultado.puntajes.TONIFICA} E:${resultado.puntajes.ENERGÍA} B:${resultado.puntajes.BALANCE}`,
        }],
      }),
    });
  } catch (e) {
    console.error("Error guardando lead:", e);
  }
}

const BG = "linear-gradient(168deg, #FAF7F2 0%, #F3EDE4 45%, #EDE5D8 100%)";
const FONT_DISPLAY = "'Playfair Display', Georgia, serif";
const FONT_BODY = "'DM Sans', -apple-system, sans-serif";

function IntroScreen({ onNext }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 80); }, []);
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "48px 24px", background: BG, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(16px)", transition: "all .85s cubic-bezier(.22,1,.36,1)" }}>
      <div style={{ textAlign: "center", maxWidth: 440 }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#A89880", marginBottom: 36 }}>SEIN Wellness Room</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(34px,7.5vw,50px)", fontWeight: 400, color: "#3D3530", lineHeight: 1.18, marginBottom: 22, letterSpacing: -0.5 }}>Descubre tu forma<br />de entrenar</h1>
        <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: "#7A6F64", lineHeight: 1.75, maxWidth: 350, margin: "0 auto 44px" }}>10 preguntas para encontrar el plan que se siente como tú. Sin fórmulas genéricas — con intención.</p>
        <button onClick={onNext} style={{ fontFamily: FONT_BODY, fontSize: 15, fontWeight: 500, letterSpacing: 1.2, padding: "17px 54px", border: "none", borderRadius: 100, background: "#3D3530", color: "#FAF7F2", cursor: "pointer", transition: "all .3s ease" }}>Empezar</button>
        <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: "#B5AA9E", marginTop: 22 }}>2 minutos · sin registro invasivo</p>
      </div>
    </div>
  );
}

function LeadScreen({ onSubmit }) {
  const [v, setV] = useState(false);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [shake, setShake] = useState(false);
  const nameRef = useRef(null);
  useEffect(() => { setTimeout(() => setV(true), 80); setTimeout(() => nameRef.current && nameRef.current.focus(), 600); }, []);
  const handleSubmit = () => {
    if (!nombre.trim() || !telefono.trim()) { setShake(true); setTimeout(() => setShake(false), 500); return; }
    onSubmit({ nombre: nombre.trim(), telefono: telefono.trim() });
  };
  const inputStyle = { fontFamily: FONT_BODY, fontSize: 15, padding: "15px 18px", border: "1.5px solid #DDD4C8", borderRadius: 12, background: "rgba(255,255,255,.75)", color: "#3D3530", outline: "none", width: "100%", boxSizing: "border-box", transition: "border-color .25s ease, box-shadow .25s ease" };
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "48px 24px", background: BG, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(16px)", transition: "all .85s cubic-bezier(.22,1,.36,1)" }}>
      <div style={{ maxWidth: 400, width: "100%", textAlign: "center", animation: shake ? "shakeX .4s ease" : "none" }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#A89880", marginBottom: 24 }}>SEIN</div>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(24px,5.5vw,32px)", fontWeight: 400, color: "#3D3530", lineHeight: 1.3, marginBottom: 12 }}>Antes de empezar,<br />queremos conocerte</h2>
        <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: "#7A6F64", lineHeight: 1.65, marginBottom: 36, maxWidth: 340, margin: "0 auto 36px" }}>Tu nombre y tu número nos permiten personalizar el resultado y compartirte las clases ideales para tu plan.</p>
        <div style={{ textAlign: "left", marginBottom: 16 }}>
          <label style={{ fontFamily: FONT_BODY, fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "#8A7F74", display: "block", marginBottom: 7 }}>Tu nombre</label>
          <input ref={nameRef} type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Alejandra" style={inputStyle} />
        </div>
        <div style={{ textAlign: "left", marginBottom: 32 }}>
          <label style={{ fontFamily: FONT_BODY, fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "#8A7F74", display: "block", marginBottom: 7 }}>Tu WhatsApp</label>
          <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Ej: 300 123 4567" style={inputStyle} onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }} />
        </div>
        <button onClick={handleSubmit} style={{ fontFamily: FONT_BODY, fontSize: 15, fontWeight: 500, letterSpacing: 1.2, padding: "17px 0", border: "none", borderRadius: 100, width: "100%", background: "#3D3530", color: "#FAF7F2", cursor: "pointer", transition: "all .3s ease", marginBottom: 16 }}>Comenzar</button>
        <p style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: "#B5AA9E", lineHeight: 1.6, maxWidth: 300, margin: "0 auto" }}>Solo usaremos tus datos para acompañar tu proceso. Sin spam, lo prometemos.</p>
      </div>
      <style>{`@keyframes shakeX { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }`}</style>
    </div>
  );
}

function QuestionScreen({ pregunta, index, total, onSelect }) {
  const [v, setV] = useState(false);
  const [sel, setSel] = useState(null);
  useEffect(() => { setV(false); setSel(null); const t = setTimeout(() => setV(true), 60); return () => clearTimeout(t); }, [index]);
  const pick = (plan, i) => { setSel(i); setTimeout(() => onSelect(plan), 360); };
  const pct = ((index + 1) / total) * 100;
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(168deg, #FAF7F2 0%, #F3EDE4 100%)" }}>
      <div style={{ padding: "22px 24px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 12, color: "#A89880", letterSpacing: 3 }}>SEIN</span>
          <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: "#A89880", fontWeight: 500 }}>{index + 1} / {total}</span>
        </div>
        <div style={{ height: 3, background: "#E8DFD4", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #3D3530, #6B5F53)", borderRadius: 10, transition: "width .55s cubic-bezier(.22,1,.36,1)" }} />
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "36px 24px 48px", maxWidth: 540, margin: "0 auto", width: "100%", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(14px)", transition: "all .5s cubic-bezier(.22,1,.36,1)" }}>
        <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: "#C4B8A8", letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 14, fontWeight: 500 }}>{pregunta.categoria}</div>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(22px,5vw,29px)", fontWeight: 400, color: "#3D3530", lineHeight: 1.38, marginBottom: 32 }}>{pregunta.texto}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {pregunta.opciones.map((op, i) => {
            const isSel = sel === i;
            return (
              <button key={i} onClick={() => pick(op.plan, i)} style={{ fontFamily: FONT_BODY, fontSize: 15, textAlign: "left", padding: "16px 20px", background: isSel ? "#3D3530" : "rgba(255,255,255,.72)", color: isSel ? "#FAF7F2" : "#4A413A", border: isSel ? "1.5px solid #3D3530" : "1.5px solid #DDD4C8", borderRadius: 14, cursor: "pointer", lineHeight: 1.55, transition: "all .25s ease", transform: isSel ? "scale(.985)" : "none" }}>{op.texto}</button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ResultScreen({ resultado, nombre, onRestart }) {
  const [v, setV] = useState(false);
  const [sec, setSec] = useState([false, false, false, false, false, false]);
  const r = RESULTADOS[resultado.principal];
  const s = RESULTADOS[resultado.secundario];
  const clases = CLASES[resultado.principal][resultado.version.toLowerCase()];
  const dias = resultado.version === "HARD" ? "5" : "3";
  useEffect(() => {
    setTimeout(() => setV(true), 150);
    [500, 900, 1300, 1700, 2100, 2500].forEach((d, i) => { setTimeout(() => { setSec((p) => { const n = [...p]; n[i] = true; return n; }); }, d); });
  }, []);
  const ss = (i) => ({ opacity: sec[i] ? 1 : 0, transform: sec[i] ? "none" : "translateY(22px)", transition: "all .7s cubic-bezier(.22,1,.36,1)" });
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(175deg, ${r.colorLight} 0%, #FAF7F2 45%, ${r.colorLight} 100%)` }}>
      <div style={{ textAlign: "center", padding: "56px 24px 32px", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(18px)", transition: "all .85s cubic-bezier(.22,1,.36,1)" }}>
        <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: "#A89880", letterSpacing: 3.5, textTransform: "uppercase", marginBottom: 18, fontWeight: 500 }}>Tu resultado</div>
        <div style={{ display: "inline-flex", gap: 8, marginBottom: 24 }}>
          <span style={{ padding: "5px 16px", background: r.colorMid, borderRadius: 100, fontFamily: FONT_BODY, fontSize: 12, color: r.color, fontWeight: 600, letterSpacing: 1.5 }}>{resultado.version}</span>
          <span style={{ padding: "5px 16px", background: "rgba(255,255,255,.6)", borderRadius: 100, fontFamily: FONT_BODY, fontSize: 12, color: "#8A7F74", letterSpacing: .5 }}>{dias} días/semana</span>
        </div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(32px,8vw,48px)", fontWeight: 400, color: "#3D3530", lineHeight: 1.15, marginBottom: 0, letterSpacing: -0.5 }}>{nombre ? `${nombre}, ` : ""}{r.titulo.charAt(0).toLowerCase() + r.titulo.slice(1)}</h1>
        <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: r.color, letterSpacing: 1, marginTop: 10, fontWeight: 500 }}>{r.subtitulo}</p>
        <div style={{ width: 36, height: 2, background: r.color, margin: "24px auto 0", borderRadius: 2 }} />
      </div>
      <div style={{ maxWidth: 500, margin: "0 auto", padding: "0 24px 56px" }}>
        <div style={{ ...ss(0), marginBottom: 32 }}><p style={{ fontFamily: FONT_DISPLAY, fontSize: 19, color: "#4A413A", lineHeight: 1.75, fontStyle: "italic" }}>{r.descripcion}</p></div>
        <div style={{ ...ss(1), marginBottom: 32 }}>
          <h3 style={{ fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", color: r.color, marginBottom: 12, fontWeight: 600 }}>¿Por qué este plan?</h3>
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: "#5A524A", lineHeight: 1.75 }}>{r.porQue}</p>
        </div>
        <div style={{ ...ss(2), marginBottom: 32 }}>
          <h3 style={{ fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", color: r.color, marginBottom: 12, fontWeight: 600 }}>Lo que se siente</h3>
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: "#5A524A", lineHeight: 1.75 }}>{r.sentir}</p>
        </div>
        <div style={{ ...ss(3), background: "rgba(255,255,255,.82)", borderRadius: 20, padding: "24px 22px", marginBottom: 32, border: `1.5px solid ${r.colorMid}` }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 12, fontWeight: 600, color: r.color, marginBottom: 6, letterSpacing: 1.5, textTransform: "uppercase" }}>Tu ritmo: {resultado.principal} {resultado.version}</div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: "#8A7F74", marginBottom: 14, padding: "8px 14px", background: r.colorLight, borderRadius: 10, display: "inline-block", fontWeight: 500 }}>{clases}</div>
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: "#5A524A", lineHeight: 1.75, margin: 0 }}>{resultado.version === "HARD" ? r.hard : r.soft}</p>
        </div>
        <div style={{ ...ss(4), background: `linear-gradient(140deg, ${s.colorLight}, rgba(255,255,255,.55))`, borderRadius: 20, padding: "22px 20px", marginBottom: 38, border: `1px solid ${s.colorMid}` }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: "#A89880", letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 10, fontWeight: 500 }}>Tu segunda energía</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 21, color: "#3D3530", marginBottom: 10 }}>{resultado.secundario}</div>
          <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: "#6B6158", lineHeight: 1.65, margin: 0 }}>Eso dice mucho: hay capas. Incorpora {DESCRIPTORES[resultado.secundario]} a la semana para complementar el plan principal y entrenar de forma más completa.</p>
        </div>
        <div style={{ ...ss(5), textAlign: "center" }}>
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: 19, color: "#4A413A", fontStyle: "italic", marginBottom: 26, lineHeight: 1.65 }}>{r.cta}</p>
          <button style={{ fontFamily: FONT_BODY, fontSize: 15, fontWeight: 500, letterSpacing: 1.2, padding: "18px 0", border: "none", borderRadius: 100, background: r.color, color: "#fff", cursor: "pointer", transition: "all .3s ease", display: "block", width: "100%", maxWidth: 320, margin: "0 auto 14px" }}>Reserva tu primera clase</button>
          <button onClick={onRestart} style={{ fontFamily: FONT_BODY, fontSize: 13, color: "#A89880", background: "none", border: "none", cursor: "pointer", padding: 10, marginTop: 6 }}>Volver a empezar</button>
        </div>
      </div>
    </div>
  );
}

export default function QuizSein() {
  const [screen, setScreen] = useState("intro");
  const [lead, setLead] = useState({ nombre: "", telefono: "" });
  const [respuestas, setRespuestas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [resultado, setResultado] = useState(null);
  const handleLeadSubmit = (data) => { setLead(data); setScreen("quiz"); };
  const handleSelect = (plan) => {
    const nuevas = [...respuestas, plan];
    setRespuestas(nuevas);
    if (preguntaActual < PREGUNTAS.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      const res = calcularResultado(nuevas);
      setResultado(res);
      guardarLead(lead, res);
      setScreen("result");
    }
  };
  const handleRestart = () => { setScreen("intro"); setLead({ nombre: "", telefono: "" }); setRespuestas([]); setPreguntaActual(0); setResultado(null); };
  if (screen === "intro") return <IntroScreen onNext={() => setScreen("lead")} />;
  if (screen === "lead") return <LeadScreen onSubmit={handleLeadSubmit} />;
  if (screen === "quiz") return <QuestionScreen pregunta={PREGUNTAS[preguntaActual]} index={preguntaActual} total={PREGUNTAS.length} onSelect={handleSelect} />;
  if (screen === "result") return <ResultScreen resultado={resultado} nombre={lead.nombre} onRestart={handleRestart} />;
}
