import { useMemo } from "react"
import type { Note } from "../../types/note"
import { useNoteSort } from "../../hooks/useNoteSort"
import { sortNotes } from "../../lib/noteSort"
import { NoteGrid } from "./NoteGrid"
import { NoteSortSelect } from "./NoteSortSelect"

interface SortedNoteGridProps {
  notes: Note[] | undefined
  emptyMessage: string
}

export function SortedNoteGrid({ notes, emptyMessage }: SortedNoteGridProps) {
  const { sortKey, setSortKey } = useNoteSort()

  const sortedNotes = useMemo(
    () => notes && sortNotes(notes, sortKey),
    [notes, sortKey],
  )

  return (
    <div>
      {!!notes && notes.length > 1 && (
        <div className="mb-4 flex justify-end">
          <NoteSortSelect value={sortKey} onChange={setSortKey} />
        </div>
      )}
      <NoteGrid notes={sortedNotes} emptyMessage={emptyMessage} />
    </div>
  )
}
