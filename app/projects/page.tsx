import { getAllProjects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';

export const metadata = {
  title: 'Projects — Your Name',
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <section>
      <h1>Projects</h1>
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </section>
  );
}
