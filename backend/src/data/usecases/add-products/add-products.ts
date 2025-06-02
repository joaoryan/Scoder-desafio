import type { AddProducts } from '../../../domain/usecases';
import type { AddProductsRepository } from '../../protocols';
import type { ProductsModel } from '../../../domain/models/products';
import { Decimal } from '@prisma/client/runtime/library';

export class DbAddProducts implements AddProducts {
  private readonly addProductsRepository: AddProductsRepository;

  constructor(addProductsRepository: AddProductsRepository) {
    this.addProductsRepository = addProductsRepository
  };

  async add(params: { productsData: ProductsModel }): Promise<ProductsModel> {
    const payload: ProductsModel = {
      ...params.productsData,
      price: Decimal(params.productsData.price),
      creationDate: new Date(),
      lastupdateDate: new Date()
    };
    console.log(payload)
    return await this.addProductsRepository.addProducts({ productsData: payload });
  };
};
