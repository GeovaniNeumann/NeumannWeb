import { Helmet } from 'react-helmet-async'

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": "https://neumannwebsolutions.com.br/#business",
    "name": "Neumann Web Solutions",
    "description": "Agência de desenvolvimento web especializada em criação de sites profissionais, lojas virtuais, aplicativos e SEO para empresas no Paraná e em todo o Brasil.",
    "url": "https://neumannwebsolutions.com.br",
    "telephone": "+5541997552818",
    "email": "neumannwebsolutions@gmail.com",
    "currenciesAccepted": "BRL",
    "paymentAccepted": "PIX, Cartão de crédito, Transferência bancária",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00",
      },
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "São José dos Pinhais",
      "addressLocality": "São José dos Pinhais",
      "addressRegion": "PR",
      "postalCode": "83000-000",
      "addressCountry": "BR",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-25.5357",
      "longitude": "-49.2079",
    },
    "image": [
      "https://i.ibb.co/V1zwghj/Design-sem-nome-5.webp",
      "https://neumannwebsolutions.com.br/og-image.webp",
    ],
    "logo": {
      "@type": "ImageObject",
      "url": "https://i.ibb.co/V1zwghj/Design-sem-nome-5.webp",
      "width": 512,
      "height": 512,
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços de Desenvolvimento Web",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Criação de Sites Profissionais",
            "description": "Desenvolvimento de websites modernos, responsivos e otimizados para SEO.",
          },
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Lojas Virtuais (E-commerce)",
            "description": "Desenvolvimento de lojas online completas com gestão de produtos e pagamentos.",
          },
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Aplicativos Web",
            "description": "Sistemas e aplicações web personalizadas para automatizar processos do seu negócio.",
          },
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO e Otimização",
            "description": "Estratégias de SEO para posicionar seu site nas primeiras posições do Google.",
          },
        },
      ],
    },
    "areaServed": [
      { "@type": "City", "name": "São José dos Pinhais" },
      { "@type": "City", "name": "Curitiba" },
      { "@type": "State", "name": "Paraná" },
      { "@type": "Country", "name": "Brasil" },
    ],
    "sameAs": [
      "https://www.instagram.com/neumann_web_solutions/",
      "https://www.facebook.com/profile.php?id=61582905100736",
    ],
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}