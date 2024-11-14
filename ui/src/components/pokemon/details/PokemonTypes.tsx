import {css} from '../../../../styled-system/css'
import {Wrap} from '../../../../styled-system/jsx'
import type {PokemonType} from '../../../interfaces'

interface PokemonTypesProps {
  types: PokemonType[]
}

function PokemonTypes({types}: PokemonTypesProps) {
  return (
    <Wrap columnGap={4} rowGap={2}>
      {!!types
        ? (types.map((type) => (
          <span
            key={type.name}
            className={css({
              paddingBlock: '1',
              paddingInline: '4',
              backgroundColor: 'gray.800/20',
              borderRadius: 'xl',
              fontSize: 'sm'
            })}
          >
          {type.name}
        </span>
        )))
        : undefined
      }
    </Wrap>
  );
}

export default PokemonTypes;
