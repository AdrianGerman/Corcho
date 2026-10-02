import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../lib/db"
import { renameNote, deleteNote } from "../lib/notes"
import { Button } from "../components/ui/Button"
import { NoteBody } from "../components/note/NoteBody"

export function NotePage() {
  const { noteId } = useParams()
  return <NoteEditor key={noteId} noteId={noteId} />
}

function NoteEditor({ noteId }: { noteId?: string }) {
  const navigate = useNavigate()
  const note = useLiveQuery(
    () => (noteId ? db.notes.get(noteId) : undefined),
    [noteId],
  )

  const [draftName, setDraftName] = useState<string | null>(null)
  const name = draftName ?? note?.name ?? ""

  if (!note) {
    return (
      <div className="p-6 text-sm text-neutral-400 dark:text-neutral-600">
        Cargando...
      </div>
    )
  }

  async function handleBlur() {
    if (!noteId || draftName === null) return
    if (draftName.trim() !== note?.name) {
      await renameNote(noteId, draftName)
    }
  }

  async function handleDelete() {
    if (!noteId) return
    if (!confirm("¿Eliminar esta nota? Esta acción no se puede deshacer."))
      return
    await deleteNote(noteId)
    navigate("/")
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-800">
        <input
          value={name}
          onChange={(e) => setDraftName(e.target.value)}
          onBlur={handleBlur}
          className="w-full bg-transparent text-lg font-semibold outline-none"
        />
        <Button
          variant="link-danger"
          className="ml-4 shrink-0"
          onClick={handleDelete}
        >
          Eliminar
        </Button>
      </header>
      <div className="relative min-h-0 flex-1">
        <NoteBody note={note} />
      </div>
    </div>
  )
}
