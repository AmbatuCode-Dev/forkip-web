/**
 * Tailwind class gate (ESLint, runs alongside Biome without rule overlap).
 *
 * Scoped to src/**\/*.tsx:
 *   - better-tailwindcss: unregistered/conflicting classes + consistent order,
 *     resolved against the Tailwind v4 entry point (src/app/globals.css) so
 *     @theme tokens and @utility definitions are recognized.
 *   - eslint-plugin-tailwindcss: no-arbitrary-value (better-tailwindcss has
 *     no equivalent rule); arbitrary values must be design tokens instead.
 *
 * Run with: pnpm lint:tw
 */
import tsParser from "@typescript-eslint/parser";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import tailwindcss from "eslint-plugin-tailwindcss";

export default [
  {
    files: ["src/**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "better-tailwindcss": betterTailwindcss,
      tailwindcss,
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "src/app/globals.css",
      },
      tailwindcss: {
        cssConfigPath: "src/app/globals.css",
      },
    },
    rules: {
      "better-tailwindcss/no-unregistered-classes": "error",
      "better-tailwindcss/no-conflicting-classes": "error",
      "better-tailwindcss/enforce-consistent-class-order": "error",
      "tailwindcss/no-arbitrary-value": "error",
    },
  },
];
