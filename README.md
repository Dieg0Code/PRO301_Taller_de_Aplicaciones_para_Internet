# PRO301 · Taller de Aplicaciones para Internet

Repositorio de trabajo del módulo `PRO301`, orientado a planificación docente, desarrollo de clases y construcción de material de apoyo.

El enfoque actual del curso prioriza fundamentos web transferibles, frontend moderno, integración con APIs, uso de agentes de IA y una introducción aplicada a deep learning y LLMs.

## Estructura del repositorio

- `cronograma/README.md`: cronograma oficial del módulo.
- `clases/`: planificación por semanas y sesiones.
- `clases/semana-01/01/README.md`: desarrollo completo de la Clase 1.
- `clases/semana-01/01/ppt/`: presentación final, fuente editable y source técnico del deck.
- `docs/`: documentos institucionales de referencia.
- `.agent/skills/clase-design/`: skill local para mantener consistencia pedagógica al diseñar clases.

## Estado actual

- Cronograma del módulo actualizado para el contexto 2026.
- Clase 1 de la semana 1 desarrollada en README.
- PPT de la Clase 1 construida y versionada en el repositorio.

## Flujo de trabajo sugerido

1. Ajustar o validar el cronograma en `cronograma/README.md`.
2. Desarrollar cada clase en su `README.md` por bloques.
3. Convertir el contenido de la clase en una PPT dentro de la carpeta `ppt/` correspondiente.
4. Mantener limpia cada carpeta de presentaciones: deck final, fuente editable y `source/`.

## Edición de presentaciones

Cada clase puede tener una carpeta `ppt/source/` con el código fuente del deck.

Ejemplo para la Clase 1:

```powershell
cd clases/semana-01/01/ppt/source
npm install
node .\block-1-slides.js
```

Esto regenera:

- el `.pptx` final;
- el `.js` editable del deck;
- y mantiene el source técnico versionado.

## Referencias rápidas

- Cronograma: [cronograma/README.md](cronograma/README.md)
- Clase 1: [clases/semana-01/01/README.md](clases/semana-01/01/README.md)
- PPT Clase 1: [clases/semana-01/01/ppt/Clase-01-Bloque-1-La-Web-No-Es-Magia.pptx](clases/semana-01/01/ppt/Clase-01-Bloque-1-La-Web-No-Es-Magia.pptx)
