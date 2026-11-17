"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import MenuOpenButton from './MenuIcons/MenuOpenButton';
import MenuCloseButton from './MenuIcons/MenuCloseButton';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
];

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="flex h-20 shrink-0 items-center justify-between gap-4">
      <Link className="font-bold" href="/" onClick={closeMenu}>Kai Elwood-Dieu</Link>
      <MenuOpenButton menuOpen={menuOpen} onClick={() => setMenuOpen(true)} />
      <nav
        id="site-navigation"
        aria-label="Main navigation"
        className={`${menuOpen ? 'flex' : 'hidden'} fixed inset-0 z-50 flex-col items-center justify-center gap-8 bg-backblack text-xl font-bold text-white lg:static lg:flex lg:flex-row lg:gap-6 lg:bg-transparent lg:text-base lg:font-normal lg:text-black`}
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
    </header>
  );
}
