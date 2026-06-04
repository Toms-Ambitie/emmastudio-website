'use client';

import { useEffect } from 'react';

export default function HeroAnimTrigger() {
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (hero) hero.setAttribute('data-in', '');
  }, []);
  return null;
}
