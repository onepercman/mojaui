import * as Ark from "@ark-ui/react"
import { ButtonVariantProps } from "../button"

export interface PaginationProps
  extends Omit<Ark.PaginationRootProps, "color">,
    ButtonVariantProps {
  activeProps?: ButtonVariantProps
  inactiveProps?: ButtonVariantProps
}
