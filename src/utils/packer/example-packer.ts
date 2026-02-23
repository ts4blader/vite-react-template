export type ExamplePacker = ["AUTH" | "GUEST", string]

export const examplePacker = {
  pack: (input: ExamplePacker) => input.join(":"),
  unpack: (input: string) => input.split(":") as ExamplePacker,
}
