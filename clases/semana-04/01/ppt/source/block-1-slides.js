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
  addCodeAnnotation,
  addSyntaxCompare,
  addDelegationSplit,
  addMarkBox,
  addChip,
  addPill,
  addTerminalPanel,
  addStageChain,
  addMythRealityGrid,
  addActorLane,
} = components;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
applyAiepTheme(pptx, {
  author: "Codex",
  company: "AIEP",
  subject: "Clase 10",
  title: "JavaScript Moderno",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx =
  process.env.PPTX_OUTPUT ||
  path.join(rootDir, "Clase-10-JavaScript-Moderno.pptx");
const outputJs =
  process.env.PPTX_SOURCE_OUTPUT ||
  path.join(rootDir, "Clase-10-JavaScript-Moderno.js");

const logoPath = path.resolve(
  __dirname,
  "../../../../../.agent/skills/slides-aiep/assets/logo-aiep.png"
);
const logoMarkPath = path.resolve(
  __dirname,
  "../../../../../.agent/skills/slides-aiep/assets/logo-aiep-mark.png"
);

function addHeader(slide, title, subtitle, blockLabel = "Bloque 1", pptxLike = pptx) {
  systemAddHeader(slide, SH, pptxLike, title, subtitle, blockLabel, {
    classLabel: `Clase 10 · ${blockLabel}`,
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

function addMapBlock(slide, x, y, w, h, opts = {}) {
  addPanel(slide, x, y, w, h, {
    fill: opts.fill || C.white,
    line: opts.line || C.border,
  });
  slide.addText(opts.kicker || "Bloque", {
    x,
    y: y + 0.16,
    w,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.8,
    bold: true,
    color: opts.kickerColor || C.navy,
    align: "center",
    margin: 0,
  });
  slide.addText(opts.title || "", {
    x: x + 0.2,
    y: y + 0.66,
    w: w - 0.4,
    h: h - 0.94,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.fontSize || 16.6,
    bold: true,
    color: opts.color || C.navy,
    align: "center",
    valign: "mid",
    margin: 0,
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

// ─── SLIDE 1: COVER ──────────────────────────────────────────────────────────

function createCoverSlide() {
  const slide = pptx.addSlide();

  slide.background = { color: C.navy };
  slide.addImage({
    path: logoPath,
    ...imageSizingContain(logoPath, 9.94, 0.38, 1.42, 0.82),
  });
  addBarsMotif(slide, 0.78, 0.72, 1.22, C.red);

  // Class label chip
  slide.addText("Clase 10 · Semana 04", {
    x: 1.66,
    y: 0.82,
    w: 2.6,
    h: 0.14,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11,
    bold: true,
    color: C.white,
    margin: 0,
  });

  // Big title
  slide.addText("JavaScript moderno", {
    x: 0.78,
    y: 1.54,
    w: 4.5,
    h: 0.7,
    fontFace: TYPOGRAPHY.display,
    fontSize: 26,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });

  // Subtitle
  slide.addText("ES6+, módulos, asincronía, Promises y async/await", {
    x: 0.78,
    y: 2.36,
    w: 4.4,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13.6,
    color: "E5EDF6",
    margin: 0,
  });

  // Hook text
  slide.addText(
    "Hoy JavaScript se ordena como lenguaje de trabajo real: sintaxis más legible, módulos para escalar y asincronía que ya puede leerse con criterio.",
    {
      x: 0.78,
      y: 3.24,
      w: 4.4,
      h: 0.86,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.2,
      color: "DCE6F2",
      margin: 0,
      valign: "mid",
    }
  );

  // Bottom-left info panel
  addPanel(slide, 0.78, 5.18, 3.0, 0.78, {
    fill: "355B8E",
    line: "355B8E",
  });
  slide.addText("Lunes 6 de abril de 2026 · 10:50 - 13:10", {
    x: 1.02,
    y: 5.38,
    w: 2.6,
    h: 0.32,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.2,
    bold: true,
    color: C.white,
    margin: 0,
    breakLine: false,
  });
  slide.addShape(SH.rect, {
    x: 0.88,
    y: 5.34,
    w: 0.08,
    h: 0.42,
    fill: { color: C.red },
    line: { color: C.red },
  });

  // Right side: ES6+ preview code panel
  addCodePanel(slide, SH, {
    x: 5.44,
    y: 1.38,
    w: 5.02,
    h: 2.56,
    title: "Vista previa — ES6+",
    code:
      'const usuario = { nombre: "Ana", edad: 25 };\n' +
      "const { nombre, edad } = usuario;\n" +
      "const saludar = (n) => `Hola, ${n}!`;\n" +
      "const nums = [1, 2, 3];\n" +
      "const extendido = [...nums, 4, 5];",
    lang: "js",
    fontSize: 9.4,
    textOffsetY: 0.72,
    topOffset: 0.12,
    titleFill: C.titleFill,
  });

  // Preview mini-card
  addMiniCard(slide, SH, {
    x: 5.44,
    y: 4.16,
    w: 5.02,
    h: 0.78,
    title: "const · arrow · destructuring · template literal · spread",
    body: "Los cinco patrones que veremos en el Bloque 1.",
    accent: C.gold,
    fill: C.softBlue,
    line: C.softBlue,
    titleFontSize: 10.8,
    bodyFontSize: 8.2,
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 2: MAPA DE LA CLASE ────────────────────────────────────────────────

function createMapSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cuatro bloques, una sesión",
    "Del lenguaje moderno a la lectura del flujo asíncrono: una progresión técnica continua.",
    "Bloque 1"
  );

  addMapBlock(slide, 1.12, 2.46, 2.16, 2.6, {
    kicker: "Bloque 1 · 30 min",
    title: "El salto\na ES6+",
    fill: C.navy,
    line: C.navy,
    color: C.white,
    kickerColor: C.white,
    fontSize: 16.6,
  });
  addArrow(slide, 3.36, 3.62, 0.2, 0.28, C.gold);
  addMapBlock(slide, 3.62, 2.46, 2.16, 2.6, {
    kicker: "Bloque 2 · 30 min",
    title: "Módulos",
    fill: C.white,
    line: C.border,
    color: C.navy,
    kickerColor: C.navy,
    fontSize: 16.6,
  });
  addArrow(slide, 5.86, 3.62, 0.2, 0.28, C.gold);
  addMapBlock(slide, 6.12, 2.46, 2.16, 2.6, {
    kicker: "Bloque 3 · 30 min",
    title: "La\nasincronía",
    fill: C.paleRed,
    line: C.paleRed,
    color: C.navy,
    kickerColor: C.navy,
    fontSize: 16.6,
  });
  addArrow(slide, 8.36, 3.62, 0.2, 0.28, C.gold);
  addMapBlock(slide, 8.62, 2.46, 2.16, 2.6, {
    kicker: "Bloque 4 · 30 min",
    title: "Promises\ny async/await",
    fill: C.white,
    line: C.border,
    color: C.navy,
    kickerColor: C.navy,
    fontSize: 14.4,
  });

  addCenterStatement(slide, SH, "sintaxis → módulos → asincronía → flujo moderno", {
    x: 1.54,
    y: 5.46,
    w: 9.0,
    h: 0.72,
    fill: C.softNeutral,
    line: C.softNeutral,
    fontSize: 18.6,
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 3: BLOQUE 1 APERTURA ───────────────────────────────────────────────

function createBlock1IntroSlide() {
  const slide = pptx.addSlide();

  slide.background = { color: C.navy };

  // AIEP mark top-right
  addMarkBox(slide, SH, logoMarkPath, {
    x: 9.62,
    y: 0.28,
    w: 0.68,
    h: 0.68,
  });

  // BLOQUE 1 chip
  addChip(slide, SH, "BLOQUE 1", {
    x: 0.88,
    y: 0.68,
    w: 1.32,
    h: 0.34,
    fill: C.red,
    color: C.white,
    fontSize: 10.6,
    rectRadius: 0.05,
  });

  // Bars motif
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);

  // Block title
  slide.addText("El salto a JavaScript moderno", {
    x: 0.88,
    y: 2.24,
    w: 8.8,
    h: 1.0,
    fontFace: TYPOGRAPHY.display,
    fontSize: 38,
    bold: true,
    color: C.white,
    margin: 0,
    valign: "mid",
  });

  // Block subtitle
  slide.addText("Por qué ES6+ cambió el lenguaje", {
    x: 0.88,
    y: 3.52,
    w: 7.2,
    h: 0.38,
    fontFace: TYPOGRAPHY.body,
    fontSize: 16,
    color: "DCE6F2",
    margin: 0,
    valign: "mid",
  });

  // Duration note
  addPanel(slide, 0.88, 5.84, 2.24, 0.4, {
    fill: "173A5A",
    line: "173A5A",
  });
  slide.addText("30 minutos · expositivo y conversado", {
    x: 1.04,
    y: 5.92,
    w: 2.0,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.4,
    color: "A8C4E0",
    margin: 0,
    valign: "mid",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 4: EL LENGUAJE QUE TODOS CRITICABAN ───────────────────────────────

function createLegacyProblemsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El JavaScript heredado tenía problemas reales",
    "No era una crítica estética: eran comportamientos que generaban errores difíciles de detectar.",
    "Bloque 1"
  );

  addMiniCard(slide, SH, {
    x: 0.98,
    y: 2.32,
    w: 4.56,
    h: 0.82,
    title: "var con alcance de función, no de bloque",
    body: "Una variable declarada dentro de un if seguía existiendo fuera de él.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 11.4,
    bodyFontSize: 8.4,
  });

  addMiniCard(slide, SH, {
    x: 0.98,
    y: 3.26,
    w: 4.56,
    h: 0.82,
    title: "Redeclaración silenciosa de variables",
    body: "Era posible declarar la misma variable múltiples veces sin error ni advertencia.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 11.4,
    bodyFontSize: 8.4,
  });

  addMiniCard(slide, SH, {
    x: 0.98,
    y: 4.2,
    w: 4.56,
    h: 0.82,
    title: "Concatenación de strings verbose y propensa a errores",
    body: 'Combinar texto con valores: "Hola, " + nombre + ". Tienes " + edad + " años."',
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 11.4,
    bodyFontSize: 8.4,
  });

  addMiniCard(slide, SH, {
    x: 0.98,
    y: 5.14,
    w: 4.56,
    h: 0.82,
    title: "Extracción de propiedades en múltiples líneas",
    body: "Cada propiedad de un objeto requería una línea de asignación separada.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 11.4,
    bodyFontSize: 8.4,
  });

  addCodePanel(slide, SH, {
    x: 5.84,
    y: 2.32,
    w: 4.62,
    h: 3.64,
    title: "JS antes de ES6",
    code:
      'var nombre = "Ana";\n' +
      'var nombre = "Luis"; // sin error\n' +
      "\n" +
      'var saludo = "Hola, " + nombre +\n' +
      '  ". Bienvenido.";\n' +
      "\n" +
      "var usuario = { nombre: \"Ana\", edad: 25 };\n" +
      "var n = usuario.nombre;\n" +
      "var e = usuario.edad;\n" +
      "\n" +
      "if (true) {\n" +
      '  var mensaje = "dentro del if";\n' +
      "}\n" +
      "console.log(mensaje); // sigue accesible",
    lang: "js",
    fontSize: 8.8,
    textOffsetY: 0.72,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addPanel(slide, 0.98, 6.04, 4.56, 0.28, { fill: C.softNeutral, line: C.softNeutral });
  slide.addText(
    "A escala, estos comportamientos acumulaban errores silenciosos y código difícil de razonar.",
    {
      x: 1.08,
      y: 6.06,
      w: 4.36,
      h: 0.24,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.2,
      color: C.slate,
      margin: 0,
      valign: "mid",
      fit: "shrink",
    }
  );

  validateSlide(slide, pptx);
}

// ─── SLIDE 5: ES6 EN 2015 ─────────────────────────────────────────────────────

function createEs6InflectionSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "ECMAScript 2015 transformó el lenguaje",
    "ES6 no fue una actualización menor: redefinió cómo se escribe JavaScript en todo el ecosistema.",
    "Bloque 1"
  );

  // Timeline chain
  addChip(slide, SH, "ES5 (legacy)", {
    x: 1.08,
    y: 2.28,
    w: 1.82,
    h: 0.34,
    fill: "3A4A5E",
    color: "8CA0B8",
    fontSize: 12,
  });

  addArrow(slide, 2.96, 2.36, 0.22, 0.28, C.gold);

  addChip(slide, SH, "ES6 / 2015", {
    x: 3.24,
    y: 2.28,
    w: 2.24,
    h: 0.34,
    fill: C.red,
    color: C.white,
    fontSize: 14,
  });

  addArrow(slide, 5.54, 2.36, 0.22, 0.28, C.gold);

  addChip(slide, SH, "ES2016+", {
    x: 5.82,
    y: 2.28,
    w: 1.98,
    h: 0.34,
    fill: C.navy,
    color: "A8C4E0",
    fontSize: 12,
  });

  slide.addText(
    "Cuando hoy se habla de «JavaScript moderno», casi siempre se habla de ES6 en adelante.",
    {
      x: 1.08,
      y: 3.04,
      w: 6.72,
      h: 0.32,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.4,
      color: C.slate,
      margin: 0,
      valign: "mid",
    }
  );

  // Feature chips grid
  const features = [
    { label: "let / const", col: 0 },
    { label: "Arrow functions", col: 1 },
    { label: "Template literals", col: 2 },
    { label: "Destructuring", col: 0 },
    { label: "Spread operator", col: 1 },
    { label: "Módulos (import/export)", col: 2 },
    { label: "Promises", col: 1 },
  ];

  const chipColors = [C.navy, C.navy, C.navy, C.navy, C.navy, C.navy, C.red];
  const chipX = [1.08, 4.04, 7.0];
  let colRow = [0, 0, 0];

  features.forEach((f, i) => {
    const col = f.col;
    const x = chipX[col];
    const y = 3.56 + colRow[col] * 0.58;
    const fill = chipColors[i];

    addChip(slide, SH, f.label, {
      x,
      y,
      w: 2.72,
      h: 0.34,
      fill,
      color: C.white,
      fontSize: 10.8,
    });
    colRow[col]++;
  });

  slide.addText("Este bloque cubre las primeras cinco. Módulos y asincronía tienen sus propios bloques.", {
    x: 1.08,
    y: 6.1,
    w: 9.0,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.4,
    color: C.slate,
    margin: 0,
    italic: true,
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 6: addSyntaxCompare var vs let/const ───────────────────────────────

function createVarVsLetConstSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "var → let y const",
    "El cambio más inmediato de ES6: declarar variables con alcance de bloque y semántica clara.",
    "Bloque 1"
  );

  addSyntaxCompare(slide, SH, {
    x: 0.94,
    y: 2.16,
    w: 10.18,
    h: 3.52,
    beforeLabel: "var (legado)",
    afterLabel: "let / const (ES6+)",
    beforeCode:
      'var nombre = "Ana";\n' +
      'var nombre = "Luis"; // sin error\n' +
      "var intentos = 0;\n" +
      "\n" +
      "var usuario = { nombre: \"Ana\", edad: 25 };\n" +
      "var n = usuario.nombre;\n" +
      "var e = usuario.edad;",
    afterCode:
      'const nombre = "Ana";\n' +
      "// nombre = \"Luis\"; // error: reasignar const\n" +
      "let intentos = 0;\n" +
      "\n" +
      "const usuario = { nombre: \"Ana\", edad: 25 };\n" +
      "const { nombre: nom, edad } = usuario;",
    language: "js",
    fontSize: 9.4,
    caption:
      "const por defecto, let cuando el valor cambia, var nunca en código nuevo",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 7: addSyntaxCompare funciones → arrow functions ───────────────────

function createArrowFunctionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Funciones tradicionales → arrow functions",
    "Sintaxis más corta para funciones. Cuando el cuerpo es una sola expresión, return y llaves son opcionales.",
    "Bloque 1"
  );

  addSyntaxCompare(slide, SH, {
    x: 0.94,
    y: 2.16,
    w: 10.18,
    h: 3.52,
    beforeLabel: "Función tradicional",
    afterLabel: "Arrow function",
    beforeCode:
      "function sumar(a, b) {\n" +
      "  return a + b;\n" +
      "}\n" +
      "\n" +
      "var numeros = [1, 2, 3, 4];\n" +
      "var positivos = numeros.filter(\n" +
      "  function(n) { return n > 2; }\n" +
      ");",
    afterCode:
      "const sumar = (a, b) => a + b;\n" +
      "\n" +
      "const numeros = [1, 2, 3, 4];\n" +
      "const positivos = numeros.filter(\n" +
      "  (n) => n > 2\n" +
      ");",
    language: "js",
    fontSize: 9.4,
    caption:
      "Nota: las arrow functions no tienen su propio this — relevante al trabajar con objetos y clases",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 8: addSyntaxCompare concatenación → template literals ──────────────

function createTemplateLiteralsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Concatenación → template literals",
    "Interpolar texto con valores usando backticks y ${}. También permiten strings multilínea sin \\n.",
    "Bloque 1"
  );

  addSyntaxCompare(slide, SH, {
    x: 0.94,
    y: 2.16,
    w: 10.18,
    h: 3.52,
    beforeLabel: "Concatenación",
    afterLabel: "Template literals",
    beforeCode:
      'var nombre = "Ana";\n' +
      "var edad = 25;\n" +
      "\n" +
      'var msg = "Hola, " + nombre +\n' +
      '  ". Tienes " + edad + " años.";\n' +
      "\n" +
      'var multi = "Linea 1\\n" +\n' +
      '  "Linea 2\\n" +\n' +
      '  "Linea 3";',
    afterCode:
      'const nombre = "Ana";\n' +
      "const edad = 25;\n" +
      "\n" +
      "const msg = `Hola, ${nombre}.\n" +
      "Tienes ${edad} años.`;\n" +
      "\n" +
      "const multi = `Linea 1\n" +
      "Linea 2\n" +
      "Linea 3`;",
    language: "js",
    fontSize: 9.4,
    caption:
      "Los backticks permiten expresiones completas dentro de ${}: llamadas a funciones, operaciones, ternarios",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 9: addSyntaxCompare extracción → destructuring ────────────────────

function createDestructuringSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Extracción manual → destructuring",
    "Extraer valores de objetos o arreglos directamente en variables con nombre.",
    "Bloque 1"
  );

  addSyntaxCompare(slide, SH, {
    x: 0.94,
    y: 2.16,
    w: 10.18,
    h: 3.52,
    beforeLabel: "Extracción manual",
    afterLabel: "Destructuring",
    beforeCode:
      "var usuario = {\n" +
      '  nombre: "Ana",\n' +
      "  edad: 25,\n" +
      '  ciudad: "Santiago"\n' +
      "};\n" +
      "var nombre = usuario.nombre;\n" +
      "var edad = usuario.edad;\n" +
      "var ciudad = usuario.ciudad;\n" +
      "\n" +
      'var colores = ["rojo", "verde"];\n' +
      "var primero = colores[0];\n" +
      "var segundo = colores[1];",
    afterCode:
      "const usuario = {\n" +
      '  nombre: "Ana",\n' +
      "  edad: 25,\n" +
      '  ciudad: "Santiago"\n' +
      "};\n" +
      "const { nombre, edad, ciudad } = usuario;\n" +
      "\n" +
      'const colores = ["rojo", "verde"];\n' +
      "const [primero, segundo] = colores;",
    language: "js",
    fontSize: 9.4,
    caption:
      "Muy habitual en respuestas de APIs, props de componentes y parámetros de funciones",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 10: Spread operator ────────────────────────────────────────────────

function createSpreadSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Spread operator",
    "Expande los elementos de un arreglo u objeto dentro de otro. Combina estructuras sin mutar las originales.",
    "Bloque 1"
  );

  addCodePanel(slide, SH, {
    x: 0.94,
    y: 2.16,
    w: 5.02,
    h: 3.68,
    title: "Spread en arreglos",
    code:
      "const base = [1, 2, 3];\n" +
      "const extendido = [...base, 4, 5];\n" +
      "// [1, 2, 3, 4, 5]\n" +
      "\n" +
      'const a = ["rojo", "verde"];\n' +
      'const b = ["azul"];\n' +
      "const colores = [...a, ...b];\n" +
      '// ["rojo", "verde", "azul"]\n' +
      "\n" +
      "// Copia sin referencia\n" +
      "const copia = [...base];",
    lang: "js",
    fontSize: 9.2,
    textOffsetY: 0.72,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addCodePanel(slide, SH, {
    x: 6.2,
    y: 2.16,
    w: 4.76,
    h: 3.68,
    title: "Spread en objetos",
    code:
      'const config = { tema: "oscuro", idioma: "es" };\n' +
      "\n" +
      "const configActualizada = {\n" +
      "  ...config,\n" +
      '  idioma: "en"  // sobreescribe\n' +
      "};\n" +
      "// { tema: 'oscuro', idioma: 'en' }\n" +
      "\n" +
      "// Combinar dos objetos\n" +
      "const defaults = { color: \"azul\", size: 12 };\n" +
      "const custom = { size: 16, weight: \"bold\" };\n" +
      "const final = { ...defaults, ...custom };",
    lang: "js",
    fontSize: 9.2,
    textOffsetY: 0.72,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addCenterStatement(slide, SH,
    "Combinar estructuras sin mutar las originales — patrón fundamental en React, Redux y código funcional",
    {
      x: 0.94,
      y: 5.88,
      w: 10.02,
      h: 0.52,
      fill: C.softBlue,
      line: C.softBlue,
      fontSize: 9.4,
    }
  );

  validateSlide(slide, pptx);
}

// ─── SLIDE 11: Lectura guiada ─────────────────────────────────────────────────

function createGuidedReadingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "¿Puedes leer esto sin haberlo escrito antes?",
    "Lectura de código moderno: reconocer patrones ES6+ en código real es una habilidad base para trabajar sobre código existente.",
    "Bloque 1"
  );

  const codePanelOpts = {
    x: 0.94,
    y: 2.16,
    w: 6.0,
    h: 3.72,
    title: "Carrito — ES6+ en acción",
    code:
      "const carrito = [\n" +
      '  { nombre: "Teclado", precio: 45000 },\n' +
      '  { nombre: "Mouse",   precio: 18000 },\n' +
      "];\n" +
      "\n" +
      "const total = carrito.reduce(\n" +
      "  (acc, { precio }) => acc + precio,\n" +
      "  0\n" +
      ");\n" +
      "\n" +
      "const resumen =\n" +
      "  `Total a pagar: $${total.toLocaleString('es-CL')}`;\n" +
      "\n" +
      "console.log(resumen);",
    lang: "js",
    fontSize: 9.2,
    textOffsetY: 0.72,
    topOffset: 0.08,
    titleFill: C.titleFill,
  };

  addCodePanel(slide, SH, codePanelOpts);

  // Annotations pointing out key patterns
  addCodeAnnotation(slide, SH, {
    codeX: codePanelOpts.x,
    codeY: codePanelOpts.y,
    codeW: codePanelOpts.w,
    codeH: codePanelOpts.h,
    totalLines: 14,
    lineNumber: 6,
    fontSize: 9.2,
    textOffsetY: 0.72,
    linePitch: 0.138,
    column: 3,
    length: 11,
    color: C.gold,
    side: "right",
    toX: 7.24,
    toY: 3.88,
    showHighlight: true,
    showUnderline: false,
  });

  addMiniCard(slide, SH, {
    x: 7.2,
    y: 2.54,
    w: 3.64,
    h: 0.72,
    title: "Arrow function",
    body: "El callback de reduce se escribe como arrow: (acc, { precio }) => acc + precio",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
    titleFontSize: 11,
    bodyFontSize: 8.2,
  });

  addMiniCard(slide, SH, {
    x: 7.2,
    y: 3.42,
    w: 3.64,
    h: 0.72,
    title: "Destructuring en parámetro",
    body: "{ precio } extrae directamente la propiedad del objeto en el parámetro del callback.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
    titleFontSize: 11,
    bodyFontSize: 8.2,
  });

  addMiniCard(slide, SH, {
    x: 7.2,
    y: 4.3,
    w: 3.64,
    h: 0.72,
    title: "Template literal",
    body: "` Total a pagar: $${...} ` interpola la expresión del total formateado.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 11,
    bodyFontSize: 8.2,
  });

  addCenterStatement(slide, SH, "Leer código moderno antes de escribirlo es una habilidad, no un trámite.", {
    x: 0.94,
    y: 5.96,
    w: 10.02,
    h: 0.54,
    fill: C.softNeutral,
    line: C.softNeutral,
    fontSize: 11.6,
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 12: PREGUNTAS DE ACTIVACIÓN ───────────────────────────────────────

function createBlock1QuestionsSlide() {
  const slide = pptx.addSlide();

  slide.background = { color: C.softBlue };

  addHeader(
    slide,
    "Antes de seguir",
    "Tres preguntas para verificar comprensión antes de avanzar al Bloque 2.",
    "Bloque 1"
  );

  addCard(slide, SH, {
    x: 1.08,
    y: 2.22,
    w: 9.9,
    h: 1.08,
    title: "1. ¿Qué diferencia práctica hay entre let y const?",
    body: "Piensa en reasignación y en cuál usarías por defecto al declarar cualquier variable.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
    titleFontSize: 13.8,
    bodyFontSize: 9.4,
  });

  addCard(slide, SH, {
    x: 1.08,
    y: 3.5,
    w: 9.9,
    h: 1.08,
    title: "2. ¿Cuándo usarías destructuring sobre una respuesta de API?",
    body: "Imagina que fetch devuelve { nombre, email, ciudad }. ¿Cómo lo extraerías en una sola línea?",
    fill: C.white,
    line: C.border,
    accent: C.navy,
    titleFontSize: 13.8,
    bodyFontSize: 9.4,
  });

  addCard(slide, SH, {
    x: 1.08,
    y: 4.78,
    w: 9.9,
    h: 1.08,
    title: "3. ¿Por qué evitar var en código nuevo?",
    body: "¿Qué comportamiento de var puede generar errores silenciosos que let y const no tienen?",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 13.8,
    bodyFontSize: 9.4,
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 13: HUELLA IA/AGENTES — BLOQUE 1 ───────────────────────────────────

function createBlock1AgenticSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "IA y agentes en ES6+",
    "El agente puede proponer la versión moderna. La revisión del alcance y el comportamiento es tuya.",
    "Bloque 1"
  );

  addDelegationSplit(slide, SH, {
    x: 0.94,
    y: 2.06,
    w: 10.18,
    h: 4.12,
    title: "Ayuda posible vs. validación obligatoria — ES6+ y sintaxis moderna",
    left: {
      title: "El agente puede",
      subtitle: "apoyo rápido y transformaciones sintácticas",
      items: [
        "Generar fragmentos ES6+ correctos",
        "Refactorizar var a let/const automáticamente",
        "Convertir funciones tradicionales a arrow functions",
        "Proponer destructuring para objetos de API",
        "Explicar diferencias de sintaxis con ejemplos",
      ],
      accent: C.titleFill,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene delegar",
      subtitle: "criterio, lectura y validación técnica",
      items: [
        "Revisar alcance de variables en el contexto real",
        "Verificar comportamiento de this en arrow functions",
        "Comprobar en consola que el resultado es el esperado",
        "Validar que const no bloquea mutaciones de objetos",
      ],
      accent: C.red,
      fill: C.white,
    },
    footer:
      "Si el agente refactoriza una función a arrow, revisar el uso de this antes de aceptar el cambio.",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 14: CIERRE BLOQUE 1 / PUENTE ───────────────────────────────────────

function createBlock1ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "ES6+ es el estándar del ecosistema actual",
    "No es una versión más de JavaScript: es el punto desde donde el lenguaje se volvió más legible, más seguro y más expresivo.",
    "Bloque 1"
  );

  addCenterStatement(slide, SH,
    "const · let · arrow · template literal · destructuring · spread → ya son el estándar, no opciones",
    {
      x: 0.94,
      y: 2.12,
      w: 10.18,
      h: 0.72,
      fill: C.navy,
      line: C.navy,
      fontSize: 16.4,
      color: C.white,
    }
  );

  addCard(slide, SH, {
    x: 0.94,
    y: 3.04,
    w: 4.88,
    h: 2.02,
    title: "Idea clave",
    body: "ES6+ resolvió problemas reales que existían en la sintaxis anterior. Cada construcción nueva tiene un problema concreto que vino a resolver: alcance de bloque, legibilidad, extracción directa, combinación sin mutación.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16,
    bodyFontSize: 10.2,
  });

  addCard(slide, SH, {
    x: 6.22,
    y: 3.04,
    w: 4.88,
    h: 2.02,
    title: "Lo que queda para validar",
    body: "Reconocer estos patrones en código que no escribiste. Si puedes leer un reduce con destructuring y un template literal sin detenerte, la sintaxis ya no es una barrera.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 16,
    bodyFontSize: 10.2,
  });

  // Bridge to Bloque 2
  addPanel(slide, 0.94, 5.34, 10.18, 0.78, { fill: C.navy, line: C.navy });
  slide.addText(
    "¿Cómo se organiza un proyecto que crece más allá de un solo archivo?",
    {
      x: 1.12,
      y: 5.42,
      w: 7.4,
      h: 0.36,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.4,
      color: "DCE6F2",
      margin: 0,
      valign: "mid",
    }
  );

  // Preview chip
  addChip(slide, SH, "Bloque 2 → Módulos", {
    x: 8.72,
    y: 5.5,
    w: 2.24,
    h: 0.34,
    fill: C.red,
    color: C.white,
    fontSize: 11,
    rectRadius: 0.05,
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 15: BLOQUE 2 APERTURA ─────────────────────────────────────────────

function createBlock2IntroSlide() {
  const slide = pptx.addSlide();

  slide.background = { color: C.navy };

  // AIEP mark top-right
  addMarkBox(slide, SH, logoMarkPath, {
    x: 9.62,
    y: 0.28,
    w: 0.68,
    h: 0.68,
  });

  // BLOQUE 2 chip
  addChip(slide, SH, "BLOQUE 2", {
    x: 0.88,
    y: 0.68,
    w: 1.32,
    h: 0.34,
    fill: C.red,
    color: C.white,
    fontSize: 10.6,
    rectRadius: 0.05,
  });

  // Bars motif
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);

  // Block title
  slide.addText("Módulos", {
    x: 0.88,
    y: 2.24,
    w: 8.8,
    h: 1.0,
    fontFace: TYPOGRAPHY.display,
    fontSize: 48,
    bold: true,
    color: C.white,
    margin: 0,
    valign: "mid",
  });

  // Block subtitle
  slide.addText("Organizar el código en archivos con propósito", {
    x: 0.88,
    y: 3.52,
    w: 7.6,
    h: 0.38,
    fontFace: TYPOGRAPHY.body,
    fontSize: 16,
    color: "DCE6F2",
    margin: 0,
    valign: "mid",
  });

  // Duration note
  addPanel(slide, 0.88, 5.84, 2.64, 0.4, {
    fill: "173A5A",
    line: "173A5A",
  });
  slide.addText("30 minutos · expositivo con ejemplos guiados", {
    x: 1.04,
    y: 5.92,
    w: 2.4,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.4,
    color: "A8C4E0",
    margin: 0,
    valign: "mid",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 16: EL PROBLEMA DEL ARCHIVO ÚNICO ─────────────────────────────────

function createSingleFileProblemsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Todo en un archivo: funciona hasta que no funciona",
    "A medida que el proyecto crece, un solo archivo se convierte en un obstáculo de mantenimiento.",
    "Bloque 2"
  );

  addCodePanel(slide, SH, {
    x: 0.94,
    y: 2.16,
    w: 5.56,
    h: 3.72,
    title: "app.js — sin separación",
    code:
      "// app.js — todo junto, sin separación\n" +
      "function validarEmail(email) { ... }\n" +
      "function calcularDescuento(precio, pct) { ... }\n" +
      "function renderizarTarjeta(producto) { ... }\n" +
      "function obtenerProductos() { ... }\n" +
      "function manejarFormulario(evento) { ... }",
    lang: "js",
    fontSize: 9.2,
    textOffsetY: 0.72,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addMiniCard(slide, SH, {
    x: 6.72,
    y: 2.16,
    w: 4.24,
    h: 1.1,
    title: "Difícil de navegar",
    body: "Cientos de líneas sin relación entre sí. Encontrar una función específica requiere buscar en todo el archivo.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 11.4,
    bodyFontSize: 8.4,
  });

  addMiniCard(slide, SH, {
    x: 6.72,
    y: 3.44,
    w: 4.24,
    h: 1.1,
    title: "Cambios rompen cosas no relacionadas",
    body: "Modificar validarEmail puede afectar renderizarTarjeta si comparten variables globales.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 11.4,
    bodyFontSize: 8.4,
  });

  addMiniCard(slide, SH, {
    x: 6.72,
    y: 4.72,
    w: 4.24,
    h: 1.1,
    title: "Conflictos al trabajar en equipo",
    body: "Dos personas editando el mismo archivo simultáneamente generan conflictos de versión constantes.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 11.4,
    bodyFontSize: 8.4,
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 17: QUÉ ES UN MÓDULO ───────────────────────────────────────────────

function createWhatIsModuleSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un módulo: propósito claro y control de lo que expone",
    "No es solo un archivo separado — es una unidad con responsabilidad definida.",
    "Bloque 2"
  );

  addCenterStatement(
    slide,
    SH,
    "Un módulo es un archivo con un propósito claro que controla qué expone y qué encapsula.",
    {
      x: 0.94,
      y: 2.06,
      w: 10.18,
      h: 0.84,
      fill: C.navy,
      line: C.navy,
      fontSize: 18,
      color: C.white,
    }
  );

  addCard(slide, SH, {
    x: 0.94,
    y: 3.18,
    w: 4.88,
    h: 2.64,
    title: "Sin módulos",
    body: "Todo visible y accesible desde cualquier parte del código.\n\nLas funciones conviven sin relación lógica, cualquier cambio puede afectar cualquier otra pieza, y no hay forma de saber qué depende de qué.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 15,
    bodyFontSize: 9.8,
  });

  addCard(slide, SH, {
    x: 6.24,
    y: 3.18,
    w: 4.88,
    h: 2.64,
    title: "Con módulos",
    body: "Propósito claro por archivo: validación, datos, interfaz.\n\nEncapsulación explícita: solo se expone lo que otros archivos necesitan. El resto queda privado dentro del módulo.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 15,
    bodyFontSize: 9.8,
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 18: ESTRUCTURA DE PROYECTO MODULAR ─────────────────────────────────

function createModularStructureSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Estructura de un proyecto modular",
    "Cada carpeta agrupa archivos por responsabilidad. Cada archivo sabe qué importa y qué exporta.",
    "Bloque 2"
  );

  addCodePanel(slide, SH, {
    x: 0.94,
    y: 2.16,
    w: 5.24,
    h: 3.72,
    title: "Árbol del proyecto",
    code:
      "proyecto/\n" +
      "├── utils/\n" +
      "│   └── validaciones.js\n" +
      "├── servicios/\n" +
      "│   └── productos.js\n" +
      "├── ui/\n" +
      "│   └── tarjeta.js\n" +
      "└── main.js",
    lang: "text",
    fontSize: 9.6,
    textOffsetY: 0.72,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addMiniCard(slide, SH, {
    x: 6.38,
    y: 2.16,
    w: 4.62,
    h: 0.82,
    title: "utils/ — Lógica de validación",
    body: "Funciones que verifican datos de entrada. Sin dependencias de UI.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
    titleFontSize: 11.4,
    bodyFontSize: 8.4,
  });

  addMiniCard(slide, SH, {
    x: 6.38,
    y: 3.14,
    w: 4.62,
    h: 0.82,
    title: "servicios/ — Comunicación con datos",
    body: "Funciones que obtienen o envían información. Aisladas del renderizado.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
    titleFontSize: 11.4,
    bodyFontSize: 8.4,
  });

  addMiniCard(slide, SH, {
    x: 6.38,
    y: 4.12,
    w: 4.62,
    h: 0.82,
    title: "ui/ — Renderizado",
    body: "Funciones que generan o modifican elementos visuales. Solo dependen de los datos que reciben.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
    titleFontSize: 11.4,
    bodyFontSize: 8.4,
  });

  addMiniCard(slide, SH, {
    x: 6.38,
    y: 5.1,
    w: 4.62,
    h: 0.82,
    title: "main.js — Punto de entrada",
    body: "Importa y coordina los módulos. No contiene lógica de negocio directa.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
    titleFontSize: 11.4,
    bodyFontSize: 8.4,
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 19: EXPORT NOMBRADO ────────────────────────────────────────────────

function createNamedExportSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Export nombrado: múltiples exportaciones por archivo",
    "Cualquier función o valor puede marcarse como export. Al importar, se usa el nombre exacto entre llaves.",
    "Bloque 2"
  );

  addCodePanel(slide, SH, {
    x: 0.94,
    y: 2.16,
    w: 5.32,
    h: 2.12,
    title: "validaciones.js — exportar",
    code:
      "// validaciones.js\n" +
      "export function validarEmail(email) {\n" +
      '  return email.includes("@") && email.includes(".");\n' +
      "}\n" +
      "export const LIMITE_INTENTOS = 3;",
    lang: "js",
    fontSize: 9.2,
    textOffsetY: 0.72,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addCodePanel(slide, SH, {
    x: 0.94,
    y: 4.44,
    w: 5.32,
    h: 1.68,
    title: "main.js — importar",
    code:
      "// main.js\n" +
      'import { validarEmail, LIMITE_INTENTOS } from "./utils/validaciones.js";\n' +
      'const ok = validarEmail("ana@ejemplo.com");',
    lang: "js",
    fontSize: 9.2,
    textOffsetY: 0.72,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addMiniCard(slide, SH, {
    x: 6.48,
    y: 2.16,
    w: 4.52,
    h: 1.06,
    title: "Los exports nombrados se importan con llaves { }",
    body: "El nombre en el import debe coincidir exactamente con el nombre del export.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
    titleFontSize: 11.4,
    bodyFontSize: 8.4,
  });

  addMiniCard(slide, SH, {
    x: 6.48,
    y: 3.4,
    w: 4.52,
    h: 1.06,
    title: "Un archivo puede tener múltiples exports nombrados",
    body: "Cada función o constante que se marque con export queda disponible para importarse de forma individual.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
    titleFontSize: 11.4,
    bodyFontSize: 8.4,
  });

  addMiniCard(slide, SH, {
    x: 6.48,
    y: 4.64,
    w: 4.52,
    h: 1.06,
    title: "Lo no exportado queda privado al módulo",
    body: "Las variables y funciones sin export son invisibles para el resto del proyecto.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
    titleFontSize: 11.4,
    bodyFontSize: 8.4,
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 20: EXPORT DEFAULT ─────────────────────────────────────────────────

function createDefaultExportSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Export default: una exportación principal",
    "Cuando un módulo tiene una única exportación relevante, export default simplifica la importación.",
    "Bloque 2"
  );

  addSyntaxCompare(slide, SH, {
    x: 0.94,
    y: 2.16,
    w: 10.18,
    h: 3.52,
    beforeLabel: "Export nombrado",
    afterLabel: "Export default",
    beforeCode:
      "// tarjeta.js\n" +
      "export function renderizarTarjeta(producto) {\n" +
      '  return `<div class="tarjeta">${producto.nombre}</div>`;\n' +
      "}\n" +
      "\n" +
      "// main.js\n" +
      'import { renderizarTarjeta } from "./ui/tarjeta.js";\n' +
      "// nombre obligatorio: igual al del export",
    afterCode:
      "// tarjeta.js\n" +
      "export default function renderizarTarjeta(producto) {\n" +
      '  return `<div class="tarjeta">${producto.nombre}</div>`;\n' +
      "}\n" +
      "\n" +
      "// main.js\n" +
      'import render from "./ui/tarjeta.js";\n' +
      "// nombre libre: el importador elige cómo llamarlo",
    language: "js",
    fontSize: 9.2,
    caption:
      "Default: una exportación principal sin llaves. El nombre al importar es libre.",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 21: RE-EXPORTAR DESDE ÍNDICE ───────────────────────────────────────

function createIndexBarrelSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El patrón barrel: index.js como punto de acceso",
    "Un archivo index.js agrupa los exports de una carpeta para que los consumidores no necesiten conocer la estructura interna.",
    "Bloque 2"
  );

  addCodePanel(slide, SH, {
    x: 0.94,
    y: 2.16,
    w: 5.0,
    h: 2.16,
    title: "utils/index.js — agrupar exports",
    code:
      "// utils/index.js\n" +
      'export { validarEmail } from "./validaciones.js";\n' +
      'export { formatearFecha } from "./fechas.js";\n' +
      'export { calcularDescuento } from "./calculos.js";',
    lang: "js",
    fontSize: 9.2,
    textOffsetY: 0.72,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addCodePanel(slide, SH, {
    x: 0.94,
    y: 4.48,
    w: 5.0,
    h: 1.44,
    title: "main.js — import limpio",
    code:
      "// main.js\n" +
      'import { validarEmail, formatearFecha } from "./utils/index.js";',
    lang: "js",
    fontSize: 9.2,
    textOffsetY: 0.72,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addCard(slide, SH, {
    x: 6.18,
    y: 2.16,
    w: 4.94,
    h: 3.76,
    title: "Ventajas del patrón barrel",
    body: "El consumidor solo necesita una ruta de importación, sin saber si la función viene de validaciones.js, fechas.js o calculos.js.\n\nSi se reorganiza la estructura interna de utils/, los imports en main.js no cambian.\n\nFacilita refactorizaciones internas sin impacto externo.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14,
    bodyFontSize: 9.6,
  });

  addCenterStatement(
    slide,
    SH,
    "El index.js agrupa y simplifica — los consumidores no necesitan conocer la estructura interna",
    {
      x: 0.94,
      y: 6.02,
      w: 10.18,
      h: 0.54,
      fill: C.softNeutral,
      line: C.softNeutral,
      fontSize: 10.4,
    }
  );

  validateSlide(slide, pptx);
}

// ─── SLIDE 22: MÓDULOS EN EL NAVEGADOR ───────────────────────────────────────

function createBrowserModulesSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Módulos en el navegador: type=\"module\"",
    "Sin ese atributo, el navegador no reconoce import/export y arroja un error de sintaxis.",
    "Bloque 2"
  );

  addCodePanel(slide, SH, {
    x: 0.94,
    y: 2.16,
    w: 10.18,
    h: 1.44,
    title: "index.html — activar el sistema de módulos",
    code: "<!-- index.html -->\n<script type=\"module\" src=\"main.js\"></script>",
    lang: "html",
    fontSize: 9.8,
    textOffsetY: 0.72,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addSyntaxCompare(slide, SH, {
    x: 0.94,
    y: 3.78,
    w: 10.18,
    h: 2.34,
    beforeLabel: "Sin type=\"module\" — error",
    afterLabel: "Con type=\"module\" — correcto",
    beforeCode:
      "<!-- El navegador no reconoce import/export -->\n" +
      "<script src=\"app.js\"></script>\n" +
      "\n" +
      "// Error en consola:\n" +
      "// SyntaxError: Cannot use import statement\n" +
      "// outside a module",
    afterCode:
      "<!-- Activa el sistema de módulos ES6 -->\n" +
      "<script type=\"module\" src=\"main.js\"></script>\n" +
      "\n" +
      "// import/export funcionan correctamente\n" +
      "// Los scripts se cargan en modo strict\n" +
      "// por defecto",
    language: "html",
    fontSize: 8.8,
    caption:
      "Sin type=\"module\" el navegador arroja error de sintaxis al encontrar import",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 23: ACTIVIDAD CHEQUEO ─────────────────────────────────────────────

function createBlock2ActivitySlide() {
  const slide = pptx.addSlide();

  slide.background = { color: C.softBlue };

  addHeader(
    slide,
    "¿Cómo importarías calcularTotal desde main.js?",
    "Dado el árbol de archivos, escribe la línea de import correcta.",
    "Bloque 2"
  );

  addCodePanel(slide, SH, {
    x: 0.94,
    y: 2.22,
    w: 5.02,
    h: 2.36,
    title: "Árbol de archivos",
    code:
      "src/\n" +
      "├── logica/\n" +
      "│   └── carrito.js\n" +
      "│       ← export function calcularTotal(items) { ... }\n" +
      "└── main.js",
    lang: "text",
    fontSize: 9.2,
    textOffsetY: 0.72,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addCard(slide, SH, {
    x: 6.2,
    y: 2.22,
    w: 4.76,
    h: 2.36,
    title: "Piensa antes de ver la respuesta",
    body: "¿Qué ruta necesitas? ¿Usas llaves o no? ¿Qué nombre le das a la función importada?",
    fill: C.white,
    line: C.border,
    accent: C.navy,
    titleFontSize: 14,
    bodyFontSize: 10.2,
  });

  addCodePanel(slide, SH, {
    x: 0.94,
    y: 4.76,
    w: 10.18,
    h: 1.32,
    title: "Respuesta",
    code: 'import { calcularTotal } from "./logica/carrito.js";',
    lang: "js",
    fontSize: 10.4,
    textOffsetY: 0.72,
    topOffset: 0.08,
    titleFill: C.navy,
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 24: HUELLA IA/AGENTES — BLOQUE 2 ──────────────────────────────────

function createBlock2AgenticSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "IA y agentes en la organización modular",
    "El agente puede proponer la estructura. La decisión de diseño es tuya.",
    "Bloque 2"
  );

  addDelegationSplit(slide, SH, {
    x: 0.94,
    y: 2.06,
    w: 10.18,
    h: 4.12,
    title: "Ayuda posible vs. criterio de diseño — Módulos",
    left: {
      title: "El agente puede",
      subtitle: "apoyo rápido en estructura y sintaxis",
      items: [
        "Proponer estructura de carpetas para el proyecto",
        "Generar exports e imports correctos",
        "Refactorizar un archivo único en módulos separados",
        "Crear archivos index.js con re-exportaciones",
        "Detectar imports no utilizados o rutas incorrectas",
      ],
      accent: C.titleFill,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene delegar",
      subtitle: "criterio de diseño y cohesión",
      items: [
        "Decidir qué responsabilidades van juntas en un módulo",
        "Validar que la separación tiene sentido para el dominio",
        "Evitar over-engineering en proyectos pequeños",
        "Definir qué debe quedar privado y qué se expone",
      ],
      accent: C.red,
      fill: C.white,
    },
    footer:
      "La estructura la propone el agente. La decisión de diseño es tuya.",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 25: CIERRE BLOQUE 2 / PUENTE A BLOQUE 3 ───────────────────────────

function createBlock2ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Los módulos no ordenan archivos — definen límites de responsabilidad",
    "Separar código por responsabilidad es una decisión de diseño que importa cuando el proyecto crece y cuando se trabaja en equipo.",
    "Bloque 2"
  );

  addCard(slide, SH, {
    x: 0.94,
    y: 2.12,
    w: 2.3,
    h: 2.88,
    title: "Export nombrado",
    body: "Múltiples exports por archivo. Se importan con llaves {}. El nombre debe coincidir.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13,
    bodyFontSize: 9.4,
  });

  addCard(slide, SH, {
    x: 3.42,
    y: 2.12,
    w: 2.3,
    h: 2.88,
    title: "Export default",
    body: "Una exportación principal por archivo. Se importa sin llaves y con el nombre que se elija.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13,
    bodyFontSize: 9.4,
  });

  addCard(slide, SH, {
    x: 5.9,
    y: 2.12,
    w: 2.3,
    h: 2.88,
    title: "Index barrel",
    body: "Un index.js agrupa exports de una carpeta. Los consumidores importan desde una sola ruta.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13,
    bodyFontSize: 9.4,
  });

  addCard(slide, SH, {
    x: 8.38,
    y: 2.12,
    w: 2.74,
    h: 2.88,
    title: "type=\"module\"",
    body: "Atributo requerido en el script HTML para activar el sistema de módulos ES6 en el navegador.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13,
    bodyFontSize: 9.4,
  });

  // Bridge to Bloque 3
  addPanel(slide, 0.94, 5.28, 10.18, 0.88, { fill: C.navy, line: C.navy });
  slide.addText(
    "¿Qué pasa cuando una operación tarda en completarse?",
    {
      x: 1.12,
      y: 5.36,
      w: 7.4,
      h: 0.42,
      fontFace: TYPOGRAPHY.body,
      fontSize: 13.2,
      color: "DCE6F2",
      margin: 0,
      valign: "mid",
    }
  );

  addChip(slide, SH, "Bloque 3 → Asincronía", {
    x: 8.72,
    y: 5.44,
    w: 2.28,
    h: 0.34,
    fill: C.red,
    color: C.white,
    fontSize: 11,
    rectRadius: 0.05,
  });

  validateSlide(slide, pptx);
}

// ─── MAIN ──────────────────────────────────────────────────────────────────────

function createBlock3IntroSlide() {
  const slide = pptx.addSlide();

  slide.background = { color: C.navy };

  addMarkBox(slide, SH, logoMarkPath, {
    x: 9.62,
    y: 0.28,
    w: 0.68,
    h: 0.68,
  });

  addChip(slide, SH, "BLOQUE 3", {
    x: 0.88,
    y: 0.68,
    w: 1.32,
    h: 0.34,
    fill: C.red,
    color: C.white,
    fontSize: 10.6,
    rectRadius: 0.05,
  });

  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);

  slide.addText("Asincronía", {
    x: 0.88,
    y: 2.24,
    w: 8.8,
    h: 1,
    fontFace: TYPOGRAPHY.display,
    fontSize: 46,
    bold: true,
    color: C.white,
    margin: 0,
    valign: "mid",
  });

  slide.addText("Qué pasa cuando una operación tarda en completarse", {
    x: 0.88,
    y: 3.52,
    w: 7.8,
    h: 0.38,
    fontFace: TYPOGRAPHY.body,
    fontSize: 16,
    color: "DCE6F2",
    margin: 0,
    valign: "mid",
  });

  addPanel(slide, 0.88, 5.84, 2.82, 0.4, {
    fill: "173A5A",
    line: "173A5A",
  });
  slide.addText("30 minutos · modelo mental + ejemplos", {
    x: 1.04,
    y: 5.92,
    w: 2.54,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.4,
    color: "A8C4E0",
    margin: 0,
    valign: "mid",
  });

  validateSlide(slide, pptx);
}

function createSyncVsAsyncSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Sincronía y asincronía no son estilos: son formas distintas de esperar",
    "La diferencia clave es si el programa se detiene hasta tener el resultado o si deja el trabajo pendiente mientras sigue ejecutando otras líneas.",
    "Bloque 3"
  );

  addSyntaxCompare(slide, SH, {
    x: 0.94,
    y: 2.06,
    w: 10.18,
    h: 2.86,
    beforeLabel: "Sincrónico — todo espera",
    afterLabel: "Asincrónico — el trabajo queda pendiente",
    beforeCode:
      "const datos = leerArchivo();\n" +
      "console.log(datos);\n" +
      "render(datos);",
    afterCode:
      'leerArchivo((datos) => {\n' +
      '  console.log(datos);\n' +
      '  render(datos);\n' +
      '});\n' +
      'console.log("la interfaz sigue disponible");',
    language: "js",
    fontSize: 9.2,
    caption: "En asincronía el resultado no está listo inmediatamente, por eso el flujo cambia.",
  });

  addCenterStatement(slide, SH, "Asincronía no significa caos: significa que el programa coordina esperas sin congelar toda la ejecución.", {
    x: 0.94,
    y: 5.22,
    w: 10.18,
    h: 0.72,
    fill: C.navy,
    line: C.navy,
    fontSize: 15.2,
    color: C.white,
  });

  validateSlide(slide, pptx);
}

function createSingleThreadSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "JavaScript ejecuta en una sola hebra, pero el navegador no trabaja solo con esa hebra",
    "La llamada JS corre en el call stack. Timers, red y otras esperas las gestiona el entorno hasta poder devolver el callback.",
    "Bloque 3"
  );

  addCard(slide, SH, {
    x: 0.94,
    y: 2.14,
    w: 3.12,
    h: 3.44,
    title: "Call stack",
    body: "Aquí se ejecuta el código JavaScript línea por línea. Si una tarea bloquea esta hebra, la interfaz se siente pesada o congelada.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 15,
    bodyFontSize: 10,
  });

  addCard(slide, SH, {
    x: 4.38,
    y: 2.14,
    w: 3.12,
    h: 3.44,
    title: "Entorno del navegador",
    body: "Timers, eventos y peticiones de red pueden quedar gestionados fuera del stack principal mientras la app sigue respondiendo.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 15,
    bodyFontSize: 10,
  });

  addCard(slide, SH, {
    x: 7.82,
    y: 2.14,
    w: 3.3,
    h: 3.44,
    title: "Lo importante",
    body: "No todo ocurre al mismo tiempo. Lo que hace el motor es coordinar cuándo una tarea vuelve a entrar al stack para ejecutarse.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 15,
    bodyFontSize: 10,
  });

  validateSlide(slide, pptx);
}

function createEventLoopSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El event loop decide cuándo una tarea pendiente puede volver a ejecutarse",
    "La clave no es memorizar nombres aislados, sino leer la secuencia completa de una operación asíncrona.",
    "Bloque 3"
  );

  addStageChain(slide, SH, {
    x: 0.94,
    y: 2.08,
    w: 10.18,
    h: 4.18,
    title: "Recorrido típico de una operación asíncrona",
    compact: true,
    stages: [
      { step: "1", title: "JS", body: "El código lanza setTimeout, fetch o un listener.", accent: C.red },
      { step: "2", title: "Web API", body: "El entorno toma la tarea externa fuera del stack.", accent: C.gold },
      { step: "3", title: "Espera", body: "La operación sigue su curso mientras JS continúa con otras líneas.", accent: C.softBlue },
      { step: "4", title: "Cola", body: "Cuando termina, el callback queda esperando turno.", accent: C.warm },
      { step: "5", title: "Event loop", body: "Revisa si el stack está libre para devolver la tarea.", accent: C.navy, fill: C.navy, tone: "dark" },
      { step: "6", title: "Stack", body: "Recién ahí el callback vuelve a ejecutarse en JavaScript.", accent: C.red },
    ],
    notes: [
      { title: "Idea clave", body: "La tarea no entra apenas termina; entra cuando el stack queda libre.", accent: C.gold },
      { title: "Error común", body: "Confundir 'terminó' con 'ya se ejecutó el callback'.", accent: C.red },
    ],
  });

  validateSlide(slide, pptx);
}

function createExecutionOrderSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Orden de ejecución: primero el stack, después la cola",
    "Un timer de 0 ms no se adelanta mágicamente. Solo queda listo para entrar cuando JavaScript termina lo que ya está corriendo.",
    "Bloque 3"
  );

  addCodePanel(slide, SH, {
    x: 0.94,
    y: 2.14,
    w: 5.24,
    h: 3.82,
    title: "Predice la salida",
    code:
      'console.log("inicio");\n' +
      'setTimeout(() => {\n' +
      '  console.log("timer");\n' +
      '}, 0);\n' +
      'console.log("fin");',
    lang: "js",
    fontSize: 9.2,
    textOffsetY: 0.72,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addMiniCard(slide, SH, {
    x: 6.46,
    y: 2.22,
    w: 4.48,
    h: 1.12,
    title: "Salida correcta",
    body: "inicio → fin → timer",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
    titleFontSize: 12.2,
    bodyFontSize: 9.6,
  });

  addMiniCard(slide, SH, {
    x: 6.46,
    y: 3.58,
    w: 4.48,
    h: 1.12,
    title: "Por qué",
    body: "El callback queda en espera. Primero termina el código que ya estaba ocupando el stack.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
    titleFontSize: 12.2,
    bodyFontSize: 8.8,
  });

  addMiniCard(slide, SH, {
    x: 6.46,
    y: 4.94,
    w: 4.48,
    h: 1.12,
    title: "Error frecuente",
    body: "Creer que '0 ms' significa 'ejecución inmediata'. No significa eso.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 12.2,
    bodyFontSize: 8.8,
  });

  validateSlide(slide, pptx);
}

function createCallbackHellSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Los callbacks resolvieron la espera, pero complicaron la lectura",
    "Antes de Promises y async/await, encadenar operaciones asíncronas solía derivar en estructuras difíciles de seguir y depurar.",
    "Bloque 3"
  );

  addCodePanel(slide, SH, {
    x: 0.94,
    y: 2.1,
    w: 5.44,
    h: 3.98,
    title: "Callback hell",
    code:
      'login(usuario, clave, (sesion) => {\n' +
      '  obtenerPerfil(sesion.id, (perfil) => {\n' +
      '    obtenerPermisos(perfil.rol, (permisos) => {\n' +
      '      renderizarDashboard(permisos);\n' +
      '    });\n' +
      '  });\n' +
      '});',
    lang: "js",
    fontSize: 8.9,
    textOffsetY: 0.72,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addCard(slide, SH, {
    x: 6.68,
    y: 2.12,
    w: 4.42,
    h: 1.76,
    title: "Qué sí resolvía",
    body: "Permitía continuar el flujo cuando una operación terminaba después, sin bloquear toda la aplicación.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13.4,
    bodyFontSize: 9.4,
  });

  addCard(slide, SH, {
    x: 6.68,
    y: 4.08,
    w: 4.42,
    h: 1.98,
    title: "Dónde empezaba el problema",
    body: "A medida que las operaciones se anidaban, leer el flujo completo y manejar errores se volvía cada vez más difícil.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 13.4,
    bodyFontSize: 9.4,
  });

  validateSlide(slide, pptx);
}

function createBlock3ActivitySlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.softBlue };

  addHeader(
    slide,
    "Chequeo rápido: ¿en qué orden se ejecuta esto?",
    "El objetivo no es memorizar trucos, sino poder seguir mentalmente el flujo antes de ejecutar.",
    "Bloque 3"
  );

  addCodePanel(slide, SH, {
    x: 0.94,
    y: 2.16,
    w: 5.18,
    h: 2.72,
    title: "Ejercicio",
    code:
      'console.log("A");\n' +
      'setTimeout(() => console.log("B"), 0);\n' +
      'console.log("C");',
    lang: "js",
    fontSize: 10,
    textOffsetY: 0.72,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addCard(slide, SH, {
    x: 6.34,
    y: 2.16,
    w: 4.76,
    h: 1.44,
    title: "Respuesta",
    body: "A → C → B",
    fill: C.white,
    line: C.border,
    accent: C.navy,
    titleFontSize: 14,
    bodyFontSize: 14,
  });

  addCard(slide, SH, {
    x: 6.34,
    y: 3.86,
    w: 4.76,
    h: 2.02,
    title: "Razón técnica",
    body: "El timer no interrumpe el stack. Su callback queda listo y entra recién cuando JavaScript termina las instrucciones sincrónicas actuales.",
    fill: C.white,
    line: C.border,
    accent: C.gold,
    titleFontSize: 14,
    bodyFontSize: 9.6,
  });

  validateSlide(slide, pptx);
}

function createBlock3AgenticSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "IA y agentes frente a la asincronía",
    "El agente puede escribir la sintaxis. Tú necesitas entender el orden de ejecución.",
    "Bloque 3"
  );

  addDelegationSplit(slide, SH, {
    x: 0.94,
    y: 2.08,
    w: 10.18,
    h: 4.16,
    title: "Ayuda posible vs. criterio técnico — Asincronía",
    left: {
      title: "El agente puede",
      subtitle: "apoyo útil para partir más rápido",
      items: [
        "Explicar qué hace setTimeout o un listener",
        "Proponer ejemplos pequeños para observar el orden",
        "Transformar un callback en Promise o async/await",
        "Ayudar a comentar un flujo paso a paso",
      ],
      accent: C.titleFill,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene delegar",
      subtitle: "comprensión del flujo real",
      items: [
        "Confiar en que el orden de ejecución es correcto sin probarlo",
        "Leer 0 ms como ejecución inmediata",
        "Diagnosticar asincronía sin correr el ejemplo y mirar la salida",
        "Confundir 'terminó la tarea' con 'ya corrió el callback'",
      ],
      accent: C.red,
      fill: C.white,
    },
    footer:
      "El agente acelera la explicación. La comprensión del flujo real sigue dependiendo de ti.",
  });

  validateSlide(slide, pptx);
}

function createBlock3ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Asincronía es coordinación del tiempo, no ejecución mágica",
    "Entender stack, espera, cola y event loop prepara el terreno para leer Promises y async/await sin confundir sintaxis con mecanismo.",
    "Bloque 3"
  );

  addCard(slide, SH, {
    x: 0.94,
    y: 2.12,
    w: 2.3,
    h: 2.92,
    title: "Call stack",
    body: "Donde JavaScript ejecuta lo que está corriendo ahora mismo.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13,
    bodyFontSize: 9.4,
  });

  addCard(slide, SH, {
    x: 3.42,
    y: 2.12,
    w: 2.3,
    h: 2.92,
    title: "Web APIs",
    body: "El entorno se hace cargo de timers, eventos o red mientras el stack sigue libre.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 13,
    bodyFontSize: 9.4,
  });

  addCard(slide, SH, {
    x: 5.9,
    y: 2.12,
    w: 2.3,
    h: 2.92,
    title: "Cola",
    body: "Los callbacks listos esperan su turno hasta que JavaScript pueda retomarlos.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13,
    bodyFontSize: 9.4,
  });

  addCard(slide, SH, {
    x: 8.38,
    y: 2.12,
    w: 2.74,
    h: 2.92,
    title: "Event loop",
    body: "Observa cuándo el stack queda libre y devuelve la tarea pendiente para ejecutarla.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 13,
    bodyFontSize: 9.4,
  });

  addPanel(slide, 0.94, 5.28, 10.18, 0.88, { fill: C.navy, line: C.navy });
  slide.addText(
    "¿Cómo se lee este flujo sin caer en callback hell?",
    {
      x: 1.12,
      y: 5.36,
      w: 7.2,
      h: 0.42,
      fontFace: TYPOGRAPHY.body,
      fontSize: 13.2,
      color: "DCE6F2",
      margin: 0,
      valign: "mid",
    }
  );

  addChip(slide, SH, "Bloque 4 → Promises", {
    x: 8.72,
    y: 5.44,
    w: 2.24,
    h: 0.34,
    fill: C.red,
    color: C.white,
    fontSize: 11,
    rectRadius: 0.05,
  });

  validateSlide(slide, pptx);
}
function createBlock4IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };

  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 4", {
    x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6, rectRadius: 0.05,
  });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);

  slide.addText("Promises y async/await", {
    x: 0.88, y: 2.18, w: 9.4, h: 1.0,
    fontFace: TYPOGRAPHY.display, fontSize: 39, bold: true, color: C.white, margin: 0, valign: "mid",
  });
  slide.addText("La forma moderna de leer y manejar flujos asíncronos", {
    x: 0.88, y: 3.44, w: 8.2, h: 0.38,
    fontFace: TYPOGRAPHY.body, fontSize: 16, color: "DCE6F2", margin: 0, valign: "mid",
  });

  addPanel(slide, 0.88, 5.84, 3.14, 0.4, { fill: "173A5A", line: "173A5A" });
  slide.addText("30 minutos · flujo + errores + fetch", {
    x: 1.04, y: 5.92, w: 2.88, h: 0.22,
    fontFace: TYPOGRAPHY.body, fontSize: 9.4, color: "A8C4E0", margin: 0, valign: "mid",
  });

  validateSlide(slide, pptx);
}

function createWhatIsPromiseSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "Una Promise representa un valor que todavía no está disponible",
    "No guarda el valor final de inmediato: modela una operación que puede resolverse después con éxito o error.",
    "Bloque 4"
  );

  addCenterStatement(slide, SH,
    "Promise = una promesa de resultado futuro, no el resultado mismo.",
    { x: 0.94, y: 2.06, w: 10.18, h: 0.82, fill: C.navy, line: C.navy, fontSize: 18, color: C.white }
  );

  addCard(slide, SH, {
    x: 0.94, y: 3.14, w: 4.88, h: 2.64,
    title: "Qué resuelve",
    body: "Permite describir una operación asíncrona sin anidar callbacks desde el primer paso. El flujo queda encadenado y el manejo de error se vuelve más legible.",
    fill: C.softBlue, line: C.softBlue, accent: C.navy, titleFontSize: 15, bodyFontSize: 10,
  });
  addCard(slide, SH, {
    x: 6.24, y: 3.14, w: 4.88, h: 2.64,
    title: "Qué no significa",
    body: "No significa ejecución instantánea ni paralelismo mágico. Sigue existiendo una espera; solo cambia la forma de representarla y leerla.",
    fill: C.paleRed, line: C.paleRed, accent: C.red, titleFontSize: 15, bodyFontSize: 10,
  });

  validateSlide(slide, pptx);
}

function createPromiseStatesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "Toda Promise pasa por estados bien definidos",
    "Conviene nombrarlos porque ayudan a leer qué está ocurriendo antes de que aparezcan then, catch o await.",
    "Bloque 4"
  );

  addStageChain(slide, SH, {
    x: 0.94, y: 2.1, w: 10.18, h: 3.98,
    title: "Estados que importan",
    compact: true,
    stages: [
      { step: "1", title: "pending", body: "La operación sigue en curso. Aún no hay resultado final.", accent: C.gold },
      { step: "2", title: "fulfilled", body: "La Promise terminó con éxito y entrega un valor.", accent: C.navy, fill: C.softBlue },
      { step: "3", title: "rejected", body: "La Promise falló y ahora tiene un motivo de error.", accent: C.red, fill: C.paleRed },
    ],
    notes: [
      { title: "Importante", body: "Una Promise no vuelve a pending después de resolverse o rechazarse.", accent: C.gold },
    ],
  });

  validateSlide(slide, pptx);
}

function createThenCatchFinallySlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "then, catch y finally son reacciones al resultado de una Promise",
    "Primero apareció este patrón. Sigue siendo válido y todavía conviene saber leerlo aunque luego prefiramos async/await.",
    "Bloque 4"
  );

  addCodePanel(slide, SH, {
    x: 0.94, y: 2.14, w: 5.66, h: 3.88,
    title: "Patrón base con fetch",
    code:
      'fetch("https://api.ejemplo.com/usuarios/1")\n' +
      '  .then((respuesta) => respuesta.json())\n' +
      '  .then((datos) => {\n' +
      '    console.log(datos.nombre);\n' +
      '  })\n' +
      '  .catch((error) => {\n' +
      '    console.error(error);\n' +
      '  })\n' +
      '  .finally(() => console.log("fin"));',
    lang: "js", fontSize: 8.8, textOffsetY: 0.72, topOffset: 0.08, titleFill: C.titleFill,
  });

  addMiniCard(slide, SH, {
    x: 6.84, y: 2.22, w: 4.18, h: 1.02,
    title: "then",
    body: "Recibe el valor cuando la Promise se resuelve correctamente.",
    accent: C.navy, fill: C.softBlue, line: C.softBlue, titleFontSize: 12, bodyFontSize: 8.8,
  });
  addMiniCard(slide, SH, {
    x: 6.84, y: 3.48, w: 4.18, h: 1.02,
    title: "catch",
    body: "Recibe el error si la Promise se rechaza o algo lanza excepción en la cadena.",
    accent: C.red, fill: C.paleRed, line: C.paleRed, titleFontSize: 12, bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 6.84, y: 4.74, w: 4.18, h: 1.02,
    title: "finally",
    body: "Corre siempre al final, independiente del resultado.",
    accent: C.gold, fill: C.warm, line: C.warm, titleFontSize: 12, bodyFontSize: 8.8,
  });

  validateSlide(slide, pptx);
}

function createPromiseChainSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "Encadenar then permite transformar el resultado paso a paso",
    "Cada then recibe lo que devolvió el paso anterior. Eso ordena el flujo mejor que anidar callbacks uno dentro de otro.",
    "Bloque 4"
  );

  addCodePanel(slide, SH, {
    x: 0.94, y: 2.14, w: 5.22, h: 3.82,
    title: "Transformación encadenada",
    code:
      'fetch("/api/productos")\n' +
      '  .then((r) => r.json())\n' +
      '  .then((productos) => productos.slice(0, 3))\n' +
      '  .then((destacados) => {\n' +
      '    render(destacados);\n' +
      '  });',
    lang: "js", fontSize: 9.1, textOffsetY: 0.72, topOffset: 0.08, titleFill: C.titleFill,
  });

  addCard(slide, SH, {
    x: 6.42, y: 2.18, w: 4.7, h: 3.74,
    title: "Lectura correcta",
    body: "1. Llega la respuesta.\n2. Se convierte a JSON.\n3. Se filtran los datos.\n4. Se renderiza lo necesario.\n\nEl valor va cambiando de forma a medida que avanza la cadena.",
    fill: C.white, line: C.border, accent: C.navy, titleFontSize: 14, bodyFontSize: 9.8,
  });

  validateSlide(slide, pptx);
}

function createFetchReturnsPromiseSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "fetch devuelve una Promise; respuesta.json también",
    "Ese detalle explica por qué en async/await suelen aparecer dos await distintos cuando trabajamos con APIs.",
    "Bloque 4"
  );

  addStageChain(slide, SH, {
    x: 0.94, y: 2.08, w: 10.18, h: 4.06,
    title: "Secuencia mínima con fetch",
    compact: true,
    stages: [
      { step: "1", title: "fetch", body: "Devuelve una Promise que resuelve a un objeto Response.", accent: C.navy },
      { step: "2", title: "Response", body: "Todavía no son tus datos; es la respuesta HTTP completa.", accent: C.gold },
      { step: "3", title: "json()", body: "También devuelve una Promise porque parsear el cuerpo es otro paso.", accent: C.softBlue },
      { step: "4", title: "datos", body: "Recién aquí tienes el objeto utilizable en la app.", accent: C.red },
    ],
    notes: [
      { title: "Por eso", body: "Con async/await suele aparecer await para fetch y otro await para response.json().", accent: C.gold },
    ],
  });

  validateSlide(slide, pptx);
}
function createAsyncAwaitIntroSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "async/await no reemplaza Promises: las vuelve más legibles",
    "Debajo sigue habiendo Promises. Lo que cambia es la forma de escribir y leer el flujo.",
    "Bloque 4"
  );

  addSyntaxCompare(slide, SH, {
    x: 0.94, y: 2.08, w: 10.18, h: 3.94,
    beforeLabel: "Con then/catch",
    afterLabel: "Con async/await",
    beforeCode:
      'fetch("/api/usuario/1")\n' +
      '  .then((r) => r.json())\n' +
      '  .then((datos) => {\n' +
      '    console.log(datos.nombre);\n' +
      '  })\n' +
      '  .catch((error) => console.error(error));',
    afterCode:
      'async function cargarUsuario() {\n' +
      '  try {\n' +
      '    const r = await fetch("/api/usuario/1");\n' +
      '    const datos = await r.json();\n' +
      '    console.log(datos.nombre);\n' +
      '  } catch (error) {\n' +
      '    console.error(error);\n' +
      '  }\n' +
      '}',
    language: "js",
    fontSize: 8.5,
    caption: "Mismo mecanismo, distinta legibilidad.",
  });

  validateSlide(slide, pptx);
}

function createAsyncReturnsPromiseSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "Toda función async devuelve una Promise, incluso si parece devolver un valor normal",
    "Eso importa para leer llamadas encadenadas, componer funciones asíncronas y entender por qué await solo puede usarse en contexto async.",
    "Bloque 4"
  );

  addCodePanel(slide, SH, {
    x: 0.94, y: 2.14, w: 5.16, h: 3.74,
    title: "Una función async devuelve Promise",
    code:
      'async function obtenerNombre() {\n' +
      '  return "Ana";\n' +
      '}\n\n' +
      'const resultado = obtenerNombre();\n' +
      'console.log(resultado); // Promise',
    lang: "js", fontSize: 9.3, textOffsetY: 0.72, topOffset: 0.08, titleFill: C.titleFill,
  });

  addCard(slide, SH, {
    x: 6.34, y: 2.18, w: 4.76, h: 3.7,
    title: "Idea práctica",
    body: "Una función async siempre envuelve su retorno en una Promise. Por eso otra función puede esperar su resultado con await o reaccionar con then.",
    fill: C.softBlue, line: C.softBlue, accent: C.navy, titleFontSize: 14, bodyFontSize: 10,
  });

  validateSlide(slide, pptx);
}

function createAwaitLocalPauseSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "await pausa esa función, no congela todo JavaScript",
    "Es una pausa local del flujo dentro de una función async. El entorno puede seguir procesando otras tareas mientras tanto.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 0.94, y: 2.14, w: 4.88, h: 2.88,
    title: "Lo correcto",
    body: "await detiene temporalmente la continuación de esa función async hasta que la Promise se resuelve o rechaza.",
    fill: C.softBlue, line: C.softBlue, accent: C.navy, titleFontSize: 15, bodyFontSize: 10,
  });

  addCard(slide, SH, {
    x: 6.24, y: 2.14, w: 4.88, h: 2.88,
    title: "Lo incorrecto",
    body: "No significa que se congeló la interfaz ni que el navegador quedó detenido esperando. Esa es una confusión frecuente.",
    fill: C.paleRed, line: C.paleRed, accent: C.red, titleFontSize: 15, bodyFontSize: 10,
  });

  addCenterStatement(slide, SH, "await mejora la lectura del flujo; no cambia el hecho de que seguimos trabajando sobre asincronía.", {
    x: 0.94, y: 5.26, w: 10.18, h: 0.72, fill: C.navy, line: C.navy, fontSize: 15.2, color: C.white,
  });

  validateSlide(slide, pptx);
}

function createTryCatchSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "Con async/await, el manejo de errores se lee con try/catch",
    "La sintaxis se parece a código sincrónico, pero el principio sigue siendo el mismo: decidir qué haces cuando algo falla.",
    "Bloque 4"
  );

  addCodePanel(slide, SH, {
    x: 0.94, y: 2.14, w: 5.38, h: 3.88,
    title: "Patrón base",
    code:
      'async function cargarUsuario() {\n' +
      '  try {\n' +
      '    const respuesta = await fetch("/api/usuario/1");\n' +
      '    const datos = await respuesta.json();\n' +
      '    return datos;\n' +
      '  } catch (error) {\n' +
      '    console.error(error.message);\n' +
      '    return null;\n' +
      '  }\n' +
      '}',
    lang: "js", fontSize: 8.7, textOffsetY: 0.72, topOffset: 0.08, titleFill: C.titleFill,
  });

  addCard(slide, SH, {
    x: 6.56, y: 2.2, w: 4.54, h: 3.8,
    title: "Qué conviene mirar",
    body: "1. Qué puede fallar dentro del try.\n2. Qué mensaje útil entrega el catch.\n3. Qué devuelve la función si hubo error.\n4. Si el resto del código sabe tratar ese caso.",
    fill: C.white, line: C.border, accent: C.gold, titleFontSize: 14, bodyFontSize: 9.6,
  });

  validateSlide(slide, pptx);
}

function createResponseOkSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "fetch no rechaza la Promise por un 404 o 500: por eso hay que revisar response.ok",
    "Este es uno de los errores silenciosos más comunes cuando alguien aprendió la sintaxis pero todavía no revisa bien la semántica de la respuesta HTTP.",
    "Bloque 4"
  );

  addMythRealityGrid(slide, SH, {
    x: 0.94, y: 2.08, w: 10.18, h: 4.2,
    columns: 2,
    title: "Error común de lectura",
    entries: [
      {
        badge: "Error",
        myth: "Si la API responde 404, catch corre automáticamente.",
        reality: "fetch solo rechaza por problemas de red. Un 404 sigue llegando como Response y debes revisarlo manualmente.",
        accent: C.red,
        fill: C.paleRed,
      },
      {
        badge: "Clave",
        myth: "Basta con await fetch(...).",
        reality: "Después de await fetch(...) todavía conviene validar response.ok antes de asumir que todo salió bien.",
        accent: C.navy,
        fill: C.softBlue,
        badgeFill: C.softBlue,
      },
    ],
    footer: "Sintaxis correcta no garantiza manejo correcto de errores HTTP.",
  });

  validateSlide(slide, pptx);
}

function createCompleteFetchExampleSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "Un ejemplo completo: fetch, verificación, JSON y salida útil",
    "Este patrón será la base de la clase siguiente cuando el dato ya no quede solo en consola y empiece a alimentar interfaz y formularios.",
    "Bloque 4"
  );

  addCodePanel(slide, SH, {
    x: 0.94, y: 2.1, w: 10.18, h: 3.96,
    title: "Patrón completo con async/await",
    code:
      'async function cargarProductos() {\n' +
      '  try {\n' +
      '    const respuesta = await fetch("https://fakestoreapi.com/products?limit=3");\n' +
      '    if (!respuesta.ok) {\n' +
      '      throw new Error(`HTTP ${respuesta.status}`);\n' +
      '    }\n' +
      '    const productos = await respuesta.json();\n' +
      '    productos.forEach((p) => console.log(p.title));\n' +
      '  } catch (error) {\n' +
      '    console.error("No se pudo cargar:", error.message);\n' +
      '  }\n' +
      '}\n\n' +
      'cargarProductos();',
    lang: "js", fontSize: 8.4, textOffsetY: 0.72, topOffset: 0.08, titleFill: C.titleFill,
  });

  validateSlide(slide, pptx);
}
function createTwoAwaitsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "¿Por qué aparecen dos await?",
    "Este detalle ayuda mucho a dejar de copiar patrones mecánicamente y empezar a leer lo que está pasando en cada línea.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 0.94, y: 2.14, w: 4.88, h: 3.48,
    title: "Primer await",
    body: "await fetch(...) espera la Promise que entrega un objeto Response. Aquí todavía no tienes tus datos finales.",
    fill: C.softBlue, line: C.softBlue, accent: C.navy, titleFontSize: 15, bodyFontSize: 10,
  });
  addCard(slide, SH, {
    x: 6.24, y: 2.14, w: 4.88, h: 3.48,
    title: "Segundo await",
    body: "await respuesta.json() espera el parseo del cuerpo para obtener el objeto JavaScript usable dentro de la aplicación.",
    fill: C.warm, line: C.warm, accent: C.gold, titleFontSize: 15, bodyFontSize: 10,
  });

  validateSlide(slide, pptx);
}

function createAsyncCommonErrorsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "Errores comunes con async/await que conviene detectar temprano",
    "No son errores extraños: aparecen justamente cuando ya se entiende la sintaxis superficial pero todavía no se lee completo el flujo.",
    "Bloque 4"
  );

  addMiniCard(slide, SH, {
    x: 0.94, y: 2.16, w: 4.94, h: 1.08,
    title: "Olvidar await",
    body: "Se termina trabajando con una Promise en vez del dato resuelto.",
    accent: C.red, fill: C.paleRed, line: C.paleRed, titleFontSize: 12, bodyFontSize: 8.8,
  });
  addMiniCard(slide, SH, {
    x: 6.18, y: 2.16, w: 4.94, h: 1.08,
    title: "No revisar response.ok",
    body: "La función parece funcionar, pero falla silenciosamente ante un 404 o 500.",
    accent: C.red, fill: C.paleRed, line: C.paleRed, titleFontSize: 12, bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 0.94, y: 3.54, w: 4.94, h: 1.08,
    title: "Usar await fuera de async",
    body: "El motor marca error porque no existe contexto asíncrono válido.",
    accent: C.gold, fill: C.warm, line: C.warm, titleFontSize: 12, bodyFontSize: 8.8,
  });
  addMiniCard(slide, SH, {
    x: 6.18, y: 3.54, w: 4.94, h: 1.08,
    title: "Capturar error pero no decidir nada",
    body: "El catch existe, pero la función no devuelve nada útil ni informa bien qué pasó.",
    accent: C.gold, fill: C.warm, line: C.warm, titleFontSize: 12, bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 0.94, y: 4.92, w: 10.18, h: 1.08,
    title: "Error de fondo",
    body: "Creer que async/await resuelve por sí solo la lógica del flujo. La sintaxis ayuda; el criterio sigue siendo tuyo.",
    accent: C.navy, fill: C.softBlue, line: C.softBlue, titleFontSize: 12.2, bodyFontSize: 8.8,
  });

  validateSlide(slide, pptx);
}

function createCallbacksVsPromisesVsAwaitSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "Callbacks, Promises y async/await: tres formas de mirar el mismo problema",
    "No son tres mundos distintos. Son capas históricas sobre el mismo desafío: esperar, continuar y manejar errores sin perder legibilidad.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 0.94, y: 2.14, w: 3.12, h: 3.72,
    title: "Callbacks",
    body: "Primera solución práctica. Funcionan, pero anidar varios pasos complica la lectura y el manejo de errores.",
    fill: C.white, line: C.border, accent: C.red, titleFontSize: 14, bodyFontSize: 10,
  });
  addCard(slide, SH, {
    x: 4.46, y: 2.14, w: 3.12, h: 3.72,
    title: "Promises",
    body: "Ordenan mejor el flujo y permiten encadenar pasos con then/catch/finally.",
    fill: C.softBlue, line: C.softBlue, accent: C.navy, titleFontSize: 14, bodyFontSize: 10,
  });
  addCard(slide, SH, {
    x: 7.98, y: 2.14, w: 3.12, h: 3.72,
    title: "async/await",
    body: "Hace más legible la misma lógica de Promises y permite leer el flujo como si fuera casi lineal.",
    fill: C.warm, line: C.warm, accent: C.gold, titleFontSize: 14, bodyFontSize: 10,
  });

  validateSlide(slide, pptx);
}

function createBlock4ActivitySlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.softBlue };
  addHeader(slide,
    "Chequeo rápido: ¿cuál de estas líneas todavía no entrega el dato final?",
    "La idea es distinguir Response, Promise y dato utilizable antes de seguir a la siguiente clase.",
    "Bloque 4"
  );

  addCodePanel(slide, SH, {
    x: 0.94, y: 2.16, w: 5.12, h: 2.94,
    title: "Ejemplo",
    code:
      'const respuesta = await fetch("/api/usuario/1");\n' +
      'const datos = await respuesta.json();\n' +
      'console.log(datos.nombre);',
    lang: "js", fontSize: 10, textOffsetY: 0.72, topOffset: 0.08, titleFill: C.titleFill,
  });

  addCard(slide, SH, {
    x: 6.32, y: 2.2, w: 4.78, h: 1.22,
    title: "Respuesta",
    body: "La primera línea todavía entrega un Response, no el dato final de negocio.",
    fill: C.white, line: C.border, accent: C.navy, titleFontSize: 14, bodyFontSize: 9.6,
  });
  addCard(slide, SH, {
    x: 6.32, y: 3.68, w: 4.78, h: 1.42,
    title: "Qué importa aquí",
    body: "Entender qué tipo de valor tienes en cada paso, no repetir await como gesto automático.",
    fill: C.white, line: C.border, accent: C.gold, titleFontSize: 14, bodyFontSize: 9.4,
  });

  validateSlide(slide, pptx);
}

function createBlock4AgenticSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "IA y agentes en Promises y async/await",
    "Aquí el agente acelera mucho la escritura, pero eso no reemplaza verificar si el flujo realmente maneja bien éxito, error y tipos de respuesta.",
    "Bloque 4"
  );

  addDelegationSplit(slide, SH, {
    x: 0.94, y: 2.08, w: 10.18, h: 4.16,
    title: "Ayuda posible vs. criterio técnico — Async",
    left: {
      title: "El agente puede",
      subtitle: "generación rápida y refactorización",
      items: [
        "Convertir callbacks a Promises o async/await",
        "Escribir un patrón base con try/catch",
        "Sugerir una llamada fetch completa",
        "Explicar para qué sirve response.ok",
      ],
      accent: C.titleFill,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene delegar",
      subtitle: "lectura real del flujo y errores",
      items: [
        "Dar por correcto el manejo HTTP sin probarlo",
        "Confiar en que await está donde corresponde solo porque compila",
        "Ignorar qué devuelve cada línea del flujo",
        "Suponer que el catch cubre todos los casos sin revisarlo",
      ],
      accent: C.red,
      fill: C.white,
    },
    footer: "La IA escribe rápido. El criterio técnico sigue estando en cómo lees el flujo y manejas el error.",
  });

  validateSlide(slide, pptx);
}

function createBlock4QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "Preguntas de fijación antes de cerrar el bloque",
    "Si estas preguntas ya te hacen sentido, la base para formularios y APIs reales está quedando instalada.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 0.94, y: 2.2, w: 10.18, h: 3.74,
    title: "Qué deberías poder responder",
    body: "1. ¿Qué diferencia hay entre Response y datos parseados?\n\n2. ¿Por qué una función async devuelve Promise aunque parezca retornar un valor simple?\n\n3. ¿Por qué catch no siempre detecta un 404 por sí solo?\n\n4. ¿Qué mejora de lectura ofrece async/await frente a then/catch?",
    fill: C.white, line: C.border, accent: C.navy, titleFontSize: 15, bodyFontSize: 11,
  });

  validateSlide(slide, pptx);
}

function createBlock4ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "Promises y async/await no cambian la asincronía: la vuelven más legible",
    "El valor de este bloque está en leer mejor el flujo, entender qué devuelve cada paso y manejar errores con criterio antes de pasar a APIs aplicadas.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 0.94, y: 2.12, w: 2.3, h: 2.92,
    title: "Promise",
    body: "Representa un valor futuro que puede resolverse o fallar.",
    fill: C.softBlue, line: C.softBlue, accent: C.navy, titleFontSize: 13, bodyFontSize: 9.4,
  });
  addCard(slide, SH, {
    x: 3.42, y: 2.12, w: 2.3, h: 2.92,
    title: "then/catch",
    body: "Permiten reaccionar al éxito o error y encadenar transformaciones.",
    fill: C.softBlue, line: C.softBlue, accent: C.navy, titleFontSize: 13, bodyFontSize: 9.4,
  });
  addCard(slide, SH, {
    x: 5.9, y: 2.12, w: 2.3, h: 2.92,
    title: "async/await",
    body: "Escribe el mismo mecanismo con una lectura más limpia y casi lineal.",
    fill: C.warm, line: C.warm, accent: C.gold, titleFontSize: 13, bodyFontSize: 9.4,
  });
  addCard(slide, SH, {
    x: 8.38, y: 2.12, w: 2.74, h: 2.92,
    title: "Errores",
    body: "Se manejan mejor cuando entiendes HTTP, response.ok y lo que realmente devuelve cada paso.",
    fill: C.paleRed, line: C.paleRed, accent: C.red, titleFontSize: 13, bodyFontSize: 9.4,
  });

  addPanel(slide, 0.94, 5.28, 10.18, 0.88, { fill: C.navy, line: C.navy });
  slide.addText("Con esta base ya podemos pasar de la consola a formularios, validación y APIs reales.", {
    x: 1.12, y: 5.36, w: 7.3, h: 0.42,
    fontFace: TYPOGRAPHY.body, fontSize: 13.2, color: "DCE6F2", margin: 0, valign: "mid",
  });
  addChip(slide, SH, "Síntesis de la clase", {
    x: 8.68, y: 5.44, w: 2.28, h: 0.34,
    fill: C.red, color: C.white, fontSize: 11, rectRadius: 0.05,
  });

  validateSlide(slide, pptx);
}

function createClosingIntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "CIERRE", {
    x: 0.88, y: 0.68, w: 1.1, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6, rectRadius: 0.05,
  });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("Síntesis de la clase", {
    x: 0.88, y: 2.22, w: 8.8, h: 0.9,
    fontFace: TYPOGRAPHY.display, fontSize: 42, bold: true, color: C.white, margin: 0, valign: "mid",
  });
  slide.addText("De sintaxis moderna a flujo asíncrono legible", {
    x: 0.88, y: 3.48, w: 7.9, h: 0.38,
    fontFace: TYPOGRAPHY.body, fontSize: 16, color: "DCE6F2", margin: 0, valign: "mid",
  });
  validateSlide(slide, pptx);
}

function createClosingProgressionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "La progresión técnica completa de la clase",
    "No fueron cuatro temas sueltos: fue un recorrido desde sintaxis moderna hasta lectura de flujo asíncrono usable en trabajo real.",
    "Cierre"
  );

  addStageChain(slide, SH, {
    x: 0.94, y: 2.08, w: 10.18, h: 4.1,
    title: "Del lenguaje al flujo",
    compact: true,
    stages: [
      { step: "1", title: "ES6+", body: "El lenguaje se vuelve más legible y expresivo.", accent: C.red },
      { step: "2", title: "Módulos", body: "El código empieza a organizarse por responsabilidad.", accent: C.navy },
      { step: "3", title: "Asincronía", body: "Se instala el problema del tiempo y la espera.", accent: C.gold },
      { step: "4", title: "Promises", body: "La espera se representa como valor futuro.", accent: C.softBlue },
      { step: "5", title: "async/await", body: "El mismo mecanismo se vuelve mucho más legible.", accent: C.red },
      { step: "6", title: "APIs", body: "La siguiente clase aplica esto sobre datos reales e interfaz.", accent: C.navy, fill: C.navy, tone: "dark" },
    ],
  });

  validateSlide(slide, pptx);
}

function createClosingInstalledIdeasSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "Ideas que deberían quedar instaladas",
    "Si estas cuatro ideas ya suenan razonables, el lunes quedó bien aprovechado.",
    "Cierre"
  );

  addCard(slide, SH, {
    x: 0.94, y: 2.16, w: 4.94, h: 1.24,
    title: "ES6+ no es adorno",
    body: "Resuelve problemas reales de legibilidad y mantenimiento.",
    fill: C.softBlue, line: C.softBlue, accent: C.navy, titleFontSize: 13, bodyFontSize: 9.2,
  });
  addCard(slide, SH, {
    x: 6.18, y: 2.16, w: 4.94, h: 1.24,
    title: "Módulos son diseño",
    body: "Separar archivos importa porque separa responsabilidades.",
    fill: C.warm, line: C.warm, accent: C.gold, titleFontSize: 13, bodyFontSize: 9.2,
  });
  addCard(slide, SH, {
    x: 0.94, y: 3.78, w: 4.94, h: 1.24,
    title: "Asincronía es tiempo",
    body: "No es magia: es coordinación de espera, cola y ejecución.",
    fill: C.softBlue, line: C.softBlue, accent: C.navy, titleFontSize: 13, bodyFontSize: 9.2,
  });
  addCard(slide, SH, {
    x: 6.18, y: 3.78, w: 4.94, h: 1.24,
    title: "async/await es lectura",
    body: "Mejora la forma de leer Promises, pero no cambia el mecanismo de fondo.",
    fill: C.paleRed, line: C.paleRed, accent: C.red, titleFontSize: 13, bodyFontSize: 9.2,
  });

  validateSlide(slide, pptx);
}

function createClosingChecklistSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "Checklist antes de pasar a trabajo aplicado",
    "Sirve para detectar qué conviene repasar antes de entrar a formularios, validación y APIs aplicadas.",
    "Cierre"
  );

  addCard(slide, SH, {
    x: 0.94, y: 2.12, w: 10.18, h: 3.94,
    title: "¿Ya puedes hacer esto?",
    body: "- Leer una función con arrow y destructuring sin detenerte.\n- Distinguir export nombrado y export default.\n- Explicar por qué setTimeout(..., 0) no corre inmediatamente.\n- Decir qué devuelve fetch y qué devuelve response.json().\n- Leer un try/catch con async/await y detectar dónde se maneja el error.",
    fill: C.white, line: C.border, accent: C.navy, titleFontSize: 15, bodyFontSize: 11,
  });

  validateSlide(slide, pptx);
}

function createClosingMythRealitySlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "Confusiones que conviene corregir antes de seguir",
    "Varias de las dificultades con JavaScript moderno no nacen en la sintaxis, sino en ideas mal instaladas sobre lo que realmente hace el lenguaje.",
    "Cierre"
  );

  addMythRealityGrid(slide, SH, {
    x: 0.94, y: 2.08, w: 10.18, h: 4.18,
    columns: 2,
    title: "Confusiones frecuentes",
    entries: [
      {
        badge: "Error",
        myth: "async/await vuelve síncrono el programa",
        reality: "Sigue siendo asincronía; lo que cambia es la forma de escribir el flujo.",
        accent: C.red,
        fill: C.paleRed,
      },
      {
        badge: "Error",
        myth: "0 ms significa ejecución instantánea",
        reality: "El callback entra cuando el stack queda libre, no apenas se agenda.",
        accent: C.gold,
        fill: C.warm,
      },
      {
        badge: "Error",
        myth: "Módulos son solo carpetas bonitas",
        reality: "La modularidad define límites de responsabilidad y exposición.",
        accent: C.navy,
        fill: C.softBlue,
        badgeFill: C.softBlue,
      },
      {
        badge: "Error",
        myth: "Si el código compila, el manejo de error ya está bien",
        reality: "Todavía debes revisar response.ok, retornos útiles y lectura del flujo real.",
        accent: C.red,
        fill: C.paleRed,
      },
    ],
    footer: "Parte importante de aprender JavaScript moderno es corregir malos modelos mentales.",
  });

  validateSlide(slide, pptx);
}

function createClosingQuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "Preguntas de salida",
    "Sirven como cierre de comprensión y como puente hacia el trabajo aplicado de la siguiente clase.",
    "Cierre"
  );

  addCard(slide, SH, {
    x: 0.94, y: 2.18, w: 10.18, h: 3.74,
    title: "Para salir con la idea correcta",
    body: "1. ¿Qué problema concreto resolvió ES6+ respecto del JavaScript anterior?\n\n2. ¿Por qué separar código en módulos es una decisión de diseño y no solo de orden?\n\n3. ¿Qué hace el event loop cuando una tarea termina pero el stack sigue ocupado?\n\n4. ¿Qué diferencia práctica hay entre Response y datos parseados en una llamada fetch?",
    fill: C.white, line: C.border, accent: C.navy, titleFontSize: 15, bodyFontSize: 10.8,
  });

  validateSlide(slide, pptx);
}

function createClosingNextClassSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "Lo que sigue: formularios, validación y consumo de APIs en una interfaz real",
    "La próxima clase toma todo esto y lo aterriza en una página que recibe input, valida, consulta y muestra información.",
    "Cierre"
  );

  addCard(slide, SH, {
    x: 0.94, y: 2.14, w: 3.12, h: 3.72,
    title: "Input del usuario",
    body: "Formularios y eventos reales, no solo ejemplos aislados en consola.",
    fill: C.softBlue, line: C.softBlue, accent: C.navy, titleFontSize: 14, bodyFontSize: 10,
  });
  addCard(slide, SH, {
    x: 4.46, y: 2.14, w: 3.12, h: 3.72,
    title: "Validación",
    body: "Condiciones, mensajes de error y control del dato antes de consultar o renderizar.",
    fill: C.warm, line: C.warm, accent: C.gold, titleFontSize: 14, bodyFontSize: 10,
  });
  addCard(slide, SH, {
    x: 7.98, y: 2.14, w: 3.12, h: 3.72,
    title: "API + interfaz",
    body: "El dato deja de vivir en la consola y empieza a transformar la pantalla frente al usuario.",
    fill: C.paleRed, line: C.paleRed, accent: C.red, titleFontSize: 14, bodyFontSize: 10,
  });

  validateSlide(slide, pptx);
}

function createClosingAgenticMethodSlide() {
  const slide = pptx.addSlide();
  addHeader(slide,
    "Método de trabajo con agentes para esta etapa del módulo",
    "La herramienta ya acelera bastante, pero solo suma si el estudiante mantiene control de lectura, validación y criterio.",
    "Cierre"
  );

  addDelegationSplit(slide, SH, {
    x: 0.94, y: 2.08, w: 10.18, h: 4.14,
    title: "Entender → apoyarse → verificar",
    left: {
      title: "Buen uso",
      subtitle: "el agente como acelerador",
      items: [
        "Pedir refactors de sintaxis a ES6+",
        "Solicitar explicaciones de un flujo async paso a paso",
        "Pedir un ejemplo base de fetch con try/catch",
        "Usarlo para generar primeras versiones de módulos o funciones",
      ],
      accent: C.titleFill,
      fill: C.softBlue,
    },
    right: {
      title: "Validación obligatoria",
      subtitle: "lo que sigue siendo tuyo",
      items: [
        "Leer si el orden de ejecución tiene sentido",
        "Probar qué devuelve cada línea del flujo",
        "Confirmar que el manejo HTTP está bien hecho",
        "Verificar que la modularidad realmente tenga coherencia de diseño",
      ],
      accent: C.red,
      fill: C.white,
    },
    footer: "La velocidad del agente suma. La comprensión y la validación siguen siendo humanas.",
  });

  validateSlide(slide, pptx);
}

function createFinalStatementSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addCenterStatement(slide, SH,
    "JavaScript moderno no se trata solo de nueva sintaxis.\nSe trata de escribir mejor, organizar mejor y leer mejor el tiempo del programa.",
    { x: 1.08, y: 2.08, w: 9.88, h: 1.52, fill: C.navy, line: C.navy, fontSize: 24, color: C.white }
  );
  addPanel(slide, 1.76, 4.58, 8.5, 0.74, { fill: "173A5A", line: "173A5A" });
  slide.addText("Semana 04 · Clase 10 · Base lista para formularios y APIs", {
    x: 2.04, y: 4.79, w: 8.0, h: 0.2,
    fontFace: TYPOGRAPHY.body, fontSize: 12.2, color: "DCE6F2", margin: 0, align: "center",
  });
  validateSlide(slide, pptx);
}
async function main() {
  createCoverSlide();
  createMapSlide();
  createBlock1IntroSlide();
  createLegacyProblemsSlide();
  createEs6InflectionSlide();
  createVarVsLetConstSlide();
  createArrowFunctionsSlide();
  createTemplateLiteralsSlide();
  createDestructuringSlide();
  createSpreadSlide();
  createGuidedReadingSlide();
  createBlock1QuestionsSlide();
  createBlock1AgenticSlide();
  createBlock1ClosingSlide();

  // Bloque 2
  createBlock2IntroSlide();
  createSingleFileProblemsSlide();
  createWhatIsModuleSlide();
  createModularStructureSlide();
  createNamedExportSlide();
  createDefaultExportSlide();
  createIndexBarrelSlide();
  createBrowserModulesSlide();
  createBlock2ActivitySlide();
  createBlock2AgenticSlide();
  createBlock2ClosingSlide();

  // Bloque 3
  createBlock3IntroSlide();
  createSyncVsAsyncSlide();
  createSingleThreadSlide();
  createEventLoopSlide();
  createExecutionOrderSlide();
  createCallbackHellSlide();
  createBlock3ActivitySlide();
  createBlock3AgenticSlide();
  createBlock3ClosingSlide();

  // Bloque 4
  createBlock4IntroSlide();
  createWhatIsPromiseSlide();
  createPromiseStatesSlide();
  createThenCatchFinallySlide();
  createPromiseChainSlide();
  createFetchReturnsPromiseSlide();
  createAsyncAwaitIntroSlide();
  createAsyncReturnsPromiseSlide();
  createAwaitLocalPauseSlide();
  createTryCatchSlide();
  createResponseOkSlide();
  createCompleteFetchExampleSlide();
  createTwoAwaitsSlide();
  createAsyncCommonErrorsSlide();
  createCallbacksVsPromisesVsAwaitSlide();
  createBlock4ActivitySlide();
  createBlock4AgenticSlide();
  createBlock4QuestionsSlide();
  createBlock4ClosingSlide();

  // Síntesis de la clase
  createClosingIntroSlide();
  createClosingProgressionSlide();
  createClosingInstalledIdeasSlide();
  createClosingChecklistSlide();
  createClosingMythRealitySlide();
  createClosingQuestionsSlide();
  createClosingNextClassSlide();
  createClosingAgenticMethodSlide();
  createFinalStatementSlide();

  await pptx.writeFile({ fileName: outputPptx });
  fs.copyFileSync(__filename, outputJs);
  console.log(`Deck generado: ${outputPptx}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});








