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
├── .github/workflows/
│   └── ci.yml                 # CI pipeline (quality + Playwright E2E)
├── e2e/
│   └── home.spec.ts           # Playwright end-to-end specs
├── public/                    # Static assets served from /
├── src/
│   ├── app/                   # Next.js App Router routes, layouts, and boundaries
│   │   ├── error.tsx          # Client error boundary
│   │   ├── globals.css        # Tailwind v4 entry + semantic CSS theme tokens
│   │   ├── layout.tsx         # Root layout (Geist fonts, metadata, header/footer shell)
│   │   ├── loading.tsx        # Route loading skeleton
│   │   ├── not-found.tsx      # 404 boundary page
│   │   └── page.tsx           # Home route (/)
│   ├── components/
│   │   ├── layout/            # App-wide shell components (SiteHeader, SiteFooter)
│   │   └── ui/                # Reusable UI primitives (Button with cva, Card)
│   ├── config/
│   │   └── site.ts            # Centralized site metadata and navigation config
│   ├── hooks/
│   │   └── use-mounted.ts     # Client hydration hook via useSyncExternalStore
│   ├── lib/
│   │   ├── env.ts             # Zod environment schema and parseEnv helper
│   │   └── utils.ts           # cn() class-merging helper
│   └── types/
│       └── index.ts           # Shared TypeScript interfaces
├── biome.json                 # Biome formatter, linter, and import organizer config
├── lefthook.yml               # Git pre-commit and pre-push hooks
├── next.config.ts             # Next.js configuration
├── playwright.config.ts       # Playwright E2E configuration
├── tsconfig.json              # TypeScript configuration (@/* -> ./src/*)
└── vitest.config.mts          # Vitest + React + jsdom configuration
```

## Layering & Boundaries

1. **Routing & Shell (`src/app/`)**
   - Routes default to React Server Components. Client boundaries (`"use client"`) are pushed down to interactive leaves or required boundaries such as `src/app/error.tsx`.
   - `src/app/layout.tsx` uses Next.js 16 `LayoutProps<"/">`, loads `Geist` and `Geist_Mono` via `next/font/google`, and wraps pages in `<SiteHeader />`, `<main>`, and `<SiteFooter />`.
   - Route-level resilience is handled by `loading.tsx`, `not-found.tsx`, and `error.tsx`.

2. **UI Primitives & Layout (`src/components/`)**
   - `src/components/ui/` holds stateless, composable primitives (`Button`, `Card`).
   - Variant-driven components use `cva` from `class-variance-authority` combined with `cn()` from `src/lib/utils.ts` so callers can override classes safely without Tailwind conflicts.
   - `src/components/layout/` holds structural shell components (`SiteHeader`, `SiteFooter`) driven by `siteConfig`.

3. **Configuration & Environment (`src/config/`, `src/lib/env.ts`)**
   - `src/config/site.ts` centralizes application name, description, and navigation items typed against `SiteConfig` in `src/types/index.ts`.
   - `src/lib/env.ts` validates environment variables with Zod (`NODE_ENV`, `NEXT_PUBLIC_APP_URL`) and exports both `env` and a pure `parseEnv(input)` helper for deterministic testing.

4. **Theming & Styling (`src/app/globals.css`)**
   - Semantic CSS custom properties (`--background`, `--foreground`, `--surface`, `--muted`, `--border`, `--primary`, `--accent`, `--destructive`, `--ring`, `--radius`) are defined on `:root`, `@media (prefers-color-scheme: dark)`, and `.dark`.
   - `@theme inline` maps those variables to Tailwind v4 utility tokens (`bg-background`, `text-foreground`, `bg-surface`, `border-border`, etc.).

## Testing Strategy

- **Unit & Component Tests (`Vitest` + `Testing Library`)**:
  - Co-located under `__tests__/` directories (`src/lib/__tests__/`, `src/components/ui/__tests__/`).
  - Configured in `vitest.config.mts` with `jsdom`, native `resolve.tsconfigPaths`, and `@testing-library/jest-dom/vitest` in `vitest.setup.ts`.
  - `e2e/**` is excluded from Vitest.
- **End-to-End Tests (`Playwright`)**:
  - Located in `e2e/` and configured in `playwright.config.ts` targeting Chromium.
  - Runs against `pnpm dev --port 3000` locally and `pnpm start --port 3000` in CI (`CI=true`).

## Quality Gates & Automation

- **Local Git Hooks (`lefthook.yml`)**:
  - `pre-commit`: runs Biome (`biome check --write` with `stage_fixed: true`) on staged files and `pnpm typecheck` (`next typegen && tsc --noEmit`) in parallel.
  - `pre-push`: runs `pnpm test` (`vitest run`).
- **CI Pipeline (`.github/workflows/ci.yml`)**:
  - `quality` job: `pnpm lint` -> `pnpm typecheck` -> `pnpm test` -> `pnpm build`, uploading `.next` as an artifact.
  - `e2e` job: downloads `.next`, installs Playwright Chromium, and runs `pnpm test:e2e` against the production server.
