import { useParams, Link } from "react-router-dom"
import { useLiveQuery } from "dexie-react-hooks"
import type { Nota } from "../types/note"
import { db } from "../lib/db"

export default function TagsView() {
  const { tagId } = useParams()

  const tags = useLiveQuery(() => db.tags.toArray(), [])
  const notas = useLiveQuery(
    () =>
      tagId
        ? db.notas.where("tagIds").equals(tagId).toArray()
        : Promise.resolve<Nota[]>([]),
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
              className="rounded-full border border-neutral-300 px-3 py-1 text-xs font-medium hover:bg-neutral-100"
            >
              {tag.nombre}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h2 className="mb-3 text-lg font-semibold">
        {tags?.find((t) => t.id === tagId)?.nombre ?? "Tag"}
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {notas?.map((nota) => (
          <Link
            key={nota.id}
            to={`/nota/${nota.id}`}
            className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm hover:border-neutral-400"
          >
            <p className="truncate text-sm font-medium">{nota.nombre}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
