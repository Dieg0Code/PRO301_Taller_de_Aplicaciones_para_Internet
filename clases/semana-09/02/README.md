# Clase 02 - Semana 09 - Construir IA para un dominio acotado: el caso Ataxx (modelo, MCTS, entrenamiento y torneo en vivo)

- **Unidad:** 03 · Datos, IA Aplicada y Proyecto Integrador
- **Fecha:** Martes 12 de mayo de 2026
- **Duración:** 3 horas (10:50 - 13:10)
- **Modalidad:** Presencial en Laboratorio PC
- **Docente:** Diego Obando

---

# Objetivos de la Clase

## Objetivo General

Al finalizar esta sesión, el estudiante será capaz de leer críticamente un sistema real de inteligencia artificial aplicado a un dominio acotado, identificando cómo se modelan las reglas del problema, cómo se diseñan heurísticas, cómo se entrena una red neuronal acompañada de búsqueda guiada y self-play, qué decisiones humanas sostienen el proceso, cómo se evalúa si el modelo realmente juega mejor y qué lecciones se transfieren al diseño de funcionalidades de IA en sus propios proyectos web.

## Objetivos Específicos

1. **Modelar un juego de información perfecta como problema de IA**, identificando estado, acciones legales, transiciones, condición de término y señal de recompensa, y comprendiendo por qué la fuerza bruta no alcanza cuando el espacio de estados crece.
2. **Distinguir heurísticas de reglas fijas de modelos que aprenden**, reconociendo dónde cada enfoque funciona, dónde se quiebra y por qué una "IA" puede ser, en realidad, una tabla de criterios bien ordenados sin ningún aprendizaje real detrás.
3. **Comprender la idea de policy y value como dos cabezas de una misma red neuronal**, explicando intuitivamente qué representa cada una y por qué tiene sentido combinarlas con búsqueda para tomar decisiones en un juego.
4. **Explicar el ciclo MCTS y el ciclo de self-play**, reconociendo selección, expansión, evaluación y retropropagación dentro del árbol de búsqueda, y entendiendo cómo el modelo genera sus propios datos jugando contra sí mismo.
5. **Reconocer los riesgos reales de un entrenamiento**, incluyendo sobreajuste a oponentes heurísticos, regresión por bootstrap mal configurado y divergencia entre la red aislada y el conjunto modelo más búsqueda, usando los postmortems del propio modelo Ataxx Zero como evidencia documentada.
6. **Leer indicadores de calidad de un modelo entrenado**, interpretando score contra heurísticas, head-to-head entre generaciones, round-robin agregado y curvas de pérdida y precisión a partir de un dashboard analítico real.
7. **Transferir el criterio del caso Ataxx al proyecto integrador**, distinguiendo entre una funcionalidad de IA que se ve impresionante pero no aporta y una que resuelve una tarea concreta con entradas, salidas, límites, evaluación y validación humana claros.

## Competencias Transversales

- **Pensamiento de sistema:** comprender que una IA aplicada no es solo un modelo, sino un sistema con representación del problema, datos, entrenamiento, búsqueda, evaluación, persistencia, métricas y decisiones humanas en cada capa.
- **Lectura crítica de modelos:** no aceptar que algo es "bueno" porque gana en una métrica aislada; cruzar varias señales, mirar perfiles por nivel, comparar contra pares y leer la curva completa antes de declarar una mejora.
- **Prototipado responsable:** distinguir un experimento controlado de una funcionalidad lista para integrarse a un producto, considerando costos, datos, evaluación, reproducibilidad y supervisión.
- **Ciberseguridad y ética aplicada a IA:** reconocer que entrenar e integrar modelos implica decisiones sobre datos, cómputo, transparencia de resultados y comunicación honesta de lo que el modelo hace y de lo que no hace.
- **Trabajo agentic supervisado:** apoyarse en agentes para explorar arquitectura, generar primeras versiones de código de entrenamiento o evaluación, redactar análisis y diagnosticar errores, manteniendo siempre intención explícita, validación con datos reales y juicio técnico humano sobre la decisión final.

---

# Mapa de la Clase

| Horario | Sección | Propósito |
|---------|---------|-----------|
| 10:50 - 11:00 | Objetivos y encuadre | Conexión con la clase del lunes y presentación del caso Ataxx como sistema construido de punta a punta. |
| 11:00 - 11:25 | Bloque 1 | Ataxx como problema de IA: reglas del juego, espacio de estados, ramificación y por qué la fuerza bruta no alcanza. |
| 11:25 - 11:50 | Bloque 2 | Heurísticas: reglas fijas que parecen IA. Recorrido por los seis niveles, dónde funcionan y dónde se quiebran. |
| 11:50 - 12:00 | Pausa | Descanso técnico. |
| 12:00 - 12:25 | Bloque 3 | El modelo Ataxx Zero: transformer policy/value, MCTS, self-play, entrenamiento, postmortems y lectura del dashboard. |
| 12:25 - 12:50 | Bloque 4 | Torneo en vivo: partidas de cada estudiante contra heurísticas y modelo, lectura del HUD en tiempo real y comentario técnico mientras los demás observan. |
| 12:50 - 13:10 | Cierre | Premios del torneo, síntesis del caso y conexión con la prueba final del 19/05. |

> Los horarios del Bloque 4 y del cierre se ajustan al ritmo real del torneo. Si una partida cierra antes, se gana tiempo de comentario técnico sobre las decisiones que tomó el modelo; si se extiende, se acorta la síntesis final pero se conserva siempre la entrega de premios.

---

# BLOQUE 1: Ataxx como problema de IA

- **Duración:** 25 minutos
- **Objetivo del bloque:** comprender que Ataxx no es un juego decorativo elegido por capricho, sino un dominio acotado, formalizable y con suficiente profundidad combinatoria como para necesitar técnicas reales de inteligencia artificial. Al final del bloque, el estudiante debe poder describir las reglas del juego sin ambigüedad, identificar las condiciones de término y explicar por qué un computador no puede simplemente "probar todas las jugadas hasta el final".
- **Modalidad:** Expositiva con demostración en vivo en la arena Pygame, lectura comentada de fragmentos reales del repositorio `ataxx-zero-ai` y comparación con otros juegos conocidos.

## Desarrollo

### 1.1 ¿Qué es Ataxx y por qué nos interesa como caso de IA?

Ataxx es un juego de tablero para dos jugadores, sobre una cuadrícula de `7 × 7`, donde cada lado intenta ocupar la mayor cantidad posible de casillas con sus piezas al terminar la partida. Es un juego de información perfecta: ambos jugadores ven el tablero completo en todo momento, no hay cartas escondidas, no hay azar, no hay dados. Toda la incertidumbre proviene de la decisión del otro jugador.

Para una persona que recién lo aprende, Ataxx puede parecerse a una mezcla entre Reversi y un juego de territorio. Esa primera impresión es útil para entrar, pero engaña: las reglas son muy simples de enunciar, mientras que las consecuencias de cada jugada son extremadamente difíciles de anticipar más allá de los dos o tres turnos siguientes.

Esto importa porque es justo el tipo de problema donde la inteligencia artificial moderna ha tenido éxito en los últimos años. Damas, ajedrez, Go y Ataxx comparten una misma forma matemática: son juegos secuenciales, deterministas, de información perfecta, con un espacio de estados grande pero finito. Una vez que un problema queda enunciado así, podemos aplicarle herramientas concretas: búsqueda en árbol, evaluación de posiciones, aprendizaje por refuerzo, redes neuronales y self-play. Las mismas técnicas que llevaron a AlphaZero a vencer a campeones humanos en Go y en ajedrez pueden estudiarse en escala reducida sobre Ataxx, en un tablero de `49` casillas que cabe en la pantalla y cuyo entrenamiento es viable en una sesión de GPU gratuita en Kaggle.

En este repositorio, las constantes que fijan la forma del problema son explícitas y vivien en `src/game/constants.py`:

```python
# src/game/constants.py

BOARD_SIZE = 7              # Tablero 7x7 = 49 casillas en total.
OBSERVATION_CHANNELS = 11   # Capas que recibe la red neuronal por cada posición (se ve más adelante).

EMPTY = 0       # Casilla vacía.
PLAYER_1 = 1    # Jugador 1, representado con +1.
PLAYER_2 = -1   # Jugador 2, representado con -1: permite expresar "perspectiva del rival" como una multiplicación.

WIN_P1 = 1   # Victoria del jugador 1.
WIN_P2 = -1  # Victoria del jugador 2.
DRAW = 0     # Empate.
```

Estas cinco líneas son la base de todo lo que viene después. El tablero tiene 7 filas y 7 columnas; cada casilla puede estar vacía o contener una pieza del jugador 1 o del jugador 2. El uso de `+1` y `-1` para los jugadores no es estético: permite expresar la idea de "perspectiva del jugador actual" como una simple multiplicación, algo que será central cuando entremos al modelo en el Bloque 3.

### 1.2 Las reglas del juego: cómo se mueve una pieza

Cada partida empieza con cuatro piezas, una en cada esquina del tablero. Las esquinas opuestas pertenecen al mismo jugador. Si miramos el código que inicializa el tablero, vemos exactamente eso:

```python
# src/game/board.py
def _init_pieces(self) -> None:
    """Apertura estándar con esquinas opuestas ocupadas."""
    # Jugador 1 ocupa las esquinas (0,0) y (6,6) — diagonal principal.
    self.grid[0, 0] = PLAYER_1
    self.grid[BOARD_SIZE - 1, BOARD_SIZE - 1] = PLAYER_1
    # Jugador 2 ocupa las esquinas (0,6) y (6,0) — diagonal opuesta.
    self.grid[0, BOARD_SIZE - 1] = PLAYER_2
    self.grid[BOARD_SIZE - 1, 0] = PLAYER_2
```

Los jugadores se turnan, comenzando por el jugador 1. En su turno, un jugador debe hacer **exactamente un movimiento**, eligiendo una de sus propias piezas como origen y una casilla vacía como destino. La distancia entre origen y destino, medida en casillas máximas en cualquier eje (lo que se llama distancia de Chebyshev), determina qué tipo de movimiento es:

- **Clonar**, si la distancia es exactamente `1`. La pieza original se mantiene en su lugar y aparece una copia en la casilla destino. El jugador queda con una pieza más en el tablero.
- **Saltar**, si la distancia es exactamente `2`. La pieza original desaparece de su casilla y reaparece en el destino. El total de piezas del jugador no cambia, pero su posición se reordena.

Cualquier otra distancia es ilegal. En particular, no se puede mover una pieza más allá del radio `2`, no se puede saltar sobre piezas propias o enemigas como en damas, y no se puede mover hacia una casilla ocupada.

Esto se ve, sin adornos, en el código que aplica un movimiento:

```python
# src/game/board.py — fragmento de step()

# Distancia de Chebyshev: máximo entre la diferencia de filas y la de columnas.
dist = move_distance(r_start, c_start, r_end, c_end)
if is_clone_move(dist):
    # Distancia == 1: clonar. La pieza original permanece; se crea una copia en el destino.
    self.grid[r_end, c_end] = self.current_player
    self.empty_count -= 1  # Una casilla vacía menos en el tablero.
    # Incremento del conteo del jugador que acaba de clonar.
    if self.current_player == PLAYER_1:
        self.p1_count += 1
    else:
        self.p2_count += 1
elif is_jump_move(dist):
    # Distancia == 2: saltar. La pieza se mueve: aparece en destino y desaparece del origen.
    # El conteo total del jugador no cambia.
    self.grid[r_end, c_end] = self.current_player
    self.grid[r_start, c_start] = EMPTY
else:
    # Cualquier otra distancia es ilegal (radio máximo del movimiento = 2).
    raise ValueError(f"Illegal move distance: {dist}.")
```

La consecuencia táctica más importante de tener dos tipos de movimiento es que clonar y saltar tienen significados estratégicos opuestos. Clonar es expansivo: cada clonación incrementa la presencia del jugador. Saltar es reposicional: no cambia el conteo, pero permite alcanzar lugares lejanos o escapar de una zona comprometida. Saber cuándo conviene cada uno es uno de los aprendizajes más profundos del juego.

### 1.3 La regla que cambia todo: la infección

Hasta aquí Ataxx se parece a un juego de territorio relativamente predecible. La regla que rompe esa simetría y vuelve al juego mucho más interesante es la **infección**: cuando una pieza llega a su casilla destino, **todas las piezas enemigas adyacentes** a esa casilla se convierten en piezas propias del jugador que acaba de mover.

En el código, esta conversión ocurre justo después de aplicar el movimiento, dentro de `_infect_neighbors`:

```python
# src/game/board.py
def _infect_neighbors(self, r: int, c: int) -> None:
    """Convierte piezas enemigas adyacentes a (r, c)."""
    enemy = opponent(self.current_player)
    # Define la ventana 3x3 centrada en la casilla donde acaba de aterrizar la pieza,
    # con cuidado de no salirse del tablero en los bordes.
    r_min = max(0, r - 1)
    r_max = min(BOARD_SIZE, r + 2)
    c_min = max(0, c - 1)
    c_max = min(BOARD_SIZE, c + 2)
    window = self.grid[r_min:r_max, c_min:c_max]
    # Cuenta cuántas piezas enemigas quedaron adyacentes (hasta 8 en el peor caso).
    converted = int(np.sum(window == enemy))
    # Y las convierte a piezas propias. Esta es LA jugada que vuelve a Ataxx interesante.
    window[window == enemy] = self.current_player
    # A continuación se actualizan los contadores p1_count y p2_count según converted.
    if converted > 0:
        if self.current_player == PLAYER_1:
            self.p1_count += converted
            self.p2_count -= converted
        else:
            self.p2_count += converted
            self.p1_count -= converted
```

La función toma la ventana `3 × 3` centrada en la casilla donde acaba de aterrizar la pieza y convierte a su color todas las piezas enemigas que encuentre. No es necesario que la pieza atacante esté "rodeando" al enemigo como en Reversi: basta con que el enemigo quede adyacente a la casilla recién ocupada.

Esta única regla dispara la complejidad del juego. Una sola jugada puede convertir cero, una, dos o hasta ocho piezas enemigas en piezas propias. Eso significa que el conteo de piezas, que parece la métrica natural para saber quién va ganando, puede invertirse en un solo turno. Una posición que se ve cómodamente ganadora puede colapsar en una jugada si el rival encuentra una casilla desde la cual infectar varias piezas a la vez. Y al revés: un jugador que parece estar perdiendo puede recuperarse con una jugada de salto que aterrice junto a un grupo de piezas enemigas mal protegido.

Cuando estudiemos las heurísticas en el Bloque 2 y el modelo en el Bloque 3, esta regla será la fuente de la mayoría de las decisiones técnicas. La infección es la razón por la que no basta con contar piezas para evaluar una posición, y es la razón por la que las heurísticas más simples se quedan cortas frente a un rival que aprende a explotarlas.

### 1.4 Cuándo termina una partida y quién gana

Ataxx tiene cuatro condiciones de término, y todas conviven en una sola función dentro del repositorio:

```python
# src/game/board.py
def is_game_over(self) -> bool:
    """
    Condiciones de término:
    1) tablero lleno,
    2) un lado se quedó sin piezas,
    3) tope de medias jugadas (regla anti-bucle de la variante),
    4) triple repetición,
    5) ambos jugadores sin movimiento legal.
    """
    # 1) Las 49 casillas están ocupadas: gana quien tenga más piezas.
    if self.empty_count == 0:
        return True
    # 2) Eliminación: alguien se quedó sin piezas (puede pasar tras una infección masiva).
    if self.p1_count == 0 or self.p2_count == 0:
        return True
    # 3) Tope de 100 medias jugadas (50 por jugador): evita partidas infinitas en self-play.
    if self.half_moves >= 100:
        return True
    # 4) Triple repetición de posición: declara empate forzado (como en ajedrez).
    if max(self._position_counts.values(), default=0) >= 3:
        return True
    # 5) Bloqueo total: ningún jugador puede mover, aunque queden casillas vacías inalcanzables.
    return not self._has_move_for(self.current_player) and not self._has_move_for(
        opponent(self.current_player)
    )
```

Conviene comentarlas en orden:

1. **Tablero lleno.** Si las `49` casillas están ocupadas, la partida termina y gana quien tenga más piezas.
2. **Eliminación.** Si un jugador pierde todas sus piezas, pierde la partida inmediatamente, sin importar cuántas casillas vacías queden. Esto puede pasar si una sola jugada del rival infecta a todas sus piezas restantes.
3. **Tope de medias jugadas.** Para evitar partidas infinitas, esta variante usa un tope de `100` medias jugadas (`50` jugadas por jugador). Cuando se llega al tope, la partida termina y se cuenta el conteo final. Esta regla no es decorativa: es lo que mantiene el entrenamiento por self-play en tiempos manejables.
4. **Triple repetición.** Si una misma posición, considerando también quién tiene el turno, aparece tres veces durante la partida, se declara empate. Es la misma idea que la regla de las tres repeticiones en ajedrez, y obliga al jugador que va ganando a comprometerse con un plan concreto.
5. **Bloqueo total.** Si ninguno de los dos puede mover, la partida termina, aun con casillas vacías que ningún bando puede alcanzar.

El resultado se calcula desde la perspectiva del jugador 1: `+1` si gana el jugador 1, `-1` si gana el jugador 2 y `0` si la partida termina en empate. Esta convención numérica volverá a ser importante en el Bloque 3, cuando el modelo aprenda a estimar el valor de una posición y ese valor sea, literalmente, un número entre `-1` y `+1`.

### 1.5 Por qué no podemos simplemente probar todas las jugadas

Hasta aquí el juego puede parecer pequeño. El tablero tiene `49` casillas, los movimientos son cortos, las reglas caben en una página. Sería tentador pensar que un computador puede explorar todas las posibles continuaciones desde una posición dada y elegir la mejor, igual que se haría en tres en raya. Esa intuición es exactamente lo que vamos a desarmar en este apartado.

Empecemos por el espacio de estados. Cada una de las `49` casillas puede estar en uno de tres estados: vacía, ocupada por el jugador 1 o ocupada por el jugador 2. Esto da, sin considerar restricciones de legalidad, hasta `3^49 ≈ 2.4 × 10^23` configuraciones posibles. Para tener escala, ese número es comparable al de las gotas de agua en todos los lagos de Chile. Aun descartando configuraciones imposibles desde una partida real, la cantidad de posiciones legales sigue siendo enorme.

El problema empeora cuando consideramos la **ramificación**, que es el número de jugadas legales disponibles en cada turno. En las primeras jugadas, cuando cada lado tiene pocas piezas, la ramificación es modesta. Pero a partir de la jugada cinco o seis, cuando cada jugador puede tener entre `10` y `30` piezas activas, cada una con varias casillas vacías a distancia `1` o `2`, el número de movimientos legales por turno se vuelve fácilmente de entre `40` y `200`. Es decir, el árbol de búsqueda se ensancha rápido. Si quisiéramos pensar diez jugadas por delante, en el peor caso tendríamos del orden de `100^10 = 10^20` ramas. Ningún computador del mundo recorre tantas ramas en tiempo real.

Para tener una comparación honesta con otros juegos conocidos, conviene fijar las magnitudes:

| Juego | Tamaño del tablero | Estados aproximados |
|-------|--------------------|---------------------|
| Tres en raya | 3 × 3 | ~5.000 |
| Conecta cuatro | 7 × 6 | ~4 × 10^12 |
| Damas (8 × 8) | 8 × 8 | ~5 × 10^20 |
| **Ataxx 7 × 7** | **7 × 7** | **~10^22 a 10^23** |
| Ajedrez | 8 × 8 | ~10^46 |
| Go (19 × 19) | 19 × 19 | ~10^170 |

Ataxx vive entre las damas y el ajedrez. Está lejos del tres en raya, donde sí es viable resolver el juego completamente por fuerza bruta y construir una tabla con la jugada óptima en cada posición. Para Ataxx, esa estrategia es matemáticamente imposible en una vida humana, sin importar cuán grande sea el computador.

Eso fuerza a que cualquier sistema que quiera jugar Ataxx razonablemente bien deba decidir **sin haber visto el final**. Tiene que estimar, a partir de una posición intermedia, cuán buena es esa posición sin poder verificarlo exhaustivamente. Esa estimación es el corazón del problema, y es precisamente lo que el resto de la clase va a explorar: primero con heurísticas escritas a mano, después con una red neuronal entrenada con búsqueda.

### 1.6 Puente al Bloque 2

Hemos enunciado el juego en términos formales: un tablero, dos tipos de movimiento, una regla de infección que lo vuelve combinatorialmente denso, cinco condiciones de término y un espacio de estados demasiado grande para resolverlo por fuerza bruta. Esa es la materia prima de cualquier sistema de IA que quiera jugar Ataxx.

La primera respuesta histórica a este tipo de problemas no fue el aprendizaje automático, sino las **heurísticas**: funciones escritas a mano por personas que conocen el juego, que asignan un número a cada posición y guían la decisión del computador hacia las jugadas con mejor número. En el Bloque 2 vamos a recorrer las seis heurísticas implementadas en este mismo repositorio, ordenadas de la más ingenua a la más sofisticada, y vamos a mostrar exactamente dónde cada una empieza a quedarse corta. Ese análisis nos dejará listos para entender, en el Bloque 3, por qué tuvo sentido entrenar una red neuronal, qué hace esa red que las heurísticas no podían hacer y por qué incluso así el proceso necesitó cinco intentos documentados antes de funcionar bien.

## Preguntas guía del Bloque 1

1. Si una sola jugada puede convertir hasta ocho piezas enemigas, ¿por qué contar piezas no alcanza para saber quién va ganando?
2. ¿Qué diferencia estratégica tiene clonar respecto de saltar, más allá del conteo, y cuándo conviene cada uno?
3. Si Ataxx tiene un espacio de estados comparable al de las damas, ¿por qué no podríamos simplemente probar todas las jugadas posibles hasta el final y elegir la mejor?

---

# BLOQUE 2: Heurísticas: reglas fijas que parecen inteligencia

- **Duración:** 25 minutos
- **Objetivo del bloque:** comprender qué es una heurística en el contexto de un juego, cómo se construye una función de puntaje que guíe la decisión sin haber explorado el árbol completo, y por qué incluso las heurísticas mejor diseñadas tienen un techo claro y son vulnerables a un rival que aprende a explotarlas. Al final del bloque, el estudiante debe poder leer una de las heurísticas reales del repositorio, identificar qué premia y qué castiga, y proponer una situación donde esa heurística tomaría una decisión equivocada.
- **Modalidad:** Lectura comentada de las heurísticas del repositorio `ataxx-zero-ai`, demostración cruzada de partidas en la arena (heurística vs heurística) y análisis de un patrón de explotación documentado en uno de los postmortems del modelo.

## Desarrollo

### 2.1 Qué es una heurística y por qué necesitamos una

En el Bloque 1 cerramos con una conclusión incómoda: el árbol de jugadas de Ataxx es demasiado grande para recorrerlo completo. Si un programa quiere elegir una jugada en un tiempo razonable, no puede esperar a "ver el final" de cada línea posible. Tiene que decidir antes, con información incompleta. Y para decidir antes necesita una forma rápida de responder a la pregunta:

> Si el tablero está así y me toca jugar, ¿cuán buena es esta jugada para mí?

Una **heurística** es una función que asigna un número a una jugada (o a una posición) para responder exactamente esa pregunta, sin recurrir a búsqueda exhaustiva. La palabra viene del griego *heuriskein*, "encontrar", y se usa en ciencias y en ingeniería desde hace décadas para describir métodos prácticos que no garantizan la solución óptima, pero entregan una solución suficientemente buena en un tiempo razonable. Una heurística no es un teorema. Es una **regla de pulgar** codificada con cuidado.

En el contexto de un juego, una heurística suele tomar la forma de una suma ponderada de criterios que una persona con experiencia consideraría al evaluar una posición. Esos criterios son escritos a mano por quien diseña la heurística, con valores numéricos elegidos por intuición y refinados por prueba y error. Por ejemplo, una heurística para Ataxx podría tener pesos como estos:

- `+1.0` por cada pieza enemiga que se infectó al jugar el movimiento;
- `+0.15` extra si el movimiento es de tipo clonar;
- `+0.05` por cercanía al centro del tablero;
- `−0.65` por el mejor castigo que el rival pueda asestar en su próxima jugada;
- `+0.12` por la diferencia en cantidad de jugadas legales que quedan disponibles para uno mismo respecto al rival.

Lo importante es que estos pesos no salieron de ningún entrenamiento. Salieron de la cabeza de quien escribió el código. Esa es exactamente la diferencia con un modelo que aprende, que en el Bloque 3 va a estimar pesos análogos pero a partir de millones de partidas jugadas contra sí mismo.

Las heurísticas tienen tres virtudes que las hacen valiosas incluso en presencia de modelos modernos:

1. **Son baratas de evaluar.** Una buena heurística decide en microsegundos. Un modelo grande con búsqueda puede tardar segundos por jugada.
2. **Son inspeccionables.** Cada peso tiene un significado claro, se puede explicar y se puede modificar. Un modelo neuronal es mucho más opaco.
3. **Son baselines honestos.** Cuando uno entrena un modelo, necesita comparar contra algo. Si el modelo nuevo no le gana a la heurística más simple de manera consistente, probablemente no aprendió nada útil.

El repositorio `ataxx-zero-ai` mantiene seis heurísticas, ordenadas de la más ingenua a la más sofisticada. La declaración inicial vive en `src/agents/heuristic.py`:

```python
# src/agents/heuristic.py
HEURISTIC_LEVELS: tuple[str, ...] = (
    "easy",
    "normal",
    "hard",
    "apex",
    "gambit",
    "sentinel",
)
DEFAULT_HEURISTIC_LEVEL = "normal"
```

Cada nivel comparte un mismo núcleo de evaluación y agrega encima sus propias capas. Vamos a recorrerlos en orden, deteniéndonos en lo que cada uno aporta.

### 2.2 El núcleo compartido: la función `_score_move`

Antes de mirar los seis niveles, hay que mirar la función que todos comparten. Es la heurística base, escrita en quince líneas, y captura una idea muy concreta: una buena jugada es la que aumenta mi cantidad de piezas, reduce la del rival, prefiere clonar antes que saltar y prefiere posiciones más centrales.

```python
# src/agents/heuristic.py
def _score_move(state: AtaxxBoard, move: Move) -> float:
    _, _, r2, c2 = move        # Extrae fila y columna del destino (r2, c2).
    me = state.current_player  # +1 o -1, según a quién le toque jugar.

    # Conteo de piezas ANTES de aplicar el movimiento.
    before_me = int(np.sum(state.grid == me))
    before_opp = int(np.sum(state.grid == -me))

    # Se copia el tablero para no modificar el estado real: queremos SIMULAR la jugada.
    scratch = state.copy()
    scratch.step(move)  # Aplica el movimiento sobre la copia (dispara la infección si corresponde).

    # Conteo de piezas DESPUÉS de aplicar el movimiento sobre la copia.
    after_me = int(np.sum(scratch.grid == me))
    after_opp = int(np.sum(scratch.grid == -me))

    # Premia clonar (la pieza original se mantiene + aparece la copia).
    clone_bonus = 0.15 if _chebyshev_distance(move) == 1 else 0.0
    # Premia terminar más cerca del centro (3,3): más casillas alcanzables en el siguiente turno.
    center_bonus = 0.05 * (3 - abs(r2 - 3) + 3 - abs(c2 - 3))

    # Score = (cuánto crecí) + (cuánto se redujo el rival) + bonus.
    return float((after_me - before_me) + (before_opp - after_opp)) + clone_bonus + center_bonus
```

Léase con calma:

1. Se cuenta cuántas piezas tiene el jugador actual antes del movimiento (`before_me`) y cuántas tiene el rival (`before_opp`).
2. Se hace una **copia** del tablero. Esta copia es clave: la función no modifica el estado real, solo simula la jugada para evaluar su efecto. La línea `scratch = state.copy()` aparece en cada heurística del archivo, y es la base del razonamiento "si jugara esto, ¿qué pasaría?".
3. Se aplica el movimiento sobre la copia con `scratch.step(move)`. Eso ejecuta la jugada y, automáticamente, dispara la infección de las piezas enemigas adyacentes que vimos en el Bloque 1.
4. Se cuentan las piezas después del movimiento.
5. El puntaje principal es `(after_me - before_me) + (before_opp - after_opp)`. La primera mitad mide cuánto crecí; la segunda mide cuánto se redujo el rival. Si el movimiento clonó y además infectó tres piezas enemigas, este término puede valer `4.0`. Si solo saltó sin infectar a nadie, vale `0.0`.
6. Se agrega un pequeño bonus por clonar (`+0.15`), porque clonar incrementa la presencia neta del jugador en el tablero. Saltar no recibe bonus, e incluso recibirá penalización en niveles más altos.
7. Se agrega un bonus de centralidad (`+0.05` por casilla, multiplicado por una medida de cercanía al centro `(3, 3)`). La idea es preferir, todo lo demás igual, terminar más cerca del centro, donde una pieza puede alcanzar más casillas en su próximo turno.

Este es el lenguaje base. Toda heurística del repositorio se construye agregando términos encima de `_score_move`. Saber qué hace esa función es saber leer el resto del archivo.

### 2.3 Las seis heurísticas, de la más ingenua a la más sofisticada

#### `easy`

El nivel `easy` toma el puntaje base de cada movimiento legal y elige usando un **softmax** con temperatura alta:

```python
if level == "easy":
    # Puntúa cada movimiento legal con la función base.
    scored_moves = [(move, _score_move(board, move)) for move in valid_moves]
    # Elige con softmax y temperatura ALTA (0.85): el mejor es algo más probable, pero hay azar.
    return _softmax_choice(rng, scored_moves, temperature=0.85)
```

Un softmax convierte una lista de puntajes en una distribución de probabilidades. La temperatura controla qué tan "marcada" es esa distribución. Una temperatura alta como `0.85` deja a casi todos los movimientos con una probabilidad parecida; el movimiento mejor puntuado es más probable que el peor, pero no es seguro. El resultado es un rival que casi siempre evita los desastres obvios, pero que también juega movimientos mediocres con frecuencia. Es un buen oponente para introducir el juego sin frustrar al estudiante.

#### `normal`

`normal` usa el mismo puntaje base, pero baja la temperatura del softmax a `0.35`:

```python
if level == "normal":
    # Misma idea que easy, pero con temperatura BAJA (0.35):
    # el mejor movimiento gana casi siempre, con un pequeño margen de variedad.
    return _softmax_choice(rng, scored_moves, temperature=0.35)
```

Con esta temperatura, el movimiento mejor puntuado es claramente preferido, pero todavía queda algo de azar para evitar partidas idénticas. Esa pequeña dosis de aleatoriedad es importante por una razón pedagógica y otra técnica: pedagógica, porque mantiene a las partidas variadas y entretenidas; técnica, porque si la heurística fuera puramente determinista, dos partidas con la misma apertura jugarían exactamente igual hasta el final.

#### `hard`

A partir de `hard`, las heurísticas dejan de ser solo "elegir el mejor movimiento inmediato" y empiezan a considerar lo que el rival va a hacer después. `hard` agrega dos términos:

```python
elif level == "hard":
    # Simula mi jugada para ver qué le queda al rival.
    scratch = board.copy()
    scratch.step(move)
    # Penaliza si el rival tiene una respuesta muy fuerte después de mi movimiento.
    # Se resta porque el puntaje del rival es daño contra mí.
    score -= 0.65 * _best_reply_penalty(scratch)
    # Premia tener más jugadas legales que el rival después del movimiento.
    score += 0.12 * _mobility_advantage(scratch)
```

El primer término llama a `_best_reply_penalty`, que simula la mejor respuesta del rival y devuelve su puntaje desde la perspectiva del rival. Como el puntaje del rival es daño contra nosotros, lo restamos: `score -= 0.65 * _best_reply_penalty(scratch)`. Esto introduce un razonamiento de un nivel de profundidad: "no me basta con que mi movimiento se vea bien ahora; tiene que seguir viéndose bien después de que el rival juegue su mejor respuesta".

El segundo término, `_mobility_advantage`, mide la diferencia entre la cantidad de movimientos legales que el jugador tendrá disponibles tras la jugada y los que tendrá el rival. Una posición con muchas opciones futuras suele ser mejor que una posición rígida.

`hard` también deja de usar softmax y elige siempre el movimiento con el puntaje máximo, rompiendo empates al azar:

```python
best_score = max(score for _, score in scored_moves)
best_moves = [move for move, score in scored_moves if score == best_score]
return best_moves[int(rng.integers(0, len(best_moves)))]
```

Esto la vuelve mucho más fuerte que `normal`, pero también mucho más predecible.

#### `apex`

`apex` da el siguiente paso: en lugar de mirar solo la mejor respuesta del rival, simula también nuestra contrarrespuesta. Es lo que en teoría de juegos se llama **búsqueda de dos plies** o lookahead de dos jugadas.

```python
def _score_apex(board: AtaxxBoard, move: Move) -> float:
    # 1) Puntaje base de mi movimiento.
    base = _score_move(board, move)

    # 2) Simulo mi jugada y veo qué responde el rival.
    after = board.copy()
    after.step(move)
    opp_moves = after.get_valid_moves()
    mobility = _mobility_advantage(after)

    # Caso especial: si el rival se queda sin movimientos, premio fuerte (es casi victoria).
    if len(opp_moves) == 0:
        return base + 3.0 + 0.2 * mobility

    # 3) De todas las respuestas del rival, considero solo las 3 mejores (optimización: el rival no juega mal).
    opp_candidates = sorted(
        opp_moves,
        key=lambda opp_move: _score_move(after, opp_move),
        reverse=True,
    )[:3]

    # 4) Para cada respuesta del rival, simulo mi mejor contrarrespuesta y mido la línea completa.
    worst_line = float("-inf")
    for opp_move in opp_candidates:
        reply_board = after.copy()
        reply_board.step(opp_move)
        reply_moves = reply_board.get_valid_moves()
        # Mi mejor contrarrespuesta (o castigo si me quedo sin movimientos).
        reply_best = (
            max(_score_move(reply_board, reply_move) for reply_move in reply_moves)
            if len(reply_moves) > 0
            else -2.5
        )
        # Valor de la línea = lo bueno que es para el rival - lo bueno que es mi contrarrespuesta.
        line_value = _score_move(after, opp_move) - 0.55 * float(reply_best)
        # Me quedo con el PEOR escenario para mí (suponiendo que el rival juega contra mí).
        worst_line = max(worst_line, float(line_value))

    # 5) Score final: base - peor línea que el rival puede forzar + bonus por movilidad.
    return base - 0.92 * worst_line + 0.2 * mobility
```

La idea, paso a paso:

1. Calcula la puntuación base de mi jugada.
2. Aplica mi jugada y observa las jugadas legales del rival.
3. Considera solo las **tres mejores** respuestas del rival, no todas. Esto es una optimización: el rival, si juega bien, no usará una respuesta mediocre.
4. Para cada una de esas tres respuestas, simula la mejor contrarrespuesta mía.
5. Guarda la peor línea para mí (el peor de los tres escenarios), y le resta peso al puntaje principal.

El resultado es una heurística que no se deja seducir por un movimiento que se ve glorioso en lo inmediato pero que abre una línea desastrosa dos turnos después. Es claramente más fuerte que `hard`. También es más cara: evaluar un solo movimiento implica simular hasta `1 + 3 + 3·k` movimientos posteriores, donde `k` es el número de respuestas legales tras la jugada del rival.

#### `gambit` y `sentinel`

Las dos últimas heurísticas tienen el mismo presupuesto de cómputo que `apex`, pero perfiles estratégicos distintos. Son útiles porque permiten estudiar el comportamiento del modelo frente a estilos opuestos.

`gambit` es agresiva. Premia saltar, premia atacar desde los flancos y desde los bordes, premia llegar a casillas que tengan muchas piezas enemigas alrededor (lo que llama `pressure_ring`):

```python
def _score_gambit(board: AtaxxBoard, move: Move) -> float:
    _, _, r2, c2 = move                  # Destino del movimiento.
    base = _score_move(board, move)      # Puntaje base (crecimiento neto + bonus de centro y clonar).
    # Simula el movimiento sobre una copia para evaluar consecuencias.
    after = board.copy()
    after.step(move)
    enemy = after.current_player         # Tras jugar, el turno pasa al rival: ese es "enemy".
    # Cuenta piezas enemigas adyacentes a la casilla donde aterricé (radio 1):
    # mientras más alto, más expuesta queda mi pieza al próximo turno del rival.
    frontier_risk = _count_targets_in_radius(
        after,
        row=r2,
        col=c2,
        target=enemy,
        radius=1,
    )
    # Cuenta piezas enemigas en un anillo más amplio (radio 2): aterrizar cerca de cúmulos
    # enemigos es una oportunidad de presión para los próximos turnos.
    pressure_ring = _count_targets_in_radius(
        after,
        row=r2,
        col=c2,
        target=enemy,
        radius=2,
    )
    # Premia saltar (+0.55), castiga clonar (-0.12): estilo agresivo, gusta del movimiento.
    jump_bonus = 0.55 if _chebyshev_distance(move) == 2 else -0.12
    # Premia atacar por los flancos del tablero (fila o columna 0 o 6).
    flank_bonus = 0.35 if r2 in {0, 6} or c2 in {0, 6} else 0.0
    # Mide qué tan fuerte es la mejor respuesta del rival a este movimiento.
    hard_guard = _best_reply_penalty(after)
    return (
        base
        - 0.58 * hard_guard              # Castiga dejar al rival con una respuesta fuerte.
        + 0.46 * float(pressure_ring)    # Premia llegar cerca de cúmulos enemigos.
        + jump_bonus
        + flank_bonus
        - 0.42 * float(frontier_risk)    # Castiga aterrizar pegado a piezas enemigas adyacentes.
    )
```

`gambit` desprecia clonar (`-0.12`) y favorece saltar (`+0.55`). Esto la vuelve un rival inquieto, que avanza, se infiltra y prefiere combates abiertos.

`sentinel`, en cambio, es defensiva. Premia tener piezas propias adyacentes (`local_support`), premia el centro con más fuerza (`+0.18` por casilla en lugar de `+0.05`), prefiere clonar sobre saltar (`+0.40` vs `-0.06`), y castiga con dureza llegar a casillas con muchas piezas enemigas cerca (`frontier_risk`):

```python
def _score_sentinel(board: AtaxxBoard, move: Move) -> float:
    _, _, r2, c2 = move                  # Destino del movimiento.
    base = _score_move(board, move)      # Puntaje base.
    # Simula el movimiento sobre una copia.
    after = board.copy()
    after.step(move)
    enemy = after.current_player         # Rival después de mi jugada.
    own_piece = -enemy                   # Mis piezas (la contraparte de enemy).
    # Piezas enemigas a un paso de mi destino: mide qué tan vulnerable quedé.
    frontier_risk = _count_targets_in_radius(
        after,
        row=r2,
        col=c2,
        target=enemy,
        radius=1,
    )
    # Piezas propias a un paso de mi destino, menos 1 (la propia pieza que acabo de poner):
    # cuántas piezas mías protegen el flanco del lugar donde aterricé.
    local_support = (
        _count_targets_in_radius(
            after,
            row=r2,
            col=c2,
            target=own_piece,
            radius=1,
        )
        - 1
    )
    # Diferencia de movilidad: cuántas jugadas futuras tengo yo vs cuántas tiene el rival.
    mobility = _mobility_advantage(after)
    # Premia con fuerza el centro (+0.18 por casilla, casi 4× más que el score base).
    center_bonus = 0.18 * (3 - abs(r2 - 3) + 3 - abs(c2 - 3))
    # Estilo defensivo: clonar es muy preferido (+0.4), saltar levemente castigado (-0.06).
    clone_bias = 0.4 if _chebyshev_distance(move) == 1 else -0.06
    # Mide qué tan fuerte es la mejor respuesta del rival.
    hard_guard = _best_reply_penalty(after)
    return (
        base
        - 0.56 * hard_guard
        + 0.34 * mobility               # Premia tener más opciones futuras que el rival.
        + 0.36 * float(local_support)   # Premia tener piezas propias adyacentes (muros).
        + center_bonus
        + clone_bias
        - 0.5 * float(frontier_risk)    # Castigo fuerte por aterrizar expuesto al rival.
    )
```

`sentinel` construye muros, se queda en el medio, casi no salta, y obliga al rival a desgastarse atacando posiciones bien defendidas. Es, en evaluaciones controladas, la heurística más fuerte del archivo. Pero **no es la más fuerte del repositorio**: el modelo entrenado le gana en partidas largas. Veremos en el Bloque 3 cómo y por qué.

### 2.4 El techo de toda heurística escrita a mano

Hemos pasado por seis funciones, cada una más sofisticada que la anterior. La pregunta natural es: si seguimos agregando términos, ¿podemos llegar tan lejos como queramos? La respuesta es **no**, y la razón es importante.

Una heurística escrita a mano tiene cuatro límites estructurales que ningún término adicional puede borrar:

1. **Los pesos son fijos.** `_score_move` siempre devuelve el mismo valor para la misma jugada en la misma posición. Una heurística no aprende: no mejora con la experiencia, no se adapta al estilo del rival, no incorpora datos de partidas anteriores. El mismo error se repite cada vez que aparece el mismo patrón.

2. **El diseñador no ve todos los patrones.** Quien escribe una heurística codifica los criterios que él conoce. Si el juego tiene patrones tácticos sutiles que él nunca notó (por ejemplo, una secuencia de cuatro jugadas que crea una trampa específica), esos patrones no van a aparecer en la heurística. El conocimiento del juego en la cabeza del diseñador es siempre incompleto.

3. **Los pesos están sintonizados a una distribución de partidas.** Los `0.65`, `0.46`, `0.55` no son universales. Son valores que funcionan razonablemente bien en un rango de posiciones típicas. Frente a un rival que conduce las partidas hacia posiciones atípicas, esos pesos pueden estar mal calibrados.

4. **Y, sobre todo: una heurística determinista es explotable.** Si yo sé que `sentinel` siempre prefiere clonar antes que saltar, puedo planear mis jugadas asumiendo que va a clonar. Si yo sé que `gambit` siempre va a saltar al flanco, puedo construir trampas en los flancos. La heurística no cambia de estrategia: hace siempre la misma elección frente al mismo patrón. Quien encuentra el patrón, encuentra la grieta.

Este cuarto punto no es teórico. En este mismo curso, durante una actividad anterior, un estudiante descubrió, jugando partidas seguidas contra una versión inicial de una heurística similar, que existía una secuencia de movimientos que la forzaba a una respuesta perdedora. La heurística no había sido diseñada para defender ese patrón, así que cada vez que aparecía la secuencia, la heurística entraba en la misma trampa. Ese descubrimiento, hecho por un humano jugando, ilustra exactamente lo que en el campo se llama **opponent exploitation**: aprender a explotar una política fija explorando su comportamiento hasta encontrar sus puntos ciegos.

Lo interesante es que el problema no es exclusivo del humano que juega. Un modelo neuronal entrenado contra una sola heurística aprende a explotarla con la misma lógica, y eso introduce un riesgo que los postmortems del modelo Ataxx Zero documentan con detalle: una versión anterior del modelo entrenado contra una única heurística fuerte logró ganar el `81 %` de las partidas contra ella, pero al enfrentarlo contra heurísticas más débiles perdía sistemáticamente. Había aprendido a explotar a un rival específico, no a jugar Ataxx. Ese postmortem se llama PM05 en el repositorio y es uno de los hilos conductores de la siguiente parte de la clase.

### 2.5 Cuándo conviene una heurística y cuándo conviene aprender

Después de este recorrido, conviene cerrar con un mapa breve, porque ningún enfoque es universalmente mejor. Las heurísticas se quedan en este curso, no como reliquia, sino como herramienta.

Conviene una heurística cuando:

- El dominio es lo suficientemente acotado y bien entendido como para que un experto pueda codificar criterios sólidos;
- Se necesita una decisión muy rápida y barata, sin GPU ni latencia tolerable;
- Se necesita un baseline contra el cual medir cualquier modelo aprendido;
- Se necesita una política inspeccionable, donde cada decisión pueda explicarse por sus términos.

Conviene un modelo que aprende cuando:

- El dominio tiene patrones tácticos que ningún humano puede enumerar a mano;
- Hay datos suficientes (reales o sintéticos vía self-play) para entrenar sin trampas;
- El costo de cómputo en tiempo de juego es aceptable;
- Se está dispuesto a invertir en la infraestructura de entrenamiento, evaluación y diagnóstico.

Para Ataxx, las heurísticas son el punto de partida natural. Llegaron hasta `sentinel`, donde el techo se vuelve visible. El siguiente paso, y el corazón del Bloque 3, es reemplazar pesos escritos a mano por pesos aprendidos, y reemplazar lookaheads cortos por una búsqueda guiada por una red neuronal. Es ahí donde el sistema deja de ser una heurística más sofisticada y empieza a parecerse a las técnicas que llevaron a AlphaZero a los titulares mundiales.

### 2.6 Puente al Bloque 3

Tres ideas se llevan al siguiente bloque. La primera, que una heurística es una función rápida y barata para puntuar jugadas, pero sus pesos son fijos y su cobertura es la que su autor pudo imaginar. La segunda, que cualquier política fija es vulnerable a un rival que aprende a explotarla, sea ese rival humano o automático. Y la tercera, que para subir el techo hace falta cambiar el enfoque: ya no escribir pesos, sino aprenderlos; ya no mirar una o dos jugadas adelante, sino guiar una búsqueda más profunda con una red neuronal que entiende patrones de posición.

En el Bloque 3 vamos a abrir el modelo Ataxx Zero. Veremos cómo una red neuronal con dos cabezas (policy y value) reemplaza a `_score_move`, cómo el algoritmo MCTS reemplaza al lookahead de `apex`, y cómo el self-play reemplaza al diseñador humano que escribía los pesos.

## Preguntas guía del Bloque 2

1. Si las heurísticas `gambit` y `sentinel` cuestan lo mismo de evaluar y vienen del mismo núcleo, ¿por qué tiene sentido mantener las dos y no quedarse solo con la más fuerte?
2. ¿Qué diferencia concreta hay entre `hard` y `apex` cuando ambas miran hacia adelante, y en qué tipo de posición esa diferencia se nota más?
3. Si una heurística determinista siempre toma la misma decisión frente al mismo tablero, ¿qué estrategia podría seguir un jugador, humano o automático, para descubrir y explotar sus puntos ciegos?

---

# BLOQUE 3: El modelo Ataxx Zero: transformer, MCTS, self-play y ocho generaciones

- **Duración:** 25 minutos
- **Objetivo del bloque:** comprender cómo se reemplaza una heurística escrita a mano por un sistema que aprende a jugar a partir de millones de partidas contra sí mismo, identificando las tres piezas centrales (una red neuronal con dos cabezas, una búsqueda guiada por esa red y un loop de entrenamiento por self-play), y reconociendo, en la genealogía real de ocho generaciones entrenadas en este proyecto, qué hace que un modelo mejore, qué lo hace empeorar y cómo se evalúa honestamente si genuinamente juega mejor que el anterior.
- **Modalidad:** Lectura comentada de la arquitectura del modelo y del bucle MCTS, recorrido por la genealogía de los ocho modelos del repositorio en orden de peor a mejor, y lectura de los postmortems clave.

## Desarrollo

### 3.1 El cambio de paradigma: tres reemplazos

En el Bloque 2 cerramos identificando cuatro límites estructurales de las heurísticas: pesos fijos, cobertura limitada al conocimiento del diseñador, calibración para una distribución específica de partidas, y explotabilidad por determinismo. El sistema que ocupa la segunda mitad de esta clase —el modelo Ataxx Zero— ataca esos cuatro límites mediante tres reemplazos simultáneos:

| Pieza heurística | Reemplazo del modelo |
|------------------|----------------------|
| Función `_score_move` con pesos a mano | Red neuronal `AtaxxTransformerNet` con pesos aprendidos |
| Lookahead corto de `apex` (dos plies, top-3) | MCTS guiado por la red, con cientos de simulaciones por jugada |
| Diseñador humano que ajusta los pesos | Self-play: el modelo juega contra sí mismo y aprende de los resultados |

Ninguno de los tres reemplazos vive solo. La red sin búsqueda toma decisiones débiles. La búsqueda sin red retrocede a fuerza bruta y vuelve al problema del Bloque 1. El self-play sin red ni búsqueda no genera datos útiles. La combinación de los tres es lo que hace que el sistema funcione, y es la misma combinación, en escala mucho mayor, que usaron DeepMind y otros laboratorios para AlphaZero y MuZero. Lo que cambia aquí es la escala: en lugar de miles de TPUs y semanas, este proyecto usa dos GPUs T4 gratuitas de Kaggle y unas horas por iteración. La técnica es la misma; los recursos, modestos.

### 3.2 La red neuronal: dos cabezas, un cerebro compartido

El archivo `src/model/transformer.py` define la red. Su estructura, en lo esencial, es la siguiente:

```python
# src/model/transformer.py — fragmento de AtaxxTransformerNet

# Proyecta cada casilla (11 números: planos de observación) a un vector de d_model dimensiones.
self.input_proj = nn.Linear(self.num_input_channels, d_model)
# Embedding posicional aprendible: una "etiqueta" única por casilla + 1 para el token CLS.
self.pos_embed = nn.Parameter(torch.zeros(1, self.num_cells + 1, d_model))
# Token especial que resumirá la posición completa para la cabeza de valor.
self.cls_token = nn.Parameter(torch.zeros(1, 1, d_model))

# Bloque transformer: cada casilla puede "mirar" a las demás vía atención multi-cabeza.
encoder_layer = nn.TransformerEncoderLayer(
    d_model=d_model, nhead=nhead,
    dim_feedforward=dim_feedforward, dropout=dropout,
    activation="gelu", batch_first=True, norm_first=False,
)
# Se apilan num_layers capas idénticas; más capas = más profundidad de razonamiento.
self.encoder = nn.TransformerEncoder(encoder_layer, num_layers=num_layers)

# Cabeza de POLÍTICA: combina la representación del origen y del destino de cada movimiento.
self.policy_src_proj = nn.Linear(d_model, d_model // 2)
self.policy_dst_proj = nn.Linear(d_model, d_model // 2)
# Convierte el par (origen, destino) en un único logit que después pasa por softmax.
self.policy_scorer = nn.Sequential(
    nn.LayerNorm(d_model), nn.GELU(), nn.Linear(d_model, 1),
)
# Cabeza de VALOR: lee el token CLS y produce un número en [-1, +1] vía Tanh.
# +1 = "voy ganando seguro", -1 = "voy perdiendo seguro", 0 = "empate probable".
self.value_head = nn.Sequential(
    nn.LayerNorm(d_model), nn.Linear(d_model, d_model),
    nn.GELU(), nn.Dropout(dropout),
    nn.Linear(d_model, 1), nn.Tanh(),
)
```

Léase en cuatro capas:

1. **Entrada.** El tablero se transforma en `11` planos de `7 × 7` (lo que en el Bloque 1 vimos como `OBSERVATION_CHANNELS = 11`): piezas propias, piezas del rival, casillas vacías, progreso de medias jugadas, presión de repetición, destinos de clonar y saltar para ambos jugadores, y piezas activas. Esas `49` casillas, cada una con `11` números, se proyectan a un espacio de mayor dimensión (`d_model = 128`) y se les agrega información posicional aprendible (`pos_embed`).
2. **Transformer.** Seis capas de atención multi-cabeza procesan los `49` tokens del tablero más un token especial `[CLS]` que servirá para resumir la posición. Cada capa permite que cada casilla "mire" a las demás y combine información. Una pieza en la casilla `(0, 0)` puede, en principio, atender a una pieza enemiga en `(6, 6)`, lo cual es valioso porque la regla de la infección puede crear amenazas a distancia con un solo salto.
3. **Cabeza de política (`policy`).** Para cada acción del action space (un par origen-destino), la red combina la representación del origen y la del destino mediante dos proyecciones (`policy_src_proj` y `policy_dst_proj`) y produce un logit. Ese logit, después de un softmax sobre las acciones legales, se interpreta como la probabilidad de elegir esa acción. La política responde a la pregunta: ¿qué movimiento conviene jugar?
4. **Cabeza de valor (`value`).** A partir del token `[CLS]`, la red emite un único número entre `-1` y `+1`. Ese número estima quién va ganando desde la perspectiva del jugador actual. Recuerden, del Bloque 1, que `+1` significa victoria propia, `-1` significa derrota y `0` significa empate. La cabeza de valor responde a la pregunta: si la partida siguiera desde aquí jugando bien, ¿cuán probable es que yo gane?

Estas dos cabezas comparten todo el cuerpo de la red. Es la misma idea que en una persona experta: cuando un jugador fuerte evalúa una posición, no usa "un cerebro para elegir jugada y otro para sentir si va ganando". Usa la misma comprensión de la posición y la proyecta en dos preguntas distintas. La red hace exactamente eso.

### 3.2.1 Especificación completa del modelo

Antes de entrar al algoritmo de búsqueda, conviene dejar la especificación del modelo en una sola página. Las tablas que siguen documentan exactamente qué entra, qué sale y de qué tamaño es el sistema. Toda esta información proviene de leer el código y de cargar el modelo en memoria, no de estimaciones.

**Entrada: tensor de observación `(11, 7, 7)`.**

La función `get_observation()` en `src/game/board.py` arma un tensor con once planos espaciales de tamaño `7 × 7`. Cada plano codifica un aspecto distinto del estado de juego desde la perspectiva del jugador que tiene el turno:

| Canal | Nombre | Qué representa | Tipo de valor |
|------:|--------|----------------|---------------|
| 0 | `own_pieces` | Casillas con piezas del jugador actual. | Binario `0` o `1` |
| 1 | `opponent_pieces` | Casillas con piezas del rival. | Binario `0` o `1` |
| 2 | `empty_squares` | Casillas vacías. | Binario `0` o `1` |
| 3 | `halfmove_progress` | Cuántas medias jugadas se llevan jugadas, normalizadas a `[0, 1]` (tope en `100`). El mismo valor escalar se replica en las `49` casillas. | Real en `[0, 1]` |
| 4 | `repetition_pressure` | Cuántas veces ya apareció la posición actual menos uno, dividido por `2`. Acerca a `1` cuando la triple repetición está cerca. | Real en `[0, 1]` |
| 5 | `own_clone_destinations` | Casillas a las que el jugador actual puede llegar clonando. | Binario `0` o `1` |
| 6 | `own_jump_destinations` | Casillas a las que el jugador actual puede llegar saltando. | Binario `0` o `1` |
| 7 | `opponent_clone_destinations` | Casillas a las que el rival podrá llegar clonando en su próximo turno. | Binario `0` o `1` |
| 8 | `opponent_jump_destinations` | Casillas a las que el rival podrá llegar saltando. | Binario `0` o `1` |
| 9 | `own_active_pieces` | Piezas propias que tienen al menos un movimiento legal disponible. | Binario `0` o `1` |
| 10 | `opponent_active_pieces` | Piezas del rival que tienen al menos un movimiento legal. | Binario `0` o `1` |

La elección de estos `11` canales no es accidental. Los tres primeros codifican el estado bruto del tablero. El cuarto y el quinto informan al modelo de la presión temporal (cuánto queda y qué tan cerca está la triple repetición), que es información que no aparece mirando solo las piezas. Los canales `5` a `8` muestran movilidad táctica inmediata: dónde puede aterrizar cada jugador en su próximo turno. Los canales `9` y `10` indican qué piezas están vivas en términos de juego, no solo en términos de presencia en el tablero.

Una vez que el tensor entra a la red, el `input_proj` lo reordena: las `49` casillas se ven como tokens, cada uno con `11` valores, y se proyectan al espacio de `d_model = 128` dimensiones. A esa secuencia de `49` tokens se le antepone un token especial `[CLS]`, dejando `50` tokens en total a la entrada del transformer.

**Cuerpo del transformer.**

| Hiperparámetro | Valor | Significado |
|----------------|-------|-------------|
| `d_model` | `128` | Tamaño del vector de cada token después de la proyección de entrada. |
| `nhead` | `8` | Número de cabezas de atención por capa: la red puede atender a `8` patrones distintos en paralelo. |
| `num_layers` | `6` | Bloques transformer apilados. |
| `dim_feedforward` | `512` | Dimensión interna de la red feed-forward dentro de cada bloque. |
| `dropout` | `0.1` | Probabilidad de desconectar neuronas durante entrenamiento. Regulariza para que la red no memorice. |
| `activation` | `gelu` | Función de activación no lineal moderna, alternativa a ReLU. |
| `norm_first` | `False` | LayerNorm va después del bloque, no antes (estilo post-norm clásico de Vaswani et al.). |

**Cabeza de política.**

| Componente | Forma | Operación |
|------------|-------|-----------|
| `policy_src_proj` | `Linear(128, 64)` | Proyecta cada token a un sub-espacio que representa "esta casilla como origen". |
| `policy_dst_proj` | `Linear(128, 64)` | Proyecta cada token a un sub-espacio que representa "esta casilla como destino". |
| Combinación | concatenación `(src, dst)` por acción | Para cada una de las `793` acciones legales posibles del action space, se forma el vector de `128` dimensiones que une origen y destino. |
| `policy_scorer` | `LayerNorm + GELU + Linear(128, 1)` | Convierte ese vector en un único logit. |
| Salida | `(B, 793)` | Logits sobre todas las acciones del action space. Después se aplica el máscara de acciones legales y un softmax. |

**Cabeza de valor.**

| Componente | Forma | Operación |
|------------|-------|-----------|
| Entrada | token `[CLS]` de `128` dim | Resumen aprendido de toda la posición. |
| Capa 1 | `LayerNorm + Linear(128, 128) + GELU + Dropout` | Procesamiento intermedio. |
| Capa 2 | `Linear(128, 1) + Tanh` | Comprime a un escalar en `[-1, +1]`. |
| Salida | `(B, 1)` | Estimación del resultado esperado desde la perspectiva del jugador actual. |

**Action space: `793` acciones.**

El espacio de acciones está fijo y enumerado en `src/game/actions.py`. Se construye así: para cada una de las `49` casillas, se enumeran todos los desplazamientos `(dr, dc)` con `dr, dc ∈ {-2, -1, 0, 1, 2}` excluyendo `(0, 0)`, filtrando los que quedan dentro del tablero. Eso da `792` pares origen-destino legales geométricamente. Se agrega una acción adicional, el "pase", que solo es legal cuando el jugador no tiene movimientos. Total: `793` acciones indexadas, con `pass_index = 792`. La cabeza de política emite un logit por cada índice; las acciones ilegales en la posición actual se enmascaran a `-∞` antes del softmax.

**Recuento total de parámetros: `1.231.490` (≈ `1.23 M`).**

Este número se obtiene cargando el modelo y sumando `numel()` sobre todos sus tensores. Para tener escala:

| Modelo | Parámetros aproximados |
|--------|------------------------|
| **Ataxx Zero (este proyecto)** | **`1,23 M`** |
| AlphaZero original (DeepMind, 2017, Go) | `~25 M` |
| GPT-2 small | `~124 M` |
| Llama 2 7B | `~7.000 M` |
| GPT-4 (estimado público) | `~1.000.000 M` |

Esto subraya algo importante: el modelo entrenado en este curso es **chico para los estándares modernos**, y sin embargo es capaz de jugar Ataxx mejor que cualquier heurística escrita a mano. La fuerza del enfoque no está en el tamaño de la red. Está en la combinación de la red con la búsqueda guiada y con el self-play. Una persona con una GPU gratuita y unos días de entrenamiento puede construir algo así. No hace falta un centro de datos.

### 3.3 MCTS: una búsqueda que la red guía

Tener una red que evalúa posiciones no alcanza. La razón es la misma que en `hard` y `apex`: una decisión que se ve buena en lo inmediato puede esconder una respuesta devastadora dos jugadas después. Hace falta búsqueda. Lo que hace AlphaZero, y lo que hace este repositorio, es usar **Monte Carlo Tree Search** (MCTS), un algoritmo que construye un árbol de búsqueda en torno a la posición actual y, a diferencia de la fuerza bruta, no explora todas las ramas: explora preferentemente las que la red sugiere prometedoras.

Una corrida de MCTS hace, repetidas veces (`n_simulations`, típicamente `160` en este proyecto), cuatro fases:

1. **Selección.** Desde la raíz, baja por el árbol eligiendo en cada nivel el hijo que maximiza una fórmula llamada PUCT, que combina la calidad estimada de ese hijo con un bonus de exploración proporcional al prior que entregó la red:

    ```python
    # src/engine/mcts.py — fragmento de _select_child

    # q_value = qué tan bueno parece este hijo según partidas pasadas.
    # El valor del hijo está en perspectiva del hijo, así que se invierte el signo.
    q_value = -child.value()
    # u_value = bonus de exploración. Crece con el prior de la red y baja con visitas acumuladas.
    # c_puct regula cuánto pesa la red vs cuánto pesa lo que ya se exploró.
    u_value = self.c_puct * child.prior * sqrt_parent / (1 + child.visit_count)
    # Se elige el hijo con el mayor score combinado: explotar lo bueno + explorar lo prometedor.
    score = q_value + u_value
    ```

    `q_value` es el promedio histórico de resultados que han salido al pasar por ese hijo. `u_value` empuja a explorar hijos poco visitados, sobre todo aquellos a los que la red les asignó alto prior. `c_puct` (en este proyecto, `1.5`) regula cuánto pesa la exploración respecto a la explotación.

2. **Expansión.** Cuando la búsqueda llega a una hoja del árbol que todavía no fue expandida, se la entrega a la red. La red devuelve, en una sola pasada, los priors de todas las acciones legales y el valor estimado de la posición. Con esa información se crean los hijos del nodo y se asigna un valor inicial.

3. **Evaluación.** El valor devuelto por la red en la expansión funciona como una estimación de "qué tan buena es esta hoja sin haber jugado el resto de la partida". Si la hoja es una posición terminal (alguna de las cinco condiciones del Bloque 1), se usa el resultado real en lugar de la estimación.

4. **Retropropagación.** El valor se propaga hacia arriba por el camino recorrido, actualizando los conteos de visita y los promedios de cada nodo. El detalle clave es que el valor cambia de signo en cada nivel, porque cada nivel del árbol corresponde a un jugador distinto:

    ```python
    # src/engine/mcts.py — _backpropagate
    def _backpropagate(self, path: list[MCTSNode], value: float) -> None:
        # Recorre el camino desde la hoja hasta la raíz, en orden inverso.
        for node in reversed(path):
            # Cada nodo visitado suma uno a su contador de visitas.
            node.visit_count += 1
            # Y acumula el valor recibido (luego value() = value_sum / visit_count).
            node.value_sum += value
            # Cambio de signo: lo que es bueno para mí es malo para el rival, y viceversa.
            value = -value
    ```

Después de las `n_simulations` simulaciones, el movimiento elegido no es el de mayor valor estimado: es el de **mayor cantidad de visitas**. La cantidad de visitas, en el equilibrio de la búsqueda, es el indicador más robusto, porque integra a la vez calidad esperada y exploración acumulada. Esa distribución de visitas, además, se usa como objetivo de entrenamiento para la cabeza de política en la siguiente iteración: el modelo aprende a imitar lo que la búsqueda guiada por él mismo concluyó.

### 3.3.1 Configuración del MCTS

Igual que con la red, conviene dejar la configuración del buscador en una tabla. Estos valores viven en `src/training/config_runtime.py` para los runs de entrenamiento y se pueden sobreescribir desde la línea de comandos para evaluación o arena.

| Hiperparámetro | Default training | Uso típico en arena | Significado |
|----------------|-----------------:|--------------------:|-------------|
| `n_simulations` | `600` | `200` a `400` | Cuántas simulaciones MCTS por jugada. Más simulaciones = búsqueda más profunda = juego más fuerte y más lento. |
| `c_puct` | `1.5` | `1.5` | Constante de la fórmula PUCT. Regula cuánto pesa el bonus de exploración frente al valor estimado. |
| `leaf_batch_size` | `32` | `8` | Cuántas hojas se acumulan antes de invocar la red en batch. Más alto = mejor uso de GPU, peor latencia individual. |
| `cache_size` | `100.000` | `20.000` | Entradas en el cache de inferencia (posición → priors + valor). Evita reevaluar posiciones repetidas dentro del árbol. |
| `dirichlet_alpha` | `0.3` | no se usa | Ruido Dirichlet que se mezcla con los priors de la raíz durante self-play, para forzar exploración. |
| `dirichlet_frac` | `0.25` | no se usa | Fracción del prior que se reemplaza con el ruido Dirichlet. |
| `temperature` | `1.0` early / `0` late | `0` | Controla qué tan determinista es la elección del movimiento final a partir de las visitas. |

El parámetro `temperature` merece comentario aparte porque cambia durante el self-play. En las primeras jugadas de una partida de entrenamiento, se usa temperatura `1.0`, lo que significa elegir el movimiento muestreando proporcionalmente a las visitas: así dos partidas con la misma posición de inicio toman caminos distintos. A partir de cierta jugada, la temperatura baja a `0`, lo que equivale a elegir siempre la jugada más visitada. Este truco aumenta la diversidad de partidas sin sacrificar fortaleza en el cierre. Durante arena (jugando contra humanos o evaluando), la temperatura es `0` desde el primer movimiento.

El ruido Dirichlet en la raíz, controlado por `dirichlet_alpha` y `dirichlet_frac`, también es exclusivo del self-play. Sirve para que el modelo no juegue siempre la misma apertura cuando se enfrenta a sí mismo, y por lo tanto vea posiciones más diversas durante el entrenamiento. En arena y evaluación se desactiva: ahí queremos que el modelo juegue lo mejor que pueda.

### 3.4 Self-play: el modelo se enseña a sí mismo

El tercer reemplazo es el menos intuitivo y el más poderoso. En lugar de aprender de partidas humanas o de partidas contra heurísticas (que, como vimos en el Bloque 2, se pueden explotar), el modelo aprende jugando contra sí mismo. El ciclo, cada iteración, hace tres cosas:

1. **Self-play.** Se generan `N` partidas (en este proyecto, `20` por iteración) usando el modelo actual con MCTS en ambos lados. Cada partida deja una traza de tuplas `(observación, distribución de visitas, resultado final)`.
2. **Entrenamiento.** Esas tuplas alimentan un *replay buffer* y se usan para entrenar la red por una pasada (`epochs = 1`). La política aprende a imitar las visitas; el valor aprende a predecir el resultado final.
3. **Evaluación periódica.** Cada cierto número de iteraciones, el modelo enfrenta a un panel de heurísticas (`hard`, `apex`, `sentinel`) en `64` partidas controladas. Si el promedio de resultados cae más de un umbral durante varias evaluaciones consecutivas, se restaura el último mejor checkpoint, lo que actúa como red de seguridad contra regresiones.

Hay dos detalles que hacen este ciclo viable y honesto, ambos aprendidos por error en este proyecto y documentados en los postmortems:

- **Curriculum mixto.** Si el modelo solo jugara contra sí mismo desde el principio, pasaría muchas iteraciones jugando contra una versión muy débil. Para acelerar el aprendizaje sin destruir la diversidad, las partidas de self-play mezclan tres tipos de oponente: el propio modelo en su versión actual, alguna heurística (con probabilidad controlada), y movimientos aleatorios (con probabilidad baja).
- **Liga de checkpoints.** A partir de la sexta generación, el modelo también juega, en una fracción de las partidas, contra **versiones anteriores de sí mismo**. Esto evita que el modelo se aleje demasiado de lo que sabía hacer hace cien iteraciones y previene una forma sutil de olvido catastrófico.

### 3.5 La escala completa: ocho generaciones, del peor al mejor

Este proyecto lleva ocho generaciones entrenadas y nombradas. Cada una tiene un apodo (asignado después del entrenamiento, en función de lo que pasó), un postmortem si fue informativa, una métrica de fortaleza vs heurísticas (`composite`, promedio de score sobre tres niveles) y una métrica de fortaleza vs otras generaciones (`round_robin`, promedio en duelos directos). La tabla de abajo ordena las generaciones del **más fuerte al más débil** según el round-robin, que es la métrica más honesta porque no se puede sobreajustar:

| Ranking | Codename | Versión | Round-robin | Composite vs heurísticas | Lección que dejó |
|------:|----------|---------|------------:|-------------------------:|------------------|
| 1° (más fuerte) | `liga` | v8 | `0.94` | `0.67` | Primera generación con sistema de liga: entrenó contra varias versiones de sí mismo y contra heurísticas variadas. Ganó al `62.5 %` de las partidas directas contra `amnesia`. |
| 2° | `centinela` | v6 | `0.81` | `0.67` | El primer despegue real. Pero el postmortem 05 reveló que no había aprendido Ataxx: había aprendido a ganarle a `sentinel`, la única heurística contra la que entrenaba. |
| 3° | `amnesia` | v7 | `0.75` | `0.75` | Bootstrap desde una buena generación que terminó peor que su origen. La causa fue iniciar el loop sin warmup ni replay buffer (PM04). |
| 4° (empate) | `chispazo` | v3 | `0.29` | `0.00` | Run abortada al `5 %` de su recorrido. Sirvió como diagnóstico antes de reescribir el shaping. |
| 4° (empate) | `reflejo` | v2 | `0.29` | `0.00` | Primera arquitectura espacial. Parecía jugar bien hasta que descubrimos que el desempate de MCTS elegía siempre la primera jugada legal del action space (PM02). |
| 6° | `aprendiz` | v4a | `0.25` | `0.00` | Primer intento con *reward shaping*. Ya distinguía posiciones buenas de malas, pero todavía no aprendía a presionar. |
| 7° (más débil) | `bogo` | v1 | `0.17` | `0.00` | Arquitectura inicial (policy plana). Solo aprendió a oscilar piezas. Cero victorias contra cualquier heurística media. |

(`aprendiz-tardio v4b` es un snapshot tardío de la misma identidad que `aprendiz`, no figura en el round-robin para no duplicarse.)

Tres observaciones que conviene comentar con calma:

**Primera observación: las primeras cuatro generaciones perdieron prácticamente todas las partidas contra cualquier heurística no trivial.** Su `composite` es `0.00`. Esto no es señal de que las técnicas no funcionen: es señal de que entrenar redes de este tipo es delicado y que un error en cualquier capa (arquitectura, desempate del MCTS, función de recompensa, reseteo del loop) puede impedir que la red aprenda algo útil. Cada una de esas cuatro generaciones tiene un postmortem específico que documenta el error, y cada postmortem dejó un fix que sobrevive en el código actual.

**Segunda observación: `centinela` parecía ser un éxito hasta que se lo evaluó honestamente.** Con `composite = 0.67`, su evaluación inicial era altísima. Pero al desglosarla por nivel, el patrón era inequívoco: ganaba `81 %` de las partidas contra `sentinel`, pero perdía sistemáticamente contra heurísticas más simples que nunca había enfrentado. Eso es **opponent exploitation** en su forma más pura, exactamente lo que en el Bloque 2 anticipamos para cualquier política fija. El descubrimiento llevó a reescribir el curriculum para que el sparring fuera más diverso.

**Tercera observación: `liga`, con la misma composite que `centinela`, es claramente más fuerte en round-robin.** Esto es lo que esperábamos: composite mide rendimiento contra heurísticas; round-robin mide rendimiento contra pares que no son explotables de la misma manera. Cuando un modelo nuevo iguala en composite y mejora claramente en round-robin, lo natural es declarar que es genuinamente más fuerte, no solo mejor entrenado para un examen específico. `liga` es, al cierre de esta clase, el modelo más fuerte del proyecto.

Esta historia es ordinaria en el campo del aprendizaje por refuerzo. No se llega al modelo bueno en el primer intento. Se llega al modelo bueno habiendo entrenado un puñado de modelos malos, habiendo escrito postmortems honestos sobre cada uno, y habiendo construido la infraestructura de evaluación que permite distinguir un éxito real de un éxito aparente. Lo importante, pedagógicamente, no es ver el resultado: es ver el camino.

### 3.6 Cómo se lee el progreso de un entrenamiento

Para cerrar el bloque, una mención breve al instrumento de análisis. Cada iteración del entrenamiento genera métricas: pérdida total, pérdida de política, pérdida de valor, *accuracy* de política, *MAE* de valor, score por nivel de heurística, mejor score histórico. Esas métricas se persisten en HuggingFace Hub y se descargan a CSV con un script del repositorio. Después se consolidan en un dashboard de Power BI con tres páginas: resumen ejecutivo, curva de aprendizaje y diagnóstico de entrenamiento.

Tres lecturas básicas del dashboard:

- **La curva de `best_eval_score` por iteración** muestra si el modelo está mejorando contra las heurísticas a lo largo del entrenamiento. Una buena generación sube de manera relativamente sostenida hasta un plateau.
- **La pérdida total** suele bajar al principio, pero puede subir en la mitad y al final del entrenamiento. Eso no es un bug: es la red enfrentándose a posiciones cada vez más exigentes generadas por el self-play. Si la pérdida bajara siempre, lo más probable sería que el modelo estuviera viendo siempre las mismas posiciones triviales.
- **El perfil por nivel** (score vs `easy`, `normal`, `hard`, `apex`, `gambit`, `sentinel`) es la mejor señal temprana de opponent exploitation: si los scores son muy desparejos, hay sobreajuste a un rival específico.

### 3.7 Puente al Bloque 4

Tenemos ahora todas las piezas. Sabemos cómo se enuncia el problema (Bloque 1), cómo se aborda con heurísticas y dónde se quedan cortas (Bloque 2), y cómo se construye un sistema que aprende y supera ese techo (Bloque 3). Lo que falta es lo más entretenido y lo más honesto: ponerlo a jugar.

En el Bloque 4 cada uno de ustedes va a jugar partidas reales contra estos modelos y heurísticas, con el HUD táctico mostrando en tiempo real qué jugada está considerando el modelo, qué probabilidad de victoria le asigna a cada lado y qué tres movimientos baraja con qué cantidad de visitas. Verán de cerca, en sus propias decisiones, las ideas que recorrimos en los bloques anteriores.

## Preguntas guía del Bloque 3

1. La cabeza de política y la cabeza de valor comparten todo el cuerpo de la red. ¿Qué ventaja tiene esta arquitectura compartida frente a entrenar dos redes separadas?
2. En MCTS, el movimiento elegido al final es el de mayor cantidad de visitas, no el de mayor valor estimado. ¿Por qué tiene sentido confiar en las visitas y no en el valor directo?
3. Si `centinela` tenía un `composite` igual al de `liga` pero un `round_robin` mucho menor, ¿qué nos dice esa diferencia sobre la calidad real de cada modelo y sobre los riesgos de evaluar un sistema con una sola métrica?

---
