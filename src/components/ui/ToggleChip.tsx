import type { ButtonHTMLAttributes } from "react"
import clsx from "clsx"

interface ToggleChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean
  shape?: "pill" | "block"
}

export function ToggleChip({
  active,
  shape = "pill",
  className,
  ...props
}: ToggleChipProps) {
  return (
    <button
      type="button"
      className={clsx(
        "border font-medium transition-colors",
        shape === "pill"
          ? "rounded-full px-3 py-1 text-xs"
          : "flex-1 rounded-lg px-3 py-2 text-sm",
        active
          ? "border-(--accent) bg-(--accent) text-white"
          : "border-(--border) text-(--text-muted) hover:bg-(--surface-hover)",
        className,
      )}
      {...props}
    />
  )
}
