import { useCallback } from 'react';
import './Footer.css';

const navLinks = [
  ['Início',      '#hero'],
  ['Serviços',    '#servicos'],
  ['Sobre Nós',   '#sobre'],
  ['Portfólio',   '#portfolio'],
  ['Depoimentos', '#depoimentos'],
  ['Contato',     '#contato'],
];

const services = [
  'Criação de Sites',
  'Lojas Virtuais (E-commerce)',
  'Aplicativos Web',
  'Dashboards & BI',
  'SEO & Performance',
  'Manutenção & Suporte',
];

export default function Footer() {
  const scrollTo = useCallback((href) => {
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = document.getElementById('header')?.offsetHeight ?? 64;
      window.scrollTo({ top: target.offsetTop - headerHeight, behavior: 'smooth' });
    }
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="container footer-inner">
        {/* ── Grid 4 colunas ── */}
        <div className="footer-grid">

          {/* Col 1 — Brand */}
          <div className="footer-col footer-col--brand">
            <div className="footer-brand-logo">
              <img src="/logoheader.webp" alt="Neumann Web Solutions" className="footer-logo-img" />
              <span className="footer-logo-name">
                Neumann
                <em>Web Solutions</em>
              </span>
            </div>
            <p className="footer-brand-tagline">
              Transformamos ideias em experiências digitais de alto impacto sites, apps e lojas virtuais que geram resultados reais para o seu negócio.
            </p>
            <div className="footer-social-icons">
              <a href="https://www.facebook.com/profile.php?id=61582905100736" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="https://www.instagram.com/neumann_web_solutions/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram" />
              </a>
              <a href="https://wa.me/5541997552818" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="fab fa-whatsapp" />
              </a>
            </div>
          </div>

          {/* Col 2 — Navegação */}
          <div className="footer-col">
            <h4>Navegação</h4>
            <ul>
              {navLinks.map(([label, href]) => (
                <li key={href}>
                  <button onClick={() => scrollTo(href)}>{label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Serviços */}
          <div className="footer-col">
            <h4>Serviços</h4>
            <ul>
              {services.map((s) => (
                <li key={s}><span>{s}</span></li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contato */}
          <div className="footer-col footer-col--contact">
            <h4>Contato</h4>

            <a href="https://wa.me/5541997552818" target="_blank" rel="noopener noreferrer" className="footer-contact-item">
              <span className="footer-contact-icon"><i className="fab fa-whatsapp" /></span>
              <span>
                <strong>WhatsApp</strong>
                <small>+55 (41) 99755-2818</small>
              </span>
            </a>

            <a href="mailto:neumannwebsolutions@gmail.com" className="footer-contact-item">
              <span className="footer-contact-icon"><i className="far fa-envelope" /></span>
              <span>
                <strong>E-mail</strong>
                <small>neumannwebsolutions@gmail.com</small>
              </span>
            </a>

            <div className="footer-contact-item footer-contact-item--static">
              <span className="footer-contact-icon"><i className="fas fa-map-marker-alt" /></span>
              <span>
                <strong>Localização</strong>
                <small>São José dos Pinhais — PR, Brasil</small>
              </span>
            </div>

            <div className="footer-contact-item footer-contact-item--static">
              <span className="footer-contact-icon"><i className="far fa-clock" /></span>
              <span>
                <strong>Horário</strong>
                <small>Seg–Sex, 09h às 18h</small>
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {year} Neumann Web Solutions. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}