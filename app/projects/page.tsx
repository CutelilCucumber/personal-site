import ProjectCard from '@/components/ProjectCard';
import { getAllProjects } from '@/lib/projects';

export const metadata = { title: 'Projects' };

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <section className="section page">
      <header className="section-head">
        <p className="eyebrow">All projects</p>
        <h1>Projects</h1>
        <p className="lede">Everything I&apos;d want you to look at, with write-ups on how each one was built.</p>
      </header>
      <div className="card-grid">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
