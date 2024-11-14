import {type QueryKey, useQueryClient} from '@tanstack/react-query'

export const useInvalidateQueries = () => {
  const queryClient = useQueryClient()

  const invalidate = (queryKey?: QueryKey) => {
    return queryKey
      ? queryClient.invalidateQueries({queryKey})
      : queryClient.invalidateQueries()
  }


  return {
    invalidate,
  }
}
