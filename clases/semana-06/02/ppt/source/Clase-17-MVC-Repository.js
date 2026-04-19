const fs = require("fs");
const path = require("path");
const PptxGenJS = require("../../../../../tools/slides-system/node_modules/pptxgenjs");
const slidesSystem = require("../../../../../tools/slides-system/dist/index.js");

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
  addChecklistGrid,
  addMythRealityGrid,
  addAgentOrchestrationDiagram,
  addPromptQualityCompare,
  addTableSchema,
  addAgenticFlow,
} = components;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";

applyAiepTheme(pptx, {
  author: "Diego Obando",
  company: "AIEP",
  subject: "Clase 17",
  title: "Arquitectura MVC y Separación de Responsabilidades",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx = path.join(rootDir, "Clase-17-MVC-Repository.pptx");
const outputJs = __filename;

const logoPath = path.resolve(__dirname, "../../../../../.agent/skills/slides-aiep/assets/logo-aiep.png");
const logoMarkPath = path.resolve(__dirname, "../../../../../.agent/skills/slides-aiep/assets/logo-aiep-mark.png");

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function addHeader(slide, title, subtitle, blockLabel = "Bloque 1", pptxLike = pptx) {
  systemAddHeader(slide, SH, pptxLike, title, subtitle, blockLabel, {
    classLabel: `Clase 17 · ${blockLabel}`,
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
  slide.addShape(SH.rect, { x, y: y + 0.18 * scale, w: 0.2 * scale, h: 0.46 * scale, fill: { color: fill }, line: { color: fill } });
  slide.addShape(SH.rect, { x: x + 0.24 * scale, y, w: 0.24 * scale, h: 0.64 * scale, fill: { color: fill }, line: { color: fill } });
  slide.addShape(SH.rect, { x: x + 0.52 * scale, y: y + 0.18 * scale, w: 0.2 * scale, h: 0.46 * scale, fill: { color: fill }, line: { color: fill } });
}

// ─── INTRODUCCIÓN ────────────────────────────────────────────────────────────

function createCoverSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  slide.addImage({ path: logoPath, x: 0.88, y: 0.62, w: 1.2, h: 0.42 });
  addBarsMotif(slide, 0.88, 1.84, 1.4, C.red);
  slide.addText("Arquitectura MVC y\nSeparación de Responsabilidades", {
    x: 0.88, y: 2.82, w: 10.26, h: 1.44, fontFace: TYPOGRAPHY.display, fontSize: 44, bold: true, color: C.white, margin: 0, valign: "top",
  });
  slide.addText("Semana 06 · Clase 02: Del caos del archivo único al orden de las capas.", {
    x: 0.88, y: 4.42, w: 10.26, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 18, color: C.gold, bold: true,
  });
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 5.82, w: 0.82, h: 0.82 });
  validateSlide(slide, pptx);
}

function createEngineerArchitectSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Ingeniero como Arquitecto", "Más allá de 'hacer que funcione'", "Contexto");
  addCenterStatement(slide, SH, "Un senior no solo escribe código; diseña las estructuras donde ese código puede vivir y crecer sin romperse.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.5, fill: C.navy, fontSize: 24, color: C.white, rectRadius: 0.08
  });
  
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 4.12, w: 10.26, h: 2.5, title: "La Evolución del Profesional", columns: 3,
    entries: [
      { badge: "JR", title: "Funcionalidad", body: "Su meta es que el requerimiento se cumpla (aunque sea espagueti).", accent: C.border, fill: C.white, badgeFill: C.border },
      { badge: "SSR", title: "Mantenibilidad", body: "Escribe código limpio para que otros (o él mismo) puedan leerlo.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "SR", title: "Arquitectura", body: "Crea sistemas de capas que protegen el valor del negocio.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ]
  });
  validateSlide(slide, pptx);
}

function createObjectivesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Objetivos de la Sesión", "Nuestra misión para hoy", "Objetivos");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Lo que lograremos", columns: 2,
    entries: [
      { badge: "MVC", title: "Dominar el Patrón", body: "Entender quién hace qué en Modelo, Vista y Controlador.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "ACT", title: "Refactorizar", body: "Separar operativamente la lógica del HTML en código real.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "REPO", title: "Abstraer Datos", body: "Implementar Repositorios para un backend agnóstico.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "IA", title: "IA Agentic", body: "Usar agentes para auditoría y refactorización estructural.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createLearningPathSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Ruta de Aprendizaje: Hoy", "4 Bloques de Construcción", "Mapa");
  const blocks = [
    { title: "Bloque 1", body: "Del Caos al Orden (MVC Conceptos).", active: true },
    { title: "Bloque 2", body: "Director y Presentador (Ctrl + Vista).", active: false },
    { title: "Bloque 3", body: "Dueño de la Verdad (Repositorios).", active: false },
    { title: "Bloque 4", body: "Refactorización IA y Validación.", active: false },
  ];
  blocks.forEach((b, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 3.6, w: 2.4, h: 2.8, title: b.title, body: b.body, accent: b.active ? C.red : C.navy,
      fill: b.active ? C.paleRed : C.white, line: C.border, titleFontSize: 12, bodyFontSize: 9.5
    });
  });
  validateSlide(slide, pptx);
}

function createIntegrityPrincipleSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Axioma de Integridad Técnica", "La regla de oro del mantenedor", "Ingeniería");
  addCenterStatement(slide, SH, "En sistemas de misión crítica, la estabilidad es el activo más valioso. Un ingeniero profesional no borra: comprende, protege e interviene con precisión.", {
    x: 0.88, y: 2.22, w: 10.26, h: 2.5, fill: C.navy, color: C.white, fontSize: 24, bold: true, rectRadius: 0.08
  });
  validateSlide(slide, pptx);
}

function createWhyRefactorSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "¿Por qué molestarse en Refactorizar?", "El costo de no hacer nada", "Arquitectura");
  addMythRealityGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Análisis de impacto",
    entries: [
      { badge: "COST", myth: "'Si funciona, no lo toques'.", reality: "Hacer cambios en código sucio toma 10x más tiempo.", accent: C.red, badgeFill: C.paleRed },
      { badge: "RISK", myth: "'Refactorizar es peligroso'.", reality: "Lo peligroso es no entender cómo funciona el sistema.", accent: C.red, badgeFill: C.paleRed },
      { badge: "TEAM", myth: "'Yo entiendo mi propio código'.", reality: "La arquitectura es para que el equipo trabaje en paralelo.", accent: C.navy, badgeFill: C.softBlue },
      { badge: "GROW", myth: "'Esta app nunca crecerá'.", reality: "Todo sistema exitoso crece hasta volverse inmanejable.", accent: C.navy, badgeFill: C.softBlue },
    ]
  });
  validateSlide(slide, pptx);
}

function createTechnicalDebtVisualizationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Visualizando la Deuda Técnica", "Del interés a la bancarrota técnica", "Contexto");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Deuda Técnica",
    left: { title: "Deuda 'Barata'", subtitle: "MVC Inicial", items: ["Código limpio.", "Fácil de extender.", "Interés bajo por cambio."], accent: C.navy, fill: C.softBlue },
    right: { title: "Deuda 'Cara'", subtitle: "Legacy Spaghetti", items: ["Código oculto.", "Imposible de testear.", "Cada cambio rompe algo."], accent: C.red, fill: C.paleRed },
    bridgeLabel: "vs", bridgeBody: "costo de\nmantenimiento",
  });
  validateSlide(slide, pptx);
}

function createTransitionToBlock1Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Primer Paso del Rescate", "Hacia una estructura profesional", "Transición");
  addCenterStatement(slide, SH, "Para rescatar el legado, primero debemos aprender a ver las capas invisibles dentro del caos.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.12, fill: C.gold, fontSize: 22, color: C.navy, rectRadius: 0.08, bold: true
  });
  validateSlide(slide, pptx);
}

// ─── BLOQUE 1: DEL CAOS AL ORDEN (PATRÓN MVC) ────────────────────────────────

function createBlock1IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 1", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("Del Caos al Orden\n(Patrón MVC)", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("Entendiendo las 'paredes' que protegen nuestro código.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  validateSlide(slide, pptx);
}

function createSoCDefinitionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Separación de Responsabilidades", "Principio SoC: Separation of Concerns", "Bloque 1");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.8, title: "La Piedra Angular",
    body: "Un sistema debe estar dividido en secciones, donde cada una aborda una responsabilidad distinta. Si cambias el color de un botón, no deberías tener que tocar el SQL.",
    accent: C.navy, fill: C.white, line: C.border
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 4.22, w: 10.26, h: 2.5, title: "Los 3 Pilares del SoC", columns: 3,
    entries: [
      { badge: "LOG", title: "Lógica de Negocio", body: "Cómo se calculan los datos.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "PRE", title: "Presentación", body: "Cómo se muestran los datos.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "DAT", title: "Persistencia", body: "Dónde viven los datos.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ]
  });
  validateSlide(slide, pptx);
}

function createMvcAnalogyIntroSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Analogía del Restaurante", "Visualizando MVC en el mundo real", "Bloque 1");
  addCenterStatement(slide, SH, "Imagina entrar a un restaurante donde el mismo tipo que te toma el pedido, corre a la cocina a pelear con las ollas y luego sale a pintar el menú.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.5, fill: C.softNeutral, color: C.navy, fontSize: 20
  });
  slide.addText("¡Eso es el código Legacy Spaghetti!", {
    x: 0.88, y: 4.0, w: 10.26, h: 0.8, fontFace: TYPOGRAPHY.display, fontSize: 32, bold: true, color: C.red, align: "center"
  });
  validateSlide(slide, pptx);
}

function createTheWaiterControllerSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Mesero: El Controlador", "El Director de Orquesta", "Bloque 1");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Responsabilidades del Controlador",
    left: { title: "En el Restaurante", subtitle: "Mesero", items: ["Recibe al cliente.", "Toma el pedido (Request).", "Coordina cocina y platos."], accent: C.navy, fill: C.softBlue },
    right: { title: "En el Código", subtitle: "Controller", items: ["Recibe el HTTP Request.", "Llama al Modelo.", "Entrega los datos a la Vista."], accent: C.red, fill: C.paleRed },
    bridgeLabel: "es", bridgeBody: "gestión",
  });
  validateSlide(slide, pptx);
}

function createTheChefModelSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Chef: El Modelo", "El Dueño de la Verdad", "Bloque 1");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Responsabilidades del Modelo",
    left: { title: "En el Restaurante", subtitle: "Chef / Cocina", items: ["Conoce las recetas.", "Maneja los ingredientes.", "No habla con el cliente."], accent: C.navy, fill: C.softBlue },
    right: { title: "En el Código", subtitle: "Model / Repository", items: ["Conoce la Base de Datos.", "Aplica reglas de negocio.", "No genera HTML."], accent: C.red, fill: C.paleRed },
    bridgeLabel: "es", bridgeBody: "datos",
  });
  validateSlide(slide, pptx);
}

function createTheDishViewSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Plato: La Vista", "El Presentador", "Bloque 1");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Responsabilidades de la Vista",
    left: { title: "En el Restaurante", subtitle: "El Plato Servido", items: ["Es lo que el cliente ve.", "Es la interfaz final.", "No sabe cómo se cocinó."], accent: C.navy, fill: C.softBlue },
    right: { title: "En el Código", subtitle: "View", items: ["Es el HTML / CSS.", "Muestra las variables.", "No hace consultas SQL."], accent: C.red, fill: C.paleRed },
    bridgeLabel: "es", bridgeBody: "interfaz",
  });
  validateSlide(slide, pptx);
}

function createMvcFlowDiagramSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Ciclo de una Petición MVC", "Flujo de trabajo coordinado", "Bloque 1");
  addAgenticFlow(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    steps: [
      { title: "CLIENTE", body: "Petición HTTP (ej. /perfil.php)", accent: C.navy },
      { title: "CONTROLADOR", body: "Recibe, valida y pide datos al Modelo", accent: C.red },
      { title: "MODELO", body: "Consulta DB y devuelve datos 'crudos'", accent: C.gold },
      { title: "VISTA", body: "Recibe datos y renderiza el HTML final", accent: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createLegacySpaghettiVisualSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Anatomía del Caos (Legacy)", "Visualizando el archivo único", "Bloque 1");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "editar_user.php (Todo mezclado)",
    code: `<?php 
session_start();
$conn = mysqli_connect(...); // MODELO?
if($_POST) { 
    mysqli_query($conn, ...); // CONTROLADOR + MODELO?
}
$res = mysqli_query($conn, "SELECT..."); // MODELO?
?>
<html>
  <h1>Editar <?php echo $res['name']; ?></h1> <!-- VISTA? -->
</html>`,
    lang: "php", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createTargetMvcStructureSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Meta: Estructura Profesional", "Orden por carpetas", "Bloque 1");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Jerarquía de Archivos MVC", columns: 2,
    entries: [
      { badge: "CTRL", title: "controladores/user.php", body: "Solo lógica de ruteo y coordinación.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "VIEW", title: "vistas/user_edit.php", body: "Solo HTML con impresiones mínimas (echo).", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "MODL", title: "modelos/UserRepository.php", body: "Solo clases y funciones SQL.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "CONF", title: "config/db.php", body: "Aislamiento de la conexión técnica.", accent: C.border, fill: C.white, badgeFill: C.border },
    ]
  });
  validateSlide(slide, pptx);
}

function createLegacyVsMvcCompareSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Comparativa: Legacy vs. MVC", "Bloque 1 · Resumen táctico", "Bloque 1");
  addMythRealityGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "¿Por qué el cambio?",
    entries: [
      { badge: "LEGACY", myth: "Archivo único fácil de encontrar.", reality: "Imposible de testear sin romper todo el sitio.", accent: C.red, badgeFill: C.paleRed },
      { badge: "MVC", myth: "Muchos archivos marean.", reality: "Cada archivo tiene UNA sola responsabilidad clara.", accent: C.navy, badgeFill: C.softBlue },
      { badge: "LEGACY", myth: "SQL en todos lados.", reality: "Si la tabla cambia, debes editar 50 archivos.", accent: C.red, badgeFill: C.paleRed },
      { badge: "MVC", myth: "Abstracción Repository.", reality: "Si la DB cambia, solo editas un archivo (el Repo).", accent: C.navy, badgeFill: C.softBlue },
    ]
  });
  validateSlide(slide, pptx);
}

function createIaArchaeologistMappingSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "IA: Mapeando Capas Invisibles", "Bloque 1 · Huella Metodológica", "IA");
  addPromptQualityCompare(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.46,
    title: "IA como Analista de Arquitectura",
    badTitle: "El Error de Reescritura",
    badSubtitle: "Perder lógica de negocio",
    badPrompt: "'Reescribe este archivo en MVC'.",
    badNotes: ["Borra validaciones ocultas.", "Cambia nombres de variables de sesión.", "Inutiliza el sistema."],
    goodTitle: "El Enfoque de Análisis",
    goodSubtitle: "Mapeo de Responsabilidades",
    goodPrompt: "'Analiza este PHP: lista qué líneas pertenecen a la Vista (HTML), cuáles al Controlador (Ruteo) y cuáles al Modelo (SQL)'.",
    goodNotes: ["Extrae el mapa mental del sistema.", "No toca el código funcional.", "Prepara la cirugía segura."],
    footer: "La IA es tu microscopio para ver las capas donde el autor original puso caos."
  });
  validateSlide(slide, pptx);
}

function createArchitecturePromptSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Prompting para Arquitectura", "Bloque 1 · Spec-Driven Development", "IA");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Prompt de Especificación Arquitectónica",
    code: `Actúa como un Arquitecto de Software. 
Tengo este archivo legacy 'editar.php'. 
Mi meta es migrarlo a MVC respetando el estilo actual.

TAREAS:
1. Crea un plan para extraer el SQL a un Repository.
2. Identifica dónde 'cortar' el HTML para crear la Vista.
3. Asegura que el Controlador mantenga las mismas variables $_SESSION.

RESTRICCIÓN: No cambies la lógica, solo reorganízala.`,
    lang: "text", fontSize: 14
  });
  validateSlide(slide, pptx);
}

function createBlock1QuestionsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 1", { x: 0.88, y: 0.44, w: 3.4, h: 0.3, fill: C.navy, color: C.white, fontSize: 10.0 });
  const questions = [
    { n: "01", text: "¿Cuál es el riesgo de tener SQL, Lógica y HTML en un mismo archivo físico?" },
    { n: "02", text: "En la analogía del restaurante, ¿por qué el mesero no debería cocinar?" },
    { n: "03", text: "¿Qué significa que una Vista deba ser 'tonta' en una arquitectura profesional?" },
  ];
  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, { x: 0.88, y: y + 0.04, w: 0.58, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.border, margin: 0, valign: "mid" });
    slide.addText(q.text, { x: 1.6, y, w: 8.72, h: 1.56, fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.navy, margin: 0, valign: "mid" });
    if (i < 2) slide.addShape(SH.line, { x: 0.88, y: y + 1.72, w: 10.28, h: 0, line: { color: C.border, pt: 1 } });
  });
  validateSlide(slide, pptx);
}

function createBlock1SynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 1", "Del Caos al Orden", "Bloque 1");
  addCenterStatement(slide, SH, "MVC no es una regla burocrática, es la herramienta de rescate para sistemas que necesitan sobrevivir al tiempo.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });
  const points = [
    { title: "Estructura", body: "Separar responsabilidades protege la integridad.", accent: C.navy },
    { title: "Capa", body: "Modelo (Datos), Vista (Interfaz), Controlador (Flujo).", accent: C.red },
    { title: "IA", body: "Usar agentes para mapear, no para borrar ciegamente.", accent: C.gold },
  ];
  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06, title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });
  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.62, title: "Próximo Bloque → El Director y el Presentador",
    body: "Aprenderemos a separar físicamente el Controlador de la Vista.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.gold, titleFontSize: 11, bodyFontSize: 10.4
  });
  validateSlide(slide, pptx);
}

// ─── BLOQUE 2: EL DIRECTOR Y EL PRESENTADOR (CONTROLADOR Y VISTA) ────────────

function createBlock2IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 2", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("El Director y el Presentador\n(Controlador y Vista)", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("La separación física: El fin de los archivos mezclados.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  validateSlide(slide, pptx);
}

function createControllerResponsibilitiesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Checklist del Controlador", "El cerebro de la transacción", "Bloque 2");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Lo que SÍ debe hacer un Controlador", columns: 2,
    entries: [
      { badge: "AUTH", title: "Validar Identidad", body: "Revisar session_start() y si el usuario tiene permiso.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "DATA", title: "Capturar Inputs", body: "Limpiar y organizar lo que viene en $_GET o $_POST.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "DELE", title: "Delegar Trabajo", body: "Pedirle datos al Modelo/Repo. Él no hace el SQL.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "VIEW", title: "Decidir la Vista", body: "Cargar el HTML correcto según el resultado.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
    ]
  });
  validateSlide(slide, pptx);
}

function createControllerPuritySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Pureza del Controlador", "Bloque 2 · El pecado de la Vista", "Bloque 2");
  addMythRealityGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Detección de Código Sucio",
    entries: [
      { badge: "FAIL", myth: "echo '<h1>' . $msg . '</h1>';", reality: "Si hay HTML en el controlador, la arquitectura está rota.", accent: C.red, badgeFill: C.paleRed },
      { badge: "FAIL", myth: "mysqli_query($conn, '...');", reality: "El controlador no debe conocer las tablas de la BD.", accent: C.red, badgeFill: C.paleRed },
      { badge: "PASS", myth: "$user = $repo->find(5);", reality: "Delegación limpia: el controlador solo pide resultados.", accent: C.navy, badgeFill: C.softBlue },
      { badge: "PASS", myth: "include('view.php');", reality: "El ruteador decide qué archivo mostrar al final.", accent: C.navy, badgeFill: C.softBlue },
    ]
  });
  validateSlide(slide, pptx);
}

function createDumbViewPhilosophySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Vista 'Tonta' (Dumb View)", "Bloque 2 · Filosofía de Interfaz", "Bloque 2");
  addCenterStatement(slide, SH, "Una Vista profesional es como un actor que solo lee un guion: no pregunta por qué, no busca información; solo dice lo que le pasaron.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.5, fill: C.navy, color: C.white, fontSize: 22, rectRadius: 0.08
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 4.0, w: 10.26, h: 2.74, title: "Reglas de una Vista Sana", columns: 2,
    entries: [
      { badge: "NO", title: "Sin SQL", body: "Nunca verás un 'SELECT' dentro de una vista.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "NO", title: "Sin Flow", body: "No usa 'header(Location)' ni decide ruteo.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "YES", title: "Solo Echo", body: "Usa <?= $var ?> para inyectar datos masticados.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "YES", title: "Loops de UI", body: "Usa foreach solo para recorrer listas de datos.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ]
  });
  validateSlide(slide, pptx);
}

function createSurgicalFrontierSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Paso 1: Identificar la Frontera", "Buscando el punto de corte", "Cirugía");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Legacy original (editar.php)",
    code: `<?php 
$id = (int)$_GET['id'];
$res = mysqli_query($conn, "SELECT * FROM users WHERE id=$id");
$user = mysqli_fetch_assoc($res);

// ----------------------------------------------------
// FRONTERA: Aquí termina el cerebro y empieza el ojo
// ----------------------------------------------------
?>
<div class="card">
    <h1>Perfil de <?php echo $user['username']; ?></h1>
</div>`,
    lang: "php", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createSurgicalExtractionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Paso 2: Extracción de la Vista", "Creando el archivo 'ojo'", "Cirugía");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "vistas/perfil_view.php",
    code: `<!-- Este archivo es puramente visual -->
<div class="card">
    <div class="header">
        <h1>Perfil de <?= $user['username'] ?></h1>
    </div>
    <div class="body">
        <p>Email: <?= $user['email'] ?></p>
    </div>
</div>`,
    lang: "html", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createSurgicalBridgeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Paso 3: El Puente del Include", "Controlador limpio y coordinado", "Cirugía");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "controladores/perfil.php",
    code: `<?php 
require_once('../config/db.php');
$id = (int)$_GET['id'];

// Pedimos datos (Próximamente usaremos Repo)
$res = mysqli_query($conn, "SELECT * FROM users WHERE id=$id");
$user = mysqli_fetch_assoc($res);

// PUENTE: Llamamos a la vista y le pasamos $user
include('../vistas/perfil_view.php');
?>`,
    lang: "php", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createFolderStructureVisualSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Organización por Carpetas", "Bloque 2 · Geometría del Proyecto", "Orden");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Estructura de Directorios Senior", columns: 2,
    entries: [
      { badge: "APP", title: "/controllers/", body: "perfil.php, login.php, edit_user.php.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "UI", title: "/views/", body: "perfil_view.php, layout.php, footer.php.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "DB", title: "/models/", body: "UserRepository.php, OrderRepository.php.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "SYS", title: "/config/", body: "database.php, settings.php.", accent: C.border, fill: C.white, badgeFill: C.border },
    ]
  });
  validateSlide(slide, pptx);
}

function createMentalChallengeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Desafío Mental: ¿Dónde va esto?", "Entrenando el ojo arquitectónico", "Actividad");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Clasifica el código", columns: 2,
    entries: [
      { badge: "??", title: "Validar contraseña", body: "¿Controlador o Vista?", accent: C.border, fill: C.white, badgeFill: C.border },
      { badge: "??", title: "Dibujar un modal", body: "¿Controlador o Vista?", accent: C.border, fill: C.white, badgeFill: C.border },
      { badge: "??", title: "Redirigir al Login", body: "¿Controlador o Vista?", accent: C.border, fill: C.white, badgeFill: C.border },
      { badge: "??", title: "Formatear un precio", body: "¿Controlador o Vista?", accent: C.border, fill: C.white, badgeFill: C.border },
    ]
  });
  validateSlide(slide, pptx);
}

function createIaArchitectSurgicalSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "IA como Instrumento Quirúrgico", "Bloque 2 · Huella Metodológica", "IA");
  addPromptQualityCompare(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.46,
    title: "Separando con Agentes",
    badTitle: "El Prompt 'Mágico'",
    badSubtitle: "Sin control técnico",
    badPrompt: "'Separa este archivo PHP en dos archivos diferentes'.",
    badNotes: ["Rompe rutas de include.", "Olvida variables globales.", "Pierde el session_start()."],
    goodTitle: "El Prompt Quirúrgico",
    goodSubtitle: "Controlando el ruteo",
    goodPrompt: "'Analiza este legacy. Extrae el HTML a vistas/edit_view.php. Genera el controlador edit.php que incluya la vista al final, asegurando que $user esté disponible en el scope'.",
    goodNotes: ["Define el contrato de datos.", "Mantiene la coherencia de rutas.", "Permite validación rápida."],
    footer: "Tú defines dónde cortar; el agente hace el trabajo pesado de movimiento de código."
  });
  validateSlide(slide, pptx);
}

function createBlock2QuestionsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 2", { x: 0.88, y: 0.44, w: 3.4, h: 0.3, fill: C.navy, color: C.white, fontSize: 10.0 });
  const questions = [
    { n: "01", text: "¿Qué señal de código te indica que un Controlador está 'sucio'?" },
    { n: "02", text: "¿Por qué es peligroso poner una redirección header() dentro de una Vista?" },
    { n: "03", text: "¿Cómo se comunican el Controlador y la Vista en esta nueva arquitectura?" },
  ];
  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, { x: 0.88, y: y + 0.04, w: 0.58, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.border, margin: 0, valign: "mid" });
    slide.addText(q.text, { x: 1.6, y, w: 8.72, h: 1.56, fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.navy, margin: 0, valign: "mid" });
    if (i < 2) slide.addShape(SH.line, { x: 0.88, y: y + 1.72, w: 10.28, h: 0, line: { color: C.border, pt: 1 } });
  });
  validateSlide(slide, pptx);
}

function createBlock2SynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 2", "El Director y el Presentador", "Bloque 2");
  addCenterStatement(slide, SH, "Separar la lógica del ruteo de la visualización es el primer gran paso para profesionalizar un sistema legacy.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });
  const points = [
    { title: "Controlador", body: "Solo gestiona el flujo y los datos.", accent: C.red },
    { title: "Vista", body: "Solo imprime HTML (es tonta).", accent: C.navy },
    { title: "Cirugía", body: "Usa la frontera natural PHP/HTML para cortar.", accent: C.gold },
  ];
  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06, title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });
  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.62, title: "Próximo Bloque → El Dueño de la Verdad",
    body: "Aprenderemos a aislar la Base de Datos usando Repositorios.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.gold, titleFontSize: 11, bodyFontSize: 10.4
  });
  validateSlide(slide, pptx);
}

// ─── BLOQUE 3: EL DUEÑO DE LA VERDAD (MODELOS Y REPOSITORIOS) ────────────────

function createBlock3IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 3", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.gold, color: C.navy, fontSize: 10.6, bold: true });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.gold);
  slide.addText("El Dueño de la Verdad\n(Modelos y Repositorios)", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("Aislando la persistencia y blindando el acceso a datos.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  validateSlide(slide, pptx);
}

function createModelVsTableSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Modelo no es una Tabla", "Bloque 3 · Representación de Negocio", "Abstracción");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Capas de Abstracción",
    left: { title: "Base de Datos", subtitle: "Nivel Físico", items: ["Tablas (users).", "Columnas (varchar, int).", "Relaciones FK."], accent: C.border, fill: C.white },
    right: { title: "Modelo de Dominio", subtitle: "Nivel Lógico", items: ["Objeto Usuario.", "Reglas: 'Debe tener email'.", "Operación: 'Actualizar Telefono'."], accent: C.navy, fill: C.softBlue },
    bridgeLabel: "->", bridgeBody: "Mapeo",
  });
  validateSlide(slide, pptx);
}

function createRepositoryPatternSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Patrón Repository", "El estándar de oro Senior", "Arquitectura");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.6, title: "¿Por qué un Repositorio?",
    body: "Actúa como una colección de objetos en memoria. El Controlador dice 'Dame el usuario 5', y no le importa si viene de MySQL, un JSON o una API externa.",
    accent: C.gold, fill: C.white, line: C.gold
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 4.02, w: 10.26, h: 2.74, title: "Ventajas Competitivas", columns: 2,
    entries: [
      { badge: "TEST", title: "Testeabilidad", body: "Puedes simular datos sin tocar la base de datos real.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "PORT", title: "Portabilidad", body: "Si cambias de MySQL a PostgreSQL, solo editas el Repo.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "SEC", title: "Seguridad Central", body: "Un solo punto para sanitizar todas las queries.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "DRY", title: "Reutilización", body: "Evita repetir el mismo SQL en 10 archivos distintos.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ]
  });
  validateSlide(slide, pptx);
}

function createCyberSqlExploitationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Eje Cyber: Explotación SQLi", "Bloque 3 · El ataque por bypass", "Ofensivo");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 12.33, h: 2.1, title: "Vulnerabilidad en Legacy (Concatenación)",
    code: `// buscar.php?id=-1 OR 1=1 --
$sql = "SELECT * FROM users WHERE id = " . $_GET['id'];
$res = mysqli_query($conn, $sql);`,
    lang: "php", fontSize: 16
  });
  addCard(slide, SH, {
    x: 0.88, y: 4.5, w: 12.33, h: 2.2, title: "Impacto del Exploit",
    body: "El atacante inyecta 'OR 1=1 --' para que la condición sea siempre verdadera. Resultado: Acceso a TODOS los usuarios del sistema sin credenciales.",
    accent: C.red, fill: C.paleRed, line: C.red
  });
  validateSlide(slide, pptx);
}

function createCyberSqlDefenseSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Eje Cyber: Defensa Quirúrgica", "Bloque 3 · Blindaje en el Repositorio", "Defensivo");
  addCodePanel(slide, SH, {
    x: 0.5, y: 2.22, w: 12.33, h: 4.54, title: "Blindaje en UserRepository.php",
    code: `public function findById($id) {
    // DEFENSA 1: Forzar tipo entero (Casting)
    $safe_id = (int)$id; 
    
    // DEFENSA 2: Sanitización de escape (si fuera string)
    // $safe_id = mysqli_real_escape_string($this->db, $id);

    $sql = "SELECT * FROM users WHERE id = $safe_id";
    $res = mysqli_query($this->db, $sql);
    return mysqli_fetch_assoc($res);
}`,
    lang: "php", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createUserRepositoryPart1Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "UserRepository.php (Estructura)", "Bloque 3 · Implementación Profesional", "Código");
  addCodePanel(slide, SH, {
    x: 0.5, y: 2.22, w: 12.33, h: 4.54, title: "Clase y Constructor (Inyección de Dependencias)",
    code: `<?php
class UserRepository {
    private $db;

    // Recibe la conexión en el constructor (Mentalidad Senior)
    public function __construct($connection) {
        $this->db = $connection;
    }

    public function findById($id) {
        $id = (int)$id;
        $sql = "SELECT * FROM users WHERE id = $id";
        $res = mysqli_query($this->db, $sql);
        return mysqli_fetch_assoc($res);
    }
}?>`,
    lang: "php", fontSize: 14
  });
  validateSlide(slide, pptx);
}

function createUserRepositoryPart2Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "UserRepository.php (Persistencia)", "Bloque 3 · Guardado Seguro", "Código");
  addCodePanel(slide, SH, {
    x: 0.5, y: 2.22, w: 12.33, h: 4.54, title: "Método de actualización",
    code: `public function updatePhone($id, $phone) {
    $safe_id = (int)$id;
    // Sanitización obligatoria antes de entrar al SQL
    $safe_phone = mysqli_real_escape_string($this->db, $phone);

    $sql = "UPDATE users 
            SET phone = '$safe_phone' 
            WHERE id = $safe_id";

    return mysqli_query($this->db, $sql);
}`,
    lang: "php", fontSize: 14
  });
  validateSlide(slide, pptx);
}

function createPhpVsFastApiCompareSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Contraste: PHP Legacy vs. FastAPI", "Bloque 3 · Espejo de la Industria", "Comparativa");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Acceso a Datos",
    left: { title: "PHP Legacy", subtitle: "Manual / Directo", items: ["mysqli_query strings.", "Sanitización manual.", "Retorno de arrays asociativos."], accent: C.red, fill: C.paleRed },
    right: { title: "FastAPI (Python)", subtitle: "ORM / Type Safe", items: ["Modelos Pydantic.", "SQLAlchemy / Tortoise.", "Validación automática de tipos."], accent: C.navy, fill: C.softBlue },
    bridgeLabel: "vs", bridgeBody: "tecnología",
  });
  validateSlide(slide, pptx);
}

function createLaravelEloquentComparisonSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Laravel Eloquent: La Meta Moderna", "Bloque 3 · El estándar de PHP hoy", "Moderno");
  addCodePanel(slide, SH, {
    x: 0.5, y: 2.22, w: 12.33, h: 4.54, title: "Eloquent ORM (Active Record)",
    code: `// En Laravel moderno, no escribes SQL:
$user = User::find(5);

$user->phone = '912345678';
$user->save(); // Laravel se encarga de la seguridad y el SQL internamente.`,
    lang: "php", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createMesaRedondaFrameworksSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Arquitectura Universal", "FastAPI · Laravel · Express", "Mesa Redonda");
  addCenterStatement(slide, SH, "No importa el lenguaje: todos los sistemas profesionales separan el ruteo (Controlador) de los datos (Repositorio/Servicio).", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });
  const journey = [
    { title: "FASTAPI", body: "Router -> Service -> DB (Python).", accent: C.navy },
    { title: "LARAVEL", body: "Controller -> Eloquent -> DB (PHP).", accent: C.red },
    { title: "EXPRESS", body: "Router -> Controller -> Repo (Node).", accent: C.gold },
  ];
  journey.forEach((j, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06, title: j.title, body: j.body, accent: j.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });
  validateSlide(slide, pptx);
}

function createAiRepositoryPromptSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "IA: Generando Capas de Datos", "Bloque 3 · Huella Metodológica", "IA");
  addPromptQualityCompare(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.46,
    title: "IA como Creadora de Repos",
    badTitle: "Prompt Débil",
    badSubtitle: "Código suelto",
    badPrompt: "'Dame una función PHP para buscar usuarios'.",
    badNotes: ["No usa clases profesionales.", "Usa 'global $conn' (mala práctica).", "Sin manejo de errores."],
    goodTitle: "Prompt de Dominio",
    goodSubtitle: "Estructura Repository",
    goodPrompt: "'Tengo esta tabla SQL 'users'. Genera una clase UserRepository en PHP que use inyección de dependencias para $conn y tenga métodos para findById y updatePhone con sanitización'.",
    goodNotes: ["Genera código arquitectónico.", "Sigue principios SOLID.", "Fomenta la seguridad por diseño."],
    footer: "La IA construye la estructura; tú validas que el contrato de datos sea correcto."
  });
  validateSlide(slide, pptx);
}

function createRepoChecklistSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Checklist de Salud del Repo", "Bloque 3 · Auditoría de Datos", "Calidad");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Si tu Repositorio tiene esto, está MAL", columns: 2,
    entries: [
      { badge: "UI", title: "Contiene 'echo'", body: "Un repo nunca debe imprimir nada al navegador.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "GLOB", title: "Usa 'global'", body: "Debe recibir la conexión por constructor (Inyección).", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "RAW", title: "Devuelve resource", body: "Debe devolver arrays u objetos, no resultados de mysqli.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "AUTH", title: "Valida Sesión", body: "La seguridad de sesión es del Controlador, no del Repo.", accent: C.red, fill: C.white, badgeFill: C.red },
    ]
  });
  validateSlide(slide, pptx);
}

function createBlock3QuestionsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 3", { x: 0.88, y: 0.44, w: 3.4, h: 0.3, fill: C.navy, color: C.white, fontSize: 10.0 });
  const questions = [
    { n: "01", text: "¿Por qué el Repositorio es el lugar ideal para centralizar la ciberdefensa SQLi?" },
    { n: "02", text: "¿Qué significa que un sistema sea 'agnóstico' a la base de datos?" },
    { n: "03", text: "¿Cuál es la principal diferencia entre Eloquent (Laravel) y nuestro UserRepository manual?" },
  ];
  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, { x: 0.88, y: y + 0.04, w: 0.58, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.border, margin: 0, valign: "mid" });
    slide.addText(q.text, { x: 1.6, y, w: 8.72, h: 1.56, fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.navy, margin: 0, valign: "mid" });
    if (i < 2) slide.addShape(SH.line, { x: 0.88, y: y + 1.72, w: 10.28, h: 0, line: { color: C.border, pt: 1 } });
  });
  validateSlide(slide, pptx);
}

function createBlock3SynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 3", "El Dueño de la Verdad", "Bloque 3");
  addCenterStatement(slide, SH, "Un Repositorio bien diseñado es el escudo que protege los datos del negocio del caos del mundo exterior.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });
  const points = [
    { title: "Abstracción", body: "Separar la lógica del motor de persistencia físico.", accent: C.gold },
    { title: "Seguridad", body: "Blindaje contra SQL Injection mediante sanitización quirúrgica.", accent: C.red },
    { title: "Universal", body: "El mismo patrón se aplica en Laravel, FastAPI y Express.", accent: C.navy },
  ];
  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06, title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });
  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.62, title: "Próximo Bloque → Refactorización con IA",
    body: "Usaremos agentes para automatizar el ruteo y la auditoría de seguridad.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.gold, titleFontSize: 11, bodyFontSize: 10.4
  });
  validateSlide(slide, pptx);
}

// ─── BLOQUE 4: REFACTORIZACIÓN ASISTIDA Y VALIDACIÓN HUMANA ──────────────────

function createBlock4IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 4", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("Refactorización Asistida\ny Validación Humana", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("Ejecutando la cirugía arquitectónica con supervisión de IA.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  validateSlide(slide, pptx);
}

function createArchitecturalPromptSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Prompt Arquitectónico (Spec-Driven)", "Bloque 4 · Instrucciones de Alto Nivel", "IA");
  addCodePanel(slide, SH, {
    x: 0.5, y: 2.22, w: 12.33, h: 4.54, title: "Especificación para la IA",
    code: `Actúa como un Arquitecto de Software Senior. 
Tengo este archivo legacy 'perfil.php'. 

TAREAS:
1. Extrae la lógica SQL a una clase 'UserRepository.php' usando inyección de dependencias.
2. Extrae el HTML a 'vistas/perfil_view.php' como una 'Dumb View'.
3. Genera el Controlador 'perfil.php' que coordine ambas capas.

RESTRICCIÓN: Asegura que el ruteo de $_SESSION no se rompa y aplica sanitización SQLi.`,
    lang: "text", fontSize: 14
  });
  validateSlide(slide, pptx);
}

function createPostRefactorAuditSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Checklist de Auditoría Post-Refactor", "Bloque 4 · Qué revisar tras la cirugía", "Validación");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Puntos Críticos de Falla", columns: 2,
    entries: [
      { badge: "PATH", title: "Rutas de Archivos", body: "¿Los 'require' apuntan a las nuevas carpetas /models y /views?", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "GLOB", title: "Scope de Variables", body: "¿La Vista recibe la variable $user o quedó vacía?", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "SESS", title: "Estado de Sesión", body: "¿El session_start() sigue al inicio del Controlador?", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "CONN", title: "Inyección DB", body: "¿Pasamos el objeto $conn al constructor del Repositorio?", accent: C.navy, fill: C.white, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createCyberAiAuditSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Eje Cyber: Auditoría IA", "Bloque 4 · IA como Pentester Arquitectónico", "Seguridad");
  addPromptQualityCompare(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.46,
    title: "IA como Auditora de Seguridad",
    badTitle: "Prompt Genérico",
    badSubtitle: "Superficial",
    badPrompt: "'¿Mi nueva arquitectura es segura?'.",
    badNotes: ["Dará consejos de manual.", "No analiza el flujo de datos.", "Ignora el contexto real."],
    goodTitle: "Prompt de Pentesting",
    goodSubtitle: "Análisis de Fuga",
    goodPrompt: "'Analiza el flujo entre mi nuevo Controlador y el Repositorio: ¿Existe alguna posibilidad de que un parámetro de URL llegue sin casting al SQL? Revisa la inyección de dependencias'.",
    goodNotes: ["Mapea vulnerabilidades lógicas.", "Verifica el blindaje del Repo.", "Garantiza seguridad por diseño."],
    footer: "La IA audita la estructura que ella misma ayudó a crear."
  });
  validateSlide(slide, pptx);
}

// --- NUEVAS DIAPOSITIVAS BLOQUE 4 ---

function createModernDestinationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Destino: Frameworks Modernos", "Bloque 4 · ¿Hacia dónde vamos?", "Bloque 4");
  addCenterStatement(slide, SH, "Separamos capas hoy para poder migrar a estos entornos mañana. Así se ve la arquitectura MVC en la industria actual.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.5, fill: C.navy, color: C.white, fontSize: 22, rectRadius: 0.08
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 4.0, w: 10.26, h: 2.74, title: "Líderes de Mercado", columns: 2,
    entries: [
      { badge: "PY", title: "FastAPI (Python 3.12)", body: "Velocidad extrema, ruteo por decoradores y tipado estricto.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "PHP", title: "Laravel (PHP 8.3+)", body: "El estándar de oro para aplicaciones web robustas y elegantes.", accent: C.red, fill: C.white, badgeFill: C.red },
    ]
  });
  validateSlide(slide, pptx);
}

function createFastApiControllerSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "FastAPI: El Controlador Moderno", "Bloque 4 · Python 3.12", "FastAPI");
  addCodePanel(slide, SH, {
    x: 0.5, y: 2.22, w: 12.33, h: 4.54, title: "Ruteo con Decoradores (main.py)",
    code: `from fastapi import FastAPI, Depends
from .schemas import UserUpdate
from .repository import UserRepository

app = FastAPI()

@app.put("/users/{user_id}")
def update_user(user_id: int, data: UserUpdate, repo: UserRepository = Depends()):
    # El Controlador coordina, el Repo ejecuta.
    return repo.update(user_id, data)`,
    lang: "python", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createFastApiSchemaSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "FastAPI: El Modelo (Schema)", "Bloque 4 · Integridad con Pydantic", "FastAPI");
  addCodePanel(slide, SH, {
    x: 0.5, y: 2.22, w: 12.33, h: 4.54, title: "Validación Automática de Datos",
    code: `from pydantic import BaseModel, EmailStr

class UserUpdate(BaseModel):
    username: str
    email: EmailStr
    phone: str | None = None

# La IA puede generar estos esquemas en segundos 
# basándose en tu código legacy.`,
    lang: "python", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createFastApiDependencySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "FastAPI: Repositorio e Inyección", "Bloque 4 · Desacoplamiento total", "FastAPI");
  addCodePanel(slide, SH, {
    x: 0.5, y: 2.22, w: 12.33, h: 4.54, title: "Inyección de Dependencias Nativa",
    code: `class UserRepository:
    def __init__(self, db: Session = Depends(get_db)):
        self.db = db

    def update(self, user_id: int, data: UserUpdate):
        # Aquí va la lógica de persistencia blindada.
        pass`,
    lang: "python", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createLaravelControllerSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Laravel: Controlador Profesional", "Bloque 4 · PHP Moderno", "Laravel");
  addCodePanel(slide, SH, {
    x: 0.5, y: 2.22, w: 12.33, h: 4.54, title: "UserController.php",
    code: `namespace App\\Http\\Controllers;

use App\\Models\\User;
use Illuminate\\Http\\Request;

class UserController extends Controller {
    public function update(Request $request, User $user) {
        $user->update($request->validated());
        return redirect()->route('profile');
    }
}`,
    lang: "php", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createLaravelEloquentSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Laravel: El Modelo Inteligente", "Bloque 4 · Eloquent ORM", "Laravel");
  addCodePanel(slide, SH, {
    x: 0.5, y: 2.22, w: 12.33, h: 4.54, title: "Abstracción Total de SQL",
    code: `// En lugar de mysqli_query:
$user = User::where('active', true)
            ->orderBy('name')
            ->get();

// Seguridad nativa: Eloquent usa Prepared Statements 
// por debajo, eliminando el SQLi de raíz.`,
    lang: "php", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createLaravelBladeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Laravel: La Vista (Blade)", "Bloque 4 · El fin del 'spaghetti'", "Laravel");
  addCodePanel(slide, SH, {
    x: 0.5, y: 2.22, w: 12.33, h: 4.54, title: "profile.blade.php",
    code: `@extends('layouts.app')

@section('content')
    <h1>Perfil de {{ $user->name }}</h1>
    
    @if($user->isAdmin())
        <span class="badge">Admin</span>
    @endif
@endsection`,
    lang: "html", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createCrossFrameworkComparisonSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Comparativa: El Patrón es Universal", "Bloque 4 · MVC en la vida real", "Industria");
  
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Mapping de Responsabilidades por Capa", columns: 2,
    entries: [
      { badge: "CTRL", title: "Controlador", body: "Legacy: editar.php (top) | FastAPI: @app.get() | Laravel: UserController.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "MODL", title: "Modelo", body: "Legacy: mysqli strings | FastAPI: Pydantic/SQLAlchemy | Laravel: Eloquent ORM.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "VIEW", title: "Vista", body: "Legacy: echo <html> | FastAPI: JSON Response (API) | Laravel: Blade Templates.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "ROUT", title: "Ruteo", body: "Legacy: Archivos físicos | FastAPI: Decoradores | Laravel: routes/web.php.", accent: C.border, fill: C.white, badgeFill: C.border },
    ]
  });
  validateSlide(slide, pptx);
}

function createIaMigrationToModernSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "IA: Traduciendo el Pasado", "Bloque 4 · Migración Asistida", "IA");
  addPromptQualityCompare(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.46,
    title: "IA para Modernización",
    badTitle: "Migración Ciega",
    badSubtitle: "Sin entender el framework",
    badPrompt: "'Pasa este PHP a Python'.",
    badNotes: ["Código no idiomático.", "No usa las ventajas de FastAPI.", "Seguridad deficiente."],
    goodTitle: "Migración Arquitectónica",
    goodSubtitle: "Target: FastAPI 3.12",
    goodPrompt: "'Analiza este legacy. Genera un esquema Pydantic para los datos y un Router de FastAPI que delegue la persistencia en un Repositorio inyectado'.",
    goodNotes: ["Usa mejores prácticas.", "Código Type-Safe.", "Estructura lista para escalar."],
    footer: "La IA es tu traductor arquitectónico entre eras tecnológicas."
  });
  validateSlide(slide, pptx);
}

function createModernSecuritySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Seguridad por Defecto (Secure by Default)", "Bloque 4 · La ventaja de los Frameworks", "Cyber");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Blindaje Automatizado", columns: 2,
    entries: [
      { badge: "SQLi", title: "Prepared Statements", body: "Los ORM como Eloquent impiden la inyección por diseño.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "XSS", title: "Auto-Escaping", body: "Blade escapa automáticamente las variables {{ $var }}.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "CSRF", title: "Tokens de Sesión", body: "Middleware nativo para validar el origen de cada POST.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "TYPE", title: "Type Validation", body: "FastAPI rechaza datos que no cumplan con el Schema.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createSmokeTestProtocolSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Protocolo Smoke Test", "Bloque 4 · La prueba de estabilidad", "Estabilidad");
  addAgenticFlow(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    steps: [
      { title: "CARGA", body: "Abrir el controlador en el navegador. ¿Hay Error 500?", accent: C.navy },
      { title: "LOGIN", body: "Verificar si la sesión persiste tras el refactor.", accent: C.navy },
      { title: "CRUD", body: "Intentar una actualización de datos real.", accent: C.red },
      { title: "LOGS", body: "Revisar logs del servidor buscando advertencias PHP.", accent: C.gold },
    ]
  });
  validateSlide(slide, pptx);
}

function createEngineerRoleSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Nuevo Rol del Ingeniero", "Agentic Engineering en la práctica", "Metodología");
  addCenterStatement(slide, SH, "En 2026, el ingeniero no es un digitador de código; es un supervisor de procesos inteligentes que garantiza la calidad y la seguridad.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.5, fill: C.navy, color: C.white, fontSize: 22, rectRadius: 0.08
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 4.0, w: 10.26, h: 2.74, title: "Tu Responsabilidad Humana", columns: 2,
    entries: [
      { badge: "SPEC", title: "Definir la Spec", body: "Tú decides las fronteras de la arquitectura.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "VAL", title: "Validar Output", body: "Tú eres el último filtro antes de producción.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "SEC", title: "Criterio Cyber", body: "La IA propone, tú garantizas que sea inexpugnable.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "CONT", title: "Continuidad", body: "Asegurar que el negocio no se detenga.", accent: C.navy, fill: C.white, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createBlock4QuestionsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 4", { x: 0.88, y: 0.44, w: 3.4, h: 0.3, fill: C.navy, color: C.white, fontSize: 10.0 });
  const questions = [
    { n: "01", text: "¿Qué error común comete la IA al separar un archivo único en capas?" },
    { n: "02", text: "¿Por qué un Smoke Test es obligatorio tras una cirugía de software?" },
    { n: "03", text: "¿Cómo cambia tu trabajo diario al usar Agentes como analistas de arquitectura?" },
  ];
  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, { x: 0.88, y: y + 0.04, w: 0.58, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.border, margin: 0, valign: "mid" });
    slide.addText(q.text, { x: 1.6, y, w: 8.72, h: 1.56, fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.navy, margin: 0, valign: "mid" });
    if (i < 2) slide.addShape(SH.line, { x: 0.88, y: y + 1.72, w: 10.28, h: 0, line: { color: C.border, pt: 1 } });
  });
  validateSlide(slide, pptx);
}

function createBlock4SynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 4", "Refactorización Asistida", "Bloque 4");
  addCenterStatement(slide, SH, "La IA acelera la arquitectura; el criterio humano garantiza que esa arquitectura sea estable y segura.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });
  const points = [
    { title: "Prompt", body: "Entregar especificaciones arquitectónicas, no deseos.", accent: C.red },
    { title: "Auditoría", body: "Revisar rutas, scopes y seguridad post-intervención.", accent: C.navy },
    { title: "Validación", body: "Protocolo Smoke Test para garantizar estabilidad.", accent: C.gold },
  ];
  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06, title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });
  validateSlide(slide, pptx);
}

// ─── CIERRE FINAL ────────────────────────────────────────────────────────────

function createFinalClassSynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Resumen Final de la Sesión", "Los 4 Pilares del Orden", "Cierre");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Lo que aprendimos hoy", columns: 2,
    entries: [
      { badge: "MVC", title: "Arquitectura de Capas", body: "Separar el ruteo (Ctrl), la UI (Vista) y los datos (Repo).", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "REPO", title: "Patrón Repository", body: "Blindar la base de datos y hacerla agnóstica al sistema.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "SEC", title: "Seguridad Transversal", body: "Identificar y defender contra SQLi desde el diseño.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "IA", title: "Agentic Refactor", body: "IA como socia analítica para la cirugía estructural.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ]
  });
  validateSlide(slide, pptx);
}

function createFinalExitQuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas de Salida", "Validando el aprendizaje", "Cierre");
  addMythRealityGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Reflexión Técnica",
    entries: [
      { badge: "01", myth: "¿En qué capa pondrías un descuento?", reality: "En el Modelo/Servicio para centralizar la regla.", accent: C.navy, badgeFill: C.softBlue },
      { badge: "02", myth: "¿Por qué separar la Vista?", reality: "Para que el equipo de UI trabaje sin riesgo de romper el PHP.", accent: C.navy, badgeFill: C.softBlue },
      { badge: "03", myth: "¿Mayor riesgo del Repo?", reality: "Olvidar la sanitización de inputs dinámicos.", accent: C.red, badgeFill: C.paleRed },
      { badge: "04", myth: "¿Rol de la IA?", reality: "Analista de dependencias para cirugías seguras.", accent: C.navy, badgeFill: C.softBlue },
    ]
  });
  validateSlide(slide, pptx);
}

function createNextStepSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Próximo Paso: Hacia la API", "Bloque 4 · Mañana Miércoles", "Futuro");
  addCenterStatement(slide, SH, "Mañana convertiremos estas capas lógicas en una API Interoperable, dejando atrás el renderizado de HTML puro.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.5, fill: C.navy, color: C.white, fontSize: 24, rectRadius: 0.08
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 4.0, w: 10.26, h: 2.74, title: "Lo que se viene", columns: 2,
    entries: [
      { badge: "JSON", title: "Protocolos de Datos", body: "Intercambio universal de información.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "REST", title: "Arquitectura REST", body: "Construyendo servicios modernos y escalables.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ]
  });
  validateSlide(slide, pptx);
}

function createFinalClosingSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.gold);
  
  slide.addText("Mañana: De la Estructura\na la Interoperabilidad", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  
  slide.addText("Hoy logramos separar las capas lógicas del sistema. Mañana convertiremos esos Repositorios en el corazón de una API REST profesional, permitiendo que cualquier sistema consuma nuestros datos de forma segura.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.8, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  
  addCenterStatement(slide, SH, "Nos vemos mañana miércoles 22 de abril", {
    x: 0.88, y: 5.82, w: 10.26, h: 0.82, fill: C.gold, fontSize: 24, color: C.navy, bold: true
  });
  
  validateSlide(slide, pptx);
}

// ─── EJECUCIÓN ───────────────────────────────────────────────────────────────

function main() {
  createCoverSlide();
  createEngineerArchitectSlide();
  createObjectivesSlide();
  createLearningPathSlide();
  createIntegrityPrincipleSlide();
  createWhyRefactorSlide();
  createTechnicalDebtVisualizationSlide();
  createTransitionToBlock1Slide();

  createBlock1IntroSlide();
  createSoCDefinitionSlide();
  createMvcAnalogyIntroSlide();
  createTheWaiterControllerSlide();
  createTheChefModelSlide();
  createTheDishViewSlide();
  createMvcFlowDiagramSlide();
  createLegacySpaghettiVisualSlide();
  createTargetMvcStructureSlide();
  createLegacyVsMvcCompareSlide();
  createIaArchaeologistMappingSlide();
  createArchitecturePromptSlide();
  createBlock1QuestionsSlide();
  createBlock1SynthesisSlide();

  // Bloque 2
  createBlock2IntroSlide();
  createControllerResponsibilitiesSlide();
  createControllerPuritySlide();
  createDumbViewPhilosophySlide();
  createSurgicalFrontierSlide();
  createSurgicalExtractionSlide();
  createSurgicalBridgeSlide();
  createFolderStructureVisualSlide();
  createMentalChallengeSlide();
  createIaArchitectSurgicalSlide();
  createBlock2QuestionsSlide();
  createBlock2SynthesisSlide();

  // Bloque 3
  createBlock3IntroSlide();
  createModelVsTableSlide();
  createRepositoryPatternSlide();
  createCyberSqlExploitationSlide();
  createCyberSqlDefenseSlide();
  createUserRepositoryPart1Slide();
  createUserRepositoryPart2Slide();
  createPhpVsFastApiCompareSlide();
  createLaravelEloquentComparisonSlide();
  createMesaRedondaFrameworksSlide();
  createAiRepositoryPromptSlide();
  createRepoChecklistSlide();
  createBlock3QuestionsSlide();
  createBlock3SynthesisSlide();

  // Bloque 4
  createBlock4IntroSlide();
  createArchitecturalPromptSlide();
  createPostRefactorAuditSlide();
  createCyberAiAuditSlide();
  
  // --- INSERCIÓN FRAMEWORKS MODERNOS ---
  createModernDestinationSlide();
  createFastApiControllerSlide();
  createFastApiSchemaSlide();
  createFastApiDependencySlide();
  createLaravelControllerSlide();
  createLaravelEloquentSlide();
  createLaravelBladeSlide();
  createCrossFrameworkComparisonSlide();
  createIaMigrationToModernSlide();
  createModernSecuritySlide();
  
  createSmokeTestProtocolSlide();
  createEngineerRoleSlide();
  createBlock4QuestionsSlide();
  createBlock4SynthesisSlide();

  // Cierre
  createFinalClassSynthesisSlide();
  createFinalExitQuestionsSlide();
  createNextStepSlide();
  createFinalClosingSlide();

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
