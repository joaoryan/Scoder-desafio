import type { Router } from 'express';
import { adptRoute } from '../adapters';
import { validationMiddleware } from '../../presentation/middlewares';

import {
  addProductsSchema
} from '../../presentation/schemas';

import {
  makeAddProductsController,
  makeDeleteProductsController,
  makeLoadProductsController,
  makeUpdateProductsController
} from '../factories/controllers';
import { deleteProductsSchema } from '../../presentation/schemas/routes/delete-products-schema';
import { updateProductsSchema } from '../../presentation/schemas/routes/update-products-schema';
import { loadProductsSchema } from '../../presentation/schemas/routes/load-products-schema';



export default (router: Router) => {
  router.post(
    '/create/products',
    validationMiddleware(addProductsSchema),
    adptRoute(makeAddProductsController())
  );

  router.get(
    '/load/products',
    validationMiddleware(loadProductsSchema),
    adptRoute(makeLoadProductsController())
  );

  router.put(
    '/update/products',
    validationMiddleware(updateProductsSchema),
    adptRoute(makeUpdateProductsController())
  );

  router.delete(
    '/delete/products/:id',
    validationMiddleware(deleteProductsSchema),
    adptRoute(makeDeleteProductsController())
  );
};