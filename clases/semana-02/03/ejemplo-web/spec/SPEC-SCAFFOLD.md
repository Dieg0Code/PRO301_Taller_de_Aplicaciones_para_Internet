# SPEC-SCAFFOLD.md

Reemplaza cada placeholder por tu definición real antes de pedírsela a Codex.

La idea no es describir una “página de ejemplo”, sino un sitio que pueda verse como un producto o servicio real del mundo profesional.

---

# SPEC - `<NOMBRE_DEL_PROYECTO>`

## 1. Identificación del Proyecto

- `nombre_proyecto`: `<NOMBRE_DEL_PROYECTO>`
- `tipo_pagina`: `<PORTAFOLIO | LANDING_PRODUCTO | LANDING_SERVICIO | EVENTO | APP | OTRO>`
- `tema_central`: `<TEMA_O_NEGOCIO>`
- `contexto`: `<REAL | FICTICIO_PLAUSIBLE | MIXTO>`

## 2. Objetivo del Sitio

- `objetivo_principal`: `<QUE_DEBE_LOGRAR_LA_PAGINA>`
- `accion_principal`: `<CTA_PRINCIPAL>`
- `mensaje_clave`: `<IDEA_QUE_DEBE_ENTENDERSE_EN_LA_PRIMERA_PANTALLA>`

## 3. Público Objetivo

- `publico_objetivo`: `<TIPO_DE_USUARIO>`
- `nivel_tecnico_del_publico`: `<BAJO | MEDIO | ALTO | NO_APLICA>`
- `necesidad_principal_del_publico`: `<PROBLEMA_O_INTERES_PRINCIPAL>`

## 4. Criterio de Realismo

- `nivel_de_realismo`: `<DEBE_PARECER_PRODUCTO_REAL | DEBE_PARECER_SERVICIO_REAL>`
- `tono_de_copy`: `<PROFESIONAL | B2B | INSTITUCIONAL | SOBRIO | CERCANO>`
- `senales_de_seriedad`:
  - `<SENAL_1>`
  - `<SENAL_2>`
  - `<SENAL_3>`
- `prohibiciones_de_contenido_visible`:
  - `<NO_MENCIONAR_QUE_ES_EJEMPLO_O_DEMO>`
  - `<NO_MENCIONAR_HTML_CSS_TOKENS_RESPONSIVE_EN_LA_UI>`
  - `<NO_DEJAR_COMENTARIOS_META_O_TEXTOS_PEDAGOGICOS_EN_PANTALLA>`

## 5. Alcance del Contenido

- `secciones_obligatorias`:
  - `<SECCION_1>`
  - `<SECCION_2>`
  - `<SECCION_3>`
  - `<SECCION_4>`
  - `<SECCION_5>`

- `componentes_clave`:
  - `<COMPONENTE_1>`
  - `<COMPONENTE_2>`
  - `<COMPONENTE_3>`
  - `<COMPONENTE_4>`

- `contenido_minimo`:
  - `<TEXTO_PRINCIPAL>`
  - `<TEXTO_SECUNDARIO>`
  - `<CANTIDAD_DE_CARDS_O_ITEMS>`
  - `<BLOQUE_DE_CONTACTO_O_CTA>`

## 6. Dirección Visual

- `tono_visual`: `<SOBRIO | TECNICO | MODERNO | ELEGANTE | MINIMALISTA | CORPORATIVO>`
- `jerarquia_visual`: `<COMO_DEBE_PRIORIZARSE_EL_CONTENIDO>`
- `paleta_base`: `<COLORES_PRINCIPALES>`
- `referencias_visuales`: `<REFERENCIAS_O_NINGUNA>`
- `nivel_de_animacion`: `<NINGUNA | SUAVE | MODERADA>`
- `prohibiciones_visuales`:
  - `<NO_VERSE_INFANTIL>`
  - `<NO_VERSE_JUGUETE>`
  - `<NO_USAR_BLOBS_O_DECORACION_GRATUITA>`
  - `<NO_PARECER_TEMPLATE_GENERICO>`

## 7. Restricciones Técnicas

- `stack_permitido`:
  - `html`: `<SI | NO>`
  - `css`: `<SI | NO>`
  - `javascript`: `<SI | NO>`
  - `frameworks`: `<SI | NO>`

- `archivos_esperados`:
  - `<ARCHIVO_1>`
  - `<ARCHIVO_2>`
  - `<ARCHIVO_3_O_NO_APLICA>`

- `restricciones_adicionales`:
  - `<RESTRICCION_1>`
  - `<RESTRICCION_2>`
  - `<RESTRICCION_3>`

## 8. Responsive Esperado

- `enfoque_layout`: `<MOBILE_FIRST | DESKTOP_FIRST>`
- `comportamiento_en_celular`: `<COMO_DEBE_REORGANIZARSE>`
- `comportamiento_en_tablet`: `<COMO_DEBE_REORGANIZARSE>`
- `comportamiento_en_escritorio`: `<COMO_DEBE_VERSE>`
- `componentes_que_deben_cambiar`:
  - `<COMPONENTE_RESPONSIVE_1>`
  - `<COMPONENTE_RESPONSIVE_2>`
  - `<COMPONENTE_RESPONSIVE_3>`

## 9. Accesibilidad Mínima

- `contraste`: `<REQUISITO_DE_CONTRASTE>`
- `imagenes_con_alt`: `<SI | NO | SOLO_SI_APLICA>`
- `formularios_con_label`: `<SI | NO | NO_APLICA>`
- `foco_visible`: `<SI | NO | NO_APLICA>`
- `jerarquia_de_headings`: `<REQUISITO_DE_HEADINGS>`

## 10. Sistema CSS

- `usar_tokens_css`: `<SI | NO>`
- `tokens_minimos`:
  - `<TOKEN_1>`
  - `<TOKEN_2>`
  - `<TOKEN_3>`
  - `<TOKEN_4>`

- `componentes_con_variantes`:
  - `<COMPONENTE_VARIANTE_1>`
  - `<COMPONENTE_VARIANTE_2>`

- `interacciones_visuales`:
  - `<HOVER | TRANSITION | ANIMACION_SUAVE | NINGUNA>`

## 11. Método de Entrega

- `tipo_entrega`: `<GITHUB | ZIP | RAR | OTRO>`
- `repositorio_o_archivo`: `<URL_O_NOMBRE_DEL_ARCHIVO>`
- `estructura_de_entrega`: `<COMO_DEBE_QUEDAR_ORDENADO>`

## 12. Criterios de Aceptación

- `criterio_1`: `<QUE_DEBE_CUMPLIR_EL_HTML>`
- `criterio_2`: `<QUE_DEBE_CUMPLIR_EL_CSS>`
- `criterio_3`: `<QUE_DEBE_CUMPLIR_EL_RESPONSIVE>`
- `criterio_4`: `<QUE_DEBE_CUMPLIR_LA_ACCESIBILIDAD>`
- `criterio_5`: `<QUE_DEBE_CUMPLIR_LA_ENTREGA>`
- `criterio_6`: `<QUE_DEBE_CUMPLIR_EL_REALISMO_DEL_PRODUCTO>`

## 13. Prompt Base para Codex

```text
Quiero construir <TIPO_PAGINA> para <PUBLICO_OBJETIVO> sobre <TEMA_CENTRAL>.

Objetivo principal:
<OBJETIVO_PRINCIPAL>

Mensaje clave:
<MENSAJE_CLAVE>

La interfaz debe parecer <NIVEL_DE_REALISMO> con tono <TONO_DE_COPY>.

No quiero que el sitio visible mencione:
<PROHIBICION_DE_CONTENIDO_1>
<PROHIBICION_DE_CONTENIDO_2>
<PROHIBICION_DE_CONTENIDO_3>

Secciones obligatorias:
<SECCION_1>
<SECCION_2>
<SECCION_3>
<SECCION_4>
<SECCION_5>

Dirección visual:
<TONO_VISUAL>
<JERARQUIA_VISUAL>
<PALETA_BASE>

Evitar visualmente:
<PROHIBICION_VISUAL_1>
<PROHIBICION_VISUAL_2>
<PROHIBICION_VISUAL_3>
<PROHIBICION_VISUAL_4>

Restricciones técnicas:
<STACK_PERMITIDO>
<ARCHIVOS_ESPERADOS>
<RESTRICCIONES_ADICIONALES>

Responsive esperado:
<COMPORTAMIENTO_EN_CELULAR>
<COMPORTAMIENTO_EN_TABLET>
<COMPORTAMIENTO_EN_ESCRITORIO>

Accesibilidad mínima:
<CONTRASTE>
<IMAGENES_CON_ALT>
<FORMULARIOS_CON_LABEL>
<FOCO_VISIBLE>
<JERARQUIA_DE_HEADINGS>

Sistema CSS:
<USAR_TOKENS_CSS>
<TOKENS_MINIMOS>
<INTERACCIONES_VISUALES>

Método de entrega:
<TIPO_ENTREGA>

Quiero una primera versión funcional, clara, semántica, responsive, ordenada y con apariencia de producto o servicio real.
```

---
