import type { Project } from '@/types/project';

// Image if the project has one; otherwise a drawn panel so every card has a visual.
export default function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="visual-img"
        src={project.image}
        alt={project.imageAlt ?? project.title}
        loading="lazy"
        width={1280}
        height={800}
      />
    );
  }

  if (project.slug === 'homelab') {
    return (
      <div className="visual-panel diagram" role="img" aria-label="Request flow: Internet to Cloudflare Tunnel to Traefik to app containers">
        <div className="node node-net">Internet</div>
        <div className="edge">TLS · no open ports</div>
        <div className="node node-cf">Cloudflare Tunnel</div>
        <div className="edge" />
        <div className="node node-proxy">Traefik · Coolify</div>
        <div className="edge" />
        <div className="node-row">
          <span className="node small">replay-radar</span>
          <span className="node small">offload</span>
          <span className="node small">jam-wizard</span>
          <span className="node small">this site</span>
        </div>
        <div className="edge" />
        <div className="node-row">
          <span className="node small db">postgres ×2</span>
          <span className="node small db">peerjs · coturn</span>
        </div>
        <p className="diagram-note">admin over Tailscale only</p>
      </div>
    );
  }

  return (
    <div className="visual-panel terminal" role="img" aria-label={`${project.title}: ${project.status ?? ''}`}>
      <div className="term-bar">
        <span />
        <span />
        <span />
      </div>
      <pre>
        <span className="prompt">$</span> cat {project.slug}/stack.txt{'\n'}
        {project.techStack.map((t) => (
          <span key={t} className="dim">
            {'  '}- {t}
            {'\n'}
          </span>
        ))}
        {'\n'}
        <span className="prompt">$</span> status{'\n'}
        {'  '}
        {project.status?.toUpperCase()} <span className="blink">▮</span>
      </pre>
    </div>
  );
}
