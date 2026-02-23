import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { type ListExamplesParams } from "@/services/example/types"
import { exampleService } from "@/services/example"
import { EXAMPLE_KEYS } from "./keys"
import { useOptimistic } from "../optimistic"

type ListQueryReturn = Awaited<ReturnType<typeof exampleService.list>>
type DetailQueryReturn = Awaited<ReturnType<typeof exampleService.detail>>

export const useExampleList = (params?: ListExamplesParams) => {
  const { mergedOptimisticClosure } = useOptimistic()
  const key = EXAMPLE_KEYS.list(params)

  const query = useQuery({
    queryKey: key,
    queryFn: () => exampleService.list(params),
  })

  const queryData = useMemo(() => query.data?.data || [], [query.data])
  const optimistic = mergedOptimisticClosure<ListQueryReturn>(key)

  return { query, queryData, optimistic }
}

export const useExampleDetail = (id: string) => {
  const { mergedOptimisticClosure } = useOptimistic()
  const key = EXAMPLE_KEYS.detail(id)

  const query = useQuery({
    queryKey: key,
    queryFn: () => exampleService.detail(id),
    enabled: !!id,
  })

  const queryData = useMemo(() => query.data?.data, [query.data])
  const optimistic = mergedOptimisticClosure<DetailQueryReturn>(key)

  return { query, queryData, optimistic }
}
