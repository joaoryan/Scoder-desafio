export interface DeleteProductsRepository {
  deleteProducts(params: DeleteProductsRepository.Parameter): Promise<boolean>;
};

export namespace DeleteProductsRepository {
  export type Parameter = {
    id: number
  };
};
