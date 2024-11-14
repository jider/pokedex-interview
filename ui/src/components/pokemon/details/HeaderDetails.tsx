import {
  addCircleOutline,
  caretBackOutline,
  heart,
  heartOutline,
  invertModeOutline,
  removeCircleOutline
} from 'ionicons/icons'
import type {Pokemon} from '../../../interfaces'
import {BaseHeader, baseHeaderStyles, HeaderIcon} from '../../../layout'
import {HStack} from '../../../../styled-system/jsx'
import {css} from '../../../../styled-system/css'

interface HeaderDetailsProps {
  pokemon: Pokemon,
  onAdd: () => void
  onFavorite: () => void
  disableAdd: boolean
  disableFavorite: boolean
}

function HeaderDetails({disableAdd, disableFavorite, pokemon, onAdd, onFavorite}: HeaderDetailsProps) {
  return (
    <BaseHeader
      className={baseHeaderStyles({visual: 'translucent'})}
      left={<HeaderIcon icon={caretBackOutline} to='/pokemon' />}
      right={
        <>
          <HStack gap={1}>
            <HeaderIcon icon={invertModeOutline} to='/pokedex' />
            <HeaderIcon
              disable={disableAdd}
              icon={pokemon.inPokedex ? removeCircleOutline : addCircleOutline}
              onClick={onAdd} />
            <HeaderIcon
              disable={disableFavorite}
              icon={pokemon.isFavorite ? heart : heartOutline}
              onClick={onFavorite} />
          </HStack>
          <strong className={pokemon.inPokedex ? css({color: 'yellow.200'}): undefined}>
            #{pokemon.id}
          </strong>
        </>
      }
    />
  );
}

export default HeaderDetails;
