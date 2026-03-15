import { describe, expect, it } from "vitest";
import { addBrowserMock } from "../../src/components";
import { RecordingSlide } from "../../src/adapters/recording-slide";

const SH = {
  roundRect: "roundRect",
  ellipse: "ellipse",
} as const;

describe("addBrowserMock", () => {
  it("no deja texto fantasma cuando no se pasa título", () => {
    const slide = new RecordingSlide();

    addBrowserMock(slide, SH, {
      x: 0.8,
      y: 1.2,
      w: 5.6,
      h: 3.2,
      url: "http://localhost:3000/contacto",
    });

    expect(slide.texts).toHaveLength(1);
    expect(String(slide.texts[0]?.text)).toContain("localhost");
  });
});
