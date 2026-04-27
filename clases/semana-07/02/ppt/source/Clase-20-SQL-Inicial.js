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
  addMarkBox,
  addChip,
  addChecklistGrid,
} = components;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";

applyAiepTheme(pptx, {
  author: "Diego Obando",
  company: "AIEP",
  subject: "Clase 20",
  title: "SQL inicial: DDL, DML, consultas básicas y operaciones CRUD",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx = path.join(rootDir, "Clase-20-SQL-Inicial.pptx");

const logoPath = path.resolve(__dirname, "../../../../../.agent/skills/slides-aiep/assets/logo-aiep.png");
const logoMarkPath = path.resolve(__dirname, "../../../../../.agent/skills/slides-aiep/assets/logo-aiep-mark.png");

function addHeader(slide, title, subtitle, blockLabel = "Bloque 1", pptxLike = pptx) {
  systemAddHeader(slide, SH, pptxLike, title, subtitle, blockLabel, {
    classLabel: `Clase 20 · ${blockLabel}`,
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
  slide.addShape(SH.rect, { x, y: y + 0.18 * scale, w: 0.2 * scale, h: 0.46 * scale, fill: { color: fill }, line: { color: fill } });
  slide.addShape(SH.rect, { x: x + 0.24 * scale, y, w: 0.24 * scale, h: 0.64 * scale, fill: { color: fill }, line: { color: fill } });
  slide.addShape(SH.rect, { x: x + 0.52 * scale, y: y + 0.18 * scale, w: 0.2 * scale, h: 0.46 * scale, fill: { color: fill }, line: { color: fill } });
}

function addReadableColumn(slide, opts) {
  slide.addShape(SH.roundRect, {
    x: opts.x, y: opts.y, w: opts.w, h: opts.h,
    rectRadius: 0.06,
    fill: { color: opts.fill },
    line: { color: opts.accent, pt: 1.2 },
  });
  slide.addShape(SH.rect, {
    x: opts.x, y: opts.y, w: 0.12, h: opts.h,
    fill: { color: opts.accent },
    line: { color: opts.accent },
  });
  slide.addText(opts.title, {
    x: opts.x + 0.34, y: opts.y + 0.24, w: opts.w - 0.58, h: 0.36,
    fontFace: TYPOGRAPHY.display, fontSize: 19, bold: true, color: C.navy,
    margin: 0,
  });
  slide.addText(opts.subtitle, {
    x: opts.x + 0.34, y: opts.y + 0.72, w: opts.w - 0.58, h: 0.34,
    fontFace: TYPOGRAPHY.body, fontSize: 12.2, bold: true, color: opts.accent,
    margin: 0,
  });
  opts.items.forEach((item, i) => {
    const y = opts.y + 1.28 + i * 0.72;
    slide.addShape(SH.roundRect, {
      x: opts.x + 0.34, y, w: opts.w - 0.68, h: 0.48,
      rectRadius: 0.03,
      fill: { color: C.white },
      line: { color: C.border, pt: 0.7 },
    });
    slide.addText(item, {
      x: opts.x + 0.52, y: y + 0.12, w: opts.w - 1.04, h: 0.24,
      fontFace: TYPOGRAPHY.body, fontSize: 11.4, color: C.ink,
      margin: 0,
      fit: "shrink",
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
    x: opts.x + 0.32, y: opts.y + 0.22, w: 0.48, h: 0.28,
    fontFace: TYPOGRAPHY.display, fontSize: 13, bold: true, color: opts.accent,
    margin: 0,
  });
  slide.addText(opts.question, {
    x: opts.x + 0.86, y: opts.y + 0.18, w: opts.w - 1.18, h: 0.66,
    fontFace: TYPOGRAPHY.display, fontSize: 13.8, bold: true, color: C.navy,
    margin: 0,
    fit: "shrink",
  });
  slide.addText(`Pista: ${opts.hint}`, {
    x: opts.x + 0.86, y: opts.y + 0.98, w: opts.w - 1.18, h: 0.34,
    fontFace: TYPOGRAPHY.body, fontSize: 10.8, color: C.slate,
    margin: 0,
    fit: "shrink",
  });
}

function createCoverSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  slide.addImage({ path: logoPath, x: 0.88, y: 0.62, w: 1.2, h: 0.42 });
  addBarsMotif(slide, 0.88, 1.84, 1.4, C.red);
  slide.addText("SQL inicial:\nDDL, DML y CRUD", {
    x: 0.88, y: 2.86, w: 10.26, h: 1.56,
    fontFace: TYPOGRAPHY.display, fontSize: 44, bold: true, color: C.white, margin: 0, valign: "top",
  });
  slide.addText("Semana 07 · Clase 20: Del modelo de datos a la persistencia controlada.", {
    x: 0.88, y: 4.66, w: 10.26, h: 0.34,
    fontFace: TYPOGRAPHY.body, fontSize: 18, color: C.gold, bold: true,
  });
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 5.82, w: 0.82, h: 0.82 });
  validateSlide(slide, pptx);
}

function createWeekContextSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Ruta de la Semana 07", "De evaluación a seguridad aplicada", "Contexto");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Secuencia técnica",
    columns: 3,
    entries: [
      { badge: "LUN", title: "Evaluación Parcial 2", body: "Aplicación conectada a API o servicio legado con uso documentado de agentes.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "HOY", title: "SQL inicial", body: "Crear estructuras, manipular registros y consultar con criterio técnico.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "MIÉ", title: "Seguridad aplicada", body: "Validación, autenticación básica, errores e higiene frente a inyección SQL.", accent: C.gold, fill: C.warningSoft, badgeFill: C.gold },
    ],
  });
  validateSlide(slide, pptx);
}

function createFromApiToDataSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Lo Que Cambia Hoy", "Ya no basta con recibir datos: hay que persistirlos bien", "Contexto");
  addReadableColumn(slide, {
    x: 0.88, y: 2.22, w: 4.72, h: 4.34,
    title: "Aplicación web",
    subtitle: "Formulario · API · Validación inicial",
    items: ["Recibe intención del usuario.", "Organiza datos en JSON.", "Responde rápido.", "Puede fallar sin destruir todo."],
    accent: C.navy,
    fill: C.softBlue,
  });
  addCenterStatement(slide, SH, "SQL", {
    x: 5.82, y: 3.88, w: 0.86, h: 0.56,
    fill: C.gold, color: C.navy, fontSize: 18, bold: true,
  });
  addReadableColumn(slide, {
    x: 6.9, y: 2.22, w: 4.24, h: 4.34,
    title: "Base de datos",
    subtitle: "Contrato · Integridad · Memoria",
    items: ["Conserva la verdad operativa.", "Rechaza datos inválidos.", "Exige estructura.", "Un error puede persistir años."],
    accent: C.red,
    fill: C.paleRed,
  });
  validateSlide(slide, pptx);
}

function createObjectivesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Objetivos de la Sesión", "Nuestra misión técnica hoy", "Objetivos");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Lo que lograremos",
    columns: 2,
    entries: [
      { badge: "DDL", title: "Diferenciar sublenguajes", body: "Separar estructura, contenido y consulta sin mezclar responsabilidades.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "DATA", title: "Construir esquemas sólidos", body: "Usar tipos, claves y restricciones como contrato técnico.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "CRUD", title: "Ejecutar operaciones base", body: "Preparar el ciclo Crear, Leer, Actualizar y Eliminar con precisión.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "IA", title: "Validar SQL asistido", body: "Detectar atajos peligrosos del agente antes de ejecutar código.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
    ],
  });
  validateSlide(slide, pptx);
}

function createLearningMapSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Mapa de Aprendizaje", "4 bloques, una misma pregunta: ¿cómo cuidamos los datos?", "Mapa");
  const blocks = [
    { title: "Bloque 1", body: "DDL: definir el contenedor y endurecer el esquema.", active: true },
    { title: "Bloque 2", body: "DML: poblar, modificar y borrar con responsabilidad.", active: false },
    { title: "Bloque 3", body: "DQL: preguntar sin exponer datos innecesarios.", active: false },
    { title: "Bloque 4", body: "CRUD: conectar acciones web con operaciones SQL.", active: false },
  ];
  blocks.forEach((b, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 3.36, w: 2.4, h: 2.94,
      title: b.title,
      body: b.body,
      accent: b.active ? C.red : C.navy,
      fill: b.active ? C.paleRed : C.white,
      line: C.border,
      titleFontSize: 12,
      bodyFontSize: 9.4,
    });
  });
  validateSlide(slide, pptx);
}

function createSqlAsContractSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "SQL No Es Solo Escribir Consultas", "Es definir reglas para que el sistema no mienta", "Idea central");
  addCenterStatement(slide, SH, "La base de datos es la memoria institucional de una aplicación. Si el esquema acepta basura, el sistema terminará trabajando con basura.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.6,
    fill: C.navy, color: C.white, fontSize: 22, bold: true, rectRadius: 0.08,
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 4.18, w: 10.26, h: 2.44, title: "Tres responsabilidades",
    columns: 3,
    entries: [
      { badge: "1", title: "Definir", body: "Qué forma tienen los datos.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "2", title: "Proteger", body: "Qué datos se aceptan o rechazan.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "3", title: "Consultar", body: "Qué información sale hacia la aplicación.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ],
  });
  validateSlide(slide, pptx);
}

function createBlock1IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 1", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("Definiendo el Contenedor", {
    x: 0.88, y: 2.14, w: 9.2, h: 0.66,
    fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("DDL: el lenguaje que convierte requerimientos en estructura persistente.", {
    x: 0.88, y: 2.9, w: 8.6, h: 0.38,
    fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  addCenterStatement(slide, SH, "Objetivo del bloque: diseñar tablas que protejan integridad, rendimiento y seguridad desde el origen.", {
    x: 0.88, y: 5.72, w: 10.26, h: 0.82, fill: C.gold, fontSize: 18, color: C.navy, bold: true,
  });
  validateSlide(slide, pptx);
}

function createRelationalModelSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Modelo Relacional", "No creamos listas: definimos entidades, atributos y reglas", "Bloque 1");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Vocabulario base",
    columns: 3,
    entries: [
      { badge: "ENT", title: "Entidad", body: "Objeto relevante del negocio: usuario, sesión, compra, producto.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "ATR", title: "Atributo", body: "Propiedad de la entidad: correo, monto, estado, fecha.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "TUP", title: "Tupla", body: "Fila concreta: una instancia real de esa entidad.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ],
  });
  validateSlide(slide, pptx);
}

function createTableContractSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Tabla Como Contrato", "El backend no debería adivinar la forma de los datos", "Bloque 1");
  slide.addShape(SH.roundRect, { x: 0.88, y: 2.2, w: 4.9, h: 4.38, rectRadius: 0.06, fill: { color: C.white }, line: { color: C.border } });
  slide.addText("sesiones_seguras", {
    x: 0.88, y: 2.2, w: 4.9, h: 0.46,
    fontFace: TYPOGRAPHY.mono, fontSize: 14, bold: true, color: C.white, align: "center", valign: "mid",
    fill: { color: C.navy },
  });
  const rows = [
    ["id", "INT", "PK"],
    ["token_uuid", "CHAR(36)", "UNIQUE"],
    ["usuario_id", "INT", "NOT NULL"],
    ["direccion_ip", "VARCHAR(45)", "NOT NULL"],
    ["ultima_actividad", "TIMESTAMP", "DEFAULT"],
    ["es_valida", "BOOLEAN", "DEFAULT"],
  ];
  rows.forEach((row, i) => {
    const y = 2.78 + i * 0.52;
    slide.addText(row[0], { x: 1.08, y, w: 1.55, h: 0.22, fontFace: TYPOGRAPHY.mono, fontSize: 10.8, color: C.ink, bold: i === 0 });
    slide.addText(row[1], { x: 2.84, y, w: 1.25, h: 0.22, fontFace: TYPOGRAPHY.mono, fontSize: 9.8, color: C.slate });
    slide.addText(row[2], { x: 4.24, y, w: 1.12, h: 0.22, fontFace: TYPOGRAPHY.mono, fontSize: 9.4, color: i === 0 ? C.gold : C.red, align: "right", bold: true });
    if (i < rows.length - 1) {
      slide.addShape(SH.line, { x: 1.04, y: y + 0.36, w: 4.48, h: 0, line: { color: C.paper, pt: 1 } });
    }
  });
  addCard(slide, SH, {
    x: 6.12, y: 2.2, w: 5.02, h: 1.2,
    title: "Contrato estructural",
    body: "Si el dato no cumple el plano, la base de datos debe rechazarlo antes de que contamine el sistema.",
    accent: C.navy, fill: C.softBlue, line: C.navy,
  });
  addCard(slide, SH, {
    x: 6.12, y: 3.68, w: 5.02, h: 1.2,
    title: "Integridad técnica",
    body: "Tipos, claves y restricciones reducen errores del backend y previenen estados imposibles.",
    accent: C.red, fill: C.paleRed, line: C.red,
  });
  addCard(slide, SH, {
    x: 6.12, y: 5.16, w: 5.02, h: 1.2,
    title: "Base para seguridad",
    body: "Un esquema estricto limita payloads inesperados y ayuda a controlar exposición de datos.",
    accent: C.gold, fill: C.warningSoft, line: C.gold,
  });
  validateSlide(slide, pptx);
}

function createDdlAnatomySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Anatomía de CREATE TABLE", "Cada línea toma una decisión de diseño", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 10.26, h: 4.72, title: "Tabla de gestión de sesiones",
    code: `CREATE TABLE sesiones_seguras (
    id INT AUTO_INCREMENT,
    token_uuid CHAR(36) NOT NULL,
    usuario_id INT NOT NULL,
    direccion_ip VARCHAR(45) NOT NULL,
    user_agent TEXT,
    ultima_actividad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    es_valida BOOLEAN DEFAULT TRUE,

    PRIMARY KEY (id),
    UNIQUE (token_uuid),
    INDEX (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
    lang: "sql",
    fontSize: 12.5,
  });
  validateSlide(slide, pptx);
}

function createDdlAnnotationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Leer DDL Como Profesional", "No memorices sintaxis: detecta intención técnica", "Bloque 1");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.14, w: 5.76, h: 4.52, title: "Fragmento crítico",
    code: `token_uuid CHAR(36) NOT NULL,
usuario_id INT NOT NULL,
direccion_ip VARCHAR(45) NOT NULL,

PRIMARY KEY (id),
UNIQUE (token_uuid),
INDEX (usuario_id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4;`,
    lang: "sql",
    fontSize: 14,
  });
  const notes = [
    { title: "CHAR(36)", body: "UUID fijo: evita longitud variable innecesaria.", y: 2.18, accent: C.navy },
    { title: "NOT NULL", body: "La sesión no existe si falta usuario o IP.", y: 3.24, accent: C.red },
    { title: "UNIQUE", body: "No pueden existir dos tokens públicos iguales.", y: 4.32, accent: C.gold },
    { title: "InnoDB + utf8mb4", body: "Motor transaccional y codificación segura.", y: 5.4, accent: C.navy },
  ];
  notes.forEach((note) => {
    addCard(slide, SH, {
      x: 6.94, y: note.y, w: 4.2, h: 0.84,
      title: note.title,
      body: note.body,
      accent: note.accent,
      fill: C.white,
      line: C.border,
      titleFontSize: 11,
      bodyFontSize: 8.7,
    });
  });
  validateSlide(slide, pptx);
}

function createDataTypesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Tipos de Datos", "Cada elección tiene costo en memoria, índices y precisión", "Bloque 1");
  addReadableColumn(slide, {
    x: 0.88, y: 2.22, w: 4.92, h: 4.34,
    title: "Decisión floja",
    subtitle: "Funciona hoy, duele después",
    items: ["VARCHAR para todo.", "BIGINT por si acaso.", "FLOAT para montos.", "TEXT aunque el dato sea corto."],
    accent: C.red,
    fill: C.paleRed,
  });
  addReadableColumn(slide, {
    x: 6.22, y: 2.22, w: 4.92, h: 4.34,
    title: "Decisión técnica",
    subtitle: "El tipo expresa intención",
    items: ["CHAR para valores fijos.", "INT suficiente cuando el rango calza.", "DECIMAL(p,s) para dinero.", "VARCHAR medido antes que TEXT."],
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createConstraintsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Constraints: Guardias 24/7", "La base de datos también defiende reglas de negocio", "Bloque 1");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Restricciones esenciales",
    columns: 4,
    entries: [
      { badge: "PK", title: "PRIMARY KEY", body: "Identidad única y estable para cada fila.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "NN", title: "NOT NULL", body: "Evita registros incompletos en campos obligatorios.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "UQ", title: "UNIQUE", body: "Previene duplicidad lógica: correo, token, código.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "CK", title: "CHECK", body: "Valida rangos o estados permitidos desde la BD.", accent: C.navy, fill: C.white, badgeFill: C.navy },
    ],
  });
  validateSlide(slide, pptx);
}

function createHardeningSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Hardening Estructural", "La seguridad empieza antes del primer INSERT", "Cyber");
  addCard(slide, SH, {
    x: 0.88, y: 2.06, w: 10.26, h: 1.12,
    title: "Idea clave",
    body: "Cada columna innecesaria aumenta superficie de ataque. Cada tipo laxo aumenta posibilidades de datos corruptos.",
    accent: C.red,
    fill: C.paleRed,
    line: C.red,
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 3.52, w: 10.26, h: 3.08, title: "Tres defensas desde DDL",
    columns: 3,
    entries: [
      { badge: "MIN", title: "Exposición mínima", body: "Si el negocio no necesita el dato, no se modela.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "TYPE", title: "Firewall de tipos", body: "Un campo INT rechaza strings maliciosos antes de llegar a la lógica.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "UTF", title: "utf8mb4", body: "Codificación moderna para evitar truncamientos y errores de caracteres.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ],
  });
  validateSlide(slide, pptx);
}

function createAlterDropSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Evolución y Riesgo", "ALTER mantiene; DROP destruye", "Bloque 1");
  addReadableColumn(slide, {
    x: 0.88, y: 2.22, w: 4.92, h: 4.34,
    title: "ALTER TABLE",
    subtitle: "Cambio controlado",
    items: ["Agrega columnas de auditoría.", "Ajusta longitudes.", "Debe ir en migraciones.", "Requiere pruebas y respaldo."],
    accent: C.navy,
    fill: C.softBlue,
  });
  addReadableColumn(slide, {
    x: 6.22, y: 2.22, w: 4.92, h: 4.34,
    title: "DROP TABLE",
    subtitle: "Destrucción atómica",
    items: ["Elimina estructura y datos.", "No se ejecuta manualmente en producción.", "Exige respaldo previo.", "Debe estar fuera del usuario web."],
    accent: C.red,
    fill: C.paleRed,
  });
  validateSlide(slide, pptx);
}

function createAiVarcharTrapSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Huella IA: La Trampa del VARCHAR(255)", "El agente acelera, pero no conoce tu modelo real", "IA");
  addReadableColumn(slide, {
    x: 0.88, y: 2.22, w: 4.92, h: 4.34,
    title: "Pedido débil",
    subtitle: "Sin dominio ni restricciones",
    items: ["\"Crea una tabla para sesiones\".", "Probable VARCHAR(255) para todo.", "Puede omitir motor y charset.", "No justifica índices."],
    accent: C.red,
    fill: C.paleRed,
  });
  addReadableColumn(slide, {
    x: 6.22, y: 2.22, w: 4.92, h: 4.34,
    title: "Pedido técnico",
    subtitle: "Con contexto verificable",
    items: ["MySQL 8 + InnoDB + utf8mb4.", "UUID público fijo.", "IPv4/IPv6 obligatorio.", "Índices justificados."],
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createBlock1SynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 1", "DDL define la forma y los límites de la verdad", "Bloque 1");
  addCenterStatement(slide, SH, "Una tabla bien diseñada reduce errores, hace más simple el backend y obliga a que los datos respeten reglas antes de entrar al sistema.", {
    x: 0.88, y: 2.14, w: 10.26, h: 1.3,
    fill: C.navy, color: C.white, fontSize: 19, bold: true, rectRadius: 0.07,
  });
  const points = [
    { title: "Modelo", body: "Entidad, atributo y tupla organizan el problema.", accent: C.navy },
    { title: "Tipos", body: "Cada tipo afecta precisión, memoria y rendimiento.", accent: C.gold },
    { title: "Restricciones", body: "PK, NOT NULL, UNIQUE y CHECK defienden integridad.", accent: C.red },
    { title: "IA", body: "El agente ayuda, pero los tipos e índices se validan manualmente.", accent: C.navy },
  ];
  points.forEach((point, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 4.08, w: 2.4, h: 2.18,
      title: point.title,
      body: point.body,
      accent: point.accent,
      fill: C.white,
      line: C.border,
      titleFontSize: 12,
      bodyFontSize: 9.4,
    });
  });
  validateSlide(slide, pptx);
}

function createBlock1FollowUpQuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas de Seguimiento", "Bloque 1 · DDL y contrato estructural", "Bloque 1");
  addFollowUpQuestion(slide, {
    x: 0.88, y: 2.08, w: 10.26, h: 1.24,
    badge: "01",
    question: "Si `token_uuid` identifica públicamente una sesión, ¿qué problema evita combinar `CHAR(36)` con `UNIQUE`?",
    hint: "piensa en longitud fija, duplicidad y exposición de identificadores internos.",
    accent: C.navy,
    fill: C.softBlue,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 3.58, w: 10.26, h: 1.24,
    badge: "02",
    question: "¿Por qué `usuario_id` y `direccion_ip` deberían ser `NOT NULL` y no depender solo de la validación del backend?",
    hint: "ubica la base de datos como última línea de defensa de integridad.",
    accent: C.red,
    fill: C.paleRed,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 5.08, w: 10.26, h: 1.24,
    badge: "03",
    question: "Si un agente propone `VARCHAR(255)` para casi todas las columnas, ¿qué revisarías antes de aceptar el DDL?",
    hint: "contrasta regla de negocio, tamaño real, índices y costo de almacenamiento.",
    accent: C.gold,
    fill: C.warningSoft,
  });
  validateSlide(slide, pptx);
}

function createBlock2IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 2", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("Poblando el Mundo", {
    x: 0.88, y: 2.14, w: 9.2, h: 0.66,
    fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("DML: el lenguaje que modifica la verdad persistente del sistema.", {
    x: 0.88, y: 2.9, w: 8.8, h: 0.38,
    fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  addCenterStatement(slide, SH, "Objetivo del bloque: insertar, actualizar y eliminar registros sin romper integridad, trazabilidad ni seguridad.", {
    x: 0.88, y: 5.72, w: 10.26, h: 0.82, fill: C.gold, fontSize: 18, color: C.navy, bold: true,
  });
  validateSlide(slide, pptx);
}

function createDmlTruthSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "DML Cambia la Verdad", "DDL define el plano; DML modifica los datos que el negocio usa", "Bloque 2");
  addCenterStatement(slide, SH, "Un error DDL rompe el contenedor. Un error DML puede dejar datos falsos, borrar evidencia o alterar decisiones reales.", {
    x: 0.88, y: 2.08, w: 10.26, h: 1.22,
    fill: C.navy, color: C.white, fontSize: 19.4, bold: true, rectRadius: 0.07,
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 3.72, w: 10.26, h: 2.86, title: "Riesgos que hay que controlar",
    columns: 3,
    entries: [
      { badge: "INT", title: "Integridad", body: "No violar tipos, claves ni restricciones.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "AUD", title: "Auditabilidad", body: "Saber qué cambió, cuándo y por qué.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "CYB", title: "Seguridad", body: "Evitar payloads, borrados masivos y exposición.", accent: C.red, fill: C.white, badgeFill: C.red },
    ],
  });
  validateSlide(slide, pptx);
}

function createDmlCommandMapSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Mapa DML", "Cuatro comandos, cuatro niveles de responsabilidad", "Bloque 2");
  const commands = [
    { title: "INSERT", body: "Crea registros nuevos. Debe respetar columnas obligatorias y valores únicos.", accent: C.navy },
    { title: "UPDATE", body: "Modifica registros existentes. Sin WHERE, afecta toda la tabla.", accent: C.red },
    { title: "DELETE", body: "Elimina filas filtradas. Puede ser transaccional y auditable.", accent: C.gold },
    { title: "TRUNCATE", body: "Vacía una tabla completa. Es rápido, drástico y de alto riesgo.", accent: C.red },
  ];
  commands.forEach((cmd, i) => {
    const x = 0.88 + (i % 2) * 5.22;
    const y = 2.18 + Math.floor(i / 2) * 2.22;
    addCard(slide, SH, {
      x, y, w: 4.96, h: 1.72,
      title: cmd.title,
      body: cmd.body,
      accent: cmd.accent,
      fill: cmd.accent === C.red ? C.paleRed : C.white,
      line: cmd.accent,
      titleFontSize: 18,
      bodyFontSize: 11.2,
    });
  });
  validateSlide(slide, pptx);
}

function createInsertExplicitSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "INSERT Profesional", "La claridad supera a la brevedad", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 10.26, h: 3.12, title: "Inserción explícita",
    code: `INSERT INTO sesiones_seguras
    (token_uuid, usuario_id, direccion_ip, user_agent)
VALUES
    ('550e8400-e29b-41d4-a716-446655440000',
     101,
     '186.10.250.40',
     'Mozilla/5.0...');`,
    lang: "sql",
    fontSize: 15,
  });
  [
    { title: "Legibilidad", body: "Se entiende qué dato entra.", accent: C.navy },
    { title: "Resiliencia", body: "Soporta cambios de orden.", accent: C.gold },
    { title: "Validación", body: "Facilita revisar constraints.", accent: C.red },
  ].forEach((item, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.46, y: 5.5, w: 3.18, h: 1.1,
      title: item.title,
      body: item.body,
      accent: item.accent,
      fill: C.white,
      line: item.accent,
      titleFontSize: 13,
      bodyFontSize: 9.6,
    });
  });
  validateSlide(slide, pptx);
}

function createInsertPositionalVsExplicitSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "INSERT Posicional vs Explícito", "Una consulta corta puede ser una deuda futura", "Bloque 2");
  addReadableColumn(slide, {
    x: 0.88, y: 2.22, w: 4.92, h: 4.34,
    title: "Posicional",
    subtitle: "Depende del orden físico",
    items: ["INSERT INTO tabla VALUES (...)", "Se rompe si cambia el DDL.", "Oculta qué dato va en cada campo.", "Difícil de auditar en revisión."],
    accent: C.red,
    fill: C.paleRed,
  });
  addReadableColumn(slide, {
    x: 6.22, y: 2.22, w: 4.92, h: 4.34,
    title: "Explícito",
    subtitle: "Declara intención",
    items: ["Nombra cada columna.", "Tolera columnas nuevas con DEFAULT.", "Permite leer reglas de negocio.", "Es más seguro para mantenimiento."],
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createBulkInsertSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Bulk Insert", "Más velocidad, más necesidad de revisar datos", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 6.2, h: 4.58, title: "Inserción múltiple",
    code: `INSERT INTO sesiones_seguras
    (token_uuid, usuario_id, direccion_ip)
VALUES
    ('uuid-001', 102, '192.168.1.10'),
    ('uuid-002', 103, '192.168.1.11'),
    ('uuid-003', 104, '192.168.1.12');`,
    lang: "sql",
    fontSize: 14.6,
  });
  addCard(slide, SH, {
    x: 7.34, y: 2.08, w: 3.8, h: 1.28,
    title: "Cuándo sirve",
    body: "Carga inicial, semillas de prueba o importación controlada.",
    accent: C.navy, fill: C.softBlue, line: C.navy,
    titleFontSize: 13.5, bodyFontSize: 10.4,
  });
  addCard(slide, SH, {
    x: 7.34, y: 3.72, w: 3.8, h: 1.28,
    title: "Riesgo",
    body: "Un solo valor duplicado o NULL indebido puede abortar la operación.",
    accent: C.red, fill: C.paleRed, line: C.red,
    titleFontSize: 13.5, bodyFontSize: 10.4,
  });
  addCard(slide, SH, {
    x: 7.34, y: 5.36, w: 3.8, h: 1.28,
    title: "Criterio",
    body: "Validar datos sintéticos antes de insertarlos masivamente.",
    accent: C.gold, fill: C.warningSoft, line: C.gold,
    titleFontSize: 13.5, bodyFontSize: 10.4,
  });
  validateSlide(slide, pptx);
}

function createUpdateWhereWarningSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "UPDATE Sin WHERE", "El desastre clásico de DML", "Cyber");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.14, w: 5.74, h: 2.42, title: "Código peligroso",
    code: `UPDATE sesiones_seguras
SET es_valida = FALSE;`,
    lang: "sql",
    fontSize: 22,
  });
  addCard(slide, SH, {
    x: 6.92, y: 2.14, w: 4.22, h: 2.42,
    title: "Impacto real",
    body: "La base de datos no adivina tu intención. Sin filtro, invalida todas las sesiones de la tabla.",
    accent: C.red, fill: C.paleRed, line: C.red,
    titleFontSize: 17, bodyFontSize: 13,
  });
  addCenterStatement(slide, SH, "Regla de oro: escribir y revisar el WHERE antes de ejecutar el UPDATE.", {
    x: 0.88, y: 5.18, w: 10.26, h: 1.02,
    fill: C.navy, color: C.white, fontSize: 20, bold: true,
  });
  validateSlide(slide, pptx);
}

function createSafeUpdateWorkflowSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Patrón Seguro Para UPDATE", "Antes de cambiar datos, confirma el alcance", "Bloque 2");
  const steps = [
    { title: "1. SELECT", body: "Ver qué filas serán afectadas.", accent: C.navy },
    { title: "2. WHERE", body: "Filtrar por clave, token o criterio verificable.", accent: C.red },
    { title: "3. UPDATE", body: "Modificar solo las columnas necesarias.", accent: C.gold },
    { title: "4. Verificar", body: "Consultar resultado y registrar evidencia.", accent: C.navy },
  ];
  steps.forEach((step, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 2.3, w: 2.4, h: 2.3,
      title: step.title,
      body: step.body,
      accent: step.accent,
      fill: C.white,
      line: step.accent,
      titleFontSize: 15,
      bodyFontSize: 10.2,
    });
  });
  addCodePanel(slide, SH, {
    x: 0.88, y: 4.86, w: 10.26, h: 1.82, title: "Actualización acotada",
    code: `UPDATE sesiones_seguras
SET es_valida = FALSE
WHERE token_uuid = '550e8400-e29b-41d4-a716-446655440000';`,
    lang: "sql",
    fontSize: 12.6,
  });
  validateSlide(slide, pptx);
}

function createDeleteVsTruncateSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "DELETE vs TRUNCATE", "No toda eliminación tiene el mismo riesgo", "Bloque 2");
  addReadableColumn(slide, {
    x: 0.88, y: 2.22, w: 4.92, h: 4.34,
    title: "DELETE",
    subtitle: "Eliminación filtrada",
    items: ["Permite WHERE.", "Puede generar logs.", "Puede ser parte de transacción.", "Más lento, pero controlable."],
    accent: C.navy,
    fill: C.softBlue,
  });
  addReadableColumn(slide, {
    x: 6.22, y: 2.22, w: 4.92, h: 4.34,
    title: "TRUNCATE",
    subtitle: "Vaciamiento completo",
    items: ["No permite WHERE.", "Vacía toda la tabla.", "Resetea espacio/contadores según motor.", "No pertenece al usuario web."],
    accent: C.red,
    fill: C.paleRed,
  });
  validateSlide(slide, pptx);
}

function createSoftDeleteSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Soft Delete", "Borrar para la interfaz sin destruir evidencia", "Bloque 2");
  addReadableColumn(slide, {
    x: 0.88, y: 2.22, w: 4.92, h: 4.34,
    title: "Hard delete",
    subtitle: "Desaparece el registro",
    items: ["DELETE FROM usuarios WHERE id = 5.", "Pierde trazabilidad.", "Complica auditoría.", "Recuperación difícil."],
    accent: C.red,
    fill: C.paleRed,
  });
  addReadableColumn(slide, {
    x: 6.22, y: 2.22, w: 4.92, h: 4.34,
    title: "Soft delete",
    subtitle: "Marca el registro",
    items: ["UPDATE usuarios SET eliminado_en = NOW().", "Mantiene evidencia.", "Permite restaurar.", "Filtra con eliminado_en IS NULL."],
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createDmlInjectionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Eje Cyber: Inyección SQL en DML", "El atacante intenta convertir datos en instrucciones", "Cyber");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 5.86, h: 4.44, title: "Construcción insegura",
    code: `-- Antipatrón conceptual
UPDATE usuarios
SET nombre = '${"${nombre}"}'
WHERE id = ${"${id}"};`,
    lang: "sql",
    fontSize: 17,
  });
  addChecklistGrid(slide, SH, {
    x: 7.0, y: 2.08, w: 4.14, h: 4.44, title: "Defensa mínima",
    columns: 1,
    entries: [
      { badge: "1", title: "Parámetros", body: "No concatenar strings del usuario.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "2", title: "Validación", body: "Tipos y rangos antes del SQL.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "3", title: "Privilegios", body: "El usuario web no debe tener DROP/TRUNCATE.", accent: C.red, fill: C.white, badgeFill: C.red },
    ],
  });
  validateSlide(slide, pptx);
}

function createAiSyntheticDataSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Huella IA: Datos Sintéticos", "Buen uso: generar casos de prueba; mal uso: insertar sin revisar", "IA");
  addReadableColumn(slide, {
    x: 0.88, y: 2.22, w: 4.92, h: 4.34,
    title: "El agente ayuda",
    subtitle: "Acelera cobertura",
    items: ["Nombres con tildes.", "Correos largos.", "Fechas pasadas y futuras.", "Estados distintos."],
    accent: C.navy,
    fill: C.softBlue,
  });
  addReadableColumn(slide, {
    x: 6.22, y: 2.22, w: 4.92, h: 4.34,
    title: "Tú validas",
    subtitle: "La BD real manda",
    items: ["UNIQUE no duplicado.", "NOT NULL completo.", "Tipos correctos.", "Estado actual de la tabla."],
    accent: C.red,
    fill: C.paleRed,
  });
  validateSlide(slide, pptx);
}

function createBlock2SynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 2", "DML es poder operativo sobre datos reales", "Bloque 2");
  addCenterStatement(slide, SH, "Insertar, actualizar o eliminar no son gestos administrativos: son cambios sobre la memoria del sistema.", {
    x: 0.88, y: 2.08, w: 10.26, h: 1.22,
    fill: C.navy, color: C.white, fontSize: 20, bold: true, rectRadius: 0.07,
  });
  const points = [
    { title: "INSERT", body: "Explícito y coherente con constraints.", accent: C.navy },
    { title: "UPDATE", body: "Siempre acotado por WHERE verificable.", accent: C.red },
    { title: "DELETE", body: "Preferir trazabilidad cuando importa auditoría.", accent: C.gold },
    { title: "IA", body: "Útil para datos de prueba, no para ejecutar sin revisión.", accent: C.navy },
  ];
  points.forEach((point, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 4.02, w: 2.4, h: 2.24,
      title: point.title,
      body: point.body,
      accent: point.accent,
      fill: C.white,
      line: C.border,
      titleFontSize: 14,
      bodyFontSize: 9.8,
    });
  });
  validateSlide(slide, pptx);
}

function createBlock2FollowUpQuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas de Seguimiento", "Bloque 2 · DML y cambios sobre datos reales", "Bloque 2");
  addFollowUpQuestion(slide, {
    x: 0.88, y: 2.08, w: 10.26, h: 1.24,
    badge: "01",
    question: "Antes de ejecutar un `UPDATE`, ¿qué `SELECT` harías para confirmar que el `WHERE` afecta solo las filas correctas?",
    hint: "el objetivo es medir alcance antes de modificar la memoria del sistema.",
    accent: C.red,
    fill: C.paleRed,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 3.58, w: 10.26, h: 1.24,
    badge: "02",
    question: "En una aplicación auditada, ¿por qué `Soft Delete` puede ser más seguro que `DELETE` físico?",
    hint: "piensa en trazabilidad, recuperación y evidencia frente a errores o ataques.",
    accent: C.navy,
    fill: C.softBlue,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 5.08, w: 10.26, h: 1.24,
    badge: "03",
    question: "Si un agente genera datos sintéticos para un `INSERT` masivo, ¿qué constraints revisarías antes de ejecutarlo?",
    hint: "parte por `UNIQUE`, `NOT NULL`, tipos de dato y estado actual de la tabla.",
    accent: C.gold,
    fill: C.warningSoft,
  });
  validateSlide(slide, pptx);
}

function createBlock3IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 3", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("Consultando con Propósito", {
    x: 0.88, y: 2.14, w: 9.2, h: 0.66,
    fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("DQL: preguntar a la base de datos sin exponer ni traer de más.", {
    x: 0.88, y: 2.9, w: 8.8, h: 0.38,
    fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  addCenterStatement(slide, SH, "Objetivo del bloque: recuperar información precisa, segura y útil para la interfaz, evitando fugas y consultas irresponsables.", {
    x: 0.88, y: 5.72, w: 10.26, h: 0.82, fill: C.gold, fontSize: 18, color: C.navy, bold: true,
  });
  validateSlide(slide, pptx);
}

function createDqlIntentSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "DQL No Es Traer Datos", "Es formular una pregunta técnica con intención", "Bloque 3");
  addCenterStatement(slide, SH, "Una consulta profesional no trae todo lo que existe: trae solo lo necesario, en el orden adecuado y con el menor riesgo posible.", {
    x: 0.88, y: 2.08, w: 10.26, h: 1.28,
    fill: C.navy, color: C.white, fontSize: 20, bold: true, rectRadius: 0.07,
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 3.76, w: 10.26, h: 2.82, title: "Tres preguntas antes de escribir SELECT",
    columns: 3,
    entries: [
      { badge: "QUÉ", title: "Columnas", body: "¿Qué campos necesita realmente la interfaz?", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "QUIÉN", title: "Filtro", body: "¿Qué registros corresponden al caso?", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "CUÁN", title: "Volumen", body: "¿Cuántos datos deberían salir de la BD?", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ],
  });
  validateSlide(slide, pptx);
}

function createSelectAnatomySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Anatomía de SELECT", "Cada cláusula reduce incertidumbre", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 6.22, h: 4.58, title: "Consulta base",
    code: `SELECT nombre, precio, stock
FROM productos
WHERE categoria = 'Tecnologia'
  AND stock > 0
ORDER BY precio DESC
LIMIT 20;`,
    lang: "sql",
    fontSize: 17,
  });
  const notes = [
    { title: "SELECT", body: "Define columnas visibles.", accent: C.navy },
    { title: "WHERE", body: "Reduce el conjunto de filas.", accent: C.red },
    { title: "ORDER + LIMIT", body: "Prepara consumo de UI.", accent: C.gold },
  ];
  notes.forEach((note, i) => {
    addCard(slide, SH, {
      x: 7.36, y: 2.08 + i * 1.54, w: 3.78, h: 1.12,
      title: note.title,
      body: note.body,
      accent: note.accent,
      fill: C.white,
      line: note.accent,
      titleFontSize: 13.5,
      bodyFontSize: 10.5,
    });
  });
  validateSlide(slide, pptx);
}

function createSelectStarAntiPatternSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Pecado del SELECT *", "El asterisco es cómodo, pero no inocente", "Bloque 3");
  addReadableColumn(slide, {
    x: 0.88, y: 2.22, w: 4.92, h: 4.34,
    title: "SELECT *",
    subtitle: "Trae todo por defecto",
    items: ["Campos sensibles.", "Columnas pesadas.", "Datos que la UI no usa.", "Cambios futuros inesperados."],
    accent: C.red,
    fill: C.paleRed,
  });
  addReadableColumn(slide, {
    x: 6.22, y: 2.22, w: 4.92, h: 4.34,
    title: "SELECT explícito",
    subtitle: "Declara exposición permitida",
    items: ["Solo columnas necesarias.", "Menos red y memoria.", "Contrato estable para backend.", "Menor fuga de información."],
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createExplicitColumnsCodeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Selección Explícita", "La consulta también es una frontera de seguridad", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 10.26, h: 3.52, title: "Perfil público de usuario",
    code: `SELECT nombre, apellido, correo_electronico, perfil_publico
FROM usuarios
WHERE id = 10
  AND eliminado_en IS NULL;`,
    lang: "sql",
    fontSize: 18,
  });
  addCenterStatement(slide, SH, "Lo que no sale: `password_hash`, `token_reset`, flags internos ni columnas de auditoría.", {
    x: 0.88, y: 5.86, w: 10.26, h: 0.62,
    fill: C.paleRed, color: C.red, fontSize: 15, bold: true,
  });
  validateSlide(slide, pptx);
}

function createWhereOperatorsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "WHERE Como Motor de Reglas", "Filtrar no es accesorio: define el caso de negocio", "Bloque 3");
  const ops = [
    { title: "BETWEEN", body: "Rangos de fechas, precios o montos.", code: "precio BETWEEN 100 AND 500", accent: C.navy },
    { title: "IN", body: "Conjunto acotado de estados válidos.", code: "estado IN ('activo','pendiente')", accent: C.gold },
    { title: "LIKE", body: "Patrones de texto con comodines.", code: "email LIKE '%@aiep.cl'", accent: C.red },
  ];
  ops.forEach((op, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.46, y: 2.18, w: 3.18, h: 4.26,
      title: op.title,
      body: `${op.body}\n\n${op.code}`,
      accent: op.accent,
      fill: C.white,
      line: op.accent,
      titleFontSize: 18,
      bodyFontSize: 11.3,
    });
  });
  validateSlide(slide, pptx);
}

function createNullLogicSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Lógica del NULL", "NULL no es un valor: es ausencia de valor", "Bloque 3");
  addReadableColumn(slide, {
    x: 0.88, y: 2.22, w: 4.92, h: 4.34,
    title: "Incorrecto",
    subtitle: "Comparación imposible",
    items: ["WHERE eliminado_en = NULL", "No significa 'sin fecha'.", "Suele retornar vacío.", "Oculta errores de lógica."],
    accent: C.red,
    fill: C.paleRed,
  });
  addReadableColumn(slide, {
    x: 6.22, y: 2.22, w: 4.92, h: 4.34,
    title: "Correcto",
    subtitle: "Pregunta por ausencia",
    items: ["WHERE eliminado_en IS NULL", "Filtra registros vivos.", "Calza con Soft Delete.", "Expresa intención real."],
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createAndOrPrecedenceSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "AND, OR y Paréntesis", "Una consulta puede compilar y aun así estar lógicamente mal", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 10.26, h: 3.28, title: "Productos visibles en oferta",
    code: `SELECT nombre, precio
FROM productos
WHERE (categoria = 'Tecnologia' OR categoria = 'Hogar')
  AND stock > 0
  AND precio_oferta IS NOT NULL;`,
    lang: "sql",
    fontSize: 17,
  });
  [
    { title: "Agrupar", body: "Lo alternativo va entre paréntesis.", accent: C.navy },
    { title: "Exigir", body: "Stock y oferta aplican a todo.", accent: C.red },
    { title: "Evitar ruido", body: "No mostrar productos inválidos.", accent: C.gold },
  ].forEach((item, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.46, y: 5.58, w: 3.18, h: 1.08,
      title: item.title,
      body: item.body,
      accent: item.accent,
      fill: C.white,
      line: item.accent,
      titleFontSize: 13,
      bodyFontSize: 9.6,
    });
  });
  validateSlide(slide, pptx);
}

function createOrderLimitSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "ORDER BY + LIMIT", "La base prepara datos para una interfaz usable", "Bloque 3");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 5.98, h: 4.48, title: "Paginación simple",
    code: `SELECT id, nombre, precio
FROM productos
WHERE publicado = TRUE
ORDER BY creado_en DESC
LIMIT 20;`,
    lang: "sql",
    fontSize: 17,
  });
  addCard(slide, SH, {
    x: 7.16, y: 2.08, w: 3.98, h: 1.24,
    title: "UX",
    body: "El usuario ve resultados ordenados, recientes y manejables.",
    accent: C.navy, fill: C.softBlue, line: C.navy,
    titleFontSize: 14.5, bodyFontSize: 10.8,
  });
  addCard(slide, SH, {
    x: 7.16, y: 3.68, w: 3.98, h: 1.24,
    title: "Rendimiento",
    body: "Evita transferir miles de registros que nadie puede leer.",
    accent: C.gold, fill: C.warningSoft, line: C.gold,
    titleFontSize: 14.5, bodyFontSize: 10.8,
  });
  addCard(slide, SH, {
    x: 7.16, y: 5.28, w: 3.98, h: 1.24,
    title: "Seguridad",
    body: "Reduce riesgo de DoS por consultas enormes desde la API.",
    accent: C.red, fill: C.paleRed, line: C.red,
    titleFontSize: 14.5, bodyFontSize: 10.8,
  });
  validateSlide(slide, pptx);
}

function createDataLeakageSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Eje Cyber: Data Leakage", "Una consulta amplia puede filtrar más que un bug visual", "Cyber");
  addReadableColumn(slide, {
    x: 0.88, y: 2.22, w: 4.92, h: 4.34,
    title: "Fuga accidental",
    subtitle: "La API devuelve más de lo necesario",
    items: ["password_hash.", "tokens de recuperación.", "flags internos.", "datos de usuarios eliminados."],
    accent: C.red,
    fill: C.paleRed,
  });
  addReadableColumn(slide, {
    x: 6.22, y: 2.22, w: 4.92, h: 4.34,
    title: "Exposición mínima",
    subtitle: "La consulta actúa como filtro",
    items: ["Columnas explícitas.", "WHERE por permisos.", "Soft delete aplicado.", "LIMIT para volumen."],
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createSqlErrorLeakSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Errores SQL También Filtran", "Un mensaje técnico mal expuesto revela estructura interna", "Cyber");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 5.86, h: 4.44, title: "Error que no debería ver el cliente",
    code: `SQLSTATE[42S22]:
Unknown column 'token_reset'
in 'field list'

Table: usuarios
Engine: MySQL 8.0`,
    lang: "text",
    fontSize: 16,
  });
  addChecklistGrid(slide, SH, {
    x: 7.0, y: 2.08, w: 4.14, h: 4.44, title: "Respuesta segura",
    columns: 1,
    entries: [
      { badge: "UI", title: "Mensaje genérico", body: "No revelar tabla ni columna.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "LOG", title: "Detalle en logs", body: "Guardar error para diagnóstico.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "ID", title: "Código de incidente", body: "Permite rastreo sin exponer internals.", accent: C.red, fill: C.white, badgeFill: C.red },
    ],
  });
  validateSlide(slide, pptx);
}

function createAiQueryAuditSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Huella IA: Auditar SELECT", "El agente traduce intención; tú controlas exposición y rendimiento", "IA");
  addReadableColumn(slide, {
    x: 0.88, y: 2.22, w: 4.92, h: 4.34,
    title: "Riesgo del agente",
    subtitle: "Consulta que parece útil",
    items: ["Usa SELECT *.", "Olvida Soft Delete.", "No limita volumen.", "Filtra por columnas sin índice."],
    accent: C.red,
    fill: C.paleRed,
  });
  addReadableColumn(slide, {
    x: 6.22, y: 2.22, w: 4.92, h: 4.34,
    title: "Revisión humana",
    subtitle: "Checklist mínimo",
    items: ["Columnas explícitas.", "WHERE correcto.", "ORDER + LIMIT.", "Índices alineados al filtro."],
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createDqlIndexAwarenessSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Consulta Correcta ≠ Consulta Eficiente", "El WHERE debería conversar con los índices", "Bloque 3");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 6.1, h: 4.48, title: "Filtro frecuente",
    code: `SELECT token_uuid, ultima_actividad
FROM sesiones_seguras
WHERE usuario_id = 101
  AND es_valida = TRUE
ORDER BY ultima_actividad DESC
LIMIT 5;`,
    lang: "sql",
    fontSize: 15.5,
  });
  addCard(slide, SH, {
    x: 7.28, y: 2.08, w: 3.86, h: 1.3,
    title: "Con índice",
    body: "La base encuentra filas por una ruta optimizada.",
    accent: C.navy, fill: C.softBlue, line: C.navy,
    titleFontSize: 14, bodyFontSize: 10.8,
  });
  addCard(slide, SH, {
    x: 7.28, y: 3.72, w: 3.86, h: 1.3,
    title: "Sin índice",
    body: "La base puede revisar muchas filas para responder.",
    accent: C.red, fill: C.paleRed, line: C.red,
    titleFontSize: 14, bodyFontSize: 10.8,
  });
  addCard(slide, SH, {
    x: 7.28, y: 5.36, w: 3.86, h: 1.3,
    title: "Criterio",
    body: "Filtros frecuentes merecen diseño, no improvisación.",
    accent: C.gold, fill: C.warningSoft, line: C.gold,
    titleFontSize: 14, bodyFontSize: 10.8,
  });
  validateSlide(slide, pptx);
}

function createBlock3SynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 3", "DQL debe traer lo necesario, no todo lo disponible", "Bloque 3");
  addCenterStatement(slide, SH, "Consultar bien es proteger rendimiento, privacidad y claridad de la aplicación.", {
    x: 0.88, y: 2.08, w: 10.26, h: 1.22,
    fill: C.navy, color: C.white, fontSize: 21, bold: true, rectRadius: 0.07,
  });
  const points = [
    { title: "Columnas", body: "Explícitas y justificadas.", accent: C.navy },
    { title: "Filtros", body: "WHERE con lógica correcta.", accent: C.red },
    { title: "Volumen", body: "ORDER BY y LIMIT para UI.", accent: C.gold },
    { title: "Cyber", body: "Evitar fugas por datos o errores.", accent: C.navy },
  ];
  points.forEach((point, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 4.02, w: 2.4, h: 2.24,
      title: point.title,
      body: point.body,
      accent: point.accent,
      fill: C.white,
      line: C.border,
      titleFontSize: 14,
      bodyFontSize: 9.8,
    });
  });
  validateSlide(slide, pptx);
}

function createBlock3FollowUpQuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas de Seguimiento", "Bloque 3 · DQL y exposición mínima", "Bloque 3");
  addFollowUpQuestion(slide, {
    x: 0.88, y: 2.08, w: 10.26, h: 1.24,
    badge: "01",
    question: "Si una API usa `SELECT *` para devolver perfiles públicos, ¿qué campos revisarías primero por riesgo de fuga?",
    hint: "busca secretos, hashes, tokens, flags internos y datos de auditoría.",
    accent: C.red,
    fill: C.paleRed,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 3.58, w: 10.26, h: 1.24,
    badge: "02",
    question: "¿Qué diferencia práctica hay entre `eliminado_en = NULL` y `eliminado_en IS NULL` en un sistema con Soft Delete?",
    hint: "recuerda que NULL representa ausencia y no se compara como un valor normal.",
    accent: C.navy,
    fill: C.softBlue,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 5.08, w: 10.26, h: 1.24,
    badge: "03",
    question: "Cuando una IA genera una consulta DQL, ¿qué tres elementos revisarías antes de usarla en una API real?",
    hint: "parte por columnas explícitas, filtro correcto y control de volumen.",
    accent: C.gold,
    fill: C.warningSoft,
  });
  validateSlide(slide, pptx);
}

function createBlock4IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 4", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("Integración CRUD", {
    x: 0.88, y: 2.14, w: 9.2, h: 0.66,
    fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("De la acción del usuario a la persistencia controlada.", {
    x: 0.88, y: 2.9, w: 8.8, h: 0.38,
    fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  addCenterStatement(slide, SH, "Objetivo del bloque: mapear acciones web hacia SQL con criterio de seguridad, privilegios mínimos y validación humana.", {
    x: 0.88, y: 5.72, w: 10.26, h: 0.82, fill: C.gold, fontSize: 18, color: C.navy, bold: true,
  });
  validateSlide(slide, pptx);
}

function createCrudBridgeStatementSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "CRUD Es El Puente", "La aplicación web traduce intención humana en operaciones SQL", "Bloque 4");
  addCenterStatement(slide, SH, "Cada botón, formulario o pantalla termina convirtiéndose en una operación sobre datos. El trabajo profesional consiste en controlar esa traducción.", {
    x: 0.88, y: 2.08, w: 10.26, h: 1.32,
    fill: C.navy, color: C.white, fontSize: 20, bold: true, rectRadius: 0.07,
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 3.86, w: 10.26, h: 2.72, title: "La pregunta correcta",
    columns: 3,
    entries: [
      { badge: "UI", title: "Intención", body: "¿Qué quiso hacer el usuario?", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "API", title: "Regla", body: "¿Qué valida la aplicación?", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "SQL", title: "Persistencia", body: "¿Qué cambia en la base?", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ],
  });
  validateSlide(slide, pptx);
}

function createCrudMatrixSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Matriz CRUD", "Acción de interfaz, verbo HTTP, operación SQL y riesgo", "Bloque 4");
  const rows = [
    { ui: "Registrar", http: "POST", sql: "INSERT", risk: "Duplicados o datos incompletos", accent: C.navy },
    { ui: "Listar", http: "GET", sql: "SELECT", risk: "Exposición excesiva", accent: C.gold },
    { ui: "Editar", http: "PATCH", sql: "UPDATE", risk: "Cambio masivo sin WHERE", accent: C.red },
    { ui: "Eliminar", http: "DELETE", sql: "UPDATE / DELETE", risk: "Pérdida de trazabilidad", accent: C.red },
  ];
  slide.addShape(SH.roundRect, { x: 0.88, y: 2.04, w: 10.26, h: 4.74, rectRadius: 0.05, fill: { color: C.white }, line: { color: C.border } });
  ["Acción UI", "HTTP", "SQL", "Riesgo técnico"].forEach((head, i) => {
    const x = [1.12, 3.32, 5.0, 7.1][i];
    const w = [1.8, 1.2, 1.5, 3.44][i];
    slide.addText(head, { x, y: 2.24, w, h: 0.26, fontFace: TYPOGRAPHY.display, fontSize: 13, bold: true, color: C.navy, margin: 0 });
  });
  rows.forEach((row, i) => {
    const y = 2.88 + i * 0.86;
    slide.addShape(SH.rect, { x: 0.88, y, w: 0.12, h: 0.52, fill: { color: row.accent }, line: { color: row.accent } });
    slide.addText(row.ui, { x: 1.12, y: y + 0.12, w: 1.8, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 12.2, bold: true, color: C.ink, margin: 0 });
    slide.addText(row.http, { x: 3.32, y: y + 0.12, w: 1.2, h: 0.22, fontFace: TYPOGRAPHY.mono, fontSize: 12, bold: true, color: row.accent, margin: 0 });
    slide.addText(row.sql, { x: 5.0, y: y + 0.12, w: 1.78, h: 0.22, fontFace: TYPOGRAPHY.mono, fontSize: 12, bold: true, color: C.navy, margin: 0 });
    slide.addText(row.risk, { x: 7.1, y: y + 0.12, w: 3.5, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 11.6, color: C.slate, margin: 0 });
    slide.addShape(SH.line, { x: 1.1, y: y + 0.66, w: 9.68, h: 0, line: { color: C.border, pt: 0.7 } });
  });
  validateSlide(slide, pptx);
}

function createCreateFlowSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "CREATE: Formulario a INSERT", "Crear no es solo guardar: es validar una nueva entidad", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 6.14, h: 4.48, title: "Registro de compra",
    code: `INSERT INTO compras (
  usuario_id, total, estado, creado_en
) VALUES (
  101, 49990.00, 'pendiente', NOW()
);`,
    lang: "sql",
    fontSize: 14.8,
  });
  addChecklistGrid(slide, SH, {
    x: 7.3, y: 2.08, w: 3.84, h: 4.48, title: "Antes del INSERT",
    columns: 1,
    entries: [
      { badge: "REQ", title: "Requeridos", body: "Campos obligatorios completos.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "TIP", title: "Tipos", body: "Monto, estado y usuario válidos.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "NEG", title: "Negocio", body: "Regla de compra cumplida.", accent: C.red, fill: C.white, badgeFill: C.red },
    ],
  });
  validateSlide(slide, pptx);
}

function createReadFlowSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "READ: Listado a SELECT", "Leer bien significa mostrar lo justo", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 6.14, h: 4.48, title: "Listado paginado",
    code: `SELECT id, total, estado, creado_en
FROM compras
WHERE usuario_id = 101
  AND eliminado_en IS NULL
ORDER BY creado_en DESC
LIMIT 20;`,
    lang: "sql",
    fontSize: 15.8,
  });
  addReadableColumn(slide, {
    x: 7.3, y: 2.08, w: 3.84, h: 4.48,
    title: "Criterio",
    subtitle: "Lo visible en UI",
    items: ["Columnas explícitas.", "Filtro por usuario.", "Soft delete aplicado.", "Volumen limitado."],
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createUpdateFlowSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "UPDATE: Edición a Cambio Acotado", "Editar exige confirmar identidad y alcance", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 6.14, h: 4.48, title: "Cambiar estado",
    code: `UPDATE compras
SET estado = 'pagada'
WHERE id = 77
  AND usuario_id = 101
  AND estado = 'pendiente';`,
    lang: "sql",
    fontSize: 16.5,
  });
  addChecklistGrid(slide, SH, {
    x: 7.3, y: 2.08, w: 3.84, h: 4.48, title: "Defensas",
    columns: 1,
    entries: [
      { badge: "ID", title: "Clave", body: "Filtrar por id del recurso.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "OWN", title: "Dueño", body: "Filtrar por usuario autorizado.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "EST", title: "Estado", body: "Evitar transiciones inválidas.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ],
  });
  validateSlide(slide, pptx);
}

function createDeleteFlowSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "DELETE: Acción de UI a Soft Delete", "Eliminar en la interfaz no siempre debe destruir en base de datos", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 6.14, h: 4.48, title: "Borrado lógico",
    code: `UPDATE comentarios
SET eliminado_en = NOW()
WHERE id = 55
  AND usuario_id = 101
  AND eliminado_en IS NULL;`,
    lang: "sql",
    fontSize: 16.4,
  });
  addReadableColumn(slide, {
    x: 7.3, y: 2.08, w: 3.84, h: 4.48,
    title: "Por qué",
    subtitle: "Auditoría y recuperación",
    items: ["Conserva evidencia.", "Permite restaurar.", "Reduce daño por error.", "Facilita investigación."],
    accent: C.red,
    fill: C.paleRed,
  });
  validateSlide(slide, pptx);
}

function createFullDataFlowSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Flujo Completo de Datos", "Del clic a la respuesta HTTP", "Bloque 4");
  const steps = [
    { title: "Usuario", body: "Acción en interfaz", accent: C.navy },
    { title: "Frontend", body: "Formulario / request", accent: C.gold },
    { title: "Backend", body: "Regla y validación", accent: C.red },
    { title: "SQL", body: "Operación acotada", accent: C.navy },
    { title: "Respuesta", body: "Estado y datos seguros", accent: C.gold },
  ];
  steps.forEach((step, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.08, y: 2.62, w: 1.84, h: 2.18,
      title: step.title,
      body: step.body,
      accent: step.accent,
      fill: C.white,
      line: step.accent,
      titleFontSize: 13.2,
      bodyFontSize: 9.5,
    });
    if (i < steps.length - 1) {
      slide.addShape(SH.line, { x: 2.78 + i * 2.08, y: 3.7, w: 0.34, h: 0, line: { color: C.slate, pt: 1.4, beginArrowType: "none", endArrowType: "triangle" } });
    }
  });
  addCenterStatement(slide, SH, "Validar en una sola capa no basta: cada frontera debe reducir riesgo.", {
    x: 0.88, y: 5.58, w: 10.26, h: 0.74,
    fill: C.navy, color: C.white, fontSize: 18, bold: true,
  });
  validateSlide(slide, pptx);
}

function createLayerContractSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Contrato Entre Capas", "Cada capa valida algo distinto", "Bloque 4");
  addReadableColumn(slide, {
    x: 0.88, y: 2.22, w: 3.18, h: 4.34,
    title: "Frontend",
    subtitle: "Guía al usuario",
    items: ["Formato inicial.", "Campos requeridos.", "Feedback rápido.", "No es frontera final."],
    accent: C.gold,
    fill: C.warningSoft,
  });
  addReadableColumn(slide, {
    x: 4.5, y: 2.22, w: 3.18, h: 4.34,
    title: "Backend",
    subtitle: "Regla de negocio",
    items: ["Autorización.", "Estados válidos.", "Parámetros seguros.", "Errores controlados."],
    accent: C.red,
    fill: C.paleRed,
  });
  addReadableColumn(slide, {
    x: 8.02, y: 2.22, w: 3.12, h: 4.34,
    title: "Base de datos",
    subtitle: "Integridad final",
    items: ["Tipos.", "Constraints.", "Índices.", "Privilegios."],
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createLeastPrivilegeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Eje Cyber: Menor Privilegio", "La aplicación no debe conectarse como root", "Cyber");
  addReadableColumn(slide, {
    x: 0.88, y: 2.22, w: 4.92, h: 4.34,
    title: "root / admin",
    subtitle: "Poder excesivo",
    items: ["Puede borrar tablas.", "Puede alterar esquema.", "Amplifica SQL injection.", "No debe usarse desde backend web."],
    accent: C.red,
    fill: C.paleRed,
  });
  addReadableColumn(slide, {
    x: 6.22, y: 2.22, w: 4.92, h: 4.34,
    title: "web_app",
    subtitle: "Permisos acotados",
    items: ["SELECT controlado.", "INSERT donde corresponde.", "UPDATE limitado.", "Sin DROP ni TRUNCATE."],
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createPermissionProfilesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Perfiles de Permisos", "No todas las pantallas necesitan el mismo poder", "Cyber");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.1, w: 10.26, h: 4.58, title: "Diseñar permisos por contexto",
    columns: 3,
    entries: [
      { badge: "READ", title: "Panel estadístico", body: "Solo `SELECT` sobre vistas o consultas acotadas.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "OPS", title: "Panel operativo", body: "`SELECT`, `INSERT` y `UPDATE` sobre tablas específicas.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "JOB", title: "Proceso interno", body: "Permisos ampliados, aislados y auditados.", accent: C.red, fill: C.white, badgeFill: C.red },
    ],
  });
  validateSlide(slide, pptx);
}

function createAgenticSqlWorkflowSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Metodología Agentic Para SQL", "No delegar ejecución: delegar borrador y revisión guiada", "IA");
  const steps = [
    { title: "Contexto", body: "DDL, objetivo y restricciones.", accent: C.navy },
    { title: "Intención", body: "Qué consulta se necesita.", accent: C.gold },
    { title: "Inspección", body: "Leer SELECT, WHERE, LIMIT.", accent: C.red },
    { title: "Prueba", body: "Ejecutar en desarrollo.", accent: C.navy },
  ];
  steps.forEach((step, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 2.34, w: 2.4, h: 2.32,
      title: step.title,
      body: step.body,
      accent: step.accent,
      fill: C.white,
      line: step.accent,
      titleFontSize: 14,
      bodyFontSize: 10,
    });
  });
  addCenterStatement(slide, SH, "El agente puede acelerar el borrador; la decisión de ejecutar sigue siendo humana.", {
    x: 0.88, y: 5.42, w: 10.26, h: 0.82,
    fill: C.navy, color: C.white, fontSize: 18, bold: true,
  });
  validateSlide(slide, pptx);
}

function createAgentMissingWhereSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Caso Crítico: Falta el WHERE", "Un agente también puede producir SQL peligroso", "Cyber");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 6.14, h: 3.12, title: "Respuesta peligrosa",
    code: `UPDATE usuarios
SET estado = 'inactivo';`,
    lang: "sql",
    fontSize: 22,
  });
  addCard(slide, SH, {
    x: 7.3, y: 2.08, w: 3.84, h: 3.12,
    title: "Diagnóstico",
    body: "La consulta compila, pero cambia todos los usuarios. El problema no es sintaxis: es alcance.",
    accent: C.red, fill: C.paleRed, line: C.red,
    titleFontSize: 16, bodyFontSize: 12.2,
  });
  addCenterStatement(slide, SH, "Saber ver el error antes de ejecutar es parte central del oficio.", {
    x: 0.88, y: 5.72, w: 10.26, h: 0.74,
    fill: C.gold, color: C.navy, fontSize: 18, bold: true,
  });
  validateSlide(slide, pptx);
}

function createHumanSqlChecklistSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Checklist Humano Antes de Ejecutar", "Especialmente si el SQL fue generado por IA", "Bloque 4");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.08, w: 10.26, h: 4.58, title: "Control mínimo",
    columns: 3,
    entries: [
      { badge: "DDL", title: "Calza con esquema", body: "Columnas, tipos y constraints existen.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "WHERE", title: "Alcance acotado", body: "Filtros precisos antes de UPDATE/DELETE.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "DATA", title: "No expone secretos", body: "SELECT explícito y sin campos sensibles.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "VOL", title: "Controla volumen", body: "LIMIT o paginación cuando corresponde.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "PERM", title: "Permiso correcto", body: "Usuario de BD con privilegio mínimo.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "TEST", title: "Prueba primero", body: "Entorno de desarrollo antes de producción.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ],
  });
  validateSlide(slide, pptx);
}

function createBlock4SynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 4", "CRUD une web, backend y persistencia", "Bloque 4");
  addCenterStatement(slide, SH, "CRUD no es una lista de comandos: es el contrato operativo entre usuario, aplicación y base de datos.", {
    x: 0.88, y: 2.08, w: 10.26, h: 1.22,
    fill: C.navy, color: C.white, fontSize: 20, bold: true, rectRadius: 0.07,
  });
  const points = [
    { title: "CREATE", body: "Insertar datos válidos.", accent: C.navy },
    { title: "READ", body: "Consultar lo necesario.", accent: C.gold },
    { title: "UPDATE", body: "Modificar con alcance.", accent: C.red },
    { title: "DELETE", body: "Eliminar con trazabilidad.", accent: C.navy },
  ];
  points.forEach((point, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 4.02, w: 2.4, h: 2.24,
      title: point.title,
      body: point.body,
      accent: point.accent,
      fill: C.white,
      line: C.border,
      titleFontSize: 14,
      bodyFontSize: 9.8,
    });
  });
  validateSlide(slide, pptx);
}

function createBlock4FollowUpQuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas de Seguimiento", "Bloque 4 · CRUD, privilegios y agentes", "Bloque 4");
  addFollowUpQuestion(slide, {
    x: 0.88, y: 2.08, w: 10.26, h: 1.24,
    badge: "01",
    question: "Si una pantalla solo muestra estadísticas, ¿por qué su usuario de base de datos no debería tener permisos de `UPDATE`?",
    hint: "relaciona privilegio mínimo con reducción de daño ante una vulnerabilidad.",
    accent: C.navy,
    fill: C.softBlue,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 3.58, w: 10.26, h: 1.24,
    badge: "02",
    question: "En una ruta `PATCH /compras/:id`, ¿qué condiciones deberían aparecer en el `WHERE` además del `id`?",
    hint: "piensa en dueño del recurso, estado actual y alcance autorizado.",
    accent: C.red,
    fill: C.paleRed,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 5.08, w: 10.26, h: 1.24,
    badge: "03",
    question: "¿Qué parte del flujo SQL puede apoyar un agente y qué parte no deberías delegar nunca sin revisar?",
    hint: "separa borrador, explicación y checklist de la decisión de ejecutar.",
    accent: C.gold,
    fill: C.warningSoft,
  });
  validateSlide(slide, pptx);
}

function createFinalSynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis Final", "De estructura a aplicación web", "Cierre");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.08, w: 10.26, h: 4.58, title: "Lo que construimos hoy",
    columns: 4,
    entries: [
      { badge: "DDL", title: "Estructura", body: "Tablas, tipos y restricciones.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "DML", title: "Cambios", body: "Insertar, actualizar y borrar.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "DQL", title: "Lectura", body: "Consultar con precisión.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "CRUD", title: "Web", body: "Mapear acciones a SQL.", accent: C.navy, fill: C.white, badgeFill: C.navy },
    ],
  });
  validateSlide(slide, pptx);
}

function createFinalMentalMapSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Mapa Mental SQL", "Una secuencia para razonar sistemas", "Cierre");
  const steps = [
    { title: "Estructurar", body: "¿Qué forma deben tener los datos?", accent: C.navy },
    { title: "Modificar", body: "¿Qué operación cambia la verdad?", accent: C.red },
    { title: "Consultar", body: "¿Qué información debería salir?", accent: C.gold },
    { title: "Integrar", body: "¿Qué acción web dispara el flujo?", accent: C.navy },
  ];
  steps.forEach((step, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 2.8, w: 2.4, h: 2.58,
      title: step.title,
      body: step.body,
      accent: step.accent,
      fill: C.white,
      line: step.accent,
      titleFontSize: 14,
      bodyFontSize: 10.2,
    });
  });
  addCenterStatement(slide, SH, "La base de datos no es un accesorio del backend: es parte central del contrato de la aplicación.", {
    x: 0.88, y: 5.88, w: 10.26, h: 0.64,
    fill: C.navy, color: C.white, fontSize: 16, bold: true,
  });
  validateSlide(slide, pptx);
}

function createSecurityThreadSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Seguridad Transversal", "La seguridad apareció en cada sublenguaje", "Cierre");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.08, w: 10.26, h: 4.58, title: "Defensas acumuladas",
    columns: 3,
    entries: [
      { badge: "TIP", title: "Tipos estrictos", body: "DDL rechaza formas inválidas.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "WHR", title: "WHERE obligatorio", body: "DML controla alcance.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "SEL", title: "SELECT explícito", body: "DQL reduce exposición.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "SOFT", title: "Soft delete", body: "Mantiene trazabilidad.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "PERM", title: "Menor privilegio", body: "Limita daño potencial.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "ERR", title: "Errores seguros", body: "No filtrar estructura interna.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ],
  });
  validateSlide(slide, pptx);
}

function createTomorrowBridgeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Próximo Paso", "Mañana: seguridad aplicada", "Cierre");
  addCenterStatement(slide, SH, "Mañana tomaremos estas operaciones SQL y las blindaremos desde la aplicación: validación de entradas, autenticación básica, manejo de errores e inyección SQL.", {
    x: 0.88, y: 2.08, w: 10.26, h: 1.42,
    fill: C.navy, color: C.white, fontSize: 21, bold: true, rectRadius: 0.07,
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 4.0, w: 10.26, h: 2.5, title: "Conexión directa con esta clase",
    columns: 3,
    entries: [
      { badge: "IN", title: "Entradas", body: "No confiar en datos del usuario.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "AUTH", title: "Autenticación", body: "Saber quién ejecuta la acción.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "ERR", title: "Errores", body: "Responder sin filtrar internals.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ],
  });
  validateSlide(slide, pptx);
}

function createFinalExitQuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas de Salida", "Cierre general de la clase", "Cierre");
  addFollowUpQuestion(slide, {
    x: 0.88, y: 2.04, w: 10.26, h: 1.24,
    badge: "01",
    question: "¿Qué diferencia práctica hay entre diseñar una tabla y poblarla con registros?",
    hint: "separa DDL de DML: estructura versus contenido.",
    accent: C.navy,
    fill: C.softBlue,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 3.34, w: 10.26, h: 1.24,
    badge: "02",
    question: "¿Cuál es el riesgo técnico más grave de ejecutar `UPDATE` o `DELETE` sin filtro?",
    hint: "piensa en alcance masivo y corrupción de datos.",
    accent: C.red,
    fill: C.paleRed,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 4.64, w: 10.26, h: 1.24,
    badge: "03",
    question: "¿Por qué `SELECT *` es una mala práctica en código de producción?",
    hint: "relaciona rendimiento, mantenibilidad y fuga de datos.",
    accent: C.gold,
    fill: C.warningSoft,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 5.94, w: 10.26, h: 1.24,
    badge: "04",
    question: "¿Qué validación harías antes de ejecutar SQL sugerido por un agente?",
    hint: "revisa esquema, alcance, datos sensibles y entorno de prueba.",
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createFinalClosingSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.gold);
  slide.addText("SQL inicial:\ncriterio antes de ejecución", {
    x: 0.88, y: 2.02, w: 9.2, h: 1.34,
    fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("La base de datos conserva decisiones. Por eso cada comando debe ser leído, entendido y validado antes de ejecutarse.", {
    x: 0.88, y: 3.62, w: 8.4, h: 0.76,
    fontFace: TYPOGRAPHY.body, fontSize: 15.4, color: "DCE6F2",
  });
  addCenterStatement(slide, SH, "Próxima clase: Seguridad aplicada e inyección SQL", {
    x: 0.88, y: 5.72, w: 10.26, h: 0.82, fill: C.gold, fontSize: 22, color: C.navy, bold: true,
  });
  validateSlide(slide, pptx);
}

function main() {
  createCoverSlide();
  createWeekContextSlide();
  createFromApiToDataSlide();
  createObjectivesSlide();
  createLearningMapSlide();
  createSqlAsContractSlide();

  createBlock1IntroSlide();
  createRelationalModelSlide();
  createTableContractSlide();
  createDdlAnatomySlide();
  createDdlAnnotationSlide();
  createDataTypesSlide();
  createConstraintsSlide();
  createHardeningSlide();
  createAlterDropSlide();
  createAiVarcharTrapSlide();
  createBlock1SynthesisSlide();
  createBlock1FollowUpQuestionsSlide();

  createBlock2IntroSlide();
  createDmlTruthSlide();
  createDmlCommandMapSlide();
  createInsertExplicitSlide();
  createInsertPositionalVsExplicitSlide();
  createBulkInsertSlide();
  createUpdateWhereWarningSlide();
  createSafeUpdateWorkflowSlide();
  createDeleteVsTruncateSlide();
  createSoftDeleteSlide();
  createDmlInjectionSlide();
  createAiSyntheticDataSlide();
  createBlock2SynthesisSlide();
  createBlock2FollowUpQuestionsSlide();

  createBlock3IntroSlide();
  createDqlIntentSlide();
  createSelectAnatomySlide();
  createSelectStarAntiPatternSlide();
  createExplicitColumnsCodeSlide();
  createWhereOperatorsSlide();
  createNullLogicSlide();
  createAndOrPrecedenceSlide();
  createOrderLimitSlide();
  createDataLeakageSlide();
  createSqlErrorLeakSlide();
  createAiQueryAuditSlide();
  createDqlIndexAwarenessSlide();
  createBlock3SynthesisSlide();
  createBlock3FollowUpQuestionsSlide();

  createBlock4IntroSlide();
  createCrudBridgeStatementSlide();
  createCrudMatrixSlide();
  createCreateFlowSlide();
  createReadFlowSlide();
  createUpdateFlowSlide();
  createDeleteFlowSlide();
  createFullDataFlowSlide();
  createLayerContractSlide();
  createLeastPrivilegeSlide();
  createPermissionProfilesSlide();
  createAgenticSqlWorkflowSlide();
  createAgentMissingWhereSlide();
  createHumanSqlChecklistSlide();
  createBlock4SynthesisSlide();
  createBlock4FollowUpQuestionsSlide();

  createFinalSynthesisSlide();
  createFinalMentalMapSlide();
  createSecurityThreadSlide();
  createTomorrowBridgeSlide();
  createFinalExitQuestionsSlide();
  createFinalClosingSlide();

  pptx
    .writeFile({ fileName: outputPptx })
    .then(() => {
      console.log(`PPTX final generado: ${outputPptx}`);
    })
    .catch((err) => {
      console.error("Error generando PPTX:", err);
      process.exit(1);
    });
}

main();
