import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import ProjectVisual from '@/components/ProjectVisual';
import { ProjectLinks, TechList } from '@/components/ProjectCard';
import { getAllProjects, getProjectBySlug, getProjectSlugs } from '@/lib/projects';

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: project.title,
    description: project.summary,
    openGraph: project.image ? { images: [project.image] } : undefined,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const all = getAllProjects();
  const i = all.findIndex((p) => p.slug === project.slug);
  const next = all[(i + 1) % all.length];

  return (
    <article className="section page case">
      <Link href="/#work" className="back">
        ← All work
      </Link>
      <header className="case-head">
        <p className="eyebrow">
          {project.status} · {project.year}
        </p>
        <h1>{project.title}</h1>
        <p className="lede">{project.summary}</p>
        <dl className="case-meta">
          {project.role && (
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
          )}
          <div>
            <dt>Stack</dt>
            <dd>
              <TechList items={project.techStack} />
            </dd>
          </div>
        </dl>
        <ProjectLinks project={project} caseStudy={false} />
      </header>

      <div className="case-visual">
        <ProjectVisual project={project} />
      </div>

      <div className="prose case-body">
        <MDXRemote source={project.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </div>

      <nav className="case-next" aria-label="Next project">
        <span className="meta">Next project</span>
        <Link href={`/projects/${next.slug}/`}>{next.title} →</Link>
      </nav>
    </article>
  );
}
