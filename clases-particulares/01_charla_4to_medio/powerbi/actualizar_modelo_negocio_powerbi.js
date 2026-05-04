const fs = require("fs");
const path = require("path");

const root = __dirname;
const dataDir = path.resolve(root, "../datos/modelo_negocio");
const reportDir = path.join(root, "ink_pulse_studio.Report");
const modelDir = path.join(root, "ink_pulse_studio.SemanticModel");
const pagesRoot = path.join(reportDir, "definition", "pages");
const tablesDir = path.join(modelDir, "definition", "tables");
const modelFile = path.join(modelDir, "definition", "model.tmdl");
const relationshipsFile = path.join(modelDir, "definition", "relationships.tmdl");

const tableSpecs = {
  clientes: {
    file: "clientes.csv",
    columns: [
      ["cliente_id", "string"], ["nombre_cliente", "string"], ["contacto", "string"], ["canal_preferido", "string"],
      ["comuna", "string"], ["primera_solicitud", "dateTime"], ["cliente_recurrente", "string"], ["visitas_estimadas", "int64"],
    ],
  },
  artistas: {
    file: "artistas.csv",
    columns: [
      ["artista_id", "string"], ["nombre_artista", "string"], ["especialidad", "string"], ["tarifa_hora_clp", "int64"],
      ["horas_disponibles_dia", "double"], ["comision_pct", "double"], ["estado", "string"],
    ],
  },
  campanas: {
    file: "campanas.csv",
    columns: [
      ["campana_id", "string"], ["nombre_campana", "string"], ["canal", "string"], ["costo_campana_clp", "int64"],
      ["fecha_inicio", "dateTime"], ["fecha_fin", "dateTime"],
    ],
  },
  solicitudes: {
    file: "solicitudes.csv",
    columns: [
      ["solicitud_id", "string"], ["cliente_id", "string"], ["artista_id", "string"], ["campana_id", "string"],
      ["fecha_solicitud", "dateTime"], ["hora_solicitud", "string"], ["canal_contacto", "string"], ["fuente_llegada", "string"],
      ["estilo_tatuaje", "string"], ["zona_cuerpo", "string"], ["tamano", "string"], ["monto_cotizado_clp", "int64"],
      ["minutos_respuesta", "int64"], ["estado_solicitud", "string"], ["etapa_pipeline", "string"], ["score_oportunidad", "int64"],
    ],
    measures: [
      ["Solicitudes", "COUNTROWS('solicitudes')", "#,##0", "Comercial"],
      ["Reservas confirmadas BI", "CALCULATE([Solicitudes], 'solicitudes'[estado_solicitud] = \"confirmada\")", "#,##0", "Comercial"],
      ["Conversion BI", "DIVIDE([Reservas confirmadas BI], [Solicitudes])", "0.0%", "Comercial"],
      ["Tiempo respuesta promedio", "AVERAGE('solicitudes'[minutos_respuesta])", "#,##0", "Comercial"],
      ["Ventas posibles BI", "SUM('solicitudes'[monto_cotizado_clp])", "\"$\"#,##0", "Comercial"],
    ],
  },
  reservas: {
    file: "reservas.csv",
    columns: [
      ["reserva_id", "string"], ["solicitud_id", "string"], ["cliente_id", "string"], ["artista_id", "string"],
      ["fecha_reserva", "dateTime"], ["fecha_agendada", "dateTime"], ["horario_preferido", "string"], ["monto_final_clp", "int64"],
      ["abono_clp", "int64"], ["saldo_por_cobrar_clp", "int64"], ["estado_pago", "string"],
    ],
    measures: [
      ["Reservas", "COUNTROWS('reservas')", "#,##0", "Ventas"],
      ["Ventas confirmadas BI", "SUM('reservas'[monto_final_clp])", "\"$\"#,##0", "Ventas"],
      ["Abonos BI", "SUM('reservas'[abono_clp])", "\"$\"#,##0", "Ventas"],
      ["Falta cobrar BI", "SUM('reservas'[saldo_por_cobrar_clp])", "\"$\"#,##0", "Ventas"],
      ["Ticket real promedio", "AVERAGE('reservas'[monto_final_clp])", "\"$\"#,##0", "Ventas"],
    ],
  },
  sesiones: {
    file: "sesiones.csv",
    columns: [
      ["sesion_id", "string"], ["reserva_id", "string"], ["artista_id", "string"], ["fecha_agendada", "dateTime"],
      ["fecha_realizada", "dateTime"], ["duracion_horas", "double"], ["estado_sesion", "string"], ["estilo_tatuaje", "string"],
      ["zona_cuerpo", "string"], ["tamano", "string"],
    ],
    measures: [
      ["Sesiones", "COUNTROWS('sesiones')", "#,##0", "Operacion"],
      ["Horas agendadas", "SUM('sesiones'[duracion_horas])", "#,##0.0", "Operacion"],
      ["Sesiones realizadas", "CALCULATE([Sesiones], 'sesiones'[estado_sesion] = \"realizada\")", "#,##0", "Operacion"],
      ["Asistencia", "DIVIDE([Sesiones realizadas], [Sesiones])", "0.0%", "Operacion"],
    ],
  },
  pagos: {
    file: "pagos.csv",
    columns: [
      ["pago_id", "string"], ["reserva_id", "string"], ["fecha_pago", "dateTime"], ["monto_clp", "int64"], ["tipo_pago", "string"], ["metodo_pago", "string"],
    ],
    measures: [["Pagos recibidos BI", "SUM('pagos'[monto_clp])", "\"$\"#,##0", "Caja"]],
  },
  costos: {
    file: "costos.csv",
    columns: [
      ["costo_id", "string"], ["reserva_id", "string"], ["comision_artista_clp", "int64"], ["insumos_clp", "int64"],
      ["marketing_atribuido_clp", "int64"], ["costo_fijo_estimado_clp", "int64"], ["costo_total_clp", "int64"], ["ganancia_estimada_clp", "int64"],
    ],
    measures: [
      ["Costos BI", "SUM('costos'[costo_total_clp])", "\"$\"#,##0", "Rentabilidad"],
      ["Ganancia BI", "SUM('costos'[ganancia_estimada_clp])", "\"$\"#,##0", "Rentabilidad"],
      ["Margen real estimado", "DIVIDE([Ganancia BI], [Ventas confirmadas BI])", "0.0%", "Rentabilidad"],
      ["Insumos BI", "SUM('costos'[insumos_clp])", "\"$\"#,##0", "Rentabilidad"],
      ["Comisiones artistas BI", "SUM('costos'[comision_artista_clp])", "\"$\"#,##0", "Rentabilidad"],
    ],
  },
  feedback: {
    file: "feedback.csv",
    columns: [
      ["feedback_id", "string"], ["reserva_id", "string"], ["cliente_id", "string"], ["rating", "double"],
      ["recomendaria", "string"], ["hubo_reclamo", "string"], ["comentario", "string"],
    ],
    measures: [
      ["Feedbacks", "COUNTROWS('feedback')", "#,##0", "Clientes"],
      ["Rating promedio", "AVERAGE('feedback'[rating])", "0.0", "Clientes"],
      ["Clientes recomiendan", "CALCULATE([Feedbacks], 'feedback'[recomendaria] = \"si\")", "#,##0", "Clientes"],
      ["Tasa recomendacion", "DIVIDE([Clientes recomiendan], [Feedbacks])", "0.0%", "Clientes"],
    ],
  },
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(file, value) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, JSON.stringify(value, null, 2), "utf8");
}

function writeText(file, value) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, value, "utf8");
}

function literal(value) {
  if (typeof value === "boolean") return { expr: { Literal: { Value: value ? "true" : "false" } } };
  if (typeof value === "number") return { expr: { Literal: { Value: `${value}D` } } };
  return { expr: { Literal: { Value: `'${value}'` } } };
}

function fieldColumn(entity, property) {
  return {
    field: { Column: { Expression: { SourceRef: { Entity: entity } }, Property: property } },
    queryRef: `${entity}.${property}`,
    nativeQueryRef: property,
    active: true,
  };
}

function fieldMeasure(entity, property) {
  return {
    field: { Measure: { Expression: { SourceRef: { Entity: entity } }, Property: property } },
    queryRef: `${entity}.${property}`,
    nativeQueryRef: property,
  };
}

function tmdlType(type) {
  if (type === "dateTime") return ["dateTime", "\t\tformatString: Short Date"];
  if (type === "double") return ["double", "\t\tformatString: 0.00"];
  if (type === "int64") return ["int64", "\t\tformatString: 0"];
  return ["string", ""];
}

function mType(type) {
  if (type === "dateTime") return "type date";
  if (type === "double") return "type number";
  if (type === "int64") return "Int64.Type";
  return "type text";
}

function guid(seed) {
  let hash = 2166136261;
  for (const char of seed) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  const hex = Array.from({ length: 32 }, (_, index) => {
    hash ^= seed.charCodeAt(index % seed.length) + index;
    hash = Math.imul(hash, 16777619) >>> 0;
    return (hash & 0xf).toString(16);
  }).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-8${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
}

function tableTmdl(name, spec) {
  const lines = [`table ${name}`, `\tlineageTag: ${guid(`table${name}`)}`, ""];
  for (const [measureName, expr, format, folder] of spec.measures || []) {
    lines.push(`\tmeasure '${measureName}' = ${expr}`);
    lines.push(`\t\tformatString: ${format}`);
    lines.push(`\t\tdisplayFolder: ${folder}`);
    lines.push(`\t\tlineageTag: ${guid(`measure${name}${measureName}`)}`);
    lines.push("");
  }
  for (const [columnName, type] of spec.columns) {
    const [dtype, format] = tmdlType(type);
    lines.push(`\tcolumn ${columnName}`);
    lines.push(`\t\tdataType: ${dtype}`);
    if (format) lines.push(format);
    lines.push(`\t\tlineageTag: ${guid(`column${name}${columnName}`)}`);
    lines.push(`\t\tsummarizeBy: ${type === "string" || type === "dateTime" ? "none" : "sum"}`);
    lines.push(`\t\tsourceColumn: ${columnName}`);
    lines.push("");
  }
  const csvPath = path.join(dataDir, spec.file);
  const transformTypes = spec.columns.map(([columnName, type]) => `{"${columnName}", ${mType(type)}}`).join(", ");
  lines.push(`\tpartition ${name} = m`);
  lines.push(`\t\tmode: import`);
  lines.push(`\t\tsource =`);
  lines.push(`\t\t\t\tlet`);
  lines.push(`\t\t\t\t    Origen = Csv.Document(File.Contents("${csvPath}"),[Delimiter=",", Columns=${spec.columns.length}, Encoding=65001, QuoteStyle=QuoteStyle.Csv]),`);
  lines.push(`\t\t\t\t    #"Encabezados promovidos" = Table.PromoteHeaders(Origen, [PromoteAllScalars=true]),`);
  lines.push(`\t\t\t\t    #"Tipo cambiado" = Table.TransformColumnTypes(#"Encabezados promovidos",{${transformTypes}})`);
  lines.push(`\t\t\t\tin`);
  lines.push(`\t\t\t\t    #"Tipo cambiado"`);
  lines.push("");
  lines.push(`\tannotation PBI_ResultType = Table`);
  lines.push("");
  return lines.join("\n");
}

function updateModelFile() {
  let content = fs.readFileSync(modelFile, "utf8");
  const tableRefs = Object.keys(tableSpecs).map((name) => `ref table ${name}`).join("\n");
  for (const name of Object.keys(tableSpecs)) {
    if (!content.includes(`ref table ${name}`)) {
      content = content.replace("\nref cultureInfo es-ES", `\n${tableRefs}\n\nref cultureInfo es-ES`);
      break;
    }
  }
  const order = JSON.stringify(["reservas_ink_pulse_studio", ...Object.keys(tableSpecs)]);
  content = content.replace(/annotation PBI_QueryOrder = .+/, `annotation PBI_QueryOrder = ${order}`);
  writeText(modelFile, content);
}

function updateRelationships() {
  const existing = fs.existsSync(relationshipsFile) ? fs.readFileSync(relationshipsFile, "utf8").trim() : "";
  const base = existing
    .split(/\n(?=relationship )/)
    .filter(block => block.includes("reservas_ink_pulse_studio"))
    .join("\n\n");
  const rels = [
    ["rel_solicitudes_clientes", "solicitudes.cliente_id", "clientes.cliente_id"],
    ["rel_solicitudes_artistas", "solicitudes.artista_id", "artistas.artista_id"],
    ["rel_solicitudes_campanas", "solicitudes.campana_id", "campanas.campana_id"],
    ["rel_reservas_solicitudes", "reservas.solicitud_id", "solicitudes.solicitud_id"],
    ["rel_sesiones_reservas", "sesiones.reserva_id", "reservas.reserva_id"],
    ["rel_pagos_reservas", "pagos.reserva_id", "reservas.reserva_id"],
    ["rel_costos_reservas", "costos.reserva_id", "reservas.reserva_id"],
    ["rel_feedback_reservas", "feedback.reserva_id", "reservas.reserva_id"],
  ];
  const additions = rels
    .map(([name, from, to]) => `relationship ${guid(name)}\n\tfromColumn: ${from}\n\ttoColumn: ${to}\n`)
    .join("\n");
  writeText(relationshipsFile, `${base}\n\n${additions}`.trim() + "\n");
}

function textVisual(name, x, y, width, height, paragraphs, z = 0) {
  return {
    "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.8.0/schema.json",
    name,
    position: { x, y, z, height, width, tabOrder: z },
    visual: {
      visualType: "textbox",
      objects: {
        general: [{ properties: { paragraphs: paragraphs.map((p) => ({
          textRuns: [{ value: p.text, textStyle: { fontSize: p.size || "12pt", fontWeight: p.bold ? "bold" : "normal", color: p.color || "#1F2937" } }],
          horizontalTextAlignment: p.align || "left",
        })) } }],
      },
      drillFilterOtherVisuals: true,
    },
  };
}

function card(name, x, y, width, height, entity, measureName, color, z) {
  return {
    "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.8.0/schema.json",
    name,
    position: { x, y, z, height, width, tabOrder: z },
    visual: {
      visualType: "card",
      query: { queryState: { Values: { projections: [fieldMeasure(entity, measureName)] } } },
      objects: {
        labels: [{ properties: { color: { solid: { color: literal(color) } }, fontSize: literal(28), fontFamily: literal("Segoe UI Semibold") } }],
        categoryLabels: [{ properties: { show: literal(false) } }],
      },
      drillFilterOtherVisuals: true,
    },
  };
}

function label(name, x, y, width, text, z) {
  return textVisual(name, x, y, width, 34, [{ text, size: "11pt", bold: true, color: "#334155" }], z);
}

function chart(name, visualType, x, y, width, height, categoryEntity, category, measureEntity, measureName, color, z) {
  return {
    "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.8.0/schema.json",
    name,
    position: { x, y, z, height, width, tabOrder: z },
    visual: {
      visualType,
      query: {
        queryState: {
          Category: { projections: [fieldColumn(categoryEntity, category)] },
          Y: { projections: [fieldMeasure(measureEntity, measureName)] },
        },
        sortDefinition: { sort: [{ field: fieldMeasure(measureEntity, measureName).field, direction: "Descending" }] },
      },
      objects: {
        title: [{ properties: { show: literal(false) } }],
        dataPoint: [{ properties: { fill: { solid: { color: literal(color) } } } }],
        labels: [{ properties: { show: literal(true), fontSize: literal(10), color: { solid: { color: literal("#0E2A43") } } } }],
      },
      drillFilterOtherVisuals: true,
    },
  };
}

function donut(name, x, y, width, height, categoryEntity, category, measureEntity, measureName, z) {
  const v = chart(name, "donutChart", x, y, width, height, categoryEntity, category, measureEntity, measureName, "#0E2A43", z);
  v.visual.objects.labels = [{ properties: { show: literal(false) } }];
  v.visual.objects.legend = [{ properties: { show: literal(true), position: literal("RightCenter"), fontSize: literal(10) } }];
  return v;
}

function makePage(pageName, displayName, visuals) {
  const pageDir = path.join(pagesRoot, pageName);
  writeJson(path.join(pageDir, "page.json"), {
    "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/page/2.1.0/schema.json",
    name: pageName,
    displayName,
    displayOption: "FitToPage",
    height: 720,
    width: 1280,
  });
  for (const visual of visuals) writeJson(path.join(pageDir, "visuals", visual.name, "visual.json"), visual);
}

function updatePagesMetadata() {
  writeJson(path.join(pagesRoot, "pages.json"), {
    "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/pagesMetadata/1.0.0/schema.json",
    pageOrder: [
      "17fab5ed598d88453da1",
      "flujo_dinero",
      "indicadores_gerenciales",
      "canales_conversion",
      "rentabilidad_real",
      "operacion_agenda",
      "clientes_feedback",
    ],
    activePageName: "17fab5ed598d88453da1",
  });
}

function buildPages() {
  const headerColor = "#0E2A43";
  makePage("canales_conversion", "Canales y conversión", [
    textVisual("h", 24, 14, 1220, 62, [
      { text: "Canales y conversión", size: "23pt", bold: true, color: headerColor },
      { text: "De dónde llegan las solicitudes y qué canales realmente se transforman en reservas.", size: "11pt", color: "#475569" },
    ], 1),
    label("l1", 24, 88, 230, "Solicitudes recibidas", 2), card("c1", 24, 122, 230, 78, "solicitudes", "Solicitudes", "#0E2A43", 3),
    label("l2", 274, 88, 230, "Reservas confirmadas", 4), card("c2", 274, 122, 230, 78, "solicitudes", "Reservas confirmadas BI", "#E31B2F", 5),
    label("l3", 524, 88, 230, "Conversión", 6), card("c3", 524, 122, 230, 78, "solicitudes", "Conversion BI", "#197278", 7),
    label("l4", 774, 88, 230, "Respuesta promedio", 8), card("c4", 774, 122, 230, 78, "solicitudes", "Tiempo respuesta promedio", "#0E2A43", 9),
    label("l5", 1024, 88, 220, "Ventas posibles", 10), card("c5", 1024, 122, 220, 78, "solicitudes", "Ventas posibles BI", "#E31B2F", 11),
    textVisual("t1", 24, 230, 570, 36, [{ text: "Solicitudes por fuente", size: "16pt", bold: true, color: headerColor }], 12),
    chart("bar_fuentes", "barChart", 24, 270, 570, 250, "solicitudes", "fuente_llegada", "solicitudes", "Solicitudes", "#0E2A43", 13),
    textVisual("t2", 640, 230, 600, 36, [{ text: "Reservas confirmadas por campaña", size: "16pt", bold: true, color: headerColor }], 14),
    chart("bar_campanas", "barChart", 640, 270, 600, 250, "campanas", "nombre_campana", "solicitudes", "Reservas confirmadas BI", "#E31B2F", 15),
    textVisual("note", 24, 550, 1220, 110, [
      { text: "Lectura rápida", size: "16pt", bold: true, color: headerColor },
      { text: "No basta con tener muchas visitas. El canal bueno es el que trae personas que reservan.", size: "11pt", color: "#334155" },
      { text: "Si un canal trae muchas solicitudes pero pocas reservas, hay que revisar precio, respuesta o calidad del lead.", size: "11pt", color: "#334155" },
    ], 16),
  ]);

  makePage("rentabilidad_real", "Rentabilidad", [
    textVisual("h", 24, 14, 1220, 62, [
      { text: "Rentabilidad real estimada", size: "23pt", bold: true, color: headerColor },
      { text: "Ventas, costos y ganancia: aquí se ve si el negocio solo factura o realmente deja dinero.", size: "11pt", color: "#475569" },
    ], 1),
    label("l1", 24, 88, 230, "Ventas confirmadas", 2), card("c1", 24, 122, 230, 78, "reservas", "Ventas confirmadas BI", "#E31B2F", 3),
    label("l2", 274, 88, 230, "Costos estimados", 4), card("c2", 274, 122, 230, 78, "costos", "Costos BI", "#0E2A43", 5),
    label("l3", 524, 88, 230, "Ganancia estimada", 6), card("c3", 524, 122, 230, 78, "costos", "Ganancia BI", "#197278", 7),
    label("l4", 774, 88, 230, "Margen real estimado", 8), card("c4", 774, 122, 230, 78, "costos", "Margen real estimado", "#E31B2F", 9),
    label("l5", 1024, 88, 220, "Pagos recibidos", 10), card("c5", 1024, 122, 220, 78, "pagos", "Pagos recibidos BI", "#0E2A43", 11),
    textVisual("t1", 24, 230, 570, 36, [{ text: "Ganancia por artista", size: "16pt", bold: true, color: headerColor }], 12),
    chart("bar_profit_artist", "barChart", 24, 270, 570, 250, "artistas", "nombre_artista", "costos", "Ganancia BI", "#197278", 13),
    textVisual("t2", 640, 230, 600, 36, [{ text: "Costos principales", size: "16pt", bold: true, color: headerColor }], 14),
    donut("donut_costos", 640, 270, 600, 250, "artistas", "nombre_artista", "costos", "Costos BI", 15),
    textVisual("note", 24, 550, 1220, 110, [
      { text: "Lectura rápida", size: "16pt", bold: true, color: headerColor },
      { text: "Facturar mucho no siempre significa ganar mucho. La ganancia depende de comisiones, insumos, marketing y tiempo.", size: "11pt", color: "#334155" },
      { text: "Esta hoja permite explicar por qué Power BI ayuda a tomar decisiones de negocio, no solo a mirar gráficos.", size: "11pt", color: "#334155" },
    ], 16),
  ]);

  makePage("operacion_agenda", "Operación y agenda", [
    textVisual("h", 24, 14, 1220, 62, [
      { text: "Operación y agenda", size: "23pt", bold: true, color: headerColor },
      { text: "Horas de trabajo, sesiones realizadas y capacidad de los artistas.", size: "11pt", color: "#475569" },
    ], 1),
    label("l1", 24, 88, 230, "Sesiones agendadas", 2), card("c1", 24, 122, 230, 78, "sesiones", "Sesiones", "#0E2A43", 3),
    label("l2", 274, 88, 230, "Sesiones realizadas", 4), card("c2", 274, 122, 230, 78, "sesiones", "Sesiones realizadas", "#197278", 5),
    label("l3", 524, 88, 230, "Horas agendadas", 6), card("c3", 524, 122, 230, 78, "sesiones", "Horas agendadas", "#E31B2F", 7),
    label("l4", 774, 88, 230, "Asistencia", 8), card("c4", 774, 122, 230, 78, "sesiones", "Asistencia", "#0E2A43", 9),
    label("l5", 1024, 88, 220, "Reservas", 10), card("c5", 1024, 122, 220, 78, "reservas", "Reservas", "#197278", 11),
    textVisual("t1", 24, 230, 570, 36, [{ text: "Horas por artista", size: "16pt", bold: true, color: headerColor }], 12),
    chart("bar_horas_artist", "barChart", 24, 270, 570, 250, "artistas", "nombre_artista", "sesiones", "Horas agendadas", "#0E2A43", 13),
    textVisual("t2", 640, 230, 600, 36, [{ text: "Estado de sesiones", size: "16pt", bold: true, color: headerColor }], 14),
    donut("donut_estado_sesion", 640, 270, 600, 250, "sesiones", "estado_sesion", "sesiones", "Sesiones", 15),
    textVisual("note", 24, 550, 1220, 110, [
      { text: "Lectura rápida", size: "16pt", bold: true, color: headerColor },
      { text: "Un tatuador no puede hacer infinitos tatuajes: el recurso escaso es la agenda.", size: "11pt", color: "#334155" },
      { text: "Esta hoja ayuda a ver quién está más cargado y si el negocio necesita ajustar horarios, precios o contratar apoyo.", size: "11pt", color: "#334155" },
    ], 16),
  ]);

  makePage("clientes_feedback", "Clientes y satisfacción", [
    textVisual("h", 24, 14, 1220, 62, [
      { text: "Clientes y satisfacción", size: "23pt", bold: true, color: headerColor },
      { text: "No basta vender una vez: importa que el cliente vuelva, recomiende y deje una buena experiencia.", size: "11pt", color: "#475569" },
    ], 1),
    label("l1", 24, 88, 230, "Clientes", 2), card("c1", 24, 122, 230, 78, "solicitudes", "Solicitudes", "#0E2A43", 3),
    label("l2", 274, 88, 230, "Feedbacks recibidos", 4), card("c2", 274, 122, 230, 78, "feedback", "Feedbacks", "#197278", 5),
    label("l3", 524, 88, 230, "Nota promedio", 6), card("c3", 524, 122, 230, 78, "feedback", "Rating promedio", "#E31B2F", 7),
    label("l4", 774, 88, 230, "Recomendarían", 8), card("c4", 774, 122, 230, 78, "feedback", "Tasa recomendacion", "#197278", 9),
    label("l5", 1024, 88, 220, "Reservas", 10), card("c5", 1024, 122, 220, 78, "reservas", "Reservas", "#0E2A43", 11),
    textVisual("t1", 24, 230, 570, 36, [{ text: "Clientes por comuna", size: "16pt", bold: true, color: headerColor }], 12),
    chart("bar_comuna", "barChart", 24, 270, 570, 250, "clientes", "comuna", "solicitudes", "Solicitudes", "#0E2A43", 13),
    textVisual("t2", 640, 230, 600, 36, [{ text: "Recomendación", size: "16pt", bold: true, color: headerColor }], 14),
    donut("donut_recomienda", 640, 270, 600, 250, "feedback", "recomendaria", "feedback", "Feedbacks", 15),
    textVisual("note", 24, 550, 1220, 110, [
      { text: "Lectura rápida", size: "16pt", bold: true, color: headerColor },
      { text: "Los datos también sirven para cuidar experiencia: reseñas, reclamos y clientes que podrían volver.", size: "11pt", color: "#334155" },
      { text: "Para una pyme, un cliente que recomienda puede valer más que una campaña pagada.", size: "11pt", color: "#334155" },
    ], 16),
  ]);
}

function polishHeaderSpacing() {
  const yMap = new Map([
    [78, 108], [86, 110], [88, 112],
    [112, 142], [120, 144], [122, 146],
    [204, 234], [206, 236], [222, 244], [226, 246], [230, 248],
    [240, 270], [266, 288], [268, 288], [270, 288],
  ]);
  const heightMap = new Map([[242, 212], [248, 226], [250, 232], [222, 202]]);
  const headerNames = new Set(["header", "finance_header", "business_header", "h"]);

  for (const visualFile of fs.readdirSync(pagesRoot, { recursive: true })
    .filter((file) => file.endsWith("visual.json"))
    .map((file) => path.join(pagesRoot, file))) {
    const visual = JSON.parse(fs.readFileSync(visualFile, "utf8"));
    if (!visual.position) continue;

    if (headerNames.has(visual.name)) {
      visual.position.height = 86;
    } else {
      if (yMap.has(visual.position.y)) visual.position.y = yMap.get(visual.position.y);
      if (heightMap.has(visual.position.height)) visual.position.height = heightMap.get(visual.position.height);
    }

    writeJson(visualFile, visual);
  }
}

for (const [name, spec] of Object.entries(tableSpecs)) {
  writeText(path.join(tablesDir, `${name}.tmdl`), tableTmdl(name, spec));
}
updateModelFile();
updateRelationships();
updatePagesMetadata();
buildPages();
polishHeaderSpacing();

console.log("Modelo de negocio y hojas nuevas aplicadas al PBIP.");
