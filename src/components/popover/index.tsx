import { useVariants } from "@/providers/variants-provider"
import * as Ark from "@ark-ui/react"
import React from "react"
import { PopoverProps } from "./popover"

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(function (
  { children, content, size, className, classNames, ...props },
  ref,
) {
  const { popover } = useVariants()
  const classes = popover({ size, className })

  return (
    <Ark.Popover.Root {...props}>
      <Ark.Popover.Trigger asChild>{children}</Ark.Popover.Trigger>
      <Ark.Popover.Positioner>
        <Ark.Popover.Content
          ref={ref}
          className={classes.base({ class: classNames?.base })}
        >
          <Ark.Popover.Arrow
            style={
              {
                "--arrow-size": "6px",
                "--arrow-offset": "-3px",
              } as React.CSSProperties
            }
          >
            <Ark.Popover.ArrowTip
              className={classes.arrow({ class: classNames?.arrow })}
            />
          </Ark.Popover.Arrow>
          {content}
        </Ark.Popover.Content>
      </Ark.Popover.Positioner>
    </Ark.Popover.Root>
  )
})

export * from "./popover"
