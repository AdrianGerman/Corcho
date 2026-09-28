import { Link } from "react-router-dom"
import type { Note } from "../../types/note"
import { noteTypeLabels } from "../../lib/noteTypeLabels"

interface NoteCardProps {
  note: Note
  showType?: boolean
}

export function NoteCard({ note, showType = false }: NoteCardProps) {
  return (
    <Link
      to={`/nota/${note.id}`}
      className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-600"
    >
      <p className="truncate text-sm font-medium">{note.name}</p>
      {showType && (
        <p className="mt-1 text-xs uppercase text-neutral-400 dark:text-neutral-500">
          {noteTypeLabels[note.type]}
        </p>
      )}
    </Link>
  )
}
