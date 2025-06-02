import { deleteProductsSchema } from '../../../../presentation/schemas';
import components from '../../components';

export const deleteProductsPath = {
  delete: {
    tags: ['Products'],
    summary: 'Delete products',
    requestParams: {
      required: true,
      path: deleteProductsSchema.params,
    },
    responses: {
      '200': {
        description: 'Products deleted successfully',
        content: {
          'application/json': {
            schema: deleteProductsSchema.response[200],
          },
        },
      },
      '400': components.badRequest,
      '403': components.unauthorized,
      '500': components.serverError
    },
  },
}