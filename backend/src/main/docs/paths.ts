import {
  createProductsPath,
  deleteProductsPath,
  loadProductsPath,
  updateProductsPath
} from './paths/';

const productsPaths = {
  '/create/products': createProductsPath,
  '/load/products': loadProductsPath,
  '/update/products': updateProductsPath,
  '/delete/products/{id}': deleteProductsPath
};

export default {
  ...productsPaths
};