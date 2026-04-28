import { useState, useEffect } from 'react';
import './Depoimentos.css';

const testimonials = [
  {
    text: 'Profissionais incríveis! Transformaram completamente nossa presença digital. O site não só ficou lindo como aumentou nossas conversões em 40%.',
    name: 'João Silva',
    role: 'Empresário'
  },
  {
    text: 'Atendimento excepcional e entrega além do esperado. O sistema customizado que desenvolveram otimizou nossos processos e reduziu custos operacionais.',
    name: 'Maria Santos',
    role: 'Empresária'
  },
  {
    text: 'Trabalho impecável! Desenvolveram nosso dashboard de BI que nos permite tomar decisões baseadas em dados reais. Recomendo fortemente!',
    name: 'Carlos Oliveira',
    role: 'Empresário'
  },
  {
    text: 'O e-commerce que desenvolveram para nossa loja aumentou as vendas em 85% no primeiro mês. A integração com pagamentos e frete ficou perfeita!',
    name: 'Ana Carolina Mendes',
    role: 'Loja Bella Moda'
  },
  {
    text: 'O aplicativo mobile revolucionou nosso atendimento. Nossos clientes agora têm uma experiência muito mais fluida e intuitiva.',
    name: 'Roberto Alves',
    role: 'Tech Solutions'
  },
  {
    text: 'O dashboard de BI nos deu visibilidade total do negócio. Conseguimos identificar oportunidades que antes eram invisíveis.',
    name: 'Patrícia Lima',
    role: 'Grupo Empresarial Lima'
  }
];

export default function Depoimentos() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  // Função para ir para um slide específico
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section id="depoimentos" className="testimonials section-padding">
      <div className="container">
        <h2 className="section-title reveal-fade-up">
          O que <span className="text-neon-gradient">Nossos Clientes</span> Dizem
        </h2>
        <p className="subtitle reveal-fade-up">
          Feedback de quem já transformou seu negócio conosco
        </p>
        
        <div className="testimonials-simple-carousel">
          {/* Slide atual */}
          <div className="testimonial-slide">
            <div className="testimonial-card-simple">
              <div className="quote-icon">"</div>
              <p>{testimonials[currentIndex].text}</p>
              <div className="client-info">
                <strong>{testimonials[currentIndex].name}</strong>
                <span>{testimonials[currentIndex].role}</span>
              </div>
            </div>
          </div>

          {/* Indicadores (bolinhas) */}
          <div className="carousel-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${currentIndex === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}