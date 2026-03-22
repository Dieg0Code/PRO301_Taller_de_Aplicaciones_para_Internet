const fs = require("fs");
const path = require("path");
const PptxGenJS = require("../../../../../../tools/slides-system/node_modules/pptxgenjs");
const slidesSystem = require("../../../../../../tools/slides-system/dist/index.js");
const { imageSizingContain } = require("../../../../../../tools/slides-system/vendor/pptxgenjs_helpers/image");

const { theme, components, utils } = slidesSystem;
const { applyAiepTheme, TOKENS: C, TYPOGRAPHY } = theme;
const {
  addHeader: systemAddHeader,
  addCard,
  addMiniCard,
  addCenterStatement,
  addPill,
  addDelegationSplit,
  addComponentTree,
  addEvaluationRubricPanel,
  addScoreBoostsAndPenalties,
  addProjectWorkflowPanel,
  addPromptQualityCompare,
  addChecklistGrid,
  addMythRealityGrid,
  addStageChain,
} = components;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
applyAiepTheme(pptx, {
  author: "Codex",
  company: "AIEP",
  subject: "Guia de evaluacion",
  title: "Evaluacion Parcial 1 - Landing Estatica con Codex",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx =
  process.env.PPTX_OUTPUT || path.join(rootDir, "Guia-Evaluacion-Parcial-1-Codex.pptx");
const outputJs =
  process.env.PPTX_SOURCE_OUTPUT || path.join(rootDir, "Guia-Evaluacion-Parcial-1-Codex.js");

const logoPath = path.resolve(
  __dirname,
  "../../../../../../.agent/skills/slides-aiep/assets/logo-aiep.png"
);
const logoMarkPath = path.resolve(
  __dirname,
  "../../../../../../.agent/skills/slides-aiep/assets/logo-aiep-mark.png"
);

function addHeader(slide, title, subtitle, section = "Guia operativa", pptxLike = pptx) {
  systemAddHeader(slide, SH, pptxLike, title, subtitle, section, {
    classLabel: `Evaluacion Parcial 1 · ${section}`,
    logoMarkPath,
    subtitleY: 1.68,
    subtitleH: 0.22,
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

function addCoverScene(slide, x, y, w, h) {
  addPanel(slide, x, y, w, h, {
    fill: C.white,
    line: C.white,
  });

  const docs = [
    { label: "BRIEF", body: "que construyes y para quien", accent: C.red, fill: C.paleRed },
    { label: "SPEC", body: "alcance, restricciones y criterios", accent: C.navy, fill: C.softBlue },
    { label: "DESIGN", body: "jerarquia, CTA y experiencia", accent: C.gold, fill: C.warm },
    { label: "AGENTS", body: "como debe trabajar Codex", accent: C.navy, fill: C.mist },
  ];

  slide.addShape(SH.roundRect, {
    x: x + 0.18,
    y: y + 0.16,
    w: w - 0.36,
    h: 0.34,
    rectRadius: 0.03,
    fill: { color: C.softNeutral },
    line: { color: C.softNeutral },
  });
  slide.addText("Paquete minimo para llegar ordenado a la prueba", {
    x: x + 0.32,
    y: y + 0.24,
    w: w - 0.64,
    h: 0.12,
    fontFace: TYPOGRAPHY.body,
    fontSize: 9.4,
    bold: true,
    color: C.navy,
    margin: 0,
  });

  docs.forEach((doc, index) => {
    const cardY = y + 0.74 + index * 0.8;
    addPanel(slide, x + 0.28, cardY, w - 0.56, 0.62, {
      fill: doc.fill,
      line: doc.fill,
    });
    slide.addShape(SH.rect, {
      x: x + 0.28,
      y: cardY,
      w: 0.09,
      h: 0.62,
      fill: { color: doc.accent },
      line: { color: doc.accent },
    });
    slide.addText(doc.label, {
      x: x + 0.46,
      y: cardY + 0.12,
      w: 1.02,
      h: 0.14,
      fontFace: TYPOGRAPHY.display,
      fontSize: 12.8,
      bold: true,
      color: C.navy,
      margin: 0,
    });
    slide.addText(doc.body, {
      x: x + 1.56,
      y: cardY + 0.14,
      w: w - 1.9,
      h: 0.18,
      fontFace: TYPOGRAPHY.body,
      fontSize: 8.7,
      color: C.ink,
      margin: 0,
      fit: "shrink",
    });
    if (index < docs.length - 1) {
      slide.addShape(SH.chevron, {
        x: x + w - 0.22,
        y: cardY + 0.7,
        w: 0.12,
        h: 0.12,
        fill: { color: C.gold },
        line: { color: C.gold },
      });
    }
  });
}

function addDeliveryCard(slide, x, y, w, h, opts = {}) {
  addPanel(slide, x, y, w, h, {
    fill: opts.fill || C.white,
    line: opts.line || C.border,
  });
  slide.addShape(SH.rect, {
    x,
    y,
    w: 0.1,
    h,
    fill: { color: opts.accent || C.navy },
    line: { color: opts.accent || C.navy },
  });
  slide.addText(opts.title || "", {
    x: x + 0.2,
    y: y + 0.14,
    w: w - 0.44,
    h: 0.16,
    fontFace: TYPOGRAPHY.display,
    fontSize: 13.2,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addShape(SH.roundRect, {
    x: x + w - 1.02,
    y: y + 0.12,
    w: 0.76,
    h: 0.22,
    rectRadius: 0.03,
    fill: { color: C.white },
    line: { color: C.white },
  });
  slide.addText(opts.badge || "", {
    x: x + w - 0.96,
    y: y + 0.18,
    w: 0.64,
    h: 0.08,
    fontFace: TYPOGRAPHY.body,
    fontSize: 7.2,
    bold: true,
    color: opts.accent || C.navy,
    margin: 0,
    align: "center",
  });
  slide.addText(opts.body || "", {
    x: x + 0.2,
    y: y + 0.46,
    w: w - 0.34,
    h: h - 0.58,
    fontFace: TYPOGRAPHY.body,
    fontSize: 8.4,
    color: C.ink,
    margin: 0,
    fit: "shrink",
    valign: "mid",
  });
}

function slideCover() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };

  slide.addShape(SH.rect, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 0.14,
    fill: { color: C.red },
    line: { color: C.red },
  });

  addBarsMotif(slide, 0.72, 0.84, 1.5, C.red);
  slide.addText("Evaluación Parcial 1", {
    x: 0.72,
    y: 1.72,
    w: 5.6,
    h: 0.42,
    fontFace: TYPOGRAPHY.display,
    fontSize: 27,
    bold: true,
    color: C.white,
    margin: 0,
  });
  slide.addText("Landing estática con Codex", {
    x: 0.72,
    y: 2.34,
    w: 5.2,
    h: 0.26,
    fontFace: TYPOGRAPHY.display,
    fontSize: 19.4,
    bold: true,
    color: C.gold,
    margin: 0,
  });
  slide.addText(
    "Playbook operativo para llegar listos al lunes 30 de marzo de 2026 sin improvisar el flujo de trabajo.",
    {
      x: 0.74,
      y: 3.02,
      w: 4.92,
      h: 0.64,
      fontFace: TYPOGRAPHY.body,
      fontSize: 11.6,
      color: "E6EEF7",
      margin: 0,
      valign: "mid",
    }
  );

  addPill(slide, SH, "HTML semántico", {
    x: 0.74,
    y: 4.12,
    w: 1.48,
    h: 0.32,
    fill: C.white,
    line: C.white,
    color: C.navy,
    fontSize: 8.4,
  });
  addPill(slide, SH, "CSS con tokens", {
    x: 2.34,
    y: 4.12,
    w: 1.46,
    h: 0.32,
    fill: C.softBlue,
    line: C.softBlue,
    color: C.navy,
    fontSize: 8.4,
  });
  addPill(slide, SH, "Responsive real", {
    x: 0.74,
    y: 4.52,
    w: 1.44,
    h: 0.32,
    fill: C.warm,
    line: C.warm,
    color: C.navy,
    fontSize: 8.4,
  });
  addPill(slide, SH, "Entrega en GitHub", {
    x: 2.32,
    y: 4.52,
    w: 1.56,
    h: 0.32,
    fill: C.paleRed,
    line: C.paleRed,
    color: C.red,
    fontSize: 8.4,
  });

  addCoverScene(slide, 6.82, 1.34, 5.54, 4.28);
  slide.addImage({
    path: logoPath,
    ...imageSizingContain(logoPath, 10.62, 0.54, 1.72, 0.74),
  });
  addCenterStatement(
    slide,
    SH,
    "No se evalúa magia. Se evalúa criterio, claridad visual, estructura y forma de trabajo.",
    {
      x: 0.92,
      y: 6.24,
      w: 11.56,
      h: 0.58,
      fill: "284B75",
      color: C.white,
      fontSize: 16,
      rectRadius: 0.04,
    }
  );

  validateSlide(slide, pptx);
}

function slideMondayFlow() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Qué va a pasar el lunes",
    "La prueba mezcla encuadre corto, demo guiada, trabajo práctico y entrega ordenada.",
    "Evaluación"
  );

  addStageChain(slide, SH, {
    x: 0.82,
    y: 2.26,
    w: 11.7,
    h: 3.72,
    title: "Ritmo de la sesión evaluada",
    compact: false,
    stages: [
      {
        step: "10:50",
        title: "Encuadre",
        body: "Se recuerda la consigna, la rúbrica y el método de entrega.",
        accent: C.red,
        fill: C.paleRed,
      },
      {
        step: "11:05",
        title: "Demo",
        body: "Se muestra un flujo claro con Codex sobre brief, spec, design y agents.",
        accent: C.navy,
        fill: C.softBlue,
      },
      {
        step: "11:35",
        title: "Trabajo",
        body: "Cada estudiante construye su página y valida manualmente su resultado.",
        accent: C.gold,
        fill: C.warm,
      },
      {
        step: "12:55",
        title: "Entrega",
        body: "Se cierra con GitHub idealmente o, si no se puede, con un comprimido ordenado.",
        accent: C.navy,
        fill: C.mist,
      },
    ],
    footer: "La demo existe para enseñar el flujo. La nota la define tu ejecución.",
  });

  validateSlide(slide, pptx);
}

function slideBuildRequirements() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Qué tendrás que construir",
    "El tema es libre dentro de formatos comparables, pero la base técnica no es negociable.",
    "Consigna"
  );

  addPanel(slide, 0.82, 2.26, 3.6, 4.38, {
    fill: C.softBlue,
    line: C.softBlue,
  });
  slide.addText("Formatos permitidos", {
    x: 1.02,
    y: 2.32,
    w: 2.9,
    h: 0.2,
    fontFace: TYPOGRAPHY.display,
    fontSize: 17.2,
    bold: true,
    color: C.navy,
    margin: 0,
  });
  slide.addText(
    "Puedes elegir un proyecto propio siempre que siga siendo comparable y se sienta como producto o servicio real.",
    {
      x: 1.04,
      y: 2.88,
      w: 3.0,
      h: 0.46,
      fontFace: TYPOGRAPHY.body,
      fontSize: 9.4,
      color: C.ink,
      margin: 0,
      valign: "mid",
    }
  );
  [
    ["Portafolio", C.paleRed, C.red, 1.02, 3.36, 1.22],
    ["Servicio", C.white, C.navy, 2.38, 3.36, 1.18],
    ["Producto", C.warm, C.navy, 1.02, 3.78, 1.2],
    ["Evento", C.white, C.navy, 2.34, 3.78, 1.02],
    ["App o juego", C.paleRed, C.red, 1.02, 4.2, 1.36],
    ["Marca ficticia", C.white, C.navy, 2.52, 4.2, 1.38],
  ].forEach(([label, fill, color, px, py, pw]) => {
    addPill(slide, SH, label, {
      x: px,
      y: py,
      w: pw,
      h: 0.32,
      fill,
      line: fill,
      color,
      fontSize: 8.2,
    });
  });

  addMiniCard(slide, SH, {
    x: 1.02,
    y: 4.96,
    w: 3.0,
    h: 1.22,
    title: "Regla clave",
    body: "Tema libre no significa trabajo ambiguo. Debe quedar claro qué vende, para quién y cuál es el CTA principal.",
    accent: C.navy,
    fill: C.white,
  });

  addChecklistGrid(slide, SH, {
    x: 4.64,
    y: 2.26,
    w: 7.88,
    h: 4.54,
    title: "Base técnica mínima",
    columns: 2,
    entries: [
      {
        badge: "HTML",
        title: "Semántica real",
        body: "Header, main, section, footer y headings con jerarquía razonable.",
        accent: C.red,
        badgeFill: C.paleRed,
        fill: C.white,
      },
      {
        badge: "CSS",
        title: "Sistema visual",
        body: "Variables o tokens para color, spacing y radios en vez de repetir valores sueltos.",
        accent: C.navy,
        badgeFill: C.softBlue,
        fill: C.white,
      },
      {
        badge: "Movil",
        title: "Responsive cuidado",
        body: "La página debe leerse bien en celular y no solo sobrevivir al achique.",
        accent: C.gold,
        badgeFill: C.warm,
        fill: C.white,
      },
      {
        badge: "UI",
        title: "Una interaccion visual",
        body: "Hover, transición o animación suave si realmente mejora la interfaz.",
        accent: C.navy,
        badgeFill: C.softBlue,
        fill: C.white,
      },
      {
        badge: "A11y",
        title: "Accesibilidad básica",
        body: "Contraste, alt, label y una experiencia razonable de lectura y uso.",
        accent: C.success,
        badgeFill: C.successSoft,
        fill: C.white,
      },
      {
        badge: "Entrega",
        title: "Proyecto ordenado",
        body: "Archivos claros, estructura limpia y método de entrega entendible.",
        accent: C.red,
        badgeFill: C.paleRed,
        fill: C.white,
      },
    ],
    footer: "La forma visual puede variar. La base técnica no.",
  });

  validateSlide(slide, pptx);
}

function slideWhatIsEvaluated() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Qué se evalúa realmente",
    "La nota no se define por una landing bonita aislada, sino por la calidad completa del trabajo.",
    "Criterio"
  );

  addMythRealityGrid(slide, SH, {
    x: 0.82,
    y: 2.16,
    w: 11.74,
    h: 4.74,
    columns: 2,
    title: "Confusiones que conviene sacar de la cabeza antes de la prueba",
    entries: [
      {
        badge: "Error",
        myth: "Que se vea bonita basta",
        reality: "Se evalúa estructura, responsive, sistema visual, accesibilidad y entrega.",
        accent: C.red,
        fill: C.paleRed,
      },
      {
        badge: "Error",
        myth: "Copiar una referencia alcanza",
        reality: "Inspirarse sirve. Copiar sin entender baja criterio y se nota en la validación.",
        accent: C.navy,
        fill: C.softBlue,
        badgeFill: C.softBlue,
      },
      {
        badge: "Error",
        myth: "Codex decide todo por mi",
        reality: "Codex acelera la base. La responsabilidad final sigue siendo revisar, corregir y entregar bien.",
        accent: C.gold,
        fill: C.warm,
        badgeFill: C.warm,
      },
      {
        badge: "Error",
        myth: "La forma de entrega no importa",
        reality: "GitHub, orden de archivos y limpieza del proyecto también forman parte de la nota.",
        accent: C.navy,
        fill: C.mist,
        badgeFill: C.mist,
      },
    ],
    footer: "La página final importa, pero también importa cómo llegaste a ella.",
  });

  validateSlide(slide, pptx);
}

function slideRubric() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Rubrica de evaluacion",
    "La herramienta esta al servicio de estos criterios; la nota no se decide por la herramienta.",
    "Rubrica"
  );

  addEvaluationRubricPanel(slide, SH, {
    x: 0.84,
    y: 2.1,
    w: 11.68,
    h: 4.9,
    rows: [
      {
        label: "HTML y semantica",
        weight: 20,
        note: "Estructura legible, jerarquia clara y uso correcto de tags principales.",
        accent: C.red,
        fill: C.paleRed,
      },
      {
        label: "CSS y sistema visual",
        weight: 20,
        note: "Tokens, spacing, consistencia, superficie y jerarquia visual bien resueltas.",
        accent: C.navy,
        fill: C.softBlue,
      },
      {
        label: "Responsive y version movil",
        weight: 20,
        note: "La lectura en celular sigue firme y no parece una adaptacion improvisada.",
        accent: C.gold,
        fill: C.warm,
      },
      {
        label: "Calidad visual general",
        weight: 15,
        note: "Debe sentirse como producto real y no como tarea escolar disfrazada.",
        accent: C.navy,
        fill: C.mist,
      },
      {
        label: "Accesibilidad basica",
        weight: 10,
        note: "Contraste, alt, label y claridad de uso minimos pero reales.",
        accent: C.success,
        fill: C.successSoft,
      },
      {
        label: "Uso de Codex con criterio",
        weight: 10,
        note: "Buen contexto, buena iteracion y validacion humana visible.",
        accent: C.red,
        fill: C.paleRed,
      },
      {
        label: "Orden y entrega",
        weight: 5,
        note: "GitHub idealmente, o comprimido claro si no se puede versionar.",
        accent: C.gold,
        fill: C.warningSoft,
      },
    ],
    totalLabel: "100 pts",
    footer: "Si entiendes esta rubrica, ya sabes que proteger durante toda la prueba.",
  });

  validateSlide(slide, pptx);
}

function slideBoostsAndPenalties() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Que suma puntos y que baja puntos",
    "La prueba premia orden, criterio y realismo; castiga improvisacion visible y entrega floja.",
    "Criterio"
  );

  addScoreBoostsAndPenalties(slide, SH, {
    x: 0.84,
    y: 2.1,
    w: 11.68,
    h: 4.86,
    boostsTitle: "Suma puntos",
    boostsSubtitle: "Refuerza estructura, claridad y forma de trabajo.",
    boosts: [
      {
        title: "HTML semantico real",
        body: "No resolver todo con divs; la estructura tiene que decir algo del documento.",
        accent: C.navy,
        fill: C.softBlue,
      },
      {
        title: "Tokens y consistencia",
        body: "Variables para color, spacing y radios muestran que ya piensas el CSS como sistema.",
        accent: C.gold,
        fill: C.warm,
      },
      {
        title: "Responsive bien resuelto",
        body: "Una version movil cuidada sube mucho la percepcion de calidad.",
        accent: C.success,
        fill: C.successSoft,
      },
      {
        title: "Entrega en GitHub",
        body: "Un repo claro hace ver el trabajo como algo mas profesional y trazable.",
        accent: C.red,
        fill: C.paleRed,
      },
    ],
    penaltiesTitle: "Baja puntos",
    penaltiesSubtitle: "Rompe profesionalismo, claridad o metodo de entrega.",
    penalties: [
      {
        title: "Texto meta visible",
        body: "Nada de copy que diga ejemplo, demo, evaluacion o comentarios para el profe.",
        accent: C.red,
        fill: C.paleRed,
      },
      {
        title: "UI generica o infantil",
        body: "Si parece juguete o template flojo, cae la nota de calidad visual.",
        accent: C.red,
        fill: C.paleRed,
      },
      {
        title: "Confiar ciegamente en Codex",
        body: "Si no validas semantica, responsive o accesibilidad, el error sigue siendo tuyo.",
        accent: C.gold,
        fill: C.warm,
      },
      {
        title: "Entrega desordenada",
        body: "Mandar archivos sueltos por WhatsApp o correo baja la parte de forma de trabajo.",
        accent: C.navy,
        fill: C.mist,
      },
    ],
    footer: "No todo lo vistoso suma. Suma lo que mejora claridad, realismo y control del trabajo.",
  });

  validateSlide(slide, pptx);
}

function slideProfessionalSignals() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Que hace que una pagina se vea profesional",
    "La meta no es hacer algo ruidoso; es construir una interfaz creible y del mundo real.",
    "Calidad visual"
  );

  addChecklistGrid(slide, SH, {
    x: 0.84,
    y: 2.14,
    w: 7.3,
    h: 4.62,
    title: "Senales minimas de seriedad",
    columns: 2,
    entries: [
      {
        badge: "Copy",
        title: "Se entiende rapido",
        body: "El usuario sabe que hace el servicio y que gana si avanza.",
        accent: C.red,
        badgeFill: C.paleRed,
        fill: C.white,
      },
      {
        badge: "UI",
        title: "Jerarquia controlada",
        body: "Titular, subtitulo, CTA y bloques secundarios no compiten entre si.",
        accent: C.navy,
        badgeFill: C.softBlue,
        fill: C.white,
      },
      {
        badge: "Movil",
        title: "Version cuidada",
        body: "En celular sigue pareciendo una interfaz diseñada, no una maqueta apretada.",
        accent: C.gold,
        badgeFill: C.warm,
        fill: C.white,
      },
      {
        badge: "Sistema",
        title: "Componentes con peso",
        body: "Botones, cards y bloques deben sentirse parte de un mismo producto.",
        accent: C.success,
        badgeFill: C.successSoft,
        fill: C.white,
      },
    ],
    footer: "Se ve profesional cuando transmite claridad y control, no cuando agrega adorno porque si.",
  });

  addMiniCard(slide, SH, {
    x: 8.42,
    y: 2.22,
    w: 3.44,
    h: 1.22,
    title: "No deberia parecer",
    body: "Una tarea escolar disfrazada de landing, una demo generica o un template sin criterio.",
    accent: C.red,
    fill: C.paleRed,
  });
  addMiniCard(slide, SH, {
    x: 8.42,
    y: 3.66,
    w: 3.44,
    h: 1.22,
    title: "Si deberia parecer",
    body: "Un servicio real o un producto plausible que podrias mostrar sin vergüenza como trabajo serio.",
    accent: C.navy,
    fill: C.softBlue,
  });
  addCenterStatement(slide, SH, "Menos ruido. Mas propuesta de valor, jerarquia y version movil cuidada.", {
    x: 8.4,
    y: 5.34,
    w: 3.48,
    h: 0.68,
    fill: C.navy,
    color: C.white,
    fontSize: 14.4,
    rectRadius: 0.04,
  });

  validateSlide(slide, pptx);
}

function slideWorkflow() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Flujo recomendado de trabajo",
    "La forma mas estable de usar Codex no parte pidiendo codigo: parte aclarando el proyecto.",
    "Flujo"
  );

  addProjectWorkflowPanel(slide, SH, {
    x: 0.82,
    y: 2.18,
    w: 11.72,
    h: 3.56,
    title: "De idea vaga a entrega ordenada",
    footer: "Si saltas directo a implementacion, Codex empieza a adivinar y la calidad cae.",
  });

  addCenterStatement(slide, SH, "Brief define el producto. Spec fija el alcance. Design ordena la experiencia. Agents gobierna al agente.", {
    x: 1.14,
    y: 5.96,
    w: 11.02,
    h: 0.56,
    fill: C.warm,
    color: C.navy,
    fontSize: 14.2,
    rectRadius: 0.04,
  });

  validateSlide(slide, pptx);
}

function slideDocuments() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Que hace cada documento",
    "No son archivos decorativos: cada uno reduce ambigüedad en un nivel distinto del proyecto.",
    "Artefactos"
  );

  const cards = [
    {
      x: 0.92,
      y: 2.12,
      title: "BRIEF",
      body: "Define el negocio, el publico, el objetivo y el mensaje principal del sitio.",
      accent: C.red,
      fill: C.paleRed,
    },
    {
      x: 6.74,
      y: 2.12,
      title: "SPEC",
      body: "Fija secciones, restricciones tecnicas, responsive, accesibilidad y criterios de aceptacion.",
      accent: C.navy,
      fill: C.softBlue,
    },
    {
      x: 0.92,
      y: 4.02,
      title: "DESIGN",
      body: "Baja el proyecto a decisiones de UI/UX: CTA, jerarquia, senales de confianza y experiencia movil.",
      accent: C.gold,
      fill: C.warm,
    },
    {
      x: 6.74,
      y: 4.02,
      title: "AGENTS",
      body: "Define como debe trabajar Codex dentro de ese contexto y que no puede romper.",
      accent: C.navy,
      fill: C.mist,
    },
  ];

  cards.forEach((card) => {
    addCard(slide, SH, {
      x: card.x,
      y: card.y,
      w: 5.22,
      h: 1.52,
      title: card.title,
      body: card.body,
      accent: card.accent,
      fill: card.fill,
      titleFontSize: 17.2,
      bodyFontSize: 10.2,
    });
  });

  addCenterStatement(slide, SH, "Mientras mejor se separan intencion, alcance, experiencia y reglas, mejor trabaja el agente y menos improvisas tu.", {
    x: 1.14,
    y: 5.98,
    w: 11.02,
    h: 0.58,
    fill: C.navy,
    color: C.white,
    fontSize: 14.2,
    rectRadius: 0.04,
  });

  validateSlide(slide, pptx);
}

function slideNodoWebPackage() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Ejemplo real: paquete Nodo Web",
    "Este es el caso resuelto que se mostrara como referencia para la prueba. No es un template para copiar sin pensar.",
    "Ejemplo"
  );

  addComponentTree(slide, SH, {
    x: 0.86,
    y: 2.1,
    w: 5.3,
    h: 4.76,
    title: "Arbol minimo del ejemplo",
    nodes: [
      { label: "ejemplo-web", depth: 0, meta: "paquete de referencia para explicar el flujo" },
      { label: "brief/", depth: 1, meta: "contexto y objetivo del producto" },
      { label: "BRIEF-EJEMPLO.md", depth: 2, meta: "negocio, publico, mensaje" },
      { label: "spec/", depth: 1, meta: "alcance y restricciones tecnicas" },
      { label: "SPEC.md", depth: 2, meta: "responsive, tokens, aceptacion" },
      { label: "design/", depth: 1, meta: "decisiones concretas de UI/UX" },
      { label: "DESIGN-EJEMPLO.md", depth: 2, meta: "jerarquia, CTA y señales premium" },
      { label: "AGENTS-EJEMPLO.md", depth: 1, meta: "como debe trabajar Codex" },
    ],
  });

  addMiniCard(slide, SH, {
    x: 6.46,
    y: 2.18,
    w: 5.36,
    h: 1.18,
    title: "Como se conectan",
    body: "Brief dice que negocio es. Spec cierra limites. Design fija experiencia. Agents gobierna implementacion.",
    accent: C.navy,
    fill: C.softBlue,
  });
  addMiniCard(slide, SH, {
    x: 6.46,
    y: 3.58,
    w: 5.36,
    h: 1.18,
    title: "Que protege este paquete",
    body: "Que Codex no invente un sitio generico, ni meta texto pedagogico, ni baje la calidad visual por falta de contexto.",
    accent: C.red,
    fill: C.paleRed,
  });
  addMiniCard(slide, SH, {
    x: 6.46,
    y: 4.98,
    w: 5.36,
    h: 1.18,
    title: "Como usarlo bien",
    body: "Miralo como modelo de flujo. Tu proyecto puede cambiar de tema, pero no deberia saltarse estas capas.",
    accent: C.gold,
    fill: C.warm,
  });

  validateSlide(slide, pptx);
}

function slideCodexDelegation() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Que hace bien Codex y que no conviene delegar",
    "Codex ayuda a acelerar. La validacion final de calidad, semantica y experiencia sigue siendo tuya.",
    "Codex"
  );

  addDelegationSplit(slide, SH, {
    x: 0.88,
    y: 2.12,
    w: 11.56,
    h: 4.48,
    title: "Apoyo del agente vs criterio del estudiante",
    left: {
      title: "Si puede acelerar",
      subtitle: "Base util de trabajo",
      items: [
        "ordenar la estructura inicial del proyecto",
        "proponer una primera version de HTML y CSS",
        "refactorizar tokens y spacing",
        "comparar variantes de hero, cards o cierre",
      ],
      accent: C.navy,
      fill: C.softBlue,
    },
    right: {
      title: "No conviene soltar",
      subtitle: "Validacion obligatoria",
      items: [
        "si el HTML realmente es semantico",
        "si la version movil sigue leyendo bien",
        "si el copy se siente profesional y no meta",
        "si la pagina merece la nota que esperas",
      ],
      accent: C.red,
      fill: C.white,
    },
    bridgeLabel: "Criterio",
    bridgeBody: "Codex propone primero. Tu decides si la solucion realmente sirve.",
    footer: "El error mas comun es aceptar la primera salida sin abrir el navegador ni revisar la consigna.",
  });

  validateSlide(slide, pptx);
}

function slidePromptQuality() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Como pedir una buena primera version",
    "Un prompt util no pide magia: fija contexto, restricciones, tipo de pagina y estandar visual.",
    "Prompt"
  );

  addPromptQualityCompare(slide, SH, {
    x: 0.82,
    y: 2.1,
    w: 11.72,
    h: 4.84,
    title: "Malo porque obliga a adivinar · util porque reduce ambigüedad",
    goodPrompt:
      "Crea una landing para un servicio real o ficticio plausible. Usa HTML semantico, CSS con tokens, mobile-first, CTA claro, tono sobrio y nada de texto meta visible.",
    footer: "Mientras mejor defines producto, publico, restricciones y tono, menos generico sale el resultado.",
  });

  validateSlide(slide, pptx);
}

function slideIteration() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Como iterar sin romper el proyecto",
    "Despues de la primera version, no reinicies todo: mejora por capas y valida cada ajuste.",
    "Iteracion"
  );

  addStageChain(slide, SH, {
    x: 0.84,
    y: 2.16,
    w: 11.68,
    h: 3.94,
    title: "Secuencia sana de refinamiento",
    compact: true,
    stages: [
      {
        step: "01",
        title: "Base funcional",
        body: "Primero que exista una version visible y estable.",
        accent: C.red,
        fill: C.paleRed,
      },
      {
        step: "02",
        title: "Revisar HTML",
        body: "Confirmar semantica, headings, labels y orden logico.",
        accent: C.navy,
        fill: C.softBlue,
      },
      {
        step: "03",
        title: "Revisar CSS",
        body: "Tokens, spacing, jerarquia visual y consistencia de componentes.",
        accent: C.gold,
        fill: C.warm,
      },
      {
        step: "04",
        title: "Probar movil",
        body: "Abrir celular, leer la hero y revisar CTA, cards y cierre.",
        accent: C.success,
        fill: C.successSoft,
      },
      {
        step: "05",
        title: "Pulir entrega",
        body: "Ordenar archivos, ultimo repaso y subir o comprimir bien.",
        accent: C.navy,
        fill: C.mist,
      },
    ],
    footer: "La pagina mejora mas cuando corriges con foco que cuando vuelves a pedir todo desde cero.",
  });

  validateSlide(slide, pptx);
}

function slideFinalChecklist() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Checklist antes de entregar",
    "Si uno de estos puntos cae, no cierres la prueba todavia. Revisa primero y luego entrega.",
    "Checklist"
  );

  addChecklistGrid(slide, SH, {
    x: 0.82,
    y: 2.12,
    w: 11.72,
    h: 4.74,
    title: "Ultima pasada obligatoria",
    columns: 3,
    entries: [
      {
        badge: "Hero",
        title: "Se entiende rapido",
        body: "¿Queda claro que hace la pagina y cual es el CTA principal?",
        accent: C.red,
        badgeFill: C.paleRed,
        fill: C.white,
      },
      {
        badge: "HTML",
        title: "Semantica limpia",
        body: "¿Header, main, sections, footer y headings estan bien usados?",
        accent: C.navy,
        badgeFill: C.softBlue,
        fill: C.white,
      },
      {
        badge: "CSS",
        title: "Tokens activos",
        body: "¿Dejaste color, spacing y radios razonablemente centralizados?",
        accent: C.gold,
        badgeFill: C.warm,
        fill: C.white,
      },
      {
        badge: "Movil",
        title: "Version cuidada",
        body: "¿La pagina se ve bien en celular y mantiene jerarquia real?",
        accent: C.success,
        badgeFill: C.successSoft,
        fill: C.white,
      },
      {
        badge: "A11y",
        title: "Base accesible",
        body: "¿Hay contraste razonable, alt, label y lectura clara?",
        accent: C.red,
        badgeFill: C.paleRed,
        fill: C.white,
      },
      {
        badge: "Entrega",
        title: "Proyecto listo",
        body: "¿Nombre, archivos y metodo de entrega estan claros y ordenados?",
        accent: C.navy,
        badgeFill: C.softBlue,
        fill: C.white,
      },
    ],
    footer: "La ultima revision vale mas que otro cambio vistoso hecho a la rapida.",
  });

  validateSlide(slide, pptx);
}

function slideDeliveryAndClose() {
  const slide = pptx.addSlide();
  addHeader(
    slide,
    "Metodo de entrega y cierre",
    "La forma de entregar tambien comunica criterio profesional y afecta el tramo final de la rubrica.",
    "Entrega"
  );

  addDeliveryCard(slide, 0.9, 2.16, 3.56, 2.28, {
    title: "GitHub",
    badge: "5/5 en forma",
    body: "Es la entrega ideal: repo claro, estructura ordenada y, si alcanza, uno o mas commits que muestren trabajo real.",
    accent: C.success,
    fill: C.successSoft,
  });
  addDeliveryCard(slide, 4.88, 2.16, 3.56, 2.28, {
    title: ".zip o .rar",
    badge: "aceptable",
    body: "Sirve si viene limpio y completo, pero pierde parte del flujo profesional que si muestra un repositorio.",
    accent: C.gold,
    fill: C.warm,
  });
  addDeliveryCard(slide, 8.86, 2.16, 3.56, 2.28, {
    title: "WhatsApp o correo",
    badge: "menos puntaje",
    body: "Puede seguir evaluandose el contenido, pero baja la parte de orden, forma de trabajo y presentacion.",
    accent: C.red,
    fill: C.paleRed,
  });

  addCenterStatement(slide, SH, "El lunes no llegas a improvisar una landing. Llegas a ejecutar un flujo claro, con criterio tecnico y entrega ordenada.", {
    x: 1.06,
    y: 5.18,
    w: 11.2,
    h: 0.68,
    fill: C.navy,
    color: C.white,
    fontSize: 15.2,
    rectRadius: 0.04,
  });

  slide.addText("Si entiendes la consigna, la rubrica y el flujo con Codex, ya tienes la mitad de la prueba bajo control.", {
    x: 1.3,
    y: 6.08,
    w: 10.72,
    h: 0.18,
    fontFace: TYPOGRAPHY.body,
    fontSize: 10.2,
    color: C.slate,
    align: "center",
    margin: 0,
  });

  validateSlide(slide, pptx);
}

async function buildDeck() {
  slideCover();
  slideMondayFlow();
  slideBuildRequirements();
  slideWhatIsEvaluated();
  slideRubric();
  slideBoostsAndPenalties();
  slideProfessionalSignals();
  slideWorkflow();
  slideDocuments();
  slideNodoWebPackage();
  slideCodexDelegation();
  slidePromptQuality();
  slideIteration();
  slideFinalChecklist();
  slideDeliveryAndClose();

  await pptx.writeFile({ fileName: outputPptx });
  fs.copyFileSync(__filename, outputJs);
}

buildDeck().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
