import { Helmet } from 'react-helmet-async';
import { PageMetadata } from '@/lib/metadata';
import { useEffect, useRef } from 'react';

interface SEOProps {
  metadata: PageMetadata;
  lang?: 'it' | 'en';
}

export default function SEO({ metadata, lang = 'it' }: SEOProps) {
  const { title, description, keywords, ogImage, ogType, canonical } = metadata;
  const titleRef = useRef<string>(title);

  // Aggiorna IMMEDIATAMENTE il document.title, senza aspettare React
  if (titleRef.current !== title) {
    console.log(`[SEO IMMEDIATE] Title changed from "${titleRef.current}" to "${title}"`);
    document.title = title;
    titleRef.current = title;
  }

  // Aggiorna manualmente il document.title quando cambiano i metadata
  useEffect(() => {
    console.log('[SEO useEffect] FIRED with:', {
      title,
      lang,
      'current document.title': document.title,
      'will set to': title,
      'canonical': canonical
    });

    // Forza l'aggiornamento immediatamente
    document.title = title;

    // AGGIORNA MANUALMENTE GLI HREFLANG - Bypass completo di Helmet
    // Rimuovi tutti gli hreflang esistenti
    document.querySelectorAll('link[hreflang]').forEach(link => link.remove());

    // Aggiungi i nuovi hreflang con l'URL corretto (sempre italiano)
    if (canonical) {
      const head = document.querySelector('head');

      const hreflangIt = document.createElement('link');
      hreflangIt.rel = 'alternate';
      hreflangIt.hreflang = 'it';
      hreflangIt.href = canonical;
      head?.appendChild(hreflangIt);

      const hreflangEn = document.createElement('link');
      hreflangEn.rel = 'alternate';
      hreflangEn.hreflang = 'en';
      hreflangEn.href = canonical;  // STESSO URL per entrambe le lingue
      head?.appendChild(hreflangEn);

      const hreflangDefault = document.createElement('link');
      hreflangDefault.rel = 'alternate';
      hreflangDefault.hreflang = 'x-default';
      hreflangDefault.href = canonical.split('/').slice(0, 3).join('/');  // Base URL
      head?.appendChild(hreflangDefault);

      console.log('[SEO] Manual hreflang tags added:', { canonical });
    }

    // Usa MutationObserver per impedire che altri componenti sovrascrivano il title
    const titleElement = document.querySelector('title');
    let observer: MutationObserver | null = null;

    if (titleElement) {
      observer = new MutationObserver(() => {
        if (document.title !== title) {
          console.log('[SEO MutationObserver] Title was changed externally, forcing back to:', title);
          document.title = title;
        }
      });

      observer.observe(titleElement, {
        childList: true,
        characterData: true,
        subtree: true
      });
    }

    // Usa setTimeout multipli per forzare l'aggiornamento
    // TRICK: Cambia temporaneamente a un titolo diverso per forzare il browser a notare il cambiamento
    const timer1 = setTimeout(() => {
      document.title = '...'; // Titolo temporaneo
      setTimeout(() => {
        document.title = title;
        console.log('[SEO setTimeout 0ms] Forced title update to:', title);
      }, 10);
    }, 0);

    const timer2 = setTimeout(() => {
      document.title = title;
      console.log('[SEO setTimeout 100ms] Forced title update to:', title);
    }, 100);

    const timer3 = setTimeout(() => {
      document.title = title;
      console.log('[SEO setTimeout 500ms] Final title update to:', title);
    }, 500);

    // Aggiorna anche i meta tag manualmente per garantire l'aggiornamento
    const updateMetaTag = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector);
      if (element) {
        const oldValue = element.getAttribute(attribute);
        element.setAttribute(attribute, value);
        console.log(`[SEO] Updated ${selector}: "${oldValue?.substring(0, 30)}..." → "${value.substring(0, 30)}..."`);
      } else {
        console.warn(`[SEO] Element not found: ${selector}`);
      }
    };

    updateMetaTag('meta[name="title"]', 'content', title);
    updateMetaTag('meta[name="description"]', 'content', description);
    updateMetaTag('meta[property="og:title"]', 'content', title);
    updateMetaTag('meta[property="og:description"]', 'content', description);
    updateMetaTag('meta[property="twitter:title"]', 'content', title);
    updateMetaTag('meta[property="twitter:description"]', 'content', description);

    if (keywords) {
      updateMetaTag('meta[name="keywords"]', 'content', keywords);
    }

    console.log('[SEO] ✅ Meta tags update complete. Final document.title:', document.title);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [title, description, keywords, lang]);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      {/* NOTA: <title> gestito manualmente in useEffect per garantire aggiornamenti reattivi */}
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Hreflang Tags - Gestiti manualmente in useEffect per evitare che Helmet li modifichi */}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType || 'website'} />
      <meta property="og:url" content={canonical || 'https://leader24.it'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:site_name" content="Leader24" />
      <meta property="og:locale" content={lang === 'it' ? 'it_IT' : 'en_US'} />
      {/* Alternate locale per Facebook */}
      <meta property="og:locale:alternate" content={lang === 'it' ? 'en_US' : 'it_IT'} />

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

      {/* Content Language - indica la lingua del contenuto corrente */}
      <meta httpEquiv="content-language" content={lang} />
    </Helmet>
  );
}
