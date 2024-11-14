import {useMemo} from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {addFavorite, removeFavorite} from '../services'
import {QUERY_KEYS} from '../constants'

export const useFavoriteMutations = () => {
  const queryClient = useQueryClient()

  const onSuccess = (id: string) => {
    void queryClient.invalidateQueries({queryKey: [QUERY_KEYS.pokemon, id]})
    void queryClient.invalidateQueries({queryKey: [QUERY_KEYS.pokedex]})
  }

  const {mutate: mutateAdd, isPending: isPendingAdd} = useMutation({
    mutationFn: addFavorite,
    onSuccess: (id) => onSuccess(`${id}`),
    networkMode: 'always'
  })

  const {mutate: mutateRemove, isPending: isPendingRemove} = useMutation({
    mutationFn: removeFavorite,
    onSuccess: (id) => onSuccess(`${id}`),
    networkMode: 'always'
  })


  const handleAddFavorite = (id: string) => {
    if (isFavoriteMutationPending || id === '') return
    mutateAdd(Number(id))
  }

  const handleDeleteFavorite = (id: string) => {
    if (isFavoriteMutationPending || id === '') return
    mutateRemove(Number(id))
  }

  const isFavoriteMutationPending = useMemo(() => isPendingAdd || isPendingRemove, [isPendingAdd, isPendingRemove])

  return {
    isFavoriteMutationPending,
    handleAddFavorite,
    handleDeleteFavorite,
  }
}
