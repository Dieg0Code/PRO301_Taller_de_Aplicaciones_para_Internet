const fs = require("fs");
const path = require("path");
const PptxGenJS = require("../../../../../tools/slides-system/node_modules/pptxgenjs");
const slidesSystem = require("../../../../../tools/slides-system/dist/index.js");

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
  addChecklistGrid,
  addMythRealityGrid,
  addTableSchema,
  addErRelationship,
} = components;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
applyAiepTheme(pptx, {
  author: "Diego Obando",
  company: "AIEP",
  subject: "Clase 14",
  title: "Persistencia y Modelado de Datos",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx = path.join(rootDir, "Clase-14-Persistencia-Modelado.pptx");

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
    classLabel: `Clase 14 · ${blockLabel}`,
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
    x, y: y + 0.18 * scale, w: 0.2 * scale, h: 0.46 * scale,
    fill: { color: fill }, line: { color: fill },
  });
  slide.addShape(SH.rect, {
    x: x + 0.24 * scale, y, w: 0.24 * scale, h: 0.64 * scale,
    fill: { color: fill }, line: { color: fill },
  });
  slide.addShape(SH.rect, {
    x: x + 0.52 * scale, y: y + 0.18 * scale, w: 0.2 * scale, h: 0.46 * scale,
    fill: { color: fill }, line: { color: fill },
  });
}

// ─── INTRODUCCIÓN ────────────────────────────────────────────────────────────

// S1: PORTADA
function createCoverSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  slide.addImage({ path: logoPath, x: 0.88, y: 0.62, w: 1.2, h: 0.42 });
  addBarsMotif(slide, 0.88, 1.84, 1.4, C.red);
  slide.addText("Persistencia y Modelado de Datos:\nEl Esqueleto de la Información", {
    x: 0.88, y: 2.82, w: 10.26, h: 1.44,
    fontFace: TYPOGRAPHY.display, fontSize: 44, bold: true, color: C.white,
    margin: 0, valign: "top",
  });
  slide.addText("Semana 05 · Clase 02: PostgreSQL, Entidades y Supabase", {
    x: 0.88, y: 4.42, w: 10.26, h: 0.34,
    fontFace: TYPOGRAPHY.body, fontSize: 18, color: C.gold, bold: true,
  });
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 5.82, w: 0.82, h: 0.82 });
  validateSlide(slide, pptx);
}

// S2: MOMENTO DE CONEXIÓN
function createConnectionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "¿Qué pasa si tu app olvida quién eres?", "El problema de la volatilidad", "Contexto");
  addCenterStatement(slide, SH, "¿De qué sirve un sistema si cada reinicio borra pedidos, usuarios o historial?", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.12, fill: C.navy, fontSize: 22, color: C.white, rectRadius: 0.08
  });
  const points = [
    { t: "La App recuerda", b: "Tus preferencias, tu carrito, tus amigos." },
    { t: "El Negocio opera", b: "Ventas, stock, facturas, registros." },
    { t: "La IA ayuda", b: "Sugiriendo cómo estructurar ese 'recuerdo'." },
  ];
  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.82, w: 3.2, h: 2.4,
      title: p.t, body: p.body, accent: C.gold, fill: C.white, line: C.border
    });
  });
  validateSlide(slide, pptx);
}

// S3: OBJETIVO GENERAL
function createGeneralObjectiveSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Objetivo General de la Clase", "Hacia sistemas con memoria real", "Objetivos");
  addCenterStatement(slide, SH, "Diseñar modelos de datos coherentes y escalables, transformando ideas en tablas físicas usando PostgreSQL (vía Supabase).", {
    x: 0.88, y: 2.22, w: 10.26, h: 2.5, fill: C.softBlue, color: C.navy, fontSize: 24, bold: true
  });
  validateSlide(slide, pptx);
}

// S4: RUTA DE APRENDIZAJE
function createLearningPathSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Ruta de Aprendizaje: Hoy", "4 Bloques hacia la persistencia", "Mapa");
  const blocks = [
    { title: "Bloque 1", body: "Memoria vs Persistencia. Entidades y Atributos.", active: true },
    { title: "Bloque 2", body: "Relaciones y Cardinalidad (1:1, 1:N, N:M).", active: false },
    { title: "Bloque 3", body: "Diseño y Diagramas (DER). Normalización.", active: false },
    { title: "Bloque 4", body: "Implementación en Supabase (Postgres).", active: false },
  ];
  blocks.forEach((b, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 3.6, w: 2.4, h: 2.8,
      title: b.title, body: b.body, accent: b.active ? C.red : C.navy,
      fill: b.active ? C.paleRed : C.white, line: C.border, titleFontSize: 12, bodyFontSize: 9.5
    });
  });
  validateSlide(slide, pptx);
}

// S5: HUELLA IA DEL DÍA
function createIAFootprintSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Huella IA: El Agente Arquitecto", "Colaboración Inteligente", "IA");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "El Agente como apoyo en el modelado",
    columns: 2,
    entries: [
      { badge: "USE", title: "Borradores de Esquemas", body: "Pedir propuestas de tablas y atributos iniciales.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "USE", title: "Generación de SQL", body: "Traducir el diseño visual a código técnico para Supabase.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "VALIDATE", title: "Reglas de Negocio", body: "La IA no sabe cómo opera TU empresa. Valida cada relación.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "VALIDATE", title: "Ambigüedades", body: "Revisa que los nombres sean claros y las PK sean únicas.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
    ]
  });
  validateSlide(slide, pptx);
}

// ─── BLOQUE 1: DE LA MEMORIA VOLÁTIL A LA PERSISTENCIA ───────────────────────

// S6: APERTURA B1
function createBlock1IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 1", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("De la Memoria Volátil\na la Persistencia", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("Entendiendo por qué el backend necesita una memoria estable para sostener el mundo real.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  validateSlide(slide, pptx);
}

// S7: MEMORIA VOLÁTIL VS PERSISTENCIA
function createVolatileVsPersistenceSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Memoria Volátil vs. Persistencia", "Bloque 1 · 1.1 Diferencia Operativa", "Bloque 1");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "¿Dónde vive el dato?",
    left: {
      title: "Memoria Volátil", subtitle: "RAM / Variables",
      items: ["Rápida pero efímera.", "Se pierde al apagar/reiniciar.", "Ej: useState, listas en Python."],
      accent: C.navy, fill: C.softBlue
    },
    right: {
      title: "Persistencia", subtitle: "Disco / Bases de Datos",
      items: ["Lenta pero estable.", "Sobrevive al paso del tiempo.", "Ej: PostgreSQL, Archivos."],
      accent: C.red, fill: C.paleRed
    },
    bridgeLabel: "vs", bridgeBody: "durabilidad\ndel dato",
  });
  validateSlide(slide, pptx);
}

// S8: LA ENTIDAD
function createEntitySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Entidad: El Sustantivo del Negocio", "Bloque 1 · 1.3 Modelando la realidad", "Bloque 1");
  addCenterStatement(slide, SH, "Una entidad es un objeto relevante para el negocio que queremos representar.", {
    x: 0.88, y: 2.22, w: 10.26, h: 0.82, fill: C.navy, fontSize: 18, color: C.white
  });
  const entities = [
    { t: "Cliente", b: "La persona que compra.", icon: "👤" },
    { t: "Producto", b: "El ítem disponible para venta.", icon: "📦" },
    { t: "Pedido", b: "La transacción realizada.", icon: "🛒" },
  ];
  entities.forEach((e, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 4.22, w: 3.2, h: 2.4,
      title: e.t, body: e.b, accent: C.navy,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 11
    });
    slide.addText(e.icon, { x: 0.88 + i * 3.44, y: 3.2, w: 3.2, h: 0.8, fontSize: 32, align: "center" });
  });
  validateSlide(slide, pptx);
}

// S9: ATRIBUTOS
function createAttributesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Atributos: Describiendo la Entidad", "Bloque 1 · 1.3 ¿Qué datos guardamos?", "Bloque 1");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Entidad: Producto",
    code: `Atributos:
- ID (Unívoco)
- Nombre (Texto)
- Precio (Número)
- Stock (Entero)
- Categoría (Texto)`,
    lang: "text", fontSize: 18, titleFill: C.navy
  });
  validateSlide(slide, pptx);
}

// S10: PRIMARY KEY
function createPKSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Primary Key (PK): Identidad Única", "Bloque 1 · 1.4 Sin ambigüedad", "Bloque 1");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.8,
    title: "La importancia de la Llave Primaria",
    body: "Permite distinguir una fila de otra aunque tengan datos parecidos. Evita confusiones y es la base de las relaciones.",
    accent: C.red, fill: C.white, line: C.border
  });
  const types = [
    { t: "ID Serial", b: "1, 2, 3... Automático." },
    { t: "UUID", b: "Identificadores únicos universales." },
    { t: "Natural", b: "RUT, Email (si son estables)." },
  ];
  types.forEach((t, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 4.22, w: 3.2, h: 2.0,
      title: t.t, body: t.b, accent: C.gold, fill: C.white, line: C.border
    });
  });
  validateSlide(slide, pptx);
}

// S11: SÍNTESIS B1
function createSynthesisB1Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 1", "Los pilares del Modelado", "Bloque 1");
  addCenterStatement(slide, SH, "Pasamos de 'variables efímeras' a 'entidades identificables' listas para persistir.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });
  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.62, title: "Próximo Bloque → Relaciones",
    body: "Ya sabemos identificar objetos. Ahora veremos cómo conectarlos para que el sistema cobre vida.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.gold, titleFontSize: 11, bodyFontSize: 10.4
  });
  validateSlide(slide, pptx);
}

// ─── BLOQUE 2: RELACIONES Y CARDINALIDAD ─────────────────────────────────────

// S12: APERTURA B2
function createBlock2IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 2", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("Relaciones y Cardinalidad:\nConectando el Mundo de los Datos", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("Cómo las entidades se vinculan técnicamente para representar procesos de negocio reales.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  validateSlide(slide, pptx);
}

// S13: LOS DATOS NO ESTÁN AISLADOS
function createDataNotIsolatedSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Los Datos no están aislados", "Bloque 2 · 2.1 Los verbos del sistema", "Bloque 2");
  addCenterStatement(slide, SH, "Una entidad sin relaciones es un dato muerto. El Backend gestiona VÍNCULOS.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.softBlue, color: C.navy, fontSize: 18, rectRadius: 0.07
  });
  const relations = [
    { t: "Usuario → Post", b: "Un usuario 'crea' o 'escribe' contenido." },
    { t: "Pedido → Producto", b: "Un pedido 'contiene' uno o más ítems." },
    { t: "Estudiante → Curso", b: "Un alumno 'se inscribe' en una materia." },
  ];
  relations.forEach((r, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.82, w: 3.2, h: 2.4,
      title: r.t, body: r.b, accent: C.red, fill: C.white, line: C.border
    });
  });
  validateSlide(slide, pptx);
}

// S14: LA LLAVE FORÁNEA (FK)
function createFKSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Llave Foránea (FK): El Embajador", "Bloque 2 · 2.2 Creando el puente técnico", "Bloque 2");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Primary Key vs Foreign Key",
    left: {
      title: "Primary Key (PK)", subtitle: "Identidad Interna",
      items: ["Define quién soy YO.", "Es única en mi tabla.", "Nunca se repite."],
      accent: C.navy, fill: C.softBlue
    },
    right: {
      title: "Foreign Key (FK)", subtitle: "Vínculo Externo",
      items: ["Dice a quién PERTENEZCO.", "Es la PK de otra tabla.", "Puede repetirse."],
      accent: C.gold, fill: C.white
    },
    bridgeLabel: "→", bridgeBody: "relación",
  });
  validateSlide(slide, pptx);
}

// S15: VISUALIZANDO LA CONEXIÓN (ER RELATIONSHIP)
function createVisualConnectionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Visualizando la Conexión", "Bloque 2 · 2.2 Mapeo de Tablas", "Bloque 2");
  
  // Explicación lateral
  addMiniCard(slide, SH, {
    x: 0.88, y: 2.22, w: 3.0, h: 4.54,
    title: "Anatomía del Vínculo",
    body: "1. La PK de 'users' identifica al dueño.\n\n2. La FK en 'orders' apunta a ese ID.\n\n3. La relación permite saber qué usuario hizo qué compra sin repetir nombres.",
    accent: C.navy, fill: C.softBlue, titleFontSize: 14, bodyFontSize: 11
  });

  // Diagrama ensanchado (3.4 para evitar quiebre de 'username')
  addTableSchema(slide, SH, {
    x: 4.2, y: 2.22, w: 3.4,
    title: "users",
    columns: [
      { name: "id", type: "uuid", isPk: true },
      { name: "username", type: "text" },
      { name: "email", type: "text" }
    ]
  });

  addTableSchema(slide, SH, {
    x: 8.8, y: 2.22, w: 3.0,
    title: "orders",
    columns: [
      { name: "id", type: "uuid", isPk: true },
      { name: "user_id", type: "uuid", isFk: true },
      { name: "total", type: "numeric" }
    ]
  });

  // Conexión sin label interno para control manual de altura
  addErRelationship(slide, SH, {
    startX: 7.6, startY: 3.0, endX: 8.8, endY: 3.0,
    type: "1:N", color: C.red
  });
  slide.addText("crea", {
    x: 7.6 + (8.8 - 7.6)/2 - 0.5, y: 2.6, w: 1.0, h: 0.2,
    fontFace: TYPOGRAPHY.body, fontSize: 8, bold: true, color: C.red, align: "center", fill: { color: C.white }
  });

  validateSlide(slide, pptx);
}

// S16: CARDINALIDAD
function createCardinalitySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Cardinalidad: ¿Cuántos con cuántos?", "Bloque 2 · 2.3 Reglas de Negocio", "Bloque 2");
  addCenterStatement(slide, SH, "Define el número de elementos que pueden participar en una relación.", {
    x: 0.88, y: 2.22, w: 10.26, h: 0.82, fill: C.navy, color: C.white, fontSize: 18
  });
  const types = [
    { t: "1 : 1", b: "Un registro para un solo registro.", icon: "↔️" },
    { t: "1 : N", b: "Un registro para muchos del otro lado.", icon: "🌿" },
    { t: "N : M", b: "Muchos para muchos (requiere tabla extra).", icon: "🕸️" },
  ];
  types.forEach((t, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 4.42, w: 3.2, h: 2.2,
      title: t.t, body: t.b, accent: C.red, fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
    slide.addText(t.icon, { x: 0.88 + i * 3.44, y: 3.42, w: 3.2, h: 0.8, fontSize: 32, align: "center" });
  });
  validateSlide(slide, pptx);
}

// S17: RELACIÓN 1:N (LA MÁS COMÚN)
function createOneToManySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Relación 1:N: La Reina de las Relaciones", "Bloque 2 · 2.3 Autor → Libros", "Bloque 2");
  
  addMiniCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 0.82,
    title: "Regla Técnica de Oro",
    body: "En una relación 1:N, la Foreign Key (FK) siempre viaja hacia la tabla del lado del 'Muchos'.",
    accent: C.gold, fill: C.softNeutral, titleFontSize: 12, bodyFontSize: 10.5
  });

  addTableSchema(slide, SH, {
    x: 0.88, y: 3.42, w: 3.0,
    title: "autores",
    columns: [
      { name: "id", type: "serial", isPk: true },
      { name: "nombre", type: "text" }
    ]
  });

  addTableSchema(slide, SH, {
    x: 5.42, y: 3.42, w: 3.2,
    title: "libros",
    columns: [
      { name: "id", type: "serial", isPk: true },
      { name: "titulo", type: "text" },
      { name: "autor_id", type: "int", isFk: true }
    ]
  });

  addErRelationship(slide, SH, {
    startX: 3.88, startY: 4.2, endX: 5.42, endY: 4.2,
    type: "1:N", color: C.red
  });
  slide.addText("escribe", {
    x: 3.88 + (5.42 - 3.88)/2 - 0.5, y: 3.8, w: 1.0, h: 0.2,
    fontFace: TYPOGRAPHY.body, fontSize: 8, bold: true, color: C.red, align: "center", fill: { color: C.white }
  });

  addMiniCard(slide, SH, {
    x: 9.0, y: 3.42, w: 2.14, h: 2.8,
    title: "Análisis",
    body: "Un autor puede escribir 100 libros, pero cada libro tiene un único autor principal en este modelo.",
    accent: C.red, fill: C.white, titleFontSize: 11, bodyFontSize: 9.5
  });

  validateSlide(slide, pptx);
}

// S18: RELACIÓN N:M Y TABLA INTERMEDIA
function createManyToManySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Relación N:M: El Desafío de la Multiplicidad", "Bloque 2 · 2.3 Estudiantes ↔ Cursos", "Bloque 2");
  
  addCenterStatement(slide, SH, "El modelo relacional prohíbe el N:M directo para evitar redundancia infinita. La 'Tabla Pivot' rompe el ciclo en dos relaciones 1:N.", {
    x: 0.88, y: 2.22, w: 10.26, h: 0.82, fill: C.red, color: C.white, fontSize: 14, bold: true
  });

  // Distribución amplia (Brechas de 1.1)
  addTableSchema(slide, SH, {
    x: 0.88, y: 3.42, w: 3.0,
    title: "estudiantes",
    columns: [{ name: "id", type: "uuid", isPk: true }, { name: "nombre", type: "text" }]
  });

  addTableSchema(slide, SH, {
    x: 5.0, y: 3.42, w: 3.0,
    title: "inscripciones",
    columns: [
      { name: "estudiante_id", type: "uuid", isFk: true },
      { name: "curso_id", type: "uuid", isFk: true }
    ]
  });

  addTableSchema(slide, SH, {
    x: 9.12, y: 3.42, w: 3.0,
    title: "cursos",
    columns: [{ name: "id", type: "uuid", isPk: true }, { name: "titulo", type: "text" }]
  });

  // Relaciones con etiquetas manuales elevadas
  addErRelationship(slide, SH, {
    startX: 3.88, startY: 4.2, endX: 5.0, endY: 4.2,
    type: "1:N", color: C.red
  });
  slide.addText("se inscribe", {
    x: 3.88 + (5.0-3.88)/2 - 0.5, y: 3.8, w: 1.0, h: 0.2,
    fontFace: TYPOGRAPHY.body, fontSize: 7, bold: true, color: C.red, align: "center", fill: { color: C.white }
  });

  addErRelationship(slide, SH, {
    startX: 9.12, startY: 4.2, endX: 8.0, endY: 4.2,
    type: "1:N", color: C.red
  });
  slide.addText("contiene", {
    x: 8.0 + (9.12-8.0)/2 - 0.5, y: 3.8, w: 1.0, h: 0.2,
    fontFace: TYPOGRAPHY.body, fontSize: 7, bold: true, color: C.red, align: "center", fill: { color: C.white }
  });

  validateSlide(slide, pptx);
}

// S19: INTEGRIDAD REFERENCIAL
function createReferentialIntegritySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Integridad Referencial", "Bloque 2 · 2.4 El contrato de seguridad", "Bloque 2");
  addMythRealityGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Reglas de Borrado",
    entries: [
      { badge: "RESTRICT", myth: "Borrar al padre con hijos.", reality: "La DB lo prohíbe para evitar huérfanos.", accent: C.red, badgeFill: C.paleRed },
      { badge: "CASCADE", myth: "Limpieza automática.", reality: "Si borras al usuario, se borran todos sus posts.", accent: C.red, badgeFill: C.paleRed },
      { badge: "SET NULL", myth: "Mantener el dato hijo.", reality: "Se borra el padre, pero el hijo queda sin dueño.", accent: C.navy, badgeFill: C.softBlue },
      { badge: "NO ACTION", myth: "Ignorar el vínculo.", reality: "Similar a Restrict, espera al final de la transacción.", accent: C.navy, badgeFill: C.softBlue },
    ]
  });
  validateSlide(slide, pptx);
}

// S20: IA EN EL DISEÑO DE RELACIONES
function createIARelationsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "IA en el Diseño de Relaciones", "Bloque 2 · Huella Metodológica", "IA");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Prompting para Cardinalidad",
    columns: 2,
    entries: [
      { badge: "OK", title: "Definir Dominio", body: "Dale el contexto del negocio antes de pedir la relación.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "OK", title: "Validar Lógica", body: "Pregúntale: '¿Por qué elegiste 1:N y no N:M para este caso?'.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "NO", title: "Confianza Ciega", body: "La IA a veces olvida las tablas intermedias. Tú debes exigirlas.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "NO", title: "Ambigüedad", body: "No aceptes 'se relaciona con'. Exige cardinalidad específica.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
    ]
  });
  validateSlide(slide, pptx);
}

// S21: PREGUNTAS GUÍA B2
function createGuideQuestionsB2Slide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 2", { x: 0.88, y: 0.44, w: 3.4, h: 0.3, fill: C.navy, color: C.white, fontSize: 10.0 });
  const questions = [
    { n: "01", text: "¿Por qué decimos que la Foreign Key es el 'Embajador' de otra tabla?" },
    { n: "02", text: "¿En qué lado de la relación (1 o N) debe ubicarse siempre la llave foránea?" },
    { n: "03", text: "¿Qué problema evitamos al usar la regla de integridad 'RESTRICT'?" },
  ];
  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, { x: 0.88, y: y + 0.04, w: 0.58, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.border, margin: 0, valign: "mid" });
    slide.addText(q.text, { x: 1.6, y, w: 8.72, h: 1.56, fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.navy, margin: 0, valign: "mid" });
    if (i < 2) slide.addShape(SH.line, { x: 0.88, y: y + 1.72, w: 10.28, h: 0, line: { color: C.border, pt: 1 } });
  });
  validateSlide(slide, pptx);
}

// S22: SÍNTESIS B2
function createSynthesisB2Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 2", "El poder de los vínculos", "Bloque 2");
  addCenterStatement(slide, SH, "Las relaciones definen cómo fluye la información y cómo se protege la integridad del sistema.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });
  const points = [
    { title: "Foreign Key", body: "El mecanismo técnico para conectar una fila con otra tabla.", accent: C.navy },
    { title: "Cardinalidad", body: "La regla de negocio que define cuántos se vinculan con cuántos.", accent: C.red },
    { title: "Integridad", body: "Las reglas (Cascade/Restrict) que aseguran que no haya datos huérfanos.", accent: C.gold },
  ];
  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06, title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });
  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.62, title: "Próximo Bloque → Diagramas DER",
    body: "Ya sabemos cómo se conectan los datos. Ahora aprenderemos a dibujarlos profesionalmente.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.gold, titleFontSize: 11, bodyFontSize: 10.4
  });
  validateSlide(slide, pptx);
}

// ─── BLOQUE 3: DISEÑO Y DIAGRAMAS (DER) ──────────────────────────────────────

// S23: APERTURA B3
function createBlock3IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 3", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("Diseño y Diagramas:\nEl Mapa de la Información", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("De la idea al modelo físico: Normalización y notación profesional DER.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  validateSlide(slide, pptx);
}

// S24: ¿POR QUÉ DISEÑAR?
function createWhyDesignSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "¿Por qué diseñar antes de programar?", "Bloque 3 · 3.1 El costo del error", "Bloque 3");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    title: "Diagrama vs. Producción",
    left: {
      title: "Error en DER", subtitle: "Fase de Diseño",
      items: ["Se arregla con 1 clic.", "Costo: 5 segundos.", "Impacto: Cero."],
      accent: C.navy, fill: C.softBlue
    },
    right: {
      title: "Error en DB Viva", subtitle: "Fase de Producción",
      items: ["Migraciones complejas.", "Costo: Miles de dólares.", "Riesgo: Pérdida de datos."],
      accent: C.red, fill: C.paleRed
    },
    bridgeLabel: "vs", bridgeBody: "deuda\ntécnica",
  });
  validateSlide(slide, pptx);
}

// S25: NOTACIÓN CROW'S FOOT
function createCrowsFootSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Notación Crow's Foot (Pata de Gallo)", "Bloque 3 · 3.2 Simbología Estándar", "Bloque 3");
  addCenterStatement(slide, SH, "Simbología universal para representar la cardinalidad y obligatoriedad en diagramas DER.", {
    x: 0.88, y: 2.0, w: 10.26, h: 0.62, fill: C.navy, color: C.white, fontSize: 16
  });

  const examples = [
    { type: "1:1", label: "Uno y solo Uno", desc: "Relación obligatoria y única. Un RUT pertenece a una persona.", y: 3.2 },
    { type: "1:N", label: "Uno a Muchos", desc: "Un registro origen tiene múltiples destinos. Un Autor, muchos Libros.", y: 4.8 },
  ];

  examples.forEach((ex, i) => {
    // Texto descriptivo
    slide.addText(ex.label, { x: 0.88, y: ex.y, w: 2.5, h: 0.4, fontFace: TYPOGRAPHY.display, fontSize: 16, bold: true, color: C.navy });
    slide.addText(ex.desc, { x: 3.5, y: ex.y, w: 4.0, h: 0.4, fontFace: TYPOGRAPHY.body, fontSize: 12, color: C.navy });

    // Representación visual
    addErRelationship(slide, SH, {
      startX: 8.0, startY: ex.y + 0.2, endX: 10.5, endY: ex.y + 0.2,
      type: ex.type, color: C.red
    });
  });

  validateSlide(slide, pptx);
}

// S26: DEL DIAGRAMA AL CÓDIGO (1:N)
function createDiagramToSqlSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Del Diagrama al Código SQL", "Bloque 3 · 3.2 Implementación Técnica", "Bloque 3");
  
  // Esquema visual (Bajado a y: 2.0 para evitar solapamiento con subtítulo)
  addTableSchema(slide, SH, {
    x: 0.88, y: 2.0, w: 2.8, title: "categories",
    columns: [{ name: "id", type: "serial", isPk: true }, { name: "name", type: "text" }]
  });
  addTableSchema(slide, SH, {
    x: 5.2, y: 2.0, w: 3.2, title: "products",
    columns: [
      { name: "id", type: "serial", isPk: true },
      { name: "cat_id", type: "int", isFk: true }
    ]
  });
  
  // Flecha horizontal roja con etiqueta
  addErRelationship(slide, SH, { 
    startX: 3.68, startY: 2.38, endX: 5.2, endY: 2.38, 
    type: "1:N", color: C.red 
  });
  slide.addText("contiene", {
    x: 3.68 + (5.2 - 3.68)/2 - 0.5, y: 2.0, w: 1.0, h: 0.2,
    fontFace: TYPOGRAPHY.body, fontSize: 8, bold: true, color: C.red, align: "center", fill: { color: C.white }
  });

  // SQL Equivalente (Bajado a y: 3.8 y ajustado h: 3.3)
  addCodePanel(slide, SH, {
    x: 0.88, y: 3.8, w: 10.26, h: 3.3, title: "PostgreSQL Implementation",
    code: `CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id),
  name TEXT NOT NULL,
  price NUMERIC(10,2)
);`,
    lang: "sql", fontSize: 12
  });
  validateSlide(slide, pptx);
}

// S27: NORMALIZACIÓN: 1FN
function createFirstNormalFormSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "1FN: Primera Forma Normal (Atomicidad)", "Bloque 3 · 3.3 Limpieza de datos", "Bloque 3");
  addMythRealityGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Regla: Un solo dato por celda",
    entries: [
      { badge: "ERROR", myth: "Columna 'Telefonos': '9123, 8442'", reality: "No se pueden hacer búsquedas eficientes.", accent: C.red, badgeFill: C.paleRed },
      { badge: "1FN", myth: "Separar en filas o tablas.", reality: "Cada teléfono es un registro único atómico.", accent: C.navy, badgeFill: C.softBlue },
      { badge: "ERROR", myth: "Columna 'Direccion' completa.", reality: "Dificulta filtrar por ciudad o comuna.", accent: C.red, badgeFill: C.paleRed },
      { badge: "1FN", myth: "Campos separados.", reality: "Calle, Número, Ciudad, Región.", accent: C.navy, badgeFill: C.softBlue },
    ]
  });
  validateSlide(slide, pptx);
}

// S28: TEORÍA 1FN
function create1FNTheorySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Teoría de la 1FN: El Principio de Atomicidad", "Bloque 3 · Fundamentos Relacionales", "Bloque 3");
  addCard(slide, SH, {
    x: 0.88, y: 2.0, w: 10.26, h: 1.8, title: "Definición Formal",
    body: "Una relación está en 1FN si y solo si todos los dominios de sus atributos contienen valores atómicos (indivisibles) y no existen 'grupos repetitivos' (colecciones o listas) dentro de una misma tupla.",
    accent: C.navy, fill: C.white
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 4.0, w: 10.26, h: 2.8, title: "¿Por qué es obligatoria?", columns: 2,
    entries: [
      { badge: "QUERIES", title: "Predictibilidad", body: "El motor SQL puede indexar y buscar valores exactos.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "JOIN", title: "Integridad", body: "Las llaves foráneas solo funcionan con valores únicos, no con listas.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "ERROR", title: "Anomalía", body: "Actualizar un solo elemento de una lista obliga a reescribir toda la celda.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "ERROR", title: "Redundancia", body: "Los grupos repetitivos violan la estructura de tabla rectangular.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
    ]
  });
  validateSlide(slide, pptx);
}

// S29: NORMALIZACIÓN: 2FN
function createSecondNormalFormSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "2FN: Segunda Forma Normal", "Bloque 3 · 3.3 Dependencia Funcional", "Bloque 3");
  
  addMiniCard(slide, SH, {
    x: 0.88, y: 2.0, w: 10.26, h: 0.62,
    title: "Regla: Dependencia Completa",
    body: "Elimina columnas que dependan solo de una parte de la PK compuesta.",
    accent: C.navy, fill: C.softNeutral, titleFontSize: 12, bodyFontSize: 10
  });

  addTableSchema(slide, SH, {
    x: 3.5, y: 2.8, w: 5.0, title: "inscripciones (PK: est_id + cur_id)",
    columns: [
      { name: "est_id", type: "uuid", isPk: true },
      { name: "cur_id", type: "uuid", isPk: true },
      { name: "nombre_curso", type: "text" } // ERROR
    ]
  });

  slide.addText("↓", { x: 5.68, y: 4.4, w: 0.66, h: 0.4, fontSize: 28, bold: true, color: C.red, align: "center" });

  addTableSchema(slide, SH, {
    x: 2.0, y: 5.0, w: 3.2, title: "inscripciones",
    columns: [{ name: "est_id", isPk: true }, { name: "cur_id", isPk: true }]
  });
  addTableSchema(slide, SH, {
    x: 6.8, y: 5.0, w: 3.2, title: "cursos",
    columns: [{ name: "id", isPk: true }, { name: "nombre", type: "text" }]
  });

  validateSlide(slide, pptx);
}

// S30: TEORÍA 2FN
function create2FNTheorySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Teoría de la 2FN: Dependencia Funcional Completa", "Bloque 3 · Eliminando el 'Saber de Más'", "Bloque 3");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.0, w: 10.26, h: 4.7, title: "El problema de las llaves compuestas",
    left: {
      title: "Dependencia Parcial", subtitle: "El Enemigo",
      items: ["El dato solo necesita 'la mitad' de la PK.", "Si el curso cambia de nombre, debo actualizar mil filas."],
      accent: C.red, fill: C.paleRed
    },
    right: {
      title: "Dependencia Total", subtitle: "La Solución",
      items: ["Toda columna depende del 100% de la llave.", "Los datos del curso viven en la tabla 'Cursos'."],
      accent: C.navy, fill: C.softBlue
    },
    bridgeLabel: "→", bridgeBody: "normalizar",
  });
  validateSlide(slide, pptx);
}

// S31: NORMALIZACIÓN: 3FN
function createThirdNormalFormSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "3FN: Tercera Forma Normal", "Bloque 3 · 3.3 Dependencia Transitiva", "Bloque 3");
  
  addMiniCard(slide, SH, {
    x: 0.88, y: 2.0, w: 10.26, h: 0.62,
    title: "Regla: No dependencias transitivas",
    body: "Si A depende de B, y B de la PK, separa A y B en su propia tabla.",
    accent: C.red, fill: C.softNeutral, titleFontSize: 12, bodyFontSize: 10
  });

  addTableSchema(slide, SH, {
    x: 3.5, y: 2.8, w: 5.0, title: "usuarios (PK: id)",
    columns: [
      { name: "id", type: "uuid", isPk: true },
      { name: "nombre", type: "text" },
      { name: "codigo_postal", type: "text" },
      { name: "ciudad", type: "text" } // ERROR
    ]
  });

  slide.addText("↓", { x: 5.68, y: 4.4, w: 0.66, h: 0.4, fontSize: 28, bold: true, color: C.red, align: "center" });

  addTableSchema(slide, SH, {
    x: 2.0, y: 5.0, w: 3.2, title: "usuarios",
    columns: [{ name: "id", isPk: true }, { name: "nombre" }, { name: "cp_id", isFk: true }]
  });
  addTableSchema(slide, SH, {
    x: 6.8, y: 5.0, w: 3.2, title: "direcciones",
    columns: [{ name: "cp", isPk: true }, { name: "ciudad", type: "text" }]
  });

  validateSlide(slide, pptx);
}

// S32: TEORÍA 3FN
function create3FNTheorySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Teoría de la 3FN: La Regla de Oro", "Bloque 3 · 'The Key, the Whole Key, and Nothing but the Key'", "Bloque 3");
  addCenterStatement(slide, SH, "Una tabla está en 3FN si está en 2FN y no existen dependencias transitivas entre atributos no clave.", {
    x: 0.88, y: 2.0, w: 10.26, h: 1.12, fill: C.navy, color: C.white, fontSize: 20
  });
  const points = [
    { t: "Adiós al Teléfono", b: "Si cambio el nombre de la Ciudad, solo lo hago en un registro único." },
    { t: "Independencia", b: "Los atributos no clave no deben conocerse entre sí." },
    { t: "Pureza", b: "Se alcanza el nivel máximo de eficiencia en almacenamiento." },
  ];
  points.forEach((p, i) => {
    addMiniCard(slide, SH, { x: 0.88 + i * 3.44, y: 3.42, w: 3.2, h: 3.0, title: p.t, body: p.body, accent: C.red, fill: C.white, line: C.border });
  });
  validateSlide(slide, pptx);
}

// S29: SQL PARA RELACIONES N:M (JOIN TABLE)
function createManyToManySqlSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "SQL para Relaciones N:M", "Bloque 3 · 3.4 La Tabla Intermedia", "Bloque 3");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Inscripciones (Estudiantes <-> Cursos)",
    code: `-- Tabla Intermedia (Pivot)
CREATE TABLE enrollments (
  student_id UUID REFERENCES students(id),
  course_id UUID REFERENCES courses(id),
  enrolled_at TIMESTAMP DEFAULT NOW(),
  
  -- Llave Primaria Compuesta: Evita inscripciones duplicadas
  PRIMARY KEY (student_id, course_id)
);`,
    lang: "sql", fontSize: 16
  });
  validateSlide(slide, pptx);
}

// S30: ENTIDADES FUERTES VS DÉBILES
function createStrongWeakEntitiesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Entidades Fuertes vs. Débiles", "Bloque 3 · 3.5 Jerarquía de existencia", "Bloque 3");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "¿Quién depende de quién?",
    left: {
      title: "Entidad Fuerte", subtitle: "Independiente",
      items: ["Existe por sí sola.", "Ej: 'User', 'Product'.", "No requiere FK para nacer."],
      accent: C.navy, fill: C.softBlue
    },
    right: {
      title: "Entidad Débil", subtitle: "Dependiente",
      items: ["Su PK incluye la FK del padre.", "Ej: 'VentaDetalle', 'Comentarios'.", "Si el padre muere, ella no tiene sentido."],
      accent: C.gold, fill: C.white
    },
    bridgeLabel: "<-", bridgeBody: "dependencia",
  });
  validateSlide(slide, pptx);
}

// S31: IA COMO AUDITOR DE DISEÑO
function createIAAuditorSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Huella IA: El Auditor de Normalización", "Bloque 3 · Optimización Asistida", "IA");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Usando el Agente para validar tu DER", columns: 2,
    entries: [
      { badge: "PROMPT", title: "Detectar Redundancia", body: "'Revisa este esquema: ¿Hay datos que se repiten innecesariamente?'.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "PROMPT", title: "Sugerir 3FN", body: "'¿Cumple esta tabla con la Tercera Forma Normal? Si no, divídela'.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "CAUTION", title: "Sobre-normalización", body: "La IA a veces separa TODO. A veces un poco de redundancia ayuda al performance.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "CAUTION", title: "Nombres Genéricos", body: "No dejes que la IA llame a todo 'data' o 'info'. Exige nombres de negocio.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
    ]
  });
  validateSlide(slide, pptx);
}

// S32: PREGUNTAS GUÍA B3
function createGuideQuestionsB3Slide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 3", { x: 0.88, y: 0.44, w: 3.4, h: 0.3, fill: C.navy, color: C.white, fontSize: 10.0 });
  const questions = [
    { n: "01", text: "¿Qué significa que un atributo sea 'Atómico' en el contexto de la 1FN?" },
    { n: "02", text: "En SQL, ¿cómo representamos físicamente una relación N:M entre dos tablas?" },
    { n: "03", text: "¿Por qué es peligroso modificar una base de datos sin tener un DER validado?" },
  ];
  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, { x: 0.88, y: y + 0.04, w: 0.58, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.border, margin: 0, valign: "mid" });
    slide.addText(q.text, { x: 1.6, y, w: 8.72, h: 1.56, fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.navy, margin: 0, valign: "mid" });
    if (i < 2) slide.addShape(SH.line, { x: 0.88, y: y + 1.72, w: 10.28, h: 0, line: { color: C.border, pt: 1 } });
  });
  validateSlide(slide, pptx);
}

// S33: SÍNTESIS B3
function createSynthesisB3Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 3", "Arquitectura de Datos Robusta", "Bloque 3");
  addCenterStatement(slide, SH, "Un buen diseño DER es la mitad del éxito de un Backend escalable y libre de errores.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });
  const points = [
    { title: "DER / Crow's Foot", body: "Lenguaje visual para comunicar la estructura del sistema.", accent: C.navy },
    { title: "Normalización", body: "Técnica para asegurar que cada dato esté en su lugar correcto.", accent: C.red },
    { title: "SQL", body: "La traducción final del diseño a tablas físicas reales.", accent: C.gold },
  ];
  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06, title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });
  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.62, title: "Bloque Final → Implementación en Supabase",
    body: "Llevaremos nuestros diagramas y código SQL a la nube usando PostgreSQL.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.gold, titleFontSize: 11, bodyFontSize: 10.4
  });
  validateSlide(slide, pptx);
}

// ─── EJECUCIÓN ───────────────────────────────────────────────────────────────

createCoverSlide();
createConnectionSlide();
createGeneralObjectiveSlide();
createLearningPathSlide();
createIAFootprintSlide();
createBlock1IntroSlide();
createVolatileVsPersistenceSlide();
createEntitySlide();
createAttributesSlide();
createPKSlide();
createSynthesisB1Slide();

createBlock2IntroSlide();
createDataNotIsolatedSlide();
createFKSlide();
createVisualConnectionSlide();
createCardinalitySlide();
createOneToManySlide();
createManyToManySlide();
createReferentialIntegritySlide();
createIARelationsSlide();
createGuideQuestionsB2Slide();
createSynthesisB2Slide();

createBlock3IntroSlide();
createWhyDesignSlide();
createCrowsFootSlide();
createDiagramToSqlSlide();
createFirstNormalFormSlide();
createSecondNormalFormSlide();
createThirdNormalFormSlide();
createManyToManySqlSlide();
createStrongWeakEntitiesSlide();
createIAAuditorSlide();
createGuideQuestionsB3Slide();
createSynthesisB3Slide();

pptx.writeFile({ fileName: outputPptx })
  .then(name => console.log(`Archivo generado: ${name}`))
  .catch(err => console.error(err));
