export interface IndexedPokemon {
  name: string
  url: string
}

export interface IndexedPokemonsResponse {
  count: number
  next: string | null
  previousPage: string | null
  results: IndexedPokemon[]
}

export interface IndexedPokemonsByTypeResponse {
  id: string,
  pokemon: [
    { pokemon: IndexedPokemon }
  ]
}

export interface IndexedPokemonDetails {
  pokemons: PokemonBase[],
  nextCursor: string | null
}

export interface IndexedType {
  name: string
  url: string
}

export interface PokemonIdentity {
  id: number
  name: string
}

export interface PokemonBase extends PokemonIdentity {
  bgColor: string
  image: string
  imageUrl: string
  url: string
}

export interface PokemonDetails {
  abilities: string[],
  otherStats: PokemonStats[]
  stats: PokemonStats[]
  types: PokemonType[]
}

export interface Pokemon extends PokemonBase {
  details: PokemonDetails,
  inPokedex: boolean,
  isFavorite: boolean
}

export interface PokemonStats {
  baseStat: number
  name: string
}

export interface PokemonType {
  name: string
  image: string
  imageUrl: string
}

export interface PokemonByType {
  id: string,
  pokemons: PokemonBase[]
}

// Pokemon Details Request Types
export interface PokemonDetailsRequest extends PokemonDetails {
  id: number
}

// Pokemon Details Response Types
export interface PokemonDetailsResponse {
  abilities: PokemonAbilityResponse[]
  base_experience: number
  height: number
  id: number
  name: string
  stats: PokemonStatsResponse[]
  types: PokemonTypeResponse[]
  weight: number
}

export interface PokemonAbilityResponse {
  ability: PokemonAbilityDetailsResponse
  is_hidden: boolean
  slot: number
}

export interface PokemonAbilityDetailsResponse {
  name: string
  url: string
}

export interface PokemonStatsResponse {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface PokemonTypeResponse {
  slot: number
  type: {
    name: string
    url: string
  }
}
