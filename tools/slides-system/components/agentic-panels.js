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

function addLabelPill(slide, SH, x, y, w, text, opts = {}) {
  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h: opts.h || 0.24,
    rectRadius: 0.04,
    fill: { color: opts.fill || TOKENS.warm },
    line: { color: opts.fill || TOKENS.warm },
  });
  slide.addText(text, {
    x,
    y: y + 0.05,
    w,
    h: (opts.h || 0.24) - 0.08,
    fontFace: TYPOGRAPHY.body,
    fontSize: opts.fontSize || 8.2,
    bold: true,
    color: opts.color || TOKENS.slate,
    margin: 0,
    align: "center",
  });
}

function addAgenticFlow(slide, SH, opts = {}) {
  const x = opts.x;
  const y = opts.y;
  const w = opts.w;
  const h = opts.h;
  const steps = opts.steps || [
    { step: "1", title: "Intencion", body: "Que debe lograrse y para quien.", accent: TOKENS.red },
    { step: "2", title: "Contexto", body: "Restricciones, archivos y entorno real.", accent: TOKENS.gold },
    { step: "3", title: "Agente", body: "Propone, ejecuta o acelera tareas acotadas.", accent: TOKENS.titleFill },
    { step: "4", title: "Validacion", body: "Pruebas, lectura, inspeccion y decision.", accent: TOKENS.red },
  ];
  const compact = Boolean(opts.compact || w < 8.6 || steps.length > 4);
  const footerH = opts.footer ? 0.28 : 0;
  const innerY = y + 0.62;
  const innerH = h - 0.84 - footerH;
  const cols = compact ? 2 : steps.length;
  const rows = compact ? Math.ceil(steps.length / 2) : 1;
  const gapX = compact ? 0.22 : 0.18;
  const gapY = 0.22;
  const cellW = (w - 0.32 - gapX * (cols - 1)) / cols;
  const cellH = (innerH - gapY * (rows - 1)) / rows;

  addSurface(slide, SH, x, y, w, h, {
    fill: opts.fill || TOKENS.white,
    line: opts.line || TOKENS.border,
  });
  addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Flujo de trabajo con agentes", {
    fill: opts.headerFill || TOKENS.softNeutral,
  });

  steps.forEach((entry, index) => {
    const col = compact ? index % cols : index;
    const row = compact ? Math.floor(index / cols) : 0;
    const cellX = x + 0.16 + col * (cellW + gapX);
    const cellY = innerY + row * (cellH + gapY);
    const accent = entry.accent || TOKENS.red;
    const fill = entry.fill || TOKENS.white;
    const tone = entry.tone || "light";
    const titleColor = tone === "dark" ? TOKENS.white : TOKENS.navy;
    const bodyColor = tone === "dark" ? "E7EEF8" : TOKENS.ink;

    addSurface(slide, SH, cellX, cellY, cellW, cellH, {
      fill,
      line: fill === TOKENS.white ? TOKENS.border : fill,
    });
    slide.addShape(SH.rect, {
      x: cellX + 0.1,
      y: cellY + 0.14,
      w: 0.1,
      h: cellH - 0.28,
      fill: { color: accent },
      line: { color: accent },
    });
    slide.addShape(SH.roundRect, {
      x: cellX + 0.26,
      y: cellY + 0.14,
      w: 0.34,
      h: 0.24,
      rectRadius: 0.05,
      fill: { color: accent },
      line: { color: accent },
    });
    slide.addText(entry.step || String(index + 1), {
      x: cellX + 0.26,
      y: cellY + 0.19,
      w: 0.34,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.6,
      bold: true,
      color: TOKENS.white,
      margin: 0,
      align: "center",
    });
    slide.addText(entry.title || "", {
      x: cellX + 0.68,
      y: cellY + 0.14,
      w: cellW - 0.82,
      h: 0.2,
      fontFace: TYPOGRAPHY.display,
      fontSize: compact ? 13.6 : 14.2,
      bold: true,
      color: titleColor,
      margin: 0,
    });
    slide.addText(entry.body || "", {
      x: cellX + 0.26,
      y: cellY + 0.52,
      w: cellW - 0.38,
      h: Math.max(0.38, cellH - 0.66),
      fontFace: TYPOGRAPHY.body,
      fontSize: compact ? 10.1 : 10.4,
      color: bodyColor,
      margin: 0,
      valign: "mid",
    });

    if (!compact && index < steps.length - 1) {
      slide.addShape(SH.chevron, {
        x: cellX + cellW + 0.04,
        y: cellY + cellH / 2 - 0.12,
        w: 0.1,
        h: 0.24,
        fill: { color: opts.chevronColor || TOKENS.gold },
        line: { color: opts.chevronColor || TOKENS.gold },
      });
    }
  });

  if (opts.footer) {
    slide.addShape(SH.roundRect, {
      x: x + 0.22,
      y: y + h - 0.44,
      w: w - 0.44,
      h: 0.24,
      rectRadius: 0.03,
      fill: { color: TOKENS.warm },
      line: { color: TOKENS.warm },
    });
    slide.addText(opts.footer, {
      x: x + 0.34,
      y: y + h - 0.39,
      w: w - 0.68,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.8,
      bold: true,
      color: TOKENS.navy,
      margin: 0,
      align: "center",
    });
  }
}

function addSpecWorkflow(slide, SH, opts = {}) {
  const x = opts.x;
  const y = opts.y;
  const w = opts.w;
  const h = opts.h;
  const phases = opts.phases || [
    {
      step: "1",
      title: "Spec",
      question: "Que debe lograrse?",
      artifact: "Requisitos, historias y restricciones.",
      control: "Claridad funcional.",
      accent: TOKENS.red,
      fill: TOKENS.paleRed,
    },
    {
      step: "2",
      title: "Plan",
      question: "Como se construira?",
      artifact: "Arquitectura, stack y limites.",
      control: "Consistencia tecnica.",
      accent: TOKENS.titleFill,
      fill: TOKENS.softBlue,
    },
    {
      step: "3",
      title: "Tasks",
      question: "En que orden?",
      artifact: "Tareas pequenas y testeables.",
      control: "Aislamiento y trazabilidad.",
      accent: TOKENS.gold,
      fill: TOKENS.warm,
    },
    {
      step: "4",
      title: "Implement",
      question: "Que cambia en el sistema?",
      artifact: "Codigo, pruebas y evidencia.",
      control: "Resultado verificable.",
      accent: TOKENS.red,
      fill: TOKENS.white,
    },
  ];
  const compact = Boolean(opts.compact || w < 8.8);
  const cols = compact ? 2 : Math.min(4, phases.length);
  const rows = compact ? Math.ceil(phases.length / 2) : 1;
  const gapX = 0.22;
  const gapY = 0.2;
  const footerH = opts.footer ? 0.28 : 0;
  const bodyY = y + 0.62;
  const bodyH = h - 0.84 - footerH;
  const cardW = (w - 0.32 - gapX * (cols - 1)) / cols;
  const cardH = (bodyH - gapY * (rows - 1)) / rows;

  addSurface(slide, SH, x, y, w, h, {
    fill: opts.fill || TOKENS.white,
    line: opts.line || TOKENS.border,
  });
  addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Spec-driven workflow", {
    fill: opts.headerFill || TOKENS.softNeutral,
  });

  phases.forEach((phase, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const cardX = x + 0.16 + col * (cardW + gapX);
    const cardY = bodyY + row * (cardH + gapY);
    const accent = phase.accent || TOKENS.red;

    addSurface(slide, SH, cardX, cardY, cardW, cardH, {
      fill: phase.fill || TOKENS.white,
      line: TOKENS.border,
    });
    addLabelPill(slide, SH, cardX + 0.12, cardY + 0.14, 0.42, phase.step || String(index + 1), {
      fill: accent,
      color: TOKENS.white,
    });
    slide.addText(phase.title || "", {
      x: cardX + 0.64,
      y: cardY + 0.14,
      w: cardW - 0.76,
      h: 0.18,
      fontFace: TYPOGRAPHY.display,
      fontSize: 13.6,
      bold: true,
      color: TOKENS.navy,
      margin: 0,
    });
    slide.addShape(SH.rect, {
      x: cardX + 0.12,
      y: cardY + 0.48,
      w: 0.08,
      h: cardH - 0.62,
      fill: { color: accent },
      line: { color: accent },
    });

    const textX = cardX + 0.28;
    const textW = cardW - 0.4;
    slide.addText("Pregunta guia", {
      x: textX,
      y: cardY + 0.5,
      w: textW,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8,
      bold: true,
      color: TOKENS.slate,
      margin: 0,
    });
    slide.addText(phase.question || "", {
      x: textX,
      y: cardY + 0.66,
      w: textW,
      h: 0.28,
      fontFace: TYPOGRAPHY.body,
      fontSize: compact ? 9.4 : 9.8,
      bold: true,
      color: TOKENS.navy,
      margin: 0,
    });
    slide.addText("Artefacto", {
      x: textX,
      y: cardY + 1.04,
      w: textW,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8,
      bold: true,
      color: TOKENS.slate,
      margin: 0,
    });
    slide.addText(phase.artifact || "", {
      x: textX,
      y: cardY + 1.2,
      w: textW,
      h: 0.34,
      fontFace: TYPOGRAPHY.body,
      fontSize: compact ? 8.9 : 9.2,
      color: TOKENS.ink,
      margin: 0,
    });
    slide.addText("Control", {
      x: textX,
      y: cardY + cardH - 0.62,
      w: textW,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8,
      bold: true,
      color: TOKENS.slate,
      margin: 0,
    });
    slide.addText(phase.control || "", {
      x: textX,
      y: cardY + cardH - 0.46,
      w: textW,
      h: 0.22,
      fontFace: TYPOGRAPHY.body,
      fontSize: compact ? 8.8 : 9,
      bold: true,
      color: TOKENS.navy,
      margin: 0,
    });
  });

  if (opts.footer) {
    slide.addText(opts.footer, {
      x: x + 0.22,
      y: y + h - 0.22,
      w: w - 0.44,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.8,
      color: TOKENS.slate,
      margin: 0,
      align: "center",
    });
  }
}

function addDelegationSplit(slide, SH, opts = {}) {
  const x = opts.x;
  const y = opts.y;
  const w = opts.w;
  const h = opts.h;
  const left = opts.left || {};
  const right = opts.right || {};
  const footerH = opts.footer ? 0.28 : 0;
  const gap = opts.gap || 0.2;
  const bridgeW = opts.bridgeW || 1.48;
  const colW = (w - 0.32 - gap * 2 - bridgeW) / 2;
  const innerY = y + 0.62;
  const innerH = h - 0.84 - footerH;
  const leftX = x + 0.16;
  const bridgeX = leftX + colW + gap;
  const rightX = bridgeX + bridgeW + gap;

  addSurface(slide, SH, x, y, w, h, {
    fill: opts.fill || TOKENS.white,
    line: opts.line || TOKENS.border,
  });
  addSurfaceHeader(slide, SH, x + 0.14, y + 0.14, w - 0.28, opts.title || "Ayuda posible vs validacion obligatoria", {
    fill: opts.headerFill || TOKENS.softNeutral,
  });

  function drawColumn(colX, entries, title, subtitle, accent, fill, dark) {
    addSurface(slide, SH, colX, innerY, colW, innerH, {
      fill,
      line: fill === TOKENS.white ? TOKENS.border : fill,
    });
    slide.addShape(SH.rect, {
      x: colX + 0.12,
      y: innerY + 0.14,
      w: 0.12,
      h: innerH - 0.28,
      fill: { color: accent },
      line: { color: accent },
    });
    slide.addText(title, {
      x: colX + 0.34,
      y: innerY + 0.14,
      w: colW - 0.48,
      h: 0.22,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15,
      bold: true,
      color: dark ? TOKENS.white : TOKENS.navy,
      margin: 0,
    });
    if (subtitle) {
      slide.addText(subtitle, {
        x: colX + 0.34,
        y: innerY + 0.44,
        w: colW - 0.48,
        h: 0.24,
        fontFace: TYPOGRAPHY.body,
        fontSize: 9.4,
        color: dark ? "DCE6F2" : TOKENS.slate,
        margin: 0,
      });
    }
    const rows = entries || [];
    const listY = innerY + 0.82;
    const rowGap = rows.length >= 4 ? 0.1 : 0.14;
    const availableListH = innerH - (listY - innerY) - 0.12;
    const rowH = Math.max(
      0.22,
      Math.min(0.34, (availableListH - rowGap * Math.max(0, rows.length - 1)) / Math.max(rows.length, 1))
    );
    rows.forEach((item, idx) => {
      const itemY = listY + idx * (rowH + rowGap);
      slide.addShape(SH.roundRect, {
        x: colX + 0.34,
        y: itemY,
        w: colW - 0.5,
        h: rowH,
        rectRadius: 0.04,
        fill: { color: dark ? "173A5A" : TOKENS.white },
        line: { color: dark ? "173A5A" : TOKENS.border, pt: 0.8 },
      });
      slide.addShape(SH.ellipse, {
        x: colX + 0.44,
        y: itemY + rowH / 2 - 0.045,
        w: 0.09,
        h: 0.09,
        fill: { color: accent },
        line: { color: accent },
      });
      slide.addText(item, {
        x: colX + 0.6,
        y: itemY + 0.05,
        w: colW - 0.82,
        h: rowH - 0.08,
        fontFace: TYPOGRAPHY.body,
        fontSize: 8.5,
        color: dark ? TOKENS.white : TOKENS.ink,
        margin: 0,
        valign: "mid",
      });
    });
  }

  drawColumn(
    leftX,
    left.items || ["Explorar opciones", "Pedir una primera version", "Detectar repeticion"],
    left.title || "El agente puede ayudar con",
    left.subtitle || "apoyo rapido y trabajo repetitivo",
    left.accent || TOKENS.titleFill,
    left.fill || TOKENS.softBlue,
    Boolean(left.dark)
  );
  drawColumn(
    rightX,
    right.items || ["Leer el resultado real", "Validar en herramientas", "Decidir que se integra"],
    right.title || "No conviene delegar",
    right.subtitle || "criterio, lectura y validacion final",
    right.accent || TOKENS.red,
    right.fill || TOKENS.white,
    Boolean(right.dark)
  );

  const bridgeOuterX = bridgeX + 0.08;
  const bridgeOuterW = bridgeW - 0.16;
  const bridgeOuterH = opts.bridgeOuterH || 1.78;
  const bridgeOuterY = innerY + innerH / 2 - bridgeOuterH / 2;
  const bridgeLabelH = 0.3;
  const bridgeBodyH = 0.4;

  slide.addShape(SH.roundRect, {
    x: bridgeOuterX,
    y: bridgeOuterY,
    w: bridgeOuterW,
    h: bridgeOuterH,
    rectRadius: 0.06,
    fill: { color: opts.bridgeFill || TOKENS.warm },
    line: { color: opts.bridgeFill || TOKENS.warm },
  });
  slide.addShape(SH.roundRect, {
    x: bridgeOuterX + 0.12,
    y: bridgeOuterY + 0.16,
    w: bridgeOuterW - 0.24,
    h: bridgeLabelH,
    rectRadius: 0.04,
    fill: { color: TOKENS.white },
    line: { color: TOKENS.white },
  });
  slide.addShape(SH.chevron, {
    x: bridgeOuterX + 0.2,
    y: bridgeOuterY + 0.62,
    w: bridgeOuterW - 0.4,
    h: 0.18,
    fill: { color: opts.bridgeAccent || TOKENS.gold },
    line: { color: opts.bridgeAccent || TOKENS.gold },
  });
  slide.addText(opts.bridgeLabel || "Flujo sano", {
    x: bridgeOuterX + 0.18,
    y: bridgeOuterY + 0.21,
    w: bridgeOuterW - 0.36,
    h: bridgeLabelH - 0.08,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.bridgeLabelFontSize || 10.6,
    bold: true,
    color: TOKENS.navy,
    margin: 0,
    align: "center",
    fit: "shrink",
  });
  slide.addText(opts.bridgeBody || "Intentar, leer y decidir con evidencia.", {
    x: bridgeOuterX + 0.14,
    y: bridgeOuterY + 1.07,
    w: bridgeOuterW - 0.28,
    h: bridgeBodyH,
    fontFace: TYPOGRAPHY.body,
    fontSize: opts.bridgeBodyFontSize || 7.2,
    color: TOKENS.slate,
    margin: 0,
    align: "center",
    valign: "mid",
    fit: "shrink",
  });

  if (opts.footer) {
    slide.addShape(SH.roundRect, {
      x: x + 0.22,
      y: y + h - 0.44,
      w: w - 0.44,
      h: 0.24,
      rectRadius: 0.03,
      fill: { color: TOKENS.warm },
      line: { color: TOKENS.warm },
    });
    slide.addText(opts.footer, {
      x: x + 0.34,
      y: y + h - 0.39,
      w: w - 0.68,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.8,
      bold: true,
      color: TOKENS.navy,
      margin: 0,
      align: "center",
    });
  }
}

module.exports = {
  addAgenticFlow,
  addSpecWorkflow,
  addDelegationSplit,
};
