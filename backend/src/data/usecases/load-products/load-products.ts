import type { LoadProducts } from '../../../domain/usecases'
import type { LoadProductsRepository } from '../../protocols'
import type { ProductsModel } from '../../../domain/models/products'

export class DbLoadProducts implements LoadProducts {
  private readonly loadProductsRepository: LoadProductsRepository

  constructor(loadProductsRepository: LoadProductsRepository) {
    this.loadProductsRepository = loadProductsRepository
  }

  async load(): Promise<ProductsModel[] | null> {
    return await this.loadProductsRepository.loadProducts()
  }
}
