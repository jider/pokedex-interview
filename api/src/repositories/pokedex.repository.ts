import {IAction, IIndexedPokedex, IPokedexRepository, IStorageService} from '../interfaces'

const DEFAULT_KEYS = {
  pokedex: 'pokedex',
  favorites: 'favorites',
}

export class PokedexRepository implements IPokedexRepository {
  constructor(private readonly storageService: IStorageService) {
  }

  async getFavorites(): Promise<IIndexedPokedex | null> {
    const data: IIndexedPokedex = await this.storageService.get(DEFAULT_KEYS.favorites)
    return data ?? null
  }

  async getPokemons(): Promise<IIndexedPokedex | null> {
    const data: IIndexedPokedex = await this.storageService.get(DEFAULT_KEYS.pokedex)
    return data ?? null
  }

  async deleteFavorite(userId: string, pokemonId: number): Promise<boolean> {
    let pokemonIds = await this.getFavorites()
    if (!pokemonIds) return false

    return await this.delete({
      userId,
      pokemonId,
      pokemonIds,
      storeKey: DEFAULT_KEYS.favorites
    })
  }

  async deletePokemon(userId: string, pokemonId: number): Promise<boolean> {
    let pokemonIds = await this.getPokemons()
    if (!pokemonIds) return false

    return await this.delete({
      userId,
      pokemonId,
      pokemonIds,
      storeKey: DEFAULT_KEYS.pokedex
    })
  }

  async insertFavorite(userId: string, pokemonId: number): Promise<boolean> {
    let pokemonIds = await this.getFavorites()
    if (!pokemonIds) pokemonIds = {[userId]: []}

    return await this.insert({
      userId,
      pokemonId,
      pokemonIds,
      storeKey: DEFAULT_KEYS.favorites
    })
  }

  async insertPokemon(userId: string, pokemonId: number): Promise<boolean> {
    let pokemonIds = await this.getPokemons()
    if (!pokemonIds) pokemonIds = {[userId]: []}

    return await this.insert({
      userId,
      pokemonId,
      pokemonIds,
      storeKey: DEFAULT_KEYS.pokedex
    })
  }

  private async insert({userId, pokemonId, pokemonIds, storeKey}: IAction): Promise<boolean> {
    const userPokemons = pokemonIds[userId]
    if (!userPokemons) pokemonIds[userId] = []

    pokemonIds[userId] = Array.from(new Set([...pokemonIds[userId], pokemonId]))

    const data = await this.storageService.set(storeKey, pokemonIds)
    return !!data
  }

  private async delete({userId, pokemonId, pokemonIds, storeKey}: IAction): Promise<boolean> {
    const userPokemons = pokemonIds[userId]
    if (!userPokemons) return true;

    pokemonIds[userId] = pokemonIds[userId].filter(id => id !== pokemonId)

    const data = await this.storageService.set(storeKey, pokemonIds)
    return !!data
  }
}
