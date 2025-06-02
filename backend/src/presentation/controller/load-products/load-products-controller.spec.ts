import { describe, test, expect, jest } from '@jest/globals';
import { LoadProductsController } from './load-products-controller';
import type { LoadProducts } from '../../../domain/usecases';
import { ok, noContent, serverError } from '../../helpers';
import { ServerError } from '../../errors';

class DbLoadProductsStub implements LoadProducts {
  async load(): Promise<any[]> {
    return [{
      id: 1,
      name: "Suricopinho de Treinamento",
      price: "19.90",
      category: "Bebê",
      description: "Copinho divertido com orelhinhas de suricato para os pequenos aprenderem a beber sozinhos.",
      sales: 40,
      stock: 35
    }];
  }
}

interface SutTypes {
  sut: LoadProductsController;
  dbLoadProductsStub: LoadProducts;
}

const makeSut = (): SutTypes => {
  const dbLoadProductsStub = new DbLoadProductsStub();
  const sut = new LoadProductsController(dbLoadProductsStub);
  return {
    sut,
    dbLoadProductsStub,
  };
};

describe('Testing the LoadProductsController class', () => {
  describe('Dependency with LoadProducts use case', () => {
    test('should call the load method only once', async () => {
      const { sut, dbLoadProductsStub } = makeSut();
      const loadSpy = jest.spyOn(dbLoadProductsStub, 'load');
      await sut.handle();
      expect(loadSpy).toHaveBeenCalledTimes(1);
    });

    test('should return 200 if load method returns a list of products', async () => {
      const { sut } = makeSut();
      const httpResponse = await sut.handle();
      expect(httpResponse).toEqual(ok([{
        id: 1,
        name: "Suricopinho de Treinamento",
        price: "19.90",
        category: "Bebê",
        description: "Copinho divertido com orelhinhas de suricato para os pequenos aprenderem a beber sozinhos.",
        sales: 40,
        stock: 35
      }]));
    });

    test('should return 204 if load method returns null or falsy', async () => {
      const { sut, dbLoadProductsStub } = makeSut();
      jest.spyOn(dbLoadProductsStub, 'load').mockResolvedValueOnce(null);
      const httpResponse = await sut.handle();
      expect(httpResponse).toEqual(noContent());
    });

    test('should return 500 if load method throws', async () => {
      const { sut, dbLoadProductsStub } = makeSut();
      jest.spyOn(dbLoadProductsStub, 'load').mockRejectedValueOnce(new Error('Unexpected'));
      const httpResponse = await sut.handle();
      expect(httpResponse).toEqual(serverError(new ServerError('')));
    });
  });
});
