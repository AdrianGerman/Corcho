import type { BackupFile } from "../../types/backup"
import type { RestoreMode } from "../../lib/backup"
import { formatLongDate } from "../../lib/formatDate"
import { Button } from "../ui/Button"
import { BackupCounts } from "./BackupCounts"

interface BackupRestorePanelProps {
  backup: BackupFile
  onRestore: (mode: RestoreMode) => void
  onCancel: () => void
}

export function BackupRestorePanel({
  backup,
  onRestore,
  onCancel,
}: BackupRestorePanelProps) {
  return (
    <div className="animate-fade-in">
      <p className="mb-3 text-xs text-(--text-muted)">
        Respaldo del {formatLongDate(backup.exportedAt)}
      </p>
      <BackupCounts
        notes={backup.notes.length}
        folders={backup.folders.length}
        tags={backup.tags.length}
      />

      <ul className="mt-4 flex flex-col gap-1.5 text-xs text-(--text-muted)">
        <li>
          <span className="font-medium text-(--text)">Combinar:</span> agrega lo
          del respaldo y no borra nada. Si una nota existe en ambos lados, se
          queda la versión del respaldo.
        </li>
        <li>
          <span className="font-medium text-(--text)">Reemplazar:</span> deja
          Corcho exactamente como estaba en el respaldo. Lo que tengas ahora y
          no esté en él se borra.
        </li>
      </ul>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button onClick={() => onRestore("merge")}>Combinar</Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          variant="link-danger"
          className="ml-auto"
          onClick={() => onRestore("replace")}
        >
          Reemplazar todo
        </Button>
      </div>
    </div>
  )
}
