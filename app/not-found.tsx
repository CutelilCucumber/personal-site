import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section page not-found">
      <p className="eyebrow">Error 404</p>
      <h1>Game over</h1>
      <p className="lede">That page doesn&apos;t exist. Continue?</p>
      <Link className="btn btn-primary btn-lg" href="/">
        Press start
      </Link>
    </section>
  );
}
