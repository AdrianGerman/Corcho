import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"
import type { LucideIcon } from "lucide-react"

interface BadgeProps {
  icon: LucideIcon
  to?: string
  muted?: boolean
  children: ReactNode
}

export function Badge({ icon: Icon, to, muted = false, children }: BadgeProps) {
  const classes = clsx(
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
    muted
      ? "border border-dashed border-(--border) text-(--text-muted)"
      : "bg-(--accent-soft) text-(--accent)",
    to && !muted && "hover:bg-(--accent) hover:text-white",
  )

  const content = (
    <>
      <Icon className="size-3.5" />
      {children}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    )
  }

  return <span className={classes}>{content}</span>
}
