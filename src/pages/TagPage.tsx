import { useState, type FormEvent } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../lib/db"
import { createTag, deleteTag } from "../lib/notes"
import { NoteGrid } from "../components/note/NoteGrid"
import { TagCard } from "../components/tag/TagCard"
import { Button } from "../components/ui/Button"
import { TextInput } from "../components/ui/TextInput"
import type { Note } from "../types/note"

export function TagPage() {
  const { tagId } = useParams()
  const navigate = useNavigate()

  const tags = useLiveQuery(() => db.tags.toArray(), [])
  const notes = useLiveQuery(
    () =>
      tagId
        ? db.notes.where("tagIds").equals(tagId).toArray()
        : Promise.resolve<Note[]>([]),
    [tagId],
  )

  const [newTagName, setNewTagName] = useState("")

  async function handleCreateTag(e: FormEvent) {
    e.preventDefault()
    if (!newTagName.trim()) return
    await createTag(newTagName)
    setNewTagName("")
  }

  async function handleDeleteTag(id: string, redirectAfter = false) {
    if (!confirm("¿Eliminar este tag? Se quitará de todas las notas.")) return
    await deleteTag(id)
    if (redirectAfter) navigate("/tags")
  }

  if (!tagId) {
    return (
      <div className="p-6">
        <h2 className="mb-3 text-lg font-semibold text-(--text)">Tags</h2>

        <form onSubmit={handleCreateTag} className="mb-5 flex gap-2">
          <div className="flex-1">
            <TextInput
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="Nombre del tag..."
            />
          </div>
          <Button type="submit">Crear</Button>
        </form>

        <div className="flex flex-col gap-2">
          {tags?.map((tag) => (
            <TagCard
              key={tag.id}
              id={tag.id}
              name={tag.name}
              onDelete={() => handleDeleteTag(tag.id)}
            />
          ))}
          {!tags?.length && (
            <p className="text-sm text-(--text-muted)">Aún no hay tags.</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-(--text)">
          {tags?.find((t) => t.id === tagId)?.name ?? "Tag"}
        </h2>
        <Button
          variant="link-danger"
          onClick={() => handleDeleteTag(tagId, true)}
        >
          Eliminar tag
        </Button>
      </div>
      <NoteGrid notes={notes} emptyMessage="No hay notas con este tag." />
    </div>
  )
}
