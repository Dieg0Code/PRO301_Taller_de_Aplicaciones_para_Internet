# Ejemplo Web Guiado con Codex

- Tipo de material: tutorial práctico de preparación para la Evaluación Parcial 1
- Unidad 01: Fundamentos y la Web Estática
- Contexto de uso: apoyo para la clase del lunes 30 de marzo de 2026
- Modalidad: trabajo guiado en laboratorio
- Enfoque: HTML, CSS, responsive, accesibilidad básica y uso responsable de Codex
- Propósito: mostrar cómo pasar de una idea inicial a una página estática funcional usando contexto claro, `AGENTS.md`, instrucciones precisas y validación manual

---

# Objetivo del Material

Este documento guía un ejemplo práctico de trabajo con Codex para construir una página web estática con HTML y CSS. La idea no es delegar todo ciegamente, sino aprender a:

- definir con claridad qué se quiere construir;
- dar buen contexto al agente;
- pedir una primera versión útil;
- iterar con criterio técnico;
- y validar manualmente el resultado antes de entregarlo.

---

# Qué es Codex, Cómo lo Podemos Usar y Cómo lo Gobernamos

Antes de pedir una página o escribir un prompt, conviene entender qué es realmente Codex dentro de este flujo de trabajo.

## Qué es Codex

Codex es un agente de programación que puede trabajar contigo dentro de un proyecto real. No funciona solo como un chat que responde preguntas: también puede leer archivos, entender contexto, proponer cambios, escribir código, reorganizar estructura y ayudarte a iterar sobre una solución.

En este ejemplo lo vamos a usar como apoyo para construir una página estática con HTML y CSS.

Eso significa que Codex puede colaborar en tareas como:

- proponer la estructura inicial del sitio;
- escribir una primera versión de `index.html`;
- generar `styles.css`;
- ajustar responsive;
- corregir detalles de layout;
- y ayudarte a ordenar el trabajo si la idea todavía está confusa.

La idea importante es esta:

> Codex no reemplaza el criterio técnico. Funciona mejor cuando recibe buen contexto y buenas restricciones.

## Cómo lo podemos usar

Codex se puede usar de varias formas dentro de una tarea web simple.

Por ejemplo, sirve para:

- pasar de una idea vaga a una estructura más clara;
- convertir una consigna en un pequeño plan de trabajo;
- pedir una primera versión funcional;
- refinar una sección específica de la interfaz;
- corregir un error de HTML o CSS;
- o revisar si una solución quedó consistente con lo que se pidió.

Una forma sana de usarlo no es pedir:

> “hazme una página”

sino algo más útil, como:

> “quiero una landing page estática para un servicio técnico local, con hero, beneficios, tarjetas, formulario y footer; usa HTML semántico, CSS simple, mobile-first y sin JavaScript”.

Eso cambia mucho la calidad del resultado, porque el agente ya no adivina tanto.

## Cómo lo gobernamos

Trabajar con Codex no consiste en soltar una instrucción y esperar magia. También hay que gobernar el trabajo.

Aquí gobernar significa:

- definir bien qué se quiere construir;
- explicar restricciones;
- dar contexto del proyecto;
- dejar reglas claras;
- revisar lo que el agente propone;
- y validar manualmente antes de cerrar.

En este flujo, tres piezas son especialmente importantes:

### 1. El contexto del proyecto

Codex trabaja mejor cuando entiende dónde está parado:

- qué archivos existen;
- qué tipo de sitio se quiere construir;
- qué tecnologías sí se pueden usar;
- y qué se espera como resultado final.

### 2. El archivo `AGENTS.md`

`AGENTS.md` sirve para dejar reglas persistentes del proyecto.

Por ejemplo, ahí puedes indicar cosas como:

- usar solo HTML y CSS;
- no usar frameworks;
- mantener estructura semántica;
- priorizar mobile-first;
- cuidar accesibilidad básica;
- no inventar archivos innecesarios;
- y validar antes de dar el trabajo por terminado.

Eso evita que cada instrucción tenga que empezar desde cero.

### 3. La validación humana

Aunque Codex proponga una primera versión bastante buena, sigue siendo necesario revisar:

- si el HTML tiene sentido;
- si el CSS quedó limpio;
- si el responsive funciona;
- si la página se ve bien en navegador;
- y si la solución realmente cumple la consigna.

Por eso, en este tutorial, Codex no será el “autor absoluto” del proyecto. Será una herramienta de apoyo dentro de un flujo gobernado por contexto, reglas y validación.

---

# Qué Hace Bien Codex y Qué no Conviene Delegar

Trabajar con Codex no significa pedir una página completa y aceptar lo primero que aparezca. La idea correcta es usarlo como apoyo dentro de un flujo de trabajo más claro.

## Lo que Codex sí puede acelerar bien

Codex puede ayudar bastante cuando ya existe una intención más o menos clara. Por ejemplo, puede:

- proponer una estructura inicial del proyecto;
- generar una primera versión de `index.html` y `styles.css`;
- sugerir secciones para una landing page;
- ordenar jerarquía visual, spacing y layout base;
- proponer una versión inicial responsive;
- ayudar a refactorizar HTML o CSS repetitivo;
- detectar inconsistencias visibles en el código;
- y explicar qué está haciendo una parte del archivo si algo no se entiende.

Usado así, Codex sirve para partir más rápido, comparar alternativas y evitar trabajo repetitivo.

## Lo que no conviene delegar ciegamente

Hay decisiones que siguen dependiendo del criterio humano y de la revisión manual. No conviene delegar sin mirar:

- si la estructura HTML realmente es semántica;
- si el contenido principal está claro;
- si el layout funciona bien en móvil y escritorio;
- si el contraste, el foco y la lectura se sienten razonables;
- si los textos tienen sentido para el contexto del sitio;
- si el resultado cumple exactamente con la consigna;
- o si una solución “se ve bonita”, pero técnicamente quedó desordenada.

En otras palabras: Codex puede proponer, pero no debería decidir solo.

## La lógica correcta de trabajo

La secuencia más sana para esta evaluación es:

1. definir qué quieres construir;
2. explicar restricciones y contexto;
3. pedir una primera versión;
4. revisar el resultado;
5. ajustar con criterio;
6. validar en navegador;
7. y recién después cerrar la entrega.

La idea importante es esta:

> Codex acelera la primera versión. El estudiante valida la calidad final.

---

# Entorno de Trabajo para el Agente

Si queremos que Codex trabaje mejor, no basta con escribirle una instrucción suelta. También conviene preparar un entorno mínimo que lo ayude a entender el proyecto y a comportarse de forma más consistente.

En este punto aparecen dos archivos importantes:

- `AGENTS.md`
- `SKILL.md`

No cumplen la misma función. Por eso conviene distinguirlos bien.

## Qué es `AGENTS.md` y para Qué Sirve

`AGENTS.md` es un archivo donde se dejan reglas persistentes para el agente dentro de un proyecto o repositorio.

Sirve para decirle cosas como:

- qué se está construyendo;
- qué tecnologías sí se pueden usar;
- qué tecnologías no se deben usar;
- qué tono o estándar debe seguir el trabajo;
- cómo validar el resultado;
- y qué restricciones debe respetar siempre.

En otras palabras, `AGENTS.md` funciona como una capa de gobierno del proyecto.

Eso ayuda mucho porque evita repetir en cada prompt instrucciones como:

- “usa solo HTML y CSS”;
- “no uses frameworks”;
- “mantén estructura semántica”;
- “cuida responsive”;
- “no inventes archivos innecesarios”.

Si el archivo está bien escrito, Codex parte desde un contexto mucho más claro.

### Ejemplo de cosas que podría decir un `AGENTS.md` para esta evaluación

- este proyecto es una landing page estática;
- usar solo `index.html` y `styles.css`;
- no usar JavaScript;
- priorizar estructura semántica;
- aplicar enfoque mobile-first;
- cuidar contraste, jerarquía y accesibilidad básica;
- no cerrar el trabajo sin revisar el resultado en navegador.

## Qué es `SKILL.md` y para Qué Sirve

`SKILL.md` es distinto. No gobierna un proyecto completo, sino que define una capacidad o flujo especializado que el agente puede reutilizar.

Una skill sirve cuando hay una tarea que aparece muchas veces y conviene resolver con una metodología ya preparada.

Por ejemplo, una skill puede enseñar al agente a:

- estructurar clases;
- diseñar presentaciones;
- redactar mensajes para estudiantes;
- o seguir un flujo técnico específico.

En ese caso, la skill no describe un proyecto puntual, sino una forma de trabajar una tarea.

Por eso una `SKILL.md` suele incluir:

- propósito;
- cuándo usarla;
- flujo de trabajo;
- reglas;
- y recursos asociados.

### Nota útil: Codex también tiene una skill para crear skills

Si más adelante quieres construir una skill nueva en vez de solo usar una existente, Codex también puede ayudarte con eso.

Existe una skill pensada justamente para diseñar skills nuevas de forma más ordenada. Eso sirve cuando ya no solo quieres pedir una página o un cambio puntual, sino crear una capacidad reutilizable para tareas que vas a repetir muchas veces.

Por ejemplo, una skill propia podría servir para:

- generar cierto tipo de landing pages;
- revisar accesibilidad con una estructura fija;
- o seguir un flujo repetible de documentación y validación.

Para esta evaluación no es obligatorio crear una skill, pero sí conviene saber que esa posibilidad existe. Primero hay que aprender a gobernar bien el proyecto con contexto y `AGENTS.md`. Después, si un flujo se repite mucho, recién tiene sentido convertirlo en skill.

## Diferencia entre `AGENTS.md` y `SKILL.md`

La diferencia práctica se puede resumir así:

- `AGENTS.md` gobierna el proyecto;
- `SKILL.md` especializa una capacidad del agente.

O dicho de otra forma:

- `AGENTS.md` responde: **cómo debe comportarse el agente aquí**;
- `SKILL.md` responde: **cómo debe resolver bien este tipo de tarea**.

## Para esta evaluación, ¿cuál importa más?

Para la evaluación de una página estática, el archivo más importante es `AGENTS.md`.

Con un buen `AGENTS.md`, Codex ya puede trabajar bastante mejor porque entiende:

- el tipo de proyecto;
- las restricciones;
- el estándar esperado;
- y cómo debe validar el resultado.

En cambio, crear una `SKILL.md` nueva no es obligatorio para esta evaluación.

Puede ser útil en niveles más avanzados o cuando un equipo repite muchas veces el mismo flujo, pero para esta actividad lo principal es aprender a:

- definir contexto;
- escribir reglas claras;
- pedir bien;
- y validar bien.

La idea correcta aquí no es llenar el proyecto de archivos especiales, sino aprender qué herramienta usar para cada nivel del problema.

---

# Preparar el Proyecto Antes de Pedir Código

Antes de pedirle a Codex que construya una landing page, conviene dejar un proyecto mínimo y comprensible.

No hace falta preparar un repositorio complejo. Para esta evaluación basta con algo pequeño, claro y bien gobernado.

## Estructura mínima recomendada

Una base razonable podría ser esta:

```text
mi-landing/
├── AGENTS.md
├── README.md
├── index.html
├── styles.css
└── assets/
```

Esta estructura ya le da a Codex varias señales importantes:

- dónde está el proyecto;
- qué archivos principales existen;
- dónde deberían ir las imágenes;
- y que el trabajo esperado sigue siendo simple y estático.

## Qué conviene definir antes de pedir la primera versión

Antes de escribir el prompt inicial, conviene tener al menos estas decisiones:

- qué tipo de página se va a construir;
- para qué negocio, servicio o tema será;
- qué secciones debe incluir;
- qué tecnologías sí se pueden usar;
- qué tecnologías no se pueden usar;
- y qué restricciones de entrega importan de verdad.

Por ejemplo, una consigna básica podría quedar así:

- landing page para un servicio técnico local;
- hero principal;
- sección de beneficios;
- tres tarjetas de servicios;
- bloque de contacto;
- footer;
- HTML semántico;
- CSS simple;
- responsive;
- sin JavaScript;
- sin frameworks.

Mientras más claro esté esto antes de pedir código, menos va a improvisar el agente.

## Cómo redactar un `AGENTS.md` simple para esta landing

Para esta evaluación, el `AGENTS.md` no necesita ser largo. Tiene que ser claro.

Podría incluir reglas como estas:

```md
# AGENTS.md

## Propósito
Este proyecto construye una landing page estática para un pequeño servicio local.

## Reglas
- Usar solo HTML y CSS.
- No usar frameworks.
- No usar JavaScript.
- Mantener estructura semántica.
- Priorizar mobile-first.
- Cuidar jerarquía visual, contraste y accesibilidad básica.
- No inventar archivos innecesarios.
- Validar el resultado antes de cerrar.

## Entregables
- index.html
- styles.css
- assets/ si hace falta
```

No es un archivo perfecto ni definitivo. Es una base de gobierno. Su valor está en que evita que cada nueva instrucción parta desde cero.

## Qué gana el proyecto con esto

Cuando el proyecto ya tiene:

- estructura mínima;
- una consigna clara;
- y un `AGENTS.md` razonable;

Codex trabaja mejor porque entiende:

- qué se está construyendo;
- cómo debe comportarse;
- qué debe evitar;
- y qué resultado final se espera.

Eso hace mucho más probable que la primera versión salga utilizable.

---

# Consigna, Requisitos y Rúbrica de la Evaluación

Ahora que el flujo de trabajo ya está más claro, falta definir qué tipo de proyecto se puede hacer, qué requisitos mínimos debe cumplir y cómo se va a evaluar.

## Qué tipo de proyecto puedes construir

La evaluación no obliga a que todas las páginas sean iguales. Puedes elegir un formato razonable y trabajar sobre una idea propia, real o ficticia.

Opciones recomendadas:

- un portafolio personal;
- una landing page de un producto;
- una landing page de un servicio;
- una página promocional para un evento;
- una página para una app, juego o emprendimiento;
- o una página informativa simple para una marca ficticia.

La idea importante es que, aunque el tema sea libre, el resultado siga siendo comparable en términos técnicos.

## Puedes inspirarte, pero no copiar sin entender

Es totalmente válido buscar referencias de:

- botones;
- cards;
- hero sections;
- componentes en HTML y CSS puro;
- portfolios;
- landing pages;
- o colecciones de UI.

Eso puede ayudarte a tomar ideas de:

- composición;
- spacing;
- color;
- jerarquía visual;
- estilos de botones;
- o pequeñas animaciones.

Pero inspirarse no significa copiar una interfaz completa sin entenderla. Lo importante es que puedas construir una página propia y explicar por qué tomaste ciertas decisiones.

## Requisitos mínimos del proyecto

El proyecto debe incluir, como base:

- `index.html`;
- `styles.css`;
- estructura HTML semántica;
- layout responsive;
- una versión que se vea bien en celular;
- uso de variables CSS o tokens;
- jerarquía visual clara;
- al menos una interacción visual simple, como `hover`, transición o animación suave;
- accesibilidad básica razonable;
- y una entrega ordenada.

### Qué significa “estructura HTML semántica”

Aquí se espera ver elementos como:

- `header`;
- `main`;
- `section`;
- `article` si aplica;
- `footer`;
- encabezados bien usados;
- formularios con `label` si existen;
- e imágenes con `alt` cuando corresponda.

### Qué significa “responsive”

No basta con que la página “no se rompa”. Debe:

- adaptarse al ancho disponible;
- mantener buena lectura en celular;
- conservar jerarquía visual;
- y evitar una versión móvil descuidada o improvisada.

### Qué significa “tokens” en CSS

Se espera que no todo quede escrito con valores sueltos repetidos por todas partes.

Por ejemplo, suma puntos usar variables para:

- colores;
- spacing;
- radios;
- tamaños;
- o superficies.

La idea es mostrar que ya empiezas a pensar el CSS como sistema y no solo como lista de reglas sueltas.

## Qué se va a evaluar

La evaluación no mide solo si la página “se ve bonita”. También mide estructura, adaptación, criterio visual, limpieza y forma de entrega.

### Rúbrica sugerida sobre 100 puntos

- `20 puntos` HTML y semántica
  Aquí entra uso correcto de etiquetas, jerarquía de encabezados, estructura del documento y claridad del contenido.

- `20 puntos` CSS y sistema visual
  Aquí entra organización del CSS, uso de variables o tokens, consistencia visual, spacing y jerarquía.

- `20 puntos` Responsive y adaptación a celular
  Aquí entra que la página se vea bien en móvil, que el layout se reorganice con sentido y que no quede solo pensada para escritorio.

- `15 puntos` Calidad visual general
  Aquí entra composición, legibilidad, equilibrio, aire, uso del color y sensación general de interfaz cuidada.

- `10 puntos` Accesibilidad básica
  Aquí entra contraste razonable, `alt`, `label`, foco visible si aplica y claridad general de uso.

- `10 puntos` Uso de Codex con criterio
  Aquí entra que exista contexto, que el proyecto esté gobernado, que el trabajo no sea completamente improvisado y que se note una iteración razonable.

- `5 puntos` Orden, limpieza y entrega
  Aquí entra estructura del proyecto, nombres de archivos, claridad y método de entrega.

## Qué cosas pueden sumar refinamiento

No todo esto tiene que ser obligatorio, pero sí puede ayudarte a subir el nivel del trabajo:

- microanimaciones suaves;
- mejores estados de botones;
- cards bien resueltas;
- una hero section más cuidada;
- mejor tratamiento tipográfico;
- mejor versión móvil;
- consistencia visual fuerte;
- o una composición especialmente limpia.

La idea no es meter efectos porque sí. El refinamiento suma cuando mejora la claridad y la calidad visual del sitio.

## Qué errores suelen bajar puntos

Conviene evitar cosas como:

- usar etiquetas sin sentido semántico para todo;
- hacer una página pensada solo para escritorio;
- repetir colores y medidas sin ningún sistema;
- usar contraste pobre;
- dejar botones, cards o secciones mal espaciadas;
- copiar una interfaz sin entenderla;
- llenar el proyecto de archivos innecesarios;
- o entregar algo que no se revisó bien en navegador.

## Método de entrega

La forma de entrega también importa, porque muestra qué tan ordenado está tu flujo de trabajo.

### Opción recomendada: repositorio en GitHub

La mejor entrega es un repositorio de GitHub con:

- archivos ordenados;
- estructura clara;
- nombre razonable;
- y, si alcanza el tiempo, uno o más commits que muestren trabajo real.

Esta opción suma más porque refleja mejor un flujo profesional básico:

- versionado;
- orden;
- y una entrega más seria y trazable.

### Opción aceptable: archivo comprimido

Si no puedes usar GitHub, puedes entregar:

- `.zip`;
- o `.rar`;

siempre que dentro venga el proyecto ordenado y completo.

Esto sigue permitiendo evaluar el trabajo, pero suma menos que un repo porque pierde parte del flujo profesional que también queremos instalar.

### Opción de menor puntaje: envío suelto por WhatsApp o correo

Si la entrega termina siendo:

- un `.rar` enviado por WhatsApp;
- un `.zip` por correo;
- o archivos sueltos sin estructura clara;

entonces la evaluación del contenido puede seguir considerándose, pero la parte de orden, flujo y entrega recibe menos puntaje.

La lógica es simple:

- GitHub = mejor evidencia de trabajo profesional;
- comprimido ordenado = aceptable;
- envío suelto o desordenado = menos puntaje en la parte de entrega.

### Cómo impacta en la rúbrica

Dentro del tramo de `5 puntos` de orden y entrega, una referencia razonable podría ser:

- `5 puntos`: repo de GitHub claro y bien entregado;
- `3 puntos`: `.zip` o `.rar` ordenado y completo;
- `1 o 2 puntos`: envío suelto por WhatsApp o correo, pero todavía usable;
- `0 puntos`: entrega incompleta, desordenada o difícil de abrir.

## Idea final de la evaluación

La evaluación busca algo más que “hacer una página”.

Busca que puedas demostrar, al menos en nivel inicial, que ya eres capaz de:

- construir una interfaz estática con HTML y CSS;
- usar estructura semántica;
- pensar responsive;
- organizar mejor tu CSS;
- apoyarte en Codex sin perder criterio;
- y entregar el trabajo con una lógica más cercana a un flujo real.

---

# Cómo Pedirle a Codex la Primera Versión

Una vez que ya tienes:

- una idea clara del sitio;
- una estructura mínima del proyecto;
- y un `AGENTS.md` razonable;

recién conviene pedirle a Codex la primera versión.

Aquí el error más común es pedir demasiado poco o demasiado vago.

## Qué no conviene hacer

No conviene arrancar con algo como:

> “hazme una página bonita”

o

> “crea una landing”

Eso deja demasiadas cosas sin definir y obliga al agente a adivinar:

- qué tipo de página quieres;
- para qué tema será;
- qué secciones debe incluir;
- qué estilo usar;
- qué restricciones respetar;
- y qué nivel de calidad esperas.

Cuando el prompt está así de abierto, la primera versión puede salir muy genérica.

## Qué conviene hacer

Conviene pedir una primera versión con:

- propósito del sitio;
- tipo de proyecto;
- secciones mínimas;
- restricciones técnicas;
- y criterio visual básico.

Un ejemplo útil para esta evaluación podría ser:

```text
Quiero construir una landing page estática para un servicio técnico ficticio de reparación de notebooks.

Necesito que trabajes sobre este proyecto usando solo HTML y CSS.

Requisitos:
- usar solo index.html y styles.css;
- no usar JavaScript;
- no usar frameworks;
- mantener estructura semántica;
- usar enfoque mobile-first;
- incluir hero, beneficios, tres cards de servicios, bloque de contacto y footer;
- usar variables CSS para color, spacing y radios;
- cuidar contraste y legibilidad;
- dejar una primera versión responsive y ordenada.

Primero crea una versión base clara y funcional. No llenes el proyecto de archivos innecesarios.
```

Ese prompt ya le da a Codex bastante más contexto y reduce la improvisación.

## Qué esperar de la primera respuesta

La primera versión no tiene por qué quedar perfecta. Su función es darte una base útil para iterar.

Una buena primera respuesta debería ayudarte a conseguir:

- estructura inicial del HTML;
- primera organización del CSS;
- layout base razonable;
- y una interfaz ya visible sobre la cual corregir.

No deberías esperar que en la primera pasada queden perfectos:

- los textos;
- el detalle responsive;
- la jerarquía visual fina;
- ni el refinamiento de los componentes.

Eso viene después.

## Cómo iterar después de la primera versión

Una vez que ya existe una base, el trabajo mejora mucho cuando empiezas a pedir cambios más específicos.

Por ejemplo, después de la primera versión puedes pedir:

- mejorar la hero section;
- refinar las cards;
- ajustar spacing y jerarquía;
- mejorar la versión móvil;
- corregir semántica;
- o centralizar tokens en `:root`.

Ejemplos de pedidos buenos:

```text
Ahora mejora la hero section para que tenga más jerarquía visual y se vea mejor en celular.
```

```text
Revisa el HTML y mejora la semántica sin cambiar la estructura general del sitio.
```

```text
Refactoriza el CSS para dejar colores, spacing y radios como variables en :root.
```

```text
Haz una pasada de responsive para que las cards y el bloque de contacto se lean mejor en pantallas pequeñas.
```

Esa forma de iterar es mucho mejor que volver a pedir la página completa desde cero.

## Cómo revisar la respuesta antes de seguir

Cada vez que Codex haga un cambio importante, conviene revisar tres cosas:

### 1. El código

Mirar:

- si el HTML se entiende;
- si el CSS quedó ordenado;
- si no inventó cosas innecesarias;
- y si sigue respetando las reglas del proyecto.

### 2. La página en el navegador

Abrir la página y revisar:

- si se ve bien;
- si el contenido principal destaca;
- si el layout funciona;
- y si la versión móvil sigue teniendo sentido.

### 3. La consigna

Volver a comparar el resultado con la evaluación:

- ¿sí tiene estructura semántica?
- ¿sí está usando tokens?
- ¿sí se adapta al celular?
- ¿sí se siente como una interfaz cuidada?

Si no se revisa esto, es muy fácil aceptar cambios que “parecen buenos” pero no ayudan realmente a subir el proyecto.

## La lógica correcta de iteración

La secuencia recomendada sería esta:

1. pedir una base funcional;
2. revisar el HTML;
3. revisar el CSS;
4. abrir la página;
5. ajustar secciones concretas;
6. revisar responsive;
7. corregir accesibilidad básica;
8. y recién después hacer el pulido visual final.

La idea importante es esta:

> no se le pide a Codex una obra terminada; se trabaja con él por iteraciones cada vez más claras.

---
