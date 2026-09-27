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
          className="mb-1 block text-xs font-medium text-neutral-500 dark:text-neutral-400"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={clsx(
          "w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-neutral-500 dark:border-neutral-700",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}
