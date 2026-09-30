import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../../lib/db"
import { createNote } from "../../lib/notes"
import type { NoteType } from "../../types/note"
import { Button } from "../ui/Button"
import { TextInput } from "../ui/TextInput"
import { Select } from "../ui/Select"
import { NoteTypeSelect } from "./NoteTypeSelect"
import { TagPicker } from "./TagPicker"

interface CreateNoteDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateNoteDialog({ isOpen, onClose }: CreateNoteDialogProps) {
  const navigate = useNavigate()
  const folders = useLiveQuery(() => db.folders.toArray(), [])

  const [name, setName] = useState("")
  const [type, setType] = useState<NoteType>("document")
  const [folderId, setFolderId] = useState("")
  const [tagIds, setTagIds] = useState<string[]>([])

  if (!isOpen) return null

  function resetForm() {
    setName("")
    setType("document")
    setFolderId("")
    setTagIds([])
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const note = await createNote({
      name,
      type,
      folderId: folderId || null,
      tagIds,
    })
    resetForm()
    onClose()
    navigate(`/note/${note.id}`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-5 shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
      >
        <h2 className="mb-4 text-lg font-semibold">Nueva nota</h2>

        <div className="mb-4">
          <TextInput
            label="Nombre"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Sin título"
          />
        </div>

        <div className="mb-4">
          <NoteTypeSelect value={type} onChange={setType} />
        </div>

        <div className="mb-4">
          <Select
            label="Carpeta"
            value={folderId}
            onChange={(e) => setFolderId(e.target.value)}
          >
            <option value="">Sin carpeta</option>
            {folders?.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="mb-5">
          <TagPicker selectedIds={tagIds} onChange={setTagIds} />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              resetForm()
              onClose()
            }}
          >
            Cancelar
          </Button>
          <Button type="submit">Crear</Button>
        </div>
      </form>
    </div>
  )
}
