# Feedback Evaluación Parcial 1 - Felipe

## Evaluación General
La entrega destaca por una propuesta visual muy trabajada, con identidad clara, animaciones bien logradas y una exploración técnica ambiciosa para el nivel de la evaluación. En la revisión real en navegador, el sitio sostuvo bien su experiencia tanto en desktop como en móvil, y la navegación por estados sin JavaScript muestra criterio técnico. Hay observaciones importantes en semántica y accesibilidad, pero el resultado final sí se sostiene en la banda alta de la cohorte.

## Fortalezas
- Propuesta visual fuerte, coherente y memorable.
- Animaciones e interacciones bien resueltas para una experiencia CSS-only.
- Sistema CSS sólido, con variables, media queries y lógica de estados clara.
- Entrega ordenada, con assets claros y README técnico que demuestra intención real.

## Aspectos a Mejorar
- En `index.html` hay IDs duplicados (`state-home`, `state-packs`, `state-pack-a`), lo que invalida HTML y vuelve más frágil la lógica de estados.
- Varias acciones principales siguen apuntando a `href="#"`, así que parte del sitio queda más como experiencia conceptual que como cierre funcional completo.
- El `h1` depende solo de una imagen y el `meta viewport` bloquea zoom (`user-scalable=no`), lo que baja accesibilidad.
- Faltan estilos de foco visibles y una estrategia para reducción de movimiento, especialmente considerando la cantidad de animaciones presentes.
- En móvil la solución funciona, pero algunos textos del menú superior quedan demasiado comprimidos.

## Desglose por Rúbrica
- HTML y semántica: `15/20`
- CSS y sistema visual: `19/20`
- Responsive y versión móvil: `17/20`
- Calidad visual general: `15/15`
- Accesibilidad básica: `6/10`
- Uso de Codex con criterio: `9/10`
- Orden y entrega: `5/5`

## Resultado Final
- Puntaje: `86/100`
- Nota: `6,0`

## Síntesis Docente
Es una entrega que arriesga, propone y logra una experiencia visual por sobre el promedio. El siguiente salto no está en hacerla "más llamativa", sino en volver esa misma propuesta más válida, accesible y técnicamente limpia en su base HTML. La dirección es buena; ahora toca hacerla más robusta.
