import { ForwardedRefComponent, SlotsClasses } from "@/types"
import * as Ark from "@ark-ui/react"
import { VariantProps, tv } from "tailwind-variants"

export const accordion = tv({
  base: "flex flex-col gap-2 border border-line p-2 rounded duration-500",
  slots: {
    item: "flex flex-col duration-500",
    trigger:
      "bg-component w-full p-2 rounded inline-flex justify-between gap-2 items-center",
    indicator: ["transition-all", "data-[state=open]:rotate-180"],
    content: [
      "overflow-hidden",
      "data-[state=open]:animate-heightIn",
      "data-[state=closed]:animate-heightOut",
    ],
  },
})

export type AccordionVariantProps = VariantProps<typeof accordion>
export type AccordionReturnType = ReturnType<typeof accordion>
export type AccordionSlots = keyof AccordionReturnType
export type AccordionSlotsClasses = SlotsClasses<AccordionSlots>

export interface AccordionItemProps
  extends Omit<Ark.Accordion.ItemProps, "content"> {
  trigger?: Ark.Accordion.ItemTriggerProps
  content?: Ark.Accordion.ItemContentProps
}

export interface AccordionProps extends Ark.AccordionRootProps {
  items: AccordionItemProps[]
}

export interface Accordion extends ForwardedRefComponent {
  (
    props: AccordionProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ): React.ReactElement | null
}
