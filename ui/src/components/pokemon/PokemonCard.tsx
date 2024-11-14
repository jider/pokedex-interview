import {Link} from 'react-router-dom'
import type {PokemonBase} from '../../interfaces'
import NoImage from '../misc/NoImage'
import {imageStyles, linkStyles, pokemonCardStyles, pokemonIdStyles, pokemonNameStyles} from './PokemonCard.styles'

interface PokemonCardProps {
  pokemon: PokemonBase;
}

const pokemonCard = ({pokemon}: PokemonCardProps) => {
  return (
    <div className={pokemonCardStyles} style={{backgroundColor: `${pokemon.bgColor || 'lightgray'}`}}>
      <Link to={`/pokemon/${pokemon.id}`} className={linkStyles}>
        {pokemon.image
          ? <img src={pokemon.image} alt={pokemon.name} className={imageStyles} />
          : <NoImage />
        }
        <p className={pokemonNameStyles}>{pokemon.name}</p>
        <span className={pokemonIdStyles}>{pokemon.id}</span>
      </Link>
    </div>
  )
}

export default pokemonCard
