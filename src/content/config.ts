import { defineCollection, z } from 'astro:content';
import { PILLARS } from '../lib/pillars';

export { PILLARS };

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(10).max(125),
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
    audience: z
      .enum(['Farmers & Agronomists', 'Biostimulant Manufacturers', 'All Audiences'])
      .default('All Audiences'),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    howTo: z
      .object({
        name: z.string().min(5),
        description: z.string().min(20),
        totalTime: z.string().optional(),
        steps: z
          .array(
            z.object({
              name: z.string().min(3),
              text: z.string().min(15),
            })
          )
          .min(2),
      })
      .optional(),
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
