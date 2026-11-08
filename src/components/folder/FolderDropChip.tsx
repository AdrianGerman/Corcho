import clsx from "clsx"
import { Folder as FolderIcon, FolderOpen, Inbox } from "lucide-react"
import { useMoveNote } from "../../hooks/useMoveNote"
import { useNoteDropTarget } from "../../hooks/useNoteDropTarget"
import type { Folder } from "../../types/note"

interface FolderDropChipProps {
  folder: Folder | null
}

export function FolderDropChip({ folder }: FolderDropChipProps) {
  const moveNote = useMoveNote()
  const { isOver, dropProps } = useNoteDropTarget((noteId) =>
    moveNote(noteId, folder),
  )

  const Icon = folder ? (isOver ? FolderOpen : FolderIcon) : Inbox

  return (
    <div
      {...dropProps}
      className={clsx(
        "flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-all",
        isOver
          ? "scale-105 border-(--accent) bg-(--accent-soft) text-(--accent)"
          : "border-(--border) text-(--text-muted)",
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span className="whitespace-nowrap">{folder?.name ?? "Sin carpeta"}</span>
    </div>
  )
}
