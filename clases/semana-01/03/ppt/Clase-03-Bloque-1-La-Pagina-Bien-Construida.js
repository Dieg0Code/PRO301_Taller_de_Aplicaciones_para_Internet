const fs = require("fs");
const path = require("path");
const PptxGenJS = require("pptxgenjs");
const slidesSystem = require("../../../../../tools/slides-system");
const { theme, components, utils } = slidesSystem;
const {
  imageSizingContain,
} = require("../../../../../tools/slides-system/vendor/pptxgenjs_helpers/image");
const {
  applyAiepTheme,
  TOKENS: C,
} = theme;
const {
  setBackground: systemSetBackground,
  addTopRule: systemAddTopRule,
  addSlideNumber: systemAddSlideNumber,
  addMarkBox: systemAddMarkBox,
  addChip: systemAddChip,
  addPill: systemAddPill,
  addCard: systemAddCard,
  addMiniCard: systemAddMiniCard,
  addCenterStatement: systemAddCenterStatement,
  addHeader: systemAddHeader,
  addCodePanel: systemAddCodePanel,
  addCodeAnnotation: systemAddCodeAnnotation,
  addTerminalPanel: systemAddTerminalPanel,
  addBrowserMock: systemAddBrowserMock,
  addFormMock,
  addDomTreePanel: systemAddDomTreePanel,
} = components;
const {
  validateSlide: systemValidateSlide,
} = utils;

const pptx = new PptxGenJS();
applyAiepTheme(pptx, {
  author: "Codex",
  company: "AIEP",
  subject: "Clase 03",
  title: "La Pagina Bien Construida",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx =
  process.env.PPTX_OUTPUT ||
  path.join(rootDir, "Clase-03-Bloque-1-La-Pagina-Bien-Construida.pptx");
const outputJs =
  process.env.PPTX_SOURCE_OUTPUT ||
  path.join(rootDir, "Clase-03-Bloque-1-La-Pagina-Bien-Construida.js");

const logoPath = path.join(__dirname, "assets", "logo-aiep.png");
const logoMarkPath = path.join(__dirname, "assets", "logo-aiep-mark.png");

function validateSlide(slide) {
  systemValidateSlide(slide, pptx);
}

function setBackground(slide, color = C.paper) {
  systemSetBackground(slide, color);
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

function addTopRule(slide) {
  systemAddTopRule(slide, SH, C.navy);
}

function addSlideNumber(slide) {
  systemAddSlideNumber(slide, pptx);
}

function addMarkBox(slide) {
  systemAddMarkBox(slide, SH, logoMarkPath);
}

function addChip(slide, text, opts = {}) {
  systemAddChip(slide, SH, text, opts);
}

function addPill(slide, text, opts = {}) {
  systemAddPill(slide, SH, text, opts);
}

function addHeader(slide, title, subtitle, blockLabel = "Bloque 1") {
  systemAddHeader(slide, SH, pptx, title, subtitle, blockLabel, {
    classLabel: `Clase 03 · ${blockLabel}`,
    logoMarkPath,
  });
}

function addCard(slide, opts) {
  systemAddCard(slide, SH, opts);
}

function addMiniCard(slide, opts) {
  systemAddMiniCard(slide, SH, opts);
}

function addChevron(slide, x, y, w = 0.32, h = 0.26, fill = C.red) {
  slide.addShape(SH.chevron, {
    x,
    y,
    w,
    h,
    fill: { color: fill },
    line: { color: fill },
  });
}

function addCenterStatement(slide, text, opts = {}) {
  systemAddCenterStatement(slide, SH, text, opts);
}

function addCodePanel(slide, opts) {
  systemAddCodePanel(slide, SH, opts);
}

function addCodeAnnotation(slide, opts) {
  systemAddCodeAnnotation(slide, SH, opts);
}

function addTerminalPanel(slide, opts) {
  systemAddTerminalPanel(slide, SH, opts);
}

function addBrowserMock(slide, opts) {
  systemAddBrowserMock(slide, SH, opts);
}

function addDomTreePanel(slide, opts) {
  systemAddDomTreePanel(slide, SH, opts);
}

function addDomNode(slide, opts = {}) {
  slide.addShape(SH.roundRect, {
    x: opts.x,
    y: opts.y,
    w: opts.w || 1.42,
    h: opts.h || 0.44,
    rectRadius: 0.03,
    fill: { color: opts.fill || C.white },
    line: { color: opts.line || C.border, pt: 1 },
  });
  slide.addText(opts.text || "", {
    x: opts.x + 0.08,
    y: opts.y + 0.1,
    w: (opts.w || 1.42) - 0.16,
    h: (opts.h || 0.44) - 0.16,
    fontFace: "Aptos",
    fontSize: opts.fontSize || 11,
    bold: true,
    color: opts.color || C.navy,
    align: "center",
    margin: 0,
  });
}

function addGuideLine(slide, x, y, w, h, color = C.guide) {
  slide.addShape(SH.rect, {
    x,
    y,
    w,
    h,
    fill: { color },
    line: { color },
  });
}

function createCoverSlide() {
  const slide = pptx.addSlide();
  setBackground(slide, C.navy);

  slide.addShape(SH.rect, {
    x: 0.66,
    y: 1.05,
    w: 0.12,
    h: 5.1,
    fill: { color: C.red },
    line: { color: C.red },
  });
  addBarsMotif(slide, 0.74, 0.92, 1.65, C.red);

  slide.addShape(SH.roundRect, {
    x: 9.05,
    y: 0.78,
    w: 3.55,
    h: 1.24,
    rectRadius: 0.05,
    fill: { color: C.white },
    line: { color: C.white },
  });
  slide.addImage({
    path: logoPath,
    ...imageSizingContain(logoPath, 9.22, 0.92, 3.2, 0.94),
  });

  slide.addText("Clase 03 · Semana 01", {
    x: 1.06,
    y: 1.52,
    w: 2.8,
    h: 0.36,
    fontFace: "Aptos",
    fontSize: 12,
    bold: true,
    color: C.sand,
    margin: 0,
  });
  slide.addText("La página bien\nconstruida", {
    x: 1.02,
    y: 2.04,
    w: 4.8,
    h: 1.25,
    fontFace: "Aptos Display",
    fontSize: 26,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("HTML semántico, formularios\ny accesibilidad inicial", {
    x: 1.04,
    y: 3.48,
    w: 4.6,
    h: 0.7,
    fontFace: "Aptos",
    fontSize: 15,
    color: C.sand,
    margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 1.05,
    y: 5.0,
    w: 3.15,
    h: 0.86,
    rectRadius: 0.04,
    fill: { color: "224E8D" },
    line: { color: "224E8D" },
  });
  slide.addText("Miércoles 18 de marzo de 2026\n10:00 - 13:00", {
    x: 1.26,
    y: 5.22,
    w: 2.7,
    h: 0.4,
    fontFace: "Aptos",
    fontSize: 12.5,
    color: C.white,
    margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 4.42,
    y: 5.0,
    w: 4.1,
    h: 0.86,
    rectRadius: 0.04,
    fill: { color: C.paleRed },
    line: { color: C.paleRed },
  });
  slide.addText("Bloque 1\n¿Por qué la estructura de una página importa?", {
    x: 4.7,
    y: 5.12,
    w: 3.55,
    h: 0.54,
    fontFace: "Aptos Display",
    fontSize: 15,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createMapSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Mapa de la clase",
    "La sesión avanza desde la idea de estructura hasta su expresión concreta en HTML, formularios y DOM.",
    "Clase completa"
  );

  const blocks = [
    {
      x: 0.78,
      fill: C.red,
      line: C.red,
      color: C.white,
      title: "Bloque 1",
      body: "¿Por qué la estructura\nde una página importa?",
    },
    {
      x: 3.55,
      fill: C.white,
      line: C.border,
      color: C.navy,
      title: "Bloque 2",
      body: "Anatomía del\ndocumento HTML",
    },
    {
      x: 6.32,
      fill: C.softBlue,
      line: C.softBlue,
      color: C.navy,
      title: "Bloque 3",
      body: "Formularios y\naccesibilidad inicial",
    },
    {
      x: 9.09,
      fill: C.softNeutral,
      line: C.softNeutral,
      color: C.navy,
      title: "Bloque 4",
      body: "Del HTML al DOM",
    },
  ];

  blocks.forEach((block) => {
    slide.addShape(SH.roundRect, {
      x: block.x,
      y: 2.42,
      w: 2.48,
      h: 2.42,
      rectRadius: 0.04,
      fill: { color: block.fill },
      line: { color: block.line, pt: 1 },
    });
    slide.addText(block.title, {
      x: block.x + 0.18,
      y: 2.74,
      w: 2.12,
      h: 0.28,
      fontFace: "Aptos",
      fontSize: 10.5,
      bold: true,
      color: block.color,
      align: "center",
      margin: 0,
    });
    slide.addText(block.body, {
      x: block.x + 0.24,
      y: 3.28,
      w: 2.0,
      h: 0.9,
      fontFace: "Aptos Display",
      fontSize: 17,
      bold: true,
      color: block.color,
      align: "center",
      valign: "mid",
      margin: 0,
    });
  });

  slide.addShape(SH.roundRect, {
    x: 1.18,
    y: 5.52,
    w: 11.0,
    h: 0.46,
    rectRadius: 0.03,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText(
    "Hoy abrimos una idea base: una página bien hecha no solo se ve bien, también se entiende, se mantiene y se puede usar mejor.",
    {
      x: 1.48,
      y: 5.63,
      w: 10.4,
      h: 0.2,
      fontFace: "Aptos",
      fontSize: 11.5,
      color: C.navy,
      align: "center",
      margin: 0,
    }
  );

  validateSlide(slide);
}

function createBlockIntroSlide() {
  const slide = pptx.addSlide();
  setBackground(slide, C.paper);
  addTopRule(slide);
  addSlideNumber(slide);
  addMarkBox(slide);

  slide.addShape(SH.roundRect, {
    x: 0.9,
    y: 1.02,
    w: 3.82,
    h: 4.5,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  addBarsMotif(slide, 1.14, 1.34, 1.55, C.red);
  addChip(slide, "Bloque 1", {
    x: 2.52,
    y: 1.5,
    w: 1.2,
    fill: C.red,
  });
  slide.addText("¿Por qué la\nestructura de\nuna página\nimporta?", {
    x: 1.16,
    y: 2.36,
    w: 2.9,
    h: 1.9,
    fontFace: "Aptos Display",
    fontSize: 22,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText(
    "Antes de hablar de etiquetas concretas, conviene entender por qué HTML no es solo una forma de mostrar cosas.",
    {
      x: 1.16,
      y: 4.52,
      w: 3.0,
      h: 0.62,
      fontFace: "Aptos",
      fontSize: 12.5,
      color: C.sand,
      margin: 0,
    }
  );

  addMiniCard(slide, {
    x: 5.22,
    y: 1.42,
    w: 2.36,
    h: 1.0,
    title: "Estructura",
    body: "Ordena el contenido y le da una forma reconocible.",
    fill: C.white,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 8.0,
    y: 1.42,
    w: 2.36,
    h: 1.0,
    title: "Significado",
    body: "Indica qué función cumple cada bloque del documento.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, {
    x: 5.86,
    y: 2.84,
    w: 2.36,
    h: 1.0,
    title: "Lectura",
    body: "Ayuda a entender la página al abrirla o inspeccionarla.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
  });
  addMiniCard(slide, {
    x: 8.64,
    y: 2.84,
    w: 2.36,
    h: 1.0,
    title: "Mantenimiento",
    body: "Reduce confusión cuando hay que corregir o ampliar.",
    fill: C.white,
    accent: C.red,
  });

  slide.addShape(SH.roundRect, {
    x: 5.28,
    y: 4.42,
    w: 6.08,
    h: 0.84,
    rectRadius: 0.04,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText(
    "La estructura no es decoración interna: es parte de la calidad técnica del documento.",
    {
      x: 5.62,
      y: 4.7,
      w: 5.4,
      h: 0.24,
      fontFace: "Aptos Display",
      fontSize: 14,
      bold: true,
      color: C.navy,
      align: "center",
      margin: 0,
    }
  );

  validateSlide(slide);
}

function createNotOnlyVisibleSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Una página web no es solo lo que se ve",
    "Lo visible importa, pero no alcanza: una página también necesita una organización interna que otros puedan interpretar."
  );

  addCenterStatement(
    slide,
    "Una página bien hecha no solo muestra contenido:\ntambién lo organiza con sentido.",
    {
      x: 0.82,
      y: 2.38,
      w: 7.02,
      h: 1.58,
      fill: C.white,
    }
  );

  addMiniCard(slide, {
    x: 8.24,
    y: 2.22,
    w: 3.12,
    h: 0.92,
    title: "Navegador",
    body: "Necesita interpretar la estructura para construir la interfaz.",
    fill: C.white,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 8.58,
    y: 3.28,
    w: 3.12,
    h: 0.92,
    title: "DevTools",
    body: "Permite inspeccionar mejor cuando el documento es claro.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, {
    x: 8.24,
    y: 4.34,
    w: 3.12,
    h: 0.92,
    title: "Tecnologías de apoyo",
    body: "Una jerarquía mejor construida favorece accesibilidad.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
  });

  slide.addShape(SH.roundRect, {
    x: 1.24,
    y: 4.52,
    w: 6.14,
    h: 0.56,
    rectRadius: 0.03,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText(
    "La estructura también le habla al desarrollador que mañana tendrá que leer, corregir o ampliar ese mismo archivo.",
    {
      x: 1.46,
      y: 4.68,
      w: 5.68,
      h: 0.2,
      fontFace: "Aptos",
      fontSize: 11.4,
      color: C.ink,
      align: "center",
      margin: 0,
    }
  );

  validateSlide(slide);
}

function createActorsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Quién necesita entender la estructura",
    "Una misma página es leída desde ángulos distintos. Por eso la organización interna importa más de lo que parece."
  );

  addCard(slide, {
    x: 0.92,
    y: 2.3,
    w: 2.76,
    h: 1.58,
    title: "Navegador",
    body: "Construye la interfaz a partir del documento y necesita referencias claras.",
    fill: C.white,
    accent: C.red,
  });
  addCard(slide, {
    x: 4.06,
    y: 2.3,
    w: 2.76,
    h: 1.58,
    title: "Herramientas de desarrollo",
    body: "Inspeccionan la estructura real, no solo la apariencia final.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 15,
  });
  addCard(slide, {
    x: 7.2,
    y: 2.3,
    w: 2.76,
    h: 1.58,
    title: "Tecnologías de apoyo",
    body: "Una organización con sentido ayuda a recorrer y comprender mejor.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
    titleFontSize: 15,
  });
  addCard(slide, {
    x: 10.02,
    y: 2.3,
    w: 2.18,
    h: 1.58,
    title: "Desarrollador",
    body: "También necesita entender rápido qué pieza está viendo.",
    fill: C.white,
    accent: C.red,
    titleFontSize: 15,
  });

  slide.addShape(SH.roundRect, {
    x: 1.44,
    y: 4.34,
    w: 10.32,
    h: 1.0,
    rectRadius: 0.04,
    fill: { color: C.warm },
    line: { color: C.warm },
  });
  slide.addText(
    "Si la estructura solo sirve para que la página “se vea”, pero no para que otros la lean e interpreten, el documento quedó corto en términos técnicos.",
    {
      x: 1.9,
      y: 4.66,
      w: 9.4,
      h: 0.34,
      fontFace: "Aptos Display",
      fontSize: 16,
      bold: true,
      color: C.navy,
      align: "center",
      margin: 0,
    }
  );

  validateSlide(slide);
}

function createFlowSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Del contenido a la interpretación",
    "La estructura HTML se vuelve un punto de encuentro entre el contenido y las distintas capas que interactúan con la página."
  );

  addCard(slide, {
    x: 0.92,
    y: 3.0,
    w: 1.96,
    h: 1.04,
    title: "Contenido",
    body: "Ideas, texto,\nmedios, acciones",
    fill: C.white,
    accent: C.red,
    titleFontSize: 15,
    bodyFontSize: 11,
  });
  addChevron(slide, 3.06, 3.38, 0.34, 0.28, C.red);
  addCard(slide, {
    x: 3.5,
    y: 2.82,
    w: 2.18,
    h: 1.4,
    title: "Estructura HTML",
    body: "Ordena, agrupa y nombra las piezas del documento.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16,
  });

  slide.addShape(SH.lineInv, {
    x: 5.96,
    y: 2.7,
    w: 1.14,
    h: 0.78,
    line: { color: C.navy, pt: 1.5 },
  });
  slide.addShape(SH.line, {
    x: 5.96,
    y: 3.5,
    w: 1.14,
    h: 0,
    line: { color: C.navy, pt: 1.5 },
  });
  slide.addShape(SH.line, {
    x: 5.96,
    y: 3.52,
    w: 1.14,
    h: 0.92,
    line: { color: C.navy, pt: 1.5 },
  });

  addMiniCard(slide, {
    x: 7.24,
    y: 2.16,
    w: 2.18,
    h: 1.02,
    title: "Navegador",
    body: "Construye la interfaz visible.",
    fill: C.white,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 7.24,
    y: 3.08,
    w: 2.18,
    h: 1.02,
    title: "DevTools",
    body: "Permiten inspeccionar y diagnosticar.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, {
    x: 7.24,
    y: 4.24,
    w: 2.18,
    h: 1.02,
    title: "Accesibilidad",
    body: "Favorece lectura y navegación asistida.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
  });
  addMiniCard(slide, {
    x: 9.82,
    y: 3.08,
    w: 2.18,
    h: 1.02,
    title: "Mantenimiento",
    body: "Hace más legible el documento futuro.",
    fill: C.white,
    accent: C.red,
  });

  validateSlide(slide);
}

function createSurfaceVsStructureSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Ver algo no es entenderlo",
    "Dos páginas pueden verse parecidas y, aun así, estar construidas con niveles muy distintos de claridad interna."
  );

  addCard(slide, {
    x: 0.94,
    y: 2.4,
    w: 5.1,
    h: 2.78,
    title: "Superficie visual",
    body:
      "Título\nImagen\nBotón\nMenú\nFormulario\n\nEso es lo primero que suele notar un usuario.",
    fill: C.white,
    accent: C.red,
    titleFontSize: 19,
    bodyFontSize: 15,
    bodyYOffset: 0.6,
  });

  slide.addShape(SH.roundRect, {
    x: 5.48,
    y: 3.3,
    w: 2.02,
    h: 0.98,
    rectRadius: 0.04,
    fill: { color: C.warm },
    line: { color: C.warm },
  });
  slide.addText("La calidad técnica está en\ncómo se organiza todo eso.", {
    x: 5.72,
    y: 3.56,
    w: 1.54,
    h: 0.34,
    fontFace: "Aptos Display",
    fontSize: 13,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  addCard(slide, {
    x: 7.86,
    y: 2.4,
    w: 4.56,
    h: 2.78,
    title: "Estructura interna",
    body:
      "Encabezado\nNavegación\nContenido principal\nSección\nFormulario etiquetado\nPie de página\n\nEso es lo que vuelve comprensible el documento.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 19,
    bodyFontSize: 14.5,
    bodyYOffset: 0.6,
  });

  validateSlide(slide);
}

function createHtmlMeaningSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "HTML no solo muestra: describe funciones",
    "Cuando elegimos mejor los elementos, el documento deja de ser una suma de cajas y empieza a expresar su lógica interna."
  );

  const items = [
    {
      x: 0.92,
      y: 2.58,
      fill: C.white,
      accent: C.red,
      title: "Título",
      body: "Marca jerarquía y ayuda a ordenar la lectura.",
    },
    {
      x: 3.34,
      y: 2.24,
      fill: C.softBlue,
      line: C.softBlue,
      accent: C.navy,
      title: "Navegación",
      body: "Agrupa enlaces que orientan el recorrido del sitio.",
    },
    {
      x: 5.76,
      y: 2.58,
      fill: C.paleRed,
      line: C.paleRed,
      accent: C.gold,
      title: "Contenido principal",
      body: "Separa lo central del resto de la interfaz.",
    },
    {
      x: 8.18,
      y: 2.24,
      fill: C.white,
      accent: C.red,
      title: "Sección",
      body: "Divide el documento en partes con sentido propio.",
    },
    {
      x: 10.6,
      y: 2.58,
      fill: C.softNeutral,
      line: C.softNeutral,
      accent: C.navy,
      title: "Pie",
      body: "Cierra la página con información complementaria.",
    },
  ];

  items.forEach((item) => {
    addMiniCard(slide, {
      x: item.x,
      y: item.y,
      w: 2.0,
      h: 1.36,
      title: item.title,
      body: item.body,
      fill: item.fill,
      line: item.line,
      accent: item.accent,
    });
  });

  slide.addShape(SH.line, {
    x: 1.96,
    y: 4.46,
    w: 9.5,
    h: 0,
    line: { color: C.border, pt: 1.2, dash: "dash" },
  });
  slide.addText(
    "La pregunta correcta no es solo “¿qué quiero poner en pantalla?”, sino también “¿qué es esta parte dentro del documento?”.",
    {
      x: 1.9,
      y: 4.72,
      w: 9.6,
      h: 0.36,
      fontFace: "Aptos Display",
      fontSize: 15,
      bold: true,
      color: C.navy,
      align: "center",
      margin: 0,
    }
  );

  validateSlide(slide);
}

function createImprovisationSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Improvisar etiquetas no basta",
    "Usar HTML no garantiza por sí mismo que el documento esté bien construido; la diferencia aparece en la calidad de la estructura."
  );

  slide.addShape(SH.roundRect, {
    x: 0.92,
    y: 2.28,
    w: 5.36,
    h: 2.98,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Página improvisada", {
    x: 1.18,
    y: 2.52,
    w: 2.2,
    h: 0.28,
    fontFace: "Aptos Display",
    fontSize: 18,
    bold: true,
    color: C.white,
    margin: 0,
  });
  ["div", "div", "div", "div", "div"].forEach((label, index) => {
    addPill(slide, label, {
      x: 1.22 + (index % 3) * 1.08,
      y: 3.1 + Math.floor(index / 3) * 0.64,
      w: 0.82,
      h: 0.28,
      fill: C.paleRed,
      line: C.paleRed,
      color: C.red,
    });
  });
  slide.addText(
    "Todo existe, pero nada deja clara su función.\nLeer, corregir o navegar ese documento cuesta más.",
    {
      x: 1.22,
      y: 4.18,
      w: 4.22,
      h: 0.6,
      fontFace: "Aptos",
      fontSize: 13,
      color: C.sand,
      margin: 0,
    }
  );

  slide.addShape(SH.roundRect, {
    x: 7.02,
    y: 2.28,
    w: 5.28,
    h: 2.98,
    rectRadius: 0.04,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Página con criterio", {
    x: 7.28,
    y: 2.52,
    w: 2.2,
    h: 0.28,
    fontFace: "Aptos Display",
    fontSize: 18,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  [
    { text: "header", x: 7.28, y: 3.08, fill: C.paleRed, color: C.red },
    { text: "nav", x: 8.48, y: 3.08, fill: C.softBlue, color: C.navy },
    { text: "main", x: 9.54, y: 3.08, fill: C.softNeutral, color: C.navy },
    { text: "section", x: 7.52, y: 3.72, fill: C.softBlue, color: C.navy },
    { text: "footer", x: 9.2, y: 3.72, fill: C.paleRed, color: C.red },
  ].forEach((item) => {
    addPill(slide, item.text, {
      x: item.x,
      y: item.y,
      w: 1.08,
      h: 0.28,
      fill: item.fill,
      line: item.fill,
      color: item.color,
    });
  });
  slide.addText(
    "La estructura empieza a expresar el rol de cada bloque.\nEso mejora lectura, inspección y mantenimiento.",
    {
      x: 7.28,
      y: 4.18,
      w: 4.46,
      h: 0.6,
      fontFace: "Aptos",
      fontSize: 13,
      color: C.ink,
      margin: 0,
    }
  );

  validateSlide(slide);
}

function createFrictionSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cuando no hay jerarquía aparecen fricciones",
    "La falta de estructura no siempre rompe la página de inmediato, pero sí vuelve más torpe todo lo que viene después."
  );

  addMiniCard(slide, {
    x: 1.0,
    y: 2.36,
    w: 2.2,
    h: 1.14,
    title: "Leer cuesta más",
    body: "El archivo no deja claro qué es central y qué es secundario.",
    fill: C.white,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 3.62,
    y: 2.1,
    w: 2.2,
    h: 1.14,
    title: "Inspeccionar cuesta más",
    body: "DevTools muestra nodos, pero no una lógica bien expresada.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, {
    x: 6.24,
    y: 2.36,
    w: 2.2,
    h: 1.14,
    title: "Mantener cuesta más",
    body: "Corregir una parte puede romper otra por falta de orden.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
  });
  addMiniCard(slide, {
    x: 8.86,
    y: 2.1,
    w: 2.2,
    h: 1.14,
    title: "Navegar cuesta más",
    body: "La experiencia se vuelve menos clara para distintos usuarios.",
    fill: C.white,
    accent: C.red,
  });

  addCenterStatement(
    slide,
    "La falta de semántica no siempre se nota en el diseño,\npero sí se siente en el trabajo técnico.",
    {
      x: 2.04,
      y: 4.06,
      w: 9.3,
      h: 1.0,
      fill: C.softNeutral,
    }
  );

  validateSlide(slide);
}

function createThreeBenefitsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La semántica mejora tres capas a la vez",
    "Una buena estructura no beneficia una sola cosa: ordena lectura, mantenimiento y accesibilidad inicial al mismo tiempo."
  );

  addCard(slide, {
    x: 0.96,
    y: 2.4,
    w: 3.52,
    h: 2.56,
    title: "Lectura técnica",
    body:
      "El archivo se vuelve más rápido de entender.\nSe reconoce mejor qué parte es encabezado,\nnavegación, contenido principal o cierre.",
    fill: C.white,
    accent: C.red,
    titleFontSize: 20,
    bodyFontSize: 13.5,
  });
  addCard(slide, {
    x: 4.92,
    y: 2.24,
    w: 3.52,
    h: 2.72,
    title: "Mantenimiento",
    body:
      "Corregir, ampliar o reorganizar una página cuesta menos cuando el documento ya viene con una lógica visible y consistente.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 20,
    bodyFontSize: 13.5,
  });
  addCard(slide, {
    x: 8.88,
    y: 2.4,
    w: 3.52,
    h: 2.56,
    title: "Accesibilidad inicial",
    body:
      "La estructura con sentido mejora la base sobre la que después se construyen recorridos y lecturas más inclusivas.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
    titleFontSize: 20,
    bodyFontSize: 13.5,
  });

  validateSlide(slide);
}

function createCaseSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Caso breve: el mismo formulario, dos resultados",
    "El diseño visible puede parecer parecido, pero la experiencia técnica cambia cuando la estructura está mejor pensada."
  );

  addCard(slide, {
    x: 0.98,
    y: 2.42,
    w: 5.42,
    h: 2.64,
    title: "Sin etiquetas claras",
    body:
      "Campos sueltos dentro de contenedores genéricos.\nNo se entiende rápido qué pregunta cada control,\nqué parte es principal y dónde empieza o termina el formulario.",
    fill: C.white,
    accent: C.red,
    titleFontSize: 19,
    bodyFontSize: 14,
  });

  slide.addShape(SH.roundRect, {
    x: 5.86,
    y: 3.2,
    w: 1.54,
    h: 0.98,
    rectRadius: 0.04,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("Lo visible\npuede sobrevivir.\nLo técnico, no siempre.", {
    x: 6.06,
    y: 3.38,
    w: 1.14,
    h: 0.42,
    fontFace: "Aptos Display",
    fontSize: 12.5,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  addCard(slide, {
    x: 7.84,
    y: 2.42,
    w: 4.5,
    h: 2.64,
    title: "Con estructura y sentido",
    body:
      "Etiquetas, agrupación y contexto hacen que el formulario se lea mejor,\nsea más fácil de mantener y deje una mejor base para accesibilidad.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 19,
    bodyFontSize: 14,
  });

  validateSlide(slide);
}

function createQuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas guía del bloque",
    "Estas preguntas ayudan a fijar la idea antes de entrar a la anatomía concreta del documento HTML."
  );

  slide.addShape(SH.roundRect, {
    x: 0.98,
    y: 2.5,
    w: 3.46,
    h: 2.04,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  addBarsMotif(slide, 1.2, 2.82, 0.96, C.red);
  slide.addText("Antes de seguir...", {
    x: 1.84,
    y: 2.82,
    w: 1.92,
    h: 0.28,
    fontFace: "Aptos Display",
    fontSize: 20,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText(
    "La estructura es la base que hace posible leer, mantener e inspeccionar la página con más criterio.",
    {
      x: 1.2,
      y: 3.5,
      w: 2.92,
      h: 0.76,
      fontFace: "Aptos",
      fontSize: 13.5,
      color: C.sand,
      margin: 0,
    }
  );

  addMiniCard(slide, {
    x: 5.0,
    y: 2.3,
    w: 2.2,
    h: 1.42,
    title: "Pregunta 1",
    body: "¿Por qué una página no debería entenderse solo como algo visual?",
    fill: C.white,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 7.56,
    y: 2.78,
    w: 2.2,
    h: 1.42,
    title: "Pregunta 2",
    body: "¿Qué cambia cuando el HTML expresa mejor la función de cada parte?",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, {
    x: 10.12,
    y: 2.3,
    w: 2.2,
    h: 1.42,
    title: "Pregunta 3",
    body: "¿Qué problema aparece cuando todo se construye sin jerarquía clara?",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
  });

  validateSlide(slide);
}

function createClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Síntesis del bloque",
    "HTML no solo sirve para mostrar contenido: organiza la información y deja una base más sana para todo lo que viene después."
  );

  slide.addShape(SH.roundRect, {
    x: 0.96,
    y: 2.38,
    w: 7.08,
    h: 2.38,
    rectRadius: 0.04,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Idea clave", {
    x: 1.22,
    y: 2.72,
    w: 1.4,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 10,
    bold: true,
    color: C.red,
    margin: 0,
  });
  slide.addText(
    "Una página bien construida no solo se ve bien:\nes una estructura de información que también se puede leer, mantener e interpretar mejor.",
    {
      x: 1.22,
      y: 2.98,
      w: 6.1,
      h: 1.04,
      fontFace: "Aptos Display",
      fontSize: 21,
      bold: true,
      color: C.navy,
      margin: 0,
    }
  );
  addPill(slide, "estructura", {
    x: 1.22,
    y: 4.18,
    w: 1.22,
    h: 0.28,
    fill: C.paleRed,
    line: C.paleRed,
    color: C.red,
  });
  addPill(slide, "significado", {
    x: 2.62,
    y: 4.18,
    w: 1.36,
    h: 0.28,
    fill: C.softBlue,
    line: C.softBlue,
    color: C.navy,
  });
  addPill(slide, "mantenimiento", {
    x: 4.16,
    y: 4.18,
    w: 1.56,
    h: 0.28,
    fill: C.softNeutral,
    line: C.softNeutral,
    color: C.navy,
  });

  addCard(slide, {
    x: 8.34,
    y: 2.38,
    w: 3.92,
    h: 2.38,
    title: "Puente al Bloque 2",
    body:
      "En el siguiente tramo veremos cómo esa idea se traduce en elementos concretos del documento: `html`, `head`, `body`, `header`, `main`, `section` y más.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 19,
    bodyFontSize: 13.5,
  });

  validateSlide(slide);
}

function createBlock2IntroSlide() {
  const slide = pptx.addSlide();
  setBackground(slide, C.paper);
  addTopRule(slide);
  addSlideNumber(slide);
  addMarkBox(slide);
  addChip(slide, "Clase 03 · Bloque 2", {
    x: 0.72,
    y: 0.52,
    w: 2.18,
    fill: C.red,
  });

  slide.addShape(SH.roundRect, {
    x: 0.92,
    y: 1.2,
    w: 4.24,
    h: 4.3,
    rectRadius: 0.04,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("Anatomía\ndel documento\nHTML", {
    x: 1.2,
    y: 1.56,
    w: 2.56,
    h: 1.4,
    fontFace: "Aptos Display",
    fontSize: 27,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  addPill(slide, "<!DOCTYPE html>", {
    x: 1.2,
    y: 3.38,
    w: 1.9,
    h: 0.3,
    fill: C.white,
    line: C.border,
    color: C.red,
  });
  addPill(slide, "<head>", {
    x: 1.2,
    y: 3.86,
    w: 1.12,
    h: 0.3,
    fill: C.softBlue,
    line: C.softBlue,
    color: C.navy,
  });
  addPill(slide, "<body>", {
    x: 2.48,
    y: 3.86,
    w: 1.18,
    h: 0.3,
    fill: C.paleRed,
    line: C.paleRed,
    color: C.red,
  });

  addCard(slide, {
    x: 5.62,
    y: 1.48,
    w: 2.34,
    h: 1.18,
    title: "Base válida",
    body: "Todo parte con una estructura mínima bien declarada.",
    fill: C.white,
    accent: C.red,
  });
  addCard(slide, {
    x: 8.18,
    y: 1.92,
    w: 2.34,
    h: 1.18,
    title: "`head`",
    body: "Describe y configura el documento.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addCard(slide, {
    x: 10.74,
    y: 2.36,
    w: 1.78,
    h: 1.18,
    title: "`body`",
    body: "Organiza el contenido visible.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
    titleFontSize: 16,
    bodyFontSize: 11.5,
  });

  slide.addShape(SH.roundRect, {
    x: 5.7,
    y: 4.36,
    w: 6.12,
    h: 0.78,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText(
    "En este bloque dejamos la idea general y entramos a leer HTML como estructura concreta.",
    {
      x: 6.04,
      y: 4.62,
      w: 5.44,
      h: 0.2,
      fontFace: "Aptos Display",
      fontSize: 15,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    }
  );

  validateSlide(slide);
}

function createHtmlSkeletonSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La base mínima de un documento HTML",
    "Antes de construir secciones, navegación o formularios, el archivo necesita una estructura base válida.",
    "Bloque 2"
  );

  addCodePanel(slide, {
    x: 0.88,
    y: 2.42,
    w: 5.46,
    h: 3.14,
    title: "documento-base.html",
    fontSize: 10.5,
    code:
      "<!DOCTYPE html>\n<html lang=\"es\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Mi primera página semántica</title>\n  </head>\n  <body>\n    <h1>Hola mundo</h1>\n    <p>Este documento ya tiene una base válida.</p>\n  </body>\n</html>",
  });

  addMiniCard(slide, {
    x: 6.86,
    y: 2.48,
    w: 2.36,
    h: 0.98,
    title: "`<!DOCTYPE html>`",
    body: "Activa la interpretación del documento como HTML5.",
    fill: C.white,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 9.62,
    y: 2.48,
    w: 2.36,
    h: 0.98,
    title: "`<html lang=\"es\">`",
    body: "Envuelve todo y declara idioma principal.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, {
    x: 6.86,
    y: 3.7,
    w: 2.36,
    h: 0.98,
    title: "`<head>`",
    body: "Guarda configuración, título y metadatos.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
  });
  addMiniCard(slide, {
    x: 9.62,
    y: 3.7,
    w: 2.36,
    h: 0.98,
    title: "`<body>`",
    body: "Contiene la estructura visible e interactiva.",
    fill: C.white,
    accent: C.red,
  });

  validateSlide(slide);
}

function createLineByLineSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Qué dice cada parte del esqueleto",
    "No basta con copiar una plantilla: conviene saber qué problema resuelve cada línea inicial del archivo.",
    "Bloque 2"
  );

  addMiniCard(slide, {
    x: 0.98,
    y: 2.5,
    w: 2.5,
    h: 1.16,
    title: "DOCTYPE",
    body: "Le dice al navegador que debe trabajar con HTML5.",
    fill: C.white,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 3.82,
    y: 2.2,
    w: 2.5,
    h: 1.16,
    title: "Idioma",
    body: "Ayuda a lectores, herramientas y contexto del documento.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, {
    x: 6.66,
    y: 2.5,
    w: 2.5,
    h: 1.16,
    title: "Charset",
    body: "Evita problemas de codificación de caracteres.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
  });
  addMiniCard(slide, {
    x: 9.5,
    y: 2.2,
    w: 2.5,
    h: 1.16,
    title: "Viewport",
    body: "Ayuda a que la página responda mejor en dispositivos.",
    fill: C.white,
    accent: C.red,
  });

  addCenterStatement(
    slide,
    "Una base mínima válida ahorra confusión antes incluso de escribir el contenido real.",
    {
      x: 1.34,
      y: 4.2,
      w: 10.4,
      h: 0.94,
      fill: C.softNeutral,
    }
  );

  validateSlide(slide);
}

function createHeadVsBodySlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "`head` y `body` no hacen lo mismo",
    "Una de las primeras distinciones técnicas útiles es separar configuración del documento y estructura visible.",
    "Bloque 2"
  );

  slide.addShape(SH.roundRect, {
    x: 0.96,
    y: 2.42,
    w: 5.28,
    h: 2.86,
    rectRadius: 0.04,
    fill: { color: C.softBlue },
    line: { color: C.softBlue },
  });
  slide.addText("`head`", {
    x: 1.28,
    y: 2.72,
    w: 1.0,
    h: 0.28,
    fontFace: "Aptos Display",
    fontSize: 22,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText(
    "Describe y configura el documento.\n\nAquí viven charset, viewport, title,\nmetadatos y enlaces a recursos.",
    {
      x: 1.28,
      y: 3.18,
      w: 3.44,
      h: 1.3,
      fontFace: "Aptos",
      fontSize: 15,
      color: C.ink,
      margin: 0,
    }
  );
  addPill(slide, "configuración", {
    x: 1.28,
    y: 4.58,
    w: 1.4,
    h: 0.3,
    fill: C.white,
    line: C.border,
    color: C.navy,
  });
  addPill(slide, "metadatos", {
    x: 2.84,
    y: 4.58,
    w: 1.26,
    h: 0.3,
    fill: C.white,
    line: C.border,
    color: C.navy,
  });

  slide.addShape(SH.roundRect, {
    x: 7.08,
    y: 2.42,
    w: 5.28,
    h: 2.86,
    rectRadius: 0.04,
    fill: { color: C.paleRed },
    line: { color: C.paleRed },
  });
  slide.addText("`body`", {
    x: 7.4,
    y: 2.72,
    w: 1.1,
    h: 0.28,
    fontFace: "Aptos Display",
    fontSize: 22,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText(
    "Contiene la estructura visible e interactiva.\n\nAquí viven encabezados, navegación,\nsecciones, formularios, enlaces y contenido principal.",
    {
      x: 7.4,
      y: 3.18,
      w: 3.74,
      h: 1.34,
      fontFace: "Aptos",
      fontSize: 15,
      color: C.ink,
      margin: 0,
    }
  );
  addPill(slide, "contenido", {
    x: 7.4,
    y: 4.58,
    w: 1.12,
    h: 0.3,
    fill: C.white,
    line: C.border,
    color: C.red,
  });
  addPill(slide, "interacción", {
    x: 8.7,
    y: 4.58,
    w: 1.28,
    h: 0.3,
    fill: C.white,
    line: C.border,
    color: C.red,
  });

  validateSlide(slide);
}

function createHeadContentsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Qué suele vivir dentro del elemento head",
    "Head no se recorre como contenido principal, pero sigue siendo clave para que el documento funcione y se interprete mejor.",
    "Bloque 2"
  );

  slide.addShape(SH.roundRect, {
    x: 5.2,
    y: 2.42,
    w: 2.62,
    h: 0.72,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Elemento head", {
    x: 5.46,
    y: 2.64,
    w: 2.1,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 14,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });

  addMiniCard(slide, {
    x: 0.92,
    y: 3.52,
    w: 2.44,
    h: 1.14,
    title: "Charset",
    body: "Codificación correcta de caracteres.",
    fill: C.white,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 3.82,
    y: 3.52,
    w: 2.44,
    h: 1.14,
    title: "Viewport",
    body: "Escala y adaptación en dispositivos.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, {
    x: 6.72,
    y: 3.52,
    w: 2.44,
    h: 1.14,
    title: "Title",
    body: "Nombre visible en pestañas y contexto.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
  });
  addMiniCard(slide, {
    x: 9.62,
    y: 3.52,
    w: 2.44,
    h: 1.14,
    title: "Recursos",
    body: "Puede enlazar CSS, íconos y otros metadatos.",
    fill: C.white,
    accent: C.red,
  });

  // Organigrama simple: los conectores se tocan entre sí a propósito para
  // expresar que estos elementos cuelgan del mismo nodo semántico.
  slide.addShape(SH.rect, {
    x: 6.5,
    y: 3.14,
    w: 0.03,
    h: 0.26,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addShape(SH.rect, {
    x: 2.14,
    y: 3.38,
    w: 8.72,
    h: 0.03,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  [2.14, 5.04, 7.94, 10.84].forEach((x) => {
    slide.addShape(SH.rect, {
      x,
      y: 3.38,
      w: 0.03,
      h: 0.16,
      fill: { color: C.navy },
      line: { color: C.navy },
    });
  });

  slide.addShape(SH.roundRect, {
    x: 1.36,
    y: 4.96,
    w: 10.6,
    h: 0.5,
    rectRadius: 0.03,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText(
    "Aunque no aparezca como contenido principal, aquí se define parte importante de cómo el documento se presenta, se adapta y se interpreta.",
    {
      x: 1.64,
      y: 5.12,
      w: 10.04,
      h: 0.18,
      fontFace: "Aptos",
      fontSize: 11,
      color: C.ink,
      align: "center",
      margin: 0,
    }
  );

  validateSlide(slide);
}

function createBodyHierarchySlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El `body` necesita jerarquía",
    "Dentro del cuerpo del documento no conviene acumular bloques sin criterio: cada pieza debería dejar más clara la lectura del conjunto.",
    "Bloque 2"
  );

  const tags = [
    { text: "header", x: 0.98, y: 2.82, fill: C.paleRed, color: C.red },
    { text: "nav", x: 2.44, y: 2.28, fill: C.softBlue, color: C.navy },
    { text: "main", x: 4.1, y: 2.82, fill: C.navy, color: C.white },
    { text: "section", x: 5.9, y: 2.28, fill: C.softNeutral, color: C.navy },
    { text: "article", x: 7.88, y: 2.82, fill: C.paleRed, color: C.red },
    { text: "footer", x: 9.88, y: 2.28, fill: C.softBlue, color: C.navy },
  ];

  tags.forEach((tag, index) => {
    slide.addShape(SH.roundRect, {
      x: tag.x,
      y: tag.y,
      w: 1.28,
      h: 0.56,
      rectRadius: 0.04,
      fill: { color: tag.fill },
      line: { color: tag.fill },
    });
    slide.addText(`<${tag.text}>`, {
      x: tag.x + 0.12,
      y: tag.y + 0.16,
      w: 1.04,
      h: 0.16,
      fontFace: "Consolas",
      fontSize: 14,
      bold: true,
      color: tag.color,
      align: "center",
      margin: 0,
    });
    if (index < tags.length - 1) {
      addChevron(slide, tag.x + 1.42, tag.y + 0.16, 0.28, 0.24, C.navy);
    }
  });

  addCard(slide, {
    x: 1.26,
    y: 4.08,
    w: 3.18,
    h: 1.34,
    title: "Encabezado y navegación",
    body: "Dan contexto inicial y orientan el recorrido del usuario.",
    fill: C.white,
    accent: C.red,
  });
  addCard(slide, {
    x: 4.98,
    y: 4.08,
    w: 3.18,
    h: 1.34,
    title: "Contenido principal",
    body: "Agrupa el núcleo de la página y separa lo central del resto.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addCard(slide, {
    x: 8.7,
    y: 4.08,
    w: 3.18,
    h: 1.34,
    title: "Cierre del documento",
    body: "El pie no cumple la misma función que el contenido central.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
  });

  validateSlide(slide);
}

function createSemanticBodyCodeSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un `body` semántico real",
    "Cuando el HTML organiza mejor las piezas, el archivo empieza a ser más legible incluso antes de aplicar estilos.",
    "Bloque 2"
  );

  addCodePanel(slide, {
    x: 0.9,
    y: 2.36,
    w: 6.16,
    h: 3.28,
    title: "body-semantico.html",
    fontSize: 10.4,
    code:
      "<body>\n  <header>\n    <h1>Portafolio de Ana Pérez</h1>\n    <nav>...</nav>\n  </header>\n\n  <main>\n    <section id=\"sobre-mi\">...</section>\n    <section id=\"proyectos\">\n      <article>...</article>\n    </section>\n  </main>\n\n  <footer>Contacto</footer>\n</body>",
  });

  addMiniCard(slide, {
    x: 7.54,
    y: 2.42,
    w: 2.2,
    h: 1.0,
    title: "`header`",
    body: "Marca el inicio y puede agrupar título y navegación.",
    fill: C.white,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 9.98,
    y: 3.08,
    w: 2.2,
    h: 1.0,
    title: "`main`",
    body: "Separa el contenido principal del resto.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, {
    x: 7.54,
    y: 4.12,
    w: 2.2,
    h: 1.0,
    title: "`footer`",
    body: "Cierra la página con información complementaria.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
  });

  validateSlide(slide);
}

function createRolesSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "No todos los bloques significan lo mismo",
    "Los elementos semánticos no son piezas decorativas: ayudan a reconocer la función de cada zona del documento.",
    "Bloque 2"
  );

  addMiniCard(slide, {
    x: 1.0,
    y: 2.42,
    w: 1.76,
    h: 1.16,
    title: "header",
    body: "Inicio del documento",
    fill: C.white,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 3.0,
    y: 2.86,
    w: 1.76,
    h: 1.16,
    title: "nav",
    body: "Recorrido y enlaces",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, {
    x: 5.0,
    y: 2.42,
    w: 1.76,
    h: 1.16,
    title: "main",
    body: "Núcleo del contenido",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
  });
  addMiniCard(slide, {
    x: 7.0,
    y: 2.86,
    w: 1.76,
    h: 1.16,
    title: "section",
    body: "Parte con sentido propio",
    fill: C.white,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 9.0,
    y: 2.42,
    w: 1.76,
    h: 1.16,
    title: "article",
    body: "Unidad más autónoma",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, {
    x: 11.0,
    y: 2.86,
    w: 1.28,
    h: 1.16,
    title: "footer",
    body: "Cierre",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
  });

  slide.addShape(SH.roundRect, {
    x: 1.8,
    y: 4.42,
    w: 9.72,
    h: 0.84,
    rectRadius: 0.04,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText(
    "La pregunta útil no es solo “qué etiqueta sé usar”, sino “qué función representa mejor esta parte del documento”.",
    {
      x: 2.16,
      y: 4.68,
      w: 8.98,
      h: 0.24,
      fontFace: "Aptos Display",
      fontSize: 15,
      bold: true,
      color: C.navy,
      align: "center",
      margin: 0,
    }
  );

  validateSlide(slide);
}

function createDivVsSemanticBlock2Slide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Estructura semántica vs contenedores genéricos",
    "La diferencia no está solo en el nombre de la etiqueta, sino en la claridad que deja para leer e inspeccionar el documento.",
    "Bloque 2"
  );

  addCodePanel(slide, {
    x: 0.92,
    y: 2.42,
    w: 5.26,
    h: 2.8,
    title: "estructura-generica.html",
    code:
      "<div>\n  <div>Portafolio de Ana</div>\n  <div>Sobre mí</div>\n  <div>Proyectos</div>\n  <div>Contacto</div>\n</div>",
  });
  addCodePanel(slide, {
    x: 7.1,
    y: 2.42,
    w: 5.26,
    h: 2.8,
    title: "estructura-semantica.html",
    fill: "1B3554",
    titleFill: "335985",
    code:
      "<header>\n  <h1>Portafolio de Ana</h1>\n  <nav>...</nav>\n</header>\n<main>\n  <section>Sobre mí</section>\n  <section>Proyectos</section>\n</main>",
  });

  validateSlide(slide);
}

function createDevToolsReadabilitySlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cuando inspeccionas el DOM, esto sí importa",
    "La anatomía del documento afecta directamente la velocidad con que puedes ubicarte y diagnosticar algo en el navegador.",
    "Bloque 2"
  );

  addCard(slide, {
    x: 1.0,
    y: 2.42,
    w: 4.62,
    h: 2.68,
    title: "Árbol difícil de leer",
    body:
      "div\n  div\n    div\n      div\n  div\n    div\n\nTodo existe, pero cuesta reconocer funciones.",
    fill: C.white,
    accent: C.red,
    titleFontSize: 20,
    bodyFontSize: 14,
  });

  slide.addShape(SH.roundRect, {
    x: 5.88,
    y: 3.26,
    w: 1.46,
    h: 0.9,
    rectRadius: 0.04,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("DevTools\nlo hace visible", {
    x: 6.06,
    y: 3.5,
    w: 1.1,
    h: 0.3,
    fontFace: "Aptos Display",
    fontSize: 12.5,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  addCard(slide, {
    x: 7.72,
    y: 2.42,
    w: 4.62,
    h: 2.68,
    title: "Árbol más legible",
    body:
      "header\n  nav\nmain\n  section\n  article\nfooter\n\nAquí se entiende mucho más rápido qué parte estás mirando.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 20,
    bodyFontSize: 14,
  });

  validateSlide(slide);
}

function createBlock2QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas guía del bloque",
    "Antes de pasar a formularios, conviene fijar qué piezas hacen reconocible a un documento HTML bien construido.",
    "Bloque 2"
  );

  addCodePanel(slide, {
    x: 0.98,
    y: 2.42,
    w: 3.78,
    h: 2.62,
    title: "pista técnica",
    code:
      "<!DOCTYPE html>\n<html lang=\"es\">\n  <head>...</head>\n  <body>...</body>\n</html>",
  });

  addMiniCard(slide, {
    x: 5.36,
    y: 2.34,
    w: 2.16,
    h: 1.18,
    title: "Pregunta 1",
    body: "¿Qué problema resuelve realmente la estructura base del documento?",
    fill: C.white,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 7.86,
    y: 2.9,
    w: 2.16,
    h: 1.18,
    title: "Pregunta 2",
    body: "¿Por qué `head` y `body` no deberían mezclarse ni conceptual ni técnicamente?",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, {
    x: 10.36,
    y: 2.34,
    w: 2.16,
    h: 1.18,
    title: "Pregunta 3",
    body: "¿Qué gana un desarrollador cuando encuentra un `body` con jerarquía semántica clara?",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
  });

  validateSlide(slide);
}

function createBlock2ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Síntesis del bloque 2",
    "Un documento HTML gana calidad cuando parte bien, separa `head` y `body` con claridad y organiza su contenido con una jerarquía reconocible.",
    "Bloque 2"
  );

  slide.addShape(SH.roundRect, {
    x: 1.02,
    y: 2.5,
    w: 6.78,
    h: 2.14,
    rectRadius: 0.04,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText(
    "Una anatomía clara del documento facilita lectura, inspección, mantenimiento y futuras interacciones.",
    {
      x: 1.38,
      y: 3.0,
      w: 6.0,
      h: 0.72,
      fontFace: "Aptos Display",
      fontSize: 22,
      bold: true,
      color: C.navy,
      margin: 0,
    }
  );

  addCard(slide, {
    x: 8.36,
    y: 2.5,
    w: 3.72,
    h: 2.14,
    title: "Puente al Bloque 3",
    body:
      "En el siguiente tramo veremos formularios y accesibilidad inicial, donde etiquetar y agrupar correctamente deja de ser opcional.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 19,
    bodyFontSize: 13.5,
  });

  validateSlide(slide);
}

function createDocumentTreeSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Del archivo al árbol del documento",
    "El navegador no “ve” un bloque plano de texto: interpreta relaciones entre nodos y construye una estructura jerárquica.",
    "Bloque 2"
  );

  addPill(slide, "<html>", {
    x: 5.6,
    y: 2.2,
    w: 1.2,
    h: 0.32,
    fill: C.navy,
    line: C.navy,
    color: C.white,
  });
  slide.addShape(SH.line, {
    x: 6.18,
    y: 2.54,
    w: 0,
    h: 0.62,
    line: { color: C.navy, pt: 1.4 },
  });
  slide.addShape(SH.line, {
    x: 3.24,
    y: 3.16,
    w: 5.88,
    h: 0,
    line: { color: C.navy, pt: 1.4 },
  });
  slide.addShape(SH.line, {
    x: 3.24,
    y: 3.16,
    w: 0,
    h: 0.54,
    line: { color: C.navy, pt: 1.4 },
  });
  slide.addShape(SH.line, {
    x: 9.12,
    y: 3.16,
    w: 0,
    h: 0.54,
    line: { color: C.navy, pt: 1.4 },
  });

  addCard(slide, {
    x: 2.06,
    y: 3.76,
    w: 2.36,
    h: 1.12,
    title: "`head`",
    body: "Metadatos\nTítulo\nViewport",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    bodyFontSize: 11.5,
  });
  addCard(slide, {
    x: 7.04,
    y: 3.76,
    w: 3.2,
    h: 1.12,
    title: "`body`",
    body: "Contenido visible\nEstructura semántica\nInteracción",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    bodyFontSize: 11.5,
  });

  addMiniCard(slide, {
    x: 8.04,
    y: 5.04,
    w: 1.18,
    h: 0.9,
    title: "header",
    body: "inicio",
    fill: C.white,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 9.44,
    y: 5.04,
    w: 1.18,
    h: 0.9,
    title: "main",
    body: "núcleo",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, {
    x: 10.84,
    y: 5.04,
    w: 1.18,
    h: 0.9,
    title: "footer",
    body: "cierre",
    fill: C.softNeutral,
    line: C.softNeutral,
    accent: C.gold,
  });

  validateSlide(slide);
}

function createBlock3IntroSlide() {
  const slide = pptx.addSlide();
  setBackground(slide, C.paper);
  addTopRule(slide);
  addSlideNumber(slide);
  addMarkBox(slide);
  addChip(slide, "Clase 03 · Bloque 3", {
    x: 0.72,
    y: 0.52,
    w: 2.18,
    fill: C.red,
  });

  slide.addShape(SH.roundRect, {
    x: 0.92,
    y: 1.2,
    w: 4.28,
    h: 4.34,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Formularios\ny accesibilidad\ninicial", {
    x: 1.2,
    y: 1.58,
    w: 2.72,
    h: 1.5,
    fontFace: "Aptos Display",
    fontSize: 27,
    bold: true,
    color: C.white,
    margin: 0,
  });
  addPill(slide, "<form>", {
    x: 1.2,
    y: 3.5,
    w: 1.1,
    h: 0.3,
    fill: C.paleRed,
    line: C.paleRed,
    color: C.red,
  });
  addPill(slide, "<label>", {
    x: 2.44,
    y: 3.5,
    w: 1.1,
    h: 0.3,
    fill: C.softBlue,
    line: C.softBlue,
    color: C.navy,
  });
  addPill(slide, "input", {
    x: 1.2,
    y: 3.96,
    w: 0.98,
    h: 0.3,
    fill: C.white,
    line: C.border,
    color: C.navy,
  });
  addPill(slide, "accesibilidad", {
    x: 2.34,
    y: 3.96,
    w: 1.76,
    h: 0.3,
    fill: C.softNeutral,
    line: C.softNeutral,
    color: C.navy,
  });
  addFormMock(slide, SH, {
    x: 5.76,
    y: 1.54,
    w: 3.1,
    h: 3.36,
    title: "Formulario de acceso",
    fields: [{ label: "Usuario" }, { label: "Contraseña" }],
    buttonLabel: "Ingresar",
  });

  addCard(slide, {
    x: 9.36,
    y: 1.66,
    w: 2.26,
    h: 1.02,
    title: "Captura",
    body: "Pedir datos también implica estructurarlos bien.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16,
    bodyFontSize: 11.5,
  });
  addCard(slide, {
    x: 10.14,
    y: 2.92,
    w: 2.12,
    h: 1.02,
    title: "Claridad",
    body: "Etiquetas, nombres y tipos reducen ambigüedad.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 16,
    bodyFontSize: 11.5,
  });
  addCard(slide, {
    x: 9.34,
    y: 4.18,
    w: 2.34,
    h: 1.02,
    title: "Acceso",
    body: "Una buena base mejora uso, lectura e inspección.",
    fill: C.softNeutral,
    line: C.softNeutral,
    accent: C.gold,
    titleFontSize: 16,
    bodyFontSize: 11.5,
  });

  slide.addShape(SH.roundRect, {
    x: 1.14,
    y: 5.76,
    w: 10.9,
    h: 0.44,
    rectRadius: 0.03,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText(
    "En este bloque pasamos de la estructura del documento a la estructura de interacción: cómo pedir datos con criterio.",
    {
      x: 1.42,
      y: 5.9,
      w: 10.34,
      h: 0.14,
      fontFace: "Aptos",
      fontSize: 11.2,
      color: C.ink,
      align: "center",
      margin: 0,
    }
  );

  validateSlide(slide);
}

function createFormsStructureSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un formulario no es una suma de campos",
    "Capturar datos significa organizar una interacción entre usuario, interfaz y sistema.",
    "Bloque 3"
  );

  slide.addShape(SH.roundRect, {
    x: 0.96,
    y: 2.34,
    w: 2.78,
    h: 2.92,
    rectRadius: 0.04,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Lo que está en juego", {
    x: 1.24,
    y: 2.62,
    w: 1.9,
    h: 0.26,
    fontFace: "Aptos Display",
    fontSize: 18,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  ["Qué se pide", "Cómo se nombra", "Cómo se agrupa", "Qué recibe el sistema"].forEach(
    (text, index) => {
      slide.addShape(SH.roundRect, {
        x: 1.22,
        y: 3.1 + index * 0.48,
        w: 2.2,
        h: 0.32,
        rectRadius: 0.03,
        fill: { color: index % 2 === 0 ? C.paleRed : C.softBlue },
        line: { color: index % 2 === 0 ? C.paleRed : C.softBlue },
      });
      slide.addText(text, {
        x: 1.44,
        y: 3.19 + index * 0.48,
        w: 1.76,
        h: 0.12,
        fontFace: "Aptos",
        fontSize: 10.8,
        bold: true,
        color: index % 2 === 0 ? C.red : C.navy,
        margin: 0,
      });
    }
  );

  addCenterStatement(
    slide,
    "Un formulario bien hecho\norganiza una conversación técnica\nentre persona, navegador y sistema.",
    {
      x: 4.16,
      y: 2.44,
      w: 4.52,
      h: 2.2,
      fill: C.softNeutral,
    }
  );

  addCard(slide, {
    x: 9.1,
    y: 2.36,
    w: 2.16,
    h: 1.04,
    title: "Usuario",
    body: "Completa datos y espera claridad.",
    fill: C.white,
    accent: C.red,
    titleFontSize: 16,
    bodyFontSize: 11.2,
  });
  addCard(slide, {
    x: 10.0,
    y: 3.6,
    w: 2.22,
    h: 1.04,
    title: "Navegador",
    body: "Lee tipos, valida y presenta controles.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 16,
    bodyFontSize: 11.2,
  });
  addCard(slide, {
    x: 9.18,
    y: 4.84,
    w: 2.14,
    h: 1.04,
    title: "Sistema",
    body: "Recibe valores y los procesa.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
    titleFontSize: 16,
    bodyFontSize: 11.2,
  });

  validateSlide(slide);
}

function createBasicFormAnatomySlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Anatomía básica de un formulario HTML",
    "Form, label, input y button no cumplen la misma función: cada pieza aporta contexto técnico al dato.",
    "Bloque 3"
  );

  addCodePanel(slide, {
    x: 0.86,
    y: 2.26,
    w: 5.34,
    h: 3.54,
    title: "Estructura mínima",
    code:
      "<form>\n  <label for=\"nombre\">Nombre</label>\n  <input id=\"nombre\" name=\"nombre\" type=\"text\" />\n\n  <label for=\"correo\">Correo</label>\n  <input id=\"correo\" name=\"correo\" type=\"email\" />\n\n  <button type=\"submit\">Enviar</button>\n</form>",
    fontSize: 10.6,
  });

  addCard(slide, {
    x: 6.64,
    y: 2.4,
    w: 2.44,
    h: 1.02,
    title: "form",
    body: "Agrupa la interacción completa.",
    fill: C.white,
    accent: C.red,
    titleFontSize: 17,
    bodyFontSize: 11.5,
  });
  addCard(slide, {
    x: 9.42,
    y: 2.4,
    w: 2.44,
    h: 1.02,
    title: "label",
    body: "Nombra el dato y lo vuelve más claro.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 17,
    bodyFontSize: 11.5,
  });
  addCard(slide, {
    x: 6.64,
    y: 3.76,
    w: 2.44,
    h: 1.02,
    title: "input",
    body: "Recibe el valor y define tipo de entrada.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
    titleFontSize: 17,
    bodyFontSize: 11.5,
  });
  addCard(slide, {
    x: 9.42,
    y: 3.76,
    w: 2.44,
    h: 1.02,
    title: "button",
    body: "Declara la acción que cierra o envía.",
    fill: C.white,
    accent: C.red,
    titleFontSize: 17,
    bodyFontSize: 11.5,
  });

  addCodeAnnotation(slide, {
    codeX: 0.86,
    codeY: 2.26,
    codeW: 5.34,
    codeH: 3.54,
    totalLines: 9,
    lineNumber: 1,
    column: 2,
    length: 4,
    fontSize: 10.6,
    showUnderline: false,
    laneX: 6.38,
    connectorColor: C.guide,
    target: { x: 6.64, y: 2.4, w: 2.44, h: 1.02, side: "left" },
    color: C.red,
  });
  addCodeAnnotation(slide, {
    codeX: 0.86,
    codeY: 2.26,
    codeW: 5.34,
    codeH: 3.54,
    totalLines: 9,
    lineNumber: 2,
    column: 4,
    length: 5,
    fontSize: 10.6,
    showUnderline: false,
    laneX: 6.38,
    routeY: 2.18,
    connectorColor: C.guide,
    target: { x: 9.42, y: 2.4, w: 2.44, h: 1.02, side: "left" },
    color: C.navy,
  });
  addCodeAnnotation(slide, {
    codeX: 0.86,
    codeY: 2.26,
    codeW: 5.34,
    codeH: 3.54,
    totalLines: 9,
    lineNumber: 3,
    column: 4,
    length: 5,
    fontSize: 10.6,
    showUnderline: false,
    laneX: 6.38,
    connectorColor: C.guide,
    target: { x: 6.64, y: 3.76, w: 2.44, h: 1.02, side: "left" },
    color: C.gold,
  });
  addCodeAnnotation(slide, {
    codeX: 0.86,
    codeY: 2.26,
    codeW: 5.34,
    codeH: 3.54,
    totalLines: 9,
    lineNumber: 8,
    column: 4,
    length: 6,
    fontSize: 10.6,
    showUnderline: false,
    laneX: 6.38,
    routeY: 4.84,
    connectorColor: C.guide,
    target: { x: 9.42, y: 3.76, w: 2.44, h: 1.02, side: "left" },
    color: C.red,
  });

  slide.addShape(SH.roundRect, {
    x: 6.72,
    y: 5.18,
    w: 5.06,
    h: 0.54,
    rectRadius: 0.03,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("Cuando una de estas piezas falta, la intención del formulario se vuelve más confusa.", {
    x: 6.98,
    y: 5.35,
    w: 4.54,
    h: 0.16,
    fontFace: "Aptos",
    fontSize: 11,
    color: C.ink,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createAttributeFlowSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cómo se conecta un dato dentro del formulario",
    "No basta con ver un campo en pantalla: también importa cómo queda identificado dentro del documento y del envío.",
    "Bloque 3"
  );

  const items = [
    { x: 0.96, title: "label", body: "Texto visible\nque orienta", fill: C.white, accent: C.red },
    { x: 3.34, title: "input", body: "Control donde\nse escribe", fill: C.softBlue, accent: C.navy, line: C.softBlue },
    { x: 5.72, title: "name", body: "Nombre técnico\ndel dato", fill: C.paleRed, accent: C.gold, line: C.paleRed },
    { x: 8.1, title: "value", body: "Valor capturado\nen el control", fill: C.white, accent: C.red },
    { x: 10.48, title: "envío", body: "Dato listo para\nprocesarse", fill: C.softBlue, accent: C.navy, line: C.softBlue },
  ];

  items.forEach((item, index) => {
    addCard(slide, {
      x: item.x,
      y: 2.84,
      w: 1.86,
      h: 1.28,
      title: item.title,
      body: item.body,
      fill: item.fill,
      line: item.line || item.fill || C.border,
      accent: item.accent,
      titleFontSize: 17,
      bodyFontSize: 10.8,
      bodyAlign: "center",
    });
    if (index < items.length - 1) {
      addChevron(slide, item.x + 1.98, 3.28, 0.26, 0.24, index % 2 === 0 ? C.red : C.navy);
    }
  });

  addMiniCard(slide, {
    x: 1.28,
    y: 4.82,
    w: 3.08,
    h: 1.0,
    title: "id",
    body: "Identifica el control dentro del documento.",
    fill: C.softNeutral,
    line: C.softNeutral,
    accent: C.gold,
  });
  addMiniCard(slide, {
    x: 4.92,
    y: 4.82,
    w: 3.08,
    h: 1.0,
    title: "for",
    body: "Conecta la etiqueta con el id del campo.",
    fill: C.white,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 8.56,
    y: 4.82,
    w: 3.08,
    h: 1.0,
    title: "name",
    body: "Nombra el dato cuando el formulario se procesa.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });

  validateSlide(slide);
}

function createFieldTypesSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Tipos de campos que conviene reconocer pronto",
    "No todos los controles reciben la misma clase de dato. El tipo también comunica intención técnica.",
    "Bloque 3"
  );

  const cards = [
    { x: 0.96, y: 2.42, title: "text", body: "Texto breve\ncomo nombre o usuario", fill: C.white, accent: C.red },
    { x: 4.14, y: 2.42, title: "email", body: "Correo con validación inicial distinta", fill: C.softBlue, accent: C.navy, line: C.softBlue },
    { x: 7.32, y: 2.42, title: "password", body: "Entrada sensible\ncomo credenciales", fill: C.paleRed, accent: C.gold, line: C.paleRed },
    { x: 0.96, y: 4.1, title: "textarea", body: "Texto largo\ncomo mensaje o comentario", fill: C.softNeutral, accent: C.navy, line: C.softNeutral },
    { x: 4.14, y: 4.1, title: "select", body: "Elección desde\nun conjunto cerrado", fill: C.white, accent: C.red },
    { x: 7.32, y: 4.1, title: "checkbox / radio", body: "Preferencias y\nopciones específicas", fill: C.softBlue, accent: C.navy, line: C.softBlue },
  ];

  cards.forEach((card) => {
    addCard(slide, {
      x: card.x,
      y: card.y,
      w: 2.62,
      h: 1.24,
      title: card.title,
      body: card.body,
      fill: card.fill,
      line: card.line || card.fill || C.border,
      accent: card.accent,
      titleFontSize: 17,
      bodyFontSize: 11.2,
    });
  });

  slide.addShape(SH.roundRect, {
    x: 10.5,
    y: 2.62,
    w: 1.82,
    h: 2.48,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Elegir bien el tipo ayuda a validar,\nguía la interacción\ny hace más clara la estructura.", {
    x: 10.72,
    y: 3.04,
    w: 1.38,
    h: 1.56,
    fontFace: "Aptos",
    fontSize: 12,
    bold: true,
    color: C.white,
    align: "center",
    valign: "mid",
    margin: 0,
  });

  validateSlide(slide);
}

function createLoginFormCodeSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Leer técnicamente un formulario un poco más completo",
    "Required, password, select y el texto del botón ya cuentan una historia de uso antes de ejecutar nada.",
    "Bloque 3"
  );

  addCodePanel(slide, {
    x: 0.86,
    y: 2.3,
    w: 5.52,
    h: 3.84,
    title: "Formulario de acceso",
    code:
      "<form>\n  <label for=\"usuario\">Usuario</label>\n  <input id=\"usuario\" name=\"usuario\" type=\"text\" required />\n\n  <label for=\"clave\">Contraseña</label>\n  <input id=\"clave\" name=\"clave\" type=\"password\" required />\n\n  <label for=\"rol\">Rol</label>\n  <select id=\"rol\" name=\"rol\">\n    <option value=\"estudiante\">Estudiante</option>\n    <option value=\"docente\">Docente</option>\n  </select>\n\n  <button type=\"submit\">Ingresar</button>\n</form>",
    fontSize: 10.2,
  });

  addMiniCard(slide, {
    x: 6.86,
    y: 2.44,
    w: 2.18,
    h: 0.96,
    title: "required",
    body: "No debería enviarse vacío.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 9.28,
    y: 2.44,
    w: 2.18,
    h: 0.96,
    title: "password",
    body: "Tipo pensado para credenciales.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, {
    x: 6.86,
    y: 3.66,
    w: 2.18,
    h: 0.96,
    title: "select",
    body: "Dato que viene de opciones definidas.",
    fill: C.white,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 9.28,
    y: 3.66,
    w: 2.18,
    h: 0.96,
    title: "submit",
    body: "La acción del botón queda declarada.",
    fill: C.softNeutral,
    line: C.softNeutral,
    accent: C.gold,
  });
  addCard(slide, {
    x: 6.84,
    y: 4.98,
    w: 4.6,
    h: 1.06,
    title: "Lectura rápida del formulario",
    body: "Pide identidad, credencial y rol; además deja claro qué dato espera cada campo y qué acción cierra la interacción.",
    fill: C.white,
    accent: C.red,
    titleFontSize: 18,
    bodyFontSize: 11.4,
  });

  validateSlide(slide);
}

function createBadFormSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cuando el formulario se ve corto, pero está mal resuelto",
    "Hay versiones muy breves que se leen rápido, pero dejan demasiadas cosas sin nombrar ni conectar.",
    "Bloque 3"
  );

  addCodePanel(slide, {
    x: 0.88,
    y: 2.42,
    w: 4.4,
    h: 2.7,
    title: "Versión débil",
    code:
      "<form>\n  <input type=\"text\" placeholder=\"Nombre\" />\n  <input type=\"email\" placeholder=\"Correo\" />\n  <button>Enviar</button>\n</form>",
    fill: "6F1D1B",
    titleFill: "962B27",
    fontSize: 11,
  });

  addCard(slide, {
    x: 5.74,
    y: 2.32,
    w: 2.76,
    h: 1.08,
    title: "Falta etiqueta",
    body: "El placeholder no reemplaza a label.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
    titleFontSize: 17,
    bodyFontSize: 11.2,
  });
  addCard(slide, {
    x: 8.88,
    y: 2.32,
    w: 2.76,
    h: 1.08,
    title: "Falta name",
    body: "El dato no queda bien identificado.",
    fill: C.white,
    accent: C.red,
    titleFontSize: 17,
    bodyFontSize: 11.2,
  });
  addCard(slide, {
    x: 5.74,
    y: 3.72,
    w: 2.76,
    h: 1.08,
    title: "Botón ambiguo",
    body: "No declara tipo ni una acción precisa.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 17,
    bodyFontSize: 11.2,
  });
  addCard(slide, {
    x: 8.88,
    y: 3.72,
    w: 2.76,
    h: 1.08,
    title: "Acceso más débil",
    body: "La estructura se vuelve peor para inspección y apoyo.",
    fill: C.softNeutral,
    line: C.softNeutral,
    accent: C.gold,
    titleFontSize: 17,
    bodyFontSize: 11.2,
  });

  slide.addShape(SH.roundRect, {
    x: 1.16,
    y: 5.44,
    w: 10.4,
    h: 0.48,
    rectRadius: 0.03,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("Que algo se vea breve no significa que esté técnicamente bien construido.", {
    x: 1.44,
    y: 5.59,
    w: 9.84,
    h: 0.16,
    fontFace: "Aptos Display",
    fontSize: 14.5,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createGoodVsBadFormSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Misma intención, mejor estructura",
    "La diferencia no es ornamental: cambia cómo se entiende, se usa y se mantiene el formulario.",
    "Bloque 3"
  );

  addCodePanel(slide, {
    x: 0.86,
    y: 2.4,
    w: 4.26,
    h: 2.92,
    title: "Antes",
    code:
      "<form>\n  <input type=\"text\" placeholder=\"Nombre\" />\n  <input type=\"email\" placeholder=\"Correo\" />\n  <button>Enviar</button>\n</form>",
    fill: "6F1D1B",
    titleFill: "962B27",
    fontSize: 10.7,
  });

  addChevron(slide, 5.44, 3.54, 0.44, 0.38, C.red);

  addCodePanel(slide, {
    x: 6.18,
    y: 2.4,
    w: 5.16,
    h: 2.92,
    title: "Después",
    code:
      "<form>\n  <label for=\"nombre-contacto\">Nombre</label>\n  <input id=\"nombre-contacto\" name=\"nombre\" type=\"text\" required />\n\n  <label for=\"correo-contacto\">Correo electrónico</label>\n  <input id=\"correo-contacto\" name=\"correo\" type=\"email\" required />\n\n  <button type=\"submit\">Enviar mensaje</button>\n</form>",
    fontSize: 9.9,
  });

  addPill(slide, "labels reales", {
    x: 1.26,
    y: 5.56,
    w: 1.46,
    h: 0.3,
    fill: C.paleRed,
    line: C.paleRed,
    color: C.red,
  });
  addPill(slide, "names claros", {
    x: 3.02,
    y: 5.56,
    w: 1.46,
    h: 0.3,
    fill: C.softBlue,
    line: C.softBlue,
    color: C.navy,
  });
  addPill(slide, "acción precisa", {
    x: 7.08,
    y: 5.56,
    w: 1.58,
    h: 0.3,
    fill: C.softNeutral,
    line: C.softNeutral,
    color: C.navy,
  });
  addPill(slide, "mejor lectura", {
    x: 8.96,
    y: 5.56,
    w: 1.52,
    h: 0.3,
    fill: C.white,
    line: C.border,
    color: C.red,
  });

  validateSlide(slide);
}

function createGroupingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Agrupar también comunica",
    "Cuando varios controles pertenecen a una misma decisión, conviene expresarlo en la estructura y no solo dejarlo implícito.",
    "Bloque 3"
  );

  slide.addShape(SH.roundRect, {
    x: 1.04,
    y: 2.46,
    w: 4.76,
    h: 2.9,
    rectRadius: 0.04,
    fill: { color: C.white },
    line: { color: C.border, pt: 1.2 },
  });
  slide.addShape(SH.roundRect, {
    x: 1.32,
    y: 2.28,
    w: 2.2,
    h: 0.36,
    rectRadius: 0.03,
    fill: { color: C.paleRed },
    line: { color: C.paleRed },
  });
  slide.addText("Preferencias de contacto", {
    x: 1.54,
    y: 2.39,
    w: 1.76,
    h: 0.14,
    fontFace: "Aptos",
    fontSize: 10.8,
    bold: true,
    color: C.red,
    align: "center",
    margin: 0,
  });

  [["Correo electrónico", 3.1], ["Teléfono", 3.72]].forEach(([label, y], index) => {
    slide.addShape(SH.ellipse, {
      x: 1.58,
      y,
      w: 0.18,
      h: 0.18,
      fill: { color: C.white },
      line: { color: index === 0 ? C.red : C.navy, pt: 1.2 },
    });
    if (index === 0) {
      slide.addShape(SH.ellipse, {
        x: 1.625,
        y: y + 0.045,
        w: 0.09,
        h: 0.09,
        fill: { color: C.red },
        line: { color: C.red },
      });
    }
    slide.addText(label, {
      x: 1.92,
      y: y - 0.02,
      w: 2.8,
      h: 0.22,
      fontFace: "Aptos",
      fontSize: 12,
      color: C.ink,
      margin: 0,
    });
  });

  addCard(slide, {
    x: 6.44,
    y: 2.44,
    w: 2.26,
    h: 1.02,
    title: "fieldset",
    body: "Agrupa controles de una misma unidad lógica.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 17,
    bodyFontSize: 11.2,
  });
  addCard(slide, {
    x: 9.08,
    y: 2.44,
    w: 2.26,
    h: 1.02,
    title: "legend",
    body: "Nombra el grupo para lectura y contexto.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
    titleFontSize: 17,
    bodyFontSize: 11.2,
  });
  addCard(slide, {
    x: 6.44,
    y: 3.82,
    w: 4.9,
    h: 1.14,
    title: "Mismo nombre, misma decisión",
    body: "En radio buttons, compartir name ayuda a expresar que las opciones forman parte de una sola elección.",
    fill: C.white,
    accent: C.red,
    titleFontSize: 17,
    bodyFontSize: 11.3,
  });

  slide.addShape(SH.roundRect, {
    x: 6.52,
    y: 5.28,
    w: 4.72,
    h: 0.48,
    rectRadius: 0.03,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("Agrupar no es decorar: es hacer visible la lógica de la decisión.", {
    x: 6.8,
    y: 5.43,
    w: 4.16,
    h: 0.16,
    fontFace: "Aptos Display",
    fontSize: 14,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createFieldsetCodeSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un ejemplo simple con fieldset y legend",
    "Esta estructura deja mejor expresada una decisión compartida entre varias opciones relacionadas.",
    "Bloque 3"
  );

  addCodePanel(slide, {
    x: 0.88,
    y: 2.34,
    w: 5.42,
    h: 3.58,
    title: "Grupo de preferencia",
    code:
      "<form>\n  <fieldset>\n    <legend>Preferencias de contacto</legend>\n\n    <label>\n      <input type=\"radio\" name=\"contacto\" value=\"correo\" />\n      Correo electrónico\n    </label>\n\n    <label>\n      <input type=\"radio\" name=\"contacto\" value=\"telefono\" />\n      Teléfono\n    </label>\n  </fieldset>\n</form>",
    fontSize: 10.1,
  });

  addMiniCard(slide, {
    x: 6.82,
    y: 2.5,
    w: 2.06,
    h: 1.0,
    title: "legend",
    body: "Declara el tema del grupo.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 9.1,
    y: 2.5,
    w: 2.06,
    h: 1.0,
    title: "radio",
    body: "Una opción dentro de una sola elección.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, {
    x: 6.82,
    y: 3.78,
    w: 2.06,
    h: 1.0,
    title: "name",
    body: "Agrupa técnicamente las opciones.",
    fill: C.white,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 9.1,
    y: 3.78,
    w: 2.06,
    h: 1.0,
    title: "value",
    body: "Representa el valor elegido.",
    fill: C.softNeutral,
    line: C.softNeutral,
    accent: C.gold,
  });

  addCodeAnnotation(slide, {
    codeX: 0.88,
    codeY: 2.34,
    codeW: 5.42,
    codeH: 3.58,
    totalLines: 15,
    lineNumber: 3,
    column: 6,
    length: 6,
    fontSize: 10.1,
    laneX: 6.46,
    connectorColor: C.guide,
    target: { x: 6.82, y: 2.5, w: 2.06, h: 1.0, side: "left" },
    color: C.red,
  });
  addCodeAnnotation(slide, {
    codeX: 0.88,
    codeY: 2.34,
    codeW: 5.42,
    codeH: 3.58,
    totalLines: 15,
    lineNumber: 6,
    column: 20,
    length: 5,
    fontSize: 10.1,
    laneX: 6.46,
    routeY: 2.22,
    connectorColor: C.guide,
    target: { x: 9.1, y: 2.5, w: 2.06, h: 1.0, side: "left" },
    color: C.navy,
  });
  addCodeAnnotation(slide, {
    codeX: 0.88,
    codeY: 2.34,
    codeW: 5.42,
    codeH: 3.58,
    totalLines: 15,
    lineNumber: 6,
    column: 27,
    length: 4,
    fontSize: 10.1,
    laneX: 6.46,
    connectorColor: C.guide,
    target: { x: 6.82, y: 3.78, w: 2.06, h: 1.0, side: "left" },
    color: C.red,
  });
  addCodeAnnotation(slide, {
    codeX: 0.88,
    codeY: 2.34,
    codeW: 5.42,
    codeH: 3.58,
    totalLines: 15,
    lineNumber: 6,
    column: 43,
    length: 5,
    fontSize: 10.1,
    laneX: 6.46,
    routeY: 4.88,
    connectorColor: C.guide,
    target: { x: 9.1, y: 3.78, w: 2.06, h: 1.0, side: "left" },
    color: C.gold,
  });

  addCard(slide, {
    x: 6.78,
    y: 5.02,
    w: 4.42,
    h: 0.92,
    title: "Lectura técnica útil",
    body: "Aquí no solo hay dos controles: hay una misma decisión con dos respuestas posibles.",
    fill: C.white,
    accent: C.red,
    titleFontSize: 17,
    bodyFontSize: 11.2,
  });

  validateSlide(slide);
}

function createBlock3QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas guía del bloque",
    "Estas preguntas ayudan a revisar si el formulario está siendo leído como estructura y no solo como apariencia.",
    "Bloque 3"
  );

  const questions = [
    {
      x: 0.92,
      y: 2.4,
      title: "Pregunta 1",
      body: "¿Por qué un formulario no debería construirse como una suma de campos sueltos?",
      fill: C.white,
      accent: C.red,
    },
    {
      x: 6.72,
      y: 2.4,
      title: "Pregunta 2",
      body: "¿Qué diferencia técnica existe entre id, for y name dentro de un formulario?",
      fill: C.softBlue,
      line: C.softBlue,
      accent: C.navy,
    },
    {
      x: 2.18,
      y: 4.12,
      title: "Pregunta 3",
      body: "¿Por qué el placeholder no debería reemplazar a una etiqueta real?",
      fill: C.paleRed,
      line: C.paleRed,
      accent: C.gold,
    },
    {
      x: 7.98,
      y: 4.12,
      title: "Pregunta 4",
      body: "¿Qué gana un formulario cuando los campos se agrupan y se nombran con claridad?",
      fill: C.white,
      accent: C.red,
    },
  ];

  questions.forEach((q) => {
    addCard(slide, {
      x: q.x,
      y: q.y,
      w: 3.18,
      h: 1.28,
      title: q.title,
      body: q.body,
      fill: q.fill,
      line: q.line || q.fill || C.border,
      accent: q.accent,
      titleFontSize: 16,
      bodyFontSize: 11.4,
    });
  });

  validateSlide(slide);
}

function createBlock3ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del bloque",
    "Un formulario mejora cuando su estructura deja claros los datos, las relaciones y las decisiones del usuario.",
    "Bloque 3"
  );

  slide.addShape(SH.roundRect, {
    x: 0.96,
    y: 2.46,
    w: 6.72,
    h: 2.56,
    rectRadius: 0.04,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText(
    "Un formulario básico gana calidad cuando cada campo está bien nombrado, bien conectado con su etiqueta y bien integrado dentro de una estructura comprensible.",
    {
      x: 1.38,
      y: 2.82,
      w: 5.84,
      h: 1.2,
      fontFace: "Aptos Display",
      fontSize: 20,
      bold: true,
      color: C.navy,
      margin: 0,
    }
  );

  addPill(slide, "labels", {
    x: 1.38,
    y: 4.56,
    w: 0.9,
    h: 0.28,
    fill: C.paleRed,
    line: C.paleRed,
    color: C.red,
  });
  addPill(slide, "name", {
    x: 2.48,
    y: 4.56,
    w: 0.9,
    h: 0.28,
    fill: C.softBlue,
    line: C.softBlue,
    color: C.navy,
  });
  addPill(slide, "tipo", {
    x: 3.58,
    y: 4.56,
    w: 0.84,
    h: 0.28,
    fill: C.softNeutral,
    line: C.softNeutral,
    color: C.navy,
  });
  addPill(slide, "agrupación", {
    x: 4.62,
    y: 4.56,
    w: 1.26,
    h: 0.28,
    fill: C.white,
    line: C.border,
    color: C.red,
  });

  addCard(slide, {
    x: 8.36,
    y: 2.46,
    w: 3.76,
    h: 2.56,
    title: "Puente al Bloque 4",
    body:
      "En el siguiente tramo veremos cómo el navegador transforma ese HTML en DOM y por qué eso importa para inspección y manipulación posterior.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 19,
    bodyFontSize: 13.2,
  });

  validateSlide(slide);
}

function createBlock4IntroSlide() {
  const slide = pptx.addSlide();
  setBackground(slide, C.paper);
  addTopRule(slide);
  addSlideNumber(slide);
  addMarkBox(slide);

  slide.addShape(SH.roundRect, {
    x: 0.9,
    y: 1.08,
    w: 3.96,
    h: 4.56,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  addBarsMotif(slide, 1.18, 1.36, 1.52, C.red);
  addChip(slide, "Bloque 4", {
    x: 2.66,
    y: 1.52,
    w: 1.18,
    fill: C.red,
  });
  slide.addText("Del HTML\nal DOM", {
    x: 1.18,
    y: 2.34,
    w: 2.8,
    h: 1.12,
    fontFace: "Aptos Display",
    fontSize: 25,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText(
    "Ahora la estructura deja de verse solo como archivo y pasa a leerse como árbol vivo dentro del navegador.",
    {
      x: 1.18,
      y: 4.34,
      w: 2.98,
      h: 0.72,
      fontFace: "Aptos",
      fontSize: 12.5,
      color: C.sand,
      margin: 0,
    }
  );

  addMiniCard(slide, {
    x: 5.48,
    y: 1.54,
    w: 2.24,
    h: 1.08,
    title: "Árbol",
    body: "El documento se interpreta como nodos y relaciones.",
    fill: C.white,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 8.02,
    y: 1.54,
    w: 2.24,
    h: 1.08,
    title: "Inspección",
    body: "DevTools deja ver esa estructura y recorrerla.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, {
    x: 10.56,
    y: 1.54,
    w: 2.0,
    h: 1.08,
    title: "Consulta",
    body: "La consola permite ubicar nodos concretos.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
  });

  addCenterStatement(slide, "El navegador no “muestra texto”: interpreta estructura.", {
    x: 5.38,
    y: 3.08,
    w: 6.9,
    h: 1.22,
    fill: C.warm,
    fontSize: 23,
  });

  slide.addShape(SH.roundRect, {
    x: 5.6,
    y: 4.7,
    w: 6.48,
    h: 0.56,
    rectRadius: 0.03,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText(
    "En este bloque veremos parser, árbol DOM, DevTools y primeras consultas desde consola.",
    {
      x: 5.88,
      y: 4.88,
      w: 5.92,
      h: 0.18,
      fontFace: "Aptos",
      fontSize: 11.3,
      color: C.navy,
      align: "center",
      margin: 0,
    }
  );

  validateSlide(slide);
}

function createHtmlToDomStatementSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El navegador no muestra un archivo sin más",
    "Antes de existir una interfaz visible, el documento HTML es leído, interpretado y convertido en una estructura navegable.",
    "Bloque 4"
  );

  addCodePanel(slide, {
    x: 0.88,
    y: 2.3,
    w: 4.44,
    h: 2.84,
    title: "Archivo HTML",
    code:
      "<body>\n  <main>\n    <section>\n      <h1>Contacto</h1>\n      <form></form>\n    </section>\n  </main>\n</body>",
    fontSize: 10.8,
  });

  addChevron(slide, 5.56, 3.06, 0.42, 0.32, C.red);
  addChevron(slide, 6.1, 3.06, 0.42, 0.32, C.red);

  addCenterStatement(slide, "DOM", {
    x: 6.72,
    y: 2.44,
    w: 2.0,
    h: 1.72,
    fill: C.softBlue,
    fontSize: 30,
  });

  addMiniCard(slide, {
    x: 9.28,
    y: 2.34,
    w: 2.96,
    h: 1.12,
    title: "Interpretación",
    body: "El parser transforma etiquetas y atributos en nodos reconocibles.",
    fill: C.white,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 9.28,
    y: 3.72,
    w: 2.96,
    h: 1.12,
    title: "Resultado técnico",
    body: "Lo que ve DevTools y lo que recorrerá JavaScript ya no es texto plano.",
    fill: C.softNeutral,
    line: C.softNeutral,
    accent: C.navy,
  });

  validateSlide(slide);
}

function createDomPipelineSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Del archivo al DOM y al renderizado",
    "La página visible aparece después de una cadena técnica corta pero decisiva.",
    "Bloque 4"
  );

  const steps = [
    { x: 0.9, title: "HTML", body: "Archivo de origen", fill: C.white, accent: C.red },
    { x: 3.06, title: "Parser", body: "Lee etiquetas y atributos", fill: C.softBlue, accent: C.navy },
    { x: 5.22, title: "DOM", body: "Árbol de nodos", fill: C.paleRed, accent: C.gold },
    { x: 7.38, title: "Render", body: "Interfaz visible", fill: C.white, accent: C.red },
    { x: 9.54, title: "Inspección", body: "DevTools y consola", fill: C.softNeutral, accent: C.navy },
  ];

  steps.forEach((step, index) => {
    addMiniCard(slide, {
      x: step.x,
      y: 2.84,
      w: 1.8,
      h: 1.24,
      title: step.title,
      body: step.body,
      fill: step.fill,
      line: step.fill,
      accent: step.accent,
      titleFontSize: 14,
      bodyFontSize: 10.5,
    });
    if (index < steps.length - 1) {
      addChevron(slide, step.x + 1.88, 3.2, 0.34, 0.24, C.red);
    }
  });

  addCard(slide, {
    x: 1.54,
    y: 4.56,
    w: 10.36,
    h: 0.96,
    title: "Lectura útil",
    body: "Si el HTML está mal organizado, el parser igual construirá un DOM, pero ese DOM será menos claro de inspeccionar, seleccionar y mantener.",
    fill: C.white,
    accent: C.red,
    titleFontSize: 16,
    bodyFontSize: 11.5,
  });

  validateSlide(slide);
}

function createSourceVsDomSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La misma página existe en dos formas",
    "Una cosa es el código escrito y otra la estructura que el navegador deja disponible como árbol.",
    "Bloque 4"
  );

  addCodePanel(slide, {
    x: 0.88,
    y: 2.34,
    w: 4.72,
    h: 3.36,
    title: "Código fuente",
    code:
      "<main>\n  <section>\n    <h1>Contacto</h1>\n    <form>\n      <label for=\"correo\">Correo</label>\n      <input id=\"correo\" type=\"email\" />\n    </form>\n  </section>\n</main>",
    fontSize: 10.3,
  });

  slide.addShape(SH.roundRect, {
    x: 6.02,
    y: 2.34,
    w: 5.14,
    h: 3.36,
    rectRadius: 0.04,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Árbol DOM simplificado", {
    x: 6.3,
    y: 2.56,
    w: 2.8,
    h: 0.22,
    fontFace: "Aptos Display",
    fontSize: 16,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  addDomNode(slide, { x: 8.02, y: 2.92, text: "main", fill: C.softBlue, line: C.softBlue });
  addDomNode(slide, { x: 8.02, y: 3.58, text: "section", fill: C.white });
  addDomNode(slide, { x: 6.98, y: 4.28, text: "h1", w: 1.2, fill: C.paleRed, line: C.paleRed });
  addDomNode(slide, { x: 8.72, y: 4.28, text: "form", w: 1.28, fill: C.softNeutral, line: C.softNeutral });
  addDomNode(slide, { x: 8.38, y: 4.96, text: "label", w: 1.16, fill: C.white });
  addDomNode(slide, { x: 9.72, y: 4.96, text: "input", w: 1.16, fill: C.softBlue, line: C.softBlue });

  addGuideLine(slide, 8.7, 3.34, 0.04, 0.26);
  addGuideLine(slide, 8.7, 4.0, 0.04, 0.26);
  addGuideLine(slide, 7.58, 4.06, 2.16, 0.04);
  addGuideLine(slide, 9.32, 4.74, 0.04, 0.22);
  addGuideLine(slide, 10.0, 4.74, 0.04, 0.22);

  validateSlide(slide);
}

function createDomRelationshipsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Padre, hijo y hermano",
    "Leer el DOM como árbol obliga a pensar en relaciones entre nodos, no solo en etiquetas aisladas.",
    "Bloque 4"
  );

  addDomNode(slide, { x: 5.96, y: 2.42, text: "form", w: 1.38, fill: C.softBlue, line: C.softBlue });
  addDomNode(slide, { x: 4.38, y: 3.42, text: "label", w: 1.3, fill: C.paleRed, line: C.paleRed });
  addDomNode(slide, { x: 6.0, y: 3.42, text: "input", w: 1.3, fill: C.white });
  addDomNode(slide, { x: 7.62, y: 3.42, text: "button", w: 1.3, fill: C.softNeutral, line: C.softNeutral });

  addGuideLine(slide, 6.63, 2.86, 0.04, 0.44);
  addGuideLine(slide, 4.98, 3.22, 3.3, 0.04);

  addCard(slide, {
    x: 0.94,
    y: 2.74,
    w: 2.8,
    h: 1.14,
    title: "Padre",
    body: "El nodo que contiene a otros dentro del árbol.",
    fill: C.white,
    accent: C.red,
  });
  addCard(slide, {
    x: 9.08,
    y: 2.74,
    w: 2.82,
    h: 1.14,
    title: "Hijo",
    body: "Nodo contenido directamente dentro de otro.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addCard(slide, {
    x: 3.14,
    y: 4.6,
    w: 7.04,
    h: 0.9,
    title: "Hermano",
    body: "Dos nodos son hermanos cuando comparten el mismo nodo padre, como label, input y button dentro del mismo form.",
    fill: C.white,
    accent: C.red,
    titleFontSize: 16,
    bodyFontSize: 11.6,
  });

  validateSlide(slide);
}

function createNodeAnatomySlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cada nodo trae nombre, atributos y contenido",
    "La lectura del DOM también implica reconocer qué información concreta vive dentro de cada elemento.",
    "Bloque 4"
  );

  slide.addShape(SH.roundRect, {
    x: 1.1,
    y: 2.38,
    w: 5.22,
    h: 3.18,
    rectRadius: 0.04,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  addCodePanel(slide, {
    x: 1.38,
    y: 2.78,
    w: 4.68,
    h: 2.34,
    title: "Nodo seleccionado",
    code: '<input id="correo" name="correo" type="email" />',
    fontSize: 12,
  });

  addMiniCard(slide, {
    x: 7.1,
    y: 2.46,
    w: 2.12,
    h: 1.02,
    title: "Tag",
    body: "Declara qué elemento es.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 9.5,
    y: 2.46,
    w: 2.12,
    h: 1.02,
    title: "Atributos",
    body: "id, name y type entregan contexto técnico.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, {
    x: 7.1,
    y: 3.86,
    w: 2.12,
    h: 1.02,
    title: "Valor",
    body: "Puede cambiar si el usuario escribe.",
    fill: C.softNeutral,
    line: C.softNeutral,
    accent: C.gold,
  });
  addMiniCard(slide, {
    x: 9.5,
    y: 3.86,
    w: 2.12,
    h: 1.02,
    title: "Relación",
    body: "Puede vincularse con label, CSS y JS.",
    fill: C.white,
    accent: C.red,
  });

  validateSlide(slide);
}

function createSemanticDomReadabilitySlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La semántica también mejora la lectura del DOM",
    "Una estructura clara no solo ayuda al HTML: también hace que el árbol visible en el navegador sea más legible.",
    "Bloque 4"
  );

  addCard(slide, {
    x: 0.96,
    y: 2.48,
    w: 5.34,
    h: 2.76,
    title: "Versión genérica",
    body: "Si casi todo está resuelto con contenedores neutros, el árbol se vuelve menos expresivo y ubicar piezas útiles cuesta más.\n\ndiv\n└─ div\n   └─ div\n      ├─ div\n      └─ div",
    fill: C.white,
    accent: C.red,
    bodyFontSize: 12.2,
  });
  addCard(slide, {
    x: 6.76,
    y: 2.48,
    w: 5.34,
    h: 2.76,
    title: "Versión semántica",
    body: "Cuando aparecen header, main, section, form o footer, el árbol deja ver mejor la función de cada parte.\n\nmain\n└─ section\n   ├─ h1\n   └─ form",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    bodyFontSize: 12.2,
  });

  validateSlide(slide);
}

function createDevToolsIntroSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "DevTools deja ver el DOM como estructura viva",
    "La pestaña de elementos muestra el documento ya interpretado por el navegador y no solo el archivo estático.",
    "Bloque 4"
  );

  addBrowserMock(slide, {
    x: 0.9,
    y: 2.36,
    w: 8.38,
    h: 3.42,
    url: "http://localhost:3000/contacto",
  });

  slide.addShape(SH.roundRect, {
    x: 1.22,
    y: 3.0,
    w: 3.24,
    h: 2.34,
    rectRadius: 0.03,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Contacto", {
    x: 1.44,
    y: 3.18,
    w: 1.52,
    h: 0.22,
    fontFace: "Aptos Display",
    fontSize: 16,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText("Correo", {
    x: 1.44,
    y: 3.62,
    w: 1.0,
    h: 0.16,
    fontFace: "Aptos",
    fontSize: 10.5,
    color: C.slate,
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 1.44,
    y: 3.86,
    w: 2.54,
    h: 0.36,
    rectRadius: 0.03,
    fill: { color: C.paper },
    line: { color: C.border, pt: 1 },
  });
  slide.addShape(SH.roundRect, {
    x: 1.44,
    y: 4.5,
    w: 1.22,
    h: 0.34,
    rectRadius: 0.03,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("Enviar", {
    x: 1.78,
    y: 4.58,
    w: 0.54,
    h: 0.1,
    fontFace: "Aptos",
    fontSize: 9.8,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });

  slide.addShape(SH.roundRect, {
    x: 4.82,
    y: 3.0,
    w: 4.08,
    h: 2.34,
    rectRadius: 0.03,
    fill: { color: C.terminalBg },
    line: { color: C.terminalBg },
  });
  slide.addText("<main>\n  <section>\n    <h1>Contacto</h1>\n    <form>\n      <label>Correo</label>\n      <input id=\"correo\" />", {
    x: 5.08,
    y: 3.22,
    w: 3.54,
    h: 1.86,
    fontFace: "Consolas",
    fontSize: 10.4,
    color: C.white,
    margin: 0,
  });

  addMiniCard(slide, {
    x: 9.7,
    y: 2.76,
    w: 2.32,
    h: 1.14,
    title: "Vista",
    body: "A la izquierda aparece la página renderizada.",
    fill: C.white,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 9.7,
    y: 4.12,
    w: 2.32,
    h: 1.14,
    title: "Árbol",
    body: "A la derecha se ve el DOM desplegado en elementos.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });

  validateSlide(slide);
}

function createElementsPanelReadingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Qué conviene leer en la pestaña Elements",
    "No basta con ver el árbol: conviene saber qué señales técnicas leer cuando un nodo está seleccionado.",
    "Bloque 4"
  );

  const items = [
    {
      x: 1.02,
      y: 2.48,
      title: "Etiqueta",
      body: "Qué tipo de elemento fue interpretado.",
      fill: C.white,
      accent: C.red,
    },
    {
      x: 4.06,
      y: 2.48,
      title: "Atributos",
      body: "id, class, name, type y otros datos del nodo.",
      fill: C.softBlue,
      line: C.softBlue,
      accent: C.navy,
    },
    {
      x: 7.1,
      y: 2.48,
      title: "Jerarquía",
      body: "Qué contiene a qué y en qué nivel del árbol vive.",
      fill: C.paleRed,
      line: C.paleRed,
      accent: C.gold,
    },
    {
      x: 10.14,
      y: 2.48,
      title: "Estado",
      body: "Qué parte está seleccionada y qué cambios se reflejan.",
      fill: C.softNeutral,
      line: C.softNeutral,
      accent: C.navy,
    },
  ];

  items.forEach((item) => {
    addMiniCard(slide, {
      x: item.x,
      y: item.y,
      w: 2.2,
      h: 1.28,
      title: item.title,
      body: item.body,
      fill: item.fill,
      line: item.line || item.fill,
      accent: item.accent,
      titleFontSize: 14,
      bodyFontSize: 10.4,
    });
  });

  addCard(slide, {
    x: 2.08,
    y: 4.18,
    w: 9.18,
    h: 1.12,
    title: "Lectura técnica recomendada",
    body: "Cuando algo “se ve raro” en pantalla, Elements permite comprobar si el problema está en la estructura, en un atributo, en el anidamiento o después en los estilos.",
    fill: C.white,
    accent: C.red,
    titleFontSize: 17,
    bodyFontSize: 11.7,
  });

  validateSlide(slide);
}

function createInspectFormDomSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un formulario bien hecho también se inspecciona mejor",
    "La claridad estructural del HTML se vuelve visible cuando el árbol del DOM deja reconocer piezas concretas del formulario.",
    "Bloque 4"
  );

  slide.addShape(SH.roundRect, {
    x: 0.96,
    y: 2.34,
    w: 5.06,
    h: 3.34,
    rectRadius: 0.04,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("body\n└─ main\n   └─ section\n      └─ form\n         ├─ label[for=\"correo\"]\n         ├─ input#correo[type=\"email\"]\n         └─ button[type=\"submit\"]", {
    x: 1.32,
    y: 2.7,
    w: 4.12,
    h: 2.48,
    fontFace: "Consolas",
    fontSize: 11.8,
    color: C.navy,
    margin: 0,
  });

  addCard(slide, {
    x: 6.46,
    y: 2.48,
    w: 2.36,
    h: 1.08,
    title: "label",
    body: "Se puede ubicar junto a su control asociado.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
  });
  addCard(slide, {
    x: 9.12,
    y: 2.48,
    w: 2.36,
    h: 1.08,
    title: "input",
    body: "El id y el type ya se leen a simple vista.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addCard(slide, {
    x: 7.78,
    y: 3.92,
    w: 2.36,
    h: 1.08,
    title: "button",
    body: "La acción final también se reconoce como nodo.",
    fill: C.softNeutral,
    line: C.softNeutral,
    accent: C.gold,
  });

  validateSlide(slide);
}

function createInspectFormDomSlideV2() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un formulario bien hecho tambiÃ©n se inspecciona mejor",
    "La claridad estructural del HTML se vuelve visible cuando el Ã¡rbol del DOM deja reconocer piezas concretas del formulario.",
    "Bloque 4"
  );

  addDomTreePanel(slide, {
    x: 0.96,
    y: 2.34,
    w: 5.06,
    h: 3.34,
    title: "DOM del formulario",
    subtitle:
      "La jerarquía deja ver contexto, nodos y atributos útiles para inspección.",
    nodes: [
      { depth: 0, tag: "body", tone: "neutral" },
      { depth: 1, tag: "main", tone: "blue" },
      { depth: 2, tag: "section", tone: "neutral" },
      { depth: 3, tag: "form", tone: "red" },
      { depth: 4, tag: "label", detail: 'for=\"correo\"', tone: "red" },
      { depth: 4, tag: "input", detail: 'id=\"correo\" type=\"email\"', tone: "blue" },
      { depth: 4, tag: "button", detail: 'type=\"submit\"', tone: "gold" },
    ],
  });

  addCard(slide, {
    x: 6.46,
    y: 2.48,
    w: 2.36,
    h: 1.08,
    title: "label",
    body: "Se puede ubicar junto a su control asociado.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
  });
  addCard(slide, {
    x: 9.12,
    y: 2.48,
    w: 2.36,
    h: 1.08,
    title: "input",
    body: "El id y el type ya se leen a simple vista.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addCard(slide, {
    x: 7.78,
    y: 3.92,
    w: 2.36,
    h: 1.08,
    title: "button",
    body: "La acciÃ³n final tambiÃ©n se reconoce como nodo.",
    fill: C.softNeutral,
    line: C.softNeutral,
    accent: C.gold,
  });

  validateSlide(slide);
}

function createInspectFormDomSlideV3() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Un formulario bien hecho también se inspecciona mejor",
    "La claridad estructural del HTML se vuelve visible cuando el árbol del DOM deja reconocer piezas concretas del formulario.",
    "Bloque 4"
  );

  addDomTreePanel(slide, {
    x: 0.96,
    y: 2.34,
    w: 5.06,
    h: 3.34,
    title: "DOM del formulario",
    rowH: 0.25,
    rowGap: 0.09,
    indent: 0.3,
    nodes: [
      { depth: 0, tag: "body", tone: "neutral" },
      { depth: 1, tag: "main", tone: "blue" },
      { depth: 2, tag: "section", tone: "neutral" },
      { depth: 3, tag: "form", tone: "red" },
      { depth: 4, tag: "label", detail: 'for="correo"', tone: "red" },
      { depth: 4, tag: "input", detail: 'id="correo" type="email"', tone: "blue" },
      { depth: 4, tag: "button", detail: 'type="submit"', tone: "gold" },
    ],
  });

  addCard(slide, {
    x: 6.46,
    y: 2.48,
    w: 2.36,
    h: 1.08,
    title: "label",
    body: "Se puede ubicar junto a su control asociado.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.red,
  });
  addCard(slide, {
    x: 9.12,
    y: 2.48,
    w: 2.36,
    h: 1.08,
    title: "input",
    body: "El id y el type ya se leen a simple vista.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addCard(slide, {
    x: 7.78,
    y: 3.92,
    w: 2.36,
    h: 1.08,
    title: "button",
    body: "La acción final también se reconoce como nodo.",
    fill: C.softNeutral,
    line: C.softNeutral,
    accent: C.gold,
  });

  validateSlide(slide);
}

function createConsoleIntroSlide() {
  const slide = pptx.addSlide();
  setBackground(slide, C.paper);
  addTopRule(slide);
  addSlideNumber(slide);
  addMarkBox(slide);

  slide.addShape(SH.roundRect, {
    x: 0.92,
    y: 1.28,
    w: 4.14,
    h: 4.3,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  addBarsMotif(slide, 1.22, 1.62, 1.34, C.red);
  slide.addText("El DOM también se puede consultar desde consola", {
    x: 1.22,
    y: 2.42,
    w: 3.14,
    h: 1.12,
    fontFace: "Aptos Display",
    fontSize: 22,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText(
    "Todavía no estamos programando en profundidad, pero sí podemos instalar la idea de que el documento ya es explorable con consultas concretas.",
    {
      x: 1.22,
      y: 4.48,
      w: 3.2,
      h: 0.72,
      fontFace: "Aptos",
      fontSize: 12.2,
      color: C.sand,
      margin: 0,
    }
  );

  addTerminalPanel(slide, {
    x: 5.54,
    y: 1.8,
    w: 6.24,
    h: 3.32,
    title: "Console",
    lines: [
      { prompt: ">", text: "document", kind: "output" },
      { kind: "muted", text: "HTMLDocument https://app.local/contacto" },
      { prompt: ">", text: "document.querySelector(\"form\")", kind: "output" },
      { kind: "muted", text: "<form>...</form>" },
      { prompt: ">", text: "document.getElementById(\"correo\")", kind: "output" },
      { kind: "muted", text: "<input id=\"correo\" type=\"email\">" },
    ],
    fontSize: 11,
  });

  validateSlide(slide);
}

function createQuerySelectorSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "querySelector() busca la primera coincidencia",
    "Esta consulta permite ubicar un nodo usando la misma lógica de selectores que después veremos en CSS.",
    "Bloque 4"
  );

  addCodePanel(slide, {
    x: 0.96,
    y: 2.46,
    w: 5.16,
    h: 2.9,
    title: "Consulta básica",
    code:
      'const form = document.querySelector("form");\nconst correo = document.querySelector("#correo");\nconst boton = document.querySelector("button");',
    lang: "js",
    fontSize: 11.2,
  });

  addCard(slide, {
    x: 6.62,
    y: 2.52,
    w: 2.32,
    h: 1.12,
    title: "Primer match",
    body: "Devuelve el primer nodo que cumpla el selector.",
    fill: C.white,
    accent: C.red,
  });
  addCard(slide, {
    x: 9.18,
    y: 2.52,
    w: 2.32,
    h: 1.12,
    title: "Selector",
    body: "Acepta tag, id, clase o combinaciones más complejas.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addCard(slide, {
    x: 7.9,
    y: 4.0,
    w: 2.52,
    h: 1.02,
    title: "Utilidad",
    body: "Sirve para ubicar rápido una pieza del DOM.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
  });

  validateSlide(slide);
}

function createGetElementByIdSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "getElementById() apunta directo por identificador",
    "Cuando un nodo tiene id único, esta consulta es una ruta directa y muy legible para encontrarlo.",
    "Bloque 4"
  );

  addCenterStatement(slide, "document.getElementById(\"correo\")", {
    x: 1.24,
    y: 2.42,
    w: 6.2,
    h: 1.12,
    fill: C.warm,
    fontSize: 23,
  });

  addMiniCard(slide, {
    x: 1.44,
    y: 4.0,
    w: 1.82,
    h: 1.02,
    title: "document",
    body: "Punto de entrada al DOM cargado.",
    fill: C.white,
    accent: C.red,
  });
  addMiniCard(slide, {
    x: 3.5,
    y: 4.0,
    w: 1.82,
    h: 1.02,
    title: "id",
    body: "Busca un nodo por identificador exacto.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addMiniCard(slide, {
    x: 5.56,
    y: 4.0,
    w: 1.82,
    h: 1.02,
    title: "Resultado",
    body: "Devuelve el nodo o null si no existe.",
    fill: C.softNeutral,
    line: C.softNeutral,
    accent: C.gold,
  });

  addCodePanel(slide, {
    x: 8.04,
    y: 2.54,
    w: 3.66,
    h: 2.48,
    title: "Ejemplo",
    lang: "js",
    code:
      'const correo = document.getElementById("correo");\nconsole.log(correo);\n// <input id="correo" ...>',
    fontSize: 10.6,
  });

  validateSlide(slide);
}

function createQuerySelectorAllSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "querySelectorAll() devuelve una colección",
    "Cuando queremos mirar varios nodos del mismo tipo, esta consulta sirve más que una búsqueda individual.",
    "Bloque 4"
  );

  addCodePanel(slide, {
    x: 0.94,
    y: 2.42,
    w: 4.8,
    h: 2.9,
    title: "Consulta de varios nodos",
    lang: "js",
    code:
      'const campos = document.querySelectorAll("input");\nconsole.log(campos.length);\nconsole.log(campos);',
    fontSize: 11,
  });

  addTerminalPanel(slide, {
    x: 6.18,
    y: 2.5,
    w: 5.0,
    h: 2.76,
    title: "Resultado visible",
    lines: [
      { prompt: ">", text: "campos.length", kind: "output" },
      { kind: "muted", text: "2" },
      { prompt: ">", text: "campos", kind: "output" },
      { kind: "muted", text: "NodeList(2) [input#nombre, input#correo]" },
      { kind: "muted", text: "La colección se puede recorrer después." },
    ],
    fontSize: 10.8,
  });

  validateSlide(slide);
}

function createDomCollectionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Qué relaciones del DOM conviene reconocer temprano",
    "Aunque todavía no programemos eventos ni manipulación compleja, ya podemos instalar vocabulario de recorrido útil.",
    "Bloque 4"
  );

  const items = [
    { x: 0.98, title: "children", body: "Hijos directos de un nodo.", fill: C.white, accent: C.red },
    { x: 3.16, title: "parentElement", body: "Nodo que contiene al elemento.", fill: C.softBlue, accent: C.navy },
    { x: 5.34, title: "textContent", body: "Texto contenido en un nodo.", fill: C.paleRed, accent: C.gold },
    { x: 7.52, title: "value", body: "Valor actual de un control.", fill: C.softNeutral, accent: C.navy },
    { x: 9.7, title: "length", body: "Cantidad dentro de una colección.", fill: C.white, accent: C.red },
  ];

  items.forEach((item) => {
    addMiniCard(slide, {
      x: item.x,
      y: 2.9,
      w: 1.82,
      h: 1.22,
      title: item.title,
      body: item.body,
      fill: item.fill,
      line: item.fill,
      accent: item.accent,
      titleFontSize: 13.4,
      bodyFontSize: 10.1,
    });
  });

  addCard(slide, {
    x: 2.06,
    y: 4.56,
    w: 9.1,
    h: 0.94,
    title: "Idea útil",
    body: "Estas palabras vuelven más concreta la conversación técnica sobre un documento: ya no se habla de “cosas de la página”, sino de nodos, relaciones y propiedades.",
    fill: C.white,
    accent: C.red,
    titleFontSize: 16,
    bodyFontSize: 11.5,
  });

  validateSlide(slide);
}

function createReadValueSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El DOM también deja leer estado actual",
    "Una vez ubicado un control, el navegador permite revisar propiedades útiles como su valor o su contenido textual.",
    "Bloque 4"
  );

  addTerminalPanel(slide, {
    x: 0.92,
    y: 2.5,
    w: 5.32,
    h: 3.02,
    title: "Console",
    lines: [
      { prompt: ">", text: 'const correo = document.getElementById("correo")', kind: "output" },
      { prompt: ">", text: "correo.value", kind: "output" },
      { kind: "muted", text: "\"ana@email.com\"" },
      { prompt: ">", text: "correo.type", kind: "output" },
      { kind: "muted", text: "\"email\"" },
    ],
    fontSize: 10.6,
  });

  addCard(slide, {
    x: 6.78,
    y: 2.58,
    w: 2.24,
    h: 1.14,
    title: "value",
    body: "Lee lo que el usuario escribió en el campo.",
    fill: C.white,
    accent: C.red,
  });
  addCard(slide, {
    x: 9.32,
    y: 2.58,
    w: 2.24,
    h: 1.14,
    title: "type",
    body: "Revela qué clase de control fue definido.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
  });
  addCard(slide, {
    x: 7.98,
    y: 4.1,
    w: 2.44,
    h: 1.02,
    title: "Lectura",
    body: "No solo vemos nodos: también vemos estado actual.",
    fill: C.paleRed,
    line: C.paleRed,
    accent: C.gold,
  });

  validateSlide(slide);
}

function createDomDebuggingCaseSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El DOM ayuda a diagnosticar problemas estructurales",
    "Muchos errores aparentemente visuales en realidad comienzan en una mala estructura del documento.",
    "Bloque 4"
  );

  addCard(slide, {
    x: 0.94,
    y: 2.42,
    w: 5.16,
    h: 2.98,
    title: "Caso débil",
    body:
      "Dos inputs con el mismo id, un label sin conexión correcta y una estructura poco clara pueden volver ambiguo lo que se inspecciona.\n\nResultado: CSS apunta mal, DevTools confunde el recorrido y JavaScript puede tomar el nodo equivocado.",
    fill: C.white,
    accent: C.red,
    bodyFontSize: 12.2,
  });
  addCard(slide, {
    x: 6.62,
    y: 2.42,
    w: 5.16,
    h: 2.98,
    title: "Caso mejorado",
    body:
      "Si cada nodo tiene un rol claro, ids únicos y relaciones bien definidas, el árbol del DOM también se vuelve más confiable de leer y de usar.\n\nResultado: mejor inspección, selección más clara y menos debugging innecesario.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    bodyFontSize: 12.2,
  });

  validateSlide(slide);
}

function createWhyDomMattersSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "¿Por qué importa el DOM incluso antes de manipularlo?",
    "Entender esta capa ordena mejor lo que viene después en CSS, inspección, debugging y JavaScript.",
    "Bloque 4"
  );

  addCenterStatement(slide, "HTML claro → DOM legible → trabajo técnico más razonable", {
    x: 1.2,
    y: 2.5,
    w: 10.9,
    h: 1.02,
    fill: C.warm,
    fontSize: 22,
  });

  const items = [
    { x: 1.08, y: 4.1, title: "CSS", body: "Selecciona y estiliza mejor.", fill: C.white, accent: C.red },
    { x: 3.96, y: 4.1, title: "DevTools", body: "Permite ubicar problemas con menos fricción.", fill: C.softBlue, accent: C.navy },
    { x: 6.84, y: 4.1, title: "JavaScript", body: "Podrá recorrer y modificar con más precisión.", fill: C.paleRed, accent: C.gold },
    { x: 9.72, y: 4.1, title: "Mantenimiento", body: "El documento resiste mejor cambios futuros.", fill: C.softNeutral, accent: C.navy },
  ];

  items.forEach((item) => {
    addMiniCard(slide, {
      x: item.x,
      y: item.y,
      w: 2.18,
      h: 1.2,
      title: item.title,
      body: item.body,
      fill: item.fill,
      line: item.fill,
      accent: item.accent,
      titleFontSize: 14,
      bodyFontSize: 10.2,
    });
  });

  validateSlide(slide);
}

function createBlock4BridgeSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "HTML, DOM, CSS y JavaScript no viven separados",
    "El cierre de esta semana deja lista la base estructural sobre la que se apoyarán los próximos contenidos.",
    "Bloque 4"
  );

  const items = [
    { x: 1.0, title: "HTML", body: "Define estructura y significado.", fill: C.white, accent: C.red },
    { x: 3.7, title: "DOM", body: "Expone esa estructura dentro del navegador.", fill: C.softBlue, accent: C.navy },
    { x: 6.4, title: "CSS", body: "Apunta y estiliza partes del documento.", fill: C.paleRed, accent: C.gold },
    { x: 9.1, title: "JS", body: "Consulta, reacciona y después modifica.", fill: C.softNeutral, accent: C.navy },
  ];

  items.forEach((item, index) => {
    addCard(slide, {
      x: item.x,
      y: 3.0,
      w: 1.96,
      h: 1.54,
      title: item.title,
      body: item.body,
      fill: item.fill,
      line: item.fill,
      accent: item.accent,
      titleFontSize: 17,
      bodyFontSize: 10.6,
    });
    if (index < items.length - 1) {
      addChevron(slide, item.x + 2.08, 3.58, 0.32, 0.24, C.red);
    }
  });

  addCard(slide, {
    x: 2.12,
    y: 4.96,
    w: 9.06,
    h: 0.88,
    title: "Lectura de módulo",
    body: "Lo que hoy se instala como estructura y DOM será la base de la semana 2 cuando entremos a CSS moderno y, más adelante, a manipulación del documento.",
    fill: C.white,
    accent: C.red,
    titleFontSize: 16,
    bodyFontSize: 11.4,
  });

  validateSlide(slide);
}

function createBlock4QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas guía del bloque",
    "Estas preguntas ayudan a revisar si el DOM ya se está entendiendo como estructura técnica y no solo como palabra nueva.",
    "Bloque 4"
  );

  const questions = [
    {
      x: 0.94,
      y: 2.44,
      title: "Pregunta 1",
      body: "¿Qué cambia entre el HTML escrito en el archivo y el DOM que interpreta el navegador?",
      fill: C.white,
      accent: C.red,
    },
    {
      x: 6.74,
      y: 2.44,
      title: "Pregunta 2",
      body: "¿Por qué una estructura semántica clara también facilita la lectura en DevTools?",
      fill: C.softBlue,
      line: C.softBlue,
      accent: C.navy,
    },
    {
      x: 2.2,
      y: 4.14,
      title: "Pregunta 3",
      body: "¿Qué diferencia existe entre buscar un nodo con querySelector() y hacerlo con getElementById()?",
      fill: C.paleRed,
      line: C.paleRed,
      accent: C.gold,
    },
    {
      x: 8.0,
      y: 4.14,
      title: "Pregunta 4",
      body: "¿Por qué conviene entender el DOM antes de llegar a modificarlo con JavaScript?",
      fill: C.white,
      accent: C.red,
    },
  ];

  questions.forEach((q) => {
    addCard(slide, {
      x: q.x,
      y: q.y,
      w: 3.18,
      h: 1.3,
      title: q.title,
      body: q.body,
      fill: q.fill,
      line: q.line || q.fill || C.border,
      accent: q.accent,
      titleFontSize: 16,
      bodyFontSize: 11.2,
    });
  });

  validateSlide(slide);
}

function createBlock4ClosingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cierre del bloque y de la clase",
    "La semana termina dejando una idea fuerte: la estructura del HTML importa también por cómo el navegador la vuelve operable.",
    "Bloque 4"
  );

  slide.addShape(SH.roundRect, {
    x: 0.98,
    y: 2.44,
    w: 6.86,
    h: 2.86,
    rectRadius: 0.04,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText(
    "Un documento HTML bien construido no solo se ve más ordenado: también produce un DOM más legible, más fácil de inspeccionar y más razonable de usar en CSS y JavaScript.",
    {
      x: 1.38,
      y: 2.84,
      w: 5.98,
      h: 1.24,
      fontFace: "Aptos Display",
      fontSize: 19,
      bold: true,
      color: C.navy,
      margin: 0,
    }
  );

  addPill(slide, "estructura", {
    x: 1.38,
    y: 4.66,
    w: 1.16,
    h: 0.3,
    fill: C.paleRed,
    line: C.paleRed,
    color: C.red,
  });
  addPill(slide, "DOM", {
    x: 2.72,
    y: 4.66,
    w: 0.88,
    h: 0.3,
    fill: C.softBlue,
    line: C.softBlue,
    color: C.navy,
  });
  addPill(slide, "inspección", {
    x: 3.78,
    y: 4.66,
    w: 1.18,
    h: 0.3,
    fill: C.softNeutral,
    line: C.softNeutral,
    color: C.navy,
  });
  addPill(slide, "consulta", {
    x: 5.14,
    y: 4.66,
    w: 1.04,
    h: 0.3,
    fill: C.white,
    line: C.border,
    color: C.red,
  });

  addCard(slide, {
    x: 8.4,
    y: 2.44,
    w: 3.68,
    h: 2.86,
    title: "Próxima clase",
    body:
      "La semana 2 abrirá con CSS moderno. Esa parte tendrá mucho más sentido porque ya quedó claro qué estructura estamos intentando estilizar y por qué conviene que sea legible.",
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    titleFontSize: 19,
    bodyFontSize: 12.6,
  });

  validateSlide(slide);
}

async function main() {
  createCoverSlide();
  createMapSlide();
  createBlockIntroSlide();
  createNotOnlyVisibleSlide();
  createActorsSlide();
  createFlowSlide();
  createSurfaceVsStructureSlide();
  createHtmlMeaningSlide();
  createImprovisationSlide();
  createFrictionSlide();
  createThreeBenefitsSlide();
  createCaseSlide();
  createQuestionsSlide();
  createClosingSlide();
  createBlock2IntroSlide();
  createHtmlSkeletonSlide();
  createLineByLineSlide();
  createHeadVsBodySlide();
  createHeadContentsSlide();
  createDocumentTreeSlide();
  createBodyHierarchySlide();
  createSemanticBodyCodeSlide();
  createRolesSlide();
  createDivVsSemanticBlock2Slide();
  createDevToolsReadabilitySlide();
  createBlock2QuestionsSlide();
  createBlock2ClosingSlide();
  createBlock3IntroSlide();
  createFormsStructureSlide();
  createBasicFormAnatomySlide();
  createAttributeFlowSlide();
  createFieldTypesSlide();
  createLoginFormCodeSlide();
  createBadFormSlide();
  createGoodVsBadFormSlide();
  createGroupingSlide();
  createFieldsetCodeSlide();
  createBlock3QuestionsSlide();
  createBlock3ClosingSlide();
  createBlock4IntroSlide();
  createHtmlToDomStatementSlide();
  createDomPipelineSlide();
  createSourceVsDomSlide();
  createDomRelationshipsSlide();
  createNodeAnatomySlide();
  createSemanticDomReadabilitySlide();
  createDevToolsIntroSlide();
  createElementsPanelReadingSlide();
  createInspectFormDomSlideV3();
  createConsoleIntroSlide();
  createQuerySelectorSlide();
  createGetElementByIdSlide();
  createQuerySelectorAllSlide();
  createDomCollectionsSlide();
  createReadValueSlide();
  createDomDebuggingCaseSlide();
  createWhyDomMattersSlide();
  createBlock4BridgeSlide();
  createBlock4QuestionsSlide();
  createBlock4ClosingSlide();

  await pptx.writeFile({ fileName: outputPptx });
  fs.copyFileSync(__filename, outputJs);
  console.log(`Deck generado: ${outputPptx}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
