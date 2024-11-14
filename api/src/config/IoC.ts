import {AuthController, PokedexController, PokemonController} from '../controllers'
import {AuthInteractor, PokedexInteractor, PokemonInteractor} from '../interactors'
import {PokedexRepository, PokemonRepository, UserRepository} from '../repositories'
import {BrowserStorageService} from '../services/browserStorage.service.ts'
import {IUoW} from '../interfaces'

const storageService = BrowserStorageService.instance

const pokedexRepository = new PokedexRepository(storageService)
const pokemonRepository = new PokemonRepository(storageService)
const userRepository = new UserRepository(storageService)

// Unit of Work
const UoW: IUoW = {
  auth: userRepository,
  pokedex: pokedexRepository,
  pokemon: pokemonRepository,
}

const pokedexInteractor = new PokedexInteractor(UoW)
const pokemonInteractor = new PokemonInteractor(UoW)
const userInteractor = new AuthInteractor(UoW)

const pokedexController = new PokedexController(pokedexInteractor)
const pokemonController = new PokemonController(pokemonInteractor, pokedexInteractor)
const authController = new AuthController(userInteractor)

export {
  pokedexController,
  pokemonController,
  authController
}
