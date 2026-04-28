import { useEffect } from 'react';

export const useScrollReveal = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          if (element.classList.contains('reveal-fade-up')) {
            element.classList.add('animate-fade-up');
          } else if (element.classList.contains('reveal-slide-left')) {
            element.classList.add('animate-slide-left');
          } else if (element.classList.contains('reveal-slide-right')) {
            element.classList.add('animate-slide-right');
          }
          observer.unobserve(element);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    const elements = document.querySelectorAll('.reveal-fade-up, .reveal-slide-left, .reveal-slide-right');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};