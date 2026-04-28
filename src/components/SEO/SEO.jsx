import { Helmet } from 'react-helmet-async'

export default function SEO({ 
  title = "Neumann Web Solutions - Soluções Web Profissionais",
  description = "Criamos experiências web que transformam o seu negócio em um ecossistema digital. Websites, aplicativos mobile, dashboards BI, e-commerce e SEO.",
  keywords = "desenvolvimento web, criação de sites, aplicativos mobile, e-commerce, SEO, dashboards BI, consultoria digital",
  author = "Neumann Web Solutions",
  url = "https://neumannwebsolutions.com.br",
  image = "/og-image.webp",
  type = "website",
  publishedTime,
  modifiedTime,
  canonicalUrl
}) {
  const siteTitle = "Neumann Web Solutions"
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`

  return (
    <Helmet>
      {/* Meta tags básicas */}
      <html lang="pt-BR" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Portuguese" />
      <meta name="revisit-after" content="7 days" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl || url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Article specific */}
      {type === "article" && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:modified_time" content={modifiedTime} />
          <meta property="article:author" content={author} />
        </>
      )}
      
      {/* WhatsApp/Telegram sharing */}
      <meta property="og:image:alt" content="Neumann Web Solutions - Soluções Web Profissionais" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Schema.org结构化数据 */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": siteTitle,
          "url": url,
          "description": description,
          "author": {
            "@type": "Organization",
            "name": author
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${url}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  )
}