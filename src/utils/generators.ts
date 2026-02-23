export function* prefixedIdGenerator(prefix = "ID", start = 0) {
  let id = start
  while (true) {
    if (id >= Number.MAX_SAFE_INTEGER) {
      id = start
    }
    yield `${prefix}-${String(id++).padStart(16, "0")}`
  }
}

// usage:
// const idGen = prefixedIdGenerator("user")
// console.log(idGen.next().value) // user-0000000000000000
// console.log(idGen.next().value) // user-0000000000000001
