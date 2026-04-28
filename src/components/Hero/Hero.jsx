import { useState, useEffect, useCallback } from 'react';
import './Hero.css';

// Imagens para desktop
const desktopImages = [
  { src: '/0.webp', alt: 'Neumann Web Solutions - Slide 1' },
  { src: '/1.webp', alt: 'Neumann Web Solutions - Slide 2' },
  { src: '/2.webp', alt: 'Neumann Web Solutions - Slide 3' },
  { src: '/3.webp', alt: 'Neumann Web Solutions - Slide 4' },
  { src: '/4.webp', alt: 'Neumann Web Solutions - Slide 5' },
];

// Imagens para mobile
const mobileImages = [
  { src: '/imgmobile0.webp', alt: 'Neumann Web Solutions - Mobile Slide 1' },
  { src: '/imgmobile1.webp', alt: 'Neumann Web Solutions - Mobile Slide 2' },
  { src: '/imgmobile2.webp', alt: 'Neumann Web Solutions - Mobile Slide 3' },
  { src: '/imgmobile3.webp', alt: 'Neumann Web Solutions - Mobile Slide 4' },
  { src: '/imgmobile4.webp', alt: 'Neumann Web Solutions - Mobile Slide 5' },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  // Auto-avance do carrossel a cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (isMobile ? mobileImages.length : desktopImages.length));
    }, 5000);

    return () => clearInterval(timer);
  }, [isMobile]);

  // Selecionar imagens baseado no dispositivo
  const currentImages = isMobile ? mobileImages : desktopImages;

  return (
    <section id="hero" className={`hero section-padding ${isMobile ? 'hero-mobile' : ''}`}>
      {/* Carrossel de Imagens */}
      <div className="hero-carousel">
        <div 
          className="hero-slides-container"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {currentImages.map((image, index) => (
            <div key={index} className="hero-slide">
              <img
                src={image.src}
                alt={image.alt}
                className="hero-bg-image"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="hero-slide-overlay"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores/Dots */}
      <div className="hero-dots">
        {currentImages.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="container hero-content">
        <h1 className="hero-title reveal-fade-up">
          Sua empresa <br />
          <span className="text-neon-gradient">No mundo Digital</span>
        </h1>
        <p
          className="hero-subtitle reveal-fade-up"
          style={{ '--delay': '0.2s' }}
        >
          Criamos experiências web que transformam o seu negócio em um
          ecossistema digital.
        </p>
        <div
          className="hero-actions reveal-fade-up"
          style={{ '--delay': '0.4s' }}
        >
          <button
            className="btn btn-primary-glow"
            onClick={() => scrollTo('#contato')}
          >
            Iniciar Projeto
          </button>
          <button
            className="btn btn-secondary-outline"
            onClick={() => scrollTo('#portfolio')}
          >
            Ver Portfólio
          </button>
        </div>
      </div>
    </section>
  );
}