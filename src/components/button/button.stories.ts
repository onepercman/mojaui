import type { Meta, StoryObj } from "@storybook/react"
import { Button, ButtonProps, button } from "."

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    size: {
      control: { type: "select" },
      options: Object.keys(button.variants.size),
    },
    variant: {
      control: { type: "select" },
      options: Object.keys(button.variants.variant),
    },
    color: {
      control: { type: "select" },
      options: Object.keys(button.variants.color),
    },
    shape: {
      control: { type: "select" },
      options: Object.keys(button.variants.shape),
    },
    loadingVariant: {
      control: { type: "select" },
      options: ["default", "transparent"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    loading: {
      control: { type: "boolean" },
    },
  },
}

export default meta

const defaultProps: ButtonProps = {
  children: "Button",
  ...button.defaultVariants,
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    ...defaultProps,
  },
}

export const Outlined: Story = {
  args: {
    ...defaultProps,
  },
}
