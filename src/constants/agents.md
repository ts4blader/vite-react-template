# Constants Documentation

## Overview

This directory contains application constants including media assets, routing configuration, and other static values used throughout the application.

## Directory Structure

```
constants/
├── media.ts          # Media assets and image constants
├── routes.ts          # Application routing configuration
├── keys.ts            # Storage and cache keys
├── env.ts             # Environment variables and build-time constants
└── agents.md           # This documentation file
```

## Available Constants

### Media Constants (`media.ts`)

- **Purpose**: Centralized media asset management
- **Exports**:

  ```typescript
  export const ICONS = {
    LOGO: "/logo.svg",
  } as const

  export type IconKey = keyof typeof ICONS

  export const IMAGES = {
    LOGO: "/logo.svg",
  } as const

  export type ImageKey = keyof typeof IMAGES
  ```

### Routes Constants (`routes.ts`)

- **Purpose**: Application routing configuration and path generation
- **Exports**:

  ```typescript
  export const ROUTES = {
    HOME: {
      path: "/",
    },
    EXAMPLE_DETAIL: {
      path: "/example/:id",
      generatePath: (id: string) => `/example/${id}`,
    },
  } as const

  export type RouteKey = keyof typeof ROUTES
  ```

### Storage Keys (`keys.ts`)

- **Purpose**: Centralized storage keys for localStorage, sessionStorage, and caching
- **Exports**:

  ```typescript
  export const STORAGE_KEYS = {
    USER_SETTINGS: "user-settings-storage",
  } as const

  export type StorageKey = keyof typeof STORAGE_KEYS
  ```

### Environment Constants (`env.ts`)

- **Purpose**: Build-time environment variables and mode detection
- **Exports**:
  ```typescript
  export const ENV = {
    MODE: import.meta.env.MODE as "development" | "production",
    IS_DEV: import.meta.env.DEV,
    IS_PROD: import.meta.env.PROD,
    IS_SSR: import.meta.env.SSR,
  } as const
  ```

## Usage Patterns

### Media Constants Usage

```typescript
import { ICONS, type IconKey } from "@/constants/media"

// Using icons
const logoIcon = ICONS.LOGO

// Type-safe icon access
function getIconPath(key: IconKey): string {
  return ICONS[key]
}
```

### Routes Constants Usage

```typescript
import { ROUTES, type RouteKey } from "@/constants/routes"

// Static routes
const homePath = ROUTES.HOME.path

// Dynamic route generation
const examplePath = ROUTES.EXAMPLE_DETAIL.generatePath("123")

// Type-safe route access
function getRoutePath(key: RouteKey): string {
  return ROUTES[key].path
}
```

### Storage Keys Usage

```typescript
import { STORAGE_KEYS, type StorageKey } from "@/constants/keys"

// Using storage keys
const userSettingsKey = STORAGE_KEYS.USER_SETTINGS

// Type-safe key access
function getStorageKey(key: StorageKey): string {
  return STORAGE_KEYS[key]
}

// In Zustand persist middleware
persist(store, {
  name: STORAGE_KEYS.USER_SETTINGS,
})
```

### Environment Constants Usage

```typescript
import { ENV } from "@/constants/env"

// Environment detection
if (ENV.IS_DEV) {
  console.log("Development mode")
}

// Mode-specific logic
switch (ENV.MODE) {
  case "development":
    // Dev-only features
    break
  case "production":
    // Production optimizations
    break
}
```

## Benefits

### Type Safety

- **Compile-time Checking**: TypeScript ensures only valid keys are accessed
- **Autocompletion**: IDE support for constant values
- **Refactoring Safety**: Easy to update paths across the application

### Centralized Management

- **Single Source**: All constants in one location
- **Easy Updates**: Change paths in one place
- **Consistency**: Standardized naming and structure
- **Import Organization**: Clear separation of concerns

## Best Practices

### Creating New Constants

1. **Use Descriptive Names**: Clear, meaningful constant names
2. **Group Related Constants**: Keep similar constants together
3. **Export Types**: Always export corresponding TypeScript types
4. **Document Purpose**: Add comments explaining usage
5. **Consider Extensibility**: Design for future additions

### File Organization

- **Media Assets**: Images, icons, and static resources
- **Routes**: Application navigation and routing
- **Storage Keys**: localStorage, sessionStorage, and cache identifiers
- **Environment**: Build-time constants and mode detection
- **Configuration**: App settings and feature flags
- **API Endpoints**: Server communication URLs

## Integration Examples

### With Components

```typescript
// Using media in components
import { ICONS } from "@/constants/media"

function Logo() {
  return <img src={ICONS.LOGO} alt="Logo" />
}
```

### With Storage

```typescript
// Using storage keys for persistence
import { STORAGE_KEYS } from "@/constants/keys"

// Zustand persist middleware
persist(store, {
  name: STORAGE_KEYS.USER_SETTINGS,
})

// Direct localStorage usage
localStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(data))
```

### With Environment Detection

```typescript
// Using environment constants
import { ENV } from "@/constants/env"

function FeatureFlag() {
  if (ENV.IS_DEV) {
    return <DevOnlyFeature />
  }
  return <ProductionFeature />
}
```

## Dependencies

- **TypeScript**: For type safety and compile-time checking
- **Vite**: For environment variable exposure via import.meta.env
- **Path Mapping**: For dynamic route generation
- **Asset Management**: For media and static resources
- **Storage APIs**: For localStorage and sessionStorage integration
