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
  addMarkBox,
  addChip,
  addStageChain,
  addMythRealityGrid,
  addChecklistGrid,
  addPromptQualityCompare,
  addDelegationSplit,
  addAgentOrchestrationDiagram,
  addMcpBridgePanel,
  addToolExecutionConsole,
  addValidationLayerRadar,
  addAgentReasoningLoop,
} = components;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
applyAiepTheme(pptx, {
  author: "Diego Obando",
  company: "AIEP",
  subject: "Clase 15",
  title: "Agentes de IA en Desarrollo",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx =
  process.env.PPTX_OUTPUT ||
  path.join(rootDir, "Clase-15-Agentes-IA-en-Desarrollo.pptx");
const outputJs =
  process.env.PPTX_SOURCE_OUTPUT ||
  path.join(rootDir, "Clase-15-Agentes-IA-en-Desarrollo.js");

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
    mark: {
      x: 12.74,
      y: 1.04,
      w: 0.28,
      h: 0.28,
    },
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

function addObjectiveRows(slide, rows) {
  rows.forEach((row, i) => {
    const y = 2.22 + i * 1.42;
    slide.addText(row.n, {
      x: 0.88,
      y,
      w: 0.8,
      h: 0.8,
      fontFace: TYPOGRAPHY.display,
      fontSize: 32,
      bold: true,
      color: C.red,
      margin: 0,
    });
    slide.addText(row.t, {
      x: 1.8,
      y: y + 0.08,
      w: 8.86,
      h: 0.32,
      fontFace: TYPOGRAPHY.display,
      fontSize: 17.4,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(row.b, {
      x: 1.8,
      y: y + 0.42,
      w: 8.86,
      h: 0.32,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.2,
      color: C.slate,
      margin: 0,
    });
  });
}

// Intro

function createCoverSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  slide.addImage({ path: logoPath, x: 0.88, y: 0.62, w: 1.18, h: 0.42 });
  addBarsMotif(slide, 0.88, 1.78, 1.4, C.red);
  slide.addText("Agentes de IA en Desarrollo", {
    x: 2.08,
    y: 2.58,
    w: 8.94,
    h: 0.78,
    fontFace: TYPOGRAPHY.display,
    fontSize: 30,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  slide.addText("Prompting, generación y revisión crítica", {
    x: 2.08,
    y: 3.42,
    w: 8.94,
    h: 1.1,
    fontFace: TYPOGRAPHY.display,
    fontSize: 42,
    bold: true,
    color: C.white,
    margin: 0,
    valign: "mid",
  });
  slide.addText("Semana 05 · Unidad 02 · Trabajo técnico con criterio", {
    x: 2.08,
    y: 4.54,
    w: 7.9,
    h: 0.34,
    fontFace: TYPOGRAPHY.body,
    fontSize: 17,
    color: "DCE6F2",
    bold: true,
    margin: 0,
  });
  addPanel(slide, 0.88, 5.82, 3.48, 0.42, { fill: "173A5A", line: "173A5A" });
  slide.addText("Clase 03 · Miércoles 15 de abril de 2026", {
    x: 1.04,
    y: 5.92,
    w: 3.22,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.4,
    color: "A8C4E0",
    margin: 0,
  });
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 5.8, w: 0.82, h: 0.82 });
  validateSlide(slide, pptx);
}

function createWeekContextSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Semana 5: de backend a agentes con criterio", "La progresión de esta semana no es accidental", "Contexto");
  addCenterStatement(
    slide,
    SH,
    "Lunes entendimos el backend. Martes modelamos datos. Hoy cerramos el ciclo aprendiendo a trabajar con agentes sin soltar el juicio técnico.",
    {
      x: 0.88,
      y: 2.22,
      w: 10.26,
      h: 1.02,
      fill: C.navy,
      line: C.navy,
      color: C.white,
      fontSize: 17.2,
      rectRadius: 0.08,
    }
  );
  const days = [
    {
      title: "Lunes 13/04",
      body: "Fundamentos de backend, FastAPI, contratos y flujo request-response.",
      accent: C.navy,
      fill: C.white,
    },
    {
      title: "Martes 14/04",
      body: "Persistencia, entidades, relaciones, cardinalidad y diseño de datos.",
      accent: C.gold,
      fill: C.softNeutral,
    },
    {
      title: "Miércoles 15/04",
      body: "Uso de agentes, prompting útil, revisión crítica, límites y verificación.",
      accent: C.red,
      fill: C.paleRed,
    },
  ];
  days.forEach((day, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44,
      y: 3.78,
      w: 3.2,
      h: 2.6,
      title: day.title,
      body: day.body,
      accent: day.accent,
      fill: day.fill,
      line: C.border,
      titleFontSize: 12.4,
      bodyFontSize: 10.2,
    });
  });
  validateSlide(slide, pptx);
}

function createCoreTensionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La tensión central de la clase", "Generar rápido no significa integrar bien", "Contexto");
  addCenterStatement(slide, SH, "El código generado por IA puede verse convincente, compilar y aun así estar mal para tu proyecto.", {
    x: 0.88,
    y: 2.16,
    w: 10.26,
    h: 0.96,
    fill: C.softBlue,
    line: C.softBlue,
    color: C.navy,
    fontSize: 18,
    rectRadius: 0.07,
  });
  const risks = [
    {
      title: "Parece correcto",
      body: "La salida suele sonar técnica y segura, incluso cuando inventa campos o reglas.",
      accent: C.navy,
    },
    {
      title: "Ahorra tiempo al inicio",
      body: "Una primera versión puede aparecer en segundos y dar sensación de avance.",
      accent: C.gold,
    },
    {
      title: "Puede romper el proyecto",
      body: "Si integras sin revisar, terminas aceptando errores de contrato, lógica o seguridad.",
      accent: C.red,
    },
  ];
  risks.forEach((risk, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44,
      y: 3.52,
      w: 3.2,
      h: 2.9,
      title: risk.title,
      body: risk.body,
      accent: risk.accent,
      fill: C.white,
      line: C.border,
      titleFontSize: 12.4,
      bodyFontSize: 10.1,
    });
  });
  validateSlide(slide, pptx);
}

function createObjectives1Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Objetivos de la clase (1/2)", "Qué deberías dominar al abrir la sesión", "Objetivos");
  addObjectiveRows(slide, [
    {
      n: "01",
      t: "Formular prompts técnicos efectivos",
      b: "Usar contexto, restricción y criterio de aceptación para obtener código más útil desde el primer intento.",
    },
    {
      n: "02",
      t: "Identificar los límites del agente",
      b: "Reconocer tipos incorrectos, lógica ausente, dependencias viejas y errores no declarados.",
    },
    {
      n: "03",
      t: "Revisar código generado con criterio técnico",
      b: "Validar contratos, reglas de negocio y comportamiento ante entradas inválidas.",
    },
  ]);
  validateSlide(slide, pptx);
}

function createObjectives2Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Objetivos de la clase (2/2)", "Qué deberías poder transferir a tu proyecto", "Objetivos");
  addObjectiveRows(slide, [
    {
      n: "04",
      t: "Integrar agentes en un flujo backend real",
      b: "Usar IA para modelos Pydantic, SQL y endpoints, contrastando siempre contra la especificación.",
    },
    {
      n: "05",
      t: "Documentar el uso de agentes",
      b: "Registrar qué fue generado, qué modificaste y por qué, como práctica de trazabilidad técnica.",
    },
    {
      n: "06",
      t: "Asumir responsabilidad profesional",
      b: "Entender que el código integrado sigue siendo responsabilidad del desarrollador, no del agente.",
    },
  ]);
  validateSlide(slide, pptx);
}

function createMindsetSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Mentalidad de trabajo para hoy", "Entender primero, pedir mejor, verificar siempre", "Competencias");
  addCenterStatement(slide, SH, "La IA apoya el trabajo técnico, pero no reemplaza lectura, validación ni criterio.", {
    x: 0.88,
    y: 2.18,
    w: 10.26,
    h: 0.82,
    fill: C.softNeutral,
    line: C.softNeutral,
    color: C.navy,
    fontSize: 17.2,
  });
  const competencies = [
    {
      title: "Juicio técnico",
      body: "Evaluar el output del agente con criterios propios y no por confianza ciega.",
      accent: C.navy,
    },
    {
      title: "Pensamiento especificado",
      body: "Traducir un requerimiento vago en una instrucción precisa y usable.",
      accent: C.red,
    },
    {
      title: "Responsabilidad del desarrollador",
      body: "Responder por el código que integras, aunque haya sido generado con asistencia.",
      accent: C.gold,
    },
  ];
  competencies.forEach((item, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44,
      y: 3.48,
      w: 3.2,
      h: 2.94,
      title: item.title,
      body: item.body,
      accent: item.accent,
      fill: C.white,
      line: C.border,
      titleFontSize: 12.6,
      bodyFontSize: 10.25,
    });
  });
  validateSlide(slide, pptx);
}

function createSessionMapSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Mapa de la sesión", "Cuatro movimientos para trabajar con agentes sin automatismo", "Mapa");
  addStageChain(slide, SH, {
    x: 0.88,
    y: 2.32,
    w: 10.26,
    h: 4.16,
    title: "Recorrido de aprendizaje",
    stages: [
      {
        step: "1",
        title: "Modelo mental",
        body: "Qué es un agente, qué no es y cuándo empieza a fallar.",
        accent: C.navy,
        fill: C.softBlue,
      },
      {
        step: "2",
        title: "Especificación",
        body: "Cómo escribir prompts técnicos con contexto y restricciones reales.",
        accent: C.red,
        fill: C.paleRed,
      },
      {
        step: "3",
        title: "Contexto de proyecto",
        body: "Por qué `AGENTS.md`, herramientas y contexto cambian el flujo de trabajo.",
        accent: C.gold,
        fill: C.softNeutral,
      },
      {
        step: "4",
        title: "Validación",
        body: "Cómo leer, revisar, corregir, integrar y documentar el código generado.",
        accent: C.navy,
        fill: C.white,
      },
    ],
    footer: "En este primer tramo construiremos el marco mental y el criterio base del bloque 1.",
  });
  validateSlide(slide, pptx);
}

// Block 1

function createBlock1IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 1", {
    x: 0.88,
    y: 0.68,
    w: 1.34,
    h: 0.34,
    fill: C.red,
    color: C.white,
    fontSize: 10.6,
  });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("El agente como herramienta\nde desarrollo", {
    x: 0.88,
    y: 2.1,
    w: 9.28,
    h: 1.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 37,
    bold: true,
    color: C.white,
    margin: 0,
    valign: "mid",
  });
  slide.addText("Qué es, qué no es y cómo encaja en un flujo backend real.", {
    x: 0.88,
    y: 3.52,
    w: 8.3,
    h: 0.38,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15.2,
    color: "DCE6F2",
    margin: 0,
  });
  addPanel(slide, 0.88, 5.84, 3.2, 0.4, { fill: "173A5A", line: "173A5A" });
  slide.addText("35 minutos · marco mental y criterios base", {
    x: 1.04,
    y: 5.92,
    w: 2.92,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.3,
    color: "A8C4E0",
    margin: 0,
  });
  validateSlide(slide, pptx);
}

function createWhatIsAgentSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "¿Qué es un agente en desarrollo?", "Bloque 1 · 1.1 Modelo base para usarlo con criterio", "Bloque 1");
  addCenterStatement(
    slide,
    SH,
    "Un agente es un modelo de lenguaje que razona sobre texto y código para producir respuestas coherentes con la instrucción que recibe.",
    {
      x: 0.88,
      y: 2.18,
      w: 10.26,
      h: 0.92,
      fill: C.navy,
      line: C.navy,
      color: C.white,
      fontSize: 17.2,
      rectRadius: 0.07,
    }
  );
  const notes = [
    {
      title: "No es buscador",
      body: "No parte consultando una web ni validando hechos por sí solo.",
      accent: C.navy,
    },
    {
      title: "No es corrector automático",
      body: "No entiende tu proyecto por arte de magia ni arregla lógica sin contexto.",
      accent: C.red,
    },
    {
      title: "Sí es colaborador textual",
      body: "Puede explicar, proponer, traducir y generar estructuras a partir de instrucciones.",
      accent: C.gold,
    },
  ];
  notes.forEach((note, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44,
      y: 3.58,
      w: 3.2,
      h: 2.78,
      title: note.title,
      body: note.body,
      accent: note.accent,
      fill: C.white,
      line: C.border,
      titleFontSize: 12.4,
      bodyFontSize: 10.2,
    });
  });
  validateSlide(slide, pptx);
}

function createCanCantSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Lo que hace bien y lo que no sabe", "Bloque 1 · 1.1 Capacidades reales versus límites reales", "Bloque 1");
  addDelegationSplit(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 4.48,
    title: "Capacidad técnica vs conocimiento del proyecto",
    left: {
      title: "Lo que puede hacer bien",
      subtitle: "Cuando la tarea está clara",
      items: [
        "Generar estructuras repetitivas: modelos, CRUD base, consultas SQL simples.",
        "Explicar código desconocido o traducir entre formatos y lenguajes.",
        "Proponer nombres, alternativas o primeras versiones para iterar.",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "Lo que no puede saber por sí solo",
      subtitle: "Si tú no se lo explicas",
      items: [
        "Las reglas de negocio reales de tu aplicación.",
        "La versión exacta de tus librerías y convenciones del repo.",
        "Qué está roto en tu código si no le muestras el contexto suficiente.",
      ],
      accent: C.red,
      fill: C.paleRed,
    },
    bridgeLabel: "Límite",
    bridgeBody: "sin contexto\ninventa",
    footer: "El agente puede programar. Lo que no puede hacer es adivinar tu proyecto.",
  });
  validateSlide(slide, pptx);
}

function createMythRealitySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Coherencia textual no es corrección técnica", "Bloque 1 · 1.1 El error más común al empezar", "Bloque 1");
  addMythRealityGrid(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 4.54,
    title: "Mitos que conviene romper temprano",
    entries: [
      {
        badge: "Mito",
        myth: "Si suena técnico, debe estar bien.",
        reality: "La salida puede ser coherente y aun así estar equivocada para tu caso.",
        accent: C.red,
        badgeFill: C.paleRed,
      },
      {
        badge: "Mito",
        myth: "El agente sabe qué stack uso.",
        reality: "Solo sabe lo que le indicaste de versión, librerías y contexto.",
        accent: C.red,
        badgeFill: C.paleRed,
      },
      {
        badge: "Mito",
        myth: "Si compila, ya sirve.",
        reality: "Todavía puede fallar en contrato, negocio, seguridad o convenciones.",
        accent: C.red,
        badgeFill: C.paleRed,
      },
      {
        badge: "Mito",
        myth: "La IA reemplaza mi revisión.",
        reality: "La revisión humana es justamente lo que vuelve útil al agente.",
        accent: C.red,
        badgeFill: C.paleRed,
      },
    ],
    footer: "La salida del agente debe leerse como propuesta de trabajo, no como verdad final.",
  });
  validateSlide(slide, pptx);
}

function createCollaboratorAnalogySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El modelo mental correcto", "Bloque 1 · 1.2 Un colaborador capaz, pero sin contexto", "Bloque 1");
  addCard(slide, SH, {
    x: 0.88,
    y: 2.18,
    w: 10.26,
    h: 1.62,
    title: "Piensa en un programador talentoso que lleva 10 minutos en la empresa",
    body: "Sabe programar, reconoce patrones y puede avanzar rápido. Pero todavía no conoce tus tablas, tus decisiones previas ni los criterios específicos del proyecto.",
    accent: C.navy,
    fill: C.white,
    line: C.border,
    titleFontSize: 15,
    bodyFontSize: 11.5,
  });
  addCenterStatement(slide, SH, "Sin contexto, el agente no completa: rellena. Y suele hacerlo con mucha confianza.", {
    x: 1.18,
    y: 4.18,
    w: 9.66,
    h: 0.9,
    fill: C.softNeutral,
    line: C.softNeutral,
    color: C.navy,
    fontSize: 17.4,
  });
  addMiniCard(slide, SH, {
    x: 0.88,
    y: 5.44,
    w: 10.26,
    h: 0.84,
    title: "La consecuencia práctica",
    body: "El tiempo que no inviertes en especificar al inicio termina apareciendo después como revisión, corrección y debugging.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 11.2,
    bodyFontSize: 10.5,
  });
  validateSlide(slide, pptx);
}

function createMissingContextSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "¿Qué contexto suele faltar?", "Bloque 1 · 1.2 Lo que tú sí debes poner sobre la mesa", "Bloque 1");
  const items = [
    {
      title: "Stack y versión",
      body: "Python 3.12, FastAPI, Pydantic v2, PostgreSQL, Supabase.",
      accent: C.navy,
    },
    {
      title: "Datos reales",
      body: "Nombres de tablas, campos, restricciones y contratos que ya existen.",
      accent: C.red,
    },
    {
      title: "Reglas de negocio",
      body: "Qué validaciones manda el dominio y qué está permitido o prohibido.",
      accent: C.gold,
    },
    {
      title: "Problema actual",
      body: "Qué falla, en qué archivo, con qué error y con qué comportamiento esperado.",
      accent: C.navy,
    },
  ];
  items.forEach((item, i) => {
    const x = 0.88 + (i % 2) * 5.14;
    const y = 2.28 + Math.floor(i / 2) * 2.1;
    addCard(slide, SH, {
      x,
      y,
      w: 4.98,
      h: 1.78,
      title: item.title,
      body: item.body,
      accent: item.accent,
      fill: C.white,
      line: C.border,
      titleFontSize: 13,
      bodyFontSize: 10.5,
    });
  });
  validateSlide(slide, pptx);
}

function createRolesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Tres roles útiles del agente", "Bloque 1 · 1.3 No todas las tareas se delegan igual", "Bloque 1");
  const roles = [
    {
      title: "Generador de estructura",
      body: "Útil para modelos Pydantic, SQL base, endpoints CRUD y esqueletos de proyecto.",
      accent: C.navy,
      fill: C.softBlue,
    },
    {
      title: "Revisor de código",
      body: "Sirve para detectar huecos lógicos, tipos dudosos o incoherencias con una especificación.",
      accent: C.red,
      fill: C.paleRed,
    },
    {
      title: "Traductor técnico",
      body: "Ayuda a pasar de pseudocódigo a Python, de DER a SQL o de texto a estructura técnica.",
      accent: C.gold,
      fill: C.softNeutral,
    },
  ];
  roles.forEach((role, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 3.44,
      y: 2.8,
      w: 3.2,
      h: 3.36,
      title: role.title,
      body: role.body,
      accent: role.accent,
      fill: role.fill,
      line: C.border,
      titleFontSize: 12.8,
      bodyFontSize: 10.45,
    });
  });
  validateSlide(slide, pptx);
}

function createRolesUseCasesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Cuándo usar cada rol en esta semana", "Bloque 1 · 1.3 Aplicado a FastAPI y Supabase", "Bloque 1");
  addStageChain(slide, SH, {
    x: 0.88,
    y: 2.34,
    w: 10.26,
    h: 4.26,
    title: "Casos concretos del módulo",
    stages: [
      {
        step: "A",
        title: "Generar",
        body: "Pedir un modelo de Usuario o un SQL base para tablas simples.",
        accent: C.navy,
        fill: C.softBlue,
      },
      {
        step: "B",
        title: "Revisar",
        body: "Entregar el código completo y pedir detección de tipos incorrectos o validaciones faltantes.",
        accent: C.red,
        fill: C.paleRed,
      },
      {
        step: "C",
        title: "Traducir",
        body: "Pasar de un DER visto en clase a un esquema SQL compatible con Supabase.",
        accent: C.gold,
        fill: C.softNeutral,
      },
    ],
    footer: "La clave no es usar más IA: es pedirle lo correcto para la etapa correcta.",
  });
  validateSlide(slide, pptx);
}

function createVaguePromptSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Caso de apertura: prompt vago", "Bloque 1 · 1.4 Cuando pides poco, recibes relleno", "Caso");
  addCodePanel(slide, SH, {
    x: 0.88,
    y: 2.24,
    w: 10.26,
    h: 2.64,
    title: "Pedido al agente",
    code: "crea un modelo para usuarios",
    fontSize: 18,
    titleFill: C.navy,
  });
  addMiniCard(slide, SH, {
    x: 0.88,
    y: 5.2,
    w: 10.26,
    h: 1.06,
    title: "Problema de fondo",
    body: "No hay stack, no hay contexto, no hay restricciones y tampoco hay criterio de uso. El agente llena vacíos con su mejor suposición.",
    accent: C.red,
    fill: C.paleRed,
    line: C.paleRed,
    titleFontSize: 11.3,
    bodyFontSize: 10.3,
  });
  validateSlide(slide, pptx);
}

function createSpecifiedPromptSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Caso de apertura: prompt especificado", "Bloque 1 · 1.4 Cuando la instrucción ya contiene ingeniería", "Caso");
  addPanel(slide, 0.88, 2.18, 10.26, 3.42, { fill: C.navy, line: C.navy, rectRadius: 0.04 });
  slide.addShape(SH.roundRect, {
    x: 1.02,
    y: 2.3,
    w: 9.98,
    h: 0.34,
    rectRadius: 0.03,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addText("Pedido al agente", {
    x: 1.14,
    y: 2.38,
    w: 9.72,
    h: 0.16,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText(
    "Crea un modelo Pydantic para Usuario (Python 3.12, BaseModel)\n" +
      "en un sistema de gestión de cursos.\n\n" +
      "Campos: nombre obligatorio, email válido obligatorio,\n" +
      "rut único obligatorio y fecha_nacimiento opcional.\n\n" +
      "Debe servir como schema de entrada para POST /usuarios.\n" +
      "No incluyas campo id; lo maneja la base de datos.",
    {
      x: 1.22,
      y: 2.84,
      w: 9.42,
      h: 2.26,
      fontFace: "Consolas",
      fontSize: 13.4,
      color: C.white,
      margin: 0,
      valign: "top",
      breakLine: false,
    }
  );
  slide.addText("Prompt con contexto + restricciones + uso esperado", {
    x: 1.22,
    y: 5.18,
    w: 9.2,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.8,
    color: "A8C4E0",
    margin: 0,
  });
  addMiniCard(slide, SH, {
    x: 0.88,
    y: 5.88,
    w: 10.26,
    h: 0.48,
    title: "Lo importante",
    body: "Este prompt ya define stack, entidad, tipos, uso del modelo y restricción explícita sobre el campo `id`.",
    accent: C.gold,
    fill: C.softNeutral,
    line: C.softNeutral,
    titleFontSize: 10.8,
    bodyFontSize: 10.2,
  });
  validateSlide(slide, pptx);
}

function createPromptCompareSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El mismo pedido, dos resultados esperables", "Bloque 1 · 1.4 La diferencia entre vaguedad y especificación", "Comparación");
  addPromptQualityCompare(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 4.46,
    title: "Prompt malo vs prompt útil",
    badTitle: "Prompt vago",
    badSubtitle: "Pide poco y delega demasiado",
    badPrompt: "crea un modelo para usuarios",
    badNotes: [
      "No define stack ni versión.",
      "No explica para qué se usará el modelo.",
      "No restringe campos inventados por el agente.",
    ],
    goodTitle: "Prompt especificado",
    goodSubtitle: "Da contexto, límites y uso esperado",
    goodPrompt:
      "Python 3.12 + Pydantic. Modelo Usuario para POST /usuarios, con campos, obligatoriedad y restricción sobre `id` ya definidos.",
    goodNotes: [
      "Entrega contexto técnico real.",
      "Anticipa restricciones concretas.",
      "Acerca el output a algo que sí puedes revisar y usar.",
    ],
    footer: "La lección no es 'escribir más'. Es especificar mejor para revisar mejor.",
  });
  validateSlide(slide, pptx);
}

function createBlock1EvidenceSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Al cierre del bloque 1 deberías poder...", "Bloque 1 · Evidencia esperada y puente al siguiente paso", "Síntesis");
  addChecklistGrid(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 3.72,
    title: "Resultado mínimo de aprendizaje",
    columns: 3,
    entries: [
      {
        badge: "01",
        title: "Explicar el error",
        body: "Decir por qué un prompt incompleto empuja al agente a inventar con confianza.",
        accent: C.navy,
        fill: C.softBlue,
        badgeFill: C.navy,
      },
      {
        badge: "02",
        title: "Detectar contexto faltante",
        body: "Reconocer qué datos, restricciones o reglas faltan en un pedido vago.",
        accent: C.red,
        fill: C.paleRed,
        badgeFill: C.red,
      },
      {
        badge: "03",
        title: "Clasificar la tarea",
        body: "Decidir si una tarea corresponde al rol de generador, revisor o traductor.",
        accent: C.gold,
        fill: C.softNeutral,
        badgeFill: "B8962A",
      },
    ],
    footer: "Bloque 2 -> ahora veremos cómo construir prompts técnicos que ya incluyan contexto, restricciones y criterio de aceptación.",
  });
  validateSlide(slide, pptx);
}

// Block 2

function createBlock2IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 2", {
    x: 0.88,
    y: 0.68,
    w: 1.34,
    h: 0.34,
    fill: C.red,
    color: C.white,
    fontSize: 10.6,
  });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("Anatomía de un Prompt Técnico", {
    x: 0.88,
    y: 2.1,
    w: 9.28,
    h: 1.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 37,
    bold: true,
    color: C.white,
    margin: 0,
    valign: "mid",
  });
  slide.addText("Cómo especificar para obtener código usable desde el primer intento.", {
    x: 0.88,
    y: 3.52,
    w: 8.3,
    h: 0.38,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15.2,
    color: "DCE6F2",
    margin: 0,
  });
  addPanel(slide, 0.88, 5.84, 3.2, 0.4, { fill: "173A5A", line: "173A5A" });
  slide.addText("35 minutos · precisión y especificación técnica", {
    x: 1.04,
    y: 5.92,
    w: 2.92,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.3,
    color: "A8C4E0",
    margin: 0,
  });
  validateSlide(slide, pptx);
}

function createFourComponentsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Los cuatro componentes críticos", "Bloque 2 · 2.1 La estructura mínima de una especificación", "Bloque 2");
  addChecklistGrid(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 4.54,
    title: "Un prompt técnico tiene 4 partes, no una",
    columns: 2,
    entries: [
      {
        badge: "CON",
        title: "Contexto",
        body: "¿En qué stack y versión trabajo? (Ej: Python 3.12, FastAPI 0.110).",
        accent: C.navy,
        fill: C.softBlue,
        badgeFill: C.navy,
      },
      {
        badge: "TSK",
        title: "Tarea",
        body: "¿Qué debe producir exactamente? (Ej: Crea un modelo para Pedido).",
        accent: C.navy,
        fill: C.softBlue,
        badgeFill: C.navy,
      },
      {
        badge: "RST",
        title: "Restricciones",
        body: "¿Qué NO debe hacer o incluir? (Ej: No uses id, no uses Optional).",
        accent: C.red,
        fill: C.paleRed,
        badgeFill: C.red,
      },
      {
        badge: "CRT",
        title: "Criterio de Aceptación",
        body: "¿Cómo sé que el código sirve? (Ej: Debe usarse en un POST).",
        accent: C.red,
        fill: C.paleRed,
        badgeFill: C.red,
      },
    ],
    footer: "Si falta alguna, el agente la inventa sin avisarte.",
  });
  validateSlide(slide, pptx);
}

function createComponentContextSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Componente 1: El Contexto", "Bloque 2 · 2.1 Por qué las versiones importan", "Bloque 2");
  addCenterStatement(slide, SH, "El contexto define las herramientas y reglas del juego. Sin él, el agente usa lo que conoce mejor.", {
    x: 0.88,
    y: 2.18,
    w: 10.26,
    h: 0.82,
    fill: C.softNeutral,
    line: C.softNeutral,
    color: C.navy,
    fontSize: 17.2,
  });
  const boxes = [
    { title: "Legacy", body: "Python 3.8\nOptional[List[str]]\nClases viejas", accent: C.red },
    { title: "Moderno", body: "Python 3.12\nlist[str] | None\nModelos optimizados", accent: C.navy },
  ];
  boxes.forEach((box, i) => {
    addCard(slide, SH, {
      x: 0.88 + i * 5.24,
      y: 3.2,
      w: 5.02,
      h: 2.8,
      title: box.title,
      body: box.body,
      accent: box.accent,
      fill: C.white,
      line: C.border,
      titleFontSize: 14,
      bodyFontSize: 12,
    });
  });
  validateSlide(slide, pptx);
}

function createComponentTaskSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Componente 2: La Tarea", "Bloque 2 · 2.1 Verbos de acción versus vaguedad", "Bloque 2");
  addChecklistGrid(slide, SH, {
    x: 0.88,
    y: 2.22,
    w: 10.26,
    h: 4.54,
    title: "Prefiere acciones concretas",
    columns: 2,
    entries: [
      { badge: "USE", title: "Genera", body: "Produce una estructura nueva desde cero.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "USE", title: "Refactoriza", body: "Mejora el código existente sin cambiar su función.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "NO", title: "Ayúdame con", body: "Demasiado vago. El agente no sabe si quieres código o charla.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "NO", title: "Arregla", body: "Incompleto. Requiere que describas el error y el comportamiento esperado.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
    ]
  });
  validateSlide(slide, pptx);
}

function createComponentRestrictionsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Componente 3: Las Restricciones", "Bloque 2 · 2.1 El arte de decir NO", "Bloque 2");
  addCenterStatement(slide, SH, "Las restricciones son cercas de seguridad que evitan que la IA tome caminos incorrectos.", {
    x: 0.88, y: 2.18, w: 10.26, h: 0.82, fill: C.red, color: C.white, fontSize: 17.2
  });
  const items = [
    { title: "No incluyas", body: "Campos automáticos (id, created_at), comentarios meta o logs innecesarios.", accent: C.navy },
    { title: "No uses", body: "Librerías externas pesadas si el lenguaje tiene soporte nativo.", accent: C.red },
    { title: "Estilo", body: "Sin preámbulos tipo '¡Claro! Aquí tienes el código'. Solo código puro.", accent: C.gold },
  ];
  items.forEach((item, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.2, w: 3.2, h: 2.8, title: item.title, body: item.body, accent: item.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 11
    });
  });
  validateSlide(slide, pptx);
}

function createComponentCriteriaSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Componente 4: Criterio de Aceptación", "Bloque 2 · 2.1 Definiendo el éxito", "Bloque 2");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.8, title: "¿Cómo debe verse el resultado final?",
    body: "Es la prueba unitaria del prompt. 'El código debe compilar con mypy', 'El modelo debe ser compatible con la tabla X de Supabase'.",
    accent: C.navy, fill: C.white, line: C.border
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 4.2, w: 10.26, h: 2.5, title: "Ejemplos de criterios útiles", columns: 2,
    entries: [
      { badge: "API", title: "Endpoint match", body: "Debe poder usarse como body de un POST /pedidos.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "DOC", title: "Trazabilidad", body: "Incluye comentarios breves sobre validaciones complejas.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createPedagogicalErrorSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Error pedagógico: vacíos con confianza", "Bloque 2 · 2.2 Qué sucede cuando no restringes", "Error");
  addPromptQualityCompare(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.46,
    title: "El agente rellena lo que tú omites",
    badTitle: "Prompt sin restricciones",
    badSubtitle: "Vago y permisivo",
    badPrompt: "crea un modelo Pydantic para un Pedido con productos y total",
    badNotes: [
      "El agente pone ID aunque no lo pediste.",
      "Usa tipos desactualizados (List, Optional).",
      "Inventa campos como 'estado' o 'fecha'.",
    ],
    goodTitle: "Problema generado",
    goodSubtitle: "Código que parece correcto pero no sirve",
    goodPrompt: "class Pedido(BaseModel):\n  id: Optional[int]\n  total: float\n  items: List[Item]\n  ...",
    goodNotes: [
      "No calza con tu arquitectura real.",
      "Acepta IDs que la DB debe generar.",
      "Requiere refactorización manual inmediata.",
    ],
    footer: "El agente no miente: rellena con su mejor suposición estadística.",
  });
  validateSlide(slide, pptx);
}

function createCodeAnalysisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Análisis crítico del código generado", "Bloque 2 · 2.2 Identificando el 'relleno' técnico", "Análisis");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Output problemático (Python)",
    code: `from typing import Optional, List
from pydantic import BaseModel

class Pedido(BaseModel):
    id: Optional[int]            # Problema: la DB genera el ID
    productos: List[Producto]    # Problema: sintaxis legacy (< 3.9)
    total: float
    estado: Optional[str]        # Problema: campo inventado
    fecha: Optional[str]         # Problema: tipo string en vez de datetime`,
    lang: "python", fontSize: 14
  });
  validateSlide(slide, pptx);
}

function createLessonFillingSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Lección: el agente no miente, rellena", "Bloque 2 · 2.2 La psicología del modelo de lenguaje", "Bloque 2");
  addCenterStatement(slide, SH, "La IA está entrenada para ser útil y coherente. El silencio en tu instrucción es una invitación a su creatividad.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.12, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.08
  });
  addCard(slide, SH, {
    x: 0.88, y: 3.6, w: 10.26, h: 2.8, title: "¿Cómo evitar el relleno?",
    body: "1. Identifica qué datos son obligatorios.\n2. Declara explícitamente qué campos NO quieres.\n3. Especifica el tipo de dato y la versión del lenguaje.\n4. Si el agente inventa algo, no es su culpa: es un vacío en tu especificación.",
    accent: C.red, fill: C.white, line: C.border, titleFontSize: 14, bodyFontSize: 12
  });
  validateSlide(slide, pptx);
}

function createDemoPromptSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Demo en vivo: del DER al SQL", "Bloque 2 · 2.3 Especificación real para Supabase", "Demo");
  addPanel(slide, 0.88, 2.18, 10.26, 3.42, { fill: C.navy, line: C.navy, rectRadius: 0.04 });
  slide.addText("Prompt de especificación completa", {
    x: 1.14, y: 2.38, w: 9.72, h: 0.16, fontFace: TYPOGRAPHY.body, fontSize: 10, bold: true, color: C.white, margin: 0,
  });
  slide.addText(
    "Tengo un sistema de cine con el siguiente modelo:\n" +
    "- PELÍCULA: id (PK, auto), título (text), duración (int)\n" +
    "- SALA: id (PK, auto), nombre (text), capacidad (int)\n" +
    "- FUNCIÓN: id (PK, auto), horario (timestamp), FKs a Película y Sala\n\n" +
    "Genera el SQL PostgreSQL para Supabase. Usa snake_case.\n" +
    "Incluye ON DELETE RESTRICT. No incluyas RLS ni triggers.",
    {
      x: 1.22, y: 2.84, w: 9.42, h: 2.26, fontFace: "Consolas", fontSize: 13.4, color: C.white, margin: 0, valign: "top"
    }
  );
  addMiniCard(slide, SH, {
    x: 0.88, y: 5.88, w: 10.26, h: 0.48, title: "Contexto compartido",
    body: "Estamos usando el modelo que diseñamos ayer para asegurar continuidad técnica.",
    accent: C.gold, fill: C.softNeutral, titleFontSize: 10.8, bodyFontSize: 10.2
  });
  validateSlide(slide, pptx);
}

function createDemoOutputSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Output esperado y correcto", "Bloque 2 · 2.3 SQL compatible con producción", "Demo");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "PostgreSQL Schema",
    code: `CREATE TABLE pelicula (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo TEXT NOT NULL
);

CREATE TABLE funcion (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    horario TIMESTAMP NOT NULL,
    pelicula_id BIGINT REFERENCES pelicula(id) ON DELETE RESTRICT
);`,
    lang: "sql", fontSize: 14
  });
  validateSlide(slide, pptx);
}

function createSocraticCheckpointSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Checkpoint socrático", "Bloque 2 · 2.4 Leer antes de ejecutar", "Reflexión");
  addMythRealityGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "¿Es suficiente el código generado?",
    entries: [
      { badge: "Q", myth: "¿Qué pasa si ejecuto primero la tabla 'funcion'?", reality: "Falla. PostgreSQL requiere que el padre (pelicula) exista antes que el hijo.", accent: C.red, badgeFill: C.paleRed },
      { badge: "Q", myth: "¿El agente avisó sobre el orden de ejecución?", reality: "No. Eso es responsabilidad técnica del desarrollador.", accent: C.red, badgeFill: C.paleRed },
      { badge: "Q", myth: "¿Debo modificar el prompt o el SQL si algo cambia?", reality: "Depende de la complejidad. Pequeños ajustes en SQL; grandes cambios en prompt.", accent: C.navy, badgeFill: C.softBlue },
    ]
  });
  validateSlide(slide, pptx);
}

function createPromptAdaptSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Adaptabilidad del Prompt", "Bloque 2 · 2.4 El prompt como documento vivo", "Bloque 2");
  addCenterStatement(slide, SH, "Si el negocio evoluciona, tu especificación técnica debe reflejarlo.", {
    x: 0.88, y: 2.18, w: 10.26, h: 0.82, fill: C.softNeutral, color: C.navy, fontSize: 17.2
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 3.2, w: 10.26, h: 3.5, title: "Cómo iterar una especificación", columns: 2,
    entries: [
      { badge: "STEP", title: "Añadir Entidad", body: "Actualiza la lista de entidades y sus relaciones.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "STEP", title: "Pedir Migración", body: "Pide específicamente el SQL para alterar tablas existentes (ALTER TABLE).", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "WARN", title: "Inconsistencia", body: "Si cambias el prompt a la mitad, revisa que no se rompan las FKs anteriores.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "GOAL", title: "Versión Final", body: "El prompt debe producir el esquema completo y coherente.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createGuideQuestionsB2Slide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 2", { x: 0.88, y: 0.44, w: 3.4, h: 0.3, fill: C.navy, color: C.white, fontSize: 10.0 });
  const questions = [
    { n: "01", text: "¿Cuáles son los 4 componentes de un prompt técnico y para qué sirve cada uno?" },
    { n: "02", text: "¿Qué significa que el agente 'rellena' los vacíos de una instrucción?" },
    { n: "03", text: "¿Por qué el orden de ejecución de un SQL generado es responsabilidad tuya y no de la IA?" },
  ];
  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, { x: 0.88, y: y + 0.04, w: 0.58, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.border, margin: 0, valign: "mid" });
    slide.addText(q.text, { x: 1.6, y, w: 8.72, h: 1.56, fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.navy, margin: 0, valign: "mid" });
    if (i < 2) slide.addShape(SH.line, { x: 0.88, y: y + 1.72, w: 10.28, h: 0, line: { color: C.border, pt: 1 } });
  });
  validateSlide(slide, pptx);
}

function createBlock2SynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 2", "La ingeniería del prompt", "Bloque 2");
  addCenterStatement(slide, SH, "Un prompt bien estructurado es la diferencia entre programar y solo chatear.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });
  const points = [
    { title: "Especificación", body: "Contexto, Tarea, Restricciones y Criterios.", accent: C.navy },
    { title: "Juicio Crítico", body: "Entender que la IA rellena huecos con suposiciones.", accent: C.red },
    { title: "Validación", body: "Revisar cada línea antes de considerarla código útil.", accent: C.gold },
  ];
  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06, title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });
  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.62, title: "Próximo Bloque → Agentes Integrados",
    body: "Dejaremos el 'Copiar y Pegar' para usar agentes que viven dentro de nuestro repositorio.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.gold, titleFontSize: 11, bodyFontSize: 10.4
  });
  validateSlide(slide, pptx);
}

// Block 3

function createReasoningLoopSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Bucle de Razonamiento (ReAct)", "Bloque 3 · 3.1 Cómo 'piensa' un agente", "Autonomía");
  addAgentReasoningLoop(slide, SH, {
    y: 2.6,
    title: "Ciclo: Pensamiento -> Acción -> Observación"
  });
  validateSlide(slide, pptx);
}

function createSurgicalContextSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Gestión de Contexto Quirúrgica", "Bloque 3 · 3.1 Eficiencia de Tokens", "Bloque 3");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Por qué el agente no lee archivos completos", columns: 2,
    entries: [
      { badge: "TOKEN", title: "Límite de Ventana", body: "Leer un archivo de 2000 líneas 'agota' la memoria del agente.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "READ", title: "start_line / end_line", body: "El agente solo lee las 20 líneas que le interesan para el fix.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "GREP", title: "Búsqueda Optimizada", body: "Usa herramientas de búsqueda en vez de scroll manual.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "SAVE", title: "Ahorro Cognitivo", body: "Menos ruido en el contexto = Mayor precisión en la respuesta.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createGeminiMdAnatomySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Anatomía de un GEMINI.md", "Bloque 3 · 3.2 Personalizando la IA", "Contexto");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Ejemplo de Mandatos de Ingeniería",
    code: `# Convenciones de Desarrollo
- Wholesale Rewrites Prohibited: Prohibido reescribir todo.
- Surgical Updates: Modificaciones quirúrgicas y puntuales.
- Hierarchy of Truth: 1. Cronograma, 2. README, 3. Código.`,
    lang: "markdown", fontSize: 14
  });
  validateSlide(slide, pptx);
}

function createMcpArchitectureSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Arquitectura MCP", "Bloque 3 · 3.3 La cadena de mando", "Infraestructura");
  const steps = [
    { t: "LLM", b: "Genera la intención técnica (JSON)." },
    { t: "Cliente MCP", b: "Tu CLI captura la intención." },
    { t: "Servidor MCP", b: "Software local que tiene el permiso." },
    { t: "Sistema", b: "Ejecución real (SQL, Bash, FS)." },
  ];
  steps.forEach((s, i) => {
    // Tarjetas con ancho reducido a 2.2 para dar aire a las flechas
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 3.2, w: 2.2, h: 3.0, title: s.t, body: s.b, accent: C.navy,
      fill: C.white, line: C.border, titleFontSize: 14, bodyFontSize: 10
    });
    // Flechas centradas en el gap de 0.4 entre tarjetas
    if (i < 3) {
      slide.addText("→", { 
        x: 0.88 + i * 2.6 + 2.2 + 0.05, 
        y: 4.4, 
        w: 0.3, 
        h: 0.4, 
        fontSize: 22, 
        bold: true, 
        color: C.red, 
        align: "center" 
      });
    }
  });
  validateSlide(slide, pptx);
}

function createDatabaseInspectorSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Inspector de Base de Datos", "Bloque 3 · 3.3 Caso de uso real", "Casos");
  addCenterStatement(slide, SH, "El agente usa el MCP de SQL para consultar el esquema real de Supabase antes de proponer código.", {
    x: 0.88, y: 2.18, w: 10.26, h: 0.82, fill: C.softNeutral, color: C.navy, fontSize: 16
  });
  addCodePanel(slide, SH, {
    x: 0.88, y: 3.2, w: 10.26, h: 3.56, title: "Llamada interna del agente",
    code: `SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users';`,
    lang: "sql", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createSelfCorrectionLoopSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Bucle de Autocorrección", "Bloque 3 · 3.4 Sin intervención humana", "Autocorrección");
  const steps = [
    { t: "1. Ejecutar", b: "Lanzar 'npm run build' vía Terminal MCP." },
    { t: "2. Leer", b: "Capturar el stack trace del error." },
    { t: "3. Corregir", b: "Localizar el archivo y aplicar el fix quirúrgico." },
    { t: "4. Validar", b: "Volver a ejecutar el build para confirmar éxito." },
  ];
  steps.forEach((s, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 3.2, w: 2.4, h: 3.0, title: s.t, body: s.b, accent: C.red,
      fill: C.white, line: C.border, titleFontSize: 14, bodyFontSize: 10
    });
  });
  validateSlide(slide, pptx);
}

function createReducingEntropySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Ejemplo Skill: Reducing-Entropy", "Bloque 3 · 3.5 Sesgo hacia la simplicidad", "Skills");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Regla de Oro de la Skill",
    code: `# Objective: Minimize total codebase size.
- Bias toward deletion over addition.
- Success is measured by final code amount, not effort.
- Prefer idiomatic language features over manual logic.`,
    lang: "markdown", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createMentalGraphSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Grafo Mental del Repositorio", "Bloque 3 · 3.5 Cómo 'entiendo' tu código", "Mapeo");
  addCenterStatement(slide, SH, "El Codebase Investigator construye un mapa de símbolos antes de proponer cambios.", {
    x: 0.88, y: 2.18, w: 10.26, h: 0.82, fill: C.navy, color: C.white, fontSize: 16
  });
  const nodes = [
    { t: "Dependencias", b: "Relación entre imports y archivos." },
    { t: "Arquitectura", b: "Identificación de patrones (MVC, Capas)." },
    { t: "Impacto", b: "¿Qué se rompe si cambio esta función?" },
  ];
  nodes.forEach((n, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.2, w: 3.2, h: 3.0, title: n.t, body: n.b, accent: C.gold,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 11
    });
  });
  validateSlide(slide, pptx);
}

function createTerminalSecuritySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Capas de Seguridad en Terminal", "Bloque 3 · 3.6 El Sandbox Operativo", "Seguridad");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Límites del Agente", columns: 2,
    entries: [
      { badge: "LOCK", title: "Protección .env", body: "El agente tiene prohibido leer o listar archivos de secretos.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "WARN", title: "Permisos de Escritura", body: "Cada 'write_file' genera un diff que tú debes aprobar.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "HALT", title: "Comandos Destructivos", body: "Operaciones tipo 'rm -rf' o 'drop table' requieren confirmación humana.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "AUDIT", title: "Logs de Sesión", body: "Cada comando ejecutado queda registrado para auditoría técnica.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createBlock3IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 3", {
    x: 0.88,
    y: 0.68,
    w: 1.34,
    h: 0.34,
    fill: C.red,
    color: C.white,
    fontSize: 10.6,
  });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("El Salto Agéntico", {
    x: 0.88,
    y: 2.1,
    w: 9.28,
    h: 1.18,
    fontFace: TYPOGRAPHY.display,
    fontSize: 37,
    bold: true,
    color: C.white,
    margin: 0,
    valign: "mid",
  });
  slide.addText("De copiar y pegar código a la orquestación total desde el repositorio.", {
    x: 0.88,
    y: 3.52,
    w: 8.3,
    h: 0.38,
    fontFace: TYPOGRAPHY.body,
    fontSize: 15.2,
    color: "DCE6F2",
    margin: 0,
  });
  addPanel(slide, 0.88, 5.84, 3.2, 0.4, { fill: "173A5A", line: "173A5A" });
  slide.addText("35 minutos · estado del arte en desarrollo", {
    x: 1.04,
    y: 5.92,
    w: 2.92,
    h: 0.2,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.3,
    color: "A8C4E0",
    margin: 0,
  });
  validateSlide(slide, pptx);
}

function createReasoningLoopSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Bucle de Razonamiento (ReAct)", "Bloque 3 · 3.1 Cómo 'piensa' un agente", "Autonomía");
  addAgentReasoningLoop(slide, SH, {
    y: 2.6,
    title: "Ciclo: Pensamiento -> Acción -> Observación"
  });
  validateSlide(slide, pptx);
}

function createLegacyChatSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El 'Legacy' del Chat Web", "Bloque 3 · 3.1 El problema del puente humano", "Bloque 3");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "¿Por que el chat es ineficiente?",
    left: {
      title: "IA en Navegador", subtitle: "Modo Chatbot",
      items: ["No ve tu estructura de carpetas.", "No sabe que librerías instalaste.", "Olvida el contexto al cerrar la pestaña."],
      accent: C.red, fill: C.paleRed
    },
    right: {
      title: "El Programador", subtitle: "Modo Puente",
      items: ["Copia y pega manualmente.", "Adapta tipos que la IA ignoró.", "Corrige errores de importación."],
      accent: C.gold, fill: C.white
    },
    bridgeLabel: "vs", bridgeBody: "desgaste\ncognitivo",
  });
  validateSlide(slide, pptx);
}

function createSurgicalContextSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Gestión de Contexto Quirúrgica", "Bloque 3 · 3.1 Eficiencia de Tokens", "Bloque 3");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Por qué el agente no lee archivos completos", columns: 2,
    entries: [
      { badge: "TOKEN", title: "Límite de Ventana", body: "Leer un archivo de 2000 líneas 'agota' la memoria del agente.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "READ", title: "start_line / end_line", body: "El agente solo lee las 20 líneas que le interesan para el fix.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "GREP", title: "Búsqueda Optimizada", body: "Usa herramientas de búsqueda en vez de scroll manual.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "SAVE", title: "Ahorro Cognitivo", body: "Menos ruido en el contexto = Mayor precisión en la respuesta.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createIntegratedAgentSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Agente como Proceso del Sistema", "Bloque 3 · 3.1 Integración Nativa", "Bloque 3");
  addCenterStatement(slide, SH, "Herramientas como Gemini CLI, Claude Code o Codex no son chats: son procesos que viven DENTRO de tu repo.", {
    x: 0.88, y: 2.18, w: 10.26, h: 0.82, fill: C.navy, color: C.white, fontSize: 17.2
  });
  const tech = [
    { title: "Gemini CLI", body: "Ejecución de tareas agénticas desde la terminal.", accent: C.red },
    { title: "Claude Code", body: "Agente con capacidades de lectura y escritura de archivos.", accent: C.red },
    { title: "Codex / Cursor", body: "Editores diseñados para la manipulación agéntica de código.", accent: C.red },
  ];
  tech.forEach((t, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.2, w: 3.2, h: 3.0, title: t.title, body: t.body, accent: t.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 11
    });
  });
  validateSlide(slide, pptx);
}

function createOrchestrationDiagramSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Orquestación del Ecosistema", "Bloque 3 · 3.2 La anatomía de un agente moderno", "Arquitectura");
  addAgentOrchestrationDiagram(slide, SH, {
    y: 2.6,
    title: "El Agente como Orquestador de Recursos"
  });
  validateSlide(slide, pptx);
}

function createInstitutionalMemorySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Memoria Institucional (.md)", "Bloque 3 · 3.2 Instrucciones persistentes", "Bloque 3");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Los Archivos de Contexto", columns: 2,
    entries: [
      { badge: "GEMINI", title: "GEMINI.md", body: "Reglas de build, estilo pedagógico y convenciones Node/TS.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "CLAUDE", title: "CLAUDE.md", body: "Comandos del repo, stack tecnológico y flujo de trabajo.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "ONBOARD", title: "Autónomo", body: "El agente hace su propio 'onboarding' leyendo estos archivos.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "GOAL", title: "Sin Repetición", body: "No tienes que explicar el proyecto en cada nueva instrucción.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createGeminiMdAnatomySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Anatomía de un GEMINI.md", "Bloque 3 · 3.2 Personalizando la IA", "Contexto");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Ejemplo de Mandatos de Ingeniería",
    code: `# Convenciones de Desarrollo
- Wholesale Rewrites Prohibited: Prohibido reescribir todo.
- Surgical Updates: Modificaciones quirúrgicas y puntuales.
- Hierarchy of Truth: 1. Cronograma, 2. README, 3. Código.`,
    lang: "markdown", fontSize: 14
  });
  validateSlide(slide, pptx);
}

function createMcpDefinitionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "MCP: El Protocolo de Conexión", "Bloque 3 · 3.3 Rompiendo la barrera del texto", "Bloque 3");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.8, title: "¿Qué es Model Context Protocol?",
    body: "Es un estándar que permite a un modelo de lenguaje interactuar con herramientas del mundo real (archivos, terminal, bases de datos) sin que el humano actúe de intermediario.",
    accent: C.gold, fill: C.white, line: C.border
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 4.2, w: 10.26, h: 2.5, title: "Capacidades MCP", columns: 2,
    entries: [
      { badge: "READ", title: "Filesystem", body: "Lee y escribe archivos quirúrgicamente en tu disco.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "EXEC", title: "Terminal", body: "Ejecuta tests y comandos de compilación automáticamente.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createMcpArchitectureSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Arquitectura MCP", "Bloque 3 · 3.3 La cadena de mando", "Infraestructura");
  const steps = [
    { t: "LLM", b: "Genera la intención técnica (JSON)." },
    { t: "Cliente MCP", b: "Tu CLI captura la intención." },
    { t: "Servidor MCP", b: "Software local que tiene el permiso." },
    { t: "Sistema", b: "Ejecución real (SQL, Bash, FS)." },
  ];
  steps.forEach((s, i) => {
    // Tarjetas con ancho reducido a 2.2 para dar aire a las flechas
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 3.2, w: 2.2, h: 3.0, title: s.t, body: s.b, accent: C.navy,
      fill: C.white, line: C.border, titleFontSize: 14, bodyFontSize: 10
    });
    // Flechas centradas en el gap de 0.4 entre tarjetas
    if (i < 3) {
      slide.addText("→", { 
        x: 0.88 + i * 2.6 + 2.2 + 0.05, 
        y: 4.4, 
        w: 0.3, 
        h: 0.4, 
        fontSize: 22, 
        bold: true, 
        color: C.red, 
        align: "center" 
      });
    }
  });
  validateSlide(slide, pptx);
}

function createDatabaseInspectorSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Inspector de Base de Datos", "Bloque 3 · 3.3 Caso de uso real", "Casos");
  addCenterStatement(slide, SH, "El agente usa el MCP de SQL para consultar el esquema real de Supabase antes de proponer código.", {
    x: 0.88, y: 2.18, w: 10.26, h: 0.82, fill: C.softNeutral, color: C.navy, fontSize: 16
  });
  addCodePanel(slide, SH, {
    x: 0.88, y: 3.2, w: 10.26, h: 3.56, title: "Llamada interna del agente",
    code: `SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users';`,
    lang: "sql", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createMcpBridgeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Visualizando el Puente MCP", "Bloque 3 · 3.3 De la predicción a la acción", "Protocolo");
  addMcpBridgePanel(slide, SH, {
    y: 2.6,
    title: "Conexión Lenguaje <-> Acción"
  });
  validateSlide(slide, pptx);
}

function createMcpUseCasesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Capacidades MCP Reales", "Bloque 3 · 3.3 Ejemplos en vivo", "Bloque 3");
  addMythRealityGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Lo que el agente hace por ti",
    entries: [
      { badge: "DB", myth: "¿Cómo se llama la tabla?", reality: "Consultar Supabase directamente vía SQL MCP.", accent: C.navy, badgeFill: C.softBlue },
      { badge: "COMP", myth: "¿Compila mi cambio?", reality: "Correr 'npm run build' y leer el error real.", accent: C.navy, badgeFill: C.softBlue },
      { badge: "NAV", myth: "¿Se ve bien el CSS?", reality: "Usar Playwright para sacar un screenshot y analizarlo.", accent: C.navy, badgeFill: C.softBlue },
      { badge: "FILES", myth: "¿Dónde está el error?", reality: "Grep search en todo el proyecto en milisegundos.", accent: C.navy, badgeFill: C.softBlue },
    ]
  });
  validateSlide(slide, pptx);
}

function createSlashCommandsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "De la Charla a la Acción", "Bloque 3 · 3.4 Slash Commands operativos", "Bloque 3");
  addCenterStatement(slide, SH, "En una CLI agéntica, los comandos activan cadenas de razonamiento complejas.", {
    x: 0.88, y: 2.18, w: 10.26, h: 0.82, fill: C.softBlue, color: C.navy, fontSize: 17.2
  });
  const commands = [
    { title: "/init", body: "Analiza el repo y crea archivos de contexto.", accent: C.red },
    { title: "/test", body: "Descubre, ejecuta y repara tests fallidos.", accent: C.red },
    { title: "/fix", body: "Propone una solución incremental a un bug reportado.", accent: C.red },
  ];
  commands.forEach((c, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.2, w: 3.2, h: 3.0, title: c.title, body: c.body, accent: c.accent,
      fill: C.white, line: C.border, titleFontSize: 18
    });
  });
  validateSlide(slide, pptx);
}

function createToolExecutionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Simulacro de Ejecución", "Bloque 3 · 3.4 El agente llamando a una herramienta", "Acción");
  addToolExecutionConsole(slide, SH, {
    y: 2.6,
    command: "> /test --dir=clases/semana-05/02",
    params: { target: "ppt-validation", mode: "strict" },
    result: "Success: All slides passed structural integrity (.NET validator)."
  });
  validateSlide(slide, pptx);
}

function createSkillsDefinitionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Skills: Tu Manual de Procedimientos", "Bloque 3 · 3.5 Especialización bajo demanda", "Bloque 3");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Skills locales en .agent/skills/", columns: 2,
    entries: [
      { badge: "DESIGN", title: "clase-design", body: "Instrucciones para estructurar clases pedagógicamente.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "SLIDES", title: "slides-aiep", body: "Dirección visual institucional y reglas de diseño.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "COMMS", title: "cohort-comms", body: "Redacción de mensajes para WhatsApp y cohorte.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "EVAL", title: "evaluacion-design", body: "Creación de rúbricas y criterios de evaluación.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
    ]
  });
  validateSlide(slide, pptx);
}

function createSubAgentsSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Sub-Agentes: La Fuerza Especial", "Bloque 3 · 3.5 Orquestación y delegación", "Bloque 3");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Delegación técnica",
    left: {
      title: "Agente Generalista", subtitle: "Orquestador",
      items: ["Entiende tu requerimiento natural.", "Decide a quién llamar.", "Sintetiza el resultado final."],
      accent: C.navy, fill: C.softBlue
    },
    right: {
      title: "Sub-Agentes", subtitle: "Especialistas",
      items: ["Codebase Investigator: Mapea el repo.", "Generalist: Refactorización masiva.", "Sub-bots especializados."],
      accent: C.red, fill: C.white
    },
    bridgeLabel: "→", bridgeBody: "divide y\nvenceras",
  });
  validateSlide(slide, pptx);
}

function createIntegritySecuritySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Seguridad y 'Axioma de Integridad'", "Bloque 3 · Ética y responsabilidad", "Bloque 3");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Reglas de Misión Crítica", columns: 2,
    entries: [
      { badge: "AXIOMA", title: "Integridad Técnica", body: "Prohibido reescribir todo. Siempre ediciones quirúrgicas.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "SECRET", title: "Protección de Datos", body: "El agente no debe leer .env ni claves de API.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "HUMAN", title: "Validación Final", body: "El agente propone, el humano aprueba el diff.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "TRACE", title: "Trazabilidad", body: "Todo cambio generado debe ser documentado.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createGuideQuestionsB3Slide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 3", { x: 0.88, y: 0.44, w: 3.4, h: 0.3, fill: C.navy, color: C.white, fontSize: 10.0 });
  const questions = [
    { n: "01", text: "¿Por qué un CLAUDE.md bien escrito ahorra 20 minutos de prompting?" },
    { n: "02", text: "¿Qué capacidad le otorga un MCP de Supabase al agente que antes era imposible?" },
    { n: "03", text: "¿En qué se diferencia una Skill de una instrucción de chat normal?" },
  ];
  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, { x: 0.88, y: y + 0.04, w: 0.58, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.border, margin: 0, valign: "mid" });
    slide.addText(q.text, { x: 1.6, y, w: 8.72, h: 1.56, fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.navy, margin: 0, valign: "mid" });
    if (i < 2) slide.addShape(SH.line, { x: 0.88, y: y + 1.72, w: 10.28, h: 0, line: { color: C.border, pt: 1 } });
  });
  validateSlide(slide, pptx);
}

function createBlock3SynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 3", "Orquestadores de Sistemas Agénticos", "Bloque 3");
  addCenterStatement(slide, SH, "Dejamos de ser usuarios de chat para ser arquitectos que orquestan agentes integrados.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });
  const points = [
    { title: "Integración", body: "El agente vive en el repositorio y lee tu código real.", accent: C.navy },
    { title: "Capacidad", body: "MCP permite al agente tocar terminal, archivos y bases de datos.", accent: C.red },
    { title: "Control", body: "Skills y Axiomas definen cómo debe trabajar la IA.", accent: C.gold },
  ];
  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06, title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });
  validateSlide(slide, pptx);
}

// Block 4

function createBlock4IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 4", {
    x: 0.88, y: 0.68, w: 1.34, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6,
  });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("El Juicio Humano", {
    x: 0.88, y: 2.1, w: 9.28, h: 1.18,
    fontFace: TYPOGRAPHY.display, fontSize: 37, bold: true, color: C.white, margin: 0, valign: "mid",
  });
  slide.addText("Validación, Integración y Trazabilidad: El desarrollador como auditor crítico.", {
    x: 0.88, y: 3.52, w: 8.3, h: 0.38,
    fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2", margin: 0,
  });
  validateSlide(slide, pptx);
}

function createIllusionOfAccuracySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Ilusión de la Precisión", "Bloque 4 · 4.1 Por qué la IA falla en formas extrañas", "Riesgos");
  addCenterStatement(slide, SH, "Los LLMs no 'entienden' tu código; predicen patrones estadísticos. Un cambio en la atención puede causar fallos catastróficos.", {
    x: 0.88, y: 2.18, w: 10.26, h: 0.82, fill: C.red, color: C.white, fontSize: 17.2
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 3.2, w: 10.26, h: 3.5, title: "Sesgos comunes del agente", columns: 2,
    entries: [
      { badge: "HAPPY", title: "Happy Path Bias", body: "La IA asume que nada fallará (no incluye try/except o validaciones).", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "CONF", title: "Exceso de Confianza", body: "Inventa parámetros o librerías si no recuerda el nombre exacto.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "DRIFT", title: "Deriva de Atención", body: "En tareas largas, olvida las restricciones del inicio del prompt.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "LAZY", title: "Pereza Técnica", body: "Sustituye lógica compleja por '... (implementar aquí)'.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
    ]
  });
  validateSlide(slide, pptx);
}

function createRewriteTrapSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La 'Trampa de la Reescritura'", "Bloque 4 · 4.1 Diagnóstico de un error común", "Integridad");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.8, title: "El error: 'Borraré todo y lo haré de nuevo'",
    body: "Ocurre cuando el agente pierde el hilo del contexto o intenta 'simplificar' un bug difícil. El resultado suele ser código incompleto y regresiones masivas.",
    accent: C.red, fill: C.white, line: C.border
  });
  addCodePanel(slide, SH, {
    x: 0.88, y: 4.2, w: 10.26, h: 2.5, title: "Antídoto: Axioma de Integridad",
    code: `REGLA DE ORO:
- Prohibido borrar archivos completos para solucionar bugs.
- Solo ediciones quirúrgicas (replace/append).
- Si el agente propone reescribir, detente y revisa el prompt.`,
    lang: "text", fontSize: 14
  });
  validateSlide(slide, pptx);
}

function createWildAnimalAnalogySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Domando a la Entidad", "Bloque 4 · 4.2 La IA como animal salvaje", "Metodología");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Navegando con Agentes",
    left: {
      title: "El Peligro", subtitle: "Sin arneses",
      items: ["Delegar sin supervisión.", "Aceptar cambios sin leer el diff.", "Dar instrucciones vagas."],
      accent: C.red, fill: C.paleRed
    },
    right: {
      title: "La Maestría", subtitle: "Con control técnico",
      items: ["Usar MCPs para que la IA vea la realidad.", "Definir Skills específicas.", "Aplicar el Axioma de Integridad."],
      accent: C.navy, fill: C.softBlue
    },
    bridgeLabel: "practice", bridgeBody: "domar la\npotencia",
  });
  validateSlide(slide, pptx);
}

function createValidationRadarSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Monitor de Validación de 4 Capas", "Bloque 4 · 4.3 Checklist de Ingeniería", "Validación");
  addValidationLayerRadar(slide, SH, {
    y: 2.6,
    title: "Auditoría Sistemática de Código Generado",
    layers: [
      { name: "TIPOS", status: "FAIL", desc: "Uso de 'Any' o tipos legacy. No compila con Mypy.", color: "FF5F56" },
      { name: "LOGICA", status: "WARN", desc: "Faltan validaciones de negocio en Supabase.", color: "FFBD2E" },
      { name: "SEGURIDAD", status: "OK", desc: "No hay secrets ni credenciales expuestas.", color: "27C93F" },
      { name: "CONVENCIÓN", status: "OK", desc: "Sigue las reglas de GEMINI.md.", color: "27C93F" },
    ]
  });
  validateSlide(slide, pptx);
}

function createTraceabilitySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Trazabilidad: ¿Quién escribió esto?", "Bloque 4 · 4.4 Documentación y Auditoría", "Integración");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 1.4, title: "Responsabilidad Técnica",
    body: "Si integras código de IA, tú eres el autor legal y técnico. Debes poder explicar cada línea.",
    accent: C.navy, fill: C.white, line: C.border
  });
  addCodePanel(slide, SH, {
    x: 0.88, y: 3.82, w: 10.26, h: 2.94, title: "Commit Message con IA",
    code: `feat: add product validation schema
- Implemented Pydantic models for Supabase integration.
- AI-assisted: Initial schema generation by Gemini CLI.
- Human-validated: Adjusted UUID types and added gt=0 constraint.
- Verified: Manual tests passed in local environment.`,
    lang: "text", fontSize: 13
  });
  validateSlide(slide, pptx);
}

function createWeeklySynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Resumen Semanal de Integración", "Semana 05 · El Backend Moderno", "Síntesis");
  const days = [
    { t: "Lunes: Arquitectura", b: "Entendimos el Servidor, HTTP y las Capas." },
    { t: "Martes: Modelado", b: "Diseñamos DERs y Normalización en Postgres." },
    { t: "Miércoles: Agentes", b: "Orquestamos IAs para acelerar el desarrollo." },
  ];
  days.forEach((d, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 2.22, w: 3.2, h: 4.54, title: d.t, body: d.b, accent: C.red,
      fill: C.white, line: C.border, titleFontSize: 14, bodyFontSize: 12
    });
  });
  validateSlide(slide, pptx);
}

function createGuideQuestionsB4Slide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.warm };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "PREGUNTAS GUÍA — BLOQUE 4", { x: 0.88, y: 0.44, w: 3.4, h: 0.3, fill: C.navy, color: C.white, fontSize: 10.0 });
  const questions = [
    { n: "01", text: "¿Qué fenómeno en la IA provoca la 'Trampa de la Reescritura'?" },
    { n: "02", text: "¿Cuáles son las 4 capas del radar de validación que debemos aplicar?" },
    { n: "03", text: "¿Por qué documentar la ayuda de la IA en los commits es una buena práctica de ingeniería?" },
  ];
  questions.forEach((q, i) => {
    const y = 1.12 + i * 1.96;
    slide.addText(q.n, { x: 0.88, y: y + 0.04, w: 0.58, h: 0.68, fontFace: TYPOGRAPHY.display, fontSize: 38, bold: true, color: C.border, margin: 0, valign: "mid" });
    slide.addText(q.text, { x: 1.6, y, w: 8.72, h: 1.56, fontFace: TYPOGRAPHY.body, fontSize: 15.6, color: C.navy, margin: 0, valign: "mid" });
    if (i < 2) slide.addShape(SH.line, { x: 0.88, y: y + 1.72, w: 10.28, h: 0, line: { color: C.border, pt: 1 } });
  });
  validateSlide(slide, pptx);
}

function createFinalClassSynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis Final: La Nueva Era", "Cierre de Clase · Del chat a la orquestación", "Cierre");
  const cards = [
    { title: "Especificar", body: "No pidas cosas, describe requerimientos técnicos.", accent: C.navy },
    { title: "Orquestar", body: "Usa MCPs y Skills para que el agente vea tu repo.", accent: C.red },
    { title: "Auditar", body: "Aplica el Radar de 4 Capas antes de integrar.", accent: C.gold },
    { title: "Evolucionar", body: "Aprende a domar el animal salvaje con práctica.", accent: C.navy },
  ];
  cards.forEach((c, i) => {
    addCard(slide, SH, {
      x: 0.88 + (i % 2) * 5.24, y: 2.22 + Math.floor(i / 2) * 2.04, w: 5.02, h: 1.86,
      title: c.title, body: c.body, accent: c.accent,
      fill: C.white, line: C.border, titleFontSize: 14, bodyFontSize: 11
    });
  });
  validateSlide(slide, pptx);
}

function createExitChallengeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Desafío de Salida", "Evaluando tu criterio", "Cierre");
  addCenterStatement(slide, SH, "El agente generó un CRUD perfecto pero olvidó el RLS de Supabase.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.12, fill: C.red, color: C.white, fontSize: 20
  });
  slide.addText("¿En qué capa del Radar falló la validación?\n¿Qué riesgo de seguridad implica integrarlo así?", {
    x: 0.88, y: 3.6, w: 10.26, h: 1.5, fontFace: TYPOGRAPHY.body, fontSize: 18, color: C.navy, align: "center", bold: true
  });
  validateSlide(slide, pptx);
}

function createFinalClosingSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.gold);
  slide.addText("Próxima Semana:\nCódigo Legado y Arquitectura", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("Exploraremos cómo integrar sistemas existentes, el uso de PHP en entornos reales y el patrón MVC para organizar aplicaciones escalables.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.8, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  addCenterStatement(slide, SH, "Nos vemos el lunes 20 de abril", {
    x: 0.88, y: 5.82, w: 10.26, h: 0.82, fill: C.gold, fontSize: 24, color: C.navy, bold: true
  });
  validateSlide(slide, pptx);
}

function main() {
  createCoverSlide();
  createWeekContextSlide();
  createCoreTensionSlide();
  createObjectives1Slide();
  createObjectives2Slide();
  createMindsetSlide();
  createSessionMapSlide();
  createBlock1IntroSlide();
  createWhatIsAgentSlide();
  createCanCantSlide();
  createMythRealitySlide();
  createCollaboratorAnalogySlide();
  createMissingContextSlide();
  createRolesSlide();
  createRolesUseCasesSlide();
  createVaguePromptSlide();
  createSpecifiedPromptSlide();
  createPromptCompareSlide();
  createBlock1EvidenceSlide();

  createBlock2IntroSlide();
  createFourComponentsSlide();
  createComponentContextSlide();
  createComponentTaskSlide();
  createComponentRestrictionsSlide();
  createComponentCriteriaSlide();
  createPedagogicalErrorSlide();
  createCodeAnalysisSlide();
  createLessonFillingSlide();
  createDemoPromptSlide();
  createDemoOutputSlide();
  createSocraticCheckpointSlide();
  createPromptAdaptSlide();
  createGuideQuestionsB2Slide();
  createBlock2SynthesisSlide();

  createBlock3IntroSlide();
  createReasoningLoopSlide();
  createLegacyChatSlide();
  createSurgicalContextSlide();
  createIntegratedAgentSlide();
  createOrchestrationDiagramSlide();
  createInstitutionalMemorySlide();
  createGeminiMdAnatomySlide();
  createMcpDefinitionSlide();
  createMcpArchitectureSlide();
  createDatabaseInspectorSlide();
  createMcpBridgeSlide();
  createMcpUseCasesSlide();
  createSelfCorrectionLoopSlide();
  createSlashCommandsSlide();
  createToolExecutionSlide();
  createSkillsDefinitionSlide();
  createReducingEntropySlide();
  createSubAgentsSlide();
  createMentalGraphSlide();
  createTerminalSecuritySlide();
  createIntegritySecuritySlide();
  createGuideQuestionsB3Slide();
  createBlock3SynthesisSlide();

  createBlock4IntroSlide();
  createIllusionOfAccuracySlide();
  createRewriteTrapSlide();
  createWildAnimalAnalogySlide();
  createValidationRadarSlide();
  createTraceabilitySlide();
  createWeeklySynthesisSlide();
  createGuideQuestionsB4Slide();
  createFinalClassSynthesisSlide();
  createExitChallengeSlide();
  createFinalClosingSlide();

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
}

main();
