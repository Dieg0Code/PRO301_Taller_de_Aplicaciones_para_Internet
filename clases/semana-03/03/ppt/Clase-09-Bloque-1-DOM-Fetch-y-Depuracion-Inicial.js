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
  addDomTreePanel,
  addDomMutationFlow,
  addDebugEvidenceBoard,
  addJsonPanel,
  addRequestResponseFlow,
} = components;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
applyAiepTheme(pptx, {
  author: "Codex",
  company: "AIEP",
  subject: "Clase 09",
  title: "Manipulación del DOM, fetch y depuración inicial",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx =
  process.env.PPTX_OUTPUT ||
  path.join(rootDir, "Clase-09-Bloque-1-DOM-Fetch-y-Depuracion-Inicial.pptx");
const outputJs =
  process.env.PPTX_SOURCE_OUTPUT ||
  path.join(rootDir, "Clase-09-Bloque-1-DOM-Fetch-y-Depuracion-Inicial.js");

const logoMarkPath = path.resolve(
  __dirname,
  "../../../../../.agent/skills/slides-aiep/assets/logo-aiep-mark.png"
);

function addHeader(slide, title, subtitle, blockLabel = "Bloque 1", pptxLike = pptx) {
  systemAddHeader(slide, SH, pptxLike, title, subtitle, blockLabel, {
    classLabel: `Clase 09 · ${blockLabel}`,
    logoMarkPath,
    subtitleY: 1.84,
    subtitleH: 0.3,
    subtitleFontSize: 11.2,
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

function addBarsMotif(slide, x, y, scale = 1, fill = C.red) {
  slide.addShape(SH.rect, {
    x,
    y: y + 0.18 * scale,
    w: 0.18 * scale,
    h: 0.42 * scale,
    fill: { color: fill },
    line: { color: fill },
  });
  slide.addShape(SH.rect, {
    x: x + 0.22 * scale,
    y,
    w: 0.22 * scale,
    h: 0.6 * scale,
    fill: { color: fill },
    line: { color: fill },
  });
  slide.addShape(SH.rect, {
    x: x + 0.48 * scale,
    y: y + 0.18 * scale,
    w: 0.18 * scale,
    h: 0.42 * scale,
    fill: { color: fill },
    line: { color: fill },
  });
}

function addMapBlock(slide, x, y, w, h, opts = {}) {
  addPanel(slide, x, y, w, h, {
    fill: opts.fill || C.white,
    line: opts.line || C.border,
  });
  slide.addText(opts.kicker || "Bloque", {
    x,
    y: y + 0.14,
    w,
    h: 0.1,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.4,
    bold: true,
    color: opts.kickerColor || C.navy,
    align: "center",
    margin: 0,
  });
  slide.addText(opts.title || "", {
    x: x + 0.16,
    y: y + 0.5,
    w: w - 0.32,
    h: h - 0.72,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.fontSize || 14.8,
    bold: true,
    color: opts.color || C.navy,
    align: "center",
    valign: "mid",
    margin: 0,
    fit: "shrink",
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

function addDevtoolsMock(slide, x, y, w, h) {
  addPanel(slide, x, y, w, h, {
    fill: C.paper,
    line: C.border,
  });

  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h: 0.28,
    rectRadius: 0.03,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });

  ["D62027", "E0BC5A", "52606D"].forEach((color, index) => {
    slide.addShape(SH.ellipse, {
      x: x + 0.1 + index * 0.1,
      y: y + 0.1,
      w: 0.05,
      h: 0.05,
      fill: { color },
      line: { color },
    });
  });

  slide.addText("DevTools · Elements", {
    x: x + 0.36,
    y: y + 0.09,
    w: w - 0.5,
    h: 0.1,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  const leftW = w * 0.38;
  addPanel(slide, x + 0.14, y + 0.42, leftW, h - 0.58, {
    fill: C.white,
    line: C.border,
  });
  slide.addText("<body>", {
    x: x + 0.24,
    y: y + 0.56,
    w: leftW - 0.2,
    h: 0.1,
    fontFace: "Aptos Mono",
    fontSize: 8.2,
    color: C.navy,
    margin: 0,
  });
  slide.addText("  <main>", {
    x: x + 0.24,
    y: y + 0.84,
    w: leftW - 0.2,
    h: 0.1,
    fontFace: "Aptos Mono",
    fontSize: 8.2,
    color: C.slate,
    margin: 0,
  });
  slide.addText('    <h1 id="titulo">', {
    x: x + 0.24,
    y: y + 1.12,
    w: leftW - 0.2,
    h: 0.1,
    fontFace: "Aptos Mono",
    fontSize: 8.2,
    color: C.red,
    margin: 0,
  });
  slide.addText("    <button>", {
    x: x + 0.24,
    y: y + 1.4,
    w: leftW - 0.2,
    h: 0.1,
    fontFace: "Aptos Mono",
    fontSize: 8.2,
    color: C.gold,
    margin: 0,
  });

  const rightX = x + leftW + 0.28;
  const rightW = w - leftW - 0.42;
  addPanel(slide, rightX, y + 0.42, rightW, h - 0.58, {
    fill: C.white,
    line: C.border,
  });
  slide.addText("Nodo inspeccionado", {
    x: rightX + 0.14,
    y: y + 0.56,
    w: rightW - 0.28,
    h: 0.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 11,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  addPanel(slide, rightX + 0.14, y + 0.86, rightW - 0.28, 0.44, {
    fill: C.softBlue,
    line: C.softBlue,
  });
  slide.addText('h1#titulo', {
    x: rightX + 0.22,
    y: y + 1.01,
    w: rightW - 0.44,
    h: 0.1,
    fontFace: "Aptos Mono",
    fontSize: 8.4,
    bold: true,
    color: C.navy,
    margin: 0,
    align: "center",
  });
  slide.addText("Aquí ves jerarquía, id, clase y posición real dentro del documento.", {
    x: rightX + 0.16,
    y: y + 1.52,
    w: rightW - 0.32,
    h: 0.48,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.2,
    color: C.ink,
    margin: 0,
    fit: "shrink",
    valign: "mid",
  });
}

function createCoverSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };

  addBarsMotif(slide, 0.78, 0.66, 1.18, C.red);
  slide.addImage({
    path: logoMarkPath,
    x: 11.56,
    y: 0.58,
    w: 0.76,
    h: 0.44,
  });

  slide.addText("Clase 09 · Bloque 1", {
    x: 1.68,
    y: 0.76,
    w: 2.36,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.2,
    bold: true,
    color: C.white,
    margin: 0,
  });

  slide.addText("El DOM como documento vivo", {
    x: 0.78,
    y: 1.46,
    w: 5.86,
    h: 0.82,
    fontFace: TYPOGRAPHY.display,
    fontSize: 24.8,
    bold: true,
    color: C.white,
    margin: 0,
  });

  slide.addText(
    "La interfaz deja de ser solo un archivo estático: ahora el navegador muestra una estructura viva que puede inspeccionarse, seleccionarse y modificarse con evidencia.",
    {
      x: 0.78,
      y: 2.42,
      w: 5.28,
      h: 0.76,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.6,
      color: "DCE6F2",
      margin: 0,
      valign: "mid",
    }
  );

  addPanel(slide, 0.78, 3.42, 5.38, 1.2, {
    fill: "29486F",
    line: "29486F",
  });
  slide.addText(
    "El DOM es la versión viva del documento con la que JavaScript realmente trabaja.",
    {
      x: 1.04,
      y: 3.78,
      w: 4.86,
      h: 0.48,
      fontFace: TYPOGRAPHY.display,
      fontSize: 18.2,
      bold: true,
      color: C.white,
      align: "center",
      valign: "mid",
      margin: 0,
    }
  );

  addPanel(slide, 0.78, 5.28, 2.84, 0.82, {
    fill: "355B8E",
    line: "355B8E",
  });
  slide.addShape(SH.rect, {
    x: 0.94,
    y: 5.48,
    w: 0.08,
    h: 0.42,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("Miércoles 1 de abril de 2026\n10:50 - 13:10", {
    x: 1.16,
    y: 5.46,
    w: 2.22,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    color: C.white,
    margin: 0,
    breakLine: false,
  });

  addPanel(slide, 6.88, 1.42, 5.34, 4.68, {
    fill: C.paper,
    line: C.paper,
  });
  slide.addText("Recorrido del bloque", {
    x: 7.18,
    y: 1.78,
    w: 2.14,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.2,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("HTML fuente", {
    x: 7.18,
    y: 2.26,
    w: 1.44,
    h: 0.16,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16.2,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("lo escrito en el archivo antes de que el navegador lo interprete", {
    x: 7.18,
    y: 2.58,
    w: 1.96,
    h: 0.46,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    color: C.slate,
    margin: 0,
    valign: "mid",
  });
  addArrow(slide, 9.3, 2.52, 0.28, 0.34, C.gold);
  slide.addText("DOM vivo", {
    x: 9.74,
    y: 2.26,
    w: 1.34,
    h: 0.16,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16.2,
    bold: true,
    color: C.red,
    margin: 0,
  });
  slide.addText("jerarquía real que DevTools deja inspeccionar y que JavaScript puede recorrer", {
    x: 9.74,
    y: 2.58,
    w: 2.08,
    h: 0.46,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    color: C.slate,
    margin: 0,
    valign: "mid",
  });
  addArrow(slide, 9.3, 3.74, 0.28, 0.34, C.gold);
  slide.addText("Selectores", {
    x: 9.74,
    y: 3.48,
    w: 1.4,
    h: 0.16,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16.2,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  slide.addText("apuntan a nodos concretos para leer contenido y preparar cambios visibles", {
    x: 9.74,
    y: 3.8,
    w: 2.08,
    h: 0.46,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    color: C.slate,
    margin: 0,
    valign: "mid",
  });

  addPanel(slide, 7.18, 4.84, 4.46, 0.9, {
    fill: C.softBlue,
    line: C.softBlue,
  });
  slide.addText('document.querySelector("h1")', {
    x: 7.42,
    y: 5.12,
    w: 3.98,
    h: 0.16,
    fontFace: "Aptos Mono",
    fontSize: 11,
    bold: true,
    color: C.navy,
    margin: 0,
    align: "center",
  });

  validateSlide(slide, pptx);
  return;
  addHeader(
    slide,
    "Bloque 1 · El DOM como documento vivo",
    "El miércoles deja de hablar solo de estructura estática: ahora el navegador muestra una interfaz que puede inspeccionarse, seleccionarse y modificarse.",
    "Bloque 1"
  );

  addCenterStatement(
    slide,
    SH,
    "El DOM es la versión viva del documento con la que JavaScript realmente trabaja.",
    {
      x: 1.06,
      y: 2.18,
      w: 9.84,
      h: 1.04,
      fill: C.navy,
      line: C.navy,
      color: C.white,
      fontSize: 20.4,
    }
  );

  addMiniCard(slide, SH, {
    x: 1.18,
    y: 3.74,
    w: 3.04,
    h: 1.1,
    title: "HTML fuente",
    body: "es el documento escrito en el archivo antes de que el navegador lo interprete.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 4.46,
    y: 3.74,
    w: 3.04,
    h: 1.1,
    title: "DOM vivo",
    body: "es la jerarquía que el navegador construye y que DevTools deja inspeccionar.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 7.74,
    y: 3.74,
    w: 3.04,
    h: 1.1,
    title: "Selectores",
    body: "apuntan a nodos concretos para leer contenido o preparar cambios visibles.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });

  addCodePanel(slide, SH, {
    x: 2.16,
    y: 5.2,
    w: 7.7,
    h: 1.08,
    title: "Primer contacto real",
    code: 'const titulo = document.querySelector("h1");\nconsole.log(titulo);',
    lang: "js",
    fontSize: 8.8,
    titleFill: C.titleFill,
  });

  validateSlide(slide, pptx);
}

function createMapSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Mapa de la clase",
    "La sesión avanza desde el modelo mental del DOM hacia operaciones visibles, datos externos y debugging inicial.",
    "Bloque 1"
  );

  addMapBlock(slide, 1.02, 2.4, 2.26, 1.6, {
    kicker: "Bloque 1",
    title: "DOM como documento vivo",
    fill: C.paleRed,
    line: C.paleRed,
    kickerColor: C.red,
  });
  addArrow(slide, 3.48, 3.02, 0.18, 0.24);
  addMapBlock(slide, 3.78, 2.4, 2.26, 1.6, {
    kicker: "Bloque 2",
    title: "Seleccionar, leer y modificar",
    fill: C.white,
    line: C.border,
  });
  addArrow(slide, 6.24, 3.02, 0.18, 0.24);
  addMapBlock(slide, 6.54, 2.4, 2.26, 1.6, {
    kicker: "Bloque 3",
    title: "fetch y consumo simple de datos",
    fill: C.white,
    line: C.border,
  });
  addArrow(slide, 9.0, 3.02, 0.18, 0.24);
  addMapBlock(slide, 9.3, 2.4, 2.26, 1.6, {
    kicker: "Bloque 4",
    title: "Depuración y evidencia",
    fill: C.white,
    line: C.border,
    fontSize: 13.6,
  });

  addCard(slide, SH, {
    x: 1.26,
    y: 4.56,
    w: 9.98,
    h: 1.28,
    title: "La idea rectora del miércoles",
    body: "La página ya no se observa solo como estructura y estilo. Se empieza a leer como un sistema donde DOM, código, datos y herramientas del navegador se conectan y se comprueban con evidencia.",
    fill: C.navy,
    line: C.navy,
    accent: C.red,
    titleColor: C.white,
    bodyColor: C.white,
    titleFontSize: 16.4,
    bodyFontSize: 10.2,
  });

  validateSlide(slide, pptx);
}

function createHtmlVsDomSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "HTML y DOM no son exactamente lo mismo",
    "El archivo es la fuente. El DOM es la estructura viva que el navegador arma en memoria y que JavaScript puede recorrer.",
    "Bloque 1"
  );

  addCard(slide, SH, {
    x: 1.08,
    y: 2.34,
    w: 4.56,
    h: 2.38,
    title: "HTML en el archivo",
    body: "Es el documento escrito por la persona que desarrolla. Contiene etiquetas, atributos y contenido, pero todavía no es la interfaz viva sobre la que el navegador y JavaScript operan.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 18,
    bodyFontSize: 10.8,
  });

  addArrow(slide, 5.86, 3.24, 0.28, 0.36);

  addCard(slide, SH, {
    x: 6.34,
    y: 2.34,
    w: 4.56,
    h: 2.38,
    title: "DOM en el navegador",
    body: "Es la representación viva del documento. Aquí ya existe una jerarquía que DevTools deja inspeccionar y que JavaScript puede seleccionar, leer y modificar.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 18,
    bodyFontSize: 10.8,
  });

  addCenterStatement(
    slide,
    SH,
    "Pensar en DOM cambia la pregunta: ya no es “qué etiquetas escribí”, sino “qué estructura real está viendo y manipulando el navegador”.",
    {
      x: 1.2,
      y: 5.16,
      w: 9.66,
      h: 0.78,
      fill: C.warm,
      line: C.warm,
      color: C.navy,
      fontSize: 15.2,
    }
  );

  validateSlide(slide, pptx);
}

function createDomTreeSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El DOM se entiende mejor como un árbol",
    "La interfaz no es una superficie plana. Es una jerarquía de nodos donde cada elemento vive dentro de otro y ocupa un lugar concreto.",
    "Bloque 1"
  );

  addDomTreePanel(slide, SH, {
    x: 0.98,
    y: 2.24,
    w: 5.24,
    h: 3.56,
    title: "Jerarquía del documento",
    subtitle: "Cada nodo vive dentro de otro y puede inspeccionarse.",
    nodes: [
      { tag: "document", detail: "punto de partida", tone: "blue" },
      { tag: "body", detail: "zona visible", depth: 1, tone: "neutral" },
      { tag: "main", detail: "contenido principal", depth: 2, tone: "gold" },
      { tag: "h1", detail: "nodo seleccionable", depth: 3, tone: "red" },
      { tag: "button", detail: "nodo interactivo", depth: 3, tone: "gold" },
    ],
    rowH: 0.36,
    rowGap: 0.08,
  });

  addCard(slide, SH, {
    x: 6.54,
    y: 2.28,
    w: 4.12,
    h: 1.38,
    title: "Qué instala este modelo",
    body: "La página deja de sentirse mágica cuando se reconoce que cada cambio ocurre sobre un nodo específico de una jerarquía real.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
    titleFontSize: 15.6,
    bodyFontSize: 9.2,
  });
  addMiniCard(slide, SH, {
    x: 6.54,
    y: 3.92,
    w: 1.9,
    h: 1.18,
    title: "Inspección",
    body: "ver dónde está el nodo antes de tocar código.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 11.6,
    bodyFontSize: 8,
  });
  addMiniCard(slide, SH, {
    x: 8.76,
    y: 3.92,
    w: 1.9,
    h: 1.18,
    title: "Selección",
    body: "apuntar con criterio al elemento correcto.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 11.6,
    bodyFontSize: 8,
  });
  addMiniCard(slide, SH, {
    x: 6.54,
    y: 5.18,
    w: 4.12,
    h: 0.78,
    title: "Idea clave",
    body: "El DOM no es teoría aparte: es la estructura que conecta HTML, DevTools y JavaScript.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 11.8,
    bodyFontSize: 8.4,
  });

  validateSlide(slide, pptx);
}

function createDevtoolsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "DevTools deja ver el DOM real",
    "Antes de seleccionar o modificar algo, conviene abrir el panel de elementos y comprobar qué estructura existe de verdad.",
    "Bloque 1"
  );

  addDevtoolsMock(slide, 0.98, 2.24, 6.42, 3.86);

  addCard(slide, SH, {
    x: 7.7,
    y: 2.32,
    w: 3.18,
    h: 1.34,
    title: "Qué mirar primero",
    body: "jerarquía, ids, clases, contenedores y el lugar exacto donde vive el nodo que quieres leer.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
    titleFontSize: 15.2,
    bodyFontSize: 9.2,
  });
  addMiniCard(slide, SH, {
    x: 7.7,
    y: 3.92,
    w: 3.18,
    h: 0.92,
    title: "Práctica sana",
    body: "mirar primero el DOM real reduce mucho los selectores mal planteados.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 11.8,
    bodyFontSize: 8.2,
  });
  addMiniCard(slide, SH, {
    x: 7.7,
    y: 5.02,
    w: 3.18,
    h: 0.92,
    title: "Error común",
    body: "intentar modificar la interfaz sin comprobar antes qué nodo existe realmente.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 11.8,
    bodyFontSize: 8.2,
  });

  validateSlide(slide, pptx);
}

function createSelectorSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Seleccionar un nodo es el primer gesto técnico real",
    "El punto no es memorizar un selector: es entender que JavaScript obtiene una referencia a un elemento concreto del DOM.",
    "Bloque 1"
  );

  addCodePanel(slide, SH, {
    x: 1.0,
    y: 2.28,
    w: 4.84,
    h: 3.26,
    title: "Selector inicial",
    code: 'const titulo = document.querySelector("h1");\nconsole.log(titulo);\nconsole.log(titulo.textContent);',
    lang: "js",
    fontSize: 8.6,
    titleFill: C.titleFill,
  });

  addPanel(slide, 6.16, 2.32, 4.58, 2.56, {
    fill: C.paper,
    line: C.border,
  });
  slide.addText("Interfaz observada", {
    x: 6.34,
    y: 2.48,
    w: 4.2,
    h: 0.14,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 6.34,
    y: 2.88,
    w: 4.22,
    h: 0.48,
    rectRadius: 0.03,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Título principal del proyecto", {
    x: 6.5,
    y: 3.05,
    w: 3.88,
    h: 0.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15.2,
    bold: true,
    color: C.red,
    margin: 0,
    align: "center",
  });
  addMiniCard(slide, SH, {
    x: 6.16,
    y: 5.06,
    w: 4.58,
    h: 0.88,
    title: "Qué deja claro el ejemplo",
    body: "No estamos cambiando la página “entera”; estamos obteniendo una referencia al nodo correcto para observarlo o prepararlo para un cambio.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 11.8,
    bodyFontSize: 8.2,
  });

  validateSlide(slide, pptx);
}

function createMutationFlowSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Leer y modificar el DOM sigue una cadena clara",
    "El cambio visible aparece cuando se selecciona el nodo correcto, se toca la propiedad adecuada y luego se valida el resultado.",
    "Bloque 1"
  );

  addDomMutationFlow(slide, SH, {
    x: 1.02,
    y: 2.3,
    w: 9.92,
    h: 3.66,
    footer: "Primero se ubica el nodo. Después se cambia algo concreto. Recién ahí la interfaz responde.",
  });

  validateSlide(slide, pptx);
}

function createEvidenceSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El DOM también se valida con evidencia",
    "Si una lectura o un selector suena correcto pero no coincide con lo que ves en el navegador, todavía no está validado.",
    "Bloque 1"
  );

  addDebugEvidenceBoard(slide, SH, {
    x: 0.98,
    y: 2.3,
    w: 9.96,
    h: 3.6,
    title: "Dónde comprobar que el DOM está bien leído",
    cards: [
      {
        title: "Elements",
        body: "Confirma si el nodo existe y si la jerarquía coincide con lo que supones.",
        question: "¿Ese elemento vive donde creías?",
        accent: C.red,
        fill: C.paleRed,
        icon: "sheet",
      },
      {
        title: "Console",
        body: "Mira qué devuelve el selector y qué valor está leyendo el script.",
        question: "¿El selector trajo un nodo real?",
        accent: C.gold,
        fill: C.warm,
        icon: "sql",
      },
      {
        title: "Resultado visible",
        body: "Comprueba si el nodo correcto cambia y si el efecto coincide con la intención.",
        question: "¿La interfaz mostró el cambio esperado?",
        accent: C.navy,
        fill: C.softBlue,
        icon: "building",
      },
    ],
    footer: "Un selector no queda validado por sonar lógico: queda validado cuando coincide con DOM, consola e interfaz.",
  });

  validateSlide(slide, pptx);
}

function createAgenticSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El agente puede explicar; tú validas el DOM real",
    "En este bloque ayuda mucho una buena explicación o un selector inicial, pero la estructura real debe comprobarse en navegador y consola.",
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
        "explicar la diferencia entre HTML y DOM",
        "proponer un selector corto con querySelector",
        "traducir un árbol HTML a una lectura más clara",
        "resumir qué hace una línea de código",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene delegar",
      subtitle: "lectura técnica, prueba real y validación final",
      items: [
        "decidir si el nodo existe sin abrir DevTools",
        "dar por bueno un selector no ejecutado",
        "confundir una explicación bonita con evidencia",
        "asumir que el DOM real coincide con el ejemplo",
      ],
      accent: C.red,
      fill: C.white,
    },
    bridgeLabel: "Verificación",
    bridgeBody: "El apoyo sirve para destrabar. La validez del selector se confirma en el navegador real.",
    footer: "Entender -> inspeccionar -> ejecutar -> validar.",
  });

  validateSlide(slide, pptx);
}

function createQuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas para fijar el bloque",
    "El objetivo no es repetir definiciones, sino responder con claridad qué estructura existe, cómo se inspecciona y qué parte del DOM estamos tocando.",
    "Bloque 1"
  );

  addCenterStatement(
    slide,
    SH,
    "Si el DOM es una estructura viva, entonces cada cambio visible depende de leer bien esa estructura antes de tocarla.",
    {
      x: 1.12,
      y: 2.16,
      w: 9.76,
      h: 0.92,
      fill: C.navy,
      line: C.navy,
      color: C.white,
      fontSize: 18.2,
    }
  );

  addCard(slide, SH, {
    x: 1.08,
    y: 3.56,
    w: 3.1,
    h: 1.82,
    title: "Pregunta 1",
    body: "¿Qué diferencia práctica hay entre el archivo HTML y el DOM que interpreta el navegador?",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 15.6,
    bodyFontSize: 10.2,
  });
  addCard(slide, SH, {
    x: 4.5,
    y: 3.56,
    w: 3.1,
    h: 1.82,
    title: "Pregunta 2",
    body: "¿Por qué conviene mirar el DOM primero en DevTools antes de intentar modificar algo con JavaScript?",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 15.6,
    bodyFontSize: 10.2,
  });
  addCard(slide, SH, {
    x: 7.92,
    y: 3.56,
    w: 3.1,
    h: 1.82,
    title: "Pregunta 3",
    body: "¿Qué gana un desarrollador cuando deja de pensar la página como superficie y la lee como jerarquía?",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 15.6,
    bodyFontSize: 10.2,
  });

  validateSlide(slide, pptx);
}

function createClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del bloque 1",
    "El DOM deja instalada la primera relación fuerte entre documento, navegador, selector y verificación técnica.",
    "Bloque 1"
  );

  addMiniCard(slide, SH, {
    x: 1.22,
    y: 2.44,
    w: 2.96,
    h: 1.14,
    title: "DOM",
    body: "es la estructura viva sobre la que JavaScript opera.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 4.5,
    y: 2.44,
    w: 2.96,
    h: 1.14,
    title: "DevTools",
    body: "permite inspeccionar el árbol real antes de modificarlo.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 7.78,
    y: 2.44,
    w: 2.96,
    h: 1.14,
    title: "Selectores",
    body: "conectan código con un nodo específico del documento.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });

  addCenterStatement(
    slide,
    SH,
    "Puente al bloque 2: ahora que la estructura viva ya se entiende, pasamos a seleccionar elementos concretos, leer propiedades y modificar la interfaz con resultados visibles.",
    {
      x: 1.1,
      y: 4.24,
      w: 9.82,
      h: 1.08,
      fill: C.navy,
      line: C.navy,
      color: C.white,
      fontSize: 17.4,
    }
  );

  addPanel(slide, 1.52, 5.6, 8.98, 0.4, {
    fill: C.paleRed,
    line: C.paleRed,
  });
  slide.addText("La práctica sana del miércoles parte así: mirar la estructura, elegir bien el nodo y recién después intervenir la interfaz.", {
    x: 1.82,
    y: 5.71,
    w: 8.4,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.2,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
    fit: "shrink",
  });

  validateSlide(slide, pptx);
}

function createBlock2OpeningSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Bloque 2 · Seleccionar, leer y modificar elementos",
    "Ahora el DOM deja de ser solo un modelo mental: empezamos a apuntar a nodos concretos, leer su estado y producir cambios visibles.",
    "Bloque 2"
  );

  addCenterStatement(
    slide,
    SH,
    "Manipular el DOM empieza por seleccionar bien, leer con criterio y recién después intervenir la interfaz.",
    {
      x: 1.02,
      y: 2.22,
      w: 9.98,
      h: 1,
      fill: C.navy,
      line: C.navy,
      color: C.white,
      fontSize: 19.2,
    }
  );

  addMiniCard(slide, SH, {
    x: 1.18,
    y: 3.72,
    w: 3.02,
    h: 1.12,
    title: "Seleccionar",
    body: "ubicar el nodo exacto dentro del DOM usando un id o un selector claro.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 4.48,
    y: 3.72,
    w: 3.02,
    h: 1.12,
    title: "Leer",
    body: "mirar texto, valor o atributos antes de asumir qué estado tiene la interfaz.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 7.78,
    y: 3.72,
    w: 3.02,
    h: 1.12,
    title: "Modificar",
    body: "aplicar un cambio pequeño y visible que pueda comprobarse en navegador.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });

  addCodePanel(slide, SH, {
    x: 2.08,
    y: 5.16,
    w: 7.84,
    h: 1.12,
    title: "Primer movimiento del bloque",
    code: 'const titulo = document.getElementById("titulo-principal");\nconsole.log(titulo);',
    lang: "js",
    fontSize: 8.8,
    titleFill: C.titleFill,
  });

  validateSlide(slide, pptx);
}

function createTargetNodeSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "JavaScript no cambia la página completa de una vez",
    "Trabaja sobre nodos concretos del DOM. Por eso la primera decisión técnica del bloque es elegir bien qué elemento estás apuntando.",
    "Bloque 2"
  );

  addCard(slide, SH, {
    x: 1.08,
    y: 2.36,
    w: 4.76,
    h: 2.52,
    title: "La unidad real de trabajo",
    body: "Cuando un script modifica una interfaz, no actúa sobre una abstracción difusa llamada \"página\". Actúa sobre un nodo específico: un título, un botón, un mensaje, un input o un enlace determinado dentro del DOM.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 17.4,
    bodyFontSize: 10.4,
  });

  addMiniCard(slide, SH, {
    x: 6.18,
    y: 2.38,
    w: 1.48,
    h: 1.28,
    title: "Nodo",
    body: "qué parte exacta del DOM se quiere tocar.",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 11.4,
    bodyFontSize: 7.8,
  });
  addMiniCard(slide, SH, {
    x: 7.92,
    y: 2.38,
    w: 1.48,
    h: 1.28,
    title: "Referencia",
    body: "variable que guarda ese elemento para poder usarlo.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
    titleFontSize: 11.4,
    bodyFontSize: 7.8,
  });
  addMiniCard(slide, SH, {
    x: 9.66,
    y: 2.38,
    w: 1.48,
    h: 1.28,
    title: "Acción",
    body: "leer o cambiar una propiedad concreta y visible.",
    fill: C.white,
    line: C.border,
    accent: C.gold,
    titleFontSize: 11.4,
    bodyFontSize: 7.8,
  });

  addCenterStatement(
    slide,
    SH,
    "Si no está claro cuál es el elemento correcto, todavía no es momento de modificar nada.",
    {
      x: 6.06,
      y: 4.18,
      w: 5.08,
      h: 0.84,
      fill: C.paleRed,
      line: C.paleRed,
      color: C.navy,
      fontSize: 15.4,
    }
  );

  addPanel(slide, 6.16, 5.34, 4.92, 0.56, {
    fill: C.warm,
    line: C.warm,
  });
  slide.addText("El objetivo primero no es cambiar rápido: es apuntar con precisión.", {
    x: 6.46,
    y: 5.5,
    w: 4.32,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide, pptx);
}

function createSelectorsComparisonSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Dos accesos iniciales al DOM",
    "No se trata de memorizar una lista de selectores, sino de entender dos puertas de entrada muy útiles para empezar a trabajar sobre elementos concretos.",
    "Bloque 2"
  );

  addCodePanel(slide, SH, {
    x: 1.04,
    y: 2.26,
    w: 4.76,
    h: 1.9,
    title: "getElementById",
    code: 'const titulo = document.getElementById("titulo-principal");\nconsole.log(titulo);',
    lang: "js",
    fontSize: 8.6,
    titleFill: C.titleFill,
  });
  addCodePanel(slide, SH, {
    x: 6.12,
    y: 2.26,
    w: 4.76,
    h: 1.9,
    title: "querySelector",
    code: 'const boton = document.querySelector("button");\nconsole.log(boton);',
    lang: "js",
    fontSize: 8.6,
    titleFill: C.titleFill,
  });

  addMiniCard(slide, SH, {
    x: 1.22,
    y: 4.58,
    w: 4.42,
    h: 1.16,
    title: "Cuándo ayuda getElementById",
    body: "Cuando el HTML ya tiene un id claro y el objetivo es apuntar a un nodo único y explícito.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13.2,
    bodyFontSize: 8.8,
  });
  addMiniCard(slide, SH, {
    x: 6.3,
    y: 4.58,
    w: 4.42,
    h: 1.16,
    title: "Cuándo ayuda querySelector",
    body: "Cuando conviene usar la lógica de selectores CSS para ubicar el primer nodo que cumpla una condición.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 13.2,
    bodyFontSize: 8.8,
  });

  validateSlide(slide, pptx);
}

function createReferenceFlowSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Primero se ubica el nodo; luego se guarda la referencia",
    "La variable no es un detalle de sintaxis: es la forma práctica de conservar el elemento seleccionado para poder leerlo o modificarlo después.",
    "Bloque 2"
  );

  addDomMutationFlow(slide, SH, {
    x: 1.02,
    y: 2.34,
    w: 9.92,
    h: 3.64,
    title: "Selector -> referencia -> siguiente acción",
    selectorTitle: "Selector",
    selectorBody: "El documento se consulta para ubicar el nodo correcto dentro del DOM real.",
    mutationTitle: "Referencia",
    mutationBody: "La variable guarda ese elemento y permite inspeccionarlo o reutilizarlo.",
    resultTitle: "Lectura o cambio",
    resultBadge: "console.log(...) o nodo.textContent",
    resultBody: "Con la referencia disponible ya se puede leer estado o aplicar un cambio visible.",
    footer: "Seleccionar bien evita tocar el nodo equivocado y prepara el resto del flujo.",
  });

  validateSlide(slide, pptx);
}

function createReadPropertiesSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Leer también es parte del trabajo técnico",
    "Muchas veces el flujo no empieza cambiando algo, sino comprobando qué contenido, valor o atributo existe en este momento en la interfaz.",
    "Bloque 2"
  );

  addCodePanel(slide, SH, {
    x: 1.04,
    y: 2.26,
    w: 4.76,
    h: 1.7,
    title: "Leer texto",
    code: 'const boton = document.querySelector("button");\nconsole.log(boton.textContent);',
    lang: "js",
    fontSize: 8.4,
    titleFill: C.titleFill,
  });
  addCodePanel(slide, SH, {
    x: 1.04,
    y: 4.26,
    w: 4.76,
    h: 1.7,
    title: "Leer valor de input",
    code: 'const correo = document.getElementById("correo");\nconsole.log(correo.value);',
    lang: "js",
    fontSize: 8.4,
    titleFill: C.titleFill,
  });

  addCard(slide, SH, {
    x: 6.12,
    y: 2.28,
    w: 4.76,
    h: 1.52,
    title: "Lo que aquí se instala",
    body: "JavaScript no solo ordena cambios. También observa el estado actual de la interfaz para saber qué información hay disponible antes de intervenirla.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
    titleFontSize: 16,
    bodyFontSize: 9.4,
  });

  addMiniCard(slide, SH, {
    x: 6.12,
    y: 4.08,
    w: 1.34,
    h: 1.3,
    title: "Texto",
    body: "`textContent` ayuda a leer qué comunica un nodo.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 11,
    bodyFontSize: 7.6,
  });
  addMiniCard(slide, SH, {
    x: 7.82,
    y: 4.08,
    w: 1.34,
    h: 1.3,
    title: "Valor",
    body: "`value` permite saber qué escribió una persona.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 11,
    bodyFontSize: 7.6,
  });
  addMiniCard(slide, SH, {
    x: 9.52,
    y: 4.08,
    w: 1.34,
    h: 1.3,
    title: "Atributo",
    body: "`href`, `src` o `type` también describen estado.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 11,
    bodyFontSize: 7.6,
  });

  validateSlide(slide, pptx);
}

function createVisibleChangeSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cambiar texto produce una relación visible entre código y pantalla",
    "Cuando un nodo fue seleccionado bien, una propiedad como `textContent` deja ver de inmediato la cadena completa entre script e interfaz.",
    "Bloque 2"
  );

  addDomMutationFlow(slide, SH, {
    x: 1.04,
    y: 2.28,
    w: 9.86,
    h: 3.72,
    title: "Selector -> propiedad -> resultado nuevo",
    selectorBody: "Se obtiene la referencia al nodo que representa el estado o mensaje.",
    mutationBody: "Se actualiza `textContent` con un valor nuevo y concreto.",
    resultBody: "La interfaz deja evidencia inmediata de que el cambio sí ocurrió.",
    footer: "Cuando esta cadena se ve clara, el DOM deja de sentirse abstracto.",
  });

  validateSlide(slide, pptx);
}

function createClassesAttributesSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "No todo cambio en la interfaz es texto",
    "A veces conviene tocar una clase o un atributo en vez de reemplazar contenido. El criterio está en decidir qué propiedad expresa mejor el cambio que necesitas.",
    "Bloque 2"
  );

  addCodePanel(slide, SH, {
    x: 1.06,
    y: 2.34,
    w: 4.72,
    h: 1.78,
    title: "Cambiar una clase",
    code: 'const panel = document.getElementById("estado");\npanel.classList.add("activo");',
    lang: "js",
    fontSize: 8.4,
    titleFill: C.titleFill,
  });
  addCodePanel(slide, SH, {
    x: 6.14,
    y: 2.34,
    w: 4.72,
    h: 1.78,
    title: "Cambiar un atributo",
    code: 'const imagen = document.querySelector("img");\nimagen.setAttribute("src", "ok.png");',
    lang: "js",
    fontSize: 8.4,
    titleFill: C.titleFill,
  });

  addMiniCard(slide, SH, {
    x: 1.22,
    y: 4.56,
    w: 4.42,
    h: 1.2,
    title: "Clase CSS",
    body: "Sirve cuando el cambio pertenece a presentación, estado visual o comportamiento definido por estilos.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13.2,
    bodyFontSize: 8.8,
  });
  addMiniCard(slide, SH, {
    x: 6.3,
    y: 4.56,
    w: 4.42,
    h: 1.2,
    title: "Atributo HTML",
    body: "Sirve cuando el cambio pertenece al recurso, enlace, tipo o dato que el nodo necesita cargar o exponer.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 13.2,
    bodyFontSize: 8.8,
  });

  validateSlide(slide, pptx);
}

function createCriteriaSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "No basta con que el código haga algo",
    "Este bloque también instala criterio: el cambio debe ocurrir sobre el nodo correcto, con la propiedad correcta y con un resultado visible que ayude en vez de confundir.",
    "Bloque 2"
  );

  addDebugEvidenceBoard(slide, SH, {
    x: 1.04,
    y: 2.34,
    w: 9.9,
    h: 3.7,
    title: "Tres preguntas antes de dar un cambio por bueno",
    cards: [
      {
        title: "DOM real",
        body: "Confirma en Elements si el id o selector sí apunta al nodo exacto que querías tocar.",
        question: "¿Ese selector coincide con el HTML real?",
        accent: C.red,
        fill: C.paleRed,
        icon: "sheet",
      },
      {
        title: "Código y consola",
        body: "Mira la referencia y el valor antes o después del cambio para saber qué ocurrió realmente.",
        question: "¿Qué evidencia entrega la ejecución?",
        accent: C.gold,
        fill: C.warm,
        icon: "sql",
      },
      {
        title: "Interfaz visible",
        body: "Comprueba si el cambio ayuda, si ocurre en la zona correcta y si no genera ruido visual.",
        question: "¿El resultado corresponde a la intención?",
        accent: C.navy,
        fill: C.softBlue,
        icon: "building",
      },
    ],
    footer: "La práctica profesional básica parte aquí: precisión en el nodo, evidencia en consola y verificación en pantalla.",
  });

  validateSlide(slide, pptx);
}

function createBlock2AgenticSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un agente puede sugerir selectores; tú validas la estructura real",
    "En este punto ayuda mucho para comparar opciones o recordar propiedades útiles, pero no conviene dar por bueno un cambio hasta verlo en DOM, consola e interfaz.",
    "Bloque 2"
  );

  addDelegationSplit(slide, SH, {
    x: 1.02,
    y: 2.34,
    w: 9.9,
    h: 3.7,
    title: "Qué puede aportar un agente y qué sigue siendo validación humana",
    left: {
      title: "Puede ayudar con",
      subtitle: "propuestas iniciales y aclaración de sintaxis",
      items: [
        "proponer un selector inicial con id o querySelector",
        "explicar la diferencia entre getElementById y querySelector",
        "sugerir un cambio básico de textContent o classList",
        "resumir qué propiedad conviene probar primero",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene delegar",
      subtitle: "validación sobre el HTML y el efecto real",
      items: [
        "asumir que el elemento existe sin inspeccionar el DOM",
        "dar por bueno un selector que no se ejecutó",
        "confundir una respuesta plausible con un cambio correcto",
        "cerrar el caso sin mirar el resultado visible en navegador",
      ],
      accent: C.red,
      fill: C.white,
    },
    bridgeLabel: "Verificación",
    bridgeBody: "El apoyo acelera ideas. La validez depende del nodo real, la consola y la interfaz visible.",
    footer: "Inspeccionar -> ejecutar -> leer -> comprobar.",
  });

  validateSlide(slide, pptx);
}

function createBlock2QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas para fijar el bloque 2",
    "El objetivo no es recitar métodos, sino poder explicar por qué un selector, una lectura o un cambio sí calza con la interfaz real.",
    "Bloque 2"
  );

  addCard(slide, SH, {
    x: 1.1,
    y: 2.28,
    w: 9.84,
    h: 0.88,
    title: "Idea orientadora",
    body: "Manipular el DOM con criterio significa apuntar al nodo correcto, observar su estado y cambiar exactamente la propiedad que la interfaz necesita.",
    fill: C.navy,
    line: C.navy,
    accent: C.red,
    titleColor: C.white,
    bodyColor: C.white,
    titleFontSize: 16.2,
    bodyFontSize: 9.8,
  });

  addCard(slide, SH, {
    x: 1.18,
    y: 3.64,
    w: 3.04,
    h: 1.62,
    title: "Pregunta 1",
    body: "¿Por qué seleccionar bien un elemento es una condición previa para cualquier cambio visible en la interfaz?",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 15.4,
    bodyFontSize: 10.2,
  });
  addCard(slide, SH, {
    x: 4.48,
    y: 3.64,
    w: 3.04,
    h: 1.62,
    title: "Pregunta 2",
    body: "¿Qué diferencia hay entre leer una propiedad del DOM y modificarla dentro de un flujo real de trabajo?",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 15.4,
    bodyFontSize: 10.2,
  });
  addCard(slide, SH, {
    x: 7.78,
    y: 3.64,
    w: 3.04,
    h: 1.62,
    title: "Pregunta 3",
    body: "¿En qué caso conviene cambiar texto y en cuál podría tener más sentido tocar una clase o un atributo?",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 15.4,
    bodyFontSize: 10.2,
  });

  validateSlide(slide, pptx);
}

function createBlock2ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del bloque 2",
    "La manipulación del DOM ya quedó instalada como una cadena concreta entre selector, lectura, cambio y comprobación visible.",
    "Bloque 2"
  );

  addMiniCard(slide, SH, {
    x: 1.2,
    y: 2.42,
    w: 2.96,
    h: 1.14,
    title: "Seleccionar",
    body: "ubicar el nodo correcto antes de hacer cualquier otra cosa.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 4.48,
    y: 2.42,
    w: 2.96,
    h: 1.14,
    title: "Leer",
    body: "comprobar texto, valor o atributo antes de intervenir la interfaz.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 7.76,
    y: 2.42,
    w: 2.96,
    h: 1.14,
    title: "Modificar",
    body: "aplicar un cambio pequeño, preciso y comprobable en pantalla.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });

  addCenterStatement(
    slide,
    SH,
    "Puente al bloque 3: ahora la interfaz ya puede cambiar por acciones locales; el siguiente paso es hacerla responder también a datos que llegan desde fuera mediante `fetch`.",
    {
      x: 1.1,
      y: 4.18,
      w: 9.84,
      h: 1.08,
      fill: C.navy,
      line: C.navy,
      color: C.white,
      fontSize: 17.2,
    }
  );

  addPanel(slide, 1.52, 5.58, 9.02, 0.42, {
    fill: C.paleRed,
    line: C.paleRed,
  });
  slide.addText("Desde aquí la interfaz deja de depender solo de datos escritos a mano y empieza a conectarse con respuestas externas.", {
    x: 1.84,
    y: 5.7,
    w: 8.38,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide, pptx);
}

function createBlock3OpeningSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Bloque 3 · `fetch`, respuestas y consumo simple de datos",
    "La interfaz ya no cambia solo con datos locales: ahora empieza a responder también a información que llega desde fuera.",
    "Bloque 3"
  );

  addCenterStatement(
    slide,
    SH,
    "Con `fetch`, JavaScript ya no solo modifica el DOM: también solicita datos externos y los conecta con la interfaz.",
    {
      x: 1.02,
      y: 2.24,
      w: 9.98,
      h: 1,
      fill: C.navy,
      line: C.navy,
      color: C.white,
      fontSize: 18.8,
    }
  );

  addMiniCard(slide, SH, {
    x: 1.18,
    y: 3.74,
    w: 3.02,
    h: 1.12,
    title: "Solicitud",
    body: "el script pide información a una fuente externa.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 4.48,
    y: 3.74,
    w: 3.02,
    h: 1.12,
    title: "Respuesta",
    body: "llegan datos o aparece un error que hay que interpretar.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 7.78,
    y: 3.74,
    w: 3.02,
    h: 1.12,
    title: "Render",
    body: "una propiedad útil termina actualizando algo visible en pantalla.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });

  addPanel(slide, 1.92, 5.26, 8.2, 0.72, {
    fill: C.softBlue,
    line: C.softBlue,
  });
  slide.addText("De aquí en adelante ya trabajamos con red, datos, consola, DOM e interfaz al mismo tiempo.", {
    x: 2.2,
    y: 5.48,
    w: 7.64,
    h: 0.14,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.6,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide, pptx);
}

function createExternalDataSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Hasta ahora la interfaz reaccionaba con datos locales",
    "El valor nuevo del bloque 3 aparece cuando la página necesita obtener información que no está escrita directamente en el HTML ni en el script inicial.",
    "Bloque 3"
  );

  addCard(slide, SH, {
    x: 1.08,
    y: 2.34,
    w: 4.74,
    h: 2.38,
    title: "Bloques anteriores",
    body: "El DOM ya podía cambiar con datos escritos a mano, mensajes locales o respuestas simples a un evento. Eso instala la lógica base, pero todavía no conecta la interfaz con información externa.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 17.2,
    bodyFontSize: 10.2,
  });

  addArrow(slide, 6.02, 3.28, 0.28, 0.34, C.gold);

  addCard(slide, SH, {
    x: 6.48,
    y: 2.34,
    w: 4.4,
    h: 2.38,
    title: "Bloque 3",
    body: "`fetch` abre la puerta a datos que llegan desde fuera. La interfaz deja de depender solo de lo que ya estaba disponible y empieza a reaccionar también a respuestas de red.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 17.2,
    bodyFontSize: 10.2,
  });

  addCenterStatement(
    slide,
    SH,
    "El problema nuevo que resuelve `fetch` es simple: obtener información que la página no tiene cargada todavía.",
    {
      x: 1.18,
      y: 5.12,
      w: 9.64,
      h: 0.82,
      fill: C.warm,
      line: C.warm,
      color: C.navy,
      fontSize: 15.2,
    }
  );

  validateSlide(slide, pptx);
}

function createRequestResponseSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La primera lectura útil de `fetch` es como flujo",
    "Antes de memorizar sintaxis, conviene entender que aquí hay una solicitud, una respuesta y un punto donde los datos se vuelven utilizables.",
    "Bloque 3"
  );

  addRequestResponseFlow(slide, SH, {
    x: 1.02,
    y: 2.34,
    w: 9.92,
    h: 3.64,
    title: "Cliente -> solicitud -> respuesta",
    clientLabel: "Navegador",
    serverLabel: "API",
    requestLabel: "GET /users/1",
    requestMeta: "la interfaz pide información externa",
    responseLabel: "200 OK",
    responseMeta: "JSON con datos o error a revisar",
  });

  validateSlide(slide, pptx);
}

function createFetchStagesSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "`fetch` debe leerse por etapas",
    "El error más común al empezar es tratar toda la cadena como una línea mágica. Aquí importa saber qué parte del flujo estás mirando.",
    "Bloque 3"
  );

  addCodePanel(slide, SH, {
    x: 1.02,
    y: 2.28,
    w: 5.36,
    h: 2.42,
    title: "Lectura básica del flujo",
    code: 'fetch("https://jsonplaceholder.typicode.com/users/1")\n  .then((respuesta) => respuesta.json())\n  .then((datos) => {\n    console.log(datos);\n  });',
    lang: "js",
    fontSize: 8.2,
    titleFill: C.titleFill,
  });

  addMiniCard(slide, SH, {
    x: 6.7,
    y: 2.3,
    w: 1.32,
    h: 1.22,
    title: "1. fetch",
    body: "intenta obtener algo desde una URL.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 10.6,
    bodyFontSize: 7.2,
  });
  addMiniCard(slide, SH, {
    x: 8.1,
    y: 2.3,
    w: 1.32,
    h: 1.22,
    title: "2. respuesta",
    body: "representa lo que volvió desde esa solicitud.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 10.6,
    bodyFontSize: 7.2,
  });
  addMiniCard(slide, SH, {
    x: 9.5,
    y: 2.3,
    w: 1.32,
    h: 1.22,
    title: "3. datos",
    body: "ya están listos para usarse dentro del script.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 10.6,
    bodyFontSize: 7.2,
  });

  addPanel(slide, 6.68, 4.02, 4.14, 1.52, {
    fill: C.white,
    line: C.border,
  });
  slide.addText("Lo importante aquí no es la forma exacta, sino identificar en qué tramo puede estar fallando el flujo.", {
    x: 6.94,
    y: 4.28,
    w: 3.62,
    h: 0.44,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.8,
    bold: true,
    color: C.navy,
    margin: 0,
    valign: "mid",
  });
  slide.addText("solicitud · respuesta · JSON · uso posterior", {
    x: 6.94,
    y: 5.0,
    w: 3.62,
    h: 0.14,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    color: C.slate,
    align: "center",
    margin: 0,
  });

  validateSlide(slide, pptx);
}

function createJsonSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "JSON aparece como formato de intercambio inicial",
    "No hace falta convertirlo en una clase aparte: basta con poder leerlo como datos estructurados que luego terminarán en consola o en un nodo del DOM.",
    "Bloque 3"
  );

  addJsonPanel(slide, SH, {
    x: 1.02,
    y: 2.26,
    w: 4.8,
    h: 3.4,
    title: "Respuesta JSON",
    code: '{\n  "id": 1,\n  "name": "Leanne Graham",\n  "email": "leanne@example.com"\n}',
    fontSize: 9.2,
  });

  addCard(slide, SH, {
    x: 6.12,
    y: 2.3,
    w: 4.76,
    h: 1.52,
    title: "Cómo conviene leerlo al principio",
    body: "No como decoración, sino como estructura útil: una propiedad puede terminar llenando una tarjeta, un título, un bloque de texto o una validación en consola.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
    titleFontSize: 15.6,
    bodyFontSize: 9.2,
  });

  addMiniCard(slide, SH, {
    x: 6.12,
    y: 4.18,
    w: 1.38,
    h: 1.18,
    title: "name",
    body: "puede terminar en un texto visible.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 10.8,
    bodyFontSize: 7.4,
  });
  addMiniCard(slide, SH, {
    x: 7.8,
    y: 4.18,
    w: 1.38,
    h: 1.18,
    title: "email",
    body: "sirve para completar un detalle o etiqueta.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 10.8,
    bodyFontSize: 7.4,
  });
  addMiniCard(slide, SH, {
    x: 9.48,
    y: 4.18,
    w: 1.38,
    h: 1.18,
    title: "id",
    body: "ayuda a confirmar estructura y consistencia.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 10.8,
    bodyFontSize: 7.4,
  });

  validateSlide(slide, pptx);
}

function createFetchToUiSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Consumir datos simples tiene sentido cuando terminan en la interfaz",
    "El bloque no debería quedarse en `console.log(datos)`: el valor aparece de verdad cuando una propiedad útil modifica un elemento real del DOM.",
    "Bloque 3"
  );

  addCodePanel(slide, SH, {
    x: 1.02,
    y: 2.26,
    w: 5.42,
    h: 2.8,
    title: "Del fetch al DOM",
    code: 'const nombre = document.getElementById("nombre-usuario");\n\nfetch("https://jsonplaceholder.typicode.com/users/1")\n  .then((respuesta) => respuesta.json())\n  .then((datos) => {\n    nombre.textContent = datos.name;\n  });',
    lang: "js",
    fontSize: 7.9,
    titleFill: C.titleFill,
  });

  addPanel(slide, 6.72, 2.3, 4.22, 3.72, {
    fill: C.white,
    line: C.border,
  });
  addPanel(slide, 6.86, 2.44, 3.94, 0.34, {
    fill: C.softNeutral,
    line: C.softNeutral,
  });
  slide.addText("Dato externo -> nodo visible", {
    x: 7.02,
    y: 2.54,
    w: 3.62,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.2,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  const flowRows = [
    {
      y: 3.06,
      accent: C.red,
      fill: C.paleRed,
      title: "1. Nodo",
      body: "Se selecciona el contenedor donde se quiere mostrar la información.",
      badge: 'document.querySelector(...)',
    },
    {
      y: 4.02,
      accent: C.gold,
      fill: C.warm,
      title: "2. Dato",
      body: "Se toma una propiedad útil del JSON ya interpretado.",
      badge: "datos.name",
    },
    {
      y: 4.98,
      accent: C.navy,
      fill: C.softBlue,
      title: "3. Render",
      body: "La interfaz cambia con información que no estaba escrita a mano en la página.",
      badge: "nombre.textContent = datos.name",
    },
  ];

  flowRows.forEach((row) => {
    addPanel(slide, 6.94, row.y, 3.8, 0.78, {
      fill: C.white,
      line: C.border,
    });
    slide.addShape(SH.rect, {
      x: 6.94,
      y: row.y,
      w: 0.08,
      h: 0.78,
      fill: { color: row.accent },
      line: { color: row.accent },
    });
    addPanel(slide, 7.16, row.y + 0.14, 0.46, 0.3, {
      fill: row.fill,
      line: row.fill,
    });
    slide.addText(row.title, {
      x: 7.72,
      y: row.y + 0.18,
      w: 1.04,
      h: 0.12,
      fontFace: TYPOGRAPHY.display,
      fontSize: 11.2,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    addPanel(slide, 8.96, row.y + 0.14, 1.54, 0.26, {
      fill: C.navy,
      line: C.navy,
    });
    slide.addText(row.badge, {
      x: 9.1,
      y: row.y + 0.21,
      w: 1.26,
      h: 0.1,
      fontFace: "Aptos Mono",
      fontSize: 6.2,
      color: C.white,
      align: "center",
      margin: 0,
      fit: "shrink",
    });
    slide.addText(row.body, {
      x: 7.16,
      y: row.y + 0.48,
      w: 3.32,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: 7.2,
      color: C.ink,
      margin: 0,
      align: "center",
      fit: "shrink",
    });
  });

  slide.addText("Aquí ya se conectan red, datos, DOM e interfaz.", {
    x: 7,
    y: 5.78,
    w: 3.66,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 7.8,
    color: C.slate,
    align: "center",
    margin: 0,
  });

  validateSlide(slide, pptx);
  return;

  addDomMutationFlow(slide, SH, {
    x: 6.72,
    y: 2.3,
    w: 4.22,
    h: 3.72,
    title: "Dato externo -> nodo visible",
    selectorTitle: "Nodo",
    selectorBody: "Se selecciona el contenedor donde se quiere mostrar la información.",
    mutationTitle: "Dato",
    mutationBody: "Se toma una propiedad útil del JSON ya interpretado.",
    resultTitle: "Render",
    resultBadge: "nombre.textContent = datos.name",
    resultBody: "La interfaz cambia con información que no estaba escrita a mano en la página.",
    footer: "Aquí ya se conectan red, datos, DOM e interfaz.",
  });

  validateSlide(slide, pptx);
}

function createFetchDebugSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Con `fetch`, la depuración ya incluye red, datos y renderizado",
    "El problema puede estar en la solicitud, en la respuesta, en la conversión a JSON o en el momento en que intentas usar el dato dentro del DOM.",
    "Bloque 3"
  );

  addDebugEvidenceBoard(slide, SH, {
    x: 1.04,
    y: 2.34,
    w: 9.9,
    h: 3.7,
    title: "Tres lugares donde mirar cuando `fetch` no sale como esperabas",
    cards: [
      {
        title: "Network",
        body: "Confirma si la solicitud sí salió, si la URL era correcta y si hubo respuesta.",
        question: "¿La petición ocurrió realmente?",
        accent: C.red,
        fill: C.paleRed,
        icon: "database",
      },
      {
        title: "Console",
        body: "Mira errores, estructura de `datos` y evidencias del punto donde se corta el flujo.",
        question: "¿Qué está diciendo la ejecución?",
        accent: C.gold,
        fill: C.warm,
        icon: "sql",
      },
      {
        title: "DOM",
        body: "Comprueba si el nodo existe y si el valor sí llegó a la propiedad correcta del elemento.",
        question: "¿El render estaba apuntando bien?",
        accent: C.navy,
        fill: C.softBlue,
        icon: "sheet",
      },
    ],
    footer: "Cuando entra `fetch`, el diagnóstico ya no es solo de selectores: también es de red y estructura de datos.",
  });

  validateSlide(slide, pptx);
}

function createBlock3AgenticSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El agente puede explicar la cadena; tú validas la respuesta real",
    "Aquí ayuda mucho a ordenar etapas o sugerir un ejemplo simple, pero no conviene dar por bueno un `fetch` sin revisar URL, respuesta y renderizado.",
    "Bloque 3"
  );

  addDelegationSplit(slide, SH, {
    x: 1.02,
    y: 2.34,
    w: 9.9,
    h: 3.7,
    title: "Ayuda posible vs validación técnica obligatoria",
    left: {
      title: "Puede ayudar con",
      subtitle: "explicación del flujo y ejemplo inicial",
      items: [
        "desarmar la cadena de fetch por etapas",
        "proponer una API simple para practicar",
        "traducir un JSON a un lenguaje más claro",
        "sugerir cómo llevar una propiedad al DOM",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene delegar",
      subtitle: "lectura de la red, de los datos y del resultado visible",
      items: [
        "asumir que la URL responde sin probarla",
        "dar por bueno un campo que no existe en la respuesta",
        "confundir respuesta plausible con respuesta real",
        "cerrar el caso sin revisar DOM, consola y Network",
      ],
      accent: C.red,
      fill: C.white,
    },
    bridgeLabel: "Verificación",
    bridgeBody: "El apoyo acelera hipótesis. La validez se comprueba en la solicitud real, en el JSON real y en el efecto visible.",
    footer: "Entender -> solicitar -> inspeccionar -> renderizar -> validar.",
  });

  validateSlide(slide, pptx);
}

function createBlock3QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas para fijar el bloque 3",
    "La meta es poder explicar qué problema nuevo resuelve `fetch`, cómo se lee su cadena y dónde buscar evidencia cuando algo falla.",
    "Bloque 3"
  );

  addCard(slide, SH, {
    x: 1.1,
    y: 2.28,
    w: 9.84,
    h: 0.88,
    title: "Idea orientadora",
    body: "El valor real de `fetch` aparece cuando la interfaz logra pedir datos externos, entender su estructura y convertirlos en un cambio visible y verificable.",
    fill: C.navy,
    line: C.navy,
    accent: C.red,
    titleColor: C.white,
    bodyColor: C.white,
    titleFontSize: 16.2,
    bodyFontSize: 9.8,
  });

  addCard(slide, SH, {
    x: 1.18,
    y: 3.64,
    w: 3.04,
    h: 1.62,
    title: "Pregunta 1",
    body: "¿Qué problema nuevo resuelve `fetch` respecto de los ejemplos que solo trabajan con datos locales?",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 15.2,
    bodyFontSize: 10.1,
  });
  addCard(slide, SH, {
    x: 4.48,
    y: 3.64,
    w: 3.04,
    h: 1.62,
    title: "Pregunta 2",
    body: "¿Por qué conviene leer una cadena de `fetch` por etapas y no como una sola línea mágica?",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 15.2,
    bodyFontSize: 10.1,
  });
  addCard(slide, SH, {
    x: 7.78,
    y: 3.64,
    w: 3.04,
    h: 1.62,
    title: "Pregunta 3",
    body: "¿Qué cambia en la depuración cuando ya no solo hay DOM, sino también red y respuestas JSON?",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 15.2,
    bodyFontSize: 10.1,
  });

  validateSlide(slide, pptx);
}

function createBlock3ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del bloque 3",
    "Ya quedó instalada la cadena completa entre solicitud, respuesta, JSON y actualización visible del DOM.",
    "Bloque 3"
  );

  addMiniCard(slide, SH, {
    x: 1.2,
    y: 2.42,
    w: 2.96,
    h: 1.14,
    title: "Solicitar",
    body: "usar `fetch` para pedir información que no estaba en la página.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 4.48,
    y: 2.42,
    w: 2.96,
    h: 1.14,
    title: "Interpretar",
    body: "leer respuesta y JSON para saber qué dato sí se puede usar.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 7.76,
    y: 2.42,
    w: 2.96,
    h: 1.14,
    title: "Renderizar",
    body: "llevar una propiedad útil al DOM y verificar el cambio visible.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });

  addCenterStatement(
    slide,
    SH,
    "Puente al bloque 4: ahora que ya hay DOM, red y datos externos en juego, el siguiente paso es ordenar una rutina de depuración más completa y más profesional.",
    {
      x: 1.1,
      y: 4.18,
      w: 9.84,
      h: 1.08,
      fill: C.navy,
      line: C.navy,
      color: C.white,
      fontSize: 17,
    }
  );

  addPanel(slide, 1.56, 5.58, 8.96, 0.42, {
    fill: C.paleRed,
    line: C.paleRed,
  });
  slide.addText("Desde aquí el debugging ya no es opcional: pasa a ser parte central del trabajo técnico.", {
    x: 1.88,
    y: 5.7,
    w: 8.32,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide, pptx);
}

function createBlock4OpeningSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Bloque 4 · Depuración inicial, documentación y apoyo de agentes",
    "La clase cierra uniendo DOM, `fetch` y evidencia técnica dentro de una rutina de revisión más ordenada y más profesional.",
    "Bloque 4"
  );

  addCenterStatement(
    slide,
    SH,
    "Depurar no es adivinar. Es aislar etapas, leer evidencia y comprobar dónde se corta el flujo.",
    {
      x: 1.04,
      y: 2.26,
      w: 9.92,
      h: 0.98,
      fill: C.navy,
      line: C.navy,
      color: C.white,
      fontSize: 18.4,
    }
  );

  addMiniCard(slide, SH, {
    x: 1.18,
    y: 3.74,
    w: 3.04,
    h: 1.14,
    title: "DOM",
    body: "el problema puede estar en el nodo, el selector o el evento que nunca ocurrió.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 4.48,
    y: 3.74,
    w: 3.04,
    h: 1.14,
    title: "Red y datos",
    body: "la solicitud puede fallar, devolver otra estructura o no traer la propiedad esperada.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 7.78,
    y: 3.74,
    w: 3.04,
    h: 1.14,
    title: "Render",
    body: "el dato puede llegar bien y aun así terminar aplicado en el nodo equivocado.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });

  addPanel(slide, 1.86, 5.28, 8.28, 0.66, {
    fill: C.softBlue,
    line: C.softBlue,
  });
  slide.addText("El error deja de leerse como fracaso y empieza a leerse como pista dentro de una cadena verificable.", {
    x: 2.12,
    y: 5.49,
    w: 7.76,
    h: 0.14,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.4,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide, pptx);
}

function createFailureMapSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cuando una interfaz falla, el problema no siempre está donde creemos",
    "Después de DOM y `fetch`, ya existen varias etapas posibles donde un flujo puede romperse. La intuición sola deja de alcanzar.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 1.06,
    y: 2.34,
    w: 4.86,
    h: 2.48,
    title: "Síntoma visible",
    body: "La interfaz no cambió, el dato no apareció o el comportamiento no fue el esperado. Ese síntoma es real, pero todavía no dice en qué parte del flujo se originó el problema.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 17.2,
    bodyFontSize: 10.2,
  });

  addArrow(slide, 6.08, 3.28, 0.28, 0.34, C.gold);

  addCard(slide, SH, {
    x: 6.54,
    y: 2.34,
    w: 4.34,
    h: 2.48,
    title: "Posibles causas",
    body: "selector incorrecto, evento no disparado, solicitud fallida, propiedad inexistente o render aplicado en el nodo equivocado. El problema técnico consiste en aislar cuál de esas etapas sí falló.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 17.2,
    bodyFontSize: 10.2,
  });

  addCenterStatement(
    slide,
    SH,
    "Debugging sano: menos ensayo al azar y más evidencia por etapas.",
    {
      x: 1.24,
      y: 5.18,
      w: 9.58,
      h: 0.78,
      fill: C.warm,
      line: C.warm,
      color: C.navy,
      fontSize: 15.2,
    }
  );

  validateSlide(slide, pptx);
}

function createDebugRouteSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Una ruta inicial de depuración",
    "La utilidad pedagógica del bloque está en instalar una rutina corta y repetible que ayude a revisar el flujo sin ansiedad y sin prueba y error caótico.",
    "Bloque 4"
  );

  addMiniCard(slide, SH, {
    x: 0.98,
    y: 2.72,
    w: 1.66,
    h: 1.18,
    title: "1. DOM",
    body: "confirmar si el elemento existe.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 12,
    bodyFontSize: 7.8,
  });
  addArrow(slide, 2.8, 3.08, 0.18, 0.24, C.gold);
  addMiniCard(slide, SH, {
    x: 3.1,
    y: 2.72,
    w: 1.66,
    h: 1.18,
    title: "2. Acción",
    body: "ver si el evento o script sí corrió.",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 12,
    bodyFontSize: 7.8,
  });
  addArrow(slide, 4.92, 3.08, 0.18, 0.24, C.gold);
  addMiniCard(slide, SH, {
    x: 5.22,
    y: 2.72,
    w: 1.66,
    h: 1.18,
    title: "3. Consola",
    body: "leer valores, `null` o errores.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 12,
    bodyFontSize: 7.8,
  });
  addArrow(slide, 7.04, 3.08, 0.18, 0.24, C.gold);
  addMiniCard(slide, SH, {
    x: 7.34,
    y: 2.72,
    w: 1.66,
    h: 1.18,
    title: "4. Red",
    body: "mirar si `fetch` salió y respondió.",
    fill: C.white,
    line: C.border,
    accent: C.gold,
    titleFontSize: 12,
    bodyFontSize: 7.8,
  });
  addArrow(slide, 9.16, 3.08, 0.18, 0.24, C.gold);
  addMiniCard(slide, SH, {
    x: 9.46,
    y: 2.72,
    w: 1.66,
    h: 1.18,
    title: "5. Render",
    body: "comprobar el cambio visible final.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 12,
    bodyFontSize: 7.8,
  });

  addCard(slide, SH, {
    x: 1.18,
    y: 4.52,
    w: 9.56,
    h: 1.2,
    title: "Qué instala esta secuencia",
    body: "Un mismo síntoma puede tener causas distintas. La ruta de revisión obliga a aislar etapas y evita cambiar varias cosas a la vez sin saber cuál resolvió realmente el problema.",
    fill: C.navy,
    line: C.navy,
    accent: C.red,
    titleColor: C.white,
    bodyColor: C.white,
    titleFontSize: 15.6,
    bodyFontSize: 9.2,
  });

  validateSlide(slide, pptx);
}

function createConsoleEvidenceSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La consola se vuelve fuente de evidencia",
    "Ya no solo confirma que el script corrió: también permite distinguir entre un selector `null`, un dato inexistente, un error de referencia o una respuesta inesperada.",
    "Bloque 4"
  );

  addCodePanel(slide, SH, {
    x: 1.04,
    y: 2.3,
    w: 4.88,
    h: 2.24,
    title: "Lecturas mínimas útiles",
    code: 'console.log(nodo);\nconsole.log(datos);\nconsole.error(error);',
    lang: "js",
    fontSize: 8.6,
    titleFill: C.titleFill,
  });

  addPanel(slide, 6.14, 2.34, 4.8, 3.34, {
    fill: C.white,
    line: C.border,
  });
  addPanel(slide, 6.34, 2.5, 4.4, 0.34, {
    fill: C.warm,
    line: C.warm,
  });
  slide.addText("Que evidencia conviene buscar", {
    x: 6.54,
    y: 2.61,
    w: 4,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.2,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  const evidenceRows = [
    {
      y: 3.02,
      accent: C.red,
      fill: C.paleRed,
      title: "1. Selector",
      body: "Confirmar si el nodo existe o si el selector devolvio `null`.",
      question: "Pregunta util: ?la referencia es real?",
    },
    {
      y: 3.84,
      accent: C.gold,
      fill: C.warm,
      title: "2. Dato",
      body: "Revisar si la propiedad que quieres usar si viene en la respuesta.",
      question: "Pregunta util: ?el JSON trae ese campo?",
    },
    {
      y: 4.66,
      accent: C.navy,
      fill: C.softBlue,
      title: "3. Error",
      body: "Leer la pista concreta para distinguir sintaxis, red o referencia.",
      question: "Pregunta util: ?en que etapa se corto el flujo?",
    },
  ];

  evidenceRows.forEach((row) => {
    addPanel(slide, 6.34, row.y, 4.4, 0.68, {
      fill: C.white,
      line: C.border,
    });
    slide.addShape(SH.rect, {
      x: 6.34,
      y: row.y,
      w: 0.08,
      h: 0.68,
      fill: { color: row.accent },
      line: { color: row.accent },
    });
    addPanel(slide, 6.56, row.y + 0.12, 0.42, 0.24, {
      fill: row.fill,
      line: row.fill,
    });
    slide.addText(row.title, {
      x: 7.08,
      y: row.y + 0.14,
      w: 3.4,
      h: 0.1,
      fontFace: TYPOGRAPHY.display,
      fontSize: 11,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(row.body, {
      x: 6.56,
      y: row.y + 0.38,
      w: 4.02,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 7.4,
      color: C.ink,
      margin: 0,
      fit: "shrink",
      align: "center",
    });
    slide.addText(row.question, {
      x: 6.56,
      y: row.y + 0.54,
      w: 4.02,
      h: 0.08,
      fontFace: TYPOGRAPHY.body,
      fontSize: 6.8,
      bold: true,
      color: row.accent,
      margin: 0,
      fit: "shrink",
      align: "center",
    });
  });

  slide.addText("La consola deja de ser accesorio: se vuelve evidencia tecnica.", {
    x: 6.42,
    y: 5.48,
    w: 4.24,
    h: 0.1,
    fontFace: TYPOGRAPHY.body,
    fontSize: 7.8,
    color: C.slate,
    margin: 0,
    align: "center",
  });

  validateSlide(slide, pptx);
  return;

  addDebugEvidenceBoard(slide, SH, {
    x: 6.14,
    y: 2.34,
    w: 4.8,
    h: 3.34,
    title: "Qué evidencia conviene buscar",
    cards: [
      {
        title: "Selector",
        body: "¿El nodo existe o devolvió `null`?",
        question: "¿La referencia es real?",
        accent: C.red,
        fill: C.paleRed,
        icon: "sheet",
      },
      {
        title: "Dato",
        body: "¿La propiedad que quieres usar sí está en la respuesta?",
        question: "¿El JSON tiene ese campo?",
        accent: C.gold,
        fill: C.warm,
        icon: "sql",
      },
      {
        title: "Error",
        body: "¿Hay una pista concreta sobre sintaxis, red o referencia?",
        question: "¿Qué etapa se cortó?",
        accent: C.navy,
        fill: C.softBlue,
        icon: "database",
      },
    ],
    footer: "La consola deja de ser accesorio: se vuelve evidencia técnica.",
  });

  validateSlide(slide, pptx);
}

function createDocumentationSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Documentar un flujo simple también ayuda a entenderlo",
    "Cuando un estudiante puede describir un caso breve por etapas, deja de sentir que el código solo ocurre y empieza a reconocer una secuencia técnica concreta.",
    "Bloque 4"
  );

  addCodePanel(slide, SH, {
    x: 1.08,
    y: 2.34,
    w: 4.72,
    h: 2.44,
    title: "Ejemplo de microdocumentación",
    code: "1. seleccionar el contenedor\n2. hacer fetch\n3. convertir respuesta a JSON\n4. tomar datos.name\n5. actualizar textContent",
    lang: "txt",
    fontSize: 8.2,
    titleFill: C.titleFill,
  });

  addMiniCard(slide, SH, {
    x: 6.16,
    y: 2.42,
    w: 1.42,
    h: 1.26,
    title: "Secuencia",
    body: "obliga a ordenar el flujo paso a paso.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 11.2,
    bodyFontSize: 7.6,
  });
  addMiniCard(slide, SH, {
    x: 7.84,
    y: 2.42,
    w: 1.42,
    h: 1.26,
    title: "Comprensión",
    body: "muestra si realmente se entendió qué hace cada tramo.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 11.2,
    bodyFontSize: 7.6,
  });
  addMiniCard(slide, SH, {
    x: 9.52,
    y: 2.42,
    w: 1.42,
    h: 1.26,
    title: "Comunicación",
    body: "mejora cómo se explica un problema o una solución.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 11.2,
    bodyFontSize: 7.6,
  });

  addCenterStatement(
    slide,
    SH,
    "Poder explicarlo en cinco pasos simples suele ser una buena señal de que el flujo ya dejó de sentirse mágico.",
    {
      x: 6.02,
      y: 4.4,
      w: 4.98,
      h: 1.02,
      fill: C.navy,
      line: C.navy,
      color: C.white,
      fontSize: 15.2,
    }
  );

  validateSlide(slide, pptx);
}

function createBlock4AgenticSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Aquí el agente ayuda mucho, pero no reemplaza el diagnóstico",
    "En debugging puede explicar, resumir y proponer hipótesis, pero si parte de una suposición equivocada puede sonar convincente y aun así fallar.",
    "Bloque 4"
  );

  addDelegationSplit(slide, SH, {
    x: 1.02,
    y: 2.34,
    w: 9.9,
    h: 3.7,
    title: "Ayuda útil vs riesgo de delegación excesiva",
    left: {
      title: "Puede ayudar con",
      subtitle: "hipótesis iniciales y explicaciones de flujo",
      items: [
        "explicar un error de consola",
        "resumir qué hace una cadena de `fetch`",
        "ordenar pasos de revisión",
        "ayudar a redactar una documentación breve del caso",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "No debe reemplazar",
      subtitle: "la evidencia real en herramientas",
      items: [
        "ver si el error coincide con el caso real",
        "confirmar que el DOM inspeccionado es el mismo del código",
        "comprobar la forma real de la respuesta de red",
        "decidir que el problema quedó resuelto sin reejecutar",
      ],
      accent: C.red,
      fill: C.white,
    },
    bridgeLabel: "Criterio",
    bridgeBody: "La explicación puede destrabar. El diagnóstico final sigue dependiendo de consola, Network, DOM e interfaz.",
    footer: "Recoger evidencia -> contrastar hipótesis -> ejecutar de nuevo.",
  });

  validateSlide(slide, pptx);
}

function createMaturitySlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "No basta con hacer que funcione: importa entender por qué funcionó",
    "El cierre del bloque instala una primera idea de madurez técnica: una solución vale más cuando también puedes explicar qué parte fallaba y qué evidencia mostró que quedó bien.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 1.08,
    y: 2.26,
    w: 9.86,
    h: 1,
    title: "El cambio valioso del miércoles",
    body: "La solución madura no solo arregla el resultado visible: también deja claro qué fallaba, qué evidencia apareció y por qué el ajuste fue el correcto.",
    fill: C.navy,
    line: C.navy,
    accent: C.red,
    titleColor: C.white,
    bodyColor: C.white,
    titleFontSize: 16,
    bodyFontSize: 9.2,
  });

  addPanel(slide, 1.18, 3.58, 4.54, 1.98, {
    fill: C.paleRed,
    line: C.paleRed,
  });
  slide.addShape(SH.rect, {
    x: 1.18,
    y: 3.58,
    w: 0.08,
    h: 1.98,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("Respuesta frágil", {
    x: 1.48,
    y: 3.8,
    w: 3.98,
    h: 0.16,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18.4,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("1. Cambia varias cosas a la vez.\n2. Se guía por intuición sin evidencia.\n3. Da por resuelto el caso sin explicar la causa.", {
    x: 1.48,
    y: 4.16,
    w: 3.92,
    h: 0.88,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.2,
    color: C.ink,
    margin: 0,
    breakLine: false,
    valign: "mid",
  });

  addPanel(slide, 6.22, 3.58, 4.68, 1.98, {
    fill: C.softBlue,
    line: C.softBlue,
  });
  slide.addShape(SH.rect, {
    x: 6.22,
    y: 3.58,
    w: 0.08,
    h: 1.98,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Respuesta con criterio", {
    x: 6.52,
    y: 3.8,
    w: 4.06,
    h: 0.16,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18.4,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("1. Aísla la etapa donde falló el flujo.\n2. Contrasta DOM, datos y consola.\n3. Reejecuta y explica por qué ahora sí funciona.", {
    x: 6.52,
    y: 4.16,
    w: 4,
    h: 0.88,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.2,
    color: C.ink,
    margin: 0,
    breakLine: false,
    valign: "mid",
  });

  addPanel(slide, 1.54, 5.72, 8.98, 0.34, {
    fill: C.warm,
    line: C.warm,
  });
  slide.addText("La madurez técnica empieza cuando puedes justificar la corrección y no solo celebrar que la interfaz volvió a verse bien.", {
    x: 1.82,
    y: 5.82,
    w: 8.42,
    h: 0.1,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.8,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide, pptx);
}

function createBlock4QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas para fijar el bloque 4",
    "La meta es que el estudiante salga con una primera rutina de debugging, una relación clara con la consola y una mejor comprensión del valor de documentar un flujo.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 1.1,
    y: 2.28,
    w: 9.84,
    h: 0.88,
    title: "Idea orientadora",
    body: "Depurar una interfaz con DOM y `fetch` significa revisar etapas con evidencia, no probar cambios al azar hasta que algo parezca funcionar.",
    fill: C.navy,
    line: C.navy,
    accent: C.red,
    titleColor: C.white,
    bodyColor: C.white,
    titleFontSize: 16.2,
    bodyFontSize: 9.8,
  });

  addCard(slide, SH, {
    x: 1.18,
    y: 3.64,
    w: 3.04,
    h: 1.62,
    title: "Pregunta 1",
    body: "¿Por qué una interfaz puede fallar aunque el error no esté en la línea que primero sospechamos?",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 15.2,
    bodyFontSize: 10,
  });
  addCard(slide, SH, {
    x: 4.48,
    y: 3.64,
    w: 3.04,
    h: 1.62,
    title: "Pregunta 2",
    body: "¿Qué aporta una rutina por etapas frente a una estrategia de prueba y error desordenada?",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 15.2,
    bodyFontSize: 10,
  });
  addCard(slide, SH, {
    x: 7.78,
    y: 3.64,
    w: 3.04,
    h: 1.62,
    title: "Pregunta 3",
    body: "¿En qué sentido documentar un flujo simple también mejora la comprensión técnica?",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 15.2,
    bodyFontSize: 10,
  });

  validateSlide(slide, pptx);
}

function createBlock4ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del bloque 4",
    "La depuración inicial ya quedó instalada como lectura técnica de evidencia en herramientas reales y no como intuición suelta.",
    "Bloque 4"
  );

  addMiniCard(slide, SH, {
    x: 1.2,
    y: 2.42,
    w: 2.96,
    h: 1.14,
    title: "Aislar",
    body: "detectar en qué etapa del flujo aparece realmente la falla.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 4.48,
    y: 2.42,
    w: 2.96,
    h: 1.14,
    title: "Leer evidencia",
    body: "usar consola, red, DOM e interfaz para comprobar hipótesis.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });
  addMiniCard(slide, SH, {
    x: 7.76,
    y: 2.42,
    w: 2.96,
    h: 1.14,
    title: "Validar",
    body: "confirmar que el flujo ya quedó bien y no solo aparentemente mejor.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 13.2,
    bodyFontSize: 8.6,
  });

  addCenterStatement(
    slide,
    SH,
    "Con este bloque la clase ya cierra una relación completa entre estructura, datos, comportamiento y depuración inicial.",
    {
      x: 1.08,
      y: 4.18,
      w: 9.86,
      h: 1.04,
      fill: C.navy,
      line: C.navy,
      color: C.white,
      fontSize: 17,
    }
  );

  addPanel(slide, 1.54, 5.58, 8.98, 0.42, {
    fill: C.paleRed,
    line: C.paleRed,
  });
  slide.addText("Puente al cierre general: ya existe una base suficiente para entrar a JavaScript moderno con más seguridad técnica.", {
    x: 1.86,
    y: 5.7,
    w: 8.34,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide, pptx);
}

function createGeneralClosingOpeningSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre general de la clase",
    "El miercoles ya unio estructura viva, seleccion de nodos, datos externos y una primera rutina de debugging tecnico.",
    "Cierre"
  );

  addCenterStatement(
    slide,
    SH,
    "La interfaz ya no se lee como algo estatico: se entiende como DOM, codigo, datos y evidencia trabajando juntos.",
    {
      x: 1.08,
      y: 2.18,
      w: 9.86,
      h: 1.02,
      fill: C.navy,
      line: C.navy,
      color: C.white,
      fontSize: 17.4,
    }
  );

  addMapBlock(slide, 1.1, 3.78, 2.18, 1.54, {
    kicker: "Base",
    title: "DOM vivo",
    fill: C.softBlue,
    line: C.softBlue,
    kickerColor: C.navy,
  });
  addArrow(slide, 3.48, 4.4, 0.18, 0.24);
  addMapBlock(slide, 3.84, 3.78, 2.18, 1.54, {
    kicker: "Accion",
    title: "Seleccion y cambio",
    fill: C.paleRed,
    line: C.paleRed,
    kickerColor: C.red,
  });
  addArrow(slide, 6.22, 4.4, 0.18, 0.24);
  addMapBlock(slide, 6.58, 3.78, 2.18, 1.54, {
    kicker: "Datos",
    title: "Fetch y JSON",
    fill: C.warm,
    line: C.warm,
    kickerColor: C.gold,
  });
  addArrow(slide, 8.96, 4.4, 0.18, 0.24);
  addMapBlock(slide, 9.32, 3.78, 1.62, 1.54, {
    kicker: "Criterio",
    title: "Debug",
    fill: C.white,
    line: C.border,
    kickerColor: C.navy,
    fontSize: 13.8,
  });

  addPanel(slide, 1.54, 5.62, 8.96, 0.38, {
    fill: C.paleRed,
    line: C.paleRed,
  });
  slide.addText("Ese encadenamiento es el verdadero aprendizaje del dia: no piezas sueltas, sino sistema conectado.", {
    x: 1.84,
    y: 5.73,
    w: 8.36,
    h: 0.1,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide, pptx);
}

function createSystemChainSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La cadena tecnica que deberia quedar instalada",
    "La sesion tiene valor cuando el estudiante puede leerla como una secuencia que se ejecuta y se comprueba paso a paso.",
    "Cierre"
  );

  addMiniCard(slide, SH, {
    x: 0.98,
    y: 2.7,
    w: 2.02,
    h: 1.26,
    title: "1. HTML y DOM",
    body: "El navegador construye una estructura viva sobre la que JavaScript puede operar.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 12.6,
    bodyFontSize: 8.2,
  });
  addArrow(slide, 3.16, 3.18, 0.22, 0.28);
  addMiniCard(slide, SH, {
    x: 3.5,
    y: 2.7,
    w: 2.02,
    h: 1.26,
    title: "2. Selector",
    body: "Se ubica el nodo correcto y se guarda la referencia que despues se va a leer o modificar.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 12.6,
    bodyFontSize: 8.2,
  });
  addArrow(slide, 5.68, 3.18, 0.22, 0.28);
  addMiniCard(slide, SH, {
    x: 6.02,
    y: 2.7,
    w: 2.02,
    h: 1.26,
    title: "3. Dato",
    body: "Fetch permite traer informacion externa y convertirla en un objeto que la interfaz puede usar.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 12.6,
    bodyFontSize: 8.2,
  });
  addArrow(slide, 8.2, 3.18, 0.22, 0.28);
  addMiniCard(slide, SH, {
    x: 8.54,
    y: 2.7,
    w: 2.36,
    h: 1.26,
    title: "4. Render y evidencia",
    body: "La propiedad se actualiza y luego se valida con DOM, consola, red e interfaz.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
    titleFontSize: 12.4,
    bodyFontSize: 8.1,
  });

  addCard(slide, SH, {
    x: 1.18,
    y: 4.4,
    w: 9.74,
    h: 1.1,
    title: "Lectura madura de la secuencia",
    body: "Si el resultado visible falla, el problema puede estar en cualquiera de esas etapas. Por eso conviene revisar el flujo completo antes de cambiar cosas al azar.",
    fill: C.navy,
    line: C.navy,
    accent: C.red,
    titleColor: C.white,
    bodyColor: C.white,
    titleFontSize: 15.8,
    bodyFontSize: 9.6,
  });

  validateSlide(slide, pptx);
}

function createMethodFlowSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Metodo de trabajo que conviene conservar",
    "La clase tambien instala una forma de trabajar: comprender el sistema, apoyarse cuando sirve y validar con criterio.",
    "Cierre"
  );

  addCard(slide, SH, {
    x: 1.08,
    y: 2.36,
    w: 4.72,
    h: 1.28,
    title: "1. Entender",
    body: "Leer la estructura, el flujo y el rol de cada herramienta antes de tocar codigo al azar.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 18,
    bodyFontSize: 9.6,
  });
  addCard(slide, SH, {
    x: 6.08,
    y: 2.36,
    w: 4.82,
    h: 1.28,
    title: "2. Apoyarse",
    body: "Usar agentes para explicar, comparar o proponer una primera hipotesis sin delegar el juicio tecnico.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 18,
    bodyFontSize: 9.4,
  });
  addCard(slide, SH, {
    x: 1.08,
    y: 3.98,
    w: 4.72,
    h: 1.28,
    title: "3. Verificar",
    body: "Comprobar en DevTools, consola, Network y resultado visible que el flujo realmente coincide con la hipotesis.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 18,
    bodyFontSize: 9.2,
  });
  addCard(slide, SH, {
    x: 6.08,
    y: 3.98,
    w: 4.82,
    h: 1.28,
    title: "4. Explicar",
    body: "Poder justificar que parte estaba fallando y por que la correccion funciono vale mas que solo ver un resultado bonito.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
    titleFontSize: 18,
    bodyFontSize: 9.2,
  });

  addCenterStatement(
    slide,
    SH,
    "El agente acelera partes del trabajo. La validez final sigue dependiendo de evidencia y criterio humano.",
    {
      x: 1.1,
      y: 5.18,
      w: 9.8,
      h: 0.62,
      fill: C.navy,
      line: C.navy,
      color: C.white,
      fontSize: 14.2,
    }
  );

  validateSlide(slide, pptx);
}

function createNextStepSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Puente al siguiente tramo del modulo",
    "Con esta base ya se puede entrar a JavaScript moderno con una lectura menos magica y mas tecnica de lo que pasa en la interfaz.",
    "Cierre"
  );

  addCard(slide, SH, {
    x: 1.08,
    y: 2.26,
    w: 4.76,
    h: 2.72,
    title: "Lo que ya deberia quedar firme",
    body: "DOM como estructura viva.\nSelectores como referencias concretas.\nFetch como entrada de datos externos.\nDebugging como lectura de evidencia por etapas.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 18,
    bodyFontSize: 10,
  });

  addCard(slide, SH, {
    x: 6.12,
    y: 2.26,
    w: 4.8,
    h: 2.72,
    title: "Lo que viene despues",
    body: "ES6+ con mas soltura.\nModulos y mejor organizacion.\nAsincronia mas clara.\nPromesas, manejo de errores y trabajo mas real sobre aplicaciones web.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 18,
    bodyFontSize: 10,
  });

  addCenterStatement(
    slide,
    SH,
    "La clase no termina en fetch ni en el DOM: deja lista la base para entender JavaScript moderno con mas seguridad tecnica.",
    {
      x: 1.08,
      y: 5.28,
      w: 9.86,
      h: 0.76,
      fill: C.warm,
      line: C.warm,
      color: C.navy,
      fontSize: 15.4,
    }
  );

  validateSlide(slide, pptx);
}

async function main() {
  createCoverSlide();
  createMapSlide();
  createHtmlVsDomSlide();
  createDomTreeSlide();
  createDevtoolsSlide();
  createSelectorSlide();
  createMutationFlowSlide();
  createEvidenceSlide();
  createAgenticSlide();
  createQuestionsSlide();
  createClosingSlide();
  createBlock2OpeningSlide();
  createTargetNodeSlide();
  createSelectorsComparisonSlide();
  createReferenceFlowSlide();
  createReadPropertiesSlide();
  createVisibleChangeSlide();
  createClassesAttributesSlide();
  createCriteriaSlide();
  createBlock2AgenticSlide();
  createBlock2QuestionsSlide();
  createBlock2ClosingSlide();
  createBlock3OpeningSlide();
  createExternalDataSlide();
  createRequestResponseSlide();
  createFetchStagesSlide();
  createJsonSlide();
  createFetchToUiSlide();
  createFetchDebugSlide();
  createBlock3AgenticSlide();
  createBlock3QuestionsSlide();
  createBlock3ClosingSlide();
  createBlock4OpeningSlide();
  createFailureMapSlide();
  createDebugRouteSlide();
  createConsoleEvidenceSlide();
  createDocumentationSlide();
  createBlock4AgenticSlide();
  createMaturitySlide();
  createBlock4QuestionsSlide();
  createBlock4ClosingSlide();
  createGeneralClosingOpeningSlide();
  createSystemChainSlide();
  createMethodFlowSlide();
  createNextStepSlide();

  await pptx.writeFile({ fileName: outputPptx });
  fs.copyFileSync(__filename, outputJs);
  console.log(`Deck generado: ${outputPptx}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
