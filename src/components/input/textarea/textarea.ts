import { SlotsClasses } from "@/types"
import { TextareaAutosizeProps } from "react-textarea-autosize"
import { VariantProps, tv } from "tailwind-variants"

export const textarea = tv({
  base: "flex flex-col gap-1 group",
  slots: {
    label: "text-xs space-y-2 text-secondary",
    group: [
      "border-2 rounded px-2 transition-all text-ellipsis inline-flex items-center overflow-hidden cursor-text gap-2 py-2",
      "focus-within:border-primary",
    ],
    textarea: [
      "grow bg-transparent border-transparent p-0 self-stretch text-ellipsis h-fit my-auto",
      "focus:outline-none focus:ring-transparent",
    ],
    addonBefore: "rounded-r-none",
    addonAfter: "rounded-l-none",
  },
  variants: {
    size: {
      xs: { group: "min-h-[1.5rem] min-w-[1.5rem] px-2 text-xs" },
      sm: { group: "min-h-[2rem] min-w-[2rem] px-2 text-sm" },
      md: { group: "min-h-[2.5rem] min-w-[2.5rem] px-2" },
      lg: { group: "min-h-[3rem] min-w-[3rem] px-4" },
    },
    variant: {
      filled: { group: "bg-default border-transparent" },
      outlined: { group: "border-2 border-line" },
    },
    invalid: {
      true: {
        group:
          "border-2 border-error text-error bg-error/10 focus-within:border-error-600",
        label: "text-error",
      },
    },
    autoSize: {
      true: { textarea: "resize-none" },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "filled",
  },
})

export type TextareaVariantProps = VariantProps<typeof textarea>
export type TextareaReturnType = ReturnType<typeof textarea>
export type TextareaSlots = keyof TextareaReturnType
export type TextareaSlotsClasses = SlotsClasses<TextareaSlots>

export interface TextareaProps<AutoSize extends boolean = true>
  extends Omit<
      React.HTMLAttributes<HTMLTextAreaElement>,
      "prefix" | "suffix" | "size"
    >,
    TextareaVariantProps,
    TextareaSlotsClasses {
  autoSize?: AutoSize
  label?: React.ReactNode
  required?: boolean
  prefix?: React.ReactNode | React.ReactElement
  suffix?: React.ReactNode | React.ReactElement
  addonBefore?: React.ReactNode | React.ReactElement
  addonAfter?: React.ReactNode | React.ReactElement
  invalid?: boolean
  invalidMessage?: React.ReactNode
  clearable?: boolean
  transform?(value: string): string
  autoSizeOptions?: AutoSize extends true ? TextareaAutosizeProps : undefined
}
