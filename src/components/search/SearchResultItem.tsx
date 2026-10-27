import { useEffect, useRef } from "react"
import clsx from "clsx"
import type { NoteSearchResult } from "../../lib/searchNotes"
import { noteTypeMeta } from "../../lib/noteTypeMeta"

interface SearchResultItemProps {
  result: NoteSearchResult
  active: boolean
  onSelect: () => void
  onHover: () => void
}

export function SearchResultItem({
  result,
  active,
  onSelect,
  onHover,
}: SearchResultItemProps) {
  const { note, snippet } = result
  const { icon: Icon, label, previewClass, iconClass } = noteTypeMeta[note.type]
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (active) ref.current?.scrollIntoView({ block: "nearest" })
  }, [active])

  return (
    <button
      ref={ref}
      type="button"
      onClick={onSelect}
      onMouseEnter={onHover}
      className={clsx(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors",
        active ? "bg-(--accent-soft)" : "hover:bg-(--surface-hover)",
      )}
    >
      <span
        className={clsx(
          "flex size-9 shrink-0 items-center justify-center rounded-lg",
          previewClass,
        )}
      >
        <Icon className={clsx("size-4", iconClass)} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-(--text)">
          {note.name}
        </span>
        <span className="block truncate text-xs text-(--text-muted)">
          {snippet ?? label}
        </span>
      </span>
    </button>
  )
}
