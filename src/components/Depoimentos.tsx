const testimonials = [
  {
    text: 'Profissionais incríveis! Transformaram completamente nossa presença digital. O site não só ficou lindo como aumentou nossas conversões em 40%.',
    name: 'João Silva',
    role: 'Empresário',
    reveal: 'reveal-slide-left',
  },
  {
    text: 'Atendimento excepcional e entrega além do esperado. O sistema customizado que desenvolveram otimizou nossos processos e reduziu custos operacionais.',
    name: 'Maria Santos',
    role: 'Empresária',
    reveal: 'reveal-fade-up',
  },
  {
    text: 'Trabalho impecável! Desenvolveram nosso dashboard de BI que nos permite tomar decisões baseadas em dados reais. Recomendo fortemente!',
    name: 'Carlos Oliveira',
    role: 'Empresário',
    reveal: 'reveal-slide-right',
  },
];

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="testimonials section-padding">
      <div className="container">
        <h2 className="section-title reveal-fade-up">
          O Que Nossos Clientes Dizem
        </h2>
        <p
          className="subtitle reveal-fade-up"
          style={{ '--delay': '0.2s' } as React.CSSProperties}
        >
          Feedback de quem já transformou seu negócio conosco
        </p>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.name} className={`testimonial-card ${t.reveal}`}>
              <p>{t.text}</p>
              <div className="client-info">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}