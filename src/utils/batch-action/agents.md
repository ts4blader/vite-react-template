# Batch Action Utilities

## Overview

This directory provides utilities for managing batch operations with automatic merging, conflict resolution, and error handling. It's designed to handle collections of CRUD operations efficiently by consolidating related actions before execution.

## Core Concepts

### Batch Actions
A batch action represents a single CRUD operation with:
- **Type**: "create", "update", or "delete"
- **Data**: The payload for the operation
- **Batch ID**: Unique identifier for grouping related actions

### Merging Strategy
The system automatically merges actions with the same batch ID:
- `create` + `update` → `create` (merged data)
- `update` + `update` → `update` (merged data)
- `create/update` + `delete` → removed (deleted)

## API Reference

### `generateBatchID()`
Generates a unique batch ID using a prefixed generator.

```typescript
generateBatchID(): string
```

**Returns:** Unique string identifier (e.g., "batch-item-123456789")

**Example:**
```typescript
const batchId = generateBatchID() // "batch-item-1698765432"
```

### `createBatchAction<T>(config)`
Creates a new batch action with the specified type and data.

```typescript
createBatchAction<T>({
  type: BatchActionType,
  data: T,
  batchID?: string
}): BatchAction<T>
```

**Parameters:**
- `type`: Action type ("create" | "update" | "delete")
- `data`: Payload data for the action
- `batchID`: Optional custom batch ID (auto-generated if not provided)

**Example:**
```typescript
const createAction = createBatchAction({
  type: "create",
  data: { name: "John", email: "john@example.com" }
})

const updateAction = createBatchAction({
  type: "update",
  data: { name: "Jane" },
  batchID: "user-123"
})
```

### `mergeBatch<T>(actions)`
Merges an array of batch actions, resolving conflicts and consolidating operations.

```typescript
mergeBatch<T>(actions: BatchAction<T>[]): BatchAction<T>[]
```

**Merging Rules:**
- Actions with different batch IDs are kept separate
- Actions with the same batch ID are merged according to the strategy
- Data from update actions is merged using object spread

**Example:**
```typescript
const actions = [
  createBatchAction({ type: "create", data: { name: "John" }, batchID: "user-1" }),
  createBatchAction({ type: "update", data: { email: "john@example.com" }, batchID: "user-1" }),
  createBatchAction({ type: "update", data: { name: "Jane" }, batchID: "user-1" }),
  createBatchAction({ type: "delete", data: {}, batchID: "user-1" })
]

const merged = mergeBatch(actions) // [] (deleted)
```

### `processBatch<T>(actions, map)`
Processes merged batch actions using provided handlers and returns failed operations.

```typescript
processBatch<T>(
  actions: BatchAction<T>[],
  map: Record<BatchActionType, Promise<unknown>>
): Promise<{ failed: (BatchAction<T> & { _reason: any })[] }>
```

**Parameters:**
- `actions`: Array of batch actions to process
- `map`: Object mapping action types to promise-returning handlers

**Returns:** Promise resolving to object with failed actions and their reasons

**Example:**
```typescript
const handlers = {
  create: (data) => api.createUser(data),
  update: (data) => api.updateUser(data),
  delete: (data) => api.deleteUser(data.id)
}

const result = await processBatch(actions, handlers)

if (result.failed.length > 0) {
  result.failed.forEach(failure => {
    console.error(`Failed ${failure.type}:`, failure._reason)
  })
}
```

## Type Definitions

### `BatchActionType`
Union type for supported action types:
```typescript
type BatchActionType = "create" | "update" | "delete"
```

### `BatchAction<T>`
Interface for batch action objects:
```typescript
type BatchAction<T> = {
  type: BatchActionType
  data: T
  _batchID: string
}
```

## Usage Patterns

### Basic CRUD Batching
```typescript
import { createBatchAction, processBatch } from '@/utils/batch-action'

// Create actions
const actions = [
  createBatchAction({ type: "create", data: userData }),
  createBatchAction({ type: "update", data: updateData, batchID: "user-123" }),
  createBatchAction({ type: "delete", data: { id: "user-456" } })
]

// Process with API handlers
const result = await processBatch(actions, apiHandlers)
```

### Form Submission Batching
```typescript
// Track form changes and batch them
const formActions = []

// User edits multiple fields
formActions.push(createBatchAction({
  type: "update",
  data: { name: "New Name" },
  batchID: "profile-123"
}))

formActions.push(createBatchAction({
  type: "update", 
  data: { email: "new@email.com" },
  batchID: "profile-123"
}))

// These will be merged into a single update action
const merged = mergeBatch(formActions)
```

### Optimistic Updates
```typescript
// Create optimistic actions
const optimisticActions = [
  createBatchAction({ type: "create", data: newItem }),
  createBatchAction({ type: "update", data: { status: "active" }, batchID: newItem.id })
]

// Process and handle failures
const result = await processBatch(optimisticActions, handlers)
if (result.failed.length > 0) {
  // Revert optimistic changes
  revertOptimisticUpdates(result.failed)
}
```

## Error Handling

The batch system provides comprehensive error handling:
- **Graceful failures**: Failed actions don't stop other actions
- **Detailed error reporting**: Each failed action includes the rejection reason
- **Type-safe errors**: Failed actions maintain their original type structure

### Error Recovery
```typescript
const { failed } = await processBatch(actions, handlers)

// Retry failed actions
const retryActions = failed.map(action => 
  createBatchAction({
    type: action.type,
    data: action.data,
    batchID: action._batchID
  })
)

// Retry with exponential backoff
const retryResult = await processBatch(retryActions, retryHandlers)
```

## Performance Benefits

- **Reduced API calls**: Merged actions minimize server requests
- **Conflict resolution**: Automatic handling of competing operations
- **Optimistic updates**: Support for immediate UI updates with rollback
- **Memory efficient**: WeakMap caching in dependency utilities

## Integration Notes

- Requires `prefixedIdGenerator` from `../generators`
- Designed to work with Promise-based API handlers
- Compatible with TypeScript strict mode
- No external dependencies

## Best Practices

1. **Use consistent batch IDs** for related operations
2. **Handle failures gracefully** with retry logic
3. **Validate data** before creating batch actions
4. **Use appropriate merging** strategies for your use case
5. **Consider transaction boundaries** when processing batches
