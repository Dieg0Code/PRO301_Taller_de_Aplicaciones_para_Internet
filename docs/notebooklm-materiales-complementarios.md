# NotebookLM para Infografías y Podcasts

## Propósito

Después de cerrar el `README.md` y el `PPT` de una clase, conviene preparar dos artefactos complementarios en NotebookLM:

- una `infografía`, para resumir visualmente el mapa de la clase;
- y un `podcast` o `resumen de audio`, para repaso, prelectura o motivación.

Estos materiales no reemplazan el deck ni el README. Su función es:

- reforzar comprensión;
- facilitar repaso;
- abrir conversación antes de una clase;
- y dar otra puerta de entrada al mismo contenido.

## Orden recomendado dentro del flujo

1. Cerrar `README.md`.
2. Cerrar `PPT`.
3. Revisar coherencia general de la clase.
4. Preparar prompt de `infografía`.
5. Preparar prompt de `podcast`.

No conviene diseñar estos materiales cuando la clase todavía está inestable.

## Estructura esperada dentro de cada clase

Cuando estos materiales se generen, usar como estándar esta estructura dentro de la carpeta de la clase:

```text
clases/semana-XX/YY/
├── README.md
├── ppt/
├── infografia/
└── podcast/
```

Regla práctica:

- `infografia/`: guardar la pieza final exportada.
- `podcast/`: guardar el audio final exportado.

No usar estas carpetas para acumular borradores descartados, exportaciones repetidas o archivos auxiliares sin valor pedagógico.

## Regla general

- `README`: estructura y profundidad.
- `PPT`: conducción de clase.
- `Infografía`: mapa visual rápido.
- `Podcast`: repaso, prelectura o síntesis conversada.

## Infografía

### Cuándo usarla

La infografía funciona especialmente bien en clases:

- fundacionales;
- de mapa conceptual;
- de procesos;
- de comparación;
- o de arquitectura general.

### Objetivo

Debe permitir que un estudiante entienda:

- cuáles son las ideas centrales;
- cómo se conectan;
- y qué vocabulario técnico importa.

### Reglas

- una sola página;
- jerarquía visual clara;
- pocas ideas por bloque;
- foco en relaciones, no en párrafos largos;
- tono visual serio, técnico y coherente con el módulo;
- evitar estilo infantil o caricaturesco si el resultado pierde seriedad técnica.

### Relación con la identidad AIEP

La identidad visual AIEP debe aplicarse de forma estricta en el `PPT`, porque ese deck funciona como material principal de clase del repositorio.

En cambio, las infografías generadas con NotebookLM pueden tener una relación más flexible con esa identidad. En la práctica:

- conviene orientarlas hacia una estética técnica, limpia, sobria y profesional;
- se puede usar AIEP como referencia de tono y color general;
- pero no exigir coincidencia exacta con el sistema visual del deck si la herramienta no responde con precisión al prompt;
- una infografía complementaria puede darse por buena aunque no calce exactamente con la identidad AIEP, siempre que siga siendo clara, útil y seria.

Regla práctica:

- `PPT`: identidad AIEP estricta;
- `Infografía NotebookLM`: coherencia temática y tono técnico, sin exigir calce visual exacto.

### Selección de estilo visual en NotebookLM

Cuando NotebookLM ofrezca estilos visuales predefinidos para infografía, elegirlos con criterio pedagógico y no solo por gusto visual.

Usar por defecto esta jerarquía:

- `Instructivo`: primera opción para la mayoría de las clases técnicas del módulo.
- `Profesional`: buena opción cuando se quiera una pieza más sobria y ejecutiva.
- `Científico`: útil para clases con más estructura, modelos, flujos o explicaciones técnicas duras.
- `Editorial`: útil para clases fundacionales, conceptuales o de narrativa técnica más amplia.
- `Cuadrícula bento`: útil cuando la clase se organiza naturalmente en módulos, tableros o bloques paralelos.

Usarlos con esta lógica:

- fundamentos, arquitectura, mapa general:
  `Editorial` o `Instructivo`
- procesos, herramientas, flujos, secuencias:
  `Instructivo`
- clases con más estructura técnica, diagramas, DOM, datos o relaciones formales:
  `Científico`
- clases más modulares o comparativas:
  `Cuadrícula bento`
- piezas más formales o de circulación amplia:
  `Profesional`

Evitar por defecto en este repositorio, salvo caso muy justificado:

- `Kawaii`
- `Anime`
- `Arcilla`
- `Ladrillos`
- `Boceto`

Esos estilos pueden resultar simpáticos, pero normalmente debilitan el tono técnico o vuelven el material demasiado lúdico para el tipo de cohorte.

Regla práctica final:

- si hay duda, elegir `Instructivo`;
- si la clase es más conceptual, probar `Editorial`;
- si la clase es más técnica y estructural, probar `Científico`.

### Prompt base para infografía

```text
Crea una infografía en español con estética técnica, sobria y profesional, idealmente inspirada en AIEP Chile. Usa como referencia una paleta con azul institucional profundo (#082B5C) como color dominante, rojo AIEP (#D62027) como acento y fondo claro cálido (#F5F2EC), con blanco y gris azulado para equilibrio (#FFFFFF, #5F6B7A). Si la herramienta no sigue estos colores de forma exacta, prioriza de todos modos claridad, jerarquía visual y seriedad técnica.

El diseño debe verse profesional, moderno y elegante, no infantil ni decorativo. Usa bloques geométricos limpios, alto contraste, títulos fuertes, buena jerarquía visual y espacio en blanco. Si agregas elementos gráficos, que recuerden barras o módulos verticales como el lenguaje visual del logo AIEP. Evita estilos caricaturescos, colores chillones o estética startup genérica.

La infografía resume una clase técnica para estudiantes de Técnico de Nivel Superior en Programación y Análisis de Sistemas. Prioriza claridad pedagógica, lectura rápida, vocabulario técnico real y conexión entre conceptos.
```

### Cómo adaptar el prompt

- clase fundacional:
  pedir “mapa conceptual”, “fundamentos”, “recorrido general”.
- clase comparativa:
  pedir “contraste”, “antes/después”, “cuándo usar cada opción”.
- clase de proceso:
  pedir “flujo”, “etapas”, “cadena”, “relación entre actores”.
- clase técnica visual:
  pedir “paneles”, “módulos”, “diagramas”, “jerarquía estructural”.

## Podcast o resumen de audio

### Para qué sirve

El audio sirve mejor cuando queremos:

- motivar antes de una clase;
- reforzar después de clase;
- repasar ideas complejas;
- o entregar una versión más conversada del contenido.

### Idioma y tono

- idioma: `español`
- tono: docente, técnico, claro y cercano
- evitar exageración, humor forzado o tono de publicidad

### Formato recomendado según la clase

- `Información detallada`
  Úsalo por defecto en clases fundacionales, conceptuales o de recorrido técnico.
- `Breve`
  Úsalo para cápsulas cortas previas a clase, recordatorios o repasos rápidos.
- `Crítica`
  Úsalo para revisión interna del material, no como primera opción para estudiantes.
- `Debate`
  Úsalo en clases con comparaciones fuertes o enfoques que convenga contrastar.

### Regla práctica de selección

- fundamentos, arquitectura, procesos:
  `Información detallada`
- comparativas claras:
  `Debate`
- activación o recordatorio:
  `Breve`
- control de calidad del material:
  `Crítica`

### Duración recomendada

- `Corto`
  para cápsulas previas, WhatsApp o repaso rápido.
- `Predeterminada`
  para el podcast principal de la clase.

## Prompt base para podcast

```text
Genera un resumen de audio en español para estudiantes de Técnico de Nivel Superior en Programación y Análisis de Sistemas del IP AIEP de Chile.

Quiero un tono docente, técnico, claro y cercano, sin sonar infantil ni exageradamente formal. El episodio debe ayudar a comprender la clase, no solo resumirla.

Prioriza:
- claridad conceptual;
- vocabulario técnico real;
- ejemplos concretos;
- conexiones entre ideas;
- una progresión que ayude a construir criterio técnico.

Evita:
- frases demasiado genéricas;
- entusiasmo vacío;
- comentarios meta sobre el material;
- sonar como publicidad o como lectura mecánica.

Haz que los presentadores expliquen los conceptos como si estuvieran ayudando a estudiantes que recién están entrando al desarrollo web, pero respetando su inteligencia.

Cierra con una síntesis breve de las ideas más importantes y por qué esto importa para trabajar como desarrolladores.
```

## Plantillas de adaptación para podcast

### 1. Clase fundacional

```text
Enfóquenlo como una introducción seria a los fundamentos del tema. Conecten conceptos, actores, recorridos y vocabulario técnico básico sin simplificar demasiado.
```

### 2. Clase comparativa

```text
Hagan explícitas las diferencias entre los conceptos comparados, qué gana y qué pierde cada opción, y en qué situaciones conviene pensar una u otra.
```

### 3. Clase previa o activación

```text
Enfóquenlo como una invitación a entrar al tema, despertar curiosidad y dejar dos o tres ideas instaladas antes de la sesión.
```

### 4. Clase de repaso

```text
Enfóquenlo como consolidación: sinteticen las ideas centrales, corrijan posibles confusiones y destaquen qué parte del contenido vale más la pena retener.
```

## Prompt modelo para clase fundacional de Web

```text
Genera un resumen de audio en español, con tono docente, técnico y claro, para estudiantes de Técnico de Nivel Superior en Programación y Análisis de Sistemas del IP AIEP de Chile.

Quiero que los presentadores expliquen la clase como una introducción seria a los fundamentos de la Web. Deben conectar estas ideas:
- qué pasa cuando escribimos una URL;
- diferencia entre Internet y Web;
- actores principales: usuario, navegador, cliente, servidor y aplicación;
- lógica cliente-servidor;
- HTTP y DNS como piezas del recorrido;
- dominio, hosting y despliegue;
- seguridad básica al publicar, incluyendo HTTP vs HTTPS y cuidado de credenciales.

El episodio debe ayudar a que los estudiantes entiendan que la Web no es magia, sino un sistema técnico con varias capas conectadas.

Usen ejemplos concretos y cotidianos, pero explicados con criterio técnico. Eviten sonar infantiles o demasiado superficiales. No hagan bromas excesivas ni comentarios meta sobre estas fuentes.

La conversación debe dejar instalada una idea central: desarrollar para la Web implica comprender cómo viaja una solicitud, dónde vive una aplicación y qué responsabilidades aparecen al publicarla.
```

## Criterio de calidad

Antes de dar por bueno un prompt de NotebookLM, revisar:

- ¿el tono suena técnico y docente?
- ¿el público objetivo está explícito?
- ¿la salida sirve para estudiantes y no para expertos?
- ¿el prompt evita tono marketinero o escolarizado?
- ¿la pieza complementa la clase en vez de repetirla sin criterio?
