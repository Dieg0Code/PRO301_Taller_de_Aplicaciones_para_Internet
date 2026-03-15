const { TOKENS } = require("../theme/tokens");
const { TYPOGRAPHY } = require("../theme/typography");

function addBrowserMock(slide, SH, opts = {}) {
  slide.addShape(SH.roundRect, {
    x: opts.x,
    y: opts.y,
    w: opts.w,
    h: opts.h,
    rectRadius: 0.04,
    fill: { color: TOKENS.white },
    line: { color: TOKENS.border, pt: 1 },
  });

  slide.addShape(SH.roundRect, {
    x: opts.x,
    y: opts.y,
    w: opts.w,
    h: 0.42,
    rectRadius: 0.04,
    fill: { color: TOKENS.softNeutral },
    line: { color: TOKENS.softNeutral },
  });
  ["D62027", "E0BC5A", "52606D"].forEach((color, index) => {
    slide.addShape(SH.ellipse, {
      x: opts.x + 0.16 + index * 0.16,
      y: opts.y + 0.14,
      w: 0.08,
      h: 0.08,
      fill: { color },
      line: { color },
    });
  });
  slide.addShape(SH.roundRect, {
    x: opts.x + 0.62,
    y: opts.y + 0.11,
    w: opts.w - 1,
    h: 0.2,
    rectRadius: 0.03,
    fill: { color: TOKENS.white },
    line: { color: TOKENS.border, pt: 1 },
  });
  slide.addText(opts.url || "https://app.local", {
    x: opts.x + 0.78,
    y: opts.y + 0.15,
    w: opts.w - 1.28,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    color: TOKENS.slate,
    margin: 0,
  });

  if (opts.title) {
    slide.addText(opts.title, {
      x: opts.x + 0.22,
      y: opts.y + 0.62,
      w: opts.w - 0.44,
      h: 0.22,
      fontFace: TYPOGRAPHY.display,
      fontSize: 16,
      bold: true,
      color: TOKENS.navy,
      margin: 0,
    });
  }
}

module.exports = {
  addBrowserMock,
};
