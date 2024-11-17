import {useQuery} from '@tanstack/react-query'
import {fetchPokemonDetailsById} from '../services'
import {QUERY_KEYS} from '../constants'

export const usePokemonDetails = (id: string) => {
  const {data, isError, isLoading} = useQuery({
    queryKey: [QUERY_KEYS.pokedex, id],
    queryFn: () => fetchPokemonDetailsById(id),
    staleTime: 1000 * 60 * 60,
    networkMode: 'always',
    retry: 3
  })

  return {
    isError,
    isLoading,
    pokemonDetails: data
  }
}

export default usePokemonDetails
