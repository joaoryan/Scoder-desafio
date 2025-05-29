export class ResourceNotFoundError extends Error {
  constructor (resource: { name: string; value: string | number }) {
    super(`Resource ${resource.name} = ${resource.value} was not found`)
    this.name = 'ResourceNotFoundError'
  }
};