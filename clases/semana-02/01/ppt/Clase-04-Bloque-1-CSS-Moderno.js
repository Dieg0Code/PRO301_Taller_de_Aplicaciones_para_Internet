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
  addBrowserMock,
  addCascadeInspector,
  addDomTreePanel,
  addBoxModelDiagram,
  addFlexGridLayout,
  addPill,
  addSpecificityScale,
  addTokenBoard,
} = components;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
applyAiepTheme(pptx, {
  author: "Codex",
  company: "AIEP",
  subject: "Clase 04",
  title: "CSS Moderno - Bloque 1",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx =
  process.env.PPTX_OUTPUT ||
  path.join(rootDir, "Clase-04-Bloque-1-CSS-Moderno.pptx");
const outputJs =
  process.env.PPTX_SOURCE_OUTPUT ||
  path.join(rootDir, "Clase-04-Bloque-1-CSS-Moderno.js");

const logoPath = path.resolve(
  __dirname,
  "../../../../../.agent/skills/slides-aiep/assets/logo-aiep.png"
);
const logoMarkPath = path.resolve(
  __dirname,
  "../../../../../.agent/skills/slides-aiep/assets/logo-aiep-mark.png"
);

const MAP_CONTENT_START_Y = 2.24;

function addHeader(slide, title, subtitle, blockLabel = "Bloque 1", pptxLike = pptx) {
  systemAddHeader(slide, SH, pptxLike, title, subtitle, blockLabel, {
    classLabel: `Clase 04 · ${blockLabel}`,
    logoMarkPath,
    subtitleY: 1.76,
    subtitleH: 0.24,
    subtitleFontSize: 11.6,
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

function addPanel(slide, x, y, w, h, opts = {}) {
  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: opts.rectRadius || 0.04,
    fill: { color: opts.fill || C.white },
    line: { color: opts.line || C.border, pt: 1 },
  });
}

function addSectionLabel(slide, x, y, text, fill = C.softNeutral, color = C.navy) {
  slide.addShape(SH.roundRect, {
    x,
    y,
    w: 1.22,
    h: 0.3,
    rectRadius: 0.04,
    fill: { color: fill },
    line: { color: fill },
  });
  slide.addText(text, {
    x: x + 0.08,
    y: y + 0.08,
    w: 1.06,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.9,
    bold: true,
    color,
    align: "center",
    margin: 0,
  });
}

function addBrowserScene(slide, x, y, w, h, variant = "a") {
  addBrowserMock(slide, SH, {
    x,
    y,
    w,
    h,
    url: variant === "a" ? "https://demo.local" : "https://demo.local/cards",
  });

  const innerX = x + 0.2;
  const innerY = y + 0.62;
  const innerW = w - 0.4;
  const heroFill = variant === "a" ? C.navy : C.red;
  const accentFill = variant === "a" ? C.softBlue : C.paleRed;

  slide.addShape(SH.roundRect, {
    x: innerX,
    y: innerY,
    w: innerW,
    h: 0.44,
    rectRadius: 0.03,
    fill: { color: heroFill },
    line: { color: heroFill },
  });
  slide.addText("Página de ejemplo", {
    x: innerX + 0.12,
    y: innerY + 0.12,
    w: innerW - 0.24,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    color: C.white,
    margin: 0,
  });

  if (variant === "a") {
    for (let index = 0; index < 3; index += 1) {
      addPanel(slide, innerX + index * (innerW / 3) + 0.02, innerY + 0.62, innerW / 3 - 0.06, 0.74, {
        fill: index === 1 ? C.softBlue : C.white,
      });
    }
    slide.addShape(SH.roundRect, {
      x: innerX,
      y: innerY + 1.56,
      w: innerW,
      h: 0.5,
      rectRadius: 0.03,
      fill: { color: C.warm },
      line: { color: C.warm },
    });
  } else {
    for (let row = 0; row < 2; row += 1) {
      for (let col = 0; col < 2; col += 1) {
        addPanel(
          slide,
          innerX + col * (innerW / 2) + 0.02,
          innerY + 0.62 + row * 0.7,
          innerW / 2 - 0.05,
          0.56,
          {
            fill: row === 0 && col === 0 ? accentFill : C.white,
          }
        );
      }
    }
    slide.addShape(SH.roundRect, {
      x: innerX + innerW - 1.36,
      y: innerY + 2.04,
      w: 1.16,
      h: 0.34,
      rectRadius: 0.03,
      fill: { color: C.red },
      line: { color: C.red },
    });
  }
}

function addSystemComponentsShowcase(slide, x, y, w, h) {
  const compact = w < 8.4;
  const tight = h < 3.4;
  const tiny = h < 2.4;
  const cardPanelH = tight ? 0.94 : compact ? 0.94 : 1.18;
  const pillY = y + h - (tight ? 0.34 : 0.46);
  const pillH = tight ? 0.24 : 0.28;
  const pillFontSize = tight ? 8.4 : compact ? 8.8 : 9.5;

  addPanel(slide, x, y, w, h, { fill: C.white, line: C.border });
  slide.addText("Componentes alineados por reglas compartidas", {
    x: x + 0.22,
    y: y + 0.18,
    w: w - 0.44,
    h: 0.16,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.8,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  addPanel(slide, x + 0.24, y + 0.56, compact ? 1.9 : 2.08, cardPanelH, { fill: C.white, line: C.border });
  slide.addText("Card base", {
    x: x + 0.42,
    y: y + 0.76,
    w: 1.4,
    h: 0.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.6,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Mismo texto base y mismo radio.", {
    x: x + 0.42,
    y: y + 1.06,
    w: compact ? 1.28 : 1.52,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: compact ? 8.6 : 9.2,
    color: C.slate,
    margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: x + (compact ? 2.24 : 2.56),
    y: y + 0.72,
    w: compact ? 1.22 : 1.4,
    h: 0.44,
    rectRadius: 0.05,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("Acción principal", {
    x: x + (compact ? 2.42 : 2.78),
    y: y + 0.86,
    w: compact ? 0.86 : 0.96,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: compact ? 8.8 : 9.4,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });

  const alertX = x + (compact ? 3.76 : 4.18);
  const alertW = compact ? w - 4.02 : w - 4.42;
  addPanel(slide, alertX, y + 0.56, alertW, 0.54, { fill: C.paleRed, line: C.paleRed });
  slide.addShape(SH.rect, {
    x: alertX,
    y: y + 0.56,
    w: 0.1,
    h: 0.54,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("Alerta: mismo color de acción, misma familia visual.", {
    x: alertX + 0.2,
    y: y + 0.74,
    w: alertW - 0.3,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: compact ? 8.8 : 9.2,
    color: C.navy,
    margin: 0,
  });

  if (!tiny) {
    const fieldX = alertX;
    const fieldW = compact ? 1.74 : 1.98;
    const buttonW = compact ? 1.08 : 1.24;
    const buttonX = x + w - buttonW - 0.24;

    slide.addText("Correo", {
      x: fieldX,
      y: y + 1.36,
      w: 1.16,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.8,
      color: C.navy,
      margin: 0,
    });
    slide.addShape(SH.roundRect, {
      x: fieldX,
      y: y + 1.54,
      w: fieldW,
      h: 0.34,
      rectRadius: 0.04,
      fill: { color: C.white },
      line: { color: C.border, pt: 1 },
    });
    slide.addShape(SH.roundRect, {
      x: buttonX,
      y: y + 1.5,
      w: buttonW,
      h: 0.42,
      rectRadius: 0.05,
      fill: { color: C.red },
      line: { color: C.red },
    });
    slide.addText("Enviar", {
      x: buttonX + 0.18,
      y: y + 1.64,
      w: buttonW - 0.36,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: compact ? 8.8 : 9.2,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    });
  }

  addPill(slide, SH, "--color-primario", {
    x: x + 0.3,
    y: pillY,
    w: compact ? 1.36 : 1.54,
    h: pillH,
    fill: C.paleRed,
    line: C.paleRed,
    color: C.red,
    fontSize: pillFontSize,
  });
  addPill(slide, SH, "--radio-md", {
    x: x + (compact ? 1.82 : 2.04),
    y: pillY,
    w: compact ? 1.0 : 1.1,
    h: pillH,
    fill: C.softBlue,
    line: C.softBlue,
    color: C.navy,
    fontSize: pillFontSize,
  });
  addPill(slide, SH, "--text-main", {
    x: x + (compact ? 2.98 : 3.32),
    y: pillY,
    w: compact ? 1.12 : 1.24,
    h: pillH,
    fill: C.softNeutral,
    line: C.softNeutral,
    color: C.navy,
    fontSize: pillFontSize,
  });
}

function addCompactViewportCompare(slide, x, y, w, h, opts = {}) {
  addPanel(slide, x, y, w, h, { fill: C.white, line: C.border });
  const innerPad = 0.18;
  const gap = 0.26;
  const cardW = (w - innerPad * 2 - gap) / 2;
  const cardH = h - 0.74;
  const cardY = y + 0.56;
  const compact = h <= 2.3;
  const dense = h <= 2.9;
  const wireframeH = compact ? 0.46 : dense ? 0.56 : 0.74;
  const noteCount = compact ? 2 : 3;
  const pillW = compact ? 0.88 : 0.96;
  slide.addShape(SH.roundRect, {
    x: x + 0.14,
    y: y + 0.14,
    w: w - 0.28,
    h: 0.34,
    rectRadius: 0.03,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText(opts.title || "Comparación de layout", {
    x: x + 0.26,
    y: y + 0.24,
    w: w - 0.52,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.2,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  const leftX = x + innerPad;
  const rightX = x + w - innerPad - cardW;

  [
    {
      x: leftX,
      label: opts.leftLabel || "Móvil",
      size: opts.leftSize || "390 px",
      notes: opts.leftNotes || ["una columna", "prioridad al CTA", "lectura vertical"],
      tone: C.red,
      toneFill: C.paleRed,
    },
    {
      x: rightX,
      label: opts.rightLabel || "Desktop",
      size: opts.rightSize || "1280 px",
      notes: opts.rightNotes || ["columnas", "más contexto", "mejor uso del ancho"],
      tone: C.navy,
      toneFill: C.softBlue,
    },
  ].forEach((card) => {
    addPanel(slide, card.x, cardY, cardW, cardH, { fill: C.white, line: C.border });
    slide.addText(card.label, {
      x: card.x + 0.12,
      y: cardY + 0.16,
      w: 1.32,
      h: 0.18,
      fontFace: TYPOGRAPHY.display,
      fontSize: compact ? 15.6 : 17,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    addPill(slide, SH, card.size, {
      x: card.x + cardW - pillW - 0.12,
      y: cardY + 0.14,
      w: pillW,
      h: 0.34,
      fill: card.toneFill,
      line: card.toneFill,
      color: card.tone,
      fontSize: 10,
    });

    const screenX = card.x + 0.12;
    const screenY = cardY + 0.56;
    const screenW = cardW - 0.24;

    slide.addShape(SH.roundRect, {
      x: screenX,
      y: screenY,
      w: screenW,
      h: wireframeH,
      rectRadius: 0.02,
      fill: { color: C.paper },
      line: { color: C.border },
    });
    slide.addShape(SH.rect, {
      x: screenX + 0.08,
      y: screenY + 0.08,
      w: screenW - 0.16,
      h: compact ? 0.12 : 0.16,
      fill: { color: card.tone },
      line: { color: card.tone },
    });
    slide.addShape(SH.roundRect, {
      x: screenX + 0.08,
      y: screenY + (compact ? 0.28 : 0.34),
      w: compact ? screenW * 0.34 : screenW * 0.38,
      h: compact ? 0.12 : 0.18,
      rectRadius: 0.02,
      fill: { color: card.toneFill },
      line: { color: card.toneFill },
    });
    slide.addShape(SH.roundRect, {
      x: screenX + screenW * (compact ? 0.56 : 0.48),
      y: screenY + (compact ? 0.28 : 0.34),
      w: compact ? screenW * 0.24 : screenW * 0.34,
      h: compact ? 0.12 : 0.18,
      rectRadius: 0.02,
      fill: { color: C.white },
      line: { color: C.border },
    });

    const visibleNotes = card.notes.slice(0, noteCount);
    for (let index = 0; index < visibleNotes.length; index += 1) {
      slide.addShape(SH.ellipse, {
        x: card.x + 0.12,
        y: screenY + wireframeH + 0.14 + index * 0.22,
        w: 0.05,
        h: 0.05,
        fill: { color: card.tone },
        line: { color: card.tone },
      });
      slide.addText(visibleNotes[index], {
        x: card.x + 0.24,
        y: screenY + wireframeH + 0.12 + index * 0.22,
        w: cardW - 0.34,
        h: 0.12,
        fontFace: TYPOGRAPHY.body,
        fontSize: compact ? 8.8 : 9.2,
        color: C.slate,
        margin: 0,
      });
    }
  });

  addArrow(slide, x + w / 2 - 0.14, y + h / 2 - 0.08, 0.22, 0.26, C.gold);
}

function createCoverSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };

  slide.addShape(SH.rect, {
    x: 0.66,
    y: 1.04,
    w: 0.12,
    h: 5.1,
    fill: { color: C.red },
    line: { color: C.red },
  });
  addBarsMotif(slide, 0.74, 0.9, 1.68, C.red);

  addPanel(slide, 9.05, 0.8, 3.55, 1.24, {
    fill: C.white,
    line: C.white,
    rectRadius: 0.05,
  });
  slide.addImage({
    path: logoPath,
    ...imageSizingContain(logoPath, 9.22, 0.94, 3.2, 0.94),
  });

  slide.addText("Clase 04 · Semana 02", {
    x: 1.06,
    y: 1.5,
    w: 2.8,
    h: 0.3,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12,
    bold: true,
    color: C.sand,
    margin: 0,
  });
  slide.addText("CSS moderno", {
    x: 1.02,
    y: 2.02,
    w: 4.9,
    h: 0.6,
    fontFace: TYPOGRAPHY.display,
    fontSize: 28,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Cascada, variables,\nFlexbox y Grid", {
    x: 1.04,
    y: 2.8,
    w: 4.8,
    h: 0.86,
    fontFace: TYPOGRAPHY.display,
    fontSize: 22,
    bold: true,
    color: C.sand,
    margin: 0,
  });
  slide.addText("Bloque 1 · CSS como sistema de reglas, no como maquillaje", {
    x: 1.04,
    y: 4.02,
    w: 4.9,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14,
    color: C.sand,
    margin: 0,
  });

  addPanel(slide, 1.04, 5.04, 2.92, 0.82, {
    fill: "295596",
    line: "295596",
  });
  addPanel(slide, 4.18, 5.04, 3.82, 0.82, {
    fill: C.paleRed,
    line: C.paleRed,
  });
  slide.addText("Lunes 23 de marzo de 2026\n10:00 - 13:00", {
    x: 1.22,
    y: 5.23,
    w: 2.5,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11,
    color: C.white,
    margin: 0,
  });
  slide.addText("La capa visual también se diseña con criterio técnico.", {
    x: 4.42,
    y: 5.28,
    w: 3.34,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });
}

function buildMapSlideBody(slide) {
  addHeader(slide, "Mapa de la clase", "Hoy CSS aparece como lenguaje de reglas, conflicto, sistema y distribución.");

  const blocks = [
    {
      x: 0.8,
      fill: C.red,
      line: C.red,
      color: C.white,
      title: "Bloque 1",
      body: "CSS como sistema de reglas",
    },
    {
      x: 3.08,
      fill: C.white,
      line: C.border,
      color: C.navy,
      title: "Bloque 2",
      body: "Cascada, herencia y especificidad",
    },
    {
      x: 5.36,
      fill: C.softNeutral,
      line: C.softNeutral,
      color: C.navy,
      title: "Bloque 3",
      body: "Variables y consistencia visual",
    },
    {
      x: 7.64,
      fill: C.softBlue,
      line: C.softBlue,
      color: C.navy,
      title: "Bloque 4",
      body: "Flexbox y Grid",
    },
  ];

  const mapY = MAP_CONTENT_START_Y;
  const cardH = 2.12;

  blocks.forEach((block, index) => {
    addPanel(slide, block.x, mapY, 2.02, cardH, {
      fill: block.fill,
      line: block.line,
    });
    slide.addText(block.title, {
      x: block.x + 0.16,
      y: mapY + 0.2,
      w: 1.7,
      h: 0.16,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10,
      bold: true,
      color: block.color,
      align: "center",
      margin: 0,
    });
    slide.addText(block.body, {
      x: block.x + 0.16,
      y: mapY + 0.78,
      w: 1.7,
      h: 0.56,
      fontFace: TYPOGRAPHY.display,
      fontSize: index === 1 ? 15 : 16,
      bold: true,
      color: block.color,
      align: "center",
      valign: "mid",
      margin: 0,
    });
  });

  addArrow(slide, 2.88, mapY + 0.94, 0.22, 0.24, C.gold);
  addArrow(slide, 5.16, mapY + 0.94, 0.22, 0.24, C.gold);
  addArrow(slide, 7.44, mapY + 0.94, 0.22, 0.24, C.gold);

  addCenterStatement(
    slide,
    SH,
    "Reglas → conflicto → consistencia → layout",
    { x: 1.4, y: 4.96, w: 10.5, h: 0.74, fill: C.warm, fontSize: 22 }
  );

  validateSlide(slide, pptx);
}

function createMapSlide() {
  const slide = pptx.addSlide();
  buildMapSlideBody(slide);
  return slide;
}

function createBlockIntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Bloque 1 · CSS como sistema de reglas",
    "La idea central es simple: la apariencia también se construye con lógica técnica."
  );

  addPanel(slide, 0.9, 2.34, 4.06, 3.32, { fill: C.navy, line: C.navy });
  addBarsMotif(slide, 1.18, 2.64, 0.8, C.red);
  slide.addText("CSS organiza\npresentación,\njerarquía y\nespacio.", {
    x: 1.18,
    y: 3.4,
    w: 2.6,
    h: 1.42,
    fontFace: TYPOGRAPHY.display,
    fontSize: 24,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addPill(slide, SH, "<selector>", { x: 1.18, y: 5.08, w: 1.08, fill: C.paleRed, line: C.paleRed, color: C.red });
  addPill(slide, SH, "<propiedad>", { x: 2.4, y: 5.08, w: 1.22, fill: C.softBlue, line: C.softBlue, color: C.navy });
  addPill(slide, SH, "<valor>", { x: 3.74, y: 5.08, w: 0.98, fill: C.softNeutral, line: C.softNeutral, color: C.navy });

  addBrowserScene(slide, 5.36, 2.44, 4.08, 2.48, "b");
  addCard(slide, SH, {
    x: 9.72,
    y: 2.46,
    w: 2.12,
    h: 0.82,
    title: "Reglas",
    body: "La interfaz visible nace desde declaraciones concretas.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addCard(slide, SH, {
    x: 9.72,
    y: 3.46,
    w: 2.12,
    h: 0.82,
    title: "Jerarquía",
    body: "No todo pesa igual ni todo debería escribirse al azar.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
  });
  addCard(slide, SH, {
    x: 9.72,
    y: 4.46,
    w: 2.12,
    h: 0.82,
    title: "Espacio",
    body: "CSS también decide cómo se ordena lo que aparece en pantalla.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
  });

  validateSlide(slide, pptx);
}

function createHtmlVsCssSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "HTML estructura, CSS presenta",
    "La misma página necesita una capa para significado y otra para presentación."
  );

  addCard(slide, SH, {
    x: 0.9,
    y: 2.34,
    w: 4.04,
    h: 3.24,
    title: "HTML",
    body: "Define qué es cada parte del documento: títulos, secciones, formularios, navegación y contenido principal.",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 22,
    bodyFontSize: 13,
  });
  addCard(slide, SH, {
    x: 5.12,
    y: 2.34,
    w: 4.04,
    h: 3.24,
    title: "CSS",
    body: "Define cómo se ve esa estructura: color, tamaño, espaciado, alineación, distribución y estados visuales.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 22,
    bodyFontSize: 13,
  });

  addArrow(slide, 4.98, 3.6, 0.16, 0.26, C.gold);

  addPanel(slide, 9.48, 2.42, 2.86, 1.16, { fill: C.white, line: C.border });
  addSectionLabel(slide, 9.72, 2.66, "Estructura", C.paleRed, C.red);
  addSectionLabel(slide, 10.98, 2.66, "Presentación", C.softBlue, C.navy);
  slide.addText("Una organiza contenido.\nLa otra organiza apariencia.", {
    x: 9.76,
    y: 3.1,
    w: 2.3,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.2,
    color: C.ink,
    align: "center",
    margin: 0,
  });

  addCenterStatement(slide, SH, "Separar estructura y presentación mejora lectura, corrección y mantenimiento.", {
    x: 1.18,
    y: 5.72,
    w: 10.94,
    h: 0.52,
    fill: C.softNeutral,
    fontSize: 16.5,
  });

  validateSlide(slide, pptx);
}

function createPipelineSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Del contenido a la interfaz",
    "La apariencia final no aparece por magia: nace de una estructura y de reglas escritas sobre ella."
  );

  addCard(slide, SH, {
    x: 0.92,
    y: 2.44,
    w: 2.4,
    h: 1.18,
    title: "Contenido",
    body: "Texto, acciones, bloques y jerarquía del documento.",
    fill: C.white,
    line: C.border,
    accent: C.red,
  });
  addArrow(slide, 3.44, 2.96, 0.3, 0.28, C.red);
  addMiniCard(slide, SH, {
    x: 3.86,
    y: 2.36,
    w: 2.9,
    h: 1.62,
    title: "Reglas CSS",
    body: "Selectores, propiedades y valores convierten intención visual en instrucciones.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14.5,
  });
  addArrow(slide, 6.94, 2.96, 0.3, 0.28, C.gold);

  addBrowserScene(slide, 7.4, 2.28, 4.06, 2.86, "a");

  addCenterStatement(slide, SH, "Una interfaz bien resuelta no es solo bonita: es una consecuencia de decisiones legibles.", {
    x: 1.26,
    y: 5.66,
    w: 10.82,
    h: 0.58,
    fill: C.warm,
    fontSize: 17.5,
  });

  validateSlide(slide, pptx);
}

function createRuleAnatomySlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Anatomía de una regla CSS",
    "Cada cambio visible responde a una declaración concreta que el navegador puede leer y aplicar."
  );

  const codeX = 0.9;
  const codeY = 2.34;
  const codeW = 5.1;
  const codeH = 3.72;

  addCodePanel(slide, SH, {
    x: codeX,
    y: codeY,
    w: codeW,
    h: codeH,
    title: "Regla básica",
    code: "h1 {\n  color: #102a43;\n  font-size: 32px;\n}",
    lang: "css",
    fontSize: 11.2,
  });

  const selectorTarget = { x: 7.16, y: 2.48, w: 2.18, h: 0.92, side: "left" };
  const propertyTarget = { x: 7.16, y: 3.54, w: 2.18, h: 0.92, side: "left" };
  const valueTarget = { x: 9.62, y: 3.02, w: 2.04, h: 1.2, side: "left" };
  const anatomyAnnotations = [
    {
      totalLines: 4,
      lineNumber: 1,
      column: 1,
      length: 2,
      color: C.red,
      target: selectorTarget,
      routeY: 2.96,
    },
    {
      totalLines: 4,
      lineNumber: 2,
      column: 3,
      length: 5,
      color: C.navy,
      target: propertyTarget,
      routeY: 4.06,
    },
    {
      totalLines: 4,
      lineNumber: 2,
      column: 10,
      length: 7,
      color: C.gold,
      target: valueTarget,
      routeY: 4.5,
    },
  ];

  addMiniCard(slide, SH, {
    ...selectorTarget,
    title: "selector",
    body: "Indica a qué elemento apunta la regla.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
  });
  addMiniCard(slide, SH, {
    ...propertyTarget,
    title: "propiedad",
    body: "Define qué aspecto se quiere controlar.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addCard(slide, SH, {
    ...valueTarget,
    title: "valor",
    body: "Expresa con qué criterio se aplica esa propiedad visual.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 17,
    bodyFontSize: 11.6,
  });

  anatomyAnnotations.forEach((annotation) => {
    addCodeAnnotation(slide, SH, {
      codeX,
      codeY,
      codeW,
      codeH,
      fontSize: 11.2,
      connectorColor: C.guide,
      sourceBadgeStyle: "port",
      targetBadgeStyle: "none",
      ...annotation,
    });
  });

  validateSlide(slide, pptx);
}

function createSameStructureSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La misma estructura puede verse distinto",
    "Cambiar presentación no cambia el significado estructural del documento."
  );

  addBrowserScene(slide, 0.92, 2.3, 5.2, 3.28, "a");
  addBrowserScene(slide, 7.18, 2.3, 5.2, 3.28, "b");

  addSectionLabel(slide, 2.62, 5.74, "Versión A", C.softBlue, C.navy);
  addSectionLabel(slide, 8.88, 5.74, "Versión B", C.paleRed, C.red);

  addCenterStatement(slide, SH, "Si el HTML sigue diciendo lo mismo, la presentación puede cambiar sin romper el significado.", {
    x: 1.34,
    y: 6.18,
    w: 10.64,
    h: 0.44,
    fill: C.softNeutral,
    fontSize: 15.5,
  });

  validateSlide(slide, pptx);
}

function createNotDecorationSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "CSS no es decoración: es sistema",
    "Pensar solo en lo 'bonito' es quedarse corto frente al papel real de la capa visual."
  );

  addCenterStatement(slide, SH, "CSS define instrucciones visuales, no adornos sueltos.", {
    x: 1.02,
    y: 2.38,
    w: 8.8,
    h: 1.18,
    fill: C.paleRed,
    fontSize: 24,
  });

  addMiniCard(slide, SH, {
    x: 1.16,
    y: 3.96,
    w: 3.04,
    h: 1.08,
    title: "reglas",
    body: "Cada cambio visual debería poder leerse y rastrearse.",
    fill: C.white,
    line: C.border,
    accent: C.red,
  });
  addMiniCard(slide, SH, {
    x: 4.56,
    y: 3.96,
    w: 3.04,
    h: 1.08,
    title: "jerarquía",
    body: "Las decisiones visuales conviven y se resuelven con lógica.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, SH, {
    x: 7.96,
    y: 3.96,
    w: 3.04,
    h: 1.08,
    title: "distribución",
    body: "La apariencia también ordena espacio, lectura y recorrido.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
  });

  validateSlide(slide, pptx);
}

function createConsistencySlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Una interfaz consistente no sale por accidente",
    "Color, espaciado y jerarquía visual también forman parte del trabajo técnico."
  );

  const items = [
    { x: 0.92, title: "Color", body: "Evita señales visuales contradictorias.", fill: C.paleRed, accent: C.red },
    { x: 3.1, title: "Espaciado", body: "Da ritmo y ordena la lectura.", fill: C.white, accent: C.navy },
    { x: 5.28, title: "Jerarquía", body: "Ayuda a distinguir lo importante.", fill: C.softBlue, accent: C.navy },
    { x: 7.46, title: "Estados", body: "Hace visible cuándo algo actúa, cambia o espera.", fill: C.warm, accent: C.gold },
    { x: 9.64, title: "Distribución", body: "Alinea componentes con más control.", fill: C.white, accent: C.red },
  ];

  items.forEach((item) => {
    addMiniCard(slide, SH, {
      x: item.x,
      y: 2.28,
      w: 1.88,
      h: 1.5,
      title: item.title,
      body: item.body,
      fill: item.fill,
      line: item.fill === C.white ? C.border : item.fill,
      accent: item.accent,
      titleFontSize: 13.2,
      bodyFontSize: 10.1,
    });
  });

  addCenterStatement(slide, SH, "La coherencia visual también se diseña: no aparece sola porque sí.", {
    x: 1.16,
    y: 4.4,
    w: 10.7,
    h: 0.68,
    fill: C.softNeutral,
    fontSize: 18,
  });

  addSpecificityScale(slide, SH, {
    x: 2.16,
    y: 5.26,
    w: 8.96,
    h: 1.14,
    title: "Reglas legibles, decisiones consistentes",
    subtitle: "un buen CSS combina claridad local con criterio global",
    entries: [
      { label: "Color", value: "misma paleta", weightLabel: "señal estable", scale: 0.44 },
      { label: "Espacio", value: "mismo ritmo", weightLabel: "bloques respirables", scale: 0.62 },
      { label: "Layout", value: "reglas claras", weightLabel: "más control", scale: 0.86, active: true },
    ],
  });

  validateSlide(slide, pptx);
}

function createImprovisationVsSystemSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Improvisación visual vs sistema visual",
    "La diferencia no es solo estética: también cambia cuánto cuesta mantener una interfaz."
  );

  addPanel(slide, 0.92, 2.28, 5.26, 3.58, { fill: C.white, line: C.border });
  addPanel(slide, 7.14, 2.28, 5.26, 3.58, { fill: C.softBlue, line: C.softBlue });
  addSectionLabel(slide, 1.18, 2.54, "Improvisación", C.paleRed, C.red);
  addSectionLabel(slide, 7.4, 2.54, "Sistema", C.softNeutral, C.navy);

  addBrowserScene(slide, 1.2, 2.98, 4.68, 2.14, "b");
  slide.addShape(SH.roundRect, {
    x: 1.52,
    y: 5.24,
    w: 1.02,
    h: 0.24,
    rectRadius: 0.03,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addShape(SH.roundRect, {
    x: 2.74,
    y: 5.2,
    w: 0.9,
    h: 0.3,
    rectRadius: 0.03,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addShape(SH.roundRect, {
    x: 3.86,
    y: 5.26,
    w: 1.18,
    h: 0.2,
    rectRadius: 0.03,
    fill: { color: C.gold },
    line: { color: C.gold },
  });

  addBrowserScene(slide, 7.42, 2.98, 4.68, 2.14, "a");
  for (let index = 0; index < 3; index += 1) {
    addPill(slide, SH, `regla ${index + 1}`, {
      x: 7.6 + index * 1.22,
      y: 5.22,
      w: 1.02,
      fill: index === 0 ? C.paleRed : index === 1 ? C.softBlue : C.warm,
      line: index === 0 ? C.paleRed : index === 1 ? C.softBlue : C.warm,
      color: index === 0 ? C.red : C.navy,
    });
  }

  validateSlide(slide, pptx);
}

function createTechnicalJudgmentSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "CSS también expresa criterio técnico",
    "Una hoja de estilos ordenada comunica intención, alcance y control sobre la interfaz."
  );

  addPanel(slide, 0.92, 2.28, 3.3, 3.68, { fill: C.white, line: C.border });
  slide.addText("Trabajar con criterio implica", {
    x: 1.2,
    y: 2.58,
    w: 2.64,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17.5,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  ["alcance de reglas", "reutilización razonable", "coherencia entre componentes", "control de complejidad"].forEach(
    (text, index) => {
      addMiniCard(slide, SH, {
        x: 1.16,
        y: 3.12 + index * 0.62,
        w: 2.76,
        h: 0.46,
        title: text,
        fill: index % 2 === 0 ? C.paleRed : C.softBlue,
        line: index % 2 === 0 ? C.paleRed : C.softBlue,
        accent: index % 2 === 0 ? C.red : C.navy,
        titleFontSize: 11.2,
      });
    }
  );

  addCard(slide, SH, {
    x: 4.58,
    y: 2.28,
    w: 3.42,
    h: 3.68,
    title: "Leer CSS mejor",
    body: "No se trata de mover propiedades al azar hasta que algo parezca funcionar. Se trata de entender qué regla actúa, qué decisión se repite y qué conviene centralizar.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 20,
    bodyFontSize: 12.4,
  });

  addPanel(slide, 8.34, 2.28, 3.76, 3.68, { fill: C.navy, line: C.navy });
  addBarsMotif(slide, 8.68, 2.66, 0.9, C.red);
  slide.addText("Una interfaz\nordenada se\nmantiene mejor.", {
    x: 8.72,
    y: 3.34,
    w: 2.64,
    h: 1.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 22,
    bold: true,
    color: C.white,
    margin: 0,
  });

  validateSlide(slide, pptx);
}

function createRecapSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Lectura mental útil del bloque",
    "La presentación visual empieza a verse mejor cuando se la piensa como sistema."
  );

  addMiniCard(slide, SH, {
    x: 1.02,
    y: 2.44,
    w: 2.26,
    h: 1.06,
    title: "estructura",
    body: "HTML define qué es cada parte.",
    fill: C.white,
    line: C.border,
    accent: C.red,
  });
  addArrow(slide, 3.42, 2.84, 0.3, 0.26, C.red);
  addMiniCard(slide, SH, {
    x: 3.84,
    y: 2.44,
    w: 2.26,
    h: 1.06,
    title: "reglas",
    body: "CSS declara cómo debería verse.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addArrow(slide, 6.24, 2.84, 0.3, 0.26, C.gold);
  addMiniCard(slide, SH, {
    x: 6.66,
    y: 2.44,
    w: 2.26,
    h: 1.06,
    title: "coherencia",
    body: "Las decisiones repetidas se vuelven sistema.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
  });
  addArrow(slide, 9.06, 2.84, 0.3, 0.26, C.red);
  addMiniCard(slide, SH, {
    x: 9.48,
    y: 2.44,
    w: 2.26,
    h: 1.06,
    title: "interfaz",
    body: "El resultado visible se vuelve más legible.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
  });

  addCenterStatement(slide, SH, "La apariencia final es consecuencia de reglas que pueden leerse, compararse y mantenerse.", {
    x: 1.08,
    y: 4.22,
    w: 10.84,
    h: 0.8,
    fill: C.softNeutral,
    fontSize: 19,
  });

  validateSlide(slide, pptx);
}

function createQuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas guía del bloque",
    "Estas preguntas ayudan a fijar la idea de CSS como sistema, no solo como capa decorativa."
  );

  const questions = [
    "¿Por qué HTML y CSS no deberían entenderse como si cumplieran la misma función?",
    "¿Qué cambia cuando CSS se lee como lenguaje de reglas y no solo como decoración?",
    "¿Por qué una interfaz coherente también refleja criterio técnico?",
    "¿Qué señales muestran que una capa visual está improvisada y no pensada como sistema?",
  ];

  questions.forEach((question, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const fill = index % 2 === 0 ? C.white : C.softBlue;
    const line = index % 2 === 0 ? C.border : C.softBlue;
    const accent = index % 2 === 0 ? C.red : C.navy;
    addCard(slide, SH, {
      x: 1 + col * 5.6,
      y: 2.32 + row * 1.68,
      w: 5.0,
      h: 1.32,
      title: `Pregunta ${index + 1}`,
      body: question,
      fill,
      line,
      accent,
      titleFontSize: 17,
      bodyFontSize: 12,
    });
  });

  validateSlide(slide, pptx);
}

function createClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del bloque",
    "La capa visual deja de verse superficial cuando empezamos a leerla como sistema técnico."
  );

  addPanel(slide, 0.92, 2.28, 6.2, 3.14, { fill: C.white, line: C.border });
  slide.addText("Idea clave", {
    x: 1.18,
    y: 2.52,
    w: 1.2,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    color: C.red,
    margin: 0,
  });
  slide.addText(
    "CSS no maquilla una página terminada: define reglas de presentación sobre una estructura HTML previa y convierte la apariencia en una capa legible, repetible y mantenible.",
    {
      x: 1.18,
      y: 3.26,
      w: 5.66,
      h: 1.3,
      fontFace: TYPOGRAPHY.display,
      fontSize: 18.4,
      bold: true,
      color: C.navy,
      margin: 0,
    }
  );
  ["estructura", "reglas", "coherencia", "criterio"].forEach((text, index) => {
    addPill(slide, SH, text, {
      x: 1.22 + index * 1.28,
      y: 4.78,
      w: 1.02,
      fill: index === 0 ? C.paleRed : index === 1 ? C.softBlue : index === 2 ? C.warm : C.white,
      line: index === 3 ? C.border : index === 0 ? C.paleRed : index === 1 ? C.softBlue : C.warm,
      color: index === 0 ? C.red : C.navy,
    });
  });

  addCard(slide, SH, {
    x: 7.48,
    y: 2.28,
    w: 4.2,
    h: 3.14,
    title: "Puente al bloque 2",
    body: "En el siguiente tramo veremos por qué algunas reglas se aplican, otras compiten y otras terminan desplazadas: entramos a cascada, herencia y especificidad.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 19,
    bodyFontSize: 12.6,
  });

  validateSlide(slide, pptx);
}

function createBlock2IntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Bloque 2 · Cascada, herencia y especificidad",
    "Ahora importa entender por qué una regla gana, otra se hereda y otra termina desplazada.",
    "Bloque 2"
  );

  addPanel(slide, 0.92, 2.32, 3.8, 3.56, { fill: C.navy, line: C.navy });
  addBarsMotif(slide, 1.24, 2.64, 0.82, C.red);
  slide.addText("CSS resuelve\nconflictos,\npropaga reglas\ny pesa selectores.", {
    x: 1.2,
    y: 3.24,
    w: 2.82,
    h: 1.68,
    fontFace: TYPOGRAPHY.display,
    fontSize: 23,
    bold: true,
    color: C.white,
    margin: 0,
  });

  addCascadeInspector(slide, SH, {
    x: 4.98,
    y: 2.36,
    w: 6.74,
    h: 2.78,
    title: "Conflicto resuelto",
    elementLabel: "p.destacado",
    propertyLabel: "Propiedad observada",
    propertyValue: "color",
    rules: [
      { selector: "p", declaration: "color: #52606d;", specificity: "0,0,1", reason: "pierde por peso" },
      {
        selector: ".destacado",
        declaration: "color: #d62027;",
        specificity: "0,1,0",
        reason: "más específica",
        active: true,
      },
    ],
    resolvedValue: "#d62027",
    resultNote: "",
  });

  addMiniCard(slide, SH, {
    x: 5.02,
    y: 5.36,
    w: 1.92,
    h: 0.82,
    title: "cascada",
    body: "ordena conflictos",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
  });
  addMiniCard(slide, SH, {
    x: 7.16,
    y: 5.36,
    w: 1.92,
    h: 0.82,
    title: "herencia",
    body: "propaga decisiones",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, SH, {
    x: 9.3,
    y: 5.36,
    w: 2.2,
    h: 0.82,
    title: "especificidad",
    body: "define peso relativo",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
  });

  validateSlide(slide, pptx);
}

function createCascadeCoreSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La cascada: CSS no decide al azar",
    "Si varias reglas apuntan a lo mismo, el navegador necesita una lógica para resolver el resultado.",
    "Bloque 2"
  );

  addCenterStatement(slide, SH, "Cuando dos reglas afectan la misma propiedad, CSS no falla: compara contexto y decide.", {
    x: 1.06,
    y: 2.34,
    w: 10.86,
    h: 0.9,
    fill: C.paleRed,
    fontSize: 22,
  });

  const factors = [
    { x: 1.0, title: "Origen", body: "importa de dónde viene la regla.", fill: C.white, accent: C.red },
    { x: 3.82, title: "Orden", body: "si el peso empata, la última suele ganar.", fill: C.softBlue, accent: C.navy },
    { x: 6.64, title: "Peso", body: "la especificidad cambia la jerarquía.", fill: C.warm, accent: C.gold },
    { x: 9.46, title: "Herencia", body: "algunas propiedades llegan desde arriba.", fill: C.white, accent: C.red },
  ];

  factors.forEach((item) => {
    addCard(slide, SH, {
      x: item.x,
      y: 3.66,
      w: 2.38,
      h: 1.74,
      title: item.title,
      body: item.body,
      fill: item.fill,
      line: item.fill === C.white ? C.border : item.fill,
      accent: item.accent,
      titleFontSize: 17.2,
      bodyFontSize: 11.2,
    });
  });

  addCenterStatement(slide, SH, "Trabajar mejor con CSS significa leer cómo conviven las reglas, no acumular propiedades al azar.", {
    x: 1.24,
    y: 5.76,
    w: 10.52,
    h: 0.56,
    fill: C.softNeutral,
    fontSize: 16.8,
  });

  validateSlide(slide, pptx);
}

function createCascadeConflictSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Dos reglas pueden competir sobre el mismo elemento",
    "La cascada aparece justo cuando una misma propiedad recibe más de una declaración posible.",
    "Bloque 2"
  );

  addCodePanel(slide, SH, {
    x: 0.92,
    y: 2.34,
    w: 4.58,
    h: 3.78,
    title: "Conflicto básico",
    code: "p {\n  color: #52606d;\n}\n\n.destacado {\n  color: #d62027;\n}",
    lang: "css",
    fontSize: 10.8,
  });

  addCascadeInspector(slide, SH, {
    x: 5.76,
    y: 2.3,
    w: 6.0,
    h: 3.86,
    title: "Inspector de cascada",
    elementLabel: "p.destacado",
    propertyLabel: "Propiedad observada",
    propertyValue: "color",
    rules: [
      { selector: "p", declaration: "color: #52606d;", specificity: "0,0,1", reason: "menos precisa" },
      {
        selector: ".destacado",
        declaration: "color: #d62027;",
        specificity: "0,1,0",
        reason: "gana por clase",
        active: true,
      },
    ],
    resolvedValue: "#d62027",
    resultNote: "el párrafo sigue siendo p, pero la clase domina el color",
  });

  validateSlide(slide, pptx);
}

function createOrderMattersSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Si el peso empata, el orden también decide",
    "No siempre gana la regla más compleja: a veces el resultado depende simplemente de cuál aparece después.",
    "Bloque 2"
  );

  addCard(slide, SH, {
    x: 0.96,
    y: 2.34,
    w: 3.1,
    h: 1.9,
    title: "Primera regla",
    body: ".card p { color: #102a43; }",
    fill: C.white,
    line: C.border,
    accent: C.navy,
    titleFontSize: 18,
    bodyFontSize: 12.2,
  });
  addArrow(slide, 4.24, 3.06, 0.34, 0.28, C.red);
  addCard(slide, SH, {
    x: 4.74,
    y: 2.34,
    w: 3.1,
    h: 1.9,
    title: "Segunda regla",
    body: ".card p { color: #d62027; }",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 18,
    bodyFontSize: 12.2,
  });

  addCard(slide, SH, {
    x: 8.04,
    y: 2.34,
    w: 3.72,
    h: 1.9,
    title: "Lectura útil",
    body: "Si selector y propiedad son iguales, la regla posterior suele imponerse sobre la anterior.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 18,
    bodyFontSize: 11.8,
  });

  addCenterStatement(slide, SH, "Antes de subir la complejidad del selector, conviene revisar si el conflicto viene solo del orden.", {
    x: 1.22,
    y: 4.9,
    w: 10.56,
    h: 0.72,
    fill: C.warm,
    fontSize: 18.2,
  });

  addSpecificityScale(slide, SH, {
    x: 2.42,
    y: 5.78,
    w: 8.12,
    h: 0.92,
    title: "Empate de peso",
    entries: [
      { label: "regla 1", value: "0,1,1", weightLabel: "mismo peso" },
      { label: "regla 2", value: "0,1,1", weightLabel: "gana por orden", active: true },
    ],
  });

  validateSlide(slide, pptx);
}

function createInheritanceIntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La herencia reduce repetición y propaga criterio",
    "No todas las propiedades deben declararse una y otra vez: algunas viajan por la jerarquía del documento.",
    "Bloque 2"
  );

  addDomTreePanel(slide, SH, {
    x: 0.94,
    y: 2.34,
    w: 5.32,
    h: 3.74,
    title: "Herencia en el árbol",
    subtitle: "body transmite tipografía y color hacia sus hijos",
    nodes: [
      { tag: "body", detail: "color + font-family", tone: "blue" },
      { tag: "section", detail: "recibe y sigue propagando", depth: 1, tone: "neutral" },
      { tag: "p", detail: "hereda texto", depth: 2, tone: "red" },
      { tag: "a", detail: "hereda si no redefine", depth: 2, tone: "gold" },
    ],
  });

  addCard(slide, SH, {
    x: 6.58,
    y: 2.38,
    w: 2.44,
    h: 1.56,
    title: "Sí suele heredarse",
    body: "color, font-family, line-height y otras propiedades ligadas a texto.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16.4,
    bodyFontSize: 10.8,
  });
  addCard(slide, SH, {
    x: 9.28,
    y: 2.38,
    w: 2.44,
    h: 1.56,
    title: "No suele heredarse",
    body: "margin, padding, border, width, display y reglas de caja.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 16.4,
    bodyFontSize: 10.8,
  });

  addCenterStatement(slide, SH, "Entender herencia evita dos errores: repetir de más o esperar que una propiedad se propague cuando no corresponde.", {
    x: 6.48,
    y: 4.44,
    w: 5.4,
    h: 1.2,
    fill: C.white,
    fontSize: 16.4,
  });

  validateSlide(slide, pptx);
}

function createInheritanceExampleSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un contenedor puede transmitir decisiones visuales",
    "La herencia hace visible la relación entre jerarquía HTML y resultado visual.",
    "Bloque 2"
  );

  addCodePanel(slide, SH, {
    x: 0.96,
    y: 2.34,
    w: 4.74,
    h: 3.8,
    title: "Regla heredada",
    code: "body {\n  color: #243b53;\n  font-family: Arial, sans-serif;\n}",
    lang: "css",
    fontSize: 10.8,
  });

  addDomTreePanel(slide, SH, {
    x: 5.98,
    y: 2.34,
    w: 5.84,
    h: 3.8,
    title: "Resultado en el documento",
    subtitle: "si no se redefine, el texto recibe esas decisiones desde body",
    nodes: [
      { tag: "body", detail: "color + font-family", tone: "blue" },
      { tag: "main", detail: "mantiene el contexto", depth: 1, tone: "neutral" },
      { tag: "p", detail: "usa #243b53 + Arial", depth: 2, tone: "red" },
      { tag: "a", detail: "también puede heredar", depth: 2, tone: "gold" },
    ],
  });

  validateSlide(slide, pptx);
}

function createInheritedVsBoxSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Texto y caja no se comportan igual",
    "Una parte importante del debugging en CSS consiste en distinguir qué tipo de propiedad estás mirando.",
    "Bloque 2"
  );

  addCard(slide, SH, {
    x: 0.98,
    y: 2.34,
    w: 5.18,
    h: 3.08,
    title: "Propiedades ligadas a texto",
    body: "color\nfont-family\nfont-size\nline-height\ntext-align",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 20,
    bodyFontSize: 14,
  });
  addCard(slide, SH, {
    x: 6.42,
    y: 2.34,
    w: 5.18,
    h: 3.08,
    title: "Propiedades ligadas a caja y layout",
    body: "margin\npadding\nborder\nwidth\ndisplay",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 20,
    bodyFontSize: 14,
  });

  addCenterStatement(slide, SH, "Si no distingues entre texto y caja, vas a repetir reglas inútiles o esperar herencias que nunca ocurren.", {
    x: 1.28,
    y: 5.7,
    w: 10.44,
    h: 0.62,
    fill: C.warm,
    fontSize: 16.6,
  });

  validateSlide(slide, pptx);
}

function createSpecificityIntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Especificidad: no todas las reglas pesan lo mismo",
    "Cuando dos selectores compiten, el navegador compara su nivel de precisión antes de decidir.",
    "Bloque 2"
  );

  addSpecificityScale(slide, SH, {
    x: 0.96,
    y: 2.34,
    w: 6.14,
    h: 3.84,
    title: "Escala de peso",
    subtitle: "un selector más específico suele imponerse sobre uno más general",
    footer: "Más peso no siempre significa mejor CSS: también puede significar más fricción para mantenerlo.",
    entries: [
      { label: "Etiqueta", value: "0,0,1", weightLabel: "peso bajo", scale: 0.26 },
      { label: "Clase", value: "0,1,0", weightLabel: "peso medio", scale: 0.46 },
      { label: "ID", value: "1,0,0", weightLabel: "peso alto", scale: 0.74, active: true },
      { label: "Inline", value: "inline", weightLabel: "máximo", scale: 0.94 },
    ],
  });

  addCenterStatement(slide, SH, "La especificidad responde una pregunta técnica muy concreta: ¿por qué esta regla no cambió el resultado si sí existe?", {
    x: 7.48,
    y: 2.46,
    w: 4.08,
    h: 1.38,
    fill: C.softNeutral,
    fontSize: 18,
  });

  addMiniCard(slide, SH, {
    x: 7.64,
    y: 4.18,
    w: 3.76,
    h: 0.92,
    title: "lectura útil",
    body: "Etiqueta < clase < id, pero sin convertir el archivo en una guerra de selectores.",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 15,
    bodyFontSize: 10.8,
  });

  addMiniCard(slide, SH, {
    x: 7.64,
    y: 5.3,
    w: 3.76,
    h: 0.82,
    title: "riesgo común",
    body: "resolver todo con más peso vuelve el CSS más duro de corregir.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 15,
    bodyFontSize: 10.5,
  });

  validateSlide(slide, pptx);
}

function createSpecificityExampleSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un selector más preciso puede desplazar a uno más general",
    "La pregunta correcta no es solo qué regla existe, sino qué regla termina pesando más sobre ese elemento.",
    "Bloque 2"
  );

  addCodePanel(slide, SH, {
    x: 0.92,
    y: 2.34,
    w: 5.18,
    h: 3.86,
    title: "Tres selectores posibles",
    code: "p {\n  color: #52606d;\n}\n\n.card p {\n  color: #102a43;\n}\n\n#principal .card p {\n  color: #d62027;\n}",
    lang: "css",
    fontSize: 10.2,
  });

  addSpecificityScale(slide, SH, {
    x: 6.4,
    y: 2.38,
    w: 5.34,
    h: 2.18,
    title: "Peso relativo",
    entries: [
      { label: "p", value: "0,0,1", weightLabel: "general", scale: 0.28 },
      { label: ".card p", value: "0,1,1", weightLabel: "más preciso", scale: 0.54 },
      { label: "#principal .card p", value: "1,1,1", weightLabel: "domina", scale: 0.86, active: true },
    ],
  });

  addCard(slide, SH, {
    x: 6.46,
    y: 4.88,
    w: 5.24,
    h: 1.34,
    title: "Resultado final",
    body: "Si las tres reglas alcanzan al mismo párrafo, la del id gana porque su selector tiene mayor peso.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 17.2,
    bodyFontSize: 11.2,
  });

  validateSlide(slide, pptx);
}

function createSelectorConflictSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Leer el conflicto como inspector y no como intuición",
    "Cuando el estilo no cambia, conviene mirar selector, peso, orden y resultado final como una misma escena técnica.",
    "Bloque 2"
  );

  addCascadeInspector(slide, SH, {
    x: 0.92,
    y: 2.32,
    w: 11.02,
    h: 3.86,
    title: "Conflicto completo",
    elementLabel: "p#principal.card.destacado",
    propertyLabel: "Propiedad observada",
    propertyValue: "color",
    rules: [
      { selector: "p", declaration: "color: #52606d;", specificity: "0,0,1", reason: "muy general" },
      { selector: ".card p", declaration: "color: #102a43;", specificity: "0,1,1", reason: "más preciso" },
      {
        selector: "#principal .card p",
        declaration: "color: #d62027;",
        specificity: "1,1,1",
        reason: "gana por id",
        active: true,
      },
    ],
    resolvedValue: "#d62027",
    resultNote: "el resultado final se explica sin tocar nada al azar",
  });

  validateSlide(slide, pptx);
}

function createDebugSequenceSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Diagnosticar CSS es seguir una secuencia, no improvisar",
    "La depuración mejora cuando se revisa el conflicto con un orden mental estable.",
    "Bloque 2"
  );

  const steps = [
    { x: 0.98, title: "1. Selector", body: "¿La regla apunta al elemento correcto?", fill: C.white, accent: C.red },
    { x: 3.84, title: "2. Herencia", body: "¿La propiedad ya viene desde arriba?", fill: C.softBlue, accent: C.navy },
    { x: 6.7, title: "3. Peso", body: "¿Hay una regla más específica compitiendo?", fill: C.paleRed, accent: C.red },
    { x: 9.56, title: "4. Orden", body: "¿El archivo deja otra regla después?", fill: C.warm, accent: C.gold },
  ];

  steps.forEach((step, index) => {
    addCard(slide, SH, {
      x: step.x,
      y: 2.5,
      w: 2.2,
      h: 2.04,
      title: step.title,
      body: step.body,
      fill: step.fill,
      line: step.fill === C.white ? C.border : step.fill,
      accent: step.accent,
      titleFontSize: 16,
      bodyFontSize: 11.4,
    });
    if (index < steps.length - 1) {
      addArrow(slide, step.x + 2.34, 3.28, 0.28, 0.24, index % 2 === 0 ? C.red : C.gold);
    }
  });

  addCenterStatement(slide, SH, "Leer CSS con método ahorra tiempo y evita subir complejidad solo para forzar un resultado.", {
    x: 1.16,
    y: 5.1,
    w: 10.68,
    h: 0.72,
    fill: C.softNeutral,
    fontSize: 18,
  });

  validateSlide(slide, pptx);
}

function createInspectorReadingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Mirar estilos como inspector cambia la calidad del debugging",
    "Cuando una regla aparece tachada o desplazada, el navegador ya está explicando el conflicto.",
    "Bloque 2"
  );

  addCascadeInspector(slide, SH, {
    x: 0.94,
    y: 2.34,
    w: 6.2,
    h: 3.72,
    title: "Lectura tipo inspector",
    elementLabel: "a.card-link",
    propertyLabel: "Propiedad observada",
    propertyValue: "color",
    rules: [
      { selector: "a", declaration: "color: #243b53;", specificity: "0,0,1", reason: "base" },
      { selector: ".card-link", declaration: "color: #102a43;", specificity: "0,1,0", reason: "activo", active: true },
      { selector: "#principal a", declaration: "color: #d62027;", specificity: "1,0,1", reason: "no aplica aquí" },
    ],
    resolvedValue: "#102a43",
    resultNote: "la lectura técnica ya trae pistas sobre el porqué",
  });

  addCard(slide, SH, {
    x: 7.44,
    y: 2.38,
    w: 4.02,
    h: 1.32,
    title: "Lo que conviene mirar",
    body: "regla activa · regla tachada · peso relativo · valor final",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 17.2,
    bodyFontSize: 11.2,
  });
  addCard(slide, SH, {
    x: 7.44,
    y: 3.94,
    w: 4.02,
    h: 1.24,
    title: "Error frecuente",
    body: "sumar más selectores sin entender primero qué regla ya está dominando.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 17.2,
    bodyFontSize: 11,
  });
  addCard(slide, SH, {
    x: 7.44,
    y: 5.42,
    w: 4.02,
    h: 0.72,
    title: "Lectura sana",
    body: "primero entender, después corregir",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 16.2,
    bodyFontSize: 10.6,
  });

  validateSlide(slide, pptx);
}

function createBlock2QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas guía del bloque",
    "Estas preguntas ayudan a fijar la lectura técnica de conflictos, herencia y peso entre reglas.",
    "Bloque 2"
  );

  const questions = [
    "¿Por qué CSS necesita una lógica de cascada cuando varias reglas afectan el mismo elemento?",
    "¿Qué propiedades suelen heredarse y cuáles no conviene asumir como heredables?",
    "¿Por qué la especificidad ayuda a explicar conflictos entre reglas?",
    "¿Qué cambia cuando se depura un estilo con criterio y no tocando propiedades al azar?",
  ];

  questions.forEach((question, index) => {
    addCard(slide, SH, {
      x: index % 2 === 0 ? 1.02 : 6.62,
      y: 2.38 + Math.floor(index / 2) * 1.72,
      w: 5.0,
      h: 1.38,
      title: `Pregunta ${index + 1}`,
      body: question,
      fill: index % 2 === 0 ? C.white : C.softBlue,
      line: index % 2 === 0 ? C.border : C.softBlue,
      accent: index % 2 === 0 ? C.red : C.navy,
      titleFontSize: 17.2,
      bodyFontSize: 11.6,
    });
  });

  validateSlide(slide, pptx);
}

function createBlock2ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del bloque",
    "Una regla CSS no se entiende sola: se entiende por cómo compite, se hereda y termina resolviéndose en el navegador.",
    "Bloque 2"
  );

  addPanel(slide, 0.94, 2.34, 3.4, 3.62, { fill: C.navy, line: C.navy });
  addBarsMotif(slide, 1.26, 2.66, 0.84, C.red);
  slide.addText("Cascada,\nherencia y\nespecificidad\nexplican el\nresultado final.", {
    x: 1.24,
    y: 3.18,
    w: 2.44,
    h: 1.96,
    fontFace: TYPOGRAPHY.display,
    fontSize: 22,
    bold: true,
    color: C.white,
    margin: 0,
  });

  addCard(slide, SH, {
    x: 4.68,
    y: 2.34,
    w: 4.26,
    h: 3.62,
    title: "Idea clave",
    body: "Trabajar mejor con CSS significa leer por qué una regla gana, qué decisiones ya vienen heredadas y qué selector está pesando más sobre el resultado.",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 18.4,
    bodyFontSize: 12.2,
  });
  addCard(slide, SH, {
    x: 9.24,
    y: 2.34,
    w: 2.56,
    h: 3.62,
    title: "Puente al bloque 3",
    body: "En el siguiente tramo veremos cómo estas decisiones pasan a un CSS más mantenible con variables y consistencia visual.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16.8,
    bodyFontSize: 10.8,
  });

  validateSlide(slide, pptx);
}

function createBlock3IntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Bloque 3 · Variables CSS y consistencia visual",
    "Ahora importa pasar de reglas sueltas a decisiones visuales nombradas y reutilizables.",
    "Bloque 3"
  );

  addPanel(slide, 0.94, 2.34, 4.02, 3.36, { fill: C.navy, line: C.navy });
  addBarsMotif(slide, 1.26, 2.66, 0.84, C.red);
  slide.addText("Variables CSS\nordenan decisiones,\nreducen repetición\ny preparan un estilo\nmás mantenible.", {
    x: 1.22,
    y: 3.16,
    w: 2.84,
    h: 2.02,
    fontFace: TYPOGRAPHY.display,
    fontSize: 22,
    bold: true,
    color: C.white,
    margin: 0,
  });

  addTokenBoard(slide, SH, {
    x: 5.28,
    y: 2.38,
    w: 6.5,
    h: 3.12,
    title: "Decisiones que ya conviene centralizar",
    groups: [
      {
        title: "Color",
        tone: C.red,
        fill: C.paleRed,
        items: [
          { label: "--color-primario", value: "#D62027", swatch: C.red },
          { label: "--text-main", value: "#102A43", swatch: C.navy },
        ],
      },
      {
        title: "Espacio",
        tone: C.gold,
        fill: C.warm,
        items: [
          { label: "--space-sm", value: "8px" },
          { label: "--space-md", value: "16px" },
        ],
      },
      {
        title: "Superficie",
        tone: C.navy,
        fill: C.softBlue,
        items: [
          { label: "--surface-card", value: "#FFFFFF", swatch: C.white },
          { label: "--radius-md", value: "12px" },
        ],
      },
    ],
    footer: "Una variable no solo ahorra escritura: también nombra una decisión.",
  });

  addMiniCard(slide, SH, {
    x: 5.3,
    y: 5.58,
    w: 2.06,
    h: 0.78,
    title: "repetición",
    body: "si se multiplica, después cuesta cambiarla",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 12.2,
    bodyFontSize: 8.8,
  });
  addMiniCard(slide, SH, {
    x: 7.58,
    y: 5.58,
    w: 2.06,
    h: 0.78,
    title: "sistema",
    body: "las piezas dejan de vivir como casos aislados",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 12.2,
    bodyFontSize: 8.8,
  });
  addMiniCard(slide, SH, {
    x: 9.86,
    y: 5.58,
    w: 1.96,
    h: 0.78,
    title: "mantenimiento",
    body: "un ajuste central evita tocar todo a mano",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 11.8,
    bodyFontSize: 8.5,
  });

  validateSlide(slide, pptx);
}

function createRepetitionCostSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Repetir decisiones visuales tiene costo",
    "Cuando un mismo color, radio o espacio se escribe muchas veces, cualquier cambio deja de ser pequeño.",
    "Bloque 3"
  );

  addCodePanel(slide, SH, {
    x: 0.92,
    y: 2.3,
    w: 5.4,
    h: 3.74,
    title: "CSS que funciona, pero escala mal",
    code: `.card {\n  background: #ffffff;\n  border-radius: 12px;\n  color: #102a43;\n}\n\n.button {\n  background: #d62027;\n  color: #ffffff;\n  border-radius: 12px;\n}\n\n.alert {\n  border-left: 4px solid #d62027;\n  color: #102a43;\n}`,
    lang: "css",
    fontSize: 9.8,
  });

  addCard(slide, SH, {
    x: 6.62,
    y: 2.32,
    w: 2.18,
    h: 1.06,
    title: "Color repetido",
    body: "El rojo principal aparece en varias reglas y después cuesta rastrearlo.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 15.6,
    bodyFontSize: 10.1,
  });
  addCard(slide, SH, {
    x: 9.06,
    y: 2.32,
    w: 2.18,
    h: 1.06,
    title: "Radio repetido",
    body: "El mismo borde redondeado se vuelve un dato duplicado.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 15.6,
    bodyFontSize: 10.1,
  });
  addCard(slide, SH, {
    x: 6.62,
    y: 3.66,
    w: 2.18,
    h: 1.06,
    title: "Texto repetido",
    body: "Un color base de texto debería declararse una vez y reutilizarse.",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 15.2,
    bodyFontSize: 9.9,
  });
  addCard(slide, SH, {
    x: 9.06,
    y: 3.66,
    w: 2.18,
    h: 1.06,
    title: "Costo técnico",
    body: "Cambiar una decisión obliga a buscarla regla por regla.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 15.2,
    bodyFontSize: 9.9,
  });

  addCenterStatement(slide, SH, "Si una decisión visual se repite demasiado, ya conviene centralizarla.", {
    x: 6.54,
    y: 5.14,
    w: 4.86,
    h: 0.82,
    fill: C.softNeutral,
    fontSize: 16.8,
  });

  validateSlide(slide, pptx);
}

function createVariablesCoreSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Variables CSS: centralizar criterio",
    "La combinación entre :root y var(...) permite convertir valores repetidos en decisiones visibles y reutilizables.",
    "Bloque 3"
  );

  const codeX = 0.86;
  const codeY = 2.26;
  const codeW = 6.08;
  const codeH = 4.08;
  const rootTarget = { x: 7.26, y: 2.44, w: 2.18, h: 0.94, side: "left" };
  const tokenTarget = { x: 7.26, y: 3.56, w: 2.18, h: 1.02, side: "left" };
  const varTarget = { x: 9.74, y: 2.92, w: 2.02, h: 1.28, side: "left" };
  const reuseTarget = { x: 9.74, y: 4.42, w: 2.02, h: 1.0, side: "left" };
  const variableAnnotations = [
    {
      totalLines: 13,
      lineNumber: 1,
      column: 1,
      length: 5,
      color: C.red,
      target: rootTarget,
      routeY: 2.88,
    },
    {
      totalLines: 13,
      lineNumber: 2,
      column: 3,
      length: 17,
      color: C.red,
      target: tokenTarget,
      routeY: 4.06,
    },
    {
      totalLines: 13,
      lineNumber: 7,
      column: 15,
      length: 22,
      color: C.navy,
      target: varTarget,
      routeY: 3.58,
    },
    {
      totalLines: 13,
      lineNumber: 12,
      column: 18,
      length: 16,
      color: C.gold,
      target: reuseTarget,
      routeY: 5.22,
    },
  ];

  addCodePanel(slide, SH, {
    x: codeX,
    y: codeY,
    w: codeW,
    h: codeH,
    title: "Variables básicas",
    code: `:root {\n  --color-primario: #d62027;\n  --color-texto: #102a43;\n  --radio-md: 12px;\n}\n\n.button {\n  background: var(--color-primario);\n  border-radius: var(--radio-md);\n}\n\n.card {\n  color: var(--color-texto);\n  border-radius: var(--radio-md);\n}`,
    lang: "css",
    fontSize: 9.8,
    annotations: variableAnnotations,
  });

  addMiniCard(slide, SH, {
    ...rootTarget,
    title: ":root",
    body: "Declara variables disponibles para todo el documento.",
    fill: C.white,
    line: C.border,
    accent: C.red,
  });
  addCard(slide, SH, {
    ...tokenTarget,
    title: "Tokens nombrados",
    body: "--color-primario y --radio-md ya hablan de función, no solo de valor.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 16.4,
    bodyFontSize: 10.8,
  });
  addCard(slide, SH, {
    ...varTarget,
    title: "var(...)",
    body: "Recupera la decisión desde cualquier regla que la necesite.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16.6,
    bodyFontSize: 10.8,
  });
  addMiniCard(slide, SH, {
    ...reuseTarget,
    title: "reutilización",
    body: "Button y card comparten radio sin reescribirlo a mano.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
  });

  variableAnnotations.forEach((annotation) => {
    addCodeAnnotation(slide, SH, {
      codeX,
      codeY,
      codeW,
      codeH,
      fontSize: 9.8,
      connectorColor: C.guide,
      showHighlight: false,
      sourceBadgeStyle: "port",
      targetBadgeStyle: "none",
      ...annotation,
    });
  });

  validateSlide(slide, pptx);
}

function createValueToTokenSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "De valor suelto a decisión nombrada",
    "Una variable CSS vuelve explícita la función visual de un valor dentro del sistema.",
    "Bloque 3"
  );

  addPanel(slide, 0.92, 2.42, 3.2, 3.42, { fill: C.white, line: C.border });
  slide.addText("Valores sueltos", {
    x: 1.22,
    y: 2.68,
    w: 1.96,
    h: 0.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  [
    { text: "#d62027", fill: C.paleRed, color: C.red, y: 3.14 },
    { text: "12px", fill: C.softBlue, color: C.navy, y: 3.86 },
    { text: "#102a43", fill: C.softNeutral, color: C.navy, y: 4.58 },
  ].forEach((item) => {
    addPill(slide, SH, item.text, {
      x: 1.2,
      y: item.y,
      w: 1.64,
      fill: item.fill,
      line: item.fill,
      color: item.color,
    });
  });
  slide.addText("Sirven, pero no explican qué papel cumplen dentro del sistema visual.", {
    x: 1.18,
    y: 5.18,
    w: 2.46,
    h: 0.32,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.4,
    color: C.slate,
    margin: 0,
  });

  addArrow(slide, 4.42, 3.98, 0.38, 0.34, C.gold);

  addTokenBoard(slide, SH, {
    x: 5.06,
    y: 2.34,
    w: 6.82,
    h: 3.54,
    title: "El mismo contenido ya se entiende mejor como token",
    groups: [
      {
        title: "Color",
        tone: C.red,
        fill: C.paleRed,
        items: [
          { label: "--color-primario", value: "#D62027", swatch: C.red },
          { label: "--text-main", value: "#102A43", swatch: C.navy },
        ],
      },
      {
        title: "Superficie",
        tone: C.navy,
        fill: C.softBlue,
        items: [
          { label: "--surface-card", value: "#FFFFFF", swatch: C.white },
          { label: "--radius-md", value: "12px" },
        ],
      },
      {
        title: "Espacio",
        tone: C.gold,
        fill: C.warm,
        items: [
          { label: "--space-sm", value: "8px" },
          { label: "--space-lg", value: "24px" },
        ],
      },
    ],
  });

  addCenterStatement(slide, SH, "Nombrar decisiones mejora la conversación técnica sobre el CSS.", {
    x: 5.3,
    y: 6.02,
    w: 6.42,
    h: 0.52,
    fill: C.softNeutral,
    fontSize: 14.6,
  });

  validateSlide(slide, pptx);
}

function createConsistencyControlSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Consistencia visual no es rigidez: es control",
    "Cuando varias piezas comparten decisiones visuales, la interfaz se vuelve más estable y más razonable de mantener.",
    "Bloque 3"
  );

  addCenterStatement(slide, SH, "No se trata de volver todo idéntico. Se trata de que lo que se repite tenga una regla legible.", {
    x: 1.02,
    y: 2.34,
    w: 8.16,
    h: 1.08,
    fill: C.paleRed,
    fontSize: 21,
  });

  addCard(slide, SH, {
    x: 9.48,
    y: 2.4,
    w: 2.4,
    h: 1.02,
    title: "Control",
    body: "Más coherencia entre componentes y menos decisiones arbitrarias.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16.4,
    bodyFontSize: 10.1,
  });

  addSystemComponentsShowcase(slide, 1.02, 3.82, 10.86, 2.04);

  validateSlide(slide, pptx);
}

function createTokenBoardSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un sistema pequeño ya empieza a hablar en tokens",
    "Color, espacio, superficie y tipografía pueden empezar a nombrarse desde temprano para evitar CSS desordenado.",
    "Bloque 3"
  );

  addTokenBoard(slide, SH, {
    x: 0.92,
    y: 2.3,
    w: 11.22,
    h: 3.8,
    title: "Tablero base de tokens CSS",
    groups: [
      {
        title: "Color",
        tone: C.red,
        fill: C.paleRed,
        items: [
          { label: "--color-primario", value: "#D62027", swatch: C.red },
          { label: "--color-texto", value: "#102A43", swatch: C.navy },
          { label: "--surface-card", value: "#FFFFFF", swatch: C.white },
        ],
      },
      {
        title: "Espacio",
        tone: C.gold,
        fill: C.warm,
        items: [
          { label: "--space-sm", value: "8px" },
          { label: "--space-md", value: "16px" },
          { label: "--space-lg", value: "24px" },
        ],
      },
      {
        title: "Superficie",
        tone: C.navy,
        fill: C.softBlue,
        items: [
          { label: "--radius-md", value: "12px" },
          { label: "--shadow-soft", value: "0 8px 24px rgba(...)" },
          { label: "--border-soft", value: "#D8DEE6", swatch: C.border },
        ],
      },
      {
        title: "Tipo",
        tone: C.navy,
        fill: C.softNeutral,
        items: [
          { label: "--font-title", value: "32px" },
          { label: "--font-body", value: "16px" },
          { label: "--line-body", value: "1.5" },
        ],
      },
    ],
    footer: "Todavía no es un design system completo, pero ya es una base mucho más legible que repetir valores aislados.",
  });

  validateSlide(slide, pptx);
}

function createSharedComponentsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Una misma decisión puede sostener varios componentes",
    "El mismo color de acción, el mismo radio y el mismo texto base pueden atravesar botones, tarjetas, alertas y formularios.",
    "Bloque 3"
  );

  addSystemComponentsShowcase(slide, 0.96, 2.36, 7.08, 3.24);

  addCard(slide, SH, {
    x: 8.34,
    y: 2.36,
    w: 3.42,
    h: 1.02,
    title: "Color de acción",
    body: "Botones y alertas pueden compartir la misma decisión principal sin verse improvisados.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 16.4,
    bodyFontSize: 10.3,
  });
  addCard(slide, SH, {
    x: 8.34,
    y: 3.62,
    w: 3.42,
    h: 1.02,
    title: "Radio y superficie",
    body: "Cards y campos se sienten parte de la misma familia visual porque comparten base.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16.4,
    bodyFontSize: 10.3,
  });
  addCard(slide, SH, {
    x: 8.34,
    y: 4.88,
    w: 3.42,
    h: 0.76,
    title: "Resultado",
    body: "Más control local y más coherencia global.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 16.2,
    bodyFontSize: 10.2,
  });

  validateSlide(slide, pptx);
}

function createMaintenanceCompareSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Mantenimiento: repetir vs centralizar",
    "La diferencia se nota cuando una decisión cambia y el CSS debe responder sin romper todo alrededor.",
    "Bloque 3"
  );

  addCodePanel(slide, SH, {
    x: 0.92,
    y: 2.34,
    w: 5.08,
    h: 3.78,
    title: "Sin variables",
    code: `.button {\n  background: #d62027;\n  border-radius: 12px;\n}\n\n.alert {\n  border-left: 4px solid #d62027;\n}\n\n.badge {\n  background: #d62027;\n}`,
    lang: "css",
    fontSize: 10,
  });

  addArrow(slide, 6.12, 3.92, 0.34, 0.32, C.gold);

  addCodePanel(slide, SH, {
    x: 6.66,
    y: 2.34,
    w: 5.52,
    h: 3.78,
    title: "Con variables",
    code: `:root {\n  --color-primario: #d62027;\n}\n\n.button {\n  background: var(--color-primario);\n}\n\n.alert {\n  border-left: 4px solid var(--color-primario);\n}\n\n.badge {\n  background: var(--color-primario);\n}`,
    lang: "css",
    fontSize: 10,
  });

  addMiniCard(slide, SH, {
    x: 1.18,
    y: 6.22,
    w: 4.3,
    h: 0.42,
    title: "cada ajuste exige tocar varias reglas",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 11.2,
  });
  addMiniCard(slide, SH, {
    x: 7.02,
    y: 6.22,
    w: 4.3,
    h: 0.42,
    title: "una decisión centralizada se reutiliza mejor",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 11.2,
  });

  validateSlide(slide, pptx);
}

function createMatureReadingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Una lectura técnica más madura",
    "Trabajar con variables CSS implica detectar repetición, centralizar criterio, nombrarlo bien y reutilizarlo con sentido.",
    "Bloque 3"
  );

  const steps = [
    { x: 0.98, title: "1. detectar", body: "repetición innecesaria", fill: C.white, line: C.border, accent: C.red },
    { x: 3.1, title: "2. centralizar", body: "la decisión visual", fill: C.paleRed, line: C.paleRed, accent: C.red },
    { x: 5.22, title: "3. nombrar", body: "el token con intención", fill: C.softBlue, line: C.softBlue, accent: C.navy },
    { x: 7.34, title: "4. reutilizar", body: "entre varios componentes", fill: C.warm, line: C.warm, accent: C.gold },
  ];

  steps.forEach((step, index) => {
    addCard(slide, SH, {
      x: step.x,
      y: 3.08,
      w: 1.72,
      h: 1.4,
      title: step.title,
      body: step.body,
      fill: step.fill,
      line: step.line,
      accent: step.accent,
      titleFontSize: 14.8,
      bodyFontSize: 9.8,
    });
    if (index < steps.length - 1) {
      addArrow(slide, step.x + 1.84, 3.64, 0.16, 0.22, index % 2 === 0 ? C.red : C.gold);
    }
  });

  addCard(slide, SH, {
    x: 9.54,
    y: 2.76,
    w: 2.36,
    h: 2.18,
    title: "Esto prepara lo siguiente",
    body: "Responsive, layout moderno y sistemas visuales ya empiezan a apoyarse en esta misma lógica de decisiones.",
    fill: C.navy,
    line: C.navy,
    accent: C.red,
    titleFontSize: 15.2,
    bodyFontSize: 8.9,
    titleColor: C.white,
    bodyColor: C.sand,
  });

  addCenterStatement(slide, SH, "Una hoja de estilos madura no solo se ve bien hoy: también es razonable de modificar mañana.", {
    x: 1.16,
    y: 5.36,
    w: 10.62,
    h: 0.68,
    fill: C.softNeutral,
    fontSize: 17,
  });

  validateSlide(slide, pptx);
}

function createBlock3QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas guía del bloque",
    "Estas preguntas ayudan a fijar la lógica entre repetición, variables, tokens y mantenimiento.",
    "Bloque 3"
  );

  const questions = [
    "¿Qué problema técnico aparece cuando un mismo color, espacio o radio se repite manualmente en varias reglas?",
    "¿Qué cambia cuando un valor pasa de verse como dato suelto a verse como decisión nombrada?",
    "¿Por qué variables CSS y consistencia visual están tan relacionadas entre sí?",
    "¿Qué ventaja concreta aporta centralizar una decisión antes de entrar a layout y responsive?",
  ];

  questions.forEach((question, index) => {
    addCard(slide, SH, {
      x: index % 2 === 0 ? 1.02 : 6.62,
      y: 2.38 + Math.floor(index / 2) * 1.72,
      w: 5.0,
      h: 1.38,
      title: `Pregunta ${index + 1}`,
      body: question,
      fill: index % 2 === 0 ? C.white : index === 1 ? C.softBlue : index === 2 ? C.paleRed : C.warm,
      line: index % 2 === 0 ? C.border : index === 1 ? C.softBlue : index === 2 ? C.paleRed : C.warm,
      accent: index === 1 ? C.navy : index === 3 ? C.gold : C.red,
      titleFontSize: 17.2,
      bodyFontSize: 11.4,
    });
  });

  validateSlide(slide, pptx);
}

function createBlock3ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del bloque",
    "Las variables CSS vuelven más legible la intención visual y preparan una capa de estilos mejor conectada con el layout.",
    "Bloque 3"
  );

  addCard(slide, SH, {
    x: 0.98,
    y: 2.34,
    w: 6.62,
    h: 3.56,
    title: "Idea clave",
    body: "Un CSS mejora cuando deja de repetir valores sin contexto y empieza a nombrar decisiones visuales que luego pueden reutilizarse entre componentes, pantallas y cambios futuros.",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 19.2,
    bodyFontSize: 12.4,
  });

  addPill(slide, SH, "color", {
    x: 1.28,
    y: 5.18,
    w: 0.94,
    fill: C.paleRed,
    line: C.paleRed,
    color: C.red,
  });
  addPill(slide, SH, "espacio", {
    x: 2.38,
    y: 5.18,
    w: 1.02,
    fill: C.softBlue,
    line: C.softBlue,
    color: C.navy,
  });
  addPill(slide, SH, "superficie", {
    x: 3.58,
    y: 5.18,
    w: 1.18,
    fill: C.softNeutral,
    line: C.softNeutral,
    color: C.navy,
  });
  addPill(slide, SH, "tokens", {
    x: 4.96,
    y: 5.18,
    w: 0.98,
    fill: C.warm,
    line: C.warm,
    color: C.navy,
  });

  addPanel(slide, 7.94, 2.34, 3.88, 3.56, { fill: C.navy, line: C.navy });
  addBarsMotif(slide, 8.24, 2.68, 0.86, C.red);
  slide.addText("Puente al\nBloque 4", {
    x: 8.22,
    y: 3.22,
    w: 2.0,
    h: 0.64,
    fontFace: TYPOGRAPHY.display,
    fontSize: 22,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("En el siguiente tramo veremos cómo estas decisiones llegan a la distribución real de elementos con Flexbox y Grid.", {
    x: 8.22,
    y: 4.04,
    w: 3.0,
    h: 0.86,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.2,
    color: C.sand,
    margin: 0,
  });

  validateSlide(slide, pptx);
}

function createBlock4IntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Bloque 4 · Flexbox y Grid",
    "Ahora el criterio visual llega al orden espacial: alinear, repartir y estructurar también son decisiones técnicas.",
    "Bloque 4"
  );

  addPanel(slide, 0.92, 2.3, 3.76, 3.54, { fill: C.navy, line: C.navy });
  addBarsMotif(slide, 1.22, 2.64, 0.84, C.red);
  slide.addText("Layout moderno\nsignifica\nmás control\nsobre el espacio.", {
    x: 1.2,
    y: 3.28,
    w: 2.82,
    h: 1.56,
    fontFace: TYPOGRAPHY.display,
    fontSize: 23,
    bold: true,
    color: C.white,
    margin: 0,
  });

  addFlexGridLayout(slide, SH, {
    x: 5.02,
    y: 2.3,
    w: 3.16,
    h: 1.62,
    title: "Flexbox",
    mode: "flex",
    itemCount: 4,
  });
  addFlexGridLayout(slide, SH, {
    x: 8.56,
    y: 2.3,
    w: 3.16,
    h: 1.62,
    title: "Grid",
    mode: "grid",
    itemCount: 6,
    columns: 3,
  });

  addCard(slide, SH, {
    x: 5.02,
    y: 4.16,
    w: 3.16,
    h: 1.06,
    title: "Flexbox",
    body: "alineación y reparto sobre un eje dominante",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 14.2,
    bodyFontSize: 9.6,
  });
  addCard(slide, SH, {
    x: 8.56,
    y: 4.16,
    w: 3.16,
    h: 1.06,
    title: "Grid",
    body: "estructura de filas, columnas y áreas",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14.2,
    bodyFontSize: 9.6,
  });

  addCenterStatement(slide, SH, "No compiten: resuelven problemas espaciales distintos y suelen convivir en una misma interfaz.", {
    x: 0.98,
    y: 6.08,
    w: 10.88,
    h: 0.42,
    fill: C.softNeutral,
    fontSize: 15.8,
  });

  validateSlide(slide, pptx);
}

function createDistributionDecisionSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Distribuir elementos también es decidir",
    "Una interfaz no solo necesita color y tipografía: también necesita orden espacial, relaciones y recorridos claros.",
    "Bloque 4"
  );

  const cards = [
    { x: 0.98, title: "alineación", body: "qué queda al centro, al borde o en columna", fill: C.white, line: C.border, accent: C.red },
    { x: 3.16, title: "reparto", body: "cómo se distribuye el espacio disponible", fill: C.softBlue, line: C.softBlue, accent: C.navy },
    { x: 5.34, title: "relación", body: "qué bloques van juntos y cuáles forman áreas", fill: C.warm, line: C.warm, accent: C.gold },
    { x: 7.52, title: "respuesta", body: "qué cambia cuando el ancho disponible varía", fill: C.paleRed, line: C.paleRed, accent: C.red },
    { x: 9.7, title: "criterio", body: "elegir la herramienta según el problema", fill: C.white, line: C.border, accent: C.navy },
  ];

  cards.forEach((card) => {
    addMiniCard(slide, SH, {
      x: card.x,
      y: 2.48,
      w: 1.92,
      h: 1.58,
      title: card.title,
      body: card.body,
      fill: card.fill,
      line: card.line,
      accent: card.accent,
      titleFontSize: 13.4,
      bodyFontSize: 10.2,
    });
  });

  addCompactViewportCompare(slide, 1.26, 4.16, 10.28, 2.06, {
    title: "Un mismo contenido puede exigir otra distribución según el espacio",
    leftLabel: "Móvil",
    leftSize: "390 px",
    leftNotes: ["una columna", "CTA visible"],
    rightLabel: "Desktop",
    rightSize: "1280 px",
    rightNotes: ["más contexto", "columnas"],
  });

  validateSlide(slide, pptx);
}

function createFlexIntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Flexbox: buena herramienta para una dirección dominante",
    "Flexbox resulta especialmente útil cuando el problema principal consiste en alinear o repartir una secuencia de elementos.",
    "Bloque 4"
  );

  addCodePanel(slide, SH, {
    x: 0.92,
    y: 2.32,
    w: 4.28,
    h: 3.12,
    title: "Toolbar con Flexbox",
    code: ".toolbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}",
    lang: "css",
    fontSize: 10.6,
  });

  addFlexGridLayout(slide, SH, {
    x: 5.54,
    y: 2.4,
    w: 3.08,
    h: 2.56,
    title: "Contenedor flex",
    mode: "flex",
    itemCount: 5,
  });

  addCard(slide, SH, {
    x: 8.92,
    y: 2.36,
    w: 2.86,
    h: 1.08,
    title: "Qué resuelve bien",
    body: "toolbars, navegación, grupos de botones, formularios compactos y barras de acciones.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 16.4,
    bodyFontSize: 10.2,
  });
  addCard(slide, SH, {
    x: 8.92,
    y: 3.62,
    w: 2.86,
    h: 1.22,
    title: "Idea útil",
    body: "Si lo que importa es una fila o columna principal, Flexbox suele dar una solución más directa.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16.2,
    bodyFontSize: 10.2,
  });

  addCenterStatement(slide, SH, "Flexbox piensa muy bien en secuencia, alineación y reparto dentro de un mismo eje.", {
    x: 1.18,
    y: 5.62,
    w: 10.5,
    h: 0.46,
    fill: C.softNeutral,
    fontSize: 15.8,
  });

  validateSlide(slide, pptx);
}

function createFlexAxesSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "En Flexbox importa leer los ejes",
    "justify-content y align-items no se entienden bien si no se distingue primero el eje principal del secundario.",
    "Bloque 4"
  );

  addPanel(slide, 1.0, 2.5, 6.22, 2.92, { fill: C.white, line: C.border });
  slide.addText("Eje principal", {
    x: 1.38,
    y: 2.76,
    w: 1.26,
    h: 0.16,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15.6,
    bold: true,
    color: C.red,
    margin: 0,
  });
  slide.addShape(SH.line, {
    x: 1.46,
    y: 3.42,
    w: 4.38,
    h: 0,
    line: { color: C.red, pt: 2.2, beginArrowType: "none", endArrowType: "triangle" },
  });
  slide.addText("justify-content distribuye sobre este eje", {
    x: 1.44,
    y: 3.8,
    w: 2.84,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.2,
    color: C.slate,
    margin: 0,
  });
  slide.addShape(SH.line, {
    x: 4.08,
    y: 2.96,
    w: 0,
    h: 1.46,
    line: { color: C.navy, pt: 2.2, beginArrowType: "none", endArrowType: "triangle" },
  });
  slide.addText("align-items ordena sobre el eje secundario", {
    x: 4.2,
    y: 4.08,
    w: 2.54,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    color: C.slate,
    margin: 0,
  });
  for (let index = 0; index < 4; index += 1) {
    slide.addShape(SH.roundRect, {
      x: 2.04 + index * 0.86,
      y: 3.16 + (index % 2) * 0.12,
      w: 0.56,
      h: 0.42,
      rectRadius: 0.03,
      fill: { color: index % 2 === 0 ? C.paleRed : C.softBlue },
      line: { color: index % 2 === 0 ? C.paleRed : C.softBlue },
    });
  }

  addCard(slide, SH, {
    x: 7.58,
    y: 2.48,
    w: 4.1,
    h: 1.18,
    title: "Lectura sana",
    body: "Primero identificar dirección y eje principal; después recién decidir justify-content y align-items.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 17,
    bodyFontSize: 10.8,
  });
  addCard(slide, SH, {
    x: 7.58,
    y: 3.9,
    w: 4.1,
    h: 1.18,
    title: "Error común",
    body: "Cambiar propiedades de alineación sin tener claro qué eje está gobernando el contenedor.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 17,
    bodyFontSize: 10.8,
  });

  validateSlide(slide, pptx);
}

function createFlexUseCasesSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Casos típicos donde Flexbox aparece rápido",
    "El valor práctico de Flexbox se nota cuando miramos patrones muy comunes del trabajo real.",
    "Bloque 4"
  );

  const cases = [
    { x: 1.02, y: 2.42, title: "toolbar", body: "logo + navegación + acciones", fill: C.white, line: C.border, accent: C.red },
    { x: 4.0, y: 2.42, title: "acciones", body: "botones alineados y con gap consistente", fill: C.softBlue, line: C.softBlue, accent: C.navy },
    { x: 6.98, y: 2.42, title: "formulario", body: "controles cortos dentro de una misma fila", fill: C.warm, line: C.warm, accent: C.gold },
    { x: 9.96, y: 2.42, title: "chips", body: "etiquetas o filtros que se reparten mejor", fill: C.paleRed, line: C.paleRed, accent: C.red },
  ];

  cases.forEach((item) => {
    addCard(slide, SH, {
      x: item.x,
      y: item.y,
      w: 1.8,
      h: 1.62,
      title: item.title,
      body: item.body,
      fill: item.fill,
      line: item.line,
      accent: item.accent,
      titleFontSize: 14.4,
      bodyFontSize: 10.1,
    });
  });

  addFlexGridLayout(slide, SH, {
    x: 2.18,
    y: 4.34,
    w: 7.7,
    h: 1.44,
    title: "Secuencia de elementos alineados sobre un mismo eje",
    mode: "flex",
    itemCount: 6,
  });

  validateSlide(slide, pptx);
}

function createGridIntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Grid: más fuerte cuando pensamos en estructura",
    "Cuando la interfaz necesita filas, columnas o regiones, Grid ofrece una lectura espacial más potente.",
    "Bloque 4"
  );

  addCodePanel(slide, SH, {
    x: 0.92,
    y: 2.34,
    w: 4.18,
    h: 3.16,
    title: "Layout con Grid",
    code: ".layout {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  gap: 24px;\n}",
    lang: "css",
    fontSize: 10.6,
  });

  addFlexGridLayout(slide, SH, {
    x: 5.44,
    y: 2.34,
    w: 3.28,
    h: 2.72,
    title: "Grid container",
    mode: "grid",
    itemCount: 6,
    columns: 3,
  });

  addCard(slide, SH, {
    x: 9.02,
    y: 2.4,
    w: 2.74,
    h: 1.18,
    title: "Qué resuelve bien",
    body: "panel lateral + contenido, catálogos, dashboards y áreas de trabajo con varias regiones.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16.2,
    bodyFontSize: 10.2,
  });
  addCard(slide, SH, {
    x: 9.02,
    y: 3.82,
    w: 2.74,
    h: 1.08,
    title: "Idea útil",
    body: "Grid no piensa solo en secuencia: piensa en estructura espacial.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 16.2,
    bodyFontSize: 10.2,
  });

  validateSlide(slide, pptx);
}

function createGridColumnsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Grid deja declarar columnas con más claridad",
    "La relación entre regiones visuales se vuelve mucho más legible cuando el contenedor declara su estructura.",
    "Bloque 4"
  );

  addFlexGridLayout(slide, SH, {
    x: 0.98,
    y: 2.42,
    w: 5.12,
    h: 2.74,
    title: "Sidebar + contenido principal",
    mode: "grid",
    itemCount: 4,
    columns: 2,
  });

  addCard(slide, SH, {
    x: 6.48,
    y: 2.5,
    w: 5.12,
    h: 1.1,
    title: "Lectura útil",
    body: "240px + 1fr ya expresa una relación espacial entre panel lateral y región principal.",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 16.6,
    bodyFontSize: 10.4,
  });
  addCard(slide, SH, {
    x: 6.48,
    y: 3.86,
    w: 5.12,
    h: 1.1,
    title: "Ventaja real",
    body: "La estructura se vuelve más fácil de leer, corregir y adaptar cuando deja de estar simulada con hacks.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16.6,
    bodyFontSize: 10.4,
  });

  addCenterStatement(slide, SH, "Grid hace visible la estructura de la pantalla en el propio CSS.", {
    x: 1.38,
    y: 5.56,
    w: 10.06,
    h: 0.5,
    fill: C.softNeutral,
    fontSize: 16.2,
  });

  validateSlide(slide, pptx);
}

function createGridAreasSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Grid piensa mejor en áreas y regiones",
    "Cuando la interfaz tiene zonas reconocibles, conviene pensar en layout como composición de regiones.",
    "Bloque 4"
  );

  addPanel(slide, 1.06, 2.46, 5.34, 3.12, { fill: C.white, line: C.border });
  addSectionLabel(slide, 1.34, 2.74, "Regiones", C.softNeutral, C.navy);
  addPanel(slide, 1.4, 3.12, 4.66, 1.72, { fill: C.paper, line: C.border });
  addPanel(slide, 1.62, 3.34, 4.22, 0.36, { fill: C.paleRed, line: C.paleRed });
  addPanel(slide, 1.62, 3.84, 1.08, 0.78, { fill: C.softBlue, line: C.softBlue });
  addPanel(slide, 2.9, 3.84, 2.94, 0.78, { fill: C.warm, line: C.warm });
  slide.addText("header", { x: 3.22, y: 3.46, w: 1.0, h: 0.1, fontFace: TYPOGRAPHY.body, fontSize: 9.4, bold: true, color: C.red, align: "center", margin: 0 });
  slide.addText("sidebar", { x: 1.78, y: 4.12, w: 0.78, h: 0.1, fontFace: TYPOGRAPHY.body, fontSize: 9.4, bold: true, color: C.navy, align: "center", margin: 0 });
  slide.addText("main", { x: 4.0, y: 4.12, w: 0.76, h: 0.1, fontFace: TYPOGRAPHY.body, fontSize: 9.4, bold: true, color: C.navy, align: "center", margin: 0 });

  addCard(slide, SH, {
    x: 6.84,
    y: 2.58,
    w: 4.66,
    h: 1.1,
    title: "Cuándo ayuda",
    body: "cuando no basta con alinear una secuencia y ya hay que describir regiones de una pantalla.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16.6,
    bodyFontSize: 10.4,
  });
  addCard(slide, SH, {
    x: 6.84,
    y: 3.94,
    w: 4.66,
    h: 1.1,
    title: "Lectura madura",
    body: "Grid vuelve más natural pensar una interfaz como estructura y no solo como secuencia de bloques.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 16.6,
    bodyFontSize: 10.4,
  });

  validateSlide(slide, pptx);
}

function createGridUseCasesSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Casos donde Grid aparece con mucha fuerza",
    "Cuando el problema ya es de estructura general, Grid suele dar una solución más natural.",
    "Bloque 4"
  );

  const cards = [
    { x: 1.02, y: 2.4, title: "dashboard", body: "paneles con varias regiones", fill: C.softBlue, line: C.softBlue, accent: C.navy },
    { x: 4.02, y: 2.4, title: "catálogo", body: "grillas de productos o tarjetas", fill: C.white, line: C.border, accent: C.red },
    { x: 7.02, y: 2.4, title: "layout general", body: "sidebar + main + extras", fill: C.warm, line: C.warm, accent: C.gold },
    { x: 10.02, y: 2.4, title: "áreas", body: "regiones con relaciones fijas", fill: C.paleRed, line: C.paleRed, accent: C.red },
  ];

  cards.forEach((card) => {
    addCard(slide, SH, {
      x: card.x,
      y: card.y,
      w: 1.8,
      h: 1.62,
      title: card.title,
      body: card.body,
      fill: card.fill,
      line: card.line,
      accent: card.accent,
      titleFontSize: 14.4,
      bodyFontSize: 10.1,
    });
  });

  addFlexGridLayout(slide, SH, {
    x: 2.1,
    y: 4.34,
    w: 7.9,
    h: 1.54,
    title: "Grilla de tarjetas como ejemplo simple",
    mode: "grid",
    itemCount: 8,
    columns: 4,
  });

  validateSlide(slide, pptx);
}

function createFlexVsGridSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Flexbox y Grid no se eligen con slogans",
    "Conviene pensar el tipo de problema espacial antes de decidir la herramienta.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 1.0,
    y: 2.44,
    w: 4.9,
    h: 2.86,
    title: "Flexbox",
    body: "Mejor para secuencias, alineación, reparto de espacio dentro de una fila o columna y agrupación de elementos relacionados.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 24,
    bodyFontSize: 13,
  });
  addCard(slide, SH, {
    x: 6.12,
    y: 2.44,
    w: 4.9,
    h: 2.86,
    title: "Grid",
    body: "Mejor para layout general, columnas, regiones, áreas y estructuras donde importa la relación entre filas y columnas.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 24,
    bodyFontSize: 13,
  });

  addCenterStatement(slide, SH, "Secuencia y alineación -> Flexbox | estructura y regiones -> Grid", {
    x: 1.3,
    y: 5.56,
    w: 10.36,
    h: 0.52,
    fill: C.softNeutral,
    fontSize: 17,
  });

  validateSlide(slide, pptx);
}

function createCoexistenceSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Lo normal es que convivan dentro de una misma interfaz",
    "Una página puede usar Grid para la estructura general y Flexbox para resolver grupos internos.",
    "Bloque 4"
  );

  addPanel(slide, 0.98, 2.44, 5.82, 3.28, { fill: C.white, line: C.border });
  addSectionLabel(slide, 1.26, 2.72, "Grid general", C.softBlue, C.navy);
  addPanel(slide, 1.32, 3.1, 5.14, 2.26, { fill: C.paper, line: C.border });
  addPanel(slide, 1.54, 3.3, 4.7, 0.38, { fill: C.paleRed, line: C.paleRed });
  addPanel(slide, 1.54, 3.84, 1.06, 1.24, { fill: C.softBlue, line: C.softBlue });
  addPanel(slide, 2.82, 3.84, 3.42, 1.24, { fill: C.warm, line: C.warm });
  slide.addText("header", { x: 3.3, y: 3.42, w: 1.0, h: 0.1, fontFace: TYPOGRAPHY.body, fontSize: 9.2, bold: true, color: C.red, align: "center", margin: 0 });
  slide.addText("sidebar", { x: 1.72, y: 4.38, w: 0.72, h: 0.1, fontFace: TYPOGRAPHY.body, fontSize: 9.2, bold: true, color: C.navy, align: "center", margin: 0 });
  slide.addText("main", { x: 4.18, y: 4.38, w: 0.72, h: 0.1, fontFace: TYPOGRAPHY.body, fontSize: 9.2, bold: true, color: C.navy, align: "center", margin: 0 });

  addPanel(slide, 7.18, 2.44, 4.42, 3.28, { fill: C.navy, line: C.navy });
  slide.addText("Dentro del header o del bloque de acciones,\nFlexbox vuelve natural alinear botones, logo o navegación.", {
    x: 7.48,
    y: 2.84,
    w: 3.78,
    h: 0.68,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.4,
    color: C.sand,
    margin: 0,
  });
  addFlexGridLayout(slide, SH, {
    x: 7.46,
    y: 3.7,
    w: 3.26,
    h: 1.36,
    title: "Flex interno",
    mode: "flex",
    itemCount: 4,
  });

  validateSlide(slide, pptx);
}

function createResponsiveLayoutSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El layout también cambia cuando cambia el ancho",
    "La distribución visual madura no se piensa solo para un tamaño de pantalla.",
    "Bloque 4"
  );

  addCompactViewportCompare(slide, 1.0, 2.36, 10.8, 2.76, {
    title: "Misma interfaz, otra distribución",
    leftLabel: "Móvil",
    leftSize: "390 px",
    leftNotes: ["una columna", "CTA primero", "menos densidad"],
    rightLabel: "Desktop",
    rightSize: "1280 px",
    rightNotes: ["columnas", "más contexto", "mejor uso del ancho"],
  });

  addCenterStatement(slide, SH, "Responsive no es decorar distinto: es redistribuir con más criterio el mismo contenido.", {
    x: 1.48,
    y: 5.44,
    w: 9.88,
    h: 0.42,
    fill: C.softNeutral,
    fontSize: 15.8,
  });

  validateSlide(slide, pptx);
}

function createLayoutReasoningSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Una secuencia sana para decidir layout",
    "Conviene elegir Flexbox o Grid desde el problema espacial, no desde moda o memoria de propiedades.",
    "Bloque 4"
  );

  const steps = [
    { x: 1.0, title: "1. leer", body: "qué relación espacial necesita la interfaz", fill: C.white, line: C.border, accent: C.red },
    { x: 3.34, title: "2. decidir", body: "si es secuencia o estructura", fill: C.paleRed, line: C.paleRed, accent: C.red },
    { x: 5.68, title: "3. aplicar", body: "Flexbox o Grid con intención", fill: C.softBlue, line: C.softBlue, accent: C.navy },
    { x: 8.02, title: "4. ajustar", body: "espacio, alineación y respuesta", fill: C.warm, line: C.warm, accent: C.gold },
  ];

  steps.forEach((step, index) => {
    addCard(slide, SH, {
      x: step.x,
      y: 3.0,
      w: 1.88,
      h: 1.58,
      title: step.title,
      body: step.body,
      fill: step.fill,
      line: step.line,
      accent: step.accent,
      titleFontSize: 15,
      bodyFontSize: 10.1,
    });
    if (index < steps.length - 1) {
      addArrow(slide, step.x + 2.0, 3.66, 0.18, 0.22, index % 2 === 0 ? C.red : C.gold);
    }
  });

  addCard(slide, SH, {
    x: 10.34,
    y: 2.76,
    w: 1.38,
    h: 2.04,
    title: "Resultado",
    body: "más orden,\nmás claridad\ny menos hacks",
    fill: C.navy,
    line: C.navy,
    accent: C.red,
    titleFontSize: 14.6,
    bodyFontSize: 9.4,
    titleColor: C.white,
    bodyColor: C.sand,
  });

  validateSlide(slide, pptx);
}

function createCaseStudySlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Caso simple: una interfaz usa ambas herramientas",
    "Pensar un caso concreto ayuda más que memorizar listas aisladas de propiedades.",
    "Bloque 4"
  );

  addBrowserScene(slide, 0.92, 2.34, 6.04, 3.2, "a");
  addMiniCard(slide, SH, {
    x: 7.34,
    y: 2.52,
    w: 4.12,
    h: 0.9,
    title: "Grid para la estructura",
    body: "header + sidebar + contenido principal como regiones de la pantalla.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, SH, {
    x: 7.34,
    y: 3.72,
    w: 4.12,
    h: 0.9,
    title: "Flexbox para grupos internos",
    body: "botones, navegación y acciones dentro de un mismo bloque.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
  });
  addMiniCard(slide, SH, {
    x: 7.34,
    y: 4.92,
    w: 4.12,
    h: 0.9,
    title: "Lectura útil",
    body: "la interfaz no elige una sola herramienta: combina la adecuada según el problema.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
  });

  validateSlide(slide, pptx);
}

function createModernLayoutJudgmentSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Layout moderno también expresa criterio",
    "No basta con que algo entre en la pantalla: conviene que la distribución sea legible, razonable y mantenible.",
    "Bloque 4"
  );

  addBoxModelDiagram(slide, SH, {
    x: 0.94,
    y: 2.34,
    w: 3.38,
    h: 3.28,
    title: "Caja y espacio",
    margin: "24px",
    border: "2px",
    padding: "16px",
    content: "320 x 120",
  });

  addCard(slide, SH, {
    x: 4.64,
    y: 2.48,
    w: 2.04,
    h: 1.16,
    title: "legibilidad",
    body: "bloques mejor organizados se entienden y recorren mejor",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 15.4,
    bodyFontSize: 9.8,
  });
  addCard(slide, SH, {
    x: 4.64,
    y: 3.9,
    w: 2.04,
    h: 1.16,
    title: "mantenimiento",
    body: "menos hacks y más intención hacen más razonable corregir después",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 15.4,
    bodyFontSize: 9.8,
  });
  addCard(slide, SH, {
    x: 6.96,
    y: 2.48,
    w: 2.04,
    h: 1.16,
    title: "adaptación",
    body: "responsive mejora cuando el layout ya nació con criterio",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 15.4,
    bodyFontSize: 9.8,
  });
  addCard(slide, SH, {
    x: 6.96,
    y: 3.9,
    w: 2.04,
    h: 1.16,
    title: "diagnóstico",
    body: "una estructura clara se inspecciona mejor y se rompe menos",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 15.4,
    bodyFontSize: 9.8,
  });

  addPanel(slide, 9.34, 2.34, 2.34, 3.28, { fill: C.navy, line: C.navy });
  slide.addText("Un layout bien elegido\nno solo se ve mejor:\npiensa mejor el espacio.", {
    x: 9.62,
    y: 3.2,
    w: 1.8,
    h: 1.12,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18.4,
    bold: true,
    color: C.white,
    margin: 0,
    align: "center",
  });

  validateSlide(slide, pptx);
}

function createBlock4QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas guía del bloque",
    "Estas preguntas ayudan a fijar cuándo pensar en secuencia, cuándo pensar en estructura y cómo leer el layout con más criterio.",
    "Bloque 4"
  );

  const questions = [
    "¿Por qué distribuir elementos también es una decisión técnica y no solo visual?",
    "¿Qué tipo de problema espacial resuelve mejor Flexbox?",
    "¿Qué cambia cuando la interfaz se piensa como estructura y no solo como secuencia?",
    "¿Por qué Flexbox y Grid suelen convivir en una misma pantalla?",
  ];

  questions.forEach((question, index) => {
    addCard(slide, SH, {
      x: index % 2 === 0 ? 1.0 : 6.62,
      y: 2.42 + Math.floor(index / 2) * 1.7,
      w: 4.96,
      h: 1.36,
      title: `Pregunta ${index + 1}`,
      body: question,
      fill: index % 2 === 0 ? C.white : index === 1 ? C.softBlue : index === 2 ? C.paleRed : C.warm,
      line: index % 2 === 0 ? C.border : index === 1 ? C.softBlue : index === 2 ? C.paleRed : C.warm,
      accent: index === 1 ? C.navy : index === 3 ? C.gold : C.red,
      titleFontSize: 17,
      bodyFontSize: 11.4,
    });
  });

  validateSlide(slide, pptx);
}

function createBlock4ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del bloque",
    "Flexbox y Grid prolongan la misma lógica de orden y criterio visual trabajada en toda la clase.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 1.0,
    y: 2.38,
    w: 6.44,
    h: 3.24,
    title: "Idea clave",
    body: "Flexbox y Grid permiten distribuir interfaces modernas con más claridad, precisión y control que enfoques improvisados. La diferencia no está en memorizar más propiedades, sino en leer mejor el tipo de problema espacial que tenemos delante.",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 19.2,
    bodyFontSize: 12.2,
  });

  addPill(slide, SH, "secuencia", { x: 1.24, y: 5.78, w: 1.1, fill: C.paleRed, line: C.paleRed, color: C.red });
  addPill(slide, SH, "estructura", { x: 2.48, y: 5.78, w: 1.12, fill: C.softBlue, line: C.softBlue, color: C.navy });
  addPill(slide, SH, "responsive", { x: 3.76, y: 5.78, w: 1.18, fill: C.warm, line: C.warm, color: C.navy });
  addPill(slide, SH, "criterio", { x: 5.1, y: 5.78, w: 1.0, fill: C.softNeutral, line: C.softNeutral, color: C.navy });

  addCard(slide, SH, {
    x: 7.78,
    y: 2.38,
    w: 4.0,
    h: 3.24,
    title: "Puente al cierre",
    body: "Ya podemos mirar la clase completa como una progresión: reglas, conflicto, decisiones reutilizables y finalmente distribución espacial con herramientas modernas.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 18.2,
    bodyFontSize: 11.6,
  });

  validateSlide(slide, pptx);
}

function createClassSynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Síntesis de la clase",
    "CSS moderno se entiende mejor cuando deja de verse como maquillaje y empieza a leerse como sistema técnico.",
    "Cierre"
  );

  addCenterStatement(slide, SH, "Reglas -> conflicto -> consistencia -> layout", {
    x: 1.24,
    y: 2.32,
    w: 10.48,
    h: 0.8,
    fill: C.paleRed,
    fontSize: 24,
  });

  const items = [
    { x: 1.06, title: "1. reglas", body: "selector, propiedad y valor como base del estilo", fill: C.white, line: C.border, accent: C.red },
    { x: 3.84, title: "2. conflicto", body: "cascada, herencia y especificidad explican el resultado", fill: C.softBlue, line: C.softBlue, accent: C.navy },
    { x: 6.62, title: "3. sistema", body: "variables y tokens reducen repetición y ordenan criterio", fill: C.warm, line: C.warm, accent: C.gold },
    { x: 9.4, title: "4. layout", body: "Flexbox y Grid organizan espacio con más control", fill: C.paleRed, line: C.paleRed, accent: C.red },
  ];
  items.forEach((item) => {
    addCard(slide, SH, {
      x: item.x,
      y: 3.66,
      w: 2.18,
      h: 1.92,
      title: item.title,
      body: item.body,
      fill: item.fill,
      line: item.line,
      accent: item.accent,
      titleFontSize: 18,
      bodyFontSize: 10.4,
    });
  });

  validateSlide(slide, pptx);
}

function createClassIdeasInstalledSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Ideas que deberían quedar instaladas",
    "Lo importante no es recordar listas sueltas, sino quedarse con una lectura técnica más estable de CSS.",
    "Cierre"
  );

  const ideas = [
    "CSS no maquilla: organiza presentación y criterio visual.",
    "Cuando el estilo no cambia, conviene leer cascada, herencia y especificidad antes de tocar cosas al azar.",
    "Variables CSS ayudan a centralizar decisiones y a hablar de tokens en vez de repetir valores.",
    "Flexbox y Grid no compiten: resuelven problemas espaciales distintos y suelen convivir.",
  ];

  ideas.forEach((idea, index) => {
    addCard(slide, SH, {
      x: 1.08,
      y: 2.34 + index * 0.94,
      w: 10.52,
      h: 0.74,
      title: `${index + 1}.`,
      body: idea,
      fill: index % 2 === 0 ? C.white : C.softBlue,
      line: index % 2 === 0 ? C.border : C.softBlue,
      accent: index % 2 === 0 ? C.red : C.navy,
      titleFontSize: 15.8,
      bodyFontSize: 12.2,
    });
  });

  validateSlide(slide, pptx);
}

function createNextClassBridgeSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Puente a la siguiente clase",
    "La próxima sesión tomará esta base para entrar a responsive design, media queries y adaptación visual con más profundidad.",
    "Cierre"
  );

  addCompactViewportCompare(slide, 1.0, 2.42, 7.2, 2.88, {
    title: "Lo que viene: adaptación más explícita",
    leftLabel: "Base actual",
    leftSize: "layout claro",
    leftNotes: ["reglas", "tokens", "layout"],
    rightLabel: "Próxima clase",
    rightSize: "responsive",
    rightNotes: ["media queries", "breakpoints", "adaptación intencional"],
  });

  addCard(slide, SH, {
    x: 8.62,
    y: 2.48,
    w: 3.12,
    h: 1.18,
    title: "Continuidad",
    body: "Lo que hoy se vio en layout será la base para responsive, sistemas visuales y experiencia de interfaz.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16.6,
    bodyFontSize: 10.6,
  });
  addCard(slide, SH, {
    x: 8.62,
    y: 3.9,
    w: 3.12,
    h: 1.18,
    title: "Lectura útil",
    body: "Antes de adaptar una interfaz, conviene que sus reglas, tokens y layout ya sean legibles.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 16.6,
    bodyFontSize: 10.6,
  });

  validateSlide(slide, pptx);
}

function createClassExitSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre de la clase",
    "La capa visual también se diseña, se diagnostica y se mantiene con criterio técnico.",
    "Cierre"
  );

  addPanel(slide, 1.04, 2.42, 4.46, 3.14, { fill: C.navy, line: C.navy });
  addBarsMotif(slide, 1.34, 2.76, 0.84, C.red);
  slide.addText("CSS moderno\nse entiende mejor\ncuando se lee como\nsistema.", {
    x: 1.3,
    y: 3.38,
    w: 3.02,
    h: 1.46,
    fontFace: TYPOGRAPHY.display,
    fontSize: 24,
    bold: true,
    color: C.white,
    margin: 0,
  });

  addCard(slide, SH, {
    x: 5.92,
    y: 2.46,
    w: 5.18,
    h: 1.22,
    title: "Para cerrar",
    body: "reglas, conflicto, variables y layout forman una misma conversación técnica sobre interfaces.",
    fill: C.white,
    line: C.border,
    accent: C.red,
    titleFontSize: 17,
    bodyFontSize: 10.8,
  });
  addCard(slide, SH, {
    x: 5.92,
    y: 3.96,
    w: 5.18,
    h: 1.22,
    title: "Pregunta de salida",
    body: "¿Qué parte de CSS te cambia más la forma de mirar una interfaz: cascada, variables o layout?",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 17,
    bodyFontSize: 10.8,
  });

  validateSlide(slide, pptx);
}

async function main() {
  createCoverSlide();
  createMapSlide();
  createBlockIntroSlide();
  createHtmlVsCssSlide();
  createPipelineSlide();
  createRuleAnatomySlide();
  createSameStructureSlide();
  createNotDecorationSlide();
  createConsistencySlide();
  createImprovisationVsSystemSlide();
  createTechnicalJudgmentSlide();
  createRecapSlide();
  createQuestionsSlide();
  createClosingSlide();
  createBlock2IntroSlide();
  createCascadeCoreSlide();
  createCascadeConflictSlide();
  createOrderMattersSlide();
  createInheritanceIntroSlide();
  createInheritanceExampleSlide();
  createInheritedVsBoxSlide();
  createSpecificityIntroSlide();
  createSpecificityExampleSlide();
  createSelectorConflictSlide();
  createDebugSequenceSlide();
  createInspectorReadingSlide();
  createBlock2QuestionsSlide();
  createBlock2ClosingSlide();
  createBlock3IntroSlide();
  createRepetitionCostSlide();
  createVariablesCoreSlide();
  createValueToTokenSlide();
  createConsistencyControlSlide();
  createTokenBoardSlide();
  createSharedComponentsSlide();
  createMaintenanceCompareSlide();
  createMatureReadingSlide();
  createBlock3QuestionsSlide();
  createBlock3ClosingSlide();
  createBlock4IntroSlide();
  createDistributionDecisionSlide();
  createFlexIntroSlide();
  createFlexAxesSlide();
  createFlexUseCasesSlide();
  createGridIntroSlide();
  createGridColumnsSlide();
  createGridAreasSlide();
  createGridUseCasesSlide();
  createFlexVsGridSlide();
  createCoexistenceSlide();
  createResponsiveLayoutSlide();
  createLayoutReasoningSlide();
  createCaseStudySlide();
  createModernLayoutJudgmentSlide();
  createBlock4QuestionsSlide();
  createBlock4ClosingSlide();
  createClassSynthesisSlide();
  createClassIdeasInstalledSlide();
  createNextClassBridgeSlide();
  createClassExitSlide();

  await pptx.writeFile({ fileName: outputPptx });
  fs.copyFileSync(__filename, outputJs);
  console.log(`Deck generado: ${outputPptx}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
