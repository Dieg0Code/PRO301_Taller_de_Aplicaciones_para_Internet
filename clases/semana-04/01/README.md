# Clase 01 - Semana 04 - JavaScript Moderno: ES6+, Módulos, Asincronía, Promesas y Manejo de Errores

- Unidad 02: Frontend Moderno, APIs y Legado
- Fecha: Lunes 6 de abril de 2026
- Duración: 3 horas (10:50 - 13:10)
- Modalidad: Presencial en Laboratorio PC
- Docente: Diego Obando

---

# Objetivos de la Clase

## Objetivo General

Al terminar esta clase, el estudiante podrá comprender y aplicar las características centrales de JavaScript moderno (ES6+) para escribir código más expresivo y modular, y manejar operaciones asíncronas con Promises y async/await como base para trabajar con APIs reales.

## Objetivos Específicos

Al finalizar la sesión, el estudiante será capaz de:

1. Reconocer y usar sintaxis ES6+ —`let`/`const`, arrow functions, destructuring, template literals, spread— explicando qué problema concreto resuelve cada construcción frente a la sintaxis anterior.
2. Organizar código en módulos con `import`/`export`, distinguiendo cuándo y por qué separar responsabilidades en archivos independientes.
3. Explicar qué es la asincronía en JavaScript, por qué existe y cómo el event loop determina el orden de ejecución de las operaciones.
4. Escribir y leer código con Promises y `async`/`await` para manejar operaciones diferidas, incorporando manejo de errores con `try`/`catch`.
5. Identificar qué puede generar bien un agente al trabajar con código ES6+ o asincronía, y qué requiere comprensión propia para validar sin delegar el criterio técnico.

## Competencias Transversales

- Lectura de código moderno: reconocer patrones ES6+ en código real sin necesidad de haberlos escrito primero, como habilidad base para trabajar sobre código existente.
- Razonamiento sobre flujo asíncrono: seguir mentalmente el orden de ejecución de un programa que tiene operaciones diferidas, antes de ejecutarlo.
- Validación técnica: usar consola y navegador para comprobar el comportamiento real del código, no solo confiar en que compila sin errores.
- Uso responsable de IA/agentes: apoyarse en agentes para acelerar la escritura o explicación de código moderno, verificando siempre la lógica, el orden de ejecución y el manejo de errores de forma manual.


---

# BLOQUE 1: El salto a JavaScript moderno

- Duración: 30 minutos
- Objetivo del bloque: comprender por qué existe ES6+ y qué problemas concretos vino a resolver, reconociendo las construcciones sintácticas más importantes del lenguaje moderno antes de escribirlas con fluidez.
- Modalidad: expositiva, conversada y con lectura guiada de fragmentos de código

## Desarrollo

### 1.1 JavaScript antes de ES6: el lenguaje que todos criticaban

Durante muchos años, JavaScript fue el lenguaje que los desarrolladores usaban porque no había otra opción en el navegador, no porque lo eligieran con gusto.

El problema no era arbitrario: la sintaxis heredada tenía varios comportamientos que generaban errores difíciles de detectar.

Algunos ejemplos concretos:

- `var` declaraba variables con alcance de función, no de bloque, lo que provocaba que una variable declarada dentro de un `if` siguiera existiendo fuera de él.
- Era posible redeclarar la misma variable múltiples veces sin error.
- Las funciones anónimas tenían una sintaxis verbosa que hacía el código más difícil de leer.
- Concatenar texto con valores era incómodo y propenso a errores.
- Extraer propiedades de objetos o elementos de arreglos requería varias líneas de asignación.

```js
// JS antes de ES6
var nombre = "Ana";
var saludo = "Hola, " + nombre + ". Bienvenida.";

function sumar(a, b) {
  return a + b;
}

var usuario = { nombre: "Ana", edad: 25 };
var n = usuario.nombre;
var e = usuario.edad;
```

Ese estilo funcionaba, pero era difícil de mantener a escala y acumulaba confusiones.

### 1.2 ES6 en 2015: la renovación del lenguaje

En 2015, la especificación ECMAScript 2015 —conocida como ES6— introdujo una serie de cambios profundos que transformaron la forma de escribir JavaScript.

Desde entonces, el lenguaje ha seguido evolucionando cada año (ES7, ES8, ES2020, ES2022...), pero ES6 marcó el punto de inflexión. Cuando hoy se habla de "JavaScript moderno", casi siempre se habla de ES6 en adelante.

Las construcciones más importantes que introdujo o consolidó:

- `let` y `const` para declarar variables con alcance de bloque.
- Arrow functions para escribir funciones de forma más concisa.
- Template literals para interpolar texto sin concatenación.
- Destructuring para extraer valores de objetos y arreglos de forma directa.
- Spread operator para expandir elementos o combinar estructuras.
- Módulos (`import`/`export`) para organizar el código en archivos separados.
- Promises para manejar operaciones asíncronas de forma más legible.

Este bloque cubre las primeras cinco. Módulos y asincronía tienen sus propios bloques.

### 1.3 Las construcciones clave de ES6+

#### `let` y `const`

`let` declara una variable que puede reasignarse. `const` declara una variable que no puede reasignarse una vez definida. Ambas tienen alcance de bloque.

```js
const nombre = "Ana";
let intentos = 0;

intentos = 1; // válido
nombre = "Luis"; // error: no se puede reasignar una const
```

Regla práctica: usar `const` por defecto. Usar `let` solo cuando el valor va a cambiar. Evitar `var` en código nuevo.

#### Arrow functions

Sintaxis más corta para funciones. Cuando el cuerpo es una sola expresión, se puede omitir `return` y las llaves.

```js
// función tradicional
function sumar(a, b) {
  return a + b;
}

// arrow function equivalente
const sumar = (a, b) => a + b;

// con cuerpo complejo
const procesar = (lista) => {
  const filtrada = lista.filter(x => x > 0);
  return filtrada.length;
};
```

Las arrow functions también tienen un comportamiento distinto con `this`, lo que se vuelve relevante al trabajar con objetos y clases. Por ahora, lo importante es reconocer la sintaxis y leerla sin confusión.

#### Template literals

Permiten interpolar expresiones dentro de un string usando backticks y `${}`.

```js
const nombre = "Ana";
const edad = 25;

// antes
const mensaje = "Hola, " + nombre + ". Tienes " + edad + " años.";

// con template literals
const mensaje = `Hola, ${nombre}. Tienes ${edad} años.`;
```

También permiten strings multilínea sin concatenación ni `\n` explícito.

#### Destructuring

Permite extraer valores de objetos o arreglos directamente en variables con nombre.

```js
const usuario = { nombre: "Ana", edad: 25, ciudad: "Santiago" };

// antes
const nombre = usuario.nombre;
const edad = usuario.edad;

// con destructuring
const { nombre, edad } = usuario;

// en arreglos
const colores = ["rojo", "verde", "azul"];
const [primero, segundo] = colores;
```

Muy habitual en respuestas de APIs, props de componentes y configuración.

#### Spread operator

Permite expandir los elementos de un arreglo u objeto dentro de otro.

```js
const base = [1, 2, 3];
const extendido = [...base, 4, 5]; // [1, 2, 3, 4, 5]

const config = { tema: "oscuro", idioma: "es" };
const configActualizada = { ...config, idioma: "en" }; // sobreescribe idioma
```

Muy útil para combinar estructuras sin mutar las originales.

### Preguntas guía

- ¿Qué diferencia práctica existe entre `let` y `const` al momento de declarar una variable?
- Mirando este código, ¿pueden leerlo sin haberlo escrito antes?: `const total = precios.reduce((acc, p) => acc + p, 0);`
- ¿En qué situación del trabajo cotidiano sería útil usar destructuring sobre una respuesta de API?

### Huella metodológica IA/agentes

Un agente puede generar fragmentos ES6+ sin problema. Pero para usarlo bien en este contexto, conviene saber leer el código que produce.

Si se le pide "refactorizar esta función a sintaxis moderna", el resultado puede ser correcto o puede introducir un cambio en el comportamiento de `this` con arrow functions que no sea evidente a primera vista.

El patrón mínimo: el agente puede proponer la versión moderna, pero la revisión de alcance de variables, reasignación y comportamiento debe hacerse con criterio propio.

### Cierre del bloque

- Idea clave: ES6+ no es "una versión más" de JavaScript. Es el punto desde donde el lenguaje se volvió más legible, más seguro y más cercano a cómo trabaja realmente el ecosistema actual.
- Puente: la siguiente pieza importante de esa modernización es la organización del código. Con estas herramientas sintácticas ya disponibles, ¿cómo se estructura un proyecto que crece más allá de un solo archivo?

---

# BLOQUE 2: Módulos — organizar el código en archivos con propósito

- Duración: 30 minutos
- Objetivo del bloque: comprender qué es un módulo en JavaScript, cómo funciona `import`/`export` en la práctica y por qué separar responsabilidades en archivos independientes es una decisión de diseño, no solo de orden.
- Modalidad: expositiva con ejemplos guiados y lectura de estructura de proyecto real

## Desarrollo

### 2.1 El problema del archivo único

Al empezar a trabajar con JavaScript, es natural poner todo el código en un solo archivo. Mientras el proyecto es pequeño, eso funciona.

El problema aparece cuando el código crece:

- es difícil encontrar una función específica entre cientos de líneas;
- cambiar una parte puede romper otra sin que sea obvio;
- el archivo se convierte en un lugar donde conviven cosas que no tienen relación entre sí;
- y trabajar en equipo sobre el mismo archivo genera conflictos constantes.

Un ejemplo típico de cómo se ve eso:

```js
// app.js — todo junto, sin separación
function validarEmail(email) { ... }
function calcularDescuento(precio, porcentaje) { ... }
function renderizarTarjeta(producto) { ... }
function obtenerProductos() { ... }
function manejarFormulario(evento) { ... }
```

Funciones de validación, cálculo, renderizado y comunicación con datos conviviendo en el mismo archivo. A medida que el proyecto crece, esto se vuelve difícil de mantener.

Los módulos son la respuesta a ese problema.

### 2.2 Qué es un módulo y qué cambia

Un módulo es un archivo JavaScript que tiene un propósito claro y controla explícitamente qué expone al resto del código y qué mantiene privado.

En lugar de poner todo junto, se divide el código por responsabilidad:

```
proyecto/
├── utils/
│   └── validaciones.js    ← lógica de validación
├── servicios/
│   └── productos.js       ← comunicación con datos
├── ui/
│   └── tarjeta.js         ← renderizado de interfaz
└── main.js                ← punto de entrada
```

Cada archivo sabe qué necesita importar y qué necesita exportar. El resto queda encapsulado.

### 2.3 `export` e `import` en la práctica

#### Exportar una función o valor

```js
// validaciones.js
export function validarEmail(email) {
  return email.includes("@") && email.includes(".");
}

export const LIMITE_INTENTOS = 3;
```

#### Importar en otro archivo

```js
// main.js
import { validarEmail, LIMITE_INTENTOS } from "./utils/validaciones.js";

const resultado = validarEmail("ana@ejemplo.com");
console.log(resultado); // true
```

#### Export default

Cuando un módulo tiene una única exportación principal, se puede usar `export default`:

```js
// tarjeta.js
export default function renderizarTarjeta(producto) {
  return `<div class="tarjeta">${producto.nombre}</div>`;
}
```

```js
// main.js
import renderizarTarjeta from "./ui/tarjeta.js";
```

La diferencia práctica: los exports nombrados se importan con llaves `{}`, el export default se importa sin llaves y con el nombre que se quiera.

#### Re-exportar desde un índice

Un patrón muy habitual es tener un archivo `index.js` que agrupa las exportaciones de una carpeta:

```js
// utils/index.js
export { validarEmail } from "./validaciones.js";
export { formatearFecha } from "./fechas.js";
export { calcularDescuento } from "./calculos.js";
```

```js
// main.js
import { validarEmail, formatearFecha } from "./utils/index.js";
```

Esto simplifica los imports en los archivos consumidores.

### 2.4 Módulos en el navegador y en Node

Los módulos ES6 funcionan tanto en el navegador (con `type="module"` en el script) como en Node.js (con extensión `.mjs` o configuración en `package.json`).

```html
<!-- index.html -->
<script type="module" src="main.js"></script>
```

Sin `type="module"`, el navegador no reconoce `import`/`export` y arroja un error de sintaxis. Es un detalle pequeño pero que genera confusión frecuente al empezar.

### Actividad o chequeo

Dado este árbol de archivos, ¿cómo importarían `calcularTotal` desde `main.js`?

```
src/
├── logica/
│   └── carrito.js   ← contiene export function calcularTotal(items) { ... }
└── main.js
```

Respuesta esperada: `import { calcularTotal } from "./logica/carrito.js";`

### Huella metodológica IA/agentes

Un agente puede proponer la estructura de módulos de un proyecto en segundos. Eso puede ser útil como punto de partida.

Lo que no conviene delegar: la decisión de qué responsabilidades van juntas y cuáles se separan. Esa es una decisión de diseño que depende del dominio del problema, del tamaño del equipo y de cómo va a crecer el proyecto. Un agente puede sugerir, pero la persona que entiende el contexto es quien debe validar si la separación tiene sentido o si solo agrega complejidad innecesaria.

### Cierre del bloque

- Idea clave: los módulos no son solo una forma de "ordenar" archivos. Son una herramienta de diseño que define qué partes del código son visibles, reutilizables y separables. Eso importa cuando el proyecto crece y cuando se trabaja en equipo.
- Puente: ahora que el código puede organizarse bien, hay una dimensión del lenguaje que todavía no hemos tocado y que cambia completamente cómo se piensa la ejecución: ¿qué pasa cuando una operación tarda en completarse?

---

# BLOQUE 3: La asincronía — qué es y por qué JavaScript la necesita

- Duración: 30 minutos
- Objetivo del bloque: comprender qué significa que una operación sea asíncrona, por qué JavaScript ejecuta en una sola hebra y cómo el event loop permite manejar operaciones diferidas sin bloquear el programa.
- Modalidad: expositiva y conversada, con lectura de fragmentos cortos y observación en consola

## Desarrollo

### 3.1 El problema: algunas operaciones tardan

Hasta ahora, todo el código que vimos se ejecuta línea por línea, en orden, sin esperar nada.

Eso funciona bien para cálculos, transformaciones de datos y manipulación de estructuras. Pero hay una categoría de operaciones que tiene una característica diferente: tardan en completarse porque dependen de algo externo.

Algunos ejemplos concretos:

- pedir datos a una API: el servidor puede tardar 200ms, 2 segundos o más;
- leer un archivo del sistema;
- esperar que el usuario complete una acción;
- consultar una base de datos.

Si el lenguaje esperara cada una de esas operaciones antes de continuar, toda la interfaz quedaría congelada mientras tanto. El usuario vería una página bloqueada, sin posibilidad de interactuar.

JavaScript resuelve esto con asincronía: puede iniciar una operación que tarda, continuar ejecutando el resto del código, y retomar esa operación cuando su resultado esté disponible.

### 3.2 JavaScript tiene una sola hebra de ejecución

A diferencia de otros lenguajes que pueden ejecutar múltiples cosas al mismo tiempo en paralelo, JavaScript opera con una sola hebra de ejecución. Eso significa que solo puede hacer una cosa a la vez.

Esto genera una pregunta válida: ¿cómo puede entonces manejar operaciones que tardan sin bloquearse?

La respuesta está en cómo está construido el entorno de ejecución. El navegador (o Node.js) tiene partes externas al motor de JavaScript que pueden manejar ciertas operaciones: timers, peticiones de red, eventos del sistema. Cuando esas operaciones terminan, avisan al motor a través del event loop.

### 3.3 El event loop: cómo JavaScript sabe qué ejecutar a continuación

El event loop es el mecanismo que coordina qué se ejecuta y cuándo. Funciona con dos estructuras principales:

- **Call stack (pila de llamadas):** donde se apilan las funciones que se están ejecutando en este momento. Cuando una función termina, sale de la pila.
- **Task queue (cola de tareas):** donde esperan las funciones que quieren ejecutarse cuando el call stack esté vacío — típicamente, callbacks de operaciones asíncronas que ya terminaron.

El event loop hace una sola cosa: revisa continuamente si el call stack está vacío. Si lo está, toma la siguiente tarea de la cola y la ejecuta.

Un diagrama simplificado del flujo:

```
Código JavaScript
      ↓
  Call Stack         ← ejecuta funciones síncronas
      ↓
  APIs del entorno   ← maneja operaciones externas (fetch, timers, etc.)
      ↓
  Task Queue         ← acumula callbacks listos para ejecutarse
      ↓
  Event Loop         ← mueve tareas de la cola al stack cuando está libre
```

### 3.4 El comportamiento que sorprende a todos al principio

El event loop explica un comportamiento que confunde a quienes empiezan con asincronía:

```js
console.log("1 — antes");

setTimeout(() => {
  console.log("2 — dentro del timeout");
}, 0);

console.log("3 — después");
```

¿Qué imprime esto y en qué orden?

```
1 — antes
3 — después
2 — dentro del timeout
```

Aunque el timeout es de 0 milisegundos, la función dentro no se ejecuta de inmediato. Se envía a la task queue, y solo se ejecuta cuando el call stack está vacío — es decir, cuando el código síncrono ya terminó.

Este es el primer momento donde el orden de ejecución deja de ser puramente de arriba hacia abajo.

### 3.5 Callbacks: la primera solución y sus límites

Antes de las Promises, el mecanismo para manejar asincronía en JavaScript eran los callbacks: funciones que se pasan como argumento y se ejecutan cuando la operación termina.

```js
function obtenerDatos(url, callback) {
  // simula una llamada asíncrona
  setTimeout(() => {
    const datos = { nombre: "Ana", edad: 25 };
    callback(datos);
  }, 1000);
}

obtenerDatos("/api/usuario", function(datos) {
  console.log(datos.nombre); // "Ana"
});
```

Esto funciona. El problema aparece cuando hay que encadenar varias operaciones asíncronas que dependen entre sí:

```js
obtenerUsuario(id, function(usuario) {
  obtenerPedidos(usuario.id, function(pedidos) {
    obtenerDetalle(pedidos[0].id, function(detalle) {
      calcularTotal(detalle, function(total) {
        mostrarResultado(total);
      });
    });
  });
});
```

Esto tiene un nombre: **callback hell**. El código se anida cada vez más hacia la derecha, se vuelve difícil de leer, de debuggear y de mantener.

Las Promises vinieron a resolver exactamente esto.

### Verificación de comprensión

- ¿Por qué JavaScript no puede simplemente "esperar" a que una operación termine antes de continuar?
- En el ejemplo de `setTimeout` con 0ms, ¿por qué el mensaje dentro del timeout aparece después del mensaje síncrono que viene después?
- ¿Qué problema concreto tienen los callbacks cuando hay que encadenar varias operaciones dependientes?

### Huella metodológica IA/agentes

La asincronía es uno de los temas donde más ayuda puede dar un agente y donde más criterio propio se necesita al mismo tiempo.

Un agente puede explicar el event loop, proponer ejemplos y refactorizar código con callbacks a Promises. Eso es útil.

Lo que no puede reemplazar: seguir mentalmente el orden de ejecución de un fragmento concreto. Si un estudiante no entiende por qué el `console.log` aparece antes del resultado del `fetch`, no puede detectar errores de orden en su propio código, aunque el agente lo haya generado.

El patrón mínimo en este tema: el agente puede proponer el código asíncrono, pero la lectura del orden de ejecución y la validación en consola son responsabilidad humana obligatoria.

### Cierre del bloque

- Idea clave: JavaScript no es lento ni limitado por tener una sola hebra. El event loop le permite manejar operaciones externas sin bloquear la interfaz. Pero ese mecanismo requiere entender que el orden de ejecución ya no es siempre de arriba hacia abajo.
- Puente: los callbacks resolvieron el problema original pero crearon uno nuevo: código difícil de leer cuando las operaciones se encadenan. El bloque siguiente trabaja con la solución moderna: Promises y async/await.

---

# BLOQUE 4: Promises y async/await — la respuesta moderna al flujo asíncrono

- Duración: 30 minutos
- Objetivo del bloque: comprender cómo una Promise representa un valor futuro, cómo async/await simplifica la lectura del flujo asíncrono y cómo manejar errores con try/catch, cerrando con un ejemplo completo de fetch como puente hacia la siguiente clase.
- Modalidad: expositiva con ejemplos progresivos y lectura guiada de un caso real

## Desarrollo

### 4.1 Qué es una Promise

Una Promise es un objeto que representa el resultado eventual de una operación asíncrona. En el momento en que se crea, todavía no tiene un valor: puede estar en uno de tres estados.

- **Pending:** la operación aún no terminó.
- **Fulfilled:** la operación terminó con éxito y tiene un resultado.
- **Rejected:** la operación falló y tiene un motivo.

Una vez que una Promise pasa de `pending` a `fulfilled` o `rejected`, ese estado no cambia.

```js
const promesa = new Promise((resolve, reject) => {
  const exito = true;

  if (exito) {
    resolve("Operación completada");
  } else {
    reject("Algo salió mal");
  }
});
```

En la práctica, rara vez se construye una Promise desde cero. Lo más habitual es trabajar con funciones que ya devuelven Promises, como `fetch`.

### 4.2 Encadenar con `.then()` y `.catch()`

Una Promise expone métodos para reaccionar a su resultado:

- `.then(callback)` se ejecuta cuando la Promise se resuelve con éxito.
- `.catch(callback)` se ejecuta cuando la Promise es rechazada.
- `.finally(callback)` se ejecuta siempre, sin importar el resultado.

```js
fetch("https://api.ejemplo.com/usuarios/1")
  .then(respuesta => respuesta.json())
  .then(datos => {
    console.log(datos.nombre);
  })
  .catch(error => {
    console.error("Error al obtener datos:", error);
  })
  .finally(() => {
    console.log("Petición finalizada");
  });
```

Esto ya es mucho más legible que el callback hell del bloque anterior. Cada `.then()` recibe el resultado del anterior y lo transforma.

Pero todavía hay una forma más legible de escribir esto.

### 4.3 async/await: leer código asíncrono como si fuera síncrono

`async`/`await` es azúcar sintáctica sobre Promises. No reemplaza las Promises — las usa por debajo — pero permite escribir el flujo asíncrono con una estructura que parece código síncrono normal.

```js
async function obtenerUsuario(id) {
  const respuesta = await fetch(`https://api.ejemplo.com/usuarios/${id}`);
  const datos = await respuesta.json();
  return datos;
}
```

Reglas básicas:

- `async` marca una función como asíncrona. Toda función `async` devuelve automáticamente una Promise.
- `await` pausa la ejecución de esa función hasta que la Promise se resuelva, y devuelve el valor resultante.
- `await` solo puede usarse dentro de una función `async`.

El código se lee de arriba hacia abajo, como siempre, pero el motor sabe que hay pasos que esperan.

### 4.4 Manejo de errores con try/catch

Cuando se usa `async`/`await`, el manejo de errores se hace con `try`/`catch`, igual que con código síncrono:

```js
async function obtenerUsuario(id) {
  try {
    const respuesta = await fetch(`https://api.ejemplo.com/usuarios/${id}`);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("No se pudo obtener el usuario:", error.message);
    return null;
  }
}
```

Puntos importantes:

- `try` envuelve el código que puede fallar.
- `catch` recibe el error si algo dentro del `try` lanza una excepción.
- Es importante verificar `respuesta.ok` además de atrapar errores de red, porque `fetch` no rechaza la Promise ante errores HTTP (404, 500). Solo falla si hubo un problema de red.

### 4.5 Ejemplo completo: fetch de datos reales

Este es el patrón completo que se usará en la próxima clase al trabajar con APIs:

```js
async function cargarProductos() {
  try {
    const respuesta = await fetch("https://fakestoreapi.com/products?limit=5");

    if (!respuesta.ok) {
      throw new Error(`Error del servidor: ${respuesta.status}`);
    }

    const productos = await respuesta.json();

    productos.forEach(producto => {
      console.log(`${producto.title} — $${producto.price}`);
    });
  } catch (error) {
    console.error("Error al cargar productos:", error.message);
  }
}

cargarProductos();
```

Qué ocurre paso a paso:

1. Se hace una petición GET a la API.
2. Se espera la respuesta y se verifica que sea exitosa.
3. Se convierte el cuerpo de la respuesta a JSON.
4. Se itera sobre los productos y se muestran en consola.
5. Si algo falla en cualquier punto, el error queda contenido en el `catch`.

Este fragmento puede ejecutarse directamente en la consola del navegador o en un archivo con `type="module"`.

### Producto o evidencia del bloque

Al cerrar este bloque, el estudiante debería poder:

- leer un fragmento con `async`/`await` y seguir el flujo sin confundirse;
- identificar dónde puede fallar el código y qué captura el `catch`;
- explicar por qué `fetch` necesita dos `await` (uno para la respuesta, otro para el JSON).

### Huella metodológica IA/agentes

Un agente puede escribir código con `async`/`await` rápidamente y sin errores de sintaxis. Es una de las tareas donde su ayuda es más directa.

Lo que requiere criterio propio: entender si el manejo de errores es correcto. Un agente puede generar código que captura excepciones de red pero no verifica `respuesta.ok`, o que ignora el estado HTTP. Esos son errores silenciosos: el código funciona, pero falla sin aviso ante respuestas 404 o 500.

El patrón mínimo: el agente puede generar la función asíncrona, pero la revisión del manejo de errores y la validación del estado HTTP son verificaciones que no se pueden delegar.

### Cierre del bloque

- Idea clave: `async`/`await` no es un nuevo mecanismo de asincronía, es una forma más legible de trabajar con Promises. Detrás siempre hay una Promise. Entender eso permite leer errores, encadenar operaciones y manejar casos de fallo con criterio.
- Puente: la próxima clase aplica todo esto en un contexto concreto: formularios, validación y consumo de APIs para renderizar datos en una interfaz real.

---

# Cierre de la Clase

## Síntesis Final

- JavaScript moderno (ES6+) resolvió problemas reales del lenguaje con sintaxis más expresiva, modular y menos propensa a errores. Las construcciones clave —`let`/`const`, arrow functions, template literals, destructuring, spread— ya son el estándar del ecosistema actual.
- Los módulos permiten organizar el código por responsabilidad, controlar qué se expone y qué se encapsula, y trabajar en proyectos que crecen sin perder legibilidad.
- La asincronía en JavaScript no es magia: es el event loop coordinando operaciones externas sin bloquear la hebra principal. Entender ese mecanismo es condición para leer y depurar código moderno.
- Promises y `async`/`await` son la forma actual de manejar flujos diferidos. Su correcta aplicación incluye siempre una estrategia de manejo de errores.

## Preguntas de Salida

- ¿En qué se diferencia una función `async` de una función normal en cuanto a lo que devuelve?
- Si un `fetch` devuelve un status 404, ¿el `catch` lo captura automáticamente? ¿Por qué?
- ¿Qué ventaja concreta tiene `async`/`await` sobre encadenar `.then()` al leer código?

## Próximo Paso

La próxima clase aplica este marco sobre un caso real: formularios con validación, consumo de una API pública y renderizado de datos en la interfaz. El patrón `async`/`await` + `fetch` que vimos hoy será el punto de partida.






