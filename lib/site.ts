// Single source of truth for personal details used across the site.
// Edit here, not in the page components.

export const SITE = {
  name: 'Brian Sonderen',
  role: 'Software Developer',
  url: 'https://briansonderen.com',
  location: 'Oceanside, CA',
  email: 'sond.brian@gmail.com',
  github: 'https://github.com/CutelilCucumber',
  linkedin: 'https://www.linkedin.com/in/brian-sonderen-389841237/',
  resumePdf: '/Brian_Sonderen_Resume.pdf',
  tagline: 'I build full-stack web apps, browser games, and the servers they run on.',
  intro:
    'Computer Science grad and self-directed developer. I ship projects end to end — schema, API, UI, ' +
    'Docker image, and the Linux box it runs on — and I like the hard part in the middle where the ' +
    'docs run out and you have to figure out how the system actually behaves.',
  openTo: 'Open to junior software engineering, full-stack, and IT / systems roles — on-site in North County San Diego or remote.',
};

export const ABOUT = [
  'I started out doing IT support at a technical academy — imaging machines, wiring up lab networks, refurbishing donated hardware — then went back for an Associate of Science in Computer Science at Clark College, where I worked in C, C++, Python, data structures, and operating systems.',
  'After a few years running mobile event equipment (lots of logistics, troubleshooting in the field, and coaching kids), I committed to software full time: I worked through The Odin Project’s full-stack curriculum and started shipping my own projects instead of tutorials.',
  'Most of what I build starts with a game I play or a problem someone I know has. Replay Radar exists because I wanted to find good Beyond All Reason games to watch. Offload exists because selling second-hand clothes is tedious. Jam Wizard exists because I wanted to play it with my friends. I host all of it myself on a home server I run with Coolify, Docker, and Cloudflare Tunnel.',
  'I use AI coding agents every day as part of my workflow — for research, prototyping, and grinding through unfamiliar code — and I care about understanding and owning what ships.',
];

export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'C', 'C++', 'GDScript', 'SQL'] },
  { group: 'Web', items: ['React', 'Next.js', 'Vite', 'Node.js', 'Express', 'Fastify', 'REST APIs', 'JWT auth'] },
  { group: 'Data', items: ['PostgreSQL', 'Prisma', 'Supabase'] },
  { group: 'Infra', items: ['Linux', 'Docker', 'Coolify', 'Traefik', 'nginx', 'Cloudflare Tunnel', 'Tailscale', 'Git / GitHub'] },
  { group: 'Games & 3D', items: ['Godot 4', 'WebRTC multiplayer', 'Blender', 'Physics / GDExtension'] },
  { group: 'Workflow', items: ['AI coding agents', 'Debugging unfamiliar systems', 'Technical research'] },
];

export interface Role {
  title: string;
  org: string;
  place: string;
  dates: string;
  bullets: string[];
  resumeBullets?: string[]; // shorter version for the one-page PDF
}

export const EXPERIENCE: Role[] = [
  {
    title: 'Independent Software Developer',
    org: 'Self-directed projects',
    place: 'Oceanside, CA',
    dates: '2025 – Present',
    bullets: [
      'Build and self-host full-stack apps (React, TypeScript, Fastify/Express, Prisma, PostgreSQL) used by real players and users.',
      'Operate a Linux home server running Coolify, Docker, and Traefik, exposed through Cloudflare Tunnel with no open inbound ports.',
      'Develop browser and desktop games in Godot 4, including peer-to-peer co-op and a physics-driven 3D mech game.',
    ],
  },
  {
    title: 'Mobile Obstacle Lead',
    org: 'Ninja Nation',
    place: 'Denver, CO · Los Angeles, CA',
    dates: '03/2022 – 07/2025',
    bullets: [
      'Independently managed setup, operation, transport, and maintenance of mobile obstacle-course equipment for events.',
      'Coordinated with customers, event hosts, and team members to keep events on schedule and resolve problems on site.',
      'Coached children ages 5+, adapting communication to different ages and skill levels.',
    ],
    resumeBullets: [
      'Independently managed setup, operation, transport, and maintenance of mobile obstacle-course equipment for events.',
      'Coordinated with customers, hosts, and team members to keep events on schedule; coached children ages 5+.',
    ],
  },
  {
    title: 'IT Support',
    org: 'Cascadia Technical Academy',
    place: 'Vancouver, WA',
    dates: '10/2013 – 06/2015',
    bullets: [
      'Provided hardware and software support across a technical academy; managed and resolved service tickets.',
      'Configured network routers, operating systems, and IP assignments for lab and library systems.',
      'Repaired and refurbished donated computer hardware for classroom use.',
    ],
  },
];

export const EDUCATION = [
  {
    title: 'Associate of Science — Computer Science',
    org: 'Clark College',
    place: 'Vancouver, WA',
    dates: '2021',
    note: 'Operating systems, data structures, C, C++, Python.',
  },
  {
    title: 'Full-Stack Web Development',
    org: 'The Odin Project',
    place: 'Online',
    dates: '2026',
    note: 'Self-directed curriculum: JavaScript, React, Node.js, Express, SQL, testing.',
  },
];
