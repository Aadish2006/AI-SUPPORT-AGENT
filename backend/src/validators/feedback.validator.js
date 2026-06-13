import { z } from 'zod';

export const submitFeedbackSchema = z.object({
  body: z.object({
    sessionId: z.string().uuid(),
    messageId: z.string().uuid().optional(),
    rating: z.enum(['thumbs_up', 'thumbs_down']),
    comment: z.string().max(1000).optional()
  }),
  params: z.object({}),
  query: z.object({})
});
