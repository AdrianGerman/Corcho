import { useId, type SelectHTMLAttributes } from "react"
import clsx from "clsx"
import { FieldLabel } from "./FieldLabel"

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
  const generatedId = useId()
  const selectId = id ?? generatedId

  return (
    <div>
      {label && <FieldLabel htmlFor={selectId}>{label}</FieldLabel>}
      <select
        id={selectId}
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
