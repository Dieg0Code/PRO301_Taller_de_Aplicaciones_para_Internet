const fs = require("fs");
const path = require("path");

const inputFile = path.join(__dirname, "reservas_ink_pulse_studio.csv");
const outDir = path.join(__dirname, "modelo_negocio");

let seed = 20260513;
function random() {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}

function pick(items) {
  return items[Math.floor(random() * items.length)];
}

function roundTo(value, step) {
  return Math.round(value / step) * step;
}

function csv(value) {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function parseCsv(content) {
  const lines = content.trim().split(/\r?\n/);
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const values = [];
    let current = "";
    let quoted = false;
    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      if (char === '"' && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else if (char === '"') {
        quoted = !quoted;
      } else if (char === "," && !quoted) {
        values.push(current);
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  });
}

function writeCsv(file, headers, rows) {
  fs.mkdirSync(outDir, { recursive: true });
  const content = [headers, ...rows].map((row) => row.map(csv).join(",")).join("\n") + "\n";
  fs.writeFileSync(path.join(outDir, file), content, "utf8");
}

function dateAdd(date, days) {
  const d = new Date(`${date}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function minutesBetweenRequestAndResponse(row) {
  const urgencyFactor = row.nivel_urgencia === "alta" ? 0.65 : row.nivel_urgencia === "media" ? 1 : 1.35;
  const channelFactor = row.canal_contacto === "WhatsApp" ? 0.75 : 1.05;
  const base = 25 + random() * 240;
  return Math.round(base * urgencyFactor * channelFactor);
}

function pipelineStage(status) {
  if (status === "confirmada") return "reserva confirmada";
  if (status === "pendiente") return "esperando respuesta cliente";
  if (status === "contactar") return "pendiente de contacto";
  if (status === "reagendada") return "reagendar fecha";
  return "perdida";
}

const raw = fs.readFileSync(inputFile, "utf8");
const leads = parseCsv(raw);

const artistConfig = {
  "Nova Ink": { artist_id: "ART-001", especialidad: "fine line", tarifa_hora_clp: 38000, horas_dia: 6.25, comision_pct: 0.48 },
  Kuro: { artist_id: "ART-002", especialidad: "blackwork", tarifa_hora_clp: 45000, horas_dia: 6.5, comision_pct: 0.52 },
  "Lina Dot": { artist_id: "ART-003", especialidad: "minimalista", tarifa_hora_clp: 34000, horas_dia: 6.0, comision_pct: 0.45 },
  Rayo: { artist_id: "ART-004", especialidad: "tradicional", tarifa_hora_clp: 42000, horas_dia: 6.5, comision_pct: 0.5 },
  "Mila Shade": { artist_id: "ART-005", especialidad: "sombras suaves", tarifa_hora_clp: 40000, horas_dia: 6.25, comision_pct: 0.48 },
  Atlas: { artist_id: "ART-006", especialidad: "piezas grandes", tarifa_hora_clp: 50000, horas_dia: 7.0, comision_pct: 0.55 },
};

const campaignConfig = {
  Instagram: ["CAMP-IG-01", "Reels portafolio", "Instagram organico", 180000],
  TikTok: ["CAMP-TK-01", "Videos proceso", "TikTok organico", 120000],
  Google: ["CAMP-GO-01", "Busqueda local", "Google", 90000],
  recomendacion: ["CAMP-REF-01", "Referidos", "Boca a boca", 0],
  "visita directa": ["CAMP-DIR-01", "Visita directa", "Local fisico", 0],
  "evento AIEP": ["CAMP-AIEP-01", "Activacion AIEP", "Evento", 60000],
  "cliente recurrente": ["CAMP-RET-01", "Clientes que vuelven", "Retencion", 30000],
};

const customerByContact = new Map();
const customers = [];
const requests = [];
const bookings = [];
const sessions = [];
const payments = [];
const costs = [];
const feedback = [];

for (const row of leads) {
  if (!customerByContact.has(row.contacto)) {
    const customerId = `CLI-${String(customers.length + 1).padStart(4, "0")}`;
    const repeat = row.fuente_llegada === "cliente recurrente" || random() < 0.09;
    customerByContact.set(row.contacto, customerId);
    customers.push([
      customerId,
      row.nombre_cliente,
      row.contacto,
      row.canal_contacto,
      row.comuna,
      row.fecha_solicitud,
      repeat ? "si" : "no",
      repeat ? 2 + Math.floor(random() * 4) : 1,
    ]);
  }

  const customerId = customerByContact.get(row.contacto);
  const artist = artistConfig[row.artista_preferido];
  const campaign = campaignConfig[row.fuente_llegada] || campaignConfig.Instagram;
  const quote = Number(row.presupuesto_estimado_clp);
  const responseMinutes = minutesBetweenRequestAndResponse(row);

  requests.push([
    row.reserva_id,
    customerId,
    artist.artist_id,
    campaign[0],
    row.fecha_solicitud,
    row.hora_solicitud,
    row.canal_contacto,
    row.fuente_llegada,
    row.estilo_tatuaje,
    row.zona_cuerpo,
    row.tamano,
    quote,
    responseMinutes,
    row.estado_solicitud,
    pipelineStage(row.estado_solicitud),
    row.score_oportunidad,
  ]);

  if (row.estado_solicitud !== "confirmada") continue;

  const bookingId = row.reserva_id.replace("RES", "BOOK");
  const sessionId = row.reserva_id.replace("RES", "SES");
  const paymentId = row.reserva_id.replace("RES", "PAY");
  const costId = row.reserva_id.replace("RES", "COST");
  const feedbackId = row.reserva_id.replace("RES", "FBK");
  const hours = Number(row.duracion_estimada_horas);
  const abono = Number(row.senal_pagada_clp);
  const finalAmount = roundTo(quote * (0.95 + random() * 0.14), 5000);
  const remaining = Math.max(0, finalAmount - abono);
  const sessionStatus = random() < 0.86 ? "realizada" : random() < 0.55 ? "reprogramada" : "no asistio";
  const paymentStatus = sessionStatus === "realizada" ? "pagado" : "abono recibido";
  const paymentMethod = pick(["transferencia", "debito", "credito", "efectivo"]);
  const finishedDate = sessionStatus === "realizada" ? row.fecha_tentativa : "";

  bookings.push([
    bookingId,
    row.reserva_id,
    customerId,
    artist.artist_id,
    row.fecha_solicitud,
    row.fecha_tentativa,
    row.horario_preferido,
    finalAmount,
    abono,
    remaining,
    paymentStatus,
  ]);

  sessions.push([
    sessionId,
    bookingId,
    artist.artist_id,
    row.fecha_tentativa,
    finishedDate,
    hours,
    sessionStatus,
    row.estilo_tatuaje,
    row.zona_cuerpo,
    row.tamano,
  ]);

  payments.push([
    paymentId,
    bookingId,
    row.fecha_solicitud,
    abono,
    "abono",
    paymentMethod,
  ]);
  if (sessionStatus === "realizada" && remaining > 0) {
    payments.push([
      `${paymentId}-SALDO`,
      bookingId,
      row.fecha_tentativa,
      remaining,
      "saldo final",
      paymentMethod,
    ]);
  }

  const artistCommission = roundTo(finalAmount * artist.comision_pct, 1000);
  const supplies = roundTo(6500 + hours * (7000 + random() * 3500), 500);
  const marketing = campaign[3] > 0 ? roundTo(campaign[3] / 80, 500) : 0;
  const overhead = roundTo(hours * 6500, 500);
  const totalCost = artistCommission + supplies + marketing + overhead;
  costs.push([
    costId,
    bookingId,
    artistCommission,
    supplies,
    marketing,
    overhead,
    totalCost,
    finalAmount - totalCost,
  ]);

  if (sessionStatus === "realizada") {
    const ratingBase = row.fuente_llegada === "recomendacion" || row.fuente_llegada === "cliente recurrente" ? 4.6 : 4.25;
    const rating = Math.min(5, Math.max(3.4, ratingBase + (random() - 0.35))).toFixed(1);
    feedback.push([
      feedbackId,
      bookingId,
      customerId,
      Number(rating),
      Number(rating) >= 4.6 ? "si" : "no",
      random() < 0.12 ? "si" : "no",
      Number(rating) >= 4.5 ? "Muy buena experiencia" : "Buena experiencia, con puntos por mejorar",
    ]);
  }
}

const campaigns = Object.values(campaignConfig).map(([id, name, channel, cost]) => [
  id,
  name,
  channel,
  cost,
  "2026-05-01",
  "2026-06-30",
]);

const artists = Object.entries(artistConfig).map(([name, config]) => [
  config.artist_id,
  name,
  config.especialidad,
  config.tarifa_hora_clp,
  config.horas_dia,
  config.comision_pct,
  "activo",
]);

writeCsv("clientes.csv", ["cliente_id", "nombre_cliente", "contacto", "canal_preferido", "comuna", "primera_solicitud", "cliente_recurrente", "visitas_estimadas"], customers);
writeCsv("artistas.csv", ["artista_id", "nombre_artista", "especialidad", "tarifa_hora_clp", "horas_disponibles_dia", "comision_pct", "estado"], artists);
writeCsv("campanas.csv", ["campana_id", "nombre_campana", "canal", "costo_campana_clp", "fecha_inicio", "fecha_fin"], campaigns);
writeCsv("solicitudes.csv", ["solicitud_id", "cliente_id", "artista_id", "campana_id", "fecha_solicitud", "hora_solicitud", "canal_contacto", "fuente_llegada", "estilo_tatuaje", "zona_cuerpo", "tamano", "monto_cotizado_clp", "minutos_respuesta", "estado_solicitud", "etapa_pipeline", "score_oportunidad"], requests);
writeCsv("reservas.csv", ["reserva_id", "solicitud_id", "cliente_id", "artista_id", "fecha_reserva", "fecha_agendada", "horario_preferido", "monto_final_clp", "abono_clp", "saldo_por_cobrar_clp", "estado_pago"], bookings);
writeCsv("sesiones.csv", ["sesion_id", "reserva_id", "artista_id", "fecha_agendada", "fecha_realizada", "duracion_horas", "estado_sesion", "estilo_tatuaje", "zona_cuerpo", "tamano"], sessions);
writeCsv("pagos.csv", ["pago_id", "reserva_id", "fecha_pago", "monto_clp", "tipo_pago", "metodo_pago"], payments);
writeCsv("costos.csv", ["costo_id", "reserva_id", "comision_artista_clp", "insumos_clp", "marketing_atribuido_clp", "costo_fijo_estimado_clp", "costo_total_clp", "ganancia_estimada_clp"], costs);
writeCsv("feedback.csv", ["feedback_id", "reserva_id", "cliente_id", "rating", "recomendaria", "hubo_reclamo", "comentario"], feedback);

const revenue = bookings.reduce((sum, row) => sum + Number(row[7]), 0);
const profit = costs.reduce((sum, row) => sum + Number(row[7]), 0);
const avgResponse = Math.round(requests.reduce((sum, row) => sum + Number(row[12]), 0) / requests.length);

console.log(`Modelo generado en: ${outDir}`);
console.log(`Solicitudes: ${requests.length}`);
console.log(`Reservas confirmadas: ${bookings.length}`);
console.log(`Pagos: ${payments.length}`);
console.log(`Ventas confirmadas: $${revenue.toLocaleString("es-CL")}`);
console.log(`Ganancia estimada: $${profit.toLocaleString("es-CL")}`);
console.log(`Tiempo promedio de respuesta: ${avgResponse} minutos`);
