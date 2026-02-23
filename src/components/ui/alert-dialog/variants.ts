import { cva } from "class-variance-authority"

export const alertDialogVariants = cva(
  "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 bg-background ring-foreground/10 gap-4 rounded-xl p-4 ring-1 duration-100 data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 outline-none",
  {
    variants: {
      size: {
        default: "max-w-xs",
        sm: "max-w-xs",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)
