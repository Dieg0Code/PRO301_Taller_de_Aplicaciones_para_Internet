const fs = require("fs");
const path = require("path");

const outFile = path.join(__dirname, "reservas_ink_pulse_studio.csv");

let seed = 13052026;
function random() {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}

function pick(items) {
  return items[Math.floor(random() * items.length)];
}

function weightedPick(items) {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let cursor = random() * total;
  for (const item of items) {
    cursor -= item.weight;
    if (cursor <= 0) return item.value;
  }
  return items.at(-1).value;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function parseDate(date) {
  return new Date(`${date}T00:00:00`);
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function dateAdd(base, days) {
  const d = typeof base === "string" ? parseDate(base) : new Date(base);
  d.setDate(d.getDate() + days);
  return formatDate(d);
}

function csv(value) {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function roundTo(value, step) {
  return Math.round(value / step) * step;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function isWorkingDay(date) {
  const day = date.getDay();
  return day >= 2 && day <= 6; // martes a sabado
}

const firstNames = [
  "Valentina", "Matias", "Camila", "Sebastian", "Fernanda", "Tomas", "Antonia", "Diego",
  "Josefa", "Nicolas", "Javiera", "Benjamin", "Catalina", "Ignacio", "Sofia", "Lucas",
  "Francisca", "Vicente", "Martina", "Cristobal", "Isidora", "Agustin", "Constanza", "Felipe",
  "Renata", "Maximiliano", "Florencia", "Bastian", "Emilia", "Joaquin", "Trinidad", "Gabriel",
];

const lastNames = [
  "Rojas", "Munoz", "Vargas", "Soto", "Mansilla", "Carrasco", "Paredes", "Navarro",
  "Vera", "Gallardo", "Araya", "Godoy", "Cortes", "Leiva", "Espinoza", "Miranda",
  "Saavedra", "Oyarzo", "Cardenas", "Alvarez", "Bravo", "Reyes", "Castillo", "Morales",
];

const artists = [
  { name: "Nova Ink", specialty: "fine line", styles: ["fine line", "minimalista", "lettering"], rate: 38000, maxHours: 6.25 },
  { name: "Kuro", specialty: "blackwork", styles: ["blackwork", "geometrico", "tradicional"], rate: 45000, maxHours: 6.5 },
  { name: "Lina Dot", specialty: "minimalista", styles: ["minimalista", "fine line", "geometrico"], rate: 34000, maxHours: 6.0 },
  { name: "Rayo", specialty: "tradicional", styles: ["tradicional", "blackwork", "lettering"], rate: 42000, maxHours: 6.5 },
  { name: "Mila Shade", specialty: "sombras suaves", styles: ["fine line", "geometrico", "minimalista"], rate: 40000, maxHours: 6.25 },
  { name: "Atlas", specialty: "piezas grandes", styles: ["blackwork", "tradicional", "geometrico"], rate: 50000, maxHours: 7.0 },
];

const zones = [
  ["brazo", 1.0], ["antebrazo", 0.95], ["pierna", 1.08], ["espalda", 1.28],
  ["pecho", 1.22], ["cuello", 1.22], ["muneca", 0.82], ["tobillo", 0.86],
  ["costillas", 1.3], ["hombro", 1.06], ["mano/dedos", 1.12],
];

const sizes = [
  { label: "pequeno", hours: [0.75, 1.0, 1.25], min: 40000, max: 80000, weight: 34 },
  { label: "mediano", hours: [1.75, 2.25, 3.0], min: 85000, max: 170000, weight: 38 },
  { label: "grande", hours: [3.5, 4.5, 5.5], min: 180000, max: 330000, weight: 20 },
  { label: "sesion larga", hours: [5.0, 6.0, 7.0], min: 260000, max: 450000, weight: 8 },
];

const styleFactors = {
  minimalista: 0.88,
  "fine line": 0.95,
  lettering: 0.92,
  geometrico: 1.05,
  tradicional: 1.12,
  blackwork: 1.18,
};

const sources = [
  "Instagram", "Instagram", "TikTok", "TikTok", "Google", "recomendacion",
  "visita directa", "evento AIEP", "cliente recurrente",
];
const contactChannels = ["Instagram", "WhatsApp", "WhatsApp"];
const schedules = ["manana", "mediodia", "tarde", "tarde", "fin de semana"];
const communes = ["Osorno", "Rahue", "Ovejeria", "Francke", "Purranque", "Rio Negro", "Puerto Octay", "San Pablo"];
const urgency = ["baja", "media", "media", "alta"];

const headers = [
  "reserva_id",
  "fecha_solicitud",
  "hora_solicitud",
  "nombre_cliente",
  "contacto",
  "canal_contacto",
  "fuente_llegada",
  "comuna",
  "artista_preferido",
  "especialidad_artista",
  "estilo_tatuaje",
  "zona_cuerpo",
  "tamano",
  "presupuesto_estimado_clp",
  "fecha_tentativa",
  "horario_preferido",
  "estado_solicitud",
  "senal_pagada_clp",
  "duracion_estimada_horas",
  "requiere_diseno_personalizado",
  "nivel_urgencia",
  "score_oportunidad",
  "mensaje_resumen",
];

const agenda = new Map();
const rows = [];
const baseDate = "2026-05-13";

function agendaKey(artist, date) {
  return `${artist.name}|${date}`;
}

function usedHours(artist, date) {
  return agenda.get(agendaKey(artist, date)) || 0;
}

function reserveHours(artist, date, hours) {
  const key = agendaKey(artist, date);
  agenda.set(key, usedHours(artist, date) + hours);
}

function findSlot(artist, requestDate, hours) {
  for (let offset = 3; offset <= 55; offset += 1) {
    const date = parseDate(dateAdd(requestDate, offset));
    if (!isWorkingDay(date)) continue;
    const day = formatDate(date);
    if (usedHours(artist, day) + hours <= artist.maxHours) return day;
  }
  return null;
}

function quoteBudget(artist, style, zoneFactor, size, color) {
  const hours = pick(size.hours);
  const colorFactor = color ? 1.18 : 1.0;
  const noise = 0.9 + random() * 0.22;
  const hourly = artist.rate * hours * (styleFactors[style] || 1) * zoneFactor * colorFactor * noise;
  const base = clamp(hourly, size.min, size.max);
  return { budget: roundTo(base, 5000), hours };
}

for (let i = 1; i <= 1000; i += 1) {
  const artist = pick(artists);
  const style = pick(artist.styles);
  const [zone, zoneFactor] = pick(zones);
  const size = weightedPick(sizes.map((value) => ({ value, weight: value.weight })));
  const source = pick(sources);
  const requestDate = dateAdd(baseDate, Math.floor(random() * 38));
  const firstName = pick(firstNames);
  const lastName = pick(lastNames);
  const channel = pick(contactChannels);
  const custom = random() < 0.68 ? "si" : "no";
  const color = random() < (style === "tradicional" ? 0.55 : 0.22);
  const urgent = pick(urgency);
  const { budget, hours } = quoteBudget(artist, style, zoneFactor, size, color);

  const slot = findSlot(artist, requestDate, hours);
  const highIntent = source === "recomendacion" || source === "cliente recurrente" || budget >= 180000;
  const confirmationChance = highIntent ? 0.42 : 0.31;
  let status = random() < confirmationChance && slot ? "confirmada" : weightedPick([
    { value: "pendiente", weight: 46 },
    { value: "contactar", weight: 18 },
    { value: "reagendada", weight: 8 },
    { value: "cancelada", weight: 10 },
  ]);

  let tentativeDate = slot || dateAdd(requestDate, 4 + Math.floor(random() * 45));
  if (status === "confirmada") {
    reserveHours(artist, tentativeDate, hours);
  } else if (!isWorkingDay(parseDate(tentativeDate))) {
    tentativeDate = findSlot(artist, requestDate, Math.min(hours, 1)) || tentativeDate;
  }

  const depositRate = budget < 90000 ? 0.35 : budget < 200000 ? 0.28 : 0.22;
  const deposit = status === "confirmada" ? roundTo(budget * depositRate, 5000) : 0;
  const opportunity = clamp(
    Math.round(
      budget / 5500 +
        (status === "confirmada" ? 24 : 0) +
        (source === "recomendacion" ? 10 : 0) +
        (source === "cliente recurrente" ? 12 : 0) +
        (custom === "si" ? 5 : 0) -
        (hours > 5 ? 4 : 0)
    ),
    12,
    100
  );
  const hour = `${pad(9 + Math.floor(random() * 9))}:${random() < 0.5 ? "00" : "30"}`;

  rows.push([
    `RES-${String(i).padStart(4, "0")}`,
    requestDate,
    hour,
    `${firstName} ${lastName}`,
    channel === "Instagram" ? `@${firstName.toLowerCase()}.${lastName.toLowerCase()}` : `+569${Math.floor(10000000 + random() * 89999999)}`,
    channel,
    source,
    pick(communes),
    artist.name,
    artist.specialty,
    color ? `${style} color` : style,
    zone,
    size.label,
    budget,
    tentativeDate,
    pick(schedules),
    status,
    deposit,
    hours,
    custom,
    urgent,
    opportunity,
    `Idea ${color ? "a color " : ""}${style} en ${zone} con ${artist.name}`,
  ]);
}

const content = [headers, ...rows].map((row) => row.map(csv).join(",")).join("\n") + "\n";
fs.writeFileSync(outFile, content, "utf8");

const confirmed = rows.filter((row) => row[16] === "confirmada");
const revenue = confirmed.reduce((sum, row) => sum + Number(row[13]), 0);
const deposits = confirmed.reduce((sum, row) => sum + Number(row[17]), 0);

console.log(`CSV generado: ${outFile}`);
console.log(`Filas: ${rows.length}`);
console.log(`Confirmadas: ${confirmed.length}`);
console.log(`Presupuesto confirmado: $${revenue.toLocaleString("es-CL")}`);
console.log(`Abonos pagados: $${deposits.toLocaleString("es-CL")}`);
