const { TOKENS } = require("../theme/tokens");
const { TYPOGRAPHY } = require("../theme/typography");
const { makeCodeRuns } = require("../utils/code");

function addCodePanel(slide, SH, opts = {}) {
  slide.addShape(SH.roundRect, {
    x: opts.x,
    y: opts.y,
    w: opts.w,
    h: opts.h,
    rectRadius: opts.rectRadius || 0.04,
    fill: { color: opts.fill || TOKENS.editorBg },
    line: { color: opts.fill || TOKENS.editorBg },
  });

  if (opts.title) {
    slide.addShape(SH.roundRect, {
      x: opts.x + 0.14,
      y: opts.y + 0.12,
      w: opts.w - 0.28,
      h: 0.34,
      rectRadius: 0.03,
      fill: { color: opts.titleFill || TOKENS.titleFill },
      line: { color: opts.titleFill || TOKENS.titleFill },
    });
    slide.addText(opts.title, {
      x: opts.x + 0.26,
      y: opts.y + 0.2,
      w: opts.w - 0.52,
      h: 0.16,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10,
      bold: true,
      color: TOKENS.white,
      margin: 0,
    });
  }

  slide.addText(makeCodeRuns(opts.code || "", opts.lang || "html", opts.fontSize || 11.2), {
    x: opts.x + 0.24,
    y: opts.y + 0.62,
    w: opts.w - 0.48,
    h: opts.h - 0.82,
    margin: 0,
    breakLine: false,
    valign: "top",
  });
}

function addSegment(slide, SH, x, y, w, h, color) {
  slide.addShape(SH.rect, {
    x,
    y,
    w,
    h,
    fill: { color },
    line: { color },
  });
}

function addCodeAnnotation(slide, SH, opts = {}) {
  const codeX = opts.codeX;
  const codeY = opts.codeY;
  const codeW = opts.codeW;
  const codeH = opts.codeH;
  const totalLines = opts.totalLines || 1;
  const lineNumber = opts.lineNumber || 1;
  const color = opts.color || TOKENS.red;
  const connectorColor = opts.connectorColor || TOKENS.guide || TOKENS.slate;
  const textOffsetX = opts.textOffsetX || 0.24;
  const textOffsetY = opts.textOffsetY || 0.62;
  const textAreaH = opts.textAreaH || codeH - 0.82;
  const fontSize = opts.fontSize || 11.2;
  const linePitch =
    opts.linePitch || Math.max(0.16, (fontSize / 72) * (opts.lineHeight || 1.26));
  const digits = opts.lineDigits || String(totalLines).length;
  const charW = opts.charW || Math.min(0.085, Math.max(0.058, fontSize * 0.0068));
  const side = opts.side || "right";
  const stroke = opts.stroke || 0.018;
  const gutterMarkerW = opts.gutterMarkerW || 0.07;
  const gutterMarkerH = opts.gutterMarkerH || Math.min(0.2, linePitch * 0.62);
  const gutterMarkerX =
    side === "right" ? codeX + 0.14 : codeX + codeW - 0.21;
  const codeStartX = codeX + textOffsetX + (digits + 1) * charW;
  const column = opts.column || 1;
  const tokenLength = opts.length || 4;
  const markerX = codeStartX + (column - 1) * charW;
  const markerW = Math.max(0.16, tokenLength * charW);
  const anchorY = codeY + textOffsetY + (lineNumber - 1) * linePitch + linePitch * 0.52;
  const markerY = codeY + textOffsetY + (lineNumber - 1) * linePitch + linePitch * 0.8;
  const markerH = opts.markerH || 0.05;
  const edgeX = side === "right" ? codeX + codeW - stroke : codeX;
  const laneX =
    opts.laneX || (side === "right" ? codeX + codeW + 0.14 : codeX - 0.14);
  const targetMarkerW = opts.targetMarkerW || 0.1;
  const targetMarkerH = opts.targetMarkerH || 0.08;

  let toX = opts.toX;
  let toY = opts.toY;
  if (opts.target) {
    const targetSide =
      opts.target.side || (side === "right" ? "left" : "right");
    toX =
      targetSide === "left"
        ? opts.target.x - 0.08
        : opts.target.x + opts.target.w + 0.08;
    toY =
      (opts.target.y || 0) +
      ((opts.target.anchorY != null
        ? opts.target.anchorY
        : (opts.target.h || 0) / 2));
  }
  const routeY = opts.routeY;

  slide.addShape(SH.roundRect, {
    x: gutterMarkerX,
    y: anchorY - gutterMarkerH / 2,
    w: gutterMarkerW,
    h: gutterMarkerH,
    rectRadius: 0.03,
    fill: { color },
    line: { color },
  });

  if (opts.showUnderline !== false) {
    slide.addShape(SH.roundRect, {
      x: markerX,
      y: markerY,
      w: markerW,
      h: markerH,
      rectRadius: 0.02,
      fill: { color },
      line: { color },
    });
  }

  slide.addShape(SH.roundRect, {
    x: side === "right" ? edgeX - 0.01 : edgeX - 0.01,
    y: anchorY - 0.04,
    w: 0.1,
    h: 0.08,
    rectRadius: 0.03,
    fill: { color },
    line: { color },
  });

  const firstSegX = Math.min(edgeX, laneX);
  const firstSegW = Math.abs(laneX - edgeX);
  addSegment(
    slide,
    SH,
    firstSegX,
    anchorY - stroke / 2,
    Math.max(stroke, firstSegW),
    stroke,
    connectorColor
  );

  if (routeY != null) {
    addSegment(
      slide,
      SH,
      laneX - stroke / 2,
      Math.min(anchorY, routeY),
      stroke,
      Math.max(stroke, Math.abs(routeY - anchorY)),
      connectorColor
    );
    addSegment(
      slide,
      SH,
      Math.min(laneX, toX),
      routeY - stroke / 2,
      Math.max(stroke, Math.abs(toX - laneX)),
      stroke,
      connectorColor
    );
    addSegment(
      slide,
      SH,
      toX - stroke / 2,
      Math.min(routeY, toY),
      stroke,
      Math.max(stroke, Math.abs(toY - routeY)),
      connectorColor
    );
  } else {
    addSegment(
      slide,
      SH,
      laneX - stroke / 2,
      Math.min(anchorY, toY),
      stroke,
      Math.max(stroke, Math.abs(toY - anchorY)),
      connectorColor
    );
    addSegment(
      slide,
      SH,
      Math.min(laneX, toX),
      toY - stroke / 2,
      Math.max(stroke, Math.abs(toX - laneX)),
      stroke,
      connectorColor
    );
  }

  slide.addShape(SH.roundRect, {
    x: toX - targetMarkerW / 2,
    y: toY - targetMarkerH / 2,
    w: targetMarkerW,
    h: targetMarkerH,
    rectRadius: 0.03,
    fill: { color },
    line: { color },
  });
}

module.exports = {
  addCodePanel,
  addCodeAnnotation,
};
