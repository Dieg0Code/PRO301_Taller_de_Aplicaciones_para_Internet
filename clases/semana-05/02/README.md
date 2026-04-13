# Clase 02 - Semana 05 - Persistencia y Modelado de Datos: El Esqueleto de la Información

- Unidad 02: Frontend Moderno, APIs y Legado
- Fecha: Martes 14 de abril de 2026
- Duración: 3 horas (10:50 - 13:10)
- Modalidad: Presencial en Laboratorio PC
- Docente: Diego Obando

---

# Objetivos de la Clase

## Objetivo General

Al terminar esta clase, el estudiante será capaz de diseñar modelos de datos coherentes y escalables, identificando las entidades fundamentales de un negocio y las relaciones que las conectan, utilizando **PostgreSQL (vía Supabase)** como plataforma para materializar diseños lógicos en tablas reales.

## Objetivos Específicos

1.  **Diferenciar entre memoria volátil y persistencia**, comprendiendo por qué las bases de datos son el componente central de cualquier aplicación backend.
2.  **Identificar Entidades, Atributos y Primary Keys** en un dominio de negocio real, estableciendo la identidad única de la información.
3.  **Modelar Relaciones y Cardinalidad** (1:1, 1:N, N:M), utilizando llaves foráneas para conectar datos de forma íntegra.
4.  **Diseñar Diagramas Entidad-Relación (DER) básicos**, visualizando la estructura de datos antes de su implementación.
5.  **Reconocer a Supabase como una plataforma de PostgreSQL gestionado**, entendiendo cómo transformar un modelo conceptual en una tabla física lista para ser consumida.

## Competencias Transversales

- **Abstracción Analítica:** capacidad de ver un proceso de negocio y transformarlo en una estructura de datos lógica.
- **Integridad de Información:** comprender que un error en el diseño del modelo de datos puede corromper la operación de toda una empresa.
- **Eficiencia en el Despliegue:** valorar el uso de herramientas *Cloud-Native* (como Supabase) para acelerar el desarrollo de prototipos funcionales sin sacrificar el estándar técnico (Postgres).
- **Uso Crítico de Agentes:** apoyarse en la IA para proponer esquemas de base de datos, validando manualmente que la cardinalidad refleje las reglas de negocio reales.

---

# Introducción de la Clase

- **Duración:** 10 minutos
- **Propósito del encuadre:** instalar por qué persistencia y modelado de datos son parte central del backend moderno, y anticipar el recorrido técnico de la sesión.

## Apertura

En la clase anterior vimos backend, rutas, JSON, reglas de negocio y separación por capas. Hoy damos un paso que vuelve todo eso realmente útil: entender **dónde vive la información** y cómo se diseña para que no se rompa cuando la aplicación crece.

Una aplicación puede tener una interfaz correcta, endpoints bien nombrados y lógica funcionando en apariencia, pero seguir siendo frágil si no sabe persistir datos ni modelarlos con criterio.

Vale la pena abrir esta clase con una pregunta directa:

> ¿de qué sirve un sistema de ventas, una app de reservas o un formulario de registro si cada reinicio borra pedidos, usuarios o historial?

La persistencia no es un detalle técnico secundario. Es la base que permite que una aplicación:

- recuerde información después de cerrar el navegador o reiniciar el servidor;
- comparta datos entre varios usuarios;
- mantenga historial, consistencia y trazabilidad;
- y sostenga reglas de negocio reales sobre información confiable.

## Mapa de la sesión

Durante esta clase trabajaremos una progresión concreta:

1. entender la diferencia entre memoria volátil y persistencia;
2. reconocer entidades, atributos y claves primarias;
3. modelar relaciones y cardinalidad entre tablas;
4. y cerrar materializando ese diseño en PostgreSQL mediante Supabase.

No partiremos creando tablas por intuición. Primero vamos a pensar el problema como desarrolladores:

- qué información necesita vivir más allá del reinicio;
- qué objetos del negocio realmente existen;
- cómo se identifican sin ambigüedad;
- y cómo se conectan entre sí.

## Preguntas de activación

- ¿Qué datos de una aplicación deberían seguir existiendo mañana aunque hoy se apague el servidor?
- ¿Qué diferencia hay entre guardar algo “para usarlo ahora” y guardarlo “para que el sistema lo recuerde”?
- Si un negocio tiene clientes, productos y pedidos, ¿qué parte de esa información debería modelarse antes de escribir código SQL?

## Huella metodológica IA/agentes

En esta clase el agente puede servir como apoyo para proponer un primer borrador de entidades o atributos, pero solo si recibe contexto suficiente. Pedir algo como “hazme la base de datos de una tienda” suele producir respuestas genéricas. Trabajar mejor significa explicitar intención, dominio, restricciones y reglas del negocio antes de pedir ayuda.

Lo importante no es que el agente entregue una lista plausible de tablas. Lo importante es que el estudiante aprenda a revisar si ese diseño representa el sistema real, si evita ambigüedades y si la estructura propuesta permite crecer sin contradicciones.

## Puente hacia el bloque 1

Antes de hablar de relaciones, diagramas o Supabase, necesitamos instalar una diferencia básica pero decisiva: una cosa es procesar datos en memoria y otra muy distinta es construir un sistema capaz de recordarlos.

---

# BLOQUE 1: De la Memoria Volátil a la Persistencia

- **Duración:** 35 minutos
- **Objetivo del bloque:** comprender la diferencia técnica entre almacenamiento temporal y persistencia, conectando esa distinción con el reconocimiento de entidades, atributos y claves primarias dentro de un dominio real.
- **Modalidad:** expositiva, dialogada y con análisis guiado de casos de uso.

## Desarrollo

### 1.1 Una aplicación puede funcionar y aun así perder toda su memoria

En etapas tempranas del curso ya usamos estructuras temporales para guardar información:

- una lista en Python;
- un objeto en JavaScript;
- un `useState` en React;
- o incluso variables cargadas solo mientras el programa está corriendo.

Eso está bien para aprender lógica o probar un flujo inicial, pero tiene un límite muy duro:

> si el proceso se reinicia, la información desaparece.

Aquí conviene instalar una diferencia operativa:

- **memoria volátil** es la que sirve para procesar el dato mientras la aplicación está viva;
- **persistencia** es la que permite que ese dato siga existiendo después.

Una aplicación profesional no puede depender solo de memoria RAM para guardar información de negocio. Si lo hace, pierde continuidad, historial y confiabilidad.

### 1.2 Persistir no es solo “guardar”: es permitir continuidad del sistema

Cuando hablamos de persistencia, no hablamos solo de escribir algo en disco. Hablamos de convertir el dato en parte estable del sistema.

Eso permite que la aplicación:

- recupere información horas o días después;
- comparta datos entre distintos usuarios o sesiones;
- mantenga historial de pedidos, cuentas, reservas o registros;
- y aplique reglas de negocio sobre una fuente de verdad consistente.

Una forma simple de verlo es esta:

| Situación | Dato en memoria | Dato persistido |
|---|---|---|
| Se reinicia el servidor | Se pierde | Permanece |
| Otro usuario necesita verlo | No necesariamente existe | Puede consultarlo |
| Se requiere historial | No queda rastro confiable | Queda registro |
| Se quiere editar mañana | Ya no está disponible | Sigue accesible |

En backend, esta diferencia cambia por completo el tipo de sistema que estamos construyendo.

### 1.3 Del dato suelto a la entidad: empezar a modelar el negocio

Antes de abrir una base de datos o crear una tabla, hay que responder una pregunta más importante:

> ¿qué cosas del mundo real necesita recordar este sistema?

Ahí aparece el concepto de **entidad**.

Una entidad es un objeto relevante para el negocio que queremos representar en el sistema. Algunos ejemplos:

- en una tienda: `Cliente`, `Producto`, `Pedido`;
- en una plataforma académica: `Estudiante`, `Curso`, `Inscripción`;
- en un sistema de reservas: `Usuario`, `Habitación`, `Reserva`.

Cada entidad tiene **atributos**, es decir, datos que la describen.

Por ejemplo, en una tienda simple:

| Entidad | Qué representa | Atributos posibles |
|---|---|---|
| `Cliente` | Persona que compra | `id`, `nombre`, `email` |
| `Producto` | Ítem disponible para venta | `id`, `nombre`, `precio` |
| `Pedido` | Compra realizada | `id`, `fecha`, `total` |

Aquí importa subrayar una idea pedagógica clave: no todo dato merece ser entidad, y no todo detalle merece ser atributo. Modelar bien exige distinguir lo central de lo accesorio.

### 1.4 Primary Key: identidad única y operación sin ambigüedad

Una vez identificada la entidad, aparece otro problema real: ¿cómo distinguimos un registro de otro sin confundirnos?

Dos clientes pueden llamarse igual. Dos productos pueden parecer similares. Incluso un email podría cambiar con el tiempo. Por eso toda tabla necesita una forma de identificar cada fila sin ambigüedad.

La **Primary Key (PK)** cumple justamente esa función:

- identifica cada registro de forma única;
- evita confundir filas parecidas;
- permite editar, borrar y relacionar datos correctamente;
- y sirve como referencia para otras tablas.

Ejemplos posibles de clave primaria:

- un `id` numérico autoincremental;
- un `uuid`;
- un código institucional si realmente es único y estable;
- o, en ciertos contextos, un identificador natural como el RUT, siempre que el diseño y la política del sistema lo justifiquen.

Lo importante no es memorizar un único tipo de PK, sino entender el criterio:

> una buena clave primaria debe ser única, estable y útil para operar el sistema sin dudas.

### 1.5 Agentes, modelado inicial y validación humana obligatoria

En esta parte de la clase, un agente puede ser útil para acelerar una primera exploración. Por ejemplo, podría ayudar a responder algo como:

> “Propón entidades, atributos iniciales y una clave primaria razonable para un sistema de reservas de hora médica”.

Eso puede ahorrar tiempo en el borrador inicial, pero no se debe aceptar sin revisión. El estudiante igual tiene que validar:

- si las entidades propuestas representan de verdad el dominio;
- si falta alguna pieza crítica del negocio;
- si algún atributo está duplicado o mal ubicado;
- y si la clave primaria elegida es realmente única y estable.

El error típico al delegar demasiado aquí es aceptar un diseño “bonito” pero genérico, con nombres plausibles y reglas débiles. Un modelo de datos no se evalúa por sonar profesional, sino por reflejar correctamente cómo funciona el sistema real.

## Preguntas guía

- ¿Por qué una lista en memoria puede servir para una demo, pero no para una aplicación real?
- ¿Qué diferencia práctica hay entre “dato temporal” y “dato persistido” cuando un sistema tiene varios usuarios?
- ¿Cómo decides si algo debe modelarse como entidad propia o solo como un atributo dentro de otra entidad?
- ¿Qué problemas concretos aparecen si una tabla no tiene una clave primaria bien definida?

## Producto o evidencia del bloque

Al cerrar este bloque, el estudiante debería poder:

- Explicar con sus palabras por qué una aplicación profesional no puede guardar información de negocio solo en variables o estado temporal.
- Identificar al menos 3 entidades y 3 atributos por entidad en un caso simple de negocio propuesto en clase.
- Justificar una clave primaria razonable para una entidad como `Producto`, `Pedido` o `Cliente`.

## Cierre del bloque

- **Idea clave:** una aplicación seria necesita persistencia porque el dato de negocio debe sobrevivir al reinicio, a la sesión y al paso del tiempo.
- **Huella metodológica:** un agente puede proponer un primer borrador de entidades o claves, pero la validez del modelo depende de comprender el negocio y revisar manualmente el diseño.
- **Puente:** una vez entendido qué datos existen y cómo se identifican, el siguiente paso es ver cómo esas entidades se conectan entre sí mediante relaciones y cardinalidad.

---

# BLOQUE 2: Relaciones y Cardinalidad

- **Duración:** 35 minutos
- **Objetivo del bloque:** comprender cómo se conectan las entidades entre sí mediante el uso de llaves foráneas, identificando los tres tipos básicos de cardinalidad en el modelo relacional.
- **Modalidad:** análisis de casos, diagramación en pizarra y lógica de conjuntos.

## Desarrollo

### 2.1 Los Datos no están aislados
En una aplicación real, una entidad siempre se relaciona con otra.
- Un **Usuario** "crea" un **Post**.
- Un **Pedido** "contiene" un **Producto**.
- Un **Estudiante** "pertenece" a una **Sección**.

### 2.2 La Llave Foránea (Foreign Key - FK)
Es el "embajador" de una tabla en otra.
- **Concepto:** Una FK es una columna en una tabla que contiene la Primary Key de otra tabla.
- **Ejemplo:** En la tabla `Posts`, añadimos una columna `usuario_id`. Así, cada post sabe quién es su dueño sin tener que repetir todo el nombre del usuario en cada fila.

### 2.3 Tipos de Cardinalidad (¿Cuántos con cuántos?)
Es vital definir la cantidad de elementos que participan en la relación:

1.  **1:1 (Uno a Uno):** Un registro se relaciona con solo uno del otro lado.
    - *Ejemplo:* Un Ciudadano y su RUT. Un Usuario y su Perfil Privado.
2.  **1:N (Uno a Muchos):** Un registro se relaciona con muchos del otro lado, pero al revés no.
    - *Ejemplo:* Un Autor tiene muchos Libros. Un Cliente tiene muchos Pedidos. (Es la más común).
3.  **N:M (Muchos a Muchos):** Muchos de un lado con muchos del otro.
    - *Ejemplo:* Muchos Estudiantes tienen muchos Cursos.
    - **Regla Técnica:** En las bases de datos relacionales, estas requieren una "Tabla Intermedia" (Join Table).

### 2.4 Integridad Referencial
¿Qué pasa si borro a un Usuario que tiene 100 posts? La base de datos nos permite definir reglas:
- **Restringir:** No puedes borrar al usuario si tiene posts.
- **Cascada (Cascade):** Si borras al usuario, se borran automáticamente todos sus posts (limpieza total).

## Producto o evidencia del bloque
Al cerrar este bloque, el estudiante debería poder:
- Identificar el tipo de cardinalidad en 3 ejemplos de la vida real.
- Explicar el rol de la Foreign Key como conector entre dos tablas.
- Dibujar una relación 1:N indicando dónde debe ir la llave foránea (Pista: siempre va en el lado del "Muchos").

---

# BLOQUE 3: Diseño y Diagrama Entidad-Relación (DER)

- **Duración:** 35 minutos
- **Objetivo del bloque:** utilizar la simbología estándar del Diagrama Entidad-Relación para documentar y validar el diseño de una base de datos antes de su implementación física.
- **Modalidad:** taller de dibujo técnico, análisis de redundancia y normalización básica.

## Desarrollo

### 3.1 El Plano de la Casa: ¿Por qué dibujar?
Programar una base de datos sin un diagrama es como construir una casa sin planos. 
- El **DER (Diagrama Entidad-Relación)** permite ver errores de lógica antes de tocar el código.
- Ayuda a que todo el equipo (Frontend y Backend) entienda cómo se estructura la información.

### 3.2 Notación Estándar (Modelo Chen / Crow's Foot)
Aunque hay varias formas, usaremos la más común en la industria (Pata de Gallo):
- **Caja:** Representa la Entidad (ej. `USUARIO`).
- **Líneas:** Representan la relación.
- **Símbolos en extremos:** Indican si es 1 o Muchos.

### 3.3 Normalización: El arte de no repetirse
Un buen diseño debe ser eficiente.
- **Problema:** Si en la tabla `Pedidos` escribimos el nombre y dirección del cliente cada vez, y el cliente cambia de casa, tenemos que editar 100 filas.
- **Solución:** Separamos los datos. La tabla `Pedidos` solo guarda el `id_cliente`. Si el cliente cambia de casa, solo editamos UNA fila en la tabla `Clientes`. Esto es **Normalizar**.

### 3.4 Caso Práctico: Sistema de Cine
Haremos un ejercicio rápido en pizarra:
1.  **Entidades:** PELÍCULA, SALA, FUNCIÓN.
2.  **Atributos:** Título, Capacidad, Horario.
3.  **Relaciones:** Una Película tiene muchas Funciones (1:N). Una Sala tiene muchas Funciones (1:N).

## Producto o evidencia del bloque
Al cerrar este bloque, el estudiante debería poder:
- Dibujar un DER simple de 3 entidades para un sistema de ventas.
- Identificar una redundancia en un diseño de tabla y proponer cómo separarla.
- Explicar por qué la normalización ayuda a mantener la integridad de los datos.

---

# BLOQUE 4: Supabase: PostgreSQL en la nube

- **Duración:** 35 minutos
- **Objetivo del bloque:** materializar un diseño lógico en una infraestructura real utilizando Supabase, comprendiendo la relación entre el modelo conceptual y la implementación física.
- **Modalidad:** demostración en vivo, configuración de proyecto y creación de tablas.

## Desarrollo

### 4.1 ¿Qué es Supabase?
Es una plataforma que nos entrega una base de datos **PostgreSQL** lista para usar, sin tener que instalar nada en nuestro computador. 
- **Relación:** Supabase es el "envoltorio amigable" y PostgreSQL es el motor de base de datos que está debajo.

### 4.2 Del Diagrama a la Tabla
Mostraremos cómo el dibujo del Bloque 3 se convierte en realidad:
1.  **Table Editor:** La interfaz visual para crear tablas.
2.  **Columnas:** Donde definimos los atributos y sus **Tipos de Datos** (ej. `text`, `int8`, `boolean`).
3.  **PK y FK en la interfaz:** Cómo marcar una columna como Primary Key y cómo usar el selector de relaciones para crear una Foreign Key.

### 4.3 Tipos de Datos: Mapeo Conceptual
Es vital entender cómo se traduce la información:
- **Texto:** `text` o `varchar`.
- **Números:** `int8` (para IDs) o `numeric` (para precios).
- **Fechas:** `timestamp` o `date`.
- **Booleanos:** `bool`.

### 4.4 El "Superpoder" de Supabase: API Automática
Al crear una tabla en Supabase, la plataforma genera automáticamente los endpoints REST que vimos en la Clase 01. 
- **Lección:** Si diseñas bien tus tablas, Supabase te "regala" la API para consultar esos datos desde React o Python.

## Producto o evidencia del bloque
Al cerrar este bloque, el estudiante debería poder:
- Crear un proyecto en Supabase y definir una tabla con su respectiva Primary Key.
- Vincular dos tablas mediante una Foreign Key usando la interfaz visual.
- Insertar un registro de prueba y verificar que respete los tipos de datos definidos.

## Preguntas guía
- ¿Por qué Supabase nos pide elegir una región geográfica para nuestro servidor?
- ¿Qué pasa si intento insertar un texto en una columna definida como `int8`?
- ¿Cómo ayuda la interfaz de Supabase a visualizar las relaciones que dibujamos en el DER?

## Huella metodológica IA/agentes
El agente es nuestro administrador de base de datos:
- **Generación de SQL:** Pedir al agente que escriba el código SQL para crear las tablas de nuestro diagrama (útil para la pestaña SQL Editor de Supabase).
- **Traducción de Tipos:** Preguntar a la IA: "¿Cuál es el tipo de dato equivalente en PostgreSQL para un campo 'Precio con decimales' de Python?".

**Lo que tú debes validar:**
- El agente puede sugerir nombres de tablas en plural o singular mezclados. Tú **debes mantener la consistencia** (ej. todas en plural: `users`, `products`, `orders`).

## Cierre del bloque
- **Idea clave:** La teoría se vuelve práctica. Un buen modelo de datos en Supabase es el 50% de tu aplicación final.
- **Puente:** Ya tenemos datos guardados. En la próxima clase veremos cómo usar agentes de forma experta para potenciar este flujo de desarrollo.

---

# Cierre de la Clase

## Síntesis Final
- **Persistencia:** Entendimos que los datos deben vivir fuera de la RAM para ser útiles.
- **Modelado:** Aprendimos a pensar en Entidades, Atributos e Identidad (PK).
- **Relacional:** Descubrimos cómo conectar el mundo mediante llaves foráneas (FK) y cardinalidad.
- **Implementación:** Vimos cómo Supabase nos facilita la vida al entregarnos un PostgreSQL profesional en la nube.

## Preguntas de Salida
- ¿Cuál es la diferencia entre un Atributo y una Entidad?
- ¿Por qué toda tabla DEBE tener una Primary Key?
- Den un ejemplo de una relación 1:N en una aplicación de delivery.
- ¿Por qué decidimos usar Supabase en lugar de instalar PostgreSQL localmente para este proyecto?

## Próximo Paso
Mañana (Miércoles) tendremos una sesión intensiva de **IA en Desarrollo**. Aprenderemos a usar agentes para acelerar la creación de modelos, validación de reglas y generación de código crítico para el backend.
