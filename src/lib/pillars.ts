export interface PillarDefinition {
  slug: string;
  name: PillarName;
  code: string;
  audience: 'Farmers & Agronomists' | 'Biostimulant Manufacturers' | 'All Audiences';
  subtitle: string;
  canonicalSummary: string;
}

export const PILLARS = [
  'Origins & Chemistry',
  'Raw Materials & Extraction',
  'Quality & Testing',
  'Agronomy & Application',
  'Crops & Field Guides',
  'Biostimulant Synergies',
  'Formulation & Manufacturing',
  'Problem Soils & Climate',
  'Regulations & Organic Standards',
  'Soil Health & Sustainability',
  'Home Gardening & Horticulture',
  'Humic vs. X Comparisons',
] as const;

export type PillarName = (typeof PILLARS)[number];

export const PILLAR_LIST: PillarDefinition[] = [
  {
    slug: 'origins',
    name: 'Origins & Chemistry',
    code: 'PILLAR 01',
    audience: 'All Audiences',
    subtitle:
      'Geological formation of leonardite, supramolecular soil chemistry, and operational distinctions among humic acid, fulvic acid, and humin.',
    canonicalSummary:
      'Origins & Chemistry examines how plant and microbial residues humify over millions of years into oxidized leonardite deposits, how supramolecular humic assemblies function as soil redox shuttles and high-CEC colloids, and why operational solubility across pH cleanly separates humic acid, fulvic acid, and humin.',
  },
  {
    slug: 'raw-materials',
    name: 'Raw Materials & Extraction',
    code: 'PILLAR 02',
    audience: 'All Audiences',
    subtitle:
      'Feedstock comparisons across leonardite, lignite, peat, and compost, plus KOH vs. NaOH alkaline extraction chemistry and sodicity risks.',
    canonicalSummary:
      'Raw Materials & Extraction compares geological leonardite, unoxidized lignite, peat, and mature compost as commercial humic feedstocks, detailing why potassium hydroxide (KOH) extraction produces agronomically superior potassium humate while cheaper sodium hydroxide (NaOH) introduces clay-dispersing exchangeable sodium into irrigated soils.',
  },
  {
    slug: 'quality-and-testing',
    name: 'Quality & Testing',
    code: 'PILLAR 03',
    audience: 'All Audiences',
    subtitle:
      'ISO 19822 (Lamar) and IHSS laboratory verification, detecting sodium lignosulfonate sulfur clues, and rapid 3-minute farm-level adulteration screening.',
    canonicalSummary:
      'Quality & Testing equips farmers, agronomists, and importers to detect commercial humic adulteration—including sodium lignosulfonate (>3% sulfur vs. <0.75%), raw coal dust, and colorimetric assay inflation—using both rapid on-farm physical tests and internationally standardized ISO 19822 DAX-8 resin laboratory assays.',
  },
  {
    slug: 'agronomy',
    name: 'Agronomy & Application',
    code: 'PILLAR 04',
    audience: 'Farmers & Agronomists',
    subtitle:
      'Precision protocols for soil broadcast, drip fertigation, foliar sprays, seed coating, hard borewell water conditioning, crop calendars, and fertilizer NUE ROI math.',
    canonicalSummary:
      'Agronomy & Application provides field-tested protocols for applying potassium humate and fulvic acid across soil, drip fertigation, foliar, and seed treatments, addressing hard borewell water precipitation (>250 ppm CaCO₃), phenological crop timing, hormetic dose ceilings, and transparent urea/DAP nutrient use efficiency math.',
  },
  {
    slug: 'crops',
    name: 'Crops & Field Guides',
    code: 'PILLAR 05',
    audience: 'Farmers & Agronomists',
    subtitle:
      'Crop-specific humic and fulvic schedules for sugarcane, tropical and temperate fruit orchards (mango, citrus, grapes, pomegranate), and high-value vegetables (tomato, chili, onion, potato).',
    canonicalSummary:
      'Crops & Field Guides delivers stage-by-stage humic and fulvic fertilization calendars tailored to specific crop physiologies—from sugarcane tillering and ratoon rejuvenation to orchard pre-flowering root flushes and vegetable transplant establishment, calcium mobility, and uniform tuber and bulb sizing.',
  },
  {
    slug: 'synergies',
    name: 'Biostimulant Synergies',
    code: 'PILLAR 06',
    audience: 'All Audiences',
    subtitle:
      'Multi-pathway physiological synergies and liquid formulation engineering uniting humic substances, Ascophyllum nodosum kelp extracts, and enzymatic L-amino acids.',
    canonicalSummary:
      'Biostimulant Synergies explains how pairing leonardite humic substances with cold-water Ascophyllum nodosum seaweed extracts and enzymatic L-amino acids activates complementary rhizosphere, osmoprotective, and metabolic pathways—covering both farm tank mixing and industrial liquid concentrate stability.',
  },
  {
    slug: 'manufacturing',
    name: 'Formulation & Manufacturing',
    code: 'PILLAR 07',
    audience: 'Biostimulant Manufacturers',
    subtitle:
      'Vendor-neutral B2B formulation science: preventing bottle swelling and gelation, solving the humic pH conflict, leonardite procurement audits, and export checklists.',
    canonicalSummary:
      'Formulation & Manufacturing delivers vendor-neutral B2B engineering guidance for biostimulant producers, covering liquid concentrate shelf-life stability, microbial gas buildup prevention, potassium humate vs. acid-stable fulvate pH selection, container-level leonardite COA auditing, and global export registration playbooks.',
  },
  {
    slug: 'problem-soils',
    name: 'Problem Soils & Climate',
    code: 'PILLAR 08',
    audience: 'Farmers & Agronomists',
    subtitle:
      'Targeted soil-conditioning and abiotic stress guides for high-pH calcareous soils, acidic laterites, sandy deserts, compacted heavy clays, sodic/saline belts, and extreme weather.',
    canonicalSummary:
      'Problem Soils & Climate translates soil colloid and rhizosphere chemistry into targeted agronomic strategies for difficult soils and extreme weather—covering calcareous iron/phosphorus lockup, acidic laterite aluminum toxicity, low-CEC sandy desert leaching, compacted heavy clay aeration, sodic/saline reclamation, and heatwave, drought, and frost stress physiology.',
  },
  {
    slug: 'regulations',
    name: 'Regulations & Organic Standards',
    code: 'PILLAR 09',
    audience: 'All Audiences',
    subtitle:
      'Worldwide agricultural usage laws and certified organic boundaries across USDA NOP/OMRI, EU FPR 2019/1009, EU 2018/848, US AAPFCO/CDFA, and India FCO/NPOP.',
    canonicalSummary:
      'Regulations & Organic Standards maps conventional biostimulant registration and certified organic eligibility across the United States (AAPFCO, CDFA, USDA NOP/OMRI), European Union (EU FPR 2019/1009 and EU 2018/848), India (FCO Schedule VI and NPOP), and international export markets.',
  },
  {
    slug: 'soil-and-sustainability',
    name: 'Soil Health & Sustainability',
    code: 'PILLAR 10',
    audience: 'All Audiences',
    subtitle:
      'Improving nitrogen and phosphorus recovery (NUE/PUE), curbing waterway eutrophication, nurturing mycorrhizal biodiversity, and restoring degraded farmland.',
    canonicalSummary:
      'Soil Health & Sustainability examines how humic conditioners strengthen regenerative agriculture by cutting synthetic nitrogen and phosphorus losses, protecting rivers and groundwater from runoff eutrophication, fostering arbuscular mycorrhizal fungi and earthworm habitats, and rebuilding degraded arable land.',
  },
  {
    slug: 'gardening',
    name: 'Home Gardening & Horticulture',
    code: 'PILLAR 11',
    audience: 'All Audiences',
    subtitle:
      'Safe small-scale dosing for kitchen gardens, raised beds, container ornamentals, turfgrass, and seedling trays using verified potassium humate and fulvic acid.',
    canonicalSummary:
      'Home Gardening & Horticulture translates field-scale humic soil science into safe, non-staining small-batch dilutions for raised vegetable beds, container ornamentals, seedling propagation trays, and compost enrichment—emphasizing strict low-concentration hormetic limits and hard tap-water care.',
  },
  {
    slug: 'comparisons',
    name: 'Humic vs. X Comparisons',
    code: 'PILLAR 12',
    audience: 'All Audiences',
    subtitle:
      'Evidence-based, head-to-head agronomic comparisons pitting humic and fulvic acids against compost, biochar, seaweed extract, mycorrhizal fungi, gypsum, and synthetic chelates (EDTA/DTPA/EDDHA).',
    canonicalSummary:
      'Humic vs. X Comparisons provides vendor-neutral, head-to-head scientific benchmarks comparing humic and fulvic substances against compost and vermicompost, biochar, Ascophyllum seaweed extract, arbuscular mycorrhizal fungi (AMF), agricultural gypsum, and synthetic chelates (EDTA, DTPA, EDDHA)—clarifying cost per acre, speed of action, soil suitability, and optimal synergy combinations.',
  },
];

export const PILLAR_BY_NAME: Record<PillarName, PillarDefinition> = Object.fromEntries(
  PILLAR_LIST.map((p) => [p.name, p])
) as Record<PillarName, PillarDefinition>;

export const PILLAR_BY_SLUG: Record<string, PillarDefinition> = Object.fromEntries(
  PILLAR_LIST.map((p) => [p.slug, p])
);
