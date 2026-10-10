import type { Note } from "../../types/note"
import { NoteCard } from "./NoteCard"

interface NoteGridProps {
  notes: Note[] | undefined
  emptyMessage: string
}

export function NoteGrid({ notes, emptyMessage }: NoteGridProps) {
  if (!notes?.length) {
    return <p className="text-sm text-(--text-muted)">{emptyMessage}</p>
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  )
}
