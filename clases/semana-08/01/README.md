# Clase 01 - Semana 08 - SQL intermedio: joins, agregaciones, normalización ligera y conexión con aplicaciones

- **Unidad:** 03 · Datos, IA Aplicada y Proyecto Integrador
- **Fecha:** Lunes 04 de mayo de 2026
- **Duración:** 3 horas (10:50 - 13:10)
- **Modalidad:** Presencial en Laboratorio PC
- **Docente:** Diego Obando

---

# Objetivos de la Clase

## Objetivo General

Al finalizar esta sesión, el estudiante será capaz de construir y analizar consultas SQL intermedias que combinen datos de varias tablas, calculen resúmenes útiles para una aplicación web y respeten criterios básicos de integridad, seguridad y conexión entre backend y base de datos.

## Objetivos Específicos

1. **Comprender relaciones entre tablas**, identificando claves primarias, claves foráneas, cardinalidades básicas y riesgos de modelar datos relacionados como si fueran información aislada.
2. **Aplicar `JOIN` de forma guiada**, diferenciando casos de uso de `INNER JOIN`, `LEFT JOIN` y búsquedas de registros sin coincidencia mediante ejemplos conectados a pantallas o endpoints reales.
3. **Usar agregaciones para responder preguntas de negocio**, empleando `COUNT`, `SUM`, `AVG`, `GROUP BY` y `HAVING` para transformar filas individuales en indicadores útiles.
4. **Reconocer principios de normalización ligera**, detectando duplicación innecesaria, anomalías de actualización y separación razonable de entidades sin convertir la clase en teoría académica pesada.
5. **Vincular SQL intermedio con aplicaciones web seguras**, revisando exposición mínima de columnas, filtros por usuario autenticado, consultas parametrizadas y validación crítica de consultas propuestas por agentes de IA.

## Competencias Transversales

- **Pensamiento relacional:** leer la base de datos como un conjunto de entidades conectadas, no como tablas sueltas sin contexto.
- **Criterio de datos para aplicaciones:** traducir necesidades de una interfaz o endpoint en consultas SQL que entreguen exactamente la información necesaria.
- **Ciberseguridad aplicada:** evitar fugas de datos al combinar tablas, filtrar correctamente por permisos y no exponer columnas sensibles por comodidad.
- **Validación crítica con IA:** usar agentes para explorar consultas, explicar relaciones o proponer agregaciones, verificando siempre esquema real, permisos, filtros, resultados y límites de exposición.

---

# BLOQUE 1: De tablas sueltas a datos relacionados

- **Duración:** 35 minutos
- **Objetivo del bloque:** comprender que una base de datos relacional no se diseña como una colección de planillas aisladas, sino como un conjunto de entidades conectadas mediante claves, reglas de integridad y relaciones que luego permiten consultas más útiles para una aplicación web.

## Desarrollo

### 1.1 El problema de pensar solo en una tabla

En SQL inicial trabajamos operaciones CRUD sobre tablas individuales. Eso permite entender `CREATE`, `INSERT`, `SELECT`, `UPDATE` y `DELETE`, pero una aplicación real rara vez resuelve sus necesidades con una sola tabla.

Un sistema simple de ventas, por ejemplo, puede tener:

- `usuarios`
- `productos`
- `categorias`
- `compras`
- `detalle_compras`
- `pagos`
- `direcciones`

Si toda esa información se guarda en una sola tabla, aparecen problemas rápidamente:

- se repiten nombres de usuario, correos, direcciones y productos;
- cambiar un dato exige actualizar muchas filas;
- eliminar una fila puede borrar información que todavía era necesaria;
- una compra puede quedar asociada a un usuario inexistente;
- y una consulta puede mezclar datos sin control claro de pertenencia.

Una base relacional busca evitar ese desorden separando entidades y conectándolas con reglas explícitas.

La idea clave es esta: **las tablas guardan hechos distintos, pero la aplicación necesita reconstruir esos hechos como información conectada**.

### 1.2 Entidades, filas y relaciones

Una entidad representa algo importante para el sistema: un usuario, un producto, una compra, una categoría o un pago. En una tabla, cada fila describe una instancia de esa entidad.

Ejemplo:

```sql
usuarios
---------
id
nombre
email

compras
---------
id
usuario_id
fecha
estado
total
```

La tabla `usuarios` no necesita repetir todas las compras de cada persona. La tabla `compras` tampoco necesita copiar el nombre y correo del usuario en cada registro. Basta con guardar una referencia: `usuario_id`.

Esa referencia permite decir:

> Esta compra pertenece a este usuario.

En SQL intermedio, aprender a leer esas conexiones es tan importante como memorizar sintaxis. Si no se entiende la relación entre tablas, un `JOIN` se vuelve una receta mecánica y fácil de romper.

### 1.3 Clave primaria y clave foránea

La **clave primaria** identifica de forma única una fila dentro de una tabla. Normalmente aparece como `id`, aunque puede tener nombres más específicos como `usuario_id`, `producto_id` o `compra_id`.

La **clave foránea** guarda una referencia hacia la clave primaria de otra tabla.

Ejemplo:

```sql
CREATE TABLE usuarios (
  id INT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE
);

CREATE TABLE compras (
  id INT PRIMARY KEY,
  usuario_id INT NOT NULL,
  fecha DATETIME NOT NULL,
  estado VARCHAR(30) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
```

Aquí `compras.usuario_id` apunta a `usuarios.id`. Esa regla impide que el sistema registre una compra para un usuario que no existe, siempre que la base de datos tenga la restricción correctamente definida.

Sin clave foránea, la relación queda solo como una “promesa” del programador. Con clave foránea, la base de datos también participa en proteger la consistencia.

### 1.4 Cardinalidad: cuántos registros se relacionan

La cardinalidad describe cuántos registros de una tabla pueden relacionarse con registros de otra.

Relaciones frecuentes:

| Relación | Lectura | Ejemplo |
|---|---|---|
| `1:1` | Una fila se relaciona con una sola fila de otra tabla. | Un usuario y su perfil extendido. |
| `1:N` | Una fila se relaciona con muchas filas de otra tabla. | Un usuario puede tener muchas compras. |
| `N:M` | Muchas filas se relacionan con muchas filas de otra tabla. | Una compra puede tener muchos productos y un producto puede aparecer en muchas compras. |

La relación `N:M` normalmente necesita una tabla intermedia.

Ejemplo:

```sql
compras
---------
id
usuario_id
fecha

productos
---------
id
nombre
precio

detalle_compras
---------
compra_id
producto_id
cantidad
precio_unitario
```

La tabla `detalle_compras` permite representar qué productos pertenecen a cada compra, cuántas unidades se compraron y a qué precio quedó registrada la operación.

Este diseño parece más largo que una tabla única, pero permite consultas más limpias, menos duplicación y mejor control de integridad.

### 1.5 Integridad referencial y datos huérfanos

Un dato huérfano aparece cuando una fila depende de otra que ya no existe o nunca existió.

Ejemplo:

```sql
compras
---------
id | usuario_id | total
10 | 99         | 49990
```

Si no existe ningún usuario con `id = 99`, esa compra queda sin dueño real. Desde la aplicación, eso genera preguntas incómodas:

- ¿a quién pertenece la compra?
- ¿debería mostrarse en un panel administrativo?
- ¿se puede calcular el historial del usuario?
- ¿qué pasa si se intenta enviar una boleta o comprobante?

La integridad referencial no es un detalle académico. Es una condición para que la aplicación pueda confiar en sus datos.

### 1.6 Eje de ciberseguridad: relación no es autorización

Que dos tablas puedan unirse técnicamente no significa que todos los datos deban mostrarse a cualquier usuario.

Una consulta puede estar bien escrita desde SQL y seguir siendo peligrosa desde seguridad si no filtra por identidad, rol o pertenencia del recurso.

Ejemplo de consulta incompleta:

```sql
SELECT compras.id, compras.total, usuarios.email
FROM compras
INNER JOIN usuarios ON compras.usuario_id = usuarios.id;
```

Esta consulta une correctamente `compras` con `usuarios`, pero no limita el resultado a un usuario específico ni a un rol autorizado. En un endpoint real, podría terminar exponiendo compras de muchas personas.

Una versión más cercana a una aplicación segura debería considerar el usuario autenticado:

```sql
SELECT compras.id, compras.fecha, compras.estado, compras.total
FROM compras
INNER JOIN usuarios ON compras.usuario_id = usuarios.id
WHERE usuarios.id = ?;
```

El `JOIN` resuelve la relación entre tablas. El `WHERE` aplicado con un parámetro seguro ayuda a limitar el alcance de la consulta.

Regla del bloque:

> Unir tablas responde cómo se conectan los datos; autorizar responde quién puede verlos o modificarlos.

### 1.7 Huella metodológica IA/agentes

Un agente puede ayudar a explorar un modelo relacional. Puede sugerir tablas, detectar relaciones probables, proponer claves foráneas o explicar por qué una tabla intermedia es necesaria.

Prompt útil:

```text
Actúa como revisor de modelo relacional para una aplicación web.
Tengo estas tablas: usuarios, compras, productos y detalle_compras.
Explica qué relaciones deberían existir, qué claves primarias y foráneas usarías,
qué cardinalidad tiene cada relación y qué riesgos de integridad o seguridad
debería revisar antes de escribir consultas JOIN.
```

Pero el agente no ve automáticamente el esquema real, los datos existentes ni las reglas de negocio del sistema. Por eso, la validación humana sigue siendo obligatoria:

- confirmar si las columnas existen realmente;
- revisar nombres, tipos y restricciones;
- comprobar si la relación respeta la lógica de negocio;
- verificar que no se expongan datos sensibles;
- y probar consultas con datos representativos.

Usar IA en SQL intermedio no significa delegar el modelo. Significa tener un apoyo para pensar alternativas, mientras el criterio técnico verifica estructura, seguridad y resultado.

## Producto o evidencia del bloque

- Dibujar un mini modelo relacional para `usuarios`, `compras`, `productos` y `detalle_compras`, indicando claves primarias, claves foráneas y cardinalidades.
- Identificar qué relación permite saber qué usuario hizo una compra y qué relación permite saber qué productos pertenecen a esa compra.
- Explicar por qué una consulta con `JOIN` todavía necesita filtros de autorización cuando se usa dentro de una aplicación web.

## Preguntas de chequeo

1. ¿Por qué no conviene guardar usuarios, compras y productos en una sola tabla gigante?
2. ¿Qué diferencia práctica existe entre una clave primaria y una clave foránea?
3. ¿Por qué una relación correcta entre tablas no basta para garantizar autorización?

## Puente hacia el bloque 2

Ya tenemos el mapa básico: entidades, claves, cardinalidades e integridad referencial. El siguiente paso es usar ese mapa para escribir consultas que combinen información de varias tablas. Ahí aparecen los `JOIN`: una herramienta para reconstruir datos relacionados sin volver al desorden de duplicar todo en una sola tabla.

---

# BLOQUE 2: JOINs para reconstruir información

- **Duración:** 35 minutos
- **Objetivo del bloque:** comprender y aplicar consultas `JOIN` para combinar datos relacionados entre tablas, diferenciando coincidencias obligatorias, coincidencias opcionales y registros sin relación, sin perder de vista filtros, columnas explícitas y seguridad de acceso.

## Desarrollo

### 2.1 Qué resuelve un `JOIN`

Un `JOIN` permite consultar datos que están separados en tablas distintas, pero relacionados mediante claves.

Si una aplicación necesita mostrar el historial de compras de un usuario, probablemente no basta con leer solo la tabla `compras`. También puede necesitar datos del usuario, del producto, de la categoría o del estado del pago.

Ejemplo de necesidad de aplicación:

> Mostrar una tabla con las compras realizadas, indicando fecha, estado, total y correo del usuario.

Tablas involucradas:

```sql
usuarios
---------
id
nombre
email

compras
---------
id
usuario_id
fecha
estado
total
```

La relación está en:

```sql
compras.usuario_id = usuarios.id
```

El `JOIN` usa esa relación para reconstruir información conectada:

```sql
SELECT
  compras.id,
  compras.fecha,
  compras.estado,
  compras.total,
  usuarios.email
FROM compras
INNER JOIN usuarios ON compras.usuario_id = usuarios.id;
```

La consulta no “pega tablas completas” de forma mágica. Compara valores entre columnas relacionadas y devuelve filas que cumplen la condición indicada en `ON`.

### 2.2 `INNER JOIN`: solo lo que tiene coincidencia

`INNER JOIN` devuelve únicamente las filas que tienen coincidencia en ambas tablas.

Ejemplo:

```sql
SELECT
  compras.id,
  compras.total,
  usuarios.nombre
FROM compras
INNER JOIN usuarios ON compras.usuario_id = usuarios.id;
```

Lectura técnica:

- toma una fila de `compras`;
- busca una fila de `usuarios` donde `usuarios.id` coincida con `compras.usuario_id`;
- si la encuentra, devuelve una fila combinada;
- si no la encuentra, esa compra no aparece en el resultado.

Visualmente, `INNER JOIN` se puede entender como la intersección entre dos conjuntos: solo aparecen los registros donde existe relación en ambos lados.

Pero hay que cuidar una precisión importante: SQL no trabaja solo con círculos, trabaja con filas. Si un usuario tiene tres compras, el resultado puede mostrar tres filas para ese usuario, una por cada compra encontrada.

Ejemplo de resultado:

| compra_id | total | nombre |
|---:|---:|---|
| 10 | 49990 | Camila Rojas |
| 11 | 18990 | Camila Rojas |
| 12 | 34990 | Felipe Soto |

La repetición del nombre no es necesariamente un error. Es el resultado natural de combinar una relación `1:N`.

### 2.3 `LEFT JOIN`: conservar el lado principal

`LEFT JOIN` devuelve todas las filas de la tabla izquierda, aunque no tengan coincidencia en la tabla derecha.

Ejemplo:

```sql
SELECT
  usuarios.id,
  usuarios.nombre,
  compras.id AS compra_id,
  compras.total
FROM usuarios
LEFT JOIN compras ON usuarios.id = compras.usuario_id;
```

Esta consulta permite ver usuarios con compras y también usuarios sin compras.

Si un usuario no tiene compras, las columnas de `compras` aparecerán como `NULL`.

Ejemplo de resultado:

| usuario_id | nombre | compra_id | total |
|---:|---|---:|---:|
| 1 | Camila Rojas | 10 | 49990 |
| 1 | Camila Rojas | 11 | 18990 |
| 2 | Felipe Soto | 12 | 34990 |
| 3 | Daniela Pérez | NULL | NULL |

Este tipo de consulta es útil cuando la aplicación necesita detectar ausencia de datos:

- usuarios registrados que todavía no compran;
- productos sin categoría asignada;
- pedidos sin pago confirmado;
- tickets sin respuesta;
- cursos sin estudiantes inscritos.

La ausencia también es información.

### 2.4 Registros sin coincidencia: `LEFT JOIN` + `IS NULL`

Una variación muy útil consiste en buscar registros de la tabla izquierda que no tienen relación en la tabla derecha.

Ejemplo:

```sql
SELECT
  usuarios.id,
  usuarios.nombre,
  usuarios.email
FROM usuarios
LEFT JOIN compras ON usuarios.id = compras.usuario_id
WHERE compras.id IS NULL;
```

Lectura:

- trae todos los usuarios;
- intenta encontrar compras asociadas;
- conserva los usuarios aunque no tengan compras;
- filtra solo los casos donde la compra no existe.

Resultado esperado:

| id | nombre | email |
|---:|---|---|
| 3 | Daniela Pérez | daniela@example.com |

Este patrón no debe verse como “truco raro”. Es una forma común de responder preguntas reales:

- ¿qué usuarios no han comprado?
- ¿qué productos nunca se han vendido?
- ¿qué tareas no tienen responsable?
- ¿qué cursos aún no tienen estudiantes?

En aplicaciones web, muchas pantallas de administración dependen de este tipo de preguntas.

### 2.5 Alias y columnas explícitas

Cuando una consulta combina tablas, los nombres pueden volverse largos o ambiguos. Por eso se usan alias.

Ejemplo sin alias:

```sql
SELECT
  compras.id,
  compras.fecha,
  usuarios.email
FROM compras
INNER JOIN usuarios ON compras.usuario_id = usuarios.id;
```

Ejemplo con alias:

```sql
SELECT
  c.id,
  c.fecha,
  c.estado,
  c.total,
  u.email
FROM compras AS c
INNER JOIN usuarios AS u ON c.usuario_id = u.id;
```

Los alias no cambian el resultado. Hacen la consulta más legible, especialmente cuando hay varias tablas.

Lo que no conviene hacer en consultas de aplicación es esto:

```sql
SELECT *
FROM compras AS c
INNER JOIN usuarios AS u ON c.usuario_id = u.id;
```

`SELECT *` puede parecer cómodo, pero en una consulta con `JOIN` aumenta el riesgo de:

- traer columnas innecesarias;
- repetir columnas con el mismo nombre;
- exponer datos sensibles;
- enviar más información de la necesaria al frontend;
- y volver frágil el contrato entre backend y cliente.

En SQL intermedio, una señal de criterio profesional es seleccionar columnas de forma explícita.

### 2.6 `JOIN` con filtros: el orden mental correcto

Una consulta con `JOIN` suele tener dos ideas distintas:

1. **Cómo se relacionan las tablas:** se expresa en `ON`.
2. **Qué filas quiero conservar:** se expresa en `WHERE`.

Ejemplo:

```sql
SELECT
  c.id,
  c.fecha,
  c.estado,
  c.total
FROM compras AS c
INNER JOIN usuarios AS u ON c.usuario_id = u.id
WHERE u.id = ? AND c.estado = 'pagada';
```

Lectura:

- `ON c.usuario_id = u.id` explica cómo se conecta `compras` con `usuarios`;
- `WHERE u.id = ?` limita el resultado al usuario autenticado o solicitado;
- `AND c.estado = 'pagada'` conserva solo compras pagadas.

Confundir `ON` y `WHERE` es un error frecuente. En términos simples:

- `ON` define la relación entre tablas;
- `WHERE` filtra el resultado según la necesidad de la aplicación.

### 2.7 Eje de ciberseguridad: JOIN sin alcance puede filtrar datos

Un `JOIN` puede multiplicar el impacto de una mala consulta. Si se combinan tablas sin filtros adecuados, la aplicación puede exponer información de muchos usuarios en una sola respuesta.

Consulta peligrosa para un endpoint de usuario:

```sql
SELECT
  c.id,
  c.total,
  c.estado,
  u.email,
  u.rol
FROM compras AS c
INNER JOIN usuarios AS u ON c.usuario_id = u.id;
```

Problemas:

- devuelve compras de todos los usuarios;
- expone `email` aunque quizás no sea necesario;
- expone `rol`, dato interno que no debería viajar a una pantalla común;
- no limita por usuario autenticado;
- no deja claro si el endpoint es administrativo o personal.

Versión más controlada para “mis compras”:

```sql
SELECT
  c.id,
  c.fecha,
  c.estado,
  c.total
FROM compras AS c
WHERE c.usuario_id = ?;
```

Si no se necesita información de `usuarios`, no hace falta unir esa tabla. Menos tablas también puede significar menos exposición.

Versión administrativa más explícita:

```sql
SELECT
  c.id,
  c.fecha,
  c.estado,
  c.total,
  u.email
FROM compras AS c
INNER JOIN usuarios AS u ON c.usuario_id = u.id
WHERE c.estado = 'pendiente';
```

La diferencia no está solo en la sintaxis. Está en el contexto de uso: una consulta para el dueño del recurso no debe devolver lo mismo que una consulta administrativa.

Regla del bloque:

> Mientras más tablas combina una consulta, más importante es revisar alcance, columnas y permisos.

### 2.8 Huella metodológica IA/agentes

Un agente puede ayudar a escribir una primera versión de una consulta `JOIN`, especialmente cuando el estudiante todavía está aprendiendo a navegar varias tablas.

Prompt útil:

```text
Actúa como asistente SQL para una aplicación web.
Tengo estas tablas:

usuarios(id, nombre, email)
compras(id, usuario_id, fecha, estado, total)
productos(id, nombre, precio)
detalle_compras(compra_id, producto_id, cantidad, precio_unitario)

Necesito una consulta para mostrar las compras pagadas de un usuario autenticado,
con fecha, estado, total y cantidad de productos comprados.
Propón la consulta usando alias, columnas explícitas y parámetros.
Además, explica qué debería revisar por seguridad antes de usarla en backend.
```

La respuesta del agente puede servir como borrador, pero no debe ejecutarse sin revisar:

- si las columnas existen;
- si las relaciones están bien usadas;
- si el filtro por usuario autenticado está presente;
- si usa parámetros y no concatenación;
- si devuelve solo columnas necesarias;
- si la consulta corresponde al endpoint correcto;
- y si el resultado calza con datos de prueba.

El agente puede acelerar la escritura. El desarrollador debe validar la intención, el alcance y el resultado.

## Producto o evidencia del bloque

- Escribir una consulta `INNER JOIN` que muestre compras con el correo del usuario.
- Escribir una consulta `LEFT JOIN` que permita detectar usuarios sin compras.
- Reescribir una consulta con `SELECT *` para que use columnas explícitas, alias y un filtro de usuario.

## Preguntas de chequeo

1. ¿Qué diferencia práctica hay entre `INNER JOIN` y `LEFT JOIN`?
2. ¿Por qué `SELECT *` es más riesgoso cuando se combinan varias tablas?
3. ¿Qué parte de la consulta define la relación entre tablas y qué parte limita el alcance del resultado?

## Puente hacia el bloque 3

Con `JOIN` ya podemos reconstruir información distribuida entre varias tablas. Pero muchas preguntas de una aplicación no piden filas individuales, sino resúmenes: cuántas compras existen, cuánto se vendió, qué usuario compró más o cuántos productos hay por categoría. Para eso necesitamos agregaciones, `GROUP BY` y una forma distinta de pensar el resultado.

---

# BLOQUE 3: Agregaciones para responder preguntas de negocio

- **Duración:** 35 minutos
- **Objetivo del bloque:** usar funciones de agregación, `GROUP BY` y `HAVING` para transformar filas individuales en resúmenes útiles para una aplicación web, diferenciando entre filtrar registros antes de agrupar y filtrar grupos ya calculados.

## Desarrollo

### 3.1 De listar filas a responder preguntas

Una consulta con `SELECT` puede mostrar registros individuales. Eso es útil para pantallas como:

- listado de compras;
- detalle de productos;
- usuarios registrados;
- historial de pagos;
- tickets de soporte.

Pero muchas necesidades reales de una aplicación no preguntan por una fila específica. Preguntan por un resumen.

Ejemplos:

- ¿cuántas compras realizó un usuario?
- ¿cuánto se vendió este mes?
- ¿cuál es el promedio de compra?
- ¿cuántos productos hay por categoría?
- ¿qué usuarios tienen más de cinco compras?
- ¿qué productos nunca se han vendido?

Para responder ese tipo de preguntas, SQL usa funciones de agregación.

La diferencia mental es importante:

| Consulta normal | Consulta agregada |
|---|---|
| Devuelve filas individuales. | Devuelve cálculos sobre conjuntos de filas. |
| Sirve para listar o ver detalle. | Sirve para medir, resumir o comparar. |
| Cada fila suele representar un registro. | Cada fila puede representar un grupo. |

Una aplicación profesional necesita ambas cosas: detalle para operar y resumen para decidir.

### 3.2 Funciones de agregación básicas

Las funciones de agregación calculan un resultado a partir de varias filas.

Funciones principales:

| Función | Uso | Ejemplo de pregunta |
|---|---|---|
| `COUNT()` | Cuenta filas o valores. | ¿Cuántas compras existen? |
| `SUM()` | Suma valores numéricos. | ¿Cuánto se vendió en total? |
| `AVG()` | Calcula promedio. | ¿Cuál es el ticket promedio? |
| `MIN()` | Obtiene el valor menor. | ¿Cuál fue la compra más baja? |
| `MAX()` | Obtiene el valor mayor. | ¿Cuál fue la compra más alta? |

Ejemplo simple:

```sql
SELECT
  COUNT(*) AS total_compras,
  SUM(total) AS monto_total,
  AVG(total) AS promedio_compra,
  MIN(total) AS compra_menor,
  MAX(total) AS compra_mayor
FROM compras;
```

Esta consulta devuelve una sola fila con varios indicadores.

Resultado posible:

| total_compras | monto_total | promedio_compra | compra_menor | compra_mayor |
|---:|---:|---:|---:|---:|
| 128 | 5249000 | 41007.81 | 3990 | 189990 |

La consulta ya no está mostrando una compra específica. Está calculando una lectura global de la tabla.

### 3.3 `COUNT(*)`, `COUNT(columna)` y `NULL`

`COUNT` parece simple, pero tiene una diferencia importante:

```sql
SELECT COUNT(*) FROM compras;
```

`COUNT(*)` cuenta filas, aunque algunas columnas tengan `NULL`.

En cambio:

```sql
SELECT COUNT(fecha_pago) FROM compras;
```

`COUNT(fecha_pago)` cuenta solo las filas donde `fecha_pago` no es `NULL`.

Esto importa mucho en aplicaciones reales.

Ejemplo:

| id | estado | fecha_pago |
|---:|---|---|
| 1 | pagada | 2026-05-01 |
| 2 | pendiente | NULL |
| 3 | pagada | 2026-05-02 |

Consultas:

```sql
SELECT COUNT(*) AS total_compras
FROM compras;
```

Resultado:

| total_compras |
|---:|
| 3 |

```sql
SELECT COUNT(fecha_pago) AS compras_pagadas
FROM compras;
```

Resultado:

| compras_pagadas |
|---:|
| 2 |

El detalle no es menor: contar filas no siempre significa contar eventos completados.

### 3.4 `GROUP BY`: agrupar antes de calcular

`GROUP BY` permite calcular agregaciones por grupo.

Ejemplo: contar compras por usuario.

```sql
SELECT
  usuario_id,
  COUNT(*) AS total_compras
FROM compras
GROUP BY usuario_id;
```

Resultado posible:

| usuario_id | total_compras |
|---:|---:|
| 1 | 4 |
| 2 | 1 |
| 3 | 7 |

La consulta agrupa todas las compras que tienen el mismo `usuario_id` y calcula cuántas filas hay en cada grupo.

La regla técnica es:

> Si una consulta mezcla columnas normales con agregaciones, las columnas normales deben tener sentido como criterio de agrupación.

Ejemplo correcto:

```sql
SELECT
  estado,
  COUNT(*) AS cantidad
FROM compras
GROUP BY estado;
```

Ejemplo problemático:

```sql
SELECT
  estado,
  fecha,
  COUNT(*) AS cantidad
FROM compras
GROUP BY estado;
```

El problema es que `fecha` puede tener muchos valores dentro del mismo `estado`. Si no se agrupa por fecha ni se aplica una función agregada sobre ella, la consulta queda ambigua o directamente inválida según el motor SQL.

### 3.5 Agregaciones con `JOIN`

Las agregaciones se vuelven más útiles cuando se combinan con `JOIN`.

Ejemplo: cantidad de compras por usuario mostrando el correo.

```sql
SELECT
  u.id,
  u.email,
  COUNT(c.id) AS total_compras
FROM usuarios AS u
LEFT JOIN compras AS c ON u.id = c.usuario_id
GROUP BY u.id, u.email;
```

Lectura:

- se parte desde `usuarios`;
- se buscan compras asociadas;
- se conserva incluso a usuarios sin compras por usar `LEFT JOIN`;
- se agrupa por usuario;
- se cuenta cuántas compras tiene cada uno.

Resultado posible:

| id | email | total_compras |
|---:|---|---:|
| 1 | camila@example.com | 4 |
| 2 | felipe@example.com | 1 |
| 3 | daniela@example.com | 0 |

Aquí `COUNT(c.id)` es mejor que `COUNT(*)`, porque con `LEFT JOIN` un usuario sin compras igual genera una fila en el resultado combinado. `COUNT(c.id)` cuenta solo compras reales.

Este detalle es importante: la agregación correcta depende del tipo de `JOIN` y del significado de cada columna.

### 3.6 `WHERE` vs `HAVING`

`WHERE` filtra filas antes de agrupar.

`HAVING` filtra grupos después de calcular agregaciones.

Ejemplo con `WHERE`:

```sql
SELECT
  usuario_id,
  COUNT(*) AS compras_pagadas
FROM compras
WHERE estado = 'pagada'
GROUP BY usuario_id;
```

Lectura:

- primero conserva solo compras pagadas;
- después agrupa por usuario;
- finalmente cuenta compras pagadas por usuario.

Ejemplo con `HAVING`:

```sql
SELECT
  usuario_id,
  COUNT(*) AS total_compras
FROM compras
GROUP BY usuario_id
HAVING COUNT(*) >= 3;
```

Lectura:

- agrupa compras por usuario;
- calcula cuántas compras tiene cada usuario;
- conserva solo los grupos con tres o más compras.

Comparación:

| Cláusula | Momento | Pregunta que responde |
|---|---|---|
| `WHERE` | Antes de agrupar. | ¿Qué filas entran al cálculo? |
| `HAVING` | Después de agrupar. | ¿Qué grupos calculados se conservan? |

Una regla práctica:

> Si el filtro usa una columna fila por fila, probablemente va en `WHERE`. Si el filtro usa una agregación como `COUNT()` o `SUM()`, probablemente va en `HAVING`.

### 3.7 Métricas útiles para una aplicación web

Las agregaciones permiten construir paneles, reportes y resúmenes.

Ejemplo: ventas por estado de compra.

```sql
SELECT
  estado,
  COUNT(*) AS cantidad,
  SUM(total) AS monto_total
FROM compras
GROUP BY estado;
```

Resultado posible:

| estado | cantidad | monto_total |
|---|---:|---:|
| pagada | 92 | 4210000 |
| pendiente | 24 | 890000 |
| anulada | 12 | 149000 |

Ejemplo: ventas por categoría.

```sql
SELECT
  cat.nombre AS categoria,
  SUM(dc.cantidad * dc.precio_unitario) AS monto_total
FROM detalle_compras AS dc
INNER JOIN productos AS p ON dc.producto_id = p.id
INNER JOIN categorias AS cat ON p.categoria_id = cat.id
GROUP BY cat.nombre;
```

Esta consulta combina varias ideas:

- `JOIN` para conectar detalle, productos y categorías;
- cálculo de subtotal por línea;
- `SUM` para acumular ventas;
- `GROUP BY` para resumir por categoría.

Este tipo de consulta se acerca mucho más al trabajo real: no solo devuelve datos, responde una pregunta útil para el negocio.

### 3.8 Eje de ciberseguridad: agregación no siempre anonimiza

Un error frecuente es creer que un dato agregado siempre es seguro porque no muestra filas individuales.

No siempre es así.

Ejemplo:

```sql
SELECT
  usuario_id,
  SUM(total) AS gasto_total
FROM compras
GROUP BY usuario_id;
```

Aunque la consulta no muestra cada compra, sí puede revelar cuánto ha gastado cada usuario. Según el contexto, eso puede ser información sensible.

Otro caso:

```sql
SELECT
  comuna,
  COUNT(*) AS total_usuarios
FROM usuarios
GROUP BY comuna;
```

Si una comuna tiene solo una persona registrada, el resumen puede permitir inferir información individual.

En aplicaciones web, los reportes agregados también necesitan criterio de acceso:

- no todo usuario debe ver métricas globales;
- los paneles administrativos deben limitarse por rol;
- las métricas por usuario deben respetar ownership;
- los reportes deben evitar columnas sensibles innecesarias;
- y los filtros deben impedir que alguien consulte datos fuera de su alcance.

Regla del bloque:

> Agregar datos reduce detalle, pero no elimina automáticamente el riesgo de exposición.

### 3.9 Huella metodológica IA/agentes

Los agentes son especialmente útiles para traducir preguntas de negocio a consultas agregadas. Pueden sugerir `COUNT`, `SUM`, `GROUP BY`, `HAVING` o joins necesarios.

Prompt útil:

```text
Actúa como analista SQL para una aplicación web.
Tengo estas tablas:

usuarios(id, email, rol)
compras(id, usuario_id, fecha, estado, total)
detalle_compras(compra_id, producto_id, cantidad, precio_unitario)
productos(id, nombre, categoria_id)
categorias(id, nombre)

Necesito tres consultas:
1. total vendido por estado de compra;
2. cantidad de compras pagadas por usuario;
3. ventas por categoría.

Usa alias, columnas explícitas, GROUP BY correcto y explica qué filtros o controles
de seguridad debería revisar antes de exponer estas métricas en un panel.
```

La validación humana debe revisar:

- si la pregunta de negocio está bien entendida;
- si el cálculo corresponde realmente a la métrica pedida;
- si se usan las tablas correctas;
- si los joins no duplican o inflan resultados;
- si `COUNT(*)` o `COUNT(columna)` es la opción correcta;
- si el `GROUP BY` no mezcla columnas ambiguas;
- y si el panel que usará la consulta tiene permisos adecuados.

Un agente puede proponer una consulta que parece correcta, pero una agregación mal diseñada puede entregar números falsos. En datos, una respuesta incorrecta con apariencia profesional es especialmente peligrosa.

## Producto o evidencia del bloque

- Escribir una consulta que cuente compras por estado.
- Escribir una consulta que calcule el total vendido por categoría usando `JOIN` y `GROUP BY`.
- Explicar cuándo usar `WHERE` y cuándo usar `HAVING` en una consulta agregada.

## Preguntas de chequeo

1. ¿Qué diferencia hay entre listar compras y calcular cuántas compras existen por estado?
2. ¿Por qué `COUNT(*)` y `COUNT(columna)` pueden entregar resultados distintos?
3. ¿Por qué un reporte agregado también puede requerir control de acceso?

## Puente hacia el bloque 4

Ya podemos relacionar tablas y calcular resúmenes. Falta una pieza de criterio: diseñar modelos que no obliguen a repetir datos ni generen inconsistencias difíciles de corregir. El siguiente bloque conecta normalización ligera, diseño de consultas y conexión con backend para que la base de datos sea más mantenible y segura.

---

# BLOQUE 4: Normalización ligera y conexión con backend

- **Duración:** 35 minutos
- **Objetivo del bloque:** reconocer problemas básicos de duplicación e inconsistencia en modelos de datos, aplicar criterios iniciales de normalización y conectar consultas SQL intermedias con endpoints o pantallas de una aplicación web.

## Desarrollo

### 4.1 Normalizar no es complicar: es reducir contradicciones

Normalizar una base de datos significa organizar la información para reducir duplicación innecesaria, inconsistencias y dependencias mal ubicadas.

No se trata de convertir cada clase en teoría formal de bases de datos ni de memorizar todas las formas normales. En este módulo, la normalización se trabaja como criterio práctico:

> Si un dato se repite demasiado, se contradice fácilmente o no pertenece realmente a esa tabla, probablemente el modelo necesita revisarse.

Ejemplo de tabla problemática:

```sql
compras_planilla
----------------
id
usuario_nombre
usuario_email
producto_nombre
producto_categoria
cantidad
precio_unitario
fecha_compra
estado_compra
```

Esta tabla puede parecer cómoda al principio porque “todo está junto”. Pero trae varios riesgos:

- el correo del usuario se repite en cada compra;
- si cambia el nombre de una categoría, hay que actualizar muchas filas;
- el nombre de un producto puede quedar escrito de varias formas;
- no existe una identidad clara para usuario, producto o categoría;
- y una consulta puede depender de texto repetido en vez de claves confiables.

Una tabla gigante puede facilitar una demo rápida, pero debilita la mantenibilidad de una aplicación real.

### 4.2 Tres anomalías comunes

Cuando un modelo mezcla demasiados hechos en una sola tabla, suelen aparecer anomalías.

| Anomalía | Qué ocurre | Ejemplo |
|---|---|---|
| Inserción | No puedo registrar un dato sin inventar otro. | No puedo crear un producto si todavía no existe una compra. |
| Actualización | Debo modificar muchas filas para corregir un solo dato. | Cambiar el nombre de una categoría exige actualizar cientos de compras. |
| Borrado | Al eliminar una fila pierdo información que aún era válida. | Al borrar la única compra de un producto, desaparece el registro del producto. |

Estas anomalías no son errores de sintaxis. Son señales de diseño.

En una aplicación web, las anomalías se transforman en problemas visibles:

- datos que “no cuadran” entre pantallas;
- reportes con números distintos;
- productos duplicados;
- usuarios con información vieja;
- endpoints que deben corregir manualmente datos repetidos;
- y mayor riesgo de exponer información incorrecta.

### 4.3 Separar entidades sin perder la vista completa

Una versión más ordenada del ejemplo separa entidades:

```sql
usuarios
---------
id
nombre
email

categorias
---------
id
nombre

productos
---------
id
categoria_id
nombre
precio_actual

compras
---------
id
usuario_id
fecha
estado

detalle_compras
---------
compra_id
producto_id
cantidad
precio_unitario
```

Este diseño separa hechos distintos:

- `usuarios` guarda identidad del cliente;
- `categorias` guarda clasificación de productos;
- `productos` guarda catálogo;
- `compras` guarda la operación principal;
- `detalle_compras` guarda los productos incluidos en cada compra.

La ventaja no es solo “orden”. La ventaja es poder mantener datos, consultar relaciones y aplicar reglas con más precisión.

Para mostrar una pantalla completa, se usan `JOINs`. Para resumir ventas, se usan agregaciones. Para proteger acceso, se agregan filtros y permisos.

La normalización no elimina la necesidad de consultar bien. Prepara el terreno para que las consultas sean más confiables.

### 4.4 Cuándo no conviene normalizar de más

Normalizar ayuda, pero dividir todo en demasiadas tablas también puede volver el sistema difícil de leer para el nivel actual del curso.

En este módulo usaremos una regla pragmática:

> Separar cuando hay una entidad clara, una repetición importante o una regla que necesita consistencia propia.

No hace falta crear una tabla nueva para cualquier palabra repetida. La decisión depende del uso real del sistema.

Ejemplos:

| Caso | Decisión razonable |
|---|---|
| `usuarios.email` se repite en compras | Separar `usuarios` y referenciar por `usuario_id`. |
| `producto_categoria` se repite en muchos productos | Crear `categorias` si se usará para filtros, reportes o administración. |
| `estado_compra` tiene pocos valores fijos | Puede partir como columna validada; más adelante podría ser tabla si tiene reglas propias. |
| `precio_unitario` aparece en `detalle_compras` | Conviene guardarlo ahí para conservar el precio histórico de la compra. |

El último caso es importante: a veces repetir un dato es correcto porque representa un hecho histórico. Si el precio actual del producto cambia, una compra antigua no debería cambiar su monto.

Normalizar con criterio significa distinguir duplicación peligrosa de registro histórico necesario.

### 4.5 Conectar consultas SQL con endpoints reales

Una consulta SQL intermedia debe pensarse desde una necesidad de aplicación.

Ejemplo de pantalla:

> Panel “Mis compras”: muestra fecha, estado, total y cantidad de productos por compra del usuario autenticado.

Endpoint posible:

```text
GET /api/mis-compras
```

Consulta posible:

```sql
SELECT
  c.id,
  c.fecha,
  c.estado,
  c.total,
  COUNT(dc.producto_id) AS cantidad_productos
FROM compras AS c
LEFT JOIN detalle_compras AS dc ON c.id = dc.compra_id
WHERE c.usuario_id = ?
GROUP BY c.id, c.fecha, c.estado, c.total
ORDER BY c.fecha DESC;
```

Esta consulta combina varias capas:

- `LEFT JOIN` para contar productos asociados;
- `WHERE c.usuario_id = ?` para limitar al usuario autenticado;
- `GROUP BY` para resumir por compra;
- `ORDER BY` para mostrar lo más reciente primero;
- columnas explícitas para no exponer información innecesaria.

Lo importante es que la consulta no nace desde “quiero usar `JOIN`”. Nace desde una necesidad de interfaz o endpoint.

### 4.6 Checklist de una consulta lista para backend

Antes de llevar una consulta SQL a un backend, conviene revisar:

1. **Intención:** la consulta responde exactamente la pregunta de la pantalla o endpoint.
2. **Columnas:** selecciona solo los campos necesarios.
3. **Relaciones:** los `JOIN` usan claves correctas.
4. **Filtros:** limita por usuario, rol, estado o alcance según corresponda.
5. **Parámetros:** los valores variables no se concatenan; se parametrizan.
6. **Agregación:** `COUNT`, `SUM` y `GROUP BY` no inflan ni duplican resultados.
7. **Orden:** el resultado llega en un orden útil para la interfaz.
8. **Errores:** el backend no expone SQL crudo si la consulta falla.

Este checklist conecta lo visto en semana 07 con lo aprendido hoy. Una consulta puede ser intermedia, visualmente correcta y aun así insegura si no controla alcance, parámetros y exposición.

### 4.7 Eje de ciberseguridad: datos relacionados, daño relacionado

Cuando una consulta une varias tablas, una falla de autorización puede exponer más información que una consulta simple.

Ejemplo:

```sql
SELECT
  u.email,
  c.id,
  c.total,
  p.nombre,
  dc.cantidad
FROM usuarios AS u
INNER JOIN compras AS c ON u.id = c.usuario_id
INNER JOIN detalle_compras AS dc ON c.id = dc.compra_id
INNER JOIN productos AS p ON dc.producto_id = p.id;
```

Esta consulta puede ser útil para un reporte administrativo. Pero sería peligrosa si se expone en un endpoint común sin filtros.

Podría revelar:

- correos de usuarios;
- historial de compras;
- productos comprados;
- montos;
- patrones de consumo;
- y datos suficientes para perfilar usuarios.

La seguridad en datos relacionados exige mirar el conjunto completo, no solo cada tabla por separado.

Regla del bloque:

> Mientras más rica es una consulta, más daño puede causar si el alcance está mal definido.

### 4.8 Huella metodológica IA/agentes

Un agente puede ayudar a revisar si un modelo está demasiado duplicado o si una consulta para backend está incompleta.

Prompt útil:

```text
Actúa como revisor de datos y backend.
Tengo este modelo para una tienda:

usuarios(id, nombre, email)
productos(id, nombre, categoria, precio_actual)
compras(id, usuario_id, fecha, estado, total)
detalle_compras(compra_id, producto_id, cantidad, precio_unitario)

Revisa si el modelo tiene duplicación problemática, qué normalización ligera aplicarías,
y evalúa esta consulta para el endpoint GET /api/mis-compras:

SELECT c.*, u.email, dc.*, p.*
FROM compras c
JOIN usuarios u ON c.usuario_id = u.id
JOIN detalle_compras dc ON c.id = dc.compra_id
JOIN productos p ON dc.producto_id = p.id;

Indica riesgos de exposición, filtros faltantes, columnas innecesarias y una versión más segura.
```

El agente puede detectar muchos riesgos, pero el estudiante debe validar:

- si el endpoint es personal o administrativo;
- qué usuario está autenticado;
- qué columnas necesita realmente el frontend;
- si el esquema real coincide con el ejemplo;
- si los resultados se duplican por el detalle de compra;
- y si la consulta respeta reglas de negocio.

El criterio final no es “el agente dijo que está bien”. El criterio final es que la consulta sea correcta, limitada, parametrizada, mantenible y verificable.

## Producto o evidencia del bloque

- Transformar una tabla “planilla” de compras en un mini modelo con `usuarios`, `productos`, `compras` y `detalle_compras`.
- Diseñar una consulta para `GET /api/mis-compras` que use columnas explícitas, filtro por usuario y agregación si corresponde.
- Aplicar el checklist de consulta lista para backend a una consulta con `JOIN`.

## Preguntas de chequeo

1. ¿Qué problema aparece si guardamos nombre de usuario y correo repetidos en cada compra?
2. ¿Por qué a veces sí conviene guardar `precio_unitario` en `detalle_compras` aunque el producto ya tenga precio?
3. ¿Qué debería revisar antes de exponer una consulta con varias tablas en un endpoint?

## Puente hacia el cierre

La clase comenzó con tablas relacionadas y terminó conectando modelo, consultas y backend. Ahora podemos cerrar con una idea central: SQL intermedio no consiste en escribir consultas más largas, sino en formular mejores preguntas sobre datos conectados, con criterios de integridad, seguridad y utilidad para la aplicación.

---

# Cierre de la Clase

## Síntesis Final

En esta sesión avanzamos desde SQL inicial hacia una lectura más realista de los datos en aplicaciones web. Pasamos de operar una tabla aislada a comprender cómo varias entidades se conectan para responder preguntas útiles.

Los puntos clave fueron:

- **Las relaciones dan estructura al dato:** claves primarias, claves foráneas y cardinalidades permiten que la base de datos represente vínculos reales entre entidades.
- **Los `JOIN` reconstruyen información conectada:** `INNER JOIN`, `LEFT JOIN` y búsquedas sin coincidencia permiten consultar relaciones sin duplicar todo en una tabla gigante.
- **Las agregaciones responden preguntas de negocio:** `COUNT`, `SUM`, `AVG`, `GROUP BY` y `HAVING` permiten convertir filas en indicadores.
- **La normalización ligera reduce contradicciones:** separar entidades evita duplicación peligrosa, anomalías y modelos difíciles de mantener.
- **La seguridad sigue siendo transversal:** combinar tablas y resumir datos no elimina la necesidad de autorización, exposición mínima, filtros por usuario y consultas parametrizadas.
- **Los agentes ayudan, pero no reemplazan validación:** pueden proponer modelos o consultas, pero el esquema real, los permisos, los resultados y la seguridad deben revisarse con criterio humano.

## Checklist de Consulta SQL Intermedia

Antes de dar por buena una consulta, revisar:

1. ¿Qué pregunta de aplicación responde?
2. ¿Qué tablas realmente necesita?
3. ¿Los `JOIN` usan claves correctas?
4. ¿Las columnas seleccionadas son explícitas y necesarias?
5. ¿Existe filtro por usuario, rol, estado o alcance cuando corresponde?
6. ¿Los valores variables están parametrizados?
7. ¿Las agregaciones entregan números correctos y no duplicados?
8. ¿El resultado es adecuado para la pantalla, endpoint o reporte que lo consumirá?

## Preguntas de Salida

1. ¿Por qué una relación `1:N` puede repetir datos en el resultado de un `JOIN` sin que eso sea un error?
2. ¿Cuándo usarías `LEFT JOIN` en vez de `INNER JOIN`?
3. ¿Qué diferencia práctica existe entre `WHERE` y `HAVING`?
4. ¿Por qué una consulta agregada también puede exponer información sensible?
5. ¿Qué debes verificar si un agente te propone una consulta SQL con varias tablas?

## Próximo Paso

En la siguiente clase cambiaremos de eje: desde datos relacionales hacia fundamentos de deep learning. La conexión no es accidental: antes de hablar de modelos, entrenamiento o generalización, necesitamos entender que toda inteligencia artificial trabaja sobre datos estructurados, decisiones de representación, patrones y validación. Lo aprendido hoy sobre ordenar, consultar y revisar datos será una base útil para comprender cómo los sistemas aprenden a partir de información.
