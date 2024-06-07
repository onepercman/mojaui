import { SlotsClasses } from "@/types"
import * as Ark from "@ark-ui/react"
import { VariantProps, tv } from "tailwind-variants"
import { ButtonVariantProps } from "../button"

export const select = tv({
  base: "flex flex-col gap-1 w-fit",
  slots: {
    label: "text-sm text-secondary",
    trigger:
      "min-w-full justify-between data-[placeholder-shown]:text-secondary data-[placeholder-shown]:font-normal relative",
    clear: "text-secondary text-xs absolute top-1/2 right-3 -translate-y-1/2",
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
    invalid: {
      true: {
        label: "text-error",
        trigger: "bg-error/10 border-error border-2 !text-error",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type SelectVariantProps = VariantProps<typeof select>
export type SelectReturnType = ReturnType<typeof select>
export type SelectSlots = keyof SelectReturnType
export type SelectSlotsClasses = SlotsClasses<SelectSlots>

export interface SelectOptionProps<Value> {
  label?: React.ReactNode
  children?: SelectOptionProps<Value>[]
  offset?: number
  value: Value
}

export interface SelectProps<Value>
  extends Omit<
      Ark.SelectRootProps<SelectOptionProps<Value>>,
      "items" | "value" | "defaultValue" | "color"
    >,
    ButtonVariantProps,
    SelectSlotsClasses {
  value?: Value[]
  defaultValue?: Value[]
  label?: React.ReactNode
  readonly options?: SelectOptionProps<Value>[]
  placeholder?: string
  allowClear?: boolean
  invalid?: boolean
  invalidMessage?: React.ReactNode
  indent?: number
}
