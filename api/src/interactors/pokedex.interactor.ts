import {Pokemon} from '../entities'
import type {IPokedexInteractor, IUoW} from '../interfaces'

export class PokedexInteractor implements IPokedexInteractor {
  constructor(private readonly uow: IUoW) {
  }

  async get(): Promise<Pokemon[] | null> {
    const currentUser = await this.uow.auth.findSessionUser()
    if (!currentUser) return null

    const pokemonIds = await this.uow.pokedex.getPokemons()
    if (!pokemonIds) return null

    const userPokemon = pokemonIds[currentUser.id]
    if (!userPokemon || userPokemon.length === 0) return []

    const pokemons = await this.uow.pokemon.getIndexedPokemonsById(userPokemon)
    return pokemons
      ? await this.setPokemonAsFavorite(pokemons)
      : []
  }

  async addFavorite(id: number): Promise<boolean> {
    const currentUser = await this.uow.auth.findSessionUser()
    if (!currentUser) return false

    return await this.uow.pokedex.insertFavorite(currentUser.id, id)
  }

  async delete(id: number): Promise<boolean> {
    const currentUser = await this.uow.auth.findSessionUser()
    if (!currentUser) return false

    return await this.uow.pokedex.deletePokemon(currentUser.id, id)
  }

  async insert(id: number): Promise<boolean> {
    const currentUser = await this.uow.auth.findSessionUser()
    if (!currentUser) return false

    return await this.uow.pokedex.insertPokemon(currentUser.id, id)
  }

  async removeFavorite(id: number): Promise<boolean> {
    const currentUser = await this.uow.auth.findSessionUser()
    if (!currentUser) return false

    return await this.uow.pokedex.deleteFavorite(currentUser.id, id)
  }

  async setPokemonInPokedex(pokemons: Pokemon[]): Promise<Pokemon[]> {
    const currentUser = await this.uow.auth.findSessionUser()
    if (!currentUser) return pokemons

    const pokemonsInPokedex = await this.uow.pokedex.getPokemons()
    if (!pokemonsInPokedex) return pokemons

    const userPokemons = pokemonsInPokedex[currentUser.id]
    if (!userPokemons || userPokemons.length === 0) return pokemons

    for (const pokemonId of userPokemons) {
      const idx = pokemons.findIndex(p => p.id === pokemonId)
      if (idx >= 0) {
        pokemons[idx] = {...pokemons[idx], inPokedex: true}
      }
    }

    return pokemons
  }

  async setPokemonAsFavorite(pokemons: Pokemon[]): Promise<Pokemon[]> {
    const currentUser = await this.uow.auth.findSessionUser()
    if (!currentUser) return pokemons

    const pokemonsAsFavorite = await this.uow.pokedex.getFavorites()
    if (!pokemonsAsFavorite) return pokemons

    const userPokemons = pokemonsAsFavorite[currentUser.id]
    if (!userPokemons || userPokemons.length === 0) return pokemons

    for (const pokemonId of userPokemons) {
      const idx = pokemons.findIndex(p => p.id === pokemonId)
      if (idx >= 0) {
        pokemons[idx] = {...pokemons[idx], isFavorite: true}
      }
    }

    return pokemons
  }
}
