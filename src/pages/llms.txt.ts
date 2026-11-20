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
    `- [Manufacturer Blend pH & Stability Estimator](${site}/tools/blend-ph-estimator): Interactive B2B liquid formulation stability tool modeling humic source, partner biostimulant, target pH slider (3.0–10.0), and water hardness.`,
    `- [Free Embeddable Humic Science Calculators Directory](${site}/tools/embed): Open widget directory providing responsive iframe embed codes for all 4 calculators for universities, agronomy blogs, and farm portals.`,
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
    '',
    '## Gujarati Farmer Hub (/gu — ગુજરાતી ખેડૂત જ્ઞાન કેન્દ્ર)',
    `- [ગુજરાતી ખેડૂત જ્ઞાન કેન્દ્ર (Gujarati Farmer Hub)](${site}/gu): Practical natural-Gujarati farmer encyclopedia for humic acid dosage, purity testing, and sugarcane agronomy.`,
    `- [હ્યુમિક એસિડ શું છે? ખેતીમાં સાચો ઉપયોગ, પ્રમાણ અને સાવચેતી](${site}/gu/humic-acid-shu-che-ane-upyog): Complete Gujarati guide covering drip, soil, foliar, and seed dosage plus calcium nitrate and acid tank-mix precautions.`,
    `- [અસલી અને નકલી પોટેશિયમ હ્યુમેટની ઓળખ: ખેતર પર 3 મિનિટનો સરળ ટેસ્ટ](${site}/gu/asli-nakli-potassium-humate-olakh): Practical 3-minute Gujarati farm test to detect coal dust, sodium humate, and lignosulfonate.`,
    `- [શેરડીની ખેતીમાં હ્યુમિક એસિડ: મૂળનો વિકાસ, ફૂટ અને શેરડીના સાંઠાની જાડાઈ](${site}/gu/sherdi-ni-kheti-ma-humic-acid): Stage-by-stage Gujarati sugarcane guide covering basal application, early root establishment, 20–30 day foliar spray, tillering, cane girth, and ratoon management.`,
    '',
    '## Arabic MENA/GCC Hub (/ar — المركز العربي لأحماض الهيوميك)',
    `- [المركز العربي للزراعة (Arabic GCC & MENA Hub)](${site}/ar): Authoritative Modern Standard Arabic RTL hub focused on arid calcareous/saline soil management and ISO 19822 import quality.`,
    `- [حمض الهيوميك في التربة المالحة والجيرية: تحسين الخصوبة وكفاءة الري بالتنقيط](${site}/ar/humic-acid-saline-calcareous-soils): Arabic guide to managing high-pH calcareous soils, salinity/EC buffering, and preventing hard-water drip emitter clogging.`,
    `- [هيومات البوتاسيوم مقابل هيومات الصوديوم: دليل المزارع والمستورد لاختيار الجودة وفحص ISO 19822](${site}/ar/potassium-humate-vs-sodium-humate-guide): Arabic farmer and GCC importer guide contrasting potassium vs. sodium humate, COA inspection, and detecting lignosulfonate adulteration.`,
    '',
    '## Spanish Hub (/es — Centro Agronómico en Español)',
    `- [Centro de Conocimiento en Español (Spanish Hub)](${site}/es): Authoritative Spanish agronomy hub for Latin America and Spain covering fertigation, ISO 19822 quality, and humic chemistry.`,
    `- [Ácido Húmico y Fúlvico en Agricultura: Guía de Fertirrigación, Dosis y Compatibilidad en Tanque](${site}/es/acido-humico-agricultura-fertirrigacion): Drip fertigation dosages for avocado, banana, coffee, and berries, plus calcium nitrate and low-pH compatibility rules.`,
    `- [Humato de Potasio vs. Humato de Sodio: Estándar ISO 19822 y Cómo Detectar Adulteraciones](${site}/es/humato-de-potasio-calidad-iso-19822): Reading supplier COAs, detecting sodium lignosulfonate (>0.75% sulfur), and preventing sodium clay dispersion.`,
    '',
    '## Indonesian Hub (/id — Pusat Pengetahuan Asam Humat Indonesia)',
    `- [Pusat Pengetahuan Asam Humat (Indonesian Hub)](${site}/id): Authoritative Bahasa Indonesia hub focused on tropical acidic soils, palm oil, rice, and field purity verification.`,
    `- [Asam Humat untuk Tanah Masam Tropis: Meningkatkan Efisiensi Pupuk pada Padi, Kelapa Sawit & Hortikultura](${site}/id/asam-humat-tanah-masam-kelapa-sawit-padi): Unlocking fixed phosphorus from Al³⁺/Fe³⁺ in Ultisol/Oxisol laterite soils, boosting CEC, and improving NPK efficiency.`,
    `- [Kalium Humat vs. Natrium Humat: Standar ISO 19822 dan Tes Lapangan 3 Menit untuk Mendeteksi Pemalsuan](${site}/id/cara-membedakan-kalium-humat-asli-palsu): 3-minute water/acid/odor field test and ISO 19822 COA sulfur/sodium verification.`,
    ''
  );

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
