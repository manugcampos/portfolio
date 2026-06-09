import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const jobs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/jobs' }),
  schema: z.object({
    company: z.string(),
    role_es: z.string(),
    role_en: z.string(),
    location_es: z.string().optional(),
    location_en: z.string().optional(),
    start: z.string(),
    end: z.string().optional(),
    url: z.string().url().optional(),
    summary_es: z.string(),
    summary_en: z.string(),
    highlights_es: z.array(z.string()).default([]),
    highlights_en: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/education' }),
  schema: z.object({
    institution: z.string(),
    institution_en: z.string().optional(),
    degree_es: z.string(),
    degree_en: z.string(),
    start: z.string(),
    end: z.string().optional(),
    location: z.string().optional(),
    note_es: z.string().optional(),
    note_en: z.string().optional(),
    order: z.number().default(0),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description_es: z.string(),
    description_en: z.string(),
    stack: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    logo: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const uses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/uses' }),
  schema: z.object({
    category_es: z.string(),
    category_en: z.string(),
    order: z.number().default(0),
    items: z.array(
      z.object({
        name: z.string(),
        description_es: z.string(),
        description_en: z.string(),
        url: z.string().url().optional(),
        image: z.string().optional(),
      })
    ),
  }),
});

export const collections = { jobs, education, projects, uses };
