import { Helmet } from 'react-helmet-async'

export default function LocalBusinessSchema() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Neumann Web Solutions",
    "description": "Agência de desenvolvimento web com foco em soluções personalizadas para empresas.",
    "url": "https://neumannwebsolutions.com.br",
    "telephone": "+5541997552818",
    "email": "neumannwebsolutions@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "São José dos Pinhais",
      "addressLocality": "São José dos Pinhais",
      "addressRegion": "PR",
      "addressCountry": "BR"
    },
    "priceRange": "$$",
    "openingHours": "Mo-Fr 09:00-18:00",
    "image": "https://i.ibb.co/V1zwghj/Design-sem-nome-5.webp"
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  )
}