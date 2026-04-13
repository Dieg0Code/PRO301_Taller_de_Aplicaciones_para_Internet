# | Pokémon TCG Web Experience |


**Zero-JS CSS Architecture A proof-of-concept interactive web application** demonstrating advanced UI/UX patterns, state management, and 3D rendering relying exclusively on declarative CSS and HTML.

Este proyecto **prescinde por completo de JavaScript**, utilizando características de vanguardia de **CSS (como :has() y Scroll-driven Animations)** para manejar lógica de estado compleja que tradicionalmente requeriría un framework de JS.

**🏗️ Arquitectura y Decisiones Técnicas**: El objetivo principal de este proyecto es explorar los límites del CSSOM (CSS Object Model) moderno para la gestión de interfaces dinámicas, minimizando la carga en el hilo principal (Main Thread) al delegar las animaciones y transiciones a la GPU.

1. Máquina de Estados Declarativa (Zero-JS State Management) En lugar de mutar el DOM imperativamente con JavaScript, el enrutamiento y el estado de los modales se gestionan mediante el Checkbox/Radio Button Hack combinado con el selector relacional :has().

**Global State Container** Los input[type="radio"] ocultos en la raíz del actúan como el store de la aplicación.

**Conditional Rendering:** Utilizando el combinador de hermanos (~) y pseudo-clases (:checked), el CSS inyecta estilos condicionales que montan o desmontan las "vistas" (.view-home, .view-packs, .view-cards) sin causar reflows costosos.

**Parent Selector Logic:** La pseudo-clase :has() permite que el contenedor principal (body) reaccione al estado de sus hijos, por ejemplo, aplicando overflow: hidden globalmente cuando un modal se abre.

2. Motor de Renderizado 3D y Efectos de Composición El proyecto implementa un modelo espacial para simular la interacción física con los sobres y las cartas:

**Hardware Acceleration:** Las transformaciones 3D (rotateX, rotateY, scale) forzan la creación de capas de composición (composite layers), trasladando el cálculo gráfico a la GPU para mantener los 60 FPS estables.

**Contextos de Apilamiento (Stacking Contexts):** Uso de transform-style: preserve-3d y perspective para mantener la coherencia espacial durante la rotación de las cartas (backface-visibility: hidden).

**Holographic Foil Effect:** Implementado de forma procedural sin texturas pesadas, combinando gradientes dinámicos interpolados (linear-gradient con colores neón RGB), filter: blur(), y composición avanzada usando mix-blend-mode: color-dodge.

3. Animaciones Impulsadas por Scroll (Scroll-driven Animations API) Se reemplazaron los Event Listeners de scroll de JS por la especificación nativa de CSS animation-timeline: scroll().

**Rendimiento:** Las animaciones vinculadas al scroll se ejecutan fuera del hilo principal, eliminando el jank (tartamudeo) típico asociado al cálculo de scrollTop en JS.

Elementos clave como la barra de navegación superior y el logo principal utilizan keyframes interpolados directamente por la posición de desplazamiento del documento raíz (scroll(root)).

4. Layout Fluido y Adaptabilidad Extrema La interfaz es elástica y responde a viewports desde pantallas ultra-anchas hasta dispositivos móviles limitados (350px):

**CSS Grid & Flexbox:** Uso intensivo para layouts asimétricos (como la grilla de noticias) que mantienen proporciones (aspect-ratio) estrictas sin importar el tamaño del contenedor.

**Micro-interacciones:** Respuestas táctiles y de hover escalonadas usando curvas de interpolación Bézier (cubic-bezier(0.25, 1, 0.5, 1)) para simular físicas naturales.

**📊 Beneficios de Rendimiento (Performance) TBT (Total Blocking Time) = 0ms:** Al no existir evaluación ni ejecución de scripts, el hilo principal queda libre inmediatamente tras el análisis del HTML y CSS.

**TTI (Time to Interactive):** Prácticamente equivalente al FCP (First Contentful Paint), ya que no hay hidratación (hydration) de frameworks.

Seguridad: Inmunidad inherente a ataques XSS (Cross-Site Scripting) basados en manipulación del DOM vía scripts.

💻 **Requisitos del Entorno (Browser Support)** Dado el uso de especificaciones recientes de la W3C, se requiere un navegador moderno compatible con Chromium 115+, Safari 16.4+ o Firefox 121+:

**Soporte para :has() CSS pseudo-class.**

Soporte para animation-timeline.

**🛠️ Despliegue Local Al** ser un proyecto estático sin dependencias, no requiere procesos de build ni gestores de paquetes (NPM/Yarn).

Bash

# 1. Clonar el repositorio

[](https://github.com/Nikolai-99/proyecto-web-html.css.only#1-clonar-el-repositorio)

git clone [https://github.com/tu-usuario/pokemon-tcg-css.git](https://github.com/tu-usuario/pokemon-tcg-css.git)

# 2. Navegar al directorio

[](https://github.com/Nikolai-99/proyecto-web-html.css.only#2-navegar-al-directorio)

cd pokemon-tcg-css

# 3. Abrir en el navegador (ejemplo en macOS)

[](https://github.com/Nikolai-99/proyecto-web-html.css.only#3-abrir-en-el-navegador-ejemplo-en-macos)

open index.html (Opcional: Para una mejor experiencia de desarrollo, puedes usar extensiones como Live Server en VS Code).

📄 Licencia y Descargo de Responsabilidad Este es un proyecto de ingeniería conceptual y de código abierto creado únicamente con fines educativos. 