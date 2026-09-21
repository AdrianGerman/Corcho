import { useParams } from "react-router-dom"
import { useLiveQuery } from "dexie-react-hooks"
import { Link } from "react-router-dom"
import { db } from "../lib/db"

export default function CarpetasView() {
  const { carpetaId } = useParams()

  const carpetas = useLiveQuery(() => db.carpetas.toArray(), [])
  const notas = useLiveQuery(
    () =>
      carpetaId
        ? db.notas.where("carpetaId").equals(carpetaId).toArray()
        : db.notas.toArray(),
    [carpetaId],
  )

  if (!carpetaId) {
    return (
      <div className="p-6">
        <h2 className="mb-3 text-lg font-semibold">Carpetas</h2>
        <ul className="space-y-2">
          {carpetas?.map((carpeta) => (
            <li key={carpeta.id}>
              <Link
                to={`/carpetas/${carpeta.id}`}
                className="text-sm font-medium text-neutral-700 hover:underline"
              >
                {carpeta.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h2 className="mb-3 text-lg font-semibold">
        {carpetas?.find((c) => c.id === carpetaId)?.nombre ?? "Carpeta"}
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
