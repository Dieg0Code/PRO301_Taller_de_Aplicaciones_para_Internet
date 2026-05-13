const path = require("path");
const PptxGenJS = require("../../../../tools/slides-system/node_modules/pptxgenjs");
const slidesSystem = require("../../../../tools/slides-system");
const { imageSizingCrop, imageSizingContain } = require("../../../../tools/slides-system/vendor/pptxgenjs_helpers/image");

const { theme, utils } = slidesSystem;
const { applyAiepTheme, TOKENS: C, TYPOGRAPHY } = theme;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";

applyAiepTheme(pptx, {
  author: "Diego Obando",
  company: "AIEP",
  subject: "Charla 4to medio",
  title: "Crear con IA: de una app rápida a una inteligencia que aprende",
});

const SH = pptx.ShapeType;
const W = 13.333;
const H = 7.5;
const rootDir = path.resolve(__dirname, "..");
const outputPptx = path.join(rootDir, "Charla-4to-IA-Ataxx-Black-Swan.pptx");
const logoPath = path.resolve(__dirname, "../../../../.agent/skills/slides-aiep/assets/logo-aiep.png");
const logoMarkPath = path.resolve(__dirname, "../../../../.agent/skills/slides-aiep/assets/logo-aiep-mark.png");
const imgDir = path.resolve(__dirname, "assets/images");
const img2026Dir = path.resolve(__dirname, "assets/images/curated-2026");
const ataxxInfoDir = path.resolve(__dirname, "../../../../clases/semana-09/02/infografia");

const IMG = {
  hero: path.join(img2026Dir, "young-coders-neon-cafe.jpg"),
  stitch: path.join(img2026Dir, "creative-studio-laptop-team.jpg"),
  tattoo: path.join(img2026Dir, "tattoo-neon-dreams-interior.jpg"),
  tattooClose: path.join(img2026Dir, "tattoo-artist-neon-sketch.jpg"),
  retail: path.join(img2026Dir, "retail-supermarket-aerial.jpg"),
  retailReceipt: path.join(img2026Dir, "retail-receipts-laptop.jpg"),
  dashboard: path.join(img2026Dir, "data-dashboard-monitor.jpg"),
  code: path.join(img2026Dir, "coding-neon-workstation.jpg"),
  ai: path.join(img2026Dir, "ai-neural-network-abstract.jpg"),
  perceptron: path.join(ataxxInfoDir, "perceptron.png"),
  redNeuronal: path.join(ataxxInfoDir, "red_neuronal.png"),
  mcts: path.join(ataxxInfoDir, "mcts.png"),
  ataxx: path.join(ataxxInfoDir, "anatomia_de_ataxx_zero.png"),
  desarrollo: path.join(ataxxInfoDir, "desarrollo_de_ia_ataxx_zero.png"),
  canales: path.join(ataxxInfoDir, "11_canales_ataxx_zero.png"),
};

function addCrop(slide, imagePath, x, y, w, h, opts = {}) {
  slide.addImage({ path: imagePath, ...imageSizingCrop(imagePath, x, y, w, h, opts.cx, opts.cy, opts.cw, opts.ch) });
}

function addContain(slide, imagePath, x, y, w, h) {
  slide.addImage({ path: imagePath, ...imageSizingContain(imagePath, x, y, w, h) });
}

function text(slide, value, opts = {}) {
  slide.addText(value, {
    x: opts.x,
    y: opts.y,
    w: opts.w,
    h: opts.h,
    fontFace: opts.fontFace || TYPOGRAPHY.body,
    fontSize: opts.fontSize || 12,
    bold: opts.bold || false,
    color: opts.color || C.ink,
    align: opts.align || "left",
    valign: opts.valign || "top",
    margin: opts.margin ?? 0,
    fit: opts.fit || "shrink",
    breakLine: false,
  });
}

function surface(slide, x, y, w, h, opts = {}) {
  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: opts.rectRadius || 0.06,
    fill: { color: opts.fill || C.white, transparency: opts.transparency },
    line: { color: opts.line || opts.fill || C.border, pt: opts.linePt || 1, transparency: opts.lineTransparency },
  });
}

function line(slide, x1, y1, x2, y2, opts = {}) {
  const reverse = x2 < x1 || y2 < y1;
  slide.addShape(SH.line, {
    x: reverse ? x2 : x1,
    y: reverse ? y2 : y1,
    w: Math.abs(x2 - x1),
    h: Math.abs(y2 - y1),
    line: {
      color: opts.color || C.guide,
      pt: opts.pt || 1.2,
      beginArrowType: reverse ? (opts.arrow === false ? "none" : "triangle") : "none",
      endArrowType: reverse ? "none" : (opts.arrow === false ? "none" : "triangle"),
      dash: opts.dash,
      transparency: opts.transparency,
    },
  });
}

function bars(slide, x, y, scale = 1, fill = C.red) {
  slide.addShape(SH.rect, { x, y: y + 0.17 * scale, w: 0.13 * scale, h: 0.42 * scale, fill: { color: fill }, line: { color: fill } });
  slide.addShape(SH.rect, { x: x + 0.19 * scale, y, w: 0.16 * scale, h: 0.59 * scale, fill: { color: fill }, line: { color: fill } });
  slide.addShape(SH.rect, { x: x + 0.42 * scale, y: y + 0.17 * scale, w: 0.13 * scale, h: 0.42 * scale, fill: { color: fill }, line: { color: fill } });
}

function logo(slide, dark = false) {
  if (dark) {
    bars(slide, 10.72, 0.5, 0.72, C.red);
    text(slide, "AIEP", { x: 11.32, y: 0.47, w: 0.88, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.white });
    text(slide, "educación técnico-profesional", { x: 11.33, y: 0.76, w: 1.05, h: 0.08, fontSize: 4.2, color: C.terminalOutput });
  } else {
    slide.addImage({ path: logoMarkPath, x: 11.65, y: 0.42, w: 0.72, h: 0.46, transparency: 4 });
  }
}

function header(slide, title, minute, subtitle = "") {
  bars(slide, 0.7, 0.56, 0.92);
  text(slide, minute, { x: 1.38, y: 0.58, w: 1.45, h: 0.18, fontSize: 8.2, bold: true, color: C.red });
  text(slide, title, { x: 0.72, y: 1.18, w: 9.65, h: 0.52, fontFace: TYPOGRAPHY.display, fontSize: 27, bold: true, color: C.navy });
  if (subtitle) text(slide, subtitle, { x: 0.74, y: 1.84, w: 8.8, h: 0.24, fontSize: 11.5, color: C.slate });
  logo(slide);
}

function footer(slide, label = "Charla 4to medio · IA, web, datos y juego") {
  text(slide, label, { x: 0.76, y: 7.1, w: 5.8, h: 0.11, fontSize: 6.5, color: "8A97A6" });
  const n = String(pptx._slides.length).padStart(2, "0");
  text(slide, n, { x: 12.08, y: 7.04, w: 0.5, h: 0.16, fontSize: 8, bold: true, color: "C9CED6", align: "right" });
}

function tag(slide, value, x, y, w, opts = {}) {
  surface(slide, x, y, w, 0.34, { fill: opts.fill || C.navy, line: opts.fill || C.navy, rectRadius: 0.04 });
  text(slide, value, { x: x + 0.1, y: y + 0.105, w: w - 0.2, h: 0.08, fontSize: opts.fontSize || 7.8, bold: true, color: opts.color || C.white, align: "center" });
}

function bigStatement(slide, title, minute, statement, opts = {}) {
  header(slide, title, minute, opts.subtitle || "");
  surface(slide, 1.24, 2.64, 10.85, 2.28, { fill: opts.fill || C.navy, line: opts.fill || C.navy });
  text(slide, statement, { x: 1.76, y: 3.1, w: 9.8, h: 1.0, fontFace: TYPOGRAPHY.display, fontSize: opts.fontSize || 28, bold: true, color: opts.color || C.white, align: "center", valign: "mid" });
  footer(slide);
  validateSlide(slide, pptx);
}

function drawBoard(slide, x, y, side) {
  const cell = side / 7;
  slide.addShape(SH.rect, { x, y, w: side, h: side, fill: { color: "F8FAFC" }, line: { color: C.navy, pt: 1 } });
  for (let r = 0; r < 7; r += 1) {
    for (let c = 0; c < 7; c += 1) {
      slide.addShape(SH.rect, {
        x: x + c * cell,
        y: y + r * cell,
        w: cell,
        h: cell,
        fill: { color: (r + c) % 2 ? "E7EEF6" : C.white },
        line: { color: "D3DDE8", pt: 0.35 },
      });
    }
  }
  [[0, 0, C.red], [6, 6, C.red], [0, 6, C.titleFill], [6, 0, C.titleFill], [2, 2, C.red], [3, 3, C.titleFill], [4, 2, C.titleFill]].forEach(([r, c, fill]) => {
    slide.addShape(SH.ellipse, { x: x + c * cell + cell * 0.2, y: y + r * cell + cell * 0.2, w: cell * 0.6, h: cell * 0.6, fill: { color: fill }, line: { color: fill === C.red ? "9E171B" : C.navy, pt: 1 } });
  });
}

function slide01() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addCrop(slide, IMG.hero, 6.9, 0, 6.42, 7.5, { cx: 54, cy: 50 });
  slide.addShape(SH.rect, { x: 6.75, y: 0, w: 1.2, h: 7.5, fill: { color: C.navy, transparency: 18 }, line: { transparency: 100 } });
  bars(slide, 0.82, 0.8, 1.25);
  logo(slide, true);
  tag(slide, "60 minutos", 0.92, 1.72, 1.25, { fill: C.red });
  text(slide, "Crear con IA", { x: 0.92, y: 2.28, w: 5.9, h: 0.58, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.white });
  text(slide, "de una app rápida a una inteligencia que aprende", { x: 0.96, y: 3.15, w: 5.55, h: 0.58, fontSize: 17, color: C.terminalOutput });
  text(slide, "Diseño · código · datos · juego · experimentos", { x: 0.98, y: 5.86, w: 5.15, h: 0.18, fontSize: 10.8, bold: true, color: C.white });
  validateSlide(slide, pptx);
}

function slide02() {
  const slide = pptx.addSlide();
  header(slide, "El recorrido de hoy", "0-2 min", "Una charla con demo, juego y decisiones reales.");
  const steps = [
    ["01", "crear", "Stitch abre la primera pantalla", C.red, C.paleRed],
    ["02", "construir", "la app captura una intención", C.gold, C.warm],
    ["03", "medir", "Power BI convierte datos en preguntas", C.success, C.successSoft],
    ["04", "jugar", "Ataxx muestra una IA tomando decisiones", C.titleFill, C.softBlue],
    ["05", "mejorar", "hipótesis, experimentos y evidencia", C.navy, C.softNeutral],
  ];
  steps.forEach((step, index) => {
    const x = 0.9 + index * 2.45;
    surface(slide, x, 2.62, 2.04, 2.42, { fill: step[4], line: step[4] });
    tag(slide, step[0], x + 0.22, 2.9, 0.48, { fill: step[3], fontSize: 7, color: step[3] === C.gold ? C.navy : C.white });
    text(slide, step[1], { x: x + 0.26, y: 3.48, w: 1.55, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.navy, align: "center" });
    text(slide, step[2], { x: x + 0.3, y: 4.12, w: 1.44, h: 0.34, fontSize: 8.7, color: C.ink, align: "center" });
    if (index < steps.length - 1) line(slide, x + 2.05, 3.82, x + 2.35, 3.82, { color: C.guide, pt: 1.0 });
  });
  footer(slide);
  validateSlide(slide, pptx);
}

function slide03() {
  const slide = pptx.addSlide();
  bigStatement(slide, "La regla del día", "2-5 min", "La IA no reemplaza pensar.\nAcelera lo que sabes dirigir.", { fill: C.navy, fontSize: 29 });
}

function slide04() {
  const slide = pptx.addSlide();
  header(slide, "Laboratorio: partir con Stitch", "5-12 min", "La meta no es hacer la app perfecta: es ver una idea convertida en interfaz.");
  addCrop(slide, IMG.stitch, 0.92, 2.42, 5.1, 3.6, { cx: 52, cy: 48 });
  const prompts = [
    ["idea", "qué quiero construir"],
    ["público", "para quién existe"],
    ["acción", "qué debe lograr"],
  ];
  prompts.forEach((item, index) => {
    const y = 2.52 + index * 0.92;
    surface(slide, 6.54, y, 4.68, 0.62, { fill: index === 1 ? C.warm : C.softBlue, line: index === 1 ? C.warm : C.softBlue });
    tag(slide, item[0], 6.78, y + 0.15, 0.82, { fill: index === 1 ? C.gold : C.navy, color: index === 1 ? C.navy : C.white });
    text(slide, item[1], { x: 7.9, y: y + 0.22, w: 2.6, h: 0.12, fontSize: 11, bold: true, color: C.navy });
  });
  surface(slide, 6.54, 5.52, 4.68, 0.5, { fill: C.navy, line: C.navy });
  text(slide, "Actividad: abrir Stitch y generar una primera pantalla.", { x: 6.86, y: 5.68, w: 4.04, h: 0.1, fontSize: 8.8, bold: true, color: C.white, align: "center" });
  footer(slide);
  validateSlide(slide, pptx);
}

function slide05() {
  const slide = pptx.addSlide();
  header(slide, "Un prompt simple, pero dirigido", "12-16 min", "Stitch funciona mejor cuando la idea tiene restricciones claras.");
  surface(slide, 1.12, 2.44, 10.9, 2.6, { fill: C.navy, line: C.navy });
  text(slide, "Diseña una landing para [negocio], pensada para [público], con una acción principal: [reservar / comparar / inscribirse].", { x: 1.72, y: 3.14, w: 9.72, h: 0.6, fontFace: TYPOGRAPHY.display, fontSize: 22, bold: true, color: C.white, align: "center", valign: "mid" });
  const hints = [
    ["negocio", "contexto"],
    ["público", "usuario"],
    ["acción", "objetivo"],
  ];
  hints.forEach((hint, index) => {
    tag(slide, hint[0], 2.28 + index * 3.02, 5.44, 1.1, { fill: index === 1 ? C.gold : C.red, color: index === 1 ? C.navy : C.white });
    text(slide, hint[1], { x: 1.94 + index * 3.02, y: 5.9, w: 1.78, h: 0.12, fontSize: 8.2, bold: true, color: C.slate, align: "center" });
  });
  footer(slide);
  validateSlide(slide, pptx);
}

function slide06() {
  const slide = pptx.addSlide();
  header(slide, "Demo rápida: primera pantalla", "16-20 min", "En el laboratorio importa que puedan tocar la herramienta.");
  const cards = [
    ["1", "elige una idea", "negocio, club, evento, servicio"],
    ["2", "pide una interfaz", "con una acción principal"],
    ["3", "observa y corrige", "qué falta, qué sobra, qué confunde"],
  ];
  cards.forEach((card, index) => {
    const x = 1.08 + index * 3.85;
    surface(slide, x, 2.62, 3.18, 2.4, { fill: index === 1 ? C.warm : C.softBlue, line: index === 1 ? C.warm : C.softBlue });
    tag(slide, card[0], x + 0.28, 2.92, 0.46, { fill: index === 1 ? C.gold : C.navy, color: index === 1 ? C.navy : C.white });
    text(slide, card[1], { x: x + 0.52, y: 3.52, w: 2.14, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: C.navy, align: "center" });
    text(slide, card[2], { x: x + 0.58, y: 4.18, w: 2.04, h: 0.28, fontSize: 9.2, color: C.ink, align: "center" });
  });
  footer(slide);
  validateSlide(slide, pptx);
}

function slide07() {
  const slide = pptx.addSlide();
  header(slide, "Ejemplo 1: landing de tattoo", "20-23 min", "Una idea visual, una acción concreta: reservar.");
  addCrop(slide, IMG.tattoo, 0.88, 2.28, 6.05, 3.9, { cx: 50, cy: 48 });
  surface(slide, 7.32, 2.52, 4.38, 1.02, { fill: C.paleRed, line: C.paleRed });
  text(slide, "No basta que se vea bonita.", { x: 7.72, y: 2.82, w: 3.56, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.navy, align: "center" });
  surface(slide, 7.32, 3.82, 4.38, 1.02, { fill: C.softBlue, line: C.softBlue });
  text(slide, "Tiene que guiar una decisión.", { x: 7.72, y: 4.12, w: 3.56, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.navy, align: "center" });
  surface(slide, 7.32, 5.12, 4.38, 0.62, { fill: C.navy, line: C.navy });
  text(slide, "ver trabajos → confiar → reservar", { x: 7.62, y: 5.33, w: 3.78, h: 0.1, fontSize: 9.2, bold: true, color: C.white, align: "center" });
  footer(slide);
  validateSlide(slide, pptx);
}

function slide08() {
  const slide = pptx.addSlide();
  header(slide, "Ejemplo 2: comparar precios", "23-26 min", "Una app también puede responder una pregunta cotidiana.");
  addCrop(slide, IMG.retail, 0.88, 2.28, 5.8, 3.82, { cx: 52, cy: 54 });
  const qs = [
    ["¿dónde conviene comprar?", C.red, C.paleRed],
    ["¿qué producto subió más?", C.gold, C.warm],
    ["¿qué cambia por semana?", C.success, C.successSoft],
  ];
  qs.forEach((q, index) => {
    surface(slide, 7.08, 2.5 + index * 1.0, 4.44, 0.72, { fill: q[2], line: q[2] });
    text(slide, q[0], { x: 7.46, y: 2.72 + index * 1.0, w: 3.7, h: 0.14, fontSize: 12.5, bold: true, color: C.navy, align: "center" });
  });
  footer(slide);
  validateSlide(slide, pptx);
}

function slide09() {
  const slide = pptx.addSlide();
  header(slide, "Una app empieza a producir datos", "26-30 min", "Ahí aparece el salto profesional: dejar evidencia.");
  const flow = [
    ["pantalla", "interfaz", C.paleRed, C.red],
    ["formulario", "registro", C.warm, C.gold],
    ["datos", "historial", C.successSoft, C.success],
    ["dashboard", "decisión", C.softBlue, C.navy],
  ];
  flow.forEach((item, index) => {
    const x = 1.0 + index * 3.0;
    surface(slide, x, 3.0, 2.28, 1.34, { fill: item[2], line: item[2] });
    text(slide, item[0], { x: x + 0.26, y: 3.3, w: 1.74, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.navy, align: "center" });
    text(slide, item[1], { x: x + 0.3, y: 3.82, w: 1.66, h: 0.12, fontSize: 8.8, color: C.ink, align: "center" });
    if (index < flow.length - 1) line(slide, x + 2.32, 3.68, x + 2.78, 3.68, { color: item[3], pt: 1.4 });
  });
  surface(slide, 1.22, 5.46, 10.8, 0.52, { fill: C.navy, line: C.navy });
  text(slide, "Cuando una app guarda datos, deja de ser solo una pantalla: empieza a ser un sistema.", { x: 1.66, y: 5.62, w: 9.92, h: 0.12, fontSize: 9.5, bold: true, color: C.white, align: "center" });
  footer(slide);
  validateSlide(slide, pptx);
}

function slide10() {
  const slide = pptx.addSlide();
  header(slide, "Power BI: mirar para decidir", "30-34 min", "El dashboard no decora datos: ayuda a hacer mejores preguntas.");
  addCrop(slide, IMG.dashboard, 0.88, 2.28, 5.78, 3.72, { cx: 50, cy: 50 });
  const cards = [
    ["¿qué pasa?", "lectura"],
    ["¿por qué pasa?", "hipótesis"],
    ["¿qué hacemos?", "decisión"],
  ];
  cards.forEach((card, index) => {
    surface(slide, 7.06, 2.56 + index * 0.96, 4.42, 0.68, { fill: index === 1 ? C.warm : C.softBlue, line: index === 1 ? C.warm : C.softBlue });
    text(slide, card[0], { x: 7.4, y: 2.76 + index * 0.96, w: 2.35, h: 0.12, fontSize: 11.2, bold: true, color: C.navy });
    tag(slide, card[1], 10.06, 2.73 + index * 0.96, 0.9, { fill: index === 1 ? C.gold : C.navy, color: index === 1 ? C.navy : C.white, fontSize: 6.8 });
  });
  footer(slide);
  validateSlide(slide, pptx);
}

function slide11() {
  const slide = pptx.addSlide();
  bigStatement(slide, "Cambio de escala", "34-36 min", "¿Y si en vez de una app\nmiramos una IA que aprende jugando?", { fill: C.red, fontSize: 28 });
}

function slide12() {
  const slide = pptx.addSlide();
  header(slide, "Ataxx en 30 segundos", "36-39 min", "Un tablero simple, decisiones difíciles.");
  surface(slide, 1.12, 2.3, 4.7, 4.08, { fill: C.navy, line: C.navy });
  drawBoard(slide, 1.86, 2.78, 3.14);
  const rules = [
    ["clonar", "mover a distancia 1 y sumar pieza", C.red, C.paleRed],
    ["saltar", "mover a distancia 2 y dejar origen vacío", C.gold, C.warm],
    ["convertir", "las piezas rivales vecinas cambian de color", C.success, C.successSoft],
  ];
  rules.forEach((rule, index) => {
    surface(slide, 6.5, 2.46 + index * 1.04, 4.92, 0.74, { fill: rule[3], line: rule[3] });
    tag(slide, rule[0], 6.78, 2.66 + index * 1.04, 1.0, { fill: rule[2], color: rule[2] === C.gold ? C.navy : C.white });
    text(slide, rule[1], { x: 8.08, y: 2.72 + index * 1.04, w: 2.88, h: 0.12, fontSize: 9.6, bold: true, color: C.navy });
  });
  footer(slide);
  validateSlide(slide, pptx);
}

function slide13() {
  const slide = pptx.addSlide();
  header(slide, "Momento juego", "39-45 min", "Una persona juega. El resto observa decisiones.");
  surface(slide, 1.0, 2.48, 5.36, 3.2, { fill: C.navy, line: C.navy });
  text(slide, "¿Quién quiere jugar contra la IA?", { x: 1.48, y: 3.2, w: 4.4, h: 0.48, fontFace: TYPOGRAPHY.display, fontSize: 25, bold: true, color: C.white, align: "center" });
  text(slide, "No buscamos ganar rápido.\nBuscamos mirar cómo decide.", { x: 1.7, y: 4.28, w: 3.9, h: 0.34, fontSize: 12.2, color: C.terminalOutput, align: "center" });
  surface(slide, 7.1, 2.48, 4.6, 3.2, { fill: C.softBlue, line: C.softBlue });
  text(slide, "Observar", { x: 7.5, y: 2.92, w: 3.8, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: C.navy, align: "center" });
  text(slide, "qué movimiento eligió\nqué riesgo tomó\nqué dato nos deja", { x: 7.78, y: 3.62, w: 3.2, h: 0.68, fontSize: 14, color: C.ink, align: "center", valign: "mid" });
  footer(slide);
  validateSlide(slide, pptx);
}

function slide14() {
  const slide = pptx.addSlide();
  header(slide, "La pregunta real", "45-47 min", "Cuando una IA juega, no está adivinando al azar.");
  const parts = [
    ["estado", "qué está pasando ahora", C.softBlue, C.navy],
    ["opciones", "qué movimientos existen", C.warm, C.gold],
    ["valor", "qué posición promete más", C.successSoft, C.success],
    ["evidencia", "qué funcionó antes", C.paleRed, C.red],
  ];
  parts.forEach((p, index) => {
    const x = 1.0 + (index % 2) * 5.35;
    const y = 2.5 + Math.floor(index / 2) * 1.35;
    surface(slide, x, y, 4.74, 0.92, { fill: p[2], line: p[2] });
    tag(slide, p[0], x + 0.28, y + 0.28, 1.05, { fill: p[3], color: p[3] === C.gold ? C.navy : C.white });
    text(slide, p[1], { x: x + 1.62, y: y + 0.33, w: 2.5, h: 0.12, fontSize: 10.2, bold: true, color: C.navy });
  });
  surface(slide, 1.34, 5.68, 10.45, 0.42, { fill: C.navy, line: C.navy });
  text(slide, "La inteligencia aparece cuando esas piezas se combinan y se miden.", { x: 1.72, y: 5.82, w: 9.7, h: 0.1, fontSize: 9.2, bold: true, color: C.white, align: "center" });
  footer(slide);
  validateSlide(slide, pptx);
}

function slide15() {
  const slide = pptx.addSlide();
  header(slide, "Perceptrón: la idea mínima", "47-50 min", "Una neurona artificial no piensa: calcula señales y ajusta pesos.");
  addContain(slide, IMG.perceptron, 0.94, 2.2, 5.2, 4.05);
  surface(slide, 6.62, 2.54, 4.88, 2.82, { fill: C.navy, line: C.navy });
  text(slide, "entradas → pesos → suma → decisión", { x: 7.0, y: 3.0, w: 4.1, h: 0.42, fontFace: TYPOGRAPHY.display, fontSize: 20, bold: true, color: C.white, align: "center" });
  text(slide, "Aprender significa ajustar los pesos para equivocarse menos.", { x: 7.18, y: 4.18, w: 3.72, h: 0.32, fontSize: 12, color: C.terminalOutput, align: "center" });
  footer(slide);
  validateSlide(slide, pptx);
}

function slide16() {
  const slide = pptx.addSlide();
  header(slide, "La red mira el tablero", "50-52 min", "Ataxx Zero convierte una posición en dos respuestas.");
  addContain(slide, IMG.redNeuronal, 0.78, 2.16, 5.2, 4.18);
  const answers = [
    ["policy", "qué jugadas parecen prometedoras", C.red, C.paleRed],
    ["value", "qué tan buena parece la posición", C.success, C.successSoft],
  ];
  answers.forEach((a, index) => {
    surface(slide, 6.72, 2.7 + index * 1.54, 4.72, 0.96, { fill: a[3], line: a[3] });
    tag(slide, a[0], 7.0, 2.98 + index * 1.54, 0.86, { fill: a[2], color: a[2] === C.gold ? C.navy : C.white });
    text(slide, a[1], { x: 8.14, y: 3.02 + index * 1.54, w: 2.74, h: 0.14, fontSize: 10.8, bold: true, color: C.navy });
  });
  footer(slide);
  validateSlide(slide, pptx);
}

function slide17() {
  const slide = pptx.addSlide();
  header(slide, "MCTS: pensar con presupuesto", "52-54 min", "La IA no revisa todo el futuro: explora ramas prometedoras.");
  addContain(slide, IMG.mcts, 0.86, 2.12, 5.26, 4.16);
  surface(slide, 6.62, 2.46, 4.94, 2.72, { fill: C.softBlue, line: C.softBlue });
  text(slide, "valor + exploración", { x: 7.04, y: 3.02, w: 4.08, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 22, bold: true, color: C.navy, align: "center" });
  text(slide, "No elige solo la jugada que se ve mejor.\nInvierte simulaciones donde todavía puede descubrir algo.", { x: 7.12, y: 3.92, w: 3.9, h: 0.48, fontSize: 11.2, color: C.ink, align: "center", valign: "mid" });
  footer(slide);
  validateSlide(slide, pptx);
}

function slide18() {
  const slide = pptx.addSlide();
  header(slide, "Entrenar IA se parece a investigar", "54-56 min", "La parte difícil no es escribir una función mágica.");
  addContain(slide, IMG.desarrollo, 0.76, 2.08, 4.78, 4.2);
  const loop = [
    ["hipótesis", "creo que esto mejora"],
    ["experimento", "entreno una versión"],
    ["datos", "guardo partidas y métricas"],
    ["decisión", "comparar, corregir, repetir"],
  ];
  loop.forEach((item, index) => {
    const x = 6.12 + (index % 2) * 2.8;
    const y = 2.54 + Math.floor(index / 2) * 1.26;
    surface(slide, x, y, 2.2, 0.82, { fill: index === 1 ? C.warm : C.softBlue, line: index === 1 ? C.warm : C.softBlue });
    text(slide, item[0], { x: x + 0.24, y: y + 0.18, w: 1.72, h: 0.14, fontFace: TYPOGRAPHY.display, fontSize: 12.5, bold: true, color: C.navy, align: "center" });
    text(slide, item[1], { x: x + 0.24, y: y + 0.48, w: 1.72, h: 0.08, fontSize: 6.9, color: C.ink, align: "center" });
  });
  footer(slide);
  validateSlide(slide, pptx);
}

function slide19() {
  const slide = pptx.addSlide();
  header(slide, "Power BI también sirve para IA", "56-57 min", "No solo miramos ventas: también miramos aprendizaje.");
  surface(slide, 0.92, 2.24, 6.1, 3.96, { fill: C.white, line: C.border });
  text(slide, "ataxx_zero.pbip", { x: 1.28, y: 2.5, w: 2.5, h: 0.2, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 12, bold: true, color: C.red });
  const barsData = [
    ["v6 centinela", 0.81, C.red],
    ["v7 amnesia", 0.69, C.titleFill],
    ["v8 liga", 0.81, C.success],
  ];
  barsData.forEach((b, index) => {
    const y = 3.16 + index * 0.62;
    text(slide, b[0], { x: 1.32, y, w: 1.4, h: 0.1, fontSize: 7.8, bold: true, color: C.navy });
    slide.addShape(SH.rect, { x: 3.05, y: y + 0.02, w: 2.7, h: 0.12, fill: { color: "E5EAF1" }, line: { color: "E5EAF1" } });
    slide.addShape(SH.rect, { x: 3.05, y: y + 0.02, w: 2.7 * b[1], h: 0.12, fill: { color: b[2] }, line: { color: b[2] } });
    text(slide, b[1].toFixed(2), { x: 5.88, y: y - 0.01, w: 0.36, h: 0.08, fontSize: 6.8, bold: true, color: b[2], align: "right" });
  });
  surface(slide, 7.48, 2.5, 4.3, 0.86, { fill: C.softBlue, line: C.softBlue });
  text(slide, "¿mejoró realmente?", { x: 7.88, y: 2.78, w: 3.5, h: 0.16, fontFace: TYPOGRAPHY.display, fontSize: 15.5, bold: true, color: C.navy, align: "center" });
  surface(slide, 7.48, 3.74, 4.3, 0.86, { fill: C.warm, line: C.warm });
  text(slide, "¿contra quién funciona?", { x: 7.88, y: 4.02, w: 3.5, h: 0.16, fontFace: TYPOGRAPHY.display, fontSize: 15.5, bold: true, color: C.navy, align: "center" });
  surface(slide, 7.48, 4.98, 4.3, 0.86, { fill: C.successSoft, line: C.successSoft });
  text(slide, "¿qué experimento sigue?", { x: 7.88, y: 5.26, w: 3.5, h: 0.16, fontFace: TYPOGRAPHY.display, fontSize: 15.5, bold: true, color: C.navy, align: "center" });
  footer(slide);
  validateSlide(slide, pptx);
}

function slide20() {
  const slide = pptx.addSlide();
  header(slide, "La IA como método científico", "57-58 min", "Una versión no es verdad: es una hipótesis puesta a prueba.");
  const cycle = [
    ["formular", "hipótesis"],
    ["implementar", "cambio"],
    ["entrenar", "experimento"],
    ["medir", "evidencia"],
    ["decidir", "siguiente versión"],
  ];
  cycle.forEach((c, index) => {
    const x = 0.92 + index * 2.42;
    surface(slide, x, 3.0, 1.92, 1.28, { fill: index % 2 ? C.warm : C.softBlue, line: index % 2 ? C.warm : C.softBlue });
    text(slide, c[0], { x: x + 0.2, y: 3.3, w: 1.52, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 13.5, bold: true, color: C.navy, align: "center" });
    text(slide, c[1], { x: x + 0.2, y: 3.76, w: 1.52, h: 0.1, fontSize: 8.0, color: C.ink, align: "center" });
    if (index < cycle.length - 1) line(slide, x + 1.94, 3.64, x + 2.26, 3.64, { color: C.red, pt: 1.2 });
  });
  surface(slide, 1.3, 5.56, 10.7, 0.52, { fill: C.navy, line: C.navy });
  text(slide, "Programar con IA no elimina el criterio: lo vuelve más importante.", { x: 1.7, y: 5.72, w: 9.9, h: 0.12, fontSize: 10.2, bold: true, color: C.white, align: "center" });
  footer(slide);
  validateSlide(slide, pptx);
}

function slide21() {
  const slide = pptx.addSlide();
  header(slide, "Lo que vieron hoy", "58-59 min", "No fue una herramienta: fue un flujo completo.");
  const items = [
    ["imaginar", C.red, C.paleRed],
    ["construir", C.gold, C.warm],
    ["jugar", C.titleFill, C.softBlue],
    ["medir", C.success, C.successSoft],
    ["mejorar", C.navy, C.softNeutral],
  ];
  items.forEach((item, index) => {
    const x = 1.05 + index * 2.35;
    surface(slide, x, 3.02, 1.78, 1.28, { fill: item[2], line: item[2] });
    text(slide, item[0], { x: x + 0.18, y: 3.48, w: 1.42, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 14.3, bold: true, color: C.navy, align: "center" });
  });
  footer(slide);
  validateSlide(slide, pptx);
}

function slide22() {
  const slide = pptx.addSlide();
  header(slide, "Qué pueden probar hoy", "59 min", "Con un computador de laboratorio basta para empezar.");
  const tasks = [
    ["Stitch", "diseñar una pantalla"],
    ["Codex", "convertir idea en código"],
    ["Power BI", "leer datos"],
    ["Juego", "observar decisiones"],
  ];
  tasks.forEach((task, index) => {
    const x = 1.18 + (index % 2) * 5.3;
    const y = 2.62 + Math.floor(index / 2) * 1.34;
    surface(slide, x, y, 4.5, 0.84, { fill: index % 2 ? C.warm : C.softBlue, line: index % 2 ? C.warm : C.softBlue });
    text(slide, task[0], { x: x + 0.34, y: y + 0.22, w: 1.2, h: 0.16, fontFace: TYPOGRAPHY.display, fontSize: 13.8, bold: true, color: C.navy });
    text(slide, task[1], { x: x + 1.82, y: y + 0.25, w: 2.2, h: 0.12, fontSize: 9.4, bold: true, color: C.ink });
  });
  footer(slide);
  validateSlide(slide, pptx);
}

function slide23() {
  const slide = pptx.addSlide();
  bigStatement(slide, "Pregunta final", "59-60 min", "Si pudieras crear una app o una IA,\n¿qué problema te gustaría resolver?", { fill: C.navy, fontSize: 28 });
}

function slide24() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  bars(slide, 0.86, 0.78, 1.25);
  logo(slide, true);
  text(slide, "Gracias", { x: 0.92, y: 2.1, w: 4.4, h: 0.58, fontFace: TYPOGRAPHY.display, fontSize: 40, bold: true, color: C.white });
  text(slide, "imaginar · construir · medir · mejorar", { x: 0.98, y: 3.06, w: 5.6, h: 0.28, fontSize: 16, color: C.terminalOutput });
  surface(slide, 0.98, 5.32, 6.6, 0.58, { fill: C.red, line: C.red });
  text(slide, "La IA se vuelve poderosa cuando alguien sabe hacerle buenas preguntas y revisar sus respuestas.", { x: 1.34, y: 5.5, w: 5.88, h: 0.12, fontSize: 9.6, bold: true, color: C.white, align: "center" });
  addCrop(slide, IMG.code, 8.1, 1.62, 3.8, 4.58, { cx: 48, cy: 54 });
  validateSlide(slide, pptx);
}

[
  slide01,
  slide02,
  slide03,
  slide04,
  slide05,
  slide06,
  slide07,
  slide08,
  slide09,
  slide10,
  slide11,
  slide12,
  slide13,
  slide14,
  slide15,
  slide16,
  slide17,
  slide18,
  slide19,
  slide20,
  slide21,
  slide22,
  slide23,
  slide24,
].forEach((fn) => fn());

pptx.writeFile({ fileName: outputPptx });
