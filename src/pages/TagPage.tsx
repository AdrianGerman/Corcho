import { useParams, Link } from "react-router-dom"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../lib/db"
import { NoteGrid } from "../components/note/NoteGrid"
import type { Note } from "../types/note"

export function TagPage() {
  const { tagId } = useParams()

  const tags = useLiveQuery(() => db.tags.toArray(), [])
  const notes = useLiveQuery(
    () =>
      tagId
        ? db.notes.where("tagIds").equals(tagId).toArray()
        : Promise.resolve<Note[]>([]),
    [tagId],
  )

  if (!tagId) {
    return (
      <div className="p-6">
        <h2 className="mb-3 text-lg font-semibold">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <Link
              key={tag.id}
              to={`/tags/${tag.id}`}
              className="rounded-full border border-neutral-300 px-3 py-1 text-xs font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h2 className="mb-3 text-lg font-semibold">
        {tags?.find((t) => t.id === tagId)?.name ?? "Tag"}
      </h2>
      <NoteGrid notes={notes} emptyMessage="No hay notas con este tag." />
    </div>
  )
}
