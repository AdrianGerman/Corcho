import { useParams } from "react-router-dom"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../lib/db"

export default function NotaView() {
  const { notaId } = useParams()
  const nota = useLiveQuery(
    () => (notaId ? db.notas.get(notaId) : undefined),
    [notaId],
  )

  if (!nota) {
    return <div className="p-6 text-sm text-neutral-400">Cargando...</div>
  }

  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-neutral-200 p-4">
        <h2 className="text-lg font-semibold">{nota.nombre}</h2>
      </header>
      <div className="flex-1 p-6">
        {nota.tipo === "pizarra" && (
          <p className="text-sm text-neutral-400">
            Aquí va el canvas de tldraw.
          </p>
        )}
        {nota.tipo === "lista" && (
          <p className="text-sm text-neutral-400">
            Aquí va el editor de lista ({nota.contenido.length} ítems).
          </p>
        )}
        {nota.tipo === "hoja" && (
          <p className="text-sm text-neutral-400">
            Aquí va el editor de texto (TipTap).
          </p>
        )}
      </div>
    </div>
  )
}
