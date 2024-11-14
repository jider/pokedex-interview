export interface IPokemonRequest {
  id: number
  bgColor: string
  image: string
  imageUrl: string
  name: string
  url: string
}

export interface IPokemonDetailsRequest extends Pick<IPokemonRequest, 'id'> {
  abilities: string[],
  otherStats: IPokemonStats[]
  stats: IPokemonStats[]
  types: IPokemonType[]
}

export interface IPokemonStats {
  baseStat: number
  name: string
}

export interface IPokemonType {
  name: string
  image: string
  imageUrl: string
}
