import { useState, type FormEvent } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../lib/db"
import { createFolder, deleteFolder } from "../lib/notes"
import { NoteGrid } from "../components/note/NoteGrid"
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
        <h2 className="mb-3 text-lg font-semibold">Carpetas</h2>

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

        <ul className="space-y-2">
          {folders?.map((folder) => (
            <li key={folder.id}>
              <Link
                to={`/folders/${folder.id}`}
                className="text-sm font-medium text-neutral-700 hover:underline dark:text-neutral-300"
              >
                {folder.name}
              </Link>
            </li>
          ))}
          {!folders?.length && (
            <p className="text-sm text-neutral-400 dark:text-neutral-600">
              Aún no hay carpetas.
            </p>
          )}
        </ul>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
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
