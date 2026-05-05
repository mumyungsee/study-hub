import { defineCollection, z } from 'astro:content';

// 블로그 콘텐츠 스키마 — 50_블로그_*.md의 프론트매터와 일치
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    projects: z.array(z.string()).optional(),
    themes: z.array(z.string()).optional(),
    status: z.enum(['초안', '공개', '책_챕터_후보']).default('초안'),
    description: z.string().optional(),
  }),
});

export const collections = { blog };
