import {useMemo} from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {addPokemon, deletePokemon} from '../services'
import {QUERY_KEYS} from '../constants'

export const usePokedexMutations = () => {
  const queryClient = useQueryClient()

  const onSuccess = (id: string) => {
    void queryClient.invalidateQueries({queryKey: [QUERY_KEYS.pokemon, id]})
    void queryClient.invalidateQueries({queryKey: [QUERY_KEYS.pokedex]})
  }

  const {mutate: mutateAdd, isPending: isPendingAdd} = useMutation({
    mutationFn: addPokemon,
    onSuccess: (id) => onSuccess(`${id}`)
  })

  const {mutate: mutateDelete, isPending: isPendingDelete} = useMutation({
    mutationFn: deletePokemon,
    onSuccess: (id) => onSuccess(`${id}`)
  })

  const isPokedexMutationPending = useMemo(() => isPendingAdd || isPendingDelete, [isPendingAdd, isPendingDelete])

  const handleAddPokemon = (id: string) => {
    if (isPokedexMutationPending || id === '') return
    mutateAdd(Number(id))
  }

  const handleDeletePokemon = (id: string) => {
    if (isPokedexMutationPending || id === '') return
    mutateDelete(Number(id))
  }

  return {
    isPokedexMutationPending,
    handleAddPokemon,
    handleDeletePokemon
  }
}
