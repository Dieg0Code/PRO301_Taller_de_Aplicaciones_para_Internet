# Clase 18 - Construcción de APIs Profesionales e Interoperabilidad con FastAPI (Python 3.12)

- **Unidad:** 2 · Integración y Arquitectura (Frontend Moderno, APIs y Legado)
- **Fecha:** Miércoles 22 de abril de 2026
- **Duración:** 140 minutos (10:50 - 13:10)
- **Modalidad:** Presencial en Laboratorio PC (Máxima Densidad Técnica)
- **Docente:** Diego Obando

---

# Objetivos de la Clase

## Objetivo General
Al finalizar la clase, el estudiante será capaz de construir una API REST profesional utilizando **Python 3.12 y FastAPI**, aplicando criterios de **Ciberseguridad por Diseño** (Security by Design) y asegurando la interoperabilidad entre sistemas modernos y bases de datos o servicios legados, como preparación directa para la Evaluación Parcial 2.

## Objetivos Específicos
1. **Implementar Endpoints RESTful** utilizando los verbos HTTP correctos (GET, POST, PUT, DELETE) y códigos de estado (Status Codes) semánticos.
2. **Garantizar la Integridad de Datos** mediante modelos de **Pydantic**, asegurando que la API valide automáticamente las entradas antes de que lleguen a la lógica de negocio.
3. **Eje de Ciberseguridad:** Blindar la API contra ataques comunes (SQL Injection, Type Confusion) mediante el uso de tipado estricto y el desacoplamiento de capas (Schemas vs. Models).
4. **Dominar la Documentación Automática:** Utilizar el estándar **OpenAPI (Swagger)** para comunicar el contrato de la API a otros desarrolladores o agentes de IA.
5. **Metodología Agentic:** Utilizar agentes de IA para generar esquemas de validación, planes de pruebas de integración y auditoría de vulnerabilidades en tiempo real.

## Competencias Transversales
- **Interoperabilidad:** Entender la API como un "puente" universal entre tecnologías (Python, PHP, React).
- **Rigor Técnico:** Priorizar la especificación y la validación sobre la codificación impulsiva.
- **Preparación de Evaluación:** Sintetizar el conocimiento de la semana (Legado + MVC + API) para resolver el desafío del próximo lunes.

---

# Mapa de la Clase

| Horario | Sección | Propósito |
|---------|---------|-----------|
| 10:50 - 11:00 | Objetivos y encuadre | Conexión con MVC y el salto a la interoperabilidad API-First. |
| 11:00 - 11:25 | Bloque 1 | Fundamentos de FastAPI 3.12 y el Contrato de Datos (Pydantic). |
| 11:25 - 11:50 | Bloque 2 | Operaciones CRUD RESTful y Gestión de Status Codes Profesionales. |
| 11:50 - 12:00 | Pausa | Descanso técnico. |
| 12:00 - 12:25 | Bloque 3 | Eje Cyber: Blindaje de Inyecciones y Validación de Esquemas. |
| 12:25 - 12:50 | Bloque 4 | Interoperabilidad Real: Conectando FastAPI con el Legado y Auditoría IA. |
| 12:50 - 13:10 | Cierre | Síntesis final y simulacro mental de la Evaluación Parcial 2. |

---

# BLOQUE 1: Fundamentos de FastAPI 3.12 y el Contrato de Datos (Pydantic)

- **Duración:** 25 minutos
- **Objetivo del bloque:** Comprender la diferencia estructural entre la captura de datos "permisiva" (Legacy) y el "Contrato de API" estricto mediante tipado de Python 3.12 y validación de Pydantic.
- **Modalidad:** Expositiva, contraste de código y demostración técnica.

## Desarrollo

### 1.1 Del "Ojalá llegue el dato" (Legacy) al "Contrato de API" (Moderno)
En la clase del lunes vimos cómo en PHP Legacy dependíamos de las superglobales (`$_POST`, `$_GET`) y de validaciones manuales (`isset`, `empty`). Si el dato no llegaba o llegaba con un tipo incorrecto, el sistema fallaba en tiempo de ejecución o, peor aún, procesaba basura.
- **Concepto de Contrato:** Una API profesional se basa en un **Contrato**. El servidor publica exactamente qué datos espera, de qué tipo son y cuáles son obligatorios.
- **Validación Automática:** En FastAPI, si el cliente no cumple el contrato, el servidor responde con un error `422 Unprocessable Entity` automáticamente, protegiendo la lógica interna.

### 1.2 Python 3.12: Tipado Estricto como Barrera de Seguridad (Eje Cyber)
El tipado en Python 3.12 no es solo una ayuda visual para el editor; es nuestra primera línea de defensa contra ataques de **Confusión de Tipos** e **Inyecciones Básicas**.
- **Sintaxis Moderna:** Usamos el operador `|` para uniones de tipos (ej: `str | None`) en lugar de `Optional`.
- **Efecto de Seguridad:** Al declarar un parámetro de URL como `int`, FastAPI rechaza cualquier intento de inyectar strings (como `' OR 1=1 --`) en ese punto, sanitizando la entrada por diseño.

### 1.3 Pydantic: El "Guardia de Seguridad" de los Datos
Pydantic es la librería que FastAPI usa para validar el cuerpo de las peticiones (`Request Body`). 
- **Separación de Capas:** Mientras el **Modelo** (visto ayer) define cómo se guardan los datos en la DB, el **Schema** de Pydantic define cómo viajan los datos por la red.
- **Validación de Negocio:** Pydantic permite validar formatos complejos (Emails, URLs, largos de texto) antes de que lleguen al Repositorio.

### 1.4 IA como Generadora de Contratos (Huella IA)
Mapear un sistema legado a esquemas modernos puede ser tedioso. El agente de IA actúa como un **"Ingeniero de Requisitos"**.
- **Estrategia:** Entregar a la IA una tabla SQL legacy o un fragmento de código PHP y pedirle: *"Genera un esquema de Pydantic v2.7+ para este recurso, usando tipado de Python 3.12 y validando que el campo 'email' sea un correo válido"*.
- **Validación Humana:** El desarrollador debe verificar que las restricciones de la IA coincidan con las reglas de negocio reales del cliente.

```python
# Ejemplo de Contrato Profesional en FastAPI
from fastapi import FastAPI
from pydantic import BaseModel, EmailStr, Field

app = FastAPI()

# Definición del Esquema (Contrato)
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    email: EmailStr
    age: int | None = None  # Sintaxis Python 3.12

@app.post("/users")
def create_user(user: UserCreate):
    # Si llegamos aquí, los datos ya están VALIDADOS y TIPADOS
    return {"message": f"Usuario {user.username} listo para ser procesado"}
```

## Producto o evidencia del bloque
- Identificar por qué un error `422` es preferible a un error `500` en una API profesional.
- Diferenciar entre un parámetro de ruta (`/users/5`) y un cuerpo de petición (JSON).
- Explicar cómo el tipado de Python 3.12 previene inyecciones de datos no esperados.

## Preguntas de chequeo
1. ¿Qué sucede si envío un string en un campo definido como `int` en Pydantic?
2. ¿Por qué el tipado estricto es considerado una medida de ciberseguridad?
3. ¿Cuál es la diferencia entre el "Atributo name" de PHP y el "Schema" de FastAPI?

---

# BLOQUE 2: Operaciones CRUD RESTful y Gestión de Status Codes Profesionales

- **Duración:** 25 minutos
- **Objetivo del bloque:** Implementar operaciones CRUD semánticas utilizando los verbos HTTP correctos y códigos de estado (Status Codes) profesionales para una comunicación estandarizada.
- **Modalidad:** Expositiva, demostración de ruteo y análisis de respuestas.

## Desarrollo

### 2.1 Los Verbos HTTP como Intenciones de Negocio
En una API REST, la URL define el **Recurso** (ej: `/users`), pero el Verbo HTTP define la **Acción**. A diferencia de los sistemas legacy donde solíamos abusar de `GET` y `POST` para todo, una API profesional es semántica:
- **`GET` (Lectura):** Para obtener datos. No debe tener efectos secundarios en el servidor.
- **`POST` (Creación):** Para generar un nuevo recurso.
- **`PUT` / `PATCH` (Actualización):** Para modificar un recurso existente de forma total o parcial.
- **`DELETE` (Eliminación):** Para borrar o desactivar un recurso.

### 2.2 Status Codes: El Lenguaje Universal de Respuesta
El servidor no solo devuelve datos; devuelve un **Estado**. Es vital dejar de usar siempre `200 OK` y empezar a ser precisos:
- **`201 Created`:** Éxito tras un `POST`. El recurso se creó correctamente.
- **`204 No Content`:** Éxito tras un `DELETE`. La operación se hizo y no hay nada más que mostrar.
- **`400 Bad Request`:** Error del cliente (ej: lógica de negocio fallida, saldo insuficiente).
- **`404 Not Found`:** El recurso solicitado (ID) no existe en el sistema.
- **`500 Internal Server Error`:** Error crítico del servidor (bug, caída de DB). **Evitar mostrar esto al usuario.**

### 2.3 Manejo de Excepciones Profesionales
FastAPI permite interrumpir el flujo de una petición de forma limpia usando `HTTPException`. Esto asegura que el cliente reciba un JSON estructurado con el error, en lugar de una página HTML de error del servidor.
- **Regla de Oro:** Siempre que una validación de negocio falle (ej: usuario no encontrado), debemos lanzar una excepción controlada con el Status Code adecuado.

### 2.4 IA para el Diseño de Endpoints (Huella IA)
Diseñar una suite completa de endpoints puede ser repetitivo. El agente de IA actúa como un **"Arquitecto de Rutas"**.
- **Estrategia:** Entregar a la IA el esquema de Pydantic y el contrato del Repositorio, y pedirle: *"Genera los endpoints CRUD para este recurso. Asegúrate de usar 201 para creación, 404 si el ID no existe y maneja excepciones de integridad con 400"*.
- **Validación Humana:** El desarrollador debe verificar que los verbos elegidos por la IA coincidan con la intención del negocio y que los códigos de estado sean los correctos.

```python
# Ejemplo de CRUD Profesional con Status Codes
from fastapi import FastAPI, HTTPException, status

app = FastAPI()

# Simulación de Base de Datos Legacy
items = {1: {"name": "Laptop"}, 2: {"name": "Mouse"}}

@app.get("/items/{item_id}")
def read_item(item_id: int):
    if item_id not in items:
        # Lanzamos un 404 profesional
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Item no encontrado en el sistema legado"
        )
    return items[item_id]

@app.post("/items", status_code=status.HTTP_201_CREATED)
def create_item(name: str):
    new_id = max(items.keys()) + 1
    items[new_id] = {"name": name}
    return {"id": new_id, "name": name}
```

## Producto o evidencia del bloque
- Explicar la diferencia entre una respuesta `200` y una `201` tras una creación.
- Identificar en qué situación es correcto devolver un error `400` en lugar de un `422`.
- Implementar un endpoint de lectura que maneje correctamente el caso de "Recurso no encontrado".

## Preguntas de chequeo
1. ¿Por qué no debemos usar `GET` para eliminar un registro de la base de datos?
2. ¿Qué ventaja tiene usar `HTTPException` frente a un simple `return {"error": "..."}`?
3. ¿Cómo ayuda el uso de Status Codes correctos a un desarrollador de Frontend (React)?

---

# BLOQUE 3: Eje Cyber: Blindaje de Inyecciones y Validación de Esquemas

- **Duración:** 30 minutos (Extendido)
- **Objetivo del bloque:** Implementar una estrategia de ciberseguridad profunda (Defense in Depth) mediante el uso de esquemas de validación estrictos y el desacoplamiento de datos sensibles.
- **Modalidad:** Análisis de vulnerabilidades, blindaje de código y simulación de ataques.

## Desarrollo

### 3.1 La Superficie de Ataque en una API
A diferencia de los sistemas legacy donde el ataque solía dirigirse al HTML (XSS), en una API el objetivo es el **Dato**. Un atacante intentará "romper" la lógica del servidor enviando estructuras JSON malformadas, tipos de datos inesperados o payloads masivos para causar una denegación de servicio (DoS) o extraer información privilegiada.
- **Inyección de Datos:** No solo es SQL; es inyectar basura que el sistema procese como válida.
- **Exposición de Datos Sensibles:** Devolver el objeto de la base de datos completo (incluyendo hashes de claves o tokens internos).

### 3.2 Pydantic como Escudo de Primera Línea (Input Validation)
El uso de `Field` en Pydantic no es decorativo; es una herramienta de restricción de seguridad. Debemos aplicar el principio de **Mínimo Privilegio** a los datos:
- **`max_length` y `min_length`:** Evitan que un atacante envíe strings de megabytes para agotar la memoria del servidor (DoS).
- **`pattern` (Regex):** Obliga a que los datos sigan un formato exacto (ej: solo letras y números), bloqueando caracteres especiales usados en inyecciones SQL o scripts.
- **`ge` / `le` (Greater/Less than):** Aseguran que los números (como IDs o precios) estén en rangos lógicos, evitando "IDs negativos" que podrían confundir a la lógica de base de datos.

### 3.3 Blindaje contra "Type Confusion" (Python 3.12)
El tipado estricto de Python 3.12 (`int | None`, `list[str]`) actúa como un filtro de hardware. Si un atacante intenta enviar un objeto complejo donde se espera un `int`, el motor de FastAPI rechaza la petición en la capa de red, **antes** de que cualquier código de negocio (o el Repositorio) toque ese dato radiactivo.

### 3.4 El Desacoplamiento: Schemas vs. Models (Output Validation)
Una de las vulnerabilidades más comunes (OWASP API10:2023) es la **Exposición Excesiva de Datos**.
- **Regla de Oro:** Jamás devuelvas el modelo de la base de datos directamente al cliente.
- **Estrategia:** Crear esquemas de salida (ej: `UserRead`) que filtren campos sensibles. Aunque la DB tenga el campo `password_hash`, la API solo devuelve `username` y `email`.

### 3.5 IA como Pentester de Esquemas (Huella IA)
Un desarrollador puede olvidar una restricción de seguridad. El agente de IA es excelente encontrando "agujeros" lógicos en los contratos de datos.
- **Estrategia:** Entregar el esquema a la IA y pedirle: *"Actúa como un analista de ciberseguridad. Encuentra 3 vectores de ataque posibles en este esquema de Pydantic y genera el código corregido con restricciones de Field para mitigarlos"*.
- **Validación Humana:** El alumno debe interpretar el riesgo (ej: "¿Realmente necesito que el nombre acepte caracteres especiales?") y aplicar el parche.

```python
# Ejemplo de Blindaje Cyber en FastAPI
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr, Field, field_validator
import re

app = FastAPI()

# Esquema Blindado (Input)
class UserCreate(BaseModel):
    # max_length previene DoS por payloads gigantes
    username: str = Field(..., min_length=3, max_length=20, pattern="^[a-zA-Z0-9]+$")
    email: EmailStr
    # ge=1 previene IDs malformados o negativos
    legacy_id: int = Field(..., ge=1)

    @field_validator("username")
    @classmethod
    def prevent_sql_keywords(cls, v: str) -> str:
        # Validación extra de negocio/seguridad
        forbidden = ["SELECT", "DROP", "UPDATE", "DELETE", "--"]
        if any(keyword in v.upper() for keyword in forbidden):
            raise ValueError("Contenido malicioso detectado en el username")
        return v

# Esquema de Salida (Protección de Datos Sensibles)
class UserRead(BaseModel):
    username: str
    email: EmailStr
    # NOTA: Aquí NO incluimos campos sensibles como password_hash
```

## Producto o evidencia del bloque
- Crear un esquema que use `pattern` (Regex) para validar un código de producto legacy.
- Explicar por qué usar `int | None` es más seguro que no tipar una variable.
- Identificar un campo en un modelo de base de datos que **nunca** debería estar en un esquema de salida de la API.

## Preguntas de chequeo
1. ¿Cómo puede un `max_length` en un string prevenir un ataque de denegación de servicio (DoS)?
2. ¿Qué es la "Exposición Excesiva de Datos" y cómo la solucionamos con Pydantic?
3. ¿Por qué es mejor que la validación ocurra en el esquema y no dentro del Repositorio?

---

# BLOQUE 4: Interoperabilidad Real: Conectando FastAPI con el Legado y Auditoría IA

- **Duración:** 25 minutos (Contenido de Alta Densidad)
- **Objetivo del bloque:** Consolidar la arquitectura de "puente" entre sistemas modernos y legados, dominando la documentación automática (OpenAPI), la gestión de políticas de origen (CORS) y la validación de integridad mediante pruebas asistidas por IA.
- **Modalidad:** Integración de sistemas, configuración de middleware, auditoría de documentación y simulacro de integración.

## Desarrollo

### 4.1 La API como Fachada (Patrón Facade): El Rescate del Legado
En el mundo profesional, rara vez reemplazamos un sistema de 10 años por uno nuevo de la noche a la mañana. La estrategia más inteligente es la **Interoperabilidad mediante Fachada**.
- **El Rol de FastAPI:** Actúa como una capa moderna, rápida y segura que "envuelve" la base de datos o los servicios de PHP que vimos el lunes.
- **Transparencia para el Cliente:** Un desarrollador de React o una App móvil consume `/api/v1/users` sin saber (ni importarle) que por detrás hay una tabla MySQL diseñada en 2014 con nombres de columnas en español y sin normalizar.
- **Abstracción de Deuda Técnica:** La API nos permite "limpiar" los datos antes de entregarlos, convirtiendo tipos, formateando fechas y renombrando campos para que cumplan con los estándares actuales.

### 4.2 OpenAPI (Swagger): El Contrato Vivo y la Verdad Única
Una de las mayores debilidades del desarrollo legacy era la falta de documentación (el "caos" del lunes). FastAPI soluciona esto de raíz mediante la generación automática de **OpenAPI (Swagger)** en la ruta `/docs`.
- **Mucho más que una lista de rutas:** Es un contrato ejecutable. Permite probar la API en tiempo real sin instalar herramientas externas.
- **Documentación Semántica:** En Python 3.12, podemos enriquecer este contrato usando descripciones en los campos de Pydantic, resúmenes de endpoints y ejemplos de respuesta.
- **Importancia Pedagógica:** El estudiante debe entender que si el Swagger dice que el campo es un `int`, **esa es la verdad absoluta**. Si el frontend envía otra cosa, el sistema fallará con un error `422`, tal como diseñamos en el Bloque 1.

### 4.3 El Muro de la Interoperabilidad: Entendiendo CORS (Cross-Origin Resource Sharing)
Este es el desafío técnico más común cuando conectamos una API moderna con un frontend. Por seguridad, los navegadores bloquean las peticiones que vienen de un dominio distinto al de la API.
- **El Problema:** Si tu API corre en el puerto `8000` y tu frontend (o sistema legacy) en el puerto `3000`, el navegador lanzará un error de CORS.
- **La Solución (Middleware):** FastAPI permite configurar políticas de origen de forma granular. Debemos aprender a "abrir la puerta" solo a los dominios autorizados, evitando el uso indiscriminado de `*` (permiso total), que es una vulnerabilidad grave.
- **Preflight Requests (OPTIONS):** Entender que el navegador hace una "pre-pregunta" al servidor antes de enviar datos reales (especialmente en `POST` o `PUT`). Si la API no sabe responder a esa pre-pregunta, la integración fallará.

### 4.4 Pruebas de Integración: Validando el Puente (Postman / Thunder Client)
Programar el endpoint es solo el 50% del trabajo. El otro 50% es **Validar la Interoperabilidad**.
- **Simulación Real:** Usamos herramientas como Postman para enviar payloads malformados, tokens inválidos o tipos de datos incorrectos y confirmar que nuestros Status Codes (Bloque 2) y Blindajes (Bloque 3) responden como se espera.
- **Flujo de Prueba:** 
    1. ¿El endpoint existe? (200 OK).
    2. ¿Valida el esquema? (422 si falta un campo).
    3. ¿Protege los datos? (¿Filtró el password_hash en la respuesta?).
    4. ¿Maneja el error de negocio? (404 si el ID legacy no existe).

### 4.5 IA como Ingeniero de Integración y QA (Huella IA)
La IA no solo genera código; genera **Estrategia de Pruebas**.
- **Generación de Mock Data:** Pedirle a la IA: *"Basado en este esquema de Pydantic, genera 10 objetos JSON realistas para pruebas, incluyendo 3 casos con datos inválidos (email mal formado, username muy corto) para testear mi API"*.
- **Plan de Pruebas Automatizado:** Pedirle: *"Actúa como un QA Engineer. Genera una colección de pruebas en formato cURL para validar todos los casos de borde de mi API de integración con el legado"*.
- **Auditoría de Documentación:** Entregar el código a la IA y preguntar: *"¿Mi documentación de Swagger es clara para un desarrollador externo? ¿Faltan descripciones o códigos de estado por documentar?"*.

### 4.6 Hoja de Ruta para la Evaluación Parcial 2 (El Lunes 27)
Esta clase es el simulacro final. El lunes, el estudiante deberá:
1. **Analizar un Sistema Legado:** Identificar tablas y lógica PHP (Clase Lunes).
2. **Diseñar la Capa de Datos:** Crear Repositorios MVC (Clase Martes).
3. **Construir la API Profesional:** Implementar FastAPI con Pydantic y Seguridad (Clase Hoy).
4. **Validar la Integración:** Asegurar que la API sea interoperable y esté blindada contra ataques básicos.

```python
# Ejemplo de Configuración Pro: Integración, CORS y Documentación
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="API de Integración Legado v1",
    description="Puente moderno para el rescate del sistema de gestión 2014.",
    version="1.0.0"
)

# CONFIGURACIÓN DE CORS (Seguridad Transversal)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Solo permitimos nuestro frontend
    allow_methods=["GET", "POST", "PUT"],
    allow_headers=["*"],
)

class UserRead(BaseModel):
    id: int
    username: str = Field(..., description="Nombre de usuario sanitizado del legado")
    email: str

@app.get("/api/v1/users/{user_id}", response_model=UserRead, tags=["Usuarios"])
def get_user_legacy(user_id: int):
    """
    Obtiene un usuario del sistema legado y lo transforma al estándar moderno.
    """
    # Aquí iría la llamada al Repository de ayer
    # user = repo.find_by_id(user_id)
    # if not user: raise HTTPException(404, "Usuario no existe")
    return {"id": user_id, "username": "diego_legacy", "email": "diego@aiep.cl"}
```

## Producto o evidencia del bloque
- Habilitar y configurar el middleware de CORS para un dominio específico.
- Generar y descargar la especificación `openapi.json` de la API construida.
- Realizar una prueba de integración exitosa desde un cliente externo (Postman) validando un Status Code `201` o `422`.

## Preguntas de chequeo
1. ¿Por qué es una mala práctica de seguridad usar `allow_origins=["*"]` en producción?
2. ¿Qué ventaja tiene el Patrón Facade cuando el sistema legado tiene nombres de columnas confusos?
3. ¿Cómo ayuda el Swagger a reducir las reuniones de coordinación entre el equipo de Backend y Frontend?
4. ¿Cuál es el paso más crítico de la Evaluación Parcial 2 según lo visto hoy?

---

# Cierre de la Clase

## Síntesis Final
- **Contrato y Validación:** FastAPI + Pydantic eliminan la incertidumbre del legado.
- **REST Semántico:** Verbos y Status Codes como lenguaje universal de la web.
- **Seguridad por Diseño:** Tipado, restricciones de campo y filtrado de salida (Cyber).
- **Interoperabilidad:** La API como puente seguro hacia el futuro del proyecto.

## Próximo Paso: Evaluación Parcial 2
El lunes 27 de abril pondremos a prueba estas competencias. El desafío consistirá en intervenir un sistema legado real y exponer su valor mediante una arquitectura MVC y una API profesional blindada. ¡Repasen el flujo completo de la semana!
