const { TOKENS } = require("../theme/tokens");
const { TYPOGRAPHY } = require("../theme/typography");

function addSurface(slide, SH, x, y, w, h, opts = {}) {
  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: opts.rectRadius || 0.04,
    fill: { color: opts.fill || TOKENS.white },
    line: { color: opts.line || TOKENS.border, pt: opts.linePt || 1 },
  });
}

function addSurfaceHeader(slide, SH, x, y, w, text, opts = {}) {
  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h: opts.h || 0.34,
    rectRadius: opts.rectRadius || 0.03,
    fill: { color: opts.fill || TOKENS.softNeutral },
    line: { color: opts.fill || TOKENS.softNeutral },
  });
  slide.addText(text, {
    x: x + 0.12,
    y: y + 0.08,
    w: w - 0.24,
    h: (opts.h || 0.34) - 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: opts.fontSize || 9.8,
    bold: true,
    color: opts.color || TOKENS.navy,
    margin: 0,
  });
}

function addViewportCard(slide, SH, x, y, w, h, opts = {}) {
  addSurface(slide, SH, x, y, w, h, {
    fill: opts.fill || TOKENS.white,
    line: opts.line || TOKENS.border,
  });

  slide.addShape(SH.roundRect, {
    x: x + 0.1,
    y: y + 0.1,
    w: w - 0.2,
    h: 0.24,
    rectRadius: 0.03,
    fill: { color: TOKENS.softNeutral },
    line: { color: TOKENS.softNeutral },
  });

  ["D62027", "E0BC5A", "52606D"].forEach((color, index) => {
    slide.addShape(SH.ellipse, {
      x: x + 0.18 + index * 0.12,
      y: y + 0.17,
      w: 0.06,
      h: 0.06,
      fill: { color },
      line: { color },
    });
  });

  slide.addText(opts.label || "Viewport", {
    x: x + 0.12,
    y: y + 0.44,
    w: w - 0.24,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 12.5,
    bold: true,
    color: TOKENS.navy,
    margin: 0,
  });

  if (opts.sizeLabel) {
    slide.addShape(SH.roundRect, {
      x: x + 0.12,
      y: y + 0.72,
      w: 0.98,
      h: 0.26,
      rectRadius: 0.03,
      fill: { color: opts.toneFill || TOKENS.softBlue },
      line: { color: opts.toneFill || TOKENS.softBlue },
    });
    slide.addText(opts.sizeLabel, {
      x: x + 0.2,
      y: y + 0.78,
      w: 0.82,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.4,
      bold: true,
      color: opts.tone || TOKENS.navy,
      margin: 0,
      align: "center",
    });
  }

  const screenX = x + 0.18;
  const screenY = y + 1.1;
  const screenW = w - 0.36;
  const screenH = h - 1.34;

  slide.addShape(SH.roundRect, {
    x: screenX,
    y: screenY,
    w: screenW,
    h: screenH,
    rectRadius: 0.03,
    fill: { color: TOKENS.paper },
    line: { color: TOKENS.border, pt: 1 },
  });

  slide.addShape(SH.rect, {
    x: screenX + 0.12,
    y: screenY + 0.12,
    w: screenW - 0.24,
    h: opts.heroH || 0.34,
    fill: { color: opts.heroFill || TOKENS.navy },
    line: { color: opts.heroFill || TOKENS.navy },
  });

  for (let index = 0; index < (opts.blockCount || 3); index += 1) {
    const blockY = screenY + 0.58 + index * 0.38;
    slide.addShape(SH.roundRect, {
      x: screenX + 0.12,
      y: blockY,
      w: screenW - 0.24,
      h: 0.22,
      rectRadius: 0.02,
      fill: { color: index % 2 === 0 ? TOKENS.white : TOKENS.mist },
      line: { color: index % 2 === 0 ? TOKENS.border : TOKENS.mist, pt: 1 },
    });
  }

  const notes = opts.notes || [];
  notes.slice(0, 3).forEach((note, index) => {
    slide.addShape(SH.ellipse, {
      x: x + 0.16,
      y: y + h - 0.7 + index * 0.18,
      w: 0.06,
      h: 0.06,
      fill: { color: opts.tone || TOKENS.red },
      line: { color: opts.tone || TOKENS.red },
    });
    slide.addText(note, {
      x: x + 0.28,
      y: y + h - 0.71 + index * 0.18,
      w: w - 0.4,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.8,
      color: TOKENS.slate,
      margin: 0,
    });
  });
}

function addResponsiveViewportCompare(slide, SH, opts = {}) {
  const x = opts.x;
  const y = opts.y;
  const w = opts.w;
  const h = opts.h;
  const leftW = opts.leftW || w * 0.42;
  const rightW = opts.rightW || w * 0.42;
  const gap = opts.gap || w - leftW - rightW;

  addSurface(slide, SH, x, y, w, h, {
    fill: TOKENS.white,
    line: TOKENS.border,
  });
  addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Responsive", {
    fill: TOKENS.softNeutral,
  });

  addViewportCard(slide, SH, x + 0.22, y + 0.62, leftW, h - 0.84, {
    label: (opts.left && opts.left.label) || "Móvil",
    sizeLabel: (opts.left && opts.left.sizeLabel) || "390 px",
    notes: (opts.left && opts.left.notes) || ["Una columna", "Más aire", "Prioridad al CTA"],
    tone: TOKENS.red,
    toneFill: TOKENS.paleRed,
    heroFill: TOKENS.red,
    blockCount: 4,
  });

  slide.addShape(SH.chevron, {
    x: x + leftW + 0.34,
    y: y + h / 2 - 0.18,
    w: 0.44,
    h: 0.36,
    fill: { color: TOKENS.gold },
    line: { color: TOKENS.gold },
  });

  addViewportCard(slide, SH, x + leftW + gap + 0.1, y + 0.62, rightW, h - 0.84, {
    label: (opts.right && opts.right.label) || "Desktop",
    sizeLabel: (opts.right && opts.right.sizeLabel) || "1280 px",
    notes: (opts.right && opts.right.notes) || ["Más contexto", "Jerarquía lateral", "Aprovecha el ancho"],
    tone: TOKENS.navy,
    toneFill: TOKENS.softBlue,
    heroFill: TOKENS.navy,
    blockCount: 5,
  });
}

function addCssRuleStack(slide, SH, opts = {}) {
  const x = opts.x;
  const y = opts.y;
  const w = opts.w;
  const h = opts.h;
  const rules = opts.rules || [];

  addSurface(slide, SH, x, y, w, h, {
    fill: TOKENS.white,
    line: TOKENS.border,
  });
  addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Cascada y especificidad", {
    fill: TOKENS.softBlue,
  });

  rules.slice(0, 5).forEach((rule, index) => {
    const rowY = y + 0.66 + index * 0.56;
    const active = Boolean(rule.active);
    const fill = active ? TOKENS.paleRed : TOKENS.paper;
    const line = active ? TOKENS.red : TOKENS.border;
    const selectorW = w * 0.34;
    const specificityW = 0.88;

    slide.addShape(SH.roundRect, {
      x: x + 0.18,
      y: rowY,
      w: w - 0.36,
      h: 0.42,
      rectRadius: 0.03,
      fill: { color: fill },
      line: { color: line, pt: active ? 1.2 : 1 },
    });

    slide.addShape(SH.rect, {
      x: x + 0.18,
      y: rowY,
      w: 0.08,
      h: 0.42,
      fill: { color: active ? TOKENS.red : TOKENS.navy },
      line: { color: active ? TOKENS.red : TOKENS.navy },
    });

    slide.addText(rule.selector || ".card", {
      x: x + 0.34,
      y: rowY + 0.08,
      w: selectorW,
      h: 0.12,
      fontFace: TYPOGRAPHY.mono,
      fontSize: 10.2,
      color: TOKENS.navy,
      margin: 0,
    });

    slide.addText(rule.declaration || "color: var(--ink);", {
      x: x + 0.34 + selectorW,
      y: rowY + 0.08,
      w: w - selectorW - specificityW - 0.92,
      h: 0.12,
      fontFace: TYPOGRAPHY.mono,
      fontSize: 10,
      color: TOKENS.ink,
      margin: 0,
    });

    slide.addShape(SH.roundRect, {
      x: x + w - specificityW - 0.18,
      y: rowY + 0.08,
      w: specificityW,
      h: 0.24,
      rectRadius: 0.03,
      fill: { color: active ? TOKENS.red : TOKENS.softNeutral },
      line: { color: active ? TOKENS.red : TOKENS.softNeutral },
    });
    slide.addText(rule.specificity || "0,1,0", {
      x: x + w - specificityW - 0.12,
      y: rowY + 0.14,
      w: specificityW - 0.12,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.8,
      bold: true,
      color: active ? TOKENS.white : TOKENS.navy,
      align: "center",
      margin: 0,
    });
  });

  if (opts.footer) {
    slide.addText(opts.footer, {
      x: x + 0.18,
      y: y + h - 0.32,
      w: w - 0.36,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.2,
      color: TOKENS.slate,
      margin: 0,
      align: "center",
    });
  }
}

function addBoxModelDiagram(slide, SH, opts = {}) {
  const x = opts.x;
  const y = opts.y;
  const w = opts.w;
  const h = opts.h;
  const innerW = w - 0.44;
  const innerH = h - 1.08;
  const stepInset = Math.min(0.3, Math.max(0.18, Math.min((innerW - 1.08) / 6, (innerH - 0.84) / 6)));
  const compact = w <= 3.4 || h <= 3.3;

  addSurface(slide, SH, x, y, w, h, {
    fill: TOKENS.white,
    line: TOKENS.border,
  });
  addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Box model", {
    fill: TOKENS.softNeutral,
  });

  const levels = [
    { label: "margin", value: opts.margin || "24px", fill: TOKENS.warm, line: TOKENS.gold, depth: 0 },
    { label: "border", value: opts.border || "2px", fill: TOKENS.softBlue, line: TOKENS.navy, depth: 1 },
    { label: "padding", value: opts.padding || "16px", fill: TOKENS.softNeutral, line: TOKENS.sand, depth: 2 },
    { label: "content", value: opts.content || "320 x 120", fill: TOKENS.white, line: TOKENS.border, depth: 3 },
  ];

  levels.forEach((level, index) => {
    const inset = stepInset * level.depth;
    const currentX = x + 0.22 + inset;
    const currentY = y + 0.74 + inset;
    const currentW = w - 0.44 - inset * 2;
    const currentH = h - 1.08 - inset * 2;
    const labelW = Math.min(currentW - 0.88, compact ? 0.62 : 0.82);
    const valueW = compact ? 0.58 : 0.72;
    const textY = currentY + (compact ? 0.06 : 0.08);

    slide.addShape(SH.roundRect, {
      x: currentX,
      y: currentY,
      w: currentW,
      h: currentH,
      rectRadius: 0.03,
      fill: { color: level.fill },
      line: { color: level.line, pt: index === 3 ? 1 : 1.2 },
    });
    slide.addText(level.label, {
      x: currentX + 0.12,
      y: textY,
      w: labelW,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: compact ? 8.6 : 9.4,
      bold: true,
      color: TOKENS.navy,
      margin: 0,
    });
    slide.addText(level.value, {
      x: currentX + currentW - valueW - 0.12,
      y: textY,
      w: valueW,
      h: 0.12,
      fontFace: TYPOGRAPHY.mono,
      fontSize: compact ? 7.8 : 9,
      color: TOKENS.slate,
      align: "right",
      margin: 0,
    });
  });
}

function addFlexGridLayout(slide, SH, opts = {}) {
  const x = opts.x;
  const y = opts.y;
  const w = opts.w;
  const h = opts.h;
  const mode = opts.mode || "flex";
  const itemCount = opts.itemCount || 6;
  const columns = opts.columns || 3;

  addSurface(slide, SH, x, y, w, h, {
    fill: TOKENS.white,
    line: TOKENS.border,
  });
  addSurfaceHeader(
    slide,
    SH,
    x + 0.14,
    y + 0.14,
    w - 0.28,
    opts.title || (mode === "grid" ? "Grid layout" : "Flex layout"),
    {
      fill: mode === "grid" ? TOKENS.softBlue : TOKENS.paleRed,
    }
  );

  const containerX = x + 0.22;
  const containerY = y + 0.68;
  const containerW = w - 0.44;
  const containerH = h - 0.96;

  slide.addShape(SH.roundRect, {
    x: containerX,
    y: containerY,
    w: containerW,
    h: containerH,
    rectRadius: 0.03,
    fill: { color: TOKENS.paper },
    line: { color: TOKENS.border, pt: 1 },
  });

  if (mode === "grid") {
    const rows = Math.ceil(itemCount / columns);
    const gap = Math.min(0.16, Math.max(0.04, containerH / (rows * 4 + 1)));
    const itemW = (containerW - gap * (columns + 1)) / columns;
    const itemH = (containerH - gap * (rows + 1)) / rows;

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < columns; col += 1) {
        const index = row * columns + col;
        if (index >= itemCount) continue;
        slide.addShape(SH.roundRect, {
          x: containerX + gap + col * (itemW + gap),
          y: containerY + gap + row * (itemH + gap),
          w: itemW,
          h: itemH,
          rectRadius: 0.03,
          fill: { color: index % 2 === 0 ? TOKENS.softBlue : TOKENS.white },
          line: { color: index % 2 === 0 ? TOKENS.softBlue : TOKENS.border, pt: 1 },
        });
      }
    }
  } else {
    const flexColumns = opts.flexColumns || (itemCount <= 3 ? itemCount : containerH < 0.92 ? 2 : 3);
    const rows = Math.ceil(itemCount / flexColumns);
    const gap = Math.min(rows > 1 ? 0.14 : 0.16, Math.max(0.04, containerH / (rows * 4 + 1)));
    const itemW = (containerW - gap * (flexColumns + 1)) / flexColumns;
    const itemH = (containerH - gap * (rows + 1)) / rows;
    for (let index = 0; index < itemCount; index += 1) {
      const row = Math.floor(index / flexColumns);
      const col = index % flexColumns;
      slide.addShape(SH.roundRect, {
        x: containerX + gap + col * (itemW + gap),
        y: containerY + gap + row * (itemH + gap),
        w: itemW,
        h: itemH,
        rectRadius: 0.03,
        fill: { color: index % 2 === 0 ? TOKENS.paleRed : TOKENS.white },
        line: { color: index % 2 === 0 ? TOKENS.paleRed : TOKENS.border, pt: 1 },
      });
    }
  }
}

function scoreTone(score) {
  if (score >= 90) return { ring: TOKENS.success, fill: TOKENS.successSoft };
  if (score >= 70) return { ring: TOKENS.warning, fill: TOKENS.warningSoft };
  return { ring: TOKENS.red, fill: TOKENS.paleRed };
}

function addLighthouseAuditCard(slide, SH, opts = {}) {
  const x = opts.x;
  const y = opts.y;
  const w = opts.w;
  const h = opts.h;
  const scores = opts.scores || [
    { label: "Performance", score: 86 },
    { label: "Accesibilidad", score: 94 },
    { label: "SEO", score: 92 },
    { label: "Buenas prácticas", score: 88 },
  ];

  addSurface(slide, SH, x, y, w, h, {
    fill: TOKENS.white,
    line: TOKENS.border,
  });
  addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Auditoría rápida", {
    fill: TOKENS.softBlue,
  });

  const gap = 0.18;
  const cardW = (w - gap * 5) / 4;
  scores.slice(0, 4).forEach((item, index) => {
    const tone = scoreTone(item.score);
    const cardX = x + gap + index * (cardW + gap);

    slide.addShape(SH.roundRect, {
      x: cardX,
      y: y + 0.7,
      w: cardW,
      h: 1.54,
      rectRadius: 0.03,
      fill: { color: tone.fill },
      line: { color: tone.fill },
    });
    slide.addShape(SH.ellipse, {
      x: cardX + cardW / 2 - 0.34,
      y: y + 0.88,
      w: 0.68,
      h: 0.68,
      fill: { color: TOKENS.white },
      line: { color: tone.ring, pt: 3.6 },
    });
    slide.addText(String(item.score), {
      x: cardX + cardW / 2 - 0.26,
      y: y + 1.08,
      w: 0.52,
      h: 0.18,
      fontFace: TYPOGRAPHY.display,
      fontSize: 16,
      bold: true,
      color: TOKENS.navy,
      align: "center",
      margin: 0,
    });
    slide.addText(item.label, {
      x: cardX + 0.08,
      y: y + 1.66,
      w: cardW - 0.16,
      h: 0.28,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.4,
      bold: true,
      color: TOKENS.navy,
      align: "center",
      margin: 0,
    });
  });

  if (opts.summary) {
    slide.addText(opts.summary, {
      x: x + 0.18,
      y: y + h - 0.26,
      w: w - 0.36,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.2,
      color: TOKENS.slate,
      margin: 0,
      align: "center",
    });
  }
}

function addCascadeInspector(slide, SH, opts = {}) {
  const x = opts.x;
  const y = opts.y;
  const w = opts.w;
  const h = opts.h;
  const rules = opts.rules || [];
  const compactInspector = w < 7.2;

  addSurface(slide, SH, x, y, w, h, {
    fill: TOKENS.white,
    line: TOKENS.border,
  });
  addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Inspector de cascada", {
    fill: TOKENS.softBlue,
  });

  const elementW = opts.elementW || Math.max(1.24, Math.min(1.72, w * (compactInspector ? 0.2 : 0.22)));
  const resultW = opts.resultW || Math.max(1.3, Math.min(1.58, w * (compactInspector ? 0.22 : 0.24)));
  const inspectorGap = opts.gap || (compactInspector ? 0.24 : 0.22);
  const stackX = x + 0.2 + elementW + inspectorGap;
  const stackW = w - elementW - resultW - inspectorGap * 2 - 0.4;
  const stackY = y + 0.72;
  const stackH = h - 1;
  const connectorW = opts.connectorW || (compactInspector ? 0.2 : 0.22);
  const connectorH = opts.connectorH || (compactInspector ? 0.28 : 0.3);
  const connectorY = y + h / 2 - connectorH / 2;

  slide.addShape(SH.roundRect, {
    x: x + 0.2,
    y: y + 0.92,
    w: elementW,
    h: h - 1.38,
    rectRadius: 0.04,
    fill: { color: TOKENS.paper },
    line: { color: TOKENS.border, pt: 1 },
  });
  slide.addText(opts.elementLabel || "<p class=\"destacado\">", {
    x: x + 0.34,
    y: y + 1.12,
    w: elementW - 0.28,
    h: 0.32,
    fontFace: TYPOGRAPHY.mono,
    fontSize: compactInspector ? 9.4 : 10.2,
    bold: true,
    color: TOKENS.navy,
    margin: 0,
  });
  slide.addText(opts.propertyLabel || "Propiedad observada", {
    x: x + 0.34,
    y: y + 1.56,
    w: elementW - 0.28,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.9,
    color: TOKENS.slate,
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: x + 0.34,
    y: y + 1.82,
    w: elementW - 0.28,
    h: 0.38,
    rectRadius: 0.03,
    fill: { color: TOKENS.warm },
    line: { color: TOKENS.warm },
  });
  slide.addText(opts.propertyValue || "color", {
    x: x + 0.44,
    y: y + 1.94,
    w: elementW - 0.48,
    h: 0.1,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.2,
    bold: true,
    color: TOKENS.navy,
    align: "center",
    margin: 0,
  });

  slide.addShape(SH.chevron, {
    x: x + 0.2 + elementW + (inspectorGap - connectorW) / 2,
    y: connectorY,
    w: connectorW,
    h: connectorH,
    fill: { color: TOKENS.red },
    line: { color: TOKENS.red },
  });

  slide.addShape(SH.roundRect, {
    x: stackX,
    y: stackY,
    w: stackW,
    h: stackH,
    rectRadius: 0.04,
    fill: { color: TOKENS.paper },
    line: { color: TOKENS.border, pt: 1 },
  });

  const rowGap = 0.12;
  const visibleRules = rules.slice(0, 4);
  const rawRowH =
    (stackH - 0.3 - rowGap * (Math.max(visibleRules.length, 1) - 1)) / Math.max(visibleRules.length, 1);
  const rowH = Math.max(compactInspector ? 0.52 : 0.56, Math.min(compactInspector ? 0.78 : 0.82, rawRowH));
  visibleRules.forEach((rule, index) => {
    const rowY = stackY + 0.14 + index * (rowH + rowGap);
    const active = Boolean(rule.active);
    const selectorW = Math.max(0.72, stackW * (compactInspector ? 0.32 : 0.34));
    const declarationW = Math.max(0.72, stackW * (compactInspector ? 0.36 : 0.38));
    const badgeW = compactInspector ? 0.7 : 0.78;
    const badgeX = stackX + stackW - (compactInspector ? 0.98 : 1.08);
    slide.addShape(SH.roundRect, {
      x: stackX + 0.12,
      y: rowY,
      w: stackW - 0.24,
      h: rowH,
      rectRadius: 0.03,
      fill: { color: active ? TOKENS.paleRed : TOKENS.white },
      line: { color: active ? TOKENS.red : TOKENS.border, pt: active ? 1.2 : 1 },
    });
    slide.addShape(SH.rect, {
      x: stackX + 0.12,
      y: rowY,
      w: 0.08,
      h: rowH,
      fill: { color: active ? TOKENS.red : TOKENS.navy },
      line: { color: active ? TOKENS.red : TOKENS.navy },
    });
    slide.addText(rule.selector || ".card", {
      x: stackX + 0.28,
      y: rowY + 0.08,
      w: selectorW,
      h: 0.12,
      fontFace: TYPOGRAPHY.mono,
      fontSize: compactInspector ? 8.4 : 9.2,
      color: TOKENS.navy,
      margin: 0,
    });
    slide.addText(rule.declaration || "color: var(--ink);", {
      x: stackX + 0.28,
      y: rowY + (compactInspector ? 0.28 : 0.26),
      w: declarationW,
      h: 0.12,
      fontFace: TYPOGRAPHY.mono,
      fontSize: compactInspector ? 7.9 : 8.5,
      color: TOKENS.ink,
      margin: 0,
    });
    slide.addShape(SH.roundRect, {
      x: badgeX,
      y: rowY + 0.08,
      w: badgeW,
      h: 0.22,
      rectRadius: 0.03,
      fill: { color: active ? TOKENS.red : TOKENS.softNeutral },
      line: { color: active ? TOKENS.red : TOKENS.softNeutral },
    });
    slide.addText(rule.specificity || "0,1,0", {
      x: badgeX + 0.06,
      y: rowY + 0.135,
      w: badgeW - 0.12,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: compactInspector ? 7.6 : 8.1,
      bold: true,
      color: active ? TOKENS.white : TOKENS.navy,
      align: "center",
      margin: 0,
    });
    slide.addText(rule.reason || (active ? "aplica" : "pierde por peso u orden"), {
      x: badgeX - (compactInspector ? 0.02 : 0.08),
      y: rowY + rowH - 0.17,
      w: compactInspector ? 0.82 : 0.9,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: compactInspector ? 7.1 : 7.6,
      color: TOKENS.slate,
      align: "center",
      margin: 0,
    });
  });

  slide.addShape(SH.chevron, {
    x: stackX + stackW + (inspectorGap - connectorW) / 2,
    y: connectorY,
    w: connectorW,
    h: connectorH,
    fill: { color: TOKENS.gold },
    line: { color: TOKENS.gold },
  });

  slide.addShape(SH.roundRect, {
    x: x + w - resultW - 0.2,
    y: y + 0.92,
    w: resultW,
    h: h - 1.38,
    rectRadius: 0.04,
    fill: { color: TOKENS.softBlue },
    line: { color: TOKENS.softBlue },
  });
  slide.addText(opts.resultLabel || "Resultado", {
    x: x + w - resultW - 0.04,
    y: y + 1.12,
    w: resultW - 0.32,
    h: 0.16,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13,
    bold: true,
    color: TOKENS.navy,
    align: "center",
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: x + w - resultW - 0.06,
    y: y + 1.56,
    w: resultW - 0.28,
    h: 0.42,
    rectRadius: 0.03,
    fill: { color: TOKENS.white },
    line: { color: TOKENS.border, pt: 1 },
  });
  slide.addText(opts.resolvedValue || "#d62027", {
    x: x + w - resultW - 0.02,
    y: y + 1.7,
    w: resultW - 0.36,
    h: 0.1,
    fontFace: TYPOGRAPHY.mono,
    fontSize: 10,
    bold: true,
    color: TOKENS.red,
    align: "center",
    margin: 0,
  });
  const resultNote =
    opts.resultNote === undefined ? "la regla activa domina la propiedad final" : opts.resultNote;
  if (resultNote) {
    slide.addText(resultNote, {
      x: x + w - resultW - 0.06,
      y: y + 2.16,
      w: resultW - 0.28,
      h: 0.36,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.9,
      color: TOKENS.ink,
      align: "center",
      valign: "mid",
      margin: 0,
    });
  }
}

function addSpecificityScale(slide, SH, opts = {}) {
  const x = opts.x;
  const y = opts.y;
  const w = opts.w;
  const h = opts.h;
  const entries = opts.entries || [
    { label: "Etiqueta", value: "0,0,1", weightLabel: "bajo" },
    { label: "Clase", value: "0,1,0", weightLabel: "medio" },
    { label: "ID", value: "1,0,0", weightLabel: "alto", active: true },
    { label: "Inline", value: "inline", weightLabel: "máximo" },
  ];

  addSurface(slide, SH, x, y, w, h, {
    fill: TOKENS.white,
    line: TOKENS.border,
  });
  addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Escala de especificidad", {
    fill: TOKENS.paleRed,
  });

  const compact = h < 1.8;
  if (!compact) {
    slide.addText(opts.subtitle || "a medida que el selector gana precisión, también gana peso", {
      x: x + 0.2,
      y: y + 0.56,
      w: w - 0.4,
      h: 0.14,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.1,
      color: TOKENS.slate,
      margin: 0,
    });
  }

  const trackX = x + 0.4;
  const trackY = y + h - 0.72;
  const trackW = w - 0.8;
  if (!compact) {
    slide.addShape(SH.rect, {
      x: trackX,
      y: trackY,
      w: trackW,
      h: 0.06,
      fill: { color: TOKENS.guide },
      line: { color: TOKENS.guide },
    });
  }

  const maxBarW = trackW - 0.6;
  const barYBase = compact ? y + 0.58 : y + 0.98;
  const gap = compact ? 0.08 : 0.16;
  const availableH = compact
    ? Math.max(0.9, h - 0.72)
    : Math.max(1.2, trackY - barYBase - 0.08);
  const rowH = Math.max(
    compact ? 0.2 : 0.28,
    Math.min(0.56, (availableH - gap * (entries.length - 1)) / Math.max(entries.length, 1))
  );

  entries.slice(0, 5).forEach((entry, index) => {
    const currentY = barYBase + index * (rowH + gap);
    const tone = entry.active ? TOKENS.red : index >= 2 ? TOKENS.navy : TOKENS.sand;
    const fill = entry.active ? TOKENS.paleRed : index >= 2 ? TOKENS.softBlue : TOKENS.warm;
    const factor = entry.scale || (index === 0 ? 0.28 : index === 1 ? 0.48 : index === 2 ? 0.72 : index === 3 ? 0.94 : 0.82);
    const barW = Math.max(1.3, maxBarW * factor);

    slide.addText(entry.label || "Clase", {
      x: x + 0.26,
      y: currentY + (compact ? 0.07 : 0.12),
      w: 1.12,
      h: 0.12,
      fontFace: TYPOGRAPHY.display,
      fontSize: compact ? 9.6 : 11.2,
      bold: true,
      color: TOKENS.navy,
      margin: 0,
    });

    slide.addShape(SH.roundRect, {
      x: x + 1.48,
      y: currentY,
      w: barW,
      h: rowH,
      rectRadius: 0.03,
      fill: { color: fill },
      line: { color: tone, pt: entry.active ? 1.4 : 1 },
    });
    slide.addShape(SH.rect, {
      x: x + 1.48,
      y: currentY,
      w: 0.1,
      h: rowH,
      fill: { color: tone },
      line: { color: tone },
    });
    slide.addText(entry.value || "0,1,0", {
      x: x + 1.68,
      y: currentY + (compact ? 0.07 : 0.11),
      w: 0.72,
      h: 0.12,
      fontFace: TYPOGRAPHY.mono,
      fontSize: compact ? 8.2 : 9.2,
      bold: true,
      color: entry.active ? TOKENS.red : TOKENS.navy,
      margin: 0,
    });
    slide.addText(entry.weightLabel || "medio", {
      x: x + 2.48,
      y: currentY + (compact ? 0.07 : 0.11),
      w: barW - 1.02,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: compact ? 7.8 : 8.9,
      color: TOKENS.ink,
      margin: 0,
    });
  });

  if (opts.footer && !compact) {
    slide.addText(opts.footer, {
      x: x + 0.22,
      y: y + h - 0.34,
      w: w - 0.44,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.8,
      color: TOKENS.slate,
      align: "center",
      margin: 0,
    });
  }
}

function addTokenBoard(slide, SH, opts = {}) {
  const x = opts.x;
  const y = opts.y;
  const w = opts.w;
  const h = opts.h;
  const groups = opts.groups || [
    {
      title: "Color",
      tone: TOKENS.red,
      items: [
        { label: "--color-primario", value: "#D62027", swatch: TOKENS.red },
        { label: "--text-main", value: "#102A43", swatch: TOKENS.navy },
      ],
    },
    {
      title: "Espacio",
      tone: TOKENS.gold,
      items: [
        { label: "--space-sm", value: "8px" },
        { label: "--space-md", value: "16px" },
      ],
    },
    {
      title: "Superficie",
      tone: TOKENS.navy,
      items: [
        { label: "--surface-card", value: "#FFFFFF", swatch: TOKENS.white },
        { label: "--radius-md", value: "12px" },
      ],
    },
  ];

  addSurface(slide, SH, x, y, w, h, {
    fill: TOKENS.white,
    line: TOKENS.border,
  });
  addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Tablero de tokens", {
    fill: TOKENS.softNeutral,
  });

  const visibleGroups = groups.slice(0, 4);
  const gap = 0.18;
  const groupW = (w - 0.4 - gap * (visibleGroups.length - 1)) / visibleGroups.length;
  const footerReserve = opts.footer ? 0.34 : 0;
  visibleGroups.forEach((group, index) => {
    const groupX = x + 0.2 + index * (groupW + gap);
    const tone = group.tone || (index === 0 ? TOKENS.red : index === 1 ? TOKENS.gold : TOKENS.navy);
    const fill = group.fill || (index === 0 ? TOKENS.paleRed : index === 1 ? TOKENS.warm : TOKENS.softBlue);

    slide.addShape(SH.roundRect, {
      x: groupX,
      y: y + 0.72,
      w: groupW,
      h: h - 0.94 - footerReserve,
      rectRadius: 0.04,
      fill: { color: fill },
      line: { color: fill },
    });
    slide.addShape(SH.rect, {
      x: groupX,
      y: y + 0.72,
      w: 0.1,
      h: h - 0.94 - footerReserve,
      fill: { color: tone },
      line: { color: tone },
    });
    slide.addText(group.title || "Grupo", {
      x: groupX + 0.2,
      y: y + 0.88,
      w: groupW - 0.28,
      h: 0.16,
      fontFace: TYPOGRAPHY.display,
      fontSize: 12.2,
      bold: true,
      color: TOKENS.navy,
      margin: 0,
    });

    const items = group.items || [];
    items.slice(0, 4).forEach((item, itemIndex) => {
      const itemY = y + 1.26 + itemIndex * 0.56;
      const hasSwatch = Boolean(item.swatch);
      const labelFontSize = hasSwatch && String(item.label || "").length > 14 ? 7.6 : 8.2;
      const labelX = groupX + (hasSwatch ? 0.48 : 0.24);
      const labelW = groupW - (hasSwatch ? 0.82 : 0.52);
      const valueX = labelX;
      const valueW = labelW;
      slide.addShape(SH.roundRect, {
        x: groupX + 0.16,
        y: itemY,
        w: groupW - 0.3,
        h: 0.42,
        rectRadius: 0.03,
        fill: { color: TOKENS.white },
        line: { color: TOKENS.border, pt: 1 },
      });
      if (hasSwatch) {
        slide.addShape(SH.roundRect, {
          x: groupX + 0.24,
          y: itemY + 0.11,
          w: 0.16,
          h: 0.16,
          rectRadius: 0.03,
          fill: { color: item.swatch },
          line: { color: item.swatch === TOKENS.white ? TOKENS.border : item.swatch, pt: 1 },
        });
      }
      slide.addText(item.label || "--token", {
        x: labelX,
        y: itemY + 0.08,
        w: labelW,
        h: 0.12,
        fontFace: TYPOGRAPHY.mono,
        fontSize: labelFontSize,
        color: TOKENS.navy,
        margin: 0,
      });
      slide.addText(item.value || "#FFFFFF", {
        x: valueX,
        y: itemY + 0.22,
        w: valueW,
        h: 0.1,
        fontFace: TYPOGRAPHY.body,
        fontSize: 8.4,
        color: TOKENS.slate,
        margin: 0,
      });
    });
  });

  if (opts.footer) {
    slide.addText(opts.footer, {
      x: x + 0.2,
      y: y + h - 0.18,
      w: w - 0.4,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.4,
      color: TOKENS.slate,
      align: "center",
      margin: 0,
    });
  }
}

module.exports = {
  addResponsiveViewportCompare,
  addCssRuleStack,
  addCascadeInspector,
  addSpecificityScale,
  addTokenBoard,
  addBoxModelDiagram,
  addFlexGridLayout,
  addLighthouseAuditCard,
};
