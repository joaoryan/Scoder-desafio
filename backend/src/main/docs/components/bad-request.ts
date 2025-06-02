import { errorSchema } from '../schemas/';

export const badRequest = {
  description: 'Invalid request',
  content: {
    'application/json': {
      schema: errorSchema
    }
  }
};