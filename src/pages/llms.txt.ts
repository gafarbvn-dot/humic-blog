import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { PILLAR_LIST } from '../lib/pillars';

export const GET: APIRoute = async () => {
  const articles = await getCollection('articles');
  const site = 'https://humic.blog';

  const lines: string[] = [
    '# Humic.blog — The Authoritative Educational Encyclopedia on Humic Substances',
    '',
    '> Humic.blog is an independent, vendor-neutral, peer-reviewed educational encyclopedia covering humic soil chemistry, geological leonardite extraction, ISO 19822 / IHSS analytical testing, precision field agronomy, B2B biostimulant formulation engineering, problem-soil remediation, and global organic regulations.',
    '',
    '## Editorial & Scientific Standards',
    `- Domain: ${site}`,
    `- About & Editorial Policy: ${site}/about`,
    `- Testing & Citation Methodology: ${site}/methodology`,
    `- Sitemap: ${site}/sitemap-index.xml`,
    '- Analytical Benchmarks: ISO 19822:2018 (Lamar / HPTA Method), IHSS Reference Protocols, AAPFCO, EU FPR 2019/1009, India FCO Schedule VI.',
    '- Scope: Strictly vendor-neutral and legally compliant (soil conditioning, cation exchange capacity, nutrient use efficiency, abiotic stress tolerance, liquid formulation stability). Zero pesticidal, fungicidal, or medicinal claims.',
    '',
    '## Core Hub & E-E-A-T Pages',
    `- [Homepage — Encyclopedia Authority Hub](${site}): Central index of all ${PILLAR_LIST.length} knowledge pillars, ${articles.length} technical guides, 4 interactive calculators, and the A–Z glossary.`,
    `- [About & Editorial Standards](${site}/about): Vendor-neutral independence policy, technical review board governance, and legally compliant agronomic scope.`,
    `- [Testing & Citation Methodology](${site}/methodology): How Humic.blog validates ISO 19822 metrics, calculator formulas, tank-mix chemistry, and peer-reviewed literature.`,
    '',
    '## Interactive Agronomic & B2B Formulation Tools',
    `- [Potassium Humate & Fulvic Acid Dosage Calculator](${site}/tools/dosage-calculator): Field dosage calculator across Drip Fertigation, Soil Broadcast, Foliar Spray, and Seed Treatment in Acres or Hectares.`,
    `- [Potassium Humate Tank-Mix Compatibility Checker](${site}/tools/tank-mix-checker): Instant Green/Amber/Red compatibility screening for mixing Potassium Humate or Fulvic Acid with Calcium Nitrate, Low-pH Acids, Urea/NPK, Seaweed Extract, L-Amino Acids, and Magnesium Sulfate.`,
    `- [COA Red-Flag Checker](${site}/tools/coa-red-flag-checker): Instant Certificate of Analysis auditor flagging sodium lignosulfonate sulfur (>0.75% S), NaOH sodium spikes, colorimetric assay inflation, ash bias, and EU FPR heavy-metal breaches.`,
    `- [Manufacturer Blend pH & Compatibility Estimator](${site}/tools/formulation-ph-estimator): B2B liquid concentrate simulator estimating blended pH, precipitation/gelation risk, bottle-swelling microbial gas risk, and Humate-to-Fulvate switch thresholds.`,
    `- [A–Z Humic Science Glossary](${site}/glossary): 18 standardized IHSS and ISO 19822 definitions encoded in DefinedTermSet JSON-LD.`,
    '',
    '## Pillar Hub Pages',
  ];

  for (const pillar of PILLAR_LIST) {
    const count = articles.filter((a) => a.data.pillar === pillar.name).length;
    lines.push(
      `- [${pillar.name} (${count} guides)](${site}/${pillar.slug}): ${pillar.subtitle}`
    );
  }

  lines.push('', `## Complete Technical Guide Index (${articles.length} Peer-Reviewed Articles)`);

  for (const pillar of PILLAR_LIST) {
    const group = articles
      .filter((a) => a.data.pillar === pillar.name)
      .sort((a, b) => Number(b.data.isPillarPage) - Number(a.data.isPillarPage));
    if (!group.length) continue;
    lines.push('', `### ${pillar.name}`);
    for (const entry of group) {
      lines.push(
        `- [${entry.data.title}](${site}/${entry.slug}): ${entry.data.canonicalAnswer}`
      );
    }
  }

  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
