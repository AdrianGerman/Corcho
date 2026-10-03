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
      className={`flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 dark:border-neutral-800 dark:bg-neutral-900 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        type="button"
        className="cursor-grab text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
        aria-label="Reordenar"
      >
        ⠿
      </button>
      <input
        type="checkbox"
        checked={item.done}
        onChange={onToggle}
        className="h-4 w-4 shrink-0 accent-neutral-900 dark:accent-white"
      />
      <input
        value={item.text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Ítem de la lista..."
        className={`flex-1 bg-transparent text-sm outline-none ${
          item.done ? "text-neutral-400 line-through dark:text-neutral-600" : ""
        }`}
      />
      <button
        type="button"
        onClick={onDelete}
        className="text-xs font-medium text-red-500 hover:underline"
      >
        Eliminar
      </button>
    </div>
  )
}
