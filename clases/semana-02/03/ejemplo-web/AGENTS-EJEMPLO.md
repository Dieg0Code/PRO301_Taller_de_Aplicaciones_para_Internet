# AGENTS-EJEMPLO.md

Este archivo es un ejemplo pedagógico. En un proyecto real, este contenido debería renombrarse a `AGENTS.md` para que Codex lo use automáticamente como contexto persistente del proyecto.

---

# AGENTS.md - `Nodo Web`

## Propósito del Proyecto

Este proyecto construye una `landing page de servicio` para `dueños de pequeñas empresas, estudios profesionales y emprendedores que necesitan ordenar su presencia digital` sobre un `estudio ficticio de estrategia, diseño y desarrollo web para pymes de servicios profesionales`.

Objetivo principal del sitio:

`presentar una propuesta de servicio web clara y profesional para captar contactos`

Mensaje clave que debe quedar claro en la primera pantalla:

`un negocio pequeño puede tener una presencia web seria, clara y confiable sin depender de soluciones improvisadas`

## Fuente de Verdad del Proyecto

Antes de proponer o modificar código:

- revisar `brief/BRIEF-EJEMPLO.md`;
- revisar `spec/SPEC.md`;
- revisar `design/DESIGN-EJEMPLO.md`;
- respetar la consigna del proyecto;
- no inventar un tema distinto;
- no cambiar el alcance sin justificación.

Jerarquía sugerida de lectura:

1. `BRIEF-EJEMPLO.md`: intención del servicio, contexto y objetivo.
2. `SPEC.md`: alcance, restricciones y criterios técnicos.
3. `DESIGN-EJEMPLO.md`: decisión UI/UX, jerarquía, flujo y tono de interfaz.
4. `AGENTS-EJEMPLO.md`: reglas persistentes para ejecutar el trabajo.

Si hay tensión entre documentos:

- el `BRIEF` define el sentido comercial del producto;
- el `SPEC` define límites y entregables;
- el `DESIGN` define cómo debe sentirse y usarse la interfaz;
- el `AGENTS` define cómo debe comportarse el agente al implementarla.

## Criterio de Realismo

La interfaz visible debe parecer un `servicio real B2B` y no una demo académica.

Señales esperadas de seriedad:

- `propuesta de valor clara y específica`;
- `bloques de servicio con lenguaje real de negocio`;
- `cierre comercial sobrio con CTA creíble`.

Contenido visible prohibido:

- `no mencionar que es un ejemplo, demo, ejercicio o evaluación`;
- `no mostrar texto visible sobre HTML, CSS, tokens, responsive o detalles de implementación`;
- `no dejar comentarios meta, textos pedagógicos o frases tipo "esta landing" dentro de la UI`.

## Stack Permitido

- usar solo `HTML` y `CSS`;
- no usar `JavaScript`, frameworks ni librerías externas innecesarias;
- mantener la solución dentro del nivel técnico esperado para una página estática.

## Archivos Esperados

El proyecto debería quedar, como mínimo, con esta estructura:

- `index.html`;
- `styles.css`;
- `assets/`.

No crear archivos innecesarios ni inflar la estructura del proyecto.

## Restricciones de Implementación

- mantener HTML semántico con uso correcto de `header`, `main`, `section`, `footer`, headings y elementos de contenido;
- usar enfoque `mobile-first`;
- no usar JavaScript;
- no reemplazar estructura por exceso de `div` sin necesidad;
- no dejar texto de relleno incoherente con el proyecto final;
- mantener nombres de clases, secciones y archivos entendibles.

## Dirección Visual

- tono visual esperado: `sobrio, técnico, moderno, elegante y corporativo`;
- jerarquía visual esperada: `headline fuerte, subtítulo claro, CTA visible, buen aire entre bloques, cards con presencia y una composición que se sienta de producto real`;
- paleta base: `azul profundo dominante, rojo como acento, fondo claro cálido, blanco y superficies suaves`;
- referencias visuales: `lenguaje visual cercano a las diapositivas AIEP del módulo, pero llevado a una landing de servicio B2B seria`;
- nivel de animación permitido: `suave`.

Evitar visualmente:

- `que se vea infantil`;
- `que se vea juguete o experimental`;
- `abuso de adornos, blobs o decoración gratuita`;
- `apariencia de template genérico de baja calidad`.

## Componentes y Contenido Esperado

El sitio debe incluir, como mínimo:

- `hero principal`;
- `propuesta de valor y beneficios`;
- `cards de servicios`;
- `proceso de trabajo`;
- `bloque de contacto y footer`.

Componentes clave:

- `botón principal de contacto`;
- `cards de servicios`;
- `bloque de señales de confianza o diferenciales`;
- `formulario o callout final de contacto`.

## Responsive Esperado

- en celular: `hero en una sola columna, CTA visible, cards apiladas, contenido principal primero y buen espaciado vertical`;
- en tablet: `dos columnas donde tenga sentido, cards con mejor aire y lectura más amplia`;
- en escritorio: `layout más abierto, mejor distribución entre texto y panel visual, cards alineadas y secciones claramente separadas`.

Componentes que deben reorganizarse con el ancho:

- `hero principal`;
- `grid de cards`;
- `bloque de contacto`.

## Accesibilidad Mínima

- contraste: `texto y botones con contraste razonable sobre todos los fondos`;
- imágenes con `alt`: `sí`;
- formularios con `label`: `sí`;
- foco visible: `sí`;
- jerarquía de headings: `un solo h1 y jerarquía clara de h2 y h3`.

## Sistema CSS

- usar tokens CSS: `sí`;
- tokens mínimos:
  - `--color-brand`;
  - `--color-accent`;
  - `--space-md`;
  - `--radius-md`;
- componentes con variantes:
  - `botón principal y botón secundario`;
  - `card base y card destacada`;
- interacciones visuales permitidas:
  - `hover`;
  - `transition`;
  - `animación suave`.

## Forma de Trabajo del Agente

Al trabajar en este proyecto:

- partir por una versión funcional y clara antes de refinar;
- respetar la intención de `brief/BRIEF-EJEMPLO.md`, el alcance de `spec/SPEC.md` y las decisiones de `design/DESIGN-EJEMPLO.md`;
- no sobrecomplicar el código;
- preferir claridad, semántica y orden antes que efectos innecesarios;
- priorizar una apariencia de servicio real por sobre una estética “de demo”;
- refinar por iteraciones pequeñas si hace falta mejorar hero, cards, layout o responsive;
- no dar por terminado el trabajo sin revisar consistencia visual y adaptación a celular.

## Validación Antes de Cerrar

Antes de cerrar el trabajo:

- comprobar que el HTML sea semántico y legible;
- comprobar que el CSS esté ordenado y no repita valores innecesariamente;
- comprobar que el sitio se adapte a celular, tablet y escritorio;
- comprobar que el contenido principal siga siendo claro;
- comprobar contraste, `alt`, `label` y headings;
- comprobar que la UI visible no incluya texto meta, pedagógico ni referencias a la evaluación;
- comprobar que la estructura final de entrega esté ordenada y lista para subirse a GitHub.

---
