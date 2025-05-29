import { HttpResponse } from '../protocols';
import { ServerError } from '../errors';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { MensageError } from '../errors/mensage-error';

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const created = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: 201,
  body: data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});

export const responseError = (status: number, error: any): HttpResponse => ({
  statusCode: status,
  body: new MensageError(error),
});

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
});

export const notFound = (resource: { name: string; value: string | number; }): HttpResponse => ({
  statusCode: 404,
  body: new ResourceNotFoundError(resource),
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});