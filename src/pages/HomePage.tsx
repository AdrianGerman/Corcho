import { useLiveQuery } from "dexie-react-hooks"
import { Link } from "react-router-dom"
import { db } from "../lib/db"
import { NoteGrid } from "../components/note/NoteGrid"

export function HomePage() {
  const folders = useLiveQuery(() => db.folders.toArray(), [])
  const recentNotes = useLiveQuery(
    () => db.notes.orderBy("updatedAt").reverse().limit(8).toArray(),
    [],
  )

  return (
    <div className="p-6">
      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Carpetas
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {folders?.map((folder) => (
            <Link
              key={folder.id}
              to={`/folders/${folder.id}`}
              className="rounded-xl border border-neutral-200 bg-white p-4 text-sm font-medium shadow-sm hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-600"
            >
              {folder.name}
            </Link>
          ))}
          {!folders?.length && (
            <p className="text-sm text-neutral-400 dark:text-neutral-600">
              Aún no hay carpetas.
            </p>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Notas recientes
        </h2>
        <NoteGrid
          notes={recentNotes}
          showType
          emptyMessage="Aún no hay notas."
        />
      </section>
    </div>
  )
}
