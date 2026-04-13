# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Propósito

Repositorio de materiales docentes para el módulo **PRO301 Taller de Aplicaciones para Internet** (IP AIEP, Chile). Contiene planificación, README de clases, presentaciones PPT y materiales de apoyo (infografías, podcasts).

## Comandos principales

### slides-system (`tools/slides-system/`)
```bash
npm run build         # Compila TypeScript → dist/
npm run typecheck     # Valida tipos sin emitir
npm run test          # Ejecuta tests con Vitest
npm run test:all      # Gate completo: typecheck + build + test + mojibake/cspell
```

### Regenerar un PPT desde su fuente
```bash
cd clases/semana-XX/YY/ppt/source
npm install
node ./block-1-slides.js   # o el script correspondiente al bloque
```

### Herramientas auxiliares
- `uv run ...` / `uv tool install ...` para scripts Python puntuales (preferir sobre instalaciones globales).
- `playwright-cli` para validación visual en navegador: screenshots, responsive, inspección HTML/CSS.
- **`.NET PPTX Validator`**: `dotnet run --project tools/pptx-validator -- "path/to/your.pptx"`. Herramienta crítica para detectar corrupciones de XML que disparan el modo reparación en PowerPoint.

## Arquitectura del repositorio

```
cronograma/README.md          ← fuente de verdad del módulo (marco general)
clases/semana-XX/YY/
  README.md                   ← desarrollo completo de la clase (fuente de verdad de la sesión)
  ppt/
    *.pptx                    ← deck final
    *.js                      ← fuente editable del deck
    source/                   ← scripts de construcción (PptxGenJS + slides-system)
  infografia/                 ← pieza final exportada
  podcast/                    ← audio final exportado
tools/slides-system/          ← librería compartida de tema, componentes y utilidades PPT
  src/                        ← TypeScript (adapters, components, theme, types, utils)
  dist/                       ← build generado (no editar manualmente)
docs/                         ← documentos institucionales y estratégicos
.agent/skills/                ← skills locales del repositorio
```

**Jerarquía de verdad:** `cronograma/README.md` > `clases/semana-XX/YY/README.md` > PPT. El PPT debe derivarse del README, no al revés.

## Flujo de trabajo para una clase

1. Revisar `cronograma/README.md`.
2. Redactar `clases/semana-XX/YY/README.md` completo (cabecera → objetivos → 4 bloques → cierre).
3. Revisión global del README antes de pasar al PPT: coherencia, progresión interna, español correcto, sin ideas inconclusas.
4. Si el deck usa `tools/slides-system/`, verificar que esté al día y ejecutar `npm run test:all` si se modificó la librería.
5. Regenerar el deck desde su fuente editable (`node ./block-X-slides.js`).
6. Validar: overflow, render visual, apertura correcta en PowerPoint, sin mojibake ni errores ortográficos.
7. Con clase estable, preparar prompts para NotebookLM (infografía + podcast) usando `docs/notebooklm-materiales-complementarios.md`.

**No cerrar un PPT si:** el build falla, la suite de slides-system falla, hay overflow/solapes, PowerPoint intenta reparar el archivo, o hay errores de español o encoding.

## Reglas de contenido

- **Idioma:** todo material visible para estudiantes en español correcto, con tildes y `ñ`. Sin texto de producción interna dentro del material del estudiante.
- **Tono:** docente, técnico, claro y sobrio. No infantilizar, no hipersimplificar, no volverlo abstracto sin anclaje práctico.
- **PPT:** mínimo 60 diapositivas para clases de 3 horas; identidad visual AIEP estricta; composición visual variada; sin relleno, expandir con ejemplos, mini casos, errores comunes y recapitulaciones.
- **IA y agentes:** integrar como metodología transversal (no como clase aislada). Estructura por defecto: (1) entender el concepto técnico, (2) mostrar cómo un agente puede apoyar, (3) explicitar qué requiere validación humana, (4) cerrar con criterio técnico.
- **Ejemplos:** preferir casos reales de trabajo técnico (formularios, portafolios, consumo de APIs, diagnóstico en navegador). Evitar ejemplos vacíos o abstractos.
- **Progresión semanal:** lunes = marco conceptual; martes = herramientas y primeras estructuras; miércoles = mayor densidad técnica (más código, comandos, inspección, debugging).

## Skills locales disponibles

- `clase-design`: estructurar y redactar clases.
- `cohort-comms`: mensajes docentes breves para WhatsApp u otros canales.
- `slides-aiep`: dirección visual institucional de PPT.
- `slides`: construir, renderizar y validar decks.

## Referencia estratégica

- `docs/paradigma_agentic_spec_driven_2026.pdf`: actualiza el marco conceptual del módulo respecto al paradigma agentic/spec-driven. No cambia el cronograma, pero debe influir en cómo se enmarca el trabajo moderno y cómo se integran IA, agentes y validación en el curso.

## Limpieza de entregables

En `clases/semana-XX/YY/ppt/` conservar solo: `.pptx` final, `.js` editable, `source/`. No dejar renders temporales, versiones `v2/v3` ni archivos auxiliares. El PPT final debe poder regenerarse desde su `.js` y `source/`.

No cambiar fechas, evaluaciones ni decisiones curriculares grandes sin consultar primero.
