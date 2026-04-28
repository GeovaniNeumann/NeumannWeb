import { useState, useEffect, useCallback } from 'react';
import './Header.css';

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = document.querySelectorAll('section[id]');
      const headerHeight = 80;
      let current = '';
      
      sections.forEach((section) => {
        const el = section;
        if (window.scrollY >= el.offsetTop - headerHeight - 100) {
          current = '#' + el.getAttribute('id');
        }
      });
      if (current) setActiveLink(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((href) => {
    setIsMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const top = target.offsetTop - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        
        <div className="logo flex-shrink-0">
          <button 
            className="logo-link" 
            onClick={() => scrollTo('#hero')}
          >
            <span className="logo-text">Neumann Web Solutions</span>
          </button>
        </div>

        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

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
          
          <div className="cta-mobile-only">
            <a 
              href="https://wa.me/5541997552818" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline-neon"
            >
              <i className="fab fa-whatsapp"></i> Orçamento
            </a>
          </div>
        </nav>

        <div 
          className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`} 
          onClick={() => setIsMenuOpen(false)}
        ></div>

        <a
          href="https://wa.me/5541997552818"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-neon cta-header"
        >
          <i className="fab fa-whatsapp"></i> Orçamento
        </a>
      </div>
    </header>
  );
}