import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site";

const quickStartCommands = [
  {
    command: "pnpm dev",
    description: "Start the local Next.js development server with Turbopack.",
  },
  {
    command: "pnpm test",
    description: "Run the Vitest unit and component test suite.",
  },
  {
    command: "pnpm lint",
    description: "Run Biome lint, formatting, and import checks.",
  },
  {
    command: "pnpm typecheck",
    description: "Verify TypeScript types across the project.",
  },
] as const;

const projectDirectories = [
  {
    path: "src/app",
    description:
      "App Router routes, layouts, global styles, and boundary pages.",
  },
  {
    path: "src/components",
    description: "Reusable UI primitives and shared layout components.",
  },
  {
    path: "src/lib",
    description: "Shared utilities, helpers, and framework-agnostic logic.",
  },
  {
    path: "src/config",
    description:
      "Site metadata, navigation links, and environment configuration.",
  },
  {
    path: "src/hooks",
    description: "Custom React hooks for client-side state and browser APIs.",
  },
] as const;

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-12 sm:px-6 sm:py-16">
      <section className="flex flex-col gap-4 border-b border-border pb-10">
        <p className="font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">
          Next.js 16 · React 19 · Tailwind CSS v4
        </p>
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {siteConfig.name}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          {siteConfig.description}
        </p>
      </section>

      <section
        aria-labelledby="quick-start-heading"
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <h2
            id="quick-start-heading"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Quick start
          </h2>
          <p className="text-sm text-muted-foreground">
            Common scripts for local development and verification.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {quickStartCommands.map((item) => (
            <Card key={item.command}>
              <CardHeader className="pb-3">
                <CardTitle className="font-mono text-sm font-semibold">
                  <code>{item.command}</code>
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="structure-heading"
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <h2
            id="structure-heading"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Project structure
          </h2>
          <p className="text-sm text-muted-foreground">
            Core directories under{" "}
            <code className="font-mono text-foreground">src/</code>.
          </p>
        </div>

        <Card>
          <CardContent className="divide-y divide-border p-0">
            {projectDirectories.map((dir) => (
              <div
                key={dir.path}
                className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <code className="w-40 shrink-0 font-mono text-sm font-medium text-foreground">
                  {dir.path}
                </code>
                <p className="text-sm text-muted-foreground">
                  {dir.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
