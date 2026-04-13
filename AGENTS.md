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

## IA y agentes como metodología transversal

El módulo debe instalar desde temprano una idea clara: hoy desarrollar también implica saber trabajar con IA y agentes, pero sin delegar el juicio técnico.

Eso significa que la IA no debe aparecer solo como una clase aislada al final del curso ni como un comentario anecdótico en la introducción. Debe entrelazarse con el aprendizaje técnico durante el módulo, especialmente cuando aparezcan conceptos duros, estructuras reales, debugging, comandos, inspección o decisiones de implementación.

Usar por defecto esta lógica:

- cuando un concepto técnico sea exigente, mostrar también cómo un agente podría ayudar a explorarlo, explicarlo, generar una primera versión o acelerar trabajo repetitivo;
- al mismo tiempo, dejar explícito qué parte sigue dependiendo del criterio humano: verificar, leer, corregir, depurar, comparar, validar y decidir;
- evitar presentar la IA como magia, reemplazo del aprendizaje o atajo para no entender fundamentos;
- presentar agentes, prompts, `AGENTS.md`, skills, revisión y validación como parte de un flujo profesional moderno.

En términos prácticos, cada clase debería dejar al menos una huella visible de esta metodología cuando el contenido lo permita:

- una mención concreta de cómo ese tema se puede trabajar con agentes;
- una advertencia sobre lo que no conviene delegar;
- o una integración breve entre concepto técnico y uso responsable de IA.

Cuando la clase toque conceptos técnicos duros, esa integración ya no debería quedar como comentario lateral. Debe tomar una forma operativa y reconocible dentro del material, por ejemplo:

- qué parte del problema un agente puede ayudar a explicar, proponer, comparar o acelerar;
- qué parte exige validación humana directa;
- qué error típico aparece cuando se delega demasiado;
- y cómo cambia el flujo de trabajo cuando se combina comprensión técnica con apoyo inteligente.

Usar por defecto esta estructura mental:

1. entender el concepto técnico;
2. mostrar cómo un agente podría apoyar;
3. explicitar qué hay que verificar manualmente;
4. cerrar con criterio técnico y no con automatismo.

Ejemplos de integración esperable:

- fundamentos web: un agente puede ayudar a narrar el recorrido de una solicitud, pero el estudiante debe comprender URL, DNS, HTTP y cliente-servidor sin repetir explicaciones ciegamente;
- HTML semántico y accesibilidad: un agente puede proponer estructura o formularios, pero la semántica, jerarquía y accesibilidad deben ser revisadas por criterio humano;
- CSS y layout: un agente puede sugerir estilos, variables o layouts, pero la cascada, especificidad, comportamiento responsive y consistencia visual deben inspeccionarse;
- Git, terminal y DevTools: un agente puede sugerir comandos o hipótesis de debugging, pero el estado real del repo, la lectura de errores y la validación del diagnóstico siguen siendo responsabilidad humana;
- APIs, datos y seguridad: un agente puede bosquejar requests, estructuras o validaciones, pero contrato, manejo de errores, exposición de datos y seguridad no deben delegarse sin revisión.

La idea no es forzar una sección artificial en todas las sesiones, sino construir de forma progresiva un hábito mental:

- entender el sistema;
- apoyarse en agentes;
- verificar con criterio.

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
- `clases/semana-XX/YY/infografia/`: infografía final de apoyo para estudiantes.
- `clases/semana-XX/YY/podcast/`: podcast o resumen de audio final de apoyo para estudiantes.
- `docs/`: documentos institucionales de referencia.
- `tools/slides-system/`: sistema compartido para tema, componentes y utilidades de PPT.
- `.agent/skills/`: skills locales del repositorio.

## Tooling auxiliar y `uv`

Este entorno cuenta con `uv` disponible. Usarlo por defecto cuando haga falta ejecutar utilidades Python, leer documentos, probar scripts aislados o instalar herramientas auxiliares sin ensuciar el entorno global.

Usar esta preferencia:

- `uv run ...` para scripts o utilidades puntuales;
- `uv tool install ...` para herramientas CLI que convenga tener disponibles;
- `uv add ...` solo cuando realmente corresponda dejar una dependencia persistente dentro de un proyecto del repositorio.

No asumir que una tarea Python no se puede resolver solo porque falte un paquete global. Antes de descartar una vía, considerar si `uv` permite ejecutarla o instalar la herramienta adecuada de forma controlada.

## Automatización visual con `playwright-cli`

Este entorno también cuenta con `playwright-cli` disponible como herramienta auxiliar de navegador.

Usarlo cuando convenga:

- abrir páginas locales o remotas y revisarlas con navegador real;
- comprobar comportamiento responsive;
- capturar screenshots;
- inspeccionar rápidamente una interfaz HTML/CSS durante ejemplos, demos o materiales prácticos;
- y validar cambios visuales antes de cerrar un ejemplo web.

Usarlo especialmente en tareas como:

- ejemplos estáticos dentro de `clases/.../ejemplo-web/`;
- revisiones visuales de `index.html` y `styles.css`;
- comparación entre versión desktop y móvil;
- y chequeos rápidos de interacción o estructura visible.

No asumir que reemplaza criterio humano ni revisión manual: su valor principal aquí es acelerar validación visual y responsive con evidencia directa en navegador.

## Documentos estratégicos de referencia

Además del cronograma y de los README de clase, este repo puede contener documentos de trabajo que actualizan el marco conceptual del módulo cuando el material oficial queda atrasado frente al estado real del oficio.

Usar especialmente como referencia de modernización:

- `docs/paradigma_agentic_spec_driven_2026.pdf`

Ese documento no reemplaza el cronograma ni cambia por sí solo la secuencia de clases, pero sí debe influir en cómo se enmarca el módulo, cómo se explica el trabajo moderno y cómo se integran IA, agentes, `AGENTS.md`, skills, contexto, especificación y validación dentro del curso.

En términos prácticos:

- el `cronograma` sigue definiendo qué temas se cubren y cuándo;
- el PDF ayuda a actualizar la lectura pedagógica y profesional de esos temas;
- si el material oficial del módulo queda desalineado con este paradigma, adaptar el enfoque de clase sin romper la estructura curricular base.

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
6. Antes del PPT, hacer una revisión global del README de la clase.
7. Solo después hacer el pulido final entre cronograma, README y deck.
8. Cuando la clase ya esté estable, preparar prompts para materiales complementarios en NotebookLM:
   - una `infografía`;
   - y un `podcast` o resumen de audio.

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
- Cuando el tema lo permita, enlazar explícitamente el contenido técnico con uso responsable de IA y agentes como apoyo de trabajo.
- Si la clase contiene conceptos técnicos exigentes, incluir al menos una integración explícita y concreta entre ese contenido y el trabajo con agentes: ayuda posible, límite de delegación y validación humana.

## Revisión global del README antes del PPT

Antes de convertir una clase a presentación, revisar el `README.md` completo como una unidad y no solo como suma de bloques.

Ese repaso debe comprobar, como mínimo:

- coherencia entre título, objetivos, bloques y cierre;
- progresión interna de la clase;
- alineación con el día de la semana y con el avance técnico del módulo;
- que no falten secciones, puentes, cierres o remates importantes;
- que no haya repeticiones innecesarias entre bloques;
- que no queden párrafos cortados, ideas inconclusas o transiciones débiles;
- que el texto esté en español correcto, con tildes, `ñ` y sin mojibake;
- y que el cierre de la clase realmente sintetice y proyecte el siguiente paso.

No empezar el PPT si el README todavía se siente fragmentado, incompleto o con problemas de redacción.

## Reglas para PPT

- El deck debe respetar identidad visual AIEP.
- Al trabajar decks de este repositorio, preferir `tools/slides-system/` para tema, componentes y utilidades compartidas en vez de copiar helpers por clase.
- Para clases de `3 horas`, el PPT debe tener al menos `60` diapositivas.
- No inflar el deck con relleno; expandir con ejemplos, mini casos, comparaciones, errores comunes, recapitulaciones y transiciones.
- La composición visual no debe repetirse mecánicamente entre slides.
- El layout debe apoyar lo que se está enseñando.
- Evitar slides pesadas resueltas solo con 2 o 3 cajas grandes llenas de texto.
- Revisar que no haya overflow, cortes, conectores absurdos ni composiciones confusas.
- El texto del deck también es material para estudiantes, no notas para el docente.
- Si un patrón visual o artefacto técnico se repite entre clases, moverlo al sistema compartido antes de seguir clonándolo dentro de distintos `source/`.
- Si el README ya integró IA/agentes de forma relevante, el PPT no debe omitirlo: esa metodología debe quedar visible al menos en una slide, callout o comparación del bloque correspondiente.

## Materiales complementarios con NotebookLM

Cuando la clase ya tenga `README` y `PPT` estables, conviene preparar dos artefactos complementarios:

- una infografía;
- y un podcast o resumen de audio.

Usarlos con esta lógica:

- la infografía sirve como mapa visual rápido;
- el podcast sirve como repaso, prelectura o refuerzo conversado.
- el `PPT` sí debe respetar identidad AIEP de forma estricta;
- la infografía de NotebookLM puede ser más libre visualmente mientras mantenga tono técnico, claridad y seriedad.

No prepararlos antes de que la clase esté cerrada.

Para decidir formato, tono y prompts, usar `docs/notebooklm-materiales-complementarios.md`.

## Flujo de validación para PPT y slides-system

Cada vez que se cree, rehaga o amplíe un PPT de este repositorio, no basta con generar el `.pptx`: hay que compilar, validar y corregir antes de cerrar.

Usar por defecto esta lógica:

1. Si el deck depende de `tools/slides-system/`, comprobar primero que la base compartida esté al día.
2. Si se modificó `tools/slides-system/`, ejecutar `npm run test:all` dentro de ese directorio y corregir cualquier fallo antes de volver al deck.
3. Si la clase nueva usa TypeScript o consume `dist/`, ejecutar al menos `npm run build` en `tools/slides-system/` antes de regenerar el PPT.
4. Regenerar el deck desde su fuente editable.
5. Ejecutar validaciones de deck: overflow, render visual, apertura correcta en PowerPoint y **validación estructural .NET** (`dotnet run --project tools/pptx-validator -- "archivo.pptx"`).
6. Corregir solapes, cortes, conectores mal resueltos, mojibake, errores ortográficos o **errores de integridad XML** detectados por el validador antes de dar el deck por terminado.

No cerrar un trabajo de PPT si se cumple alguna de estas condiciones:

- el build compartido falla;
- la suite de `tools/slides-system/` falla tras tocar la librería;
- el deck presenta overflow, solapes o composiciones rotas;
- PowerPoint intenta reparar el archivo;
- o el texto visible quedó con errores de español o encoding.

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

Cuando la clase incluya materiales complementarios, asumir también esta estructura mínima en su carpeta:

- `infografia/`: dejar la pieza final exportada.
- `podcast/`: dejar el audio final exportado.

No usar esas carpetas para acumular borradores descartados o exportaciones redundantes.

## Criterio técnico del contenido

- No centrar el módulo en tecnologías obsoletas o desalineadas con el enfoque actual del curso.
- Tratar stacks antiguos como legado o contexto cuando corresponda.
- Priorizar herramientas y prácticas vigentes sin caer en hype innecesario.
- Mantener equilibrio entre intuición, práctica y técnica concreta.
- Recordar que el público necesita fundamentos, pero también contacto real con herramientas, comandos, diagnóstico y flujo de trabajo profesional básico.
- Integrar IA y agentes como parte del trabajo moderno, pero siempre subordinados a comprensión, lectura crítica, verificación y criterio técnico.

## Antes de cerrar cambios

Antes de dar una clase o un PPT por terminado:

- comprobar coherencia entre cronograma, README y PPT;
- revisar ortografía y redacción;
- validar que el deck abra bien;
- verificar que no quede basura en carpetas;
- y dejar el repo en estado razonablemente limpio.
