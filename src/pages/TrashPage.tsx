import { useLiveQuery } from "dexie-react-hooks"
import { Trash2 } from "lucide-react"
import {
  deleteNotePermanently,
  emptyTrash,
  listTrashEntries,
  restoreNoteFromTrash,
} from "../lib/trash"
import { staggerStyle } from "../lib/stagger"
import { TRASH_RETENTION_DAYS } from "../lib/trashRetention"
import { useToast } from "../hooks/useToast"
import { TrashedNoteRow } from "../components/trash/TrashedNoteRow"
import { Button } from "../components/ui/Button"

export function TrashPage() {
  const { showToast } = useToast()
  const entries = useLiveQuery(listTrashEntries, [])

  async function handleRestore(id: string) {
    await restoreNoteFromTrash(id)
    showToast("Nota restaurada")
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta nota para siempre? No se podrá recuperar."))
      return
    await deleteNotePermanently(id)
    showToast("Nota eliminada definitivamente", "danger")
  }

  async function handleEmpty() {
    const count = entries?.length ?? 0
    const noun = count === 1 ? "nota" : "notas"
    if (
      !confirm(
        `¿Vaciar la papelera? Se borrarán ${count} ${noun} para siempre.`,
      )
    )
      return
    await emptyTrash()
    showToast("Papelera vaciada", "danger")
  }

  return (
    <div className="max-w-2xl p-6">
      <div className="mb-1 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-(--text)">Papelera</h2>
        {!!entries?.length && (
          <Button variant="link-danger" onClick={handleEmpty}>
            Vaciar papelera
          </Button>
        )}
      </div>
      <p className="mb-5 text-sm text-(--text-muted)">
        Las notas eliminadas se conservan {TRASH_RETENTION_DAYS} días y después
        se borran definitivamente.
      </p>

      {entries?.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <Trash2
            strokeWidth={1.5}
            className="size-10 text-(--text-muted) opacity-60"
          />
          <p className="text-sm text-(--text-muted)">La papelera está vacía.</p>
        </div>
      )}

      {!!entries?.length && (
        <ul className="flex flex-col gap-2">
          {entries.map((entry, index) => (
            <TrashedNoteRow
              key={entry.note.id}
              entry={entry}
              style={staggerStyle(index)}
              onRestore={() => handleRestore(entry.note.id)}
              onDelete={() => handleDelete(entry.note.id)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
