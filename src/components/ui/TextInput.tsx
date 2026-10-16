import { useId, type InputHTMLAttributes } from "react"
import clsx from "clsx"
import { FieldLabel } from "./FieldLabel"

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function TextInput({ label, className, id, ...props }: TextInputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
      <input
        id={inputId}
        className={clsx(
          "w-full rounded-lg border border-(--border) bg-transparent px-3 py-2 text-sm text-(--text) outline-none transition-colors focus:border-(--accent)",
          className,
        )}
        {...props}
      />
    </div>
  )
}
