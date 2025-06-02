import { updateProductsSchema } from '../../../../presentation/schemas';
import components from '../../components';

export const updateProductsPath = {
  put: {
    tags: ['Products'],
    summary: 'Update products',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: updateProductsSchema.body,
        },
      },
    },
    responses: {
      '200': {
        description: 'Products successfully updated',
        content: {
          'application/json': {
            schema: updateProductsSchema.response[200],
          },
        },
      },
      '400': components.badRequest,
      '403': components.unauthorized,
      '500': components.serverError
    },
  },
}