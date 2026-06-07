import { useState, useEffect, useCallback, useRef } from 'react';
import './Hero.css';

const desktopImages = [
  { src: '/0.webp',  alt: 'Neumann Web Solutions - Slide 1' },
  { src: '/1.webp',  alt: 'Neumann Web Solutions - Slide 2' },
  { src: '/2.webp',  alt: 'Neumann Web Solutions - Slide 3' },
  { src: '/3.webp',  alt: 'Neumann Web Solutions - Slide 4' },
  { src: '/4.webp',  alt: 'Neumann Web Solutions - Slide 5' },
];

const mobileImages = [
  { src: '/imgmobile0.webp', alt: 'Neumann Web Solutions - Mobile Slide 1' },
  { src: '/imgmobile1.webp', alt: 'Neumann Web Solutions - Mobile Slide 2' },
  { src: '/imgmobile2.webp', alt: 'Neumann Web Solutions - Mobile Slide 3' },
  { src: '/imgmobile3.webp', alt: 'Neumann Web Solutions - Mobile Slide 4' },
  { src: '/imgmobile4.webp', alt: 'Neumann Web Solutions - Mobile Slide 5' },
];

const INTERVAL = 6000;
const TRANSITION_MS = 900;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Refs para valores que precisam ser acessados dentro do timer sem causar re-renderização
  const currentRef = useRef(current);
  const pausedRef = useRef(paused);
  const transitioningRef = useRef(false);
  const timerRef = useRef(null);
  const rafRef = useRef(null);
  const touchStartRef = useRef(null);
  const preloadedRef = useRef(new Set());

  // Sincroniza refs com os estados
  useEffect(() => { currentRef.current = current; }, [current]);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  // Detecta mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const images = isMobile ? mobileImages : desktopImages;
  const total = images.length;

  // Pré-carregamento de imagens (sem warnings)
  const preloadImage = useCallback((src) => {
    if (!src || preloadedRef.current.has(src)) return;
    const img = new Image();
    img.src = src;
    preloadedRef.current.add(src);
  }, []);

  // Função que troca o slide (sem depender de closures stale)
  const goTo = useCallback((newIndex) => {
    if (transitioningRef.current) return;
    const safeIndex = ((newIndex % total) + total) % total;
    if (safeIndex === currentRef.current) return;

    transitioningRef.current = true;
    setPrev(currentRef.current);
    setCurrent(safeIndex);
    currentRef.current = safeIndex;

    setTimeout(() => {
      setPrev(null);
      transitioningRef.current = false;
    }, TRANSITION_MS);
  }, [total]);

  // Avançar
  const goToNext = useCallback(() => {
    if (transitioningRef.current) return;
    goTo((currentRef.current + 1) % total);
  }, [goTo, total]);

  // Voltar
  const goToPrev = useCallback(() => {
    if (transitioningRef.current) return;
    goTo((currentRef.current - 1 + total) % total);
  }, [goTo, total]);

  // Timer único que nunca é recriado (inicia e limpa apenas no mount/unmount e quando pausa/despausa)
  useEffect(() => {
    const startTimer = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        if (!pausedRef.current && !transitioningRef.current) {
          goToNext();
        }
      }, INTERVAL);
    };

    startTimer();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [goToNext]); // goToNext é estável, então o timer só inicia/limpa uma vez

  // Pausa/retoma o timer sem recriar (usando ref)
  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        if (!pausedRef.current && !transitioningRef.current) {
          goToNext();
        }
      }, INTERVAL);
    }
  }, [paused, goToNext]);

  // Pré-carrega imagens seguintes
  useEffect(() => {
    const nextSrc = images[(current + 1) % total].src;
    const nextNextSrc = images[(current + 2) % total].src;
    preloadImage(nextSrc);
    preloadImage(nextNextSrc);
  }, [current, images, total, preloadImage]);

  // Pré-carrega todas no início
  useEffect(() => {
    [...desktopImages, ...mobileImages].forEach(img => preloadImage(img.src));
  }, [preloadImage]);

  // Barra de progresso (RAF)
  useEffect(() => {
    setProgress(0);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const startTime = performance.now();
    const update = (now) => {
      if (!pausedRef.current) {
        const elapsed = now - startTime;
        const pct = Math.min((elapsed / INTERVAL) * 100, 100);
        setProgress(pct);
      }
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(rafRef.current);
  }, [current, paused]);

  // Scroll suave
  const scrollTo = useCallback((href) => {
    const el = document.querySelector(href);
    if (!el) return;
    const header = document.getElementById('header');
    const offset = header ? header.offsetHeight : 64;
    window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
  }, []);

  // Swipe touch
  const handleTouchStart = (e) => { touchStartRef.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) goToNext();
      else goToPrev();
    }
    touchStartRef.current = null;
  };

  // Navegação manual
  const goToManual = useCallback((index) => {
    if (transitioningRef.current) return;
    goTo(index);
  }, [goTo]);

  return (
    <section
      id="hero"
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="hero-carousel" aria-live="polite" aria-atomic="true">
        {prev !== null && (
          <div className="hero-slide hero-slide--out" key={`out-${prev}`}>
            <img src={images[prev].src} alt={images[prev].alt} className="hero-bg-image" loading="eager" />
            <div className="hero-slide-overlay" />
          </div>
        )}
        <div className="hero-slide hero-slide--in" key={`in-${current}`}>
          <img src={images[current].src} alt={images[current].alt} className="hero-bg-image" loading="eager" />
          <div className="hero-slide-overlay" />
        </div>
      </div>

      <div className="hero-content">
        <span className="hero-eyebrow">
          <span className="hero-eyebrow-line" />
          Desenvolvimento Web
        </span>
        <h1 className="hero-title">
          Sua empresa<br />
          <span className="text-neon-gradient">no mundo digital</span>
        </h1>
        <div className="hero-actions">
          <button className="hero-btn-primary" onClick={() => scrollTo('#contato')}>
            Iniciar Projeto
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="hero-btn-ghost" onClick={() => scrollTo('#portfolio')}>
            Ver Portfólio
          </button>
        </div>
      </div>

      <nav className="hero-nav" aria-label="Navegação de slides">
        <div className="hero-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${index === current ? 'active' : ''}`}
              onClick={() => goToManual(index)}
              aria-label={`Ir para slide ${index + 1}`}
              aria-current={index === current ? 'true' : undefined}
            >
              {index === current && (
                <span className="hero-dot-progress" style={{ width: `${progress}%` }} />
              )}
            </button>
          ))}
        </div>
      </nav>
    </section>
  );
}