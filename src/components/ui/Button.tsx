import type { ButtonHTMLAttributes } from "react"
import clsx from "clsx"

type ButtonVariant = "primary" | "secondary" | "ghost" | "link-danger"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "rounded-lg px-4 py-2 text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200",
  secondary:
    "rounded-lg px-4 py-2 text-sm font-medium border border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800",
  ghost:
    "rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800",
  "link-danger": "text-xs font-medium text-red-500 hover:underline",
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "transition-colors disabled:opacity-50",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  )
}
