import { useNavigate } from "react-router-dom"
import { renameNote, deleteNote } from "../../lib/notes"
import { useToast } from "../../hooks/useToast"
import { Button } from "../ui/Button"
import { EditableTitle } from "../ui/EditableTitle"

interface NoteHeaderProps {
  noteId: string
  name: string
}

export function NoteHeader({ noteId, name }: NoteHeaderProps) {
  const navigate = useNavigate()
  const { showToast } = useToast()

  async function handleDelete() {
    if (!confirm("¿Eliminar esta nota? Esta acción no se puede deshacer."))
      return
    await deleteNote(noteId)
    showToast("Nota eliminada", "danger")
    navigate("/")
  }

  return (
    <header className="flex items-center justify-between gap-4 border-b border-(--border) bg-(--surface-raised) px-6 py-4">
      <EditableTitle
        value={name}
        onSave={(newName) => renameNote(noteId, newName)}
        placeholder="Sin título"
        className="flex-1 text-xl"
      />
      <Button variant="link-danger" className="shrink-0" onClick={handleDelete}>
        Eliminar
      </Button>
    </header>
  )
}
