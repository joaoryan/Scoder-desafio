export type HttpResponse<B = any> = {
  statusCode: number,
  body: B,
}

type Content = {
  body?: any
  query?: any
  headers?: any
  params?: any
}

export type HttpRequest<T = Content> = T
