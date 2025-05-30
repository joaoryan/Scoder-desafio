import type { Router } from 'express';
import { adptRoute } from '../adapters';
import { validationMiddleware } from '../../presentation/middlewares';

import {
  addProductsSchema
} from '../../presentation/schemas';

import {
  makeAddProdutcsController
} from '../factories/controllers';
import { deleteProductsSchema } from '../../presentation/schemas/routes/delete-products-schema';
import { updateProductsSchema } from '../../presentation/schemas/routes/update-products-schema';
import { loadProductsSchema } from '../../presentation/schemas/routes/load-products-schema';
import { makeLoadProdutcsController } from '../factories/controllers/load-products';
import { makeUpdateProdutcsController } from '../factories/controllers/update-products';
import { makeDeleteProdutcsController } from '../factories/controllers/delete-products';


export default (router: Router) => {
  router.post(
    '/create/products',
    validationMiddleware(addProductsSchema),
    adptRoute(makeAddProdutcsController())
  );

  router.get(
    '/load/products',
    validationMiddleware(loadProductsSchema),
    adptRoute(makeLoadProdutcsController())
  );

  router.put(
    '/update/products',
    validationMiddleware(updateProductsSchema),
    adptRoute(makeUpdateProdutcsController())
  );

  router.delete(
    '/delete/products/:id',
    validationMiddleware(deleteProductsSchema),
    adptRoute(makeDeleteProdutcsController())
  );
};