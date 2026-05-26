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
  const [current, setCurrent]       = useState(0);
  const [prev, setPrev]             = useState(null);
  const [transitioning, setTrans]   = useState(false);
  const [isMobile, setIsMobile]     = useState(false);
  const [paused, setPaused]         = useState(false);
  const touchStart                  = useRef(null);
  const timerRef                    = useRef(null);

  /* ── device detection ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const images = isMobile ? mobileImages : desktopImages;
  const total  = images.length;

  /* ── slide change ── */
  const goTo = useCallback((idx) => {
    if (transitioning) return;
    setTrans(true);
    setPrev(current);
    setCurrent(idx);
    setTimeout(() => { setPrev(null); setTrans(false); }, TRANSITION_MS);
  }, [transitioning, current]);

  const next = useCallback(() => goTo((current + 1) % total), [goTo, current, total]);

  /* ── auto-advance ── */
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [next, paused]);

  /* ── scroll to ── */
  const scrollTo = useCallback((href) => {
    const el = document.querySelector(href);
    if (!el) return;
    const offset = document.getElementById('header')?.offsetHeight ?? 64;
    window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
  }, []);

  /* ── touch swipe ── */
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? (current + 1) % total : (current - 1 + total) % total);
    touchStart.current = null;
  };

  /* ── progress bar width ── */
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(0);
    if (paused) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      setProgress(Math.min(((now - start) / INTERVAL) * 100, 100));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [current, paused]);

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

        {/* slide saindo */}
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

        {/* slide entrando */}
        <div className="hero-slide hero-slide--in" key={`in-${current}`}>
          <img
            src={images[current].src}
            alt={images[current].alt}
            className="hero-bg-image hero-bg-image--ken"
            loading="eager"
          />
          <div className="hero-slide-overlay" />
        </div>

        {/* pré-carrega próximo */}
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
      <div className="hero-nav">
        <div className="hero-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
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
      </div>

    </section>
  );
}