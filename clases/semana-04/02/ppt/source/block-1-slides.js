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

  slide.addText("Props y composición\ncomo flujo de datos", {
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

  slide.addText("Cómo una pieza recibe datos desde afuera y se compone con otras para formar pantallas completas", {
    x: 0.88,
    y: 3.62,
    w: 7.6,
    h: 0.46,
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

// ─── SLIDE 31: COMPOSICIÓN — QUÉ SIGNIFICA ───────────────────────────────────

function createCompositionMeaning() {
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

  slide.addText("Composición significa que", {
    x: 0.88,
    y: 1.04,
    w: 9.0,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.4,
    color: C.slate,
    margin: 0,
    valign: "mid",
  });

  addCenterStatement(slide, SH,
    "una pantalla no se rehace desde cero — se arma ensamblando piezas que se insertan dentro de otras.",
    {
      x: 0.88,
      y: 1.52,
      w: 10.26,
      h: 0.96,
      fill: C.navy,
      line: C.navy,
      fontSize: 17.4,
      color: C.white,
      rectRadius: 0.07,
    }
  );

  slide.addText("Cada componente participa en una estructura donde:", {
    x: 0.88,
    y: 2.64,
    w: 6.0,
    h: 0.24,
    fontFace: TYPOGRAPHY.body,
    fontSize: 11.2,
    color: C.slate,
    margin: 0,
  });

  const roles = [
    { title: "Algunos componentes organizan", body: "DashboardLayout decide cómo se distribuye el espacio. No muestra datos — organiza quién lo hace.", accent: C.navy, fill: C.white, line: C.border },
    { title: "Otros muestran información", body: "StatCard muestra un número con contexto. No organiza el layout — resuelve una pieza concreta.", accent: C.red, fill: C.white, line: C.border },
    { title: "Otros repiten un patrón con contenido distinto", body: "ActivityItem aparece varias veces, cada uno con datos distintos. La estructura es la misma.", accent: C.gold, fill: C.white, line: C.border },
  ];

  roles.forEach((r, i) => {
    addMiniCard(slide, SH, {
      x: 0.88,
      y: 2.98 + i * 1.08,
      w: 10.26,
      h: 0.92,
      title: r.title,
      body: r.body,
      accent: r.accent,
      fill: r.fill,
      line: r.line,
      titleFontSize: 12.6,
      bodyFontSize: 9.0,
    });
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 32: COMPOSICIÓN EN LA PRÁCTICA ────────────────────────────────────

function createCompositionInPractice() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Composición: cada nivel resuelve una cosa",
    "Bloque 3 · 3.1 Cómo la composición construye pantallas complejas desde piezas simples",
    "Bloque 3"
  );

  addStageChain(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 3.08,
    title: "Del nivel raíz al componente más pequeño",
    stages: [
      {
        step: "1",
        title: "App",
        body: "Raíz de la aplicación. Contiene todo y define el contexto global.",
        accent: C.navy,
        tone: "dark",
      },
      {
        step: "2",
        title: "DashboardLayout",
        body: "Organiza la pantalla: sidebar, topbar y área principal.",
        accent: C.navy,
        fill: C.softBlue,
      },
      {
        step: "3",
        title: "MainSection",
        body: "Gestiona el contenido central y sus hijos directos.",
        accent: C.red,
        fill: C.paleRed,
      },
      {
        step: "4",
        title: "StatsGrid + StatCard",
        body: "StatsGrid contiene varias StatCard. Cada una resuelve una tarjeta.",
        accent: C.gold,
        fill: C.softNeutral,
      },
    ],
  });

  addCenterStatement(slide, SH,
    "La composición hace posible construir pantallas complejas sin que todo quede en un solo archivo.",
    {
      x: 0.88,
      y: 5.48,
      w: 10.26,
      h: 0.64,
      fill: C.softBlue,
      line: C.softBlue,
      fontSize: 11.4,
      rectRadius: 0.06,
    }
  );

  validateSlide(slide, pptx);
}

// ─── SLIDE 33: QUÉ SON LAS PROPS ─────────────────────────────────────────────

function createWhatAreProps() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Qué son las props",
    "Bloque 3 · 3.2 Datos que un componente recibe desde afuera para variar su contenido",
    "Bloque 3"
  );

  addCenterStatement(slide, SH,
    "Las props son datos que un componente recibe desde afuera.",
    {
      x: 0.88,
      y: 2.22,
      w: 10.26,
      h: 0.72,
      fill: C.navy,
      line: C.navy,
      fontSize: 18,
      color: C.white,
      rectRadius: 0.06,
    }
  );

  slide.addText("Son la entrada del componente.", {
    x: 0.88,
    y: 3.08,
    w: 4.74,
    h: 0.26,
    fontFace: TYPOGRAPHY.body,
    fontSize: 13.4,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  const leftItems = [
    { title: "La estructura puede ser siempre la misma", body: "ProductCard muestra nombre, precio y etiqueta — igual en todos los usos.", accent: C.navy, fill: C.softBlue, line: C.softBlue },
    { title: "El contenido varía según el padre", body: "El padre pasa datos distintos en cada uso: name='Camiseta', price='$19.990', tag='nuevo'.", accent: C.red, fill: C.white, line: C.border },
    { title: "El componente no sabe de los demás", body: "Una tarjeta no conoce a las otras tarjetas — recibe solo lo que el padre le entrega.", accent: C.gold, fill: C.softNeutral, line: C.softNeutral },
  ];

  leftItems.forEach((item, i) => {
    addMiniCard(slide, SH, {
      x: 0.88,
      y: 3.44 + i * 1.04,
      w: 4.74,
      h: 0.88,
      title: item.title,
      body: item.body,
      accent: item.accent,
      fill: item.fill,
      line: item.line,
      titleFontSize: 11.4,
      bodyFontSize: 8.8,
    });
  });

  addCodePanel(slide, SH, {
    x: 5.84,
    y: 3.08,
    w: 4.68,
    h: 3.72,
    title: "ProductCard recibe props",
    code:
      "function ProductCard({ name, price, tag }) {\n" +
      "  // estructura siempre igual,\n" +
      "  // contenido varía por props\n" +
      "  return (\n" +
      "    <div className=\"card\">\n" +
      "      <h3>{name}</h3>\n" +
      "      <p>{price}</p>\n" +
      "      <span>{tag}</span>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "\n" +
      "// padre pasa props distintas:\n" +
      "<ProductCard\n" +
      "  name=\"Camiseta\"\n" +
      "  price=\"$19.990\"\n" +
      "  tag=\"nuevo\" />\n" +
      "<ProductCard\n" +
      "  name=\"Zapatillas\"\n" +
      "  price=\"$49.990\"\n" +
      "  tag=\"oferta\" />",
    lang: "jsx",
    fontSize: 8.0,
    textOffsetY: 0.72,
    topOffset: 0.08,
    titleFill: C.titleFill,
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 34: LA MISMA ESTRUCTURA, CONTENIDO DISTINTO ────────────────────────

function createSameStructureDifferentContent() {
  const slide = pptx.addSlide();

  slide.background = { color: C.softBlue };
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

  slide.addText("La misma estructura — contenido distinto en cada caso", {
    x: 0.88,
    y: 0.92,
    w: 9.2,
    h: 0.52,
    fontFace: TYPOGRAPHY.display,
    fontSize: 20,
    bold: true,
    color: C.navy,
    margin: 0,
    valign: "mid",
  });

  const statCards = [
    {
      title: "Usuarios activos",
      value: "1.204",
      trend: "+12% esta semana",
      accent: C.navy,
      fill: C.white,
      line: C.border,
      propsText: "name=\"Usuarios activos\"\nvalue=\"1.204\"\ntrend=\"+12%\"",
    },
    {
      title: "Ventas del mes",
      value: "$ 4.820.000",
      trend: "+8% vs mes anterior",
      accent: C.red,
      fill: C.white,
      line: C.border,
      propsText: "name=\"Ventas del mes\"\nvalue=\"$4.820.000\"\ntrend=\"+8%\"",
    },
    {
      title: "Tiempo de sesión",
      value: "4m 37s",
      trend: "-0:22 vs ayer",
      accent: C.gold,
      fill: C.white,
      line: C.border,
      propsText: "name=\"Tiempo de sesión\"\nvalue=\"4m 37s\"\ntrend=\"-22s\"",
    },
  ];

  statCards.forEach((card, i) => {
    const x = 0.88 + i * 3.38;

    addCard(slide, SH, {
      x,
      y: 1.66,
      w: 3.06,
      h: 3.86,
      title: card.title,
      body: card.value + "\n\n" + card.trend,
      accent: card.accent,
      accentW: 0.07,
      fill: card.fill,
      line: card.line,
      titleFontSize: 13.8,
      bodyFontSize: 18,
      rectRadius: 0.06,
    });

    addPanel(slide, x, 5.62, 3.06, 0.72, { fill: C.softNeutral, line: C.softNeutral, rectRadius: 0.04 });
    slide.addText(card.propsText, {
      x: x + 0.14,
      y: 5.66,
      w: 2.78,
      h: 0.64,
      fontFace: "Courier New",
      fontSize: 8.0,
      color: C.navy,
      margin: 0,
      valign: "mid",
    });
  });

  addCenterStatement(slide, SH,
    "Un solo componente reutilizable — tres usos con contenido distinto.",
    {
      x: 0.88,
      y: 6.52,
      w: 10.26,
      h: 0.52,
      fill: C.navy,
      line: C.navy,
      fontSize: 11.4,
      color: C.white,
    }
  );

  validateSlide(slide, pptx);
}

// ─── SLIDE 35: PADRE, HIJO Y FLUJO DE DATOS ──────────────────────────────────

function createParentChildFlow() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Padre, hijo y flujo de datos",
    "Bloque 3 · 3.3 La relación entre el componente que organiza y el que muestra",
    "Bloque 3"
  );

  addCard(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 4.54,
    h: 3.96,
    title: "ProductList — padre",
    body: "Actúa como organizador:\n\n· Conoce la lista completa de productos\n· Decide cuántas tarjetas renderizar\n· Entrega a cada ProductCard los datos que le corresponden\n· Coordina el flujo de información hacia abajo",
    accent: C.navy,
    accentW: 0.07,
    fill: C.softBlue,
    line: C.softBlue,
    titleFontSize: 17,
    bodyFontSize: 11.2,
    rectRadius: 0.06,
  });

  addArrow(slide, 5.56, 4.06, 0.22, 0.28, C.gold);

  addCard(slide, SH, {
    x: 5.92,
    y: 2.22,
    w: 4.54,
    h: 3.96,
    title: "ProductCard — hijo",
    body: "Actúa como receptor:\n\n· Recibe los datos que el padre le pasa\n· Renderiza una sola tarjeta con esas props\n· No sabe nada de las otras tarjetas\n· No decide qué datos mostrar — los recibe",
    accent: C.red,
    accentW: 0.07,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 17,
    bodyFontSize: 11.2,
    rectRadius: 0.06,
  });

  addCenterStatement(slide, SH,
    "El padre organiza y pasa datos. El hijo recibe y muestra. No al revés.",
    {
      x: 0.88,
      y: 6.36,
      w: 10.26,
      h: 0.52,
      fill: C.softNeutral,
      line: C.softNeutral,
      fontSize: 10.6,
    }
  );

  validateSlide(slide, pptx);
}

// ─── SLIDE 36: EL FLUJO VA DE ARRIBA HACIA ABAJO ─────────────────────────────

function createDataFlowDown() {
  const slide = pptx.addSlide();

  slide.background = { color: C.softNeutral };
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

  slide.addText("Gran parte del flujo de datos básico va", {
    x: 0.88,
    y: 1.08,
    w: 9.0,
    h: 0.32,
    fontFace: TYPOGRAPHY.body,
    fontSize: 14.4,
    color: C.slate,
    margin: 0,
    valign: "mid",
  });

  addCenterStatement(slide, SH,
    "desde arriba hacia abajo — del padre al hijo.",
    {
      x: 0.88,
      y: 1.56,
      w: 10.26,
      h: 1.04,
      fill: C.navy,
      line: C.navy,
      fontSize: 24,
      color: C.white,
      rectRadius: 0.08,
    }
  );

  const steps = [
    { label: "Componente superior organiza", detail: "Define qué datos existen y quién se encarga de cada parte.", accent: C.navy },
    { label: "Pasa datos como props al nivel siguiente", detail: "Cada hijo recibe solo lo que necesita — ni más, ni menos.", accent: C.navy },
    { label: "El hijo muestra o usa esos datos", detail: "No decide qué datos procesar — usa los que recibió del padre.", accent: C.red },
  ];

  steps.forEach((s, i) => {
    addMiniCard(slide, SH, {
      x: 0.88,
      y: 2.80 + i * 1.02,
      w: 10.26,
      h: 0.84,
      title: s.label,
      body: s.detail,
      accent: s.accent,
      fill: i % 2 === 0 ? C.white : C.softBlue,
      line: i % 2 === 0 ? C.border : C.softBlue,
      titleFontSize: 12.8,
      bodyFontSize: 9.4,
    });
  });

  addCenterStatement(slide, SH,
    "Entender ese flujo evita uno de los errores más comunes al entrar a React u otros frameworks equivalentes.",
    {
      x: 0.88,
      y: 5.96,
      w: 10.26,
      h: 0.52,
      fill: C.border,
      line: C.border,
      fontSize: 9.4,
      color: C.navy,
    }
  );

  validateSlide(slide, pptx);
}

// ─── SLIDE 37: LEER EL FLUJO EVITA ERRORES ───────────────────────────────────

function createFlowErrors() {
  const slide = pptx.addSlide();

  slide.background = { color: C.softBlue };

  addHeader(
    slide,
    "Leer el flujo evita errores tempranos",
    "Bloque 3 · 3.3 Qué ocurre cuando no se distingue quién organiza y quién recibe",
    "Bloque 3"
  );

  const errors = [
    { title: "Creer que todos los componentes «saben todo» por sí solos", body: "Un componente solo conoce lo que el padre le pasa. Si necesita más, el diseño tiene un problema.", accent: C.red },
    { title: "No distinguir qué dato viene desde afuera", body: "Confundir datos de props con datos internos lleva a componentes difíciles de reutilizar.", accent: C.red },
    { title: "Mezclar reutilizables con muy dependientes del contexto", body: "Un componente que depende de demasiados datos externos se vuelve difícil de usar en otros lugares.", accent: C.navy },
    { title: "Ignorar quién es el padre responsable de los datos", body: "Si no hay un padre claro que organice, el flujo de datos se vuelve confuso y frágil.", accent: C.navy },
  ];

  errors.forEach((err, i) => {
    addCard(slide, SH, {
      x: 1.08,
      y: 2.22 + i * 1.1,
      w: 9.9,
      h: 1.0,
      title: err.title,
      body: err.body,
      fill: C.white,
      line: C.border,
      accent: err.accent,
      accentW: 0.07,
      titleFontSize: 13.8,
      bodyFontSize: 9.4,
      rectRadius: 0.05,
    });
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 38: REUTILIZACIÓN CON VARIANTES ────────────────────────────────────

function createReusabilityWithVariants() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El valor real de las props: reutilización con variantes",
    "Bloque 3 · 3.4 Por qué un componente reutilizable con props distintas es mejor que varios componentes similares",
    "Bloque 3"
  );

  addChecklistGrid(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 4.54,
    title: "Qué mejora con reutilización",
    columns: 2,
    entries: [
      {
        badge: "✓",
        title: "Consistencia visual",
        body: "La misma estructura para todos los usos. Si el diseño cambia, cambia en un solo lugar.",
        accent: C.navy,
        fill: C.softBlue,
        badgeFill: C.navy,
      },
      {
        badge: "✓",
        title: "Mantenibilidad",
        body: "Modificar el componente afecta todos los usos a la vez. No hay tres versiones distintas del mismo patrón.",
        accent: C.red,
        fill: C.paleRed,
        badgeFill: C.red,
      },
      {
        badge: "✓",
        title: "Legibilidad del proyecto",
        body: "Menos código duplicado. El proyecto tiene piezas identificables en vez de bloques repetidos a mano.",
        accent: C.gold,
        fill: C.softNeutral,
        badgeFill: "B8962A",
      },
      {
        badge: "✓",
        title: "Posibilidad de cambio futuro",
        body: "Si el diseño o los datos cambian, solo cambia el componente — no cada lugar donde se usa.",
        accent: C.navy,
        fill: C.softBlue,
        badgeFill: C.navy,
      },
    ],
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 39: MITOS DE LAS PROPS ────────────────────────────────────────────

function createPropsMythsSlide() {
  const slide = pptx.addSlide();

  slide.background = { color: C.softNeutral };
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

  addMythRealityGrid(slide, SH, {
    x: 0.88,
    y: 0.88,
    w: 10.26,
    h: 6.42,
    title: "Props — mitos y realidades",
    columns: 2,
    entries: [
      {
        badge: "Mito",
        myth: "Las props son como variables globales del componente",
        reality: "Las props vienen siempre desde afuera — son datos que el padre entrega, no variables propias.",
        accent: C.red,
        fill: C.paleRed,
        badgeFill: C.paleRed,
      },
      {
        badge: "Mito",
        myth: "Más props hacen el componente más potente",
        reality: "Un componente con demasiadas props suele estar haciendo demasiadas cosas — conviene dividirlo.",
        accent: C.navy,
        fill: C.softBlue,
        badgeFill: C.softBlue,
      },
      {
        badge: "Mito",
        myth: "El hijo puede modificar sus props directamente",
        reality: "Las props son de solo lectura. Si algo debe cambiar, se usa estado — no se modifican las props.",
        accent: C.red,
        fill: C.paleRed,
        badgeFill: C.paleRed,
      },
      {
        badge: "Mito",
        myth: "Las props son solo para texto o números",
        reality: "Las props pueden ser cualquier dato: objetos, listas, funciones o incluso otros componentes.",
        accent: C.navy,
        fill: C.softBlue,
        badgeFill: C.softBlue,
      },
    ],
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 40: EL AGENTE EN PROPS Y COMPOSICIÓN ───────────────────────────────

function createAgentBlock3() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "El agente puede proponer — tú validas el flujo",
    "Bloque 3 · Huella metodológica: IA y agentes en props y composición",
    "Bloque 3"
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
        "Detectar qué partes de la interfaz podrían reutilizarse",
        "Proponer nombres de props razonables para un componente",
        "Convertir una estructura repetida en una pieza reutilizable",
        "Explicar qué datos deberían venir desde el padre",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene delegar sin revisión",
      subtitle: "Requiere tu criterio técnico",
      items: [
        "Validar que el flujo de datos tenga sentido real",
        "Detectar props innecesarias o jerarquías mal pensadas",
        "Decidir si la reutilización mejora o complica la lectura",
        "Evaluar si la relación padre-hijo está bien diseñada",
      ],
      accent: C.red,
      fill: C.paleRed,
    },
    bridgeLabel: "→",
    bridgeBody: "propone\nvalidas",
    footer: "Un agente puede crear props innecesarias o jerarquías difíciles de mantener. La lectura del flujo la haces tú.",
  });

  validateSlide(slide, pptx);
}

// ─── SLIDE 41: PREGUNTAS GUÍA BLOQUE 3 ───────────────────────────────────────

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
      text: "¿Qué ventaja tiene construir una sección con componentes reutilizables en vez de copiar el mismo bloque muchas veces?",
    },
    {
      n: "02",
      text: "Si varias tarjetas comparten estructura pero cambian el contenido, ¿qué conviene variar: el componente o las props?",
    },
    {
      n: "03",
      text: "¿Qué significa exactamente decir que las props son la entrada de un componente?",
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

// ─── SLIDE 42: SÍNTESIS Y CIERRE B3 ──────────────────────────────────────────

function createBlock3Close() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Síntesis del Bloque 3",
    "Bloque 3 · Lo que se instala antes de avanzar al estado",
    "Bloque 3"
  );

  addCenterStatement(slide, SH,
    "La composición arma la interfaz.\nLas props permiten que la misma pieza reciba datos distintos sin dejar de ser el mismo componente.",
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
      label: "Composición",
      body: "Una pantalla se construye ensamblando componentes que se insertan dentro de otros.",
      accent: C.navy,
    },
    {
      label: "Props",
      body: "Datos que llegan desde afuera del componente. Son su entrada — no sus variables propias.",
      accent: C.red,
    },
    {
      label: "Flujo de datos",
      body: "La información viaja de arriba hacia abajo: del padre que organiza al hijo que muestra.",
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
    title: "Bloque 4 →",
    body: "Una vez que entendemos el flujo de datos que llega desde afuera, el siguiente paso es entender qué ocurre cuando la información cambia dentro del propio componente. Ahí entra el estado.",
    fill: C.softNeutral,
    line: C.softNeutral,
    accent: C.gold,
    titleFontSize: 11.0,
    bodyFontSize: 10.4,
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
