export type SlotsClasses<S extends string> = {
  classNames?: { [key in S]?: any }
}

export type ReactTag =
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>

export type PropsWithAsAttributes<Props, As extends ReactTag> = Props & {
  as?: As
} & Omit<React.HTMLAttributes<As>, keyof Props>

export interface ForwardedRefComponent {
  displayName?: string
  defaultProps?: Partial<any>
  id?: string
}

export type ForwardRefWithAsProps<
  As extends ReactTag,
  Props,
> = React.ComponentPropsWithoutRef<As> &
  PropsWithAsAttributes<Props, As> &
  React.RefAttributes<Element>
