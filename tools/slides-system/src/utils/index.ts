import * as spacingJs from "../../utils/spacing";
import * as validationJs from "../../utils/validation";
import * as codeJs from "../../utils/code";
import type { PptxLike, SlideLike, TextRun } from "../types";

type SpacingModule = {
  SPACING: Record<string, number>;
};

type ValidationModule = {
  validateSlide: (slide: SlideLike, pptx: PptxLike) => void;
};

type CodeModule = {
  makeCodeRuns: (code: string, lang?: string, fontSize?: number) => TextRun[];
  buildThemeMap: (themeCssModule?: string) => Record<string, string>;
};

const spacing = spacingJs as unknown as SpacingModule;
const validation = validationJs as unknown as ValidationModule;
const code = codeJs as unknown as CodeModule;

export const SPACING = spacing.SPACING;
export const validateSlide = validation.validateSlide;
export const makeCodeRuns = code.makeCodeRuns;
export const buildThemeMap = code.buildThemeMap;

export * from "./text-quality";
