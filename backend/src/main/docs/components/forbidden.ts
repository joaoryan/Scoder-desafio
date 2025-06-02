import { errorSchema } from '../schemas/';

export const forbidden = {
  description: 'Access denied',
  content: {
    'application/json': {
      schema: errorSchema
    }
  }
};