import type { ButtonHTMLAttributes } from "react"
import clsx from "clsx"

type ButtonVariant = "primary" | "secondary" | "ghost" | "link-danger"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "rounded-lg px-4 py-2 text-sm font-medium bg-(--accent) text-white hover:bg-(--accent-hover)",
  secondary:
    "rounded-lg px-4 py-2 text-sm font-medium border border-(--border) text-(--text) hover:bg-(--surface-hover)",
  ghost:
    "rounded-lg px-4 py-2 text-sm font-medium text-(--text-muted) hover:bg-(--surface-hover)",
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
        "transition-colors active:scale-95",
        "disabled:opacity-50 disabled:active:scale-100",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  )
}
