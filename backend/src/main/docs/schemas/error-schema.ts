import 'zod-openapi/extend';
import { z } from 'zod';

export const errorSchema = z.object({
  error: z.string().openapi({ description: 'Error message' }),
});
