import { describe, expect, it } from "vitest";
import { addComponentTree, addJsonPanel, addRequestResponseFlow } from "../../src/components";
import { RecordingSlide } from "../../src/adapters/recording-slide";

const SH = {
  roundRect: "roundRect",
  rect: "rect",
  line: "line",
  chevron: "chevron",
} as const;

describe("app panels", () => {
  it("addJsonPanel renderiza código JSON tipado", () => {
    const slide = new RecordingSlide();

    addJsonPanel(slide, SH, {
      x: 1,
      y: 1,
      w: 4,
      h: 2.8,
      code: '{\n  "ok": true,\n  "items": 3\n}',
    });

    const codeBlock = slide.texts.find((entry) => Array.isArray(entry.text));
    expect(Array.isArray(codeBlock?.text)).toBe(true);
  });

  it("addRequestResponseFlow deja visibles request y response", () => {
    const slide = new RecordingSlide();

    addRequestResponseFlow(slide, SH, {
      x: 0.8,
      y: 1.2,
      w: 7.4,
      h: 2.6,
    });

    expect(slide.texts.some((entry) => String(entry.text).includes("GET /api/cursos"))).toBe(true);
    expect(slide.texts.some((entry) => String(entry.text).includes("200 OK"))).toBe(true);
  });

  it("addComponentTree dibuja nodos jerárquicos", () => {
    const slide = new RecordingSlide();

    addComponentTree(slide, SH, {
      x: 0.8,
      y: 1,
      w: 6,
      h: 3.2,
      nodes: [
        { label: "App", depth: 0 },
        { label: "Layout", depth: 1 },
        { label: "Sidebar", depth: 2 },
      ],
    });

    expect(slide.texts.some((entry) => String(entry.text).includes("Sidebar"))).toBe(true);
    expect(slide.shapes.some((shape) => shape.shapeType === SH.line)).toBe(true);
  });
});
