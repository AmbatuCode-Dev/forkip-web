/**
 * Architecture dependency rules for forkip-web.
 *
 * Layering: src/app (routes) -> src/features/* (public barrels only)
 *           -> shared layers (components, config, hooks, types, utils).
 *
 * Run with: pnpm depcruise
 *
 * @type {import('dependency-cruiser').IConfiguration}
 */
module.exports = {
  forbidden: [
    {
      name: "shared-no-feature-or-app",
      comment:
        "Shared layers (components, config, hooks, types, utils) must not depend on features or app routes.",
      severity: "error",
      from: { path: "^src/(components|config|hooks|types|utils)/" },
      to: { path: "^src/(features|app)/" },
    },
    {
      name: "feature-no-app",
      comment:
        "Features must stay framework-agnostic and never import app routes.",
      severity: "error",
      from: { path: "^src/features/" },
      to: { path: "^src/app/" },
    },
    {
      name: "app-feature-barrel-only",
      comment:
        "App routes may only import a feature through its public barrel (@/features/<name> -> index.ts).",
      severity: "error",
      from: { path: "^src/app/" },
      to: {
        path: "^src/features/[^/]+/.+",
        pathNot: "^src/features/[^/]+/index\\.tsx?$",
      },
    },
    {
      name: "cross-feature-barrel-only",
      comment:
        "Features may only import other features through their public barrel; deep cross-feature imports are forbidden. $1 keeps intra-feature imports legal.",
      severity: "error",
      from: { path: "^src/features/([^/]+)/" },
      to: {
        path: "^src/features/(?!$1/)[^/]+/.+",
        pathNot: "^src/features/[^/]+/index\\.tsx?$",
      },
    },
    {
      name: "no-cycles",
      comment: "Circular dependencies between modules are not allowed.",
      severity: "error",
      from: { path: "^src/" },
      to: { circular: true },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    exclude: { path: "node_modules|\\.next|\\.slim|e2e|__tests__" },
    tsConfig: { fileName: "tsconfig.json" },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default", "types"],
      extensions: [
        ".ts",
        ".tsx",
        ".mts",
        ".cts",
        ".js",
        ".jsx",
        ".mjs",
        ".cjs",
        ".json",
      ],
    },
  },
};
