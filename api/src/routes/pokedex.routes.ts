import {pokedexController as controller} from '../config/IoC.ts'
import type {IRouter} from '../interfaces'

const router: IRouter = {
  'get': () => controller.get(),
  'add-favorite': (id) => controller.addFavorite(id as number),
  'delete': (id) => controller.delete(id as number),
  'insert': (id) => controller.insert(id as number),
  'remove-favorite': (id) => controller.removeFavorite(id as number)
}

export default router
