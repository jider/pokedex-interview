import React from 'react';
import BaseStat from './BaseStat'
import type {PokemonStats} from '../../../interfaces'
import {pokemonStatsStyles, statWrapper} from './PokemonStats.styles'
import {VStack} from '../../../../styled-system/jsx'


interface PokemonStatsProps {
  stats: PokemonStats[]
  title: string
}

function PokemonMainStats({stats}: PokemonStatsProps) {
  return (
    <VStack className={pokemonStatsStyles}>
      <strong>Stats</strong>
      {stats.map(stat => (
        <div key={stat.name} className={statWrapper}>
          <BaseStat stat={stat}/>
        </div>
      ))}
    </VStack>
  );
}

export default PokemonMainStats;
