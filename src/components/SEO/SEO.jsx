import { Helmet } from 'react-helmet-async'

export default function SEO({
  title = "Neumann Web Solutions - Criação de Sites e Desenvolvimento Web",
  description = "Criamos sites profissionais, lojas virtuais e aplicativos web para empresas em São José dos Pinhais e toda a região Sul do Brasil. Solicite um orçamento grátis.",
  keywords = "criação de sites São José dos Pinhais, desenvolvimento web Curitiba, criação de site profissional, loja virtual, e-commerce, agência web Paraná, site para empresa, desenvolvimento React, SEO, aplicativo web",
  author = "Neumann Web Solutions",
  url = "https://neumannwebsolutions.com.br",
  image = "https://neumannwebsolutions.com.br/og-image.webp",
  type = "website",
  publishedTime,
  modifiedTime,
  canonicalUrl,
}) {
  const siteTitle  = "Neumann Web Solutions"
  const fullTitle  = title === siteTitle ? title : title
  // Garante que description não passe de 160 chars (limite do Google)
  const metaDesc   = description.length > 160 ? description.slice(0, 157) + '…' : description
  const canonical  = canonicalUrl || url

  return (
    <Helmet>
      {/* ── Básico ──────────────────────────────────────────── */}
      <html lang="pt-BR" />
      <title>{fullTitle}</title>
      <meta name="description"    content={metaDesc} />
      <meta name="keywords"       content={keywords} />
      <meta name="author"         content={author} />
      <meta name="robots"         content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language"       content="pt-BR" />
      <meta name="revisit-after"  content="7 days" />
      <meta name="viewport"       content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color"    content="#14c5e4" />
      <meta name="format-detection" content="telephone=no" />

      {/* ── Canonical + hreflang ────────────────────────────── */}
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="pt-BR" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      {/* ── Performance: preconnect ─────────────────────────── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://wa.me" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* ── Open Graph (Facebook, WhatsApp, LinkedIn) ────────── */}
      <meta property="og:type"        content={type} />
      <meta property="og:url"         content={canonical} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image"       content={image} />
      <meta property="og:image:alt"   content={`${siteTitle} - Desenvolvimento Web Profissional`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type"  content="image/webp" />
      <meta property="og:site_name"   content={siteTitle} />
      <meta property="og:locale"      content="pt_BR" />

      {/* ── Twitter Card ────────────────────────────────────── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:url"         content={canonical} />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image"       content={image} />
      <meta name="twitter:image:alt"   content={`${siteTitle} - Desenvolvimento Web Profissional`} />

      {/* ── Artigo (apenas quando type="article") ───────────── */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}

      {/* ── Schema.org — WebSite ────────────────────────────── */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": siteTitle,
          "url": url,
          "description": metaDesc,
          "inLanguage": "pt-BR",
          "author": {
            "@type": "Organization",
            "name": author,
            "url": url,
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${url}/busca?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        })}
      </script>
    </Helmet>
  )
}