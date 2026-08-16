import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Project, ProjectFrontmatter } from '@/types/project';

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects');

function readProjectFile(filename: string): Project {
  const filePath = path.join(PROJECTS_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return { ...(data as ProjectFrontmatter), content };
}

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.mdx'));
  const projects = files.map(readProjectFile);
  return projects.sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}
