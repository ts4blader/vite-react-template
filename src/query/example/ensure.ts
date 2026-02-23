import { useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"
import { EXAMPLE_KEYS } from "./keys"
import { exampleService } from "@/services/example"

export const useExampleEnsure = () => {
  const queryClient = useQueryClient()

  const ensureExampleDetail = useCallback(
    (id: string) => {
      return queryClient.ensureQueryData({
        queryKey: EXAMPLE_KEYS.detail(id),
        queryFn: () => exampleService.detail(id),
      })
    },
    [queryClient],
  )

  return {
    ensureExampleDetail,
  }
}
