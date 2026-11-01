import { useRef, useState, type ChangeEvent } from "react"
import { Upload } from "lucide-react"
import { parseBackup } from "../../lib/parseBackup"
import { restoreBackup, type RestoreMode } from "../../lib/backup"
import { useToast } from "../../hooks/useToast"
import type { BackupFile } from "../../types/backup"
import { Button } from "../ui/Button"
import { BackupRestorePanel } from "./BackupRestorePanel"
import { BackupSection } from "./BackupSection"

const REPLACE_WARNING =
  "Se borrarán todas tus notas, carpetas y tags actuales y se reemplazarán por los del respaldo. ¿Continuar?"

export function ImportBackupSection() {
  const { showToast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [pendingBackup, setPendingBackup] = useState<BackupFile | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return

    try {
      setPendingBackup(parseBackup(await file.text()))
      setError(null)
    } catch (err) {
      setPendingBackup(null)
      setError(
        err instanceof Error ? err.message : "No se pudo leer el archivo.",
      )
    }
  }

  async function handleRestore(mode: RestoreMode) {
    if (!pendingBackup) return
    if (mode === "replace" && !confirm(REPLACE_WARNING)) return

    try {
      await restoreBackup(pendingBackup, mode)
      setPendingBackup(null)
      setError(null)
      showToast("Respaldo restaurado")
    } catch {
      setError(
        "No se pudo restaurar el respaldo. Tus datos actuales no se modificaron.",
      )
    }
  }

  return (
    <BackupSection
      title="Importar"
      description="Restaura tus datos desde un archivo de respaldo de Corcho."
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={handleFileChange}
      />

      {pendingBackup ? (
        <BackupRestorePanel
          backup={pendingBackup}
          onRestore={handleRestore}
          onCancel={() => setPendingBackup(null)}
        />
      ) : (
        <Button
          variant="secondary"
          className="flex items-center gap-2"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="size-4" />
          Elegir archivo
        </Button>
      )}

      {error && (
        <p
          key={error}
          role="alert"
          className="animate-shake mt-3 text-xs text-red-500"
        >
          {error}
        </p>
      )}
    </BackupSection>
  )
}
