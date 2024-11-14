import {hstack} from '../../../styled-system/patterns'

export const pokedexCardStyles = hstack({
  width: 'clamp(min(400px, 100%), 40%, max(50vw, 50rem))',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  boxShadow: '0 .25rem .15rem 0 rgba(0,0,0,0.15)',
  border: '.2rem solid rgba(0,0,0,0.3)',
  borderRadius: 'md',
  padding: '2',
})
