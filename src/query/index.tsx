import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Create a default query client with TanStack Query
const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
})

export interface QueryProviderProps {
  children: React.ReactNode
  client?: QueryClient
}

export const QueryProvider = ({
  children,
  client = defaultQueryClient,
}: QueryProviderProps) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
