import {
  IIndexedPokemon,
  IIndexedPokemonDetails,
  IPokemonRepository,
  IStorageService
} from '../interfaces'
import {Pokemon} from '../entities'

const DEFAULT_KEYS = {
  pokemons: 'pokemons',
  pokemonDetails: 'pokemon-details'
}

export class PokemonRepository implements IPokemonRepository {
  constructor(private readonly storageService: IStorageService) {
  }

  async getIndexedPokemons(): Promise<IIndexedPokemon> {
    return await this.storageService.get(DEFAULT_KEYS.pokemons)
  }

  async getIndexedPokemonsById(ids: number[]): Promise<Pokemon[] | null> {
    const data: IIndexedPokemon = await this.storageService.get(DEFAULT_KEYS.pokemons)

    if (!data) return null

    let indexedPokemons: Pokemon[] = []
    for (const [id, pokemon] of Object.entries(data)) {
      const idNumber = Number(id)

      if (ids.includes(idNumber)) {
        const details = await this.getIndexedPokemonDetailsById(idNumber)
        if (details) pokemon.details = details
        indexedPokemons.push(pokemon as Pokemon)
      }
    }

    return indexedPokemons
  }

  async getIndexedPokemonDetails(): Promise<IIndexedPokemonDetails> {
    return await this.storageService.get(DEFAULT_KEYS.pokemonDetails)
  }

  async getIndexedPokemonDetailsById(id: number): Promise<IIndexedPokemonDetails | null> {
    const data = await this.storageService.get(DEFAULT_KEYS.pokemonDetails)

    if (!data) return null

    return data[id] ?? null
  }

  async getIndexedPokemonsIds(): Promise<number[]> {
    const data = await this.getIndexedPokemons()
    return data ? Object.keys(data).map(id => Number(id)) : []
  }

  async insertPokemonMainData(indexedPokemons: IIndexedPokemon): Promise<boolean> {
    const data = await this.storageService.set(DEFAULT_KEYS.pokemons, indexedPokemons)
    return !!data
  }

  async insertPokemonDetails(pokemonDetails: IIndexedPokemonDetails): Promise<boolean> {
    const data = await this.storageService.set(DEFAULT_KEYS.pokemonDetails, pokemonDetails)
    return !!data
  }
}
