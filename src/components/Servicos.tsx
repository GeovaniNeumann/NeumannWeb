const services = [
  {
    icon: 'fas fa-desktop',
    title: 'Websites e Landing Pages',
    desc: 'Sites de alta performance, design responsivo e otimização para motores de busca (SEO).',
    reveal: 'reveal-slide-left',
  },
  {
    icon: 'fas fa-mobile-alt',
    title: 'Aplicativos Mobile',
    desc: 'Apps nativos e híbridos para iOS e Android, desenvolvidos com React Native e Flutter para máxima performance e experiência nativa.',
    reveal: 'reveal-slide-left',
  },
  {
    icon: 'fas fa-chart-bar',
    title: 'Dashboards Interativos (BI)',
    desc: 'Transforme dados brutos em insights acionáveis com painéis de controle e visualizações de dados.',
    reveal: 'reveal-slide-right',
  },
  {
    icon: 'fas fa-shopping-cart',
    title: 'E-commerce e Lojas Virtuais',
    desc: 'Lojas online completas com gestão de produtos, pagamentos integrados e experiência de compra otimizada para conversão.',
    reveal: 'reveal-slide-left',
    delay: '0.2s',
  },
  {
    icon: 'fas fa-search',
    title: 'SEO e Otimização',
    desc: 'Otimização on-page e off-page para impulsionar seu ranking no Google e gerar tráfego orgânico qualificado.',
    reveal: 'reveal-fade-up',
    delay: '0.2s',
  },
  {
    icon: 'fas fa-shield-alt',
    title: 'Manutenção e Suporte',
    desc: 'Garantia de segurança, atualizações contínuas e performance máxima para sua aplicação web.',
    reveal: 'reveal-slide-right',
    delay: '0.2s',
  },
  {
    icon: 'fas fa-palette',
    title: 'Design UX/UI',
    desc: 'Criação de interfaces bonitas e, acima de tudo, focadas na melhor experiência do usuário.',
    reveal: 'reveal-slide-left',
    delay: '0.4s',
  },
  {
    icon: 'fas fa-plug',
    title: 'Integração de APIs',
    desc: 'Conecte seus sistemas existentes com serviços de terceiros para um fluxo de trabalho unificado.',
    reveal: 'reveal-fade-up',
    delay: '0.4s',
  },
];

export default function Servicos() {
  return (
    <section id="servicos" className="servicos section-padding bg-pattern">
      <div className="container">
        <h2 className="section-title reveal-fade-up">Nossos Serviços Essenciais</h2>
        <div className="services-grid">
          {services.map((s) => (
            <div
              key={s.title}
              className={`card card-service ${s.reveal}`}
              style={s.delay ? ({ '--delay': s.delay } as React.CSSProperties) : undefined}
            >
              <div className="card-icon">
                <i className={s.icon} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}   