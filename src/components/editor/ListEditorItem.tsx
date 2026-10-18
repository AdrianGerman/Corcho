import clsx from "clsx"
import { GripVertical, Trash2 } from "lucide-react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { ListItem } from "../../types/note"

interface ListEditorItemProps {
  item: ListItem
  onToggle: () => void
  onTextChange: (text: string) => void
  onDelete: () => void
}

export function ListEditorItem({
  item,
  onToggle,
  onTextChange,
  onDelete,
}: ListEditorItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={clsx(
        "relative flex items-center gap-2 rounded-lg border border-(--border) bg-(--surface-raised) px-3 py-2 shadow-(--shadow-card)",
        isDragging && "z-10 opacity-70 shadow-(--shadow-raised)",
      )}
    >
      <button
        {...attributes}
        {...listeners}
        type="button"
        className="cursor-grab touch-none text-(--text-muted) transition-colors hover:text-(--text)"
        aria-label="Reordenar"
      >
        <GripVertical className="size-4" />
      </button>
      <input
        type="checkbox"
        checked={item.done}
        onChange={onToggle}
        className="size-4 shrink-0 accent-(--accent)"
      />
      <input
        value={item.text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Ítem de la lista..."
        className={clsx(
          "flex-1 bg-transparent text-sm outline-none",
          item.done ? "text-(--text-muted) line-through" : "text-(--text)",
        )}
      />
      <button
        type="button"
        onClick={onDelete}
        className="text-(--text-muted) transition-colors hover:text-red-500"
        aria-label="Eliminar ítem"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  )
}
