# forkip-web

Next.js 16 App Router boilerplate configured with TypeScript, Tailwind CSS v4, Zod environment validation, Biome, Vitest, Playwright, and Lefthook.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for architectural conventions, module boundaries, and design decisions.

## Stack

- **Framework:** Next.js 16 (App Router) & React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 with `class-variance-authority` (`cva`), `clsx`, and `tailwind-merge`
- **Validation:** Zod v4
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

| Script               | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| `pnpm dev`           | Start the Next.js development server                       |
| `pnpm build`         | Create a production build                                  |
| `pnpm start`         | Start the production server                                |
| `pnpm lint`          | Run Biome lint, format, and import checks                  |
| `pnpm lint:fix`      | Run Biome checks and apply safe fixes                      |
| `pnpm typecheck`     | Generate Next.js types and run TypeScript (`tsc --noEmit`) |
| `pnpm format`        | Format files with Biome                                    |
| `pnpm format:check`  | Check formatting with Biome                                |
| `pnpm test`          | Run unit tests once with Vitest                            |
| `pnpm test:watch`    | Run Vitest in watch mode                                   |
| `pnpm test:coverage` | Run unit tests with coverage                               |
| `pnpm test:e2e`      | Run Playwright end-to-end tests                            |
| `pnpm test:e2e:ui`   | Open Playwright interactive UI test runner                 |
| `pnpm hooks:install` | Install Lefthook git hooks                                 |

## Git Hooks

Managed by [Lefthook](./lefthook.yml):

- **`pre-commit`** (parallel): Runs Biome (`biome check --write` with `stage_fixed: true`) on staged JS/TS/JSON/CSS files and runs `pnpm typecheck`.
- **`pre-push`**: Runs `pnpm test` (Vitest unit tests).

## Project Structure

```text
e2e/                # Playwright end-to-end test specs
src/
├── app/            # Next.js App Router pages, layouts, and global styles
├── components/     # Reusable UI components
├── config/         # Site metadata and navigation configuration
├── hooks/          # Custom React hooks (e.g. useMounted)
├── lib/            # Utilities, Zod env validation, and unit tests
└── types/          # Shared TypeScript interfaces and types
```
