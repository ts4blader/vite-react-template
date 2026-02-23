import * as React from "react"
import { cn } from "@/lib/utils"

export function ExampleWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-8">
        {children}
      </div>
    </div>
  )
}

export function Example({ 
  title, 
  className, 
  children 
}: { 
  title: string
  className?: string
  children: React.ReactNode 
}) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="rounded-lg border p-6">
        {children}
      </div>
    </div>
  )
}
