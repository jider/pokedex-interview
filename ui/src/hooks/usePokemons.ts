import {useInfiniteQuery, useQuery} from '@tanstack/react-query'
import type {IndexedType} from '../interfaces'
import {fetchIndexedPokemons, fetchIndexedPokemonsByType} from '../services'


export const usePokemons = () => {
  const {isLoading, isError, data, fetchNextPage, hasNextPage, isFetching} = useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: fetchIndexedPokemons,
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 1000 * 60,
  })

  let pokemons = data?.pages.flatMap(page => page.pokemons) ?? []

  return {
    fetchNextPage,
    isFetching,
    isLoading,
    isError,
    pokemons,
    hasNextPage
  }
}

export const usePokemonsByType = (type?: IndexedType) => {
  const {data, isError, isLoading} = useQuery({
    queryKey: ['pokemons', type?.name],
    queryFn: () => fetchIndexedPokemonsByType(type!),
    enabled: !!type
  })

  return {
    isFilterError: isError,
    isFilterLoading: isLoading,
    pokemons: data
  }
}
