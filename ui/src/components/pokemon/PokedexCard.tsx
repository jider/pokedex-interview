import {heart, heartOutline, trashOutline} from 'ionicons/icons'
import BaseIcon from '../common/BaseIcon'
import {PokemonImage, PokemonName, PokemonTypes} from './details'
import type {Pokemon} from '../../interfaces'
import {pokedexCardStyles} from './PokedexCard.styles'
import {Float, VStack} from '../../../styled-system/jsx'
import {baseIcon} from '../../styles/recipes'

interface PokedexCardProps {
  pokemon: Pokemon,
  onDelete: () => void
  onFavorite: () => void
}

function PokedexCard({pokemon, onDelete, onFavorite}: PokedexCardProps) {
  return (
    <section
      key={pokemon.id}
      className={pokedexCardStyles}
      style={{backgroundColor: `${pokemon.bgColor || 'lightgray'}`}}
    >
      <VStack flex='1' alignItems='flex-start' justify='space-between' gap='6'>
        <VStack alignItems='flex-start' gap={0}>
          <strong>#{pokemon.id}</strong>
          <PokemonName name={pokemon.name} />
        </VStack>
        <PokemonTypes types={pokemon.details.types}/>
      </VStack>
      <VStack position='relative' width='40%'>
        <Float placement='top-end' offset='1'>
          <BaseIcon
            className={baseIcon({ size: 'small' })}
            icon={pokemon.isFavorite ? heart : heartOutline}
            onClick={onFavorite}
          />
        </Float>
        <Float placement='bottom-end' offset='1'>
          <BaseIcon
            className={baseIcon({ size: 'small' })}
            icon={trashOutline}
            onClick={onDelete}
          />
        </Float>
        <PokemonImage image={pokemon.image} name={pokemon.name}/>
      </VStack>
    </section>
  );
}

export default PokedexCard;
