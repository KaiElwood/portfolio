"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import GardenMark from './GardenMark';
import MenuOpenButton from './MenuIcons/MenuOpenButton';
import MenuCloseButton from './MenuIcons/MenuCloseButton';

const links = [
  { href: '/', label: 'Home' },
  { href: '/running', label: 'Running' },
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
];

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const home = pathname === '/';

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="flex min-h-20 shrink-0 items-center justify-between gap-4">
      <Link className="garden-brand" href="/" onClick={closeMenu}><GardenMark /><span>Kai's Garden</span></Link>
      {!home && <>
      <MenuOpenButton menuOpen={menuOpen} onClick={() => setMenuOpen(true)} />
      <nav
        id="site-navigation"
        aria-label="Main navigation"
        className={`${menuOpen ? 'flex' : 'hidden'} fixed inset-0 z-50 flex-col items-center justify-center gap-8 bg-garden-background text-lg font-medium text-garden-ink lg:static lg:flex lg:flex-row lg:gap-5 lg:bg-transparent lg:text-sm lg:font-normal lg:text-garden-muted`}
      >
        {links.map(({ href, label }) => {
          const active = href === '/' ? pathname === href : pathname.startsWith(href);
          return (
            <Link key={href} href={href} onClick={closeMenu} aria-current={active ? 'page' : undefined}
              className={`underline-offset-4 hover:underline ${active ? 'underline' : ''}`}>
              {label}
            </Link>
          );
        })}
        <MenuCloseButton menuOpen={menuOpen} onClick={closeMenu} />
      </nav>
      </>}
    </header>
  );
}
