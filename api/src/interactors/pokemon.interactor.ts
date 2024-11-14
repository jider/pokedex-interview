import {Pokemon} from '../entities'
import type {
  IIndexedPokemon,
  IIndexedPokemonDetails,
  IPokemonDetailsRequest,
  IPokemonInteractor,
  IPokemonRequest,
  IUoW
} from '../interfaces'

export class PokemonInteractor implements IPokemonInteractor {
  constructor(private readonly uow: IUoW) {
  }

  async getAllStoredPokemons(): Promise<Pokemon[]> {
    const indexedPokemons = await this.uow.pokemon.getIndexedPokemons()
    return indexedPokemons ? Object.values(indexedPokemons) : []
  }

  async getStoredPokemonIds(): Promise<number[]> {
    return await this.uow.pokemon.getIndexedPokemonsIds()
  }

  async getStoredPokemonById(ids: number[]): Promise<Pokemon[]> {
    const data = await this.uow.pokemon.getIndexedPokemonsById(ids)
    return data ?? []
  }

  async syncData(pokemonRequest: IPokemonRequest[]): Promise<boolean> {
    const indexedPokemons = await this.uow.pokemon.getIndexedPokemons()

    let pokemonsToStore = pokemonRequest
    if (indexedPokemons) {
      const indexedKeys = Array.from(Object.keys(indexedPokemons))

      pokemonsToStore = pokemonRequest.filter(pokemon => !indexedKeys.includes(`${pokemon.id}`))
    }

    if (pokemonsToStore.length === 0) return true

    // Create new indexed pokémon
    let indexedPokemonsToStore: IIndexedPokemon = {}
    for (const pokemon of pokemonsToStore) {
      indexedPokemonsToStore[pokemon.id] = {...pokemon}
    }

    return !indexedPokemons
      ? await this.uow.pokemon.insertPokemonMainData(indexedPokemonsToStore)
      : await this.uow.pokemon.insertPokemonMainData({...indexedPokemons, ...indexedPokemonsToStore})
  }

  async syncDetails(pokemonRequest: IPokemonDetailsRequest): Promise<boolean> {
    const indexedPokemons = await this.uow.pokemon.getIndexedPokemonDetails()

    if (indexedPokemons && indexedPokemons[pokemonRequest.id]) return true
    const newDetail: IIndexedPokemonDetails = {[pokemonRequest.id]: pokemonRequest}

    return !indexedPokemons
      ? await this.uow.pokemon.insertPokemonDetails(newDetail)
      : await this.uow.pokemon.insertPokemonDetails({...indexedPokemons, ...newDetail})
  }
}
