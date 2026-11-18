import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-garden-border py-[18px] text-[13px] text-garden-muted">
      <nav aria-label="Explore" className="flex flex-wrap items-center gap-x-7">
        <Link className="garden-link inline-flex min-h-11 items-center" href="/running">Running</Link>
        <Link className="garden-link inline-flex min-h-11 items-center" href="/portfolio">Projects</Link>
        <Link className="garden-link inline-flex min-h-11 items-center" href="/about">About</Link>
        <Link className="garden-link inline-flex min-h-11 items-center" href="/blog">Writing</Link>
        <a className="garden-link inline-flex min-h-11 items-center" href="https://github.com/KaiElwood">GitHub ↗</a>
      </nav>
    </footer>
  );
}
