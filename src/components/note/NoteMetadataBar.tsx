import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../../lib/db"
import { updateNoteFolder, updateNoteTags } from "../../lib/notes"
import { Select } from "../ui/Select"
import { TagPicker } from "./TagPicker"

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
  const folders = useLiveQuery(() => db.folders.toArray(), [])

  return (
    <div className="flex flex-wrap items-start gap-4 border-b border-neutral-200 p-4 dark:border-neutral-800">
      <div className="w-48">
        <Select
          label="Carpeta"
          value={folderId ?? ""}
          onChange={(e) => updateNoteFolder(noteId, e.target.value || null)}
        >
          <option value="">Sin carpeta</option>
          {folders?.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex-1">
        <TagPicker
          selectedIds={tagIds}
          onChange={(ids) => updateNoteTags(noteId, ids)}
        />
      </div>
    </div>
  )
}
