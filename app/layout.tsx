import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Your Name',
  description: 'Developer portfolio and personal site.',
};

const NAV_LINKS = [
  { href: '/projects', label: 'Projects' },
  { href: '/now', label: 'Now' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="site-title">
            Your Name
          </Link>
          <nav>
            <ul className="nav-list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <p>&copy; {new Date().getFullYear()} Your Name.</p>
        </footer>
      </body>
    </html>
  );
}
