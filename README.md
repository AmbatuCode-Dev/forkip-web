![FORKIP UNJ — Portal Informasi & Layanan KIP-K UNJ](docs/assets/readme-header.svg)

# forkip-web

Next.js 16 App Router site for Forum KIP-K UNJ with TypeScript, Tailwind CSS v4, GSAP/Lenis motion, local MDX site content validated by Zod, feature-based architecture, Biome, Vitest, Playwright, and Lefthook.

> Regenerate the header after brand or layout changes: `node scripts/generate-readme-header.mjs` (preview: `node scripts/render-svg-preview.mjs`).

See [ARCHITECTURE.md](./ARCHITECTURE.md) for architectural conventions, module boundaries, and design decisions.
See [content/README.md](./content/README.md) for how site content is organised and edited. Decisions are recorded in [docs/adr/](./docs/adr/).

## Stack

- **Framework:** Next.js 16 (App Router) & React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 with `class-variance-authority` (`cva`), `clsx`, and `tailwind-merge`
- **Validation:** Zod v4
- **Content:** MDX files in `content/` with Zod-validated frontmatter and server-only loaders
- **Motion:** GSAP ScrollTrigger and Lenis smooth scrolling
- **Testing:** Vitest & Testing Library (`jsdom`), Playwright (E2E)
- **Linting & Formatting:** Biome (`@biomejs/biome`)
- **Git Hooks:** Lefthook (`lefthook`)

## Getting Started

Copy `.env.example` to `.env.local` if you need local overrides, install dependencies (which runs Lefthook's postinstall hook setup), and start the dev server:

```bash
pnpm install
pnpm dev
```

## Scripts

| Script                 | Description                                                |
| ---------------------- | ---------------------------------------------------------- |
| `pnpm dev`             | Start the Next.js development server                       |
| `pnpm build`           | Validate content files and create a production build       |
| `pnpm start`           | Start the production server                                |
| `pnpm lint`            | Run Biome lint, format, and import checks                  |
| `pnpm lint:fix`        | Run Biome checks and apply safe fixes                      |
| `pnpm lint:css`        | Lint `src/app/globals.css` with stylelint                  |
| `pnpm lint:tw`         | Lint Tailwind classes in `src` with ESLint                 |
| `pnpm depcruise`       | Check architecture dependency rules                        |
| `pnpm check:structure` | Run the feature-structure and route gate                   |
| `pnpm typecheck`       | Generate Next.js types and run TypeScript (`tsc --noEmit`) |
| `pnpm format`          | Format files with Biome                                    |
| `pnpm format:check`    | Check formatting with Biome                                |
| `pnpm test`            | Run unit tests once with Vitest                            |
| `pnpm test:watch`      | Run Vitest in watch mode                                   |
| `pnpm test:coverage`   | Run unit tests with coverage                               |
| `pnpm test:e2e`        | Run Playwright end-to-end tests                            |
| `pnpm test:e2e:ui`     | Open Playwright interactive UI test runner                 |
| `pnpm hooks:install`   | Install Lefthook git hooks                                 |

## Git Hooks & Branch Protection

Managed by [Lefthook](./lefthook.yml):

- **`pre-commit`** (parallel): Blocks direct commits to `main` (`scripts/protect-main.mjs commit`), runs Biome (`biome check --write` with `stage_fixed: true`) on staged JS/TS/JSON/CSS files, lints staged CSS and TSX, and runs `pnpm typecheck`.
- **`pre-push`**: Blocks direct pushes to `main` (`scripts/protect-main.mjs push`) and runs `pnpm test`, `pnpm depcruise`, and `pnpm check:structure`.

### GitHub Branch Ruleset

Once a GitHub remote is linked, apply the `main` branch ruleset template in [`.github/rulesets/protect-main.json`](./.github/rulesets/protect-main.json) using the GitHub CLI:

```bash
gh api repos/{owner}/{repo}/rulesets --method POST --input .github/rulesets/protect-main.json
```

This enforces pull requests (1 approving review, stale review dismissal, resolved review threads), blocks branch deletion and force-pushes, and requires the `Lint, Typecheck, Unit Tests & Build` and `Playwright E2E` CI checks.

## Project Structure

```text
content/            # Site content as MDX with frontmatter (see content/README.md)
docs/adr/           # Architecture decision records
e2e/                # Playwright end-to-end test specs
src/
├── app/            # Thin App Router routes, layouts, providers, boundaries
├── components/     # Shared UI primitives and layout shells
├── config/         # Zod-validated environment config
├── features/       # Self-contained feature modules with public barrels
├── hooks/          # Custom React hooks (e.g. useMounted)
├── instrumentation-client.ts # Records App Router navigation type for Lenis
├── lib/content/    # Server-only MDX loaders and Zod schemas
├── testing/        # Shared Vitest + Testing Library helpers
├── types/          # Shared TypeScript interfaces and types
└── utils/          # Pure shared utilities (e.g. cn)
```

Features are self-contained and imported through their public barrels (`src/features/<name>`); Biome enforces unidirectional imports (`src/app` → `src/features` → shared layers). See [ARCHITECTURE.md](./ARCHITECTURE.md) for details.
