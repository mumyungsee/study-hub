import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://life-wiki-nu.vercel.app',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
