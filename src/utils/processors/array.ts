export const arrSlice = <T>(arr: T[], sliceSize: number) => {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += sliceSize) {
    result.push(arr.slice(i, i + sliceSize))
  }
  return result
}

export const arrSwap = <T>(arr: T[], index1: number, index2: number) => {
  const result = [...arr]
  const temp = result[index1]
  result[index1] = result[index2]
  result[index2] = temp
  return result
}

export const arrReorder = <T>(arr: T[], fromIndex: number, toIndex: number) => {
  const result = [...arr]
  const [removed] = result.splice(fromIndex, 1)
  result.splice(toIndex, 0, removed)
  return result
}

export const arrRemove = <T>(arr: T[], index: number) => {
  const result = [...arr]
  result.splice(index, 1)
  return result
}

export const arrRemoveMultiple = <T>(arr: T[], indices: number[]) => {
  const result = [...arr]
  indices.forEach((index) => {
    result.splice(index, 1)
  })
  return result
}
