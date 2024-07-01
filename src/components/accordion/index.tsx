import { useVariants } from "@/providers/variants-provider"
import { ComposedTVProps, ForwardedRefComponent } from "@/types"
import { accordion } from "@/variants/accordion"
import { Accordion as ArkAccordion } from "@ark-ui/react"
import React from "react"
import { LuChevronDown } from "react-icons/lu"

export interface AccordionItemProps
  extends Omit<ArkAccordion.ItemProps, "content"> {
  trigger?: ArkAccordion.ItemTriggerProps
  content?: ArkAccordion.ItemContentProps
}

export interface AccordionProps
  extends ArkAccordion.RootProps,
    ComposedTVProps<typeof accordion> {
  items: AccordionItemProps[]
}

export interface Accordion extends ForwardedRefComponent {
  (
    props: AccordionProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ): React.ReactElement | null
}

function _constructor(
  render: (
    props: AccordionProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => React.ReactElement | null,
) {
  return React.forwardRef<HTMLDivElement, AccordionProps>(
    render,
  ) as unknown as Accordion
}

export const Accordion = _constructor(function (
  { items, className, ...props },
  ref,
) {
  const { accordion } = useVariants()
  const classes = accordion({ className })

  return (
    <ArkAccordion.Root ref={ref} className={classes.base()} {...props}>
      {items?.map(({ trigger, content, ...item }) => (
        <ArkAccordion.Item {...item}>
          <ArkAccordion.ItemTrigger
            className={classes.trigger({ className: trigger?.className })}
            {...trigger}
          >
            {trigger?.children}
            <ArkAccordion.ItemIndicator asChild>
              <LuChevronDown className={classes.indicator()} />
            </ArkAccordion.ItemIndicator>
          </ArkAccordion.ItemTrigger>
          <ArkAccordion.ItemContent
            className={classes.content({ className: content?.className })}
            {...content}
          />
        </ArkAccordion.Item>
      ))}
    </ArkAccordion.Root>
  )
})

Accordion.displayName = "Accordion"
