# Services

## Overview

This directory contains API service utilities for handling HTTP requests using the ofetch library. Services provide a clean, type-safe interface for communicating with REST APIs.

## Architecture

### Service Pattern

The project uses a functional service approach with:

- **Object-based services**: No class instantiation required
- **Generic methods**: Type-safe functions for different operations
- **Centralized configuration**: Shared ofetch instance with base URL
- **Consistent error handling**: Standardized response types

## Available Services

### Example Service (`example/`)

A complete CRUD service demonstrating best practices for API interactions.

#### Core Methods

**`create<T>(baseUrl: string, data: T)`**
Creates a new resource using POST request.

```typescript
const response = await exampleService.create<CreateExamplePayload>(
  "/api/example",
  {
    name: "New Item",
  },
)
```

**`list<T>(baseUrl: string, params?: ListExamplesParams)`**
Retrieves paginated list of resources with optional filtering.

```typescript
const response = await exampleService.list("/api/example", {
  page: 1,
  limit: 20,
  search: "query",
  sortBy: "name",
  sortOrder: "desc",
})
```

**`detail<T>(baseUrl: string, id: string)`**
Retrieves a single resource by ID.

```typescript
const response = await exampleService.detail<ExampleDetail>(
  "/api/example",
  "123",
)
```

**`update<T>(baseUrl: string, id: string, data: T)`**
Updates a resource using PUT request.

```typescript
const response = await exampleService.update<UpdateExamplePayload>(
  "/api/example",
  "123",
  {
    name: "Updated Name",
  },
)
```

**`delete(baseUrl: string, id: string)`**
Deletes a resource using DELETE request.

```typescript
const response = await exampleService.delete("/api/example", "123")
```

## Type Definitions

### Response Types

**`ApiResponse<T>`**
Standard API response wrapper.

```typescript
interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}
```

**`PaginatedResponse<T>`**
Paginated list response with metadata.

```typescript
interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
```

### Payload Types

**`CreateExamplePayload`**
Type for creating new example resources.

```typescript
interface CreateExamplePayload {
  name: string
}
```

**`UpdateExamplePayload`**
Type for updating example resources.

```typescript
interface UpdateExamplePayload {
  name: string
}
```

**`Example`**
Base example resource type.

```typescript
interface Example {
  id: number
  name: string
}
```

**`ExampleDetail`**
Extended example type for detail views.

```typescript
interface ExampleDetail extends Example {
  // Add any additional fields for detail view here
}
```

### Query Parameters

**`ListExamplesParams`**
Parameters for list requests with pagination and filtering.

```typescript
interface ListExamplesParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}
```

## Configuration

### ofetch Setup (`lib/ofetch/index.ts`)

Centralized ofetch configuration with base URL from environment.

```typescript
import { ofetch } from "ofetch"

export const api = ofetch.create({
  baseURL: import.meta.env.VITE_API_URL,
})
```

## Usage Patterns

### Basic Service Usage

```typescript
import { ExampleService } from "@/services/example"
import type {
  CreateExamplePayload,
  ListExamplesParams,
} from "@/services/example/types"

// Create item
const createItem = async (data: CreateExamplePayload) => {
  try {
    const response = await ExampleService.create("/api/example", data)
    if (response.success) {
      // Handle success
      console.log("Created:", response.data)
    } else {
      // Handle error
      console.error("Failed to create:", response.message)
    }
  } catch (error) {
    console.error("Network error:", error)
  }
}

// List items with pagination
const listItems = async (params?: ListExamplesParams) => {
  const response = await ExampleService.list("/api/example", params)
  return response.data
}

// Get item details
const getItemDetail = async (id: string) => {
  const response = await ExampleService.detail("/api/example", id)
  return response.data
}
```

### React Integration

```typescript
import { useState, useEffect } from 'react'
import { ExampleService } from '@/services/example'
import type { Example, ListExamplesParams } from '@/services/example/types'

export function ExampleList() {
  const [items, setItems] = useState<Example[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true)
        setError(null)

        const params: ListExamplesParams = {
          page: 1,
          limit: 20
        }

        const response = await ExampleService.list("/api/example", params)
        setItems(response.data)
      } catch (err) {
        setError('Failed to fetch items')
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  const handleCreate = async (data: CreateExamplePayload) => {
    try {
      await ExampleService.create("/api/example", data)
      // Refresh list
      const response = await ExampleService.list("/api/example", { page: 1, limit: 20 })
      setItems(response.data)
    } catch (err) {
      setError('Failed to create item')
    }
  }

  return (
    <div>
      {/* Component JSX */}
    </div>
  )
}
```

## Best Practices

### Error Handling

- **Always check `response.success`** before accessing data
- **Use try-catch blocks** for network error handling
- **Provide meaningful error messages** to users
- **Log errors for debugging** while avoiding sensitive data exposure

### Type Safety

- **Use generic types** for reusable service methods
- **Define specific payload types** for each operation
- **Extend base types** for detail views
- **Use proper query parameter types** for filtering

### Performance

- **Leverage ofetch auto-retry** for network failures
- **Use pagination** for large datasets
- **Implement proper caching** where appropriate
- **Avoid unnecessary re-renders** in React components

### Security

- **Never expose sensitive data** in error messages
- **Validate inputs** before sending requests
- **Use HTTPS endpoints** in production
- **Handle authentication** through ofetch interceptors if needed

## Environment Variables

- **`VITE_API_URL`**: Base URL for all API requests
- Configure in `.env` file: `VITE_API_URL=https://api.example.com`

## Creating New Services

1. **Define types** in `types.ts` file
2. **Create service object** with CRUD methods
3. **Use consistent naming** and patterns
4. **Include proper error handling** and type safety
5. **Document usage** with examples

## Benefits

- **Type Safety**: Full TypeScript support with proper generics
- **Consistency**: Standardized patterns across all services
- **Maintainability**: Clean, readable code structure
- **Performance**: Optimized requests with ofetch best practices
- **Error Handling**: Comprehensive error management
- **Testing**: Easy to mock and test individual methods
