import { describe, test, expect, jest } from '@jest/globals';
import { UpdateProductsController } from './update-products-controller';
import type { UpdateProducts } from '../../../domain/usecases';
import { ok, responseError, serverError } from '../../helpers';
import { ServerError } from '../../errors';

const mockUpdateProductsRequest = () => ({
  body: {
    id: 1,
    productsData: {
      name: "Suricopinho de Treinamento",
      price: "19.90",
      category: "Bebê",
      description: "Copinho divertido com orelhinhas de suricato para os pequenos aprenderem a beber sozinhos.",
      sales: 40,
      stock: 35
    }
  }
});

class DbUpdateProductsStub implements UpdateProducts {
  async update(params: { id: number, productsData: any }): Promise<any> {
    return {
      id: params.id,
      ...params.productsData
    };
  }
}

interface SutTypes {
  sut: UpdateProductsController;
  dbUpdateProductsStub: UpdateProducts;
}

const makeSut = (): SutTypes => {
  const dbUpdateProductsStub = new DbUpdateProductsStub();
  const sut = new UpdateProductsController(dbUpdateProductsStub);
  return {
    sut,
    dbUpdateProductsStub,
  };
};

describe('Testing the UpdateProductsController class', () => {
  describe('Dependency with UpdateProducts use case', () => {
    test('should call the update method only once', async () => {
      const { sut, dbUpdateProductsStub } = makeSut();
      const updateSpy = jest.spyOn(dbUpdateProductsStub, 'update');
      const httpRequest = mockUpdateProductsRequest();
      await sut.handle(httpRequest);
      expect(updateSpy).toHaveBeenCalledTimes(1);
    });

    test('should call the update method with the correct parameter', async () => {
      const { sut, dbUpdateProductsStub } = makeSut();
      const updateSpy = jest.spyOn(dbUpdateProductsStub, 'update');
      const httpRequest = mockUpdateProductsRequest();
      await sut.handle(httpRequest);
      expect(updateSpy).toHaveBeenCalledWith(mockUpdateProductsRequest().body);
    });

    test('should return 200 if update method returns an object', async () => {
      const { sut } = makeSut();
      const httpResponse = await sut.handle(mockUpdateProductsRequest());
      expect(httpResponse).toEqual(ok({
        id: 1,
        name: "Suricopinho de Treinamento",
        price: "19.90",
        category: "Bebê",
        description: "Copinho divertido com orelhinhas de suricato para os pequenos aprenderem a beber sozinhos.",
        sales: 40,
        stock: 35
      }));
    });

    test('should return 400 if update method returns null or falsy', async () => {
      const { sut, dbUpdateProductsStub } = makeSut();
      jest.spyOn(dbUpdateProductsStub, 'update').mockResolvedValueOnce(null);
      const httpResponse = await sut.handle(mockUpdateProductsRequest());
      expect(httpResponse).toEqual(responseError(400, 'Error update products'));
    });

    /*  test('should return 500 if update method throws', async () => {
       const { sut, dbUpdateProductsStub } = makeSut();
       jest.spyOn(dbUpdateProductsStub, 'update').mockRejectedValueOnce(new Error('Unexpected'));
       const httpResponse = await sut.handle(mockUpdateProductsRequest());
       expect(httpResponse).toEqual(serverError(new ServerError(expect.any(String))));
     }); */
  });
});
