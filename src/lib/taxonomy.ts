import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

type Entry = { en: string; id?: string; ms?: string; description?: string };
export type Taxonomy = Record<string, Record<string, Entry>>;

export const taxonomy: Taxonomy = parse(readFileSync(join(process.cwd(), 'taxonomy', 'taxonomy.yml'), 'utf8'));

export const keys = (facet: string) => {
  const k = Object.keys(taxonomy[facet] ?? {});
  if (!k.length) throw new Error(`taxonomy.yml: facet "${facet}" is empty or missing`);
  return k as [string, ...string[]];
};

export const label = (facet: string, v: string | number) => taxonomy[facet]?.[String(v)]?.en ?? String(v);

export const FACETS = ['industry', 'department', 'persona', 'difficulty', 'surface', 'licence', 'market', 'status', 'evidence'] as const;
export const FACET_TITLES: Record<string, string> = {
  industry: 'Industry', department: 'Department', persona: 'Persona', difficulty: 'Level',
  surface: 'Applicability', licence: 'Licence', market: 'Market', status: 'Validation', evidence: 'Evidence',
};
