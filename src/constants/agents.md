# Constants Documentation

## Overview

This directory contains application constants including media assets, routing configuration, and other static values used throughout the application.

## Directory Structure

```
constants/
├── media.ts          # Media assets and image constants
├── routes.ts          # Application routing configuration
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

### With Navigation
```typescript
// Using routes for navigation
import { ROUTES } from "@/constants/routes"

function Navigation() {
  return (
    <nav>
      <a href={ROUTES.HOME.path}>Home</a>
      <a href={ROUTES.EXAMPLE_DETAIL.generatePath("1")}>Example</a>
    </nav>
  )
}
```

## Dependencies

- **TypeScript**: For type safety and compile-time checking
- **Path Mapping**: For dynamic route generation
- **Asset Management**: For media and static resources
