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
          className="mb-1 block text-xs font-medium text-neutral-500 dark:text-neutral-400"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={clsx(
          "w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-neutral-500 dark:border-neutral-700",
          className,
        )}
        {...props}
      />
    </div>
  )
}
