import Link from 'next/link';
import JamWizardEmbed from '@/components/JamWizardEmbed';
import ProjectCard, { FeaturedProject } from '@/components/ProjectCard';
import { FileIcon, GitHubIcon, LinkedInIcon, MailIcon } from '@/components/Icons';
import { getFeaturedProjects, getOtherProjects } from '@/lib/projects';
import { ABOUT, EDUCATION, EXPERIENCE, SITE, SKILLS } from '@/lib/site';

const STATS = [
  { value: '4', label: 'apps live on hardware I run' },
  { value: '175k+', label: 'matches indexed by Replay Radar' },
  { value: '44k', label: 'lines of GDScript in Jam Wizard' },
  { value: '0', label: 'open inbound ports on my server' },
];

function SectionHead({ n, label, title }: { n: string; label: string; title: string }) {
  return (
    <header className="section-head">
      <p className="eyebrow">
        {n} // {label}
      </p>
      <h2>{title}</h2>
    </header>
  );
}

export default function HomePage() {
  const featured = getFeaturedProjects();
  const others = getOtherProjects();

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow blink-soft">Player 1 · ready</p>
          <h1>
            {SITE.name}
            <span className="hero-role">{SITE.role}</span>
          </h1>
          <p className="hero-tagline">{SITE.tagline}</p>
          <p className="hero-intro">{SITE.intro}</p>
          <div className="hero-cta">
            <a className="btn btn-primary btn-lg" href="#work">
              See my work
            </a>
            <Link className="btn btn-lg" href="/resume/">
              <FileIcon size={18} /> Resume
            </Link>
            <a className="btn btn-icon" href={SITE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
            {SITE.linkedin && (
              <a className="btn btn-icon" href={SITE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
            )}
            <a className="btn btn-icon" href={`mailto:${SITE.email}`} aria-label="Email">
              <MailIcon />
            </a>
          </div>
          <Link href="/projects/jam-wizard/" className="achievement">
            <span className="achievement-icon" aria-hidden>
              ★
            </span>
            <span>
              <span className="achievement-label">Achievement unlocked</span>
              People&apos;s Choice, DevX San Diego Game Jam 2026
            </span>
          </Link>
          <p className="open-to">
            <span className="dot" aria-hidden /> {SITE.openTo}
          </p>
        </div>
        <div className="hero-portrait">
          <div className="portrait-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/headshot.webp" alt={`Portrait of ${SITE.name}`} width={480} height={480} />
          </div>
          <p className="portrait-caption">{SITE.location}</p>
        </div>
      </section>

      <section className="stats" aria-label="At a glance">
        {STATS.map((s) => (
          <div key={s.label} className="stat">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      <section id="work" className="section">
        <SectionHead n="01" label="Featured work" title="Things I've built and shipped" />
        <div className="featured-list">
          {featured.map((p, i) => (
            <FeaturedProject key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead n="02" label="More projects" title="Smaller builds & client work" />
        <div className="card-grid">
          {others.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <p className="more-link">
          Everything else is on{' '}
          <a href={SITE.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          .
        </p>
      </section>

      <section id="about" className="section about">
        <SectionHead n="03" label="About" title="A bit about me" />
        <div className="about-grid">
          <div className="prose">
            {ABOUT.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="skills">
            {SKILLS.map((g) => (
              <div key={g.group} className="skill-group">
                <h3>{g.group}</h3>
                <ul className="tech-list">
                  {g.items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section">
        <SectionHead n="04" label="Experience" title="Where I've worked" />
        <ol className="timeline">
          {EXPERIENCE.map((r) => (
            <li key={r.title + r.org}>
              <div className="tl-head">
                <h3>
                  {r.title} <span className="tl-org">· {r.org}</span>
                </h3>
                <span className="meta">{r.dates}</span>
              </div>
              <p className="meta">{r.place}</p>
              <ul>
                {r.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <h3 className="sub-head">Education</h3>
        <div className="edu-grid">
          {EDUCATION.map((e) => (
            <div key={e.title} className="edu">
              <p className="meta">{e.dates}</p>
              <h4>{e.title}</h4>
              <p className="tl-org">
                {e.org} · {e.place}
              </p>
              <p>{e.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact">
        <div className="contact-box">
          <p className="eyebrow">05 // Contact</p>
          <h2>Let&apos;s work together</h2>
          <p>
            I&apos;m looking for my first full-time engineering role. If you&apos;re hiring, or just want to talk about something I
            built, my inbox is open.
          </p>
          <div className="hero-cta center">
            <a className="btn btn-primary btn-lg" href={`mailto:${SITE.email}`}>
              <MailIcon size={18} /> {SITE.email}
            </a>
            {SITE.linkedin && (
              <a className="btn btn-lg" href={SITE.linkedin} target="_blank" rel="noreferrer">
                <LinkedInIcon size={18} /> LinkedIn
              </a>
            )}
            <Link className="btn btn-lg" href="/resume/">
              <FileIcon size={18} /> Resume
            </Link>
          </div>
        </div>
      </section>

      <section className="section arcade" aria-label="Playable Jam Wizard demo">
        <p className="eyebrow center">Bonus stage · insert coin</p>
        <h2 className="center">Play something I made</h2>
        <div className="cabinet">
          <JamWizardEmbed />
        </div>
      </section>
    </>
  );
}
