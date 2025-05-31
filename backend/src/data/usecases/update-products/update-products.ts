import type { UpdateProducts } from '../../../domain/usecases'
import type { UpadateProductsRepository } from '../../protocols'
import type { ProductsModel } from '../../../domain/models/products'

export class DbUpdateProducts implements UpdateProducts {
  private readonly upadateProductsRepository: UpadateProductsRepository

  constructor(upadateProductsRepository: UpadateProductsRepository) {
    this.upadateProductsRepository = upadateProductsRepository
  }

  async update(params: { id: number; productsData: ProductsModel }): Promise<ProductsModel | null> {
    return await this.upadateProductsRepository.updateProducts(params);
  }
}
