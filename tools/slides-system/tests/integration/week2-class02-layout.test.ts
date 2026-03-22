import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

const EMU_PER_INCH = 914400;
const SUBTITLE_GUARD_START_EMU = Math.round(1.96 * EMU_PER_INCH);
const CONTENT_START_EMU = Math.round(2.24 * EMU_PER_INCH);
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

function buildWeek2Class02Deck(tempDir: string) {
  const repoRoot = path.resolve(__dirname, "..", "..", "..", "..");
  const sourcePath = path.join(
    repoRoot,
    "clases",
    "semana-02",
    "02",
    "ppt",
    "source",
    "block-1-slides.js"
  );
  const outputPptx = path.join(tempDir, "Clase-05-Bloque-1-Pantallas-Reales-y-Responsive.pptx");
  const outputJs = path.join(tempDir, "Clase-05-Bloque-1-Pantallas-Reales-y-Responsive.js");

  execFileSync("node", [sourcePath], {
    cwd: repoRoot,
    env: {
      ...process.env,
      PPTX_OUTPUT: outputPptx,
      PPTX_SOURCE_OUTPUT: outputJs,
    },
    stdio: "pipe",
  });

  return { outputPptx, sourcePath };
}

function unzipDeck(pptxPath: string, tempDir: string) {
  const unzipDir = path.join(tempDir, "unzipped");
  fs.mkdirSync(unzipDir, { recursive: true });
  execFileSync("tar", ["-xf", pptxPath, "-C", unzipDir], {
    stdio: "pipe",
  });
  return unzipDir;
}

describe("week 2 class 02 deck regression", () => {
  it(
    "no deja mojibake, geometría negativa ni elementos metidos en la banda del subtítulo",
    () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "pro301-responsive-class02-"));

    try {
      const { outputPptx, sourcePath } = buildWeek2Class02Deck(tempDir);
      const source = fs.readFileSync(sourcePath, "utf8");
      expect(source).not.toMatch(MOJIBAKE_PATTERN);

      const unzipDir = unzipDeck(outputPptx, tempDir);
      const slidesDir = path.join(unzipDir, "ppt", "slides");
      const slideFiles = fs
        .readdirSync(slidesDir)
        .filter((name) => /^slide\d+\.xml$/i.test(name))
        .map((name) => path.join(slidesDir, name));

      expect(slideFiles.length).toBeGreaterThanOrEqual(60);

      const slideXml = slideFiles.map((filePath) => fs.readFileSync(filePath, "utf8"));
      expect(slideXml.join("\n")).not.toMatch(MOJIBAKE_PATTERN);

      const negativeGeometryHits = slideXml.flatMap((xml, index) => {
        const matches = xml.match(/<a:(?:off|ext)\b[^>]*\b(?:x|y|cx|cy)="-\d+"/g) ?? [];
        return matches.map((match) => ({ filePath: slideFiles[index], match }));
      });
      expect(negativeGeometryHits).toHaveLength(0);

      const subtitleBandHits = slideFiles.flatMap((filePath, index) => {
        if (index === 0) {
          return [];
        }
        const xml = slideXml[index];
        const yValues = Array.from(xml.matchAll(/<a:off x="\d+" y="(\d+)"/g), (match) =>
          Number(match[1])
        );
        const hits = yValues.filter(
          (value) => value >= SUBTITLE_GUARD_START_EMU && value < CONTENT_START_EMU
        );
        return hits.map((value) => ({ filePath, value }));
      });
      expect(subtitleBandHits).toHaveLength(0);
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    },
    20000
  );
});
