import { Helmet } from 'react-helmet-async';
import { PageMetadata } from '@/lib/metadata';

interface SEOProps {
  metadata: PageMetadata;
  lang?: 'it' | 'en';
}

export default function SEO({ metadata, lang = 'it' }: SEOProps) {
  const { title, description, keywords, ogImage, ogType, canonical } = metadata;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType || 'website'} />
      <meta property="og:url" content={canonical || 'https://leader24.it'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:site_name" content="Leader24" />
      <meta property="og:locale" content={lang === 'it' ? 'it_IT' : 'en_US'} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical || 'https://leader24.it'} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {ogImage && <meta property="twitter:image" content={ogImage} />}

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content={lang === 'it' ? 'Italian' : 'English'} />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Leader24" />
    </Helmet>
  );
}
