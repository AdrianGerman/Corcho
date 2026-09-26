import { useState, type FormEvent } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../lib/db"
import { crearCarpeta, eliminarCarpeta } from "../lib/notas"

export default function CarpetasView() {
  const { carpetaId } = useParams()
  const navigate = useNavigate()
  const [nombreNueva, setNombreNueva] = useState("")

  const carpetas = useLiveQuery(() => db.carpetas.toArray(), [])
  const notas = useLiveQuery(
    () =>
      carpetaId
        ? db.notas.where("carpetaId").equals(carpetaId).toArray()
        : db.notas.toArray(),
    [carpetaId],
  )

  async function handleCrearCarpeta(e: FormEvent) {
    e.preventDefault()
    if (!nombreNueva.trim()) return
    await crearCarpeta(nombreNueva)
    setNombreNueva("")
  }

  async function handleEliminarCarpeta() {
    if (!carpetaId) return
    if (!confirm("¿Eliminar esta carpeta? Las notas no se borrarán.")) return
    await eliminarCarpeta(carpetaId)
    navigate("/carpetas")
  }

  if (!carpetaId) {
    return (
      <div className="p-6">
        <h2 className="mb-3 text-lg font-semibold">Carpetas</h2>

        <form onSubmit={handleCrearCarpeta} className="mb-5 flex gap-2">
          <input
            value={nombreNueva}
            onChange={(e) => setNombreNueva(e.target.value)}
            placeholder="Nombre de la carpeta..."
            className="flex-1 rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-neutral-500 dark:border-neutral-700"
          />
          <button
            type="submit"
            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Crear
          </button>
        </form>

        <ul className="space-y-2">
          {carpetas?.map((carpeta) => (
            <li key={carpeta.id}>
              <Link
                to={`/carpetas/${carpeta.id}`}
                className="text-sm font-medium text-neutral-700 hover:underline dark:text-neutral-300"
              >
                {carpeta.nombre}
              </Link>
            </li>
          ))}
          {!carpetas?.length && (
            <p className="text-sm text-neutral-400 dark:text-neutral-600">
              Aún no hay carpetas.
            </p>
          )}
        </ul>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {carpetas?.find((c) => c.id === carpetaId)?.nombre ?? "Carpeta"}
        </h2>
        <button
          onClick={handleEliminarCarpeta}
          className="text-xs font-medium text-red-500 hover:underline"
        >
          Eliminar carpeta
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {notas?.map((nota) => (
          <Link
            key={nota.id}
            to={`/nota/${nota.id}`}
            className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-600"
          >
            <p className="truncate text-sm font-medium">{nota.nombre}</p>
          </Link>
        ))}
        {!notas?.length && (
          <p className="text-sm text-neutral-400 dark:text-neutral-600">
            Esta carpeta no tiene notas.
          </p>
        )}
      </div>
    </div>
  )
}
