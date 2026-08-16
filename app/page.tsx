import Link from 'next/link';
import { getFeaturedProjects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <section>
        {/* TODO: replace with real intro copy - short, specific, no "passionate developer" language */}
        <h1>Your Name</h1>
        <p>
          I build full-stack web applications with React, TypeScript, and Node.
          This site collects the projects I&apos;ve shipped, what I&apos;m currently working
          on, and things I write about along the way.
        </p>
      </section>

      <section>
        <h2>Featured projects</h2>
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
        <p>
          <Link href="/projects">See all projects &rarr;</Link>
        </p>
      </section>

      <section>
        <h2>Now</h2>
        {/* TODO: pull this from a single "now" data source instead of hardcoding, once decided */}
        <p>
          <Link href="/now">What I&apos;m currently into &rarr;</Link>
        </p>
      </section>

      <section>
        <h2>Recent from the blog</h2>
        {/* TODO: fetch latest post title/link from the blog app once it's deployed at /blog */}
        <p>
          <Link href="/blog">Read the blog &rarr;</Link>
        </p>
      </section>

      <section>
        <h2>Elsewhere</h2>
        <ul>
          <li>
            <a href="https://github.com/REPLACE_ME" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <Link href="/resume">Resume</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </section>
    </>
  );
}
