import NoImage from '../../misc/NoImage'
import {circle} from '../../../../styled-system/patterns'
import {css} from '../../../../styled-system/css'

interface PokemonImageProps {
  image: string
  name: string
}

export const PokemonImage = ({image, name}: PokemonImageProps) => {
  return (
    <div className={circle({bgColor: 'gray.100/20'})}>
      {image
        ? <img className={css({width: 'xs'})} src={image} alt={name}/>
        : <NoImage />
      }
    </div>
  )
}

export default PokemonImage
