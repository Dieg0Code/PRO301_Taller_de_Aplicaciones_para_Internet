const fs = require("fs");
const Prism = require("prismjs");

let THEME_MAP;
const FALLBACK_COLORS = {
  plain: "F8F8F2",
  comment: "8292A2",
  punctuation: "F8F8F2",
  tag: "F92672",
  attrName: "A6E22E",
  attrValue: "E6DB74",
  string: "E6DB74",
  keyword: "66D9EF",
  function: "A6E22E",
  operator: "F8F8F2",
  number: "AE81FF",
  boolean: "AE81FF",
  property: "66D9EF",
  className: "A6E22E",
  regex: "FD971F",
 };

function loadPrismLanguage(lang) {
  const normalized = String(lang || "plaintext").toLowerCase();
  const aliases = {
    js: "javascript",
    ts: "typescript",
    py: "python",
    sh: "bash",
    yml: "yaml",
    html: "markup",
    xml: "markup",
  };
  const id = aliases[normalized] || normalized;
  if (!Prism.languages[id]) {
    try {
      require(`prismjs/components/prism-${id}`);
    } catch (_error) {}
  }
  return Prism.languages[id] || Prism.languages.plain || {};
}

function buildThemeMap(themeCssModule = "prismjs/themes/prism-okaidia.css") {
  try {
    const css = fs.readFileSync(require.resolve(themeCssModule), "utf8");
    return Object.fromEntries(
      [...css.matchAll(/\.token\.([\w-]+)[^{]*\{[^}]*color:\s*([^;\s]+)[^}]*\}/g)].map(
        ([, token, color]) => [token, color.replace(/#|!important/g, "").trim()]
      )
    );
  } catch (_error) {
    return { plain: "FFFFFF", comment: "999999" };
  }
}

function getThemeMap() {
  if (!THEME_MAP) THEME_MAP = buildThemeMap();
  return THEME_MAP;
}

function normalizeType(type = "plain") {
  const raw = Array.isArray(type) ? type[0] : type;
  const key = String(raw || "plain")
    .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  return key || "plain";
}

function resolveColor(type = "plain") {
  const theme = getThemeMap();
  const normalized = normalizeType(type);
  return (
    theme[normalized] ||
    theme[String(normalized).replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)] ||
    FALLBACK_COLORS[normalized] ||
    theme.plain ||
    FALLBACK_COLORS.plain
  );
}

function createRun(text, type = "plain", fontSize = 11.5) {
  return {
    text,
    options: {
      fontFace: "Consolas",
      color: resolveColor(type),
      fontSize,
    },
  };
}

function tokensToRuns(tokens, fontSize, inheritedType = "plain") {
  return tokens.flatMap((token) =>
    typeof token === "string"
      ? [createRun(token, inheritedType, fontSize)]
      : Array.isArray(token.content)
      ? tokensToRuns(token.content, fontSize, token.alias || token.type || inheritedType)
      : [createRun(token.content, token.alias || token.type || inheritedType, fontSize)]
  );
}

function makeCodeRuns(code, lang = "html", fontSize = 11.5) {
  const grammar = loadPrismLanguage(lang);
  const lines = String(code || "").split("\n");
  const pad = lines.length.toString().length;
  return lines.flatMap((line, index) => [
    createRun(`${(index + 1).toString().padStart(pad, " ")} `, "comment", fontSize),
    ...tokensToRuns(Prism.tokenize(line, grammar), fontSize),
    ...(index < lines.length - 1 ? [createRun("\n", "plain", fontSize)] : []),
  ]);
}

module.exports = {
  makeCodeRuns,
  buildThemeMap,
};
