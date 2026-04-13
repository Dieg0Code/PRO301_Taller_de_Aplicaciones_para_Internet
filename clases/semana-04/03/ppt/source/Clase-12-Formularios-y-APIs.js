const fs = require("fs");
const path = require("path");
const PptxGenJS = require("../../../../../tools/slides-system/node_modules/pptxgenjs");
const slidesSystem = require("../../../../../tools/slides-system/dist/index.js");
const { imageSizingContain } = require("../../../../../tools/slides-system/vendor/pptxgenjs_helpers/image");

const { theme, components, utils } = slidesSystem;
const { applyAiepTheme, TOKENS: C, TYPOGRAPHY } = theme;
const {
  addHeader: systemAddHeader,
  addCard,
  addMiniCard,
  addCenterStatement,
  addCodePanel,
  addDelegationSplit,
  addMarkBox,
  addChip,
  addPill,
  addStageChain,
  addMythRealityGrid,
  addActorLane,
  addChecklistGrid,
  addComponentTree,
} = components;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
applyAiepTheme(pptx, {
  author: "Diego Obando",
  company: "AIEP",
  subject: "Clase 12",
  title: "Formularios y APIs",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx =
  process.env.PPTX_OUTPUT ||
  path.join(rootDir, "Clase-12-Formularios-y-APIs.pptx");
const outputJs =
  process.env.PPTX_SOURCE_OUTPUT ||
  path.join(rootDir, "Clase-12-Formularios-y-APIs.js");

const logoPath = path.resolve(
  __dirname,
  "../../../../../.agent/skills/slides-aiep/assets/logo-aiep.png"
);
const logoMarkPath = path.resolve(
  __dirname,
  "../../../../../.agent/skills/slides-aiep/assets/logo-aiep-mark.png"
);

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function addHeader(slide, title, subtitle, blockLabel = "Bloque 1", pptxLike = pptx) {
  systemAddHeader(slide, SH, pptxLike, title, subtitle, blockLabel, {
    classLabel: `Clase 12 · ${blockLabel}`,
    logoMarkPath,
    titleY: 0.94,
    titleH: 0.66,
    subtitleY: 1.68,
    subtitleH: 0.22,
    subtitleW: 9.05,
    subtitleFontSize: 10.6,
  });
}

function addBarsMotif(slide, x, y, scale = 1, fill = C.red) {
  slide.addShape(SH.rect, {
    x,
    y: y + 0.18 * scale,
    w: 0.2 * scale,
    h: 0.46 * scale,
    fill: { color: fill },
    line: { color: fill },
  });
  slide.addShape(SH.rect, {
    x: x + 0.24 * scale,
    y,
    w: 0.24 * scale,
    h: 0.64 * scale,
    fill: { color: fill },
    line: { color: fill },
  });
  slide.addShape(SH.rect, {
    x: x + 0.52 * scale,
    y: y + 0.18 * scale,
    w: 0.2 * scale,
    h: 0.46 * scale,
    fill: { color: fill },
    line: { color: fill },
  });
}

function addPanel(slide, x, y, w, h, opts = {}) {
  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: opts.rectRadius || 0.04,
    fill: { color: opts.fill || C.white },
    line: { color: opts.line || C.border, pt: opts.linePt || 1 },
  });
}

function addArrow(slide, x, y, w = 0.22, h = 0.28, fill = C.gold) {
  slide.addShape(SH.chevron, {
    x,
    y,
    w,
    h,
    fill: { color: fill },
    line: { color: fill },
  });
}

// ─── INTRODUCCIÓN ────────────────────────────────────────────────────────────

// S1: PORTADA
function createCoverSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };

  slide.addImage({ path: logoPath, x: 0.88, y: 0.62, w: 1.2, h: 0.42 });

  addBarsMotif(slide, 0.88, 1.84, 1.4, C.red);

  slide.addText("Formularios, Validación y Consumo de APIs", {
    x: 0.88,
    y: 2.82,
    w: 10.26,
    h: 1.44,
    fontFace: TYPOGRAPHY.display,
    fontSize: 44,
    bold: true,
    color: C.white,
    margin: 0,
    valign: "top",
  });

  slide.addText("Unidad 02: Frontend Moderno, APIs y Legado", {
    x: 0.88,
    y: 4.42,
    w: 10.26,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 18,
    color: C.gold,
    bold: true,
  });

  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 5.82, w: 0.82, h: 0.82 });

  validateSlide(slide, pptx);
}

// S2: RECAPITULACIÓN
function createRecapSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "¿Dónde estamos?", "Semana 4 · Clase 03", "Contexto");

  const blocks = [
    { title: "Árbol de Componentes", body: "Dividimos la interfaz en piezas con responsabilidad única.", icon: "🌳" },
    { title: "Props y Estado", body: "Diferenciamos el dato que llega (Props) del dato que muta (Estado).", icon: "💾" },
    { title: "Reactividad", body: "Aprendimos que UI = f(state). El cambio de dato redibuja la vista.", icon: "⚡" },
  ];

  blocks.forEach((b, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.6, w: 3.2, h: 2.8,
      title: b.title, body: b.body, accent: C.navy,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
    slide.addText(b.icon, { x: 0.88 + i * 3.44, y: 2.2, w: 3.2, h: 0.8, fontSize: 36, align: "center" });
  });

  validateSlide(slide, pptx);
}

// S3: EL SALTO DE HOY
function createTodayJumpSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El salto de hoy: Del Componente a la Aplicación", "De estructuras aisladas a flujos de datos reales", "Contexto");

  addCenterStatement(slide, SH,
    "Hoy conectamos nuestra interfaz con la voluntad del usuario (Formularios) y con el mundo exterior (APIs).",
    { x: 0.88, y: 2.22, w: 10.26, h: 1.2, fill: C.navy, line: C.navy, fontSize: 22, color: C.white }
  );

  const pillars = [
    { title: "Interacción", body: "Capturamos lo que el usuario quiere decirnos." },
    { title: "Integridad", body: "Aseguramos que los datos sean correctos antes de enviarlos." },
    { title: "Conectividad", body: "Traemos vida desde servidores externos mediante Fetch." },
  ];

  pillars.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.82, w: 3.2, h: 2.2,
      title: p.title, body: p.body, accent: C.red,
      fill: C.white, line: C.border
    });
  });

  validateSlide(slide, pptx);
}

// S4: OBJETIVOS 1
function createObjectives1Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Objetivos de la sesión (1/2)", "Lo que serás capaz de hacer al final de la clase", "Objetivos");

  const objectives = [
    { n: "01", t: "Dominar los Componentes Controlados", b: "Vincular cada input al estado para una sincronización perfecta." },
    { n: "02", t: "Implementar Validación Profesional", b: "Feedback inmediato y bloqueos de seguridad en el cliente." },
    { n: "03", t: "Consumir APIs Reales", b: "Usar fetch para traer datos vivos en formato JSON." },
  ];

  objectives.forEach((obj, i) => {
    const y = 2.22 + i * 1.42;
    slide.addText(obj.n, { x: 0.88, y, w: 0.8, h: 0.8, fontFace: TYPOGRAPHY.display, fontSize: 32, bold: true, color: C.red });
    slide.addText(obj.t, { x: 1.8, y: y + 0.1, w: 8.5, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: C.navy });
    slide.addText(obj.b, { x: 1.8, y: y + 0.4, w: 8.5, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 12, color: C.slate });
  });

  validateSlide(slide, pptx);
}

// S5: OBJETIVOS 2
function createObjectives2Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Objetivos de la sesión (2/2)", "Competencias técnicas y metodológicas", "Objetivos");

  const objectives = [
    { n: "04", t: "Gestionar la Incertidumbre", b: "Manejar estados de carga (Loading) y fallos de red (Error)." },
    { n: "05", t: "Inspección Técnica en DevTools", b: "Auditar el tráfico de red como un desarrollador profesional." },
    { n: "06", t: "Uso Experto de Agentes", b: "Delegar lógica repetitiva (Regex) validando el resultado manual." },
  ];

  objectives.forEach((obj, i) => {
    const y = 2.22 + i * 1.42;
    slide.addText(obj.n, { x: 0.88, y, w: 0.8, h: 0.8, fontFace: TYPOGRAPHY.display, fontSize: 32, bold: true, color: C.red });
    slide.addText(obj.t, { x: 1.8, y: y + 0.1, w: 8.5, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: C.navy });
    slide.addText(obj.b, { x: 1.8, y: y + 0.4, w: 8.5, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 12, color: C.slate });
  });

  validateSlide(slide, pptx);
}

// ─── BLOQUE 1: EL FORMULARIO COMO ESTADO ─────────────────────────────────────

// S6: INTRO BLOQUE 1
function createBlock1IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 1", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);

  slide.addText("El Formulario como Estado:\nComponentes Controlados", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26,
    fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white,
    valign: "mid",
  });

  slide.addText("Cómo vincular cada tecla presionada con la memoria del componente para lograr sincronización total.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.38,
    fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });

  addPanel(slide, 0.88, 5.84, 2.8, 0.4, { fill: "173A5A", line: "173A5A" });
  slide.addText("35 minutos · fundamentos y código", {
    x: 1.04, y: 5.92, w: 2.6, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 9.4, color: "A8C4E0"
  });

  validateSlide(slide, pptx);
}

// S7: EL DATO MANDA
function createDataLeadsUiSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Interfaz Reactiva: El dato manda", "Bloque 1 · 1.1 El cambio de paradigma en el manejo de inputs", "Bloque 1");

  addCenterStatement(slide, SH,
    "En el frontend moderno, el input no es el dueño de su valor. El Estado lo es.",
    { x: 0.88, y: 2.22, w: 10.26, h: 0.82, fill: C.softBlue, line: C.softBlue, fontSize: 18, color: C.navy, rectRadius: 0.06 }
  );

  const pillars = [
    { title: "Reactividad", body: "Si el estado cambia, el input se actualiza solo.", accent: C.navy },
    { title: "Sincronía", body: "Lo que ves en pantalla es exactamente lo que hay en memoria.", accent: C.red },
    { title: "Predicibilidad", body: "Sabemos exactamente qué tiene el formulario en todo momento.", accent: C.gold },
  ];

  pillars.forEach((p, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.42, w: 3.2, h: 2.8,
      title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13.8, bodyFontSize: 11.2
    });
  });

  validateSlide(slide, pptx);
}

// S8: EL PROBLEMA DEL DOM COMO MEMORIA
function createDomAsMemorySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Problema del DOM como Memoria", "Bloque 1 · 1.1 Por qué el enfoque tradicional (HTML + JS suelto) falla", "Bloque 1");

  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 2.2,
    title: "Enfoque Antiguo (JS Imperativo)",
    code: `// Tenemos que IR A BUSCAR el valor cuando lo necesitamos
const valor = document.getElementById("miInput").value;
console.log("El usuario escribió:", valor);`,
    lang: "javascript",
    fontSize: 12
  });

  const downsides = [
    { t: "Desconexión", b: "El código no sabe qué hay en el input hasta que ocurre un evento final (ej. clic en enviar)." },
    { t: "Fragilidad", b: "Si cambias el ID en el HTML, el JavaScript se rompe silenciosamente." },
    { t: "Dificultad de Validación", b: "Validar mientras el usuario escribe requiere 'escuchar' manualmente cada tecla." },
  ];

  downsides.forEach((d, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 4.62, w: 3.2, h: 1.8,
      title: d.t, body: d.b, accent: C.red,
      fill: C.paleRed, line: C.paleRed, titleFontSize: 11, bodyFontSize: 9.5
    });
  });

  validateSlide(slide, pptx);
}

// S9: CONFLICTO DOS VERDADES
function createTwoTruthsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Conflicto de las «Dos Verdades»", "Bloque 1 · 1.1 El riesgo de la desincronización", "Bloque 1");

  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "La Verdad del DOM vs La Verdad del Estado",
    left: {
      title: "Verdad A: El Input (DOM)",
      subtitle: "Lo que el navegador ve",
      items: [
        "El input guarda caracteres internamente.",
        "Se actualiza con cada pulsación de tecla.",
        "Vive fuera del ciclo de vida de React.",
      ],
      accent: C.red, fill: C.paleRed
    },
    right: {
      title: "Verdad B: El Estado (React)",
      subtitle: "Lo que el código cree",
      items: [
        "Una variable en memoria (useState).",
        "Controla la lógica de la aplicación.",
        "Si no están conectados, hay dos verdades distintas.",
      ],
      accent: C.navy, fill: C.softBlue
    },
    bridgeLabel: "vs", bridgeBody: "¿Quién tiene\nla razón?",
    footer: "Para evitar errores, forzamos que el Estado sea la ÚNICA fuente de verdad."
  });

  validateSlide(slide, pptx);
}

// S10: DEFINICIÓN COMPONENTE CONTROLADO
function createControlledComponentDef() {
  const slide = pptx.addSlide();
  addHeader(slide, "¿Qué es un Componente Controlado?", "Bloque 1 · 1.2 La solución técnica oficial", "Bloque 1");

  addCenterStatement(slide, SH,
    "Es un input cuyo valor es manejado íntegramente por el estado del componente.",
    { x: 0.88, y: 2.22, w: 10.26, h: 1.12, fill: C.navy, line: C.navy, fontSize: 20, color: C.white, rectRadius: 0.08 }
  );

  const steps = [
    { title: "El Estado manda", body: "Le decimos al input: 'Tu texto será SIEMPRE lo que diga esta variable'." },
    { title: "El Input avisa", body: "Cada vez que el usuario presiona una tecla, el input avisa: 'Intentaron cambiarme'." },
    { title: "El Estado actualiza", body: "React recibe el aviso, actualiza la variable y el input se redibuja con el nuevo valor." },
  ];

  steps.forEach((s, i) => {
    addMiniCard(slide, SH, {
      x: 0.88, y: 3.62 + i * 1.04, w: 10.26, h: 0.88,
      title: s.title, body: s.body, accent: C.gold,
      fill: C.softNeutral, line: C.softNeutral, titleFontSize: 12, bodyFontSize: 10.5
    });
  });

  validateSlide(slide, pptx);
}

// S11: CONTRATO VALUE
function createContractValueSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Contrato: Propiedad 'value'", "Bloque 1 · 1.2 La conexión hacia abajo (Downstream)", "Bloque 1");

  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 5.0, h: 2.8,
    title: "Vinculando la vista",
    code: `<input 
  type="text" 
  value={nombre} 
/>`,
    lang: "jsx",
    fontSize: 14,
    titleFill: C.navy
  });

  slide.addText("¿Qué estamos haciendo aquí?", {
    x: 6.52, y: 2.22, w: 4.62, h: 0.4, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: C.navy
  });

  const points = [
    "Obligamos al input a mostrar el contenido de la variable 'nombre'.",
    "Si 'nombre' es una cadena vacía, el input estará vacío.",
    "Si intentas escribir y no hay un manejador de eventos, el input se quedará 'congelado'.",
  ];

  points.forEach((p, i) => {
    slide.addText("• " + p, {
      x: 6.52, y: 2.82 + i * 0.82, w: 4.62, h: 0.7, fontFace: TYPOGRAPHY.body, fontSize: 12, color: C.slate
    });
  });

  addArrow(slide, 5.95, 3.2, 0.3, 0.4, C.red);

  validateSlide(slide, pptx);
}

// S12: CONTRATO ONCHANGE
function createContractOnChangeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Contrato: Evento 'onChange'", "Bloque 1 · 1.2 La conexión hacia arriba (Upstream)", "Bloque 1");

  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 5.0, h: 2.8,
    title: "Escuchando al usuario",
    code: `<input 
  value={nombre} 
  onChange={handleChange} 
/>`,
    lang: "jsx",
    fontSize: 14,
    titleFill: C.red
  });

  slide.addText("¿Qué estamos haciendo aquí?", {
    x: 6.52, y: 2.22, w: 4.62, h: 0.4, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: C.navy
  });

  const points = [
    "Le decimos al navegador: 'Cada vez que el usuario toque una tecla, ejecuta esta función'.",
    "La función 'handleChange' recibirá toda la información de lo que acaba de pasar.",
    "Sin esto, el estado nunca se enteraría del cambio.",
  ];

  points.forEach((p, i) => {
    slide.addText("• " + p, {
      x: 6.52, y: 2.82 + i * 0.82, w: 4.62, h: 0.7, fontFace: TYPOGRAPHY.body, fontSize: 12, color: C.slate
    });
  });

  addArrow(slide, 5.95, 3.2, 0.3, 0.4, C.navy);

  validateSlide(slide, pptx);
}

// S13: ANATOMÍA DEL EVENTO
function createEventAnatomySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Anatomía del Evento: e.target.value", "Bloque 1 · 1.3 Cómo leer el interior del input", "Bloque 1");

  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 6.2, h: 2.4,
    title: "La función manejadora",
    code: `const handleChange = (event) => {
  const nuevoValor = event.target.value;
  setNombre(nuevoValor);
};`,
    lang: "javascript",
    fontSize: 12
  });

  const breakdown = [
    { label: "event (o e)", body: "El objeto que contiene toda la información de lo que ocurrió en el navegador.", accent: C.navy },
    { label: "target", body: "El elemento del DOM que disparó el evento (en este caso, el input).", accent: C.red },
    { label: "value", body: "El texto que el usuario acaba de escribir o borrar.", accent: C.gold },
  ];

  breakdown.forEach((item, i) => {
    addMiniCard(slide, SH, {
      x: 7.32, y: 2.22 + i * 1.54, w: 3.82, h: 1.36,
      title: item.label, body: item.body, accent: item.accent,
      fill: C.white, line: C.border, titleFontSize: 12, bodyFontSize: 10
    });
  });

  validateSlide(slide, pptx);
}

// S14: CÓDIGO IMPLEMENTACIÓN BASE
function createBaseImplementationCode() {
  const slide = pptx.addSlide();
  addHeader(slide, "Implementación Completa", "Bloque 1 · 1.3 El patrón estándar de formularios reactivos", "Bloque 1");

  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.2,
    title: "FormularioReactivo.jsx",
    code: `import { useState } from 'react';

export function Formulario() {
  const [nombre, setNombre] = useState("");

  const handleChange = (e) => setNombre(e.target.value);

  return (
    <div className="p-4">
      <label>Escribe tu nombre:</label>
      <input 
        type="text" 
        value={nombre} 
        onChange={handleChange} 
        placeholder="Ej. Juan Pérez"
      />
      <p>Hola, {nombre}!</p>
    </div>
  );
}`,
    lang: "jsx",
    fontSize: 10.5
  });

  validateSlide(slide, pptx);
}

// S15: FLUJO DE DATOS (DIAGRAMA)
function createDataFlowDiagram() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Ciclo de Vida del Dato", "Bloque 1 · 1.3 De la pulsación física al renderizado digital", "Bloque 1");

  addStageChain(slide, SH, {
    x: 0.88, y: 2.52, w: 10.26, h: 3.12,
    stages: [
      { title: "1. Pulsación", body: "El usuario presiona una tecla (ej. 'A').", accent: C.navy, fill: C.softBlue },
      { title: "2. Evento", body: "El input detecta el cambio y dispara 'onChange'.", accent: C.gold, fill: C.softNeutral },
      { title: "3. Update", body: "La función setState actualiza la memoria de React.", accent: C.red, fill: C.paleRed },
      { title: "4. Re-render", body: "React redibuja el input con el nuevo valor.", accent: C.navy, fill: C.softBlue },
    ],
  });

  addCenterStatement(slide, SH,
    "Este ciclo ocurre en milisegundos por cada letra presionada.",
    { x: 0.88, y: 6.02, w: 10.26, h: 0.62, fill: C.navy, line: C.navy, fontSize: 14, color: C.white }
  );

  validateSlide(slide, pptx);
}

// S16: VENTAJAS: CONTROL TOTAL
function createAdvantagesControlSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La gran ventaja: Control total", "Bloque 1 · 1.4 Por qué preferimos este camino", "Bloque 1");

  const cards = [
    { title: "Validación inmediata", body: "Puedes impedir que el usuario escriba números en un campo de nombre en tiempo real.", accent: C.navy },
    { title: "Formateo al vuelo", body: "Convertir a mayúsculas o agregar puntos de miles automáticamente.", accent: C.red },
    { title: "UI Dinámica", body: "Habilitar el botón de 'Enviar' solo cuando todos los campos son válidos.", accent: C.gold },
  ];

  cards.forEach((c, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 2.42, w: 3.2, h: 3.8,
      title: c.title, body: c.body, accent: c.accent, accentW: 0.07,
      fill: C.white, line: C.border, titleFontSize: 14, bodyFontSize: 11
    });
  });

  validateSlide(slide, pptx);
}

// S17: EL AGENTE EN BLOQUE 1
function createAgentBlock1Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Agente en Formularios", "Bloque 1 · Cómo usar IA para acelerar el desarrollo", "Agente");

  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Delegación Inteligente",
    columns: 2,
    entries: [
      {
        badge: "OK", title: "Generar Boilerplate",
        body: "Pide al agente que cree una estructura base para un formulario de 15 campos. Te ahorrará 20 minutos de tipeo manual.",
        accent: C.navy, fill: C.softBlue, badgeFill: C.navy
      },
      {
        badge: "OK", title: "Debugging",
        body: "Si un input se queda 'congelado', el agente te explicará de inmediato que olvidaste el onChange.",
        accent: C.red, fill: C.paleRed, badgeFill: C.red
      },
      {
        badge: "NO", title: "Criterio Estructural",
        body: "No dejes que el agente decida si usar una librería externa o estado nativo. Esa decisión depende de la escala de tu proyecto.",
        accent: C.gold, fill: C.softNeutral, badgeFill: "B8962A"
      },
      {
        badge: "NO", title: "Validación de Lógica",
        body: "El agente puede sugerir nombres de campos, pero tú debes asegurar que coincidan con lo que el backend espera recibir.",
        accent: C.navy, fill: C.softBlue, badgeFill: C.navy
      },
    ]
  });

  validateSlide(slide, pptx);
}

// S18: SÍNTESIS B1
function createSynthesisB1Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 1", "Lo que debes llevarte a casa", "Bloque 1");

  addCenterStatement(slide, SH,
    "Controlar un componente es quitarle la 'memoria' al navegador para dársela a nuestra aplicación.",
    { x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, line: C.navy, fontSize: 18, color: C.white, rectRadius: 0.07 }
  );

  const points = [
    { title: "Única Verdad", body: "El estado manda sobre lo que el usuario ve.", accent: C.navy },
    { title: "Reactividad", body: "Cada letra pulsada es un ciclo de renderizado completo.", accent: C.red },
    { title: "Interacción", body: "Capturamos la intención del usuario a través del objeto Evento.", accent: C.gold },
  ];

  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06,
      title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });

  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.62,
    title: "Próximo paso →",
    body: "Ahora que los datos están en el estado, debemos asegurar que sean correctos. Entramos a la Validación.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.gold, titleFontSize: 11, bodyFontSize: 10.4
  });

  validateSlide(slide, pptx);
}

// ─── BLOQUE 2: VALIDACIÓN Y FEEDBACK UX ──────────────────────────────────────

// S19: INTRO BLOQUE 2
function createBlock2IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 2", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);

  slide.addText("Validación y Feedback:\nDiseñando una UX robusta", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26,
    fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white,
    valign: "mid",
  });

  slide.addText("Cómo asegurar la integridad de los datos y guiar al usuario mediante respuestas visuales inmediatas.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.38,
    fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });

  addPanel(slide, 0.88, 5.84, 2.8, 0.4, { fill: "173A5A", line: "173A5A" });
  slide.addText("35 minutos · lógica y experiencia", {
    x: 1.04, y: 5.92, w: 2.6, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 9.4, color: "A8C4E0"
  });

  validateSlide(slide, pptx);
}

// S20: POR QUÉ VALIDAR
function createWhyValidateSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "¿Por qué validar en el Cliente?", "Bloque 2 · 2.1 La primera línea de defensa", "Bloque 2");

  addCenterStatement(slide, SH,
    "«Confía, pero verifica». La validación es el filtro de seguridad de tu negocio.",
    { x: 0.88, y: 2.22, w: 10.26, h: 0.82, fill: C.softBlue, line: C.softBlue, fontSize: 18, color: C.navy, rectRadius: 0.06 }
  );

  const pillars = [
    { title: "Calidad de Datos", body: "Evita que lleguen correos sin @ o precios negativos al servidor.", accent: C.navy },
    { title: "Ahorro de Red", body: "No gastamos recursos de internet enviando datos que sabemos que están mal.", accent: C.red },
    { title: "Fricción", body: "Es mejor avisar del error ahora que esperar 5 segundos a que el servidor responda.", accent: C.gold },
  ];

  pillars.forEach((p, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.42, w: 3.2, h: 2.8,
      title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13.8, bodyFontSize: 11.2
    });
  });

  validateSlide(slide, pptx);
}

// S21: ESTRATEGIAS
function createValidationStrategiesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Estrategias de Validación", "Bloque 2 · 2.1 Cuándo interrumpir al usuario", "Bloque 2");

  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Tiempo Real vs Envío Final",
    left: {
      title: "Validación Inmediata (OnChange)",
      subtitle: "Feedback al instante",
      items: [
        "Ideal para reglas de formato (largo de clave).",
        "El error aparece mientras escribes.",
        "Riesgo: Puede ser molesto si es muy intrusivo.",
      ],
      accent: C.navy, fill: C.softBlue
    },
    right: {
      title: "Validación al Enviar (OnSubmit)",
      subtitle: "El filtro final",
      items: [
        "Verifica el formulario completo.",
        "Menos 'ansioso' para el usuario.",
        "Es la última oportunidad antes del fetch.",
      ],
      accent: C.red, fill: C.paleRed
    },
    bridgeLabel: "balance", bridgeBody: "UX amigable\ny segura",
    footer: "Lo profesional es combinar ambas: avisar rápido lo obvio y validar lento lo complejo."
  });

  validateSlide(slide, pptx);
}

// S22: LÓGICA CON STATE
function createValidationStateLogicSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Modelando el Error con Estado", "Bloque 2 · 2.2 Cómo el código sabe que algo va mal", "Bloque 2");

  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 2.4,
    title: "Patrón: Variable de Error",
    code: `const [email, setEmail] = useState("");
const [error, setError] = useState(null); // null significa "sin error"

const validar = (valor) => {
  if (!valor.includes("@")) setError("Email inválido");
  else setError(null);
};`,
    lang: "javascript",
    fontSize: 12
  });

  addMiniCard(slide, SH, {
    x: 0.88, y: 4.82, w: 10.26, h: 1.2,
    title: "El estado 'error' controla la visibilidad de los mensajes en la UI.",
    body: "Si error tiene un string, lo mostramos. Si es null, lo ocultamos.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.navy
  });

  validateSlide(slide, pptx);
}

// S23: RENDERIZADO CONDICIONAL
function createConditionalErrorRenderSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Renderizado Condicional de Errores", "Bloque 2 · 2.2 Feedback visual sin alertas intrusivas", "Bloque 2");

  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 6.2, h: 3.8,
    title: "JSX: Lógica de cortocircuito",
    code: `<form>
  <input value={email} onChange={...} />
  
  {/* Si error existe, muestra el párrafo */}
  {error && (
    <p className="text-red-500 text-sm">
      ⚠️ {error}
    </p>
  )}
  
  <button>Enviar</button>
</form>`,
    lang: "jsx",
    fontSize: 11
  });

  slide.addText("¿Por qué no usar alert()?", {
    x: 7.32, y: 2.22, w: 3.82, h: 0.4, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: C.red
  });

  const reasons = [
    "Bloquea el hilo principal del navegador.",
    "Se ve anticuado y poco profesional.",
    "El usuario pierde el contexto de lo que estaba escribiendo.",
  ];

  reasons.forEach((r, i) => {
    slide.addText("✗ " + r, {
      x: 7.32, y: 2.82 + i * 0.82, w: 3.82, h: 0.7, fontFace: TYPOGRAPHY.body, fontSize: 11, color: C.slate
    });
  });

  validateSlide(slide, pptx);
}

// S24: BOTONES REACTIVOS
function createReactiveButtonsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "UX: Botones Reactivos", "Bloque 2 · 2.3 Prevenir errores antes de que ocurran", "Bloque 2");

  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 5.4, h: 2.8,
    title: "La propiedad 'disabled'",
    code: `<button 
  type="submit"
  disabled={!email || !!error}
>
  Registrarse
</button>`,
    lang: "jsx",
    fontSize: 14,
    titleFill: C.navy
  });

  slide.addText("Estado del botón:", {
    x: 6.52, y: 2.22, w: 4.62, h: 0.4, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: C.navy
  });

  const cases = [
    { t: "Vacío", b: "Botón gris. No se puede hacer clic.", a: C.slate },
    { t: "Con Error", b: "Botón gris. El usuario sabe que debe corregir algo.", a: C.red },
    { t: "Válido", b: "Botón azul/rojo. ¡Listo para la acción!", a: C.navy },
  ];

  cases.forEach((c, i) => {
    addMiniCard(slide, SH, {
      x: 6.52, y: 2.82 + i * 1.22, w: 4.62, h: 1.0,
      title: c.t, body: c.b, accent: c.a,
      fill: C.white, line: C.border, titleFontSize: 11, bodyFontSize: 9
    });
  });

  validateSlide(slide, pptx);
}

// S25: ESTADOS VISUALES DE BORDE
function createVisualInputStatesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Pistas Visuales: Bordes e Iconos", "Bloque 2 · 2.3 Cómo guiar el ojo del usuario", "Bloque 2");

  addCenterStatement(slide, SH,
    "No obligues al usuario a leer el mensaje de error para saber que algo falló.",
    { x: 0.88, y: 2.02, w: 10.26, h: 0.62, fill: C.softNeutral, line: C.softNeutral, fontSize: 14 }
  );

  const states = [
    { title: "Normal", color: C.border, icon: "⌨️", body: "Borde gris neutro. Estado de espera." },
    { title: "Error", color: C.red, icon: "❌", body: "Borde rojo. El ojo detecta peligro de inmediato." },
    { title: "Éxito", color: "28A745", icon: "✅", body: "Borde verde. Feedback positivo de confirmación." },
  ];

  states.forEach((s, i) => {
    const x = 0.88 + i * 3.44;
    addPanel(slide, x, 2.82, 3.2, 3.4, { line: s.color, linePt: 2 });
    slide.addText(s.icon, { x, y: 3.02, w: 3.2, h: 0.6, fontSize: 32, align: "center" });
    slide.addText(s.title, { x, y: 3.82, w: 3.2, h: 0.4, fontSize: 18, bold: true, align: "center", color: C.navy });
    slide.addText(s.body, { x: x + 0.2, y: 4.42, w: 2.8, h: 1.4, fontSize: 11, align: "center", color: C.slate });
  });

  validateSlide(slide, pptx);
}

// S26: FORMATO VS NEGOCIO
function createFormatVsBusinessSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Validación de Formato vs. Negocio", "Bloque 2 · 2.4 Entendiendo los alcances de la validación", "Bloque 2");

  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Alcance de la validación",
    left: {
      title: "Validación de Formato",
      subtitle: "Responsabilidad del Frontend",
      items: [
        "¿Tiene un @?",
        "¿Tiene al menos 8 caracteres?",
        "¿Son solo números?",
        "Se resuelve instantáneamente sin internet.",
      ],
      accent: C.navy, fill: C.softBlue
    },
    right: {
      title: "Validación de Negocio",
      subtitle: "Responsabilidad del Backend",
      items: [
        "¿Este email ya está registrado?",
        "¿Este cupón de descuento es válido?",
        "¿Hay stock de este producto?",
        "Requiere una petición a la API (Asincronía).",
      ],
      accent: C.red, fill: C.paleRed
    },
    bridgeLabel: "capas", bridgeBody: "seguridad\nen profundidad",
    footer: "Recuerda: El frontend valida por comodidad. El backend valida por seguridad."
  });

  validateSlide(slide, pptx);
}

// S27: ACCESIBILIDAD ARIA
function createAccessibilityValidationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Accesibilidad: Errores para todos", "Bloque 2 · 2.4 No dejes fuera a los usuarios con discapacidad visual", "Accesibilidad");

  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.8,
    title: "El color no es suficiente",
    body: "Un usuario daltónico o ciego no sabrá que el borde es rojo. Debes usar iconos, texto descriptivo y atributos ARIA.",
    accent: C.navy, fill: C.white, line: C.border
  });

  addCodePanel(slide, SH, {
    x: 0.88, y: 4.22, w: 5.4, h: 2.4,
    title: "Accesibilidad Técnica",
    code: `<input 
  aria-invalid={!!error}
  aria-describedby="error-msg" 
/>
<p id="error-msg">{error}</p>`,
    lang: "jsx",
    fontSize: 12
  });

  const tips = [
    "Usa iconos (⚠️) junto al texto de error.",
    "Asegúrate de que el contraste del texto sea alto.",
    "No ocultes las instrucciones de ayuda (\`label\`) al dar feedback.",
  ];

  tips.forEach((t, i) => {
    slide.addText("• " + t, {
      x: 6.52, y: 4.42 + i * 0.62, w: 4.62, h: 0.5, fontFace: TYPOGRAPHY.body, fontSize: 11, color: C.slate
    });
  });

  validateSlide(slide, pptx);
}

// S28: CASO PRÁCTICO: EL REGISTRO
function createPracticalCaseRegistrationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Caso de Estudio: El Formulario de Registro", "Bloque 2 · Integrando todo lo aprendido", "Bloque 2");

  addComponentTree(slide, SH, {
    x: 0.62, y: 2.22, w: 5.6, h: 4.4,
    title: "Flujo de Registro",
    nodes: [
      { label: "Formulario", depth: 0, meta: "Contenedor" },
      { label: "Input Email", depth: 1, meta: "Valida formato @ [onChange]" },
      { label: "Input Password", depth: 1, meta: "Valida min 8 char [onChange]" },
      { label: "Error Message", depth: 1, meta: "Muestra alertas visuales" },
      { label: "Submit Button", depth: 1, meta: "Habilitado solo si todo OK" },
    ],
  });

  const checks = [
    { t: "Paso 1", b: "Usuario escribe mal -> Error inmediato.", a: C.red },
    { t: "Paso 2", b: "Usuario corrige -> Error desaparece, botón se activa.", a: C.navy },
    { t: "Paso 3", b: "Clic en enviar -> Se dispara la lógica de red.", a: C.gold },
  ];

  checks.forEach((c, i) => {
    addMiniCard(slide, SH, {
      x: 6.52, y: 2.22 + i * 1.54, w: 4.12, h: 1.36,
      title: c.t, body: c.b, accent: c.a,
      fill: C.white, line: C.border, titleFontSize: 12, bodyFontSize: 10
    });
  });

  validateSlide(slide, pptx);
}

// S29: ERRORES COMUNES VALIDACIÓN
function createCommonValidationErrorsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Errores Comunes en Validación", "Bloque 2 · Qué NO hacer al diseñar feedback", "Bloque 2");

  addMythRealityGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Anti-patrones de Validación",
    columns: 2,
    entries: [
      {
        badge: "MAL", myth: "Validar antes de que el usuario termine.",
        reality: "Si muestras 'Email inválido' apenas escribe la primera letra, generas ansiedad. Espera al primer desenfoque (onBlur) o pausa.",
        accent: C.red, fill: C.paleRed, badgeFill: C.red
      },
      {
        badge: "MAL", myth: "Borrar el campo si hay un error.",
        reality: "Nunca borres lo que el usuario escribió. Permítele corregir el error sin tener que empezar de cero.",
        accent: C.navy, fill: C.softBlue, badgeFill: C.navy
      },
      {
        badge: "MAL", myth: "Usar solo alertas de sistema.",
        reality: "Las alertas rompen el flujo visual. Usa elementos de la propia interfaz para una experiencia integrada.",
        accent: C.red, fill: C.paleRed, badgeFill: C.red
      },
      {
        badge: "MAL", myth: "Olvidar la validación de servidor.",
        reality: "Saltarse la validación en el cliente es molesto, pero saltarse la del servidor es un agujero de seguridad grave.",
        accent: C.navy, fill: C.softBlue, badgeFill: C.navy
      },
    ]
  });

  validateSlide(slide, pptx);
}

// S30: EL AGENTE EN VALIDACIÓN
function createAgentValidationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Agente en Validación", "Bloque 2 · Potenciando la seguridad con IA", "Agente");

  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.2,
    title: "El superpoder de las Regex",
    body: "Escribir expresiones regulares para validar RUT, tarjetas de crédito o passwords complejos es difícil. Delegarlo a un agente es una gran idea.",
    accent: C.navy, fill: C.white, line: C.border
  });

  addCodePanel(slide, SH, {
    x: 0.88, y: 3.62, w: 5.4, h: 3.0,
    title: "Prompt sugerido",
    code: `Actúa como experto en QA. 
Genera una Regex para validar 
un RUT chileno en JavaScript, 
incluyendo puntos y guión, 
y explica qué hace cada parte.`,
    lang: "text",
    fontSize: 12,
    titleFill: C.gold
  });

  slide.addText("⚠️ Validación Humana Obligatoria:", {
    x: 6.52, y: 3.62, w: 4.62, h: 0.4, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.red
  });

  const tips = [
    "Prueba la Regex con casos de borde (ej. RUT con K).",
    "Asegúrate de que la explicación del agente coincida con el código generado.",
    "No copies y pegues lógicas de validación bancaria sin entenderlas.",
  ];

  tips.forEach((t, i) => {
    slide.addText("• " + t, {
      x: 6.52, y: 4.12 + i * 0.82, w: 4.62, h: 0.8, fontFace: TYPOGRAPHY.body, fontSize: 11, color: C.slate
    });
  });

  validateSlide(slide, pptx);
}

// S31: PREGUNTAS GUÍA B2
function createGuideQuestionsB2Slide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 2", { x: 0.88, y: 0.44, w: 3.4, h: 0.3, fill: C.navy, color: C.white, fontSize: 10.0 });

  const questions = [
    { n: "01", text: "¿Qué ventaja tiene usar el estado del componente para mostrar errores en lugar de las alertas tradicionales?" },
    { n: "02", text: "Si un formulario tiene 15 campos, ¿por qué es importante la validación en tiempo real frente a la validación final?" },
    { n: "03", text: "¿Por qué decimos que la validación en el cliente es para UX y la del servidor es para Seguridad?" },
  ];

  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, { x: 0.88, y: y + 0.04, w: 0.58, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.border, margin: 0, valign: "mid" });
    slide.addText(q.text, { x: 1.6, y, w: 8.72, h: 1.56, fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.navy, margin: 0, valign: "mid" });
    if (i < 2) slide.addShape(SH.line, { x: 0.88, y: y + 1.72, w: 10.28, h: 0, line: { color: C.border, pt: 1 } });
  });

  validateSlide(slide, pptx);
}

// S32: SÍNTESIS B2
function createSynthesisB2Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 2", "Lo que debes dominar antes del Fetch", "Bloque 2");

  addCenterStatement(slide, SH,
    "Validar es acompañar. Un buen formulario guía al usuario hacia el éxito, no solo lo castiga en el fallo.",
    { x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, line: C.navy, fontSize: 18, color: C.white, rectRadius: 0.07 }
  );

  const points = [
    { title: "Feedback Visual", body: "Usa colores, bordes e iconos para hablarle al usuario.", accent: C.navy },
    { title: "Lógica Reactiva", body: "Usa el estado para deshabilitar botones y mostrar mensajes.", accent: C.red },
    { title: "Inmediatez", body: "Valida lo simple rápido para ahorrarle tiempo al usuario.", accent: C.gold },
  ];

  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06,
      title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });

  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.62,
    title: "Próximo paso →",
    body: "Con datos limpios y validados, estamos listos para enviarlos al mundo exterior. Entramos al Consumo de APIs.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.gold, titleFontSize: 11, bodyFontSize: 10.4
  });

  validateSlide(slide, pptx);
}

// ─── BLOQUE 3: CONSUMO DE APIS Y ASINCRONÍA ──────────────────────────────────

// S33: INTRO BLOQUE 3
function createBlock3IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 3", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);

  slide.addText("Consumo de APIs:\nConectando con el mundo real", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26,
    fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white,
    valign: "mid",
  });

  slide.addText("Cómo traer datos desde servidores externos y transformar texto JSON en interfaces dinámicas y vivas.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.38,
    fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });

  addPanel(slide, 0.88, 5.84, 2.8, 0.4, { fill: "173A5A", line: "173A5A" });
  slide.addText("35 minutos · asincronía y red", {
    x: 1.04, y: 5.92, w: 2.6, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 9.4, color: "A8C4E0"
  });

  validateSlide(slide, pptx);
}

// S34: EL FIN DEL HARDCODING
function createEndOfHardcodingSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El fin de los datos fijos (Hardcoding)", "Bloque 3 · 3.1 Por qué los datos deben vivir fuera del frontend", "Bloque 3");

  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Datos en el Código vs Datos en la API",
    left: {
      title: "En el Código (Malo)",
      subtitle: "Fijos en el JS/HTML",
      items: [
        "Para cambiar un precio, debes editar el código y volver a desplegar.",
        "El archivo pesa mucho si hay miles de productos.",
        "Los datos son iguales para todos los usuarios.",
      ],
      accent: C.red, fill: C.paleRed
    },
    right: {
      title: "En la API (Profesional)",
      subtitle: "Dinámicos y remotos",
      items: [
        "Los datos cambian en la base de datos y la UI se actualiza sola.",
        "El frontend solo descarga lo que necesita en el momento.",
        "Permite personalizar la info según quién inició sesión.",
      ],
      accent: C.navy, fill: C.softBlue
    },
    bridgeLabel: "vs", bridgeBody: "mantenibilidad\ny escala",
    footer: "Una aplicación real es una cáscara vacía que se llena con datos de un servidor."
  });

  validateSlide(slide, pptx);
}

// S35: QUÉ ES UNA API REST
function createWhatIsRestApiSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "¿Qué es una API REST?", "Bloque 3 · 3.1 El contrato de comunicación entre sistemas", "Fundamentos");

  addCenterStatement(slide, SH,
    "Es el 'mesero' que lleva tu pedido al servidor y te trae la respuesta.",
    { x: 0.88, y: 2.22, w: 10.26, h: 0.82, fill: C.softBlue, line: C.softBlue, fontSize: 18, color: C.navy, rectRadius: 0.06 }
  );

  const steps = [
    { title: "Endpoint (URL)", body: "La dirección donde pedimos la info. Ej: /api/productos", icon: "📍" },
    { title: "Método (Verbo)", body: "GET (traer), POST (crear), DELETE (borrar).", icon: "🚀" },
    { title: "JSON", body: "El formato de texto estándar en que viajan los datos.", icon: "📄" },
  ];

  steps.forEach((s, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 4.2, w: 3.2, h: 2.4,
      title: s.title, body: s.body, accent: C.navy,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
    slide.addText(s.icon, { x: 0.88 + i * 3.44, y: 3.2, w: 3.2, h: 0.8, fontSize: 32, align: "center" });
  });

  validateSlide(slide, pptx);
}

// S36: CONTRATO JSON
function createJsonContractSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Contrato JSON", "Bloque 3 · 3.1 Cómo se ven los datos en tránsito", "Fundamentos");

  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 5.0, h: 4.2,
    title: "Respuesta del Servidor",
    code: `{
  "id": 101,
  "nombre": "Monitor 4K",
  "precio": 350000,
  "stock": true,
  "tags": ["tech", "oficina"]
}`,
    lang: "json",
    fontSize: 12,
    titleFill: C.navy
  });

  slide.addText("Reglas del JSON:", {
    x: 6.52, y: 2.22, w: 4.62, h: 0.4, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: C.navy
  });

  const rules = [
    "Es puro texto (Strings).",
    "Las claves siempre van entre comillas dobles.",
    "No soporta funciones, solo datos (objetos, arrays, números, strings).",
    "Es el lenguaje universal de la web.",
  ];

  rules.forEach((r, i) => {
    slide.addText("• " + r, {
      x: 6.52, y: 2.82 + i * 0.82, w: 4.62, h: 0.7, fontFace: TYPOGRAPHY.body, fontSize: 12, color: C.slate
    });
  });

  validateSlide(slide, pptx);
}

// S37: PROMESAS Y ASINCRONÍA
function createPromisesIntroSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Entendiendo las Promesas", "Bloque 3 · 3.2 Por qué el código debe saber esperar", "Fundamentos");

  addCenterStatement(slide, SH,
    "Una Promesa es un objeto que representa un valor que aún no tenemos, pero que llegará.",
    { x: 0.88, y: 2.22, w: 10.26, h: 1.12, fill: C.navy, line: C.navy, fontSize: 20, color: C.white, rectRadius: 0.08 }
  );

  const states = [
    { title: "Pending (Pendiente)", body: "La petición está viajando por los cables submarinos. No sabemos el resultado todavía.", accent: C.gold },
    { title: "Fulfilled (Cumplida)", body: "¡Éxito! El servidor respondió y tenemos los datos listos para usar.", accent: "28A745" },
    { title: "Rejected (Rechazada)", body: "Algo falló (error 404, sin internet). La promesa devuelve un error.", accent: C.red },
  ];

  states.forEach((s, i) => {
    addMiniCard(slide, SH, {
      x: 0.88, y: 3.62 + i * 1.04, w: 10.26, h: 0.88,
      title: s.title, body: s.body, accent: s.accent,
      fill: C.softNeutral, line: C.softNeutral, titleFontSize: 12, bodyFontSize: 10.5
    });
  });

  validateSlide(slide, pptx);
}

// S38: ANATOMÍA DEL FETCH
function createFetchAnatomySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Anatomía del Fetch API", "Bloque 3 · 3.2 La herramienta nativa de red", "Código");

  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 2.8,
    title: "Sintaxis Base",
    code: `fetch("https://api.ejemplo.com/datos")
  .then(res => res.json()) // Paso 1: Convertir a JS
  .then(data => console.log(data)) // Paso 2: Usar datos
  .catch(err => console.error(err)); // Paso 3: Fallo`,
    lang: "javascript",
    fontSize: 14,
    titleFill: C.navy
  });

  const breakdown = [
    { t: "Paso 1: res.json()", b: "La respuesta inicial es un flujo de datos (stream). Debemos 'parsearlo' a un objeto JS.", a: C.navy },
    { t: "Paso 2: .then(data)", b: "Aquí es donde realmente guardamos la info en nuestro estado de React.", a: C.red },
    { t: "Paso 3: .catch()", b: "Obligatorio para evitar que la app se 'caiga' si el servidor no responde.", a: C.gold },
  ];

  breakdown.forEach((item, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 5.22, w: 3.2, h: 1.6,
      title: item.t, body: item.b, accent: item.a,
      fill: C.white, line: C.border, titleFontSize: 11, bodyFontSize: 9
    });
  });

  validateSlide(slide, pptx);
}

// S39: ¿CUÁNDO PEDIR LOS DATOS?
function createWhenToFetchSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "¿Cuándo pedir los datos?", "Bloque 3 · 3.2 Introducción al efecto secundario", "Código");

  addCenterStatement(slide, SH,
    "No queremos pedir datos en cada renderizado (loop infinito). Queremos pedirlos al 'nacer' el componente.",
    { x: 0.88, y: 2.02, w: 10.26, h: 0.82, fill: C.softBlue, line: C.softBlue, fontSize: 16, color: C.navy }
  );

  addCodePanel(slide, SH, {
    x: 0.88, y: 3.12, w: 6.4, h: 3.4,
    title: "El patrón useEffect (simplificado)",
    code: `useEffect(() => {
  // 1. Esto se ejecuta SOLO UNA VEZ al cargar
  fetch("...")
    .then(...)
    .then(data => setEstado(data));
}, []); // 2. El array vacío [] es la clave`,
    lang: "jsx",
    fontSize: 12,
    titleFill: C.navy
  });

  addMiniCard(slide, SH, {
    x: 7.52, y: 3.12, w: 3.62, h: 3.4,
    title: "Regla de Oro",
    body: "Si no usas useEffect con array vacío, tu componente hará miles de peticiones por segundo, bloqueando el servidor y tu navegador.",
    accent: C.red, fill: C.paleRed, line: C.paleRed
  });

  validateSlide(slide, pptx);
}

// S40: INTEGRACIÓN: LISTA DE PRODUCTOS
function createApiListIntegrationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Integración Real: Lista de Productos", "Bloque 3 · 3.3 De la API a la pantalla", "Código");

  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Componente ProductList.jsx",
    code: `export function ProductList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div className="grid">
      {items.map(p => (
        <ProductCard key={p.id} title={p.title} price={p.price} />
      ))}
    </div>
  );
}`,
    lang: "jsx",
    fontSize: 10
  });

  validateSlide(slide, pptx);
}

// S41: EL MAPA DEL FLUJO (DIAGRAMA)
function createApiFlowDiagramSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Viaje de los Datos", "Bloque 3 · 3.3 El ciclo completo de la información", "Fundamentos");

  addStageChain(slide, SH, {
    x: 0.88, y: 2.52, w: 10.26, h: 3.12,
    stages: [
      { title: "1. Component Mount", body: "El componente aparece en pantalla.", accent: C.navy, fill: C.softBlue },
      { title: "2. Fetch Request", body: "Se dispara la petición HTTP al servidor.", accent: C.gold, fill: C.softNeutral },
      { title: "3. JSON Received", body: "Llegan los datos y se guardan en el State.", accent: C.red, fill: C.paleRed },
      { title: "4. Re-render List", body: "React detecta el cambio y dibuja los items.", accent: C.navy, fill: C.softBlue },
    ],
  });

  validateSlide(slide, pptx);
}

// S42: DEVTOOLS: PESTAÑA NETWORK
function createDevToolsNetworkSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Inspección Pro: Pestaña Network", "Bloque 3 · 3.4 Cómo ver lo 'invisible'", "Herramientas");

  addCenterStatement(slide, SH,
    "Las DevTools son tus ojos en el cable de red. Si algo no se ve en pantalla, el culpable está aquí.",
    { x: 0.88, y: 2.02, w: 10.26, h: 0.62, fill: C.softNeutral, line: C.softNeutral, fontSize: 14 }
  );

  const features = [
    { title: "Name / Path", body: "¿Estamos llamando a la URL correcta?" },
    { title: "Method", body: "¿Es un GET o nos equivocamos de verbo?" },
    { title: "Status", body: "¿El servidor nos dio permiso o nos rechazó?" },
    { title: "Response", body: "¿El JSON que llegó tiene el formato que esperábamos?" },
  ];

  features.forEach((f, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + (i % 2) * 5.24,
      y: 2.82 + Math.floor(i / 2) * 1.72,
      w: 5.02, h: 1.54,
      title: f.title, body: f.body, accent: C.navy,
      fill: C.white, line: C.border, titleFontSize: 12.8, bodyFontSize: 10.4
    });
  });

  validateSlide(slide, pptx);
}

// S43: STATUS CODES (200, 404, 500)
function createStatusCodesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Entendiendo el Idioma del Servidor", "Bloque 3 · 3.4 Los códigos de estado HTTP", "Herramientas");

  const codes = [
    { n: "200 OK", t: "Éxito total", b: "El servidor encontró los datos y te los envió correctamente.", a: "28A745" },
    { n: "404 Not Found", t: "Extraviado", b: "Esa URL no existe o el producto fue borrado.", a: C.red },
    { n: "500 Server Error", t: "Fallo Interno", b: "El servidor explotó. No es culpa de tu frontend, es del backend.", a: C.gold },
    { n: "401 Unauthorized", t: "Sin Llave", b: "Necesitas un token o iniciar sesión para ver esto.", a: C.navy },
  ];

  codes.forEach((c, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + (i % 2) * 5.24,
      y: 2.22 + Math.floor(i / 2) * 2.14,
      w: 5.02, h: 1.96,
      title: c.n, body: c.b, accent: c.a,
      fill: C.white, line: C.border, titleFontSize: 14, bodyFontSize: 10.5
    });
  });

  validateSlide(slide, pptx);
}

// S44: SEGURIDAD BÁSICA (API KEYS)
function createApiSecurityBasicsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Seguridad Básica: Protegiendo la Llave", "Bloque 3 · 3.4 Cómo no regalar tu acceso al mundo", "Seguridad");

  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.8,
    title: "Nunca subas tus API Keys a GitHub",
    body: "Si la API te da una llave secreta, no la pongas directamente en el código. Usa variables de entorno (.env) para proteger tu cuenta.",
    accent: C.red, fill: C.white, line: C.border
  });

  addCodePanel(slide, SH, {
    x: 0.88, y: 4.22, w: 5.4, h: 2.4,
    title: "Mal ejemplo ❌",
    code: `// Código expuesto en GitHub
const KEY = "123-secreto-bancario";
fetch(\`https://api.com?key=\${KEY}\`);`,
    lang: "javascript",
    fontSize: 12,
    titleFill: C.red
  });

  addCodePanel(slide, SH, {
    x: 6.52, y: 4.22, w: 4.62, h: 2.4,
    title: "Buen ejemplo ✅",
    code: `// Usando variables de entorno
const KEY = process.env.API_KEY;
fetch(\`https://api.com?key=\${KEY}\`);`,
    lang: "javascript",
    fontSize: 12,
    titleFill: "28A745"
  });

  validateSlide(slide, pptx);
}

// S45: EL AGENTE EN APIS
function createAgentApiSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Agente en el Consumo de Datos", "Bloque 3 · Transformando estructuras JSON", "Agente");

  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Tareas para la IA",
    columns: 2,
    entries: [
      {
        badge: "JSON", title: "Mapear Estructuras",
        body: "Pega un JSON gigante y pide al agente que extraiga solo los campos que necesitas para tu componente Card.",
        accent: C.navy, fill: C.softBlue, badgeFill: C.navy
      },
      {
        badge: "MOCK", title: "Simular Datos",
        body: "Si la API oficial está caída, pide al agente que genere un array de 10 objetos falsos para seguir maquetando.",
        accent: C.red, fill: C.paleRed, badgeFill: C.red
      },
      {
        badge: "ERROR", title: "Explicar Status Codes",
        body: "Si recibes un error extraño (ej. 429 Too Many Requests), el agente te explicará qué significa y cómo solucionarlo.",
        accent: C.gold, fill: C.softNeutral, badgeFill: "B8962A"
      },
      {
        badge: "VET", title: "Inspección de Seguridad",
        body: "Pregunta al agente si el flujo de autenticación que estás diseñando sigue las mejores prácticas actuales.",
        accent: C.navy, fill: C.softBlue, badgeFill: C.navy
      },
    ]
  });

  validateSlide(slide, pptx);
}

// S46: PREGUNTAS GUÍA B3
function createGuideQuestionsB3Slide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 3", { x: 0.88, y: 0.44, w: 3.4, h: 0.3, fill: C.navy, color: C.white, fontSize: 10.0 });

  const questions = [
    { n: "01", text: "¿Por qué el navegador nos obliga a usar .then() o await en lugar de recibir los datos instantáneamente?" },
    { n: "02", text: "Si el servidor nos devuelve un código 404, ¿qué parte de la interfaz deberíamos mostrar al usuario?" },
    { n: "03", text: "¿Qué peligro corremos si no usamos useEffect para envolver nuestras peticiones fetch?" },
  ];

  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, { x: 0.88, y: y + 0.04, w: 0.58, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.border, margin: 0, valign: "mid" });
    slide.addText(q.text, { x: 1.6, y, w: 8.72, h: 1.56, fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.navy, margin: 0, valign: "mid" });
    if (i < 2) slide.addShape(SH.line, { x: 0.88, y: y + 1.72, w: 10.28, h: 0, line: { color: C.border, pt: 1 } });
  });

  validateSlide(slide, pptx);
}

// S47: SÍNTESIS B3
function createSynthesisB3Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 3", "Lo que conectamos hoy", "Bloque 3");

  addCenterStatement(slide, SH,
    "El frontend ya no está solo. Ahora consume, transforma y muestra la realidad del servidor.",
    { x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, line: C.navy, fontSize: 18, color: C.white, rectRadius: 0.07 }
  );

  const points = [
    { title: "Fetch API", body: "La herramienta para hablar con el mundo exterior.", accent: C.navy },
    { title: "Asincronía", body: "Aprender a esperar sin congelar la experiencia del usuario.", accent: C.red },
    { title: "Network", body: "Auditar cada bit que entra y sale de nuestra aplicación.", accent: C.gold },
  ];

  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06,
      title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });

  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.62,
    title: "Próximo paso →",
    body: "¿Pero qué pasa mientras la red demora? ¿Qué pasa si el servidor falla? Entramos a la Gestión de la Incertidumbre.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.gold, titleFontSize: 11, bodyFontSize: 10.4
  });

  validateSlide(slide, pptx);
}

// ─── BLOQUE 4: GESTIÓN DE LA INCERTIDUMBRE ────────────────────────────────────

// S48: INTRO BLOQUE 4
function createBlock4IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 4", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);

  slide.addText("Gestión de la Incertidumbre:\nCarga, Errores y UX de Red", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26,
    fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white,
    valign: "mid",
  });

  slide.addText("Cómo preparar nuestra interfaz para los momentos donde las cosas no salen bien o demoran más de lo esperado.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.38,
    fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });

  addPanel(slide, 0.88, 5.84, 2.8, 0.4, { fill: "173A5A", line: "173A5A" });
  slide.addText("35 minutos · robustez y resiliencia", {
    x: 1.04, y: 5.92, w: 2.6, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 9.4, color: "A8C4E0"
  });

  validateSlide(slide, pptx);
}

// S49: LOS 3 ESTADOS DE LA UI
function createThreeUiStatesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Los 3 Estados Fundamentales", "Bloque 4 · 4.1 La realidad de una App en red", "UX");

  addCenterStatement(slide, SH,
    "El 'Happy Path' (que todo funcione a la primera) es solo una de las 3 realidades.",
    { x: 0.88, y: 2.22, w: 10.26, h: 0.82, fill: C.softBlue, line: C.softBlue, fontSize: 18, color: C.navy, rectRadius: 0.06 }
  );

  const states = [
    { title: "1. Loading", body: "El usuario ya pidió los datos pero el servidor aún no responde.", accent: C.gold },
    { title: "2. Success", body: "Los datos llegaron íntegros y la lista se dibuja correctamente.", accent: "28A745" },
    { title: "3. Error", body: "El WiFi se cayó, la API cambió o el servidor explotó.", accent: C.red },
  ];

  states.forEach((s, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.42, w: 3.2, h: 2.8,
      title: s.title, body: s.body, accent: s.accent,
      fill: C.white, line: C.border, titleFontSize: 13.8, bodyFontSize: 11.2
    });
  });

  validateSlide(slide, pptx);
}

// S50: IMPLEMENTACIÓN LOADING (CÓDIGO)
function createLoadingImplementationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Implementando el Estado de Carga", "Bloque 4 · 4.2 Lógica de semáforo en React", "Código");

  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Patrón de Carga Profesional",
    code: `function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // 1. Empezamos en TRUE

  useEffect(() => {
    fetch("...")
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false); // 2. Apagamos la carga al recibir datos
      });
  }, []);

  if (loading) return <Spinner />; // 3. Bloqueamos el render hasta que cargue

  return <List data={items} />;
}`,
    lang: "jsx",
    fontSize: 10
  });

  validateSlide(slide, pptx);
}

// S51: MANEJO DE ERRORES (CÓDIGO)
function createErrorHandlingImplementationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Implementando el Manejo de Fallos", "Bloque 4 · 4.2 Evitando que la app se quede en blanco", "Código");

  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Patrón Try/Catch con Fetch",
    code: `const [error, setError] = useState(null);

useEffect(() => {
  fetch("https://api.com/v1/users")
    .then(res => {
      if (!res.ok) throw new Error("Error de servidor"); // 1. Validar status 400/500
      return res.json();
    })
    .then(data => setUsers(data))
    .catch(err => {
      setError(err.message); // 2. Guardar el mensaje de error
    })
    .finally(() => setLoading(false)); // 3. Pase lo que pase, quitar el spinner
}, []);`,
    lang: "jsx",
    fontSize: 10.5
  });

  validateSlide(slide, pptx);
}

// S52: PATRÓN COMPLETO (FINAL)
function createCompleteFetchPatternSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Patrón Final de Producción", "Bloque 4 · 4.2 Cómo se ve un componente real en la industria", "Código");

  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Standard Enterprise Component",
    code: `export function UserList() {
  const { data, loading, error } = useFetch("/api/users"); // Hook personalizado

  if (loading) return <SkeletonList />;
  if (error) return <ErrorMessage message={error} />;
  if (data.length === 0) return <EmptyState />;

  return (
    <div className="grid">
      {data.map(u => <UserCard key={u.id} {...u} />)}
    </div>
  );
}`,
    lang: "jsx",
    fontSize: 11
  });

  validateSlide(slide, pptx);
}

// S53: UX: SPINNERS VS SKELETONS
function createSpinnersVsSkeletonsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "UX: Spinners vs. Skeletons", "Bloque 4 · 4.2 Mejorando la percepción del tiempo", "UX");

  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Percepción de Carga",
    left: {
      title: "Spinner / Loader",
      subtitle: "Enfoque Genérico",
      items: [
        "Un círculo dando vueltas.",
        "Indica que la app está viva pero ocupada.",
        "Genera más ansiedad en esperas largas.",
      ],
      accent: C.navy, fill: C.softBlue
    },
    right: {
      title: "Skeletons (Esqueletos)",
      subtitle: "Enfoque Moderno",
      items: [
        "Bloques grises que imitan el diseño final.",
        "Utilizado por Facebook, YouTube e Instagram.",
        "El cerebro siente que la carga es más rápida.",
      ],
      accent: C.red, fill: C.paleRed
    },
    bridgeLabel: "vs", bridgeBody: "percepción\nde velocidad",
    footer: "Tip: Para cargas de menos de 1 segundo, no muestres nada. Para más de 1s, usa Skeletons."
  });

  validateSlide(slide, pptx);
}

// S54: SIMULANDO LATENCIA (DEVTOOLS)
function createSimulatingLatencySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Simulando la Realidad en DevTools", "Bloque 4 · 4.3 No pruebes tu app solo con el WiFi de la oficina", "Herramientas");

  addCenterStatement(slide, SH,
    "Usa la pestaña Network -> Throttling para simular usuarios con mala conexión.",
    { x: 0.88, y: 2.02, w: 10.26, h: 0.62, fill: C.softNeutral, line: C.softNeutral, fontSize: 14 }
  );

  const tools = [
    { title: "No Throttling", body: "Velocidad total. Tu app vuela (No es la realidad de todos)." },
    { title: "Fast 3G", body: "Simula navegación en la calle. Ideal para probar Spinners." },
    { title: "Slow 3G", body: "Simula zonas con mala señal. Aquí es donde los Skeletons brillan." },
    { title: "Offline", body: "Desconecta el navegador. ¿Tu app muestra un error o se queda en blanco?" },
  ];

  tools.forEach((t, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + (i % 2) * 5.24,
      y: 2.82 + Math.floor(i / 2) * 1.72,
      w: 5.02, h: 1.54,
      title: t.title, body: t.body, accent: C.navy,
      fill: C.white, line: C.border, titleFontSize: 12.8, bodyFontSize: 10.4
    });
  });

  validateSlide(slide, pptx);
}

// S55: MANEJO DEL MODO OFFLINE
function createOfflineHandlingSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Gestión del Modo Offline", "Bloque 4 · 4.3 Qué pasa cuando el cable se corta", "Herramientas");

  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 6.2, h: 2.8,
    title: "Detectando la conexión",
    code: `window.addEventListener('offline', () => {
  alert("Perdiste la conexión. Los datos podrían estar desactualizados.");
});`,
    lang: "javascript",
    fontSize: 12,
    titleFill: C.red
  });

  addCard(slide, SH, {
    x: 7.32, y: 2.22, w: 3.82, h: 2.8,
    title: "Prueba de Fuego",
    body: "Activa el modo Offline en DevTools y recarga. Si tu app no dice nada y solo muestra una pantalla vacía, fallaste en el manejo de incertidumbre.",
    accent: C.navy, fill: C.white, line: C.border, titleFontSize: 14
  });

  addMiniCard(slide, SH, {
    x: 0.88, y: 5.22, w: 10.26, h: 1.2,
    title: "Offline no es solo 'sin internet'.",
    body: "También es cuando el servidor está caído (Error 500) o la API es bloqueada por un firewall empresarial.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.gold
  });

  validateSlide(slide, pptx);
}

// S56: FEEDBACK HUMANO VS TÉCNICO
function createHumanFriendlyErrorsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Ética del Feedback: Errores Humanos", "Bloque 4 · 4.4 No asustes a tu usuario", "UX");

  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Comunicación de Fallos",
    left: {
      title: "Error Técnico (Mal ❌)",
      subtitle: "Confunde y asusta",
      items: [
        "TypeError: Cannot read property 'map' of undefined",
        "JSON Parse Error at line 1",
        "NetworkError when attempting to fetch resource.",
      ],
      accent: C.red, fill: C.paleRed
    },
    right: {
      title: "Error Humano (Bien ✅)",
      subtitle: "Informa y ayuda",
      items: [
        "No pudimos cargar la lista. Por favor, revisa tu conexión.",
        "Hubo un problema en nuestro servidor. Intenta de nuevo en un minuto.",
        "Vaya, este producto ya no está disponible.",
      ],
      accent: "28A745", fill: C.softBlue
    },
    bridgeLabel: "empatía", bridgeBody: "diseño de\nmensajes",
    footer: "Regla: Los errores técnicos van al console.log. Los errores humanos van a la pantalla."
  });

  validateSlide(slide, pptx);
}

// S57: CONCEPTO ERROR BOUNDARIES
function createErrorBoundaryIntroSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Redes de Seguridad: Error Boundaries", "Bloque 4 · 4.4 Evitando que un componente rompa toda la página", "Arquitectura");

  addCenterStatement(slide, SH,
    "Un error en un componente hijo no debería 'apagar' toda la aplicación.",
    { x: 0.88, y: 2.22, w: 10.26, h: 1.12, fill: C.navy, line: C.navy, fontSize: 20, color: C.white, rectRadius: 0.08 }
  );

  addCodePanel(slide, SH, {
    x: 0.88, y: 3.62, w: 10.26, h: 2.4,
    title: "Concepto de Contención",
    code: `<Layout>
  <Header />
  <ErrorBoundary fallback={<MiniError />}>
    <UserPosts /> {/* Si esto falla, solo se rompe esta sección */}
  </ErrorBoundary>
  <Footer />
</Layout>`,
    lang: "jsx",
    fontSize: 12
  });

  validateSlide(slide, pptx);
}

// S58: EL AGENTE EN INCERTIDUMBRE
function createAgentUncertaintySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Agente en el Manejo de Errores", "Bloque 4 · Generando resiliencia con IA", "Agente");

  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Delegación en Crisis",
    columns: 2,
    entries: [
      {
        badge: "CSS", title: "Generar Skeletons",
        body: "Pide al agente que cree la animación CSS de 'shimmer' (brillo) para un skeleton profesional. Es tedioso hacerlo a mano.",
        accent: C.navy, fill: C.softBlue, badgeFill: C.navy
      },
      {
        badge: "MSG", title: "Copywriting de Errores",
        body: "Pide 5 variantes de mensajes de error amigables para diferentes situaciones (auth, red, stock).",
        accent: C.red, fill: C.paleRed, badgeFill: C.red
      },
      {
        badge: "LOG", title: "Explicar Errores",
        body: "Pega el error crudo de la consola y pide al agente que lo traduzca a lenguaje humano y sugiera 3 causas posibles.",
        accent: C.gold, fill: C.softNeutral, badgeFill: "B8962A"
      },
      {
        badge: "MOCK", title: "Simular Latencia",
        body: "Pide código para un 'Sleep' o retraso artificial en tu fetch para probar tus Spinners sin usar DevTools.",
        accent: C.navy, fill: C.softBlue, badgeFill: C.navy
      },
    ]
  });

  validateSlide(slide, pptx);
}

// S59: PREGUNTAS GUÍA B4
function createGuideQuestionsB4Slide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 4", { x: 0.88, y: 0.44, w: 3.4, h: 0.3, fill: C.navy, color: C.white, fontSize: 10.0 });

  const questions = [
    { n: "01", text: "¿Por qué resetear el estado de 'loading' es obligatorio tanto en el éxito (.then) como en el error (.catch)?" },
    { n: "02", text: "¿Qué impacto tiene en el usuario ver un 'Skeleton' frente a ver un círculo girando (Spinner)?" },
    { n: "03", text: "¿Por qué es una mala práctica mostrar el mensaje de error técnico crudo en la interfaz de usuario?" },
  ];

  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, { x: 0.88, y: y + 0.04, w: 0.58, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.border, margin: 0, valign: "mid" });
    slide.addText(q.text, { x: 1.6, y, w: 8.72, h: 1.56, fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.navy, margin: 0, valign: "mid" });
    if (i < 2) slide.addShape(SH.line, { x: 0.88, y: y + 1.72, w: 10.28, h: 0, line: { color: C.border, pt: 1 } });
  });

  validateSlide(slide, pptx);
}

// S60: SÍNTESIS B4
function createSynthesisB4Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 4", "Lo que aprendimos sobre la incertidumbre", "Bloque 4");

  addCenterStatement(slide, SH,
    "Una aplicación profesional se mide por cómo se comporta cuando las cosas NO salen bien.",
    { x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, line: C.navy, fontSize: 18, color: C.white, rectRadius: 0.07 }
  );

  const ideas = [
    { label: "Estados de UI", body: "Modelamos la carga, el éxito y el error como ciudadanos de primera clase.", accent: C.navy },
    { label: "Resiliencia", body: "Preparamos el código para fallos de red usando .catch() y validación de status.", accent: C.red },
    { label: "Inspección", body: "Usamos las DevTools para auditar el tráfico y simular condiciones adversas.", accent: C.gold },
  ];

  ideas.forEach((idea, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06,
      title: idea.label, body: idea.body, accent: idea.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });

  validateSlide(slide, pptx);
}

// ─── CIERRE DE LA CLASE ──────────────────────────────────────────────────────

// S61: MAPA MENTAL INTEGRACIÓN
function createIntegrationMapSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Mapa Mental: La Integración Final", "De la voluntad del usuario a la respuesta del servidor", "Cierre");

  addStageChain(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 2.8,
    stages: [
      { title: "Formulario", body: "Captura y Valida datos.", accent: C.navy, fill: C.softBlue },
      { title: "Fetch API", body: "Envía datos al servidor.", accent: C.red, fill: C.paleRed },
      { title: "API REST", body: "Procesa y responde JSON.", accent: C.gold, fill: C.softNeutral },
      { title: "State / UI", body: "Actualiza y muestra éxito.", accent: "28A745", fill: C.softBlue },
    ],
  });

  addCenterStatement(slide, SH,
    "Este es el flujo que mueve internet hoy. Lo has dominado.",
    { x: 0.88, y: 5.42, w: 10.26, h: 0.82, fill: C.navy, line: C.navy, fontSize: 18, color: C.white }
  );

  validateSlide(slide, pptx);
}

// S62: SÍNTESIS FINAL DE LA CLASE
function createFinalClassSynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis: De la Pieza al Sistema", "Cierre de Clase · El modelo completo de aplicaciones modernas", "Cierre");

  const pillars = [
    { title: "Inputs Controlados", body: "Sincronía total entre el teclado y la memoria del código.", accent: C.navy },
    { title: "Validación UX", body: "Feedback inmediato y profesional para guiar al usuario.", accent: C.red },
    { title: "Promesas y Fetch", body: "Conexión asíncrona con el mundo real a través de APIs REST.", accent: C.gold },
    { title: "Gestión de Red", body: "Manejo de carga y errores como estándar de calidad.", accent: C.navy },
  ];

  pillars.forEach((p, i) => {
    addCard(slide, SH, {
      x: 0.88 + (i % 2) * 5.24, y: 2.22 + Math.floor(i / 2) * 2.04, w: 5.02, h: 1.86,
      title: p.title, body: p.body, accent: p.accent, accentW: 0.07,
      fill: C.white, line: C.border, titleFontSize: 14.2, bodyFontSize: 10.8, rectRadius: 0.06
    });
  });

  validateSlide(slide, pptx);
}

// S63: PREGUNTAS DE SALIDA
function createExitQuestionsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS DE SALIDA", { x: 0.88, y: 0.44, w: 2.8, h: 0.3, fill: C.red, color: C.white, fontSize: 10.0 });

  const questions = [
    { n: "A", text: "¿Qué significa que un componente sea el 'dueño' de la verdad de un formulario?" },
    { n: "B", text: "Si una API nos devuelve un código 500, ¿nuestro código entrará al segundo .then() o al .catch()?" },
    { n: "C", text: "¿Por qué es fundamental usar las DevTools para probar nuestra aplicación en condiciones de red 'no ideales'?" },
  ];

  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, { x: 0.88, y: y + 0.04, w: 0.58, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.border, margin: 0, valign: "mid" });
    slide.addText(q.text, { x: 1.6, y, w: 8.72, h: 1.56, fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.navy, margin: 0, valign: "mid" });
    if (i < 2) slide.addShape(SH.line, { x: 0.88, y: y + 1.72, w: 10.28, h: 0, line: { color: C.border, pt: 1 } });
  });

  validateSlide(slide, pptx);
}

// S64: PRÓXIMOS PASOS
function createNextStepsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.gold);

  slide.addText("Próxima Semana: El Salto al Backend", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26,
    fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white,
    valign: "mid",
  });

  slide.addText("Dejaremos de pedir datos prestados para empezar a construir nuestros propios servidores: REST, JSON y la arquitectura del lado del servidor.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.8,
    fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });

  addCenterStatement(slide, SH,
    "Nos vemos en la Semana 05",
    { x: 0.88, y: 5.82, w: 10.26, h: 0.82, fill: C.gold, line: C.gold, fontSize: 24, color: C.navy, bold: true }
  );

  validateSlide(slide, pptx);
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

function main() {
  createCoverSlide();
  createRecapSlide();
  createTodayJumpSlide();
  createObjectives1Slide();
  createObjectives2Slide();
  createBlock1IntroSlide();
  createDataLeadsUiSlide();
  createDomAsMemorySlide();
  createTwoTruthsSlide();
  createControlledComponentDef();
  createContractValueSlide();
  createContractOnChangeSlide();
  createEventAnatomySlide();
  createBaseImplementationCode();
  createDataFlowDiagram();
  createAdvantagesControlSlide();
  createAgentBlock1Slide();
  createSynthesisB1Slide();
  createBlock2IntroSlide();
  createWhyValidateSlide();
  createValidationStrategiesSlide();
  createValidationStateLogicSlide();
  createConditionalErrorRenderSlide();
  createReactiveButtonsSlide();
  createVisualInputStatesSlide();
  createFormatVsBusinessSlide();
  createAccessibilityValidationSlide();
  createPracticalCaseRegistrationSlide();
  createCommonValidationErrorsSlide();
  createAgentValidationSlide();
  createGuideQuestionsB2Slide();
  createSynthesisB2Slide();
  createBlock3IntroSlide();
  createEndOfHardcodingSlide();
  createWhatIsRestApiSlide();
  createJsonContractSlide();
  createPromisesIntroSlide();
  createFetchAnatomySlide();
  createWhenToFetchSlide();
  createApiListIntegrationSlide();
  createApiFlowDiagramSlide();
  createDevToolsNetworkSlide();
  createStatusCodesSlide();
  createApiSecurityBasicsSlide();
  createAgentApiSlide();
  createGuideQuestionsB3Slide();
  createSynthesisB3Slide();
  createBlock4IntroSlide();
  createThreeUiStatesSlide();
  createLoadingImplementationSlide();
  createErrorHandlingImplementationSlide();
  createCompleteFetchPatternSlide();
  createSpinnersVsSkeletonsSlide();
  createSimulatingLatencySlide();
  createOfflineHandlingSlide();
  createHumanFriendlyErrorsSlide();
  createErrorBoundaryIntroSlide();
  createAgentUncertaintySlide();
  createGuideQuestionsB4Slide();
  createSynthesisB4Slide();
  createIntegrationMapSlide();
  createFinalClassSynthesisSlide();
  createExitQuestionsSlide();
  createNextStepsSlide();

  pptx
    .writeFile({ fileName: outputPptx })
    .then(() => {
      console.log(`PPTX generado: ${outputPptx}`);
      fs.copyFileSync(__filename, outputJs);
      console.log(`Fuente copiada: ${outputJs}`);
    })
    .catch((err) => {
      console.error("Error generando PPTX:", err);
      process.exit(1);
    });
}

main();
