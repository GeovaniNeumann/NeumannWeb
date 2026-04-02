'use client';

import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll('[class*="reveal-"]');
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            if (el.classList.contains('reveal-fade-up')) {
              el.classList.add('animate-fade-up');
            } else if (el.classList.contains('reveal-slide-left')) {
              el.classList.add('animate-slide-left');
            } else if (el.classList.contains('reveal-slide-right')) {
              el.classList.add('animate-slide-right');
            }
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}