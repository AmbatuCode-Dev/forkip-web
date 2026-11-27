## Workflow rules

- Ask before assuming: if there is any ambiguity in a request, no matter how small, ask the user for clarification before acting.
- Every change must be approved by the user: present the proposed (or actual) diff and get explicit approval before considering any change done.
- New feature = new branch: always create a new branch before starting work on a new feature, cut from `dev`, named `feat/<name>` (e.g. `feat/login-page`). Never work on features directly on `dev` or `main`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
