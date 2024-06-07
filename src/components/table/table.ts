import { SlotsClasses } from "@/types"
import { VariantProps, tv } from "tailwind-variants"
import { PaginationProps } from "../pagination"

export const table = tv({
  base: "border-line w-full overflow-auto rounded border",
  slots: {
    table: "w-full border-collapse",
    trHead: "divide-line divide-x",
    th: "text-secondary border-line border-b px-4 py-2 font-normal text-sm bg-default",
    tr: "divide-line group divide-x transition-colors group",
    td: "px-4 py-2 transition-all",
  },
  variants: {
    selectionMode: {
      single: { td: "cursor-pointer group-hover:bg-default/70" },
      multiple: { td: "cursor-pointer group-hover:bg-default/70" },
    },
  },
})

export type TableVariantProps = VariantProps<typeof table>
export type TableReturnType = ReturnType<typeof table>
export type TableSlots = keyof TableReturnType
export type TableSlotsClasses = SlotsClasses<TableSlots>

export interface TableRow extends Readonly<Record<string, unknown>> {
  key?: string
}

export interface TableSort {
  column: string
  direction: "asc" | "desc"
}

export interface TableColumnProps<Row extends TableRow>
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  label: React.ReactNode
  key: string
  dataIndex: keyof Row
  sort: boolean
  headAlign?: React.ThHTMLAttributes<HTMLTableCellElement>["align"]
  dataAlign?: React.ThHTMLAttributes<HTMLTableCellElement>["align"]
  enableSort?: boolean
  render(value: any, row: Row, index: number): React.ReactNode
}

export interface TableProps<Row extends TableRow>
  extends React.HTMLAttributes<HTMLTableElement>,
    TableVariantProps,
    TableSlotsClasses {
  columns?: readonly Partial<TableColumnProps<Row>>[]
  data?: readonly Row[]
  loading?: boolean
  className?: string
  pagination?: PaginationProps
  defaultSelectedKeys?: any[]
  selectedKeys?: any[]
  sort?: TableSort
  onSort?(sort?: TableSort): void
  extractKey?(row: Row): any
  onSelectRow?(row: Row[]): void
}
