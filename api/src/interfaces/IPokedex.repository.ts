export interface IPokedexRepository {
  getFavorites(): Promise<IIndexedPokedex | null>

  getPokemons(): Promise<IIndexedPokedex | null>

  insertFavorite(userId: string, pokemonId: number): Promise<boolean>

  insertPokemon(userId: string, pokemonId: number): Promise<boolean>

  deleteFavorite(userId: string, pokemonId: number): Promise<boolean>

  deletePokemon(userId: string, pokemonId: number): Promise<boolean>
}

export interface IIndexedPokedex {
  [id: string]: number[]
}

export interface IAction {
  userId: string
  pokemonId: number
  pokemonIds: IIndexedPokedex
  storeKey: string
}
