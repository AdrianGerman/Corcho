import { useParams } from "react-router-dom"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../lib/db"
import { NoteBody } from "../components/note/NoteBody"
import { NoteHeader } from "../components/note/NoteHeader"
import { NoteMetadataBar } from "../components/note/NoteMetadataBar"

export function NotePage() {
  const { noteId } = useParams()
  const note = useLiveQuery(
    () => (noteId ? db.notes.get(noteId) : undefined),
    [noteId],
  )

  if (!note) {
    return <div className="p-6 text-sm text-(--text-muted)">Cargando...</div>
  }

  return (
    <div className="flex h-full flex-col">
      <NoteHeader key={note.id} noteId={note.id} name={note.name} />
      <NoteMetadataBar
        noteId={note.id}
        folderId={note.folderId}
        tagIds={note.tagIds}
      />
      <div className="relative min-h-0 flex-1">
        <NoteBody key={note.id} note={note} />
      </div>
    </div>
  )
}
