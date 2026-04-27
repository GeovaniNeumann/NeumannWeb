import Image from 'next/image';

const features = [
  {
    icon: 'fas fa-bolt',
    title: 'Performance Extrema',
    desc: 'Otimização de código e infraestrutura para garantir carregamento instantâneo.',
  },
  {
    icon: 'fas fa-fingerprint',
    title: 'Identidade Digital Única',
    desc: 'Design personalizado que reflete a essência e os valores da sua marca, fugindo de templates.',
  },
  {
    icon: 'fas fa-search-dollar',
    title: 'Foco em ROI',
    desc: 'Soluções construídas para gerar leads, vendas e o melhor Retorno Sobre Investimento (ROI).',
  },
];

export default function Sobre() {
  return (
    <section id="sobre" className="sobre section-padding">
      <div className="container about-container">
        <div className="about-text-content reveal-slide-left">
          <h2 className="section-title text-align-left">
            A Abordagem{' '}
            <span className="text-neon-gradient">Neumann Web Solutions</span>
          </h2>
          <p className="subtitle">
            Nossa metodologia combina agilidade no desenvolvimento com uma
            obsessão pela qualidade e o resultado final.
          </p>
          <div className="feature-list">
            {features.map((f) => (
              <div key={f.title} className="feature-item">
                <i className={f.icon} />
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-image-content reveal-slide-right">
          <Image
            src="/imgabout.webp"
            alt="Abordagem Neumann Web Solutions"
            className="abstract-image"
            width={600}
            height={450}
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="glass-overlay" />
        </div>
      </div>
    </section>
  );
}