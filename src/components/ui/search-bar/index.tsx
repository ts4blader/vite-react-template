import { createSharedContext } from "@/hooks/create-shared-context"
import { cn } from "@/lib/utils"
import { Popover } from "radix-ui"
import React, { useState } from "react"

type ValueType = Record<string, any>

type Props = {
  value: ValueType
  setValue: (value: ValueType) => void

  input: string
  setInput: (input: string) => void
  popoverProps?: React.ComponentProps<typeof Popover.Root>
}

type ContextType = Props & {
  setPartialValue: (value: ValueType) => void
  setIsFocused: (isFocused: boolean) => void
}

const [SearchBarProvider, useSearchBarContext] =
  createSharedContext<ContextType>("search-bar")

export const SearchBar = ({
  children,
  ...props
}: Props & {
  children: React.ReactNode
}) => {
  const setPartialValue = (value: ValueType) => {
    props.setValue({ ...props.value, ...value })
  }

  const [isFocused, setIsFocused] = useState(false)

  return (
    <SearchBarProvider value={{ ...props, setPartialValue, setIsFocused }}>
      <Popover.Root
        open={isFocused}
        onOpenChange={setIsFocused}
        {...props.popoverProps}
      >
        {children}
      </Popover.Root>
    </SearchBarProvider>
  )
}

export const SearchBarInput = () => {
  const { input, setInput, setIsFocused } = useSearchBarContext()

  return (
    <Popover.Anchor>
      <div className="">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Search..."
        />
      </div>
    </Popover.Anchor>
  )
}

export const SearchBarContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Popover.Content>) => {
  return (
    <Popover.Portal>
      <Popover.Content
        className={cn(
          "z-50 w-full rounded-md border bg-white p-1 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        {...props}
      >
        {children}
      </Popover.Content>
    </Popover.Portal>
  )
}

export const SearchBarItem = ({
  name,
  value,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  name: string
  value?: any
}) => {
  const {
    setPartialValue,
    input,
    value: searchValue,
    setValue,
  } = useSearchBarContext()
  const displayValue = value || input
  const toggleValue = () => {
    if (
      Object.hasOwn(searchValue, name) &&
      searchValue[name] === displayValue
    ) {
      const newSearchValue = { ...searchValue }
      delete newSearchValue[name]
      setValue(newSearchValue)
    } else {
      setPartialValue({ [name]: displayValue })
    }
  }

  return (
    <div
      onClick={toggleValue}
      className={cn(
        "relative cursor-default select-none items-center rounded-sm py-1 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="font-medium">{name}:</span>{" "}
      <span className="ml-auto text-muted-foreground">{displayValue}</span>
    </div>
  )
}
