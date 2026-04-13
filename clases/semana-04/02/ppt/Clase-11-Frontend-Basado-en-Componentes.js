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
  addDelegationSplit,
  addMarkBox,
  addChip,
  addPill,
  addStageChain,
  addMythRealityGrid,
  addActorLane,
  addChecklistGrid,
  addComponentTree,
} = components;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
applyAiepTheme(pptx, {
  author: "Codex",
  company: "AIEP",
  subject: "Clase 11",
  title: "Frontend Basado en Componentes",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx =
  process.env.PPTX_OUTPUT ||
  path.join(rootDir, "Clase-11-Frontend-Basado-en-Componentes.pptx");
const outputJs =
  process.env.PPTX_SOURCE_OUTPUT ||
  path.join(rootDir, "Clase-11-Frontend-Basado-en-Componentes.js");

const logoPath = path.resolve(
  __dirname,
  "../../../../../.agent/skills/slides-aiep/assets/logo-aiep.png"
);
const logoMarkPath = path.resolve(
  __dirname,
  "../../../../../.agent/skills/slides-aiep/assets/logo-aiep-mark.png"
);

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function addHeader(slide, title, subtitle, blockLabel = "Bloque 1", pptxLike = pptx) {
  systemAddHeader(slide, SH, pptxLike, title, subtitle, blockLabel, {
    classLabel: `Clase 11 · ${blockLabel}`,
    logoMarkPath,
    titleY: 0.94,
    titleH: 0.66,
    subtitleY: 1.68,
    subtitleH: 0.22,
    subtitleW: 9.05,
    subtitleFontSize: 10.6,
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
  slide.addText(opts.kicker || "Bloque", {
    x,
    y: y + 0.16,
    w,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.8,
    bold: true,
    color: opts.kickerColor || C.navy,
    align: "center",
    margin: 0,
  });
  slide.addText(opts.title || "", {
    x: x + 0.2,
    y: y + 0.66,
    w: w - 0.4,
    h: h - 0.94,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.fontSize || 16.6,
    bold: true,
    color: opts.color || C.navy,
    align: "center",
    valign: "mid",
    margin: 0,
  });
}

function addArrow(slide, x, y, w = 0.22, h = 0.28, fill = C.gold) {
  slide.addShape(SH.chevron, {
    x,
    y,
    w,
    h,
    fill: { color: fill },
    line: { color: fill },
  });
}

// ─── SLIDE 1: PORTADA ────────────────────────────────────────────────────────

function createCoverSlide() {
  const slide = pptx.addSlide();

  slide.background = { color: C.navy };
  slide.addImage({
    path: logoPath,
    ...imageSizingContain(logoPath, 9.94, 0.38, 1.42, 0.82),
  });
  addBarsMotif(slide, 0.78, 0.72, 1.22, C.red);

  slide.addText("Clase 11 · Semana 04", {
    x: 1.66,
    y: 0.82,
    w: 2.7,
    h: 0.14,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11,
    bold: true,
    color: C.white,
    margin: 0,
  });

  slide.addText("Frontend basado\nen componentes", {
    x: 0.78,
    y: 1.54,
    w: 5.0,
    h: 1.1,
    fontFace: TYPOGRAPHY.display,
    fontSize: 28,
    bold: true,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });

  slide.addText("Routing, props, estado y composición", {
    x: 0.78,
    y: 2.78,
    w: 4.8,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13.6,
    color: "E5EDF6",
    margin: 0,
  });

  slide.addText(
    "Una interfaz moderna no se construye como una sola página. Se modela como un árbol de piezas con responsabilidad, navegación y estado propio.",
    {
      x: 0.78,
      y: 3.32,
      w: 4.6,
      h: 0.96,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.2,
      color: "DCE6F2",
      margin: 0,
      valign: "mid",
    }
  );

  // Date panel
  addPanel(slide, 0.78, 5.18, 3.2, 0.78, { fill: "355B8E", line: "355B8E" });
  slide.addText("Martes 7 de abril de 2026 · 10:50 - 13:10", {
    x: 1.02,
    y: 5.38,
    w: 2.8,
    h: 0.32,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.2,
    bold: true,
    color: C.white,
    margin: 0,
    breakLine: false,
  });
  slide.addShape(SH.rect, {
    x: 0.88,
    y: 5.34,
    w: 0.08,
    h: 0.42,
    fill: { color: C.red },
    line: { color: C.red },
  });

  // Right: mini component tree preview — max depth 2 to avoid node overflow
  addComponentTree(slide, SH, {
    x: 5.72,
    y: 1.36,
    w: 4.66,
    h: 3.52,
    title: "Árbol de componentes — Dashboard",
    nodes: [
      { label: "App", depth: 0 },
      { label: "DashboardLayout", depth: 1 },
      { label: "Sidebar", depth: 2 },
      { label: "Topbar", depth: 2 },
      { label: "MainContent", depth: 2 },
    ],
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 2: MAPA DE LA CLASE ────────────────────────────────────────────────

function createMapSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Cuatro bloques, un modelo mental",
    "De la pieza individual al sistema completo: componentes, navegación, flujo de datos e interacción.",
    "Bloque 1"
  );

  addMapBlock(slide, 1.12, 2.46, 2.16, 2.6, {
    kicker: "Bloque 1 · 35 min",
    title: "Árbol de\ncomponentes",
    fill: C.navy,
    line: C.navy,
    color: C.white,
    kickerColor: C.white,
    fontSize: 15.4,
  });
  addArrow(slide, 3.36, 3.62, 0.2, 0.28, C.gold);
  addMapBlock(slide, 3.62, 2.46, 2.16, 2.6, {
    kicker: "Bloque 2 · 35 min",
    title: "Routing",
    fill: C.white,
    line: C.border,
    color: C.navy,
    kickerColor: C.navy,
    fontSize: 16.6,
  });
  addArrow(slide, 5.86, 3.62, 0.2, 0.28, C.gold);
  addMapBlock(slide, 6.12, 2.46, 2.16, 2.6, {
    kicker: "Bloque 3 · 35 min",
    title: "Props y\ncomposición",
    fill: C.paleRed,
    line: C.paleRed,
    color: C.navy,
    kickerColor: C.navy,
    fontSize: 15.4,
  });
  addArrow(slide, 8.36, 3.62, 0.2, 0.28, C.gold);
  addMapBlock(slide, 8.62, 2.46, 2.16, 2.6, {
    kicker: "Bloque 4 · 35 min",
    title: "Estado",
    fill: C.white,
    line: C.border,
    color: C.navy,
    kickerColor: C.navy,
    fontSize: 16.6,
  });

  addCenterStatement(
    slide,
    SH,
    "árbol de piezas → navegación → flujo de datos → respuesta a la interacción",
    {
      x: 1.54,
      y: 5.46,
      w: 9.0,
      h: 0.72,
      fill: C.softNeutral,
      line: C.softNeutral,
      fontSize: 16.2,
    }
  );

  validateSlide(slide, pptx);
}

// ─── SLIDE 3: BLOQUE 1 APERTURA ───────────────────────────────────────────────

function createBlock1IntroSlide() {
  const slide = pptx.addSlide();

  slide.background = { color: C.navy };

  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });

  addChip(slide, SH, "BLOQUE 1", {
    x: 0.88,
    y: 0.68,
    w: 1.32,
    h: 0.34,
    fill: C.red,
    color: C.white,
    fontSize: 10.6,
    rectRadius: 0.05,
  });

  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);

  slide.addText("Pensar la interfaz\ncomo árbol de componentes", {
    x: 0.88,
    y: 2.14,
    w: 9.2,
    h: 1.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 36,
    bold: true,
    color: C.white,
    margin: 0,
    valign: "mid",
  });

  slide.addText("Del archivo único a la interfaz compuesta con responsabilidad y reutilización", {
    x: 0.88,
    y: 3.62,
    w: 7.4,
    h: 0.38,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15.2,
    color: "DCE6F2",
    margin: 0,
    valign: "mid",
  });

  addPanel(slide, 0.88, 5.84, 2.8, 0.4, { fill: "173A5A", line: "173A5A" });
  slide.addText("35 minutos · expositivo y conversado", {
    x: 1.04,
    y: 5.92,
    w: 2.6,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.4,
    color: "A8C4E0",
    margin: 0,
    valign: "mid",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 4: EL LÍMITE DEL ARCHIVO ÚNICO ─────────────────────────────────────

function createSingleFileLimit() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El modelo de página única empieza a fallar",
    "Bloque 1 · 1.1 Del archivo único a la interfaz compuesta",
    "Bloque 1"
  );

  addCenterStatement(
    slide,
    SH,
    "index.html + styles.css + script.js → funciona para empezar.",
    {
      x: 0.88,
      y: 2.22,
      w: 10.26,
      h: 0.56,
      fill: C.softBlue,
      line: C.softBlue,
      fontSize: 17,
      color: C.navy,
    }
  );

  slide.addText("Cuando la interfaz crece, aparecen estas señales:", {
    x: 0.98,
    y: 2.92,
    w: 4.44,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.2,
    bold: true,
    color: C.slate,
    margin: 0,
  });

  // 4 stacked miniCards (left) — Codex pattern
  const symptoms = [
    { title: "Estructuras que se repiten", body: "Un mismo bloque visual aparece copiado tres veces en distintas partes del código." },
    { title: "Tarjetas sin reutilización", body: "La misma tarjeta de producto vive en tres páginas distintas, duplicada a mano." },
    { title: "Cambios que se propagan demasiado", body: "Modificar el estilo de un elemento obliga a editar muchos archivos a la vez." },
    { title: "Interfaz difícil de mantener", body: "Nadie sabe con certeza qué toca qué. El proyecto se vuelve frágil." },
  ];

  symptoms.forEach((s, i) => {
    addMiniCard(slide, SH, {
      x: 0.98,
      y: 3.2 + i * 0.82,
      w: 4.44,
      h: 0.72,
      title: s.title,
      body: s.body,
      accent: C.red,
      fill: C.paleRed,
      line: C.paleRed,
      titleFontSize: 11.4,
      bodyFontSize: 8.4,
    });
  });

  // Right: code panel showing the bloated single-file problem
  addCodePanel(slide, SH, {
    x: 5.72,
    y: 2.92,
    w: 4.74,
    h: 3.36,
    title: "index.html — seis semanas después",
    code:
      "<!-- primera iteración -->\n" +
      '<div class="tarjeta">...</div>\n' +
      '<div class="tarjeta">...</div>\n' +
      "\n" +
      "<!-- copiada para otra página -->\n" +
      '<div class="tarjeta nuevo-estilo">...</div>\n' +
      '<div class="tarjeta tarjeta-v2">...</div>\n' +
      "\n" +
      "<!-- ¿cuál es la versión correcta? -->\n" +
      '<div class="tarjeta tarjeta-final">...</div>\n' +
      '<div class="tarjeta tarjeta-final-2">...</div>',
    lang: "html",
    fontSize: 8.6,
    textOffsetY: 0.72,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  addCenterStatement(slide, SH,
    "El problema no es el tamaño del archivo — es que la estructura deja de tener responsabilidades claras.",
    {
      x: 0.88,
      y: 6.42,
      w: 10.26,
      h: 0.52,
      fill: C.softNeutral,
      line: C.softNeutral,
      fontSize: 9.4,
    }
  );

  validateSlide(slide, pptx);
}

// ─── SLIDE 5: LA RESPUESTA — COMPONENTES ──────────────────────────────────────

function createComponentsAnswer() {
  const slide = pptx.addSlide();

  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 1", {
    x: 0.88,
    y: 0.54,
    w: 1.32,
    h: 0.3,
    fill: C.red,
    color: C.white,
    fontSize: 10.0,
    rectRadius: 0.05,
  });

  slide.addText("Dividir la interfaz en componentes.", {
    x: 0.88,
    y: 1.36,
    w: 9.52,
    h: 1.1,
    fontFace: TYPOGRAPHY.display,
    fontSize: 42,
    bold: true,
    color: C.white,
    margin: 0,
    valign: "mid",
    fit: "shrink",
  });

  slide.addText("Una idea simple pero poderosa.", {
    x: 0.88,
    y: 2.62,
    w: 5.0,
    h: 0.36,
    fontFace: TYPOGRAPHY.body,
    fontSize: 17.4,
    color: "DCE6F2",
    margin: 0,
    valign: "mid",
  });

  addPanel(slide, 0.88, 3.36, 10.28, 0.94, { fill: "173A5A", line: "173A5A", rectRadius: 0.06 });
  slide.addText(
    "Un componente no es solo un fragmento visual. Es una pieza con propósito.",
    {
      x: 1.1,
      y: 3.5,
      w: 9.8,
      h: 0.64,
      fontFace: TYPOGRAPHY.display,
      fontSize: 20,
      bold: true,
      color: C.gold,
      margin: 0,
      valign: "mid",
    }
  );

  slide.addText("Cada pieza puede vivir, evolucionar y reutilizarse por separado.", {
    x: 0.88,
    y: 4.58,
    w: 8.0,
    h: 0.3,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13.4,
    color: "B8CEE2",
    margin: 0,
    valign: "mid",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 6: TRES CARACTERÍSTICAS ────────────────────────────────────────────

function createThreeCharacteristics() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Qué es realmente un componente",
    "Bloque 1 · 1.2 Tres características de una pieza bien definida",
    "Bloque 1"
  );

  const cards = [
    {
      accent: C.navy,
      title: "1. Propósito claro",
      body: "No existe para «partir el código por sí». Resuelve una parte identificable de la interfaz.",
    },
    {
      accent: C.red,
      title: "2. Puede reutilizarse",
      body: "Si una tarjeta aparece varias veces con distinto contenido, probablemente conviene que sea un componente.",
    },
    {
      accent: C.gold,
      title: "3. Puede componerse con otros",
      body: "Una pantalla se arma combinando piezas más pequeñas. No se rehace desde cero en cada ruta.",
    },
  ];

  cards.forEach((card, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44,
      y: 2.22,
      w: 3.2,
      h: 3.52,
      title: card.title,
      body: card.body,
      accent: card.accent,
      accentW: 0.07,
      fill: C.white,
      line: C.border,
      titleFontSize: 13.8,
      bodyFontSize: 11.2,
      rectRadius: 0.06,
    });
  });

  addCenterStatement(slide, SH,
    "Un componente no es solo un fragmento de código — es una decisión de diseño sobre dónde vive una responsabilidad.",
    {
      x: 0.88,
      y: 5.88,
      w: 10.26,
      h: 0.52,
      fill: C.softBlue,
      line: C.softBlue,
      fontSize: 9.4,
    }
  );

  validateSlide(slide, pptx);
}

// ─── SLIDE 7: NOMBRES REALES ───────────────────────────────────────────────────

function createRealNames() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Nombres que aparecen en proyectos reales",
    "Bloque 1 · 1.2 Cómo nombra un componente un desarrollador que trabaja con equipos",
    "Bloque 1"
  );

  // Left: 3 stacked miniCards — Codex pattern
  const contextCards = [
    { title: "No se habla de «la página»", body: "El equipo habla de piezas: Navbar, Sidebar, ProductCard, UserBadge, SearchBar." },
    { title: "Cada nombre identifica algo concreto", body: "DashboardLayout organiza. StatCard muestra un valor. FilterPanel filtra. El nombre lo dice." },
    { title: "El vocabulario es parte del diseño", body: "Nombrar bien los componentes es decidir bien sus responsabilidades." },
  ];

  contextCards.forEach((c, i) => {
    addMiniCard(slide, SH, {
      x: 0.98,
      y: 2.22 + i * 1.08,
      w: 4.44,
      h: 0.92,
      title: c.title,
      body: c.body,
      accent: C.navy,
      fill: C.softBlue,
      line: C.softBlue,
      titleFontSize: 11.4,
      bodyFontSize: 8.4,
    });
  });

  // Right: visual chip grid
  const names = ["Navbar", "Sidebar", "ProductCard", "UserBadge", "SearchBar", "DashboardLayout", "Modal", "Button", "InputField", "FilterPanel"];
  const chipW = 2.56;
  const chipH = 0.46;
  const gapX = 0.22;
  const gapY = 0.24;
  const startX = 5.72;
  const startY = 2.22;
  const cols = 2;

  names.forEach((name, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (chipW + gapX);
    const y = startY + row * (chipH + gapY);
    const isLayout = name.includes("Layout") || name.includes("Dashboard") || name === "Modal";
    addChip(slide, SH, name, {
      x,
      y,
      w: chipW,
      h: chipH,
      fill: isLayout ? C.navy : C.softBlue,
      color: isLayout ? C.white : C.navy,
      fontSize: 11.4,
      rectRadius: 0.06,
    });
  });

  addCenterStatement(slide, SH,
    "En un proyecto real, si alguien dice «toca el ProductCard», todos saben exactamente qué archivo abrir.",
    {
      x: 0.88,
      y: 5.92,
      w: 10.26,
      h: 0.52,
      fill: C.softNeutral,
      line: C.softNeutral,
      fontSize: 9.4,
    }
  );

  validateSlide(slide, pptx);
}

// ─── SLIDE 8: CÓMO LEER UNA PANTALLA ──────────────────────────────────────────

function createReadingAScreen() {
  const slide = pptx.addSlide();

  slide.background = { color: C.softBlue };

  addHeader(
    slide,
    "Antes de seguir: cuatro preguntas para leer una pantalla",
    "Bloque 1 · El cambio de perspectiva que introduce el modelo de componentes",
    "Bloque 1"
  );

  // Full-width stacked cards — Codex's activation question pattern
  const questions = [
    { n: "1.", q: "¿Qué piezas componen esta interfaz?", body: "Identifica qué partes parecen independientes antes de mirar el código.", accent: C.navy },
    { n: "2.", q: "¿Qué responsabilidad tiene cada una?", body: "¿Organiza el layout? ¿Muestra un dato? ¿Captura una interacción?", accent: C.navy },
    { n: "3.", q: "¿Qué se repite con distinto contenido?", body: "Si ves el mismo patrón visual con datos distintos, probablemente hay un componente reutilizable.", accent: C.navy },
    { n: "4.", q: "¿Qué conviene que viva separado?", body: "Si cambiar una pieza debería poder hacerse sin tocar todo lo demás, merece vivir aparte.", accent: C.red },
  ];

  questions.forEach((item, i) => {
    addCard(slide, SH, {
      x: 1.08,
      y: 2.22 + i * 1.12,
      w: 9.9,
      h: 1.02,
      title: `${item.n} ${item.q}`,
      body: item.body,
      fill: C.white,
      line: C.border,
      accent: item.accent,
      accentW: 0.07,
      titleFontSize: 13.8,
      bodyFontSize: 9.4,
      rectRadius: 0.05,
    });
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 9: EL ÁRBOL — DASHBOARD ────────────────────────────────────────────

function createComponentTreeSlide() {
  const slide = pptx.addSlide();

  // Full-bleed tree on left (no header strip — tree has its own title)
  // 10 nodes × 0.54 rowStep + 0.74 header + 0.32 last node = 6.46" → h=6.66 fits
  // w=6.2 so depth-4 nodes (nodeX=4.96, nodeW=1.64) stay within right edge 6.74
  addComponentTree(slide, SH, {
    x: 0.54,
    y: 0.54,
    w: 6.2,
    h: 6.66,
    title: "Dashboard — árbol de componentes",
    nodes: [
      { label: "App", depth: 0, meta: "raíz de la aplicación" },
      { label: "DashboardLayout", depth: 1, meta: "organiza la pantalla" },
      { label: "Sidebar", depth: 2, meta: "navegación lateral" },
      { label: "Topbar", depth: 2, meta: "cabecera global" },
      { label: "MainContent", depth: 2, meta: "área principal" },
      { label: "SectionTitle", depth: 3, meta: "título de sección" },
      { label: "StatsGrid", depth: 3, meta: "contenedor de stats" },
      { label: "StatCard", depth: 4, meta: "tarjeta individual ×3" },
      { label: "ActivityList", depth: 3, meta: "lista de actividad" },
      { label: "ActivityItem", depth: 4, meta: "ítem de actividad ×3" },
    ],
  });

  // Right: 3 annotation cards stacked (y from 0.54, gap of 2.08)
  const annotations = [
    { label: "Contenedores", body: "DashboardLayout, MainContent, StatsGrid organizan el espacio y los hijos.", accent: C.navy, fill: C.white },
    { label: "Visuales reutilizables", body: "StatCard y ActivityItem son piezas independientes con contenido variable.", accent: C.red, fill: C.white },
    { label: "Niveles de responsabilidad", body: "Cada nivel del árbol resuelve un problema distinto de la interfaz.", accent: C.gold, fill: C.white },
  ];

  annotations.forEach((ann, i) => {
    addCard(slide, SH, {
      x: 7.02,
      y: 0.54 + i * 2.08,
      w: 3.36,
      h: 1.9,
      title: ann.label,
      body: ann.body,
      accent: ann.accent,
      accentW: 0.07,
      fill: ann.fill,
      line: C.border,
      titleFontSize: 12.8,
      bodyFontSize: 11.0,
      rectRadius: 0.06,
    });
  });

  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 6.72, w: 0.52, h: 0.52 });

  validateSlide(slide, pptx);
}

// ─── SLIDE 10: CONTENEDOR vs VISUAL ────────────────────────────────────────────

function createContainerVsVisual() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "DashboardLayout no es lo mismo que StatCard",
    "Bloque 1 · 1.3 Niveles distintos de responsabilidad en el árbol",
    "Bloque 1"
  );

  addDelegationSplit(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 4.54,
    title: "Responsabilidad en el árbol",
    left: {
      title: "DashboardLayout",
      subtitle: "Componente organizador",
      items: [
        "Define la estructura visual de la pantalla completa",
        "Contiene a Sidebar, Topbar y MainContent",
        "Decide el layout general: columnas, franjas, espacios",
        "Cambia si la estructura de la pantalla cambia",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "StatCard",
      subtitle: "Componente visual reutilizable",
      items: [
        "Resuelve una sola tarjeta con un valor específico",
        "No sabe nada del layout que la contiene",
        "Se puede usar en cualquier sección sin cambiar",
        "Cambia solo si cambia cómo se muestra un stat",
      ],
      accent: C.red,
      fill: C.paleRed,
    },
    bridgeLabel: "vs",
    bridgeBody: "jerarquía de\nresponsabilidad",
    footer: "Leer bien esa jerarquía evita crear componentes sin criterio o dejarlos demasiado grandes.",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 11: ¿CUÁNDO SEPARAR? ───────────────────────────────────────────────

function createWhenToSeparate() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "¿Cuándo conviene separar un componente?",
    "Bloque 1 · 1.4 Cuatro preguntas para decidir si una pieza merece vivir aparte",
    "Bloque 1"
  );

  addChecklistGrid(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 4.54,
    title: "Preguntas para decidir",
    columns: 2,
    entries: [
      {
        badge: "1",
        title: "¿Aparece más de una vez?",
        body: "Si el mismo patrón visual se repite con distinto contenido, separarlo tiene sentido claro.",
        accent: C.navy,
        fill: C.softBlue,
        badgeFill: C.navy,
      },
      {
        badge: "2",
        title: "¿Tiene responsabilidad distinguible?",
        body: "Si puedes nombrarla con precisión y explicar qué hace sin describir la pantalla completa.",
        accent: C.red,
        fill: C.paleRed,
        badgeFill: C.red,
      },
      {
        badge: "3",
        title: "¿Vale la pena modificarla sola?",
        body: "Si cambiar esa pieza no debería afectar todo lo demás, merece su propio espacio.",
        accent: C.gold,
        fill: C.softNeutral,
        badgeFill: "B8962A",
      },
      {
        badge: "4",
        title: "¿Su lógica o estructura merece vivir aparte?",
        body: "Si la complejidad interna es suficiente para leer por separado, separarla mejora la legibilidad.",
        accent: C.navy,
        fill: C.softBlue,
        badgeFill: C.navy,
      },
    ],
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 12: SÍ CONVIENE / NO SIEMPRE ──────────────────────────────────────

function createYesNoSeparate() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Separar con criterio, no por reflejo",
    "Bloque 1 · 1.4 Ejemplos donde sí conviene y donde no siempre conviene separar",
    "Bloque 1"
  );

  addDelegationSplit(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 4.54,
    title: "Cuándo separar",
    left: {
      title: "Sí conviene separar",
      subtitle: "Cuando la pieza tiene propósito propio",
      items: [
        "Tarjetas que se repiten con distinto contenido",
        "Botones con variantes o comportamientos distintos",
        "Headers de sección reutilizables",
        "Layouts compartidos entre varias rutas",
        "Ítems de lista con estructura uniforme",
        "Modales o paneles que aparecen en múltiples contextos",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "No siempre conviene",
      subtitle: "Cuando separar añade ruido sin claridad",
      items: [
        "Un bloque minúsculo que aparece solo una vez",
        "Una estructura tan pequeña que al extraerla confunde más",
        "Componentes creados solo por obsesión con fragmentar",
        "Piezas que no tienen nombre preciso ni responsabilidad clara",
      ],
      accent: C.red,
      fill: C.paleRed,
    },
    bridgeLabel: "criterio",
    bridgeBody: "¿mejora la claridad\ny el mantenimiento?",
    footer: "Separar tiene costo: más archivos, más contexto. Solo vale la pena si el resultado es más legible.",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 13: LA REGLA ────────────────────────────────────────────────────────

function createTheRule() {
  const slide = pptx.addSlide();

  slide.background = { color: C.softNeutral };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 1", {
    x: 0.88,
    y: 0.54,
    w: 1.32,
    h: 0.3,
    fill: C.navy,
    color: C.white,
    fontSize: 10.0,
    rectRadius: 0.05,
  });

  slide.addText("La regla útil no es:", {
    x: 0.88,
    y: 1.54,
    w: 8.0,
    h: 0.32,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13.4,
    color: C.slate,
    margin: 0,
  });

  slide.addText("«mientras más componentes, mejor»", {
    x: 0.88,
    y: 1.98,
    w: 9.0,
    h: 0.72,
    fontFace: TYPOGRAPHY.display,
    fontSize: 30,
    bold: true,
    color: C.red,
    margin: 0,
    valign: "mid",
  });

  slide.addText("sino:", {
    x: 0.88,
    y: 2.86,
    w: 2.0,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13.4,
    color: C.slate,
    margin: 0,
  });

  addPanel(slide, 0.88, 3.26, 10.28, 1.06, { fill: C.navy, line: C.navy, rectRadius: 0.08 });
  slide.addText(
    "Un buen componente hace más clara la interfaz\ny más fácil su mantenimiento.",
    {
      x: 1.1,
      y: 3.38,
      w: 9.8,
      h: 0.82,
      fontFace: TYPOGRAPHY.display,
      fontSize: 24,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
      valign: "mid",
    }
  );

  addMiniCard(slide, SH, {
    x: 0.88,
    y: 4.72,
    w: 10.28,
    h: 0.7,
    title: "Separar tiene costo: más archivos, más contexto para leer. Solo vale la pena si el resultado es más claro.",
    body: "",
    fill: C.sand,
    line: C.sand,
    accent: C.gold,
    titleFontSize: 11.4,
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 14: EL AGENTE EN ESTE BLOQUE ──────────────────────────────────────

function createAgentBlock1() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El agente puede proponer — tú validas el criterio",
    "Bloque 1 · Huella metodológica: IA y agentes en componentes",
    "Bloque 1"
  );

  addDelegationSplit(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 4.54,
    title: "Qué delegar y qué no delegar",
    left: {
      title: "El agente puede ayudar a",
      subtitle: "Tareas donde la IA agrega velocidad real",
      items: [
        "Proponer una primera separación en componentes",
        "Nombrar piezas de una interfaz con vocabulario estándar",
        "Bosquejar un árbol App → Layout → Componentes hijos",
        "Convertir una maqueta grande en piezas más pequeñas",
      ],
      accent: C.navy,
      fill: C.softBlue,
      dark: false,
    },
    right: {
      title: "No conviene delegar ciegamente",
      subtitle: "Requiere tu criterio técnico",
      items: [
        "El criterio de separación: ¿tiene responsabilidad real?",
        "Validar si los nombres elegidos tienen sentido como diseño",
        "Detectar componentes artificiales sin propósito claro",
        "Decidir si la estructura propuesta mejora o complica la lectura",
      ],
      accent: C.red,
      fill: C.paleRed,
      dark: false,
    },
    bridgeLabel: "→",
    bridgeBody: "propone\nvalidas",
    footer: "Un agente puede partir una pantalla en demasiados componentes o crear nombres arbitrarios. El modelo mental lo pones tú.",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 15: PREGUNTAS GUÍA ─────────────────────────────────────────────────

function createGuideQuestions() {
  const slide = pptx.addSlide();

  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 1", {
    x: 0.88,
    y: 0.44,
    w: 3.4,
    h: 0.3,
    fill: C.navy,
    color: C.white,
    fontSize: 10.0,
    rectRadius: 0.05,
  });

  const questions = [
    {
      n: "01",
      text: "¿Qué diferencia hay entre «partir una página en trozos» y diseñar componentes con responsabilidad real?",
    },
    {
      n: "02",
      text: "Mirando una landing o dashboard, ¿qué piezas parecen reutilizables y cuáles parecen demasiado específicas?",
    },
    {
      n: "03",
      text: "¿Qué problema aparece cuando una misma tarjeta se copia tres veces en vez de modelarse como componente?",
    },
  ];

  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, {
      x: 0.88,
      y: y + 0.04,
      w: 0.58,
      h: 0.68,
      fontFace: TYPOGRAPHY.display,
      fontSize: 38,
      bold: true,
      color: C.border,
      margin: 0,
      valign: "mid",
    });
    slide.addText(q.text, {
      x: 1.6,
      y,
      w: 8.72,
      h: 1.56,
      fontFace: TYPOGRAPHY.body,
      fontSize: 15.6,
      color: C.navy,
      margin: 0,
      valign: "mid",
    });
    if (i < 2) {
      slide.addShape(SH.line, {
        x: 0.88,
        y: y + 1.72,
        w: 10.28,
        h: 0,
        line: { color: C.border, pt: 1 },
      });
    }
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 16: SÍNTESIS Y CIERRE B1 ──────────────────────────────────────────

function createBlock1Close() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Síntesis del Bloque 1",
    "Bloque 1 · Lo que se instala antes de avanzar al routing",
    "Bloque 1"
  );

  addCenterStatement(
    slide,
    SH,
    "Una interfaz moderna no se construye como un bloque único.\nSe compone de piezas con responsabilidad y posibilidad de reutilización.",
    {
      x: 0.88,
      y: 2.22,
      w: 10.26,
      h: 1.14,
      fill: C.navy,
      line: C.navy,
      fontSize: 16.4,
      color: C.white,
      rectRadius: 0.07,
    }
  );

  // 3 key ideas
  const ideas = [
    { label: "Componente", body: "Una pieza con propósito, reutilizable y composable con otras." },
    { label: "Árbol", body: "Una pantalla se lee como jerarquía de componentes con distintos niveles de responsabilidad." },
    { label: "Criterio", body: "Separar tiene valor cuando clarifica la interfaz, no cuando es reflejo automático." },
  ];

  ideas.forEach((idea, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44,
      y: 3.62,
      w: 3.2,
      h: 1.96,
      title: idea.label,
      body: idea.body,
      accent: [C.navy, C.red, C.gold][i],
      accentW: 0.07,
      fill: C.white,
      line: C.border,
      titleFontSize: 13.2,
      bodyFontSize: 11.2,
      rectRadius: 0.06,
    });
  });

  addMiniCard(slide, SH, {
    x: 0.88,
    y: 5.82,
    w: 10.26,
    h: 0.62,
    title: "Bloque 2 →",
    body: "Una vez que entendemos qué piezas componen la interfaz, el siguiente paso es entender cómo la aplicación organiza sus vistas y navegación. Ahí aparece el routing.",
    fill: C.softNeutral,
    line: C.softNeutral,
    accent: C.gold,
    titleFontSize: 11.0,
    bodyFontSize: 10.4,
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 17: BLOQUE 2 APERTURA ─────────────────────────────────────────────

function createBlock2IntroSlide() {
  const slide = pptx.addSlide();

  slide.background = { color: C.navy };

  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });

  addChip(slide, SH, "BLOQUE 2", {
    x: 0.88,
    y: 0.68,
    w: 1.32,
    h: 0.34,
    fill: C.red,
    color: C.white,
    fontSize: 10.6,
    rectRadius: 0.05,
  });

  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);

  slide.addText("Routing como estructura\nde navegación y vistas", {
    x: 0.88,
    y: 2.14,
    w: 9.2,
    h: 1.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 36,
    bold: true,
    color: C.white,
    margin: 0,
    valign: "mid",
  });

  slide.addText("De la página única al sistema de vistas: rutas, layouts y navegación como arquitectura", {
    x: 0.88,
    y: 3.62,
    w: 7.6,
    h: 0.38,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15.2,
    color: "DCE6F2",
    margin: 0,
    valign: "mid",
  });

  addPanel(slide, 0.88, 5.84, 2.8, 0.4, { fill: "173A5A", line: "173A5A" });
  slide.addText("35 minutos · expositivo con lectura guiada", {
    x: 1.04,
    y: 5.92,
    w: 2.6,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.4,
    color: "A8C4E0",
    margin: 0,
    valign: "mid",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 18: PÁGINA ÚNICA VS. APLICACIÓN CON VISTAS ─────────────────────────

function createSinglePageVsApp() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Sitio de una página vs. aplicación con vistas",
    "Bloque 2 · 2.1 Cuándo el modelo de una página única deja de alcanzar",
    "Bloque 2"
  );

  addCard(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 4.54,
    h: 3.96,
    title: "Sitio de una sola página",
    body: "Un archivo, un documento, un destino.\n\nFunciona bien para una landing o página informativa.\n\nTodo el contenido relevante vive en un solo lugar.",
    accent: C.slate,
    accentW: 0.07,
    fill: C.white,
    line: C.border,
    titleFontSize: 17,
    bodyFontSize: 11.4,
    rectRadius: 0.06,
  });

  addArrow(slide, 5.56, 4.06, 0.22, 0.28, C.gold);

  addCard(slide, SH, {
    x: 5.92,
    y: 2.22,
    w: 4.54,
    h: 3.96,
    title: "Aplicación con vistas",
    body: "Inicio, panel, perfil, productos, detalle, acceso.\n\nEl usuario se mueve entre pantallas relacionadas.\n\n¿En qué vista estoy? ¿Cómo llegué aquí? ¿Qué ruta es esta?",
    accent: C.navy,
    accentW: 0.07,
    fill: C.softBlue,
    line: C.softBlue,
    titleFontSize: 17,
    bodyFontSize: 11.4,
    rectRadius: 0.06,
  });

  addCenterStatement(slide, SH,
    "Cuando el producto crece, ya no hablamos solo de «una página» — hablamos de vistas.",
    {
      x: 0.88,
      y: 6.36,
      w: 10.26,
      h: 0.52,
      fill: C.softNeutral,
      line: C.softNeutral,
      fontSize: 9.4,
    }
  );

  validateSlide(slide, pptx);
}

// ─── SLIDE 19: LAS NUEVAS PREGUNTAS ──────────────────────────────────────────

function createNewQuestions() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Las preguntas cambian cuando hay vistas",
    "Bloque 2 · 2.1 Qué empieza a preguntar el desarrollador frente a una app con navegación",
    "Bloque 2"
  );

  addCenterStatement(slide, SH,
    "La pregunta deja de ser solo «qué se muestra».",
    {
      x: 0.88,
      y: 2.22,
      w: 10.26,
      h: 0.78,
      fill: C.navy,
      line: C.navy,
      fontSize: 18.4,
      color: C.white,
      rectRadius: 0.06,
    }
  );

  slide.addText("Pasa a ser también:", {
    x: 0.88,
    y: 3.12,
    w: 3.0,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.2,
    color: C.slate,
    margin: 0,
  });

  const questions = [
    { q: "¿En qué vista estoy?", even: true },
    { q: "¿Cómo llegué hasta aquí?", even: false },
    { q: "¿Qué ruta representa esta pantalla?", even: true },
    { q: "¿Qué cambia y qué se mantiene cuando navego?", even: false },
  ];

  questions.forEach((item, i) => {
    addMiniCard(slide, SH, {
      x: 0.88,
      y: 3.44 + i * 0.78,
      w: 10.26,
      h: 0.64,
      title: item.q,
      body: "",
      accent: item.even ? C.navy : C.red,
      fill: item.even ? C.softBlue : C.white,
      line: item.even ? C.softBlue : C.border,
      titleFontSize: 14.0,
    });
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 20: QUÉ ES ROUTING ─────────────────────────────────────────────────

function createWhatIsRouting() {
  const slide = pptx.addSlide();

  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 2", {
    x: 0.88,
    y: 0.44,
    w: 1.32,
    h: 0.3,
    fill: C.navy,
    color: C.white,
    fontSize: 10.0,
    rectRadius: 0.05,
  });

  slide.addText("Routing es el mecanismo que", {
    x: 0.88,
    y: 1.04,
    w: 9.0,
    h: 0.36,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.4,
    color: C.slate,
    margin: 0,
    valign: "mid",
  });

  addCenterStatement(slide, SH,
    "conecta una ruta con una vista o estructura de interfaz.",
    {
      x: 0.88,
      y: 1.52,
      w: 10.26,
      h: 0.88,
      fill: C.navy,
      line: C.navy,
      fontSize: 20.4,
      color: C.white,
      rectRadius: 0.07,
    }
  );

  slide.addText("Decide qué pantalla o conjunto de componentes debe mostrarse\nsegún la ubicación actual dentro de la aplicación.", {
    x: 0.88,
    y: 2.58,
    w: 10.26,
    h: 0.62,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.8,
    color: C.navy,
    margin: 0,
    valign: "mid",
  });

  // Routes grid — 2 columns × 3 rows
  const routes = [
    { r: "/", label: "Inicio" },
    { r: "/dashboard", label: "Panel principal" },
    { r: "/productos", label: "Catálogo" },
    { r: "/productos/42", label: "Detalle de producto" },
    { r: "/perfil", label: "Perfil de usuario" },
    { r: "/login", label: "Acceso" },
  ];

  const cW = 4.6;
  const cH = 0.56;
  const gapY = 0.18;
  const routeStartY = 3.44;

  routes.forEach((item, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = col === 0 ? 0.88 : 5.72;
    const y = routeStartY + row * (cH + gapY);
    const isDark = col === 0;

    addPanel(slide, x, y, cW, cH, {
      fill: isDark ? C.navy : C.softBlue,
      line: isDark ? C.navy : C.softBlue,
    });
    slide.addText(item.r, {
      x: x + 0.18,
      y,
      w: 2.0,
      h: cH,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.6,
      bold: true,
      color: isDark ? C.gold : C.navy,
      margin: 0,
      valign: "mid",
    });
    slide.addText("→  " + item.label, {
      x: x + 2.14,
      y,
      w: 2.24,
      h: cH,
      fontFace: TYPOGRAPHY.body,
      fontSize: 10.4,
      color: isDark ? "A8C4E0" : C.slate,
      margin: 0,
      valign: "mid",
    });
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 21: QUÉ PERMITE EL ROUTING ────────────────────────────────────────

function createWhatRoutingEnables() {
  const slide = pptx.addSlide();

  slide.background = { color: C.softBlue };

  addHeader(
    slide,
    "El routing no es solo cambiar de URL",
    "Bloque 2 · 2.2 Cuatro formas en que el routing organiza la aplicación",
    "Bloque 2"
  );

  const items = [
    {
      title: "Separar vistas por propósito",
      body: "Cada pantalla tiene un componente raíz propio con su lógica y presentación.",
      accent: C.navy,
    },
    {
      title: "Definir navegación clara",
      body: "Usuarios y código saben cómo moverse entre pantallas — no hay saltos sin estructura.",
      accent: C.navy,
    },
    {
      title: "Mantener layouts compartidos",
      body: "Sidebar, topbar o footer existen una sola vez, compartidos entre todas las rutas que los necesiten.",
      accent: C.red,
    },
    {
      title: "Pensar la app como sistema de pantallas conectadas",
      body: "No un documento enorme — una red de vistas con flujo de navegación explícito entre ellas.",
      accent: C.gold,
    },
  ];

  items.forEach((item, i) => {
    addCard(slide, SH, {
      x: 1.08,
      y: 2.22 + i * 1.1,
      w: 9.9,
      h: 1.0,
      title: item.title,
      body: item.body,
      fill: C.white,
      line: C.border,
      accent: item.accent,
      accentW: 0.07,
      titleFontSize: 13.8,
      bodyFontSize: 9.4,
      rectRadius: 0.05,
    });
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 22: VISTA, RUTA Y LAYOUT NO SON LO MISMO ─────────────────────────

function createVistaRutaLayout() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Vista, ruta y layout no son lo mismo",
    "Bloque 2 · 2.3 Tres conceptos que se suelen mezclar en aplicaciones modernas",
    "Bloque 2"
  );

  const cards = [
    {
      accent: C.navy,
      title: "Ruta",
      body: "La dirección o segmento que identifica una ubicación dentro de la app.\n\nEjemplos:\n/dashboard · /productos · /usuarios/15",
    },
    {
      accent: C.red,
      title: "Vista o página",
      body: "La pantalla que se renderiza para esa ruta.\n\nPuede estar formada por varios componentes ensamblados.",
    },
    {
      accent: C.gold,
      title: "Layout",
      body: "La estructura compartida que se mantiene entre varias vistas.\n\nEjemplo: sidebar, topbar, footer, contenedor principal.",
    },
  ];

  cards.forEach((card, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44,
      y: 2.22,
      w: 3.2,
      h: 3.72,
      title: card.title,
      body: card.body,
      accent: card.accent,
      accentW: 0.07,
      fill: C.white,
      line: C.border,
      titleFontSize: 18,
      bodyFontSize: 11.2,
      rectRadius: 0.06,
    });
  });

  addCenterStatement(slide, SH,
    "La ruta cambia · la vista cambia · el layout puede mantenerse.",
    {
      x: 0.88,
      y: 6.12,
      w: 10.26,
      h: 0.64,
      fill: C.softNeutral,
      line: C.softNeutral,
      fontSize: 13.6,
      rectRadius: 0.06,
    }
  );

  validateSlide(slide, pptx);
}

// ─── SLIDE 23: EL LAYOUT COMPARTIDO ──────────────────────────────────────────

function createSharedLayout() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El layout compartido entre vistas",
    "Bloque 2 · 2.3 Qué permanece fijo y qué cambia al navegar entre rutas",
    "Bloque 2"
  );

  // Left: app layout mockup
  addPanel(slide, 0.88, 2.22, 5.26, 4.42, { fill: "EEF2F8", line: C.border });

  // Sidebar (permanece)
  addPanel(slide, 0.96, 2.30, 1.22, 4.26, { fill: C.navy, line: C.navy, rectRadius: 0.04 });
  slide.addText("Sidebar", {
    x: 0.96,
    y: 4.16,
    w: 1.22,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.2,
    color: "90B4D8",
    align: "center",
    margin: 0,
  });

  // Topbar (permanece)
  addPanel(slide, 2.26, 2.30, 3.80, 0.52, { fill: C.softBlue, line: C.softBlue, rectRadius: 0.04 });
  slide.addText("Topbar", {
    x: 2.30,
    y: 2.31,
    w: 3.72,
    h: 0.48,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.4,
    bold: true,
    color: C.navy,
    align: "center",
    margin: 0,
    valign: "mid",
  });

  // Content area (cambia)
  addPanel(slide, 2.26, 2.90, 3.80, 3.66, { fill: C.white, line: C.border, rectRadius: 0.04 });
  slide.addText("Vista", {
    x: 2.26,
    y: 3.98,
    w: 3.80,
    h: 0.36,
    fontFace: TYPOGRAPHY.display,
    fontSize: 16.4,
    bold: true,
    color: C.red,
    align: "center",
    margin: 0,
    valign: "mid",
  });
  slide.addText("(cambia con la ruta)", {
    x: 2.26,
    y: 4.42,
    w: 3.80,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.2,
    color: C.slate,
    align: "center",
    margin: 0,
  });

  // Right: explanation panel
  slide.addText("Al navegar de /dashboard a /productos:", {
    x: 6.42,
    y: 2.22,
    w: 4.08,
    h: 0.28,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.0,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  const points = [
    { title: "La ruta cambia", body: "/dashboard → /productos", fill: C.paleRed, line: C.paleRed, accent: C.red },
    { title: "La vista central cambia", body: "El componente que se renderiza en la zona de contenido es distinto.", fill: C.paleRed, line: C.paleRed, accent: C.red },
    { title: "El layout permanece fijo", body: "Sidebar y Topbar no se re-renderizan — siguen ahí entre rutas.", fill: C.softBlue, line: C.softBlue, accent: C.navy },
  ];

  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 6.42,
      y: 2.62 + i * 1.24,
      w: 4.08,
      h: 1.06,
      title: p.title,
      body: p.body,
      fill: p.fill,
      line: p.line,
      accent: p.accent,
      titleFontSize: 11.8,
      bodyFontSize: 9.4,
    });
  });

  addCenterStatement(slide, SH,
    "Esa distinción evita rehacer la interfaz completa cada vez que el usuario navega.",
    {
      x: 0.88,
      y: 6.82,
      w: 10.26,
      h: 0.52,
      fill: C.softNeutral,
      line: C.softNeutral,
      fontSize: 9.4,
    }
  );

  validateSlide(slide, pptx);
}

// ─── SLIDE 24: ROUTING COMO ARQUITECTURA ─────────────────────────────────────

function createRoutingAsArchitecture() {
  const slide = pptx.addSlide();

  slide.background = { color: C.softNeutral };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 2", {
    x: 0.88,
    y: 0.44,
    w: 1.32,
    h: 0.3,
    fill: C.navy,
    color: C.white,
    fontSize: 10.0,
    rectRadius: 0.05,
  });

  slide.addText("Incluso sin entrar a la sintaxis concreta de React Router o Next.js:", {
    x: 0.88,
    y: 1.08,
    w: 9.0,
    h: 0.32,
    fontFace: TYPOGRAPHY.body,
    fontSize: 12.4,
    color: C.slate,
    margin: 0,
    valign: "mid",
  });

  addCenterStatement(slide, SH,
    "routing es parte del diseño arquitectónico del frontend.",
    {
      x: 0.88,
      y: 1.56,
      w: 10.26,
      h: 1.04,
      fill: C.navy,
      line: C.navy,
      fontSize: 22,
      color: C.white,
      rectRadius: 0.08,
    }
  );

  slide.addText("No es una línea de configuración. Es una decisión sobre cómo está estructurado el sistema.", {
    x: 0.88,
    y: 2.78,
    w: 10.26,
    h: 0.44,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13.4,
    color: C.navy,
    margin: 0,
    valign: "mid",
  });

  addCard(slide, SH, {
    x: 0.88,
    y: 3.44,
    w: 4.68,
    h: 2.86,
    title: "Rutas de nivel superior",
    body: "Definen las secciones principales:\n\n/  ·  /dashboard  ·  /productos  ·  /login\n\nEstructura visible desde la URL — la raíz del sistema.",
    accent: C.navy,
    accentW: 0.07,
    fill: C.white,
    line: C.border,
    titleFontSize: 14.4,
    bodyFontSize: 11.0,
    rectRadius: 0.06,
  });

  addCard(slide, SH, {
    x: 5.84,
    y: 3.44,
    w: 4.68,
    h: 2.86,
    title: "Rutas anidadas",
    body: "Desglosan el contenido dentro de esas secciones:\n\n/productos/42  ·  /productos/42/editar\n\nJerarquía de componentes: quién gestiona qué parte.",
    accent: C.red,
    accentW: 0.07,
    fill: C.white,
    line: C.border,
    titleFontSize: 14.4,
    bodyFontSize: 11.0,
    rectRadius: 0.06,
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 25: PREGUNTAS DE DISEÑO DEL ROUTING ───────────────────────────────

function createRoutingDesignQuestions() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Preguntas que organiza el routing",
    "Bloque 2 · 2.4 Routing como decisión de estructura — qué responde un routing bien diseñado",
    "Bloque 2"
  );

  addChecklistGrid(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 4.54,
    title: "Preguntas de diseño del routing",
    columns: 2,
    entries: [
      {
        badge: "1",
        title: "¿Qué vistas necesitan layout compartido?",
        body: "Dashboard, productos y perfil comparten sidebar. Login y registro no necesitan ese contexto.",
        accent: C.navy,
        fill: C.softBlue,
        badgeFill: C.navy,
      },
      {
        badge: "2",
        title: "¿Qué páginas son públicas o requieren acceso?",
        body: "Las rutas de inicio y registro son públicas. El panel y el perfil requieren autenticación.",
        accent: C.red,
        fill: C.paleRed,
        badgeFill: C.red,
      },
      {
        badge: "3",
        title: "¿Qué partes cambian al navegar y cuáles no?",
        body: "La vista central cambia con cada ruta. El layout permanece. Esa frontera define la jerarquía.",
        accent: C.gold,
        fill: C.softNeutral,
        badgeFill: "B8962A",
      },
      {
        badge: "4",
        title: "¿Qué componentes pertenecen solo a una ruta?",
        body: "Separar lo exclusivo de una vista de lo reutilizable entre varias — esa es la frontera del routing.",
        accent: C.navy,
        fill: C.softBlue,
        badgeFill: C.navy,
      },
    ],
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 26: MITOS DEL ROUTING ─────────────────────────────────────────────

function createRoutingMyths() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Lo que el routing no es",
    "Bloque 2 · 2.4 Confusiones frecuentes sobre routing en una app frontend",
    "Bloque 2"
  );

  addMythRealityGrid(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 4.54,
    title: "Routing — mitos y realidades",
    columns: 2,
    entries: [
      {
        badge: "Mito",
        myth: "Routing es poner un <a href> en el HTML",
        reality: "Routing decide qué componente gestiona qué ubicación — no es solo un enlace.",
        accent: C.red,
        fill: C.paleRed,
        badgeFill: C.paleRed,
      },
      {
        badge: "Mito",
        myth: "Cada ruta implica rehacer la interfaz desde cero",
        reality: "El layout se comparte entre rutas. Solo cambia la vista central al navegar.",
        accent: C.navy,
        fill: C.softBlue,
        badgeFill: C.softBlue,
      },
      {
        badge: "Mito",
        myth: "El routing se configura al final",
        reality: "El routing define la estructura del proyecto desde el inicio. Agregarlo tarde obliga a reestructurar.",
        accent: C.red,
        fill: C.paleRed,
        badgeFill: C.paleRed,
      },
      {
        badge: "Mito",
        myth: "Si funciona en el navegador, el routing está bien",
        reality: "Un routing técnicamente funcional puede ser incoherente como arquitectura y generar deuda.",
        accent: C.navy,
        fill: C.softBlue,
        badgeFill: C.softBlue,
      },
    ],
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 27: EL AGENTE EN ROUTING ──────────────────────────────────────────

function createAgentBlock2() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El agente puede sugerir — tú validas la estructura",
    "Bloque 2 · Huella metodológica: IA y agentes en routing y navegación",
    "Bloque 2"
  );

  addDelegationSplit(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 4.54,
    title: "Qué delegar y qué no delegar",
    left: {
      title: "El agente puede ayudar a",
      subtitle: "Tareas donde la IA agrega velocidad real",
      items: [
        "Proponer un mapa inicial de rutas y vistas",
        "Sugerir qué pantallas podría necesitar la aplicación",
        "Bosquejar una estructura pages/, routes/ o app/",
        "Explicar la diferencia entre layout y vista específica",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene delegar sin revisión",
      subtitle: "Requiere tu criterio técnico y de producto",
      items: [
        "La lógica estructural de la navegación de la app",
        "Decidir qué rutas tienen sentido para los usuarios",
        "Detectar rutas innecesarias o vistas duplicadas",
        "Validar que la estructura técnica sirva al producto real",
      ],
      accent: C.red,
      fill: C.paleRed,
    },
    bridgeLabel: "→",
    bridgeBody: "sugiere\nvalidas",
    footer: "Un agente puede proponer rutas técnicamente válidas pero pobres como experiencia de usuario. El criterio de producto lo pones tú.",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 28: PREGUNTAS GUÍA BLOQUE 2 ───────────────────────────────────────

function createGuideQuestionsBlock2() {
  const slide = pptx.addSlide();

  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 2", {
    x: 0.88,
    y: 0.44,
    w: 3.4,
    h: 0.3,
    fill: C.navy,
    color: C.white,
    fontSize: 10.0,
    rectRadius: 0.05,
  });

  const questions = [
    {
      n: "01",
      text: "¿Qué diferencia hay entre un sitio de una sola página y una aplicación con varias vistas?",
    },
    {
      n: "02",
      text: "Si cambias de /dashboard a /productos, ¿qué partes de la interfaz podrían mantenerse y cuáles deberían cambiar?",
    },
    {
      n: "03",
      text: "¿Por qué el routing no debería entenderse solo como «poner enlaces»?",
    },
  ];

  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, {
      x: 0.88,
      y: y + 0.04,
      w: 0.58,
      h: 0.68,
      fontFace: TYPOGRAPHY.display,
      fontSize: 38,
      bold: true,
      color: C.border,
      margin: 0,
      valign: "mid",
    });
    slide.addText(q.text, {
      x: 1.6,
      y,
      w: 8.72,
      h: 1.56,
      fontFace: TYPOGRAPHY.body,
      fontSize: 15.6,
      color: C.navy,
      margin: 0,
      valign: "mid",
    });
    if (i < 2) {
      slide.addShape(SH.line, {
        x: 0.88,
        y: y + 1.72,
        w: 10.28,
        h: 0,
        line: { color: C.border, pt: 1 },
      });
    }
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 29: SÍNTESIS Y CIERRE B2 ──────────────────────────────────────────

function createBlock2Close() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Síntesis del Bloque 2",
    "Bloque 2 · Lo que se instala antes de avanzar a props y composición",
    "Bloque 2"
  );

  addCenterStatement(slide, SH,
    "El routing no solo mueve al usuario entre pantallas.\nOrganiza cómo la app distribuye sus vistas, layouts y navegación.",
    {
      x: 0.88,
      y: 2.22,
      w: 10.26,
      h: 1.14,
      fill: C.navy,
      line: C.navy,
      fontSize: 16.4,
      color: C.white,
      rectRadius: 0.07,
    }
  );

  const ideas = [
    {
      label: "Ruta",
      body: "La dirección que identifica una ubicación. La URL es su expresión visible.",
      accent: C.navy,
    },
    {
      label: "Vista / Layout",
      body: "La vista cambia por ruta. El layout se comparte. No son lo mismo.",
      accent: C.red,
    },
    {
      label: "Arquitectura",
      body: "Routing no es configuración — es una decisión sobre cómo está estructurado el sistema.",
      accent: C.gold,
    },
  ];

  ideas.forEach((idea, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44,
      y: 3.62,
      w: 3.2,
      h: 1.96,
      title: idea.label,
      body: idea.body,
      accent: idea.accent,
      accentW: 0.07,
      fill: C.white,
      line: C.border,
      titleFontSize: 13.2,
      bodyFontSize: 11.2,
      rectRadius: 0.06,
    });
  });

  addMiniCard(slide, SH, {
    x: 0.88,
    y: 5.82,
    w: 10.26,
    h: 0.62,
    title: "Bloque 3 →",
    body: "Una vez que sabemos cómo se estructuran las vistas, el siguiente paso es entender cómo viaja la información entre componentes. Ahí entran props y composición.",
    fill: C.softNeutral,
    line: C.softNeutral,
    accent: C.gold,
    titleFontSize: 11.0,
    bodyFontSize: 10.4,
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 30: BLOQUE 3 APERTURA ─────────────────────────────────────────────

function createBlock3IntroSlide() {
  const slide = pptx.addSlide();

  slide.background = { color: C.navy };

  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });

  addChip(slide, SH, "BLOQUE 3", {
    x: 0.88,
    y: 0.68,
    w: 1.32,
    h: 0.34,
    fill: C.red,
    color: C.white,
    fontSize: 10.6,
    rectRadius: 0.05,
  });

  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);

  slide.addText("Props y composición como\nflujo de datos hacia abajo", {
    x: 0.88,
    y: 2.14,
    w: 9.2,
    h: 1.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 36,
    bold: true,
    color: C.white,
    margin: 0,
    valign: "mid",
  });

  slide.addText("Cómo las piezas se ensamblan y cómo viaja la información desde los padres hacia los hijos", {
    x: 0.88,
    y: 3.62,
    w: 8.2,
    h: 0.38,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15.2,
    color: "DCE6F2",
    margin: 0,
    valign: "mid",
  });

  addPanel(slide, 0.88, 5.84, 2.8, 0.4, { fill: "173A5A", line: "173A5A" });
  slide.addText("35 minutos · lectura guiada de jerarquía", {
    x: 1.04,
    y: 5.92,
    w: 2.6,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.4,
    color: "A8C4E0",
    margin: 0,
    valign: "mid",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 30: BLOQUE 3 APERTURA ─────────────────────────────────────────────

function createBlock3IntroSlide() {
  const slide = pptx.addSlide();

  slide.background = { color: C.navy };

  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });

  addChip(slide, SH, "BLOQUE 3", {
    x: 0.88,
    y: 0.68,
    w: 1.32,
    h: 0.34,
    fill: C.red,
    color: C.white,
    fontSize: 10.6,
    rectRadius: 0.05,
  });

  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);

  slide.addText("Props y composición como\nflujo de datos hacia abajo", {
    x: 0.88,
    y: 2.14,
    w: 9.2,
    h: 1.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 36,
    bold: true,
    color: C.white,
    margin: 0,
    valign: "mid",
  });

  slide.addText("Cómo las piezas se ensamblan y cómo viaja la información desde los padres hacia los hijos", {
    x: 0.88,
    y: 3.62,
    w: 8.2,
    h: 0.38,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15.2,
    color: "DCE6F2",
    margin: 0,
    valign: "mid",
  });

  addPanel(slide, 0.88, 5.84, 2.8, 0.4, { fill: "173A5A", line: "173A5A" });
  slide.addText("35 minutos · lectura guiada de jerarquía", {
    x: 1.04,
    y: 5.92,
    w: 2.6,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.4,
    color: "A8C4E0",
    margin: 0,
    valign: "mid",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 31: EL FIN DEL MONOLITO ───────────────────────────────────────────

function createMonolithProblem() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El problema del monolito acoplado",
    "Bloque 3 · 3.1 Por qué un solo archivo con estructura y datos rompe la escalabilidad",
    "Bloque 3"
  );

  addDelegationSplit(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 4.54,
    title: "Estructura acoplada vs. Estructura compuesta",
    left: {
      title: "El Monolito (HTML/JS tradicional)",
      subtitle: "Datos y estructura en el mismo lugar",
      items: [
        "Copias y pegas el mismo <div> 5 veces para mostrar 5 productos.",
        "Si el diseño de la tarjeta cambia, editas 5 lugares.",
        "El archivo se vuelve inmanejable (+1000 líneas).",
        "Los datos (precios, títulos) están fijos en el HTML (Hardcoding).",
      ],
      accent: C.red,
      fill: C.paleRed,
    },
    right: {
      title: "La Composición (Frontend Moderno)",
      subtitle: "Separación de responsabilidades",
      items: [
        "Creas UN componente <ProductCard />.",
        "Lo llamas 5 veces pasándole datos distintos.",
        "Si el diseño cambia, editas un solo archivo.",
        "Los datos fluyen dinámicamente; la estructura es reutilizable.",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    bridgeLabel: "vs",
    bridgeBody: "escalabilidad\ny mantenimiento",
    footer: "Acoplar diseño y datos funciona para una página estática. Para un producto real, necesitas componer.",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 31b: ENTRENAR EL OJO ──────────────────────────────────────────────

function createVisualParsingSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Entrenar el ojo: De Diseño a Componentes",
    "Bloque 3 · 3.1 Cómo los desarrolladores senior analizan una interfaz",
    "Bloque 3"
  );

  addCenterStatement(slide, SH,
    "Antes de programar, debemos aprender a 'rebanar' la interfaz.",
    { x: 0.88, y: 2.02, w: 10.26, h: 0.64, fill: C.softNeutral, line: C.softNeutral, fontSize: 14.8, color: C.navy, rectRadius: 0.05 }
  );

  const steps = [
    { title: "1. Identificar Patrones", body: "¿Qué elementos se repiten? (Botones, inputs, tarjetas). Esos son tus futuros componentes.", accent: C.navy },
    { title: "2. Definir lo Variable", body: "¿Qué cambia entre una repetición y otra? (Títulos, imágenes, precios). Esas son tus Props.", accent: C.red },
    { title: "3. Trazar Jerarquías", body: "¿Quién contiene a quién? ¿Qué pieza es el Layout y cuál es el detalle?", accent: C.gold },
  ];

  steps.forEach((step, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 2.92, w: 3.2, h: 3.2,
      title: step.title, body: step.body, accent: step.accent, accentW: 0.07,
      fill: C.white, line: C.border, titleFontSize: 13.2, bodyFontSize: 11.2, rectRadius: 0.06
    });
  });

  addMiniCard(slide, SH, {
    x: 0.88, y: 6.32, w: 10.26, h: 0.52,
    title: "Ejercicio Mental: Mira Spotify. El reproductor es UN componente. La canción y el artista son sus PROPS.",
    body: "", fill: C.navy, line: C.navy, accent: C.gold, titleFontSize: 10.4, color: C.white
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 32: COMPOSICIÓN DEFINICIÓN ────────────────────────────────────────

function createCompositionDefinition() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Composición: El arte de ensamblar",
    "Bloque 3 · 3.1 Construir una interfaz insertando unos componentes dentro de otros",
    "Bloque 3"
  );

  addCenterStatement(slide, SH,
    "Una pantalla no se rehace desde cero cada vez — se compone.",
    {
      x: 0.88,
      y: 2.22,
      w: 10.26,
      h: 0.72,
      fill: C.softBlue,
      line: C.softBlue,
      fontSize: 18,
      color: C.navy,
      rectRadius: 0.06,
    }
  );

  const cards = [
    {
      title: "Piezas que organizan",
      body: "Componentes como Layout, Grid o Container que deciden dónde van los hijos.",
      accent: C.navy,
    },
    {
      title: "Piezas que muestran",
      body: "Componentes como Title, Badge o Avatar que resuelven una parte visual única.",
      accent: C.red,
    },
    {
      title: "Piezas que repiten",
      body: "Componentes como ListItem o ProductCard que multiplican un patrón visual con datos.",
      accent: C.gold,
    },
  ];

  cards.forEach((card, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44,
      y: 3.22,
      w: 3.2,
      h: 2.4,
      title: card.title,
      body: card.body,
      accent: card.accent,
      accentW: 0.07,
      fill: C.white,
      line: C.border,
      titleFontSize: 13.8,
      bodyFontSize: 11.2,
      rectRadius: 0.06,
    });
  });

  addMiniCard(slide, SH, {
    x: 0.88,
    y: 5.96,
    w: 10.26,
    h: 0.74,
    title: "La composición permite construir pantallas complejas sin que todo quede mezclado en un solo archivo gigante.",
    body: "",
    fill: C.softNeutral,
    line: C.softNeutral,
    accent: C.navy,
    titleFontSize: 11.6,
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 33: ANALOGÍA LEGO ─────────────────────────────────────────────────

function createLegoAnalogy() {
  const slide = pptx.addSlide();

  slide.background = { color: C.softBlue };

  addHeader(
    slide,
    "Analogía Mental: El Set de Construcción",
    "Bloque 3 · 3.1 Entender la composición desde el mundo real",
    "Bloque 3"
  );

  addPanel(slide, 0.88, 2.22, 10.26, 4.4, { fill: C.white, line: C.border });

  slide.addText("🧩 El Principio de las Piezas Intercambiables", {
    x: 1.2,
    y: 2.6,
    w: 9.6,
    h: 0.4,
    fontFace: TYPOGRAPHY.display,
    fontSize: 22,
    bold: true,
    color: C.navy,
  });

  const points = [
    { title: "El bloque 2x4", body: "Es un componente base. No sabe si será parte de una casa o un auto. Solo sabe ser un bloque 2x4." },
    { title: "El ensamblaje", body: "Juntas bloques para hacer una pared (Componente compuesto)." },
    { title: "La reutilización", body: "Usas la misma técnica de pared en 10 edificios distintos. Si cambias el color del bloque, cambia toda la pared." },
    { title: "La separación", body: "Si la pared se rompe, solo cambias la pared. No desarmas la ciudad entera." },
  ];

  points.forEach((p, i) => {
    slide.addText(p.title, {
      x: 1.2,
      y: 3.4 + i * 0.7,
      w: 2.6,
      h: 0.3,
      fontFace: TYPOGRAPHY.body,
      fontSize: 14,
      bold: true,
      color: C.red,
    });
    slide.addText("→ " + p.body, {
      x: 3.8,
      y: 3.4 + i * 0.7,
      w: 6.8,
      h: 0.3,
      fontFace: TYPOGRAPHY.body,
      fontSize: 12.4,
      color: C.slate,
    });
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 34: JERARQUÍA Y RESPONSABILIDAD ───────────────────────────────────

function createHierarchyResponsibility() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Jerarquía: Contenedores vs Presentación",
    "Bloque 3 · 3.1 Distinguir los roles arquitectónicos de los componentes",
    "Bloque 3"
  );

  addChecklistGrid(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 4.54,
    title: "Roles en el Árbol",
    columns: 2,
    entries: [
      {
        badge: "C",
        title: "Componente Contenedor (Smart)",
        body: "Sabe de dónde vienen los datos. Sabe cómo conectarse al backend o al estado global. Delega el renderizado a otros.",
        accent: C.navy,
        fill: C.softBlue,
        badgeFill: C.navy,
      },
      {
        badge: "P",
        title: "Componente Presentacional (Dumb)",
        body: "No sabe de dónde vienen los datos. Solo recibe props y muestra HTML/CSS. Altamente reutilizable.",
        accent: C.red,
        fill: C.paleRed,
        badgeFill: C.red,
      },
      {
        badge: "R",
        title: "Regla de Oro",
        body: "Mantén la mayoría de tus componentes 'tontos' (presentacionales). Haz que la lógica pesada viva arriba en los contenedores.",
        accent: C.gold,
        fill: C.softNeutral,
        badgeFill: "B8962A",
      },
      {
        badge: "E",
        title: "Ejemplo",
        body: "ProductListPage (Contenedor) hace el fetch() de productos. ProductCard (Presentacional) solo recibe un producto y lo dibuja.",
        accent: C.navy,
        fill: C.softBlue,
        badgeFill: C.navy,
      },
    ],
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 35: ÁRBOL DE COMPOSICIÓN PROFUNDO ─────────────────────────────────

function createDeepCompositionTree() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Visualización: El árbol de un Dashboard",
    "Bloque 3 · 3.1 Cómo se ve la composición en un producto real",
    "Bloque 3"
  );

  // Tree on left
  addComponentTree(slide, SH, {
    x: 0.62,
    y: 2.22,
    w: 5.6,
    h: 4.4,
    title: "Jerarquía de Dashboard",
    nodes: [
      { label: "DashboardLayout", depth: 0, meta: "Contenedor Principal" },
      { label: "Sidebar", depth: 1, meta: "Menú lateral" },
      { label: "NavItem", depth: 2, meta: "Link 'Inicio'" },
      { label: "NavItem", depth: 2, meta: "Link 'Perfil'" },
      { label: "MainContent", depth: 1, meta: "Área de datos" },
      { label: "Header", depth: 2, meta: "Barra superior" },
      { label: "UserAvatar", depth: 3, meta: "Foto de perfil" },
      { label: "WidgetGrid", depth: 2, meta: "Contenedor de stats" },
    ],
  });

  const takeaways = [
    { title: "Padres e Hijos", body: "Sidebar es hijo de DashboardLayout, pero padre de NavItem.", accent: C.navy },
    { title: "Encapsulamiento", body: "WidgetGrid no necesita saber que existe el Sidebar.", accent: C.red },
    { title: "Navegación Mental", body: "Si falla la foto de perfil, vas directo a revisar UserAvatar.", accent: C.gold },
  ];

  takeaways.forEach((step, i) => {
    addMiniCard(slide, SH, {
      x: 6.52,
      y: 2.22 + i * 1.54,
      w: 4.12,
      h: 1.36,
      title: step.title,
      body: step.body,
      accent: step.accent,
      fill: C.white,
      line: C.border,
      titleFontSize: 12.4,
      bodyFontSize: 10.2,
    });
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 36: QUÉ SON LAS PROPS ─────────────────────────────────────────────

function createWhatAreProps() {
  const slide = pptx.addSlide();

  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 3", {
    x: 0.88,
    y: 0.44,
    w: 1.32,
    h: 0.3,
    fill: C.navy,
    color: C.white,
    fontSize: 10.0,
    rectRadius: 0.05,
  });

  slide.addText("Las props son la entrada de un componente.", {
    x: 0.88,
    y: 1.16,
    w: 9.52,
    h: 1.1,
    fontFace: TYPOGRAPHY.display,
    fontSize: 38,
    bold: true,
    color: C.navy,
    margin: 0,
    valign: "mid",
  });

  addPanel(slide, 0.88, 2.56, 10.28, 1.12, { fill: C.navy, line: C.navy, rectRadius: 0.08 });
  slide.addText(
    "Son datos (parámetros) que un componente recibe desde afuera para decidir qué mostrar o cómo comportarse.",
    {
      x: 1.1,
      y: 2.7,
      w: 9.8,
      h: 0.84,
      fontFace: TYPOGRAPHY.display,
      fontSize: 20,
      bold: true,
      color: C.gold,
      margin: 0,
      valign: "mid",
    }
  );

  const keyPoints = [
    { text: "Hacen que la UI sea dinámica (mismo diseño, distintos datos).", icon: "✓" },
    { text: "El componente hijo NO decide sus props, el padre se las impone.", icon: "✓" },
    { text: "Son inmutables para el hijo (Solo Lectura).", icon: "✓" },
  ];

  keyPoints.forEach((p, i) => {
    slide.addText(p.icon, {
      x: 0.88,
      y: 4.12 + i * 0.62,
      w: 0.4,
      h: 0.4,
      fontFace: TYPOGRAPHY.body,
      fontSize: 18,
      bold: true,
      color: C.red,
    });
    slide.addText(p.text, {
      x: 1.38,
      y: 4.12 + i * 0.62,
      w: 9.0,
      h: 0.4,
      fontFace: TYPOGRAPHY.body,
      fontSize: 14.2,
      color: C.navy,
      valign: "mid",
    });
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 36b: EL PUENTE MENTAL ─────────────────────────────────────────────

function createHtmlToPropsBridge() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El Puente Mental: De Atributos a Props",
    "Bloque 3 · 3.2 Por qué ya sabes más de Props de lo que crees",
    "Bloque 3"
  );

  addDelegationSplit(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 4.54,
    title: "Atributo HTML vs Prop de React",
    left: {
      title: "En HTML (Estático)",
      subtitle: "Atributos predefinidos",
      items: [
        '<img src="foto.jpg" />',
        '<a href="https://google.cl">',
        '<input type="password">',
        "Solo puedes usar los que el navegador conoce.",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "En Componentes (Dinámico)",
      subtitle: "Props personalizadas",
      items: [
        '<Tarjeta title="Hola" />',
        '<Boton color="red" />',
        '<Avatar user={usuario} />',
        "Tú inventas el nombre y el tipo de dato que pasas.",
      ],
      accent: C.red,
      fill: C.paleRed,
    },
    bridgeLabel: "es lo mismo",
    bridgeBody: "paso de\nparámetros",
    footer: "Una Prop es simplemente un atributo que tú inventaste para configurar tu propio componente.",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 37: LAS PROPS COMO CONTRATO ───────────────────────────────────────

function createPropsAsContract() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Las Props como Contrato Estricto",
    "Bloque 3 · 3.2 La relación de confianza entre el componente Padre y el Hijo",
    "Bloque 3"
  );

  addDelegationSplit(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 4.54,
    title: "El Acuerdo de Renderizado",
    left: {
      title: "El Hijo declara qué necesita",
      subtitle: "La firma del componente",
      items: [
        "«Para renderizar, EXIJO que me des un título y un precio».",
        "«Si no me das un título, me romperé o me veré mal».",
        "Define la interfaz pública del componente (API del componente).",
      ],
      accent: C.red,
      fill: C.paleRed,
    },
    right: {
      title: "El Padre cumple el contrato",
      subtitle: "La inyección de datos",
      items: [
        "Llama al componente y pasa exactamente lo que se le pide.",
        "Asegura que los datos sean del tipo correcto (String, Number).",
        "El Padre es el único responsable de la veracidad del dato.",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    bridgeLabel: "contrato",
    bridgeBody: "garantía de\nfuncionamiento",
    footer: "El tipado estricto (como TypeScript) brilla aquí: impide que el Padre rompa el contrato al compilar.",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 38: FLUJO UNIDIRECCIONAL ──────────────────────────────────────────

function createOneWayDataFlow() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Flujo de Datos Unidireccional",
    "Bloque 3 · 3.3 Por qué la información solo viaja hacia abajo",
    "Bloque 3"
  );

  // Tree on left
  addComponentTree(slide, SH, {
    x: 0.62,
    y: 2.22,
    w: 5.0,
    h: 4.32,
    title: "One-Way Data Flow",
    nodes: [
      { label: "ProductList (Padre)", depth: 0, meta: "Data Source" },
      { label: "ProductCard (Hijo)", depth: 1, meta: "Recibe props" },
      { label: "Badge", depth: 2, meta: "Recibe props" },
      { label: "Button", depth: 2, meta: "Recibe props" },
    ],
  });

  const flowSteps = [
    { title: "Predicibilidad", body: "Si un precio se muestra mal, sabes exactamente de dónde vino: del componente superior. No hay 'estado fantasma'.", accent: C.navy },
    { title: "Trazabilidad", body: "El flujo hacia abajo (Top-Down) hace que el código sea fácil de depurar leyendo la cadena de padres.", accent: C.red },
    { title: "Mantenimiento", body: "El hijo no altera los datos de sus hermanos. Aisla los efectos secundarios.", accent: C.gold },
  ];

  flowSteps.forEach((step, i) => {
    addMiniCard(slide, SH, {
      x: 6.32,
      y: 2.22 + i * 1.54,
      w: 4.12,
      h: 1.36,
      title: step.title,
      body: step.body,
      accent: step.accent,
      fill: C.softBlue,
      line: C.softBlue,
      titleFontSize: 12.4,
      bodyFontSize: 10.2,
    });
  });

  addArrow(slide, 5.82, 3.12, 0.42, 0.54, C.gold);

  validateSlide(slide, pptx);
}

// ─── SLIDE 39: ANATOMÍA DEL CÓDIGO (PROPS) ───────────────────────────────────

function createPropsCodeAnatomy() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Anatomía del Código: Pasando y Recibiendo Props",
    "Bloque 3 · 3.3 Cómo se ve el contrato en código real (JSX)",
    "Bloque 3"
  );

  // Code Panel: Parent
  addCodePanel(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 5.0,
    h: 4.2,
    title: "App.jsx (El Padre)",
    code: 
`export default function App() {
  // El padre tiene los datos
  const productPrice = 25000;

  return (
    <div className="container">
      {/* Pasa las props como atributos HTML */}
      <ProductCard 
        title="Teclado Mecánico" 
        price={productPrice}
        isNew={true}
      />
    </div>
  );
}`,
    lang: "jsx",
    fontSize: 10,
    titleFill: C.navy,
  });

  addArrow(slide, 6.0, 4.0, 0.3, 0.4, C.red);

  // Code Panel: Child
  addCodePanel(slide, SH, {
    x: 6.42,
    y: 2.22,
    w: 4.7,
    h: 4.2,
    title: "ProductCard.jsx (El Hijo)",
    code: 
`// El hijo recibe un objeto con props
// Usamos desestructuración para extraerlas
export function ProductCard({ title, price, isNew }) {
  return (
    <article className="card">
      {isNew && <span className="badge">Nuevo</span>}
      
      <h2>{title}</h2>
      
      {/* Interpolación del dato */}
      <p className="price">\${price}</p>
    </article>
  );
}`,
    lang: "jsx",
    fontSize: 10,
    titleFill: C.red,
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 39b: SINTAXIS PRO (DESESTRUCTURACIÓN) ─────────────────────────────

function createDestructuringSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Sintaxis Pro: Desestructuración",
    "Bloque 3 · 3.3 Por qué los desarrolladores odian escribir 'props.'",
    "Bloque 3"
  );

  addCodePanel(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 5.0,
    h: 4.2,
    title: "Opción A: Objeto props (Verboso)",
    code: 
`function Card(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.price}</p>
      <button>{props.label}</button>
    </div>
  );
}`,
    lang: "jsx",
    fontSize: 10,
    titleFill: C.slate,
  });

  addCodePanel(slide, SH, {
    x: 6.14,
    y: 2.22,
    w: 5.0,
    h: 4.2,
    title: "Opción B: Desestructuración (Limpio)",
    code: 
`function Card({ title, price, label }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{price}</p>
      <button>{label}</button>
    </div>
  );
}`,
    lang: "jsx",
    fontSize: 10,
    titleFill: C.navy,
  });

  addCenterStatement(slide, SH,
    "La Opción B es el estándar de la industria. Hace el código más legible y fácil de mantener.",
    { x: 0.88, y: 6.52, w: 10.26, h: 0.42, fill: C.softBlue, line: C.softBlue, fontSize: 9.4 }
  );

  validateSlide(slide, pptx);
}

// ─── SLIDE 40: CASO ESTUDIO REUTILIZACIÓN ────────────────────────────────────

function createReuseStudyCase() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Caso de Estudio: Reutilización Inteligente",
    "Bloque 3 · 3.4 Un componente, tres instancias, tres identidades visuales",
    "Bloque 3"
  );

  addCenterStatement(slide, SH,
    "La consistencia visual se mantiene. Los datos mutan el contexto.",
    {
      x: 0.88,
      y: 2.02,
      w: 10.26,
      h: 0.64,
      fill: C.softNeutral,
      line: C.softNeutral,
      fontSize: 14.8,
      color: C.navy,
      rectRadius: 0.05,
    }
  );

  const variants = [
    { title: "Ventas", value: "$4.2M", icon: "↑", color: C.softBlue, accent: C.navy, sub: "Ventas del mes" },
    { title: "Usuarios", value: "1,240", icon: "👥", color: C.softBlue, accent: C.navy, sub: "Registros totales" },
    { title: "Alertas", value: "12", icon: "!", color: C.paleRed, accent: C.red, sub: "Sistemas caídos" },
  ];

  variants.forEach((v, i) => {
    const x = 0.88 + i * 3.52;
    const y = 2.92;
    const w = 3.24;
    const h = 2.4; // Slightly shorter card

    addPanel(slide, x, y, w, h, { fill: v.color, line: v.accent, linePt: 1.5 });
    slide.addText(v.icon, { x, y: y + 0.28, w, h: 0.48, fontFace: TYPOGRAPHY.display, fontSize: 28, align: "center" });
    slide.addText(v.title, { x, y: y + 0.96, w, h: 0.32, fontFace: TYPOGRAPHY.body, fontSize: 12.6, bold: true, color: C.slate, align: "center" });
    slide.addText(v.value, { x, y: y + 1.34, w, h: 0.72, fontFace: TYPOGRAPHY.display, fontSize: 24, bold: true, color: v.accent, align: "center" });
    slide.addText(v.sub, { x, y: y + 2.0, w, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 9.6, color: C.slate, align: "center" });
    
    // Prop snippet below card
    const snippet = `<StatCard\n  title="${v.title}"\n  value="${v.value}"\n  variant="${v.accent === C.red ? 'danger' : 'default'}"\n/>`;
    slide.addText(snippet, {
      x, y: y + h + 0.1, w, h: 0.8,
      fontFace: "Consolas", fontSize: 9, color: C.navy, align: "left", valign: "top", fill: "EEF2F8", margin: 0.1
    });
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 40b: LÓGICA VISUAL CON PROPS ──────────────────────────────────────

function createVisualLogicPropsSlide() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Props para Lógica Visual",
    "Bloque 3 · 3.4 Cómo las props controlan qué se muestra y qué no",
    "Bloque 3"
  );

  addCodePanel(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 5.4,
    h: 4.4,
    title: "Button.jsx",
    code: 
`function Button({ label, color = "blue", showIcon }) {
  return (
    <button className={\`btn btn-\${color}\`}>
      {/* Lógica condicional con Props */}
      {showIcon && <i className="icon-star" />}
      
      {label}
    </button>
  );
}`,
    lang: "jsx",
    fontSize: 10.6,
    titleFill: C.navy,
  });

  const variants = [
    { label: "Normal", code: '<Button label="Ver más" />', accent: C.navy },
    { label: "Con Icono", code: '<Button label="Favorito" showIcon />', accent: C.gold },
    { label: "Peligro", code: '<Button label="Borrar" color="red" />', accent: C.red },
  ];

  variants.forEach((v, i) => {
    addMiniCard(slide, SH, {
      x: 6.52, y: 2.22 + i * 1.54, w: 4.62, h: 1.36,
      title: v.label, body: v.code, accent: v.accent,
      fill: C.white, line: C.border, titleFontSize: 11.2, bodyFontSize: 9.2
    });
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 41: PROPS VS HARDCODING ───────────────────────────────────────────

function createPropsVsHardcoding() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El Costo del Hardcoding",
    "Bloque 3 · 3.4 Por qué inyectar props salva cientos de horas de mantenimiento",
    "Bloque 3"
  );

  addDelegationSplit(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 4.54,
    title: "Datos Duros vs Props Dinámicas",
    left: {
      title: "Hardcoding (Mala Práctica)",
      subtitle: "Datos escritos directo en el HTML",
      items: [
        "<h1>Producto Z</h1> escrito directo en la tarjeta.",
        "Si necesitas mostrar otro producto, debes duplicar el componente entero.",
        "Si el cliente pide que los títulos sean <h2>, debes buscar y reemplazar en 50 archivos.",
      ],
      accent: C.red,
      fill: C.paleRed,
    },
    right: {
      title: "Uso de Props (Buena Práctica)",
      subtitle: "Inyección de dependencias visual",
      items: [
        "<h1>{props.title}</h1> escrito en la tarjeta.",
        "El componente sirve para cualquier producto, solo cambias la prop al llamarlo.",
        "Si el cliente pide <h2>, cambias UNA línea de código y se arreglan 50 tarjetas.",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    bridgeLabel: "deuda",
    bridgeBody: "el costo\ndel cambio",
    footer: "Hardcodear es robarle tiempo a tu yo del futuro. Usa props para todo dato que pertenezca al dominio del negocio.",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 42: COMPOSICIÓN AVANZADA (CHILDREN) ───────────────────────────────

function createAdvancedCompositionChildren() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Composición Avanzada: La Prop 'children'",
    "Bloque 3 · 3.5 Inyectar componentes completos dentro de otros (Slots)",
    "Bloque 3"
  );

  addCenterStatement(slide, SH,
    "A veces, el Padre no quiere pasar datos, quiere pasar ESTRUCTURA.",
    {
      x: 0.88,
      y: 2.22,
      w: 10.26,
      h: 0.64,
      fill: C.navy,
      line: C.navy,
      fontSize: 16,
      color: C.white,
      rectRadius: 0.05,
    }
  );

  // Left code
  addCodePanel(slide, SH, {
    x: 0.88,
    y: 3.1,
    w: 5.0,
    h: 3.6,
    title: "CardWrapper.jsx",
    code: 
`// Usamos 'children' para recibir HTML/Componentes
export function CardWrapper({ children }) {
  return (
    <div className="shadow-lg p-4 rounded-xl border">
      {/* Aquí se inyectará lo que mande el padre */}
      {children}
    </div>
  );
}`,
    lang: "jsx",
    fontSize: 10.6,
    titleFill: C.slate,
  });

  // Right code
  addCodePanel(slide, SH, {
    x: 6.14,
    y: 3.1,
    w: 5.0,
    h: 3.6,
    title: "App.jsx",
    code: 
`export default function App() {
  return (
    <CardWrapper>
      {/* TODO ESTO es 'children' */}
      <h2>¡Hola!</h2>
      <p>Este contenido vive dentro del wrapper.</p>
      <button>Aceptar</button>
    </CardWrapper>
  );
}`,
    lang: "jsx",
    fontSize: 10.6,
    titleFill: C.gold,
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 43: ERROR PEDAGÓGICO (MUTAR PROP) ─────────────────────────────────

function createErrorMutateProp() {
  const slide = pptx.addSlide();
  
  slide.background = { color: C.paleRed };

  addHeader(
    slide,
    "🐛 Error Común: Intentar Mutar una Prop",
    "Bloque 3 · El error más destructivo de la inmutabilidad",
    "Bloque 3"
  );

  addCodePanel(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 4.8,
    h: 3.8,
    title: "Counter.jsx (Bug ❌)",
    code: 
`export function Counter({ clicks }) {
  
  function handleClick() {
    // ❌ INTENTANDO CAMBIAR LA PROP DIRECTAMENTE
    clicks = clicks + 1; 
  }

  return (
    <button onClick={handleClick}>
      Clicks: {clicks}
    </button>
  );
}`,
    lang: "jsx",
    fontSize: 10.6,
    titleFill: C.red,
  });

  const analysis = [
    { badge: "1", title: "Predicción Errónea", body: "Creemos que al sumar `clicks`, el botón mostrará el nuevo número.", accent: C.red, fill: C.white, badgeFill: C.red },
    { badge: "2", title: "Realidad Fuerte", body: "TypeError: Cannot assign to read only property. O simplemente la UI no se actualiza.", accent: C.navy, fill: C.white, badgeFill: C.navy },
    { badge: "3", title: "Por qué falla", body: "Las props son de SOLO LECTURA. El hijo no puede cambiar el dato que el padre le confió.", accent: C.gold, fill: C.white, badgeFill: "B8962A" },
    { badge: "4", title: "La Solución", body: "Para que el dato cambie desde adentro y actualice la UI, necesitamos ESTADO (Bloque 4).", accent: C.navy, fill: C.white, badgeFill: C.navy },
  ];

  analysis.forEach((item, i) => {
    addCard(slide, SH, {
      x: 5.92,
      y: 2.22 + i * 0.98,
      w: 5.22,
      h: 0.88,
      title: `${item.badge}. ${item.title}`,
      body: item.body,
      accent: item.accent,
      fill: item.fill,
      line: C.border,
      titleFontSize: 11.2,
      bodyFontSize: 9.4,
      rectRadius: 0.04,
    });
  });

  addCenterStatement(slide, SH,
    "Regla de Oro: «El componente nunca, jamás, modifica sus propias props».",
    { x: 0.88, y: 6.22, w: 10.26, h: 0.52, fill: C.navy, line: C.navy, color: C.white, fontSize: 12 }
  );

  validateSlide(slide, pptx);
}

// ─── SLIDE 44: PREGUNTAS GUÍA B3 ─────────────────────────────────────────────

function createGuideQuestionsBlock3() {
  const slide = pptx.addSlide();

  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 3", {
    x: 0.88,
    y: 0.44,
    w: 3.4,
    h: 0.3,
    fill: C.navy,
    color: C.white,
    fontSize: 10.0,
    rectRadius: 0.05,
  });

  const questions = [
    {
      n: "01",
      text: "¿Qué ventaja tiene construir una sección con componentes reutilizables en vez de copiar el mismo bloque de HTML muchas veces?",
    },
    {
      n: "02",
      text: "Si varias tarjetas de productos comparten estructura visual pero cambian precio y foto, ¿qué conviene variar: crear componentes nuevos o inyectar props?",
    },
    {
      n: "03",
      text: "Arquitectónicamente, ¿por qué forzamos que el flujo de datos sea unidireccional (de padre a hijo) y prohibimos que el hijo modifique sus props?",
    },
  ];

  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, { x: 0.88, y: y + 0.04, w: 0.58, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.border, margin: 0, valign: "mid" });
    slide.addText(q.text, { x: 1.6, y, w: 8.72, h: 1.56, fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.navy, margin: 0, valign: "mid" });
    if (i < 2) slide.addShape(SH.line, { x: 0.88, y: y + 1.72, w: 10.28, h: 0, line: { color: C.border, pt: 1 } });
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 45: SÍNTESIS Y CIERRE B3 ──────────────────────────────────────────

function createBlock3Close() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Síntesis del Bloque 3",
    "Bloque 3 · Lo que se instala en el modelo mental antes del estado",
    "Bloque 3"
  );

  addCenterStatement(slide, SH,
    "La composición arma el esqueleto del frontend.\nLas props son la sangre (datos) que corre por él hacia abajo.",
    { x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, line: C.navy, fontSize: 16.4, color: C.white, rectRadius: 0.07 }
  );

  const ideas = [
    { label: "Composición (El Qué)", body: "Ensamblar componentes independientes para construir vistas complejas sin crear monolitos inmanejables.", accent: C.navy },
    { label: "Props (El Cómo)", body: "Contrato estricto de solo lectura. El padre inyecta los datos, el hijo los consume ciegamente para pintar la UI.", accent: C.red },
    { label: "Flujo (El Dónde)", body: "One-Way Data Flow. Prevención de efectos colaterales forzando a que la verdad fluya en una sola dirección.", accent: C.gold },
  ];

  ideas.forEach((idea, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06, title: idea.label, body: idea.body,
      accent: idea.accent, accentW: 0.07, fill: C.white, line: C.border, titleFontSize: 13.2, bodyFontSize: 10.8, rectRadius: 0.06
    });
  });

  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.62, title: "Bloque 4 → El Estado",
    body: "Sabemos cómo viajan los datos estáticos desde el Padre. ¿Pero qué pasa cuando el Usuario hace click o escribe? Necesitamos mutabilidad interna.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.gold, titleFontSize: 11.0, bodyFontSize: 10.4
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 46: BLOQUE 4 APERTURA ─────────────────────────────────────────────

function createBlock4IntroSlide() {
  const slide = pptx.addSlide();

  slide.background = { color: C.navy };

  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });

  addChip(slide, SH, "BLOQUE 4", {
    x: 0.88,
    y: 0.68,
    w: 1.32,
    h: 0.34,
    fill: C.red,
    color: C.white,
    fontSize: 10.6,
    rectRadius: 0.05,
  });

  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);

  slide.addText("Estado: Reactividad y\nMemoria del Componente", {
    x: 0.88,
    y: 2.14,
    w: 9.2,
    h: 1.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 36,
    bold: true,
    color: C.white,
    margin: 0,
    valign: "mid",
  });

  slide.addText("Cómo la interfaz responde a la interacción del usuario mutando la información desde adentro", {
    x: 0.88,
    y: 3.62,
    w: 8.4,
    h: 0.38,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15.2,
    color: "DCE6F2",
    margin: 0,
    valign: "mid",
  });

  addPanel(slide, 0.88, 5.84, 2.8, 0.4, { fill: "173A5A", line: "173A5A" });
  slide.addText("40 minutos · inmersión técnica", {
    x: 1.04,
    y: 5.92,
    w: 2.6,
    h: 0.22,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.4,
    color: "A8C4E0",
    margin: 0,
    valign: "mid",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 47: LIMITACIÓN DE LAS PROPS ───────────────────────────────────────

function createLimitationsOfProps() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La Limitación de las Props",
    "Bloque 4 · 4.1 Por qué un árbol estático no basta para una aplicación real",
    "Bloque 4"
  );

  addCenterStatement(slide, SH,
    "Las Props configuran el componente al nacer, pero no pueden cambiar ante un clic.",
    { x: 0.88, y: 2.12, w: 10.26, h: 0.72, fill: C.softBlue, line: C.softBlue, fontSize: 16, color: C.navy, rectRadius: 0.06 }
  );

  addCodePanel(slide, SH, {
    x: 0.88,
    y: 3.12,
    w: 4.8,
    h: 3.4,
    title: "Un Botón que no Reacciona",
    code: 
`function BotonFavorito({ isFavorite }) {
  // isFavorite es una Prop (Read-Only)
  // ¿Qué pasa si el usuario hace clic?
  return (
    <button onClick={() => {
      // ❌ ERROR: Las props son inmutables
      // No puedes hacer isFavorite = true
    }}>
      {isFavorite ? 'Quitar' : 'Añadir'}
    </button>
  );
}`,
    lang: "jsx",
    fontSize: 10,
    titleFill: C.slate,
  });

  const points = [
    { title: "El Callejón sin Salida", body: "El hijo no puede cambiar sus propias Props. Si el usuario hace clic, la interfaz se queda congelada.", accent: C.red },
    { title: "La Necesidad", body: "Necesitamos una variable que el propio componente pueda modificar y que, al hacerlo, repinte la pantalla.", accent: C.navy },
  ];

  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 5.92, y: 3.12 + i * 1.76, w: 5.22, h: 1.5,
      title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 12, bodyFontSize: 10.4
    });
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 48: QUÉ ES EL ESTADO ──────────────────────────────────────────────

function createWhatIsState() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "¿Qué es el Estado? (State)",
    "Bloque 4 · 4.2 Definición técnica de la memoria de un componente",
    "Bloque 4"
  );

  addCenterStatement(slide, SH,
    "El Estado es la memoria temporal de un componente.",
    { x: 0.88, y: 2.12, w: 10.26, h: 0.64, fill: C.navy, line: C.navy, fontSize: 18, color: C.white, rectRadius: 0.05 }
  );

  const cases = [
    { title: "Paneles Ocultos", body: "Saber si un Sidebar está abierto o cerrado en este momento." },
    { title: "Inputs Activos", body: "Recordar qué letras ha escrito el usuario en un campo de texto." },
    { title: "Interacción", body: "Mantener el conteo de 'Me gusta' de un post mientras no se recargue la página." },
    { title: "Selecciones", body: "Recordar qué pestaña (Tab) está viendo el usuario actualmente." },
  ];

  cases.forEach((c, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + (i % 2) * 5.24,
      y: 3.12 + Math.floor(i / 2) * 1.54,
      w: 5.02,
      h: 1.36,
      title: c.title,
      body: c.body,
      accent: C.navy,
      fill: C.white,
      line: C.border,
      titleFontSize: 12.8,
      bodyFontSize: 10.4,
    });
  });

  addCenterStatement(slide, SH,
    "A diferencia de una variable normal (let x = 5), cambiar el Estado obliga a React a redibujar el componente.",
    { x: 0.88, y: 6.42, w: 10.26, h: 0.52, fill: C.softNeutral, line: C.softNeutral, fontSize: 9.4 }
  );

  validateSlide(slide, pptx);
}

// ─── SLIDE 49: ANALOGÍA TERMOSTATO ───────────────────────────────────────────

function createThermostatAnalogy() {
  const slide = pptx.addSlide();
  slide.background = { color: C.softBlue };
  addHeader(
    slide,
    "Analogía Mental: El Termostato Digital",
    "Bloque 4 · 4.2 Entendiendo la reactividad en el mundo real",
    "Bloque 4"
  );

  addPanel(slide, 0.88, 2.22, 10.26, 4.4, { fill: C.white, line: C.border });

  slide.addText("🌡️ La Pantalla Solo Refleja la Realidad", {
    x: 1.2, y: 2.6, w: 9.6, h: 0.4,
    fontFace: TYPOGRAPHY.display, fontSize: 22, bold: true, color: C.navy,
  });

  const points = [
    { title: "El Estado Oculto", body: "Dentro del termostato hay un chip que guarda el número '22'. Ese chip es el Estado (State)." },
    { title: "La Pantalla (UI)", body: "La pantalla LCD no genera el número. Solo DIBUJA lo que dice el chip (UI = Render del Estado)." },
    { title: "La Interacción", body: "Tú presionas el botón '+'. El botón NO pinta un '23' en la pantalla. El botón le dice al chip: 'ahora vales 23' (setState)." },
    { title: "La Reactividad", body: "Al cambiar el chip, el termostato nota el cambio y repinta automáticamente la pantalla LCD con el '23'." },
  ];

  points.forEach((p, i) => {
    slide.addText(p.title, { x: 1.2, y: 3.4 + i * 0.7, w: 2.6, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 14, bold: true, color: C.red });
    slide.addText("→ " + p.body, { x: 3.8, y: 3.4 + i * 0.7, w: 6.8, h: 0.3, fontFace: TYPOGRAPHY.body, fontSize: 12.4, color: C.slate });
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 50: PROPS VS ESTADO STRICT ────────────────────────────────────────

function createPropsVsStateStrict() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Props vs Estado: La Frontera del Control",
    "Bloque 4 · 4.3 Quién es el dueño definitivo del dato",
    "Bloque 4"
  );

  addDelegationSplit(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 4.54,
    title: "Origen vs. Mutabilidad",
    left: {
      title: "Props (Argumentos)",
      subtitle: "Vienen desde afuera",
      items: [
        "Inyectados por el componente Padre.",
        "Totalmente inmutables (Read-Only).",
        "Sirven para inicializar y configurar.",
        "Analogía: El ADN con el que naces.",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "Estado (Memoria)",
      subtitle: "Vive por dentro",
      items: [
        "Iniciado y mantenido por el propio componente.",
        "Mutables a través de funciones setter (setState).",
        "Sirven para reaccionar al usuario en el tiempo.",
        "Analogía: Tu estado de ánimo actual.",
      ],
      accent: C.red,
      fill: C.paleRed,
    },
    bridgeLabel: "vs",
    bridgeBody: "¿quién es dueño\\ndel dato?",
    footer: "Regla de Oro: Si un dato lo puedes calcular usando las Props, NO lo conviertas en Estado. Evita redundancias.",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 51: UI = F(STATE) ─────────────────────────────────────────────────

function createUiFunctionOfState() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "La Ecuación del Frontend Moderno",
    "Bloque 4 · 4.3 UI = f(state)",
    "Bloque 4"
  );

  addCenterStatement(slide, SH,
    "UI = f (state)",
    { x: 0.88, y: 2.02, w: 10.26, h: 1.2, fill: C.navy, line: C.navy, fontSize: 48, color: C.white, rectRadius: 0.05, fontFace: "Consolas" }
  );

  const pillars = [
    { title: "UI (Interfaz)", body: "Lo que el usuario ve en pantalla (Botones, textos, colores).", accent: C.gold },
    { title: "f (Función)", body: "Tus componentes de React que devuelven HTML (JSX).", accent: C.navy },
    { title: "state (Estado)", body: "Los datos crudos que viven en la memoria (true/false, arrays, strings).", accent: C.red },
  ];

  pillars.forEach((p, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 1.86,
      title: p.title, body: p.body, accent: p.accent, accentW: 0.07,
      fill: C.white, line: C.border, titleFontSize: 14.2, bodyFontSize: 11.2, rectRadius: 0.06
    });
  });

  addMiniCard(slide, SH, {
    x: 0.88, y: 5.82, w: 10.26, h: 0.72,
    title: "El Paradigma Declarativo:",
    body: "Ya no manipulamos el DOM directamente (adiós document.getElementById). Simplemente actualizamos el Estado y la función se encarga de redibujar la UI sola.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.navy, titleFontSize: 11.0, bodyFontSize: 10.4
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 52: CICLO DE ACTUALIZACIÓN ────────────────────────────────────────

function createInteractionLifecycle() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El Ciclo de Vida de la Interacción",
    "Bloque 4 · 4.4 De la acción humana a la actualización visual",
    "Bloque 4"
  );

  addStageChain(slide, SH, {
    x: 0.88,
    y: 2.52,
    w: 10.26,
    h: 3.12,
    stages: [
      { title: "1. Render Inicial", body: "El componente dibuja la UI basado en su estado inicial (ej. isOpen = false).", accent: C.navy, fill: C.softBlue },
      { title: "2. Interacción", body: "El usuario hace clic en el botón 'Abrir Menú'.", accent: C.gold, fill: C.softNeutral },
      { title: "3. Cambio de Estado", body: "La función onClick ejecuta setIsOpen(true). El dato cambia.", accent: C.red, fill: C.paleRed },
      { title: "4. Re-Renderizado", body: "React nota el cambio y VUELVE a ejecutar la función para dibujar la UI abierta.", accent: C.navy, fill: C.softBlue },
    ],
  });

  addCenterStatement(slide, SH,
    "La interfaz no es un lienzo estático; es un proyector de cine. Cada vez que el estado cambia, se proyecta un nuevo fotograma (frame).",
    { x: 0.88, y: 6.02, w: 10.26, h: 0.72, fill: C.navy, line: C.navy, fontSize: 13, color: C.white, rectRadius: 0.07 }
  );

  validateSlide(slide, pptx);
}

// ─── SLIDE 53: ANATOMÍA DEL CÓDIGO (USESTATE) ────────────────────────────────

function createUseStateAnatomy() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Anatomía del Código: El Hook useState",
    "Bloque 4 · 4.4 Desglosando la sintaxis del estado",
    "Bloque 4"
  );

  addCodePanel(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 5.6,
    h: 4.4,
    title: "Counter.jsx",
    code: 
`import { useState } from 'react';

export function Counter() {
  // Desestructuración de Array
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Has hecho {count} clics</p>
      
      {/* setCount inyecta el nuevo valor */}
      <button onClick={() => setCount(count + 1)}>
        Sumar +
      </button>
    </div>
  );
}`,
    lang: "jsx",
    fontSize: 10.6,
    titleFill: C.navy,
  });

  const parts = [
    { label: "useState(0)", body: "Inicia la memoria con el valor 0.", accent: C.navy },
    { label: "count", body: "La variable de LECTURA actual. Contiene '0' en el primer render.", accent: C.gold },
    { label: "setCount", body: "La FUNCIÓN MUTADORA. La única forma autorizada de cambiar el valor de 'count'.", accent: C.red },
  ];

  parts.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 6.72, y: 2.22 + i * 1.52, w: 4.42, h: 1.36,
      title: p.label, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 12.4, bodyFontSize: 10.2
    });
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 54: ERROR PEDAGÓGICO MUTAR ESTADO ─────────────────────────────────

function createPedagogicalErrorMutateState() {
  const slide = pptx.addSlide();
  slide.background = { color: C.paleRed };

  addHeader(
    slide,
    "🐛 Error Común: Mutar el Estado Directamente",
    "Bloque 4 · El error que rompe la reactividad en Arrays y Objetos",
    "Bloque 4"
  );

  addCodePanel(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 5.2,
    h: 3.8,
    title: "Cart.jsx (Bug ❌)",
    code: 
`export function Cart() {
  const [items, setItems] = useState(['Manzana']);

  function agregarPera() {
    // ❌ Mutación directa del Array
    items.push('Pera'); 
    
    // ¿Esto redibujará la pantalla?
    console.log(items); // ['Manzana', 'Pera']
  }

  return <button onClick={agregarPera}>Añadir</button>;
}`,
    lang: "jsx",
    fontSize: 10.2,
    titleFill: C.red,
  });

  const analysis = [
    { badge: "1", title: "El Instinto", body: "En JS tradicional, .push() es correcto para agregar.", accent: C.red, fill: C.white, badgeFill: C.red },
    { badge: "2", title: "El Problema Físico", body: "El array cambia internamente, pero la UI NO SE ACTUALIZA. El nuevo item es invisible.", accent: C.navy, fill: C.white, badgeFill: C.navy },
    { badge: "3", title: "La Razón (Referencia)", body: "React compara el array viejo con el nuevo. Como es exactamente la misma caja de memoria (referencia), React dice: 'No cambió, no redibujo'.", accent: C.gold, fill: C.white, badgeFill: "B8962A" },
  ];

  analysis.forEach((item, i) => {
    addCard(slide, SH, {
      x: 6.28, y: 2.22 + i * 1.28, w: 4.86, h: 1.18,
      title: `${item.badge}. ${item.title}`, body: item.body, accent: item.accent,
      fill: item.fill, line: C.border, titleFontSize: 11.2, bodyFontSize: 9.4, rectRadius: 0.04
    });
  });

  addCenterStatement(slide, SH,
    "React ignora los cambios silenciosos. Debes crear una NUEVA COPIA.",
    { x: 0.88, y: 6.22, w: 10.26, h: 0.52, fill: C.navy, line: C.navy, color: C.white, fontSize: 12 }
  );

  validateSlide(slide, pptx);
}

// ─── SLIDE 55: EL PRINCIPIO DE INMUTABILIDAD ─────────────────────────────────

function createImmutabilityPrinciple() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El Principio de Inmutabilidad",
    "Bloque 4 · 4.5 La solución al re-renderizado de estructuras complejas",
    "Bloque 4"
  );

  addDelegationSplit(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 4.54,
    title: "La Mutación vs La Copia",
    left: {
      title: "Mal ❌ (Mutar)",
      subtitle: "Alterar el original",
      items: [
        "Usar .push() en Arrays.",
        "Hacer obj.nombre = 'Juan' en Objetos.",
        "React no detecta el cambio porque la referencia de memoria (la 'caja') es la misma.",
      ],
      accent: C.red,
      fill: C.paleRed,
    },
    right: {
      title: "Bien ✅ (Inmutabilidad)",
      subtitle: "Clonar y reemplazar",
      items: [
        "Para arrays: setItems([...items, 'Pera'])",
        "Para objetos: setUser({...user, edad: 30})",
        "React ve una caja de memoria nueva, sabe que cambió y redibuja la pantalla de inmediato.",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    bridgeLabel: "cambio",
    bridgeBody: "garantía de\\nrenderizado",
    footer: "El operador de propagación (...) es tu mejor amigo en React. Úsalo para crear copias frescas.",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 56: LIFTING STATE UP ──────────────────────────────────────────────

function createLiftingStateUp() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Arquitectura: ¿Dónde vive el Estado?",
    "Bloque 4 · 4.6 El concepto de Elevación de Estado (Lifting State Up)",
    "Bloque 4"
  );

  // Tree on left
  addComponentTree(slide, SH, {
    x: 0.62,
    y: 2.22,
    w: 5.6,
    h: 4.4,
    title: "El Problema de los Hermanos",
    nodes: [
      { label: "ProductPage", depth: 0, meta: "El Ancestro Común" },
      { label: "FilterSidebar", depth: 1, meta: "Selecciona Categoría" },
      { label: "ProductGrid", depth: 1, meta: "Muestra Productos" },
    ],
  });

  const takeaways = [
    { title: "El Dilema", body: "El FilterSidebar elige 'Zapatillas', pero el ProductGrid necesita saber eso para filtrar. Los hermanos no pueden hablarse directamente.", accent: C.navy },
    { title: "La Solución", body: "Elevamos el Estado (categoría = 'Zapatillas') al ProductPage (Ancestro Común).", accent: C.gold },
    { title: "El Flujo", body: "ProductPage guarda el estado, se lo pasa al Sidebar como función para que lo cambie, y al Grid como dato para que filtre.", accent: C.red },
  ];

  takeaways.forEach((step, i) => {
    addMiniCard(slide, SH, {
      x: 6.52,
      y: 2.22 + i * 1.54,
      w: 4.12,
      h: 1.36,
      title: step.title,
      body: step.body,
      accent: step.accent,
      fill: C.white,
      line: C.border,
      titleFontSize: 12.4,
      bodyFontSize: 10.2,
    });
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 57: MITOS Y REALIDADES ESTADO ─────────────────────────────────────

function createStateMythsRealities() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Estado: Mitos y Realidades",
    "Bloque 4 · 4.7 Destruyendo malas prácticas frecuentes",
    "Bloque 4"
  );

  addMythRealityGrid(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 4.54,
    title: "Las trampas del Estado",
    columns: 2,
    entries: [
      {
        badge: "Mito",
        myth: "Todas las variables deben ser 'estado'.",
        reality: "Solo los datos que cambian visualmente la interfaz deben ser estado. Lo demás son variables o props normales.",
        accent: C.red,
        fill: C.paleRed,
        badgeFill: C.paleRed,
      },
      {
        badge: "Mito",
        myth: "El estado se actualiza al instante.",
        reality: "El estado es asíncrono (batching). React agrupa cambios para repintar una sola vez por rendimiento.",
        accent: C.navy,
        fill: C.softBlue,
        badgeFill: C.softBlue,
      },
      {
        badge: "Mito",
        myth: "Si puedo calcularlo, lo guardo en estado.",
        reality: "Falso. Si tienes estado firstName y lastName, no crees estado fullName. Calcúlalo al vuelo.",
        accent: C.red,
        fill: C.paleRed,
        badgeFill: C.paleRed,
      },
      {
        badge: "Mito",
        myth: "El componente hijo puede cambiar al padre.",
        reality: "Solo si el padre le pasa una función (setter) por Props al hijo (Data Flow hacia abajo, Action hacia arriba).",
        accent: C.navy,
        fill: C.softBlue,
        badgeFill: C.softBlue,
      },
    ],
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 58: PREGUNTAS GUÍA B4 ─────────────────────────────────────────────

function createGuideQuestionsBlock4() {
  const slide = pptx.addSlide();

  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 4", {
    x: 0.88,
    y: 0.44,
    w: 3.4,
    h: 0.3,
    fill: C.navy,
    color: C.white,
    fontSize: 10.0,
    rectRadius: 0.05,
  });

  const questions = [
    {
      n: "01",
      text: "¿Por qué React nos prohíbe usar variables normales (let contador = 0) para manejar información que debe mostrarse en la pantalla?",
    },
    {
      n: "02",
      text: "Si tengo un carrito de compras y modifico su array interno usando .push(), la interfaz no muestra el nuevo producto. ¿Qué principio ignoré?",
    },
    {
      n: "03",
      text: "Dos componentes hermanos (A y B) necesitan saber si un menú lateral está abierto. ¿Dónde debería vivir el useState?",
    },
  ];

  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, { x: 0.88, y: y + 0.04, w: 0.58, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.border, margin: 0, valign: "mid" });
    slide.addText(q.text, { x: 1.6, y, w: 8.72, h: 1.56, fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.navy, margin: 0, valign: "mid" });
    if (i < 2) slide.addShape(SH.line, { x: 0.88, y: y + 1.72, w: 10.28, h: 0, line: { color: C.border, pt: 1 } });
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 59: SÍNTESIS B4 ───────────────────────────────────────────────────

function createBlock4Synthesis() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Síntesis del Bloque 4",
    "Bloque 4 · El motor de la interactividad",
    "Bloque 4"
  );

  addCenterStatement(slide, SH,
    "El Estado (State) es la memoria viva de tu componente.\\nUI = f(state)",
    { x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, line: C.navy, fontSize: 18, color: C.white, rectRadius: 0.07 }
  );

  const ideas = [
    { label: "Reactividad", body: "No manipulamos el DOM. Solo cambiamos los datos mediante setState() y React redibuja automáticamente la pantalla.", accent: C.navy },
    { label: "Inmutabilidad", body: "Jamás modificar datos directos. Siempre generar copias frescas (ej: spreads en arrays y objetos) para que el redibujo se active.", accent: C.red },
    { label: "Elevación", body: "Lifting State Up: Si dos componentes necesitan compartir un dato mutante, el estado se guarda en el padre común.", accent: C.gold },
  ];

  ideas.forEach((idea, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06, title: idea.label, body: idea.body,
      accent: idea.accent, accentW: 0.07, fill: C.white, line: C.border, titleFontSize: 13.2, bodyFontSize: 10.8, rectRadius: 0.06
    });
  });

  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.62, title: "El Cierre del Círculo",
    body: "Con Props y Estado, ahora tienes las herramientas completas para construir cualquier aplicación interactiva moderna.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.gold, titleFontSize: 11.0, bodyFontSize: 10.4
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 60: SÍNTESIS FINAL ────────────────────────────────────────────────

function createFinalCourseSynthesis() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Síntesis: Del Bloque al Sistema",
    "Cierre de Clase · El modelo completo de aplicaciones modernas",
    "Cierre"
  );

  const pillars = [
    { title: "Árbol (B1)", body: "La interfaz se divide en componentes con responsabilidad única.", accent: C.navy },
    { title: "Routing (B2)", body: "La navegación organiza layouts y protege vistas bajo rutas.", accent: C.red },
    { title: "Props (B3)", body: "Inyección Top-Down de datos de solo lectura para reciclar piezas.", accent: C.gold },
    { title: "Estado (B4)", body: "Memoria mutante que dispara actualizaciones automáticas en la UI.", accent: C.navy },
  ];

  pillars.forEach((p, i) => {
    addCard(slide, SH, {
      x: 0.88 + (i % 2) * 5.24, y: 2.22 + Math.floor(i / 2) * 2.04, w: 5.02, h: 1.86,
      title: p.title, body: p.body, accent: p.accent, accentW: 0.07,
      fill: C.white, line: C.border, titleFontSize: 14.2, bodyFontSize: 10.8, rectRadius: 0.06
    });
  });

  addMiniCard(slide, SH, {
    x: 0.88, y: 6.42, w: 10.26, h: 0.52,
    title: "Próxima Clase: Formularios, validación de datos y consumo de APIs reales usando useEffect.",
    body: "", fill: C.navy, line: C.navy, accent: C.gold, titleFontSize: 11.4, color: C.white
  });

  validateSlide(slide, pptx);
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

createCoverSlide();
createMapSlide();
createBlock1IntroSlide();
createSingleFileLimit();
createComponentsAnswer();
createThreeCharacteristics();
createRealNames();
createReadingAScreen();
createComponentTreeSlide();
createContainerVsVisual();
createWhenToSeparate();
createYesNoSeparate();
createTheRule();
createAgentBlock1();
createGuideQuestions();
createBlock1Close();
createBlock2IntroSlide();
createSinglePageVsApp();
createNewQuestions();
createWhatIsRouting();
createWhatRoutingEnables();
createVistaRutaLayout();
createSharedLayout();
createRoutingAsArchitecture();
createRoutingDesignQuestions();
createRoutingMyths();
createAgentBlock2();
createGuideQuestionsBlock2();
createBlock2Close();
createBlock3IntroSlide();
createMonolithProblem();
createVisualParsingSlide();
createCompositionDefinition();
createLegoAnalogy();
createHierarchyResponsibility();
createDeepCompositionTree();
createWhatAreProps();
createHtmlToPropsBridge();
createPropsAsContract();
createOneWayDataFlow();
createPropsCodeAnatomy();
createDestructuringSlide();
createReuseStudyCase();
createVisualLogicPropsSlide();
createPropsVsHardcoding();
createAdvancedCompositionChildren();
createErrorMutateProp();
createGuideQuestionsBlock3();
createBlock3Close();
createBlock4IntroSlide();
createLimitationsOfProps();
createWhatIsState();
createThermostatAnalogy();
createPropsVsStateStrict();
createUiFunctionOfState();
createInteractionLifecycle();
createUseStateAnatomy();
createPedagogicalErrorMutateState();
createImmutabilityPrinciple();
createLiftingStateUp();
createStateMythsRealities();
createGuideQuestionsBlock4();
createBlock4Synthesis();
createFinalCourseSynthesis();

pptx
  .writeFile({ fileName: outputPptx })
  .then(() => {
    console.log(`PPTX generado: ${outputPptx}`);
    fs.copyFileSync(__filename, outputJs);
    console.log(`Fuente copiada: ${outputJs}`);
  })
  .catch((err) => {
    console.error("Error generando PPTX:", err);
    process.exit(1);
  });
