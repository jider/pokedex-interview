import type {IPokedexInteractor} from '../interfaces'
import {catchErrorAsync} from '../utils/error.ts'
import {createResponse} from '../utils/response.ts'

export class PokedexController {
  constructor(private readonly interactor: IPokedexInteractor) {
  }

  async get() {
    const [_error, data] = await catchErrorAsync(this.interactor.get())

    return data
      ? createResponse({status: 200, body: data})
      : createResponse({status: 400, msg: 'Not Found'})
  }

  async addFavorite(id: number) {
    const [_error, data] = await catchErrorAsync(this.interactor.addFavorite(id))

    return data
      ? createResponse({status: 201, body: id})
      : createResponse({status: 400, msg: 'Not Found'})
  }

  async delete(id: number) {
    const [_error, data] = await catchErrorAsync(this.interactor.delete(id))

    return data
      ? createResponse({status: 204})
      : createResponse({status: 400, msg: 'Not Found'})
  }

  async insert(id: number) {
    const [_error, data] = await catchErrorAsync(this.interactor.insert(id))

    return data
      ? createResponse({status: 201, body: id})
      : createResponse({status: 400, msg: 'Not Found'})
  }

  async removeFavorite(id: number) {
    const [_error, data] = await catchErrorAsync(this.interactor.removeFavorite(id))

    return data
      ? createResponse({status: 204})
      : createResponse({status: 400, msg: 'Not Found'})
  }
}
