import { Spinner } from "@/components"
import { useVariants } from "@/providers/variants-provider"
import { ComposedTVProps } from "@/types"
import { cn } from "@/utils"
import { button } from "@/variants/button"
import React from "react"

export interface ButtonBaseProps {
  loading?: boolean
  loadingText?: string
  leftIcon?: React.ReactElement
  rightIcon?: React.ReactElement
  loadingVariant?: "default" | "transparent"
}

export interface ButtonProps
  extends ButtonBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ComposedTVProps<typeof button> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function (
  {
    children,
    disabled,
    loading,
    loadingText,
    loadingVariant = "default",
    leftIcon,
    rightIcon,
    className,
    variant,
    color,
    size,
    shape,
    onClick,
    ...props
  },
  ref,
) {
  const { button } = useVariants()
  const [asyncLoading, setAsyncLoading] = React.useState(false)

  async function _onClick(ev: React.MouseEvent<HTMLButtonElement>) {
    if (!onClick) return
    if (onClick.constructor.name === "AsyncFunction") {
      try {
        setAsyncLoading(true)
        onClick && (await onClick(ev))
      } catch (err) {
        throw new Error(err as any)
      } finally {
        setAsyncLoading(false)
      }
    } else {
      onClick(ev)
    }
  }

  const _loading = asyncLoading || loading
  const _disabled = disabled || _loading
  const _className = button({
    variant,
    color,
    size,
    className,
    shape,
    disabled: _disabled,
  })

  return (
    <button
      ref={ref}
      type="button"
      className={_className}
      disabled={_disabled}
      onClick={_onClick}
      data-loading={_loading}
      {...props}
    >
      {_loading && (
        <Spinner
          className={loadingVariant === "default" ? "relative" : "absolute"}
        />
      )}

      {leftIcon ? (
        _loading ? (
          <span
            className={loadingVariant === "default" ? "hidden" : "opacity-0"}
          >
            {leftIcon}
          </span>
        ) : (
          leftIcon
        )
      ) : null}

      {children || loadingText ? (
        _loading ? (
          <span
            className={cn({ "opacity-0": loadingVariant === "transparent" })}
          >
            {loadingText || children}
          </span>
        ) : (
          children
        )
      ) : null}

      {rightIcon ? (
        _loading ? (
          <span
            className={cn({ "opacity-0": loadingVariant === "transparent" })}
          >
            {rightIcon}
          </span>
        ) : (
          rightIcon
        )
      ) : null}
    </button>
  )
})

Button.displayName = "Button"

export { Button }
