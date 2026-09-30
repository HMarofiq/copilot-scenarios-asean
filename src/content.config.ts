import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { keys } from './lib/taxonomy';

const tags = (facet: string) => z.array(z.enum(keys(facet))).min(1);
const localized = z.object({ en: z.string().min(1), id: z.string().min(1), ms: z.string().min(1) });

const scenarios = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/scenarios' }),
  schema: z.object({
    id: z.string().regex(/^(bfsi|gov|enr|tel|x)-[a-z0-9-]+-\d{3}$/, 'id must look like bfsi-short-name-001'),
    title: localized,
    summary: localized,
    industry: tags('industry'),
    department: tags('department'),
    persona: tags('persona'),
    market: tags('market'),
    difficulty: z.number().int().refine((n) => keys('difficulty').includes(String(n)), 'difficulty must be 1 to 4'),
    surface: tags('surface'),
    licence: tags('licence'),
    inputs: z.array(z.object({ name: z.string(), format: z.string(), where: z.string(), count: z.string().optional(),
      kit: z.array(z.string()).optional(), steps: z.array(z.number().int().positive()).optional() })).min(1),
    // Optional: the end goal in one or two plain sentences (falls back to card.output), extra tools, and run time.
    objective: z.string().optional(),
    needs: z.array(z.string()).optional(),
    run_time: z.string().optional(),
    data: z.object({ sensitivity: z.enum(keys('sensitivity')), customer_pii: z.boolean(), signoff: z.string().min(1) }),
    impact: z.object({ baseline: z.string(), target: z.string(), evidence: z.enum(keys('evidence')) }),
    card: z.object({ problem: z.string().min(1), output: z.string().min(1) }),
    limits: z.array(z.string()).min(1),
    source_refs: z.array(z.url().refine((u) => u.startsWith('https://'), 'source_refs must be public https links')).min(1),
    status: z.enum(keys('status')),
    validated_on: z.coerce.date().optional(),
    validation_note: z.string().optional(),
    // Optional: one routine done several ways (see :::tier in CONTRIBUTING.md).
    tiers: z.array(z.object({
      key: z.enum(keys('tier')),
      licence: z.enum(keys('licence')),
      difficulty: z.number().int().refine((n) => keys('difficulty').includes(String(n)), 'difficulty must be 1 to 4'),
      surface: tags('surface'),
      runs: z.string().min(1),
      effort: z.string().min(1),
    })).min(2).optional(),
  }).superRefine((d, ctx) => {
    if (d.tiers) {
      const order = keys('tier');
      const ks = d.tiers.map((t) => t.key);
      if (new Set(ks).size !== ks.length) ctx.addIssue({ code: 'custom', path: ['tiers'], message: 'each tier key once' });
      if (ks.some((k, i) => i && order.indexOf(k) < order.indexOf(ks[i - 1]))) ctx.addIssue({ code: 'custom', path: ['tiers'], message: `tiers must follow taxonomy order: ${order.join(', ')}` });
      for (const t of d.tiers) {
        if (!d.licence.includes(t.licence)) ctx.addIssue({ code: 'custom', path: ['licence'], message: `add tier licence ${t.licence} to licence` });
        for (const s of t.surface) if (!d.surface.includes(s)) ctx.addIssue({ code: 'custom', path: ['surface'], message: `add tier surface ${s} to surface` });
      }
      const min = Math.min(...d.tiers.map((t) => t.difficulty));
      if (d.difficulty !== min) ctx.addIssue({ code: 'custom', path: ['difficulty'], message: `difficulty must be the entry tier level (${min})` });
    }
    if (d.status === 'draft' && d.validated_on) ctx.addIssue({ code: 'custom', path: ['validated_on'], message: 'draft scenarios have not been validated; remove validated_on' });
    if (d.status !== 'draft' && !d.validated_on) ctx.addIssue({ code: 'custom', path: ['validated_on'], message: `status ${d.status} needs validated_on` });
    if (d.status === 'partly-validated' && !d.validation_note) ctx.addIssue({ code: 'custom', path: ['validation_note'], message: 'say which steps were not exercised' });
    if (d.impact.evidence !== 'estimated' && d.status === 'draft') ctx.addIssue({ code: 'custom', path: ['impact', 'evidence'], message: 'a draft cannot have measured evidence' });
  }),
});

export const collections = { scenarios };
