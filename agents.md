# Agents Documentation

## Overview

This workspace contains a React application built with Vite, TypeScript, and modern UI components.

## Tech Stack

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Components**: Custom UI library with shadcn/ui components
- **State Management**: Zustand
- **Data Fetching**: React Query (@tanstack/react-query)
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: ofetch
- **Styling**: Tailwind CSS

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, forms, etc.)
│   ├── component-example.tsx
│   └── example.tsx
├── lib/                # Utility functions and configurations
└── App.tsx             # Main application component
```

## Available Components

### UI Components

- Alert Dialog
- Badge
- Button
- Card
- Combobox
- Dropdown Menu
- Field
- Input
- Select
- Textarea

### Example Components

- ComponentExample: Main showcase component with card and form examples
- CardExample: Card component with alert dialog
- FormExample: Complex form with dropdown menu and various inputs

## Development Guidelines

### State Management

- Use Zustand for global state management
- Create separate stores for different domains
- Follow the pattern: `create<T>()`

### Data Fetching

- Use React Query for server state
- Implement proper error handling
- Use ofetch for HTTP requests

### Forms

- Use React Hook Form for form state
- Validate with Zod schemas
- Implement proper TypeScript types

### Custom Hooks

- Use react-use library for utility hooks
- Create custom hooks for reusable logic
- Follow React best practices for hook composition

### UI Components

- Built with shadcn/ui components
- Follow shadcn/ui design patterns
- Use Radix UI primitives as base
- Maintain consistent styling with Tailwind CSS

### Styling

- Use Tailwind CSS classes
- Follow the existing design system
- Maintain consistency with shadcn/ui components

## Getting Started

1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Build for production: `npm run build`

## Key Features

- Modern React patterns with hooks
- TypeScript for type safety
- Responsive design with Tailwind
- Component-based architecture
- Form validation and state management
- Optimized data fetching
