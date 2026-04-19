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
    lang: "php", fontSize: 16
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
    lang: "php", fontSize: 16
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
  addHeader(slide, "Anatomía de una Cookie", "Bloque 3 · 3.2 Descomposición estructural", "Anatomía");
  addTableSchema(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, title: "Atributos del 'Set-Cookie' Header",
    columns: [
      { name: "Atributo", type: "Función Técnica" },
      { name: "Name / Value", type: "El par clave-valor (ej: PHPSESSID=abc123)" },
      { name: "Expires / Max-Age", type: "Cuánto tiempo vive la cookie antes de morir." },
      { name: "Domain / Path", type: "En qué URLs es válida la cookie." },
      { name: "HttpOnly", type: "Protección: impide que JavaScript (XSS) lea la cookie." },
      { name: "Secure", type: "Obliga a que solo viaje sobre HTTPS." }
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
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Headers HTTP Reales",
    left: { title: "Respuesta (Login)", subtitle: "Set-Cookie", items: ["Server -> Browser", "Set-Cookie: PHPSESSID=abc123...", "Crea el vínculo físico."], accent: C.red, fill: C.paleRed },
    right: { title: "Petición (Perfil)", subtitle: "Cookie", items: ["Browser -> Server", "Cookie: PHPSESSID=abc123...", "Recupera el casillero."], accent: C.navy, fill: C.softBlue },
    bridgeLabel: "↔", bridgeBody: "PHPSESSID",
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
