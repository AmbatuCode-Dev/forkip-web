# Architecture

This document describes the structure, conventions, and tooling of `forkip-web`.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack, `cacheComponents`, `partialPrefetching`)
- **UI & Styling**: React 19, Tailwind CSS v4 (`@tailwindcss/turbopack`), `class-variance-authority` (`cva`), `clsx`, `tailwind-merge`
- **Language & Validation**: TypeScript 5 (`strict: true`), Zod v4
- **Code Quality**: Biome (linting, formatting, import sorting, import boundaries), ESLint (Tailwind class rules), Stylelint (CSS token discipline), dependency-cruiser (layering), ts-morph (structure gate), Lefthook (Git hooks)
- **Testing**: Vitest + jsdom + Testing Library (unit/component), Playwright (E2E)
- **CI**: GitHub Actions (`.github/workflows/ci.yml`)

## Directory Layout

```text
.
├── .github/
│   ├── rulesets/
│   │   └── protect-main.json      # GitHub branch ruleset template for main
│   └── workflows/
│       └── ci.yml                 # CI pipeline (quality gates + Playwright E2E)
├── e2e/                           # Playwright end-to-end specs (one per route)
├── public/                        # Static assets served from /
├── scripts/
│   ├── check-structure.mjs        # ts-morph structure gate (pnpm check:structure)
│   └── protect-main.mjs           # Local pre-commit/pre-push main branch guard
├── src/
│   ├── app/                       # Thin App Router routes, layouts, boundaries
│   │   ├── arsip-data/page.tsx    # /arsip-data route
│   │   ├── berita/page.tsx        # /berita route
│   │   ├── pengunduran-diri/page.tsx # /pengunduran-diri route
│   │   ├── penyewaan/page.tsx     # /penyewaan route
│   │   ├── error.tsx              # Client error boundary ("use client")
│   │   ├── globals.css            # Tailwind v4 entry + semantic CSS theme tokens
│   │   ├── layout.tsx             # Root layout (Plus Jakarta Sans, metadata, shell)
│   │   ├── loading.tsx            # Route loading skeleton
│   │   ├── not-found.tsx          # 404 boundary page
│   │   ├── page.tsx               # Home route (/) — renders BerandaPage
│   │   └── provider.tsx           # Central client provider boundary ("use client")
│   ├── components/
│   │   ├── berita/                # Shared news UI (NewsCard, NewsMarquee, pagination)
│   │   ├── layout/                # App-wide shell (SiteHeader, SiteFooter, PageHero)
│   │   └── ui/                    # Shared UI primitives (Button, Card, accordions)
│   ├── config/
│   │   ├── env.ts                 # Zod environment schema and parseEnv helper
│   │   └── site.ts                # Site metadata and navigation config
│   ├── features/
│   │   ├── arsip-data/            # Archive directory feature
│   │   ├── berita/                # News listing feature
│   │   ├── home/                  # Landing page (Beranda) feature
│   │   ├── pengunduran-diri/      # Resignation letter feature
│   │   └── penyewaan/             # Inventory rental feature
│   │       ├── components/        # Feature-scoped components (+ co-located __tests__/)
│   │       ├── data/              # Feature-scoped static content/data
│   │       ├── index.ts           # Public barrel — the only supported import path
│   │       └── types/             # Feature-scoped TypeScript types
│   ├── testing/
│   │   └── test-utils.tsx         # Shared Vitest + Testing Library helpers (tests only)
│   ├── types/
│   │   └── index.ts               # Shared TypeScript interfaces
│   └── utils/
│       └── cn.ts                  # cn() class-merging helper
├── .dependency-cruiser.cjs        # dependency-cruiser layering rules (pnpm depcruise)
├── .stylelintrc.cjs               # Stylelint config (pnpm lint:css)
├── biome.json                     # Biome formatter, linter, and import-boundary rules
├── eslint.config.mjs              # ESLint Tailwind class gate (pnpm lint:tw)
├── lefthook.yml                   # Git pre-commit and pre-push hooks
├── next.config.ts                 # Next.js configuration
├── playwright.config.ts           # Playwright E2E configuration
├── tsconfig.json                  # TypeScript configuration (@/* -> ./src/*)
├── vitest.config.mts              # Vitest + React + jsdom configuration
└── vitest.setup.ts                # Vitest setup (jest-dom matchers)
```

## Layering & Boundaries

Dependencies flow in one direction only:

```text
src/app (routes) → src/features/* (barrels) → shared layers (components, config, types, utils)
```

Three complementary tools enforce this:

- **Biome** (`biome.json`): `noRestrictedImports` overrides block illegal imports at edit/lint time (per-scope overrides for non-test files, with test files exempt from the `@/testing/*` ban).
- **dependency-cruiser** (`.dependency-cruiser.cjs`, `pnpm depcruise`): verifies the resolved module graph — shared layers never reach features/app, features never reach app, app and cross-feature imports are barrel-only (`$1` backref keeps intra-feature imports legal), and no cycles exist.
- **Structure gate** (`scripts/check-structure.mjs`, `pnpm check:structure`): asserts feature shape and client-boundary placement with ts-morph.

1. **Routing & Shell (`src/app/`)**
   - Routes stay thin: App Router pages compose feature modules and never contain business logic. The structure gate warns on any `page.tsx` longer than 60 lines.
   - `src/app/page.tsx` renders `BerandaPage` from `@/features/home`; the other routes render their feature's view through its barrel. `src/app/provider.tsx` is the central client provider boundary.
   - Routes default to React Server Components. Inside `src/app`, `"use client"` is allowed **only** in `error.tsx` and `provider.tsx` (enforced by the structure gate); interactive leaves elsewhere carry their own directive.
   - `src/app/layout.tsx` uses Next.js 16 `LayoutProps<"/">`, loads `Plus_Jakarta_Sans` via `next/font/google` (exposed as `--font-plus-jakarta-sans`), and wraps pages in `<AppProvider />`, `<SiteHeader />`, `<main>`, and `<SiteFooter />`.
   - Route-level resilience is handled by `loading.tsx`, `not-found.tsx`, and `error.tsx`.

2. **Features (`src/features/`)**
   - Self-contained feature modules (`home`, `berita`, `arsip-data`, `pengunduran-diri`, `penyewaan`) with `components/`, `data/`, `types/`, and a public barrel `index.ts`. The structure gate errors if `index.ts`, `components/`, or `types/` is missing, and warns when a feature has no `__tests__/`.
   - Other layers import features only through the public barrel (`@/features/home`), never via deep paths; Biome and dependency-cruiser block deep feature imports from `src/app/**` and between features. Cross-feature barrel imports remain allowed.
   - Features may import shared layers but never `@/app/*`.

3. **UI Primitives & Layout (`src/components/`)**
   - `src/components/ui/` holds stateless, composable primitives (`Button`, `Card`, accordions). Biome additionally forbids `ui/` from importing `@/config/*`, `@/hooks/*`, `@/features/*`, or `@/app/*` at any depth — primitives receive data via props.
   - Variant-driven components use `cva` from `class-variance-authority` combined with `cn()` from `src/utils/cn.ts` so callers can override classes safely without Tailwind conflicts.
   - `src/components/layout/` holds structural shell components (`SiteHeader`, `SiteFooter`, `PageHero`) driven by `siteConfig`; `src/components/berita/` holds shared news UI used across features.

4. **Configuration & Environment (`src/config/`)**
   - `src/config/site.ts` centralizes application name, description, and navigation items typed against `SiteConfig` in `src/types/index.ts`.
   - `src/config/env.ts` validates environment variables with Zod (`NODE_ENV`, `NEXT_PUBLIC_APP_URL`) and exports both `env` and a pure `parseEnv(input)` helper for deterministic testing.

5. **Shared Layers (`src/testing/`, `src/types/`, `src/utils/`)**
   - `src/testing/test-utils.tsx` re-exports Testing Library and provides `renderWithProviders`. Biome restricts `@/testing/*` imports to test files (`__tests__/` or `*.test.*`); production code must never import it.
   - `src/utils/cn.ts` holds the `cn()` class-merging helper.
   - Shared layers may never import from `@/features/*` or `@/app/*`.
   - A shared `src/hooks/` layer is deliberately absent; the structure gate warns if files appear there. Colocate hooks with the feature or component that uses them.

6. **Theming & Styling (`src/app/globals.css`)**
   - Light-only theme. Semantic CSS custom properties (`--background`, `--foreground`, `--surface`, `--muted`, `--border`, `--primary`, `--accent`, `--destructive`, `--ring`, `--radius`, plus the "Ritme Nusantara" palette) are defined on `:root`.
   - `@theme inline` maps those variables to Tailwind v4 utility tokens (`bg-background`, `text-foreground`, `bg-surface`, `border-border`, etc.); a second `@theme` block holds exact-value design tokens (colors, font sizes, radii, shadows, the marquee animation) migrated from former arbitrary utilities.
   - Custom `@utility` definitions cover layout primitives Tailwind can't express (percentage widths, hero grid templates, radial night background, clamp type, etc.).
   - Stylelint (`pnpm lint:css`) extends `stylelint-config-standard`, tolerates Tailwind v4 at-rules, and requires `var(--*)` for color-ish properties outside the `:root`/`@theme` token-definition blocks.
   - Tailwind class usage in TSX is linted by ESLint (`pnpm lint:tw`): no unregistered or conflicting classes, consistent class order, and no arbitrary values — exact values belong in `@theme` tokens.

## Testing Strategy

- **Unit & Component Tests (`Vitest` + `Testing Library`)**:
  - Co-located under `__tests__/` directories (shared layers and inside feature modules, either at the feature root or within `components/`).
  - Shared helpers live in `src/testing/test-utils.tsx` (`renderWithProviders`).
  - Configured in `vitest.config.mts` with `jsdom`, native `resolve.tsconfigPaths`, and `@testing-library/jest-dom/vitest` in `vitest.setup.ts`.
  - `e2e/**` is excluded from Vitest.
- **End-to-End Tests (`Playwright`)**:
  - Located in `e2e/` (one spec per route) and configured in `playwright.config.ts` targeting Chromium.
  - Runs against `pnpm dev --port 3000` locally and `pnpm start --port 3000` in CI (`CI=true`).

## Quality Gates & Automation

Gate catalog (all must exit 0):

| Command                | Tool                                                        | What it enforces                                                                                                                                                                                     |
| ---------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm lint`            | Biome                                                       | Formatting, lint rules, import sorting, and import boundaries (layering, barrels, UI purity, `@/testing` test-only)                                                                                  |
| `pnpm lint:css`        | Stylelint + `stylelint-declaration-strict-value`            | `src/app/globals.css`: standard rules, Tailwind v4 at-rules tolerated, `var(--*)` required for color-ish properties outside `:root`/`@theme`                                                         |
| `pnpm lint:tw`         | ESLint (`better-tailwindcss` + `eslint-plugin-tailwindcss`) | `src/**/*.tsx`: no unregistered/conflicting classes, consistent class order, no arbitrary values; tokens resolved from `src/app/globals.css`                                                         |
| `pnpm depcruise`       | dependency-cruiser                                          | Resolved module graph: shared ↛ features/app, features ↛ app, barrel-only feature imports, no cycles                                                                                                 |
| `pnpm check:structure` | ts-morph (`scripts/check-structure.mjs`)                    | Feature shape (`index.ts` + `components/` + `types/`), `"use client"` only in `app/error.tsx` & `app/provider.tsx`; warns on `src/hooks` files, `page.tsx` > 60 lines, features without `__tests__/` |
| `pnpm typecheck`       | `next typegen && tsc --noEmit`                              | Type safety                                                                                                                                                                                          |
| `pnpm test`            | Vitest                                                      | Unit & component tests                                                                                                                                                                               |
| `pnpm build`           | Next.js                                                     | Production build                                                                                                                                                                                     |
| `pnpm test:e2e`        | Playwright                                                  | End-to-end tests against the production server                                                                                                                                                       |

- **Local Git Hooks (`lefthook.yml`)**:
  - `pre-commit` (parallel): blocks direct commits to `main` (`scripts/protect-main.mjs commit`), runs Biome (`biome check --write` with `stage_fixed: true`) on staged files, runs `pnpm lint:css` when CSS is staged, `pnpm lint:tw` when TSX is staged, and `pnpm typecheck`.
  - `pre-push`: blocks direct pushes to `main` (`scripts/protect-main.mjs push`), runs `pnpm test` (`vitest run`), `pnpm depcruise`, and `pnpm check:structure`.
- **CI Pipeline (`.github/workflows/ci.yml`)**:
  - `quality` job: `pnpm lint` -> `pnpm lint:css` -> `pnpm lint:tw` -> `pnpm depcruise` -> `pnpm check:structure` -> `pnpm typecheck` -> `pnpm test` -> `pnpm build`, uploading `.next` as an artifact.
  - `e2e` job: downloads `.next`, installs Playwright Chromium, and runs `pnpm test:e2e` against the production server.
- **GitHub Branch Ruleset (`.github/rulesets/protect-main.json`)**:
  - Protects `refs/heads/main` against deletion and non-fast-forward pushes, requires pull requests with 1 approving review and resolved threads, and requires both CI status checks (`Lint, Typecheck, Unit Tests & Build` and `Playwright E2E`).
  - Apply once a GitHub remote is linked via `gh api repos/{owner}/{repo}/rulesets --method POST --input .github/rulesets/protect-main.json`.
