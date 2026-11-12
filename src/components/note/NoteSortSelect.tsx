import { ArrowDownUp } from "lucide-react"
import {
  isNoteSortKey,
  noteSortOptions,
  type NoteSortKey,
} from "../../lib/noteSort"
import { Select } from "../ui/Select"

interface NoteSortSelectProps {
  value: NoteSortKey
  onChange: (key: NoteSortKey) => void
}

export function NoteSortSelect({ value, onChange }: NoteSortSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowDownUp className="size-4 shrink-0 text-(--text-muted)" />
      <Select
        aria-label="Ordenar notas"
        value={value}
        onChange={(e) => {
          if (isNoteSortKey(e.target.value)) onChange(e.target.value)
        }}
        className="py-1.5 text-xs"
      >
        {noteSortOptions.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  )
}
