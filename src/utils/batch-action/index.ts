import { prefixedIdGenerator } from "../generators"
import type { BatchAction, BatchActionType } from "./types"

const batchIDGenerator = prefixedIdGenerator("batch-item-")
export const generateBatchID = () => {
  return batchIDGenerator.next().value || Date.now().toString()
}

export const mergeBatch = <T>(actions: BatchAction<T>[]) => {
  // create map of batch IDs
  const batchMap = new Map<string, BatchAction<T>>()

  // populate map
  actions.forEach((action) => {
    const existingAction = batchMap.get(action._batchID)
    if (!existingAction) {
      batchMap.set(action._batchID, action)
    } else {
      // create/update + update = create/update
      if (
        (existingAction.type === "create" ||
          existingAction.type === "update") &&
        action.type === "update"
      ) {
        // merge the data
        existingAction.data = { ...existingAction.data, ...action.data }
      }

      // create/update + delete = delete
      if (
        (existingAction.type === "create" ||
          existingAction.type === "update") &&
        action.type === "delete"
      ) {
        batchMap.delete(action._batchID)
      }
    }
  })

  return [...batchMap.values()]
}

export const createBatchAction = <T>({
  type,
  data,
  batchID,
}: {
  type: BatchActionType
  data: T
  batchID?: string
}) => {
  return {
    type,
    data,
    _batchID: batchID || generateBatchID(),
  }
}

export const processBatch = async <T>(
  actions: BatchAction<T>[],
  map: Record<BatchActionType, Promise<unknown>>,
) => {
  const mergedBatch = mergeBatch(actions)
  const promises = mergedBatch.map((action) => map[action.type])

  const res = await Promise.allSettled(promises)

  const failed: (BatchAction<T> & { _reason: any })[] = []
  res.forEach((item, i) => {
    if (item.status === "rejected") {
      failed.push({
        _reason: item.reason,
        ...mergedBatch[i],
      })
    }
  })

  return { failed }
}
