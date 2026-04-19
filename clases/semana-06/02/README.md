# Clase 17 - Arquitectura MVC y Separación de Responsabilidades

- Unidad: 2 · Integración y Arquitectura
- Fecha: martes 21 de abril de 2026
- Duración: 3 horas
- Modalidad: Presencial / Remota
- Docente: Diego Obando

---

# Objetivos de la Clase

## Objetivo General

Comprender y aplicar el patrón arquitectónico MVC y el principio de separación de responsabilidades (SoC) para transformar sistemas legacy en aplicaciones escalables y mantenibles, utilizando IA como apoyo estratégico y aplicando criterios de seguridad ofensiva/defensiva de forma transversal.

## Objetivos Específicos

Al finalizar la clase, el estudiante será capaz de:

1. Identificar las tres capas fundamentales del patrón MVC y su rol en la gestión de una petición web.
2. Refactorizar código "Todo-en-Uno" separando operativamente la lógica de control de la visualización (Vista).
3. Implementar Modelos y Repositorios para aislar la persistencia y las reglas de negocio, mejorando la seguridad y mantenibilidad.
4. Utilizar agentes de IA de forma profesional (Agentic Engineering) para mapear dependencias y ejecutar refactorizaciones arquitectónicas quirúrgicas.
5. **Eje de Ciberseguridad**: Analizar vulnerabilidades en código legacy (SQLi, XSS) mediante técnicas de explotación ética para diseñar defensas robustas en la capa de persistencia.

## Competencias Transversales

- **Pensamiento Arquitectónico**: Capacidad para ver el código como una estructura de capas y no solo como una secuencia de instrucciones.
- **Ingeniería Asistida por IA**: Uso de agentes para automatizar tareas repetitivas de refactorización bajo supervisión técnica y validación humana.
- **Cultura de Seguridad**: Mentalidad de "defensa en profundidad", entendiendo cómo piensa un atacante para blindar el sistema desde la arquitectura.

---

# Mapa de la Clase

| Horario | Sección | Propósito |
|---------|---------|-----------|
| 10:00 - 10:10 | Objetivos y encuadre | Alinear expectativas y conectar con el análisis del código legacy realizado el lunes |
| 10:10 - 10:45 | Bloque 1 | Introducir el patrón MVC y el principio de Separación de Responsabilidades (SoC) |
| 10:45 - 11:20 | Bloque 2 | Desarrollar la separación de Controlador y Vista: El fin del archivo "Mezclado" |
| 11:20 - 11:30 | Pausa | Descanso breve |
| 11:30 - 12:05 | Bloque 3 | Profundizar en Modelos y Repositorios: El cerebro y la memoria del sistema. **Eje Cyber: SQLi**. |
| 12:05 - 12:40 | Bloque 4 | Aplicar refactorización asistida por IA y validación humana de arquitectura. **Eje Cyber: Auditoría IA**. |
| 12:40 - 13:00 | Cierre | Sintetizar el aprendizaje y proyectar la construcción de APIs del miércoles |

---

# BLOQUE 1: Del Caos al Orden (Patrón MVC)

- Duración: 35 minutos
- Objetivo del bloque: Comprender el principio de Separación de Responsabilidades (SoC) y la estructura conceptual del patrón MVC.
- Modalidad: Expositiva y Conversada.

## Desarrollo

### 1.1 El Dolor del "Todo-en-Uno" (Repaso)
En la sesión anterior vimos cómo los archivos PHP legacy (ej. `editar_user.php`) concentran todo en un solo lugar:
- Conexión a la base de datos.
- Lógica de captura de formularios (`$_POST`).
- Consultas SQL (`UPDATE`, `SELECT`).
- Estructura HTML y CSS.

**El problema:** Cuando este archivo crece a 1000 líneas, un error en el HTML puede romper accidentalmente la lógica de persistencia. No hay "paredes" que protejan las distintas partes del sistema.

### 1.2 Principio de Separación de Responsabilidades (SoC)
Es la piedra angular de la arquitectura de software. Dicta que un programa debe estar dividido en secciones, donde cada sección aborda una responsabilidad distinta.
- **Beneficios:** Facilidad de testeo, mantenimiento en equipo (uno toca la vista, otro la lógica) y reutilización de código.

### 1.3 Anatomía del Patrón MVC
MVC (Modelo-Vista-Controlador) es el patrón estándar para organizar aplicaciones web.

**La Analogía del Restaurante:**

| Elemento Técnico | Mundo Real (Restaurante) | Responsabilidad |
|------------------|--------------------------|-----------------|
| **Controlador** | El Mesero / Camarero | Recibe el pedido (Request), coordina al resto y entrega el plato. |
| **Modelo** | El Chef / La Cocina | Conoce las recetas (Reglas de negocio) y maneja los ingredientes (Datos). |
| **Vista** | El Plato / Presentación | Es lo que el cliente finalmente ve y consume (Interfaz). |

1. **Controlador:** El "Director de Orquesta". No cocina, no diseña el menú. Solo recibe la petición del navegador, le pide datos al Modelo y se los entrega a la Vista.
2. **Modelo:** El "Dueño de la Verdad". Es el único que toca la Base de Datos. No sabe nada de HTML ni de botones.
3. **Vista:** El "Presentador". Recibe datos "masticados" y los pone bonitos en HTML. No sabe que existe una base de datos.

### Preguntas guía

- Si el sistema tiene un error ortográfico en un botón, ¿qué capa debemos revisar?
- Si queremos cambiar la base de datos de MySQL a PostgreSQL, ¿qué capa debería absorber casi todo el cambio?
- ¿Por qué el mesero (Controlador) no debería cocinar (hacer SQL)?

### Cierre del bloque

- **Idea clave:** MVC no es "más código", es código mejor organizado para que el crecimiento no se convierta en caos.
- **Puente:** Ahora que entendemos quién es quién, vamos a ver cómo separar al Mesero (Controlador) del Menú (Vista) en nuestro código legacy.

---

# BLOQUE 2: El Director y el Presentador (Controlador y Vista)

- Duración: 35 minutos
- Objetivo del bloque: Aprender a separar la lógica de flujo (Controlador) de la visualización (Vista) para eliminar archivos mezclados.
- Modalidad: Expositiva y Demostrativa.

## Desarrollo

### 2.1 El Controlador: El Cerebro de la Petición
El Controlador es el archivo que el navegador llama directamente. Su trabajo es:
1. Recibir los datos (`$_GET`, `$_POST`, `$_SESSION`).
2. Validar que la petición sea legítima (¿Está logueado el usuario?).
3. Decidir qué "ingredientes" (datos) se necesitan.
4. Llamar a la **Vista** adecuada para mostrar el resultado.

### 2.2 La Vista: El Presentador "Tonto"
Una vista profesional debe ser **"tonta"** (dumb view). Esto significa:
- **No hace SQL:** Jamás verás un `SELECT` dentro de una vista.
- **No maneja el flujo:** No decide si el usuario debe ser redirigido.
- **Solo imprime:** Recibe variables ya listas y las inyecta en el HTML.

### 2.3 Técnica de Refactorización: La Separación Quirúrgica
¿Cómo transformamos el archivo `editar_user.php` legacy en algo moderno?

1. **Paso 1: Identificar la frontera.** Buscamos la línea donde termina la lógica y empieza la primera etiqueta `<html>` o `<div>`.
2. **Paso 2: Externalizar la Vista.** Movemos todo el HTML a un archivo nuevo (ej. `vistas/editar_user_view.php`).
3. **Paso 3: El Puente.** En el controlador original, al final de la lógica, incluimos la vista: `include('vistas/editar_user_view.php');`.

### Actividad o chequeo

**Desafío Mental:**
Analiza este snippet legacy:
```php
<?php
$res = mysqli_query($conn, "SELECT * FROM users");
$row = mysqli_fetch_assoc($res);
if ($row['activo']) {
    echo "<h1>Bienvenido " . $row['name'] . "</h1>";
} else {
    echo "<h1>Cuenta suspendida</h1>";
}
?>
```
¿Qué parte de este código debería quedarse en el Controlador y qué parte debería moverse a la Vista?

### Cierre del bloque

- **Idea clave:** La separación de Controlador y Vista permite que un diseñador trabaje en la interfaz sin temor a borrar accidentalmente un `mysqli_query`.
- **Puente:** Ya separamos cómo se ve el sistema de cómo fluye. En el siguiente bloque, vamos a separar el "cerebro" y la "memoria" del sistema: el Modelo.

---

# BLOQUE 3: El Dueño de la Verdad (Modelos y Repositorios)

- Duración: 35 minutos
- Objetivo del bloque: Aislar la persistencia mediante el Patrón Repository, garantizando seguridad transversal mediante el control de explotación SQLi.
- Modalidad: Aplicación y Análisis.

## Desarrollo

### 3.1 Del Modelo al Repositorio
El Repositorio actúa como un mediador que gestiona la comunicación entre el dominio y la persistencia. Es el lugar donde se centraliza la seguridad de los datos.

### 3.2 Huella de Ciberseguridad: Explotación y Defensa (SQLi)
En este bloque aplicamos la mentalidad de "Hacker Ético" para blindar el Repositorio:
- **Explotación (Ofensiva):** ¿Cómo un atacante inyecta código en un `findById($id)` si no sanitizamos? Ejemplo de bypass de ID.
- **Defensa (Defensiva):** Blindaje mediante casting estricto `(int)` y `mysqli_real_escape_string` dentro de los métodos del Repositorio.

### 3.3 Paso Operativo: Abstracción agnóstica
Creamos el `UserRepository.php`. Comparamos cómo se maneja esto en frameworks modernos como **Laravel (Eloquent)** y cómo se abstraen los servicios en **FastAPI**.

### Verificación de comprensión

- ¿Cuál es la diferencia entre un archivo legacy con SQL mezclado y un Repositorio?
- ¿Por qué el Repositorio es el lugar ideal para aplicar las defensas contra SQL Injection?

### Cierre del bloque

- **Idea clave:** El repositorio es el "contrato" de datos y el escudo de seguridad de nuestra aplicación.
- **Puente:** Ahora que sabemos a qué arquitectura queremos llegar, vamos a usar agentes de IA para ejecutar esta cirugía de forma segura y auditada.

---

# BLOQUE 4: Refactorización Asistida, Validación Humana y Frameworks Modernos

- Duración: 45 minutos (expandido)
- Objetivo del bloque: Utilizar IA para ejecutar refactorizaciones arquitectónicas seguras y contrastar nuestra arquitectura manual con implementaciones profesionales en FastAPI (Python 3.12) y Laravel.
- Modalidad: Integración, Comparativa y Cierre aplicado.

## Desarrollo

### 4.1 El Prompt Arquitectónico (Spec-Driven)
Entregamos una especificación clara a la IA para trozar el código respetando las capas definidas. El enfoque no es solo "mover archivos", sino establecer contratos de datos claros entre el Controlador y el Repositorio.

### 4.2 Paralelo con la Industria: FastAPI y Laravel
Para entender por qué separamos capas, analizamos cómo lo hacen los líderes del mercado:
- **Python 3.12 + FastAPI**: Observamos el uso de Decoradores para ruteo (Controlador), Pydantic para Schemas (Modelo) y Dependency Injection para servicios.
- **PHP + Laravel**: Analizamos el ruteo centralizado, el poder de Eloquent ORM (Modelo avanzado) y Blade (Vistas profesionales).

### 4.3 Huella de Ciberseguridad: Auditoría IA y Blindaje de Frameworks
Usamos el agente como un "Pentester" de arquitectura para verificar:
- **Seguridad por Diseño**: Cómo los frameworks modernos protegen contra SQLi y CSRF de forma nativa.
- **Auditoría IA**: "Verifica que el nuevo Repositorio no herede las vulnerabilidades de concatenación del legacy."

### 4.4 Agentic Engineering: Validación de Integridad
El Ingeniero valida la coherencia de rutas, contextos de sesión y seguridad funcional tras la intervención asistida.

### Producto o evidencia del bloque

Esquema comparativo entre una arquitectura manual MVC y su equivalente en un framework moderno, validado mediante auditoría de IA.

### Cierre del bloque

- **Idea clave:** La arquitectura MVC es la base de la ciberdefensa aplicada al software.
- **Puente:** Mañana daremos el siguiente paso: convertir estas capas lógicas en una API interoperable.

---

# Cierre de la Clase

## Síntesis Final

- **Separación de Responsabilidades**: Paredes que protegen el sistema.
- **Patrón MVC + Repository**: El estándar senior para el manejo de datos y ruteo.
- **Seguridad Transversal**: Entender la explotación para construir defensas (SQLi).
- **Refactorización con IA**: Los agentes como socios de análisis y auditoría.

## Preguntas de Salida

- ¿Cómo ayuda el patrón Repository a prevenir ataques de SQL Injection?
- ¿Por qué un Ingeniero debe saber explotar una vulnerabilidad antes de intentar parcharla?
- ¿Qué ventaja técnica tiene separar la Vista para el equipo de seguridad?

## Próximo Paso

Mañana (miércoles 22) llevaremos esta arquitectura al siguiente nivel: **Construcción de una API Interoperable**.
