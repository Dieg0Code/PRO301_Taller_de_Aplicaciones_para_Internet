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
  addBrowserMock,
  addStaticVsInteractiveCompare,
  addDataTypesBoard,
  addControlFlowPanel,
  addEventReactionPanel,
} = components;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
applyAiepTheme(pptx, {
  author: "Codex",
  company: "AIEP",
  subject: "Clase 08",
  title: "JavaScript Base",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx =
  process.env.PPTX_OUTPUT ||
  path.join(rootDir, "Clase-08-Bloque-1-JavaScript-Base.pptx");
const outputJs =
  process.env.PPTX_SOURCE_OUTPUT ||
  path.join(rootDir, "Clase-08-Bloque-1-JavaScript-Base.js");

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
    classLabel: `Clase 08 · ${blockLabel}`,
    logoMarkPath,
    subtitleY: 1.84,
    subtitleH: 0.3,
    subtitleFontSize: 11.2,
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

function addConsoleRow(slide, x, y, lineNo, text, color = "DCE6F2", size = 9.2) {
  slide.addText(String(lineNo), {
    x,
    y,
    w: 0.18,
    h: 0.12,
    fontFace: "Aptos Mono",
    fontSize: 8.2,
    color: "7B8FA8",
    align: "right",
    margin: 0,
  });
  slide.addText(text, {
    x: x + 0.26,
    y,
    w: 3.2,
    h: 0.14,
    fontFace: "Aptos Mono",
    fontSize: size,
    color,
    margin: 0,
    fit: "shrink",
  });
}

function addProcessStep(slide, x, y, title, body, accent, fill) {
  addMiniCard(slide, SH, {
    x,
    y,
    w: 2.32,
    h: 0.76,
    title,
    body,
    accent,
    fill,
    line: fill,
    titleFontSize: 11.4,
    bodyFontSize: 8.1,
  });
}

function addValueStateCard(slide, x, y, w, h, opts = {}) {
  addPanel(slide, x, y, w, h, {
    fill: opts.fill || C.white,
    line: opts.line || C.border,
  });
  slide.addShape(SH.rect, {
    x,
    y,
    w: 0.08,
    h,
    fill: { color: opts.accent || C.navy },
    line: { color: opts.accent || C.navy },
  });
  slide.addText(opts.title || "dato", {
    x: x + 0.16,
    y: y + 0.14,
    w: w - 0.28,
    h: 0.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 11,
    bold: true,
    color: C.navy,
    margin: 0,
    fit: "shrink",
  });
  addPanel(slide, x + 0.16, y + 0.4, w - 0.28, 0.34, {
    fill: C.navy,
    line: C.navy,
  });
  slide.addText(opts.value || "", {
    x: x + 0.24,
    y: y + 0.51,
    w: w - 0.44,
    h: 0.1,
    fontFace: "Aptos Mono",
    fontSize: 8.1,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
    align: "center",
  });
  slide.addText(opts.body || "", {
    x: x + 0.16,
    y: y + 0.86,
    w: w - 0.28,
    h: h - 0.98,
    fontFace: TYPOGRAPHY.body,
    fontSize: 7.6,
    color: C.ink,
    margin: 0,
    fit: "shrink",
    valign: "mid",
    align: "center",
  });
}

function addOperationExample(slide, x, y, w, opts = {}) {
  addCodePanel(slide, SH, {
    x,
    y,
    w,
    h: 1.64,
    title: opts.title || "Operacion",
    code: opts.code || "",
    lang: "js",
    fontSize: 8.4,
    textOffsetY: 0.68,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });
  addMiniCard(slide, SH, {
    x,
    y: y + 1.84,
    w,
    h: 0.8,
    title: opts.cardTitle || "Que produce",
    body: opts.body || "",
    accent: opts.accent || C.navy,
    fill: opts.fill || C.softBlue,
    line: opts.fill || C.softBlue,
    titleFontSize: 11.2,
    bodyFontSize: 8,
  });
}

function createCoverSlide() {
  const slide = pptx.addSlide();

  slide.background = { color: C.navy };
  slide.addImage({
    path: logoPath,
    ...imageSizingContain(logoPath, 9.94, 0.38, 1.42, 0.82),
  });
  addBarsMotif(slide, 0.78, 0.72, 1.22, C.red);

  slide.addText("Clase 08 · Semana 03", {
    x: 1.66,
    y: 0.82,
    w: 2.4,
    h: 0.14,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("JavaScript base", {
    x: 0.78,
    y: 1.54,
    w: 4.52,
    h: 0.7,
    fontFace: TYPOGRAPHY.display,
    fontSize: 24,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Tipos de datos, funciones, estructuras de control y eventos", {
    x: 0.78,
    y: 2.36,
    w: 4.66,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14,
    color: "E5EDF6",
    margin: 0,
  });
  slide.addText(
    "HTML ya organiza y CSS ya presenta. Hoy entra la capa que hace reaccionar la interfaz, leer datos y ejecutar decisiones observables.",
    {
      x: 0.78,
      y: 3.24,
      w: 4.36,
      h: 0.86,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.6,
      color: "DCE6F2",
      margin: 0,
      valign: "mid",
    }
  );

  addPanel(slide, 0.78, 5.18, 2.66, 0.78, {
    fill: "355B8E",
    line: "355B8E",
  });
  slide.addText("Martes 31 de marzo de 2026\n10:50 - 13:10", {
    x: 1.02,
    y: 5.38,
    w: 2.2,
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

  addBrowserMock(slide, SH, {
    x: 5.44,
    y: 1.38,
    w: 5.02,
    h: 2.44,
    url: "https://demo.local/landing",
  });
  slide.addShape(SH.roundRect, {
    x: 5.64,
    y: 1.98,
    w: 4.62,
    h: 0.42,
    rectRadius: 0.03,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("Botón visible", {
    x: 5.78,
    y: 2.1,
    w: 1.2,
    h: 0.08,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addPanel(slide, 5.64, 2.56, 1.48, 1.44, {
    fill: C.paleRed,
    line: C.paleRed,
  });
  addPanel(slide, 7.28, 2.56, 2.88, 0.48, {
    fill: C.white,
    line: C.border,
  });
  addPanel(slide, 7.28, 3.18, 2.88, 0.68, {
    fill: C.white,
    line: C.border,
  });

  addCodePanel(slide, SH, {
    x: 5.44,
    y: 4.06,
    w: 5.02,
    h: 1.72,
    title: "Primer comportamiento observable",
    code: 'const estado = "JS activo";\nconsole.log(estado);',
    lang: "js",
    fontSize: 9.6,
    textOffsetY: 0.72,
    topOffset: 0.12,
    titleFill: C.titleFill,
  });

  addMiniCard(slide, SH, {
    x: 3.52,
    y: 5.18,
    w: 1.76,
    h: 0.78,
    title: "Idea central",
    body: "Agrega ejecución y respuesta.",
    accent: C.gold,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 11.8,
    bodyFontSize: 8.6,
  });

  validateSlide(slide, pptx);
}

function createMapSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Mapa de la clase",
    "Hoy JavaScript aparece como comportamiento observable: datos, decisiones y reacción frente a eventos.",
    "Bloque 1"
  );

  addMapBlock(slide, 1.12, 2.46, 2.16, 2.6, {
    kicker: "Bloque 1",
    title: "Rol de\nJavaScript",
    fill: C.red,
    line: C.red,
    color: C.white,
    kickerColor: C.white,
    fontSize: 18.2,
  });
  addArrow(slide, 3.36, 3.62, 0.2, 0.28, C.gold);
  addMapBlock(slide, 3.62, 2.46, 2.16, 2.6, {
    kicker: "Bloque 2",
    title: "Datos y\nvariables",
    fill: C.white,
    line: C.border,
    color: C.navy,
  });
  addArrow(slide, 5.86, 3.62, 0.2, 0.28, C.gold);
  addMapBlock(slide, 6.12, 2.46, 2.16, 2.6, {
    kicker: "Bloque 3",
    title: "Funciones y\ncontrol",
    fill: C.warm,
    line: C.warm,
    color: C.navy,
  });
  addArrow(slide, 8.36, 3.62, 0.2, 0.28, C.gold);
  addMapBlock(slide, 8.62, 2.46, 2.16, 2.6, {
    kicker: "Bloque 4",
    title: "Eventos e\ninteracción",
    fill: C.softBlue,
    line: C.softBlue,
    color: C.navy,
  });

  addCenterStatement(slide, SH, "estructura -> datos -> lógica -> eventos", {
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

function createBlockIntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "JavaScript entra como capa de comportamiento",
    "HTML organiza, CSS presenta y JavaScript decide qué pasa cuando algo cambia, se ejecuta o se interactúa.",
    "Bloque 1"
  );

  addPanel(slide, 1.02, 2.34, 3.84, 3.76, { fill: C.navy, line: C.navy });
  addBarsMotif(slide, 1.28, 2.62, 0.82, C.red);
  slide.addText("La página ya puede verse bien.", {
    x: 1.86,
    y: 3.12,
    w: 2.18,
    h: 0.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15.6,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Pero todavía puede seguir completamente estática.", {
    x: 1.86,
    y: 3.64,
    w: 2.18,
    h: 0.44,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.4,
    color: "DCE6F2",
    margin: 0,
    valign: "mid",
  });
  addMiniCard(slide, SH, {
    x: 1.28,
    y: 4.38,
    w: 3.12,
    h: 0.66,
    title: "HTML",
    body: "declara estructura y jerarquía.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addMiniCard(slide, SH, {
    x: 1.28,
    y: 5.1,
    w: 3.12,
    h: 0.66,
    title: "CSS",
    body: "resuelve apariencia, layout y responsive.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });

  addBrowserMock(slide, SH, {
    x: 5.24,
    y: 2.56,
    w: 4.06,
    h: 2.08,
    url: "https://demo.local/portafolio",
  });
  slide.addShape(SH.roundRect, {
    x: 5.44,
    y: 3.06,
    w: 3.66,
    h: 0.38,
    rectRadius: 0.03,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("Hero visible", {
    x: 5.58,
    y: 3.16,
    w: 0.92,
    h: 0.08,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.6,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addPanel(slide, 5.44, 3.58, 1.22, 0.66, {
    fill: C.white,
    line: C.border,
  });
  addPanel(slide, 6.82, 3.58, 2.28, 0.66, {
    fill: C.paleRed,
    line: C.paleRed,
  });

  addCodePanel(slide, SH, {
    x: 8.44,
    y: 4.58,
    w: 2.66,
    h: 1.62,
    title: "JS",
    code: 'boton.addEventListener(\n  "click",\n  abrirPanel\n);',
    lang: "js",
    fontSize: 8,
    textOffsetY: 0.62,
    topOffset: 0.06,
    titleFill: C.titleFill,
  });

  addMiniCard(slide, SH, {
    x: 5.24,
    y: 5.12,
    w: 2.98,
    h: 0.72,
    title: "JavaScript",
    body: "agrega lógica, ejecución y respuesta a acciones del usuario.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });

  validateSlide(slide, pptx);
}

function createStaticVsInteractiveSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Una página puede verse bien y seguir completamente estática",
    "La diferencia útil no es solo estética: es si la interfaz responde o no a una acción observable.",
    "Bloque 1"
  );

  addStaticVsInteractiveCompare(slide, SH, {
    x: 0.96,
    y: 2.34,
    w: 10.14,
    h: 3.86,
    title: "Página correcta vs interfaz que ya reacciona",
    leftTitle: "Solo HTML + CSS",
    leftSubtitle: "la maqueta se ve sólida, pero todavía no ocurre nada al interactuar",
    leftCta: "Botón visible",
    leftNote: "sin evento ni respuesta",
    leftSideLabel: "estado fijo",
    rightTitle: "Con JavaScript",
    rightSubtitle: "la acción del usuario dispara una respuesta observable en la interfaz o en la consola",
    rightCta: "Botón activo",
    rightNote: "click -> mensaje en consola",
    rightSideLabel: "comportamiento",
    footer: "La interactividad no se deduce por apariencia: se comprueba ejecutando.",
  });

  validateSlide(slide, pptx);
}

function createLayersSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "JavaScript no reemplaza HTML ni CSS",
    "Trabaja sobre otra capa del sistema y conviene mantener separadas las responsabilidades desde el principio.",
    "Bloque 1"
  );

  addCard(slide, SH, {
    x: 1.02,
    y: 2.58,
    w: 3.0,
    h: 2.02,
    title: "HTML",
    body: "Organiza contenido, semántica y jerarquía del documento. Si la estructura está mal, JavaScript no la vuelve clara por sí solo.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 18,
    bodyFontSize: 10,
  });
  addArrow(slide, 4.26, 3.44, 0.22, 0.32, C.gold);
  addCard(slide, SH, {
    x: 4.5,
    y: 2.58,
    w: 3.0,
    h: 2.02,
    title: "CSS",
    body: "Define apariencia, layout, responsive y sistema visual. No conviene pedirle a JavaScript lo que ya resuelve mejor la hoja de estilos.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 18,
    bodyFontSize: 10,
  });
  addArrow(slide, 7.74, 3.44, 0.22, 0.32, C.gold);
  addCard(slide, SH, {
    x: 7.98,
    y: 2.58,
    w: 3.0,
    h: 2.02,
    title: "JavaScript",
    body: "Guarda datos, ejecuta instrucciones, toma decisiones y responde a eventos. Ahí empieza la lógica y el comportamiento.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 18,
    bodyFontSize: 10,
  });

  addCenterStatement(slide, SH, "La interfaz final aparece cuando estructura, presentación y comportamiento conversan bien.", {
    x: 1.32,
    y: 5.22,
    w: 9.36,
    h: 0.72,
    fill: C.white,
    line: C.border,
    fontSize: 17.8,
  });

  validateSlide(slide, pptx);
}

function createScriptExecutionSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un script es una secuencia de instrucciones que el navegador ejecuta",
    "JavaScript no adivina intenciones: lee el código, lo ejecuta y deja evidencia técnica en consola.",
    "Bloque 1"
  );

  const scriptCode = `<script>
  console.log("JavaScript está corriendo");
  console.log(2 + 3);
</script>`;

  addCodePanel(slide, SH, {
    x: 0.98,
    y: 2.34,
    w: 5.2,
    h: 3.84,
    title: "Fragmento mínimo ejecutable",
    code: scriptCode,
    lang: "html",
    fontSize: 10,
    titleFill: C.titleFill,
  });

  addMiniCard(slide, SH, {
    x: 6.44,
    y: 2.58,
    w: 1.34,
    h: 0.96,
    title: "1. Lee",
    body: "el navegador interpreta el script.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addMiniCard(slide, SH, {
    x: 7.94,
    y: 2.58,
    w: 1.34,
    h: 0.96,
    title: "2. Ejecuta",
    body: "las instrucciones en orden.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });
  addMiniCard(slide, SH, {
    x: 9.44,
    y: 2.58,
    w: 1.34,
    h: 0.96,
    title: "3. Evidencia",
    body: "aparece en consola o en pantalla.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });

  addPanel(slide, 6.44, 3.84, 4.36, 1.72, { fill: C.navy, line: C.navy });
  slide.addText("Consola", {
    x: 6.68,
    y: 4.06,
    w: 0.78,
    h: 0.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.4,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addConsoleRow(slide, 6.68, 4.42, 1, '"JavaScript está corriendo"', "A7E3A1");
  addConsoleRow(slide, 6.68, 4.7, 2, "5", "F6E29A");
  addConsoleRow(slide, 6.68, 4.98, 3, "undefined", "DCE6F2");

  addMiniCard(slide, SH, {
    x: 6.44,
    y: 5.72,
    w: 4.36,
    h: 0.46,
    title: "Idea útil",
    body: "JavaScript también se valida leyendo salidas y errores, no solo mirando la interfaz.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 11.2,
    bodyFontSize: 8.4,
  });

  validateSlide(slide, pptx);
}

function createConsoleSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La consola es parte del trabajo, no un accesorio",
    "Con JavaScript empieza a ser obligatorio escribir, ejecutar, observar resultados y corregir con evidencia.",
    "Bloque 1"
  );

  addPanel(slide, 1.02, 2.38, 5.16, 3.44, { fill: C.navy, line: C.navy });
  slide.addText("Salida real de un script simple", {
    x: 1.28,
    y: 2.62,
    w: 2.9,
    h: 0.14,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addConsoleRow(slide, 1.3, 3.08, 1, '"Hola desde JavaScript"', "A7E3A1");
  addConsoleRow(slide, 1.3, 3.38, 2, "5", "F6E29A");
  addConsoleRow(slide, 1.3, 3.68, 3, "true", "89D1FF");
  addConsoleRow(slide, 1.3, 4.16, 4, "Uncaught ReferenceError: saludoo is not defined", "FFB3B3", 8.6);
  addMiniCard(slide, SH, {
    x: 1.28,
    y: 4.8,
    w: 4.62,
    h: 0.78,
    title: "La diferencia importante",
    body: "un script puede fallar aunque la página siga viéndose casi igual. La consola muestra esa verdad técnica.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
    titleFontSize: 11.6,
    bodyFontSize: 8.1,
  });

  addMiniCard(slide, SH, {
    x: 6.48,
    y: 2.62,
    w: 4.42,
    h: 0.82,
    title: "Mensajes",
    body: "sirven para confirmar valores, entender orden de ejecución y observar qué está ocurriendo.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addMiniCard(slide, SH, {
    x: 6.48,
    y: 3.62,
    w: 4.42,
    h: 0.82,
    title: "Errores",
    body: "obligan a leer nombre, línea y causa del problema antes de aceptar cualquier ayuda externa.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });
  addMiniCard(slide, SH, {
    x: 6.48,
    y: 4.62,
    w: 4.42,
    h: 0.82,
    title: "Pruebas rápidas",
    body: "la consola permite ejecutar pequeñas expresiones y verificar hipótesis sin reconstruir toda la página.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });

  addProcessStep(slide, 1.24, 6.0, "Escribir", "una instrucción pequeña y clara.", C.red, C.paleRed);
  addArrow(slide, 3.7, 6.26, 0.18, 0.22, C.gold);
  addProcessStep(slide, 3.96, 6.0, "Ejecutar", "cargar la página y disparar el caso.", C.navy, C.softBlue);
  addArrow(slide, 6.42, 6.26, 0.18, 0.22, C.gold);
  addProcessStep(slide, 6.68, 6.0, "Leer", "consola y resultado observable.", C.gold, C.warm);
  addArrow(slide, 9.14, 6.26, 0.18, 0.22, C.gold);
  addProcessStep(slide, 9.4, 6.0, "Corregir", "y volver a probar con criterio.", C.navy, C.softBlue);

  validateSlide(slide, pptx);
}

function createAgenticSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El agente puede explicar; tú validas el comportamiento",
    "En JavaScript inicial ayuda mucho una primera explicación, pero el resultado real siempre debe comprobarse en navegador y consola.",
    "Bloque 1"
  );

  addDelegationSplit(slide, SH, {
    x: 1.02,
    y: 2.34,
    w: 9.86,
    h: 3.72,
    title: "Qué puede acelerar un agente y qué sigue siendo tuyo",
    left: {
      title: "Puede ayudar con",
      subtitle: "explicación inicial y primeras versiones pequeñas",
      items: [
        "explicar una línea de código",
        "proponer un console.log mínimo",
        "comparar dos variantes de una función simple",
        "resumir qué hace un fragmento corto",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene delegar",
      subtitle: "lectura técnica, prueba real y validación final",
      items: [
        "decidir si el código corre sin abrir la consola",
        "dar por correcta una salida no verificada",
        "ignorar errores reales del navegador",
        "aceptar comportamiento que no coincide con la intención",
      ],
      accent: C.red,
      fill: C.white,
    },
    bridgeLabel: "Verificación",
    bridgeBody: "El apoyo sirve para destrabar. La validez del código se confirma ejecutando.",
    footer: "Entender -> ejecutar -> leer -> validar.",
  });

  validateSlide(slide, pptx);
}

function createQuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas para cerrar el bloque",
    "Antes de pasar a datos y variables, conviene fijar por qué JavaScript entra recién ahora al flujo de la interfaz.",
    "Bloque 1"
  );

  addCard(slide, SH, {
    x: 1.06,
    y: 2.46,
    w: 10.0,
    h: 0.96,
    title: "1. ¿Por qué una página bien construida con HTML y CSS puede seguir siendo completamente estática?",
    body: "La respuesta debería mencionar estructura, apariencia y ausencia de comportamiento observable.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 14,
    bodyFontSize: 9,
  });
  addCard(slide, SH, {
    x: 1.06,
    y: 3.72,
    w: 10.0,
    h: 0.96,
    title: "2. ¿Qué tipo de problemas empieza a resolver JavaScript dentro de una interfaz web?",
    body: "Guardar datos, ejecutar instrucciones, tomar decisiones y responder a acciones del usuario.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14,
    bodyFontSize: 9,
  });
  addCard(slide, SH, {
    x: 1.06,
    y: 4.98,
    w: 10.0,
    h: 0.96,
    title: "3. ¿Por qué la consola del navegador se vuelve una herramienta central al empezar a trabajar con scripts?",
    body: "Porque deja evidencia de ejecución, errores y resultados que no siempre aparecen directamente en pantalla.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 14,
    bodyFontSize: 9,
  });

  validateSlide(slide, pptx);
}

function createClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del Bloque 1",
    "JavaScript ya quedó instalado como capa de comportamiento. El siguiente paso es entender con qué datos trabaja esa lógica.",
    "Bloque 1"
  );

  addCenterStatement(slide, SH, "Antes de reaccionar, un programa necesita representar información con claridad.", {
    x: 1.0,
    y: 2.54,
    w: 4.72,
    h: 1.6,
    fill: C.navy,
    line: C.navy,
    color: C.white,
    fontSize: 21.2,
  });
  addMiniCard(slide, SH, {
    x: 1.22,
    y: 4.56,
    w: 4.3,
    h: 1.0,
    title: "Lo que sigue",
    body: "Variables, let, const, string, number y boolean preparan el terreno para toda la lógica posterior.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 12.4,
    bodyFontSize: 8.7,
  });

  addDataTypesBoard(slide, SH, {
    x: 5.96,
    y: 2.42,
    w: 5.08,
    h: 3.76,
    title: "Avance del Bloque 2",
    footer: "Sin datos claros no hay decisiones claras.",
  });

  validateSlide(slide, pptx);
}

function createBlock1RealPageSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Una pagina ordenada puede seguir completamente muda",
    "El primer contraste importante no es bonito versus feo. Es estructura visible versus comportamiento observable.",
    "Bloque 1"
  );

  addPanel(slide, 1.0, 2.18, 4.86, 3.26, { fill: C.white, line: C.border });
  slide.addShape(SH.rect, {
    x: 1.0,
    y: 2.18,
    w: 4.86,
    h: 0.42,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Se ve resuelta", {
    x: 1.24,
    y: 2.32,
    w: 1.5,
    h: 0.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.6,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addPanel(slide, 1.26, 2.82, 4.3, 0.42, { fill: C.paleRed, line: C.paleRed });
  addPanel(slide, 1.26, 3.44, 2.02, 1.3, { fill: C.softBlue, line: C.softBlue });
  addPanel(slide, 3.48, 3.44, 2.08, 0.52, { fill: C.white, line: C.border });
  addPanel(slide, 3.48, 4.16, 2.08, 0.58, { fill: C.warm, line: C.warm });
  addPanel(slide, 1.38, 4.9, 4.02, 0.3, { fill: C.warm, line: C.warm });
  slide.addShape(SH.rect, {
    x: 1.48,
    y: 5.0,
    w: 0.1,
    h: 0.1,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Hay HTML y CSS. Todavia no hay respuesta al usuario.", {
    x: 1.68,
    y: 4.985,
    w: 3.56,
    h: 0.11,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.1,
    color: C.navy,
    margin: 0,
    fit: "shrink",
  });

  addCard(slide, SH, {
    x: 6.04,
    y: 2.18,
    w: 4.84,
    h: 0.98,
    title: "Hay estructura",
    body: "El contenido se puede leer, pero aun no ejecuta decisiones ni reacciones.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 14.2,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 6.04,
    y: 3.38,
    w: 4.84,
    h: 0.98,
    title: "Hay presentacion",
    body: "La interfaz puede verse ordenada sin que eso implique comportamiento real.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14.2,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 6.04,
    y: 4.58,
    w: 4.84,
    h: 0.98,
    title: "Falta reaccion",
    body: "JavaScript aparece cuando la pagina necesita ejecutar algo en el momento correcto.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 14.2,
    bodyFontSize: 8.8,
  });

  validateSlide(slide, pptx);
}

function createBlock1ExecutionFlowSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Que hace el navegador con un script corto",
    "Pensarlo como secuencia ayuda a entender por que consola, carga y ejecucion estan conectadas.",
    "Bloque 1"
  );

  addProcessStep(slide, 0.98, 2.2, "1. Leer HTML", "encuentra el script dentro de la pagina", C.red, C.paleRed);
  addArrow(slide, 3.42, 2.46, 0.18, 0.22, C.gold);
  addProcessStep(slide, 3.72, 2.2, "2. Cargar JS", "prepara instrucciones para ejecutar", C.gold, C.warm);
  addArrow(slide, 6.16, 2.46, 0.18, 0.22, C.gold);
  addProcessStep(slide, 6.46, 2.2, "3. Ejecutar", "corre linea por linea en el contexto del navegador", C.navy, C.softBlue);
  addArrow(slide, 8.9, 2.46, 0.18, 0.22, C.gold);
  addProcessStep(slide, 9.2, 2.2, "4. Observar", "mirar consola y resultado visible", C.red, C.paleRed);

  addCodePanel(slide, SH, {
    x: 1.02,
    y: 3.42,
    w: 4.94,
    h: 2.0,
    title: "Script minimo",
    code: 'const estado = "JS activo";\nconsole.log(estado);',
    lang: "js",
    fontSize: 9.4,
    textOffsetY: 0.66,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addPanel(slide, 6.18, 3.42, 4.72, 2.0, { fill: C.navy, line: C.navy });
  slide.addText("Consola", {
    x: 6.42,
    y: 3.58,
    w: 1.3,
    h: 0.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.4,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addConsoleRow(slide, 6.42, 4.08, 1, "> Script encontrado", "DCE6F2", 8.9);
  addConsoleRow(slide, 6.42, 4.34, 2, "> Ejecutando...", "DCE6F2", 8.9);
  addConsoleRow(slide, 6.42, 4.6, 3, 'JS activo', "F2D26B", 9.1);
  addPanel(slide, 6.38, 5.0, 4.14, 0.3, { fill: C.paleRed, line: C.paleRed });
  slide.addShape(SH.rect, {
    x: 6.48,
    y: 5.1,
    w: 0.1,
    h: 0.1,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("El output confirma que el codigo si paso por el navegador.", {
    x: 6.68,
    y: 5.085,
    w: 3.58,
    h: 0.11,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.0,
    color: C.navy,
    margin: 0,
    fit: "shrink",
  });

  validateSlide(slide, pptx);
}

function createBlock1ConsoleChecklistSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La consola no esta de adorno",
    "Sirve para confirmar si el script corre, si un valor existe y si una accion produjo salida real.",
    "Bloque 1"
  );

  addPanel(slide, 1.0, 2.18, 4.96, 3.42, { fill: C.navy, line: C.navy });
  slide.addText("Que te permite comprobar", {
    x: 1.24,
    y: 2.36,
    w: 2.2,
    h: 0.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.8,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addConsoleRow(slide, 1.24, 2.86, 1, "> El archivo si se ejecuto", "DCE6F2", 8.8);
  addConsoleRow(slide, 1.24, 3.14, 2, "> El valor existe", "DCE6F2", 8.8);
  addConsoleRow(slide, 1.24, 3.42, 3, "> La condicion entro por una rama", "DCE6F2", 8.8);
  addConsoleRow(slide, 1.24, 3.7, 4, "> El evento si disparo la accion", "DCE6F2", 8.8);
  addConsoleRow(slide, 1.24, 3.98, 5, "> El error apunta a una linea concreta", "F2D26B", 8.8);
  addPanel(slide, 1.22, 4.66, 4.2, 0.72, { fill: C.paleRed, line: C.paleRed });
  slide.addShape(SH.rect, {
    x: 1.32,
    y: 4.8,
    w: 0.1,
    h: 0.3,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("Idea clave", {
    x: 1.52,
    y: 4.82,
    w: 1.2,
    h: 0.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.2,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Leer consola es parte de programar, no un paso opcional al final.", {
    x: 1.52,
    y: 5.03,
    w: 3.58,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.5,
    color: C.navy,
    margin: 0,
    fit: "shrink",
  });

  addCard(slide, SH, {
    x: 6.12,
    y: 2.18,
    w: 4.76,
    h: 0.98,
    title: "1. Ejecuta",
    body: "Abre la pagina y aseguralo en el navegador, no solo en el editor.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 14,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 6.12,
    y: 3.38,
    w: 4.76,
    h: 0.98,
    title: "2. Mira salida",
    body: "Busca una evidencia concreta: texto, valor, error o confirmacion visible.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 6.12,
    y: 4.58,
    w: 4.76,
    h: 0.98,
    title: "3. Ajusta con criterio",
    body: "Si no aparece evidencia, el problema no esta resuelto aunque el codigo se vea correcto.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 14,
    bodyFontSize: 8.8,
  });

  validateSlide(slide, pptx);
}

function createBlock1MistakesSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Errores comunes al entrar a JavaScript",
    "Estos tropiezos aparecen cuando se piensa que escribir codigo ya equivale a haber agregado comportamiento.",
    "Bloque 1"
  );

  addCard(slide, SH, {
    x: 1.0,
    y: 2.18,
    w: 4.82,
    h: 1.08,
    title: "Confundir diseno con comportamiento",
    body: "Una pagina puede verse completa y seguir sin responder a nada.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 14,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 6.0,
    y: 2.18,
    w: 4.82,
    h: 1.08,
    title: "No abrir la consola",
    body: "Sin evidencia de ejecucion, el diagnostico queda a ciegas.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 1.0,
    y: 3.56,
    w: 4.82,
    h: 1.08,
    title: "Leer el codigo como si ya estuviera probado",
    body: "Que algo suene logico no significa que el navegador lo este ejecutando.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 14,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 6.0,
    y: 3.56,
    w: 4.82,
    h: 1.08,
    title: "Aceptar una explicacion sin verificar",
    body: "Un agente puede explicar bien algo que igual necesitas comprobar con resultado real.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
    titleFontSize: 14,
    bodyFontSize: 8.8,
  });
  addCenterStatement(slide, SH, "La evidencia de comportamiento aparece en navegador, consola y resultado visible.", {
    x: 1.24,
    y: 5.08,
    w: 9.58,
    h: 0.58,
    fill: C.navy,
    line: C.navy,
    color: C.white,
    fontSize: 14.8,
  });

  validateSlide(slide, pptx);
}

function createBlock2IntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Antes de decidir o reaccionar, un programa necesita datos",
    "JavaScript empieza a construir comportamiento cuando puede guardar informacion, leerla y transformarla con claridad.",
    "Bloque 2"
  );

  addPanel(slide, 1.0, 2.42, 4.18, 3.88, { fill: C.navy, line: C.navy });
  slide.addText("Sin datos, la logica no tiene sobre que operar.", {
    x: 1.36,
    y: 2.92,
    w: 3.46,
    h: 0.62,
    fontFace: TYPOGRAPHY.display,
    fontSize: 21.8,
    bold: true,
    color: C.white,
    margin: 0,
    align: "center",
    valign: "mid",
  });
  slide.addText(
    "Nombre, precio, estado, texto de un input o cantidad en carrito son ejemplos de informacion que un programa necesita representar antes de hacer algo util.",
    {
      x: 1.34,
      y: 4.0,
      w: 3.5,
      h: 0.88,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.4,
      color: "DCE6F2",
      margin: 0,
      valign: "mid",
      align: "center",
    }
  );

  addMiniCard(slide, SH, {
    x: 1.28,
    y: 5.24,
    w: 3.6,
    h: 0.76,
    title: "Idea del bloque",
    body: "Variables y tipos de datos preparan el terreno para toda la logica posterior.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });

  addBrowserMock(slide, SH, {
    x: 5.62,
    y: 2.48,
    w: 4.96,
    h: 1.82,
    url: "https://demo.local/checkout",
  });
  slide.addShape(SH.roundRect, {
    x: 5.84,
    y: 3.0,
    w: 2.1,
    h: 0.34,
    rectRadius: 0.03,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("Finalizar compra", {
    x: 6.02,
    y: 3.1,
    w: 1.72,
    h: 0.08,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.2,
    bold: true,
    color: C.white,
    margin: 0,
    align: "center",
  });

  addValueStateCard(slide, 5.62, 4.5, 2.34, 1.36, {
    title: "nombre",
    value: '"Camila"',
    body: "texto para identificar a la persona que interactua con la pagina.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addValueStateCard(slide, 8.12, 4.5, 2.46, 1.36, {
    title: "precio",
    value: "14990",
    body: "numero que luego puede sumarse, restarse o compararse.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });

  validateSlide(slide, pptx);
}

function createNeedDataSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Una interfaz usa datos aunque la accion parezca simple",
    "Hasta el click mas basico depende de informacion representada de alguna forma dentro del programa.",
    "Bloque 2"
  );

  addCard(slide, SH, {
    x: 0.96,
    y: 2.48,
    w: 3.12,
    h: 1.02,
    title: "Nombre",
    body: "sirve para construir mensajes, validar formularios o personalizar una respuesta.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 16,
    bodyFontSize: 9,
  });
  addCard(slide, SH, {
    x: 0.96,
    y: 3.78,
    w: 3.12,
    h: 1.02,
    title: "Cantidad",
    body: "permite contar productos, intentos, resultados o pasos dentro de una tarea.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 16,
    bodyFontSize: 9,
  });
  addCard(slide, SH, {
    x: 0.96,
    y: 5.08,
    w: 3.12,
    h: 1.02,
    title: "Estado",
    body: "ayuda a saber si algo esta activo, disponible, abierto o permitido.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16,
    bodyFontSize: 9,
  });

  addCodePanel(slide, SH, {
    x: 4.42,
    y: 2.48,
    w: 3.2,
    h: 3.62,
    title: "Valores que una pagina puede necesitar",
    code: 'const nombre = "Camila";\nconst cantidad = 3;\nconst tieneAcceso = true;\nconsole.log(nombre, cantidad, tieneAcceso);',
    lang: "js",
    fontSize: 9.2,
    textOffsetY: 0.7,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addMiniCard(slide, SH, {
    x: 7.94,
    y: 2.62,
    w: 3.02,
    h: 0.9,
    title: "Lectura util",
    body: "No se programa solo con botones y pantallas: tambien con datos que representan pequenas partes del mundo.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addMiniCard(slide, SH, {
    x: 7.94,
    y: 3.76,
    w: 3.02,
    h: 0.9,
    title: "Consecuencia",
    body: "Si no entiendes que valor tienes, despues sera mas dificil leer operaciones, condiciones y resultados.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });
  addMiniCard(slide, SH, {
    x: 7.94,
    y: 4.9,
    w: 3.02,
    h: 0.9,
    title: "Puente",
    body: "Por eso aparecen primero variables y tipos, antes de funciones complejas o eventos mas ricos.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });

  validateSlide(slide, pptx);
}

function createVariablesSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Variables: nombres para guardar valores",
    "La variable no es decoracion sintactica: es una forma de modelar informacion util con un identificador claro.",
    "Bloque 2"
  );

  addCodePanel(slide, SH, {
    x: 0.98,
    y: 2.38,
    w: 4.94,
    h: 3.92,
    title: "Primeras variables utiles",
    code: 'let nombre = "Camila";\nlet edad = 22;\nlet tieneAcceso = true;',
    lang: "js",
    fontSize: 10.2,
    textOffsetY: 0.78,
    topOffset: 0.1,
    titleFill: C.titleFill,
  });

  addValueStateCard(slide, 6.18, 2.56, 1.52, 2.24, {
    title: "nombre",
    value: '"Camila"',
    body: "guarda texto para identificar a una persona o construir mensajes.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addValueStateCard(slide, 7.88, 2.56, 1.52, 2.24, {
    title: "edad",
    value: "22",
    body: "guarda un numero que luego puede compararse o calcularse.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });
  addValueStateCard(slide, 9.58, 2.56, 1.52, 2.24, {
    title: "acceso",
    value: "true",
    body: "guarda un valor logico para decidir si algo se cumple o no.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });

  addCenterStatement(slide, SH, "Nombrar bien una variable ayuda a leer mejor la logica despues.", {
    x: 6.18,
    y: 5.12,
    w: 4.92,
    h: 0.82,
    fill: C.white,
    line: C.border,
    fontSize: 17.4,
  });

  validateSlide(slide, pptx);
}

function createLetConstSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "const y let no dicen lo mismo",
    "Desde el inicio conviene distinguir entre un valor que deberia mantenerse fijo y otro que podria cambiar durante la ejecucion.",
    "Bloque 2"
  );

  addCodePanel(slide, SH, {
    x: 1.0,
    y: 2.5,
    w: 4.08,
    h: 2.06,
    title: "const",
    code: 'const curso = "PRO301";',
    lang: "js",
    fontSize: 11,
    textOffsetY: 0.82,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });
  addMiniCard(slide, SH, {
    x: 1.0,
    y: 4.78,
    w: 4.08,
    h: 1.0,
    title: "Lectura correcta",
    body: "Se usa para un valor que no deberia reescribirse en el flujo normal del programa.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });

  addCodePanel(slide, SH, {
    x: 6.0,
    y: 2.5,
    w: 4.08,
    h: 2.06,
    title: "let",
    code: "let intentos = 0;\nintentos = intentos + 1;",
    lang: "js",
    fontSize: 10,
    textOffsetY: 0.74,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });
  addMiniCard(slide, SH, {
    x: 6.0,
    y: 4.78,
    w: 4.08,
    h: 1.0,
    title: "Lectura correcta",
    body: "Se usa cuando el valor puede cambiar al contar, actualizar estado o recibir nueva informacion.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });

  addArrow(slide, 5.28, 3.62, 0.22, 0.3, C.gold);

  validateSlide(slide, pptx);
}

function createTypesBoardSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Tipos de datos basicos: texto, numeros y booleanos",
    "Cada valor se comporta distinto. Entender eso evita muchos errores tempranos al mezclar informacion.",
    "Bloque 2"
  );

  addDataTypesBoard(slide, SH, {
    x: 0.96,
    y: 2.36,
    w: 10.12,
    h: 3.96,
    title: "string, number, boolean y variable",
    footer: "Lo importante no es memorizar nombres: es reconocer que tipo de valor tienes delante.",
  });

  validateSlide(slide, pptx);
}

function createTypeofSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "typeof ayuda a inspeccionar que clase de valor tienes",
    "JavaScript tambien permite leer el tipo de un valor antes de seguir operando con el.",
    "Bloque 2"
  );

  addCodePanel(slide, SH, {
    x: 1.0,
    y: 2.42,
    w: 4.86,
    h: 3.72,
    title: "Prueba minima en consola",
    code: 'console.log(typeof "Hola");\nconsole.log(typeof 42);\nconsole.log(typeof true);',
    lang: "js",
    fontSize: 9.8,
    textOffsetY: 0.72,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addPanel(slide, 6.18, 2.42, 4.78, 3.72, { fill: C.navy, line: C.navy });
  slide.addText("Consola", {
    x: 6.42,
    y: 2.62,
    w: 1.28,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  addConsoleRow(slide, 6.42, 3.14, 1, '"string"', "A7E3A1");
  addConsoleRow(slide, 6.42, 3.46, 2, '"number"', "F6E29A");
  addConsoleRow(slide, 6.42, 3.78, 3, '"boolean"', "89D1FF");

  addMiniCard(slide, SH, {
    x: 6.42,
    y: 4.44,
    w: 4.18,
    h: 1.08,
    title: "Lectura util",
    body: "Antes de mezclar datos, conviene comprobar si estas trabajando con texto, numero o un valor logico.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });

  validateSlide(slide, pptx);
}

function createOperationsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Operaciones basicas: combinar, calcular y comparar",
    "Con datos ya representados, el siguiente paso es producir resultados pequenos pero utiles.",
    "Bloque 2"
  );

  addOperationExample(slide, 0.96, 2.42, 3.12, {
    title: "Concatenar",
    code: 'const saludo = "Hola, " + nombre;',
    cardTitle: "Texto",
    body: "Une valores string para construir un mensaje o etiqueta visible.",
    accent: C.red,
    fill: C.paleRed,
  });
  addOperationExample(slide, 4.46, 2.42, 3.12, {
    title: "Calcular",
    code: "const total = precio - descuento;",
    cardTitle: "Numero",
    body: "Trabaja con cantidades para obtener un resultado numerico util.",
    accent: C.gold,
    fill: C.warm,
  });
  addOperationExample(slide, 7.96, 2.42, 3.12, {
    title: "Comparar",
    code: "const esMayorDeEdad = 20 >= 18;",
    cardTitle: "Boolean",
    body: "Entrega true o false y prepara el terreno para decisiones posteriores.",
    accent: C.navy,
    fill: C.softBlue,
  });

  addCenterStatement(slide, SH, "Dato -> operacion -> resultado", {
    x: 2.12,
    y: 5.62,
    w: 7.8,
    h: 0.56,
    fill: C.white,
    line: C.border,
    fontSize: 17.2,
  });

  validateSlide(slide, pptx);
}

function createAgenticBlock2Slide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El agente puede explicar los datos; tu debes probarlos",
    "En esta etapa ayuda mucho una explicacion rapida, pero sigue siendo necesario cambiar valores, ejecutar y leer resultados.",
    "Bloque 2"
  );

  addDelegationSplit(slide, SH, {
    x: 1.02,
    y: 2.34,
    w: 9.86,
    h: 3.72,
    title: "Que puede acelerar un agente y que no conviene delegar",
    left: {
      title: "Puede ayudar con",
      subtitle: "explicacion inicial y ejemplos cortos",
      items: [
        "explicar que representa una variable",
        "comparar let y const",
        "proponer ejemplos con string, number y boolean",
        "mostrar por que una comparacion da true o false",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene delegar",
      subtitle: "comprension del valor y validacion real",
      items: [
        "copiar variables sin saber que representan",
        "aceptar operaciones sin ejecutarlas",
        "confundir texto con numero por no probar en consola",
        "reutilizar codigo sin cambiar valores ni observar resultados",
      ],
      accent: C.red,
      fill: C.white,
    },
    bridgeLabel: "Practica",
    bridgeBody: "Leer, ejecutar, cambiar un valor y volver a mirar el resultado sigue siendo obligatorio.",
    footer: "Leer -> ejecutar -> cambiar -> observar.",
  });

  validateSlide(slide, pptx);
}

function createBlock2QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas para cerrar el bloque",
    "Antes de pasar a funciones y estructuras de control, conviene fijar por que los datos importan tanto.",
    "Bloque 2"
  );

  addCard(slide, SH, {
    x: 1.0,
    y: 2.44,
    w: 4.82,
    h: 1.18,
    title: "1. ¿Por que un programa necesita representar informacion antes de tomar decisiones?",
    body: "La respuesta deberia conectar datos, operaciones y comportamiento posterior.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 13.6,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 6.0,
    y: 2.44,
    w: 4.82,
    h: 1.18,
    title: "2. ¿Que diferencia practica existe entre let y const?",
    body: "No basta con decir que son palabras reservadas: importa si el valor deberia cambiar o no.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13.6,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 1.0,
    y: 4.02,
    w: 4.82,
    h: 1.18,
    title: "3. ¿Que cambia cuando un valor es texto, numero o booleano?",
    body: "Cada tipo permite operaciones distintas y eso afecta como se lee el codigo.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 13.6,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 6.0,
    y: 4.02,
    w: 4.82,
    h: 1.18,
    title: "4. ¿Por que conviene ejecutar y modificar ejemplos cortos en vez de solo leerlos?",
    body: "Porque el resultado real y la consola muestran si entendiste de verdad lo que hace cada valor.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
    titleFontSize: 13.6,
    bodyFontSize: 8.8,
  });

  validateSlide(slide, pptx);
}

function createBlock2ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del Bloque 2",
    "Ya tenemos datos, variables y operaciones. El siguiente paso es organizar esa logica con funciones y decisiones.",
    "Bloque 2"
  );

  addCenterStatement(slide, SH, "Datos claros permiten decisiones claras.", {
    x: 1.0,
    y: 2.54,
    w: 4.56,
    h: 1.42,
    fill: C.navy,
    line: C.navy,
    color: C.white,
    fontSize: 22,
  });
  addMiniCard(slide, SH, {
    x: 1.18,
    y: 4.46,
    w: 4.16,
    h: 1.06,
    title: "Lo que sigue",
    body: "Funciones agrupan acciones con nombre y if / else decide que camino sigue el programa segun una condicion.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 12.2,
    bodyFontSize: 8.6,
  });

  addControlFlowPanel(slide, SH, {
    x: 5.86,
    y: 2.38,
    w: 5.2,
    h: 3.9,
    title: "Avance del Bloque 3",
    inputTitle: "Funcion",
    inputCode: "verificarAcceso(edad)",
    inputBody: "una misma logica puede reutilizarse cuando recibe datos distintos",
    conditionTitle: "Condicion",
    conditionLabel: "edad >= 18",
    conditionBody: "la estructura de control decide si se cumple o no",
    trueTitle: "Si se cumple",
    trueBody: "Acceso permitido",
    falseTitle: "Si no se cumple",
    falseBody: "Acceso denegado",
    footer: "Datos + funciones + condiciones = primeras decisiones reales.",
  });

  validateSlide(slide, pptx);
}

function createBlock2RealValuesSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Los datos aparecen antes de cualquier decision",
    "En interfaces reales no trabajas con palabras sueltas: trabajas con nombres, precios, cantidades, estados y mensajes.",
    "Bloque 2"
  );

  addValueStateCard(slide, 1.04, 2.26, 2.36, 1.72, {
    title: "producto",
    value: '"Notebook Pro"',
    body: "texto para mostrar un nombre visible.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addValueStateCard(slide, 3.54, 2.26, 2.36, 1.72, {
    title: "precio",
    value: "149990",
    body: "numero para operar y comparar.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });
  addValueStateCard(slide, 6.04, 2.26, 2.36, 1.72, {
    title: "stock",
    value: "12",
    body: "cantidad disponible para tomar decisiones.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });
  addValueStateCard(slide, 8.54, 2.26, 2.36, 1.72, {
    title: "activo",
    value: "true",
    body: "estado simple para habilitar o bloquear algo.",
    accent: C.navy,
    fill: C.white,
    line: C.border,
  });

  addCard(slide, SH, {
    x: 1.0,
    y: 4.42,
    w: 4.84,
    h: 1.12,
    title: "Primero representas",
    body: "Antes de programar una accion, necesitas decidir que informacion existira y en que forma.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 14.2,
    bodyFontSize: 8.9,
  });
  addCard(slide, SH, {
    x: 6.02,
    y: 4.42,
    w: 4.84,
    h: 1.12,
    title: "Despues operas",
    body: "Con esos valores el programa ya puede mostrar, calcular, comparar o decidir algo.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14.2,
    bodyFontSize: 8.9,
  });

  validateSlide(slide, pptx);
}

function createBlock2ValueChangeSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un valor puede cambiar durante la ejecucion",
    "Por eso importa distinguir entre declarar, leer y actualizar un dato dentro del programa.",
    "Bloque 2"
  );

  addCodePanel(slide, SH, {
    x: 1.0,
    y: 2.18,
    w: 5.28,
    h: 2.7,
    title: "Cambio de estado simple",
    code: "let visitas = 0;\nvisitas = visitas + 1;\nconsole.log(visitas);",
    lang: "js",
    fontSize: 9.6,
    textOffsetY: 0.66,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addMiniCard(slide, SH, {
    x: 6.52,
    y: 2.22,
    w: 4.32,
    h: 0.96,
    title: "Valor inicial",
    body: "El programa parte en 0 porque todavia no ha ocurrido ninguna visita.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 12.8,
    bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 6.52,
    y: 3.34,
    w: 4.32,
    h: 0.96,
    title: "Operacion",
    body: "La linea del medio toma el valor actual y lo reemplaza por uno nuevo.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
    titleFontSize: 12.8,
    bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 6.52,
    y: 4.46,
    w: 4.32,
    h: 0.96,
    title: "Resultado observable",
    body: "La consola confirma si el cambio realmente se produjo durante la ejecucion.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
    titleFontSize: 12.8,
    bodyFontSize: 8.6,
  });

  validateSlide(slide, pptx);
}

function createBlock2TypeContrastSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "No es lo mismo un numero que un texto que se le parece",
    "Parte del criterio inicial en JavaScript es no confundir forma visual con tipo real del dato.",
    "Bloque 2"
  );

  addValueStateCard(slide, 1.0, 2.22, 4.82, 1.34, {
    title: 'texto "14990"',
    value: '"14990"',
    body: "se lee como precio, pero sigue siendo texto si no cambias su tipo.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addValueStateCard(slide, 6.0, 2.22, 4.82, 1.34, {
    title: "numero 14990",
    value: "14990",
    body: "sirve para sumar, comparar y operar como cantidad.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });
  addValueStateCard(slide, 1.0, 3.88, 4.82, 1.34, {
    title: 'texto "true"',
    value: '"true"',
    body: "parece estado logico, pero sigue siendo una cadena de texto.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });
  addValueStateCard(slide, 6.0, 3.88, 4.82, 1.34, {
    title: "boolean true",
    value: "true",
    body: "permite decidir entre ramas y activar comportamiento segun condicion.",
    accent: C.navy,
    fill: C.white,
    line: C.border,
  });

  validateSlide(slide, pptx);
}

function createBlock2ReviewSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Antes de usar un valor conviene revisar cuatro cosas",
    "Esa mini rutina evita muchos errores tempranos de lectura y de operaciones equivocadas.",
    "Bloque 2"
  );

  addCard(slide, SH, {
    x: 1.0,
    y: 2.2,
    w: 4.82,
    h: 1.0,
    title: "1. Como se llama",
    body: "El nombre debe dejar clara la idea del dato, no obligarte a adivinarlo.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 14,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 6.0,
    y: 2.2,
    w: 4.82,
    h: 1.0,
    title: "2. Que tipo tiene",
    body: "Texto, numero o boolean no se usan igual aunque se parezcan visualmente.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 1.0,
    y: 3.5,
    w: 4.82,
    h: 1.0,
    title: "3. De donde sale",
    body: "No es lo mismo un valor escrito a mano que uno que llega desde input o desde datos externos.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 14,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 6.0,
    y: 3.5,
    w: 4.82,
    h: 1.0,
    title: "4. Si puede cambiar",
    body: "Esa respuesta te orienta entre const, let y la manera de leer su estado.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
    titleFontSize: 14,
    bodyFontSize: 8.8,
  });
  addCenterStatement(slide, SH, "Nombrar, tipar, ubicar el origen y leer el cambio son parte del criterio basico.", {
    x: 1.18,
    y: 5.02,
    w: 9.62,
    h: 0.6,
    fill: C.navy,
    line: C.navy,
    color: C.white,
    fontSize: 15,
  });

  validateSlide(slide, pptx);
}

function createBlock3IntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Funciones y control: la logica deja de ser una secuencia fija",
    "Ahora JavaScript ya no solo guarda datos: tambien puede agrupar acciones y decidir que camino seguir segun una condicion.",
    "Bloque 3"
  );

  addPanel(slide, 1.0, 2.42, 4.26, 3.88, { fill: C.navy, line: C.navy });
  slide.addText("Una funcion agrupa una accion con nombre.", {
    x: 1.34,
    y: 2.94,
    w: 3.58,
    h: 0.58,
    fontFace: TYPOGRAPHY.display,
    fontSize: 21.2,
    bold: true,
    color: C.white,
    margin: 0,
    align: "center",
    valign: "mid",
  });
  slide.addText(
    "Y una condicion permite que esa logica no responda siempre igual, sino segun el dato que recibe.",
    {
      x: 1.38,
      y: 4.0,
      w: 3.5,
      h: 0.84,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.4,
      color: "DCE6F2",
      margin: 0,
      align: "center",
      valign: "mid",
    }
  );
  addMiniCard(slide, SH, {
    x: 1.28,
    y: 5.24,
    w: 3.62,
    h: 0.76,
    title: "Idea del bloque",
    body: "Funcion + dato + condicion = primeras decisiones reutilizables.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });

  addCodePanel(slide, SH, {
    x: 5.76,
    y: 2.44,
    w: 5.08,
    h: 1.54,
    title: "Funcion simple",
    code: 'function saludar(nombre) {\n  return "Hola, " + nombre;\n}',
    lang: "js",
    fontSize: 10,
    textOffsetY: 0.72,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });
  addControlFlowPanel(slide, SH, {
    x: 5.76,
    y: 4.12,
    w: 5.08,
    h: 2.18,
    title: "Funcion + decision",
    inputTitle: "Entrada",
    inputCode: "edad = 19",
    inputBody: "entra un dato que la funcion debe leer",
    conditionTitle: "if / else",
    conditionLabel: "edad >= 18",
    conditionBody: "la condicion decide que camino sigue",
    outputTitle: "Salidas",
    trueTitle: "Permite",
    trueBody: "Acceso",
    falseTitle: "Niega",
    falseBody: "Acceso",
  });

  validateSlide(slide, pptx);
}

function createFunctionConceptSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Una funcion permite agrupar una accion con nombre",
    "Eso evita repetir instrucciones dispersas y convierte la logica en una pieza reutilizable.",
    "Bloque 3"
  );

  addCodePanel(slide, SH, {
    x: 1.0,
    y: 2.44,
    w: 4.88,
    h: 3.82,
    title: "Funcion minima",
    code: 'function saludar(nombre) {\n  return "Hola, " + nombre;\n}',
    lang: "js",
    fontSize: 10.2,
    textOffsetY: 0.78,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addValueStateCard(slide, 6.18, 2.56, 1.42, 2.22, {
    title: "nombre",
    value: "saludar",
    body: "identifica que accion cumple la funcion dentro del programa.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addValueStateCard(slide, 7.78, 2.56, 1.42, 2.22, {
    title: "dato",
    value: "nombre",
    body: "entra como parametro para que la misma logica sirva varias veces.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });
  addValueStateCard(slide, 9.38, 2.56, 1.42, 2.22, {
    title: "salida",
    value: '"Hola..."',
    body: "devuelve un resultado que puede mostrarse o seguir usandose despues.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });

  addCenterStatement(slide, SH, "Nombre + entrada + resultado", {
    x: 6.18,
    y: 5.16,
    w: 4.62,
    h: 0.8,
    fill: C.white,
    line: C.border,
    fontSize: 18,
  });

  validateSlide(slide, pptx);
}

function createFunctionReuseSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La misma logica puede correrse varias veces sin reescribirla",
    "Ese es el valor practico de una funcion: mantiene la accion y cambia solo el dato que entra.",
    "Bloque 3"
  );

  addCodePanel(slide, SH, {
    x: 1.0,
    y: 2.44,
    w: 4.92,
    h: 3.76,
    title: "Una funcion, varios usos",
    code: 'function saludar(nombre) {\n  return "Hola, " + nombre;\n}\n\nconsole.log(saludar("Ana"));\nconsole.log(saludar("Diego"));',
    lang: "js",
    fontSize: 9.5,
    textOffsetY: 0.72,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addPanel(slide, 6.16, 2.56, 4.68, 1.26, { fill: C.navy, line: C.navy });
  slide.addText("Consola", {
    x: 6.42,
    y: 2.78,
    w: 0.98,
    h: 0.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.6,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addConsoleRow(slide, 6.42, 3.18, 1, '"Hola, Ana"', "A7E3A1");
  addConsoleRow(slide, 6.42, 3.46, 2, '"Hola, Diego"', "89D1FF");

  addMiniCard(slide, SH, {
    x: 6.16,
    y: 4.18,
    w: 4.68,
    h: 0.92,
    title: "Lectura util",
    body: "La funcion no cambia. Lo que cambia es el valor que entra y, por eso, tambien el resultado.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addMiniCard(slide, SH, {
    x: 6.16,
    y: 5.26,
    w: 4.68,
    h: 0.92,
    title: "Idea base",
    body: "Eso prepara una forma de pensar mas cercana al trabajo real: una logica estable para varios casos.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });

  validateSlide(slide, pptx);
}

function createParametersSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Los parametros vuelven reutilizable una misma logica",
    "En vez de escribir una accion distinta para cada situacion, se define una estructura general y cambian solo los datos.",
    "Bloque 3"
  );

  addCodePanel(slide, SH, {
    x: 0.98,
    y: 2.42,
    w: 5.02,
    h: 3.84,
    title: "Calcular total",
    code: "function calcularTotal(precio, descuento) {\n  return precio - descuento;\n}\n\nconsole.log(calcularTotal(10000, 1500));\nconsole.log(calcularTotal(25000, 3000));",
    lang: "js",
    fontSize: 9.4,
    textOffsetY: 0.7,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addValueStateCard(slide, 6.26, 2.56, 2.02, 1.6, {
    title: "logica",
    value: "precio - descuento",
    body: "se mantiene igual en ambos casos.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });
  addValueStateCard(slide, 8.48, 2.56, 2.32, 1.6, {
    title: "parametros",
    value: "10000, 1500 / 25000, 3000",
    body: "cambian segun el caso que entra a la funcion.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });

  addMiniCard(slide, SH, {
    x: 6.26,
    y: 4.46,
    w: 4.54,
    h: 1.12,
    title: "Resultado",
    body: "La misma funcion sirve para distintos totales porque la accion es estable y la entrada varia.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });

  validateSlide(slide, pptx);
}

function createIfElseTemplateSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "if / else permite decidir que camino sigue el programa",
    "Guardar datos y definir funciones todavia no basta si el codigo no puede elegir entre dos respuestas posibles.",
    "Bloque 3"
  );

  addCodePanel(slide, SH, {
    x: 1.02,
    y: 2.42,
    w: 4.78,
    h: 3.86,
    title: "Plantilla minima",
    code: "if (condicion) {\n  // accion si se cumple\n} else {\n  // accion si no se cumple\n}",
    lang: "js",
    fontSize: 10,
    textOffsetY: 0.82,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addControlFlowPanel(slide, SH, {
    x: 6.02,
    y: 2.42,
    w: 5.0,
    h: 3.86,
    title: "Lectura de la estructura",
    inputTitle: "Dato",
    inputCode: "condicion",
    inputBody: "entra una expresion que puede ser verdadera o falsa",
    conditionTitle: "Decision",
    conditionLabel: "true / false",
    conditionBody: "segun el resultado, el programa toma un camino distinto",
    trueTitle: "Si se cumple",
    trueBody: "corre una accion",
    falseTitle: "Si no se cumple",
    falseBody: "corre otra accion",
    footer: "La estructura de control convierte un dato en una decision.",
  });

  validateSlide(slide, pptx);
}

function createDecisionExampleSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Una condicion cambia la respuesta segun el dato",
    "Aqui el programa ya no solo guarda una edad: la interpreta para decidir que mensaje corresponde.",
    "Bloque 3"
  );

  addCodePanel(slide, SH, {
    x: 0.98,
    y: 2.42,
    w: 5.06,
    h: 3.86,
    title: "Edad y acceso",
    code: 'const edad = 19;\n\nif (edad >= 18) {\n  console.log("Puede ingresar");\n} else {\n  console.log("No puede ingresar");\n}',
    lang: "js",
    fontSize: 9.2,
    textOffsetY: 0.7,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addPanel(slide, 6.3, 2.56, 4.56, 1.26, { fill: C.navy, line: C.navy });
  slide.addText("Caso actual", {
    x: 6.56,
    y: 2.78,
    w: 1.2,
    h: 0.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.6,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addConsoleRow(slide, 6.56, 3.18, 1, '"Puede ingresar"', "A7E3A1");

  addMiniCard(slide, SH, {
    x: 6.3,
    y: 4.14,
    w: 4.56,
    h: 0.92,
    title: "Si cambia el dato",
    body: "La misma estructura se mantiene, pero el resultado puede pasar al otro camino.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });
  addMiniCard(slide, SH, {
    x: 6.3,
    y: 5.22,
    w: 4.56,
    h: 0.92,
    title: "Lectura correcta",
    body: "El valor no importa solo por existir: importa porque activa una decision concreta.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });

  validateSlide(slide, pptx);
}

function createCombinedLogicSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Funciones y condiciones suelen aparecer juntas",
    "Ese cruce ya se parece mucho mas al tipo de logica que luego veremos en validaciones, formularios y eventos.",
    "Bloque 3"
  );

  addCodePanel(slide, SH, {
    x: 0.98,
    y: 2.38,
    w: 5.18,
    h: 3.92,
    title: "Funcion con decision interna",
    code: 'function verificarAcceso(edad) {\n  if (edad >= 18) {\n    return "Acceso permitido";\n  }\n\n  return "Acceso denegado";\n}\n\nconsole.log(verificarAcceso(20));\nconsole.log(verificarAcceso(15));',
    lang: "js",
    fontSize: 8.8,
    textOffsetY: 0.68,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addControlFlowPanel(slide, SH, {
    x: 6.38,
    y: 2.46,
    w: 4.62,
    h: 3.84,
    title: "Como se lee",
    inputTitle: "Dato que entra",
    inputCode: "edad",
    inputBody: "la funcion recibe un valor concreto",
    conditionTitle: "Condicion",
    conditionLabel: "edad >= 18",
    conditionBody: "evalua si el dato cumple el criterio",
    outputTitle: "Salidas",
    trueTitle: "Permite",
    trueBody: "Acceso",
    falseTitle: "Niega",
    falseBody: "Acceso",
    footer: "Entrada -> evaluacion -> resultado.",
  });

  validateSlide(slide, pptx);
}

function createAgenticBlock3Slide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El agente puede bosquejar funciones; tu debes leer cada rama",
    "En este punto ya no basta con que el codigo se vea bien: importa que entiendas que entra, que condicion corre y que devuelve cada camino.",
    "Bloque 3"
  );

  addDelegationSplit(slide, SH, {
    x: 1.02,
    y: 2.34,
    w: 9.86,
    h: 3.72,
    title: "Que puede acelerar un agente y que sigue siendo tuyo",
    left: {
      title: "Puede ayudar con",
      subtitle: "primer bosquejo y explicacion de pseudologica",
      items: [
        "traducir una idea verbal a una funcion simple",
        "proponer un if / else inicial",
        "explicar que hace cada rama",
        "simplificar codigo repetido",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene delegar",
      subtitle: "lectura, prueba y validacion de resultados",
      items: [
        "aceptar una funcion porque se ve ordenada",
        "no revisar que devuelve en cada caso",
        "probar solo con un dato de entrada",
        "ignorar una rama que no se ejecuto todavia",
      ],
      accent: C.red,
      fill: C.white,
    },
    bridgeLabel: "Habito",
    bridgeBody: "Nombre de la funcion, dato de entrada, condicion y salida deben leerse paso a paso.",
    footer: "Leer -> seguir la condicion -> probar varios casos.",
  });

  validateSlide(slide, pptx);
}

function createBlock3QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas para cerrar el bloque",
    "Antes de pasar a eventos, conviene fijar por que funciones y condiciones ya cambian la forma de leer el programa.",
    "Bloque 3"
  );

  addCard(slide, SH, {
    x: 1.0,
    y: 2.46,
    w: 4.82,
    h: 1.18,
    title: "1. ¿Que problema resuelve una funcion dentro de un programa?",
    body: "La respuesta deberia mencionar organizacion, nombre y reutilizacion de la logica.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 13.6,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 6.0,
    y: 2.46,
    w: 4.82,
    h: 1.18,
    title: "2. ¿Por que los parametros vuelven reutilizable una misma logica?",
    body: "Porque la accion se mantiene y cambian los datos que entran a la funcion.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13.6,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 1.0,
    y: 4.04,
    w: 4.82,
    h: 1.18,
    title: "3. ¿Que cambia cuando el programa puede decidir entre dos caminos?",
    body: "Pasa de ejecutar una secuencia fija a responder segun datos y condiciones.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 13.6,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 6.0,
    y: 4.04,
    w: 4.82,
    h: 1.18,
    title: "4. ¿Por que conviene probar una funcion con varios valores y no solo con uno?",
    body: "Porque cada dato puede activar una rama distinta y cambiar completamente el resultado.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
    titleFontSize: 13.6,
    bodyFontSize: 8.8,
  });

  validateSlide(slide, pptx);
}

function createBlock3ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del Bloque 3",
    "Ya tenemos logica reutilizable y decisiones. El ultimo paso del martes es conectar eso con acciones reales del usuario.",
    "Bloque 3"
  );

  addCenterStatement(slide, SH, "La logica gana sentido cuando puede reaccionar a una accion real.", {
    x: 1.0,
    y: 2.54,
    w: 4.7,
    h: 1.54,
    fill: C.navy,
    line: C.navy,
    color: C.white,
    fontSize: 20.6,
  });
  addMiniCard(slide, SH, {
    x: 1.18,
    y: 4.5,
    w: 4.18,
    h: 1.04,
    title: "Lo que sigue",
    body: "Eventos como click, input o submit conectan el codigo con acciones reales dentro de la interfaz.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 12.2,
    bodyFontSize: 8.6,
  });

  addEventReactionPanel(slide, SH, {
    x: 5.86,
    y: 2.4,
    w: 5.16,
    h: 3.9,
    title: "Avance del Bloque 4",
    stages: [
      { title: "Usuario", body: "hace click", accent: C.red, fill: C.paleRed },
      { title: "Evento", body: "click", accent: C.gold, fill: C.warm },
      { title: "Handler", body: "listener corre", accent: C.navy, fill: C.softBlue },
      { title: "Respuesta", body: "mensaje visible", accent: "2F8D5A", fill: "DCEFE2" },
    ],
    browserLabel: "Interfaz observada",
    triggerLabel: "Click en boton",
    responseLabel: "Respuesta en UI o consola",
    browserNote: "la interactividad aparece cuando una accion del usuario dispara codigo en el momento correcto",
    footer: "Evento -> handler -> respuesta observable.",
  });

  validateSlide(slide, pptx);
}

function createBlock3FunctionPartsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Una funcion tiene partes que se pueden leer",
    "Entender su anatomia ayuda a dejar de verla como bloque misterioso y empezar a verla como logica organizada.",
    "Bloque 3"
  );

  addCodePanel(slide, SH, {
    x: 1.0,
    y: 2.18,
    w: 5.36,
    h: 2.84,
    title: "Funcion simple",
    code: 'function saludar(nombre) {\n  const mensaje = "Hola " + nombre;\n  console.log(mensaje);\n}',
    lang: "js",
    fontSize: 9.4,
    textOffsetY: 0.66,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addMiniCard(slide, SH, {
    x: 6.58,
    y: 2.2,
    w: 4.24,
    h: 0.96,
    title: "Nombre",
    body: "Le da identidad a una accion para poder invocarla con claridad.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 12.8,
    bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 6.58,
    y: 3.34,
    w: 4.24,
    h: 0.96,
    title: "Parametro",
    body: "Recibe informacion de entrada para no repetir la misma logica muchas veces.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
    titleFontSize: 12.8,
    bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 6.58,
    y: 4.48,
    w: 4.24,
    h: 0.96,
    title: "Cuerpo",
    body: "Es la secuencia de instrucciones que corre cuando llamas la funcion.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
    titleFontSize: 12.8,
    bodyFontSize: 8.6,
  });

  validateSlide(slide, pptx);
}

function createBlock3DecisionTableSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Pensar entradas y salidas ordena la condicion",
    "Antes de escribir un if ayuda listar que entra al programa y que deberia producir cada caso.",
    "Bloque 3"
  );

  addPanel(slide, 1.02, 2.18, 9.94, 3.42, { fill: C.white, line: C.border });
  slide.addText("Entrada", {
    x: 1.36,
    y: 2.42,
    w: 1.0,
    h: 0.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.6,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Condicion", {
    x: 4.56,
    y: 2.42,
    w: 1.2,
    h: 0.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.6,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Salida esperada", {
    x: 7.54,
    y: 2.42,
    w: 1.8,
    h: 0.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.6,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  const rows = [
    { y: 2.88, input: "stock = 0", cond: "stock > 0", output: '"Agotado"', fill: C.paleRed },
    { y: 3.58, input: "stock = 8", cond: "stock > 0", output: '"Disponible"', fill: C.softBlue },
    { y: 4.28, input: "stock = -1", cond: "dato invalido", output: '"Revisar valor"', fill: C.warm },
  ];
  rows.forEach((row) => {
    addPanel(slide, 1.28, row.y, 2.18, 0.46, { fill: row.fill, line: row.fill === C.white ? C.border : row.fill });
    addPanel(slide, 4.3, row.y, 2.18, 0.46, { fill: C.white, line: C.border });
    addPanel(slide, 7.34, row.y, 2.44, 0.46, { fill: C.white, line: C.border });
    slide.addText(row.input, {
      x: 1.44, y: row.y + 0.15, w: 1.8, h: 0.12, fontFace: "Aptos Mono", fontSize: 9.2, color: C.navy, margin: 0,
    });
    slide.addText(row.cond, {
      x: 4.46, y: row.y + 0.15, w: 1.8, h: 0.12, fontFace: "Aptos Mono", fontSize: 9.2, color: C.navy, margin: 0,
    });
    slide.addText(row.output, {
      x: 7.5, y: row.y + 0.15, w: 2.08, h: 0.12, fontFace: "Aptos Mono", fontSize: 9.2, color: C.navy, margin: 0,
    });
  });

  addMiniCard(slide, SH, {
    x: 1.28,
    y: 5.04,
    w: 8.5,
    h: 0.34,
    title: "",
    body: "Si puedes explicar entrada, regla y salida, la condicion ya tiene forma legible.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    bodyFontSize: 8.3,
  });

  validateSlide(slide, pptx);
}

function createBlock3ReadBranchesSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cada rama debe poder explicarse con palabras",
    "Leer un if no es recitar simbolos: es explicar que pasa si la condicion se cumple y que pasa si no.",
    "Bloque 3"
  );

  addCenterStatement(slide, SH, "Entrada -> regla -> salida", {
    x: 3.18,
    y: 2.18,
    w: 5.06,
    h: 0.8,
    fill: C.navy,
    line: C.navy,
    color: C.white,
    fontSize: 18.2,
  });

  addCard(slide, SH, {
    x: 1.0,
    y: 3.4,
    w: 3.06,
    h: 1.28,
    title: "Entrada",
    body: "Que dato llega a la condicion y en que estado viene.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 14.2,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 4.36,
    y: 3.4,
    w: 3.06,
    h: 1.28,
    title: "Regla",
    body: "Que comparacion decide el camino y por que esa comparacion tiene sentido.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 14.2,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 7.72,
    y: 3.4,
    w: 3.06,
    h: 1.28,
    title: "Salida",
    body: "Que accion o mensaje aparece en cada rama y como se valida.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14.2,
    bodyFontSize: 8.8,
  });

  addMiniCard(slide, SH, {
    x: 1.44,
    y: 5.04,
    w: 8.92,
    h: 0.42,
    title: "Practica sana",
    body: "Si no puedes decir en voz alta que ocurre en cada rama, el if todavia no esta suficientemente entendido.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
    titleFontSize: 12.2,
    bodyFontSize: 8.5,
  });

  validateSlide(slide, pptx);
}

function createBlock3ErrorPatternsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Errores comunes con funciones y condiciones",
    "Muchos problemas iniciales no son de sintaxis, sino de lectura logica incompleta.",
    "Bloque 3"
  );

  addCard(slide, SH, {
    x: 1.0,
    y: 2.2,
    w: 4.82,
    h: 1.02,
    title: "Repetir logica en vez de encapsularla",
    body: "Terminas con el mismo bloque copiado varias veces y mas dificil de corregir.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 13.8,
    bodyFontSize: 8.7,
  });
  addCard(slide, SH, {
    x: 6.0,
    y: 2.2,
    w: 4.82,
    h: 1.02,
    title: "Crear una funcion sin entrada clara",
    body: "Si no sabes que recibe, tampoco queda claro que debe producir.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13.8,
    bodyFontSize: 8.7,
  });
  addCard(slide, SH, {
    x: 1.0,
    y: 3.48,
    w: 4.82,
    h: 1.02,
    title: "Dejar una rama sin salida visible",
    body: "El programa toma un camino, pero nadie entiende que paso ni por que.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 13.8,
    bodyFontSize: 8.7,
  });
  addCard(slide, SH, {
    x: 6.0,
    y: 3.48,
    w: 4.82,
    h: 1.02,
    title: "Usar condiciones sin explicar la regla",
    body: "La comparacion funciona, pero se siente arbitraria y fragil.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
    titleFontSize: 13.8,
    bodyFontSize: 8.7,
  });
  addCenterStatement(slide, SH, "Una funcion ordena. Una condicion explica una decision. Las dos deben poder leerse.", {
    x: 1.26,
    y: 5.02,
    w: 9.54,
    h: 0.62,
    fill: C.navy,
    line: C.navy,
    color: C.white,
    fontSize: 14.8,
  });

  validateSlide(slide, pptx);
}

function createBlock4IntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Una interfaz deja de ser estatica cuando puede reaccionar",
    "Despues de datos, funciones y decisiones, el ultimo paso del martes es conectar esa logica con acciones reales del usuario.",
    "Bloque 4"
  );

  addPanel(slide, 1.0, 2.44, 4.18, 3.86, { fill: C.navy, line: C.navy });
  slide.addText("JavaScript vuelve interactiva una pagina cuando escucha una accion y responde.", {
    x: 1.34,
    y: 2.96,
    w: 3.5,
    h: 0.92,
    fontFace: TYPOGRAPHY.display,
    fontSize: 20.6,
    bold: true,
    color: C.white,
    margin: 0,
    align: "center",
    valign: "mid",
  });
  slide.addText(
    "Click, escritura o envio son ejemplos de cosas que el navegador detecta. El codigo importa porque corre en el momento correcto.",
    {
      x: 1.36,
      y: 4.2,
      w: 3.46,
      h: 0.86,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.2,
      color: "DCE6F2",
      margin: 0,
      align: "center",
      valign: "mid",
    }
  );
  addMiniCard(slide, SH, {
    x: 1.28,
    y: 5.24,
    w: 3.56,
    h: 0.78,
    title: "Idea del bloque",
    body: "Evento -> listener -> respuesta observable.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });

  addEventReactionPanel(slide, SH, {
    x: 5.66,
    y: 2.46,
    w: 5.24,
    h: 3.84,
    title: "Primera interactividad",
    stages: [
      { title: "Usuario", body: "hace click", accent: C.red, fill: C.paleRed },
      { title: "Evento", body: "click", accent: C.gold, fill: C.warm },
      { title: "Handler", body: "listener corre", accent: C.navy, fill: C.softBlue },
      { title: "Respuesta", body: "mensaje visible", accent: "2F8D5A", fill: "DCEFE2" },
    ],
    browserLabel: "Interfaz observada",
    triggerLabel: "Click en boton",
    responseLabel: "Respuesta en UI o consola",
    browserNote: "la accion del usuario activa una respuesta tecnica en el momento correcto",
    footer: "El codigo deja de ser teorico cuando reacciona.",
  });

  validateSlide(slide, pptx);
}

function createFrequentEventsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Primeros eventos utiles: click, input y submit",
    "No hace falta cubrir todo el navegador de una vez. Basta con entender algunos eventos frecuentes y para que sirven.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 0.98,
    y: 2.46,
    w: 3.12,
    h: 1.16,
    title: "click",
    body: "cuando el usuario presiona un boton o un elemento interactivo.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 18,
    bodyFontSize: 9.2,
  });
  addCard(slide, SH, {
    x: 4.5,
    y: 2.46,
    w: 3.12,
    h: 1.16,
    title: "input",
    body: "cuando cambia el contenido de un campo mientras la persona escribe.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 18,
    bodyFontSize: 9.2,
  });
  addCard(slide, SH, {
    x: 8.02,
    y: 2.46,
    w: 3.12,
    h: 1.16,
    title: "submit",
    body: "cuando un formulario intenta enviarse y el codigo puede reaccionar.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 18,
    bodyFontSize: 9.2,
  });

  addBrowserMock(slide, SH, {
    x: 1.12,
    y: 4.04,
    w: 4.22,
    h: 1.78,
    url: "https://demo.local/form",
  });
  slide.addShape(SH.roundRect, {
    x: 1.34,
    y: 4.58,
    w: 1.34,
    h: 0.32,
    rectRadius: 0.03,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("Boton", {
    x: 1.56,
    y: 4.67,
    w: 0.9,
    h: 0.08,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8,
    bold: true,
    color: C.white,
    margin: 0,
    align: "center",
  });
  addPanel(slide, 2.94, 4.54, 1.82, 0.38, { fill: C.white, line: C.border });
  slide.addText("campo input", {
    x: 3.2,
    y: 4.66,
    w: 1.3,
    h: 0.08,
    fontFace: TYPOGRAPHY.body,
    fontSize: 7.8,
    color: C.slate,
    margin: 0,
    align: "center",
  });

  addMiniCard(slide, SH, {
    x: 6.1,
    y: 4.1,
    w: 4.74,
    h: 1.54,
    title: "Lectura minima",
    body: "click sirve para reaccionar a una accion puntual; input para observar cambios mientras se escribe; submit para responder cuando un formulario intenta enviarse.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
    titleFontSize: 12.4,
    bodyFontSize: 8.7,
  });

  validateSlide(slide, pptx);
}

function createListenerSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un listener escucha un evento y dispara una respuesta",
    "El foco aqui no es memorizar DOM todavia, sino entender la secuencia general: elemento, evento y accion.",
    "Bloque 4"
  );

  addCodePanel(slide, SH, {
    x: 0.98,
    y: 2.38,
    w: 5.18,
    h: 3.92,
    title: "Primer listener basico",
    code: 'const boton = document.querySelector("#saludar");\n\nboton.addEventListener("click", () => {\n  console.log("Se hizo clic en el boton");\n});',
    lang: "js",
    fontSize: 9.2,
    textOffsetY: 0.7,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addValueStateCard(slide, 6.38, 2.56, 1.34, 2.22, {
    title: "elemento",
    value: "boton",
    body: "es la referencia que luego recibe el evento.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addValueStateCard(slide, 7.94, 2.56, 1.34, 2.22, {
    title: "evento",
    value: '"click"',
    body: "marca la accion que el navegador debe escuchar.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });
  addValueStateCard(slide, 9.5, 2.56, 1.34, 2.22, {
    title: "respuesta",
    value: "console.log()",
    body: "corre cuando el evento ocurre de verdad.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });

  addCenterStatement(slide, SH, "Elemento -> evento -> respuesta", {
    x: 6.26,
    y: 5.18,
    w: 4.72,
    h: 0.82,
    fill: C.white,
    line: C.border,
    fontSize: 17.4,
  });

  validateSlide(slide, pptx);
}

function createWhenLogicRunsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La logica no solo importa por lo que hace, sino por cuando corre",
    "Un evento conecta una accion del usuario con el momento exacto en que el codigo debe ejecutarse.",
    "Bloque 4"
  );

  addCodePanel(slide, SH, {
    x: 1.0,
    y: 2.42,
    w: 4.86,
    h: 2.1,
    title: "Misma logica, otro momento",
    code: 'const edad = 17;\n\nif (edad >= 18) {\n  console.log("Puede continuar");\n} else {\n  console.log("Debe esperar");\n}',
    lang: "js",
    fontSize: 9.2,
    textOffsetY: 0.74,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addEventReactionPanel(slide, SH, {
    x: 6.0,
    y: 2.42,
    w: 5.0,
    h: 3.86,
    title: "Cuando esa logica se dispara por una accion",
    stages: [
      { title: "Usuario", body: "envia dato", accent: C.red, fill: C.paleRed },
      { title: "Evento", body: "click o submit", accent: C.gold, fill: C.warm },
      { title: "Handler", body: "evalua edad", accent: C.navy, fill: C.softBlue },
      { title: "Respuesta", body: "permite o niega", accent: "2F8D5A", fill: "DCEFE2" },
    ],
    browserLabel: "La interfaz ya no es fija",
    triggerLabel: "Interaccion real",
    responseLabel: "Decision visible",
    browserNote: "la misma condicion gana sentido cuando se ejecuta por una accion del usuario",
    footer: "La interactividad define el momento de ejecucion.",
  });

  validateSlide(slide, pptx);
}

function createValidationLoopSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La interactividad inicial tambien se valida en navegador",
    "Con eventos ya no basta con leer codigo: hay que interactuar, mirar consola y verificar si la respuesta coincide con la intencion.",
    "Bloque 4"
  );

  addBrowserMock(slide, SH, {
    x: 1.02,
    y: 2.46,
    w: 4.58,
    h: 2.1,
    url: "https://demo.local/registro",
  });
  addPanel(slide, 1.24, 3.0, 1.54, 0.36, { fill: C.red, line: C.red });
  slide.addText("Enviar", {
    x: 1.5,
    y: 3.1,
    w: 1.02,
    h: 0.08,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.2,
    bold: true,
    color: C.white,
    margin: 0,
    align: "center",
  });
  addPanel(slide, 3.04, 2.96, 2.12, 0.42, { fill: C.white, line: C.border });
  slide.addText("campo input", {
    x: 3.34,
    y: 3.08,
    w: 1.52,
    h: 0.08,
    fontFace: TYPOGRAPHY.body,
    fontSize: 7.8,
    color: C.slate,
    margin: 0,
    align: "center",
  });

  addPanel(slide, 6.12, 2.46, 4.8, 2.1, { fill: C.navy, line: C.navy });
  slide.addText("Consola", {
    x: 6.38,
    y: 2.68,
    w: 1.0,
    h: 0.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addConsoleRow(slide, 6.38, 3.08, 1, '"submit escuchado"', "A7E3A1");
  addConsoleRow(slide, 6.38, 3.38, 2, '"faltan datos"', "F6E29A");
  addConsoleRow(slide, 6.38, 3.68, 3, '"flujo validado"', "89D1FF");

  addProcessStep(slide, 1.18, 5.1, "Escribir", "el listener y la respuesta esperada.", C.red, C.paleRed);
  addArrow(slide, 3.62, 5.36, 0.18, 0.22, C.gold);
  addProcessStep(slide, 3.88, 5.1, "Ejecutar", "abrir la pagina y provocar el evento.", C.navy, C.softBlue);
  addArrow(slide, 6.32, 5.36, 0.18, 0.22, C.gold);
  addProcessStep(slide, 6.58, 5.1, "Mirar", "consola y respuesta visible.", C.gold, C.warm);
  addArrow(slide, 9.02, 5.36, 0.18, 0.22, C.gold);
  addProcessStep(slide, 9.28, 5.1, "Ajustar", "si el comportamiento no coincide.", C.navy, C.softBlue);

  validateSlide(slide, pptx);
}

function createCommonMistakeSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Error comun: aceptar una interaccion que no entiendes",
    "Con eventos aparecen problemas nuevos: elegir mal el evento, ejecutar varias veces o dar por bueno un comportamiento que no era el esperado.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 0.98,
    y: 2.46,
    w: 3.18,
    h: 1.16,
    title: "Evento incorrecto",
    body: "el codigo escucha otra accion y la respuesta no ocurre cuando deberia.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 16.4,
    bodyFontSize: 9.1,
  });
  addCard(slide, SH, {
    x: 4.48,
    y: 2.46,
    w: 3.18,
    h: 1.16,
    title: "Varias ejecuciones",
    body: "la accion se dispara mas de una vez y la interfaz ya no coincide con la intencion.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 16.4,
    bodyFontSize: 9.1,
  });
  addCard(slide, SH, {
    x: 7.98,
    y: 2.46,
    w: 3.18,
    h: 1.16,
    title: "Explicacion vacia",
    body: "el codigo parece correcto, pero nadie verifico si la respuesta era realmente la esperada.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16.4,
    bodyFontSize: 9.1,
  });

  addMiniCard(slide, SH, {
    x: 1.14,
    y: 4.18,
    w: 9.8,
    h: 1.16,
    title: "Lectura util",
    body: "En eventos no basta con que el codigo se vea ordenado. Hay que preguntar: se ejecuto cuando correspondia, una sola vez y con la respuesta correcta?",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 12.8,
    bodyFontSize: 9,
  });

  addCenterStatement(slide, SH, "La evidencia esta en la interaccion real, no solo en el snippet.", {
    x: 2.02,
    y: 5.62,
    w: 7.9,
    h: 0.58,
    fill: C.white,
    line: C.border,
    fontSize: 16.8,
  });

  validateSlide(slide, pptx);
}

function createAgenticBlock4Slide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El agente puede proponer listeners; tu debes validar la interaccion",
    "Aqui el apoyo sirve mucho para una primera version, pero no reemplaza navegador, consola ni prueba directa del comportamiento.",
    "Bloque 4"
  );

  addDelegationSplit(slide, SH, {
    x: 1.02,
    y: 2.34,
    w: 9.86,
    h: 3.72,
    title: "Que puede acelerar un agente y que no conviene delegar",
    left: {
      title: "Puede ayudar con",
      subtitle: "esqueleto inicial y ejemplos pequenos",
      items: [
        "proponer un listener basico",
        "explicar que hace addEventListener",
        "sugerir un click o submit inicial",
        "simplificar una primera interaccion corta",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene delegar",
      subtitle: "seleccion del evento y validacion real",
      items: [
        "asumir que el evento elegido era el correcto",
        "creer que corre en el momento esperado sin probarlo",
        "aceptar la explicacion sin interactuar con la pagina",
        "ignorar consola y respuesta visible",
      ],
      accent: C.red,
      fill: C.white,
    },
    bridgeLabel: "Practica",
    bridgeBody: "Entender la accion, probarla y ajustar con criterio sigue siendo obligatorio.",
    footer: "Entender -> bosquejar -> probar -> validar.",
  });

  validateSlide(slide, pptx);
}

function createBlock4QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas para cerrar el bloque",
    "Antes del cierre general, conviene fijar como se conecta la logica con una accion real del usuario.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 1.0,
    y: 2.44,
    w: 4.82,
    h: 1.18,
    title: "1. ¿Que convierte a una pagina en una interfaz mas interactiva y no solo estatica?",
    body: "La respuesta deberia mencionar escucha de eventos y respuesta observable.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 13.6,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 6.0,
    y: 2.44,
    w: 4.82,
    h: 1.18,
    title: "2. ¿Que diferencia existe entre escribir una funcion y decidir cuando debe ejecutarse?",
    body: "Una cosa define la logica; la otra la conecta con una accion o momento concreto.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13.6,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 1.0,
    y: 4.02,
    w: 4.82,
    h: 1.18,
    title: "3. ¿Por que click, input y submit son buenos primeros eventos para aprender?",
    body: "Porque aparecen mucho en interfaces reales y permiten entender interaccion rapidamente.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 13.6,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 6.0,
    y: 4.02,
    w: 4.82,
    h: 1.18,
    title: "4. ¿Por que la validacion de eventos requiere navegador y no solo lectura de codigo?",
    body: "Porque importa si la accion ocurre en el momento correcto y con la respuesta esperada.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
    titleFontSize: 13.6,
    bodyFontSize: 8.8,
  });

  validateSlide(slide, pptx);
}

function createBlock4ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del Bloque 4",
    "Con este bloque la clase ya deja instalada la entrada a la interactividad. El miercoles conectaremos eventos con DOM y lectura de datos.",
    "Bloque 4"
  );

  addCenterStatement(slide, SH, "Los eventos conectan la logica con acciones reales del usuario.", {
    x: 1.0,
    y: 2.54,
    w: 4.76,
    h: 1.52,
    fill: C.navy,
    line: C.navy,
    color: C.white,
    fontSize: 20.4,
  });
  addMiniCard(slide, SH, {
    x: 1.18,
    y: 4.48,
    w: 4.2,
    h: 1.08,
    title: "Lo que sigue",
    body: "El miercoles veremos DOM, lectura de elementos y consumo simple de datos con fetch.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 12.2,
    bodyFontSize: 8.6,
  });

  addMiniCard(slide, SH, {
    x: 6.0,
    y: 2.6,
    w: 4.94,
    h: 0.92,
    title: "Cadena del martes",
    body: "Datos -> operaciones -> funciones -> condiciones -> eventos -> interactividad",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
    titleFontSize: 12,
    bodyFontSize: 8.4,
  });
  addMiniCard(slide, SH, {
    x: 6.0,
    y: 3.72,
    w: 4.94,
    h: 0.92,
    title: "Idea metodologica",
    body: "Un agente puede acelerar ejemplos iniciales, pero el criterio sigue estando en ejecutar, leer y validar.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
    titleFontSize: 12,
    bodyFontSize: 8.4,
  });
  addMiniCard(slide, SH, {
    x: 6.0,
    y: 4.84,
    w: 4.94,
    h: 0.92,
    title: "Puente al miercoles",
    body: "Ya no miraremos solo codigo. Empezaremos a tocar elementos reales del DOM y a traer datos externos.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 12,
    bodyFontSize: 8.4,
  });

  validateSlide(slide, pptx);
}

function createBlock4EventTimelineSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un evento activa una cadena completa",
    "No basta con nombrar click o submit. Lo importante es entender que paso dispara la logica y donde se ve la respuesta.",
    "Bloque 4"
  );

  addPanel(slide, 1.0, 2.1, 10.04, 3.46, { fill: C.white, line: C.border });
  slide.addText("Cadena de reaccion basica", {
    x: 1.24,
    y: 2.32,
    w: 2.4,
    h: 0.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.4,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  const stages = [
    { x: 1.24, title: "1. Accion", body: "clic en boton", fill: C.paleRed, line: C.paleRed, accent: C.red },
    { x: 3.72, title: "2. Evento", body: "click", fill: C.warm, line: C.warm, accent: C.gold },
    { x: 6.2, title: "3. Handler", body: "ejecuta la funcion", fill: C.softBlue, line: C.softBlue, accent: C.navy },
    { x: 8.68, title: "4. Respuesta", body: "mensaje o cambio visible", fill: C.white, line: C.border, accent: C.navy },
  ];
  stages.forEach((stage, index) => {
    addMiniCard(slide, SH, {
      x: stage.x,
      y: 2.86,
      w: 1.94,
      h: 0.98,
      title: stage.title,
      body: stage.body,
      accent: stage.accent,
      fill: stage.fill,
      line: stage.line,
      titleFontSize: 12,
      bodyFontSize: 8.0,
    });
    if (index < stages.length - 1) {
      addArrow(slide, stage.x + 2.04, 3.2, 0.18, 0.24, C.gold);
    }
  });

  addPanel(slide, 1.24, 4.24, 9.48, 0.82, { fill: C.warm, line: C.warm });
  slide.addText("Interfaz observada", {
    x: 1.48,
    y: 4.5,
    w: 1.6,
    h: 0.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 11.8,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  addPanel(slide, 3.24, 4.42, 2.74, 0.28, { fill: C.red, line: C.red });
  addPanel(slide, 6.14, 4.42, 3.72, 0.28, { fill: C.softBlue, line: C.softBlue });
  slide.addText("clic en boton", {
    x: 3.7, y: 4.505, w: 1.7, h: 0.1, fontFace: TYPOGRAPHY.body, fontSize: 8.1, bold: true, color: C.white, margin: 0,
  });
  slide.addText("respuesta en consola o UI", {
    x: 6.94, y: 4.505, w: 2.22, h: 0.1, fontFace: TYPOGRAPHY.body, fontSize: 8.1, color: C.navy, margin: 0,
  });

  addPanel(slide, 1.24, 5.18, 9.48, 0.38, { fill: C.paleRed, line: C.paleRed });
  slide.addText("Lectura correcta: no pienses solo en la funcion. Piensa en que la activa, cuando corre y que evidencia deja.", {
    x: 1.46,
    y: 5.3,
    w: 9.0,
    h: 0.1,
    fontFace: TYPOGRAPHY.display,
    fontSize: 10.8,
    bold: true,
    color: C.navy,
    margin: 0,
    fit: "shrink",
  });

  validateSlide(slide, pptx);
}

function createBlock4ChooseEventSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Elegir bien el evento cambia el resultado",
    "Click, input y submit no son intercambiables. Cada uno encaja mejor con cierto tipo de accion del usuario.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 1.0,
    y: 2.22,
    w: 3.12,
    h: 2.88,
    title: "click",
    body: "Sirve cuando una persona activa algo de forma puntual.\n\nBuen uso: botones, menus, acciones visibles.\n\nRiesgo: usarlo para todo y terminar con interacciones poco claras.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 15,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 4.46,
    y: 2.22,
    w: 3.12,
    h: 2.88,
    title: "input",
    body: "Sirve cuando quieres reaccionar mientras el valor cambia.\n\nBuen uso: campos, filtros, busqueda.\n\nRiesgo: disparar demasiada logica sin revisar el ritmo.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 15,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 7.92,
    y: 2.22,
    w: 3.12,
    h: 2.88,
    title: "submit",
    body: "Sirve cuando una accion cierra el envio de un formulario.\n\nBuen uso: contacto, login, busqueda formal.\n\nRiesgo: tratarlo como click y olvidar su contexto de formulario.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 15,
    bodyFontSize: 8.8,
  });

  validateSlide(slide, pptx);
}

function createBlock4DebugChecklistSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Si un evento no responde, revisa esto primero",
    "La depuracion inicial no parte adivinando. Parte comprobando puntos concretos de la cadena de interaccion.",
    "Bloque 4"
  );

  addPanel(slide, 1.0, 2.16, 5.02, 3.32, { fill: C.navy, line: C.navy });
  slide.addText("Checklist rapido", {
    x: 1.24,
    y: 2.34,
    w: 1.8,
    h: 0.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.8,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addConsoleRow(slide, 1.24, 2.84, 1, "El elemento correcto existe", "DCE6F2", 8.8);
  addConsoleRow(slide, 1.24, 3.12, 2, "El listener quedo conectado", "DCE6F2", 8.8);
  addConsoleRow(slide, 1.24, 3.4, 3, "El evento elegido era el adecuado", "DCE6F2", 8.8);
  addConsoleRow(slide, 1.24, 3.68, 4, "La funcion si se ejecuta", "DCE6F2", 8.8);
  addConsoleRow(slide, 1.24, 3.96, 5, "La respuesta visible aparece donde esperas", "F2D26B", 8.8);
  addMiniCard(slide, SH, {
    x: 1.22,
    y: 4.7,
    w: 4.28,
    h: 0.38,
    title: "",
    body: "Sin esa secuencia, el debugging queda en intuicion.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    bodyFontSize: 8.3,
  });

  addCard(slide, SH, {
    x: 6.18,
    y: 2.18,
    w: 4.72,
    h: 1.04,
    title: "Pregunta 1",
    body: "¿La accion del usuario realmente ocurre sobre el elemento correcto?",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 14,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 6.18,
    y: 3.44,
    w: 4.72,
    h: 1.04,
    title: "Pregunta 2",
    body: "¿El navegador muestra evidencia de ejecucion en consola o en la interfaz?",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14,
    bodyFontSize: 8.8,
  });
  addCard(slide, SH, {
    x: 6.18,
    y: 4.7,
    w: 4.72,
    h: 0.78,
    title: "Pregunta 3",
    body: "¿El problema es de evento, de logica o de resultado visible?",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 14,
    bodyFontSize: 8.8,
  });

  validateSlide(slide, pptx);
}

function createBlock4InteractionQualitySlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Interaccion clara versus interaccion fragil",
    "No basta con que algo pase. Importa si la respuesta tiene sentido para quien usa la pagina.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 1.0,
    y: 2.18,
    w: 4.82,
    h: 2.94,
    title: "Interaccion clara",
    body: "El evento corresponde con la accion del usuario.\n\nLa respuesta aparece donde se espera.\n\nLa consola ayuda a validar sin reemplazar lo visible.\n\nLa interfaz deja entender que ocurrio.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 15.2,
    bodyFontSize: 9,
  });
  addCard(slide, SH, {
    x: 6.0,
    y: 2.18,
    w: 4.82,
    h: 2.94,
    title: "Interaccion fragil",
    body: "El evento se eligio por costumbre y no por criterio.\n\nLa funcion corre, pero nadie entiende la respuesta.\n\nSe acepta la primera version sin probar.\n\nEl comportamiento queda dificil de sostener.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 15.2,
    bodyFontSize: 9,
  });

  addPanel(slide, 1.46, 5.34, 8.96, 0.3, { fill: C.warm, line: C.warm });
  slide.addShape(SH.rect, {
    x: 1.56,
    y: 5.44,
    w: 0.1,
    h: 0.1,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addText("La calidad de una interaccion se valida en uso real, no en una explicacion bonita.", {
    x: 1.78,
    y: 5.425,
    w: 8.3,
    h: 0.11,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.1,
    color: C.navy,
    margin: 0,
    fit: "shrink",
  });

  validateSlide(slide, pptx);
}

function createClassClosingIntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre de la Clase",
    "Cerramos la entrada inicial a JavaScript como paso desde paginas estaticas hacia interfaces con logica y comportamiento observable.",
    "Cierre"
  );

  addCenterStatement(slide, SH, "JavaScript empieza cuando la interfaz necesita guardar informacion, decidir algo con ella y reaccionar en el momento correcto.", {
    x: 1.0,
    y: 2.24,
    w: 10.0,
    h: 1.34,
    fill: C.navy,
    line: C.navy,
    color: C.white,
    fontSize: 22,
  });

  addMiniCard(slide, SH, {
    x: 1.0,
    y: 4.24,
    w: 3.2,
    h: 1.08,
    title: "Del martes deberia quedar",
    body: "JavaScript como capa de comportamiento frente a HTML y CSS.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 12.6,
    bodyFontSize: 8.8,
  });
  addMiniCard(slide, SH, {
    x: 4.38,
    y: 4.24,
    w: 3.2,
    h: 1.08,
    title: "No es solo sintaxis",
    body: "Tambien es lectura de datos, decisiones y reaccion observable.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
    titleFontSize: 12.6,
    bodyFontSize: 8.8,
  });
  addMiniCard(slide, SH, {
    x: 7.76,
    y: 4.24,
    w: 3.2,
    h: 1.08,
    title: "Lo que habilita",
    body: "El paso al miercoles: DOM, seleccion de elementos y fetch.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
    titleFontSize: 12.6,
    bodyFontSize: 8.8,
  });

  validateSlide(slide, pptx);
}

function createClassRecapFlowSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La cadena logica del martes",
    "El recorrido de la clase no fue una lista de temas sueltos. Fue una secuencia que prepara comportamiento real.",
    "Cierre"
  );

  addPanel(slide, 0.94, 2.08, 10.12, 3.76, { fill: C.white, line: C.border });
  slide.addText("Del dato a la interactividad", {
    x: 1.16,
    y: 2.3,
    w: 2.84,
    h: 0.14,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.6,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  const steps = [
    { kicker: "1", title: "Datos", body: "valores con los que trabaja el programa", fill: C.paleRed, line: C.paleRed, accent: C.red, x: 1.16, y: 2.92 },
    { kicker: "2", title: "Operaciones", body: "transformar, comparar o combinar informacion", fill: C.warm, line: C.warm, accent: C.gold, x: 4.06, y: 2.92 },
    { kicker: "3", title: "Funciones", body: "agrupar acciones reutilizables", fill: C.softBlue, line: C.softBlue, accent: C.navy, x: 6.96, y: 2.92 },
    { kicker: "4", title: "Condiciones", body: "decidir entre caminos posibles", fill: C.white, line: C.border, accent: C.navy, x: 1.16, y: 4.26 },
    { kicker: "5", title: "Eventos", body: "disparar esa logica en el momento correcto", fill: C.paleRed, line: C.paleRed, accent: C.red, x: 4.06, y: 4.26 },
    { kicker: "6", title: "Interactividad", body: "respuesta visible para una accion del usuario", fill: C.softBlue, line: C.softBlue, accent: C.navy, x: 6.96, y: 4.26 },
  ];

  steps.forEach((step) => {
    addMiniCard(slide, SH, {
      x: step.x,
      y: step.y,
      w: 2.52,
      h: 0.96,
      title: `${step.kicker}. ${step.title}`,
      body: step.body,
      accent: step.accent,
      fill: step.fill,
      line: step.line,
      titleFontSize: 12.6,
      bodyFontSize: 8.2,
    });
  });

  addArrow(slide, 3.72, 3.26, 0.22, 0.28, C.gold);
  addArrow(slide, 6.62, 3.26, 0.22, 0.28, C.gold);
  addArrow(slide, 8.16, 4.02, 0.26, 0.22, C.gold);
  slide.addShape(SH.chevron, {
    x: 8.44,
    y: 4.02,
    w: 0.16,
    h: 0.22,
    rotate: 90,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addShape(SH.chevron, {
    x: 8.44,
    y: 4.24,
    w: 0.16,
    h: 0.22,
    rotate: 90,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  addArrow(slide, 3.72, 4.6, 0.22, 0.28, C.gold);
  addArrow(slide, 6.62, 4.6, 0.22, 0.28, C.gold);

  addMiniCard(slide, SH, {
    x: 1.12,
    y: 5.34,
    w: 9.72,
    h: 0.34,
    title: "",
    body: "Si esta cadena queda clara, el DOM del miercoles ya no aparece como magia sino como siguiente paso natural.",
    accent: C.navy,
    fill: C.warm,
    line: C.warm,
    bodyFontSize: 8.5,
  });

  validateSlide(slide, pptx);
}

function createInstalledIdeasSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Ideas que deberian quedar instaladas",
    "Estas son las relaciones que importa poder explicar despues de la clase, no solo recordar de memoria.",
    "Cierre"
  );

  addCard(slide, SH, {
    x: 1.0,
    y: 2.18,
    w: 4.82,
    h: 1.16,
    title: "JavaScript trabaja una capa distinta",
    body: "HTML estructura, CSS presenta y JavaScript gobierna comportamiento.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 14.2,
    bodyFontSize: 9,
  });
  addCard(slide, SH, {
    x: 6.0,
    y: 2.18,
    w: 4.82,
    h: 1.16,
    title: "Sin datos no hay decisiones",
    body: "Variables y tipos permiten representar informacion antes de operar con ella.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14.2,
    bodyFontSize: 9,
  });
  addCard(slide, SH, {
    x: 1.0,
    y: 3.62,
    w: 4.82,
    h: 1.16,
    title: "Las funciones no viven aisladas",
    body: "Ayudan a organizar logica que luego puede dispararse en distintos momentos.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 14.2,
    bodyFontSize: 9,
  });
  addCard(slide, SH, {
    x: 6.0,
    y: 3.62,
    w: 4.82,
    h: 1.16,
    title: "Un evento decide cuando corre la logica",
    body: "Click, input y submit conectan codigo con acciones reales del usuario.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
    titleFontSize: 14.2,
    bodyFontSize: 9,
  });
  addCenterStatement(slide, SH, "El martes instala la base mental. El miercoles empezamos a tocar la interfaz real.", {
    x: 1.44,
    y: 5.16,
    w: 9.0,
    h: 0.64,
    fill: C.navy,
    line: C.navy,
    color: C.white,
    fontSize: 15.2,
  });

  validateSlide(slide, pptx);
}

function createMethodologyClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Apoyo con agentes, pero con criterio",
    "La clase tambien instala una forma de trabajo: entender la logica, apoyarse con inteligencia y validar comportamiento real.",
    "Cierre"
  );

  addDelegationSplit(slide, SH, {
    x: 1.02,
    y: 2.1,
    w: 9.98,
    h: 3.38,
    title: "Que puede acelerar un agente y que debes seguir validando tu",
    leftTitle: "Puede ayudar con",
    leftSubtitle: "explicacion, bosquejo y primera version",
    leftItems: [
      "explicar sintaxis inicial de variables, if o funciones",
      "proponer un ejemplo corto de evento o listener",
      "sugerir una primera estructura de codigo",
      "comparar dos maneras simples de resolver algo",
    ],
    centerTitle: "Validacion real",
    centerBody: "La prueba sigue estando en consola, navegador y comportamiento observable.",
    centerFooter: "Si no se ejecuta bien, no basta con que suene correcto.",
    rightTitle: "No conviene delegar",
    rightSubtitle: "lectura critica y juicio tecnico",
    rightItems: [
      "aceptar una solucion sin ejecutarla",
      "copiar codigo sin entender entradas y salidas",
      "dar por correcta una interaccion sin probarla",
      "confundir explicacion bonita con comportamiento valido",
    ],
    footerText: "Entender -> apoyarse -> ejecutar -> leer -> validar.",
  });

  validateSlide(slide, pptx);
}

function createNextClassBridgeSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Puente a la siguiente clase",
    "El miercoles sube la densidad tecnica: ya no veremos solo logica inicial, sino trabajo directo sobre la pagina y datos externos.",
    "Cierre"
  );

  addCenterStatement(slide, SH, "Del comportamiento basico pasamos a manipulacion directa del DOM y consumo inicial de datos con fetch.", {
    x: 1.0,
    y: 2.18,
    w: 10.0,
    h: 1.12,
    fill: C.navy,
    line: C.navy,
    color: C.white,
    fontSize: 20.2,
  });

  const items = [
    { title: "DOM", body: "seleccionar y leer elementos reales de la pagina", fill: C.paleRed, line: C.paleRed, accent: C.red },
    { title: "Interfaz", body: "mostrar cambios visibles en respuesta al codigo", fill: C.softBlue, line: C.softBlue, accent: C.navy },
    { title: "fetch", body: "traer informacion externa y empezar a usarla", fill: C.warm, line: C.warm, accent: C.gold },
    { title: "Depuracion", body: "seguir validando con consola y navegador", fill: C.white, line: C.border, accent: C.navy },
  ];

  let x = 1.08;
  items.forEach((item) => {
    addMiniCard(slide, SH, {
      x,
      y: 4.1,
      w: 2.34,
      h: 1.18,
      title: item.title,
      body: item.body,
      accent: item.accent,
      fill: item.fill,
      line: item.line,
      titleFontSize: 12.6,
      bodyFontSize: 8.4,
    });
    x += 2.48;
  });

  addPanel(slide, 1.26, 5.42, 9.48, 0.42, {
    fill: C.paleRed,
    line: C.paleRed,
  });
  slide.addShape(SH.rect, {
    x: 1.34,
    y: 5.53,
    w: 0.1,
    h: 0.1,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("Lo que cambia: el objetivo ya no sera solo entender sintaxis; sera hacer que la pagina responda a elementos y datos concretos.", {
    x: 1.52,
    y: 5.5,
    w: 9.0,
    h: 0.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 11.6,
    bold: true,
    color: C.navy,
    margin: 0,
    fit: "shrink",
  });

  validateSlide(slide, pptx);
}

async function main() {
  createCoverSlide();
  createMapSlide();
  createBlockIntroSlide();
  createStaticVsInteractiveSlide();
  createLayersSlide();
  createScriptExecutionSlide();
  createConsoleSlide();
  createAgenticSlide();
  createQuestionsSlide();
  createClosingSlide();
  createBlock1RealPageSlide();
  createBlock1ExecutionFlowSlide();
  createBlock1ConsoleChecklistSlide();
  createBlock1MistakesSlide();
  createBlock2IntroSlide();
  createNeedDataSlide();
  createVariablesSlide();
  createLetConstSlide();
  createTypesBoardSlide();
  createTypeofSlide();
  createOperationsSlide();
  createAgenticBlock2Slide();
  createBlock2QuestionsSlide();
  createBlock2ClosingSlide();
  createBlock2RealValuesSlide();
  createBlock2ValueChangeSlide();
  createBlock2TypeContrastSlide();
  createBlock2ReviewSlide();
  createBlock3IntroSlide();
  createFunctionConceptSlide();
  createFunctionReuseSlide();
  createParametersSlide();
  createIfElseTemplateSlide();
  createDecisionExampleSlide();
  createCombinedLogicSlide();
  createAgenticBlock3Slide();
  createBlock3QuestionsSlide();
  createBlock3ClosingSlide();
  createBlock3FunctionPartsSlide();
  createBlock3DecisionTableSlide();
  createBlock3ReadBranchesSlide();
  createBlock3ErrorPatternsSlide();
  createBlock4IntroSlide();
  createFrequentEventsSlide();
  createListenerSlide();
  createWhenLogicRunsSlide();
  createValidationLoopSlide();
  createCommonMistakeSlide();
  createAgenticBlock4Slide();
  createBlock4QuestionsSlide();
  createBlock4ClosingSlide();
  createBlock4EventTimelineSlide();
  createBlock4ChooseEventSlide();
  createBlock4DebugChecklistSlide();
  createBlock4InteractionQualitySlide();
  createClassClosingIntroSlide();
  createClassRecapFlowSlide();
  createInstalledIdeasSlide();
  createMethodologyClosingSlide();
  createNextClassBridgeSlide();

  await pptx.writeFile({ fileName: outputPptx });
  fs.copyFileSync(__filename, outputJs);
  console.log(`Deck generado: ${outputPptx}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
