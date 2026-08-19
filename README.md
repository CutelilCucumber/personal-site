# personal site

Personal website and developer portfolio. Built with Next.js (App Router) and
TypeScript. Mostly static — no database, no auth, no CMS.

## Structure

```
app/                  Routes (file-based)
  page.tsx            Homepage
  projects/           /projects and /projects/[slug]
  now/, about/,
  resume/, contact/   Static pages
content/projects/      One .mdx file per project (frontmatter + case study)
lib/projects.ts        Reads and types the files in content/projects/
components/            Shared UI (ProjectCard, etc.)
types/project.ts        Project type definition
```

## Blog

`/blog` is reverse-proxied (see `next.config.js`) to a separate, existing
full-stack blog app. This site doesn't host blog content directly.

Set `BLOG_APP_ORIGIN` to the blog app's deployed URL before going live.

## Adding a project

Add a new `.mdx` file to `content/projects/`, using the existing files as a
template for the frontmatter fields (`slug`, `title`, `summary`, `techStack`,
`github`, `demo`, `featured`, `order`). The case study is written in the MDX
body below the frontmatter.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Deployed on Vercel.
