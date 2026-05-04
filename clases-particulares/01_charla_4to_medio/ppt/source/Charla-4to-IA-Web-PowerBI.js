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
  title: "IA, desarrollo web y Power BI: de una idea a un producto digital",
});

const SH = pptx.ShapeType;
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;
const rootDir = path.resolve(__dirname, "..");
const outputPptx = path.join(rootDir, "Charla-4to-IA-Web-PowerBI-parcial.pptx");
const logoPath = path.resolve(__dirname, "../../../../.agent/skills/slides-aiep/assets/logo-aiep.png");
const logoMarkPath = path.resolve(__dirname, "../../../../.agent/skills/slides-aiep/assets/logo-aiep-mark.png");
const imgDir = path.resolve(__dirname, "assets/images");
const img2026Dir = path.resolve(__dirname, "assets/images/curated-2026");
const captureDir = path.resolve(__dirname, "assets/captures");
const logoDir = path.resolve(__dirname, "assets/logos");

const IMG = {
  tattooHero: path.join(img2026Dir, "tattoo-neon-alley-youth.jpg"),
  tattooSign: path.join(img2026Dir, "tattoo-neon-piercing-sign.jpg"),
  tattooWide: path.join(img2026Dir, "tattoo-neon-dreams-interior.jpg"),
  tattooClose: path.join(img2026Dir, "tattoo-artist-neon-sketch.jpg"),
  tattooUrban: path.join(img2026Dir, "tattoo-neon-graffiti-wall.jpg"),
  codeDark: path.join(img2026Dir, "coding-neon-workstation.jpg"),
  codeNeon: path.join(img2026Dir, "laptop-neon-code-open.jpg"),
  youngCoders: path.join(img2026Dir, "young-coders-neon-cafe.jpg"),
  creativeTeam: path.join(img2026Dir, "young-creative-team-graffiti.jpg"),
  studioTeam: path.join(img2026Dir, "creative-studio-laptop-team.jpg"),
  codeHands: path.join(imgDir, "coding-laptop-hands.jpg"),
  studentCode: path.join(img2026Dir, "young-coders-neon-cafe.jpg"),
  dashboard: path.join(imgDir, "analytics-dashboard-screen.jpg"),
  diegoGithub: path.join(captureDir, "diego-github.png"),
  diegoPortfolio: path.join(captureDir, "diego-portfolio.png"),
  aiBrain: path.join(img2026Dir, "ai-neural-brain-deepmind.jpg"),
  neuronCortical: path.join(img2026Dir, "neuron-hippocampal-40x.jpg"),
  aiNetworkAbstract: path.join(img2026Dir, "ai-neural-network-abstract.jpg"),
  aiPerceptron: path.join(img2026Dir, "ai-perceptron-3d.jpg"),
  aiDataFlow: path.join(img2026Dir, "ai-data-flow-algorithms.jpg"),
  aiTransformer: path.join(img2026Dir, "ai-llm-prediction-3d.jpg"),
  aiLanguageModels: path.join(img2026Dir, "ai-language-models.jpg"),
  retailHero: path.join(img2026Dir, "retail-supermarket-aerial.jpg"),
  retailDrinks: path.join(img2026Dir, "retail-aisle-drinks.jpg"),
  retailWide: path.join(img2026Dir, "retail-aisle-wide.jpg"),
  retailReceipt: path.join(img2026Dir, "retail-receipt-hands.jpg"),
  retailCart: path.join(img2026Dir, "retail-cart-cash.jpg"),
  retailLaptop: path.join(img2026Dir, "retail-receipts-laptop.jpg"),
  dataDashboard: path.join(img2026Dir, "data-dashboard-monitor.jpg"),
  dataPie: path.join(img2026Dir, "data-pie-chart.jpg"),
};

const LOGOS = {
  google: path.join(logoDir, "google.svg"),
  openai: path.join(logoDir, "openai.svg"),
  powerbi: path.join(logoDir, "powerbi.svg"),
};

function addImageCrop(slide, imagePath, x, y, w, h, opts = {}) {
  slide.addImage({
    path: imagePath,
    ...imageSizingCrop(imagePath, x, y, w, h, opts.cx, opts.cy, opts.cw, opts.ch),
  });
}

function addImageContain(slide, imagePath, x, y, w, h) {
  slide.addImage({
    path: imagePath,
    ...imageSizingContain(imagePath, x, y, w, h),
  });
}

function addLogo(slide, variant = "full") {
  if (variant === "mark") {
    slide.addImage({ path: logoMarkPath, x: 11.9, y: 0.34, w: 0.56, h: 0.32 });
    return;
  }
  if (variant === "dark") {
    slide.addShape(SH.rect, { x: 10.72, y: 0.46, w: 0.14, h: 0.26, fill: { color: C.red }, line: { color: C.red } });
    slide.addShape(SH.rect, { x: 10.9, y: 0.34, w: 0.14, h: 0.38, fill: { color: C.red }, line: { color: C.red } });
    slide.addShape(SH.rect, { x: 11.08, y: 0.46, w: 0.14, h: 0.26, fill: { color: C.red }, line: { color: C.red } });
    slide.addText("AIEP", {
      x: 11.34,
      y: 0.35,
      w: 0.96,
      h: 0.24,
      fontFace: TYPOGRAPHY.display,
      fontSize: 16,
      bold: true,
      color: C.white,
      margin: 0,
      fit: "shrink",
    });
    slide.addText("Educación superior técnico-profesional", {
      x: 11.35,
      y: 0.63,
      w: 1.05,
      h: 0.08,
      fontFace: TYPOGRAPHY.body,
      fontSize: 3.8,
      color: C.softBlue,
      margin: 0,
      fit: "shrink",
    });
    return;
  }
  slide.addImage({ path: logoPath, x: 10.72, y: 0.34, w: 1.68, h: 0.58 });
}

function addSlideNumber(slide, opts = {}) {
  const n = String(pptx._slides.length).padStart(2, "0");
  const x = opts.x ?? 12.18;
  const y = opts.y ?? 7.08;
  const fill = opts.fill ?? C.navy;
  const textColor = opts.textColor ?? C.white;
  slide.addShape(SH.roundRect, {
    x,
    y,
    w: 0.42,
    h: 0.24,
    rectRadius: 0.05,
    fill: { color: fill, transparency: opts.transparency ?? 0 },
    line: { color: fill, transparency: 100 },
  });
  slide.addText(n, {
    x,
    y: y + 0.065,
    w: 0.42,
    h: 0.08,
    fontFace: TYPOGRAPHY.body,
    fontSize: 6.8,
    bold: true,
    color: textColor,
    align: "center",
    margin: 0,
  });
}

function addBars(slide, x, y, scale = 1, fill = C.red) {
  slide.addShape(SH.rect, { x, y: y + 0.16 * scale, w: 0.12 * scale, h: 0.42 * scale, fill: { color: fill }, line: { color: fill } });
  slide.addShape(SH.rect, { x: x + 0.18 * scale, y, w: 0.16 * scale, h: 0.58 * scale, fill: { color: fill }, line: { color: fill } });
  slide.addShape(SH.rect, { x: x + 0.4 * scale, y: y + 0.16 * scale, w: 0.12 * scale, h: 0.42 * scale, fill: { color: fill }, line: { color: fill } });
}

function addHeader(slide, eyebrow, title, subtitle = "") {
  addBars(slide, 0.72, 0.45, 1.05);
  slide.addText(eyebrow.toUpperCase(), {
    x: 1.42,
    y: 0.43,
    w: 7.8,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8,
    bold: true,
    color: C.red,
    margin: 0,
    charSpace: 1.1,
  });
  slide.addText(title, {
    x: 1.42,
    y: 0.72,
    w: 8.6,
    h: 0.48,
    fontFace: TYPOGRAPHY.display,
    fontSize: 23,
    bold: true,
    color: C.navy,
    margin: 0,
    fit: "shrink",
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 1.42,
      y: 1.22,
      w: 8.8,
      h: 0.32,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.5,
      color: C.slate,
      margin: 0,
      fit: "shrink",
    });
  }
  addLogo(slide, "mark");
}

function addFooter(slide, indexLabel = "Charla 4to medio · IA + Web + Power BI") {
  slide.addShape(SH.line, { x: 0.72, y: 7.06, w: 11.88, h: 0, line: { color: C.border, pt: 0.7 } });
  slide.addText(indexLabel, {
    x: 0.72,
    y: 7.14,
    w: 6.6,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: 7.8,
    color: C.slate,
    margin: 0,
  });
  addSlideNumber(slide);
}

function addPanel(slide, { x, y, w, h, fill = C.white, line = C.border, radius = 0.12, shadow = false }) {
  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: radius,
    fill: { color: fill },
    line: { color: line, pt: 1 },
    shadow: shadow ? { type: "outer", color: C.shadow, opacity: 0.18, blur: 2, angle: 45, distance: 1 } : undefined,
  });
}

function addCard(slide, opts) {
  addPanel(slide, { x: opts.x, y: opts.y, w: opts.w, h: opts.h, fill: opts.fill || C.white, line: opts.line || C.border, shadow: opts.shadow ?? true });
  if (opts.accent) {
    slide.addShape(SH.rect, {
      x: opts.x + 0.14,
      y: opts.y + 0.18,
      w: 0.09,
      h: opts.h - 0.36,
      fill: { color: opts.accent },
      line: { color: opts.accent },
    });
  }
  const padX = opts.padX || 0.34;
  slide.addText(opts.kicker || "", {
    x: opts.x + padX,
    y: opts.y + 0.24,
    w: opts.w - padX - 0.26,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8,
    bold: true,
    color: opts.kickerColor || C.red,
    margin: 0,
    charSpace: 0.6,
    fit: "shrink",
  });
  slide.addText(opts.title, {
    x: opts.x + padX,
    y: opts.y + 0.5,
    w: opts.w - padX - 0.26,
    h: opts.titleH || 0.36,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.titleSize || 16,
    bold: true,
    color: opts.titleColor || C.navy,
    margin: 0,
    fit: "shrink",
  });
  if (opts.body) {
    slide.addText(opts.body, {
      x: opts.x + (opts.bodyPadX || padX),
      y: opts.bodyY || opts.y + 0.96,
      w: opts.w - (opts.bodyPadX || padX) - 0.34,
      h: opts.bodyH || opts.h - 1.16,
      fontFace: TYPOGRAPHY.body,
      fontSize: opts.bodySize || 10.2,
      color: opts.bodyColor || C.ink,
      valign: "top",
      breakLine: false,
      margin: 0,
      fit: "shrink",
    });
  }
}

function addPill(slide, text, x, y, w, fill = C.softBlue, color = C.navy) {
  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h: 0.34,
    rectRadius: 0.08,
    fill: { color: fill },
    line: { color: fill },
  });
  slide.addText(text, {
    x: x + 0.1,
    y: y + 0.08,
    w: w - 0.2,
    h: 0.11,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.4,
    bold: true,
    color,
    align: "center",
    margin: 0,
    fit: "shrink",
  });
}

function addBigNumber(slide, n, x, y, color = C.red) {
  slide.addShape(SH.ellipse, { x, y, w: 0.45, h: 0.45, fill: { color }, line: { color } });
  slide.addText(String(n).padStart(2, "0"), {
    x,
    y: y + 0.12,
    w: 0.45,
    h: 0.1,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.5,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
}

function addArrow(slide, x1, y1, x2, y2, color = C.red) {
  slide.addShape(SH.line, {
    x: x1,
    y: y1,
    w: x2 - x1,
    h: y2 - y1,
    line: { color, pt: 1.5, beginArrowType: "none", endArrowType: "triangle" },
  });
}

function addDarkBand(slide, title, body) {
  slide.addShape(SH.rect, { x: 0, y: 5.72, w: SLIDE_W, h: 1.78, fill: { color: C.navy, transparency: 4 }, line: { color: C.navy, transparency: 100 } });
  addBars(slide, 0.76, 6.13, 1.25, C.red);
  slide.addText(title, {
    x: 1.5,
    y: 6.02,
    w: 5.6,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText(body, {
    x: 1.5,
    y: 6.43,
    w: 9.4,
    h: 0.32,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    color: C.softBlue,
    margin: 0,
    fit: "shrink",
  });
}

function validate(slide) {
  validateSlide(slide, pptx);
}

// 01
{
  const slide = pptx.addSlide();
  addImageCrop(slide, IMG.retailHero, 0, 0, SLIDE_W, SLIDE_H, { cy: 0, ch: 1 });
  slide.addShape(SH.rect, { x: 0, y: 0, w: SLIDE_W, h: SLIDE_H, fill: { color: "071522", transparency: 26 }, line: { transparency: 100 } });
  slide.addShape(SH.rect, { x: 0, y: 0, w: 6.15, h: 5.72, fill: { color: C.navy, transparency: 3 }, line: { transparency: 100 } });
  addLogo(slide, "dark");
  addBars(slide, 0.78, 0.86, 1.25);
  slide.addText("CHARLA 4TO MEDIO", { x: 1.52, y: 0.84, w: 3.5, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.5, bold: true, color: C.red, margin: 0, charSpace: 1.3 });
  slide.addText("De una idea\na un producto digital", {
    x: 0.76,
    y: 1.5,
    w: 5.18,
    h: 1.42,
    fontFace: TYPOGRAPHY.display,
    fontSize: 30,
    bold: true,
    color: C.white,
    breakLine: false,
    margin: 0,
    fit: "shrink",
  });
  slide.addText("IA + desarrollo web + Power BI", { x: 0.82, y: 3.14, w: 4.2, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 15, color: C.softBlue, margin: 0 });
  addPill(slide, "Miércoles 13 de mayo · AIEP", 0.82, 4.02, 2.75, C.paleRed, C.red);
  addDarkBand(slide, "Hoy no vamos a mirar tecnología desde lejos", "Vamos a convertir una idea de negocio en diseño, web, datos y dashboard.");
  addSlideNumber(slide, { fill: C.red, x: 12.12, y: 7.06 });
  validate(slide);
}

// 02
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Quién les habla", "Diego Obando", "Una historia corta: estudiar, construir, volver a enseñar.");
  addImageCrop(slide, IMG.diegoPortfolio, 0.78, 1.68, 6.06, 3.02, { cy: 0, ch: 0.64 });
  addImageCrop(slide, IMG.diegoGithub, 7.22, 1.68, 4.9, 3.02, { cy: 0.02, ch: 0.58 });
  const milestones = [
    ["2018", "Empiezo en desarrollo", "Software, backend, APIs y sistemas reales."],
    ["AIEP", "Estudio programación", "Me formo en la misma institución que hoy represento."],
    ["Industria", "Trabajo con software e IA", "Go, Java, TypeScript, agentes, cloud y automatización."],
    ["Docencia", "Vuelvo como profesor", "Enseño donde estudié: web, testing, metodologías e IA aplicada."],
  ];
  milestones.forEach((item, i) => {
    const x = 0.88 + i * 3.05;
    addPanel(slide, { x, y: 4.98, w: 2.72, h: 1.08, fill: i % 2 === 0 ? C.white : C.softBlue, line: C.border, shadow: true });
    slide.addText(item[0], { x: x + 0.2, y: 5.17, w: 0.62, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.6, bold: true, color: i === 1 ? C.navy : C.red, margin: 0, charSpace: 0.8 });
    slide.addText(item[1], { x: x + 0.2, y: 5.42, w: 2.28, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 12.2, bold: true, color: C.navy, margin: 0, fit: "shrink" });
    slide.addText(item[2], { x: x + 0.2, y: 5.72, w: 2.24, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 7.6, color: C.slate, margin: 0, fit: "shrink" });
    if (i < milestones.length - 1) addArrow(slide, x + 2.76, 5.54, x + 2.98, 5.54, C.red);
  });
  addPanel(slide, { x: 7.22, y: 4.18, w: 4.9, h: 0.56, fill: C.navy, line: C.navy, shadow: true });
  slide.addText("299 seguidores en GitHub · actividad pública · proyectos reales", {
    x: 7.48,
    y: 4.38,
    w: 4.38,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
    fit: "shrink",
  });
  slide.addText("No es teoría lejana: es una forma concreta de convertir una idea en producto.", {
    x: 1.04,
    y: 6.48,
    w: 11.1,
    h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.6,
    bold: true,
    color: C.navy,
    margin: 0,
    fit: "shrink",
  });
  addFooter(slide);
  validate(slide);
}

// 03
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Promesa de la charla", "Una hora, una idea, varias herramientas", "El foco no es memorizar conceptos: es ver una transformación completa.");
  addImageCrop(slide, IMG.creativeTeam, 0.78, 1.86, 4.25, 4.62, { cy: 0.02, ch: 0.86 });
  addCard(slide, { x: 5.35, y: 1.86, w: 3.24, h: 1.34, kicker: "PUNTO DE PARTIDA", title: "Idea", body: "Comparar precios reales de los super de Osorno.", accent: C.red, padX: 0.46, bodyPadX: 0.46, bodySize: 9.5, bodyY: 2.78, bodyH: 0.28 });
  addCard(slide, { x: 8.9, y: 1.86, w: 3.24, h: 1.34, kicker: "PRIMER SALTO", title: "Diseño", body: "Stitch convierte una descripción en interfaz.", accent: C.navy, padX: 0.46, bodyPadX: 0.46, bodySize: 9.5, bodyY: 2.78, bodyH: 0.28 });
  addCard(slide, { x: 5.35, y: 3.56, w: 3.24, h: 1.34, kicker: "SEGUNDO SALTO", title: "Web", body: "Codex crea la app, el catálogo y la lista de compras.", accent: C.navy, padX: 0.46, bodyPadX: 0.46, bodySize: 9.5, bodyY: 4.48, bodyH: 0.28 });
  addCard(slide, { x: 8.9, y: 3.56, w: 3.24, h: 1.34, kicker: "TERCER SALTO", title: "Datos", body: "Power BI transforma 34 mil precios en decisiones.", accent: C.red, padX: 0.46, bodyPadX: 0.46, bodySize: 9.5, bodyY: 4.48, bodyH: 0.28 });
  slide.addText("La magia está en conectar las piezas.", { x: 5.38, y: 5.54, w: 6.4, h: 0.42, fontFace: TYPOGRAPHY.display, fontSize: 21, bold: true, color: C.navy, margin: 0 });
  addFooter(slide);
  validate(slide);
}

// 03
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addHeader(slide, "Mapa de ruta", "Lo que vamos a construir", "Cada etapa tiene una explicación breve y después una demostración en vivo.");
  const steps = [
    ["Idea", "La Cuenta · Osorno"],
    ["Diseño IA", "Stitch"],
    ["Landing", "Next.js + Tailwind"],
    ["Catálogo", "34 mil productos"],
    ["Datos", "Scraping real"],
    ["Dashboard", "Power BI"],
  ];
  const x0 = 0.88;
  const y = 2.42;
  const gap = 0.16;
  const w = 1.84;
  steps.forEach((step, i) => {
    const x = x0 + i * (w + gap);
    addPanel(slide, { x, y, w, h: 1.4, fill: i % 2 === 0 ? C.softBlue : C.warm, line: C.border, shadow: true });
    addBigNumber(slide, i + 1, x + 0.18, y + 0.18, i === 0 || i === 5 ? C.red : C.navy);
    slide.addText(step[0], { x: x + 0.18, y: y + 0.72, w: w - 0.36, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 14.5, bold: true, color: C.navy, margin: 0, align: "center" });
    slide.addText(step[1], { x: x + 0.18, y: y + 1.08, w: w - 0.36, h: 0.14, fontFace: TYPOGRAPHY.body, fontSize: 8.3, color: C.slate, margin: 0, align: "center", fit: "shrink" });
    if (i < steps.length - 1) addArrow(slide, x + w + 0.02, y + 0.7, x + w + gap - 0.04, y + 0.7, C.red);
  });
  addCard(slide, {
    x: 1.02,
    y: 4.75,
    w: 11.25,
    h: 1.34,
    kicker: "FORMATO DE LA CHARLA",
    title: "Explico una etapa, la hago en vivo y seguimos con la siguiente.",
    titleSize: 20,
    body: "El PPT será el mapa. La demostración será el recorrido real.",
    bodyY: 5.66,
    bodyH: 0.2,
    accent: C.red,
  });
  addFooter(slide);
  validate(slide);
}

// 04A - Mini-intro IA: portada
{
  const slide = pptx.addSlide();
  addImageCrop(slide, IMG.aiBrain, 0, 0, SLIDE_W, SLIDE_H, { cy: 0, ch: 1 });
  slide.addShape(SH.rect, { x: 0, y: 0, w: SLIDE_W, h: SLIDE_H, fill: { color: "060f1c", transparency: 24 }, line: { transparency: 100 } });
  addLogo(slide, "dark");
  addBars(slide, 0.78, 0.86, 1.25);
  slide.addText("ANTES DE EMPEZAR", { x: 1.52, y: 0.84, w: 4.5, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.5, bold: true, color: C.red, margin: 0, charSpace: 1.3 });
  slide.addText("¿Qué hay debajo\nde la IA que vamos a usar?", {
    x: 0.78,
    y: 1.5,
    w: 6.0,
    h: 1.7,
    fontFace: TYPOGRAPHY.display,
    fontSize: 28,
    bold: true,
    color: C.white,
    breakLine: false,
    margin: 0,
    fit: "shrink",
  });
  slide.addText("5 minutos para entender la idea que está debajo de Stitch, Codex y Power BI Copilot.", {
    x: 0.82,
    y: 3.36,
    w: 5.7,
    h: 0.6,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.4,
    color: C.softBlue,
    margin: 0,
    fit: "shrink",
  });
  const introSteps = [
    ["01", "Neurona biológica"],
    ["02", "Neurona artificial"],
    ["03", "Perceptrón"],
    ["04", "Redes profundas"],
    ["05", "Transformers + LLMs"],
  ];
  introSteps.forEach((s, i) => {
    const y = 4.32 + i * 0.46;
    slide.addText(s[0], { x: 0.92, y, w: 0.4, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.6, bold: true, color: C.red, margin: 0 });
    slide.addText(s[1], { x: 1.4, y: y - 0.04, w: 5.0, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 14.6, bold: true, color: C.white, margin: 0, fit: "shrink" });
  });
  addPanel(slide, { x: 7.66, y: 5.78, w: 4.96, h: 1.0, fill: "10243A", line: "1D3852", shadow: true });
  slide.addText("Sin esta base, la IA parece magia. Con esta base, se lee como un sistema técnico.", {
    x: 7.86,
    y: 6.04,
    w: 4.6,
    h: 0.5,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.6,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  addSlideNumber(slide, { fill: C.red, x: 12.12, y: 7.06 });
  validate(slide);
}

// 04B - Neurona biológica
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Punto de partida", "La neurona biológica", "El cerebro es una red de células que reciben señales, las combinan y activan a otras.");
  addImageCrop(slide, IMG.neuronCortical, 0.78, 1.84, 5.42, 4.78, { cy: 0.04, ch: 0.86 });
  addPanel(slide, { x: 0.78, y: 6.32, w: 5.42, h: 0.36, fill: C.navy, line: C.navy });
  slide.addText("Microscopía: neurona piramidal del hipocampo (tinción de Golgi)", {
    x: 0.94,
    y: 6.4,
    w: 5.1,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.4,
    bold: true,
    color: C.white,
    margin: 0,
    charSpace: 0.6,
    fit: "shrink",
  });
  const neuronParts = [
    { kicker: "ENTRADA", title: "Dendritas", body: "Reciben señales que llegan desde otras neuronas conectadas.", accent: C.red, fill: C.softBlue },
    { kicker: "INTEGRACIÓN", title: "Soma", body: "Combina todas las señales que llegaron y decide si la activación supera un umbral.", accent: C.navy, fill: C.warm },
    { kicker: "SALIDA", title: "Axón + sinapsis", body: "Si la neurona se activa, transmite la señal hacia otras neuronas conectadas.", accent: C.red, fill: C.paleRed },
  ];
  neuronParts.forEach((p, i) => {
    addCard(slide, {
      x: 6.5,
      y: 1.86 + i * 1.6,
      w: 5.66,
      h: 1.46,
      kicker: p.kicker,
      title: p.title,
      body: p.body,
      accent: p.accent,
      fill: p.fill,
      titleSize: 18,
      titleH: 0.32,
      bodyY: 1.86 + i * 1.6 + 0.92,
      bodyH: 0.42,
      bodySize: 10.2,
      padX: 0.5,
      bodyPadX: 0.5,
    });
  });
  addPanel(slide, { x: 6.5, y: 6.62, w: 5.66, h: 0.42, fill: C.navy, line: C.navy });
  slide.addText("Recibe → integra → decide → transmite.", {
    x: 6.66,
    y: 6.72,
    w: 5.34,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.4,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
    fit: "shrink",
  });
  addFooter(slide);
  validate(slide);
}

// 04C - De neurona biológica a neurona artificial
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "El salto", "De biología a matemática", "Cada parte de la neurona se traduce a un número o una operación.");
  addImageCrop(slide, IMG.neuronCortical, 0.78, 1.86, 5.46, 2.94, { cy: 0.06, ch: 0.7 });
  addPanel(slide, { x: 0.78, y: 4.5, w: 5.46, h: 0.34, fill: C.navy, line: C.navy });
  slide.addText("BIOLOGÍA · neurona piramidal", { x: 0.94, y: 4.58, w: 5.16, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.4, bold: true, color: C.white, charSpace: 1.2, margin: 0, fit: "shrink" });
  addImageCrop(slide, IMG.aiNetworkAbstract, 6.46, 1.86, 5.7, 2.94, { cy: 0.04, ch: 0.86 });
  addPanel(slide, { x: 6.46, y: 4.5, w: 5.7, h: 0.34, fill: C.red, line: C.red });
  slide.addText("MATEMÁTICA · neurona artificial", { x: 6.62, y: 4.58, w: 5.4, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.4, bold: true, color: C.white, charSpace: 1.2, margin: 0, fit: "shrink" });
  const mapping = [
    ["Dendritas", "Entradas (x₁, x₂, x₃ …)", "los datos que recibe el modelo"],
    ["Sinapsis", "Pesos (w₁, w₂, w₃ …)", "qué tan importante es cada entrada"],
    ["Soma", "Suma + sesgo (z = Σwᵢxᵢ + b)", "combinar señales en un solo valor"],
    ["Axón", "Salida (ŷ)", "el resultado que produce la neurona"],
  ];
  const mapY = 5.06;
  const mapH = 0.42;
  addPanel(slide, { x: 0.78, y: mapY, w: 11.38, h: 0.4, fill: C.navy, line: C.navy });
  slide.addText("BIOLÓGICA", { x: 0.94, y: mapY + 0.1, w: 2.6, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 8.4, bold: true, color: C.white, margin: 0, charSpace: 1.1 });
  slide.addText("ARTIFICIAL", { x: 4.0, y: mapY + 0.1, w: 4.0, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 8.4, bold: true, color: C.softBlue, margin: 0, charSpace: 1.1 });
  slide.addText("EN PALABRAS SIMPLES", { x: 8.4, y: mapY + 0.1, w: 3.6, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 8.4, bold: true, color: C.softBlue, margin: 0, charSpace: 1.1 });
  mapping.forEach((row, i) => {
    const y = mapY + 0.46 + i * mapH;
    addPanel(slide, { x: 0.78, y, w: 11.38, h: mapH - 0.04, fill: i % 2 === 0 ? C.white : C.softBlue, line: C.border });
    slide.addText(row[0], { x: 0.94, y: y + 0.1, w: 2.8, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 12.6, bold: true, color: C.navy, margin: 0, fit: "shrink" });
    slide.addText(row[1], { x: 4.0, y: y + 0.1, w: 4.2, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 12.6, bold: true, color: C.red, margin: 0, fit: "shrink" });
    slide.addText(row[2], { x: 8.4, y: y + 0.1, w: 3.65, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10.2, color: C.ink, margin: 0, fit: "shrink" });
  });
  addFooter(slide);
  validate(slide);
}

// 04D - Perceptrón
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Primera pieza", "El perceptrón: una neurona que decide", "Recibe entradas, las pondera, suma con sesgo y produce una salida según un umbral.");
  addImageCrop(slide, IMG.aiPerceptron, 7.0, 1.86, 5.16, 4.78, { cy: 0.06, ch: 0.84 });
  addPanel(slide, { x: 7.0, y: 6.32, w: 5.16, h: 0.36, fill: C.navy, line: C.navy });
  slide.addText("Estructura mínima de decisión binaria", { x: 7.16, y: 6.4, w: 4.84, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.4, bold: true, color: C.white, charSpace: 0.6, margin: 0, fit: "shrink" });
  addPanel(slide, { x: 0.78, y: 1.86, w: 5.96, h: 2.04, fill: C.navy, line: C.navy, shadow: true });
  slide.addText("FÓRMULA · suma ponderada", { x: 1.04, y: 2.0, w: 4.4, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.4, bold: true, color: C.red, charSpace: 1.2, margin: 0 });
  slide.addText("z = Σᵢ wᵢ·xᵢ + b", {
    x: 1.04,
    y: 2.28,
    w: 5.5,
    h: 0.66,
    fontFace: TYPOGRAPHY.display,
    fontSize: 28,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  slide.addText("Σ = sumar todas las parejas (peso × entrada). Después se agrega el sesgo b.", {
    x: 1.04,
    y: 3.04,
    w: 5.5,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.6,
    color: C.softBlue,
    margin: 0,
    fit: "shrink",
  });
  slide.addText("Si z supera un umbral, la neurona se activa: salida = 1.", {
    x: 1.04,
    y: 3.46,
    w: 5.5,
    h: 0.3,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.6,
    italic: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  const perceptronCards = [
    { kicker: "ENTRADAS", title: "x₁, x₂, …", body: "Datos que llegan: precio, edad, hora, palabras, pixeles." },
    { kicker: "PESOS", title: "w₁, w₂, …", body: "Importancia de cada entrada. Se ajustan durante el entrenamiento." },
    { kicker: "SESGO", title: "b", body: "Empuja la decisión cuando la suma queda en el límite." },
    { kicker: "SALIDA", title: "ŷ", body: "Decisión final: aprobado / rechazado, gato / perro, spam / no spam." },
  ];
  perceptronCards.forEach((c, i) => {
    const x = 0.78 + (i % 2) * 3.06;
    const y = 4.04 + Math.floor(i / 2) * 1.34;
    addCard(slide, {
      x,
      y,
      w: 2.92,
      h: 1.22,
      kicker: c.kicker,
      title: c.title,
      body: c.body,
      accent: i % 2 === 0 ? C.red : C.navy,
      fill: i % 2 === 0 ? C.white : C.softBlue,
      titleSize: 16,
      titleH: 0.3,
      bodyY: y + 0.84,
      bodyH: 0.32,
      bodySize: 8.6,
      padX: 0.34,
      bodyPadX: 0.34,
    });
  });
  addFooter(slide);
  validate(slide);
}

// 04D2 - Función de costo / cómo aprende un modelo
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Lo que cierra el ciclo", "¿Cómo aprende un modelo?", "Predice, mide cuánto se equivocó y ajusta los pesos. Eso es entrenamiento.");
  addPanel(slide, { x: 0.78, y: 1.88, w: 11.42, h: 2.42, fill: C.navy, line: C.navy, shadow: true });
  slide.addShape(SH.rect, { x: 0.94, y: 2.06, w: 0.1, h: 2.06, fill: { color: C.red }, line: { color: C.red } });
  slide.addText("FUNCIÓN DE PÉRDIDA", { x: 1.18, y: 2.06, w: 4.2, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 9, bold: true, color: C.red, charSpace: 1.2, margin: 0 });
  slide.addText("L = (y − ŷ)²", {
    x: 1.18,
    y: 2.36,
    w: 6.0,
    h: 1.04,
    fontFace: TYPOGRAPHY.display,
    fontSize: 50,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  slide.addText("La pérdida mide cuánto se equivocó el modelo en una predicción.", {
    x: 1.18,
    y: 3.5,
    w: 6.0,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.6,
    color: C.softBlue,
    margin: 0,
    fit: "shrink",
  });
  slide.addText("Lo elevamos al cuadrado para que errores positivos y negativos no se cancelen.", {
    x: 1.18,
    y: 3.84,
    w: 6.0,
    h: 0.32,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.6,
    italic: true,
    color: C.softBlue,
    margin: 0,
    fit: "shrink",
  });
  const symChips = [
    ["L", "pérdida", C.red],
    ["y", "valor real", C.white],
    ["ŷ", "predicción", C.white],
  ];
  symChips.forEach((chip, i) => {
    const x = 7.66 + i * 1.5;
    addPanel(slide, { x, y: 2.36, w: 1.36, h: 1.7, fill: "10243A", line: "1D3852" });
    slide.addText(chip[0], { x, y: 2.6, w: 1.36, h: 0.6, fontFace: TYPOGRAPHY.display, fontSize: 30, bold: true, color: chip[2], align: "center", margin: 0, fit: "shrink" });
    slide.addText(chip[1], { x: x + 0.1, y: 3.46, w: 1.16, h: 0.36, fontFace: TYPOGRAPHY.body, fontSize: 9.4, color: C.softBlue, align: "center", margin: 0, fit: "shrink" });
  });
  const trainingSteps = [
    { kicker: "01 · PREDICE", title: "El modelo da una salida ŷ", body: "Con los pesos actuales calcula z y produce una predicción." },
    { kicker: "02 · MIDE", title: "Compara contra el valor real y", body: "La pérdida L convierte ese error en un solo número." },
    { kicker: "03 · AJUSTA", title: "Cambia los pesos", body: "Mueve cada wᵢ en la dirección que reduce L. Y vuelve a empezar." },
  ];
  trainingSteps.forEach((s, i) => {
    const x = 0.78 + i * 3.83;
    addCard(slide, {
      x,
      y: 4.5,
      w: 3.66,
      h: 1.84,
      kicker: s.kicker,
      title: s.title,
      body: s.body,
      accent: i === 1 ? C.red : C.navy,
      fill: i % 2 === 0 ? C.white : C.softBlue,
      titleSize: 14.4,
      titleH: 0.4,
      bodyY: 5.5,
      bodyH: 0.78,
      bodySize: 10,
      padX: 0.34,
      bodyPadX: 0.34,
    });
  });
  addFooter(slide);
  validate(slide);
}

// 04E - Por qué redes profundas
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "El siguiente paso", "Una neurona no basta", "Los problemas reales necesitan combinar muchas neuronas en capas. Eso es deep learning.");
  addImageCrop(slide, IMG.aiDataFlow, 6.74, 1.86, 5.42, 4.78, { cy: 0.04, ch: 0.86 });
  addPanel(slide, { x: 6.74, y: 6.32, w: 5.42, h: 0.36, fill: C.red, line: C.red });
  slide.addText("Datos atravesando múltiples capas: deep learning", { x: 6.9, y: 6.4, w: 5.1, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.4, bold: true, color: C.white, charSpace: 0.6, margin: 0, fit: "shrink" });
  const limitText = "Una sola neurona dibuja una línea recta entre dos opciones. Pero el mundo casi nunca se separa con una línea.";
  addPanel(slide, { x: 0.78, y: 1.86, w: 5.78, h: 1.0, fill: C.navy, line: C.navy, shadow: true });
  slide.addText("EL LÍMITE", { x: 1.04, y: 2.0, w: 3.0, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.4, bold: true, color: C.red, charSpace: 1.2, margin: 0 });
  slide.addText(limitText, {
    x: 1.04,
    y: 2.26,
    w: 5.32,
    h: 0.5,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.2,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  const layers = [
    { kicker: "CAPA DE ENTRADA", title: "Datos crudos", body: "Texto, imagen, sonido, números: la materia prima del modelo." },
    { kicker: "CAPAS OCULTAS", title: "Patrones", body: "Cada capa transforma señales: detecta bordes, formas, palabras, ideas." },
    { kicker: "CAPA DE SALIDA", title: "Decisión", body: "Probabilidad, clasificación, predicción o palabra siguiente." },
  ];
  layers.forEach((l, i) => {
    const y = 3.06 + i * 1.18;
    addCard(slide, {
      x: 0.78,
      y,
      w: 5.78,
      h: 1.08,
      kicker: l.kicker,
      title: l.title,
      body: l.body,
      accent: i === 1 ? C.red : C.navy,
      fill: i % 2 === 0 ? C.softBlue : C.white,
      titleSize: 15.4,
      titleH: 0.26,
      bodyY: y + 0.82,
      bodyH: 0.22,
      bodySize: 9.0,
      padX: 0.4,
      bodyPadX: 0.4,
    });
  });
  addFooter(slide);
  validate(slide);
}

// 04F - Transformers
{
  const slide = pptx.addSlide();
  addImageCrop(slide, IMG.aiTransformer, 0, 0, SLIDE_W, SLIDE_H, { cy: 0, ch: 1 });
  slide.addShape(SH.rect, { x: 0, y: 0, w: SLIDE_W, h: SLIDE_H, fill: { color: "060f1c", transparency: 22 }, line: { transparency: 100 } });
  addLogo(slide, "dark");
  addBars(slide, 0.78, 0.86, 1.25);
  slide.addText("EL GRAN SALTO · 2017", { x: 1.52, y: 0.84, w: 4.5, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.5, bold: true, color: C.red, margin: 0, charSpace: 1.3 });
  slide.addText("Transformers:\nmirar todo a la vez", {
    x: 0.78,
    y: 1.5,
    w: 6.2,
    h: 1.6,
    fontFace: TYPOGRAPHY.display,
    fontSize: 28,
    bold: true,
    color: C.white,
    breakLine: false,
    margin: 0,
    fit: "shrink",
  });
  slide.addText("Una arquitectura que procesa el contexto completo en paralelo y aprende qué partes importan más usando atención.", {
    x: 0.82,
    y: 3.18,
    w: 6.0,
    h: 0.78,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.0,
    color: C.softBlue,
    margin: 0,
    fit: "shrink",
  });
  const transformerPoints = [
    ["Atención", "El modelo decide en qué partes del contexto fijarse para cada palabra."],
    ["Paralelo", "Procesa secuencias completas a la vez, no palabra por palabra."],
    ["Escala", "Funciona mejor mientras más datos y parámetros se le entregan."],
  ];
  transformerPoints.forEach((p, i) => {
    const y = 4.18 + i * 0.82;
    addPanel(slide, { x: 0.78, y, w: 6.16, h: 0.7, fill: "10243A", line: "1D3852", shadow: false });
    slide.addText(p[0].toUpperCase(), { x: 0.96, y: y + 0.12, w: 1.8, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 9.0, bold: true, color: C.red, margin: 0, charSpace: 1.0 });
    slide.addText(p[1], { x: 2.84, y: y + 0.16, w: 4.0, h: 0.4, fontFace: TYPOGRAPHY.body, fontSize: 10.4, color: C.white, margin: 0, fit: "shrink" });
  });
  addPanel(slide, { x: 7.16, y: 1.32, w: 5.5, h: 4.04, fill: "10243A", line: C.red, shadow: true });
  slide.addShape(SH.rect, { x: 7.34, y: 1.5, w: 0.1, h: 3.68, fill: { color: C.red }, line: { color: C.red } });
  slide.addText("MECANISMO DE ATENCIÓN", { x: 7.6, y: 1.5, w: 4.6, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 9, bold: true, color: C.red, charSpace: 1.2, margin: 0 });
  slide.addText("Attention(Q,K,V) =\nsoftmax(QKᵀ/√dₖ) · V", {
    x: 7.6,
    y: 1.78,
    w: 4.86,
    h: 1.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 22,
    bold: true,
    color: C.white,
    margin: 0,
    breakLine: false,
    fit: "shrink",
  });
  const attentionSteps = [
    ["Q · Kᵀ", "Cada palabra pregunta a las otras: ¿qué tanto te relacionas conmigo?"],
    ["softmax", "Convierte esas relaciones en porcentajes. Suman 100%."],
    ["… · V", "Mezcla los significados de las otras palabras según ese porcentaje."],
  ];
  attentionSteps.forEach((s, i) => {
    const y = 3.32 + i * 0.66;
    slide.addText(s[0], { x: 7.6, y, w: 1.5, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 13.4, bold: true, color: C.red, margin: 0 });
    slide.addText(s[1], { x: 9.15, y: y + 0.02, w: 3.3, h: 0.58, fontFace: TYPOGRAPHY.body, fontSize: 9.6, color: C.white, margin: 0, fit: "shrink" });
  });
  addPanel(slide, { x: 7.16, y: 5.6, w: 5.5, h: 1.16, fill: C.red, line: C.red, shadow: true });
  slide.addText("Esta arquitectura está debajo de ChatGPT, Codex, Stitch y Copilot.", {
    x: 7.36,
    y: 5.84,
    w: 5.1,
    h: 0.7,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.6,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  addSlideNumber(slide, { fill: C.red, x: 12.12, y: 7.06 });
  validate(slide);
}

// 04G - LLMs y bridge a las herramientas
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Hoy", "LLMs: modelos de lenguaje grandes", "Predicen la siguiente palabra usando billones de ejemplos. Eso es lo que hay debajo de las herramientas IA.");
  addImageCrop(slide, IMG.aiLanguageModels, 0.78, 1.86, 5.42, 4.78, { cy: 0.04, ch: 0.86 });
  addPanel(slide, { x: 0.78, y: 6.32, w: 5.42, h: 0.36, fill: C.navy, line: C.navy });
  slide.addText("Modelos entrenados sobre lenguaje, código e imágenes", { x: 0.94, y: 6.4, w: 5.1, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.4, bold: true, color: C.white, charSpace: 0.6, margin: 0, fit: "shrink" });
  const llmCards = [
    { kicker: "QUÉ HACEN", title: "Predicen tokens", body: "Producen la siguiente palabra (o pixel, o nota, o píxel del diseño) en función de todo el contexto recibido." },
    { kicker: "POR QUÉ FUNCIONAN", title: "Escala + datos", body: "Miles de millones de parámetros entrenados sobre la web, libros y código aprenden patrones muy generales." },
    { kicker: "DÓNDE LOS USAREMOS HOY", title: "Stitch · Codex · Copilot", body: "Diseño desde un brief, código desde una intención, datos desde una pregunta. Todo apoyado por LLMs." },
  ];
  llmCards.forEach((c, i) => {
    const y = 1.86 + i * 1.6;
    addCard(slide, {
      x: 6.5,
      y,
      w: 5.66,
      h: 1.46,
      kicker: c.kicker,
      title: c.title,
      body: c.body,
      accent: i === 2 ? C.red : C.navy,
      fill: i % 2 === 0 ? C.softBlue : C.white,
      titleSize: 17,
      titleH: 0.32,
      bodyY: y + 0.92,
      bodyH: 0.46,
      bodySize: 9.8,
      padX: 0.5,
      bodyPadX: 0.5,
    });
  });
  addPanel(slide, { x: 6.5, y: 6.62, w: 5.66, h: 0.42, fill: C.red, line: C.red });
  slide.addText("Con esta base, las herramientas dejan de ser magia.", {
    x: 6.66,
    y: 6.72,
    w: 5.34,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.4,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
    fit: "shrink",
  });
  addFooter(slide);
  validate(slide);
}

// 05
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Herramientas", "Tres herramientas, una historia", "Cada una cumple una función distinta dentro del producto digital.");
  const toolCards = [
    { x: 0.86, logo: LOGOS.google, kicker: "DISEÑO", title: "Stitch", body: "Idea escrita convertida en una primera interfaz visual.", pill: "idea -> interfaz", fill: C.paleRed, color: C.red },
    { x: 4.86, logo: LOGOS.openai, kicker: "PROGRAMACIÓN", title: "Codex", body: "Diseño transformado en archivos, estructura e interacción.", pill: "interfaz -> web", fill: C.softBlue, color: C.navy },
    { x: 8.86, logo: LOGOS.powerbi, kicker: "DATOS", title: "Power BI", body: "34 mil precios convertidos en lectura clara y decisiones.", pill: "datos -> decisión", fill: C.paleRed, color: C.red },
  ];
  toolCards.forEach((tool) => {
    addPanel(slide, { x: tool.x, y: 2.0, w: 3.62, h: 3.55, fill: C.white, line: C.border, shadow: true });
    slide.addShape(SH.rect, { x: tool.x + 0.18, y: 2.22, w: 0.09, h: 2.72, fill: { color: tool.color }, line: { color: tool.color } });
    addImageContain(slide, tool.logo, tool.x + 1.46, 2.22, 0.7, 0.7);
    slide.addText(tool.kicker, { x: tool.x + 0.44, y: 3.08, w: 2.74, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 8, bold: true, color: tool.color, align: "center", margin: 0, charSpace: 1.1 });
    slide.addText(tool.title, { x: tool.x + 0.44, y: 3.34, w: 2.74, h: 0.32, fontFace: TYPOGRAPHY.display, fontSize: 23, bold: true, color: C.navy, align: "center", margin: 0, fit: "shrink" });
    slide.addText(tool.body, { x: tool.x + 0.5, y: 3.92, w: 2.62, h: 0.42, fontFace: TYPOGRAPHY.body, fontSize: 10.2, color: C.ink, align: "center", margin: 0, fit: "shrink" });
    addPill(slide, tool.pill, tool.x + 0.6, 4.7, 2.42, tool.fill, tool.color);
  });
  slide.addText("La idea no es usar herramientas sueltas: es encadenarlas para crear valor.", { x: 1.08, y: 6.08, w: 10.6, h: 0.32, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: C.navy, margin: 0, align: "center" });
  addFooter(slide);
  validate(slide);
}

// 05
{
  const slide = pptx.addSlide();
  addImageCrop(slide, IMG.codeDark, 0, 0, SLIDE_W, SLIDE_H, { cy: 0, ch: 1 });
  slide.addShape(SH.rect, { x: 0, y: 0, w: SLIDE_W, h: SLIDE_H, fill: { color: "071522", transparency: 18 }, line: { transparency: 100 } });
  addLogo(slide, "mark");
  addBars(slide, 0.78, 0.74, 1.2);
  slide.addText("LA LÓGICA DEL SHOW", { x: 1.48, y: 0.74, w: 4.5, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.5, bold: true, color: C.red, charSpace: 1.2, margin: 0 });
  slide.addText("No vamos a solo mirar slides.", { x: 0.82, y: 1.56, w: 5.9, h: 0.52, fontFace: TYPOGRAPHY.display, fontSize: 27, bold: true, color: C.white, margin: 0 });
  slide.addText("Vamos a alternar explicación + acción.", { x: 0.86, y: 2.26, w: 5.2, h: 0.28, fontFace: TYPOGRAPHY.body, fontSize: 14.5, color: C.softBlue, margin: 0 });
  const seq = [
    ["01", "Entender el paso"],
    ["02", "Usar la herramienta"],
    ["03", "Mirar qué cambió"],
    ["04", "Conectar con el siguiente paso"],
  ];
  seq.forEach((s, i) => {
    const y = 3.12 + i * 0.62;
    slide.addText(s[0], { x: 0.92, y, w: 0.45, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 8.5, bold: true, color: C.red, margin: 0 });
    slide.addText(s[1], { x: 1.42, y: y - 0.03, w: 4.6, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true, color: C.white, margin: 0 });
  });
  addSlideNumber(slide, { fill: C.red, x: 12.12, y: 7.06 });
  validate(slide);
}

// 06
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addImageCrop(slide, IMG.retailWide, 7.45, 0, 5.88, SLIDE_H, { cy: 0.02, ch: 0.96 });
  slide.addShape(SH.rect, { x: 7.45, y: 0, w: 5.88, h: SLIDE_H, fill: { color: C.navy, transparency: 64 }, line: { transparency: 100 } });
  addLogo(slide, "dark");
  addBars(slide, 0.86, 0.92, 1.3, C.red);
  slide.addText("BLOQUE 1", { x: 1.62, y: 0.9, w: 2.2, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.5, bold: true, color: C.red, margin: 0, charSpace: 1.2 });
  slide.addText("De un problema cotidiano\na un producto digital", {
    x: 0.86,
    y: 1.72,
    w: 6.36,
    h: 1.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 29,
    bold: true,
    color: C.white,
    margin: 0,
    breakLine: false,
    fit: "shrink",
  });
  slide.addText("Caso central: La Cuenta · Osorno", { x: 0.9, y: 3.32, w: 5.4, h: 0.32, fontFace: TYPOGRAPHY.body, fontSize: 15.5, color: C.softBlue, margin: 0 });
  addPill(slide, "10 minutos · contexto + primer encuadre", 0.9, 4.1, 3.1, C.paleRed, C.red);
  slide.addText("Primero instalamos el problema. Después lo hacemos visible con IA.", { x: 0.9, y: 5.78, w: 5.55, h: 0.42, fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: C.white, margin: 0, fit: "shrink" });
  addSlideNumber(slide, { fill: C.red, x: 12.12, y: 7.06 });
  validate(slide);
}

// 07
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Punto de partida", "Una pregunta concreta de Osorno", "");
  slide.addText("¿En qué supermercado conviene comprar lo que tu familia compra todas las semanas?", {
    x: 1.42,
    y: 1.34,
    w: 8.8,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    color: C.slate,
    margin: 0,
    fit: "shrink",
  });
  addImageCrop(slide, IMG.retailReceipt, 0.76, 1.8, 5.1, 4.82, { cy: 0.04, ch: 0.86 });
  addCard(slide, {
    x: 6.22,
    y: 1.86,
    w: 5.94,
    h: 1.34,
    kicker: "PROYECTO PERSONAL DE DIEGO",
    title: "La Cuenta",
    body: "App que compara precios reales de los super de Osorno y arma tu lista óptima.",
    accent: C.red,
    titleSize: 19,
    titleH: 0.28,
    bodyY: 2.66,
    bodyH: 0.22,
    bodySize: 9.2,
    padX: 0.46,
    bodyPadX: 0.46,
  });
  const needs = ["Buscar productos", "Comparar precios", "Armar la lista", "Sugerir mejor super", "Calcular ahorro"];
  needs.forEach((item, i) => {
    addBigNumber(slide, i + 1, 6.32, 3.32 + i * 0.54, i === 0 ? C.red : C.navy);
    slide.addText(item, { x: 6.92, y: 3.41 + i * 0.54, w: 4.8, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 13.2, bold: true, color: C.navy, margin: 0 });
  });
  addFooter(slide);
  validate(slide);
}

// 08
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addHeader(slide, "Contraste", "Antes era lento. Hoy se puede prototipar rápido.", "La charla vende una posibilidad: crear una primera versión visible en poco tiempo.");
  addCard(slide, { x: 0.92, y: 2.02, w: 5.55, h: 3.72, kicker: "FLUJO TRADICIONAL", title: "Muchas etapas separadas", body: "", accent: C.slate, titleSize: 20, bodySize: 16, bodyY: 3.1, bodyH: 1.2 });
  addCard(slide, { x: 6.88, y: 2.02, w: 5.55, h: 3.72, kicker: "FLUJO DE LA DEMO", title: "Una cadena conectada", body: "", accent: C.red, titleSize: 20, bodySize: 16, bodyY: 3.1, bodyH: 1.2 });
  const oldSteps = ["idea", "diseño", "código", "planilla", "reporte"];
  oldSteps.forEach((s, i) => {
    const x = 1.38 + (i % 3) * 1.38;
    const y = i < 3 ? 3.26 : 4.14;
    addPill(slide, s, x, y, 1.04, C.mist, C.slate);
    if (i < oldSteps.length - 1) addArrow(slide, x + 1.05, y + 0.17, x + 1.28, y + 0.17, C.guide);
  });
  const newSteps = ["idea", "IA diseño", "web", "datos", "PBI"];
  slide.addShape(SH.line, { x: 7.56, y: 3.7, w: 3.84, h: 0, line: { color: C.red, pt: 2.1 } });
  newSteps.forEach((s, i) => {
    const x = 7.34 + i * 0.96;
    const y = 3.41;
    slide.addShape(SH.ellipse, { x, y, w: 0.58, h: 0.58, fill: { color: i === 0 || i === 4 ? C.red : C.navy }, line: { color: i === 0 || i === 4 ? C.red : C.navy } });
    slide.addText(String(i + 1), { x, y: y + 0.17, w: 0.58, h: 0.1, fontFace: TYPOGRAPHY.body, fontSize: 8, bold: true, color: C.white, align: "center", margin: 0 });
    slide.addText(s, { x: x - 0.1, y: y + 0.78, w: 0.78, h: 0.14, fontFace: TYPOGRAPHY.body, fontSize: 7.0, bold: true, color: C.navy, align: "center", margin: 0, fit: "shrink" });
  });
  slide.addText("menos espera", { x: 1.42, y: 4.98, w: 1.5, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.5, bold: true, color: C.slate, margin: 0 });
  slide.addText("más prototipo visible", { x: 8.24, y: 4.98, w: 2.2, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.5, bold: true, color: C.red, margin: 0 });
  slide.addText("La velocidad cambia la forma de imaginar proyectos.", { x: 1.1, y: 6.34, w: 11.1, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 19, bold: true, color: C.navy, margin: 0, align: "center" });
  addFooter(slide);
  validate(slide);
}

// 09
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Producto mínimo de la demo", "No es solo una página bonita", "La landing será la puerta de entrada a datos útiles.");
  const items = [
    ["Landing", "Hero, buscador y propuesta clara: encuentra y ahorra."],
    ["Catálogo", "34 mil productos comparables entre 6 supermercados."],
    ["Lista", "El usuario arma su canasta y ve dónde le sale más barato."],
    ["Dashboard", "Power BI explica el ahorro y los patrones por categoría."],
  ];
  items.forEach((it, i) => {
    const x = 0.92 + (i % 2) * 5.95;
    const y = 2.0 + Math.floor(i / 2) * 1.72;
    addCard(slide, { x, y, w: 5.42, h: 1.28, kicker: `CAPA ${i + 1}`, title: it[0], body: it[1], accent: i % 2 === 0 ? C.red : C.navy, titleSize: 18, bodySize: 10.6 });
  });
  slide.addText("La web capta. La lista decide. Los datos explican.", { x: 1.14, y: 5.8, w: 10.8, h: 0.38, fontFace: TYPOGRAPHY.display, fontSize: 21, bold: true, color: C.navy, margin: 0, align: "center" });
  addFooter(slide);
  validate(slide);
}

// 10
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addHeader(slide, "Recorrido del usuario", "Una visita puede transformarse en información", "La landing no es el final; es el inicio de una conversación con datos.");
  const journey = [
    ["Visita", "Llega buscando ahorrar en el super"],
    ["Busca", "Pasta, leche, aceite, lo de la semana"],
    ["Arma", "Suma productos a su lista"],
    ["Compara", "La app le muestra el super más barato"],
    ["Decisión", "Compra ahí y ahorra real"],
  ];
  journey.forEach((j, i) => {
    const x = 0.82 + i * 2.48;
    addPanel(slide, { x, y: 2.34, w: 2.02, h: 2.18, fill: i === 2 ? C.paleRed : C.softBlue, line: i === 2 ? C.red : C.border, shadow: true });
    addBigNumber(slide, i + 1, x + 0.78, 2.64, i === 2 ? C.red : C.navy);
    slide.addText(j[0], { x: x + 0.18, y: 3.28, w: 1.66, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true, color: C.navy, align: "center", margin: 0 });
    slide.addText(j[1], { x: x + 0.18, y: 3.72, w: 1.66, h: 0.4, fontFace: TYPOGRAPHY.body, fontSize: 8.5, color: C.ink, align: "center", margin: 0, fit: "shrink" });
    if (i < journey.length - 1) addArrow(slide, x + 2.02, 3.42, x + 2.42, 3.42, C.red);
  });
  addCard(slide, {
    x: 1.18,
    y: 5.36,
    w: 10.92,
    h: 1.0,
    kicker: "IDEA CLAVE",
    title: "Cada lista armada revela qué productos se buscan, en qué super y cuánto ahorro mueven.",
    titleSize: 17,
    titleH: 0.3,
    accent: C.red,
  });
  addFooter(slide);
  validate(slide);
}

// 11
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Lista de compras", "Qué guarda la app cuando armas tu canasta", "Cada fila tiene valor: lo que compras, dónde y cuánto ahorras.");
  addPanel(slide, { x: 0.94, y: 1.86, w: 5.15, h: 4.72, fill: C.white, line: C.border, shadow: true });
  slide.addText("Tu canasta del mes", { x: 1.28, y: 2.2, w: 3.8, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 20, bold: true, color: C.navy, margin: 0 });
  const fields = ["Producto", "Marca", "Cantidad", "Categoría", "Super elegido", "Precio CLP", "Ahorro CLP", "Fecha"];
  fields.forEach((f, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 1.26 + col * 2.32;
    const y = 2.88 + row * 0.72;
    slide.addShape(SH.roundRect, { x, y, w: 2.04, h: 0.42, rectRadius: 0.06, fill: { color: C.mist }, line: { color: C.border, pt: 0.8 } });
    slide.addText(f, { x: x + 0.14, y: y + 0.14, w: 1.76, h: 0.1, fontFace: TYPOGRAPHY.body, fontSize: 7.8, color: C.slate, margin: 0, fit: "shrink" });
  });
  slide.addShape(SH.roundRect, { x: 1.26, y: 5.94, w: 4.36, h: 0.36, rectRadius: 0.07, fill: { color: C.red }, line: { color: C.red } });
  slide.addText("Calcular ahorro", { x: 1.26, y: 6.05, w: 4.36, h: 0.1, fontFace: TYPOGRAPHY.body, fontSize: 8.5, bold: true, color: C.white, align: "center", margin: 0 });
  addCard(slide, { x: 6.5, y: 2.0, w: 5.78, h: 1.2, kicker: "NO SON CAMPOS AL AZAR", title: "Cada dato responde una pregunta", body: "Categoría, marca, super y precio revelan dónde se está el ahorro.", accent: C.red, titleSize: 18 });
  addCard(slide, { x: 6.5, y: 3.58, w: 5.78, h: 1.2, kicker: "PUENTE A POWER BI", title: "Una compra = una fila", body: "Cuando hay miles de filas, aparecen patrones que se pueden visualizar.", accent: C.navy, titleSize: 18 });
  addFooter(slide);
  validate(slide);
}

// 12
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addHeader(slide, "Preguntas de negocio", "Qué podríamos descubrir después", "Estas preguntas serán la razón para llegar a Power BI.");
  const qs = [
    "¿Qué super es el más barato esta semana?",
    "¿Qué categoría tiene mayor diferencia de precio?",
    "¿Cuánto se ahorra una familia promedio?",
    "¿Qué marcas dominan en cada super?",
    "¿Qué productos cambian más de precio?",
    "¿Conviene partir la compra entre dos super?",
  ];
  qs.forEach((q, i) => {
    const x = 0.88 + (i % 2) * 5.95;
    const y = 2.0 + Math.floor(i / 2) * 1.18;
    addPanel(slide, { x, y, w: 5.42, h: 0.82, fill: i % 2 === 0 ? C.softBlue : C.warm, line: C.border, shadow: true });
    slide.addText(q, { x: x + 0.28, y: y + 0.28, w: 4.85, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 14.4, bold: true, color: C.navy, margin: 0, fit: "shrink" });
  });
  slide.addText("Los datos hacen visible lo que antes era pura intuición.", { x: 1.0, y: 5.92, w: 11.3, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 20, bold: true, color: C.navy, margin: 0, align: "center" });
  addFooter(slide);
  validate(slide);
}

// 13
{
  const slide = pptx.addSlide();
  addImageCrop(slide, IMG.studentCode, 0, 0, SLIDE_W, SLIDE_H, { cy: 0.08, ch: 0.76 });
  slide.addShape(SH.rect, { x: 0, y: 0, w: SLIDE_W, h: SLIDE_H, fill: { color: C.navy, transparency: 14 }, line: { transparency: 100 } });
  addLogo(slide, "mark");
  addBars(slide, 0.82, 0.76, 1.2, C.red);
  slide.addText("MENSAJE DEL BLOQUE", { x: 1.54, y: 0.76, w: 4.1, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.5, bold: true, color: C.red, charSpace: 1.2, margin: 0 });
  slide.addText("Programar no es solo escribir código.", { x: 0.84, y: 1.58, w: 6.85, h: 0.62, fontFace: TYPOGRAPHY.display, fontSize: 30, bold: true, color: C.white, margin: 0, fit: "shrink" });
  slide.addText("También es crear experiencias, conectar herramientas y transformar datos en decisiones.", { x: 0.9, y: 2.46, w: 5.6, h: 0.64, fontFace: TYPOGRAPHY.body, fontSize: 16, color: C.softBlue, margin: 0, fit: "shrink" });
  ["crear", "automatizar", "conectar", "analizar", "decidir"].forEach((word, i) => addPill(slide, word, 0.9 + i * 1.18, 4.1, 1.0, i === 0 ? C.paleRed : C.softBlue, i === 0 ? C.red : C.navy));
  addSlideNumber(slide, { fill: C.red, x: 12.12, y: 7.06 });
  validate(slide);
}

// 14
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Siguiente paso", "Ahora lo hacemos visible con IA", "");
  slide.addText("Primera demo: pedirle a Stitch que imagine la landing de La Cuenta.", {
    x: 1.42,
    y: 1.34,
    w: 8.8,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    color: C.slate,
    margin: 0,
    fit: "shrink",
  });
  addImageCrop(slide, IMG.retailDrinks, 0.86, 1.86, 4.15, 4.82, { cy: 0.04, ch: 0.86 });
  addCard(slide, {
    x: 5.42,
    y: 1.92,
    w: 6.74,
    h: 1.28,
    kicker: "DEMO EN VIVO 1",
    title: "Diseñar la landing",
    body: "Describimos el negocio en lenguaje natural y revisamos qué propone la herramienta.",
    accent: C.red,
    titleSize: 20,
    titleH: 0.3,
    bodyY: 2.72,
    bodyH: 0.22,
    bodySize: 9.4,
    padX: 0.46,
    bodyPadX: 0.46,
  });
  addPanel(slide, { x: 5.42, y: 3.32, w: 6.74, h: 2.28, fill: C.navy, line: C.navy, shadow: true });
  slide.addText("Prompt base", { x: 5.78, y: 3.66, w: 2.0, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.5, bold: true, color: C.gold, margin: 0, charSpace: 0.8 });
  slide.addText("Diseña una landing editorial para La Cuenta, con buscador, lista de compras, comparador de supermercados y panel de ahorro.", {
    x: 5.78,
    y: 4.02,
    w: 5.85,
    h: 0.84,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.5,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
    breakLine: false,
  });
  slide.addText("Objetivo de la demo: pasar de idea a interfaz visual.", { x: 5.78, y: 5.06, w: 5.4, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10.6, color: C.softBlue, margin: 0 });
  addFooter(slide);
  validate(slide);
}

// 15
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addImageCrop(slide, IMG.codeNeon, 7.1, 0, 6.23, SLIDE_H, { cy: 0.08, ch: 0.78 });
  slide.addShape(SH.rect, { x: 7.1, y: 0, w: 6.23, h: SLIDE_H, fill: { color: C.navy, transparency: 54 }, line: { transparency: 100 } });
  addLogo(slide, "dark");
  addBars(slide, 0.86, 0.92, 1.3, C.red);
  slide.addText("BLOQUE 2", { x: 1.62, y: 0.9, w: 2.2, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.5, bold: true, color: C.red, margin: 0, charSpace: 1.2 });
  slide.addText("Diseñar la landing\ncon IA", {
    x: 0.86,
    y: 1.72,
    w: 5.75,
    h: 1.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 32,
    bold: true,
    color: C.white,
    margin: 0,
    breakLine: false,
    fit: "shrink",
  });
  slide.addText("De idea de negocio a propuesta visual lista para discutir.", {
    x: 0.9,
    y: 3.32,
    w: 5.2,
    h: 0.32,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15.5,
    color: C.softBlue,
    margin: 0,
  });
  addPill(slide, "12 minutos · brief + demo Stitch", 0.9, 4.08, 3.1, C.paleRed, C.red);
  addPanel(slide, { x: 4.22, y: 4.06, w: 1.52, h: 0.38, fill: C.white, line: C.paleRed, shadow: true });
  addImageContain(slide, LOGOS.google, 4.36, 4.12, 0.22, 0.22);
  slide.addText("Stitch", { x: 4.66, y: 4.19, w: 0.74, h: 0.08, fontFace: TYPOGRAPHY.body, fontSize: 8, bold: true, color: C.navy, align: "center", margin: 0 });
  slide.addText("El objetivo no es tener “la página perfecta”. Es obtener una primera versión visual potente.", {
    x: 0.9,
    y: 5.76,
    w: 5.65,
    h: 0.42,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  addSlideNumber(slide, { fill: C.red, x: 12.12, y: 7.06 });
  validate(slide);
}

// 16
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Herramienta", "Stitch convierte intención en interfaz", "");
  slide.addText("La calidad del resultado depende mucho de la calidad del brief.", {
    x: 1.42,
    y: 1.34,
    w: 8.6,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.5,
    color: C.slate,
    margin: 0,
  });
  addImageCrop(slide, IMG.retailReceipt, 0.86, 1.96, 4.15, 4.7, { cy: 0.04, ch: 0.86 });
  addCard(slide, {
    x: 5.44,
    y: 2.04,
    w: 3.04,
    h: 1.48,
    kicker: "ENTRADA",
    title: "Brief",
    body: "Negocio, público, estilo, estructura y objetivo.",
    accent: C.red,
    titleSize: 18,
    bodyY: 2.92,
    bodyH: 0.28,
    bodySize: 9.4,
    padX: 0.44,
    bodyPadX: 0.44,
  });
  addArrow(slide, 8.64, 2.78, 9.22, 2.78, C.red);
  addCard(slide, {
    x: 9.32,
    y: 2.04,
    w: 2.86,
    h: 1.48,
    kicker: "SALIDA",
    title: "Interfaz",
    body: "Una landing visual para revisar y mejorar.",
    accent: C.navy,
    titleSize: 18,
    bodyY: 2.92,
    bodyH: 0.28,
    bodySize: 9.4,
    padX: 0.44,
    bodyPadX: 0.44,
  });
  addPanel(slide, { x: 5.44, y: 4.18, w: 6.74, h: 1.32, fill: C.navy, line: C.navy, shadow: true });
  slide.addText("Regla de la demo", { x: 5.82, y: 4.5, w: 2.2, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 8.4, bold: true, color: C.gold, charSpace: 0.7, margin: 0 });
  slide.addText("No pedimos una pantalla bonita. Pedimos una landing que resuelva una acción: ahorrar.", {
    x: 5.82,
    y: 4.86,
    w: 5.95,
    h: 0.32,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15.5,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  addFooter(slide);
  validate(slide);
}

// 17
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addHeader(slide, "One-shot prompt", "Un buen prompt funciona como brief de diseño", "Si queremos buen resultado, el contexto debe venir desde el inicio.");
  const parts = [
    ["01", "Contexto", "Qué negocio es y qué problema resuelve."],
    ["02", "Objetivo", "Qué acción queremos provocar: ahorrar."],
    ["03", "Público", "Para quién se diseña la experiencia."],
    ["04", "Estética", "Qué debe transmitir visualmente."],
    ["05", "Secciones", "Qué partes debe tener la landing."],
    ["06", "Restricciones", "Qué debe evitar el diseño."],
  ];
  parts.forEach((p, i) => {
    const x = 0.88 + (i % 3) * 4.02;
    const y = 1.98 + Math.floor(i / 3) * 1.72;
    addPanel(slide, { x, y, w: 3.54, h: 1.2, fill: i % 2 === 0 ? C.softBlue : C.warm, line: C.border, shadow: true });
    slide.addText(p[0], { x: x + 0.22, y: y + 0.2, w: 0.42, h: 0.14, fontFace: TYPOGRAPHY.body, fontSize: 8.2, bold: true, color: C.red, margin: 0 });
    slide.addText(p[1], { x: x + 0.72, y: y + 0.16, w: 2.32, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 15.2, bold: true, color: C.navy, margin: 0 });
    slide.addText(p[2], { x: x + 0.72, y: y + 0.56, w: 2.44, h: 0.28, fontFace: TYPOGRAPHY.body, fontSize: 8.8, color: C.ink, margin: 0, fit: "shrink" });
  });
  slide.addText("Mientras más claro el brief, menos genérica la interfaz.", {
    x: 1.02,
    y: 5.84,
    w: 11.2,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 20,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  addFooter(slide);
  validate(slide);
}

// 18
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Brief visual", "Qué le vamos a pedir a la IA", "No solo contenido: también tono, estructura y experiencia.");
  addPanel(slide, { x: 0.9, y: 1.9, w: 5.14, h: 4.5, fill: C.navy, line: C.navy, shadow: true });
  slide.addText("La Cuenta · Osorno", { x: 1.28, y: 2.28, w: 3.6, h: 0.32, fontFace: TYPOGRAPHY.display, fontSize: 22, bold: true, color: C.white, margin: 0 });
  slide.addText("Editorial · útil · honesta · ahorrativa", { x: 1.3, y: 2.82, w: 3.8, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 10.2, color: C.softBlue, margin: 0 });
  ["Hero con dato fuerte", "Buscador unificado", "Top de ahorros", "Mi lista de compras", "Comparador de super", "Panel de inteligencia"].forEach((item, i) => {
    const y = 3.38 + i * 0.38;
    slide.addShape(SH.ellipse, { x: 1.32, y: y + 0.02, w: 0.12, h: 0.12, fill: { color: C.red }, line: { color: C.red } });
    slide.addText(item, { x: 1.56, y, w: 3.8, h: 0.15, fontFace: TYPOGRAPHY.body, fontSize: 9.8, bold: true, color: C.white, margin: 0 });
  });
  addImageCrop(slide, IMG.retailDrinks, 6.4, 1.9, 2.62, 4.5, { cy: 0.04, ch: 0.86 });
  addImageCrop(slide, IMG.retailReceipt, 9.28, 1.9, 2.62, 4.5, { cy: 0.04, ch: 0.86 });
  addFooter(slide);
  validate(slide);
}

// 19
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addHeader(slide, "Anatomía de la landing", "La página debe llevar a una acción", "Cada sección empuja al usuario a armar su lista, no solo decora.");
  const sections = [
    ["Hero", "Promesa: hasta 41% de diferencia"],
    ["Buscador", "Encuentra cualquier producto"],
    ["Top ahorros", "Donde más vale elegir bien"],
    ["Comparador", "Precios lado a lado por super"],
    ["Mi lista", "Arma la canasta del mes"],
    ["Resultado", "Mejor super + ahorro total"],
  ];
  sections.forEach((s, i) => {
    const x = 0.92 + (i % 3) * 4.04;
    const y = 1.96 + Math.floor(i / 3) * 1.76;
    addCard(slide, {
      x,
      y,
      w: 3.52,
      h: 1.24,
      kicker: `SECCIÓN ${i + 1}`,
      title: s[0],
      body: s[1],
      accent: i === 5 ? C.red : C.navy,
      titleSize: 16,
      titleH: 0.26,
      bodySize: 8.8,
      bodyY: y + 0.88,
      bodyH: 0.18,
      padX: 0.42,
      bodyPadX: 0.42,
    });
  });
  addPanel(slide, { x: 1.18, y: 5.56, w: 10.92, h: 0.76, fill: C.paleRed, line: C.paleRed, shadow: false });
  slide.addText("Pregunta central: ¿dónde queda claro que puedo armar mi lista y ver el ahorro?", {
    x: 1.52,
    y: 5.82,
    w: 10.2,
    h: 0.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17,
    bold: true,
    color: C.red,
    align: "center",
    margin: 0,
  });
  addFooter(slide);
  validate(slide);
}

// 20
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Prompt one-shot", "Lo importante cabe en una estructura", "El prompt completo está listo en el guion; esta slide muestra la lógica.");
  addPanel(slide, { x: 0.9, y: 1.84, w: 11.55, h: 4.66, fill: C.terminalBg, line: C.terminalBg, shadow: true });
  slide.addText("brief.stitch", { x: 1.28, y: 2.18, w: 2.4, h: 0.16, fontFace: TYPOGRAPHY.mono, fontSize: 8.8, bold: true, color: C.gold, margin: 0 });
  const lines = [
    "Diseña una landing editorial para La Cuenta · Osorno.",
    "Objetivo: que el visitante arme su lista y vea cuánto ahorra.",
    "Público: familias y jóvenes que hacen la compra del mes en Osorno.",
    "Estética: editorial, sobria, premium, tipográfica fuerte, mucho dato visible.",
    "Debe incluir: hero con dato fuerte, buscador, top de ahorros, comparador, mi lista y panel de resultado.",
    "La lista debe permitir agregar productos y mostrar el super más conveniente.",
    "Evita: aspecto corporativo plano, colores saturados o sensación de e-commerce.",
  ];
  lines.forEach((line, i) => {
    slide.addText(`> ${line}`, {
      x: 1.3,
      y: 2.72 + i * 0.38,
      w: 10.55,
      h: 0.16,
      fontFace: TYPOGRAPHY.mono,
      fontSize: 9.6,
      color: i === 1 || i === 5 ? C.white : C.terminalOutput,
      bold: i === 1 || i === 5,
      margin: 0,
      fit: "shrink",
    });
  });
  addFooter(slide);
  validate(slide);
}

// 21
{
  const slide = pptx.addSlide();
  addImageCrop(slide, IMG.retailHero, 0, 0, SLIDE_W, SLIDE_H, { cy: 0, ch: 1 });
  slide.addShape(SH.rect, { x: 0, y: 0, w: SLIDE_W, h: SLIDE_H, fill: { color: C.navy, transparency: 18 }, line: { transparency: 100 } });
  addLogo(slide, "mark");
  addBars(slide, 0.82, 0.78, 1.2, C.red);
  slide.addText("DEMO EN VIVO 1", { x: 1.54, y: 0.78, w: 4.1, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.5, bold: true, color: C.red, charSpace: 1.2, margin: 0 });
  slide.addText("Abrimos Stitch.\nPegamos el brief.\nMiramos qué aparece.", {
    x: 0.84,
    y: 1.56,
    w: 5.7,
    h: 1.36,
    fontFace: TYPOGRAPHY.display,
    fontSize: 29,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  slide.addText("No buscamos perfección. Buscamos una primera interfaz con dirección.", {
    x: 0.9,
    y: 3.36,
    w: 5.45,
    h: 0.42,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15.5,
    color: C.softBlue,
    margin: 0,
    fit: "shrink",
  });
  addPill(slide, "acción: generar landing", 0.9, 4.28, 2.35, C.paleRed, C.red);
  addSlideNumber(slide, { fill: C.red, x: 12.12, y: 7.06 });
  validate(slide);
}

// 22
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addHeader(slide, "Revisión del resultado", "Qué vamos a mirar cuando aparezca", "No basta con que se vea cool: debe funcionar como landing.");
  const checks = [
    ["Claridad", "¿Se entiende qué hace la app en segundos?"],
    ["Acción", "¿El buscador / botón de armar lista aparece fuerte?"],
    ["Comparación", "¿Se ve clarito el ahorro entre supermercados?"],
    ["Confianza", "¿La estética se siente profesional, no genérica?"],
    ["Lista", "¿Armar la canasta se ve simple?"],
    ["Código futuro", "¿Esto se puede convertir en web?"],
  ];
  checks.forEach((c, i) => {
    const x = 0.92 + (i % 2) * 5.96;
    const y = 1.94 + Math.floor(i / 2) * 1.24;
    addPanel(slide, { x, y, w: 5.42, h: 0.88, fill: i % 2 === 0 ? C.softBlue : C.warm, line: C.border, shadow: true });
    addBigNumber(slide, i + 1, x + 0.22, y + 0.22, i === 1 || i === 4 ? C.red : C.navy);
    slide.addText(c[0], { x: x + 0.84, y: y + 0.18, w: 1.6, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 13.5, bold: true, color: C.navy, margin: 0 });
    slide.addText(c[1], { x: x + 0.84, y: y + 0.48, w: 4.06, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 8.8, color: C.ink, margin: 0, fit: "shrink" });
  });
  addFooter(slide);
  validate(slide);
}

// 23
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Cierre del bloque", "Del diseño a la implementación", "La IA ya imaginó una interfaz. Ahora toca construir algo que funcione.");
  addImageCrop(slide, IMG.codeDark, 0.86, 1.88, 4.55, 4.72, { cy: 0.0, ch: 1 });
  addCard(slide, {
    x: 5.84,
    y: 2.02,
    w: 5.92,
    h: 1.48,
    kicker: "YA TENEMOS",
    title: "Una dirección visual",
    body: "Nombre, secciones, buscador, comparador y la lista de compras como acción principal.",
    accent: C.red,
    titleSize: 18.5,
    bodyY: 2.98,
    bodyH: 0.22,
    bodySize: 9.4,
    padX: 0.46,
    bodyPadX: 0.46,
  });
  addCard(slide, {
    x: 5.84,
    y: 3.98,
    w: 5.92,
    h: 1.48,
    kicker: "SIGUIENTE DEMO",
    title: "Convertirlo en web",
    body: "Pasamos de una propuesta visual a HTML, CSS, JavaScript y formulario.",
    accent: C.navy,
    titleSize: 18.5,
    bodyY: 4.94,
    bodyH: 0.22,
    bodySize: 9.4,
    padX: 0.46,
    bodyPadX: 0.46,
  });
  slide.addText("El diseño abre el camino. La programación lo vuelve interactivo.", {
    x: 5.88,
    y: 5.72,
    w: 5.7,
    h: 0.32,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17,
    bold: true,
    color: C.navy,
    margin: 0,
    fit: "shrink",
  });
  addFooter(slide);
  validate(slide);
}

// 24
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addImageCrop(slide, IMG.codeDark, 7.0, 0, 6.33, SLIDE_H, { cy: 0, ch: 1 });
  slide.addShape(SH.rect, { x: 7.0, y: 0, w: 6.33, h: SLIDE_H, fill: { color: C.navy, transparency: 48 }, line: { transparency: 100 } });
  addLogo(slide, "dark");
  addBars(slide, 0.86, 0.92, 1.3, C.red);
  slide.addText("BLOQUE 3", { x: 1.62, y: 0.9, w: 2.2, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.5, bold: true, color: C.red, margin: 0, charSpace: 1.2 });
  slide.addText("Convertir el diseño\nen una web funcional", {
    x: 0.86,
    y: 1.72,
    w: 5.9,
    h: 1.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 30,
    bold: true,
    color: C.white,
    margin: 0,
    breakLine: false,
    fit: "shrink",
  });
  slide.addText("Ahora la idea deja de ser una maqueta y empieza a responder al usuario.", {
    x: 0.9,
    y: 3.36,
    w: 5.4,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15,
    color: C.softBlue,
    margin: 0,
    fit: "shrink",
  });
  addPill(slide, "15 minutos · Codex + buscador + lista", 0.9, 4.1, 3.72, C.paleRed, C.red);
  addPanel(slide, { x: 4.84, y: 4.08, w: 1.5, h: 0.38, fill: C.white, line: C.softBlue, shadow: true });
  addImageContain(slide, LOGOS.openai, 4.98, 4.13, 0.23, 0.23);
  slide.addText("Codex", { x: 5.28, y: 4.21, w: 0.72, h: 0.08, fontFace: TYPOGRAPHY.body, fontSize: 8, bold: true, color: C.navy, align: "center", margin: 0 });
  slide.addText("El diseño abre el camino. El código lo vuelve interactivo.", {
    x: 0.9,
    y: 5.76,
    w: 5.7,
    h: 0.42,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  addSlideNumber(slide, { fill: C.red, x: 12.12, y: 7.06 });
  validate(slide);
}

// 25
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "De maqueta a archivos", "Una web necesita estructura, estilo e interacción", "Codex ayuda a crear una primera versión, pero debemos pedirle una salida concreta.");
  addImageCrop(slide, IMG.codeNeon, 0.86, 1.9, 4.15, 4.72, { cy: 0.04, ch: 0.86 });
  const layers = [
    ["HTML", "estructura", "secciones, buscador, lista, panel de comparación"],
    ["CSS", "apariencia", "tipografía editorial, grillas, responsive, jerarquía"],
    ["JS", "interacción", "filtrar productos, sumar a lista, calcular ahorro"],
  ];
  layers.forEach((l, i) => {
    addCard(slide, {
      x: 5.48,
      y: 1.98 + i * 1.36,
      w: 6.34,
      h: 1.0,
      kicker: l[1].toUpperCase(),
      title: l[0],
      body: l[2],
      accent: i === 1 ? C.navy : C.red,
      titleSize: 18.5,
      titleH: 0.26,
      bodyY: 2.76 + i * 1.36,
      bodyH: 0.18,
      bodySize: 9.3,
      padX: 0.48,
      bodyPadX: 0.48,
    });
  });
  slide.addText("Tres capas simples. Una experiencia completa.", { x: 5.52, y: 6.05, w: 5.9, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: C.navy, margin: 0 });
  addFooter(slide);
  validate(slide);
}

// 26
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addHeader(slide, "Codex", "No le pedimos “hazme una página”", "Le damos una especificación clara para que construya algo demostrable.");
  const spec = [
    ["Caso", "La Cuenta · Osorno"],
    ["Salida", "Next.js + Tailwind"],
    ["Secciones", "hero, buscador, top, comparador, lista"],
    ["Acción", "armar lista y ver ahorro"],
    ["Datos", "34 mil precios reales · CSV"],
    ["Calidad", "responsive, editorial, legible y rápida"],
  ];
  spec.forEach((s, i) => {
    const x = 0.92 + (i % 2) * 5.95;
    const y = 1.9 + Math.floor(i / 2) * 1.16;
    addPanel(slide, { x, y, w: 5.42, h: 0.82, fill: i % 2 === 0 ? C.softBlue : C.warm, line: C.border, shadow: true });
    slide.addText(s[0], { x: x + 0.28, y: y + 0.22, w: 1.24, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 8.6, bold: true, color: C.red, margin: 0, charSpace: 0.5 });
    slide.addText(s[1], { x: x + 1.54, y: y + 0.22, w: 3.52, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 13.2, bold: true, color: C.navy, margin: 0, fit: "shrink" });
  });
  addPanel(slide, { x: 1.18, y: 5.72, w: 10.92, h: 0.72, fill: C.navy, line: C.navy, shadow: true });
  slide.addText("La diferencia entre pedir y dirigir: una especificación reduce improvisación.", {
    x: 1.52,
    y: 5.98,
    w: 10.2,
    h: 0.16,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  addFooter(slide);
  validate(slide);
}

// 27
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Prompt para Codex", "Construir una versión controlada", "El prompt de demo debe pedir archivos, comportamiento y criterio visual.");
  addPanel(slide, { x: 0.9, y: 1.82, w: 11.55, h: 4.75, fill: C.terminalBg, line: C.terminalBg, shadow: true });
  slide.addText("codex.task", { x: 1.28, y: 2.14, w: 2.2, h: 0.16, fontFace: TYPOGRAPHY.mono, fontSize: 8.8, bold: true, color: C.gold, margin: 0 });
  const lines = [
    "Crea una landing en Next.js + Tailwind para La Cuenta · Osorno.",
    "Usa el dataset db_osorno.csv (34 mil filas · ean, producto, marca, super, precio, ahorro_clp, ahorro_pct).",
    "Incluye hero con dato fuerte, buscador, top de ahorros, comparador y mi lista.",
    "Mi lista debe permitir agregar productos y mostrar el super donde sale más barato.",
    "Al armar la lista, calcular el ahorro total respecto al super más caro.",
    "Estética editorial, sobria, premium, en español de Chile.",
  ];
  lines.forEach((line, i) => {
    slide.addText(`> ${line}`, {
      x: 1.3,
      y: 2.7 + i * 0.46,
      w: 10.55,
      h: 0.18,
      fontFace: TYPOGRAPHY.mono,
      fontSize: 9.3,
      color: i === 4 ? C.white : C.terminalOutput,
      bold: i === 4,
      margin: 0,
      fit: "shrink",
    });
  });
  addFooter(slide);
  validate(slide);
}

// 28
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addHeader(slide, "Estructura esperada", "Lo que queremos ver en la carpeta", "La demo debe ser simple de abrir y fácil de explicar.");
  addPanel(slide, { x: 0.92, y: 1.9, w: 4.94, h: 4.64, fill: C.terminalBg, line: C.terminalBg, shadow: true });
  slide.addText("la-cuenta/", { x: 1.32, y: 2.18, w: 3.2, h: 0.18, fontFace: TYPOGRAPHY.mono, fontSize: 12, bold: true, color: C.gold, margin: 0 });
  const tree = [
    "├── app/",
    "│   ├── layout.tsx",
    "│   ├── page.tsx",
    "│   └── globals.css",
    "├── components/",
    "│   ├── Hero.tsx",
    "│   ├── Search.tsx",
    "│   └── List.tsx",
    "├── lib/",
    "│   └── data.ts",
    "├── public/",
    "│   └── db_osorno.csv",
    "├── tailwind.config.ts",
    "└── package.json",
  ];
  tree.forEach((line, i) => {
    slide.addText(line, { x: 1.34, y: 2.62 + i * 0.26, w: 3.5, h: 0.16, fontFace: TYPOGRAPHY.mono, fontSize: 9.6, color: C.terminalOutput, margin: 0 });
  });
  addCard(slide, { x: 6.4, y: 1.9, w: 5.72, h: 1.42, kicker: "APP/", title: "Páginas y rutas", body: "App Router de Next.js: layout, page y estilos globales en un solo lugar.", accent: C.red, titleSize: 17.2, titleH: 0.26, bodyY: 2.96, bodyH: 0.32, bodySize: 9.0, padX: 0.46, bodyPadX: 0.46 });
  addCard(slide, { x: 6.4, y: 3.46, w: 5.72, h: 1.42, kicker: "COMPONENTS/", title: "Piezas reutilizables", body: "Hero, buscador y lista. Cada componente hace una cosa bien y se compone con los demás.", accent: C.navy, titleSize: 17.2, titleH: 0.26, bodyY: 4.52, bodyH: 0.32, bodySize: 9.0, padX: 0.46, bodyPadX: 0.46 });
  addCard(slide, { x: 6.4, y: 5.02, w: 5.72, h: 1.42, kicker: "TAILWIND + TS", title: "Estilos y tipos", body: "Tailwind para diseño rápido y consistente. TypeScript para que el editor te avise si te equivocas.", accent: C.red, titleSize: 17.2, titleH: 0.26, bodyY: 6.08, bodyH: 0.32, bodySize: 9.0, padX: 0.46, bodyPadX: 0.46 });
  addFooter(slide);
  validate(slide);
}

// 29
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Lista funcional", "El momento en que la web produce datos", "La lista de compras es el puente entre uso real y análisis.");
  addPanel(slide, { x: 0.94, y: 1.86, w: 5.02, h: 4.72, fill: C.white, line: C.border, shadow: true });
  slide.addText("Mi lista del mes", { x: 1.26, y: 2.18, w: 3.2, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 18.5, bold: true, color: C.navy, margin: 0 });
  const fields = [
    ["Producto", "Pasta Carozzi 400g"],
    ["Marca", "Carozzi"],
    ["Categoría", "Abarrotes"],
    ["Mejor super", "Unimarc"],
    ["Precio", "$2.050"],
    ["Ahorro", "$810 · 28%"],
  ];
  fields.forEach((f, i) => {
    const x = 1.24 + (i % 2) * 2.16;
    const y = 2.82 + Math.floor(i / 2) * 0.76;
    slide.addText(f[0].toUpperCase(), { x, y, w: 1.7, h: 0.12, fontFace: TYPOGRAPHY.body, fontSize: 6.8, bold: true, color: C.red, margin: 0, charSpace: 0.5 });
    slide.addShape(SH.roundRect, { x, y: y + 0.2, w: 1.82, h: 0.38, rectRadius: 0.05, fill: { color: C.mist }, line: { color: C.border, pt: 0.7 } });
    slide.addText(f[1], { x: x + 0.12, y: y + 0.32, w: 1.56, h: 0.1, fontFace: TYPOGRAPHY.body, fontSize: 8.2, color: C.ink, margin: 0, fit: "shrink" });
  });
  slide.addShape(SH.roundRect, { x: 1.24, y: 5.58, w: 4.1, h: 0.42, rectRadius: 0.07, fill: { color: C.red }, line: { color: C.red } });
  slide.addText("Calcular ahorro total", { x: 1.24, y: 5.72, w: 4.1, h: 0.1, fontFace: TYPOGRAPHY.body, fontSize: 8.6, bold: true, color: C.white, align: "center", margin: 0 });
  addArrow(slide, 6.22, 3.82, 6.92, 3.82, C.red);
  addPanel(slide, { x: 7.06, y: 2.34, w: 4.96, h: 3.0, fill: C.navy, line: C.navy, shadow: true });
  slide.addText("fila de datos", { x: 7.42, y: 2.7, w: 2.0, h: 0.16, fontFace: TYPOGRAPHY.mono, fontSize: 8.4, bold: true, color: C.gold, margin: 0 });
  slide.addText("ean | producto | super | precio | ahorro_clp\n7802575040213 | Pasta Carozzi 400g | Unimarc | 2050 | 810", {
    x: 7.42,
    y: 3.22,
    w: 4.2,
    h: 0.58,
    fontFace: TYPOGRAPHY.mono,
    fontSize: 11.2,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  slide.addText("Un precio aislado es una observación. Miles de precios muestran patrones de ahorro reales.", {
    x: 7.42,
    y: 4.34,
    w: 4.1,
    h: 0.36,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.4,
    color: C.softBlue,
    margin: 0,
    fit: "shrink",
  });
  addFooter(slide);
  validate(slide);
}

// 30
{
  const slide = pptx.addSlide();
  addImageCrop(slide, IMG.codeNeon, 0, 0, SLIDE_W, SLIDE_H, { cy: 0.06, ch: 0.82 });
  slide.addShape(SH.rect, { x: 0, y: 0, w: SLIDE_W, h: SLIDE_H, fill: { color: C.navy, transparency: 16 }, line: { transparency: 100 } });
  addLogo(slide, "mark");
  addBars(slide, 0.82, 0.78, 1.2, C.red);
  slide.addText("DEMO EN VIVO 2", { x: 1.54, y: 0.78, w: 4.1, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.5, bold: true, color: C.red, charSpace: 1.2, margin: 0 });
  slide.addText("Ahora construimos\nla landing.", {
    x: 0.84,
    y: 1.56,
    w: 5.4,
    h: 1.05,
    fontFace: TYPOGRAPHY.display,
    fontSize: 30,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  slide.addText("Abrir la página, buscar productos, armar lista y ver el super que conviene.", {
    x: 0.9,
    y: 3.05,
    w: 5.3,
    h: 0.42,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15.2,
    color: C.softBlue,
    margin: 0,
    fit: "shrink",
  });
  addPill(slide, "acción: Codex + navegador", 0.9, 4.0, 2.55, C.paleRed, C.red);
  addSlideNumber(slide, { fill: C.red, x: 12.12, y: 7.06 });
  validate(slide);
}

// 31
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addHeader(slide, "Revisión de la demo", "Qué debe funcionar antes de seguir", "Si esto falla, Power BI no tiene historia que analizar.");
  const checks = [
    ["Carga", "La página abre sin romperse."],
    ["Diseño", "Se entiende qué hace la app a primera vista."],
    ["Lista", "Se pueden agregar productos y verlos sumarse."],
    ["Confirmación", "El usuario recibe respuesta visible."],
    ["Datos", "La solicitud queda representada como objeto/fila."],
    ["Demo", "Se puede explicar en menos de 2 minutos."],
  ];
  checks.forEach((c, i) => {
    const x = 0.9 + (i % 2) * 5.94;
    const y = 1.94 + Math.floor(i / 2) * 1.18;
    addPanel(slide, { x, y, w: 5.42, h: 0.82, fill: i % 2 === 0 ? C.softBlue : C.warm, line: C.border, shadow: true });
    addBigNumber(slide, i + 1, x + 0.22, y + 0.2, i === 2 || i === 4 ? C.red : C.navy);
    slide.addText(c[0], { x: x + 0.84, y: y + 0.18, w: 1.8, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 13.5, bold: true, color: C.navy, margin: 0 });
    slide.addText(c[1], { x: x + 0.84, y: y + 0.48, w: 4.0, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 8.8, color: C.ink, margin: 0, fit: "shrink" });
  });
  addFooter(slide);
  validate(slide);
}

// 32
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Cierre del bloque", "La web ya puede producir información", "Ahora vamos a llevar 34 mil precios reales a Power BI para ver patrones.");
  addImageCrop(slide, IMG.dataDashboard, 0.86, 1.88, 4.55, 4.72, { cy: 0.04, ch: 0.86 });
  addCard(slide, {
    x: 5.84,
    y: 2.02,
    w: 5.92,
    h: 1.48,
    kicker: "YA TENEMOS",
    title: "Catálogo + lista",
    body: "La landing muestra precios y transforma una canasta en datos analizables.",
    accent: C.red,
    titleSize: 18.5,
    bodyY: 2.98,
    bodyH: 0.22,
    bodySize: 9.4,
    padX: 0.46,
    bodyPadX: 0.46,
  });
  addCard(slide, {
    x: 5.84,
    y: 3.98,
    w: 5.92,
    h: 1.48,
    kicker: "SIGUIENTE DEMO",
    title: "Convertir 34 mil precios en dashboard",
    body: "Cargamos el dataset real de Osorno y lo analizamos en Power BI.",
    accent: C.navy,
    titleSize: 18.5,
    bodyY: 4.94,
    bodyH: 0.22,
    bodySize: 9.4,
    padX: 0.46,
    bodyPadX: 0.46,
  });
  slide.addText("Si registramos cada compra y precio, podemos medir el ahorro real de Osorno.", {
    x: 5.88,
    y: 5.82,
    w: 5.7,
    h: 0.32,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16.5,
    bold: true,
    color: C.navy,
    margin: 0,
    fit: "shrink",
  });
  addFooter(slide);
  validate(slide);
}

// 33
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addImageCrop(slide, IMG.dataDashboard, 7.0, 0, 6.33, SLIDE_H, { cy: 0.04, ch: 0.86 });
  slide.addShape(SH.rect, { x: 7.0, y: 0, w: 6.33, h: SLIDE_H, fill: { color: C.navy, transparency: 46 }, line: { transparency: 100 } });
  addLogo(slide, "dark");
  addBars(slide, 0.86, 0.92, 1.3, C.red);
  slide.addText("BLOQUE 4", { x: 1.62, y: 0.9, w: 2.2, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.5, bold: true, color: C.red, margin: 0, charSpace: 1.2 });
  slide.addText("De precios\na decisiones", {
    x: 0.86,
    y: 1.72,
    w: 5.8,
    h: 1.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 33,
    bold: true,
    color: C.white,
    margin: 0,
    breakLine: false,
    fit: "shrink",
  });
  slide.addText("Ahora el comparador empieza a hablar con datos: supermercados, marcas, ahorro y categorías.", {
    x: 0.9,
    y: 3.34,
    w: 5.6,
    h: 0.42,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15,
    color: C.softBlue,
    margin: 0,
    fit: "shrink",
  });
  addPill(slide, "18 minutos · dataset + Power BI", 0.9, 4.12, 3.12, C.paleRed, C.red);
  addPanel(slide, { x: 4.22, y: 4.1, w: 1.62, h: 0.38, fill: C.white, line: C.paleRed, shadow: true });
  addImageContain(slide, LOGOS.powerbi, 4.36, 4.15, 0.24, 0.24);
  slide.addText("Power BI", { x: 4.68, y: 4.22, w: 0.84, h: 0.08, fontFace: TYPOGRAPHY.body, fontSize: 8, bold: true, color: C.navy, align: "center", margin: 0 });
  slide.addText("Con precios reales podemos medir cuál super conviene, en qué categoría y cuánto se ahorra.", {
    x: 0.9,
    y: 5.76,
    w: 5.75,
    h: 0.42,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  addSlideNumber(slide, { fill: C.red, x: 12.12, y: 7.06 });
  validate(slide);
}

// 34
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Antes de abrir Power BI", "El problema no son los gráficos", "El problema real es que los datos suelen estar dispersos, desordenados y difíciles de leer.");
  addImageContain(slide, LOGOS.powerbi, 0.96, 1.96, 0.72, 0.72);
  const pains = [
    ["Datos repartidos", "Precios en sitios distintos: Unimarc, Jumbo, Lider, Alvi, SantaIsabel."],
    ["Poca lectura", "Hay números, pero cuesta entender qué significan."],
    ["Decisiones lentas", "El negocio decide tarde porque no ve patrones a tiempo."],
  ];
  pains.forEach((item, i) => {
    const x = 2.04 + i * 3.46;
    addPanel(slide, { x, y: 1.78, w: 3.0, h: 2.06, fill: i === 1 ? C.softBlue : C.white, line: C.border, shadow: true });
    slide.addText(String(i + 1).padStart(2, "0"), { x: x + 0.26, y: 2.08, w: 0.42, h: 0.14, fontFace: TYPOGRAPHY.body, fontSize: 8.2, bold: true, color: C.red, margin: 0 });
    slide.addText(item[0], { x: x + 0.26, y: 2.4, w: 2.46, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 17.2, bold: true, color: C.navy, margin: 0, fit: "shrink" });
    slide.addText(item[1], { x: x + 0.26, y: 3.02, w: 2.36, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 10.2, color: C.ink, margin: 0, fit: "shrink" });
  });
  addPanel(slide, { x: 1.02, y: 4.74, w: 11.18, h: 1.1, fill: C.navy, line: C.navy, shadow: true });
  slide.addText("Power BI existe para acortar la distancia entre tener datos y entender qué hacer con ellos.", {
    x: 1.48,
    y: 5.08,
    w: 10.22,
    h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 19,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
    fit: "shrink",
  });
  addFooter(slide);
  validate(slide);
}

// 35
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addHeader(slide, "Qué es Power BI", "Una herramienta de inteligencia de negocios", "Permite conectar datos, prepararlos, visualizarlos y compartir lecturas para decidir mejor.");
  addPanel(slide, { x: 0.98, y: 1.86, w: 3.28, h: 3.92, fill: C.navy, line: C.navy, shadow: true });
  addImageContain(slide, LOGOS.powerbi, 2.2, 2.18, 0.82, 0.82);
  slide.addText("Business Intelligence", { x: 1.34, y: 3.32, w: 2.54, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 17.6, bold: true, color: C.white, align: "center", margin: 0 });
  slide.addText("Convertir datos operativos en información útil para el negocio.", { x: 1.34, y: 3.94, w: 2.54, h: 0.5, fontFace: TYPOGRAPHY.body, fontSize: 11.2, color: C.softBlue, align: "center", margin: 0, fit: "shrink" });
  const layers = [
    ["Conectar", "Traer datos desde Excel, CSV, bases de datos, web o servicios."],
    ["Preparar", "Limpiar columnas, ordenar campos y crear relaciones simples."],
    ["Visualizar", "Crear KPIs, gráficos, filtros y páginas de análisis."],
    ["Compartir", "Publicar lecturas para que otras personas puedan decidir."],
  ];
  layers.forEach((item, i) => {
    const x = 4.66 + (i % 2) * 3.74;
    const y = 1.96 + Math.floor(i / 2) * 1.82;
    addCard(slide, {
      x,
      y,
      w: 3.32,
      h: 1.34,
      kicker: `0${i + 1}`,
      title: item[0],
      body: item[1],
      accent: i === 1 || i === 3 ? C.navy : C.red,
      titleSize: 17,
      titleH: 0.28,
      bodyY: y + 0.86,
      bodyH: 0.28,
      bodySize: 8.8,
      padX: 0.42,
      bodyPadX: 0.42,
    });
  });
  slide.addText("No reemplaza el criterio: lo vuelve visible y discutible.", {
    x: 4.84,
    y: 5.74,
    w: 6.7,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17.4,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  addFooter(slide);
  validate(slide);
}

// 36
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Para qué sirve", "De operación diaria a tablero de decisiones", "Power BI ayuda a mirar el negocio desde distintas preguntas, no desde una tabla interminable.");
  addPanel(slide, { x: 0.92, y: 1.92, w: 3.38, h: 3.58, fill: C.navy, line: C.navy, shadow: true });
  slide.addShape(SH.rect, { x: 1.26, y: 2.34, w: 0.1, h: 2.7, fill: { color: C.red }, line: { color: C.red } });
  addImageContain(slide, LOGOS.powerbi, 2.24, 2.28, 0.78, 0.78);
  slide.addText("Un tablero", { x: 1.58, y: 3.36, w: 2.1, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 22, bold: true, color: C.white, align: "center", margin: 0 });
  slide.addText("para mirar el negocio desde varios ángulos", { x: 1.52, y: 3.92, w: 2.18, h: 0.44, fontFace: TYPOGRAPHY.body, fontSize: 11.2, color: C.softBlue, align: "center", margin: 0, fit: "shrink" });
  addPill(slide, "datos -> preguntas -> decisiones", 1.44, 4.72, 2.34, C.paleRed, C.red);

  const groups = [
    {
      label: "Lectura operativa",
      x: 4.76,
      accent: C.navy,
      items: [
        ["Por super", "¿Cuál super es el más barato esta semana?"],
        ["Por categoría", "¿Dónde se concentra el mayor ahorro?"],
        ["Por marca", "¿Qué marcas son más baratas en cada super?"],
      ],
    },
    {
      label: "Lectura comercial",
      x: 8.6,
      accent: C.red,
      items: [
        ["Canasta", "¿Cuánto cuesta lo esencial en cada super?"],
        ["Variación", "¿Qué productos cambian más de precio?"],
        ["Estrategia", "¿Conviene partir la compra entre dos super?"],
      ],
    },
  ];
  groups.forEach((group) => {
    slide.addText(group.label.toUpperCase(), { x: group.x, y: 1.94, w: 2.94, h: 0.15, fontFace: TYPOGRAPHY.body, fontSize: 8.2, bold: true, color: group.accent, charSpace: 0.8, align: "center", margin: 0 });
    group.items.forEach((item, i) => {
      const y = 2.38 + i * 0.94;
      addPanel(slide, { x: group.x, y, w: 3.02, h: 0.72, fill: i === 1 ? C.softBlue : C.white, line: C.border, shadow: true });
      slide.addShape(SH.rect, { x: group.x + 0.2, y: y + 0.16, w: 0.07, h: 0.4, fill: { color: group.accent }, line: { color: group.accent } });
      slide.addText(item[0], { x: group.x + 0.42, y: y + 0.16, w: 1.16, h: 0.16, fontFace: TYPOGRAPHY.display, fontSize: 12.2, bold: true, color: C.navy, margin: 0, fit: "shrink" });
      slide.addText(item[1], { x: group.x + 0.42, y: y + 0.42, w: 2.3, h: 0.11, fontFace: TYPOGRAPHY.body, fontSize: 7.9, color: C.ink, margin: 0, fit: "shrink" });
    });
  });
  addArrow(slide, 4.3, 3.08, 4.62, 3.08, C.red);
  addArrow(slide, 4.3, 4.0, 4.62, 4.0, C.red);
  addPanel(slide, { x: 1.12, y: 5.82, w: 10.94, h: 0.58, fill: C.paleRed, line: C.paleRed, shadow: false });
  slide.addText("En la charla lo usaremos con precios reales de Osorno, pero la lógica sirve para cualquier negocio con datos.", {
    x: 1.5,
    y: 6.02,
    w: 10.1,
    h: 0.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.6,
    bold: true,
    color: C.red,
    align: "center",
    margin: 0,
    fit: "shrink",
  });
  addFooter(slide);
  validate(slide);
}

// 37
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addHeader(slide, "La idea central", "Un dashboard no es una lámina bonita", "Un buen dashboard traduce datos en señales: algo que puedo mirar, comparar y actuar.");
  const stages = [
    ["Dato", "Precio individual", "Pasta Carozzi · Unimarc · $2.050"],
    ["Indicador", "Resumen medible", "34.398 precios · 6 supermercados"],
    ["Patrón", "Comparación visible", "Unimarc lidera abarrotes · Jumbo en lácteos"],
    ["Decisión", "Acción concreta", "Comprar abarrotes en X y lácteos en Y"],
  ];
  stages.forEach((item, i) => {
    const x = 0.86 + i * 3.05;
    addPanel(slide, { x, y: 2.1, w: 2.72, h: 2.12, fill: i === 3 ? C.navy : i % 2 === 0 ? C.softBlue : C.warm, line: i === 3 ? C.navy : C.border, shadow: true });
    addBigNumber(slide, i + 1, x + 0.22, 2.36, i === 3 ? C.red : C.navy);
    slide.addText(item[0], { x: x + 0.22, y: 2.98, w: 2.26, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 16.8, bold: true, color: i === 3 ? C.white : C.navy, align: "center", margin: 0 });
    slide.addText(item[1], { x: x + 0.26, y: 3.44, w: 2.18, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 9.2, bold: true, color: i === 3 ? C.softBlue : C.ink, align: "center", margin: 0, fit: "shrink" });
    slide.addText(item[2], { x: x + 0.26, y: 3.74, w: 2.18, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 8.1, color: i === 3 ? C.softBlue : C.slate, align: "center", margin: 0, fit: "shrink" });
    if (i < stages.length - 1) addArrow(slide, x + 2.76, 3.16, x + 2.98, 3.16, C.red);
  });
  slide.addText("La herramienta existe porque las organizaciones no necesitan solo guardar datos: necesitan entenderlos rápido.", {
    x: 1.18,
    y: 5.56,
    w: 10.9,
    h: 0.32,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18.2,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
    fit: "shrink",
  });
  addFooter(slide);
  validate(slide);
}

// 34
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addHeader(slide, "Power BI en simple", "De tabla a conversación de negocio", "La herramienta conecta datos, visualizaciones y decisiones en un mismo lugar.");
  addImageContain(slide, LOGOS.powerbi, 1.02, 2.02, 0.84, 0.84);
  addCard(slide, {
    x: 2.08,
    y: 1.82,
    w: 3.02,
    h: 1.22,
    kicker: "01 · DATOS",
    title: "Importar",
    body: "CSV con 34 mil precios reales: producto, marca, super, ahorro.",
    accent: C.red,
    titleSize: 16.5,
    titleH: 0.26,
    bodyY: 2.68,
    bodyH: 0.22,
    bodySize: 8.4,
  });
  addArrow(slide, 5.28, 2.42, 5.72, 2.42, C.red);
  addCard(slide, {
    x: 5.84,
    y: 1.82,
    w: 3.02,
    h: 1.22,
    kicker: "02 · MODELO",
    title: "Ordenar",
    body: "Definir campos: producto, marca, super, categoría y ahorro.",
    accent: C.navy,
    titleSize: 16.5,
    titleH: 0.26,
    bodyY: 2.68,
    bodyH: 0.22,
    bodySize: 8.4,
  });
  addArrow(slide, 9.04, 2.42, 9.48, 2.42, C.red);
  addCard(slide, {
    x: 9.6,
    y: 1.82,
    w: 2.86,
    h: 1.22,
    kicker: "03 · VISUAL",
    title: "Ver",
    body: "Gráficos, filtros y KPIs que resumen lo importante.",
    accent: C.red,
    titleSize: 16.5,
    titleH: 0.26,
    bodyY: 2.68,
    bodyH: 0.22,
    bodySize: 8.4,
  });
  addPanel(slide, { x: 1.02, y: 4.08, w: 11.24, h: 1.32, fill: C.navy, line: C.navy, shadow: true });
  slide.addText("Power BI no es solo “hacer gráficos”.", {
    x: 1.42,
    y: 4.42,
    w: 5.0,
    h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 19,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Es una forma de transformar registros sueltos en lectura de negocio: qué pasa, dónde pasa y qué conviene hacer.", {
    x: 1.42,
    y: 4.88,
    w: 9.9,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.8,
    color: C.softBlue,
    margin: 0,
    fit: "shrink",
  });
  slide.addText("En esta demo: precios reales de Osorno -> dashboard -> decisión de compra.", {
    x: 1.02,
    y: 5.98,
    w: 11.2,
    h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  addFooter(slide);
  validate(slide);
}

// 35
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Datos reales de Osorno", "34.398 precios scrapeados de 6 supermercados", "Una fila muestra un caso. Miles de filas muestran patrones reales.");
  const rows = [
    ["Pasta Carozzi 400g", "Unimarc", "Abarrotes", "$2.050", "más barato", "ahorras $810"],
    ["Pasta Carozzi 400g", "Jumbo", "Abarrotes", "$2.860", "más caro", "—"],
    ["Coca Cola 1.5L", "Lider", "Bebidas", "$1.690", "más barato", "ahorras $310"],
    ["Aceite Maravilla", "Alvi", "Abarrotes", "$2.490", "más barato", "ahorras $640"],
  ];
  rows.forEach((row, r) => {
    const x = 0.95 + (r % 2) * 5.88;
    const y = 1.96 + Math.floor(r / 2) * 1.84;
    addPanel(slide, { x, y, w: 5.42, h: 1.34, fill: r % 2 === 0 ? C.softBlue : C.warm, line: C.border, shadow: true });
    slide.addText(row[0], { x: x + 0.28, y: y + 0.22, w: 0.72, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 8.4, bold: true, color: C.red, margin: 0 });
    slide.addText(row[1], { x: x + 1.08, y: y + 0.18, w: 1.55, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 15.2, bold: true, color: C.navy, margin: 0, fit: "shrink" });
    addPill(slide, row[4], x + 3.82, y + 0.16, 1.32, row[4] === "más barato" ? C.successSoft : C.paleRed, row[4] === "más barato" ? C.success : C.red);
    slide.addText(`${row[2]}`, { x: x + 0.28, y: y + 0.66, w: 2.35, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 10.2, bold: true, color: C.ink, margin: 0, fit: "shrink" });
    slide.addText(`Precio: ${row[3]}`, { x: x + 2.86, y: y + 0.66, w: 1.92, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 9.4, color: C.ink, margin: 0, fit: "shrink" });
    slide.addText(row[5], { x: x + 0.28, y: y + 1.02, w: 4.7, h: 0.14, fontFace: TYPOGRAPHY.body, fontSize: 8.7, color: C.slate, margin: 0 });
  });
  slide.addText("El campo clave es ahorro_clp: revela cuánto cuesta NO comparar antes de comprar.", {
    x: 1.2,
    y: 5.72,
    w: 10.3,
    h: 0.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15.2,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  addFooter(slide);
  validate(slide);
}

// 35
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addHeader(slide, "Preguntas de negocio", "Qué puede descubrir el dashboard", "Power BI no es decoración: responde preguntas concretas del negocio.");
  const questions = [
    ["Ranking", "¿Qué super es el más barato en abarrotes?"],
    ["Categoría", "¿Dónde hay mayor diferencia: bebidas, lácteos, abarrotes?"],
    ["Marca", "¿Qué marcas son las más baratas en cada super?"],
    ["Variación", "¿Qué productos cambian más de precio?"],
    ["Canasta", "¿Cuánto cuesta lo esencial en cada super?"],
    ["Ahorro", "¿Conviene partir la compra entre dos super?"],
  ];
  questions.forEach((q, i) => {
    const x = 0.9 + (i % 2) * 5.94;
    const y = 1.92 + Math.floor(i / 2) * 1.52;
    addPanel(slide, { x, y, w: 5.42, h: 1.32, fill: i % 2 === 0 ? C.softBlue : C.warm, line: C.border, shadow: true });
    addBigNumber(slide, i + 1, x + 0.32, y + 0.36, i === 0 || i === 2 ? C.red : C.navy);
    slide.addText(q[0], { x: x + 0.96, y: y + 0.32, w: 4.0, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: C.navy, margin: 0, fit: "shrink" });
    slide.addText(q[1], { x: x + 0.96, y: y + 0.74, w: 4.18, h: 0.42, fontFace: TYPOGRAPHY.body, fontSize: 11.6, color: C.ink, margin: 0, fit: "shrink" });
  });
  addFooter(slide);
  validate(slide);
}

// 36
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Dashboard", "Qué vamos a construir en Power BI", "Pocas visualizaciones, pero con lectura de negocio clara.");
  const visuals = [
    ["KPI", "Total de productos"],
    ["KPI", "Ahorro promedio %"],
    ["Barra", "Super más barato por categoría"],
    ["Barra", "Top productos con mayor ahorro"],
    ["Dona", "Distribución de marcas más baratas"],
    ["Filtro", "Super / categoría / marca"],
  ];
  visuals.forEach((v, i) => {
    const x = 0.9 + (i % 3) * 4.02;
    const y = 1.96 + Math.floor(i / 3) * 1.7;
    addCard(slide, {
      x,
      y,
      w: 3.52,
      h: 1.5,
      kicker: v[0],
      title: v[1],
      body: i < 2 ? "Indicador rápido para abrir lectura." : "Visual para comparar patrones.",
      accent: i === 2 ? C.red : C.navy,
      titleSize: 16.5,
      titleH: 0.36,
      bodyY: y + 1.0,
      bodyH: 0.4,
      bodySize: 10.2,
      padX: 0.46,
      bodyPadX: 0.46,
    });
  });
  addPanel(slide, { x: 1.16, y: 5.62, w: 10.94, h: 0.92, fill: C.navy, line: C.navy, shadow: true });
  slide.addText("La pregunta más interesante: ¿en qué super deberías hacer la compra del mes?", {
    x: 1.52,
    y: 5.9,
    w: 10.2,
    h: 0.42,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16.4,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
    fit: "shrink",
  });
  addFooter(slide);
  validate(slide);
}

// 37
{
  const slide = pptx.addSlide();
  addImageCrop(slide, IMG.dataDashboard, 0, 0, SLIDE_W, SLIDE_H, { cy: 0.04, ch: 0.86 });
  slide.addShape(SH.rect, { x: 0, y: 0, w: SLIDE_W, h: SLIDE_H, fill: { color: C.navy, transparency: 18 }, line: { transparency: 100 } });
  addLogo(slide, "mark");
  addBars(slide, 0.82, 0.78, 1.2, C.red);
  slide.addText("DEMO EN VIVO 3", { x: 1.54, y: 0.78, w: 4.1, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.5, bold: true, color: C.red, charSpace: 1.2, margin: 0 });
  slide.addText("Abrimos Power BI.\nCargamos datos.\nMiramos el negocio.", {
    x: 0.84,
    y: 1.56,
    w: 5.78,
    h: 1.36,
    fontFace: TYPOGRAPHY.display,
    fontSize: 29,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  slide.addText("El foco no es hacer un dashboard enorme. Es mostrar cómo los datos cambian la conversación.", {
    x: 0.9,
    y: 3.38,
    w: 5.5,
    h: 0.42,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15,
    color: C.softBlue,
    margin: 0,
    fit: "shrink",
  });
  addPill(slide, "acción: cargar CSV y filtrar", 0.9, 4.3, 2.72, C.paleRed, C.red);
  addSlideNumber(slide, { fill: C.red, x: 12.12, y: 7.06 });
  validate(slide);
}

// 38
{
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addHeader(slide, "Lectura del dashboard", "De gráfico a decisión", "El valor aparece cuando traducimos visualizaciones en acciones.");
  const decisions = [
    ["Si Unimarc lidera en abarrotes", "Hacer ahí la compra base del mes."],
    ["Si Lider tiene mejores precios en lácteos", "Sumar un viaje específico para ese rubro."],
    ["Si la diferencia promedio supera 15%", "Vale la pena partir la compra entre dos super."],
    ["Si una marca cambia de precio bruscamente", "Avisar al usuario antes de que compre."],
  ];
  decisions.forEach((d, i) => {
    const x = 0.92 + (i % 2) * 5.96;
    const y = 2.0 + Math.floor(i / 2) * 1.58;
    addCard(slide, {
      x,
      y,
      w: 5.42,
      h: 1.12,
      kicker: `LECTURA ${i + 1}`,
      title: d[0],
      body: d[1],
      accent: i === 0 ? C.red : C.navy,
      titleSize: 14.8,
      titleH: 0.28,
      bodyY: y + 0.82,
      bodyH: 0.18,
      bodySize: 8.7,
      padX: 0.42,
      bodyPadX: 0.42,
    });
  });
  slide.addText("El dashboard no decide solo. Ayuda a ver dónde conviene actuar.", {
    x: 1.02,
    y: 5.66,
    w: 11.2,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 20,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  addFooter(slide);
  validate(slide);
}

// 39
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Cierre del bloque", "La idea ya tiene modelo de negocio", "No es solo una web: es una herramienta que puede ahorrarle plata a cualquier familia de Osorno.");
  addImageCrop(slide, IMG.retailLaptop, 0.86, 1.88, 4.55, 4.72, { cy: 0.04, ch: 0.86 });
  addCard(slide, {
    x: 5.84,
    y: 2.02,
    w: 5.92,
    h: 1.38,
    kicker: "ANTES",
    title: "Una pregunta cotidiana",
    body: "¿En qué super conviene comprar lo de la semana?",
    accent: C.navy,
    titleSize: 18.5,
    bodyY: 2.96,
    bodyH: 0.18,
    bodySize: 9.4,
    padX: 0.46,
    bodyPadX: 0.46,
  });
  addCard(slide, {
    x: 5.84,
    y: 3.82,
    w: 5.92,
    h: 1.52,
    kicker: "AHORA",
    title: "Una app que decide por ti",
    body: "Compara precios reales y te dice dónde comprar para ahorrar más.",
    accent: C.red,
    titleSize: 18.5,
    bodyY: 4.8,
    bodyH: 0.22,
    bodySize: 9.4,
    padX: 0.46,
    bodyPadX: 0.46,
  });
  slide.addText("El producto ya no solo se ve bien: empieza a explicar el negocio.", {
    x: 5.88,
    y: 5.88,
    w: 5.7,
    h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16.5,
    bold: true,
    color: C.navy,
    margin: 0,
    fit: "shrink",
  });
  addFooter(slide);
  validate(slide);
}

// 40
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addLogo(slide, "dark");
  addBars(slide, 0.86, 0.78, 1.3, C.red);
  slide.addText("CIERRE", { x: 1.62, y: 0.78, w: 2.2, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.5, bold: true, color: C.red, margin: 0, charSpace: 1.2 });
  slide.addText("Lo que acabamos de construir", {
    x: 0.86,
    y: 1.48,
    w: 6.2,
    h: 0.62,
    fontFace: TYPOGRAPHY.display,
    fontSize: 31,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  const flow = ["Idea", "Diseño IA", "Web", "Catálogo", "Lista", "Power BI"];
  flow.forEach((item, i) => {
    const x = 0.9 + i * 1.96;
    addPanel(slide, { x, y: 3.0, w: 1.48, h: 1.04, fill: i % 2 === 0 ? C.softBlue : C.warm, line: C.border, shadow: true });
    addBigNumber(slide, i + 1, x + 0.52, 3.16, i === 0 || i === 5 ? C.red : C.navy);
    slide.addText(item, { x: x + 0.12, y: 3.72, w: 1.24, h: 0.14, fontFace: TYPOGRAPHY.body, fontSize: 8.2, bold: true, color: C.navy, align: "center", margin: 0, fit: "shrink" });
    if (i < flow.length - 1) addArrow(slide, x + 1.5, 3.52, x + 1.9, 3.52, C.red);
  });
  slide.addText("No fue una herramienta aislada. Fue una cadena de creación digital.", {
    x: 1.0,
    y: 5.46,
    w: 10.8,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 20,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addText("Diseñar, programar, capturar datos y decidir: ese es el tipo de problema que se aprende a resolver estudiando tecnología.", {
    x: 1.5,
    y: 6.02,
    w: 9.8,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.2,
    color: C.softBlue,
    align: "center",
    margin: 0,
    fit: "shrink",
  });
  addSlideNumber(slide, { fill: C.red, x: 12.12, y: 7.06 });
  validate(slide);
}

// 41
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addHeader(slide, "Qué hay detrás", "Programar no es solo escribir código", "La parte interesante es conectar intención, herramientas y criterio.");
  addCard(slide, { x: 0.9, y: 2.0, w: 3.62, h: 2.8, kicker: "CREAR", title: "Diseño de producto", body: "Transformar una idea en una experiencia que alguien pueda usar.", accent: C.red, titleSize: 20, bodyY: 3.22, bodyH: 0.42, bodySize: 10.4, padX: 0.48, bodyPadX: 0.48 });
  addCard(slide, { x: 4.86, y: 2.0, w: 3.62, h: 2.8, kicker: "CONSTRUIR", title: "Implementación", body: "Convertir esa experiencia en archivos, lógica e interacción real.", accent: C.navy, titleSize: 20, bodyY: 3.22, bodyH: 0.42, bodySize: 10.4, padX: 0.48, bodyPadX: 0.48 });
  addCard(slide, { x: 8.82, y: 2.0, w: 3.62, h: 2.8, kicker: "DECIDIR", title: "Datos", body: "Medir lo que ocurre y usarlo para mejorar el negocio.", accent: C.red, titleSize: 20, bodyY: 3.22, bodyH: 0.42, bodySize: 10.4, padX: 0.48, bodyPadX: 0.48 });
  slide.addText("La IA acelera. El criterio técnico dirige.", { x: 1.0, y: 5.72, w: 11.3, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 22, bold: true, color: C.navy, align: "center", margin: 0 });
  addFooter(slide);
  validate(slide);
}

// 42
{
  const slide = pptx.addSlide();
  addImageCrop(slide, IMG.youngCoders, 0, 0, SLIDE_W, SLIDE_H, { cy: 0.02, ch: 0.8 });
  slide.addShape(SH.rect, { x: 0, y: 0, w: SLIDE_W, h: SLIDE_H, fill: { color: C.navy, transparency: 18 }, line: { transparency: 100 } });
  addLogo(slide, "mark");
  addBars(slide, 0.82, 0.78, 1.2, C.red);
  slide.addText("PREGUNTA FINAL", { x: 1.54, y: 0.78, w: 4.1, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.5, bold: true, color: C.red, charSpace: 1.2, margin: 0 });
  slide.addText("Si pudieras crear una solución así,\n¿para qué negocio la harías?", {
    x: 0.84,
    y: 1.58,
    w: 6.3,
    h: 1.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 30,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  ["barbería", "cafetería", "gimnasio", "tienda", "emprendimiento"].forEach((word, i) => {
    addPill(slide, word, 0.9 + i * 1.36, 3.48, 1.14, i === 0 ? C.paleRed : C.softBlue, i === 0 ? C.red : C.navy);
  });
  slide.addText("El punto no es copiar este ejemplo. Es ver que una idea puede convertirse en producto.", {
    x: 0.9,
    y: 5.72,
    w: 5.6,
    h: 0.42,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15,
    color: C.softBlue,
    margin: 0,
    fit: "shrink",
  });
  addSlideNumber(slide, { fill: C.red, x: 12.12, y: 7.06 });
  validate(slide);
}

// 43
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addLogo(slide, "dark");
  addBars(slide, 0.86, 0.88, 1.32, C.red);
  slide.addText("CIERRE", { x: 1.62, y: 0.88, w: 2.2, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.5, bold: true, color: C.red, margin: 0, charSpace: 1.2 });
  slide.addText("La próxima app\npuede ser tuya.", {
    x: 0.86,
    y: 1.74,
    w: 6.1,
    h: 1.16,
    fontFace: TYPOGRAPHY.display,
    fontSize: 34,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  slide.addText("Si te interesa crear productos, automatizar procesos, trabajar con IA, construir sitios o entender datos, programación es un camino que vale la pena mirar en serio.", {
    x: 0.92,
    y: 3.42,
    w: 6.3,
    h: 0.8,
    fontFace: TYPOGRAPHY.body,
    fontSize: 16,
    color: C.softBlue,
    margin: 0,
    fit: "shrink",
  });
  addPanel(slide, { x: 7.48, y: 1.48, w: 4.26, h: 4.38, fill: "10243A", line: "1D3852", shadow: true });
  slide.addShape(SH.rect, { x: 7.84, y: 1.86, w: 0.1, h: 3.1, fill: { color: C.red }, line: { color: C.red } });
  const closeIdeas = [
    ["01", "Pensar una idea", "Detectar un problema cercano."],
    ["02", "Construir una versión", "Usar IA, código y criterio."],
    ["03", "Medir lo que pasa", "Leer datos para mejorar."],
  ];
  closeIdeas.forEach((item, i) => {
    const y = 1.82 + i * 1.12;
    slide.addText(item[0], { x: 8.18, y, w: 0.36, h: 0.14, fontFace: TYPOGRAPHY.body, fontSize: 8, bold: true, color: C.red, margin: 0 });
    slide.addText(item[1], { x: 8.62, y: y - 0.02, w: 2.55, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.white, margin: 0, fit: "shrink" });
    slide.addText(item[2], { x: 8.62, y: y + 0.36, w: 2.58, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 9.4, color: C.softBlue, margin: 0, fit: "shrink" });
  });
  addPanel(slide, { x: 8.2, y: 5.18, w: 2.82, h: 0.42, fill: C.paleRed, line: C.paleRed, shadow: false });
  slide.addText("Tu próxima demo puede partir hoy", { x: 8.38, y: 5.33, w: 2.46, h: 0.1, fontFace: TYPOGRAPHY.body, fontSize: 8.2, bold: true, color: C.red, align: "center", margin: 0 });
  slide.addText("Crear · construir · medir · mejorar", {
    x: 0.92,
    y: 5.58,
    w: 5.4,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 20,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addSlideNumber(slide, { fill: C.red, x: 12.12, y: 7.06 });
  validate(slide);
}

pptx.writeFile({ fileName: outputPptx });
