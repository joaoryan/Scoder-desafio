import { errorSchema } from '../schemas/';

export const serverError = {
  description: 'Internal server error',
  content: {
    'application/json': {
      schema: errorSchema
    }
  }
};