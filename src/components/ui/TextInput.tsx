import type { InputHTMLAttributes } from "react"
import clsx from "clsx"

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function TextInput({ label, className, id, ...props }: TextInputProps) {
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
      <input
        id={id}
        className={clsx(
          "w-full rounded-lg border border-(--border) bg-transparent px-3 py-2 text-sm text-(--text) outline-none transition-colors focus:border-(--accent)",
          className,
        )}
        {...props}
      />
    </div>
  )
}
