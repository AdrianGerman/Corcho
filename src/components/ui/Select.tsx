import type { SelectHTMLAttributes } from "react"
import clsx from "clsx"

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
}

export function Select({
  label,
  className,
  id,
  children,
  ...props
}: SelectProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-xs font-medium text-(--text-muted)"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={clsx(
          "w-full rounded-lg border border-(--border) bg-transparent px-3 py-2 text-sm text-(--text) outline-none transition-colors focus:border-(--accent)",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}
