import * as variants from "@/variants"
import { createToaster } from "@ark-ui/react"
import React from "react"
import { ToasterContainer } from ".."

type VariantsContext = typeof variants

const VariantsContext = React.createContext<VariantsContext>(variants)

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
    <VariantsContext.Provider value={{ ...variants, ...customVariants }}>
      {toaster ? <ToasterContainer toaster={toaster} /> : null}
      {children}
    </VariantsContext.Provider>
  )
}

function useVariants() {
  return React.useContext(VariantsContext)
}

export { VariantsProvider, useVariants }
