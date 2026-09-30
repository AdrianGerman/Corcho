import type { NoteType } from "../../types/note"
import { noteTypeLabels } from "../../lib/noteTypeLabels"
import { ToggleChip } from "../ui/ToggleChip"

interface NoteTypeSelectProps {
  value: NoteType
  onChange: (type: NoteType) => void
}

const noteTypes = Object.keys(noteTypeLabels) as NoteType[]

export function NoteTypeSelect({ value, onChange }: NoteTypeSelectProps) {
  return (
    <div>
      <span className="mb-1 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
        Tipo
      </span>
      <div className="flex gap-2">
        {noteTypes.map((type) => (
          <ToggleChip
            key={type}
            shape="block"
            active={value === type}
            onClick={() => onChange(type)}
          >
            {noteTypeLabels[type]}
          </ToggleChip>
        ))}
      </div>
    </div>
  )
}
