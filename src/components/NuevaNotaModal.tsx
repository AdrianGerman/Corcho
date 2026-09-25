import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../lib/db"
import { crearNota, crearTag } from "../lib/notas"
import type { NoteType } from "../types/note"

interface NuevaNotaModalProps {
  isOpen: boolean
  onClose: () => void
}

const tipos: { value: NoteType; label: string }[] = [
  { value: "pizarra", label: "Pizarra" },
  { value: "lista", label: "Lista" },
  { value: "hoja", label: "Hoja" },
]

export default function NuevaNotaModal({
  isOpen,
  onClose,
}: NuevaNotaModalProps) {
  const navigate = useNavigate()
  const carpetas = useLiveQuery(() => db.carpetas.toArray(), [])
  const tagsExistentes = useLiveQuery(() => db.tags.toArray(), [])

  const [nombre, setNombre] = useState("")
  const [tipo, setTipo] = useState<NoteType>("hoja")
  const [carpetaId, setCarpetaId] = useState("")
  const [tagIds, setTagIds] = useState<string[]>([])
  const [nuevoTag, setNuevoTag] = useState("")

  if (!isOpen) return null

  function toggleTag(id: string) {
    setTagIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    )
  }

  async function handleAgregarTag() {
    const nombreTag = nuevoTag.trim()
    if (!nombreTag) return
    const existente = tagsExistentes?.find(
      (t) => t.nombre.toLowerCase() === nombreTag.toLowerCase(),
    )
    if (existente) {
      if (!tagIds.includes(existente.id)) toggleTag(existente.id)
    } else {
      const tag = await crearTag(nombreTag)
      setTagIds((prev) => [...prev, tag.id])
    }
    setNuevoTag("")
  }

  function resetForm() {
    setNombre("")
    setTipo("hoja")
    setCarpetaId("")
    setTagIds([])
    setNuevoTag("")
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const nota = await crearNota({
      nombre,
      tipo,
      carpetaId: carpetaId || null,
      tagIds,
    })
    resetForm()
    onClose()
    navigate(`/nota/${nota.id}`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-5 shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
      >
        <h2 className="mb-4 text-lg font-semibold">Nueva nota</h2>

        <label className="mb-1 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
          Nombre
        </label>
        <input
          autoFocus
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Sin título"
          className="mb-4 w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-neutral-500 dark:border-neutral-700"
        />

        <label className="mb-1 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
          Tipo
        </label>
        <div className="mb-4 flex gap-2">
          {tipos.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTipo(t.value)}
              className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                tipo === t.value
                  ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                  : "border-neutral-300 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <label className="mb-1 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
          Carpeta
        </label>
        <select
          value={carpetaId}
          onChange={(e) => setCarpetaId(e.target.value)}
          className="mb-4 w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-neutral-500 dark:border-neutral-700"
        >
          <option value="">Sin carpeta</option>
          {carpetas?.map((carpeta) => (
            <option key={carpeta.id} value={carpeta.id}>
              {carpeta.nombre}
            </option>
          ))}
        </select>

        <label className="mb-1 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
          Tags
        </label>
        <div className="mb-2 flex flex-wrap gap-2">
          {tagsExistentes?.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggleTag(tag.id)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                tagIds.includes(tag.id)
                  ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                  : "border-neutral-300 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800"
              }`}
            >
              {tag.nombre}
            </button>
          ))}
        </div>
        <div className="mb-5 flex gap-2">
          <input
            value={nuevoTag}
            onChange={(e) => setNuevoTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleAgregarTag()
              }
            }}
            placeholder="Nuevo tag..."
            className="flex-1 rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-neutral-500 dark:border-neutral-700"
          />
          <button
            type="button"
            onClick={handleAgregarTag}
            className="rounded-lg border border-neutral-300 px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            Añadir
          </button>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              resetForm()
              onClose()
            }}
            className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  )
}
