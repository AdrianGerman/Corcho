import { useState } from "react"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../../lib/db"
import { createTag } from "../../lib/notes"
import { FieldLabel } from "../ui/FieldLabel"
import { ToggleChip } from "../ui/ToggleChip"
import { TextInput } from "../ui/TextInput"
import { Button } from "../ui/Button"

interface TagPickerProps {
  selectedIds: string[]
  onChange: (ids: string[]) => void
}

export function TagPicker({ selectedIds, onChange }: TagPickerProps) {
  const existingTags = useLiveQuery(() => db.tags.toArray(), [])
  const [newTagName, setNewTagName] = useState("")

  function toggleTag(id: string) {
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((t) => t !== id)
        : [...selectedIds, id],
    )
  }

  async function handleAddTag() {
    const name = newTagName.trim()
    if (!name) return
    const existing = existingTags?.find(
      (t) => t.name.toLowerCase() === name.toLowerCase(),
    )
    if (existing) {
      if (!selectedIds.includes(existing.id)) toggleTag(existing.id)
    } else {
      const tag = await createTag(name)
      onChange([...selectedIds, tag.id])
    }
    setNewTagName("")
  }

  return (
    <div>
      <FieldLabel>Tags</FieldLabel>
      {!!existingTags?.length && (
        <div className="mb-2 flex flex-wrap gap-2">
          {existingTags.map((tag) => (
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
      <div className="flex gap-2">
        <div className="flex-1">
          <TextInput
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleAddTag()
              }
            }}
            placeholder="Nuevo tag..."
          />
        </div>
        <Button type="button" variant="secondary" onClick={handleAddTag}>
          Añadir
        </Button>
      </div>
    </div>
  )
}
