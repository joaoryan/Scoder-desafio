export class NoRowsAffected extends Error {
  constructor (id?: number) {
    super(`No rows affected, id ${id} not found.`)
    this.name = 'NoRowsAffected'
  }
};