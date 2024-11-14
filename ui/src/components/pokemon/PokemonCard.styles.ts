import {css} from '../../../styled-system/css'


export const imageStyles = css({objectFit: 'contain'})

export const linkStyles = css({
  textDecoration: 'none',
  textAlign: 'center'
})

export const pokemonCardStyles = css({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  overflow: 'hidden',
  padding: '1rem',
  boxShadow: '0 .25rem .15rem 0 rgba(0,0,0,0.15)',
  border: '.2rem solid rgba(0,0,0,0.3)',
  borderRadius: 'md'
})

export const pokemonIdStyles = css({
  position: 'absolute',
  right: 1,
  top: 0,
  color: 'white',
})

export const pokemonNameStyles = css({
  textTransform: 'capitalize',
  color: 'white',
  paddingTop: '.5rem'
})
