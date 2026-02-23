export async function safeAsync<T, E = Error>(promise: Promise<T>) {
  return promise
    .then((res) => [res as T, null] as const)
    .catch((e) => [null, e as E] as const)
}

export function safeTryCatch<T, E = Error>(
  callback: () => T,
): [T, null] | [null, E] {
  try {
    const res = callback()
    return [res as T, null]
  } catch (e) {
    console.error(e)
    return [null, e as E]
  }
}
