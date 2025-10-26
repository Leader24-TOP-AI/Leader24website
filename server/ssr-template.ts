import { PageMetadata } from '../client/src/lib/metadata';

/**
 * Generate HTML template with SSR metadata injection
 */
export function generateSSRTemplate(
  appHtml: string,
  metadata: PageMetadata,
  helmetTags: { title: string; meta: string; link: string; script: string },
  lang: 'it' | 'en' = 'it'
): string {
  const { title, description, keywords, ogImage, ogType, canonical } = metadata;

  // Locale mapping for Open Graph
  const ogLocale = lang === 'it' ? 'it_IT' : 'en_US';
  const alternateLocale = lang === 'it' ? 'en_US' : 'it_IT';

  // Generate hreflang alternate URL
  const baseUrl = 'https://leader24.ai';
  // Extract the path from canonical (everything after the domain)
  const canonicalPath = canonical ? canonical.replace(/^https:\/\/leader24\.(ai|it)/, '') : '';
  // For IT pages, add /en prefix; for EN pages, remove /en prefix
  const alternatePath = lang === 'it'
    ? `/en${canonicalPath}`
    : canonicalPath.replace(/^\/en/, '');
  const alternateUrl = `${baseUrl}${alternatePath || ''}`;

  return `<!DOCTYPE html>
<html id="html-root" lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />

    <!-- Primary Meta Tags -->
    <title>${title}</title>
    <meta name="title" content="${title}" />
    <meta name="description" content="${description}" />
    ${keywords ? `<meta name="keywords" content="${keywords}" />` : ''}
    ${canonical ? `<link rel="canonical" href="${canonical}" />` : ''}

    <!-- Hreflang for multilingual SEO -->
    <link rel="alternate" hreflang="${lang}" href="${canonical || baseUrl}" />
    <link rel="alternate" hreflang="${lang === 'it' ? 'en' : 'it'}" href="${alternateUrl}" />
    <link rel="alternate" hreflang="x-default" href="${baseUrl}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${ogType || 'website'}" />
    <meta property="og:url" content="${canonical || baseUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    ${ogImage ? `<meta property="og:image" content="${ogImage}" />` : ''}
    <meta property="og:site_name" content="Leader24" />
    <meta property="og:locale" content="${ogLocale}" />
    <meta property="og:locale:alternate" content="${alternateLocale}" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${canonical || baseUrl}" />
    <meta property="twitter:title" content="${title}" />
    <meta property="twitter:description" content="${description}" />
    ${ogImage ? `<meta property="twitter:image" content="${ogImage}" />` : ''}

    <!-- Additional SEO -->
    <meta name="robots" content="index, follow" />
    <meta name="revisit-after" content="7 days" />
    <meta name="author" content="Leader24" />
    <meta name="language" content="${lang === 'it' ? 'Italian' : 'English'}" />

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-5SVHVJDK');</script>
    <!-- End Google Tag Manager -->
  </head>
  <body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5SVHVJDK"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <div id="root">${appHtml}</div>
    <script type="module" src="/src/entry-client.tsx"></script>
  </body>
</html>`;
}

/**
 * Extract page metadata based on URL path
 */
export async function getMetadataFromPath(path: string, lang: 'it' | 'en' = 'it'): Promise<{ page: string; metadata: any }> {
  // Dynamic import for ESM compatibility
  const metadataModule = await import('../client/src/lib/metadata.js');
  const { getMetadata, getIndustryMetadata } = metadataModule;

  // Clean path and detect language
  let cleanPath = path.replace(/^\/en/, '').replace(/\/$/, '') || '/';
  const isEnglish = path.startsWith('/en');
  const language: 'it' | 'en' = isEnglish ? 'en' : lang;

  // Route mapping
  const routeMap: Record<string, string> = {
    '/': 'home',
    '/settori': 'sectors',
    '/industries': 'sectors',
    '/settori/ecommerce': 'ecommerce',
    '/industries/ecommerce': 'ecommerce',
    '/contatti': 'contacts',
    '/contact-us': 'contacts',
    '/casi-studio': 'caseStudies',
    '/case-studies': 'caseStudies',
    '/informativa-privacy': 'privacy',
    '/privacy': 'privacy',
    '/informativa-cookie': 'cookie',
    '/cookie': 'cookie',
    '/termini-di-servizio': 'terms',
    '/terms-of-service': 'terms',
    '/terms': 'terms'
  };

  const page = routeMap[cleanPath] || 'home';
  let metadata = getMetadata(page, language);

  // Check if it's an industry-specific page with hash
  if (cleanPath.includes('#')) {
    const [, hash] = cleanPath.split('#');
    if (hash) {
      metadata = getIndustryMetadata(hash, language);
    }
  }

  return { page, metadata };
}
