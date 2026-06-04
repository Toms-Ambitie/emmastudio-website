'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Nav({ dark = false, currentPage = '' }: { dark?: boolean; currentPage?: string }) {
  const navRef = useRef<HTMLElement>(null);
  const topbarRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const topbar = topbarRef.current;
    if (!nav) return;

    const onScroll = () => {
      const scrolled = window.scrollY > 24;
      nav.classList.toggle('scrolled', scrolled);
      topbar?.classList.toggle('hide', scrolled);
    };
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
      <div className="topbar" id="topbar" ref={topbarRef}>
        <nav className="topbar__links">
          <Link href="/kennisbank" aria-current={currentPage === 'kennisbank' ? 'page' : undefined}>Kennisbank</Link>
          <span className="sep"></span>
          <Link href="/contact" aria-current={currentPage === 'contact' ? 'page' : undefined}>Contact</Link>
        </nav>
      </div>

      <nav className={`nav${dark ? ' on-dark' : ''}`} id="nav" ref={navRef}>
        <Link className="nav__logo" href="/" aria-label="emma home">
          <Image className="dark" src="/logo-dark.svg" alt="emma." width={90} height={23} priority />
          <Image className="light" src="/logo-light.svg" alt="emma." width={90} height={23} priority />
        </Link>
        <div className="nav__links">
          <Link href="/#journey">Modules</Link>
          <Link href="/#proof">Het bewijs</Link>
          <Link href="/#compare">Vergelijk</Link>
          <Link href="/#packs">Prijzen</Link>
          <Link href="/#faq">FAQ</Link>
        </div>
        <div className="nav__right">
          <Link className="btn btn-coral" href="/#closer">Blijf op de hoogte</Link>
          <button className="nav__burger" id="burger" ref={burgerRef} aria-label="Menu" onClick={toggleMenu}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>
          </button>
        </div>
      </nav>

      <div className="mobile-menu" id="mobileMenu" ref={menuRef}>
        <Link href="/#journey" onClick={closeMenu}>Modules</Link>
        <Link href="/#proof" onClick={closeMenu}>Het bewijs</Link>
        <Link href="/#packs" onClick={closeMenu}>Prijzen</Link>
        <Link href="/kennisbank" onClick={closeMenu}>Kennisbank</Link>
        <Link href="/contact" onClick={closeMenu}>Contact</Link>
        <Link className="btn btn-coral btn-lg" href="/#closer" onClick={closeMenu}>Blijf op de hoogte</Link>
      </div>
    </>
  );
}
