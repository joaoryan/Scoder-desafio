import { describe, test, expect, jest } from '@jest/globals';
import { DeleteProductsController } from './delete-products-controller';
import type { DeleteProducts } from '../../../domain/usecases';
import { ok, responseError, serverError } from '../../helpers';
import { ServerError } from '../../errors';

const mockDeleteProductsRequest = () => ({
  params: { id: 1 }
});

class DbDeleteProductsStub implements DeleteProducts {
  async delete(params: { id: number }): Promise<any> {
    return true;
  }
}

interface SutTypes {
  sut: DeleteProductsController;
  dbDeleteProductsStub: DeleteProducts;
}

const makeSut = (): SutTypes => {
  const dbDeleteProductsStub = new DbDeleteProductsStub();
  const sut = new DeleteProductsController(dbDeleteProductsStub);
  return {
    sut,
    dbDeleteProductsStub,
  };
};

describe('Testing the DeleteProductsController class', () => {
  describe('Dependency with DeleteProducts use case', () => {
    test('should call the delete method only once', async () => {
      const { sut, dbDeleteProductsStub } = makeSut();
      const deleteSpy = jest.spyOn(dbDeleteProductsStub, 'delete');
      const httpRequest = mockDeleteProductsRequest();
      await sut.handle(httpRequest);
      expect(deleteSpy).toHaveBeenCalledTimes(1);
    });

    test('should call the delete method with the correct parameter', async () => {
      const { sut, dbDeleteProductsStub } = makeSut();
      const deleteSpy = jest.spyOn(dbDeleteProductsStub, 'delete');
      const httpRequest = mockDeleteProductsRequest();
      await sut.handle(httpRequest);
      expect(deleteSpy).toHaveBeenCalledWith({ id: 1 });
    });

    test('should return 200 if delete method returns a truthy value', async () => {
      const { sut } = makeSut();
      const httpResponse = await sut.handle(mockDeleteProductsRequest());
      expect(httpResponse).toEqual(ok({}));
    });

    test('should return 400 if delete method returns null or falsy', async () => {
      const { sut, dbDeleteProductsStub } = makeSut();
      jest.spyOn(dbDeleteProductsStub, 'delete').mockResolvedValueOnce(false);
      const httpResponse = await sut.handle(mockDeleteProductsRequest());
      expect(httpResponse).toEqual(responseError(400, 'Error adding products'));
    });

    test('should return 500 if delete method throws', async () => {
      const { sut, dbDeleteProductsStub } = makeSut();
      jest.spyOn(dbDeleteProductsStub, 'delete').mockRejectedValueOnce(new Error('Unexpected'));
      const httpResponse = await sut.handle(mockDeleteProductsRequest());
      expect(httpResponse).toEqual(serverError(new ServerError('')));
    });
  });
});
