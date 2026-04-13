import { useState, useEffect, useRef } from "react";

const SHEETDB_URL = "https://sheetdb.io/api/v1/m7xhw6zoiev27";
const WHATSAPP = "573207605216";

const EMOJIS_PLAN = {
  FUERZA: "🔥",
  TONIFICA: "💪",
  ENERGÍA: "⭐",
  BALANCE: "🧘‍♀️",
};

const PREGUNTAS = [
  { texto: "Después de un buen entrenamiento, ¿cómo te sientes?", opciones: [
    { texto: "Con fuerza. Como si nada pudiera frenarme.", plan: "FUERZA" },
    { texto: "Con energía activa. Firme y en forma.", plan: "TONIFICA" },
    { texto: "Libre. Todo se descargó y hay energía nueva.", plan: "ENERGÍA" },
    { texto: "En paz. Con una calma profunda y real.", plan: "BALANCE" },
  ]},
  { texto: "¿Cómo es tu mañana ideal?", opciones: [
    { texto: "Arrancar temprano con disciplina y foco total.", plan: "FUERZA" },
    { texto: "Desayunar con calma y hacer algo que active sin agotar.", plan: "TONIFICA" },
    { texto: "Moverse rápido, poner música y salir a comerse el día.", plan: "ENERGÍA" },
    { texto: "Estirarse, respirar profundo, no apurarse.", plan: "BALANCE" },
  ]},
  { texto: "Si pudieras elegir una sensación durante la clase, ¿cuál sería?", opciones: [
    { texto: "Sentir exigencia y superación.", plan: "FUERZA" },
    { texto: "Sentir que cada músculo trabaja con precisión.", plan: "TONIFICA" },
    { texto: "Sentir sudor, movimiento y diversión.", plan: "ENERGÍA" },
    { texto: "Sentir conexión con el cuerpo y la respiración.", plan: "BALANCE" },
  ]},
  { texto: "Imagina una playlist. ¿Qué tipo de canción te representa más?", opciones: [
    { texto: "Algo intenso y poderoso, para sentirse imparable.", plan: "FUERZA" },
    { texto: "Algo con ritmo constante, moderno y con buena vibra.", plan: "TONIFICA" },
    { texto: "Algo bailable, para moverse sin pensar.", plan: "ENERGÍA" },
    { texto: "Algo suave, con profundidad, que invite a ir hacia adentro.", plan: "BALANCE" },
  ]},
  { texto: "¿Qué te gustaría que la gente notara en ti con el tiempo?", opciones: [
    { texto: "Más seguridad y presencia.", plan: "FUERZA" },
    { texto: "Un cuerpo cuidado, constancia visible.", plan: "TONIFICA" },
    { texto: "Más chispa, más energía, más actitud.", plan: "ENERGÍA" },
    { texto: "Más tranquilidad, más centro, más paz.", plan: "BALANCE" },
  ]},
  { texto: "¿Cómo es tu relación con la agenda semanal?", opciones: [
    { texto: "Me gusta tener todo planeado y cumplirlo.", plan: "FUERZA" },
    { texto: "Tengo rutina, pero con flexibilidad.", plan: "TONIFICA" },
    { texto: "Depende de la energía del día.", plan: "ENERGÍA" },
    { texto: "Necesito momentos de pausa para no saturarme.", plan: "BALANCE" },
  ]},
  { texto: "Al pensar en moverte, ¿qué es lo que más motiva?", opciones: [
    { texto: "Sentir progreso. Poder hoy algo que antes no se podía.", plan: "FUERZA" },
    { texto: "Verse bien. Sentir que el cuerpo responde.", plan: "TONIFICA" },
    { texto: "Descargar. Sacar estrés, mover todo, transpirar.", plan: "ENERGÍA" },
    { texto: "Soltar. Estirar, respirar, reconectarse.", plan: "BALANCE" },
  ]},
  { texto: "¿Cómo es tu relación con los retos?", opciones: [
    { texto: "Me encantan. Empujan a dar más.", plan: "FUERZA" },
    { texto: "Me gustan si son medibles y alcanzables.", plan: "TONIFICA" },
    { texto: "Me motivan si son divertidos y dinámicos.", plan: "ENERGÍA" },
    { texto: "Los acepto si generan crecimiento interno.", plan: "BALANCE" },
  ]},
  { texto: "Si tu cuerpo pudiera hablar, ¿qué crees que pediría?", opciones: [
    { texto: "Más fuerza. Sostenme mejor.", plan: "FUERZA" },
    { texto: "Más constancia. No me abandones.", plan: "TONIFICA" },
    { texto: "Más movimiento. Déjame expresarme.", plan: "ENERGÍA" },
    { texto: "Más calma. Escúchame más.", plan: "BALANCE" },
  ]},
  { texto: "¿Cuántos días a la semana te gustaría realmente entrenar?", opciones: [
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
    color: "#697255", colorLight: "#EEF3E3", colorMid: "#C5CDB4",
    subtitulo: "Build & Strength · Fuerza Consciente",
    titulo: "Tu plan es FUERZA",
    descripcion: "Hay algo en ti que busca firmeza. No solo en el cuerpo — en la vida. Lo que construyes necesita base sólida. Tu forma de entrenar refleja eso: no buscas lo fácil, buscas lo que transforma de adentro hacia afuera.",
    porQue: "El plan FUERZA está diseñado para quienes necesitan sentir progreso real. Pilates Strength y Barre Power van a desafiarte con control, precisión y trabajo profundo. No se trata de levantar más peso, sino de descubrir una fuerza que se siente inquebrantable.",
    sentir: 'Más presencia. Más estabilidad emocional. Una postura que habla por sí sola. Y esa sensación de "hoy pude más que ayer" que engancha como pocas cosas.',
    cta: "Tu cuerpo ya lo está pidiendo. Dale el primer paso.",
    soft: "3 días a la semana es todo lo necesario para sentir la diferencia. Pilates Strength trabaja fuerza consciente y movimiento eficiente; Barre Power suma intensidad y cardio. Sin presión, con constancia — cada clase cuenta.",
    hard: "5 días. Compromiso real. Pilates Strength como columna de fuerza consciente, Barre Power para intensidad y cardio, y Rocket Yoga para llevar el cuerpo al siguiente nivel con secuencias dinámicas de fuerza, resistencia y movilidad. La transformación se nota en semanas.",
  },
  TONIFICA: {
    color: "#B69C85", colorLight: "#F5EFE8", colorMid: "#E0D0BE",
    subtitulo: "Tone & Sculpt · Define & Activa",
    titulo: "Tu plan es TONIFICA",
    descripcion: "Lo que buscas es algo que se note. No desde lo extremo, sino desde la constancia. Cuidarse, ser consistente, y ver resultados que hablan solos. Sin necesidad de gritar lo que se hace — el cuerpo lo muestra.",
    porQue: "TONIFICA mezcla activación muscular con trabajo controlado. Barre Power, Barre Fusión y Step en combinaciones que moldean sin agotar. Entrenamiento inteligente: cada clase tiene propósito, cada movimiento cuenta.",
    sentir: "Más definición, más activación, más control. Pero también algo más sutil: la satisfacción de la constancia. Saber que lo que se ve en el espejo es resultado de una disciplina silenciosa.",
    cta: "Constancia es lo que transforma. Empieza hoy.",
    soft: "3 días bien puestos hacen más que 5 sin intención. Barre Power da la intensidad, Barre Fusión trabaja fuerza funcional con estabilidad, y Step activa con cardio dinámico. Estructura sin agobio. La constancia hace el resto.",
    hard: "5 días de entrenamiento con propósito. Barre Power como doble dosis de fuerza e intensidad, Barre Fusión para estabilidad funcional, Step para cardio, y el quinto día a elegir: Rocket Yoga para un desafío dinámico, o Yoguilates para equilibrio y estabilidad.",
  },
  ENERGÍA: {
    color: "#92745C", colorLight: "#F0E8DF", colorMid: "#D4C2B0",
    subtitulo: "Sweat & Cardio · Activa tu Energía",
    titulo: "Tu plan es ENERGÍA",
    descripcion: "Necesitas moverte para sentirte con vida. Nada de quedarse quieto. Al entrenar, se descarga, se libera y se sale con carga nueva. El movimiento no es una obligación — es medicina.",
    porQue: "ENERGÍA es intensidad con alegría. Step como protagonista, clases de alta activación diseñadas para sudar, sonreír y salir con la sensación de ser invencible.",
    sentir: "Salir de cada clase con una descarga total. Más claridad mental. Más actitud. Ese subidón que no da el café, lo dan 45 minutos de movimiento sin pensar.",
    cta: "Tu energía necesita un espacio. Este es.",
    soft: "3 días para soltar, sudar y reconectarse. Step da el cardio intenso que se necesita, y Yoga Flow o Yoguilates cierra la semana con movimiento fluido — el complemento perfecto para no quedarse solo en la intensidad.",
    hard: "5 días a pura energía. Triple dosis de Step para cardio y resistencia, Barre Power para sumar fuerza, y el quinto día a elegir: Rocket Yoga para un desafío de fuerza y movilidad, o Yoga Flow para cerrar con movimiento fluido.",
  },
  BALANCE: {
    color: "#8C906B", colorLight: "#F0F2E4", colorMid: "#CED3B4",
    subtitulo: "Flow & Balance",
    titulo: "Tu plan es BALANCE",
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

function construirUrlWhatsapp(plan, version) {
  const emoji = EMOJIS_PLAN[plan] || "";
  const msg = `Hola Sein, hice el quiz y mi plan es ${plan} ${version} ${emoji} Quiero agendar mi clase de prueba`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

const BG = "#EEF3E3";
const BG_GRAD = "#EEF3E3";
const FONT_DISPLAY = "'Fraunces', Georgia, serif";
const FONT_BODY = "'Nunito', -apple-system, sans-serif";
const INK = "#3D4028";
const INK_SOFT = "#697255";
const INK_MUTED = "#8C906B";
const NO_LIG = { fontVariantLigatures: "none" };

function SeinLogo({ size = 13, color = INK_SOFT }) {
  return (
    <div style={{ fontFamily: FONT_DISPLAY, fontSize: size, letterSpacing: 2, color, fontWeight: 500, display: "inline-flex", alignItems: "baseline", gap: 8, ...NO_LIG }}>
      <span style={{ fontWeight: 600, fontSize: size * 1.15 }}>sein</span>
      <span style={{ fontStyle: "italic", fontSize: size * 0.75, opacity: .75, fontWeight: 400 }}>wellness room</span>
    </div>
  );
}

function IntroScreen({ onNext }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 80); }, []);
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "48px 24px", background: BG_GRAD, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(16px)", transition: "all .85s cubic-bezier(.22,1,.36,1)" }}>
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div style={{ marginBottom: 40 }}><SeinLogo size={14} /></div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(34px,7.5vw,48px)", fontWeight: 500, color: INK, lineHeight: 1.15, marginBottom: 22, letterSpacing: -0.8, maxWidth: 440, margin: "0 auto 22px", ...NO_LIG }}>Descubre tu forma <em style={{ fontStyle: "italic", fontWeight: 400, color: INK_SOFT }}>de entrenar</em></h1>
        <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: INK_MUTED, lineHeight: 1.7, maxWidth: 360, margin: "0 auto 44px", fontWeight: 400 }}>10 preguntas para encontrar el plan que se siente como tú. Sin fórmulas genéricas — con intención.</p>
        <button onClick={onNext} style={{ fontFamily: FONT_BODY, fontSize: 15, fontWeight: 600, letterSpacing: 1, padding: "17px 56px", border: "none", borderRadius: 100, background: INK_SOFT, color: "#FAF9F2", cursor: "pointer", transition: "all .3s ease", boxShadow: "0 4px 14px rgba(105,114,85,.2)" }} onMouseOver={(e) => { e.target.style.background = "#555E42"; e.target.style.transform = "translateY(-2px)"; }} onMouseOut={(e) => { e.target.style.background = INK_SOFT; e.target.style.transform = "none"; }}>Empezar</button>
        <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: INK_MUTED, marginTop: 22, opacity: .7 }}>2 minutos · sin registro invasivo</p>
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
  const inputStyle = { fontFamily: FONT_BODY, fontSize: 15, padding: "15px 18px", border: "1.5px solid #C5CDB4", borderRadius: 12, background: "rgba(255,255,255,.7)", color: INK, outline: "none", width: "100%", boxSizing: "border-box", transition: "border-color .25s ease, box-shadow .25s ease", fontWeight: 400 };
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "48px 24px", background: BG_GRAD, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(16px)", transition: "all .85s cubic-bezier(.22,1,.36,1)" }}>
      <div style={{ maxWidth: 420, width: "100%", textAlign: "center", animation: shake ? "shakeX .4s ease" : "none" }}>
        <div style={{ marginBottom: 28 }}><SeinLogo size={12} /></div>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(24px,5.5vw,32px)", fontWeight: 500, color: INK, lineHeight: 1.25, marginBottom: 12, letterSpacing: -0.5, ...NO_LIG }}>Antes de empezar, <em style={{ fontStyle: "italic", fontWeight: 400, color: INK_SOFT }}>queremos conocerte</em></h2>
        <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: INK_MUTED, lineHeight: 1.65, marginBottom: 36, maxWidth: 340, margin: "0 auto 36px", fontWeight: 400 }}>Tu nombre y tu número nos permiten personalizar el resultado y compartirte las clases ideales para tu plan.</p>
        <div style={{ textAlign: "left", marginBottom: 16 }}>
          <label style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: INK_SOFT, display: "block", marginBottom: 7 }}>Tu nombre</label>
          <input ref={nameRef} type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Alejandra" style={inputStyle} onFocus={(e) => { e.target.style.borderColor = INK_SOFT; e.target.style.boxShadow = "0 0 0 3px rgba(105,114,85,.12)"; }} onBlur={(e) => { e.target.style.borderColor = "#C5CDB4"; e.target.style.boxShadow = "none"; }} />
        </div>
        <div style={{ textAlign: "left", marginBottom: 32 }}>
          <label style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: INK_SOFT, display: "block", marginBottom: 7 }}>Tu WhatsApp</label>
          <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Ej: 300 123 4567" style={inputStyle} onFocus={(e) => { e.target.style.borderColor = INK_SOFT; e.target.style.boxShadow = "0 0 0 3px rgba(105,114,85,.12)"; }} onBlur={(e) => { e.target.style.borderColor = "#C5CDB4"; e.target.style.boxShadow = "none"; }} onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }} />
        </div>
        <button onClick={handleSubmit} style={{ fontFamily: FONT_BODY, fontSize: 15, fontWeight: 600, letterSpacing: 1, padding: "17px 0", border: "none", borderRadius: 100, width: "100%", background: INK_SOFT, color: "#FAF9F2", cursor: "pointer", transition: "all .3s ease", marginBottom: 16, boxShadow: "0 4px 14px rgba(105,114,85,.2)" }} onMouseOver={(e) => { e.target.style.background = "#555E42"; e.target.style.transform = "translateY(-2px)"; }} onMouseOut={(e) => { e.target.style.background = INK_SOFT; e.target.style.transform = "none"; }}>Comenzar</button>
        <p style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: INK_MUTED, lineHeight: 1.6, maxWidth: 320, margin: "0 auto", opacity: .75 }}>Solo usaremos tus datos para acompañar tu proceso. Sin spam, lo prometemos.</p>
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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: BG_GRAD }}>
      <div style={{ padding: "24px 24px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <SeinLogo size={11} />
          <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: INK_MUTED, fontWeight: 600 }}>{index + 1} / {total}</span>
        </div>
        <div style={{ height: 3, background: "rgba(105,114,85,.15)", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${INK_SOFT}, #8C906B)`, borderRadius: 10, transition: "width .55s cubic-bezier(.22,1,.36,1)" }} />
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 24px 48px", maxWidth: 560, margin: "0 auto", width: "100%", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(14px)", transition: "all .5s cubic-bezier(.22,1,.36,1)" }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(23px,5vw,30px)", fontWeight: 500, color: INK, lineHeight: 1.3, marginBottom: 36, letterSpacing: -0.3, ...NO_LIG }}>{pregunta.texto}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {pregunta.opciones.map((op, i) => {
            const isSel = sel === i;
            return (
              <button key={i} onClick={() => pick(op.plan, i)} style={{ fontFamily: FONT_BODY, fontSize: 15, textAlign: "left", padding: "17px 22px", background: isSel ? INK_SOFT : "rgba(255,255,255,.68)", color: isSel ? "#FAF9F2" : INK, border: isSel ? `1.5px solid ${INK_SOFT}` : "1.5px solid #C5CDB4", borderRadius: 14, cursor: "pointer", lineHeight: 1.55, transition: "all .25s ease", transform: isSel ? "scale(.985)" : "none", fontWeight: 500 }} onMouseOver={(e) => { if (sel === null) { e.currentTarget.style.borderColor = INK_SOFT; e.currentTarget.style.background = "rgba(255,255,255,.9)"; } }} onMouseOut={(e) => { if (!isSel) { e.currentTarget.style.borderColor = "#C5CDB4"; e.currentTarget.style.background = "rgba(255,255,255,.68)"; } }}>{op.texto}</button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ResultScreen({ resultado, nombre, onRestart }) {
  const showDebug = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("debug") === "1";
  const RCOLORS = { FUERZA: RESULTADOS.FUERZA.color, TONIFICA: RESULTADOS.TONIFICA.color, ENERGÍA: RESULTADOS.ENERGÍA.color, BALANCE: RESULTADOS.BALANCE.color };
  const [v, setV] = useState(false);
  const [sec, setSec] = useState([false, false, false, false, false, false]);
  const r = RESULTADOS[resultado.principal];
  const s = RESULTADOS[resultado.secundario];
  const clases = CLASES[resultado.principal][resultado.version.toLowerCase()];
  const dias = resultado.version === "HARD" ? "5" : "3";
  const whatsappUrl = construirUrlWhatsapp(resultado.principal, resultado.version);
  useEffect(() => {
    setTimeout(() => setV(true), 150);
    [500, 900, 1300, 1700, 2100, 2500].forEach((d, i) => { setTimeout(() => { setSec((p) => { const n = [...p]; n[i] = true; return n; }); }, d); });
  }, []);
  const ss = (i) => ({ opacity: sec[i] ? 1 : 0, transform: sec[i] ? "none" : "translateY(22px)", transition: "all .7s cubic-bezier(.22,1,.36,1)" });
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(175deg, ${r.colorLight} 0%, #EEF3E3 45%, ${r.colorLight} 100%)` }}>
      <div style={{ textAlign: "center", padding: "48px 24px 32px", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(18px)", transition: "all .85s cubic-bezier(.22,1,.36,1)" }}>
        <div style={{ marginBottom: 22 }}><SeinLogo size={11} /></div>
        <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: INK_MUTED, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16, fontWeight: 700 }}>Tu resultado</div>
        <div style={{ display: "inline-flex", gap: 8, marginBottom: 24 }}>
          <span style={{ padding: "5px 16px", background: r.colorMid, borderRadius: 100, fontFamily: FONT_BODY, fontSize: 12, color: r.color, fontWeight: 700, letterSpacing: 1.5 }}>{resultado.version}</span>
          <span style={{ padding: "5px 16px", background: "rgba(255,255,255,.55)", borderRadius: 100, fontFamily: FONT_BODY, fontSize: 12, color: INK_MUTED, letterSpacing: .5, fontWeight: 600 }}>{dias} días/semana</span>
        </div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(30px,7.5vw,44px)", fontWeight: 500, color: INK, lineHeight: 1.2, marginBottom: 0, letterSpacing: -0.6, maxWidth: 460, margin: "0 auto", ...NO_LIG }}>{nombre ? `${nombre}, ` : ""}<em style={{ fontStyle: "italic", fontWeight: 400, color: r.color }}>{r.titulo.charAt(0).toLowerCase() + r.titulo.slice(1)}</em></h1>
        <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: r.color, letterSpacing: 1, marginTop: 12, fontWeight: 600 }}>{r.subtitulo}</p>
        <div style={{ width: 36, height: 2, background: r.color, margin: "24px auto 0", borderRadius: 2 }} />
      </div>
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 24px 56px" }}>
        <div style={{ ...ss(0), marginBottom: 32 }}><p style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: INK, lineHeight: 1.7, fontStyle: "italic", fontWeight: 400, ...NO_LIG }}>{r.descripcion}</p></div>
        <div style={{ ...ss(1), marginBottom: 32 }}>
          <h3 style={{ fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: r.color, marginBottom: 12, fontWeight: 700 }}>¿Por qué este plan?</h3>
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: INK, lineHeight: 1.75, fontWeight: 400 }}>{r.porQue}</p>
        </div>
        <div style={{ ...ss(2), marginBottom: 32 }}>
          <h3 style={{ fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: r.color, marginBottom: 12, fontWeight: 700 }}>Lo que se siente</h3>
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: INK, lineHeight: 1.75, fontWeight: 400 }}>{r.sentir}</p>
        </div>
        <div style={{ ...ss(3), background: "rgba(255,255,255,.75)", borderRadius: 20, padding: "26px 24px", marginBottom: 32, border: `1.5px solid ${r.colorMid}` }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 12, fontWeight: 700, color: r.color, marginBottom: 8, letterSpacing: 1.2, textTransform: "uppercase" }}>Tu ritmo: {resultado.principal} {resultado.version}</div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: INK, marginBottom: 14, padding: "9px 14px", background: r.colorLight, borderRadius: 10, display: "inline-block", fontWeight: 600 }}>{clases}</div>
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: INK, lineHeight: 1.75, margin: 0, fontWeight: 400 }}>{resultado.version === "HARD" ? r.hard : r.soft}</p>
        </div>
        <div style={{ ...ss(4), background: `linear-gradient(140deg, ${s.colorLight}, rgba(255,255,255,.5))`, borderRadius: 20, padding: "22px 22px", marginBottom: 40, border: `1px solid ${s.colorMid}` }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: INK_MUTED, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>Tu segundo plan</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: INK, marginBottom: 10, fontWeight: 500, ...NO_LIG }}>{resultado.secundario}</div>
          <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: INK, lineHeight: 1.65, margin: 0, fontWeight: 400 }}>Eso dice mucho: hay capas. Incorpora {DESCRIPTORES[resultado.secundario]} a la semana para complementar el plan principal y entrenar de forma más completa.</p>
        </div>
        <div style={{ ...ss(5), textAlign: "center" }}>
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: INK, fontStyle: "italic", marginBottom: 28, lineHeight: 1.6, fontWeight: 400, ...NO_LIG }}>{r.cta}</p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONT_BODY, fontSize: 15, fontWeight: 600, letterSpacing: 1, padding: "18px 0", border: "none", borderRadius: 100, background: r.color, color: "#fff", cursor: "pointer", transition: "all .3s ease", display: "block", width: "100%", maxWidth: 340, margin: "0 auto 14px", textDecoration: "none", boxShadow: `0 6px 18px ${r.color}35` }} onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 26px ${r.color}50`; }} onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 6px 18px ${r.color}35`; }}>Reserva tu clase de prueba</a>
          <button onClick={onRestart} style={{ fontFamily: FONT_BODY, fontSize: 13, color: INK_MUTED, background: "none", border: "none", cursor: "pointer", padding: 10, marginTop: 6, fontWeight: 500 }}>Volver a empezar</button>
        </div>
        {showDebug && (
          <div style={{ marginTop: 48, padding: "18px 20px", background: "rgba(255,255,255,.6)", borderRadius: 14, fontFamily: FONT_BODY, fontSize: 12, color: INK_MUTED, border: "1px dashed #C5CDB4" }}>
            <div style={{ fontWeight: 700, marginBottom: 10, letterSpacing: 1.5, fontSize: 10, textTransform: "uppercase", color: INK_SOFT }}>Puntajes (debug)</div>
            {Object.entries(resultado.puntajes).map(([plan, pts]) => (
              <div key={plan} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <span style={{ width: 72, fontSize: 11, fontWeight: 600, color: INK }}>{plan}</span>
                <div style={{ flex: 1, height: 5, background: "rgba(105,114,85,.15)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(pts / 10) * 100}%`, background: RCOLORS[plan], borderRadius: 3, transition: "width 1.2s ease" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: INK }}>{pts}</span>
              </div>
            ))}
            <div style={{ marginTop: 10, fontSize: 11 }}>Intensidad: {resultado.intensidad}/6 → {resultado.version}</div>
            {nombre && <div style={{ marginTop: 4, fontSize: 11 }}>Lead: {nombre}</div>}
          </div>
        )}
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

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Nunito:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    document.body.style.background = BG;
    document.body.style.margin = "0";
  }, []);

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
