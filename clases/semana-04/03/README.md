# Clase 03 - Semana 04 - Formularios, Validación y Consumo de APIs en Interfaces Modernas

- Unidad 02: Frontend Moderno, APIs y Legado
- Fecha: Miércoles 8 de abril de 2026
- Duración: 3 horas (10:50 - 13:10)
- Modalidad: Presencial en Laboratorio PC
- Docente: Diego Obando

---

# Objetivos de la Clase

## Objetivo General

Al terminar esta clase, el estudiante podrá dominar la gestión de formularios interactivos y la integración de datos provenientes de APIs externas en un entorno de frontend basado en componentes, reconociendo la importancia de la validación, el manejo de la asincronía y el feedback al usuario para construir aplicaciones profesionales.

## Objetivos Específicos

Al finalizar la sesión, el estudiante será capaz de:

1.  **Vincular el estado del componente con elementos de formulario**, transformando inputs nativos en "componentes controlados" para garantizar una única fuente de verdad en los datos.
2.  **Implementar lógicas de validación en el cliente**, distinguiendo entre errores de formato (ej. email inválido) y reglas de negocio, y comunicándolos visualmente de forma efectiva.
3.  **Realizar peticiones asíncronas a APIs REST reales** utilizando `fetch`, comprendiendo el flujo de datos desde la solicitud hasta el renderizado del JSON resultante.
4.  **Gestionar estados de carga y error (UI States)**, asegurando que la interfaz informe al usuario sobre el proceso de red en curso o fallos inesperados.
5.  **Utilizar agentes de IA de forma experta** para generar estructuras de validación o maquetar interfaces de datos, validando manualmente la integridad de las respuestas del servidor y la seguridad de los datos.

## Competencias Transversales

- **Precisión en la gestión de datos:** reconocer que la integridad de lo que el usuario escribe es responsabilidad del desarrollador antes de enviarlo al servidor.
- **Pensamiento asíncrono:** entender que el tiempo de red es incierto y que la interfaz debe ser capaz de manejar la espera sin bloquearse.
- **Inspección técnica profunda:** utilizar las herramientas de red de DevTools para auditar peticiones, respuestas y códigos de estado HTTP.
- Uso responsable de IA/agentes: apoyarse en agentes para acelerar tareas repetitivas (como regex de validación o maquetación de tablas), verificando siempre que la lógica sugerida no comprometa la seguridad o la experiencia de usuario.

---

# BLOQUE 1: El Formulario como Estado: Componentes Controlados

- **Duración:** 35 minutos
- **Objetivo del bloque:** comprender el concepto de "Componentes Controlados", vinculando el valor de los inputs al estado del componente para garantizar que la interfaz y los datos estén siempre sincronizados.
- **Modalidad:** expositiva, demostración técnica y análisis de fragmentos de código.

## Desarrollo

### 1.1 El conflicto de las "Dos Verdades"
En el desarrollo web tradicional (HTML + JS suelto), un input guarda su propio valor internamente en el DOM. Si queremos saber qué escribió el usuario, debemos "ir a buscarlo" (ej. `document.querySelector('#input').value`).

En el frontend moderno basado en componentes, este enfoque genera problemas:
- Los datos y la vista pueden desincronizarse.
- Es difícil validar datos mientras el usuario escribe.
- El componente no "sabe" qué tiene el input hasta que intentamos leerlo.

La solución es que el componente sea el dueño absoluto del dato.

### 1.2 Componentes Controlados: El contrato Value + OnChange
Un componente controlado es aquel cuyo valor es manejado por el estado de React (o el framework equivalente). Para lograr esto, establecemos un contrato de dos vías:

1.  **value:** El input recibe su valor desde una variable de estado (`state`).
2.  **onChange:** Cada vez que el usuario presiona una tecla, se dispara un evento que actualiza esa variable de estado.

**Resultado:** El input no tiene "vida propia"; es simplemente un reflejo del estado. Si el estado dice "Hola", el input muestra "Hola".

### 1.3 Anatomía del código: El objeto Evento
Para capturar lo que el usuario escribe, utilizamos el objeto de evento (`e` o `event`).

```jsx
function Formulario() {
  const [nombre, setNombre] = useState("");

  const handleChange = (e) => {
    // e.target representa al input que disparó el evento
    // e.target.value es el texto actual dentro de la caja
    setNombre(e.target.value);
  };

  return (
    <input 
      type="text" 
      value={nombre} 
      onChange={handleChange} 
    />
  );
}
```

Este patrón permite que, por cada letra presionada, el componente se re-renderice, manteniendo la "Única Fuente de Verdad" (*Single Source of Truth*).

### 1.4 Ventajas arquitectónicas
¿Por qué nos tomamos la molestia de controlar cada input?
- **Validación instantánea:** Podemos mostrar un error en el momento exacto en que el usuario escribe algo inválido.
- **Transformación de datos:** Podemos forzar a que un campo sea siempre mayúsculas o que solo acepte números en tiempo real.
- **UI Reactiva:** Podemos habilitar o deshabilitar botones de envío automáticamente si el estado detecta que los campos están vacíos.

### Producto o evidencia del bloque
Al cerrar este bloque, el estudiante debería poder:
- Explicar por qué el DOM no debe ser el dueño del valor de un input en aplicaciones modernas.
- Identificar los dos elementos necesarios para controlar un componente (`value` y `onChange`).
- Leer un fragmento de código de formulario y trazar el flujo de datos desde la tecla presionada hasta el estado.

### Preguntas guía
- Si quito la propiedad `onChange` pero dejo el `value={"Chile"}`, ¿qué pasará cuando el usuario intente escribir en el input?
- ¿Por qué decimos que un componente controlado es más "predecible" que uno no controlado?
- En un formulario de 10 campos, ¿conviene tener 10 estados sueltos o un solo objeto de estado? (Pregunta para activar el pensamiento arquitectónico).

### Huella metodológica IA/agentes
Un agente es excelente para:
- Generar funciones de manejo de cambios (`handleChange`) genéricas para formularios con muchos campos.
- Explicar por qué un input se quedó "congelado" (error común de principiante al poner `value` sin `onChange`).

**Lo que tú debes validar:**
- El agente puede sugerir usar bibliotecas externas (como Formik o React Hook Form). Antes de aceptar esa sugerencia, tú debes validar si la complejidad del formulario justifica una librería o si basta con el estado nativo para mantener el código ligero y entendible.

### Cierre del bloque
- **Idea clave:** En el frontend moderno, el estado manda sobre la vista. Si controlamos el input, controlamos la verdad de los datos.
- **Puente:** Ahora que sabemos cómo capturar el dato y guardarlo en el estado, el siguiente paso es asegurar que ese dato sea correcto antes de procesarlo. Entramos al mundo de la validación.

---

# BLOQUE 2: Validación y Feedback: Diseñando una UX robusta

- **Duración:** 35 minutos
- **Objetivo del bloque:** implementar lógicas de validación en componentes controlados y diseñar sistemas de feedback visual que guíen al usuario durante la carga de datos.
- **Modalidad:** demostración técnica, análisis de casos de error y buenas prácticas de UX.

## Desarrollo

### 2.1 Validación: ¿Cuándo y Cómo?
Existen dos momentos críticos para validar un formulario en el frontend:

1.  **Validación en tiempo real (OnChange):** Ideal para errores de formato simples (ej. el campo no puede tener números, o el largo mínimo de la contraseña). Da feedback instantáneo.
2.  **Validación al enviar (OnSubmit):** Necesaria para verificar el conjunto de los datos antes de hablar con el servidor. Evita el envío de formularios incompletos.

La regla de oro es: **Nunca confíes en que el usuario escribirá lo que esperas.** La validación es el filtro que protege la integridad de tu aplicación.

### 2.2 Renderizado condicional de errores
En lugar de usar alertas (`alert()`), que bloquean la experiencia, usamos el estado para mostrar mensajes dentro de la interfaz.

```jsx
function Registro() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const valor = e.target.value;
    setEmail(valor);

    // Validación en tiempo real
    if (!valor.includes("@")) {
      setError("El correo debe ser válido (ej. usuario@mail.com)");
    } else {
      setError(""); // Limpiar error si es válido
    }
  };

  return (
    <div>
      <input value={email} onChange={handleChange} />
      {/* Renderizado condicional del error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
```

### 2.3 UX: Botones reactivos y estados visuales
Un formulario profesional no solo muestra errores, sino que ayuda a prevenirlos.
- **Botón Deshabilitado:** Si el estado detecta que hay errores o campos vacíos, el botón de enviar debe estar deshabilitado (`disabled={!!error || !email}`).
- **Estados de Borde:** Cambiar el color del borde del input (rojo para error, verde para éxito) ayuda a que el usuario identifique el problema sin leer todo el texto.

### 2.4 Validación de Negocio vs. Validación de Formato
- **Formato:** ¿Tiene un @? ¿Son solo números? (Se resuelve en el cliente).
- **Negocio:** ¿Este usuario ya existe en la base de datos? (Requiere preguntar al servidor).

Esta distinción es clave para entender que la validación del frontend es una **comodidad para el usuario**, pero no reemplaza la validación final que debe ocurrir en el backend (que veremos en la Unidad 3).

## Producto o evidencia del bloque
Al cerrar este bloque, el estudiante debería poder:
- Implementar un mensaje de error que aparezca y desaparezca según el contenido de un input.
- Bloquear el envío de un formulario si los datos no cumplen con los requisitos mínimos.
- Explicar por qué la validación visual es preferible al uso de `alert()`.

## Preguntas guía
- ¿En qué caso es molesto que un formulario te valide "en tiempo real"? (Pensar en campos de RUT o tarjetas de crédito).
- Si validamos todo en el frontend, ¿significa que el backend ya no necesita validar nada?
- ¿Qué pasa con la accesibilidad cuando solo usamos colores (rojo/verde) para indicar errores? (Introducción a lectores de pantalla).

## Huella metodológica IA/agentes
Un agente es excelente para:
- Escribir expresiones regulares (Regex) complejas para validar emails, fortalezas de contraseña o formatos de RUT chileno.
- Sugerir textos de ayuda amigables para el usuario en caso de error.

**Lo que tú debes validar:**
- El agente puede sugerir lógicas de validación demasiado permisivas o demasiado estrictas. Debes probar los casos de borde (ej. ¿acepta emails con puntos extras?).
- Asegúrate de que el código generado use el estado del componente y no intente manipular el DOM directamente para mostrar los errores.

## Cierre del bloque
- **Idea clave:** Validar es acompañar al usuario. El feedback debe ser claro, oportuno y no obstructivo.
- **Puente:** Una vez que tenemos datos limpios y validados, estamos listos para lo más emocionante: enviarlos a una API real y recibir una respuesta. Entramos al mundo de la asincronía.

---

# BLOQUE 3: Consumo de APIs: Conectando la interfaz con el mundo real

- **Duración:** 35 minutos
- **Objetivo del bloque:** comprender el flujo de peticiones asíncronas utilizando `fetch` para conectar la interfaz con servicios externos, reconociendo el ciclo de vida de una solicitud de red.
- **Modalidad:** expositiva, inspección de red en DevTools y análisis de flujo asíncrono.

## Desarrollo

### 3.1 El fin de los "Datos Hardcodeados"
Hasta ahora, nuestras aplicaciones usaban datos fijos en el código. En el mundo real, los datos viven en servidores (Backends) y se consultan a través de una API.

Para traer esos datos a nuestra interfaz, usamos el protocolo HTTP mediante una herramienta nativa de los navegadores modernos: **Fetch API**.

### 3.2 La anatomía de una petición Fetch
Una petición a una API no es instantánea. Es una **Promesa**: algo que ocurrirá en el futuro (éxito o error).

```jsx
function obtenerDatos() {
  fetch("https://api.ejemplo.com/productos")
    .then(response => response.json()) // Paso 1: Convertir la respuesta a JSON
    .then(data => {
      console.log(data); // Paso 2: Usar los datos reales
    })
    .catch(error => {
      console.error("Algo falló:", error); // Paso 3: Manejar el error
    });
}
```

Lo fundamental aquí es entender el **flujo**:
1.  **Request:** Hacemos la pregunta.
2.  **Wait:** Esperamos a que la red responda (Asincronía).
3.  **Transform:** Convertimos los bits que llegan en un objeto JS legible (JSON).
4.  **Action:** Guardamos ese objeto en el **Estado** para que se vea en pantalla.

### 3.3 El puente: De JSON a Componentes
Una vez que el JSON llega, no sirve de nada si no lo guardamos en el estado.

**Patrón de miércoles:**
- El estado inicia vacío (ej. `const [productos, setProductos] = useState([])`).
- Se hace el `fetch`.
- Al llegar el JSON, llamamos a `setProductos(data)`.
- React detecta el cambio y redibuja la lista usando `.map()` (visto en la Semana 4, Clase 2).

### 3.4 Inspección Pro: Pestaña Network
Como desarrolladores de aplicaciones para Internet, nuestra mejor herramienta es la pestaña **Network (Red)** de las DevTools.
Aquí debemos enseñar a los estudiantes a vigilar:
- **Status 200:** Todo OK.
- **Status 404:** No encontrado (la URL está mal).
- **Status 500:** Error del servidor.
- **Payload:** Qué datos estamos enviando realmente.
- **Preview:** Qué datos nos respondió el servidor exactamente.

## Producto o evidencia del bloque
Al cerrar este bloque, el estudiante debería poder:
- Explicar qué es una Promesa y por qué las peticiones a APIs no son instantáneas.
- Escribir una función `fetch` básica que imprima datos en la consola.
- Localizar una petición de red en las DevTools y leer su respuesta JSON.

## Preguntas guía
- ¿Qué pasaría con la interfaz si el `fetch` demora 10 segundos y no avisamos nada al usuario?
- ¿Por qué es necesario el primer `.then(res => res.json())`? ¿No podría venir el JSON directo?
- Si la API me devuelve un error 404, ¿el código entrará al `.then()` o al `.catch()`? (Pregunta técnica para profundizar en el comportamiento de `fetch`).

## Huella metodológica IA/agentes
Un agente es excelente para:
- Explicar la estructura de un JSON complejo que devuelve una API pública.
- Ayudar a transformar un objeto JSON anidado en una lista de componentes simplificada.
- Generar "datos de prueba" (Mock data) si la API real está caída o no existe todavía.

**Lo que tú debes validar:**
- El agente puede omitir el manejo de errores (`.catch`). Tú **debes** asegurar que cada petición tenga un plan de contingencia.
- Verifica que el agente no intente usar librerías externas como `axios` si el objetivo pedagógico es dominar el `fetch` nativo primero.

## Cierre del bloque
- **Idea clave:** El frontend es solo la mitad de la historia. El `fetch` es el puente que trae la vida (los datos) desde el servidor.
- **Puente:** Los datos ya viajan, pero internet no es perfecto. ¿Qué pasa mientras esperamos? ¿Qué pasa si el WiFi se cae? Entramos al manejo de la incertidumbre.

---

# BLOQUE 4: Gestión de la Incertidumbre: Carga, errores y DevTools

- **Duración:** 35 minutos
- **Objetivo del bloque:** implementar estados de carga y manejo de errores en la interfaz para gestionar la incertidumbre de la red, asegurando una experiencia de usuario fluida y profesional.
- **Modalidad:** taller guiado, simulación de fallos de red y reflexión arquitectónica.

## Desarrollo

### 4.1 Los tres estados de la UI (Success, Loading, Error)
Una aplicación profesional nunca deja al usuario frente a una pantalla vacía. Debemos modelar nuestra interfaz para manejar tres estados posibles:

1.  **Loading:** El dato está en camino (se muestra un spinner o texto de "Cargando...").
2.  **Success:** El dato llegó y se muestra correctamente.
3.  **Error:** Algo falló (sin conexión, error de servidor, etc.) y debemos informar al usuario.

### 4.2 Implementación con Estado
Para gestionar esto, añadimos variables de control en nuestro componente:

```jsx
function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.ejemplo.com/users")
      .then(res => res.json())
      .then(data => {
        setUsuarios(data);
        setCargando(false);
      })
      .catch(err => {
        setError("No pudimos cargar los usuarios.");
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando datos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <ul>
      {usuarios.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
```

### 4.3 Simulación de incertidumbre en DevTools
No podemos esperar a que internet falle para probar nuestro código. En la pestaña **Network** de DevTools, podemos usar la opción **Throttling**:
- **Slow 3G:** Para probar cómo se ve nuestro estado de "Loading".
- **Offline:** Para probar cómo reacciona nuestra app ante un error de conexión.

### 4.4 Ética y Responsabilidad del Feedback
El manejo de errores no es solo técnico, es **humano**.
- No muestres errores técnicos crudos (ej. "Unexpected token < in JSON").
- Ofrece una acción de recuperación (ej. un botón de "Reintentar").
- Asegura que el usuario sepa que el problema es de la red y no que él "hizo algo mal".

## Producto o evidencia del bloque
Al cerrar este bloque, el estudiante debería poder:
- Implementar un condicional que muestre un mensaje de carga mientras se completa un `fetch`.
- Simular una conexión lenta en el navegador para validar la visibilidad del estado de carga.
- Escribir un mensaje de error amigable que aparezca solo cuando la petición falla.

## Preguntas guía
- ¿Por qué es mala práctica dejar la pantalla en blanco mientras esperamos datos?
- ¿Qué información mínima debería tener un mensaje de error profesional?
- En aplicaciones de alto tráfico (como Instagram), ¿por qué usan "esqueletos" (Skeletons) en lugar de un simple texto de "Cargando"?

## Huella metodológica IA/agentes
Un agente es excelente para:
- Generar componentes visuales de "Spinner" o "Skeletons" con puro CSS.
- Redactar mensajes de error amigables y profesionales según el contexto de la app.

**Lo que tú debes validar:**
- El agente puede olvidar resetear el estado de carga (`setCargando(false)`) dentro del `.catch`. Tú **debes** verificar que el spinner no se quede girando infinitamente si ocurre un error.

## Cierre del bloque
- **Idea clave:** La calidad de una app se mide por cómo maneja los momentos en que las cosas NO salen bien.
- **Puente:** Con esto cerramos el ciclo del frontend interactivo. En la próxima clase, daremos el salto al otro lado del muro: empezaremos a entender cómo se construyen esos servidores a los que hoy les pedimos datos.

---

# Cierre de la Clase

## Síntesis Final
- **Componentes Controlados:** Hemos pasado de inputs libres a inputs gobernados por el estado, logrando una sincronización perfecta entre lo que el usuario ve y lo que el código procesa.
- **Validación:** Entendimos que validar es un acto de diseño de experiencia (UX) y que el feedback debe ser inmediato y claro.
- **Asincronía y Fetch:** Aprendimos a pedir datos al mundo real, comprendiendo que internet tiene tiempos y que nuestro código debe saber esperar (Promesas).
- **Gestión de UI States:** Una aplicación profesional maneja el éxito, la espera y el fallo con la misma elegancia.

## Preguntas de Salida
- ¿Qué significa que un componente sea el "dueño" de la verdad de un formulario?
- Si una API nos devuelve un código 500, ¿nuestro código entrará al segundo `.then` o al `.catch`?
- ¿Cuál es la diferencia entre una validación de formato y una de negocio?
- ¿Por qué es fundamental usar las DevTools para probar nuestra aplicación en condiciones de red "no ideales"?

## Próximo Paso
La **Semana 05** nos lleva al **Backend**. Dejaremos de consumir APIs ajenas para empezar a entender los fundamentos de cómo se diseñan las nuestras: REST, JSON, capas de aplicación y el lenguaje del servidor.
