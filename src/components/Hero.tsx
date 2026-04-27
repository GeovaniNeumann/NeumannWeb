'use client';

import { useCallback } from 'react';
import Image from 'next/image';

export default function Hero() {
  const scrollTo = useCallback((href: string) => {
    const target = document.querySelector(href);
    if (target) {
      const headerHeight =
        document.getElementById('header')?.offsetHeight ?? 80;
      window.scrollTo({
        top: (target as HTMLElement).offsetTop - headerHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <section id="hero" className="hero section-padding">
      {/* Container da imagem de fundo */}
      <div className="hero-image-container">
        <Image
          src="/imghero.webp"
          alt="Background"
          fill
          priority
          style={{ objectFit: 'cover', opacity: 0.2 }}
        />
      </div>
      
      <div className="container hero-content">
        <h1 className="hero-title reveal-fade-up">
          Sua empresa <br />
          <span className="text-neon-gradient">No mundo Digital</span>
        </h1>
        <p
          className="hero-subtitle reveal-fade-up"
          style={{ '--delay': '0.2s' } as React.CSSProperties}
        >
          Criamos experiências web que transformam o seu negócio em um
          ecossistema digital.
        </p>
        <div
          className="hero-actions reveal-fade-up"
          style={{ '--delay': '0.4s' } as React.CSSProperties}
        >
          <button
            className="btn btn-primary-glow"
            onClick={() => scrollTo('#contato')}
          >
            <p>Iniciar Projeto</p>
          </button>
          <button
            className="btn btn-secondary-outline"
            onClick={() => scrollTo('#portfolio')}
          >
            <p>Ver Portfólio</p>
          </button>
        </div>
      </div>
      
      {/* Remove ou comente esta div se não for mais usar */}
      {/* <div className="hero-background-effect" /> */}
    </section>
  );
}