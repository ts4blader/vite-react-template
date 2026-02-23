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
