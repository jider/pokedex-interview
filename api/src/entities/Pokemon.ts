import {PokemonDetails} from './PokemonDetails.ts'

export class Pokemon {
  constructor(
    public readonly id: number,
    public readonly bgColor: string,
    public readonly image: string,
    public readonly imageUrl: string,
    public readonly name: string,
    public readonly url: string,
    public readonly details?: PokemonDetails,
    public readonly inPokedex?: boolean,
    public readonly isFavorite?: boolean,
  ) {
  }
}
