import { useState, useEffect, useCallback, useRef } from 'react';
import './Header.css';

const navItems = [
  { label: 'Início',      href: '#hero'        },
  { label: 'Serviços',    href: '#servicos'     },
  { label: 'Sobre',       href: '#sobre'        },
  { label: 'Portfólio',   href: '#portfolio'    },
  { label: 'Depoimentos', href: '#depoimentos'  },
  { label: 'Contato',     href: '#contato'      },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollRatio, setScrollRatio] = useState(0);
  const [activeLink, setActiveLink] = useState('#hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pillRef = useRef(null);
  const navRef = useRef(null);
  const btnRefs = useRef({});

  // Scroll: animação do header + detecção da seção ativa
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setScrollRatio(Math.min(y / 120, 1));

      const sections = Array.from(document.querySelectorAll('section[id]'));
      let current = '#hero';
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const offsetTop = section.offsetTop;
        if (y + 120 >= offsetTop) {
          current = '#' + section.id;
          break;
        }
      }
      setActiveLink(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Pill indicator (apenas desktop)
  useEffect(() => {
    if (window.innerWidth <= 1024) return;

    const btn = btnRefs.current[activeLink];
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!btn || !nav || !pill) return;

    const btnRect = btn.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    if (navRect.width > 0) {
      pill.style.width = `${btnRect.width}px`;
      pill.style.left = `${btnRect.left - navRect.left}px`;
      pill.style.opacity = '1';
    } else {
      pill.style.opacity = '0';
    }
  }, [activeLink]);

  // Smooth scroll e fecha menu
  const scrollTo = useCallback((href) => {
    setIsMenuOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    const headerOffset = 64;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }, []);

  // Lock body quando menu aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // Fecha menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Fecha com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header
      className={`header ${scrolled ? 'scrolled' : ''}`}
      style={{ '--scroll': scrollRatio }}
    >
      <div className="container header-container">
        {/* Logo */}
        <button className="logo-link" onClick={() => scrollTo('#hero')} aria-label="Ir para o início">
          <div className="logo-inner">
            <img src="/logoheader.webp" alt="" className="logo-img" aria-hidden="true" />
            <div className="logo-wordmark">
              <span className="logo-name">Neumann</span>
              <span className="logo-tagline">Web Solutions</span>
            </div>
          </div>
        </button>

        {/* Nav (desktop e drawer mobile) */}
        <nav
          ref={navRef}
          className={`nav ${isMenuOpen ? 'active' : ''}`}
          aria-label="Navegação principal"
          aria-hidden={isMenuOpen ? 'false' : 'true'}
        >
          {/* Pill indicator (desktop) */}
          <span className="nav-pill" ref={pillRef} aria-hidden="true" />

          {/* Botão fechar (X) - mobile */}
          <button
            className="mobile-close-btn"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Fechar menu"
          >
            ✕
          </button>

          {navItems.map((item) => (
            <button
              key={item.href}
              ref={(el) => { btnRefs.current[item.href] = el; }}
              className={`nav-link ${activeLink === item.href ? 'active' : ''}`}
              onClick={() => scrollTo(item.href)}
              aria-current={activeLink === item.href ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}

          {/* CTA específico para o drawer mobile */}
          <div className="cta-mobile-only">
            <a
              href="https://wa.me/5541997552818"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              Orçamento
            </a>
          </div>
        </nav>

        {/* Lado direito: CTA desktop + hamburger */}
        <div className="header-right">
          <a
            href="https://wa.me/5541997552818"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta cta-header"
          >
            <i className="fab fa-whatsapp" aria-hidden="true"></i>
            Orçamento
          </a>

          <button
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            aria-controls="nav-drawer"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Overlay (fundo escuro) */}
        <div
          className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      </div>
    </header>
  );
}