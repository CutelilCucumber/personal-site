import Link from 'next/link';
import type { Project } from '@/types/project';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <h3>
        <Link href={`/projects/${project.slug}`}>{project.title}</Link>
      </h3>
      <p>{project.summary}</p>
      <ul className="tech-list">
        {project.techStack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </article>
  );
}
