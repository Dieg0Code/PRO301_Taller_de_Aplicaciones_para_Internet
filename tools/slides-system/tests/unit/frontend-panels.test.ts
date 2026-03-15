import { describe, expect, it } from "vitest";
import {
  addBoxModelDiagram,
  addCascadeInspector,
  addCssRuleStack,
  addFlexGridLayout,
  addLighthouseAuditCard,
  addResponsiveViewportCompare,
  addSpecificityScale,
  addTokenBoard,
} from "../../src/components";
import { RecordingSlide } from "../../src/adapters/recording-slide";
import { TOKENS } from "../../src/theme";

const SH = {
  roundRect: "roundRect",
  rect: "rect",
  ellipse: "ellipse",
  chevron: "chevron",
} as const;

function expectGeometryIsValid(slide: RecordingSlide) {
  const entries = [...slide.shapes, ...slide.texts, ...slide.images];
  const offenders = entries.filter((entry) => {
    const rawX = typeof entry.options.x === "number" ? entry.options.x : undefined;
    const rawY = typeof entry.options.y === "number" ? entry.options.y : undefined;
    const rawW = typeof entry.options.w === "number" ? entry.options.w : undefined;
    const rawH = typeof entry.options.h === "number" ? entry.options.h : undefined;
    return (
      (rawX != null && !Number.isFinite(rawX)) ||
      (rawY != null && !Number.isFinite(rawY)) ||
      (rawW != null && (!Number.isFinite(rawW) || rawW < 0)) ||
      (rawH != null && (!Number.isFinite(rawH) || rawH < 0))
    );
  });

  expect(offenders).toHaveLength(0);
}

describe("frontend panels", () => {
  it("addResponsiveViewportCompare dibuja ambos viewports", () => {
    const slide = new RecordingSlide();

    addResponsiveViewportCompare(slide, SH, {
      x: 0.8,
      y: 1.2,
      w: 7.8,
      h: 3.6,
    });

    expect(slide.texts.some((entry) => String(entry.text).includes("Móvil"))).toBe(true);
    expect(slide.texts.some((entry) => String(entry.text).includes("Desktop"))).toBe(true);
    expectGeometryIsValid(slide);
  });

  it("addCssRuleStack resalta una regla activa", () => {
    const slide = new RecordingSlide();

    addCssRuleStack(slide, SH, {
      x: 1,
      y: 1,
      w: 5.4,
      h: 3,
      rules: [
        { selector: ".card", declaration: "color: red;", specificity: "0,1,0" },
        { selector: "#hero .card", declaration: "color: navy;", specificity: "1,1,0", active: true },
      ],
    });

    const activeRows = slide.shapes.filter(
      (shape) =>
        (shape.options.fill as { color?: string } | undefined)?.color === TOKENS.paleRed &&
        shape.options.h === 0.42
    );

    expect(activeRows.length).toBeGreaterThanOrEqual(1);
    expectGeometryIsValid(slide);
  });

  it("addCascadeInspector muestra el valor resuelto y la regla activa", () => {
    const slide = new RecordingSlide();

    addCascadeInspector(slide, SH, {
      x: 0.8,
      y: 1,
      w: 8.4,
      h: 3.6,
      resolvedValue: "#d62027",
      rules: [
        { selector: "p", declaration: "color: slate;", specificity: "0,0,1" },
        {
          selector: ".destacado",
          declaration: "color: red;",
          specificity: "0,1,0",
          reason: "gana por peso",
          active: true,
        },
      ],
    });

    expect(slide.texts.some((entry) => String(entry.text).includes("#d62027"))).toBe(true);

    const activeRows = slide.shapes.filter(
      (shape) =>
        (shape.options.fill as { color?: string } | undefined)?.color === TOKENS.paleRed &&
        typeof shape.options.h === "number" &&
        shape.options.h >= 0.52
    );

    expect(activeRows.length).toBeGreaterThanOrEqual(1);
    expectGeometryIsValid(slide);
  });

  it("addCascadeInspector afloja paneles laterales y filas en formato compacto", () => {
    const slide = new RecordingSlide();

    addCascadeInspector(slide, SH, {
      x: 0.8,
      y: 1,
      w: 6,
      h: 3.86,
      rules: [
        { selector: "p", declaration: "color: slate;", specificity: "0,0,1" },
        {
          selector: ".destacado",
          declaration: "color: red;",
          specificity: "0,1,0",
          reason: "gana por clase",
          active: true,
        },
      ],
    });

    const roomyRows = slide.shapes.filter(
      (shape) =>
        typeof shape.options.h === "number" &&
        shape.options.h >= 0.75 &&
        typeof shape.options.x === "number" &&
        shape.options.x >= 2.3 &&
        shape.options.x <= 4.4
    );
    const compactElementPanel = slide.shapes.find(
      (shape) =>
        typeof shape.options.x === "number" &&
        typeof shape.options.y === "number" &&
        typeof shape.options.w === "number" &&
        shape.options.x >= 0.95 &&
        shape.options.x <= 1.1 &&
        shape.options.y >= 1.85 &&
        shape.options.y <= 2.05 &&
        shape.options.w < 1.5
    );

    expect(roomyRows.length).toBeGreaterThanOrEqual(2);
    expect(compactElementPanel).toBeTruthy();
    expectGeometryIsValid(slide);
  });

  it("addCascadeInspector mantiene los chevrons dentro de los pasillos entre paneles", () => {
    const slide = new RecordingSlide();
    const x = 0.8;
    const y = 1;
    const w = 6;
    const h = 3.86;

    addCascadeInspector(slide, SH, {
      x,
      y,
      w,
      h,
      rules: [
        { selector: "p", declaration: "color: slate;", specificity: "0,0,1" },
        {
          selector: ".destacado",
          declaration: "color: red;",
          specificity: "0,1,0",
          reason: "gana por clase",
          active: true,
        },
      ],
    });

    const compactInspector = true;
    const elementW = Math.max(1.24, Math.min(1.72, w * (compactInspector ? 0.2 : 0.22)));
    const resultW = Math.max(1.3, Math.min(1.58, w * (compactInspector ? 0.22 : 0.24)));
    const inspectorGap = 0.24;
    const stackX = x + 0.2 + elementW + inspectorGap;
    const stackW = w - elementW - resultW - inspectorGap * 2 - 0.4;
    const resultX = x + w - resultW - 0.2;
    const chevrons = slide.shapes
      .filter((shape) => shape.shapeType === SH.chevron)
      .sort((a, b) => Number(a.options.x) - Number(b.options.x));

    expect(chevrons).toHaveLength(2);
    expect(Number(chevrons[0].options.x)).toBeGreaterThanOrEqual(x + 0.2 + elementW);
    expect(Number(chevrons[0].options.x) + Number(chevrons[0].options.w)).toBeLessThanOrEqual(stackX);
    expect(Number(chevrons[1].options.x)).toBeGreaterThanOrEqual(stackX + stackW);
    expect(Number(chevrons[1].options.x) + Number(chevrons[1].options.w)).toBeLessThanOrEqual(resultX);
    expectGeometryIsValid(slide);
  });

  it("addSpecificityScale representa una progresión de peso", () => {
    const slide = new RecordingSlide();

    addSpecificityScale(slide, SH, {
      x: 0.8,
      y: 1.1,
      w: 7.4,
      h: 3,
      entries: [
        { label: "Etiqueta", value: "0,0,1", weightLabel: "bajo" },
        { label: "Clase", value: "0,1,0", weightLabel: "medio", active: true },
        { label: "ID", value: "1,0,0", weightLabel: "alto" },
      ],
    });

    expect(slide.texts.some((entry) => String(entry.text).includes("Etiqueta"))).toBe(true);
    expect(slide.texts.some((entry) => String(entry.text).includes("1,0,0"))).toBe(true);
    expect(
      slide.shapes.some(
        (shape) => (shape.options.fill as { color?: string } | undefined)?.color === TOKENS.paleRed
      )
    ).toBe(true);
    expectGeometryIsValid(slide);
  });

  it("addSpecificityScale no genera geometría negativa en modo compacto", () => {
    const slide = new RecordingSlide();

    addSpecificityScale(slide, SH, {
      x: 2.16,
      y: 5.26,
      w: 8.96,
      h: 1.14,
      entries: [
        { label: "Color", value: "misma paleta", weightLabel: "señal estable", scale: 0.44 },
        { label: "Espacio", value: "mismo ritmo", weightLabel: "bloques respirables", scale: 0.62 },
        { label: "Layout", value: "reglas claras", weightLabel: "más control", scale: 0.86, active: true },
      ],
    });

    expectGeometryIsValid(slide);
  });

  it("addTokenBoard agrupa tokens y muestra swatches cuando corresponde", () => {
    const slide = new RecordingSlide();

    addTokenBoard(slide, SH, {
      x: 0.8,
      y: 1,
      w: 8.8,
      h: 3.4,
      groups: [
        {
          title: "Color",
          items: [
            { label: "--color-primario", value: "#D62027", swatch: TOKENS.red },
            { label: "--text-main", value: "#102A43", swatch: TOKENS.navy },
          ],
        },
      ],
    });

    expect(slide.texts.some((entry) => String(entry.text).includes("--color-primario"))).toBe(true);
    expect(
      slide.shapes.some(
        (shape) => (shape.options.fill as { color?: string } | undefined)?.color === TOKENS.red
      )
    ).toBe(true);
    expectGeometryIsValid(slide);
  });

  it("addTokenBoard reserva aire para el footer cuando existe", () => {
    const slide = new RecordingSlide();

    addTokenBoard(slide, SH, {
      x: 0.8,
      y: 1,
      w: 8.8,
      h: 3.8,
      footer: "Resumen del tablero",
      groups: [
        {
          title: "Color",
          items: [
            { label: "--color-primario", value: "#D62027", swatch: TOKENS.red },
            { label: "--text-main", value: "#102A43", swatch: TOKENS.navy },
            { label: "--surface-card", value: "#FFFFFF", swatch: TOKENS.white },
          ],
        },
        {
          title: "Espacio",
          items: [
            { label: "--space-sm", value: "8px" },
            { label: "--space-md", value: "16px" },
            { label: "--space-lg", value: "24px" },
          ],
        },
      ],
    });

    const footerText = slide.texts.find((entry) => String(entry.text).includes("Resumen del tablero"));
    const tallGroups = slide.shapes.filter(
      (shape) =>
        typeof shape.options.x === "number" &&
        typeof shape.options.y === "number" &&
        typeof shape.options.w === "number" &&
        typeof shape.options.h === "number" &&
        shape.options.y >= 1.7 &&
        shape.options.h > 2
    );
    const maxGroupBottom = Math.max(
      ...tallGroups.map((shape) => Number(shape.options.y) + Number(shape.options.h))
    );

    expect(footerText).toBeTruthy();
    expect(Number(footerText?.options.y)).toBeGreaterThan(maxGroupBottom);
    expectGeometryIsValid(slide);
  });

  it("addBoxModelDiagram incluye las cuatro capas", () => {
    const slide = new RecordingSlide();

    addBoxModelDiagram(slide, SH, {
      x: 0.8,
      y: 1,
      w: 4.8,
      h: 3.2,
    });

    expect(slide.texts.filter((entry) => String(entry.text).includes("margin")).length).toBe(1);
    expect(slide.texts.filter((entry) => String(entry.text).includes("content")).length).toBe(1);
    expectGeometryIsValid(slide);
  });

  it("addLighthouseAuditCard dibuja cuatro métricas", () => {
    const slide = new RecordingSlide();

    addLighthouseAuditCard(slide, SH, {
      x: 0.8,
      y: 1.1,
      w: 7.4,
      h: 3,
    });

    expect(slide.texts.some((entry) => String(entry.text).includes("Performance"))).toBe(true);
    expect(slide.texts.some((entry) => String(entry.text).includes("SEO"))).toBe(true);
    expectGeometryIsValid(slide);
  });
  it("addFlexGridLayout mantiene los items flex dentro del contenedor en formato compacto", () => {
    const slide = new RecordingSlide();
    const x = 5.02;
    const y = 3.78;
    const w = 3.06;
    const h = 1.18;

    addFlexGridLayout(slide, SH, {
      x,
      y,
      w,
      h,
      mode: "flex",
      itemCount: 4,
      title: "Flexbox",
    });

    const containerX = x + 0.22;
    const containerY = y + 0.68;
    const containerW = w - 0.44;
    const containerH = h - 0.96;
    const items = slide.shapes.filter(
      (shape) =>
        shape.shapeType === SH.roundRect &&
        typeof shape.options.x === "number" &&
        typeof shape.options.y === "number" &&
        typeof shape.options.w === "number" &&
        typeof shape.options.h === "number" &&
        Number(shape.options.x) >= containerX &&
        Number(shape.options.y) >= containerY &&
        Number(shape.options.w) < containerW &&
        Number(shape.options.h) < containerH
    );

    expect(items.length).toBeGreaterThanOrEqual(4);
    items.forEach((item) => {
      const itemX = Number(item.options.x);
      const itemY = Number(item.options.y);
      const itemW = Number(item.options.w);
      const itemH = Number(item.options.h);

      expect(itemX).toBeGreaterThanOrEqual(containerX);
      expect(itemY).toBeGreaterThanOrEqual(containerY);
      expect(itemX + itemW).toBeLessThanOrEqual(containerX + containerW + 0.001);
      expect(itemY + itemH).toBeLessThanOrEqual(containerY + containerH + 0.001);
    });
    expectGeometryIsValid(slide);
  });
});
