import {type IPokemonDetailsRequest, IPokemonRequest} from './contracts'
import {Pokemon} from '../entities'

export interface IPokemonInteractor {
  getAllStoredPokemons(): Promise<Pokemon[]>

  getStoredPokemonById(ids: number[]): Promise<Pokemon[]>

  getStoredPokemonIds(): Promise<number[]>

  syncData(pokemonRequest: IPokemonRequest[]): Promise<boolean>

  syncDetails(pokemonRequest: IPokemonDetailsRequest): Promise<boolean>
}
