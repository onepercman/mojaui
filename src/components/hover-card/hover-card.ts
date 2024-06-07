import { SlotsClasses } from "@/types"
import * as Ark from "@ark-ui/react"
import { VariantProps, tv } from "tailwind-variants"

export const hoverCard = tv({
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

export type HoverCardVariantProps = VariantProps<typeof hoverCard>
export type HoverCardReturnType = ReturnType<typeof hoverCard>
export type HoverCardSlots = keyof HoverCardReturnType
export type HoverCardSlotsClasses = SlotsClasses<HoverCardSlots>

export interface HoverCardProps
  extends Ark.HoverCardRootProps,
    HoverCardVariantProps,
    HoverCardSlotsClasses {
  className?: string
  content?: React.ReactNode
}
