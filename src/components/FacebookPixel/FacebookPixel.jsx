'use client';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Se você não estiver usando react-router-dom, pode remover o useLocation
// e usar apenas o useEffect com dependência vazia

export default function FacebookPixel() {
  const location = useLocation();

  useEffect(() => {
    // Inicializa o Facebook Pixel apenas uma vez
    if (typeof window !== 'undefined' && !window.fbq) {
      (function(f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      
      window.fbq('init', '1659348165259255');
      window.fbq('track', 'PageView');
    }
  }, []);

  // Rastreia mudanças de página (se estiver usando react-router-dom)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location?.pathname]);

  return (
    <>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1659348165259255&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  );
}