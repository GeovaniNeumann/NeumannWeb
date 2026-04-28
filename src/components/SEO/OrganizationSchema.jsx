import { Helmet } from 'react-helmet-async'

export default function OrganizationSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Neumann Web Solutions",
    "url": "https://neumannwebsolutions.com.br",
    "logo": "https://i.ibb.co/V1zwghj/Design-sem-nome-5.webp",
    "description": "Soluções web profissionais para empresas que desejam ter uma presença digital de sucesso.",
    "email": "neumannwebsolutions@gmail.com",
    "telephone": "+5541997552818",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "São José dos Pinhais",
      "addressRegion": "PR",
      "addressCountry": "BR"
    },
    "sameAs": [
      "https://www.instagram.com/neumann_web_solutions/",
      "https://www.facebook.com/profile.php?id=61582905100736"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+5541997552818",
      "contactType": "customer service",
      "availableLanguage": ["Portuguese", "English"]
    }
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  )
}