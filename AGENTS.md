# AGENTS.md

## Propósito del repositorio

Este repositorio organiza y desarrolla materiales docentes para el módulo `PRO301 Taller de Aplicaciones para Internet`, impartido en el IP AIEP de Chile dentro de la carrera **Técnico de Nivel Superior en Programación y Análisis de Sistemas**.

Aquí se mantienen:

- el cronograma oficial del módulo;
- los README de cada clase;
- y las presentaciones PPT/PPTX asociadas.

El trabajo del agente debe priorizar materiales claros, técnicamente correctos, actualizados y coherentes entre sí, listos para ser usados en clases reales.

## Público objetivo

Los materiales están dirigidos a estudiantes de **Técnico de Nivel Superior en Programación y Análisis de Sistemas**.

Eso implica que el contenido debe:

- asumir un nivel inicial o intermedio temprano, no experto;
- enseñar fundamentos con lenguaje claro, pero sin infantilizar;
- introducir vocabulario técnico real desde el principio;
- equilibrar comprensión conceptual, práctica concreta y criterio técnico;
- preparar a los estudiantes para trabajar con herramientas, código, diagnóstico y flujo de desarrollo de forma profesional básica.

Evitar dos errores frecuentes:

- simplificar tanto el contenido que pierda valor técnico;
- o volverlo tan abstracto o avanzado que deje de ser útil para este nivel formativo.

## Enfoque pedagógico del módulo

El módulo no debe tratarse como una colección de tecnologías aisladas, sino como una introducción seria al desarrollo web moderno.

Se debe priorizar:

- fundamentos de la web;
- estructura y lógica de aplicaciones web;
- herramientas reales de trabajo;
- Git y GitHub;
- navegador y DevTools;
- flujo de desarrollo moderno;
- criterio técnico;
- y uso pertinente de agentes e IA como apoyo.

Si aparecen tecnologías antiguas o legadas, deben tratarse con contexto y criterio, no como centro formativo por defecto.

## Progresión temporal de profundidad técnica

La progresión técnica del módulo debe leerse en dos ejes al mismo tiempo:

- dentro de una misma semana;
- y entre semanas consecutivas.

La dificultad no debe quedarse estática. El curso debe avanzar desde comprensión inicial hacia trabajo técnico cada vez más concreto, visible y exigente.

### 1. Progresión dentro de la semana

Dentro de una misma semana debe existir una progresión clara de profundidad técnica. La semana no debe sentirse plana ni repetir el mismo nivel de exigencia conceptual en cada sesión.

Usar por defecto esta lógica:

- `lunes`: instalar marco conceptual, vocabulario, mapa mental, motivación y primeras distinciones técnicas;
- `martes`: mantener la comprensión conceptual, pero aumentar contacto con herramientas, flujos reales, primeros comandos, primeras estructuras de código o lectura guiada;
- `miércoles`: subir la densidad técnica de forma visible con más código, más comandos, más inspección, más estructura real, más lectura de archivos, más debugging y más contacto con piezas concretas del trabajo técnico.

Eso no significa abandonar la intuición pedagógica, sino hacer que la intuición desemboque en práctica técnica más dura a medida que avanza la semana.

### 2. Progresión entre semanas

La dificultad también debe crecer de una semana a otra. Un día equivalente de una semana posterior no debería sentirse técnicamente igual al de una semana anterior, salvo que el cronograma justifique una pausa, repaso o evaluación.

En términos prácticos:

- el `lunes` de la semana 1 puede ser más introductorio que el `lunes` de la semana 2;
- el `martes` de una semana posterior debería operar sobre herramientas, código o estructuras con más soltura que el `martes` inicial;
- el `miércoles` de una semana posterior debería mostrar más exigencia técnica acumulada que el `miércoles` de la primera semana.

Esto implica que, a medida que avanza el módulo, debe aumentar gradualmente la presencia de:

- snippets;
- comandos;
- lectura de código y de estructura real;
- análisis técnico de errores;
- inspección en navegador;
- integración entre herramientas;
- y tareas donde el estudiante tenga que interpretar material menos “amigable” y más cercano al trabajo real.

En términos prácticos:

- una clase del miércoles no debería sentirse como un lunes con contenido distinto;
- una clase de la semana 4 no debería sentirse como una reescritura suavizada de la semana 1;
- hacia mitad y fin de semana debe crecer la presencia de snippets, comandos, estructura real de documentos, inspección técnica y casos de uso concretos;
- a medida que pasan las semanas debe crecer la tolerancia del curso a material más duro, más concreto y más técnico;
- el aumento de dificultad debe ser gradual, pero perceptible;
- si el cronograma no indica otra cosa, el módulo debe avanzar desde comprensión general hacia mayor ejecución, lectura técnica, diagnóstico y resolución concreta.

## Jerarquía de verdad del repositorio

Cuando exista tensión entre archivos, usar este orden:

1. `cronograma/README.md` define el marco general del módulo.
2. `clases/semana-XX/YY/README.md` desarrolla la clase concreta.
3. El PPT debe derivarse del README de la clase, no inventar otra versión paralela del contenido.

No cambiar por cuenta propia fechas, evaluaciones, enfoque general del módulo o decisiones curriculares grandes sin consultarlo.

## Estructura del repositorio

- `cronograma/README.md`: planificación general del módulo.
- `clases/semana-XX/YY/README.md`: desarrollo de cada clase.
- `clases/semana-XX/YY/ppt/`: presentación final, fuente editable y `source/` de construcción.
- `docs/`: documentos institucionales de referencia.
- `.agent/skills/`: skills locales del repositorio.

## Idioma y tono

- Todo material visible para estudiantes debe estar en español correcto.
- Usar tildes, `ñ` y redacción cuidada.
- No escribir comentarios meta dirigidos al docente dentro del material del estudiante.
- Evitar frases como `conviene explicar`, `aquí pondremos`, `esta versión del deck` o cualquier texto de producción interna.
- El tono debe ser docente, técnico, claro y sobrio.
- El contenido debe sonar profesional, no burocrático ni artificial.

## Flujo de trabajo esperado

Al crear o editar una clase:

1. Revisar primero `cronograma/README.md`.
2. Trabajar primero el `README.md` de la clase.
3. Definir o respetar:
   - cabecera de la clase;
   - objetivos;
   - 4 bloques;
   - cierre.
4. Desarrollar el contenido por secciones antes de convertirlo a PPT.
5. Solo después pasar el contenido al PPT.
6. Hacer un pulido final de coherencia entre cronograma, README y deck.

## Reglas para README de clases

- Las clases son de `3 horas`.
- La estructura base de cada clase es:
  - objetivos de la clase;
  - 4 bloques;
  - cierre.
- Cada bloque debe escribirse como contenido legible para estudiantes.
- Priorizar comprensión técnica real, no solo enumeración de conceptos.
- Incluir ejemplos, preguntas guía y diagramas cuando aporten valor.
- Mantener coherencia con el resto del módulo.

## Reglas para PPT

- El deck debe respetar identidad visual AIEP.
- Para clases de `3 horas`, el PPT debe tener al menos `60` diapositivas.
- No inflar el deck con relleno; expandir con ejemplos, mini casos, comparaciones, errores comunes, recapitulaciones y transiciones.
- La composición visual no debe repetirse mecánicamente entre slides.
- El layout debe apoyar lo que se está enseñando.
- Evitar slides pesadas resueltas solo con 2 o 3 cajas grandes llenas de texto.
- Revisar que no haya overflow, cortes, conectores absurdos ni composiciones confusas.
- El texto del deck también es material para estudiantes, no notas para el docente.

## Ejemplos y casos

Preferir ejemplos que suenen a trabajo real de un técnico:

- formularios;
- portafolios;
- paneles simples;
- catálogos;
- autenticación básica;
- consumo de APIs;
- y diagnóstico en navegador.

Evitar ejemplos vacíos o demasiado abstractos si no ayudan a fijar criterio técnico.

## Skills locales

Cuando corresponda, usar estas skills del repositorio:

- `clase-design`: para estructurar y redactar clases.
- `cohort-comms`: para redactar mensajes docentes breves y estratégicos para WhatsApp u otros canales de estudiantes.
- `slides-aiep`: para dirección visual institucional de los PPT.
- `slides`: para construir, renderizar y validar decks.

Las skills resuelven tareas especializadas. Este `AGENTS.md` fija el marco general del repositorio y no debe duplicar innecesariamente su contenido interno.

## Limpieza de entregables

En `clases/semana-XX/YY/ppt/` dejar solo:

- el `.pptx` final;
- el `.js` editable final;
- `source/`.

No dejar:

- renders temporales;
- montages;
- versiones `v2`, `v3`, etc.;
- archivos auxiliares innecesarios.

El PPT final debe poder regenerarse desde su `.js` y `source/`.

## Criterio técnico del contenido

- No centrar el módulo en tecnologías obsoletas o desalineadas con el enfoque actual del curso.
- Tratar stacks antiguos como legado o contexto cuando corresponda.
- Priorizar herramientas y prácticas vigentes sin caer en hype innecesario.
- Mantener equilibrio entre intuición, práctica y técnica concreta.
- Recordar que el público necesita fundamentos, pero también contacto real con herramientas, comandos, diagnóstico y flujo de trabajo profesional básico.

## Antes de cerrar cambios

Antes de dar una clase o un PPT por terminado:

- comprobar coherencia entre cronograma, README y PPT;
- revisar ortografía y redacción;
- validar que el deck abra bien;
- verificar que no quede basura en carpetas;
- y dejar el repo en estado razonablemente limpio.
