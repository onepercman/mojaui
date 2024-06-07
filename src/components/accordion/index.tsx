import { useVariants } from "@/providers/variants-provider"
import { ForwardedRefComponent } from "@/types"
import * as Ark from "@ark-ui/react"
import React from "react"
import { LuChevronDown } from "react-icons/lu"
import { AccordionProps } from "./accordion"

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
    <Ark.Accordion.Root ref={ref} className={classes.base()} {...props}>
      {items?.map(({ trigger, content, ...item }) => (
        <Ark.Accordion.Item {...item}>
          <Ark.Accordion.ItemTrigger
            className={classes.trigger({ className: trigger?.className })}
            {...trigger}
          >
            {trigger?.children}
            <Ark.Accordion.ItemIndicator asChild>
              <LuChevronDown className={classes.indicator()} />
            </Ark.Accordion.ItemIndicator>
          </Ark.Accordion.ItemTrigger>
          <Ark.Accordion.ItemContent
            className={classes.content({ className: content?.className })}
            {...content}
          />
        </Ark.Accordion.Item>
      ))}
    </Ark.Accordion.Root>
  )
})

Accordion.displayName = "Accordion"

export * from "./accordion"
