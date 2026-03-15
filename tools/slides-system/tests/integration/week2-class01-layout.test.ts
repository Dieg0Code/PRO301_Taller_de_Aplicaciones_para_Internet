import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

const EMU_PER_INCH = 914400;
const SUBTITLE_GUARD_START_EMU = Math.round(1.96 * EMU_PER_INCH);
const CONTENT_START_EMU = Math.round(2.24 * EMU_PER_INCH);

function buildWeek2Class01Deck(tempDir: string) {
  const repoRoot = path.resolve(__dirname, "..", "..", "..", "..");
  const sourcePath = path.join(
    repoRoot,
    "clases",
    "semana-02",
    "01",
    "ppt",
    "source",
    "block-1-slides.js"
  );
  const outputPptx = path.join(tempDir, "Clase-04-Bloque-1-CSS-Moderno.pptx");
  const outputJs = path.join(tempDir, "Clase-04-Bloque-1-CSS-Moderno.js");

  execFileSync("node", [sourcePath], {
    cwd: repoRoot,
    env: {
      ...process.env,
      PPTX_OUTPUT: outputPptx,
      PPTX_SOURCE_OUTPUT: outputJs,
    },
    stdio: "pipe",
  });

  return { outputPptx };
}

function unzipDeck(pptxPath: string, tempDir: string) {
  const unzipDir = path.join(tempDir, "unzipped");
  fs.mkdirSync(unzipDir, { recursive: true });
  execFileSync("tar", ["-xf", pptxPath, "-C", unzipDir], {
    stdio: "pipe",
  });
  return unzipDir;
}

describe("week 2 class 01 deck regression", () => {
  it("no genera geometría negativa ni invade la banda del subtítulo en ninguna slide", () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "pro301-css-block1-"));

    try {
      const { outputPptx } = buildWeek2Class01Deck(tempDir);
      const unzipDir = unzipDeck(outputPptx, tempDir);
      const slidesDir = path.join(unzipDir, "ppt", "slides");
      const slideFiles = fs
        .readdirSync(slidesDir)
        .filter((name) => /^slide\d+\.xml$/i.test(name))
        .map((name) => path.join(slidesDir, name));

      const negativeGeometryHits = slideFiles.flatMap((filePath) => {
        const xml = fs.readFileSync(filePath, "utf8");
        const matches = xml.match(/<a:(?:off|ext)\b[^>]*\b(?:x|y|cx|cy)="-\d+"/g) ?? [];
        return matches.map((match) => ({ filePath, match }));
      });

      expect(negativeGeometryHits).toHaveLength(0);

      const subtitleBandHits = slideFiles.flatMap((filePath) => {
        if (filePath.endsWith("slide1.xml")) {
          return [];
        }
        const xml = fs.readFileSync(filePath, "utf8");
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
  });
});
