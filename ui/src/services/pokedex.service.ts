import {apiFetch} from '@my-pokedex-app/api'
import {Pokemon} from '../interfaces'

export const addFavorite = async (id: number): Promise<number | null> => {
  const response = await apiFetch('pokedex/add-favorite', id)
  return response.ok ? id : null
}

export const addPokemon = async (id: number): Promise<number | null> => {
  const response = await apiFetch('pokedex/insert', id)
  return response.ok ? id : null
}

export const deletePokemon = async (id: number): Promise<number | null> => {
  const response = await apiFetch('pokedex/delete', id)
  return response.ok ? id : null
}

export const getPokemons = async (): Promise<Pokemon[]> => {
  const response = await apiFetch('pokedex/get')
  if (!response.ok) return []
  return await response.json()
}

export const removeFavorite = async (id: number): Promise<number | null> => {
  const response = await apiFetch('pokedex/remove-favorite', id)
  return response.ok ? id : null
}
