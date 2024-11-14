import {IUserRepository} from './IUser.repository.ts'
import {IPokemonRepository} from './IPokemon.repository.ts'
import {IPokedexRepository} from './IPokedex.repository.ts'

export interface IUoW {
  auth: IUserRepository
  pokemon: IPokemonRepository
  pokedex: IPokedexRepository
}
