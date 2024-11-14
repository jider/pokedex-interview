import BaseStat from './BaseStat'
import type {PokemonStats} from '../../../interfaces'
import {pokemonOtherStats} from './PokemonOtherStats.styles'
import {HStack, VStack} from '../../../../styled-system/jsx'

interface PokemonOtherStatsProps {
  otherStats: PokemonStats[]
}

function PokemonOtherStats({otherStats}: PokemonOtherStatsProps) {
  return (
    <HStack className={pokemonOtherStats}>
      {otherStats.map(stat => (
        <VStack key={stat.name} gap={1} flex={1}>
          <BaseStat stat={stat}/>
        </VStack>
      ))}
    </HStack>
  )
}

export default PokemonOtherStats;
