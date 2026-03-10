const fs = require("fs");
const path = require("path");
const PptxGenJS = require("pptxgenjs");
const { imageSizingContain } = require("./pptxgenjs_helpers/image");
const {
  warnIfSlideHasOverlaps,
  warnIfSlideElementsOutOfBounds,
} = require("./pptxgenjs_helpers/layout");

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Codex";
pptx.company = "AIEP";
pptx.subject = "Clase 02";
pptx.title = "Las Herramientas del Taller";
pptx.lang = "es-CL";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "es-CL",
};

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx =
  process.env.PPTX_OUTPUT ||
  path.join(rootDir, "Clase-02-Bloque-1-Las-Herramientas-del-Taller.pptx");
const outputJs =
  process.env.PPTX_SOURCE_OUTPUT ||
  path.join(rootDir, "Clase-02-Bloque-1-Las-Herramientas-del-Taller.js");

const logoPath = path.join(__dirname, "assets", "logo-aiep.png");
const logoMarkPath = path.join(__dirname, "assets", "logo-aiep-mark.png");

const C = {
  paper: "F8F3EC",
  white: "FFFFFF",
  navy: "102A43",
  red: "D62027",
  ink: "243B53",
  slate: "52606D",
  border: "D8CFC4",
  softBlue: "E6EEF7",
  softNeutral: "EDE6DA",
  paleRed: "F8E4E5",
  sand: "EADFD0",
  gold: "E0BC5A",
};

function validateSlide(slide) {
  warnIfSlideHasOverlaps(slide, pptx, { muteContainment: true });
  warnIfSlideElementsOutOfBounds(slide, pptx);
}

function setBackground(slide, color = C.paper) {
  slide.background = { color };
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
    y: y,
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

function addTopRule(slide) {
  slide.addShape(SH.rect, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 0.16,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
}

function addSlideNumber(slide, n) {
  slide.addText(String(n).padStart(2, "0"), {
    x: 10.75,
    y: 0.26,
    w: 1.9,
    h: 0.7,
    fontFace: "Aptos Display",
    fontSize: 28,
    bold: true,
    color: C.sand,
    align: "right",
    margin: 0,
  });
}

function addMarkBox(slide) {
  slide.addShape(SH.ellipse, {
    x: 11.04,
    y: 0.94,
    w: 1.08,
    h: 0.82,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addImage({
    path: logoMarkPath,
    ...imageSizingContain(logoMarkPath, 11.25, 1.16, 0.66, 0.34),
  });
}

function addChip(slide, text, opts = {}) {
  const {
    x = 0.78,
    y = 0.52,
    w = 2.1,
    fill = C.navy,
    color = C.white,
  } = opts;
  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h: 0.34,
    rectRadius: 0.05,
    fill: { color: fill },
    line: { color: fill },
  });
  slide.addText(text, {
    x: x + 0.12,
    y: y + 0.04,
    w: w - 0.24,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 9.5,
    bold: true,
    color,
    align: "center",
    margin: 0,
  });
}

function addHeader(slide, number, title, subtitle, blockLabel = "Bloque 1") {
  setBackground(slide, C.paper);
  addTopRule(slide);
  addSlideNumber(slide, pptx._slides.length);
  addChip(slide, `Clase 02 · ${blockLabel}`, {
    x: 0.72,
    y: 0.52,
    w: 2.15,
    fill: C.red,
  });
  addMarkBox(slide);
  slide.addText(title, {
    x: 0.72,
    y: 0.98,
    w: 8.9,
    h: 0.74,
    fontFace: "Aptos Display",
    fontSize: 25,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.74,
      y: 1.86,
      w: 8.5,
      h: 0.4,
      fontFace: "Aptos",
      fontSize: 13,
      color: C.slate,
      margin: 0,
    });
  }
}

function addBlock2Header(slide, number, title, subtitle) {
  addHeader(slide, number, title, subtitle, "Bloque 2");
}

function addBlock3Header(slide, number, title, subtitle) {
  addHeader(slide, number, title, subtitle, "Bloque 3");
}

function addBlock4Header(slide, number, title, subtitle) {
  addHeader(slide, number, title, subtitle, "Bloque 4");
}

function addCard(slide, opts) {
  const {
    x,
    y,
    w,
    h,
    title,
    body,
    fill = C.white,
    line = C.border,
    accent = C.red,
    titleColor = C.navy,
    bodyColor = C.ink,
    titleFontSize = 16,
    bodyFontSize = 13,
  } = opts;

  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: fill },
    line: { color: line, pt: 1 },
  });

  slide.addShape(SH.rect, {
    x: x + 0.16,
    y: y + 0.16,
    w: 0.18,
    h: h - 0.32,
    fill: { color: accent },
    line: { color: accent },
  });

  slide.addText(title, {
    x: x + 0.48,
    y: y + 0.18,
    w: w - 0.64,
    h: 0.34,
    fontFace: "Aptos Display",
    fontSize: titleFontSize,
    bold: true,
    color: titleColor,
    margin: 0,
  });

  slide.addText(body, {
    x: x + 0.48,
    y: y + 0.58,
    w: w - 0.68,
    h: h - 0.78,
    fontFace: "Aptos",
    fontSize: bodyFontSize,
    color: bodyColor,
    margin: 0,
    valign: "top",
    breakLine: false,
  });
}

function addBigStatement(slide, title, body) {
  slide.addShape(SH.roundRect, {
    x: 0.82,
    y: 2.18,
    w: 11.7,
    h: 4.6,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addShape(SH.roundRect, {
    x: 1.18,
    y: 2.52,
    w: 6.45,
    h: 1.18,
    rectRadius: 0.06,
    fill: { color: C.paleRed },
    line: { color: C.paleRed },
  });
  // La banda suave respalda el titular y se usa como recurso compositivo, no como caja separada.
  addBarsMotif(slide, 1.02, 2.6, 1.18);
  slide.addText(title, {
    x: 1.96,
    y: 2.6,
    w: 5.4,
    h: 1.0,
    fontFace: "Aptos Display",
    fontSize: 25,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText(body, {
    x: 1.98,
    y: 3.86,
    w: 6.5,
    h: 1.42,
    fontFace: "Aptos",
    fontSize: 17,
    color: C.ink,
    margin: 0,
    breakLine: false,
  });
  slide.addShape(SH.roundRect, {
    x: 9.08,
    y: 2.98,
    w: 2.86,
    h: 2.48,
    rectRadius: 0.06,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Editor\nNavegador\nDevTools\nGit", {
    x: 9.44,
    y: 3.44,
    w: 2.16,
    h: 1.12,
    fontFace: "Aptos Display",
    fontSize: 18,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 1.96,
    y: 5.5,
    w: 6.7,
    h: 0.52,
    rectRadius: 0.04,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("Código es solo una parte del trabajo técnico.", {
    x: 2.18,
    y: 5.64,
    w: 6.26,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 12.5,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
}

function addProcessStep(slide, x, title, body, fill) {
  slide.addShape(SH.roundRect, {
    x,
    y: 3.0,
    w: 2.28,
    h: 2.14,
    rectRadius: 0.06,
    fill: { color: fill },
    line: { color: fill },
  });
  slide.addText(title, {
    x: x + 0.2,
    y: 3.24,
    w: 1.88,
    h: 0.34,
    fontFace: "Aptos Display",
    fontSize: 16,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  slide.addText(body, {
    x: x + 0.2,
    y: 3.72,
    w: 1.88,
    h: 0.94,
    fontFace: "Aptos",
    fontSize: 12,
    color: C.ink,
    align: "center",
    margin: 0,
  });
}

function addArrow(slide, x, y) {
  slide.addShape(SH.chevron, {
    x,
    y,
    w: 0.42,
    h: 0.36,
    fill: { color: C.red },
    line: { color: C.red },
  });
}

function addStripItem(slide, opts) {
  const {
    x,
    y,
    w,
    text,
    fill = C.white,
    line = C.border,
    accent = C.red,
    textColor = C.navy,
  } = opts;

  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h: 0.56,
    rectRadius: 0.04,
    fill: { color: fill },
    line: { color: line, pt: 1 },
  });
  slide.addShape(SH.rect, {
    x: x + 0.12,
    y: y + 0.12,
    w: 0.18,
    h: 0.32,
    fill: { color: accent },
    line: { color: accent },
  });
  slide.addText(text, {
    x: x + 0.44,
    y: y + 0.15,
    w: w - 0.58,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 12.5,
    bold: true,
    color: textColor,
    margin: 0,
  });
}

function addPill(slide, x, y, w, text, fill = C.white, color = C.navy) {
  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h: 0.38,
    rectRadius: 0.08,
    fill: { color: fill },
    line: { color: fill },
  });
  slide.addText(text, {
    x: x + 0.14,
    y: y + 0.09,
    w: w - 0.28,
    h: 0.16,
    fontFace: "Aptos",
    fontSize: 11.5,
    bold: true,
    color,
    align: "center",
    margin: 0,
  });
}

function addCodePanel(slide, opts) {
  const { x, y, w, h, lines } = opts;
  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.06,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addShape(SH.roundRect, {
    x: x + 0.18,
    y: y + 0.16,
    w: w - 0.36,
    h: 0.42,
    rectRadius: 0.05,
    fill: { color: "214466" },
    line: { color: "214466" },
  });
  slide.addShape(SH.ellipse, {
    x: x + 0.32,
    y: y + 0.28,
    w: 0.11,
    h: 0.11,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addShape(SH.ellipse, {
    x: x + 0.5,
    y: y + 0.28,
    w: 0.11,
    h: 0.11,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addShape(SH.ellipse, {
    x: x + 0.68,
    y: y + 0.28,
    w: 0.11,
    h: 0.11,
    fill: { color: C.white },
    line: { color: C.white },
  });

  lines.forEach((line, idx) => {
    slide.addText(line, {
      x: x + 0.34,
      y: y + 0.82 + idx * 0.48,
      w: w - 0.68,
      h: 0.22,
      fontFace: "Consolas",
      fontSize: 14,
      color: C.white,
      margin: 0,
    });
  });
}

function createCoverSlide() {
  const slide = pptx.addSlide();
  setBackground(slide, C.navy);

  slide.addShape(SH.rect, {
    x: 0.92,
    y: 0.92,
    w: 0.12,
    h: 5.8,
    fill: { color: C.red },
    line: { color: C.red },
  });
  addBarsMotif(slide, 0.9, 0.98, 1.35);

  slide.addText("Clase 02", {
    x: 1.36,
    y: 2.0,
    w: 3.3,
    h: 0.44,
    fontFace: "Aptos",
    fontSize: 16,
    bold: true,
    color: "E9EEF4",
    margin: 0,
  });

  slide.addText("Las Herramientas del Taller", {
    x: 1.36,
    y: 2.5,
    w: 6.9,
    h: 0.96,
    fontFace: "Aptos Display",
    fontSize: 28,
    bold: true,
    color: C.white,
    margin: 0,
  });

  slide.addText("Git, DevTools y flujo de trabajo moderno", {
    x: 1.38,
    y: 3.66,
    w: 6.2,
    h: 0.42,
    fontFace: "Aptos",
    fontSize: 14,
    color: "D8DEE6",
    margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 8.9,
    y: 0.86,
    w: 3.52,
    h: 1.38,
    rectRadius: 0.07,
    fill: { color: C.white },
    line: { color: C.white },
  });
  slide.addImage({
    path: logoPath,
    ...imageSizingContain(logoPath, 9.15, 1.08, 3.0, 0.9),
  });

  slide.addShape(SH.roundRect, {
    x: 1.38,
    y: 4.58,
    w: 4.1,
    h: 1.44,
    rectRadius: 0.06,
    fill: { color: "143F7A" },
    line: { color: "143F7A" },
  });
  slide.addText("Semana 01\nMartes 17 de marzo de 2026\n10:00 - 13:00", {
    x: 1.66,
    y: 4.92,
    w: 2.8,
    h: 0.78,
    fontFace: "Aptos",
    fontSize: 13,
    color: C.white,
    margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 5.72,
    y: 4.58,
    w: 3.38,
    h: 1.44,
    rectRadius: 0.06,
    fill: { color: C.paleRed },
    line: { color: C.paleRed },
  });
  slide.addText("Bloque 1\nEl entorno del desarrollador web", {
    x: 6.0,
    y: 4.94,
    w: 2.72,
    h: 0.64,
    fontFace: "Aptos Display",
    fontSize: 16,
    bold: true,
    color: C.navy,
    margin: 0,
    align: "center",
  });

  validateSlide(slide);
}

function createMapSlide() {
  const slide = pptx.addSlide();
  setBackground(slide, C.navy);
  addChip(slide, "Ruta de la sesión", {
    x: 0.76,
    y: 0.62,
    w: 1.76,
    fill: C.red,
  });
  slide.addText("Mapa de la clase", {
    x: 0.76,
    y: 1.42,
    w: 5.4,
    h: 0.56,
    fontFace: "Aptos Display",
    fontSize: 26,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("La clase recorre el entorno de trabajo, la observación técnica, el versionado y el flujo real de desarrollo.", {
    x: 0.8,
    y: 2.18,
    w: 6.9,
    h: 0.5,
    fontFace: "Aptos",
    fontSize: 14,
    color: "D8DEE6",
    margin: 0,
  });

  slide.addShape(SH.ellipse, {
    x: 10.32,
    y: 0.52,
    w: 2.3,
    h: 2.1,
    fill: { color: "1E5665" },
    line: { color: "1E5665" },
  });

  addCard(slide, {
    x: 0.86,
    y: 3.3,
    w: 2.9,
    h: 2.06,
    title: "Bloque 1",
    body: "El entorno del desarrollador web",
    fill: C.white,
    accent: C.red,
    titleFontSize: 15,
    bodyFontSize: 17,
  });
  addCard(slide, {
    x: 3.94,
    y: 3.3,
    w: 2.72,
    h: 2.06,
    title: "Bloque 2",
    body: "El navegador como laboratorio",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.gold,
    titleFontSize: 15,
    bodyFontSize: 16,
  });
  addCard(slide, {
    x: 6.84,
    y: 3.3,
    w: 2.72,
    h: 2.06,
    title: "Bloque 3",
    body: "Git y GitHub sin humo",
    fill: C.white,
    accent: C.red,
    titleFontSize: 15,
    bodyFontSize: 16,
  });
  addCard(slide, {
    x: 9.74,
    y: 3.3,
    w: 2.72,
    h: 2.06,
    title: "Bloque 4",
    body: "Flujo de trabajo moderno",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.gold,
    titleFontSize: 15,
    bodyFontSize: 16,
  });

  slide.addShape(SH.roundRect, {
    x: 1.08,
    y: 6.08,
    w: 11.0,
    h: 0.62,
    rectRadius: 0.04,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("Desarrollar web exige coordinar herramientas, procesos y decisiones técnicas.", {
    x: 1.34,
    y: 6.26,
    w: 10.46,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 13,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createBlockIntroSlide() {
  const slide = pptx.addSlide();
  setBackground(slide, C.navy);

  slide.addShape(SH.roundRect, {
    x: 0.84,
    y: 1.06,
    w: 8.22,
    h: 5.0,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.white },
  });
  slide.addShape(SH.roundRect, {
    x: 9.38,
    y: 1.44,
    w: 2.3,
    h: 1.56,
    rectRadius: 0.06,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addShape(SH.roundRect, {
    x: 9.38,
    y: 3.2,
    w: 2.58,
    h: 2.06,
    rectRadius: 0.06,
    fill: { color: C.softBlue },
    line: { color: C.softBlue },
  });
  addBarsMotif(slide, 1.12, 1.38, 1.5);
  slide.addText("Bloque 1", {
    x: 2.34,
    y: 1.44,
    w: 2.0,
    h: 0.28,
    fontFace: "Aptos",
    fontSize: 14,
    bold: true,
    color: C.red,
    margin: 0,
  });
  slide.addText("El entorno del desarrollador web", {
    x: 2.3,
    y: 1.84,
    w: 6.0,
    h: 0.82,
    fontFace: "Aptos Display",
    fontSize: 28,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("El desarrollo web se apoya en un entorno de trabajo compuesto por herramientas distintas que permiten construir, probar, corregir y mantener una aplicación.", {
    x: 2.32,
    y: 2.94,
    w: 5.76,
    h: 1.12,
    fontFace: "Aptos",
    fontSize: 15,
    color: C.ink,
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 2.12,
    y: 4.72,
    w: 5.68,
    h: 0.66,
    rectRadius: 0.04,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("El entorno de desarrollo también es parte del trabajo técnico.", {
    x: 2.34,
    y: 4.92,
    w: 5.24,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 12.5,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  slide.addText("Entorno", {
    x: 9.38,
    y: 1.9,
    w: 2.58,
    h: 0.26,
    fontFace: "Aptos Display",
    fontSize: 18,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addText("Herramientas base", {
    x: 9.56,
    y: 2.28,
    w: 2.2,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 11.5,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addImage({
    path: logoMarkPath,
    ...imageSizingContain(logoMarkPath, 10.0, 3.52, 1.32, 0.76),
  });
  slide.addText("Archivos, navegador, pruebas y versiones forman parte del mismo trabajo.", {
    x: 9.64,
    y: 4.34,
    w: 2.06,
    h: 0.8,
    fontFace: "Aptos",
    fontSize: 11.5,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createNotOnlyCodeSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    4,
    "Desarrollar web no es solo escribir código",
    "Trabajar en la web también implica archivos, navegador, pruebas, errores y decisiones técnicas."
  );
  addBigStatement(
    slide,
    "Un desarrollador no trabaja solo con código.",
    "Trabaja también con archivos, navegador, DevTools, terminal, historial de cambios, errores, pruebas y decisiones técnicas."
  );
  validateSlide(slide);
}

function createMythVsRealitySlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    5,
    "La imagen incompleta y la imagen real",
    "La práctica cotidiana exige mucho más que abrir un editor y escribir unas pocas líneas."
  );

  const cards = [
    {
      x: 0.92,
      y: 2.3,
      w: 5.4,
      h: 1.56,
      title: "Imagen reducida",
      body: "Abrir el editor, escribir código y esperar que todo funcione.",
      fill: C.white,
      line: C.border,
      accent: C.red,
    },
    {
      x: 6.54,
      y: 2.3,
      w: 5.86,
      h: 1.56,
      title: "Imagen real",
      body: "Editar, probar, inspeccionar, corregir, ejecutar tareas y versionar.",
      fill: C.softBlue,
      line: C.softBlue,
      accent: C.navy,
    },
    {
      x: 0.92,
      y: 4.14,
      w: 5.4,
      h: 1.42,
      title: "Lo que la mirada simple omite",
      body: "Organización del proyecto, prueba, diagnóstico y registro del trabajo.",
      fill: C.paleRed,
      line: C.paleRed,
      accent: C.gold,
    },
    {
      x: 6.54,
      y: 4.14,
      w: 5.86,
      h: 1.42,
      title: "Lo que la mirada madura incorpora",
      body: "Calidad, continuidad, criterio técnico y una forma más profesional de trabajar.",
      fill: C.white,
      line: C.border,
      accent: C.red,
    },
  ];

  cards.forEach((card) =>
    addCard(slide, {
      ...card,
      titleFontSize: 17,
      bodyFontSize: 13.5,
    })
  );

  slide.addShape(SH.roundRect, {
    x: 1.74,
    y: 6.02,
    w: 9.88,
    h: 0.5,
    rectRadius: 0.04,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("La diferencia no es solo técnica: es una diferencia de oficio.", {
    x: 2.04,
    y: 6.16,
    w: 9.28,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 12.5,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createToolsOverviewSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    6,
    "Herramientas básicas del entorno moderno",
    "Estas piezas no son accesorias: juntas forman el entorno mínimo con el que se trabaja una aplicación web."
  );

  const cards = [
    ["Editor", "Espacio principal para crear y modificar archivos.", C.red, C.white, C.border],
    ["Archivos", "Organizan rutas, nombres, carpetas y estructura del proyecto.", C.navy, C.softBlue, C.softBlue],
    ["Terminal", "Ejecuta tareas, instala dependencias y automatiza pasos.", C.gold, C.paleRed, C.paleRed],
    ["Navegador", "Permite visualizar, probar y detectar comportamientos.", C.navy, C.white, C.border],
    ["DevTools", "Inspecciona HTML, CSS, consola, red y errores.", C.red, C.softBlue, C.softBlue],
    ["Git y GitHub", "Registran cambios, mantienen historial y respaldan trabajo.", C.gold, C.paleRed, C.paleRed],
  ];

  cards.forEach(([title, body, accent, fill, line], idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    addCard(slide, {
      x: 0.9 + col * 4.1,
      y: 2.32 + row * 1.9,
      w: 3.55,
      h: 1.56,
      title,
      body,
      fill,
      line,
      accent,
      titleFontSize: 16,
      bodyFontSize: 11.5,
    });
  });

  slide.addShape(SH.roundRect, {
    x: 1.82,
    y: 6.1,
    w: 9.64,
    h: 0.58,
    rectRadius: 0.04,
    fill: { color: C.softNeutral },
    line: { color: "3DAA9C", pt: 1.2 },
  });
  slide.addText("Juntas forman el entorno mínimo desde el cual se construye, observa, corrige y conserva una aplicación.", {
    x: 2.08,
    y: 6.26,
    w: 9.12,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 12.5,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createToolGroupsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    7,
    "Cada herramienta resuelve un tipo de problema",
    "El entorno combina producción, prueba, observación y memoria del trabajo."
  );

  const topCards = [
    {
      x: 0.92,
      y: 2.3,
      title: "Producción",
      body: "La parte donde construimos y ordenamos el proyecto.",
      fill: C.white,
      line: C.border,
      accent: C.red,
    },
    {
      x: 4.8,
      y: 2.3,
      title: "Ejecución y prueba",
      body: "La parte donde levantamos tareas y observamos lo que ocurre.",
      fill: C.softBlue,
      line: C.softBlue,
      accent: C.navy,
    },
    {
      x: 8.68,
      y: 2.3,
      title: "Inspección y memoria",
      body: "La parte donde diagnosticamos y conservamos el proceso.",
      fill: C.paleRed,
      line: C.paleRed,
      accent: C.gold,
    },
  ];

  topCards.forEach((card) =>
    addCard(slide, {
      ...card,
      w: 3.76,
      h: 1.56,
      titleFontSize: 17,
      bodyFontSize: 12.5,
    })
  );

  const bottomCards = [
    {
      x: 0.92,
      y: 4.16,
      title: "Editor + archivos",
      body: "Se nombran piezas, se ubican carpetas y se mantiene una estructura comprensible.",
      fill: C.softNeutral,
      line: C.softNeutral,
      accent: C.red,
    },
    {
      x: 4.8,
      y: 4.16,
      title: "Terminal + navegador",
      body: "Se ejecutan tareas, se revisa el resultado y se comprueba el comportamiento real.",
      fill: C.white,
      line: C.border,
      accent: C.navy,
    },
    {
      x: 8.68,
      y: 4.16,
      title: "DevTools + Git y GitHub",
      body: "Se entiende mejor el sistema y se conserva el historial del trabajo.",
      fill: C.softBlue,
      line: C.softBlue,
      accent: C.red,
    },
  ];

  bottomCards.forEach((card) =>
    addCard(slide, {
      ...card,
      w: 3.76,
      h: 1.48,
      titleFontSize: 16,
      bodyFontSize: 12.5,
    })
  );

  slide.addText("Cada herramienta cumple un papel distinto dentro del mismo proceso de trabajo.", {
    x: 1.08,
    y: 6.18,
    w: 11.1,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 12.5,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createSystemSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    8,
    "Las herramientas no están aisladas",
    "Editor, navegador, DevTools y Git forman parte de una misma cadena de acciones técnicas."
  );

  const steps = [
    ["Editor", "Se modifica el archivo.", C.white],
    ["Navegador", "Se revisa el resultado.", C.softBlue],
    ["DevTools", "Se investiga si algo falla.", C.white],
    ["Git", "Se registra el cambio correcto.", C.softBlue],
  ];

  steps.forEach(([title, body, fill], idx) => {
    const x = 0.94 + idx * 3.05;
    addProcessStep(slide, x, title, body, fill);
    if (idx < steps.length - 1) {
      addArrow(slide, x + 2.45, 3.92);
    }
  });

  slide.addText("No son herramientas sueltas: forman una cadena de acciones técnicas coordinadas.", {
    x: 1.26,
    y: 5.72,
    w: 10.8,
    h: 0.36,
    fontFace: "Aptos",
    fontSize: 14,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createExampleFlowSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    9,
    "Ejemplo simple: cambiar el título de una página",
    "Una modificación pequeña basta para ver cómo se conectan editor, navegador, DevTools y Git."
  );

  const items = [
    ["1", "Abrir el proyecto", "Se ubica la carpeta y el archivo que debe modificarse."],
    ["2", "Editar y guardar", "El cambio se escribe en el editor y queda registrado en disco."],
    ["3", "Revisar en el navegador", "Se valida si el resultado corresponde a lo esperado."],
    ["4", "Inspeccionar si algo falla", "DevTools permite observar HTML, CSS, consola o red."],
    ["5", "Versionar", "Cuando el cambio ya es correcto, se registra con Git."],
  ];

  items.forEach(([num, title, body], idx) => {
    const y = 2.34 + idx * 0.82;
    slide.addShape(SH.roundRect, {
      x: 1.0,
      y,
      w: 0.52,
      h: 0.5,
      rectRadius: 0.05,
      fill: { color: idx % 2 === 0 ? C.red : C.navy },
      line: { color: idx % 2 === 0 ? C.red : C.navy },
    });
    slide.addText(num, {
      x: 1.0,
      y: y + 0.07,
      w: 0.52,
      h: 0.18,
      fontFace: "Aptos Display",
      fontSize: 14,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    });
    slide.addText(title, {
      x: 1.74,
      y: y + 0.03,
      w: 2.7,
      h: 0.22,
      fontFace: "Aptos Display",
      fontSize: 16,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(body, {
      x: 4.84,
      y: y + 0.01,
      w: 6.3,
      h: 0.3,
      fontFace: "Aptos",
      fontSize: 12.5,
      color: C.ink,
      margin: 0,
    });
  });

  validateSlide(slide);
}

function createToolchainSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    10,
    "Una sola acción puede activar varias capas",
    "Una modificación simple activa producción, observación, diagnóstico, automatización y memoria del proyecto."
  );

  addCard(slide, {
    x: 0.92,
    y: 2.28,
    w: 3.85,
    h: 1.6,
    title: "Producción",
    body: "Editor + archivos.\nAquí se crea o modifica el cambio.",
    fill: C.white,
    accent: C.red,
    titleFontSize: 17,
    bodyFontSize: 13,
  });
  addCard(slide, {
    x: 4.82,
    y: 2.28,
    w: 3.85,
    h: 1.6,
    title: "Observación",
    body: "Navegador.\nAquí se comprueba el resultado visible.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 17,
    bodyFontSize: 13,
  });
  addCard(slide, {
    x: 8.72,
    y: 2.28,
    w: 3.6,
    h: 1.6,
    title: "Diagnóstico",
    body: "DevTools.\nAquí se entiende qué está pasando.",
    fill: C.white,
    accent: C.red,
    titleFontSize: 17,
    bodyFontSize: 13,
  });
  addCard(slide, {
    x: 2.62,
    y: 4.12,
    w: 3.85,
    h: 1.6,
    title: "Automatización",
    body: "Terminal.\nAquí se ejecutan tareas y pasos del proyecto.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 17,
    bodyFontSize: 13,
  });
  addCard(slide, {
    x: 6.88,
    y: 4.12,
    w: 3.85,
    h: 1.6,
    title: "Memoria del trabajo",
    body: "Git y GitHub.\nAquí el cambio queda trazable y respaldado.",
    fill: C.white,
    accent: C.red,
    titleFontSize: 17,
    bodyFontSize: 13,
  });

  validateSlide(slide);
}

function createTechnicalJudgementSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    11,
    "El entorno también expresa criterio técnico",
    "Trabajar bien también implica orden, revisión de errores y registro del proceso realizado."
  );

  slide.addShape(SH.roundRect, {
    x: 0.94,
    y: 2.34,
    w: 4.52,
    h: 0.58,
    rectRadius: 0.04,
    fill: { color: C.paleRed },
    line: { color: C.paleRed },
  });
  slide.addText("Trabajar con criterio implica", {
    x: 1.18,
    y: 2.5,
    w: 4.04,
    h: 0.2,
    fontFace: "Aptos Display",
    fontSize: 16,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  const criteria = [
    "Mantener archivos ordenados.",
    "Saber dónde está cada parte del proyecto.",
    "Probar cambios de manera sistemática.",
    "Diagnosticar en vez de adivinar.",
    "Conservar historial y respaldo.",
  ];

  criteria.forEach((item, idx) => {
    addStripItem(slide, {
      x: 0.98,
      y: 3.14 + idx * 0.62,
      w: 4.44,
      text: item,
      fill: idx % 2 === 0 ? C.white : C.softNeutral,
      line: idx % 2 === 0 ? C.border : C.softNeutral,
      accent: idx % 2 === 0 ? C.red : C.gold,
    });
  });

  addCard(slide, {
    x: 6.02,
    y: 2.46,
    w: 3.0,
    h: 1.36,
    title: "Más legible",
    body: "El trabajo se entiende mejor y cuesta menos retomarlo.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 17,
    bodyFontSize: 12.5,
  });
  addCard(slide, {
    x: 9.3,
    y: 2.46,
    w: 3.0,
    h: 1.36,
    title: "Más replicable",
    body: "Los pasos pueden seguirse con más orden y menos improvisación.",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 17,
    bodyFontSize: 12.5,
  });
  addCard(slide, {
    x: 6.02,
    y: 4.1,
    w: 6.28,
    h: 1.62,
    title: "Más sostenible",
    body: "Eso importa para estudiar, trabajar en equipo y mantener una aplicación con el tiempo sin depender de la memoria improvisada.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 18,
    bodyFontSize: 13,
  });

  validateSlide(slide);
}

function createDisorderSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    12,
    "Qué pasa cuando el entorno está desordenado",
    "Varios problemas de desarrollo no nacen del lenguaje, sino de un trabajo sin estructura."
  );

  const items = [
    ["Archivos mal nombrados", "Cuesta encontrar qué modificar y aparecen cambios en lugares incorrectos."],
    ["No probar en navegador", "Se cree que algo funciona sin comprobar el comportamiento real."],
    ["No mirar DevTools", "Los errores se adivinan en vez de diagnosticarse."],
    ["No versionar", "Se pierde historia, contexto y posibilidad de volver atrás."],
  ];

  items.forEach(([title, body], idx) => {
    addCard(slide, {
      x: 0.92 + (idx % 2) * 5.82,
      y: 2.42 + Math.floor(idx / 2) * 1.86,
      w: 5.56,
      h: 1.48,
      title,
      body,
      fill: idx % 2 === 0 ? C.white : C.softBlue,
      line: idx % 2 === 0 ? C.border : C.softBlue,
      accent: idx % 2 === 0 ? C.red : C.navy,
      titleFontSize: 16,
      bodyFontSize: 12,
    });
  });

  validateSlide(slide);
}

function createQuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    13,
    "Preguntas para pensar",
    "Estas preguntas recogen las ideas principales del bloque y preparan la conversación."
  );

  const questions = [
    [
      "Más que código",
      "¿Por qué desarrollar web no se reduce a escribir código en un editor?",
      C.white,
      C.border,
      C.red,
    ],
    [
      "Roles distintos",
      "¿Qué diferencia existe entre editor, navegador y terminal dentro del flujo de trabajo?",
      C.softBlue,
      C.softBlue,
      C.navy,
    ],
    [
      "Herramientas como sistema",
      "¿Por qué conviene pensar las herramientas como un sistema y no como piezas aisladas?",
      C.white,
      C.border,
      C.red,
    ],
    [
      "Primer lugar de observación",
      "Si algo falla, ¿qué herramienta mirarías primero para entender mejor el problema?",
      C.paleRed,
      C.paleRed,
      C.gold,
    ],
  ];

  questions.forEach(([title, body, fill, line, accent], idx) => {
    addCard(slide, {
      x: 0.92 + (idx % 2) * 5.78,
      y: 2.34 + Math.floor(idx / 2) * 1.82,
      w: 5.5,
      h: 1.46,
      title,
      body,
      fill,
      line,
      accent,
      titleFontSize: 16,
      bodyFontSize: 13,
    });
  });

  validateSlide(slide);
}

function createClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    14,
    "Síntesis del bloque",
    "El entorno de desarrollo forma parte del trabajo técnico y del criterio profesional."
  );

  const closingCards = [
    {
      x: 0.92,
      y: 2.34,
      w: 5.2,
      h: 1.44,
      title: "Idea clave",
      body: "El desarrollo web moderno se apoya en un entorno de herramientas distintas y complementarias.",
      fill: C.white,
      line: C.border,
      accent: C.red,
    },
    {
      x: 6.38,
      y: 2.34,
      w: 5.94,
      h: 1.44,
      title: "Qué cambia en la mirada",
      body: "Dejamos de ver el trabajo web como solo código y empezamos a verlo como proceso técnico.",
      fill: C.softBlue,
      line: C.softBlue,
      accent: C.navy,
    },
    {
      x: 0.92,
      y: 4.08,
      w: 5.2,
      h: 1.44,
      title: "Siguiente foco",
      body: "El navegador será la primera herramienta que veremos con más detalle para observar una página.",
      fill: C.paleRed,
      line: C.paleRed,
      accent: C.gold,
    },
    {
      x: 6.38,
      y: 4.08,
      w: 5.94,
      h: 1.44,
      title: "Pregunta de salida",
      body: "¿Qué herramienta del entorno te parece hoy más decisiva para trabajar con más orden y claridad?",
      fill: C.white,
      line: C.border,
      accent: C.red,
    },
  ];

  closingCards.forEach((card) =>
    addCard(slide, {
      ...card,
      titleFontSize: 17,
      bodyFontSize: 13,
    })
  );

  slide.addText("Desde aquí podemos pasar al navegador como espacio de observación, prueba e inspección.", {
    x: 1.24,
    y: 6.1,
    w: 10.8,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 12.5,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createBlock2IntroSlide() {
  const slide = pptx.addSlide();
  setBackground(slide, C.paper);
  addTopRule(slide);

  slide.addShape(SH.roundRect, {
    x: 0.78,
    y: 1.0,
    w: 3.34,
    h: 5.46,
    rectRadius: 0.08,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  addBarsMotif(slide, 1.08, 1.34, 1.28, C.red);
  addChip(slide, "Bloque 2", {
    x: 1.84,
    y: 1.96,
    w: 1.6,
    fill: C.red,
  });
  slide.addText("El navegador\ncomo laboratorio", {
    x: 1.08,
    y: 2.56,
    w: 2.58,
    h: 1.36,
    fontFace: "Aptos Display",
    fontSize: 24,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Visualizar, inspeccionar y reunir evidencias también es parte del trabajo web.", {
    x: 1.08,
    y: 4.48,
    w: 2.56,
    h: 0.82,
    fontFace: "Aptos",
    fontSize: 13,
    color: "E9EEF4",
    margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 4.48,
    y: 1.2,
    w: 7.92,
    h: 4.76,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addShape(SH.roundRect, {
    x: 4.82,
    y: 1.5,
    w: 7.24,
    h: 0.5,
    rectRadius: 0.05,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addShape(SH.ellipse, {
    x: 5.08,
    y: 1.66,
    w: 0.12,
    h: 0.12,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addShape(SH.ellipse, {
    x: 5.28,
    y: 1.66,
    w: 0.12,
    h: 0.12,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addShape(SH.ellipse, {
    x: 5.48,
    y: 1.66,
    w: 0.12,
    h: 0.12,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Una página puede verse, inspeccionarse y explicarse.", {
    x: 5.12,
    y: 2.36,
    w: 5.46,
    h: 0.82,
    fontFace: "Aptos Display",
    fontSize: 24,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("El navegador deja observar estructura, comportamiento y problemas antes de tocar el código.", {
    x: 5.14,
    y: 3.2,
    w: 5.92,
    h: 0.72,
    fontFace: "Aptos",
    fontSize: 16,
    color: C.ink,
    margin: 0,
  });
  addPill(slide, 5.12, 4.4, 1.8, "HTML y CSS", C.paleRed, C.navy);
  addPill(slide, 7.14, 4.4, 1.42, "Consola", C.softBlue, C.navy);
  addPill(slide, 8.78, 4.4, 1.1, "Red", C.softNeutral, C.navy);
  slide.addShape(SH.roundRect, {
    x: 5.12,
    y: 5.04,
    w: 5.88,
    h: 0.48,
    rectRadius: 0.04,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("Ver y leer técnicamente no son la misma operación.", {
    x: 5.34,
    y: 5.18,
    w: 5.44,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 12,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createBrowserAnalysisSlide() {
  const slide = pptx.addSlide();
  addBlock2Header(
    slide,
    16,
    "El navegador también permite analizar",
    "No solo muestra una interfaz: también deja observar estructura, estilos, solicitudes y errores."
  );

  slide.addShape(SH.roundRect, {
    x: 0.92,
    y: 2.3,
    w: 3.86,
    h: 3.96,
    rectRadius: 0.08,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Lo visible", {
    x: 1.22,
    y: 2.6,
    w: 3.1,
    h: 0.28,
    fontFace: "Aptos",
    fontSize: 13,
    bold: true,
    color: "E9EEF4",
    margin: 0,
  });
  slide.addText("Una página puede verse bien y aun así esconder problemas técnicos.", {
    x: 1.22,
    y: 2.96,
    w: 3.06,
    h: 2.04,
    fontFace: "Aptos Display",
    fontSize: 21,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addPill(slide, 1.24, 5.28, 1.04, "Se ve", C.red, C.white);
  addPill(slide, 2.44, 5.28, 0.94, "Cambia", C.white, C.navy);
  addPill(slide, 3.54, 5.28, 0.96, "Falla", C.paleRed, C.navy);

  slide.addShape(SH.roundRect, {
    x: 5.12,
    y: 2.3,
    w: 7.2,
    h: 1.3,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Analizar significa reunir evidencia para explicar lo que ocurre en pantalla.", {
    x: 5.48,
    y: 2.66,
    w: 6.4,
    h: 0.56,
    fontFace: "Aptos Display",
    fontSize: 20,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  const evidenceCards = [
    {
      x: 5.12,
      y: 3.98,
      w: 2.18,
      h: 1.74,
      title: "Estructura",
      body: "Qué HTML sostiene el fragmento visible.",
      fill: C.paleRed,
      line: C.paleRed,
      accent: C.red,
    },
    {
      x: 7.62,
      y: 3.84,
      w: 2.18,
      h: 1.74,
      title: "Estilos",
      body: "Qué reglas y clases afectan al elemento.",
      fill: C.softBlue,
      line: C.softBlue,
      accent: C.navy,
    },
    {
      x: 10.12,
      y: 4.18,
      w: 2.18,
      h: 1.74,
      title: "Carga",
      body: "Qué archivo, error o solicitud intervino.",
      fill: C.white,
      line: C.border,
      accent: C.red,
    },
  ];

  evidenceCards.forEach((card) =>
    addCard(slide, {
      ...card,
      titleFontSize: 15.5,
      bodyFontSize: 11.8,
    })
  );

  slide.addText("Observar precede a corregir.", {
    x: 5.34,
    y: 6.18,
    w: 6.56,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 12.5,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createUserVsDeveloperSlide() {
  const slide = pptx.addSlide();
  addBlock2Header(
    slide,
    17,
    "Mirar una página no es lo mismo que leerla",
    "La experiencia visible y la explicación técnica son dos planos distintos del mismo sitio."
  );

  slide.addShape(SH.roundRect, {
    x: 0.94,
    y: 2.34,
    w: 5.24,
    h: 3.92,
    rectRadius: 0.08,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addShape(SH.roundRect, {
    x: 6.28,
    y: 2.34,
    w: 6.02,
    h: 3.92,
    rectRadius: 0.08,
    fill: { color: C.softBlue },
    line: { color: C.softBlue },
  });

  slide.addText("Mirada del usuario", {
    x: 1.26,
    y: 2.66,
    w: 3.4,
    h: 0.28,
    fontFace: "Aptos Display",
    fontSize: 20,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Se pregunta si la página carga, se entiende y permite completar una tarea.", {
    x: 1.26,
    y: 3.12,
    w: 3.86,
    h: 0.72,
    fontFace: "Aptos",
    fontSize: 14.5,
    color: C.ink,
    margin: 0,
  });
  addPill(slide, 1.28, 4.2, 1.02, "Carga", C.white, C.navy);
  addPill(slide, 2.48, 4.2, 1.22, "Entiende", C.white, C.navy);
  addPill(slide, 3.88, 4.2, 1.08, "Usa", C.white, C.navy);
  slide.addShape(SH.roundRect, {
    x: 1.26,
    y: 4.92,
    w: 3.92,
    h: 0.84,
    rectRadius: 0.05,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Lo visible importa, pero no alcanza para explicar por qué pasa algo.", {
    x: 1.52,
    y: 5.18,
    w: 3.4,
    h: 0.28,
    fontFace: "Aptos",
    fontSize: 12.5,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  slide.addText("Mirada del desarrollador", {
    x: 6.62,
    y: 2.66,
    w: 3.94,
    h: 0.28,
    fontFace: "Aptos Display",
    fontSize: 20,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Busca estructura, estilos, errores, recursos cargados y causas técnicas del comportamiento.", {
    x: 6.62,
    y: 3.12,
    w: 4.42,
    h: 0.72,
    fontFace: "Aptos",
    fontSize: 14.5,
    color: C.ink,
    margin: 0,
  });
  addStripItem(slide, {
    x: 6.62,
    y: 4.2,
    w: 5.34,
    text: "Relaciona lo visible con HTML, CSS, consola y red.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
  });
  addStripItem(slide, {
    x: 6.62,
    y: 4.9,
    w: 5.34,
    text: "Necesita evidencias antes de corregir.",
    fill: C.white,
    line: C.border,
    accent: C.red,
  });

  slide.addShape(SH.chevron, {
    x: 5.62,
    y: 3.88,
    w: 0.42,
    h: 0.72,
    fill: { color: C.red },
    line: { color: C.red },
  });

  validateSlide(slide);
}

function createDevToolsCapabilitiesSlide() {
  const slide = pptx.addSlide();
  addBlock2Header(
    slide,
    18,
    "Qué permite hacer DevTools",
    "DevTools vuelve visible parte del trabajo interno de la página y ayuda a conectar el código con la interfaz."
  );

  const cards = [
    ["Estructura HTML", "Permite ver etiquetas, jerarquía y contenido real de la página.", C.red, C.white, C.border],
    ["Estilos CSS", "Permite revisar reglas, colores, tamaños, espacios y posición.", C.navy, C.softBlue, C.softBlue],
    ["Clases y atributos", "Permite reconocer identificadores y relaciones entre elementos.", C.gold, C.paleRed, C.paleRed],
    ["Cambios temporales", "Permite probar ajustes sin tocar todavía el archivo original.", C.red, C.white, C.border],
    ["Reglas activas", "Permite detectar si una propiedad se aplica, se hereda o queda sobrescrita.", C.navy, C.softBlue, C.softBlue],
    ["Resultado visible", "Permite conectar lo que vemos con la estructura y los estilos que lo producen.", C.gold, C.paleRed, C.paleRed],
  ];

  cards.forEach(([title, body, accent, fill, line], idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    addCard(slide, {
      x: 0.9 + col * 4.1,
      y: 2.34 + row * 1.88,
      w: 3.55,
      h: 1.54,
      title,
      body,
      fill,
      line,
      accent,
      titleFontSize: 16,
      bodyFontSize: 11.4,
    });
  });

  validateSlide(slide);
}

function createHtmlCssRelationSlide() {
  const slide = pptx.addSlide();
  addBlock2Header(
    slide,
    19,
    "HTML, CSS y resultado visible",
    "La interfaz que vemos depende de una estructura y de estilos que pueden observarse y ponerse a prueba."
  );

  const steps = [
    ["HTML", "Define la estructura, las etiquetas y el contenido."],
    ["CSS", "Define color, tamaño, espacio y posición."],
    ["DevTools", "Permite ver qué regla afecta cada elemento."],
    ["Prueba", "Permite cambiar temporalmente y observar el efecto."],
  ];

  steps.forEach(([title, body], idx) => {
    const fill = idx % 2 === 0 ? C.white : C.softBlue;
    const x = 0.94 + idx * 3.02;
    addProcessStep(slide, x, title, body, fill);
    if (idx < steps.length - 1) {
      addArrow(slide, x + 2.4, 3.92);
    }
  });

  slide.addShape(SH.roundRect, {
    x: 1.14,
    y: 5.72,
    w: 10.96,
    h: 0.58,
    rectRadius: 0.04,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("La interfaz visible es una combinación entre estructura, estilo y observación técnica.", {
    x: 1.44,
    y: 5.9,
    w: 10.36,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 12.5,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createDevToolsQuestionsSlide() {
  const slide = pptx.addSlide();
  addBlock2Header(
    slide,
    20,
    "Preguntas que DevTools ayuda a responder",
    "La inspección técnica permite pasar de la intuición a preguntas más precisas sobre la página."
  );

  slide.addShape(SH.roundRect, {
    x: 0.92,
    y: 2.34,
    w: 3.4,
    h: 3.98,
    rectRadius: 0.08,
    fill: { color: C.paleRed },
    line: { color: C.paleRed },
  });
  slide.addText("La inspección técnica pregunta", {
    x: 1.24,
    y: 2.72,
    w: 2.48,
    h: 0.86,
    fontFace: "Aptos Display",
    fontSize: 22,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("No basta con decir \"se ve raro\". DevTools ayuda a formular preguntas más precisas.", {
    x: 1.24,
    y: 4.08,
    w: 2.42,
    h: 1.08,
    fontFace: "Aptos",
    fontSize: 14,
    color: C.ink,
    margin: 0,
  });

  const strips = [
    ["Qué elemento estoy viendo", C.white, C.border, C.red],
    ["Qué clase o selector actúa", C.softBlue, C.softBlue, C.navy],
    ["Qué propiedad produce el efecto", C.white, C.border, C.red],
    ["Si la regla realmente se aplica", C.softNeutral, C.softNeutral, C.gold],
  ];

  strips.forEach(([text, fill, line, accent], idx) => {
    addStripItem(slide, {
      x: 4.84,
      y: 2.56 + idx * 0.92,
      w: 7.12,
      text,
      fill,
      line,
      accent,
    });
  });

  slide.addShape(SH.roundRect, {
    x: 5.24,
    y: 6.06,
    w: 6.34,
    h: 0.42,
    rectRadius: 0.04,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("Preguntar mejor permite observar mejor.", {
    x: 5.46,
    y: 6.18,
    w: 5.9,
    h: 0.16,
    fontFace: "Aptos",
    fontSize: 12,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createConsoleAndNetworkSlide() {
  const slide = pptx.addSlide();
  addBlock2Header(
    slide,
    21,
    "Consola y red: lo que no siempre se ve",
    "Cuando una falla no se explica solo por HTML o CSS, la consola y la red entregan evidencias importantes."
  );

  slide.addShape(SH.roundRect, {
    x: 0.92,
    y: 2.34,
    w: 5.18,
    h: 3.98,
    rectRadius: 0.08,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addShape(SH.roundRect, {
    x: 6.24,
    y: 2.34,
    w: 6.08,
    h: 3.98,
    rectRadius: 0.08,
    fill: { color: C.softBlue },
    line: { color: C.softBlue },
  });

  slide.addText("Consola", {
    x: 1.22,
    y: 2.64,
    w: 1.8,
    h: 0.28,
    fontFace: "Aptos Display",
    fontSize: 22,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Muestra errores, advertencias, mensajes de depuración y señales de ejecución.", {
    x: 1.22,
    y: 3.12,
    w: 3.56,
    h: 0.92,
    fontFace: "Aptos",
    fontSize: 14.5,
    color: C.white,
    margin: 0,
  });
  addPill(slide, 1.22, 4.44, 1.36, "Errores", C.red, C.white);
  addPill(slide, 2.8, 4.44, 1.62, "Advertencias", C.white, C.navy);
  slide.addShape(SH.roundRect, {
    x: 1.22,
    y: 5.06,
    w: 3.86,
    h: 0.74,
    rectRadius: 0.05,
    fill: { color: "214466" },
    line: { color: "214466" },
  });
  slide.addText("Sirve para detectar fallos de ejecución y entender por qué cierta lógica no se completó.", {
    x: 1.48,
    y: 5.26,
    w: 3.34,
    h: 0.28,
    fontFace: "Aptos",
    fontSize: 12.2,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });

  slide.addText("Red", {
    x: 6.56,
    y: 2.64,
    w: 1.4,
    h: 0.28,
    fontFace: "Aptos Display",
    fontSize: 22,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Muestra HTML, CSS, JavaScript, imágenes, fuentes y solicitudes hacia APIs u otros servicios.", {
    x: 6.56,
    y: 3.12,
    w: 4.28,
    h: 0.92,
    fontFace: "Aptos",
    fontSize: 14.5,
    color: C.ink,
    margin: 0,
  });
  addPill(slide, 6.56, 4.44, 1.04, "Carga", C.white, C.navy);
  addPill(slide, 7.78, 4.44, 0.92, "Ruta", C.white, C.navy);
  addPill(slide, 8.88, 4.44, 1.26, "Respuesta", C.white, C.navy);
  slide.addShape(SH.roundRect, {
    x: 6.56,
    y: 5.06,
    w: 4.92,
    h: 0.74,
    rectRadius: 0.05,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Sirve para confirmar qué cargó, qué falló y qué respuesta devolvió el servidor.", {
    x: 6.86,
    y: 5.26,
    w: 4.32,
    h: 0.28,
    fontFace: "Aptos",
    fontSize: 12.2,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createVisibleFailureSlide() {
  const slide = pptx.addSlide();
  addBlock2Header(
    slide,
    22,
    "Un problema visible puede tener causas distintas",
    "Por eso no basta con mirar la interfaz: hay que buscar evidencias técnicas antes de corregir."
  );

  slide.addShape(SH.roundRect, {
    x: 0.92,
    y: 2.34,
    w: 5.36,
    h: 3.16,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addShape(SH.roundRect, {
    x: 6.46,
    y: 2.34,
    w: 5.86,
    h: 3.16,
    rectRadius: 0.08,
    fill: { color: C.softBlue },
    line: { color: C.softBlue },
  });

  slide.addText("En carga y rutas", {
    x: 1.24,
    y: 2.68,
    w: 2.8,
    h: 0.26,
    fontFace: "Aptos Display",
    fontSize: 18,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  addStripItem(slide, {
    x: 1.18,
    y: 3.18,
    w: 4.84,
    text: "Archivo no cargado: el recurso nunca llegó al navegador.",
    fill: C.white,
    line: C.border,
    accent: C.red,
  });
  addStripItem(slide, {
    x: 1.18,
    y: 3.88,
    w: 4.84,
    text: "Ruta incorrecta: la página busca un archivo donde no existe.",
    fill: C.softNeutral,
    line: C.softNeutral,
    accent: C.gold,
  });
  addStripItem(slide, {
    x: 1.18,
    y: 4.58,
    w: 4.84,
    text: "Respuesta del servidor: el recurso devuelve error o algo distinto.",
    fill: C.white,
    line: C.border,
    accent: C.red,
  });

  slide.addText("En ejecución e interfaz", {
    x: 6.82,
    y: 2.68,
    w: 3.1,
    h: 0.26,
    fontFace: "Aptos Display",
    fontSize: 18,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  addStripItem(slide, {
    x: 6.74,
    y: 3.18,
    w: 5.3,
    text: "Error de JavaScript: la ejecución se interrumpe y deja funciones incompletas.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
  });
  addStripItem(slide, {
    x: 6.74,
    y: 3.88,
    w: 5.3,
    text: "Regla CSS inesperada: un selector altera tamaño, color o posición.",
    fill: C.white,
    line: C.border,
    accent: C.red,
  });
  addStripItem(slide, {
    x: 6.74,
    y: 4.58,
    w: 5.3,
    text: "Recurso faltante: una imagen, fuente o script no aparece cuando se necesita.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
  });

  slide.addText("Una misma falla visible puede nacer en capas distintas del sistema.", {
    x: 1.18,
    y: 5.82,
    w: 11.0,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 12.5,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createDeveloperReadingSlide() {
  const slide = pptx.addSlide();
  addBlock2Header(
    slide,
    23,
    "Leer una página como desarrollador",
    "La mirada técnica complementa la experiencia del usuario y busca explicar lo que ocurre con evidencia."
  );

  slide.addShape(SH.roundRect, {
    x: 0.94,
    y: 2.34,
    w: 4.76,
    h: 0.58,
    rectRadius: 0.04,
    fill: { color: C.paleRed },
    line: { color: C.paleRed },
  });
  slide.addText("Como usuario", {
    x: 1.18,
    y: 2.5,
    w: 4.24,
    h: 0.2,
    fontFace: "Aptos Display",
    fontSize: 16,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 6.12,
    y: 2.34,
    w: 6.18,
    h: 0.58,
    rectRadius: 0.04,
    fill: { color: C.softBlue },
    line: { color: C.softBlue },
  });
  slide.addText("Como desarrollador", {
    x: 6.38,
    y: 2.5,
    w: 5.7,
    h: 0.2,
    fontFace: "Aptos Display",
    fontSize: 16,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  const userItems = [
    "¿Carga o no carga?",
    "¿Se entiende el contenido?",
    "¿El botón responde?",
    "¿El diseño se ve bien?",
    "¿Puedo completar la tarea?",
  ];
  const devItems = [
    "¿Qué estructura HTML sostiene esta interfaz?",
    "¿Qué estilos están afectando este elemento?",
    "¿Qué archivos se cargaron realmente?",
    "¿Hay errores en consola?",
    "¿Qué solicitudes se hicieron y cómo respondieron?",
  ];

  userItems.forEach((item, idx) => {
    addStripItem(slide, {
      x: 0.98,
      y: 3.1 + idx * 0.62,
      w: 4.68,
      text: item,
      fill: idx % 2 === 0 ? C.white : C.softNeutral,
      line: idx % 2 === 0 ? C.border : C.softNeutral,
      accent: idx % 2 === 0 ? C.red : C.gold,
    });
  });

  devItems.forEach((item, idx) => {
    addStripItem(slide, {
      x: 6.16,
      y: 3.1 + idx * 0.62,
      w: 6.1,
      text: item,
      fill: idx % 2 === 0 ? C.softBlue : C.white,
      line: idx % 2 === 0 ? C.softBlue : C.border,
      accent: idx % 2 === 0 ? C.navy : C.red,
    });
  });

  validateSlide(slide);
}

function createObservationFlowSlide() {
  const slide = pptx.addSlide();
  addBlock2Header(
    slide,
    24,
    "Recorrido inicial de observación",
    "Observar antes de modificar ayuda a formular una explicación más precisa del problema."
  );

  slide.addShape(SH.line, {
    x: 6.62,
    y: 2.46,
    w: 0,
    h: 3.72,
    line: { color: C.navy, pt: 2 },
  });

  const items = [
    { num: "1", title: "Abrir la página", body: "Se mira el comportamiento que queremos entender.", x: 1.18, y: 2.42, fill: C.white, accent: C.red },
    { num: "2", title: "Ubicar el problema", body: "Se define qué elemento o cambio merece observación.", x: 7.0, y: 3.12, fill: C.softBlue, accent: C.navy },
    { num: "3", title: "Inspeccionar", body: "Se revisa el HTML y el CSS asociados al elemento.", x: 1.18, y: 3.82, fill: C.paleRed, accent: C.gold },
    { num: "4", title: "Buscar evidencias", body: "Se consulta consola o red si hay señales de error.", x: 7.0, y: 4.52, fill: C.white, accent: C.red },
    { num: "5", title: "Explicar", body: "Se formula una hipótesis técnica antes de corregir.", x: 1.18, y: 5.22, fill: C.softBlue, accent: C.navy },
  ];

  items.forEach((item) => {
    slide.addShape(SH.ellipse, {
      x: 6.34,
      y: item.y + 0.12,
      w: 0.56,
      h: 0.56,
      fill: { color: item.accent },
      line: { color: item.accent },
    });
    slide.addText(item.num, {
      x: 6.34,
      y: item.y + 0.26,
      w: 0.56,
      h: 0.16,
      fontFace: "Aptos Display",
      fontSize: 13,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    });
    slide.addShape(SH.roundRect, {
      x: item.x,
      y: item.y,
      w: 4.72,
      h: 0.82,
      rectRadius: 0.05,
      fill: { color: item.fill },
      line: { color: item.fill === C.white ? C.border : item.fill, pt: 1 },
    });
    slide.addText(item.title, {
      x: item.x + 0.22,
      y: item.y + 0.1,
      w: 1.96,
      h: 0.2,
      fontFace: "Aptos Display",
      fontSize: 15.5,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(item.body, {
      x: item.x + 2.18,
      y: item.y + 0.08,
      w: 2.26,
      h: 0.34,
      fontFace: "Aptos",
      fontSize: 11.5,
      color: C.ink,
      margin: 0,
    });
  });

  slide.addText("Diagnosticar bien implica observar antes de tocar el archivo.", {
    x: 1.2,
    y: 6.16,
    w: 11.0,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 12.5,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createBlock2QuestionsSlide() {
  const slide = pptx.addSlide();
  addBlock2Header(
    slide,
    25,
    "Preguntas para pensar",
    "Estas preguntas recogen el sentido del bloque y preparan la transición hacia el versionado."
  );

  addCard(slide, {
    x: 1.22,
    y: 2.36,
    w: 10.88,
    h: 1.24,
    title: "Más que visualización",
    body: "¿Por qué el navegador no debería entenderse solo como una herramienta para ver páginas?",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 18,
    bodyFontSize: 14,
  });

  const questions = [
    [
      1.18,
      4.08,
      3.48,
      "Dos miradas",
      "¿Qué diferencia existe entre mirar una página como usuario y leerla como desarrollador?",
      C.softBlue,
      C.softBlue,
      C.navy,
    ],
    [
      4.96,
      4.48,
      3.48,
      "Valor de la consola",
      "¿Qué tipo de problemas puede ayudarnos a detectar la consola?",
      C.white,
      C.border,
      C.red,
    ],
    [
      8.74,
      4.08,
      3.42,
      "Valor de la red",
      "¿Por qué la pestaña de red puede ser útil incluso cuando el problema parece visual?",
      C.paleRed,
      C.paleRed,
      C.gold,
    ],
  ];

  questions.forEach(([x, y, w, title, body, fill, line, accent]) => {
    addCard(slide, {
      x,
      y,
      w,
      h: 1.5,
      title,
      body,
      fill,
      line,
      accent,
      titleFontSize: 15.5,
      bodyFontSize: 12.2,
    });
  });

  validateSlide(slide);
}

function createBlock2ClosingSlide() {
  const slide = pptx.addSlide();
  addBlock2Header(
    slide,
    26,
    "Síntesis del bloque",
    "El navegador es una herramienta de visualización, pero también de observación técnica y diagnóstico inicial."
  );

  slide.addShape(SH.roundRect, {
    x: 0.92,
    y: 2.34,
    w: 7.12,
    h: 2.14,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Idea clave", {
    x: 1.26,
    y: 2.66,
    w: 1.68,
    h: 0.24,
    fontFace: "Aptos",
    fontSize: 13,
    bold: true,
    color: C.red,
    margin: 0,
  });
  slide.addText("DevTools permite inspeccionar estructura, estilos, errores y solicitudes para entender mejor una página.", {
    x: 1.24,
    y: 3.1,
    w: 6.2,
    h: 0.86,
    fontFace: "Aptos Display",
    fontSize: 22,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 8.28,
    y: 2.34,
    w: 4.04,
    h: 3.32,
    rectRadius: 0.08,
    fill: { color: C.softBlue },
    line: { color: C.softBlue },
  });
  slide.addText("Siguiente foco", {
    x: 8.62,
    y: 2.72,
    w: 2.3,
    h: 0.24,
    fontFace: "Aptos",
    fontSize: 13,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Git y GitHub mostrarán cómo se registra el trabajo y cómo se conserva su historia técnica.", {
    x: 8.62,
    y: 3.12,
    w: 3.1,
    h: 1.08,
    fontFace: "Aptos Display",
    fontSize: 18,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  addPill(slide, 8.64, 4.7, 1.2, "Registro", C.white, C.navy);
  addPill(slide, 10.04, 4.7, 1.36, "Historial", C.white, C.navy);

  addStripItem(slide, {
    x: 1.04,
    y: 4.92,
    w: 6.84,
    text: "Qué cambia en la práctica: dejamos de adivinar y empezamos a observar con evidencias.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
  });
  addStripItem(slide, {
    x: 1.04,
    y: 5.64,
    w: 6.84,
    text: "Pregunta de salida: ¿qué pestaña de DevTools te parece hoy más útil para empezar a observar una página?",
    fill: C.white,
    line: C.border,
    accent: C.red,
  });

  validateSlide(slide);
}

function createBlock3IntroSlide() {
  const slide = pptx.addSlide();
  setBackground(slide, C.paper);
  addTopRule(slide);

  slide.addShape(SH.roundRect, {
    x: 0.82,
    y: 1.04,
    w: 11.68,
    h: 1.28,
    rectRadius: 0.08,
    fill: { color: C.red },
    line: { color: C.red },
  });
  addBarsMotif(slide, 1.16, 1.34, 1.18, C.white);
  slide.addText("Bloque 3", {
    x: 2.28,
    y: 1.36,
    w: 1.64,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 13,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Git y GitHub\nsin humo", {
    x: 4.02,
    y: 1.24,
    w: 3.6,
    h: 0.68,
    fontFace: "Aptos Display",
    fontSize: 26,
    bold: true,
    color: C.white,
    margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 1.02,
    y: 2.74,
    w: 4.34,
    h: 3.44,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Guardar archivos no basta para entender la historia del proyecto.", {
    x: 1.34,
    y: 3.18,
    w: 3.66,
    h: 1.06,
    fontFace: "Aptos Display",
    fontSize: 22,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Git registra cambios con sentido. GitHub permite respaldarlos y moverlos a un entorno remoto.", {
    x: 1.34,
    y: 4.62,
    w: 3.44,
    h: 0.82,
    fontFace: "Aptos",
    fontSize: 14.5,
    color: C.ink,
    margin: 0,
  });

  addCodePanel(slide, {
    x: 5.68,
    y: 2.94,
    w: 5.86,
    h: 2.14,
    lines: [
      "> git status",
      "> git add .",
      '> git commit -m "ajuste inicial"',
    ],
  });
  slide.addShape(SH.roundRect, {
    x: 6.12,
    y: 5.44,
    w: 4.98,
    h: 0.52,
    rectRadius: 0.04,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("Registrar cambios también es parte del trabajo técnico.", {
    x: 6.38,
    y: 5.58,
    w: 4.46,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 12.5,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createSaveVsVersionSlide() {
  const slide = pptx.addSlide();
  addBlock3Header(
    slide,
    28,
    "Guardar no es lo mismo que versionar",
    "El problema no es solo conservar archivos: es entender qué cambió, cuándo y por qué."
  );

  slide.addShape(SH.roundRect, {
    x: 0.98,
    y: 2.34,
    w: 4.08,
    h: 3.88,
    rectRadius: 0.08,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("Caos frecuente", {
    x: 1.28,
    y: 2.66,
    w: 2.2,
    h: 0.22,
    fontFace: "Aptos Display",
    fontSize: 18,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  const filenames = [
    "index-final.html",
    "index-final-ahora-si.html",
    "index-bueno-2.html",
    "pagina-antes-del-cambio.html",
  ];
  filenames.forEach((name, idx) => {
    slide.addShape(SH.roundRect, {
      x: 1.28 + (idx % 2) * 0.18,
      y: 3.18 + idx * 0.6,
      w: 3.12,
      h: 0.44,
      rectRadius: 0.04,
      fill: { color: idx % 2 === 0 ? C.white : C.paleRed },
      line: { color: idx % 2 === 0 ? C.border : C.paleRed, pt: 1 },
      rotate: idx % 2 === 0 ? -2 : 2,
    });
    slide.addText(name, {
      x: 1.5,
      y: 3.31 + idx * 0.6,
      w: 2.68,
      h: 0.16,
      fontFace: "Consolas",
      fontSize: 11.5,
      color: C.navy,
      margin: 0,
    });
  });

  slide.addShape(SH.chevron, {
    x: 5.42,
    y: 3.94,
    w: 0.54,
    h: 0.82,
    fill: { color: C.red },
    line: { color: C.red },
  });

  slide.addShape(SH.roundRect, {
    x: 6.28,
    y: 2.52,
    w: 5.84,
    h: 3.48,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Versionar significa registrar cambios con sentido.", {
    x: 6.62,
    y: 2.9,
    w: 4.92,
    h: 0.82,
    fontFace: "Aptos Display",
    fontSize: 24,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  const qs = [
    "¿Qué cambió?",
    "¿Cuándo ocurrió?",
    "¿Cuál era la versión buena?",
    "¿Cómo vuelvo atrás?",
  ];
  qs.forEach((q, idx) => {
    addStripItem(slide, {
      x: 6.66,
      y: 4.06 + idx * 0.48,
      w: 4.72,
      text: q,
      fill: idx % 2 === 0 ? C.softBlue : C.white,
      line: idx % 2 === 0 ? C.softBlue : C.border,
      accent: idx % 2 === 0 ? C.navy : C.red,
    });
  });

  validateSlide(slide);
}

function createGitHistorySlide() {
  const slide = pptx.addSlide();
  addBlock3Header(
    slide,
    29,
    "Git convierte cambios en historia",
    "El proyecto deja de ser solo una carpeta y pasa a tener una memoria técnica trazable."
  );

  slide.addShape(SH.line, {
    x: 1.28,
    y: 4.42,
    w: 10.62,
    h: 0,
    line: { color: C.navy, pt: 2 },
  });
  const commits = [
    { x: 1.42, color: C.red, hash: "a1f3", title: "Inicio", body: "Se crea la base del proyecto." },
    { x: 4.04, color: C.navy, hash: "b7c2", title: "Ajuste", body: "Se corrigen estilos y estructura." },
    { x: 6.66, color: C.gold, hash: "c9d4", title: "Fix", body: "Se resuelve un error detectado." },
    { x: 9.28, color: C.red, hash: "d2e8", title: "Versión", body: "Queda un estado claro para seguir." },
  ];

  commits.forEach((item, idx) => {
    slide.addShape(SH.ellipse, {
      x: item.x,
      y: 4.14,
      w: 0.56,
      h: 0.56,
      fill: { color: item.color },
      line: { color: item.color },
    });
    addCodePanel(slide, {
      x: item.x - 0.64,
      y: idx % 2 === 0 ? 2.42 : 4.94,
      w: 1.84,
      h: 1.18,
      lines: [`${item.hash}  ${item.title}`],
    });
    slide.addText(item.body, {
      x: item.x - 0.7,
      y: idx % 2 === 0 ? 3.72 : 6.24,
      w: 1.96,
      h: 0.38,
      fontFace: "Aptos",
      fontSize: 11.2,
      color: C.ink,
      align: "center",
      margin: 0,
    });
  });

  validateSlide(slide);
}

function createGitSequenceSlide() {
  const slide = pptx.addSlide();
  addBlock3Header(
    slide,
    30,
    "Secuencia básica de trabajo con Git",
    "Cambiar, revisar, preparar y registrar forman una lógica mínima que conviene reconocer desde el inicio."
  );

  addCodePanel(slide, {
    x: 0.94,
    y: 2.4,
    w: 4.26,
    h: 3.44,
    lines: [
      "> git status",
      "> git add .",
      '> git commit -m "ajuste del menú"',
      "> git log --oneline",
    ],
  });
  slide.addText("Secuencia en terminal", {
    x: 1.88,
    y: 2.64,
    w: 1.94,
    h: 0.16,
    fontFace: "Aptos",
    fontSize: 12.5,
    bold: true,
    color: C.white,
    margin: 0,
  });

  const steps = [
    ["Revisar", "status", C.white],
    ["Preparar", "add", C.softBlue],
    ["Registrar", "commit", C.paleRed],
    ["Leer historia", "log", C.white],
  ];
  steps.forEach(([title, body, fill], idx) => {
    const x = 5.72 + idx * 1.64;
    slide.addShape(SH.roundRect, {
      x,
      y: 3.28,
      w: 1.44,
      h: 1.54,
      rectRadius: 0.05,
      fill: { color: fill },
      line: { color: fill === C.white ? C.border : fill, pt: 1 },
    });
    slide.addText(title, {
      x: x + 0.12,
      y: 3.54,
      w: 1.2,
      h: 0.34,
      fontFace: "Aptos Display",
      fontSize: 13.5,
      bold: true,
      color: C.navy,
      align: "center",
      margin: 0,
    });
    slide.addText(body, {
      x: x + 0.12,
      y: 4.12,
      w: 1.2,
      h: 0.18,
      fontFace: "Consolas",
      fontSize: 12,
      color: C.ink,
      align: "center",
      margin: 0,
    });
    if (idx < steps.length - 1) {
      slide.addShape(SH.chevron, {
        x: x + 1.45,
        y: 3.94,
        w: 0.18,
        h: 0.24,
        fill: { color: C.red },
        line: { color: C.red },
      });
    }
  });

  slide.addText("La técnica sirve mejor cuando cada comando se entiende dentro de una secuencia.", {
    x: 5.56,
    y: 5.46,
    w: 6.18,
    h: 0.24,
    fontFace: "Aptos",
    fontSize: 12.5,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createGitCommandsSlide() {
  const slide = pptx.addSlide();
  addBlock3Header(
    slide,
    31,
    "Comandos base y propósito",
    "No basta con conocer el nombre del comando: conviene asociarlo con la función que cumple dentro del flujo."
  );

  const commands = [
    ["git init", "Crea un repositorio Git en el proyecto actual.", C.red, C.white, C.border],
    ["git status", "Muestra qué archivos cambiaron y en qué estado están.", C.navy, C.softBlue, C.softBlue],
    ["git add .", "Prepara cambios para el siguiente commit.", C.gold, C.paleRed, C.paleRed],
    ['git commit -m "mensaje"', "Registra cambios en el historial con una descripción.", C.red, C.white, C.border],
    ["git log --oneline", "Permite revisar el historial de commits de forma resumida.", C.navy, C.softBlue, C.softBlue],
  ];

  commands.forEach(([cmd, body, accent, fill, line], idx) => {
    addCard(slide, {
      x: idx % 2 === 0 ? 1.06 : 6.44,
      y: 2.32 + Math.floor(idx / 2) * 1.18,
      w: idx === 4 ? 10.22 : 4.84,
      h: 0.98,
      title: cmd,
      body,
      fill,
      line,
      accent,
      titleFontSize: 15,
      bodyFontSize: 11.5,
    });
  });

  validateSlide(slide);
}

function createGitVsGitHubSlide() {
  const slide = pptx.addSlide();
  addBlock3Header(
    slide,
    32,
    "Git no es lo mismo que GitHub",
    "Uno registra cambios; el otro permite alojar el repositorio y conectarlo con un entorno remoto."
  );

  slide.addShape(SH.roundRect, {
    x: 0.92,
    y: 2.38,
    w: 4.84,
    h: 3.86,
    rectRadius: 0.08,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Git", {
    x: 1.26,
    y: 2.74,
    w: 1.2,
    h: 0.24,
    fontFace: "Aptos Display",
    fontSize: 22,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Sistema local de control de versiones", {
    x: 1.26,
    y: 3.14,
    w: 2.94,
    h: 0.7,
    fontFace: "Aptos",
    fontSize: 15,
    color: C.white,
    margin: 0,
  });
  addPill(slide, 1.26, 4.34, 1.1, "Commits", C.red, C.white);
  addPill(slide, 2.56, 4.34, 1.16, "Historial", C.white, C.navy);
  addPill(slide, 3.92, 4.34, 1.02, "Local", C.paleRed, C.navy);

  slide.addShape(SH.chevron, {
    x: 5.96,
    y: 4.0,
    w: 0.58,
    h: 0.78,
    fill: { color: C.red },
    line: { color: C.red },
  });

  slide.addShape(SH.roundRect, {
    x: 6.76,
    y: 2.38,
    w: 5.56,
    h: 3.86,
    rectRadius: 0.08,
    fill: { color: C.softBlue },
    line: { color: C.softBlue },
  });
  slide.addText("GitHub", {
    x: 7.1,
    y: 2.74,
    w: 1.9,
    h: 0.24,
    fontFace: "Aptos Display",
    fontSize: 22,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Plataforma remota para alojar, respaldar y compartir repositorios", {
    x: 7.1,
    y: 3.14,
    w: 3.64,
    h: 0.7,
    fontFace: "Aptos",
    fontSize: 15,
    color: C.ink,
    margin: 0,
  });
  addPill(slide, 7.1, 4.34, 1.12, "Remoto", C.white, C.navy);
  addPill(slide, 8.44, 4.34, 1.26, "Respaldo", C.white, C.navy);
  addPill(slide, 9.92, 4.34, 1.3, "Colaborar", C.white, C.navy);

  validateSlide(slide);
}

function createRemoteCommandsSlide() {
  const slide = pptx.addSlide();
  addBlock3Header(
    slide,
    33,
    "Trabajo local y trabajo remoto",
    "Cuando aparece GitHub, ciertos comandos conectan el repositorio local con una copia remota."
  );

  addCodePanel(slide, {
    x: 0.96,
    y: 2.42,
    w: 3.36,
    h: 2.4,
    lines: ["> git clone <url>", "> git push", "> git pull"],
  });
  slide.addText("Comandos remotos", {
    x: 1.88,
    y: 2.66,
    w: 1.9,
    h: 0.16,
    fontFace: "Aptos",
    fontSize: 12.5,
    bold: true,
    color: C.white,
    margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 5.18,
    y: 2.68,
    w: 2.18,
    h: 1.26,
    rectRadius: 0.06,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Local", {
    x: 5.82,
    y: 3.1,
    w: 0.92,
    h: 0.24,
    fontFace: "Aptos Display",
    fontSize: 18,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 9.28,
    y: 2.68,
    w: 2.18,
    h: 1.26,
    rectRadius: 0.06,
    fill: { color: C.softBlue },
    line: { color: C.softBlue },
  });
  slide.addText("Remoto", {
    x: 9.82,
    y: 3.1,
    w: 1.1,
    h: 0.24,
    fontFace: "Aptos Display",
    fontSize: 18,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  slide.addText("push", {
    x: 7.72,
    y: 2.72,
    w: 1.18,
    h: 0.18,
    fontFace: "Consolas",
    fontSize: 13,
    bold: true,
    color: C.red,
    align: "center",
    margin: 0,
  });
  slide.addText("pull", {
    x: 7.72,
    y: 3.82,
    w: 1.18,
    h: 0.18,
    fontFace: "Consolas",
    fontSize: 13,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.chevron, {
    x: 7.48,
    y: 3.02,
    w: 1.14,
    h: 0.22,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addShape(SH.chevron, {
    x: 7.48,
    y: 3.46,
    w: 1.14,
    h: 0.22,
    rotate: 180,
    fill: { color: C.navy },
    line: { color: C.navy },
  });

  addCard(slide, {
    x: 5.16,
    y: 4.68,
    w: 2.58,
    h: 1.12,
    title: "clone",
    body: "Trae una copia local de un repositorio remoto.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
    titleFontSize: 16,
    bodyFontSize: 11.5,
  });
  addCard(slide, {
    x: 7.66,
    y: 4.68,
    w: 2.3,
    h: 1.12,
    title: "push",
    body: "Envía commits locales hacia el remoto.",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 16,
    bodyFontSize: 11.5,
  });
  addCard(slide, {
    x: 10.16,
    y: 4.68,
    w: 2.1,
    h: 1.12,
    title: "pull",
    body: "Trae cambios del remoto al local.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 15,
    bodyFontSize: 11,
  });

  validateSlide(slide);
}

function createVersioningHabitsSlide() {
  const slide = pptx.addSlide();
  addBlock3Header(
    slide,
    34,
    "Versionar también expresa orden y criterio",
    "Git sirve mejor cuando se usa con hábitos claros y no solo como una lista de comandos."
  );

  slide.addShape(SH.roundRect, {
    x: 1.02,
    y: 2.38,
    w: 4.68,
    h: 3.88,
    rectRadius: 0.08,
    fill: { color: C.paleRed },
    line: { color: C.paleRed },
  });
  slide.addText("Hábitos que valen", {
    x: 1.34,
    y: 2.74,
    w: 2.48,
    h: 0.26,
    fontFace: "Aptos Display",
    fontSize: 20,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  const habits = [
    "Cambiar con intención.",
    "Revisar antes de registrar.",
    "Escribir mensajes que tengan sentido.",
    "Mantener una historia legible.",
  ];
  habits.forEach((habit, idx) => {
    addStripItem(slide, {
      x: 1.3,
      y: 3.34 + idx * 0.64,
      w: 4.12,
      text: habit,
      fill: idx % 2 === 0 ? C.white : C.softNeutral,
      line: idx % 2 === 0 ? C.border : C.softNeutral,
      accent: idx % 2 === 0 ? C.red : C.gold,
    });
  });

  slide.addShape(SH.roundRect, {
    x: 6.08,
    y: 2.58,
    w: 6.1,
    h: 2.4,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Git no solo guarda trabajo: organiza la memoria técnica del proyecto.", {
    x: 6.5,
    y: 3.08,
    w: 5.24,
    h: 1.16,
    fontFace: "Aptos Display",
    fontSize: 24,
    bold: true,
    color: C.navy,
    margin: 0,
    align: "center",
  });
  slide.addShape(SH.roundRect, {
    x: 6.88,
    y: 5.3,
    w: 4.48,
    h: 0.5,
    rectRadius: 0.04,
    fill: { color: C.softBlue },
    line: { color: C.softBlue },
  });
  slide.addText("Cambios pequeños + registro claro + historia comprensible", {
    x: 7.1,
    y: 5.44,
    w: 4.04,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 12,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createBranchingModelsSlide() {
  const slide = pptx.addSlide();
  addBlock3Header(
    slide,
    35,
    "Trunk-based y Gitflow",
    "No todos los equipos organizan ramas de la misma manera; conviene reconocer al menos dos enfoques iniciales."
  );

  slide.addShape(SH.roundRect, {
    x: 0.96,
    y: 2.38,
    w: 5.2,
    h: 3.9,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Trunk-based", {
    x: 1.3,
    y: 2.74,
    w: 2.1,
    h: 0.24,
    fontFace: "Aptos Display",
    fontSize: 20,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  addPill(slide, 1.3, 3.1, 0.8, "main", C.paleRed, C.navy);
  addPill(slide, 2.24, 3.1, 1.32, "feature/*", C.softBlue, C.navy);
  addPill(slide, 3.72, 3.1, 1.58, "merge rápido", C.softNeutral, C.navy);

  slide.addShape(SH.line, {
    x: 1.42,
    y: 4.72,
    w: 3.96,
    h: 0,
    line: { color: C.red, pt: 2.4 },
  });
  [1.56, 2.34, 3.12, 3.9, 4.68].forEach((x) => {
    slide.addShape(SH.ellipse, {
      x,
      y: 4.58,
      w: 0.18,
      h: 0.18,
      fill: { color: C.red },
      line: { color: C.red },
    });
  });
  [
    [2.08, 3.94, 0.54, 0.78, C.navy],
    [3.04, 3.86, 0.54, 0.86, C.navy],
    [4.0, 4.02, 0.34, 0.7, C.gold],
  ].forEach(([x, y, w, h, color]) => {
    slide.addShape(SH.line, {
      x,
      y,
      w,
      h,
      line: { color, pt: 1.6 },
    });
    slide.addShape(SH.ellipse, {
      x: x - 0.08,
      y: y - 0.08,
      w: 0.16,
      h: 0.16,
      fill: { color },
      line: { color },
    });
  });
  slide.addText("main", {
    x: 1.42,
    y: 4.94,
    w: 0.54,
    h: 0.16,
    fontFace: "Consolas",
    fontSize: 10.5,
    color: C.red,
    margin: 0,
  });
  slide.addText("Rama principal estable, ramas muy cortas e integración frecuente sobre la línea principal.", {
    x: 1.36,
    y: 5.28,
    w: 4.36,
    h: 0.48,
    fontFace: "Aptos",
    fontSize: 12.8,
    color: C.ink,
    margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 6.42,
    y: 2.38,
    w: 5.9,
    h: 3.9,
    rectRadius: 0.08,
    fill: { color: C.softBlue },
    line: { color: C.softBlue },
  });
  slide.addText("Gitflow", {
    x: 6.78,
    y: 2.74,
    w: 1.6,
    h: 0.24,
    fontFace: "Aptos Display",
    fontSize: 20,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  addPill(slide, 6.78, 3.1, 0.8, "main", C.paleRed, C.navy);
  addPill(slide, 7.7, 3.1, 1.0, "develop", C.white, C.navy);
  addPill(slide, 8.84, 3.1, 1.14, "feature/*", C.softNeutral, C.navy);
  addPill(slide, 10.12, 3.1, 0.94, "release", C.white, C.navy);
  addPill(slide, 11.14, 3.1, 0.82, "hotfix", C.white, C.navy);

  slide.addShape(SH.line, {
    x: 7.08,
    y: 4.96,
    w: 4.04,
    h: 0,
    line: { color: C.red, pt: 2.2 },
  });
  slide.addShape(SH.line, {
    x: 7.08,
    y: 4.24,
    w: 4.04,
    h: 0,
    line: { color: C.navy, pt: 2.2 },
  });
  [7.22, 8.1, 8.98, 9.86, 10.74].forEach((x) => {
    slide.addShape(SH.ellipse, {
      x,
      y: 4.16,
      w: 0.16,
      h: 0.16,
      fill: { color: C.navy },
      line: { color: C.navy },
    });
  });
  [7.36, 8.48, 9.6, 10.72].forEach((x) => {
    slide.addShape(SH.ellipse, {
      x,
      y: 4.88,
      w: 0.16,
      h: 0.16,
      fill: { color: C.red },
      line: { color: C.red },
    });
  });
  [
    [7.74, 3.58],
    [8.92, 3.58],
  ].forEach(([x, y]) => {
    slide.addShape(SH.roundRect, {
      x,
      y,
      w: 0.72,
      h: 0.12,
      rectRadius: 0.03,
      fill: { color: C.gold },
      line: { color: C.gold },
    });
    slide.addShape(SH.line, {
      x: x + 0.1,
      y: y + 0.06,
      w: 0,
      h: 0.6,
      line: { color: C.gold, pt: 1.4 },
    });
    slide.addShape(SH.line, {
      x: x + 0.52,
      y: y + 0.06,
      w: 0,
      h: 0.6,
      line: { color: C.gold, pt: 1.4 },
    });
  });
  slide.addShape(SH.roundRect, {
    x: 10.0,
    y: 4.48,
    w: 0.52,
    h: 0.12,
    rectRadius: 0.03,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addShape(SH.line, {
    x: 10.12,
    y: 4.24,
    w: 0,
    h: 0.3,
    line: { color: C.gold, pt: 1.4 },
  });
  slide.addShape(SH.line, {
    x: 10.4,
    y: 4.54,
    w: 0,
    h: 0.42,
    line: { color: C.gold, pt: 1.4 },
  });
  slide.addShape(SH.roundRect, {
    x: 10.68,
    y: 4.44,
    w: 0.54,
    h: 0.12,
    rectRadius: 0.03,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addShape(SH.line, {
    x: 10.82,
    y: 4.56,
    w: 0,
    h: 0.4,
    line: { color: C.red, pt: 1.3 },
  });
  slide.addShape(SH.line, {
    x: 11.06,
    y: 4.56,
    w: 0,
    h: 0.4,
    line: { color: C.red, pt: 1.3 },
  });
  slide.addText("develop", {
    x: 7.08,
    y: 3.96,
    w: 0.72,
    h: 0.16,
    fontFace: "Consolas",
    fontSize: 10.5,
    color: C.navy,
    margin: 0,
  });
  slide.addText("main", {
    x: 7.08,
    y: 5.08,
    w: 0.52,
    h: 0.16,
    fontFace: "Consolas",
    fontSize: 10.5,
    color: C.red,
    margin: 0,
  });
  slide.addText("features", {
    x: 7.82,
    y: 3.34,
    w: 0.92,
    h: 0.16,
    fontFace: "Consolas",
    fontSize: 10,
    color: C.gold,
    margin: 0,
  });
  slide.addText("release", {
    x: 10.0,
    y: 4.28,
    w: 0.68,
    h: 0.16,
    fontFace: "Consolas",
    fontSize: 10,
    color: C.gold,
    margin: 0,
  });
  slide.addText("hotfix", {
    x: 10.68,
    y: 4.24,
    w: 0.64,
    h: 0.16,
    fontFace: "Consolas",
    fontSize: 10,
    color: C.red,
    margin: 0,
  });
  slide.addText("main y develop conviven; features, release y hotfix salen y vuelven con mayor estructura.", {
    x: 6.78,
    y: 5.28,
    w: 4.94,
    h: 0.48,
    fontFace: "Aptos",
    fontSize: 12.8,
    color: C.ink,
    margin: 0,
  });

  validateSlide(slide);
}

function createModuleRecommendationSlide() {
  const slide = pptx.addSlide();
  addBlock3Header(
    slide,
    36,
    "Qué conviene priorizar en este módulo",
    "Primero importa entender una lógica simple y repetible antes de entrar a flujos más pesados."
  );

  slide.addShape(SH.roundRect, {
    x: 1.04,
    y: 2.4,
    w: 11.2,
    h: 1.42,
    rectRadius: 0.08,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("main + cambios pequeños + commits con sentido + sincronización frecuente", {
    x: 1.46,
    y: 2.82,
    w: 10.36,
    h: 0.32,
    fontFace: "Aptos Display",
    fontSize: 22,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });

  const cards = [
    {
      x: 1.12,
      y: 4.34,
      w: 3.32,
      h: 1.58,
      title: "Primero",
      body: "Entender qué problema resuelve Git y cómo se registra una historia clara.",
      fill: C.white,
      line: C.border,
      accent: C.red,
    },
    {
      x: 5.0,
      y: 4.34,
      w: 3.32,
      h: 1.58,
      title: "Después",
      body: "Reconocer que existen modelos más estructurados como Gitflow.",
      fill: C.softBlue,
      line: C.softBlue,
      accent: C.navy,
    },
    {
      x: 8.88,
      y: 4.34,
      w: 3.32,
      h: 1.58,
      title: "Criterio",
      body: "Elegir una estrategia según complejidad, equipo y contexto del proyecto.",
      fill: C.paleRed,
      line: C.paleRed,
      accent: C.gold,
    },
  ];

  cards.forEach((card) =>
    addCard(slide, {
      ...card,
      titleFontSize: 17,
      bodyFontSize: 12,
    })
  );

  validateSlide(slide);
}

function createBlock3QuestionsSlide() {
  const slide = pptx.addSlide();
  addBlock3Header(
    slide,
    37,
    "Preguntas para pensar",
    "Estas preguntas recogen la lógica del bloque antes de pasar al flujo completo de trabajo."
  );

  slide.addShape(SH.roundRect, {
    x: 0.98,
    y: 2.36,
    w: 2.76,
    h: 3.98,
    rectRadius: 0.08,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Git, GitHub y criterio", {
    x: 1.22,
    y: 2.84,
    w: 2.18,
    h: 1.0,
    fontFace: "Aptos Display",
    fontSize: 23,
    bold: true,
    color: C.white,
    margin: 0,
    align: "center",
  });
  slide.addText("¿Qué cambia cuando el proyecto deja de ser solo una carpeta y pasa a tener historia?", {
    x: 1.26,
    y: 4.58,
    w: 2.12,
    h: 1.06,
    fontFace: "Aptos",
    fontSize: 13,
    color: "E9EEF4",
    margin: 0,
    align: "center",
  });

  const qs = [
    "¿Qué problema resuelve Git que no se resuelve solo guardando archivos?",
    "¿Qué función cumplen git status, git add y git commit dentro de la secuencia básica?",
    "¿Qué diferencia existe entre Git local y GitHub como remoto?",
    "¿Qué valor tiene poder volver a una versión anterior cuando algo falla?",
    "¿Qué diferencia general existe entre trunk-based y Gitflow?",
  ];
  qs.forEach((q, idx) => {
    addStripItem(slide, {
      x: 4.26,
      y: 2.46 + idx * 0.72,
      w: 7.74,
      text: q,
      fill: idx % 2 === 0 ? C.white : C.softBlue,
      line: idx % 2 === 0 ? C.border : C.softBlue,
      accent: idx % 2 === 0 ? C.red : C.navy,
    });
  });

  validateSlide(slide);
}

function createBlock3ClosingSlide() {
  const slide = pptx.addSlide();
  addBlock3Header(
    slide,
    38,
    "Síntesis del bloque",
    "Git organiza la historia del proyecto y GitHub permite respaldarla y conectarla con un entorno remoto."
  );

  slide.addShape(SH.roundRect, {
    x: 0.96,
    y: 2.36,
    w: 6.66,
    h: 2.08,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Idea clave", {
    x: 1.28,
    y: 2.68,
    w: 1.38,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 13,
    bold: true,
    color: C.red,
    margin: 0,
  });
  slide.addText("Versionar permite entender la historia del trabajo, no solo conservar archivos sueltos.", {
    x: 1.28,
    y: 3.08,
    w: 5.96,
    h: 0.86,
    fontFace: "Aptos Display",
    fontSize: 23,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 8.0,
    y: 2.36,
    w: 4.22,
    h: 3.18,
    rectRadius: 0.08,
    fill: { color: C.softBlue },
    line: { color: C.softBlue },
  });
  slide.addText("Siguiente foco", {
    x: 8.34,
    y: 2.74,
    w: 1.9,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 13,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Ahora toca integrar editor, navegador, DevTools, Git y GitHub dentro de una rutina real de trabajo.", {
    x: 8.34,
    y: 3.12,
    w: 3.4,
    h: 1.18,
    fontFace: "Aptos Display",
    fontSize: 18.5,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  addPill(slide, 8.36, 4.76, 1.26, "Flujo", C.white, C.navy);
  addPill(slide, 9.82, 4.76, 1.54, "Integración", C.white, C.navy);

  addStripItem(slide, {
    x: 1.06,
    y: 4.84,
    w: 6.34,
    text: "Pregunta de salida: ¿qué comando o concepto de este bloque te parece más decisivo para trabajar con orden?",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
  });

  validateSlide(slide);
}

function createBlock4IntroSlide() {
  const slide = pptx.addSlide();
  setBackground(slide, C.paper);
  addTopRule(slide);
  addSlideNumber(slide, pptx._slides.length);
  addMarkBox(slide);
  slide.addShape(SH.roundRect, {
    x: 0.84,
    y: 1.02,
    w: 3.82,
    h: 5.04,
    rectRadius: 0.08,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  addBarsMotif(slide, 1.18, 1.34, 1.3, C.red);
  addChip(slide, "Bloque 4", {
    x: 2.12,
    y: 1.7,
    w: 1.52,
    fill: C.red,
  });
  slide.addText("Flujo de\ntrabajo\nmoderno", {
    x: 1.18,
    y: 2.58,
    w: 2.74,
    h: 1.62,
    fontFace: "Aptos Display",
    fontSize: 25.5,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Las herramientas se entienden mejor cuando aparecen dentro de una rutina t\u00E9cnica real.", {
    x: 1.18,
    y: 4.7,
    w: 2.78,
    h: 0.72,
    fontFace: "Aptos",
    fontSize: 13.8,
    color: "E9EEF4",
    margin: 0,
  });
  const cards = [
    [4.96, 1.48, "Editar", "Proyecto", C.white, C.border, C.red],
    [7.24, 1.48, "Probar", "Navegador", C.softBlue, C.softBlue, C.navy],
    [9.52, 1.48, "Inspeccionar", "DevTools", C.paleRed, C.paleRed, C.gold],
    [4.96, 3.82, "Corregir", "Ajustar", C.white, C.border, C.red],
    [7.24, 3.82, "Registrar", "Git", C.softBlue, C.softBlue, C.navy],
    [9.52, 3.82, "Sincronizar", "GitHub", C.paleRed, C.paleRed, C.gold],
  ];
  cards.forEach(([x, y, title, body, fill, line, accent]) => {
    addCard(slide, {
      x,
      y,
      w: 1.96,
      h: 0.96,
      title,
      body,
      fill,
      line,
      accent,
      titleFontSize: title === "Inspeccionar" ? 13.6 : title === "Sincronizar" ? 14.4 : 15.2,
      bodyFontSize: 11.1,
    });
  });
  [6.98, 9.26].forEach((x) => addArrow(slide, x, 1.78));
  [6.98, 9.26].forEach((x) => addArrow(slide, x, 4.12));
  slide.addShape(SH.roundRect, {
    x: 4.98,
    y: 5.52,
    w: 6.54,
    h: 0.46,
    rectRadius: 0.04,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("Un flujo sano hace visible el recorrido completo del cambio.", {
    x: 5.24,
    y: 5.67,
    w: 6.02,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 12.2,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  validateSlide(slide);
}

function createToolsToRoutineSlide() {
  const slide = pptx.addSlide();
  addBlock4Header(
    slide,
    40,
    "De herramientas sueltas a rutina t\u00E9cnica",
    "Lo importante no es tener varias herramientas abiertas, sino entender c\u00F3mo se articulan dentro del trabajo."
  );
  slide.addShape(SH.roundRect, {
    x: 0.94,
    y: 2.32,
    w: 3.24,
    h: 3.84,
    rectRadius: 0.08,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("Herramientas\nsueltas", {
    x: 1.24,
    y: 2.58,
    w: 2.08,
    h: 0.54,
    fontFace: "Aptos Display",
    fontSize: 18.6,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  ["Editor", "Navegador", "DevTools", "Git", "GitHub"].forEach((item, idx) => {
    addPill(
      slide,
      1.24 + (idx % 2) * 1.42,
      3.18 + Math.floor(idx / 2) * 0.72,
      item === "Navegador" ? 1.42 : idx === 4 ? 2.08 : 1.18,
      item,
      idx % 2 === 0 ? C.white : C.paleRed,
      C.navy
    );
  });
  slide.addText("Si cada una aparece aislada, el trabajo se vuelve fragmentado y cuesta leer el proceso.", {
    x: 1.24,
    y: 5.18,
    w: 2.66,
    h: 0.56,
    fontFace: "Aptos",
    fontSize: 12.3,
    color: C.ink,
    margin: 0,
  });
  slide.addShape(SH.chevron, {
    x: 4.62,
    y: 3.84,
    w: 0.58,
    h: 0.82,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addShape(SH.roundRect, {
    x: 5.48,
    y: 2.5,
    w: 6.14,
    h: 3.56,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Rutina t\u00E9cnica", {
    x: 5.8,
    y: 2.74,
    w: 2.28,
    h: 0.22,
    fontFace: "Aptos Display",
    fontSize: 18.4,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  const steps = [
    [5.82, 3.2, "Editar", "Cambiar con intenci\u00F3n", C.white, C.red],
    [7.96, 3.2, "Probar", "Ver qu\u00E9 ocurri\u00F3", C.softBlue, C.navy],
    [10.1, 3.2, "Inspeccionar", "Reunir evidencia", C.paleRed, C.gold],
    [6.9, 4.52, "Corregir", "Ajustar y repetir", C.white, C.red],
    [9.04, 4.52, "Registrar", "Guardar la historia", C.softBlue, C.navy],
  ];
  steps.forEach(([x, y, title, body, fill, accent]) => {
    addCard(slide, {
      x,
      y,
      w: 1.84,
      h: 0.9,
      title,
      body,
      fill,
      line: fill === C.white ? C.border : fill,
      accent,
      titleFontSize: 14.8,
      bodyFontSize: 10.2,
    });
  });
  [7.62, 9.76].forEach((x) => addArrow(slide, x, 3.48));
  slide.addShape(SH.roundRect, {
    x: 5.84,
    y: 5.52,
    w: 5.42,
    h: 0.34,
    rectRadius: 0.04,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("Las herramientas dejan de ser ventanas separadas y pasan a formar una secuencia.", {
    x: 6.1,
    y: 5.61,
    w: 4.9,
    h: 0.16,
    fontFace: "Aptos",
    fontSize: 11.2,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  validateSlide(slide);
}

function createLinearVsRealSlide() {
  const slide = pptx.addSlide();
  addBlock4Header(
    slide,
    41,
    "La imagen lineal y el trabajo real",
    "Aprender a desarrollar tambi\u00E9n implica abandonar la idea de escribir una vez y terminar."
  );
  slide.addShape(SH.roundRect, {
    x: 0.96,
    y: 2.34,
    w: 3.14,
    h: 3.88,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Imagen lineal", {
    x: 1.26,
    y: 2.7,
    w: 1.86,
    h: 0.24,
    fontFace: "Aptos Display",
    fontSize: 18.5,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  ["Abrir", "Escribir", "Guardar", "Terminar"].forEach((item, idx) => {
    addStripItem(slide, {
      x: 1.18,
      y: 3.24 + idx * 0.64,
      w: 2.58,
      text: item,
      fill: idx % 2 === 0 ? C.softNeutral : C.white,
      line: idx % 2 === 0 ? C.softNeutral : C.border,
      accent: idx % 2 === 0 ? C.gold : C.red,
    });
  });
  slide.addShape(SH.roundRect, {
    x: 4.48,
    y: 2.34,
    w: 7.82,
    h: 3.88,
    rectRadius: 0.08,
    fill: { color: C.softBlue },
    line: { color: C.softBlue },
  });
  slide.addText("Trabajo real", {
    x: 4.86,
    y: 2.7,
    w: 2.02,
    h: 0.24,
    fontFace: "Aptos Display",
    fontSize: 18.5,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  const realSteps = [
    [5.08, 3.18, "Editar", C.white, C.red],
    [8.18, 3.18, "Probar", C.paleRed, C.gold],
    [8.18, 4.4, "Observar", C.white, C.red],
    [5.08, 4.4, "Corregir", C.paleRed, C.gold],
  ];
  realSteps.forEach(([x, y, label, fill, accent]) => {
    slide.addShape(SH.roundRect, {
      x,
      y,
      w: 1.92,
      h: 0.58,
      rectRadius: 0.04,
      fill: { color: fill },
      line: { color: fill === C.white ? C.border : fill, pt: 1 },
    });
    slide.addShape(SH.rect, {
      x: x + 0.12,
      y: y + 0.12,
      w: 0.16,
      h: 0.34,
      fill: { color: accent },
      line: { color: accent },
    });
    slide.addText(label, {
      x: x + 0.4,
      y: y + 0.16,
      w: 1.36,
      h: 0.16,
      fontFace: "Aptos",
      fontSize: 11.8,
      bold: true,
      color: C.navy,
      margin: 0,
    });
  });
  addPill(slide, 6.36, 3.86, 2.14, "Repetir", C.softNeutral, C.navy);
  addStripItem(slide, {
    x: 5.0,
    y: 5.34,
    w: 6.2,
    text: "Registrar aparece cuando el cambio ya fue revisado y entendido.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
  });
  slide.addText("El trabajo real vuelve sobre el cambio varias veces antes de darlo por cerrado.", {
    x: 4.96,
    y: 5.96,
    w: 6.86,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 11.8,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  validateSlide(slide);
}

function createWorkflowCycleSlide() {
  const slide = pptx.addSlide();
  addBlock4Header(
    slide,
    42,
    "Un ciclo simple de desarrollo web",
    "Editar, probar, inspeccionar, corregir y registrar forman una secuencia corta que se repite."
  );
  const steps = [
    [1.0, 2.5, "Editar", "Proyecto", C.white, C.red],
    [3.1, 2.5, "Probar", "Navegador", C.softBlue, C.navy],
    [5.2, 2.5, "Inspecci\u00F3n", "DevTools", C.paleRed, C.gold],
    [7.3, 2.5, "Corregir", "Ajustar", C.white, C.red],
    [9.4, 2.5, "Revisar", "Git status", C.softBlue, C.navy],
  ];
  steps.forEach(([x, y, title, body, fill, accent]) => {
    addCard(slide, {
      x,
      y,
      w: 1.8,
      h: 0.94,
      title,
      body,
      fill,
      line: fill === C.white ? C.border : fill,
      accent,
      titleFontSize: title === "Inspecci\u00F3n" ? 13.2 : 14.6,
      bodyFontSize: 10.2,
    });
  });
  [2.86, 4.96, 7.06, 9.16].forEach((x) => addArrow(slide, x, 2.82));
  slide.addShape(SH.roundRect, {
    x: 0.98,
    y: 4.72,
    w: 1.78,
    h: 0.86,
    rectRadius: 0.04,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("Si algo falla,\nse vuelve a editar.", {
    x: 1.18,
    y: 4.95,
    w: 1.36,
    h: 0.34,
    fontFace: "Aptos",
    fontSize: 10.2,
    italic: true,
    color: C.slate,
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 3.14,
    y: 4.62,
    w: 5.9,
    h: 1.14,
    rectRadius: 0.06,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  addCard(slide, {
    x: 3.38,
    y: 4.8,
    w: 2.28,
    h: 0.78,
    title: "Commit",
    body: "Registrar con sentido",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 15,
    bodyFontSize: 10.6,
  });
  addCard(slide, {
    x: 6.3,
    y: 4.8,
    w: 2.28,
    h: 0.78,
    title: "GitHub",
    body: "Sincronizar",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
    titleFontSize: 15,
    bodyFontSize: 10.6,
  });
  slide.addShape(SH.chevron, {
    x: 5.82,
    y: 5.04,
    w: 0.34,
    h: 0.26,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Si algo falla, el ciclo vuelve hacia atr\u00E1s con m\u00E1s informaci\u00F3n.", {
    x: 3.1,
    y: 6.04,
    w: 6.02,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 12,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  validateSlide(slide);
}

function createEditTestInspectSlide() {
  const slide = pptx.addSlide();
  addBlock4Header(
    slide,
    43,
    "Editar, probar e inspeccionar se alimentan entre s\u00ED",
    "Estas tres acciones forman el n\u00FAcleo del ciclo corto antes de registrar un cambio."
  );
  const nodes = [
    [5.38, 2.48, 2.56, 1.12, "Navegador", "Aqu\u00ED se ve el resultado.", C.softBlue, C.navy],
    [1.54, 3.7, 2.56, 1.12, "Editor", "Aqu\u00ED se modifica el proyecto.", C.white, C.red],
    [9.22, 3.7, 2.56, 1.12, "DevTools", "Aqu\u00ED se observa la causa.", C.paleRed, C.gold],
  ];
  nodes.forEach(([x, y, w, h, title, body, fill, accent]) => {
    addCard(slide, {
      x,
      y,
      w,
      h,
      title,
      body,
      fill,
      line: fill === C.white ? C.border : fill,
      accent,
      titleFontSize: 17,
      bodyFontSize: 11.5,
    });
  });
  slide.addShape(SH.roundRect, {
    x: 4.5,
    y: 5.02,
    w: 4.34,
    h: 0.92,
    rectRadius: 0.08,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("Comprender el cambio", {
    x: 4.84,
    y: 5.28,
    w: 3.66,
    h: 0.22,
    fontFace: "Aptos Display",
    fontSize: 19.5,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.line, {
    x: 4.08,
    y: 4.24,
    w: 1.18,
    h: 1.02,
    line: { color: C.navy, pt: 1.6 },
  });
  slide.addShape(SH.line, {
    x: 7.98,
    y: 4.24,
    w: 1.18,
    h: 1.02,
    line: { color: C.navy, pt: 1.6 },
  });
  slide.addShape(SH.line, {
    x: 6.66,
    y: 3.6,
    w: 0,
    h: 1.42,
    line: { color: C.red, pt: 1.4 },
  });
  addStripItem(slide, {
    x: 1.98,
    y: 6.1,
    w: 9.44,
    text: "Si el navegador muestra el problema y DevTools ayuda a explicarlo, el editor puede corregir con mayor precisión.",
    fill: C.white,
    line: C.border,
    accent: C.red,
  });
  validateSlide(slide);
}

function createRegisterWhenReadySlide() {
  const slide = pptx.addSlide();
  addBlock4Header(
    slide,
    44,
    "Registrar cuando el cambio ya tiene sentido",
    "Git entra mejor al final del mini-ciclo, cuando el cambio ya fue probado y puede describirse con claridad."
  );

  addCodePanel(slide, {
    x: 1.0,
    y: 2.42,
    w: 4.22,
    h: 3.42,
    lines: [
      "> git status",
      "> git add .",
      '> git commit -m "corrige botón principal"',
      "> git push",
    ],
  });
  slide.addText("Secuencia de registro", {
    x: 1.9,
    y: 2.66,
    w: 1.94,
    h: 0.16,
    fontFace: "Aptos",
    fontSize: 12.5,
    bold: true,
    color: C.white,
    margin: 0,
  });

  const criteria = [
    [6.0, 2.56, "Probado", "El cambio ya fue visto en el navegador.", C.white, C.red],
    [8.64, 2.98, "Acotado", "No mezcla problemas distintos en el mismo commit.", C.softBlue, C.navy],
    [6.82, 4.26, "Explicable", "Puede resumirse con un mensaje comprensible.", C.paleRed, C.gold],
    [9.18, 4.74, "Sincronizable", "Ya vale la pena enviarlo al remoto.", C.white, C.red],
  ];
  criteria.forEach(([x, y, title, body, fill, accent]) => {
    addCard(slide, {
      x,
      y,
      w: 2.52,
      h: 1.02,
      title,
      body,
      fill,
      line: fill === C.white ? C.border : fill,
      accent,
      titleFontSize: 16,
      bodyFontSize: 11,
    });
  });

  validateSlide(slide);
}

function createCaseStudySlide() {
  const slide = pptx.addSlide();
  addBlock4Header(
    slide,
    45,
    "Caso breve: corregir una interfaz",
    "Un botón con poco contraste permite ver cómo se conectan navegador, DevTools, editor y Git dentro del mismo flujo."
  );

  slide.addShape(SH.line, {
    x: 6.5,
    y: 2.48,
    w: 0,
    h: 3.58,
    line: { color: C.navy, pt: 2 },
  });
  const items = [
    [1.18, 2.54, "1", "Detectar", "En el navegador se ve que el botón no destaca.", C.white, C.red],
    [7.02, 3.08, "2", "Inspeccionar", "DevTools revela la regla CSS que provoca el problema.", C.softBlue, C.navy],
    [1.18, 3.62, "3", "Probar", "Se ajusta temporalmente color y espaciado.", C.paleRed, C.gold],
    [7.02, 4.16, "4", "Editar", "Se corrige el CSS real en el proyecto.", C.white, C.red],
    [1.18, 4.7, "5", "Comprobar", "Se recarga y se confirma que el cambio sí resolvió el caso.", C.softBlue, C.navy],
    [7.02, 5.24, "6", "Registrar", "Git status, commit claro y push al remoto.", C.paleRed, C.gold],
  ];
  items.forEach(([x, y, n, title, body, fill, accent]) => {
    slide.addShape(SH.ellipse, {
      x: 6.24,
      y: y + 0.16,
      w: 0.52,
      h: 0.52,
      fill: { color: accent },
      line: { color: accent },
    });
    slide.addText(n, {
      x: 6.24,
      y: y + 0.31,
      w: 0.52,
      h: 0.16,
      fontFace: "Aptos Display",
      fontSize: 12.5,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    });
    addCard(slide, {
      x,
      y,
      w: 4.92,
      h: 0.88,
      title,
      body,
      fill,
      line: fill === C.white ? C.border : fill,
      accent,
      titleFontSize: 15.2,
      bodyFontSize: 11,
    });
  });

  validateSlide(slide);
}

function createToolRolesSlide() {
  const slide = pptx.addSlide();
  addBlock4Header(
    slide,
    46,
    "Ninguna herramienta hace todo",
    "El flujo aparece cuando cada una resuelve una parte distinta del recorrido."
  );

  const roles = [
    [1.0, "Navegador", "Muestra el comportamiento visible.", C.white, C.red],
    [4.02, "DevTools", "Ayuda a explicarlo con evidencia.", C.softBlue, C.navy],
    [7.04, "Editor", "Permite corregir el proyecto real.", C.paleRed, C.gold],
    [10.06, "Git y GitHub", "Conservan y sincronizan la solución.", C.white, C.red],
  ];
  roles.forEach(([x, title, body, fill, accent]) => {
    addCard(slide, {
      x,
      y: 2.72,
      w: 2.3,
      h: 2.28,
      title,
      body,
      fill,
      line: fill === C.white ? C.border : fill,
      accent,
      titleFontSize: 17,
      bodyFontSize: 12.2,
    });
  });
  [3.52, 6.54, 9.56].forEach((x) => {
    slide.addShape(SH.chevron, {
      x,
      y: 3.56,
      w: 0.34,
      h: 0.44,
      fill: { color: C.red },
      line: { color: C.red },
    });
  });
  slide.addShape(SH.roundRect, {
    x: 1.32,
    y: 5.48,
    w: 10.54,
    h: 0.56,
    rectRadius: 0.04,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("Herramientas distintas, una sola práctica técnica.", {
    x: 1.56,
    y: 5.66,
    w: 10.06,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 12.4,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createHealthyWorkflowSlide() {
  const slide = pptx.addSlide();
  addBlock4Header(
    slide,
    47,
    "Criterios de un flujo sano",
    "El valor del flujo no está solo en las herramientas, sino en los hábitos que vuelven legible el trabajo."
  );

  const items = [
    ["Cambios pequeños", "Facilitan entender qué produjo el resultado.", C.white, C.red],
    ["Prueba frecuente", "Evita descubrir errores solo al final.", C.softBlue, C.navy],
    ["Inspeccionar antes de corregir", "DevTools reduce la adivinación.", C.paleRed, C.gold],
    ["Commits claros", "La historia debe leerse después.", C.white, C.red],
    ["Sincronización regular", "El remoto también forma parte del orden.", C.softBlue, C.navy],
    ["No mezclar problemas", "Cada commit debería responder a una intención.", C.paleRed, C.gold],
  ];
  items.forEach(([title, body, fill, accent], idx) => {
    addCard(slide, {
      x: 1.04 + (idx % 2) * 5.58,
      y: 2.48 + Math.floor(idx / 2) * 1.18,
      w: 5.18,
      h: 0.98,
      title,
      body,
      fill,
      line: fill === C.white ? C.border : fill,
      accent,
      titleFontSize: 15.5,
      bodyFontSize: 11.4,
    });
  });

  validateSlide(slide);
}

function createAgentSupportSlide() {
  const slide = pptx.addSlide();
  addBlock4Header(
    slide,
    48,
    "Agentes como apoyo, no como reemplazo",
    "La asistencia puede acelerar partes del trabajo, pero la validación sigue siendo responsabilidad del desarrollador."
  );

  slide.addShape(SH.roundRect, {
    x: 1.02,
    y: 2.44,
    w: 4.92,
    h: 3.76,
    rectRadius: 0.08,
    fill: { color: C.softBlue },
    line: { color: C.softBlue },
  });
  slide.addText("La IA puede ayudar a", {
    x: 1.34,
    y: 2.82,
    w: 2.82,
    h: 0.24,
    fontFace: "Aptos Display",
    fontSize: 19.5,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  [
    "sugerir cambios",
    "explicar un error",
    "proponer un commit",
    "acelerar documentación",
  ].forEach((text, idx) => {
    addStripItem(slide, {
      x: 1.3,
      y: 3.34 + idx * 0.62,
      w: 4.1,
      text,
      fill: C.white,
      line: C.border,
      accent: idx % 2 === 0 ? C.navy : C.red,
    });
  });

  slide.addShape(SH.roundRect, {
    x: 6.32,
    y: 2.44,
    w: 5.0,
    h: 3.76,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Sigue siendo tu responsabilidad", {
    x: 6.66,
    y: 2.82,
    w: 3.56,
    h: 0.24,
    fontFace: "Aptos Display",
    fontSize: 19.5,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  [
    "comprobar en el navegador",
    "revisar con DevTools",
    "decidir qué registrar",
    "validar que el cambio tenga sentido",
  ].forEach((text, idx) => {
    addStripItem(slide, {
      x: 6.64,
      y: 3.34 + idx * 0.62,
      w: 4.12,
      text,
      fill: idx % 2 === 0 ? C.paleRed : C.softNeutral,
      line: idx % 2 === 0 ? C.paleRed : C.softNeutral,
      accent: idx % 2 === 0 ? C.red : C.gold,
    });
  });

  validateSlide(slide);
}

function createBlock4QuestionsSlide() {
  const slide = pptx.addSlide();
  addBlock4Header(
    slide,
    49,
    "Preguntas para pensar",
    "Estas preguntas ayudan a cerrar la clase desde la lógica del proceso y no solo desde nombres de herramientas."
  );

  addCard(slide, {
    x: 1.0,
    y: 2.42,
    w: 11.22,
    h: 1.12,
    title: "Pregunta central",
    body: "¿Por qué un flujo de trabajo moderno no debería entenderse como una lista de herramientas sueltas?",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 17,
    bodyFontSize: 13.6,
  });

  const qs = [
    ["Cambios grandes", "¿Qué problema aparece cuando se hacen demasiados cambios antes de probar?", C.softBlue, C.navy],
    ["Lugar de DevTools", "¿Por qué DevTools ocupa un lugar intermedio entre editar y registrar?", C.paleRed, C.gold],
    ["Commit con sentido", "¿Por qué conviene registrar solo cambios ya probados y comprensibles?", C.white, C.red],
    ["IA y criterio", "¿Cómo cambia este flujo si un agente ayuda pero no reemplaza la validación?", C.softBlue, C.navy],
  ];
  qs.forEach(([title, body, fill, accent], idx) => {
    addCard(slide, {
      x: 1.08 + (idx % 2) * 5.54,
      y: 4.04 + Math.floor(idx / 2) * 1.32,
      w: 5.08,
      h: 1.04,
      title,
      body,
      fill,
      line: fill === C.white ? C.border : fill,
      accent,
      titleFontSize: 15.5,
      bodyFontSize: 11.6,
    });
  });

  validateSlide(slide);
}

function createBlock4ClosingSlide() {
  const slide = pptx.addSlide();
  addBlock4Header(
    slide,
    50,
    "S\u00EDntesis del bloque",
    "El flujo moderno integra edici\u00F3n, prueba, observaci\u00F3n, correcci\u00F3n, versionado y sincronizaci\u00F3n en ciclos cortos."
  );
  slide.addShape(SH.roundRect, {
    x: 0.98,
    y: 2.36,
    w: 7.12,
    h: 3.54,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Idea clave", {
    x: 1.3,
    y: 2.7,
    w: 1.34,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 13,
    bold: true,
    color: C.red,
    margin: 0,
  });
  slide.addText("Desarrollar bien no es solo escribir c\u00F3digo:\nes sostener un proceso t\u00E9cnico legible y repetible.", {
    x: 1.3,
    y: 3.02,
    w: 6.18,
    h: 1.02,
    fontFace: "Aptos Display",
    fontSize: 22.2,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Ciclo corto de trabajo", {
    x: 1.3,
    y: 4.44,
    w: 1.9,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 12,
    bold: true,
    color: C.slate,
    margin: 0,
  });
  addPill(slide, 1.3, 4.82, 1.02, "Editar", C.paleRed, C.navy);
  addPill(slide, 2.48, 4.82, 1.02, "Probar", C.white, C.navy);
  addPill(slide, 3.66, 4.82, 1.26, "Observar", C.softBlue, C.navy);
  addPill(slide, 5.08, 4.82, 1.2, "Corregir", C.white, C.navy);
  addPill(slide, 6.44, 4.82, 1.3, "Registrar", C.softNeutral, C.navy);
  slide.addText("Este criterio acompa\u00F1a el resto del m\u00F3dulo.", {
    x: 1.3,
    y: 5.46,
    w: 5.98,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 11.6,
    color: C.ink,
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 8.48,
    y: 2.36,
    w: 3.68,
    h: 3.54,
    rectRadius: 0.08,
    fill: { color: C.softBlue },
    line: { color: C.softBlue },
  });
  slide.addText("Pr\u00F3xima clase", {
    x: 8.8,
    y: 2.78,
    w: 1.8,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 13,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("HTML sem\u00E1ntico,\nestructura de documentos,\nformularios y accesibilidad inicial.", {
    x: 8.8,
    y: 3.18,
    w: 2.82,
    h: 1.32,
    fontFace: "Aptos Display",
    fontSize: 18.2,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("La siguiente sesi\u00F3n ya se apoyar\u00E1 en esta forma de trabajo.", {
    x: 8.8,
    y: 5.12,
    w: 2.76,
    h: 0.38,
    fontFace: "Aptos",
    fontSize: 12.2,
    color: C.ink,
    margin: 0,
  });
  validateSlide(slide);
}

function createProjectStructureSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    0,
    "Un proyecto también es una estructura",
    "Archivos, carpetas y nombres claros ayudan a entender dónde tocar y qué relación existe entre las piezas."
  );

  slide.addShape(SH.roundRect, {
    x: 0.96,
    y: 2.38,
    w: 4.1,
    h: 3.88,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Vista simple del proyecto", {
    x: 1.28,
    y: 2.72,
    w: 2.46,
    h: 0.22,
    fontFace: "Aptos Display",
    fontSize: 18.5,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  ["index.html", "styles.css", "main.js", "assets/"].forEach((item, idx) => {
    addStripItem(slide, {
      x: 1.26,
      y: 3.22 + idx * 0.68,
      w: 2.78,
      text: item,
      fill: idx % 2 === 0 ? C.softNeutral : C.white,
      line: idx % 2 === 0 ? C.softNeutral : C.border,
      accent: idx % 2 === 0 ? C.gold : C.red,
    });
  });
  slide.addText("Cuando la estructura es legible, el trabajo técnico pierde menos tiempo buscando y más tiempo resolviendo.", {
    x: 1.28,
    y: 5.98,
    w: 3.06,
    h: 0.36,
    fontFace: "Aptos",
    fontSize: 11.8,
    color: C.ink,
    margin: 0,
  });

  const parts = [
    [5.44, 2.62, "HTML", "Define la estructura visible.", C.white, C.red],
    [8.48, 2.62, "CSS", "Da forma, color y jerarquía.", C.softBlue, C.navy],
    [5.44, 4.24, "JavaScript", "Permite comportamiento e interacción.", C.paleRed, C.gold],
    [8.48, 4.24, "Assets", "Imágenes, íconos y recursos del sitio.", C.white, C.red],
  ];
  parts.forEach(([x, y, title, body, fill, accent]) => {
    addCard(slide, {
      x,
      y,
      w: 2.72,
      h: 1.14,
      title,
      body,
      fill,
      line: fill === C.white ? C.border : fill,
      accent,
      titleFontSize: 15.5,
      bodyFontSize: 11.2,
    });
  });

  validateSlide(slide);
}

function createTerminalSupportSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    0,
    "La terminal no reemplaza al editor: lo complementa",
    "Varias tareas del entorno moderno no ocurren dentro del archivo, sino alrededor del proyecto."
  );

  addCodePanel(slide, {
    x: 1.02,
    y: 2.44,
    w: 4.34,
    h: 3.46,
    lines: [
      "> npm install",
      "> npm run dev",
      "> git status",
      "> git pull",
    ],
  });
  slide.addText("Comandos frecuentes del entorno", {
    x: 1.76,
    y: 2.68,
    w: 2.7,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 12.4,
    bold: true,
    color: C.white,
    margin: 0,
  });

  const reasons = [
    [6.02, 2.62, "Levantar el proyecto", "Permite ejecutar tareas que el navegador no resuelve solo.", C.white, C.red],
    [8.82, 2.62, "Consultar estado", "Ayuda a saber qué cambió y qué queda pendiente.", C.softBlue, C.navy],
    [6.02, 4.24, "Automatizar pasos", "Evita repetir acciones manuales todo el tiempo.", C.paleRed, C.gold],
    [8.82, 4.24, "Trabajar con Git", "Mucho del versionado ocurre desde comandos claros.", C.white, C.red],
  ];
  reasons.forEach(([x, y, title, body, fill, accent]) => {
    addCard(slide, {
      x,
      y,
      w: 2.5,
      h: 1.12,
      title,
      body,
      fill,
      line: fill === C.white ? C.border : fill,
      accent,
      titleFontSize: 15,
      bodyFontSize: 10.8,
    });
  });

  validateSlide(slide);
}

function createEnvironmentHabitsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    0,
    "Hábitos mínimos para un entorno sano",
    "Antes de aprender herramientas avanzadas, conviene instalar algunas costumbres simples y sostenibles."
  );

  slide.addShape(SH.roundRect, {
    x: 1.0,
    y: 2.48,
    w: 4.46,
    h: 3.62,
    rectRadius: 0.08,
    fill: { color: C.softBlue },
    line: { color: C.softBlue },
  });
  slide.addText("Haz esto al empezar", {
    x: 1.28,
    y: 2.8,
    w: 2.32,
    h: 0.22,
    fontFace: "Aptos Display",
    fontSize: 18.4,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  [
    "Nombrar bien archivos y carpetas.",
    "Probar cambios pequeños y frecuentes.",
    "Usar el navegador para validar.",
    "Abrir DevTools cuando algo no calza.",
    "Registrar avances con intención.",
  ].forEach((text, idx) => {
    addStripItem(slide, {
      x: 1.24,
      y: 3.24 + idx * 0.54,
      w: 3.84,
      text,
      fill: idx % 2 === 0 ? C.white : C.paleRed,
      line: idx % 2 === 0 ? C.border : C.paleRed,
      accent: idx % 2 === 0 ? C.red : C.navy,
    });
  });

  const results = [
    [6.02, 2.66, "Más claridad", "Se entiende mejor qué hace cada pieza del proyecto.", C.white, C.red],
    [8.92, 3.44, "Menos adivinación", "Los errores se observan antes de corregirse.", C.paleRed, C.gold],
    [6.92, 4.9, "Más trazabilidad", "El trabajo puede revisarse y retomarse con menos fricción.", C.white, C.red],
  ];
  results.forEach(([x, y, title, body, fill, accent]) => {
    addCard(slide, {
      x,
      y,
      w: 3.0,
      h: 1.04,
      title,
      body,
      fill,
      line: fill === C.white ? C.border : fill,
      accent,
      titleFontSize: 15.3,
      bodyFontSize: 11.2,
    });
  });

  validateSlide(slide);
}

function createDevToolsPanelsMapSlide() {
  const slide = pptx.addSlide();
  addBlock2Header(
    slide,
    0,
    "Cuatro paneles que conviene reconocer",
    "No hace falta dominar todo DevTools en una clase, pero sí ubicar qué panel responde mejor a cada pregunta inicial."
  );

  const panels = [
    [1.02, 2.56, "Elements", "Muestra la estructura HTML real de la página.", C.white, C.red],
    [6.66, 2.56, "Styles", "Ayuda a ver qué reglas CSS están actuando.", C.softBlue, C.navy],
    [1.02, 4.2, "Console", "Expone errores, advertencias y mensajes del navegador.", C.paleRed, C.gold],
    [6.66, 4.2, "Network", "Permite ver qué archivos y solicitudes se cargaron.", C.white, C.red],
  ];
  panels.forEach(([x, y, title, body, fill, accent]) => {
    addCard(slide, {
      x,
      y,
      w: 4.58,
      h: 1.2,
      title,
      body,
      fill,
      line: fill === C.white ? C.border : fill,
      accent,
      titleFontSize: 16.5,
      bodyFontSize: 12,
    });
  });
  slide.addShape(SH.roundRect, {
    x: 4.2,
    y: 3.48,
    w: 4.12,
    h: 0.42,
    rectRadius: 0.04,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("Cada panel responde una pregunta distinta.", {
    x: 4.48,
    y: 3.6,
    w: 3.56,
    h: 0.16,
    fontFace: "Aptos",
    fontSize: 11.8,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createObservationOrderSlide() {
  const slide = pptx.addSlide();
  addBlock2Header(
    slide,
    0,
    "Una ruta simple para mirar primero",
    "Cuando algo falla, conviene seguir un orden breve antes de tocar código al azar."
  );

  const steps = [
    [1.02, 3.06, "Ver", "Qué se rompió", C.white, C.red],
    [3.18, 3.06, "Inspeccionar", "Qué elemento es", C.softBlue, C.navy],
    [5.34, 3.06, "Revisar estilos", "Qué regla actúa", C.paleRed, C.gold],
    [7.5, 3.06, "Abrir consola", "Qué error aparece", C.white, C.red],
    [9.66, 3.06, "Mirar red", "Qué no cargó", C.softBlue, C.navy],
  ];
  steps.forEach(([x, y, title, body, fill, accent], idx) => {
    addCard(slide, {
      x,
      y,
      w: 1.72,
      h: 1.08,
      title,
      body,
      fill,
      line: fill === C.white ? C.border : fill,
      accent,
      titleFontSize: idx === 2 ? 13.2 : 14.2,
      bodyFontSize: 10.2,
    });
  });
  [2.72, 4.88, 7.04, 9.2].forEach((x) => addArrow(slide, x, 3.46));
  addStripItem(slide, {
    x: 2.04,
    y: 5.34,
    w: 8.18,
    text: "La idea no es memorizar una receta rígida, sino evitar corregir sin evidencia.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
  });

  validateSlide(slide);
}

function createCommonSignalsSlide() {
  const slide = pptx.addSlide();
  addBlock2Header(
    slide,
    0,
    "Señales visibles y primera pista técnica",
    "A veces el problema ya da una pista sobre qué herramienta conviene abrir primero."
  );

  slide.addShape(SH.roundRect, {
    x: 1.0,
    y: 2.54,
    w: 10.96,
    h: 3.48,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });

  const rows = [
    ["El estilo no cambia", "Elements / Styles", C.red],
    ["Un botón no responde", "Console", C.navy],
    ["La página carga incompleta", "Network", C.gold],
    ["Aparece un error visible", "Console + Elements", C.red],
  ];
  rows.forEach(([signal, tool, accent], idx) => {
    addStripItem(slide, {
      x: 1.26,
      y: 2.92 + idx * 0.72,
      w: 5.48,
      text: signal,
      fill: idx % 2 === 0 ? C.softNeutral : C.white,
      line: idx % 2 === 0 ? C.softNeutral : C.border,
      accent,
    });
    addPill(slide, 8.04, 3.02 + idx * 0.72, 2.52, tool, idx % 2 === 0 ? C.softBlue : C.paleRed, C.navy);
  });

  slide.addText("Primera herramienta a revisar", {
    x: 8.08,
    y: 2.64,
    w: 2.64,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 11.8,
    bold: true,
    color: C.slate,
    margin: 0,
  });

  validateSlide(slide);
}

function createWorkingTreeStatesSlide() {
  const slide = pptx.addSlide();
  addBlock3Header(
    slide,
    0,
    "Modificar no es lo mismo que registrar",
    "Antes del commit, Git distingue varios estados y esa diferencia ayuda a pensar mejor el trabajo."
  );

  const states = [
    [1.08, "Working tree", "Cambios hechos en archivos locales.", C.white, C.red],
    [4.54, "Staged", "Cambios seleccionados para el próximo commit.", C.softBlue, C.navy],
    [8.0, "Commit", "Cambio ya registrado en la historia del proyecto.", C.paleRed, C.gold],
  ];
  states.forEach(([x, title, body, fill, accent]) => {
    addCard(slide, {
      x,
      y: 2.92,
      w: 2.86,
      h: 2.0,
      title,
      body,
      fill,
      line: fill === C.white ? C.border : fill,
      accent,
      titleFontSize: 17.2,
      bodyFontSize: 12,
    });
  });
  [4.16, 7.62].forEach((x) => {
    slide.addShape(SH.chevron, {
      x,
      y: 3.74,
      w: 0.42,
      h: 0.44,
      fill: { color: C.red },
      line: { color: C.red },
    });
  });
  addStripItem(slide, {
    x: 2.18,
    y: 5.46,
    w: 8.04,
    text: "Git no guarda solo archivos: guarda decisiones sobre qué cambio vale la pena conservar.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
  });

  validateSlide(slide);
}

function createGoodCommitSlide() {
  const slide = pptx.addSlide();
  addBlock3Header(
    slide,
    0,
    "Qué hace legible un buen commit",
    "Un commit útil no solo guarda cambios: también deja claro qué se hizo y por qué."
  );

  slide.addShape(SH.roundRect, {
    x: 1.0,
    y: 2.58,
    w: 4.36,
    h: 3.34,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Comparación rápida", {
    x: 1.3,
    y: 2.9,
    w: 2.18,
    h: 0.22,
    fontFace: "Aptos Display",
    fontSize: 18.2,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  addStripItem(slide, {
    x: 1.28,
    y: 3.36,
    w: 3.76,
    text: "Mal: \"cambios varios\"",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
  });
  addStripItem(slide, {
    x: 1.28,
    y: 4.06,
    w: 3.76,
    text: "Bien: \"corrige validación del formulario\"",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  slide.addText("El segundo mensaje deja una pista clara para el futuro y para cualquier otra persona que lea el historial.", {
    x: 1.3,
    y: 4.92,
    w: 3.72,
    h: 0.54,
    fontFace: "Aptos",
    fontSize: 11.8,
    color: C.ink,
    margin: 0,
  });

  const criteria = [
    [6.02, 2.76, "Es específico", "No mezcla varias intenciones en una misma frase.", C.white, C.red],
    [8.96, 3.58, "Es breve", "Se lee rápido sin perder el punto central.", C.softBlue, C.navy],
    [6.94, 4.9, "Es útil después", "Sirve para revisar, depurar y explicar cambios.", C.paleRed, C.gold],
  ];
  criteria.forEach(([x, y, title, body, fill, accent]) => {
    addCard(slide, {
      x,
      y,
      w: 3.0,
      h: 1.06,
      title,
      body,
      fill,
      line: fill === C.white ? C.border : fill,
      accent,
      titleFontSize: 15.2,
      bodyFontSize: 11,
    });
  });

  validateSlide(slide);
}

function createTeamRoutineSlide() {
  const slide = pptx.addSlide();
  addBlock3Header(
    slide,
    0,
    "Rutina mínima con Git en este módulo",
    "Más que un flujo complejo, al inicio conviene instalar una secuencia corta y repetible."
  );

  const steps = [
    [1.0, "pull", C.white, C.red],
    [2.92, "editar", C.softBlue, C.navy],
    [4.84, "status", C.paleRed, C.gold],
    [6.76, "add", C.white, C.red],
    [8.68, "commit", C.softBlue, C.navy],
    [10.6, "push", C.paleRed, C.gold],
  ];
  steps.forEach(([x, label, fill], idx) => {
    slide.addShape(SH.roundRect, {
      x,
      y: 3.18,
      w: 1.18,
      h: 0.7,
      rectRadius: 0.04,
      fill: { color: fill },
      line: { color: fill === C.white ? C.border : fill, pt: 1 },
    });
    slide.addText(label, {
      x,
      y: 3.42,
      w: 1.18,
      h: 0.16,
      fontFace: "Aptos Display",
      fontSize: idx === 4 ? 13.2 : 13.5,
      bold: true,
      color: C.navy,
      align: "center",
      margin: 0,
    });
    if (idx < steps.length - 1) addArrow(slide, x + 1.32, 3.36);
  });

  addStripItem(slide, {
    x: 1.72,
    y: 4.54,
    w: 9.22,
    text: "La gracia de esta rutina es que puede repetirse muchas veces sin volverse confusa.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
  });
  addStripItem(slide, {
    x: 2.12,
    y: 5.18,
    w: 8.42,
    text: "Primero criterio y orden; después, flujos más complejos.",
    fill: C.softNeutral,
    line: C.softNeutral,
    accent: C.gold,
  });

  validateSlide(slide);
}

function createBeforeCommitSlide() {
  const slide = pptx.addSlide();
  addBlock4Header(
    slide,
    0,
    "Antes de registrar, el cambio debe respirar",
    "El commit aparece mejor cuando el cambio ya fue visto, probado, acotado y entendido."
  );

  const checks = [
    [1.02, 2.72, "Visto", "Ya se revisó en navegador.", C.white, C.red],
    [4.02, 2.72, "Inspeccionado", "DevTools ayudó a entender la causa.", C.softBlue, C.navy],
    [7.02, 2.72, "Acotado", "No mezcla problemas distintos.", C.paleRed, C.gold],
    [10.02, 2.72, "Explicable", "Se puede resumir en una frase.", C.white, C.red],
  ];
  checks.forEach(([x, y, title, body, fill, accent], idx) => {
    addCard(slide, {
      x,
      y,
      w: 2.14,
      h: 1.18,
      title,
      body,
      fill,
      line: fill === C.white ? C.border : fill,
      accent,
      titleFontSize: idx === 1 ? 14 : 15,
      bodyFontSize: 10.8,
    });
  });
  addStripItem(slide, {
    x: 2.22,
    y: 4.64,
    w: 7.76,
    text: "Registrar demasiado pronto produce historial ruidoso y commits poco útiles.",
    fill: C.white,
    line: C.border,
    accent: C.red,
  });
  slide.addShape(SH.roundRect, {
    x: 4.24,
    y: 5.28,
    w: 3.7,
    h: 0.48,
    rectRadius: 0.04,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("Primero claridad; después registro.", {
    x: 4.54,
    y: 5.42,
    w: 3.08,
    h: 0.16,
    fontFace: "Aptos",
    fontSize: 12,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createBeforePushSlide() {
  const slide = pptx.addSlide();
  addBlock4Header(
    slide,
    0,
    "Antes de hacer push",
    "Sincronizar no es un gesto automático: conviene hacerlo cuando el cambio ya tiene sentido técnico."
  );

  slide.addShape(SH.roundRect, {
    x: 1.0,
    y: 2.56,
    w: 5.04,
    h: 3.46,
    rectRadius: 0.08,
    fill: { color: C.softBlue },
    line: { color: C.softBlue },
  });
  slide.addText("Checklist breve", {
    x: 1.3,
    y: 2.86,
    w: 2.08,
    h: 0.22,
    fontFace: "Aptos Display",
    fontSize: 18.2,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  [
    "El cambio quedó probado.",
    "El commit se entiende al leerlo.",
    "No faltan archivos importantes.",
    "El remoto sí corresponde al proyecto.",
  ].forEach((text, idx) => {
    addStripItem(slide, {
      x: 1.28,
      y: 3.28 + idx * 0.58,
      w: 4.24,
      text,
      fill: idx % 2 === 0 ? C.white : C.paleRed,
      line: idx % 2 === 0 ? C.border : C.paleRed,
      accent: idx % 2 === 0 ? C.red : C.navy,
    });
  });

  const risks = [
    [7.02, 2.82, "Si te apuras", "Puedes enviar trabajo roto o difícil de explicar.", C.white, C.red],
    [8.68, 4.16, "Si validas antes", "El remoto queda más limpio y el proceso se entiende mejor.", C.paleRed, C.gold],
  ];
  risks.forEach(([x, y, title, body, fill, accent]) => {
    addCard(slide, {
      x,
      y,
      w: 3.14,
      h: 1.16,
      title,
      body,
      fill,
      line: fill === C.white ? C.border : fill,
      accent,
      titleFontSize: 15.2,
      bodyFontSize: 11.2,
    });
  });

  validateSlide(slide);
}

function createFlowBreakpointsSlide() {
  const slide = pptx.addSlide();
  addBlock4Header(
    slide,
    0,
    "Si el flujo se rompe, mira por capas",
    "No todos los problemas aparecen en el mismo lugar; por eso conviene ubicar primero la capa que está fallando."
  );

  const layers = [
    [1.1, 3.0, "Archivos", "¿Se editó el archivo correcto?", C.white, C.red],
    [3.92, 3.0, "Navegador", "¿El resultado visible cambió?", C.softBlue, C.navy],
    [6.74, 3.0, "DevTools", "¿La causa se puede explicar?", C.paleRed, C.gold],
    [9.56, 3.0, "Git / remoto", "¿El cambio quedó registrado y sincronizado?", C.white, C.red],
  ];
  layers.forEach(([x, y, title, body, fill, accent]) => {
    addCard(slide, {
      x,
      y,
      w: 2.24,
      h: 1.24,
      title,
      body,
      fill,
      line: fill === C.white ? C.border : fill,
      accent,
      titleFontSize: 15.2,
      bodyFontSize: 10.8,
    });
  });
  [3.48, 6.3, 9.12].forEach((x) => addArrow(slide, x, 3.42));
  addStripItem(slide, {
    x: 1.9,
    y: 5.22,
    w: 9.08,
    text: "Diagnosticar por capas reduce la tentación de corregir a ciegas.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
  });

  validateSlide(slide);
}

async function main() {
  createCoverSlide();
  createMapSlide();
  createBlockIntroSlide();
  createNotOnlyCodeSlide();
  createMythVsRealitySlide();
  createToolsOverviewSlide();
  createProjectStructureSlide();
  createToolGroupsSlide();
  createSystemSlide();
  createTerminalSupportSlide();
  createExampleFlowSlide();
  createToolchainSlide();
  createTechnicalJudgementSlide();
  createDisorderSlide();
  createEnvironmentHabitsSlide();
  createQuestionsSlide();
  createClosingSlide();
  createBlock2IntroSlide();
  createBrowserAnalysisSlide();
  createUserVsDeveloperSlide();
  createDevToolsCapabilitiesSlide();
  createDevToolsPanelsMapSlide();
  createHtmlCssRelationSlide();
  createDevToolsQuestionsSlide();
  createConsoleAndNetworkSlide();
  createObservationOrderSlide();
  createVisibleFailureSlide();
  createDeveloperReadingSlide();
  createObservationFlowSlide();
  createCommonSignalsSlide();
  createBlock2QuestionsSlide();
  createBlock2ClosingSlide();
  createBlock3IntroSlide();
  createSaveVsVersionSlide();
  createGitHistorySlide();
  createWorkingTreeStatesSlide();
  createGitSequenceSlide();
  createGitCommandsSlide();
  createGoodCommitSlide();
  createGitVsGitHubSlide();
  createRemoteCommandsSlide();
  createTeamRoutineSlide();
  createVersioningHabitsSlide();
  createBranchingModelsSlide();
  createModuleRecommendationSlide();
  createBlock3QuestionsSlide();
  createBlock3ClosingSlide();
  createBlock4IntroSlide();
  createToolsToRoutineSlide();
  createLinearVsRealSlide();
  createWorkflowCycleSlide();
  createBeforeCommitSlide();
  createEditTestInspectSlide();
  createRegisterWhenReadySlide();
  createBeforePushSlide();
  createCaseStudySlide();
  createToolRolesSlide();
  createHealthyWorkflowSlide();
  createAgentSupportSlide();
  createFlowBreakpointsSlide();
  createBlock4QuestionsSlide();
  createBlock4ClosingSlide();

  await pptx.writeFile({ fileName: outputPptx });
  fs.copyFileSync(__filename, outputJs);
  console.log(`Deck generado: ${outputPptx}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

