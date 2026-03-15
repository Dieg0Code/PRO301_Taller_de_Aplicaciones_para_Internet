# Slides System

Sistema compartido para construir presentaciones del modulo con `PptxGenJS`.

## Objetivo

Evitar que cada clase copie helpers, estilos y componentes desde otro deck.

Este directorio concentra:

- tema AIEP;
- componentes reutilizables;
- utilidades de validacion;
- y helpers tecnicos para codigo, UI y artefactos del mundo de desarrollo.

## Estructura

- `theme/`: tokens, tipografia y tema AIEP.
- `components/`: componentes visuales reutilizables.
- `utils/`: helpers de codigo, spacing y validacion.
- `vendor/pptxgenjs_helpers/`: helpers compartidos de PptxGenJS.

## Componentes iniciales

- `primitives`: header, chip, pill, card, miniCard, statement.
- `code-panel`: snippet con resaltado de sintaxis.
- `terminal-panel`: terminal con prompts y salidas.
- `browser-mock`: maqueta de navegador.
- `form-mock`: maqueta de formulario con CTA centrado.

## Uso recomendado

1. Crear el deck local de una clase.
2. Importar componentes desde este sistema en vez de copiarlos manualmente.
3. Mantener el contenido en el source de la clase y la logica visual aqui.
4. Reusar `vendor/pptxgenjs_helpers` desde este directorio mientras migramos clases antiguas.

### Ejemplo minimo

```js
const PptxGenJS = require("pptxgenjs");
const { theme, components, utils } = require("../../tools/slides-system");

const pptx = new PptxGenJS();
theme.applyAiepTheme(pptx, {
  title: "Clase piloto",
  subject: "Slides System",
});

const SH = pptx.ShapeType;
const slide = pptx.addSlide();
components.addHeader(slide, SH, pptx, "Titulo", "Subtitulo", "Bloque 1", {
  classLabel: "Clase piloto · Bloque 1",
});
components.addCodePanel(slide, SH, {
  x: 0.9,
  y: 2.4,
  w: 5.2,
  h: 3.2,
  title: "HTML",
  code: "<main>Hola</main>",
  lang: "html",
});
utils.validateSlide(slide, pptx);
```

## Proximo paso recomendado

Migrar una clase piloto para dejar de depender de helpers locales copiados por carpeta.
