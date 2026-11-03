import { SITE } from '@/lib/site';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

export default function SocialLinks({ withLabels = false }: { withLabels?: boolean }) {
  const links = [
    { href: SITE.github, label: 'GitHub', Icon: GitHubIcon },
    { href: SITE.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
    { href: `mailto:${SITE.email}`, label: 'Email', Icon: MailIcon },
  ].filter((l) => l.href);
  return (
    <ul className="social">
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label={label}>
            <Icon size={20} />
            {withLabels && <span>{label}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
