import type { ButtonHTMLAttributes } from "react"
import clsx from "clsx"
import type { LucideIcon } from "lucide-react"
import {
  sidebarItemClasses,
  type SidebarItemTone,
} from "../../lib/sidebarItemClasses"
import { SidebarItemLabel } from "./SidebarItemLabel"

interface SidebarButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  label: string
  icon: LucideIcon
  collapsed: boolean
  tone?: Exclude<SidebarItemTone, "active">
  iconClassName?: string
}

export function SidebarButton({
  label,
  icon: Icon,
  collapsed,
  tone = "idle",
  iconClassName,
  className,
  ...props
}: SidebarButtonProps) {
  return (
    <button
      type="button"
      title={collapsed ? label : undefined}
      className={clsx(sidebarItemClasses(tone), className)}
      {...props}
    >
      <Icon
        className={clsx(
          "size-5 shrink-0 transition-transform group-hover:scale-110",
          iconClassName,
        )}
      />
      <SidebarItemLabel collapsed={collapsed}>{label}</SidebarItemLabel>
    </button>
  )
}
