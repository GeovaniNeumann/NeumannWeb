import './Portfolio.css';

const projects = [

  {
    href: 'https://anderbrittopersonal.vercel.app/',
    src: 'https://i.ibb.co/chFXfjDY/Captura-de-tela-2026-04-27-224425.png',
    alt: 'Projeto Anderson Brito',
    title: 'Anderson Brito',
    desc: 'Página para personal trainer com serviços, depoimentos e informações de contato.',
    reveal: 'reveal-slide-right',
  },
  {
    href: 'https://cantinhodoartesanato.vercel.app/',
    src: 'https://i.ibb.co/CKJ9nPhY/Captura-de-tela-2026-04-27-224723.png',
    alt: 'Projeto Cantinho das Bonecas',
    title: 'Cantinho das Bonecas',
    desc: 'Vitrine personalizada para exposição de bonecas artesanais, com foco em visual atraente e segmentação clara de produtos para revenda e varejo.',
    reveal: 'reveal-slide-left'
  },
  {
    href: 'https://www.lughworld.com/',
    src: 'https://i.ibb.co/99cgLS37/lugh.png',
    alt: 'Projeto Dashboard BI',
    title: 'Refatoração UI/UX Completa',
    desc: 'Projeto totalmente refatorado, aplicando Design System moderno e arquitetura limpa (Clean Code).',
    reveal: 'reveal-fade-up',
  },
  {
    href: 'https://pr-fiber.vercel.app/',
    src: 'https://i.ibb.co/KcCZ8Vb6/Captura-de-tela-2026-04-27-223615.png',
    alt: 'Projeto PRFiber - Internet Fibra Óptica',
    title: 'PRFiber - Internet de Verdade',
    desc: 'Fibra óptica dedicada com atendimento humano e sem burocracia. Planos a partir de R$ 89,90/mês com alta performance.',
    reveal: 'reveal-slide-right',
  },
  {
    href: 'https://diegomoreira-chi.vercel.app/',
    src: 'https://i.ibb.co/Mk7B0BJD/Captura-de-tela-2026-04-27-224359.png',
    alt: 'Projeto Landing Page',
    title: 'Land Page de Produtos Premium',
    desc: 'Design emocional e persuasivo, focado na alta conversão para mix de produtos (perfumaria, presentes e bebidas).',
    reveal: 'reveal-slide-left',
  },
  {
    href: 'https://lacarprime.vercel.app/',
    src: 'https://i.ibb.co/cVBhZmZ/Captura-de-tela-2026-04-27-224323.png',
    alt: 'Projeto LA Car Center Prime',
    title: 'LA Car Center Prime',
    desc: 'Página para oficina mecânica com serviços, portfólio e formulário de contato.',
    reveal: 'reveal-fade-up',
  },
  {
    href: 'https://adrianaconfeiteira.vercel.app/',
    src: 'https://i.ibb.co/wNkxw33h/Captura-de-tela-2026-04-28-165652.png',
    alt: 'Projeto Adriana Bolos',
    title: 'Adriana Bolos',
    desc: 'Página para Confeitaria com catálogo de produtos, sobre e informações de contato.',
    reveal: 'reveal-slide-left',
  },
  {
    href: 'https://site-para-oficina.vercel.app/',
    src: 'https://i.ibb.co/CL1zcnw/Captura-de-tela-2026-04-28-102913.png',
    alt: 'Projeto para oficina mecânica',
    title: 'Site para oficina a venda.',
    desc: 'Página para oficina mecânica com galeria, serviços e formulario para agendamento via whatsapp.',
    reveal: 'reveal-slide-right',
  },
  {
    href: 'https://siteparabarbearia.vercel.app/',
    src: 'https://i.ibb.co/sv5rwbk9/Captura-de-tela-2026-04-28-103346.png',
    alt: 'Projeto para barbearia',
    title: 'Site para barbearia a venda.',
    desc: 'Página para barbearia com direcionamento para agendamentos via whatsapp',
    reveal: 'reveal-slide-right',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="portfolio section-padding bg-pattern">
      <div className="container">
        <h2 className="section-title reveal-fade-up">Projetos <span className="text-neon-gradient">Recentes</span></h2>
        <div className="portfolio-grid">
          {projects.map((p, index) => (
            <a
              key={`${p.href}-${index}`}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`portfolio-item ${p.reveal}`}
            >
              <div className="portfolio-image-wrapper">
                <img
                  src={p.src}
                  alt={p.alt}
                  className="portfolio-img"
                  loading={index < 2 ? "eager" : "lazy"}
                />
              </div>
              <div className="item-overlay">
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}