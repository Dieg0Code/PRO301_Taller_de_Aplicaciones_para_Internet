import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

const MOJIBAKE_PATTERN = new RegExp(
  [
    "\\u00C3",
    "\\u00C2",
    "\\u00E2\\u20AC",
    "\\u00E2\\u20AC\\u2122",
    "\\u00E2\\u20AC\\u0153",
    "\\u00E2\\u20AC\\u009D",
    "\\u00E2\\u20AC\\u201C",
    "\\u00E2\\u20AC\\u201D",
  ].join("|")
);

function buildWeek2Class03Deck(tempDir: string) {
  const repoRoot = path.resolve(__dirname, "..", "..", "..", "..");
  const sourcePath = path.join(
    repoRoot,
    "clases",
    "semana-02",
    "03",
    "ppt",
    "source",
    "block-1-slides.js"
  );
  const outputPptx = path.join(tempDir, "Clase-06-Bloque-1-Calidad-Web-y-Auditoria.pptx");
  const outputJs = path.join(tempDir, "Clase-06-Bloque-1-Calidad-Web-y-Auditoria.js");

  execFileSync("node", [sourcePath], {
    cwd: repoRoot,
    env: {
      ...process.env,
      PPTX_OUTPUT: outputPptx,
      PPTX_SOURCE_OUTPUT: outputJs,
    },
    stdio: "pipe",
  });

  return outputPptx;
}

function unzipDeck(pptxPath: string, tempDir: string) {
  const unzipDir = path.join(tempDir, "unzipped");
  fs.mkdirSync(unzipDir, { recursive: true });
  execFileSync("tar", ["-xf", pptxPath, "-C", unzipDir], {
    stdio: "pipe",
  });
  return unzipDir;
}

describe("week 2 class 03 deck regression", () => {
  it(
    "no deja ZIP corrupto, geometría negativa, mojibake ni párrafos OpenXML mal formados",
    () => {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "pro301-quality-class03-"));

      try {
        const outputPptx = buildWeek2Class03Deck(tempDir);
        expect(fs.existsSync(outputPptx)).toBe(true);
        expect(fs.statSync(outputPptx).size).toBeGreaterThan(0);

        const unzipDir = unzipDeck(outputPptx, tempDir);
        const slidesDir = path.join(unzipDir, "ppt", "slides");
        const slideFiles = fs
          .readdirSync(slidesDir)
          .filter((name) => /^slide\d+\.xml$/i.test(name))
          .map((name) => path.join(slidesDir, name));

        expect(slideFiles.length).toBeGreaterThanOrEqual(50);

        const slideXml = slideFiles.map((filePath) => fs.readFileSync(filePath, "utf8"));
        expect(slideXml.join("\n")).not.toMatch(MOJIBAKE_PATTERN);

        const negativeGeometryHits = slideXml.flatMap((xml, index) => {
          const matches = xml.match(/<a:(?:off|ext)\b[^>]*\b(?:x|y|cx|cy)="-\d+"/g) ?? [];
          return matches.map((match) => ({ filePath: slideFiles[index], match }));
        });
        expect(negativeGeometryHits).toHaveLength(0);

        const malformedParagraphHits = slideXml.flatMap((xml, index) => {
          const matches = xml.match(/<\/a:(?:r|br|fld)>\s*<a:pPr\b/g) ?? [];
          return matches.map((match) => ({ filePath: slideFiles[index], match }));
        });
        expect(malformedParagraphHits).toHaveLength(0);
      } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    },
    20000
  );
});
