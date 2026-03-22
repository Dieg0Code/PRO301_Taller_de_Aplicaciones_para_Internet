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
  addBreakpointDecisionPanel,
  addResponsiveViewportCompare,
  addResponsiveReflowPanel,
  addDelegationSplit,
  addComponentVariantBoard,
  addComponentConsistencyPanel,
  addTokenBoard,
  addComponentTree,
  addFrameworkDecisionMatrix,
  addAgenticFlow,
  addSpecWorkflow,
  addPill,
  addBrowserMock,
} = components;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
applyAiepTheme(pptx, {
  author: "Codex",
  company: "AIEP",
  subject: "Clase 05",
  title: "Pantallas Reales, Responsive y Sistemas Visuales - Bloque 1",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx =
  process.env.PPTX_OUTPUT ||
  path.join(rootDir, "Clase-05-Bloque-1-Pantallas-Reales-y-Responsive.pptx");
const outputJs =
  process.env.PPTX_SOURCE_OUTPUT ||
  path.join(rootDir, "Clase-05-Bloque-1-Pantallas-Reales-y-Responsive.js");

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
    classLabel: `Clase 05 · ${blockLabel}`,
    logoMarkPath,
    subtitleY: 1.84,
    subtitleH: 0.28,
    subtitleFontSize: 11.4,
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

function addArrow(slide, x, y, w = 0.38, h = 0.26, fill = C.red) {
  slide.addShape(SH.chevron, {
    x,
    y,
    w,
    h,
    fill: { color: fill },
    line: { color: fill },
  });
}

function addMapBlock(slide, x, y, w, h, opts = {}) {
  addPanel(slide, x, y, w, h, {
    fill: opts.fill || C.white,
    line: opts.line || C.border,
  });
  slide.addText(opts.kicker || "Bloque 1", {
    x,
    y: y + 0.18,
    w,
    h: 0.14,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11,
    bold: true,
    color: opts.kickerColor || C.navy,
    align: "center",
    margin: 0,
  });
  slide.addText(opts.title || "", {
    x: x + 0.26,
    y: y + 0.74,
    w: w - 0.52,
    h: h - 1.06,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.fontSize || 19,
    bold: true,
    color: opts.color || C.navy,
    align: "center",
    valign: "mid",
    margin: 0,
  });
}

function addBrowserScene(slide, x, y, w, h, opts = {}) {
  addBrowserMock(slide, SH, {
    x,
    y,
    w,
    h,
    url: opts.url || "https://demo.local/ui",
  });

  const innerX = x + 0.18;
  const innerY = y + 0.52;
  const innerW = w - 0.36;
  const heroH = opts.compact ? 0.34 : 0.42;
  const accent = opts.accent || C.red;
  const accentFill = opts.accentFill || C.paleRed;
  const neutralFill = opts.neutralFill || C.white;

  slide.addShape(SH.roundRect, {
    x: innerX,
    y: innerY,
    w: innerW,
    h: heroH,
    rectRadius: 0.03,
    fill: { color: accent },
    line: { color: accent },
  });
  slide.addText(opts.hero || "Interfaz de ejemplo", {
    x: innerX + 0.12,
    y: innerY + 0.11,
    w: innerW - 0.24,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: opts.compact ? 8.4 : 9.6,
    bold: true,
    color: C.white,
    margin: 0,
  });

  const mode = opts.mode || "desktop";
  if (mode === "desktop") {
    addPanel(slide, innerX, innerY + 0.56, 1.28, h - 1.36, { fill: accentFill, line: accentFill });
    addPanel(slide, innerX + 1.44, innerY + 0.56, innerW - 1.44, 0.56, { fill: neutralFill, line: C.border });
    addPanel(slide, innerX + 1.44, innerY + 1.26, innerW - 1.44, 0.74, { fill: neutralFill, line: C.border });
    addPanel(slide, innerX + 1.44, innerY + 2.14, innerW - 1.44, 0.62, { fill: C.warm, line: C.warm });
  } else if (mode === "tablet") {
    addPanel(slide, innerX, innerY + 0.56, innerW, 0.5, { fill: accentFill, line: accentFill });
    addPanel(slide, innerX, innerY + 1.2, innerW / 2 - 0.05, 0.74, { fill: neutralFill, line: C.border });
    addPanel(slide, innerX + innerW / 2 + 0.05, innerY + 1.2, innerW / 2 - 0.05, 0.74, { fill: neutralFill, line: C.border });
    addPanel(slide, innerX, innerY + 2.08, innerW, 0.56, { fill: C.warm, line: C.warm });
  } else if (mode === "mobile") {
    const availableH = h - 0.9 - heroH;
    const gap = opts.compact ? 0.14 : 0.18;
    const topBlockH = opts.compact ? 0.34 : 0.46;
    const ctaH = opts.compact ? 0.32 : 0.42;
    const cardH = Math.max(0.42, (availableH - topBlockH - ctaH - gap * 3) / 2);
    let cursorY = innerY + heroH + 0.18;

    addPanel(slide, innerX, cursorY, innerW, topBlockH, { fill: accentFill, line: accentFill });
    cursorY += topBlockH + gap;
    addPanel(slide, innerX, cursorY, innerW, cardH, { fill: neutralFill, line: C.border });
    cursorY += cardH + gap;
    addPanel(slide, innerX, cursorY, innerW, cardH, { fill: neutralFill, line: C.border });
    cursorY += cardH + gap;
    addPanel(slide, innerX, cursorY, innerW, ctaH, { fill: C.red, line: C.red });
  } else if (mode === "rigid") {
    addPanel(slide, innerX, innerY + 0.56, innerW / 3 - 0.08, 0.7, { fill: accentFill, line: accentFill });
    addPanel(slide, innerX + innerW / 3 + 0.02, innerY + 0.56, innerW / 3 - 0.08, 0.7, { fill: neutralFill, line: C.border });
    addPanel(slide, innerX + (innerW / 3) * 2 + 0.04, innerY + 0.56, innerW / 3 - 0.08, 0.7, { fill: neutralFill, line: C.border });
    addPanel(slide, innerX, innerY + 1.42, innerW, 0.42, { fill: neutralFill, line: C.border });
    addPanel(slide, innerX, innerY + 2.02, innerW, 0.42, { fill: neutralFill, line: C.border });
    addPanel(slide, innerX + innerW - 0.96, innerY + 2.62, 0.84, 0.34, { fill: C.red, line: C.red });
  }
}

function addIssueCard(slide, x, y, title, body, accent, fill) {
  addMiniCard(slide, SH, {
    x,
    y,
    w: 2.38,
    h: 0.96,
    title,
    body,
    accent,
    fill,
    line: fill,
    titleFontSize: 12.6,
    bodyFontSize: 9.2,
  });
}

function addPriorityStack(slide, x, y, w, h) {
  addPanel(slide, x, y, w, h, { fill: C.white, line: C.border });
  slide.addText("Orden de lectura cuando el espacio se reduce", {
    x: x + 0.22,
    y: y + 0.18,
    w: w - 0.44,
    h: 0.16,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.2,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  const rows = [
    { title: "1. Lo principal", body: "CTA, mensaje central y acción visible.", fill: C.paleRed, accent: C.red },
    { title: "2. Lo que acompaña", body: "Contexto, apoyo y bloques secundarios.", fill: C.softBlue, accent: C.navy },
    { title: "3. Lo que puede bajar", body: "Detalle, decorativos y apoyo tardío.", fill: C.warm, accent: C.gold },
  ];
  rows.forEach((row, index) => {
    addCard(slide, SH, {
      x: x + 0.18,
      y: y + 0.62 + index * 0.92,
      w: w - 0.36,
      h: 0.78,
      title: row.title,
      body: row.body,
      fill: row.fill,
      line: row.fill,
      accent: row.accent,
      titleFontSize: 13,
      bodyFontSize: 9.6,
      bodyYOffset: 0.38,
    });
  });
}

function addComponentCanvas(slide, x, y, w, h, opts = {}) {
  const mode = opts.mode || "card";
  const accent = opts.accent || C.navy;
  const accentFill = opts.accentFill || C.softBlue;
  const title = opts.title || "Componente";

  addPanel(slide, x, y, w, h, { fill: C.white, line: C.border });
  slide.addShape(SH.roundRect, {
    x,
    y,
    w: 0.12,
    h,
    rectRadius: 0.03,
    fill: { color: accent },
    line: { color: accent },
  });
  slide.addText(title, {
    x: x + 0.24,
    y: y + 0.16,
    w: w - 0.48,
    h: 0.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.6,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  const innerX = x + 0.24;
  const innerY = y + 0.56;
  const innerW = w - 0.48;
  const innerH = h - 0.82;

  if (mode === "button") {
    slide.addShape(SH.roundRect, {
      x: innerX + 0.26,
      y: innerY + 0.66,
      w: innerW - 0.52,
      h: 0.54,
      rectRadius: 0.08,
      fill: { color: accent },
      line: { color: accent },
    });
    slide.addText(opts.cta || "Acción principal", {
      x: innerX + 0.42,
      y: innerY + 0.83,
      w: innerW - 0.84,
      h: 0.14,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.2,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
      fit: "shrink",
    });
    slide.addShape(SH.roundRect, {
      x: innerX + 0.26,
      y: innerY + 1.38,
      w: innerW - 0.52,
      h: 0.24,
      rectRadius: 0.05,
      fill: { color: accentFill },
      line: { color: accentFill },
    });
  } else if (mode === "navbar") {
    [0, 1, 2, 3].forEach((tabIndex) => {
      slide.addShape(SH.roundRect, {
        x: innerX + tabIndex * ((innerW - 0.18) / 4),
        y: innerY + 0.12,
        w: (innerW - 0.3) / 4,
        h: 0.28,
        rectRadius: 0.03,
        fill: { color: tabIndex === 0 ? accent : C.white },
        line: { color: tabIndex === 0 ? accent : C.border, pt: 1 },
      });
    });
    slide.addShape(SH.roundRect, {
      x: innerX,
      y: innerY + 0.62,
      w: innerW,
      h: 0.6,
      rectRadius: 0.04,
      fill: { color: accentFill },
      line: { color: accentFill },
    });
    slide.addShape(SH.roundRect, {
      x: innerX,
      y: innerY + 1.36,
      w: innerW,
      h: 0.44,
      rectRadius: 0.04,
      fill: { color: C.white },
      line: { color: C.border, pt: 1 },
    });
  } else {
    slide.addShape(SH.roundRect, {
      x: innerX,
      y: innerY,
      w: innerW,
      h: 0.38,
      rectRadius: 0.04,
      fill: { color: accent },
      line: { color: accent },
    });
    slide.addShape(SH.roundRect, {
      x: innerX,
      y: innerY + 0.56,
      w: innerW,
      h: 0.98,
      rectRadius: 0.04,
      fill: { color: C.white },
      line: { color: C.border, pt: 1 },
    });
    slide.addShape(SH.roundRect, {
      x: innerX,
      y: innerY + 1.72,
      w: innerW * 0.44,
      h: 0.28,
      rectRadius: 0.04,
      fill: { color: accentFill },
      line: { color: accentFill },
    });
    slide.addShape(SH.roundRect, {
      x: innerX + innerW - 1.06,
      y: innerY + 1.64,
      w: 0.92,
      h: 0.44,
      rectRadius: 0.05,
      fill: { color: accent },
      line: { color: accent },
    });
  }

  if (opts.footer) {
    slide.addText(opts.footer, {
      x: x + 0.2,
      y: y + h - 0.18,
      w: w - 0.4,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.6,
      color: C.slate,
      align: "center",
      margin: 0,
    });
  }
}

function createCoverSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  slide.addImage({
    path: logoPath,
    ...imageSizingContain(logoPath, 9.58, 0.86, 3.02, 1.36),
  });
  slide.addText("Clase 05 · Semana 02", {
    x: 2.04,
    y: 1.46,
    w: 2.9,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addBarsMotif(slide, 1.04, 1.18, 1.28, C.red);
  slide.addText("Diseñar para\npantallas reales", {
    x: 1.04,
    y: 1.94,
    w: 4.64,
    h: 1.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 26,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Responsive, viewport y reordenamiento con criterio", {
    x: 1.04,
    y: 3.38,
    w: 5.16,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.6,
    color: C.sand,
    margin: 0,
  });
  slide.addText("Una interfaz no vive en una sola pantalla: cambia de lectura cuando cambia el espacio.", {
    x: 1.04,
    y: 4.08,
    w: 5.18,
    h: 0.54,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13.2,
    color: "DCE6F2",
    margin: 0,
  });

  addBrowserScene(slide, 6.42, 2.16, 5.02, 3.5, {
    url: "https://demo.local/landing",
    mode: "desktop",
    hero: "Vista amplia",
    accent: C.red,
    accentFill: C.paleRed,
  });
  addBrowserScene(slide, 9.86, 3.06, 1.86, 2.88, {
    url: "m.demo.local",
    mode: "mobile",
    hero: "Móvil",
    compact: true,
    accent: C.navy,
    accentFill: C.softBlue,
  });

  addCard(slide, SH, {
    x: 1.04,
    y: 5.7,
    w: 2.78,
    h: 0.86,
    title: "Martes 24 de marzo de 2026",
    body: "10:50 - 13:10",
    fill: C.titleFill,
    line: C.titleFill,
    accent: C.red,
    titleColor: C.white,
    bodyColor: C.white,
    titleFontSize: 11.2,
    bodyFontSize: 11.4,
    bodyYOffset: 0.42,
  });
  addCenterStatement(slide, SH, "El layout también explica.", {
    x: 4.06,
    y: 5.7,
    w: 4.02,
    h: 0.86,
    fill: C.paleRed,
    fontSize: 18,
    color: C.navy,
  });

  validateSlide(slide, pptx);
}

function createBlock4IntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Bloque 4 · Sistemas de diseño y criterio frente a frameworks",
    "Aquí la interfaz deja de verse solo como layout o componente: empieza a leerse también como un sistema de decisiones compartidas.",
    "Bloque 4"
  );

  addPanel(slide, 0.98, 2.34, 3.32, 3.54, { fill: C.navy, line: C.navy });
  addBarsMotif(slide, 1.24, 2.58, 0.86, C.red);
  slide.addText("Diseñar en sistema significa ordenar decisiones antes que estilos sueltos.", {
    x: 1.28,
    y: 3.14,
    w: 2.74,
    h: 1.9,
    fontFace: TYPOGRAPHY.display,
    fontSize: 21.2,
    bold: true,
    color: C.white,
    margin: 0,
    valign: "mid",
  });
  slide.addText("Tokens, reglas, componentes y criterio reducen improvisación y vuelven la interfaz más mantenible.", {
    x: 1.28,
    y: 5.14,
    w: 2.72,
    h: 0.4,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.1,
    color: "E8EEF7",
    margin: 0,
  });
  addPill(slide, SH, "tokens", { x: 1.28, y: 5.56, w: 0.84, fill: C.paleRed, line: C.paleRed, color: C.red });
  addPill(slide, SH, "reglas", { x: 2.24, y: 5.56, w: 0.86, fill: C.softBlue, line: C.softBlue, color: C.navy });
  addPill(slide, SH, "criterio", { x: 3.2, y: 5.56, w: 0.88, fill: C.warm, line: C.warm, color: C.navy });

  addTokenBoard(slide, SH, {
    x: 4.62,
    y: 2.34,
    w: 6.42,
    h: 3.54,
    title: "Lo que empieza a volverse sistema",
    groups: [
      {
        title: "Color",
        tone: C.red,
        items: [
          { label: "--brand", value: "#D62027", swatch: C.red },
          { label: "--text", value: "#102A43", swatch: C.navy },
        ],
      },
      {
        title: "Espacio",
        tone: C.gold,
        items: [
          { label: "--space-sm", value: "8px" },
          { label: "--space-md", value: "16px" },
        ],
      },
      {
        title: "Pieza",
        tone: C.navy,
        fill: C.softBlue,
        items: [
          { label: "card-base", value: "base común" },
          { label: "cta", value: "acción visible" },
        ],
      },
      {
        title: "Regla",
        tone: C.navy,
        items: [
          { label: "uso", value: "zonas de uso" },
          { label: "cambio", value: "límite de cambio" },
        ],
      },
    ],
    footer: "Diseño de sistema = decisiones visibles que otras pantallas pueden volver a usar sin inventar de nuevo.",
  });

  validateSlide(slide, pptx);
}
function createSystemOrdersDecisionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un sistema de diseño intenta ordenar decisiones, no decorar pantallas",
    "La estética importa, pero el verdadero valor aparece cuando la interfaz deja de depender de memoria difusa y empieza a sostener reglas visibles.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 1.02,
    y: 2.42,
    w: 3.32,
    h: 1.18,
    title: "Decisiones base",
    body: "Color, espacio, radio y tono dejan de ser intuición suelta.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 15.2,
    bodyFontSize: 10.4,
    bodyYOffset: 0.44,
  });
  addArrow(slide, 4.56, 2.9, 0.42, 0.28, C.gold);
  addCard(slide, SH, {
    x: 5.08,
    y: 2.42,
    w: 3.32,
    h: 1.18,
    title: "Componentes",
    body: "Las piezas reutilizables heredan reglas, no solo apariencia.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 15.2,
    bodyFontSize: 10.4,
    bodyYOffset: 0.44,
  });
  addArrow(slide, 8.62, 2.9, 0.42, 0.28, C.gold);
  addCard(slide, SH, {
    x: 9.14,
    y: 2.42,
    w: 3.08,
    h: 1.18,
    title: "Pantallas",
    body: "La consistencia deja de depender de copiar y pegar.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 15.2,
    bodyFontSize: 10.2,
    bodyYOffset: 0.44,
  });

  addPanel(slide, 1.04, 4.18, 11.02, 1.54, { fill: C.white, line: C.border });
  addMiniCard(slide, SH, {
    x: 1.26,
    y: 4.46,
    w: 3.2,
    h: 0.9,
    title: "Se vuelve legible",
    body: "cada decisión tiene nombre, función y repetición visible",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, SH, {
    x: 4.9,
    y: 4.46,
    w: 3.2,
    h: 0.9,
    title: "Se vuelve mantenible",
    body: "cambiar una base afecta con menos ruido a toda la interfaz",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
  });
  addMiniCard(slide, SH, {
    x: 8.54,
    y: 4.46,
    w: 3.2,
    h: 0.9,
    title: "Se vuelve predecible",
    body: "el equipo sabe qué piezas comparten lógica y cuáles no",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
  });

  validateSlide(slide, pptx);
}

function createSystemLayersSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Tokens, componentes y reglas compartidas forman una misma capa",
    "Un sistema visual pequeño suele apoyarse en decisiones base, piezas reutilizables y reglas de uso que estabilizan el lenguaje de la interfaz.",
    "Bloque 4"
  );

  addTokenBoard(slide, SH, {
    x: 0.98,
    y: 2.36,
    w: 6.56,
    h: 3.96,
    title: "Tres niveles que empiezan a sostener la interfaz",
    groups: [
      {
        title: "Tokens",
        tone: C.red,
        items: [
          { label: "--brand", value: "#D62027", swatch: C.red },
          { label: "--space-md", value: "16px" },
        ],
      },
      {
        title: "Componentes",
        tone: C.navy,
        fill: C.softBlue,
        items: [
          { label: "card", value: "estructura visible" },
          { label: "button", value: "acción repetible" },
        ],
      },
      {
        title: "Reglas",
        tone: C.gold,
        items: [
          { label: "uso", value: "dónde repite" },
          { label: "variación", value: "qué puede cambiar" },
        ],
      },
    ],
    footer: "Tokens, piezas y reglas ya no viven separados: se apoyan entre sí para sostener consistencia.",
  });

  addComponentTree(slide, SH, {
    x: 7.88,
    y: 2.52,
    w: 3.38,
    h: 2.9,
    title: "Del sistema a la pantalla",
    nodes: [
      { label: "Tokens", depth: 0, meta: "base visual" },
      { label: "Button", depth: 1, meta: "acción" },
      { label: "Card", depth: 1, meta: "pieza" },
      { label: "Screen", depth: 0, meta: "pantalla" },
    ],
  });

  addCard(slide, SH, {
    x: 7.88,
    y: 5.68,
    w: 3.38,
    h: 0.58,
    title: "Sin capa de sistema, cada pantalla termina negociando sus reglas desde cero.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 10.8,
    body: "",
  });

  validateSlide(slide, pptx);
}

function createFrameworkHelpsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un framework puede ayudar, pero no debería reemplazar la comprensión",
    "El problema no es usar apoyo externo, sino dejar de entender el layout, la jerarquía o la lógica visual que se está importando.",
    "Bloque 4"
  );

  addPanel(slide, 1.04, 2.42, 4.54, 4.08, { fill: C.white, line: C.border });
  slide.addText("Acelera una primera versión", {
    x: 1.34,
    y: 2.76,
    w: 3.96,
    h: 0.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18.2,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  addMiniCard(slide, SH, {
    x: 1.28,
    y: 3.14,
    w: 3.94,
    h: 0.82,
    title: "grilla inicial",
    body: "ahorra tiempo cuando el problema todavía es simple",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 12.2,
    bodyFontSize: 8.5,
  });
  addMiniCard(slide, SH, {
    x: 1.28,
    y: 4.1,
    w: 3.94,
    h: 0.82,
    title: "componentes base",
    body: "da piezas listas para explorar una interfaz más rápido",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 12.2,
    bodyFontSize: 8.5,
  });
  addMiniCard(slide, SH, {
    x: 1.28,
    y: 5.06,
    w: 3.94,
    h: 0.82,
    title: "theme inicial",
    body: "ayuda a ordenar color, spacing y variantes tempranas",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 12.2,
    bodyFontSize: 8.5,
  });

  addPanel(slide, 6.08, 2.42, 5.14, 4.08, { fill: C.navy, line: C.navy });
  slide.addText("Pero si nadie entiende la lógica, el sistema se vuelve caja negra.", {
    x: 6.42,
    y: 2.84,
    w: 4.42,
    h: 0.62,
    fontFace: TYPOGRAPHY.display,
    fontSize: 19.2,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addMiniCard(slide, SH, {
    x: 6.44,
    y: 3.78,
    w: 2.48,
    h: 0.84,
    title: "Layout opaco",
    body: "cuesta modificarlo sin romper jerarquía o responsive",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 12.2,
    bodyFontSize: 8.4,
  });
  addMiniCard(slide, SH, {
    x: 6.44,
    y: 4.72,
    w: 2.48,
    h: 0.84,
    title: "Componente ajeno",
    body: "se importa una UI que nadie sabe adaptar con soltura",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
    titleFontSize: 12.2,
    bodyFontSize: 8.4,
  });
  addMiniCard(slide, SH, {
    x: 6.44,
    y: 5.66,
    w: 2.48,
    h: 0.84,
    title: "Rigidez",
    body: "cada pequeño cambio termina peleando contra el framework",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
    titleFontSize: 12.2,
    bodyFontSize: 8.4,
  });

  validateSlide(slide, pptx);
}

function createFrameworkMatrixSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La pregunta útil no es si acelera: es qué decide realmente el equipo",
    "Un framework puede empujar una buena base, pero cada zona de la interfaz sigue exigiendo criterio sobre qué se adopta, qué se adapta y qué se gobierna.",
    "Bloque 4"
  );

  addFrameworkDecisionMatrix(slide, SH, {
    x: 0.94,
    y: 2.34,
    w: 11.1,
    h: 3.98,
    title: "Frameworks con criterio",
    rows: [
      {
        label: "Layout",
        helps: "entrega una primera grilla, utilidades y ritmo base",
        risk: "si se copia sin leer, el responsive queda amarrado al caso feliz",
        decision: "definir qué patrón realmente quedará compartido",
        accent: C.navy,
      },
      {
        label: "Componentes",
        helps: "aporta piezas listas y variantes iniciales",
        risk: "arrastra nombres, estados o UI que no pertenecen al lenguaje propio",
        decision: "adaptar jerarquía, estados y espaciado del equipo",
        accent: C.red,
      },
      {
        label: "Tema",
        helps: "ordena color, spacing y consistencia más rápido",
        risk: "si nadie entiende el theme, se vuelve una caja negra difícil de tocar",
        decision: "documentar tokens mínimos y reglas que sí importan",
        accent: C.gold,
      },
      {
        label: "Gobernanza",
        helps: "da velocidad inicial y reduce decisiones repetidas",
        risk: "puede reemplazar criterio si todo queda heredado por costumbre",
        decision: "mantener visible qué parte del sistema el equipo realmente comprende",
        accent: C.red,
      },
    ],
    footer: "Acelerar no basta: lo importante es si el equipo sigue entendiendo la lógica visual que está sosteniendo.",
  });

  validateSlide(slide, pptx);
}

function createFrameworkUnderstandingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Usar un framework sin entender suele trasladar el problema, no resolverlo",
    "La interfaz puede verse ordenada al principio, pero sin comprensión del sistema luego cuesta adaptar, explicar o mantener casi cualquier decisión.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 1.04,
    y: 2.48,
    w: 2.58,
    h: 1.78,
    title: "Jerarquía",
    body: "se usan componentes bonitos sin saber por qué uno pesa más que otro.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 15,
    bodyFontSize: 10.2,
    bodyYOffset: 0.5,
  });
  addCard(slide, SH, {
    x: 3.98,
    y: 2.48,
    w: 2.58,
    h: 1.78,
    title: "Layout",
    body: "las grillas funcionan mientras nadie se sale del ejemplo ideal.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 15,
    bodyFontSize: 10.2,
    bodyYOffset: 0.5,
  });
  addCard(slide, SH, {
    x: 6.92,
    y: 2.48,
    w: 2.58,
    h: 1.78,
    title: "Responsive",
    body: "se memoriza la clase utilitaria, pero no se lee el quiebre real.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 15,
    bodyFontSize: 9.8,
    bodyYOffset: 0.5,
  });
  addCard(slide, SH, {
    x: 9.86,
    y: 2.48,
    w: 2.04,
    h: 1.78,
    title: "Sistema",
    body: "las reglas quedan implícitas y nadie sabe bien dónde cambian.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
    titleFontSize: 15,
    bodyFontSize: 9.7,
    bodyYOffset: 0.5,
  });

  addCenterStatement(slide, SH, "La deuda no aparece por usar ayuda externa, sino por dejar de entender el problema visual y estructural que esa ayuda está resolviendo.", {
    x: 1.18,
    y: 5.16,
    w: 10.7,
    h: 0.86,
    fill: C.softNeutral,
    fontSize: 17.2,
  });

  validateSlide(slide, pptx);
}

function createDebtVisualSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Rigidizar una interfaz también puede ser deuda técnica visual",
    "La velocidad inicial puede esconder un costo posterior: piezas difíciles de adaptar, responsive incómodo y decisiones que nadie quiere tocar.",
    "Bloque 4"
  );

  addBrowserScene(slide, 1.02, 2.46, 4.42, 3.18, {
    url: "https://ui.demo/dashboard",
    hero: "Versión rígida",
    mode: "rigid",
    accent: C.red,
    accentFill: C.paleRed,
  });
  addArrow(slide, 5.74, 3.86, 0.5, 0.32, C.gold);
  addBrowserScene(slide, 6.52, 2.46, 4.42, 3.18, {
    url: "https://ui.demo/dashboard",
    hero: "Versión gobernada",
    mode: "tablet",
    accent: C.navy,
    accentFill: C.softBlue,
  });

  addIssueCard(slide, 1.06, 5.9, "Rígida", "cada cambio pequeño pelea contra una estructura cerrada", C.red, C.paleRed);
  addIssueCard(slide, 4.96, 5.9, "Gobernada", "la interfaz cambia sin perder lenguaje ni control", C.navy, C.softBlue);
  addIssueCard(slide, 8.86, 5.9, "Sostenible", "la velocidad no reemplaza comprensión ni mantenibilidad", C.gold, C.warm);

  validateSlide(slide, pptx);
}

function createDebtSymptomsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La rigidez del sistema se nota por síntomas bastante concretos",
    "Cuando una interfaz depende demasiado de patrones cerrados, el problema no se ve en una sola pantalla: aparece en la dificultad para cambiar, adaptar y explicar el sistema.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 1.08,
    y: 2.42,
    w: 2.62,
    h: 1.58,
    title: "Cambios mínimos rompen demasiado",
    body: "ajustar una pieza altera otras sin intención clara.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 12.8,
    bodyFontSize: 9.6,
    bodyYOffset: 0.74,
  });
  addCard(slide, SH, {
    x: 4.04,
    y: 2.42,
    w: 2.62,
    h: 1.58,
    title: "El responsive se vuelve incómodo",
    body: "la adaptación ya no nace del contenido, sino de parches para sostener la forma vieja.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 12.7,
    bodyFontSize: 9.3,
    bodyYOffset: 0.74,
  });
  addCard(slide, SH, {
    x: 7,
    y: 2.42,
    w: 2.62,
    h: 1.58,
    title: "Nadie sabe bien dónde tocar",
    body: "el sistema funciona, pero se volvió frágil y opaco.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 12.8,
    bodyFontSize: 9.6,
    bodyYOffset: 0.74,
  });
  addCard(slide, SH, {
    x: 9.96,
    y: 2.42,
    w: 2.04,
    h: 1.58,
    title: "Aparece miedo",
    body: "cada ajuste parece arriesgar más de lo razonable.",
    fill: C.white,
    line: C.border,
    accent: C.navy,
    titleFontSize: 12.6,
    bodyFontSize: 9.2,
    bodyYOffset: 0.72,
  });

  addCenterStatement(slide, SH, "La deuda visual no siempre grita: a veces aparece como una interfaz que todavía funciona, pero ya no se deja entender ni adaptar con soltura.", {
    x: 1.16,
    y: 4.56,
    w: 10.68,
    h: 0.88,
    fill: C.softNeutral,
    fontSize: 17.2,
  });

  addIssueCard(slide, 1.56, 5.82, "Síntoma de fondo", "el equipo heredó reglas, pero no terminó de comprenderlas", C.red, C.paleRed);
  addIssueCard(slide, 5.44, 5.82, "Lectura sana", "hacer explícita la lógica antes de seguir agregando piezas", C.navy, C.softBlue);
  addIssueCard(slide, 9.32, 5.82, "Antídoto", "menos caja negra, más reglas visibles y decisiones documentadas", C.gold, C.warm);

  validateSlide(slide, pptx);
}

function createBetterQuestionSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    'La pregunta útil no es "framework sí o no", sino "qué entiendo realmente de esta interfaz"',
    "La discusión madura no pasa por pureza tecnológica, sino por si el equipo comprende la lógica espacial, visual y estructural que está sosteniendo.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 1.04,
    y: 2.4,
    w: 4.98,
    h: 3.04,
    title: "Pregunta pobre",
    body: '"¿estamos usando framework o no?"\n\nSe queda en la herramienta y pierde de vista el problema visual, la jerarquía, el layout y la mantenibilidad real.',
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 17.4,
    bodyFontSize: 11,
    bodyYOffset: 0.54,
  });
  addCard(slide, SH, {
    x: 6.3,
    y: 2.4,
    w: 4.98,
    h: 3.04,
    title: "Pregunta útil",
    body: '"¿entiendo la lógica visual y estructural de lo que estoy usando?"\n\nEso sí permite decidir qué adoptar, qué adaptar y qué conviene volver sistema propio.',
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 17.4,
    bodyFontSize: 11,
    bodyYOffset: 0.54,
  });

  addCenterStatement(slide, SH, "Marco sano: usar ayuda externa está bien si no reemplaza lectura, criterio ni comprensión del sistema.", {
    x: 1.36,
    y: 5.72,
    w: 9.9,
    h: 0.74,
    fill: C.warm,
    fontSize: 17.2,
  });

  validateSlide(slide, pptx);
}

function createBlock4AgenticSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Agentes, sistema visual y gobernanza no son la misma cosa",
    "Un agente puede ayudar a proponer estructura, detectar repetición o sugerir tokens, pero la decisión de qué entra al sistema sigue siendo una responsabilidad humana.",
    "Bloque 4"
  );

  addDelegationSplit(slide, SH, {
    x: 0.96,
    y: 2.38,
    w: 11.06,
    h: 3.96,
    title: "Qué puede acelerar un agente y qué no conviene delegar",
    left: {
      title: "Puede ayudar con",
      subtitle: "exploración y primeras propuestas",
      items: [
        "comparar dónde una familia perdió consistencia",
        "sugerir tokens o nombres iniciales",
        "proponer primeras variantes de un componente",
        "detectar repeticiones que ya parecen patrón",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene delegar",
      subtitle: "gobernanza del sistema",
      items: [
        "decidir qué pieza ya pertenece al lenguaje visual",
        "dar por bueno un patrón solo porque se ve moderno",
        "aceptar rigidez sin revisar mantenibilidad",
        "aprobar un framework sin entender su lógica base",
      ],
      accent: C.red,
      fill: C.white,
    },
    bridgeLabel: "Criterio visual",
    bridgeBody: "La decisión se consolida cuando resiste contexto real, variantes, responsive y lectura del equipo.",
    footer: "El agente propone más rápido. La gobernanza del sistema sigue necesitando intención y revisión.",
  });

  validateSlide(slide, pptx);
}

function createSpecDrivenVisualSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Gobernar un sistema visual también se parece a un flujo spec-driven",
    "Cuando una decisión pasa a ser parte del sistema, ya no basta con que funcione una vez: conviene explicitar intención, restricción, tarea y validación antes de consolidarla.",
    "Bloque 4"
  );

  addSpecWorkflow(slide, SH, {
    x: 0.96,
    y: 2.36,
    w: 11.02,
    h: 3.98,
    title: "Cómo madura una decisión visual compartida",
    phases: [
      {
        step: "1",
        title: "Intención",
        question: "¿Qué problema visual o de consistencia queremos resolver?",
        artifact: "caso repetido, dolor real, patrón a estabilizar",
        control: "claridad del problema",
        accent: C.red,
        fill: C.paleRed,
      },
      {
        step: "2",
        title: "Regla",
        question: "¿Qué base conviene volver visible?",
        artifact: "token, variante, guideline o restricción",
        control: "coherencia del lenguaje",
        accent: C.navy,
        fill: C.softBlue,
      },
      {
        step: "3",
        title: "Prueba",
        question: "¿Resiste más de una pantalla o viewport?",
        artifact: "comparación en contexto real",
        control: "adaptación y lectura",
        accent: C.gold,
        fill: C.warm,
      },
      {
        step: "4",
        title: "Consolida",
        question: "¿Vale la pena volverlo sistema?",
        artifact: "documentación mínima y decisión compartida",
        control: "mantenibilidad",
        accent: C.red,
        fill: C.white,
      },
    ],
    footer: "Cuando una regla entra al sistema, ya no se evalúa por gusto: se evalúa por claridad, consistencia y sostenibilidad.",
  });

  validateSlide(slide, pptx);
}

function createBlock4QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas para cerrar el bloque",
    "Si la interfaz ya se leyó como sistema, las preguntas útiles apuntan a decisiones compartidas, gobernanza y comprensión real del framework o patrón usado.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 1.08,
    y: 2.46,
    w: 3.18,
    h: 1.66,
    title: "1. Sistema",
    body: '¿Qué intenta resolver realmente un sistema de diseño además de "hacer que se vea parecido"?',
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 14.4,
    bodyFontSize: 10.2,
    bodyYOffset: 0.54,
  });
  addCard(slide, SH, {
    x: 5.08,
    y: 2.46,
    w: 3.18,
    h: 1.66,
    title: "2. Framework",
    body: "¿Qué riesgo aparece cuando una interfaz depende de estructuras que aceleran mucho, pero que nadie entiende bien?",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14.4,
    bodyFontSize: 10.1,
    bodyYOffset: 0.54,
  });
  addCard(slide, SH, {
    x: 9.08,
    y: 2.46,
    w: 3.18,
    h: 1.66,
    title: "3. Gobernanza",
    body: "¿Qué parte de una propuesta de agente o framework siempre conviene validar antes de volverla sistema?",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 14.4,
    bodyFontSize: 10.1,
    bodyYOffset: 0.54,
  });

  addCenterStatement(slide, SH, "Sistema útil = decisiones visibles, piezas coherentes y criterio suficiente para no heredar caja negra.", {
    x: 1.24,
    y: 5.34,
    w: 10.7,
    h: 0.76,
    fill: C.softNeutral,
    fontSize: 17.2,
  });

  validateSlide(slide, pptx);
}

function createBlock4ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del bloque",
    "Un sistema de diseño agrega valor real cuando ordena decisiones visuales y componentes sin convertir el trabajo en dependencia ciega de una herramienta o framework.",
    "Bloque 4"
  );

  addPanel(slide, 1.02, 2.4, 6.26, 2.16, { fill: C.white, line: C.border });
  slide.addText("Sistema visual sano = tokens, componentes y reglas compartidas que el equipo entiende, adapta y mantiene con criterio.", {
    x: 1.36,
    y: 2.88,
    w: 5.58,
    h: 0.82,
    fontFace: TYPOGRAPHY.display,
    fontSize: 20,
    bold: true,
    color: C.navy,
    align: "center",
    valign: "mid",
    margin: 0,
  });
  addPill(slide, SH, "token", { x: 1.44, y: 4.04, w: 0.82, fill: C.paleRed, line: C.paleRed, color: C.red });
  addPill(slide, SH, "componente", { x: 2.48, y: 4.04, w: 1.16, fill: C.softBlue, line: C.softBlue, color: C.navy });
  addPill(slide, SH, "regla", { x: 3.86, y: 4.04, w: 0.8, fill: C.warm, line: C.warm, color: C.navy });
  addPill(slide, SH, "criterio", { x: 4.88, y: 4.04, w: 0.92, fill: C.white, line: C.border, color: C.navy });

  addCard(slide, SH, {
    x: 7.72,
    y: 2.4,
    w: 3.58,
    h: 2.16,
    title: "Puente al cierre de clase",
    body: "Ya no estamos hablando de pantallas aisladas: responsive, componentes y sistema visual forman una misma lectura profesional de la interfaz.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16,
    bodyFontSize: 10.4,
    bodyYOffset: 0.54,
  });

  addCenterStatement(slide, SH, "Responsive + componentes + sistema = interfaz más razonable y menos dependiente de soluciones rígidas.", {
    x: 1.22,
    y: 5.42,
    w: 10.2,
    h: 0.72,
    fill: C.warm,
    fontSize: 17,
  });

  validateSlide(slide, pptx);
}

function createClassClosingIntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre de la clase",
    "La progresión de hoy fue movernos desde la pantalla fija hacia una lectura más madura: responsive, layout, componentes y sistema visual como una misma forma de diseñar.",
    "Cierre"
  );

  addMapBlock(slide, 0.96, 2.56, 2.34, 2.48, {
    kicker: "Bloque 1",
    title: "Pantallas reales",
    fill: C.paleRed,
    line: C.paleRed,
    kickerColor: C.white,
    color: C.navy,
  });
  addArrow(slide, 3.4, 3.72, 0.34, 0.24, C.gold);
  addMapBlock(slide, 3.86, 2.56, 2.34, 2.48, {
    kicker: "Bloque 2",
    title: "Viewport y layout",
    fill: C.softBlue,
    line: C.softBlue,
    color: C.navy,
  });
  addArrow(slide, 6.3, 3.72, 0.34, 0.24, C.gold);
  addMapBlock(slide, 6.76, 2.56, 2.34, 2.48, {
    kicker: "Bloque 3",
    title: "Componentes",
    fill: C.warm,
    line: C.warm,
    color: C.navy,
  });
  addArrow(slide, 9.2, 3.72, 0.34, 0.24, C.gold);
  addMapBlock(slide, 9.66, 2.56, 2.34, 2.48, {
    kicker: "Bloque 4",
    title: "Sistema visual",
    fill: C.white,
    line: C.border,
    color: C.navy,
  });

  addCenterStatement(slide, SH, "La clase no trató cuatro temas separados: trató cómo una interfaz deja de improvisarse y empieza a gobernarse con criterio.", {
    x: 1.12,
    y: 5.56,
    w: 10.86,
    h: 0.72,
    fill: C.softNeutral,
    fontSize: 17.4,
  });

  validateSlide(slide, pptx);
}

function createClassThreadSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El hilo central de la clase fue este",
    "La interfaz madura cuando deja de defender una sola maqueta y empieza a responder a contexto, piezas reutilizables y decisiones compartidas.",
    "Cierre"
  );

  addCenterStatement(slide, SH, "Pantalla fija -> viewport real -> layout con criterio -> componente reutilizable -> mini sistema visual", {
    x: 1.1,
    y: 2.72,
    w: 10.84,
    h: 1.02,
    fill: C.white,
    line: C.border,
    fontSize: 22,
  });

  addIssueCard(slide, 1.24, 4.58, "Responsive", "diseñar para contexto y no para una sola captura", C.red, C.paleRed);
  addIssueCard(slide, 5.02, 4.58, "Componentes", "compartir piezas, variantes y estados con lógica", C.navy, C.softBlue);
  addIssueCard(slide, 8.8, 4.58, "Sistema", "volver visibles las decisiones que otras pantallas heredarán", C.gold, C.warm);

  validateSlide(slide, pptx);
}

function createResponsiveTakeawaySlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Idea instalada 1 · responsive no es achicar una pantalla",
    "La adaptación no consiste en defender la composición vieja: consiste en reorganizar foco, orden y aire cuando cambia el espacio.",
    "Cierre"
  );

  addBrowserScene(slide, 1.04, 2.4, 3.86, 2.84, {
    url: "https://demo.local/news",
    hero: "Versión amplia",
    mode: "desktop",
  });
  addArrow(slide, 5.14, 3.62, 0.44, 0.28, C.gold);
  addBrowserScene(slide, 5.82, 2.48, 2.12, 2.7, {
    url: "m.demo.local/news",
    hero: "Móvil",
    mode: "mobile",
  });

  addCard(slide, SH, {
    x: 8.46,
    y: 2.44,
    w: 3.18,
    h: 2.74,
    title: "Lo que siempre conviene mirar",
    body: "lectura principal, foco del CTA, orden de bloques, aire útil y claridad en viewport real.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16.2,
    bodyFontSize: 10.6,
    bodyYOffset: 0.56,
  });

  addCenterStatement(slide, SH, "Responsive sano = la interfaz cambia de relación sin perder sentido.", {
    x: 1.44,
    y: 5.74,
    w: 10.08,
    h: 0.62,
    fill: C.warm,
    fontSize: 16.4,
  });

  validateSlide(slide, pptx);
}

function createComponentTakeawaySlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Idea instalada 2 · una interfaz madura se compone con piezas reutilizables",
    "Cuando una pieza se repite, deja de ser caso único y empieza a exigir nombre, variante, estado y una lógica que sobreviva a más de una pantalla.",
    "Cierre"
  );

  addComponentVariantBoard(slide, SH, {
    x: 0.98,
    y: 2.34,
    w: 7.22,
    h: 3.9,
    title: "De pieza suelta a familia utilizable",
    variants: [
      { label: "Base", role: "default", description: "fija el patrón común", accent: C.navy, fill: C.softBlue },
      { label: "Destacada", role: "feature", description: "sube foco sin romper familia", accent: C.red, fill: C.paleRed },
      { label: "Compacta", role: "compact", description: "reduce aire con la misma lógica", accent: C.gold, fill: C.warm, preview: "stack" },
      { label: "Acción", role: "cta", description: "mantiene identidad y respuesta visible", accent: C.navy, fill: C.white, preview: "button", ctaLabel: "Explorar" },
    ],
    footer: "Componente útil = pieza que puede repetirse, variar y seguir perteneciendo al mismo lenguaje.",
  });

  addCard(slide, SH, {
    x: 8.56,
    y: 2.52,
    w: 2.96,
    h: 1.06,
    title: "comparte estructura",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 12.8,
    body: "",
  });
  addCard(slide, SH, {
    x: 8.56,
    y: 3.84,
    w: 2.96,
    h: 1.06,
    title: "comparte estados",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 12.8,
    body: "",
  });
  addCard(slide, SH, {
    x: 8.56,
    y: 5.16,
    w: 2.96,
    h: 1.06,
    title: "comparte criterio",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 12.8,
    body: "",
  });

  validateSlide(slide, pptx);
}

function createMapSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Mapa de la clase",
    "Hoy la interfaz se mira como sistema adaptable: pantalla, viewport, componentes y criterio de diseño.",
    "Bloque 1"
  );

  const y = 2.28;
  addMapBlock(slide, 0.82, y, 2.82, 2.9, {
    kicker: "Bloque 1",
    title: "Pantallas\nreales y\nresponsive",
    fill: C.red,
    line: C.red,
    color: C.white,
    kickerColor: C.white,
  });
  addArrow(slide, 3.74, y + 1.4, 0.32, 0.32, C.gold);
  addMapBlock(slide, 4.12, y, 2.82, 2.9, {
    kicker: "Bloque 2",
    title: "Viewport,\nadaptación\ny layout",
    fill: C.white,
  });
  addArrow(slide, 7.06, y + 1.4, 0.32, 0.32, C.gold);
  addMapBlock(slide, 7.44, y, 2.82, 2.9, {
    kicker: "Bloque 3",
    title: "Componentes\ny consistencia",
    fill: C.warm,
    line: C.warm,
  });
  addArrow(slide, 10.38, y + 1.4, 0.32, 0.32, C.gold);
  addMapBlock(slide, 10.76, y, 1.94, 2.9, {
    kicker: "Bloque 4",
    title: "Sistema y\nframeworks",
    fill: C.softBlue,
    line: C.softBlue,
    fontSize: 17,
  });

  addCenterStatement(slide, SH, "Pantallas reales -> reflow -> patrones -> sistema visual", {
    x: 1.48,
    y: 5.98,
    w: 10.16,
    h: 0.56,
    fill: C.warm,
    fontSize: 17.5,
  });

  validateSlide(slide, pptx);
}

function createBlockIntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Bloque 1 · CSS y responsive empiezan en la pantalla real",
    "La idea central es simple: una interfaz web no vive en una sola resolución, sino bajo cambio de espacio.",
    "Bloque 1"
  );

  addPanel(slide, 0.9, 2.32, 3.76, 3.58, { fill: C.navy, line: C.navy });
  addBarsMotif(slide, 1.18, 2.66, 0.9, C.red);
  slide.addText("Una interfaz\nno es una\ncaptura fija.", {
    x: 1.18,
    y: 3.3,
    w: 2.7,
    h: 1.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 23.5,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addPill(slide, SH, "viewport", { x: 1.18, y: 5.18, w: 1.12, fill: C.paleRed, line: C.paleRed, color: C.red });
  addPill(slide, SH, "jerarquía", { x: 2.4, y: 5.18, w: 1.2, fill: C.softBlue, line: C.softBlue, color: C.navy });
  addPill(slide, SH, "espacio", { x: 1.18, y: 5.54, w: 1.12, fill: C.white, line: C.border, color: C.navy });
  addPill(slide, SH, "reflow", { x: 2.4, y: 5.54, w: 1.2, fill: C.warm, line: C.warm, color: C.navy });

  addBrowserScene(slide, 5.06, 2.44, 3.04, 3.04, {
    url: "https://demo.local/cards",
    mode: "rigid",
    hero: "Maqueta fija",
    accent: C.navy,
    accentFill: C.softBlue,
  });
  addBrowserScene(slide, 8.62, 2.44, 3.04, 3.04, {
    url: "m.demo.local/cards",
    mode: "mobile",
    hero: "Misma interfaz, otro espacio",
    accent: C.red,
    accentFill: C.paleRed,
  });

  addMiniCard(slide, SH, {
    x: 5.06,
    y: 5.82,
    w: 2.82,
    h: 0.9,
    title: "Rígido",
    body: "solo se ve bien cuando el ancho coincide con la maqueta.",
    fill: C.white,
    accent: C.navy,
  });
  addMiniCard(slide, SH, {
    x: 8.84,
    y: 5.82,
    w: 2.82,
    h: 0.9,
    title: "Adaptable",
    body: "reordena relación, foco y aire cuando cambia el viewport.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
  });

  validateSlide(slide, pptx);
}

function createSingleScreenSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Una misma interfaz puede vivirse distinto según el ancho",
    "La pregunta útil ya no es cómo se ve una pantalla, sino cómo cambia la lectura cuando cambia el espacio.",
    "Bloque 1"
  );

  addResponsiveViewportCompare(slide, SH, {
    x: 0.94,
    y: 2.36,
    w: 7.36,
    h: 3.98,
    title: "La misma página en dos contextos",
    left: {
      label: "Móvil",
      sizeLabel: "390 px",
      notes: ["una columna", "más foco", "CTA primero"],
    },
    right: {
      label: "Desktop",
      sizeLabel: "1280 px",
      notes: ["más contexto", "lectura lateral", "bloques simultáneos"],
    },
  });

  addCard(slide, SH, {
    x: 8.64,
    y: 2.46,
    w: 3.02,
    h: 1.1,
    title: "Pantalla real",
    body: "notebook, monitor, tablet, teléfono o ventana reducida dentro del navegador.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14.2,
    bodyFontSize: 9.6,
    bodyYOffset: 0.42,
  });
  addCard(slide, SH, {
    x: 8.64,
    y: 3.78,
    w: 3.02,
    h: 1.1,
    title: "No es una foto",
    body: "la interfaz tiene que conservar claridad aunque cambie el contenedor.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 14.2,
    bodyFontSize: 9.6,
    bodyYOffset: 0.42,
  });
  addCard(slide, SH, {
    x: 8.64,
    y: 5.1,
    w: 3.02,
    h: 1.1,
    title: "Lectura técnica",
    body: "lo importante no es si cabe, sino si sigue siendo legible y razonable de usar.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 14.2,
    bodyFontSize: 9.4,
    bodyYOffset: 0.42,
  });

  validateSlide(slide, pptx);
}

function createNotShrinkSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Responsive no es achicar todo: es reorganizar con intención",
    "Cambiar de contexto obliga a decidir qué sube, qué baja y qué necesita más aire para seguir comunicando bien.",
    "Bloque 1"
  );

  addBrowserScene(slide, 0.94, 2.38, 4.86, 3.5, {
    url: "https://demo.local/home",
    mode: "desktop",
    hero: "Composición amplia",
    accent: C.navy,
    accentFill: C.softBlue,
  });
  addCard(slide, SH, {
    x: 1.08,
    y: 5.98,
    w: 4.58,
    h: 0.58,
    title: "Copiar la forma no basta",
    body: "",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 16.2,
  });

  addArrow(slide, 6.06, 3.9, 0.52, 0.44, C.gold);

  addBrowserScene(slide, 6.74, 2.66, 1.92, 3.22, {
    url: "m.demo.local/home",
    mode: "mobile",
    hero: "Versión móvil",
    compact: true,
    accent: C.red,
    accentFill: C.paleRed,
  });
  addCard(slide, SH, {
    x: 8.92,
    y: 2.46,
    w: 2.88,
    h: 1.02,
    title: "Se reordena",
    body: "la acción principal sube y el contenido lateral baja.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 13.6,
    bodyFontSize: 9.2,
    bodyYOffset: 0.42,
  });
  addCard(slide, SH, {
    x: 8.92,
    y: 3.7,
    w: 2.88,
    h: 1.02,
    title: "Se simplifica",
    body: "la interfaz deja de defender columnas que ya no ayudan a leer.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13.6,
    bodyFontSize: 9.2,
    bodyYOffset: 0.42,
  });
  addCard(slide, SH, {
    x: 8.92,
    y: 4.94,
    w: 2.88,
    h: 1.02,
    title: "Se protege el foco",
    body: "responsive cuida experiencia, no simetría rígida.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 13.6,
    bodyFontSize: 9.2,
    bodyYOffset: 0.42,
  });

  validateSlide(slide, pptx);
}

function createReflowSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La misma interfaz puede reacomodarse sin perder sentido",
    "Responsive se entiende mejor cuando se ve el reflow: cambia el orden, no solo la escala.",
    "Bloque 1"
  );

  addResponsiveReflowPanel(slide, SH, {
    x: 0.92,
    y: 2.32,
    w: 7.48,
    h: 4.18,
    title: "Reflow de una misma interfaz",
    footer: "El espacio deja de ser accidente y se vuelve condición de diseño.",
    stages: [
      {
        label: "Desktop",
        sizeLabel: "1280 px",
        behavior: "sidebar y contenido simultáneo",
        layout: "desktop",
        tone: C.navy,
        toneFill: C.softBlue,
      },
      {
        label: "Tablet",
        sizeLabel: "820 px",
        behavior: "las piezas se acercan y cambian de ritmo",
        layout: "tablet",
        tone: C.gold,
        toneFill: C.warm,
      },
      {
        label: "Móvil",
        sizeLabel: "390 px",
        behavior: "una columna con prioridad clara",
        layout: "mobile",
        tone: C.red,
        toneFill: C.paleRed,
      },
    ],
  });

  addCard(slide, SH, {
    x: 8.72,
    y: 2.5,
    w: 2.92,
    h: 1.16,
    title: "No es deformar",
    body: "reflow significa cambiar relaciones para conservar claridad.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13.8,
    bodyFontSize: 9.4,
    bodyYOffset: 0.42,
  });
  addCard(slide, SH, {
    x: 8.72,
    y: 3.92,
    w: 2.92,
    h: 1.16,
    title: "Cambia la jerarquía",
    body: "lo que antes era lateral puede pasar a una secuencia vertical.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 13.8,
    bodyFontSize: 9.4,
    bodyYOffset: 0.42,
  });
  addCard(slide, SH, {
    x: 8.72,
    y: 5.34,
    w: 2.92,
    h: 1.0,
    title: "Lo que importa",
    body: "seguir entendiendo la interfaz sin depender del ancho ideal.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 13.6,
    bodyFontSize: 9.2,
    bodyYOffset: 0.4,
  });

  validateSlide(slide, pptx);
}

function createViewportSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El viewport cambia proporción, densidad y orden de lectura",
    "Cuando cambia el área visible, cambian también el ritmo visual y la relación entre bloques.",
    "Bloque 1"
  );

  addBrowserScene(slide, 0.92, 2.34, 6.02, 3.86, {
    url: "https://demo.local/dashboard",
    mode: "desktop",
    hero: "El mismo contenido en espacio amplio",
    accent: C.navy,
    accentFill: C.softBlue,
  });

  addPriorityStack(slide, 7.22, 2.42, 4.42, 3.76);

  addCenterStatement(slide, SH, "Pensar viewport antes que breakpoint obliga a leer comportamiento, no solo números.", {
    x: 1.08,
    y: 6.02,
    w: 10.6,
    h: 0.54,
    fill: C.softNeutral,
    fontSize: 16.4,
  });

  validateSlide(slide, pptx);
}

function createRigidProblemsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un layout fijo suele esconder problemas que después explotan",
    "Mientras el ancho coincide con la maqueta, todo parece ordenado. El problema aparece cuando el contexto cambia.",
    "Bloque 1"
  );

  addBrowserScene(slide, 4.28, 2.54, 4.76, 3.36, {
    url: "https://demo.local/rigid",
    mode: "rigid",
    hero: "Diseño rígido",
    accent: C.navy,
    accentFill: C.softBlue,
  });

  addIssueCard(slide, 0.92, 2.54, "Texto apretado", "el contenido cabe, pero ya no respira.", C.red, C.paleRed);
  addIssueCard(slide, 0.92, 3.72, "Navegación incómoda", "el menú sigue horizontal aunque ya no lo soporte.", C.navy, C.softBlue);
  addIssueCard(slide, 9.42, 2.54, "Cards sin aire", "se conservan columnas que vuelven la lectura pesada.", C.gold, C.warm);
  addIssueCard(slide, 9.42, 3.72, "CTA debilitado", "la acción principal pierde jerarquía dentro del ruido.", C.red, C.white);

  addCenterStatement(slide, SH, "Responsive no es un extra visual: es parte central de pensar bien la interfaz.", {
    x: 1.36,
    y: 6.02,
    w: 10.52,
    h: 0.5,
    fill: C.warm,
    fontSize: 16,
  });

  validateSlide(slide, pptx);
}

function createPrioritySlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cuando el espacio baja, no todo debería pesar igual",
    "Responsive obliga a decidir qué abre la lectura, qué acompaña y qué puede moverse sin dañar la experiencia.",
    "Bloque 1"
  );

  addPriorityStack(slide, 0.92, 2.42, 4.32, 3.96);
  addArrow(slide, 5.42, 4.0, 0.46, 0.38, C.gold);
  addBrowserScene(slide, 6.04, 2.42, 2.04, 3.62, {
    url: "m.demo.local/priority",
    mode: "mobile",
    hero: "Prioridad visible",
    compact: true,
    accent: C.red,
    accentFill: C.paleRed,
  });

  addCard(slide, SH, {
    x: 8.56,
    y: 2.56,
    w: 3.08,
    h: 1.08,
    title: "Abrir la lectura",
    body: "el mensaje principal debe aparecer sin competir con lo secundario.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 13.8,
    bodyFontSize: 9.2,
    bodyYOffset: 0.42,
  });
  addCard(slide, SH, {
    x: 8.56,
    y: 3.86,
    w: 3.08,
    h: 1.08,
    title: "Mover no es perder",
    body: "un bloque puede bajar de lugar y seguir cumpliendo su función mejor.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13.8,
    bodyFontSize: 9.2,
    bodyYOffset: 0.42,
  });
  addCard(slide, SH, {
    x: 8.56,
    y: 5.16,
    w: 3.08,
    h: 1.08,
    title: "Mostrar lo correcto",
    body: "el objetivo no es mostrar todo, sino sostener claridad e interacción.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 13.8,
    bodyFontSize: 9.1,
    bodyYOffset: 0.42,
  });

  validateSlide(slide, pptx);
}

function createValidationSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La adaptación se valida mirando comportamiento real",
    "Responsive no se da por bueno en el papel: se confirma en viewport, navegador y lectura efectiva de la pantalla.",
    "Bloque 1"
  );

  addBrowserScene(slide, 0.96, 2.36, 4.96, 3.9, {
    url: "https://demo.local/review",
    mode: "tablet",
    hero: "Probar en pantalla real",
    accent: C.navy,
    accentFill: C.softBlue,
  });

  addCard(slide, SH, {
    x: 6.22,
    y: 2.44,
    w: 2.34,
    h: 1.02,
    title: "Mirar el viewport",
    body: "qué se aprieta, qué gana foco y qué relación ya no funciona.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13,
    bodyFontSize: 9,
    bodyYOffset: 0.42,
  });
  addCard(slide, SH, {
    x: 6.22,
    y: 3.68,
    w: 2.34,
    h: 1.02,
    title: "Leer la jerarquía",
    body: "si el ojo ya no sabe dónde entrar, el reflow no resolvió el problema.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 13,
    bodyFontSize: 9,
    bodyYOffset: 0.42,
  });
  addCard(slide, SH, {
    x: 6.22,
    y: 4.92,
    w: 2.34,
    h: 1.02,
    title: "Verificar la acción",
    body: "el CTA y la interacción principal deben seguir siendo obvios.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 13,
    bodyFontSize: 9,
    bodyYOffset: 0.42,
  });

  addPanel(slide, 8.86, 2.36, 2.84, 3.9, { fill: C.white, line: C.border });
  slide.addText("Checklist mínima", {
    x: 9.12,
    y: 2.56,
    w: 2.26,
    h: 0.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.8,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  [
    "¿el texto sigue respirando?",
    "¿la navegación todavía se entiende?",
    "¿el orden visual ayuda?",
    "¿la acción principal sigue visible?",
    "¿el cambio mejora o solo acomoda?",
  ].forEach((item, index) => {
    slide.addShape(SH.roundRect, {
      x: 9.12,
      y: 3.02 + index * 0.56,
      w: 0.18,
      h: 0.18,
      rectRadius: 0.03,
      fill: { color: index % 2 === 0 ? C.red : C.navy },
      line: { color: index % 2 === 0 ? C.red : C.navy },
    });
    slide.addText(item, {
      x: 9.42,
      y: 3.03 + index * 0.56,
      w: 1.94,
      h: 0.16,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.4,
      color: C.ink,
      margin: 0,
    });
  });

  validateSlide(slide, pptx);
}

function createAgenticSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Responsive asistido no es responsive validado",
    "Una primera propuesta puede venir de un agente, pero la adaptación se confirma leyendo comportamiento real en pantalla.",
    "Bloque 1"
  );

  addDelegationSplit(slide, SH, {
    x: 0.96,
    y: 2.28,
    w: 10.84,
    h: 4.02,
    title: "Qué puede acelerar un agente y qué sigue siendo tuyo",
    left: {
      title: "Puede ayudar con",
      subtitle: "primeras propuestas de adaptación",
      items: [
        "bosquejar una versión móvil inicial",
        "proponer variantes de layout",
        "sugerir un primer orden de bloques",
        "comparar dónde un caso necesita reflow",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene delegar",
      subtitle: "lectura y validación final",
      items: [
        "revisar si la jerarquía visual sigue clara",
        "comprobar si el viewport mejora la lectura",
        "decidir qué baja y qué permanece arriba",
        "dar por buena una adaptación sin verla",
      ],
      accent: C.red,
      fill: C.white,
    },
    bridgeLabel: "Pantalla real",
    bridgeBody: "La adaptación se aprueba viendo la pantalla real.",
    footer: "El agente propone primero. Tú validas la experiencia.",
  });

  validateSlide(slide, pptx);
}

function createQuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas para cerrar el bloque",
    "Si responsive es comportamiento, las preguntas también deben apuntar a cómo cambia la interfaz bajo presión de espacio.",
    "Bloque 1"
  );

  addCard(slide, SH, {
    x: 1.1,
    y: 2.46,
    w: 3.16,
    h: 1.56,
    title: "1. Pantalla fija",
    body: "¿Por qué una interfaz web no debería pensarse como una maqueta que solo debe verse bien en un ancho ideal?",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 15,
    bodyFontSize: 10.6,
    bodyYOffset: 0.54,
  });
  addCard(slide, SH, {
    x: 5.08,
    y: 2.46,
    w: 3.16,
    h: 1.56,
    title: "2. Achicar vs reorganizar",
    body: "¿Qué diferencia hay entre reducir una pantalla y reordenar una interfaz con intención?",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14.2,
    bodyFontSize: 10.1,
    bodyYOffset: 0.68,
  });
  addCard(slide, SH, {
    x: 9.06,
    y: 2.46,
    w: 3.16,
    h: 1.56,
    title: "3. Validación",
    body: "¿Qué parte de una adaptación responsive siempre conviene verificar mirando la interfaz en pantalla real?",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 15,
    bodyFontSize: 10.4,
    bodyYOffset: 0.54,
  });

  addCenterStatement(slide, SH, "La mejor respuesta no es un número de breakpoint: es una lectura clara del comportamiento visual.", {
    x: 1.24,
    y: 5.22,
    w: 10.82,
    h: 0.82,
    fill: C.softNeutral,
    fontSize: 18,
  });

  validateSlide(slide, pptx);
}

function createClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del bloque",
    "Responsive empieza cuando dejamos de defender una sola pantalla y empezamos a diseñar bajo cambio de contexto.",
    "Bloque 1"
  );

  addPanel(slide, 1.08, 2.4, 6.42, 2.18, { fill: C.white, line: C.border });
  slide.addText("Diseñar responsive significa reorganizar con criterio, no encoger una maqueta.", {
    x: 1.42,
    y: 2.78,
    w: 5.72,
    h: 0.72,
    fontFace: TYPOGRAPHY.display,
    fontSize: 22,
    bold: true,
    color: C.navy,
    align: "center",
    valign: "mid",
    margin: 0,
  });
  addPill(slide, SH, "viewport", { x: 1.46, y: 4.04, w: 1.22, fill: C.paleRed, line: C.paleRed, color: C.red });
  addPill(slide, SH, "prioridad", { x: 2.86, y: 4.04, w: 1.28, fill: C.softBlue, line: C.softBlue, color: C.navy });
  addPill(slide, SH, "reflow", { x: 4.3, y: 4.04, w: 1.08, fill: C.warm, line: C.warm, color: C.navy });
  addPill(slide, SH, "validación", { x: 5.58, y: 4.04, w: 1.36, fill: C.white, line: C.border, color: C.navy });

  addCard(slide, SH, {
    x: 7.9,
    y: 2.4,
    w: 3.28,
    h: 2.18,
    title: "Puente al Bloque 2",
    body: "Ahora bajaremos esta idea a viewport, puntos de quiebre y decisiones concretas de layout para que responsive deje de ser intuición suelta.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16.4,
    bodyFontSize: 10.5,
    bodyYOffset: 0.54,
  });

  addCenterStatement(slide, SH, "Entender el espacio -> proponer -> mirar en pantalla -> validar con criterio", {
    x: 1.24,
    y: 5.38,
    w: 9.94,
    h: 0.72,
    fill: C.warm,
    fontSize: 17.2,
  });

  validateSlide(slide, pptx);
}

function addChecklistPanel(slide, x, y, w, h, title, items, opts = {}) {
  addPanel(slide, x, y, w, h, {
    fill: opts.fill || C.white,
    line: opts.line || C.border,
  });

  slide.addShape(SH.rect, {
    x: x + 0.14,
    y: y + 0.16,
    w: 0.1,
    h: h - 0.32,
    fill: { color: opts.accent || C.navy },
    line: { color: opts.accent || C.navy },
  });
  slide.addText(title, {
    x: x + 0.34,
    y: y + 0.16,
    w: w - 0.5,
    h: 0.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.titleFontSize || 14,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  if (opts.subtitle) {
    slide.addText(opts.subtitle, {
      x: x + 0.34,
      y: y + 0.42,
      w: w - 0.48,
      h: 0.16,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.8,
      color: C.slate,
      margin: 0,
    });
  }

  const startY = y + (opts.subtitle ? 0.82 : 0.62);
  const rowGap = opts.rowGap || 0.48;
  items.forEach((item, index) => {
    const rowY = startY + index * rowGap;
    slide.addShape(SH.roundRect, {
      x: x + 0.34,
      y: rowY,
      w: 0.14,
      h: 0.14,
      rectRadius: 0.03,
      fill: { color: index % 2 === 0 ? opts.accent || C.navy : opts.secondaryAccent || C.red },
      line: { color: index % 2 === 0 ? opts.accent || C.navy : opts.secondaryAccent || C.red },
    });
    slide.addText(item, {
      x: x + 0.58,
      y: rowY - 0.01,
      w: w - 0.82,
      h: 0.16,
      fontFace: TYPOGRAPHY.body,
      fontSize: opts.bodyFontSize || 9.4,
      color: C.ink,
      margin: 0,
    });
  });

  if (opts.footer) {
    slide.addText(opts.footer, {
      x: x + 0.32,
      y: y + h - 0.22,
      w: w - 0.48,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.4,
      color: C.slate,
      margin: 0,
      align: "center",
    });
  }
}

function createBlock2IntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Bloque 2 · Viewport, adaptación y decisiones de layout",
    "El ancho visible no es un dato neutral: cambia el ritmo, la jerarquía y la decisión de layout que conviene tomar.",
    "Bloque 2"
  );

  addPanel(slide, 0.92, 2.38, 3.72, 3.74, { fill: C.titleFill, line: C.titleFill });
  addBarsMotif(slide, 1.2, 2.7, 0.84, C.red);
  slide.addText("Viewport\nno es un\nnúmero.", {
    x: 1.2,
    y: 3.22,
    w: 2.48,
    h: 1.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 23,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addPill(slide, SH, "quiebre", { x: 1.2, y: 5.16, w: 1.1, fill: C.paleRed, line: C.paleRed, color: C.red });
  addPill(slide, SH, "orden", { x: 2.42, y: 5.16, w: 0.92, fill: C.softBlue, line: C.softBlue, color: C.navy });
  addPill(slide, SH, "lectura", { x: 1.2, y: 5.52, w: 1.08, fill: C.white, line: C.border, color: C.navy });
  addPill(slide, SH, "validación", { x: 2.42, y: 5.52, w: 1.28, fill: C.warm, line: C.warm, color: C.navy });

  addBreakpointDecisionPanel(slide, SH, {
    x: 4.96,
    y: 2.42,
    w: 6.72,
    h: 3.88,
    title: "Leer el ancho antes de tocar el layout",
    stages: [
      { label: "Amplio", sizeLabel: "1280 px", note: "la composición todavía respira", accent: C.navy, fill: C.softBlue },
      { label: "Tensión", sizeLabel: "980 px", note: "el contenido empieza a comprimirse", accent: C.gold, fill: C.warm },
      { label: "Quiebre útil", sizeLabel: "760 px", note: "la interfaz ya pide otra relación", accent: C.red, fill: C.paleRed, active: true },
      { label: "Estrecho", sizeLabel: "390 px", note: "una columna ya ordena mejor", accent: C.navy, fill: C.white },
    ],
    signalTitle: "Cuando se tensiona",
    signalBody: "Texto, navegación y CTA empiezan a competir por espacio antes de que nadie escriba una media query.",
    breakpointTitle: "Punto útil",
    breakpointBody: "El corte aparece cuando la lectura deja de sostener la relación anterior entre bloques.",
    decisionTitle: "Qué conviene decidir",
    decisionBody: "Apilar, redistribuir o mover foco para recuperar claridad, no para copiar la maqueta vieja.",
    footer: "Viewport = condición de lectura, no cifra memorizada.",
  });

  validateSlide(slide, pptx);
}

function createViewportConditionSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El viewport cambia la lectura antes que el código",
    "Antes de pensar en media queries, conviene observar cómo cambia el peso visual de la misma interfaz cuando el ancho se reduce.",
    "Bloque 2"
  );

  addBrowserScene(slide, 0.92, 2.46, 4.58, 3.6, {
    url: "https://demo.local/overview",
    mode: "desktop",
    hero: "Ancho amplio",
    accent: C.navy,
    accentFill: C.softBlue,
  });
  addArrow(slide, 5.64, 4.0, 0.44, 0.36, C.gold);
  addBrowserScene(slide, 6.2, 2.46, 2.18, 3.6, {
    url: "m.demo.local/overview",
    mode: "mobile",
    hero: "Viewport reducido",
    compact: true,
    accent: C.red,
    accentFill: C.paleRed,
  });

  [
    {
      title: "Proporción",
      body: "las masas visuales ya no reparten contexto y foco de la misma forma.",
      fill: C.softBlue,
      line: C.softBlue,
      accent: C.navy,
    },
    {
      title: "Densidad",
      body: "el mismo contenido puede sentirse más pesado solo por cambiar el ancho visible.",
      fill: C.paleRed,
      line: C.paleRed,
      accent: C.red,
    },
    {
      title: "Entrada visual",
      body: "la mirada necesita un punto de inicio más claro cuando el espacio se estrecha.",
      fill: C.warm,
      line: C.warm,
      accent: C.gold,
    },
  ].forEach((card, index) => {
    addCard(slide, SH, {
      x: 8.74,
      y: 2.52 + index * 1.22,
      w: 2.9,
      h: 1.02,
      title: card.title,
      body: card.body,
      fill: card.fill,
      line: card.line,
      accent: card.accent,
      titleFontSize: 13.4,
      bodyFontSize: 9.1,
      bodyYOffset: 0.42,
    });
  });

  validateSlide(slide, pptx);
}

function createBreakpointRealSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Una interfaz no se rompe en un número exacto: se rompe cuando deja de leerse bien",
    "Breakpoint útil no es una receta de anchos. Es el momento en que la jerarquía y el ritmo ya piden otra decisión de layout.",
    "Bloque 2"
  );

  addBreakpointDecisionPanel(slide, SH, {
    x: 0.96,
    y: 2.34,
    w: 10.84,
    h: 4.02,
    title: "El quiebre aparece cuando la lectura ya no sostiene la relación anterior",
    stages: [
      { label: "Amplio", sizeLabel: "1440 px", note: "dos zonas todavía conviven", accent: C.navy, fill: C.softBlue },
      { label: "Comprime", sizeLabel: "1120 px", note: "el contenido empieza a defender aire", accent: C.gold, fill: C.warm },
      { label: "Quiebre útil", sizeLabel: "760 px", note: "la interfaz ya pide otra secuencia", accent: C.red, fill: C.paleRed, active: true },
      { label: "Móvil", sizeLabel: "390 px", note: "una columna ordena mejor el recorrido", accent: C.navy, fill: C.white },
    ],
    signalTitle: "Señal real",
    signalBody: "El título pierde respiración, la acción principal deja de abrir la lectura o la segunda columna ya no aporta contexto útil.",
    breakpointTitle: "Quiebre observado",
    breakpointBody: "No nace de repetir 768 por costumbre. Nace de ver que el contenido ya pide otra distribución.",
    decisionTitle: "Decisión sana",
    decisionBody: "Cambiar columnas, apilar o reordenar para recuperar claridad antes de tocar más CSS que el necesario.",
    footer: "Breakpoint útil = punto donde cambia la decisión de layout.",
  });

  validateSlide(slide, pptx);
}

function createBreakpointSignalsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Qué señales muestran que llegó un quiebre real",
    "La interfaz avisa antes de romperse del todo: el problema suele aparecer primero como lectura pesada o foco confuso.",
    "Bloque 2"
  );

  addBrowserScene(slide, 4.28, 2.56, 4.58, 3.28, {
    url: "https://demo.local/signals",
    mode: "rigid",
    hero: "Síntomas del quiebre",
    accent: C.navy,
    accentFill: C.softBlue,
  });

  addIssueCard(slide, 0.92, 2.58, "Texto apretado", "la interfaz todavía cabe, pero ya no se lee con aire.", C.red, C.paleRed);
  addIssueCard(slide, 0.92, 3.78, "Navegación incómoda", "se insiste con una relación horizontal que el ancho ya no soporta.", C.navy, C.softBlue);
  addIssueCard(slide, 9.34, 2.58, "CTA sin foco", "la acción principal se hunde dentro del ruido visual.", C.gold, C.warm);
  addIssueCard(slide, 9.34, 3.78, "Columna que sobra", "lo lateral sigue ocupando espacio aunque ya no ayude a entender.", C.red, C.white);

  addCenterStatement(slide, SH, "El breakpoint aparece cuando el contenido deja de explicarse bien solo.", {
    x: 1.28,
    y: 6.0,
    w: 10.32,
    h: 0.5,
    fill: C.warm,
    fontSize: 16,
  });

  validateSlide(slide, pptx);
}

function createRedistributeSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cambiar layout no es esconder problemas: es redistribuir prioridad",
    "Responsive sano no intenta conservar la misma forma. Cambia relaciones para mantener claridad, foco y recorrido.",
    "Bloque 2"
  );

  addResponsiveReflowPanel(slide, SH, {
    x: 0.92,
    y: 2.38,
    w: 7.04,
    h: 4.02,
    title: "Lo que cambia es la relación entre piezas",
    stages: [
      { label: "Desktop", sizeLabel: "1280 px", behavior: "más contexto y lectura en dos zonas", layout: "desktop", tone: C.navy, toneFill: C.softBlue },
      { label: "Tablet", sizeLabel: "820 px", behavior: "reacomoda sin perder el hilo", layout: "tablet", tone: C.gold, toneFill: C.warm },
      { label: "Móvil", sizeLabel: "390 px", behavior: "ordena en una secuencia más clara", layout: "mobile", tone: C.red, toneFill: C.paleRed },
    ],
    footer: "Redistribuir prioridad vale más que defender la geometría original.",
  });

  [
    {
      title: "Apilar",
      body: "cuando dos columnas ya compiten, una secuencia vertical puede aclarar mejor la lectura.",
      fill: C.paleRed,
      line: C.paleRed,
      accent: C.red,
    },
    {
      title: "Reordenar",
      body: "una pieza puede subir o bajar de lugar sin perder valor si mejora el recorrido visual.",
      fill: C.softBlue,
      line: C.softBlue,
      accent: C.navy,
    },
    {
      title: "Dar aire",
      body: "responsive también decide cuánto espacio necesita cada bloque para seguir explicando bien.",
      fill: C.warm,
      line: C.warm,
      accent: C.gold,
    },
  ].forEach((card, index) => {
    addCard(slide, SH, {
      x: 8.3,
      y: 2.5 + index * 1.26,
      w: 3.34,
      h: 1.06,
      title: card.title,
      body: card.body,
      fill: card.fill,
      line: card.line,
      accent: card.accent,
      titleFontSize: 13.8,
      bodyFontSize: 9.2,
      bodyYOffset: 0.42,
    });
  });

  validateSlide(slide, pptx);
}

function createLayoutDecisionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El espacio obliga a decidir qué sube, qué baja y qué se apila",
    "Cuando el ancho baja, responsive deja de ser una corrección superficial y se vuelve una secuencia de decisiones de layout.",
    "Bloque 2"
  );

  addPriorityStack(slide, 0.92, 2.42, 4.32, 3.94);
  addArrow(slide, 5.4, 4.02, 0.44, 0.36, C.gold);
  addBrowserScene(slide, 6.0, 2.42, 2.12, 3.64, {
    url: "m.demo.local/layout",
    mode: "mobile",
    hero: "Secuencia útil",
    compact: true,
    accent: C.red,
    accentFill: C.paleRed,
  });

  addChecklistPanel(slide, 8.5, 2.5, 3.14, 3.62, "Decisiones de layout", [
    "lo principal sube y abre la lectura",
    "lo lateral puede bajar sin perder sentido",
    "la acción visible no debería competir",
    "el espacio extra se usa para respirar, no para rellenar",
  ], {
    accent: C.navy,
    secondaryAccent: C.red,
    fill: C.white,
    subtitle: "Cambiar de orden no significa degradar la interfaz.",
    rowGap: 0.62,
    bodyFontSize: 9.2,
  });

  validateSlide(slide, pptx);
}

function createContentDrivenBreakpointsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Los breakpoints útiles nacen del contenido, no de números recitados",
    "Los anchos frecuentes ayudan a orientarse, pero el corte correcto siempre lo termina dictando la lectura real del caso.",
    "Bloque 2"
  );

  addBreakpointDecisionPanel(slide, SH, {
    x: 0.92,
    y: 2.42,
    w: 6.74,
    h: 3.92,
    title: "El contenido define cuándo conviene cortar",
    stages: [
      { label: "Texto", sizeLabel: "título", note: "empieza a apretarse", accent: C.red, fill: C.paleRed },
      { label: "Menú", sizeLabel: "nav", note: "ya no cabe sin tensión", accent: C.navy, fill: C.softBlue, active: true },
      { label: "Cards", sizeLabel: "grid", note: "dos columnas ya no ayudan", accent: C.gold, fill: C.warm },
    ],
    signalTitle: "Lo que manda",
    signalBody: "Texto, navegación y acciones dicen antes que un número si la estructura dejó de sostener la lectura.",
    breakpointTitle: "Criterio",
    breakpointBody: "Primero se detecta el problema visual; después se decide el breakpoint que lo corrige.",
    decisionTitle: "Respuesta sana",
    decisionBody: "Cortar cuando el contenido lo exige, no solo porque un número famoso suene correcto.",
    footer: "320 / 768 / 1024 sirven como referencia, no como dogma.",
  });

  addChecklistPanel(slide, 7.96, 2.48, 3.68, 3.8, "Qué conviene escuchar", [
    "si el título ya perdió respiración",
    "si la navegación obliga a defender una forma vieja",
    "si la acción principal dejó de abrir el recorrido",
    "si dos columnas siguen ocupando espacio sin explicar nada",
  ], {
    accent: C.red,
    secondaryAccent: C.navy,
    fill: C.paleRed,
    line: C.paleRed,
    subtitle: "El mejor breakpoint suele aparecer como síntoma antes que como regla.",
    rowGap: 0.58,
    bodyFontSize: 9.1,
  });

  validateSlide(slide, pptx);
}

function createDevtoolsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "DevTools responsive permite leer comportamiento y no inventarlo",
    "La validación de layout mejora cuando se prueba el caso real y no solo la idea mental de cómo debería verse.",
    "Bloque 2"
  );

  addPanel(slide, 0.96, 2.36, 7.08, 4.02, { fill: C.white, line: C.border });
  slide.addText("Viewport + lectura en navegador", {
    x: 1.22,
    y: 2.56,
    w: 2.82,
    h: 0.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  [
    { text: "390 px", x: 5.18, fill: C.paleRed, color: C.red },
    { text: "820 px", x: 6.06, fill: C.warm, color: C.navy },
    { text: "1280 px", x: 6.96, fill: C.softBlue, color: C.navy },
  ].forEach((pill) => {
    addPill(slide, SH, pill.text, {
      x: pill.x,
      y: 2.56,
      w: 0.72,
      fill: pill.fill,
      line: pill.fill,
      color: pill.color,
      fontSize: 8.4,
    });
  });

  addBrowserScene(slide, 1.18, 2.9, 3.22, 2.94, {
    url: "https://demo.local/review",
    mode: "tablet",
    hero: "Caso en revisión",
    accent: C.navy,
    accentFill: C.softBlue,
  });

  addChecklistPanel(slide, 4.66, 2.9, 3.04, 2.94, "Señales a observar", [
    "cómo entra el ojo al contenido",
    "si la acción principal sigue visible",
    "si el scroll extra aporta o sobra",
    "si el aire entre bloques todavía ayuda",
  ], {
    accent: C.navy,
    secondaryAccent: C.gold,
    fill: C.softBlue,
    line: C.softBlue,
    rowGap: 0.52,
    bodyFontSize: 9,
  });

  addChecklistPanel(slide, 8.42, 2.44, 3.22, 3.84, "Evidencia que importa", [
    "leer el comportamiento en distintos anchos",
    "comparar antes y después del reflow",
    "ver si la jerarquía mejora de verdad",
    "confirmar que el cambio ayuda y no solo acomoda",
  ], {
    accent: C.red,
    secondaryAccent: C.navy,
    fill: C.white,
    subtitle: "Responsive se valida mirando resultado, no imaginándolo.",
    rowGap: 0.62,
    bodyFontSize: 9.1,
  });

  validateSlide(slide, pptx);
}

function createObserveChecklistSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Qué conviene mirar cuando pruebas una interfaz en varios anchos",
    "Probar responsive no es solo ver si algo cabe. Es revisar si la interfaz sigue explicándose bien en contexto.",
    "Bloque 2"
  );

  addResponsiveViewportCompare(slide, SH, {
    x: 0.94,
    y: 2.4,
    w: 4.92,
    h: 3.88,
    title: "Probar no es solo mirar tamaño",
    left: {
      label: "Tablet",
      sizeLabel: "820 px",
      notes: ["revisa recorrido", "detecta competencia"],
    },
    right: {
      label: "Amplio",
      sizeLabel: "1280 px",
      notes: ["más contexto", "otra relación entre piezas"],
    },
  });

  [
    {
      title: "Lectura",
      body: "¿el título y el contenido principal siguen abriendo el recorrido?",
      fill: C.softBlue,
      accent: C.navy,
    },
    {
      title: "Jerarquía",
      body: "¿sigue claro qué sube, qué acompaña y qué puede bajar?",
      fill: C.paleRed,
      accent: C.red,
    },
    {
      title: "Interacción",
      body: "¿el CTA, los inputs o la navegación siguen siendo obvios?",
      fill: C.warm,
      accent: C.gold,
    },
    {
      title: "Espacio",
      body: "¿el layout respira o solo consiguió meter todo dentro del ancho?",
      fill: C.white,
      accent: C.navy,
    },
  ].forEach((card, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    addCard(slide, SH, {
      x: 6.24 + col * 2.72,
      y: 2.46 + row * 1.92,
      w: 2.46,
      h: 1.58,
      title: card.title,
      body: card.body,
      fill: card.fill,
      line: card.fill === C.white ? C.border : card.fill,
      accent: card.accent,
      titleFontSize: 14.2,
      bodyFontSize: 9.6,
      bodyYOffset: 0.54,
    });
  });

  validateSlide(slide, pptx);
}

function createDefendWideSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Error común: seguir defendiendo la versión amplia aunque ya no funciona",
    "Responsive falla cuando la prioridad pasa a ser conservar la forma vieja en vez de recuperar una lectura clara.",
    "Bloque 2"
  );

  addCard(slide, SH, {
    x: 0.92,
    y: 2.42,
    w: 3.18,
    h: 3.46,
    title: "Defender la versión amplia",
    body: "seguir empujando columnas, alineaciones y simetría aunque el viewport ya pida otra secuencia visual.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 16.2,
    bodyFontSize: 10.4,
    bodyYOffset: 0.58,
  });

  addBrowserScene(slide, 4.46, 2.46, 3.44, 3.08, {
    url: "https://demo.local/rigid-layout",
    mode: "rigid",
    hero: "Composición defendida",
    accent: C.navy,
    accentFill: C.softBlue,
  });

  addCard(slide, SH, {
    x: 8.28,
    y: 2.42,
    w: 3.38,
    h: 3.46,
    title: "Lo sano es cambiar la relación",
    body: "cuando el ancho baja, lo correcto puede ser apilar, mover foco y abandonar una simetría que ya no ayuda a entender.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 15.8,
    bodyFontSize: 10.3,
    bodyYOffset: 0.58,
  });

  addCenterStatement(slide, SH, "Preservar una forma vieja no es responsive.", {
    x: 1.34,
    y: 5.96,
    w: 10.22,
    h: 0.5,
    fill: C.warm,
    fontSize: 16.2,
  });

  validateSlide(slide, pptx);
}

function createBlock2AgenticSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un agente puede proponer un breakpoint; tú validas la decisión",
    "La ayuda inteligente sirve para acelerar hipótesis de layout, pero el viewport real sigue siendo la fuente final de verdad.",
    "Bloque 2"
  );

  addDelegationSplit(slide, SH, {
    x: 0.96,
    y: 2.3,
    w: 10.84,
    h: 4.02,
    title: "Dónde un agente ayuda y dónde la decisión sigue siendo tuya",
    left: {
      title: "Puede ayudar con",
      subtitle: "primeras hipótesis de adaptación",
      items: [
        "sugerir media queries o cortes iniciales",
        "comparar qué bloque conviene apilar primero",
        "proponer una versión tablet o móvil",
        "detectar zonas donde el layout se densifica",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene delegar",
      subtitle: "lectura y validación final",
      items: [
        "decidir si la jerarquía realmente mejoró",
        "dar por bueno un breakpoint sin probarlo",
        'aprobar un reflow solo porque "se ve ordenado"',
        "suponer que menos columnas siempre significa mejor lectura",
      ],
      accent: C.red,
      fill: C.white,
    },
    bridgeLabel: "Viewport real",
    bridgeBody: "La hipótesis se acepta cuando el layout mejora la lectura en pantalla.",
    footer: "El agente acelera la primera propuesta. Tú validas la decisión de layout.",
  });

  validateSlide(slide, pptx);
}

function createBlock2QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas para cerrar el bloque",
    "Si el viewport cambia la lectura, las preguntas útiles también deben apuntar a comportamiento, foco y decisión de layout.",
    "Bloque 2"
  );

  addCard(slide, SH, {
    x: 1.08,
    y: 2.46,
    w: 3.16,
    h: 1.58,
    title: "1. Quiebre real",
    body: "¿Qué diferencia hay entre memorizar un breakpoint y detectar un quiebre real de lectura en la interfaz?",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 14.6,
    bodyFontSize: 10.4,
    bodyYOffset: 0.56,
  });
  addCard(slide, SH, {
    x: 5.08,
    y: 2.46,
    w: 3.16,
    h: 1.58,
    title: "2. Prioridad",
    body: "Cuando el espacio baja, ¿cómo decides qué sube, qué acompaña y qué puede moverse?",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14.6,
    bodyFontSize: 10.3,
    bodyYOffset: 0.56,
  });
  addCard(slide, SH, {
    x: 9.08,
    y: 2.46,
    w: 3.16,
    h: 1.58,
    title: "3. Validación",
    body: "¿Qué parte del responsive siempre conviene revisar en el navegador antes de darla por buena?",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 14.6,
    bodyFontSize: 10.4,
    bodyYOffset: 0.56,
  });

  addCenterStatement(slide, SH, "Responsive maduro no recita anchos: lee señales, decide layout y valida resultado.", {
    x: 1.28,
    y: 5.24,
    w: 10.66,
    h: 0.78,
    fill: C.softNeutral,
    fontSize: 17.2,
  });

  validateSlide(slide, pptx);
}

function createBlock2ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del bloque",
    "Viewport, quiebre y decisión de layout quedan mejor entendidos cuando dejamos de pensar responsive como magia y lo leemos como comportamiento.",
    "Bloque 2"
  );

  addPanel(slide, 1.06, 2.38, 6.42, 2.18, { fill: C.white, line: C.border });
  slide.addText("Responsive con criterio implica leer el viewport, detectar el quiebre y decidir el layout que mejor conserva claridad.", {
    x: 1.42,
    y: 2.78,
    w: 5.72,
    h: 0.82,
    fontFace: TYPOGRAPHY.display,
    fontSize: 20.6,
    bold: true,
    color: C.navy,
    align: "center",
    valign: "mid",
    margin: 0,
  });
  addPill(slide, SH, "viewport", { x: 1.52, y: 4.02, w: 1.14, fill: C.softBlue, line: C.softBlue, color: C.navy });
  addPill(slide, SH, "quiebre", { x: 2.86, y: 4.02, w: 1.08, fill: C.paleRed, line: C.paleRed, color: C.red });
  addPill(slide, SH, "reordenar", { x: 4.16, y: 4.02, w: 1.24, fill: C.warm, line: C.warm, color: C.navy });
  addPill(slide, SH, "validar", { x: 5.62, y: 4.02, w: 1.02, fill: C.white, line: C.border, color: C.navy });

  addCard(slide, SH, {
    x: 7.88,
    y: 2.38,
    w: 3.34,
    h: 2.18,
    title: "Puente al Bloque 3",
    body: "Si el layout cambia con el contexto, entonces los componentes también deben nacer preparados para adaptarse con consistencia.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16.2,
    bodyFontSize: 10.5,
    bodyYOffset: 0.54,
  });

  addCenterStatement(slide, SH, "Leer el ancho -> detectar señales -> decidir el layout -> validar en pantalla", {
    x: 1.24,
    y: 5.38,
    w: 10.08,
    h: 0.72,
    fill: C.warm,
    fontSize: 17,
  });

  validateSlide(slide, pptx);
}

function createBlock3IntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Bloque 3 · Componentes visuales y consistencia",
    "Aquí la interfaz deja de pensarse como una secuencia de pantallas sueltas y empieza a leerse como una familia de piezas reutilizables.",
    "Bloque 3"
  );

  addPanel(slide, 0.92, 2.38, 3.34, 3.82, { fill: C.navy, line: C.navy });
  slide.addShape(SH.rect, {
    x: 1.04,
    y: 2.58,
    w: 0.12,
    h: 3.42,
    fill: { color: C.red },
    line: { color: C.red },
  });
  addBarsMotif(slide, 1.42, 2.78, 0.74, C.red);
  slide.addText("Una interfaz madura\nse arma con piezas\nreutilizables.", {
    x: 1.66,
    y: 3.18,
    w: 1.98,
    h: 1.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18.4,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Componentes, variantes, estados y consistencia visual preparan el terreno para que la interfaz crezca sin volverse caótica.", {
    x: 1.3,
    y: 5.08,
    w: 2.52,
    h: 0.56,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.1,
    color: "DCE6F2",
    margin: 0,
  });
  addPill(slide, SH, "reusar", {
    x: 1.22,
    y: 5.72,
    w: 0.92,
    fill: C.paleRed,
    line: C.paleRed,
    color: C.red,
  });
  addPill(slide, SH, "variar", {
    x: 2.26,
    y: 5.72,
    w: 0.92,
    fill: C.softBlue,
    line: C.softBlue,
    color: C.navy,
  });
  addPill(slide, SH, "adaptar", {
    x: 3.3,
    y: 5.72,
    w: 0.96,
    fill: C.warm,
    line: C.warm,
    color: C.navy,
  });

  addComponentVariantBoard(slide, SH, {
    x: 4.56,
    y: 2.36,
    w: 7.04,
    h: 3.92,
    title: "Una familia pequeña ya puede mostrar sistema",
    variants: [
      {
        label: "Base",
        role: "default",
        description: "fija la estructura reconocible de la pieza",
        accent: C.navy,
        fill: C.softBlue,
        preview: "card",
      },
      {
        label: "Destacada",
        role: "feature",
        description: "sube foco sin romper la familia",
        accent: C.red,
        fill: C.paleRed,
        preview: "card",
      },
      {
        label: "Compacta",
        role: "compact",
        description: "reduce aire con la misma lógica visual",
        accent: C.gold,
        fill: C.warm,
        preview: "stack",
      },
      {
        label: "Acción",
        role: "cta",
        description: "mantiene identidad y vuelve visible la respuesta",
        accent: C.navy,
        fill: C.white,
        preview: "button",
        ctaLabel: "Explorar",
      },
    ],
    footer: "No se trata de copiar cajas: se trata de estabilizar decisiones que pueden volver a aparecer.",
  });

  validateSlide(slide, pptx);
}

function createScreensVsComponentsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Una pantalla clara suele nacer de pocas piezas bien pensadas",
    "Cuando una interfaz se lee por componentes, deja de depender de soluciones aisladas repartidas por cada pantalla.",
    "Bloque 3"
  );

  addBrowserScene(slide, 0.92, 2.38, 4.38, 3.44, {
    url: "https://demo.local/dashboard",
    mode: "desktop",
    hero: "Pantalla resuelta una vez",
    accent: C.navy,
    accentFill: C.softBlue,
  });
  addCard(slide, SH, {
    x: 1.14,
    y: 5.9,
    w: 3.94,
    h: 0.48,
    title: "Cuando todo se resuelve como caso único, cada pantalla inventa sus propias reglas.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 10.8,
    body: "",
  });

  addComponentTree(slide, SH, {
    x: 5.62,
    y: 2.34,
    w: 6.14,
    h: 4.02,
    title: "La misma interfaz leída como piezas",
    nodes: [
      { label: "Page", depth: 0, meta: "pantalla entendida como composición de partes" },
      { label: "Header", depth: 1, meta: "marca, navegación y entrada" },
      { label: "Hero", depth: 1, meta: "mensaje principal y foco de lectura" },
      { label: "CardGrid", depth: 1, meta: "zona repetible con ritmo compartido" },
      { label: "Card", depth: 2, meta: "mismo patrón, variantes por intención" },
      { label: "Card", depth: 2, meta: "misma familia, distinto contenido" },
      { label: "CTA", depth: 1, meta: "acción visible y consistente" },
    ],
  });

  validateSlide(slide, pptx);
}

function createComponentDecisionSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un componente no es solo una caja: es una decisión reutilizable",
    "Cuando una pieza resuelve función, jerarquía y respuesta al espacio, ya puede sostener más de una pantalla sin improvisar de nuevo.",
    "Bloque 3"
  );

  addComponentCanvas(slide, 1.02, 2.42, 4.28, 3.38, {
    title: "Card informativa",
    mode: "card",
    accent: C.navy,
    accentFill: C.softBlue,
    footer: "título, contenido y acción siguen un mismo ritmo visual",
  });

  addCard(slide, SH, {
    x: 6.02,
    y: 2.42,
    w: 2.66,
    h: 1.02,
    title: "Función",
    body: "la pieza existe para resolver una tarea visual, no solo para rellenar espacio.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13.4,
    bodyFontSize: 9.2,
    bodyYOffset: 0.42,
  });
  addCard(slide, SH, {
    x: 8.98,
    y: 2.42,
    w: 2.66,
    h: 1.02,
    title: "Jerarquía",
    body: "su orden interno deja claro qué se lee primero, qué acompaña y qué activa.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 13.4,
    bodyFontSize: 9.2,
    bodyYOffset: 0.42,
  });
  addCard(slide, SH, {
    x: 6.02,
    y: 3.74,
    w: 5.62,
    h: 1.44,
    title: "Respuesta al contexto",
    body: "la misma pieza también debe sostener legibilidad, aire y claridad cuando cambia el ancho disponible o cuando aparece en una zona distinta de la interfaz.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 14.4,
    bodyFontSize: 9.8,
    bodyYOffset: 0.48,
  });

  addCenterStatement(slide, SH, "Componente útil = función visible + jerarquía estable + adaptación razonable.", {
    x: 1.24,
    y: 5.96,
    w: 10.18,
    h: 0.48,
    fill: C.softNeutral,
    fontSize: 16.2,
  });

  validateSlide(slide, pptx);
}

function createVariantIdentitySlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La misma pieza puede variar sin perder identidad",
    "Variantes distintas no rompen el sistema cuando todavía comparten estructura, ritmo y una lógica reconocible.",
    "Bloque 3"
  );

  addComponentVariantBoard(slide, SH, {
    x: 0.96,
    y: 2.38,
    w: 7.24,
    h: 3.88,
    title: "Familia de cards",
    variants: [
      {
        label: "Base",
        role: "default",
        description: "la referencia estable que ordena la familia",
        accent: C.navy,
        fill: C.softBlue,
        preview: "card",
      },
      {
        label: "Destacada",
        role: "feature",
        description: "sube una card sin inventar otro idioma visual",
        accent: C.red,
        fill: C.paleRed,
        preview: "card",
      },
      {
        label: "Compacta",
        role: "compact",
        description: "usa menos aire pero conserva estructura",
        accent: C.gold,
        fill: C.warm,
        preview: "stack",
      },
      {
        label: "Acción",
        role: "cta",
        description: "la respuesta visible sigue siendo parte de la familia",
        accent: C.navy,
        fill: C.white,
        preview: "button",
        ctaLabel: "Ver detalle",
      },
    ],
    footer: "Variante no significa pieza nueva: significa misma familia con intención distinta.",
  });

  addIssueCard(slide, 8.6, 2.56, "Comparten", "ritmo, borde, aire y jerarquía básica", C.navy, C.softBlue);
  addIssueCard(slide, 8.6, 3.78, "Cambian", "énfasis, tamaño o contexto sin perder parentesco", C.red, C.paleRed);
  addIssueCard(slide, 8.6, 5, "Evitan ruido", "variedad útil en vez de pequeñas improvisaciones", C.gold, C.warm);

  validateSlide(slide, pptx);
}

function createStateSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Estado también comunica",
    "Un componente no solo cambia de forma: también cambia de estado y eso debe sentirse parte del mismo sistema visual.",
    "Bloque 3"
  );

  addComponentVariantBoard(slide, SH, {
    x: 0.98,
    y: 2.42,
    w: 7.06,
    h: 3.78,
    title: "Estados de un botón",
    variants: [
      {
        label: "Base",
        role: "default",
        description: "presenta la acción de forma estable",
        accent: C.navy,
        fill: C.softBlue,
        preview: "button",
        ctaLabel: "Continuar",
      },
      {
        label: "Hover",
        role: "hover",
        description: "insinúa interacción sin exagerar el gesto",
        accent: C.gold,
        fill: C.warm,
        preview: "button",
        ctaLabel: "Continuar",
      },
      {
        label: "Activa",
        role: "active",
        description: "confirma foco y respuesta",
        accent: C.red,
        fill: C.paleRed,
        preview: "button",
        ctaLabel: "Confirmado",
      },
      {
        label: "Inactiva",
        role: "disabled",
        description: "sigue perteneciendo a la familia aunque restrinja la acción",
        accent: C.navy,
        fill: C.white,
        preview: "button",
        ctaLabel: "Completa datos",
      },
    ],
    footer: "Estado claro = menos ambigüedad para quien usa la interfaz.",
  });

  addCard(slide, SH, {
    x: 8.48,
    y: 2.5,
    w: 3.08,
    h: 1.06,
    title: "Default",
    body: "orienta la acción sin competir con todo lo demás.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13.2,
    bodyFontSize: 9.2,
    bodyYOffset: 0.42,
  });
  addCard(slide, SH, {
    x: 8.48,
    y: 3.82,
    w: 3.08,
    h: 1.06,
    title: "Activo / foco",
    body: "marca respuesta o interacción presente sin cambiar de idioma visual.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 13.2,
    bodyFontSize: 9.1,
    bodyYOffset: 0.42,
  });
  addCard(slide, SH, {
    x: 8.48,
    y: 5.14,
    w: 3.08,
    h: 1.02,
    title: "Disabled",
    body: "previene error, pero sigue siendo parte del mismo sistema.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 13.2,
    bodyFontSize: 9.2,
    bodyYOffset: 0.4,
  });

  validateSlide(slide, pptx);
}

function createResponsiveComponentSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Responsive también vive dentro del componente",
    "Una pieza útil no solo se reutiliza: también mantiene claridad cuando cambia el contexto donde aparece.",
    "Bloque 3"
  );

  addResponsiveReflowPanel(slide, SH, {
    x: 0.96,
    y: 2.4,
    w: 7.18,
    h: 3.92,
    title: "La misma card en distintos anchos",
    stages: [
      {
        label: "Desktop",
        sizeLabel: "1280 px",
        behavior: "imagen lateral y lectura acompasada",
        layout: "desktop",
        tone: C.navy,
        toneFill: C.softBlue,
      },
      {
        label: "Tablet",
        sizeLabel: "820 px",
        behavior: "reordena bloques sin perder foco",
        layout: "tablet",
        tone: C.gold,
        toneFill: C.warm,
      },
      {
        label: "Móvil",
        sizeLabel: "390 px",
        behavior: "apila, simplifica y mantiene CTA visible",
        layout: "mobile",
        tone: C.red,
        toneFill: C.paleRed,
      },
    ],
    footer: "La pieza cambia de relación interna antes de perder sentido.",
  });

  addIssueCard(slide, 8.56, 2.54, "Legibilidad", "texto y acciones siguen abriendo la lectura", C.navy, C.softBlue);
  addIssueCard(slide, 8.56, 3.78, "Jerarquía", "cambia el orden, no el sentido de la pieza", C.red, C.paleRed);
  addIssueCard(slide, 8.56, 5.02, "Aire", "responsive no consiste en apretar todo dentro", C.gold, C.warm);

  validateSlide(slide, pptx);
}

function createConsistencySlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Consistencia visual no significa clonar todo",
    "La buena consistencia repite decisiones con criterio. La rigidez, en cambio, repite sin entender qué parte importa conservar.",
    "Bloque 3"
  );

  addComponentConsistencyPanel(slide, SH, {
    x: 0.96,
    y: 2.34,
    w: 10.86,
    h: 4.18,
    title: "Repetir con criterio vs repetir por accidente",
    leftTitle: "Rigidez accidental",
    leftSubtitle: "la pieza se repite, pero cambia por descuido",
    rightTitle: "Consistencia útil",
    rightSubtitle: "la familia comparte reglas y permite variantes",
    leftBody:
      "Cada pantalla parece traer una versión nueva del mismo bloque. Cambia el borde, el aire o la acción sin que exista una regla visible.",
    rightBody:
      "Las piezas comparten ritmo, borde, acento y jerarquía. Cambian por intención de uso, no por accidente visual.",
    footer: "Consistencia madura = menos ruido y cambios más razonables de sostener.",
  });

  validateSlide(slide, pptx);
}

function createRepeatedPiecesSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Error común: repetir piezas casi iguales por toda la interfaz",
    "A simple vista parece orden, pero en realidad es deuda visual escondida en pequeñas variaciones sin sistema.",
    "Bloque 3"
  );

  addBrowserScene(slide, 0.96, 2.46, 4.24, 3.26, {
    url: "https://demo.local/patches",
    mode: "desktop",
    hero: "Pantalla parcheada",
    accent: C.red,
    accentFill: C.paleRed,
  });

  addCard(slide, SH, {
    x: 5.72,
    y: 2.44,
    w: 5.64,
    h: 1.16,
    title: "Síntoma",
    body: "la interfaz parece estable hasta que un pequeño cambio obliga a tocar cinco versiones casi idénticas del mismo bloque.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 14.4,
    bodyFontSize: 9.7,
    bodyYOffset: 0.46,
  });
  addIssueCard(slide, 5.74, 3.88, "Bordes distintos", "la misma card cambia grosor o radio sin razón", C.red, C.paleRed);
  addIssueCard(slide, 8.3, 3.88, "Espaciado desigual", "la familia pierde ritmo entre pantallas", C.navy, C.softBlue);
  addIssueCard(slide, 5.74, 5.12, "CTA inestable", "el llamado cambia tamaño o tono sin regla", C.gold, C.warm);
  addIssueCard(slide, 8.3, 5.12, "Responsive frágil", "cada versión responde distinto al ancho", C.navy, C.white);

  validateSlide(slide, pptx);
}

function createMiniSystemSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un sistema pequeño puede nacer temprano",
    "No hace falta una biblioteca enorme para empezar a ordenar decisiones: bastan pocas piezas compartidas y algunas reglas visibles.",
    "Bloque 3"
  );

  addTokenBoard(slide, SH, {
    x: 0.96,
    y: 2.38,
    w: 6.92,
    h: 3.92,
    title: "Decisiones mínimas que ya conviene compartir",
    groups: [
      {
        title: "Color",
        tone: C.red,
        items: [
          { label: "--brand", value: "#D62027", swatch: C.red },
          { label: "--text", value: "#102A43", swatch: C.navy },
        ],
      },
      {
        title: "Espacio",
        tone: C.gold,
        items: [
          { label: "--space-sm", value: "8px" },
          { label: "--space-md", value: "16px" },
        ],
      },
      {
        title: "Superficie",
        tone: C.navy,
        items: [
          { label: "--surface", value: "#FFFFFF", swatch: C.white },
          { label: "--radius-md", value: "12px" },
        ],
      },
      {
        title: "Acción",
        tone: C.navy,
        fill: C.softBlue,
        items: [
          { label: "--cta", value: "button / enlace" },
          { label: "--card-base", value: "estructura base" },
        ],
      },
    ],
    footer: "Cuando estas decisiones se nombran, los componentes dejan de depender de memoria o intuición aislada.",
  });

  addComponentTree(slide, SH, {
    x: 8.14,
    y: 2.46,
    w: 3.38,
    h: 2.54,
    title: "Del token a la interfaz",
    nodes: [
      { label: "Tokens", depth: 0 },
      { label: "Button", depth: 1 },
      { label: "Card", depth: 1 },
      { label: "Screen", depth: 0 },
    ],
  });

  addCard(slide, SH, {
    x: 8.14,
    y: 5.36,
    w: 3.38,
    h: 0.72,
    title: "Pequeño sistema > improvisación repetida",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 11.8,
    body: "",
  });
  validateSlide(slide, pptx);
}

function createBlock3AgenticSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un agente puede detectar patrones; tú decides qué será sistema",
    "La ayuda inteligente sirve para comparar, reagrupar y proponer variantes, pero la coherencia real de la familia visual sigue dependiendo del criterio humano.",
    "Bloque 3"
  );

  addDelegationSplit(slide, SH, {
    x: 0.96,
    y: 2.3,
    w: 10.84,
    h: 4.02,
    title: "Qué puede acelerar un agente y qué sigue siendo una decisión tuya",
    left: {
      title: "Puede ayudar con",
      subtitle: "detección y primeras versiones",
      items: [
        "encontrar piezas que ya se repiten en varias pantallas",
        "proponer variantes iniciales de card, botón o navbar",
        "comparar dónde una familia perdió consistencia",
        "sugerir qué decisiones conviene volver compartidas",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene delegar",
      subtitle: "gobernanza del sistema visual",
      items: [
        "dar por buena una familia sin verla en contexto real",
        "aprobar estados o variantes sin revisar claridad",
        "confundir repetición con consistencia útil",
        "dejar que la interfaz herede un patrón solo porque fue rápido",
      ],
      accent: C.red,
      fill: C.white,
    },
    bridgeLabel: "Criterio visual",
    bridgeBody: "El patrón solo entra al sistema cuando resiste comparación, contexto y uso real.",
    footer: "El agente ayuda a encontrar orden. Tú decides qué orden vale la pena sostener.",
  });

  validateSlide(slide, pptx);
}

function createBlock3QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas para cerrar el bloque",
    "Si una interfaz se construye con piezas reutilizables, las preguntas útiles ya no apuntan a pantallas sueltas, sino a familias, variantes y coherencia.",
    "Bloque 3"
  );

  addCard(slide, SH, {
    x: 1.08,
    y: 2.46,
    w: 3.18,
    h: 1.64,
    title: "1. Patrón",
    body: "¿Qué señal te muestra que una pieza ya dejó de ser caso aislado y conviene tratarla como componente?",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 14.4,
    bodyFontSize: 10.2,
    bodyYOffset: 0.54,
  });
  addCard(slide, SH, {
    x: 5.08,
    y: 2.46,
    w: 3.18,
    h: 1.64,
    title: "2. Variante",
    body: "¿Cómo distingues una variante legítima de una pieza respecto de una improvisación que rompe la familia?",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14.4,
    bodyFontSize: 10.1,
    bodyYOffset: 0.54,
  });
  addCard(slide, SH, {
    x: 9.08,
    y: 2.46,
    w: 3.18,
    h: 1.64,
    title: "3. Sistema",
    body: "¿Qué parte de un componente siempre conviene validar antes de decir que ya pertenece al sistema visual?",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 14.4,
    bodyFontSize: 10.1,
    bodyYOffset: 0.54,
  });

  addCenterStatement(slide, SH, "Componente maduro = pieza repetible, variable y coherente con una misma lógica visual.", {
    x: 1.24,
    y: 5.32,
    w: 10.7,
    h: 0.76,
    fill: C.softNeutral,
    fontSize: 17.2,
  });

  validateSlide(slide, pptx);
}

function createBlock3ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del bloque",
    "Cuando la interfaz se piensa por componentes, empieza a aparecer una capa de sistema que luego puede sostener tokens, reglas compartidas y mejores decisiones de framework.",
    "Bloque 3"
  );

  addPanel(slide, 1.04, 2.38, 6.34, 2.18, { fill: C.white, line: C.border });
  slide.addText("Una interfaz madura mejora cuando comparte componentes, variantes y estados en vez de volver a inventar cada pieza en cada pantalla.", {
    x: 1.36,
    y: 2.84,
    w: 5.7,
    h: 0.72,
    fontFace: TYPOGRAPHY.display,
    fontSize: 20,
    bold: true,
    color: C.navy,
    align: "center",
    valign: "mid",
    margin: 0,
  });
  addPill(slide, SH, "componente", { x: 1.42, y: 4.04, w: 1.24, fill: C.softBlue, line: C.softBlue, color: C.navy });
  addPill(slide, SH, "variante", { x: 2.9, y: 4.04, w: 1.02, fill: C.paleRed, line: C.paleRed, color: C.red });
  addPill(slide, SH, "estado", { x: 4.14, y: 4.04, w: 0.94, fill: C.warm, line: C.warm, color: C.navy });
  addPill(slide, SH, "consistencia", { x: 5.3, y: 4.04, w: 1.28, fill: C.white, line: C.border, color: C.navy });

  addCard(slide, SH, {
    x: 7.82,
    y: 2.38,
    w: 3.44,
    h: 2.18,
    title: "Puente al Bloque 4",
    body: "Si ya existen piezas compartidas, el siguiente paso es ordenar también sus decisiones base: tokens, reglas y criterio para no depender ciegamente de frameworks.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16,
    bodyFontSize: 10.4,
    bodyYOffset: 0.54,
  });

  addCenterStatement(slide, SH, "Pieza repetible -> familia coherente -> mini sistema -> decisiones más sostenibles", {
    x: 1.22,
    y: 5.42,
    w: 10.2,
    h: 0.72,
    fill: C.warm,
    fontSize: 17,
  });

  validateSlide(slide, pptx);
}

function createSystemTakeawaySlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Idea instalada 3 · un sistema visual estabiliza decisiones y reduce dependencia ciega",
    "Tokens, piezas y reglas compartidas sirven menos para decorar y más para volver la interfaz legible, mantenible y razonable de adaptar.",
    "Cierre"
  );

  addTokenBoard(slide, SH, {
    x: 1.02,
    y: 2.4,
    w: 6.1,
    h: 3.88,
    title: "Lo mínimo que una interfaz gana cuando aparece sistema",
    groups: [
      { title: "Token", tone: C.red, items: [{ label: "--brand", value: "#D62027", swatch: C.red }, { label: "--space", value: "8 / 16 / 24" }] },
      { title: "Pieza", tone: C.navy, fill: C.softBlue, items: [{ label: "card", value: "estructura estable" }, { label: "cta", value: "acción visible" }] },
      { title: "Regla", tone: C.gold, items: [{ label: "uso", value: "cuándo repite" }, { label: "cambio", value: "qué sí varía" }] },
    ],
    footer: 'Sin sistema, cada pantalla recuerda "más o menos". Con sistema, la decisión se vuelve visible.',
  });

  addCard(slide, SH, {
    x: 7.52,
    y: 2.56,
    w: 3.68,
    h: 1.34,
    title: "Ayuda",
    body: "un framework puede acelerar cuando el equipo sigue entendiendo layout, jerarquía y responsive.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 15,
    bodyFontSize: 10.4,
    bodyYOffset: 0.46,
  });
  addCard(slide, SH, {
    x: 7.52,
    y: 4.16,
    w: 3.68,
    h: 1.34,
    title: "Riesgo",
    body: "la dependencia ciega aparece cuando el sistema acelera más rápido de lo que el equipo comprende.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 15,
    bodyFontSize: 10.4,
    bodyYOffset: 0.46,
  });
  addCard(slide, SH, {
    x: 7.52,
    y: 5.76,
    w: 3.68,
    h: 0.52,
    title: "Criterio > herramienta",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 12,
    body: "",
  });

  validateSlide(slide, pptx);
}

function createClassMethodSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Huella metodológica de la clase",
    "Esta sesión deja una práctica moderna bastante clara: entender la interfaz, explicitar intención, apoyarse con inteligencia y validar con evidencia antes de consolidar una decisión.",
    "Cierre"
  );

  addAgenticFlow(slide, SH, {
    x: 0.96,
    y: 2.38,
    w: 11.06,
    h: 3.96,
    title: "Entender -> explicitar -> apoyar -> validar",
    steps: [
      { step: "1", title: "Entender", body: "leer la interfaz, el viewport, la jerarquía y el patrón real", accent: C.red, fill: C.paleRed },
      { step: "2", title: "Intención", body: "decir qué debe cambiar, qué debe mantenerse y qué restricción existe", accent: C.gold, fill: C.warm },
      { step: "3", title: "Apoyo", body: "usar agente o framework para acelerar una primera propuesta", accent: C.navy, fill: C.softBlue },
      { step: "4", title: "Validar", body: "confirmar en navegador, viewport y contexto real antes de consolidar", accent: C.red, fill: C.white },
    ],
    footer: "Apoyo inteligente sin validación = velocidad sin criterio. La clase entera empuja en la dirección contraria.",
  });

  validateSlide(slide, pptx);
}

function createExitQuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas de salida",
    "La clase ya no debería quedar solo en ideas sueltas: conviene salir con preguntas que obliguen a leer mejor la interfaz y no solo a repetir vocabulario.",
    "Cierre"
  );

  addCard(slide, SH, {
    x: 1.08,
    y: 2.48,
    w: 3.18,
    h: 1.74,
    title: "1. Validación",
    body: "¿Qué parte de una adaptación responsiva conviene revisar siempre en pantalla real antes de darla por buena?",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 14.2,
    bodyFontSize: 10.2,
    bodyYOffset: 0.54,
  });
  addCard(slide, SH, {
    x: 5.08,
    y: 2.48,
    w: 3.18,
    h: 1.74,
    title: "2. Patrón",
    body: "¿Cuándo una repetición visual ya te sugiere que debería existir un componente y no otra pantalla resuelta a mano?",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14.2,
    bodyFontSize: 10.1,
    bodyYOffset: 0.54,
  });
  addCard(slide, SH, {
    x: 9.08,
    y: 2.48,
    w: 3.18,
    h: 1.74,
    title: "3. Criterio",
    body: "¿Qué riesgo aparece cuando una interfaz depende demasiado de clases o patrones que nadie entiende bien?",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 14.2,
    bodyFontSize: 10.1,
    bodyYOffset: 0.54,
  });

  addCenterStatement(slide, SH, "Salir de esta clase con criterio significa poder leer mejor qué estás adaptando, qué estás repitiendo y qué parte ya debería volverse sistema.", {
    x: 1.22,
    y: 5.46,
    w: 10.74,
    h: 0.76,
    fill: C.softNeutral,
    fontSize: 17.2,
  });

  validateSlide(slide, pptx);
}

function createNextClassBridgeSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Puente a la siguiente clase",
    "Si una interfaz debe adaptarse, mantenerse y escalar con criterio, entonces también importa medir cómo rinde, qué tan accesible es y qué tan bien está construida desde el punto de vista técnico.",
    "Cierre"
  );

  addMapBlock(slide, 0.98, 2.52, 2.26, 2.24, {
    kicker: "Siguiente foco",
    title: "SEO técnico",
    fill: C.softBlue,
    line: C.softBlue,
    color: C.navy,
    fontSize: 18,
  });
  addArrow(slide, 3.4, 3.54, 0.32, 0.22, C.gold);
  addMapBlock(slide, 3.88, 2.52, 2.26, 2.24, {
    kicker: "Siguiente foco",
    title: "Rendimiento",
    fill: C.paleRed,
    line: C.paleRed,
    color: C.navy,
    fontSize: 18,
  });
  addArrow(slide, 6.3, 3.54, 0.32, 0.22, C.gold);
  addMapBlock(slide, 6.78, 2.52, 2.26, 2.24, {
    kicker: "Siguiente foco",
    title: "Accesibilidad",
    fill: C.warm,
    line: C.warm,
    color: C.navy,
    fontSize: 15.4,
  });
  addArrow(slide, 9.2, 3.54, 0.32, 0.22, C.gold);
  addMapBlock(slide, 9.68, 2.52, 2.26, 2.24, {
    kicker: "Herramienta",
    title: "Auditoría",
    fill: C.white,
    line: C.border,
    color: C.navy,
    fontSize: 18,
  });

  addCenterStatement(slide, SH, "La próxima clase empuja la misma idea desde otro ángulo: no basta con que la interfaz se vea razonable; también debe rendir, ser accesible y poder auditarse con evidencia.", {
    x: 1.1,
    y: 5.36,
    w: 10.84,
    h: 0.86,
    fill: C.softNeutral,
    fontSize: 17.4,
  });

  validateSlide(slide, pptx);
}

function createFinalWorkRuleSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Regla de trabajo para lo que viene",
    "Desde aquí la interfaz ya no solo se compone: también se prueba, se mide y se sostiene con evidencia.",
    "Cierre"
  );

  addPanel(slide, 1.02, 2.36, 3.46, 3.72, { fill: C.navy, line: C.navy });
  addBarsMotif(slide, 1.32, 2.68, 0.82, C.red);
  slide.addText("Diseñar mejor también significa validar mejor.", {
    x: 1.32,
    y: 3.22,
    w: 2.78,
    h: 1.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 23,
    bold: true,
    color: C.white,
    margin: 0,
    valign: "mid",
  });
  slide.addText("Responsive, componentes y sistema visual abren la puerta a una interfaz que ya puede ser medida y auditada con más rigor.", {
    x: 1.32,
    y: 4.88,
    w: 2.8,
    h: 0.62,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.1,
    color: "E8EEF7",
    margin: 0,
  });

  addMiniCard(slide, SH, {
    x: 4.96,
    y: 2.44,
    w: 2.18,
    h: 1.02,
    title: "1. leer contexto",
    body: "viewport, jerarquía y tarea real",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, SH, {
    x: 7.42,
    y: 2.44,
    w: 2.18,
    h: 1.02,
    title: "2. repetir con patrón",
    body: "piezas, estados y reglas comunes",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
  });
  addMiniCard(slide, SH, {
    x: 9.88,
    y: 2.44,
    w: 2.18,
    h: 1.02,
    title: "3. validar con evidencia",
    body: "navegador, pruebas y auditoría",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
  });

  addCenterStatement(slide, SH, "Esa es la transición que sigue: pasar de interfaz razonable a interfaz técnicamente comprobable.", {
    x: 5.04,
    y: 4.16,
    w: 7.04,
    h: 1.18,
    fill: C.white,
    line: C.border,
    fontSize: 19.2,
  });

  addCenterStatement(slide, SH, "La clase siguiente no cambia de tema: profundiza la misma exigencia profesional desde SEO, rendimiento, accesibilidad y auditoría.", {
    x: 5.04,
    y: 5.56,
    w: 7.04,
    h: 0.64,
    fill: C.softNeutral,
    fontSize: 14.6,
  });

  validateSlide(slide, pptx);
}
async function main() {
  createCoverSlide();
  createMapSlide();
  createBlockIntroSlide();
  createSingleScreenSlide();
  createNotShrinkSlide();
  createReflowSlide();
  createViewportSlide();
  createRigidProblemsSlide();
  createPrioritySlide();
  createValidationSlide();
  createAgenticSlide();
  createQuestionsSlide();
  createClosingSlide();
  createBlock2IntroSlide();
  createViewportConditionSlide();
  createBreakpointRealSlide();
  createBreakpointSignalsSlide();
  createRedistributeSlide();
  createLayoutDecisionsSlide();
  createContentDrivenBreakpointsSlide();
  createDevtoolsSlide();
  createObserveChecklistSlide();
  createDefendWideSlide();
  createBlock2AgenticSlide();
  createBlock2QuestionsSlide();
  createBlock2ClosingSlide();
  createBlock3IntroSlide();
  createScreensVsComponentsSlide();
  createComponentDecisionSlide();
  createVariantIdentitySlide();
  createStateSlide();
  createResponsiveComponentSlide();
  createConsistencySlide();
  createRepeatedPiecesSlide();
  createMiniSystemSlide();
  createBlock3AgenticSlide();
  createBlock3QuestionsSlide();
  createBlock3ClosingSlide();
  createBlock4IntroSlide();
  createSystemOrdersDecisionsSlide();
  createSystemLayersSlide();
  createFrameworkHelpsSlide();
  createFrameworkMatrixSlide();
  createFrameworkUnderstandingSlide();
  createDebtVisualSlide();
  createDebtSymptomsSlide();
  createBetterQuestionSlide();
  createBlock4AgenticSlide();
  createSpecDrivenVisualSlide();
  createBlock4QuestionsSlide();
  createBlock4ClosingSlide();
  createClassClosingIntroSlide();
  createClassThreadSlide();
  createResponsiveTakeawaySlide();
  createComponentTakeawaySlide();
  createSystemTakeawaySlide();
  createClassMethodSlide();
  createExitQuestionsSlide();
  createNextClassBridgeSlide();
  createFinalWorkRuleSlide();

  await pptx.writeFile({ fileName: outputPptx });
  fs.copyFileSync(__filename, outputJs);
  console.log(`Deck generado: ${outputPptx}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});



