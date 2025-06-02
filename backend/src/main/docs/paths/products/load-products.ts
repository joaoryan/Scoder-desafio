import { loadProductsSchema } from '../../../../presentation/schemas';
import components from '../../components';

export const loadProductsPath = {
  get: {
    tags: ['Products'],
    summary: 'Load products',

    responses: {
      '200': {
        description: 'Load Products successfully',
        content: {
          'application/json': {
            schema: loadProductsSchema.response[200],
          },
        },
      },
      '400': components.badRequest,
      '403': components.unauthorized,
      '500': components.serverError
    },
  },
}