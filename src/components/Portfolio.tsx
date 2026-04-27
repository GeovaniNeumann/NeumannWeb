'use client';

import Image from 'next/image';

const projects = [
  {
    href: 'https://cantinhodoartesanato.vercel.app/',
    src: 'https://i.ibb.co/7tkGMvTY/Design-sem-nome-28.png',
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
    href: 'https://diegomoreira-chi.vercel.app/',
    src: 'https://i.ibb.co/Df95LWgX/imh-jaka.png',
    alt: 'Projeto Landing Page',
    title: 'Land Page de Produtos Premium',
    desc: 'Design emocional e persuasivo, focado na alta conversão para mix de produtos (perfumaria, presentes e bebidas).',
    reveal: 'reveal-slide-right',
  },
  {
    href: 'https://lacarprime.vercel.app/',
    src: 'https://i.ibb.co/SDgdrnjc/Design-sem-nome-4.jpg',
    alt: 'Projeto LA Car Center Prime',
    title: 'LA Car Center Prime',
    desc: 'Página para oficina mecânica com serviços, portfólio e formulário de contato.',
    reveal: 'reveal-slide-left',
  },
  {
    href: 'https://adrianaconfeiteira.vercel.app/',
    src: 'https://i.ibb.co/Wvc3FSwV/Sem-nome-Post-para-Instagram-45-2.jpg',
    alt: 'Projeto Adriana Bolos',
    title: 'Adriana Bolos',
    desc: 'Página para Confeitaria com catálogo de produtos, sobre e informações de contato.',
    reveal: 'reveal-fade-up',
  },
  {
    href: 'https://anderbrittopersonal.vercel.app/',
    src: 'https://i.ibb.co/QF0yYdnF/Sem-nome-800-x-600-px-1.png',
    alt: 'Projeto Anderson Brito',
    title: 'Anderson Brito',
    desc: 'Página para personal trainer com serviços, depoimentos e informações de contato.',
    reveal: 'reveal-slide-right',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="portfolio section-padding bg-pattern">
      <div className="container">
        <h2 className="section-title reveal-fade-up">Projetos Recentes</h2>
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
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 2}
                  style={{ objectFit: 'cover' }}
                  className="portfolio-img"
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