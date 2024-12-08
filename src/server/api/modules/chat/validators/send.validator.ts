import { z } from 'zod';
import type { typePayload } from '../types/send.types';

const sendSchema: z.ZodType<typePayload> = z.object({
  link: z.string().min(2).max(100),
  question: z.string().min(2).max(100),
});

export default sendSchema;
