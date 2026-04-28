import { useEffect } from 'react';
import SEO from './components/SEO/SEO';
import OrganizationSchema from './components/SEO/OrganizationSchema';
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Servicos from './components/Servicos/Servicos'
import Sobre from './components/Sobre/Sobre'
import Portfolio from './components/Portfolio/Portfolio'
import Depoimentos from './components/Depoimentos/Depoimentos'
import Contato from './components/Contato/Contato'
import Footer from './components/Footer/Footer'
import BackToTop from './components/BackToTop/BackToTop'
import ScrollRevealInit from './components/ScrollRevealInit/ScrollRevealInit'

function App() {
  useEffect(() => {
    // Meta Pixel Code
    !function(f,b,e,v,n,t,s) {
      if(f.fbq) return;
      n=f.fbq=function(){n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)};
      if(!f._fbq) f._fbq=n;
      n.push=n;
      n.loaded=!0;
      n.version='2.0';
      n.queue=[];
      t=b.createElement(e);
      t.async=!0;
      t.src=v;
      s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)
    }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
    
    fbq('init', '1659348165259255');
    fbq('track', 'PageView');
  }, []);

  return (
    <>
      {/* SEO Componentes */}
      <SEO 
        title="Neumann Web Solutions - Soluções Web Profissionais"
        description="Criamos experiências web que transformam o seu negócio em um ecossistema digital. Desenvolvimento de sites, aplicativos mobile, e-commerce, dashboards BI e SEO."
        keywords="desenvolvimento web, criação de sites, aplicativos mobile, e-commerce, SEO, dashboards BI, consultoria digital, desenvolvimento react, criação de landing pages"
        url="https://neumannwebsolutions.com.br"
        image="/og-image.webp"
      />
      <OrganizationSchema />

      {/* Meta Pixel NOSCRIPT */}
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }} 
          src="https://www.facebook.com/tr?id=1659348165259255&ev=PageView&noscript=1" 
          alt=""
        />
      </noscript>
      
      <ScrollRevealInit />
      <Header />
      <main>
        <Hero />
        <Servicos />
        <Sobre />
        <Portfolio />
        <Depoimentos />
        <Contato />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

export default App