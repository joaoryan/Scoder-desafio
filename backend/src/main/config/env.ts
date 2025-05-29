import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development']).default('development'),
  LINK_PSW: z.string().url(),
  PORT: z.coerce.number().default(5050),
  ENV: z.enum(['DEVELOP']).default('DEVELOP')
});

export const env = envSchema.parse(process.env);