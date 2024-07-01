import { useVariants } from "@/providers/variants-provider"
import { ComposedTVProps } from "@/types"
import { avatar } from "@/variants/avatar"
import * as Ark from "@ark-ui/react"
import React from "react"

export interface AvatarProps
  extends Ark.AvatarImageProps,
    ComposedTVProps<typeof avatar> {
  fallback?: React.ReactNode
}

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
