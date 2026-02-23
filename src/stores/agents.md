# Stores Documentation

## Overview

This directory contains Zustand stores following the official slice pattern with TypeScript, persistence, and selector utilities.

## Store Structure Patterns

### Standard Store (Non-Persistent)

For stores that don't need persistence:

```typescript
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { createSelectors } from "../createSelectors"
import type { StateCreator } from "zustand"

// =================
// Types
// =================
type [StoreName]State = {
  // State properties only
}

type [StoreName]Actions = {
  // Action methods only
}

export type [StoreName]Store = [StoreName]State & [StoreName]Actions

// =================
// Slice
// =================
const slice: StateCreator<[StoreName]Store> = (set) => ({
  // State
  // Initial state values

  // Actions
  // Action methods
})

// =================
// Store with Selectors
// =================
const use[StoreName]Base = create<[StoreName]Store>()(
  immer(slice)
)

export const use[StoreName]Store = createSelectors(use[StoreName]Base)
```

### Persistent Store

For stores that need persistence (like user settings):

```typescript
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { createSelectors } from "../createSelectors"
import { STORAGE_KEYS } from "@/constants/keys"
import type { StateCreator } from "zustand"

// =================
// Types
// =================
type [StoreName]State = {
  // State properties only
}

type [StoreName]Actions = {
  // Action methods only
}

export type [StoreName]Store = [StoreName]State & [StoreName]Actions

// =================
// Slice
// =================
const slice: StateCreator<[StoreName]Store> = (set) => ({
  // State
  // Initial state values

  // Actions
  // Action methods
})

// =================
// Store with Selectors
// =================
const use[StoreName]Base = create<[StoreName]Store>()(
  persist(immer(slice), {
    name: STORAGE_KEYS.[STORE_KEY],
  }),
)

export const use[StoreName]Store = createSelectors(use[StoreName]Base)
```

## Available Stores

### User Settings Store (`user-settings/`)

**Location**: `src/stores/user-settings/index.ts`

**State**:

- `theme`: `"light" | "dark" | "system"` - Theme preference
- `isSidebarCollapse`: `boolean` - Sidebar collapsed state

**Actions**:

- `setter`: `(val: Partial<UserSettingsState>) => void` - Update multiple state properties

**Storage Key**: `STORAGE_KEYS.USER_SETTINGS`

**Usage Example**:

```typescript
import { useUserSettingsStore } from "@/stores/user-settings"

// With selectors (recommended)
const theme = useUserSettingsStore.use.theme()
const isCollapsed = useUserSettingsStore.use.isSidebarCollapse()
const setter = useUserSettingsStore.use.setter()

// Traditional way
const { theme, isSidebarCollapse, setter } = useUserSettingsStore()
```

## Development Guidelines

### Creating New Stores

1. **Follow the slice pattern**: Use `StateCreator` for type safety
2. **Separate concerns**: Keep state and actions in separate types
3. **Use middleware**: Always apply `immer` for immutable updates
4. **Add persistence**: Use `persist` middleware only when needed
5. **Add selectors**: Always wrap with `createSelectors` for better performance
6. **Use storage keys**: Reference `STORAGE_KEYS` for persistence keys (only for persistent stores)

### When to Use Persistence

**Use persistence for**:

- User preferences (theme, settings)
- Authentication tokens
- Application state that should survive page refresh
- Data that's expensive to fetch

**Don't use persistence for**:

- Temporary UI state (modals, dropdowns)
- Form data during editing
- Real-time data that should refresh
- Large datasets that can be fetched on demand

### Storage Keys

Add new storage keys to `src/constants/keys.ts`:

```typescript
export const STORAGE_KEYS = {
  USER_SETTINGS: "user-settings-storage/v1",
  YOUR_STORE: "your-store-storage/v1",
} as const
```

### Best Practices

- **Type Safety**: Always export the store type for external use
- **Immutability**: Use `immer` middleware for safe state updates
- **Performance**: Use selectors to prevent unnecessary re-renders
- **Persistence**: Store only serializable data in persisted stores
- **Naming**: Use descriptive names following the pattern `use[StoreName]Store`

### Import Patterns

```typescript
// For using the store
import { useUserSettingsStore } from "@/stores/user-settings"

// For types only
import type { UserSettingsStore } from "@/stores/user-settings"
```

## Dependencies

- **zustand**: State management library
- **zustand/middleware**: Persistence and immutability utilities
- **@/constants/keys**: Storage key constants
- **@/stores/createSelectors**: Selector utility function

## Migration Notes

When migrating existing stores to this pattern:

1. Extract state properties into `[StoreName]State` type
2. Extract methods into `[StoreName]Actions` type
3. Convert inline store creation to slice pattern
4. Add `immer` and `persist` middleware
5. Wrap with `createSelectors` for performance
6. Update all consuming code to use selectors where beneficial
