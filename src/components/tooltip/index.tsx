import { useVariants } from "@/providers/variants-provider"
import { ComposedTVProps } from "@/types"
import { tooltip } from "@/variants/tooltip"
import * as Ark from "@ark-ui/react"
import React from "react"

export interface TooltipProps
  extends Ark.TooltipRootProps,
    ComposedTVProps<typeof tooltip> {
  className?: string
  content?: React.ReactNode
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(function (
  { children, content, size, className, classNames, ...props },
  ref,
) {
  const { tooltip } = useVariants()
  const classes = tooltip({ size, className })

  return (
    <Ark.Tooltip.Root openDelay={200} closeDelay={200} {...props}>
      <Ark.Tooltip.Trigger asChild>{children}</Ark.Tooltip.Trigger>
      <Ark.Tooltip.Positioner>
        <Ark.Tooltip.Content
          ref={ref}
          className={classes.base({ class: classNames?.base })}
        >
          <Ark.Tooltip.Arrow
            style={
              {
                "--arrow-size": "6px",
                "--arrow-offset": "-3px",
              } as React.CSSProperties
            }
          >
            <Ark.Tooltip.ArrowTip
              className={classes.arrow({ class: classNames?.arrow })}
            />
          </Ark.Tooltip.Arrow>
          {content}
        </Ark.Tooltip.Content>
      </Ark.Tooltip.Positioner>
    </Ark.Tooltip.Root>
  )
})

Tooltip.displayName = "Tooltip"
