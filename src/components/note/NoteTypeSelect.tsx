import type { NoteType } from "../../types/note"
import { noteTypeMeta, noteTypes } from "../../lib/noteTypeMeta"
import { FieldLabel } from "../ui/FieldLabel"
import { ToggleChip } from "../ui/ToggleChip"

interface NoteTypeSelectProps {
  value: NoteType
  onChange: (type: NoteType) => void
}

export function NoteTypeSelect({ value, onChange }: NoteTypeSelectProps) {
  return (
    <div>
      <FieldLabel>Tipo</FieldLabel>
      <div className="flex gap-2">
        {noteTypes.map((type) => {
          const { icon: Icon, label } = noteTypeMeta[type]
          return (
            <ToggleChip
              key={type}
              shape="block"
              active={value === type}
              onClick={() => onChange(type)}
              className="flex items-center justify-center gap-2"
            >
              <Icon className="size-4" />
              {label}
            </ToggleChip>
          )
        })}
      </div>
    </div>
  )
}
