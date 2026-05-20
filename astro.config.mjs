import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://study-hub-eta-olive.vercel.app',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
