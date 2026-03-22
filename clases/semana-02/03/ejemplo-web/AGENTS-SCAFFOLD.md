# AGENTS-SCAFFOLD.md

Este archivo es una plantilla pedagógica. En un proyecto real, este contenido debería renombrarse a `AGENTS.md` para que Codex lo use automáticamente como contexto persistente del proyecto.

---

# AGENTS.md - `<NOMBRE_DEL_PROYECTO>`

## Propósito del Proyecto

Este proyecto construye `<TIPO_DE_PAGINA>` para `<PUBLICO_OBJETIVO>` sobre `<TEMA_CENTRAL>`.

Objetivo principal del sitio:

`<OBJETIVO_PRINCIPAL>`

Mensaje clave que debe quedar claro en la primera pantalla:

`<MENSAJE_CLAVE>`

## Fuente de Verdad del Proyecto

Antes de proponer o modificar código:

- revisar `brief/<ARCHIVO_BRIEF>`;
- revisar `spec/<ARCHIVO_SPEC>`;
- revisar `design/<ARCHIVO_DESIGN>`;
- respetar la consigna del proyecto;
- no inventar un tema distinto;
- no cambiar el alcance sin justificación.

Jerarquía sugerida de lectura:

1. `BRIEF`: intención del producto, contexto y objetivo.
2. `SPEC`: alcance, restricciones y criterios técnicos.
3. `DESIGN`: decisión UI/UX, jerarquía, flujo y tono de interfaz.
4. `AGENTS`: reglas persistentes para ejecutar el trabajo.

Si hay tensión entre documentos:

- `BRIEF` define el sentido del producto;
- `SPEC` define límites y entregables;
- `DESIGN` define cómo debe sentirse y usarse la interfaz;
- `AGENTS` define cómo debe comportarse el agente mientras implementa.

## Criterio de Realismo

La interfaz visible debe parecer `<PRODUCTO_REAL | SERVICIO_REAL>` y no una demo académica.

Señales esperadas de seriedad:

- `<SENAL_DE_SERIEDAD_1>`;
- `<SENAL_DE_SERIEDAD_2>`;
- `<SENAL_DE_SERIEDAD_3>`.

Contenido visible prohibido:

- `<NO_MENCIONAR_QUE_ES_EJEMPLO_O_EVALUACION>`;
- `<NO_MENCIONAR_HTML_CSS_RESPONSIVE_TOKENS_EN_LA_UI>`;
- `<NO_DEJAR_TEXTOS_META_PEDAGOGICOS_O_COMENTARIOS_VISIBLES>`.

## Stack Permitido

- usar solo `<STACK_PERMITIDO>`;
- no usar `<STACK_NO_PERMITIDO>`;
- no agregar frameworks, librerías o tooling extra sin que esté explícitamente permitido;
- mantener la solución dentro del nivel técnico esperado para una página estática.

## Archivos Esperados

El proyecto debería quedar, como mínimo, con esta estructura:

- `<ARCHIVO_1>`;
- `<ARCHIVO_2>`;
- `<ARCHIVO_3_O_NO_APLICA>`;
- `<CARPETA_1_O_NO_APLICA>`.

No crear archivos innecesarios ni inflar la estructura del proyecto.

## Restricciones de Implementación

- mantener HTML semántico con uso correcto de `<TAGS_SEMANTICOS_CLAVE>`;
- usar enfoque `<MOBILE_FIRST_O_DESKTOP_FIRST>`;
- no usar JavaScript si la consigna no lo permite;
- no reemplazar estructura por exceso de `div` sin necesidad;
- no dejar texto de relleno incoherente con el proyecto final;
- mantener nombres de clases, secciones y archivos entendibles.

## Dirección Visual

- tono visual esperado: `<TONO_VISUAL>`;
- jerarquía visual esperada: `<JERARQUIA_VISUAL>`;
- paleta base: `<PALETA_BASE>`;
- referencias visuales: `<REFERENCIAS_VISUALES_O_NINGUNA>`;
- nivel de animación permitido: `<NINGUNA | SUAVE | MODERADA>`.

Evitar visualmente:

- `<PROHIBICION_VISUAL_1>`;
- `<PROHIBICION_VISUAL_2>`;
- `<PROHIBICION_VISUAL_3>`;
- `<PROHIBICION_VISUAL_4>`.

## Componentes y Contenido Esperado

El sitio debe incluir, como mínimo:

- `<SECCION_1>`;
- `<SECCION_2>`;
- `<SECCION_3>`;
- `<SECCION_4>`;
- `<SECCION_5>`.

Componentes clave:

- `<COMPONENTE_1>`;
- `<COMPONENTE_2>`;
- `<COMPONENTE_3>`;
- `<COMPONENTE_4>`.

## Responsive Esperado

- en celular: `<COMPORTAMIENTO_EN_CELULAR>`;
- en tablet: `<COMPORTAMIENTO_EN_TABLET>`;
- en escritorio: `<COMPORTAMIENTO_EN_ESCRITORIO>`.

Componentes que deben reorganizarse con el ancho:

- `<COMPONENTE_RESPONSIVE_1>`;
- `<COMPONENTE_RESPONSIVE_2>`;
- `<COMPONENTE_RESPONSIVE_3>`.

## Accesibilidad Mínima

- contraste: `<REQUISITO_DE_CONTRASTE>`;
- imágenes con `alt`: `<SI | NO | SOLO_SI_APLICA>`;
- formularios con `label`: `<SI | NO | NO_APLICA>`;
- foco visible: `<SI | NO | NO_APLICA>`;
- jerarquía de headings: `<REQUISITO_DE_HEADINGS>`.

## Sistema CSS

- usar tokens CSS: `<SI | NO>`;
- tokens mínimos:
  - `<TOKEN_1>`;
  - `<TOKEN_2>`;
  - `<TOKEN_3>`;
  - `<TOKEN_4>`;
- componentes con variantes:
  - `<COMPONENTE_VARIANTE_1>`;
  - `<COMPONENTE_VARIANTE_2>`;
- interacciones visuales permitidas:
  - `<HOVER | TRANSITION | ANIMACION_SUAVE | NINGUNA>`.

## Forma de Trabajo del Agente

Al trabajar en este proyecto:

- partir por una versión funcional y clara antes de refinar;
- respetar la intención del `BRIEF`, el alcance del `SPEC` y las decisiones de `DESIGN`;
- no sobrecomplicar el código;
- preferir claridad, semántica y orden antes que efectos innecesarios;
- priorizar una apariencia de producto o servicio real por sobre una estética “de demo”;
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
- comprobar que la estructura final de entrega esté ordenada.

---
