import {flex} from '../../../../styled-system/patterns'
import {css} from '../../../../styled-system/css'

export const pokemonStatsStyles = css({
  bgColor: 'whitesmoke',
  borderRadius: '2xl',
  padding: '1rem',
  fontSize: 'small',
  gap: '2'
})

export const statWrapper = flex({
  direction: 'row',
  width: '100%',
  gap: '6'
})
