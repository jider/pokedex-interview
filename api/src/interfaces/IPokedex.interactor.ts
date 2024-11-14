import {Pokemon} from '../entities'

export interface IPokedexInteractor {
  get(): Promise<Pokemon[] | null>

  addFavorite(id: number): Promise<boolean>

  insert(id: number): Promise<boolean>

  delete(id: number): Promise<boolean>

  removeFavorite(id: number): Promise<boolean>

  setPokemonInPokedex(pokemons: Pokemon[]): Promise<Pokemon[]>

  setPokemonAsFavorite(pokemons: Pokemon[]): Promise<Pokemon[]>
}
