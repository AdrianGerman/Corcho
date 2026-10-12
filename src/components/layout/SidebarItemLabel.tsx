import type { ReactNode } from "react"
import clsx from "clsx"

interface SidebarItemLabelProps {
  collapsed: boolean
  children: ReactNode
}

export function SidebarItemLabel({
  collapsed,
  children,
}: SidebarItemLabelProps) {
  return (
    <span
      className={clsx(
        "overflow-hidden whitespace-nowrap transition-opacity duration-200",
        collapsed ? "w-0 opacity-0" : "ml-3 opacity-100",
      )}
    >
      {children}
    </span>
  )
}
