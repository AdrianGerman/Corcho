import { useLiveQuery } from "dexie-react-hooks"
import { Folder as FolderIcon, Tag as TagIcon } from "lucide-react"
import { db } from "../../lib/db"
import type { Tag } from "../../types/note"
import { Badge } from "../ui/Badge"

interface NoteMetadataViewProps {
  folderId: string | null
  tagIds: string[]
}

export function NoteMetadataView({ folderId, tagIds }: NoteMetadataViewProps) {
  const folder = useLiveQuery(
    () => (folderId ? db.folders.get(folderId) : undefined),
    [folderId],
  )
  const tagList = useLiveQuery(
    () => db.tags.bulkGet(tagIds),
    [tagIds.join(",")],
  )

  const tags = (tagList ?? []).filter((tag): tag is Tag => tag !== undefined)

  return (
    <div className="animate-fade-in flex flex-wrap items-center gap-2">
      {folder ? (
        <Badge icon={FolderIcon} to={`/folders/${folder.id}`}>
          {folder.name}
        </Badge>
      ) : (
        <Badge icon={FolderIcon} muted>
          Sin carpeta
        </Badge>
      )}

      {tags.map((tag) => (
        <Badge key={tag.id} icon={TagIcon} to={`/tags/${tag.id}`}>
          {tag.name}
        </Badge>
      ))}
      {!tags.length && (
        <Badge icon={TagIcon} muted>
          Sin tags
        </Badge>
      )}
    </div>
  )
}
