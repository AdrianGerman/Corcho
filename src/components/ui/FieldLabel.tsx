import type { ReactNode } from "react"

interface FieldLabelProps {
  htmlFor?: string
  children: ReactNode
}

const labelClasses = "mb-1 block text-xs font-medium text-(--text-muted)"

export function FieldLabel({ htmlFor, children }: FieldLabelProps) {
  if (!htmlFor) return <span className={labelClasses}>{children}</span>

  return (
    <label htmlFor={htmlFor} className={labelClasses}>
      {children}
    </label>
  )
}
