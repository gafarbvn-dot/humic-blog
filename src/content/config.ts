import { defineCollection, z } from 'astro:content';

export const PILLARS = [
  'Origins & Chemistry',
  'Raw Materials & Extraction',
  'Quality & Testing',
  'Agronomy & Application',
  'Biostimulant Synergies',
  'Regulations & Organic Standards',
  'Soil Health & Sustainability',
] as const;

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(10).max(120),
    description: z.string().min(50).max(220),
    canonicalAnswer: z
      .string()
      .refine(
        (val) => {
          const words = val.trim().split(/\s+/).filter(Boolean).length;
          return words >= 45 && words <= 60;
        },
        {
          message: 'canonicalAnswer must be between 45 and 60 words for optimal GEO citation.',
        }
      ),
    pillar: z.enum(PILLARS),
    isPillarPage: z.boolean().default(false),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    faqs: z
      .array(
        z.object({
          question: z.string().min(10),
          answer: z.string().min(20),
        })
      )
      .min(2),
    citations: z
      .array(
        z.object({
          title: z.string().min(5),
          source: z.string().min(5),
          url: z.string().url().optional(),
        })
      )
      .min(2),
  }),
});

export const collections = { articles };
