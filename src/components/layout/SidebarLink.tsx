import { NavLink } from "react-router-dom"
import type { LucideIcon } from "lucide-react"
import { sidebarItemClasses } from "../../lib/sidebarItemClasses"
import { SidebarItemLabel } from "./SidebarItemLabel"

interface SidebarLinkProps {
  to: string
  label: string
  icon: LucideIcon
  collapsed: boolean
  end?: boolean
}

export function SidebarLink({
  to,
  label,
  icon: Icon,
  collapsed,
  end,
}: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      end={end}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        sidebarItemClasses(isActive ? "active" : "idle")
      }
    >
      <Icon className="size-5 shrink-0 transition-transform group-hover:scale-110" />
      <SidebarItemLabel collapsed={collapsed}>{label}</SidebarItemLabel>
    </NavLink>
  )
}
