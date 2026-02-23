import { useMutation, useQueryClient } from "@tanstack/react-query"
import { EXAMPLE_KEYS } from "./keys"
import { exampleService } from "@/services/example"
import type { UpdateExamplePayload } from "@/services/example/types"

type Options = {
  revalidate?: boolean
}

export const useFileManagementMethods = ({
  revalidate = true,
}: Options = {}) => {
  const _queryClient = useQueryClient()
  const queryClient = revalidate ? _queryClient : undefined

  const handleCreate = useMutation({
    mutationFn: exampleService.create,
    onSuccess: () => {
      queryClient?.invalidateQueries({ queryKey: EXAMPLE_KEYS.lists() })
    },
  })

  const handleUpdate = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateExamplePayload }) =>
      exampleService.update(id, data),
    onSuccess: (_res, input) => {
      queryClient?.invalidateQueries({ queryKey: EXAMPLE_KEYS.lists() })
      queryClient?.invalidateQueries({
        queryKey: EXAMPLE_KEYS.detail(input.id),
      })
    },
  })

  const handleDelete = useMutation({
    mutationFn: exampleService.delete,
    onSuccess: (_res, id) => {
      queryClient?.invalidateQueries({ queryKey: EXAMPLE_KEYS.lists() })
      queryClient?.removeQueries({ queryKey: EXAMPLE_KEYS.detail(id) })
    },
  })

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
  }
}
