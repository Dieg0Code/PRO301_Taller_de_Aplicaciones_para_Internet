# Pokémon TCG Web Experience: Full-Stack Integration

**Pokémon TCG Web Experience** es una aplicación web interactiva de alto rendimiento que demuestra patrones avanzados de UI/UX, gestión de estado y renderizado 3D. Originalmente concebida como una prueba de concepto "Zero-JS", el proyecto ha evolucionado hacia una arquitectura **Full-Stack** moderna, integrando una lógica de cliente robusta y un backend potente.

---

## 🚀 Ejecución y Despliegue

La forma recomendada de iniciar el proyecto en Windows es mediante el archivo **`EJECUTAR_SERVIDOR.bat`** en la raíz, el cual realiza una verificación automática de dependencias y seguridad.

### Alternativa: Ejecución Manual
Si prefieres iniciar el servidor manualmente desde la consola:
1. Abre una terminal (`cmd` o `PowerShell`) en la carpeta **`backend/`**.
2. Ejecuta uno de los siguientes comandos según tu necesidad:

*   **Acceso Seguro (Solo Local):**
    ```bash
    uvicorn main:app --host 127.0.0.1 --port 8000 --reload
    ```
*   **Acceso en Red (Otros dispositivos) PRECAUCIÓN: Otros dispositivos podran acceder a este puerto, no es recomendable en redes no seguras como Wi-Fi públicos.**

    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    ```

---

## 🔐 Credenciales de Prueba

Para explorar las funcionalidades de la plataforma sin necesidad de registrarse, puede utilizar la siguiente cuenta de prueba:

*   **Usuario:** `PokemonUser@pokemon.com`
*   **Contraseña:** `pokeuser!!`

### Acceso Administrativo
Para establecer a un usuario como administrador dentro de la plataforma:
1. Inicie sesión con cualquier cuenta (o la de prueba mencionada arriba).
2. Diríjase a su **Perfil**.
3. Seleccione **"Iniciar modo administrador"**.
4. Ingrese el código maestro: **`admin123`**.

---

## 🏗️ Arquitectura y Decisiones Técnicas

El proyecto se basa en una arquitectura de tres capas que prioriza el rendimiento, la escalabilidad y la experiencia de usuario premium.

### 1. Frontend: JavaScript Moderno y CSS de Vanguardia
Aunque el proyecto utiliza **Vanilla JavaScript (ES6+)** para la lógica de negocio y la comunicación con el servidor, mantiene una base de CSS extremadamente avanzada para la gestión de la interfaz.

*   **HTML Semántico:** Estructura basada en estándares de la W3C (`header`, `main`, `section`, `footer`) para asegurar accesibilidad y SEO.
*   **Máquina de Estados Híbrida:** El enrutamiento y el estado de los modales se gestionan mediante una combinación de Radio Button Hack y selectores relacionales `:has()`, minimizando la necesidad de scripts para cambios visuales simples.
*   **Gestión de Sesión:** Implementación de persistencia de inicio de sesión mediante `localStorage` y actualizaciones dinámicas del DOM sin recargas de página.

### 2. Backend: API Restful con FastAPI
El motor de la aplicación es un servidor **FastAPI (Python 3.12)** diseñado para ser ligero y extremadamente rápido.

*   **Puntos de Enlace (Endpoints):** Gestión completa de usuarios (Registro, Login, Perfil) mediante una API REST bien definida.
*   **Validación de Datos:** Uso de modelos **Pydantic** para garantizar que los datos que fluyen entre el cliente y el servidor sean siempre válidos.
*   **Seguridad:** Hashing de contraseñas mediante `bcrypt` y validación de unicidad de datos sensibles.

### 3. Base de Datos: Persistencia SQL
Se utiliza un motor **SQL (SQLite)** junto con el ORM **SQLAlchemy** para la gestión de datos.

*   **Modelos Relacionales:** Esquemas claros para la entidad Usuario.
*   **Integridad:** Restricciones de base de datos para asegurar que los nombres de usuario y correos electrónicos sean únicos y consistentes.

---

## 🚀 Módulos y Características Destacadas

### 📖 Pokédex Dinámica
La sección de la Pokédex está construida con **Vanilla JavaScript** y se renderiza de forma declarativa y dinámica a partir de un conjunto de datos en memoria. 
*   **Filtrado en Tiempo Real:** Incorpora algoritmos de ordenamiento instantáneo (numérico y alfabético) sin recarga de página.
*   **Carrusel Responsivo:** Utiliza control nativo de scroll suave (`scroll-behavior: smooth`) para navegar a través de la lista de Pokémon de forma intuitiva, optimizado con carga diferida de imágenes (`loading="lazy"`).

### ⚔️ Mini-Juego Interactivo (Pokémon Battle)
Una micro-aplicación integrada en la arquitectura principal, desarrollada utilizando **React 18 + TypeScript** y empaquetada mediante **Vite**.
*   **Inyección sin Iframes:** El juego se compila como un bundle autónomo (JS/CSS) e inyecta directamente en el DOM nativo de la aplicación. Esto asegura que la SPA original y React compartan el mismo hilo de ejecución, orígenes de seguridad y almacenamiento local (sesión de usuario).
*   **Estética Retro:** Implementa la fuente *Press Start 2P*, diseño de menús tipo consola y sprites escalados matemáticamente utilizando `image-rendering: pixelated` para mantener una nitidez perfecta.
*   **Arquitectura Orientada a Objetos:** Uso de interfaces en TypeScript para separar la lógica de los datos de combate de la capa de visualización.
*   **Comunicación Backend:** Eventos y telemetría de las partidas se comunican directamente a los endpoints (`/api/game/stats`) de FastAPI.

### 🛠️ Panel de Administración (Modo Admin)
El sistema incluye un módulo de administración integrado que permite a los supervisores monitorear la actividad de la comunidad en tiempo real.

*   **Acceso Seguro:** Para activar las funciones administrativas, el usuario debe dirigirse a su **Perfil** y seleccionar el botón **"Iniciar modo administrador"**. 
*   **Código Maestro:** Se requerirá el ingreso del código de seguridad: **`admin123`**. Una vez validado, el usuario es promovido a Administrador en la base de datos de forma persistente.
*   **Panel de Control:** Un dashboard dedicado (overlay) que permite:
    *   **Monitoreo de API:** Estado de conexión en tiempo real con el backend (`GET /api/users`).
    *   **Gestión de Usuarios:** Listado completo de entrenadores registrados con sus respectivos IDs y correos.
    *   **Visualización de Actividad:** Capacidad de ver el perfil detallado de cualquier usuario, incluyendo sus **Pokémon favoritos** y su contador de **victorias en el mini-juego**.

---

## 🎨 Motor de Renderizado y Efectos de Composición

La aplicación implementa un modelo espacial sofisticado para simular la interacción física con las cartas:

*   **Hardware Acceleration:** Las transformaciones 3D (`rotateX`, `rotateY`, `scale`) fuerzan la creación de capas de composición en la GPU, manteniendo 60 FPS estables incluso en dispositivos móviles.
*   **Holographic Foil Effect:** Efecto procedimental que combina gradientes dinámicos neón, `filter: blur()`, y composición avanzada mediante `mix-blend-mode: color-dodge`.
*   **Scroll-driven Animations:** Uso de la API nativa `animation-timeline: scroll()` para animaciones vinculadas al desplazamiento, eliminando el "jank" tradicional del scroll basado en JS.

---

## 💻 Requisitos y Soporte

*   **Navegador:** Compatible con Chromium 115+, Safari 16.4+ o Firefox 121+ (Soporte necesario para `:has()` y `animation-timeline`).
*   **Entorno:** Python 3.12+ para el servidor backend.

---

## 🛠️ Despliegue Local

El proyecto está configurado para ejecutarse mediante un único lanzador principal que gestiona todas las dependencias y lanza el servidor, el cual a su vez sirve tanto la API como el frontend completo.

```bash
# En el directorio raíz del proyecto, ejecuta el script iniciador:
python run.py
```

Al iniciarse con éxito, FastAPI montará automáticamente el directorio como recursos estáticos. Simplemente abre tu navegador y accede a:
**`http://127.0.0.1:8000/`**

*(Nota: Si deseas modificar el código fuente del Mini-Juego en React, deberás ingresar a `web_mini_game/pokemon-battle` y ejecutar `npm run build` para que Vite actualice los activos que sirve FastAPI).*

---

## 📄 Licencia y Descargo de Responsabilidad
Este es un proyecto de ingeniería conceptual y de código abierto creado únicamente con fines educativos. © 2026 Pokémon. © 1995–2026 Nintendo / Creatures Inc. / GAME FREAK inc.