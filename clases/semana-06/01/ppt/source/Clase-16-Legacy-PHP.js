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
} = components;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";

applyAiepTheme(pptx, {
  author: "Diego Obando",
  company: "AIEP",
  subject: "Clase 16",
  title: "Lectura e Integración con Código Legado",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx = path.join(rootDir, "Clase-16-Legacy-PHP.pptx");
const outputJs = __filename;

const logoPath = path.resolve(__dirname, "../../../../../.agent/skills/slides-aiep/assets/logo-aiep.png");
const logoMarkPath = path.resolve(__dirname, "../../../../../.agent/skills/slides-aiep/assets/logo-aiep-mark.png");

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function addHeader(slide, title, subtitle, blockLabel = "Bloque 1", pptxLike = pptx) {
  systemAddHeader(slide, SH, pptxLike, title, subtitle, blockLabel, {
    classLabel: `Clase 16 · ${blockLabel}`,
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
  slide.addText("Lectura e Integración con\nCódigo Legado", {
    x: 0.88, y: 2.82, w: 10.26, h: 1.44, fontFace: TYPOGRAPHY.display, fontSize: 44, bold: true, color: C.white, margin: 0, valign: "top",
  });
  slide.addText("Semana 06 · Clase 01: El valor del mantenimiento y la arqueología técnica.", {
    x: 0.88, y: 4.42, w: 10.26, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 18, color: C.gold, bold: true,
  });
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 5.82, w: 0.82, h: 0.82 });
  validateSlide(slide, pptx);
}

function createConnectionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "¿PHP está muerto?", "El meme vs. la Realidad Laboral", "Contexto");
  addCenterStatement(slide, SH, "El 77% de la Web todavía corre sobre PHP. Los sistemas que hoy facturan millones suelen ser 'Legacy'.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.12, fill: C.navy, fontSize: 22, color: C.white, rectRadius: 0.08
  });
  const points = [
    { t: "Sistemas Vivos", b: "Plataformas que funcionan hoy y necesitan crecer." },
    { t: "Misión Crítica", b: "Reglas de negocio que solo existen en ese código." },
    { t: "Oportunidad", b: "Saber mantener es más valioso que solo saber crear." },
  ];
  points.forEach((p, i) => {
    addMiniCard(slide, SH, { x: 0.88 + i * 3.44, y: 3.82, w: 3.2, h: 2.4, title: p.t, body: p.body, accent: C.gold, fill: C.white, line: C.border });
  });
  validateSlide(slide, pptx);
}

function createEngineerProfileSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Perfil del Ingeniero", "No somos solo 'creadores de apps'", "Mentalidad");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Médicos de Sistemas",
    left: { title: "El Amateur", subtitle: "Destructivo", items: ["Dice: 'esto es basura'.", "Quiere borrar y reescribir.", "Ignora los riesgos del negocio."], accent: C.red, fill: C.paleRed },
    right: { title: "El Profesional", subtitle: "Quirúrgico", items: ["Dice: '¿cómo funciona?'.", "Hace cambios incrementales.", "Aplica el Axioma de Integridad."], accent: C.navy, fill: C.softBlue },
    bridgeLabel: "vs", bridgeBody: "criterio\ntécnico",
  });
  validateSlide(slide, pptx);
}

function createObjectivesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Objetivos de la Sesión", "Nuestra misión para hoy", "Objetivos");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Lo que lograremos", columns: 2,
    entries: [
      { badge: "ARCH", title: "Identificar Estructuras", body: "Diferenciar Arquitectura de Archivos vs Recursos.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "READ", title: "Lectura Técnica", body: "Entender PHP legacy sin entrar en pánico.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "SESS", title: "Gestionar Estado", body: "Dominar sesiones y cookies nativas de servidor.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "ACT", title: "Mantenimiento", body: "Aplicar el Axioma de Integridad en un CRUD real.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createLearningPathSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Ruta de Aprendizaje: Hoy", "4 Bloques de Arqueología Técnica", "Mapa");
  const blocks = [
    { title: "Bloque 1", body: "Psicología y Valor del Legado.", active: true },
    { title: "Bloque 2", body: "PHP Esencial y Superglobales.", active: false },
    { title: "Bloque 3", body: "Sesiones y Estado del Usuario.", active: false },
    { title: "Bloque 4", body: "Mantenimiento Quirúrgico CRUD.", active: false },
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
  addHeader(slide, "Principio de Integridad Técnica", "Estabilidad vs. Impulso de Reescritura", "Ingeniería");
  addCenterStatement(slide, SH, "En sistemas de misión crítica, la estabilidad es el activo más valioso. Un ingeniero profesional no borra: comprende, protege e interviene con precisión.", {
    x: 0.88, y: 2.22, w: 10.26, h: 2.5, fill: C.navy, color: C.white, fontSize: 24, bold: true, rectRadius: 0.08
  });
  validateSlide(slide, pptx);
}

// ─── BLOQUE 1: PSICOLOGÍA Y VALOR DEL CÓDIGO LEGADO ──────────────────────────

function createBlock1IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 1", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("Psicología y Valor del\nCódigo Legado", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("Entendiendo por qué lo 'viejo' sostiene el presente.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  validateSlide(slide, pptx);
}

function createLegacyDefinitionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "¿Qué es realmente el Código Legado?", "Bloque 1 · 1.1 El valor del negocio", "Bloque 1");
  addMythRealityGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Cambiando la perspectiva",
    entries: [
      { badge: "MITO", myth: "'Es código basura escrito por alguien que no sabía'.", reality: "Es código que ha sobrevivido al tiempo y ataques reales.", accent: C.red, badgeFill: C.paleRed },
      { badge: "MITO", myth: "'Es aburrido y no tiene valor tecnológico'.", reality: "Es el sistema que paga los sueldos y sostiene el negocio.", accent: C.red, badgeFill: C.paleRed },
      { badge: "FACT", myth: "El código legacy es un activo.", reality: "Contiene décadas de reglas de negocio que nadie documentó.", accent: C.navy, badgeFill: C.softBlue },
      { badge: "FACT", myth: "Mantenimiento = Ingeniería.", reality: "Se requiere más nivel para reparar que para crear de cero.", accent: C.navy, badgeFill: C.softBlue },
    ]
  });
  validateSlide(slide, pptx);
}

function createArchFilesVsResourcesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Archivos vs. Recursos", "Bloque 1 · 1.2 Diferencia Estructural", "Bloque 1");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "¿Cómo llegamos al dato?",
    left: { title: "FastAPI (Moderno)", subtitle: "Recursos Lógicos", items: ["URL abstraída (/users/5).", "El framework rutea.", "Independiente del disco."], accent: C.navy, fill: C.softBlue },
    right: { title: "PHP Legacy", subtitle: "Archivos Físicos", items: ["URL directa (detalle.php).", "La carpeta es la API.", "Si el archivo no está, la ruta cae."], accent: C.red, fill: C.paleRed },
    bridgeLabel: "vs", bridgeBody: "organización",
  });
  validateSlide(slide, pptx);
}

function createFolderIsApiSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Carpeta es la API", "Bloque 1 · 1.2 Organización física", "Bloque 1");
  addCenterStatement(slide, SH, "En el legado, si mueves o renombras un archivo físico, destruyes el punto de acceso.", {
    x: 0.88, y: 2.22, w: 10.26, h: 0.82, fill: C.navy, fontSize: 18, color: C.white
  });
  const folders = [
    { t: "/index.php", b: "Página de inicio.", accent: C.navy },
    { t: "/login.php", b: "Procesador de acceso.", accent: C.navy },
    { t: "/admin/edit.php", b: "Ruta de administración.", accent: C.red },
  ];
  folders.forEach((f, i) => {
    addMiniCard(slide, SH, { x: 0.88 + i * 3.44, y: 3.42, w: 3.2, h: 2.8, title: f.t, body: f.b, accent: f.accent, fill: C.white, line: C.border });
  });
  validateSlide(slide, pptx);
}

function createSpaghettiPatternSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Patrón 'Espagueti'", "Bloque 1 · 1.3 Mezcla de responsabilidades", "Bloque 1");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.6, title: "¿Por qué todo está mezclado?",
    body: "En PHP legacy, es normal encontrar SQL, lógica de negocio y HTML en el mismo archivo. Era el estándar de inmediatez antes de los frameworks.",
    accent: C.red, fill: C.white, line: C.border
  });
  addCodePanel(slide, SH, {
    x: 0.88, y: 4.02, w: 10.26, h: 2.74, title: "Anatomía de un archivo mezclado",
    code: `<?php $res = mysqli_query($conn, "SELECT..."); ?> <!-- Datos -->
<?php if ($res) { ?> <!-- Lógica -->
    <h1><?php echo $res['name']; ?></h1> <!-- Vista -->
<?php } ?>`,
    lang: "php", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createIaArchaeologistSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "IA como Arqueóloga de Software", "Bloque 1 · 1.4 Estrategia de Exploración", "IA");
  addAgentOrchestrationDiagram(slide, SH, {
    y: 2.8,
    title: "El Agente como intérprete de sistemas antiguos"
  });
  validateSlide(slide, pptx);
}

function createExplorationStrategySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Estrategia de Exploración", "Bloque 1 · 1.4 ¿Qué leer primero?", "Bloque 1");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Mapa de reconocimiento", columns: 2,
    entries: [
      { badge: "CONN", title: "Conexión", body: "Busca 'include' o 'require' de config.php.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "POST", title: "Entradas", body: "Identifica las variables $_POST enviadas.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "SQL", title: "Queries", body: "Localiza los comandos INSERT / UPDATE.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "OUT", title: "Inyección", body: "Revisa dónde se imprimen datos en el HTML.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createBlock1QuestionsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 1", { x: 0.88, y: 0.44, w: 3.4, h: 0.3, fill: C.navy, color: C.white, fontSize: 10.0 });
  const questions = [
    { n: "01", text: "¿Por qué proponer una 'reescritura total' es un riesgo financiero?" },
    { n: "02", text: "¿Qué significa que la estructura de carpetas sea la API en PHP legacy?" },
    { n: "03", text: "¿Cómo puede un agente de IA ayudar a entender un archivo de 500 líneas?" },
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
  addHeader(slide, "Síntesis del Bloque 1", "Dignificando el Legado", "Bloque 1");
  addCenterStatement(slide, SH, "El legado no es un estorbo, es un activo funcional que requiere respeto y maestría técnica.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });
  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.62, title: "Próximo Bloque → PHP Esencial",
    body: "Ahora que entendemos su valor, aprenderemos a leer su idioma nativo.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.gold, titleFontSize: 11, bodyFontSize: 10.4
  });
  validateSlide(slide, pptx);
}

// ─── EJECUCIÓN ───────────────────────────────────────────────────────────────

function main() {
  createCoverSlide();
  createConnectionSlide();
  createEngineerProfileSlide();
  createObjectivesSlide();
  createLearningPathSlide();
  createIntegrityPrincipleSlide();
  
  createBlock1IntroSlide();
  createLegacyDefinitionSlide();
  createArchFilesVsResourcesSlide();
  createFolderIsApiSlide();
  createSpaghettiPatternSlide();
  createIaArchaeologistSlide();
  createExplorationStrategySlide();
  createBlock1QuestionsSlide();
  createBlock1SynthesisSlide();

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
