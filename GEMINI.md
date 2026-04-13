# instructional context for Gemini CLI

## Project Overview
This repository is dedicated to the development and management of educational materials for the **PRO301 · Taller de Aplicaciones para Internet** course at **AIEP (Chile)**. It is a hybrid project combining pedagogical content (Markdown) with a technical system for generating professional presentations (Node.js/TypeScript).

### Core Technologies
- **Content:** Markdown for class planning and READMEs.
- **Presentations:** `PptxGenJS` and a custom `slides-system` (Node.js/TypeScript) for automated PPTX generation.
- **Tooling:** `uv` for Python-based utilities, `playwright-cli` for visual browser-based validation.
- **Architecture:** A hierarchy of truth starting from the module schedule (`cronograma/`), through class READMEs, down to the final PPTX decks.

---

## Building and Running

### slides-system (`tools/slides-system/`)
This is the shared library for presentation components and theme.
- **Build:** `npm run build` (compiles TS to `dist/`).
- **Test:** `npm run test:all` (executes typecheck, build, unit tests, and spellcheck).
- **Watch Mode:** `npm run build:watch`.

### PPT Generation
Each class has its own generation scripts located in `clases/semana-XX/YY/ppt/source/`.
- **Command:** `node ./your-script.js` (executed from the `source/` directory).
- **Output:** Generates a `.pptx` and an editable `.js` file in the parent `ppt/` folder.

---

## Development Conventions

### Hierarchy of Truth
1. `cronograma/README.md`: The module's master plan.
2. `clases/semana-XX/YY/README.md`: The definitive source for a specific session.
3. **PPTX Decks:** Must be derived strictly from the session's README.

### Pedagogical Standards
- **Language:** All student-facing material **must be in correct Spanish** (using `ñ`, accents, and proper grammar). No internal "meta" comments in student materials.
- **Tone:** Professional, technical, clear, and didactic. Avoid "hype" or over-simplification.
- **Integration of AI/Agents:** AI is taught as a transversal methodology. Materials should explicitly mention: (1) Concept understanding, (2) Agent support, (3) Human validation, (4) Technical judgment.
### Double-Axis Progression
Technical and pedagogical depth must increase on two simultaneous axes:
1.  **Intra-week (Day by Day):**
    - **Monday:** Conceptual mapping, vocabulary, and initial intuition.
    - **Tuesday:** Tools, workflows, and basic operational structures.
    - **Wednesday:** Highest technical density (more code, terminal commands, inspection, and deep debugging).
2.  **Inter-week (Week by Week):**
    - Each subsequent week must be more advanced than the previous one.
    - A "Monday" in Week 4 should assume the technical maturity gained in Week 3 and be significantly denser than a "Monday" in Week 1.
    - As the semester progresses, rely less on analogies and more on real-world implementation, complex snippets, and expert diagnostic tools.

### Presentation (PPT) Rules
- **Length:** Minimum of **60 slides** per 3-hour class.
- **Design:** Must follow the strict **AIEP Visual Identity** provided by `slides-system`.
- **Validation:** Never close a task without validating the generated PPT for:
    - Text overflows or overlaps (using the built-in JS validator).
    - **Structural Integrity (.NET):** Must pass validation with the internal tool:
      `dotnet run --project tools/pptx-validator -- "path/to/your.pptx"`
    - PowerPoint file corruption (must open correctly without "Repair" dialog).
    - Spelling and encoding errors (mojibake).
- **Structure:** Keep the `ppt/` folder clean. Only `.pptx`, editable `.js`, and `source/` folder should remain.

### Environment Tools
- **`uv`:** Use `uv run ...` or `uv tool install ...` for any Python-related tasks.
- **`playwright-cli`:** Use for visual inspection of HTML/CSS examples and responsive checks.
- **Skills:** Use local skills like `clase-design` and `slides-aiep` to ensure consistency.
