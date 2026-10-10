import { Link } from "react-router-dom"
import { Folder as FolderIcon } from "lucide-react"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../../lib/db"
import type { Folder } from "../../types/note"

interface FolderCardProps {
  folder: Folder
}

export function FolderCard({ folder }: FolderCardProps) {
  const noteCount =
    useLiveQuery(
      () => db.notes.where("folderId").equals(folder.id).count(),
      [folder.id],
    ) ?? 0

  return (
    <Link
      to={`/folders/${folder.id}`}
      className="group animate-fade-in-up flex items-center gap-3 rounded-xl border border-(--border) bg-(--surface-raised) px-4 py-3 shadow-(--shadow-card) transition-all hover:-translate-y-0.5 hover:bg-(--surface-hover) hover:shadow-(--shadow-raised)"
    >
      <FolderIcon className="size-7 shrink-0 fill-(--accent-soft) text-(--accent) transition-transform group-hover:scale-110" />
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
