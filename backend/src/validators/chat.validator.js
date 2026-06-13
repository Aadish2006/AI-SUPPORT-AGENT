import { z } from 'zod';

export const sendMessageSchema = z.object({
  body: z.object({
    sessionId: z.string().uuid().optional(),
    userId: z.string().optional(),
    message: z.string().min(1).max(4000)
  }),
  params: z.object({}),
  query: z.object({})
});

export const sessionMessagesSchema = z.object({
  body: z.object({}),
  params: z.object({
    sessionId: z.string().uuid()
  }),
  query: z.object({})
});
