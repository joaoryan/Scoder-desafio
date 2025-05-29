import type { LoadProducts } from '../../../domain/usecases'
import type { LoadProductsRepository } from '../../protocols'
import type { ProdutcsModel } from '../../../domain/models/produtcs'

export class DbLoadProdutcs implements LoadProducts {
  private readonly loadProductsRepository: LoadProductsRepository

  constructor(loadProductsRepository: LoadProductsRepository) {
    this.loadProductsRepository = loadProductsRepository
  }

  async load(): Promise<ProdutcsModel[] | null> {
    return await this.loadProductsRepository.loadProdutcs()
  }
}
