'use client';

import { useRef } from 'react';

type FaqItem = { q: string; a: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const listRef = useRef<HTMLDivElement>(null);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const item = e.currentTarget.closest('.faq__item') as HTMLElement | null;
    if (!item) return;
    const answer = item.querySelector('.faq__a') as HTMLElement | null;
    if (!answer) return;

    const isOpen = item.classList.contains('open');
    listRef.current?.querySelectorAll('.faq__item.open').forEach(o => {
      o.classList.remove('open');
      (o.querySelector('.faq__a') as HTMLElement).style.maxHeight = '';
    });
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  };

  return (
    <div className="faq__list" ref={listRef}>
      {items.map((item, i) => (
        <div className="faq__item" key={i}>
          <button className="faq__q" onClick={toggle}>
            {item.q}<span className="faq__ic"></span>
          </button>
          <div className="faq__a"><p>{item.a}</p></div>
        </div>
      ))}
    </div>
  );
}
