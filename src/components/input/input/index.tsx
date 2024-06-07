import { useVariants } from "@/providers/variants-provider"
import { cn } from "@/utils"
import { useComposedRefs } from "@/utils/ref"
import * as Ark from "@ark-ui/react"
import React from "react"
import { HiEye, HiEyeOff } from "react-icons/hi"
import { LuX } from "react-icons/lu"
import { InputProps } from "./input"

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      prefix,
      suffix,
      addonBefore,
      addonAfter,
      size,
      variant,
      invalid,
      invalidMessage,
      required,
      clearable,
      onChange,
      transform,
      className,
      classNames,
      ...props
    },
    ref,
  ) => {
    const { input } = useVariants()
    const classes = input({ size, variant, invalid })

    const internalRef = React.useRef<HTMLInputElement>(null)
    const composedRef = useComposedRefs(ref, internalRef)

    const [showClear, setShowClear] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)

    function getTogglePassword() {
      if (props.type === "password") {
        if (showPassword) {
          return (
            <HiEye
              className="ml-2"
              onClick={() => {
                if (internalRef.current) {
                  internalRef.current.type = "password"
                  setShowPassword(false)
                }
              }}
            />
          )
        }
        return (
          <HiEyeOff
            className="ml-2 text-secondary"
            onClick={() => {
              if (internalRef.current) {
                internalRef.current.type = "text"
                setShowPassword(true)
              }
            }}
          />
        )
      }
    }

    function getClear() {
      if (showClear && clearable) {
        return (
          <LuX
            className="cursor-pointer text-secondary"
            onClick={function () {
              if (internalRef.current) {
                setShowClear(false)
                internalRef.current.value = ""
                const currentTarget = internalRef.current.cloneNode(true)
                const event = Object.create(new Event("change"), {
                  target: { value: currentTarget },
                  currentTarget: { value: currentTarget },
                })
                onChange && onChange(event)
              }
            }}
          />
        )
      }
    }

    function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
      if (transform && internalRef.current) {
        internalRef.current.value = transform(internalRef.current.value)
      }
      onChange && onChange(ev)
      setShowClear(!!ev.target.value)
    }

    function _renderPrefix() {
      const element = prefix as React.ReactElement
      if (!element) return null

      if (typeof element === "object" && "type" in element)
        return React.cloneElement(element)
      return <span>{element}</span>
    }

    function _renderSuffix() {
      const element = suffix as React.ReactElement
      if (!element) return null
      if (typeof element === "object" && "type" in element)
        return React.cloneElement(element)
      return <span>{element}</span>
    }

    function _renderAddonBefore() {
      const element = addonBefore as React.ReactElement
      if (!element) return null
      if (typeof element === "object" && "type" in element)
        return React.cloneElement(element, {
          className: classes.addonBefore({
            className: element.props.className,
            class: classNames?.addonBefore,
          }),
        })
      return (
        <span
          className={classes.addonBefore({ class: classNames?.addonBefore })}
        >
          {element}
        </span>
      )
    }

    function _renderAddonAfter() {
      const element = addonAfter as React.ReactElement
      if (!element) return null
      if (typeof element === "object" && "type" in element)
        return React.cloneElement(element, {
          className: classes.addonAfter({
            className: element.props.className,
            class: classNames?.addonAfter,
          }),
        })
      return (
        <span className={classes.addonAfter({ class: classNames?.addonAfter })}>
          {element}
        </span>
      )
    }

    return (
      <label
        role="input"
        className={classes.base({ className, class: classNames?.base })}
        onClick={function (e) {
          e.currentTarget.getElementsByTagName("input")[0].focus()
        }}
      >
        <div className={classes.label({ class: classNames?.label })}>
          <span>{label}</span>
          {required ? <span className="text-xs text-error">*</span> : null}
        </div>
        <div
          className={classes.group({
            className: cn({ "pl-0": addonBefore, "pr-0": addonAfter }),
            class: classNames?.group,
          })}
        >
          {_renderAddonBefore()}
          {_renderPrefix()}
          <input
            ref={composedRef}
            onChange={handleChange}
            className={classes.input({ class: classNames?.input })}
            {...props}
          />
          {getClear()}
          {getTogglePassword()}
          {_renderSuffix()}
          {_renderAddonAfter()}
        </div>
        <Ark.Presence
          className="text-xs text-error animate-in fade-in"
          present={Boolean(invalid && invalidMessage)}
        >
          {invalidMessage}
        </Ark.Presence>
      </label>
    )
  },
)

Input.displayName = "Input"

export * from "./input"
