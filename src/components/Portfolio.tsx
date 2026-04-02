'use client';

import Image from 'next/image';

const projects = [
  {
    href: 'https://disti.netlify.app/',
    src: 'https://i.ibb.co/7tLwvYVm/dsd.png',
    alt: 'Projeto Distribuidora B2B/B2C',
    title: 'Vitrine de Produtos Múltiplos',
    desc: 'Plataforma de exposição B2B/B2C com design elegante e otimizada para a venda de diferentes categorias de produtos.',
    reveal: 'reveal-slide-left',
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
    href: 'https://jakaperfumaria.netlify.app/#',
    src: 'https://i.ibb.co/Df95LWgX/imh-jaka.png',
    alt: 'Projeto Landing Page',
    title: 'Land Page de Produtos Premium',
    desc: 'Design emocional e persuasivo, focado na alta conversão para mix de produtos (perfumaria, presentes e bebidas).',
    reveal: 'reveal-slide-right',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="portfolio section-padding bg-pattern">
      <div className="container">
        <h2 className="section-title reveal-fade-up">Projetos Recentes</h2>
        <div className="portfolio-grid">
          {projects.map((p) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`portfolio-item ${p.reveal}`}
            >
              <div className="portfolio-image-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
                <Image src={p.src}
              alt={p.alt}
              width={600}
              height={280}
              // 1. Resolve o aviso de LCP (Prioridade de carregamento)
              priority={true} 
              // 2. Resolve o aviso de largura/altura modificada (Proporção)
              style={{ 
                objectFit: 'cover', 
                width: '100%', 
                height: 'auto' 
              }}
              className="transition-transform duration-500 hover:scale-110"
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