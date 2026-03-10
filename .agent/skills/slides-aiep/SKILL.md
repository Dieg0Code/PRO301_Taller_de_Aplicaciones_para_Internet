---
name: slides-aiep
description: Aplicar identidad visual AIEP a presentaciones de clases de este repositorio. Usar cuando haya que crear, rehacer o pulir decks PPT/PPTX con marca AIEP, paleta institucional, reglas de logo, patrones de diapositiva y control de ritmo para sesiones de 3 horas. Complementa a slides, no la reemplaza.
---

# Slides AIEP

Usar esta skill para definir la dirección visual de una presentación antes de construirla o editarla con `slides`.

## Relación con otras skills

- `slides-aiep` decide cómo debe verse el deck.
- `slides` construye, renderiza y valida el deck.
- Orden recomendado:
  1. aplicar `slides-aiep`;
  2. luego ejecutar `slides`.

## Flujo de trabajo

1. Revisar el `README.md` de la clase y el contexto del módulo.
2. Leer `references/palette.md` para fijar color, contraste y proporciones `60 / 30 / 10`.
3. Leer `references/slide-patterns.md` para elegir layouts y ritmo visual según la función pedagógica de cada slide.
4. Usar los assets oficiales del directorio `assets/`.
5. Construir o ajustar el deck con `slides`.
6. Antes de cerrar, leer `references/quality-gates.md` y comprobar cantidad de diapositivas, legibilidad y coherencia visual.

## Reglas visuales base

- El estilo debe sentirse institucional, técnico y sobrio, pero no frío ni clínico.
- Evitar estética de startup, gradientes ruidosos, colores fuera de marca o slides genéricas sin jerarquía.
- Usar geometría derivada del logo AIEP: barras verticales, módulos rectos, cortes limpios y bloques bien alineados.
- Mantener bastante aire, contraste alto, títulos cortos y una composición con carácter.
- La elegancia es un criterio de diseño, no un extra: si una slide se siente tosca, pesada o rígida, hay que rehacerla.
- Diseñar cada slide alrededor de una idea principal.
- La distribución de los elementos debe acompañar lo que se está enseñando; el layout también explica.
- No usar el rojo como fondo dominante salvo casos puntuales de énfasis.
- El azul institucional sostiene estructura, aperturas, portadas y cierres.
- Una presentación AIEP puede ser formal sin verse burocrática: debe tener ritmo, tensión visual y una presencia clara.
- Alternar slides sobrias con slides más expresivas para evitar monotonía.
- Evitar slides resueltas solo como `2 o 3` cajas grandes con demasiado texto dentro; suelen verse pesadas y poco refinadas.
- Mantener una misma familia visual no significa repetir el mismo esqueleto de slide cambiando solo el texto.
- Si dos ideas cumplen funciones distintas dentro de la clase, su composición también debe diferenciarse.
- Repetir una misma distribución en cadena debilita la atención del estudiante y empobrece el lenguaje visual del deck.
- La consistencia debe venir de la paleta, la tipografía, los márgenes y el sistema gráfico; la composición puede y debe variar.

## Reglas de logo

- Portada: usar el logo completo en la esquina superior derecha con margen generoso.
- Aperturas de bloque: usar el logo pequeño o la versión `mark`.
- Slides internas: no repetir el logo completo en todas; preferir el `mark` o motivos geométricos inspirados en él.
- No deformar, recolorear ni estirar el logo.
- No poner el logo sobre fondos con bajo contraste.

## Reglas de contenido visible

- El texto de las diapositivas debe hablarle al estudiante, no comentar el proceso de armado del deck.
- Evitar frases meta como `esta versión del deck`, `se desarrollará después`, `aquí pondremos` o cualquier comentario de producción.
- Si una slide muestra el mapa de la clase, debe presentarlo como recorrido de aprendizaje, no como nota técnica sobre el archivo.

## Regla de densidad y ritmo

- Para clases de `3 horas`, el deck debe tener al menos `60` diapositivas.
- Objetivo recomendado: `60 a 75` diapositivas.
- Si el deck queda corto, expandir con ejemplos, comparaciones, errores comunes, mini casos, recapitulaciones y transiciones.
- No inflar el deck con texto repetido ni slides vacías.
- Tampoco expandir repitiendo la misma estructura visual una y otra vez: más slides deben traducirse en mejor ritmo, no en más monotonía.

## Cuándo leer recursos adicionales

- `references/palette.md`: siempre, al iniciar un deck nuevo o rehacer uno existente.
- `references/slide-patterns.md`: cuando haya que decidir layouts, aperturas, comparaciones, cards o cierres.
- `references/quality-gates.md`: al expandir el deck y antes de renderizar la versión final.

## Assets disponibles

- `assets/logo-aiep.svg`: logo principal, ideal para portadas y exportes de alta calidad.
- `assets/logo-aiep.png`: logo principal en PNG.
- `assets/logo-aiep-mark.png`: símbolo simplificado para aperturas de bloque y detalle interno.

## Checklist mínimo antes de cerrar

- La portada usa logo AIEP y respeta márgenes.
- La paleta respeta la proporción `60 / 30 / 10`.
- El rojo aparece como acento, no como ruido.
- El deck se siente AIEP incluso sin leer el logo en cada slide.
- Hay consistencia entre portada, aperturas de bloque y slides internas.
- La cantidad de diapositivas calza con la duración real de la clase.
- El resultado final quedó legible, sin overflow y con ritmo visual.
