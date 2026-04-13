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
