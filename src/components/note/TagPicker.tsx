import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../../lib/db"
import { FieldLabel } from "../ui/FieldLabel"
import { ToggleChip } from "../ui/ToggleChip"

interface TagPickerProps {
  selectedIds: string[]
  onChange: (ids: string[]) => void
}

export function TagPicker({ selectedIds, onChange }: TagPickerProps) {
  const tags = useLiveQuery(() => db.tags.toArray(), [])

  function toggleTag(id: string) {
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((tagId) => tagId !== id)
        : [...selectedIds, id],
    )
  }

  return (
    <div>
      <FieldLabel>Tags</FieldLabel>
      {tags && !tags.length ? (
        <p className="text-xs text-(--text-muted)">
          Aún no hay tags. Créalos desde la sección Tags.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <ToggleChip
              key={tag.id}
              active={selectedIds.includes(tag.id)}
              onClick={() => toggleTag(tag.id)}
            >
              {tag.name}
            </ToggleChip>
          ))}
        </div>
      )}
    </div>
  )
}
