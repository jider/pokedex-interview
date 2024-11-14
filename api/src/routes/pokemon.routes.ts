import {pokemonController as controller} from '../config/IoC.ts'
import type {IPokemonDetailsRequest, IPokemonRequest, IRouter} from '../interfaces'

const router: IRouter = {
  'get-all': () => controller.getAllStoredPokemons(),
  'get-by-id': (ids) => controller.getStoredPokemonById(ids as number[]),
  'get-ids': () => controller.getStoredPokemonIds(),
  'sync-data': (payload) => controller.onSyncData(payload as IPokemonRequest[]),
  'sync-detail': (payload) => controller.onSyncDetail(payload as IPokemonDetailsRequest)
}

export default router
