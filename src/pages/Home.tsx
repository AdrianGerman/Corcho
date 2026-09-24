import { useLiveQuery } from "dexie-react-hooks"
import { Link } from "react-router-dom"
import { db } from "../lib/db"

export default function Home() {
  const carpetas = useLiveQuery(() => db.carpetas.toArray(), [])
  const notasRecientes = useLiveQuery(
    () => db.notas.orderBy("updatedAt").reverse().limit(8).toArray(),
    [],
  )

  return (
    <div className="p-6">
      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Carpetas
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {carpetas?.map((carpeta) => (
            <Link
              key={carpeta.id}
              to={`/carpetas/${carpeta.id}`}
              className="rounded-xl border border-neutral-200 bg-white p-4 text-sm font-medium shadow-sm hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-600"
            >
              {carpeta.nombre}
            </Link>
          ))}
          {!carpetas?.length && (
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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {notasRecientes?.map((nota) => (
            <Link
              key={nota.id}
              to={`/nota/${nota.id}`}
              className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-600"
            >
              <p className="truncate text-sm font-medium">{nota.nombre}</p>
              <p className="mt-1 text-xs uppercase text-neutral-400 dark:text-neutral-500">
                {nota.tipo}
              </p>
            </Link>
          ))}
          {!notasRecientes?.length && (
            <p className="text-sm text-neutral-400 dark:text-neutral-600">
              Aún no hay notas.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
