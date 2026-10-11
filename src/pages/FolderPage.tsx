import { useState, type FormEvent } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../lib/db"
import { createFolder, deleteFolder } from "../lib/notes"
import { NoteGrid } from "../components/note/NoteGrid"
import { FolderGrid } from "../components/folder/FolderGrid"
import { Button } from "../components/ui/Button"
import { TextInput } from "../components/ui/TextInput"

export function FolderPage() {
  const { folderId } = useParams()
  const navigate = useNavigate()
  const [newFolderName, setNewFolderName] = useState("")

  const folders = useLiveQuery(() => db.folders.toArray(), [])
  const notes = useLiveQuery(
    () =>
      folderId
        ? db.notes.where("folderId").equals(folderId).toArray()
        : db.notes.toArray(),
    [folderId],
  )

  async function handleCreateFolder(e: FormEvent) {
    e.preventDefault()
    if (!newFolderName.trim()) return
    await createFolder(newFolderName)
    setNewFolderName("")
  }

  async function handleDeleteFolder() {
    if (!folderId) return
    if (!confirm("¿Eliminar esta carpeta? Las notas no se borrarán.")) return
    await deleteFolder(folderId)
    navigate("/folders")
  }

  if (!folderId) {
    return (
      <div className="p-6">
        <h2 className="mb-3 text-lg font-semibold text-(--text)">Carpetas</h2>

        <form onSubmit={handleCreateFolder} className="mb-5 flex gap-2">
          <div className="flex-1">
            <TextInput
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Nombre de la carpeta..."
            />
          </div>
          <Button type="submit">Crear</Button>
        </form>

        <FolderGrid folders={folders} emptyMessage="Aún no hay carpetas." />
      </div>
    )
  }

  return (
    <div className="p-6">
      <Link
        to="/folders"
        className="mb-3 inline-flex items-center gap-1 text-xs font-medium text-(--text-muted) transition-colors hover:text-(--accent)"
      >
        <ArrowLeft className="size-3.5" />
        Carpetas
      </Link>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-(--text)">
          {folders?.find((f) => f.id === folderId)?.name ?? "Carpeta"}
        </h2>
        <Button variant="link-danger" onClick={handleDeleteFolder}>
          Eliminar carpeta
        </Button>
      </div>
      <NoteGrid notes={notes} emptyMessage="Esta carpeta no tiene notas." />
    </div>
  )
}
