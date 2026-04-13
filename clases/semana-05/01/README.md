# Clase 01 - Semana 05 - Fundamentos de Backend con Python y FastAPI

- Unidad 02: Frontend Moderno, APIs y Legado
- Fecha: Lunes 13 de abril de 2026
- Duración: 3 horas (10:50 - 13:10)
- Modalidad: Presencial en Laboratorio PC
- Docente: Diego Obando

---

# Objetivos de la Clase

## Objetivo General

Al terminar esta clase, el estudiante comprenderá la arquitectura de un sistema backend moderno utilizando Python 3.12+ y FastAPI, reconociendo el valor del tipado estricto y la programación asíncrona para construir servicios robustos, escalables y autodocumentados.

## Objetivos Específicos

1.  **Configurar un entorno de servidor base en Python**, comprendiendo el bucle de eventos y la escucha de puertos.
2.  **Implementar endpoints semánticos con FastAPI**, utilizando decoradores y tipado estricto para definir recursos REST.
3.  **Identificar y codificar reglas de negocio**, separando la lógica de validación de datos de la lógica de procesamiento.
4.  **Esbozar contratos de comunicación (API Contracts)**, aprovechando la generación automática de OpenAPI (Swagger) que ofrece FastAPI.
5.  **Utilizar agentes de IA** para generar modelos de datos (Pydantic) y esquemas de validación basados en especificaciones técnicas.

## Competencias Transversales

- **Rigor Técnico:** uso de Type Hints para reducir errores en tiempo de ejecución.
- **Pensamiento Asíncrono:** entender cómo Python maneja múltiples peticiones sin bloquearse.
- **Documentación Viva:** valorar el diseño de APIs que se documentan a sí mismas mediante el código.

---

# BLOQUE 1: El mundo detrás del "Fetch" y el rol del Servidor

- **Duración:** 35 minutos
- **Objetivo del bloque:** comprender la naturaleza del servidor como un proceso persistente y protector de la "verdad" de los datos, utilizando Python y FastAPI como herramientas de implementación moderna.
- **Modalidad:** expositiva, análisis de arquitectura y demostración de código.

## Desarrollo

### 1.1 El Servidor: Un programa que "espera" (Escucha Activa)
A diferencia de los scripts de automatización o el código de frontend que corre y termina, un servidor backend es un **proceso persistente**. 
- **Concepto Universal:** El servidor "abre un puerto" (ej. 8000) y entra en un bucle infinito de espera.
- **Implementación:** En nuestro stack, usamos `uvicorn` para mantener viva la aplicación Python, permitiendo que responda a múltiples usuarios simultáneamente.

### 1.2 La Fuente de Verdad vs. El Espejo (Seguridad)
Este es el fundamento más importante del backend:
- **Frontend (El Espejo):** Es inseguro por definición. Cualquier usuario puede modificar el estado en su navegador.
- **Backend (La Verdad):** Es el único que tiene permiso para leer y escribir en la base de datos.
- **Regla de Oro:** "Nunca confíes en el cliente". Todo dato que llega al servidor debe ser validado como si fuera malicioso.

### 1.3 Las 4 Tareas Universales del Backend
Independientemente de si usamos Python, PHP o Node, todo servidor cumple este ciclo:
1.  **Escuchar:** Detectar la petición HTTP entrante.
2.  **Validar:** (FastAPI brilla aquí) Verificar que los tipos de datos sean correctos usando `Type Hints`.
3.  **Procesar:** Ejecutar cálculos o reglas de negocio (Lógica).
4.  **Responder:** Devolver un mensaje (JSON) y un código de estado (Status Code).

### 1.4 Primer contacto: Declarando intenciones
En FastAPI, usamos **decoradores** para decirle al servidor qué "Recurso" estamos atendiendo. El tipado estricto de Python 3.12 es nuestra primera capa de seguridad.

```python
from fastapi import FastAPI

app = FastAPI()

# Fundamento: Definimos una RUTA y un MÉTODO (GET)
@app.get("/status")
async def verificar_servidor() -> dict[str, str]:
    # El tipo de retorno dict[str, str] asegura consistencia en el contrato
    return {"estado": "online", "version": "1.0.0"}
```

## Producto o evidencia del bloque
- Explicar por qué el backend es el "dueño de la verdad" en una aplicación.
- Identificar el puerto y el protocolo en una dirección local (`http://127.0.0.1:8000`).
- Diferenciar entre un proceso que termina y un servidor que escucha.

---

# BLOQUE 2: Arquitectura REST y el Lenguaje de los Recursos

- **Duración:** 35 min
- **Objetivo del bloque:** definir los principios de la arquitectura REST, reconociendo la importancia de la semántica de las URLs y los verbos HTTP como el estándar de comunicación entre sistemas.
- **Modalidad:** análisis de estructuras de URLs y diseño semántico.

## Desarrollo

### 2.1 ¿Qué es un Recurso? (El cambio de objeto)
En la web antigua pedíamos "archivos" (`index.html`). En el desarrollo de aplicaciones para Internet, pedimos **recursos** (entidades de información).
- Un Recurso es cualquier "cosa" que la aplicación maneja: un Usuario, un Pedido, un Sensor, una Nota.
- **Fundamento:** Cada recurso debe tener una identificación única en el mundo: la **URL**.

### 2.2 Semántica de la URL: Nombres, no acciones
REST nos obliga a usar URLs limpias basadas en sustantivos.
- **Mal Diseñado:** `/obtener_todos_los_usuarios`, `/borrar_pedido?id=5`.
- **Bien Diseñado:** `/usuarios`, `/pedidos/5`.
- La URL identifica **quién** es el recurso. El **qué** hacemos con él lo define el Verbo HTTP.

### 2.3 Los 4 Verbos del Apocalipsis (CRUD)
HTTP no es solo para "ver páginas". Cada verbo tiene un significado semántico que el servidor debe respetar:
1.  **GET:** Recuperar información (Lectura).
2.  **POST:** Crear un recurso nuevo (Escritura).
3.  **PUT / PATCH:** Actualizar un recurso (Modificación).
4.  **DELETE:** Eliminar un recurso (Baja).

### 2.4 Implementación: Parámetros y Tipado (FastAPI)
Aquí es donde Python 3.12+ se luce. Usamos el tipado para asegurar que la "identificación" del recurso sea válida antes de que entre a nuestra lógica.

```python
# Fundamento: Identificación por URL (Path Parameter)
@app.get("/productos/{producto_id}")
async def leer_producto(producto_id: int):
    # Python valida que producto_id sea un número entero
    return {"id": producto_id, "nombre": "Teclado Mecánico"}

# Fundamento: Filtros y Opciones (Query Parameters)
@app.get("/productos")
async def buscar_productos(categoria: str, stock: bool = True):
    # categoria es obligatoria, stock tiene un valor por defecto
    return {"categoria": categoria, "filtro_stock": stock}
```

## Producto o evidencia del bloque
- Transformar una lista de URLs "malas" (basadas en acciones) a una estructura profesional REST.
- Identificar cuándo usar un parámetro de ruta (`/id`) vs uno de consulta (`?cat=...`).

---

# BLOQUE 3: Arquitectura en Capas y Modelado con Pydantic

- **Duración:** 35 minutos
- **Objetivo del bloque:** comprender la importancia de separar las responsabilidades del código (capas) y utilizar modelos de datos (schemas) para estructurar la comunicación profesional entre cliente y servidor.
- **Modalidad:** análisis arquitectónico y diseño de modelos de datos en Python.

## Desarrollo

### 3.1 ¿Por qué capas? (El Orden Arquitectónico)
Un servidor profesional no mezcla el acceso a la base de datos con las rutas de la API. Dividimos el código para que sea mantenible:
1.  **Capa de API (Transporte):** Es la "cara" del servidor. Recibe el HTTP y entrega el JSON. No conoce las reglas del negocio, solo sabe hablar el idioma de la web.
2.  **Capa de Negocio (Lógica):** Es el "cerebro". Aquí vive lo que hace única a la aplicación (ej: calcular un descuento, validar un permiso de retiro).
3.  **Capa de Datos (Persistencia):** Es el "brazo". Sabe cómo guardar y traer datos de la base de datos (SQL, NoSQL).

### 3.2 Pydantic: Definiendo el Contrato
En el backend moderno, no recibimos "texto suelto". Recibimos objetos con una forma clara. Usamos **Pydantic** (integrado en FastAPI) para definir esta forma mediante clases.

```python
from pydantic import BaseModel

# Fundamento: El Schema define el contrato de datos
class Producto(BaseModel):
    nombre: str
    precio: float
    stock: int
    descripcion: str | None = None # Python 3.12+ Syntax
```

### 3.3 Validación de Tipo vs. Regla de Negocio
Es vital que el estudiante aprenda a distinguir estos dos niveles:
- **Validación de Tipo (Automática):** ¿El precio es un número? ¿El stock es un entero? (Lo resuelve Pydantic/FastAPI).
- **Regla de Negocio (Manual):** ¿El precio es mayor a cero? ¿Hay stock suficiente para esta venta? (Lo resolvemos nosotros en el código).

### 3.4 Recibiendo Datos Complejos (El Body)
Para crear recursos, el cliente envía un "Cuerpo" (Body) en la petición. FastAPI lo convierte automáticamente en un objeto de Python.

```python
@app.post("/productos")
async def crear_producto(item: Producto):
    # Fundamento: El JSON entrante ya es un objeto 'item' validado
    if item.precio <= 0:
        # Ejemplo de Regla de Negocio aplicada
        return {"error": "El precio debe ser un valor positivo"}
    
    return {"mensaje": f"Producto {item.nombre} registrado con éxito"}
```

## Producto o evidencia del bloque
- Diseñar un modelo de Pydantic para un recurso "Usuario" que incluya nombre, email y edad.
- Identificar en qué capa del servidor debería vivir la lógica que verifica si un cupón de descuento ha expirado.

---

# BLOQUE 4: El Contrato Interactivo y la Magia de Swagger

- **Duración:** 35 minutos
- **Objetivo del bloque:** comprender el concepto de Contrato de API y utilizar la documentación automática de FastAPI (Swagger/OpenAPI) para validar el diseño y facilitar la integración con el equipo de Frontend.
- **Modalidad:** demostración interactiva de Swagger UI y diseño de especificaciones.

## Desarrollo

### 4.1 ¿Qué es un Contrato de API?
En el desarrollo profesional, el equipo de Frontend y el de Backend se reúnen **antes** de escribir código para acordar el "trato":
- ¿Cómo se llama el endpoint?
- ¿Qué campos JSON debo enviar?
- ¿Qué datos recibiré de vuelta?
- ¿Qué errores pueden ocurrir?

### 4.2 Swagger UI: El Intérprete del Contrato
FastAPI tiene una característica revolucionaria: a medida que escribes tus clases de Pydantic y tus rutas, él genera una página web interactiva en `/docs`. Esta herramienta se basa en el estándar **OpenAPI** (conocido antiguamente como Swagger).

**¿Por qué es importante?**
- **Pruebas en Vivo:** Permite probar el servidor sin necesidad de escribir código Frontend ni usar herramientas externas.
- **Manual de Usuario:** El desarrollador Frontend sabe exactamente cómo usar tu API con solo mirar la web de `/docs`.
- **Sincronización:** Si cambias un tipo de dato en Python, Swagger se actualiza al instante. El documento nunca miente.

### 4.3 Mentalidad "API First"
Gracias a Swagger, podemos diseñar la "cara" del servidor antes de construir la lógica pesada. Podemos mostrarle al cliente o al equipo de Frontend cómo se verá el sistema, recibir feedback y ajustar los tipos de datos rápidamente.

### 4.4 Códigos de Estado (Status Codes) en el Contrato
Un contrato profesional debe usar el lenguaje estándar de HTTP:
- **200/201:** Todo salió bien (Success/Created).
- **400/422:** Me enviaste los datos mal (Client Error).
- **404:** Lo que buscas no existe.
- **500:** El servidor explotó (Server Error).

## Producto o evidencia del bloque
Al cerrar este bloque, el estudiante debería poder:
- Entrar a la ruta `/docs` de su servidor local y realizar una petición de prueba.
- Interpretar la sección "Schemas" de Swagger para saber qué campos son obligatorios en un recurso.
- Explicar por qué documentar la API es parte del trabajo de programación y no una tarea extra.

## Preguntas guía
- ¿Cómo sabe Swagger que un campo es obligatorio? (Relacionar con el tipado de Python).
- Si soy desarrollador Frontend y el Backend me entrega una URL de Swagger, ¿necesito ver su código de Python para saber cómo pedir los datos?
- ¿Qué pasaría si el contrato dice que el precio es un `int` pero el servidor me responde un `string`?

## Huella metodológica IA/agentes
El agente es el documentador perfecto:
- **Generación de Specs:** Pedir al agente que convierta una descripción de una regla de negocio en un contrato de API OpenAPI detallado.
- **Testing:** Pedir a la IA que genere casos de prueba (payloads de prueba) para enviarlos a través de la interfaz de Swagger y ver cómo reacciona el servidor.

**Lo que tú debes validar:**
- El agente puede proponer descripciones de Swagger muy largas o confusas. Tú **debes simplificar** las descripciones para que sean útiles para un compañero de equipo real.

## Cierre del bloque
- **Idea clave:** Una API sin documentación no existe. Swagger es el puente de confianza entre sistemas.
- **Puente:** Con esto cerramos la teoría del backend. Mañana pasamos a la práctica real: Persistencia y Modelado de Datos (SQL).

---

# Cierre de la Clase

## Síntesis Final
- **Backend como Guardián:** No solo guarda datos, protege procesos mediante el tipado de Python 3.12+.
- **REST como Gramática:** URLs limpias (sustantivos) y verbos semánticos.
- **Arquitectura en Capas:** Separar el transporte (FastAPI) de la lógica y los datos para un código mantenible.
- **Contratos Vivos:** Swagger es la prueba de que nuestro código es profesional y está listo para ser consumido por cualquier cliente.

## Preguntas de Salida
- ¿Por qué el backend es la "Fuente de Verdad"?
- ¿Qué ventaja nos da Python 3.12 frente a otros lenguajes al definir un contrato de datos?
- ¿Para qué sirve la carpeta de "Capas" en un servidor backend?
- ¿Cómo ayuda Swagger a un desarrollador Frontend a ser más productivo?

## Próximo Paso
Mañana entraremos al mundo de la **Persistencia**. Aprenderemos a diseñar las tablas y relaciones (SQL) donde guardaremos toda la información que hoy aprendimos a recibir a través de la API.
