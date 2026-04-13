# Clase 03 - Semana 05 - Agentes de IA en Desarrollo: Prompting, Generación y Revisión Crítica

- Unidad 02: Frontend Moderno, APIs y Legado
- Fecha: Miércoles 15 de abril de 2026
- Duración: 3 horas (10:50 - 13:10)
- Modalidad: Presencial en Laboratorio PC
- Docente: Diego Obando

---

# Objetivos de la Clase

## Objetivo General

Al terminar esta clase, el estudiante será capaz de utilizar agentes de IA como herramienta activa en un flujo de desarrollo backend real, distinguiendo cuándo delegar tareas al agente, cómo formular instrucciones precisas y qué aspectos del código generado requieren validación técnica obligatoria antes de integrarse a producción.

## Objetivos Específicos

1. **Formular prompts técnicos efectivos**, aplicando estructura de contexto, restricción y criterio de aceptación para obtener código útil y correcto desde el primer intento.
2. **Identificar los límites del agente**, reconociendo los errores típicos de generación: tipos incorrectos, lógica de negocio ausente, dependencias desactualizadas y ausencia de manejo de errores.
3. **Revisar código generado con criterio técnico**, validando contratos de datos, reglas de negocio y comportamiento ante entradas inválidas.
4. **Integrar el agente en el ciclo de desarrollo con FastAPI y Supabase**, usando IA para generar modelos Pydantic, consultas SQL y endpoints, y evaluando el resultado contra la especificación.
5. **Documentar el uso de agentes en el proyecto**, registrando qué fue generado, qué fue modificado y por qué, como práctica de trazabilidad técnica.

## Competencias Transversales

- **Juicio Técnico:** capacidad de evaluar el output de un agente con criterios propios, no por confianza ciega.
- **Pensamiento Especificado:** habilidad de traducir un requerimiento vago en una instrucción precisa que el agente pueda ejecutar bien.
- **Responsabilidad del Desarrollador:** comprender que el código generado por IA es responsabilidad de quien lo integra, no de quien lo generó.

---

# BLOQUE 1: El Agente como Herramienta de Desarrollo — Qué es, qué no es y cómo encaja

- **Duración:** 35 minutos
- **Objetivo del bloque:** establecer un modelo mental preciso sobre qué hace un agente de IA en un contexto de desarrollo, diferenciándolo de un buscador o un autocompletador, para usarlo con criterio desde el inicio de la clase.
- **Modalidad:** expositiva con ejemplos en vivo, análisis de outputs reales y discusión técnica.

## Desarrollo

### 1.1 ¿Qué es un agente de IA en el contexto de desarrollo?

Un agente no es un buscador ni un corrector de ortografía. Es un modelo de lenguaje entrenado para razonar sobre texto — incluyendo código — y generar respuestas coherentes con lo que le fue pedido.

- **Lo que puede hacer bien:** generar estructuras repetitivas (modelos Pydantic, endpoints CRUD, queries SQL estándar), explicar código desconocido, proponer nombres, traducir entre lenguajes, sugerir alternativas.
- **Lo que no puede hacer:** conocer las reglas de negocio de tu aplicación, saber qué versión exacta de una librería estás usando, garantizar que el código que genera compila sin errores, ni entender el contexto que no le diste explícitamente.
- **Fundamento clave:** el agente predice el siguiente token más probable dada tu instrucción. No "piensa" en el sentido humano — optimiza coherencia textual, no corrección técnica.

### 1.2 El modelo mental correcto: el agente como colaborador sin contexto

Imagina que contratas a un programador muy capaz que lleva 10 minutos en la empresa. Sabe programar, pero no sabe:
- Cómo se llaman tus tablas en Supabase.
- Qué validación de negocio aplica en tu caso específico.
- Qué está roto en tu código si no se lo muestras.

Tu trabajo es darle ese contexto en el prompt. Sin contexto, el agente inventa — y lo hace con mucha confianza.

### 1.3 Tres roles concretos del agente en el flujo de esta semana

| Rol | Cuándo usarlo | Qué entregarle |
|-----|--------------|----------------|
| **Generador de estructura** | Modelo Pydantic, schema SQL, CRUD base | Nombre de la entidad, atributos y tipos |
| **Revisor de código** | Detectar errores lógicos, tipos incorrectos | El código completo + la especificación esperada |
| **Traductor técnico** | Pasar de pseudocódigo a Python, de DER a SQL | El diagrama o la descripción del comportamiento |

### 1.4 Caso de apertura: el mismo prompt, dos resultados distintos

Comparemos dos versiones del mismo pedido al agente:

**Prompt vago:**
```
crea un modelo para usuarios
```

**Prompt especificado:**
```
Crea un modelo Pydantic (Python 3.12, BaseModel) para la entidad Usuario de un sistema de gestión de cursos.
Campos: nombre (str, obligatorio), email (str, obligatorio, formato válido), rut (str, obligatorio, único),
fecha_nacimiento (date, opcional). El modelo debe usarse como schema de entrada en un endpoint POST /usuarios de FastAPI.
No incluyas campo id, ese lo maneja la base de datos.
```

El segundo prompt produce un modelo correcto, tipado y usable sin modificaciones. El primero produce algo genérico que hay que reescribir.

**Lección:** el tiempo que "ahorras" escribiendo un prompt vago lo pierdes revisando y corrigiendo el output.

## Producto o evidencia del bloque

Al cerrar este bloque, el estudiante debería poder:
- Explicar con sus palabras por qué el agente genera código incorrecto cuando el prompt es incompleto.
- Identificar qué información de contexto falta en un prompt vago dado por el docente.
- Clasificar una tarea concreta de desarrollo en uno de los tres roles del agente (generador, revisor, traductor).

---

# BLOQUE 2: Anatomía de un Prompt Técnico — Cómo Especificar para Obtener Código Usable

- **Duración:** 35 minutos
- **Objetivo del bloque:** dominar la estructura de un prompt técnico efectivo, identificando sus componentes críticos y aplicándola en una demostración en vivo que conecta el trabajo de la semana (FastAPI + Supabase) con la generación asistida de código real.
- **Modalidad:** expositiva con demo en vivo, error pedagógico y análisis crítico del output.

## Desarrollo

### 2.1 Los cuatro componentes de un prompt técnico

Un prompt que produce código usable tiene cuatro partes, no una. Si falta alguna, el agente la inventa — y lo hace sin avisarte.

| Componente | Pregunta que responde | Ejemplo |
|------------|----------------------|---------|
| **Contexto** | ¿En qué stack y versión trabajo? | "Python 3.12, FastAPI 0.110, Pydantic v2" |
| **Tarea** | ¿Qué debe producir exactamente? | "Crea un modelo Pydantic para la entidad Pedido" |
| **Restricciones** | ¿Qué NO debe hacer o incluir? | "No incluyas el campo id, no uses Optional de typing" |
| **Criterio de aceptación** | ¿Cómo sé que el output sirve? | "El modelo debe poder usarse directamente como body de un POST /pedidos" |

Sin **contexto**, el agente asume la versión que conoce mejor (que puede no ser la tuya).  
Sin **restricciones**, el agente rellena con lo que le parece razonable.  
Sin **criterio de aceptación**, no sabes si el output es correcto hasta que lo pruebes en producción.

### 2.2 Error pedagógico: el agente llena los vacíos con confianza

Veamos qué pasa cuando el prompt no tiene restricciones ni contexto de versión.

**Prompt:**
```
crea un modelo Pydantic para un Pedido con productos y total
```

**Output típico del agente (problemático):**
```python
from typing import Optional, List
from pydantic import BaseModel

class Producto(BaseModel):
    id: int
    nombre: str
    precio: float

class Pedido(BaseModel):
    id: Optional[int]            # ← El agente puso id aunque no lo necesitas
    productos: List[Producto]    # ← List de typing, no list nativo de Python 3.12
    total: float
    estado: Optional[str]        # ← Campo que nadie pidió
    fecha_creacion: Optional[str] # ← Otro campo inventado, tipo string en vez de datetime
```

**¿Qué está mal aquí?**
- `Optional` de `typing` es legado — Python 3.12 usa `str | None` directamente.
- `List[Producto]` es legado — Python 3.12 usa `list[Producto]`.
- El agente agregó `id`, `estado` y `fecha_creacion` porque le pareció razonable para un pedido. No los pediste.
- Si copias esto directamente a tu API, el endpoint acepta un `id` que debería generar la base de datos, y el tipo `fecha_creacion: Optional[str]` no valida fechas reales.

**Lección:** el agente no miente — rellena. Y lo hace con código que compila y se ve correcto, lo que hace más difícil detectar el error.

### 2.3 Demo en vivo: del DER de ayer al esquema SQL de hoy

Usaremos el diagrama del sistema de cine del Bloque 3 de ayer como punto de partida. El objetivo: pedirle al agente que genere el SQL de creación de tablas para Supabase, con el prompt correcto.

**Prompt especificado:**
```
Tengo un sistema de cine con el siguiente modelo de datos:
- PELÍCULA: id (PK, bigint, auto), título (text, obligatorio), duración_min (int)
- SALA: id (PK, bigint, auto), nombre (text, obligatorio), capacidad (int)
- FUNCIÓN: id (PK, bigint, auto), horario (timestamp, obligatorio),
  pelicula_id (FK → PELÍCULA.id), sala_id (FK → SALA.id)

Genera el SQL de creación de tablas para PostgreSQL (compatible con Supabase).
Usa snake_case para nombres. Incluye restricción de integridad referencial (ON DELETE RESTRICT).
No incluyas políticas RLS ni triggers.
```

**Output esperado y correcto:**
```sql
CREATE TABLE pelicula (
    id        BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo    TEXT NOT NULL,
    duracion_min INT
);

CREATE TABLE sala (
    id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre     TEXT NOT NULL,
    capacidad  INT
);

CREATE TABLE funcion (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    horario      TIMESTAMP NOT NULL,
    pelicula_id  BIGINT NOT NULL REFERENCES pelicula(id) ON DELETE RESTRICT,
    sala_id      BIGINT NOT NULL REFERENCES sala(id) ON DELETE RESTRICT
);
```

**Lo que debes revisar antes de ejecutar este SQL en Supabase:**
1. ¿Los tipos de dato coinciden con lo que modelaste en el DER?
2. ¿Las FK apuntan a la tabla y columna correctas?
3. ¿El `ON DELETE RESTRICT` es la política que quieres, o necesitas `CASCADE`?
4. ¿El orden de creación de tablas respeta las dependencias? (no puedes crear `funcion` antes que `pelicula` y `sala`)

### 2.4 Checkpoint socrático: leer el output antes de ejecutar

Pregunta de chequeo para la clase:

> "El agente generó este SQL. ¿Qué pasa si ejecuto primero la tabla `funcion`?"

Respuesta técnica: `funcion` referencia `pelicula` y `sala`. Si estas no existen aún, PostgreSQL lanzará un error de FK. El agente generó el código correcto, pero no te avisó sobre el orden de ejecución — eso es tu responsabilidad.

> "¿Qué harías si el modelo cambia y ahora una Función puede tener muchos Tipos de Entrada (general, VIP, estudiante)? ¿Modificas el prompt o el SQL directamente?"

Respuesta esperada: modificar el prompt con la nueva entidad, pedir al agente la migración, y revisar si el SQL generado necesita una tabla intermedia.

## Cierre del bloque

- **Idea clave:** un prompt con contexto, tarea, restricciones y criterio de aceptación es una especificación técnica mínima. No es magia — es trabajo de ingeniería.
- **Error frecuente a recordar:** el agente rellena con confianza los vacíos que dejas. El código que genera siempre parece razonable, incluso cuando está incompleto o desactualizado.
- **Puente:** ya sabemos cómo pedirle código al agente. El siguiente bloque trata de lo más crítico: cómo revisar ese código antes de integrarlo, y dónde están los errores que el agente nunca te avisa.

---

# BLOQUE 3: Del Chat al Agente en tu Repositorio — MCPs, Contexto Persistente y CLIs

- **Duración:** 35 minutos
- **Objetivo del bloque:** entender la diferencia entre usar un agente de IA como chatbot de copiar y pegar, versus integrarlo directamente en el flujo de trabajo del repositorio, reconociendo las herramientas que hacen posible ese salto: archivos de contexto, MCPs, CLIs y extensiones.
- **Modalidad:** exposición técnica con exploración del repositorio en vivo, comparación directa y discusión guiada.

## Desarrollo

### 3.1 El problema del chat: cada conversación empieza desde cero

Cuando usas ChatGPT o Claude.ai desde el navegador y copias y pegas el código, estás operando en el modo más limitado posible. Cada vez que abres una conversación nueva, el agente no sabe nada de ti:

- No sabe qué versión de Python usas.
- No sabe que tus tablas en Supabase se llaman `funcion`, `pelicula`, `sala`.
- No sabe que en este proyecto usamos snake_case.
- No sabe qué ya construiste ayer.

Así que el ciclo real de trabajo termina siendo: pides → recibes → copias → adaptas → descubres que no calza → corriges. El agente hizo el 50% del trabajo y tú el otro 50% adaptando su output al contexto que nunca le diste.

**El salto que existe hoy:** no tienes que copiar y pegar. Puedes tener un agente que trabaja directamente dentro de tu repositorio, lee tus archivos, entiende tu stack y opera con tus convenciones.

### 3.2 Archivos de contexto: darle memoria institucional al agente

La primera forma de resolver el problema del chat es darle al agente un archivo de instrucciones que persiste entre sesiones. Cada herramienta lo llama distinto, pero la idea es la misma:

| Archivo | Para qué agente | Qué contiene |
|---------|----------------|--------------|
| `CLAUDE.md` | Claude Code (CLI y extensión VS Code) | Stack, convenciones, comandos del repo, flujo de trabajo |
| `AGENTS.md` | Agentes que admiten instrucciones de repositorio | Contexto del proyecto, reglas de contenido, progresión técnica |
| `GEMINI.md` | Gemini CLI y extensiones compatibles | Stack, convenciones de build, reglas pedagógicas |

**Este repositorio tiene los tres.** En un flujo con agentes integrados, estos archivos permiten que la herramienta lea reglas del proyecto antes de proponer cambios. En este repo, por ejemplo, ahí viven reglas como el mínimo de 60 diapositivas para el PPT, el uso de español cuidado y la jerarquía entre cronograma, README y deck.

**Lección:** un buen `CLAUDE.md` es como el onboarding que le harías a un colaborador nuevo el primer día. Excepto que el agente lo lee cada vez que abre el repo.

### 3.3 MCPs: extender al agente con herramientas reales

Un agente de lenguaje, por defecto, solo puede trabajar con texto. No puede abrir tu navegador, leer tus archivos del sistema, consultar tu base de datos o controlar tu terminal. Los **MCPs (Model Context Protocol)** son plugins estandarizados que le agregan esas capacidades.

**¿Qué es un MCP en términos concretos?**  
Es un servidor pequeño que corre localmente y le expone al agente una nueva herramienta. El agente puede entonces llamar esa herramienta como parte de su razonamiento.

**Ejemplos de MCPs reales que se usan hoy:**

| MCP | Qué le agrega al agente |
|-----|------------------------|
| **Filesystem** | Leer y escribir archivos del repositorio directamente |
| **Browser / Playwright** | Abrir páginas web, hacer screenshots, inspeccionar HTML |
| **GitHub** | Leer issues, pull requests y commits del repositorio |
| **Supabase / PostgreSQL** | Consultar tablas reales de la base de datos |
| **Terminal** | Ejecutar comandos (build, tests, scripts) |

**Caso concreto:** un agente con acceso al filesystem puede leer `clases/semana-05/02/README.md` para saber qué cubrieron ayer antes de escribir el de hoy. No hace falta copiar y pegar ese contexto manualmente en el chat.

El MCP no es magia: es un contrato entre el agente y una herramienta externa. Tú decides qué MCPs activar. El agente decide cuándo y cómo usarlos para resolver la tarea.

### 3.4 CLIs y extensiones: el agente que vive en tu entorno de trabajo

El chat web es la entrada de nivel cero. Hoy existen herramientas que integran el agente directamente donde trabajas:

**CLIs (interfaces de línea de comandos):**
- **Claude Code** (`claude`): agente que corre en tu terminal, lee tu repo, ejecuta comandos, escribe código y abre PRs.
- **Gemini CLI** (`gemini`): CLI de Google para trabajar con Gemini directamente desde la terminal.
- **GitHub Copilot CLI**: sugerencias y explicaciones desde la terminal para comandos git y bash.

**Extensiones de editor:**
- **GitHub Copilot** (VS Code, JetBrains): autocompletado y chat inline mientras escribes código.
- **Extensión Claude** (VS Code): chat con contexto del archivo abierto, selección de código y comandos.
- **Cursor**: editor completo construido sobre IA, donde el agente puede editar archivos enteros con instrucciones en lenguaje natural.

**La diferencia que importa:**

```
Chat web:
Tú → describes el problema → copias el código → lo adaptas → lo pegas

Agente integrado en el repo:
Tú → describes la tarea → el agente lee los archivos, escribe, ejecuta tests, corrige → tú revisas el diff
```

Con el CLI, el agente es un colaborador que opera en tu repositorio. Con el chat, eres tú el que opera de puente entre el agente y tu código.

### 3.5 Skills: instrucciones reutilizables que le dan especialización al agente

Un archivo de contexto como `CLAUDE.md` o `AGENTS.md` le dice al agente cómo es tu proyecto. Una **skill** le dice al agente cómo ejecutar una tarea específica, con toda la lógica, reglas y estructura que esa tarea requiere — sin que tú tengas que explicarla cada vez.

**¿Cómo funcionan en la práctica?**

Una skill es un archivo Markdown con instrucciones detalladas. Cuando la invocas con un slash command (`/nombre-de-la-skill`), el agente la lee y opera siguiendo esas reglas. Es equivalente a darle a un colaborador un manual de procedimientos justo antes de que empiece una tarea.

```
/clase-design   → el agente sabe cómo estructurar bloques, objetivos y progresión
/commit         → el agente sabe cómo redactar mensajes de commit semánticos
/review-pr      → el agente sabe cómo revisar un pull request con criterio técnico
```

**Este repositorio tiene skills locales en `.agent/skills/`:**

| Skill | Para qué sirve |
|-------|---------------|
| `clase-design` | Diseñar y redactar clases con estructura pedagógica correcta |
| `slides-aiep` | Dirección visual institucional de las presentaciones |
| `cohort-comms` | Redactar mensajes docentes para WhatsApp y otros canales |
| `evaluacion-design` | Estructurar evaluaciones con criterios claros |

La skill `clase-design` tiene sus propias referencias internas: un banco de analogías, preguntas socráticas, errores comunes, patrones de código y plantillas de README. El agente puede leerlas cuando las necesita sin que tú se las pases.

**skills.sh — el registro comunitario de skills**

Así como npm centraliza paquetes reutilizables para Node, **skills.sh** funciona como un registro comunitario donde se pueden descubrir y distribuir skills para Claude Code. La sintaxis exacta de instalación puede cambiar con la herramienta y la versión, así que aquí importa más la idea que memorizar un comando:

- descubrir una skill útil para una tarea concreta;
- instalarla en el proyecto o en el entorno;
- invocarla luego como slash command o procedimiento reutilizable.

Ejemplos populares:
- `/commit` — genera mensajes de commit semánticos con contexto del diff
- `/review-pr` — revisa un PR con criterio técnico y sugiere mejoras
- `/test` — genera tests unitarios para el código seleccionado
- `/docs` — genera documentación en el formato que configures

**La distinción que importa:**
- Un archivo de contexto (`CLAUDE.md`, `AGENTS.md`, `GEMINI.md`) es contexto pasivo: el agente lo lee al inicio.
- Una skill es un procedimiento activo: el agente la ejecuta cuando la invocas.
- Juntos forman el "sistema de instrucciones" de un proyecto: qué somos (contexto) + cómo hacemos las cosas (skills).

**¿Por qué esto importa como desarrollador?**  
Un equipo que define bien sus archivos de contexto y sus skills tiene un agente que trabaja consistentemente con sus convenciones — no uno que hay que reconfigurar en cada conversación. Es la diferencia entre un colaborador que entiende la cultura del equipo y uno que lleva 10 minutos en la empresa cada vez que lo contratas.

### Preguntas guía

- ¿Qué diferencia hay entre configurar un `CLAUDE.md` y explicarle el proyecto al agente en cada conversación?
- Si tienes un MCP de Supabase activo, ¿qué tareas de desarrollo podrías delegarle al agente que antes eran imposibles desde el chat?
- ¿Por qué el agente que trabaja en tu repositorio puede cometer errores más graves que el del chat?

## Cierre del bloque

- **Idea clave:** la diferencia entre un desarrollador junior que usa el chat y uno que usa agentes integrados no es solo velocidad — es nivel de contexto, autonomía y responsabilidad. El agente con acceso al repositorio puede hacer más, pero también puede romper más.
- **Tensión a mantener:** más herramientas no significa menos revisión. Significa que la revisión tiene que ser más sistemática.
- **Puente:** con todo esto claro — cómo especificar, qué herramientas existen y cómo se integran — el último bloque trata del flujo completo: cómo validar lo que el agente produce antes de que llegue a producción, y cómo documentar que lo usaste.

---

# BLOQUE 4: Validar, Integrar y Documentar — El Flujo Completo con Agentes

- **Duración:** 35 minutos
- **Objetivo del bloque:** cerrar el ciclo completo de trabajo asistido por agentes: desde la especificación hasta la integración responsable, aplicando una checklist de revisión técnica sobre código generado real y estableciendo el hábito de documentar el uso de IA como parte del trabajo profesional.
- **Modalidad:** ejercicio de revisión en vivo, análisis de código generado y discusión de criterios de trazabilidad.

## Desarrollo

### 4.1 El flujo completo: de la intención al código integrado

Juntar todo lo visto en la clase en una secuencia operativa:

```
1. ESPECIFICAR     → escribir el prompt con contexto, tarea, restricciones y criterio
2. GENERAR         → el agente produce código, SQL o estructura
3. LEER            → revisar el output antes de ejecutar o copiar
4. VALIDAR         → contrastar contra la especificación y las reglas del proyecto
5. CORREGIR        → editar lo que no calza (tipos, lógica, convenciones)
6. INTEGRAR        → incorporar al repositorio o ejecutar en el sistema
7. DOCUMENTAR      → registrar qué generó el agente y qué modificaste tú
```

Cada paso tiene un responsable: pasos 1 y 7 son siempre humanos. Pasos 2 es siempre del agente. Pasos 3, 4 y 5 son humanos aunque el agente pueda ayudar. Paso 6 es compartido.

El error más común no es en el paso 2 — es saltarse el 3, 4 y 5.

### 4.2 Checklist de revisión técnica para código generado

Antes de integrar cualquier código generado por un agente, revisar estos niveles en orden:

**Nivel 1 — Tipos y contrato**
- ¿Los tipos de datos coinciden con el stack real del proyecto? (no `Optional` de typing si estás en Python 3.12)
- ¿El modelo acepta campos que no debería? (ej. `id` en un schema de entrada)
- ¿Los campos obligatorios están marcados como obligatorios?

**Nivel 2 — Lógica de negocio**
- ¿El agente dejó comentarios del tipo `# implementar lógica aquí`? (frecuente — el agente esboza, no implementa)
- ¿Las validaciones de negocio están presentes o solo la validación de tipos?
- ¿Hay casos borde sin manejar? (precio negativo, stock cero, cadena vacía)

**Nivel 3 — Seguridad y exposición**
- ¿El endpoint expone campos que no deberían ser públicos?
- ¿Hay queries SQL construidas con concatenación de strings en vez de parámetros?
- ¿Las claves o credenciales están hardcodeadas?

**Nivel 4 — Convenciones del proyecto**
- ¿Los nombres de variables, tablas y funciones siguen el estándar del repo (snake_case, plural, etc.)?
- ¿Las dependencias que importa el agente son las que efectivamente usa el proyecto?
- ¿Hay imports innecesarios o versiones incorrectas?

### 4.3 Ejercicio en vivo: auditar un endpoint generado

El agente recibió este prompt vago y generó el siguiente código. Identificar cuántos problemas tiene antes de ejecutarlo.

**Prompt usado:**
```
crea un endpoint para registrar un pedido con productos
```

**Código generado:**
```python
from typing import Optional, List
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ProductoItem(BaseModel):
    id: int
    nombre: str
    cantidad: int
    precio: float

class PedidoRequest(BaseModel):
    id: Optional[int]                  # problema 1
    cliente_nombre: str
    productos: List[ProductoItem]      # problema 2
    total: Optional[float]             # problema 3
    estado: str = "pendiente"

@app.post("/pedidos")
def crear_pedido(pedido: PedidoRequest):
    # TODO: guardar en base de datos    # problema 4
    total = sum(p.precio * p.cantidad for p in pedido.productos)
    return {"mensaje": "Pedido creado", "total": total}
```

**Ejercicio:** en grupos o en pizarra, identificar cada problema usando la checklist del punto anterior.

**Respuestas esperadas:**
1. `id: Optional[int]` — el ID lo genera la base de datos, no debe estar en el schema de entrada.
2. `List[ProductoItem]` — sintaxis legada de `typing`. Python 3.12 usa `list[ProductoItem]`.
3. `total: Optional[float]` — si el total se calcula en el servidor, no debería venir del cliente ni ser opcional — es una regla de negocio ausente.
4. El `# TODO` es el más grave: el endpoint responde exitosamente pero no persiste nada. En producción, los pedidos se "crearían" y desaparecerían en cada reinicio.

**Corrección aplicada:**
```python
from datetime import datetime
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ProductoItem(BaseModel):
    nombre: str
    cantidad: int
    precio: float

class PedidoRequest(BaseModel):
    cliente_nombre: str
    productos: list[ProductoItem]      # Python 3.12: list nativo

@app.post("/pedidos", status_code=201)
async def crear_pedido(pedido: PedidoRequest):
    # Regla de negocio: el total lo calcula el servidor, nunca el cliente
    if not pedido.productos:
        return {"error": "El pedido debe tener al menos un producto"}

    total = sum(p.precio * p.cantidad for p in pedido.productos)

    # Aquí iría la llamada real a Supabase o al ORM
    # Por ahora retornamos la confirmación con los datos calculados
    return {
        "cliente": pedido.cliente_nombre,
        "total": total,
        "productos": len(pedido.productos),
        "estado": "pendiente"
    }
```

### 4.4 Documentar el uso de agentes: trazabilidad técnica

En un equipo profesional, el código que se integra al repositorio tiene historia: quién lo escribió, con qué criterio, qué decisiones tomó. Cuando parte de ese código fue generado por un agente, esa historia no desaparece — cambia.

**¿Por qué documentar?**
- Si algo falla seis meses después, el equipo necesita saber si ese módulo fue generado, revisado o escrito desde cero.
- En contextos institucionales o de auditoría (cada vez más frecuentes), el uso de IA en código de producción debe ser trazable.
- Es un hábito profesional: la responsabilidad del código es tuya, no del agente. Documentar es reconocer que lo revisaste.

**Formatos mínimos practicables:**

En un commit:
```
feat: endpoint POST /pedidos con validación de total

Estructura base generada con asistencia de agente; prompt registrado en la bitácora técnica del proyecto.
Corregido: tipos Python 3.12, eliminado campo id del schema de entrada,
agregada validación de lista vacía. Lógica de persistencia pendiente (Bloque 4).
```

En el código, cuando la lógica fue completamente generada y no modificada:
```python
# Generado con asistencia de agente. Revisado: tipos, reglas de negocio, seguridad.
```

**Lo que no sirve:** poner `# generado por IA` y no decir qué se revisó. Eso no es trazabilidad — es decoración.

## Producto o evidencia del bloque

Al cerrar este bloque, el estudiante debería poder:
- Aplicar la checklist de cuatro niveles a un fragmento de código generado por un agente.
- Distinguir entre un error de tipo (corregible por el agente) y una regla de negocio ausente (responsabilidad del desarrollador).
- Escribir un mensaje de commit que documente de forma honesta el uso de IA y las revisiones aplicadas.

## Preguntas de cierre

- ¿En qué paso del flujo de trabajo el agente tiene menos capacidad de ayudarte? (Respuesta esperada: validar reglas de negocio propias del proyecto.)
- Si el agente genera código que pasa todos los tests pero falla en producción por un caso borde que no estaba en los tests, ¿de quién es la responsabilidad?
- ¿Qué información mínima debería tener un mensaje de commit para que sea trazable respecto al uso de IA?

---

# Cierre de la Clase

## Síntesis Final

- **El agente no es el chat.** Hay una distancia enorme entre copiar código de una ventana del navegador y tener un agente que opera dentro del repositorio con contexto, herramientas y memoria institucional.
- **El contexto es trabajo de ingeniería.** Un buen `CLAUDE.md`, un `AGENTS.md` bien escrito y skills definidas no son configuración opcional — son la diferencia entre un agente que trabaja con las convenciones del proyecto y uno que las inventa cada vez.
- **MCPs y CLIs cambian lo que es posible delegar.** Acceso al filesystem, la base de datos, el navegador y la terminal significa que el agente puede actuar, no solo sugerir. Eso aumenta la responsabilidad de quien lo usa.
- **Especificar bien es tan importante como revisar bien.** Un prompt sin contexto produce código que parece correcto y no lo es. La checklist de cuatro niveles es la diferencia entre integrar con criterio y integrar con esperanza.
- **La trazabilidad no es burocracia.** Documentar qué generó el agente y qué revisaste tú es un hábito profesional que protege al equipo y al proyecto.

## Preguntas de Salida

- ¿Qué diferencia concreta existe entre usar el chat web y usar un CLI como Claude Code o Gemini CLI dentro de un repositorio?
- Nombra dos cosas que el agente no puede saber si no se las especificas en el prompt o en el `CLAUDE.md`.
- ¿Para qué sirve un MCP? Da un ejemplo de qué le permite hacer al agente que antes era imposible.
- Tienes un endpoint generado por un agente que compila y responde con 200. ¿Eso es suficiente para integrarlo? ¿Qué revisarías primero?
- ¿Qué es una skill y en qué se diferencia de un archivo de contexto como `CLAUDE.md`?

## Próximo Paso

La semana que viene entra el mundo del legado: código PHP, formularios viejos, sesiones, CRUD sin framework y arquitectura sin capas. El criterio técnico que se trabajó esta semana — especificar, revisar, validar — aplica exactamente igual cuando el agente te ayuda a leer o modernizar código que no escribiste tú y que no tiene tests.
