import { Link } from "react-router-dom"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../../lib/db"
import { Button } from "../ui/Button"

interface TagCardProps {
  id: string
  name: string
  onDelete: () => void
}

export function TagCard({ id, name, onDelete }: TagCardProps) {
  const noteCount = useLiveQuery(
    () => db.notes.where("tagIds").equals(id).count(),
    [id],
  )

  return (
    <div className="animate-fade-in-up flex items-center justify-between rounded-lg border border-(--border) bg-(--surface-raised) px-4 py-3 shadow-(--shadow-card)">
      <Link
        to={`/tags/${id}`}
        className="flex items-center gap-2 text-sm font-medium text-(--text) hover:text-(--accent)"
      >
        <span>{name}</span>
        <span className="rounded-full bg-(--accent-soft) px-2 py-0.5 text-xs font-semibold text-(--accent)">
          {noteCount ?? 0}
        </span>
      </Link>
      <Button variant="link-danger" onClick={onDelete}>
        Eliminar
      </Button>
    </div>
  )
}
