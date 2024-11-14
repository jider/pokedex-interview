import {useQuery} from '@tanstack/react-query'
import {getPokemons} from '../services'
import {QUERY_KEYS} from '../constants'

export const usePokedexQueries = () => {
  const {data, isError, isLoading} = useQuery({
    queryKey: [QUERY_KEYS.pokedex],
    queryFn: () => getPokemons(),
    staleTime: 1000 * 60,
  })

  return {
    isError,
    isLoading,
    pokemons: data
  }
}
