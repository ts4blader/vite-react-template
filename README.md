# React + TypeScript + Vite + shadcn/ui

This is a template for a new Vite project with React, TypeScript, and shadcn/ui.

## Features

- ⚡️ **Vite** - Fast and optimized build tool
- ⚛️️ **React 19** - Modern React with hooks
- 📘 **TypeScript** - Type safety and autocompletion
- 🎨 **shadcn/ui** - Beautiful and accessible UI components
- 🎯 **Tailwind CSS** - Utility-first CSS framework
- 📁 **ESLint + Prettier** - Code formatting and linting
- 🧪 **React Query** - TanStack Query for data fetching
- 📦 **ofetch** - Modern fetch library
- 🗂️ **Zustand** - Lightweight state management

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── component-example.tsx
├── hooks/              # Custom React hooks
│   ├── use-websocket.ts
│   └── query/
│       ├── index.tsx         # TanStack Query provider
│       └── example/           # Example query system
│           ├── index.ts
│           ├── keys.ts
│           ├── method.ts
│           ├── ensure.ts
│           ├── optimistic.ts
│           └── agents.md
├── lib/                 # Utility libraries
│   ├── ofetch/index.ts
│   └── generators/
├── services/             # API services
│   ├── example/
│   │   ├── index.ts
│   │   └── types.ts
│   └── types.ts
├── utils/               # Utility functions
│   ├── formatter/
│   │   ├── date.ts
│   │   └── number.ts
│   ├── packer/
│   │   └── example-packer.ts
│   ├── find-diff.ts
│   ├── download-file.ts
│   ├── processors/
│   │   └── array.ts
│   ├── safe-async.ts
│   └── sleep.ts
└── constants/
    └── env.ts
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## Getting Started

1. **Get template with degit**

   ```bash
   npx degit ts4blader/vite-react-template my-app
   cd my-app
   ```

2. **Get template with degit and specific branch**

   ```bash
   npx degit vite-react-template#main my-app
   cd my-app
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start development**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Development Workflow

### Data Fetching with TanStack Query

The template includes a comprehensive query management system:

```typescript
import { useQuery } from '@/query'

export function UserList() {
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
  })

  return (
    <div>
      {isLoading && <div>Loading users...</div>}
      <ul>
        {users?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

### Form Handling with React Hook Form

```typescript
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export function UserForm() {
  const form = useForm({
    schema,
    defaultValues: {
      name: '',
      email: '',
    },
  })

  return (
    <form onSubmit={form.handleSubmit}>
      <input {...form.register('name')} />
      <input {...form.register('email')} />
      <button type="submit">Submit</button>
    </form>
  )
}
```

### Component Development

```typescript
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function UserProfile() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Edit Profile</Button>
      </CardContent>
    </Card>
  )
}
```

## Configuration

### Environment Variables

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:3001/api
```

### Tailwind CSS Configuration

The `tailwind.config.js` is pre-configured with:

- shadcn/ui components
- Custom theme colors
- Responsive breakpoints
- Animation utilities

## Code Quality

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for React and TypeScript rules
- **Prettier**: Code formatting with consistent style
- **Husky**: Git hooks for pre-commit quality

## Deployment

### Build Setup

```bash
npm run build
```

The build output is optimized and ready for deployment to any static hosting service.

## Contributing

1. Follow the existing code patterns and conventions
2. Use TypeScript for all new code
3. Test your changes with the included test suite
4. Follow the contribution guidelines in the project documentation

## License

MIT License - feel free to use this template for your projects!
