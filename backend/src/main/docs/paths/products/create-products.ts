import { addProductsSchema } from '../../../../presentation/schemas';
import components from '../../components';

export const createProductsPath = {
  post: {
    tags: ['Products'],
    summary: 'Create new products',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: addProductsSchema.body,
        },
      },
    },
    responses: {
      '200': {
        description: 'Products added successfully',
        content: {
          'application/json': {
            schema: addProductsSchema.response[200],
          },
        },
      },
      '400': components.badRequest,
      '403': components.unauthorized,
      '500': components.serverError
    },
  },
}