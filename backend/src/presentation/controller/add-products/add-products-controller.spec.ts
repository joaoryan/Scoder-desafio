import { describe, test, expect, jest } from '@jest/globals';
import { AddProductsController } from './add-products-controller';
import type { AddProducts } from '../../../domain/usecases';
import { ok, responseError, serverError } from '../../helpers';
import { ServerError } from '../../errors';
import { ProductsModel } from '../../../domain/models/products';


const mockAddProductsRequest = () => ({
    body: {
        name: "Suricopinho de Treinamento",
        price: "19.90",
        category: "Bebê",
        description: "Copinho divertido com orelhinhas de suricato para os pequenos aprenderem a beber sozinhos.",
        sales: 40,
        stock: 35
    }
});

class DbAddProductsStub implements AddProducts {
    async add(params: { productsData: ProductsModel }): Promise<any> {
        return { success: true };
    }
}

interface SutTypes {
    sut: AddProductsController;
    dbAddProductsStub: AddProducts;
}

const makeSut = (): SutTypes => {
    const dbAddProductsStub = new DbAddProductsStub();
    const sut = new AddProductsController(dbAddProductsStub);
    return {
        sut,
        dbAddProductsStub,
    };
};

describe('Testing the AddProductsController class', () => {
    describe('Dependency with AddProducts use case', () => {
        test('should call the add method only once', async () => {
            const { sut, dbAddProductsStub } = makeSut();
            const addSpy = jest.spyOn(dbAddProductsStub, 'add');
            const httpRequest = mockAddProductsRequest();
            await sut.handle(httpRequest);
            expect(addSpy).toHaveBeenCalledTimes(1);
        });

        test('should call the add method with the correct parameter', async () => {
            const { sut, dbAddProductsStub } = makeSut();
            const addSpy = jest.spyOn(dbAddProductsStub, 'add');
            const httpRequest = mockAddProductsRequest();
            await sut.handle(httpRequest);
            expect(addSpy).toHaveBeenCalledWith({
                productsData: httpRequest.body,
            });
        });

        test('should return 200 if add method returns an object', async () => {
            const { sut } = makeSut();
            const httpResponse = await sut.handle(mockAddProductsRequest());
            expect(httpResponse).toEqual(ok({ success: true }));
        });

        test('should return 400 if add method returns null', async () => {
            const { sut, dbAddProductsStub } = makeSut();
            jest.spyOn(dbAddProductsStub, 'add').mockResolvedValueOnce(null);
            const httpResponse = await sut.handle(mockAddProductsRequest());
            expect(httpResponse).toEqual(responseError(400, 'Error adding products'));
        });

        test('should return 500 if add method throws', async () => {
            const { sut, dbAddProductsStub } = makeSut()
            jest.spyOn(dbAddProductsStub, 'add').mockRejectedValueOnce(new Error('Unexpected'))
            const httpResponse = await sut.handle(mockAddProductsRequest())
            expect(httpResponse).toEqual(serverError(new ServerError('')))
        });
    });
})
