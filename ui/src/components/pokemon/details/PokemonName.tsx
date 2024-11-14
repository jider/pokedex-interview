import {pokemonNameStyles} from './PokemonName.styles'

function PokemonName({name}: {name: string}) {
  return (
    <span className={pokemonNameStyles}> {name}</span>
  )
}

export default PokemonName;
