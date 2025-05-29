import type { HttpRequest, HttpResponse } from './http';

export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>
};

export interface ControllerNotParamsRequest {
  handle(): Promise<HttpResponse>
};