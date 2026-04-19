# Clase 01 - Semana 06 - Lectura e Integración con Código Legado (PHP y CRUD)

- Unidad 02: Frontend Moderno, APIs y Legado
- Fecha: Lunes 20 de abril de 2026
- Duración: 3 horas (10:50 - 13:10)
- Modalidad: Presencial en Laboratorio PC
- Docente: Diego Obando

---

# Objetivos de la Clase

## Objetivo General
Al terminar esta clase, el estudiante será capaz de leer, diagnosticar y realizar mantenimiento quirúrgico sobre aplicaciones web existentes (legado) basadas en PHP, utilizando agentes de IA para acelerar el entendimiento y asegurar la integridad de sistemas que no fueron diseñados con arquitecturas modernas.

## Objetivos Específicos
1.  **Identificar las diferencias estructurales** entre una arquitectura de archivos (PHP legacy) y una arquitectura de recursos (REST/FastAPI).
2.  **Comprender el rol de las variables superglobales** (`$_POST`, `$_GET`, `$_SESSION`) como la base de la comunicación HTTP antes de la abstracción de frameworks.
3.  **Realizar cambios incrementales (quirúrgicos)** en un sistema CRUD funcional, evitando la tentación de la reescritura total y preservando la lógica de negocio previa.
4.  **Utilizar agentes de IA como intérpretes de código**, extrayendo reglas de negocio y dependencias de archivos PHP no documentados.
5.  **Gestionar el estado del usuario** mediante sesiones nativas de servidor, entendiendo el flujo de autenticación tradicional.

## Competencias Transversales
- **Juicio Crítico:** valorar el código legado como un activo de negocio y no como "código malo".
- **Integridad Técnica:** aplicar el Axioma de Integridad al intervenir sistemas antiguos.
- **Adaptabilidad:** navegar fluidamente entre stacks modernos (FastAPI) y entornos tradicionales (PHP).

---

# BLOQUE 1: La Psicología y el Valor del Código Legado

- **Duración:** 35 minutos
- **Objetivo del bloque:** comprender que el código legado es un activo de negocio funcional y aprender a identificar la "Arquitectura de Archivos" frente a las arquitecturas modernas.
- **Modalidad:** análisis conceptual, comparación de estructuras y reflexión técnica.

## Desarrollo

### 1.1 ¿Qué es realmente el Código Legado? (El valor del negocio)
A menudo, los desarrolladores novatos usan el término "Legacy" como sinónimo de "Basura". Sin embargo, en la industria profesional, el código legado es **código que funciona y genera dinero**.
- **Concepto:** es un sistema que ha sobrevivido al tiempo, que sostiene procesos críticos de una empresa y cuyas reglas de negocio a veces solo viven en ese código.
- **Mentalidad Profesional:** no buscamos borrarlo; buscamos entenderlo, respetarlo y mantenerlo vivo para que siga siendo útil.

### 1.2 Arquitectura de Archivos vs. Arquitectura de Recursos
En la semana anterior vimos FastAPI, donde una URL (`/api/v1/users`) es una abstracción. En el código legado (especialmente PHP), nos enfrentamos a la **Arquitectura de Archivos**:
- **Diferencia Clave:** la URL suele mapear directamente a un archivo físico en el servidor.
- **Ejemplo:** `dominio.com/perfil.php?id=10`. Si el archivo `perfil.php` no existe, la ruta no existe. La estructura de carpetas **es** la estructura de la aplicación.

### 1.3 El Patrón "Espagueti" y la mezcla de responsabilidades
Antes de la masificación de los frameworks (como Next.js o FastAPI), la forma estándar de programar era la **fusión de capas**:
- Es normal encontrar en un mismo archivo:
  1.  Conexión a la base de datos (Persistencia).
  2.  Validación de datos (Negocio).
  3.  HTML y CSS (Presentación).
- **Análisis:** esta mezcla no se hacía por "flojera", sino porque las herramientas de la época (PHP 4/5) estaban diseñadas para esa inmediatez.

### 1.4 La IA como "Arqueóloga de Código" (Huella IA)
Cuando nos enfrentamos a un archivo legacy de 500 líneas sin comentarios, el agente de IA es nuestro mejor aliado de exploración.
- **Estrategia:** no le pedimos a la IA "reescribe esto en Python". Le pedimos "actúa como un arqueólogo de software y extrae las reglas de validación de este formulario PHP".
- **Validación Humana:** el agente nos ayuda a mapear el sistema, pero nosotros debemos validar si esas reglas siguen siendo vigentes para el negocio hoy.

## Producto o evidencia del bloque
- Explicar la diferencia entre una URL de FastAPI y una URL de PHP Legacy.
- Identificar por qué es un riesgo financiero proponer una reescritura total de un sistema que ya está operando.
- Localizar las tres capas (datos, lógica y vista) dentro de un fragmento de código PHP mezclado.

---

# BLOQUE 2: PHP Esencial para Lectura y Superglobales

- **Duración:** 35 minutos
- **Objetivo del bloque:** identificar la sintaxis fundamental de PHP y comprender cómo el sistema captura datos del exterior mediante las variables superglobales `$_GET` y `$_POST`.
- **Modalidad:** lectura dirigida, análisis de snippets y mapeo de datos.

## Desarrollo

### 2.1 Sintaxis de Supervivencia: Variables y Arreglos
PHP no requiere declarar tipos de forma obligatoria (aunque puede hacerlo). Para leerlo, debemos reconocer dos estructuras básicas:
- **Variables:** siempre empiezan con el símbolo `$`. Ejemplo: `$nombre_usuario = "Juan";`.
- **Arreglos Asociativos:** son el equivalente a los diccionarios de Python. Se usan masivamente para transportar datos.
  ```php
  $producto = [
      "id" => 101,
      "nombre" => "Teclado",
      "precio" => 15000
  ];
  ```

### 2.2 El "Sándwich" PHP/HTML
A diferencia de los frameworks modernos donde el HTML se genera mediante lógica, en el legado PHP el archivo **es** HTML con "islas" de lógica:
- `<?php ... ?>`: estas etiquetas indican dónde empieza y termina el código que el servidor debe ejecutar.
- **Visualización:** si algo está fuera de esas etiquetas, el servidor lo ignora y lo entrega tal cual al navegador. Esto explica por qué el código legacy se siente tan "mezclado".

### 2.3 Superglobales: Los túneles de información
En FastAPI usábamos modelos de Pydantic para recibir datos. En PHP Legacy, usamos **Superglobales**: arreglos que siempre están disponibles y contienen lo que el usuario envía.
- **`$_GET` (Query Parameters):** datos que viajan en la URL. `perfil.php?id=5` -> `$_GET['id']` vale 5.
- **`$_POST` (Request Body):** datos que vienen de un formulario. Es el estándar para crear o editar registros (Escritura).
- **Mapeo:** entender que estas variables son la materia prima de cualquier CRUD en PHP.

### 2.4 IA para Descifrar Lógica (Huella IA)
Leer PHP antiguo puede ser agotador por la falta de estructura. El agente de IA puede actuar como un "Traductor de Sintaxis".
- **Estrategia:** tomar un bloque de PHP denso y pedirle a la IA: *"Analiza este script: ¿Qué campos espera recibir de un formulario y bajo qué nombres de variable los guarda en la base de datos?"*.
- **Valor Agregado:** la IA nos ayuda a reconstruir el "Contrato de API" que nunca fue documentado.

## Producto o evidencia del bloque
- Identificar en un script PHP qué variables provienen de la URL (`GET`) y cuáles de un formulario (`POST`).
- Explicar qué sucede si intentamos acceder a un índice de `$_POST` que el formulario no envió (Error de "Undefined index").
- Escribir un pequeño bloque `<?php echo ... ?>` para mostrar el nombre de un producto dentro de una etiqueta HTML.

---

# BLOQUE 3: Sesiones, Cookies y el Estado del Usuario

- **Duración:** 35 minutos
- **Objetivo del bloque:** comprender el mecanismo de persistencia de identidad en PHP mediante el uso de sesiones y cookies, aprendiendo a gestionar el estado del usuario entre múltiples archivos.
- **Modalidad:** análisis de flujo de datos, demostración de sintaxis y auditoría de seguridad.

## Desarrollo

### 3.1 El Servidor con Memoria: `session_start()`
Por naturaleza, el protocolo HTTP es **"stateless"** (sin estado): el servidor olvida quién eres apenas termina de enviarte la página. Para solucionar esto, PHP inventó las Sesiones.
- **La Llave Maestra:** el comando `session_start();` debe ir en la primera línea de cada archivo PHP que necesite reconocer al usuario.
- **¿Qué hace?** crea un archivo temporal en el disco del servidor y genera un ID único (como un número de ticket) para ese visitante específico.

### 3.2 El ID en la Cookie: El puente físico
Aunque los datos de la sesión viven en el servidor, el navegador necesita guardar el "ticket" para presentarlo en cada petición.
- **La Cookie:** PHP envía automáticamente una cookie llamada `PHPSESSID` al navegador del usuario.
- **Diferencia Crítica:** 
    - **Cookie:** vive en el cliente (navegador), es pequeña y puede ser manipulada por el usuario.
    - **Sesión:** vive en el servidor, puede guardar mucha información y es invisible para el usuario.

### 3.3 Uso Práctico de `$_SESSION`: Sintaxis y Flujo
Para usar las sesiones, empleamos la superglobal `$_SESSION`, que funciona como un gran baúl de datos (Arreglo Asociativo).

**Paso 1: Guardar datos (ej: `login.php`)**
```php
<?php
session_start(); // Iniciamos/recuperamos la sesión

// Declaración de variables y asignación
// En PHP las variables nacen con $ y el operador de asignación es =
$usuario_valido = "diego.obando";

// Guardamos en el "baúl" de la sesión
$_SESSION['username'] = $usuario_valido;
$_SESSION['rol'] = "administrador";
$_SESSION['ultimo_acceso'] = date("Y-m-d H:i:s");

echo "Sesión iniciada para " . $_SESSION['username'];
?>
```

**Paso 2: Recuperar datos (ej: `dashboard.php`)**
```php
<?php
session_start(); // Obligatorio para recuperar el "baúl"

// Validación de seguridad: ¿Existe la variable en la sesión?
if (!isset($_SESSION['username'])) {
    // Si no existe, lo mandamos de vuelta al login
    header("Location: login.php");
    exit();
}
?>
<!DOCTYPE html>
<html>
<body>
    <h1>Bienvenido, <?php echo $_SESSION['username']; ?></h1>
    <p>Tu rol es: <?php echo $_SESSION['rol']; ?></p>
</body>
</html>
```

### 3.4 IA para Auditoría de Seguridad (Huella IA)
Los sistemas de sesiones antiguos suelen tener "agujeros" de seguridad graves. El agente de IA es excelente detectando estas fallas en código legacy.
- **Estrategia:** tomar un archivo de autenticación PHP y pedirle a la IA: *"Analiza este flujo de sesión: ¿Qué riesgos de secuestro de sesión (hijacking) detectas y qué funciones modernas de PHP (como session_regenerate_id) recomendarías añadir sin cambiar la lógica original?"*.
- **Aprendizaje:** el alumno aprende a no confiar en el código solo porque "funciona", sino a auditarlo sistemáticamente.

## Producto o evidencia del bloque
- Explicar la ruta que sigue el `PHPSESSID` desde que el servidor lo genera hasta que el navegador lo devuelve.
- Escribir un snippet de código que verifique si un usuario es "administrador" antes de mostrar un botón de "Eliminar".
- Identificar por qué usar `session_destroy();` es un paso obligatorio en un archivo de `logout.php`.

---

# BLOQUE 4: Mantenimiento Quirúrgico de un CRUD en PHP

- **Duración:** 35 minutos
- **Objetivo del bloque:** aplicar modificaciones controladas y precisas sobre un sistema PHP funcional, respetando la lógica preexistente y utilizando la IA para diagnosticar dependencias.
- **Modalidad:** caso de estudio, simulación de mantenimiento y validación de cambios.

## Desarrollo

### 4.1 Anatomía de un CRUD Legacy (El "Todo-en-Uno")
A diferencia de FastAPI donde el código está repartido en carpetas (schemas, routers, core), en un CRUD legacy de PHP como `editar_producto.php` todo suele vivir en el mismo archivo.
- **Estructura típica:**
    1.  **Cabecera (Líneas 1-15):** Conexión con `mysqli_connect` o `include('config.php')`.
    2.  **Lógica POST (Líneas 16-40):** El bloque que procesa el formulario: `if ($_POST) { ... UPDATE productos SET ... }`.
    3.  **Consulta inicial (Líneas 41-50):** El `SELECT` para cargar los datos actuales del producto.
    4.  **Vista HTML (Líneas 51+):** El formulario con los valores ya inyectados mediante `echo`.

### 4.2 El Axioma en Acción: "No Borrarás"
El mantenimiento quirúrgico dicta que si el sistema funciona, nuestra intervención debe ser mínima.
- **Escenario:** "El cliente necesita agregar el campo 'Stock Mínimo' al formulario".
- **Procedimiento:**
    1.  **Lectura:** no borramos el archivo. Identificamos en qué línea se define la consulta `UPDATE`.
    2.  **Respeto al Estilo:** si el autor original usó comillas simples y `mysqli`, nosotros usamos comillas simples y `mysqli`.
    3.  **Inyección:** agregamos la nueva variable `$stock_minimo` y la inyectamos en la query SQL y en el input HTML.

### 4.3 Integración: El Agente como Consultor Quirúrgico
Un error común es pedirle a la IA que "modernice" el código. Esto suele romper las conexiones o sesiones.
- **Prompt Quirúrgico (Correcto):** *"Tengo este archivo PHP que edita usuarios. Identifica dónde se procesa el UPDATE SQL y genera el snippet necesario para añadir el campo 'telefono' tanto en la query como en el formulario HTML, manteniendo el uso de la variable $conn existente"*.
- **Validación:** el desarrollador debe verificar que la IA no haya intentado "limpiar" el código borrando funciones antiguas que el sistema todavía necesita.

### 4.4 La Prueba de Fuego: Trazabilidad y Humo
Cualquier cambio en un sistema legado debe terminar con un **Smoke Test** (Prueba de Humo):
1.  **Carga:** ¿La página abre sin errores de sintaxis?
2.  **Operación:** ¿Se guardó el nuevo dato en la base de datos?
3.  **Trazabilidad:** documentar el cambio exactamente. Ejemplo: *"Se añade campo stock_min en líneas 22 (POST), 35 (SQL) y 89 (HTML)"*.

## Producto o evidencia del bloque
- Realizar un "diff" mental comparando el código original de un CRUD y su versión intervenida quirúrgicamente.
- Explicar por qué es más seguro mantener una conexión `mysqli` antigua que intentar forzar una arquitectura de capas moderna dentro de un solo archivo legacy.
- Identificar en qué parte de un script PHP es más probable que un cambio rompa la integridad del sistema.

---

# Cierre de la Clase

## Síntesis Final
- **Legacy como Activo:** el código antiguo no es basura, es un sistema en producción que requiere respeto y entendimiento.
- **Arquitectura de Archivos:** entender que en PHP puro, la ruta es el archivo físico y las capas suelen estar fusionadas.
- **Sesiones:** el servidor recuerda quién eres gracias a `session_start()` y una cookie en el navegador.
- **Mantenimiento Quirúrgico:** aplicamos el Axioma de Integridad: entendemos, mapeamos e intervenimos sin destruir.

## Próximo Paso
Mañana profundizaremos en **Arquitectura MVC y Buenas Prácticas**. Aprenderemos cómo el caos del código legacy fue el motor para inventar patrones de diseño que separan definitivamente la lógica de la vista.
