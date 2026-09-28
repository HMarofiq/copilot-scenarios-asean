import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { keys } from './lib/taxonomy';

const tags = (facet: string) => z.array(z.enum(keys(facet))).min(1);
const localized = z.object({ en: z.string().min(1), id: z.string().min(1), ms: z.string().min(1) });

const scenarios = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/scenarios' }),
  schema: z.object({
    id: z.string().regex(/^(bfsi|gov|enr|x)-[a-z0-9-]+-\d{3}$/, 'id must look like bfsi-short-name-001'),
    title: localized,
    summary: localized,
    industry: tags('industry'),
    department: tags('department'),
    persona: tags('persona'),
    market: tags('market'),
    difficulty: z.number().int().refine((n) => keys('difficulty').includes(String(n)), 'difficulty must be 1 to 4'),
    surface: tags('surface'),
    licence: tags('licence'),
    inputs: z.array(z.object({ name: z.string(), format: z.string(), where: z.string(), count: z.string().optional() })).min(1),
    data: z.object({ sensitivity: z.enum(keys('sensitivity')), customer_pii: z.boolean(), signoff: z.string().min(1) }),
    impact: z.object({ baseline: z.string(), target: z.string(), evidence: z.enum(keys('evidence')) }),
    card: z.object({ problem: z.string().min(1), output: z.string().min(1) }),
    limits: z.array(z.string()).min(1),
    source_refs: z.array(z.url().refine((u) => u.startsWith('https://'), 'source_refs must be public https links')).min(1),
    validated_on: z.coerce.date(),
  }),
});

export const collections = { scenarios };
