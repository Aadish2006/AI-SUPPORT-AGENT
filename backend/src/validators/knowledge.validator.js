import { z } from 'zod';

export const uploadDocumentSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    sourceType: z.enum(['pdf', 'faq', 'product_doc', 'resolved_ticket'])
  }),
  params: z.object({}),
  query: z.object({})
});

export const faqSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    items: z.array(
      z.object({
        question: z.string().min(1),
        answer: z.string().min(1)
      })
    ).min(1)
  }),
  params: z.object({}),
  query: z.object({})
});

export const deleteDocumentSchema = z.object({
  body: z.object({}),
  params: z.object({
    documentId: z.string().uuid()
  }),
  query: z.object({})
});
