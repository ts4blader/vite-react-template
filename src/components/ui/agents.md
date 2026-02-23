# UI Components Documentation

## Overview

This directory contains the base UI components built with shadcn/ui patterns, Radix UI primitives, and Tailwind CSS.

## Component Architecture

### Directory Structure
Each component follows a consistent structure:
```
component-name/
├── index.tsx          # Main component implementation
└── variants.ts         # CVA variants for styling
```

### Key Principles
- **Class Variance Authority**: Uses `cva` for variant management
- **Radix UI Primitives**: Built on accessible primitives
- **Slot Composition**: Uses Radix Slot for flexible composition
- **Data Attributes**: Consistent `data-slot`, `data-variant`, `data-size` attributes
- **TypeScript**: Full type safety with proper prop interfaces

## Available Components

### Button
- **Location**: `button/index.tsx` and `button/variants.ts`
- **Variants**: default, outline, secondary, ghost, destructive, link
- **Sizes**: xs, sm, default, lg, icon, icon-xs, icon-sm, icon-lg
- **Features**: Slot composition, responsive design, accessibility

### Alert Dialog
- **Features**: Modal dialogs with overlay, content, header, footer
- **Sub-components**: AlertDialogMedia, AlertDialogTitle, AlertDialogDescription
- **Styling**: Consistent data attributes and responsive breakpoints

### Other Components
- **Badge**: Status indicators and labels
- **Card**: Container with header, content, footer, action sections
- **Combobox**: Autocomplete input with dropdown
- **Dropdown Menu**: Context menus with nested support
- **Field**: Form field wrapper with label
- **Input**: Text input variants
- **Select**: Dropdown select component
- **Textarea**: Multi-line text input

## Development Guidelines

### Creating New Components
1. Create component directory: `src/components/ui/component-name/`
2. Implement `variants.ts` with CVA for styling variants
3. Create `index.tsx` with main component logic
4. Use Radix UI primitives for accessibility
5. Apply consistent data attributes and Tailwind classes

### Styling Patterns
- Use `cn()` utility for class merging
- Follow existing variant patterns
- Maintain responsive breakpoints
- Ensure accessibility with proper ARIA attributes

### TypeScript Usage
- Define proper prop interfaces
- Use `React.ComponentProps` for HTML element extension
- Implement variant props with `VariantProps<typeof variants>`

## Dependencies
- `class-variance-authority`: For variant management
- `@radix-ui/*`: Accessible UI primitives
- `tailwindcss`: Utility-first styling
- `@/lib/utils`: Utility functions
