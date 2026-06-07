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
  const [current, setCurrent]     = useState(0);
  const [prev, setPrev]           = useState(null);
  const [transitioning, setTrans] = useState(false);
  const [isMobile, setIsMobile]   = useState(false);
  const [paused, setPaused]       = useState(false);
  const [progress, setProgress]   = useState(0);

  // ── Refs para evitar stale closures no intervalo ──────────
  const currentRef     = useRef(0);
  const transitionRef  = useRef(false);
  const pausedRef      = useRef(false);
  const timerRef       = useRef(null);
  const rafRef         = useRef(null);
  const touchStart     = useRef(null);
  const totalRef       = useRef(desktopImages.length);

  // Mantém refs sincronizadas
  useEffect(() => { currentRef.current = current; }, [current]);
  useEffect(() => { transitionRef.current = transitioning; }, [transitioning]);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  /* ── Device detection ──────────────────────────────────── */
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      totalRef.current = mobile ? mobileImages.length : desktopImages.length;
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const images = isMobile ? mobileImages : desktopImages;
  const total  = images.length;

  /* ── Função de troca de slide ──────────────────────────── */
  const goTo = useCallback((idx) => {
    if (transitionRef.current) return;
    transitionRef.current = true;
    setTrans(true);
    setPrev(currentRef.current);
    setCurrent(idx);
    currentRef.current = idx;
    setTimeout(() => {
      setPrev(null);
      setTrans(false);
      transitionRef.current = false;
    }, TRANSITION_MS);
  }, []);

  /* ── Auto-advance com refs (sem dependência de `next`) ─── */
  useEffect(() => {
    const startInterval = () => {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        if (pausedRef.current) return;
        const nextIdx = (currentRef.current + 1) % totalRef.current;
        goTo(nextIdx);
      }, INTERVAL);
    };

    startInterval();
    return () => clearInterval(timerRef.current);
  }, [goTo]); // goTo é estável (useCallback sem deps que mudam)

  /* ── Reinicia o intervalo ao trocar de slide manualmente ─ */
  const goToManual = useCallback((idx) => {
    goTo(idx);
    // Reinicia o timer para não cortar o slide recém-escolhido
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (pausedRef.current) return;
      const nextIdx = (currentRef.current + 1) % totalRef.current;
      goTo(nextIdx);
    }, INTERVAL);
  }, [goTo]);

  /* ── Scroll suave ──────────────────────────────────────── */
  const scrollTo = useCallback((href) => {
    const el = document.querySelector(href);
    if (!el) return;
    const offset = document.getElementById('header')?.offsetHeight ?? 64;
    window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
  }, []);

  /* ── Touch swipe ───────────────────────────────────────── */
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 40) {
      const t = totalRef.current;
      goToManual(dx < 0
        ? (currentRef.current + 1) % t
        : (currentRef.current - 1 + t) % t
      );
    }
    touchStart.current = null;
  };

  /* ── Barra de progresso (RAF) ──────────────────────────── */
  useEffect(() => {
    setProgress(0);
    cancelAnimationFrame(rafRef.current);

    const start = performance.now();
    const tick = (now) => {
      if (!pausedRef.current) {
        const pct = Math.min(((now - start) / INTERVAL) * 100, 100);
        setProgress(pct);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [current]); // reinicia a cada slide

  return (
    <section
      id="hero"
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Slides ── */}
      <div className="hero-carousel" aria-live="polite" aria-atomic="true">

        {/* Slide saindo */}
        {prev !== null && (
          <div className="hero-slide hero-slide--out" key={`out-${prev}`}>
            <img
              src={images[prev].src}
              alt={images[prev].alt}
              className="hero-bg-image"
            />
            <div className="hero-slide-overlay" />
          </div>
        )}

        {/* Slide entrando */}
        <div className="hero-slide hero-slide--in" key={`in-${current}`}>
          <img
            src={images[current].src}
            alt={images[current].alt}
            className="hero-bg-image"
            loading="eager"
          />
          <div className="hero-slide-overlay" />
        </div>

        {/* Pré-carrega próximo slide */}
        <link rel="preload" as="image" href={images[(current + 1) % total].src} />
      </div>

      {/* ── Conteúdo ── */}
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
          <button
            className="hero-btn-primary"
            onClick={() => scrollTo('#contato')}
          >
            Iniciar Projeto
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            className="hero-btn-ghost"
            onClick={() => scrollTo('#portfolio')}
          >
            Ver Portfólio
          </button>
        </div>
      </div>

      {/* ── Dots + progress ── */}
      <nav className="hero-nav" aria-label="Navegação de slides">
        <div className="hero-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === current ? 'active' : ''}`}
              onClick={() => goToManual(i)}
              aria-label={`Ir para slide ${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
            >
              {i === current && (
                <span
                  className="hero-dot-progress"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          ))}
        </div>
      </nav>

    </section>
  );
}