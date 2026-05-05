import { defineCollection, z } from 'astro:content';

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

const tutorial = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    chapter: z.number(),
    order: z.number(),
    track: z.enum(['필수', '심화', '부록']).optional(),
    description: z.string().optional(),
    status: z.enum(['초안', '공개']).default('초안'),
  }),
});

export const collections = { blog, tutorial };
