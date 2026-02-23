export type Example = {
  id: number
  name: string
}

export type ExampleDetail = Example & {
  // Add any additional fields for the detail view here
}

export type CreateExamplePayload = {
  name: string
}

export type UpdateExamplePayload = {
  name: string
}

export type ListExamplesParams = {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}
