import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../../lib/db"
import { useNoteDragActive } from "../../hooks/useNoteDragActive"
import { FolderDropChip } from "../folder/FolderDropChip"

export function MoveNoteBar() {
  const isDragging = useNoteDragActive()
  const folders = useLiveQuery(() => db.folders.toArray(), [])

  if (!isDragging) return null

  return (
    <div className="animate-fade-in-up pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <div className="pointer-events-auto flex max-w-full items-center gap-2 overflow-x-auto rounded-2xl border border-(--border) bg-(--surface-raised) p-2 shadow-(--shadow-raised)">
        <span className="shrink-0 px-2 text-xs font-medium text-(--text-muted)">
          Mover a
        </span>
        <FolderDropChip folder={null} />
        {folders?.map((folder) => (
          <FolderDropChip key={folder.id} folder={folder} />
        ))}
      </div>
    </div>
  )
}
