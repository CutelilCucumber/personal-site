# TODO

Things only Brian can do, in rough priority order.

## Content
- [ ] **Revise the About section** (`lib/site.ts` → `ABOUT`). The "why I built it" reasons there are drafts written for you, so put them in your own words.
- [ ] **Name the Jam Wizard award.** Which jam and which award? Add it to `content/projects/jam-wizard.mdx` (highlights + Origin section) and link the jam page.
- [ ] **Mech game video.** Find the clip you recorded for your talk. Drop it in `public/projects/` (MP4/WebM, under ~10 MB, or put it on YouTube) and I'll wire it into `content/projects/mech-game.mdx` along with 2–3 screenshots.
- [ ] **Mech game name.** It's "Modular Mech Physics Game" for now.

## Jam Wizard
- [ ] **Update the public itch.io build.** The homepage "Bonus stage" embeds the old jam version (upload 19833458). When a newer public demo is ready, either upload it to itch (and update `EMBED_SRC` in `components/JamWizardEmbed.tsx` with the new upload ID) or self-host it at `demo.briansonderen.com`.

## LinkedIn
- [ ] Apply the copy in `~/Documents/Resume and Portfolio/linkedin.md`.

## Maintenance
- After changing the resume content, regenerate the PDF (see README → "Resume PDF") and commit it.

## Infra notes
- The Coolify dashboard is **no longer public**. Open it over Tailscale at http://100.98.115.24:8000 (or http://home-server:8000 with MagicDNS).
  To undo: Coolify → Settings → Instance's Domain. Backup of the old proxy route: `/data/coolify/proxy/dynamic/coolify.yaml.pre-portfolio-*`.
- Make sure your router does **not** forward port 8000 (or 6001/6002) to the server.
