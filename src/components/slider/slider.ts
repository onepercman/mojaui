import { SlotsClasses } from "@/types"
import * as Ark from "@ark-ui/react"
import { VariantProps, tv } from "tailwind-variants"

export const slider = tv({
  base: "flex flex-col gap-1",
  slots: {
    label: "text-xs text-secondary inline-flex justify-between gap-2",
    valueText: "",
    control: "inline-flex items-center gap-2 cursor-pointer",
    track: "bg-default relative rounded overflow-hidden grow",
    range: "absolute h-full bg-primary",
    thumb: "bg-foreground rounded-full -top-1/2",
    marker: "",
  },
  variants: {
    size: {
      sm: {
        valueText: "text-sm",
        track: "h-1",
        thumb: "h-2 w-2",
      },
      md: {
        valueText: "text-base",
        track: "h-2",
        thumb: "h-4 w-4",
      },
      lg: {
        valueText: "text-base",
        track: "h-3",
        thumb: "h-6 w-6",
      },
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
})

export type SliderVariantProps = VariantProps<typeof slider>
export type SliderReturnType = ReturnType<typeof slider>
export type SliderSlots = keyof SliderReturnType
export type SliderSlotsClasses = SlotsClasses<SliderSlots>

export interface SliderProps
  extends Ark.SliderRootProps,
    SliderVariantProps,
    SliderSlotsClasses {
  label?: React.ReactNode
  markers?: Ark.SliderMarkerProps[]
}
