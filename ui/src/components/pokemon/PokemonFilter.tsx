import {POKEMON_TYPES_MAP} from '../../constants'
import type {IndexedType} from '../../interfaces'
import {pokemonFilter, pokemonFilterItem} from './PokemonFilter.styles'
import {VStack} from '../../../styled-system/jsx'

interface PokemonFilterProps {
  onClick: (type: IndexedType) => void
}

function PokemonFilter({onClick}: PokemonFilterProps) {
  return (
    <VStack className={pokemonFilter}>
      {
        POKEMON_TYPES_MAP.map((type: IndexedType) => (
          <div key={type.name} className={pokemonFilterItem} onClick={() => onClick(type)}>
            {type.name}
          </div>
        ))
      }
    </VStack>
  )
}

export default PokemonFilter;
