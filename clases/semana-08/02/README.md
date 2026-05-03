# Clase 02 - Semana 08 - Fundamentos de deep learning: neuronas, perceptrón, entrenamiento y generalización

- **Unidad:** 03 · Datos, IA Aplicada y Proyecto Integrador
- **Fecha:** Martes 05 de mayo de 2026
- **Duración:** 3 horas (10:50 - 13:10)
- **Modalidad:** Presencial en Laboratorio PC
- **Docente:** Diego Obando

---

# Objetivos de la Clase

## Objetivo General

Al finalizar esta sesión, el estudiante será capaz de explicar los fundamentos de deep learning desde la inspiración biológica de la neurona hasta el modelo matemático del perceptrón, comprendiendo cómo una red neuronal transforma entradas, calcula predicciones, mide errores, ajusta parámetros y enfrenta problemas como overfitting, generalización y validación técnica.

## Objetivos Específicos

1. **Relacionar la neurona biológica con la neurona artificial**, identificando dendritas, soma, axón, sinapsis, señales, umbral de activación y su traducción conceptual hacia entradas, pesos, sesgo, suma ponderada y salida.
2. **Comprender el perceptrón como unidad mínima de decisión**, interpretando fórmulas simples como `z = w1*x1 + w2*x2 + ... + wn*xn + b` sin requerir cálculo avanzado, pero entendiendo qué representa cada término y por qué importa.
3. **Explicar el ciclo básico de entrenamiento**, diferenciando dato de entrada, etiqueta esperada, predicción, error, función de pérdida y ajuste de parámetros como proceso iterativo de mejora.
4. **Reconocer la función de pérdida como medida técnica del error**, usando ejemplos numéricos pequeños para interpretar expresiones como `L = (y - ŷ)^2` y comprender por qué el modelo necesita medir qué tan lejos estuvo de la respuesta esperada.
5. **Distinguir memorización de generalización**, identificando overfitting, datos de entrenamiento, datos de prueba y el riesgo de confiar en modelos que funcionan bien solo con ejemplos conocidos.
6. **Conectar deep learning con aplicaciones web, ciberseguridad e IA actual**, reconociendo que agentes y modelos modernos pueden apoyar análisis, clasificación o automatización, pero requieren datos confiables, evaluación crítica y supervisión humana.

## Competencias Transversales

- **Pensamiento técnico-matemático inicial:** leer fórmulas simples como representaciones de procesos, no como símbolos aislados o intimidantes.
- **Abstracción responsable:** entender que una neurona artificial se inspira en la biología, pero no replica el cerebro humano ni debe explicarse como pensamiento humano literal.
- **Criterio de evaluación:** distinguir entre una predicción que parece correcta y un modelo realmente validado con datos adecuados.
- **Ciberseguridad aplicada a IA:** reconocer que modelos mal evaluados, datos sesgados o automatización sin control pueden amplificar errores, exposición de información o decisiones inseguras.
- **Uso crítico de agentes:** apoyarse en IA para explicar fórmulas, generar ejemplos o visualizar procesos, verificando siempre si la explicación coincide con el concepto técnico y con los datos disponibles.

---

# BLOQUE 1: De la neurona biológica a la neurona artificial

- **Duración:** 35 minutos
- **Objetivo del bloque:** comprender que las redes neuronales artificiales nacen como una abstracción inspirada en la neurona biológica, pero funcionan como modelos matemáticos que reciben señales, les asignan importancia, las combinan y producen una salida.

## Desarrollo

### 1.1 Por qué empezar por una neurona biológica

Antes de hablar de deep learning, redes neuronales, LLMs o agentes, conviene detenerse en una pregunta básica:

> ¿Por qué se llaman redes neuronales?

El nombre viene de una inspiración biológica. El cerebro y el sistema nervioso están formados por muchas neuronas conectadas entre sí. Esas neuronas reciben señales, las integran y pueden transmitir nuevas señales hacia otras neuronas.

Los primeros modelos de redes neuronales artificiales tomaron una idea muy general de ese funcionamiento:

- una neurona recibe varias señales de entrada;
- esas señales no tienen todas la misma importancia;
- la neurona combina esas señales;
- si la señal total supera cierto umbral, la neurona se activa;
- esa activación puede influir en otras neuronas.

Esa idea se convirtió en una abstracción matemática. No porque el modelo artificial copie exactamente al cerebro, sino porque toma un principio simple: **muchas señales pequeñas pueden combinarse para producir una respuesta**.

Esta distinción es importante desde el inicio:

> Una red neuronal artificial se inspira en la biología, pero no es un cerebro digital.

Una neurona artificial no siente, no piensa, no tiene intención y no comprende el mundo como una persona. Lo que hace es transformar números mediante operaciones matemáticas.

El valor pedagógico de la comparación biológica está en entender el salto conceptual:

```text
neurona biológica: señales físicas y químicas
neurona artificial: números, pesos, suma y función de activación
```

La clase no busca estudiar neurociencia en profundidad. Busca entender qué se tomó de esa inspiración para construir modelos capaces de aprender patrones desde datos.

### 1.2 Anatomía mínima de una neurona biológica

Una neurona biológica puede explicarse con cuatro partes principales:

| Parte | Función general | Idea importante |
|---|---|---|
| Dendritas | Reciben señales de otras neuronas. | Son puntos de entrada de información. |
| Soma o cuerpo celular | Integra las señales recibidas. | Funciona como centro de procesamiento básico. |
| Axón | Transmite la señal hacia otras neuronas. | Es la vía de salida. |
| Sinapsis | Conexión entre neuronas. | Permite que una neurona influya en otra. |

Una forma simple de imaginarlo:

```text
otras neuronas -> dendritas -> soma -> axón -> otras neuronas
```

Las dendritas reciben señales. El soma integra esas señales. Si la activación resultante es suficiente, la neurona transmite una señal por el axón hacia otras neuronas.

La palabra clave aquí es **activación**.

Una neurona no responde con la misma fuerza a cualquier cosa. Algunas señales pueden ser débiles, otras más fuertes. Algunas conexiones pueden influir mucho, otras poco. Además, la neurona no se activa ante cualquier señal mínima: necesita que el conjunto de señales alcance cierto nivel.

En términos intuitivos:

> La neurona biológica recibe muchas señales, evalúa su intensidad combinada y puede producir una respuesta si esa intensidad supera un umbral.

No necesitamos entrar en detalles de electricidad, química, neurotransmisores o potenciales de acción para entender el puente hacia IA. Lo importante para esta clase es la estructura general:

1. entran señales;
2. las señales se combinan;
3. existe una condición de activación;
4. sale una respuesta.

Ese patrón es el que inspiró la neurona artificial.

### 1.3 Del lenguaje biológico al lenguaje matemático

Para convertir esa intuición en un modelo computacional, hay que traducir partes biológicas a elementos matemáticos.

La traducción básica es esta:

| Inspiración biológica | Modelo artificial | Lectura intuitiva |
|---|---|---|
| Señales que llegan por dendritas | Entradas `x` | Datos que recibe el modelo. |
| Fuerza de cada conexión | Pesos `w` | Importancia de cada entrada. |
| Tendencia a activarse o no | Sesgo `b` | Ajuste interno del umbral. |
| Integración en el soma | Suma ponderada `z` | Combinación numérica de señales. |
| Activación de la neurona | Función de activación | Regla que decide o transforma la salida. |
| Señal que viaja por el axón | Salida `ŷ` | Resultado producido por la neurona. |

Aquí aparecen símbolos que pueden intimidar al principio, pero la idea es simple.

Una neurona artificial recibe datos. Cada dato puede importar más o menos. Para representar esa importancia se usa un **peso**.

Ejemplo cotidiano:

> Para decidir si un correo parece sospechoso, no todas las señales pesan igual. Que tenga un enlace extraño puede importar mucho. Que venga en mayúsculas puede importar algo. Que el remitente sea desconocido puede importar bastante.

Entonces el modelo necesita representar tres cosas:

- qué señales llegaron;
- cuánto importa cada señal;
- qué salida se produce al combinarlas.

En una neurona artificial, esa combinación se expresa con una fórmula.

### 1.4 La primera fórmula importante: suma ponderada

La fórmula base de una neurona artificial es:

```text
z = w1*x1 + w2*x2 + ... + wn*xn + b
```

También puede escribirse de forma más compacta:

```text
z = Σ(wi*xi) + b
```

No es necesario saber cálculo para entender esta fórmula. Basta con leerla como una receta:

```text
señal total = importancia_1 * entrada_1
            + importancia_2 * entrada_2
            + ...
            + ajuste_extra
```

Cada elemento significa algo concreto:

| Símbolo | Nombre | Qué representa |
|---|---|---|
| `x1`, `x2`, `xn` | Entradas | Los datos que recibe la neurona. |
| `w1`, `w2`, `wn` | Pesos | Cuánta importancia tiene cada entrada. |
| `b` | Sesgo | Ajuste que facilita o dificulta la activación. |
| `z` | Suma ponderada | Señal total antes de aplicar la activación. |

La multiplicación `wi*xi` significa:

> tomar una entrada y escalarla según su importancia.

Si una entrada tiene peso alto, influye mucho en la decisión. Si tiene peso bajo, influye poco. Si tiene peso negativo, puede empujar la decisión en sentido contrario.

Ejemplo simple:

```text
x1 = el correo tiene enlace sospechoso
x2 = el remitente es desconocido
x3 = el asunto parece urgente
```

Podemos representar presencia o ausencia con números:

```text
x1 = 1  -> sí tiene enlace sospechoso
x2 = 1  -> sí es remitente desconocido
x3 = 0  -> no tiene asunto urgente
```

Ahora asignamos pesos:

```text
w1 = 3  -> el enlace sospechoso importa mucho
w2 = 2  -> el remitente desconocido importa bastante
w3 = 1  -> el asunto urgente importa, pero menos
b  = -2 -> el sistema exige cierta evidencia antes de activar alerta
```

Calculamos:

```text
z = w1*x1 + w2*x2 + w3*x3 + b
z = 3*1 + 2*1 + 1*0 - 2
z = 3 + 2 + 0 - 2
z = 3
```

La señal total `z` vale `3`.

Todavía no hemos decidido la salida final. Solo calculamos la señal acumulada.

Este paso equivale, de forma muy simplificada, a la integración de señales: varias entradas llegaron, cada una aportó según su importancia, y ahora tenemos un valor total.

### 1.5 Qué significa el sesgo `b`

El sesgo suele ser una de las partes más confusas, porque no corresponde a una entrada externa. No viene directamente del dato.

Una forma útil de entenderlo:

> El sesgo ajusta qué tan fácil o difícil es que la neurona se active.

Si el sesgo es positivo, puede hacer más fácil llegar a una activación.
Si el sesgo es negativo, puede exigir más evidencia antes de activar.

Volvamos al ejemplo del correo sospechoso.

Caso A:

```text
z = 3*1 + 2*1 + 1*0 - 2
z = 3
```

Caso B, con sesgo más exigente:

```text
z = 3*1 + 2*1 + 1*0 - 6
z = -1
```

Las entradas y pesos son los mismos, pero el sesgo cambió el resultado total.

Esto permite modelar algo parecido a un umbral interno. No basta con que existan señales: el modelo también tiene una tendencia aprendida hacia activar o no activar.

En lenguaje menos matemático:

- los pesos dicen **qué señales importan más**;
- el sesgo dice **cuánta evidencia se necesita para responder**;
- la suma `z` dice **cuánta señal acumulada hay**.

### 1.6 De la suma a la salida: activación

Después de calcular `z`, la neurona artificial necesita producir una salida. Para eso se usa una función de activación.

En el caso más simple, la activación puede ser una regla de umbral:

```text
si z >= 0, salida = 1
si z < 0, salida = 0
```

Aplicado al ejemplo:

```text
z = 3
```

Como `3 >= 0`, la salida sería:

```text
salida = 1
```

Podemos interpretar `1` como:

```text
correo sospechoso
```

Si el resultado hubiera sido negativo:

```text
z = -1
```

Entonces:

```text
salida = 0
```

Podemos interpretar `0` como:

```text
correo no marcado como sospechoso
```

Esta regla de activación es muy simple, pero permite ver el principio:

> La neurona artificial combina señales y luego transforma esa combinación en una salida.

En redes modernas existen funciones de activación más sofisticadas, como `sigmoid`, `tanh` o `ReLU`. No necesitamos dominarlas todavía. Por ahora, basta entender que la activación decide cómo se transforma la señal total `z` en un resultado usable.

El patrón completo queda así:

```text
entradas -> pesos -> suma ponderada -> activación -> salida
```

O con símbolos:

```text
x -> w*x + b -> z -> activación(z) -> ŷ
```

El símbolo `ŷ` se lee como "y estimada" o "y predicha". Representa la salida que produjo el modelo.

### 1.7 Comparación guiada: biológico vs artificial

La comparación completa puede resumirse así:

| Pregunta | Neurona biológica | Neurona artificial |
|---|---|---|
| ¿Qué recibe? | Señales de otras neuronas. | Datos numéricos de entrada. |
| ¿Cómo llegan esas señales? | A través de conexiones sinápticas. | A través de variables `x`. |
| ¿Todas importan igual? | No, algunas conexiones influyen más. | No, cada entrada tiene un peso `w`. |
| ¿Dónde se combinan? | En el cuerpo celular. | En una suma ponderada. |
| ¿Existe umbral? | Sí, necesita suficiente activación. | Sí, se modela con sesgo y función de activación. |
| ¿Qué produce? | Una señal hacia otras neuronas. | Una salida numérica o decisión. |
| ¿Es lo mismo que pensar? | No se reduce a una sola neurona. | No, es cálculo matemático. |

Esta tabla ayuda a evitar dos errores:

1. creer que una red neuronal artificial es literalmente un cerebro;
2. creer que el nombre "neuronal" es solo una metáfora vacía.

La relación correcta está en el medio:

> Las redes neuronales artificiales toman inspiración de la forma en que señales conectadas pueden combinarse y producir activaciones, pero las implementan como operaciones matemáticas sobre números.

### 1.8 Qué significa "aprender" en este contexto

En una neurona artificial, aprender no significa comprender como una persona.

Aprender significa ajustar sus parámetros internos para producir mejores salidas.

Los parámetros principales son:

- pesos `w`;
- sesgo `b`.

Cuando el modelo se equivoca, el entrenamiento busca modificar esos valores para que la próxima predicción se acerque más a la respuesta esperada.

Ejemplo:

```text
Entrada: correo con enlace sospechoso y remitente desconocido
Respuesta correcta: sospechoso
Predicción del modelo: no sospechoso
```

El modelo falló. Para mejorar, no se le da una explicación humana como:

> "Ten más cuidado con remitentes desconocidos".

En cambio, el proceso de entrenamiento ajusta números:

```text
w1, w2, w3, b
```

Después de muchos ejemplos, el modelo puede aprender que ciertas señales suelen estar asociadas a ciertas salidas.

Esto es clave:

> Una red neuronal aprende patrones estadísticos desde ejemplos, no reglas humanas explícitas escritas una por una.

En programación tradicional, una persona escribe reglas:

```text
si el correo tiene enlace sospechoso y remitente desconocido, marcar alerta
```

En aprendizaje automático, el modelo recibe ejemplos y ajusta parámetros:

```text
estos correos fueron sospechosos
estos correos no fueron sospechosos
encuentra una combinación de pesos que reduzca el error
```

Esta diferencia prepara el camino para entender entrenamiento, pérdida y ajuste en el bloque 3.

### 1.9 Por qué esta abstracción permitió construir redes

Una sola neurona artificial puede resolver decisiones simples. Pero los problemas reales suelen ser más complejos.

Por ejemplo:

- reconocer si una imagen contiene un gato;
- traducir una frase;
- detectar fraude;
- recomendar productos;
- clasificar intención de un mensaje;
- generar texto coherente;
- identificar patrones de riesgo en logs;
- decidir si una transacción parece sospechosa.

Para esos casos, una sola combinación de entradas puede ser insuficiente.

La idea de una red neuronal es conectar muchas neuronas artificiales:

```text
entradas -> neuronas -> neuronas -> neuronas -> salida
```

Cada neurona puede detectar o transformar una parte del patrón. Las capas posteriores combinan transformaciones anteriores para construir representaciones más complejas.

Una forma intuitiva de verlo:

```text
capa 1: detecta señales simples
capa 2: combina señales simples
capa 3: forma patrones más complejos
salida: produce una predicción
```

Este recorrido todavía no explica todo deep learning, pero instala la base:

> Deep learning consiste en redes con múltiples capas que transforman datos paso a paso hasta producir una salida.

La palabra "deep" no significa que el sistema piense profundamente. Significa que tiene varias capas de transformación entre entrada y salida.

### 1.10 Eje de ciberseguridad: una activación incorrecta también es un riesgo

En ciberseguridad, los modelos pueden usarse para clasificar correos sospechosos, detectar tráfico anómalo, priorizar alertas, revisar logs o apoyar análisis de vulnerabilidades.

Pero un modelo que calcula mal o fue entrenado con datos malos puede producir dos tipos de errores:

| Tipo de error | Qué ocurre | Riesgo |
|---|---|---|
| Falso positivo | Marca como peligroso algo legítimo. | Bloquea usuarios, sistemas o procesos válidos. |
| Falso negativo | No detecta algo peligroso. | Deja pasar amenazas reales. |

Ejemplo:

```text
Correo peligroso -> modelo dice "no sospechoso"
```

Ese falso negativo puede permitir phishing, robo de credenciales o instalación de malware.

Otro ejemplo:

```text
Correo legítimo -> modelo dice "sospechoso"
```

Ese falso positivo puede bloquear trabajo normal, generar ruido y hacer que las personas dejen de confiar en las alertas.

Por eso, desde la primera clase de IA del módulo conviene dejar una idea clara:

> En IA aplicada, una predicción no es automáticamente una verdad. Es una salida calculada que debe evaluarse.

La seguridad no aparece solo al final, cuando el sistema ya está construido. Aparece desde el diseño del modelo, la selección de datos, la interpretación de salidas y la validación.

### 1.11 Huella metodológica IA/agentes

Un agente puede ayudar mucho a estudiar este tema, pero también puede explicarlo mal si se le pide una respuesta genérica.

Un buen uso sería pedirle que traduzca fórmulas a lenguaje cotidiano y que use números pequeños.

Prompt útil:

```text
Actúa como tutor de fundamentos de deep learning para estudiantes sin cálculo.
Explícame la fórmula z = w1*x1 + w2*x2 + b con un ejemplo numérico pequeño.
Quiero entender qué son las entradas, los pesos, el sesgo, la suma ponderada
y la activación. No uses derivadas ni conceptos avanzados.
Incluye una tabla con los valores y explica cada paso.
```

Pero la validación humana sigue siendo necesaria.

Al revisar una explicación generada por IA, hay que comprobar:

- si define correctamente entradas, pesos, sesgo y activación;
- si los cálculos numéricos son correctos;
- si no confunde inspiración biológica con equivalencia exacta;
- si no exagera diciendo que la red "piensa" o "entiende";
- si el ejemplo realmente corresponde a clasificación, predicción o decisión;
- y si la explicación ayuda a comprender el proceso sin ocultar la parte matemática.

La regla del bloque es:

> Un agente puede ayudar a explicar una fórmula, pero no reemplaza entender qué representa cada número.

## Producto o evidencia del bloque

- Dibujar una comparación entre neurona biológica y neurona artificial, indicando al menos cuatro equivalencias: señal, entrada, peso, sesgo, suma, activación o salida.
- Resolver un ejemplo numérico simple de suma ponderada usando dos o tres entradas.
- Explicar con palabras propias por qué una neurona artificial no es un cerebro, sino una abstracción matemática inspirada en señales biológicas.

## Preguntas de chequeo

1. ¿Qué parte de la neurona biológica inspira la idea de "entradas" en una neurona artificial?
2. ¿Por qué los pesos `w` son importantes para interpretar cuánto influye cada entrada?
3. ¿Qué diferencia hay entre decir "la red piensa" y decir "la red calcula una salida a partir de parámetros"?

## Puente hacia el bloque 2

Ya tenemos la idea base: una neurona artificial recibe entradas, aplica pesos, suma señales, incorpora un sesgo y produce una salida mediante una activación. El siguiente paso es estudiar el perceptrón como la primera forma concreta de neurona artificial capaz de tomar decisiones simples. Ahí veremos cómo esta fórmula se convierte en una regla de clasificación.

---

# BLOQUE 2: Perceptrón: una neurona artificial que toma decisiones simples

- **Duración:** 35 minutos
- **Objetivo del bloque:** comprender el perceptrón como un modelo mínimo de clasificación binaria que combina entradas, pesos, sesgo y una función de activación para producir una decisión simple, interpretando cada paso con ejemplos numéricos y sin requerir cálculo avanzado.

## Desarrollo

### 2.1 Qué es un perceptrón

El perceptrón es uno de los modelos más antiguos e importantes en la historia de las redes neuronales artificiales. Fue propuesto como una forma simple de representar una neurona capaz de tomar decisiones.

En términos prácticos, un perceptrón responde preguntas de este tipo:

```text
¿sí o no?
¿clase A o clase B?
¿activar o no activar?
¿alerta o no alerta?
¿aprobado o rechazado?
```

Por eso se dice que el perceptrón sirve para **clasificación binaria**.

Clasificación binaria significa que el resultado tiene dos posibilidades principales:

| Resultado | Interpretación posible |
|---|---|
| `0` | No, negativo, falso, no pertenece, no activar. |
| `1` | Sí, positivo, verdadero, pertenece, activar. |

Ejemplos de clasificación binaria:

- correo normal o correo sospechoso;
- transacción legítima o transacción riesgosa;
- comentario aceptable o comentario con lenguaje ofensivo;
- imagen contiene un objeto o no lo contiene;
- estudiante aprueba o no aprueba según ciertos criterios;
- solicitud web permitida o bloqueada por una regla.

La idea central del perceptrón es:

> combinar varias señales de entrada y decidir si la salida será `0` o `1`.

No es un modelo moderno ni suficiente para resolver todos los problemas actuales, pero es una puerta de entrada excelente porque muestra la estructura básica de muchas ideas posteriores:

```text
entrada -> cálculo -> activación -> salida
```

### 2.2 La estructura del perceptrón

Un perceptrón tiene cuatro partes principales:

1. **Entradas `x`:** datos que recibe el modelo.
2. **Pesos `w`:** importancia asignada a cada entrada.
3. **Sesgo `b`:** ajuste que cambia el umbral de decisión.
4. **Función de activación:** regla que transforma la suma en una salida.

La fórmula de cálculo interno es la misma que vimos en el bloque anterior:

```text
z = w1*x1 + w2*x2 + ... + wn*xn + b
```

Después se aplica una activación por umbral:

```text
si z >= 0, salida = 1
si z < 0, salida = 0
```

El proceso completo se puede leer así:

```text
1. Recibo entradas.
2. Multiplico cada entrada por su peso.
3. Sumo esos resultados.
4. Agrego el sesgo.
5. Comparo la señal total con un umbral.
6. Devuelvo 0 o 1.
```

En pseudocódigo:

```text
z = suma_ponderada + sesgo

si z >= 0:
  salida = 1
si no:
  salida = 0
```

Esta regla parece simple, pero ya permite representar decisiones.

La clave está en los pesos y el sesgo. Cambiar esos valores cambia el comportamiento del perceptrón.

### 2.3 Ejemplo 1: detectar un correo sospechoso

Tomemos un ejemplo conectado con ciberseguridad.

Queremos que un perceptrón decida si un correo debe marcarse como sospechoso.

Usaremos tres señales:

| Entrada | Significado | Valor posible |
|---|---|---|
| `x1` | Tiene enlace extraño | `1` sí, `0` no |
| `x2` | Remitente desconocido | `1` sí, `0` no |
| `x3` | Pide acción urgente | `1` sí, `0` no |

Asignamos pesos:

| Peso | Significado | Valor |
|---|---|---:|
| `w1` | Importancia del enlace extraño | `3` |
| `w2` | Importancia del remitente desconocido | `2` |
| `w3` | Importancia del mensaje urgente | `1` |

Y un sesgo:

```text
b = -3
```

La fórmula queda:

```text
z = 3*x1 + 2*x2 + 1*x3 - 3
```

Ahora evaluamos un correo:

```text
x1 = 1  -> tiene enlace extraño
x2 = 1  -> remitente desconocido
x3 = 0  -> no pide acción urgente
```

Sustituimos:

```text
z = 3*1 + 2*1 + 1*0 - 3
z = 3 + 2 + 0 - 3
z = 2
```

Aplicamos activación:

```text
si z >= 0, salida = 1
```

Como `z = 2`, la salida es:

```text
salida = 1
```

Interpretación:

```text
correo sospechoso
```

No hay magia. El modelo no leyó el correo como una persona. Solo combinó señales numéricas y cruzó un umbral.

La explicación paso a paso es:

- el enlace extraño aportó `3`;
- el remitente desconocido aportó `2`;
- la urgencia no aportó porque su valor era `0`;
- el sesgo restó `3`;
- la señal final quedó en `2`;
- como `2` es mayor o igual que `0`, el perceptrón activó la alerta.

### 2.4 Mismo modelo, otro caso

Probemos ahora otro correo:

```text
x1 = 0  -> no tiene enlace extraño
x2 = 1  -> remitente desconocido
x3 = 0  -> no pide acción urgente
```

Usamos la misma fórmula:

```text
z = 3*x1 + 2*x2 + 1*x3 - 3
```

Sustituimos:

```text
z = 3*0 + 2*1 + 1*0 - 3
z = 0 + 2 + 0 - 3
z = -1
```

Activación:

```text
si z < 0, salida = 0
```

Como `z = -1`, la salida es:

```text
salida = 0
```

Interpretación:

```text
no se marca como sospechoso
```

El correo tenía una señal de riesgo, pero no suficiente para superar el umbral. El sesgo hizo que el modelo exigiera más evidencia antes de activar la alerta.

Esto permite discutir algo importante:

> El perceptrón no dice qué es verdadero en el mundo. Dice qué salida produce según los pesos, entradas y sesgo definidos.

Si los pesos están mal elegidos, el modelo decidirá mal.
Si las entradas no representan bien el problema, el modelo decidirá mal.
Si el umbral es demasiado estricto o demasiado permisivo, el modelo decidirá mal.

### 2.5 Qué significa que los pesos "aprendan"

Hasta ahora asignamos pesos manualmente:

```text
w1 = 3
w2 = 2
w3 = 1
b = -3
```

Pero en aprendizaje automático, la idea no es que una persona escriba todos los pesos perfectos a mano.

La idea es que el modelo los ajuste a partir de ejemplos.

Supongamos que tenemos datos históricos:

| enlace extraño | remitente desconocido | urgencia | etiqueta real |
|---:|---:|---:|---:|
| 1 | 1 | 0 | 1 |
| 0 | 1 | 0 | 0 |
| 1 | 0 | 1 | 1 |
| 0 | 0 | 1 | 0 |
| 1 | 1 | 1 | 1 |

La etiqueta real es la respuesta correcta conocida:

```text
1 = correo sospechoso
0 = correo no sospechoso
```

Durante el entrenamiento, el perceptrón compara:

```text
salida predicha vs etiqueta real
```

Si predice bien, no necesita cambiar mucho.
Si predice mal, debe ajustar pesos o sesgo.

Ejemplo:

```text
Etiqueta real: 1
Predicción: 0
```

El modelo fue demasiado conservador. No activó una alerta que debía activar.

Podría necesitar:

- aumentar el peso de alguna señal importante;
- subir la contribución de una entrada;
- modificar el sesgo para que activar sea más fácil.

Otro caso:

```text
Etiqueta real: 0
Predicción: 1
```

El modelo fue demasiado sensible. Activó una alerta que no correspondía.

Podría necesitar:

- bajar el peso de una señal que está exagerando;
- hacer el sesgo más exigente;
- revisar si las entradas usadas son suficientes para distinguir el caso.

Lo importante por ahora no es memorizar una regla exacta de actualización. Eso aparecerá después como parte del entrenamiento.

La idea importante es:

> Aprender significa ajustar pesos y sesgo para reducir errores frente a ejemplos conocidos.

### 2.6 Separación lineal: lo que el perceptrón sí puede resolver

El perceptrón puede resolver bien problemas donde las clases se pueden separar con una frontera simple.

Imaginemos dos entradas:

```text
x1 = cantidad de enlaces sospechosos
x2 = reputación de remitente riesgosa
```

Cada correo puede representarse como un punto en un plano:

```text
eje horizontal: x1
eje vertical: x2
```

El perceptrón intenta trazar una frontera:

```text
un lado -> clase 0
otro lado -> clase 1
```

Esa frontera es una línea cuando hay dos entradas. Por eso se habla de **separación lineal**.

Representación intuitiva:

```text
correos normales       | correos sospechosos
                       |
        clase 0        |       clase 1
                       |
-----------------------|--------------------
             frontera de decisión
```

La frontera de decisión depende de los pesos y del sesgo.

Si cambiamos los pesos, la línea cambia su inclinación.
Si cambiamos el sesgo, la línea se mueve.

Esto es una idea enorme:

> Los parámetros del modelo definen cómo se separan las decisiones.

En un problema simple, esa separación puede bastar.
En problemas más complejos, una línea no alcanza.

### 2.7 Límite del perceptrón: no todo se separa con una línea

El perceptrón simple tiene una limitación fuerte: solo puede separar patrones linealmente separables.

Eso significa que funciona bien si existe una línea, plano o frontera simple capaz de separar las clases.

Pero muchos problemas reales no son así.

Ejemplo conceptual:

```text
Clase 1 aparece mezclada con clase 0 de una forma que no puede dividirse con una sola línea.
```

Representación simple:

```text
1     0

0     1
```

No hay una línea recta simple que separe perfectamente los `1` de los `0`.

Este tipo de problema muestra por qué una sola neurona no basta para todo.

La solución histórica fue conectar varias neuronas y organizarlas en capas. Varias neuronas pueden construir fronteras más complejas. Varias capas pueden transformar los datos antes de decidir.

Ese salto lleva desde perceptrón simple hacia redes neuronales multicapa.

Por eso el perceptrón es importante aunque sea limitado:

- muestra cómo una neurona artificial calcula;
- muestra cómo una salida puede depender de pesos;
- muestra qué significa una frontera de decisión;
- muestra por qué necesitamos redes más grandes;
- y prepara la idea de deep learning como composición de muchas transformaciones.

### 2.8 Ejemplo 2: decidir si una solicitud web parece riesgosa

Usemos un segundo ejemplo conectado a aplicaciones web.

Queremos clasificar una solicitud como normal o riesgosa.

Entradas:

| Entrada | Significado | Valor |
|---|---|---|
| `x1` | Demasiados intentos en poco tiempo | `1` sí, `0` no |
| `x2` | Parámetros inesperados | `1` sí, `0` no |
| `x3` | Usuario autenticado correctamente | `1` sí, `0` no |

Pesos:

| Peso | Interpretación | Valor |
|---|---|---:|
| `w1` | Muchos intentos aumentan riesgo | `3` |
| `w2` | Parámetros inesperados aumentan riesgo | `4` |
| `w3` | Autenticación correcta reduce riesgo | `-2` |

Sesgo:

```text
b = -2
```

Fórmula:

```text
z = 3*x1 + 4*x2 - 2*x3 - 2
```

Caso:

```text
x1 = 1  -> demasiados intentos
x2 = 1  -> parámetros inesperados
x3 = 0  -> no está autenticado correctamente
```

Cálculo:

```text
z = 3*1 + 4*1 - 2*0 - 2
z = 3 + 4 - 0 - 2
z = 5
```

Activación:

```text
z >= 0 -> salida = 1
```

Interpretación:

```text
solicitud riesgosa
```

Este ejemplo permite ver algo interesante: un peso puede ser negativo.

El peso `w3 = -2` significa que la autenticación correcta reduce la señal de riesgo.

Eso no significa que un usuario autenticado nunca pueda hacer algo peligroso. Significa que, dentro de este modelo simplificado, esa señal empuja la decisión hacia menor riesgo.

Este matiz es importante:

> Los pesos expresan relaciones aprendidas o definidas dentro del modelo, no verdades absolutas.

Un modelo real de seguridad necesitaría más señales, más datos, validación constante y supervisión humana.

### 2.9 Regla de decisión no es regla de negocio

Un perceptrón puede producir una salida, pero esa salida no reemplaza las reglas de negocio ni las reglas de seguridad de una aplicación.

Ejemplo:

```text
salida = 1 -> solicitud riesgosa
```

Eso podría activar:

- revisión adicional;
- bloqueo temporal;
- desafío de autenticación;
- registro en logs;
- alerta para un administrador.

Pero no conviene que un modelo simple tome decisiones críticas sin control.

En una aplicación real, la salida del modelo debería entenderse como una señal más dentro de un sistema:

```text
modelo -> señal de riesgo -> regla de aplicación -> acción controlada
```

No:

```text
modelo -> castigo automático irreversible
```

Esto importa porque los modelos pueden equivocarse.

Si un falso positivo bloquea a un usuario legítimo, hay impacto.
Si un falso negativo deja pasar un ataque, también hay impacto.

La salida del perceptrón debe interpretarse con criterio:

- ¿qué tan confiable es el modelo?
- ¿con qué datos fue entrenado?
- ¿cuántos errores comete?
- ¿qué costo tiene equivocarse?
- ¿hay revisión humana en casos sensibles?
- ¿la acción automática es reversible?

Este punto conecta deep learning con ética, ciberseguridad y diseño responsable de sistemas.

### 2.10 La intuición geométrica del perceptrón

Aunque no usemos matemáticas avanzadas, conviene entender una intuición geométrica.

Cuando hay dos entradas, el perceptrón crea una línea de separación.

La fórmula:

```text
z = w1*x1 + w2*x2 + b
```

define una frontera cuando:

```text
z = 0
```

Esa frontera separa los casos donde:

```text
z >= 0 -> clase 1
z < 0  -> clase 0
```

No hace falta despejar ecuaciones para captar la idea:

> El perceptrón divide el espacio de entradas en dos zonas.

Una zona activa la salida `1`.
La otra zona activa la salida `0`.

Si el modelo aprende mejores pesos, esa frontera se ubica mejor.

Ejemplo visual textual:

```text
                 clase 1
                    *
                 *     *
              *          *
frontera -------------------------
          *       *
       *       clase 0
```

El entrenamiento busca ajustar la frontera para que clasifique correctamente la mayor cantidad de ejemplos posible.

En deep learning moderno, esta idea se vuelve más compleja, porque muchas capas transforman el espacio antes de decidir. Pero la intuición base sigue siendo útil:

> Un modelo aprende una forma de separar, agrupar o aproximar patrones en los datos.

### 2.11 Del perceptrón a una red neuronal

Una sola neurona artificial puede hacer una decisión simple.

Varias neuronas pueden mirar el problema desde distintas combinaciones de señales.

Ejemplo:

```text
neurona A: detecta señales de phishing
neurona B: detecta patrones de urgencia
neurona C: detecta reputación dudosa
neurona D: combina las anteriores para producir una alerta
```

Representación:

```text
entradas -> [neurona A]
         -> [neurona B] -> combinación -> salida
         -> [neurona C]
```

Cuando conectamos neuronas en capas, cada capa puede transformar la información.

Una red neuronal multicapa se puede leer así:

```text
capa de entrada -> capa oculta -> capa de salida
```

La **capa de entrada** recibe datos.

La **capa oculta** calcula representaciones intermedias. Se llama oculta porque no es directamente la entrada ni la salida visible del modelo.

La **capa de salida** produce la predicción final.

El deep learning aparece cuando existen muchas capas ocultas:

```text
entrada -> capa oculta 1 -> capa oculta 2 -> capa oculta 3 -> salida
```

La idea no es que más capas siempre sean mejores. La idea es que más capas permiten aprender transformaciones más complejas, siempre que existan datos, entrenamiento y evaluación adecuados.

### 2.12 Eje de ciberseguridad: automatizar decisiones exige umbrales responsables

El perceptrón ayuda a entender un problema central en seguridad: decidir cuándo activar una alerta.

Si el umbral es muy sensible, el sistema puede generar demasiadas alertas. Eso produce ruido y cansancio.

Si el umbral es muy permisivo, el sistema puede dejar pasar amenazas.

En seguridad, esto se ve todo el tiempo:

- filtros antispam;
- detección de fraude;
- sistemas de login sospechoso;
- firewalls de aplicación;
- monitoreo de logs;
- detección de anomalías;
- revisión automatizada de código.

Un modelo no solo debe predecir. Debe ser calibrado según el costo del error.

Ejemplo:

| Escenario | Error más grave | Criterio |
|---|---|---|
| Bloquear un correo promocional | Falso positivo menor | Se puede tolerar cierta sensibilidad. |
| Permitir un correo de phishing | Falso negativo grave | Conviene ser más cuidadoso. |
| Bloquear acceso a una cuenta crítica | Falso positivo con impacto operativo | Requiere revisión o segundo factor. |
| Ignorar intento de intrusión | Falso negativo de seguridad | Requiere monitoreo y respuesta rápida. |

La lección para el curso:

> La salida de un modelo debe conectarse con decisiones diseñadas responsablemente.

No basta con decir:

```text
modelo = correcto
```

Hay que preguntar:

- ¿qué pasa si se equivoca?
- ¿a quién afecta?
- ¿la decisión es reversible?
- ¿existe trazabilidad?
- ¿se puede auditar?
- ¿hay intervención humana en casos críticos?

### 2.13 Huella metodológica IA/agentes

Un agente puede ayudar a construir ejemplos de perceptrón, generar tablas y revisar cálculos. Eso es útil porque obliga a traducir la fórmula a pasos concretos.

Prompt útil:

```text
Actúa como tutor de deep learning inicial.
Quiero entender un perceptrón de clasificación binaria sin cálculo avanzado.
Usa este caso: detectar si una solicitud web parece riesgosa.
Define tres entradas binarias, tres pesos, un sesgo y calcula z paso a paso.
Luego aplica una regla de activación por umbral y explica por qué la salida es 0 o 1.
Finalmente, indica qué riesgos tendría usar esa salida como decisión automática de seguridad.
```

Pero no conviene delegar todo.

El estudiante debe revisar:

- si las entradas elegidas representan bien el problema;
- si los pesos tienen sentido intuitivo;
- si los cálculos están correctos;
- si la interpretación de `0` y `1` es clara;
- si el ejemplo confunde predicción con verdad absoluta;
- y si se explican los riesgos de falso positivo y falso negativo.

La regla del bloque:

> Un agente puede generar un ejemplo de perceptrón, pero el criterio humano debe revisar si el ejemplo realmente enseña la decisión y sus límites.

## Producto o evidencia del bloque

- Construir un perceptrón simple con tres entradas binarias, tres pesos, un sesgo y una regla de activación.
- Calcular manualmente `z` para dos casos distintos y explicar por qué la salida es `0` o `1`.
- Identificar al menos una limitación del perceptrón simple y explicar por qué se necesitan redes con varias neuronas o capas.

## Preguntas de chequeo

1. ¿Por qué el perceptrón sirve para explicar clasificación binaria?
2. ¿Qué cambia en la decisión si modificamos un peso o el sesgo?
3. ¿Por qué una salida `1` de un modelo no debería transformarse automáticamente en una decisión crítica sin validación?

## Puente hacia el bloque 3

Ya sabemos cómo un perceptrón produce una salida: recibe entradas, calcula una suma ponderada, aplica una activación y decide entre `0` y `1`. Pero falta la pregunta más importante: ¿cómo aprende esos pesos y ese sesgo? El siguiente bloque entra al ciclo de entrenamiento: predicción, error, pérdida y ajuste.

---

# BLOQUE 3: Entrenamiento, error, pérdida y ajuste

- **Duración:** 35 minutos
- **Objetivo del bloque:** comprender el entrenamiento como un proceso iterativo donde un modelo realiza predicciones, compara esas predicciones con respuestas esperadas, mide el error mediante una función de pérdida y ajusta sus parámetros para mejorar en nuevos intentos.

## Desarrollo

### 3.1 La pregunta central: cómo aprende un modelo

Hasta ahora hemos visto cómo una neurona artificial o un perceptrón produce una salida:

```text
entradas -> pesos -> suma ponderada -> activación -> salida
```

Pero eso todavía no explica aprendizaje.

Si una persona escribe manualmente los pesos, el modelo no está aprendiendo. Solo está ejecutando una regla diseñada por alguien.

El aprendizaje aparece cuando el modelo ajusta sus parámetros a partir de ejemplos.

La pregunta central del bloque es:

> ¿Cómo pasa un modelo de equivocarse mucho a equivocarse menos?

La respuesta básica es:

```text
predice -> compara -> mide error -> ajusta -> vuelve a intentar
```

Ese ciclo es el corazón del entrenamiento.

En aprendizaje supervisado, el modelo recibe ejemplos donde existe una respuesta esperada. A esa respuesta esperada se le suele llamar **etiqueta**.

Ejemplo:

```text
entrada: características de un correo
etiqueta: sospechoso o no sospechoso
```

Otro ejemplo:

```text
entrada: datos de una vivienda
etiqueta: precio real de venta
```

Otro:

```text
entrada: imagen
etiqueta: contiene gato o no contiene gato
```

El modelo intenta producir una predicción. Luego se compara esa predicción con la etiqueta real.

Si la predicción está lejos de la etiqueta, el modelo necesita corregirse.
Si está cerca, el modelo va en mejor dirección.

### 3.2 Notación mínima: `y` y `ŷ`

Para hablar de entrenamiento, necesitamos dos símbolos importantes:

| Símbolo | Se lee como | Qué representa |
|---|---|---|
| `y` | "y real" | Respuesta correcta o etiqueta esperada. |
| `ŷ` | "y estimada" o "y predicha" | Respuesta producida por el modelo. |

El símbolo `ŷ` también se conoce como "y sombrero", porque visualmente es una `y` con un pequeño techo encima. En esta clase usaremos la lectura más intuitiva: **y estimada**.

No debe confundirse con `y'`, que se lee "y prima" y se usa en otros contextos matemáticos. Para esta clase, la diferencia importante es simple:

```text
y  = lo correcto
ŷ  = lo que el modelo predijo
```

Ejemplo:

```text
y  = 1  -> el correo realmente era sospechoso
ŷ  = 0  -> el modelo dijo que no era sospechoso
```

El modelo se equivocó.

Otro ejemplo:

```text
y  = 0  -> el correo realmente no era sospechoso
ŷ  = 1  -> el modelo lo marcó como sospechoso
```

También se equivocó, pero de otra forma.

En clasificación binaria, `y` y `ŷ` suelen tomar valores como `0` o `1`.

En regresión, donde se predice un número continuo, pueden ser valores como:

```text
y  = 450000
ŷ  = 430000
```

Ahí el modelo predijo un precio menor al real.

La notación permite decir algo muy importante de forma corta:

```text
error = y - ŷ
```

Pero hay que entenderlo con cuidado.

### 3.3 Error simple: cuánto se alejó la predicción

Una primera forma de medir error es restar:

```text
error = y - ŷ
```

Ejemplo:

```text
y = 10
ŷ = 7
```

Entonces:

```text
error = 10 - 7
error = 3
```

El modelo quedó `3` unidades por debajo.

Otro caso:

```text
y = 10
ŷ = 13
```

Entonces:

```text
error = 10 - 13
error = -3
```

El modelo quedó `3` unidades por encima.

El signo indica dirección:

- error positivo: la predicción fue menor que el valor real;
- error negativo: la predicción fue mayor que el valor real;
- error cercano a cero: la predicción estuvo cerca.

Pero si solo usamos el error simple, aparece un problema.

Supongamos dos predicciones:

```text
error 1 = 3
error 2 = -3
```

Si los sumamos:

```text
3 + (-3) = 0
```

Parecería que no hubo error total, pero eso es falso. Hubo dos errores, uno hacia abajo y otro hacia arriba.

Por eso muchas funciones de pérdida buscan evitar que errores positivos y negativos se cancelen.

### 3.4 Función de pérdida: medir qué tan mal estuvo el modelo

Una **función de pérdida** es una fórmula que mide qué tan mala fue una predicción.

La pérdida no es el error bruto. Es una forma controlada de convertir el error en un número que el entrenamiento pueda intentar reducir.

La idea es:

```text
si el modelo predice mal -> pérdida alta
si el modelo predice bien -> pérdida baja
```

Una función de pérdida muy simple es la pérdida cuadrática:

```text
L = (y - ŷ)^2
```

Se lee así:

```text
pérdida = (valor real - valor predicho) al cuadrado
```

Cada parte:

| Símbolo | Significado |
|---|---|
| `L` | Pérdida o costo del error. |
| `y` | Valor real esperado. |
| `ŷ` | Valor predicho por el modelo. |
| `(y - ŷ)` | Diferencia entre realidad y predicción. |
| `^2` | Elevar al cuadrado. |

Elevar al cuadrado tiene dos efectos intuitivos:

1. Convierte errores negativos en valores positivos.
2. Castiga más fuerte los errores grandes.

Ejemplo:

```text
y = 10
ŷ = 7
```

Cálculo:

```text
L = (10 - 7)^2
L = 3^2
L = 9
```

Otro caso:

```text
y = 10
ŷ = 9
```

Cálculo:

```text
L = (10 - 9)^2
L = 1^2
L = 1
```

La segunda predicción tuvo menor pérdida porque estuvo más cerca.

Otro caso con error grande:

```text
y = 10
ŷ = 2
```

Cálculo:

```text
L = (10 - 2)^2
L = 8^2
L = 64
```

La pérdida crece mucho. Eso ayuda a que el entrenamiento preste atención a errores grandes.

La pérdida no es una opinión. Es una medida numérica que permite comparar:

```text
predicción A: pérdida 64
predicción B: pérdida 9
predicción C: pérdida 1
```

La mejor, según esa función, es la que tiene pérdida más baja.

### 3.5 Por qué no basta con "acertó" o "falló"

En clasificación binaria simple, puede parecer suficiente decir:

```text
acertó o falló
```

Pero en muchos modelos modernos, la salida no es directamente `0` o `1`. Puede ser una probabilidad o puntaje.

Ejemplo:

```text
ŷ = 0.92 -> el modelo cree con alta confianza que es clase 1
ŷ = 0.51 -> el modelo apenas se inclina hacia clase 1
ŷ = 0.10 -> el modelo cree que probablemente es clase 0
```

Si la respuesta correcta era:

```text
y = 1
```

Entonces `0.92` está mucho mejor que `0.51`, aunque ambas podrían terminar clasificadas como `1` si usamos umbral `0.5`.

La pérdida permite medir esa diferencia.

No solo pregunta:

```text
¿acertó?
```

También pregunta:

```text
¿qué tan lejos estuvo?
¿con qué confianza se equivocó?
¿cuánto hay que corregir?
```

En deep learning, esta idea es central. El entrenamiento necesita una señal más fina que simplemente "bien" o "mal".

### 3.6 Mini ejemplo completo: una predicción numérica

Supongamos un modelo que intenta predecir cuántos minutos tardará una persona en completar una actividad.

Datos:

```text
y = 30 minutos reales
ŷ = 24 minutos predichos
```

Error:

```text
error = y - ŷ
error = 30 - 24
error = 6
```

Pérdida cuadrática:

```text
L = (y - ŷ)^2
L = (30 - 24)^2
L = 6^2
L = 36
```

Ahora imaginemos que después de ajustar el modelo, predice:

```text
ŷ = 28
```

Nueva pérdida:

```text
L = (30 - 28)^2
L = 2^2
L = 4
```

La pérdida bajó de `36` a `4`.

Eso no significa que el modelo sea perfecto. Significa que, para ese ejemplo, mejoró.

Esta es una idea muy importante:

> Entrenar consiste en buscar cambios de parámetros que reduzcan la pérdida.

### 3.7 Qué se ajusta realmente: pesos y sesgo

En una neurona artificial o perceptrón, los valores ajustables son:

```text
w1, w2, w3, ..., wn, b
```

Es decir:

- pesos;
- sesgo.

Las entradas `x` vienen desde los datos. La etiqueta `y` viene desde la respuesta esperada. Pero los pesos y sesgos son parámetros internos del modelo.

Durante el entrenamiento, el modelo intenta encontrar mejores parámetros.

Ejemplo inicial:

```text
z = 3*x1 + 2*x2 + 1*x3 - 3
```

Después de entrenar, podría cambiar a:

```text
z = 4*x1 + 1*x2 + 2*x3 - 2
```

La estructura es la misma, pero los parámetros cambiaron.

Eso cambia la forma en que el modelo decide.

La idea intuitiva es:

```text
si una señal ayuda mucho a acertar -> su peso puede aumentar
si una señal confunde -> su peso puede bajar
si el modelo activa demasiado fácil o demasiado difícil -> el sesgo puede ajustarse
```

No necesitamos calcular derivadas para entender la lógica:

> El entrenamiento modifica pesos y sesgos para que las predicciones futuras produzcan menor pérdida.

### 3.8 Ajuste sin cálculo: intuición del descenso

En cursos avanzados aparece una técnica llamada **descenso de gradiente**. Esa técnica usa cálculo para decidir cómo mover los parámetros.

En esta clase no necesitamos desarrollar cálculo diferencial.

Pero sí necesitamos entender la intuición.

Imaginemos que la pérdida es como una montaña o superficie:

```text
pérdida alta  -> estamos arriba
pérdida baja  -> queremos bajar
```

El entrenamiento busca moverse hacia zonas donde la pérdida sea menor.

Representación intuitiva:

```text
        pérdida alta
             *
           *
         *
       *
     *
   *
 * pérdida baja
```

Cada ajuste de pesos es como dar un paso.

Si el paso reduce la pérdida, vamos mejor.
Si el paso aumenta la pérdida, vamos peor.

La pregunta técnica es:

```text
¿en qué dirección conviene mover los pesos?
```

El descenso de gradiente responde esa pregunta usando derivadas. Pero para nuestro nivel, basta con instalar esta idea:

> El entrenamiento no cambia parámetros al azar; busca una dirección que reduzca el error medido por la pérdida.

Eso explica por qué la función de pérdida es tan importante. Sin pérdida, el modelo no tendría una señal clara para saber si está mejorando o empeorando.

### 3.9 Épocas, iteraciones y muchos ejemplos

Un modelo no aprende a partir de un solo ejemplo.

Normalmente se entrena con muchos ejemplos:

```text
ejemplo 1
ejemplo 2
ejemplo 3
...
ejemplo n
```

Una **iteración** es un paso de entrenamiento donde el modelo procesa uno o varios ejemplos y ajusta parámetros.

Una **época** ocurre cuando el modelo ha revisado todo el conjunto de entrenamiento una vez.

Ejemplo:

```text
Tenemos 1.000 ejemplos de correos.
Una época significa que el modelo revisó esos 1.000 ejemplos una vez.
```

Entrenar por varias épocas significa que el modelo revisa el conjunto varias veces, ajustando sus parámetros en cada pasada.

Representación:

```text
época 1 -> revisa ejemplos -> ajusta
época 2 -> revisa ejemplos -> ajusta
época 3 -> revisa ejemplos -> ajusta
```

La pérdida debería tender a bajar durante el entrenamiento, aunque no siempre baja de forma perfecta en cada paso.

Un patrón esperado sería:

```text
época 1: pérdida 80
época 2: pérdida 45
época 3: pérdida 25
época 4: pérdida 18
```

Pero también puede ocurrir:

```text
época 1: pérdida 80
época 2: pérdida 45
época 3: pérdida 47
época 4: pérdida 32
```

La mejora puede tener ruido. Lo importante es la tendencia general y la evaluación correcta.

### 3.10 Datos de entrenamiento: el modelo aprende lo que ve

El modelo aprende a partir de los datos disponibles.

Eso significa que la calidad de los datos importa muchísimo.

Si los datos son incompletos, el modelo aprenderá patrones incompletos.
Si los datos tienen errores, el modelo puede aprender errores.
Si los datos están sesgados, el modelo puede reproducir sesgos.
Si las etiquetas están mal, el modelo puede ser castigado por predecir correctamente o premiado por predecir mal.

Ejemplo:

```text
Un correo está etiquetado como "normal", pero en realidad era phishing.
```

Si el modelo predice "sospechoso", técnicamente acertó desde el punto de vista humano, pero según la etiqueta del dataset se considera error.

Entonces el entrenamiento podría empujarlo en la dirección equivocada.

Esto es clave:

> El modelo no aprende la verdad. Aprende patrones desde los datos y etiquetas que le entregamos.

Por eso la curación de datos, la revisión de etiquetas y la evaluación son partes centrales del trabajo con IA.

### 3.11 Entrenar no es memorizar respuestas

Un buen entrenamiento no busca que el modelo memorice cada ejemplo.

Busca que aprenda patrones que sirvan para casos nuevos.

Si un estudiante memoriza las respuestas exactas de una prueba, puede rendir bien si le preguntan lo mismo. Pero si cambia el contexto, falla.

Con modelos ocurre algo parecido.

Mal aprendizaje:

```text
memoriza ejemplos exactos
funciona bien con datos conocidos
falla con datos nuevos
```

Mejor aprendizaje:

```text
captura patrones relevantes
funciona razonablemente con datos no vistos
generaliza
```

Esta distinción prepara el bloque 4, donde veremos overfitting y generalización con más detalle.

Por ahora, basta con retener esta idea:

> Reducir la pérdida en entrenamiento no garantiza que el modelo funcione bien en la realidad.

Puede estar aprendiendo patrones útiles o puede estar memorizando demasiado.

### 3.12 Ejemplo completo con tabla pequeña

Volvamos al caso de correos sospechosos.

Usaremos un perceptrón simple:

```text
z = 2*x1 + 1*x2 - 1
```

Activación:

```text
si z >= 0, ŷ = 1
si z < 0, ŷ = 0
```

Entradas:

```text
x1 = tiene enlace extraño
x2 = remitente desconocido
```

Tabla:

| Caso | `x1` | `x2` | `y` real | Cálculo de `z` | `ŷ` predicha | ¿Acierta? |
|---:|---:|---:|---:|---|---:|---|
| 1 | 1 | 1 | 1 | `2*1 + 1*1 - 1 = 2` | 1 | Sí |
| 2 | 0 | 1 | 0 | `2*0 + 1*1 - 1 = 0` | 1 | No |
| 3 | 1 | 0 | 1 | `2*1 + 1*0 - 1 = 1` | 1 | Sí |
| 4 | 0 | 0 | 0 | `2*0 + 1*0 - 1 = -1` | 0 | Sí |

El modelo falla en el caso 2.

Caso 2:

```text
x1 = 0
x2 = 1
y = 0
ŷ = 1
```

El modelo marcó como sospechoso un correo que en la etiqueta real no lo era.

Podemos interpretar que el modelo está dando demasiado peso al remitente desconocido, o que el sesgo permite activar con poca evidencia.

Una posible modificación:

```text
z = 2*x1 + 1*x2 - 2
```

Probemos caso 2:

```text
z = 2*0 + 1*1 - 2
z = -1
ŷ = 0
```

Ahora acierta el caso 2.

Pero hay que revisar todos los casos otra vez, porque arreglar un caso puede romper otro.

Eso muestra por qué el entrenamiento es iterativo y por qué evaluar con un solo ejemplo no basta.

### 3.13 Qué significa minimizar la pérdida

La expresión "minimizar la pérdida" aparece mucho en IA.

Puede sonar compleja, pero significa algo bastante concreto:

> buscar parámetros que hagan que los errores del modelo sean lo más pequeños posible según una función de pérdida.

No significa que el modelo será perfecto.
No significa que entenderá el problema como una persona.
No significa que nunca se equivocará.

Significa que, dentro de los datos, arquitectura y función de pérdida definidos, el entrenamiento intentó encontrar una configuración de parámetros con menor error.

La frase completa sería:

```text
modelo + datos + función de pérdida + algoritmo de ajuste -> parámetros entrenados
```

Si alguno de esos elementos está mal, el resultado puede ser malo:

- datos insuficientes;
- etiquetas incorrectas;
- pérdida mal elegida;
- modelo demasiado simple;
- modelo demasiado complejo;
- entrenamiento insuficiente;
- evaluación débil.

Por eso, en IA aplicada, no basta con decir:

```text
entrené un modelo
```

Hay que preguntar:

```text
¿con qué datos?
¿con qué objetivo?
¿qué pérdida se minimizó?
¿cómo se evaluó?
¿qué errores comete?
¿qué pasa si se equivoca?
```

### 3.14 Eje de ciberseguridad: automatizar errores también escala el daño

En sistemas de seguridad, un modelo entrenado de forma deficiente puede amplificar problemas.

Ejemplo:

```text
modelo para detectar solicitudes maliciosas
```

Si fue entrenado con pocos ejemplos reales de ataque, puede no reconocer variantes nuevas.

Si fue entrenado con demasiados ejemplos de cierto tipo de tráfico legítimo, puede bloquear usuarios normales.

Si fue entrenado con etiquetas incorrectas, puede aprender criterios equivocados.

Si se usa automáticamente sin logs ni revisión, sus errores pueden pasar desapercibidos.

Riesgos:

- falsos negativos que dejan pasar ataques;
- falsos positivos que bloquean operaciones legítimas;
- confianza excesiva en una predicción;
- falta de trazabilidad para explicar por qué se tomó una decisión;
- uso de datos sensibles sin control;
- decisiones automatizadas difíciles de apelar o corregir.

Una regla importante:

> Mientras más automática sea la acción, más cuidadosa debe ser la evaluación del modelo.

No es lo mismo:

```text
modelo sugiere revisar una alerta
```

que:

```text
modelo bloquea una cuenta crítica automáticamente
```

La primera acción apoya una decisión.
La segunda puede afectar directamente a usuarios, sistemas o procesos.

### 3.15 Huella metodológica IA/agentes

Un agente puede ayudar a explicar entrenamiento, generar tablas de error o construir ejemplos paso a paso.

Prompt útil:

```text
Actúa como tutor de deep learning para estudiantes sin cálculo.
Explícame el ciclo de entrenamiento usando un ejemplo pequeño.
Incluye:
- qué es y;
- qué es ŷ;
- cómo calcular error = y - ŷ;
- cómo calcular L = (y - ŷ)^2;
- por qué elevar al cuadrado ayuda;
- y cómo interpretar que la pérdida baje después de ajustar parámetros.
Usa una tabla con 3 ejemplos y evita derivadas.
```

Pero hay que revisar la respuesta del agente.

Validación humana:

- comprobar que `y` y `ŷ` no estén invertidos;
- revisar que los cálculos de error y pérdida sean correctos;
- confirmar que no presente la pérdida como "verdad absoluta";
- verificar que explique entrenamiento como ajuste de parámetros;
- detectar si promete que bajar pérdida siempre implica buen desempeño real;
- revisar si diferencia entrenamiento de evaluación.

La regla del bloque:

> Un agente puede explicar la mecánica del entrenamiento, pero el estudiante debe verificar cálculo, interpretación y límites del ejemplo.

## Producto o evidencia del bloque

- Calcular `error = y - ŷ` y `L = (y - ŷ)^2` para tres predicciones simples.
- Explicar con palabras propias por qué elevar el error al cuadrado evita cancelaciones y castiga más los errores grandes.
- Describir el ciclo `predicción -> pérdida -> ajuste -> nueva predicción` usando un ejemplo concreto.

## Preguntas de chequeo

1. ¿Qué diferencia hay entre `y` y `ŷ`?
2. ¿Por qué una función de pérdida es necesaria para entrenar un modelo?
3. ¿Por qué bajar la pérdida en entrenamiento no garantiza que el modelo funcione bien con datos nuevos?

## Puente hacia el bloque 4

Ya entendemos que entrenar significa ajustar parámetros para reducir una pérdida. Pero todavía falta una pregunta crítica: ¿qué pasa si el modelo mejora demasiado en los ejemplos conocidos y falla con ejemplos nuevos? El siguiente bloque aborda overfitting, generalización, evaluación y el criterio necesario para confiar o no confiar en un modelo.

---

# BLOQUE 4: Redes profundas, overfitting, generalización y evaluación

- **Duración:** 35 minutos
- **Objetivo del bloque:** comprender que una red neuronal profunda combina muchas neuronas y capas para aprender patrones complejos, pero que su valor real depende de generalizar a datos nuevos, evitar sobreajuste y ser evaluada con criterios técnicos antes de usarse en aplicaciones reales.

## Desarrollo

### 4.1 De una neurona a una red

Una neurona artificial puede tomar varias entradas, combinarlas con pesos, sumar un sesgo y producir una salida.

Pero una sola neurona es limitada. Puede representar decisiones simples, especialmente cuando el problema se separa con una frontera lineal.

Muchos problemas reales son más complejos:

- una imagen puede tener bordes, formas, texturas, luces y objetos;
- un texto puede tener palabras, contexto, tono e intención;
- una transacción puede depender de monto, horario, usuario, historial y ubicación;
- una solicitud web puede ser normal por separado, pero sospechosa al verla junto con otros eventos;
- una recomendación depende de historial, preferencias, similitud con otros usuarios y contexto.

Para capturar patrones más complejos, se conectan muchas neuronas.

La estructura básica es:

```text
capa de entrada -> capas ocultas -> capa de salida
```

Cada capa recibe valores, los transforma y entrega nuevos valores a la siguiente capa.

Una red pequeña podría verse así:

```text
entradas -> capa oculta -> salida
```

Una red más profunda:

```text
entradas -> capa oculta 1 -> capa oculta 2 -> capa oculta 3 -> salida
```

La palabra **profunda** en deep learning se refiere a la existencia de múltiples capas de transformación.

No significa que el modelo piense de forma profunda.
Significa que la información pasa por varias etapas matemáticas antes de producir una salida.

La idea clave:

> Una red profunda aprende transformaciones sucesivas de los datos.

### 4.2 Qué hace una capa oculta

Una capa oculta no es mágica. Se llama "oculta" porque no es directamente la entrada ni la salida visible.

La entrada puede ser:

```text
datos originales
```

La salida puede ser:

```text
predicción final
```

Las capas ocultas son pasos intermedios donde la red transforma la información.

Ejemplo conceptual con imágenes:

```text
capa 1: detecta bordes simples
capa 2: combina bordes en formas
capa 3: combina formas en partes de objetos
capa 4: combina partes en objetos completos
```

Ejemplo conceptual con texto:

```text
capa 1: representa palabras o fragmentos
capa 2: combina relaciones cercanas
capa 3: captura patrones de contexto
capa 4: apoya una predicción de intención o respuesta
```

No todas las redes funcionan exactamente así, pero la intuición es útil:

> Las capas intermedias permiten construir representaciones cada vez más elaboradas.

En programación tradicional, una persona diseña manualmente muchas reglas.

En deep learning, el modelo aprende representaciones internas a partir de datos y entrenamiento.

Eso es poderoso, pero también genera un problema:

> Si el modelo aprende patrones incorrectos, superficiales o demasiado específicos, puede fallar fuera del entrenamiento.

### 4.3 Parámetros: por qué una red profunda puede ser tan flexible

Cada conexión entre neuronas tiene un peso.
Cada neurona puede tener un sesgo.

Eso significa que una red con muchas neuronas tiene muchos parámetros.

Ejemplo simple:

```text
3 entradas -> 4 neuronas ocultas -> 1 salida
```

Cada neurona oculta recibe 3 entradas. Entonces hay:

```text
3 pesos por neurona * 4 neuronas = 12 pesos
```

Además, cada neurona oculta puede tener un sesgo:

```text
4 sesgos
```

Luego, la salida recibe las 4 activaciones de la capa oculta:

```text
4 pesos hacia la salida
1 sesgo de salida
```

Total aproximado:

```text
12 pesos + 4 sesgos + 4 pesos + 1 sesgo = 21 parámetros
```

Esta red es pequeña y ya tiene muchos valores ajustables.

Las redes modernas pueden tener millones, miles de millones o incluso más parámetros.

Más parámetros permiten representar patrones más complejos, pero también aumentan el riesgo de aprender detalles irrelevantes si el entrenamiento y la evaluación son deficientes.

La flexibilidad es una herramienta. No es garantía de calidad.

### 4.4 Generalización: el objetivo real

El objetivo de entrenar un modelo no es que memorice el conjunto de entrenamiento.

El objetivo real es que funcione bien con datos nuevos.

Eso se llama **generalización**.

Definición práctica:

> Generalizar significa que el modelo aprendió patrones útiles que también sirven para ejemplos que no vio durante el entrenamiento.

Ejemplo:

```text
entrenamiento: correos conocidos
uso real: correos nuevos que llegan mañana
```

Si el modelo solo funciona con correos conocidos, no sirve mucho.

Lo que necesitamos es:

```text
aprende desde ejemplos pasados -> responde bien ante casos nuevos
```

En una aplicación web o sistema real, la generalización importa porque los usuarios, datos y ataques cambian.

Un modelo de seguridad entrenado con patrones antiguos puede fallar ante variantes nuevas.
Un modelo de recomendación entrenado con datos incompletos puede recomendar mal.
Un clasificador entrenado con ejemplos poco diversos puede equivocarse con usuarios fuera del patrón original.

Regla central:

> Un modelo no se valida mirando solo cómo le fue con los ejemplos que ya conocía.

### 4.5 Separar datos: entrenamiento y prueba

Para evaluar generalización, se separan los datos.

Una división básica:

```text
datos de entrenamiento -> para ajustar parámetros
datos de prueba -> para evaluar con ejemplos no vistos
```

Ejemplo:

```text
1.000 ejemplos disponibles
800 para entrenamiento
200 para prueba
```

El modelo aprende usando los 800 ejemplos de entrenamiento.
Después se evalúa con los 200 ejemplos de prueba.

La idea es simular una situación real:

```text
¿qué tan bien responde el modelo ante datos que no usó para aprender?
```

Si el modelo funciona bien en entrenamiento, pero mal en prueba, hay una señal de alerta.

Comparación:

| Resultado | Interpretación |
|---|---|
| Buen desempeño en entrenamiento y buen desempeño en prueba | Señal positiva: puede estar generalizando. |
| Buen desempeño en entrenamiento y mal desempeño en prueba | Posible overfitting. |
| Mal desempeño en entrenamiento y mal desempeño en prueba | Modelo insuficiente, datos pobres o entrenamiento deficiente. |
| Mal desempeño en entrenamiento y buen desempeño en prueba | Caso raro; revisar evaluación o datos. |

Esta separación no resuelve todos los problemas, pero evita una trampa básica: evaluar al modelo con las mismas preguntas que usó para estudiar.

### 4.6 Overfitting: cuando el modelo memoriza demasiado

**Overfitting** significa sobreajuste.

Ocurre cuando un modelo aprende demasiado bien los detalles del conjunto de entrenamiento, incluyendo ruido, excepciones o patrones accidentales, y luego falla con datos nuevos.

Analogía:

```text
Un estudiante memoriza una guía exacta.
Si la prueba trae las mismas preguntas, le va bien.
Si la prueba cambia el contexto, falla.
```

Con modelos:

```text
el modelo memoriza ejemplos de entrenamiento
parece muy bueno durante entrenamiento
falla cuando aparecen datos nuevos
```

Ejemplo:

Un modelo para detectar correos sospechosos aprende que muchos correos peligrosos del entrenamiento venían con la palabra "urgente".

Si se queda solo con eso, puede marcar cualquier correo con "urgente" como peligroso, aunque sea legítimo.

O puede fallar ante un correo peligroso que no use esa palabra.

El modelo aprendió una pista superficial, no un patrón robusto.

Señal típica:

```text
pérdida de entrenamiento baja
pérdida de prueba alta
```

O en lenguaje simple:

```text
le va muy bien con lo conocido
le va mal con lo nuevo
```

### 4.7 Underfitting: cuando el modelo no alcanza a aprender

El problema contrario es **underfitting** o subajuste.

Ocurre cuando el modelo es demasiado simple, tiene pocos datos útiles o no fue entrenado lo suficiente para capturar el patrón.

Ejemplo:

```text
modelo muy simple para un problema complejo
```

Resultado:

```text
mal desempeño en entrenamiento
mal desempeño en prueba
```

Analogía:

```text
Un estudiante no estudió lo suficiente o usó una explicación demasiado superficial.
Le va mal tanto en ejercicios conocidos como en preguntas nuevas.
```

Comparación:

| Problema | Qué ocurre | Señal |
|---|---|---|
| Underfitting | El modelo no aprende bien ni lo básico. | Error alto en entrenamiento y prueba. |
| Overfitting | El modelo memoriza demasiado lo conocido. | Error bajo en entrenamiento y alto en prueba. |
| Generalización razonable | Aprende patrones útiles. | Error aceptable en entrenamiento y prueba. |

Esta comparación ayuda a entender que no siempre la solución es "hacer el modelo más grande".

Si hay underfitting, puede faltar capacidad, datos, entrenamiento o mejores características.
Si hay overfitting, más capacidad puede empeorar el problema.

### 4.8 Métricas simples: accuracy no siempre basta

Una forma común de evaluar clasificación es **accuracy** o exactitud.

Fórmula:

```text
accuracy = predicciones correctas / total de predicciones
```

Ejemplo:

```text
80 predicciones correctas de 100
accuracy = 80 / 100
accuracy = 0.80
accuracy = 80%
```

Parece claro, pero puede engañar.

Supongamos un sistema que detecta fraudes.

De 1.000 transacciones:

```text
990 son legítimas
10 son fraude
```

Un modelo tonto que diga siempre "legítima" tendría:

```text
990 aciertos de 1.000
accuracy = 99%
```

Pero fallaría en lo más importante:

```text
no detecta ningún fraude
```

Por eso, en problemas reales, accuracy no siempre basta.

También importa preguntar:

- ¿qué tipos de error comete?
- ¿cuántos falsos positivos produce?
- ¿cuántos falsos negativos deja pasar?
- ¿qué costo tiene cada error?
- ¿el conjunto de datos está balanceado?
- ¿la métrica refleja el riesgo real del sistema?

Para esta clase no necesitamos dominar todas las métricas avanzadas. Pero sí necesitamos instalar el criterio:

> Una métrica alta no siempre significa que el modelo sea útil o seguro.

### 4.9 Falsos positivos y falsos negativos en evaluación

En clasificación binaria aparecen cuatro casos:

| Caso | Significado |
|---|---|
| Verdadero positivo | El modelo marcó positivo y era positivo. |
| Verdadero negativo | El modelo marcó negativo y era negativo. |
| Falso positivo | El modelo marcó positivo, pero era negativo. |
| Falso negativo | El modelo marcó negativo, pero era positivo. |

Ejemplo con correos:

| Caso | Ejemplo |
|---|---|
| Verdadero positivo | Marca phishing y sí era phishing. |
| Verdadero negativo | No marca alerta y era correo normal. |
| Falso positivo | Marca alerta, pero era correo normal. |
| Falso negativo | No marca alerta, pero era phishing. |

Ambos errores importan, pero no siempre tienen el mismo costo.

En seguridad, un falso negativo puede ser grave porque deja pasar una amenaza.
Un falso positivo también puede ser costoso si bloquea usuarios o genera demasiadas alertas.

La evaluación debe considerar contexto:

```text
no existe una métrica universalmente suficiente
```

La pregunta correcta es:

```text
¿qué error es más peligroso en este sistema?
```

### 4.10 Buen desempeño no significa comprensión humana

Un modelo puede acertar muchas predicciones sin comprender como una persona.

Esto es especialmente importante al hablar de IA moderna.

Si un modelo clasifica imágenes, no "ve" como una persona.
Si un modelo genera texto, no "entiende" necesariamente como una persona.
Si un modelo predice riesgo, no "sabe" por sí mismo qué impacto social tendrá su decisión.

Lo que hace es transformar datos usando parámetros aprendidos.

Eso no le quita valor. Los modelos pueden ser muy útiles.

Pero evita una confusión peligrosa:

> Buen desempeño estadístico no equivale a comprensión humana ni a criterio profesional.

En aplicaciones reales, el modelo debe estar dentro de un sistema con:

- validación;
- monitoreo;
- límites;
- revisión humana cuando corresponda;
- logs;
- explicación suficiente para tomar decisiones;
- y mecanismos de corrección.

### 4.11 Riesgos de datos: sesgo, representatividad y deriva

Un modelo depende de los datos con que fue entrenado y evaluado.

Tres problemas importantes:

| Problema | Qué significa | Ejemplo |
|---|---|---|
| Sesgo | Los datos reflejan desigualdades, errores o preferencias no deseadas. | Un modelo funciona peor para ciertos grupos de usuarios. |
| Falta de representatividad | Los datos no cubren bien los casos reales. | Entrenar solo con usuarios de un tipo y luego usarlo con todos. |
| Deriva de datos | El mundo cambia y los datos nuevos ya no se parecen a los antiguos. | Nuevas tácticas de phishing que no estaban en el entrenamiento. |

La deriva de datos es especialmente importante en sistemas vivos.

Una aplicación web cambia:

- cambian usuarios;
- cambian patrones de uso;
- cambian ataques;
- cambian productos;
- cambian reglas de negocio;
- cambian fuentes de datos.

Un modelo que funcionaba bien hace seis meses puede degradarse.

Por eso la evaluación no es un trámite inicial. Es una práctica continua.

### 4.12 Eje de ciberseguridad: modelos como superficie de ataque

Cuando una aplicación integra IA, el modelo también se vuelve parte de la superficie de ataque.

No solo hay que proteger formularios, endpoints, sesiones y bases de datos.
También hay que revisar cómo se usan los modelos.

Riesgos posibles:

- datos sensibles usados para entrenamiento sin control;
- respuestas del modelo que exponen información;
- agentes que ejecutan acciones sin permisos bien definidos;
- usuarios que manipulan entradas para forzar salidas;
- modelos que confían demasiado en patrones superficiales;
- automatizaciones que escalan errores;
- falta de logs para auditar decisiones.

Ejemplo:

```text
Un agente clasifica tickets de soporte y puede cerrar casos automáticamente.
```

Riesgo:

```text
si clasifica mal, puede cerrar reclamos legítimos sin revisión
```

Otro ejemplo:

```text
Un modelo prioriza alertas de seguridad.
```

Riesgo:

```text
si aprende mal, puede ocultar señales críticas o saturar al equipo con ruido
```

Regla del bloque:

> La IA no elimina la necesidad de seguridad; agrega nuevas piezas que también deben diseñarse, limitarse, evaluarse y auditarse.

### 4.13 Evaluación responsable antes de usar un modelo

Antes de confiar en un modelo, conviene revisar una lista mínima:

1. **Datos:** ¿de dónde vienen?, ¿son representativos?, ¿tienen errores?, ¿incluyen información sensible?
2. **Objetivo:** ¿qué está intentando predecir realmente el modelo?
3. **Entrenamiento:** ¿con qué ejemplos aprendió?
4. **Prueba:** ¿se evaluó con datos no vistos?
5. **Métrica:** ¿la métrica usada refleja el riesgo real?
6. **Errores:** ¿qué falsos positivos y falsos negativos produce?
7. **Impacto:** ¿qué pasa si el modelo se equivoca?
8. **Automatización:** ¿la salida recomienda, prioriza o ejecuta acciones?
9. **Supervisión:** ¿hay revisión humana en casos sensibles?
10. **Monitoreo:** ¿se revisa si el modelo se degrada con el tiempo?

Este checklist conecta la clase con trabajo profesional.

No basta con saber que una red neuronal tiene capas.
Hay que saber qué preguntas hacer antes de usarla.

### 4.14 Puente hacia LLMs y agentes

Los LLMs también son modelos entrenados.

Son mucho más grandes y complejos que los ejemplos de esta clase, pero comparten ideas de fondo:

- reciben datos de entrada;
- transforman representaciones;
- tienen parámetros;
- fueron entrenados con grandes cantidades de datos;
- producen predicciones;
- pueden equivocarse;
- requieren evaluación;
- pueden integrarse en sistemas con herramientas y agentes.

La diferencia es la escala y la arquitectura.

En la próxima clase aparecerán conceptos como:

- embeddings;
- transformers;
- tokens;
- prompting;
- herramientas;
- memoria;
- evaluación de agentes.

Pero la base conceptual ya está instalada:

```text
datos -> representación -> predicción -> evaluación -> ajuste o control
```

Sin esa base, los LLMs parecen magia.
Con esa base, se entienden como sistemas técnicos entrenados sobre datos, con capacidades reales y límites reales.

### 4.15 Huella metodológica IA/agentes

Un agente puede ayudar a estudiar overfitting y generalización si se le pide que compare escenarios.

Prompt útil:

```text
Actúa como tutor de deep learning inicial.
Explícame la diferencia entre underfitting, overfitting y generalización
usando una analogía de estudio para una prueba y luego un ejemplo de ciberseguridad.
Incluye una tabla con:
- desempeño en entrenamiento;
- desempeño en prueba;
- interpretación;
- riesgo si se usa en una aplicación real.
Evita cálculo avanzado y no presentes accuracy como métrica suficiente para todos los casos.
```

La respuesta del agente debe revisarse con criterio.

Validación humana:

- comprobar que no confunda overfitting con buen aprendizaje;
- revisar que explique datos de entrenamiento y prueba;
- verificar que no diga que más datos o más capas siempre solucionan todo;
- confirmar que mencione falsos positivos y falsos negativos cuando hable de seguridad;
- detectar si simplifica demasiado la evaluación;
- revisar si conecta el modelo con impacto real de la aplicación.

La regla del bloque:

> Un agente puede explicar conceptos de evaluación, pero no puede decidir por sí solo si un modelo es seguro, útil o justo para un contexto real.

## Producto o evidencia del bloque

- Comparar tres escenarios: underfitting, overfitting y generalización razonable.
- Explicar por qué se separan datos de entrenamiento y datos de prueba.
- Analizar un caso de clasificación en ciberseguridad indicando qué sería un falso positivo y qué sería un falso negativo.
- Proponer tres preguntas que habría que responder antes de usar un modelo en una aplicación web real.

## Preguntas de chequeo

1. ¿Por qué un modelo puede tener muy buen resultado en entrenamiento y aun así fallar en datos nuevos?
2. ¿Qué diferencia hay entre underfitting, overfitting y generalización?
3. ¿Por qué una métrica como accuracy puede ser engañosa en problemas de seguridad o fraude?

## Puente hacia el cierre

La clase comenzó con la inspiración biológica de una neurona y terminó con criterios para evaluar modelos profundos en contextos reales. Ahora podemos cerrar con una idea central: deep learning no es magia ni pensamiento humano, sino una forma poderosa de transformar datos mediante parámetros aprendidos, cuya utilidad depende de entrenamiento, evaluación, límites y criterio técnico.

---

# Cierre de la Clase

## Síntesis Final

En esta sesión construimos una base técnica para entender deep learning sin tratarlo como magia ni como una caja negra imposible de explicar.

El recorrido comenzó con una idea biológica: las neuronas reciben señales, integran información y pueden activar una respuesta. Desde ahí pasamos a una abstracción artificial: entradas numéricas, pesos, sesgo, suma ponderada, activación y salida.

Luego estudiamos el perceptrón como una primera neurona artificial capaz de tomar decisiones simples. Vimos que una salida `0` o `1` no aparece por intuición humana, sino por una secuencia concreta:

```text
entradas -> pesos -> suma ponderada -> sesgo -> activación -> salida
```

Después entramos al entrenamiento. El modelo predice, compara su predicción con una respuesta esperada, calcula una pérdida y ajusta sus parámetros. La idea central no es que el modelo "entienda", sino que modifica pesos y sesgos para reducir errores.

Finalmente vimos que aprender no basta. Un modelo puede memorizar demasiado, fallar con datos nuevos, depender de datos sesgados o entregar métricas engañosas. Por eso conceptos como generalización, overfitting, datos de prueba, falsos positivos, falsos negativos y evaluación responsable son parte esencial del trabajo con IA.

Los puntos clave de la clase son:

- **La neurona artificial es una abstracción matemática:** se inspira en la biología, pero no replica el cerebro humano.
- **Los pesos indican importancia:** cada entrada influye más o menos según el peso asignado o aprendido.
- **El sesgo ajusta la activación:** permite hacer más fácil o más difícil que una neurona produzca cierta salida.
- **El perceptrón clasifica de forma simple:** combina señales y decide entre dos posibles salidas.
- **Entrenar es reducir pérdida:** el modelo ajusta parámetros para acercar `ŷ` a `y`.
- **Generalizar es el objetivo real:** el modelo debe funcionar con datos nuevos, no solo con ejemplos conocidos.
- **Evaluar es obligatorio:** una métrica alta no basta si no se entienden los errores, los datos y el impacto de las decisiones.
- **La IA también exige seguridad:** modelos, agentes y automatizaciones pueden amplificar errores si se usan sin límites, monitoreo o revisión humana.

## Fórmulas mínimas de la clase

Estas fórmulas resumen el lenguaje técnico trabajado:

### Suma ponderada

```text
z = w1*x1 + w2*x2 + ... + wn*xn + b
```

Lectura:

```text
la señal total se calcula multiplicando cada entrada por su peso,
sumando esos aportes y agregando un sesgo
```

### Activación simple por umbral

```text
si z >= 0, salida = 1
si z < 0, salida = 0
```

Lectura:

```text
si la señal acumulada alcanza el umbral, la neurona se activa
```

### Error simple

```text
error = y - ŷ
```

Lectura:

```text
compara la respuesta correcta con la predicción del modelo
```

### Pérdida cuadrática

```text
L = (y - ŷ)^2
```

Lectura:

```text
mide qué tan lejos estuvo la predicción, evita cancelaciones
y castiga más los errores grandes
```

## Glosario mínimo

| Concepto | Definición breve |
|---|---|
| Entrada `x` | Dato que recibe el modelo. |
| Peso `w` | Valor que indica cuánto influye una entrada. |
| Sesgo `b` | Ajuste que cambia la facilidad de activación. |
| Suma ponderada `z` | Combinación de entradas, pesos y sesgo. |
| Activación | Regla que transforma `z` en una salida. |
| `y` | Respuesta correcta o etiqueta real. |
| `ŷ` | Predicción del modelo; se lee "y estimada" o "y sombrero". |
| Pérdida `L` | Medida numérica del error. |
| Parámetros | Valores ajustables del modelo, como pesos y sesgos. |
| Entrenamiento | Proceso de ajustar parámetros para reducir pérdida. |
| Generalización | Capacidad de funcionar bien con datos nuevos. |
| Overfitting | Sobreajuste; el modelo memoriza demasiado los datos conocidos. |
| Underfitting | Subajuste; el modelo no alcanza a aprender el patrón. |
| Falso positivo | El modelo marca algo como positivo, pero no lo era. |
| Falso negativo | El modelo no marca algo como positivo, pero sí lo era. |

## Checklist para interpretar un modelo

Antes de confiar en un modelo de IA, revisar:

1. ¿Qué datos recibe como entrada?
2. ¿Qué intenta predecir?
3. ¿Cuál es la respuesta correcta esperada?
4. ¿Qué pérdida o métrica se usa para evaluarlo?
5. ¿Fue evaluado con datos nuevos?
6. ¿Qué errores comete?
7. ¿Qué pasa si produce un falso positivo?
8. ¿Qué pasa si produce un falso negativo?
9. ¿La salida recomienda, prioriza o ejecuta una acción?
10. ¿Existe supervisión humana, monitoreo o posibilidad de corrección?

## Preguntas de salida

1. ¿Por qué una red neuronal artificial se inspira en la biología, pero no debe confundirse con un cerebro humano?
2. ¿Qué papel cumplen los pesos y el sesgo en una neurona artificial?
3. ¿Por qué `ŷ` no es lo mismo que `y`?
4. ¿Para qué sirve una función de pérdida durante el entrenamiento?
5. ¿Qué riesgo aparece cuando un modelo memoriza demasiado los datos de entrenamiento?
6. ¿Por qué accuracy puede ser engañosa en problemas de fraude, seguridad o detección de amenazas?
7. ¿Qué debería revisar un desarrollador antes de integrar un modelo o agente en una aplicación web?

## Próximo Paso

En la siguiente clase avanzaremos desde deep learning hacia modelos de lenguaje, LLMs y agentes.

La conexión es directa: los LLMs no aparecen desde la nada. Son modelos entrenados sobre datos, con arquitecturas más complejas, representaciones internas, predicciones y mecanismos de evaluación.

El siguiente paso será entender:

- qué son tokens y embeddings;
- por qué los transformers fueron importantes;
- cómo un modelo de lenguaje predice texto;
- qué cambia cuando un modelo usa herramientas;
- por qué los agentes necesitan contexto, memoria, límites y evaluación;
- y cómo todo esto se conecta con el trabajo moderno de desarrollo web.

Idea final de la sesión:

> Entender deep learning no exige dominar cálculo avanzado desde el primer día. Exige comprender qué representan los datos, cómo se combinan señales, cómo se mide el error, cómo se ajustan parámetros y por qué validar un modelo es tan importante como entrenarlo.
