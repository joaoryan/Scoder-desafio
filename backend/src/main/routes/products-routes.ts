import type { Router } from 'express';
import { adptRoute, adptMiddleware } from '../adapters';
import { validationMiddleware } from '../../presentation/middlewares';

import {
  addProductsSchema
} from '../../presentation/schemas';

import {
  makeAddProdutcsController
} from '../factories/controllers';


export default (router: Router) => {

  router.post(
    '/products',
    validationMiddleware(addProductsSchema),
    adptRoute(makeAddProdutcsController())
  );
};