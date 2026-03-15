---
name: clase-design
description: Diseñar, estructurar y redactar clases de programación web en español para este repositorio. Usar cuando el docente necesite crear o mejorar README.md de clases, objetivos de aprendizaje, distribución horaria, bloques de contenido, ejercicios, preguntas guía, diagramas o cierres de clase. Priorizar sesiones de 3 horas con 4 bloques, alineadas al cronograma del repo y desarrolladas por secciones bajo demanda.
---

# Clase Design

Usar esta skill para convertir una entrada del cronograma en una clase clara, enseñable y coherente con el flujo de trabajo del docente.

## Flujo de trabajo

1. Leer el cronograma relevante y el `README.md` de la clase antes de proponer contenido.
2. Mantener un proceso incremental:
   - primero conversar objetivos y reparto en 4 bloques;
   - luego redactar solo la sección que el docente pida;
   - no completar la clase entera de una sola vez salvo que el docente lo solicite.
3. Respetar el horario real de la sesión. Para clases de 3 horas usar por defecto:
   - `10 min` objetivos y encuadre;
   - `35 min` bloque 1;
   - `35 min` bloque 2;
   - `10 min` pausa;
   - `35 min` bloque 3;
   - `35 min` bloque 4;
   - `20 min` cierre, preguntas o síntesis.
4. Ajustar tiempos solo si el contexto del archivo o el docente pide otra distribución.

## Estructura esperada de una clase

Cuando se redacte una clase completa, usar esta secuencia:

1. Título e información general.
2. Objetivos de la clase.
3. Mapa de la clase.
4. Bloque 1.
5. Bloque 2.
6. Bloque 3.
7. Bloque 4.
8. Cierre, tarea o siguiente paso si corresponde.

## Reglas de diseño pedagógico

- Escribir en español correcto, con tildes y `ñ`.
- Mantener tono docente, claro e institucional; evitar humo, promesas grandilocuentes o frases marketineras.
- Formular objetivos medibles y realistas para el tiempo disponible.
- Diseñar cada bloque con propósito explícito, transición clara y una comprobación breve de comprensión.
- Incluir preguntas guía y momentos de participación, no solo exposición.
- Usar ejemplos, analogías o errores comunes cuando ayuden, pero sin forzarlos en cada sección.
- Para clases conceptuales, preferir diagramas, casos y recorridos mentales antes que código innecesario.
- Para clases prácticas, mostrar progresión de simple a aplicado y dejar tiempo real de trabajo.

## Criterios de contenido para este repo

- Alinear cada clase con `cronograma/README.md`.
- Priorizar fundamentos transferibles sobre herramientas de moda.
- Tratar PHP y Bootstrap como legado o contexto institucional solo cuando el cronograma o el docente lo requieran.
- Favorecer frontend moderno, accesibilidad, APIs, datos, agentes e IA aplicada según el enfoque actualizado del módulo.
- No reintroducir contenidos viejos del curso si ya fueron reemplazados en el cronograma.
- Respetar progresión temporal de profundidad técnica: `lunes` más marco e intuición, `martes` más herramientas y primeras operaciones técnicas, `miércoles` más código, comandos, inspección, debugging y lectura técnica concreta.
- Si la clase cae al final de la semana, aumentar de forma visible la densidad técnica del material sin perder claridad pedagógica.
- En clases de miércoles, procurar que aparezcan más fragmentos de código, más estructuras reales, más comandos o más análisis técnico que en lunes y martes, salvo que el cronograma indique otra intención.
- A medida que avanzan las semanas, aumentar gradualmente la exigencia técnica del material: un día equivalente de una semana posterior no debería quedarse al nivel técnico de una semana inicial si el cronograma ya avanzó.
- Usar la progresión del módulo para que, con el paso de las semanas, crezcan la lectura de código, la interpretación de estructuras reales, la inspección, el debugging y el trabajo con comandos o herramientas concretas.

## Diseño de bloques

Cada bloque debe incluir, cuando aplique:

- nombre del bloque;
- duración;
- objetivo del bloque;
- desarrollo en 2 a 4 subapartados;
- preguntas de activación, chequeo o discusión;
- puente hacia el bloque siguiente.

Patrón recomendado para las 4 secciones:

1. Bloque 1: contexto, motivación y marco conceptual.
2. Bloque 2: núcleo del tema o recorrido guiado.
3. Bloque 3: aplicación, análisis o práctica intermedia.
4. Bloque 4: integración, reflexión, caso final o actividad de cierre.

## Progresión por día de semana

Cuando una semana tenga clases en `lunes`, `martes` y `miércoles`, usar por defecto esta progresión:

1. `Lunes`
   Priorizar fundamentos, vocabulario, mapa general, intuición correcta y primeras distinciones.
2. `Martes`
   Empezar a bajar el contenido a herramientas, recorridos operativos, ejemplos guiados, primeras estructuras y primeros comandos.
3. `Miércoles`
   Aumentar claramente la densidad técnica con más código, más comandos, más lectura de estructura real, más inspección en navegador, más análisis de errores y más contacto con piezas concretas del trabajo del desarrollador.

Esta regla no exige convertir toda clase de miércoles en laboratorio duro, pero sí evita que la semana cierre sin suficiente contacto con material técnicamente más exigente.

## Progresión entre semanas

Además de la progresión interna de cada semana, debe existir una progresión acumulativa entre semanas consecutivas.

Eso significa que:

- el `lunes` de una semana posterior puede seguir introduciendo un tema nuevo, pero no debería volver al mismo nivel de suavidad técnica del `lunes` inicial del curso;
- el `martes` y el `miércoles` de semanas posteriores deben mostrar una relación más directa con código, comandos, inspección, análisis técnico o integración real;
- si el módulo ya avanzó, el diseño de la clase debe asumir que el estudiante tolera mejor material más concreto y menos mediado.

En diseño de clase, esto se traduce en aumentar gradualmente:

- snippets y ejemplos de código;
- comandos y secuencias de trabajo;
- lectura de estructuras o archivos reales;
- análisis de errores o casos menos idealizados;
- y ejercicios donde el estudiante tenga que interpretar técnicamente antes de actuar.

La progresión debe ser gradual y enseñable, no brusca. El objetivo no es volver la clase arbitrariamente difícil, sino más cercana al trabajo técnico real a medida que el curso madura.

## Cuándo leer recursos adicionales

Leer solo el archivo que haga falta:

- `assets/readme-template.md`: cuando haya que escribir una clase completa desde cero.
- `references/emotional-hooks.md`: cuando el docente pida una apertura potente o un problema disparador.
- `references/analogies-bank.md`: cuando un concepto abstracto necesite analogía.
- `references/socratic-questions.md`: cuando falten preguntas para guiar la conversación.
- `references/common-errors.md`: cuando convenga incorporar un error común o debugging pedagógico.
- `references/exercise-levels.md`: cuando se diseñen ejercicios diferenciados por nivel.
- `references/mermaid-patterns.md`: cuando se necesiten diagramas Mermaid.
- `references/code-examples.md`: solo cuando la clase realmente necesite código.

Si un recurso trae ejemplos desactualizados, adaptar el lenguaje y la tecnología al cronograma vigente antes de usarlo.

## Convenciones de salida

- Si el docente pide solo objetivos, escribir solo objetivos.
- Si pide solo un bloque, escribir solo ese bloque.
- Si pide revisar, priorizar claridad pedagógica, secuencia, tiempo y alineación con el cronograma.
- Mantener consistencia con la estructura que ya exista en el `README.md` de la clase, salvo que el docente pida refactorizarla.

## Checklist mínimo antes de cerrar una entrega

- Los objetivos son observables o evaluables.
- La distribución calza con la duración real.
- Los 4 bloques se distinguen entre sí y no repiten contenido.
- La clase conecta con el día del cronograma y prepara la siguiente.
- El texto quedó en español correcto.
