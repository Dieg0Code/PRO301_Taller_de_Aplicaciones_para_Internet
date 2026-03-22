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
  addDelegationSplit,
  addBrowserMock,
  addQualityDimensionsPanel,
  addAuditEvidenceBoard,
  addAuditScorePanel,
  addAccessibilityChecklistPanel,
  addIssuePriorityMatrix,
  addLighthouseAuditCard,
  addPerformanceMetricsBoard,
  addNetworkLoadBoard,
  addSeoSnippetPreview,
  addComponentTree,
  addPill,
} = components;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
applyAiepTheme(pptx, {
  author: "Codex",
  company: "AIEP",
  subject: "Clase 06",
  title: "Calidad Web, SEO Tecnico, Rendimiento y Auditoria - Bloque 1",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx =
  process.env.PPTX_OUTPUT ||
  path.join(rootDir, "Clase-06-Bloque-1-Calidad-Web-y-Auditoria.pptx");
const outputJs =
  process.env.PPTX_SOURCE_OUTPUT ||
  path.join(rootDir, "Clase-06-Bloque-1-Calidad-Web-y-Auditoria.js");

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
    classLabel: `Clase 06 · ${blockLabel}`,
    logoMarkPath,
    subtitleY: 1.84,
    subtitleH: 0.3,
    subtitleFontSize: 11.2,
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
    x: x + 0.24,
    y: y + 0.72,
    w: w - 0.48,
    h: h - 1.02,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.fontSize || 18.4,
    bold: true,
    color: opts.color || C.navy,
    align: "center",
    valign: "mid",
    margin: 0,
  });
}

function addArrow(slide, x, y, w = 0.38, h = 0.26, fill = C.gold) {
  slide.addShape(SH.chevron, {
    x,
    y,
    w,
    h,
    fill: { color: fill },
    line: { color: fill },
  });
}

function addPageScene(slide, x, y, w, h, opts = {}) {
  addBrowserMock(slide, SH, {
    x,
    y,
    w,
    h,
    url: opts.url || "https://demo.local/landing",
  });

  const innerX = x + 0.18;
  const innerY = y + 0.56;
  const innerW = w - 0.36;
  slide.addShape(SH.roundRect, {
    x: innerX,
    y: innerY,
    w: innerW,
    h: 0.42,
    rectRadius: 0.03,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText(opts.hero || "Página de ejemplo", {
    x: innerX + 0.12,
    y: innerY + 0.12,
    w: innerW - 0.24,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.4,
    bold: true,
    color: C.white,
    margin: 0,
  });

  addPanel(slide, innerX, innerY + 0.62, 1.68, h - 1.4, {
    fill: C.paleRed,
    line: C.paleRed,
  });
  addPanel(slide, innerX + 1.86, innerY + 0.62, innerW - 1.86, 0.5, {
    fill: C.white,
    line: C.border,
  });
  addPanel(slide, innerX + 1.86, innerY + 1.28, innerW - 1.86, 0.68, {
    fill: C.white,
    line: C.border,
  });
  addPanel(slide, innerX + 1.86, innerY + 2.12, innerW - 1.86, 0.52, {
    fill: C.warm,
    line: C.warm,
  });

  slide.addShape(SH.roundRect, {
    x: innerX + innerW - 1.04,
    y: innerY + 2.76,
    w: 0.9,
    h: 0.34,
    rectRadius: 0.03,
    fill: { color: C.red },
    line: { color: C.red },
  });
}

function addIssueCard(slide, x, y, title, body, accent, fill) {
  addMiniCard(slide, SH, {
    x,
    y,
    w: 2.34,
    h: 0.98,
    title,
    body,
    accent,
    fill,
    line: fill,
    titleFontSize: 12.2,
    bodyFontSize: 8.8,
  });
}

function createCoverSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };

  slide.addImage({
    path: logoPath,
    ...imageSizingContain(logoPath, 9.38, 0.48, 2.8, 1.06),
  });
  addBarsMotif(slide, 0.78, 1.18, 1.4, C.red);

  slide.addText("Clase 06 · Semana 02", {
    x: 1.42,
    y: 1.46,
    w: 2.6,
    h: 0.14,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Medir y mejorar\nla calidad web", {
    x: 0.78,
    y: 2.06,
    w: 4.1,
    h: 1.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 24.5,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("SEO técnico, rendimiento, accesibilidad y auditoría con criterio", {
    x: 0.8,
    y: 3.56,
    w: 4.46,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13.4,
    color: "F3E7DE",
    margin: 0,
  });
  slide.addText("Una página puede verse bien y aun así estar mal resuelta desde su estructura, su carga o su uso.", {
    x: 0.82,
    y: 4.26,
    w: 4.14,
    h: 0.74,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13,
    color: C.white,
    margin: 0,
  });

  addPanel(slide, 0.82, 5.58, 2.92, 0.76, { fill: "355F95", line: "355F95" });
  slide.addShape(SH.rect, {
    x: 0.94,
    y: 5.74,
    w: 0.08,
    h: 0.44,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("Miércoles 25 de marzo de 2026\n10:50 - 13:10", {
    x: 1.08,
    y: 5.78,
    w: 2.36,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.6,
    bold: true,
    color: C.white,
    margin: 0,
  });

  addCenterStatement(slide, SH, "La calidad técnica también se revisa.", {
    x: 4.06,
    y: 5.6,
    w: 3.76,
    h: 0.74,
    fill: "F3DADB",
    fontSize: 20.2,
  });

  addPageScene(slide, 5.92, 1.86, 4.82, 3.48, {
    url: "https://demo.local/landing",
    hero: "Página principal",
  });
  addMiniCard(slide, SH, {
    x: 9.42,
    y: 4.56,
    w: 2.2,
    h: 1.08,
    title: "Hallazgos ocultos",
    body: "peso alto, headings pobres, links vagos y contraste discutible",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });

  validateSlide(slide, pptx);
}

function createMapSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Mapa de la clase",
    "Hoy la calidad web aparece como estructura, carga, uso y evidencia técnica.",
    "Bloque 1"
  );

  addMapBlock(slide, 0.82, 2.18, 2.1, 2.72, {
    kicker: "Bloque 1",
    title: "Calidad web no es solo apariencia",
    fill: C.red,
    line: C.red,
    kickerColor: C.white,
    color: C.white,
    fontSize: 18.4,
  });
  addArrow(slide, 3.01, 3.36, 0.2, 0.22);
  addMapBlock(slide, 3.26, 2.18, 2.18, 2.72, {
    kicker: "Bloque 2",
    title: "SEO técnico y estructura que sí se deja entender",
    fill: C.white,
    line: C.border,
    fontSize: 17.2,
  });
  addArrow(slide, 5.52, 3.36, 0.22, 0.22);
  addMapBlock(slide, 5.8, 2.18, 2.18, 2.72, {
    kicker: "Bloque 3",
    title: "Rendimiento y experiencia percibida",
    fill: C.warm,
    line: C.warm,
    fontSize: 17.8,
  });
  addArrow(slide, 8.07, 3.36, 0.22, 0.22);
  addMapBlock(slide, 8.36, 2.18, 2.26, 2.72, {
    kicker: "Bloque 4",
    title: "Accesibilidad y auditoría con herramientas actuales",
    fill: C.softBlue,
    line: C.softBlue,
    fontSize: 16.8,
  });

  addCenterStatement(slide, SH, "Estructura -> visibilidad -> experiencia -> revisión técnica", {
    x: 1.42,
    y: 5.68,
    w: 9.36,
    h: 0.82,
    fill: C.softNeutral,
    fontSize: 18.6,
  });

  validateSlide(slide, pptx);
}

function createBlockIntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Bloque 1 · Calidad web no es solo apariencia",
    "La calidad también se juega en lo que la página comunica, carga, permite usar y deja medir.",
    "Bloque 1"
  );

  addPanel(slide, 0.96, 2.3, 3.24, 3.56, { fill: "2F5687", line: "2F5687" });
  addBarsMotif(slide, 1.22, 2.7, 1.18, C.red);
  slide.addText("Una interfaz puede verse limpia\nsin estar bien resuelta.", {
    x: 1.2,
    y: 3.26,
    w: 2.46,
    h: 1.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 21.8,
    bold: true,
    color: C.white,
    margin: 0,
  });
  ["estructura", "carga", "uso", "evidencia"].forEach((label, index) => {
    addPill(slide, SH, label, {
      x: 1.24 + (index % 2) * 1.2,
      y: 5.06 + Math.floor(index / 2) * 0.34,
      w: 1.04,
      h: 0.24,
      fill: index === 0 ? C.paleRed : index === 1 ? C.softBlue : index === 2 ? C.warm : C.white,
      line: index === 3 ? C.white : undefined,
      color: index === 0 ? C.red : C.navy,
      fontSize: 8.1,
    });
  });

  addPageScene(slide, 4.58, 2.22, 4.12, 2.84, {
    url: "https://demo.local/home",
    hero: "Se ve bien",
  });

  addIssueCard(slide, 8.96, 2.4, "No se entiende bien", "title y headings pobres ocultan el propósito real.", C.red, C.paleRed);
  addIssueCard(slide, 8.96, 3.54, "Carga pesada", "la primera vista depende de recursos que no aportan valor inmediato.", C.navy, C.softBlue);
  addIssueCard(slide, 8.96, 4.68, "Uso frágil", "labels, contraste o foco pueden fallar sin que se note de inmediato.", C.gold, C.warm);

  validateSlide(slide, pptx);
}

function createLooksFineSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Una página puede verse bien y aun así estar mal resuelta",
    "Lo visual puede esconder problemas de estructura, peso o uso que no aparecen a simple vista.",
    "Bloque 1"
  );

  addPanel(slide, 0.96, 2.34, 4.92, 3.86, { fill: C.white, line: C.border });
  slide.addText("Se ve bien", {
    x: 1.16,
    y: 2.54,
    w: 4.5,
    h: 0.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  addPageScene(slide, 1.14, 2.9, 4.5, 2.88, {
    url: "https://demo.local/demo",
    hero: "Interfaz ordenada",
  });

  addPanel(slide, 6.18, 2.34, 5.08, 3.86, { fill: C.softNeutral, line: C.softNeutral });
  slide.addText("Pero conviene revisar", {
    x: 6.42,
    y: 2.54,
    w: 3.8,
    h: 0.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15.2,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  addCard(slide, SH, {
    x: 6.44,
    y: 2.94,
    w: 4.52,
    h: 0.82,
    title: "Documento y estructura",
    body: "título, headings, semántica y enlaces explican de qué trata la página.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 12.8,
    bodyFontSize: 9,
  });
  addCard(slide, SH, {
    x: 6.44,
    y: 3.92,
    w: 4.52,
    h: 0.82,
    title: "Carga y recursos",
    body: "peso de imágenes, CSS, JS y terceros puede degradar la experiencia antes de leer.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 12.8,
    bodyFontSize: 9,
  });
  addCard(slide, SH, {
    x: 6.44,
    y: 4.9,
    w: 4.52,
    h: 0.82,
    title: "Uso y auditoría",
    body: "contraste, labels, foco y métricas vuelven visible una calidad que no siempre se ve a ojo.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 12.8,
    bodyFontSize: 9,
  });

  validateSlide(slide, pptx);
}

function createDimensionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La calidad aparece en más de una capa",
    "SEO técnico, rendimiento, accesibilidad y auditoría se cruzan; no viven como listas separadas.",
    "Bloque 1"
  );

  addQualityDimensionsPanel(slide, SH, {
    x: 0.9,
    y: 2.22,
    w: 7.56,
    h: 3.92,
    centerLabel: "Calidad web",
    dimensions: [
      {
        title: "SEO técnico",
        body: "La página debe dejar claro de qué trata y cómo está organizada.",
        accent: C.red,
        fill: C.paleRed,
      },
      {
        title: "Rendimiento",
        body: "El contenido útil debería aparecer mejor y sin costo innecesario.",
        accent: C.gold,
        fill: C.warm,
      },
      {
        title: "Accesibilidad",
        body: "Una interfaz clara también debe poder leerse, recorrerse y usarse mejor.",
        accent: C.navy,
        fill: C.softBlue,
      },
      {
        title: "Auditoría",
        body: "Herramientas y reportes ayudan a pasar de intuición a evidencia.",
        accent: C.navy,
        fill: C.mist,
      },
    ],
    footer: "La calidad web no vive en una sola métrica ni en una sola disciplina.",
  });

  addMiniCard(slide, SH, {
    x: 8.7,
    y: 2.42,
    w: 2.32,
    h: 1.02,
    title: "Una mejora cruza capas",
    body: "HTML más claro puede ayudar tanto a visibilidad como a accesibilidad.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addMiniCard(slide, SH, {
    x: 8.7,
    y: 3.66,
    w: 2.32,
    h: 1.02,
    title: "Un recurso pesado impacta dos veces",
    body: "empeora carga y también la experiencia percibida.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });
  addMiniCard(slide, SH, {
    x: 8.7,
    y: 4.9,
    w: 2.32,
    h: 1.02,
    title: "Auditar no es decorar",
    body: "medir permite detectar problemas que visualmente pasan desapercibidos.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });

  validateSlide(slide, pptx);
}

function createConnectedConversationSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Estas dimensiones no viven separadas",
    "Cuando una página mejora o empeora, normalmente lo hace en varias capas a la vez.",
    "Bloque 1"
  );

  addCenterStatement(slide, SH, "Una estructura más clara mejora comprensión. Un recurso mal resuelto empeora carga. Un formulario mal etiquetado afecta uso.", {
    x: 0.96,
    y: 2.22,
    w: 10.28,
    h: 0.92,
    fill: C.softNeutral,
    fontSize: 17.2,
  });

  addCard(slide, SH, {
    x: 1.06,
    y: 3.56,
    w: 2.8,
    h: 1.48,
    title: "Estructura",
    body: "title, headings, regiones semánticas y enlaces ayudan a entender de qué trata la página.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 14,
    bodyFontSize: 9.2,
  });
  addArrow(slide, 4.06, 4.14, 0.42, 0.3, C.gold);
  addCard(slide, SH, {
    x: 4.48,
    y: 3.56,
    w: 2.86,
    h: 1.48,
    title: "Carga",
    body: "peso, orden de recursos y bloqueo inicial cambian la experiencia antes de leer.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14,
    bodyFontSize: 9.2,
  });
  addArrow(slide, 7.58, 4.14, 0.42, 0.3, C.gold);
  addCard(slide, SH, {
    x: 8,
    y: 3.56,
    w: 2.86,
    h: 1.48,
    title: "Uso",
    body: "contraste, labels, foco y orden de lectura definen qué tan clara resulta la interfaz.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 14,
    bodyFontSize: 9.2,
  });

  addCenterStatement(slide, SH, "La auditoría sirve justamente para volver visible esa conversación completa.", {
    x: 2.12,
    y: 5.5,
    w: 7.7,
    h: 0.72,
    fill: C.white,
    line: C.border,
    fontSize: 18.2,
  });

  validateSlide(slide, pptx);
}

function createIntuitionSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Intuición visual no basta",
    "Mirar una pantalla a ojo ayuda, pero no alcanza para diagnosticar calidad técnica.",
    "Bloque 1"
  );

  addPanel(slide, 0.98, 2.3, 4.98, 3.84, { fill: C.white, line: C.border });
  slide.addText("Lectura intuitiva", {
    x: 1.2,
    y: 2.52,
    w: 2.2,
    h: 0.16,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.8,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  addPageScene(slide, 1.16, 2.92, 3.16, 2.48, {
    url: "https://demo.local/portafolio",
    hero: "Se ve ordenada",
  });
  addMiniCard(slide, SH, {
    x: 4.3,
    y: 3.1,
    w: 1.44,
    h: 1.1,
    title: "Parece bien",
    body: "pero todavía no dice nada sobre estructura o carga.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 12.4,
    bodyFontSize: 8.4,
  });

  addPanel(slide, 6.28, 2.3, 4.84, 3.84, { fill: C.softNeutral, line: C.softNeutral });
  slide.addText("Lectura técnica", {
    x: 6.5,
    y: 2.52,
    w: 2.2,
    h: 0.16,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.8,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  addMiniCard(slide, SH, {
    x: 6.52,
    y: 3.04,
    w: 4.18,
    h: 0.86,
    title: "Documento",
    body: "¿title, headings y links explican bien la página?",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addMiniCard(slide, SH, {
    x: 6.52,
    y: 4,
    w: 4.18,
    h: 0.86,
    title: "Recursos",
    body: "¿qué recursos pesan más y qué bloquea el contenido principal?",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });
  addMiniCard(slide, SH, {
    x: 6.52,
    y: 4.96,
    w: 4.18,
    h: 0.86,
    title: "Uso y señales",
    body: "¿hay contraste suficiente, labels claros y alertas que convenga priorizar?",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });

  validateSlide(slide, pptx);
}

function createEvidenceBoardSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Qué tipo de evidencia empezaremos a leer",
    "El objetivo no es memorizar herramientas, sino aprender qué señales vale la pena interpretar.",
    "Bloque 1"
  );

  addAuditEvidenceBoard(slide, SH, {
    x: 0.92,
    y: 2.18,
    w: 7.9,
    h: 4.02,
    items: [
      {
        title: "Documento",
        body: "title, headings, enlaces y regiones semánticas muestran si la página se deja entender.",
        accent: C.red,
        fill: C.paleRed,
      },
      {
        title: "Recursos",
        body: "imágenes, CSS, JS y terceros dejan ver dónde se está yendo el peso.",
        accent: C.gold,
        fill: C.warm,
      },
      {
        title: "Métricas",
        body: "LCP, CLS e INP conectan el diagnóstico con la experiencia percibida.",
        accent: C.navy,
        fill: C.softBlue,
      },
      {
        title: "Alertas",
        body: "Lighthouse y DevTools revelan problemas que visualmente pasan desapercibidos.",
        accent: C.navy,
        fill: C.mist,
      },
    ],
    insightTitle: "Lectura técnica",
    insightBody: "La calidad web se entiende mejor cuando cruzamos documento, carga, métricas y alertas antes de decidir qué corregir.",
    steps: ["leer la señal", "priorizar impacto", "validar en navegador"],
    footer: "La evidencia sirve cuando se interpreta antes de actuar.",
  });

  addMiniCard(slide, SH, {
    x: 8.98,
    y: 2.4,
    w: 2.08,
    h: 1.1,
    title: "No todo pesa igual",
    body: "una advertencia menor no tiene el mismo impacto que un heading roto o una imagen enorme.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 11.6,
    bodyFontSize: 8.3,
  });
  addMiniCard(slide, SH, {
    x: 8.98,
    y: 3.72,
    w: 2.08,
    h: 1.1,
    title: "Leer antes de optimizar",
    body: "primero entender el problema; después decidir la mejora.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
    titleFontSize: 11.6,
    bodyFontSize: 8.3,
  });
  addMiniCard(slide, SH, {
    x: 8.98,
    y: 5.04,
    w: 2.08,
    h: 1.1,
    title: "La clase sigue este orden",
    body: "estructura, rendimiento, accesibilidad y auditoría como lectura conectada.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
    titleFontSize: 11.4,
    bodyFontSize: 8.2,
  });

  validateSlide(slide, pptx);
}

function createToolsNotDecideSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Las herramientas ayudan a medir, pero no deciden solas",
    "Una auditoría ordena señales; el criterio técnico sigue siendo necesario para leer prioridad y contexto.",
    "Bloque 1"
  );

  addLighthouseAuditCard(slide, SH, {
    x: 0.98,
    y: 2.36,
    w: 5.34,
    h: 2.64,
    title: "Auditoría rápida",
    scores: [
      { label: "SEO", score: 68 },
      { label: "Rendimiento", score: 54 },
      { label: "Accesibilidad", score: 89 },
      { label: "Buenas prácticas", score: 82 },
    ],
    summary: "El score orienta, pero no explica por sí solo qué conviene corregir primero.",
  });

  addCard(slide, SH, {
    x: 6.62,
    y: 2.48,
    w: 4.08,
    h: 1.04,
    title: "La alerta no equivale automáticamente a prioridad",
    body: "Hay hallazgos pequeños, otros repetidos y otros que sí dañan visibilidad, carga o uso real.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 14,
    bodyFontSize: 9,
  });
  addCard(slide, SH, {
    x: 6.62,
    y: 3.72,
    w: 4.08,
    h: 1.04,
    title: "El contexto decide",
    body: "El mismo problema no pesa igual en una landing simple, un catálogo o un formulario clave.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14,
    bodyFontSize: 9,
  });
  addCard(slide, SH, {
    x: 6.62,
    y: 4.96,
    w: 4.08,
    h: 1.04,
    title: "Medir no reemplaza leer",
    body: "La herramienta vuelve visible el problema. La interpretación técnica sigue siendo humana.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 14,
    bodyFontSize: 9,
  });

  validateSlide(slide, pptx);
}

function createAgenticSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El agente puede resumir hallazgos; tú validas el problema",
    "Herramientas y agentes ayudan a leer más rápido, pero no reemplazan la decisión técnica final.",
    "Bloque 1"
  );

  addDelegationSplit(slide, SH, {
    x: 1.02,
    y: 2.34,
    w: 9.84,
    h: 3.68,
    title: "Qué puede acelerar un agente y qué sigue siendo tuyo",
    left: {
      title: "Puede ayudar con",
      subtitle: "lectura inicial de reportes y agrupación de señales",
      items: [
        "resumir hallazgos de auditoría",
        "ordenar alertas por tema",
        "explicar qué significa una métrica",
        "proponer una primera lista de mejoras",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene delegar",
      subtitle: "validación, prioridad y lectura en contexto",
      items: [
        "dar por buena una mejora solo porque subió el score",
        "decidir prioridad sin leer la página real",
        "aceptar cambios automáticos sin revisar navegador",
        "confundir puntaje con experiencia real",
      ],
      accent: C.red,
      fill: C.white,
    },
    bridgeLabel: "Lectura real",
    bridgeBody: "La herramienta y el agente aceleran hipótesis. El desarrollador valida la experiencia.",
    footer: "Entender -> medir -> apoyarse -> validar.",
  });

  validateSlide(slide, pptx);
}

function createQuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas para cerrar el bloque",
    "Antes de pasar a SEO técnico, conviene fijar la diferencia entre apariencia y calidad revisable.",
    "Bloque 1"
  );

  addCard(slide, SH, {
    x: 1.08,
    y: 2.44,
    w: 10.04,
    h: 0.94,
    title: "1. ¿Por qué una página puede verse correcta y aun así estar mal resuelta técnicamente?",
    body: "La respuesta ya debería incluir estructura, carga, uso y posibilidad de medición.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 14,
    bodyFontSize: 9,
  });
  addCard(slide, SH, {
    x: 1.08,
    y: 3.62,
    w: 10.04,
    h: 0.94,
    title: "2. ¿Qué cambia cuando pasamos de una lectura visual a una lectura basada en evidencia?",
    body: "Dejamos de confiar solo en impresión y empezamos a leer documento, recursos, métricas y alertas.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14,
    bodyFontSize: 9,
  });
  addCard(slide, SH, {
    x: 1.08,
    y: 4.8,
    w: 10.04,
    h: 0.94,
    title: "3. ¿Por qué una auditoría automática ayuda mucho, pero no debería gobernar sola la decisión final?",
    body: "Porque detectar problemas no equivale todavía a entender impacto, prioridad ni experiencia real.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 14,
    bodyFontSize: 9,
  });

  validateSlide(slide, pptx);
}

function createClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del Bloque 1",
    "La calidad web ya quedó instalada como una lectura múltiple: ahora entraremos al primer eje concreto de esa revisión.",
    "Bloque 1"
  );

  addCenterStatement(slide, SH, "Una página madura no se evalúa solo por cómo se ve, sino por qué tan bien se deja entender, cargar, usar y revisar.", {
    x: 1.12,
    y: 2.38,
    w: 9.86,
    h: 1.02,
    fill: C.white,
    line: C.border,
    fontSize: 20.2,
  });

  addMiniCard(slide, SH, {
    x: 1.28,
    y: 4.04,
    w: 3.08,
    h: 1.06,
    title: "Idea clave",
    body: "La calidad web no se agota en la apariencia; necesita evidencia técnica.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addMiniCard(slide, SH, {
    x: 4.7,
    y: 4.04,
    w: 3.08,
    h: 1.06,
    title: "Método",
    body: "Entender el problema, medir con herramientas, apoyarse con inteligencia y validar.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });
  addMiniCard(slide, SH, {
    x: 8.12,
    y: 4.04,
    w: 3.08,
    h: 1.06,
    title: "Puente",
    body: "Ahora entraremos al primer eje concreto: SEO técnico y estructura que sí se deja entender.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });

  addCenterStatement(slide, SH, "El siguiente bloque ya no habla de calidad en abstracto: empieza en el propio documento.", {
    x: 2.12,
    y: 5.56,
    w: 7.2,
    h: 0.68,
    fill: C.softNeutral,
    fontSize: 16.2,
  });

  validateSlide(slide, pptx);
}

function createBlock2IntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Bloque 2 · SEO técnico y estructura que sí se deja entender",
    "Ahora la calidad deja de ser marco general y empieza a leerse en el propio documento.",
    "Bloque 2"
  );

  addPanel(slide, 0.98, 2.38, 3.1, 3.72, { fill: C.navy, line: C.navy });
  addBarsMotif(slide, 1.18, 2.66, 1.0, C.red);
  slide.addText("SEO técnico empieza en una página que se deja entender.", {
    x: 1.22,
    y: 3.08,
    w: 2.52,
    h: 1.34,
    fontFace: TYPOGRAPHY.display,
    fontSize: 19.2,
    bold: true,
    color: C.white,
    margin: 0,
  });
  ["título", "jerarquía", "semántica", "intención"].forEach((label, index) => {
    addPill(slide, SH, label, {
      x: 1.18 + (index % 2) * 1.18,
      y: 5.34 + Math.floor(index / 2) * 0.34,
      w: 1.02,
      h: 0.22,
      fill: index % 2 === 0 ? C.paleRed : C.white,
      color: index % 2 === 0 ? C.red : C.navy,
      fontSize: 7.8,
    });
  });

  addPanel(slide, 4.34, 2.38, 6.52, 3.72, { fill: C.white, line: C.border });
  addSeoSnippetPreview(slide, SH, {
    x: 4.62,
    y: 2.72,
    w: 3.16,
    h: 1.46,
    title: "Guía inicial de accesibilidad web | Taller PRO301",
    url: "https://pro301.cl/guias/accesibilidad-inicial",
    breadcrumb: "pro301.cl > Guias > Accesibilidad",
    description: "Estructura semantica, contraste, formularios y una revision inicial de accesibilidad web.",
  });
  addMiniCard(slide, SH, {
    x: 8.08,
    y: 2.72,
    w: 2.34,
    h: 0.94,
    title: "Documento legible",
    body: "title, description y headings ya empiezan a explicar el contenido.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addMiniCard(slide, SH, {
    x: 8.08,
    y: 3.86,
    w: 2.34,
    h: 0.94,
    title: "No es marketing primero",
    body: "antes de visibilidad, la pagina debe poder interpretarse.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });
  addCenterStatement(slide, SH, "SEO técnico básico = página comprensible desde su estructura y sus señales.", {
    x: 4.58,
    y: 5.22,
    w: 5.9,
    h: 0.7,
    fill: C.softNeutral,
    fontSize: 18.2,
  });

  validateSlide(slide, pptx);
}

function createSeoStartsWithMeaningSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "SEO técnico no empieza en marketing: empieza en entender la página",
    "Antes de pensar en posicionamiento, conviene preguntar si el documento deja claro qué ofrece y cómo se organiza.",
    "Bloque 2"
  );

  addPanel(slide, 1.02, 2.42, 4.46, 3.24, { fill: C.paleRed, line: C.paleRed });
  slide.addShape(SH.rect, {
    x: 1.14,
    y: 2.58,
    w: 0.1,
    h: 2.82,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("Señales frecuentes", {
    x: 1.38,
    y: 2.58,
    w: 3.72,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText(
    "títulos genéricos o repetidos\nheadings mal jerarquizados\nbloques sin semántica clara\nenlaces vagos\nimágenes sin contexto",
    {
      x: 1.38,
      y: 2.94,
      w: 3.62,
      h: 1.58,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.4,
      color: C.navy,
      margin: 0,
      breakLine: false,
    }
  );

  addCenterStatement(slide, SH, "Primero no se trata de “subir en Google”. Se trata de construir una página que sí se deje interpretar.", {
    x: 5.82,
    y: 2.56,
    w: 4.96,
    h: 1.06,
    fill: C.softNeutral,
    fontSize: 18.2,
  });

  addSeoSnippetPreview(slide, SH, {
    x: 5.98,
    y: 4.04,
    w: 4.54,
    h: 1.48,
    title: "Portafolio de Ana Pérez | Proyectos web",
    url: "https://anaperez.dev/proyectos-web",
    breadcrumb: "anaperez.dev > Proyectos",
    description: "Trabajos de desarrollo web, diseño responsivo y estructura HTML semántica para clientes y práctica.",
  });

  addMiniCard(slide, SH, {
    x: 7.08,
    y: 5.64,
    w: 2.34,
    h: 0.9,
    title: "Cuando se entiende",
    body: "la visibilidad tecnica aparece como consecuencia, no como maquillaje.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });

  validateSlide(slide, pptx);
}

function createSignalsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Hay señales básicas que conviene revisar siempre",
    "No vuelven perfecta a una página por sí solas, pero sí mejoran mucho su legibilidad técnica.",
    "Bloque 2"
  );

  addPanel(slide, 0.98, 2.34, 6.76, 3.84, { fill: C.white, line: C.border });
  slide.addText("Señales mínimas del documento", {
    x: 1.18,
    y: 2.56,
    w: 2.64,
    h: 0.16,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  const pills = [
    ["title", C.red, C.paleRed],
    ["meta description", C.navy, C.softBlue],
    ["headings", C.gold, C.warm],
    ["HTML semántico", C.navy, C.white],
    ["enlaces descriptivos", C.red, C.paleRed],
    ["alt cuando corresponde", C.gold, C.warm],
  ];
  pills.forEach(([label, color, fill], index) => {
    addPill(slide, SH, label, {
      x: 1.18 + (index % 3) * 1.92,
      y: 3.08 + Math.floor(index / 3) * 0.42,
      w: 1.58,
      h: 0.24,
      fill,
      color,
      fontSize: 8.4,
    });
  });

  addCard(slide, SH, {
    x: 1.18,
    y: 4.12,
    w: 2.86,
    h: 1.42,
    title: "Lo importante",
    body: "estas señales ayudan a personas y buscadores a entender de qué trata la página.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 13.4,
    bodyFontSize: 9.4,
  });
  addCard(slide, SH, {
    x: 4.26,
    y: 4.12,
    w: 3.1,
    h: 1.42,
    title: "Lo que no conviene",
    body: "revisarlas como lista mecánica sin preguntarse si realmente aclaran la intención del contenido.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 13.4,
    bodyFontSize: 9.2,
  });

  addMiniCard(slide, SH, {
    x: 8.02,
    y: 2.54,
    w: 2.62,
    h: 1.02,
    title: "SEO técnico mejora cuando",
    body: "el documento entrega información útil sin pedir contexto extra.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addMiniCard(slide, SH, {
    x: 8.02,
    y: 3.8,
    w: 2.62,
    h: 1.02,
    title: "No es magia",
    body: "son pequeñas señales consistentes, no un truco aislado.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });
  addMiniCard(slide, SH, {
    x: 8.02,
    y: 5.06,
    w: 2.62,
    h: 1.02,
    title: "Base del bloque",
    body: "title, meta, headings, links y alt solo valen si aclaran de verdad.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });

  validateSlide(slide, pptx);
}

function createSnippetCompareSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "No produce la misma lectura decir poco que decir algo útil",
    "Un título, un heading y un enlace más descriptivos cambian mucho la comprensión técnica del documento.",
    "Bloque 2"
  );

  addSeoSnippetPreview(slide, SH, {
    x: 1.02,
    y: 2.5,
    w: 4.56,
    h: 1.54,
    title: "Inicio",
    url: "https://ejemplo.cl",
    breadcrumb: "ejemplo.cl",
    description: "Bienvenido a nuestro sitio. Haz clic aquí para ver más contenido.",
  });
  addMiniCard(slide, SH, {
    x: 1.18,
    y: 4.3,
    w: 4.24,
    h: 1.14,
    title: "Lectura pobre",
    body: "Inicio, Bienvenido y Haz clic aqui obligan a adivinar de qué trata la página.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });

  addSeoSnippetPreview(slide, SH, {
    x: 6.02,
    y: 2.5,
    w: 4.56,
    h: 1.54,
    title: "Portafolio de Ana Pérez | Proyectos web",
    url: "https://anaperez.dev/proyectos-web",
    breadcrumb: "anaperez.dev > Proyectos",
    description: "Proyectos de desarrollo web y diseño responsivo con HTML semántico, CSS moderno y auditoría técnica.",
  });
  addMiniCard(slide, SH, {
    x: 6.18,
    y: 4.3,
    w: 4.24,
    h: 1.14,
    title: "Lectura útil",
    body: "el documento ya entrega propósito, tipo de contenido y una promesa técnica más clara.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });

  addCenterStatement(slide, SH, "El segundo caso comunica más sin necesitar explicación extra.", {
    x: 2.3,
    y: 5.7,
    w: 7.02,
    h: 0.6,
    fill: C.softNeutral,
    fontSize: 16.8,
  });

  validateSlide(slide, pptx);
}

function createHtmlBaseSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La estructura HTML sigue siendo una de las bases del SEO técnico",
    "Lo que ya vimos en HTML semántico vuelve a aparecer aquí como señal de comprensión y no solo de orden visual.",
    "Bloque 2"
  );

  addPanel(slide, 1.02, 2.4, 4.22, 3.78, { fill: C.white, line: C.border });
  slide.addText("Qué conviene mirar", {
    x: 1.26,
    y: 2.64,
    w: 2.2,
    h: 0.16,
    fontFace: TYPOGRAPHY.display,
    fontSize: 15,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  [
    ["head bien resuelto", C.red, C.paleRed],
    ["title representativo", C.navy, C.softBlue],
    ["h1, h2, h3 con jerarquía", C.gold, C.warm],
    ["main, article, nav, footer", C.navy, C.white],
    ["contenido con sentido propio", C.red, C.paleRed],
  ].forEach(([text, accent, fill], index) => {
    addMiniCard(slide, SH, {
      x: 1.24,
      y: 3.08 + index * 0.58,
      w: 3.64,
      h: 0.46,
      title: text,
      body: "",
      accent,
      fill,
      line: fill,
      titleFontSize: 11.2,
      bodyFontSize: 7.2,
    });
  });

  addComponentTree(slide, SH, {
    x: 5.56,
    y: 2.4,
    w: 5.2,
    h: 3.78,
    title: "Documento que sí se deja leer",
    nodes: [
      { label: "html", depth: 0, meta: "lang=es" },
      { label: "head", depth: 1, meta: "metadatos y señales de lectura" },
      { label: "title", depth: 2, meta: "Guía inicial de accesibilidad web" },
      { label: "body", depth: 1, meta: "contenido visible" },
      { label: "main", depth: 2, meta: "contenido principal" },
      { label: "article", depth: 3 },
    ],
  });

  validateSlide(slide, pptx);
}

function createHtmlSnippetSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Una parte importante del SEO técnico básico se lee directo en el HTML",
    "Aquí el documento muestra si el contenido tiene intención clara o si obliga a adivinar qué ofrece.",
    "Bloque 2"
  );

  const htmlCode = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Guía inicial de accesibilidad web | Taller PRO301</title>
    <meta name="description" content="Introducción a estructura semántica, contraste y revisión inicial de accesibilidad." />
  </head>
  <body>
    <main>
      <article>
        <h1>Guía inicial de accesibilidad web</h1>
        <img src="accesibilidad-basica.png" alt="Esquema de revisión inicial de accesibilidad web" />
      </article>
    </main>
  </body>
</html>`;

  const metrics = addCodePanel(slide, SH, {
    x: 0.98,
    y: 2.34,
    w: 5.76,
    h: 3.9,
    title: "Lectura directa del documento",
    code: htmlCode,
    lang: "html",
    fontSize: 9.8,
    titleFill: C.titleFill,
  });

  const cards = [
    { x: 7.18, y: 2.56, title: "1. Title", body: "resume el propósito principal de la pagina.", color: C.red, fill: C.paleRed, line: 4, column: 5, length: 6 },
    { x: 7.18, y: 3.44, title: "2. Meta description", body: "aporta contexto breve sin repetir ruido.", color: C.navy, fill: C.softBlue, line: 5, column: 5, length: 16 },
    { x: 7.18, y: 4.32, title: "3. H1", body: "declara el tema principal del contenido.", color: C.gold, fill: C.warm, line: 10, column: 9, length: 4 },
    { x: 7.18, y: 5.2, title: "4. Alt", body: "da contexto a la imagen cuando corresponde.", color: C.red, fill: C.paleRed, line: 11, column: 43, length: 3 },
  ];

  cards.forEach((card, index) => {
    addMiniCard(slide, SH, {
      x: card.x,
      y: card.y,
      w: 3.32,
      h: 0.66,
      title: card.title,
      body: card.body,
      accent: card.color,
      fill: card.fill,
      line: card.fill,
      titleFontSize: 11.2,
      bodyFontSize: 8.4,
    });
    addCodeAnnotation(slide, SH, {
      ...metrics,
      lineNumber: card.line,
      column: card.column,
      length: card.length,
      color: card.color,
      connectorColor: C.guide,
      target: { x: card.x, y: card.y, w: 3.32, h: 0.66, side: "left" },
      routeY: card.y + 0.32,
    });
  });

  validateSlide(slide, pptx);
}

function createCommunicateSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Enlaces, imágenes y jerarquía también comunican",
    "La pregunta útil no es solo si la etiqueta existe, sino si realmente ayuda a entender qué ofrece la página.",
    "Bloque 2"
  );

  addPanel(slide, 1.04, 2.42, 4.86, 3.78, { fill: C.white, line: C.border });
  slide.addText("Señales vagas", {
    x: 1.28,
    y: 2.64,
    w: 1.8,
    h: 0.16,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.6,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  [
    { title: "Link", body: "Haz clic aqui", fill: C.paleRed, accent: C.red },
    { title: "Imagen", body: "sin alt o con alt generico", fill: C.softBlue, accent: C.navy },
    { title: "Heading", body: "varios h1 sin intención clara", fill: C.warm, accent: C.gold },
  ].forEach((item, index) => {
    addCard(slide, SH, {
      x: 1.24,
      y: 3.04 + index * 0.94,
      w: 4.42,
      h: 0.74,
      title: item.title,
      body: item.body,
      fill: item.fill,
      line: item.fill,
      accent: item.accent,
      titleFontSize: 12.8,
      bodyFontSize: 9,
    });
  });

  addPanel(slide, 6.18, 2.42, 4.74, 3.78, { fill: C.softNeutral, line: C.softNeutral });
  slide.addText("Señales que sí ayudan", {
    x: 6.42,
    y: 2.64,
    w: 2.3,
    h: 0.16,
    fontFace: TYPOGRAPHY.display,
    fontSize: 14.6,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  [
    { title: "Link", body: "Descargar guia de auditoria web", fill: C.paleRed, accent: C.red },
    { title: "Imagen", body: "alt con contexto real del contenido", fill: C.softBlue, accent: C.navy },
    { title: "Heading", body: "h1 principal y subtítulos con jerarquía", fill: C.warm, accent: C.gold },
  ].forEach((item, index) => {
    addCard(slide, SH, {
      x: 6.38,
      y: 3.04 + index * 0.94,
      w: 4.34,
      h: 0.74,
      title: item.title,
      body: item.body,
      fill: item.fill,
      line: item.fill,
      accent: item.accent,
      titleFontSize: 12.8,
      bodyFontSize: 9,
    });
  });

  validateSlide(slide, pptx);
}

function createIntentQuestionSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La pregunta útil no es solo “¿esto existe en el HTML?”",
    "También conviene preguntar si esa señal ayuda de verdad a entender qué ofrece la página.",
    "Bloque 2"
  );

  addCenterStatement(slide, SH, "No basta con tener title, meta, heading o alt. Tienen que decir algo útil y coherente con la intención del documento.", {
    x: 1.16,
    y: 2.5,
    w: 9.8,
    h: 1.02,
    fill: C.softNeutral,
    fontSize: 20,
  });

  addCard(slide, SH, {
    x: 1.44,
    y: 4.08,
    w: 4.4,
    h: 1.42,
    title: "Checklist mecánico",
    body: "Existe la etiqueta.\nExiste el atributo.\nExiste la descripción.\nPero nadie valida si comunica algo real.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 15,
    bodyFontSize: 11.2,
  });
  addCard(slide, SH, {
    x: 6.18,
    y: 4.08,
    w: 4.4,
    h: 1.42,
    title: "Lectura con criterio",
    body: "La señal existe.\nRepresenta bien la intención.\nAyuda a entender el contenido.\nY no se vuelve relleno genérico.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 15,
    bodyFontSize: 11.2,
  });

  validateSlide(slide, pptx);
}

function createBlock2AgenticSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un agente puede proponer mejoras SEO; tú validas la intención",
    "La ayuda automática acelera una primera pasada, pero no debería volver genérico ni artificial el documento.",
    "Bloque 2"
  );

  addDelegationSplit(slide, SH, {
    x: 1.02,
    y: 2.34,
    w: 9.84,
    h: 3.62,
    title: "Qué puede acelerar un agente y qué no conviene delegar",
    left: {
      title: "Puede ayudar con",
      subtitle: "sugerencias iniciales de estructura y señales",
      items: [
        "proponer títulos y descripciones iniciales",
        "detectar headings poco claros",
        "sugerir enlaces más descriptivos",
        "resumir problemas estructurales del HTML",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene delegar",
      subtitle: "intención, sentido y validación final",
      items: [
        "dar por bueno un title solo porque suena técnico",
        "aceptar descripciones genéricas sin revisar contexto",
        "suponer que la jerarquía ya tiene sentido por existir",
        "confundir sugerencia automática con mejora real",
      ],
      accent: C.red,
      fill: C.white,
    },
    bridgeLabel: "Sentido real",
    bridgeBody: "La sugerencia acelera la primera pasada. El desarrollador valida intención y claridad.",
    footer: "Primero entender el documento. Después apoyar y revisar.",
  });

  validateSlide(slide, pptx);
}

function createBlock2QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas para cerrar el bloque",
    "Antes de pasar a rendimiento, conviene fijar qué hace que una página se deje interpretar mejor.",
    "Bloque 2"
  );

  addCard(slide, SH, {
    x: 1.08,
    y: 2.44,
    w: 10.04,
    h: 0.94,
    title: "1. ¿Por qué conviene entender SEO técnico primero como problema de estructura y comprensión?",
    body: "La respuesta ya debería mover la clase desde marketing hacia documento, señales e intención.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 14,
    bodyFontSize: 9,
  });
  addCard(slide, SH, {
    x: 1.08,
    y: 3.62,
    w: 10.04,
    h: 0.94,
    title: "2. ¿Qué señales del documento ayudan a que una página se deje interpretar mejor?",
    body: "title, description, headings, semántica, enlaces claros, alt y organización general con sentido.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14,
    bodyFontSize: 9,
  });
  addCard(slide, SH, {
    x: 1.08,
    y: 4.8,
    w: 10.04,
    h: 0.94,
    title: "3. ¿Por qué una sugerencia automática puede ser útil y aun así necesitar revisión humana?",
    body: "Porque puede acelerar una mejora inicial, pero no garantiza intención clara ni comprensión real.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 14,
    bodyFontSize: 9,
  });

  validateSlide(slide, pptx);
}

function createBlock2ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del Bloque 2",
    "La estructura, los metadatos y la jerarquía ya quedaron instalados como primera base concreta de calidad.",
    "Bloque 2"
  );

  addCenterStatement(slide, SH, "SEO técnico básico empieza en una página que se deja entender desde su documento.", {
    x: 1.24,
    y: 2.42,
    w: 9.74,
    h: 0.9,
    fill: C.white,
    line: C.border,
    fontSize: 20.4,
  });

  addMiniCard(slide, SH, {
    x: 1.36,
    y: 4.02,
    w: 3.08,
    h: 1.06,
    title: "Idea clave",
    body: "title, meta, headings y semántica ayudan a que el contenido se deje interpretar.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addMiniCard(slide, SH, {
    x: 4.76,
    y: 4.02,
    w: 3.08,
    h: 1.06,
    title: "Método",
    body: "leer el documento, comparar señales, apoyarse con sugerencias y validar sentido real.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });
  addMiniCard(slide, SH, {
    x: 8.16,
    y: 4.02,
    w: 3.08,
    h: 1.06,
    title: "Puente",
    body: "en el siguiente bloque cambiaremos de comprensión del documento a carga y experiencia percibida.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });

  addCenterStatement(slide, SH, "Ahora pasamos desde lo que la página dice a cómo se siente cuando intenta cargar y responder.", {
    x: 2.04,
    y: 5.58,
    w: 7.44,
    h: 0.66,
    fill: C.softNeutral,
    fontSize: 16.2,
  });

  validateSlide(slide, pptx);
}

function createBlock3IntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Bloque 3 · Rendimiento y experiencia percibida",
    "Ahora toca leer cómo aparece, se mueve y responde la página cuando intenta cargar y usarse.",
    "Bloque 3"
  );

  addPanel(slide, 0.96, 2.3, 3.2, 3.7, { fill: "2F5687", line: "2F5687" });
  addBarsMotif(slide, 1.14, 2.56, 1.06, C.red);
  slide.addText("Rendimiento no es\nsolo velocidad.", {
    x: 1.18,
    y: 3.34,
    w: 2.44,
    h: 1.02,
    fontFace: TYPOGRAPHY.display,
    fontSize: 21.2,
    bold: true,
    color: C.white,
    margin: 0,
  });
  ["carga", "salto", "respuesta", "prioridad"].forEach((label, index) => {
    addPill(slide, SH, label, {
      x: 1.24 + (index % 2) * 1.16,
      y: 5.02 + Math.floor(index / 2) * 0.34,
      w: 1,
      h: 0.24,
      fill: index === 0 ? C.paleRed : index === 1 ? C.softBlue : index === 2 ? C.warm : C.white,
      line: index === 3 ? C.white : undefined,
      color: index === 0 ? C.red : C.navy,
      fontSize: 8,
    });
  });

  addPerformanceMetricsBoard(slide, SH, {
    x: 4.54,
    y: 2.34,
    w: 6.12,
    h: 2.36,
    title: "Tres señales que vuelven visible la experiencia",
    metrics: [
      {
        label: "LCP",
        value: "2.4 s",
        note: "cuándo aparece el contenido principal",
        accent: C.gold,
        fill: C.warm,
      },
      {
        label: "CLS",
        value: "0.05",
        note: "si la interfaz salta mientras carga",
        accent: C.navy,
        fill: C.softBlue,
      },
      {
        label: "INP",
        value: "190 ms",
        note: "qué tan bien responde al interactuar",
        accent: C.red,
        fill: C.paleRed,
      },
    ],
  });

  addMiniCard(slide, SH, {
    x: 4.74,
    y: 4.98,
    w: 1.8,
    h: 0.92,
    title: "Carga",
    body: "cuándo se puede empezar a leer",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addMiniCard(slide, SH, {
    x: 6.72,
    y: 4.98,
    w: 1.8,
    h: 0.92,
    title: "Estabilidad",
    body: "si el layout se mueve sin avisar",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });
  addMiniCard(slide, SH, {
    x: 8.7,
    y: 4.98,
    w: 1.8,
    h: 0.92,
    title: "Respuesta",
    body: "si la acción se siente torpe o fluida",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });

  validateSlide(slide, pptx);
}

function createPerformanceNotBinarySlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Rendimiento no significa solo “rápido” o “lento”",
    "Conviene leer cuándo aparece lo útil, cuándo deja de moverse y cuándo se puede interactuar sin atraso.",
    "Bloque 3"
  );

  addCard(slide, SH, {
    x: 1.02,
    y: 2.46,
    w: 3.88,
    h: 3.34,
    title: "Lectura pobre",
    body:
      "Se siente lenta.\nSe siente pesada.\nSe siente rara.\nPero no sabemos todavía qué parte del recorrido está fallando.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 16,
    bodyFontSize: 12.2,
  });

  addCard(slide, SH, {
    x: 5.24,
    y: 2.46,
    w: 5.46,
    h: 3.34,
    title: "Lectura útil",
    body:
      "¿Cuándo aparece el contenido principal?\n¿La página parece lista para leerse?\n¿Se puede interactuar sin atraso?\n¿Qué recursos consumen tiempo antes de aportar valor?",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16,
    bodyFontSize: 12,
  });

  addCenterStatement(slide, SH, "Rendimiento mejora cuando dejamos de hablar en abstracto y empezamos a leer comportamiento real.", {
    x: 1.74,
    y: 5.98,
    w: 8.56,
    h: 0.62,
    fill: C.softNeutral,
    fontSize: 16.8,
  });

  validateSlide(slide, pptx);
}

function createVisibleDecisionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Muchas veces el problema está en decisiones visibles del proyecto",
    "Imágenes pesadas, terceros, librerías o componentes costosos suelen degradar la carga antes de mostrar lo principal.",
    "Bloque 3"
  );

  addNetworkLoadBoard(slide, SH, {
    x: 1,
    y: 2.34,
    w: 10.06,
    h: 3.82,
    title: "Lectura inicial de carga",
    resources: [
      {
        label: "hero-producto.webp",
        kind: "img",
        sizeLabel: "480 KB",
        durationLabel: "620 ms",
        weight: 0.92,
        accent: C.red,
        fill: C.paleRed,
      },
      {
        label: "ui-kit.css",
        kind: "css",
        sizeLabel: "118 KB",
        durationLabel: "220 ms",
        weight: 0.52,
        accent: C.navy,
        fill: C.softBlue,
      },
      {
        label: "carousel.js",
        kind: "js",
        sizeLabel: "210 KB",
        durationLabel: "360 ms",
        weight: 0.7,
        accent: C.gold,
        fill: C.warm,
      },
      {
        label: "analytics.js",
        kind: "3rd",
        sizeLabel: "52 KB",
        durationLabel: "240 ms",
        weight: 0.38,
        accent: C.navy,
        fill: C.white,
      },
    ],
    summaryTitle: "Qué revela esto",
    summaryBody:
      "el problema no siempre es “la web” en abstracto, sino una suma de decisiones visibles sobre peso, orden de carga y prioridad real.",
    footer: "Rendimiento también se negocia en qué cargamos primero y qué dejamos de exigir en la primera vista.",
  });

  validateSlide(slide, pptx);
}

function createToolsPrecisionSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Las herramientas actuales permiten mirar el problema con más precisión",
    "Network, Performance y Lighthouse ayudan a ver recursos, tiempos, bloqueos y experiencia percibida.",
    "Bloque 3"
  );

  addLighthouseAuditCard(slide, SH, {
    x: 1.02,
    y: 2.4,
    w: 5.02,
    h: 2.34,
    title: "Lighthouse como lectura rápida",
    scores: [
      { label: "Performance", score: 68 },
      { label: "Accesibilidad", score: 92 },
      { label: "SEO", score: 94 },
      { label: "Buenas prácticas", score: 88 },
    ],
    summary: "sirve para detectar focos iniciales, no para decidir solo.",
  });

  addCard(slide, SH, {
    x: 6.34,
    y: 2.4,
    w: 4.66,
    h: 1.02,
    title: "Network",
    body: "muestra qué recursos pesan más, qué tarda en descargarse y qué se carga antes de aportar valor.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14,
    bodyFontSize: 9.4,
  });
  addCard(slide, SH, {
    x: 6.34,
    y: 3.58,
    w: 4.66,
    h: 1.02,
    title: "Performance",
    body: "permite ver bloqueo inicial, movimientos visuales y tiempos de interacción con más contexto.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 14,
    bodyFontSize: 9.4,
  });
  addCard(slide, SH, {
    x: 1.56,
    y: 5.12,
    w: 8.94,
    h: 0.92,
    title: "Lo importante",
    body: "no hace falta memorizar cada panel hoy; basta con asociar cada herramienta a la evidencia que vuelve visible.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 14.2,
    bodyFontSize: 10,
  });

  validateSlide(slide, pptx);
}

function createMetricsMeaningSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "LCP, CLS e INP importan porque describen experiencia real",
    "No conviene memorizar siglas vacías: conviene asociarlas a contenido principal, estabilidad visual y respuesta.",
    "Bloque 3"
  );

  addPerformanceMetricsBoard(slide, SH, {
    x: 1.02,
    y: 2.36,
    w: 7.24,
    h: 3.68,
    title: "Métricas iniciales del bloque",
    metrics: [
      {
        label: "LCP",
        value: "2.5 s",
        note: "cuándo aparece el contenido principal más importante",
        accent: C.gold,
        fill: C.warm,
      },
      {
        label: "CLS",
        value: "0.03",
        note: "cuánto se mueve la interfaz mientras carga",
        accent: C.navy,
        fill: C.softBlue,
      },
      {
        label: "INP",
        value: "170 ms",
        note: "qué tan bien responde la página cuando interactúas",
        accent: C.red,
        fill: C.paleRed,
      },
    ],
    footer: "La métrica importa cuando puede traducirse a algo que la persona realmente siente.",
  });

  addMiniCard(slide, SH, {
    x: 8.62,
    y: 2.62,
    w: 2.28,
    h: 1.02,
    title: "LCP alto",
    body: "lo principal aparece tarde y la lectura tarda en empezar.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });
  addMiniCard(slide, SH, {
    x: 8.62,
    y: 3.88,
    w: 2.28,
    h: 1.02,
    title: "CLS alto",
    body: "la interfaz parece inestable y rompe confianza.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });
  addMiniCard(slide, SH, {
    x: 8.62,
    y: 5.14,
    w: 2.28,
    h: 1.02,
    title: "INP alto",
    body: "la interacción se siente torpe aunque la página ya se vea cargada.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });

  validateSlide(slide, pptx);
}

function createSimpleDecisionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Mejorar rendimiento básico suele empezar con decisiones simples",
    "Formato, dimensiones, lazy loading y defer no resuelven todo, pero suelen limpiar bastante la primera vista.",
    "Bloque 3"
  );

  const snippet = `<img
  src="hero-producto.webp"
  alt="Vista principal del producto"
  width="960"
  height="540"
  loading="lazy"
/>

<script src="interacciones-secundarias.js" defer></script>`;

  const metrics = addCodePanel(slide, SH, {
    x: 0.98,
    y: 2.36,
    w: 5.84,
    h: 3.84,
    title: "Decisiones pequeñas con impacto real",
    code: snippet,
    lang: "html",
    fontSize: 10.4,
    titleFill: C.titleFill,
  });

  [
    {
      x: 7.14,
      y: 2.62,
      title: "1. Dimensiones",
      body: "reservan espacio y reducen saltos del layout.",
      color: C.navy,
      fill: C.softBlue,
      line: 4,
      column: 3,
      length: 13,
    },
    {
      x: 7.14,
      y: 3.56,
      title: "2. loading=\"lazy\"",
      body: "evita exigir de inmediato recursos que no son críticos.",
      color: C.gold,
      fill: C.warm,
      line: 6,
      column: 3,
      length: 14,
    },
    {
      x: 7.14,
      y: 4.5,
      title: "3. defer",
      body: "reduce bloqueo inicial cuando el script no es la prioridad de la vista.",
      color: C.red,
      fill: C.paleRed,
      line: 9,
      column: 3,
      length: 6,
    },
  ].forEach((item) => {
    addMiniCard(slide, SH, {
      x: item.x,
      y: item.y,
      w: 3.4,
      h: 0.72,
      title: item.title,
      body: item.body,
      accent: item.color,
      fill: item.fill,
      line: item.fill,
      titleFontSize: 11.2,
      bodyFontSize: 8.4,
    });
    addCodeAnnotation(slide, SH, {
      ...metrics,
      lineNumber: item.line,
      column: item.column,
      length: item.length,
      color: item.color,
      connectorColor: C.guide,
      target: { x: item.x, y: item.y, w: 3.4, h: 0.72, side: "left" },
      routeY: item.y + 0.34,
    });
  });

  validateSlide(slide, pptx);
}

function createNotMagicSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Rendimiento no mejora con magia: mejora cuando dejamos de cargar mal",
    "Muchas veces la ganancia aparece al bajar peso, ordenar prioridad y dejar de defender recursos secundarios en la primera vista.",
    "Bloque 3"
  );

  addCard(slide, SH, {
    x: 1.02,
    y: 2.44,
    w: 4.7,
    h: 3.08,
    title: "Patrón que suele degradar",
    body:
      "hero pesada\nslider inicial\nscript secundario bloqueando\ntipografías y terceros cargando antes de lo principal",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 15.2,
    bodyFontSize: 11.6,
  });

  addCard(slide, SH, {
    x: 6.02,
    y: 2.44,
    w: 4.7,
    h: 3.08,
    title: "Patrón más razonable",
    body:
      "contenido principal primero\nimágenes y scripts con prioridad real\nmenos costo decorativo al inicio\nmás aire para leer y responder",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 15.2,
    bodyFontSize: 11.6,
  });

  addCenterStatement(slide, SH, "Mejorar rendimiento básico muchas veces consiste en dejar de exigirle tanto a la primera vista.", {
    x: 1.88,
    y: 5.8,
    w: 8.1,
    h: 0.62,
    fill: C.softNeutral,
    fontSize: 16.6,
  });

  validateSlide(slide, pptx);
}

function createBlock3AgenticSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un agente puede resumir métricas; tú validas qué importa de verdad",
    "La ayuda automática sirve para ordenar hallazgos, pero no debería decidir sola qué optimizar ni qué experiencia realmente mejoró.",
    "Bloque 3"
  );

  addDelegationSplit(slide, SH, {
    x: 1.02,
    y: 2.34,
    w: 9.84,
    h: 3.62,
    title: "Qué puede acelerar un agente y qué no conviene delegar",
    left: {
      title: "Puede ayudar con",
      subtitle: "métricas, hallazgos y primeras propuestas",
      items: [
        "resumir un reporte de Lighthouse",
        "priorizar recursos sospechosos en Network",
        "sugerir compresión o cambios iniciales",
        "explicar LCP, CLS e INP en lenguaje claro",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene delegar",
      subtitle: "contexto, impacto real y decisión final",
      items: [
        "optimizar sin entender qué siente la persona usuaria",
        "aceptar una recomendación sin revisarla en pantalla",
        "creer que mejor puntaje equivale a mejor experiencia",
        "romper contenido principal por perseguir score",
      ],
      accent: C.red,
      fill: C.white,
    },
    bridgeLabel: "Experiencia real",
    bridgeBody: "El agente ayuda a leer más rápido. El desarrollador decide qué mejora y qué no.",
    footer: "Primero entender el costo. Después priorizar, probar y validar.",
  });

  validateSlide(slide, pptx);
}

function createBlock3QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas para cerrar el bloque",
    "Antes de pasar a accesibilidad, conviene fijar qué hace visible la experiencia de carga y respuesta.",
    "Bloque 3"
  );

  addCard(slide, SH, {
    x: 1.08,
    y: 2.44,
    w: 10.04,
    h: 0.94,
    title: "1. ¿Por qué conviene pensar rendimiento como experiencia percibida y no solo como velocidad abstracta?",
    body: "Porque lo importante es cuándo aparece lo útil, si la interfaz salta y qué tan bien responde al interactuar.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 14,
    bodyFontSize: 9,
  });
  addCard(slide, SH, {
    x: 1.08,
    y: 3.62,
    w: 10.04,
    h: 0.94,
    title: "2. ¿Qué decisiones del proyecto suelen degradar la primera vista sin aportar valor inmediato?",
    body: "imágenes pesadas, terceros, sliders, librerías grandes y scripts secundarios cargando antes de lo principal.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14,
    bodyFontSize: 9,
  });
  addCard(slide, SH, {
    x: 1.08,
    y: 4.8,
    w: 10.04,
    h: 0.94,
    title: "3. ¿Por qué una sugerencia automática sobre métricas puede servir y aun así necesitar validación humana?",
    body: "Porque ayuda a ordenar hallazgos, pero no reemplaza la lectura de contexto ni la experiencia real en pantalla.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 14,
    bodyFontSize: 9,
  });

  validateSlide(slide, pptx);
}

function createBlock3ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del Bloque 3",
    "Rendimiento ya quedó instalado como lectura de costo, prioridad y experiencia, no como sensación vaga de rapidez.",
    "Bloque 3"
  );

  addCenterStatement(slide, SH, "Rendimiento mejora cuando el proyecto deja de cargar mal y empieza a priorizar mejor lo principal.", {
    x: 1.24,
    y: 2.42,
    w: 9.74,
    h: 0.9,
    fill: C.white,
    line: C.border,
    fontSize: 20.2,
  });

  addMiniCard(slide, SH, {
    x: 1.36,
    y: 4.02,
    w: 3.08,
    h: 1.06,
    title: "Idea clave",
    body: "LCP, CLS e INP importan porque describen experiencia real y no solo puntajes.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addMiniCard(slide, SH, {
    x: 4.76,
    y: 4.02,
    w: 3.08,
    h: 1.06,
    title: "Método",
    body: "leer recursos, métricas y orden de carga antes de tocar optimizaciones a ciegas.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });
  addMiniCard(slide, SH, {
    x: 8.16,
    y: 4.02,
    w: 3.08,
    h: 1.06,
    title: "Puente",
    body: "en el siguiente bloque cerraremos con accesibilidad, auditoría y criterio frente al puntaje.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });

  addCenterStatement(slide, SH, "Ahora pasamos desde carga y respuesta hacia accesibilidad, auditoría y revisión humana del resultado.", {
    x: 1.84,
    y: 5.58,
    w: 7.84,
    h: 0.66,
    fill: C.softNeutral,
    fontSize: 16.1,
  });

  validateSlide(slide, pptx);
}

function createBlock4IntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Bloque 4 · Accesibilidad y auditoría con herramientas actuales",
    "Ahora cerramos la clase leyendo calidad web con accesibilidad, reportes y criterio humano frente al puntaje.",
    "Bloque 4"
  );

  addPanel(slide, 0.96, 2.3, 3.16, 3.72, { fill: "2F5687", line: "2F5687" });
  addBarsMotif(slide, 1.14, 2.58, 1.04, C.red);
  slide.addText("Accesibilidad\nno es un\nextra.", {
    x: 1.18,
    y: 3.22,
    w: 2.34,
    h: 1.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: 21,
    bold: true,
    color: C.white,
    margin: 0,
  });
  ["uso", "claridad", "foco", "revisión"].forEach((label, index) => {
    addPill(slide, SH, label, {
      x: 1.22 + (index % 2) * 1.14,
      y: 5.06 + Math.floor(index / 2) * 0.34,
      w: 0.98,
      h: 0.24,
      fill: index === 0 ? C.paleRed : index === 1 ? C.softBlue : index === 2 ? C.warm : C.white,
      line: index === 3 ? C.white : undefined,
      color: index === 0 ? C.red : C.navy,
      fontSize: 8,
    });
  });

  addAuditScorePanel(slide, SH, {
    x: 4.46,
    y: 2.34,
    w: 6.18,
    h: 2.44,
    title: "Cuatro lecturas que ayudan a ver la calidad",
    items: [
      { label: "SEO", score: 94, note: "la estructura se deja entender" },
      { label: "Rendimiento", score: 72, note: "todavía hay costo en la primera vista" },
      { label: "Accesibilidad", score: 88, note: "la base está, pero faltan detalles reales" },
      { label: "Prácticas", score: 86, note: "sirve como lectura inicial, no como cierre" },
    ],
  });

  addMiniCard(slide, SH, {
    x: 4.66,
    y: 5.02,
    w: 1.8,
    h: 0.9,
    title: "Uso",
    body: "la interfaz debe poder recorrerse con claridad",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addMiniCard(slide, SH, {
    x: 6.64,
    y: 5.02,
    w: 1.8,
    h: 0.9,
    title: "Reporte",
    body: "la auditoría vuelve visibles señales útiles",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });
  addMiniCard(slide, SH, {
    x: 8.62,
    y: 5.02,
    w: 1.8,
    h: 0.9,
    title: "Criterio",
    body: "el puntaje orienta, pero no reemplaza la revisión",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });

  validateSlide(slide, pptx);
}

function createAccessibilityBaseSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Accesibilidad no es un extra: es parte de la calidad base",
    "Una interfaz puede verse ordenada y aun así excluir, confundir o dificultar el uso real.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 1.02,
    y: 2.44,
    w: 4.74,
    h: 3.1,
    title: "Se ve correcta",
    body:
      "contraste aceptable a primera vista\nlayout ordenado\ncomponentes alineados\nninguna alerta visual obvia",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 15.6,
    bodyFontSize: 11.2,
  });

  addCard(slide, SH, {
    x: 6.02,
    y: 2.44,
    w: 4.74,
    h: 3.1,
    title: "Pero puede usarse mal",
    body:
      "foco de teclado pobre\nlabels ausentes\ntexto ambiguo\nimágenes sin contexto",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 15.6,
    bodyFontSize: 11.2,
  });

  addCenterStatement(slide, SH, "Una interfaz mejor no solo se ve mejor: también se entiende y se usa mejor.", {
    x: 1.66,
    y: 5.84,
    w: 8.42,
    h: 0.62,
    fill: C.softNeutral,
    fontSize: 16.6,
  });

  validateSlide(slide, pptx);
}

function createChecklistSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Hay señales iniciales que conviene revisar siempre",
    "Contraste, labels, texto alternativo y foco visible ya permiten leer bastante de la calidad de una interfaz.",
    "Bloque 4"
  );

  addAccessibilityChecklistPanel(slide, SH, {
    x: 1.02,
    y: 2.32,
    w: 9.82,
    h: 3.86,
    title: "Checklist inicial de accesibilidad del bloque",
    items: [
      { label: "Contraste", note: "el texto debe sostener lectura real sobre su fondo", status: "critical" },
      { label: "Labels", note: "campos y controles no pueden quedar anónimos", status: "warn" },
      { label: "Texto alternativo", note: "las imágenes relevantes necesitan contexto", status: "warn" },
      { label: "Foco visible", note: "el teclado necesita un recorrido que se note", status: "ok" },
    ],
    footer: "La accesibilidad inicial no reemplaza una revisión completa, pero evita dejar la interfaz ciega desde el principio.",
  });

  validateSlide(slide, pptx);
}

function createLabelSnippetSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un formulario bien etiquetado comunica mejor que un campo suelto",
    "Un label explícito mejora comprensión, uso y lectura técnica al mismo tiempo.",
    "Bloque 4"
  );

  const snippet = `<form>
  <label for="correo">Correo electrónico</label>
  <input id="correo" name="correo" type="email" />

  <button type="submit">Enviar formulario</button>
</form>`;

  const metrics = addCodePanel(slide, SH, {
    x: 1,
    y: 2.36,
    w: 5.7,
    h: 3.7,
    title: "HTML pequeño, pero mejor resuelto",
    code: snippet,
    lang: "html",
    fontSize: 10.6,
    titleFill: C.titleFill,
  });

  [
    {
      x: 7.1,
      y: 2.58,
      title: "1. Label real",
      body: "el campo deja de depender solo del placeholder o del contexto visual.",
      color: C.red,
      fill: C.paleRed,
      line: 2,
      column: 3,
      length: 28,
    },
    {
      x: 7.1,
      y: 3.64,
      title: "2. Control ligado",
      body: "id y for vuelven explícita la relación entre texto y campo.",
      color: C.navy,
      fill: C.softBlue,
      line: 3,
      column: 3,
      length: 41,
    },
    {
      x: 7.1,
      y: 4.7,
      title: "3. Acción clara",
      body: "el botón dice qué ocurre y no deja la acción escondida.",
      color: C.gold,
      fill: C.warm,
      line: 5,
      column: 3,
      length: 39,
    },
  ].forEach((item) => {
    addMiniCard(slide, SH, {
      x: item.x,
      y: item.y,
      w: 3.3,
      h: 0.8,
      title: item.title,
      body: item.body,
      accent: item.color,
      fill: item.fill,
      line: item.fill,
      titleFontSize: 11.2,
      bodyFontSize: 8.2,
    });
    addCodeAnnotation(slide, SH, {
      ...metrics,
      lineNumber: item.line,
      column: item.column,
      length: item.length,
      color: item.color,
      connectorColor: C.guide,
      target: { x: item.x, y: item.y, w: 3.3, h: 0.8, side: "left" },
      routeY: item.y + 0.36,
    });
  });

  validateSlide(slide, pptx);
}

function createAutomaticAuditSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Las auditorías automáticas ayudan mucho, pero no agotan la revisión",
    "Lighthouse y DevTools vuelven visibles varios problemas, aunque la experiencia todavía necesita lectura humana.",
    "Bloque 4"
  );

  addAuditScorePanel(slide, SH, {
    x: 1.02,
    y: 2.38,
    w: 4.86,
    h: 3.28,
    title: "Lo que el reporte ve rápido",
    items: [
      { label: "Contraste", score: 74, note: "alerta temprana sobre lectura difícil" },
      { label: "Labels", score: 81, note: "detecta controles mal explicados" },
      { label: "Alt", score: 79, note: "señala imágenes sin contexto" },
      { label: "SEO", score: 91, note: "ve estructura y metadatos básicos" },
    ],
  });

  addMiniCard(slide, SH, {
    x: 6.28,
    y: 2.6,
    w: 4.26,
    h: 0.9,
    title: "Sirve para detectar",
    body: "contraste, labels, alt, headings y varios problemas técnicos rápidos.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addMiniCard(slide, SH, {
    x: 6.28,
    y: 3.74,
    w: 4.26,
    h: 0.9,
    title: "No sirve para decidir sola",
    body: "si el texto realmente comunica, si el recorrido es claro o si la experiencia ya está bien resuelta.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });
  addMiniCard(slide, SH, {
    x: 6.28,
    y: 4.88,
    w: 4.26,
    h: 0.9,
    title: "Lo correcto",
    body: "usar el reporte como apoyo de lectura, no como juez automático del resultado.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });

  validateSlide(slide, pptx);
}

function createReportNotEnoughSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El reporte no reemplaza la prueba de uso real",
    "La auditoría detecta bastante, pero no puede decidir por sí sola si la interfaz comunica, se recorre bien y mantiene claridad.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 1.04,
    y: 2.46,
    w: 4.68,
    h: 3.02,
    title: "Lo que sí detecta bien",
    body:
      "contraste insuficiente\nlabels ausentes\nalt faltante\nbuenas prácticas técnicas",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 15.4,
    bodyFontSize: 11.2,
  });

  addCard(slide, SH, {
    x: 6.04,
    y: 2.46,
    w: 4.68,
    h: 3.02,
    title: "Lo que igual hay que probar",
    body:
      "claridad del texto\norden de lectura\nrecorrido de teclado\nexperiencia real en pantalla",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 15.4,
    bodyFontSize: 11.2,
  });

  addCenterStatement(slide, SH, "La auditoría automática ayuda a mirar mejor; el uso real sigue necesitando revisión humana.", {
    x: 1.72,
    y: 5.84,
    w: 8.36,
    h: 0.62,
    fill: C.softNeutral,
    fontSize: 16.2,
  });

  validateSlide(slide, pptx);
}

function createScoreNotExperienceSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Puntaje alto no equivale automáticamente a buena experiencia",
    "Subir el score puede ser útil, pero no debería esconder textos pobres, foco incómodo o recorridos confusos.",
    "Bloque 4"
  );

  addBrowserMock(slide, SH, {
    x: 1.04,
    y: 2.42,
    w: 5.26,
    h: 3.34,
    url: "https://demo.local/checkout",
    title: "Checkout auditado",
  });

  addMiniCard(slide, SH, {
    x: 1.4,
    y: 3.34,
    w: 2.1,
    h: 0.76,
    title: "Score razonable",
    body: "la auditoría puede verse bien en papel",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });
  addMiniCard(slide, SH, {
    x: 6.66,
    y: 2.56,
    w: 3.72,
    h: 0.9,
    title: "Texto ambiguo",
    body: "si el mensaje no comunica bien, el uso igual se vuelve torpe.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addMiniCard(slide, SH, {
    x: 6.66,
    y: 3.74,
    w: 3.72,
    h: 0.9,
    title: "Foco y recorrido",
    body: "si nadie entiende dónde está la acción principal, el score no lo compensa.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });
  addMiniCard(slide, SH, {
    x: 6.66,
    y: 4.92,
    w: 3.72,
    h: 0.9,
    title: "Criterio final",
    body: "mejor puntaje sirve; mejor experiencia importa más.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });

  validateSlide(slide, pptx);
}

function createPriorityMatrixSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "No todo hallazgo pesa igual: conviene priorizar",
    "Impacto y urgencia ayudan a decidir qué conviene resolver primero y qué puede esperar sin perder criterio.",
    "Bloque 4"
  );

  addIssuePriorityMatrix(slide, SH, {
    x: 1.02,
    y: 2.34,
    w: 9.88,
    h: 3.82,
    title: "Impacto y prioridad de hallazgos del bloque",
    items: [
      { label: "Contraste pobre", impact: "high", urgency: "high", accent: C.red, fill: C.paleRed },
      { label: "Links ambiguos", impact: "high", urgency: "low", accent: C.gold, fill: C.warm },
      { label: "Alt ausente", impact: "low", urgency: "high", accent: C.navy, fill: C.softBlue },
      { label: "Foco discreto", impact: "high", urgency: "high", accent: C.red, fill: C.paleRed },
      { label: "Heading debil", impact: "low", urgency: "low", accent: C.navy, fill: C.white },
    ],
    footer: "Priorizar mejor evita perseguir reportes completos sin entender donde se rompe primero la experiencia.",
  });

  validateSlide(slide, pptx);
}

function createBlock4AgenticSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un agente puede resumir hallazgos; tú validas la interfaz real",
    "La ayuda automática sirve para ordenar advertencias, pero no debería cerrar sola la revisión de accesibilidad ni de calidad.",
    "Bloque 4"
  );

  addDelegationSplit(slide, SH, {
    x: 1.02,
    y: 2.34,
    w: 9.84,
    h: 3.62,
    title: "Qué puede acelerar un agente y qué sigue siendo validación humana",
    left: {
      title: "Puede ayudar con",
      subtitle: "reportes, agrupación y primeras propuestas",
      items: [
        "resumir hallazgos de accesibilidad",
        "comparar reportes entre revisiones",
        "proponer labels, alt o mejoras iniciales",
        "ordenar advertencias por prioridad tentativa",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene delegar",
      subtitle: "uso real, contexto y cierre técnico",
      items: [
        "decidir que la interfaz ya esta bien sin probarla",
        "aceptar cambios automaticos que rompen claridad",
        "confundir mejor score con mejor experiencia",
        "dar por resuelto el foco o la lectura sin revisarlos",
      ],
      accent: C.red,
      fill: C.white,
    },
    bridgeLabel: "Uso real",
    bridgeBody: "La auditoría y el agente amplían la lectura. La validación final sigue pasando por la interfaz misma.",
    footer: "Primero revisar. Después usar el reporte. Al final decidir con criterio.",
  });

  validateSlide(slide, pptx);
}

function createBlock4QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas para cerrar el bloque",
    "Antes del cierre general, conviene fijar qué parte del reporte sirve y qué parte todavía exige lectura humana.",
    "Bloque 4"
  );

  addCard(slide, SH, {
    x: 1.08,
    y: 2.44,
    w: 10.04,
    h: 0.94,
    title: "1. ¿Por qué accesibilidad y calidad web deberían leerse como parte del mismo problema?",
    body: "Porque claridad, estructura, uso y experiencia real se afectan entre sí dentro de la misma interfaz.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 14,
    bodyFontSize: 9,
  });
  addCard(slide, SH, {
    x: 1.08,
    y: 3.62,
    w: 10.04,
    h: 0.94,
    title: "2. ¿Qué detecta bien una auditoría automática y qué parte sigue necesitando prueba en pantalla?",
    body: "Detecta varias señales útiles, pero no reemplaza revisar claridad, foco, recorrido y uso real.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 14,
    bodyFontSize: 9,
  });
  addCard(slide, SH, {
    x: 1.08,
    y: 4.8,
    w: 10.04,
    h: 0.94,
    title: "3. ¿Por qué una mejora de puntaje puede servir y aun así no cerrar bien el problema?",
    body: "Porque la experiencia final todavía depende del contexto, del texto y del comportamiento real de la interfaz.",
    fill: C.warm,
    line: C.warm,
    accent: C.gold,
    titleFontSize: 14,
    bodyFontSize: 9,
  });

  validateSlide(slide, pptx);
}

function createBlock4ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del Bloque 4",
    "Accesibilidad y auditoría ya quedaron instaladas como apoyo fuerte de revisión, no como trámite ni como puntaje vacío.",
    "Bloque 4"
  );

  addCenterStatement(slide, SH, "Una interfaz madura no se juzga solo por apariencia ni por score: se revisa por claridad, uso y evidencia técnica.", {
    x: 1.18,
    y: 2.42,
    w: 9.86,
    h: 0.9,
    fill: C.white,
    line: C.border,
    fontSize: 19.4,
  });

  addMiniCard(slide, SH, {
    x: 1.36,
    y: 4.02,
    w: 3.08,
    h: 1.06,
    title: "Idea clave",
    body: "accesibilidad mejora la calidad base y vuelve más clara la interfaz.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
  });
  addMiniCard(slide, SH, {
    x: 4.76,
    y: 4.02,
    w: 3.08,
    h: 1.06,
    title: "Método",
    body: "usar auditorías para leer mejor y después validar el uso en pantalla.",
    accent: C.navy,
    fill: C.softBlue,
    line: C.softBlue,
  });
  addMiniCard(slide, SH, {
    x: 8.16,
    y: 4.02,
    w: 3.08,
    h: 1.06,
    title: "Puente",
    body: "el siguiente paso será movernos desde revisar calidad hacia construir comportamiento con JavaScript.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
  });

  addCenterStatement(slide, SH, "Con esto la clase ya cierra el mapa de calidad web: estructura, carga, uso y auditoría leídos como un mismo sistema.", {
    x: 1.72,
    y: 5.58,
    w: 8.22,
    h: 0.66,
    fill: C.softNeutral,
    fontSize: 15.8,
  });

  validateSlide(slide, pptx);
}

function createClassClosingIntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre de la clase",
    "Ahora cerramos la sesión como una lectura integrada de calidad web basada en evidencia, no como una lista de chequeos aislados.",
    "Cierre"
  );

  addPanel(slide, 0.96, 2.3, 3.14, 3.7, { fill: "2F5687", line: "2F5687" });
  addBarsMotif(slide, 1.16, 2.58, 1.02, C.red);
  slide.addText("Calidad web\nse lee en\nsistema.", {
    x: 1.18,
    y: 3.22,
    w: 2.32,
    h: 1.24,
    fontFace: TYPOGRAPHY.display,
    fontSize: 21,
    bold: true,
    color: C.white,
    margin: 0,
  });
  ["estructura", "carga", "uso", "evidencia"].forEach((label, index) => {
    addPill(slide, SH, label, {
      x: 1.2 + (index % 2) * 1.2,
      y: 5.02 + Math.floor(index / 2) * 0.34,
      w: 1.04,
      h: 0.24,
      fill: index === 0 ? C.paleRed : index === 1 ? C.warm : index === 2 ? C.softBlue : C.white,
      line: index === 3 ? C.white : undefined,
      color: index === 0 ? C.red : C.navy,
      fontSize: 8,
    });
  });

  addQualityDimensionsPanel(slide, SH, {
    x: 4.46,
    y: 2.34,
    w: 6.18,
    h: 2.72,
    title: "Cuatro dimensiones que ya quedaron conectadas",
    centerLabel: "Calidad web",
    dimensions: [
      {
        title: "SEO técnico",
        body: "el documento debe dejar claro qué ofrece y cómo se organiza",
        accent: C.red,
        fill: C.paleRed,
      },
      {
        title: "Rendimiento",
        body: "la carga importa cuando afecta lectura, foco y respuesta",
        accent: C.gold,
        fill: C.warm,
      },
      {
        title: "Accesibilidad",
        body: "una interfaz mejor debe poder entenderse y recorrerse mejor",
        accent: C.navy,
        fill: C.softBlue,
      },
      {
        title: "Auditoría",
        body: "medir ayuda a pasar de impresión general a evidencia técnica",
        accent: C.navy,
        fill: C.mist,
      },
    ],
  });

  addCenterStatement(slide, SH, "La clase deja instalada una idea simple: calidad web significa entender mejor qué se ve, cómo carga, cómo se usa y cómo se revisa.", {
    x: 4.68,
    y: 5.28,
    w: 5.82,
    h: 0.7,
    fill: C.softNeutral,
    fontSize: 15.2,
  });

  validateSlide(slide, pptx);
}

function createClassSynthesisFlowSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Lo que recorrimos hoy forma una sola secuencia",
    "La calidad web apareció como una cadena de relaciones: estructura, visibilidad, experiencia, uso y revisión con evidencia.",
    "Cierre"
  );

  const steps = [
    {
      title: "Documento claro",
      body: "title, headings y semántica ordenan lo que la página ofrece.",
      fill: C.paleRed,
      line: C.paleRed,
      kickerColor: C.red,
    },
    {
      title: "Visibilidad técnica",
      body: "la estructura deja señales que buscadores y personas pueden leer.",
      fill: C.white,
      line: C.border,
      kickerColor: C.navy,
    },
    {
      title: "Experiencia y uso",
      body: "carga, foco y claridad sostienen la interacción real.",
      fill: C.warm,
      line: C.warm,
      kickerColor: C.gold,
    },
    {
      title: "Auditoría con evidencia",
      body: "métricas y revisión ayudan a priorizar mejoras con criterio.",
      fill: C.softBlue,
      line: C.softBlue,
      kickerColor: C.navy,
    },
  ];
  const startX = 1.0;
  const y = 2.58;
  const w = 2.18;
  const h = 2.28;
  const gap = 0.44;
  steps.forEach((step, index) => {
    const x = startX + index * (w + gap);
    addPanel(slide, x, y, w, h, {
      fill: step.fill,
      line: step.line,
    });
    slide.addText(`Paso ${index + 1}`, {
      x,
      y: y + 0.18,
      w,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.8,
      bold: true,
      color: step.kickerColor,
      align: "center",
      margin: 0,
    });
    slide.addText(step.title, {
      x: x + 0.18,
      y: y + 0.62,
      w: w - 0.36,
      h: 0.34,
      fontFace: TYPOGRAPHY.display,
      fontSize: 16.2,
      bold: true,
      color: C.navy,
      align: "center",
      valign: "mid",
      margin: 0,
    });
    slide.addText(step.body, {
      x: x + 0.2,
      y: y + 1.18,
      w: w - 0.4,
      h: 0.56,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.6,
      color: C.ink,
      align: "center",
      valign: "mid",
      margin: 0,
    });
    if (index < steps.length - 1) {
      addArrow(slide, x + w + 0.1, y + h / 2 - 0.14, 0.18, 0.28, C.gold);
    }
  });

  addCenterStatement(slide, SH, "Si una de estas capas falla, la página puede verse correcta y aun así quedar técnicamente mal resuelta.", {
    x: 1.26,
    y: 5.48,
    w: 9.06,
    h: 0.66,
    fill: C.softNeutral,
    fontSize: 15.8,
  });

  validateSlide(slide, pptx);
}

function createInstalledIdeasSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Ideas que deberían quedar instaladas",
    "Más que memorizar herramientas, conviene salir con una lectura técnica más ordenada de lo que hace madura a una página.",
    "Cierre"
  );

  [
    {
      x: 1.02,
      y: 2.42,
      w: 4.74,
      h: 1.34,
      title: "SEO técnico empieza en estructura",
      body: "title, headings, enlaces y semántica ayudan primero a que el documento se deje entender.",
      fill: C.paleRed,
      line: C.paleRed,
      accent: C.red,
    },
    {
      x: 6.02,
      y: 2.42,
      w: 4.74,
      h: 1.34,
      title: "Rendimiento es experiencia percibida",
      body: "LCP, CLS e INP importan cuando explican qué se siente al cargar y al interactuar.",
      fill: C.warm,
      line: C.warm,
      accent: C.gold,
    },
    {
      x: 1.02,
      y: 4.04,
      w: 4.74,
      h: 1.34,
      title: "Accesibilidad mejora claridad de uso",
      body: "labels, contraste, foco y texto alternativo ordenan mejor la interfaz para más personas.",
      fill: C.softBlue,
      line: C.softBlue,
      accent: C.navy,
    },
    {
      x: 6.02,
      y: 4.04,
      w: 4.74,
      h: 1.34,
      title: "Auditar no es obedecer un score",
      body: "el reporte ayuda a mirar mejor, pero la validación final sigue ocurriendo en pantalla y con criterio.",
      fill: C.mist,
      line: C.mist,
      accent: C.navy,
    },
  ].forEach((card) => {
    addCard(slide, SH, {
      ...card,
      titleFontSize: 15.2,
      bodyFontSize: 10.2,
    });
  });

  validateSlide(slide, pptx);
}

function createClassMethodSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La metodología de la clase también importa",
    "Hoy no solo revisamos temas: dejamos una forma de trabajo que mezcla comprensión, medición, apoyo inteligente y validación real.",
    "Cierre"
  );

  const steps = [
    { label: "1", title: "Entender el problema", body: "leer documento, contexto y experiencia antes de corregir", fill: C.paleRed, accent: C.red },
    { label: "2", title: "Medir con herramientas", body: "usar navegador, Lighthouse y paneles como evidencia", fill: C.softBlue, accent: C.navy },
    { label: "3", title: "Apoyarse con inteligencia", body: "usar agentes para resumir, comparar o proponer", fill: C.warm, accent: C.gold },
    { label: "4", title: "Validar con criterio", body: "probar uso real y decidir qué importa de verdad", fill: C.mist, accent: C.navy },
  ];

  steps.forEach((step, index) => {
    const x = 1.04 + index * 2.58;
    addPanel(slide, x, 2.72, 2.12, 2.18, {
      fill: step.fill,
      line: step.fill,
    });
    slide.addText(`Paso ${step.label}`, {
      x,
      y: 2.94,
      w: 2.12,
      h: 0.12,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11,
      bold: true,
      color: step.accent,
      align: "center",
      margin: 0,
    });
    slide.addText(step.title, {
      x: x + 0.18,
      y: 3.62,
      w: 1.76,
      h: 0.58,
      fontFace: TYPOGRAPHY.display,
      fontSize: 15.8,
      bold: true,
      color: C.navy,
      align: "center",
      valign: "mid",
      margin: 0,
    });
    slide.addText(step.body, {
      x: x + 0.18,
      y: 4.56,
      w: 1.76,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: 7.8,
      color: C.ink,
      align: "center",
      valign: "mid",
      margin: 0,
    });
    if (index < steps.length - 1) {
      addArrow(slide, x + 2.22, 3.62, 0.22, 0.28, C.gold);
    }
  });

  addCenterStatement(slide, SH, "Entender -> medir -> apoyarse -> validar. Ese es el hábito técnico que la clase intenta instalar.", {
    x: 1.54,
    y: 5.54,
    w: 8.54,
    h: 0.66,
    fill: C.softNeutral,
    fontSize: 15.8,
  });

  validateSlide(slide, pptx);
}

function createExitQuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas de salida",
    "Antes de pasar a JavaScript, conviene cerrar la sesión con preguntas que obliguen a leer la calidad web como sistema.",
    "Cierre"
  );

  [
    {
      x: 1.08,
      y: 2.44,
      w: 4.88,
      h: 1.28,
      title: "1. ¿Qué diferencia hay entre mirar una página a ojo y leer su calidad con evidencia técnica?",
      fill: C.paleRed,
      line: C.paleRed,
      accent: C.red,
    },
    {
      x: 6,
      y: 2.44,
      w: 4.88,
      h: 1.28,
      title: "2. ¿Qué señales del HTML ayudan a que una página se deje entender mejor por personas y buscadores?",
      fill: C.softBlue,
      line: C.softBlue,
      accent: C.navy,
    },
    {
      x: 1.08,
      y: 4.04,
      w: 4.88,
      h: 1.28,
      title: "3. ¿Por qué una puntuación más alta no garantiza por sí sola una mejor experiencia?",
      fill: C.warm,
      line: C.warm,
      accent: C.gold,
    },
    {
      x: 6,
      y: 4.04,
      w: 4.88,
      h: 1.28,
      title: "4. ¿Qué puede acelerar un agente en una auditoría y qué parte sigue necesitando revisión humana?",
      fill: C.mist,
      line: C.mist,
      accent: C.navy,
    },
  ].forEach((card) => {
    addCard(slide, SH, {
      ...card,
      body: "",
      titleFontSize: 13.4,
      bodyFontSize: 8.6,
    });
  });

  validateSlide(slide, pptx);
}

function createBridgeToNextClassSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Puente a la siguiente clase",
    "El próximo paso será pasar desde revisar calidad en una interfaz ya hecha hacia construir comportamiento directamente con JavaScript.",
    "Cierre"
  );

  addPanel(slide, 1.02, 2.42, 4.42, 3.58, { fill: C.softBlue, line: C.softBlue });
  slide.addText("Hasta aquí revisamos", {
    x: 1.26,
    y: 2.68,
    w: 2.8,
    h: 0.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 18,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  [
    { title: "estructura", body: "qué deja entender el documento" },
    { title: "carga", body: "cómo aparece y responde la interfaz" },
    { title: "uso", body: "qué tan clara y accesible resulta" },
    { title: "evidencia", body: "cómo se audita con herramientas actuales" },
  ].forEach((item, index) => {
    addMiniCard(slide, SH, {
      x: 1.28,
      y: 3.1 + index * 0.68,
      w: 3.82,
      h: 0.62,
      title: item.title,
      body: item.body,
      accent: index === 0 ? C.red : index === 1 ? C.gold : C.navy,
      fill: index % 2 === 0 ? C.white : C.mist,
      line: index % 2 === 0 ? C.white : C.mist,
      titleFontSize: 10.8,
      bodyFontSize: 7.9,
    });
  });

  const jsSnippet = `const boton = document.querySelector("#comprar");

boton?.addEventListener("click", () => {
  console.log("accion activada");
});`;
  addCodePanel(slide, SH, {
    x: 5.86,
    y: 2.46,
    w: 4.96,
    h: 2.74,
    title: "Luego empezamos a construir comportamiento",
    code: jsSnippet,
    lang: "js",
    fontSize: 10.6,
    titleFill: C.titleFill,
  });
  addMiniCard(slide, SH, {
    x: 5.96,
    y: 5.34,
    w: 4.72,
    h: 0.62,
    title: "Lo que viene",
    body: "variables, condicionales, funciones, tipos de datos, eventos y primeros cambios reales en la interfaz.",
    accent: C.gold,
    fill: C.warm,
    line: C.warm,
    titleFontSize: 11.2,
    bodyFontSize: 8.3,
  });

  validateSlide(slide, pptx);
}

async function main() {
  createCoverSlide();
  createMapSlide();
  createBlockIntroSlide();
  createLooksFineSlide();
  createDimensionsSlide();
  createConnectedConversationSlide();
  createIntuitionSlide();
  createEvidenceBoardSlide();
  createToolsNotDecideSlide();
  createAgenticSlide();
  createQuestionsSlide();
  createClosingSlide();
  createBlock2IntroSlide();
  createSeoStartsWithMeaningSlide();
  createSignalsSlide();
  createSnippetCompareSlide();
  createHtmlBaseSlide();
  createHtmlSnippetSlide();
  createCommunicateSlide();
  createIntentQuestionSlide();
  createBlock2AgenticSlide();
  createBlock2QuestionsSlide();
  createBlock2ClosingSlide();
  createBlock3IntroSlide();
  createPerformanceNotBinarySlide();
  createVisibleDecisionsSlide();
  createToolsPrecisionSlide();
  createMetricsMeaningSlide();
  createSimpleDecisionsSlide();
  createNotMagicSlide();
  createBlock3AgenticSlide();
  createBlock3QuestionsSlide();
  createBlock3ClosingSlide();
  createBlock4IntroSlide();
  createAccessibilityBaseSlide();
  createChecklistSlide();
  createLabelSnippetSlide();
  createAutomaticAuditSlide();
  createReportNotEnoughSlide();
  createScoreNotExperienceSlide();
  createPriorityMatrixSlide();
  createBlock4AgenticSlide();
  createBlock4QuestionsSlide();
  createBlock4ClosingSlide();
  createClassClosingIntroSlide();
  createClassSynthesisFlowSlide();
  createInstalledIdeasSlide();
  createClassMethodSlide();
  createExitQuestionsSlide();
  createBridgeToNextClassSlide();

  await pptx.writeFile({ fileName: outputPptx });
  fs.copyFileSync(__filename, outputJs);
  console.log(`Deck generado: ${outputPptx}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
