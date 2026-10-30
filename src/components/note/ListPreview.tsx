import clsx from "clsx"
import { Square, SquareCheck } from "lucide-react"
import type { ListItem } from "../../types/note"

const MAX_VISIBLE_ITEMS = 3

interface ListPreviewProps {
  items: ListItem[]
}

export function ListPreview({ items }: ListPreviewProps) {
  const visibleItems = items.slice(0, MAX_VISIBLE_ITEMS)
  const hiddenCount = items.length - visibleItems.length

  return (
    <ul className="flex flex-col gap-1.5 px-3 py-2.5">
      {visibleItems.map((item) => (
        <li key={item.id} className="flex items-center gap-2 text-xs">
          {item.done ? (
            <SquareCheck className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-300" />
          ) : (
            <Square className="size-3.5 shrink-0 text-(--text-muted)" />
          )}
          <span
            className={clsx(
              "truncate",
              item.done ? "text-(--text-muted) line-through" : "text-(--text)",
            )}
          >
            {item.text || "Sin texto"}
          </span>
        </li>
      ))}
      {hiddenCount > 0 && (
        <li className="text-xs text-(--text-muted)">+{hiddenCount} más</li>
      )}
    </ul>
  )
}
