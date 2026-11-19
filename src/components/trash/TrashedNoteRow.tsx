import type { CSSProperties } from "react"
import { Undo2 } from "lucide-react"
import { noteTypeMeta } from "../../lib/noteTypeMeta"
import { formatTrashDaysLeft } from "../../lib/trashRetention"
import type { TrashEntry } from "../../types/trash"
import { NoteTypeIcon } from "../note/NoteTypeIcon"
import { Button } from "../ui/Button"

interface TrashedNoteRowProps {
  entry: TrashEntry
  style?: CSSProperties
  onRestore: () => void
  onDelete: () => void
}

export function TrashedNoteRow({
  entry,
  style,
  onRestore,
  onDelete,
}: TrashedNoteRowProps) {
  const { note, daysLeft } = entry
  const { label } = noteTypeMeta[note.type]

  return (
    <li
      style={style}
      className="animate-fade-in-up flex items-center gap-3 rounded-xl border border-(--border) bg-(--surface-raised) px-4 py-3 shadow-(--shadow-card)"
    >
      <NoteTypeIcon type={note.type} className="size-9" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-(--text)">
          {note.name}
        </p>
        <p className="text-xs text-(--text-muted)">
          {label} · {formatTrashDaysLeft(daysLeft)}
        </p>
      </div>
      <Button
        variant="secondary"
        className="flex items-center gap-1.5"
        onClick={onRestore}
      >
        <Undo2 className="size-4" />
        Restaurar
      </Button>
      <Button variant="link-danger" onClick={onDelete}>
        Eliminar
      </Button>
    </li>
  )
}
