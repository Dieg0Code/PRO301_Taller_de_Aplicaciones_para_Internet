import { describe, expect, it } from "vitest";
import { makeCodeRuns } from "../../src/utils";

describe("makeCodeRuns", () => {
  it("genera varios colores al resaltar HTML", () => {
    const runs = makeCodeRuns(
      '<label for="correo">Correo</label>\n<input id="correo" name="correo" type="email" />',
      "html",
      11
    );

    const colors = new Set(
      runs
        .filter((run) => run.text.trim().length > 0)
        .map((run) => String(run.options?.color ?? ""))
    );

    expect(colors.size).toBeGreaterThan(2);
  });
});
