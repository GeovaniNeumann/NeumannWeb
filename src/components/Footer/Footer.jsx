import { useCallback } from 'react';
import './Footer.css';

export default function Footer() {
  const scrollTo = useCallback((href) => {
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = document.getElementById('header')?.offsetHeight ?? 80;
      window.scrollTo({
        top: target.offsetTop - headerHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-info">
            <h4 className="logo-link" style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
              Neumann Web Solutions
            </h4>
            <p>Inovação e performance para o seu ecossistema web.</p>
            <div className="footer-social-icons">
              <a href="#" target="_blank" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://www.instagram.com/neumann_web_solutions/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" target="_blank" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

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
                    onClick={() => scrollTo(href)}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

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