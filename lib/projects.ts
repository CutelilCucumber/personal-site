import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Project, ProjectFrontmatter } from '@/types/project';

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects');

function readProjectFile(filename: string): Project {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), 'utf8');
  const { data, content } = matter(raw);
  return { ...(data as ProjectFrontmatter), content };
}

export function getAllProjects(): Project[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map(readProjectFile)
    .sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getOtherProjects(): Project[] {
  return getAllProjects().filter((p) => !p.featured);
}

export function getProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function githubLinks(p: Project): string[] {
  if (!p.github) return [];
  return Array.isArray(p.github) ? p.github : [p.github];
}
