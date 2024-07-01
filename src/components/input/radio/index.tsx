import { ComposedTVProps } from "@/types"
import { radio } from "@/variants/radio"
import React from "react"

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    ComposedTVProps<typeof radio> {}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function (
  { className, size, children, ...props },
  ref,
) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2">
      <input
        ref={ref}
        type="radio"
        className={radio({ size, className })}
        {...props}
      />
      {children}
    </label>
  )
})

Radio.displayName = "Radio"
