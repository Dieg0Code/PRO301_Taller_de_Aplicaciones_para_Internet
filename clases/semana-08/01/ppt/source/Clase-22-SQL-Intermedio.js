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
  addChecklistGrid,
  addTableSchema,
  addErRelationship,
  addJoinSetDiagram,
} = components;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";

applyAiepTheme(pptx, {
  author: "Diego Obando",
  company: "AIEP",
  subject: "Clase 22",
  title: "SQL intermedio: joins, agregaciones y datos relacionados",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx = path.join(rootDir, "Clase-22-SQL-Intermedio.pptx");

const logoPath = path.resolve(__dirname, "../../../../../.agent/skills/slides-aiep/assets/logo-aiep.png");
const logoMarkPath = path.resolve(__dirname, "../../../../../.agent/skills/slides-aiep/assets/logo-aiep-mark.png");

function addHeader(slide, title, subtitle, blockLabel = "Contexto", pptxLike = pptx) {
  systemAddHeader(slide, SH, pptxLike, title, subtitle, blockLabel, {
    classLabel: `Clase 22 · ${blockLabel}`,
    titleY: 0.94,
    titleH: 0.66,
    subtitleY: 1.68,
    subtitleH: 0.24,
    subtitleW: 9.1,
    subtitleFontSize: 10.6,
    logoMarkPath,
    mark: { fill: C.softNeutral },
  });
}

function addBarsMotif(slide, x, y, scale = 1, fill = C.red) {
  slide.addShape(SH.rect, { x, y: y + 0.18 * scale, w: 0.2 * scale, h: 0.46 * scale, fill: { color: fill }, line: { color: fill } });
  slide.addShape(SH.rect, { x: x + 0.24 * scale, y, w: 0.24 * scale, h: 0.64 * scale, fill: { color: fill }, line: { color: fill } });
  slide.addShape(SH.rect, { x: x + 0.52 * scale, y: y + 0.18 * scale, w: 0.2 * scale, h: 0.46 * scale, fill: { color: fill }, line: { color: fill } });
}

function addStatementBand(slide, text, opts = {}) {
  slide.addShape(SH.roundRect, {
    x: opts.x ?? 0.88,
    y: opts.y ?? 5.86,
    w: opts.w ?? 10.74,
    h: opts.h ?? 0.56,
    rectRadius: 0.04,
    fill: { color: opts.fill || C.navy },
    line: { color: opts.fill || C.navy },
  });
  slide.addText(text, {
    x: (opts.x ?? 0.88) + 0.2,
    y: (opts.y ?? 5.86) + 0.15,
    w: (opts.w ?? 10.74) - 0.4,
    h: 0.22,
    fontFace: TYPOGRAPHY.display,
    fontSize: opts.fontSize || 15.2,
    bold: true,
    color: opts.color || C.white,
    align: "center",
    margin: 0,
    fit: "shrink",
  });
}

function addTablePreview(slide, opts) {
  const { x, y, w, title, headers, rows, accent = C.navy, fill = C.white } = opts;
  const rowH = opts.rowH || 0.34;
  const h = 0.44 + rowH * (rows.length + 1) + 0.12;
  slide.addShape(SH.roundRect, {
    x, y, w, h,
    rectRadius: 0.04,
    fill: { color: fill },
    line: { color: accent, pt: 1.1 },
  });
  slide.addText(title, {
    x: x + 0.12, y: y + 0.12, w: w - 0.24, h: 0.16,
    fontFace: TYPOGRAPHY.display, fontSize: 10.6, bold: true, color: accent,
    margin: 0,
  });
  const startY = y + 0.44;
  const colW = (w - 0.24) / headers.length;
  headers.forEach((header, i) => {
    slide.addShape(SH.rect, {
      x: x + 0.12 + i * colW,
      y: startY,
      w: colW,
      h: rowH,
      fill: { color: C.softNeutral },
      line: { color: C.border, pt: 0.5 },
    });
    slide.addText(header, {
      x: x + 0.18 + i * colW,
      y: startY + 0.1,
      w: colW - 0.12,
      h: 0.1,
      fontFace: TYPOGRAPHY.body,
      fontSize: 7.8,
      bold: true,
      color: C.navy,
      margin: 0,
      fit: "shrink",
    });
  });
  rows.forEach((row, rowIndex) => {
    const rowY = startY + rowH * (rowIndex + 1);
    row.forEach((cell, i) => {
      slide.addShape(SH.rect, {
        x: x + 0.12 + i * colW,
        y: rowY,
        w: colW,
        h: rowH,
        fill: { color: rowIndex % 2 === 0 ? C.white : C.paper },
        line: { color: C.border, pt: 0.5 },
      });
      slide.addText(String(cell), {
        x: x + 0.18 + i * colW,
        y: rowY + 0.1,
        w: colW - 0.12,
        h: 0.1,
        fontFace: TYPOGRAPHY.body,
        fontSize: 7.8,
        color: C.ink,
        margin: 0,
        fit: "shrink",
      });
    });
  });
}

function addFollowUpQuestion(slide, opts) {
  slide.addShape(SH.rect, {
    x: opts.x, y: opts.y, w: 0.12, h: opts.h,
    fill: { color: opts.accent },
    line: { color: opts.accent },
  });
  slide.addShape(SH.line, {
    x: opts.x + 0.24, y: opts.y + opts.h, w: opts.w - 0.24, h: 0,
    line: { color: C.border, pt: 1 },
  });
  slide.addText(opts.badge, {
    x: opts.x + 0.32, y: opts.y + 0.2, w: 0.5, h: 0.26,
    fontFace: TYPOGRAPHY.display, fontSize: 12.8, bold: true, color: opts.accent,
    margin: 0,
  });
  slide.addText(opts.question, {
    x: opts.x + 0.88, y: opts.y + 0.16, w: opts.w - 1.2, h: 0.46,
    fontFace: TYPOGRAPHY.display, fontSize: 13.2, bold: true, color: C.navy,
    margin: 0,
    fit: "shrink",
  });
  slide.addText(`Pista: ${opts.hint}`, {
    x: opts.x + 0.88, y: opts.y + 0.74, w: opts.w - 1.2, h: 0.32,
    fontFace: TYPOGRAPHY.body, fontSize: 10.2, color: C.slate,
    margin: 0,
    fit: "shrink",
  });
}

function createCoverSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  slide.addImage({ path: logoPath, x: 0.88, y: 0.62, w: 1.2, h: 0.42 });
  addBarsMotif(slide, 0.88, 1.62, 1.05, C.red);
  slide.addText("SQL intermedio:\ndatos conectados para aplicaciones reales", {
    x: 0.88, y: 2.58, w: 10.8, h: 1.72,
    fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.white, margin: 0,
    fit: "shrink",
  });
  slide.addText("Semana 08 · Clase 22: joins, agregaciones y normalización ligera.", {
    x: 0.88, y: 4.7, w: 10.26, h: 0.34,
    fontFace: TYPOGRAPHY.body, fontSize: 17.2, color: C.gold, bold: true,
  });
  validateSlide(slide, pptx);
}

function createWeekBridgeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "De Seguridad A Datos Útiles", "La semana 07 cerró el riesgo; semana 08 abre el criterio de datos", "Contexto");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.08, w: 10.26, h: 4.74, title: "Secuencia de aprendizaje",
    columns: 3,
    entries: [
      { badge: "W7", title: "SQL inicial", body: "Crear, insertar, consultar, actualizar y borrar datos con criterio.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "W7", title: "Seguridad aplicada", body: "Validar entradas, parametrizar, autenticar y limitar errores.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "W8", title: "SQL intermedio", body: "Combinar tablas, resumir información y alimentar endpoints reales.", accent: C.gold, fill: C.warningSoft, badgeFill: C.gold },
    ],
    footer: "Hoy la pregunta deja de ser solo qué tabla leo y pasa a ser qué relación necesito reconstruir.",
  });
  validateSlide(slide, pptx);
}

function createOneTableProblemSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Una Tabla No Alcanza", "Las aplicaciones reales conectan hechos distintos", "Contexto");
  addTablePreview(slide, {
    x: 0.88, y: 2.08, w: 5.9, title: "compras_planilla",
    accent: C.red,
    headers: ["usuario", "email", "producto", "categoría", "total"],
    rows: [
      ["Camila", "cami@x.cl", "Mouse", "Periféricos", "12990"],
      ["Camila", "cami@x.cl", "Teclado", "Periféricos", "24990"],
      ["Felipe", "feli@x.cl", "Monitor", "Pantallas", "119990"],
      ["Camila", "cami@x.cl", "Cable", "Accesorios", "3990"],
    ],
  });
  addCard(slide, SH, {
    x: 7.12, y: 2.08, w: 4.5, h: 1.18,
    title: "Parece simple",
    body: "Todo queda visible en una sola planilla.",
    accent: C.gold, fill: C.warningSoft, line: C.gold,
  });
  addCard(slide, SH, {
    x: 7.12, y: 3.48, w: 4.5, h: 1.18,
    title: "Pero se contradice",
    body: "Correos, nombres y categorías se repiten hasta volverse frágiles.",
    accent: C.red, fill: C.paleRed, line: C.red,
  });
  addCard(slide, SH, {
    x: 7.12, y: 4.88, w: 4.5, h: 1.18,
    title: "Y cuesta consultar",
    body: "La aplicación necesita datos conectados, no texto duplicado.",
    accent: C.navy, fill: C.softBlue, line: C.navy,
  });
  addStatementBand(slide, "SQL intermedio empieza cuando dejamos de pensar en filas sueltas.", { y: 6.32, h: 0.48 });
  validateSlide(slide, pptx);
}

function createClassMapSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Mapa De La Clase", "Cuatro pasos para consultar datos conectados", "Contexto");
  const blocks = [
    { n: "01", title: "Relaciones", body: "Entidades, claves y cardinalidad.", accent: C.red, x: 0.88, y: 2.14 },
    { n: "02", title: "JOINs", body: "Reconstruir información distribuida.", accent: C.navy, x: 6.18, y: 2.14 },
    { n: "03", title: "Agregaciones", body: "Convertir filas en indicadores.", accent: C.gold, x: 0.88, y: 4.44 },
    { n: "04", title: "Backend", body: "Normalizar, filtrar y conectar endpoints.", accent: C.red, x: 6.18, y: 4.44 },
  ];
  blocks.forEach((block) => {
    slide.addShape(SH.roundRect, {
      x: block.x, y: block.y, w: 4.82, h: 1.64,
      rectRadius: 0.06,
      fill: { color: C.white },
      line: { color: block.accent, pt: 1.2 },
    });
    slide.addText(block.n, {
      x: block.x + 0.18, y: block.y + 0.24, w: 0.72, h: 0.32,
      fontFace: TYPOGRAPHY.display, fontSize: 18, bold: true, color: block.accent, margin: 0,
    });
    slide.addText(block.title, {
      x: block.x + 1.04, y: block.y + 0.24, w: 3.48, h: 0.32,
      fontFace: TYPOGRAPHY.display, fontSize: 19, bold: true, color: C.navy, margin: 0,
    });
    slide.addText(block.body, {
      x: block.x + 1.04, y: block.y + 0.78, w: 3.52, h: 0.38,
      fontFace: TYPOGRAPHY.body, fontSize: 12, color: C.slate, margin: 0,
    });
  });
  validateSlide(slide, pptx);
}

function createObjectivesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Objetivo De Hoy", "Construir consultas intermedias que sirvan a una aplicación", "Objetivos");
  addCenterStatement(slide, SH, "Combinar tablas, resumir información y revisar seguridad antes de entregar datos al frontend.", {
    x: 0.88, y: 2.06, w: 10.74, h: 1.18,
    fill: C.navy, color: C.white, fontSize: 22, rectRadius: 0.06,
  });
  const items = [
    ["Relaciones", "PK, FK y cardinalidad."],
    ["JOINs", "INNER, LEFT y ausencia de coincidencia."],
    ["Métricas", "COUNT, SUM, GROUP BY y HAVING."],
    ["Backend", "Columnas, filtros, permisos y parámetros."],
  ];
  items.forEach(([title, body], i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.74, y: 4.18, w: 2.46, h: 1.42,
      title, body,
      accent: i === 0 ? C.red : i === 1 ? C.navy : i === 2 ? C.gold : C.red,
      fill: C.white,
      line: C.border,
      titleFontSize: 14.6,
      bodyFontSize: 10.4,
    });
  });
  validateSlide(slide, pptx);
}

function createMentalContractSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Contrato Mental", "No escribimos consultas largas por deporte", "Contexto");
  const rows = [
    { left: "Pregunta", right: "¿Qué necesita saber la pantalla o endpoint?", accent: C.red },
    { left: "Relación", right: "¿Qué tablas conectan esa información?", accent: C.navy },
    { left: "Alcance", right: "¿Quién puede ver esos datos y bajo qué filtro?", accent: C.gold },
    { left: "Resultado", right: "¿El SQL devuelve exactamente lo necesario?", accent: C.red },
  ];
  rows.forEach((row, i) => {
    const y = 2.02 + i * 1.05;
    slide.addShape(SH.roundRect, {
      x: 1.1, y, w: 2.18, h: 0.72,
      rectRadius: 0.04,
      fill: { color: row.accent },
      line: { color: row.accent },
    });
    slide.addText(row.left, {
      x: 1.24, y: y + 0.22, w: 1.9, h: 0.18,
      fontFace: TYPOGRAPHY.display, fontSize: 15.4, bold: true, color: C.white,
      align: "center", margin: 0,
    });
    slide.addShape(SH.chevron, {
      x: 3.62, y: y + 0.19, w: 0.34, h: 0.34,
      fill: { color: C.border },
      line: { color: C.border },
    });
    slide.addShape(SH.roundRect, {
      x: 4.16, y, w: 6.88, h: 0.72,
      rectRadius: 0.04,
      fill: { color: C.white },
      line: { color: C.border, pt: 1 },
    });
    slide.addText(row.right, {
      x: 4.42, y: y + 0.2, w: 6.28, h: 0.22,
      fontFace: TYPOGRAPHY.body, fontSize: 13.4, bold: true, color: C.ink, margin: 0,
    });
  });
  addStatementBand(slide, "Primero entendemos la pregunta; después elegimos SQL.", { y: 6.36, h: 0.46 });
  validateSlide(slide, pptx);
}

function createSqlToAiBridgeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Datos Antes De IA", "La próxima clase cambia de eje, pero no de disciplina", "Contexto");
  addCard(slide, SH, {
    x: 0.88, y: 2.04, w: 3.25, h: 3.3,
    title: "Datos estructurados",
    body: "Tablas, relaciones, filtros y métricas preparan una forma de mirar información.",
    accent: C.navy, fill: C.softBlue, line: C.navy,
    titleFontSize: 18, bodyFontSize: 12.4,
  });
  addCard(slide, SH, {
    x: 4.42, y: 2.04, w: 3.25, h: 3.3,
    title: "Patrones",
    body: "Las agregaciones ya son una forma básica de resumir comportamiento observado.",
    accent: C.gold, fill: C.warningSoft, line: C.gold,
    titleFontSize: 18, bodyFontSize: 12.4,
  });
  addCard(slide, SH, {
    x: 7.96, y: 2.04, w: 3.25, h: 3.3,
    title: "Validación",
    body: "Si una consulta miente, una métrica o modelo también puede orientar mal decisiones.",
    accent: C.red, fill: C.paleRed, line: C.red,
    titleFontSize: 18, bodyFontSize: 12.4,
  });
  addStatementBand(slide, "Antes de hablar de modelos que aprenden, necesitamos datos que tengan sentido.", { y: 6.06, h: 0.56 });
  validateSlide(slide, pptx);
}

function createBlock1OpeningSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addBarsMotif(slide, 0.88, 1.72, 1.45, C.red);
  slide.addText("De tablas sueltas\na datos relacionados", {
    x: 0.88, y: 2.58, w: 10.3, h: 1.36,
    fontFace: TYPOGRAPHY.display, fontSize: 40, bold: true, color: C.white, margin: 0,
  });
  slide.addText("Bloque 1 · Entidades, claves, cardinalidad e integridad.", {
    x: 0.88, y: 4.28, w: 9.9, h: 0.34,
    fontFace: TYPOGRAPHY.body, fontSize: 17.4, bold: true, color: C.gold,
  });
  slide.addShape(SH.roundRect, {
    x: 0.88, y: 5.78, w: 10.4, h: 0.74,
    rectRadius: 0.04,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addText("Objetivo del bloque: leer una base relacional como un mapa de hechos conectados.", {
    x: 1.08, y: 6.02, w: 10, h: 0.22,
    fontFace: TYPOGRAPHY.display, fontSize: 16.8, bold: true, color: C.navy,
    align: "center", margin: 0,
  });
  validateSlide(slide, pptx);
}

function createSpreadsheetTrapSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Trampa De La Planilla Única", "Lo cómodo al inicio se vuelve caro al mantener", "Bloque 1");
  addTablePreview(slide, {
    x: 0.82, y: 2.08, w: 6.1, title: "compras_planilla",
    accent: C.red,
    headers: ["id", "usuario", "email", "producto", "categoría"],
    rows: [
      ["1", "Camila", "cami@x.cl", "Mouse", "Periféricos"],
      ["2", "Camila", "cami@x.cl", "Teclado", "Periféricos"],
      ["3", "Camila R.", "cami@x.cl", "Cable", "Accesorios"],
      ["4", "Felipe", "feli@x.cl", "Mouse", "Periféricos"],
      ["5", "Felipe", "feli@x.cl", "Monitor", "Pantallas"],
    ],
  });
  const issues = [
    "El mismo usuario aparece varias veces.",
    "Un cambio de correo exige muchas actualizaciones.",
    "La categoría depende de texto repetido.",
    "La compra no apunta a entidades confiables.",
  ];
  issues.forEach((issue, i) => {
    slide.addShape(SH.roundRect, {
      x: 7.26, y: 2.12 + i * 0.82, w: 4.08, h: 0.58,
      rectRadius: 0.03,
      fill: { color: i % 2 === 0 ? C.paleRed : C.warningSoft },
      line: { color: i % 2 === 0 ? C.red : C.gold, pt: 1 },
    });
    slide.addText(issue, {
      x: 7.48, y: 2.3 + i * 0.82, w: 3.62, h: 0.16,
      fontFace: TYPOGRAPHY.body, fontSize: 11.4, bold: true, color: C.ink,
      margin: 0,
    });
  });
  addStatementBand(slide, "Una tabla gigante oculta relaciones que la aplicación sí necesita entender.", { y: 6.18, h: 0.5 });
  validateSlide(slide, pptx);
}

function createEntitiesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Primero Identificar Entidades", "Cada tabla debe guardar un tipo de hecho", "Bloque 1");
  const entities = [
    { title: "usuarios", body: "Identidad y contacto.", accent: C.red },
    { title: "productos", body: "Catálogo y precio actual.", accent: C.navy },
    { title: "categorías", body: "Clasificación para filtros.", accent: C.gold },
    { title: "compras", body: "Operación principal.", accent: C.red },
    { title: "detalle_compras", body: "Productos de cada compra.", accent: C.navy },
  ];
  entities.forEach((entity, i) => {
    const isBottom = i >= 3;
    const x = isBottom ? 2.05 + (i - 3) * 5.28 : 0.88 + i * 3.56;
    const y = isBottom ? 4.28 : 2.1;
    const w = isBottom ? 4.72 : 3.16;
    addMiniCard(slide, SH, {
      x, y, w, h: 1.44,
      title: entity.title,
      body: entity.body,
      accent: entity.accent,
      fill: entity.accent === C.red ? C.paleRed : entity.accent === C.gold ? C.warningSoft : C.softBlue,
      line: entity.accent,
      titleFontSize: 16.2,
      bodyFontSize: 11,
    });
  });
  addStatementBand(slide, "La aplicación reconstruye una vista completa combinando hechos separados.", { y: 6.22, h: 0.48 });
  validateSlide(slide, pptx);
}

function createReferenceSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Referencia Es El Puente", "`usuario_id` conecta compra con usuario sin copiar todo", "Bloque 1");
  addTableSchema(slide, SH, {
    x: 1.02, y: 2.1, w: 3.66,
    title: "usuarios",
    columns: [
      { name: "id", type: "INT", key: "PK" },
      { name: "nombre", type: "VARCHAR" },
      { name: "email", type: "VARCHAR" },
    ],
  });
  addTableSchema(slide, SH, {
    x: 7.26, y: 2.1, w: 3.86,
    title: "compras",
    columns: [
      { name: "id", type: "INT", key: "PK" },
      { name: "usuario_id", type: "INT", key: "FK" },
      { name: "fecha", type: "DATETIME" },
      { name: "total", type: "DECIMAL" },
    ],
  });
  addErRelationship(slide, SH, {
    startX: 4.68, startY: 3.14, endX: 7.26, endY: 3.14,
    type: "1:N", label: "usuario tiene compras", color: C.red,
  });
  addCenterStatement(slide, SH, "La compra no copia al usuario: guarda una referencia verificable.", {
    x: 1.24, y: 5.42, w: 9.7, h: 0.72,
    fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.05,
  });
  validateSlide(slide, pptx);
}

function createPkFkSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "PK Y FK No Son Decoración", "Son reglas para que la relación sea confiable", "Bloque 1");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.02, w: 6.14, h: 4.52,
    title: "DDL mínimo",
    lang: "sql",
    fontSize: 9.6,
    code: `CREATE TABLE usuarios (
  id INT PRIMARY KEY,
  email VARCHAR(160) NOT NULL UNIQUE
);

CREATE TABLE compras (
  id INT PRIMARY KEY,
  usuario_id INT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id)
);`,
  });
  addCard(slide, SH, {
    x: 7.28, y: 2.12, w: 4.18, h: 1.1,
    title: "PK",
    body: "Identifica una fila de forma única.",
    accent: C.gold, fill: C.warningSoft, line: C.gold,
  });
  addCard(slide, SH, {
    x: 7.28, y: 3.46, w: 4.18, h: 1.1,
    title: "FK",
    body: "Referencia una fila existente en otra tabla.",
    accent: C.red, fill: C.paleRed, line: C.red,
  });
  addCard(slide, SH, {
    x: 7.28, y: 4.8, w: 4.18, h: 1.1,
    title: "Integridad",
    body: "La base ayuda a rechazar relaciones imposibles.",
    accent: C.navy, fill: C.softBlue, line: C.navy,
  });
  validateSlide(slide, pptx);
}

function createCardinalitySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Cardinalidad: Cuántos Con Cuántos", "Antes del JOIN hay que entender la relación", "Bloque 1");
  const cards = [
    { label: "1:1", title: "Uno con uno", body: "Un usuario y un perfil extendido.", accent: C.navy },
    { label: "1:N", title: "Uno con muchos", body: "Un usuario puede tener muchas compras.", accent: C.red },
    { label: "N:M", title: "Muchos con muchos", body: "Una compra contiene muchos productos y un producto aparece en muchas compras.", accent: C.gold },
  ];
  cards.forEach((card, i) => {
    slide.addShape(SH.roundRect, {
      x: 0.88 + i * 3.54, y: 2.18, w: 3.16, h: 3.3,
      rectRadius: 0.07,
      fill: { color: card.accent === C.red ? C.paleRed : card.accent === C.gold ? C.warningSoft : C.softBlue },
      line: { color: card.accent, pt: 1.2 },
    });
    slide.addText(card.label, {
      x: 1.12 + i * 3.54, y: 2.52, w: 2.66, h: 0.58,
      fontFace: TYPOGRAPHY.display, fontSize: 32, bold: true, color: card.accent,
      align: "center", margin: 0,
    });
    slide.addText(card.title, {
      x: 1.12 + i * 3.54, y: 3.38, w: 2.66, h: 0.3,
      fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: C.navy,
      align: "center", margin: 0,
    });
    slide.addText(card.body, {
      x: 1.18 + i * 3.54, y: 4.04, w: 2.54, h: 0.78,
      fontFace: TYPOGRAPHY.body, fontSize: 11.2, color: C.ink,
      align: "center", valign: "mid", margin: 0,
      fit: "shrink",
    });
  });
  addStatementBand(slide, "La cardinalidad anticipa cuántas filas puede producir una consulta.", { y: 6.08, h: 0.52 });
  validateSlide(slide, pptx);
}

function createManyToManySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "N:M Necesita Tabla Intermedia", "`detalle_compras` explica qué productos pertenecen a cada compra", "Bloque 1");
  addTableSchema(slide, SH, {
    x: 0.72, y: 2.2, w: 3.22, title: "compras",
    columns: [
      { name: "id", type: "INT", key: "PK" },
      { name: "usuario_id", type: "INT", key: "FK" },
      { name: "fecha", type: "DATE" },
    ],
  });
  addTableSchema(slide, SH, {
    x: 4.34, y: 1.98, w: 3.52, title: "detalle_compras",
    columns: [
      { name: "compra_id", type: "INT", key: "FK" },
      { name: "producto_id", type: "INT", key: "FK" },
      { name: "cantidad", type: "INT" },
      { name: "precio_hist", type: "DECIMAL" },
    ],
  });
  addTableSchema(slide, SH, {
    x: 8.5, y: 2.2, w: 3.34, title: "productos",
    columns: [
      { name: "id", type: "INT", key: "PK" },
      { name: "nombre", type: "VARCHAR" },
      { name: "precio_act", type: "DECIMAL" },
    ],
  });
  addErRelationship(slide, SH, { startX: 3.94, startY: 3.18, endX: 4.34, endY: 3.18, type: "1:N", color: C.red });
  addErRelationship(slide, SH, { startX: 7.86, startY: 3.18, endX: 8.5, endY: 3.18, type: "1:N", color: C.navy });
  addStatementBand(slide, "La tabla intermedia convierte una relación difícil en registros consultables.", { y: 6.24, h: 0.48 });
  validateSlide(slide, pptx);
}

function createOrphanDataSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Datos Huérfanos", "Cuando la relación apunta a algo que no existe", "Bloque 1");
  addTablePreview(slide, {
    x: 0.88, y: 2.12, w: 4.7, title: "compras",
    accent: C.red,
    headers: ["id", "usuario_id", "total"],
    rows: [
      ["10", "1", "49990"],
      ["11", "2", "18990"],
      ["12", "99", "34990"],
    ],
  });
  addTablePreview(slide, {
    x: 6.58, y: 2.12, w: 4.7, title: "usuarios",
    accent: C.navy,
    headers: ["id", "nombre", "email"],
    rows: [
      ["1", "Camila", "cami@x.cl"],
      ["2", "Felipe", "feli@x.cl"],
      ["3", "Daniela", "dani@x.cl"],
    ],
  });
  slide.addShape(SH.roundRect, {
    x: 4.84, y: 4.96, w: 2.58, h: 0.62,
    rectRadius: 0.04,
    fill: { color: C.paleRed },
    line: { color: C.red, pt: 1.2 },
  });
  slide.addText("usuario_id = 99\nno existe", {
    x: 5.04, y: 5.12, w: 2.18, h: 0.26,
    fontFace: TYPOGRAPHY.display, fontSize: 12.8, bold: true, color: C.red,
    align: "center", margin: 0,
  });
  addStatementBand(slide, "La integridad referencial evita que la aplicación invente dueños.", { y: 6.24, h: 0.48 });
  validateSlide(slide, pptx);
}

function createRelationshipVsAuthSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Relación No Es Autorización", "Un JOIN puede estar correcto y aun así exponer demasiado", "Bloque 1");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.02, w: 5.74, h: 3.92,
    title: "Consulta incompleta",
    lang: "sql",
    fontSize: 10.2,
    code: `SELECT c.id, c.total, u.email
FROM compras AS c
INNER JOIN usuarios AS u
  ON c.usuario_id = u.id;`,
  });
  addCard(slide, SH, {
    x: 7.02, y: 2.06, w: 4.34, h: 1.0,
    title: "Sí relaciona",
    body: "La condición ON conecta compras con usuarios.",
    accent: C.navy, fill: C.softBlue, line: C.navy,
  });
  addCard(slide, SH, {
    x: 7.02, y: 3.28, w: 4.34, h: 1.0,
    title: "No limita",
    body: "No dice qué usuario puede ver qué compras.",
    accent: C.red, fill: C.paleRed, line: C.red,
  });
  addCard(slide, SH, {
    x: 7.02, y: 4.5, w: 4.34, h: 1.0,
    title: "No minimiza",
    body: "Puede enviar email aunque la pantalla no lo requiera.",
    accent: C.gold, fill: C.warningSoft, line: C.gold,
  });
  validateSlide(slide, pptx);
}

function createScopedQuerySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Consulta Debe Tener Alcance", "Relación + filtro + columnas necesarias", "Bloque 1");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.02, w: 6.7, h: 4.12,
    title: "Versión para mis compras",
    lang: "sql",
    fontSize: 10,
    code: `SELECT
  c.id,
  c.fecha,
  c.estado,
  c.total
FROM compras AS c
WHERE c.usuario_id = ?;`,
  });
  const checks = [
    { title: "Columnas explícitas", body: "Solo lo que la pantalla necesita.", accent: C.navy },
    { title: "Parámetro", body: "`?` viene del usuario autenticado, no del cliente.", accent: C.red },
    { title: "Sin JOIN innecesario", body: "Si no se necesita `usuarios`, no se une.", accent: C.gold },
  ];
  checks.forEach((check, i) => {
    addMiniCard(slide, SH, {
      x: 7.9, y: 2.02 + i * 1.25, w: 3.48, h: 1.02,
      title: check.title,
      body: check.body,
      accent: check.accent,
      fill: check.accent === C.red ? C.paleRed : check.accent === C.gold ? C.warningSoft : C.softBlue,
      line: check.accent,
      titleFontSize: 13.4,
      bodyFontSize: 9.8,
    });
  });
  addStatementBand(slide, "Unir tablas responde cómo se conectan; autorizar responde quién puede ver.", { y: 6.28, h: 0.48 });
  validateSlide(slide, pptx);
}

function createAgentModelReviewSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Agentes Para Revisar Modelos", "Útiles para pensar relaciones; insuficientes para validar realidad", "Bloque 1");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.0, w: 6.48, h: 4.36,
    title: "Prompt de revisión",
    lang: "text",
    fontSize: 8.7,
    code: `Actúa como revisor de modelo relacional.
Tengo estas tablas:
usuarios, compras, productos y detalle_compras.

Explica:
- relaciones esperadas;
- claves primarias y foráneas;
- cardinalidad;
- riesgos de integridad y seguridad
antes de escribir consultas JOIN.`,
  });
  addCard(slide, SH, {
    x: 7.72, y: 2.08, w: 3.72, h: 1.06,
    title: "Puede ayudar",
    body: "Propone relaciones, dudas y mejoras iniciales.",
    accent: C.navy, fill: C.softBlue, line: C.navy,
  });
  addCard(slide, SH, {
    x: 7.72, y: 3.46, w: 3.72, h: 1.06,
    title: "No ve todo",
    body: "No conoce datos reales, permisos ni reglas de negocio.",
    accent: C.gold, fill: C.warningSoft, line: C.gold,
  });
  addCard(slide, SH, {
    x: 7.72, y: 4.84, w: 3.72, h: 1.06,
    title: "Debes verificar",
    body: "Esquema, columnas, tipos, restricciones y resultados.",
    accent: C.red, fill: C.paleRed, line: C.red,
  });
  validateSlide(slide, pptx);
}

function createBlock1SynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis Del Bloque 1", "Antes del JOIN, entender el modelo", "Bloque 1");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.08, w: 10.26, h: 4.7,
    title: "Criterios que quedan instalados",
    columns: 2,
    entries: [
      { badge: "01", title: "Entidades", body: "Cada tabla debe guardar un tipo de hecho reconocible.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "02", title: "Claves", body: "PK identifica; FK conecta y protege consistencia.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "03", title: "Cardinalidad", body: "Anticipa cuántas filas puede producir una relación.", accent: C.gold, fill: C.warningSoft, badgeFill: C.gold },
      { badge: "04", title: "Alcance", body: "Relación correcta no equivale a autorización correcta.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
    ],
  });
  validateSlide(slide, pptx);
}

function createBlock1QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas De Seguimiento", "Bloque 1 · Datos relacionados", "Bloque 1");
  const questions = [
    {
      badge: "01",
      question: "¿Por qué no conviene guardar usuarios, compras y productos en una sola tabla gigante?",
      hint: "Piensa en repetición, cambios futuros y contradicciones.",
      accent: C.navy,
    },
    {
      badge: "02",
      question: "¿Qué diferencia práctica existe entre una clave primaria y una clave foránea?",
      hint: "Una identifica una fila; la otra apunta a una fila de otra tabla.",
      accent: C.red,
    },
    {
      badge: "03",
      question: "¿Por qué una relación correcta entre tablas no basta para garantizar autorización?",
      hint: "Relacionar datos no define quién puede verlos o modificarlos.",
      accent: C.gold,
    },
  ];
  questions.forEach((q, i) => {
    addFollowUpQuestion(slide, {
      ...q,
      x: 0.92,
      y: 2.18 + i * 1.36,
      w: 10.1,
      h: 1.12,
    });
  });
  validateSlide(slide, pptx);
}

function createBlock2OpeningSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addBarsMotif(slide, 0.88, 1.62, 1.05, C.red);
  slide.addText("JOINs:\nreconstruir información distribuida", {
    x: 0.88, y: 2.52, w: 10.6, h: 1.42,
    fontFace: TYPOGRAPHY.display, fontSize: 39, bold: true, color: C.white, margin: 0,
    fit: "shrink",
  });
  slide.addText("Bloque 2 · INNER, LEFT, ausencia de coincidencia, alias y alcance.", {
    x: 0.88, y: 4.28, w: 10.4, h: 0.34,
    fontFace: TYPOGRAPHY.body, fontSize: 16.8, bold: true, color: C.gold,
  });
  slide.addShape(SH.roundRect, {
    x: 0.88, y: 5.78, w: 10.4, h: 0.74,
    rectRadius: 0.04,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addText("Objetivo del bloque: combinar tablas sin perder control sobre columnas, filtros y permisos.", {
    x: 1.08, y: 6.02, w: 10, h: 0.22,
    fontFace: TYPOGRAPHY.display, fontSize: 16.2, bold: true, color: C.navy,
    align: "center", margin: 0,
  });
  validateSlide(slide, pptx);
}

function createJoinPurposeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Qué Resuelve Un JOIN", "Combina filas relacionadas por claves", "Bloque 2");
  addTablePreview(slide, {
    x: 0.9, y: 2.08, w: 3.58, title: "usuarios",
    accent: C.navy,
    headers: ["id", "nombre", "email"],
    rows: [
      ["1", "Camila", "cami@x.cl"],
      ["2", "Felipe", "feli@x.cl"],
      ["3", "Daniela", "dani@x.cl"],
    ],
  });
  addTablePreview(slide, {
    x: 7.76, y: 2.08, w: 3.58, title: "compras",
    accent: C.red,
    headers: ["id", "usuario_id", "total"],
    rows: [
      ["10", "1", "49990"],
      ["11", "1", "18990"],
      ["12", "2", "34990"],
    ],
  });
  slide.addShape(SH.chevron, {
    x: 5.24, y: 3.08, w: 0.78, h: 0.78,
    fill: { color: C.gold },
    line: { color: C.gold },
  });
  slide.addText("compras.usuario_id\n=\nusuarios.id", {
    x: 4.76, y: 4.0, w: 1.74, h: 0.74,
    fontFace: TYPOGRAPHY.mono, fontSize: 11.4, bold: true, color: C.navy,
    align: "center", margin: 0,
  });
  addStatementBand(slide, "El JOIN no mezcla por cercanía: compara columnas relacionadas.", { y: 6.18, h: 0.52 });
  validateSlide(slide, pptx);
}

function createJoinAnatomySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Anatomía De Un JOIN", "Separar selección, origen y relación", "Bloque 2");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.0, w: 6.92, h: 4.5,
    title: "Consulta base",
    lang: "sql",
    fontSize: 10.4,
    code: `SELECT
  c.id,
  c.fecha,
  c.total,
  u.email
FROM compras AS c
INNER JOIN usuarios AS u
  ON c.usuario_id = u.id;`,
  });
  const notes = [
    { title: "SELECT", body: "Columnas que saldrán hacia la aplicación.", accent: C.navy },
    { title: "FROM", body: "Tabla principal desde donde leo.", accent: C.gold },
    { title: "ON", body: "Condición que conecta las tablas.", accent: C.red },
  ];
  notes.forEach((note, i) => {
    addMiniCard(slide, SH, {
      x: 8.08, y: 2.08 + i * 1.26, w: 3.36, h: 1.02,
      title: note.title,
      body: note.body,
      accent: note.accent,
      fill: note.accent === C.red ? C.paleRed : note.accent === C.gold ? C.warningSoft : C.softBlue,
      line: note.accent,
      titleFontSize: 13.8,
      bodyFontSize: 9.8,
    });
  });
  validateSlide(slide, pptx);
}

function createInnerJoinVisualSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "INNER JOIN: Solo Coincidencias", "Aparece lo que existe en ambos lados de la relación", "Bloque 2");
  addJoinSetDiagram(slide, SH, {
    x: 0.88, y: 2.02, w: 4.86, h: 4.28,
    type: "inner",
    title: "Vista de conjuntos",
    leftLabel: "usuarios",
    rightLabel: "compras",
    result: "coinciden",
    caption: "Solo usuarios que tienen compras relacionadas.",
  });
  addCodePanel(slide, SH, {
    x: 6.08, y: 2.02, w: 5.44, h: 4.28,
    title: "INNER JOIN",
    lang: "sql",
    fontSize: 10,
    code: `SELECT
  c.id,
  c.total,
  u.nombre
FROM compras AS c
INNER JOIN usuarios AS u
  ON c.usuario_id = u.id;`,
  });
  validateSlide(slide, pptx);
}

function createInnerJoinResultSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Resultado Son Filas", "El diagrama ayuda, pero SQL devuelve registros", "Bloque 2");
  addTablePreview(slide, {
    x: 0.9, y: 2.02, w: 3.42, title: "usuarios",
    accent: C.navy,
    headers: ["id", "nombre"],
    rows: [
      ["1", "Camila"],
      ["2", "Felipe"],
      ["3", "Daniela"],
    ],
  });
  addTablePreview(slide, {
    x: 4.66, y: 2.02, w: 3.42, title: "compras",
    accent: C.red,
    headers: ["id", "usuario_id", "total"],
    rows: [
      ["10", "1", "49990"],
      ["11", "1", "18990"],
      ["12", "2", "34990"],
    ],
  });
  addTablePreview(slide, {
    x: 8.42, y: 2.02, w: 3.42, title: "resultado",
    accent: C.gold,
    headers: ["compra", "total", "nombre"],
    rows: [
      ["10", "49990", "Camila"],
      ["11", "18990", "Camila"],
      ["12", "34990", "Felipe"],
    ],
  });
  addStatementBand(slide, "Que Camila aparezca dos veces no es duplicación: tiene dos compras.", { y: 6.22, h: 0.5 });
  validateSlide(slide, pptx);
}

function createOneToManyRowsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "1:N Puede Repetir Datos", "La repetición en el resultado puede ser correcta", "Bloque 2");
  addCenterStatement(slide, SH, "Una fila de usuario puede combinarse con muchas filas de compra.", {
    x: 0.88, y: 2.02, w: 10.52, h: 0.9,
    fill: C.navy, color: C.white, fontSize: 22, rectRadius: 0.05,
  });
  const sequence = [
    { title: "Usuario 1", body: "Camila", accent: C.navy, x: 1.08 },
    { title: "Compra 10", body: "$49.990", accent: C.red, x: 4.48 },
    { title: "Compra 11", body: "$18.990", accent: C.red, x: 7.88 },
  ];
  sequence.forEach((item) => {
    addCard(slide, SH, {
      x: item.x, y: 3.76, w: 2.72, h: 1.42,
      title: item.title,
      body: item.body,
      accent: item.accent,
      fill: item.accent === C.red ? C.paleRed : C.softBlue,
      line: item.accent,
      titleFontSize: 16,
      bodyFontSize: 13.4,
    });
  });
  slide.addShape(SH.chevron, { x: 3.82, y: 4.22, w: 0.34, h: 0.34, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addShape(SH.chevron, { x: 7.22, y: 4.22, w: 0.34, h: 0.34, fill: { color: C.gold }, line: { color: C.gold } });
  addStatementBand(slide, "En una relación 1:N, una entidad puede aparecer en varias filas combinadas.", { y: 6.14, h: 0.52 });
  validateSlide(slide, pptx);
}

function createLeftJoinVisualSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "LEFT JOIN: Conservar El Lado Principal", "Sirve para ver coincidencias y ausencias", "Bloque 2");
  addJoinSetDiagram(slide, SH, {
    x: 0.88, y: 2.02, w: 4.86, h: 4.28,
    type: "left",
    title: "Vista de conjuntos",
    leftLabel: "usuarios",
    rightLabel: "compras",
    result: "usuarios",
    caption: "Todos los usuarios, tengan o no compras.",
  });
  addCodePanel(slide, SH, {
    x: 6.08, y: 2.02, w: 5.44, h: 4.28,
    title: "LEFT JOIN",
    lang: "sql",
    fontSize: 9.7,
    code: `SELECT
  u.id,
  u.nombre,
  c.id AS compra_id,
  c.total
FROM usuarios AS u
LEFT JOIN compras AS c
  ON u.id = c.usuario_id;`,
  });
  validateSlide(slide, pptx);
}

function createLeftJoinNullSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "NULL También Comunica", "La ausencia de compra aparece como dato", "Bloque 2");
  addTablePreview(slide, {
    x: 0.9, y: 2.04, w: 7.0, title: "resultado del LEFT JOIN",
    accent: C.navy,
    headers: ["usuario_id", "nombre", "compra_id", "total"],
    rows: [
      ["1", "Camila", "10", "49990"],
      ["1", "Camila", "11", "18990"],
      ["2", "Felipe", "12", "34990"],
      ["3", "Daniela", "NULL", "NULL"],
    ],
  });
  addCard(slide, SH, {
    x: 8.34, y: 2.18, w: 3.24, h: 1.18,
    title: "No es error",
    body: "Daniela existe aunque no tenga compras.",
    accent: C.gold, fill: C.warningSoft, line: C.gold,
  });
  addCard(slide, SH, {
    x: 8.34, y: 3.74, w: 3.24, h: 1.18,
    title: "Es una señal",
    body: "La aplicación puede mostrar usuarios sin actividad.",
    accent: C.red, fill: C.paleRed, line: C.red,
  });
  addStatementBand(slide, "La ausencia también puede ser una pregunta de negocio.", { y: 6.24, h: 0.48 });
  validateSlide(slide, pptx);
}

function createLeftAntiJoinSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Sin Coincidencia: LEFT JOIN + IS NULL", "Buscar lo que falta también es consultar", "Bloque 2");
  addJoinSetDiagram(slide, SH, {
    x: 0.88, y: 2.04, w: 4.6, h: 4.22,
    type: "leftOnly",
    title: "Usuarios sin compras",
    leftLabel: "usuarios",
    rightLabel: "compras",
    result: "sin compra",
    caption: "Solo registros del lado izquierdo sin relación.",
  });
  addCodePanel(slide, SH, {
    x: 5.84, y: 2.04, w: 5.76, h: 4.22,
    title: "Patrón de ausencia",
    lang: "sql",
    fontSize: 9.3,
    code: `SELECT
  u.id,
  u.nombre,
  u.email
FROM usuarios AS u
LEFT JOIN compras AS c
  ON u.id = c.usuario_id
WHERE c.id IS NULL;`,
  });
  validateSlide(slide, pptx);
}

function createAbsenceUseCasesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas Que Buscan Ausencia", "`IS NULL` puede detectar trabajo pendiente", "Bloque 2");
  const cases = [
    { title: "Usuarios", body: "Registrados sin compras.", accent: C.navy },
    { title: "Productos", body: "Nunca vendidos.", accent: C.red },
    { title: "Tickets", body: "Sin respuesta asignada.", accent: C.gold },
    { title: "Cursos", body: "Sin estudiantes inscritos.", accent: C.navy },
  ];
  cases.forEach((item, i) => {
    addCard(slide, SH, {
      x: 0.88 + (i % 2) * 5.35,
      y: 2.16 + Math.floor(i / 2) * 1.78,
      w: 4.86,
      h: 1.26,
      title: item.title,
      body: item.body,
      accent: item.accent,
      fill: item.accent === C.red ? C.paleRed : item.accent === C.gold ? C.warningSoft : C.softBlue,
      line: item.accent,
      titleFontSize: 17,
      bodyFontSize: 12.2,
    });
  });
  addStatementBand(slide, "Administrar una aplicación también implica encontrar lo que todavía no existe.", { y: 6.12, h: 0.52 });
  validateSlide(slide, pptx);
}

function createAliasesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Alias: Legibilidad Bajo Control", "Cuando hay varias tablas, los nombres largos estorban", "Bloque 2");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.04, w: 5.2, h: 4.18,
    title: "Sin alias",
    lang: "sql",
    fontSize: 9.5,
    code: `SELECT
  compras.id,
  compras.fecha,
  usuarios.email
FROM compras
INNER JOIN usuarios
  ON compras.usuario_id = usuarios.id;`,
  });
  addCodePanel(slide, SH, {
    x: 6.42, y: 2.04, w: 5.2, h: 4.18,
    title: "Con alias",
    lang: "sql",
    fontSize: 9.5,
    code: `SELECT
  c.id,
  c.fecha,
  u.email
FROM compras AS c
INNER JOIN usuarios AS u
  ON c.usuario_id = u.id;`,
  });
  validateSlide(slide, pptx);
}

function createSelectStarRiskSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "`SELECT *` Crece El Riesgo", "En un JOIN puede traer más datos de los necesarios", "Bloque 2");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 4.86, h: 3.7,
    title: "Cómodo, pero débil",
    lang: "sql",
    fontSize: 10.2,
    code: `SELECT *
FROM compras AS c
INNER JOIN usuarios AS u
  ON c.usuario_id = u.id;`,
  });
  const risks = [
    "Columnas repetidas.",
    "Datos sensibles innecesarios.",
    "Contrato frágil con frontend.",
    "Más superficie de exposición.",
  ];
  risks.forEach((risk, i) => {
    slide.addShape(SH.roundRect, {
      x: 6.2, y: 2.12 + i * 0.78, w: 4.9, h: 0.52,
      rectRadius: 0.03,
      fill: { color: i % 2 === 0 ? C.paleRed : C.warningSoft },
      line: { color: i % 2 === 0 ? C.red : C.gold, pt: 1 },
    });
    slide.addText(risk, {
      x: 6.44, y: 2.28 + i * 0.78, w: 4.38, h: 0.14,
      fontFace: TYPOGRAPHY.body, fontSize: 11.8, bold: true, color: C.ink,
      margin: 0,
    });
  });
  addStatementBand(slide, "En backend, pedir menos datos suele ser una defensa.", { y: 6.18, h: 0.52 });
  validateSlide(slide, pptx);
}

function createExplicitColumnsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Columnas Explícitas", "La consulta debe parecerse al contrato del endpoint", "Bloque 2");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.0, w: 6.26, h: 4.4,
    title: "Respuesta controlada",
    lang: "sql",
    fontSize: 9.8,
    code: `SELECT
  c.id,
  c.fecha,
  c.estado,
  c.total,
  u.email
FROM compras AS c
INNER JOIN usuarios AS u
  ON c.usuario_id = u.id;`,
  });
  addTablePreview(slide, {
    x: 7.48, y: 2.08, w: 3.92, title: "JSON esperado",
    accent: C.navy,
    headers: ["campo", "sale"],
    rows: [
      ["id", "sí"],
      ["fecha", "sí"],
      ["estado", "sí"],
      ["total", "sí"],
      ["password_hash", "no"],
    ],
  });
  validateSlide(slide, pptx);
}

function createOnVsWhereSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "`ON` No Es `WHERE`", "Una cosa conecta tablas; la otra filtra resultados", "Bloque 2");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.02, w: 6.08, h: 4.28,
    title: "Consulta con relación y filtro",
    lang: "sql",
    fontSize: 9.8,
    code: `SELECT c.id, c.fecha, c.total
FROM compras AS c
INNER JOIN usuarios AS u
  ON c.usuario_id = u.id
WHERE u.id = ?
  AND c.estado = 'pagada';`,
  });
  addCard(slide, SH, {
    x: 7.36, y: 2.18, w: 3.84, h: 1.2,
    title: "ON",
    body: "Define cómo se conectan las tablas.",
    accent: C.red, fill: C.paleRed, line: C.red,
  });
  addCard(slide, SH, {
    x: 7.36, y: 3.86, w: 3.84, h: 1.2,
    title: "WHERE",
    body: "Decide qué filas conservamos.",
    accent: C.navy, fill: C.softBlue, line: C.navy,
  });
  addStatementBand(slide, "Relación y alcance deben leerse por separado.", { y: 6.28, h: 0.46 });
  validateSlide(slide, pptx);
}

function createPaidPurchasesScopedSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Caso: Compras Pagadas De Un Usuario", "La pantalla define la intención técnica", "Bloque 2");
  addCard(slide, SH, {
    x: 0.88, y: 2.04, w: 3.82, h: 1.2,
    title: "Necesidad",
    body: "Mostrar mis compras pagadas.",
    accent: C.gold, fill: C.warningSoft, line: C.gold,
  });
  addCard(slide, SH, {
    x: 0.88, y: 3.56, w: 3.82, h: 1.2,
    title: "Alcance",
    body: "Solo usuario autenticado.",
    accent: C.red, fill: C.paleRed, line: C.red,
  });
  addCodePanel(slide, SH, {
    x: 5.1, y: 2.04, w: 6.34, h: 3.92,
    title: "SQL con alcance",
    lang: "sql",
    fontSize: 9.7,
    code: `SELECT
  c.id, c.fecha, c.estado, c.total
FROM compras AS c
WHERE c.usuario_id = ?
  AND c.estado = 'pagada'
ORDER BY c.fecha DESC;`,
  });
  validateSlide(slide, pptx);
}

function createJoinSecurityLeakSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "JOIN Sin Alcance Filtra Más", "Combinar tablas puede multiplicar el daño", "Bloque 2");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.0, w: 6.36, h: 4.3,
    title: "Consulta peligrosa para endpoint personal",
    lang: "sql",
    fontSize: 9.1,
    code: `SELECT
  c.id,
  c.total,
  c.estado,
  u.email,
  u.rol
FROM compras AS c
INNER JOIN usuarios AS u
  ON c.usuario_id = u.id;`,
  });
  const leaks = [
    { title: "Todos los usuarios", body: "No hay filtro de dueño.", accent: C.red },
    { title: "Email expuesto", body: "Quizás la pantalla no lo necesita.", accent: C.gold },
    { title: "Rol interno", body: "Dato sensible para lógica de permisos.", accent: C.red },
  ];
  leaks.forEach((leak, i) => {
    addMiniCard(slide, SH, {
      x: 7.58, y: 2.12 + i * 1.26, w: 3.68, h: 1.02,
      title: leak.title,
      body: leak.body,
      accent: leak.accent,
      fill: leak.accent === C.red ? C.paleRed : C.warningSoft,
      line: leak.accent,
      titleFontSize: 13.2,
      bodyFontSize: 9.6,
    });
  });
  validateSlide(slide, pptx);
}

function createNoUnneededJoinSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Si No Necesitas La Tabla, No La Unas", "Menos datos también es criterio de seguridad", "Bloque 2");
  addCenterStatement(slide, SH, "Para “mis compras” no siempre necesitas unir `usuarios`: el filtro por `usuario_id` puede bastar.", {
    x: 0.88, y: 2.02, w: 10.52, h: 1.04,
    fill: C.navy, color: C.white, fontSize: 21, rectRadius: 0.05,
  });
  addCodePanel(slide, SH, {
    x: 1.06, y: 3.64, w: 10.18, h: 2.34,
    title: "Consulta más pequeña",
    lang: "sql",
    fontSize: 10.5,
    code: `SELECT c.id, c.fecha, c.estado, c.total
FROM compras AS c
WHERE c.usuario_id = ?;`,
  });
  addStatementBand(slide, "No usar JOIN también puede ser una buena decisión técnica.", { y: 6.22, h: 0.48 });
  validateSlide(slide, pptx);
}

function createAgentJoinReviewSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Agente Como Revisor De JOINs", "Útil para auditar, no para ejecutar a ciegas", "Bloque 2");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.0, w: 6.72, h: 4.42,
    title: "Prompt de revisión",
    lang: "text",
    fontSize: 8.2,
    code: `Actúa como asistente SQL para una aplicación web.
Tengo:
usuarios(id, nombre, email)
compras(id, usuario_id, fecha, estado, total)
detalle_compras(compra_id, producto_id, cantidad)

Necesito mostrar compras pagadas de un usuario autenticado.
Propón una consulta con alias, columnas explícitas y parámetros.
Explica qué debo revisar por seguridad antes de usarla.`,
  });
  addChecklistGrid(slide, SH, {
    x: 7.94, y: 2.02, w: 3.48, h: 4.34,
    title: "Validar siempre",
    columns: 1,
    entries: [
      { badge: "1", title: "Esquema real", body: "Columnas y relaciones existen.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "2", title: "Alcance", body: "Filtro por usuario o rol.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "3", title: "Salida", body: "Solo datos necesarios.", accent: C.gold, fill: C.warningSoft, badgeFill: C.gold },
    ],
  });
  validateSlide(slide, pptx);
}

function createBlock2SynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis Del Bloque 2", "JOIN no es solo sintaxis: es criterio de lectura", "Bloque 2");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.08, w: 10.26, h: 4.7,
    title: "Lo que debe quedar claro",
    columns: 2,
    entries: [
      { badge: "01", title: "INNER", body: "Devuelve solo filas con coincidencia.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "02", title: "LEFT", body: "Conserva el lado principal aunque falten coincidencias.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "03", title: "IS NULL", body: "Permite encontrar ausencia de relación.", accent: C.gold, fill: C.warningSoft, badgeFill: C.gold },
      { badge: "04", title: "Alcance", body: "ON conecta; WHERE limita lo que se entrega.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
    ],
  });
  validateSlide(slide, pptx);
}

function createBlock2QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas De Seguimiento", "Bloque 2 · JOINs y alcance", "Bloque 2");
  const questions = [
    {
      badge: "01",
      question: "¿Qué diferencia práctica hay entre `INNER JOIN` y `LEFT JOIN`?",
      hint: "Uno exige coincidencia; el otro conserva el lado principal.",
      accent: C.navy,
    },
    {
      badge: "02",
      question: "¿Por qué `SELECT *` es más riesgoso cuando se combinan varias tablas?",
      hint: "Piensa en columnas sensibles, repetidas o innecesarias.",
      accent: C.red,
    },
    {
      badge: "03",
      question: "¿Qué parte define la relación entre tablas y qué parte limita el alcance del resultado?",
      hint: "`ON` conecta; `WHERE` filtra según la necesidad de la aplicación.",
      accent: C.gold,
    },
  ];
  questions.forEach((q, i) => {
    addFollowUpQuestion(slide, {
      ...q,
      x: 0.92,
      y: 2.18 + i * 1.36,
      w: 10.1,
      h: 1.12,
    });
  });
  validateSlide(slide, pptx);
}

function createBlock3OpeningSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addBarsMotif(slide, 0.88, 1.62, 1.05, C.red);
  slide.addText("Agregaciones:\nde filas sueltas a respuestas útiles", {
    x: 0.88, y: 2.48, w: 10.8, h: 1.5,
    fontFace: TYPOGRAPHY.display, fontSize: 34, bold: true, color: C.white,
    margin: 0,
    breakLine: false,
    fit: "shrink",
  });
  slide.addText("Bloque 3 · COUNT, SUM, AVG, GROUP BY, HAVING y métricas con criterio.", {
    x: 0.88, y: 4.32, w: 10.6, h: 0.34,
    fontFace: TYPOGRAPHY.body, fontSize: 16.6, bold: true, color: C.gold,
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 0.88, y: 5.34, w: 10.0, h: 0.72,
    rectRadius: 0.05,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("Una aplicación no solo lista datos: también mide, resume y decide qué puede mostrar.", {
    x: 1.14, y: 5.56, w: 9.45, h: 0.24,
    fontFace: TYPOGRAPHY.display, fontSize: 17, bold: true, color: C.white,
    margin: 0,
    fit: "shrink",
  });
  validateSlide(slide, pptx);
}

function createRowsToQuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "De Listar A Responder", "Una consulta agregada cambia la unidad de lectura", "Bloque 3");
  addTablePreview(slide, {
    x: 0.88, y: 2.06, w: 4.24, title: "compras",
    accent: C.navy,
    headers: ["id", "usuario", "estado", "total"],
    rows: [
      ["101", "1", "pagada", "39990"],
      ["102", "1", "pagada", "12990"],
      ["103", "2", "pendiente", "24990"],
      ["104", "3", "anulada", "8990"],
    ],
  });
  addCard(slide, SH, {
    x: 5.5, y: 2.06, w: 2.74, h: 1.38,
    title: "Listado",
    body: "Cada fila representa una compra concreta.",
    accent: C.navy,
  });
  addCard(slide, SH, {
    x: 8.54, y: 2.06, w: 2.74, h: 1.38,
    title: "Resumen",
    body: "Una fila puede representar un grupo calculado.",
    accent: C.red,
  });
  addChecklistGrid(slide, SH, {
    x: 5.5, y: 3.82, w: 5.78, h: 2.46,
    title: "Preguntas que ya no piden detalle",
    columns: 2,
    entries: [
      { badge: "01", title: "Venta total", body: "¿Cuánto se vendió?", accent: C.red },
      { badge: "02", title: "Cantidad", body: "¿Cuántas compras hay?", accent: C.navy },
      { badge: "03", title: "Ranking", body: "¿Qué usuario compró más?", accent: C.gold },
      { badge: "04", title: "Estado", body: "¿Cuánto hay por estado?", accent: C.red },
    ],
  });
  validateSlide(slide, pptx);
}

function createAggregationFunctionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Funciones De Agregación", "Calculan un resultado a partir de varias filas", "Bloque 3");
  const items = [
    { title: "COUNT()", body: "Cuenta filas o valores no nulos.", accent: C.navy },
    { title: "SUM()", body: "Suma valores numéricos.", accent: C.red },
    { title: "AVG()", body: "Calcula promedio.", accent: C.gold },
    { title: "MIN()", body: "Obtiene el menor valor.", accent: C.navy },
    { title: "MAX()", body: "Obtiene el mayor valor.", accent: C.red },
  ];
  items.forEach((item, i) => {
    const x = i < 3 ? 0.88 + i * 3.56 : 2.08 + (i - 3) * 4.86;
    const y = i < 3 ? 2.02 : 4.18;
    addMiniCard(slide, SH, {
      x, y, w: i < 3 ? 3.18 : 4.2, h: 1.44,
      title: item.title,
      body: item.body,
      accent: item.accent,
    });
  });
  addStatementBand(slide, "Agregación = transformar muchas filas en un indicador entendible.", {
    y: 6.26, fill: C.navy, fontSize: 14.8,
  });
  validateSlide(slide, pptx);
}

function createGlobalMetricsCodeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Una Fila, Varios Indicadores", "La tabla completa se lee como conjunto", "Bloque 3");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.02, w: 6.56, h: 4.36,
    title: "Resumen global de compras",
    lang: "sql",
    code: `SELECT
  COUNT(*) AS total_compras,
  SUM(total) AS monto_total,
  AVG(total) AS promedio_compra,
  MIN(total) AS compra_menor,
  MAX(total) AS compra_mayor
FROM compras;`,
    fontSize: 12.4,
  });
  addTablePreview(slide, {
    x: 7.78, y: 2.26, w: 3.7, title: "resultado",
    accent: C.red,
    headers: ["métrica", "valor"],
    rows: [
      ["total_compras", "128"],
      ["monto_total", "5249000"],
      ["promedio", "41007.81"],
      ["menor", "3990"],
      ["mayor", "189990"],
    ],
    rowH: 0.38,
  });
  addCard(slide, SH, {
    x: 7.78, y: 5.46, w: 3.7, h: 0.92,
    title: "Cambio mental",
    body: "La consulta ya no muestra una compra: resume la tabla.",
    accent: C.navy,
  });
  validateSlide(slide, pptx);
}

function createCountNullSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "`COUNT(*)` No Es `COUNT(columna)`", "`NULL` cambia lo que realmente estás contando", "Bloque 3");
  addTablePreview(slide, {
    x: 0.88, y: 2.04, w: 4.3, title: "compras",
    accent: C.navy,
    headers: ["id", "estado", "fecha_pago"],
    rows: [
      ["1", "pagada", "2026-05-01"],
      ["2", "pendiente", "NULL"],
      ["3", "pagada", "2026-05-02"],
    ],
    rowH: 0.42,
  });
  addCodePanel(slide, SH, {
    x: 5.56, y: 2.04, w: 5.82, h: 1.54,
    title: "Cuenta filas",
    lang: "sql",
    code: `SELECT COUNT(*) AS total_compras
FROM compras;`,
    fontSize: 12.2,
  });
  addCodePanel(slide, SH, {
    x: 5.56, y: 3.9, w: 5.82, h: 1.54,
    title: "Cuenta pagos completados",
    lang: "sql",
    code: `SELECT COUNT(fecha_pago) AS compras_pagadas
FROM compras;`,
    fontSize: 12.2,
  });
  addStatementBand(slide, "Contar filas no siempre significa contar eventos completados.", {
    y: 6.12, fill: C.red, fontSize: 14.6,
  });
  validateSlide(slide, pptx);
}

function createGroupByConceptSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "`GROUP BY`: Agrupar Antes De Calcular", "Primero se forman grupos; luego se calcula dentro de cada grupo", "Bloque 3");
  addCenterStatement(slide, SH, "Todas las compras con el mismo `usuario_id` forman un grupo.", {
    x: 0.88, y: 2.02, w: 10.52, h: 0.86,
    fill: C.navy, color: C.white, fontSize: 21, rectRadius: 0.05,
  });
  const groups = [
    { label: "usuario_id = 1", rows: ["compra 101", "compra 102", "compra 108", "compra 115"], accent: C.red },
    { label: "usuario_id = 2", rows: ["compra 103"], accent: C.navy },
    { label: "usuario_id = 3", rows: ["compra 104", "compra 110", "compra 111"], accent: C.gold },
  ];
  groups.forEach((group, i) => {
    const x = 0.88 + i * 3.58;
    addCard(slide, SH, {
      x, y: 3.28, w: 3.18, h: 2.34,
      title: group.label,
      body: `${group.rows.join("\n")}\n\nCOUNT(*) = ${group.rows.length}`,
      accent: group.accent,
    });
  });
  validateSlide(slide, pptx);
}

function createGroupByCodeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Compras Por Usuario", "El resultado tiene una fila por grupo", "Bloque 3");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.02, w: 6.06, h: 3.74,
    title: "Consulta agregada",
    lang: "sql",
    code: `SELECT
  usuario_id,
  COUNT(*) AS total_compras
FROM compras
GROUP BY usuario_id;`,
    fontSize: 13,
  });
  addTablePreview(slide, {
    x: 7.34, y: 2.06, w: 3.72, title: "resultado",
    accent: C.red,
    headers: ["usuario_id", "total_compras"],
    rows: [
      ["1", "4"],
      ["2", "1"],
      ["3", "7"],
    ],
    rowH: 0.46,
  });
  addCard(slide, SH, {
    x: 7.34, y: 4.86, w: 3.72, h: 0.96,
    title: "Lectura",
    body: "No hay una fila por compra; hay una fila por usuario.",
    accent: C.navy,
  });
  validateSlide(slide, pptx);
}

function createGroupByRuleSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Regla Técnica Del `GROUP BY`", "Las columnas normales deben tener sentido como criterio de agrupación", "Bloque 3");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.0, w: 5.28, h: 3.86,
    title: "Correcto",
    lang: "sql",
    code: `SELECT
  estado,
  COUNT(*) AS cantidad
FROM compras
GROUP BY estado;`,
    fontSize: 12.4,
  });
  addCodePanel(slide, SH, {
    x: 6.52, y: 2.0, w: 5.28, h: 3.86,
    title: "Problemático",
    lang: "sql",
    code: `SELECT
  estado,
  fecha,
  COUNT(*) AS cantidad
FROM compras
GROUP BY estado;`,
    fontSize: 12.4,
  });
  addStatementBand(slide, "`fecha` puede tener muchos valores dentro del mismo `estado`: la consulta queda ambigua.", {
    y: 6.18, fill: C.red, fontSize: 13.8,
  });
  validateSlide(slide, pptx);
}

function createJoinAggregationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Agregaciones Con `JOIN`", "Las métricas útiles suelen necesitar datos conectados", "Bloque 3");
  addCodePanel(slide, SH, {
    x: 0.78, y: 1.98, w: 7.0, h: 4.82,
    title: "Compras por usuario con correo",
    lang: "sql",
    code: `SELECT
  u.id,
  u.email,
  COUNT(c.id) AS total_compras
FROM usuarios AS u
LEFT JOIN compras AS c
  ON u.id = c.usuario_id
GROUP BY u.id, u.email;`,
    fontSize: 11.7,
  });
  addCard(slide, SH, {
    x: 8.1, y: 2.08, w: 3.48, h: 4.2,
    title: "Qué ocurre",
    body: "1. Parte desde usuarios.\n\n2. Busca compras asociadas.\n\n3. Conserva usuarios sin compra.\n\n4. Agrupa por usuario.\n\n5. Cuenta compras reales.",
    accent: C.navy,
  });
  validateSlide(slide, pptx);
}

function createCountWithLeftJoinSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "`COUNT(c.id)` Evita Un Error Sutil", "Con `LEFT JOIN`, `COUNT(*)` puede contar una fila sin compra real", "Bloque 3");
  addTablePreview(slide, {
    x: 0.88, y: 2.02, w: 5.2, title: "resultado combinado",
    accent: C.navy,
    headers: ["u.id", "email", "c.id"],
    rows: [
      ["1", "camila@example.com", "101"],
      ["1", "camila@example.com", "102"],
      ["2", "felipe@example.com", "103"],
      ["3", "daniela@example.com", "NULL"],
    ],
    rowH: 0.38,
  });
  addCard(slide, SH, {
    x: 6.46, y: 2.08, w: 2.34, h: 1.28,
    title: "COUNT(*)",
    body: "Cuenta la fila combinada, incluso si la compra es NULL.",
    accent: C.red,
  });
  addCard(slide, SH, {
    x: 9.1, y: 2.08, w: 2.34, h: 1.28,
    title: "COUNT(c.id)",
    body: "Cuenta solo compras reales con id no nulo.",
    accent: C.navy,
  });
  addStatementBand(slide, "La agregación correcta depende del JOIN y del significado de la columna.", {
    y: 5.68, fill: C.navy, fontSize: 14.2,
  });
  validateSlide(slide, pptx);
}

function createWhereHavingSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "`WHERE` Vs `HAVING`", "Filtrar filas no es lo mismo que filtrar grupos calculados", "Bloque 3");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.02, w: 5.28, h: 3.72,
    title: "WHERE: antes de agrupar",
    lang: "sql",
    code: `SELECT
  usuario_id,
  COUNT(*) AS compras_pagadas
FROM compras
WHERE estado = 'pagada'
GROUP BY usuario_id;`,
    fontSize: 11.3,
  });
  addCodePanel(slide, SH, {
    x: 6.52, y: 2.02, w: 5.28, h: 3.72,
    title: "HAVING: después de agrupar",
    lang: "sql",
    code: `SELECT
  usuario_id,
  COUNT(*) AS total_compras
FROM compras
GROUP BY usuario_id
HAVING COUNT(*) >= 3;`,
    fontSize: 11.3,
  });
  addStatementBand(slide, "Si el filtro usa una agregación, probablemente pertenece a `HAVING`.", {
    y: 6.12, fill: C.red, fontSize: 14.4,
  });
  validateSlide(slide, pptx);
}

function createMetricsForAppSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Métricas Para Una Aplicación Web", "Las agregaciones alimentan paneles, reportes y estados resumidos", "Bloque 3");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.02, w: 5.72, h: 3.24,
    title: "Ventas por estado",
    lang: "sql",
    code: `SELECT
  estado,
  COUNT(*) AS cantidad,
  SUM(total) AS monto_total
FROM compras
GROUP BY estado;`,
    fontSize: 11.6,
  });
  addTablePreview(slide, {
    x: 6.96, y: 2.08, w: 4.22, title: "panel admin",
    accent: C.red,
    headers: ["estado", "cantidad", "monto"],
    rows: [
      ["pagada", "92", "4210000"],
      ["pendiente", "24", "890000"],
      ["anulada", "12", "149000"],
    ],
    rowH: 0.42,
  });
  [
    { title: "Audiencia", body: "¿Para quién es?", accent: C.navy },
    { title: "Uso", body: "¿Qué decisión apoya?", accent: C.red },
    { title: "Acceso", body: "¿Qué acceso requiere?", accent: C.gold },
  ].forEach((item, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.56, y: 5.68, w: 3.18, h: 0.82,
      title: item.title,
      body: item.body,
      accent: item.accent,
      titleFontSize: 11.8,
      bodyFontSize: 8.8,
    });
  });
  validateSlide(slide, pptx);
}

function createSalesByCategorySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Ventas Por Categoría", "Una métrica real combina JOIN, cálculo y agrupación", "Bloque 3");
  addCodePanel(slide, SH, {
    x: 0.72, y: 1.96, w: 7.32, h: 4.92,
    title: "Consulta compuesta",
    lang: "sql",
    code: `SELECT
  cat.nombre AS categoria,
  SUM(dc.cantidad * dc.precio_unitario) AS monto_total
FROM detalle_compras AS dc
INNER JOIN productos AS p ON dc.producto_id = p.id
INNER JOIN categorias AS cat ON p.categoria_id = cat.id
GROUP BY cat.nombre;`,
    fontSize: 10.7,
  });
  addChecklistGrid(slide, SH, {
    x: 8.36, y: 2.06, w: 3.1, h: 4.3,
    title: "Ideas combinadas",
    columns: 1,
    entries: [
      { badge: "SQL", title: "JOIN", body: "Conecta tablas.", accent: C.navy },
      { badge: "CALC", title: "Subtotal", body: "cantidad × precio calcula línea.", accent: C.red },
      { badge: "SUM", title: "Acumular", body: "Suma ventas.", accent: C.gold },
      { badge: "GB", title: "Agrupar", body: "Resume por categoría.", accent: C.navy },
    ],
  });
  validateSlide(slide, pptx);
}

function createAggregationSecuritySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Cyber: Agregar No Siempre Anonimiza", "Un resumen también puede revelar información sensible", "Bloque 3");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.04, w: 5.2, h: 3.36,
    title: "Métrica sensible",
    lang: "sql",
    code: `SELECT
  usuario_id,
  SUM(total) AS gasto_total
FROM compras
GROUP BY usuario_id;`,
    fontSize: 12,
  });
  addCard(slide, SH, {
    x: 6.52, y: 2.04, w: 4.86, h: 3.36,
    title: "Riesgos",
    body: "Revela gasto por persona.\n\nPuede permitir deducciones.\n\nRequiere rol u ownership.\n\nDebe limitar columnas y filtros.",
    accent: C.red,
  });
  addStatementBand(slide, "Menos detalle no significa automáticamente menos riesgo.", {
    y: 5.92, fill: C.red, fontSize: 15.2,
  });
  validateSlide(slide, pptx);
}

function createSmallGroupsPrivacySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Problema De Los Grupos Pequeños", "Un agregado puede apuntar indirectamente a una persona", "Bloque 3");
  addTablePreview(slide, {
    x: 0.88, y: 2.06, w: 4.46, title: "usuarios por comuna",
    accent: C.navy,
    headers: ["comuna", "total_usuarios"],
    rows: [
      ["Santiago", "184"],
      ["Providencia", "93"],
      ["Comuna pequeña", "1"],
      ["La Florida", "126"],
    ],
    rowH: 0.42,
  });
  addCard(slide, SH, {
    x: 5.76, y: 2.1, w: 5.36, h: 1.36,
    title: "Inferencia",
    body: "Si un grupo tiene una sola persona, el resumen puede dejar de ser realmente anónimo.",
    accent: C.red,
  });
  addCard(slide, SH, {
    x: 5.76, y: 3.82, w: 5.36, h: 2.12,
    title: "Controles posibles",
    body: "Agrupar de forma más amplia.\nOcultar grupos mínimos.\nRevisar permisos del panel.\nEvitar columnas sensibles.",
    accent: C.navy,
  });
  validateSlide(slide, pptx);
}

function createAgentAggregationReviewSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Agentes Para Diseñar Métricas", "Pueden traducir preguntas; no validan el negocio por ti", "Bloque 3");
  addCodePanel(slide, SH, {
    x: 0.78, y: 1.98, w: 6.98, h: 4.64,
    title: "Prompt de apoyo",
    lang: "text",
    code: `Actúa como analista SQL para una app web.
Tengo tablas: usuarios, compras,
detalle_compras, productos y categorias.

Necesito consultas para:
1. total vendido por estado;
2. compras pagadas por usuario;
3. ventas por categoría.

Usa alias, GROUP BY correcto y advierte
controles de seguridad antes de exponerlas.`,
    fontSize: 10.8,
  });
  addChecklistGrid(slide, SH, {
    x: 8.08, y: 2.08, w: 3.46, h: 4.2,
    title: "Validación humana",
    columns: 1,
    entries: [
      { badge: "01", title: "Pregunta", body: "La métrica responde lo pedido.", accent: C.navy },
      { badge: "02", title: "JOIN", body: "No infla números.", accent: C.red },
      { badge: "03", title: "COUNT", body: "La variante elegida tiene sentido.", accent: C.gold },
      { badge: "04", title: "Acceso", body: "El panel tiene permisos.", accent: C.navy },
    ],
  });
  validateSlide(slide, pptx);
}

function createAggregationFalseConfidenceSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Números Falsos Con Apariencia Profesional", "Una agregación mal diseñada puede verse correcta", "Bloque 3");
  addCard(slide, SH, {
    x: 0.88, y: 2.08, w: 3.38, h: 2.8,
    title: "Duplicar por JOIN",
    body: "Unir una tabla de detalle puede multiplicar filas antes de sumar.",
    accent: C.red,
  });
  addCard(slide, SH, {
    x: 4.52, y: 2.08, w: 3.38, h: 2.8,
    title: "Contar lo incorrecto",
    body: "`COUNT(*)` puede contar filas técnicas, no eventos reales.",
    accent: C.navy,
  });
  addCard(slide, SH, {
    x: 8.16, y: 2.08, w: 3.38, h: 2.8,
    title: "Filtrar tarde",
    body: "Confundir `WHERE` y `HAVING` cambia qué entra al cálculo.",
    accent: C.gold,
  });
  addStatementBand(slide, "En datos, una respuesta incorrecta puede ser más peligrosa si se ve convincente.", {
    y: 5.78, fill: C.navy, fontSize: 14.5,
  });
  validateSlide(slide, pptx);
}

function createBlock3SynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis Del Bloque 3", "Agregación es técnica, lectura y criterio de exposición", "Bloque 3");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.08, w: 10.26, h: 4.7,
    title: "Lo que debe quedar instalado",
    columns: 2,
    entries: [
      { badge: "01", title: "Resumen", body: "Una consulta agregada resume grupos de filas.", accent: C.navy },
      { badge: "02", title: "COUNT", body: "`COUNT(*)` y `COUNT(columna)` no significan lo mismo.", accent: C.red },
      { badge: "03", title: "Unidad", body: "`GROUP BY` define la unidad del resultado.", accent: C.gold },
      { badge: "04", title: "Filtro", body: "`WHERE` filtra antes; `HAVING` filtra después.", accent: C.navy },
      { badge: "05", title: "Métrica", body: "JOIN + agregación permite métricas reales.", accent: C.red },
      { badge: "06", title: "Seguridad", body: "Un agregado también puede requerir permisos.", accent: C.gold },
    ],
  });
  validateSlide(slide, pptx);
}

function createBlock3QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas De Seguimiento", "Bloque 3 · agregaciones y métricas", "Bloque 3");
  const questions = [
    {
      badge: "01",
      question: "¿Qué cambia entre listar compras y calcular compras por estado?",
      hint: "En una lista cada fila es un registro; en una agregación cada fila puede ser un grupo.",
      accent: C.navy,
    },
    {
      badge: "02",
      question: "¿Por qué `COUNT(*)` y `COUNT(fecha_pago)` pueden entregar números distintos?",
      hint: "`COUNT(columna)` no cuenta valores `NULL`; `COUNT(*)` cuenta filas.",
      accent: C.red,
    },
    {
      badge: "03",
      question: "¿Por qué un reporte agregado también necesita control de acceso?",
      hint: "Un resumen puede revelar gasto, comportamiento o grupos demasiado pequeños.",
      accent: C.gold,
    },
  ];
  questions.forEach((q, i) => {
    addFollowUpQuestion(slide, {
      ...q,
      x: 0.92,
      y: 2.18 + i * 1.36,
      w: 10.1,
      h: 1.12,
    });
  });
  validateSlide(slide, pptx);
}

function createBlock4OpeningSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addBarsMotif(slide, 0.88, 1.62, 1.05, C.red);
  slide.addText("Normalización ligera\ny consultas listas para backend", {
    x: 0.88, y: 2.46, w: 10.85, h: 1.5,
    fontFace: TYPOGRAPHY.display, fontSize: 33, bold: true, color: C.white,
    margin: 0,
    fit: "shrink",
  });
  slide.addText("Bloque 4 · reducir contradicciones, conectar endpoints y limitar exposición.", {
    x: 0.88, y: 4.34, w: 10.7, h: 0.34,
    fontFace: TYPOGRAPHY.body, fontSize: 16.4, bold: true, color: C.gold,
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: 0.88, y: 5.34, w: 10.22, h: 0.72,
    rectRadius: 0.05,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("SQL intermedio no es escribir más largo: es consultar datos mejor modelados y mejor acotados.", {
    x: 1.12, y: 5.56, w: 9.74, h: 0.24,
    fontFace: TYPOGRAPHY.display, fontSize: 16.2, bold: true, color: C.white,
    margin: 0,
    fit: "shrink",
  });
  validateSlide(slide, pptx);
}

function createNormalizationPurposeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Normalizar No Es Complicar", "Es reducir contradicciones y dependencias mal ubicadas", "Bloque 4");
  addCenterStatement(slide, SH, "Si un dato se repite demasiado, se contradice fácil o no pertenece a esa tabla, el modelo debe revisarse.", {
    x: 0.88, y: 2.02, w: 10.62, h: 1.02,
    fill: C.navy, color: C.white, fontSize: 19.6, rectRadius: 0.05,
  });
  [
    { title: "Duplicación", body: "El mismo dato aparece en muchas filas.", accent: C.red },
    { title: "Inconsistencia", body: "Una corrección deja versiones distintas.", accent: C.gold },
    { title: "Dependencia débil", body: "La consulta depende de texto repetido, no de claves.", accent: C.navy },
  ].forEach((item, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.55, y: 3.62, w: 3.18, h: 1.64,
      title: item.title,
      body: item.body,
      accent: item.accent,
    });
  });
  addStatementBand(slide, "La meta es mantenibilidad: datos más confiables para consultas más confiables.", {
    y: 6.12, fill: C.red, fontSize: 14.4,
  });
  validateSlide(slide, pptx);
}

function createSpreadsheetModelRiskSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Tabla Gigante Parece Cómoda", "Pero mezcla usuario, producto, categoría, compra y detalle", "Bloque 4");
  addTablePreview(slide, {
    x: 0.82, y: 2.02, w: 6.58, title: "compras_planilla",
    accent: C.red,
    headers: ["id", "usuario_email", "producto", "categoría", "estado"],
    rows: [
      ["1", "camila@mail.cl", "Mouse Pro", "Accesorios", "pagada"],
      ["2", "camila@mail.cl", "Teclado", "Accesorio", "pagada"],
      ["3", "felipe@mail.cl", "Mouse pro", "Accesorios", "pendiente"],
      ["4", "daniela@mail.cl", "Monitor", "Pantallas", "pagada"],
    ],
    rowH: 0.38,
  });
  addCard(slide, SH, {
    x: 7.74, y: 2.1, w: 3.7, h: 3.5,
    title: "Señales de problema",
    body: "Correo repetido.\n\nCategoría escrita distinto.\n\nProducto sin identidad clara.\n\nCambios obligan a tocar muchas filas.",
    accent: C.navy,
  });
  addStatementBand(slide, "Una demo rápida puede esconder un modelo difícil de mantener.", {
    y: 6.18, fill: C.navy, fontSize: 14.6,
  });
  validateSlide(slide, pptx);
}

function createAnomaliesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Tres Anomalías Clásicas", "No son errores de sintaxis: son señales de diseño", "Bloque 4");
  [
    {
      title: "Inserción",
      body: "No puedo registrar un producto si todavía no existe una compra.",
      accent: C.red,
    },
    {
      title: "Actualización",
      body: "Cambiar una categoría exige modificar cientos de filas.",
      accent: C.navy,
    },
    {
      title: "Borrado",
      body: "Al borrar la única compra de un producto, pierdo el producto.",
      accent: C.gold,
    },
  ].forEach((item, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.68, y: 2.22, w: 3.28, h: 3.18,
      title: item.title,
      body: item.body,
      accent: item.accent,
    });
  });
  addStatementBand(slide, "En una app, las anomalías aparecen como datos que no cuadran entre pantallas.", {
    y: 6.1, fill: C.red, fontSize: 14.3,
  });
  validateSlide(slide, pptx);
}

function createSeparatedModelSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Separar Entidades Sin Perder La Vista Completa", "El modelo ordenado prepara consultas más confiables", "Bloque 4");
  [
    {
      title: "usuarios",
      body: "id · PK\nnombre\nemail",
      accent: C.navy,
      x: 0.88,
      y: 2.02,
      w: 3.32,
      h: 1.62,
    },
    {
      title: "compras",
      body: "id · PK\nusuario_id · FK\nfecha · estado",
      accent: C.red,
      x: 4.54,
      y: 2.02,
      w: 3.32,
      h: 1.62,
    },
    {
      title: "detalle_compras",
      body: "compra_id · FK\nproducto_id · FK\ncantidad · precio_unitario",
      accent: C.gold,
      x: 8.2,
      y: 2.02,
      w: 3.62,
      h: 1.62,
    },
    {
      title: "productos",
      body: "id · PK\ncategoria_id · FK\nnombre · precio_actual",
      accent: C.navy,
      x: 2.2,
      y: 4.02,
      w: 3.62,
      h: 1.48,
    },
    {
      title: "categorias",
      body: "id · PK\nnombre",
      accent: C.red,
      x: 6.34,
      y: 4.02,
      w: 3.62,
      h: 1.48,
    },
  ].forEach((item) => {
    addCard(slide, SH, item);
  });
  addStatementBand(slide, "Para ver todo junto usamos JOIN; para resumir usamos agregaciones; para proteger usamos filtros.", {
    y: 6.28, fill: C.navy, fontSize: 13.8,
  });
  validateSlide(slide, pptx);
}

function createPragmaticNormalizationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "No Normalizar De Más", "Separar solo cuando hay entidad, repetición importante o regla propia", "Bloque 4");
  const cases = [
    { title: "usuario_email", body: "Se repite en compras: separar usuarios y referenciar por `usuario_id`.", accent: C.red },
    { title: "producto_categoria", body: "Crear categorías si se usará para filtros, reportes o administración.", accent: C.navy },
    { title: "estado_compra", body: "Puede partir como columna validada si no tiene reglas propias.", accent: C.gold },
    { title: "precio_unitario", body: "Conviene guardarlo en detalle para conservar precio histórico.", accent: C.red },
  ];
  cases.forEach((item, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + (i % 2) * 5.38, y: 2.04 + Math.floor(i / 2) * 1.76,
      w: 4.92, h: 1.28,
      title: item.title,
      body: item.body,
      accent: item.accent,
      titleFontSize: 12.2,
      bodyFontSize: 9.2,
    });
  });
  addStatementBand(slide, "Duplicación peligrosa no es lo mismo que registro histórico necesario.", {
    y: 5.94, fill: C.red, fontSize: 15.2,
  });
  validateSlide(slide, pptx);
}

function createEndpointNeedSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Consulta Nace Desde El Endpoint", "Primero necesidad de aplicación; después SQL", "Bloque 4");
  addCard(slide, SH, {
    x: 0.88, y: 2.02, w: 3.42, h: 1.36,
    title: "Pantalla",
    body: "Panel “Mis compras”.",
    accent: C.navy,
  });
  addCard(slide, SH, {
    x: 4.58, y: 2.02, w: 3.42, h: 1.36,
    title: "Endpoint",
    body: "GET /api/mis-compras",
    accent: C.red,
  });
  addCard(slide, SH, {
    x: 8.28, y: 2.02, w: 3.42, h: 1.36,
    title: "Respuesta",
    body: "Fecha, estado, total y cantidad de productos.",
    accent: C.gold,
  });
  addCodePanel(slide, SH, {
    x: 0.88, y: 3.82, w: 10.74, h: 2.42,
    title: "Necesidad técnica",
    lang: "text",
    code: `Mostrar solo las compras del usuario autenticado,
ordenadas por fecha reciente, sin exponer columnas innecesarias
y con un conteo de productos por compra.`,
    fontSize: 15,
  });
  validateSlide(slide, pptx);
}

function createBackendQuerySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "`GET /api/mis-compras`", "JOIN, agregación, filtro de alcance y orden para interfaz", "Bloque 4");
  addCodePanel(slide, SH, {
    x: 0.72, y: 1.92, w: 7.5, h: 5.04,
    title: "Consulta posible",
    lang: "sql",
    code: `SELECT
  c.id,
  c.fecha,
  c.estado,
  c.total,
  COUNT(dc.producto_id) AS cantidad_productos
FROM compras AS c
LEFT JOIN detalle_compras AS dc
  ON c.id = dc.compra_id
WHERE c.usuario_id = ?
GROUP BY c.id, c.fecha, c.estado, c.total
ORDER BY c.fecha DESC;`,
    fontSize: 10.3,
  });
  addCard(slide, SH, {
    x: 8.5, y: 2.1, w: 3.0, h: 3.96,
    title: "Capas",
    body: "LEFT JOIN cuenta detalle.\n\nWHERE limita ownership.\n\nGROUP BY resume por compra.\n\nORDER BY sirve a la pantalla.",
    accent: C.navy,
  });
  validateSlide(slide, pptx);
}

function createBackendChecklistSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Checklist Antes Del Backend", "Una consulta correcta también debe ser limitada y verificable", "Bloque 4");
  const items = [
    ["Intención", "Responde la pregunta del endpoint."],
    ["Columnas", "Solo campos necesarios."],
    ["Relaciones", "JOINs por claves correctas."],
    ["Filtros", "Usuario, rol, estado o alcance."],
    ["Parámetros", "No concatenar valores variables."],
    ["Errores", "No exponer SQL crudo al fallar."],
  ];
  items.forEach(([title, body], i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + (i % 3) * 3.55, y: 2.02 + Math.floor(i / 3) * 1.78,
      w: 3.16, h: 1.24,
      title,
      body,
      accent: [C.navy, C.red, C.gold][i % 3],
      titleFontSize: 11.8,
      bodyFontSize: 9.0,
    });
  });
  addStatementBand(slide, "La semana 07 vuelve aquí: alcance, parámetros y exposición mínima.", {
    y: 5.96, fill: C.navy, fontSize: 14.8,
  });
  validateSlide(slide, pptx);
}

function createRelatedDataSecuritySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Cyber: Datos Relacionados, Daño Relacionado", "Mientras más rica la consulta, más caro el error de autorización", "Bloque 4");
  addCodePanel(slide, SH, {
    x: 0.78, y: 1.92, w: 7.0, h: 4.78,
    title: "Reporte peligroso si se expone sin filtros",
    lang: "sql",
    code: `SELECT
  u.email,
  c.id,
  c.total,
  p.nombre,
  dc.cantidad
FROM usuarios AS u
JOIN compras AS c ON u.id = c.usuario_id
JOIN detalle_compras AS dc ON c.id = dc.compra_id
JOIN productos AS p ON dc.producto_id = p.id;`,
    fontSize: 10.2,
  });
  addCard(slide, SH, {
    x: 8.08, y: 2.02, w: 3.58, h: 3.76,
    title: "Puede revelar",
    body: "Correos.\n\nHistorial de compras.\n\nProductos comprados.\n\nMontos y patrones de consumo.",
    accent: C.red,
  });
  addStatementBand(slide, "La seguridad mira el conjunto completo, no cada tabla por separado.", {
    y: 6.84, fill: C.red, fontSize: 13.4,
  });
  validateSlide(slide, pptx);
}

function createAgentBackendReviewSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Agente Como Revisor De Modelo Y Endpoint", "Ayuda a detectar duplicación y exposición; no decide por el equipo", "Bloque 4");
  addCodePanel(slide, SH, {
    x: 0.78, y: 1.94, w: 7.02, h: 4.84,
    title: "Prompt de revisión",
    lang: "text",
    code: `Actúa como revisor de datos y backend.
Revisa si este modelo tiene duplicación
problemática y evalúa una consulta para
GET /api/mis-compras.

Indica:
- filtros faltantes;
- columnas innecesarias;
- riesgos de exposición;
- versión más segura.`,
    fontSize: 11.1,
  });
  addCard(slide, SH, {
    x: 8.12, y: 2.08, w: 3.42, h: 4.18,
    title: "Validar a mano",
    body: "¿El endpoint es personal o admin?\n\n¿Qué usuario está autenticado?\n\n¿El esquema real coincide?\n\n¿La consulta duplica resultados?",
    accent: C.navy,
  });
  validateSlide(slide, pptx);
}

function createBlock4SynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis Del Bloque 4", "Modelo, consulta y backend deben cerrar juntos", "Bloque 4");
  const items = [
    { title: "Modelo", body: "Separar entidades reduce contradicciones.", accent: C.navy },
    { title: "Criterio", body: "No toda repetición es mala: el precio histórico puede ser necesario.", accent: C.red },
    { title: "Endpoint", body: "La consulta responde una necesidad de interfaz o API.", accent: C.gold },
    { title: "Alcance", body: "Filtros y parámetros son parte de la consulta lista para backend.", accent: C.navy },
    { title: "Cyber", body: "Un JOIN rico puede exponer demasiado si falta autorización.", accent: C.red },
    { title: "Agentes", body: "Sirven para revisar, no para reemplazar validación humana.", accent: C.gold },
  ];
  items.forEach((item, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + (i % 3) * 3.55, y: 2.08 + Math.floor(i / 3) * 1.86,
      w: 3.16, h: 1.36,
      title: item.title,
      body: item.body,
      accent: item.accent,
      titleFontSize: 11.8,
      bodyFontSize: 9.0,
    });
  });
  validateSlide(slide, pptx);
}

function createBlock4QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas De Seguimiento", "Bloque 4 · normalización y backend", "Bloque 4");
  const questions = [
    {
      badge: "01",
      question: "¿Qué problema aparece si nombre y correo de usuario se repiten en cada compra?",
      hint: "Piensa en correcciones, datos contradictorios y mantenimiento.",
      accent: C.navy,
    },
    {
      badge: "02",
      question: "¿Por qué puede ser correcto guardar `precio_unitario` en `detalle_compras`?",
      hint: "El precio histórico de una compra no debería cambiar si cambia el precio actual.",
      accent: C.red,
    },
    {
      badge: "03",
      question: "¿Qué revisarías antes de exponer una consulta con varias tablas en un endpoint?",
      hint: "Columnas necesarias, filtro por usuario o rol, parámetros y posible duplicación.",
      accent: C.gold,
    },
  ];
  questions.forEach((q, i) => {
    addFollowUpQuestion(slide, {
      ...q,
      x: 0.92,
      y: 2.18 + i * 1.36,
      w: 10.1,
      h: 1.12,
    });
  });
  validateSlide(slide, pptx);
}

function createClosingOpeningSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addBarsMotif(slide, 0.88, 1.64, 1.1, C.red);
  slide.addText("Cierre:\nconsultar datos conectados con criterio", {
    x: 0.88, y: 2.44, w: 10.9, h: 1.46,
    fontFace: TYPOGRAPHY.display, fontSize: 33.5, bold: true, color: C.white,
    margin: 0,
    fit: "shrink",
  });
  slide.addText("SQL intermedio no consiste en escribir consultas más largas, sino en formular mejores preguntas.", {
    x: 0.88, y: 4.38, w: 10.6, h: 0.34,
    fontFace: TYPOGRAPHY.body, fontSize: 16.4, bold: true, color: C.gold,
    margin: 0,
    fit: "shrink",
  });
  slide.addShape(SH.roundRect, {
    x: 0.88, y: 5.36, w: 10.2, h: 0.72,
    rectRadius: 0.05,
    fill: { color: C.red },
    line: { color: C.red },
  });
  slide.addText("Relaciones, JOINs, agregaciones, normalización, backend, seguridad y agentes forman un mismo flujo.", {
    x: 1.12, y: 5.58, w: 9.72, h: 0.24,
    fontFace: TYPOGRAPHY.display, fontSize: 15.5, bold: true, color: C.white,
    margin: 0,
    fit: "shrink",
  });
  validateSlide(slide, pptx);
}

function createFinalSynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis Final", "De una tabla aislada a datos conectados para aplicaciones", "Cierre");
  const items = [
    { title: "Relaciones", body: "PK, FK y cardinalidad dan estructura al dato.", accent: C.navy },
    { title: "JOINs", body: "Reconstruyen información conectada sin duplicar todo.", accent: C.red },
    { title: "Agregaciones", body: "Convierten filas en indicadores útiles.", accent: C.gold },
    { title: "Normalización", body: "Reduce contradicciones y modelos difíciles de mantener.", accent: C.navy },
    { title: "Seguridad", body: "Combinar tablas exige alcance, parámetros y exposición mínima.", accent: C.red },
    { title: "Agentes", body: "Ayudan a proponer y revisar; el criterio humano valida.", accent: C.gold },
  ];
  items.forEach((item, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + (i % 3) * 3.55, y: 2.06 + Math.floor(i / 3) * 1.9,
      w: 3.16, h: 1.4,
      title: item.title,
      body: item.body,
      accent: item.accent,
      titleFontSize: 11.8,
      bodyFontSize: 9.0,
    });
  });
  validateSlide(slide, pptx);
}

function createSqlIntermediateChecklistSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Checklist De Consulta SQL Intermedia", "Antes de dar una consulta por buena", "Cierre");
  const checks = [
    "¿Qué pregunta de aplicación responde?",
    "¿Qué tablas realmente necesita?",
    "¿Los JOIN usan claves correctas?",
    "¿Las columnas son explícitas y necesarias?",
    "¿Existe filtro por usuario, rol o alcance?",
    "¿Los valores variables están parametrizados?",
    "¿Las agregaciones no duplican resultados?",
    "¿El resultado sirve a la pantalla o endpoint?",
  ];
  checks.forEach((text, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    addMiniCard(slide, SH, {
      x: 0.88 + col * 5.38, y: 2.0 + row * 1.12,
      w: 4.92, h: 0.84,
      title: `${String(i + 1).padStart(2, "0")}`,
      body: text,
      accent: [C.navy, C.red, C.gold, C.navy][i % 4],
      titleFontSize: 10.2,
      bodyFontSize: 8.8,
    });
  });
  validateSlide(slide, pptx);
}

function createExitQuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas De Salida", "Para comprobar criterio antes de cerrar", "Cierre");
  const questions = [
    "¿Por qué una relación 1:N puede repetir datos en un JOIN sin que sea error?",
    "¿Cuándo usarías LEFT JOIN en vez de INNER JOIN?",
    "¿Qué diferencia práctica existe entre WHERE y HAVING?",
    "¿Por qué una consulta agregada también puede exponer información sensible?",
    "¿Qué debes verificar si un agente propone una consulta SQL con varias tablas?",
  ];
  questions.forEach((question, i) => {
    slide.addShape(SH.rect, {
      x: 0.92,
      y: 2.0 + i * 0.88,
      w: 0.12,
      h: 0.58,
      fill: { color: [C.navy, C.red, C.gold, C.navy, C.red][i] },
      line: { color: [C.navy, C.red, C.gold, C.navy, C.red][i] },
    });
    slide.addText(String(i + 1).padStart(2, "0"), {
      x: 1.22, y: 2.08 + i * 0.88, w: 0.42, h: 0.18,
      fontFace: TYPOGRAPHY.display, fontSize: 11.4, bold: true,
      color: [C.navy, C.red, C.gold, C.navy, C.red][i],
      margin: 0,
    });
    slide.addText(question, {
      x: 1.78, y: 2.02 + i * 0.88, w: 9.8, h: 0.34,
      fontFace: TYPOGRAPHY.display, fontSize: 13.0, bold: true,
      color: C.navy,
      margin: 0,
      fit: "shrink",
    });
  });
  validateSlide(slide, pptx);
}

function createNextClassBridgeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Próximo Paso", "De datos relacionales a fundamentos de deep learning", "Cierre");
  addCard(slide, SH, {
    x: 0.88, y: 2.04, w: 3.32, h: 3.1,
    title: "Hoy",
    body: "Ordenamos, relacionamos, agregamos y protegimos datos estructurados.",
    accent: C.navy,
  });
  addCard(slide, SH, {
    x: 4.7, y: 2.04, w: 3.32, h: 3.1,
    title: "Puente",
    body: "Todo sistema inteligente depende de datos, representación, patrones y validación.",
    accent: C.red,
  });
  addCard(slide, SH, {
    x: 8.52, y: 2.04, w: 3.32, h: 3.1,
    title: "Siguiente clase",
    body: "Entraremos a fundamentos de deep learning sin abandonar el criterio técnico.",
    accent: C.gold,
  });
  addStatementBand(slide, "Antes de hablar de modelos, hay que saber mirar los datos que alimentan esos modelos.", {
    y: 6.02, fill: C.navy, fontSize: 14.4,
  });
  validateSlide(slide, pptx);
}

function buildDeck() {
  createCoverSlide();
  createWeekBridgeSlide();
  createOneTableProblemSlide();
  createClassMapSlide();
  createObjectivesSlide();
  createMentalContractSlide();
  createSqlToAiBridgeSlide();
  createBlock1OpeningSlide();
  createSpreadsheetTrapSlide();
  createEntitiesSlide();
  createReferenceSlide();
  createPkFkSlide();
  createCardinalitySlide();
  createManyToManySlide();
  createOrphanDataSlide();
  createRelationshipVsAuthSlide();
  createScopedQuerySlide();
  createAgentModelReviewSlide();
  createBlock1SynthesisSlide();
  createBlock1QuestionsSlide();
  createBlock2OpeningSlide();
  createJoinPurposeSlide();
  createJoinAnatomySlide();
  createInnerJoinVisualSlide();
  createInnerJoinResultSlide();
  createOneToManyRowsSlide();
  createLeftJoinVisualSlide();
  createLeftJoinNullSlide();
  createLeftAntiJoinSlide();
  createAbsenceUseCasesSlide();
  createAliasesSlide();
  createSelectStarRiskSlide();
  createExplicitColumnsSlide();
  createOnVsWhereSlide();
  createPaidPurchasesScopedSlide();
  createJoinSecurityLeakSlide();
  createNoUnneededJoinSlide();
  createAgentJoinReviewSlide();
  createBlock2SynthesisSlide();
  createBlock2QuestionsSlide();
  createBlock3OpeningSlide();
  createRowsToQuestionsSlide();
  createAggregationFunctionsSlide();
  createGlobalMetricsCodeSlide();
  createCountNullSlide();
  createGroupByConceptSlide();
  createGroupByCodeSlide();
  createGroupByRuleSlide();
  createJoinAggregationSlide();
  createCountWithLeftJoinSlide();
  createWhereHavingSlide();
  createMetricsForAppSlide();
  createSalesByCategorySlide();
  createAggregationSecuritySlide();
  createSmallGroupsPrivacySlide();
  createAgentAggregationReviewSlide();
  createAggregationFalseConfidenceSlide();
  createBlock3SynthesisSlide();
  createBlock3QuestionsSlide();
  createBlock4OpeningSlide();
  createNormalizationPurposeSlide();
  createSpreadsheetModelRiskSlide();
  createAnomaliesSlide();
  createSeparatedModelSlide();
  createPragmaticNormalizationSlide();
  createBackendQuerySlide();
  createBackendChecklistSlide();
  createRelatedDataSecuritySlide();
  createAgentBackendReviewSlide();
  createBlock4SynthesisSlide();
  createBlock4QuestionsSlide();
  createClosingOpeningSlide();
  createFinalSynthesisSlide();
  createSqlIntermediateChecklistSlide();
  createExitQuestionsSlide();
  createNextClassBridgeSlide();
}

buildDeck();

pptx
  .writeFile({ fileName: outputPptx })
  .then(() => {
    console.log(`Deck generado: ${outputPptx}`);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
