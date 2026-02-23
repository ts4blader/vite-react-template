export function findDifferences(
  defaultValues: Record<string, any>,
  submitValues: Record<string, any>,
  options?: {
    initial?: string
    ignores?: string[]
  },
): Record<string, any> | null {
  if (defaultValues === submitValues) {
    return null
  }

  const { initial = "root", ignores = [] } = options || {}

  const differences: Record<string, any> = {}
  let hasDifferences = false

  for (const key in submitValues) {
    const currentPath = `${initial}.${key}`

    // Skip if this path is in the ignores array
    if (ignores.includes(currentPath)) {
      continue
    }

    const defaultVal = defaultValues[key]
    const submitVal = submitValues[key]

    // Check if both values are objects (and not null or arrays)
    const isDefaultObject =
      defaultVal !== null &&
      typeof defaultVal === "object" &&
      !Array.isArray(defaultVal)
    const isSubmitObject =
      submitVal !== null &&
      typeof submitVal === "object" &&
      !Array.isArray(submitVal)

    if (isSubmitObject && isDefaultObject) {
      // Recursively compare nested objects
      const nestedDiffs = findDifferences(defaultVal, submitVal, {
        initial: currentPath,
        ignores,
      })
      if (nestedDiffs !== null) {
        differences[key] = nestedDiffs
        hasDifferences = true
      }
    } else if (!deepEqual(defaultVal, submitVal)) {
      // Values are different, include the submit value
      differences[key] = submitVal
      hasDifferences = true
    }
  }

  // Also check for new keys in submitValues that don't exist in defaultValues
  for (const key in submitValues) {
    const currentPath = `${initial}.${key}`

    if (!(key in defaultValues) && !ignores.includes(currentPath)) {
      differences[key] = submitValues[key]
      hasDifferences = true
    }
  }

  return hasDifferences ? differences : null
}

const deepEqualCache = new WeakMap()
// Helper function for deep equality check
function deepEqual(val1: any, val2: any): boolean {
  // Check cache for object comparisons
  if (typeof val1 === "object" && val1 !== null) {
    if (deepEqualCache.has(val1)) {
      const cached = deepEqualCache.get(val1)
      if (cached.has(val2)) {
        return cached.get(val2)
      }
    }
  }

  // Same reference or primitive equality
  if (val1 === val2) return true

  // Handle null/undefined
  if (val1 == null || val2 == null) return val1 === val2

  // Different types
  if (typeof val1 !== typeof val2) return false

  // Handle arrays
  if (Array.isArray(val1) && Array.isArray(val2)) {
    if (val1.length !== val2.length) return false
    return val1.every((item, index) => deepEqual(item, val2[index]))
  }

  // Handle objects
  if (typeof val1 === "object" && typeof val2 === "object") {
    const keys1 = Object.keys(val1)
    const keys2 = Object.keys(val2)

    if (keys1.length !== keys2.length) return false

    return keys1.every((key) => deepEqual(val1[key], val2[key]))
  }

  const result = val1 === val2

  // Cache result
  if (typeof val1 === "object" && val1 !== null) {
    if (!deepEqualCache.has(val1)) {
      deepEqualCache.set(val1, new WeakMap())
    }
    deepEqualCache.get(val1).set(val2, result)
  }

  // Primitive comparison
  return result
}
