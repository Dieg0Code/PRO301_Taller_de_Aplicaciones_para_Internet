# SPEC - `Nodo Web`

## 1. Identificación del Proyecto

- `nombre_proyecto`: `Nodo Web`
- `tipo_pagina`: `LANDING_SERVICIO`
- `tema_central`: `estudio ficticio de estrategia, diseño y desarrollo web para pymes de servicios profesionales`
- `contexto`: `FICTICIO_PLAUSIBLE`

## 2. Objetivo del Sitio

- `objetivo_principal`: `presentar una propuesta de servicio web clara y profesional para captar contactos`
- `accion_principal`: `solicitar una asesoría inicial`
- `mensaje_clave`: `un negocio pequeño puede tener una presencia web seria, clara y confiable sin depender de soluciones improvisadas`

## 3. Público Objetivo

- `publico_objetivo`: `dueños de pequeñas empresas, estudios profesionales y emprendedores que necesitan ordenar su presencia digital`
- `nivel_tecnico_del_publico`: `BAJO`
- `necesidad_principal_del_publico`: `entender rápido qué ofrece el servicio, por qué se ve confiable y cómo iniciar una conversación`

## 4. Criterio de Realismo

- `nivel_de_realismo`: `DEBE_PARECER_SERVICIO_REAL`
- `tono_de_copy`: `PROFESIONAL, B2B, SOBRIO`
- `senales_de_seriedad`:
  - `propuesta de valor clara y específica`
  - `bloques de servicio con lenguaje real de negocio`
  - `cierre comercial sobrio con CTA creíble`
- `prohibiciones_de_contenido_visible`:
  - `no mencionar que es un ejemplo, demo, ejercicio o evaluación`
  - `no mostrar texto visible sobre HTML, CSS, tokens, responsive o detalles de implementación`
  - `no dejar comentarios meta, textos pedagógicos o frases tipo "esta landing" dentro de la UI`

## 5. Alcance del Contenido

- `secciones_obligatorias`:
  - `hero principal`
  - `propuesta de valor y beneficios`
  - `cards de servicios`
  - `proceso de trabajo`
  - `bloque de contacto y footer`

- `componentes_clave`:
  - `botón principal de contacto`
  - `cards de servicios`
  - `bloque de señales de confianza o diferenciales`
  - `formulario o callout final de contacto`

- `contenido_minimo`:
  - `headline principal, subtítulo y CTA visible`
  - `explicación breve del servicio y de su valor`
  - `3 cards de servicios o soluciones`
  - `bloque final de contacto con CTA`

## 6. Dirección Visual

- `tono_visual`: `SOBRIO, TECNICO, MODERNO, ELEGANTE, CORPORATIVO`
- `jerarquia_visual`: `headline fuerte, subtítulo claro, CTA visible, buen aire entre bloques, cards con presencia y una composición que se sienta de producto real`
- `paleta_base`: `azul profundo dominante, rojo como acento, fondo claro cálido, blanco y tonos suaves para superficies`
- `referencias_visuales`: `lenguaje visual cercano a las diapositivas AIEP del módulo, pero llevado a una landing de servicio B2B seria`
- `nivel_de_animacion`: `SUAVE`
- `prohibiciones_visuales`:
  - `no verse infantil`
  - `no verse juguete o experimental`
  - `no abusar de adornos, blobs o decoración gratuita`
  - `no parecer template genérico de baja calidad`

## 7. Restricciones Técnicas

- `stack_permitido`:
  - `html`: `SI`
  - `css`: `SI`
  - `javascript`: `NO`
  - `frameworks`: `NO`

- `archivos_esperados`:
  - `index.html`
  - `styles.css`
  - `assets/`

- `restricciones_adicionales`:
  - `usar HTML semántico real`
  - `trabajar con enfoque mobile-first`
  - `no crear archivos innecesarios ni estructura inflada`

## 8. Responsive Esperado

- `enfoque_layout`: `MOBILE_FIRST`
- `comportamiento_en_celular`: `hero en una sola columna, CTA visible, cards apiladas, contenido principal primero y buen espaciado vertical`
- `comportamiento_en_tablet`: `dos columnas donde tenga sentido, cards con mejor aire y lectura más amplia`
- `comportamiento_en_escritorio`: `layout más abierto, mejor distribución entre texto y panel visual, cards alineadas y secciones claramente separadas`
- `componentes_que_deben_cambiar`:
  - `hero principal`
  - `grid de cards`
  - `bloque de contacto`

## 9. Accesibilidad Mínima

- `contraste`: `texto y botones con contraste razonable sobre todos los fondos`
- `imagenes_con_alt`: `SI`
- `formularios_con_label`: `SI`
- `foco_visible`: `SI`
- `jerarquia_de_headings`: `un solo h1 y jerarquía clara de h2 y h3`

## 10. Sistema CSS

- `usar_tokens_css`: `SI`
- `tokens_minimos`:
  - `--color-brand`
  - `--color-accent`
  - `--space-md`
  - `--radius-md`

- `componentes_con_variantes`:
  - `botón principal y botón secundario`
  - `card base y card destacada`

- `interacciones_visuales`:
  - `HOVER`
  - `TRANSITION`
  - `ANIMACION_SUAVE`

## 11. Método de Entrega

- `tipo_entrega`: `GITHUB`
- `repositorio_o_archivo`: `repositorio de GitHub del estudiante con nombre claro y estructura limpia`
- `estructura_de_entrega`: `raíz simple con index.html, styles.css, assets/ y commits básicos si alcanza el tiempo`

## 12. Criterios de Aceptación

- `criterio_1`: `el HTML debe ser semántico, ordenado y fácil de leer`
- `criterio_2`: `el CSS debe usar tokens, mantener consistencia visual y evitar repetición innecesaria`
- `criterio_3`: `la página debe adaptarse bien a celular, tablet y escritorio`
- `criterio_4`: `la accesibilidad mínima debe estar cubierta con contraste, alt, labels y headings razonables`
- `criterio_5`: `la entrega debe estar ordenada y preferentemente en un repositorio de GitHub`
- `criterio_6`: `la UI visible debe sentirse como un servicio real y no debe contener texto meta ni referencias a la evaluación`

## 13. Prompt Base para Codex

```text
Quiero construir una landing page de servicio para pequeñas empresas y estudios profesionales sobre un estudio ficticio llamado Nodo Web.

Objetivo principal:
presentar una propuesta de servicio web clara y profesional para captar contactos.

Mensaje clave:
un negocio pequeño puede tener una presencia web seria, clara y confiable sin depender de soluciones improvisadas.

La interfaz debe parecer un servicio real de tipo B2B, no una demo académica.

No quiero que el sitio visible mencione:
- que es un ejemplo, demo, ejercicio o evaluación
- HTML, CSS, tokens, responsive o detalles de implementación
- comentarios meta o textos pedagógicos dentro de la UI

Secciones obligatorias:
hero principal
propuesta de valor y beneficios
3 cards de servicios o soluciones
proceso de trabajo
bloque de contacto y footer

Dirección visual:
sobria, técnica, moderna, elegante y corporativa
headline fuerte, subtítulo claro, CTA visible, buen aire entre bloques y composición de producto real
paleta cercana a AIEP: azul profundo dominante, rojo como acento, fondo claro cálido y superficies limpias

Evitar visualmente:
- que se vea infantil
- que se vea juguete o experimental
- exceso de adornos o decoración gratuita
- apariencia de template genérico de baja calidad

Restricciones técnicas:
usar solo HTML y CSS
no usar JavaScript
no usar frameworks
trabajar con index.html, styles.css y assets/
mantener HTML semántico
usar enfoque mobile-first
no crear archivos innecesarios

Responsive esperado:
en celular la hero debe quedar en una sola columna, el CTA debe seguir visible y las cards deben apilarse
en tablet puede haber dos columnas donde tenga sentido
en escritorio el layout debe abrirse más sin perder claridad

Accesibilidad mínima:
contraste razonable
imágenes con alt
formulario con label
foco visible
un solo h1 y jerarquía clara de headings

Sistema CSS:
usar tokens en :root para color, spacing y radios
crear botón principal y secundario
crear card base y card destacada
usar hover, transiciones suaves y una animación ligera solo si mejora la interfaz

Método de entrega:
el proyecto debe quedar ordenado para subirse a GitHub

Quiero una primera versión funcional, clara, semántica, responsive, ordenada y con apariencia de servicio real.
```

---
