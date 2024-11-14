import type {PokemonStats} from '../../../interfaces'
import {statTitle} from './BaseStat.styles'

interface BaseStatProps {
  stat: PokemonStats
}

function BaseStat({stat}: BaseStatProps) {
  return (
    <>
      <span className={statTitle}>{stat.name}</span>
      {stat.baseStat ? <span>{stat.baseStat}</span> : null}
    </>
  );
}

export default BaseStat;
