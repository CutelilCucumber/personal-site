import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjectBySlug, getProjectSlugs } from '@/lib/projects';

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  return { title: project ? `${project.title} — Your Name` : 'Project not found' };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article>
      <h1>{project.title}</h1>
      <p>{project.summary}</p>

      <ul className="tech-list">
        {project.techStack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <p>
        <a href={project.github} target="_blank" rel="noreferrer">
          View on GitHub
        </a>
        {project.demo && (
          <>
            {' · '}
            <a href={project.demo} target="_blank" rel="noreferrer">
              Live demo
            </a>
          </>
        )}
      </p>

      <MDXRemote source={project.content} />
    </article>
  );
}
