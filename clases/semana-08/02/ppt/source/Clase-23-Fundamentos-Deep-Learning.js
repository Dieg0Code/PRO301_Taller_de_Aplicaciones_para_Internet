const path = require("path");
const PptxGenJS = require("../../../../../tools/slides-system/node_modules/pptxgenjs");
const slidesSystem = require("../../../../../tools/slides-system");

const { theme, components, utils } = slidesSystem;
const { applyAiepTheme, TOKENS: C, TYPOGRAPHY } = theme;
const {
  addHeader: systemAddHeader,
  addCard,
  addMiniCard,
  addCenterStatement,
  addFormulaPanel,
  addSymbolLegend,
  addBiologicalToArtificialMap,
  addPerceptronDiagram,
  addWeightedSumBreakdown,
  addNetworkLayersDiagram,
} = components;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";

applyAiepTheme(pptx, {
  author: "Diego Obando",
  company: "AIEP",
  subject: "Clase 23",
  title: "Fundamentos de deep learning: neuronas, perceptrón, entrenamiento y generalización",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx = path.join(rootDir, "Clase-23-Fundamentos-Deep-Learning-parcial.pptx");

const logoPath = path.resolve(__dirname, "../../../../../.agent/skills/slides-aiep/assets/logo-aiep.png");
const logoMarkPath = path.resolve(__dirname, "../../../../../.agent/skills/slides-aiep/assets/logo-aiep-mark.png");

function addHeader(slide, title, subtitle, blockLabel = "Contexto", pptxLike = pptx) {
  systemAddHeader(slide, SH, pptxLike, title, subtitle, blockLabel, {
    classLabel: `Clase 23 · ${blockLabel}`,
    titleY: 0.94,
    titleH: 0.68,
    subtitleY: 1.68,
    subtitleH: 0.28,
    subtitleW: 9.2,
    subtitleFontSize: 10.4,
    logoMarkPath,
    mark: { fill: C.softNeutral },
  });
}

function addBarsMotif(slide, x, y, scale = 1, fill = C.red) {
  slide.addShape(SH.rect, { x, y: y + 0.18 * scale, w: 0.2 * scale, h: 0.46 * scale, fill: { color: fill }, line: { color: fill } });
  slide.addShape(SH.rect, { x: x + 0.24 * scale, y, w: 0.24 * scale, h: 0.64 * scale, fill: { color: fill }, line: { color: fill } });
  slide.addShape(SH.rect, { x: x + 0.52 * scale, y: y + 0.18 * scale, w: 0.2 * scale, h: 0.46 * scale, fill: { color: fill }, line: { color: fill } });
}

function addStatementBand(slide, text, opts = {}) {
  const x = opts.x ?? 0.86;
  const y = opts.y ?? 5.88;
  const w = opts.w ?? 10.9;
  const h = opts.h ?? 0.56;
  slide.addShape(SH.roundRect, {
    x, y, w, h,
    rectRadius: 0.04,
    fill: { color: opts.fill || C.navy },
    line: { color: opts.fill || C.navy },
  });
  slide.addText(text, {
    x: x + 0.22,
    y: y + 0.15,
    w: w - 0.44,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.fontSize || 14.8,
    bold: true,
    color: opts.color || C.white,
    align: "center",
    margin: 0,
  });
}

function addPlainPanel(slide, opts = {}) {
  slide.addShape(SH.roundRect, {
    x: opts.x,
    y: opts.y,
    w: opts.w,
    h: opts.h,
    rectRadius: opts.rectRadius || 0.04,
    fill: { color: opts.fill || C.white },
    line: { color: opts.line || C.border, pt: opts.linePt || 1 },
  });
  if (opts.accent) {
    slide.addShape(SH.rect, {
      x: opts.x + 0.12,
      y: opts.y + 0.16,
      w: 0.12,
      h: opts.h - 0.32,
      fill: { color: opts.accent },
      line: { color: opts.accent },
    });
  }
}

function addSafeLine(slide, x1, y1, x2, y2, opts = {}) {
  const w = x2 - x1;
  const h = y2 - y1;
  slide.addShape(SH.line, {
    x: w < 0 ? x2 : x1,
    y: h < 0 ? y2 : y1,
    w: Math.abs(w),
    h: Math.abs(h),
    flipH: w * h < 0,
    line: {
      color: opts.color || C.red,
      pt: opts.pt || 1.6,
      beginArrowType: opts.beginArrowType || "none",
      endArrowType: opts.endArrowType || "none",
      dash: opts.dash,
    },
  });
}

function addBiologicalNeuronDiagram(slide, opts = {}) {
  const x = opts.x;
  const y = opts.y;
  const w = opts.w;
  const h = opts.h;
  addPlainPanel(slide, { x, y, w, h, fill: C.white, accent: C.navy });

  const neuronFill = "F2A0A8";
  const neuronLine = "B65A66";
  const neuronDark = "C56B76";
  const neuronLight = "F8C4CA";
  const nucleus = "8A3E4D";
  const myelinFill = "F0C44D";
  const myelinLine = "BF7F1E";
  const soma = { cx: x + 1.82, cy: y + 2.02 };

  const dendrites = [
    { root: [soma.cx - 0.34, soma.cy - 0.36], joint: [x + 1.06, y + 1.12], tips: [[x + 0.48, y + 0.48], [x + 0.72, y + 0.88], [x + 0.52, y + 1.42], [x + 1.2, y + 0.54]] },
    { root: [soma.cx - 0.52, soma.cy - 0.04], joint: [x + 0.88, y + 2.02], tips: [[x + 0.34, y + 1.66], [x + 0.28, y + 2.3], [x + 0.68, y + 2.68], [x + 0.46, y + 2.0]] },
    { root: [soma.cx - 0.28, soma.cy + 0.44], joint: [x + 1.08, y + 3.0], tips: [[x + 0.48, y + 3.54], [x + 0.92, y + 3.38], [x + 0.62, y + 2.9], [x + 1.34, y + 3.46]] },
    { root: [soma.cx + 0.02, soma.cy - 0.56], joint: [x + 1.78, y + 0.88], tips: [[x + 1.42, y + 0.38], [x + 2.02, y + 0.34], [x + 2.32, y + 0.76]] },
  ];
  dendrites.forEach((d) => {
    addSafeLine(slide, d.root[0], d.root[1], d.joint[0], d.joint[1], { color: neuronLine, pt: 2.45 });
    d.tips.forEach((tip) => {
      addSafeLine(slide, d.joint[0], d.joint[1], tip[0], tip[1], { color: neuronLine, pt: 1.35 });
      slide.addShape(SH.ellipse, { x: tip[0] - 0.04, y: tip[1] - 0.04, w: 0.08, h: 0.08, fill: { color: neuronLight }, line: { color: neuronLine, pt: 0.7 } });
    });
  });

  slide.addShape(SH.ellipse, {
    x: soma.cx - 0.76,
    y: soma.cy - 0.48,
    w: 1.42,
    h: 1.08,
    fill: { color: "B85B66", transparency: 84 },
    line: { color: "B85B66", transparency: 100 },
  });
  slide.addShape(SH.ellipse, {
    x: soma.cx - 0.74,
    y: soma.cy - 0.62,
    w: 1.48,
    h: 1.18,
    fill: { color: neuronFill, transparency: 4 },
    line: { color: neuronLine, pt: 1.7 },
  });
  slide.addShape(SH.ellipse, {
    x: soma.cx - 0.58,
    y: soma.cy - 0.42,
    w: 1.08,
    h: 0.72,
    fill: { color: "F7B6BE", transparency: 42 },
    line: { color: "B65A66", pt: 0.9, transparency: 35 },
  });
  slide.addShape(SH.arc, {
    x: soma.cx - 0.44,
    y: soma.cy - 0.26,
    w: 0.98,
    h: 0.58,
    adjustPoint: 0.35,
    line: { color: "AA4D5B", pt: 1.2, transparency: 15 },
  });
  slide.addShape(SH.ellipse, {
    x: soma.cx - 0.25,
    y: soma.cy - 0.24,
    w: 0.5,
    h: 0.45,
    fill: { color: nucleus, transparency: 3 },
    line: { color: "6F2634", pt: 1 },
  });

  const axon = [
    [soma.cx + 0.62, soma.cy - 0.02, x + 2.72, y + 1.98],
    [x + 2.72, y + 1.98, x + 3.62, y + 2.06],
    [x + 3.62, y + 2.06, x + 4.68, y + 1.9],
  ];
  axon.forEach((segment) => addSafeLine(slide, segment[0], segment[1], segment[2], segment[3], { color: neuronDark, pt: 3.2 }));

  const sheaths = [
    { x: x + 2.58, y: y + 1.76, rot: 7 },
    { x: x + 3.1, y: y + 1.84, rot: 7 },
    { x: x + 3.64, y: y + 1.76, rot: -8 },
  ];
  sheaths.forEach((seg) => {
    slide.addShape(SH.roundRect, {
      x: seg.x,
      y: seg.y,
      w: 0.48,
      h: 0.38,
      rotate: seg.rot,
      rectRadius: 0.08,
      fill: { color: myelinFill },
      line: { color: myelinLine, pt: 1 },
    });
    slide.addShape(SH.arc, {
      x: seg.x + 0.04,
      y: seg.y + 0.06,
      w: 0.38,
      h: 0.16,
      rotate: seg.rot,
      line: { color: "FFE293", pt: 1.1, transparency: 10 },
    });
    slide.addShape(SH.ellipse, {
      x: seg.x + 0.14,
      y: seg.y + 0.13,
      w: 0.14,
      h: 0.09,
      rotate: seg.rot,
      fill: { color: nucleus, transparency: 15 },
      line: { color: myelinLine, pt: 0.4 },
    });
  });

  const terminalRoot = [x + 4.68, y + 1.9];
  const terminalBranches = [
    [terminalRoot[0], terminalRoot[1], x + 5.06, y + 1.26],
    [terminalRoot[0], terminalRoot[1], x + 5.22, y + 1.78],
    [terminalRoot[0], terminalRoot[1], x + 5.04, y + 2.38],
    [terminalRoot[0] - 0.08, terminalRoot[1] + 0.04, x + 4.86, y + 2.82],
  ];
  terminalBranches.forEach((branch) => {
    addSafeLine(slide, branch[0], branch[1], branch[2], branch[3], { color: neuronLine, pt: 1.8 });
    slide.addShape(SH.ellipse, { x: branch[2] - 0.055, y: branch[3] - 0.055, w: 0.11, h: 0.11, fill: { color: neuronLight }, line: { color: neuronLine, pt: 0.8 } });
  });

  slide.addText("dendritas", { x: x + 0.34, y: y + 0.2, w: 1.22, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 11.5, bold: true, color: C.navy, margin: 0 });
  slide.addText("soma", { x: soma.cx - 0.34, y: soma.cy + 0.66, w: 0.72, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 10.5, bold: true, color: C.navy, align: "center", margin: 0 });
  slide.addText("axón", { x: x + 3.0, y: y + 2.42, w: 0.82, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 10.5, bold: true, color: C.red, align: "center", margin: 0 });
  slide.addText("mielina", { x: x + 3.16, y: y + 1.34, w: 0.94, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 9.6, bold: true, color: myelinLine, align: "center", margin: 0 });
  slide.addText("terminales", { x: x + 4.44, y: y + 3.08, w: 1.02, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 9.4, bold: true, color: C.slate, align: "center", margin: 0 });
}

function addStepCard(slide, opts) {
  addPlainPanel(slide, opts);
  const compact = opts.h <= 1.18;
  const bodyY = opts.bodyY ?? (compact ? opts.y + 0.78 : opts.y + 0.96);
  const bodyH = Math.max(0.12, opts.h - (bodyY - opts.y) - 0.12);
  slide.addText(opts.kicker || "", {
    x: opts.x + 0.34,
    y: opts.y + 0.2,
    w: opts.w - 0.5,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: opts.kickerFontSize || 8.4,
    bold: true,
    color: opts.kickerColor || C.slate,
    margin: 0,
  });
  slide.addText(opts.title || "", {
    x: opts.x + 0.34,
    y: opts.y + 0.48,
    w: opts.w - 0.52,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.titleFontSize || 15,
    bold: true,
    color: opts.titleColor || C.navy,
    margin: 0,
  });
  slide.addText(opts.body || "", {
    x: opts.x + 0.34,
    y: bodyY,
    w: opts.w - 0.52,
    h: bodyH,
    fontFace: TYPOGRAPHY.body,
    fontSize: opts.bodyFontSize || 10.6,
    color: opts.bodyColor || C.ink,
    margin: 0,
    valign: "top",
    breakLine: false,
  });
}

function addFollowUpQuestion(slide, opts) {
  slide.addShape(SH.roundRect, {
    x: opts.x,
    y: opts.y,
    w: opts.w,
    h: opts.h,
    rectRadius: 0.04,
    fill: { color: opts.fill || C.white },
    line: { color: opts.line || C.border, pt: 1 },
  });
  slide.addShape(SH.rect, {
    x: opts.x + 0.12,
    y: opts.y + 0.14,
    w: 0.13,
    h: opts.h - 0.28,
    fill: { color: opts.accent || C.red },
    line: { color: opts.accent || C.red },
  });
  slide.addText(opts.badge, {
    x: opts.x + 0.36,
    y: opts.y + 0.22,
    w: 0.48,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.5,
    bold: true,
    color: opts.accent || C.red,
    margin: 0,
  });
  slide.addText(opts.question, {
    x: opts.x + 0.86,
    y: opts.y + 0.2,
    w: opts.w - 1.12,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.3,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText(`Pista: ${opts.hint}`, {
    x: opts.x + 0.86,
    y: opts.y + 0.66,
    w: opts.w - 1.12,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.4,
    color: C.slate,
    margin: 0,
  });
}

function addDecisionBoundaryPlot(slide, opts = {}) {
  const x = opts.x;
  const y = opts.y;
  const w = opts.w;
  const h = opts.h;
  addPlainPanel(slide, {
    x,
    y,
    w,
    h,
    fill: opts.fill || C.white,
    line: opts.line || C.border,
    accent: opts.accent || C.navy,
  });
  slide.addText(opts.title || "Frontera de decisión", {
    x: x + 0.36,
    y: y + 0.2,
    w: w - 0.72,
    h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.5,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText(opts.subtitle || "una línea separa dos zonas", {
    x: x + 0.36,
    y: y + 0.56,
    w: w - 0.72,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.8,
    color: C.slate,
    margin: 0,
  });
  const px = x + 0.58;
  const py = y + 1.02;
  const pw = w - 1.0;
  const ph = h - 1.42;
  slide.addShape(SH.rect, {
    x: px,
    y: py,
    w: pw,
    h: ph,
    fill: { color: C.mist, transparency: 18 },
    line: { color: C.border, pt: 1 },
  });
  const boundaryColor = opts.boundaryColor || C.red;
  const boundaryStart = opts.boundaryStart || { x: 0.13, y: opts.boundaryY ?? 0.68 };
  const boundaryEnd = opts.boundaryEnd || { x: 0.9, y: 0.36 };
  for (let i = 0; i <= 18; i += 1) {
    const t = i / 18;
    slide.addShape(SH.ellipse, {
      x: px + (boundaryStart.x + (boundaryEnd.x - boundaryStart.x) * t) * pw - 0.026,
      y: py + (boundaryStart.y + (boundaryEnd.y - boundaryStart.y) * t) * ph - 0.026,
      w: 0.052,
      h: 0.052,
      fill: { color: boundaryColor },
      line: { color: boundaryColor },
    });
  }
  const points = opts.points || [
    { x: 0.18, y: 0.86, c: C.navy },
    { x: 0.28, y: 0.74, c: C.navy },
    { x: 0.36, y: 0.9, c: C.navy },
    { x: 0.64, y: 0.18, c: C.red },
    { x: 0.78, y: 0.28, c: C.red },
    { x: 0.72, y: 0.12, c: C.red },
  ];
  points.forEach((pt) => {
    slide.addShape(SH.ellipse, {
      x: px + pt.x * pw - 0.055,
      y: py + pt.y * ph - 0.055,
      w: 0.11,
      h: 0.11,
      fill: { color: pt.c },
      line: { color: pt.c },
    });
  });
  slide.addText(opts.leftLabel || "clase 0", {
    x: px + 0.18,
    y: py + ph - 0.26,
    w: 1.2,
    h: 0.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 9.5,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText(opts.rightLabel || "clase 1", {
    x: px + pw - 1.18,
    y: py + 0.1,
    w: 1.0,
    h: 0.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 9.5,
    bold: true,
    color: C.red,
    margin: 0,
  });
}

function createCoverSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  slide.addImage({ path: logoPath, x: 0.88, y: 0.62, w: 1.2, h: 0.42 });
  addBarsMotif(slide, 0.88, 1.54, 1.08, C.red);
  slide.addText("Fundamentos de\ndeep learning", {
    x: 0.88,
    y: 2.22,
    w: 8.8,
    h: 1.58,
    fontFace: TYPOGRAPHY.display,
    fontSize: 42,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Neuronas, perceptrón, entrenamiento y generalización", {
    x: 0.88,
    y: 4.18,
    w: 9.4,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 17.2,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  slide.addText("Semana 08 · Clase 23 · Unidad 03", {
    x: 0.88,
    y: 5.72,
    w: 4.8,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.5,
    color: "D9E2EC",
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 9.56,
    y: 1.34,
    w: 2.56,
    h: 4.52,
    rectRadius: 0.06,
    fill: { color: "183B63", transparency: 12 },
    line: { color: "244F7E", pt: 1 },
  });
  ["x", "w", "Σ", "b", "ŷ"].forEach((symbol, index) => {
    slide.addShape(SH.ellipse, {
      x: 10.38,
      y: 1.72 + index * 0.76,
      w: 0.58,
      h: 0.58,
      fill: { color: index === 4 ? C.red : C.softBlue },
      line: { color: index === 4 ? C.red : C.softBlue },
    });
    slide.addText(symbol, {
      x: 10.38,
      y: 1.84 + index * 0.76,
      w: 0.58,
      h: 0.18,
      fontFace: TYPOGRAPHY.mono || "Aptos Mono",
      fontSize: 15,
      bold: true,
      color: index === 4 ? C.white : C.navy,
      align: "center",
      margin: 0,
    });
    if (index < 4) {
      slide.addShape(SH.line, {
        x: 10.67,
        y: 2.3 + index * 0.76,
        w: 0,
        h: 0.36,
        line: { color: C.gold, pt: 1.1, beginArrowType: "none", endArrowType: "triangle" },
      });
    }
  });
  slide.addText("leer procesos,\nno memorizar símbolos", {
    x: 9.92,
    y: 5.42,
    w: 1.88,
    h: 0.42,
    fontFace: TYPOGRAPHY.display,
    fontSize: 11.6,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  validateSlide(slide, pptx);
}

function createMapSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Mapa De La Clase", "Una ruta desde señales biológicas hasta evaluación de modelos", "Introducción");
  const items = [
    { n: "01", title: "Inspiración", body: "De neurona biológica a abstracción artificial.", fill: C.softBlue, accent: C.navy },
    { n: "02", title: "Decisión", body: "Perceptrón, clasificación binaria y umbral.", fill: C.warm, accent: C.gold },
    { n: "03", title: "Aprendizaje", body: "Predicción, error, pérdida y ajuste.", fill: C.paleRed, accent: C.red },
    { n: "04", title: "Evaluación", body: "Generalización, overfitting y seguridad.", fill: C.mist, accent: C.slate },
  ];
  items.forEach((item, index) => {
    const x = 0.88 + index * 2.82;
    addStepCard(slide, {
      x,
      y: 2.18,
      w: 2.56,
      h: 3.42,
      fill: item.fill,
      line: item.fill,
      accent: item.accent,
      kicker: `BLOQUE ${item.n}`,
      title: item.title,
      body: item.body,
      bodyFontSize: 10.2,
    });
    if (index < items.length - 1) {
      slide.addShape(SH.line, {
        x: x + 2.62,
        y: 3.86,
        w: 0.18,
        h: 0,
        line: { color: C.guide, pt: 1.1, beginArrowType: "none", endArrowType: "triangle" },
      });
    }
  });
  addStatementBand(slide, "La meta no es dominar cálculo hoy: es entender qué representa cada operación.");
  validateSlide(slide, pptx);
}

function createWhyMattersSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Por Qué Esta Clase Importa", "Antes de usar LLMs y agentes, necesitamos entender qué hace un modelo", "Introducción");
  addCenterStatement(slide, SH, "Una IA útil no aparece por magia: transforma datos, calcula predicciones y debe ser evaluada.", {
    x: 0.92,
    y: 2.08,
    w: 7.2,
    h: 2.02,
    fill: C.navy,
    color: C.white,
    fontSize: 23,
  });
  addStepCard(slide, {
    x: 8.46,
    y: 2.08,
    w: 3.0,
    h: 2.02,
    fill: C.white,
    accent: C.red,
    kicker: "RIESGO",
    title: "usar sin entender",
    body: "Si el modelo falla, automatiza errores con apariencia técnica.",
    bodyFontSize: 10.3,
  });
  addMiniCard(slide, SH, {
    x: 0.92,
    y: 4.54,
    w: 3.3,
    h: 1.04,
    title: "Dato",
    body: "qué entra al sistema",
    accent: C.navy,
    fill: C.softBlue,
  });
  addMiniCard(slide, SH, {
    x: 4.42,
    y: 4.54,
    w: 3.3,
    h: 1.04,
    title: "Modelo",
    body: "cómo transforma señales",
    accent: C.gold,
    fill: C.warm,
  });
  addMiniCard(slide, SH, {
    x: 7.92,
    y: 4.54,
    w: 3.54,
    h: 1.04,
    title: "Validación",
    body: "por qué no basta con acertar una vez",
    accent: C.red,
    fill: C.paleRed,
  });
  validateSlide(slide, pptx);
}

function createNoMagicSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "No Es Magia, Es Un Proceso", "El vocabulario correcto evita explicaciones falsas", "Introducción");
  addStepCard(slide, {
    x: 0.92,
    y: 2.18,
    w: 5.0,
    h: 3.2,
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    kicker: "MALA LECTURA",
    title: "la red piensa",
    body: "Suena intuitivo, pero confunde cálculo con comprensión humana. Una red produce una salida según datos, parámetros y entrenamiento.",
    titleFontSize: 20,
    bodyFontSize: 12,
  });
  addStepCard(slide, {
    x: 6.3,
    y: 2.18,
    w: 5.0,
    h: 3.2,
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    kicker: "LECTURA TÉCNICA",
    title: "la red calcula",
    body: "Combina entradas, pesos y sesgos; transforma señales; predice; luego debe medirse contra datos reales.",
    titleFontSize: 20,
    bodyFontSize: 12,
  });
  addStatementBand(slide, "En IA aplicada, una predicción no es una verdad: es una salida que debe evaluarse.");
  validateSlide(slide, pptx);
}

function createFormulaPromiseSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Las Fórmulas Serán Pocas, Pero Importantes", "Las leeremos como procesos, no como decoración matemática", "Introducción");
  addFormulaPanel(slide, SH, {
    x: 0.92,
    y: 2.05,
    w: 4.86,
    h: 1.82,
    title: "Señal total",
    formula: "z = w1*x1 + w2*x2 + ... + b",
    reading: "cada entrada aporta según su peso",
    chips: [{ label: "entrada" }, { label: "peso" }, { label: "sesgo" }],
  });
  addFormulaPanel(slide, SH, {
    x: 6.16,
    y: 2.05,
    w: 4.86,
    h: 1.82,
    title: "Error",
    formula: "error = y - ŷ",
    reading: "compara lo correcto con lo predicho",
    chips: [{ label: "real" }, { label: "predicción" }],
  });
  addFormulaPanel(slide, SH, {
    x: 3.54,
    y: 4.3,
    w: 4.86,
    h: 1.82,
    title: "Pérdida",
    formula: "L = (y - ŷ)^2",
    reading: "mide qué tan lejos estuvo el modelo",
    chips: [{ label: "medir" }, { label: "comparar" }, { label: "ajustar" }],
  });
  validateSlide(slide, pptx);
}

function createBlock1OpeningSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  slide.addImage({ path: logoMarkPath, x: 10.84, y: 0.62, w: 0.72, h: 0.38 });
  addBarsMotif(slide, 0.88, 0.72, 1.04, C.red);
  slide.addText("Bloque 1", {
    x: 0.88,
    y: 1.64,
    w: 3.2,
    h: 0.42,
    fontFace: TYPOGRAPHY.body,
    fontSize: 17,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  slide.addText("De la neurona biológica\na la neurona artificial", {
    x: 0.88,
    y: 2.26,
    w: 9.6,
    h: 1.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 35,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("La idea clave: muchas señales pequeñas pueden combinarse para producir una respuesta.", {
    x: 0.92,
    y: 4.24,
    w: 8.5,
    h: 0.32,
    fontFace: TYPOGRAPHY.body,
    fontSize: 16.2,
    color: "D9E2EC",
    bold: true,
    margin: 0,
  });
  addFormulaPanel(slide, SH, {
    x: 7.92,
    y: 4.82,
    w: 3.52,
    h: 1.34,
    variant: "compact",
    title: "Primera fórmula",
    formula: "z = Σ(wi*xi) + b",
    reading: "señales con importancia",
    fill: "183B63",
    line: "244F7E",
    formulaFill: C.white,
    titleColor: C.gold,
    readingColor: C.white,
  });
  validateSlide(slide, pptx);
}

function createWhyNeuralNameSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Por Qué Se Llaman Redes Neuronales", "El nombre viene de una inspiración, no de una copia literal", "Bloque 1");
  addCenterStatement(slide, SH, "Una neurona recibe señales, las integra y puede activar una respuesta.", {
    x: 0.92,
    y: 2.08,
    w: 10.52,
    h: 1.22,
    fill: C.softBlue,
    color: C.navy,
    fontSize: 24,
  });
  const steps = [
    { title: "Recibe", body: "llegan señales desde otras neuronas", accent: C.navy, fill: C.white },
    { title: "Integra", body: "la señal acumulada se combina", accent: C.gold, fill: C.warm },
    { title: "Activa", body: "si supera un umbral, produce respuesta", accent: C.red, fill: C.paleRed },
  ];
  steps.forEach((step, index) => {
    addStepCard(slide, {
      x: 0.92 + index * 3.54,
      y: 3.76,
      w: 3.16,
      h: 1.62,
      fill: step.fill,
      line: step.fill,
      accent: step.accent,
      kicker: `PASO ${index + 1}`,
      title: step.title,
      body: step.body,
      titleFontSize: 16,
      bodyFontSize: 10.2,
    });
  });
  addStatementBand(slide, "La abstracción artificial conserva la estructura: entrada, combinación, activación y salida.");
  validateSlide(slide, pptx);
}

function createBiologicalAnatomySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Anatomía Mínima De Una Neurona", "No necesitamos neurociencia profunda: necesitamos el patrón funcional", "Bloque 1");
  addBiologicalNeuronDiagram(slide, { x: 0.92, y: 2.12, w: 5.56, h: 3.92 });
  addStepCard(slide, {
    x: 6.84,
    y: 2.12,
    w: 4.62,
    h: 1.04,
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    kicker: "DENDRITAS",
    title: "puntos de entrada",
    body: "reciben señales desde otras neuronas",
    titleFontSize: 13.5,
    bodyFontSize: 9.2,
  });
  addStepCard(slide, {
    x: 6.84,
    y: 3.38,
    w: 4.62,
    h: 1.04,
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    kicker: "SOMA",
    title: "integra señales",
    body: "combina la intensidad recibida",
    titleFontSize: 13.5,
    bodyFontSize: 9.2,
  });
  addStepCard(slide, {
    x: 6.84,
    y: 4.64,
    w: 4.62,
    h: 1.04,
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    kicker: "AXÓN",
    title: "salida de la respuesta",
    body: "transmite si hubo suficiente activación",
    titleFontSize: 13.5,
    bodyFontSize: 9.2,
  });
  validateSlide(slide, pptx);
}

function createFourStepPatternSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Patrón Que Nos Interesa", "El puente hacia IA está en el recorrido funcional", "Bloque 1");
  const items = [
    { title: "entran señales", body: "datos o estímulos llegan al sistema", fill: C.softBlue, accent: C.navy },
    { title: "se combinan", body: "las señales no pesan todas igual", fill: C.warm, accent: C.gold },
    { title: "hay umbral", body: "no cualquier señal activa respuesta", fill: C.mist, accent: C.slate },
    { title: "sale respuesta", body: "el resultado puede influir en otra pieza", fill: C.paleRed, accent: C.red },
  ];
  items.forEach((item, index) => {
    const x = 0.86 + index * 2.82;
    addStepCard(slide, {
      x,
      y: 2.18,
      w: 2.54,
      h: 3.08,
      fill: item.fill,
      line: item.fill,
      accent: item.accent,
      kicker: `0${index + 1}`,
      title: item.title,
      body: item.body,
      titleFontSize: 15.2,
      bodyFontSize: 10.2,
    });
    if (index < items.length - 1) {
      slide.addShape(SH.line, {
        x: x + 2.58,
        y: 3.72,
        w: 0.22,
        h: 0,
        line: { color: C.guide, pt: 1.2, beginArrowType: "none", endArrowType: "triangle" },
      });
    }
  });
  addStatementBand(slide, "La neurona artificial convierte este patrón en números y operaciones.");
  validateSlide(slide, pptx);
}

function createBiologyToArtificialSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Traducción: De Biología A Modelo Artificial", "Cada pieza biológica se convierte en una pieza matemática aproximada", "Bloque 1");
  addBiologicalToArtificialMap(slide, SH, {
    x: 0.9,
    y: 1.96,
    w: 10.72,
    h: 4.82,
    title: "Equivalencias útiles para aprender deep learning",
    subtitle: "Inspiración conceptual: no copia literal del cerebro",
    items: [
      { bio: "Dendritas", ai: "Entradas x", note: "señales que llegan" },
      { bio: "Sinapsis", ai: "Pesos w", note: "fuerza de conexión" },
      { bio: "Soma", ai: "Suma z", note: "integra señales" },
      { bio: "Umbral", ai: "Activación", note: "decide respuesta" },
      { bio: "Axón", ai: "Salida ŷ", note: "resultado del modelo" },
    ],
  });
  validateSlide(slide, pptx);
}

function createNotBrainSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Inspiración No Es Equivalencia", "Esta distinción evita el error más común al explicar IA", "Bloque 1");
  addStepCard(slide, {
    x: 0.92,
    y: 2.0,
    w: 4.92,
    h: 3.64,
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    kicker: "ERROR",
    title: "es un cerebro digital",
    body: "Una red neuronal artificial no siente, no tiene intención y no comprende como una persona.",
    titleFontSize: 19,
    bodyFontSize: 12.2,
  });
  addStepCard(slide, {
    x: 6.4,
    y: 2.0,
    w: 4.92,
    h: 3.64,
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    kicker: "PRECISIÓN",
    title: "es un modelo matemático",
    body: "Recibe números, aplica parámetros, transforma señales y produce una salida evaluable.",
    titleFontSize: 19,
    bodyFontSize: 12.2,
  });
  addStatementBand(slide, "La comparación biológica ayuda a imaginar el flujo; la explicación técnica vive en las operaciones.");
  validateSlide(slide, pptx);
}

function createSignalsBecomeNumbersSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Las Señales Se Vuelven Números", "Para que un computador calcule, la señal debe representarse", "Bloque 1");
  addPlainPanel(slide, { x: 0.92, y: 2.1, w: 4.58, h: 3.7, fill: C.white, accent: C.navy });
  slide.addText("Ejemplo: correo sospechoso", {
    x: 1.28,
    y: 2.42,
    w: 3.86,
    h: 0.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  [
    ["x1", "tiene enlace extraño", "1"],
    ["x2", "remitente desconocido", "1"],
    ["x3", "asunto urgente", "0"],
  ].forEach((row, index) => {
    const y = 3.02 + index * 0.64;
    slide.addShape(SH.roundRect, { x: 1.28, y, w: 0.58, h: 0.38, rectRadius: 0.04, fill: { color: C.softBlue }, line: { color: C.softBlue } });
    slide.addText(row[0], { x: 1.28, y: y + 0.1, w: 0.58, h: 0.12, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 9.5, bold: true, color: C.navy, align: "center", margin: 0 });
    slide.addText(row[1], { x: 2.04, y: y + 0.1, w: 2.18, h: 0.12, fontFace: TYPOGRAPHY.body, fontSize: 9.2, bold: true, color: C.ink, margin: 0 });
    slide.addText(row[2], { x: 4.44, y: y + 0.1, w: 0.34, h: 0.12, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 10, bold: true, color: row[2] === "1" ? C.red : C.slate, align: "center", margin: 0 });
  });
  addStepCard(slide, {
    x: 6.08,
    y: 2.1,
    w: 5.18,
    h: 1.58,
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    kicker: "REPRESENTAR",
    title: "0 o 1 no son la realidad completa",
    body: "Son una forma simple de codificar presencia o ausencia para poder calcular.",
    titleFontSize: 15.4,
    bodyFontSize: 10.5,
  });
  addStepCard(slide, {
    x: 6.08,
    y: 4.16,
    w: 5.18,
    h: 1.58,
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    kicker: "CRITERIO",
    title: "la entrada elegida condiciona el modelo",
    body: "Si las señales no describen bien el problema, la predicción será débil aunque la fórmula esté correcta.",
    titleFontSize: 15.4,
    bodyFontSize: 10.5,
  });
  validateSlide(slide, pptx);
}

function createWeightedSumFormulaSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Primera Fórmula Importante", "Suma ponderada: entradas con distinta importancia", "Bloque 1");
  addFormulaPanel(slide, SH, {
    x: 0.98,
    y: 2.02,
    w: 9.96,
    h: 2.28,
    variant: "hero",
    title: "Suma ponderada",
    subtitle: "la señal total antes de activar",
    formula: "z = w1*x1 + w2*x2 + ... + wn*xn + b",
    reading: "señal total = entradas multiplicadas por importancia + ajuste interno",
    chips: [{ label: "x: entrada" }, { label: "w: peso" }, { label: "b: sesgo" }, { label: "z: señal total" }],
  });
  addSymbolLegend(slide, SH, {
    x: 1.52,
    y: 4.74,
    w: 8.88,
    h: 1.28,
    title: "Lectura rápida de símbolos",
    cols: 4,
    items: [
      { symbol: "x", label: "dato de entrada" },
      { symbol: "w", label: "importancia" },
      { symbol: "b", label: "ajuste" },
      { symbol: "z", label: "señal total" },
    ],
  });
  validateSlide(slide, pptx);
}

function createWeightsMeaningSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Qué Dice Un Peso", "El peso indica cuánto empuja una entrada la decisión", "Bloque 1");
  [
    { title: "Peso alto", body: "la señal influye mucho en el resultado", formula: "w = 3", fill: C.softBlue, accent: C.navy },
    { title: "Peso bajo", body: "la señal influye poco en el resultado", formula: "w = 0.4", fill: C.warm, accent: C.gold },
    { title: "Peso negativo", body: "la señal empuja en sentido contrario", formula: "w = -2", fill: C.paleRed, accent: C.red },
  ].forEach((item, index) => {
    const x = 0.92 + index * 3.48;
    addStepCard(slide, {
      x,
      y: 2.04,
      w: 3.08,
      h: 2.08,
      fill: item.fill,
      line: item.fill,
      accent: item.accent,
      kicker: item.formula,
      title: item.title,
      body: item.body,
      titleFontSize: 17,
      bodyFontSize: 10.8,
    });
  });
  addFormulaPanel(slide, SH, {
    x: 1.18,
    y: 4.66,
    w: 10.0,
    h: 1.18,
    variant: "compact",
    title: "Idea operativa",
    formula: "aporte = entrada * peso",
    reading: "la misma entrada puede cambiar mucho o poco según su peso",
  });
  validateSlide(slide, pptx);
}

function createBiasSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Sesgo Ajusta El Umbral", "No viene del dato: modifica qué tan fácil es activar", "Bloque 1");
  addFormulaPanel(slide, SH, {
    x: 0.96,
    y: 2.12,
    w: 4.92,
    h: 1.78,
    title: "Sesgo menos exigente",
    formula: "z = 3 + 2 + 0 - 2 = 3",
    reading: "la señal queda positiva y se acerca a activar",
    chips: [{ label: "b = -2" }, { label: "z = 3" }],
  });
  addFormulaPanel(slide, SH, {
    x: 6.22,
    y: 2.12,
    w: 4.92,
    h: 1.78,
    title: "Sesgo más exigente",
    formula: "z = 3 + 2 + 0 - 6 = -1",
    reading: "las mismas entradas ya no alcanzan",
    chips: [{ label: "b = -6" }, { label: "z = -1" }],
    accent: C.navy,
  });
  addCenterStatement(slide, SH, "Los pesos dicen qué señales importan; el sesgo ajusta cuánta evidencia se necesita.", {
    x: 1.18,
    y: 4.72,
    w: 9.72,
    h: 0.92,
    fill: C.navy,
    color: C.white,
    fontSize: 19,
  });
  validateSlide(slide, pptx);
}

function createWeightedExampleSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Cálculo Manual: Señales De Un Correo", "Un ejemplo pequeño permite leer la fórmula sin miedo", "Bloque 1");
  addPlainPanel(slide, { x: 0.88, y: 2.04, w: 10.76, h: 3.18, fill: C.white, line: C.border });
  slide.addText("z = 3*1 + 2*1 + 1*0 - 2", { x: 1.16, y: 2.32, w: 5.8, h: 0.32, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 16.4, bold: true, color: C.navy, margin: 0 });
  slide.addText("enlace extraño + remitente desconocido + urgencia + sesgo", { x: 1.16, y: 2.76, w: 7.1, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 11.2, color: C.slate, margin: 0 });
  [
    { label: "3*1", note: "enlace", value: "= 3", fill: C.softBlue },
    { label: "2*1", note: "remitente", value: "= 2", fill: C.softBlue },
    { label: "1*0", note: "urgencia", value: "= 0", fill: C.softBlue },
    { label: "-2", note: "sesgo", value: "= -2", fill: C.warm },
  ].forEach((term, index) => {
    const x = 1.16 + index * 2.2;
    slide.addShape(SH.roundRect, { x, y: 3.32, w: 1.9, h: 1.22, rectRadius: 0.04, fill: { color: term.fill }, line: { color: term.fill } });
    slide.addText(term.label, { x, y: 3.54, w: 1.9, h: 0.24, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 14.2, bold: true, color: C.navy, align: "center", margin: 0 });
    slide.addText(term.note, { x, y: 3.9, w: 1.9, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 9.8, bold: true, color: C.slate, align: "center", margin: 0 });
    slide.addText(term.value, { x, y: 4.22, w: 1.9, h: 0.18, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 10.8, bold: true, color: C.red, align: "center", margin: 0 });
    if (index < 3) slide.addText("+", { x: x + 1.96, y: 3.78, w: 0.2, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.slate, align: "center", margin: 0 });
  });
  slide.addText("=", { x: 9.96, y: 3.78, w: 0.3, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.slate, align: "center", margin: 0 });
  slide.addShape(SH.roundRect, { x: 10.42, y: 3.32, w: 0.84, h: 1.22, rectRadius: 0.04, fill: { color: C.paleRed }, line: { color: C.paleRed } });
  slide.addText("z", { x: 10.42, y: 3.52, w: 0.84, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 9.8, bold: true, color: C.slate, align: "center", margin: 0 });
  slide.addText("3", { x: 10.42, y: 3.86, w: 0.84, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 20, bold: true, color: C.red, align: "center", margin: 0 });
  addStatementBand(slide, "Todavía no decidimos la salida: solo calculamos la señal acumulada z.", { y: 5.44 });
  validateSlide(slide, pptx);
}

function createActivationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "De La Suma A La Salida", "La activación transforma la señal total en una decisión usable", "Bloque 1");
  addFormulaPanel(slide, SH, {
    x: 0.96,
    y: 2.08,
    w: 5.08,
    h: 2.0,
    title: "Regla de umbral",
    formula: "si z >= 0, salida = 1",
    reading: "si la señal alcanza el umbral, la neurona se activa",
    chips: [{ label: "z = 3" }, { label: "salida = 1" }],
  });
  addFormulaPanel(slide, SH, {
    x: 6.36,
    y: 2.08,
    w: 5.08,
    h: 2.0,
    title: "Caso contrario",
    formula: "si z < 0, salida = 0",
    reading: "si la señal no alcanza, no se activa",
    chips: [{ label: "z = -1" }, { label: "salida = 0" }],
    accent: C.navy,
  });
  addCenterStatement(slide, SH, "Activar no significa entender: significa transformar una señal numérica en una salida.", {
    x: 1.3,
    y: 4.76,
    w: 9.46,
    h: 0.82,
    fill: C.softBlue,
    color: C.navy,
    fontSize: 18,
  });
  validateSlide(slide, pptx);
}

function createFullFlowSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Flujo Completo De Una Neurona Artificial", "Ahora podemos leer la operación de extremo a extremo", "Bloque 1");
  addPlainPanel(slide, { x: 0.88, y: 2.04, w: 10.76, h: 3.54, fill: C.white });
  const nodes = [
    { title: "entradas", label: "x", fill: C.softBlue, color: C.navy },
    { title: "pesos", label: "w", fill: C.warm, color: C.navy },
    { title: "suma", label: "z", fill: C.navy, color: C.white },
    { title: "activación", label: "f(z)", fill: C.mist, color: C.navy },
    { title: "salida", label: "ŷ", fill: C.paleRed, color: C.red },
  ];
  nodes.forEach((node, index) => {
    const x = 1.18 + index * 2.04;
    slide.addShape(SH.roundRect, { x, y: 3.05, w: 1.44, h: 1.0, rectRadius: 0.05, fill: { color: node.fill }, line: { color: node.fill } });
    slide.addText(node.label, { x, y: 3.2, w: 1.44, h: 0.3, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 18, bold: true, color: node.color, align: "center", margin: 0 });
    slide.addText(node.title, { x: x + 0.08, y: 3.62, w: 1.28, h: 0.14, fontFace: TYPOGRAPHY.body, fontSize: 7.8, bold: true, color: node.color === C.white ? C.white : C.slate, align: "center", margin: 0 });
    if (index < nodes.length - 1) {
      slide.addShape(SH.line, { x: x + 1.5, y: 3.55, w: 0.48, h: 0, line: { color: C.guide, pt: 1.2, beginArrowType: "none", endArrowType: "triangle" } });
    }
  });
  addStatementBand(slide, "x -> w*x + b -> z -> activación(z) -> ŷ", { y: 5.82, fontSize: 16.2 });
  validateSlide(slide, pptx);
}

function createGuidedComparisonSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Comparación Guiada", "La relación correcta está en el medio: inspiración, no equivalencia", "Bloque 1");
  const rows = [
    ["¿Qué recibe?", "señales de otras neuronas", "datos numéricos de entrada"],
    ["¿Todas importan igual?", "algunas conexiones influyen más", "cada entrada tiene un peso"],
    ["¿Dónde se combinan?", "cuerpo celular", "suma ponderada"],
    ["¿Qué produce?", "señal hacia otras neuronas", "salida numérica o decisión"],
  ];
  addPlainPanel(slide, { x: 0.86, y: 2.0, w: 10.8, h: 4.14, fill: C.white });
  slide.addText("Pregunta", { x: 1.1, y: 2.24, w: 2.2, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 10.5, bold: true, color: C.slate, margin: 0 });
  slide.addText("Biológica", { x: 3.44, y: 2.24, w: 3.2, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 10.5, bold: true, color: C.navy, margin: 0 });
  slide.addText("Artificial", { x: 7.02, y: 2.24, w: 3.4, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 10.5, bold: true, color: C.red, margin: 0 });
  rows.forEach((row, index) => {
    const y = 2.64 + index * 0.78;
    slide.addShape(SH.roundRect, { x: 1.02, y, w: 10.36, h: 0.6, rectRadius: 0.03, fill: { color: index % 2 === 0 ? C.mist : C.paper }, line: { color: index % 2 === 0 ? C.mist : C.paper } });
    slide.addText(row[0], { x: 1.14, y: y + 0.2, w: 2.18, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 9.8, bold: true, color: C.ink, margin: 0 });
    slide.addText(row[1], { x: 3.44, y: y + 0.2, w: 3.18, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 9.8, color: C.ink, margin: 0 });
    slide.addText(row[2], { x: 7.02, y: y + 0.2, w: 3.74, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 9.8, color: C.ink, margin: 0 });
  });
  addStatementBand(slide, "No es un cerebro digital; es una operación matemática inspirada en señales conectadas.");
  validateSlide(slide, pptx);
}

function createLearningMeaningSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Qué Significa Aprender Aquí", "Aprender no es comprender: es ajustar parámetros para reducir errores", "Bloque 1");
  addCenterStatement(slide, SH, "Aprender = ajustar pesos y sesgo para producir mejores salidas.", {
    x: 1.02,
    y: 2.04,
    w: 10.34,
    h: 1.08,
    fill: C.navy,
    color: C.white,
    fontSize: 24,
  });
  [
    { title: "Predice", body: "el modelo produce ŷ", fill: C.softBlue, accent: C.navy },
    { title: "Se equivoca", body: "ŷ no coincide con y", fill: C.paleRed, accent: C.red },
    { title: "Ajusta", body: "cambian w y b", fill: C.warm, accent: C.gold },
  ].forEach((item, index) => {
    const x = 1.06 + index * 3.48;
    addStepCard(slide, {
      x,
      y: 3.68,
      w: 3.02,
      h: 1.52,
      fill: item.fill,
      line: item.fill,
      accent: item.accent,
      kicker: `PASO ${index + 1}`,
      title: item.title,
      body: item.body,
      titleFontSize: 16,
      bodyFontSize: 10.2,
    });
  });
  addStatementBand(slide, "El modelo no recibe una explicación humana: recibe ejemplos y modifica números.");
  validateSlide(slide, pptx);
}

function createRulesVsLearningSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Programar Reglas Vs Aprender Desde Ejemplos", "La diferencia explica por qué deep learning cambia el enfoque", "Bloque 1");
  addStepCard(slide, {
    x: 0.92,
    y: 2.08,
    w: 5.0,
    h: 3.28,
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    kicker: "PROGRAMACIÓN TRADICIONAL",
    title: "la regla la escribe una persona",
    body: "si el correo tiene enlace sospechoso y remitente desconocido, marcar alerta.",
    titleFontSize: 17,
    bodyFontSize: 12,
  });
  addStepCard(slide, {
    x: 6.3,
    y: 2.08,
    w: 5.0,
    h: 3.28,
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    kicker: "APRENDIZAJE AUTOMÁTICO",
    title: "el modelo ajusta parámetros",
    body: "estos correos fueron sospechosos; estos no. Encuentra pesos que reduzcan el error.",
    titleFontSize: 17,
    bodyFontSize: 12,
  });
  addStatementBand(slide, "El aprendizaje automático desplaza el foco: de escribir reglas a entrenar y evaluar patrones.");
  validateSlide(slide, pptx);
}

function createNetworksNeedSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Por Qué Una Sola Neurona No Basta", "Los problemas reales combinan muchas señales y patrones", "Bloque 1");
  addNetworkLayersDiagram(slide, SH, {
    x: 0.9,
    y: 2.04,
    w: 6.1,
    h: 4.22,
    title: "La idea de red",
    subtitle: "varias neuronas transforman señales por capas",
    layers: [
      { title: "Entradas", nodes: 3, color: C.softBlue },
      { title: "Capa 1", nodes: 4, color: C.warm },
      { title: "Capa 2", nodes: 4, color: C.warm },
      { title: "Salida", nodes: 2, color: C.paleRed },
    ],
  });
  addStepCard(slide, {
    x: 7.34,
    y: 2.08,
    w: 3.92,
    h: 1.14,
    fill: C.white,
    accent: C.navy,
    kicker: "CAPA 1",
    title: "señales simples",
    body: "detecta piezas básicas del patrón",
    titleFontSize: 13.2,
    bodyFontSize: 8.8,
  });
  addStepCard(slide, {
    x: 7.34,
    y: 3.46,
    w: 3.92,
    h: 1.14,
    fill: C.white,
    accent: C.gold,
    kicker: "CAPA 2",
    title: "combinaciones",
    body: "mezcla señales intermedias",
    titleFontSize: 13.2,
    bodyFontSize: 8.8,
  });
  addStepCard(slide, {
    x: 7.34,
    y: 4.84,
    w: 3.92,
    h: 1.14,
    fill: C.white,
    accent: C.red,
    kicker: "SALIDA",
    title: "predicción",
    body: "produce una respuesta evaluable",
    titleFontSize: 13.2,
    bodyFontSize: 8.8,
  });
  validateSlide(slide, pptx);
}

function createDeepMeansLayersSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Deep No Significa Pensamiento Profundo", "Significa múltiples capas de transformación", "Bloque 1");
  addCenterStatement(slide, SH, "deep learning = redes con varias capas entre entrada y salida", {
    x: 0.92,
    y: 2.0,
    w: 10.48,
    h: 1.08,
    fill: C.navy,
    color: C.white,
    fontSize: 25,
  });
  addFormulaPanel(slide, SH, {
    x: 1.2,
    y: 3.58,
    w: 9.88,
    h: 1.82,
    title: "Lectura conceptual",
    formula: "entrada -> capa 1 -> capa 2 -> capa 3 -> salida",
    reading: "cada capa transforma la representación anterior",
    chips: [{ label: "datos" }, { label: "transformación" }, { label: "predicción" }],
  });
  addStatementBand(slide, "Más capas pueden aprender patrones más complejos, pero también exigen mejor evaluación.");
  validateSlide(slide, pptx);
}

function createCyberRiskSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Eje Cyber: Una Activación Incorrecta También Es Riesgo", "El error de un modelo puede afectar decisiones reales", "Bloque 1");
  addStepCard(slide, {
    x: 0.92,
    y: 2.06,
    w: 5.0,
    h: 3.28,
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    kicker: "FALSO NEGATIVO",
    title: "deja pasar una amenaza",
    body: "Correo peligroso -> el modelo dice \"no sospechoso\". Puede permitir phishing, robo de credenciales o malware.",
    titleFontSize: 17,
    bodyFontSize: 11.5,
  });
  addStepCard(slide, {
    x: 6.3,
    y: 2.06,
    w: 5.0,
    h: 3.28,
    fill: C.warningSoft,
    line: C.warningSoft,
    accent: C.gold,
    kicker: "FALSO POSITIVO",
    title: "bloquea algo legítimo",
    body: "Correo normal -> el modelo dice \"sospechoso\". Puede generar ruido y pérdida de confianza.",
    titleFontSize: 17,
    bodyFontSize: 11.5,
  });
  addStatementBand(slide, "Una predicción no es automáticamente una verdad: es una salida calculada que debe evaluarse.");
  validateSlide(slide, pptx);
}

function createAgentMethodSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Cómo Usar Un Agente Para Estudiar Esto", "La IA puede explicar fórmulas, pero hay que revisar cálculo e interpretación", "Bloque 1");
  addPlainPanel(slide, { x: 0.92, y: 2.04, w: 5.34, h: 3.76, fill: C.navy, line: C.navy });
  slide.addText("Prompt útil", {
    x: 1.24,
    y: 2.34,
    w: 4.62,
    h: 0.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  slide.addText("Explícame z = w1*x1 + w2*x2 + b con un ejemplo numérico pequeño. No uses derivadas. Incluye tabla y explica entradas, pesos, sesgo, suma y activación.", {
    x: 1.24,
    y: 2.86,
    w: 4.62,
    h: 1.42,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.2,
    color: C.white,
    margin: 0,
    breakLine: false,
  });
  slide.addText("Pedir explicación no reemplaza entender qué representa cada número.", {
    x: 1.24,
    y: 4.9,
    w: 4.5,
    h: 0.3,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.6,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addStepCard(slide, {
    x: 6.72,
    y: 2.04,
    w: 4.74,
    h: 1.04,
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    kicker: "REVISAR",
    title: "símbolos correctos",
    body: "x, w, b, z y ŷ no deben mezclarse",
    titleFontSize: 13.4,
    bodyFontSize: 8.8,
  });
  addStepCard(slide, {
    x: 6.72,
    y: 3.34,
    w: 4.74,
    h: 1.04,
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    kicker: "REVISAR",
    title: "cálculo numérico",
    body: "multiplicar y sumar sin saltos falsos",
    titleFontSize: 13.4,
    bodyFontSize: 8.8,
  });
  addStepCard(slide, {
    x: 6.72,
    y: 4.64,
    w: 4.74,
    h: 1.04,
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    kicker: "REVISAR",
    title: "sin antropomorfizar",
    body: "la red calcula; no piensa como persona",
    titleFontSize: 13.4,
    bodyFontSize: 8.8,
  });
  validateSlide(slide, pptx);
}

function createBlock1RecapSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Recapitulación Del Bloque 1", "La base conceptual para entender perceptrón y entrenamiento", "Bloque 1");
  addSymbolLegend(slide, SH, {
    x: 0.96,
    y: 2.02,
    w: 10.38,
    h: 1.82,
    title: "Lenguaje mínimo ya instalado",
    cols: 5,
    items: [
      { symbol: "x", label: "entrada" },
      { symbol: "w", label: "peso" },
      { symbol: "b", label: "sesgo" },
      { symbol: "z", label: "señal total" },
      { symbol: "ŷ", label: "salida" },
    ],
  });
  addFormulaPanel(slide, SH, {
    x: 1.04,
    y: 4.34,
    w: 10.22,
    h: 1.38,
    title: "Idea central",
    formula: "entradas -> pesos + sesgo -> activación -> salida",
    reading: "la neurona artificial transforma señales numéricas, no pensamiento humano",
    variant: "compact",
  });
  addStatementBand(slide, "El bloque 2 usa esta base para construir el perceptrón: una decisión binaria paso a paso.", {
    y: 5.94,
  });
  validateSlide(slide, pptx);
}

function createBlock1QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas De Seguimiento", "Bloque 1 · De neurona biológica a neurona artificial", "Bloque 1");
  addFollowUpQuestion(slide, {
    x: 0.96,
    y: 2.0,
    w: 10.34,
    h: 1.12,
    badge: "01",
    question: "¿Qué parte de la neurona biológica inspira la idea de entradas en una neurona artificial?",
    hint: "Piensa en señales que llegan desde otras conexiones, no en una copia exacta del cerebro.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });
  addFollowUpQuestion(slide, {
    x: 0.96,
    y: 3.42,
    w: 10.34,
    h: 1.12,
    badge: "02",
    question: "Si dos entradas valen 1, ¿por qué no necesariamente influyen igual en la salida?",
    hint: "La diferencia está en el peso asociado a cada entrada.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });
  addFollowUpQuestion(slide, {
    x: 0.96,
    y: 4.84,
    w: 10.34,
    h: 1.12,
    badge: "03",
    question: "¿Por qué es más correcto decir que una red calcula una salida y no que piensa?",
    hint: "Usa la idea de entradas, parámetros, operaciones y evaluación.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  validateSlide(slide, pptx);
}

function createBlock2OpeningSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addBarsMotif(slide, 0.9, 0.72, 1.55, C.red);
  slide.addImage({ path: logoMarkPath, x: 10.9, y: 0.64, w: 0.76, h: 0.46 });
  slide.addText("Bloque 2", {
    x: 0.9,
    y: 1.78,
    w: 2.0,
    h: 0.3,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  slide.addText("El perceptrón como\nprimera decisión", {
    x: 0.9,
    y: 2.4,
    w: 8.4,
    h: 1.16,
    fontFace: TYPOGRAPHY.display,
    fontSize: 35,
    bold: true,
    color: C.white,
    margin: 0,
    breakLine: false,
  });
  slide.addText("Pasamos de una neurona que calcula a un modelo que clasifica entre dos salidas posibles.", {
    x: 0.92,
    y: 4.48,
    w: 8.9,
    h: 0.36,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16,
    bold: true,
    color: "D8E4EF",
    margin: 0,
  });
  addFormulaPanel(slide, SH, {
    x: 6.62,
    y: 5.28,
    w: 4.82,
    h: 1.15,
    title: "Lectura del bloque",
    formula: "entradas -> z -> umbral -> 0/1",
    reading: "decidir no es entender: es clasificar con una regla",
    variant: "compact",
    titleColor: C.gold,
    readingColor: C.white,
    fill: "173E64",
    line: "2D5E8B",
  });
  validateSlide(slide, pptx);
}

function createPerceptronDefinitionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Qué Es Un Perceptrón", "Un modelo mínimo para clasificar entre dos resultados", "Bloque 2");
  addCenterStatement(slide, SH, "perceptrón = combinar señales -> decidir 0 o 1", {
    x: 0.92,
    y: 2.06,
    w: 10.8,
    h: 0.86,
    fill: C.navy,
    color: C.white,
    fontSize: 21,
  });
  const cards = [
    { kicker: "SALIDA 0", title: "no activar", body: "negativo, falso, no pertenece, no bloquear", fill: C.softBlue, accent: C.navy },
    { kicker: "SALIDA 1", title: "activar", body: "positivo, verdadero, pertenece, marcar alerta", fill: C.paleRed, accent: C.red },
    { kicker: "CLAVE", title: "clasificación binaria", body: "el resultado tiene dos posibilidades principales", fill: C.warm, accent: C.gold },
  ];
  cards.forEach((card, idx) => {
    addStepCard(slide, {
      x: 0.92 + idx * 3.74,
      y: 3.38,
      w: 3.34,
      h: 1.72,
      ...card,
      titleFontSize: 17,
      bodyFontSize: 10.4,
    });
  });
  addStatementBand(slide, "No es un modelo moderno suficiente, pero instala la mecánica base de muchas redes posteriores.", {
    y: 5.76,
    fontSize: 14.2,
  });
  validateSlide(slide, pptx);
}

function createPerceptronAnatomySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Estructura Del Perceptrón", "Entrada, pesos, sesgo, suma, activación y salida", "Bloque 2");
  addPerceptronDiagram(slide, SH, {
    x: 0.86,
    y: 2.0,
    w: 7.0,
    h: 4.4,
    title: "Ruta de una decisión",
    subtitle: "cada entrada se pondera antes de llegar a la suma",
    inputs: [
      { label: "x1", value: "señal 1", weight: "w1" },
      { label: "x2", value: "señal 2", weight: "w2" },
      { label: "x3", value: "señal 3", weight: "w3" },
    ],
    outputLabel: "ŷ",
    activationLabel: "umbral",
  });
  const steps = [
    { title: "Entradas x", body: "datos que describen el caso", fill: C.softBlue, accent: C.navy },
    { title: "Pesos w", body: "importancia de cada señal", fill: C.warm, accent: C.gold },
    { title: "Sesgo b", body: "ajuste de exigencia", fill: C.paleRed, accent: C.red },
    { title: "Activación", body: "convierte z en 0 o 1", fill: C.mist, accent: C.slate },
  ];
  steps.forEach((step, idx) => {
    addStepCard(slide, {
      x: 8.18,
      y: 2.0 + idx * 1.15,
      w: 3.36,
      h: 1.12,
      ...step,
      titleFontSize: 12,
      bodyFontSize: 8,
      bodyY: 2.84 + idx * 1.15,
    });
  });
  validateSlide(slide, pptx);
}

function createPerceptronFormulaSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Regla Completa", "Primero se calcula z; después se decide 0 o 1", "Bloque 2");
  addFormulaPanel(slide, SH, {
    x: 0.96,
    y: 2.0,
    w: 10.28,
    h: 1.62,
    title: "Cálculo interno",
    subtitle: "suma ponderada con sesgo",
    formula: "z = w1*x1 + w2*x2 + ... + wn*xn + b",
    reading: "z resume toda la evidencia numérica antes de activar",
  });
  addFormulaPanel(slide, SH, {
    x: 0.96,
    y: 4.02,
    w: 4.9,
    h: 1.48,
    title: "Si alcanza el umbral",
    formula: "si z >= 0, salida = 1",
    reading: "la decisión se activa",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addFormulaPanel(slide, SH, {
    x: 6.34,
    y: 4.02,
    w: 4.9,
    h: 1.48,
    title: "Si no alcanza",
    formula: "si z < 0, salida = 0",
    reading: "la decisión no se activa",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
  });
  addStatementBand(slide, "El umbral no decide por intuición: decide por una comparación numérica explícita.", {
    y: 5.92,
    fontSize: 14.4,
  });
  validateSlide(slide, pptx);
}

function createBinaryExamplesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Qué Tipo De Preguntas Responde", "El perceptrón sirve para decisiones de dos salidas", "Bloque 2");
  const examples = [
    { title: "Correo", body: "normal o sospechoso", accent: C.red, fill: C.paleRed },
    { title: "Solicitud web", body: "permitida o riesgosa", accent: C.navy, fill: C.softBlue },
    { title: "Transacción", body: "legítima o fraudulenta", accent: C.gold, fill: C.warm },
    { title: "Comentario", body: "aceptable o problemático", accent: C.slate, fill: C.mist },
    { title: "Imagen", body: "contiene objeto o no", accent: C.navy, fill: C.softBlue },
    { title: "Validación", body: "cumple o no cumple", accent: C.red, fill: C.paleRed },
  ];
  examples.forEach((ex, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    addStepCard(slide, {
      x: 0.94 + col * 3.72,
      y: 2.08 + row * 1.64,
      w: 3.28,
      h: 1.18,
      ...ex,
      kicker: row === 0 ? "EJEMPLO" : "CASO",
      titleFontSize: 14.8,
      bodyFontSize: 9.6,
    });
  });
  addFormulaPanel(slide, SH, {
    x: 1.18,
    y: 5.38,
    w: 9.9,
    h: 0.92,
    title: "Lectura operacional",
    formula: "0 = no activar        1 = activar",
    reading: "la salida debe interpretarse dentro del contexto del problema",
    variant: "compact",
  });
  validateSlide(slide, pptx);
}

function createSuspiciousEmailSignalsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Ejemplo: Correo Sospechoso", "Tres señales binarias para una decisión de seguridad", "Bloque 2");
  const rows = [
    ["x1", "tiene enlace extraño", "1 = sí, 0 = no"],
    ["x2", "remitente desconocido", "1 = sí, 0 = no"],
    ["x3", "pide acción urgente", "1 = sí, 0 = no"],
  ];
  rows.forEach((row, idx) => {
    const cardY = 2.02 + idx * 1.28;
    const fill = idx === 1 ? C.warm : C.softBlue;
    const accent = idx === 1 ? C.gold : C.navy;
    addPlainPanel(slide, {
      x: 0.96,
      y: cardY,
      w: 6.0,
      h: 1.08,
      fill,
      line: fill,
      accent,
    });
    slide.addText(row[0], {
      x: 1.32,
      y: cardY + 0.2,
      w: 0.5,
      h: 0.22,
      fontFace: TYPOGRAPHY.display,
      fontSize: 11.2,
      bold: true,
      color: C.slate,
      margin: 0,
    });
    slide.addText(row[1], {
      x: 1.32,
      y: cardY + 0.52,
      w: 4.8,
      h: 0.28,
      fontFace: TYPOGRAPHY.display,
      fontSize: 14.2,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(row[2], {
      x: 1.32,
      y: cardY + 0.84,
      w: 2.2,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.9,
      color: C.ink,
      margin: 0,
    });
  });
  addPlainPanel(slide, { x: 7.28, y: 2.08, w: 3.88, h: 3.24, fill: C.white, accent: C.red });
  slide.addText("Por qué es buen ejemplo", {
    x: 7.66,
    y: 2.34,
    w: 3.18,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15.8,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("No enseña a atacar. Enseña a convertir señales de riesgo en variables revisables y discutibles.", {
    x: 7.66,
    y: 2.94,
    w: 3.18,
    h: 0.9,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.2,
    color: C.ink,
    margin: 0,
    breakLine: false,
  });
  slide.addText("La decisión automática siempre debe tener contexto, logs y posibilidad de revisión.", {
    x: 7.66,
    y: 4.34,
    w: 3.08,
    h: 0.48,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.8,
    bold: true,
    color: C.red,
    margin: 0,
    breakLine: false,
  });
  addStatementBand(slide, "Primero definimos señales; después decidimos cuánto pesa cada una.", { y: 5.88 });
  validateSlide(slide, pptx);
}

function createEmailWeightsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Asignar Pesos No Es Decorativo", "Cada peso expresa cuánto empuja una señal la decisión", "Bloque 2");
  const cards = [
    { kicker: "w1 = 3", title: "enlace extraño", body: "señal fuerte de riesgo", fill: C.paleRed, accent: C.red },
    { kicker: "w2 = 2", title: "remitente desconocido", body: "señal relevante, pero menor", fill: C.warm, accent: C.gold },
    { kicker: "w3 = 1", title: "urgencia", body: "señal débil por sí sola", fill: C.softBlue, accent: C.navy },
    { kicker: "b = -3", title: "sesgo exigente", body: "resta evidencia inicial", fill: C.mist, accent: C.slate },
  ];
  cards.forEach((card, idx) => {
    addStepCard(slide, {
      x: 0.9 + idx * 2.74,
      y: 2.0,
      w: 2.42,
      h: 1.76,
      ...card,
      titleFontSize: 13.7,
      bodyFontSize: 9.1,
    });
  });
  addFormulaPanel(slide, SH, {
    x: 1.02,
    y: 4.38,
    w: 10.0,
    h: 1.34,
    title: "Modelo simplificado",
    formula: "z = 3*x1 + 2*x2 + 1*x3 - 3",
    reading: "si z >= 0, el correo se marca como sospechoso",
    variant: "compact",
  });
  validateSlide(slide, pptx);
}

function createEmailCaseOneSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Caso 1: La Alerta Se Activa", "El correo junta suficiente evidencia de riesgo", "Bloque 2");
  addWeightedSumBreakdown(slide, SH, {
    x: 0.94,
    y: 2.02,
    w: 10.68,
    h: 2.34,
    title: "Cálculo paso a paso",
    subtitle: "x1=1, x2=1, x3=0, b=-3",
    terms: [
      { label: "3*1", value: "3", note: "enlace" },
      { label: "2*1", value: "2", note: "remitente" },
      { label: "1*0", value: "0", note: "urgencia" },
      { label: "-3", value: "-3", note: "sesgo", fill: C.warm },
    ],
    result: "2",
  });
  addFormulaPanel(slide, SH, {
    x: 0.94,
    y: 4.78,
    w: 5.1,
    h: 1.28,
    title: "Activación",
    formula: "z = 2 >= 0 -> salida = 1",
    reading: "el modelo marca el correo como sospechoso",
    variant: "compact",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
  });
  addStepCard(slide, {
    x: 6.52,
    y: 4.78,
    w: 4.7,
    h: 1.28,
    fill: C.white,
    accent: C.navy,
    kicker: "LECTURA",
    title: "no leyó como humano",
    body: "solo combinó señales numéricas y cruzó el umbral",
    titleFontSize: 13.6,
    bodyFontSize: 9.3,
  });
  validateSlide(slide, pptx);
}

function createEmailCaseTwoSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Caso 2: La Alerta No Se Activa", "Una señal aislada no siempre alcanza el umbral", "Bloque 2");
  addWeightedSumBreakdown(slide, SH, {
    x: 0.94,
    y: 2.02,
    w: 10.68,
    h: 2.34,
    title: "Mismo modelo, otro correo",
    subtitle: "x1=0, x2=1, x3=0, b=-3",
    terms: [
      { label: "3*0", value: "0", note: "enlace" },
      { label: "2*1", value: "2", note: "remitente" },
      { label: "1*0", value: "0", note: "urgencia" },
      { label: "-3", value: "-3", note: "sesgo", fill: C.warm },
    ],
    result: "-1",
  });
  addFormulaPanel(slide, SH, {
    x: 0.94,
    y: 4.78,
    w: 5.1,
    h: 1.28,
    title: "Activación",
    formula: "z = -1 < 0 -> salida = 0",
    reading: "el modelo no marca el correo",
    variant: "compact",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addStepCard(slide, {
    x: 6.52,
    y: 4.78,
    w: 4.7,
    h: 1.28,
    fill: C.white,
    accent: C.red,
    kicker: "CRITERIO",
    title: "el sesgo exige evidencia",
    body: "si el umbral es muy duro o muy blando, habrá errores",
    titleFontSize: 13.2,
    bodyFontSize: 9.2,
  });
  validateSlide(slide, pptx);
}

function createWeightsLearnSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Qué Significa Que Aprenda", "Aprender no es memorizar una frase: es ajustar parámetros", "Bloque 2");
  addFormulaPanel(slide, SH, {
    x: 0.96,
    y: 2.02,
    w: 4.88,
    h: 1.48,
    title: "Antes",
    formula: "w1=3, w2=2, w3=1, b=-3",
    reading: "valores definidos manualmente para explicar",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addFormulaPanel(slide, SH, {
    x: 6.28,
    y: 2.02,
    w: 4.88,
    h: 1.48,
    title: "Durante entrenamiento",
    formula: "predicción vs etiqueta real",
    reading: "si se equivoca, ajusta pesos o sesgo",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
  });
  const cases = [
    { title: "Falso negativo", body: "era riesgoso, pero salió 0: el modelo fue demasiado conservador", accent: C.red, fill: C.paleRed },
    { title: "Falso positivo", body: "era normal, pero salió 1: el modelo fue demasiado sensible", accent: C.navy, fill: C.softBlue },
  ];
  cases.forEach((item, idx) => {
    addStepCard(slide, {
      x: 1.2 + idx * 5.28,
      y: 4.18,
      w: 4.76,
      h: 1.2,
      kicker: "ERROR",
      ...item,
      titleFontSize: 14.4,
      bodyFontSize: 9.4,
    });
  });
  addStatementBand(slide, "Aprender significa ajustar pesos y sesgo para reducir errores frente a ejemplos conocidos.", {
    y: 5.92,
    fontSize: 13.8,
  });
  validateSlide(slide, pptx);
}

function createLinearSeparationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Intuición Geométrica", "Con dos entradas, el perceptrón dibuja una frontera", "Bloque 2");
  addDecisionBoundaryPlot(slide, {
    x: 0.92,
    y: 2.0,
    w: 6.2,
    h: 3.78,
    title: "Separación lineal",
    subtitle: "un lado produce 0; el otro produce 1",
  });
  addFormulaPanel(slide, SH, {
    x: 7.58,
    y: 2.04,
    w: 3.82,
    h: 1.36,
    title: "Frontera",
    formula: "z = 0",
    reading: "donde el modelo queda justo en el límite",
    variant: "compact",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
  });
  addStepCard(slide, {
    x: 7.58,
    y: 3.72,
    w: 3.82,
    h: 1.32,
    fill: C.white,
    accent: C.red,
    kicker: "PARÁMETROS",
    title: "mueven la línea",
    body: "pesos cambian inclinación; sesgo cambia posición",
    titleFontSize: 13.2,
    bodyFontSize: 9.2,
  });
  addStatementBand(slide, "El perceptrón divide el espacio de entradas en dos zonas.", { y: 6.12, h: 0.5 });
  validateSlide(slide, pptx);
}

function createPerceptronLimitSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Límite Del Perceptrón Simple", "No todo problema se separa con una sola línea", "Bloque 2");
  addDecisionBoundaryPlot(slide, {
    x: 0.92,
    y: 2.0,
    w: 5.0,
    h: 3.84,
    title: "Sí puede: patrón separable",
    subtitle: "una frontera simple basta",
    accent: C.navy,
  });
  addPlainPanel(slide, { x: 6.36, y: 2.0, w: 5.0, h: 3.84, fill: C.white, accent: C.red });
  slide.addText("No puede", {
    x: 6.74,
    y: 2.26,
    w: 2.4,
    h: 0.32,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17,
    bold: true,
    color: C.red,
    margin: 0,
  });
  const xorPoints = [
    { x: 7.35, y: 3.28, t: "1", c: C.red },
    { x: 9.86, y: 3.28, t: "0", c: C.navy },
    { x: 7.35, y: 4.76, t: "0", c: C.navy },
    { x: 9.86, y: 4.76, t: "1", c: C.red },
  ];
  xorPoints.forEach((p) => {
    slide.addShape(SH.ellipse, {
      x: p.x,
      y: p.y,
      w: 0.54,
      h: 0.54,
      fill: { color: p.c },
      line: { color: p.c },
    });
    slide.addText(p.t, {
      x: p.x,
      y: p.y + 0.11,
      w: 0.54,
      h: 0.2,
      fontFace: TYPOGRAPHY.display,
      fontSize: 12,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    });
  });
  slide.addText("clases mezcladas: una línea no alcanza", {
    x: 7.0,
    y: 5.42,
    w: 3.4,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.6,
    color: C.slate,
    align: "center",
    margin: 0,
  });
  addStatementBand(slide, "Este límite explica por qué conectamos varias neuronas y capas.", { y: 6.1, h: 0.48, fontSize: 13.6 });
  validateSlide(slide, pptx);
}

function createWebRequestPerceptronSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Ejemplo Web: Solicitud Riesgosa", "Un peso negativo también enseña criterio técnico", "Bloque 2");
  addFormulaPanel(slide, SH, {
    x: 0.94,
    y: 2.02,
    w: 10.5,
    h: 1.34,
    title: "Modelo simplificado",
    formula: "z = 3*x1 + 4*x2 - 2*x3 - 2",
    reading: "x3 representa autenticación correcta: reduce la señal de riesgo",
    variant: "compact",
  });
  const cards = [
    { kicker: "x1", title: "muchos intentos", body: "aumenta riesgo", fill: C.paleRed, accent: C.red },
    { kicker: "x2", title: "parámetros inesperados", body: "aumenta riesgo", fill: C.paleRed, accent: C.red },
    { kicker: "x3", title: "autenticación correcta", body: "reduce riesgo", fill: C.softBlue, accent: C.navy },
  ];
  cards.forEach((card, idx) => {
    addStepCard(slide, {
      x: 0.94 + idx * 3.64,
      y: 3.78,
      w: 3.18,
      h: 1.22,
      ...card,
      titleFontSize: 13,
      bodyFontSize: 9.2,
    });
  });
  addFormulaPanel(slide, SH, {
    x: 1.14,
    y: 5.48,
    w: 9.92,
    h: 0.9,
    title: "Caso",
    formula: "x1=1, x2=1, x3=0 -> z=5 -> salida=1",
    reading: "la solicitud queda clasificada como riesgosa",
    variant: "compact",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
  });
  validateSlide(slide, pptx);
}

function createDecisionNotBusinessRuleSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Una Salida No Es Una Regla De Negocio", "El modelo produce señal; el sistema decide con controles", "Bloque 2");
  addFormulaPanel(slide, SH, {
    x: 0.98,
    y: 2.06,
    w: 4.92,
    h: 1.34,
    title: "Mala lectura",
    formula: "modelo -> castigo automático",
    reading: "decisión crítica sin revisión ni reversibilidad",
    variant: "compact",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
  });
  addFormulaPanel(slide, SH, {
    x: 6.28,
    y: 2.06,
    w: 4.92,
    h: 1.34,
    title: "Mejor lectura",
    formula: "modelo -> señal -> regla -> acción",
    reading: "control trazable, reversible y auditable",
    variant: "compact",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  const checks = [
    "¿qué pasa si se equivoca?",
    "¿la acción es reversible?",
    "¿existen logs y trazabilidad?",
    "¿hay revisión humana en casos críticos?",
  ];
  checks.forEach((text, idx) => {
    const cardX = 1.12 + (idx % 2) * 5.22;
    const cardY = 3.96 + Math.floor(idx / 2) * 0.92;
    const fill = idx % 2 === 0 ? C.warm : C.white;
    const accent = idx % 2 === 0 ? C.gold : C.red;
    addPlainPanel(slide, {
      x: cardX,
      y: cardY,
      w: 4.66,
      h: 0.74,
      fill,
      line: idx % 2 === 0 ? fill : C.border,
      accent,
    });
    slide.addText("CHECK", {
      x: cardX + 0.36,
      y: cardY + 0.18,
      w: 0.8,
      h: 0.16,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.4,
      bold: true,
      color: C.slate,
      margin: 0,
    });
    slide.addText(text, {
      x: cardX + 0.36,
      y: cardY + 0.42,
      w: 4.08,
      h: 0.22,
      fontFace: TYPOGRAPHY.display,
      fontSize: 11.8,
      bold: true,
      color: C.navy,
      margin: 0,
    });
  });
  addStatementBand(slide, "En seguridad, el costo del error importa tanto como la predicción.", { y: 5.94 });
  validateSlide(slide, pptx);
}

function createAgentsPerceptronSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addBarsMotif(slide, 0.8, 0.72, 1.15, C.red);
  slide.addText("Agentes Como Apoyo", {
    x: 1.7,
    y: 1.18,
    w: 6.4,
    h: 0.58,
    fontFace: TYPOGRAPHY.display,
    fontSize: 30,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Útiles para generar ejemplos, pero no para delegar el criterio.", {
    x: 1.72,
    y: 1.88,
    w: 7.6,
    h: 0.32,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.4,
    color: "D8E4EF",
    margin: 0,
  });
  addPlainPanel(slide, { x: 0.98, y: 2.62, w: 5.1, h: 2.74, fill: "173E64", line: "2D5E8B", accent: C.gold });
  slide.addText("Prompt útil", {
    x: 1.34,
    y: 2.9,
    w: 2.0,
    h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  slide.addText("Explícame un perceptrón binario con tres entradas, tres pesos y un sesgo. Calcula z paso a paso, aplica umbral y explica riesgos de usar la salida como decisión automática.", {
    x: 1.34,
    y: 3.38,
    w: 4.34,
    h: 1.26,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.3,
    color: C.white,
    margin: 0,
    breakLine: false,
  });
  const checks = [
    { title: "revisar cálculo", body: "multiplicaciones, suma y activación" },
    { title: "revisar sentido", body: "entradas y pesos deben representar el problema" },
    { title: "revisar límites", body: "salida no equivale a verdad absoluta" },
  ];
  checks.forEach((item, idx) => {
    const cardY = 2.36 + idx * 1.2;
    const fill = idx === 1 ? C.warm : C.softBlue;
    const accent = idx === 1 ? C.gold : C.navy;
    addPlainPanel(slide, {
      x: 6.58,
      y: cardY,
      w: 4.48,
      h: 0.98,
      fill,
      line: fill,
      accent,
    });
    slide.addText("VALIDAR", {
      x: 6.94,
      y: cardY + 0.18,
      w: 0.94,
      h: 0.16,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.2,
      bold: true,
      color: C.slate,
      margin: 0,
    });
    slide.addText(item.title, {
      x: 6.94,
      y: cardY + 0.48,
      w: 3.9,
      h: 0.24,
      fontFace: TYPOGRAPHY.display,
      fontSize: 13,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(item.body, {
      x: 6.94,
      y: cardY + 0.74,
      w: 3.86,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.8,
      color: C.ink,
      margin: 0,
    });
  });
  slide.addText("Regla del bloque: el agente puede proponer; el estudiante debe verificar.", {
    x: 1.0,
    y: 6.18,
    w: 10.0,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  validateSlide(slide, pptx);
}

function createBlock2RecapSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Recapitulación Del Bloque 2", "El perceptrón como decisión binaria controlada", "Bloque 2");
  addFormulaPanel(slide, SH, {
    x: 0.96,
    y: 2.02,
    w: 10.34,
    h: 1.34,
    title: "Ruta completa",
    formula: "entradas -> pesos + sesgo -> z -> umbral -> 0/1",
    reading: "la decisión sale de una cadena de operaciones verificables",
    variant: "compact",
  });
  const recap = [
    { title: "Clasifica", body: "produce dos salidas posibles", accent: C.navy, fill: C.softBlue },
    { title: "Parámetros", body: "pesos y sesgo cambian la frontera", accent: C.gold, fill: C.warm },
    { title: "Tiene límites", body: "una sola línea no resuelve todo", accent: C.red, fill: C.paleRed },
    { title: "Exige criterio", body: "modelo no reemplaza reglas críticas", accent: C.slate, fill: C.mist },
  ];
  recap.forEach((item, idx) => {
    addStepCard(slide, {
      x: 0.96 + idx * 2.66,
      y: 3.82,
      w: 2.34,
      h: 1.32,
      kicker: `0${idx + 1}`,
      ...item,
      titleFontSize: 11.8,
      bodyFontSize: 8.2,
      bodyY: 4.72,
    });
  });
  addStatementBand(slide, "El bloque 3 responde la pregunta pendiente: cómo se ajustan esos pesos durante el entrenamiento.", {
    y: 5.88,
    fontSize: 13.8,
  });
  validateSlide(slide, pptx);
}

function createBlock2QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas De Seguimiento", "Bloque 2 · Perceptrón y clasificación binaria", "Bloque 2");
  addFollowUpQuestion(slide, {
    x: 0.96,
    y: 2.0,
    w: 10.34,
    h: 1.12,
    badge: "01",
    question: "¿Por qué el perceptrón sirve para explicar clasificación binaria?",
    hint: "Responde usando la idea de salida 0/1 y una regla de activación por umbral.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });
  addFollowUpQuestion(slide, {
    x: 0.96,
    y: 3.42,
    w: 10.34,
    h: 1.12,
    badge: "02",
    question: "¿Qué cambia en la decisión si modificamos un peso o el sesgo?",
    hint: "Piensa en cuánto empuja cada señal y en qué tan exigente queda el umbral.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });
  addFollowUpQuestion(slide, {
    x: 0.96,
    y: 4.84,
    w: 10.34,
    h: 1.12,
    badge: "03",
    question: "¿Por qué una salida 1 no debería transformarse siempre en una acción crítica automática?",
    hint: "Considera falsos positivos, falsos negativos, trazabilidad y revisión humana.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  validateSlide(slide, pptx);
}

function addCycleNode(slide, item, idx, total) {
  const cx = 2.25 + idx * 2.56;
  const y = 3.34;
  slide.addShape(SH.ellipse, {
    x: cx,
    y,
    w: 1.18,
    h: 1.18,
    fill: { color: item.fill },
    line: { color: item.fill },
  });
  slide.addText(item.n, {
    x: cx,
    y: y + 0.39,
    w: 1.18,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: item.accent,
    align: "center",
    valign: "mid",
    margin: 0,
  });
  slide.addText(item.title, {
    x: cx - 0.44,
    y: y + 1.36,
    w: 2.06,
    h: 0.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 11.6,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
  slide.addText(item.body, {
    x: cx - 0.48,
    y: y + 1.72,
    w: 2.14,
    h: 0.36,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.6,
    color: C.slate,
    align: "center",
    margin: 0,
    breakLine: false,
  });
  if (idx < total - 1) {
    slide.addShape(SH.line, {
      x: cx + 1.24,
      y: y + 0.58,
      w: 1.24,
      h: 0,
      line: { color: C.guide, pt: 1.4, beginArrowType: "none", endArrowType: "triangle" },
    });
  }
}

function addLossMiniTable(slide, opts) {
  const rows = opts.rows;
  const cols = opts.cols || [
    { label: "y", w: 0.84 },
    { label: "ŷ", w: 0.84 },
    { label: "error", w: 1.1 },
    { label: "L", w: 0.82 },
    { label: "lectura", w: 2.22 },
  ];
  addPlainPanel(slide, { x: opts.x, y: opts.y, w: opts.w, h: opts.h, fill: opts.fill || C.white, line: opts.line || C.border, accent: opts.accent || C.red });
  slide.addText(opts.title, {
    x: opts.x + 0.38,
    y: opts.y + 0.2,
    w: opts.w - 0.72,
    h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.titleFontSize || 14,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  const startY = opts.y + 0.72;
  let x = opts.x + 0.42;
  cols.forEach((col) => {
    slide.addText(col.label, {
      x,
      y: startY,
      w: col.w,
      h: 0.2,
      fontFace: TYPOGRAPHY.body,
      fontSize: opts.headerFontSize || 9.8,
      bold: true,
      color: C.slate,
      align: "center",
      margin: 0,
    });
    x += col.w;
  });
  rows.forEach((row, rIdx) => {
    const rowPitch = opts.rowPitch || 0.54;
    const rowY = startY + 0.38 + rIdx * rowPitch;
    slide.addShape(SH.roundRect, {
      x: opts.x + 0.36,
      y: rowY - 0.08,
      w: opts.w - 0.72,
      h: opts.rowBgH || 0.42,
      rectRadius: 0.03,
      fill: { color: rIdx % 2 === 0 ? C.mist : C.white, transparency: rIdx % 2 === 0 ? 18 : 0 },
      line: { color: rIdx % 2 === 0 ? C.mist : C.white, transparency: 100 },
    });
    let cellX = opts.x + 0.42;
    row.forEach((cell, cIdx) => {
      slide.addText(cell, {
        x: cellX,
        y: rowY,
        w: cols[cIdx].w,
        h: 0.24,
        fontFace: cIdx < 4 ? (TYPOGRAPHY.mono || "Aptos Mono") : TYPOGRAPHY.body,
        fontSize: cIdx < 4 ? (opts.cellFontSize || 10.6) : (opts.readingFontSize || 9.8),
        bold: cIdx === 3,
        color: cIdx === 3 ? C.red : C.ink,
        align: cIdx < 4 ? "center" : "left",
        margin: 0,
        fit: "shrink",
      });
      cellX += cols[cIdx].w;
    });
  });
}

function addLossCurve(slide, opts = {}) {
  const x = opts.x;
  const y = opts.y;
  const w = opts.w;
  const h = opts.h;
  addPlainPanel(slide, { x, y, w, h, fill: opts.fill || C.white, line: opts.line || C.border, accent: opts.accent || C.gold });
  slide.addText(opts.title || "Pérdida durante entrenamiento", {
    x: x + 0.38,
    y: y + 0.2,
    w: w - 0.76,
    h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.8,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  const px = x + 0.6;
  const py = y + 0.86;
  const pw = w - 1.04;
  const ph = h - 1.34;
  [0.25, 0.5, 0.75].forEach((ratio) => {
    slide.addShape(SH.line, {
      x: px,
      y: py + ph * ratio,
      w: pw,
      h: 0,
      line: { color: C.mist, pt: 0.7, transparency: 18 },
    });
  });
  slide.addShape(SH.line, { x: px, y: py + ph, w: pw, h: 0, line: { color: C.slate, pt: 1.1 } });
  slide.addShape(SH.line, { x: px, y: py, w: 0, h: ph, line: { color: C.slate, pt: 1.1 } });
  const vals = opts.values || [80, 45, 47, 32, 20, 18];
  const maxVal = opts.maxValue || 90;
  const pts = vals.map((value, idx) => ({
    x: px + (idx / (vals.length - 1)) * pw,
    y: py + ph - (value / maxVal) * ph,
  }));
  pts.forEach((pt, idx) => {
    if (idx < pts.length - 1) {
      addSafeLine(slide, pt.x, pt.y, pts[idx + 1].x, pts[idx + 1].y, { color: C.red, pt: 1.8 });
    }
    slide.addShape(SH.ellipse, {
      x: pt.x - 0.055,
      y: pt.y - 0.055,
      w: 0.11,
      h: 0.11,
      fill: { color: idx === 0 ? C.navy : C.red },
      line: { color: C.white, pt: 0.7 },
    });
  });
  slide.addText("L", {
    x: px - 0.28,
    y: py - 0.08,
    w: 0.18,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8,
    bold: true,
    color: C.slate,
    margin: 0,
  });
  slide.addText("épocas", {
    x: px + pw - 0.72,
    y: py + ph + 0.12,
    w: 0.72,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: 7.8,
    color: C.slate,
    align: "right",
    margin: 0,
  });
}

function addTrainingBullets(slide, items, opts = {}) {
  items.forEach((item, idx) => {
    const y = opts.y + idx * (opts.pitch || 0.42);
    slide.addShape(SH.ellipse, {
      x: opts.x,
      y: y + 0.05,
      w: 0.09,
      h: 0.09,
      fill: { color: opts.color || C.red },
      line: { color: opts.color || C.red },
    });
    slide.addText(item, {
      x: opts.x + 0.22,
      y,
      w: opts.w,
      h: 0.22,
      fontFace: TYPOGRAPHY.body,
      fontSize: opts.fontSize || 11.4,
      color: opts.textColor || C.ink,
      margin: 0,
    });
  });
}

function addMathBullets(slide, items, opts = {}) {
  items.forEach((item, idx) => {
    const y = opts.y + idx * (opts.pitch || 0.38);
    slide.addShape(SH.ellipse, {
      x: opts.x,
      y: y + 0.07,
      w: 0.08,
      h: 0.08,
      fill: { color: opts.color || C.navy },
      line: { color: opts.color || C.navy },
    });
    slide.addText(item, {
      x: opts.x + 0.2,
      y,
      w: opts.w,
      h: 0.24,
      fontFace: TYPOGRAPHY.mono || "Aptos Mono",
      fontSize: opts.fontSize || 12.8,
      color: opts.textColor || C.ink,
      margin: 0,
    });
  });
}

function createBlock3OpeningSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addBarsMotif(slide, 0.86, 0.78, 1.15, C.red);
  slide.addImage({ path: logoMarkPath, x: 10.95, y: 0.68, w: 0.78, h: 0.42 });
  slide.addText("Bloque 3", {
    x: 0.9,
    y: 1.86,
    w: 2.1,
    h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  slide.addText("Entrenamiento, error,\npérdida y ajuste", {
    x: 0.9,
    y: 2.58,
    w: 7.2,
    h: 1.14,
    fontFace: TYPOGRAPHY.display,
    fontSize: 33,
    bold: true,
    color: C.white,
    margin: 0,
    breakLine: false,
  });
  slide.addText("Pasamos de una neurona que decide a un modelo que intenta mejorar.", {
    x: 0.92,
    y: 4.8,
    w: 8.4,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 16,
    bold: true,
    color: "D8E4EF",
    margin: 0,
  });
  addFormulaPanel(slide, SH, {
    x: 7.1,
    y: 5.18,
    w: 4.34,
    h: 1.1,
    title: "Lectura del bloque",
    formula: "predice -> pierde -> ajusta",
    reading: "aprender es reducir errores medidos",
    variant: "compact",
    fill: "173E64",
    line: "2D5E8B",
    accent: C.red,
    formulaFontSize: 11.8,
    titleColor: C.gold,
    readingColor: "D8E4EF",
  });
  validateSlide(slide, pptx);
}

function createTrainingQuestionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Pregunta Central", "Ya sabemos cómo una neurona decide; falta entender cómo mejora", "Bloque 3");
  addCenterStatement(slide, SH, "¿Cómo pasa un modelo de equivocarse mucho a equivocarse menos?", {
    x: 1.0,
    y: 2.04,
    w: 10.8,
    h: 1.08,
    fill: C.navy,
    color: C.white,
    fontSize: 22,
  });
  const items = [
    { n: "01", title: "No aprende", body: "si alguien escribe pesos a mano", fill: C.softBlue, accent: C.navy },
    { n: "02", title: "Sí aprende", body: "si ajusta parámetros con ejemplos", fill: C.warm, accent: C.gold },
    { n: "03", title: "Mejora", body: "si la pérdida baja con nuevos intentos", fill: C.paleRed, accent: C.red },
  ];
  items.forEach((item, idx) => {
    addStepCard(slide, {
      x: 1.04 + idx * 3.55,
      y: 3.7,
      w: 3.04,
      h: 1.48,
      kicker: item.n,
      title: item.title,
      body: item.body,
      fill: item.fill,
      line: item.fill,
      accent: item.accent,
      titleFontSize: 14,
      bodyFontSize: 9.6,
    });
  });
  addStatementBand(slide, "El entrenamiento convierte ejemplos etiquetados en ajustes de pesos y sesgo.", { y: 5.92, fontSize: 13.6 });
  validateSlide(slide, pptx);
}

function createTrainingCycleSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Ciclo Mínimo De Entrenamiento", "La idea completa cabe en una secuencia verificable", "Bloque 3");
  const cycle = [
    { n: "1", title: "Predice", body: "el modelo produce ŷ", fill: C.softBlue, accent: C.navy },
    { n: "2", title: "Compara", body: "contrasta ŷ con y", fill: C.warm, accent: C.gold },
    { n: "3", title: "Mide", body: "calcula pérdida L", fill: C.paleRed, accent: C.red },
    { n: "4", title: "Ajusta", body: "modifica w y b", fill: C.mist, accent: C.slate },
  ];
  addFormulaPanel(slide, SH, {
    x: 1.08,
    y: 2.08,
    w: 10.64,
    h: 0.8,
    title: "Receta mental",
    formula: "predicción -> comparación -> pérdida -> ajuste -> nueva predicción",
    reading: "cada vuelta intenta reducir el error medido",
    variant: "compact",
    fill: C.white,
    line: C.border,
    accent: C.red,
    formulaFontSize: 14,
  });
  cycle.forEach((item, idx) => addCycleNode(slide, item, idx, cycle.length));
  addStatementBand(slide, "Sin una medida de pérdida, el modelo no sabe si va mejor o peor.", { y: 6.0, fontSize: 13.4 });
  validateSlide(slide, pptx);
}

function createSupervisedLabelsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Aprendizaje Supervisado", "El modelo entrena con ejemplos que tienen respuesta esperada", "Bloque 3");
  const examples = [
    { title: "Correo", input: "características del mensaje", label: "sospechoso / normal", accent: C.red, fill: C.paleRed },
    { title: "Vivienda", input: "metros, comuna, habitaciones", label: "precio real", accent: C.gold, fill: C.warm },
    { title: "Imagen", input: "pixeles o características visuales", label: "contiene gato / no contiene", accent: C.navy, fill: C.softBlue },
  ];
  examples.forEach((ex, idx) => {
    const x = 0.92 + idx * 3.66;
    addPlainPanel(slide, { x, y: 2.04, w: 3.12, h: 3.52, fill: ex.fill, line: ex.fill, accent: ex.accent });
    slide.addText(ex.title, { x: x + 0.38, y: 2.34, w: 2.52, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.navy, margin: 0 });
    slide.addText("entrada", { x: x + 0.38, y: 3.08, w: 1.0, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 8, bold: true, color: C.slate, margin: 0 });
    slide.addText(ex.input, { x: x + 0.38, y: 3.34, w: 2.42, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 9.8, color: C.ink, margin: 0 });
    slide.addText("etiqueta y", { x: x + 0.38, y: 4.42, w: 1.2, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 8, bold: true, color: C.slate, margin: 0 });
    slide.addText(ex.label, { x: x + 0.38, y: 4.68, w: 2.42, h: 0.32, fontFace: TYPOGRAPHY.display, fontSize: 11.2, bold: true, color: C.navy, margin: 0 });
  });
  addStatementBand(slide, "La etiqueta no es decoración: es la referencia contra la que se corrige el modelo.", { y: 5.96, fontSize: 12.8 });
  validateSlide(slide, pptx);
}

function createYHatNotationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Notación Mínima: y Versus ŷ", "Dos símbolos bastan para leer entrenamiento sin cálculo avanzado", "Bloque 3");
  addFormulaPanel(slide, SH, { x: 0.96, y: 2.0, w: 5.08, h: 2.0, title: "y", formula: "y = respuesta real", reading: "lo correcto según la etiqueta o dato esperado", variant: "compact", fill: C.softBlue, line: C.softBlue, accent: C.navy, formulaFontSize: 15 });
  addFormulaPanel(slide, SH, { x: 6.28, y: 2.0, w: 5.08, h: 2.0, title: "ŷ", formula: "ŷ = predicción", reading: "se lee y estimada, y predicha o y sombrero", variant: "compact", fill: C.paleRed, line: C.paleRed, accent: C.red, formulaFontSize: 15 });
  addPlainPanel(slide, { x: 1.64, y: 4.48, w: 9.04, h: 1.0, fill: C.warm, line: C.warm, accent: C.gold });
  slide.addText("No confundir: ŷ no es y'.", { x: 2.0, y: 4.72, w: 3.1, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 14.8, bold: true, color: C.navy, margin: 0 });
  slide.addText("En esta clase ŷ significa predicción del modelo; y' se lee y prima y pertenece a otros contextos matemáticos.", { x: 5.0, y: 4.72, w: 5.1, h: 0.32, fontFace: TYPOGRAPHY.body, fontSize: 9.8, color: C.ink, margin: 0 });
  addStatementBand(slide, "Entrenar empieza cuando comparamos lo correcto con lo que el modelo produjo.", { y: 5.96, fontSize: 12.8 });
  validateSlide(slide, pptx);
}

function createErrorSimpleSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Error Simple", "La primera comparación es una resta con dirección", "Bloque 3");
  addFormulaPanel(slide, SH, { x: 0.96, y: 2.0, w: 10.4, h: 1.18, title: "Fórmula mínima", formula: "error = y - ŷ", reading: "positivo: predijo por debajo; negativo: predijo por encima", variant: "compact", accent: C.red, formulaFontSize: 20 });
  addLossMiniTable(slide, {
    x: 1.18,
    y: 3.42,
    w: 10.02,
    h: 2.22,
    title: "Dos errores con la misma distancia",
    accent: C.gold,
    fill: C.white,
    rowPitch: 0.58,
    cellFontSize: 11.6,
    readingFontSize: 10.8,
    rows: [["10", "7", "3", "-", "quedó 3 unidades por debajo"], ["10", "13", "-3", "-", "quedó 3 unidades por encima"]],
  });
  addStatementBand(slide, "El signo ayuda a corregir dirección, pero todavía no mide bien el daño total.", { y: 6.0, fontSize: 12.8 });
  validateSlide(slide, pptx);
}

function createCancellationProblemSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Problema De La Cancelación", "Errores opuestos pueden esconder que el modelo falló dos veces", "Bloque 3");
  addCenterStatement(slide, SH, "3 + (-3) = 0, pero no significa que no hubo error.", { x: 1.18, y: 2.08, w: 10.08, h: 0.94, fill: C.paleRed, color: C.navy, fontSize: 20 });
  const cards = [
    { title: "Error A", body: "predicción quedó 3 abajo", value: "+3", accent: C.gold, fill: C.warm },
    { title: "Error B", body: "predicción quedó 3 arriba", value: "-3", accent: C.red, fill: C.paleRed },
    { title: "Suma bruta", body: "parece cero, pero engaña", value: "0", accent: C.navy, fill: C.softBlue },
  ];
  cards.forEach((card, idx) => {
    const x = 1.04 + idx * 3.52;
    addPlainPanel(slide, { x, y: 3.58, w: 3.0, h: 1.66, fill: card.fill, line: card.fill, accent: card.accent });
    slide.addText(card.value, { x: x + 0.36, y: 3.88, w: 0.92, h: 0.34, fontFace: TYPOGRAPHY.display, fontSize: 20, bold: true, color: card.accent, margin: 0 });
    slide.addText(card.title, { x: x + 1.22, y: 3.9, w: 1.52, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 12.6, bold: true, color: C.navy, margin: 0 });
    slide.addText(card.body, { x: x + 0.36, y: 4.58, w: 2.34, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 9.4, color: C.ink, margin: 0 });
  });
  addStatementBand(slide, "Por eso la pérdida transforma el error antes de usarlo para entrenar.", { y: 5.96, fontSize: 13.4 });
  validateSlide(slide, pptx);
}

function createLossFunctionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Función De Pérdida", "No solo pregunta si falló; mide qué tan mal estuvo", "Bloque 3");
  addFormulaPanel(slide, SH, { x: 0.96, y: 2.02, w: 5.12, h: 2.58, title: "Pérdida cuadrática", formula: "L = (y - ŷ)^2", reading: "convierte la diferencia en una medida positiva del error", fill: C.white, line: C.border, accent: C.red, chips: [{ label: "L", text: "pérdida" }, { label: "y", text: "real" }, { label: "ŷ", text: "predicción" }], formulaFontSize: 24 });
  const effects = [
    { title: "Evita cancelación", body: "un error negativo también se vuelve positivo", accent: C.navy, fill: C.softBlue },
    { title: "Castiga errores grandes", body: "fallar por 8 duele más que fallar por 1", accent: C.gold, fill: C.warm },
    { title: "Da una señal", body: "permite comparar si un ajuste mejoró o empeoró", accent: C.red, fill: C.paleRed },
  ];
  effects.forEach((item, idx) => {
    const y = 1.98 + idx * 1.34;
    addStepCard(slide, { x: 6.58, y, w: 4.6, h: 1.1, kicker: `EFECTO 0${idx + 1}`, title: item.title, body: item.body, fill: item.fill, line: item.fill, accent: item.accent, titleFontSize: 12.2, bodyFontSize: 9.4, bodyY: y + 0.78 });
  });
  addStatementBand(slide, "La pérdida convierte el error en una brújula para entrenar.", { y: 5.94, fontSize: 13.2 });
  validateSlide(slide, pptx);
}

function createSquaredLossExamplesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Pérdida Se Lee Comparando", "Tres predicciones muestran por qué la distancia importa", "Bloque 3");
  addLossMiniTable(slide, {
    x: 0.9,
    y: 2.0,
    w: 10.88,
    h: 3.38,
    title: "Mismo valor real: y = 10",
    accent: C.red,
    rowPitch: 0.62,
    cellFontSize: 12,
    readingFontSize: 10.8,
    rows: [["10", "2", "8", "64", "error grande; pérdida muy alta"], ["10", "7", "3", "9", "error intermedio; todavía duele"], ["10", "9", "1", "1", "predicción cercana; pérdida baja"]],
  });
  addStatementBand(slide, "Según esta pérdida, la mejor predicción no es la más bonita: es la de menor L.", { y: 5.92, fontSize: 13.2 });
  validateSlide(slide, pptx);
}

function createNotJustHitOrMissSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "No Basta Con Acertó O Falló", "Muchos modelos producen puntajes antes de tomar una decisión", "Bloque 3");
  const predictions = [
    { value: "0.92", title: "alta confianza", body: "si y = 1, está muy cerca", fill: C.softBlue, accent: C.navy },
    { value: "0.51", title: "apenas pasa", body: "clasifica 1, pero con margen mínimo", fill: C.warm, accent: C.gold },
    { value: "0.10", title: "lejos de 1", body: "si y = 1, el error es fuerte", fill: C.paleRed, accent: C.red },
  ];
  predictions.forEach((p, idx) => {
    const x = 0.98 + idx * 3.58;
    addPlainPanel(slide, { x, y: 2.28, w: 3.04, h: 2.64, fill: p.fill, line: p.fill, accent: p.accent });
    slide.addText(`ŷ = ${p.value}`, { x: x + 0.42, y: 2.78, w: 2.22, h: 0.44, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 20, bold: true, color: p.accent, align: "center", margin: 0 });
    slide.addText(p.title, { x: x + 0.42, y: 3.6, w: 2.28, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 13.2, bold: true, color: C.navy, align: "center", margin: 0 });
    slide.addText(p.body, { x: x + 0.42, y: 4.12, w: 2.3, h: 0.32, fontFace: TYPOGRAPHY.body, fontSize: 9.4, color: C.ink, align: "center", margin: 0 });
  });
  addFormulaPanel(slide, SH, { x: 2.4, y: 5.28, w: 7.52, h: 0.82, title: "Umbral puede decidir, pero pérdida mide distancia", formula: "umbral 0.5 != calidad de predicción", reading: "dos aciertos pueden tener niveles de confianza muy distintos", variant: "compact", accent: C.gold, formulaFontSize: 13.2 });
  validateSlide(slide, pptx);
}

function createNumericPredictionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Mini Ejemplo Completo", "Una mejora se ve cuando baja la pérdida", "Bloque 3");
  addPlainPanel(slide, { x: 0.96, y: 2.02, w: 4.62, h: 3.38, fill: C.white, accent: C.navy });
  slide.addText("Intento 1", { x: 1.32, y: 2.3, w: 1.8, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.navy, margin: 0 });
  addMathBullets(slide, ["y = 30 min", "ŷ = 24 min", "error = 30 - 24 = 6", "L = 6² = 36"], { x: 1.34, y: 2.96, w: 3.64, color: C.navy, fontSize: 13.8, pitch: 0.42 });
  addPlainPanel(slide, { x: 6.2, y: 2.02, w: 4.62, h: 3.38, fill: C.paleRed, line: C.paleRed, accent: C.red });
  slide.addText("Después de ajustar", { x: 6.56, y: 2.3, w: 2.84, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.navy, margin: 0 });
  addMathBullets(slide, ["y = 30 min", "ŷ = 28 min", "error = 30 - 28 = 2", "L = 2² = 4"], { x: 6.58, y: 2.96, w: 3.64, color: C.red, fontSize: 13.8, pitch: 0.42 });
  slide.addShape(SH.line, { x: 5.72, y: 3.7, w: 0.34, h: 0, line: { color: C.red, pt: 1.5, endArrowType: "triangle" } });
  addStatementBand(slide, "La pérdida bajó de 36 a 4: para ese ejemplo, el ajuste fue mejor.", { y: 5.94, fontSize: 13.4 });
  validateSlide(slide, pptx);
}

function createParametersAdjustSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Qué Se Ajusta Realmente", "Las entradas no cambian; cambian pesos y sesgo", "Bloque 3");
  addFormulaPanel(slide, SH, { x: 0.96, y: 2.04, w: 4.86, h: 1.42, title: "Antes", formula: "z = 3*x1 + 2*x2 + 1*x3 - 3", reading: "una configuración inicial de parámetros", variant: "compact", accent: C.slate, formulaFontSize: 12.4 });
  addFormulaPanel(slide, SH, { x: 6.08, y: 2.04, w: 4.86, h: 1.42, title: "Después", formula: "z = 4*x1 + 1*x2 + 2*x3 - 2", reading: "misma estructura, parámetros distintos", variant: "compact", accent: C.red, formulaFontSize: 12.4 });
  slide.addShape(SH.line, { x: 5.82, y: 2.74, w: 0.24, h: 0, line: { color: C.red, pt: 1.3, endArrowType: "triangle" } });
  const rules = [
    { title: "Señal útil", body: "su peso puede subir", accent: C.navy, fill: C.softBlue },
    { title: "Señal confusa", body: "su peso puede bajar", accent: C.gold, fill: C.warm },
    { title: "Activación dura/blanda", body: "el sesgo puede moverse", accent: C.red, fill: C.paleRed },
  ];
  rules.forEach((r, idx) => addStepCard(slide, { x: 1.02 + idx * 3.54, y: 4.12, w: 3.0, h: 1.2, kicker: "AJUSTE", title: r.title, body: r.body, fill: r.fill, line: r.fill, accent: r.accent, titleFontSize: 12.4, bodyFontSize: 8.8 }));
  addStatementBand(slide, "Entrenar no cambia la fórmula general: cambia los valores internos que la fórmula usa.", { y: 5.94, fontSize: 12.6 });
  validateSlide(slide, pptx);
}

function createDescentIntuitionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Intuición Del Descenso", "No veremos derivadas; sí veremos la idea que las hace necesarias", "Bloque 3");
  addPlainPanel(slide, { x: 0.96, y: 2.0, w: 6.28, h: 3.72, fill: C.white, accent: C.gold });
  slide.addText("Pérdida como altura", { x: 1.34, y: 2.28, w: 2.8, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true, color: C.navy, margin: 0 });
  const gx = 1.58;
  const gy = 2.82;
  const gw = 4.86;
  const gh = 2.28;
  [0.25, 0.5, 0.75].forEach((ratio) => {
    slide.addShape(SH.line, { x: gx, y: gy + gh * ratio, w: gw, h: 0, line: { color: C.mist, pt: 0.7, transparency: 18 } });
  });
  slide.addShape(SH.line, { x: gx, y: gy + gh, w: gw, h: 0, line: { color: C.slate, pt: 1.1 } });
  slide.addShape(SH.line, { x: gx, y: gy, w: 0, h: gh, line: { color: C.slate, pt: 1.1 } });
  const pts = [
    { x: gx + 0.24, y: gy + 0.24 },
    { x: gx + 1.04, y: gy + 0.62 },
    { x: gx + 1.82, y: gy + 1.08 },
    { x: gx + 2.68, y: gy + 1.48 },
    { x: gx + 3.54, y: gy + 1.84 },
    { x: gx + 4.48, y: gy + 2.02 },
  ];
  pts.forEach((pt, idx) => {
    if (idx < pts.length - 1) {
      addSafeLine(slide, pt.x, pt.y, pts[idx + 1].x, pts[idx + 1].y, { color: C.red, pt: 1.8, endArrowType: idx === pts.length - 2 ? "triangle" : "none" });
    }
    slide.addShape(SH.ellipse, { x: pt.x - 0.06, y: pt.y - 0.06, w: 0.12, h: 0.12, fill: { color: idx === 0 ? C.navy : C.red }, line: { color: C.white, pt: 0.7 } });
  });
  slide.addText("pérdida alta", { x: 2.16, y: 2.66, w: 1.2, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.8, bold: true, color: C.red, margin: 0 });
  slide.addText("pérdida baja", { x: 5.0, y: 4.86, w: 1.2, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.8, bold: true, color: C.navy, margin: 0 });
  slide.addText("ajustes", { x: 5.52, y: 5.22, w: 0.68, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 7.8, color: C.slate, align: "right", margin: 0 });
  const ideas = [
    { title: "cada ajuste es un paso", body: "mover pesos cambia la pérdida" },
    { title: "no se mueve al azar", body: "busca una dirección que reduzca L" },
    { title: "la pérdida guía", body: "sin L no hay señal de mejora" },
  ];
  ideas.forEach((idea, idx) => {
    const y = 1.92 + idx * 1.28;
    addStepCard(slide, { x: 7.66, y, w: 3.7, h: 1.08, kicker: `IDEA 0${idx + 1}`, title: idea.title, body: idea.body, fill: idx === 1 ? C.warm : C.softBlue, line: idx === 1 ? C.warm : C.softBlue, accent: idx === 1 ? C.gold : C.navy, titleFontSize: 11.8, bodyFontSize: 9.0, bodyY: y + 0.78 });
  });
  addStatementBand(slide, "Descenso de gradiente responde con cálculo hacia dónde conviene mover los parámetros.", { y: 5.92, fontSize: 12.4 });
  validateSlide(slide, pptx);
}

function createEpochsIterationsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Épocas E Iteraciones", "El modelo no aprende de un solo ejemplo ni de una sola pasada", "Bloque 3");
  addLossCurve(slide, { x: 0.96, y: 2.02, w: 5.56, h: 3.44, title: "Pérdida con ruido normal", values: [80, 45, 47, 32, 20, 18] });
  const concepts = [
    { title: "Iteración", body: "un paso donde procesa ejemplos y ajusta parámetros", accent: C.red, fill: C.paleRed },
    { title: "Época", body: "una pasada completa por el conjunto de entrenamiento", accent: C.navy, fill: C.softBlue },
    { title: "Tendencia", body: "importa la dirección general, no la perfección", accent: C.gold, fill: C.warm },
  ];
  concepts.forEach((c, idx) => {
    const y = 1.94 + idx * 1.34;
    addStepCard(slide, { x: 7.0, y, w: 4.26, h: 1.14, kicker: "VOCABULARIO", title: c.title, body: c.body, fill: c.fill, line: c.fill, accent: c.accent, titleFontSize: 11.6, bodyFontSize: 9.1, bodyY: y + 0.82 });
  });
  addStatementBand(slide, "Entrenar por varias épocas significa revisar ejemplos varias veces y ajustar en cada pasada.", { y: 5.92, fontSize: 12.4 });
  validateSlide(slide, pptx);
}

function createDataQualitySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Modelo Aprende Lo Que Ve", "Datos y etiquetas malas pueden enseñar la dirección equivocada", "Bloque 3");
  const issues = [
    { title: "Datos incompletos", body: "el patrón real queda parcialmente invisible", accent: C.navy, fill: C.softBlue },
    { title: "Etiquetas erróneas", body: "el modelo es castigado por acertar o premiado por fallar", accent: C.red, fill: C.paleRed },
    { title: "Sesgo del dataset", body: "aprende preferencias o errores del conjunto disponible", accent: C.gold, fill: C.warm },
  ];
  issues.forEach((item, idx) => addStepCard(slide, { x: 0.98 + idx * 3.56, y: 2.12, w: 3.02, h: 2.72, kicker: `RIESGO 0${idx + 1}`, title: item.title, body: item.body, fill: item.fill, line: item.fill, accent: item.accent, titleFontSize: 14, bodyFontSize: 10.2, bodyY: 3.3 }));
  addCenterStatement(slide, SH, "El modelo no aprende la verdad: aprende patrones desde datos y etiquetas.", { x: 1.1, y: 5.34, w: 10.12, h: 0.62, fill: C.navy, color: C.white, fontSize: 15.8 });
  validateSlide(slide, pptx);
}

function createTrainingTableSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Tabla Pequeña De Entrenamiento", "Un caso puede arreglarse, pero siempre hay que revisar el conjunto", "Bloque 3");
  addFormulaPanel(slide, SH, { x: 0.96, y: 1.98, w: 10.34, h: 0.94, title: "Modelo inicial", formula: "z = 2*x1 + 1*x2 - 1     |     si z >= 0, ŷ = 1", reading: "x1: enlace extraño; x2: remitente desconocido", variant: "compact", accent: C.red, formulaFontSize: 13.2 });
  addPlainPanel(slide, { x: 0.76, y: 3.08, w: 11.18, h: 2.48, fill: C.white, accent: C.navy });
  const headers = ["caso", "x1", "x2", "y", "z", "ŷ", "lectura"];
  const widths = [0.72, 0.64, 0.64, 0.64, 2.72, 0.64, 4.44];
  let hx = 1.08;
  headers.forEach((h, idx) => {
    slide.addText(h, { x: hx, y: 3.34, w: widths[idx], h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 10.2, bold: true, color: C.slate, align: idx < 6 ? "center" : "left", margin: 0 });
    hx += widths[idx];
  });
  const rows = [
    ["1", "1", "1", "1", "2*1+1*1-1=2", "1", "acierta"],
    ["2", "0", "1", "0", "2*0+1*1-1=0", "1", "falla: activa con poca evidencia"],
    ["3", "1", "0", "1", "2*1+1*0-1=1", "1", "acierta"],
    ["4", "0", "0", "0", "2*0+1*0-1=-1", "0", "acierta"],
  ];
  rows.forEach((row, rIdx) => {
    const ry = 3.72 + rIdx * 0.43;
    slide.addShape(SH.roundRect, { x: 1.0, y: ry - 0.06, w: 10.42, h: 0.35, rectRadius: 0.025, fill: { color: rIdx === 1 ? C.paleRed : C.mist, transparency: rIdx === 1 ? 0 : 26 }, line: { color: rIdx === 1 ? C.paleRed : C.mist, transparency: 100 } });
    let cx = 1.08;
    row.forEach((cell, idx) => {
      slide.addText(cell, { x: cx, y: ry, w: widths[idx], h: 0.24, fontFace: idx === 4 ? (TYPOGRAPHY.mono || "Aptos Mono") : TYPOGRAPHY.body, fontSize: idx === 4 ? 11.0 : 11.2, bold: idx === 6 && rIdx === 1, color: rIdx === 1 && idx === 6 ? C.red : C.ink, align: idx < 6 ? "center" : "left", margin: 0, fit: "shrink" });
      cx += widths[idx];
    });
  });
  addStatementBand(slide, "Arreglar un caso puede romper otro: por eso el entrenamiento evalúa muchos ejemplos.", { y: 5.94, fontSize: 12.5 });
  validateSlide(slide, pptx);
}

function createMinimizeLossSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Minimizar La Pérdida", "La frase suena abstracta, pero significa buscar mejores parámetros", "Bloque 3");
  addFormulaPanel(slide, SH, { x: 0.96, y: 2.0, w: 10.34, h: 1.26, title: "Cadena completa", formula: "modelo + datos + pérdida + algoritmo -> parámetros entrenados", reading: "si una pieza está mal, el resultado también puede estar mal", variant: "compact", accent: C.red, formulaFontSize: 14.2 });
  const checks = ["¿con qué datos?", "¿qué pérdida se minimizó?", "¿qué errores comete?", "¿qué pasa si se equivoca?"];
  checks.forEach((text, idx) => {
    const x = 1.08 + (idx % 2) * 5.24;
    const y = 3.72 + Math.floor(idx / 2) * 0.86;
    addPlainPanel(slide, { x, y, w: 4.62, h: 0.62, fill: idx < 2 ? C.softBlue : C.warm, line: idx < 2 ? C.softBlue : C.warm, accent: idx < 2 ? C.navy : C.gold });
    slide.addText(text, { x: x + 0.38, y: y + 0.18, w: 3.88, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 12.2, bold: true, color: C.navy, margin: 0 });
  });
  addStatementBand(slide, "Entrené un modelo no es una respuesta suficiente; hay que explicar el proceso y sus límites.", { y: 5.92, fontSize: 12.5 });
  validateSlide(slide, pptx);
}

function createCyberTrainingRiskSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Eje Cyber: Automatizar Errores Escala El Daño", "Mientras más automática sea la acción, más fuerte debe ser la evaluación", "Bloque 3");
  addPlainPanel(slide, { x: 0.96, y: 2.0, w: 4.92, h: 3.28, fill: C.paleRed, line: C.paleRed, accent: C.red });
  slide.addText("Modelo deficiente", { x: 1.34, y: 2.34, w: 2.9, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.red, margin: 0 });
  addTrainingBullets(slide, ["pocos ejemplos reales", "etiquetas incorrectas", "sin logs ni revisión", "confianza excesiva"], { x: 1.36, y: 3.02, w: 3.72, color: C.red, fontSize: 11.6 });
  slide.addShape(SH.line, { x: 5.98, y: 3.58, w: 0.7, h: 0, line: { color: C.red, pt: 1.6, endArrowType: "triangle" } });
  addPlainPanel(slide, { x: 6.72, y: 2.0, w: 4.74, h: 3.28, fill: C.white, line: C.border, accent: C.navy });
  slide.addText("Impacto posible", { x: 7.1, y: 2.34, w: 2.7, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.navy, margin: 0 });
  addTrainingBullets(slide, ["falsos negativos dejan pasar ataques", "falsos positivos bloquean usuarios", "acciones críticas sin explicación", "decisiones difíciles de apelar"], { x: 7.12, y: 3.02, w: 3.74, color: C.navy, fontSize: 11.2 });
  addStatementBand(slide, "Sugerir una alerta no es lo mismo que bloquear una cuenta crítica automáticamente.", { y: 5.92, fontSize: 12.3 });
  validateSlide(slide, pptx);
}

function createAgentsTrainingSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addBarsMotif(slide, 0.8, 0.72, 1.15, C.red);
  slide.addText("Agentes Para Estudiar Entrenamiento", { x: 1.7, y: 1.12, w: 7.8, h: 0.52, fontFace: TYPOGRAPHY.display, fontSize: 26, bold: true, color: C.white, margin: 0 });
  slide.addText("Pueden construir ejemplos, pero los cálculos y límites se verifican.", { x: 1.72, y: 1.8, w: 7.8, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 12.2, color: "D8E4EF", margin: 0 });
  addPlainPanel(slide, { x: 0.96, y: 2.54, w: 5.34, h: 2.8, fill: "173E64", line: "2D5E8B", accent: C.gold });
  slide.addText("Prompt útil", { x: 1.34, y: 2.84, w: 1.8, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 14.5, bold: true, color: C.gold, margin: 0 });
  slide.addText("Explícame el ciclo de entrenamiento con 3 ejemplos. Incluye y, ŷ, error = y - ŷ, L = (y - ŷ)^2 y explica por qué bajar pérdida no garantiza buen desempeño real.", { x: 1.34, y: 3.32, w: 4.46, h: 1.22, fontFace: TYPOGRAPHY.body, fontSize: 10.8, color: C.white, margin: 0, breakLine: false });
  const checks = ["no invertir y con ŷ", "verificar cada cálculo", "no prometer generalización", "distinguir entrenamiento de evaluación"];
  checks.forEach((check, idx) => {
    const y = 2.44 + idx * 0.72;
    addPlainPanel(slide, { x: 6.82, y, w: 4.18, h: 0.54, fill: idx % 2 === 0 ? C.softBlue : C.warm, line: idx % 2 === 0 ? C.softBlue : C.warm, accent: idx % 2 === 0 ? C.navy : C.gold });
    slide.addText(check, { x: 7.18, y: y + 0.16, w: 3.4, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 10.8, bold: true, color: C.navy, margin: 0 });
  });
  slide.addText("Regla del bloque: el agente puede explicar la mecánica; tú debes verificar cálculo, interpretación y límites.", { x: 0.94, y: 6.12, w: 10.7, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 14.2, bold: true, color: C.white, align: "center", margin: 0 });
  validateSlide(slide, pptx);
}

function createBlock3RecapSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Recapitulación Del Bloque 3", "Entrenar es medir error y ajustar parámetros con criterio", "Bloque 3");
  addFormulaPanel(slide, SH, { x: 0.96, y: 2.02, w: 10.34, h: 1.24, title: "Ruta del entrenamiento", formula: "y vs ŷ -> error -> pérdida L -> ajuste de w y b -> nuevo intento", reading: "la mejora se observa cuando la pérdida baja, pero se valida con datos adecuados", variant: "compact", accent: C.red, formulaFontSize: 12.6 });
  const recap = [
    { title: "y", body: "respuesta real", accent: C.navy, fill: C.softBlue },
    { title: "ŷ", body: "predicción del modelo", accent: C.red, fill: C.paleRed },
    { title: "L", body: "medida del error", accent: C.gold, fill: C.warm },
    { title: "ajuste", body: "cambio de parámetros", accent: C.slate, fill: C.mist },
  ];
  recap.forEach((item, idx) => addStepCard(slide, { x: 0.96 + idx * 2.66, y: 3.74, w: 2.34, h: 1.34, kicker: `0${idx + 1}`, ...item, titleFontSize: 14.6, bodyFontSize: 8.6, bodyY: 4.7 }));
  addStatementBand(slide, "El bloque 4 pregunta si esa mejora sirve fuera de los ejemplos conocidos.", { y: 5.9, fontSize: 13.4 });
  validateSlide(slide, pptx);
}

function createBlock3QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas De Seguimiento", "Bloque 3 · Entrenamiento, error, pérdida y ajuste", "Bloque 3");
  addFollowUpQuestion(slide, { x: 0.96, y: 2.0, w: 10.34, h: 1.12, badge: "01", question: "¿Qué diferencia hay entre y y ŷ durante el entrenamiento?", hint: "Usa la idea de respuesta real versus predicción del modelo; no las inviertas.", accent: C.navy, fill: C.softBlue, line: C.softBlue });
  addFollowUpQuestion(slide, { x: 0.96, y: 3.42, w: 10.34, h: 1.12, badge: "02", question: "¿Por qué una función de pérdida es necesaria para entrenar?", hint: "Explica qué señal entrega al modelo para saber si un ajuste mejora o empeora.", accent: C.red, fill: C.paleRed, line: C.paleRed });
  addFollowUpQuestion(slide, { x: 0.96, y: 4.84, w: 10.34, h: 1.12, badge: "03", question: "¿Por qué bajar la pérdida en entrenamiento no garantiza buen desempeño real?", hint: "Piensa en datos nuevos, etiquetas, memorización y validación fuera del conjunto conocido.", accent: C.gold, fill: C.warm, line: C.warm });
  validateSlide(slide, pptx);
}

function addDeepNetworkSketch(slide, opts = {}) {
  const x = opts.x || 1.0;
  const y = opts.y || 2.2;
  const layers = opts.layers || [3, 4, 4, 2];
  const labels = opts.labels || ["Entrada", "Oculta 1", "Oculta 2", "Salida"];
  const colors = [C.warm, C.softBlue, C.softBlue, C.paleRed];
  const maxNodes = Math.max(...layers);
  const colGap = opts.colGap || 2.25;
  const node = opts.node || 0.28;
  const colXs = layers.map((_, idx) => x + idx * colGap);
  const positions = layers.map((count, layerIdx) => {
    const top = y + (maxNodes - count) * 0.42;
    return Array.from({ length: count }, (_, idx) => ({
      cx: colXs[layerIdx],
      cy: top + idx * 0.62,
      fill: colors[Math.min(layerIdx, colors.length - 1)],
      line: layerIdx === 0 ? C.gold : layerIdx === layers.length - 1 ? C.red : C.navy,
    }));
  });
  for (let layerIdx = 0; layerIdx < positions.length - 1; layerIdx += 1) {
    positions[layerIdx].forEach((from) => {
      positions[layerIdx + 1].forEach((to) => addSafeLine(slide, from.cx + node / 2, from.cy, to.cx - node / 2, to.cy, { color: C.guide, pt: 0.65 }));
    });
  }
  positions.forEach((layer) => layer.forEach((pt) => slide.addShape(SH.ellipse, { x: pt.cx - node / 2, y: pt.cy - node / 2, w: node, h: node, fill: { color: pt.fill }, line: { color: pt.line, pt: 1 } })));
  labels.forEach((label, idx) => {
    slide.addText(label, { x: colXs[idx] - 0.6, y: y + maxNodes * 0.64 + 0.22, w: 1.2, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 9.6, bold: true, color: C.navy, align: "center", margin: 0 });
  });
}

function addTrainTestSplit(slide, opts = {}) {
  const x = opts.x || 1.0;
  const y = opts.y || 3.0;
  const w = opts.w || 10.4;
  const trainW = w * 0.8;
  const testW = w * 0.2;
  slide.addShape(SH.roundRect, { x, y, w: trainW, h: 0.72, rectRadius: 0.03, fill: { color: C.softBlue }, line: { color: C.softBlue } });
  slide.addShape(SH.roundRect, { x: x + trainW + 0.05, y, w: testW - 0.05, h: 0.72, rectRadius: 0.03, fill: { color: C.paleRed }, line: { color: C.paleRed } });
  slide.addText("800 entrenamiento", { x: x + 0.2, y: y + 0.22, w: trainW - 0.4, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 14, bold: true, color: C.navy, align: "center", margin: 0 });
  slide.addText("200 prueba", { x: x + trainW + 0.15, y: y + 0.22, w: testW - 0.25, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 14, bold: true, color: C.red, align: "center", margin: 0 });
}

function addLossComparisonChart(slide, opts = {}) {
  const x = opts.x || 0.96;
  const y = opts.y || 2.12;
  const w = opts.w || 6.2;
  const h = opts.h || 3.42;
  addPlainPanel(slide, { x, y, w, h, fill: C.white, accent: opts.accent || C.red });
  slide.addText(opts.title || "Entrenamiento vs prueba", { x: x + 0.38, y: y + 0.24, w: w - 0.76, h: 0.3, fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true, color: C.navy, margin: 0 });
  const px = x + 0.72;
  const py = y + 0.92;
  const pw = w - 1.16;
  const ph = h - 1.42;
  [0.25, 0.5, 0.75].forEach((ratio) => slide.addShape(SH.line, { x: px, y: py + ph * ratio, w: pw, h: 0, line: { color: C.mist, pt: 0.7, transparency: 18 } }));
  slide.addShape(SH.line, { x: px, y: py + ph, w: pw, h: 0, line: { color: C.slate, pt: 1.1 } });
  slide.addShape(SH.line, { x: px, y: py, w: 0, h: ph, line: { color: C.slate, pt: 1.1 } });
  const drawSeries = (values, color) => {
    const pts = values.map((value, idx) => ({ x: px + (idx / (values.length - 1)) * pw, y: py + ph - (value / 90) * ph }));
    pts.forEach((pt, idx) => {
      if (idx < pts.length - 1) addSafeLine(slide, pt.x, pt.y, pts[idx + 1].x, pts[idx + 1].y, { color, pt: 1.7 });
      slide.addShape(SH.ellipse, { x: pt.x - 0.045, y: pt.y - 0.045, w: 0.09, h: 0.09, fill: { color }, line: { color: C.white, pt: 0.5 } });
    });
  };
  drawSeries(opts.train || [78, 52, 34, 22, 14, 9], C.navy);
  drawSeries(opts.test || [80, 56, 42, 45, 58, 70], C.red);
  slide.addText("entrenamiento", { x: x + 1.0, y: y + h - 0.28, w: 1.4, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.4, bold: true, color: C.navy, margin: 0 });
  slide.addText("prueba", { x: x + 2.46, y: y + h - 0.28, w: 0.7, h: 0.18, fontFace: TYPOGRAPHY.body, fontSize: 8.4, bold: true, color: C.red, margin: 0 });
}

function createBlock4OpeningSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addBarsMotif(slide, 0.86, 0.78, 1.15, C.red);
  slide.addImage({ path: logoMarkPath, x: 10.95, y: 0.68, w: 0.78, h: 0.42 });
  slide.addText("Bloque 4", { x: 0.9, y: 1.86, w: 2.2, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.gold, margin: 0 });
  slide.addText("Generalización,\noverfitting y evaluación", { x: 0.9, y: 2.58, w: 7.5, h: 1.14, fontFace: TYPOGRAPHY.display, fontSize: 32, bold: true, color: C.white, margin: 0, breakLine: false });
  slide.addText("Un modelo útil no solo baja pérdida: funciona con casos nuevos y se evalúa con criterio.", { x: 0.92, y: 4.82, w: 8.9, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 15, bold: true, color: "D8E4EF", margin: 0 });
  addFormulaPanel(slide, SH, { x: 7.22, y: 5.12, w: 4.18, h: 1.12, title: "Pregunta del bloque", formula: "¿sirve fuera del entrenamiento?", reading: "evaluar es tan importante como entrenar", variant: "compact", fill: "173E64", line: "2D5E8B", accent: C.red, formulaFontSize: 12.2, titleColor: C.gold, readingColor: "D8E4EF" });
  validateSlide(slide, pptx);
}

function createLearningIsNotEnoughSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Aprender No Basta", "El objetivo real es responder bien ante datos nuevos", "Bloque 4");
  addCenterStatement(slide, SH, "Un modelo puede verse excelente con ejemplos conocidos y fallar cuando cambia el contexto.", { x: 1.0, y: 2.0, w: 10.72, h: 0.96, fill: C.navy, color: C.white, fontSize: 20 });
  [
    { title: "Entrenamiento", body: "casos usados para ajustar pesos", fill: C.softBlue, accent: C.navy },
    { title: "Uso real", body: "usuarios, datos y ataques nuevos", fill: C.warm, accent: C.gold },
    { title: "Evaluación", body: "prueba si la mejora es confiable", fill: C.paleRed, accent: C.red },
  ].forEach((item, idx) => addStepCard(slide, { x: 1.0 + idx * 3.58, y: 3.52, w: 3.06, h: 1.44, kicker: `FOCO 0${idx + 1}`, ...item, titleFontSize: 13.8, bodyFontSize: 9.6 }));
  addStatementBand(slide, "La pregunta profesional no es solo cuánto aprendió, sino dónde falla y cuánto cuesta ese error.", { y: 5.9, fontSize: 12.6 });
  validateSlide(slide, pptx);
}

function createDeepNetworkSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "De Una Neurona A Una Red Profunda", "Deep learning conecta muchas neuronas en capas sucesivas", "Bloque 4");
  addPlainPanel(slide, { x: 0.92, y: 2.0, w: 7.28, h: 3.78, fill: C.white, accent: C.navy });
  addDeepNetworkSketch(slide, { x: 1.64, y: 2.58, colGap: 1.76, node: 0.32 });
  addStepCard(slide, { x: 8.62, y: 2.0, w: 2.9, h: 1.12, kicker: "CLAVE", title: "profunda", body: "varias capas transforman los datos", fill: C.softBlue, line: C.softBlue, accent: C.navy, titleFontSize: 13, bodyFontSize: 9 });
  addStepCard(slide, { x: 8.62, y: 3.38, w: 2.9, h: 1.12, kicker: "NO SIGNIFICA", title: "pensamiento", body: "no piensa como una persona", fill: C.warm, line: C.warm, accent: C.gold, titleFontSize: 13, bodyFontSize: 9 });
  addStatementBand(slide, "La profundidad es una propiedad de la arquitectura, no una prueba de comprensión humana.", { y: 5.96, fontSize: 12.4 });
  validateSlide(slide, pptx);
}

function createHiddenLayersSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Qué Hace Una Capa Oculta", "Las capas intermedias construyen representaciones más elaboradas", "Bloque 4");
  const steps = [
    { title: "Datos originales", body: "pixeles, palabras, señales", fill: C.softBlue, accent: C.navy },
    { title: "Rasgos simples", body: "bordes, términos, eventos", fill: C.warm, accent: C.gold },
    { title: "Patrones compuestos", body: "formas, contexto, comportamiento", fill: C.paleRed, accent: C.red },
    { title: "Predicción", body: "clase, riesgo o puntaje", fill: C.mist, accent: C.slate },
  ];
  steps.forEach((step, idx) => {
    const x = 0.88 + idx * 2.72;
    addStepCard(slide, { x, y: 2.34, w: 2.3, h: 2.18, kicker: `CAPA 0${idx + 1}`, ...step, titleFontSize: 12.6, bodyFontSize: 9.4, bodyY: 3.44 });
    if (idx < steps.length - 1) slide.addShape(SH.line, { x: x + 2.36, y: 3.42, w: 0.34, h: 0, line: { color: C.guide, pt: 1.3, endArrowType: "triangle" } });
  });
  addStatementBand(slide, "Una capa oculta no es magia: es una transformación intermedia aprendida desde datos.", { y: 5.9, fontSize: 12.8 });
  validateSlide(slide, pptx);
}

function createLayerExamplesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Patrones Cada Vez Más Complejos", "La misma intuición sirve para imágenes, texto y seguridad", "Bloque 4");
  [
    { area: "Imagen", flow: "bordes -> formas -> partes -> objeto", accent: C.navy, fill: C.softBlue },
    { area: "Texto", flow: "palabras -> relaciones -> contexto -> intención", accent: C.gold, fill: C.warm },
    { area: "Cyber", flow: "evento -> patrón -> campaña -> riesgo", accent: C.red, fill: C.paleRed },
  ].forEach((row, idx) => {
    const y = 2.18 + idx * 1.16;
    addPlainPanel(slide, { x: 1.0, y, w: 10.36, h: 0.82, fill: row.fill, line: row.fill, accent: row.accent });
    slide.addText(row.area, { x: 1.38, y: y + 0.18, w: 1.24, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true, color: C.navy, margin: 0 });
    slide.addText(row.flow, { x: 3.0, y: y + 0.2, w: 7.4, h: 0.26, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 13.4, bold: true, color: C.ink, align: "center", margin: 0 });
  });
  addStatementBand(slide, "Las representaciones internas pueden ser útiles, pero también pueden capturar pistas superficiales.", { y: 5.9, fontSize: 12.5 });
  validateSlide(slide, pptx);
}

function createParameterCountSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Parámetros: Flexibilidad Con Costo", "Una red pequeña ya tiene muchos valores ajustables", "Bloque 4");
  addFormulaPanel(slide, SH, { x: 0.96, y: 2.0, w: 10.32, h: 0.94, title: "Red mínima", formula: "3 entradas -> 4 neuronas ocultas -> 1 salida", reading: "cada conexión tiene un peso; cada neurona puede tener sesgo", variant: "compact", accent: C.red, formulaFontSize: 14.2 });
  [["pesos entrada -> oculta", "3 * 4", "12"], ["sesgos capa oculta", "4", "4"], ["pesos oculta -> salida", "4", "4"], ["sesgo salida", "1", "1"]].forEach((row, idx) => {
    const y = 3.34 + idx * 0.44;
    slide.addShape(SH.roundRect, { x: 1.24, y: y - 0.06, w: 9.5, h: 0.34, rectRadius: 0.025, fill: { color: idx % 2 === 0 ? C.mist : C.white, transparency: 12 }, line: { color: C.mist, transparency: 100 } });
    slide.addText(row[0], { x: 1.42, y, w: 4.1, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 10.2, color: C.ink, margin: 0 });
    slide.addText(row[1], { x: 5.9, y, w: 1.3, h: 0.22, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 10.8, bold: true, color: C.navy, align: "center", margin: 0 });
    slide.addText(row[2], { x: 8.64, y, w: 0.8, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 12.2, bold: true, color: C.red, align: "center", margin: 0 });
  });
  addCenterStatement(slide, SH, "Total aproximado: 21 parámetros", { x: 3.2, y: 5.24, w: 5.4, h: 0.54, fill: C.navy, color: C.white, fontSize: 17 });
  addStatementBand(slide, "Más parámetros aumentan capacidad, pero también pueden memorizar ruido si la evaluación es débil.", { y: 6.08, fontSize: 11.8, h: 0.5 });
  validateSlide(slide, pptx);
}

function createGeneralizationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Generalización: El Objetivo Real", "El modelo debe funcionar con datos que no vio durante el entrenamiento", "Bloque 4");
  addPlainPanel(slide, { x: 1.0, y: 2.2, w: 4.6, h: 2.44, fill: C.softBlue, line: C.softBlue, accent: C.navy });
  slide.addText("Conocido", { x: 1.38, y: 2.5, w: 1.8, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.navy, margin: 0 });
  addTrainingBullets(slide, ["correos del dataset", "casos usados para aprender", "patrones ya vistos"], { x: 1.42, y: 3.1, w: 3.4, color: C.navy, fontSize: 10.8, pitch: 0.44 });
  slide.addShape(SH.line, { x: 5.8, y: 3.34, w: 0.82, h: 0, line: { color: C.red, pt: 1.7, endArrowType: "triangle" } });
  addPlainPanel(slide, { x: 6.82, y: 2.2, w: 4.6, h: 2.44, fill: C.paleRed, line: C.paleRed, accent: C.red });
  slide.addText("Nuevo", { x: 7.2, y: 2.5, w: 1.8, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.red, margin: 0 });
  addTrainingBullets(slide, ["correos de mañana", "usuarios distintos", "ataques que cambian"], { x: 7.24, y: 3.1, w: 3.4, color: C.red, fontSize: 10.8, pitch: 0.44 });
  addStatementBand(slide, "Generalizar significa aprender patrones útiles, no memorizar respuestas conocidas.", { y: 5.86, fontSize: 13 });
  validateSlide(slide, pptx);
}

function createTrainTestSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Separar Datos: Entrenamiento Y Prueba", "La evaluación simula casos que el modelo no usó para aprender", "Bloque 4");
  addCenterStatement(slide, SH, "1.000 ejemplos disponibles", { x: 1.0, y: 2.1, w: 10.4, h: 0.58, fill: C.navy, color: C.white, fontSize: 18 });
  addTrainTestSplit(slide, { x: 1.0, y: 3.14, w: 10.4 });
  addStepCard(slide, { x: 1.12, y: 4.08, w: 4.46, h: 1.62, kicker: "ENTRENAMIENTO", title: "ajusta parámetros", body: "", fill: C.softBlue, line: C.softBlue, accent: C.navy, titleFontSize: 11.8 });
  addStepCard(slide, { x: 6.42, y: 4.08, w: 4.46, h: 1.62, kicker: "PRUEBA", title: "mide generalización", body: "", fill: C.paleRed, line: C.paleRed, accent: C.red, titleFontSize: 11.8 });
  addStatementBand(slide, "No se debe evaluar al modelo solo con las mismas preguntas que usó para estudiar.", { y: 6.0, fontSize: 12.6 });
  validateSlide(slide, pptx);
}

function createEvaluationMatrixSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Leer Entrenamiento Y Prueba Juntos", "La combinación de resultados cuenta una historia técnica", "Bloque 4");
  [
    { x: 1.0, y: 2.28, title: "Bien / Bien", body: "señal positiva: puede generalizar", fill: C.softBlue, accent: C.navy },
    { x: 6.3, y: 2.28, title: "Bien / Mal", body: "alerta: posible overfitting", fill: C.paleRed, accent: C.red },
    { x: 1.0, y: 4.0, title: "Mal / Mal", body: "modelo insuficiente o datos pobres", fill: C.warm, accent: C.gold },
    { x: 6.3, y: 4.0, title: "Mal / Bien", body: "caso raro: revisar evaluación", fill: C.mist, accent: C.slate },
  ].forEach((cell) => addStepCard(slide, { x: cell.x, y: cell.y, w: 4.62, h: 1.28, kicker: "ENTRENAMIENTO / PRUEBA", ...cell, titleFontSize: 15, bodyFontSize: 10, bodyY: cell.y + 0.86 }));
  addStatementBand(slide, "El número aislado no basta: hay que mirar con qué datos se obtuvo.", { y: 5.9, fontSize: 13 });
  validateSlide(slide, pptx);
}

function createOverfittingSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Overfitting: Memorizar No Es Generalizar", "El modelo aprende demasiado los detalles de lo conocido", "Bloque 4");
  addPlainPanel(slide, { x: 0.96, y: 2.0, w: 4.9, h: 3.18, fill: C.warm, line: C.warm, accent: C.gold });
  slide.addText("Analogía", { x: 1.34, y: 2.3, w: 1.4, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true, color: C.navy, margin: 0 });
  addTrainingBullets(slide, ["memoriza la guía exacta", "responde bien lo conocido", "falla si cambia el contexto"], { x: 1.38, y: 3.0, w: 3.7, color: C.gold, fontSize: 11.2, pitch: 0.5 });
  addPlainPanel(slide, { x: 6.52, y: 2.0, w: 4.9, h: 3.18, fill: C.paleRed, line: C.paleRed, accent: C.red });
  slide.addText("Modelo", { x: 6.9, y: 2.3, w: 1.4, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true, color: C.red, margin: 0 });
  addTrainingBullets(slide, ["aprende ruido del dataset", "parece muy bueno entrenando", "falla ante datos nuevos"], { x: 6.94, y: 3.0, w: 3.7, color: C.red, fontSize: 11.2, pitch: 0.5 });
  addStatementBand(slide, "Señal típica: pérdida de entrenamiento baja, pérdida de prueba alta.", { y: 5.9, fontSize: 13.2 });
  validateSlide(slide, pptx);
}

function createOverfittingChartSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Señal Visual Del Overfitting", "La pérdida de entrenamiento baja, pero la de prueba empieza a empeorar", "Bloque 4");
  addLossComparisonChart(slide, { x: 0.96, y: 2.0, w: 6.34, h: 3.72, title: "Pérdida por época" });
  addStepCard(slide, { x: 7.72, y: 2.06, w: 3.48, h: 1.2, kicker: "LECTURA", title: "entrenamiento mejora", body: "la línea azul sigue bajando", fill: C.softBlue, line: C.softBlue, accent: C.navy, titleFontSize: 12.2, bodyFontSize: 9.2 });
  addStepCard(slide, { x: 7.72, y: 3.56, w: 3.48, h: 1.2, kicker: "ALERTA", title: "prueba empeora", body: "la línea roja sube con datos nuevos", fill: C.paleRed, line: C.paleRed, accent: C.red, titleFontSize: 12.2, bodyFontSize: 9.2 });
  addStatementBand(slide, "Overfitting se detecta comparando, no celebrando solo la pérdida de entrenamiento.", { y: 5.94, fontSize: 12.2 });
  validateSlide(slide, pptx);
}

function createUnderOverGeneralSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Tres Escenarios Que Hay Que Distinguir", "No todo error significa lo mismo", "Bloque 4");
  [
    { title: "Underfitting", body: "alto error en entrenamiento y prueba", fill: C.warm, accent: C.gold },
    { title: "Overfitting", body: "bajo error entrenando, alto error en prueba", fill: C.paleRed, accent: C.red },
    { title: "Generalización", body: "error razonable en ambos conjuntos", fill: C.softBlue, accent: C.navy },
  ].forEach((s, idx) => addStepCard(slide, { x: 0.96 + idx * 3.54, y: 2.2, w: 3.02, h: 2.64, kicker: `ESCENARIO 0${idx + 1}`, ...s, titleFontSize: 14, bodyFontSize: 10.2, bodyY: 3.42 }));
  addStatementBand(slide, "La solución depende del diagnóstico: más capas no arreglan todo y a veces empeoran el problema.", { y: 5.92, fontSize: 12.3 });
  validateSlide(slide, pptx);
}

function createAccuracyFormulaSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Accuracy: Una Métrica Simple", "Sirve para empezar, pero no siempre cuenta la historia completa", "Bloque 4");
  addFormulaPanel(slide, SH, { x: 1.02, y: 2.0, w: 10.16, h: 1.38, title: "Exactitud", formula: "accuracy = predicciones correctas / total de predicciones", reading: "80 aciertos de 100 -> 0.80 -> 80%", variant: "compact", accent: C.red, formulaFontSize: 15.4 });
  [
    { title: "Correctas", body: "lo que el modelo acertó", fill: C.softBlue, accent: C.navy },
    { title: "Total", body: "todos los casos evaluados", fill: C.warm, accent: C.gold },
    { title: "Límite", body: "no explica qué errores comete", fill: C.paleRed, accent: C.red },
  ].forEach((p, idx) => addStepCard(slide, { x: 1.0 + idx * 3.58, y: 4.0, w: 3.04, h: 1.1, kicker: "LECTURA", ...p, titleFontSize: 13, bodyFontSize: 9 }));
  addStatementBand(slide, "Una métrica alta no siempre significa que el modelo sea útil o seguro.", { y: 5.92, fontSize: 13 });
  validateSlide(slide, pptx);
}

function createAccuracyTrapSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Cuando Accuracy Engaña", "Un modelo puede acertar mucho y fallar justo en lo importante", "Bloque 4");
  addCenterStatement(slide, SH, "1.000 transacciones: 990 legítimas y 10 fraude", { x: 1.0, y: 2.0, w: 10.4, h: 0.62, fill: C.navy, color: C.white, fontSize: 18 });
  addPlainPanel(slide, { x: 1.02, y: 3.08, w: 4.78, h: 1.78, fill: C.softBlue, line: C.softBlue, accent: C.navy });
  slide.addText("Modelo tonto", { x: 1.4, y: 3.38, w: 2.2, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true, color: C.navy, margin: 0 });
  slide.addText("siempre predice: legítima", { x: 1.4, y: 4.02, w: 3.5, h: 0.24, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 12.2, color: C.ink, margin: 0 });
  addPlainPanel(slide, { x: 6.46, y: 3.08, w: 4.78, h: 1.78, fill: C.paleRed, line: C.paleRed, accent: C.red });
  slide.addText("Resultado aparente", { x: 6.84, y: 3.38, w: 2.6, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true, color: C.red, margin: 0 });
  slide.addText("990 / 1000 = 99%\npero detecta 0 fraudes", { x: 6.84, y: 3.94, w: 3.5, h: 0.52, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 12.2, color: C.ink, margin: 0, breakLine: false });
  addStatementBand(slide, "En fraude o seguridad, el tipo de error puede importar más que el porcentaje global.", { y: 5.92, fontSize: 12.6 });
  validateSlide(slide, pptx);
}

function createFalsePositiveNegativeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Falsos Positivos Y Falsos Negativos", "En clasificación, no todos los errores tienen el mismo costo", "Bloque 4");
  [
    { title: "Verdadero positivo", body: "marca phishing y sí era phishing", fill: C.softBlue, accent: C.navy },
    { title: "Verdadero negativo", body: "no alerta y era correo normal", fill: C.mist, accent: C.slate },
    { title: "Falso positivo", body: "alerta, pero era normal", fill: C.warm, accent: C.gold },
    { title: "Falso negativo", body: "no alerta, pero era phishing", fill: C.paleRed, accent: C.red },
  ].forEach((c, idx) => {
    const x = 1.0 + (idx % 2) * 5.18;
    const y = 2.22 + Math.floor(idx / 2) * 1.52;
    addStepCard(slide, { x, y, w: 4.48, h: 1.14, kicker: idx < 2 ? "ACIERTO" : "ERROR", ...c, titleFontSize: 12.8, bodyFontSize: 9.4, bodyY: y + 0.78 });
  });
  addStatementBand(slide, "La pregunta correcta es: ¿qué error es más peligroso en este sistema?", { y: 5.92, fontSize: 13.2 });
  validateSlide(slide, pptx);
}

function createDataRisksSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Riesgos De Datos", "Un modelo depende de lo que vio y de cómo cambia el mundo", "Bloque 4");
  [
    { title: "Sesgo", body: "los datos reflejan errores o desigualdades", fill: C.paleRed, accent: C.red },
    { title: "Representatividad", body: "faltan casos reales importantes", fill: C.warm, accent: C.gold },
    { title: "Deriva", body: "los datos nuevos ya no se parecen a los antiguos", fill: C.softBlue, accent: C.navy },
  ].forEach((risk, idx) => addStepCard(slide, { x: 0.98 + idx * 3.56, y: 2.18, w: 3.02, h: 2.54, kicker: `RIESGO 0${idx + 1}`, ...risk, titleFontSize: 14, bodyFontSize: 10, bodyY: 3.38 }));
  addStatementBand(slide, "Evaluar no es un trámite inicial: es una práctica continua en sistemas vivos.", { y: 5.9, fontSize: 13 });
  validateSlide(slide, pptx);
}

function createModelAttackSurfaceSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Eje Cyber: El Modelo También Es Superficie De Ataque", "Integrar IA agrega piezas que deben limitarse, auditarse y monitorearse", "Bloque 4");
  addPlainPanel(slide, { x: 0.98, y: 2.0, w: 5.1, h: 3.42, fill: C.paleRed, line: C.paleRed, accent: C.red });
  slide.addText("Riesgos", { x: 1.36, y: 2.3, w: 1.4, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.red, margin: 0 });
  addTrainingBullets(slide, ["datos sensibles sin control", "acciones sin permisos claros", "entradas manipuladas", "sin logs para auditar"], { x: 1.4, y: 2.98, w: 3.8, color: C.red, fontSize: 11, pitch: 0.48 });
  addPlainPanel(slide, { x: 6.66, y: 2.0, w: 4.78, h: 3.42, fill: C.white, line: C.border, accent: C.navy });
  slide.addText("Defensas", { x: 7.04, y: 2.3, w: 1.6, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.navy, margin: 0 });
  addTrainingBullets(slide, ["mínimo privilegio", "revisión humana", "monitoreo y alertas", "trazabilidad"], { x: 7.08, y: 2.98, w: 3.5, color: C.navy, fontSize: 11, pitch: 0.48 });
  addStatementBand(slide, "La IA no elimina seguridad: agrega componentes que también deben diseñarse y controlarse.", { y: 5.9, fontSize: 12.4 });
  validateSlide(slide, pptx);
}

function createResponsibleChecklistSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Checklist Antes De Usar Un Modelo", "No basta con saber que una red tiene capas; hay que hacer preguntas técnicas", "Bloque 4");
  ["datos representativos", "prueba con casos no vistos", "métrica conectada al riesgo", "falsos positivos y negativos", "impacto si se equivoca", "monitoreo y corrección"].forEach((check, idx) => {
    const x = 1.0 + (idx % 2) * 5.08;
    const y = 2.08 + Math.floor(idx / 2) * 0.92;
    addPlainPanel(slide, { x, y, w: 4.44, h: 0.64, fill: idx % 2 === 0 ? C.softBlue : C.warm, line: idx % 2 === 0 ? C.softBlue : C.warm, accent: idx % 2 === 0 ? C.navy : C.gold });
    slide.addText(check, { x: x + 0.4, y: y + 0.18, w: 3.72, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 12.2, bold: true, color: C.navy, margin: 0 });
  });
  addStatementBand(slide, "Confiar en un modelo exige evidencia, límites y responsabilidad sobre su impacto.", { y: 5.9, fontSize: 13 });
  validateSlide(slide, pptx);
}

function createLlmBridgeSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addBarsMotif(slide, 0.8, 0.72, 1.15, C.red);
  slide.addText("Puente Hacia LLMs Y Agentes", { x: 1.7, y: 1.1, w: 7.8, h: 0.52, fontFace: TYPOGRAPHY.display, fontSize: 27, bold: true, color: C.white, margin: 0 });
  slide.addText("Los modelos de lenguaje parecen distintos, pero comparten ideas de fondo.", { x: 1.72, y: 1.82, w: 8.2, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 12.4, color: "D8E4EF", margin: 0 });
  ["datos", "representaciones", "parámetros", "predicciones", "errores", "evaluación", "límites"].forEach((item, idx) => {
    const x = 1.02 + (idx % 4) * 2.52;
    const y = 2.74 + Math.floor(idx / 4) * 1.0;
    addPlainPanel(slide, { x, y, w: 2.1, h: 0.68, fill: idx % 2 === 0 ? "173E64" : "1D4A73", line: "2D5E8B", accent: idx % 2 === 0 ? C.gold : C.red });
    slide.addText(item, { x: x + 0.36, y: y + 0.2, w: 1.48, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 10.8, bold: true, color: C.white, align: "center", margin: 0 });
  });
  slide.addText("Sin esta base, los LLMs parecen magia. Con esta base, se leen como sistemas técnicos entrenados sobre datos.", { x: 1.1, y: 5.7, w: 10.0, h: 0.42, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.white, align: "center", margin: 0 });
  validateSlide(slide, pptx);
}

function createAgentsGeneralizationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Agentes Para Estudiar Evaluación", "Pueden comparar escenarios, pero no decidir si un modelo es seguro", "Bloque 4");
  addPlainPanel(slide, { x: 0.96, y: 2.0, w: 5.22, h: 3.3, fill: C.navy, line: C.navy, accent: C.gold });
  slide.addText("Prompt útil", { x: 1.34, y: 2.3, w: 1.6, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 14.5, bold: true, color: C.gold, margin: 0 });
  slide.addText("Compara underfitting, overfitting y generalización usando una analogía de estudio y un ejemplo de ciberseguridad. Incluye entrenamiento, prueba, interpretación y riesgo.", { x: 1.34, y: 2.9, w: 4.2, h: 1.22, fontFace: TYPOGRAPHY.body, fontSize: 10.8, color: C.white, margin: 0, breakLine: false });
  addPlainPanel(slide, { x: 6.68, y: 2.0, w: 4.72, h: 3.3, fill: C.white, line: C.border, accent: C.red });
  slide.addText("Validación humana", { x: 7.06, y: 2.3, w: 2.4, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 14.5, bold: true, color: C.red, margin: 0 });
  addTrainingBullets(slide, ["no confundir overfitting con buen aprendizaje", "no vender accuracy como suficiente", "mencionar FP/FN en seguridad", "conectar métrica con impacto real"], { x: 7.1, y: 2.92, w: 3.54, color: C.red, fontSize: 9.8, pitch: 0.44 });
  addStatementBand(slide, "Un agente explica; el criterio profesional decide si la explicación alcanza.", { y: 5.92, fontSize: 13 });
  validateSlide(slide, pptx);
}

function createBlock4RecapSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Recapitulación Del Bloque 4", "Evaluar es comprobar si el aprendizaje sirve fuera del entrenamiento", "Bloque 4");
  addFormulaPanel(slide, SH, { x: 0.96, y: 2.02, w: 10.34, h: 1.12, title: "Ruta de evaluación", formula: "train/test -> generalización -> errores -> impacto -> límites", reading: "un modelo se juzga por desempeño, riesgos y contexto de uso", variant: "compact", accent: C.red, formulaFontSize: 13.2 });
  [
    { title: "generalización", body: "funciona con datos nuevos", fill: C.softBlue, accent: C.navy },
    { title: "overfitting", body: "memoriza lo conocido", fill: C.paleRed, accent: C.red },
    { title: "métricas", body: "pueden engañar", fill: C.warm, accent: C.gold },
    { title: "seguridad", body: "exige límites y auditoría", fill: C.mist, accent: C.slate },
  ].forEach((item, idx) => addStepCard(slide, { x: 0.96 + idx * 2.66, y: 3.72, w: 2.34, h: 1.34, kicker: `0${idx + 1}`, ...item, titleFontSize: 12.6, bodyFontSize: 8.8, bodyY: 4.68 }));
  addStatementBand(slide, "Deep learning se vuelve útil cuando entrenamiento, evaluación y criterio trabajan juntos.", { y: 5.92, fontSize: 12.8 });
  validateSlide(slide, pptx);
}

function createBlock4QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas De Seguimiento", "Bloque 4 · Generalización, overfitting y evaluación", "Bloque 4");
  addFollowUpQuestion(slide, { x: 0.96, y: 2.0, w: 10.34, h: 1.12, badge: "01", question: "¿Por qué un modelo puede tener buen resultado en entrenamiento y fallar con datos nuevos?", hint: "Usa la idea de memorizar ejemplos conocidos versus aprender patrones transferibles.", accent: C.red, fill: C.paleRed, line: C.paleRed });
  addFollowUpQuestion(slide, { x: 0.96, y: 3.42, w: 10.34, h: 1.12, badge: "02", question: "¿Qué diferencia hay entre underfitting, overfitting y generalización razonable?", hint: "Compara desempeño en entrenamiento y prueba; no respondas solo con definiciones sueltas.", accent: C.navy, fill: C.softBlue, line: C.softBlue });
  addFollowUpQuestion(slide, { x: 0.96, y: 4.84, w: 10.34, h: 1.12, badge: "03", question: "¿Por qué accuracy puede ser engañosa en fraude o ciberseguridad?", hint: "Piensa en clases desbalanceadas, falsos negativos y costo real del error.", accent: C.gold, fill: C.warm, line: C.warm });
  validateSlide(slide, pptx);
}

function createClosingJourneySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Cierre: El Recorrido Completo", "De la inspiración biológica al criterio técnico para evaluar modelos", "Cierre");
  [
    { title: "Neurona", body: "señales y activación", fill: C.warm, accent: C.gold },
    { title: "Perceptrón", body: "pesos, sesgo y salida", fill: C.softBlue, accent: C.navy },
    { title: "Entrenamiento", body: "error, pérdida y ajuste", fill: C.paleRed, accent: C.red },
    { title: "Evaluación", body: "generalización y riesgo", fill: C.mist, accent: C.slate },
  ].forEach((s, idx) => {
    const x = 0.84 + idx * 2.72;
    addStepCard(slide, { x, y: 2.42, w: 2.34, h: 2.0, kicker: `ETAPA 0${idx + 1}`, ...s, titleFontSize: 13.4, bodyFontSize: 9.4, bodyY: 3.46 });
    if (idx < 3) slide.addShape(SH.line, { x: x + 2.38, y: 3.34, w: 0.36, h: 0, line: { color: C.guide, pt: 1.2, endArrowType: "triangle" } });
  });
  addStatementBand(slide, "Deep learning no es magia: es transformación de datos con parámetros y evaluación.", { y: 5.9, fontSize: 12.6 });
  validateSlide(slide, pptx);
}

function createClosingFormulasSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Fórmulas Mínimas De La Clase", "No son para decorar: son el lenguaje técnico que permite razonar", "Cierre");
  [
    { title: "Suma ponderada", formula: "z = w1*x1 + w2*x2 + ... + wn*xn + b", body: "combina entradas, pesos y sesgo", accent: C.navy, fill: C.softBlue },
    { title: "Activación", formula: "si z >= 0 -> salida = 1", body: "transforma señal acumulada en decisión", accent: C.gold, fill: C.warm },
    { title: "Error", formula: "error = y - ŷ", body: "compara respuesta real y predicción", accent: C.red, fill: C.paleRed },
    { title: "Pérdida", formula: "L = (y - ŷ)^2", body: "mide distancia y castiga errores grandes", accent: C.slate, fill: C.mist },
  ].forEach((f, idx) => {
    const x = 0.94 + (idx % 2) * 5.28;
    const y = 2.02 + Math.floor(idx / 2) * 1.62;
    addPlainPanel(slide, { x, y, w: 4.72, h: 1.2, fill: f.fill, line: f.fill, accent: f.accent });
    slide.addText(f.title, { x: x + 0.38, y: y + 0.16, w: 2.4, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 12.8, bold: true, color: C.navy, margin: 0 });
    slide.addText(f.formula, { x: x + 0.38, y: y + 0.5, w: 3.92, h: 0.22, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 10.6, bold: true, color: C.ink, align: "center", margin: 0, fit: "shrink" });
    slide.addText(f.body, { x: x + 0.38, y: y + 0.84, w: 3.92, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 8.8, color: C.slate, align: "center", margin: 0 });
  });
  addStatementBand(slide, "Estas fórmulas permiten leer una red simple sin necesitar cálculo avanzado todavía.", { y: 5.92, fontSize: 12.6 });
  validateSlide(slide, pptx);
}

function createClosingGlossarySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Glosario Visual Mínimo", "Los símbolos se entienden por su rol dentro del flujo", "Cierre");
  [["x", "entrada"], ["w", "peso"], ["b", "sesgo"], ["z", "suma"], ["ŷ", "predicción"], ["y", "real"], ["L", "pérdida"], ["test", "datos nuevos"]].forEach((term, idx) => {
    const x = 0.94 + (idx % 4) * 2.64;
    const y = 2.14 + Math.floor(idx / 4) * 1.46;
    addPlainPanel(slide, { x, y, w: 2.22, h: 1.02, fill: idx % 2 === 0 ? C.softBlue : C.warm, line: idx % 2 === 0 ? C.softBlue : C.warm, accent: idx % 2 === 0 ? C.navy : C.gold });
    slide.addText(term[0], { x: x + 0.36, y: y + 0.18, w: 0.62, h: 0.36, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 18, bold: true, color: idx === 6 ? C.red : C.navy, align: "center", margin: 0 });
    slide.addText(term[1], { x: x + 1.0, y: y + 0.34, w: 0.92, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 10.6, bold: true, color: C.ink, align: "center", margin: 0 });
  });
  addStatementBand(slide, "El vocabulario técnico permite preguntar mejor, depurar mejor y no depender de explicaciones vagas.", { y: 5.9, fontSize: 12.2 });
  validateSlide(slide, pptx);
}

function createClosingChecklistSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Checklist Final Para Interpretar Un Modelo", "Antes de integrar IA en una aplicación, estas preguntas no son opcionales", "Cierre");
  ["¿qué datos recibe?", "¿qué predice?", "¿cómo se evaluó?", "¿qué errores comete?", "¿qué pasa si falla?", "¿hay monitoreo y corrección?"].forEach((check, idx) => {
    const x = 1.0 + (idx % 2) * 5.16;
    const y = 2.04 + Math.floor(idx / 2) * 0.88;
    addPlainPanel(slide, { x, y, w: 4.5, h: 0.58, fill: idx % 2 === 0 ? C.softBlue : C.paleRed, line: idx % 2 === 0 ? C.softBlue : C.paleRed, accent: idx % 2 === 0 ? C.navy : C.red });
    slide.addText(check, { x: x + 0.38, y: y + 0.16, w: 3.76, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 11.8, bold: true, color: C.navy, margin: 0 });
  });
  addStatementBand(slide, "Un modelo sin evaluación, límites y trazabilidad no debe recibir confianza automática.", { y: 5.88, fontSize: 13 });
  validateSlide(slide, pptx);
}

function createClosingNextClassSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addBarsMotif(slide, 0.8, 0.72, 1.15, C.red);
  slide.addText("Próximo Paso", { x: 1.66, y: 1.1, w: 4.4, h: 0.48, fontFace: TYPOGRAPHY.display, fontSize: 28, bold: true, color: C.white, margin: 0 });
  slide.addText("Modelos de lenguaje, LLMs y agentes", { x: 1.68, y: 1.78, w: 7.8, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 13.2, color: "D8E4EF", margin: 0 });
  ["tokens", "embeddings", "transformers", "prompting", "herramientas", "memoria", "evaluación"].forEach((item, idx) => {
    const x = 1.08 + (idx % 4) * 2.44;
    const y = 2.74 + Math.floor(idx / 4) * 0.96;
    addPlainPanel(slide, { x, y, w: 2.0, h: 0.62, fill: "173E64", line: "2D5E8B", accent: idx % 2 === 0 ? C.gold : C.red });
    slide.addText(item, { x: x + 0.34, y: y + 0.18, w: 1.36, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 10.4, bold: true, color: C.white, align: "center", margin: 0 });
  });
  slide.addText("La conexión es directa: datos -> representación -> predicción -> evaluación -> control.", { x: 1.08, y: 5.58, w: 10.1, h: 0.36, fontFace: TYPOGRAPHY.display, fontSize: 16.2, bold: true, color: C.white, align: "center", margin: 0 });
  validateSlide(slide, pptx);
}

function createFinalIdeaSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addBarsMotif(slide, 0.86, 0.78, 1.2, C.red);
  slide.addText("Idea Final", { x: 0.94, y: 1.76, w: 3.1, h: 0.42, fontFace: TYPOGRAPHY.display, fontSize: 22, bold: true, color: C.gold, margin: 0 });
  slide.addText("Entender deep learning no exige dominar cálculo avanzado desde el primer día.", { x: 0.94, y: 2.56, w: 9.8, h: 0.48, fontFace: TYPOGRAPHY.display, fontSize: 23, bold: true, color: C.white, margin: 0 });
  slide.addText("Exige comprender qué representan los datos, cómo se combinan señales, cómo se mide el error, cómo se ajustan parámetros y por qué validar un modelo es tan importante como entrenarlo.", { x: 0.96, y: 3.58, w: 10.0, h: 0.84, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "D8E4EF", margin: 0, breakLine: false });
  addFormulaPanel(slide, SH, { x: 1.08, y: 5.28, w: 9.7, h: 0.92, title: "Base instalada", formula: "datos -> señales -> predicción -> pérdida -> ajuste -> evaluación", reading: "sin evaluación, el aprendizaje no alcanza", variant: "compact", fill: "173E64", line: "2D5E8B", accent: C.red, formulaFontSize: 13.4, titleColor: C.gold, readingColor: "D8E4EF" });
  validateSlide(slide, pptx);
}

createCoverSlide();
createMapSlide();
createWhyMattersSlide();
createNoMagicSlide();
createFormulaPromiseSlide();
createBlock1OpeningSlide();
createWhyNeuralNameSlide();
createBiologicalAnatomySlide();
createFourStepPatternSlide();
createBiologyToArtificialSlide();
createNotBrainSlide();
createSignalsBecomeNumbersSlide();
createWeightedSumFormulaSlide();
createWeightsMeaningSlide();
createBiasSlide();
createWeightedExampleSlide();
createActivationSlide();
createFullFlowSlide();
createGuidedComparisonSlide();
createLearningMeaningSlide();
createRulesVsLearningSlide();
createNetworksNeedSlide();
createDeepMeansLayersSlide();
createCyberRiskSlide();
createAgentMethodSlide();
createBlock1RecapSlide();
createBlock1QuestionsSlide();
createBlock2OpeningSlide();
createPerceptronDefinitionSlide();
createPerceptronAnatomySlide();
createPerceptronFormulaSlide();
createBinaryExamplesSlide();
createSuspiciousEmailSignalsSlide();
createEmailWeightsSlide();
createEmailCaseOneSlide();
createEmailCaseTwoSlide();
createWeightsLearnSlide();
createLinearSeparationSlide();
createPerceptronLimitSlide();
createWebRequestPerceptronSlide();
createDecisionNotBusinessRuleSlide();
createAgentsPerceptronSlide();
createBlock2RecapSlide();
createBlock2QuestionsSlide();
createBlock3OpeningSlide();
createTrainingQuestionSlide();
createTrainingCycleSlide();
createSupervisedLabelsSlide();
createYHatNotationSlide();
createErrorSimpleSlide();
createCancellationProblemSlide();
createLossFunctionSlide();
createSquaredLossExamplesSlide();
createNotJustHitOrMissSlide();
createNumericPredictionSlide();
createParametersAdjustSlide();
createDescentIntuitionSlide();
createEpochsIterationsSlide();
createDataQualitySlide();
createTrainingTableSlide();
createMinimizeLossSlide();
createCyberTrainingRiskSlide();
createAgentsTrainingSlide();
createBlock3RecapSlide();
createBlock3QuestionsSlide();
createBlock4OpeningSlide();
createLearningIsNotEnoughSlide();
createDeepNetworkSlide();
createHiddenLayersSlide();
createLayerExamplesSlide();
createParameterCountSlide();
createGeneralizationSlide();
createTrainTestSlide();
createEvaluationMatrixSlide();
createOverfittingSlide();
createOverfittingChartSlide();
createUnderOverGeneralSlide();
createAccuracyFormulaSlide();
createAccuracyTrapSlide();
createFalsePositiveNegativeSlide();
createDataRisksSlide();
createModelAttackSurfaceSlide();
createResponsibleChecklistSlide();
createLlmBridgeSlide();
createAgentsGeneralizationSlide();
createBlock4RecapSlide();
createBlock4QuestionsSlide();
createClosingJourneySlide();
createClosingFormulasSlide();
createClosingGlossarySlide();
createClosingChecklistSlide();
createClosingNextClassSlide();
createFinalIdeaSlide();

pptx.writeFile({ fileName: outputPptx }).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
