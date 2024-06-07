import { SlotsClasses } from "@/types"
import * as Ark from "@ark-ui/react"
import { VariantProps, tv } from "tailwind-variants"

export const tooltip = tv({
  base: [
    "px-3 py-2 bg-component shadow-lg rounded border border-line z-[var(--z-index)]",
    "data-[state=open]:animate-in",
    "data-[state=open]:fade-in",
    "data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out",
  ],
  slots: {
    arrow: "!bg-component border-line border-l border-t",
  },
  variants: {
    size: {
      sm: "text-xs p-1",
      md: "text-sm px-2 py-1",
      lg: "text-base px-3 py-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type TooltipVariantProps = VariantProps<typeof tooltip>
export type TooltipReturnType = ReturnType<typeof tooltip>
export type TooltipSlots = keyof TooltipReturnType
export type TooltipSlotsClasses = SlotsClasses<TooltipSlots>

export interface TooltipProps
  extends Ark.TooltipRootProps,
    TooltipVariantProps,
    TooltipSlotsClasses {
  className?: string
  content?: React.ReactNode
}
