# La Cuenta · Comparador de precios de Osorno

Landing demo en Next.js para la charla del Liceo Comercial de Osorno.
Es la materialización del recorrido pedagógico: idea → diseño → web → datos → decisión.

## Cómo correr

```bash
cd clases-particulares/01_charla_4to_medio/landing/la-cuenta
npm install
npm run dev
```

Abre http://localhost:3000.

## Datos

El CSV `public/data/db_osorno.csv` (5.6 MB · 34.398 filas) contiene precios reales scrapeados de los 6 supermercados de Osorno (Unimarc, Jumbo, Lider, Alvi, SantaIsabel, Acuenta).

Se carga en memoria en el server al primer request (`lib/db.ts`) y se cachea durante el ciclo de vida del proceso. No hay base de datos.

## Estructura

```
la-cuenta/
├── app/
│   ├── api/search/route.ts       ← GET /api/search?q=...
│   ├── api/product/[ean]/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  ← composición de secciones
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx                  ← hallazgo principal: hasta XX% diferencia
│   ├── Marquee.tsx
│   ├── Search.tsx                ← buscador con debounce + API
│   ├── TopDeals.tsx              ← top 10 ahorros
│   ├── AddDealButton.tsx
│   ├── Canasta.tsx               ← canasta básica preseleccionada
│   ├── CanastaAddAll.tsx
│   ├── MiLista.tsx               ← lista del usuario + comparador por super
│   ├── list-store.ts             ← localStorage + cálculo de totales
│   ├── Metodo.tsx
│   └── Footer.tsx
├── lib/
│   └── db.ts                     ← parseCSV + groupByEAN + search/topAhorros
├── public/data/db_osorno.csv
└── tailwind.config.ts
```

## Identidad visual

- Editorial / data-magazine premium (referencia: NYT Upshot, The Pudding, Bloomberg).
- Tipografía: **Fraunces** (serif editorial) + Inter (sans) + JetBrains Mono.
- Paleta: papel `#F4F1EC` · tinta `#0E0F12` · oxblood `#8B1E2D` · verde dato `#0F7A4F`/`#1FA56F`.
- Mucho whitespace, números editoriales con tabular-nums, separadores con `<hr>` real.

## Features

- **Buscador** con debounce 220ms vía `/api/search?q=...` (server lookup en CSV).
- **Top ahorros** ordenado por % de diferencia precio más caro vs más barato.
- **Canasta básica** preseleccionada con productos típicos chilenos (leche, pan, arroz, fideos, aceite, azúcar, té, huevos, papel higiénico, detergente).
- **Mi Lista** con localStorage:
  - Agregar/quitar productos, modificar cantidades.
  - Calcula el total en cada uno de los 6 supermercados con esa misma canasta.
  - Muestra ahorro vs el más caro y identifica el mejor super.
  - Indica cuántos productos no tiene cada super (fallback al precio más barato).
- **Método** transparenta cómo se hizo: scraping → normalización por EAN → cálculo → web + Power BI.

## Cómo se usa en la charla

1. Mostrar el hero: "hasta XX% de diferencia" capta atención inmediata.
2. Buscar "leche colun" o "pasta carozzi" en vivo. Mostrar las 6 ofertas ordenadas.
3. Agregar 4-5 productos a Mi Lista. Mostrar la comparativa por super.
4. Comentar: "esos datos están guardados localmente, igual que en una app real".
5. Abrir DevTools → Application → Local Storage → mostrar el JSON de la lista.
6. Conectar con Power BI (siguiente paso del recorrido).

## Intervención en vivo sugerida

Para mostrar el flujo "intención → código → cambio visible":

- Cambiar el copy del Hero (`components/Hero.tsx`).
- Agregar un producto a la canasta básica (`lib/db.ts` → `canastaBasica()`).
- Cambiar el color de acento (`tailwind.config.ts` → `accent.oxblood`).

El servidor recarga al guardar, sin necesidad de reiniciar.

## Decisiones / restricciones

- Sin librerías de UI ni animación (solo Tailwind + CSS keyframes).
- Sin backend real: el CSV es la BD. Para producción real conviene SQLite/Postgres con índices.
- Sin imágenes de productos: la estética editorial usa tipografía y números como protagonistas.
- Sin auth: la lista es local al dispositivo (localStorage).

## Próximos pasos posibles

- Conectar con un endpoint en Power BI Cloud para que el dashboard del docente refleje las listas creadas.
- Agregar comparador de canastas familiares (4 personas vs 1 persona).
- Filtros por categoría / marca en el buscador.
- Histórico: si se vuelve a scrapear, mostrar evolución del precio.
