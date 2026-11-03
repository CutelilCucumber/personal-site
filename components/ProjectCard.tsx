import Link from 'next/link';
import type { Project } from '@/types/project';
import { githubLinks } from '@/lib/projects';
import { SITE } from '@/lib/site';
import ProjectVisual from './ProjectVisual';
import { ArrowIcon, ExternalIcon, GitHubIcon, MailIcon } from './Icons';

const playtestHref = (p: Project) =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(p.title + ' playtest')}`;

function StatusPill({ status }: { status?: string }) {
  if (!status) return null;
  const live = /live|production/i.test(status);
  return <span className={`pill ${live ? 'pill-live' : 'pill-wip'}`}>{status}</span>;
}

export function TechList({ items }: { items: string[] }) {
  return (
    <ul className="tech-list">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

export function ProjectLinks({ project, caseStudy = true }: { project: Project; caseStudy?: boolean }) {
  const gh = githubLinks(project);
  return (
    <div className="project-links">
      {project.demo && (
        <a className="btn btn-primary" href={project.demo} target="_blank" rel="noreferrer">
          <ExternalIcon size={16} /> Live
        </a>
      )}
      {project.playtest && (
        <a className="btn btn-primary" href={playtestHref(project)}>
          <MailIcon size={16} /> Request playtest
        </a>
      )}
      {project.links?.map((l) => (
        <a key={l.url} className="btn" href={l.url} target="_blank" rel="noreferrer">
          <ExternalIcon size={16} /> {l.label}
        </a>
      ))}
      {gh.map((url, i) => (
        <a key={url} className="btn" href={url} target="_blank" rel="noreferrer">
          <GitHubIcon size={16} /> {gh.length > 1 ? (i === 0 ? 'Backend' : 'Frontend') : 'Code'}
        </a>
      ))}
      {caseStudy && (
        <Link className="btn btn-ghost" href={`/projects/${project.slug}/`}>
          Case study <ArrowIcon size={16} />
        </Link>
      )}
    </div>
  );
}

export function FeaturedProject({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`featured ${index % 2 ? 'featured-flip' : ''}`}>
      <Link href={`/projects/${project.slug}/`} className="featured-visual" tabIndex={-1} aria-hidden>
        <ProjectVisual project={project} />
      </Link>
      <div className="featured-body">
        <div className="meta-row">
          <StatusPill status={project.status} />
          <span className="meta">{project.role}</span>
        </div>
        <h3>
          <Link href={`/projects/${project.slug}/`}>{project.title}</Link>
        </h3>
        <p className="summary">{project.summary}</p>
        {project.highlights && (
          <ul className="highlights">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}
        <TechList items={project.techStack} />
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const gh = githubLinks(project);
  return (
    <article className="card">
      <Link href={`/projects/${project.slug}/`} className="card-visual" tabIndex={-1} aria-hidden>
        <ProjectVisual project={project} />
      </Link>
      <div className="card-body">
        <div className="meta-row">
          <StatusPill status={project.status} />
          <span className="meta">{project.year}</span>
        </div>
        <h3>
          <Link href={`/projects/${project.slug}/`}>{project.title}</Link>
        </h3>
        <p>{project.summary}</p>
        <TechList items={project.techStack} />
        <div className="card-links">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer">
              <ExternalIcon size={14} /> Live
            </a>
          )}
          {project.playtest && (
            <a href={playtestHref(project)}>
              <MailIcon size={14} /> Request playtest
            </a>
          )}
          {gh[0] && (
            <a href={gh[0]} target="_blank" rel="noreferrer">
              <GitHubIcon size={14} /> Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
