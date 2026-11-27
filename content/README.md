# Content

All public prose and records live in `content/` as MDX files. There is no CMS: edit the files in a local clone and open a pull request.

## Layout

| Path                     | What it holds                                            |
| ------------------------ | -------------------------------------------------------- |
| `site.mdx`               | Site name and description                                |
| `navigation.mdx`         | CTA, route labels, header entries, and footer link lists |
| `faculties/*.mdx`        | One file per faculty                                     |
| `program-unggulan/*.mdx` | `spotlight.mdx` plus one file per program card           |
| `berita/*.mdx`           | One file per news post                                   |
| `home/berita.mdx`        | Beranda news section copy                                |

## Frontmatter

Each file starts with a `---` fenced YAML block; keys are double-quoted. Text after the closing fence is an optional MDX body.

```yaml
---
"order": 1
"code": "FIP"
"name": "Fakultas Ilmu Pendidikan"
"color": "#84BC24"
---
```

Keep **one entry per file**: the path without `.mdx` is its stable ID, for example `berita/gelar-kipk.mdx` maps to `berita/gelar-kipk`. A new file must also be added to `contentFiles` in `src/lib/content/read-mdx.ts` before any loader can read it.

`order` is an integer that sets an entry's position within its collection (faculties, program cards, news posts). Lower numbers come first.

## Editing

1. Clone the repository, create a branch, and edit the relevant file(s).
2. Run `pnpm build` locally and open a pull request.

Zod schemas validate the frontmatter of every allowlisted file **before the build runs**. A missing or invalid field fails the build with the file path and the offending field.
