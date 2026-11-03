import type { Metadata } from 'next';
import Link from 'next/link';
import { JetBrains_Mono, Press_Start_2P, Space_Grotesk } from 'next/font/google';
import { SITE } from '@/lib/site';
import SocialLinks from '@/components/SocialLinks';
import './globals.css';

const pixel = Press_Start_2P({ weight: '400', subsets: ['latin'], variable: '--font-pixel', display: 'swap' });
const sans = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

const description = `${SITE.name} — ${SITE.role}. ${SITE.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.role}`, template: `%s — ${SITE.name}` },
  description,
  openGraph: {
    type: 'website',
    url: SITE.url,
    title: `${SITE.name} — ${SITE.role}`,
    description,
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
  icons: { icon: '/favicon.svg' },
};

const NAV = [
  { href: '/#work', label: 'Work' },
  { href: '/#about', label: 'About' },
  { href: '/#experience', label: 'Experience' },
  { href: '/resume/', label: 'Resume' },
  { href: '/#contact', label: 'Contact' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  jobTitle: SITE.role,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  sameAs: [SITE.github, SITE.linkedin].filter(Boolean),
  address: { '@type': 'PostalAddress', addressLocality: 'Oceanside', addressRegion: 'CA' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pixel.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <header className="site-header">
          <div className="header-inner">
            <Link href="/" className="logo">
              <span className="logo-mark" aria-hidden>
                BS
              </span>
              <span className="logo-text">Brian Sonderen</span>
            </Link>
            <nav aria-label="Main">
              <ul className="nav-list">
                {NAV.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="footer-inner">
            <p>
              © {new Date().getFullYear()} {SITE.name} · Built with Next.js, self-hosted on my own server.
            </p>
            <SocialLinks />
          </div>
        </footer>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
