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
} = components;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";

applyAiepTheme(pptx, {
  author: "Diego Obando",
  company: "AIEP",
  subject: "Clase 21",
  title: "Seguridad aplicada: validación, autenticación y manejo de errores",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx = path.join(rootDir, "Clase-21-Seguridad-Aplicada.pptx");

const logoPath = path.resolve(__dirname, "../../../../../.agent/skills/slides-aiep/assets/logo-aiep.png");
const logoMarkPath = path.resolve(__dirname, "../../../../../.agent/skills/slides-aiep/assets/logo-aiep-mark.png");

function addHeader(slide, title, subtitle, blockLabel = "Contexto", pptxLike = pptx) {
  systemAddHeader(slide, SH, pptxLike, title, subtitle, blockLabel, {
    classLabel: `Clase 21 · ${blockLabel}`,
    logoMarkPath,
    titleY: 0.94,
    titleH: 0.66,
    subtitleY: 1.68,
    subtitleH: 0.24,
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
    fontFace: TYPOGRAPHY.display, fontSize: opts.titleFontSize ?? 19, bold: true, color: C.navy,
    margin: 0,
  });
  slide.addText(opts.subtitle, {
    x: opts.x + 0.34, y: opts.y + 0.72, w: opts.w - 0.58, h: 0.34,
    fontFace: TYPOGRAPHY.body, fontSize: 12.2, bold: true, color: opts.accent,
    margin: 0,
  });
  opts.items.forEach((item, i) => {
    const y = opts.y + 1.28 + i * (opts.itemGap ?? 0.72);
    slide.addShape(SH.roundRect, {
      x: opts.x + 0.34, y, w: opts.w - 0.68, h: opts.itemH ?? 0.48,
      rectRadius: 0.03,
      fill: { color: C.white },
      line: { color: C.border, pt: 0.7 },
    });
    slide.addText(item, {
      x: opts.x + 0.52, y: y + 0.11, w: opts.w - 1.04, h: 0.26,
      fontFace: TYPOGRAPHY.body, fontSize: opts.itemFontSize ?? 11.2, color: C.ink,
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
    x: opts.x + 0.32, y: opts.y + 0.24, w: 0.48, h: 0.28,
    fontFace: TYPOGRAPHY.display, fontSize: 13, bold: true, color: opts.accent,
    margin: 0,
  });
  slide.addText(opts.question, {
    x: opts.x + 0.86, y: opts.y + 0.18, w: opts.w - 1.18, h: 0.66,
    fontFace: TYPOGRAPHY.display, fontSize: 13.6, bold: true, color: C.navy,
    margin: 0,
    fit: "shrink",
  });
  slide.addText(`Pista: ${opts.hint}`, {
    x: opts.x + 0.86, y: opts.y + 0.96, w: opts.w - 1.18, h: 0.34,
    fontFace: TYPOGRAPHY.body, fontSize: 10.6, color: C.slate,
    margin: 0,
    fit: "shrink",
  });
}

function createCoverSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  slide.addImage({ path: logoPath, x: 0.88, y: 0.62, w: 1.2, h: 0.42 });
  addBarsMotif(slide, 0.88, 1.82, 1.4, C.red);
  slide.addText("Seguridad aplicada:\nvalidar, autenticar y fallar bien", {
    x: 0.88, y: 2.72, w: 10.5, h: 1.68,
    fontFace: TYPOGRAPHY.display, fontSize: 41, bold: true, color: C.white, margin: 0,
  });
  slide.addText("Semana 07 · Clase 21: de un CRUD funcional a un CRUD defendible.", {
    x: 0.88, y: 4.72, w: 10.26, h: 0.34,
    fontFace: TYPOGRAPHY.body, fontSize: 17.6, color: C.gold, bold: true,
  });
  validateSlide(slide, pptx);
}

function createWeekRouteSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Ruta de la Semana 07", "Evaluación, persistencia y seguridad aplicada", "Contexto");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.16, w: 10.26, h: 4.62, title: "Secuencia técnica",
    columns: 3,
    entries: [
      { badge: "LUN", title: "Evaluación Parcial 2", body: "Aplicación conectada a API o servicio legado.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "MAR", title: "SQL inicial", body: "DDL, DML, DQL y CRUD sobre datos persistentes.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "MIÉ", title: "Seguridad aplicada", body: "Validación, autenticación, errores y límites de ejecución.", accent: C.gold, fill: C.warningSoft, badgeFill: C.gold },
    ],
  });
  validateSlide(slide, pptx);
}

function createWorksButUnsafeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Funcionar No Es Estar Seguro", "Una demo exitosa puede esconder riesgos críticos", "Contexto");
  addCenterStatement(slide, SH, "El caso feliz demuestra que algo responde; la seguridad demuestra que resiste entradas incorrectas, permisos débiles y fallos reales.", {
    x: 0.88, y: 2.08, w: 10.26, h: 1.28,
    fill: C.navy, color: C.white, fontSize: 22, bold: true, rectRadius: 0.07,
  });
  const risks = [
    { title: "Acepta basura", body: "Datos malformados pasan al backend.", accent: C.red },
    { title: "Confía en cliente", body: "El usuario decide id, rol o estado.", accent: C.gold },
    { title: "Filtra errores", body: "La respuesta revela SQL o estructura.", accent: C.red },
  ];
  risks.forEach((risk, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.46, y: 4.24, w: 3.18, h: 1.78,
      title: risk.title,
      body: risk.body,
      accent: risk.accent,
      fill: C.white,
      line: risk.accent,
      titleFontSize: 15.6,
      bodyFontSize: 11.2,
    });
  });
  validateSlide(slide, pptx);
}

function createAttackSurfaceSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Mapa de Superficie de Ataque", "Cada frontera puede reducir o amplificar el riesgo", "Mapa");
  const steps = [
    { title: "Formulario", body: "Entrada manipulable", accent: C.red },
    { title: "Backend", body: "Validación y permisos", accent: C.navy },
    { title: "SQL", body: "Parámetros y alcance", accent: C.gold },
    { title: "Sesión", body: "Identidad real", accent: C.navy },
    { title: "Errores", body: "No filtrar internals", accent: C.red },
  ];
  steps.forEach((step, i) => {
    addMiniCard(slide, SH, {
      x: 0.72 + i * 2.18, y: 2.58, w: 1.92, h: 2.28,
      title: step.title,
      body: step.body,
      accent: step.accent,
      fill: C.white,
      line: step.accent,
      titleFontSize: 13.2,
      bodyFontSize: 9.5,
    });
    if (i < steps.length - 1) {
      slide.addShape(SH.line, { x: 2.72 + i * 2.18, y: 3.72, w: 0.34, h: 0, line: { color: C.slate, pt: 1.3, endArrowType: "triangle" } });
    }
  });
  addCenterStatement(slide, SH, "La seguridad no vive en una sola capa: se acumula frontera por frontera.", {
    x: 0.88, y: 5.58, w: 10.26, h: 0.72,
    fill: C.navy, color: C.white, fontSize: 18, bold: true,
  });
  validateSlide(slide, pptx);
}

function createObjectivesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Objetivos de la Sesión", "Lo que deberíamos poder explicar y revisar al cerrar", "Objetivos");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.08, w: 10.26, h: 4.78, title: "Capacidades técnicas",
    columns: 2,
    entries: [
      { badge: "IN", title: "Validar entradas", body: "Distinguir UX de controles obligatorios de backend.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "SQL", title: "Detectar inyección", body: "Reconocer cuándo el dato modifica la instrucción.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "AUTH", title: "Separar identidad y permisos", body: "Autenticación no equivale a autorización.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "ERR", title: "Fallar sin filtrar", body: "Responder seguro y registrar lo necesario.", accent: C.navy, fill: C.white, badgeFill: C.navy },
    ],
  });
  validateSlide(slide, pptx);
}

function createDeckMapSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Mapa del Deck", "71 diapositivas para cerrar seguridad aplicada con criterio técnico", "Mapa");
  const blocks = [
    { title: "Intro", body: "Por qué seguridad entra justo después de SQL.", accent: C.navy },
    { title: "Bloque 1", body: "Entradas no confiables y validación real.", accent: C.red },
    { title: "Bloque 2", body: "Inyección SQL y consultas parametrizadas.", accent: C.gold },
    { title: "Bloque 3", body: "Autenticación, sesiones y permisos.", accent: C.navy },
    { title: "Bloque 4", body: "Errores seguros, logs y hardening.", accent: C.red },
    { title: "Cierre", body: "Checklist final y puente a SQL intermedio.", accent: C.gold },
  ];
  blocks.forEach((block, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + (i % 3) * 3.46, y: 2.16 + Math.floor(i / 3) * 2.08, w: 3.18, h: 1.52,
      title: block.title,
      body: block.body,
      accent: block.accent,
      fill: C.white,
      line: block.accent,
      titleFontSize: 14.2,
      bodyFontSize: 9.6,
    });
  });
  addCenterStatement(slide, SH, "Regla visual: ejemplos técnicos grandes, comparaciones legibles y sin actividades dentro del deck.", {
    x: 0.88, y: 6.12, w: 10.26, h: 0.46,
    fill: C.softBlue, color: C.navy, fontSize: 13.2, bold: true,
  });
  validateSlide(slide, pptx);
}

function createSqlBridgeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Puente Desde SQL Inicial", "La consulta correcta todavía puede ser peligrosa si el flujo no controla entradas", "Contexto");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.18, w: 5.62, h: 3.64, title: "Operación válida, frontera débil",
    code: `UPDATE compras
SET estado = 'pagado'
WHERE id = ?;`,
    lang: "sql",
    fontSize: 20,
  });
  addReadableColumn(slide, {
    x: 6.82, y: 2.18, w: 4.32, h: 3.64,
    title: "Lo que falta",
    subtitle: "Seguridad de flujo",
    items: ["¿Quién ejecuta?", "¿La compra es suya?", "¿El estado puede cambiar?", "¿Qué pasa si falla?"],
    accent: C.red,
    fill: C.paleRed,
    itemGap: 0.58,
    itemFontSize: 9.8,
  });
  addCenterStatement(slide, SH, "Hoy miramos el recorrido completo, no solo el SQL aislado.", {
    x: 0.88, y: 6.12, w: 10.26, h: 0.48,
    fill: C.navy, color: C.white, fontSize: 15.8, bold: true,
  });
  validateSlide(slide, pptx);
}

function createBlock1OpeningSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addBarsMotif(slide, 0.88, 1.72, 1.7, C.red);
  slide.addText("La entrada es la primera frontera", {
    x: 0.88, y: 2.74, w: 10.2, h: 0.62,
    fontFace: TYPOGRAPHY.display, fontSize: 34, bold: true, color: C.white, margin: 0,
  });
  slide.addText("Bloque 1 · Todo dato externo es no confiable hasta que el backend lo valida.", {
    x: 0.88, y: 3.58, w: 9.8, h: 0.34,
    fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.gold, bold: true, margin: 0,
  });
  addCenterStatement(slide, SH, "Objetivo del bloque: distinguir guía de interfaz, control de backend e integridad de base de datos.", {
    x: 0.88, y: 5.62, w: 10.26, h: 0.72,
    fill: C.gold, color: C.navy, fontSize: 17, bold: true,
  });
  validateSlide(slide, pptx);
}

function createEntryBoundarySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Toda Entrada Es Sospechosa", "No por paranoia: porque el cliente es modificable", "Bloque 1");
  addCenterStatement(slide, SH, "El backend no recibe verdad; recibe una afirmación que debe verificar.", {
    x: 0.88, y: 2.06, w: 10.26, h: 1.0,
    fill: C.navy, color: C.white, fontSize: 24, bold: true,
  });
  const sources = [
    { title: "Formulario", body: "Campos editables, ocultos o manipulados.", accent: C.red },
    { title: "URL", body: "IDs, filtros y parámetros alterables.", accent: C.gold },
    { title: "API", body: "JSON externo, scripts o clientes manuales.", accent: C.navy },
  ];
  sources.forEach((source, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.46, y: 4.04, w: 3.18, h: 1.76,
      title: source.title,
      body: source.body,
      accent: source.accent,
      fill: C.white,
      line: source.accent,
      titleFontSize: 15.2,
      bodyFontSize: 11,
    });
  });
  validateSlide(slide, pptx);
}

function createMalformedInputsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Datos Que Parecen Simples", "Cada campo puede romper una suposición del sistema", "Bloque 1");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.06, w: 10.26, h: 4.78, title: "Entradas problemáticas",
    columns: 3,
    entries: [
      { badge: "$", title: "Precio como texto", body: "`gratis`, `-1` o `NaN` en campo numérico.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "@", title: "Correo inválido", body: "Formato roto o demasiado largo.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "ID", title: "ID alterado", body: "Negativo, ajeno o inexistente.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "TXT", title: "Comentario gigante", body: "Payload de miles de caracteres.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "ROL", title: "Rol enviado", body: "El cliente intenta decidir permisos.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "STATE", title: "Estado forzado", body: "`pagado` o `admin` desde UI.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ],
  });
  validateSlide(slide, pptx);
}

function createValidationLayersSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Tres Capas, Tres Responsabilidades", "Validar dos veces no significa validar lo mismo", "Bloque 1");
  addReadableColumn(slide, {
    x: 0.88, y: 2.08, w: 3.18, h: 4.44,
    title: "Frontend",
    subtitle: "Guía de UX",
    items: ["Mensajes rápidos.", "Formato esperado.", "Evita errores simples.", "No es frontera final."],
    accent: C.gold,
    fill: C.warningSoft,
  });
  addReadableColumn(slide, {
    x: 4.5, y: 2.08, w: 3.18, h: 4.44,
    title: "Backend",
    subtitle: "Decisión de entrada",
    items: ["Valida aunque la UI falle.", "Aplica reglas.", "Controla permisos.", "Rechaza basura."],
    accent: C.red,
    fill: C.paleRed,
  });
  addReadableColumn(slide, {
    x: 8.02, y: 2.08, w: 3.12, h: 4.44,
    title: "Base de datos",
    subtitle: "Integridad final",
    items: ["Tipos estrictos.", "Constraints.", "Índices.", "No es única defensa."],
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createRequiredIsNotSecuritySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "`required` No Es Seguridad", "HTML ayuda a la interfaz; no controla clientes externos", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 4.86, h: 3.76, title: "Guía en frontend",
    code: `<input
  type="email"
  name="correo"
  required
  maxlength="120"
/>`,
    lang: "html",
    fontSize: 17,
  });
  addCodePanel(slide, SH, {
    x: 6.08, y: 2.08, w: 5.06, h: 3.76, title: "Petición manual",
    code: `curl -X POST /registro \\
  -H "Content-Type: application/json" \\
  -d '{"correo":"no-es-correo"}'`,
    lang: "bash",
    fontSize: 15.6,
  });
  addCenterStatement(slide, SH, "Si el backend no valida, cualquier cliente puede saltarse la intención del formulario.", {
    x: 0.88, y: 6.08, w: 10.26, h: 0.54,
    fill: C.red, color: C.white, fontSize: 15.6, bold: true,
  });
  validateSlide(slide, pptx);
}

function createValidationDimensionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Validar Es Revisar Dimensiones", "No basta con preguntar si viene vacío", "Bloque 1");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.04, w: 10.26, h: 4.82, title: "Control mínimo de entrada",
    columns: 4,
    entries: [
      { badge: "1", title: "Presencia", body: "El campo obligatorio existe.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "2", title: "Tipo", body: "Número, texto, fecha o booleano.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "3", title: "Formato", body: "Correo, RUT, UUID, código.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "4", title: "Longitud", body: "Ni vacío ni gigante.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "5", title: "Rango", body: "Montos y fechas razonables.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "6", title: "Dominio", body: "Valores permitidos.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "7", title: "Negocio", body: "La acción tiene sentido.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "8", title: "Permiso", body: "El usuario puede hacerlo.", accent: C.red, fill: C.white, badgeFill: C.red },
    ],
  });
  validateSlide(slide, pptx);
}

function createPurchaseValidationCodeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Validación Aplicada", "El backend decide si el payload entra al sistema", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 6.72, h: 4.58, title: "Validar compra",
    code: `function validarCompra(input) {
  const errores = [];

  if (!Number.isInteger(input.productoId)) {
    errores.push("Producto inválido.");
  }
  if (input.cantidad < 1 || input.cantidad > 20) {
    errores.push("Cantidad fuera de rango.");
  }
  return errores;
}`,
    lang: "js",
    fontSize: 13.5,
  });
  addReadableColumn(slide, {
    x: 7.9, y: 2.08, w: 3.24, h: 4.58,
    title: "Criterio",
    subtitle: "No solo sintaxis",
    items: ["Tipo correcto.", "Rango razonable.", "Regla de negocio.", "Rechazo explícito."],
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createNormalizeSanitizeValidateSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Normalizar ≠ Sanitizar ≠ Validar", "Tres acciones distintas, tres riesgos distintos", "Bloque 1");
  addReadableColumn(slide, {
    x: 0.88, y: 2.1, w: 3.18, h: 4.42,
    title: "Normalizar",
    subtitle: "Forma consistente",
    items: ["Trim.", "Minúsculas.", "Formato común.", "No decide aceptación."],
    accent: C.gold,
    fill: C.warningSoft,
  });
  addReadableColumn(slide, {
    x: 4.5, y: 2.1, w: 3.18, h: 4.42,
    title: "Sanitizar",
    subtitle: "Contexto de salida",
    items: ["Escapar HTML.", "Evitar logs con secretos.", "Depende del destino.", "No reemplaza parámetros."],
    accent: C.red,
    fill: C.paleRed,
    itemFontSize: 10.6,
  });
  addReadableColumn(slide, {
    x: 8.02, y: 2.1, w: 3.12, h: 4.42,
    title: "Validar",
    subtitle: "Aceptar o rechazar",
    items: ["Tipo.", "Rango.", "Formato.", "Regla de negocio."],
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createClientPowerSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "No Confíes en Campos del Cliente", "Un campo oculto también se puede editar", "Cyber");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 4.96, h: 3.84, title: "Payload peligroso",
    code: `{
  "producto_id": 10,
  "cantidad": 2,
  "usuario_id": 7,
  "estado": "pagado"
}`,
    lang: "json",
    fontSize: 17,
  });
  addReadableColumn(slide, {
    x: 6.18, y: 2.08, w: 4.96, h: 3.84,
    title: "Qué está mal",
    subtitle: "El cliente decide demasiado",
    items: ["Intenta elegir usuario.", "Fuerza estado de pago.", "Puede saltar reglas.", "Confunde UI con autoridad."],
    accent: C.red,
    fill: C.paleRed,
    itemGap: 0.58,
    itemFontSize: 9.8,
  });
  addCenterStatement(slide, SH, "La interfaz propone una acción; el servidor decide si es válida.", {
    x: 0.88, y: 6.14, w: 10.26, h: 0.48,
    fill: C.navy, color: C.white, fontSize: 15.6, bold: true,
  });
  validateSlide(slide, pptx);
}

function createSafePayloadSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Payload Mínimo, Decisión en Backend", "Menos poder para el cliente, más control para el servidor", "Bloque 1");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 4.44, h: 2.86, title: "Cliente envía",
    code: `{
  "producto_id": 10,
  "cantidad": 2
}`,
    lang: "json",
    fontSize: 19,
  });
  const decisions = [
    { title: "Identidad", body: "Sale de sesión/token.", accent: C.navy },
    { title: "Precio", body: "Sale del catálogo real.", accent: C.gold },
    { title: "Estado", body: "Lo define la regla del backend.", accent: C.red },
    { title: "Stock", body: "Se verifica antes de persistir.", accent: C.navy },
  ];
  decisions.forEach((item, i) => {
    addMiniCard(slide, SH, {
      x: 5.72 + (i % 2) * 2.78, y: 2.22 + Math.floor(i / 2) * 1.54, w: 2.52, h: 1.18,
      title: item.title,
      body: item.body,
      accent: item.accent,
      fill: C.white,
      line: item.accent,
      titleFontSize: 12.4,
      bodyFontSize: 8.8,
    });
  });
  addCenterStatement(slide, SH, "Lo crítico no viaja desde el cliente: se resuelve en una capa confiable.", {
    x: 0.88, y: 5.86, w: 10.26, h: 0.62,
    fill: C.navy, color: C.white, fontSize: 17.2, bold: true,
  });
  validateSlide(slide, pptx);
}

function createAiPayloadReviewerSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Agente Como Revisor de Payloads", "Útil para ampliar la mirada, no para delegar la decisión", "IA");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 5.84, h: 4.58, title: "Prompt operativo",
    code: `Actúa como revisor de seguridad.
Tengo este JSON para crear una compra:

{ producto_id, cantidad, usuario_id, estado }

Indica qué campos no deberían
venir desde el cliente y qué
validaciones mínimas aplicar.`,
    lang: "text",
    fontSize: 12.6,
  });
  addReadableColumn(slide, {
    x: 7.08, y: 2.08, w: 4.06, h: 4.58,
    title: "Tú verificas",
    subtitle: "Criterio humano",
    items: ["Flujo real de sesión.", "Regla de negocio.", "Campos calculados.", "Pruebas con payloads inválidos."],
    accent: C.navy,
    fill: C.softBlue,
    itemFontSize: 10.6,
  });
  validateSlide(slide, pptx);
}

function createBlock1SynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 1", "La seguridad empieza antes de tocar SQL", "Bloque 1");
  addCenterStatement(slide, SH, "Validar entradas no es decoración: es decidir qué datos merecen entrar al sistema.", {
    x: 0.88, y: 2.08, w: 10.26, h: 1.22,
    fill: C.navy, color: C.white, fontSize: 22, bold: true, rectRadius: 0.07,
  });
  const ideas = [
    { title: "Frontend", body: "Guía, no frontera final.", accent: C.gold },
    { title: "Backend", body: "Acepta o rechaza.", accent: C.red },
    { title: "Base de datos", body: "Preserva contrato.", accent: C.navy },
    { title: "IA", body: "Revisa, no decide.", accent: C.gold },
  ];
  ideas.forEach((idea, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 4.08, w: 2.4, h: 2.16,
      title: idea.title,
      body: idea.body,
      accent: idea.accent,
      fill: C.white,
      line: C.border,
      titleFontSize: 13.8,
      bodyFontSize: 9.8,
    });
  });
  validateSlide(slide, pptx);
}

function createBlock1QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas de Seguimiento", "Bloque 1 · validación de entradas", "Bloque 1");
  addFollowUpQuestion(slide, {
    x: 0.88, y: 2.08, w: 10.26, h: 1.24,
    badge: "01",
    question: "Si un `<input required>` evita enviar un formulario vacío, ¿por qué el backend debe validar igual?",
    hint: "piensa en curl, DevTools, scripts y clientes que no usan tu HTML.",
    accent: C.navy,
    fill: C.softBlue,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 3.62, w: 10.26, h: 1.24,
    badge: "02",
    question: "En un payload de compra, ¿por qué `usuario_id` y `estado` no deberían venir decididos por el cliente?",
    hint: "separa datos de intención de decisiones de negocio y autorización.",
    accent: C.red,
    fill: C.paleRed,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 5.16, w: 10.26, h: 1.24,
    badge: "03",
    question: "¿Qué diferencia práctica hay entre normalizar, sanitizar y validar un dato?",
    hint: "uno ajusta forma, otro protege por contexto y otro acepta o rechaza.",
    accent: C.gold,
    fill: C.warningSoft,
  });
  validateSlide(slide, pptx);
}

function createBlock2OpeningSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addBarsMotif(slide, 0.88, 1.72, 1.7, C.red);
  slide.addText("Inyección SQL:\ncuando el dato se vuelve instrucción", {
    x: 2.12, y: 2.54, w: 9.04, h: 1.08,
    fontFace: TYPOGRAPHY.display, fontSize: 34, bold: true, color: C.white, margin: 0,
  });
  slide.addText("Bloque 2 · Separar valores de usuario y estructura SQL no es opcional.", {
    x: 2.12, y: 3.9, w: 8.92, h: 0.34,
    fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.gold, bold: true, margin: 0,
  });
  addCenterStatement(slide, SH, "Objetivo del bloque: reconocer consultas vulnerables y reemplazarlas por parámetros, listas blancas y menor privilegio.", {
    x: 0.88, y: 5.62, w: 10.26, h: 0.72,
    fill: C.gold, color: C.navy, fontSize: 16.4, bold: true,
  });
  validateSlide(slide, pptx);
}

function createSqlInjectionDefinitionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Qué Es Inyección SQL", "El dato deja de ser dato y altera la consulta", "Bloque 2");
  addCenterStatement(slide, SH, "Una inyección SQL ocurre cuando una entrada del usuario modifica la instrucción que la base de datos termina ejecutando.", {
    x: 0.88, y: 2.08, w: 10.26, h: 1.2,
    fill: C.navy, color: C.white, fontSize: 22, bold: true, rectRadius: 0.07,
  });
  const pieces = [
    { title: "Esperado", body: "El usuario entrega un valor.", accent: C.navy },
    { title: "Falla", body: "El valor se pega al SQL.", accent: C.red },
    { title: "Resultado", body: "El SQL cambia de intención.", accent: C.gold },
  ];
  pieces.forEach((piece, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.46, y: 4.28, w: 3.18, h: 1.7,
      title: piece.title,
      body: piece.body,
      accent: piece.accent,
      fill: C.white,
      line: piece.accent,
      titleFontSize: 15.2,
      bodyFontSize: 11.2,
    });
  });
  validateSlide(slide, pptx);
}

function createVulnerableConcatSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Patrón Vulnerable", "Concatenar datos externos dentro del SQL", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 6.34, h: 4.34, title: "Backend inseguro",
    code: `const email = req.body.email;

const sql = \`
  SELECT id, nombre, email
  FROM usuarios
  WHERE email = '\${email}'
\`;`,
    lang: "js",
    fontSize: 15.4,
  });
  addReadableColumn(slide, {
    x: 7.52, y: 2.08, w: 3.62, h: 4.34,
    title: "Riesgo",
    subtitle: "Dato como instrucción",
    items: ["Cierra comillas.", "Agrega condiciones.", "Comenta el resto.", "Cambia intención."],
    accent: C.red,
    fill: C.paleRed,
  });
  validateSlide(slide, pptx);
}

function createLoginPayloadSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Login Vulnerable", "El ataque no necesita magia: solo cambiar la lógica", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.06, w: 5.24, h: 4.58, title: "Entrada maliciosa",
    code: `email:
' OR 1=1 --

password:
cualquier-cosa`,
    lang: "text",
    fontSize: 19,
  });
  addCodePanel(slide, SH, {
    x: 6.4, y: 2.06, w: 4.74, h: 4.58, title: "Consulta alterada",
    code: `SELECT id, rol
FROM usuarios
WHERE email = ''
   OR 1=1 --'
AND password = 'x';`,
    lang: "sql",
    fontSize: 16.2,
  });
  validateSlide(slide, pptx);
}

function createInjectionMechanismSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Mecanismo del Ataque", "No memorizar payloads: entender la transformación", "Bloque 2");
  const steps = [
    { title: "1. App espera correo", body: "Campo aparentemente normal.", accent: C.navy },
    { title: "2. Usuario envía SQL", body: "Texto con comillas y lógica.", accent: C.red },
    { title: "3. Backend concatena", body: "La entrada entra al query.", accent: C.gold },
    { title: "4. BD ejecuta", body: "Corre la instrucción recibida.", accent: C.red },
  ];
  steps.forEach((step, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 2.52, w: 2.4, h: 2.28,
      title: step.title,
      body: step.body,
      accent: step.accent,
      fill: C.white,
      line: step.accent,
      titleFontSize: 12.6,
      bodyFontSize: 9.4,
    });
    if (i < steps.length - 1) {
      slide.addShape(SH.line, { x: 3.34 + i * 2.6, y: 3.64, w: 0.34, h: 0, line: { color: C.slate, pt: 1.1, endArrowType: "triangle" } });
    }
  });
  addCenterStatement(slide, SH, "La base de datos ejecuta lo que recibe, no lo que el desarrollador quería decir.", {
    x: 0.88, y: 5.66, w: 10.26, h: 0.66,
    fill: C.navy, color: C.white, fontSize: 17.4, bold: true,
  });
  validateSlide(slide, pptx);
}

function createImpactZonesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Impacto Real", "La inyección SQL no vive solo en el login", "Cyber");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.06, w: 10.26, h: 4.78, title: "Zonas afectadas",
    columns: 3,
    entries: [
      { badge: "AUTH", title: "Login", body: "Saltar acceso o enumerar usuarios.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "BUS", title: "Buscador", body: "Extraer datos fuera del filtro.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "PERF", title: "Perfil", body: "Leer datos de otra persona.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "ADM", title: "Panel admin", body: "Alterar roles, estados o precios.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "DEL", title: "Eliminación", body: "Borrar fuera del alcance esperado.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "ERR", title: "Errores", body: "Revelar tablas, columnas o motor.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ],
  });
  validateSlide(slide, pptx);
}

function createCrudSqlRiskSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Riesgo Según Operación SQL", "La clase anterior ahora se lee con lente defensivo", "Bloque 2");
  const rows = [
    { cmd: "SELECT", risk: "Filtra datos sensibles o ajenos.", accent: C.gold },
    { cmd: "UPDATE", risk: "Modifica más filas de las esperadas.", accent: C.red },
    { cmd: "DELETE", risk: "Destruye evidencia o registros críticos.", accent: C.red },
    { cmd: "ORDER BY", risk: "Permite controlar estructura si no hay lista blanca.", accent: C.navy },
  ];
  rows.forEach((row, i) => {
    const y = 2.18 + i * 0.94;
    slide.addShape(SH.roundRect, { x: 0.88, y, w: 10.26, h: 0.68, rectRadius: 0.04, fill: { color: C.white }, line: { color: C.border, pt: 0.9 } });
    slide.addShape(SH.rect, { x: 0.88, y, w: 0.14, h: 0.68, fill: { color: row.accent }, line: { color: row.accent } });
    slide.addText(row.cmd, { x: 1.18, y: y + 0.16, w: 1.5, h: 0.24, fontFace: TYPOGRAPHY.mono, fontSize: 14.2, bold: true, color: row.accent, margin: 0 });
    slide.addText(row.risk, { x: 3.0, y: y + 0.16, w: 7.72, h: 0.24, fontFace: TYPOGRAPHY.body, fontSize: 12.8, color: C.ink, margin: 0 });
  });
  addCenterStatement(slide, SH, "El mismo error de entrada cambia de severidad según qué instrucción toca.", {
    x: 0.88, y: 6.0, w: 10.26, h: 0.54,
    fill: C.navy, color: C.white, fontSize: 16, bold: true,
  });
  validateSlide(slide, pptx);
}

function createParameterizedQuerySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Consulta Parametrizada", "La instrucción y los valores viajan separados", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.04, w: 5.06, h: 4.58, title: "Vulnerable",
    code: `const sql = \`
  SELECT id, email
  FROM usuarios
  WHERE email = '\${email}'
\`;`,
    lang: "js",
    fontSize: 15.4,
  });
  addCodePanel(slide, SH, {
    x: 6.22, y: 2.04, w: 4.92, h: 4.58, title: "Parametrizada",
    code: `const sql = \`
  SELECT id, email
  FROM usuarios
  WHERE email = ?
\`;

const params = [email];`,
    lang: "js",
    fontSize: 14.8,
  });
  validateSlide(slide, pptx);
}

function createInstructionVsValuesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Separar Estructura y Valores", "Qué puede venir del usuario y qué no", "Bloque 2");
  addReadableColumn(slide, {
    x: 0.88, y: 2.08, w: 4.96, h: 4.46,
    title: "Estructura SQL",
    subtitle: "La define el desarrollador",
    items: ["Nombre de tabla.", "Nombre de columna.", "Operador lógico.", "Orden del query."],
    accent: C.red,
    fill: C.paleRed,
  });
  addReadableColumn(slide, {
    x: 6.18, y: 2.08, w: 4.96, h: 4.46,
    title: "Valores",
    subtitle: "Pueden venir del usuario",
    items: ["Email buscado.", "ID filtrado.", "Texto de búsqueda.", "Límite validado."],
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createValidationNotParamSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Validar No Reemplaza Parametrizar", "Son defensas distintas y complementarias", "Bloque 2");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 5.3, h: 3.42, title: "Validación",
    code: `function validarId(id) {
  return Number.isInteger(id)
    && id > 0;
}`,
    lang: "js",
    fontSize: 18,
  });
  addReadableColumn(slide, {
    x: 6.48, y: 2.08, w: 4.66, h: 3.42,
    title: "Qué cubre",
    subtitle: "Rango de entrada",
    items: ["Rechaza basura.", "Reduce casos inválidos.", "No separa SQL.", "No reemplaza parámetros."],
    accent: C.gold,
    fill: C.warningSoft,
    itemGap: 0.54,
    itemFontSize: 9.6,
  });
  addCenterStatement(slide, SH, "Validar decide si el dato entra; parametrizar impide que cambie la instrucción.", {
    x: 0.88, y: 6.04, w: 10.26, h: 0.58,
    fill: C.navy, color: C.white, fontSize: 16.4, bold: true,
  });
  validateSlide(slide, pptx);
}

function createDynamicOrderProblemSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "`ORDER BY` Dinámico", "No todo se puede parametrizar como un valor", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 6.18, h: 4.34, title: "Patrón inseguro",
    code: `const orden = req.query.orden;

const sql = \`
  SELECT id, nombre, precio
  FROM productos
  ORDER BY \${orden}
\`;`,
    lang: "js",
    fontSize: 14.6,
  });
  addReadableColumn(slide, {
    x: 7.38, y: 2.08, w: 3.76, h: 4.34,
    title: "Problema",
    subtitle: "El cliente elige estructura",
    items: ["No es valor.", "Es parte del SQL.", "Puede alterar query.", "Necesita lista blanca."],
    accent: C.red,
    fill: C.paleRed,
  });
  validateSlide(slide, pptx);
}

function createAllowlistOrderSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Lista Blanca Para Estructura", "El cliente elige una opción, no una columna arbitraria", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.04, w: 6.58, h: 4.74, title: "Ordenamiento seguro",
    code: `const columnas = {
  precio: "precio",
  nombre: "nombre",
  creado: "creado_en",
};

const orden =
  columnas[req.query.orden] ?? "creado_en";`,
    lang: "js",
    fontSize: 13.6,
  });
  addReadableColumn(slide, {
    x: 7.76, y: 2.04, w: 3.38, h: 4.74,
    title: "Regla",
    subtitle: "Permitido explícito",
    items: ["Claves conocidas.", "Fallback seguro.", "Sin texto libre.", "Valores siguen con parámetros."],
    accent: C.navy,
    fill: C.softBlue,
    itemFontSize: 10.4,
  });
  validateSlide(slide, pptx);
}

function createLeastPrivilegeDbSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Menor Privilegio en Base de Datos", "Si una capa falla, el daño debe quedar acotado", "Cyber");
  addReadableColumn(slide, {
    x: 0.88, y: 2.08, w: 4.96, h: 4.46,
    title: "root / admin",
    subtitle: "Daño amplificado",
    items: ["Puede borrar tablas.", "Puede alterar esquema.", "Amplifica inyección.", "No usar desde backend."],
    accent: C.red,
    fill: C.paleRed,
  });
  addReadableColumn(slide, {
    x: 6.18, y: 2.08, w: 4.96, h: 4.46,
    title: "web_app",
    subtitle: "Permisos acotados",
    items: ["SELECT necesario.", "INSERT permitido.", "UPDATE limitado.", "Sin DROP/TRUNCATE."],
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createAgentSqlAuditSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Agente Como Auditor SQL", "Sirve para detectar patrones, no para aprobar ejecución", "IA");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 5.84, h: 4.58, title: "Prompt de auditoría",
    code: `Revisa este backend.
Detecta riesgos de:
- inyección SQL
- SELECT *
- ORDER BY dinámico
- WHERE débil

Propón versión segura.`,
    lang: "text",
    fontSize: 13.2,
  });
  addReadableColumn(slide, {
    x: 7.08, y: 2.08, w: 4.06, h: 4.58,
    title: "Tú confirmas",
    subtitle: "Validación humana",
    items: ["Esquema real.", "Columnas existentes.", "Índices.", "Permisos de BD."],
    accent: C.gold,
    fill: C.warningSoft,
  });
  validateSlide(slide, pptx);
}

function createBlock2SynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 2", "SQL seguro separa intención, valores y permisos", "Bloque 2");
  addCenterStatement(slide, SH, "La defensa no es limpiar strings: es impedir que el usuario escriba la estructura del SQL.", {
    x: 0.88, y: 2.08, w: 10.26, h: 1.22,
    fill: C.navy, color: C.white, fontSize: 21.2, bold: true, rectRadius: 0.07,
  });
  const ideas = [
    { title: "Parámetros", body: "Valores separados.", accent: C.navy },
    { title: "Lista blanca", body: "Estructura controlada.", accent: C.gold },
    { title: "WHERE", body: "Alcance explícito.", accent: C.red },
    { title: "Privilegios", body: "Daño limitado.", accent: C.navy },
  ];
  ideas.forEach((idea, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 4.08, w: 2.4, h: 2.16,
      title: idea.title,
      body: idea.body,
      accent: idea.accent,
      fill: C.white,
      line: C.border,
      titleFontSize: 13.8,
      bodyFontSize: 9.8,
    });
  });
  validateSlide(slide, pptx);
}

function createBlock2QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas de Seguimiento", "Bloque 2 · inyección SQL y parámetros", "Bloque 2");
  addFollowUpQuestion(slide, {
    x: 0.88, y: 2.08, w: 10.26, h: 1.24,
    badge: "01",
    question: "¿Qué significa que un dato del usuario pase a modificar la instrucción SQL?",
    hint: "piensa en comillas, condiciones agregadas y comentarios dentro del query.",
    accent: C.navy,
    fill: C.softBlue,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 3.62, w: 10.26, h: 1.24,
    badge: "02",
    question: "¿Por qué parametrizar protege mejor que intentar borrar palabras como `DROP` o `SELECT`?",
    hint: "separa valores de estructura en vez de perseguir todos los payloads posibles.",
    accent: C.red,
    fill: C.paleRed,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 5.16, w: 10.26, h: 1.24,
    badge: "03",
    question: "Si el usuario puede ordenar por columna, ¿por qué conviene usar una lista blanca?",
    hint: "los nombres de columna son estructura SQL, no valores normales.",
    accent: C.gold,
    fill: C.warningSoft,
  });
  validateSlide(slide, pptx);
}

function createBlock3OpeningSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addBarsMotif(slide, 0.88, 1.72, 1.7, C.red);
  slide.addText("Autenticación y autorización:\nquién eres y qué puedes hacer", {
    x: 2.12, y: 2.48, w: 9.0, h: 1.12,
    fontFace: TYPOGRAPHY.display, fontSize: 33, bold: true, color: C.white, margin: 0,
  });
  slide.addText("Bloque 3 · El login no protege nada si las operaciones no verifican permisos.", {
    x: 2.12, y: 3.88, w: 8.92, h: 0.34,
    fontFace: TYPOGRAPHY.body, fontSize: 15.4, color: C.gold, bold: true, margin: 0,
  });
  addCenterStatement(slide, SH, "Objetivo del bloque: separar identidad, sesión/token y autorización antes de tocar datos protegidos.", {
    x: 0.88, y: 5.62, w: 10.26, h: 0.72,
    fill: C.gold, color: C.navy, fontSize: 16.6, bold: true,
  });
  validateSlide(slide, pptx);
}

function createAuthVsAuthorizationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Autenticación No Es Autorización", "Dos preguntas distintas, dos controles distintos", "Bloque 3");
  addReadableColumn(slide, {
    x: 0.88, y: 2.1, w: 4.96, h: 4.38,
    title: "Autenticación",
    subtitle: "¿Quién eres?",
    items: ["Correo y contraseña.", "Sesión o token.", "Identidad verificable.", "Responde 401 si falta."],
    accent: C.navy,
    fill: C.softBlue,
  });
  addReadableColumn(slide, {
    x: 6.18, y: 2.1, w: 4.96, h: 4.38,
    title: "Autorización",
    subtitle: "¿Qué puedes hacer?",
    items: ["Dueño del recurso.", "Rol o permiso.", "Estado permitido.", "Responde 403 si no puede."],
    accent: C.red,
    fill: C.paleRed,
  });
  validateSlide(slide, pptx);
}

function createLoginFlowSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Login Como Flujo", "No es solo un formulario con dos campos", "Bloque 3");
  const steps = [
    { title: "Entrada", body: "Email y contraseña.", accent: C.gold },
    { title: "Validación", body: "Formato y presencia.", accent: C.navy },
    { title: "Búsqueda", body: "Usuario en BD.", accent: C.red },
    { title: "Verificación", body: "Contraseña contra hash.", accent: C.navy },
    { title: "Credencial", body: "Sesión o token.", accent: C.gold },
  ];
  steps.forEach((step, i) => {
    addMiniCard(slide, SH, {
      x: 0.72 + i * 2.18, y: 2.5, w: 1.92, h: 2.28,
      title: step.title,
      body: step.body,
      accent: step.accent,
      fill: C.white,
      line: step.accent,
      titleFontSize: 12.6,
      bodyFontSize: 9.2,
    });
    if (i < steps.length - 1) {
      slide.addShape(SH.line, { x: 2.72 + i * 2.18, y: 3.64, w: 0.34, h: 0, line: { color: C.slate, pt: 1.1, endArrowType: "triangle" } });
    }
  });
  addCenterStatement(slide, SH, "El servidor debe recordar identidad sin volver a pedir contraseña en cada request.", {
    x: 0.88, y: 5.62, w: 10.26, h: 0.66,
    fill: C.navy, color: C.white, fontSize: 17.2, bold: true,
  });
  validateSlide(slide, pptx);
}

function createPasswordStorageSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Contraseñas: Nunca Texto Plano", "La aplicación no necesita recordar la clave original", "Cyber");
  addReadableColumn(slide, {
    x: 0.88, y: 2.08, w: 4.96, h: 4.46,
    title: "Mala práctica",
    subtitle: "Exposición inmediata",
    items: ['password = "123456"', "Visible en fuga de BD.", "Puede aparecer en logs.", "Reutilizable en otros sitios."],
    accent: C.red,
    fill: C.paleRed,
    itemFontSize: 10.4,
  });
  addReadableColumn(slide, {
    x: 6.18, y: 2.08, w: 4.96, h: 4.46,
    title: "Mejor criterio",
    subtitle: "Verificación protegida",
    items: ["Guardar password_hash.", "Comparar con librería.", "No inventar hashing.", "No devolver ni loguear."],
    accent: C.navy,
    fill: C.softBlue,
    itemFontSize: 10.4,
  });
  validateSlide(slide, pptx);
}

function createNoSecretLogsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Depurar No Justifica Filtrar Secretos", "Los logs también son superficie de ataque", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 4.96, h: 3.64, title: "Mala práctica",
    code: `console.log(
  "Login recibido",
  email,
  password,
  token
);`,
    lang: "js",
    fontSize: 17,
  });
  addCodePanel(slide, SH, {
    x: 6.18, y: 2.08, w: 4.96, h: 3.64, title: "Mejor",
    code: `logger.warn("Login falló", {
  email,
  code: "AUTH_INVALID"
});`,
    lang: "js",
    fontSize: 17,
  });
  addCenterStatement(slide, SH, "Contraseñas, tokens y secretos nunca deben quedar en consola, logs ni respuestas.", {
    x: 0.88, y: 6.1, w: 10.26, h: 0.52,
    fill: C.red, color: C.white, fontSize: 15.8, bold: true,
  });
  validateSlide(slide, pptx);
}

function createSessionsTokensSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Sesiones y Tokens", "HTTP no recuerda identidad por sí solo", "Bloque 3");
  addReadableColumn(slide, {
    x: 0.88, y: 2.12, w: 4.96, h: 4.34,
    title: "Sesión con cookie",
    subtitle: "Estado controlado por servidor",
    items: ["Cookie identifica sesión.", "Servidor resuelve usuario.", "Puede revocarse.", "Requiere protección."],
    accent: C.navy,
    fill: C.softBlue,
  });
  addReadableColumn(slide, {
    x: 6.18, y: 2.12, w: 4.96, h: 4.34,
    title: "Token",
    subtitle: "Credencial enviada por cliente",
    items: ["Debe verificarse.", "Debe expirar.", "No exponer en logs.", "No confiar sin firma."],
    accent: C.gold,
    fill: C.warningSoft,
  });
  validateSlide(slide, pptx);
}

function createUserIdFromClientRiskSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "`usuario_id` Desde Frontend Es Riesgo", "El cliente no debe inventar su identidad", "Cyber");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 4.96, h: 3.84, title: "Payload débil",
    code: `{
  "usuario_id": 15,
  "accion": "ver_compras"
}`,
    lang: "json",
    fontSize: 19,
  });
  addReadableColumn(slide, {
    x: 6.18, y: 2.08, w: 4.96, h: 3.84,
    title: "Ataque simple",
    subtitle: "Cambiar un número",
    items: ["Probar otro id.", "Consultar datos ajenos.", "Automatizar enumeración.", "Saltar ownership."],
    accent: C.red,
    fill: C.paleRed,
    itemGap: 0.58,
    itemFontSize: 9.8,
  });
  addCenterStatement(slide, SH, "El backend debe resolver la identidad desde una credencial verificada.", {
    x: 0.88, y: 6.14, w: 10.26, h: 0.48,
    fill: C.navy, color: C.white, fontSize: 16, bold: true,
  });
  validateSlide(slide, pptx);
}

function createProtectedRouteSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Ruta Protegida", "El servidor pregunta a la sesión, no al JSON", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 6.46, h: 4.46, title: "Patrón más seguro",
    code: `app.get("/mis-compras", requireAuth, async (req, res) => {
  const usuarioId = req.session.userId;

  const compras = await db.query(
    "SELECT id, total, estado FROM compras WHERE usuario_id = ?",
    [usuarioId]
  );

  res.json(compras);
});`,
    lang: "js",
    fontSize: 11.8,
  });
  addReadableColumn(slide, {
    x: 7.64, y: 2.08, w: 3.5, h: 4.46,
    title: "Claves",
    subtitle: "Identidad confiable",
    items: ["Middleware auth.", "ID desde sesión.", "SELECT explícito.", "Filtro por usuario."],
    accent: C.navy,
    fill: C.softBlue,
    itemFontSize: 10.4,
  });
  validateSlide(slide, pptx);
}

function createResourceAuthorizationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Autorizar Por Recurso", "`PATCH /compras/:id` necesita más que estar logueado", "Bloque 3");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 6.46, h: 4.46, title: "Alcance correcto",
    code: `UPDATE compras
SET estado = ?
WHERE id = ?
  AND usuario_id = ?
  AND estado = 'pendiente';`,
    lang: "sql",
    fontSize: 19,
  });
  addReadableColumn(slide, {
    x: 7.64, y: 2.08, w: 3.5, h: 4.46,
    title: "Verifica",
    subtitle: "Antes de cambiar",
    items: ["Existe.", "Pertenece al usuario.", "Estado permite cambio.", "Campo permitido."],
    accent: C.red,
    fill: C.paleRed,
    itemFontSize: 10.4,
  });
  validateSlide(slide, pptx);
}

function createNotFoundVsForbiddenSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "No Revelar Más de lo Necesario", "A veces un 404 protege mejor que explicar de más", "Bloque 3");
  addReadableColumn(slide, {
    x: 0.88, y: 2.08, w: 4.96, h: 4.34,
    title: "Respuesta riesgosa",
    subtitle: "Entrega pista",
    items: ["La compra existe.", "No es tuya.", "Prueba otros IDs.", "Facilita enumeración."],
    accent: C.red,
    fill: C.paleRed,
  });
  addReadableColumn(slide, {
    x: 6.18, y: 2.08, w: 4.96, h: 4.34,
    title: "Respuesta prudente",
    subtitle: "Menos información",
    items: ["Recurso no disponible.", "Sin confirmar existencia.", "Log interno conserva detalle.", "Frontend maneja caso."],
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createRolesPermissionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Roles y Permisos", "Ocultar botones no protege endpoints", "Bloque 3");
  const rows = [
    { role: "Visitante", can: "Ver contenido público.", deny: "Crear o editar datos privados.", accent: C.gold },
    { role: "Usuario", can: "Gestionar recursos propios.", deny: "Ver recursos ajenos.", accent: C.navy },
    { role: "Operador", can: "Revisar registros asignados.", deny: "Administrar usuarios.", accent: C.red },
    { role: "Admin", can: "Configurar sistema.", deny: "Saltarse auditoría.", accent: C.navy },
  ];
  rows.forEach((row, i) => {
    const y = 2.16 + i * 0.9;
    slide.addShape(SH.roundRect, { x: 0.88, y, w: 10.26, h: 0.64, rectRadius: 0.04, fill: { color: C.white }, line: { color: C.border, pt: 0.9 } });
    slide.addShape(SH.rect, { x: 0.88, y, w: 0.14, h: 0.64, fill: { color: row.accent }, line: { color: row.accent } });
    slide.addText(row.role, { x: 1.16, y: y + 0.15, w: 1.72, h: 0.22, fontFace: TYPOGRAPHY.display, fontSize: 12.8, bold: true, color: row.accent, margin: 0 });
    slide.addText(row.can, { x: 3.06, y: y + 0.15, w: 3.42, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 11.2, color: C.ink, margin: 0 });
    slide.addText(row.deny, { x: 6.92, y: y + 0.15, w: 3.62, h: 0.22, fontFace: TYPOGRAPHY.body, fontSize: 11.2, color: C.slate, margin: 0 });
  });
  addCenterStatement(slide, SH, "El frontend puede ocultar acciones; el backend debe bloquearlas.", {
    x: 0.88, y: 6.02, w: 10.26, h: 0.54,
    fill: C.navy, color: C.white, fontSize: 16.2, bold: true,
  });
  validateSlide(slide, pptx);
}

function create401403Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "`401` vs `403`", "Ambos son seguridad, pero responden problemas distintos", "Bloque 3");
  addReadableColumn(slide, {
    x: 0.88, y: 2.12, w: 4.96, h: 4.34,
    title: "401 Unauthorized",
    subtitle: "No hay identidad válida",
    items: ["No inició sesión.", "Token ausente.", "Token inválido.", "Debe autenticarse."],
    accent: C.gold,
    fill: C.warningSoft,
  });
  addReadableColumn(slide, {
    x: 6.18, y: 2.12, w: 4.96, h: 4.34,
    title: "403 Forbidden",
    subtitle: "Hay identidad, falta permiso",
    items: ["Usuario válido.", "Rol insuficiente.", "Recurso ajeno.", "Operación prohibida."],
    accent: C.red,
    fill: C.paleRed,
  });
  validateSlide(slide, pptx);
}

function createAuthCommonErrorsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Errores Típicos", "El sistema puede funcionar y seguir expuesto", "Cyber");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.06, w: 10.26, h: 4.78, title: "Checklist de fallas frecuentes",
    columns: 3,
    entries: [
      { badge: "PWD", title: "Texto plano", body: "Contraseñas guardadas o logueadas.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "URL", title: "Secretos en URL", body: "Tokens o passwords visibles.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "ID", title: "Confía en cliente", body: "`usuario_id` desde JSON.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "UI", title: "Solo oculta botón", body: "Endpoint sigue abierto.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "OWN", title: "No revisa dueño", body: "Edita recursos ajenos.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "TTL", title: "Sin expiración", body: "Sesiones o tokens eternos.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ],
  });
  validateSlide(slide, pptx);
}

function createAgentAuthReviewSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Agente Como Revisor de Autenticación", "Útil para detectar huecos, peligroso si aprueba sin pruebas", "IA");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 5.84, h: 4.58, title: "Prompt de revisión",
    code: `Revisa este flujo:
- POST /login devuelve user_id y rol.
- Frontend envía user_id en cada request.
- Backend usa ese user_id para compras.

Identifica riesgos y propón
un flujo con sesión o token.`,
    lang: "text",
    fontSize: 12.4,
  });
  addReadableColumn(slide, {
    x: 7.08, y: 2.08, w: 4.06, h: 4.58,
    title: "Tú pruebas",
    subtitle: "No basta la explicación",
    items: ["Cambiar user_id.", "Probar recurso ajeno.", "Revisar logs.", "Verificar expiración."],
    accent: C.navy,
    fill: C.softBlue,
    itemFontSize: 10.4,
  });
  validateSlide(slide, pptx);
}

function createBlock3SynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 3", "Login sin autorización sigue siendo una puerta abierta", "Bloque 3");
  addCenterStatement(slide, SH, "Autenticarse identifica al usuario; autorizar limita lo que puede hacer con cada recurso.", {
    x: 0.88, y: 2.08, w: 10.26, h: 1.22,
    fill: C.navy, color: C.white, fontSize: 22, bold: true, rectRadius: 0.07,
  });
  const ideas = [
    { title: "Identidad", body: "Sesión o token verificado.", accent: C.navy },
    { title: "Ownership", body: "Recurso propio.", accent: C.red },
    { title: "Permisos", body: "Rol y acción permitida.", accent: C.gold },
    { title: "Errores", body: "No revelar de más.", accent: C.navy },
  ];
  ideas.forEach((idea, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 4.08, w: 2.4, h: 2.16,
      title: idea.title,
      body: idea.body,
      accent: idea.accent,
      fill: C.white,
      line: C.border,
      titleFontSize: 13.8,
      bodyFontSize: 9.6,
    });
  });
  validateSlide(slide, pptx);
}

function createBlock3QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas de Seguimiento", "Bloque 3 · autenticación y autorización", "Bloque 3");
  addFollowUpQuestion(slide, {
    x: 0.88, y: 2.08, w: 10.26, h: 1.24,
    badge: "01",
    question: "¿Qué diferencia práctica hay entre saber quién es el usuario y saber qué puede modificar?",
    hint: "separa autenticación de autorización por recurso.",
    accent: C.navy,
    fill: C.softBlue,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 3.62, w: 10.26, h: 1.24,
    badge: "02",
    question: "¿Por qué `usuario_id` enviado desde el frontend no debería decidir qué compras consultar?",
    hint: "piensa en manipulación del JSON y enumeración de IDs.",
    accent: C.red,
    fill: C.paleRed,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 5.16, w: 10.26, h: 1.24,
    badge: "03",
    question: "Antes de ejecutar `PATCH /compras/:id`, ¿qué condiciones debería revisar el backend?",
    hint: "identidad, dueño del recurso, estado actual y campos permitidos.",
    accent: C.gold,
    fill: C.warningSoft,
  });
  validateSlide(slide, pptx);
}

function createBlock4OpeningSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addBarsMotif(slide, 0.88, 1.72, 1.7, C.red);
  slide.addText("Errores seguros:\nfallar sin regalar información", {
    x: 2.12, y: 2.5, w: 9.0, h: 1.12,
    fontFace: TYPOGRAPHY.display, fontSize: 34, bold: true, color: C.white, margin: 0,
  });
  slide.addText("Bloque 4 · El error también es una respuesta pública del sistema.", {
    x: 2.12, y: 3.88, w: 8.92, h: 0.34,
    fontFace: TYPOGRAPHY.body, fontSize: 15.4, color: C.gold, bold: true, margin: 0,
  });
  addCenterStatement(slide, SH, "Objetivo del bloque: diagnosticar sin exponer SQL, rutas internas, secretos ni estructura de base de datos.", {
    x: 0.88, y: 5.62, w: 10.26, h: 0.72,
    fill: C.gold, color: C.navy, fontSize: 16.3, bold: true,
  });
  validateSlide(slide, pptx);
}

function createErrorCommunicatesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Un Error También Comunica", "Puede orientar al usuario o ayudar al atacante", "Bloque 4");
  addCenterStatement(slide, SH, "Cuando una app falla, decide qué información queda fuera y qué queda solo para el equipo técnico.", {
    x: 0.88, y: 2.08, w: 10.26, h: 1.14,
    fill: C.navy, color: C.white, fontSize: 22, bold: true,
  });
  const leaks = [
    { title: "SQL", body: "Queries, tablas o columnas.", accent: C.red },
    { title: "Servidor", body: "Rutas, archivos o stack trace.", accent: C.gold },
    { title: "Versiones", body: "Motor de BD o librerías.", accent: C.red },
    { title: "Secretos", body: "Tokens, hashes o credenciales.", accent: C.navy },
  ];
  leaks.forEach((item, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 4.18, w: 2.4, h: 1.86,
      title: item.title,
      body: item.body,
      accent: item.accent,
      fill: C.white,
      line: item.accent,
      titleFontSize: 13.8,
      bodyFontSize: 9.4,
    });
  });
  validateSlide(slide, pptx);
}

function createDangerousErrorSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Respuesta Insegura", "Útil para depurar, peligrosa para publicar", "Cyber");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 6.36, h: 4.46, title: "Error filtrado al cliente",
    code: `Unknown column 'password_hash'
in 'field list'

SELECT id, email, password_hash
FROM usuarios
WHERE email = 'ana@correo.cl'

/app/src/controllers/auth.js:42`,
    lang: "text",
    fontSize: 12.4,
  });
  addReadableColumn(slide, {
    x: 7.54, y: 2.08, w: 3.6, h: 4.46,
    title: "Filtra",
    subtitle: "Pistas técnicas",
    items: ["Columna sensible.", "Tabla interna.", "Fragmento SQL.", "Ruta del servidor."],
    accent: C.red,
    fill: C.paleRed,
  });
  validateSlide(slide, pptx);
}

function createSafeErrorAndLogSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Usuario vs Log Técnico", "Dos audiencias, dos niveles de detalle", "Bloque 4");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 4.86, h: 3.84, title: "Cliente recibe",
    code: `{
  "error": "No fue posible
  procesar la solicitud."
}`,
    lang: "json",
    fontSize: 18,
  });
  addCodePanel(slide, SH, {
    x: 6.08, y: 2.08, w: 5.06, h: 3.84, title: "Log interno",
    code: `logger.error("Login failure", {
  route: "POST /login",
  code: "AUTH_LOGIN_FAILURE"
});`,
    lang: "js",
    fontSize: 15.2,
  });
  addCenterStatement(slide, SH, "El detalle técnico se conserva, pero no se expone públicamente.", {
    x: 0.88, y: 6.12, w: 10.26, h: 0.5,
    fill: C.navy, color: C.white, fontSize: 15.8, bold: true,
  });
  validateSlide(slide, pptx);
}

function createHttpErrorCodesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Códigos HTTP Seguros", "No todo error debe terminar en 500", "Bloque 4");
  const rows = [
    { code: "400", use: "Datos inválidos.", msg: "Revisa la solicitud.", accent: C.gold },
    { code: "401", use: "Falta identidad válida.", msg: "Debes iniciar sesión.", accent: C.navy },
    { code: "403", use: "Sin permiso.", msg: "Operación no permitida.", accent: C.red },
    { code: "404", use: "Recurso no disponible.", msg: "Recurso no encontrado.", accent: C.navy },
    { code: "409", use: "Conflicto de estado.", msg: "No puede modificarse ahora.", accent: C.gold },
    { code: "500", use: "Fallo interno.", msg: "No fue posible procesar.", accent: C.red },
  ];
  rows.forEach((row, i) => {
    const y = 2.06 + i * 0.68;
    slide.addShape(SH.roundRect, { x: 0.88, y, w: 10.26, h: 0.52, rectRadius: 0.03, fill: { color: C.white }, line: { color: C.border, pt: 0.8 } });
    slide.addShape(SH.rect, { x: 0.88, y, w: 0.12, h: 0.52, fill: { color: row.accent }, line: { color: row.accent } });
    slide.addText(row.code, { x: 1.16, y: y + 0.13, w: 0.64, h: 0.2, fontFace: TYPOGRAPHY.mono, fontSize: 12.4, bold: true, color: row.accent, margin: 0 });
    slide.addText(row.use, { x: 2.08, y: y + 0.13, w: 3.18, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 10.8, color: C.ink, margin: 0 });
    slide.addText(row.msg, { x: 5.78, y: y + 0.13, w: 4.68, h: 0.2, fontFace: TYPOGRAPHY.body, fontSize: 10.8, color: C.slate, margin: 0 });
  });
  addCenterStatement(slide, SH, "El código correcto ayuda al frontend sin revelar internals.", {
    x: 0.88, y: 6.18, w: 10.26, h: 0.42,
    fill: C.softBlue, color: C.navy, fontSize: 13.6, bold: true,
  });
  validateSlide(slide, pptx);
}

function createLoginEnumerationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Login: No Enumerar Usuarios", "El error no debe confirmar si un correo existe", "Cyber");
  addReadableColumn(slide, {
    x: 0.88, y: 2.08, w: 4.96, h: 4.34,
    title: "Riesgoso",
    subtitle: "Entrega pista",
    items: ["El email existe.", "La clave está mal.", "Prueba otro password.", "Permite enumerar cuentas."],
    accent: C.red,
    fill: C.paleRed,
  });
  addReadableColumn(slide, {
    x: 6.18, y: 2.08, w: 4.96, h: 4.34,
    title: "Más seguro",
    subtitle: "Mensaje uniforme",
    items: ["Credenciales inválidas.", "No confirma existencia.", "Log interno conserva causa.", "Frontend muestra acción clara."],
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createDatabaseErrorExposureSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Errores de Base de Datos", "Traducir errores técnicos a respuestas seguras", "Cyber");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 5.28, h: 3.92, title: "Filtración",
    code: `Duplicate entry 'ana@correo.cl'
for key 'usuarios.email_unique'`,
    lang: "text",
    fontSize: 16.4,
  });
  addCodePanel(slide, SH, {
    x: 6.48, y: 2.08, w: 4.66, h: 3.92, title: "Respuesta",
    code: `{
  "error": "No fue posible
  registrar el usuario."
}`,
    lang: "json",
    fontSize: 17,
  });
  addCenterStatement(slide, SH, "El cliente no necesita conocer nombres de índices, tablas o constraints.", {
    x: 0.88, y: 6.12, w: 10.26, h: 0.48,
    fill: C.navy, color: C.white, fontSize: 15.8, bold: true,
  });
  validateSlide(slide, pptx);
}

function createHardeningChecklistSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Checklist de Hardening Mínimo", "Una base defensiva para cualquier CRUD inicial", "Bloque 4");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.06, w: 10.26, h: 4.78, title: "Controles mínimos",
    columns: 3,
    entries: [
      { badge: "IN", title: "Validar backend", body: "Tipos, rangos, formatos.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "SQL", title: "Parámetros", body: "Valores separados del query.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "AUTH", title: "Sesión/token", body: "Identidad verificada.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "OWN", title: "Ownership", body: "Dueño, rol o permiso.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "ERR", title: "Errores seguros", body: "Sin SQL ni stack trace.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "DB", title: "Menor privilegio", body: "Sin permisos administrativos.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ],
  });
  validateSlide(slide, pptx);
}

function createNegativeTestsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Pruebas Negativas", "Probar lo que no debería funcionar", "Bloque 4");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.06, w: 10.26, h: 4.78, title: "Casos que deben fallar",
    columns: 3,
    entries: [
      { badge: "ID", title: "ID negativo", body: "Rechazar ruta inválida.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "@", title: "Correo roto", body: "No aceptar formato inválido.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "OWN", title: "Recurso ajeno", body: "No editar datos de otro.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "BIG", title: "Texto gigante", body: "Controlar longitud.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "EX", title: "Campos extra", body: "Ignorar o rechazar.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "SQL", title: "Payload SQL", body: "No alterar consulta.", accent: C.navy, fill: C.white, badgeFill: C.navy },
    ],
  });
  validateSlide(slide, pptx);
}

function createCurlNegativePayloadSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Payload Que Debe Fallar", "Una prueba negativa simple revela decisiones de seguridad", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 6.64, h: 4.38, title: "Prueba manual",
    code: `curl -X POST http://localhost:3000/compras \\
  -H "Content-Type: application/json" \\
  -d '{
    "producto_id": 10,
    "cantidad": 2,
    "usuario_id": 99,
    "estado": "pagado"
  }'`,
    lang: "bash",
    fontSize: 12.2,
  });
  addReadableColumn(slide, {
    x: 7.82, y: 2.08, w: 3.32, h: 4.38,
    title: "Debe revisar",
    subtitle: "Backend",
    items: ["Ignorar user_id.", "Rechazar estado.", "Resolver sesión.", "No persistir basura."],
    accent: C.red,
    fill: C.paleRed,
    itemFontSize: 10.4,
  });
  validateSlide(slide, pptx);
}

function createAgentSecurityQaSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Agente Como QA de Seguridad", "Genera casos, pero no reemplaza ejecución real", "IA");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.08, w: 5.84, h: 4.58, title: "Prompt de cierre",
    code: `Actúa como auditor de seguridad.
Para este flujo CRUD genera:
1. riesgos restantes
2. pruebas negativas
3. datos que no debo exponer
4. qué no delegar a IA`,
    lang: "text",
    fontSize: 13.2,
  });
  addReadableColumn(slide, {
    x: 7.08, y: 2.08, w: 4.06, h: 4.58,
    title: "Tú compruebas",
    subtitle: "Validación real",
    items: ["Ejecutar pruebas.", "Leer respuestas.", "Revisar logs.", "Confirmar BD."],
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createBlock4SynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 4", "Fallar bien también es parte de la seguridad", "Bloque 4");
  addCenterStatement(slide, SH, "El usuario necesita una respuesta útil; el atacante no necesita tu arquitectura interna.", {
    x: 0.88, y: 2.08, w: 10.26, h: 1.22,
    fill: C.navy, color: C.white, fontSize: 22, bold: true, rectRadius: 0.07,
  });
  const ideas = [
    { title: "Responder", body: "Mensaje seguro.", accent: C.navy },
    { title: "Registrar", body: "Detalle controlado.", accent: C.gold },
    { title: "Probar", body: "Casos negativos.", accent: C.red },
    { title: "Revisar", body: "Checklist mínimo.", accent: C.navy },
  ];
  ideas.forEach((idea, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 4.08, w: 2.4, h: 2.16,
      title: idea.title,
      body: idea.body,
      accent: idea.accent,
      fill: C.white,
      line: C.border,
      titleFontSize: 13.8,
      bodyFontSize: 9.6,
    });
  });
  validateSlide(slide, pptx);
}

function createBlock4QuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas de Seguimiento", "Bloque 4 · errores seguros y hardening", "Bloque 4");
  addFollowUpQuestion(slide, {
    x: 0.88, y: 2.08, w: 10.26, h: 1.24,
    badge: "01",
    question: "¿Por qué una query SQL o stack trace no debería aparecer en una respuesta pública?",
    hint: "relaciona estructura interna, pistas para ataques y exposición de datos.",
    accent: C.navy,
    fill: C.softBlue,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 3.62, w: 10.26, h: 1.24,
    badge: "02",
    question: "¿Qué diferencia hay entre registrar un error en logs y mostrarlo al usuario?",
    hint: "piensa en audiencias distintas y niveles de detalle distintos.",
    accent: C.red,
    fill: C.paleRed,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 5.16, w: 10.26, h: 1.24,
    badge: "03",
    question: "¿Qué prueba negativa harías para verificar que una compra no acepta `usuario_id` del cliente?",
    hint: "envía un payload manipulado y revisa respuesta, logs y base de datos.",
    accent: C.gold,
    fill: C.warningSoft,
  });
  validateSlide(slide, pptx);
}

function createFinalLayersSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Mapa Final de Capas Defensivas", "La seguridad se acumula en cada frontera", "Cierre");
  const layers = [
    { title: "Entrada", body: "Validar.", accent: C.navy },
    { title: "SQL", body: "Parametrizar.", accent: C.red },
    { title: "Identidad", body: "Autenticar.", accent: C.gold },
    { title: "Recurso", body: "Autorizar.", accent: C.red },
    { title: "Error", body: "No filtrar.", accent: C.navy },
  ];
  layers.forEach((layer, i) => {
    addMiniCard(slide, SH, {
      x: 0.72 + i * 2.18, y: 2.62, w: 1.92, h: 2.28,
      title: layer.title,
      body: layer.body,
      accent: layer.accent,
      fill: C.white,
      line: layer.accent,
      titleFontSize: 13.2,
      bodyFontSize: 10.2,
    });
    if (i < layers.length - 1) {
      slide.addShape(SH.line, { x: 2.72 + i * 2.18, y: 3.74, w: 0.34, h: 0, line: { color: C.slate, pt: 1.1, endArrowType: "triangle" } });
    }
  });
  addCenterStatement(slide, SH, "Una app defendible no depende de una sola barrera.", {
    x: 0.88, y: 5.72, w: 10.26, h: 0.58,
    fill: C.navy, color: C.white, fontSize: 17.4, bold: true,
  });
  validateSlide(slide, pptx);
}

function createFinalChecklistSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Checklist Antes de Entregar un CRUD", "Diez preguntas mínimas antes de decir “listo”", "Cierre");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.06, w: 10.26, h: 4.78, title: "Control final",
    columns: 2,
    entries: [
      { badge: "1", title: "Backend valida", body: "Obligatorios, tipos, formatos y rangos.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "2", title: "SQL parametrizado", body: "Sin concatenación de entradas.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "3", title: "Identidad verificada", body: "Sesión/token, no user_id desde cliente.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "4", title: "Permisos revisados", body: "Dueño, rol, estado y acción permitida.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "5", title: "Errores seguros", body: "Sin SQL, rutas, stack traces ni secretos.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "6", title: "Pruebas negativas", body: "Casos inválidos realmente ejecutados.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ],
  });
  validateSlide(slide, pptx);
}

function createWorksToResistsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "De “Funciona” a “Resiste”", "El estándar sube cuando hay datos reales", "Cierre");
  addReadableColumn(slide, {
    x: 0.88, y: 2.12, w: 4.96, h: 4.34,
    title: "Funciona",
    subtitle: "Caso feliz",
    items: ["Formulario envía.", "API responde.", "SQL guarda.", "Demo se ve bien."],
    accent: C.gold,
    fill: C.warningSoft,
  });
  addReadableColumn(slide, {
    x: 6.18, y: 2.12, w: 4.96, h: 4.34,
    title: "Resiste",
    subtitle: "Criterio profesional",
    items: ["Rechaza basura.", "Controla permisos.", "No filtra errores.", "Prueba fallos."],
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createWeek8BridgeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Puente a Semana 08", "SQL intermedio sobre una base más segura", "Cierre");
  addCenterStatement(slide, SH, "La próxima semana las consultas serán más potentes: joins, agregaciones y conexión aplicación-base de datos. La seguridad de hoy será la base para usarlas con criterio.", {
    x: 0.88, y: 2.08, w: 10.26, h: 1.36,
    fill: C.navy, color: C.white, fontSize: 20, bold: true, rectRadius: 0.07,
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 4.06, w: 10.26, h: 2.48, title: "Lo que se arrastra a SQL intermedio",
    columns: 3,
    entries: [
      { badge: "JOIN", title: "Exposición", body: "Más tablas, más cuidado.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "AGG", title: "Volumen", body: "Más datos, más límites.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "APP", title: "Integración", body: "Más flujo, más validación.", accent: C.navy, fill: C.white, badgeFill: C.navy },
    ],
  });
  validateSlide(slide, pptx);
}

function createExitQuestionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Preguntas de Salida", "Cierre general de la clase", "Cierre");
  addFollowUpQuestion(slide, {
    x: 0.88, y: 2.02, w: 10.26, h: 1.24,
    badge: "01",
    question: "¿Qué control aplicarías primero si una API acepta cualquier JSON que le llega?",
    hint: "parte por validación de backend y separación de campos permitidos.",
    accent: C.navy,
    fill: C.softBlue,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 3.34, w: 10.26, h: 1.24,
    badge: "02",
    question: "¿Cuál es la diferencia entre parametrizar SQL y validar formato de entrada?",
    hint: "una defensa revisa el dato; la otra separa dato e instrucción.",
    accent: C.red,
    fill: C.paleRed,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 4.66, w: 10.26, h: 1.24,
    badge: "03",
    question: "¿Por qué login correcto no basta para permitir editar cualquier recurso?",
    hint: "falta autorización: dueño, rol, estado y acción.",
    accent: C.gold,
    fill: C.warningSoft,
  });
  addFollowUpQuestion(slide, {
    x: 0.88, y: 5.98, w: 10.26, h: 1.24,
    badge: "04",
    question: "¿Qué debería revisar un agente y qué debes comprobar tú antes de confiar en su sugerencia?",
    hint: "distingue auditoría sugerida de pruebas reales con datos y respuestas.",
    accent: C.navy,
    fill: C.softBlue,
  });
  validateSlide(slide, pptx);
}

function createFinalClosingSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addBarsMotif(slide, 0.88, 1.62, 1.5, C.gold);
  slide.addText("Seguridad aplicada:\ncriterio antes de ejecución", {
    x: 0.88, y: 2.72, w: 9.9, h: 1.18,
    fontFace: TYPOGRAPHY.display, fontSize: 39, bold: true, color: C.white, margin: 0,
  });
  slide.addText("Una aplicación profesional no solo guarda datos: controla quién entra, qué cambia, qué expone y cómo falla.", {
    x: 0.88, y: 4.18, w: 9.6, h: 0.56,
    fontFace: TYPOGRAPHY.body, fontSize: 15.8, color: C.white, margin: 0,
  });
  addCenterStatement(slide, SH, "Próxima clase: SQL intermedio, joins y agregaciones.", {
    x: 0.88, y: 5.82, w: 10.26, h: 0.62,
    fill: C.gold, color: C.navy, fontSize: 17.2, bold: true,
  });
  validateSlide(slide, pptx);
}

function main() {
  createCoverSlide();
  createWeekRouteSlide();
  createWorksButUnsafeSlide();
  createAttackSurfaceSlide();
  createObjectivesSlide();
  createDeckMapSlide();
  createSqlBridgeSlide();

  createBlock1OpeningSlide();
  createEntryBoundarySlide();
  createMalformedInputsSlide();
  createValidationLayersSlide();
  createRequiredIsNotSecuritySlide();
  createValidationDimensionsSlide();
  createPurchaseValidationCodeSlide();
  createNormalizeSanitizeValidateSlide();
  createClientPowerSlide();
  createSafePayloadSlide();
  createAiPayloadReviewerSlide();
  createBlock1SynthesisSlide();
  createBlock1QuestionsSlide();

  createBlock2OpeningSlide();
  createSqlInjectionDefinitionSlide();
  createVulnerableConcatSlide();
  createLoginPayloadSlide();
  createInjectionMechanismSlide();
  createImpactZonesSlide();
  createCrudSqlRiskSlide();
  createParameterizedQuerySlide();
  createInstructionVsValuesSlide();
  createValidationNotParamSlide();
  createDynamicOrderProblemSlide();
  createAllowlistOrderSlide();
  createLeastPrivilegeDbSlide();
  createAgentSqlAuditSlide();
  createBlock2SynthesisSlide();
  createBlock2QuestionsSlide();

  createBlock3OpeningSlide();
  createAuthVsAuthorizationSlide();
  createLoginFlowSlide();
  createPasswordStorageSlide();
  createNoSecretLogsSlide();
  createSessionsTokensSlide();
  createUserIdFromClientRiskSlide();
  createProtectedRouteSlide();
  createResourceAuthorizationSlide();
  createNotFoundVsForbiddenSlide();
  createRolesPermissionsSlide();
  create401403Slide();
  createAuthCommonErrorsSlide();
  createAgentAuthReviewSlide();
  createBlock3SynthesisSlide();
  createBlock3QuestionsSlide();

  createBlock4OpeningSlide();
  createErrorCommunicatesSlide();
  createDangerousErrorSlide();
  createSafeErrorAndLogSlide();
  createHttpErrorCodesSlide();
  createLoginEnumerationSlide();
  createDatabaseErrorExposureSlide();
  createHardeningChecklistSlide();
  createNegativeTestsSlide();
  createCurlNegativePayloadSlide();
  createAgentSecurityQaSlide();
  createBlock4SynthesisSlide();
  createBlock4QuestionsSlide();

  createFinalLayersSlide();
  createFinalChecklistSlide();
  createWorksToResistsSlide();
  createWeek8BridgeSlide();
  createExitQuestionsSlide();
  createFinalClosingSlide();

  pptx
    .writeFile({ fileName: outputPptx })
    .then(() => {
      console.log(`PPTX final generado: ${outputPptx}`);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

main();
