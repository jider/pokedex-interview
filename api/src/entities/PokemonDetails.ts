import {IPokemonStats, IPokemonType} from '../interfaces'

export class PokemonDetails {
  constructor(
    public readonly id: number,
    public readonly abilities: string[],
    public readonly otherStats: IPokemonStats[],
    public readonly stats: IPokemonStats[],
    public readonly types: IPokemonType[]
  ) {
  }
}
