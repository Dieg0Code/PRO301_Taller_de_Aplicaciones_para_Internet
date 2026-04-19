const fs = require("fs");
const path = require("path");
const PptxGenJS = require("../../../../../tools/slides-system/node_modules/pptxgenjs");
const slidesSystem = require("../../../../../tools/slides-system/dist/index.js");

const { theme, components, utils } = slidesSystem;
const { applyAiepTheme, TOKENS: C, TYPOGRAPHY } = theme;
const {
  addHeader: systemAddHeader,
  addCard,
  addMiniCard,
  addCenterStatement,
  addCodePanel,
  addDelegationSplit,
  addMarkBox,
  addChip,
  addChecklistGrid,
  addMythRealityGrid,
  addAgenticFlow,
  addPromptQualityCompare,
} = components;
const { validateSlide } = utils;

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";

applyAiepTheme(pptx, {
  author: "Diego Obando",
  company: "AIEP",
  subject: "Clase 18",
  title: "Construcción de APIs Profesionales e Interoperabilidad",
});

const SH = pptx.ShapeType;
const rootDir = path.resolve(__dirname, "..");
const outputPptx = path.join(rootDir, "Clase-18-API-Profesional.pptx");
const outputJs = __filename;

const logoPath = path.resolve(__dirname, "../../../../../.agent/skills/slides-aiep/assets/logo-aiep.png");
const logoMarkPath = path.resolve(__dirname, "../../../../../.agent/skills/slides-aiep/assets/logo-aiep-mark.png");

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function addHeader(slide, title, subtitle, blockLabel = "Bloque 1", pptxLike = pptx) {
  systemAddHeader(slide, SH, pptxLike, title, subtitle, blockLabel, {
    classLabel: `Clase 18 · ${blockLabel}`,
    logoMarkPath,
    titleY: 0.94,
    titleH: 0.66,
    subtitleY: 1.68,
    subtitleH: 0.22,
    subtitleW: 9.05,
    subtitleFontSize: 10.6,
  });
}

function addBarsMotif(slide, x, y, scale = 1, fill = C.red) {
  slide.addShape(SH.rect, { x, y: y + 0.18 * scale, w: 0.2 * scale, h: 0.46 * scale, fill: { color: fill }, line: { color: fill } });
  slide.addShape(SH.rect, { x: x + 0.24 * scale, y, w: 0.24 * scale, h: 0.64 * scale, fill: { color: fill }, line: { color: fill } });
  slide.addShape(SH.rect, { x: x + 0.52 * scale, y: y + 0.18 * scale, w: 0.2 * scale, h: 0.46 * scale, fill: { color: fill }, line: { color: fill } });
}

// ─── INTRODUCCIÓN ────────────────────────────────────────────────────────────

function createCoverSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  slide.addImage({ path: logoPath, x: 0.88, y: 0.62, w: 1.2, h: 0.42 });
  addBarsMotif(slide, 0.88, 1.84, 1.4, C.red);
  slide.addText("Construcción de APIs\nProfesionales e Interoperabilidad", {
    x: 0.88, y: 2.82, w: 10.26, h: 1.44, fontFace: TYPOGRAPHY.display, fontSize: 44, bold: true, color: C.white, margin: 0, valign: "top",
  });
  slide.addText("Semana 06 · Clase 18: El puente moderno con Python 3.12 y FastAPI.", {
    x: 0.88, y: 4.42, w: 10.26, h: 0.34, fontFace: TYPOGRAPHY.body, fontSize: 18, color: C.gold, bold: true,
  });
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 5.82, w: 0.82, h: 0.82 });
  validateSlide(slide, pptx);
}

function createWeeklyPathSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Ruta de la Semana", "De la arqueología a la integración", "Contexto");
  addAgenticFlow(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    steps: [
      { title: "LUNES", body: "Arqueología Técnica: Entendiendo el caos funcional del legado.", accent: C.red },
      { title: "MARTES", body: "Arquitectura MVC: Ordenando las capas lógicas del sistema.", accent: C.navy },
      { title: "HOY", body: "Interoperabilidad: Exponiendo servicios modernos con FastAPI.", accent: C.gold },
    ]
  });
  validateSlide(slide, pptx);
}

function createIndustryVisionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "¿Por qué FastAPI en 2026?", "Más allá de la moda: Estándar de Industria", "Visión");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Ventajas Competitivas", columns: 3,
    entries: [
      { badge: "PERF", title: "Alto Rendimiento", body: "Basado en Starlette y Pydantic. Uno de los más rápidos en Python.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "SAFE", title: "Tipado Estricto", body: "Usa Python 3.12 para eliminar errores de tipo en la frontera.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "DOCS", title: "Auto-OpenAPI", body: "La documentación es un contrato vivo generado por el código.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ]
  });
  validateSlide(slide, pptx);
}

function createIntegrityReviewSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Axioma de Integridad Técnica", "Envolviendo el pasado, protegiendo el futuro", "Ingeniería");
  addCenterStatement(slide, SH, "No borramos el legado; lo dignificamos envolviéndolo en una capa de seguridad y modernidad que permite la interoperabilidad.", {
    x: 0.88, y: 2.22, w: 10.26, h: 2.5, fill: C.navy, color: C.white, fontSize: 24, bold: true, rectRadius: 0.08
  });
  validateSlide(slide, pptx);
}

function createObjectivesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Objetivos de la Sesión", "Nuestra misión técnica hoy", "Objetivos");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Lo que lograremos", columns: 2,
    entries: [
      { badge: "PYDN", title: "Contratos de Datos", body: "Dominar Pydantic y el tipado de Python 3.12 para validación.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "REST", title: "CRUD Semántico", body: "Implementar ruteo profesional con Status Codes correctos.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "CYBR", title: "Blindaje de APIs", body: "Aplicar criterios de ciberseguridad en la entrada y salida.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "SWGR", title: "Documentación", body: "Consumir y validar contratos mediante OpenAPI (Swagger).", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createLearningMapSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Mapa de Aprendizaje: Hoy", "4 Bloques de Alta Densidad", "Mapa");
  const blocks = [
    { title: "Bloque 1", body: "Contrato y Pydantic.", active: true },
    { title: "Bloque 2", body: "CRUD y Status Codes.", active: false },
    { title: "Bloque 3", body: "Eje Cyber y Blindaje.", active: false },
    { title: "Bloque 4", body: "Integración y Swagger.", active: false },
  ];
  blocks.forEach((b, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 2.6, y: 3.6, w: 2.4, h: 2.8, title: b.title, body: b.body, accent: b.active ? C.red : C.navy,
      fill: b.active ? C.paleRed : C.white, line: C.border, titleFontSize: 12, bodyFontSize: 9.5
    });
  });
  validateSlide(slide, pptx);
}

function createMondayAlertSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Hacia la Evaluación Parcial 2", "Lunes 27 de Abril", "Importante");
  
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 3.5, 
    title: "ADVERTENCIA DE INGENIERÍA",
    body: "Todo lo construido hoy es la pieza final del examen. El lunes no evaluamos código suelto, evaluamos la arquitectura de integración completa:\n\nLEGADO  ──▶  MVC (Repository)  ──▶  API (FastAPI)",
    accent: C.gold, fill: C.white, line: C.gold
  });

  slide.addText("Foco de Evaluación: Flujo de datos seguro e interoperabilidad real.", {
    x: 1.2, y: 6.0, w: 9.5, h: 0.4, fontFace: TYPOGRAPHY.body, fontSize: 14, color: C.navy, italic: true
  });
  
  validateSlide(slide, pptx);
}

// ─── BLOQUE 1: FUNDAMENTOS DE FASTAPI Y CONTRATOS ───────────────────────────

function createBlock1IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 1", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("El Contrato de Datos", {
    x: 0.88, y: 2.14, w: 9.2, h: 0.66, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("Fundamentos de FastAPI 3.12 y Validación con Pydantic.", {
    x: 0.88, y: 2.9, w: 8.2, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  validateSlide(slide, pptx);
}

function createLegacyVsModernContractSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Cambio de Paradigma", "Del 'Ojalá' al 'Contrato'", "Bloque 1");
  addMythRealityGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "¿Cómo manejamos la entrada?",
    entries: [
      { badge: "LEGACY", myth: "El servidor acepta cualquier $_POST y reza para que esté bien.", reality: "Bugs en producción y validaciones manuales infinitas.", accent: C.red, badgeFill: C.paleRed },
      { badge: "API", myth: "El servidor define un Contrato (Schema) antes de ejecutar nada.", reality: "Rechazo automático (422) si el dato no cumple el estándar.", accent: C.navy, badgeFill: C.softBlue },
      { badge: "COST", myth: "Validar dentro de la lógica de negocio.", reality: "Validar en la frontera del sistema (FastAPI Layer).", accent: C.navy, badgeFill: C.softBlue },
    ]
  });
  validateSlide(slide, pptx);
}

function createBouncerAnalogySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Pydantic: El Guardia de Seguridad", "Analogía de Proceso", "Bloque 1");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Seguridad en la Frontera",
    left: { title: "Legacy", subtitle: "Validación Interna", items: ["Entras al club.", "Llegas a la barra.", "El barman te pide ID.", "Ya gastaste recursos."], accent: C.red, fill: C.paleRed },
    right: { title: "FastAPI", subtitle: "Validación Externa", items: ["Pydantic pide ID en la puerta.", "Si es falso, no entras.", "El servidor no gasta CPU.", "Tu lógica está a salvo."], accent: C.navy, fill: C.softBlue },
    bridgeLabel: "vs", bridgeBody: "Eficiencia",
  });
  validateSlide(slide, pptx);
}

function createPythonTypingSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Python 3.12: Tipado Estricto", "Nuestra primera defensa técnica", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Sintaxis Moderna y Segura",
    code: `# Usando el operador | para uniones (Python 3.10+)
def get_user(id: int, role: str | None = None):
    # FastAPI garantiza que id es un número
    return {"id": id, "role": role}

# Tipado de colecciones nativo (Python 3.9+)
users: list[str] = ["diego", "ana", "luis"]`,
    lang: "python", fontSize: 18
  });
  validateSlide(slide, pptx);
}

function createBaseModelAnatomySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Anatomía de un Schema", "Definiendo el contrato del recurso", "Bloque 1");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "BaseModel y Field",
    code: `from pydantic import BaseModel, Field, EmailStr

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    email: EmailStr
    age: int | None = Field(default=None, ge=18)
    
# El triple punto (...) significa OBLIGATORIO`,
    lang: "python", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createCyberTypeConfusionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Eje Cyber: Type Confusion", "Bloque 1 · Defensa por Diseño", "Cyber");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 2.0, title: "Blindaje de Parámetros de Ruta",
    body: "Si declaramos un ID como 'int', FastAPI rechaza inyecciones de strings (como ' OR 1=1 --) en la capa de red. El atacante no llega a tocar la base de datos.",
    accent: C.red, fill: C.white, line: C.red
  });
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 4.42, w: 10.26, h: 2.34, title: "Cadena de Custodia", columns: 3,
    entries: [
      { badge: "1", title: "Recibe", body: "Petición HTTP.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "2", title: "Tipea", body: "Valida vs Schema.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "3", title: "Ejecuta", body: "Lógica de Negocio.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ]
  });
  validateSlide(slide, pptx);
}

function createError422Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Error 422: Unprocessable Entity", "Anatomía de un rechazo exitoso", "Bloque 1");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Respuesta automática de FastAPI",
    code: `{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}`,
    lang: "json", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createIaPromptSchemaSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Huella IA: Generación de Contratos", "Bloque 1 · Metodología Agentic", "IA");
  addPromptQualityCompare(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.46,
    title: "Mapeando el Legado",
    badTitle: "Prompt Débil",
    badSubtitle: "Sin contexto técnico",
    badPrompt: "'Hazme un esquema para una tabla de usuarios'.",
    badNotes: ["Esquema genérico.", "Tipos de datos adivinados.", "Sin validaciones reales."],
    goodTitle: "Prompt de Ingeniería",
    goodSubtitle: "Basado en Especificación",
    goodPrompt: "'Analiza esta tabla SQL legacy (adjunta). Genera un esquema de Pydantic v2.7 usando tipado de Python 3.12 y validando rangos para los IDs'.",
    goodNotes: ["Extrae reglas reales.", "Garantiza integridad.", "Ahorra tiempo de mapeo."],
    footer: "La IA propone el mapeo; tú validas la regla de negocio."
  });
  validateSlide(slide, pptx);
}

function createBlock1SynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 1", "El Mapa del Contrato", "Bloque 1");
  addCenterStatement(slide, SH, "El contrato de datos es la frontera infranqueable que protege nuestra lógica del caos exterior.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });
  const points = [
    { title: "Tipado 3.12", body: "Defensa cyber nativa en el lenguaje.", accent: C.navy },
    { title: "Pydantic", body: "El guardia que valida los esquemas en la puerta.", accent: C.red },
    { title: "Error 422", body: "Comunicación clara de que el contrato falló.", accent: C.gold },
  ];
  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06, title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });
  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.62, title: "Próximo Bloque → CRUD y Status Codes",
    body: "Ya validamos los datos. Ahora aprendamos a ruteatlos con semántica profesional.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.gold, titleFontSize: 11, bodyFontSize: 10.4
  });
  validateSlide(slide, pptx);
}

// ─── BLOQUE 2: OPERACIONES CRUD Y STATUS CODES ──────────────────────────────

function createBlock2IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 2", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.gold, color: C.navy, fontSize: 10.6, bold: true });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.gold);
  slide.addText("Semántica REST", {
    x: 0.88, y: 2.14, w: 9.2, h: 0.66, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("Verbos HTTP y Códigos de Estado Profesionales.", {
    x: 0.88, y: 2.9, w: 8.2, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  validateSlide(slide, pptx);
}

function createHttpVerbsMappingSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Los Verbos son Intenciones", "Mapeo de Acciones REST", "Bloque 2");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Verbos HTTP vs. Acciones", columns: 2,
    entries: [
      { badge: "GET", title: "Lectura (Read)", body: "Obtener datos. Sin efectos secundarios. Seguro e Idempotente.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "POST", title: "Creación (Create)", body: "Generar un nuevo recurso. No es idempotente.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "PUT", title: "Reemplazo (Update)", body: "Actualización total de un recurso. Idempotente.", accent: C.gold, fill: C.white, badgeFill: C.gold },
      { badge: "DELETE", title: "Baja (Delete)", body: "Eliminación o desactivación lógica. Idempotente.", accent: C.border, fill: C.white, badgeFill: C.border },
    ]
  });
  validateSlide(slide, pptx);
}

function createUrlResourceVsFileSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "De Archivos a Recursos", "Bloque 2 · Evolución de la URL", "Bloque 2");
  addMythRealityGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "¿Cómo nombramos las rutas?",
    entries: [
      { badge: "LEGACY", myth: "/usuarios/editar_usuario.php?id=5 (Verbo en la URL)", reality: "Caos de nombres y dependencia del disco físico.", accent: C.red, badgeFill: C.paleRed },
      { badge: "MODERNO", myth: "PUT /users/5 (Sustantivo + Verbo HTTP)", reality: "Semántica pura, desacoplada de la estructura de archivos.", accent: C.navy, badgeFill: C.softBlue },
      { badge: "REGLA", myth: "La URL es el 'Qué' (Recurso).", reality: "El Verbo HTTP es el 'Cómo' (Acción).", accent: C.navy, badgeFill: C.softBlue },
    ]
  });
  validateSlide(slide, pptx);
}

function createStatusCodesGridSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Status Codes: El Semáforo", "Bloque 2 · El Idioma Universal de la Web", "Bloque 2");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Clasificación Profesional", columns: 3,
    entries: [
      { badge: "2xx", title: "ÉXITO", body: "200 (OK)\n201 (Created)\n204 (No Content)", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "4xx", title: "ERROR CLIENTE", body: "400 (Bad Request)\n404 (Not Found)\n422 (Val. Error)", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "5xx", title: "ERROR SERVER", body: "500 (Internal Error)\n503 (Service Unav.)", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ]
  });
  validateSlide(slide, pptx);
}

function createStatusCodePostCodeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Implementación: 201 Created", "Bloque 2 · Éxito en Creación", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Decorador status_code",
    code: `from fastapi import status

@app.post("/users", status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate):
    # La API responde automáticamente con 201
    return {"message": "Usuario creado", "id": 105}`,
    lang: "python", fontSize: 18
  });
  validateSlide(slide, pptx);
}

function createStatusCodeDeleteCodeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Implementación: 204 No Content", "Bloque 2 · Éxito en Eliminación", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Respuesta sin cuerpo",
    code: `@app.delete("/users/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(id: int):
    # Procesamos la eliminación en la DB legacy...
    # No devolvemos nada, solo el código 204
    return None`,
    lang: "python", fontSize: 18
  });
  validateSlide(slide, pptx);
}

function createHttpExceptionCodeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Interrupción: HTTPException", "Bloque 2 · Manejo de Errores Controlados", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Cortando el flujo de forma limpia",
    code: `from fastapi import HTTPException

@app.get("/users/{id}")
def get_user(id: int):
    user = repo.find(id)
    if not user:
        raise HTTPException(
            status_code=404, 
            detail=f"Usuario con ID {id} no existe en el sistema"
        )
    return user`,
    lang: "python", fontSize: 18
  });
  validateSlide(slide, pptx);
}

function createAlways200SinSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Pecado del 'Always 200'", "Bloque 2 · Mala Práctica de Interoperabilidad", "Cyber");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 2.5, title: "¿Por qué evitar el error dentro del éxito?",
    body: "Muchos sistemas legacy devuelven '200 OK' y un JSON con { 'error': true }. Esto obliga al desarrollador de frontend a leer el cuerpo de cada petición para saber si falló. Es ineficiente y rompe el estándar HTTP.",
    accent: C.red, fill: C.white, line: C.red
  });
  addCenterStatement(slide, SH, "Usa los Status Codes para que el navegador y el frontend sepan qué pasó sin abrir el paquete.", {
    x: 0.88, y: 5.2, w: 10.26, h: 1.0, fill: C.navy, color: C.white, fontSize: 18
  });
  validateSlide(slide, pptx);
}

function createBusinessCaseStatus1Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Casos de Negocio vs. Codes", "Bloque 2 · Escenarios Reales", "Práctica");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "¿Qué código devuelvo?",
    left: { title: "Error 400", subtitle: "Bad Request", items: ["Stock insuficiente.", "Saldo menor al cobro.", "El usuario ya existe."], accent: C.red, fill: C.paleRed },
    right: { title: "Error 404", subtitle: "Not Found", items: ["ID no existe.", "Ruta mal escrita.", "Recurso eliminado."], accent: C.navy, fill: C.softBlue },
    bridgeLabel: "vs", bridgeBody: "Lógica",
  });
  validateSlide(slide, pptx);
}

function createBusinessCaseStatus2Slide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Casos de Negocio vs. Codes II", "Bloque 2 · Escenarios Reales", "Práctica");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "¿Qué código devuelvo?",
    left: { title: "Error 422", subtitle: "Unprocessable", items: ["Email inválido.", "Username muy corto.", "Faltan campos obligatorios."], accent: C.red, fill: C.paleRed },
    right: { title: "Error 500", subtitle: "Server Error", items: ["Base de Datos caída.", "Bug en el código.", "Falta de conexión al legado."], accent: C.gold, fill: C.warm },
    bridgeLabel: "vs", bridgeBody: "Origen",
  });
  validateSlide(slide, pptx);
}

function createIaEndpointDesignerSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Huella IA: Diseñador de Endpoints", "Bloque 2 · Metodología Agentic", "IA");
  addPromptQualityCompare(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.46,
    title: "Diseñando la Suite CRUD",
    badTitle: "Prompt Genérico",
    badSubtitle: "Sin semántica",
    badPrompt: "'Crea las rutas para mi API de usuarios'.",
    badNotes: ["Usa POST para todo.", "Devuelve 200 en errores.", "Rutas poco claras."],
    goodTitle: "Prompt de Arquitectura",
    goodSubtitle: "REST Semántico",
    goodPrompt: "'Genera los endpoints CRUD en FastAPI para este recurso. Usa Status Codes 201 y 204 cuando corresponda y maneja excepciones de negocio con 400'.",
    goodNotes: ["Código profesional.", "Fácil de integrar.", "Documentación lista."],
    footer: "La IA construye la estructura; tú validas la semántica HTTP."
  });
  validateSlide(slide, pptx);
}

function createBlock2SynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 2", "El Mapa del Ruteo", "Bloque 2");
  
  addCenterStatement(slide, SH, "La semántica HTTP es el lenguaje universal que permite que nuestra API sea entendida por cualquier sistema del mundo.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.navy, color: C.white, fontSize: 18, rectRadius: 0.07
  });

  const points = [
    { title: "Verbos", body: "Son la intención: GET leer, POST crear, PUT editar.", accent: C.navy },
    { title: "Status Codes", body: "El semáforo universal de la API (2xx, 4xx).", accent: C.red },
    { title: "Excepciones", body: "HTTPException para interrumpir flujos de forma controlada.", accent: C.gold },
  ];
  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06, title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });
  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.62, title: "Próximo Bloque → Eje Cyber y Blindaje",
    body: "Ya ruteamos. Ahora vamos a blindar los esquemas contra ataques reales.",
    fill: C.softNeutral, line: C.softNeutral, accent: C.red, titleFontSize: 11, bodyFontSize: 10.4
  });
  validateSlide(slide, pptx);
}

// ─── BLOQUE 3: EJE CYBER Y BLINDAJE DE ESQUEMAS ──────────────────────────────

function createBlock3IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 3", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.red, color: C.white, fontSize: 10.6 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.red);
  slide.addText("Security by Design", {
    x: 0.88, y: 2.14, w: 9.2, h: 0.66, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("Blindaje de Payloads y Protección de Datos Sensibles.", {
    x: 0.88, y: 2.9, w: 8.2, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  validateSlide(slide, pptx);
}

function createHackerMindsetSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Hacker Mindset en APIs", "Bloque 3 · Pensando como el atacante", "Cyber");
  addCenterStatement(slide, SH, "Si no restringes el tamaño y el formato de tus campos, le estás dando al atacante las herramientas para tirar tu servidor.", {
    x: 0.88, y: 2.22, w: 10.26, h: 2.5, fill: C.red, color: C.white, fontSize: 24, bold: true, rectRadius: 0.08
  });
  validateSlide(slide, pptx);
}

function createAttackSurfaceSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Frontera es el Objetivo", "Bloque 3 · Superficie de Ataque", "Cyber");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Puntos de Entrada Críticos", columns: 3,
    entries: [
      { badge: "URL", title: "Path Params", body: "IDs inyectados para acceder a otros recursos (IDOR).", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "JSON", title: "Request Body", body: "Payloads radiactivos para saturar memoria o inyectar lógica.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "HEAD", title: "Headers", body: "Tokens malformados o Content-Types inesperados.", accent: C.red, fill: C.white, badgeFill: C.red },
    ]
  });
  validateSlide(slide, pptx);
}

function createDosAttackScenarioSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Ataque 1: Payload Radiactivo", "Bloque 3 · Escenario de DoS", "Cyber");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Intento de Denegación de Servicio",
    code: `/* Petición Atacante */
POST /api/v1/users
{
  "username": "A" * 10000000, // 1MB de caracteres
  "bio": "Infinite loop simulation string...",
  "age": 9999999999999999
}

/* Resultado sin blindaje: Memory Leak o Crash */`,
    lang: "json", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createDosDefenseCodeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Defensa 1: Restricción de Field", "Bloque 3 · Previniendo el DoS", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Blindaje con Pydantic",
    code: `from pydantic import BaseModel, Field

class UserCreate(BaseModel):
    # Cortamos el payload en la puerta de entrada
    username: str = Field(..., min_length=3, max_length=20)
    bio: str | None = Field(None, max_length=500)
    age: int = Field(..., ge=0, le=120) # ge: >=, le: <=`,
    lang: "python", fontSize: 18
  });
  validateSlide(slide, pptx);
}

function createDosMemorySaveSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Ingeniería de Pydantic", "Bloque 3 · Ahorro de Recursos", "Ingeniería");
  addMythRealityGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "¿Cómo Pydantic salva tu RAM?",
    entries: [
      { badge: "LEGACY", myth: "Recibir el dato, parsearlo y luego validar con 'strlen()'.", reality: "Ya cargaste 10MB basura en la memoria RAM del servidor.", accent: C.red, badgeFill: C.paleRed },
      { badge: "API", myth: "FastAPI/Pydantic valida mientras el Stream llega.", reality: "Cierra la conexión HTTP si el buffer excede el max_length definido.", accent: C.navy, badgeFill: C.softBlue },
      { badge: "SEC", myth: "Validación por conveniencia.", reality: "Validación por supervivencia del servicio.", accent: C.navy, badgeFill: C.softBlue },
    ]
  });
  validateSlide(slide, pptx);
}

function createDosAdvancedFieldSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Field: Más allá de lo básico", "Bloque 3 · Control Numérico y de Texto", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Parámetros de Seguridad en Field",
    code: `# Para números
price: float = Field(..., gt=0, lt=10000) # greater/less than

# Para strings con Regex
sku: str = Field(..., pattern="^[A-Z]{3}-[0-9]{4}$")

# Para listas
tags: list[str] = Field(..., min_items=1, max_items=5)`,
    lang: "python", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createLegacyInjectionAttackSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Ataque 2: Inyección al Legado", "Bloque 3 · El Puente Débil", "Cyber");
  addAgenticFlow(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    steps: [
      { title: "INYECCIÓN", body: "El atacante envía 'diego' OR 1=1 -- en el JSON de la API.", accent: C.red },
      { title: "TRANSPORTE", body: "La API no valida y le pasa el string al Repositorio legacy.", accent: C.navy },
      { title: "EXPLOTACIÓN", body: "El PHP viejo ejecuta el SQL malicioso. DB comprometida.", accent: C.gold },
    ]
  });
  validateSlide(slide, pptx);
}

function createRegexShieldCodeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Defensa 2: Regex como Escudo", "Bloque 3 · Pattern Enforcement", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Bloqueando caracteres especiales",
    code: `class LegacyBridge(BaseModel):
    # Solo permitimos letras y números.
    # El Regex bloquea comillas, guiones y puntos coma.
    legacy_id: str = Field(..., pattern="^[a-zA-Z0-9]+$")

# Si entra un solo ' o --, Pydantic lanza 422
# y el dato NUNCA llega al PHP legacy.`,
    lang: "python", fontSize: 18
  });
  validateSlide(slide, pptx);
}

function createRegexBreakdownSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Anatomía del Escudo Regex", "Bloque 3 · Entendiendo el Pattern", "Ingeniería");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "^[a-zA-Z0-9]+$", columns: 2,
    entries: [
      { badge: "^ $", title: "Anclas", body: "Obligan a que todo el string cumpla la regla, no solo una parte.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "[ ]", title: "Rango", body: "Define el conjunto permitido (letras y números).", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "+", title: "Cuantificador", body: "Al menos un carácter, hasta el infinito (restringido por max_length).", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "CYBER", title: "Bloqueo", body: "Impide caracteres de escape como ', \", ;, --, /*.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
    ]
  });
  validateSlide(slide, pptx);
}

function createCustomValidatorIntroSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Defensa 3: Validadores de Lógica", "Bloque 3 · @field_validator", "Código");
  addCenterStatement(slide, SH, "Cuando las reglas de tipo (int, str) no bastan, debemos programar nuestra propia lógica de seguridad.", {
    x: 0.88, y: 2.22, w: 10.26, h: 2.5, fill: C.navy, color: C.white, fontSize: 24, bold: true, rectRadius: 0.08
  });
  validateSlide(slide, pptx);
}

function createKeywordFilterCodeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Filtro de Palabras Clave", "Bloque 3 · Protección Activa", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Prohibiendo SQL en el Esquema",
    code: `from pydantic import field_validator

class User(BaseModel):
    username: str

    @field_validator("username")
    @classmethod
    def no_sql_keywords(cls, v: str) -> str:
        forbidden = ["SELECT", "DROP", "DELETE", "UPDATE", "--"]
        if any(k in v.upper() for k in forbidden):
            raise ValueError("Intento de inyección detectado")
        return v`,
    lang: "python", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createDataExposureTrapSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Ataque 3: Exposición (API3)", "Bloque 3 · El Error del Desarrollador Flojo", "Cyber");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Vulnerabilidad: Return Model Directo",
    code: `@app.get("/users/{id}")
def get_user(id: int):
    user = db.query(User).find(id)
    # PELIGRO: 'user' tiene el password_hash de la DB
    return user 

/* Respuesta JSON recibida por el Atacante: */
{
  "username": "admin",
  "password_hash": "$2b$12$K8...", // FILTRACIÓN
  "internal_role": "super-admin"
}`,
    lang: "json", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createDataExposureDefenseSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Defensa 3: Esquemas de Salida", "Bloque 3 · El Principio de Mínimo Privilegio", "Arquitectura");
  addCenterStatement(slide, SH, "Jamás devuelvas el modelo de la base de datos al cliente. Define un 'Contrato de Salida' estricto.", {
    x: 0.88, y: 2.22, w: 10.26, h: 2.5, fill: C.gold, color: C.navy, fontSize: 24, bold: true, rectRadius: 0.08
  });
  validateSlide(slide, pptx);
}

function createInputVsOutputSplitSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Input vs. Output Schemas", "Bloque 3 · Desacoplamiento de Seguridad", "Arquitectura");
  addDelegationSplit(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Separación de Responsabilidades",
    left: { title: "UserCreate", subtitle: "Lo que recibo", items: ["username", "email", "password (plain)"], accent: C.navy, fill: C.softBlue },
    right: { title: "UserRead", subtitle: "Lo que devuelvo", items: ["id", "username", "email"], accent: C.gold, fill: C.white },
    bridgeLabel: "->", bridgeBody: "Filtrado",
  });
  validateSlide(slide, pptx);
}

function createResponseModelCodeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Response Model en Acción", "Bloque 3 · Protección Automatizada", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Forzando el contrato de salida",
    code: `class UserRead(BaseModel):
    id: int
    username: str

@app.get("/users/{id}", response_model=UserRead)
def get_user(id: int):
    user_db = repo.find(id)
    # FastAPI filtra user_db y SOLO envía 
    # los campos definidos en UserRead.
    return user_db`,
    lang: "python", fontSize: 18
  });
  validateSlide(slide, pptx);
}

function createTypeConfusionAttackSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Ataque 4: Type Confusion", "Bloque 3 · Rompiendo la lógica interna", "Cyber");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Enviando objetos donde van números",
    code: `/* Petición Atacante */
GET /api/v1/users/ { "id": 1 } -- Intentando enviar un objeto en el Path

/* En PHP legacy: El casting manual podría fallar y 
revelar el Stack Trace del servidor. */

/* En Python 3.12: El tipado estricto es un muro. */`,
    lang: "json", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createTypingAsArmorSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Tipado Python 3.12 como Armadura", "Bloque 3 · Seguridad de Red", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Validación de tipos nativa",
    code: `@app.get("/users/{user_id}")
def get_user(user_id: int):
    # Si user_id no es un entero puro, 
    # FastAPI rechaza la petición en el Middleware.
    # Tu código nunca llega a ejecutarse.
    return {"id": user_id}`,
    lang: "python", fontSize: 20
  });
  validateSlide(slide, pptx);
}

function createError422AnatomySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Anatomía del Error 422", "Bloque 3 · La respuesta de la Armadura", "Cyber");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Detalle técnico para el Atacante (o Developer)",
    code: `{
  "detail": [
    {
      "loc": ["path", "user_id"],
      "msg": "value is not a valid integer",
      "type": "type_error.integer"
    }
  ]
}`,
    lang: "json", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createLogicValidationCodeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Validación de Lógica de Negocio", "Bloque 3 · Protección de Datos Coherentes", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Validando integridad entre campos",
    code: `from pydantic import model_validator

class Register(BaseModel):
    password: str
    confirm: str

    @model_validator(mode="after")
    def passwords_match(self):
        if self.password != self.confirm:
            raise ValueError("Las claves no coinciden")
        return self`,
    lang: "python", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createMultiFieldValidationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Validación Multicampo", "Bloque 3 · El Poder de model_validator", "Ingeniería");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "¿Cuándo usar validación de modelo?", columns: 2,
    entries: [
      { badge: "1", title: "Comparación", body: "Verificar que la fecha de fin sea posterior a la de inicio.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "2", title: "Consistencia", body: "Si el país es 'CL', el RUT debe ser obligatorio.", accent: C.navy, fill: C.white, badgeFill: C.navy },
      { badge: "3", title: "Seguridad", body: "Bloquear combinaciones de datos sospechosas.", accent: C.red, fill: C.white, badgeFill: C.red },
      { badge: "4", title: "Contexto", body: "Validar el objeto completo antes de enviarlo al Repositorio.", accent: C.gold, fill: C.white, badgeFill: C.gold },
    ]
  });
  validateSlide(slide, pptx);
}

function createIaPentesterPromptSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Huella IA: Pentester de Contratos", "Bloque 3 · Metodología Agentic", "IA");
  addPromptQualityCompare(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.46,
    title: "Auditoría de Esquemas",
    badTitle: "Prompt Débil",
    badSubtitle: "Superficial",
    badPrompt: "'¿Mi esquema de Pydantic es seguro?'.",
    badNotes: ["IA dirá que 'parece bien'.", "No detecta fallas lógicas.", "No sugiere restricciones."],
    goodTitle: "Prompt de Seguridad",
    goodSubtitle: "Análisis de Riesgo",
    goodPrompt: "'Actúa como un analista de ciberseguridad. Encuentra vectores de ataque en este esquema de Pydantic y genera las restricciones de Field (max_length, pattern) necesarias para mitigarlos'.",
    goodNotes: ["Mapea ataques DoS.", "Previene inyecciones.", "Blindaje profesional."],
    footer: "La IA audita con 'malicia' para que tú repares con maestría."
  });
  validateSlide(slide, pptx);
}

function createRedTeamSimulationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Simulacro Red Team", "Bloque 3 · El Ataque Real", "Cyber");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Payload Atacante Detonado",
    code: `POST /api/v1/products
{
  "sku": "ABC-123'; DROP TABLE users; --",
  "price": -100.50,
  "description": "Exploit sequence..."
}`,
    lang: "json", fontSize: 20
  });
  validateSlide(slide, pptx);
}

function createBlueTeamResultSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Resultado Blue Team", "Bloque 3 · La API Inexpugnable", "Cyber");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 2.5, title: "ESTADO: BLOQUEADO",
    body: "La petición fue rechazada en 0.002s por el motor de Pydantic. El código malicioso nunca llegó al controlador. La base de datos sigue intacta y el servidor no sufrió picos de CPU.",
    accent: C.navy, fill: C.softBlue, line: C.navy
  });
  addCenterStatement(slide, SH, "HTTP 422: El contrato de datos es tu mejor Firewall.", {
    x: 0.88, y: 5.2, w: 10.26, h: 1.0, fill: C.gold, color: C.navy, fontSize: 18, bold: true
  });
  validateSlide(slide, pptx);
}

function createBlock3SynthesisSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Síntesis del Bloque 3", "Seguridad por Diseño", "Bloque 3");
  
  addCenterStatement(slide, SH, "No validamos para que el usuario no se equivoque; validamos para que el atacante no nos destruya.", {
    x: 0.88, y: 2.22, w: 10.26, h: 1.14, fill: C.red, color: C.white, fontSize: 18, rectRadius: 0.07
  });

  const points = [
    { title: "Input Shield", body: "Restringir tamaño y formato con Field.", accent: C.navy },
    { title: "Output Filter", body: "Nunca devolver el modelo de DB directamente.", accent: C.red },
    { title: "IA Audit", body: "Usar agentes para encontrar huecos en los contratos.", accent: C.gold },
  ];
  points.forEach((p, i) => {
    addMiniCard(slide, SH, {
      x: 0.88 + i * 3.44, y: 3.62, w: 3.2, h: 2.06, title: p.title, body: p.body, accent: p.accent,
      fill: C.white, line: C.border, titleFontSize: 13, bodyFontSize: 10.5
    });
  });
  addMiniCard(slide, SH, {
    x: 0.88, y: 5.92, w: 10.26, h: 0.62, title: "Próximo Bloque → Interoperabilidad Real y Cierre",
    body: "Ya blindamos la API. Ahora hagamos que el mundo real hable con ella (CORS, Swagger y Examen).",
    fill: C.softNeutral, line: C.softNeutral, accent: C.gold, titleFontSize: 11, bodyFontSize: 10.4
  });
  validateSlide(slide, pptx);
}

// ─── BLOQUE 4: INTEROPERABILIDAD REAL Y CIERRE ──────────────────────────────

function createBlock4IntroSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addChip(slide, SH, "BLOQUE 4", { x: 0.88, y: 0.68, w: 1.32, h: 0.34, fill: C.gold, color: C.navy, fontSize: 10.6, bold: true });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.gold);
  slide.addText("El Puente Real", {
    x: 0.88, y: 2.14, w: 9.2, h: 0.66, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  slide.addText("Patrón Facade, CORS y el Camino a la Evaluación.", {
    x: 0.88, y: 2.9, w: 8.2, h: 0.38, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  validateSlide(slide, pptx);
}

function createFacadePatternSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Patrón Facade: La Cara Pro", "Bloque 4 · Rescatando el sistema 2014", "Arquitectura");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 2.5, title: "Abstracción de Deuda Técnica",
    body: "La fachada (FastAPI) nos permite ocultar la complejidad y el desorden del sistema legacy. El cliente solo ve una API REST moderna, mientras nosotros gestionamos el 'monstruo' por detrás.",
    accent: C.navy, fill: C.white, line: C.navy
  });
  addCenterStatement(slide, SH, "El cliente no necesita saber que tus datos vienen de una DB sin normalizar.", {
    x: 0.88, y: 5.2, w: 10.26, h: 1.0, fill: C.gold, color: C.navy, fontSize: 18, bold: true
  });
  validateSlide(slide, pptx);
}

function createLegacyShieldFlowSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "FastAPI como Escudo", "Bloque 4 · Flujo de Interoperabilidad", "Interoperabilidad");
  addAgenticFlow(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    steps: [
      { title: "LEGACY", body: "Datos sucios, nulos inesperados y nombres de columnas crípticos.", accent: C.red },
      { title: "API LAYER", body: "Limpieza, validación de tipos y renombramiento semántico.", accent: C.navy },
      { title: "CLIENTE", body: "Recibe JSON puro, seguro y listo para renderizar en React.", accent: C.gold },
    ]
  });
  validateSlide(slide, pptx);
}

function createDataInteroperabilitySlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Interoperabilidad de Datos", "Bloque 4 · Mapeo Semántico", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Cambiando el pasado en el Esquema",
    code: `class UserRead(BaseModel):
    # La DB legacy usa: 'usr_nom_real'
    # La API expone: 'full_name'
    full_name: str = Field(..., alias="usr_nom_real")
    email: EmailStr
    
    class Config:
        # Permite leer desde el objeto de DB directamente
        from_attributes = True`,
    lang: "python", fontSize: 16
  });
  validateSlide(slide, pptx);
}

function createCorsConceptSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "CORS: El Dragón de la Web", "Bloque 4 · ¿Por qué el navegador me bloquea?", "Interoperabilidad");
  addMythRealityGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Entendiendo el bloqueo",
    entries: [
      { badge: "NAV", myth: "El navegador bloquea la petición por un error de código.", reality: "Es una medida de seguridad para evitar ataques CSRF.", accent: C.red, badgeFill: C.paleRed },
      { badge: "PORT", myth: "Si ambos están en localhost, no hay problema.", reality: "Diferente puerto (3000 vs 8000) = Diferente Origen.", accent: C.navy, badgeFill: C.softBlue },
      { badge: "SEC", myth: "La API debe estar abierta a todo el mundo (*).", reality: "Solo debemos autorizar orígenes de confianza (Whitelisting).", accent: C.navy, badgeFill: C.softBlue },
    ]
  });
  validateSlide(slide, pptx);
}

function createCorsMiddlewareCodeSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Configuración de CORSMiddleware", "Bloque 4 · Seguridad Transversal", "Código");
  addCodePanel(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Habilitando el acceso al Frontend",
    code: `from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Origen permitido
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)`,
    lang: "python", fontSize: 18
  });
  validateSlide(slide, pptx);
}

function createCorsSecurityWarningSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "CORS: Riesgos de Seguridad", "Bloque 4 · Vigilancia Cyber", "Cyber");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 2.5, title: "Peligro: allow_origins=['*']",
    body: "Usar el comodín '*' en producción permite que CUALQUIER sitio malicioso haga peticiones a tu API a nombre del usuario. Esto facilita ataques de robo de sesión y exfiltración de datos.",
    accent: C.red, fill: C.white, line: C.red
  });
  addCenterStatement(slide, SH, "Configura tus orígenes de forma explícita en cada entorno (Dev/Prod).", {
    x: 0.88, y: 5.2, w: 10.26, h: 1.0, fill: C.navy, color: C.white, fontSize: 18, bold: true
  });
  validateSlide(slide, pptx);
}

function createSwaggerStatementSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "La Documentación como Código", "Bloque 4 · OpenAPI / Swagger", "Interoperabilidad");
  addCenterStatement(slide, SH, "En 2026, si tu API no tiene un Swagger actualizado y funcional, técnicamente no existe para el resto del equipo.", {
    x: 0.88, y: 2.22, w: 10.26, h: 2.5, fill: C.navy, color: C.white, fontSize: 24, bold: true, rectRadius: 0.08
  });
  validateSlide(slide, pptx);
}

function createSwaggerNavigationSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Explorando el /docs", "Bloque 4 · El Contrato Vivo", "Interoperabilidad");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "Capacidades de la Interfaz", columns: 2,
    entries: [
      { badge: "TRY", title: "Ejecución Real", body: "Botón 'Try it out' para enviar peticiones desde el browser.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "JSON", title: "openapi.json", body: "Descarga la especificación técnica para herramientas de QA.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "CODE", title: "Status Codes", body: "Visualización clara de qué respuestas esperar (200, 422, etc).", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "SYNC", title: "Auto-Update", body: "Cualquier cambio en Pydantic se refleja al recargar la página.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createOpenApiStandardSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Estandarización Universal", "Bloque 4 · El valor de OpenAPI", "Ingeniería");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 3.5, title: "Lenguaje Común de Ingeniería",
    body: "OpenAPI es el estándar que permite que un equipo de Java consuma tu Python, o que una herramienta de IA genere un cliente de C# automáticamente. Tu código es ahora el manual de instrucciones del sistema.",
    accent: C.gold, fill: C.white, line: C.gold
  });
  validateSlide(slide, pptx);
}

function createIaQaEngineerSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Huella IA: Ingeniero de QA", "Bloque 4 · Metodología Agentic", "IA");
  addPromptQualityCompare(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.46,
    title: "Estrategia de Pruebas",
    badTitle: "Prompt Débil",
    badSubtitle: "Genérico",
    badPrompt: "'¿Cómo pruebo mi API de usuarios?'.",
    badNotes: ["IA da pasos obvios.", "No conoce tu lógica.", "Sin profundidad técnica."],
    goodTitle: "Prompt de QA",
    goodSubtitle: "Estructurado",
    goodPrompt: "'Actúa como un QA Engineer. Basado en este esquema de FastAPI, genera una colección de Postman que cubra: 1. Éxito (201), 2. Error de tipo (422) y 3. Ataque de inyección lógica'.",
    goodNotes: ["Genera casos de borde.", "Automatiza el testeo.", "Garantiza la calidad."],
    footer: "La IA propone el plan; tú ejecutas y validas el resultado real."
  });
  validateSlide(slide, pptx);
}

function createIntegrationTestFlowSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Pruebas de Integración", "Bloque 4 · Validando el Puente", "Práctica");
  addAgenticFlow(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54,
    steps: [
      { title: "ESPECIFICAR", body: "Definir el caso (ej: Login con clave errónea) en Postman.", accent: C.navy },
      { title: "EJECUTAR", body: "Lanzar la petición real contra el servidor FastAPI.", accent: C.red },
      { title: "VALIDAR", body: "Verificar que el Status Code sea 401 y el JSON sea correcto.", accent: C.gold },
    ]
  });
  validateSlide(slide, pptx);
}

function createRoadmapChecklistSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "Checklist de Competencias", "Bloque 4 · Rumbo al Examen", "Estrategia");
  addChecklistGrid(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 4.54, title: "¿Qué debo dominar para el lunes?", columns: 2,
    entries: [
      { badge: "1", title: "Arqueología", body: "Leer código PHP legacy y mapear su base de datos.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "2", title: "Arquitectura", body: "Crear la capa MVC y el Repositorio de acceso a datos.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
      { badge: "3", title: "Seguridad", body: "Blindar esquemas con Pydantic y restringir Payloads.", accent: C.red, fill: C.paleRed, badgeFill: C.red },
      { badge: "4", title: "API Layer", body: "Implementar FastAPI con Status Codes y CORS configurado.", accent: C.navy, fill: C.softBlue, badgeFill: C.navy },
    ]
  });
  validateSlide(slide, pptx);
}

function createMondayFinalAlertSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, "El Lunes: Evaluación Parcial 2", "Simulacro Final", "Importante");
  addCard(slide, SH, {
    x: 0.88, y: 2.22, w: 10.26, h: 3.5, title: "RECOMENDACIÓN DE ORO",
    body: "No se enfoquen solo en que 'compile'. El lunes evaluaremos el flujo del dato: cómo un registro sucio del 2014 viaja de forma segura hasta una interfaz moderna gracias a su arquitectura.",
    accent: C.gold, fill: C.white, line: C.gold
  });
  addCenterStatement(slide, SH, "La arquitectura es la solución al caos del tiempo.", {
    x: 0.88, y: 6.0, w: 10.26, h: 0.6, fill: C.navy, color: C.white, fontSize: 16, bold: true
  });
  validateSlide(slide, pptx);
}

function createFinalSynthesisClosingSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  addMarkBox(slide, SH, logoMarkPath, { x: 9.62, y: 0.28, w: 0.68, h: 0.68 });
  addBarsMotif(slide, 0.88, 1.22, 1.1, C.gold);
  
  slide.addText("Próximo Paso:\nEvaluación Parcial 2", {
    x: 0.88, y: 2.14, w: 9.2, h: 1.26, fontFace: TYPOGRAPHY.display, fontSize: 36, bold: true, color: C.white, valign: "mid",
  });
  
  slide.addText("El lunes 27 pondremos a prueba nuestra capacidad de integrar sistemas legados mediante arquitecturas modernas. Repasen el flujo completo: Arqueología -> MVC -> API Layer.", {
    x: 0.88, y: 3.62, w: 8.2, h: 0.8, fontFace: TYPOGRAPHY.body, fontSize: 15.2, color: "DCE6F2",
  });
  
  addCenterStatement(slide, SH, "Nos vemos el lunes 27 de abril para la Evaluación", {
    x: 0.88, y: 5.82, w: 10.26, h: 0.82, fill: C.gold, fontSize: 24, color: C.navy, bold: true
  });
  
  validateSlide(slide, pptx);
}

function main() {
  createCoverSlide();
  createWeeklyPathSlide();
  createIndustryVisionSlide();
  createIntegrityReviewSlide();
  createObjectivesSlide();
  createLearningMapSlide();
  createMondayAlertSlide();

  createBlock1IntroSlide();
  createLegacyVsModernContractSlide();
  createBouncerAnalogySlide();
  createPythonTypingSlide();
  createBaseModelAnatomySlide();
  createCyberTypeConfusionSlide();
  createError422Slide();
  createIaPromptSchemaSlide();
  createBlock1SynthesisSlide();

  createBlock2IntroSlide();
  createHttpVerbsMappingSlide();
  createUrlResourceVsFileSlide();
  createStatusCodesGridSlide();
  createStatusCodePostCodeSlide();
  createStatusCodeDeleteCodeSlide();
  createHttpExceptionCodeSlide();
  createAlways200SinSlide();
  createBusinessCaseStatus1Slide();
  createBusinessCaseStatus2Slide();
  createIaEndpointDesignerSlide();
  createBlock2SynthesisSlide();

  createBlock3IntroSlide();
  createHackerMindsetSlide();
  createAttackSurfaceSlide();
  createDosAttackScenarioSlide();
  createDosDefenseCodeSlide();
  createDosMemorySaveSlide();
  createDosAdvancedFieldSlide();
  createLegacyInjectionAttackSlide();
  createRegexShieldCodeSlide();
  createRegexBreakdownSlide();
  createCustomValidatorIntroSlide();
  createKeywordFilterCodeSlide();
  createDataExposureTrapSlide();
  createDataExposureDefenseSlide();
  createInputVsOutputSplitSlide();
  createResponseModelCodeSlide();
  createTypeConfusionAttackSlide();
  createTypingAsArmorSlide();
  createError422AnatomySlide();
  createLogicValidationCodeSlide();
  createMultiFieldValidationSlide();
  createIaPentesterPromptSlide();
  createRedTeamSimulationSlide();
  createBlueTeamResultSlide();
  createBlock3SynthesisSlide();

  createBlock4IntroSlide();
  createFacadePatternSlide();
  createLegacyShieldFlowSlide();
  createDataInteroperabilitySlide();
  createCorsConceptSlide();
  createCorsMiddlewareCodeSlide();
  createCorsSecurityWarningSlide();
  createSwaggerStatementSlide();
  createSwaggerNavigationSlide();
  createOpenApiStandardSlide();
  createIaQaEngineerSlide();
  createIntegrationTestFlowSlide();
  createRoadmapChecklistSlide();
  createMondayFinalAlertSlide();
  createFinalSynthesisClosingSlide();

  pptx
    .writeFile({ fileName: outputPptx })
    .then(() => {
      console.log(`PPTX generado: ${outputPptx}`);
      fs.copyFileSync(__filename, outputJs);
      console.log(`Fuente copiada: ${outputJs}`);
    })
    .catch((err) => {
      console.error("Error generando PPTX:", err);
      process.exit(1);
    });
}

main();
