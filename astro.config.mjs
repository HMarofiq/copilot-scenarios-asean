import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import remarkScenario from './src/lib/remark-scenario.mjs';

// GitHub Pages project site. Update SITE_URL / BASE_PATH if the repo owner or name changes.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://hmarofiq.github.io',
  base: process.env.BASE_PATH ?? '/copilot-scenarios-asean',
  trailingSlash: 'always',
  markdown: { remarkPlugins: [remarkDirective, remarkScenario] },
});
