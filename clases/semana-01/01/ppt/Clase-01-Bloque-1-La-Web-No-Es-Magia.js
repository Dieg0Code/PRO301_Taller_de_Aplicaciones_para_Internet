const fs = require("fs");
const path = require("path");
const PptxGenJS = require("pptxgenjs");
const { imageSizingContain } = require("../../../../../tools/slides-system/vendor/pptxgenjs_helpers/image");
const { applyAiepTheme, TOKENS, TYPOGRAPHY } = require("../../../../../tools/slides-system/theme/aiep-theme");
const {
  addTopRule,
  addSlideNumber,
  addMarkBox,
  addChip: systemAddChip,
  addCard: systemAddCard,
  addMiniCard,
  addCenterStatement,
  addPill,
} = require("../../../../../tools/slides-system/components/primitives");
const {
  addUrlBreakdown,
  addMythRealityGrid,
  addActorLane,
  addStageChain,
} = require("../../../../../tools/slides-system/components/foundation-panels");
const {
  addExposureCompare,
  addChecklistGrid,
  addAuthFlow,
} = require("../../../../../tools/slides-system/components/security-panels");
const { validateSlide: systemValidateSlide } = require("../../../../../tools/slides-system/utils/validation");

const pptx = new PptxGenJS();
applyAiepTheme(pptx, {
  author: "Codex",
  company: "AIEP",
  subject: "Clase 01 - Bloques 1 a 4",
  title: "La Web No Es Magia",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const logoPath = path.resolve(
  __dirname,
  "../../../../../.agent/skills/slides-aiep/assets/logo-aiep.png"
);
const logoMarkPath = path.resolve(
  __dirname,
  "../../../../../.agent/skills/slides-aiep/assets/logo-aiep-mark.png"
);

const C = {
  paper: TOKENS.paper,
  white: TOKENS.white,
  navy: TOKENS.navy,
  ink: TOKENS.ink,
  slate: TOKENS.slate,
  sand: TOKENS.sand,
  coral: TOKENS.red,
  orange: TOKENS.gold,
  teal: TOKENS.titleFill,
  mint: TOKENS.softBlue,
  gold: TOKENS.gold,
  border: TOKENS.border,
  red: TOKENS.red,
  softBlue: TOKENS.softBlue,
  softNeutral: TOKENS.softNeutral,
  paleRed: TOKENS.paleRed,
  warm: TOKENS.warm,
  mist: TOKENS.mist,
  guide: TOKENS.guide,
};

function validateSlide(slide) {
  systemValidateSlide(slide, pptx);
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

function addSoftNumber(slide, n) {
  addSlideNumber(slide, pptx, {
    x: 10.2,
    y: 0.28,
    w: 0.86,
    h: 0.62,
    fontSize: 24,
    color: C.sand,
  });
}

function addChip(slide, text, x, y, w, fill = C.red, color = C.white) {
  systemAddChip(slide, SH, text, {
    x,
    y,
    w,
    fill,
    color,
    h: 0.34,
    rectRadius: 0.05,
    fontSize: 9.4,
  });
}

function addTitle(slide, title, subtitle, step, blockLabel = "Bloque 1") {
  slide.background = { color: C.paper };
  addTopRule(slide, SH, C.navy);
  addSoftNumber(slide, step);
  addChip(slide, `Clase 01 · ${blockLabel}`, 0.72, 0.48, 1.95, chipFill, chipColor);
  slide.addText(title, {
    x: 0.72,
    y: 1.0,
    w: 7.8,
    h: 0.72,
    fontFace: "Aptos Display",
    fontSize: 24,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.75,
      y: 1.8,
      w: 8.2,
      h: 0.36,
      fontFace: "Aptos",
      fontSize: 12,
      color: C.slate,
      margin: 0,
    });
  }
}

function addSimpleTitle(slide, title, subtitle, blockLabel = "Bloque 1", chipFill = C.teal, chipColor = C.white) {
  addChip(slide, `Clase 01 · ${blockLabel}`, 0.72, 0.48, 1.95, chipFill, chipColor);
  slide.addText(title, {
    x: 0.72,
    y: 1.0,
    w: 7.9,
    h: 0.74,
    fontFace: "Aptos Display",
    fontSize: 24,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.75,
      y: 1.82,
      w: 8.4,
      h: 0.36,
      fontFace: "Aptos",
      fontSize: 12,
      color: C.slate,
      margin: 0,
    });
  }
}

function addCard(slide, opts) {
  const {
    x,
    y,
    w,
    h,
    fill = C.white,
    line = C.border,
    title,
    body,
    titleColor = C.navy,
    bodyColor = C.ink,
    accent = null,
    bodyFontSize = 16,
    titleFontSize = 16,
    align = "left",
    titleTop = 0.22,
    titleHeight = 0.32,
    bodyTop = 0.62,
    bottomPadding = 0.22,
  } = opts;

  slide.addShape(SH.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.06,
    fill: { color: fill },
    line: { color: line, pt: 1 },
  });

  if (accent) {
    slide.addShape(SH.rect, {
      x: x + 0.16,
      y: y + 0.16,
      w: 0.22,
      h: h - 0.32,
      fill: { color: accent },
      line: { color: accent },
    });
  }

  slide.addText(title, {
    x: x + (accent ? 0.54 : 0.28),
    y: y + titleTop,
    w: w - (accent ? 0.74 : 0.52),
    h: titleHeight,
    fontFace: "Aptos Display",
    fontSize: titleFontSize,
    bold: true,
    color: titleColor,
    margin: 0,
    align,
  });

  slide.addText(body, {
    x: x + (accent ? 0.54 : 0.28),
    y: y + bodyTop,
    w: w - (accent ? 0.78 : 0.56),
    h: h - bodyTop - bottomPadding,
    fontFace: "Aptos",
    fontSize: bodyFontSize,
    color: bodyColor,
    margin: 0,
    valign: "top",
    breakLine: false,
    align,
  });
}

function addQuestionCard(slide, opts) {
  addCard(slide, {
    titleFontSize: 14,
    bodyFontSize: 12,
    titleTop: 0.16,
    titleHeight: 0.24,
    bodyTop: 0.48,
    bottomPadding: 0.12,
    ...opts,
  });
}

function addFooter(slide, text) {
  slide.addText(text, {
    x: 0.75,
    y: 6.92,
    w: 6.6,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 10,
    color: C.slate,
    margin: 0,
  });
}

function addChip(slide, text, x, y, w, fill = C.red, color = C.white) {
  systemAddChip(slide, SH, text, {
    x,
    y,
    w,
    fill,
    color,
    h: 0.34,
    rectRadius: 0.05,
    fontSize: 9.4,
  });
}

function addTitle(slide, title, subtitle, step, blockLabel = "Bloque 1") {
  slide.background = { color: C.paper };
  addTopRule(slide, SH, C.navy);
  addSoftNumber(slide, step);
  addChip(slide, `Clase 01 · ${blockLabel}`, 0.72, 0.52, 2.06, C.red, C.white);
  addMarkBox(slide, SH, logoMarkPath, {
    x: 11.18,
    y: 0.96,
    w: 0.94,
    h: 0.74,
    fill: C.softNeutral,
    imageX: 11.36,
    imageY: 1.13,
    imageW: 0.56,
    imageH: 0.3,
  });
  slide.addText(title, {
    x: 0.72,
    y: 0.98,
    w: 8.95,
    h: 0.72,
    fontFace: TYPOGRAPHY.display,
    fontSize: 23.6,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.74,
      y: 1.78,
      w: 8.7,
      h: 0.26,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.6,
      color: C.slate,
      margin: 0,
    });
  }
}

function addSimpleTitle(slide, title, subtitle, blockLabel = "Bloque 1") {
  addTitle(slide, title, subtitle, pptx._slides.length + 1, blockLabel);
}

function addCard(slide, opts) {
  const accent = opts.accent || opts.line || C.red;
  const fill = opts.fill || C.white;
  const line = opts.line || C.border;
  const titleTop = opts.titleTop ?? 0.14;
  const titleHeight = opts.titleHeight ?? 0.28;
  const bodyTop = opts.bodyTop ?? 0.5;
  const bottomPadding = opts.bottomPadding ?? 0.14;
  const titleX = opts.x + 0.28;
  const bodyX = opts.x + 0.28;
  const textW = opts.w - 0.4;

  slide.addShape(SH.roundRect, {
    x: opts.x,
    y: opts.y,
    w: opts.w,
    h: opts.h,
    rectRadius: opts.rectRadius || 0.04,
    fill: { color: fill },
    line: { color: line, pt: 1 },
  });
  slide.addShape(SH.rect, {
    x: opts.x + 0.1,
    y: opts.y + 0.14,
    w: opts.accentW || 0.12,
    h: opts.h - 0.28,
    fill: { color: accent },
    line: { color: accent },
  });
  slide.addText(opts.title || "", {
    x: titleX,
    y: opts.y + titleTop,
    w: textW,
    h: titleHeight,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.titleFontSize || 16,
    bold: true,
    color: opts.titleColor || C.navy,
    margin: 0,
    align: opts.align || "left",
  });
  if (opts.body) {
    slide.addText(opts.body, {
      x: bodyX,
      y: opts.y + bodyTop,
      w: textW,
      h: opts.h - bodyTop - bottomPadding,
      fontFace: TYPOGRAPHY.body,
      fontSize: opts.bodyFontSize || 12.8,
      color: opts.bodyColor || C.ink,
      margin: 0,
      valign: "top",
      breakLine: false,
      align: opts.bodyAlign || opts.align || "left",
    });
  }
}

function addQuestionCard(slide, opts) {
  addCard(slide, {
    titleFontSize: opts.titleFontSize || 13.2,
    bodyFontSize: opts.bodyFontSize || 10.6,
    titleTop: 0.14,
    titleHeight: 0.22,
    bodyTop: 0.42,
    bottomPadding: 0.12,
    ...opts,
  });
}

function addFooter(slide, text) {
  slide.addText(text, {
    x: 0.75,
    y: 6.92,
    w: 7.0,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    color: C.slate,
    margin: 0,
  });
}

function createTitleSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };

  slide.addShape(SH.ellipse, {
    x: 10.25,
    y: 0.18,
    w: 2.7,
    h: 2.7,
    fill: { color: C.coral },
    line: { color: C.coral },
  });
  slide.addShape(SH.rect, {
    x: 0,
    y: 5.95,
    w: 13.333,
    h: 1.55,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addShape(SH.rect, {
    x: 0.74,
    y: 1.1,
    w: 1.15,
    h: 0.12,
    fill: { color: C.teal },
    line: { color: C.teal },
  });

  addChip(slide, "Semana 01", 0.74, 0.48, 1.05, C.teal);
  addChip(slide, "Clase 01", 1.92, 0.48, 1.0, C.orange, C.navy);

  slide.addText("La Web No Es Magia", {
    x: 0.74,
    y: 1.42,
    w: 6.4,
    h: 0.88,
    fontFace: "Aptos Display",
    fontSize: 28,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  slide.addText("¿Cómo funciona Internet?", {
    x: 0.76,
    y: 2.36,
    w: 4.8,
    h: 0.42,
    fontFace: "Aptos",
    fontSize: 18,
    color: C.coral,
    bold: true,
    margin: 0,
  });

  slide.addText(
    "Bloques 1, 2, 3 y 4 · construimos el mapa mental inicial de la Web, revisamos cómo se comunican sus actores, entendemos cómo una aplicación llega a Internet y cerramos con seguridad básica.",
    {
      x: 0.76,
      y: 3.0,
      w: 6.2,
      h: 0.95,
      fontFace: "Aptos",
      fontSize: 16,
      color: C.ink,
      margin: 0,
      valign: "mid",
    }
  );

  slide.addText("Material construido con el contenido actual de los Bloques 1, 2, 3 y 4", {
    x: 0.86,
    y: 6.3,
    w: 4.9,
    h: 0.3,
    fontFace: "Aptos",
    fontSize: 11,
    color: C.white,
    margin: 0,
  });

  slide.addText("PRO301 · Taller de Aplicaciones para Internet", {
    x: 0.86,
    y: 6.63,
    w: 4.6,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 10,
    color: "D9E2EC",
    margin: 0,
  });

  validateSlide(slide);
}

function createBlock1IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };

  slide.addShape(SH.ellipse, {
    x: 10.35,
    y: 0.28,
    w: 2.2,
    h: 2.2,
    fill: { color: C.teal, transparency: 8 },
    line: { color: C.teal, transparency: 100 },
  });

  addChip(slide, "Bloque 1", 0.82, 0.62, 1.08, C.teal);
  slide.addText("La Web no es magia", {
    x: 0.82,
    y: 1.34,
    w: 6.0,
    h: 0.7,
    fontFace: "Aptos Display",
    fontSize: 27,
    bold: true,
    color: C.white,
    margin: 0,
  });

  slide.addText("Abrimos la clase construyendo un mapa mental inicial: qué pasa cuando usamos una URL, qué diferencia hay entre Internet y Web, y qué actores hacen posible una interacción web.", {
    x: 0.84,
    y: 2.26,
    w: 6.5,
    h: 0.92,
    fontFace: "Aptos",
    fontSize: 16,
    color: "E0E7FF",
    margin: 0,
  });

  addCard(slide, {
    x: 0.96,
    y: 3.58,
    w: 2.65,
    h: 1.3,
    fill: C.white,
    line: C.white,
    accent: C.coral,
    title: "URL",
    body: "Una acción cotidiana que en realidad activa varias capas técnicas.",
    bodyFontSize: 14,
  });

  addCard(slide, {
    x: 3.95,
    y: 3.58,
    w: 2.65,
    h: 1.3,
    fill: C.white,
    line: C.white,
    accent: C.gold,
    title: "Internet vs Web",
    body: "Dos conceptos cercanos, pero no equivalentes.",
    bodyFontSize: 14,
  });

  addCard(slide, {
    x: 6.95,
    y: 3.58,
    w: 2.45,
    h: 1.3,
    fill: C.white,
    line: C.white,
    accent: C.teal,
    title: "Actores",
    body: "Usuario, navegador, cliente, servidor y aplicación.",
    bodyFontSize: 14,
  });

  addCard(slide, {
    x: 9.7,
    y: 3.58,
    w: 2.2,
    h: 1.3,
    fill: C.white,
    line: C.white,
    accent: C.orange,
    title: "Base del curso",
    body: "Cliente-servidor como estructura inicial.",
    bodyFontSize: 14,
  });

  slide.addText("La meta del bloque es que abrir una página deje de verse como algo automático y pase a entenderse como un proceso técnico concreto.", {
    x: 0.86,
    y: 5.6,
    w: 9.15,
    h: 0.72,
    fontFace: "Aptos",
    fontSize: 15,
    color: C.gold,
    margin: 0,
  });

  validateSlide(slide);
}

function createWhyFoundationsMatterSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(slide, "¿Por qué seguimos estudiando estos fundamentos?", "Incluso en una época de agentes, entender la Web sigue siendo una ventaja técnica real.");

  slide.addShape(SH.roundRect, {
    x: 0.82,
    y: 2.32,
    w: 4.2,
    h: 3.7,
    rectRadius: 0.08,
    fill: { color: C.navy },
    line: { color: C.navy },
  });

  slide.addText("Hoy podemos programar más rápido, pero no pensar menos.", {
    x: 1.1,
    y: 2.86,
    w: 3.45,
    h: 1.2,
    fontFace: "Aptos Display",
    fontSize: 20,
    bold: true,
    color: C.white,
    margin: 0,
    valign: "mid",
  });

  slide.addText("Si entiendes cómo funciona la Web, puedes diagnosticar mejor, pedir mejor a un agente, detectar errores y tomar decisiones con más criterio.", {
    x: 1.12,
    y: 4.52,
    w: 3.34,
    h: 0.92,
    fontFace: "Aptos",
    fontSize: 14,
    color: "E0E7FF",
    margin: 0,
  });

  addCard(slide, {
    x: 5.36,
    y: 2.34,
    w: 2.95,
    h: 1.7,
    fill: C.white,
    accent: C.coral,
    title: "Sirve para pedir mejor",
    body: "Un agente responde mejor cuando las preguntas y restricciones técnicas son claras.",
    bodyFontSize: 14,
  });

  addCard(slide, {
    x: 8.65,
    y: 2.34,
    w: 2.95,
    h: 1.7,
    fill: C.white,
    accent: C.teal,
    title: "Sirve para detectar errores",
    body: "Cuando algo falla, necesitas ubicar si el problema está en cliente, red, DNS o servidor.",
    bodyFontSize: 14,
  });

  addCard(slide, {
    x: 5.36,
    y: 4.34,
    w: 6.24,
    h: 1.68,
    fill: "FFF7E8",
    line: C.orange,
    accent: C.gold,
    title: "Idea profesional",
    body: "Las herramientas cambian, pero la lógica sigue siendo la misma: entender el sistema, formular mejor la intención y recién después apoyarse en un agente con criterio.",
    bodyFontSize: 14,
  });

  addFooter(slide, "Bloque 1 · Fundamentos que siguen importando");
  validateSlide(slide);
}

function createEverydayWebSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(slide, "Acciones cotidianas que ya dependen de la Web", "Antes de hablar de arquitectura, conviene reconocer cuántas interacciones usamos todos los días.");

  const actions = [
    { x: 0.82, y: 2.34, accent: C.coral, title: "Abrir una página", body: "Leer noticias, mirar contenido o entrar a una plataforma." },
    { x: 4.08, y: 2.34, accent: C.teal, title: "Iniciar sesión", body: "Enviar credenciales para acceder a una cuenta." },
    { x: 7.34, y: 2.34, accent: C.gold, title: "Enviar un formulario", body: "Registrar datos, buscar o completar un trámite." },
    { x: 0.82, y: 4.28, accent: C.orange, title: "Reproducir un video", body: "Solicitar contenido y recibirlo en tiempo real." },
    { x: 4.08, y: 4.28, accent: C.coral, title: "Buscar información", body: "Pedir un recurso y recibir una respuesta filtrada." },
    { x: 7.34, y: 4.28, accent: C.teal, title: "Usar una app", body: "Interactuar con múltiples solicitudes invisibles para el usuario." },
  ];

  actions.forEach((item) =>
    addCard(slide, {
      x: item.x,
      y: item.y,
      w: 2.95,
      h: 1.5,
      fill: C.white,
      accent: item.accent,
      title: item.title,
      body: item.body,
      bodyFontSize: 13,
      titleFontSize: 14,
      bodyTop: 0.54,
    })
  );

  slide.addShape(SH.roundRect, {
    x: 2.08,
    y: 6.06,
    w: 9.2,
    h: 0.48,
    rectRadius: 0.04,
    fill: { color: C.mint },
    line: { color: C.teal, pt: 1 },
  });
  slide.addText("Aunque la experiencia cambia, detrás de todas estas acciones reaparece la misma lógica básica de comunicación.", {
    x: 2.4,
    y: 6.2,
    w: 8.55,
    h: 0.14,
    fontFace: "Aptos",
    fontSize: 12,
    bold: true,
    color: C.ink,
    margin: 0,
    align: "center",
  });

  addFooter(slide, "Bloque 1 · La Web ya organiza muchas acciones cotidianas");
  validateSlide(slide);
}

function createUrlAnatomySlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(slide, "Leer una URL también es una habilidad técnica", "No es necesario memorizar todo hoy, pero sí reconocer qué partes aparecen en una dirección web.");

  slide.addShape(SH.roundRect, {
    x: 1.0,
    y: 2.42,
    w: 11.1,
    h: 0.92,
    rectRadius: 0.05,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("https://campus.example.com/cursos?id=3", {
    x: 1.38,
    y: 2.67,
    w: 10.35,
    h: 0.22,
    fontFace: "Consolas",
    fontSize: 20,
    bold: true,
    color: C.white,
    margin: 0,
    align: "center",
  });

  const parts = [
    { x: 0.9, y: 4.0, w: 2.1, accent: C.coral, title: "https", body: "Protocolo o esquema de acceso." },
    { x: 3.25, y: 4.0, w: 3.35, accent: C.teal, title: "campus.example.com", body: "Nombre del sitio o dominio que queremos alcanzar." },
    { x: 7.0, y: 4.0, w: 2.1, accent: C.gold, title: "/cursos", body: "Ruta o recurso solicitado dentro del sitio." },
    { x: 9.6, y: 4.0, w: 2.15, accent: C.orange, title: "?id=3", body: "Parámetro o dato adicional enviado en la URL." },
  ];

  parts.forEach((part) =>
    addCard(slide, {
      x: part.x,
      y: part.y,
      w: part.w,
      h: 1.6,
      fill: C.white,
      accent: part.accent,
      title: part.title,
      body: part.body,
      bodyFontSize: 13,
      titleFontSize: 13,
      bodyTop: 0.54,
    })
  );

  addFooter(slide, "Bloque 1 · Primer vistazo a la anatomía de una URL");
  validateSlide(slide);
}

function createInternetServicesSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(slide, "La Web es un servicio sobre Internet, no todo Internet", "Separar estos conceptos evita errores que luego se arrastran durante todo el módulo.");

  addCard(slide, {
    x: 0.82,
    y: 2.3,
    w: 3.7,
    h: 3.6,
    fill: C.navy,
    line: C.navy,
    accent: C.gold,
    title: "Internet",
    titleColor: C.white,
    bodyColor: C.white,
    body: "Es la infraestructura global que permite conectar dispositivos y transportar información.\n\nSobre esa base pueden funcionar distintos servicios, no solo páginas web.",
    bodyFontSize: 15,
    bodyTop: 0.58,
  });

  const services = [
    { x: 5.0, y: 2.34, accent: C.coral, title: "Web", body: "Sitios, aplicaciones y recursos que vemos en el navegador." },
    { x: 8.35, y: 2.34, accent: C.teal, title: "Correo", body: "Mensajes enviados mediante servicios de email." },
    { x: 5.0, y: 4.24, accent: C.orange, title: "Videollamadas", body: "Comunicación audiovisual sobre la red." },
    { x: 8.35, y: 4.24, accent: C.gold, title: "Transferencia de archivos", body: "Mover documentos o recursos entre sistemas conectados." },
  ];

  services.forEach((service) =>
    addCard(slide, {
      x: service.x,
      y: service.y,
      w: 3.05,
      h: 1.48,
      fill: C.white,
      accent: service.accent,
      title: service.title,
      body: service.body,
      bodyFontSize: 13,
      titleFontSize: 14,
      bodyTop: 0.54,
    })
  );

  addFooter(slide, "Bloque 1 · Otros servicios que también viven sobre Internet");
  validateSlide(slide);
}

function createMisconceptionsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(slide, "Confusiones comunes que conviene corregir desde el inicio", "Muchas dudas técnicas posteriores nacen de estas simplificaciones iniciales.");

  const myths = [
    { x: 0.82, y: 2.34, w: 2.95, accent: C.coral, title: '"Internet = Web"', body: "No. La Web es uno de los servicios que funciona sobre Internet." },
    { x: 4.08, y: 2.34, w: 2.95, accent: C.teal, title: '"Navegador = Internet"', body: "No. El navegador es una herramienta para acceder e interpretar recursos web." },
    { x: 7.34, y: 2.34, w: 2.95, accent: C.gold, title: '"Abrir una página es instantáneo"', body: "No. Detrás hay consultas, solicitudes y respuestas que ocurren muy rápido." },
    { x: 2.46, y: 4.32, w: 3.6, accent: C.orange, title: '"Dominio, sitio y servidor son lo mismo"', body: "No. Son piezas distintas que luego veremos con más detalle." },
    { x: 6.16, y: 4.32, w: 3.6, accent: C.coral, title: '"Si algo carga, entonces está bien"', body: "No. Un sistema puede funcionar en apariencia y aun así estar mal diseñado o mal publicado." },
  ];

  myths.forEach((myth) =>
    addCard(slide, {
      x: myth.x,
      y: myth.y,
      w: myth.w,
      h: 1.56,
      fill: C.white,
      accent: myth.accent,
      title: myth.title,
      body: myth.body,
      bodyFontSize: 13,
      titleFontSize: 14,
      bodyTop: 0.54,
    })
  );

  addFooter(slide, "Bloque 1 · Corregir estas ideas mejora todo el resto del curso");
  validateSlide(slide);
}

function createBrowserClientSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(slide, "Navegador y cliente: cercanos, pero no idénticos", "En la práctica suelen ir juntos, pero conviene distinguir su función desde el principio.");

  addCard(slide, {
    x: 0.92,
    y: 2.36,
    w: 4.0,
    h: 3.5,
    fill: C.white,
    accent: C.teal,
    title: "Navegador",
    body: "Es la herramienta que usamos para acceder a la Web.\n\nInterpreta HTML, CSS y JavaScript.\nMuestra contenido.\nPermite escribir URLs, hacer clic y enviar formularios.",
    bodyFontSize: 15,
    bodyTop: 0.58,
  });

  addCard(slide, {
    x: 5.22,
    y: 2.36,
    w: 4.0,
    h: 3.5,
    fill: C.white,
    accent: C.coral,
    title: "Cliente",
    body: "Es el lado que realiza la solicitud dentro de una arquitectura cliente-servidor.\n\nMuchas veces el navegador actúa como cliente, pero el concepto apunta al rol que cumple.",
    bodyFontSize: 15,
    bodyTop: 0.58,
  });

  slide.addShape(SH.roundRect, {
    x: 9.58,
    y: 2.36,
    w: 2.35,
    h: 3.5,
    rectRadius: 0.06,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Idea clave", {
    x: 9.86,
    y: 2.58,
    w: 1.35,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 11,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  slide.addText('El navegador suele ser el cliente, pero "cliente" nombra una función dentro del sistema.', {
    x: 9.84,
    y: 3.0,
    w: 1.62,
    h: 1.5,
    fontFace: "Aptos Display",
    fontSize: 16,
    bold: true,
    color: C.white,
    margin: 0,
  });

  addFooter(slide, "Bloque 1 · Herramienta visible y rol técnico");
  validateSlide(slide);
}

function createServerRoleSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(slide, "¿Qué hace realmente el servidor?", "Todavía sin entrar a detalles avanzados, basta con reconocer su rol general dentro del recorrido.");

  slide.addShape(SH.roundRect, {
    x: 0.92,
    y: 2.42,
    w: 10.45,
    h: 1.0,
    rectRadius: 0.05,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Recibe solicitudes -> procesa información -> devuelve respuestas", {
    x: 1.28,
    y: 2.72,
    w: 9.7,
    h: 0.2,
    fontFace: "Aptos Display",
    fontSize: 20,
    bold: true,
    color: C.white,
    margin: 0,
    align: "center",
  });

  const tasks = [
    { x: 1.05, y: 4.0, accent: C.coral, title: "Entregar recursos", body: "Puede devolver páginas, imágenes, archivos o datos." },
    { x: 4.26, y: 4.0, accent: C.teal, title: "Procesar acciones", body: "Puede validar formularios o ejecutar lógica de negocio." },
    { x: 7.47, y: 4.0, accent: C.gold, title: "Responder según la solicitud", body: "No siempre devuelve lo mismo: depende de lo que el cliente pida." },
  ];

  tasks.forEach((task) =>
    addCard(slide, {
      x: task.x,
      y: task.y,
      w: 2.85,
      h: 1.62,
      fill: C.white,
      accent: task.accent,
      title: task.title,
      body: task.body,
      bodyFontSize: 13,
      titleFontSize: 14,
      bodyTop: 0.54,
    })
  );

  slide.addShape(SH.roundRect, {
    x: 1.28,
    y: 6.02,
    w: 10.0,
    h: 0.46,
    rectRadius: 0.04,
    fill: { color: "FFF7E8" },
    line: { color: C.orange, pt: 1 },
  });
  slide.addText("En este módulo iremos refinando este rol, pero por ahora basta con entender que el servidor no es un actor pasivo.", {
    x: 1.58,
    y: 6.16,
    w: 9.4,
    h: 0.14,
    fontFace: "Aptos",
    fontSize: 12,
    bold: true,
    color: C.ink,
    margin: 0,
    align: "center",
  });

  addFooter(slide, "Bloque 1 · El servidor como parte activa de la interacción");
  validateSlide(slide);
}

function createUrlSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "¿Qué pasa cuando escribimos una URL?", "La acción parece simple, pero no lo es.", 1);

  slide.addShape(SH.roundRect, {
    x: 0.78,
    y: 2.28,
    w: 3.58,
    h: 3.82,
    rectRadius: 0.08,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  addBarsMotif(slide, 1.08, 2.56, 0.86, C.red);
  slide.addText("URL de entrada", {
    x: 1.08,
    y: 3.02,
    w: 1.7,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 10.8,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  slide.addText("`www.aiep.cl`\no `www.youtube.com`", {
    x: 1.08,
    y: 3.34,
    w: 2.5,
    h: 0.76,
    fontFace: "Consolas",
    fontSize: 18,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Escribir una URL no abre una página por arte de magia: dispara una cadena técnica breve que después iremos ampliando.", {
    x: 1.08,
    y: 4.38,
    w: 2.92,
    h: 1.0,
    fontFace: "Aptos",
    fontSize: 14,
    color: "E0E7FF",
    margin: 0,
  });

  addStageChain(slide, SH, {
    x: 4.66,
    y: 2.28,
    w: 7.3,
    h: 3.82,
    title: "Recorrido mínimo que ya empieza a moverse",
    compact: true,
    stages: [
      { step: "1", title: "URL", body: "Se escribe una dirección.", accent: C.coral },
      { step: "2", title: "Cliente", body: "El navegador inicia la solicitud.", accent: C.teal },
      { step: "3", title: "Red", body: "El pedido viaja y se encamina.", accent: C.gold },
      { step: "4", title: "Servidor", body: "Prepara una respuesta.", accent: C.navy, fill: C.navy, tone: "dark" },
      { step: "5", title: "Pantalla", body: "Se representa el resultado.", accent: C.orange },
    ],
    notes: [
      {
        title: "Idea central",
        body: "El curso consiste en entender mejor esta coordinación y aprender a construirla con criterio.",
        accent: C.coral,
      },
    ],
  });

  addFooter(slide, "Bloque 1 · Apertura conceptual");
  validateSlide(slide);
}

function createInternetVsWebSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "Internet no es lo mismo que la Web", "Distinguir estos conceptos evita muchos errores desde el inicio.", 2);

  addCard(slide, {
    x: 0.82,
    y: 2.36,
    w: 5.8,
    h: 3.0,
    fill: C.white,
    accent: C.teal,
    title: "Internet",
    body: "Es la infraestructura global de redes conectadas.\n\nPermite transportar información y conectar dispositivos, servicios y sistemas.",
    bodyFontSize: 17,
  });

  addCard(slide, {
    x: 6.9,
    y: 2.36,
    w: 5.6,
    h: 3.0,
    fill: C.white,
    accent: C.coral,
    title: "Web",
    body: "Es uno de los servicios que funciona sobre Internet.\n\nNo es el único: también existen correo, mensajería, videollamadas y transferencia de archivos.",
    bodyFontSize: 17,
  });

  slide.addShape(SH.roundRect, {
    x: 1.55,
    y: 5.72,
    w: 10.15,
    h: 0.9,
    rectRadius: 0.06,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Analogía útil: Internet es la red de carreteras; la Web es uno de los vehículos que circula por ella.", {
    x: 1.85,
    y: 5.9,
    w: 9.55,
    h: 0.3,
    fontFace: "Aptos",
    fontSize: 16,
    bold: true,
    color: C.white,
    margin: 0,
    align: "center",
  });

  addFooter(slide, "Bloque 1 · Diferencia conceptual clave");
  validateSlide(slide);
}

function createActorsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "Actores principales de una interacción web", "Este mapa aparecerá una y otra vez durante el módulo.", 3);

  const cards = [
    { x: 0.82, y: 2.28, w: 3.85, h: 1.45, accent: C.coral, title: "Usuario", body: "Necesita acceder a un recurso o realizar una acción." },
    { x: 4.76, y: 2.28, w: 3.85, h: 1.45, accent: C.teal, title: "Navegador", body: "Interpreta y muestra la información." },
    { x: 8.7, y: 2.28, w: 3.8, h: 1.45, accent: C.gold, title: "Cliente", body: "Es el lado que realiza la solicitud." },
    { x: 2.0, y: 4.1, w: 4.15, h: 1.45, accent: C.navy, title: "Servidor", body: "Recibe, procesa y responde a la solicitud.", titleColor: C.navy },
    { x: 7.0, y: 4.1, w: 4.15, h: 1.45, accent: C.orange, title: "Sitio o app web", body: "Es el producto que finalmente consume el usuario." },
  ];

  cards.forEach((card) =>
    addCard(slide, {
      fill: C.white,
      line: C.border,
      bodyFontSize: 15,
      titleFontSize: 15,
      ...card,
    })
  );

  slide.addShape(SH.roundRect, {
    x: 1.35,
    y: 5.98,
    w: 10.6,
    h: 0.82,
    rectRadius: 0.05,
    fill: { color: C.mint },
    line: { color: C.teal, pt: 1 },
  });
  slide.addText('Idea importante: el navegador no "contiene Internet"; actúa como intermediario entre el usuario y servicios remotos.', {
    x: 1.62,
    y: 6.18,
    w: 10.05,
    h: 0.28,
    fontFace: "Aptos",
    fontSize: 15,
    bold: true,
    color: C.ink,
    margin: 0,
    align: "center",
  });

  validateSlide(slide);
}

function createClientServerSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "Arquitectura cliente-servidor", "La base conceptual que sostendrá gran parte del curso.", 4);

  slide.addShape(SH.roundRect, {
    x: 0.95,
    y: 2.25,
    w: 2.55,
    h: 1.15,
    rectRadius: 0.06,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Navegador", {
    x: 1.35,
    y: 2.6,
    w: 1.75,
    h: 0.24,
    fontFace: "Aptos Display",
    fontSize: 19,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  slide.addShape(SH.chevron, {
    x: 3.82,
    y: 2.42,
    w: 1.0,
    h: 0.78,
    fill: { color: C.orange },
    line: { color: C.orange },
  });

  slide.addShape(SH.roundRect, {
    x: 5.15,
    y: 2.25,
    w: 2.55,
    h: 1.15,
    rectRadius: 0.06,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Cliente", {
    x: 5.65,
    y: 2.6,
    w: 1.55,
    h: 0.24,
    fontFace: "Aptos Display",
    fontSize: 19,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  slide.addShape(SH.chevron, {
    x: 8.02,
    y: 2.42,
    w: 1.0,
    h: 0.78,
    fill: { color: C.coral },
    line: { color: C.coral },
  });

  slide.addShape(SH.roundRect, {
    x: 9.35,
    y: 2.25,
    w: 2.95,
    h: 1.15,
    rectRadius: 0.06,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Servidor", {
    x: 9.85,
    y: 2.6,
    w: 1.95,
    h: 0.24,
    fontFace: "Aptos Display",
    fontSize: 19,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });

  addCard(slide, {
    x: 1.1,
    y: 4.3,
    w: 11.1,
    h: 1.8,
    fill: C.white,
    line: C.border,
    accent: C.teal,
    title: "¿Qué significa esta arquitectura?",
    body: "El cliente pide algo. El servidor recibe la solicitud, procesa y responde. La aplicación web existe gracias a esa conversación constante.\n\nPrimero entendemos quiénes participan; luego veremos cómo se comunican.",
    bodyFontSize: 16,
  });

  slide.addShape(SH.roundRect, {
    x: 3.25,
    y: 6.32,
    w: 6.75,
    h: 0.52,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Puente al bloque 2: HTTP, DNS y el recorrido técnico de una solicitud web", {
    x: 3.55,
    y: 6.47,
    w: 6.15,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 12,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createClosingSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };

  slide.addShape(SH.ellipse, {
    x: 11.0,
    y: 0.18,
    w: 1.75,
    h: 1.75,
    fill: { color: C.coral, transparency: 8 },
    line: { color: C.coral, transparency: 100 },
  });

  slide.addText("Qué nos llevamos del Bloque 1", {
    x: 0.82,
    y: 0.9,
    w: 5.9,
    h: 0.55,
    fontFace: "Aptos Display",
    fontSize: 24,
    bold: true,
    color: C.white,
    margin: 0,
  });

  slide.addText(
    "La Web funciona gracias a la interacción coordinada entre usuario, navegador, cliente y servidor.",
    {
      x: 0.84,
      y: 1.85,
      w: 5.4,
      h: 1.6,
      fontFace: "Aptos Display",
      fontSize: 21,
      bold: true,
      color: C.gold,
      margin: 0,
      valign: "mid",
    }
  );

  addQuestionCard(slide, {
    x: 7.0,
    y: 2.0,
    w: 5.1,
    h: 1.18,
    fill: C.white,
    line: C.white,
    title: "Pregunta 1",
    body: "¿Qué diferencia hay entre Internet y la Web?",
    accent: C.teal,
  });

  addQuestionCard(slide, {
    x: 7.0,
    y: 3.32,
    w: 5.1,
    h: 1.18,
    fill: C.white,
    line: C.white,
    title: "Pregunta 2",
    body: "¿Quién hace la solicitud en una arquitectura cliente-servidor?",
    accent: C.orange,
  });

  addQuestionCard(slide, {
    x: 7.0,
    y: 4.64,
    w: 5.1,
    h: 1.18,
    fill: C.white,
    line: C.white,
    title: "Pregunta 3",
    body: "¿Por qué decimos que abrir una página no es un acto mágico, sino un proceso?",
    accent: C.coral,
  });

  addChip(slide, "Sigue: HTTP y DNS", 0.86, 6.15, 1.78, C.teal);
  slide.addText("En el siguiente bloque veremos cómo se comunican estos actores en la práctica.", {
    x: 2.85,
    y: 6.2,
    w: 5.9,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 12,
    color: C.white,
    margin: 0,
  });

  validateSlide(slide);
}

function createBlock2IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };

  slide.addShape(SH.ellipse, {
    x: 9.95,
    y: 0.35,
    w: 2.45,
    h: 2.45,
    fill: { color: C.teal, transparency: 6 },
    line: { color: C.teal, transparency: 100 },
  });

  addChip(slide, "Bloque 2", 0.82, 0.6, 1.1, C.orange, C.navy);
  slide.addText("Cómo se comunican los actores", {
    x: 0.82,
    y: 1.35,
    w: 6.5,
    h: 0.8,
    fontFace: "Aptos Display",
    fontSize: 27,
    bold: true,
    color: C.white,
    margin: 0,
  });

  slide.addText("Ahora pasamos de identificar los actores a entender el recorrido técnico de una solicitud web.", {
    x: 0.84,
    y: 2.3,
    w: 6.15,
    h: 0.7,
    fontFace: "Aptos",
    fontSize: 16,
    color: "E0E7FF",
    margin: 0,
  });

  addCard(slide, {
    x: 0.95,
    y: 3.45,
    w: 3.55,
    h: 1.3,
    fill: C.white,
    line: C.white,
    accent: C.coral,
    title: "Solicitud y respuesta",
    body: "Toda interacción web ocurre como una petición del cliente y una respuesta del servidor.",
    bodyFontSize: 14,
  });

  addCard(slide, {
    x: 4.85,
    y: 3.45,
    w: 3.2,
    h: 1.3,
    fill: C.white,
    line: C.white,
    accent: C.gold,
    title: "HTTP",
    body: "Organiza la conversación con reglas compartidas.",
    bodyFontSize: 14,
  });

  addCard(slide, {
    x: 8.35,
    y: 3.45,
    w: 3.55,
    h: 1.3,
    fill: C.white,
    line: C.white,
    accent: C.teal,
    title: "DNS",
    body: "Ayuda a localizar el servidor correcto dentro de la red.",
    bodyFontSize: 14,
  });

  slide.addText("El objetivo de este bloque es que la apertura de una página deje de verse como un acto invisible y pase a entenderse como una secuencia precisa.", {
    x: 0.86,
    y: 5.55,
    w: 8.5,
    h: 0.8,
    fontFace: "Aptos",
    fontSize: 15,
    color: C.gold,
    margin: 0,
  });

  validateSlide(slide);
}

function createBlock2ExamplesSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(slide, "La misma lógica aparece una y otra vez", "Abrir una página, iniciar sesión o enviar un formulario parecen acciones distintas, pero comparten una estructura.", "Bloque 2", C.orange, C.navy);

  const examples = [
    { x: 0.82, y: 2.34, accent: C.coral, title: "Abrir una página", body: "El cliente pide un recurso y el servidor responde con contenido." },
    { x: 4.08, y: 2.34, accent: C.teal, title: "Iniciar sesión", body: "El cliente envía datos de acceso y el servidor responde con validación." },
    { x: 7.34, y: 2.34, accent: C.gold, title: "Enviar un formulario", body: "Se mandan datos y el servidor procesa la acción." },
    { x: 2.45, y: 4.32, accent: C.orange, title: "Cargar datos en una app", body: "La interfaz solicita información y el servidor devuelve resultados." },
    { x: 6.15, y: 4.32, accent: C.coral, title: "Buscar contenido", body: "El cliente formula una consulta y el servidor responde según esa petición." },
  ];

  examples.forEach((item) =>
    addCard(slide, {
      x: item.x,
      y: item.y,
      w: item.x === 2.45 || item.x === 6.15 ? 3.6 : 2.95,
      h: 1.56,
      fill: C.white,
      accent: item.accent,
      title: item.title,
      body: item.body,
      bodyFontSize: 13,
      titleFontSize: 14,
      bodyTop: 0.54,
    })
  );

  addFooter(slide, "Bloque 2 · Mismo patrón, distintas acciones");
  validateSlide(slide);
}

function createRequestPartsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(slide, "Qué contiene una solicitud", "Todavía sin entrar a todos los detalles, conviene reconocer sus piezas más visibles.", "Bloque 2", C.orange, C.navy);

  slide.addShape(SH.roundRect, {
    x: 0.92,
    y: 2.38,
    w: 11.0,
    h: 1.08,
    rectRadius: 0.05,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("GET /cursos?id=3 HTTP/1.1", {
    x: 1.28,
    y: 2.68,
    w: 10.3,
    h: 0.2,
    fontFace: "Consolas",
    fontSize: 21,
    bold: true,
    color: C.white,
    margin: 0,
    align: "center",
  });

  addCard(slide, {
    x: 1.02,
    y: 4.0,
    w: 2.95,
    h: 1.62,
    fill: C.white,
    accent: C.coral,
    title: "Método",
    body: "Indica la intención general: solicitar, enviar o modificar algo.",
    bodyFontSize: 13,
    bodyTop: 0.54,
  });

  addCard(slide, {
    x: 4.26,
    y: 4.0,
    w: 2.95,
    h: 1.62,
    fill: C.white,
    accent: C.teal,
    title: "Ruta o recurso",
    body: "Señala qué página, archivo o endpoint se está pidiendo.",
    bodyFontSize: 13,
    bodyTop: 0.54,
  });

  addCard(slide, {
    x: 7.5,
    y: 4.0,
    w: 2.95,
    h: 1.62,
    fill: C.white,
    accent: C.gold,
    title: "Datos adicionales",
    body: "Puede incluir parámetros, cabeceras o un cuerpo con información.",
    bodyFontSize: 13,
    bodyTop: 0.54,
  });

  slide.addShape(SH.roundRect, {
    x: 1.34,
    y: 6.02,
    w: 9.95,
    h: 0.46,
    rectRadius: 0.04,
    fill: { color: "FFF7E8" },
    line: { color: C.orange, pt: 1 },
  });
  slide.addText('Una solicitud no es solo "ir a un sitio": es un mensaje estructurado que el servidor puede interpretar.', {
    x: 1.66,
    y: 6.16,
    w: 9.3,
    h: 0.14,
    fontFace: "Aptos",
    fontSize: 12,
    bold: true,
    color: C.ink,
    margin: 0,
    align: "center",
  });

  addFooter(slide, "Bloque 2 · Anatomía básica de una request");
  validateSlide(slide);
}

function createResponsePartsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(slide, "Qué contiene una respuesta", "Lo que el servidor devuelve también tiene estructura y no siempre representa éxito.", "Bloque 2", C.orange, C.navy);

  slide.addShape(SH.roundRect, {
    x: 1.05,
    y: 2.38,
    w: 10.7,
    h: 1.08,
    rectRadius: 0.05,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("HTTP/1.1 200 OK   +   contenido HTML / JSON / error", {
    x: 1.4,
    y: 2.68,
    w: 10.0,
    h: 0.2,
    fontFace: "Consolas",
    fontSize: 19,
    bold: true,
    color: C.white,
    margin: 0,
    align: "center",
  });

  const parts = [
    { x: 1.02, accent: C.coral, title: "Código de estado", body: "Resume el resultado general de la solicitud." },
    { x: 4.26, accent: C.teal, title: "Tipo de contenido", body: "Ayuda a entender qué está devolviendo el servidor." },
    { x: 7.5, accent: C.gold, title: "Cuerpo de respuesta", body: "Contiene la página, los datos o el mensaje asociado." },
  ];

  parts.forEach((part) =>
    addCard(slide, {
      x: part.x,
      y: 4.0,
      w: 2.95,
      h: 1.62,
      fill: C.white,
      accent: part.accent,
      title: part.title,
      body: part.body,
      bodyFontSize: 13,
      bodyTop: 0.54,
    })
  );

  addFooter(slide, "Bloque 2 · Anatomía básica de una response");
  validateSlide(slide);
}

function createMethodsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(slide, "El método expresa intención", "No es lo mismo pedir información que enviar datos o activar una acción.", "Bloque 2", C.orange, C.navy);

  addCard(slide, {
    x: 1.18,
    y: 2.42,
    w: 3.2,
    h: 2.0,
    fill: C.white,
    accent: C.gold,
    title: "GET",
    body: "Suele usarse para solicitar información o recursos sin modificar el estado general del sistema.",
    bodyFontSize: 14,
    bodyTop: 0.56,
  });

  addCard(slide, {
    x: 4.82,
    y: 2.42,
    w: 3.2,
    h: 2.0,
    fill: C.white,
    accent: C.coral,
    title: "POST",
    body: "Suele usarse para enviar datos al servidor y activar alguna acción o procesamiento.",
    bodyFontSize: 14,
    bodyTop: 0.56,
  });

  addCard(slide, {
    x: 8.46,
    y: 2.42,
    w: 2.55,
    h: 2.0,
    fill: C.navy,
    line: C.navy,
    accent: C.teal,
    title: "Idea útil",
    titleColor: C.white,
    bodyColor: C.white,
    body: "El método no es un detalle decorativo: orienta la conversación entre cliente y servidor.",
    bodyFontSize: 13,
    bodyTop: 0.56,
  });

  addCard(slide, {
    x: 2.2,
    y: 4.78,
    w: 8.7,
    h: 1.32,
    fill: "FFF7E8",
    line: C.orange,
    accent: C.orange,
    title: "Por ahora basta con esto",
    body: "En esta primera clase no necesitamos memorizar todos los métodos posibles. Lo importante es entender que el cliente expresa intención y el servidor responde en consecuencia.",
    bodyFontSize: 14,
    bodyTop: 0.54,
  });

  addFooter(slide, "Bloque 2 · GET y POST como punto de partida");
  validateSlide(slide);
}

function createStatusCodesSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(slide, "Los códigos de estado también comunican", "Una respuesta no solo trae contenido: también informa si la solicitud salió bien o mal.", "Bloque 2", C.orange, C.navy);

  const codes = [
    { x: 1.0, accent: C.teal, title: "200", body: "La solicitud fue procesada correctamente." },
    { x: 3.74, accent: C.orange, title: "404", body: "El recurso solicitado no fue encontrado." },
    { x: 6.48, accent: C.coral, title: "403", body: "Existe el recurso, pero no tienes permiso para acceder." },
    { x: 9.22, accent: C.gold, title: "500", body: "El problema ocurrió del lado del servidor." },
  ];

  codes.forEach((code) =>
    addCard(slide, {
      x: code.x,
      y: 2.6,
      w: 2.2,
      h: 2.0,
      fill: C.white,
      accent: code.accent,
      title: code.title,
      body: code.body,
      bodyFontSize: 13,
      titleFontSize: 18,
      bodyTop: 0.62,
    })
  );

  slide.addShape(SH.roundRect, {
    x: 1.55,
    y: 5.08,
    w: 10.15,
    h: 0.5,
    rectRadius: 0.04,
    fill: { color: C.mint },
    line: { color: C.teal, pt: 1 },
  });
  slide.addText("Leer el código de estado ya permite entender bastante sobre lo que pasó en la interacción.", {
    x: 1.92,
    y: 5.24,
    w: 9.4,
    h: 0.14,
    fontFace: "Aptos",
    fontSize: 12,
    bold: true,
    color: C.ink,
    margin: 0,
    align: "center",
  });

  addFooter(slide, "Bloque 2 · El servidor también responde con señales");
  validateSlide(slide);
}

function createDnsAnalogySlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(slide, "DNS: pensar en nombres, no solo en números", "El sistema existe porque los humanos recordamos nombres mejor que direcciones numéricas.", "Bloque 2", C.orange, C.navy);

  slide.addShape(SH.roundRect, {
    x: 1.08,
    y: 2.38,
    w: 3.05,
    h: 1.0,
    rectRadius: 0.05,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("www.aiep.cl", {
    x: 1.46,
    y: 2.7,
    w: 2.3,
    h: 0.18,
    fontFace: "Aptos Display",
    fontSize: 20,
    bold: true,
    color: C.navy,
    margin: 0,
    align: "center",
  });

  slide.addShape(SH.chevron, {
    x: 4.46,
    y: 2.64,
    w: 0.9,
    h: 0.5,
    fill: { color: C.orange },
    line: { color: C.orange },
  });

  slide.addShape(SH.roundRect, {
    x: 5.7,
    y: 2.38,
    w: 2.1,
    h: 1.0,
    rectRadius: 0.05,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("DNS", {
    x: 6.28,
    y: 2.7,
    w: 0.95,
    h: 0.18,
    fontFace: "Aptos Display",
    fontSize: 20,
    bold: true,
    color: C.white,
    margin: 0,
    align: "center",
  });

  slide.addShape(SH.chevron, {
    x: 8.12,
    y: 2.64,
    w: 0.9,
    h: 0.5,
    fill: { color: C.teal },
    line: { color: C.teal },
  });

  slide.addShape(SH.roundRect, {
    x: 9.36,
    y: 2.38,
    w: 2.55,
    h: 1.0,
    rectRadius: 0.05,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Dirección IP", {
    x: 9.72,
    y: 2.7,
    w: 1.85,
    h: 0.18,
    fontFace: "Aptos Display",
    fontSize: 20,
    bold: true,
    color: C.navy,
    margin: 0,
    align: "center",
  });

  addCard(slide, {
    x: 1.2,
    y: 4.24,
    w: 4.85,
    h: 1.62,
    fill: C.white,
    accent: C.teal,
    title: "Analogía útil",
    body: "DNS funciona como una agenda o directorio: tú recuerdas el nombre, el sistema busca el dato técnico necesario para llegar al destino.",
    bodyFontSize: 14,
    bodyTop: 0.56,
  });

  addCard(slide, {
    x: 6.38,
    y: 4.24,
    w: 4.7,
    h: 1.62,
    fill: "FFF7E8",
    line: C.orange,
    accent: C.coral,
    title: "Lo importante en esta etapa",
    body: "No memorizar IPs, sino entender que la red necesita traducir nombres legibles en direcciones utilizables.",
    bodyFontSize: 14,
    bodyTop: 0.56,
  });

  addFooter(slide, "Bloque 2 · DNS como sistema de traducción y localización");
  validateSlide(slide);
}

function createFailurePointsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(slide, "Una página puede fallar en distintos puntos", "Comprender el recorrido ayuda a diagnosticar mejor y a dejar de pensar en errores como algo totalmente misterioso.", "Bloque 2", C.orange, C.navy);

  const failures = [
    { x: 0.92, accent: C.coral, title: "DNS", body: "El nombre no se resuelve o apunta al lugar incorrecto." },
    { x: 3.92, accent: C.teal, title: "Red", body: "La conexión se interrumpe o no logra llegar al destino." },
    { x: 6.92, accent: C.gold, title: "Servidor", body: "El servicio no responde o falla al procesar la solicitud." },
    { x: 9.92, accent: C.orange, title: "Recurso", body: "La página o archivo solicitado no existe." },
  ];

  failures.forEach((failure) =>
    addCard(slide, {
      x: failure.x,
      y: 2.62,
      w: 2.4,
      h: 1.92,
      fill: C.white,
      accent: failure.accent,
      title: failure.title,
      body: failure.body,
      bodyFontSize: 13,
      bodyTop: 0.56,
    })
  );

  addCard(slide, {
    x: 2.1,
    y: 4.98,
    w: 8.9,
    h: 1.12,
    fill: C.navy,
    line: C.navy,
    accent: C.teal,
    title: "Cambio de mirada",
    titleColor: C.white,
    bodyColor: C.white,
    body: 'Cuando algo no carga, ya no pensamos "la página está mala" sin más: empezamos a preguntarnos en qué etapa del recorrido se rompió.',
    bodyFontSize: 14,
    bodyTop: 0.5,
  });

  addFooter(slide, "Bloque 2 · Fallas posibles a lo largo del recorrido");
  validateSlide(slide);
}

function createRequestResponseSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "Solicitud y respuesta", "La lógica básica que sostiene casi toda interacción web.", 5, "Bloque 2", C.orange, C.navy);

  slide.addShape(SH.roundRect, {
    x: 0.82,
    y: 2.32,
    w: 4.3,
    h: 3.95,
    rectRadius: 0.08,
    fill: { color: C.navy },
    line: { color: C.navy },
  });

  slide.addText("Idea base", {
    x: 1.12,
    y: 2.42,
    w: 1.2,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 11,
    bold: true,
    color: C.gold,
    margin: 0,
  });

  slide.addText("El navegador actúa como cliente: envía una solicitud.\n\nEl servidor recibe, interpreta y devuelve una respuesta.", {
    x: 1.1,
    y: 2.86,
    w: 3.45,
    h: 1.9,
    fontFace: "Aptos Display",
    fontSize: 18,
    bold: true,
    color: C.white,
    margin: 0,
    valign: "mid",
  });

  slide.addText("Esta lógica se repite cuando abrimos una página, iniciamos sesión, enviamos un formulario o cargamos datos desde una app.", {
    x: 1.12,
    y: 5.18,
    w: 3.4,
    h: 0.58,
    fontFace: "Aptos",
    fontSize: 13,
    color: "E0E7FF",
    margin: 0,
  });

  addCard(slide, {
    x: 5.45,
    y: 2.34,
    w: 2.95,
    h: 1.95,
    fill: C.white,
    accent: C.coral,
    title: "Solicitud",
    body: "Es el mensaje inicial del cliente.\n\nPide un recurso, envía datos o activa una acción.",
    bodyFontSize: 14,
    bodyTop: 0.56,
    bottomPadding: 0.16,
  });

  addCard(slide, {
    x: 8.75,
    y: 2.34,
    w: 2.95,
    h: 1.95,
    fill: C.white,
    accent: C.teal,
    title: "Respuesta",
    body: "Es lo que devuelve el servidor.\n\nPuede ser contenido, un error o una confirmación.",
    bodyFontSize: 14,
    bodyTop: 0.56,
    bottomPadding: 0.16,
  });

  addCard(slide, {
    x: 5.45,
    y: 4.38,
    w: 6.25,
    h: 1.9,
    fill: "FFF7E8",
    line: C.orange,
    accent: C.orange,
    title: "¿Por qué importa?",
    body: "Porque esta estructura request / response aparece una y otra vez en el desarrollo web. Entenderla permite leer mejor una aplicación, diagnosticar errores y construir sistemas con más sentido técnico.",
    bodyFontSize: 15,
  });

  addFooter(slide, "Bloque 2 · Lógica básica de comunicación");
  validateSlide(slide);
}

function createHttpSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "HTTP organiza la conversación", "No es Internet: es una de las reglas que hacen posible la Web.", 6, "Bloque 2", C.orange, C.navy);

  addCard(slide, {
    x: 0.82,
    y: 2.28,
    w: 4.35,
    h: 2.0,
    fill: C.white,
    accent: C.coral,
    title: "HTTP",
    body: "Significa HyperText Transfer Protocol.\n\nDefine reglas para que cliente y servidor intercambien mensajes de forma ordenada.",
    bodyFontSize: 15,
    bodyTop: 0.56,
  });

  slide.addShape(SH.roundRect, {
    x: 5.45,
    y: 2.28,
    w: 6.25,
    h: 2.05,
    rectRadius: 0.06,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Cliente  ->  GET /index.html\nServidor ->  200 OK + contenido HTML", {
    x: 5.82,
    y: 2.55,
    w: 5.45,
    h: 0.95,
    fontFace: "Consolas",
    fontSize: 18,
    bold: true,
    color: C.white,
    margin: 0,
  });

  addCard(slide, {
    x: 0.82,
    y: 4.62,
    w: 2.45,
    h: 1.4,
    fill: C.white,
    accent: C.gold,
    title: "GET",
    body: "Suele usarse para solicitar información.",
    bodyFontSize: 14,
  });

  addCard(slide, {
    x: 3.55,
    y: 4.62,
    w: 2.45,
    h: 1.4,
    fill: C.white,
    accent: C.teal,
    title: "POST",
    body: "Suele usarse para enviar datos al servidor.",
    bodyFontSize: 14,
  });

  addCard(slide, {
    x: 6.28,
    y: 4.62,
    w: 2.45,
    h: 1.4,
    fill: C.white,
    accent: C.coral,
    title: "200",
    body: "La solicitud fue procesada correctamente.",
    bodyFontSize: 14,
  });

  addCard(slide, {
    x: 9.01,
    y: 4.62,
    w: 2.7,
    h: 1.4,
    fill: C.white,
    accent: C.orange,
    title: "404",
    body: "El recurso solicitado no fue encontrado.",
    bodyFontSize: 14,
  });

  addFooter(slide, "Bloque 2 · HTTP como protocolo");
  validateSlide(slide);
}

function createDnsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "DNS: cómo la red sabe a dónde ir", "Traducir nombres legibles en direcciones utilizables por la red.", 7, "Bloque 2", C.orange, C.navy);

  slide.addShape(SH.roundRect, {
    x: 1.0,
    y: 2.35,
    w: 2.8,
    h: 1.05,
    rectRadius: 0.06,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("www.aiep.cl", {
    x: 1.35,
    y: 2.7,
    w: 2.1,
    h: 0.22,
    fontFace: "Aptos Display",
    fontSize: 20,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  slide.addShape(SH.chevron, {
    x: 4.1,
    y: 2.5,
    w: 1.0,
    h: 0.7,
    fill: { color: C.orange },
    line: { color: C.orange },
  });

  slide.addShape(SH.roundRect, {
    x: 5.4,
    y: 2.35,
    w: 2.5,
    h: 1.05,
    rectRadius: 0.06,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("DNS", {
    x: 6.05,
    y: 2.7,
    w: 1.2,
    h: 0.22,
    fontFace: "Aptos Display",
    fontSize: 20,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });

  slide.addShape(SH.chevron, {
    x: 8.15,
    y: 2.5,
    w: 1.0,
    h: 0.7,
    fill: { color: C.teal },
    line: { color: C.teal },
  });

  slide.addShape(SH.roundRect, {
    x: 9.45,
    y: 2.35,
    w: 2.85,
    h: 1.05,
    rectRadius: 0.06,
    fill: { color: C.white },
    line: { color: C.border, pt: 1 },
  });
  slide.addText("Dirección IP", {
    x: 9.82,
    y: 2.7,
    w: 2.1,
    h: 0.22,
    fontFace: "Aptos Display",
    fontSize: 20,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  addCard(slide, {
    x: 1.1,
    y: 4.15,
    w: 5.1,
    h: 1.7,
    fill: C.white,
    accent: C.teal,
    title: "Qué hace",
    body: "DNS traduce un nombre fácil de recordar en una dirección que la red puede usar para localizar el servidor correcto.",
    bodyFontSize: 15,
  });

  addCard(slide, {
    x: 6.45,
    y: 4.15,
    w: 5.1,
    h: 1.7,
    fill: "FFF7E8",
    line: C.orange,
    accent: C.orange,
    title: "Qué no hace",
    body: 'DNS no es una página web ni "crea" Internet. Es un sistema de localización dentro de la red.',
    bodyFontSize: 15,
  });

  addFooter(slide, "Bloque 2 · DNS y localización del servidor");
  validateSlide(slide);
}

function createWebFlowSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "El recorrido completo de una solicitud web", "Lo que parece instantáneo en realidad tiene varias etapas.", 8, "Bloque 2", C.orange, C.navy);

  const steps = [
    { x: 0.85, y: 2.4, n: "1", title: "URL", body: "El usuario escribe una dirección en el navegador.", accent: C.coral },
    { x: 4.38, y: 2.4, n: "2", title: "Dominio", body: "El navegador identifica qué nombre debe resolver.", accent: C.gold },
    { x: 7.91, y: 2.4, n: "3", title: "DNS", body: "Se traduce el nombre a una dirección IP.", accent: C.teal },
    { x: 0.85, y: 4.38, n: "4", title: "HTTP", body: "El cliente envía la solicitud al servidor correcto.", accent: C.orange },
    { x: 4.38, y: 4.38, n: "5", title: "Servidor", body: "Procesa la solicitud y prepara una respuesta.", accent: C.navy },
    { x: 7.91, y: 4.38, n: "6", title: "Pantalla", body: "El navegador representa el contenido al usuario.", accent: C.coral },
  ];

  steps.forEach((step) => {
    slide.addShape(SH.roundRect, {
      x: step.x,
      y: step.y,
      w: 3.05,
      h: 1.5,
      rectRadius: 0.05,
      fill: { color: C.white },
      line: { color: C.border, pt: 1 },
    });
    slide.addShape(SH.ellipse, {
      x: step.x + 0.22,
      y: step.y + 0.22,
      w: 0.48,
      h: 0.48,
      fill: { color: step.accent },
      line: { color: step.accent },
    });
    slide.addText(step.n, {
      x: step.x + 0.22,
      y: step.y + 0.32,
      w: 0.48,
      h: 0.14,
      fontFace: "Aptos",
      fontSize: 11,
      bold: true,
      color: step.accent === C.navy ? C.white : C.navy,
      align: "center",
      margin: 0,
    });
    slide.addText(step.title, {
      x: step.x + 0.88,
      y: step.y + 0.24,
      w: 1.85,
      h: 0.18,
      fontFace: "Aptos Display",
      fontSize: 16,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(step.body, {
      x: step.x + 0.24,
      y: step.y + 0.72,
      w: 2.52,
      h: 0.52,
      fontFace: "Aptos",
      fontSize: 13,
      color: C.ink,
      margin: 0,
    });
  });

  slide.addShape(SH.roundRect, {
    x: 1.45,
    y: 6.18,
    w: 10.3,
    h: 0.55,
    rectRadius: 0.04,
    fill: { color: C.mint },
    line: { color: C.teal, pt: 1 },
  });
  slide.addText("Por eso una página puede fallar en distintos puntos: DNS, servidor, recurso inexistente o respuesta con errores.", {
    x: 1.75,
    y: 6.33,
    w: 9.7,
    h: 0.16,
    fontFace: "Aptos",
    fontSize: 12,
    bold: true,
    color: C.ink,
    margin: 0,
    align: "center",
  });

  validateSlide(slide);
}

function createBlock2ClosingSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };

  slide.addShape(SH.ellipse, {
    x: 11.45,
    y: 0.28,
    w: 1.25,
    h: 1.25,
    fill: { color: C.teal, transparency: 8 },
    line: { color: C.teal, transparency: 100 },
  });

  slide.addText("Qué nos llevamos del Bloque 2", {
    x: 0.82,
    y: 0.92,
    w: 6.2,
    h: 0.5,
    fontFace: "Aptos Display",
    fontSize: 24,
    bold: true,
    color: C.white,
    margin: 0,
  });

  slide.addText(
    "La comunicación web ocurre mediante solicitudes y respuestas organizadas por HTTP, mientras DNS ayuda a encontrar el servidor correcto.",
    {
      x: 0.84,
      y: 1.82,
      w: 5.85,
      h: 1.32,
      fontFace: "Aptos Display",
      fontSize: 19,
      bold: true,
      color: C.gold,
      margin: 0,
      valign: "mid",
    }
  );

  slide.addText(
    "Un agente puede ayudarte a explicarlo o resumirlo, pero si tú no entiendes el flujo real, tampoco podrás validar una respuesta técnica.",
    {
      x: 0.86,
      y: 3.18,
      w: 5.78,
      h: 0.72,
      fontFace: "Aptos",
      fontSize: 12.2,
      color: "E7EEF8",
      margin: 0,
    }
  );

  addQuestionCard(slide, {
    x: 7.0,
    y: 1.9,
    w: 5.05,
    h: 1.18,
    fill: C.white,
    line: C.white,
    title: "Pregunta 1",
    body: "¿Qué función cumple HTTP dentro de la Web?",
    accent: C.orange,
  });

  addQuestionCard(slide, {
    x: 7.0,
    y: 3.22,
    w: 5.05,
    h: 1.18,
    fill: C.white,
    line: C.white,
    title: "Pregunta 2",
    body: "¿Por qué necesitamos DNS si ya existen los servidores?",
    accent: C.teal,
  });

  addQuestionCard(slide, {
    x: 7.0,
    y: 4.54,
    w: 5.05,
    h: 1.18,
    fill: C.white,
    line: C.white,
    title: "Pregunta 3",
    body: "¿Qué diferencia hay entre una URL, un dominio y una dirección IP?",
    accent: C.coral,
  });

  addChip(slide, "Sigue: dominio, hosting y despliegue", 0.86, 6.15, 2.7, C.orange, C.navy);
  slide.addText("En el siguiente bloque veremos dónde vive una aplicación web y qué significa publicarla en Internet.", {
    x: 3.86,
    y: 6.21,
    w: 6.7,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 12,
    color: C.white,
    margin: 0,
  });

  validateSlide(slide);
}

function createBlock3IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };

  slide.addShape(SH.ellipse, {
    x: 10.05,
    y: 0.32,
    w: 2.4,
    h: 2.4,
    fill: { color: C.coral, transparency: 8 },
    line: { color: C.coral, transparency: 100 },
  });

  addChip(slide, "Bloque 3", 0.82, 0.6, 1.1, C.teal);
  slide.addText("Dónde vive una aplicación web", {
    x: 0.82,
    y: 1.34,
    w: 6.8,
    h: 0.8,
    fontFace: "Aptos Display",
    fontSize: 27,
    bold: true,
    color: C.white,
    margin: 0,
  });

  slide.addText("Pasamos desde la comunicación técnica hacia la publicación real: dominio, hosting y despliegue.", {
    x: 0.84,
    y: 2.28,
    w: 6.4,
    h: 0.7,
    fontFace: "Aptos",
    fontSize: 16,
    color: "E0E7FF",
    margin: 0,
  });

  addCard(slide, {
    x: 0.95,
    y: 3.45,
    w: 3.5,
    h: 1.35,
    fill: C.white,
    line: C.white,
    accent: C.gold,
    title: "Dominio",
    body: "El nombre legible con el que las personas encuentran un sitio o aplicación.",
    bodyFontSize: 14,
  });

  addCard(slide, {
    x: 4.88,
    y: 3.45,
    w: 3.15,
    h: 1.35,
    fill: C.white,
    line: C.white,
    accent: C.teal,
    title: "Hosting",
    body: "La infraestructura donde realmente viven los archivos y servicios del proyecto.",
    bodyFontSize: 14,
  });

  addCard(slide, {
    x: 8.35,
    y: 3.45,
    w: 3.55,
    h: 1.35,
    fill: C.white,
    line: C.white,
    accent: C.coral,
    title: "Despliegue",
    body: "El proceso que lleva una versión de la aplicación desde local a un entorno público.",
    bodyFontSize: 14,
  });

  slide.addText("El objetivo del bloque es que publicar una app deje de verse como un acto misterioso y pase a entenderse como una cadena de decisiones técnicas.", {
    x: 0.86,
    y: 5.52,
    w: 9.2,
    h: 0.8,
    fontFace: "Aptos",
    fontSize: 15,
    color: C.gold,
    margin: 0,
  });

  validateSlide(slide);
}

function createPublicationQuestionsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    "Publicar una app abre nuevas preguntas",
    "Cuando el proyecto sale del equipo local, aparecen decisiones de acceso, infraestructura y operación.",
    "Bloque 3",
    C.teal,
    C.navy
  );

  const questions = [
    {
      x: 0.82,
      y: 2.38,
      accent: C.gold,
      title: "¿Dónde va a vivir?",
      body: "Necesita infraestructura conectada a Internet; no basta con la carpeta del proyecto.",
    },
    {
      x: 6.45,
      y: 2.38,
      accent: C.coral,
      title: "¿Con qué nombre entran?",
      body: "Las personas acceden por un dominio legible y luego DNS lo traduce al destino correcto.",
    },
    {
      x: 0.82,
      y: 4.18,
      accent: C.teal,
      title: "¿Cómo llega cada versión?",
      body: "Toda mejora o corrección necesita un despliegue para quedar realmente disponible.",
    },
    {
      x: 6.45,
      y: 4.18,
      accent: C.orange,
      title: "¿Cómo se detecta una falla?",
      body: "Si algo no carga, conviene pensar en capas: dominio, DNS, hosting o despliegue.",
    },
  ];

  questions.forEach((item) =>
    addCard(slide, {
      x: item.x,
      y: item.y,
      w: 5.45,
      h: 1.45,
      fill: C.white,
      accent: item.accent,
      title: item.title,
      body: item.body,
      bodyFontSize: 14,
      bodyTop: 0.56,
    })
  );

  slide.addShape(SH.roundRect, {
    x: 1.18,
    y: 6.1,
    w: 10.92,
    h: 0.42,
    rectRadius: 0.04,
    fill: { color: "EEF7F5" },
    line: { color: C.teal, pt: 1 },
  });
  slide.addText("La publicación deja de verse como un botón mágico cuando se separan estas preguntas.", {
    x: 1.54,
    y: 6.22,
    w: 10.2,
    h: 0.14,
    fontFace: "Aptos",
    fontSize: 12,
    bold: true,
    color: C.navy,
    margin: 0,
    align: "center",
  });

  addFooter(slide, "Bloque 3 · Preguntas que aparecen al publicar");
  validateSlide(slide);
}

function createLocalVsPublishedSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "Tener una aplicación no es lo mismo que tenerla publicada", "Desarrollar y publicar están conectados, pero no son el mismo proceso.", 9, "Bloque 3", C.teal);

  slide.addShape(SH.roundRect, {
    x: 0.82,
    y: 2.3,
    w: 4.25,
    h: 3.9,
    rectRadius: 0.08,
    fill: { color: C.navy },
    line: { color: C.navy },
  });

  slide.addText("Idea base", {
    x: 1.12,
    y: 2.42,
    w: 1.2,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 11,
    bold: true,
    color: C.gold,
    margin: 0,
  });

  slide.addText("Una app puede funcionar bien en el computador del desarrollador y aun así no estar disponible para otras personas.", {
    x: 1.08,
    y: 2.86,
    w: 3.45,
    h: 1.75,
    fontFace: "Aptos Display",
    fontSize: 18,
    bold: true,
    color: C.white,
    margin: 0,
    valign: "mid",
  });

  slide.addText("Publicar significa mover esa versión a infraestructura conectada a Internet y dejarla accesible para tráfico real.", {
    x: 1.12,
    y: 5.05,
    w: 3.35,
    h: 0.72,
    fontFace: "Aptos",
    fontSize: 13,
    color: "E0E7FF",
    margin: 0,
  });

  addCard(slide, {
    x: 5.42,
    y: 2.32,
    w: 6.1,
    h: 1.55,
    fill: C.white,
    accent: C.orange,
    title: "En local",
    body: "Sirve para crear, probar y corregir. Todavía depende del entorno del desarrollador y no está pensada para acceso público.",
    bodyFontSize: 15,
  });

  addCard(slide, {
    x: 5.42,
    y: 4.12,
    w: 6.1,
    h: 2.08,
    fill: "FFF7E8",
    line: C.orange,
    accent: C.teal,
    title: "Para publicarla hacen falta más piezas",
    body: "Dominio para identificarla.\nHosting para alojarla.\nDespliegue para instalar una versión utilizable.\nDNS y HTTP para que la comunicación ocurra correctamente.",
    bodyFontSize: 15,
  });

  addFooter(slide, "Bloque 3 · Del entorno local a Internet");
  validateSlide(slide);
}

function createDomainSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "Dominio: el nombre con el que encontramos un sitio", "Conviene distinguirlo desde el inicio para no confundir nombre, dirección y recurso.", 10, "Bloque 3", C.teal);

  slide.addShape(SH.roundRect, {
    x: 0.82,
    y: 2.24,
    w: 4.02,
    h: 3.92,
    rectRadius: 0.06,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Dominio", {
    x: 1.12,
    y: 2.56,
    w: 1.3,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 11,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  slide.addText("`example.com`", {
    x: 1.12,
    y: 2.96,
    w: 2.3,
    h: 0.34,
    fontFace: "Consolas",
    fontSize: 20,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Es el nombre legible que las personas pueden recordar para encontrar un sitio sin memorizar una IP.", {
    x: 1.12,
    y: 3.5,
    w: 2.98,
    h: 0.92,
    fontFace: "Aptos",
    fontSize: 14,
    color: "E0E7FF",
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 1.1,
    y: 5.12,
    w: 2.78,
    h: 0.54,
    rectRadius: 0.04,
    fill: { color: "173250" },
    line: { color: "173250" },
  });
  slide.addText("No es el servidor ni la app", {
    x: 1.28,
    y: 5.3,
    w: 2.42,
    h: 0.12,
    fontFace: "Aptos",
    fontSize: 11,
    bold: true,
    color: C.gold,
    margin: 0,
    align: "center",
  });

  const concepts = [
    { x: 5.12, y: 2.28, title: "Subdominio", body: "`app.example.com`\nServicio derivado o sección distinta.", accent: C.teal },
    { x: 8.38, y: 2.28, title: "URL", body: "`https://.../cursos`\nDirección completa de un recurso.", accent: C.coral },
    { x: 5.12, y: 4.22, title: "IP", body: "`192.0.2.10`\nIdentificador numérico en la red.", accent: C.navy },
    { x: 8.38, y: 4.22, title: "Analogía útil", body: "Se parece al nombre visible con el que la gente ubica un local.", accent: C.gold },
  ];

  concepts.forEach((item) =>
    addCard(slide, {
      x: item.x,
      y: item.y,
      w: 3.02,
      h: 1.62,
      fill: item.title === "Analogía útil" ? C.warm : C.white,
      line: item.title === "Analogía útil" ? C.orange : C.border,
      accent: item.accent,
      title: item.title,
      body: item.body,
      bodyFontSize: 12.8,
      titleFontSize: 14.2,
      bodyTop: 0.54,
    })
  );

  addFooter(slide, "Bloque 3 · Nombre legible frente a dirección técnica");
  validateSlide(slide);
}

function createDomainConfusionsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    "No todo lo que vemos en la barra es el dominio",
    "Separar estos conceptos evita errores habituales al hablar de publicación.",
    "Bloque 3",
    C.teal,
    C.navy
  );

  addUrlBreakdown(slide, SH, {
    x: 0.88,
    y: 2.28,
    w: 11.56,
    h: 3.78,
    title: "Dentro de la barra hay piezas distintas",
    url: "https://campus.example.com/cursos?id=2",
    segments: [
      {
        label: "Protocolo",
        value: "https",
        note: "Define el esquema con que se abre la conexión.",
        accent: C.coral,
        mono: true,
        ratio: 0.9,
      },
      {
        label: "Subdominio",
        value: "campus",
        note: "Apunta a una sección o servicio derivado.",
        accent: C.teal,
        mono: true,
        ratio: 0.92,
      },
      {
        label: "Dominio",
        value: "example.com",
        note: "Es la parte que nombra públicamente al sitio.",
        accent: C.gold,
        mono: true,
        ratio: 1.26,
      },
      {
        label: "Ruta",
        value: "/cursos",
        note: "Lleva al recurso o sección pedida.",
        accent: C.navy,
        mono: true,
        ratio: 1.02,
      },
      {
        label: "Parámetro",
        value: "?id=2",
        note: "Entrega un dato adicional a la solicitud.",
        accent: C.orange,
        mono: true,
        ratio: 0.96,
      },
    ],
    footer: "El dominio es solo una parte de la URL completa, no toda la barra.",
  });

  addCard(slide, {
    x: 1.1,
    y: 6.18,
    w: 4.8,
    h: 0.62,
    fill: C.white,
    accent: C.coral,
    title: "Servidor",
    body: "Sigue siendo el destino técnico donde vive la aplicación o el recurso.",
    titleFontSize: 13.2,
    bodyFontSize: 10.8,
    titleTop: 0.12,
    titleHeight: 0.16,
    bodyTop: 0.32,
    bottomPadding: 0.1,
  });
  addCard(slide, {
    x: 6.2,
    y: 6.18,
    w: 4.8,
    h: 0.62,
    fill: C.warm,
    line: C.orange,
    accent: C.gold,
    title: "Registro",
    body: "Comprar un dominio no publica la app por sí solo ni reemplaza hosting o despliegue.",
    titleFontSize: 13.2,
    bodyFontSize: 10.8,
    titleTop: 0.12,
    titleHeight: 0.16,
    bodyTop: 0.32,
    bottomPadding: 0.1,
  });

  addFooter(slide, "Bloque 3 · Dominio, URL y servidor no son lo mismo");
  validateSlide(slide);
}

function createLocalBusinessAnalogySlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    "Una analogía útil: pensar en un local",
    "No reemplaza lo técnico, pero ayuda a separar funciones sin mezclar conceptos.",
    "Bloque 3",
    C.teal,
    C.navy
  );

  const items = [
    {
      x: 0.82,
      accent: C.gold,
      title: "Dominio",
      body: "Se parece al nombre visible o dirección pública con la que la gente encuentra el lugar.",
    },
    {
      x: 4.36,
      accent: C.teal,
      title: "Hosting",
      body: "Se parece al espacio real o infraestructura donde el servicio efectivamente existe.",
    },
    {
      x: 7.9,
      accent: C.coral,
      title: "Despliegue",
      body: "Se parece al proceso de instalar, ordenar y dejar todo listo para atender público.",
    },
  ];

  items.forEach((item) =>
    addCard(slide, {
      x: item.x,
      y: 2.42,
      w: 3.36,
      h: 2.4,
      fill: C.white,
      accent: item.accent,
      title: item.title,
      body: item.body,
      bodyFontSize: 14,
      bodyTop: 0.56,
    })
  );

  addCard(slide, {
    x: 1.26,
    y: 5.22,
    w: 10.76,
    h: 0.95,
    fill: C.navy,
    line: C.navy,
    accent: C.orange,
    title: "Punto clave",
    body: "Cambiar una de estas piezas no implica automáticamente cambiar las otras. Por eso conviene nombrarlas con precisión.",
    titleColor: C.white,
    bodyColor: C.white,
    bodyFontSize: 13,
    titleFontSize: 14,
    titleTop: 0.16,
    titleHeight: 0.24,
    bodyTop: 0.44,
    bottomPadding: 0.12,
  });

  addFooter(slide, "Bloque 3 · Analogía para distinguir roles");
  validateSlide(slide);
}

function createHostingSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "Hosting: el lugar donde vive la aplicación", 'Hoy no conviene pensarlo solo como "subir archivos"; también es entorno, servicios y disponibilidad.', 11, "Bloque 3", C.teal);

  slide.addShape(SH.roundRect, {
    x: 0.82,
    y: 2.28,
    w: 4.15,
    h: 3.65,
    rectRadius: 0.08,
    fill: { color: C.navy },
    line: { color: C.navy },
  });

  slide.addText("Hosting", {
    x: 1.12,
    y: 2.48,
    w: 1.5,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 11,
    bold: true,
    color: C.gold,
    margin: 0,
  });

  slide.addText("Es la infraestructura donde quedan alojados los archivos, recursos o procesos que permiten que la app exista en Internet.", {
    x: 1.08,
    y: 2.92,
    w: 3.45,
    h: 1.65,
    fontFace: "Aptos Display",
    fontSize: 17,
    bold: true,
    color: C.white,
    margin: 0,
    valign: "mid",
  });

  slide.addText("Puede incluir archivos, un servidor de aplicaciones, una base de datos, variables de entorno, certificados y procesos en ejecución.", {
    x: 1.12,
    y: 4.95,
    w: 3.35,
    h: 0.62,
    fontFace: "Aptos",
    fontSize: 13,
    color: "E0E7FF",
    margin: 0,
  });

  addCard(slide, {
    x: 5.28,
    y: 2.28,
    w: 3.0,
    h: 1.8,
    fill: C.white,
    accent: C.gold,
    title: "Sitio estático",
    body: "Entrega archivos ya preparados: HTML, CSS, JavaScript del cliente e imágenes.",
    bodyFontSize: 13,
    bodyTop: 0.56,
  });

  addCard(slide, {
    x: 8.62,
    y: 2.28,
    w: 3.0,
    h: 1.8,
    fill: C.white,
    accent: C.coral,
    title: "App dinámica",
    body: "Además de archivos, ejecuta lógica en servidor, usa datos y responde según cada solicitud.",
    bodyFontSize: 13,
    bodyTop: 0.56,
  });

  addCard(slide, {
    x: 5.28,
    y: 4.28,
    w: 6.34,
    h: 1.82,
    fill: "FFF7E8",
    line: C.orange,
    accent: C.teal,
    title: "Idea actual",
    body: "En 2026, hosting también puede significar plataformas cloud, servicios administrados, contenedores y despliegues automáticos. No se reduce a FTP ni a copiar archivos a mano.",
    bodyFontSize: 14,
    bodyTop: 0.56,
  });

  addFooter(slide, "Bloque 3 · Infraestructura y disponibilidad");
  validateSlide(slide);
}

function createHostingContentsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    "Qué puede vivir dentro del hosting",
    "Depende del proyecto, pero el entorno publicado suele reunir varias piezas al mismo tiempo.",
    "Bloque 3",
    C.teal,
    C.navy
  );

  const items = [
    { x: 0.92, y: 2.42, accent: C.gold, title: "Frontend", body: "HTML, CSS y JavaScript que ve el navegador." },
    { x: 4.14, y: 2.42, accent: C.coral, title: "Archivos", body: "Imágenes, PDFs, videos y otros recursos." },
    { x: 7.36, y: 2.42, accent: C.teal, title: "Servidor", body: "Procesos que ejecutan lógica de aplicación." },
    { x: 0.92, y: 4.22, accent: C.orange, title: "Datos", body: "Bases de datos o servicios persistentes." },
    { x: 4.14, y: 4.22, accent: C.gold, title: "Configuración", body: "Variables, puertos, rutas y ajustes del entorno." },
    { x: 7.36, y: 4.22, accent: C.coral, title: "Servicios", body: "Certificados, colas, APIs y piezas conectadas." },
  ];

  items.forEach((item) =>
    addCard(slide, {
      x: item.x,
      y: item.y,
      w: 3.05,
      h: 1.45,
      fill: C.white,
      accent: item.accent,
      title: item.title,
      body: item.body,
      titleFontSize: 14,
      bodyFontSize: 12.5,
      bodyTop: 0.54,
    })
  );

  addFooter(slide, "Bloque 3 · Componentes habituales del entorno publicado");
  validateSlide(slide);
}

function createStaticDynamicSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    "Hosting estático y hosting dinámico no resuelven lo mismo",
    "La diferencia no es de moda: depende del comportamiento que necesita la aplicación.",
    "Bloque 3",
    C.teal,
    C.navy
  );

  addCard(slide, {
    x: 0.82,
    y: 2.38,
    w: 5.4,
    h: 2.85,
    fill: C.white,
    accent: C.gold,
    title: "Hosting estático",
    body: "Entrega archivos ya construidos.\n\nSuele servir bien para portafolios, landing pages, documentación y sitios donde el navegador hace casi todo el trabajo.",
    bodyFontSize: 15,
    bodyTop: 0.58,
  });

  addCard(slide, {
    x: 6.48,
    y: 2.38,
    w: 5.8,
    h: 2.85,
    fill: C.navy,
    line: C.navy,
    accent: C.teal,
    title: "Hosting dinámico",
    body: "Además de entregar archivos, ejecuta lógica y responde distinto según cada solicitud.\n\nAparece cuando hay login, datos, paneles, APIs o procesos del lado servidor.",
    titleColor: C.white,
    bodyColor: C.white,
    bodyFontSize: 15,
    bodyTop: 0.58,
  });

  slide.addShape(SH.roundRect, {
    x: 1.52,
    y: 5.72,
    w: 10.3,
    h: 0.42,
    rectRadius: 0.04,
    fill: { color: "FFF7E8" },
    line: { color: C.orange, pt: 1 },
  });
  slide.addText("Elegir bien el entorno evita pagar complejidad donde no hace falta o quedarse corto donde sí la hace.", {
    x: 1.86,
    y: 5.84,
    w: 9.62,
    h: 0.14,
    fontFace: "Aptos",
    fontSize: 12,
    bold: true,
    color: C.navy,
    margin: 0,
    align: "center",
  });

  addFooter(slide, "Bloque 3 · Tipo de hosting según el comportamiento de la app");
  validateSlide(slide);
}

function createDeploySlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "Despliegue: publicar una versión utilizable", "La aplicación no llega sola a Internet; hay un proceso técnico que la prepara, publica y verifica.", 12, "Bloque 3", C.teal);

  const steps = [
    { x: 0.82, title: "Preparar", body: "Compilar, ordenar archivos o dejar lista una versión del proyecto.", accent: C.gold },
    { x: 4.08, title: "Publicar", body: "Mover la versión a la plataforma o servidor donde quedará disponible.", accent: C.coral },
    { x: 7.34, title: "Verificar", body: "Comprobar que responde bien, usa la configuración correcta y quedó estable.", accent: C.teal },
  ];

  steps.forEach((step) =>
    addCard(slide, {
      x: step.x,
      y: 2.32,
      w: 2.95,
      h: 1.76,
      fill: C.white,
      accent: step.accent,
      title: step.title,
      body: step.body,
      bodyFontSize: 13,
      bodyTop: 0.56,
    })
  );

  addCard(slide, {
    x: 0.82,
    y: 4.22,
    w: 4.2,
    h: 2.0,
    fill: C.white,
    accent: C.orange,
    title: "Qué implica",
    body: 'Desplegar no siempre es "subir archivos". También puede incluir dependencias, variables de entorno, servicios externos y automatizaciones.',
    bodyFontSize: 14,
    bodyTop: 0.56,
  });

  addCard(slide, {
    x: 5.35,
    y: 4.22,
    w: 6.25,
    h: 2.0,
    fill: C.navy,
    line: C.navy,
    accent: C.teal,
    title: "Entornos",
    body: "Desarrollo local: donde programamos.\nStaging o prueba: donde validamos una versión.\nProducción: donde acceden los usuarios reales.",
    titleColor: C.white,
    bodyColor: C.white,
    bodyFontSize: 14,
    bodyTop: 0.56,
  });

  addFooter(slide, "Bloque 3 · Publicar con criterio técnico");
  validateSlide(slide);
}

function createDeployChecklistSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    "Desplegar implica una lista de tareas",
    "Pensarlo como proceso reduce errores y ayuda a revisar en qué etapa puede haberse roto algo.",
    "Bloque 3",
    C.teal,
    C.navy
  );

  const steps = [
    { x: 0.82, y: 2.48, w: 3.45, accent: C.gold, title: "1. Preparar", body: "Construir o dejar lista la versión que se publicará." },
    { x: 4.46, y: 2.48, w: 3.45, accent: C.coral, title: "2. Dependencias", body: "Asegurar librerías, paquetes y recursos necesarios." },
    { x: 8.1, y: 2.48, w: 3.45, accent: C.teal, title: "3. Configurar", body: "Definir variables, servicios, rutas o credenciales." },
    { x: 1.96, y: 4.36, w: 4.15, accent: C.orange, title: "4. Publicar", body: "Mover la versión al entorno donde quedará disponible." },
    { x: 7.2, y: 4.36, w: 4.15, accent: C.gold, title: "5. Verificar", body: "Comprobar que responde bien y quedó estable." },
  ];

  steps.forEach((item) =>
    addCard(slide, {
      x: item.x,
      y: item.y,
      w: item.w,
      h: 1.52,
      fill: C.white,
      accent: item.accent,
      title: item.title,
      body: item.body,
      titleFontSize: 14,
      bodyFontSize: 13,
      bodyTop: 0.54,
    })
  );

  slide.addShape(SH.roundRect, {
    x: 1.4,
    y: 6.0,
    w: 10.46,
    h: 0.44,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addShape(SH.rect, {
    x: 1.56,
    y: 6.08,
    w: 0.18,
    h: 0.28,
    fill: { color: C.teal },
    line: { color: C.teal },
  });
  slide.addText("Criterio útil", {
    x: 1.92,
    y: 6.11,
    w: 1.75,
    h: 0.12,
    fontFace: "Aptos Display",
    fontSize: 12,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Sin verificación, un despliegue no está realmente terminado.", {
    x: 3.78,
    y: 6.11,
    w: 7.48,
    h: 0.12,
    fontFace: "Aptos",
    fontSize: 12,
    color: C.white,
    margin: 0,
  });

  addFooter(slide, "Bloque 3 · Checklist mental para publicar");
  validateSlide(slide);
}

function createDeploymentModesSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    "El despliegue puede ser manual o automático",
    "Lo importante no es memorizar herramientas ahora, sino entender las dos lógicas de trabajo.",
    "Bloque 3",
    C.teal,
    C.navy
  );

  addCard(slide, {
    x: 0.82,
    y: 2.36,
    w: 5.45,
    h: 1.95,
    fill: C.white,
    accent: C.orange,
    title: "Manual",
    body: "Una persona ejecuta los pasos: prepara la versión, la publica y revisa el resultado de forma directa.",
    bodyFontSize: 14,
    bodyTop: 0.56,
  });

  addCard(slide, {
    x: 6.5,
    y: 2.36,
    w: 5.45,
    h: 1.95,
    fill: C.navy,
    line: C.navy,
    accent: C.teal,
    title: "Automático",
    body: "Un cambio en el repositorio o una acción programada dispara una secuencia que prepara, publica y valida. Esto funciona mejor cuando intención, restricciones y pasos ya están claros.",
    titleColor: C.white,
    bodyColor: C.white,
    bodyFontSize: 13.4,
    bodyTop: 0.56,
  });

  slide.addText("Entornos habituales", {
    x: 0.86,
    y: 4.68,
    w: 3.2,
    h: 0.24,
    fontFace: "Aptos Display",
    fontSize: 15,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  const envs = [
    { x: 1.05, title: "Local", body: "Donde programamos y probamos primero.", accent: C.gold },
    { x: 4.42, title: "Staging", body: "Donde validamos antes de producción.", accent: C.coral },
    { x: 7.79, title: "Producción", body: "Donde entran los usuarios reales.", accent: C.teal },
  ];

  envs.forEach((item, index) => {
    addCard(slide, {
      x: item.x,
      y: 5.04,
      w: 2.76,
      h: 1.16,
      fill: C.white,
      accent: item.accent,
      title: item.title,
      body: item.body,
      titleFontSize: 14,
      bodyFontSize: 11.5,
      titleTop: 0.14,
      titleHeight: 0.22,
      bodyTop: 0.42,
      bottomPadding: 0.12,
    });

    if (index < envs.length - 1) {
      slide.addShape(SH.chevron, {
        x: item.x + 2.93,
        y: 5.38,
        w: 0.34,
        h: 0.36,
        fill: { color: C.orange },
        line: { color: C.orange },
      });
    }
  });

  slide.addText("Flujo moderno: especificar qué se quiere publicar, dejar claras las restricciones y verificar el resultado después de automatizar.", {
    x: 0.9,
    y: 6.38,
    w: 10.92,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 11.4,
    color: C.slate,
    margin: 0,
    align: "center",
  });

  addFooter(slide, "Bloque 3 · Formas de publicar y entornos de trabajo");
  validateSlide(slide);
}

function createSymptomsByLayerSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    'Un mismo "no funciona" puede significar cosas distintas',
    "La clave es asociar cada síntoma con la capa que conviene revisar primero.",
    "Bloque 3",
    C.teal,
    C.navy
  );

  const items = [
    {
      x: 0.82,
      y: 2.38,
      accent: C.gold,
      title: "No encuentra el sitio",
      body: "Conviene revisar dominio y DNS antes de culpar a la aplicación.",
    },
    {
      x: 6.45,
      y: 2.38,
      accent: C.coral,
      title: "Carga una versión vieja",
      body: "Puede haber un despliegue incompleto o una actualización no aplicada.",
    },
    {
      x: 0.82,
      y: 4.18,
      accent: C.teal,
      title: "Abre, pero falla al usarlo",
      body: "El problema puede estar en la app, en datos o en servicios conectados.",
    },
    {
      x: 6.45,
      y: 4.18,
      accent: C.orange,
      title: "Se cae de forma intermitente",
      body: "Puede apuntar a hosting, recursos insuficientes o procesos inestables.",
    },
  ];

  items.forEach((item) =>
    addCard(slide, {
      x: item.x,
      y: item.y,
      w: 5.45,
      h: 1.45,
      fill: C.white,
      accent: item.accent,
      title: item.title,
      body: item.body,
      bodyFontSize: 14,
      bodyTop: 0.56,
    })
  );

  addFooter(slide, "Bloque 3 · Diagnóstico básico por capas");
  validateSlide(slide);
}

function createPortfolioWalkthroughSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    "Caso guiado: publicar un portafolio personal",
    "La escala es simple, pero la lógica del proceso es la misma que veremos en proyectos mayores.",
    "Bloque 3",
    C.teal,
    C.navy
  );

  const steps = [
    { x: 0.82, y: 2.42, accent: C.gold, title: "1. Desarrollar", body: "Se construye y prueba en el equipo local." },
    { x: 4.06, y: 2.42, accent: C.teal, title: "2. Elegir hosting", body: "Se define dónde quedarán los archivos publicados." },
    { x: 7.3, y: 2.42, accent: C.coral, title: "3. Asociar dominio", body: "Se decide con qué nombre público entrarán las personas." },
    { x: 0.82, y: 4.26, accent: C.orange, title: "4. Configurar DNS", body: "Ese nombre debe apuntar al destino correcto." },
    { x: 4.06, y: 4.26, accent: C.gold, title: "5. Desplegar", body: "Se publica la versión actual del proyecto." },
    { x: 7.3, y: 4.26, accent: C.teal, title: "6. Verificar", body: "Se comprueba que cargue bien cada vez que hay cambios." },
  ];

  steps.forEach((item) =>
    addCard(slide, {
      x: item.x,
      y: item.y,
      w: 3.0,
      h: 1.45,
      fill: C.white,
      accent: item.accent,
      title: item.title,
      body: item.body,
      titleFontSize: 14,
      bodyFontSize: 12.5,
      bodyTop: 0.54,
    })
  );

  slide.addShape(SH.roundRect, {
    x: 10.54,
    y: 2.42,
    w: 1.8,
    h: 3.29,
    rectRadius: 0.06,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Idea clave", {
    x: 10.82,
    y: 2.7,
    w: 1.22,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 11,
    bold: true,
    color: C.gold,
    margin: 0,
    align: "center",
  });
  slide.addText("Aunque cambien las herramientas, la relación entre nombre, infraestructura y despliegue sigue siendo esencial.", {
    x: 10.76,
    y: 3.2,
    w: 1.34,
    h: 1.9,
    fontFace: "Aptos",
    fontSize: 12,
    color: C.white,
    margin: 0,
    valign: "mid",
    align: "center",
  });

  addFooter(slide, "Bloque 3 · Ejemplo simple con lógica real de publicación");
  validateSlide(slide);
}

function createBlock3FlowSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "Cómo se conectan dominio, hosting y despliegue", "Lo importante es entender la cadena completa, no memorizar herramientas aisladas.", 13, "Bloque 3", C.teal);

  const boxes = [
    { x: 0.82, w: 2.15, title: "En local", body: "La app se desarrolla y prueba.", fill: C.white, accent: C.gold },
    { x: 3.88, w: 2.15, title: "Despliegue", body: "Se publica una versión lista.", fill: "FFF7E8", accent: C.coral },
    { x: 6.94, w: 2.15, title: "Hosting", body: "La infraestructura la aloja.", fill: C.white, accent: C.teal },
    { x: 10.0, w: 2.4, title: "Dominio + DNS", body: "El nombre guía el tráfico al destino correcto.", fill: C.navy, accent: C.gold, titleColor: C.white, bodyColor: C.white },
  ];

  boxes.forEach((box, index) => {
    addCard(slide, {
      x: box.x,
      y: 2.38,
      w: box.w,
      h: 1.42,
      fill: box.fill,
      line: box.fill === C.navy ? C.navy : C.border,
      accent: box.accent,
      title: box.title,
      body: box.body,
      titleColor: box.titleColor || C.navy,
      bodyColor: box.bodyColor || C.ink,
      bodyFontSize: 13,
      titleFontSize: 14,
    });

    if (index < boxes.length - 1) {
      slide.addShape(SH.chevron, {
        x: box.x + box.w + 0.22,
        y: 2.74,
        w: 0.44,
        h: 0.52,
        fill: { color: C.orange },
        line: { color: C.orange },
      });
    }
  });

  addCard(slide, {
    x: 0.82,
    y: 4.22,
    w: 5.25,
    h: 2.08,
    fill: C.white,
    accent: C.coral,
    title: "Si una capa falla...",
    body: "Un dominio mal configurado puede impedir el acceso.\nDNS puede apuntar al lugar incorrecto.\nEl hosting puede caerse.\nUn despliegue incompleto puede romper la versión publicada.",
    bodyFontSize: 13,
    bodyTop: 0.56,
  });

  addCard(slide, {
    x: 6.4,
    y: 4.22,
    w: 5.2,
    h: 2.08,
    fill: C.white,
    accent: C.teal,
    title: "Caso simple: portafolio personal",
    body: "Se construye en local, se publica en una plataforma de hosting, se asocia un dominio y se verifica que el navegador cargue el sitio correcto cada vez que hay cambios.",
    bodyFontSize: 13,
    bodyTop: 0.56,
  });

  addFooter(slide, "Bloque 3 · Cadena completa de publicación");
  validateSlide(slide);
}

function createBlock3ClosingSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };

  slide.addShape(SH.ellipse, {
    x: 11.15,
    y: 0.22,
    w: 1.5,
    h: 1.5,
    fill: { color: C.coral, transparency: 8 },
    line: { color: C.coral, transparency: 100 },
  });

  slide.addText("Qué nos llevamos del Bloque 3", {
    x: 0.82,
    y: 0.92,
    w: 6.2,
    h: 0.5,
    fontFace: "Aptos Display",
    fontSize: 24,
    bold: true,
    color: C.white,
    margin: 0,
  });

  slide.addText(
    "Dominio, hosting y despliegue no son sinónimos: son piezas distintas que hacen posible que una aplicación exista públicamente en Internet.",
    {
      x: 0.84,
      y: 1.8,
      w: 5.95,
      h: 1.8,
      fontFace: "Aptos Display",
      fontSize: 20,
      bold: true,
      color: C.gold,
      margin: 0,
      valign: "mid",
    }
  );

  addQuestionCard(slide, {
    x: 7.0,
    y: 1.9,
    w: 5.05,
    h: 1.18,
    fill: C.white,
    line: C.white,
    title: "Pregunta 1",
    body: "¿Por qué una aplicación puede funcionar en local y aun así no estar publicada?",
    accent: C.teal,
  });

  addQuestionCard(slide, {
    x: 7.0,
    y: 3.22,
    w: 5.05,
    h: 1.18,
    fill: C.white,
    line: C.white,
    title: "Pregunta 2",
    body: "¿Qué diferencia hay entre un dominio, una URL completa y una dirección IP?",
    accent: C.orange,
  });

  addQuestionCard(slide, {
    x: 7.0,
    y: 4.54,
    w: 5.05,
    h: 1.18,
    fill: C.white,
    line: C.white,
    title: "Pregunta 3",
    body: "¿Qué problema aparece si el proyecto está bien hecho, pero el dominio o DNS están mal configurados?",
    accent: C.coral,
  });

  addChip(slide, "Sigue: seguridad básica", 0.86, 6.15, 1.95, C.teal);
  slide.addText("En el siguiente bloque veremos cómo publicar y navegar con más criterio y menos riesgo.", {
    x: 3.02,
    y: 6.22,
    w: 6.2,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 12,
    color: C.white,
    margin: 0,
  });

  validateSlide(slide);
}

function createBlock4IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };

  slide.addShape(SH.ellipse, {
    x: 10.0,
    y: 0.35,
    w: 2.45,
    h: 2.45,
    fill: { color: C.gold, transparency: 8 },
    line: { color: C.gold, transparency: 100 },
  });

  addChip(slide, "Bloque 4", 0.82, 0.6, 1.1, C.coral);
  slide.addText("Seguridad básica y criterio al publicar", {
    x: 0.82,
    y: 1.34,
    w: 7.0,
    h: 0.82,
    fontFace: "Aptos Display",
    fontSize: 27,
    bold: true,
    color: C.white,
    margin: 0,
  });

  slide.addText("Cerramos la clase entendiendo que una app no solo debe funcionar: también debe publicarse con responsabilidad técnica.", {
    x: 0.84,
    y: 2.28,
    w: 6.55,
    h: 0.74,
    fontFace: "Aptos",
    fontSize: 16,
    color: "E0E7FF",
    margin: 0,
  });

  addCard(slide, {
    x: 0.95,
    y: 3.42,
    w: 3.45,
    h: 1.4,
    fill: C.white,
    line: C.white,
    accent: C.gold,
    title: "Conexión segura",
    body: "No es lo mismo HTTP que HTTPS cuando una aplicación circula por Internet.",
    bodyFontSize: 14,
  });

  addCard(slide, {
    x: 4.78,
    y: 3.42,
    w: 3.2,
    h: 1.4,
    fill: C.white,
    line: C.white,
    accent: C.teal,
    title: "Secretos y acceso",
    body: "Credenciales, claves y permisos no deberían quedar expuestos.",
    bodyFontSize: 14,
  });

  addCard(slide, {
    x: 8.32,
    y: 3.42,
    w: 3.58,
    h: 1.4,
    fill: C.white,
    line: C.white,
    accent: C.coral,
    title: "Publicar con criterio",
    body: "Que una app cargue bien no significa que esté bien publicada.",
    bodyFontSize: 14,
  });

  slide.addText("El objetivo del bloque es pasar de una mirada técnica básica a una mirada más responsable sobre lo que significa dejar una aplicación expuesta en la Web.", {
    x: 0.86,
    y: 5.5,
    w: 9.35,
    h: 0.82,
    fontFace: "Aptos",
    fontSize: 15,
    color: C.gold,
    margin: 0,
  });

  validateSlide(slide);
}

function createSecurityProcessSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "La seguridad acompaña todo el proceso", "No es un parche final: cambia de sentido cuando la app pasa de local a Internet.", 14, "Bloque 4", C.coral);

  slide.addShape(SH.roundRect, {
    x: 0.82,
    y: 2.28,
    w: 4.35,
    h: 3.88,
    rectRadius: 0.08,
    fill: { color: C.navy },
    line: { color: C.navy },
  });

  slide.addText("Idea base", {
    x: 1.12,
    y: 2.44,
    w: 1.2,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 11,
    bold: true,
    color: C.gold,
    margin: 0,
  });

  slide.addText("Publicar una aplicación significa hacerla visible y utilizable, pero también más vulnerable si no se toman precauciones básicas.", {
    x: 1.08,
    y: 2.88,
    w: 3.45,
    h: 1.82,
    fontFace: "Aptos Display",
    fontSize: 17,
    bold: true,
    color: C.white,
    margin: 0,
    valign: "mid",
  });

  slide.addText("La seguridad se relaciona con datos, acceso, credenciales, formularios, rutas expuestas y confianza del entorno publicado.", {
    x: 1.12,
    y: 5.0,
    w: 3.32,
    h: 0.72,
    fontFace: "Aptos",
    fontSize: 13,
    color: "E0E7FF",
    margin: 0,
  });

  addCard(slide, {
    x: 5.48,
    y: 2.3,
    w: 6.02,
    h: 1.72,
    fill: C.white,
    accent: C.coral,
    title: "Cuando una app ya está publicada...",
    body: "Entra en contacto con usuarios reales, tráfico real, errores reales e intentos de acceso no deseado.",
    bodyFontSize: 15,
  });

  addCard(slide, {
    x: 5.48,
    y: 4.28,
    w: 6.02,
    h: 1.88,
    fill: "FFF7E8",
    line: C.orange,
    accent: C.gold,
    title: "Preguntas mínimas que conviene hacerse",
    body: "¿Qué datos maneja la app?\n¿Quién puede acceder?\n¿Cómo se protegen las credenciales?\n¿Qué pasa si alguien usa mal un formulario o una ruta expuesta?",
    bodyFontSize: 14,
    bodyTop: 0.56,
  });

  addFooter(slide, "Bloque 4 · Seguridad como criterio transversal");
  validateSlide(slide);
}

function createExposureShiftSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    "Publicar cambia el nivel de exposición",
    "Lo que en local parece controlado, en Internet entra en contacto con otras personas, tráfico real y uso imprevisto.",
    "Bloque 4",
    C.coral,
    C.navy
  );

  addExposureCompare(slide, SH, {
    x: 0.82,
    y: 2.34,
    w: 10.72,
    h: 3.74,
    title: "Cambio de superficie al publicar",
    bridgeLabel: "Sale a Internet",
    bridgeAccent: C.orange,
    bridgeW: 1.36,
    bridgeFontSize: 8.2,
    leftW: 2.94,
    left: {
      fill: C.navy,
      accent: C.gold,
      label: "En local",
      title: "Control acotado",
      body: "La app vive en el equipo del desarrollador y solemos mirarla casi solo desde el criterio de si funciona o no.",
      bodyFontSize: 13.2,
    },
    right: {
      fill: C.softBlue,
      accent: C.coral,
      label: "Publicado",
      title: "Exposición real",
      body: "Aparecen personas, bots, tráfico real, configuraciones visibles y usos que no siempre fueron previstos durante el desarrollo.",
      bodyFontSize: 12.8,
    },
    footer:
      "La seguridad empieza antes de un ataque complejo: basta con una clave expuesta, una ruta abierta o una mala configuración.",
  });

  addFooter(slide, "Bloque 4 · Publicar amplía la superficie de riesgo");
  validateSlide(slide);
}

function createSecurityQuestionsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    "Preguntas mínimas antes de publicar",
    "No resuelven toda la seguridad, pero sí obligan a pensar con más criterio técnico.",
    "Bloque 4",
    C.coral,
    C.navy
  );

  addChecklistGrid(slide, SH, {
    x: 0.82,
    y: 2.34,
    w: 10.72,
    h: 3.76,
    title: "Checklist mínimo antes de publicar",
    columns: 2,
    entries: [
      {
        badge: "Datos",
        accent: C.gold,
        title: "¿Qué datos maneja?",
        body: "No es igual mostrar contenido público que procesar formularios, credenciales o información de contacto.",
        bodyFontSize: 12.2,
      },
      {
        badge: "Acceso",
        accent: C.teal,
        title: "¿Quién puede entrar?",
        body: "Conviene distinguir acceso público, usuarios autenticados y espacios reservados para administración.",
        bodyFontSize: 12.2,
      },
      {
        badge: "Secretos",
        accent: C.coral,
        title: "¿Dónde están las credenciales?",
        body: "Una clave visible en código, capturas o repositorios públicos ya es un problema aunque la interfaz se vea bien.",
        bodyFontSize: 12.2,
      },
      {
        badge: "Uso real",
        accent: C.orange,
        title: "¿Qué pasa si se usa mal?",
        body: "Hay que pensar en formularios, rutas de prueba, configuraciones incompletas y acceso no previsto.",
        bodyFontSize: 12.2,
      },
    ],
    footer: "Estas preguntas no resuelven toda la seguridad, pero mejoran mucho el criterio antes de compartir un enlace.",
  });

  addFooter(slide, "Bloque 4 · Preguntas de activación y revisión");
  validateSlide(slide);
}

function createHttpsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "HTTP, HTTPS y confianza mínima", "La conexión importa, especialmente cuando una app empieza a manejar formularios, sesiones o datos sensibles.", 15, "Bloque 4", C.coral);

  addCard(slide, {
    x: 0.82,
    y: 2.3,
    w: 3.1,
    h: 2.0,
    fill: C.white,
    accent: C.orange,
    title: "HTTP",
    body: "Organiza la comunicación entre cliente y servidor, pero no agrega por sí mismo una capa moderna de protección a la conexión.",
    bodyFontSize: 14,
  });

  addCard(slide, {
    x: 4.22,
    y: 2.3,
    w: 3.1,
    h: 2.0,
    fill: C.white,
    accent: C.teal,
    title: "HTTPS",
    body: "Agrega una capa de protección para que la comunicación viaje cifrada y sea más difícil de interceptar o manipular.",
    bodyFontSize: 14,
  });

  slide.addShape(SH.roundRect, {
    x: 7.65,
    y: 2.3,
    w: 3.88,
    h: 2.0,
    rectRadius: 0.06,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Regla mental", {
    x: 7.95,
    y: 2.5,
    w: 1.5,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 11,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  slide.addText("Si una aplicación va a circular por Internet, la seguridad de la conexión importa.", {
    x: 7.95,
    y: 2.92,
    w: 3.0,
    h: 0.92,
    fontFace: "Aptos Display",
    fontSize: 18,
    bold: true,
    color: C.white,
    margin: 0,
  });

  addCard(slide, {
    x: 0.82,
    y: 4.62,
    w: 5.15,
    h: 1.58,
    fill: C.white,
    accent: C.gold,
    title: "Qué aporta HTTPS",
    body: "Protege mejor contraseñas, formularios y cierta información en tránsito, además de construir una confianza mínima para el usuario.",
    bodyFontSize: 14,
  });

  addCard(slide, {
    x: 6.3,
    y: 4.62,
    w: 5.23,
    h: 1.58,
    fill: "FFF7E8",
    line: C.orange,
    accent: C.coral,
    title: "Qué no significa",
    body: "Ver un candado no vuelve perfecto a un sitio. Solo indica que existe una capa de protección en la conexión y un certificado asociado.",
    bodyFontSize: 14,
  });

  addFooter(slide, "Bloque 4 · Conexión segura y confianza básica");
  validateSlide(slide);
}

function createHttpsSignalsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    "Qué señales solemos ver en el navegador",
    "No sustituyen el análisis técnico, pero ayudan a formar un criterio inicial al abrir un sitio.",
    "Bloque 4",
    C.coral,
    C.navy
  );

  addCard(slide, {
    x: 0.82,
    y: 2.42,
    w: 3.42,
    h: 2.0,
    fill: C.white,
    accent: C.teal,
    title: "Con HTTPS",
    body: "Suele aparecer la conexión segura, el navegador no lanza advertencias básicas y el envío de formularios tiene una base mínima de confianza.",
    bodyFontSize: 14,
    bodyTop: 0.56,
  });

  addCard(slide, {
    x: 4.56,
    y: 2.42,
    w: 3.42,
    h: 2.0,
    fill: C.white,
    accent: C.orange,
    title: "Sin HTTPS",
    body: "El navegador puede marcar el sitio como no seguro y el usuario percibe un riesgo inmediato al interactuar.",
    bodyFontSize: 14,
    bodyTop: 0.56,
  });

  addCard(slide, {
    x: 8.3,
    y: 2.42,
    w: 3.24,
    h: 2.0,
    fill: C.navy,
    line: C.navy,
    accent: C.gold,
    title: "Lectura correcta",
    body: "La señal del navegador orienta, pero no reemplaza revisar cómo está hecha la aplicación.",
    titleColor: C.white,
    bodyColor: C.white,
    bodyFontSize: 14,
    bodyTop: 0.56,
  });

  addCard(slide, {
    x: 1.24,
    y: 4.82,
    w: 10.05,
    h: 1.1,
    fill: "EEF7F5",
    line: C.teal,
    accent: C.coral,
    title: "Regla práctica para estudiantes",
    body: "Si un proyecto publicado va a pedir datos o formularios, no deberíamos normalizar que viaje sin una conexión segura.",
    bodyFontSize: 14,
    titleFontSize: 14,
    titleTop: 0.16,
    titleHeight: 0.22,
    bodyTop: 0.44,
    bottomPadding: 0.14,
  });

  addFooter(slide, "Bloque 4 · Señales visibles y criterio inicial");
  validateSlide(slide);
}

function createHttpsLimitsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    'El candado no significa "sitio perfecto"',
    "HTTPS mejora la conexión, pero no resuelve por sí solo todos los problemas de seguridad.",
    "Bloque 4",
    C.coral,
    C.navy
  );

  addCard(slide, {
    x: 0.82,
    y: 2.42,
    w: 5.12,
    h: 2.45,
    fill: C.white,
    accent: C.teal,
    title: "Qué sí aporta",
    body: "Cifra mejor la comunicación.\nReduce ciertos riesgos de interceptación.\nAporta una base mínima de confianza para navegar e ingresar datos.",
    bodyFontSize: 14,
    bodyTop: 0.58,
  });

  addCard(slide, {
    x: 6.24,
    y: 2.42,
    w: 5.32,
    h: 2.45,
    fill: "FFF7E8",
    line: C.orange,
    accent: C.coral,
    title: "Qué no garantiza",
    body: "No corrige claves expuestas.\nNo soluciona rutas de prueba abiertas.\nNo vuelve segura una aplicación con mala lógica o mala configuración.",
    bodyFontSize: 14,
    bodyTop: 0.58,
  });

  slide.addShape(SH.roundRect, {
    x: 1.4,
    y: 5.34,
    w: 9.7,
    h: 0.46,
    rectRadius: 0.04,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Conclusión: HTTPS es condición importante, pero no es seguridad total.", {
    x: 1.78,
    y: 5.48,
    w: 8.96,
    h: 0.12,
    fontFace: "Aptos",
    fontSize: 12,
    bold: true,
    color: C.white,
    margin: 0,
    align: "center",
  });

  addFooter(slide, "Bloque 4 · Límites de una sola medida");
  validateSlide(slide);
}

function createSecretsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "Credenciales, autenticación y secretos", "No toda la información tiene el mismo nivel de sensibilidad cuando un proyecto se publica.", 16, "Bloque 4", C.coral);

  addCard(slide, {
    x: 0.82,
    y: 2.28,
    w: 3.55,
    h: 1.72,
    fill: C.white,
    accent: C.gold,
    title: "Credenciales",
    body: "Datos que permiten identificarse o acceder: contraseñas, claves de API, tokens o cadenas de conexión.",
    bodyFontSize: 14,
  });

  addCard(slide, {
    x: 4.68,
    y: 2.28,
    w: 3.55,
    h: 1.72,
    fill: C.white,
    accent: C.teal,
    title: "Autenticación",
    body: "Proceso mediante el cual un sistema verifica quién eres antes de entregarte acceso.",
    bodyFontSize: 14,
  });

  addCard(slide, {
    x: 8.54,
    y: 2.28,
    w: 3.0,
    h: 1.72,
    fill: C.white,
    accent: C.coral,
    title: "Autorización",
    body: "Decisión sobre lo que puedes o no puedes hacer una vez autenticado.",
    bodyFontSize: 14,
  });

  addCard(slide, {
    x: 0.82,
    y: 4.28,
    w: 4.65,
    h: 1.92,
    fill: C.navy,
    line: C.navy,
    accent: C.gold,
    title: "Lo que no debería quedar expuesto",
    body: "Contraseñas.\nClaves de API.\nTokens.\nCredenciales de administración.\nSecretos incrustados en código público.",
    titleColor: C.white,
    bodyColor: C.white,
    bodyFontSize: 14,
    bodyTop: 0.56,
  });

  addCard(slide, {
    x: 5.8,
    y: 4.28,
    w: 5.73,
    h: 1.92,
    fill: "FFF7E8",
    line: C.orange,
    accent: C.teal,
    title: "Práctica mínima recomendable",
    body: "No compartir claves por canales inseguros. No pegarlas en capturas, repositorios públicos ni agentes sin control. No asumir que un proyecto pequeño pasa desapercibido.",
    bodyFontSize: 13.2,
    bodyTop: 0.56,
  });

  addFooter(slide, "Bloque 4 · Acceso, identidad y secretos");
  validateSlide(slide);
}

function createSensitiveDataSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    "Qué tipo de información no debería quedar expuesta",
    "Aprender a clasificar datos sensibles es parte del criterio profesional mínimo.",
    "Bloque 4",
    C.coral,
    C.navy
  );

  const items = [
    { x: 0.82, y: 2.42, accent: C.gold, title: "Contraseñas", body: "Nunca deberían circular visibles en proyectos o capturas." },
    { x: 4.06, y: 2.42, accent: C.teal, title: "Claves de API", body: "Dan acceso a servicios externos y pueden generar costos o abuso." },
    { x: 7.3, y: 2.42, accent: C.coral, title: "Tokens", body: "Pueden representar sesiones, acceso o automatizaciones activas." },
    { x: 0.82, y: 4.24, accent: C.orange, title: "Conexión a base de datos", body: "Exponerla puede comprometer datos y administración." },
    { x: 4.06, y: 4.24, accent: C.gold, title: "Credenciales de administración", body: "Afectan el control completo del proyecto o servicio." },
    { x: 7.3, y: 4.24, accent: C.teal, title: "Archivos de entorno", body: "Suelen contener variables sensibles que no deberían quedar públicas." },
  ];

  items.forEach((item) =>
    addCard(slide, {
      x: item.x,
      y: item.y,
      w: 3.0,
      h: 1.48,
      fill: C.white,
      accent: item.accent,
      title: item.title,
      body: item.body,
      titleFontSize: 14,
      bodyFontSize: 12.5,
      bodyTop: 0.54,
    })
  );

  addFooter(slide, "Bloque 4 · Tipos de datos con mayor sensibilidad");
  validateSlide(slide);
}

function createAuthDistinctionsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    "Credenciales, autenticación y autorización no son lo mismo",
    "Separar estas ideas ayuda a leer mejor cómo funciona un sistema cuando alguien intenta entrar.",
    "Bloque 4",
    C.coral,
    C.navy
  );

  addAuthFlow(slide, SH, {
    x: 0.86,
    y: 2.36,
    w: 10.66,
    h: 3.76,
    title: "Secuencia mínima de acceso",
    steps: [
      {
        step: "1",
        accent: C.gold,
        title: "Credencial",
        body: "Es el dato usado para presentarse: usuario, contraseña, token o clave.",
        fill: C.white,
      },
      {
        step: "2",
        accent: C.teal,
        title: "Autenticación",
        body: "Es el proceso que comprueba si esos datos corresponden realmente a quien intenta entrar.",
        fill: C.white,
      },
      {
        step: "3",
        accent: C.coral,
        title: "Autorización",
        body: "Es la decisión sobre lo que esa persona puede o no puede hacer una vez que ya fue reconocida.",
        fill: C.navy,
      },
    ],
    example:
      "Ingresar una contraseña es credencial. Comprobarla es autenticación. Permitir entrar al panel de administración es autorización.",
    footer: "Separar estas etapas ayuda a leer mejor cualquier sistema con cuentas, sesiones o permisos.",
  });

  addFooter(slide, "Bloque 4 · Distinciones básicas de acceso");
  validateSlide(slide);
}

function createRisksHygieneSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "Riesgos comunes e higiene técnica básica", "No se trata de paranoia: se trata de incorporar hábitos mínimos de trabajo responsable.", 17, "Bloque 4", C.coral);

  const items = [
    { x: 0.82, y: 2.3, accent: C.coral, title: "Sin HTTPS", body: "Pérdida de confianza y mayor exposición de información." },
    { x: 4.28, y: 2.3, accent: C.orange, title: "Contraseñas débiles", body: "Facilitan accesos no autorizados o malas prácticas repetidas." },
    { x: 7.74, y: 2.3, accent: C.teal, title: "Claves visibles", body: "Comprometen servicios externos o datos aunque la interfaz funcione bien." },
    { x: 0.82, y: 4.16, accent: C.gold, title: "Rutas expuestas", body: "Dejan paneles o funciones de prueba accesibles en producción." },
  ];

  items.forEach((item) =>
    addCard(slide, {
      x: item.x,
      y: item.y,
      w: 3.05,
      h: 1.45,
      fill: C.white,
      accent: item.accent,
      title: item.title,
      body: item.body,
      bodyFontSize: 13,
      titleFontSize: 14,
      bodyTop: 0.54,
    })
  );

  addCard(slide, {
    x: 4.28,
    y: 4.16,
    w: 6.51,
    h: 1.45,
    fill: C.navy,
    line: C.navy,
    accent: C.teal,
    title: "Checklist mínimo al publicar",
    body: 'Usar HTTPS. Evitar credenciales expuestas. Revisar qué archivos se suben. Mantener orden entre local, prueba y producción. Desconfiar del "es solo un proyecto pequeño".',
    titleColor: C.white,
    bodyColor: C.white,
    bodyFontSize: 13,
    bodyTop: 0.54,
  });

  slide.addShape(SH.roundRect, {
    x: 0.96,
    y: 6.04,
    w: 10.92,
    h: 0.48,
    rectRadius: 0.04,
    fill: { color: C.mint },
    line: { color: C.teal, pt: 1 },
  });
  slide.addText("Una app puede verse bien y aun así estar mal publicada si no se revisan estos mínimos.", {
    x: 1.3,
    y: 6.18,
    w: 10.25,
    h: 0.14,
    fontFace: "Aptos",
    fontSize: 12,
    bold: true,
    color: C.ink,
    margin: 0,
    align: "center",
  });

  addFooter(slide, "Bloque 4 · Riesgos iniciales y hábitos mínimos");
  validateSlide(slide);
}

function createPublishingMistakesSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    "Errores frecuentes al publicar proyectos iniciales",
    "Suelen aparecer más por apuro o desconocimiento que por mala intención.",
    "Bloque 4",
    C.coral,
    C.navy
  );

  addChecklistGrid(slide, SH, {
    x: 0.82,
    y: 2.36,
    w: 10.72,
    h: 3.74,
    title: "Errores que aparecen en primeras publicaciones",
    columns: 2,
    entries: [
      {
        badge: "Ruta",
        accent: C.coral,
        title: "Ruta de prueba visible",
        body: "Quedan paneles o funciones que no estaban pensadas para usuarios finales.",
        bodyFontSize: 12.2,
      },
      {
        badge: "Archivo",
        accent: C.gold,
        title: "Archivo sensible incluido",
        body: "Se suben configuraciones o datos que debieron quedarse fuera del enlace público.",
        bodyFontSize: 12.2,
      },
      {
        badge: "Claves",
        accent: C.teal,
        title: "Claves en capturas o repo",
        body: "El proyecto funciona, pero ya perdió confiabilidad al exponer acceso o secretos.",
        bodyFontSize: 12.2,
      },
      {
        badge: "Revisión",
        accent: C.orange,
        title: "Mirar solo la interfaz",
        body: "Se comprueba si carga bonito, pero no qué quedó realmente publicado detrás.",
        bodyFontSize: 12.2,
      },
    ],
    footer: "Muchos errores iniciales no vienen de ataques complejos, sino de publicar con apuro y revisar muy poco.",
  });

  addFooter(slide, "Bloque 4 · Errores comunes en primeras publicaciones");
  validateSlide(slide);
}

function createHygieneHabitsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    "Hábitos mínimos de higiene técnica",
    "No convierten una app en invulnerable, pero sí elevan el estándar del trabajo.",
    "Bloque 4",
    C.coral,
    C.navy
  );

  addChecklistGrid(slide, SH, {
    x: 0.82,
    y: 2.34,
    w: 10.72,
    h: 3.78,
    title: "Higiene mínima al trabajar y publicar",
    columns: 3,
    entries: [
      {
        badge: "Conexión",
        accent: C.gold,
        title: "Usar HTTPS",
        body: "No normalizar conexiones inseguras en proyectos publicados.",
        bodyFontSize: 10.6,
      },
      {
        badge: "Secretos",
        accent: C.teal,
        title: "Proteger secretos",
        body: "No dejar claves visibles en código, capturas o repositorios públicos.",
        bodyFontSize: 10.6,
      },
      {
        badge: "Entrega",
        accent: C.coral,
        title: "Revisar archivos",
        body: "Comprobar qué subimos realmente antes de compartir un enlace.",
        bodyFontSize: 10.6,
      },
      {
        badge: "Entornos",
        accent: C.orange,
        title: "Ordenar entornos",
        body: "Diferenciar local, prueba y producción para reducir errores.",
        bodyFontSize: 10.6,
      },
      {
        badge: "Acceso",
        accent: C.gold,
        title: "Claves seguras",
        body: "Evitar claves débiles, repetidas o compartidas sin control.",
        bodyFontSize: 10.6,
      },
      {
        badge: "Cierre",
        accent: C.teal,
        title: "Verificar antes de mostrar",
        body: "Una revisión final evita compartir algo mal configurado.",
        bodyFontSize: 10.6,
      },
    ],
    footer: "No vuelven perfecta a una app, pero sí elevan el estándar técnico del trabajo desde el inicio.",
  });

  addFooter(slide, "Bloque 4 · Hábitos básicos de trabajo responsable");
  validateSlide(slide);
}

function createSmallProjectMythSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    '"Es solo un proyecto pequeño" es una mala excusa',
    "El tamaño del proyecto no elimina la necesidad de trabajar con un mínimo de cuidado.",
    "Bloque 4",
    C.coral,
    C.navy
  );

  addCard(slide, {
    x: 0.82,
    y: 2.42,
    w: 3.35,
    h: 2.44,
    fill: C.white,
    accent: C.orange,
    title: "Mito",
    body: "Como es un proyecto académico o chico, no importa si una clave queda expuesta o si la configuración está a medias.",
    bodyFontSize: 14,
    bodyTop: 0.58,
  });

  addCard(slide, {
    x: 4.48,
    y: 2.42,
    w: 3.35,
    h: 2.44,
    fill: C.white,
    accent: C.teal,
    title: "Problema real",
    body: "Ese hábito se arrastra después a proyectos mayores. Lo que hoy parece pequeño mañana puede afectar usuarios o servicios reales.",
    bodyFontSize: 14,
    bodyTop: 0.58,
  });

  addCard(slide, {
    x: 8.14,
    y: 2.42,
    w: 3.4,
    h: 2.44,
    fill: C.navy,
    line: C.navy,
    accent: C.gold,
    title: "Cambio de estándar",
    body: "Aprender desde temprano a publicar con orden y cuidado mejora el criterio técnico del curso completo.",
    titleColor: C.white,
    bodyColor: C.white,
    bodyFontSize: 14,
    bodyTop: 0.58,
  });

  slide.addShape(SH.roundRect, {
    x: 1.46,
    y: 5.38,
    w: 9.48,
    h: 0.5,
    rectRadius: 0.04,
    fill: { color: "EEF7F5" },
    line: { color: C.teal, pt: 1 },
  });
  slide.addText("La meta no es paranoia técnica: es formar hábitos que luego no haya que desaprender.", {
    x: 1.82,
    y: 5.54,
    w: 8.76,
    h: 0.12,
    fontFace: "Aptos",
    fontSize: 12,
    bold: true,
    color: C.navy,
    margin: 0,
    align: "center",
  });

  addFooter(slide, "Bloque 4 · Desarmando una excusa muy común");
  validateSlide(slide);
}

function createSecurityLayersSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    "La seguridad atraviesa varias capas",
    "No depende de una sola pieza: aparece en el recorrido completo de la aplicación.",
    "Bloque 4",
    C.coral,
    C.navy
  );

  const flow = [
    { x: 0.82, w: 2.0, title: "Navegador", body: "Entrega señales y recibe formularios.", accent: C.gold },
    { x: 3.18, w: 2.0, title: "Conexión", body: "HTTP o HTTPS cambia el nivel de protección.", accent: C.teal },
    { x: 5.54, w: 2.0, title: "Hosting", body: "La infraestructura también puede estar mal configurada.", accent: C.coral },
    { x: 7.9, w: 2.0, title: "Aplicación", body: "Procesa rutas, accesos y lógica.", accent: C.orange },
    { x: 10.26, w: 2.0, title: "Datos", body: "Credenciales y recursos sensibles requieren cuidado.", accent: C.navy },
  ];

  flow.forEach((item, index) => {
    addCard(slide, {
      x: item.x,
      y: 2.42,
      w: item.w,
      h: 1.58,
      fill: item.accent === C.navy ? C.navy : C.white,
      line: item.accent === C.navy ? C.navy : C.border,
      accent: item.accent,
      title: item.title,
      body: item.body,
      titleColor: item.accent === C.navy ? C.white : C.navy,
      bodyColor: item.accent === C.navy ? C.white : C.ink,
      titleFontSize: 13,
      bodyFontSize: 11.5,
      bodyTop: 0.54,
    });

    if (index < flow.length - 1) {
      slide.addShape(SH.chevron, {
        x: item.x + item.w + 0.08,
        y: 2.98,
        w: 0.18,
        h: 0.28,
        fill: { color: C.orange },
        line: { color: C.orange },
      });
    }
  });

  addCard(slide, {
    x: 1.22,
    y: 4.52,
    w: 10.2,
    h: 1.38,
    fill: C.white,
    accent: C.coral,
    title: "Idea central",
    body: "Cuando algo falla o se expone, no conviene culpar de inmediato a una sola parte. Hay que pensar en capas y revisar el recorrido completo.",
    bodyFontSize: 14,
    bodyTop: 0.56,
  });

  addFooter(slide, "Bloque 4 · Mirada sistémica sobre el riesgo");
  validateSlide(slide);
}

function createBlock4FlowCaseSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(slide, "Seguridad en el recorrido completo de una app", "Publicar rápido no siempre significa publicar bien.", 18, "Bloque 4", C.coral);

  addStageChain(slide, SH, {
    x: 0.82,
    y: 2.3,
    w: 10.72,
    h: 3.88,
    title: "Recorrido completo de una app publicada",
    compact: true,
    stages: [
      { step: "1", title: "Usuario", body: "Accede desde navegador.", accent: C.gold },
      { step: "2", title: "Dominio", body: "Encuentra el proyecto.", accent: C.teal },
      { step: "3", title: "DNS", body: "Orienta la solicitud.", accent: C.orange },
      { step: "4", title: "Hosting", body: "Aloja la aplicación.", accent: C.coral },
      { step: "5", title: "App", body: "Procesa rutas y datos.", accent: C.navy, tone: "dark" },
    ],
    notes: [
      {
        title: "Caso breve",
        accent: C.coral,
        body: "La interfaz carga, pero queda una ruta de prueba expuesta, una configuración incompleta y una clave visible en el proyecto.",
      },
      {
        title: "Lección",
        accent: C.gold,
        body: "Que una app funcione no garantiza que sea confiable. Publicar bien también implica revisar qué quedó realmente disponible.",
      },
    ],
    footer: "La seguridad aparece en el recorrido completo: no conviene revisar solo la pantalla final.",
  });

  addFooter(slide, "Bloque 4 · Del funcionamiento al criterio técnico");
  validateSlide(slide);
}

function createBlock4ClosingSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };

  slide.addShape(SH.ellipse, {
    x: 11.1,
    y: 0.24,
    w: 1.55,
    h: 1.55,
    fill: { color: C.gold, transparency: 8 },
    line: { color: C.gold, transparency: 100 },
  });

  slide.addText("Qué nos llevamos del Bloque 4", {
    x: 0.82,
    y: 0.92,
    w: 6.2,
    h: 0.5,
    fontFace: "Aptos Display",
    fontSize: 24,
    bold: true,
    color: C.white,
    margin: 0,
  });

  slide.addText(
    "Una aplicación web no solo debe funcionar: también debe publicarse con un nivel mínimo de seguridad, criterio y responsabilidad técnica.",
    {
      x: 0.84,
      y: 1.8,
      w: 5.98,
      h: 1.8,
      fontFace: "Aptos Display",
      fontSize: 20,
      bold: true,
      color: C.gold,
      margin: 0,
      valign: "mid",
    }
  );

  addQuestionCard(slide, {
    x: 7.0,
    y: 1.9,
    w: 5.05,
    h: 1.18,
    fill: C.white,
    line: C.white,
    title: "Pregunta 1",
    body: "¿Qué diferencia práctica existe entre HTTP y HTTPS?",
    accent: C.coral,
  });

  addQuestionCard(slide, {
    x: 7.0,
    y: 3.22,
    w: 5.05,
    h: 1.18,
    fill: C.white,
    line: C.white,
    title: "Pregunta 2",
    body: "¿Qué tipo de información nunca debería quedar expuesta en un proyecto público?",
    accent: C.teal,
  });

  addQuestionCard(slide, {
    x: 7.0,
    y: 4.54,
    w: 5.05,
    h: 1.18,
    fill: C.white,
    line: C.white,
    title: "Pregunta 3",
    body: "¿Por qué publicar rápido no siempre significa publicar correctamente?",
    accent: C.orange,
  });

  addChip(slide, "Cierre del bloque", 0.86, 6.15, 1.8, C.coral);
  slide.addText("Con esto completamos el mapa inicial de cómo funciona la Web y qué exige poner una aplicación en Internet.", {
    x: 2.9,
    y: 6.22,
    w: 6.9,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 12,
    color: C.white,
    margin: 0,
  });

  validateSlide(slide);
}

function createClassClosingSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    "Cierre de la clase",
    "La Web deja de verse como magia cuando aprendemos a nombrar sus piezas, recorridos y riesgos.",
    "Cierre",
    C.coral,
    C.white
  );

  slide.addShape(SH.roundRect, {
    x: 0.82,
    y: 2.22,
    w: 4.28,
    h: 3.78,
    rectRadius: 0.06,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  addBarsMotif(slide, 1.1, 2.58, 0.9, C.red);
  slide.addText("La Web no es magia.", {
    x: 1.1,
    y: 3.18,
    w: 2.9,
    h: 0.42,
    fontFace: "Aptos Display",
    fontSize: 24,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText(
    "Es una coordinación entre direcciones, clientes, servidores, infraestructura, seguridad y decisiones de publicación.",
    {
      x: 1.1,
      y: 3.86,
      w: 3.24,
      h: 1.08,
      fontFace: "Aptos",
      fontSize: 14,
      color: "E7EEF8",
      margin: 0,
    }
  );
  slide.addShape(SH.roundRect, {
    x: 1.08,
    y: 5.2,
    w: 3.16,
    h: 0.5,
    rectRadius: 0.04,
    fill: { color: "173250" },
    line: { color: "173250" },
  });
  slide.addText("Primera idea instalada del módulo", {
    x: 1.56,
    y: 5.36,
    w: 2.24,
    h: 0.12,
    fontFace: "Aptos",
    fontSize: 11.2,
    bold: true,
    color: C.gold,
    margin: 0,
    align: "center",
  });

  addCard(slide, {
    x: 5.46,
    y: 2.24,
    w: 3.0,
    h: 1.55,
    fill: C.white,
    accent: C.coral,
    title: "Ideas que quedan",
    body: "Internet, Web, navegador, servidor, dominio, hosting y despliegue ya no son lo mismo.",
    bodyFontSize: 13.2,
    bodyTop: 0.54,
  });
  addCard(slide, {
    x: 8.78,
    y: 2.24,
    w: 3.0,
    h: 1.55,
    fill: C.softBlue,
    line: C.softBlue,
    accent: C.navy,
    title: "Metodología",
    body: "Entender el sistema, explicitar intención, apoyarse con inteligencia y verificar con criterio.",
    bodyFontSize: 12.5,
    bodyTop: 0.54,
  });
  addCard(slide, {
    x: 5.46,
    y: 4.08,
    w: 3.0,
    h: 1.55,
    fill: C.warm,
    line: C.orange,
    accent: C.gold,
    title: "Pregunta de salida",
    body: "¿Qué parte del recorrido web te ayuda más a entender lo que antes parecía invisible?",
    bodyFontSize: 13.2,
    bodyTop: 0.54,
  });
  addCard(slide, {
    x: 8.78,
    y: 4.08,
    w: 3.0,
    h: 1.55,
    fill: C.white,
    accent: C.teal,
    title: "Próxima clase",
    body: "Seguimos con las herramientas del taller: editor, navegador, DevTools, Git y flujo de trabajo moderno.",
    bodyFontSize: 13,
    bodyTop: 0.54,
  });

  addFooter(slide, "Cierre · Mapa inicial completo y puente a la clase 02");
  validateSlide(slide);
}

function createModernBlockIntroSlide(blockLabel, title, subtitle, cards, footerText) {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };

  slide.addShape(SH.rect, {
    x: 0.66,
    y: 1.04,
    w: 0.12,
    h: 5.02,
    fill: { color: C.red },
    line: { color: C.red },
  });
  addBarsMotif(slide, 0.78, 0.94, 0.94, C.red);
  addChip(slide, blockLabel, 1.22, 0.58, 1.18, C.red, C.white);
  addMarkBox(slide, SH, logoMarkPath, {
    x: 11.18,
    y: 0.9,
    w: 0.94,
    h: 0.74,
    fill: C.softNeutral,
    imageX: 11.36,
    imageY: 1.08,
    imageW: 0.56,
    imageH: 0.3,
  });

  slide.addText(title, {
    x: 1.46,
    y: 1.42,
    w: 6.26,
    h: 0.92,
    fontFace: TYPOGRAPHY.display,
    fontSize: 27.2,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText(subtitle, {
    x: 1.48,
    y: 2.38,
    w: 6.3,
    h: 0.9,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15.4,
    color: C.sand,
    margin: 0,
  });

  cards.forEach((card, index) => {
    addCard(slide, {
      x: 1.02 + index * 3.56,
      y: 3.62,
      w: 3.08,
      h: 1.42,
      fill: index === 1 ? C.softBlue : C.white,
      line: index === 1 ? C.softBlue : C.white,
      accent: card.accent,
      title: card.title,
      body: card.body,
      bodyFontSize: 13.2,
    });
  });

  addPanel(slide, 1.02, 5.42, 10.5, 0.62, {
    fill: "173A61",
    line: "173A61",
    rectRadius: 0.04,
  });
  slide.addText(footerText, {
    x: 1.22,
    y: 5.62,
    w: 10.1,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.2,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createTitleSlide() {
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
  addBarsMotif(slide, 0.96, 0.92, 0.92, C.red);

  addPanel(slide, 9.05, 0.8, 3.55, 1.24, {
    fill: C.white,
    line: C.white,
    rectRadius: 0.05,
  });
  slide.addImage({
    path: logoPath,
    ...imageSizingContain(logoPath, 9.22, 0.94, 3.2, 0.94),
  });

  slide.addText("Clase 01 · Semana 01", {
    x: 1.78,
    y: 1.5,
    w: 3.0,
    h: 0.3,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12,
    bold: true,
    color: C.sand,
    margin: 0,
  });
  slide.addText("La Web No Es Magia", {
    x: 1.38,
    y: 2.02,
    w: 5.1,
    h: 0.6,
    fontFace: TYPOGRAPHY.display,
    fontSize: 28,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Internet, actores,\npublicación y seguridad básica", {
    x: 1.4,
    y: 2.8,
    w: 5.4,
    h: 0.94,
    fontFace: TYPOGRAPHY.display,
    fontSize: 21.8,
    bold: true,
    color: C.sand,
    margin: 0,
  });
  slide.addText(
    "Abrimos el módulo construyendo el mapa técnico inicial de la Web: qué pasa cuando cargamos una URL, cómo se comunica una solicitud y qué cambia cuando una aplicación se publica.",
    {
      x: 1.04,
      x: 1.4,
      y: 4.05,
      w: 5.1,
      h: 0.88,
      fontFace: TYPOGRAPHY.body,
      fontSize: 14,
      color: C.sand,
      margin: 0,
    }
  );

  addPanel(slide, 1.04, 5.16, 3.12, 0.82, {
    fill: "295596",
    line: "295596",
  });
  addPanel(slide, 4.4, 5.16, 4.26, 0.82, {
    fill: C.paleRed,
    line: C.paleRed,
  });
  slide.addText("Lunes 16 de marzo de 2026\n10:00 - 13:00", {
    x: 1.22,
    y: 5.35,
    w: 2.7,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11,
    color: C.white,
    margin: 0,
  });
  slide.addText("La base del curso se instala aquí: entender antes de construir.", {
    x: 4.64,
    y: 5.4,
    w: 3.78,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
  });

  validateSlide(slide);
}

function createBlock1IntroSlide() {
  createModernBlockIntroSlide(
    "Bloque 1",
    "La Web no es magia",
    "Abrimos la clase construyendo el mapa mental inicial del módulo: qué pasa cuando usamos una URL, qué diferencia hay entre Internet y Web y qué actores hacen posible una interacción.",
    [
      {
        title: "URL y recorrido",
        body: "Una acción cotidiana activa varias capas técnicas aunque el usuario no las vea.",
        accent: C.red,
      },
      {
        title: "Internet y Web",
        body: "Dos conceptos cercanos, pero no equivalentes dentro del sistema.",
        accent: C.gold,
      },
      {
        title: "Actores base",
        body: "Usuario, navegador, cliente, servidor y aplicación aparecen desde el inicio.",
        accent: C.teal,
      },
    ],
    "La meta del bloque es que abrir una página deje de verse como algo automático y pase a entenderse como un proceso técnico concreto."
  );
}

function createBlock2IntroSlide() {
  createModernBlockIntroSlide(
    "Bloque 2",
    "Cómo se comunican los actores",
    "Ahora pasamos de identificar las piezas a entender el recorrido técnico de una solicitud web y la lógica que se repite detrás de muchas acciones cotidianas.",
    [
      {
        title: "Solicitud y respuesta",
        body: "Toda interacción web ocurre como una petición del cliente y una respuesta del servidor.",
        accent: C.red,
      },
      {
        title: "HTTP",
        body: "Organiza la conversación con reglas compartidas y visibles.",
        accent: C.gold,
      },
      {
        title: "DNS",
        body: "Ayuda a localizar el servidor correcto dentro de la red.",
        accent: C.teal,
      },
    ],
    "El objetivo del bloque es que la apertura de una página deje de verse como un acto invisible y pase a entenderse como una secuencia precisa."
  );
}

function createBlock3IntroSlide() {
  createModernBlockIntroSlide(
    "Bloque 3",
    "Dónde vive una aplicación web",
    "Pasamos desde la comunicación técnica hacia la publicación real: dominio, hosting y despliegue como decisiones que sacan el proyecto del equipo local.",
    [
      {
        title: "Dominio",
        body: "Es el nombre legible con el que las personas encuentran un sitio o aplicación.",
        accent: C.gold,
      },
      {
        title: "Hosting",
        body: "La infraestructura donde realmente viven los archivos y servicios del proyecto.",
        accent: C.teal,
      },
      {
        title: "Despliegue",
        body: "El proceso que lleva una versión desde local a un entorno público.",
        accent: C.red,
      },
    ],
    "El objetivo del bloque es que publicar una app deje de verse como un acto misterioso y pase a entenderse como una cadena de decisiones técnicas."
  );
}

function createBlock4IntroSlide() {
  createModernBlockIntroSlide(
    "Bloque 4",
    "Seguridad básica y criterio al publicar",
    "Cerramos la clase entendiendo que una app no solo debe funcionar: también debe publicarse con responsabilidad técnica desde la conexión hasta los secretos del proyecto.",
    [
      {
        title: "Conexión segura",
        body: "No es lo mismo HTTP que HTTPS cuando una aplicación circula por Internet.",
        accent: C.gold,
      },
      {
        title: "Secretos y acceso",
        body: "Credenciales, claves y permisos no deberían quedar expuestos.",
        accent: C.teal,
      },
      {
        title: "Criterio al publicar",
        body: "Que una app cargue bien no significa que esté bien publicada.",
        accent: C.red,
      },
    ],
    "El objetivo del bloque es pasar de una mirada técnica básica a una mirada más responsable sobre lo que significa dejar una aplicación expuesta en la Web."
  );
}

function createUrlAnatomySlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    "Leer una URL tambi\u00e9n es una habilidad t\u00e9cnica",
    "No es necesario memorizar todo hoy, pero s\u00ed reconocer qu\u00e9 partes aparecen en una direcci\u00f3n web."
  );

  addUrlBreakdown(slide, SH, {
    x: 0.86,
    y: 2.34,
    w: 11.62,
    h: 3.74,
    title: "Partes que conviene reconocer",
    url: "https://campus.example.com/cursos?id=3",
    segments: [
      {
        label: "Protocolo",
        value: "https",
        note: "Define el esquema de acceso que usar\u00e1 el navegador.",
        accent: C.coral,
        mono: true,
        ratio: 0.92,
      },
      {
        label: "Dominio",
        value: "campus.example.com",
        note: "Nombra el sitio o servicio que queremos alcanzar.",
        accent: C.teal,
        mono: true,
        ratio: 1.96,
        valueFontSize: 12.6,
      },
      {
        label: "Ruta",
        value: "/cursos",
        note: "Apunta al recurso o secci\u00f3n pedida dentro del sitio.",
        accent: C.gold,
        mono: true,
        ratio: 1.02,
      },
      {
        label: "Par\u00e1metro",
        value: "?id=3",
        note: "Entrega un dato adicional que acompa\u00f1a la solicitud.",
        accent: C.orange,
        mono: true,
        ratio: 0.98,
      },
    ],
    footer: "Primero no memorizamos todo: aprendemos a reconocer qu\u00e9 partes suelen aparecer.",
  });

  addFooter(slide, "Bloque 1 \u00b7 Primer vistazo a la anatom\u00eda de una URL");
  validateSlide(slide);
}

function createMisconceptionsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    "Confusiones comunes que conviene corregir desde el inicio",
    "Muchas dudas t\u00e9cnicas posteriores nacen de estas simplificaciones iniciales."
  );

  addMythRealityGrid(slide, SH, {
    x: 0.82,
    y: 2.28,
    w: 11.68,
    h: 4.24,
    title: "Atajos mentales que luego confunden",
    columns: 3,
    entries: [
      {
        myth: '"Internet = Web"',
        reality: "La Web es uno de los servicios que funciona sobre Internet.",
        accent: C.coral,
      },
      {
        myth: '"Navegador = Internet"',
        reality: "El navegador es una herramienta cliente, no la red completa.",
        accent: C.teal,
        badgeFill: C.softBlue,
      },
      {
        myth: '"Abrir una p\u00e1gina es instant\u00e1neo"',
        reality: "Detr\u00e1s hay consultas, solicitudes y respuestas que ocurren muy r\u00e1pido.",
        accent: C.gold,
        badgeFill: C.warm,
      },
      {
        myth: '"Dominio, sitio y servidor son lo mismo"',
        reality: "Son piezas distintas que se coordinan cuando una app se publica.",
        accent: C.orange,
        badgeFill: "FFF6E6",
      },
      {
        myth: '"Si algo carga, entonces est\u00e1 bien"',
        reality: "Un sistema puede responder y seguir mal dise\u00f1ado, mal desplegado o expuesto.",
        accent: C.coral,
      },
    ],
    footer: "Corregir estas confusiones temprano mejora todo el resto del curso.",
  });

  addFooter(slide, "Bloque 1 \u00b7 Corregir estas ideas mejora todo el resto del curso");
  validateSlide(slide);
}

function createActorsSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(
    slide,
    "Actores principales de una interacci\u00f3n web",
    "Este mapa aparecer\u00e1 una y otra vez durante el m\u00f3dulo.",
    3
  );

  addActorLane(slide, SH, {
    x: 0.82,
    y: 2.24,
    w: 11.7,
    h: 4.34,
    title: "Quien interviene y que hace",
    railYOffset: 1.84,
    cardW: 2.04,
    entries: [
      {
        label: "Usuario",
        body: "Necesita acceder a un recurso o realizar una acci\u00f3n.",
        accent: C.coral,
      },
      {
        label: "Navegador",
        body: "Interpreta la respuesta y presenta la interfaz.",
        accent: C.teal,
      },
      {
        label: "Cliente",
        body: "Es el lado que emite la solicitud hacia la red.",
        accent: C.gold,
      },
      {
        label: "Servidor",
        body: "Recibe, procesa y prepara una respuesta.",
        accent: C.navy,
        fill: C.navy,
      },
      {
        label: "Sitio o app",
        body: "Es el producto que finalmente consume la persona usuaria.",
        accent: C.orange,
      },
    ],
    footer: 'El navegador no "contiene Internet": media entre personas, clientes y servicios remotos.',
  });

  validateSlide(slide);
}

function createWebFlowSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(
    slide,
    "El recorrido completo de una solicitud web",
    "Lo que parece instant\u00e1neo en realidad tiene varias etapas.",
    8,
    "Bloque 2",
    C.orange,
    C.navy
  );

  addStageChain(slide, SH, {
    x: 0.82,
    y: 2.26,
    w: 11.7,
    h: 4.38,
    title: "Etapas que conviene poder nombrar",
    compact: true,
    stages: [
      { step: "1", title: "URL", body: "Se escribe una direcci\u00f3n en el navegador.", accent: C.coral },
      { step: "2", title: "Dominio", body: "Se identifica el nombre a resolver.", accent: C.gold },
      { step: "3", title: "DNS", body: "Se traduce el nombre a direcci\u00f3n IP.", accent: C.teal },
      { step: "4", title: "HTTP", body: "El cliente env\u00eda la solicitud.", accent: C.orange },
      { step: "5", title: "Servidor", body: "Procesa y prepara la respuesta.", accent: C.navy, fill: C.navy, tone: "dark" },
      { step: "6", title: "Pantalla", body: "El navegador representa el contenido.", accent: C.coral },
    ],
    notes: [
      { title: "DNS", body: "Puede fallar antes de llegar al servidor.", accent: C.teal },
      { title: "Servidor", body: "Puede responder con error o recurso ausente.", accent: C.orange },
      { title: "Respuesta", body: "Puede llegar y aun as\u00ed verse mal o incompleta.", accent: C.coral },
    ],
  });

  validateSlide(slide);
}

function createBlock3FlowSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addTitle(
    slide,
    "C\u00f3mo se conectan dominio, hosting y despliegue",
    "Lo importante es entender la cadena completa, no memorizar herramientas aisladas.",
    13,
    "Bloque 3",
    C.teal
  );

  addStageChain(slide, SH, {
    x: 0.82,
    y: 2.3,
    w: 11.7,
    h: 4.08,
    title: "Cadena de publicaci\u00f3n",
    stages: [
      { step: "1", title: "En local", body: "La app se desarrolla y prueba.", accent: C.gold },
      { step: "2", title: "Despliegue", body: "Se publica una versi\u00f3n lista.", accent: C.coral, fill: C.warm },
      { step: "3", title: "Hosting", body: "La infraestructura la aloja.", accent: C.teal },
      {
        step: "4",
        title: "Dominio + DNS",
        body: "El nombre gu\u00eda el tr\u00e1fico al destino correcto.",
        accent: C.gold,
        fill: C.navy,
        tone: "dark",
      },
    ],
    notes: [
      {
        title: "Si una capa falla",
        body: "Dominio mal configurado, DNS apuntando mal, hosting ca\u00eddo o despliegue incompleto pueden romper el acceso.",
        accent: C.coral,
      },
      {
        title: "Caso simple",
        body: "Un portafolio se construye en local, se publica, se asocia a un dominio y se verifica despu\u00e9s de cada cambio.",
        accent: C.teal,
      },
    ],
  });

  addFooter(slide, "Bloque 3 \u00b7 Cadena completa de publicaci\u00f3n");
  validateSlide(slide);
}

function createSecurityLayersSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  addSimpleTitle(
    slide,
    "La seguridad atraviesa varias capas",
    "No depende de una sola pieza: aparece en el recorrido completo de la aplicaci\u00f3n.",
    "Bloque 4",
    C.coral,
    C.navy
  );

  addStageChain(slide, SH, {
    x: 0.82,
    y: 2.32,
    w: 11.68,
    h: 3.92,
    title: "Capas donde puede aparecer riesgo",
    compact: true,
    stages: [
      { step: "1", title: "Navegador", body: "Entrega se\u00f1ales y recibe formularios.", accent: C.gold },
      { step: "2", title: "Conexi\u00f3n", body: "HTTP o HTTPS cambia la protecci\u00f3n.", accent: C.teal },
      { step: "3", title: "Hosting", body: "La infraestructura tambi\u00e9n puede fallar.", accent: C.coral },
      { step: "4", title: "Aplicaci\u00f3n", body: "Procesa rutas, accesos y l\u00f3gica.", accent: C.orange },
      { step: "5", title: "Datos", body: "Credenciales y recursos sensibles requieren cuidado.", accent: C.navy, fill: C.navy, tone: "dark" },
    ],
    notes: [
      {
        title: "Idea central",
        body: "Cuando algo se expone o falla, conviene pensar en capas y revisar el recorrido completo antes de culpar a una sola pieza.",
        accent: C.coral,
      },
    ],
  });

  addFooter(slide, "Bloque 4 \u00b7 Mirada sist\u00e9mica sobre el riesgo");
  validateSlide(slide);
}

async function main() {
  const outputPptx = process.env.PPTX_OUTPUT || path.join(rootDir, "Clase-01-Bloque-1-La-Web-No-Es-Magia.pptx");
  const outputJs = process.env.PPTX_SOURCE_OUTPUT || path.join(rootDir, "Clase-01-Bloque-1-La-Web-No-Es-Magia.js");

  createTitleSlide();
  createBlock1IntroSlide();
  createWhyFoundationsMatterSlide();
  createEverydayWebSlide();
  createUrlSlide();
  createUrlAnatomySlide();
  createInternetServicesSlide();
  createMisconceptionsSlide();
  createBrowserClientSlide();
  createServerRoleSlide();
  createInternetVsWebSlide();
  createActorsSlide();
  createClientServerSlide();
  createClosingSlide();
  createBlock2IntroSlide();
  createBlock2ExamplesSlide();
  createRequestPartsSlide();
  createResponsePartsSlide();
  createMethodsSlide();
  createStatusCodesSlide();
  createDnsAnalogySlide();
  createFailurePointsSlide();
  createRequestResponseSlide();
  createHttpSlide();
  createDnsSlide();
  createWebFlowSlide();
  createBlock2ClosingSlide();
  createBlock3IntroSlide();
  createPublicationQuestionsSlide();
  createLocalVsPublishedSlide();
  createDomainSlide();
  createDomainConfusionsSlide();
  createLocalBusinessAnalogySlide();
  createHostingSlide();
  createHostingContentsSlide();
  createStaticDynamicSlide();
  createDeploySlide();
  createDeployChecklistSlide();
  createDeploymentModesSlide();
  createSymptomsByLayerSlide();
  createPortfolioWalkthroughSlide();
  createBlock3FlowSlide();
  createBlock3ClosingSlide();
  createBlock4IntroSlide();
  createSecurityProcessSlide();
  createExposureShiftSlide();
  createSecurityQuestionsSlide();
  createHttpsSlide();
  createHttpsSignalsSlide();
  createHttpsLimitsSlide();
  createSecretsSlide();
  createSensitiveDataSlide();
  createAuthDistinctionsSlide();
  createRisksHygieneSlide();
  createPublishingMistakesSlide();
  createHygieneHabitsSlide();
  createSmallProjectMythSlide();
  createSecurityLayersSlide();
  createBlock4FlowCaseSlide();
  createBlock4ClosingSlide();
  createClassClosingSlide();

  await pptx.writeFile({ fileName: outputPptx });
  fs.copyFileSync(__filename, outputJs);
  console.log(`Deck generado: ${outputPptx}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
