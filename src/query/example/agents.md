# Query Example

## Overview

This directory contains TanStack Query utilities for managing server state with optimized caching, background updates, and synchronization. It provides a complete query management system with hooks, keys, and mutation helpers, including optimistic updates using Immer.

## Architecture

### Query Management Pattern

The query system follows TanStack Query best practices:

- **Centralized Query Client**: Shared client configuration
- **Query Keys**: Structured key management for cache invalidation
- **Custom Hooks**: Specialized hooks for different query patterns
- **Mutation Helpers**: Optimized mutations with automatic cache updates
- **Data Ensuring**: Guaranteed data availability with `ensureQueryData`
- **Optimistic Updates**: Immer-based state updates for immediate UI feedback

## File Structure

### `index.ts` - Main Query Hooks

Core query hooks for list and detail views with memoization and optimistic updates.

### `keys.ts` - Query Key Management

Centralized query key definitions for cache invalidation and data management.

### `method.ts` - Mutation Helpers

Mutation hooks for CRUD operations with automatic cache invalidation.

### `ensure.ts` - Data Ensuring

Utility hooks for guaranteeing data availability and optimistic updates.

### `optimistic.ts` - Optimistic Updates

Immer-based optimistic update utilities for immediate UI feedback.

## Core Hooks

### `useExampleList(filter: ListExamplesParams)`

Retrieves paginated list of examples with filtering, caching, and optimistic updates.

```typescript
import { useExampleList } from '@/query/example'

export function ExampleList() {
  const { query, queryData, optimistic } = useExampleList({
    page: 1,
    limit: 20,
    search: "active"
  })

  return (
    <div>
      <h2>Examples ({queryData.length})</h2>
      {query.isLoading && <div>Loading...</div>}
      <ul>
        {queryData.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

**Features:**

- Automatic loading states
- Memoized data with `useMemo`
- Error handling included
- Pagination support
- Search and filtering
- Optimistic updates with immediate UI feedback

### `useExampleDetail(id: string)`

Retrieves single example by ID with conditional fetching and optimistic updates.

```typescript
import { useExampleDetail } from '@/query/example'

export function ExampleDetail({ id }: { id: string }) {
  const { query, queryData, optimistic } = useExampleDetail(id)

  return (
    <div>
      <h3>{queryData.name}</h3>
      <p>{queryData.description}</p>
      {query.isLoading && <div>Loading...</div>}
    </div>
  )
}
```

**Features:**

- Conditional fetching with `enabled` option
- Automatic error boundaries
- Loading and error states
- Optimized re-renderers
- Optimistic state integration

## Mutation Helpers

### `useFileManagementMethods()`

Complete set of mutation hooks for CRUD operations with optimistic updates.

```typescript
import { useFileManagementMethods } from '@/query/example/method'

export function ExampleManager() {
  const {
    handleCreate,
    handleUpdate,
    handleDelete
  } = useFileManagementMethods()

  const createExample = async (data: CreateExamplePayload) => {
    await handleCreate(data)
    // Success callback automatically invalidates cache
  }

  const updateExample = async (id: string, data: UpdateExamplePayload) => {
    await handleUpdate({ id, data })
    // Success callback automatically updates relevant queries
  }

  const deleteExample = async (id: string) => {
    await handleDelete(id)
    // Success callback automatically removes from cache
  }

  return (
    <div>
      <button onClick={() => createExample({ name: "New Example" })}>
        Create Example
      </button>
    </div>
  )
}
```

**Features:**

- Automatic cache invalidation on success
- Optimistic updates support
- Loading states for each mutation
- Error handling with try-catch
- Batch operations support

## Query Keys

### `EXAMPLE_KEYS`

Structured query key management for cache consistency.

```typescript
import { EXAMPLE_KEYS } from "@/query/example/keys"

// Usage in mutations
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: EXAMPLE_KEYS.lists() })
  queryClient.invalidateQueries({ queryKey: EXAMPLE_KEYS.detail(id) })
}

// Usage in queries
const query = useQuery({
  queryKey: EXAMPLE_KEYS.list(filter),
  queryFn: () => fetchExamples(filter),
})
```

**Key Structure:**

- `all`: Base key for all example queries
- `lists()`: Dynamic list keys with filters
- `details()`: Detail keys for specific items
- `detail(id)`: Single item detail key

## Optimistic Updates

### `useOptimistic()`

Immer-based optimistic update utilities for immediate UI feedback.

```typescript
import { useOptimistic } from '@/query/example/optimistic'

export function ExampleForm({ id }: { id: string }) {
  const { mergedOptimisticClosure } = useOptimistic()

  const updateName = (name: string) => {
    mergedOptimisticClosure(['example', 'detail', id])(draft => {
      draft.name = name
    return draft
    })
  }

  return (
    <div>
      <input
        defaultValue={mergedOptimisticClosure(['example', 'detail'], id)?.name}
        onChange={(e) => updateName(e.target.value)}
      />
      <button onClick={() => updateName("New Name")}>
        Update
      </button>
    </div>
  )
}
```

**Features:**

- Immediate UI updates with Immer
- Draft-based editing
- Automatic rollback on error
- Optimistic state management
- Type-safe updates

## Data Ensuring

### `useExampleEnsure()`

Guarantees data availability with TanStack's `ensureQueryData`.

```typescript
import { useExampleEnsure } from '@/query/example/ensure'

export function ExampleComponent({ id }: { id: string }) {
  const { ensureExampleDetail } = useExampleEnsure()

  // Data is guaranteed to be available
  const example = ensureExampleDetail(id)

  return (
    <div>
      <h3>{example.name}</h3>
      <p>No loading states needed - data is ensured!</p>
    </div>
  )
}
```

**Benefits:**

- Eliminates loading states for guaranteed data
- Prevents race conditions
- Improves user experience
- Reduces unnecessary re-renderers

## Configuration

### Query Client Setup

```typescript
// In query/index.tsx
const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disabled for predictable behavior
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
})
```

**Default Options:**

- **Retry**: Disabled for consistent behavior
- **Garbage Collection**: 10 minutes cache lifetime
- **Background Refetch**: On window focus and reconnect
- **Stale Time**: 5 minutes for fresh data

## Best Practices

### Query Invalidation

```typescript
// Invalidate all lists
queryClient.invalidateQueries({ queryKey: EXAMPLE_KEYS.lists() })

// Invalidate specific item
queryClient.invalidateQueries({ queryKey: EXAMPLE_KEYS.detail(id) })

// Remove specific item from cache
queryClient.removeQueries({ queryKey: EXAMPLE_KEYS.detail(id) })
```

### Error Handling

```typescript
const { data, error, isLoading } = useExampleList({
  page: 1,
  limit: 20
})

if (error) {
  return <ErrorAlert error={error} />
}

if (isLoading && !data) {
  return <LoadingSpinner />
}
```

### Optimistic Updates

```typescript
const handleUpdate = useMutation({
  mutationFn: exampleService.update,
  onMutate: async (variables) => {
    // Cancel outgoing queries
    await queryClient.cancelQueries({
      queryKey: EXAMPLE_KEYS.detail(variables.id),
    })

    // Optimistically update UI
    const previousData = queryClient.getQueryData(
      EXAMPLE_KEYS.detail(variables.id),
    )
    const newData = { ...previousData, ...variables.data }
    queryClient.setQueryData(EXAMPLE_KEYS.detail(variables.id), newData)

    // Execute mutation
    return exampleService.update(variables.id, variables.data)
  },
  onSuccess: (_data, variables) => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: EXAMPLE_KEYS.lists() })
  },
})
```

## Performance Benefits

- **Background Refetch**: Automatic data updates
- **Window Focus Handling**: Refresh data when user returns
- **Cache Management**: Intelligent garbage collection
- **Deduplication**: Prevent duplicate requests
- **Optimistic Updates**: Immediate UI feedback
- **Error Boundaries**: Graceful error handling
- **Type Safety**: Full TypeScript support with proper generics
- **Developer Experience**: Powerful DevTools integration
- **Reliability**: Automatic retry and error recovery
- **Maintainability**: Clean separation of concerns
- **Scalability**: Enterprise-ready query management

## Integration with Services

The query system integrates seamlessly with the service layer:

```typescript
// Service call in query
const query = useQuery({
  queryKey: EXAMPLE_KEYS.list(filter),
  queryFn: () => exampleService.list("/api/example", filter),
  staleTime: 2 * 60 * 1000, // 2 minutes
})

// Mutation with service integration
const createMutation = useMutation({
  mutationFn: exampleService.create,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: EXAMPLE_KEYS.lists() })
  },
})
```

## Usage Patterns

### Component Composition

```typescript
export function ExamplePage() {
  const { query, optimistic } = useExampleList({ page: 1, limit: 10 })
  const { query: detailQuery } = useExampleDetail(optimistic.items[0]?.id)

  return (
    <div>
      {query.isLoading && <div>Loading list...</div>}

      {query.data && (
        <ul>
          {query.data.map(item => (
            <li
              key={item.id}
              onClick={() => detailQuery.refetch()}
            >
              {item.name}
              {optimistic.items[item.id] && (
                <em> (Updating...)</em>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

## Benefits

- **Type Safety**: Full TypeScript support with proper generics
- **Performance**: Optimized caching and background updates
- **Developer Experience**: Powerful DevTools integration
- **Reliability**: Automatic retry and error recovery
- **Maintainability**: Clean separation of concerns
- **Scalability**: Enterprise-ready query management
- **Optimistic UI**: Immediate feedback with Immer integration
