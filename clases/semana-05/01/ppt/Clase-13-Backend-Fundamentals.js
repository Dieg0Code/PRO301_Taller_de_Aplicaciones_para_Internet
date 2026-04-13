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
  addStageChain,
  addMythRealityGrid,
  addChecklistGrid,
  addServerCycle,
  addRestResource,
} = components;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
applyAiepTheme(pptx, {
  author: "Diego Obando",
  company: "AIEP",
  subject: "Clase 13",
  title: "Backend Fundamentals with Python",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx =
  process.env.PPTX_OUTPUT ||
  path.join(rootDir, "Clase-13-Backend-Fundamentals.pptx");
const outputJs =
  process.env.PPTX_SOURCE_OUTPUT ||
  path.join(rootDir, "Clase-13-Backend-Fundamentals.js");

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
    classLabel: `Clase 13 · ${blockLabel}`,
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
    x, y: y + 0.18 * scale, w: 0.2 * scale, h: 0.46 * scale,
    fill: { color: fill }, line: { color: fill },
  });
  slide.addShape(SH.rect, {
    x: x + 0.24 * scale, y, w: 0.24 * scale, h: 0.64 * scale,
    fill: { color: fill }, line: { color: fill },
  });
  slide.addShape(SH.rect, {
    x: x + 0.52 * scale, y: y + 0.18 * scale, w: 0.2 * scale, h: 0.46 * scale,
    fill: { color: fill }, line: { color: fill },
  });
}

function addPanel(slide, x, y, w, h, opts = {}) {
  slide.addShape(SH.roundRect, {
    x, y, w, h,
    rectRadius: opts.rectRadius || 0.04,
    fill: { color: opts.fill || C.white },
    line: { color: opts.line || C.border, pt: opts.linePt || 1 },
  });
}

function addArrow(slide, x, y, w = 0.22, h = 0.28, fill = C.gold) {
  slide.addShape(SH.chevron, {
    x, y, w, h,
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
  slide.addText("Backend Moderno con\nPython 3.12+ y FastAPI", {
    x: 0.88, y: 2.82, w: 10.26, h: 1.44,
    fontFace: TYPOGRAPHY.display, fontSize: 44, bold: true, color: C.white,
    margin: 0, valign: "top",
  });
  slide.addText("Semana 05 · Unidad 02: Fundamentos, Arquitectura y Contratos", {
    x: 0.88, y: 4.42, w: 10.26, h: 0.34,
    fontFace: TYPOGRAPHY.body, fontSize: 18, color: C.gold, bold: true,
  });
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 5.82, w: 0.82, h: 0.82 });
  validateSlide(slide, pptx);
}

// S2: MAPA DE LA UNIDAD
function createModuleMapSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Mapa del Módulo: Unidad 2", "Semana 4 → Semana 7", "Contexto");
  const weeks = [
    { title: "Semana 4", body: "Frontend Reactivo (React, State, Props, Fetch).", active: false },
    { title: "Semana 5", body: "Backend Moderno: Python, FastAPI y Persistencia.", active: true },
    { title: "Semana 6", body: "Legado e Integración Profesional.", active: false },
    { title: "Semana 7", body: "Evaluación y Seguridad Aplicada.", active: false },
  ];
  weeks.forEach((w, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 3.6, w: 2.4, h: 2.8,
      title: w.title, body: w.body, accent: w.active ? C.red : C.navy,
      fill: w.active ? C.paleRed : C.white, line: C.border, titleFontSize: 12, bodyFontSize: 9.5
    });
    const icon = w.active ? "🚀" : "✓";
    slide.addText(icon, { x: 0.88 + i * 2.6, y: 2.6, w: 2.4, h: 0.8, fontSize: 32, align: "center" });
  });
  validateSlide(slide, pptx);
}

// S3: RECAP CLASE ANTERIOR
function createRecapSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "¿Qué logramos la semana pasada?", "El fin del frontend aislado", "Contexto");
  addCenterStatement(slide, SH, "Pasamos de interfaces estáticas a aplicaciones dinámicas y reactivas.", {
    x: 0.88, y: 2.22, w: 10.26, h: 0.82, fill: C.navy, fontSize: 18, color: C.white
  });
  const recap = [
    { title: "Componentes", body: "Dividimos la UI en piezas con responsabilidad única." },
    { title: "Reactividad", body: "UI = f(state). El dato manda sobre la vista." },
    { title: "Consumo API", body: "Usamos 'fetch' para pedir datos a una caja negra remota." },
  ];
  recap.forEach((r, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.42, w: 3.2, h: 2.8,
      title: r.title, body: r.body, accent: C.red,
      fill: C.white, line: C.border, titleFontSize: 13.8, bodyFontSize: 11
    });
  });
  validateSlide(slide, pptx);
}

// S4: EL SALTO DE HOY
function createTodayJumpSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El gran salto: Al otro lado del muro", "De 'Pedir' datos a 'Servir' y 'Proteger' procesos", "Contexto");
  addCenterStatement(slide, SH, "Hoy dejamos de ser el 'Cliente' para convertirnos en el 'Proveedor'.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.12, fill: C.navy, line: C.navy, fontSize: 22, color: C.white, rectRadius: 0.08
  });
  const points = [
    { t: "Fundamentos", b: "El rol arquitectónico del servidor en la red." },
    { t: "REST", b: "La gramática universal de los Recursos." },
    { t: "Stack Moderno", b: "Python 3.12+ y FastAPI como herramientas de élite." },
  ];
  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.82, w: 3.2, h: 2.4,
      title: p.t, body: p.body, accent: C.gold, fill: C.white, line: C.border
    });
  });
  validateSlide(slide, pptx);
}

// S5: OBJETIVOS 1
function createObjectives1Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Objetivos de hoy (1/2)", "Hacia el lado del servidor", "Objetivos");
  const objectives = [
    { n: "01", t: "Cambiar el foco: de cliente a servidor", b: "Entender el Backend como el guardián de la verdad de los datos." },
    { n: "02", t: "Dominar la gramática REST", b: "Diseñar URLs semánticas y entender los verbos HTTP." },
    { n: "03", t: "Implementar con FastAPI", b: "Crear tus primeros endpoints con tipado estricto en Python 3.12+." },
  ];
  objectives.forEach((obj, i) => {
    const y = 2.22 + i * 1.42;
    slide.addText(obj.n, { x: 0.88, y, w: 0.8, h: 0.8, fontFace: TYPOGRAPHY.display, fontSize: 32, bold: true, color: C.red });
    slide.addText(obj.t, { x: 1.8, y: y + 0.1, w: 8.5, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: C.navy });
    slide.addText(obj.b, { x: 1.8, y: y + 0.4, w: 8.5, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 12, color: C.slate });
  });
  validateSlide(slide, pptx);
}

// S6: OBJETIVOS 2
function createObjectives2Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Objetivos de hoy (2/2)", "Arquitectura y Contratos", "Objetivos");
  const objectives = [
    { n: "04", t: "Entender la Arquitectura en Capas", b: "Por qué dividimos la API de la Lógica y los Datos." },
    { n: "05", t: "Diseñar Contratos Interactivos", b: "Usar Swagger/OpenAPI para documentar y probar tu trabajo." },
    { n: "06", t: "Uso Experto de Agentes", b: "Delegar modelos de datos (Pydantic) con validación técnica." },
  ];
  objectives.forEach((obj, i) => {
    const y = 2.22 + i * 1.42;
    slide.addText(obj.n, { x: 0.88, y, w: 0.8, h: 0.8, fontFace: TYPOGRAPHY.display, fontSize: 32, bold: true, color: C.red });
    slide.addText(obj.t, { x: 1.8, y: y + 0.1, w: 8.5, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: C.navy });
    slide.addText(obj.b, { x: 1.8, y: y + 0.4, w: 8.5, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 12, color: C.slate });
  });
  validateSlide(slide, pptx);
}

// ─── BLOQUE 1: EL MUNDO DETRÁS DEL FETCH ─────────────────────────────────────

// S7: APERTURA B1
function createBlock1IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 1", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("El mundo detrás del 'Fetch':\nLa Vida del Servidor", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("Entendiendo al backend como el cerebro y protector de la aplicación. Introducción a Python 3.12 y FastAPI.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  addPanel(slide, 0.88, 5.84, 2.8, 0.4, { fill: "173A5A", line: "173A5A" });
  slide.addText("35 minutos · fundamentos y código", {
    x: 1.04, y: 5.92, w: 2.6, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 9.4, color: "A8C4E0"
  });
  validateSlide(slide, pptx);
}

// S8: EL SERVIDOR ES PERSISTENTE
function createServerPersistenceSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Servidor: Un programa que 'espera'", "Bloque 1 · 1.1 Naturaleza del software de backend", "Bloque 1");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Script vs Servidor",
    left: {
      title: "Script Tradicional", subtitle: "Ejecución lineal",
      items: ["Se ejecuta de arriba a abajo.", "Realiza una tarea y termina.", "Analogía: Una receta de cocina."],
      accent: C.navy, fill: C.softBlue
    },
    right: {
      title: "Servidor Backend", subtitle: "Bucle infinito",
      items: ["Abre un puerto y espera.", "Se mantiene vivo indefinidamente.", "Analogía: Un cajero en el banco."],
      accent: C.red, fill: C.paleRed
    },
    bridgeLabel: "vs", bridgeBody: "estado de\nejecución",
    footer: "En Python, el servidor de aplicaciones (Uvicorn) es quien mantiene vivo este bucle."
  });
  validateSlide(slide, pptx);
}

// S9: LA FUENTE DE VERDAD
function createSourceOfTruthSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Backend como Fuente de Verdad", "Bloque 1 · 1.2 Por qué el Frontend nunca tiene la razón", "Bloque 1");
  addCenterStatement(slide, SH, "En el frontend todo es manipulable. En el backend todo es validado.", {
    x: 0.88, y: 2.22, w: 10.26, h: 0.82, fill: C.softNeutral, fontSize: 18, color: C.navy
  });
  const cases = [
    { t: "Validación de Saldo", b: "Un usuario puede hackear el JS para verse millonario. El backend protege la base de datos real." },
    { t: "Reglas de Negocio", b: "El servidor decide si una compra es válida o si un cupón ha expirado." },
    { t: "Seguridad", b: "El backend es la última línea de defensa contra ataques maliciosos." },
  ];
  cases.forEach((c, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.42, w: 3.2, h: 2.8,
      title: c.t, body: c.b, accent: C.navy,
      fill: C.white, line: C.border, titleFontSize: 12, bodyFontSize: 10
    });
  });
  validateSlide(slide, pptx);
}

// S10: ANALOGÍA BANCO
function createBankAnalogySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Analogía: El Mostrador del Banco", "Bloque 1 · 1.2 El rol de la API", "Bloque 1");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.8,
    title: "El Cliente nunca entra solo a la bóveda",
    body: "El mostrador es la API. El cajero es el Backend. El cajero revisa tu carnet, valida tu saldo en el sistema interno y solo si todo es correcto, te entrega el dinero (Response).",
    accent: C.red, fill: C.white, line: C.border
  });
  slide.addText("🛡️ Regla de Oro: Nunca confíes en el cliente.", { x: 0.88, y: 4.42, w: 10.26, h: 0.4, fontSize: 20, bold: true, color: C.red, align: "center" });
  validateSlide(slide, pptx);
}

// S11: LAS 4 TAREAS DEL SERVIDOR
function createServerTasksSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Las 4 Tareas Universales del Backend", "Bloque 1 · 1.3 El ciclo Request-Response", "Bloque 1");
  addServerCycle(slide, SH, { x: 0.88, y: 2.52, w: 10.26, h: 3.5 });
  addCenterStatement(slide, SH, "Este flujo se repite billones de veces al día en internet.", {
    x: 0.88, y: 6.22, w: 10.26, h: 0.52, fill: C.softNeutral, fontSize: 11
  });
  validateSlide(slide, pptx);
}

// S12: ¿POR QUÉ PYTHON 3.12+ Y FASTAPI?
function createWhyFastApiSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "¿Por qué Python 3.12+ y FastAPI?", "Bloque 1 · 1.1 El estándar de la industria hoy", "Bloque 1");
  const features = [
    { title: "Tipado Estricto", body: "Usa Type Hints para detectar errores antes de ejecutar el código.", icon: "💎" },
    { title: "Asincronía Nativa", body: "Maneja miles de peticiones sin bloquearse (async/await).", icon: "⚡" },
    { title: "Autodocumentación", body: "Genera el manual de la API (Swagger) automáticamente.", icon: "📖" },
  ];
  features.forEach((f, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.2, w: 3.2, h: 3.2,
      title: f.title, body: f.body, accent: C.navy, accentW: 0.07,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
    slide.addText(f.icon, { x: 0.88 + i * 3.44, y: 2.4, w: 3.2, h: 0.8, fontSize: 32, align: "center" });
  });
  validateSlide(slide, pptx);
}

// S13: SINTAXIS PYTHON MODERNO: TYPE HINTS
function createTypeHintsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Python Moderno: Type Hints", "Bloque 1 · 1.1 La base del tipado estricto", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 2.8,
    title: "Tipado en Python 3.12+",
    code: `# El ': int' asegura que la función reciba un número
# El '-> str' asegura que devuelva un texto
def saludar(edad: int) -> str:
    return f"Tienes {edad} años"

# Unión de tipos moderna (Python 3.10+)
nombre: str | None = None`,
    lang: "python", fontSize: 14, titleFill: C.navy
  });
  addMiniCard(slide, SH, {
    x: 0.88, y: 5.22, w: 10.26, h: 1.2,
    title: "No es solo visual.",
    body: "FastAPI usa estos tipos para validar automáticamente los datos que llegan del cliente.",
    accent: C.gold, fill: C.softNeutral
  });
  validateSlide(slide, pptx);
}

// S14: MI PRIMER ENDPOINT
function createFirstEndpointSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Mi primer Endpoint en FastAPI", "Bloque 1 · 1.3 Declarando intenciones", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "main.py",
    code: `from fastapi import FastAPI

app = FastAPI()

# Definimos una RUTA y un MÉTODO (GET)
@app.get("/saludo")
async def verificar_servidor() -> dict[str, str]:
    # El diccionario se convierte a JSON automáticamente
    return {"estado": "online", "version": "1.0.0"}`,
    lang: "python", fontSize: 12
  });
  validateSlide(slide, pptx);
}

// S15: EL AGENTE EN BLOQUE 1
function createAgentBlock1Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Agente en Fundamentos", "Bloque 1 · Uso estratégico de la IA", "Agente");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Delegación Inteligente",
    columns: 2,
    entries: [
      { badge: "OK", title: "Explicar Flujos", body: "Pide al agente que narre el viaje de un bit desde el fetch hasta la función de Python.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "OK", title: "Boilerplate", body: "Pide la estructura base para iniciar un proyecto de FastAPI siguiendo buenas prácticas.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "NO", title: "Versiones Antiguas", body: "No aceptes código de Python 3.8. Exige sintaxis moderna (| para uniones).", accent: C.gold, fill: C.softNeutral, badgeFill: "B8962A" },
      { badge: "NO", title: "Validación de Lógica", body: "El agente puede sugerir tipos erróneos. Tú debes validar que el contrato de datos sea correcto.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

// S16: PREGUNTAS GUÍA B1
function createGuideQuestionsB1Slide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 1", { x: 0.88, y: 0.44, w: 3.4, h: 0.3, fill: C.navy, color: C.white, fontSize: 10.0 });
  const questions = [
    { n: "01", text: "¿Qué significa que el servidor sea un proceso 'persistente' a diferencia de un script normal?" },
    { n: "02", text: "¿Por qué el Backend es el único que debería tener permiso para escribir en la base de datos?" },
    { n: "03", text: "¿Qué ventaja real nos da el tipado de Python 3.12+ al momento de recibir datos del cliente?" },
  ];
  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, { x: 0.88, y: y + 0.04, w: 0.58, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.border, margin: 0, valign: "mid" });
    slide.addText(q.text, { x: 1.6, y, w: 8.72, h: 1.56, fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.navy, margin: 0, valign: "mid" });
    if (i < 2) slide.addShape(SH.line, { x: 0.88, y: y + 1.72, w: 10.28, h: 0, line: { color: C.border, pt: 1 } });
  });
  validateSlide(slide, pptx);
}

// S17: SÍNTESIS B1
function createSynthesisB1Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 1", "Los pilares del Servidor", "Bloque 1");
  addCenterStatement(slide, SH, "El backend no muestra pantallas, sirve procesos y protege la integridad de los datos.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });
  const points = [
    { title: "Servidor", body: "Un programa persistente que escucha y responde peticiones HTTP.", accent: C.navy },
    { title: "Criterio", body: "Nunca confía en el cliente. Valida todo mediante tipado estricto.", accent: C.red },
    { title: "Herramienta", body: "FastAPI nos permite crear APIs rápidas, seguras y autodocumentadas.", accent: C.gold },
  ];
  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06, title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });
  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.62, title: "Bloque 2 → REST y Recursos",
    body: "Ya sabemos cómo 'piensa' el servidor. Ahora veamos cómo estructurar la comunicación de forma profesional.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.gold, titleFontSize: 11, bodyFontSize: 10.4
  });
  validateSlide(slide, pptx);
}

// ─── BLOQUE 2: REST Y EL LENGUAJE DE LOS RECURSOS ────────────────────────────

// S18: APERTURA B2
function createBlock2IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 2", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("REST y el Lenguaje\nde los Recursos", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("La gramática universal de la web moderna: cómo estructurar URLs y acciones para que cualquier cliente nos entienda.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  addPanel(slide, 0.88, 5.84, 2.8, 0.4, { fill: "173A5A", line: "173A5A" });
  slide.addText("35 minutos · estándares y protocolos", {
    x: 1.04, y: 5.92, w: 2.6, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 9.4, color: "A8C4E0"
  });
  validateSlide(slide, pptx);
}

// S19: QUÉ ES UN RECURSO
function createWhatIsResourceSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "¿Qué es un Recurso?", "Bloque 2 · 2.1 De archivos a entidades de datos", "Bloque 2");
  addCenterStatement(slide, SH, "Un recurso es cualquier 'entidad' que tu aplicación gestiona.", {
    x: 0.88, y: 2.22, w: 10.26, h: 0.82, fill: C.softBlue, fontSize: 18, color: C.navy
  });
  const entities = [
    { t: "Usuario", b: "ID, username, email, hashed_password.", icon: "👤" },
    { t: "Producto", b: "SKU, nombre, precio, stock_actual.", icon: "📦" },
    { t: "Pedido", b: "ID_Orden, cliente_id, total, status.", icon: "🛒" },
  ];
  entities.forEach((e, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 4.0, w: 3.2, h: 2.6, // Bajar tarjetas
      title: e.t, body: e.b, accent: C.navy, fill: C.white, line: C.border, titleFontSize: 12, bodyFontSize: 10
    });
    slide.addText(e.icon, { x: 0.88 + i * 3.44, y: 3.0, w: 3.2, h: 0.8, fontSize: 36, align: "center" });
  });
  validateSlide(slide, pptx);
}

// S20: SEMÁNTICA URL
function createUrlSemanticsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Semántica REST: Sustantivos, no acciones", "Bloque 2 · 2.2 El diseño de Endpoints profesionales", "Bloque 2");
  addMythRealityGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Diseño de URLs",
    entries: [
      { badge: "Error", myth: "/obtenerUsuarios", reality: "/users (GET)", accent: C.red, badgeFill: C.paleRed },
      { badge: "Error", myth: "/borrar_post?id=5", reality: "/posts/5 (DELETE)", accent: C.red, badgeFill: C.paleRed },
      { badge: "Error", myth: "/nuevoProducto.php", reality: "/products (POST)", accent: C.red, badgeFill: C.paleRed },
      { badge: "Error", myth: "/actualizar_perfil", reality: "/profile (PATCH)", accent: C.red, badgeFill: C.paleRed },
    ]
  });
  validateSlide(slide, pptx);
}

// S21: VERBO GET (IMPLEMENTACIÓN)
function createVerbGetSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Verbo HTTP: GET", "Bloque 2 · 2.3 Recuperación segura de datos", "Verbos");
  const jsonResp = `[\n  { "id": 1, "name": "Python Book" },\n  { "id": 2, "name": "FastAPI Guide" }\n]`;
  addRestResource(slide, SH, {
    x: 0.88, y: 2.22, w: 6.0, h: 4.0, verb: "GET", url: "/books", json: jsonResp
  });
  slide.addText("Nivel Técnico:", { x: 7.1, y: 2.22, w: 4, h: 0.4, fontSize: 18, bold: true, color: "28A745" });
  const points = [
    "Seguro: No tiene efectos secundarios.",
    "Idempotente: N llamadas = mismo resultado.",
    "FastAPI: @app.get('/path')",
  ];
  points.forEach((p, i) => slide.addText("• " + p, { x: 7.1, y: 2.82 + i * 0.8, w: 4, h: 0.7, fontSize: 13, color: C.slate }));
  validateSlide(slide, pptx);
}

// S22: VERBO POST (IMPLEMENTACIÓN)
function createVerbPostSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Verbo HTTP: POST", "Bloque 2 · 2.3 Creación de nuevos recursos", "Verbos");
  const jsonReq = `{\n  "title": "Nuevo Libro",\n  "author": "Diego O."\n}`;
  addRestResource(slide, SH, {
    x: 0.88, y: 2.22, w: 6.0, h: 4.0, verb: "POST", url: "/books", json: jsonReq
  });
  slide.addText("Nivel Técnico:", { x: 7.1, y: 2.22, w: 4, h: 0.4, fontSize: 18, bold: true, color: C.gold });
  const points = [
    "No es Seguro: Modifica la base de datos.",
    "No es Idempotente: 2 llamadas = 2 registros.",
    "Lleva Body: Los datos viajan en el cuerpo.",
  ];
  points.forEach((p, i) => slide.addText("• " + p, { x: 7.1, y: 2.82 + i * 0.8, w: 4, h: 0.7, fontSize: 13, color: C.slate }));
  validateSlide(slide, pptx);
}

// S23: VERBOS PUT vs PATCH
function createPutVsPatchSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "PUT vs PATCH: ¿Cómo actualizar?", "Bloque 2 · 2.3 Precisión en la modificación", "Verbos");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Estrategias de Update",
    left: {
      title: "PUT (Reemplazo)", subtitle: "Idempotente",
      items: ["Envías el objeto COMPLETO.", "Sobreescribe todo el recurso.", "Si falta un campo, se puede perder."],
      accent: C.navy, fill: C.softBlue
    },
    right: {
      title: "PATCH (Parcial)", subtitle: "No siempre idempotente",
      items: ["Envías solo el campo que CAMBIÓ.", "Ideal para optimizar ancho de banda.", "Más complejo de implementar."],
      accent: C.gold, fill: C.softNeutral
    },
    bridgeLabel: "vs", bridgeBody: "¿Qué tanto\nenvías?",
    footer: "En el mundo real, se suele usar PUT por simplicidad salvo en objetos gigantes."
  });
  validateSlide(slide, pptx);
}

// S24: VERBO DELETE
function createVerbDeleteSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Verbo HTTP: DELETE", "Bloque 2 · 2.3 Eliminación de recursos", "Verbos");
  addRestResource(slide, SH, {
    x: 0.88, y: 2.22, w: 6.0, h: 2.0, verb: "DELETE", url: "/books/101"
  });
  slide.addText("Nivel Técnico:", { x: 7.1, y: 2.22, w: 4, h: 0.4, fontSize: 18, bold: true, color: C.red });
  const points = [
    "Idempotente: Borrar lo borrado no cambia nada.",
    "Destructivo: ¡Cuidado con el acceso!",
    "Respuesta: Suele ser 204 (No Content).",
  ];
  points.forEach((p, i) => slide.addText("• " + p, { x: 7.1, y: 2.82 + i * 0.8, w: 4, h: 0.7, fontSize: 13, color: C.slate }));
  validateSlide(slide, pptx);
}

// S25: ANATOMÍA DE LA PETICIÓN (CÓDIGO)
function createRequestAnatomySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Anatomía de una Petición HTTP", "Bloque 2 · 2.4 Lo que viaja por los cables", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "HTTP Request Structure",
    code: `POST /users HTTP/1.1
Host: api.aiep.cl
Content-Type: application/json
Authorization: Bearer my-secret-token

{
    "name": "Diego Obando",
    "role": "Teacher"
}`,
    lang: "javascript", fontSize: 12
  });
  validateSlide(slide, pptx);
}

// S26: LOS HEADERS (METADATOS)
function createHttpHeadersSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "HTTP Headers: El sobre del mensaje", "Bloque 2 · 2.4 Información de control", "Código");
  const headers = [
    { t: "Content-Type", b: "Define el formato (ej. application/json)." },
    { t: "Authorization", b: "Demuestra que tienes permiso para entrar." },
    { t: "Accept", b: "Le dice al servidor qué formato prefiere el cliente." },
    { t: "User-Agent", b: "Identifica si la petición viene de un App o Web." },
  ];
  headers.forEach((h, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + (i % 2) * 5.24, y: 2.42 + Math.floor(i / 2) * 2.12, w: 5.02, h: 1.96,
      title: h.t, body: h.b, accent: C.navy, fill: C.white, line: C.border
    });
  });
  validateSlide(slide, pptx);
}

// S27: EL BODY (EL CONTENIDO)
function createHttpBodySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "HTTP Body: El interior del mensaje", "Bloque 2 · 2.4 Donde viven los datos reales", "Código");
  addCenterStatement(slide, SH, "Solo los verbos de escritura (POST, PUT, PATCH) suelen llevar un Body.", {
    x: 0.88, y: 2.22, w: 10.26, h: 0.82, fill: C.navy, color: C.white, fontSize: 18
  });
  addCodePanel(slide, SH, {
    x: 0.88, y: 3.22, w: 5.4, h: 3.2, title: "Request Body (JSON)",
    code: `{\n  "sku": "PROD-001",\n  "qty": 5\n}`,
    lang: "json", fontSize: 14, titleFill: C.red
  });
  addCodePanel(slide, SH, {
    x: 6.52, y: 3.22, w: 4.62, h: 3.2, title: "Response Body (JSON)",
    code: `{\n  "id": "ord_123",\n  "status": "paid"\n}`,
    lang: "json", fontSize: 14, titleFill: "28A745"
  });
  validateSlide(slide, pptx);
}

// S28: FASTAPI: PATH vs QUERY PARAMS
function createFastApiPathQuerySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "FastAPI: Identificar vs Filtrar", "Bloque 2 · 2.4 Implementación en Python 3.12+", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "main.py",
    code: `# Path Parameter: Para identificar un recurso único
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    return {"id": user_id}

# Query Parameter: Para filtrar o buscar
@app.get("/items")
async def find_items(category: str, limit: int = 10):
    return {"cat": category, "limit": limit}`,
    lang: "python", fontSize: 11
  });
  validateSlide(slide, pptx);
}

// S29: EL AGENTE EN DISEÑO REST
function createAgentRestDesignSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Agente en el Diseño de APIs", "Bloque 2 · Acelerando la arquitectura", "Agente");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Delegación Inteligente",
    columns: 2,
    entries: [
      { badge: "OK", title: "Diseño Endpoints", body: "Pide al agente: 'Genera una estructura REST para una clínica dental'. Te dará nombres de recursos perfectos.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "OK", title: "Mocks de JSON", body: "Pide ejemplos de JSON complejos para un recurso 'Historia Clínica'.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "NO", title: "Lógica Crítica", body: "No dejes que el agente decida si un borrado es físico o lógico sin tu supervisión.", accent: C.gold, fill: C.softNeutral, badgeFill: "B8962A" },
      { badge: "NO", title: "Seguridad Real", body: "El agente puede sugerir APIs sin autenticación. Tú debes validar que los headers de seguridad estén presentes.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

// S30: PREGUNTAS GUÍA B2
function createGuideQuestionsB2Slide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 2", { x: 0.88, y: 0.44, w: 3.4, h: 0.3, fill: C.navy, color: C.white, fontSize: 10.0 });
  const questions = [
    { n: "01", text: "¿Por qué en REST usamos sustantivos (Cosas) en la URL y no verbos (Acciones)?" },
    { n: "02", text: "¿Qué diferencia técnica hay entre un parámetro de ruta (/user/5) y uno de consulta (?limit=10)?" },
    { n: "03", text: "¿Por qué es fundamental que un desarrollador Frontend conozca los Headers de una petición?" },
  ];
  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, { x: 0.88, y: y + 0.04, w: 0.58, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.border, margin: 0, valign: "mid" });
    slide.addText(q.text, { x: 1.6, y, w: 8.72, h: 1.56, fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.navy, margin: 0, valign: "mid" });
    if (i < 2) slide.addShape(SH.line, { x: 0.88, y: y + 1.72, w: 10.28, h: 0, line: { color: C.border, pt: 1 } });
  });
  validateSlide(slide, pptx);
}

// S31: SÍNTESIS B2
function createSynthesisB2Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 2", "La gramática de los datos", "Bloque 2");
  addCenterStatement(slide, SH, "La URL identifica al recurso. El Verbo define la acción. El JSON es el mensaje.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });
  const points = [
    { title: "REST", body: "Arquitectura basada en entidades y acciones semánticas.", accent: C.navy },
    { title: "Verbos", body: "GET (leer), POST (crear), PUT (reemplazar), DELETE (borrar).", accent: C.red },
    { title: "Interoperabilidad", body: "JSON como lenguaje común para cualquier cliente.", accent: C.gold },
  ];
  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06, title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });
  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.62, title: "Bloque 3 → Arquitectura en Capas",
    body: "Ya sabemos qué decir. Ahora veamos cómo organizar el servidor por dentro para ser profesional.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.gold, titleFontSize: 11, bodyFontSize: 10.4
  });
  validateSlide(slide, pptx);
}

// ─── BLOQUE 3: ARQUITECTURA EN CAPAS Y MODELADO ──────────────────────────────

// S32: APERTURA B3
function createBlock3IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 3", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("Arquitectura en Capas\ny Modelado de Datos", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("Cómo organizar el código de un servidor profesional para que sea escalable, seguro y fácil de mantener.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  addPanel(slide, 0.88, 5.84, 2.8, 0.4, { fill: "173A5A", line: "173A5A" });
  slide.addText("35 minutos · arquitectura y modelos", {
    x: 1.04, y: 5.92, w: 2.6, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 9.4, color: "A8C4E0"
  });
  validateSlide(slide, pptx);
}

// S33: EL CAOS DEL MONOLITO
function createMonolithChaosSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Caos del Código Mezclado", "Bloque 3 · 3.1 Por qué no debemos poner todo en un solo archivo", "Arquitectura");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.8,
    title: "El Problema del 'Código Espagueti'",
    body: "Si las rutas de la API, el cálculo de impuestos y el guardado en la base de datos viven en la misma función, el servidor se vuelve imposible de testear y muy frágil ante cambios.",
    accent: C.red, fill: C.white, line: C.border
  });
  addCodePanel(slide, SH, {
    x: 0.88, y: 4.22, w: 10.26, h: 2.4,
    title: "Código Inmantenible (Anti-patrón)",
    code: `@app.post("/pagar")
async def pagar(monto: int):
    # API, Negocio y Datos... TODO MEZCLADO ❌
    db.execute(f"UPDATE cuenta SET saldo = saldo - {monto}")
    return {"status": "ok"}`,
    lang: "python", fontSize: 12, titleFill: C.red
  });
  validateSlide(slide, pptx);
}

// S34: ARQUITECTURA EN CAPAS
function createLayeredArchitectureSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Arquitectura en Capas: El Orden", "Bloque 3 · 3.1 Separación de Responsabilidades", "Arquitectura");
  const { addLayerStack } = components;
  addLayerStack(slide, SH, { x: 0.6, y: 2.22, w: 4.8, h: 4.54 }); // Mover un poco a la izquierda
  
  slide.addText("Ventajas Técnicas:", { x: 7.2, y: 2.22, w: 4.0, h: 0.4, fontSize: 18, bold: true, color: C.navy });
  const points = [
    "Intercambiabilidad: Puedes cambiar la base de datos sin tocar las rutas.",
    "Testeabilidad: Puedes probar la lógica sin levantar el servidor HTTP.",
    "Legibilidad: Cada archivo tiene un solo propósito claro.",
  ];
  points.forEach((p, i) => slide.addText("• " + p, { x: 7.2, y: 2.82 + i * 1.2, w: 4.0, h: 1.0, fontSize: 13, color: C.slate }));
  validateSlide(slide, pptx);
}

// S35: CAPA 1: API (TRANSPORT)
function createApiLayerSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Capa 1: API (Transporte)", "La interfaz de comunicación", "Capas");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 6.0, h: 4.0,
    title: "routers/items.py",
    code: `@router.post("/")
async def create_item(item: ItemSchema):
    # Tarea: Recibir HTTP y Delegar
    return service.save_item(item)`,
    lang: "python", fontSize: 14, titleFill: C.navy
  });
  const tasks = [
    { t: "Recibir Peticiones", b: "Entiende de Verbos, URLs y Headers." },
    { t: "Validar Formato", b: "Asegura que el JSON sea correcto." },
    { t: "Responder", b: "Envía el Status Code adecuado (200, 404, etc)." },
  ];
  tasks.forEach((task, i) => {
    addMiniCard(slide, SH, {
      x: 7.1, y: 2.22 + i * 1.4, w: 4.0, h: 1.2,
      title: task.t, body: task.b, accent: C.navy, fill: C.white, line: C.border, titleFontSize: 11, bodyFontSize: 9.5
    });
  });
  validateSlide(slide, pptx);
}

// S36: CAPA 2: NEGOCIO (LOGIC)
function createBusinessLayerSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Capa 2: Negocio (Lógica)", "El cerebro del sistema", "Capas");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 6.0, h: 4.0,
    title: "services/billing.py",
    code: `def process_payment(account, amount):
    # Aquí vive la Regla de Negocio
    if account.balance < amount:
        raise InsufficientFundsError()
    
    return account.apply_discount(0.19)`,
    lang: "python", fontSize: 14, titleFill: C.red
  });
  const tasks = [
    { t: "Reglas de Negocio", b: "Define cómo funciona el mundo real." },
    { t: "Cálculos", b: "Impuestos, descuentos, validaciones complejas." },
    { t: "Independencia", b: "No sabe que existe el WiFi ni el SQL." },
  ];
  tasks.forEach((task, i) => {
    addMiniCard(slide, SH, {
      x: 7.1, y: 2.22 + i * 1.4, w: 4.0, h: 1.2,
      title: task.t, body: task.b, accent: C.red, fill: C.white, line: C.border, titleFontSize: 11, bodyFontSize: 9.5
    });
  });
  validateSlide(slide, pptx);
}

// S37: CAPA 3: DATOS (PERSISTENCE)
function createDataLayerSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Capa 3: Datos (Persistencia)", "El brazo ejecutor", "Capas");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 6.0, h: 4.0,
    title: "repositories/user_repo.py",
    code: `def get_user_by_id(id: int):
    # Tarea: Hablar con la DB
    return db.query("SELECT * FROM users...")`,
    lang: "python", fontSize: 14, titleFill: C.gold
  });
  const tasks = [
    { t: "Acceso a DB", b: "Escribe y lee de tablas reales." },
    { t: "Manejo de Errores", b: "Controla si la base de datos se cayó." },
    { t: "Consultas Técnicas", b: "Filtros de SQL, ordenamiento, límites." },
  ];
  tasks.forEach((task, i) => {
    addMiniCard(slide, SH, {
      x: 7.1, y: 2.22 + i * 1.4, w: 4.0, h: 1.2,
      title: task.t, body: task.b, accent: C.gold, fill: C.white, line: C.border, titleFontSize: 11, bodyFontSize: 9.5
    });
  });
  validateSlide(slide, pptx);
}

// S38: PYDANTIC: MODELANDO EL CONTRATO
function createPydanticModelingSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Pydantic: Modelando la Verdad", "Bloque 3 · 3.2 Definición de Esquemas en Python 3.12+", "Modelado");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 3.5,
    title: "schemas/product.py",
    code: `from pydantic import BaseModel, EmailStr

class Product(BaseModel):
    name: str
    price: float
    stock: int
    category: str | None = "General"
    owner_email: EmailStr # Validación avanzada nativa`,
    lang: "python", fontSize: 14, titleFill: C.navy
  });
  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.8,
    title: "Auto-Validación:",
    body: "Si el cliente envía un precio que es un texto, Pydantic lo rechaza antes de que toque tu lógica.",
    accent: C.red, fill: C.softNeutral
  });
  validateSlide(slide, pptx);
}

// S39: RECIBIENDO EL BODY (POST)
function createReceivingBodySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Recibiendo Datos Complejos", "Bloque 3 · 3.4 El manejo del Request Body", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "main.py",
    code: `@app.post("/items")
async def create_item(item: Product):
    # El parámetro 'item' ya es un objeto de clase Product
    # No es un simple diccionario, tiene métodos y validación
    if item.price > 1000000:
        return {"msg": "Requiere aprobación de gerente"}
    
    return {"msg": f"Producto {item.name} creado", "data": item}`,
    lang: "python", fontSize: 12
  });
  validateSlide(slide, pptx);
}

// S40: REGLAS DE NEGOCIO PROFUNDAS
function createBusinessRulesDeepSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Reglas de Negocio: La Joya de la Corona", "Bloque 3 · 3.3 Lo que hace valioso a tu software", "Lógica");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Ejemplos de Lógica vs Negocio",
    columns: 2,
    entries: [
      { badge: "L", title: "Validación de Lógica", body: "¿Es el email un string válido? ¿Viene el campo nombre?", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "N", title: "Regla de Negocio", body: "¿Tiene este cliente saldo suficiente para comprar el Monitor?", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "L", title: "Validación de Lógica", body: "¿Es la fecha una fecha real en el calendario?", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "N", title: "Regla de Negocio", body: "¿Puede este usuario devolver un libro si tiene multas pendientes?", accent: C.red, fill: C.paleRed, badgeFill: C.red },
    ]
  });
  validateSlide(slide, pptx);
}

// S41: EL FLUJO DE LA PETICIÓN (DIAGRAMA)
function createRequestLayerFlowSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Viaje del Bit a través del Servidor", "Bloque 3 · 3.4 Trazabilidad en la arquitectura", "Arquitectura");
  addStageChain(slide, SH, {
    x: 0.88, y: 2.52, w: 10.26, h: 3.12,
    stages: [
      { title: "1. API", body: "Recibe POST /buy. Valida tipos JSON.", accent: C.navy, fill: C.softBlue },
      { title: "2. NEGOCIO", body: "Revisa stock y saldo del usuario.", accent: C.red, fill: C.paleRed },
      { title: "3. DATOS", body: "Descuenta el item de la DB.", accent: C.gold, fill: C.softNeutral },
      { title: "4. API", body: "Responde 201 Created.", accent: C.navy, fill: C.softBlue },
    ]
  });
  validateSlide(slide, pptx);
}

// S42: EL AGENTE EN ARQUITECTURA
function createAgentArchitectureSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Agente como Analista de Negocio", "Bloque 3 · Acelerando la lógica", "Agente");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.2,
    title: "Delegando el Modelado",
    body: "Un agente es excelente para crear clases Pydantic basadas en requerimientos de negocio complejos.",
    accent: C.navy, fill: C.white, line: C.border
  });
  addCodePanel(slide, SH, {
    x: 0.88, y: 3.62, w: 5.4, h: 3.0,
    title: "Prompt Sugerido",
    code: `Actúa como arquitecto de software.
Genera 3 clases Pydantic para un 
sistema de arriendo de autos: 
Vehiculo, Cliente y Arriendo. 
Usa Python 3.12 y validaciones 
de tipo estrictas.`,
    lang: "text", fontSize: 11, titleFill: C.gold
  });
  slide.addText("💡 Consejo de Senior:", { x: 6.52, y: 3.62, w: 4.62, h: 0.4, fontSize: 16, bold: true, color: C.red });
  const tips = [
    "Revisa que los modelos no expongan datos sensibles (como passwords) en el retorno.",
    "Asegura que el agente use Field(...) para límites de valores (ej. precio > 0).",
  ];
  tips.forEach((t, i) => slide.addText("• " + t, { x: 6.52, y: 4.12 + i * 1.4, w: 4.62, h: 1.2, fontSize: 11, color: C.slate }));
  validateSlide(slide, pptx);
}

// S43: ERRORES COMUNES ARQUITECTURA
function createCommonArchitectureErrorsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Errores Comunes de Arquitectura", "Bloque 3 · Lo que rompe la escalabilidad", "Arquitectura");
  addMythRealityGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Anti-patrones de Backend",
    entries: [
      { badge: "Mal", myth: "Poner SQL directo en el controlador.", reality: "Capas: El controlador no debe saber cómo se guardan los datos.", accent: C.red, badgeFill: C.paleRed },
      { badge: "Mal", myth: "Validar reglas de negocio en el Frontend.", reality: "Seguridad: El cliente miente, el servidor verifica.", accent: C.navy, badgeFill: C.softBlue },
      { badge: "Mal", myth: "Retornar modelos de base de datos a la API.", reality: "Privacidad: Usa Schemas (Pydantic) para filtrar qué datos ve el cliente.", accent: C.red, badgeFill: C.paleRed },
      { badge: "Mal", myth: "Usar diccionarios para todo en Python.", reality: "Rigor: Usa Clases/Modelos para tener ayuda del editor y menos bugs.", accent: C.navy, badgeFill: C.softBlue },
    ]
  });
  validateSlide(slide, pptx);
}

// S44: PREGUNTAS GUÍA B3
function createGuideQuestionsB3Slide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 3", { x: 0.88, y: 0.44, w: 3.4, h: 0.3, fill: C.navy, color: C.white, fontSize: 10.0 });
  const questions = [
    { n: "01", text: "¿Qué componente de nuestra arquitectura es el encargado de 'hablar' el idioma HTTP con el cliente?" },
    { n: "02", text: "¿Por qué es una ventaja técnica usar Pydantic frente a recibir un JSON genérico?" },
    { n: "03", text: "¿En qué capa del servidor pondrías la lógica que calcula si un envío es gratis según el monto?" },
  ];
  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, { x: 0.88, y: y + 0.04, w: 0.58, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.border, margin: 0, valign: "mid" });
    slide.addText(q.text, { x: 1.6, y, w: 8.72, h: 1.56, fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.navy, margin: 0, valign: "mid" });
    if (i < 2) slide.addShape(SH.line, { x: 0.88, y: y + 1.72, w: 10.28, h: 0, line: { color: C.border, pt: 1 } });
  });
  validateSlide(slide, pptx);
}

// S45: SÍNTESIS B3
function createSynthesisB3Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 3", "Arquitectura y Modelos", "Bloque 3");
  addCenterStatement(slide, SH, "Separar responsabilidades no es burocracia, es ingeniería para el largo plazo.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });
  const points = [
    { title: "Capas", body: "API, Lógica y Datos. Cada pieza en su lugar.", accent: C.navy },
    { title: "Pydantic", body: "Validación de contratos mediante el poder del tipado.", accent: C.red },
    { title: "Negocio", body: "El servidor protege las reglas sagradas de la aplicación.", accent: C.gold },
  ];
  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06, title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });
  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.62, title: "Bloque 4 → El Contrato y Swagger",
    body: "Ya tenemos orden interno. Ahora veamos cómo FastAPI documenta y prueba todo automáticamente.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.gold, titleFontSize: 11, bodyFontSize: 10.4
  });
  validateSlide(slide, pptx);
}

// ─── BLOQUE 4: EL CONTRATO INTERACTIVO Y SWAGGER ─────────────────────────────

// S46: APERTURA B4
function createBlock4IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 4", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("El Contrato Interactivo:\nLa Magia de Swagger", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("Cómo FastAPI documenta y prueba tu trabajo automáticamente, facilitando la integración profesional.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  addPanel(slide, 0.88, 5.84, 2.8, 0.4, { fill: "173A5A", line: "173A5A" });
  slide.addText("35 minutos · documentación y testeo", {
    x: 1.04, y: 5.92, w: 2.6, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 9.4, color: "A8C4E0"
  });
  validateSlide(slide, pptx);
}

// S47: QUÉ ES UN CONTRATO DE API
function createApiContractConceptSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "¿Qué es un Contrato de API?", "Bloque 4 · 4.1 El pacto entre sistemas", "Fundamentos");
  addCenterStatement(slide, SH, "Un contrato es un acuerdo formal sobre cómo se intercambiarán los datos.", {
    x: 0.88, y: 2.22, w: 10.26, h: 0.82, fill: C.softBlue, fontSize: 18, color: C.navy
  });
  const pillars = [
    { title: "Definición", body: "URL, Método, Headers, Request Body y Response Body.", accent: C.navy },
    { title: "Confianza", body: "El Frontend sabe qué esperar; el Backend sabe qué recibir.", accent: C.red },
    { title: "Independencia", body: "Ambos equipos pueden trabajar en paralelo sin estorbarse.", accent: C.gold },
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

// S48: LA REVOLUCIÓN DE SWAGGER (OPENAPI)
function createSwaggerRevolutionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Swagger UI: Documentación Viva", "Bloque 4 · 4.2 La ventaja competitiva de FastAPI", "Herramientas");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.8,
    title: "El código es el documento",
    body: "En FastAPI, no escribes manuales en PDF. Tu código (clases Pydantic y decoradores) genera automáticamente una página web interactiva en '/docs' bajo el estándar OpenAPI.",
    accent: C.gold, fill: C.white, line: C.border
  });
  addCodePanel(slide, SH, {
    x: 0.88, y: 4.22, w: 5.4, h: 2.4,
    title: "Tú escribes esto (Python)",
    code: `class User(BaseModel):\n    id: int\n    name: str`,
    lang: "python", fontSize: 14, titleFill: C.navy
  });
  addArrow(slide, 6.4, 5.2, 0.3, 0.4, C.red);
  addMiniCard(slide, SH, {
    x: 6.8, y: 4.22, w: 4.34, h: 2.4,
    title: "FastAPI genera esto (Swagger)",
    body: "• Formulario interactivo\n• Modelos de datos visuales\n• Botón 'Try it out'",
    accent: C.red, fill: C.softNeutral
  });
  validateSlide(slide, pptx);
}

// S49: PRUEBAS EN VIVO SIN FRONTEND
function createLiveTestingSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Pruebas en Vivo: El botón 'Try it out'", "Bloque 4 · 4.2 Validando el servidor al instante", "Herramientas");
  addCenterStatement(slide, SH, "Swagger permite probar tu lógica de negocio sin haber escrito una sola línea de HTML/CSS.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.12, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.08
  });
  const steps = [
    { title: "1. Elegir Endpoint", body: "Busca la ruta que quieres probar en la lista." },
    { title: "2. Try it out", body: "Activa el modo edición para enviar datos reales." },
    { title: "3. Execute", body: "FastAPI procesa y te muestra el JSON de respuesta y el Status Code." },
  ];
  steps.forEach((s, i) => {
    addMiniCard(slide, SH, {
      x: 0.88, y: 3.62 + i * 1.04, w: 10.26, h: 0.88,
      title: s.title, body: s.body, accent: C.gold,
      fill: C.white, line: C.border, titleFontSize: 12, bodyFontSize: 10.5
    });
  });
  validateSlide(slide, pptx);
}

// S50: MENTALIDAD API-FIRST
function createApiFirstMindsetSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Mentalidad 'API First'", "Bloque 4 · 4.3 Diseñar el acuerdo antes de construir", "Estrategia");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Flujos de Trabajo",
    left: {
      title: "Flujo Tradicional", subtitle: "Lento y secuencial",
      items: ["Backend programa todo.", "Frontend espera sentado.", "Al integrar, nada calza.", "Semana de arreglar bugs."],
      accent: C.red, fill: C.paleRed
    },
    right: {
      title: "Flujo API First", subtitle: "Rápido y paralelo",
      items: ["Se diseña el contrato en Swagger.", "Frontend maquetea con Mocks.", "Backend construye la lógica.", "La integración es inmediata."],
      accent: "28A745", fill: C.softBlue
    },
    bridgeLabel: "vs", bridgeBody: "agilidad\nprofesional",
    footer: "FastAPI hace que el diseño del contrato sea ridículamente fácil y rápido."
  });
  validateSlide(slide, pptx);
}

// S51: CÓDIGOS DE ESTADO (STATUS CODES)
function createStatusCodesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Idioma de la Respuesta", "Bloque 4 · 4.4 Los Códigos de Estado HTTP", "Fundamentos");
  const codes = [
    { n: "200/201", t: "Éxito", b: "Todo salió perfecto. El recurso fue leído o creado.", a: "28A745" },
    { n: "400/422", t: "Error de Cliente", b: "Me enviaste los datos mal. FastAPI da 422 por defecto.", a: C.red },
    { n: "401/403", t: "Seguridad", b: "No tienes permiso o no te has identificado.", a: C.gold },
    { n: "500", t: "Error de Servidor", b: "El código de Python falló. Es culpa del Backend.", a: C.navy },
  ];
  codes.forEach((c, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + (i % 2) * 5.24, y: 2.22 + Math.floor(i / 2) * 2.14, w: 5.02, h: 1.96,
      title: c.n + " - " + c.t, body: c.b, accent: c.a,
      fill: C.white, line: C.border, titleFontSize: 14, bodyFontSize: 10.5
    });
  });
  validateSlide(slide, pptx);
}

// S52: EL AGENTE EN DOCUMENTACIÓN
function createAgentDocumentationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Agente como Redactor Técnico", "Bloque 4 · Enriqueciendo el Swagger", "Agente");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 6.0, h: 4.0,
    title: "Prompt para documentar",
    code: `Actúa como Technical Writer.
Analiza esta clase Pydantic y 
genera descripciones profesionales 
para cada campo, incluyendo 
ejemplos de uso que se vean 
bien en Swagger UI.`,
    lang: "text", fontSize: 13, titleFill: C.gold
  });
  slide.addText("💡 ¿Qué ganarás?", { x: 7.1, y: 2.22, w: 4, h: 0.4, fontSize: 18, bold: true, color: C.navy });
  const gains = [
    "Descripciones claras para tu equipo.",
    "Validación de campos obligatorios.",
    "Swagger que parece escrito por un Senior.",
  ];
  gains.forEach((g, i) => slide.addText("• " + g, { x: 7.1, y: 2.82 + i * 0.8, w: 4, h: 0.7, fontSize: 13, color: C.slate }));
  validateSlide(slide, pptx);
}

// S53: PREGUNTAS GUÍA B4
function createGuideQuestionsB4Slide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 4", { x: 0.88, y: 0.44, w: 3.4, h: 0.3, fill: C.navy, color: C.white, fontSize: 10.0 });
  const questions = [
    { n: "01", text: "¿Por qué decimos que Swagger es una 'documentación viva'?" },
    { n: "02", text: "¿Qué ventaja tiene probar el servidor en /docs antes de conectarlo al Frontend?" },
    { n: "03", text: "¿Cuál es la diferencia entre un error 400 y un error 500 en términos de responsabilidad?" },
  ];
  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, { x: 0.88, y: y + 0.04, w: 0.58, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.border, margin: 0, valign: "mid" });
    slide.addText(q.text, { x: 1.6, y, w: 8.72, h: 1.56, fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.navy, margin: 0, valign: "mid" });
    if (i < 2) slide.addShape(SH.line, { x: 0.88, y: y + 1.72, w: 10.28, h: 0, line: { color: C.border, pt: 1 } });
  });
  validateSlide(slide, pptx);
}

// S54: SÍNTESIS B4
function createSynthesisB4Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 4", "El pacto de la API", "Bloque 4");
  addCenterStatement(slide, SH, "Una API profesional se mide por la claridad de su contrato y la calidad de su respuesta.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });
  const points = [
    { title: "Contrato", body: "Acuerdo formal de datos entre Frontend y Backend.", accent: C.navy },
    { title: "Swagger", body: "Documentación interactiva automática mediante OpenAPI.", accent: C.red },
    { title: "Status Codes", body: "Lenguaje universal para comunicar éxito o fallo.", accent: C.gold },
  ];
  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06, title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });
  validateSlide(slide, pptx);
}

// ─── CIERRE DE LA CLASE ──────────────────────────────────────────────────────

// S55: SÍNTESIS FINAL: EL MODELO SISTÉMICO
function createFinalClassSynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis: De la Pieza al Sistema", "Cierre de Clase · El modelo completo de aplicaciones modernas", "Cierre");
  const pillars = [
    { title: "Servidor", body: "Proceso persistente que protege la verdad de los datos.", accent: C.navy },
    { title: "REST", body: "Arquitectura basada en Recursos y Verbos semánticos.", accent: C.red },
    { title: "Arquitectura", body: "División en Capas (API, Lógica, Datos) para el orden.", accent: C.gold },
    { title: "Contratos", body: "Documentación interactiva (Swagger) para la integración.", accent: C.navy },
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

// S56: DESAFÍO DE INTEGRACIÓN
function createIntegrationChallengeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Desafío Mental de Integración", "Aplicando lo aprendido", "Cierre");
  addCenterStatement(slide, SH, "¿Cómo diseñarías el contrato para un sistema de Arriendo de Scooters?", {
    x: 0.88, y: 2.22, w: 10.26, h: 0.82, fill: C.softNeutral, fontSize: 18, color: C.navy
  });
  const steps = [
    { t: "1. Identificar", b: "¿Cuáles son mis recursos? (Scooter, Viaje, Usuario)." },
    { t: "2. Definir URLs", b: "/scooters/{id}, /viajes/iniciar." },
    { t: "3. Elegir Verbos", b: "¿GET para ver mapa? ¿POST para iniciar viaje?" },
    { t: "4. Regla Negocio", b: "¿Tiene batería suficiente para este viaje?" },
  ];
  steps.forEach((s, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 3.42, w: 2.4, h: 2.8,
      title: s.t, body: s.b, accent: C.red, fill: C.white, line: C.border, titleFontSize: 11, bodyFontSize: 9.5
    });
  });
  validateSlide(slide, pptx);
}

// S57: PREGUNTAS DE SALIDA
function createExitQuestionsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS DE SALIDA", { x: 0.88, y: 0.44, w: 2.8, h: 0.3, fill: C.red, color: C.white, fontSize: 10.0 });
  const questions = [
    { n: "A", text: "¿Por qué el Backend es el único que puede 'escribir' en la base de datos?" },
    { n: "B", text: "¿Para qué sirve el archivo 'schemas.py' en una arquitectura en capas?" },
    { n: "C", text: "¿Qué le dirías a un desarrollador Frontend que te pide ver tu código Python para saber cómo usar la API?" },
  ];
  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, { x: 0.88, y: y + 0.04, w: 0.58, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.border, margin: 0, valign: "mid" });
    slide.addText(q.text, { x: 1.6, y, w: 8.72, h: 1.56, fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.navy, margin: 0, valign: "mid" });
    if (i < 2) slide.addShape(SH.line, { x: 0.88, y: y + 1.72, w: 10.28, h: 0, line: { color: C.border, pt: 1 } });
  });
  validateSlide(slide, pptx);
}

// S58: PRÓXIMOS PASOS
function createNextStepsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.gold);
  slide.addText("Mañana: Modelamiento\nde Datos y Persistencia", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("Aprenderemos a diseñar las tablas y relaciones donde guardaremos toda la información de forma permanente.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.8, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  addCenterStatement(slide, SH, "Nos vemos en la Clase 02", {
    x: 0.88, y: 5.82, w: 10.26, h: 0.82, fill: C.gold, line: C.gold, fontSize: 24, color: C.navy, bold: true
  });
  validateSlide(slide, pptx);
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

function main() {
  createCoverSlide();
  createModuleMapSlide();
  createRecapSlide();
  createTodayJumpSlide();
  createObjectives1Slide();
  createObjectives2Slide();
  createBlock1IntroSlide();
  createServerPersistenceSlide();
  createSourceOfTruthSlide();
  createBankAnalogySlide();
  createServerTasksSlide();
  createWhyFastApiSlide();
  createTypeHintsSlide();
  createFirstEndpointSlide();
  createAgentBlock1Slide();
  createGuideQuestionsB1Slide();
  createSynthesisB1Slide();
  createBlock2IntroSlide();
  createWhatIsResourceSlide();
  createUrlSemanticsSlide();
  createVerbGetSlide();
  createVerbPostSlide();
  createPutVsPatchSlide();
  createVerbDeleteSlide();
  createRequestAnatomySlide();
  createHttpHeadersSlide();
  createHttpBodySlide();
  createFastApiPathQuerySlide();
  createAgentRestDesignSlide();
  createGuideQuestionsB2Slide();
  createSynthesisB2Slide();
  createBlock3IntroSlide();
  createMonolithChaosSlide();
  createLayeredArchitectureSlide();
  createApiLayerSlide();
  createBusinessLayerSlide();
  createDataLayerSlide();
  createPydanticModelingSlide();
  createReceivingBodySlide();
  createBusinessRulesDeepSlide();
  createRequestLayerFlowSlide();
  createAgentArchitectureSlide();
  createCommonArchitectureErrorsSlide();
  createGuideQuestionsB3Slide();
  createSynthesisB3Slide();
  createBlock4IntroSlide();
  createApiContractConceptSlide();
  createSwaggerRevolutionSlide();
  createLiveTestingSlide();
  createApiFirstMindsetSlide();
  createStatusCodesSlide();
  createAgentDocumentationSlide();
  createGuideQuestionsB4Slide();
  createSynthesisB4Slide();
  createFinalClassSynthesisSlide();
  createIntegrationChallengeSlide();
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
