import { type QueryKey, useQueryClient } from "@tanstack/react-query"
import { produce } from "immer"

export const useOptimistic = () => {
  const queryClient = useQueryClient()

  const mergedOptimisticClosure = <T>(key: QueryKey) => {
    return (callback: (draft: T) => void) =>
      queryClient.setQueryData(key, (prev: T) => produce(prev, callback))
  }

  return {
    mergedOptimisticClosure,
  }
}
