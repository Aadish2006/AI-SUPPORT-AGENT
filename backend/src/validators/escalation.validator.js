import { z } from 'zod';

export const listEscalationsSchema = z.object({
  body: z.object({}),
  params: z.object({}),
  query: z.object({
    status: z.enum(['open', 'assigned', 'resolved']).optional()
  })
});

export const escalationIdSchema = z.object({
  body: z.object({}),
  params: z.object({
    escalationId: z.string().uuid()
  }),
  query: z.object({})
});

export const updateEscalationStatusSchema = z.object({
  body: z.object({
    status: z.enum(['open', 'assigned', 'resolved']),
    agentNotes: z.string().max(3000).optional()
  }),
  params: z.object({
    escalationId: z.string().uuid()
  }),
  query: z.object({})
});
