# Guion - Charla IA, desarrollo web y Power BI

## 1. Apertura

```text
Hoy no vamos a partir con una definición larga de inteligencia artificial.

Vamos a hacer algo más concreto.

Vamos a tomar una idea de negocio y vamos a mirar cómo podría transformarse en un producto digital:
primero como diseño,
después como página web,
luego como catálogo de artistas y formulario de reservas,
y finalmente como datos que se pueden analizar en Power BI.
```

```text
La presentación será el mapa.
Las demos serán el recorrido real.
```

```text
La idea no es memorizar nombres de herramientas.

La idea es ver una cadena completa:
una idea se puede diseñar,
se puede programar,
puede capturar datos
y esos datos pueden servir para tomar decisiones.
```

---

## 1.1 Presentación breve

```text
Antes de partir, les cuento brevemente desde dónde les voy a hablar.

Soy Diego Obando.
Trabajo en desarrollo de software desde 2018, principalmente en backend, APIs, automatización e inteligencia artificial aplicada.

También trabajo con agentes, herramientas de IA, código y docencia en AIEP.

La idea no es que esta charla se trate de mí.
La idea es que sepan que lo que vamos a ver no es una opinión suelta sobre tecnología.
Es una forma real de trabajar: pensar una idea, diseñarla, construirla, probarla y leer los datos que produce.
```

---

## 2. Caso de la charla

```text
Imaginemos que tenemos que lanzar la presencia digital de un studio de tatuajes.

No queremos solo una imagen bonita para Instagram.
Queremos algo que parezca un negocio real:
una landing,
un catálogo de artistas,
una forma de reservar,
datos de esas reservas
y después una forma de entender qué está pasando.
```

```text
El caso se llama Ink Pulse Studio.

Es ficticio, pero la necesidad es real:
mostrar identidad,
mostrar artistas disponibles,
recibir solicitudes,
ordenar información
y decidir con datos.
```

---

## 3. Antes vs ahora

```text
Antes, para llegar a una primera versión, muchas etapas se sentían separadas:
idea por un lado,
diseño por otro,
código por otro,
planillas por otro,
reportes por otro.

Hoy podemos prototipar una cadena más conectada.
```

```text
No significa que todo quede perfecto automáticamente.

Significa que podemos llegar antes a algo visible, conversable y mejorable.
```

---

## 3.1 Herramientas de la charla

```text
Vamos a usar tres herramientas con roles distintos.

Stitch nos ayuda a pasar desde una idea escrita a una primera interfaz visual.

Codex, de OpenAI, nos ayuda a convertir esa dirección visual en archivos reales: HTML, CSS y JavaScript.

Power BI nos ayuda a mirar los datos que produce la web y convertirlos en una lectura de negocio.
```

```text
La clave no está en usar una herramienta por moda.

La clave está en conectarlas:
idea,
diseño,
web,
formulario,
datos,
dashboard
y decisión.
```

---

## 4. Producto mínimo

```text
La landing no será solo una página bonita.

Tendrá cuatro capas:
primero presenta la marca,
después muestra artistas,
luego invita a reservar,
luego convierte esa reserva en datos,
y finalmente esos datos pueden alimentar un dashboard.
```

```text
Piensen en una persona que llega desde Instagram o TikTok.

Primero visita.
Después explora.
Luego decide reservar.
Elige con qué artista quiere tatuarse.
Al completar el formulario, deja datos.
Y esos datos pueden ayudar al negocio a tomar mejores decisiones.
```

---

## 5. Formulario y datos

```text
Estos campos no están puestos al azar.

El estilo del tatuaje, la zona del cuerpo, el tamaño, el presupuesto, el horario preferido y el artista elegido le dicen algo al negocio.

Una reserva aislada es solo una solicitud.
Pero muchas reservas juntas muestran patrones.
```

```text
Con esos datos podríamos preguntar:
qué estilo se pide más,
cuánto presupuesto declaran los clientes,
qué horarios tienen más demanda,
qué artistas reciben más solicitudes,
cuántas solicitudes están pendientes
y qué deberíamos destacar más en la landing.
```

---

## 6. Transición a Stitch

```text
Ya tenemos el caso.
Ya sabemos qué debe resolver.

Ahora viene el primer salto:
vamos a pedirle a una herramienta de IA que imagine una landing para este negocio.
```

```text
Este no será un prompt de una línea.

Cuando queremos una buena salida, conviene escribir como si estuviéramos entregando un brief de diseño:
qué negocio es,
para quién es,
qué debe transmitir,
qué secciones necesita,
qué acción queremos lograr
y qué cosas queremos evitar.
```

---

## 7. Bloque Stitch

```text
Stitch nos sirve para pasar desde una intención a una interfaz.

La entrada no es código.
La entrada es una descripción clara del producto que queremos construir.

La salida no será el producto final.
La salida será una primera propuesta visual para revisar, discutir y mejorar.
```

```text
La clave es esta:
no vamos a pedir una pantalla bonita.

Vamos a pedir una landing que cumpla una acción:
lograr que una persona quiera reservar una hora.
```

```text
Por eso el prompt tiene que funcionar como un brief de diseño.

Debe decir qué negocio es,
qué público tiene,
qué debe transmitir,
qué secciones necesita,
qué acción debe provocar
y qué cosas debe evitar.
```

```text
Si el prompt es genérico, la interfaz será genérica.

Si el brief es claro, la herramienta tiene más contexto para proponer algo con dirección.
```

---

## 8. Antes de pegar el prompt

```text
Ahora voy a pegar un prompt largo.

No es largo por adorno.
Es largo porque le estamos dando contexto.

Esto se parece más a encargar un diseño profesional que a pedirle a una IA que improvise.
```

```text
Fíjense en la estructura:
primero contexto,
después objetivo,
después público,
después estética,
después secciones,
después formulario
y al final criterios de diseño.
```

---

## 9. Prompt para Stitch

```text
Diseña una landing page completa, moderna y visualmente potente para un studio de tatuajes ficticio llamado Ink Pulse Studio.

Contexto del negocio:
Ink Pulse Studio es un studio de tatuajes urbano, contemporáneo y profesional. Quiere atraer a jóvenes y adultos que buscan reservar una hora para tatuarse, revisar estilos disponibles y sentir confianza antes de contactar al studio.

Objetivo principal de la landing:
Conseguir que una persona interesada revise artistas, elija con quién quiere tatuarse y complete un formulario de solicitud de reserva.

Público objetivo:
Personas jóvenes y adultas, especialmente entre 18 y 35 años, interesadas en tatuajes con estética cuidada, experiencia personalizada, artistas especializados y reserva online simple.

Personalidad visual:
- moderna;
- urbana;
- artística;
- premium sin sentirse lujosa en exceso;
- cercana a cultura visual joven;
- con energía de estudio creativo;
- con buen contraste;
- con sensación de marca real, no plantilla genérica.

Estilo visual sugerido:
Usa una estética de alto impacto, con fotografías grandes, contraste fuerte, tipografía protagonista, cards limpias, secciones bien separadas y una composición que se sienta como el sitio de un negocio real.

Evita que parezca una página corporativa aburrida, una plantilla genérica o una página demasiado infantil.

Estructura obligatoria de la landing:

1. Hero principal:
- nombre Ink Pulse Studio;
- frase principal breve y potente;
- bajada que explique que el studio trabaja tatuajes personalizados y reservas online;
- botón principal: Reservar hora;
- botón secundario: Ver estilos;
- imagen o fondo visual relacionado con tattoo studio, arte urbano o proceso creativo.

2. Sección de propuesta de valor:
Explica en 3 bloques por qué elegir el studio:
- diseño personalizado;
- artistas especializados;
- reserva simple y acompañamiento.

3. Sección de estilos de tatuaje:
Muestra cards para estos estilos:
- fine line;
- blackwork;
- tradicional;
- minimalista;
- lettering;
- geométrico.

Cada card debe tener un nombre, una descripción breve y un aspecto visual distinto.

4. Sección de artistas:
Crea una sección tipo marketplace de artistas del studio.
Debe mostrar al menos 4 artistas ficticios con:
- nombre artístico;
- especialidad;
- breve descripción;
- estilos que domina;
- disponibilidad aproximada;
- botón o acción para elegir artista.

La sección debe sentirse como un catálogo atractivo donde el cliente puede comparar artistas antes de reservar.

5. Sección de galería:
Crea una galería visual tipo portfolio con trabajos destacados o referencias de estilo.
Debe sentirse como una vitrina visual atractiva, no como una lista plana.

6. Sección de proceso:
Explica el flujo para reservar:
- eliges artista;
- eliges estilo;
- cuentas tu idea;
- el equipo revisa tu solicitud;
- coordinan fecha y presupuesto.

7. Formulario de solicitud de reserva:
Debe verse claro, confiable y fácil de completar.
Incluye estos campos:
- nombre;
- Instagram o WhatsApp;
- artista preferido;
- estilo de tatuaje;
- zona del cuerpo;
- tamaño aproximado;
- presupuesto estimado;
- fecha tentativa;
- horario preferido;
- mensaje adicional.

Incluye un botón de envío claro:
Solicitar reserva.

8. Sección final:
Incluye una llamada final a reservar, contacto ficticio y redes sociales.

Criterios de diseño:
- jerarquía visual muy clara;
- buen uso del espacio;
- contraste alto;
- botones visibles;
- secciones fáciles de recorrer;
- formulario protagonista;
- catálogo de artistas visible;
- diseño responsive;
- apariencia profesional;
- nada de bloques enormes de texto.

Contenido textual:
Escribe los textos de la landing en español de Chile, con tono moderno, directo y profesional.

Resultado esperado:
La landing debe verse como una propuesta seria para un negocio real y debe dejar claro que el objetivo principal es convertir visitantes en solicitudes de reserva.
```

---

## 10. Mientras genera

```text
Fíjense que no le pedimos solamente "haz una página bonita".

Le dimos un brief.

Eso cambia el resultado, porque la herramienta tiene más contexto para decidir estructura, tono, secciones y acción principal.
```

```text
Lo que queremos ver ahora es si la herramienta entendió tres cosas:

primero, que es un studio de tatuajes;
segundo, que la página debe sentirse moderna y urbana;
tercero, que hay artistas para elegir;
y cuarto, que el objetivo principal es reservar.
```

---

## 11. Revisión del resultado

```text
Lo primero que revisaría es:
¿se entiende el negocio?
¿se ve el botón de reserva?
¿se entiende que puedo elegir artista?
¿el formulario aparece como parte importante?
¿la estética calza con un studio de tatuajes?
¿parece algo que podríamos convertir en web?
```

```text
También miraría si la landing tiene una estructura clara:
hero,
secciones de valor,
estilos,
galería,
proceso
y formulario.
```

```text
Si algo no aparece bien, no significa que la herramienta falló completamente.

Significa que podemos ajustar el brief, pedir una versión más enfocada o tomar la parte que sirve y mejorarla después.
```

```text
Esta todavía no es la página final.

Pero ya pasamos de una idea escrita a una interfaz visual.

Ahora el siguiente paso será convertir esa propuesta en una landing programada.
```

---

## 12. Transición a Codex

```text
Hasta aquí tenemos dirección visual.

Tenemos una idea de marca,
una estructura de landing,
un formulario pensado para reservas
y una estética que podemos usar como referencia.
```

```text
Pero una maqueta no recibe datos.

Una imagen no guarda reservas.

Para eso necesitamos convertir esta propuesta en una web real.
```

```text
Ahora pasamos al segundo salto:
usar Codex para transformar esta idea visual en HTML, CSS, JavaScript y un formulario funcional.
```

---

## 13. Frase guía

```text
Esto no es solo usar una herramienta.

Esto es aprender a conectar herramientas para construir soluciones.
```

## 16. Codex a web funcional

```text
Ahora el diseño deja de ser solo una referencia visual.

Le vamos a pedir a Codex una versión controlada:
una landing,
una sección de artistas,
un formulario,
estilos,
interacción básica
y una salida que podamos revisar en navegador.
```

```text
La diferencia importante es esta:
no le pedimos "hazme una página".

Le damos estructura, comportamiento esperado y límites.

Mientras más claro es el encargo, menos improvisada es la salida.
```

```text
Antes de seguir, revisaría cuatro cosas:
si carga bien,
si la landing se entiende,
si el usuario puede elegir artista,
si el formulario produce datos que después podamos analizar.
```

---

## 17. Power BI a nivel concepto

```text
Power BI es una herramienta de inteligencia de negocios.

Eso significa que no sirve solo para hacer gráficos bonitos.

Sirve para conectar datos, ordenarlos, modelarlos, visualizarlos y transformarlos en preguntas de negocio.
```

```text
¿Por qué existe una herramienta como Power BI?

Porque en los negocios normalmente los datos existen, pero están repartidos.

Puede haber reservas en formularios, mensajes de WhatsApp, planillas, correos, sistemas internos o ventas registradas en distintos lugares.

El problema no es solo tener datos.
El problema es poder leerlos rápido y convertirlos en una señal clara para decidir.
```

```text
Power BI cubre esa necesidad:
tomar datos que vienen de distintas fuentes,
prepararlos,
ordenarlos,
crear visualizaciones
y compartir una lectura del negocio.

En simple: ayuda a pasar de "tengo una tabla" a "entiendo qué está pasando".
```

```text
Una forma fácil de entenderlo es pensar en cuatro pasos:

primero conectar datos;
después prepararlos;
después visualizarlos;
y finalmente usarlos para decidir.

La herramienta no decide por nosotros.
Pero hace visible información que antes podía estar escondida.
```

```text
En este caso, cada reserva puede convertirse en una fila de datos.

Una fila aislada dice poco.
Muchas filas juntas empiezan a mostrar patrones:
qué estilo se pide más,
qué artista recibe más solicitudes,
cuánto presupuesto declaran los clientes,
qué solicitudes están pendientes
y qué parte del negocio conviene reforzar.
```

```text
La gracia de Power BI es que permite pasar de "tengo una tabla" a "puedo leer qué está pasando".

Ese salto es muy importante en cualquier negocio digital.
```

```text
Lo importante es que esto no sirve solo para tatuajes.

La misma lógica se puede usar en ventas, asistencia, inventario, agenda, clientes, marketing, encuestas, operaciones o reportes internos.

Siempre que una actividad genera datos, existe la posibilidad de analizarlos para entender mejor qué está ocurriendo.
```

---

## 18. Dashboard

```text
El dashboard no decide por nosotros.

El dashboard muestra señales.

Nos puede mostrar si un artista está recibiendo más demanda,
si cierto estilo tiene más interés,
si los presupuestos son bajos o altos,
o si muchas solicitudes quedan pendientes.
```

```text
La decisión sigue siendo humana.

Pero ahora la decisión no parte desde una corazonada.
Parte desde datos visibles.
```

---

## 19. Cierre

```text
Hoy hicimos una cadena completa.

Partimos con una idea.
La convertimos en una propuesta visual.
La llevamos a una web.
Le agregamos artistas y reservas.
Transformamos esas reservas en datos.
Y usamos Power BI para leer el negocio.
```

```text
Eso es desarrollo moderno:
crear,
construir,
medir
y mejorar.
```

```text
Programar no es solo escribir código.

También es entender problemas,
diseñar experiencias,
usar herramientas,
ordenar datos
y tomar mejores decisiones.
```

```text
Si ustedes pudieran crear una solución así,
¿para qué negocio la harían?

Una barbería.
Una cafetería.
Un gimnasio.
Una tienda.
Un emprendimiento propio.

La próxima app puede ser de ustedes.
```
