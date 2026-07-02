'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { APP_URL, LAUNCHED } from '@/data/modules';

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => {
    const menu = menuRef.current;
    if (!menu) return;
    const open = menu.classList.toggle('open');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  const closeMenu = () => {
    menuRef.current?.classList.remove('open');
    document.body.style.overflow = '';
  };

  return (
    <>
      <nav className="nav" id="nav" ref={navRef}>
        <Link className="nav__logo" href="/" aria-label="emma home">
          <Image src="/logo-dark.svg" alt="emma." width={90} height={23} priority />
        </Link>
        <div className="nav__links">
          <Link href="/#hoe">Hoe het werkt</Link>
          <Link href="/#modules">Modules</Link>
          <Link href="/#prijs">Prijs</Link>
          <Link href="/#roadmap">Roadmap</Link>
          <Link href="/#faq">FAQ</Link>
        </div>
        <div className="nav__right">
          <a className="nav__login" href={APP_URL}>Inloggen</a>
          {LAUNCHED ? (
            <a className="btn btn-coral" href={APP_URL}>Start gratis</a>
          ) : (
            <Link className="btn btn-coral" href="/#closer">Houd me op de hoogte</Link>
          )}
          <button className="nav__burger" id="burger" aria-label="Menu" onClick={toggleMenu}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>
          </button>
        </div>
      </nav>

      <div className="mobile-menu" id="mobileMenu" ref={menuRef}>
        <Link href="/#hoe" onClick={closeMenu}>Hoe het werkt</Link>
        <Link href="/#modules" onClick={closeMenu}>Modules</Link>
        <Link href="/#prijs" onClick={closeMenu}>Prijs</Link>
        <Link href="/#roadmap" onClick={closeMenu}>Roadmap</Link>
        <Link href="/kennisbank" onClick={closeMenu}>Kennisbank</Link>
        <Link href="/contact" onClick={closeMenu}>Contact</Link>
        <a href={APP_URL} onClick={closeMenu}>Inloggen</a>
        {LAUNCHED ? (
          <a className="btn btn-coral btn-lg" href={APP_URL} onClick={closeMenu}>Start 14 dagen gratis</a>
        ) : (
          <Link className="btn btn-coral btn-lg" href="/#closer" onClick={closeMenu}>Houd me op de hoogte</Link>
        )}
      </div>
    </>
  );
}
