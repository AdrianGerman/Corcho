import type { CSSProperties } from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"
import type { Note } from "../../types/note"
import { noteTypeMeta } from "../../lib/noteTypeMeta"
import { formatShortDate } from "../../lib/formatDate"
import { useDraggableNote } from "../../hooks/useDraggableNote"
import { NotePreview } from "./NotePreview"
import { NoteTypeIcon } from "./NoteTypeIcon"

interface NoteCardProps {
  note: Note
  style?: CSSProperties
}

export function NoteCard({ note, style }: NoteCardProps) {
  const { label } = noteTypeMeta[note.type]
  const { isDragging, dragProps } = useDraggableNote(note.id)

  return (
    <Link
      to={`/note/${note.id}`}
      style={style}
      {...dragProps}
      className={clsx(
        "group animate-fade-in-up overflow-hidden rounded-xl border border-(--border) bg-(--surface-raised) shadow-(--shadow-card) transition-all hover:-translate-y-0.5 hover:shadow-(--shadow-raised)",
        isDragging && "scale-95 saturate-50",
      )}
    >
      <NotePreview note={note} />
      <div className="flex items-center gap-2.5 border-t border-(--border) px-3 py-2.5">
        <NoteTypeIcon type={note.type} className="size-8" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-(--text)">
            {note.name}
          </p>
          <p className="text-xs text-(--text-muted)">
            {label} · {formatShortDate(note.updatedAt)}
          </p>
        </div>
      </div>
    </Link>
  )
}
