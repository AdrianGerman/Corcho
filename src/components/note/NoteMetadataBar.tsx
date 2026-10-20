import { useState } from "react"
import { Check, Pencil } from "lucide-react"
import { Button } from "../ui/Button"
import { NoteMetadataView } from "./NoteMetadataView"
import { NoteMetadataForm } from "./NoteMetadataForm"

interface NoteMetadataBarProps {
  noteId: string
  folderId: string | null
  tagIds: string[]
}

export function NoteMetadataBar({
  noteId,
  folderId,
  tagIds,
}: NoteMetadataBarProps) {
  const [editing, setEditing] = useState(false)

  return (
    <div className="flex items-center justify-between gap-4 border-b border-(--border) bg-(--surface-raised) px-6 py-3">
      <div className="min-w-0 flex-1">
        {editing ? (
          <NoteMetadataForm
            noteId={noteId}
            folderId={folderId}
            tagIds={tagIds}
          />
        ) : (
          <NoteMetadataView folderId={folderId} tagIds={tagIds} />
        )}
      </div>
      <Button
        variant="secondary"
        className="flex shrink-0 items-center gap-1.5"
        onClick={() => setEditing((prev) => !prev)}
      >
        {editing ? <Check className="size-4" /> : <Pencil className="size-4" />}
        {editing ? "Listo" : "Editar"}
      </Button>
    </div>
  )
}
