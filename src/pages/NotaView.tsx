import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../lib/db"
import { renombrarNota, eliminarNota } from "../lib/notas"

export default function NotaView() {
  const { notaId } = useParams()
  return <NotaEditor key={notaId} notaId={notaId} />
}

function NotaEditor({ notaId }: { notaId?: string }) {
  const navigate = useNavigate()
  const nota = useLiveQuery(
    () => (notaId ? db.notas.get(notaId) : undefined),
    [notaId],
  )

  const [draftNombre, setDraftNombre] = useState<string | null>(null)
  const nombre = draftNombre ?? nota?.nombre ?? ""

  if (!nota) {
    return (
      <div className="p-6 text-sm text-neutral-400 dark:text-neutral-600">
        Cargando...
      </div>
    )
  }

  async function handleBlur() {
    if (!notaId || draftNombre === null) return
    if (draftNombre.trim() !== nota?.nombre) {
      await renombrarNota(notaId, draftNombre)
    }
  }

  async function handleEliminar() {
    if (!notaId) return
    if (!confirm("¿Eliminar esta nota? Esta acción no se puede deshacer."))
      return
    await eliminarNota(notaId)
    navigate("/")
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-800">
        <input
          value={nombre}
          onChange={(e) => setDraftNombre(e.target.value)}
          onBlur={handleBlur}
          className="w-full bg-transparent text-lg font-semibold outline-none"
        />
        <button
          onClick={handleEliminar}
          className="ml-4 shrink-0 text-xs font-medium text-red-500 hover:underline"
        >
          Eliminar
        </button>
      </header>
      <div className="flex-1 p-6">
        {nota.tipo === "pizarra" && (
          <p className="text-sm text-neutral-400 dark:text-neutral-600">
            Aquí va el canvas de tldraw.
          </p>
        )}
        {nota.tipo === "lista" && (
          <p className="text-sm text-neutral-400 dark:text-neutral-600">
            Aquí va el editor de lista ({nota.contenido.length} ítems).
          </p>
        )}
        {nota.tipo === "hoja" && (
          <p className="text-sm text-neutral-400 dark:text-neutral-600">
            Aquí va el editor de texto (TipTap).
          </p>
        )}
      </div>
    </div>
  )
}
