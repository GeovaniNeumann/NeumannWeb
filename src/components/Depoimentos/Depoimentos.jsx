import { useState, useEffect, useRef } from 'react';
import './Depoimentos.css';

const testimonials = [
  {
    text: 'O site que a Neumann Web Solutions criou para mim como personal trainer superou todas as expectativas! Meus clientes elogiam muito a apresentação e os agendamentos aumentaram significativamente.',
    name: 'Anderson Britto',
    role: 'Personal Trainer'
  },
  {
    text: 'A vitrine virtual para minhas bonecas artesanais ficou simplesmente encantadora! As clientes adoram navegar e as vendas aumentaram muito. Recomendo demais!',
    name: 'Cantinho das Bonecas',
    role: 'Artesanato'
  },
  {
    text: 'A refatoração do nosso sistema foi impecável! A equipe aplicou um design system moderno e clean code que transformou completamente nossa experiência como usuários.',
    name: 'Lugh World',
    role: 'Tech'
  },
  {
    text: 'A página da PRFiber está excelente! Transmite exatamente a qualidade e velocidade que oferecemos. Os clientes confiam mais na nossa marca agora.',
    name: 'PRFiber',
    role: 'Internet Fibra Óptica'
  },
  {
    text: 'A landing page para meus produtos premium está gerando muitas vendas! O design emocional e persuasivo fez toda a diferença nas conversões.',
    name: 'Diego Moreira',
    role: 'Produtos Premium'
  },
  {
    text: 'O site da LA Car Center Prime está fantástico! Os clientes estão agendando serviços direto pelo formulário, facilitou demais nosso atendimento.',
    name: 'LA Car Center Prime',
    role: 'Oficina Mecânica'
  },
  {
    text: 'A página da minha confeitaria ficou linda e funcional! As clientes adoram ver o catálogo de bolos e já faturaram muito com as encomendas.',
    name: 'Adriana Bolos',
    role: 'Confeitaria'
  },
];

export default function Depoimentos() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const intervalRef = useRef(null);

  // Função para mostrar um depoimento específico
  const showTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  // Auto-rotacionar depoimentos
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Parar auto-play quando o usuário interage
  const handleDotClick = (index) => {
    // Limpa o intervalo atual
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Mostra o depoimento clicado
    showTestimonial(index);
    
    // Reinicia o auto-play
    intervalRef.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
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
        
        <div className="testimonials-slider">
          {/* Container dos depoimentos */}
          <div className="testimonials-container">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`testimonial ${currentTestimonial === index ? 'active' : ''}`}
              >
                <div className="testimonial-card">
                  <div className="quote-icon">"</div>
                  <p>{testimonial.text}</p>
                  <div className="client-info">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots de navegação */}
          <div className="slider-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${currentTestimonial === index ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}