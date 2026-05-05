import { defineConfig } from 'astro/config';

// 사이트 URL — Vercel 배포 후 실제 URL로 교체
export default defineConfig({
  site: 'https://example.vercel.app',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
