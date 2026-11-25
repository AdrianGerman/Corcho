import type { CSSProperties } from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"
import type { Note } from "../../types/note"
import { noteTypeMeta } from "../../lib/noteTypeMeta"
import { formatShortDate } from "../../lib/formatDate"
import { setNotePinned } from "../../lib/pinnedNotes"
import { useDraggableNote } from "../../hooks/useDraggableNote"
import { NotePreview } from "./NotePreview"
import { NoteTypeIcon } from "./NoteTypeIcon"
import { PinButton } from "./PinButton"

interface NoteCardProps {
  note: Note
  style?: CSSProperties
}

export function NoteCard({ note, style }: NoteCardProps) {
  const { label } = noteTypeMeta[note.type]
  const { isDragging, dragProps } = useDraggableNote(note.id)
  const pinned = note.pinnedAt !== undefined

  return (
    <div
      style={style}
      className={clsx(
        "group animate-fade-in-up relative overflow-hidden rounded-xl border border-(--border) bg-(--surface-raised) shadow-(--shadow-card) transition-all hover:-translate-y-0.5 hover:shadow-(--shadow-raised)",
        isDragging && "scale-95 saturate-50",
      )}
    >
      <Link to={`/note/${note.id}`} {...dragProps} className="block">
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

      <PinButton
        pinned={pinned}
        onToggle={() => setNotePinned(note.id, !pinned)}
        className="absolute top-2 right-2"
      />
    </div>
  )
}
