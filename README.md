# briansonderen.com

Personal portfolio. Next.js (App Router) + TypeScript, exported as a **fully static site**
and served by nginx from my home server via Coolify.

## Where things live

```
lib/site.ts            Name, links, bio, skills, experience, education: edit this first
content/projects/*.mdx One file per project: frontmatter for cards, MDX body for the case study
app/page.tsx           Homepage (hero, featured work, more projects, about, experience, contact, bonus stage)
app/projects/          /projects and /projects/[slug] case studies
app/resume/            HTML resume, also the source for the PDF
components/            ProjectCard, ProjectVisual, JamWizardEmbed, icons
public/                Images, og.png, favicon, Brian_Sonderen_Resume.pdf
```

### Adding a project
Copy an existing `.mdx` in `content/projects/`. `featured: true` puts it in the big
alternating list on the homepage, `order` sorts it. Optional frontmatter: `demo`, `github`
(string or [backend, frontend]), `image`, `highlights`, `playtest` (shows "Request playtest"),
and `links` (extra buttons).

## Develop
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
```

## Resume PDF
The PDF is printed from `/resume` (print styles in `app/globals.css`), so it never contains
my street address or phone number. After editing resume content:
```bash
npm run build && npx serve out -l 4173 &
google-chrome --headless=new --no-pdf-header-footer \
  --print-to-pdf=public/Brian_Sonderen_Resume.pdf http://localhost:4173/resume/
pdfinfo public/Brian_Sonderen_Resume.pdf | grep Pages   # keep it at 1
```

## Deploy
Coolify app **"Portfolio"** builds the `Dockerfile` (Node build stage, then nginx) from `main`.
Domains: `briansonderen.com` and `www.` (nginx redirects www to the apex). Cloudflare Tunnel
terminates TLS. To redeploy, push to `main` and hit Deploy in Coolify, or call
`POST /api/v1/deploy` with `{"uuid":"wrqsebqqs9awlnqkhb3h9nbe"}`.
