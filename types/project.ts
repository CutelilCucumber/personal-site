export interface ProjectFrontmatter {
  slug: string;
  title: string;
  summary: string; // one-liner for cards
  role?: string; // e.g. "Solo · full-stack"
  status?: string; // e.g. "Live", "In development", "Invite-only playtest"
  year: string;
  techStack: string[];
  highlights?: string[]; // 2–4 resume-style bullets for cards
  github?: string | string[];
  demo?: string;
  playtest?: boolean; // gated build: show a "Request playtest" button instead of "Live"
  links?: { label: string; url: string }[]; // extra outbound links
  image?: string; // path under /public
  imageAlt?: string;
  featured: boolean;
  order: number;
}

export interface Project extends ProjectFrontmatter {
  content: string; // raw MDX body, compiled at render time
}
