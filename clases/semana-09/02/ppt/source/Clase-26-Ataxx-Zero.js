const path = require("path");
const PptxGenJS = require("../../../../../tools/slides-system/node_modules/pptxgenjs");
const slidesSystem = require("../../../../../tools/slides-system");

const { theme, components, utils } = slidesSystem;
const { applyAiepTheme, TOKENS: C, TYPOGRAPHY } = theme;
const {
  addHeader: systemAddHeader,
  addCenterStatement,
  addCodePanel,
  addAtaxxBoardState,
  addPolicyValueArchitecture,
  addMctsSearchPanel,
  addSelfPlayLoopPanel,
  addModelGenerationTable,
} = components;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";

applyAiepTheme(pptx, {
  author: "Diego Obando",
  company: "AIEP",
  subject: "Clase 26",
  title: "Construir IA para un dominio acotado: Ataxx Zero",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx = path.join(rootDir, "Clase-26-Ataxx-Zero-parcial.pptx");
const logoPath = path.resolve(__dirname, "../../../../../.agent/skills/slides-aiep/assets/logo-aiep.png");
const logoMarkPath = path.resolve(__dirname, "../../../../../.agent/skills/slides-aiep/assets/logo-aiep-mark.png");

function addHeader(slide, title, subtitle, blockLabel = "Contexto") {
  systemAddHeader(slide, SH, pptx, title, subtitle, blockLabel, {
    classLabel: `Clase 26 · ${blockLabel}`,
    titleY: 0.86,
    titleH: 0.66,
    titleW: 9.25,
    subtitleY: 1.55,
    subtitleH: 0.32,
    subtitleW: 9.35,
    subtitleFontSize: 10.4,
    logoMarkPath,
    mark: { fill: C.softNeutral },
  });
}

function text(slide, value, opts = {}) {
  slide.addText(value || "", {
    x: opts.x,
    y: opts.y,
    w: opts.w,
    h: opts.h,
    fontFace: opts.fontFace || TYPOGRAPHY.body,
    fontSize: opts.fontSize || 10,
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
    rectRadius: opts.rectRadius || 0.05,
    fill: { color: opts.fill || C.white, transparency: opts.transparency },
    line: { color: opts.line || C.border, pt: opts.linePt || 1, transparency: opts.lineTransparency },
  });
}

function accent(slide, x, y, h, color = C.red, w = 0.12) {
  slide.addShape(SH.rect, {
    x,
    y,
    w,
    h,
    fill: { color },
    line: { color },
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
      beginArrowType: reverse ? (opts.endArrowType || "triangle") : "none",
      endArrowType: reverse ? "none" : (opts.endArrowType || "triangle"),
      dash: opts.dash,
      transparency: opts.transparency,
    },
  });
}

function pill(slide, label, x, y, w, opts = {}) {
  surface(slide, x, y, w, opts.h || 0.34, {
    fill: opts.fill || C.navy,
    line: opts.fill || C.navy,
    rectRadius: 0.04,
  });
  text(slide, label, {
    x: x + 0.1,
    y: y + 0.09,
    w: w - 0.2,
    h: 0.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.fontSize || 8.4,
    bold: true,
    color: opts.color || C.white,
    align: "center",
  });
}

function addBarsMotif(slide, x, y, scale = 1, fill = C.red) {
  slide.addShape(SH.rect, { x, y: y + 0.18 * scale, w: 0.2 * scale, h: 0.46 * scale, fill: { color: fill }, line: { color: fill } });
  slide.addShape(SH.rect, { x: x + 0.24 * scale, y, w: 0.24 * scale, h: 0.64 * scale, fill: { color: fill }, line: { color: fill } });
  slide.addShape(SH.rect, { x: x + 0.52 * scale, y: y + 0.18 * scale, w: 0.2 * scale, h: 0.46 * scale, fill: { color: fill }, line: { color: fill } });
}

function drawMiniBoard(slide, x, y, side, opts = {}) {
  const cell = side / 7;
  slide.addShape(SH.rect, { x, y, w: side, h: side, fill: { color: "F7FAFD" }, line: { color: opts.line || C.navy, pt: 1.2 } });
  for (let r = 0; r < 7; r += 1) {
    for (let c = 0; c < 7; c += 1) {
      slide.addShape(SH.rect, {
        x: x + c * cell,
        y: y + r * cell,
        w: cell,
        h: cell,
        fill: { color: (r + c) % 2 === 0 ? C.white : "E8EEF5" },
        line: { color: "D3DDE8", pt: 0.45 },
      });
    }
  }
  const pieces = opts.pieces || [
    [0, 0, 1],
    [6, 6, 1],
    [0, 6, -1],
    [6, 0, -1],
  ];
  pieces.forEach(([r, c, player]) => {
    const color = player === 1 ? C.red : C.titleFill;
    slide.addShape(SH.ellipse, {
      x: x + c * cell + cell * 0.2,
      y: y + r * cell + cell * 0.2,
      w: cell * 0.6,
      h: cell * 0.6,
      fill: { color },
      line: { color: player === 1 ? "9E171B" : C.navy, pt: 1 },
    });
  });
}

function addMetricCard(slide, opts = {}) {
  surface(slide, opts.x, opts.y, opts.w, opts.h, { fill: opts.fill || C.white, line: opts.line || C.border });
  accent(slide, opts.x + 0.14, opts.y + 0.16, opts.h - 0.32, opts.accent || C.red);
  text(slide, opts.label, {
    x: opts.x + 0.36,
    y: opts.y + 0.18,
    w: opts.w - 0.56,
    h: 0.16,
    fontSize: 8.2,
    bold: true,
    color: opts.labelColor || opts.accent || C.red,
  });
  text(slide, opts.value, {
    x: opts.x + 0.36,
    y: opts.y + 0.48,
    w: opts.w - 0.56,
    h: opts.valueH || 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.valueFontSize || 18,
    bold: true,
    color: opts.valueColor || C.navy,
  });
  if (opts.body) {
    text(slide, opts.body, {
      x: opts.x + 0.36,
      y: opts.y + 0.96,
      w: opts.w - 0.56,
      h: opts.h - 1.1,
      fontSize: opts.bodyFontSize || 8.6,
      color: opts.bodyColor || C.slate,
    });
  }
}

function addFollowUpSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas de seguimiento", "Antes de pasar a heurísticas, fijamos el problema con precisión.", "Bloque 1");

  const questions = [
    {
      n: "01",
      q: "Si una jugada puede convertir hasta ocho piezas, ¿por qué contar piezas no alcanza?",
      h: "Pista: separa ventaja visible, amenaza local y respuesta del rival.",
      accent: C.red,
    },
    {
      n: "02",
      q: "¿Qué cambia estratégicamente entre clonar y saltar?",
      h: "Pista: una jugada aumenta presencia; la otra cambia geometría.",
      accent: C.gold,
    },
    {
      n: "03",
      q: "¿Por qué Ataxx no se resuelve probando todas las jugadas hasta el final?",
      h: "Pista: piensa en ramificación, profundidad y tiempo real.",
      accent: C.titleFill,
    },
  ];

  questions.forEach((item, index) => {
    const y = 2.18 + index * 1.24;
    surface(slide, 1.05, y, 11.2, 0.92, { fill: index % 2 === 0 ? C.softBlue : C.warm, line: index % 2 === 0 ? C.softBlue : C.warm });
    pill(slide, item.n, 1.32, y + 0.25, 0.56, { fill: item.accent, h: 0.32, fontSize: 8.2, color: item.accent === C.gold ? C.navy : C.white });
    text(slide, item.q, {
      x: 2.12,
      y: y + 0.2,
      w: 9.7,
      h: 0.22,
      fontFace: TYPOGRAPHY.display,
      fontSize: 13.4,
      bold: true,
      color: C.navy,
    });
    text(slide, item.h, {
      x: 2.12,
      y: y + 0.58,
      w: 9.4,
      h: 0.16,
      fontSize: 8.8,
      color: C.slate,
    });
  });
  validateSlide(slide, pptx);
}

function addBlock2QuestionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas de seguimiento", "Antes de entrar al modelo, dejamos claro el techo de las reglas fijas.", "Bloque 2");

  const questions = [
    {
      n: "01",
      q: "¿Cuándo una heurística escrita a mano es suficiente?",
      h: "Pista: piensa en costo, riesgo, explicabilidad y profundidad del dominio.",
      accent: C.gold,
    },
    {
      n: "02",
      q: "¿Por qué una regla fija puede ser explotada por un rival que aprende?",
      h: "Pista: una respuesta determinista deja patrones repetibles.",
      accent: C.red,
    },
    {
      n: "03",
      q: "¿Qué diferencia hay entre jugar bien y ganarle a un rival específico?",
      h: "Pista: compara evaluación contra un solo oponente versus varios perfiles.",
      accent: C.titleFill,
    },
  ];

  questions.forEach((item, index) => {
    const y = 2.18 + index * 1.24;
    surface(slide, 1.05, y, 11.2, 0.92, { fill: index % 2 === 0 ? C.warm : C.softBlue, line: index % 2 === 0 ? C.warm : C.softBlue });
    pill(slide, item.n, 1.32, y + 0.25, 0.56, { fill: item.accent, h: 0.32, fontSize: 8.2, color: item.accent === C.gold ? C.navy : C.white });
    text(slide, item.q, {
      x: 2.12,
      y: y + 0.2,
      w: 9.7,
      h: 0.22,
      fontFace: TYPOGRAPHY.display,
      fontSize: 13.4,
      bold: true,
      color: C.navy,
    });
    text(slide, item.h, {
      x: 2.12,
      y: y + 0.58,
      w: 9.4,
      h: 0.16,
      fontSize: 8.8,
      color: C.slate,
    });
  });
  validateSlide(slide, pptx);
}

function addHeuristicScale(slide, opts = {}) {
  const levels = opts.levels || [
    { name: "easy", desc: "variedad controlada", accent: C.success, fill: C.successSoft },
    { name: "normal", desc: "no siempre greedy", accent: C.titleFill, fill: C.softBlue },
    { name: "hard", desc: "castiga respuesta rival", accent: C.gold, fill: C.warm },
    { name: "apex", desc: "lookahead selectivo", accent: C.red, fill: C.paleRed },
    { name: "gambit", desc: "presión y flancos", accent: C.navy, fill: C.mist },
    { name: "sentinel", desc: "soporte y movilidad", accent: C.success, fill: C.successSoft },
  ];
  const x = opts.x || 1.05;
  const y = opts.y || 2.3;
  const w = opts.w || 11.2;
  const gap = 0.14;
  const cardW = (w - gap * (levels.length - 1)) / levels.length;
  levels.forEach((level, index) => {
    const cx = x + index * (cardW + gap);
    surface(slide, cx, y, cardW, opts.h || 1.7, { fill: level.fill, line: level.fill });
    accent(slide, cx + 0.12, y + 0.16, (opts.h || 1.7) - 0.32, level.accent, 0.08);
    text(slide, level.name, {
      x: cx + 0.28,
      y: y + 0.22,
      w: cardW - 0.42,
      h: 0.2,
      fontFace: TYPOGRAPHY.mono || "Aptos Mono",
      fontSize: 9.4,
      bold: true,
      color: C.navy,
      align: "center",
    });
    text(slide, level.desc, {
      x: cx + 0.24,
      y: y + 0.72,
      w: cardW - 0.36,
      h: 0.32,
      fontSize: 7.5,
      color: C.ink,
      align: "center",
      valign: "mid",
    });
    text(slide, index < 2 ? "variedad" : index < 4 ? "cálculo" : "estilo", {
      x: cx + 0.24,
      y: y + 1.24,
      w: cardW - 0.36,
      h: 0.12,
      fontSize: 6.8,
      bold: true,
      color: level.accent,
      align: "center",
    });
  });
}

function slide13() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  slide.addImage({ path: logoMarkPath, x: 10.7, y: 0.72, w: 1.0, h: 0.64, transparency: 6 });
  addBarsMotif(slide, 0.76, 0.66, 1.08, C.red);
  pill(slide, "Clase 26 · Bloque 2", 0.92, 1.36, 2.18, { fill: C.red, h: 0.34 });
  text(slide, "Antes de aprender:", {
    x: 0.92,
    y: 2.05,
    w: 6.6,
    h: 0.52,
    fontFace: TYPOGRAPHY.display,
    fontSize: 30,
    bold: true,
    color: C.white,
  });
  text(slide, "escribir criterio a mano", {
    x: 0.92,
    y: 2.78,
    w: 6.95,
    h: 0.58,
    fontFace: TYPOGRAPHY.display,
    fontSize: 30,
    bold: true,
    color: C.gold,
  });
  text(slide, "Una heurística convierte intuición técnica en una función de puntaje. No aprende todavía: ordena jugadas con señales diseñadas por una persona.", {
    x: 0.98,
    y: 3.62,
    w: 6.58,
    h: 0.56,
    fontSize: 12.8,
    color: C.terminalOutput,
  });
  surface(slide, 1.0, 4.72, 4.42, 0.62, { fill: C.white, line: C.white });
  text(slide, "movimiento → número → decisión", {
    x: 1.32,
    y: 4.91,
    w: 3.78,
    h: 0.16,
    fontFace: TYPOGRAPHY.mono || "Aptos Mono",
    fontSize: 12.2,
    bold: true,
    color: C.navy,
    align: "center",
  });

  const cards = [
    { title: "Premia", body: "ganar piezas, ocupar centro, mantener movilidad", accent: C.success, fill: C.successSoft },
    { title: "Castiga", body: "dejar respuesta fuerte, aislar piezas, perder soporte", accent: C.red, fill: C.paleRed },
    { title: "No aprende", body: "si el patrón falla, seguirá aplicando la misma regla", accent: C.gold, fill: C.warm },
  ];
  cards.forEach((card, index) => {
    const y = 2.04 + index * 1.26;
    surface(slide, 8.2, y, 3.94, 0.96, { fill: card.fill, line: card.fill });
    accent(slide, 8.42, y + 0.18, 0.6, card.accent);
    text(slide, card.title, {
      x: 8.74,
      y: y + 0.2,
      w: 2.8,
      h: 0.22,
      fontFace: TYPOGRAPHY.display,
      fontSize: 14.2,
      bold: true,
      color: C.navy,
    });
    text(slide, card.body, {
      x: 8.74,
      y: y + 0.52,
      w: 2.86,
      h: 0.18,
      fontSize: 9.6,
      color: C.ink,
      valign: "mid",
    });
  });
  surface(slide, 8.2, 5.84, 3.94, 0.46, { fill: C.white, line: C.white });
  text(slide, "Es IA en sentido práctico, pero no aprendizaje automático.", {
    x: 8.5,
    y: 5.98,
    w: 3.34,
    h: 0.12,
    fontSize: 8.8,
    bold: true,
    color: C.navy,
    align: "center",
  });
  validateSlide(slide, pptx);
}

function slide14() {
  const slide = pptx.addSlide();
  addHeader(slide, "La anatomía de _score_move", "La heurística base mira el antes y el después de una jugada candidata.", "Bloque 2");
  addCodePanel(slide, SH, {
    x: 0.92,
    y: 2.05,
    w: 6.18,
    h: 3.82,
    title: "src/agents/heuristic.py",
    lang: "python",
    fontSize: 7.3,
    code: [
      "scratch = state.copy()",
      "scratch.step(move)",
      "after_me = sum(scratch.grid == me)",
      "after_opp = sum(scratch.grid == -me)",
      "clone_bonus = 0.15 if distance(move) == 1 else 0.0",
      "center_bonus = 0.05 * center_score(r2, c2)",
      "return (after_me - before_me) + (before_opp - after_opp)",
      "       + clone_bonus + center_bonus",
    ].join("\n"),
  });
  const concepts = [
    { label: "simular", body: "no toca el tablero real; prueba una copia", accent: C.navy, fill: C.softBlue },
    { label: "medir", body: "compara piezas propias y rivales antes/después", accent: C.red, fill: C.paleRed },
    { label: "sesgar", body: "premia clonar y ocupar centro, pero no ve todo", accent: C.gold, fill: C.warm },
  ];
  concepts.forEach((item, index) => {
    const y = 2.1 + index * 1.18;
    surface(slide, 7.58, y, 4.36, 0.88, { fill: item.fill, line: item.fill });
    pill(slide, String(index + 1).padStart(2, "0"), 7.82, y + 0.24, 0.48, { fill: item.accent, h: 0.3, fontSize: 7.2, color: item.accent === C.gold ? C.navy : C.white });
    text(slide, item.label, {
      x: 8.52,
      y: y + 0.13,
      w: 3.0,
      h: 0.22,
      fontFace: TYPOGRAPHY.display,
      fontSize: 12,
      bold: true,
      color: C.navy,
    });
    text(slide, item.body, {
      x: 8.52,
      y: y + 0.46,
      w: 3.12,
      h: 0.24,
      fontSize: 7.8,
      color: C.ink,
    });
  });
  surface(slide, 7.58, 5.66, 4.36, 0.48, { fill: C.navy, line: C.navy });
  text(slide, "La función no sabe jugar: sabe ordenar señales que una persona decidió valorar.", {
    x: 7.86,
    y: 5.82,
    w: 3.8,
    h: 0.1,
    fontSize: 8.2,
    bold: true,
    color: C.white,
    align: "center",
  });
  validateSlide(slide, pptx);
}

function slide15() {
  const slide = pptx.addSlide();
  addHeader(slide, "Seis niveles, seis estilos de decisión", "La dificultad no sube solo por hacer más cálculo; también cambia el tipo de error que comete la IA.", "Bloque 2");
  const levels = [
    { name: "easy", cue: "variedad controlada", axis: "explora", fill: C.successSoft, accent: C.success },
    { name: "normal", cue: "criterio estable", axis: "ordena", fill: C.softBlue, accent: C.titleFill },
    { name: "hard", cue: "castiga respuesta rival", axis: "calcula", fill: C.warm, accent: C.gold },
    { name: "apex", cue: "revisa líneas críticas", axis: "filtra", fill: C.paleRed, accent: C.red },
    { name: "gambit", cue: "presión y flancos", axis: "ataca", fill: C.mist, accent: C.navy },
    { name: "sentinel", cue: "soporte y movilidad", axis: "sostiene", fill: C.successSoft, accent: C.success },
  ];
  levels.forEach((item, index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    const x = 0.96 + col * 3.92;
    const y = 2.04 + row * 1.28;
    surface(slide, x, y, 3.46, 1.06, { fill: item.fill, line: item.fill });
    accent(slide, x + 0.16, y + 0.16, 0.74, item.accent);
    text(slide, item.name, {
      x: x + 0.48,
      y: y + 0.22,
      w: 1.58,
      h: 0.2,
      fontFace: TYPOGRAPHY.mono || "Aptos Mono",
      fontSize: 14.4,
      bold: true,
      color: C.navy,
    });
    text(slide, item.axis, {
      x: x + 2.18,
      y: y + 0.22,
      w: 0.86,
      h: 0.16,
      fontSize: 9.6,
      bold: true,
      color: item.accent,
      align: "right",
    });
    text(slide, item.cue, {
      x: x + 0.48,
      y: y + 0.62,
      w: 2.48,
      h: 0.16,
      fontSize: 10.2,
      color: C.ink,
    });
  });
  surface(slide, 1.08, 5.0, 5.25, 0.9, { fill: C.navy, line: C.navy });
  text(slide, "Una heurística fuerte no es una verdad del juego.", {
    x: 1.46,
    y: 5.24,
    w: 4.5,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.4,
    bold: true,
    color: C.white,
    align: "center",
  });
  text(slide, "Es una hipótesis escrita por una persona sobre qué señales importan.", {
    x: 1.52,
    y: 5.58,
    w: 4.38,
    h: 0.12,
    fontSize: 9,
    color: C.terminalOutput,
    align: "center",
  });
  surface(slide, 6.82, 5.0, 5.25, 0.9, { fill: C.paleRed, line: C.paleRed });
  text(slide, "Si el rival aprende esa hipótesis, también puede aprender a romperla.", {
    x: 7.22,
    y: 5.26,
    w: 4.46,
    h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.8,
    bold: true,
    color: C.red,
    align: "center",
  });
  validateSlide(slide, pptx);
}

function slide16() {
  const slide = pptx.addSlide();
  addHeader(slide, "Easy y normal: variedad controlada", "Una IA de juego no siempre debe elegir la jugada máxima si queremos experiencia y exploración.", "Bloque 2");
  surface(slide, 1.0, 2.06, 5.34, 3.78, { fill: C.successSoft, line: C.successSoft });
  accent(slide, 1.18, 2.28, 3.34, C.success);
  text(slide, "easy", { x: 1.48, y: 2.38, w: 1.3, h: 0.28, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 17.5, bold: true, color: C.navy });
  text(slide, "elige entre buenas jugadas", {
    x: 2.9,
    y: 2.42,
    w: 2.5,
    h: 0.18,
    fontSize: 10.8,
    bold: true,
    color: C.slate,
    align: "right",
  });
  const easyBars = [
    ["A", 0.9, C.success],
    ["B", 0.68, C.titleFill],
    ["C", 0.42, C.gold],
    ["D", 0.22, C.red],
  ];
  easyBars.forEach((bar, index) => {
    const y = 3.08 + index * 0.43;
    text(slide, bar[0], { x: 1.5, y: y + 0.035, w: 0.3, h: 0.12, fontSize: 9.2, bold: true, color: C.navy, align: "center" });
    slide.addShape(SH.rect, { x: 1.9, y: y + 0.06, w: 3.3, h: 0.13, fill: { color: C.white }, line: { color: C.white } });
    slide.addShape(SH.rect, { x: 1.9, y: y + 0.06, w: 3.3 * bar[1], h: 0.13, fill: { color: bar[2] }, line: { color: bar[2] } });
  });
  text(slide, "No juega al azar puro: mantiene sesgo hacia opciones razonables.", {
    x: 1.5,
    y: 5.04,
    w: 4.4,
    h: 0.18,
    fontSize: 10.2,
    bold: true,
    color: C.ink,
    align: "center",
  });

  surface(slide, 6.92, 2.06, 5.34, 3.78, { fill: C.softBlue, line: C.softBlue });
  accent(slide, 7.1, 2.28, 3.34, C.titleFill);
  text(slide, "normal", { x: 7.4, y: 2.38, w: 1.54, h: 0.28, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 17.5, bold: true, color: C.navy });
  text(slide, "evita partidas repetidas", {
    x: 9.0,
    y: 2.42,
    w: 2.36,
    h: 0.18,
    fontSize: 10.8,
    bold: true,
    color: C.slate,
    align: "right",
  });
  drawMiniBoard(slide, 7.56, 3.0, 1.76, {
    pieces: [[2, 2, 1], [3, 2, -1], [3, 3, -1], [4, 4, 1]],
  });
  surface(slide, 9.58, 3.06, 2.18, 1.58, { fill: C.white, line: C.white });
  text(slide, "Diseño pedagógico", { x: 9.78, y: 3.3, w: 1.78, h: 0.16, fontSize: 9.8, bold: true, color: C.titleFill, align: "center" });
  text(slide, "Un rival predecible enseña poco; uno caótico tampoco enseña.", {
    x: 9.8,
    y: 3.78,
    w: 1.72,
    h: 0.36,
    fontSize: 9.2,
    color: C.ink,
    align: "center",
  });
  text(slide, "La variedad controlada mejora práctica y evita memorizar una única línea.", {
    x: 7.5,
    y: 5.04,
    w: 4.32,
    h: 0.18,
    fontSize: 10.2,
    bold: true,
    color: C.ink,
    align: "center",
  });
  validateSlide(slide, pptx);
}

function slide17() {
  const slide = pptx.addSlide();
  addHeader(slide, "Hard y apex: mirar la respuesta del rival", "El siguiente salto de calidad es castigar jugadas que permiten un golpe inmediato.", "Bloque 2");
  surface(slide, 1.02, 2.05, 5.45, 3.86, { fill: C.warm, line: C.warm });
  text(slide, "hard", { x: 1.36, y: 2.32, w: 1.25, h: 0.28, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 17.5, bold: true, color: C.navy });
  text(slide, "penaliza la mejor respuesta rival", {
    x: 2.8,
    y: 2.38,
    w: 2.8,
    h: 0.18,
    fontSize: 10.4,
    bold: true,
    color: C.slate,
    align: "right",
  });
  const hardSteps = [
    { title: "1. evalúa", body: "mi jugada candidata", fill: C.navy, color: C.white },
    { title: "2. pregunta", body: "¿cuál es el mejor golpe rival?", fill: C.white, color: C.navy },
    { title: "3. castiga", body: "si el rival gana demasiado", fill: C.paleRed, color: C.red },
  ];
  hardSteps.forEach((item, index) => {
    const y = 2.98 + index * 0.68;
    surface(slide, 1.52, y, 3.78, 0.46, { fill: item.fill, line: item.fill });
    text(slide, item.title, { x: 1.78, y: y + 0.12, w: 0.9, h: 0.12, fontSize: 8.8, bold: true, color: item.color });
    text(slide, item.body, { x: 2.96, y: y + 0.12, w: 1.96, h: 0.12, fontSize: 8.8, bold: true, color: item.color, align: "right" });
    if (index < hardSteps.length - 1) {
      line(slide, 3.42, y + 0.46, 3.42, y + 0.68, { color: C.guide, pt: 1 });
    }
  });
  surface(slide, 1.5, 5.06, 4.4, 0.44, { fill: C.white, line: C.white });
  text(slide, "Hard evita jugadas que “ganan ahora” pero regalan una respuesta fuerte.", {
    x: 1.78,
    y: 5.2,
    w: 3.84,
    h: 0.1,
    fontSize: 8.8,
    bold: true,
    color: C.navy,
    align: "center",
  });

  surface(slide, 6.92, 2.05, 5.45, 3.86, { fill: C.paleRed, line: C.paleRed });
  text(slide, "apex", { x: 7.28, y: 2.32, w: 1.25, h: 0.28, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 17.5, bold: true, color: C.navy });
  text(slide, "lookahead selectivo", {
    x: 9.1,
    y: 2.38,
    w: 2.2,
    h: 0.18,
    fontSize: 10.4,
    bold: true,
    color: C.slate,
    align: "right",
  });
  const apexCols = [
    { title: "candidatas", body: "no mira todas igual", x: 7.42, fill: C.white },
    { title: "líneas críticas", body: "simula riesgo local", x: 8.92, fill: C.warm },
    { title: "decisión", body: "elige lo robusto", x: 10.42, fill: C.successSoft },
  ];
  apexCols.forEach((item, index) => {
    surface(slide, item.x, 3.08, 1.18, 1.32, { fill: item.fill, line: item.fill });
    text(slide, item.title, { x: item.x + 0.1, y: 3.3, w: 0.98, h: 0.18, fontSize: 8.4, bold: true, color: C.navy, align: "center" });
    text(slide, item.body, { x: item.x + 0.12, y: 3.74, w: 0.94, h: 0.28, fontSize: 7.8, color: C.ink, align: "center" });
    if (index < apexCols.length - 1) {
      line(slide, item.x + 1.18, 3.74, item.x + 1.48, 3.74, { color: C.guide, pt: 1 });
    }
  });
  surface(slide, 7.42, 4.62, 4.18, 0.28, { fill: C.white, line: C.white });
  text(slide, "Apex no expande el árbol completo: invierte cálculo donde equivocarse cuesta caro.", {
    x: 7.66,
    y: 4.705,
    w: 3.7,
    h: 0.08,
    fontSize: 7.8,
    bold: true,
    color: C.red,
    align: "center",
  });
  surface(slide, 7.42, 5.06, 4.4, 0.44, { fill: C.white, line: C.white });
  text(slide, "Apex no resuelve el árbol: mira las líneas donde el error sería más caro.", {
    x: 7.68,
    y: 5.2,
    w: 3.88,
    h: 0.1,
    fontSize: 8.8,
    bold: true,
    color: C.navy,
    align: "center",
  });
  validateSlide(slide, pptx);
}

function slide18() {
  const slide = pptx.addSlide();
  addHeader(slide, "Gambit y sentinel: dos estilos especializados", "La heurística ya no solo calcula; empieza a tener personalidad táctica.", "Bloque 2");
  const styles = [
    {
      x: 0.98,
      title: "gambit",
      subtitle: "presión, flancos y saltos",
      fill: C.mist,
      accent: C.navy,
      pieces: [[3, 1, 1], [3, 3, -1], [2, 4, -1], [4, 4, -1], [5, 5, 1]],
      bullets: ["busca presión de radio 2", "acepta riesgo si gana iniciativa", "castiga agrupaciones rivales"],
    },
    {
      x: 6.88,
      title: "sentinel",
      subtitle: "soporte local y movilidad",
      fill: C.successSoft,
      accent: C.success,
      pieces: [[3, 3, 1], [2, 2, 1], [4, 2, 1], [2, 3, -1], [3, 4, -1]],
      bullets: ["prefiere piezas protegidas", "reduce frontera vulnerable", "mantiene opciones futuras"],
    },
  ];
  styles.forEach((style) => {
    surface(slide, style.x, 2.06, 5.46, 3.92, { fill: style.fill, line: style.fill });
    accent(slide, style.x + 0.18, 2.28, 3.48, style.accent);
    text(slide, style.title, { x: style.x + 0.48, y: 2.34, w: 1.5, h: 0.28, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 16, bold: true, color: C.navy });
    text(slide, style.subtitle, { x: style.x + 2.0, y: 2.42, w: 2.9, h: 0.12, fontSize: 8.4, bold: true, color: C.slate, align: "right" });
    drawMiniBoard(slide, style.x + 0.58, 3.08, 1.58, { pieces: style.pieces });
    style.bullets.forEach((bullet, index) => {
      const y = 3.08 + index * 0.58;
      surface(slide, style.x + 2.58, y, 2.42, 0.36, { fill: C.white, line: C.white, rectRadius: 0.035 });
      text(slide, bullet, { x: style.x + 2.76, y: y + 0.115, w: 2.06, h: 0.08, fontSize: 7.4, bold: true, color: C.ink, align: "center" });
    });
    surface(slide, style.x + 0.58, 5.22, 4.42, 0.38, { fill: C.white, line: C.white });
    text(slide, style.title === "gambit" ? "Más agresiva no significa siempre mejor." : "Más defensiva no significa invulnerable.", {
      x: style.x + 0.82,
      y: 5.35,
      w: 3.94,
      h: 0.08,
      fontSize: 7.6,
      bold: true,
      color: style.accent,
      align: "center",
    });
  });
  validateSlide(slide, pptx);
}

function slide19() {
  const slide = pptx.addSlide();
  addHeader(slide, "El techo de una heurística: ser explotable", "Cuando el rival descubre el patrón, la fortaleza se convierte en superficie de ataque.", "Bloque 2");
  const chain = [
    { title: "Regla fija", body: "siempre puntúa igual", accent: C.navy, fill: C.softBlue },
    { title: "Patrón repetible", body: "responde parecido ante posiciones parecidas", accent: C.gold, fill: C.warm },
    { title: "Secuencia forzada", body: "el rival induce la respuesta que quiere", accent: C.red, fill: C.paleRed },
    { title: "Exploit", body: "gana por conocer la regla, no por jugar mejor", accent: C.success, fill: C.successSoft },
  ];
  chain.forEach((item, index) => {
    const x = 0.98 + index * 2.92;
    surface(slide, x, 2.28, 2.34, 2.18, { fill: item.fill, line: item.fill });
    accent(slide, x + 0.14, 2.5, 1.74, item.accent);
    text(slide, item.title, { x: x + 0.38, y: 2.64, w: 1.7, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 12.8, bold: true, color: C.navy, align: "center" });
    text(slide, item.body, { x: x + 0.38, y: 3.2, w: 1.68, h: 0.44, fontSize: 8.3, color: C.ink, align: "center", valign: "mid" });
    if (index < chain.length - 1) {
      line(slide, x + 2.34, 3.36, x + 2.86, 3.36, { color: C.guide, pt: 1.1 });
    }
  });
  surface(slide, 1.1, 5.12, 5.1, 0.76, { fill: C.navy, line: C.navy });
  text(slide, "Esto también es ciberseguridad conceptual: una política predecible expone una superficie de ataque.", {
    x: 1.42,
    y: 5.36,
    w: 4.48,
    h: 0.18,
    fontSize: 9.1,
    bold: true,
    color: C.white,
    align: "center",
  });
  surface(slide, 6.78, 5.12, 5.1, 0.76, { fill: C.paleRed, line: C.paleRed });
  text(slide, "El problema no es usar reglas. El problema es creer que una regla fija equivale a comprensión.", {
    x: 7.1,
    y: 5.36,
    w: 4.46,
    h: 0.18,
    fontSize: 9.1,
    bold: true,
    color: C.red,
    align: "center",
  });
  validateSlide(slide, pptx);
}

function slide20() {
  const slide = pptx.addSlide();
  addHeader(slide, "Cuando una IA aprende a ganarle al examen", "El postmortem 05 mostró una señal clásica: buen resultado contra un rival visto, mal resultado fuera de esa dieta.", "Bloque 2");
  surface(slide, 0.98, 2.06, 5.18, 4.0, { fill: C.navy, line: C.navy });
  text(slide, "centinela v6", { x: 1.38, y: 2.38, w: 4.38, h: 0.38, fontFace: TYPOGRAPHY.display, fontSize: 21, bold: true, color: C.white, align: "center" });
  text(slide, "Parecía fuerte porque dominaba el rival que más había visto.", {
    x: 1.48,
    y: 3.1,
    w: 4.18,
    h: 0.36,
    fontSize: 10.2,
    color: C.terminalOutput,
    align: "center",
    valign: "mid",
  });
  surface(slide, 1.5, 4.08, 4.12, 0.62, { fill: C.white, line: C.white });
  text(slide, "alto vs sentinel ≠ saber Ataxx", {
    x: 1.72,
    y: 4.3,
    w: 3.68,
    h: 0.1,
    fontFace: TYPOGRAPHY.mono || "Aptos Mono",
    fontSize: 9.4,
    bold: true,
    color: C.red,
    align: "center",
  });
  text(slide, "Ese patrón se llama opponent exploitation.", {
    x: 1.52,
    y: 5.22,
    w: 4.1,
    h: 0.14,
    fontSize: 8.8,
    bold: true,
    color: C.white,
    align: "center",
  });

  const bars = [
    ["easy", 0.41, C.gold],
    ["normal", 0.30, C.red],
    ["hard", 0.69, C.titleFill],
    ["apex", 0.64, C.titleFill],
    ["gambit", 0.06, C.red],
    ["sentinel", 0.81, C.success],
  ];
  surface(slide, 6.72, 2.06, 5.4, 4.0, { fill: C.softBlue, line: C.softBlue });
  text(slide, "perfil por rival", { x: 7.08, y: 2.34, w: 4.72, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 14.8, bold: true, color: C.navy, align: "center" });
  bars.forEach((bar, index) => {
    const y = 2.88 + index * 0.43;
    text(slide, bar[0], { x: 7.1, y: y + 0.06, w: 0.9, h: 0.08, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 7.2, bold: true, color: C.navy });
    slide.addShape(SH.rect, { x: 8.15, y: y + 0.07, w: 2.88, h: 0.11, fill: { color: C.white }, line: { color: C.white } });
    slide.addShape(SH.rect, { x: 8.15, y: y + 0.07, w: 2.88 * bar[1], h: 0.11, fill: { color: bar[2] }, line: { color: bar[2] } });
    text(slide, String(bar[1].toFixed(2)), { x: 11.12, y: y + 0.055, w: 0.4, h: 0.08, fontSize: 6.8, bold: true, color: bar[2], align: "right" });
  });
  surface(slide, 7.08, 5.54, 4.72, 0.32, { fill: C.white, line: C.white });
  text(slide, "Una sola métrica puede celebrar justo lo que deberíamos sospechar.", {
    x: 7.34,
    y: 5.65,
    w: 4.2,
    h: 0.08,
    fontSize: 7.6,
    bold: true,
    color: C.red,
    align: "center",
  });
  validateSlide(slide, pptx);
}

function slide22() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addBarsMotif(slide, 0.76, 0.66, 1.08, C.red);
  slide.addImage({ path: logoMarkPath, x: 10.76, y: 0.74, w: 1.0, h: 0.64, transparency: 4 });
  pill(slide, "Clase 26 · Bloque 3", 0.92, 1.36, 2.18, { fill: C.red, h: 0.34 });
  text(slide, "Ataxx Zero", {
    x: 0.92,
    y: 2.0,
    w: 5.7,
    h: 0.56,
    fontFace: TYPOGRAPHY.display,
    fontSize: 34,
    bold: true,
    color: C.white,
  });
  text(slide, "cuando la IA deja de obedecer reglas y empieza a aprender de sus propias partidas", {
    x: 0.96,
    y: 2.82,
    w: 7.2,
    h: 0.56,
    fontSize: 14,
    color: C.terminalOutput,
  });
  const pillars = [
    { title: "modelo", body: "lee el tablero y estima jugadas + resultado", accent: C.red, fill: C.paleRed },
    { title: "búsqueda", body: "MCTS prueba líneas prometedoras sin recorrer todo", accent: C.gold, fill: C.warm },
    { title: "self-play", body: "el sistema genera datos jugando contra sí mismo", accent: C.success, fill: C.successSoft },
  ];
  pillars.forEach((item, index) => {
    const x = 0.98 + index * 2.3;
    surface(slide, x, 4.26, 2.0, 1.28, { fill: item.fill, line: item.fill });
    accent(slide, x + 0.16, 4.48, 0.84, item.accent);
    text(slide, item.title, { x: x + 0.42, y: 4.5, w: 1.26, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 13.2, bold: true, color: C.navy });
    text(slide, item.body, { x: x + 0.42, y: 4.88, w: 1.3, h: 0.34, fontSize: 8.8, color: C.ink });
  });
  surface(slide, 8.42, 2.24, 3.42, 3.34, { fill: C.white, line: C.white });
  text(slide, "La joya técnica no es una red aislada.", {
    x: 8.76,
    y: 2.62,
    w: 2.74,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15.4,
    bold: true,
    color: C.navy,
    align: "center",
  });
  text(slide, "Es un circuito completo: representa el juego, busca mejor que una heurística, aprende de esa búsqueda y se evalúa contra rivales que intentan romperlo.", {
    x: 8.82,
    y: 3.28,
    w: 2.6,
    h: 0.74,
    fontSize: 10.6,
    color: C.ink,
    align: "center",
    valign: "mid",
  });
  surface(slide, 8.86, 4.62, 2.54, 0.46, { fill: C.navy, line: C.navy });
  text(slide, "modelo + búsqueda + evidencia", { x: 9.04, y: 4.77, w: 2.18, h: 0.1, fontSize: 8.6, bold: true, color: C.white, align: "center" });
  validateSlide(slide, pptx);
}

function slide23() {
  const slide = pptx.addSlide();
  addHeader(slide, "Tres reemplazos que cambian el juego", "El salto no es cambiar una función por una red: es cambiar todo el sistema de decisión.", "Bloque 3");
  const rows = [
    { old: "_score_move", oldBody: "pesos escritos a mano", fresh: "AtaxxTransformerNet", freshBody: "pesos aprendidos", accent: C.red },
    { old: "elegir máximo", oldBody: "decisión local", fresh: "MCTS", freshBody: "búsqueda guiada", accent: C.gold },
    { old: "rival fijo", oldBody: "patrón explotable", fresh: "self-play + liga", freshBody: "datos que cambian", accent: C.success },
  ];
  rows.forEach((row, index) => {
    const y = 2.12 + index * 1.22;
    surface(slide, 0.98, y, 4.72, 0.88, { fill: index === 0 ? C.paleRed : (index === 1 ? C.warm : C.softBlue), line: index === 0 ? C.paleRed : (index === 1 ? C.warm : C.softBlue) });
    surface(slide, 7.48, y, 4.72, 0.88, { fill: index === 0 ? C.softBlue : (index === 1 ? C.successSoft : C.warm), line: index === 0 ? C.softBlue : (index === 1 ? C.successSoft : C.warm) });
    accent(slide, 1.18, y + 0.16, 0.56, row.accent);
    accent(slide, 7.68, y + 0.16, 0.56, row.accent);
    text(slide, row.old, { x: 1.52, y: y + 0.16, w: 3.34, h: 0.18, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 11.8, bold: true, color: C.navy });
    text(slide, row.oldBody, { x: 1.52, y: y + 0.5, w: 3.5, h: 0.14, fontSize: 9.2, color: C.slate });
    text(slide, row.fresh, { x: 8.02, y: y + 0.16, w: 3.32, h: 0.18, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 11.2, bold: true, color: C.navy });
    text(slide, row.freshBody, { x: 8.02, y: y + 0.5, w: 3.48, h: 0.14, fontSize: 9.2, color: C.slate });
    line(slide, 5.92, y + 0.44, 7.12, y + 0.44, { color: row.accent, pt: 1.6 });
  });
  surface(slide, 1.18, 5.84, 10.76, 0.44, { fill: C.navy, line: C.navy });
  text(slide, "La tesis del bloque: aprender no elimina el criterio humano; lo desplaza hacia arquitectura, datos, búsqueda y evaluación.", {
    x: 1.52,
    y: 5.98,
    w: 10.1,
    h: 0.1,
    fontSize: 8.8,
    bold: true,
    color: C.white,
    align: "center",
  });
  validateSlide(slide, pptx);
}

function slide24() {
  const slide = pptx.addSlide();
  addHeader(slide, "La red no ve un tablero: ve once mapas", "Cada canal responde una pregunta concreta sobre el estado del juego.", "Bloque 3");
  surface(slide, 0.9, 1.96, 4.24, 4.12, { fill: C.navy, line: C.navy });
  text(slide, "observación desde el jugador actual", { x: 1.24, y: 2.22, w: 3.54, h: 0.2, fontSize: 12.2, bold: true, color: C.white, align: "center" });
  drawMiniBoard(slide, 1.62, 2.72, 2.72, {
    line: C.white,
    pieces: [[0, 0, 1], [6, 6, 1], [0, 6, -1], [6, 0, -1], [2, 2, 1], [3, 3, -1], [4, 2, -1]],
  });
  surface(slide, 1.2, 5.62, 3.52, 0.28, { fill: C.white, line: C.white });
  text(slide, "propias = rojo · rival = azul · vacío = destino", { x: 1.42, y: 5.71, w: 3.08, h: 0.08, fontSize: 7.6, bold: true, color: C.navy, align: "center" });
  line(slide, 5.36, 3.98, 6.0, 3.98, { color: C.red, pt: 1.7 });

  const groups = [
    {
      title: "0-2 · ocupación",
      body: "qué casillas contienen piezas propias, rivales o espacios vacíos",
      fill: C.softBlue,
      accent: C.navy,
      items: ["0 propias", "1 rivales", "2 vacías"],
      channels: "0 propias · 1 rivales · 2 vacías",
    },
    {
      title: "3-4 · contexto temporal",
      body: "avance de la regla de 100 turnos y presión por repetición de posición",
      fill: C.warm,
      accent: C.gold,
      items: ["3 progreso", "4 repetición"],
      channels: "3 progreso · 4 repetición",
    },
    {
      title: "5-8 · movilidad legal",
      body: "destinos posibles de clone y jump, tanto propios como del rival",
      fill: C.paleRed,
      accent: C.red,
      items: ["5 clone propia", "6 jump propia", "7 clone rival", "8 jump rival"],
      channels: "5 clone propia · 6 jump propia\n7 clone rival · 8 jump rival",
    },
    {
      title: "9-10 · piezas activas",
      body: "qué piezas todavía pueden generar jugadas para cada jugador",
      fill: C.successSoft,
      accent: C.success,
      items: ["9 activas propias", "10 activas rival"],
      channels: "9 activas propias · 10 activas rival",
    },
  ];
  groups.forEach((group, index) => {
    const x = 6.16 + (index % 2) * 3.06;
    const y = 2.02 + Math.floor(index / 2) * 1.62;
    surface(slide, x, y, 2.78, 1.3, { fill: group.fill, line: group.fill });
    accent(slide, x + 0.16, y + 0.18, 0.88, group.accent, 0.08);
    text(slide, group.title, { x: x + 0.38, y: y + 0.18, w: 2.12, h: 0.16, fontFace: TYPOGRAPHY.display, fontSize: 11.4, bold: true, color: C.navy });
    text(slide, group.body, { x: x + 0.38, y: y + 0.48, w: 2.14, h: 0.24, fontSize: 7.6, color: C.ink });
    surface(slide, x + 0.38, y + 0.86, 2.16, 0.36, { fill: C.white, line: C.white, rectRadius: 0.03 });
    text(slide, group.channels, { x: x + 0.48, y: y + 0.95, w: 1.96, h: 0.16, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: group.channels.includes("\n") ? 6.9 : 7.4, bold: true, color: group.accent, align: "center" });
  });

  surface(slide, 6.18, 5.46, 5.84, 0.56, { fill: C.navy, line: C.navy });
  text(slide, "entrada real del modelo: obs.shape = (11, 7, 7)", { x: 6.54, y: 5.62, w: 5.12, h: 0.12, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 10.2, bold: true, color: C.white, align: "center" });
  text(slide, "La calidad de esta representación limita qué patrones puede aprender la red.", { x: 6.72, y: 5.86, w: 4.76, h: 0.08, fontSize: 7.4, color: C.terminalOutput, align: "center" });
  validateSlide(slide, pptx);
}

function slide25() {
  const slide = pptx.addSlide();
  addHeader(slide, "Policy y value: dos preguntas, un cerebro", "La red comparte cuerpo y separa salidas: una decide dónde mirar; la otra estima si conviene.", "Bloque 3");
  surface(slide, 0.9, 1.98, 11.54, 3.68, { fill: C.white, line: C.border });
  text(slide, "AtaxxTransformerNet", { x: 1.22, y: 2.2, w: 3.0, h: 0.24, fontFace: TYPOGRAPHY.display, fontSize: 15.6, bold: true, color: C.navy });
  text(slide, "la misma lectura espacial alimenta dos decisiones distintas", { x: 1.24, y: 2.62, w: 4.58, h: 0.12, fontSize: 8.8, color: C.slate });

  const trunk = [
    { title: "input", body: "11 canales\npor casilla", meta: "11 × 7 × 7", x: 1.18, fill: C.paleRed, accent: C.red },
    { title: "tokens", body: "49 casillas\n+ token CLS", meta: "Linear(11 → 128)", x: 3.56, fill: C.warm, accent: C.gold },
    { title: "encoder", body: "6 capas\n8 cabezas", meta: "d_model = 128", x: 5.94, fill: C.softBlue, accent: C.navy },
  ];
  trunk.forEach((item, index) => {
    surface(slide, item.x, 3.08, 1.72, 1.5, { fill: item.fill, line: item.fill });
    accent(slide, item.x + 0.14, 3.3, 1.06, item.accent);
    text(slide, item.title, { x: item.x + 0.42, y: 3.28, w: 1.02, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 12.6, bold: true, color: C.navy, align: "center" });
    text(slide, item.body, { x: item.x + 0.42, y: 3.74, w: 1.02, h: 0.34, fontSize: 9.1, color: C.ink, align: "center" });
    surface(slide, item.x + 0.22, 4.18, 1.28, 0.28, { fill: C.white, line: C.white, rectRadius: 0.03 });
    text(slide, item.meta, { x: item.x + 0.28, y: 4.27, w: 1.16, h: 0.1, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 7.0, bold: true, color: item.accent, align: "center" });
    if (index < trunk.length - 1) line(slide, item.x + 1.82, 3.84, item.x + 2.24, 3.84, { color: C.guide, pt: 1.2 });
  });

  line(slide, 7.78, 3.56, 8.46, 3.04, { color: C.red, pt: 1.4 });
  line(slide, 7.78, 4.12, 8.46, 4.78, { color: C.success, pt: 1.4 });
  surface(slide, 8.5, 2.72, 3.46, 1.16, { fill: C.paleRed, line: C.paleRed });
  accent(slide, 8.72, 2.9, 0.78, C.red);
  text(slide, "policy head", { x: 9.06, y: 2.9, w: 2.26, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 13.4, bold: true, color: C.navy });
  text(slide, "puntúa acciones legales usando tokens de origen y destino", { x: 9.06, y: 3.26, w: 2.48, h: 0.18, fontSize: 8.0, color: C.ink });
  text(slide, "src + dst → logit · máscara ilegal", { x: 9.06, y: 3.58, w: 2.34, h: 0.08, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 7.1, bold: true, color: C.red });

  surface(slide, 8.5, 4.32, 3.46, 1.16, { fill: C.successSoft, line: C.successSoft });
  accent(slide, 8.72, 4.5, 0.78, C.success);
  text(slide, "value head", { x: 9.06, y: 4.5, w: 2.26, h: 0.18, fontFace: TYPOGRAPHY.display, fontSize: 13.4, bold: true, color: C.navy });
  text(slide, "lee el token CLS y estima el resultado esperado", { x: 9.06, y: 4.86, w: 2.48, h: 0.18, fontSize: 8.0, color: C.ink });
  text(slide, "tanh → valor entre -1 y +1", { x: 9.06, y: 5.18, w: 2.34, h: 0.08, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 7.1, bold: true, color: C.success });

  surface(slide, 1.02, 5.92, 11.08, 0.42, { fill: C.navy, line: C.navy });
  text(slide, "Policy entrega priors para MCTS; value entrega una evaluación rápida de la hoja. Ninguna salida reemplaza la búsqueda completa.", { x: 1.38, y: 6.06, w: 10.36, h: 0.1, fontSize: 8.5, bold: true, color: C.white, align: "center" });
  validateSlide(slide, pptx);
}

function slide26() {
  const slide = pptx.addSlide();
  addHeader(slide, "MCTS: pensar con presupuesto limitado", "Monte Carlo Tree Search convierte una red rápida en una decisión investigada.", "Bloque 3");
  surface(slide, 0.86, 1.94, 7.66, 4.48, { fill: C.white, line: C.border });
  text(slide, "árbol de búsqueda", { x: 1.18, y: 2.16, w: 2.3, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 15.2, bold: true, color: C.navy });
  text(slide, "cada nodo guarda visitas N, valor medio Q y prior P", { x: 1.2, y: 2.55, w: 3.7, h: 0.12, fontSize: 8.3, color: C.slate });
  surface(slide, 1.1, 2.88, 7.02, 2.9, { fill: "F7FAFD", line: "D9E4F0", rectRadius: 0.04 });

  const mctsNodes = [
    { id: "root", x: 3.72, y: 3.12, w: 1.86, h: 0.66, title: "raíz", meta: "N=600", sub: "estado actual", fill: C.navy, color: C.white },
    { id: "a", x: 1.46, y: 4.08, w: 1.76, h: 0.7, title: "clonar centro", meta: "N=302 · Q=+.33", sub: "P=.41", fill: C.successSoft, color: C.navy, accent: C.success },
    { id: "b", x: 3.82, y: 4.08, w: 1.76, h: 0.7, title: "saltar flanco", meta: "N=188 · Q=+.11", sub: "P=.27", fill: C.warm, color: C.navy, accent: C.gold },
    { id: "c", x: 6.16, y: 4.08, w: 1.76, h: 0.7, title: "salvar pieza", meta: "N=110 · Q=-.05", sub: "P=.18", fill: C.paleRed, color: C.navy, accent: C.red },
    { id: "a1", x: 1.2, y: 5.18, w: 1.28, h: 0.44, title: "respuesta A1", meta: "N=122", fill: C.white, color: C.navy },
    { id: "a2", x: 2.62, y: 5.18, w: 1.28, h: 0.44, title: "respuesta A2", meta: "N=180", fill: C.success, color: C.white },
    { id: "b1", x: 4.06, y: 5.18, w: 1.28, h: 0.44, title: "respuesta B1", meta: "N=92", fill: C.white, color: C.navy },
    { id: "c1", x: 6.4, y: 5.18, w: 1.28, h: 0.44, title: "respuesta C1", meta: "N=57", fill: C.white, color: C.navy },
  ];
  const byId = Object.fromEntries(mctsNodes.map((node) => [node.id, node]));
  [["root", "a", C.success, 1.8], ["root", "b", C.guide, 1.1], ["root", "c", C.guide, 1.1], ["a", "a1", C.guide, 1.0], ["a", "a2", C.success, 1.8], ["b", "b1", C.guide, 1.0], ["c", "c1", C.guide, 1.0]].forEach(([from, to, color, pt]) => {
    const a = byId[from];
    const b = byId[to];
    line(slide, a.x + a.w / 2, a.y + a.h, b.x + b.w / 2, b.y, { color, pt, endArrowType: "none" });
  });
  mctsNodes.forEach((node) => {
    surface(slide, node.x, node.y, node.w, node.h, { fill: node.fill, line: node.accent || node.fill, linePt: node.id === "a2" ? 2 : 1 });
    if (node.accent) accent(slide, node.x + 0.1, node.y + 0.13, node.h - 0.26, node.accent, 0.06);
    text(slide, node.title, { x: node.x + 0.2, y: node.y + 0.12, w: node.w - 0.34, h: 0.1, fontSize: node.h > 0.5 ? 7.8 : 6.8, bold: true, color: node.color, align: "center" });
    text(slide, node.meta, { x: node.x + 0.18, y: node.y + (node.h > 0.5 ? 0.36 : 0.28), w: node.w - 0.32, h: 0.08, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: node.h > 0.5 ? 6.3 : 5.8, bold: true, color: node.color, align: "center" });
    if (node.sub) text(slide, node.sub, { x: node.x + 0.22, y: node.y + 0.54, w: node.w - 0.44, h: 0.06, fontSize: 5.8, color: node.color, align: "center" });
  });
  surface(slide, 1.24, 5.94, 6.62, 0.24, { fill: C.navy, line: C.navy });
  text(slide, "decisión final: la jugada con más visitas, no la primera opinión de la red", { x: 1.52, y: 6.02, w: 6.06, h: 0.06, fontSize: 7.0, bold: true, color: C.white, align: "center" });

  const phases = [
    ["01", "Selección", "baja por la rama con mejor PUCT", C.navy, C.softBlue],
    ["02", "Expansión", "crea hijos para jugadas legales", C.gold, C.warm],
    ["03", "Evaluación", "la red entrega policy y value", C.titleFill, C.softBlue],
    ["04", "Backprop", "sube N y actualiza Q con signo alternado", C.red, C.paleRed],
  ];
  phases.forEach((phase, index) => {
    const y = 2.0 + index * 0.88;
    surface(slide, 8.84, y, 3.2, 0.66, { fill: phase[4], line: phase[4] });
    pill(slide, phase[0], 9.06, y + 0.19, 0.42, { fill: phase[3], h: 0.26, fontSize: 7.0, color: phase[3] === C.gold ? C.navy : C.white });
    text(slide, phase[1], { x: 9.68, y: y + 0.14, w: 1.9, h: 0.14, fontFace: TYPOGRAPHY.display, fontSize: 11.8, bold: true, color: C.navy });
    text(slide, phase[2], { x: 9.68, y: y + 0.42, w: 2.08, h: 0.1, fontSize: 7.5, color: C.ink });
  });
  surface(slide, 8.84, 5.76, 3.2, 0.52, { fill: C.navy, line: C.navy });
  text(slide, "600 simulaciones = evidencia acumulada con presupuesto fijo", { x: 9.12, y: 5.92, w: 2.64, h: 0.1, fontSize: 8.0, bold: true, color: C.white, align: "center" });
  validateSlide(slide, pptx);
}

function slide27() {
  const slide = pptx.addSlide();
  addHeader(slide, "PUCT: explotar evidencia sin dejar de explorar", "PUCT significa Predictor + UCT; UCT es Upper Confidence Trees.", "Bloque 3");
  surface(slide, 0.98, 2.02, 5.42, 2.2, { fill: C.navy, line: C.navy });
  text(slide, "score = Q + U", { x: 1.34, y: 2.42, w: 4.7, h: 0.38, fontFace: TYPOGRAPHY.display, fontSize: 27, bold: true, color: C.white, align: "center" });
  text(slide, "Q: resultado promedio observado\nU: bonus de exploración guiado por el prior P", { x: 1.58, y: 3.18, w: 4.2, h: 0.34, fontSize: 11.1, color: C.terminalOutput, align: "center" });
  surface(slide, 1.38, 3.78, 4.58, 0.28, { fill: C.white, line: C.white });
  text(slide, "PUCT = Predictor + Upper Confidence Trees", { x: 1.68, y: 3.88, w: 3.98, h: 0.08, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 7.6, bold: true, color: C.red, align: "center" });
  const parts = [
    { title: "explotar", body: "si una rama ya rindió bien, Q sube", fill: C.successSoft, accent: C.success },
    { title: "explorar", body: "si la red le dio prior alto y tiene pocas visitas, U empuja", fill: C.warm, accent: C.gold },
    { title: "regular", body: "`c_puct` decide cuánto se arriesga el buscador", fill: C.paleRed, accent: C.red },
  ];
  parts.forEach((item, index) => {
    const x = 6.76;
    const y = 2.08 + index * 0.92;
    accent(slide, x + 0.02, y + 0.05, 0.52, item.accent, 0.08);
    slide.addShape(SH.line, { x: x + 0.26, y: y + 0.62, w: 4.98, h: 0, line: { color: item.accent, pt: 0.8, transparency: 32 } });
    text(slide, item.title, { x: x + 0.34, y: y + 0.08, w: 1.1, h: 0.16, fontFace: TYPOGRAPHY.display, fontSize: 12.2, bold: true, color: C.navy });
    text(slide, item.body, { x: x + 1.74, y: y + 0.11, w: 3.42, h: 0.16, fontSize: 8.8, color: C.ink, align: "right" });
  });
  surface(slide, 1.06, 4.78, 5.22, 0.86, { fill: C.softBlue, line: C.softBlue });
  text(slide, "fórmula práctica", { x: 1.42, y: 4.96, w: 4.5, h: 0.14, fontSize: 11.2, bold: true, color: C.navy, align: "center" });
  text(slide, "Q(s,a) + c_puct · P(s,a) · sqrt(N(s)) / (1 + N(s,a))", { x: 1.36, y: 5.3, w: 4.62, h: 0.1, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 6.9, bold: true, color: C.red, align: "center" });
  surface(slide, 6.92, 4.78, 5.02, 0.86, { fill: C.navy, line: C.navy });
  text(slide, "Elige por visitas, no por una opinión instantánea.", { x: 7.28, y: 5.04, w: 4.3, h: 0.16, fontSize: 11.2, bold: true, color: C.white, align: "center" });
  text(slide, "Las visitas integran valor, exploración y evidencia acumulada.", { x: 7.36, y: 5.38, w: 4.16, h: 0.1, fontSize: 8.2, color: C.terminalOutput, align: "center" });
  validateSlide(slide, pptx);
}

function slide28() {
  const slide = pptx.addSlide();
  addHeader(slide, "Self-play: fabricar datos jugando mejor cada vez", "El modelo no aprende de humanos: aprende de partidas que él mismo produce con MCTS.", "Bloque 3");
  surface(slide, 0.92, 1.94, 7.28, 4.42, { fill: C.white, line: C.border });
  text(slide, "ciclo AlphaZero", { x: 1.22, y: 2.16, w: 2.44, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 15.2, bold: true, color: C.navy });
  text(slide, "cada iteración deja ejemplos entrenables: observación, distribución de visitas y resultado", { x: 1.24, y: 2.54, w: 5.98, h: 0.12, fontSize: 8.1, color: C.slate });
  const loopSteps = [
    { title: "Modelo actual", body: "checkpoint", x: 1.18, y: 3.0, fill: C.softBlue, accent: C.navy },
    { title: "Self-play + MCTS", body: "partidas propias", x: 3.3, y: 3.0, fill: C.paleRed, accent: C.red },
    { title: "Replay buffer", body: "(obs, π, z)", x: 5.58, y: 3.0, fill: C.warm, accent: C.gold },
    { title: "Entrenamiento", body: "policy + value loss", x: 5.58, y: 4.72, fill: C.mist, accent: C.titleFill },
    { title: "Evaluación", body: "arena controlada", x: 3.3, y: 4.72, fill: C.successSoft, accent: C.success },
    { title: "Promoción", body: "nuevo mejor", x: 1.18, y: 4.72, fill: C.softBlue, accent: C.navy },
  ];
  const cardW = 1.56;
  const cardH = 0.72;
  [["Modelo actual", "Self-play + MCTS"], ["Self-play + MCTS", "Replay buffer"], ["Replay buffer", "Entrenamiento"], ["Entrenamiento", "Evaluación"], ["Evaluación", "Promoción"], ["Promoción", "Modelo actual"]].forEach(([fromTitle, toTitle]) => {
    const from = loopSteps.find((step) => step.title === fromTitle);
    const to = loopSteps.find((step) => step.title === toTitle);
    if (fromTitle === "Replay buffer") line(slide, from.x + cardW / 2, from.y + cardH, to.x + cardW / 2, to.y, { color: C.guide, pt: 1.25 });
    else if (fromTitle === "Promoción") line(slide, from.x + cardW / 2, from.y, to.x + cardW / 2, to.y + cardH, { color: C.guide, pt: 1.25 });
    else line(slide, from.x + cardW, from.y + cardH / 2, to.x, to.y + cardH / 2, { color: C.guide, pt: 1.25 });
  });
  loopSteps.forEach((step) => {
    surface(slide, step.x, step.y, cardW, cardH, { fill: step.fill, line: step.fill });
    accent(slide, step.x + 0.1, step.y + 0.13, 0.46, step.accent, 0.06);
    text(slide, step.title, { x: step.x + 0.28, y: step.y + 0.14, w: 1.1, h: 0.12, fontFace: TYPOGRAPHY.display, fontSize: 9.0, bold: true, color: C.navy, align: "center" });
    text(slide, step.body, { x: step.x + 0.28, y: step.y + 0.44, w: 1.1, h: 0.08, fontSize: 6.8, color: C.ink, align: "center" });
  });
  surface(slide, 1.28, 5.94, 6.44, 0.28, { fill: C.navy, line: C.navy });
  text(slide, "la red aprende de la búsqueda; la siguiente búsqueda usa una red mejor", { x: 1.64, y: 6.03, w: 5.72, h: 0.08, fontSize: 7.4, bold: true, color: C.white, align: "center" });
  const safeguards = [
    { title: "ruido Dirichlet", body: "abre caminos nuevos al inicio del self-play", accent: C.gold, fill: C.warm },
    { title: "temperature", body: "explora temprano; decide fuerte al cierre", accent: C.red, fill: C.paleRed },
    { title: "liga de checkpoints", body: "evita olvidar cómo vencía a versiones anteriores", accent: C.success, fill: C.successSoft },
  ];
  safeguards.forEach((item, index) => {
    const y = 2.14 + index * 1.16;
    surface(slide, 8.48, y, 3.54, 0.86, { fill: item.fill, line: item.fill });
    accent(slide, 8.7, y + 0.16, 0.54, item.accent);
    text(slide, item.title, { x: 9.06, y: y + 0.17, w: 2.48, h: 0.16, fontFace: TYPOGRAPHY.display, fontSize: 11.2, bold: true, color: C.navy });
    text(slide, item.body, { x: 9.06, y: y + 0.46, w: 2.46, h: 0.18, fontSize: 8.2, color: C.ink });
  });
  validateSlide(slide, pptx);
}

function slide29() {
  const slide = pptx.addSlide();
  addHeader(slide, "Ocho generaciones: aprender también es fallar bien", "La evidencia real del proyecto no es una línea ascendente perfecta, sino una genealogía con postmortems.", "Bloque 3");
  addModelGenerationTable(slide, SH, {
    x: 0.86,
    y: 1.9,
    w: 7.48,
    h: 4.46,
    title: "ranking por round-robin",
    subtitle: "más honesto que una sola métrica contra heurísticas",
    rows: [
      { name: "liga", version: "v8", score: "0.94", state: "más fuerte", lesson: "liga de checkpoints", accent: C.success },
      { name: "centinela", version: "v6", score: "0.81", state: "sobreajuste", lesson: "dominaba sentinel", accent: C.red },
      { name: "amnesia", version: "v7", score: "0.75", state: "regresión", lesson: "bootstrap sin buffer", accent: C.titleFill },
      { name: "chispazo", version: "v3", score: "0.29", state: "diagnóstico", lesson: "run abortada", accent: C.gold },
      { name: "reflejo", version: "v2", score: "0.29", state: "bug MCTS", lesson: "desempate sesgado", accent: C.red },
      { name: "aprendiz", version: "v4a", score: "0.25", state: "parcial", lesson: "shaping insuficiente", accent: C.gold },
      { name: "bogo", version: "v1", score: "0.17", state: "fallo base", lesson: "policy plana", accent: C.guide },
    ],
  });
  surface(slide, 8.68, 2.02, 3.38, 1.14, { fill: C.navy, line: C.navy });
  text(slide, "Composite", { x: 9.0, y: 2.26, w: 2.74, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 14.8, bold: true, color: C.white, align: "center" });
  text(slide, "¿gana a heurísticas conocidas?", { x: 9.08, y: 2.72, w: 2.58, h: 0.16, fontSize: 8.8, color: C.terminalOutput, align: "center" });
  surface(slide, 8.68, 3.42, 3.38, 1.14, { fill: C.successSoft, line: C.successSoft });
  text(slide, "Round-robin", { x: 9.0, y: 3.66, w: 2.74, h: 0.2, fontFace: TYPOGRAPHY.display, fontSize: 14.8, bold: true, color: C.navy, align: "center" });
  text(slide, "¿resiste contra otros modelos?", { x: 9.08, y: 4.12, w: 2.58, h: 0.16, fontSize: 8.8, color: C.ink, align: "center" });
  surface(slide, 8.68, 5.08, 3.38, 0.7, { fill: C.paleRed, line: C.paleRed });
  text(slide, "Una sola métrica puede celebrar una trampa.", { x: 9.0, y: 5.31, w: 2.76, h: 0.12, fontSize: 8.4, bold: true, color: C.red, align: "center" });
  validateSlide(slide, pptx);
}

function slide30() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas de seguimiento", "Antes del torneo, verificamos que el sistema completo se entienda.", "Bloque 3");
  const questions = [
    {
      n: "01",
      q: "¿Por qué policy y value comparten el cuerpo de la red?",
      h: "Pista: ambas salidas necesitan leer los mismos patrones espaciales.",
      accent: C.red,
    },
    {
      n: "02",
      q: "¿Por qué MCTS elige por visitas y no por el valor directo?",
      h: "Pista: las visitas acumulan búsqueda, prior, exploración y evidencia.",
      accent: C.gold,
    },
    {
      n: "03",
      q: "¿Qué nos dice la diferencia entre composite y round-robin?",
      h: "Pista: distingue ganar un examen de jugar mejor contra rivales variados.",
      accent: C.titleFill,
    },
  ];
  questions.forEach((item, index) => {
    const y = 2.08 + index * 1.16;
    surface(slide, 1.08, y, 11.0, 0.76, { fill: index === 1 ? C.warm : C.softBlue, line: index === 1 ? C.warm : C.softBlue });
    pill(slide, item.n, 1.36, y + 0.23, 0.46, { fill: item.accent, h: 0.28, fontSize: 7.2, color: item.accent === C.gold ? C.navy : C.white });
    text(slide, item.q, { x: 2.06, y: y + 0.18, w: 8.92, h: 0.16, fontSize: 10.2, bold: true, color: C.navy });
    text(slide, item.h, { x: 2.06, y: y + 0.48, w: 8.7, h: 0.1, fontSize: 7.8, color: C.slate });
  });
  surface(slide, 1.08, 5.88, 11.0, 0.42, { fill: C.navy, line: C.navy });
  text(slide, "Ahora viene la prueba honesta: jugar contra el sistema y mirar sus decisiones en vivo.", {
    x: 1.42,
    y: 6.02,
    w: 10.34,
    h: 0.1,
    fontSize: 8.8,
    bold: true,
    color: C.white,
    align: "center",
  });
  validateSlide(slide, pptx);
}

function titleSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  slide.addImage({ path: logoPath, x: 10.35, y: 0.46, w: 1.68, h: 0.54 });
  addBarsMotif(slide, 0.72, 0.58, 1.1, C.red);
  pill(slide, "Clase 26 · Semana 09", 0.86, 1.28, 2.1, { fill: C.red, h: 0.34 });
  text(slide, "Construir IA para un dominio acotado", {
    x: 0.82,
    y: 1.78,
    w: 7.7,
    h: 0.88,
    fontFace: TYPOGRAPHY.display,
    fontSize: 31,
    bold: true,
    color: C.white,
  });
  text(slide, "Ataxx Zero: reglas, búsqueda, aprendizaje y torneo en vivo", {
    x: 0.86,
    y: 2.78,
    w: 7.4,
    h: 0.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15.2,
    bold: true,
    color: C.terminalOutput,
  });
  text(slide, "Martes 12 de mayo de 2026 · PRO301 Taller de Aplicaciones para Internet", {
    x: 0.88,
    y: 6.18,
    w: 6.6,
    h: 0.18,
    fontSize: 8.8,
    color: "C9D7E6",
  });
  drawMiniBoard(slide, 8.42, 1.48, 3.28, {
    line: C.white,
    pieces: [
      [0, 0, 1],
      [6, 6, 1],
      [0, 6, -1],
      [6, 0, -1],
      [2, 3, 1],
      [3, 3, -1],
      [4, 2, -1],
      [4, 3, 1],
    ],
  });
  surface(slide, 8.62, 5.05, 2.88, 0.72, { fill: C.white, line: C.white, transparency: 0 });
  text(slide, "El sistema se entiende en sala y luego se pone a prueba jugando.", {
    x: 8.86,
    y: 5.24,
    w: 2.4,
    h: 0.22,
    fontSize: 9.2,
    bold: true,
    color: C.navy,
    align: "center",
  });
  validateSlide(slide, pptx);
}

function slide2() {
  const slide = pptx.addSlide();
  addHeader(slide, "Hoy no veremos IA como caja negra", "La clase abre un sistema real para leer sus decisiones por capas.", "Contexto");
  addCenterStatement(slide, SH, "Una IA útil no es solo un modelo: es problema, reglas, datos, búsqueda, evaluación y criterio humano.", {
    x: 1.05,
    y: 2.02,
    w: 11.25,
    h: 0.72,
    fill: C.navy,
    color: C.white,
    fontSize: 17,
  });
  const steps = [
    { label: "Dominio", body: "Ataxx define estados, acciones legales y término.", color: C.red, fill: C.paleRed },
    { label: "Criterio", body: "Heurísticas enseñan qué parece una buena jugada.", color: C.gold, fill: C.warm },
    { label: "Modelo", body: "Policy y value aprenden a evaluar posiciones.", color: C.titleFill, fill: C.softBlue },
    { label: "Búsqueda", body: "MCTS no revisa todo: concentra simulaciones.", color: C.success, fill: C.successSoft },
    { label: "Evidencia", body: "El torneo muestra decisiones bajo presión real.", color: C.navy, fill: C.mist },
  ];
  const gap = 0.16;
  const cardW = (11.2 - gap * 4) / 5;
  steps.forEach((step, index) => {
    const x = 1.08 + index * (cardW + gap);
    surface(slide, x, 3.28, cardW, 1.68, { fill: step.fill, line: step.fill });
    pill(slide, String(index + 1).padStart(2, "0"), x + 0.22, 3.52, 0.48, { fill: step.color, h: 0.3, fontSize: 7.6, color: step.color === C.gold ? C.navy : C.white });
    text(slide, step.label, {
      x: x + 0.22,
      y: 3.9,
      w: cardW - 0.44,
      h: 0.24,
      fontFace: TYPOGRAPHY.display,
      fontSize: 12.2,
      bold: true,
      color: C.navy,
      align: "center",
    });
    text(slide, step.body, {
      x: x + 0.24,
      y: 4.28,
      w: cardW - 0.48,
      h: 0.42,
      fontSize: 8.1,
      color: C.ink,
      align: "center",
      valign: "mid",
    });
    if (index < steps.length - 1) {
      line(slide, x + cardW + 0.03, 4.1, x + cardW + gap - 0.03, 4.1, { color: C.guide, pt: 1.1 });
    }
  });
  text(slide, "El objetivo no es admirar la IA: es aprender a auditarla.", {
    x: 1.1,
    y: 5.72,
    w: 11.1,
    h: 0.28,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15.2,
    bold: true,
    color: C.red,
    align: "center",
  });
  validateSlide(slide, pptx);
}

function slide3() {
  const slide = pptx.addSlide();
  addHeader(slide, "La promesa de la clase", "Primero entendemos el sistema; después el sistema juega contra ustedes.", "Contexto");
  const leftX = 0.98;
  const rightX = 7.2;
  surface(slide, leftX, 2.0, 5.62, 3.88, { fill: C.navy, line: C.navy });
  text(slide, "Al final no basta preguntar quién ganó.", {
    x: leftX + 0.42,
    y: 2.48,
    w: 4.78,
    h: 0.54,
    fontFace: TYPOGRAPHY.display,
    fontSize: 23,
    bold: true,
    color: C.white,
  });
  text(slide, "La lectura técnica es mirar qué posición evaluó, qué jugadas consideró, cuánta búsqueda usó y qué señal entregan las métricas.", {
    x: leftX + 0.46,
    y: 3.42,
    w: 4.64,
    h: 0.74,
    fontSize: 11.2,
    color: C.terminalOutput,
    valign: "mid",
  });
  drawMiniBoard(slide, leftX + 1.68, 4.52, 1.04, { line: C.white });
  const prompts = [
    { q: "¿Qué problema está resolviendo?", a: "estado, acción, transición, recompensa", color: C.red },
    { q: "¿Cómo decide?", a: "heurística, policy/value, MCTS", color: C.gold },
    { q: "¿Cómo sabemos si mejoró?", a: "evaluación, head-to-head, torneo", color: C.success },
  ];
  prompts.forEach((item, index) => {
    const y = 2.08 + index * 1.2;
    surface(slide, rightX, y, 5.02, 0.9, { fill: index % 2 === 0 ? C.softBlue : C.warm, line: index % 2 === 0 ? C.softBlue : C.warm });
    accent(slide, rightX + 0.16, y + 0.16, 0.58, item.color);
    text(slide, item.q, {
      x: rightX + 0.42,
      y: y + 0.18,
      w: 4.34,
      h: 0.18,
      fontFace: TYPOGRAPHY.display,
      fontSize: 12.8,
      bold: true,
      color: C.navy,
    });
    text(slide, item.a, {
      x: rightX + 0.42,
      y: y + 0.53,
      w: 4.34,
      h: 0.12,
      fontSize: 8.4,
      bold: true,
      color: C.slate,
    });
  });
  surface(slide, rightX, 5.72, 5.02, 0.48, { fill: C.paleRed, line: C.paleRed });
  text(slide, "Esta mirada es la misma que sirve para defender la evaluación final del 19 de mayo.", {
    x: rightX + 0.22,
    y: 5.86,
    w: 4.58,
    h: 0.14,
    fontSize: 8.8,
    bold: true,
    color: C.red,
    align: "center",
  });
  validateSlide(slide, pptx);
}

function slide4() {
  const slide = pptx.addSlide();
  addHeader(slide, "Ataxx: pequeño en pantalla, grande como problema", "El tablero 7 x 7 cabe completo, pero sus consecuencias tácticas no caben en intuición simple.", "Bloque 1");
  addAtaxxBoardState(slide, SH, {
    x: 0.9,
    y: 2.02,
    w: 7.25,
    h: 4.15,
    title: "Posición inicial",
    subtitle: "Cuatro piezas en esquinas opuestas: no hay azar ni información oculta.",
    metrics: [
      { label: "Tipo", value: "información perfecta", fill: C.softBlue },
      { label: "Azar", value: "0 dados / 0 cartas", fill: C.warm },
      { label: "Objetivo", value: "ocupar más casillas", fill: C.paleRed },
    ],
    note: "La incertidumbre no viene del tablero: viene de anticipar la decisión del rival.",
  });
  addMetricCard(slide, {
    x: 8.55,
    y: 2.1,
    w: 3.72,
    h: 1.12,
    label: "Idea clave",
    value: "simple ≠ trivial",
    valueFontSize: 17,
    body: "Un dominio acotado puede exigir técnicas serias si las combinaciones crecen rápido.",
    fill: C.navy,
    line: C.navy,
    accent: C.red,
    valueColor: C.white,
    bodyColor: C.terminalOutput,
  });
  text(slide, "Por eso Ataxx sirve como laboratorio: permite ver reglas completas, código real y decisiones de IA sin esconder el sistema detrás de infraestructura enorme.", {
    x: 8.72,
    y: 3.66,
    w: 3.28,
    h: 1.02,
    fontSize: 10.6,
    color: C.ink,
    valign: "mid",
  });
  surface(slide, 8.55, 5.18, 3.72, 0.72, { fill: C.softBlue, line: C.softBlue });
  text(slide, "Damas, ajedrez, Go y Ataxx comparten una forma: turnos, estados, acciones legales y resultado.", {
    x: 8.78,
    y: 5.38,
    w: 3.28,
    h: 0.2,
    fontSize: 8.7,
    bold: true,
    color: C.navy,
    align: "center",
  });
  validateSlide(slide, pptx);
}

function slide5() {
  const slide = pptx.addSlide();
  addHeader(slide, "Convertir un juego en problema de IA", "Antes de entrenar nada, hay que decir con precisión qué existe, qué se puede hacer y qué cuenta como éxito.", "Bloque 1");
  const flow = [
    { title: "Estado", body: "tablero, turno, contadores, historial", accent: C.red, fill: C.paleRed },
    { title: "Acción legal", body: "origen, destino o pase si no hay movimiento", accent: C.gold, fill: C.warm },
    { title: "Transición", body: "clonar o saltar, infectar vecinos, cambiar turno", accent: C.titleFill, fill: C.softBlue },
    { title: "Recompensa", body: "+1 victoria, 0 empate, -1 derrota", accent: C.success, fill: C.successSoft },
  ];
  const gap = 0.22;
  const cardW = (11.0 - gap * 3) / 4;
  flow.forEach((item, index) => {
    const x = 1.12 + index * (cardW + gap);
    surface(slide, x, 2.1, cardW, 2.42, { fill: item.fill, line: item.fill });
    accent(slide, x + 0.16, 2.32, 1.98, item.accent);
    pill(slide, String(index + 1).padStart(2, "0"), x + 0.42, 2.34, 0.52, { fill: item.accent, h: 0.3, fontSize: 7.6, color: item.accent === C.gold ? C.navy : C.white });
    text(slide, item.title, {
      x: x + 0.42,
      y: 2.82,
      w: cardW - 0.62,
      h: 0.3,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15.2,
      bold: true,
      color: C.navy,
    });
    text(slide, item.body, {
      x: x + 0.42,
      y: 3.34,
      w: cardW - 0.62,
      h: 0.54,
      fontSize: 9,
      color: C.ink,
      valign: "mid",
    });
    if (index < flow.length - 1) {
      line(slide, x + cardW + 0.04, 3.34, x + cardW + gap - 0.04, 3.34, { color: C.guide, pt: 1.2 });
    }
  });
  surface(slide, 1.1, 5.12, 11.05, 0.72, { fill: C.navy, line: C.navy });
  text(slide, "Sin esta especificación, el modelo no sabe qué aprender y el docente no tiene qué auditar.", {
    x: 1.42,
    y: 5.34,
    w: 10.42,
    h: 0.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.2,
    bold: true,
    color: C.white,
    align: "center",
  });
  validateSlide(slide, pptx);
}

function slide6() {
  const slide = pptx.addSlide();
  addHeader(slide, "Las reglas básicas: clonar, saltar, convertir", "Tres reglas simples producen decisiones tácticas difíciles.", "Bloque 1");

  function rulePanel(panel) {
    surface(slide, panel.x, 2.08, 3.55, 3.86, { fill: panel.fill, line: panel.fill });
    accent(slide, panel.x + 0.16, 2.28, 3.42, panel.accent);
    pill(slide, panel.badge, panel.x + 0.4, 2.32, 0.48, { fill: panel.accent, h: 0.3, fontSize: 7.4, color: panel.accent === C.gold ? C.navy : C.white });
    text(slide, panel.title, {
      x: panel.x + 0.98,
      y: 2.28,
      w: 2.2,
      h: 0.26,
      fontFace: TYPOGRAPHY.display,
      fontSize: 14.8,
      bold: true,
      color: C.navy,
    });
    text(slide, panel.rule, {
      x: panel.x + 0.4,
      y: 2.72,
      w: 2.9,
      h: 0.16,
      fontSize: 8.6,
      bold: true,
      color: panel.accent,
    });
    drawMiniBoard(slide, panel.x + 0.56, 3.12, 1.42, { pieces: panel.pieces });
    if (panel.from && panel.to) {
      const cell = 1.42 / 7;
      const bx = panel.x + 0.56;
      const by = 3.12;
      const fx = bx + panel.from.c * cell + cell / 2;
      const fy = by + panel.from.r * cell + cell / 2;
      const tx = bx + panel.to.c * cell + cell / 2;
      const ty = by + panel.to.r * cell + cell / 2;
      line(slide, fx, fy, tx, ty, { color: panel.accent, pt: 1.8 });
      slide.addShape(SH.rect, {
        x: tx - cell * 0.45,
        y: ty - cell * 0.45,
        w: cell * 0.9,
        h: cell * 0.9,
        fill: { color: panel.accent, transparency: 80 },
        line: { color: panel.accent, pt: 1.2 },
      });
    }
    surface(slide, panel.x + 2.16, 3.18, 0.96, 0.44, { fill: C.white, line: C.white });
    text(slide, panel.distance, {
      x: panel.x + 2.24,
      y: 3.31,
      w: 0.8,
      h: 0.1,
      fontFace: TYPOGRAPHY.mono || "Aptos Mono",
      fontSize: 8,
      bold: true,
      color: panel.accent,
      align: "center",
    });
    text(slide, panel.body, {
      x: panel.x + 0.4,
      y: 4.78,
      w: 2.85,
      h: 0.46,
      fontSize: 8.7,
      color: C.ink,
      valign: "mid",
    });
    surface(slide, panel.x + 0.4, 5.38, 2.86, 0.28, { fill: C.white, line: C.white, rectRadius: 0.035 });
    text(slide, panel.effect, {
      x: panel.x + 0.52,
      y: 5.47,
      w: 2.62,
      h: 0.08,
      fontSize: 7.3,
      bold: true,
      color: C.navy,
      align: "center",
    });
  }

  rulePanel({
    x: 0.95,
    badge: "01",
    title: "Clonar",
    rule: "Destino vacío a distancia 1",
    distance: "dist = 1",
    fill: C.successSoft,
    accent: C.success,
    from: { r: 3, c: 2 },
    to: { r: 3, c: 3 },
    pieces: [[3, 2, 1], [0, 0, -1], [6, 6, -1]],
    body: "La pieza original permanece y aparece una copia en el destino.",
    effect: "aumenta el conteo del jugador",
  });
  rulePanel({
    x: 4.86,
    badge: "02",
    title: "Saltar",
    rule: "Destino vacío a distancia 2",
    distance: "dist = 2",
    fill: C.warm,
    accent: C.gold,
    from: { r: 3, c: 1 },
    to: { r: 3, c: 3 },
    pieces: [[3, 1, 1], [0, 0, -1], [6, 6, -1]],
    body: "La pieza se mueve: desaparece del origen y reaparece más lejos.",
    effect: "reposiciona sin ganar piezas",
  });
  rulePanel({
    x: 8.77,
    badge: "03",
    title: "Convertir",
    rule: "Después de llegar al destino",
    distance: "radio 1",
    fill: C.paleRed,
    accent: C.red,
    from: { r: 2, c: 2 },
    to: { r: 3, c: 3 },
    pieces: [[2, 2, 1], [2, 3, -1], [3, 2, -1], [3, 4, -1]],
    body: "Todas las piezas enemigas adyacentes al destino cambian de lado.",
    effect: "puede invertir una zona completa",
  });

  surface(slide, 1.04, 6.18, 11.1, 0.38, { fill: C.navy, line: C.navy });
  text(slide, "Regla de oro: origen propio, destino vacío, distancia legal; luego se aplica la conversión.", {
    x: 1.34,
    y: 6.3,
    w: 10.5,
    h: 0.1,
    fontFace: TYPOGRAPHY.display,
    fontSize: 10.5,
    bold: true,
    color: C.white,
    align: "center",
  });
  validateSlide(slide, pptx);
}

function slide7() {
  const slide = pptx.addSlide();
  addHeader(slide, "La infección es la regla que vuelve interesante el juego", "El destino de una pieza crea una ventana 3 x 3 que puede cambiar el balance completo.", "Bloque 1");
  const grid = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, -1, -1, 0, 0, 0],
    [0, 0, -1, 0, -1, 0, 0],
    [0, 0, 0, -1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  addAtaxxBoardState(slide, SH, {
    x: 0.9,
    y: 2.0,
    w: 7.05,
    h: 4.18,
    title: "Una jugada puede cambiar una zona",
    subtitle: "La pieza roja aterriza y convierte rivales adyacentes.",
    grid,
    move: { from: { r: 1, c: 1 }, to: { r: 3, c: 3 }, color: C.red, pt: 2.4 },
    highlights: [
      { r: 3, c: 3, fill: C.red, transparency: 18 },
      { r: 2, c: 2, fill: C.gold, transparency: 12 },
      { r: 2, c: 3, fill: C.gold, transparency: 12 },
      { r: 3, c: 2, fill: C.gold, transparency: 12 },
      { r: 3, c: 4, fill: C.gold, transparency: 12 },
      { r: 4, c: 3, fill: C.gold, transparency: 12 },
    ],
    metrics: [
      { label: "Ventana", value: "3 x 3", fill: C.warm },
      { label: "Máximo", value: "8 conversiones", fill: C.paleRed },
      { label: "Riesgo", value: "conteo engañoso", fill: C.softBlue },
    ],
    note: "La evaluación correcta debe mirar amenaza, soporte y respuesta rival, no solo cantidad actual de piezas.",
  });
  addCodePanel(slide, SH, {
    x: 8.25,
    y: 2.08,
    w: 3.8,
    h: 2.05,
    title: "src/game/board.py",
    lang: "python",
    fontSize: 7.3,
    code: [
      "enemy = opponent(current_player)",
      "window = grid[r-1:r+2, c-1:c+2]",
      "converted = sum(window == enemy)",
      "window[window == enemy] = current_player",
    ].join("\n"),
  });
  surface(slide, 8.25, 4.56, 3.8, 1.08, { fill: C.paleRed, line: C.paleRed });
  text(slide, "Esta regla crea táctica local, amenazas latentes y posiciones que parecen ganadas hasta que colapsan.", {
    x: 8.52,
    y: 4.86,
    w: 3.26,
    h: 0.32,
    fontSize: 9.5,
    bold: true,
    color: C.red,
    align: "center",
  });
  validateSlide(slide, pptx);
}

function slide8() {
  const slide = pptx.addSlide();
  addHeader(slide, "No basta con contar piezas", "Una métrica obvia puede ocultar la jugada que viene.", "Bloque 1");
  const leftPieces = [
    [0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, 1], [2, 1, 1], [5, 5, 1],
    [2, 3, -1], [3, 2, -1], [3, 4, -1], [4, 3, -1],
  ];
  const rightPieces = [
    [0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, 1], [2, 1, 1], [5, 5, 1],
    [3, 3, 1], [2, 3, 1], [3, 2, 1], [3, 4, 1], [4, 3, 1],
  ];
  surface(slide, 1.0, 2.0, 5.45, 3.88, { fill: C.softBlue, line: C.softBlue });
  surface(slide, 6.9, 2.0, 5.45, 3.88, { fill: C.warm, line: C.warm });
  pill(slide, "ANTES", 1.34, 2.28, 0.9, { fill: C.navy });
  pill(slide, "DESPUÉS", 7.24, 2.28, 1.1, { fill: C.red });
  text(slide, "Ventaja visible", { x: 2.5, y: 2.24, w: 3.3, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true, color: C.navy });
  text(slide, "Golpe táctico", { x: 8.68, y: 2.24, w: 2.8, h: 0.28, fontFace: TYPOGRAPHY.display, fontSize: 15, bold: true, color: C.navy });
  drawMiniBoard(slide, 1.42, 2.86, 2.24, { pieces: leftPieces });
  drawMiniBoard(slide, 7.32, 2.86, 2.24, { pieces: rightPieces });
  text(slide, "El jugador rojo parece cómodo si solo miramos conteo y centro.", {
    x: 3.98,
    y: 3.18,
    w: 1.95,
    h: 0.62,
    fontSize: 9.3,
    color: C.ink,
    valign: "mid",
  });
  text(slide, "La jugada correcta puede convertir varias piezas y reescribir el balance.", {
    x: 9.9,
    y: 3.18,
    w: 1.95,
    h: 0.62,
    fontSize: 9.3,
    color: C.ink,
    valign: "mid",
  });
  line(slide, 6.48, 3.98, 6.86, 3.98, { color: C.red, pt: 2.1 });
  surface(slide, 1.25, 6.08, 10.85, 0.54, { fill: C.navy, line: C.navy });
  text(slide, "Una evaluación seria necesita anticipar respuestas, no fotografiar el tablero.", {
    x: 1.58,
    y: 6.24,
    w: 10.2,
    h: 0.14,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.8,
    bold: true,
    color: C.white,
    align: "center",
  });
  validateSlide(slide, pptx);
}

function slide9() {
  const slide = pptx.addSlide();
  addHeader(slide, "Terminar una partida también es parte del modelo", "Las condiciones de término no son detalles administrativos: estabilizan juego, evaluación y entrenamiento.", "Bloque 1");
  surface(slide, 0.96, 2.02, 4.08, 4.08, { fill: C.navy, line: C.navy });
  text(slide, "is_game_over()", {
    x: 1.28,
    y: 2.38,
    w: 3.42,
    h: 0.42,
    fontFace: TYPOGRAPHY.mono || "Aptos Mono",
    fontSize: 20,
    bold: true,
    color: C.white,
    align: "center",
  });
  text(slide, "La partida no termina cuando “se siente resuelta”. Termina cuando una regla verificable lo declara.", {
    x: 1.34,
    y: 3.18,
    w: 3.28,
    h: 0.64,
    fontSize: 11,
    color: C.terminalOutput,
    align: "center",
    valign: "mid",
  });
  surface(slide, 1.42, 4.48, 3.16, 0.78, { fill: C.white, line: C.white });
  text(slide, "resultado = +1 / 0 / -1", {
    x: 1.62,
    y: 4.74,
    w: 2.76,
    h: 0.12,
    fontFace: TYPOGRAPHY.mono || "Aptos Mono",
    fontSize: 10.6,
    bold: true,
    color: C.navy,
    align: "center",
  });

  const rules = [
    { id: "01", title: "Tablero lleno", body: "49 casillas ocupadas; gana el mayor conteo.", accent: C.navy, fill: C.softBlue },
    { id: "02", title: "Eliminación", body: "Un lado queda sin piezas tras una conversión.", accent: C.red, fill: C.paleRed },
    { id: "03", title: "Tope de jugadas", body: "100 medias jugadas cortan bucles en self-play.", accent: C.gold, fill: C.warm },
    { id: "04", title: "Triple repetición", body: "La misma posición aparece tres veces.", accent: C.titleFill, fill: C.mist },
    { id: "05", title: "Bloqueo total", body: "Ningún jugador tiene movimiento legal.", accent: C.success, fill: C.successSoft },
  ];
  rules.forEach((rule, index) => {
    const y = 2.04 + index * 0.79;
    surface(slide, 5.54, y, 6.72, 0.58, { fill: rule.fill, line: rule.fill, rectRadius: 0.04 });
    pill(slide, rule.id, 5.78, y + 0.15, 0.44, { fill: rule.accent, h: 0.26, fontSize: 7, color: rule.accent === C.gold ? C.navy : C.white });
    text(slide, rule.title, {
      x: 6.42,
      y: y + 0.14,
      w: 1.9,
      h: 0.16,
      fontFace: TYPOGRAPHY.display,
      fontSize: 10.6,
      bold: true,
      color: C.navy,
    });
    text(slide, rule.body, {
      x: 8.28,
      y: y + 0.14,
      w: 3.66,
      h: 0.16,
      fontSize: 8.2,
      color: C.ink,
      align: "right",
    });
  });

  surface(slide, 5.54, 6.08, 6.72, 0.42, { fill: C.paleRed, line: C.paleRed });
  text(slide, "Estas reglas también protegen el entrenamiento: evitan partidas eternas y resultados ambiguos.", {
    x: 5.78,
    y: 6.21,
    w: 6.24,
    h: 0.1,
    fontSize: 8.3,
    bold: true,
    color: C.red,
    align: "center",
  });
  validateSlide(slide, pptx);
}

function slide10() {
  const slide = pptx.addSlide();
  addHeader(slide, "La escala del problema no es intuitiva", "El número no pretende contar partidas legales exactas; sirve para dimensionar por qué no basta enumerar.", "Bloque 1");
  surface(slide, 1.02, 2.02, 5.74, 1.42, { fill: C.navy, line: C.navy });
  text(slide, "cota simple de estados", {
    x: 1.38,
    y: 2.28,
    w: 2.3,
    h: 0.14,
    fontSize: 8.4,
    bold: true,
    color: C.terminalOutput,
  });
  text(slide, "3", { x: 1.36, y: 2.54, w: 0.58, h: 0.46, fontFace: TYPOGRAPHY.display, fontSize: 34, bold: true, color: C.white });
  text(slide, "49", { x: 1.94, y: 2.45, w: 0.42, h: 0.16, fontFace: TYPOGRAPHY.display, fontSize: 12, bold: true, color: C.white });
  text(slide, "≈ 2.4 × 10", { x: 2.58, y: 2.58, w: 2.32, h: 0.36, fontFace: TYPOGRAPHY.display, fontSize: 25, bold: true, color: C.gold });
  text(slide, "23", { x: 4.84, y: 2.48, w: 0.42, h: 0.16, fontFace: TYPOGRAPHY.display, fontSize: 12, bold: true, color: C.gold });
  surface(slide, 1.02, 3.7, 5.74, 0.82, { fill: C.paleRed, line: C.paleRed });
  text(slide, "Lectura correcta", {
    x: 1.34,
    y: 3.92,
    w: 1.34,
    h: 0.12,
    fontSize: 8.2,
    bold: true,
    color: C.red,
  });
  text(slide, "No todas esas posiciones son legales, pero el orden de magnitud ya descarta fuerza bruta ingenua.", {
    x: 2.62,
    y: 3.88,
    w: 3.7,
    h: 0.18,
    fontSize: 8.6,
    bold: true,
    color: C.ink,
    align: "right",
  });
  const comparisons = [
    ["Tres en raya", "~5.000", C.success],
    ["Conecta cuatro", "~4 × 10^12", C.gold],
    ["Damas", "~5 × 10^20", C.titleFill],
    ["Ataxx 7 x 7", "~10^22 a 10^23", C.red],
    ["Ajedrez", "~10^46", C.navy],
  ];
  comparisons.forEach((row, index) => {
    const y = 4.78 + index * 0.32;
    surface(slide, 1.02, y, 5.74, 0.24, { fill: index === 3 ? C.paleRed : (index % 2 === 0 ? C.softBlue : C.warm), line: index === 3 ? C.paleRed : (index % 2 === 0 ? C.softBlue : C.warm), rectRadius: 0.03 });
    accent(slide, 1.14, y + 0.055, 0.13, row[2], 0.055);
    text(slide, row[0], { x: 1.34, y: y + 0.073, w: 2.28, h: 0.07, fontSize: 7, bold: index === 3, color: C.navy });
    text(slide, row[1], { x: 3.72, y: y + 0.073, w: 2.38, h: 0.07, fontFace: TYPOGRAPHY.mono || "Aptos Mono", fontSize: 7, bold: true, color: row[2], align: "right" });
  });
  drawMiniBoard(slide, 7.44, 2.0, 3.28, {
    pieces: [
      [0, 0, 1], [6, 6, 1], [0, 6, -1], [6, 0, -1], [2, 2, 1], [2, 3, -1], [3, 3, 1], [4, 4, -1],
    ],
  });
  surface(slide, 7.1, 5.54, 4.04, 0.66, { fill: C.navy, line: C.navy });
  text(slide, "El tablero es legible para humanos; el árbol completo no lo es para una máquina en tiempo real.", {
    x: 7.42,
    y: 5.75,
    w: 3.4,
    h: 0.12,
    fontSize: 8.4,
    bold: true,
    color: C.white,
    align: "center",
  });
  validateSlide(slide, pptx);
}

function slide11() {
  const slide = pptx.addSlide();
  addHeader(slide, "La fuerza bruta se rompe por ramificación", "Pensar diez jugadas adelante no suma: multiplica.", "Bloque 1");
  const chain = [
    { title: "posición actual", value: "1", note: "lo visible", fill: C.navy, color: C.white, accent: C.red },
    { title: "1 jugada", value: "100", note: "opciones propias", fill: C.softBlue, color: C.navy, accent: C.titleFill },
    { title: "2 jugadas", value: "10.000", note: "respuesta rival", fill: C.warm, color: C.navy, accent: C.gold },
    { title: "3 jugadas", value: "1.000.000", note: "ya explota", fill: C.paleRed, color: C.navy, accent: C.red },
  ];
  chain.forEach((item, index) => {
    const x = 0.94 + index * 2.58;
    surface(slide, x, 2.34, 2.08, 2.22, { fill: item.fill, line: item.fill });
    accent(slide, x + 0.14, 2.56, 1.78, item.accent);
    text(slide, item.title, {
      x: x + 0.36,
      y: 2.66,
      w: 1.5,
      h: 0.16,
      fontSize: 8.2,
      bold: true,
      color: item.color === C.white ? C.terminalOutput : C.slate,
      align: "center",
    });
    text(slide, item.value, {
      x: x + 0.32,
      y: 3.12,
      w: 1.5,
      h: 0.34,
      fontFace: TYPOGRAPHY.display,
      fontSize: index === 3 ? 15.2 : 18,
      bold: true,
      color: item.color,
      align: "center",
    });
    text(slide, item.note, {
      x: x + 0.34,
      y: 3.82,
      w: 1.48,
      h: 0.14,
      fontSize: 7.8,
      bold: true,
      color: item.color === C.white ? C.white : C.ink,
      align: "center",
    });
    if (index < chain.length - 1) {
      text(slide, "×100", {
        x: x + 2.08,
        y: 3.24,
        w: 0.5,
        h: 0.12,
        fontFace: TYPOGRAPHY.mono || "Aptos Mono",
        fontSize: 8.4,
        bold: true,
        color: C.red,
        align: "center",
      });
      line(slide, x + 1.98, 3.66, x + 2.5, 3.66, { color: C.guide, pt: 1.05 });
    }
  });
  addMetricCard(slide, {
    x: 10.82,
    y: 2.34,
    w: 1.56,
    h: 0.98,
    label: "10 jugadas",
    value: "100^10",
    valueFontSize: 15,
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
  });
  addMetricCard(slide, {
    x: 10.82,
    y: 3.72,
    w: 1.56,
    h: 0.98,
    label: "ramas",
    value: "10^20",
    valueFontSize: 17,
    fill: C.navy,
    line: C.navy,
    accent: C.gold,
    valueColor: C.white,
    labelColor: C.gold,
  });
  surface(slide, 1.1, 5.34, 11.0, 0.62, { fill: C.warm, line: C.warm });
  text(slide, "Conclusión: el sistema debe decidir sin conocer el final. Por eso necesita evaluación, heurísticas y luego búsqueda guiada.", {
    x: 1.42,
    y: 5.54,
    w: 10.36,
    h: 0.14,
    fontFace: TYPOGRAPHY.display,
    fontSize: 11.2,
    bold: true,
    color: C.navy,
    align: "center",
  });
  validateSlide(slide, pptx);
}

titleSlide();
slide2();
slide3();
slide4();
slide5();
slide6();
slide7();
slide8();
slide9();
slide10();
slide11();
addFollowUpSlide();
slide13();
slide14();
slide15();
slide16();
slide17();
slide18();
slide19();
slide20();
addBlock2QuestionSlide();
slide22();
slide23();
slide24();
slide25();
slide26();
slide27();
slide28();
slide29();
slide30();

pptx.writeFile({ fileName: outputPptx });
