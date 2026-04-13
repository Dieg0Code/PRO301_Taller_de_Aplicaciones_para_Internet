# Clase 02 - Semana 04 - Frontend Basado en Componentes: Routing, Props, Estado y Composición

- Unidad 02: Frontend Moderno, APIs y Legado
- Fecha: Martes 7 de abril de 2026
- Duración: 3 horas (10:50 - 13:10)
- Modalidad: Presencial en Laboratorio PC
- Docente: Diego Obando

---

# Objetivos de la Clase

## Objetivo General

Al terminar esta clase, el estudiante podrá comprender el modelo de frontend basado en componentes y aplicarlo para estructurar interfaces con routing, props, estado y composición, reconociendo cómo estas piezas organizan aplicaciones modernas más allá del HTML aislado o del JavaScript suelto.

## Objetivos Específicos

Al finalizar la sesión, el estudiante será capaz de:

1. Explicar qué significa pensar una interfaz como un árbol de componentes, distinguiendo responsabilidad, reutilización y composición frente a una página construida como un bloque único.
2. Reconocer el rol del routing en una aplicación frontend moderna, entendiendo cómo organiza vistas, navegación y estructura general del proyecto.
3. Diferenciar props y estado, identificando qué información llega desde afuera de un componente y qué información cambia dentro de su propio ciclo de interacción.
4. Leer ejemplos simples de componentes con props, estado y composición, siguiendo el flujo de datos sin confundir estructura visual con responsabilidad lógica.
5. Identificar qué puede acelerar bien un agente al trabajar con componentes, routing o estado inicial, y qué sigue requiriendo criterio propio para validar diseño, flujo y legibilidad.

## Competencias Transversales

- Lectura de interfaces modernas: reconocer que una pantalla actual no suele construirse como un solo archivo, sino como una composición de piezas con responsabilidades distintas.
- Interpretación de flujo de datos: seguir cómo viaja la información entre componentes, props y estado antes de intentar modificar código.
- Organización técnica: comprender que decisiones como routing, composición y separación por componentes son parte del diseño del sistema, no solo de la estética del proyecto.
- Uso responsable de IA/agentes: apoyarse en agentes para bosquejar componentes, explicar props o acelerar una primera estructura, verificando siempre la coherencia del árbol, el flujo de datos y la claridad del código de forma manual.

---

# BLOQUE 1: Pensar la interfaz como árbol de componentes

- Duración: 35 minutos
- Objetivo del bloque: comprender el cambio mental que introduce el frontend basado en componentes, reconociendo que una interfaz moderna se construye como un árbol de piezas con responsabilidad, reutilización y composición, no como una sola página monolítica.
- Modalidad: expositiva, conversada y con lectura guiada de estructuras de interfaz

## Desarrollo

### 1.1 Del archivo único a la interfaz compuesta

En una primera etapa del aprendizaje web, es natural pensar una página como un solo bloque: un `index.html`, una hoja de estilos y un archivo JavaScript con comportamiento agregado encima.

Ese modelo sirve para empezar, pero empieza a fallar cuando la interfaz crece:

- se repiten estructuras visuales muy parecidas;
- una misma tarjeta, panel o bloque aparece en varias pantallas;
- pequeños cambios obligan a editar muchas partes a la vez;
- y la interfaz deja de ser fácil de mantener como una sola pieza continua.

El frontend moderno responde a ese problema con una idea simple pero poderosa: dividir la interfaz en componentes.

Un componente no es solo un fragmento visual. Es una pieza con propósito.

Por ejemplo, en una aplicación real no se piensa solo en “la página principal”, sino en elementos como:

- `Navbar`
- `Sidebar`
- `ProductCard`
- `UserBadge`
- `SearchBar`
- `DashboardLayout`

Cada una de esas piezas puede vivir, evolucionar y reutilizarse por separado.

### 1.2 Qué es realmente un componente

Un componente puede entenderse como una unidad de interfaz con responsabilidad propia.

Eso implica tres cosas importantes:

1. **Tiene un propósito claro**
   No existe para “partir el código porque sí”, sino para resolver una parte identificable de la interfaz.

2. **Puede reutilizarse**
   Si una tarjeta aparece varias veces con distinto contenido, probablemente conviene que esa tarjeta sea un componente.

3. **Puede componerse con otros componentes**
   Una pantalla no se construye desde cero en cada ruta: se arma combinando piezas más pequeñas.

Pensarlo así cambia la forma de leer una interfaz. En vez de preguntar “¿cómo se hizo esta página?”, empezamos a preguntar:

- ¿qué piezas la componen?
- ¿qué responsabilidad tiene cada una?
- ¿qué se repite?
- ¿qué debería vivir separado?

### 1.3 Árbol de componentes: cómo leer una pantalla moderna

Una interfaz moderna suele leerse como un árbol.

Ejemplo simple:

```text
App
├── DashboardLayout
│   ├── Sidebar
│   ├── Topbar
│   └── MainContent
│       ├── SectionTitle
│       ├── StatsGrid
│       │   ├── StatCard
│       │   ├── StatCard
│       │   └── StatCard
│       └── ActivityList
│           ├── ActivityItem
│           ├── ActivityItem
│           └── ActivityItem
```

Esta lectura deja ver algo clave:

- hay componentes contenedores;
- hay componentes visuales reutilizables;
- y hay niveles distintos de responsabilidad.

`DashboardLayout` organiza la pantalla. `StatCard` no organiza toda la app: resuelve una tarjeta puntual.

Leer bien ese árbol evita uno de los errores más comunes de quienes recién entran a React, Next.js u otros enfoques equivalentes: crear componentes sin criterio o dejar componentes demasiado grandes.

### 1.4 Cuándo conviene separar un componente

No todo necesita transformarse en componente. Separar por separar también puede empeorar la claridad.

Preguntas útiles para decidir:

- ¿esta pieza aparece más de una vez?
- ¿tiene una responsabilidad distinguible?
- ¿vale la pena poder modificarla sin tocar toda la pantalla?
- ¿su lógica o estructura merecen vivir aparte?

Ejemplos donde **sí** suele convenir separar:

- tarjetas repetidas
- botones con variantes
- headers de sección
- layouts compartidos
- items de lista
- modales o paneles reutilizables

Ejemplos donde **no siempre** conviene separar todavía:

- un bloque minúsculo que aparece solo una vez y no agrega claridad;
- una estructura tan pequeña que al extraerla se vuelve más difícil entender la pantalla;
- componentes creados solo por obsesión con “fragmentar todo”.

La regla útil no es “mientras más componentes, mejor”, sino:

> un buen componente hace más clara la interfaz y más fácil su mantenimiento.

### Producto o evidencia del bloque

Al cerrar este bloque, el estudiante debería poder:

- explicar por qué una interfaz moderna se modela como árbol de componentes;
- distinguir una pantalla monolítica de una interfaz compuesta;
- leer un árbol simple de componentes sin perder la jerarquía;
- y justificar por qué una pieza conviene o no conviene extraerse como componente.

### Preguntas guía

- ¿Qué diferencia hay entre “partir una página en trozos” y diseñar componentes con responsabilidad real?
- Mirando una landing o dashboard, ¿qué piezas parecen reutilizables y cuáles parecen demasiado específicas?
- ¿Qué problema aparece cuando una misma tarjeta se copia tres veces en vez de modelarse como componente?

### Huella metodológica IA/agentes

Un agente puede ayudar muy bien en esta etapa a:

- proponer una primera separación en componentes;
- nombrar piezas de una interfaz;
- bosquejar un árbol `App -> Layout -> Componentes hijos`;
- o convertir una maqueta grande en piezas más pequeñas.

Lo que no conviene delegar ciegamente es el criterio de separación.

Un agente puede partir una pantalla en demasiados componentes, crear nombres arbitrarios o separar piezas sin una responsabilidad clara. Eso produce código “moderno” en apariencia, pero más difícil de entender.

El patrón correcto aquí es:

- el agente puede proponer una primera descomposición;
- pero tú debes validar si esa estructura realmente tiene sentido como diseño de interfaz.

### Cierre del bloque

- Idea clave: una interfaz moderna no se construye como un bloque único, sino como una composición de piezas con responsabilidad y posibilidad de reutilización.
- Puente: una vez que entendemos qué piezas componen la interfaz, el siguiente paso es entender cómo una aplicación organiza sus vistas y navegación. Ahí aparece el routing.

---

# BLOQUE 2: Routing como estructura de navegación y vistas

- Duración: 35 minutos
- Objetivo del bloque: comprender el rol del routing en una aplicación frontend moderna, entendiendo cómo organiza vistas, navegación y estructura general del proyecto más allá de una sola página o de enlaces sueltos.
- Modalidad: expositiva con lectura guiada de estructura de aplicación y ejemplos de navegación

## Desarrollo

### 2.1 De la página única a la aplicación con vistas

Cuando se empieza con desarrollo web, es común pensar el sitio como una única página que contiene todo el contenido relevante.

Ese enfoque puede funcionar para una landing o una página informativa simple. Pero cuando el producto crece, ya no hablamos solo de “una página”, sino de varias vistas o pantallas relacionadas entre sí.

Por ejemplo, una aplicación puede tener:

- inicio
- panel principal
- perfil de usuario
- listado de productos
- detalle de un producto
- formulario de acceso

La pregunta deja de ser solo “qué se muestra” y pasa a ser también:

- ¿en qué vista estoy?
- ¿cómo llegué aquí?
- ¿qué ruta representa esta pantalla?
- ¿qué cambia y qué se mantiene cuando navego?

Ahí aparece el routing.

### 2.2 Qué es routing y por qué importa

El routing es el mecanismo que conecta una ruta con una vista o estructura de interfaz.

Dicho de forma simple:

> el routing decide qué pantalla o conjunto de componentes debe renderizarse según la ubicación actual dentro de la aplicación.

Eso puede expresarse en rutas como:

- `/`
- `/productos`
- `/productos/42`
- `/perfil`
- `/login`

Cada una de esas rutas representa una intención distinta dentro de la app.

Lo importante pedagógicamente aquí es entender que el routing no es solo “cambiar de URL”. También es una forma de organizar el proyecto.

Permite:

- separar vistas por propósito;
- definir navegación clara;
- mantener layouts compartidos;
- y pensar la app como un sistema de pantallas conectadas, no como un solo documento enorme.

### 2.3 Vista, ruta y layout no son lo mismo

Una confusión frecuente es mezclar estas tres ideas.

**Ruta**
- Es la dirección o segmento que identifica una ubicación dentro de la app.
- Ejemplo: `/dashboard`, `/productos`, `/usuarios/15`

**Vista o página**
- Es la pantalla que se renderiza para esa ruta.
- Puede estar formada por varios componentes.

**Layout**
- Es la estructura compartida que se mantiene entre varias vistas.
- Por ejemplo: sidebar, topbar, footer, contenedor principal.

Ejemplo mental:

- la ruta cambia de `/dashboard` a `/productos`;
- el layout puede seguir siendo el mismo;
- pero cambia la vista central que se está mostrando.

Esa distinción es importante porque ayuda a leer mejor aplicaciones modernas y evita pensar que cada ruta implica rehacer la interfaz desde cero.

### 2.4 Routing como decisión de estructura

En un enfoque basado en componentes, el routing no está aislado del resto del sistema. Define cómo se organiza el proyecto entero: qué componentes representan vistas, qué layouts se comparten entre rutas y cómo se distribuye la lógica entre pantallas.

Una aplicación bien estructurada tiene respuestas claras a preguntas como:

- ¿qué vistas necesitan layout compartido y cuáles son independientes?
- ¿qué páginas son de acceso público y cuáles requieren autenticación?
- ¿qué partes de la interfaz cambian al navegar y cuáles permanecen fijas?
- ¿qué componentes pertenecen a una vista específica y cuáles son reutilizables entre varias rutas?

Sin esas respuestas, el routing se convierte en una acumulación de rutas sin coherencia: páginas que duplican estructura, layouts que se rehacen en cada vista o componentes atrapados dentro de rutas que no les corresponden.

Un proyecto típico suele organizar esto en dos niveles:

- **Rutas de nivel superior** que definen las secciones principales: `/`, `/dashboard`, `/productos`, `/login`.
- **Rutas anidadas** que desglosan el contenido dentro de esas secciones: `/productos/42`, `/productos/42/editar`.

Esa jerarquía de rutas es también una jerarquía de responsabilidades: qué componente gestiona qué parte del contenido.

Incluso sin entrar todavía a la sintaxis concreta de React Router o Next.js, ya conviene instalar esta idea:

> routing es parte del diseño arquitectónico del frontend.

No es una línea de configuración. Es una decisión sobre cómo está estructurado el sistema.

### Producto o evidencia del bloque

Al cerrar este bloque, el estudiante debería poder:

- explicar qué problema resuelve el routing en una aplicación moderna;
- distinguir ruta, vista y layout;
- leer una aplicación como sistema de pantallas conectadas;
- y reconocer que la navegación también organiza la estructura del proyecto.

### Preguntas guía

- ¿Qué diferencia hay entre un sitio de una sola página y una aplicación con varias vistas?
- Si cambias de `/dashboard` a `/productos`, ¿qué partes de la interfaz podrían mantenerse y cuáles deberían cambiar?
- ¿Por qué el routing no debería entenderse solo como “poner enlaces”?

### Huella metodológica IA/agentes

Un agente puede ayudar bastante en esta etapa a:

- proponer un mapa inicial de rutas;
- sugerir qué vistas podrían existir en una aplicación;
- bosquejar una estructura tipo `pages`, `routes` o `app`;
- y explicar la diferencia entre layout compartido y pantalla específica.

Lo que no conviene delegar sin revisión es la lógica estructural de navegación.

Un agente puede proponer rutas innecesarias, duplicar vistas o separar navegación sin criterio de producto. También puede sugerir una estructura técnicamente válida pero pobre desde la experiencia de uso.

El patrón correcto aquí es:

- el agente puede sugerir una arquitectura inicial de rutas y vistas;
- pero tú debes validar si esa estructura tiene sentido para la aplicación que se quiere construir.

### Cierre del bloque

- Idea clave: el routing no solo mueve al usuario entre pantallas; organiza cómo la aplicación distribuye sus vistas, layouts y navegación.
- Puente: una vez que entendemos cómo se estructuran las vistas, el siguiente paso es mirar cómo viaja la información entre componentes. Ahí entran props y composición.

---

# BLOQUE 3: Props y composición como flujo de datos hacia abajo

- Duración: 35 minutos
- Objetivo del bloque: comprender cómo los componentes se combinan entre sí y cómo las props permiten pasar información desde componentes padres hacia componentes hijos, instalando una lectura correcta del flujo de datos en interfaces modernas.
- Modalidad: expositiva con lectura guiada de ejemplos y análisis de jerarquía entre componentes

## Desarrollo

### 3.1 Composición: construir una interfaz ensamblando piezas

Una vez que la interfaz se entiende como árbol de componentes y la aplicación como sistema de vistas, aparece la siguiente idea importante:

> una pantalla no se rehace desde cero cada vez; se compone a partir de piezas que se insertan dentro de otras.

A eso le llamamos composición.

Componer significa que un componente puede contener otros componentes para resolver una estructura mayor.

Ejemplo simple:

- `App`
  - contiene `DashboardLayout`
- `DashboardLayout`
  - contiene `Sidebar`, `Topbar` y `MainSection`
- `MainSection`
  - contiene `SectionTitle`, `StatsGrid` y `ActivityList`
- `StatsGrid`
  - contiene varias `StatCard`

La idea importante no es solo visual. Es organizativa.

Cada componente participa en una estructura donde:

- algunos componentes organizan;
- otros muestran información;
- otros repiten un patrón con contenido distinto.

La composición hace posible construir pantallas complejas sin que todo quede mezclado en un solo archivo o en una sola función gigante.

### 3.2 Qué son las props

Las props son datos que un componente recibe desde afuera.

Sirven para que un componente pueda cambiar su contenido o comportamiento sin dejar de ser la misma pieza estructural.

Ejemplo conceptual:

- `ProductCard` siempre representa una tarjeta de producto;
- pero una tarjeta puede mostrar distintos:
  - nombres
  - precios
  - imágenes
  - etiquetas

Eso significa que la estructura de la tarjeta puede mantenerse, mientras el contenido llega por props.

En términos simples:

> las props son la entrada de un componente.

Le permiten recibir información desde un componente padre y reutilizar la misma estructura con valores distintos.

### 3.3 Padre, hijo y flujo de datos

Cuando un componente entrega props a otro, hablamos de una relación padre-hijo.

Ejemplo mental:

- `ProductList` actúa como padre;
- varias `ProductCard` actúan como hijas;
- `ProductList` entrega datos a cada tarjeta;
- y cada `ProductCard` renderiza su contenido según esas props.

Eso instala una idea central del frontend basado en componentes:

> gran parte del flujo de datos básico va desde arriba hacia abajo.

Es decir:

- un componente superior organiza;
- pasa información a los componentes que contiene;
- y esos componentes muestran o usan esa información.

Leer bien ese flujo evita varios errores tempranos:

- creer que todos los componentes “saben todo” por sí solos;
- no distinguir qué dato viene desde afuera;
- o mezclar componentes reutilizables con componentes demasiado dependientes del contexto.

### 3.4 Reutilización con variantes

El valor real de las props aparece cuando una misma pieza se reutiliza varias veces cambiando sus datos.

Ejemplo:

- tres `StatCard`
- misma estructura visual
- distinto título
- distinto valor
- distinto color o icono

Lo importante aquí es entender que:

- no se crean tres componentes distintos si el patrón es el mismo;
- se crea un componente reutilizable;
- y se alimenta con props distintas.

Eso mejora:

- consistencia visual;
- mantenibilidad;
- legibilidad del proyecto;
- y posibilidad de cambio futuro.

Una buena señal de que algo podría resolverse con props es esta:

- la estructura se repite;
- pero cambian solo algunos valores.

### Producto o evidencia del bloque

Al cerrar este bloque, el estudiante debería poder:

- explicar qué significa composición en una interfaz moderna;
- identificar qué componente actúa como padre y cuál como hijo en un ejemplo simple;
- distinguir estructura reutilizable de contenido variable;
- y reconocer que las props representan datos que llegan desde afuera del componente.

### Preguntas guía

- ¿Qué ventaja tiene construir una sección con componentes reutilizables en vez de copiar el mismo bloque muchas veces?
- Si varias tarjetas comparten estructura pero cambian el contenido, ¿qué conviene variar: el componente o las props?
- ¿Qué significa exactamente decir que las props son la entrada de un componente?

### Huella metodológica IA/agentes

Un agente puede ayudar muy bien en esta etapa a:

- detectar qué partes de una interfaz podrían convertirse en componente reutilizable;
- proponer nombres de props razonables;
- convertir una estructura repetida en una pieza reutilizable;
- o explicar qué datos deberían venir desde el padre.

Lo que no conviene delegar ciegamente es la lectura del flujo.

Un agente puede crear props innecesarias, pasar demasiada información a un componente o proponer jerarquías difíciles de mantener. También puede generar componentes “bonitos” pero con una relación padre-hijo pobremente pensada.

El patrón correcto aquí es:

- el agente puede proponer una primera estructura de composición;
- pero tú debes validar si el flujo de datos tiene sentido y si la reutilización realmente mejora el diseño.

### Cierre del bloque

- Idea clave: la composición arma la interfaz; las props permiten que una misma pieza reciba datos distintos sin dejar de ser el mismo componente.
- Puente: una vez que entendemos el flujo de datos que llega desde afuera, el siguiente paso es entender qué ocurre cuando la información cambia dentro del propio componente. Ahí entra el estado.

---

# BLOQUE 4: Estado como dato que cambia y provoca actualización

- Duración: 35 minutos
- Objetivo del bloque: comprender el estado como información interna que puede cambiar dentro de un componente y provocar una actualización visible de la interfaz, distinguiéndolo con claridad de las props y reconociendo su rol en la interacción.
- Modalidad: expositiva, guiada y con lectura de ejemplos simples de interacción

## Desarrollo

### 4.1 El problema que el estado viene a resolver

Hasta aquí la clase muestra una interfaz compuesta por componentes que reciben datos desde afuera.

Pero una aplicación real no solo muestra contenido fijo.

También necesita responder a acciones como:

- abrir o cerrar un panel;
- cambiar una pestaña activa;
- mostrar u ocultar información;
- contar clics;
- o reflejar el valor actual de una interacción.

Ahí aparece el estado.

La intuición correcta no es pensar en estado como “otra variable cualquiera”, sino como información que vive en el componente y cuya modificación provoca una nueva representación de la interfaz.

En otras palabras:

- la interfaz muestra un estado actual;
- el usuario interactúa;
- el estado cambia;
- y la interfaz se actualiza para reflejar ese cambio.

Ese ciclo instala una diferencia importante frente a clases anteriores:

- en JavaScript base podíamos modificar el DOM directamente;
- en frontend basado en componentes interesa más entender qué dato cambió y cómo eso repercute en la vista.

### 4.2 Props y estado no cumplen la misma función

Una de las confusiones más comunes al entrar a React o enfoques equivalentes es mezclar props con estado.

La diferencia central que debe quedar instalada es esta:

- las props llegan desde afuera del componente;
- el estado pertenece al componente y cambia dentro de su propia lógica de interacción.

Eso significa que:

- las props permiten configurar o alimentar una pieza;
- el estado permite que esa pieza tenga una situación actual que puede modificarse.

Ejemplo mental:

- `ProductCard` recibe por props el nombre y el precio de un producto;
- pero podría tener estado para saber si está expandida, marcada o mostrando un detalle adicional.

Una forma simple de leerlo es esta:

- `props`: qué datos recibió la pieza;
- `state`: qué condición actual está viviendo la pieza.

Cuando esta diferencia queda clara, también mejora la capacidad de decidir dónde debería vivir cada dato.

### 4.3 Estado local y actualización visible

En esta etapa conviene trabajar con ejemplos muy concretos y pequeños.

Casos iniciales adecuados:

- botón que aumenta un contador;
- panel que se abre y se cierra;
- tarjeta que muestra u oculta información adicional;
- selector que cambia una vista activa.

Lo importante no es memorizar sintaxis todavía, sino leer el patrón:

1. existe un dato actual;
2. una interacción modifica ese dato;
3. el componente se vuelve a representar;
4. la interfaz visible cambia.

Ese patrón instala una idea clave del frontend moderno:

- la interfaz no se piensa solo como elementos visuales;
- se piensa como una proyección de datos y estado en un momento dado.

Cuando el estado cambia, la interfaz responde porque la vista depende de ese valor.

Eso ayuda a leer mejor muchas decisiones futuras:

- pestañas activas;
- menús desplegables;
- modales;
- filtros;
- formularios;
- y vistas condicionadas.

### 4.4 Errores comunes al pensar estado

Antes de avanzar hacia formularios o consumo de datos, conviene instalar algunos errores frecuentes.

**Primer error: usar estado para todo.**

No todo debe volverse estado. Si un dato no cambia o puede venir por props, no siempre tiene sentido duplicarlo como información interna.

**Segundo error: mezclar dato de negocio con condición visual sin distinguirlos.**

No es lo mismo:

- el nombre de un producto;
- que saber si la tarjeta del producto está abierta o cerrada.

**Tercer error: no pensar dónde debería vivir el estado.**

A veces el estado pertenece a un componente pequeño. Otras veces conviene subirlo a un componente superior para coordinar varias piezas.

Aunque esta clase no necesita profundizar todavía en levantamiento de estado, sí conviene dejar instalada la pregunta:

- ¿qué componente realmente necesita controlar este cambio?

**Cuarto error: leer el estado solo como sintaxis.**

Si el estudiante memoriza `useState` pero no entiende qué información cambia y por qué la UI responde, la herramienta se vuelve mecánica y frágil.

Por eso el foco correcto sigue siendo el modelo mental:

- estado = dato actual que cambia;
- interfaz = representación visible de ese dato.

### Producto o evidencia del bloque

Al cerrar este bloque, el estudiante debería poder:

- distinguir con claridad props y estado;
- explicar cómo una interacción modifica la situación actual de un componente;
- reconocer ejemplos simples de actualización visible provocada por estado;
- y leer el estado como parte del modelo de la interfaz, no solo como sintaxis.

### Preguntas guía

- ¿Qué diferencia real existe entre un dato recibido por props y un dato manejado como estado?
- ¿Qué tipo de situaciones de una interfaz suelen resolverse bien con estado local?
- ¿Por qué no conviene convertir cualquier dato en estado sin pensar su rol?

### Huella metodológica IA/agentes

Un agente puede ser bastante útil en este punto para:

- explicar la diferencia entre props y estado con ejemplos simples;
- proponer microinteracciones iniciales;
- convertir una interfaz estática en una versión con estado básico;
- o sugerir ejercicios breves para practicar actualización de UI.

Lo que sigue necesitando mucha validación humana es el criterio de modelado.

Un agente puede introducir estado donde no hace falta, duplicar información innecesariamente o esconder confusiones conceptuales detrás de una implementación que “funciona”.

El patrón correcto aquí es:

- usar al agente para explorar o comparar alternativas;
- pero validar manualmente qué dato realmente cambia, dónde debería vivir y qué impacto tiene en la interfaz.

### Cierre del bloque

- Idea clave: el estado representa la situación actual de un componente y permite que la interfaz cambie de forma coherente con la interacción.
- Puente: con componentes, routing, props, composición y estado ya instalados, la clase deja preparado el terreno para trabajar después con formularios, eventos más ricos y consumo de datos dentro de aplicaciones frontend modernas.

---

# Cierre de la Clase

## Síntesis Final

- El frontend moderno no se construye como bloques de HTML apilados, sino como un árbol de componentes con responsabilidad, reutilización y composición. Leer bien ese árbol es una habilidad técnica real, no solo una forma de ordenar código.
- El routing organiza las vistas de una aplicación como sistema navegable: define qué se muestra, cómo se llega ahí y qué estructura se comparte entre rutas. No es solo configuración, es diseño arquitectónico.
- Las props son la entrada de un componente: permiten que una misma pieza reciba datos distintos sin duplicar estructura. El flujo básico va de componentes padres hacia componentes hijos.
- El estado representa la situación actual de un componente y es lo que hace posible que la interfaz responda a la interacción. Cambia por adentro; la interfaz lo refleja hacia afuera.

## Preguntas de Salida

- ¿Qué diferencia real hay entre construir una interfaz como un bloque único y modelarla como árbol de componentes con responsabilidad?
- Si una `ProductCard` aparece doce veces con distintos datos, ¿qué mecanismo del componente permite eso sin duplicar la estructura?
- ¿Por qué cambiar de ruta en una aplicación moderna no implica necesariamente rehacer toda la interfaz?
- ¿En qué caso un dato debería ser estado local y no simplemente una prop recibida desde afuera?

## Próximo Paso

La siguiente clase aplica este marco sobre un caso concreto: formularios con validación, consumo de una API pública y renderizado de datos en una interfaz compuesta por componentes. El modelo conceptual de hoy —árbol, routing, props, estado— será el punto de referencia para entender por qué cada pieza vive donde vive dentro del código aplicado.
