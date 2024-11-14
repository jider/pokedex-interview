import PokemonCard from '../PokemonCard'
import type {PokemonBase} from '../../../interfaces'
import {galleryStyles} from './PokemonList.styles'

interface PokemonListProps {
  pokemons: PokemonBase[]
}

const pokemonList = ({pokemons}: PokemonListProps) => {
  return (
      <div className={galleryStyles}>
        {pokemons.length > 0
          ? pokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon}/>)
          : null
        }
      </div>
  )
}

export default pokemonList

