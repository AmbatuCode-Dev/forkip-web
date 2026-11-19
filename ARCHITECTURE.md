# Architecture

This document describes the structure, conventions, and tooling of `forkip-web`.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack, `cacheComponents`, `partialPrefetching`)
- **UI & Styling**: React 19, Tailwind CSS v4 (`@tailwindcss/turbopack`), `class-variance-authority` (`cva`), `clsx`, `tailwind-merge`
- **Language & Validation**: TypeScript 5 (`strict: true`), Zod v4
- **Code Quality**: Biome (linting, formatting, import sorting), Lefthook (Git hooks)
- **Testing**: Vitest + jsdom + Testing Library (unit/component), Playwright (E2E)
- **CI**: GitHub Actions (`.github/workflows/ci.yml`)

## Directory Layout

```text
.
├── .github/
│   ├── rulesets/
│   │   └── protect-main.json  # GitHub branch ruleset template for main
│   └── workflows/
│       └── ci.yml             # CI pipeline (quality + Playwright E2E)
├── e2e/
│   └── home.spec.ts           # Playwright end-to-end specs
├── public/                    # Static assets served from /
├── scripts/
│   └── protect-main.mjs       # Local pre-commit/pre-push main branch guard
├── src/
│   ├── app/                   # Thin App Router routes, layouts, boundaries
│   │   ├── error.tsx          # Client error boundary
│   │   ├── globals.css        # Tailwind v4 entry + semantic CSS theme tokens
│   │   ├── layout.tsx         # Root layout (Geist fonts, metadata, shell)
│   │   ├── loading.tsx        # Route loading skeleton
│   │   ├── not-found.tsx      # 404 boundary page
│   │   ├── page.tsx           # Home route (/) — renders HomeOverview
│   │   └── provider.tsx       # Central client provider boundary
│   ├── components/
│   │   ├── layout/            # App-wide shell (SiteHeader, SiteFooter)
│   │   └── ui/                # Shared UI primitives (Button with cva, Card)
│   ├── config/
│   │   ├── env.ts             # Zod environment schema and parseEnv helper
│   │   └── site.ts            # Site metadata and navigation config
│   ├── features/
│   │   └── home/              # Home feature module
│   │       ├── components/    # Feature-scoped components (HomeOverview)
│   │       ├── index.ts       # Public barrel — the only supported import path
│   │       └── types/         # Feature-scoped TypeScript types
│   ├── hooks/
│   │   └── use-mounted.ts     # Shared React hooks (useSyncExternalStore)
│   ├── testing/
│   │   └── test-utils.tsx     # Shared Vitest + Testing Library helpers
│   ├── types/
│   │   └── index.ts           # Shared TypeScript interfaces
│   └── utils/
│       └── cn.ts              # cn() class-merging helper
├── biome.json                 # Biome formatter, linter, and import rules
├── lefthook.yml               # Git pre-commit and pre-push hooks
├── next.config.ts             # Next.js configuration
├── playwright.config.ts       # Playwright E2E configuration
├── tsconfig.json              # TypeScript configuration (@/* -> ./src/*)
├── vitest.config.mts          # Vitest + React + jsdom configuration
└── vitest.setup.ts            # Vitest setup (jest-dom matchers)
```

## Layering & Boundaries

Dependencies flow in one direction only:

```text
src/app (routes) → src/features/* (barrels) → shared layers (components, config, hooks, testing, types, utils)
```

Biome enforces this with `noRestrictedImports` overrides in `biome.json`.

1. **Routing & Shell (`src/app/`)**
   - Routes stay thin: App Router pages compose feature modules and never contain business logic.
   - `src/app/page.tsx` renders `HomeOverview` from `@/features/home`; `src/app/provider.tsx` is the central client provider boundary.
   - Routes default to React Server Components. Client boundaries (`"use client"`) are pushed down to interactive leaves or required boundaries such as `src/app/error.tsx`.
   - `src/app/layout.tsx` uses Next.js 16 `LayoutProps<"/">`, loads `Geist` and `Geist_Mono` via `next/font/google`, and wraps pages in `<AppProvider />`, `<SiteHeader />`, `<main>`, and `<SiteFooter />`.
   - Route-level resilience is handled by `loading.tsx`, `not-found.tsx`, and `error.tsx`.

2. **Features (`src/features/`)**
   - Self-contained feature modules (e.g. `src/features/home/`) with `components/`, `types/`, and a public barrel `index.ts`.
   - Other layers import features only through the public barrel (`@/features/home`), never via deep paths; Biome blocks deep feature imports from `src/app/**` and between features.
   - Features may import shared layers but never `@/app/*`.

3. **UI Primitives & Layout (`src/components/`)**
   - `src/components/ui/` holds stateless, composable primitives (`Button`, `Card`).
   - Variant-driven components use `cva` from `class-variance-authority` combined with `cn()` from `src/utils/cn.ts` so callers can override classes safely without Tailwind conflicts.
   - `src/components/layout/` holds structural shell components (`SiteHeader`, `SiteFooter`) driven by `siteConfig`.

4. **Configuration & Environment (`src/config/`)**
   - `src/config/site.ts` centralizes application name, description, and navigation items typed against `SiteConfig` in `src/types/index.ts`.
   - `src/config/env.ts` validates environment variables with Zod (`NODE_ENV`, `NEXT_PUBLIC_APP_URL`) and exports both `env` and a pure `parseEnv(input)` helper for deterministic testing.

5. **Shared Layers (`src/hooks/`, `src/testing/`, `src/types/`, `src/utils/`)**
   - `src/hooks/` holds shared React hooks (`useMounted` via `useSyncExternalStore`).
   - `src/testing/test-utils.tsx` re-exports Testing Library and provides `renderWithProviders` so future context providers can be added in one place.
   - `src/utils/cn.ts` holds the `cn()` class-merging helper.
   - Shared layers may never import from `@/features/*` or `@/app/*`.

6. **Theming & Styling (`src/app/globals.css`)**
   - Semantic CSS custom properties (`--background`, `--foreground`, `--surface`, `--muted`, `--border`, `--primary`, `--accent`, `--destructive`, `--ring`, `--radius`) are defined on `:root`, `@media (prefers-color-scheme: dark)`, and `.dark`.
   - `@theme inline` maps those variables to Tailwind v4 utility tokens (`bg-background`, `text-foreground`, `bg-surface`, `border-border`, etc.).

## Testing Strategy

- **Unit & Component Tests (`Vitest` + `Testing Library`)**:
  - Co-located under `__tests__/` directories (`src/utils/__tests__/`, `src/config/__tests__/`, `src/components/ui/__tests__/`, and inside feature modules).
  - Shared helpers live in `src/testing/test-utils.tsx` (`renderWithProviders`).
  - Configured in `vitest.config.mts` with `jsdom`, native `resolve.tsconfigPaths`, and `@testing-library/jest-dom/vitest` in `vitest.setup.ts`.
  - `e2e/**` is excluded from Vitest.
- **End-to-End Tests (`Playwright`)**:
  - Located in `e2e/` and configured in `playwright.config.ts` targeting Chromium.
  - Runs against `pnpm dev --port 3000` locally and `pnpm start --port 3000` in CI (`CI=true`).

## Quality Gates & Automation

- **Local Git Hooks (`lefthook.yml`)**:
  - `pre-commit`: blocks direct commits to `main` (`scripts/protect-main.mjs commit`), runs Biome (`biome check --write` with `stage_fixed: true`) on staged files, and runs `pnpm typecheck` (`next typegen && tsc --noEmit`) in parallel.
  - `pre-push`: blocks direct pushes to `main` (`scripts/protect-main.mjs push`) and runs `pnpm test` (`vitest run`).
- **CI Pipeline (`.github/workflows/ci.yml`)**:
  - `quality` job: `pnpm lint` -> `pnpm typecheck` -> `pnpm test` -> `pnpm build`, uploading `.next` as an artifact.
  - `e2e` job: downloads `.next`, installs Playwright Chromium, and runs `pnpm test:e2e` against the production server.
- **GitHub Branch Ruleset (`.github/rulesets/protect-main.json`)**:
  - Protects `refs/heads/main` against deletion and non-fast-forward pushes, requires pull requests with 1 approving review and resolved threads, and requires both CI status checks (`Lint, Typecheck, Unit Tests & Build` and `Playwright E2E`).
  - Apply once a GitHub remote is linked via `gh api repos/{owner}/{repo}/rulesets --method POST --input .github/rulesets/protect-main.json`.
