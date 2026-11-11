import type { CSSProperties } from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"
import { Folder as FolderIcon, FolderOpen } from "lucide-react"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../../lib/db"
import { useMoveNote } from "../../hooks/useMoveNote"
import { useNoteDropTarget } from "../../hooks/useNoteDropTarget"
import type { Folder } from "../../types/note"

interface FolderCardProps {
  folder: Folder
  style?: CSSProperties
}

export function FolderCard({ folder, style }: FolderCardProps) {
  const noteCount =
    useLiveQuery(
      () => db.notes.where("folderId").equals(folder.id).count(),
      [folder.id],
    ) ?? 0

  const moveNote = useMoveNote()
  const { isOver, dropProps } = useNoteDropTarget((noteId) =>
    moveNote(noteId, folder),
  )
  const Icon = isOver ? FolderOpen : FolderIcon

  return (
    <Link
      to={`/folders/${folder.id}`}
      style={style}
      {...dropProps}
      className={clsx(
        "group animate-fade-in-up flex items-center gap-3 rounded-xl border px-4 py-3 shadow-(--shadow-card) transition-all",
        isOver
          ? "scale-105 border-(--accent) bg-(--accent-soft)"
          : "border-(--border) bg-(--surface-raised) hover:-translate-y-0.5 hover:bg-(--surface-hover) hover:shadow-(--shadow-raised)",
      )}
    >
      <Icon className="size-7 shrink-0 fill-(--accent-soft) text-(--accent) transition-transform group-hover:scale-110 group-hover:animate-wiggle" />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-(--text)">
          {folder.name}
        </p>
        <p className="text-xs text-(--text-muted)">
          {noteCount} {noteCount === 1 ? "nota" : "notas"}
        </p>
      </div>
    </Link>
  )
}
