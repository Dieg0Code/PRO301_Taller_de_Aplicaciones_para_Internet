# Ink Pulse Studio · Landing

Landing demo en Next.js (App Router) construida para la **charla AIEP a 4to medio**.
Es la materialización del paso "diseño → web → formulario → datos" del recorrido pedagógico.

## Cómo correr

```bash
cd clases-particulares/01_charla_4to_medio/landing
npm install
npm run dev
```

Abre http://localhost:3000.

## Estructura

```
landing/
├── PROMPT.md            ← brief reusable que produce esta landing (mostrar en charla)
├── app/
│   ├── globals.css      ← tema oscuro premium, animaciones, grain overlay
│   ├── layout.tsx       ← fuentes (Bebas Neue + Inter)
│   └── page.tsx         ← composición de secciones
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx         ← marquee + glow + stats
│   ├── ValueProps.tsx
│   ├── Styles.tsx       ← 6 estilos de tatuaje
│   ├── Artists.tsx      ← marketplace (6 artistas, click → pre-rellena form)
│   ├── Gallery.tsx
│   ├── Process.tsx
│   ├── ReservationForm.tsx ← formulario + persistencia local + confirmación
│   ├── Footer.tsx
│   └── RevealHost.tsx   ← anima entradas con IntersectionObserver
├── lib/
│   ├── artists.ts       ← datos de los 6 artistas (espejo de datos/modelo_negocio/artistas.csv)
│   └── reveal.ts        ← hook de scroll-reveal
└── tailwind.config.ts   ← tokens (ink/accent), animaciones
```

## Datos

Los 6 artistas en `lib/artists.ts` son un espejo de
`clases-particulares/01_charla_4to_medio/datos/modelo_negocio/artistas.csv`.
Si cambias uno, recuerda mantener ambos sincronizados (o, en una segunda iteración, cargarlo dinámicamente).

## Reservas

Las solicitudes enviadas se guardan en `localStorage` bajo la clave **`ink_pulse_reservas`**.
Para inspeccionarlas durante la charla:

```js
JSON.parse(localStorage.getItem("ink_pulse_reservas"))
```

Eso conecta directamente con el siguiente paso del recorrido (Power BI):
los datos generados por el formulario son la materia prima del dashboard.

## Cómo se usa en la charla

1. Mostrar la landing funcionando (rápido scroll por hero, estilos, artistas).
2. Hacer click en "Reservar" sobre un artista → el formulario aparece con el campo pre-rellenado.
3. Completar una reserva ficticia y mostrar el mensaje de confirmación.
4. Abrir DevTools → Application → Local Storage → ver el objeto `ink_pulse_reservas`.
5. Comentar: "Esto es lo que después analizamos en Power BI".

## Intervención en vivo sugerida

Para mostrar el flujo "intención → código → cambio visible":

- Cambiar el copy del Hero (`components/Hero.tsx`) en frente del público.
- Agregar un nuevo estilo en `components/Styles.tsx`.
- Cambiar el color de acento en `tailwind.config.ts` (token `accent.red`).

El servidor recarga al guardar y el cambio aparece de inmediato en pantalla.

## Restricciones / decisiones

- Sin librerías de UI (no shadcn, no Chakra). Solo Tailwind.
- Sin librerías de animación (Framer Motion, GSAP). Solo CSS + IntersectionObserver.
- Sin imágenes externas: la estética se construye con gradientes, tipografía y SVG inline.
  Eso evita licencias dudosas y permite que la demo funcione sin internet.
- Form sin backend: persistencia en `localStorage` deliberada para mantener la demo autónoma
  y para que los datos sean exportables manualmente al CSV de Power BI si se quiere.

## Próximos pasos posibles (no necesarios para la charla)

- Reemplazar la persistencia local con un endpoint en `/api/reservas` (Next.js Route Handler) y SQLite.
- Conectar las solicitudes a `datos/reservas_ink_pulse_studio.csv` para alimentar el modelo de Power BI.
- Sustituir los avatares con SVG generativos o foto real de los artistas.
- Añadir página individual por artista (`/artistas/[id]`).
