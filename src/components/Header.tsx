'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const navItems = [
  { label: 'Início', href: '#hero' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contato' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('#hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Efeito para mudar o background do header ao rolar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = document.querySelectorAll('section[id]');
      const headerHeight = 80;
      let current = '';
      
      sections.forEach((section) => {
        const el = section as HTMLElement;
        if (window.scrollY >= el.offsetTop - headerHeight - 100) {
          current = '#' + el.getAttribute('id');
        }
      });
      if (current) setActiveLink(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Função para scroll suave e fechar menu mobile
  const scrollTo = useCallback((href: string) => {
    setIsMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const top = (target as HTMLElement).offsetTop - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        
        {/* LOGO - Substituído por Imagem */}
        <div className="logo flex-shrink-0">
          <button 
            className="logo-link bg-transparent border-none p-0 outline-none transition-transform hover:scale-105" 
            onClick={() => scrollTo('#hero')}
            style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center' }}
          >
            <Image 
              src="https://i.ibb.co/HTNgTwwn/Sem-nome-250-x-100-px-1-removebg-preview.png" 
              alt="Neumann Web Solutions"
              width={180} 
              height={72}
              priority
              className="w-auto h-[40px] md:h-[50px] lg:h-[60px]"
              style={{ objectFit: 'contain' }}
            />
          </button>
        </div>

        {/* MENU HAMBÚRGUER */}
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* NAVEGAÇÃO */}
        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.href}
              className={`nav-link ${activeLink === item.href ? 'active' : ''}`}
              onClick={() => scrollTo(item.href)}
            >
              {item.label}
            </button>
          ))}
          
          {/* Botão de orçamento exclusivo para o menu mobile */}
          <div className="cta-mobile-only" style={{ marginTop: '2rem', display: isMenuOpen ? 'flex' : 'none', justifyContent: 'center', width: '100%' }}>
             <a 
               href="https://wa.me/5541997552818" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="btn btn-outline-neon"
               style={{ width: '80%', textAlign: 'center' }}
             >
                <i className="fab fa-whatsapp" /> Orçamento
             </a>
          </div>
        </nav>

        {/* OVERLAY MOBILE */}
        <div 
          className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`} 
          onClick={() => setIsMenuOpen(false)}
        ></div>

        {/* BOTÃO DE ORÇAMENTO DESKTOP */}
        <a
          href="https://wa.me/5541997552818"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-neon cta-header"
        >
          <i className="fab fa-whatsapp" /> Orçamento
        </a>
      </div>
    </header>
  );
}