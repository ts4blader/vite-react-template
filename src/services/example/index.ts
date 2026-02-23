import { api } from "../../lib/ofetch"
import type { ApiResponse, PaginatedResponse } from "../types"
import type {
  CreateExamplePayload,
  ExampleDetail,
  ListExamplesParams,
  UpdateExamplePayload,
} from "./types"

export const exampleService = {
  create(data: CreateExamplePayload) {
    return api<ApiResponse<unknown>>("/api/example", {
      method: "POST",
      body: data,
    })
  },

  list(query?: ListExamplesParams) {
    return api<PaginatedResponse<unknown>>("/api/example", { query })
  },

  detail(id: string) {
    return api<ApiResponse<ExampleDetail>>(`/api/example/${id}`)
  },

  update(id: string, data: UpdateExamplePayload) {
    return api<ApiResponse<ExampleDetail>>(`/api/example/${id}`, {
      method: "PUT",
      body: data,
    })
  },

  delete(id: string) {
    return api<ApiResponse<void>>(`/api/example/${id}`, {
      method: "DELETE",
    })
  },
}
