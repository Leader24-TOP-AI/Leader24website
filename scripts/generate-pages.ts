import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the SSR template generator
const ssrTemplateModule = await import('../server/ssr-template.js');
const { generateSSRTemplate, getMetadataFromPath } = ssrTemplateModule;

// Define all routes to pre-render
const routes = [
  // Italian routes (primary language)
  { path: '/', lang: 'it' as const },
  { path: '/settori', lang: 'it' as const },
  { path: '/settori/ecommerce', lang: 'it' as const },
  { path: '/contatti', lang: 'it' as const },
  { path: '/casi-studio', lang: 'it' as const },
  { path: '/informativa-privacy', lang: 'it' as const },
  { path: '/privacy', lang: 'it' as const },
  { path: '/informativa-cookie', lang: 'it' as const },
  { path: '/cookie', lang: 'it' as const },
  { path: '/termini-di-servizio', lang: 'it' as const },
  { path: '/terms', lang: 'it' as const },

  // English routes (alternate language)
  { path: '/en', lang: 'en' as const },
  { path: '/en/', lang: 'en' as const },
  { path: '/en/industries', lang: 'en' as const },
  { path: '/en/industries/ecommerce', lang: 'en' as const },
  { path: '/en/contact-us', lang: 'en' as const },
  { path: '/en/case-studies', lang: 'en' as const },
  { path: '/en/privacy', lang: 'en' as const },
  { path: '/en/cookie', lang: 'en' as const },
  { path: '/en/terms-of-service', lang: 'en' as const },
];

async function generatePages() {
  const distPath = path.resolve(__dirname, '../dist/public');

  console.log('🚀 Starting pre-rendering of pages...\n');
  console.log(`📁 Output directory: ${distPath}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const route of routes) {
    try {
      // Get metadata for this route
      const { metadata } = await getMetadataFromPath(route.path, route.lang);

      // Generate HTML with SSR template
      const html = generateSSRTemplate(
        '', // appHtml (empty for static generation)
        metadata,
        { title: '', meta: '', link: '', script: '' }, // helmetTags (not used in static)
        route.lang
      );

      // Determine output file path
      let outputPath: string;
      if (route.path === '/' || route.path === '/en' || route.path === '/en/') {
        // Root paths
        const dir = route.path === '/' ? distPath : path.join(distPath, 'en');
        outputPath = path.join(dir, 'index.html');
      } else {
        // Nested paths
        const routePath = route.path.startsWith('/') ? route.path.slice(1) : route.path;
        const dir = path.join(distPath, routePath);
        outputPath = path.join(dir, 'index.html');
      }

      // Create directory if it doesn't exist
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Write HTML file
      fs.writeFileSync(outputPath, html, 'utf-8');

      console.log(`✅ ${route.lang.toUpperCase()} ${route.path.padEnd(30)} → ${path.relative(distPath, outputPath)}`);
      successCount++;

    } catch (error) {
      console.error(`❌ ${route.lang.toUpperCase()} ${route.path.padEnd(30)} → Error:`, error);
      errorCount++;
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`📊 Pre-rendering Summary:`);
  console.log(`   ✅ Success: ${successCount} pages`);
  console.log(`   ❌ Errors:  ${errorCount} pages`);
  console.log(`${'='.repeat(60)}\n`);

  if (errorCount > 0) {
    process.exit(1);
  }

  console.log('🎉 Pre-rendering completed successfully!\n');
}

// Run the generator
generatePages().catch((error) => {
  console.error('❌ Fatal error during pre-rendering:', error);
  process.exit(1);
});
