import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define all routes with priority, changefreq and language mapping
// Italian pages (primary language) - higher priority
const italianRoutes = [
  { path: '/', enPath: '/en', priority: 1.0, changefreq: 'weekly' },
  { path: '/settori', enPath: '/en/industries', priority: 0.9, changefreq: 'weekly' },
  { path: '/settori/ecommerce', enPath: '/en/industries/ecommerce', priority: 0.9, changefreq: 'weekly' },
  { path: '/casi-studio', enPath: '/en/case-studies', priority: 0.9, changefreq: 'monthly' },
  { path: '/contatti', enPath: '/en/contact-us', priority: 0.8, changefreq: 'monthly' },
  { path: '/informativa-privacy', enPath: '/en/privacy', priority: 0.5, changefreq: 'yearly' },
  { path: '/privacy', enPath: '/en/privacy', priority: 0.5, changefreq: 'yearly' },
  { path: '/informativa-cookie', enPath: '/en/cookie', priority: 0.5, changefreq: 'yearly' },
  { path: '/cookie', enPath: '/en/cookie', priority: 0.5, changefreq: 'yearly' },
  { path: '/termini-di-servizio', enPath: '/en/terms-of-service', priority: 0.5, changefreq: 'yearly' },
  { path: '/terms', enPath: '/en/terms-of-service', priority: 0.5, changefreq: 'yearly' },
];

// English routes (alternate language) - very low priority to prioritize Italian
const englishRoutes = [
  { path: '/en', itPath: '/', priority: 0.3, changefreq: 'monthly' },
  { path: '/en/industries', itPath: '/settori', priority: 0.2, changefreq: 'monthly' },
  { path: '/en/industries/ecommerce', itPath: '/settori/ecommerce', priority: 0.2, changefreq: 'monthly' },
  { path: '/en/case-studies', itPath: '/casi-studio', priority: 0.2, changefreq: 'monthly' },
  { path: '/en/contact-us', itPath: '/contatti', priority: 0.2, changefreq: 'monthly' },
  { path: '/en/privacy', itPath: '/privacy', priority: 0.1, changefreq: 'yearly' },
  { path: '/en/cookie', itPath: '/cookie', priority: 0.1, changefreq: 'yearly' },
  { path: '/en/terms-of-service', itPath: '/termini-di-servizio', priority: 0.1, changefreq: 'yearly' },
];

function generateSitemap() {
  const baseUrl = 'https://leader24.ai';
  const lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  const distPath = path.resolve(__dirname, '../dist/public');

  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }

  // Generate single sitemap.xml with all pages - Italian priority
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  console.log('📝 Generating sitemap.xml (All pages - Italian priority)...\n');

  // Add Italian pages first with HIGH priority
  console.log('🇮🇹 Italian pages (HIGH priority):\n');
  for (const route of italianRoutes) {
    const url = `${baseUrl}${route.path}`;
    const englishUrl = `${baseUrl}${route.enPath}`;

    sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="it" href="${url}" />
    <xhtml:link rel="alternate" hreflang="en" href="${englishUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${url}" />
  </url>
`;
    console.log(`✅ IT ${route.path.padEnd(30)} priority: ${route.priority}`);
  }

  // Add English pages with VERY LOW priority
  console.log('\n🇬🇧 English pages (LOW priority):\n');
  for (const route of englishRoutes) {
    const url = `${baseUrl}${route.path}`;
    const italianUrl = `${baseUrl}${route.itPath}`;

    sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${url}" />
    <xhtml:link rel="alternate" hreflang="it" href="${italianUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${italianUrl}" />
  </url>
`;
    console.log(`✅ EN ${route.path.padEnd(30)} priority: ${route.priority}`);
  }

  sitemap += `</urlset>
`;

  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemap, 'utf-8');

  console.log(`\n${'='.repeat(60)}`);
  console.log(`✅ Sitemap generated successfully!`);
  console.log(`📁 Location: ${distPath}/sitemap.xml`);
  console.log(`\n📊 Statistics:`);
  console.log(`   🇮🇹 Italian pages: ${italianRoutes.length} (priority: 0.5-1.0)`);
  console.log(`   🇬🇧 English pages: ${englishRoutes.length} (priority: 0.1-0.3)`);
  console.log(`   📊 Total pages: ${italianRoutes.length + englishRoutes.length}`);
  console.log(`${'='.repeat(60)}\n`);
}

// Run the generator
try {
  generateSitemap();
} catch (error) {
  console.error('❌ Fatal error during sitemap generation:', error);
  process.exit(1);
}
