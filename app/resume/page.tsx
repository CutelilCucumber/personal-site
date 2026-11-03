import { getFeaturedProjects } from '@/lib/projects';
import { EDUCATION, EXPERIENCE, SITE, SKILLS } from '@/lib/site';
import { FileIcon } from '@/components/Icons';

export const metadata = { title: 'Resume' };

// Rendered as a normal page AND printed to /Brian_Sonderen_Resume.pdf
// by `npm run resume-pdf` (print styles live in globals.css).
export default function ResumePage() {
  // Bot Shots stays on the site but is left off the one-page PDF.
  const projects = getFeaturedProjects()
    .filter((p) => p.slug !== 'bot-shots')
    .slice(0, 3);
  const host = SITE.url.replace(/^https?:\/\//, '');
  const gh = SITE.github.replace(/^https?:\/\//, '');
  const li = SITE.linkedin.replace(/^https?:\/\/(www\.)?/, '');

  return (
    <div className="section page resume-page">
      <div className="resume-actions no-print">
        <a className="btn btn-primary" href={SITE.resumePdf} download>
          <FileIcon size={16} /> Download PDF
        </a>
      </div>

      <article className="resume">
        <header className="r-head">
          <h1>{SITE.name}</h1>
          <p className="r-contact">
            {SITE.location} · <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · <a href={SITE.url}>{host}</a> ·{' '}
            <a href={SITE.github}>{gh}</a>
            {SITE.linkedin && (
              <>
                {' '}
                · <a href={SITE.linkedin}>{li}</a>
              </>
            )}
          </p>
        </header>

        <section>
          <h2>Summary</h2>
          <p>
            Computer Science graduate and self-directed software developer who builds and self-hosts full-stack web apps,
            browser games, and technical tools end to end. Comfortable debugging unfamiliar systems, working against
            third-party APIs, and running Linux infrastructure. Uses AI coding agents daily to research, prototype, and
            ship faster.
          </p>
        </section>

        <section>
          <h2>Skills</h2>
          <dl className="r-skills">
            {SKILLS.map((g) => (
              <div key={g.group}>
                <dt>{g.group}:</dt> <dd>{g.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2>Projects</h2>
          {projects.map((p) => (
            <div key={p.slug} className="r-item">
              <div className="r-row">
                <h3>
                  {p.title}
                  {(p.demo ?? p.links?.[0]?.url) && (
                    <span className="r-link"> — {(p.demo ?? p.links![0].url).replace(/^https?:\/\//, '')}</span>
                  )}
                </h3>
                <span>{p.year}</span>
              </div>
              <p className="r-sub">{p.techStack.join(' · ')}</p>
              <ul>
                {(p.highlights ?? []).slice(0, 3).map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Experience</h2>
          {/* The self-directed role is already covered by the Projects section above. */}
          {EXPERIENCE.filter((r) => !r.org.startsWith('Self')).map((r) => (
            <div key={r.title + r.org} className="r-item">
              <div className="r-row">
                <h3>
                  {r.title} · {r.org}
                </h3>
                <span>
                  {r.place} · {r.dates}
                </span>
              </div>
              <ul>
                {(r.resumeBullets ?? r.bullets).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Education</h2>
          {EDUCATION.map((e) => (
            <div key={e.title} className="r-item">
              <div className="r-row">
                <h3>
                  {e.title} · {e.org} <span className="r-link no-print">— {e.note}</span>
                </h3>
                <span>{e.dates}</span>
              </div>
            </div>
          ))}
        </section>
      </article>
    </div>
  );
}
