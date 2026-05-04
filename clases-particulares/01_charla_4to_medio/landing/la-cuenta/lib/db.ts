import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";

export type Row = {
  ean: string;
  producto: string;
  marca: string;
  super: string;
  precio: number;
  url: string;
  n_supers: number;
  mas_barato: string;
  es_mas_barato: number;
  ahorro_clp: number;
  ahorro_pct: number;
};

export type ProductGroup = {
  ean: string;
  producto: string;
  marca: string;
  category: Category;
  ofertas: Row[];
  cheapest: Row;
  mostExpensive: Row;
  ahorro_clp: number;
  ahorro_pct: number;
};

export type Category =
  | "Lácteos"
  | "Bebidas"
  | "Abarrotes"
  | "Snacks"
  | "Limpieza"
  | "Carnes"
  | "Panadería"
  | "Frutas y verduras"
  | "Otros";

export const CATEGORIES: Category[] = [
  "Lácteos",
  "Bebidas",
  "Abarrotes",
  "Snacks",
  "Limpieza",
  "Carnes",
  "Panadería",
  "Frutas y verduras",
  "Otros",
];

function inferCategory(producto: string, marca: string): Category {
  const t = `${producto} ${marca}`.toLowerCase();
  if (/(leche|yogh?urt|yogur|queso|mantequilla|crema|manjar|kefir)/.test(t)) return "Lácteos";
  if (/(agua|bebida|gaseosa|jugo|néctar|cerveza|vino|pisco|whisky|ron|vodka|tequila|champagne|espumante|pulpa|cola)/.test(t)) return "Bebidas";
  if (/(galleta|chocolate|dulce|caramelo|snack|chips|papas fritas|cabritas|man[ií]|frutos secos|cereal|barr|gomitas|alfajor|chicle|tutti)/.test(t)) return "Snacks";
  if (/(detergente|lavaloza|jab[oó]n|cloro|limpiador|desinfectante|toalla|pa[nñ]al|papel|servilleta|bolsa|champ[uú]|shampoo|acondicionador|pasta dental|cepillo|esponja|cera|suavizante)/.test(t)) return "Limpieza";
  if (/(pollo|cerdo|vacuno|carne|pescado|salm[oó]n|salchicha|jam[oó]n|merluza|atun|atún|chuleta|asado|costilla|longaniza|hamburguesa|chorizo|tocino)/.test(t)) return "Carnes";
  if (/(pan |pan,|marraqueta|hallulla|bagel|tortilla|baguette|brioche)/.test(t)) return "Panadería";
  if (/(manzana|p[lá]tano|naranja|tomate|cebolla|papa|lechuga|zanahoria|palta|fruta|verdura|fruto|champi[ñn]ones)/.test(t)) return "Frutas y verduras";
  if (/(arroz|fideo|pasta|aceite|az[uú]car|harina|sal |t[eé] |caf[eé]|conserva|atun|atún|salsa|mayonesa|kechup|ketchup|mostaza|vinagre|legumbre|lentej|porot|garbanz|huevo)/.test(t)) return "Abarrotes";
  return "Otros";
}

let cache: { rows: Row[]; groups: ProductGroup[]; supers: string[] } | null = null;

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

function loadRaw(): Row[] {
  const csvPath = path.join(process.cwd(), "public", "data", "db_osorno.csv");
  const raw = readFileSync(csvPath, "utf-8").replace(/^﻿/, "");
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const header = parseCsvLine(lines[0]);
  const idx = (name: string) => header.indexOf(name);
  const ix = {
    ean: idx("ean"),
    producto: idx("producto"),
    marca: idx("marca"),
    super: idx("super"),
    precio: idx("precio"),
    url: idx("url"),
    n_supers: idx("n_supers"),
    mas_barato: idx("mas_barato"),
    es_mas_barato: idx("es_mas_barato"),
    ahorro_clp: idx("ahorro_clp"),
    ahorro_pct: idx("ahorro_pct"),
  };

  const rows: Row[] = [];
  for (let i = 1; i < lines.length; i++) {
    const c = parseCsvLine(lines[i]);
    if (c.length < header.length) continue;
    const precio = Number(c[ix.precio]);
    if (!Number.isFinite(precio) || precio <= 0) continue;
    rows.push({
      ean: c[ix.ean]?.trim() ?? "",
      producto: c[ix.producto]?.trim() ?? "",
      marca: c[ix.marca]?.trim() ?? "",
      super: c[ix.super]?.trim() ?? "",
      precio,
      url: c[ix.url] ?? "",
      n_supers: Number(c[ix.n_supers]) || 0,
      mas_barato: c[ix.mas_barato]?.trim() ?? "",
      es_mas_barato: Number(c[ix.es_mas_barato]) || 0,
      ahorro_clp: Number(c[ix.ahorro_clp]) || 0,
      ahorro_pct: Number(c[ix.ahorro_pct]) || 0,
    });
  }
  return rows;
}

function buildGroups(rows: Row[]): ProductGroup[] {
  const map = new Map<string, Row[]>();
  for (const r of rows) {
    if (!r.ean) continue;
    const arr = map.get(r.ean);
    if (arr) arr.push(r);
    else map.set(r.ean, [r]);
  }
  const groups: ProductGroup[] = [];
  for (const [ean, ofertas] of map.entries()) {
    if (ofertas.length === 0) continue;
    const ordered = [...ofertas].sort((a, b) => a.precio - b.precio);
    const cheapest = ordered[0];
    const mostExpensive = ordered[ordered.length - 1];
    groups.push({
      ean,
      producto: cheapest.producto,
      marca: cheapest.marca,
      category: inferCategory(cheapest.producto, cheapest.marca),
      ofertas: ordered,
      cheapest,
      mostExpensive,
      ahorro_clp: mostExpensive.precio - cheapest.precio,
      ahorro_pct: cheapest.ahorro_pct || (mostExpensive.precio > 0 ? ((mostExpensive.precio - cheapest.precio) / mostExpensive.precio) * 100 : 0),
    });
  }
  return groups;
}

function ensure() {
  if (cache) return cache;
  const rows = loadRaw();
  const groups = buildGroups(rows);
  const supers = Array.from(new Set(rows.map((r) => r.super))).sort();
  cache = { rows, groups, supers };
  return cache;
}

export function getStats() {
  const { rows, groups, supers } = ensure();
  const totalProductos = groups.length;
  const totalRows = rows.length;
  const ahorrosOrdenados = [...groups]
    .filter((g) => g.ofertas.length >= 2 && g.ahorro_pct > 0)
    .sort((a, b) => b.ahorro_pct - a.ahorro_pct);
  const ahorroPctMax = ahorrosOrdenados[0]?.ahorro_pct ?? 0;
  const ahorroPctPromedio =
    ahorrosOrdenados.reduce((acc, g) => acc + g.ahorro_pct, 0) /
      Math.max(ahorrosOrdenados.length, 1) || 0;
  return {
    totalRows,
    totalProductos,
    totalSupers: supers.length,
    supers,
    ahorroPctMax,
    ahorroPctPromedio,
  };
}

export type SearchOptions = {
  query?: string;
  supers?: string[];
  categories?: Category[];
  limit?: number;
};

export function searchProducts(opts: SearchOptions): ProductGroup[] {
  const { groups } = ensure();
  const q = (opts.query ?? "").trim().toLowerCase();
  const limit = opts.limit ?? 30;
  const filterSupers = (opts.supers ?? []).filter(Boolean);
  const filterCats = (opts.categories ?? []).filter(Boolean);

  const tokens = q.split(/\s+/).filter(Boolean);
  const scored: { g: ProductGroup; score: number }[] = [];
  for (const g of groups) {
    if (filterCats.length > 0 && !filterCats.includes(g.category)) continue;
    if (filterSupers.length > 0) {
      const inAny = g.ofertas.some((o) => filterSupers.includes(o.super));
      if (!inAny) continue;
    }
    const haystack = `${g.producto} ${g.marca}`.toLowerCase();
    let score = 0;
    let matched = true;
    if (tokens.length > 0) {
      for (const t of tokens) {
        const idx = haystack.indexOf(t);
        if (idx === -1) {
          matched = false;
          break;
        }
        score += 1000 - idx + (g.producto.toLowerCase().startsWith(t) ? 500 : 0);
      }
    } else {
      // No query: rank by ahorro to surface interesting items
      score = g.ahorro_pct * 10 + (g.ofertas.length * 5);
    }
    if (matched) scored.push({ g, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.g);
}

export function topAhorros(limit = 10): ProductGroup[] {
  const { groups } = ensure();
  return [...groups]
    .filter((g) => g.ofertas.length >= 2 && g.ahorro_clp >= 200)
    .sort((a, b) => b.ahorro_pct - a.ahorro_pct)
    .slice(0, limit);
}

export function getProduct(ean: string): ProductGroup | null {
  const { groups } = ensure();
  return groups.find((g) => g.ean === ean) ?? null;
}

/**
 * Canasta básica chilena (referencia INE — Canasta Básica de Alimentos + No-alimentos),
 * adaptada al inventario real disponible. Para cada item se elige el producto MÁS BARATO
 * que matchea — ese es el punto del demo: el supermercado no es el barato, el producto sí.
 */
const CANASTA_ITEMS: { label: string; queries: string[] }[] = [
  { label: "Pan de molde", queries: ["pan de molde", "pan molde"] },
  { label: "Arroz", queries: ["arroz grado", "arroz"] },
  { label: "Fideos", queries: ["fideos espagueti", "fideos"] },
  { label: "Harina", queries: ["harina sin polvos", "harina"] },
  { label: "Aceite", queries: ["aceite maravilla", "aceite vegetal", "aceite"] },
  { label: "Azúcar", queries: ["azúcar granulada", "azúcar"] },
  { label: "Sal", queries: ["sal de mesa", "sal"] },
  { label: "Té", queries: ["té bolsitas", "té negro", "té"] },
  { label: "Café", queries: ["café instantáneo", "café"] },
  { label: "Leche", queries: ["leche entera", "leche líquida"] },
  { label: "Huevos", queries: ["huevos blancos", "huevos"] },
  { label: "Mantequilla", queries: ["mantequilla con sal", "mantequilla"] },
  { label: "Yogurt", queries: ["yoghurt natural", "yogur natural", "yoghurt", "yogur"] },
  { label: "Atún", queries: ["atún en aceite", "atún"] },
  { label: "Lentejas", queries: ["lentejas", "porotos"] },
  { label: "Galletas de agua", queries: ["galletas de agua", "galletas"] },
  { label: "Detergente", queries: ["detergente líquido", "detergente"] },
  { label: "Papel higiénico", queries: ["papel higiénico", "papel higienico"] },
];

function findCheapest(query: string, exclude: Set<string>): ProductGroup | null {
  const matches = searchProducts({ query, limit: 50 });
  const eligible = matches.filter((g) => !exclude.has(g.ean));
  if (eligible.length === 0) return null;
  return [...eligible].sort((a, b) => a.cheapest.precio - b.cheapest.precio)[0];
}

export function canastaBasica(): ProductGroup[] {
  const out: ProductGroup[] = [];
  const used = new Set<string>();
  for (const item of CANASTA_ITEMS) {
    let found: ProductGroup | null = null;
    for (const q of item.queries) {
      found = findCheapest(q, used);
      if (found) break;
    }
    if (found) {
      used.add(found.ean);
      out.push(found);
    }
  }
  return out;
}

export function formatCLP(n: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}
