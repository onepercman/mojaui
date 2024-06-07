import { useVariants } from "@/providers/variants-provider"
import { ForwardedRefComponent } from "@/types"
import * as Ark from "@ark-ui/react"
import React from "react"
import { RadioGroupProps } from "./radio-group"

interface RadioGroup extends ForwardedRefComponent {
  (props: RadioGroupProps): React.ReactElement | null
}

function _constructor(
  render: (
    props: RadioGroupProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => React.ReactElement | null,
) {
  return React.forwardRef<HTMLDivElement, RadioGroupProps>(
    render,
  ) as unknown as RadioGroup
}

export const RadioGroup = _constructor(function (
  {
    options,
    label,
    size,
    invalid,
    invalidMessage,
    className,
    classNames,
    ...props
  },
  ref,
) {
  const { radioGroup } = useVariants()
  const classes = radioGroup({ size, invalid, className })

  return (
    <Ark.RadioGroup.Root
      ref={ref}
      className={classes.base({ class: classNames?.base })}
      {...props}
    >
      <Ark.RadioGroup.Label
        className={classes.label({ class: classNames?.label })}
      >
        {label}
      </Ark.RadioGroup.Label>
      <Ark.RadioGroup.Indicator />
      {options?.map(({ label, ...item }) => (
        <Ark.RadioGroup.Item
          key={item.value}
          {...item}
          className={classes.item({ class: classNames?.item })}
        >
          <Ark.RadioGroup.ItemControl
            className={classes.control({ class: classNames?.control })}
          />
          <Ark.RadioGroup.ItemText
            className={classes.itemText({ class: classNames?.itemText })}
          >
            {label}
          </Ark.RadioGroup.ItemText>
          <Ark.RadioGroup.ItemHiddenInput />
        </Ark.RadioGroup.Item>
      ))}
      <Ark.Presence
        className="text-xs text-error animate-in fade-in"
        present={Boolean(invalid && invalidMessage)}
      >
        {invalidMessage}
      </Ark.Presence>
    </Ark.RadioGroup.Root>
  )
})

RadioGroup.displayName = "RadioGroup"

export * from "./radio-group"
