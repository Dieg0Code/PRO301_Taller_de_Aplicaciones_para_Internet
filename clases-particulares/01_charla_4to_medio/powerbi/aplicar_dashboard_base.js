const fs = require("fs");
const path = require("path");

const root = __dirname;
const reportDir = path.join(root, "ink_pulse_studio.Report");
const modelDir = path.join(root, "ink_pulse_studio.SemanticModel");
const pagesRoot = path.join(reportDir, "definition", "pages");
const pageDir = path.join(pagesRoot, "17fab5ed598d88453da1");
const financePageName = "flujo_dinero";
const financePageDir = path.join(pagesRoot, financePageName);
const businessPageName = "indicadores_gerenciales";
const businessPageDir = path.join(pagesRoot, businessPageName);
const visualsDir = path.join(pageDir, "visuals");
const financeVisualsDir = path.join(financePageDir, "visuals");
const businessVisualsDir = path.join(businessPageDir, "visuals");
const tableName = "reservas_ink_pulse_studio";
const tableFile = path.join(modelDir, "definition", "tables", `${tableName}.tmdl`);

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(file, value) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, JSON.stringify(value, null, 2), "utf8");
}

function literal(value) {
  if (typeof value === "boolean") return { expr: { Literal: { Value: value ? "true" : "false" } } };
  if (typeof value === "number") return { expr: { Literal: { Value: `${value}D` } } };
  return { expr: { Literal: { Value: `'${value}'` } } };
}

function column(property) {
  return {
    field: {
      Column: {
        Expression: { SourceRef: { Entity: tableName } },
        Property: property,
      },
    },
    queryRef: `${tableName}.${property}`,
    nativeQueryRef: property,
    active: true,
  };
}

function measure(property) {
  return {
    field: {
      Measure: {
        Expression: { SourceRef: { Entity: tableName } },
        Property: property,
      },
    },
    queryRef: `${tableName}.${property}`,
    nativeQueryRef: property,
  };
}

function textVisual(name, x, y, width, height, paragraphs, z = 0) {
  return {
    "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.8.0/schema.json",
    name,
    position: { x, y, z, height, width, tabOrder: z },
    visual: {
      visualType: "textbox",
      objects: {
        general: [
          {
            properties: {
              paragraphs: paragraphs.map((p) => ({
                textRuns: [
                  {
                    value: p.text,
                    textStyle: {
                      fontSize: p.size || "12pt",
                      fontWeight: p.bold ? "bold" : "normal",
                      color: p.color || "#1F2937",
                    },
                  },
                ],
                horizontalTextAlignment: p.align || "left",
              })),
            },
          },
        ],
      },
      drillFilterOtherVisuals: true,
    },
  };
}

function cardVisual(name, x, y, width, height, measureName, color, z) {
  return {
    "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.8.0/schema.json",
    name,
    position: { x, y, z, height, width, tabOrder: z },
    visual: {
      visualType: "card",
      query: {
        queryState: {
          Values: { projections: [measure(measureName)] },
        },
      },
      objects: {
        labels: [
          {
            properties: {
              color: { solid: { color: literal(color) } },
              fontSize: literal(30),
              fontFamily: literal("Segoe UI Semibold"),
            },
          },
        ],
        categoryLabels: [{ properties: { show: literal(false) } }],
      },
      drillFilterOtherVisuals: true,
    },
  };
}

function kpiLabel(name, x, y, width, text, z) {
  return textVisual(name, x, y, width, 34, [
    { text, size: "11pt", bold: true, color: "#334155" },
  ], z);
}

function chartVisual(name, type, x, y, width, height, category, value, color, z) {
  return {
    "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.8.0/schema.json",
    name,
    position: { x, y, z, height, width, tabOrder: z },
    visual: {
      visualType: type,
      query: {
        queryState: {
          Category: { projections: [column(category)] },
          Y: { projections: [measure(value)] },
        },
        sortDefinition: {
          sort: [{ field: measure(value).field, direction: "Descending" }],
        },
      },
      objects: {
        title: [{ properties: { show: literal(false) } }],
        dataPoint: [{ properties: { fill: { solid: { color: literal(color) } } } }],
        labels: [
          {
            properties: {
              show: literal(true),
              fontSize: literal(10),
              color: { solid: { color: literal("#0E2A43") } },
            },
          },
        ],
        categoryAxis: [
          {
            properties: {
              labelColor: { solid: { color: literal("#334155") } },
              fontSize: literal(10),
            },
          },
        ],
        valueAxis: [
          {
            properties: {
              labelColor: { solid: { color: literal("#334155") } },
              fontSize: literal(10),
            },
          },
        ],
      },
      drillFilterOtherVisuals: true,
    },
  };
}

function pieVisual(name, type, x, y, width, height, category, value, z) {
  return {
    "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.8.0/schema.json",
    name,
    position: { x, y, z, height, width, tabOrder: z },
    visual: {
      visualType: type,
      query: {
        queryState: {
          Category: { projections: [column(category)] },
          Y: { projections: [measure(value)] },
        },
        sortDefinition: {
          sort: [{ field: measure(value).field, direction: "Descending" }],
        },
      },
      objects: {
        title: [{ properties: { show: literal(false) } }],
        legend: [
          {
            properties: {
              show: literal(true),
              position: literal("RightCenter"),
              labelColor: { solid: { color: literal("#0E2A43") } },
              fontSize: literal(10),
            },
          },
        ],
        labels: [
          {
            properties: {
              show: literal(false),
              fontSize: literal(9),
              color: { solid: { color: literal("#0E2A43") } },
              labelStyle: literal("Data value, percent of total"),
            },
          },
        ],
      },
      drillFilterOtherVisuals: true,
    },
  };
}

function slicerVisual(name, x, y, width, height, property, z, label) {
  return {
    "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.8.0/schema.json",
    name,
    position: { x, y, z, height, width, tabOrder: z },
    visual: {
      visualType: "slicer",
      query: {
        queryState: {
          Values: { projections: [column(property)] },
        },
      },
      objects: {
        data: [{ properties: { mode: literal("Dropdown") } }],
        general: [{ properties: {} }],
        header: [
          {
            properties: {
              show: literal(true),
              text: literal(label || property),
              fontColor: { solid: { color: literal("#0E2A43") } },
              textSize: literal(11),
            },
          },
        ],
        items: [
          {
            properties: {
              textSize: literal(11),
              fontColor: { solid: { color: literal("#1F2937") } },
            },
          },
        ],
      },
      drillFilterOtherVisuals: true,
    },
  };
}

function tableVisual() {
  return {
    "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.8.0/schema.json",
    name: "tabla_oportunidades",
    position: { x: 330, y: 526, z: 22, height: 172, width: 930, tabOrder: 22 },
    visual: {
      visualType: "tableEx",
      query: {
        queryState: {
          Values: {
            projections: [
              column("nombre_cliente"),
              column("artista_preferido"),
              column("estado_solicitud"),
              column("presupuesto_estimado_clp"),
              column("score_oportunidad"),
            ],
          },
        },
        sortDefinition: {
          sort: [{ field: column("score_oportunidad").field, direction: "Descending" }],
        },
      },
      objects: {
        columnHeaders: [
          {
            properties: {
              fontSize: literal(10),
              fontColor: { solid: { color: literal("#0E2A43") } },
              backColor: { solid: { color: literal("#EAF2F8") } },
            },
          },
        ],
        values: [
          {
            properties: {
              fontSize: literal(10),
              fontColorPrimary: { solid: { color: literal("#111827") } },
            },
          },
        ],
        grid: [
          {
            properties: {
              rowPadding: literal(5),
              outlineColor: { solid: { color: literal("#D7E4EE") } },
            },
          },
        ],
      },
      drillFilterOtherVisuals: true,
    },
  };
}

function rankingVisual(name, x, y, width, height, projections, sortMeasure, z) {
  return {
    "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.8.0/schema.json",
    name,
    position: { x, y, z, height, width, tabOrder: z },
    visual: {
      visualType: "tableEx",
      query: {
        queryState: {
          Values: { projections },
        },
        sortDefinition: {
          sort: [{ field: measure(sortMeasure).field, direction: "Descending" }],
        },
      },
      objects: {
        columnHeaders: [
          {
            properties: {
              fontSize: literal(11),
              fontColor: { solid: { color: literal("#0E2A43") } },
              backColor: { solid: { color: literal("#EAF2F8") } },
            },
          },
        ],
        values: [
          {
            properties: {
              fontSize: literal(11),
              fontColorPrimary: { solid: { color: literal("#111827") } },
            },
          },
        ],
        grid: [
          {
            properties: {
              rowPadding: literal(7),
              outlineColor: { solid: { color: literal("#D7E4EE") } },
            },
          },
        ],
      },
      drillFilterOtherVisuals: true,
    },
  };
}

function addMeasures() {
  const original = fs.readFileSync(tableFile, "utf8");
  if (original.includes("measure 'Reservas totales'")) return;

  const measures = `

\tmeasure 'Reservas totales' = COUNTROWS('${tableName}')
\t\tformatString: #,##0
\t\tdisplayFolder: KPIs
\t\tlineageTag: 73f2cb81-f156-4e62-9ffc-bf9122f10001

\tmeasure 'Reservas confirmadas' = CALCULATE([Reservas totales], '${tableName}'[estado_solicitud] = "confirmada")
\t\tformatString: #,##0
\t\tdisplayFolder: KPIs
\t\tlineageTag: 73f2cb81-f156-4e62-9ffc-bf9122f10002

\tmeasure 'Tasa conversion' = DIVIDE([Reservas confirmadas], [Reservas totales])
\t\tformatString: 0.0%
\t\tdisplayFolder: KPIs
\t\tlineageTag: 73f2cb81-f156-4e62-9ffc-bf9122f10003

\tmeasure 'Presupuesto potencial' = SUM('${tableName}'[presupuesto_estimado_clp])
\t\tformatString: "$"#,##0
\t\tdisplayFolder: Finanzas
\t\tlineageTag: 73f2cb81-f156-4e62-9ffc-bf9122f10004

\tmeasure 'Ticket promedio' = AVERAGE('${tableName}'[presupuesto_estimado_clp])
\t\tformatString: "$"#,##0
\t\tdisplayFolder: Finanzas
\t\tlineageTag: 73f2cb81-f156-4e62-9ffc-bf9122f10005

\tmeasure 'Senas pagadas' = SUM('${tableName}'[senal_pagada_clp])
\t\tformatString: "$"#,##0
\t\tdisplayFolder: Finanzas
\t\tlineageTag: 73f2cb81-f156-4e62-9ffc-bf9122f10006
`;

  fs.writeFileSync(tableFile, original.replace(/\n(\tcolumn )/, `${measures}\n$1`), "utf8");
}

function addFinanceMeasures() {
  let content = fs.readFileSync(tableFile, "utf8");
  const missing = [];

  if (!content.includes("measure 'Presupuesto confirmado'")) {
    missing.push(`\tmeasure 'Presupuesto confirmado' = CALCULATE([Presupuesto potencial], '${tableName}'[estado_solicitud] = "confirmada")
\t\tformatString: "$"#,##0
\t\tdisplayFolder: Finanzas
\t\tlineageTag: 73f2cb81-f156-4e62-9ffc-bf9122f10007`);
  }
  if (!content.includes("measure 'Presupuesto pendiente'")) {
    missing.push(`\tmeasure 'Presupuesto pendiente' = CALCULATE([Presupuesto potencial], '${tableName}'[estado_solicitud] = "pendiente")
\t\tformatString: "$"#,##0
\t\tdisplayFolder: Finanzas
\t\tlineageTag: 73f2cb81-f156-4e62-9ffc-bf9122f10008`);
  }
  if (!content.includes("measure 'Por cobrar confirmado'")) {
    missing.push(`\tmeasure 'Por cobrar confirmado' = [Presupuesto confirmado] - [Senas pagadas]
\t\tformatString: "$"#,##0
\t\tdisplayFolder: Finanzas
\t\tlineageTag: 73f2cb81-f156-4e62-9ffc-bf9122f10009`);
  }
  if (!content.includes("measure 'Cobertura senas'")) {
    missing.push(`\tmeasure 'Cobertura senas' = DIVIDE([Senas pagadas], [Presupuesto confirmado])
\t\tformatString: 0.0%
\t\tdisplayFolder: Finanzas
\t\tlineageTag: 73f2cb81-f156-4e62-9ffc-bf9122f10010`);
  }

  if (missing.length === 0) return;
  content = content.replace(/\n(\tcolumn )/, `\n${missing.join("\n\n")}\n\n$1`);
  fs.writeFileSync(tableFile, content, "utf8");
}

function addBusinessMeasures() {
  let content = fs.readFileSync(tableFile, "utf8");
  const missing = [];

  if (!content.includes("measure 'Margen operativo estimado %'")) {
    missing.push(`\tmeasure 'Margen operativo estimado %' = 0.4
\t\tformatString: 0%
\t\tdisplayFolder: Gerencia
\t\tlineageTag: 73f2cb81-f156-4e62-9ffc-bf9122f10011`);
  }
  if (!content.includes("measure 'Ganancia estimada'")) {
    missing.push(`\tmeasure 'Ganancia estimada' = [Presupuesto confirmado] * [Margen operativo estimado %]
\t\tformatString: "$"#,##0
\t\tdisplayFolder: Gerencia
\t\tlineageTag: 73f2cb81-f156-4e62-9ffc-bf9122f10012`);
  }
  if (!content.includes("measure 'Ingresos mes actual'")) {
    missing.push(`\tmeasure 'Ingresos mes actual' = CALCULATE([Presupuesto confirmado], '${tableName}'[fecha_solicitud] >= DATE(2026, 6, 1), '${tableName}'[fecha_solicitud] <= DATE(2026, 6, 30))
\t\tformatString: "$"#,##0
\t\tdisplayFolder: Gerencia
\t\tlineageTag: 73f2cb81-f156-4e62-9ffc-bf9122f10013`);
  }
  if (!content.includes("measure 'Ganancia mes actual'")) {
    missing.push(`\tmeasure 'Ganancia mes actual' = [Ingresos mes actual] * [Margen operativo estimado %]
\t\tformatString: "$"#,##0
\t\tdisplayFolder: Gerencia
\t\tlineageTag: 73f2cb81-f156-4e62-9ffc-bf9122f10014`);
  }
  if (!content.includes("measure 'Estimacion anual ingresos'")) {
    missing.push(`\tmeasure 'Estimacion anual ingresos' = [Ingresos mes actual] * 12
\t\tformatString: "$"#,##0
\t\tdisplayFolder: Gerencia
\t\tlineageTag: 73f2cb81-f156-4e62-9ffc-bf9122f10015`);
  }
  if (!content.includes("measure 'Estimacion anual ganancia'")) {
    missing.push(`\tmeasure 'Estimacion anual ganancia' = [Ganancia mes actual] * 12
\t\tformatString: "$"#,##0
\t\tdisplayFolder: Gerencia
\t\tlineageTag: 73f2cb81-f156-4e62-9ffc-bf9122f10016`);
  }
  if (!content.includes("measure 'Ranking artista mensual'")) {
    missing.push(`\tmeasure 'Ranking artista mensual' = RANKX(ALL('${tableName}'[artista_preferido]), [Ingresos mes actual], 0, DESC, Dense)
\t\tformatString: #,##0
\t\tdisplayFolder: Gerencia
\t\tlineageTag: 73f2cb81-f156-4e62-9ffc-bf9122f10017`);
  }

  if (missing.length === 0) return;
  content = content.replace(/\n(\tcolumn )/, `\n${missing.join("\n\n")}\n\n$1`);
  fs.writeFileSync(tableFile, content, "utf8");
}

function applyPage() {
  const pagePath = path.join(pageDir, "page.json");
  const page = JSON.parse(fs.readFileSync(pagePath, "utf8"));
  page.displayName = "Command Center";
  page.displayOption = "FitToPage";
  page.width = 1280;
  page.height = 720;
  writeJson(pagePath, page);
}

function applyPagesMetadata() {
  writeJson(path.join(pagesRoot, "pages.json"), {
    "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/pagesMetadata/1.0.0/schema.json",
    pageOrder: ["17fab5ed598d88453da1", financePageName, businessPageName],
    activePageName: "17fab5ed598d88453da1",
  });
}

function applyFinancePage() {
  writeJson(path.join(financePageDir, "page.json"), {
    "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/page/2.1.0/schema.json",
    name: financePageName,
    displayName: "Flujo de dinero",
    displayOption: "FitToPage",
    height: 720,
    width: 1280,
  });
}

function applyBusinessPage() {
  writeJson(path.join(businessPageDir, "page.json"), {
    "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/page/2.1.0/schema.json",
    name: businessPageName,
    displayName: "Resumen de ventas",
    displayOption: "FitToPage",
    height: 720,
    width: 1280,
  });
}

function applyVisuals() {
  ensureDir(visualsDir);
  const visuals = [
    textVisual("header", 24, 12, 1220, 86, [
      { text: "Ink Pulse Studio · Command Center", size: "22pt", bold: true, color: "#0E2A43" },
      { text: "Reservas, artistas, ventas posibles y dinero confirmado para decidir qué mover hoy.", size: "11pt", color: "#475569" },
    ], 1),
    kpiLabel("kpi_label_1", 24, 108, 180, "Reservas totales", 2),
    cardVisual("kpi_reservas", 24, 142, 180, 72, "Reservas totales", "#0E2A43", 3),
    kpiLabel("kpi_label_2", 224, 108, 180, "Confirmadas", 4),
    cardVisual("kpi_confirmadas", 224, 142, 180, 72, "Reservas confirmadas", "#E31B2F", 5),
    kpiLabel("kpi_label_3", 424, 108, 180, "Conversión", 6),
    cardVisual("kpi_conversion", 424, 142, 180, 72, "Tasa conversion", "#197278", 7),
    kpiLabel("kpi_label_4", 624, 108, 220, "Ventas posibles", 8),
    cardVisual("kpi_potencial", 624, 142, 220, 72, "Presupuesto potencial", "#E31B2F", 9),
    kpiLabel("kpi_label_5", 864, 108, 180, "Promedio por reserva", 10),
    cardVisual("kpi_ticket", 864, 142, 180, 72, "Ticket promedio", "#0E2A43", 11),
    kpiLabel("kpi_label_6", 1064, 108, 180, "Abonos pagados", 12),
    cardVisual("kpi_senas", 1064, 142, 180, 72, "Senas pagadas", "#197278", 13),
    textVisual("chart_title_demanda", 330, 234, 430, 34, [{ text: "Demanda diaria", size: "14pt", bold: true, color: "#0E2A43" }], 14),
    chartVisual("line_demanda", "lineChart", 330, 270, 430, 212, "fecha_solicitud", "Reservas totales", "#E31B2F", 15),
    textVisual("chart_title_artistas", 790, 234, 470, 34, [{ text: "Ventas posibles por artista", size: "14pt", bold: true, color: "#0E2A43" }], 16),
    chartVisual("bar_artistas", "barChart", 790, 270, 470, 212, "artista_preferido", "Presupuesto potencial", "#0E2A43", 17),
    textVisual("filters_title", 24, 236, 270, 54, [
      { text: "Filtros de operación", size: "15pt", bold: true, color: "#0E2A43" },
      { text: "Cambia artista, estado o fuente y mira cómo se mueve el negocio.", size: "10pt", color: "#64748B" },
    ], 18),
    slicerVisual("slicer_artista", 24, 306, 270, 68, "artista_preferido", 19, "Artista"),
    slicerVisual("slicer_estado", 24, 384, 270, 68, "estado_solicitud", 20, "Estado"),
    slicerVisual("slicer_fuente", 24, 462, 270, 68, "fuente_llegada", 21, "Fuente"),
    textVisual("filters_note", 24, 540, 270, 72, [
      { text: "Lectura rápida", size: "13pt", bold: true, color: "#0E2A43" },
      { text: "Si un artista concentra muchas ventas posibles, conviene revisar agenda, disponibilidad y reservas confirmadas.", size: "10pt", color: "#475569" },
    ], 23),
    textVisual("table_title", 330, 492, 930, 30, [{ text: "Oportunidades de alto valor", size: "14pt", bold: true, color: "#0E2A43" }], 22),
    tableVisual(),
  ];

  for (const visual of visuals) {
    writeJson(path.join(visualsDir, visual.name, "visual.json"), visual);
  }
}

function applyFinanceVisuals() {
  ensureDir(financeVisualsDir);
  const visuals = [
    textVisual("finance_header", 24, 12, 1220, 86, [
      { text: "Flujo de dinero · vista rápida", size: "23pt", bold: true, color: "#0E2A43" },
      { text: "Lo importante a simple vista: ventas posibles, ventas confirmadas, abonos y dónde se concentra el negocio.", size: "11pt", color: "#475569" },
    ], 1),
    kpiLabel("finance_label_1", 24, 110, 230, "Ventas posibles", 2),
    cardVisual("finance_potencial", 24, 144, 230, 78, "Presupuesto potencial", "#E31B2F", 3),
    kpiLabel("finance_label_2", 274, 110, 230, "Ventas confirmadas", 4),
    cardVisual("finance_confirmado", 274, 144, 230, 78, "Presupuesto confirmado", "#0E2A43", 5),
    kpiLabel("finance_label_3", 524, 110, 230, "Abonos pagados", 6),
    cardVisual("finance_senas", 524, 144, 230, 78, "Senas pagadas", "#197278", 7),
    kpiLabel("finance_label_4", 774, 110, 220, "Falta cobrar", 8),
    cardVisual("finance_cobrar", 774, 144, 220, 78, "Por cobrar confirmado", "#0E2A43", 9),
    kpiLabel("finance_label_5", 1014, 110, 230, "% pagado por adelantado", 10),
    cardVisual("finance_cobertura", 1014, 144, 230, 78, "Cobertura senas", "#197278", 11),
    textVisual("pie_title_estado", 24, 244, 360, 38, [{ text: "Dinero por estado de reserva", size: "15pt", bold: true, color: "#0E2A43" }], 12),
    pieVisual("pie_estado", "donutChart", 24, 288, 360, 226, "estado_solicitud", "Presupuesto potencial", 13),
    textVisual("pie_title_fuente", 424, 244, 360, 38, [{ text: "De dónde llegan las ventas", size: "15pt", bold: true, color: "#0E2A43" }], 14),
    pieVisual("pie_fuente", "pieChart", 424, 288, 360, 226, "fuente_llegada", "Presupuesto potencial", 15),
    textVisual("pie_title_senas", 824, 244, 420, 38, [{ text: "Abonos por artista", size: "15pt", bold: true, color: "#0E2A43" }], 16),
    pieVisual("pie_senas_artista", "donutChart", 824, 288, 420, 226, "artista_preferido", "Senas pagadas", 17),
    textVisual("money_reading", 24, 548, 1220, 118, [
      { text: "Lectura de negocio", size: "16pt", bold: true, color: "#0E2A43" },
      { text: "1. Si hay muchas ventas posibles pero pocos abonos, falta cerrar mejor las reservas.", size: "11pt", color: "#334155" },
      { text: "2. Si una fuente trae mucho presupuesto, conviene invertir más contenido o difusión ahí.", size: "11pt", color: "#334155" },
      { text: "3. Si un artista concentra muchos abonos, el negocio depende de su agenda y disponibilidad.", size: "11pt", color: "#334155" },
    ], 18),
  ];

  for (const visual of visuals) {
    writeJson(path.join(financeVisualsDir, visual.name, "visual.json"), visual);
  }
}

function applyBusinessVisuals() {
  ensureDir(businessVisualsDir);
  const visuals = [
    textVisual("business_header", 24, 12, 1220, 86, [
      { text: "Resumen de ventas · cuánto genera el negocio", size: "23pt", bold: true, color: "#0E2A43" },
      { text: "Indicadores directos para ver ventas del mes, estimación anual, ganancia y artistas que más venden.", size: "11pt", color: "#475569" },
    ], 1),
    kpiLabel("business_label_1", 24, 110, 230, "Generado este mes", 2),
    cardVisual("business_mes", 24, 144, 230, 78, "Ingresos mes actual", "#E31B2F", 3),
    kpiLabel("business_label_2", 274, 110, 230, "Ganancia mensual estimada", 4),
    cardVisual("business_ganancia_mes", 274, 144, 230, 78, "Ganancia mes actual", "#197278", 5),
    kpiLabel("business_label_3", 524, 110, 230, "Estimación anual ventas", 6),
    cardVisual("business_anual", 524, 144, 230, 78, "Estimacion anual ingresos", "#0E2A43", 7),
    kpiLabel("business_label_4", 774, 110, 230, "Ganancia anual estimada", 8),
    cardVisual("business_ganancia_anual", 774, 144, 230, 78, "Estimacion anual ganancia", "#197278", 9),
    kpiLabel("business_label_5", 1024, 110, 220, "Ganancia por cada venta", 10),
    cardVisual("business_margen", 1024, 144, 220, 78, "Margen operativo estimado %", "#E31B2F", 11),
    textVisual("ranking_title", 24, 246, 540, 38, [{ text: "Ranking de artistas por ventas del mes", size: "16pt", bold: true, color: "#0E2A43" }], 12),
    chartVisual("ranking_artistas_mes", "barChart", 24, 288, 540, 202, "artista_preferido", "Ingresos mes actual", "#0E2A43", 13),
    textVisual("mix_title", 584, 246, 310, 38, [{ text: "Ventas del mes por artista", size: "16pt", bold: true, color: "#0E2A43" }], 14),
    pieVisual("donut_mes_artista", "donutChart", 584, 288, 310, 202, "artista_preferido", "Ingresos mes actual", 15),
    textVisual("estado_title", 934, 246, 310, 38, [{ text: "Ventas confirmadas por estado", size: "16pt", bold: true, color: "#0E2A43" }], 16),
    pieVisual("donut_estado_mes", "donutChart", 934, 288, 310, 202, "estado_solicitud", "Presupuesto confirmado", 17),
    textVisual("business_reading", 24, 520, 1220, 136, [
      { text: "Cómo leer esta hoja", size: "16pt", bold: true, color: "#0E2A43" },
      { text: "1. Generado este mes mira el último mes disponible en los datos y solo considera solicitudes confirmadas.", size: "11pt", color: "#334155" },
      { text: "2. La estimación anual es simple: lo vendido en el mes x 12. Sirve para entender el tamaño del negocio.", size: "11pt", color: "#334155" },
      { text: "3. La ganancia usa un supuesto simple: de cada $100 vendidos, quedan $40 de ganancia antes de impuestos.", size: "11pt", color: "#334155" },
    ], 18),
  ];

  for (const visual of visuals) {
    writeJson(path.join(businessVisualsDir, visual.name, "visual.json"), visual);
  }
}

addMeasures();
addFinanceMeasures();
addBusinessMeasures();
applyPage();
applyPagesMetadata();
applyVisuals();
applyFinancePage();
applyFinanceVisuals();
applyBusinessPage();
applyBusinessVisuals();

console.log("Dashboard base aplicado sobre ink_pulse_studio.pbip");
