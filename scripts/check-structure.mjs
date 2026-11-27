/**
 * Structural architecture gate (ts-morph).
 *
 * Errors (exit 1):
 *   - Every src/features/<name> must have index.ts, components/ and types/.
 *   - "use client" in src/app is only allowed in error.tsx and provider.tsx.
 *
 * Warnings (non-fatal):
 *   - Any file living in src/hooks (prefer feature/shared-local hooks).
 *   - Any src/app/**\/page.tsx longer than 60 lines (routes must stay thin).
 *   - Any feature without a __tests__/ directory.
 *
 * Run with: pnpm check:structure
 */
import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { Project, SyntaxKind } from "ts-morph";

const root = process.cwd();
const srcDir = path.join(root, "src");
const errors = [];
const warnings = [];

const rel = (p) => path.relative(root, p).replaceAll("\\", "/");
const isDir = (p) => existsSync(p) && statSync(p).isDirectory();

function listDirs(dir) {
  if (!isDir(dir)) return [];
  return readdirSync(dir)
    .map((name) => path.join(dir, name))
    .filter(isDir);
}

function hasTestsDir(dir) {
  if (!isDir(dir)) return false;
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (!statSync(full).isDirectory()) continue;
    if (entry === "__tests__") return true;
    if (hasTestsDir(full)) return true;
  }
  return false;
}

// 1. Feature module structure: index.ts + components/ + types/.
const featuresDir = path.join(srcDir, "features");
for (const featureDir of listDirs(featuresDir)) {
  const name = path.basename(featureDir);
  for (const required of ["index.ts", "components", "types"]) {
    const target = path.join(featureDir, required);
    const ok = required.endsWith(".ts") ? existsSync(target) : isDir(target);
    if (!ok) {
      errors.push(`feature "${name}" is missing ${rel(target)}`);
    }
  }
  if (!hasTestsDir(featureDir)) {
    warnings.push(`feature "${name}" has no __tests__/ directory`);
  }
}

// Parse src once with ts-morph for directive and line-count checks.
const project = new Project({
  tsConfigFilePath: path.join(root, "tsconfig.json"),
  skipAddingFilesFromTsConfig: true,
});
project.addSourceFilesAtPaths(["src/**/*.{ts,tsx}"]);

const allowedClientFiles = new Set([
  "src/app/error.tsx",
  "src/app/provider.tsx",
]);

for (const sourceFile of project.getSourceFiles()) {
  const file = rel(sourceFile.getFilePath());

  // 2. "use client" directive placement inside src/app.
  if (file.startsWith("src/app/")) {
    const first = sourceFile.getStatements()[0];
    const isUseClient =
      first?.getKind() === SyntaxKind.ExpressionStatement &&
      first.getExpression()?.getKind() === SyntaxKind.StringLiteral &&
      first.getExpression().getText() === '"use client"';
    if (isUseClient && !allowedClientFiles.has(file)) {
      errors.push(
        `"use client" is only allowed in src/app/error.tsx and src/app/provider.tsx (found in ${file})`,
      );
    }

    // 3. Thin routes: warn on page.tsx files longer than 60 lines.
    if (file.endsWith("/page.tsx") || file === "src/app/page.tsx") {
      const lines = sourceFile.getEndLineNumber();
      if (lines > 60) {
        warnings.push(`${file} has ${lines} lines (> 60); keep routes thin`);
      }
    }
  }

  // 4. Warn on any shared hooks file.
  if (file.startsWith("src/hooks/")) {
    warnings.push(
      `${file}: shared hooks are discouraged; colocate hooks instead`,
    );
  }
}

for (const warning of warnings) {
  console.warn(`WARN  ${warning}`);
}
for (const error of errors) {
  console.error(`ERROR ${error}`);
}

if (errors.length > 0) {
  console.error(
    `\ncheck:structure failed: ${errors.length} error(s), ${warnings.length} warning(s)`,
  );
  process.exit(1);
}
console.log(`check:structure passed (${warnings.length} warning(s))`);
