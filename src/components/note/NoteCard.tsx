import { Link } from "react-router-dom"
import clsx from "clsx"
import type { Note } from "../../types/note"
import { noteTypeMeta } from "../../lib/noteTypeMeta"
import { formatShortDate } from "../../lib/formatDate"

interface NoteCardProps {
  note: Note
}

export function NoteCard({ note }: NoteCardProps) {
  const { icon: Icon, label, previewClass, iconClass } = noteTypeMeta[note.type]

  return (
    <Link
      to={`/note/${note.id}`}
      className="group animate-fade-in-up overflow-hidden rounded-xl border border-(--border) bg-(--surface-raised) shadow-(--shadow-card) transition-all hover:-translate-y-0.5 hover:shadow-(--shadow-raised)"
    >
      <div
        className={clsx("flex h-28 items-center justify-center", previewClass)}
      >
        <Icon
          strokeWidth={1.5}
          className={clsx(
            "size-10 transition-transform group-hover:scale-110",
            iconClass,
          )}
        />
      </div>
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
