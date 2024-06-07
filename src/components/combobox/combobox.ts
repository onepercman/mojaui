import { SlotsClasses } from "@/types"
import * as Ark from "@ark-ui/react"
import { VariantProps, tv } from "tailwind-variants"
import { InputVariantProps } from "../input/input"

export const combobox = tv({
  base: "flex flex-col gap-1 w-fit",
  slots: {
    label: "text-sm text-secondary",
    trigger:
      "min-w-full justify-between data-[placeholder-shown]:text-secondary",
    clear: "text-secondary text-xs flex-none",
    list: [
      "flex flex-col border border-line w-full rounded overflow-hidden bg-component shadow-lg p-1",
      "data-[state=open]:animate-in",
      "data-[state=open]:fade-in",
      "data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out",
    ],
    group: "flex flex-col",
    groupLabel: "w-full px-2 py-1 text-xs text-secondary",
    item: "inline-flex relative gap-2 justify-between items-start cursor-pointer hover:bg-default pl-3 py-2 pr-8 rounded",
    itemText: "grow",
    itemIndicator:
      "h-full absolute right-2 top-0 data-[state=checked]:flex items-center",
  },
  variants: {
    size: {
      xs: { item: "text-xs py-1" },
      sm: { item: "text-sm py-1" },
      md: { item: "text-base" },
      lg: { item: "text-lg" },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type ComboboxVariantProps = VariantProps<typeof combobox>
export type ComboboxReturnType = ReturnType<typeof combobox>
export type ComboboxSlots = keyof ComboboxReturnType
export type ComboboxSlotsClasses = SlotsClasses<ComboboxSlots>

export interface ComboboxOptionProps<Value> {
  label?: React.ReactNode
  children?: ComboboxOptionProps<Value>[]
  offset?: number
  value: Value
}

export interface ComboboxProps<Value>
  extends Omit<
      Ark.ComboboxRootProps<ComboboxOptionProps<Value>>,
      "items" | "color"
    >,
    InputVariantProps,
    ComboboxSlotsClasses {
  label?: React.ReactNode
  readonly options?: ComboboxOptionProps<Value>[]
  placeholder?: string
  allowClear?: boolean
  invalid?: boolean
  invalidMessage?: React.ReactNode
  indent?: number
}
