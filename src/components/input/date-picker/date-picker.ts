import { SlotsClasses } from "@/types"
import * as Ark from "@ark-ui/react"
import { VariantProps, tv } from "tailwind-variants"
import { InputFieldProps, InputVariantProps } from "../input"

export const datePicker = tv({
  base: [
    "bg-component border border-line p-4 shadow rounded",
    "data-[state=open]:animate-in",
    "data-[state=open]:fade-in",
    "data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out",
  ],
  slots: {
    viewControl: "inline-flex gap-2 justify-between w-full items-center mb-4",
    header: "text-sm font-semibold text-secondary",
    cell: [
      "w-full hover:bg-primary/20",
      "data-[selected]:bg-primary",
      "data-[disabled]:text-muted",
    ],
  },
  variants: {},
  defaultVariants: {},
})

export type DatePickerVariantProps = VariantProps<typeof datePicker>
export type DatePickerReturnType = ReturnType<typeof datePicker>
export type DatePickerSlots = keyof DatePickerReturnType
export type DatePickerSlotsClasses = SlotsClasses<DatePickerSlots>

export interface DatePickerProps
  extends Ark.DatePickerRootProps,
    Omit<InputFieldProps, "prefix">,
    InputVariantProps,
    DatePickerVariantProps,
    DatePickerSlotsClasses {}
