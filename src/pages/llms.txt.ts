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
    `- [Humic COA Red-Flag Checker & Verifier](${site}/tools/coa-verifier): Instant COA diagnostic checker flagging sulfur >0.75% (sodium lignosulfonate), sodium >1.5% (NaOH substitution), colorimetric inflation >85%, and water insolubles >2%.`,
    `- [Extended ICP-OES & Heavy-Metal COA Auditor](${site}/tools/coa-red-flag-checker): Instant Certificate of Analysis auditor flagging sodium lignosulfonate sulfur (>0.75% S), NaOH sodium spikes, colorimetric assay inflation, ash bias, and EU FPR heavy-metal breaches.`,
    `- [Manufacturer Blend pH & Compatibility Estimator](${site}/tools/formulation-ph-estimator): B2B liquid concentrate simulator estimating blended pH, precipitation/gelation risk, bottle-swelling microbial gas risk, and Humate-to-Fulvate switch thresholds.`,
    `- [Instant Static Search (Pagefind)](${site}/search): Full-text static search across all guides, crop schedules, tools, and glossary definitions.`,
    `- [Peer-Reviewed Humic Research Library](${site}/research-library): Curated, filterable index of 18 landmark peer-reviewed papers and international analytical/regulatory standards (Achard 1786 to ISO 19822 & EU FPR 2019/1009).`,
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

  lines.push(
    '',
    '## Hindi Farmer Hub (/hi — हिन्दी किसान ज्ञान केंद्र)',
    `- [हिन्दी किसान ज्ञान केंद्र (Hindi Farmer Hub)](${site}/hi): Natural-Hindi agricultural knowledge hub for Indian farmers covering potassium humate, dosage, farm purity tests, and crop schedules.`,
    `- [ह्यूमिक एसिड क्या है? खेती में सही उपयोग, मात्रा और सावधानियां](${site}/hi/humic-acid-kya-hai-aur-upyog): Complete Hindi guide to humic acid soil conditioning, drip/soil/foliar dosage, and Calcium Nitrate / acid tank-mix precautions.`,
    `- [असली और नकली पोटैशियम ह्यूमेट की पहचान: खेत पर 3 मिनट का आसान टेस्ट](${site}/hi/asli-nakli-potassium-humate-ki-pehchan): Practical Hindi 3-minute farm test using cold water, vinegar/lemon, and odor/foam clues to spot coal dust, sodium humate, and lignosulfonate.`,
    `- [गन्ने की खेती में ह्यूमिक एसिड: जड़ विकास, कल्ले (Tillering) और पेड़ी (Ratoon) प्रबंधन](${site}/hi/ganne-ki-kheti-mein-humic-acid): Stage-by-stage Hindi sugarcane guide from basal DAP/urea co-application and 20–30 day root flush to tillering and ratoon rejuvenation.`,
    ''
  );

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
