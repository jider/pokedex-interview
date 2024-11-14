import {FastAverageColor} from 'fast-average-color'

const fac = new FastAverageColor()

import {apiFetch} from '@my-pokedex-app/api'
import {
  POKEMON_API_DEFAULT_LIMIT,
  POKEMON_API_POKEMON_URL, POKEMON_IMAGE_ARTWORK_URL, POKEMON_IMAGE_DEFAULT_EXTENSION,
} from '../constants'
import {
  IndexedPokemon,
  IndexedPokemonDetails,
  IndexedPokemonsByTypeResponse,
  IndexedPokemonsResponse,
  IndexedType,
  PokemonBase,
  PokemonByType,
  Pokemon,
  PokemonDetailsResponse,
  PokemonStats,
  PokemonType,
  PokemonDetailsRequest
} from '../interfaces'
// import {getCurrentNetworkStatus} from './network.service'
import {imageUrlToBase64} from '../utils'

export const fetchIndexedPokemons = async ({pageParam}: {
  pageParam: string | null
}): Promise<IndexedPokemonDetails> => {
  const res = await fetch(pageParam || `${POKEMON_API_POKEMON_URL}?limit=${POKEMON_API_DEFAULT_LIMIT}&offset=0`)
  if (!res.ok) return {pokemons: [], nextCursor: null}

  const data: IndexedPokemonsResponse = await res.json()
  const pokemons = await parseIndexedPokemons(data.results)

  return {
    pokemons,
    nextCursor: data.next
  }
}

export const fetchIndexedPokemonsByType = async (type: IndexedType): Promise<PokemonByType | null> => {
  const res = await fetch(type.url)

  if (!res.ok) return null

  const responseData: IndexedPokemonsByTypeResponse = await res.json()

  if (!responseData) return null

  const indexedPokemons = responseData.pokemon.map(p => p.pokemon)
  const pokemons = await parseIndexedPokemons(indexedPokemons)

  return {
    id: responseData.id,
    pokemons,
  }
}

export const fetchPokemonDetailsById = async (id: string): Promise<Pokemon | null> => {
  if (!id) return null

  const storedPokemonData = await fetchPokemonById([Number(id)])
  if (storedPokemonData.length === 0) return null

  const storedPokemonDetails = storedPokemonData.find(p => p.id === Number(id))
  if (storedPokemonDetails && storedPokemonDetails.details) return storedPokemonDetails

  // The pokemon is not in cache
  const response = await fetch(`${POKEMON_API_POKEMON_URL}/${id}`)
  if (!response.ok) return null

  const pokemonDetailsResponse: PokemonDetailsResponse = await response.json()
  if (!pokemonDetailsResponse) return null

  const abilities = pokemonDetailsResponse.abilities.map(item => item.ability.name)
  const otherStats: PokemonStats[] = [
    {name: 'Experience', baseStat: pokemonDetailsResponse.base_experience},
    {name: 'Height', baseStat: pokemonDetailsResponse.height},
    {name: 'Weight', baseStat: pokemonDetailsResponse.weight}
  ]
  const stats = pokemonDetailsResponse.stats.map<PokemonStats>(item =>
    ({baseStat: item.base_stat, name: item.stat.name}))
  const types = pokemonDetailsResponse.types.map<PokemonType>(item =>
    ({
      name: item.type.name,
      image: '',
      imageUrl: item.type.url
    })
  )

  await syncIndexedPokemonDetail({
    id: pokemonDetailsResponse.id,
    abilities,
    otherStats,
    stats,
    types
  })

  return {
    id: pokemonDetailsResponse.id,
    bgColor: storedPokemonData[0].bgColor,
    image: storedPokemonData[0].image,
    name: pokemonDetailsResponse.name,
    details: {
      abilities,
      otherStats,
      stats,
      types
    },
    inPokedex: false,
    isFavorite: false,
    url: '',
    imageUrl: ''
  }
}

export const fetchPokemonById = async (ids: number[]): Promise<Pokemon[]> => {
  const response = await apiFetch('pokemon/get-by-id', ids)
  if (!response.ok) return []

  return await response.json()
}

const getPokemonIdsStoredOrToFetch = async (pokemons: PokemonBase[]): Promise<[number[], number[]]> => {
  const allStoredIds: number[] = await fetchPokemonStoredIds()
  const pokemonIds = pokemons.map(pokemon => pokemon.id)
  const wantedStoredIds = pokemonIds.filter(id => allStoredIds.includes(id))
  const idsToFetch = new Set(pokemonIds).difference(new Set(wantedStoredIds))
  const idsFromStore = idsToFetch.size > 0
    ? Array.from(new Set(wantedStoredIds).difference(new Set(pokemonIds)))
    : wantedStoredIds

  return [idsFromStore, Array.from(idsToFetch)]
}

const fetchPokemonBgColor = async (pokemons: PokemonBase[]) => {
  try {
    const requests = pokemons.map((p) => fac.getColorAsync(p.imageUrl))
    const responses = await Promise.all(requests)

    return responses.map(res => res.error ? undefined : res.hex)
  } catch {
    return []
  }
}

const fetchPokemonImages = async <T extends { imageUrl: string }>(pokemonTypes: T[]) => {
  try {
    const requests = pokemonTypes.map((p) => fetch(p.imageUrl))
    const responses = await Promise.all(requests)
    const imageBlobs = responses.map(res => res.ok ? res.blob() : null)

    return await Promise.all(imageBlobs)
  } catch {
    return []
  }
}

const fetchPokemonStoredIds = async () => {
  const response = await apiFetch('pokemon/get-ids')
  if (!response.ok) return []

  return await response.json()
}

const indexedPokemonToPokemonItem = (indexedPokemon: IndexedPokemon) => {
  const id = Number(indexedPokemon.url
    .replace(POKEMON_API_POKEMON_URL, '')
    .replaceAll('/', ''))

  const pokemonItem: PokemonBase = {
    id,
    bgColor: '',
    name: indexedPokemon.name,
    url: indexedPokemon.url,
    imageUrl: `${POKEMON_IMAGE_ARTWORK_URL}/${id}${POKEMON_IMAGE_DEFAULT_EXTENSION}`,
    image: ''
  }
  return pokemonItem
}

const parseIndexedPokemons = async (indexedPokemons: IndexedPokemon[]): Promise<PokemonBase[]> => {
  let pokemons: PokemonBase[] = indexedPokemons.map((indexedPokemon: IndexedPokemon) =>
    indexedPokemonToPokemonItem(indexedPokemon)
  )

  // Get the pokémon ids to get from the store or that need to be fetched
  const [idsFromStore, idsToFetch] = await getPokemonIdsStoredOrToFetch(pokemons)

  // Get stored pokemons by id
  const pokemonsFromStore = await fetchPokemonById(idsFromStore)

  if (idsToFetch.length === 0) {
    return pokemonsFromStore.map(p => ({
      id: p.id,
      name: p.name,
      image: p.image,
      bgColor: p.bgColor,
      imageUrl: '',
      url: ''
    }))
  }

  // Fetch the pokemons additional data for the pokemons that are not stored, and sync them
  pokemons = pokemons.filter(pokemon => !idsFromStore.includes(pokemon.id))

  const images = await fetchPokemonImages(pokemons)
  for (const image of images) {
    const idx = images.indexOf(image)
    pokemons[idx].image = image ? await imageUrlToBase64(image) : ''
  }

  const colors = await fetchPokemonBgColor(pokemons)
  for (const color of colors) {
    const idx = colors.indexOf(color)
    pokemons[idx].bgColor = color ?? ''
  }

  await syncIndexedPokemons(pokemons)

  return pokemons
}

const syncIndexedPokemons = async (pokemons: PokemonBase[]) => {
  const response = await apiFetch('pokemon/sync-data', pokemons)
  if (!response.ok) return null
}

const syncIndexedPokemonDetail = async (pokemon: PokemonDetailsRequest) => {
  const response = await apiFetch('pokemon/sync-detail', pokemon)
  if (!response.ok) return null
}
