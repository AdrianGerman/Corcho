import { useState } from "react"
import clsx from "clsx"

interface EditableTitleProps {
  value: string
  onSave: (value: string) => void | Promise<void>
  placeholder?: string
  className?: string
}

export function EditableTitle({
  value,
  onSave,
  placeholder,
  className,
}: EditableTitleProps) {
  const [draft, setDraft] = useState<string | null>(null)

  async function commit() {
    if (draft === null) return
    const trimmed = draft.trim()
    if (!trimmed) {
      setDraft(null)
      return
    }
    setDraft(trimmed)
    if (trimmed !== value) await onSave(trimmed)
  }

  return (
    <input
      value={draft ?? value}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.currentTarget.blur()
      }}
      placeholder={placeholder}
      aria-label="Nombre"
      title="Haz clic para renombrar"
      className={clsx(
        "-mx-2 min-w-0 rounded-lg bg-transparent px-2 py-1 font-semibold text-(--text) outline-none transition-colors placeholder:text-(--text-muted) hover:bg-(--surface-hover) focus:bg-(--surface-hover)",
        className,
      )}
    />
  )
}
