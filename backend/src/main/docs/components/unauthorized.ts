import { errorSchema } from '../schemas/';

export const unauthorized = {
  description: 'Invalid token',
  content: {
    'application/json': {
      schema: errorSchema
    }
  }
};