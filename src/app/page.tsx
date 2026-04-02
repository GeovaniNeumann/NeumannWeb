import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Servicos from '@/components/Servicos';
import Sobre from '@/components/Sobre';
import Portfolio from '@/components/Portfolio';
import Depoimentos from '@/components/Depoimentos';
import Contato from '@/components/Contato';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ScrollRevealInit from '@/components/ScrollRevealInit';

export default function Home() {
  return (
    <>
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
  );
}