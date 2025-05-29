import type { UpdateProdutcs } from '../../../domain/usecases'
import type { UpadateProductsRepository } from '../../protocols'
import type { ProdutcsModel } from '../../../domain/models/produtcs'

export class DbUpdateProdutcs implements UpdateProdutcs {
  private readonly upadateProductsRepository: UpadateProductsRepository

  constructor(upadateProductsRepository: UpadateProductsRepository) {
    this.upadateProductsRepository = upadateProductsRepository
  }

  async update(params: { id: number; produtcsData: ProdutcsModel }): Promise<ProdutcsModel | null> {
    return await this.upadateProductsRepository.updateProducts(params);
  }
}
