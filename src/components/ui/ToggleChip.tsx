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
          ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
          : "border-neutral-300 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800",
        className,
      )}
      {...props}
    />
  )
}
