export type MapItem<T> = T & { _index: number }
export type ESMap<K, T> = Map<K, MapItem<T>>

export const createMap = <T, L = object>(
  data: T[],
  key: keyof T | ((item: T) => string | number),
  additionalData?: (data: T) => L,
): Record<any, T & { _index: number } & L> => {
  const map: Record<any, any> = {}
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    const addition = additionalData ? additionalData(item) : {}

    if (typeof key === "function") {
      map[key(item) as any] = Object.assign({ _index: i }, item, addition)
    } else {
      map[item[key] as any] = Object.assign({ _index: i }, item, addition)
    }
  }

  return map
}

export const createESMap = <T, K, L = any>(
  data: T[],
  getKey: (data: T) => K,
  additionalData?: (data: T) => L,
) => {
  const map: Map<
    ReturnType<typeof getKey>,
    T & { _index: number } & L
  > = new Map()
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    const key = getKey(item)

    map.set(key, Object.assign({ _index: i }, item, additionalData?.(item)))
  }

  return map
}

export const createWeakMap = <T, K extends object>(
  data: T[],
  getKey: (data: T) => K,
) => {
  const map: WeakMap<
    ReturnType<typeof getKey>,
    T & { _index: number }
  > = new WeakMap()
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    const key = getKey(item)

    map.set(key, Object.assign({ _index: i }, item))
  }

  return map
}
