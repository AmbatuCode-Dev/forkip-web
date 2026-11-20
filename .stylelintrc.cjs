/**
 * CSS gate for src/app/globals.css (Tailwind v4 entry).
 *
 * - standard rules, with Tailwind v4 at-rules tolerated (@theme, @utility, ...).
 * - color-ish properties must use semantic var(--*) tokens outside the
 *   token-definition blocks (:root and @theme), which carry the raw values.
 *
 * Run with: pnpm lint:css
 */
module.exports = {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-declaration-strict-value"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "theme",
          "utility",
          "import",
          "layer",
          "apply",
          "custom-variant",
          "source",
          "plugin",
          "reference",
          "variant",
        ],
      },
    ],
    "import-notation": "string",
    "value-keyword-case": [
      "lower",
      {
        ignoreKeywords: ["SFMono-Regular", "Menlo", "Consolas"],
      },
    ],
    "scale-unlimited/declaration-strict-value": [
      ["/color/", "fill", "stroke"],
      {
        ignoreValues: [
          "transparent",
          "currentColor",
          "inherit",
          "initial",
          "unset",
          "none",
        ],
        ignoreFunctions: false,
        message:
          "Use a semantic CSS variable (var(--*)) for color values; raw colors belong only in :root/@theme token definitions.",
      },
    ],
  },
};
