import { Button } from "@/components"
import { useVariants } from "@/providers/variants-provider"
import { ForwardedRefComponent } from "@/types"
import * as Ark from "@ark-ui/react"
import React from "react"
import { LuX } from "react-icons/lu"
import { DialogProps } from "./dialog"

export interface Dialog extends ForwardedRefComponent {
  (
    props: DialogProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ): React.ReactElement | null
}

function _constructor(
  render: (
    props: DialogProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => React.ReactElement | null,
) {
  return React.forwardRef<HTMLDivElement, DialogProps>(
    render,
  ) as unknown as Dialog
}

export const Dialog = _constructor(function (
  {
    trigger,
    title,
    children,
    size,
    placement,
    className,
    classNames,
    ...props
  },
  ref,
) {
  const { dialog } = useVariants()
  const classes = dialog({ size, placement, className })

  return (
    <Ark.Dialog.Root {...props}>
      <Ark.Dialog.Trigger asChild>{trigger}</Ark.Dialog.Trigger>
      <Ark.Portal>
        <Ark.Dialog.Backdrop
          className={classes.backdrop({ class: classNames?.backdrop })}
        />
        <Ark.Dialog.Positioner
          className={classes.positioner({ class: classNames?.positioner })}
          style={{ zIndex: "var(--z-index-modal)" }}
        >
          <Ark.Dialog.Content
            ref={ref}
            className={classes.base({ class: classNames?.base })}
          >
            <Ark.Dialog.Title
              className={classes.title({ class: classNames?.title })}
            >
              Dialog Title
            </Ark.Dialog.Title>
            <Ark.Dialog.CloseTrigger asChild>
              <Button
                size="xs"
                shape="circle"
                leftIcon={<LuX />}
                className={classes.close({ class: classNames?.close })}
              />
            </Ark.Dialog.CloseTrigger>
            {typeof children === "function" ? (
              <Ark.Dialog.Context>{children}</Ark.Dialog.Context>
            ) : (
              children
            )}
          </Ark.Dialog.Content>
        </Ark.Dialog.Positioner>
      </Ark.Portal>
    </Ark.Dialog.Root>
  )
})

Dialog.displayName = "Dialog"

export * from "./dialog"
