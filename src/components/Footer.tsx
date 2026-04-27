'use client';

import { useCallback } from 'react';

export default function Footer() {
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
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Coluna 1 - Informações da empresa */}
          <div className="footer-col footer-info">
            <h4 className="logo-link" style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
              Neumann Web Solutions
            </h4>
            <p>Inovação e performance para o seu ecossistema web.</p>
            <div className="footer-social-icons">
              <a href="#" target="_blank" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in" />
              </a>
              <a
                href="https://www.instagram.com/neumann_web_solutions/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram" />
              </a>
              <a href="#" target="_blank" aria-label="GitHub">
                <i className="fab fa-github" />
              </a>
            </div>
          </div>

          {/* Coluna 2 - Links rápidos */}
          <div className="footer-col footer-links">
            <h4>Links Rápidos</h4>
            <ul>
              {[
                ['Serviços', '#servicos'],
                ['Sobre Nós', '#sobre'],
                ['Portfólio', '#portfolio'],
                ['Depoimentos', '#depoimentos'],
              ].map(([label, href]) => (
                <li key={href}>
                  <button
                    className="nav-link"
                    style={{ 
                      padding: '2px 0', 
                      fontSize: '0.95rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onClick={() => scrollTo(href)}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 - Localização */}
          <div className="footer-col footer-contact">
            <h4>Localização</h4>
            <p>São José dos Pinhais</p>
            <p>Paraná, Brasil</p>
            <p>Atendemos clientes globalmente.</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Neumann Web Solutions. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}