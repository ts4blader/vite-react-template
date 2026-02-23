import { createContext, useContext } from "react"

const createSharedContext = <T extends object>(name: string) => {
  const nameStr = name
  const Context = createContext<T | null>(null)

  const useRequireContext = () => {
    const context = useContext(Context)
    if (!context) {
      throw new Error(
        `use ${nameStr} context must be used within an ${nameStr} provider`,
      )
    }

    return context
  }

  const useOptionalContext = () => useContext(Context)

  return [Context.Provider, useRequireContext, useOptionalContext] as const
}

export { createSharedContext }
