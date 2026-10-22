import type { Folder } from "../../types/note"
import { staggerStyle } from "../../lib/stagger"
import { FolderCard } from "./FolderCard"

interface FolderGridProps {
  folders: Folder[] | undefined
  emptyMessage: string
}

export function FolderGrid({ folders, emptyMessage }: FolderGridProps) {
  if (!folders?.length) {
    return <p className="text-sm text-(--text-muted)">{emptyMessage}</p>
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {folders.map((folder, index) => (
        <FolderCard
          key={folder.id}
          folder={folder}
          style={staggerStyle(index)}
        />
      ))}
    </div>
  )
}
