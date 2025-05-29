import type { DeleteProductsRepository } from '../../protocols';
import { DeleteProducts } from '../../../domain/usecases/delete-products';

export class DbDeleteProdutcs implements DeleteProducts {
  private readonly deleteProductsRepository: DeleteProductsRepository

  constructor(deleteProductsRepository: DeleteProductsRepository) {
    this.deleteProductsRepository = deleteProductsRepository
  }

  async delete(params: { id: number }): Promise<boolean> {
    return await this.deleteProductsRepository.deleteProducts(params)
  }
}
