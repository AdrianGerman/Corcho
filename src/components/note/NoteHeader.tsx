import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { renameNote, deleteNote } from "../../lib/notes"
import { useToast } from "../../hooks/useToast"
import { Button } from "../ui/Button"

interface NoteHeaderProps {
  noteId: string
  name: string
}

export function NoteHeader({ noteId, name }: NoteHeaderProps) {
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [draftName, setDraftName] = useState<string | null>(null)

  async function handleBlur() {
    if (draftName === null) return
    const trimmed = draftName.trim() || "Sin título"
    setDraftName(trimmed)
    if (trimmed !== name) await renameNote(noteId, trimmed)
  }

  async function handleDelete() {
    if (!confirm("¿Eliminar esta nota? Esta acción no se puede deshacer."))
      return
    await deleteNote(noteId)
    showToast("Nota eliminada", "danger")
    navigate("/")
  }

  return (
    <header className="flex items-center justify-between gap-4 border-b border-(--border) bg-(--surface-raised) px-6 py-4">
      <input
        value={draftName ?? name}
        onChange={(e) => setDraftName(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur()
        }}
        placeholder="Sin título"
        className="min-w-0 flex-1 bg-transparent text-xl font-semibold text-(--text) outline-none placeholder:text-(--text-muted)"
      />
      <Button variant="link-danger" className="shrink-0" onClick={handleDelete}>
        Eliminar
      </Button>
    </header>
  )
}
