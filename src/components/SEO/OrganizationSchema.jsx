import { Helmet } from 'react-helmet-async'

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://neumannwebsolutions.com.br/#organization",
    "name": "Neumann Web Solutions",
    "legalName": "Neumann Web Solutions",
    "url": "https://neumannwebsolutions.com.br",
    "logo": {
      "@type": "ImageObject",
      "url": "https://i.ibb.co/V1zwghj/Design-sem-nome-5.webp",
      "width": 512,
      "height": 512,
    },
    "image": "https://neumannwebsolutions.com.br/og-image.webp",
    "description": "Agência de desenvolvimento web especializada em soluções digitais profissionais para empresas que desejam crescer online.",
    "email": "neumannwebsolutions@gmail.com",
    "telephone": "+5541997552818",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "São José dos Pinhais",
      "addressRegion": "PR",
      "addressCountry": "BR",
    },
    "foundingDate": "2024",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": 1,
    },
    "knowsLanguage": ["pt-BR", "en"],
    "sameAs": [
      "https://www.instagram.com/neumann_web_solutions/",
      "https://www.facebook.com/profile.php?id=61582905100736",
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+5541997552818",
        "contactType": "customer service",
        "contactOption": "TollFree",
        "availableLanguage": ["Portuguese", "English"],
        "areaServed": "BR",
      },
      {
        "@type": "ContactPoint",
        "telephone": "+5541997552818",
        "contactType": "sales",
        "availableLanguage": ["Portuguese"],
        "areaServed": "BR",
      },
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