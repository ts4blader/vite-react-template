export type BatchActionType = "create" | "update" | "delete"

export type BatchAction<T> = {
  type: BatchActionType
  data: T
  _batchID: string
}
