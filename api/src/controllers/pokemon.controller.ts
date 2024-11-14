import {catchErrorAsync} from '../utils/error.ts'
import {createResponse} from '../utils/response.ts'
import type {IPokedexInteractor, IPokemonDetailsRequest, IPokemonInteractor, IPokemonRequest} from '../interfaces'

export class PokemonController {
  constructor(
    private readonly pokemonInteractor: IPokemonInteractor,
    private readonly pokedexInteractor: IPokedexInteractor
  ) {
  }

  async getAllStoredPokemons() {
    const [_error, data] = await catchErrorAsync(this.pokemonInteractor.getAllStoredPokemons())

    return data
      ? createResponse({status: 200, body: data})
      : createResponse({status: 400, msg: 'Not Found'})
  }

  async getStoredPokemonById(ids: number[]) {
    const [_error, data] = await catchErrorAsync(this.pokemonInteractor.getStoredPokemonById(ids))

    if (!data)
      return createResponse({status: 400, msg: 'Not Found'})

    let pokemons = await this.pokedexInteractor.setPokemonInPokedex(data)
    pokemons = await this.pokedexInteractor.setPokemonAsFavorite(pokemons)

    return data
      ? createResponse({status: 200, body: pokemons})
      : createResponse({status: 400, msg: 'Not Found'})
  }

  async getStoredPokemonIds() {
    const [_error, data] = await catchErrorAsync(this.pokemonInteractor.getStoredPokemonIds())

    return data
      ? createResponse({status: 200, body: data})
      : createResponse({status: 400, msg: 'Not Found'})
  }

  async onSyncData(pokemonRequest: IPokemonRequest[]) {
    const [_error, data] = await catchErrorAsync(this.pokemonInteractor.syncData(pokemonRequest))

    return data
      ? createResponse({status: 201})
      : createResponse({status: 400, msg: 'Not Found'})
  }

  async onSyncDetail(pokemonRequest: IPokemonDetailsRequest) {
    const [_error, data] = await catchErrorAsync(this.pokemonInteractor.syncDetails(pokemonRequest))

    return data
      ? createResponse({status: 201})
      : createResponse({status: 400, msg: 'Not Found'})
  }
}
