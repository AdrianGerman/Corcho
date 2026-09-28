import type { Note } from "../../types/note"
import { NoteCard } from "./NoteCard"

interface NoteGridProps {
  notes: Note[] | undefined
  showType?: boolean
  emptyMessage: string
}

export function NoteGrid({ notes, showType, emptyMessage }: NoteGridProps) {
  if (!notes?.length) {
    return (
      <p className="text-sm text-neutral-400 dark:text-neutral-600">
        {emptyMessage}
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} showType={showType} />
      ))}
    </div>
  )
}
