import { useVariants } from "@/providers/variants-provider"
import * as Ark from "@ark-ui/react"
import React from "react"
import { AvatarProps } from "./avatar"

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(function (
  { size, fallback, className, classNames, ...props },
  ref,
) {
  const { avatar } = useVariants()
  const classes = avatar({ size })

  return (
    <Ark.Avatar.Root
      className={classes.base({ className, class: classNames?.base })}
    >
      <Ark.Avatar.Fallback
        className={classes.fallback({ className: classNames?.fallback })}
      >
        {fallback}
      </Ark.Avatar.Fallback>
      <Ark.Avatar.Image
        ref={ref}
        className={classes.image({ className: classNames?.image })}
        {...props}
      />
    </Ark.Avatar.Root>
  )
})

Avatar.displayName = "Avatar"

export * from "./avatar"
