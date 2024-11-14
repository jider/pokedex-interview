import {Pokemon, PokemonDetails} from '../entities'

export interface IPokemonRepository {
  getIndexedPokemonsById(ids: number[]): Promise<Pokemon[] | null>

  getIndexedPokemons(): Promise<IIndexedPokemon>

  getIndexedPokemonsIds(): Promise<number[]>

  getIndexedPokemonDetails(): Promise<IIndexedPokemonDetails>

  insertPokemonMainData(data: IIndexedPokemon): Promise<boolean>

  insertPokemonDetails(data: IIndexedPokemonDetails): Promise<boolean>
}

export interface IIndexedPokemon {
  [id: number]: Pokemon
}

export interface IIndexedPokemonDetails {
  [id: number]: PokemonDetails
}

