import type { CSSProperties } from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"
import type { Note } from "../../types/note"
import { noteTypeMeta } from "../../lib/noteTypeMeta"
import { formatShortDate } from "../../lib/formatDate"
import { NotePreview } from "./NotePreview"

interface NoteCardProps {
  note: Note
  style?: CSSProperties
}

export function NoteCard({ note, style }: NoteCardProps) {
  const { icon: Icon, label, iconClass } = noteTypeMeta[note.type]

  return (
    <Link
      to={`/note/${note.id}`}
      style={style}
      className="group animate-fade-in-up overflow-hidden rounded-xl border border-(--border) bg-(--surface-raised) shadow-(--shadow-card) transition-all hover:-translate-y-0.5 hover:shadow-(--shadow-raised)"
    >
      <NotePreview note={note} />
      <div className="flex items-center gap-2 border-t border-(--border) px-3 py-2.5">
        <Icon className={clsx("size-4 shrink-0", iconClass)} />
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
