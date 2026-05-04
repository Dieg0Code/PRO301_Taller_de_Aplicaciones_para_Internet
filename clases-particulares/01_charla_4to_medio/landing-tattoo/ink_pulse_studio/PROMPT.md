# Prompt para construir la landing — Ink Pulse Studio

Este es el brief consolidado para entregar a un agente de programación (Codex, Claude Code, Cursor) cuando se quiera regenerar la landing desde cero.

Funciona como demostración pedagógica: muestra cómo un prompt bien estructurado produce una salida controlada, no improvisada. Se compone de **contexto + objetivo + público + estética + secciones + comportamiento + restricciones**.

---

## Brief para el agente

```text
Construye una landing page completa, premium y funcional para un studio de tatuajes ficticio llamado Ink Pulse Studio.

## Contexto del negocio

Ink Pulse Studio es un studio de tatuajes urbano, contemporáneo y profesional con sede ficticia en Santiago de Chile. Quiere atraer a jóvenes y adultos que buscan reservar una hora para tatuarse, revisar el catálogo de artistas y sentir confianza antes de contactar al studio.

## Objetivo principal

La landing debe convertir visitantes interesados en solicitudes de reserva. Cada visita relevante termina con un formulario completado.

## Público objetivo

Personas entre 18 y 35 años, interesadas en tatuajes con estética cuidada, experiencia personalizada, artistas especializados y reserva online simple. La página será mostrada en una charla a estudiantes de 4to medio en Chile, así que el lenguaje debe ser claro, moderno y en español de Chile.

## Stack técnico (obligatorio)

- Next.js 14+ con App Router.
- TypeScript estricto.
- Tailwind CSS para estilos (sin librerías de UI extra).
- Sin backend real: el formulario persiste solicitudes en `localStorage` y muestra una confirmación visual.
- Debe correr con `npm install && npm run dev` sin pasos extra.

## Personalidad visual

- Moderna, urbana, artística, premium sin sentirse lujosa en exceso.
- Estética de alto contraste: fondo oscuro (negro/grafito), acentos en rojo y blanco hueso. Tipografía protagonista.
- Imágenes grandes, secciones bien separadas, cards limpias.
- Que se sienta como el sitio real de un negocio, no como una plantilla genérica.
- Evita: aspecto corporativo aburrido, colores saturados infantiles, fondos pastel.

## Estructura de la landing (en este orden)

1. **Hero principal**
   - Nombre Ink Pulse Studio.
   - Frase corta y potente (ej: "Tatuajes que se sienten tuyos desde el primer trazo").
   - Bajada de 1-2 líneas explicando que es un studio con artistas especializados y reserva online.
   - Botón primario: "Reservar hora" (scroll al formulario).
   - Botón secundario: "Ver artistas" (scroll al marketplace).
   - Fondo visual fuerte: imagen o gradiente con tipografía protagonista.

2. **Propuesta de valor** (3 bloques)
   - Diseño personalizado.
   - Artistas especializados.
   - Reserva simple y acompañada.

3. **Estilos de tatuaje** (cards)
   - fine line, blackwork, tradicional, minimalista, lettering, geométrico.
   - Cada card: nombre, descripción breve (1 línea), aspecto visual distinto (color/borde/icono).

4. **Marketplace de artistas** (sección protagonista)
   - 6 artistas ficticios cargados desde el dataset adjunto (`datos/modelo_negocio/artistas.csv`).
   - Cada card: foto/avatar, nombre artístico, especialidad, breve descripción, estilos que domina, tarifa orientativa por hora, botón "Reservar con [nombre]" que pre-rellena el campo "artista preferido" del formulario.
   - Layout tipo grid 3 columnas en desktop, 1 en mobile.
   - La sección debe sentirse como un catálogo donde el cliente puede comparar antes de reservar.

5. **Galería**
   - Grid visual tipo portfolio con 6-8 placeholders representativos.
   - Hover sutil con efecto.

6. **Proceso de reserva** (4-5 pasos numerados)
   - Eliges artista → eliges estilo → cuentas tu idea → el equipo revisa → coordinan fecha y presupuesto.

7. **Formulario de solicitud de reserva** (sección clave)
   - Campos: nombre, contacto (Instagram o WhatsApp), artista preferido (select con los 6 artistas), estilo de tatuaje (select), zona del cuerpo (select: brazo, antebrazo, pierna, espalda, pecho, cuello, mano, costilla, otro), tamaño aproximado (select: pequeño, mediano, grande), presupuesto estimado en CLP (input numérico), fecha tentativa (date picker), horario preferido (select: mañana, tarde, noche), mensaje adicional (textarea).
   - Botón de envío: "Solicitar reserva".
   - Al enviar:
     - Validar que todos los campos requeridos estén completos.
     - Guardar la solicitud en `localStorage` bajo la clave `ink_pulse_reservas` (array de objetos con timestamp).
     - Mostrar mensaje de confirmación visible: "Solicitud recibida. El equipo revisará tu idea y te contactará para coordinar la hora."
     - Limpiar el formulario.

8. **Footer**
   - Llamada final a reservar.
   - Contacto ficticio + redes sociales (links # placeholder).
   - Dirección ficticia en Santiago.

## Comportamiento adicional

- Scroll suave entre secciones cuando se usan los botones de navegación interna.
- Header fijo al hacer scroll, con logo y CTA "Reservar".
- Animaciones sutiles al entrar en viewport (sin librerías pesadas: solo CSS o `IntersectionObserver`).
- Responsive: debe verse bien en móvil 375px, tablet 768px y desktop 1280px+.
- Accesibilidad mínima: contraste correcto, labels en inputs, focus visible.

## Datos de los artistas

Cargar desde el dataset existente. Si el agente no tiene acceso al archivo, usar estos datos:

| ID | Nombre | Especialidad | Tarifa/hora CLP | Horas/día |
|----|--------|--------------|------------------|-----------|
| ART-001 | Nova Ink | fine line | 38.000 | 6.25 |
| ART-002 | Kuro | blackwork | 45.000 | 6.5 |
| ART-003 | Lina Dot | minimalista | 34.000 | 6 |
| ART-004 | Rayo | tradicional | 42.000 | 6.5 |
| ART-005 | Mila Shade | sombras suaves | 40.000 | 6.25 |
| ART-006 | Atlas | piezas grandes | 50.000 | 7 |

## Restricciones

- No instalar librerías de UI (shadcn, MUI, Chakra). Solo Tailwind.
- No instalar librerías de animación pesadas (Framer Motion, GSAP). Animaciones con CSS.
- No usar imágenes externas que requieran licencias dudosas: usar gradientes, placeholders SVG con iniciales, o `https://images.unsplash.com` con búsqueda específica.
- El formulario no envía a ningún backend real. La persistencia local es deliberada para que la demo sea autónoma y los datos puedan exportarse luego a Power BI.

## Resultado esperado

Una landing que un negocio real podría usar como prototipo, no una página académica. Que un visitante pueda:
- entender el negocio en 5 segundos;
- explorar artistas en 30 segundos;
- completar el formulario en 1 minuto;
- ver una confirmación clara después de enviar.
```

---

## Cómo se usa este prompt en la charla

1. Mostrar la landing ya construida (la que vive en este mismo directorio).
2. Abrir este `PROMPT.md` y leer las secciones clave: contexto → objetivo → estructura → restricciones.
3. Decir: "Esto es lo que le pedimos a Codex. No le dijimos 'hazme una página'. Le dimos un brief."
4. Hacer una intervención en vivo pequeña (cambiar copy, agregar un campo al formulario, cambiar un color) para mostrar que el código es modificable.

La idea pedagógica es clara: **mientras más estructurado el prompt, menos improvisada la salida**. Esa es la diferencia entre usar IA por moda y dirigirla con criterio.
