export interface ProjectFrontmatter {
  slug: string;
  title: string;
  summary: string; // one-liner for cards/homepage
  problem: string; // short "why this exists" line
  techStack: string[];
  github: string;
  demo?: string;
  featured: boolean;
  order: number;
}

export interface Project extends ProjectFrontmatter {
  content: string; // raw MDX body, compiled at render time
}
