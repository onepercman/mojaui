import React from "react"

import { accordion } from "@/components/accordion/accordion"
import { avatar } from "@/components/avatar/avatar"
import { button } from "@/components/button/button"
import { combobox } from "@/components/combobox/combobox"
import { container } from "@/components/container/container"
import { dialog } from "@/components/dialog/dialog"
import { hoverCard } from "@/components/hover-card/hover-card"
import { checkbox } from "@/components/input/checbox"
import { datePicker } from "@/components/input/date-picker"
import { input } from "@/components/input/input"
import { radio } from "@/components/input/radio"
import { switchVariants } from "@/components/input/switch"
import { textarea } from "@/components/input/textarea"
import { menu } from "@/components/menu/menu"
import { popover } from "@/components/popover/popover"
import { radioGroup } from "@/components/radio-group/radio-group"
import { segmentGroup } from "@/components/segment-group/segment-group"
import { select } from "@/components/select/select"
import { slider } from "@/components/slider/slider"
import { table } from "@/components/table/table"
import { tabs } from "@/components/tabs/tabs"
import { ToasterContainer, createToaster, toast } from "@/components/toast"
import { tooltip } from "@/components/tooltip"

type VariantsContext = {
  accordion: typeof accordion
  avatar: typeof avatar
  button: typeof button
  checkbox: typeof checkbox
  combobox: typeof combobox
  container: typeof container
  datePicker: typeof datePicker
  dialog: typeof dialog
  hoverCard: typeof hoverCard
  input: typeof input
  menu: typeof menu
  popover: typeof popover
  radio: typeof radio
  radioGroup: typeof radioGroup
  segmentGroup: typeof segmentGroup
  select: typeof select
  slider: typeof slider
  switchVariants: typeof switchVariants
  table: typeof table
  tabs: typeof tabs
  textarea: typeof textarea
  toast: typeof toast
  tooltip: typeof tooltip
}

const defaultVariants: VariantsContext = {
  accordion,
  avatar,
  button,
  checkbox,
  combobox,
  container,
  datePicker,
  dialog,
  hoverCard,
  input,
  menu,
  popover,
  radio,
  radioGroup,
  segmentGroup,
  select,
  slider,
  switchVariants,
  table,
  tabs,
  textarea,
  toast,
  tooltip,
}

const VariantsContext = React.createContext<VariantsContext>(defaultVariants)

function VariantsProvider({
  children,
  customVariants = {},
  toaster,
}: {
  children?: React.ReactNode
  customVariants?: Partial<Record<keyof VariantsContext, any>>
  toaster?: ReturnType<typeof createToaster>
}) {
  return (
    <VariantsContext.Provider value={{ ...defaultVariants, ...customVariants }}>
      {toaster ? <ToasterContainer toaster={toaster} /> : null}
      {children}
    </VariantsContext.Provider>
  )
}

function useVariants() {
  return React.useContext(VariantsContext)
}

export { VariantsProvider, useVariants }
