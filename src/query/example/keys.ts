export const EXAMPLE_KEYS = {
  all: ["example"],
  lists: () => [...EXAMPLE_KEYS.all, "list"],
  list: (filter: unknown) => [...EXAMPLE_KEYS.lists(), filter],

  details: () => [...EXAMPLE_KEYS.all, "detail"],
  detail: (id: string) => [...EXAMPLE_KEYS.details(), id],
} as const
