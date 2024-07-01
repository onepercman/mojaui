"use client"
import { SlotsClasses } from "@/types"
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentProps,
  type ElementType,
  type ExoticComponent,
} from "react"
import { cn } from "./cn"

type Recipe = (props: any) => any
type VariantProps<R extends Recipe> = Parameters<R>[0]
type ProviderComponentProps<ComponentProps extends object> =
  | ExoticComponent<ComponentProps>
  | ((prop: ComponentProps) => JSX.Element)

export function createClassContext<
  StylesFunction extends Recipe,
  Slot extends keyof ReturnType<StylesFunction>,
>(createStyles: StylesFunction) {
  const StyleContext = createContext<{
    variants: ReturnType<StylesFunction>
    // @ts-expect-error force slot type
    classes: SlotsClasses<Slot>["classNames"] | null
  } | null>(null)

  function withClassProvider<C extends ElementType>(Component: C, slot?: Slot) {
    const Comp = forwardRef(
      (
        props: ComponentProps<C> &
          VariantProps<StylesFunction> &
          // @ts-expect-error force slot type
          SlotsClasses<Slot>,
        ref,
      ) => {
        const variants = createStyles(props)
        const variantClassNames = variants[slot ?? ""]?.()
        return (
          <StyleContext.Provider
            value={{ variants, classes: props.classNames }}
          >
            <Component
              ref={ref}
              {...props}
              className={cn(variantClassNames, props.className)}
            />
          </StyleContext.Provider>
        )
      },
    )
    // @ts-expect-error JSX.IntrinsicElements do not have a displayName but Function and Class components do
    Comp.displayName = Component.displayName || Component.name || "Component"
    return Comp
  }

  function withClassContext<C extends ElementType>(Component: C, slot?: Slot) {
    type ComponentPropsWithVariants = ComponentProps<C>

    const Comp = forwardRef((props: ComponentPropsWithVariants, ref) => {
      const recipe = useContext(StyleContext)
      const variantClassNames = recipe?.variants?.[slot ?? ""]?.(
        slot && recipe?.classes ? { class: recipe.classes[slot] } : undefined,
      )

      return (
        <Component
          ref={ref}
          {...(props as any)}
          className={cn(variantClassNames, props.className)}
        />
      )
    })

    // @ts-expect-error JSX.IntrinsicElements do not have a displayName but Function and Class components do
    Comp.displayName = Component.displayName || Component.name || "Component"
    return Comp
  }

  return {
    withClassProvider,
    withClassContext,
  }
}

export function mergeProps<T extends Record<string, any>>(
  baseProps: T,
  propsToMerge: Partial<T>,
): T {
  return {
    ...baseProps,
    ...propsToMerge,
  }
}

export function styled<ComponentProps extends object>(
  Component: ProviderComponentProps<ComponentProps>,
  createStyles: (...args: any) => any,
) {
  const Comp = forwardRef<typeof Component, ComponentProps>((props, ref) => {
    const classNames = createStyles(props)

    const componentProps = mergeProps(props, {
      className: classNames,
    } as any) // TODO remove variant props from component props

    return <Component {...componentProps} ref={ref} />
  })
  // @ts-expect-error - it exists
  Comp.displayName = Component.displayName || Component.name
  return Comp
}
