import { useLiveQuery } from "dexie-react-hooks"
import { Download } from "lucide-react"
import { db } from "../../lib/db"
import { createBackup, downloadBackup } from "../../lib/backup"
import { useToast } from "../../hooks/useToast"
import { Button } from "../ui/Button"
import { BackupCounts } from "./BackupCounts"
import { BackupSection } from "./BackupSection"

export function ExportBackupSection() {
  const { showToast } = useToast()

  const counts = useLiveQuery(
    async () => ({
      notes: await db.notes.count(),
      folders: await db.folders.count(),
      tags: await db.tags.count(),
    }),
    [],
  )

  async function handleExport() {
    downloadBackup(await createBackup())
    showToast("Respaldo descargado")
  }

  return (
    <BackupSection
      title="Exportar"
      description="Descarga un archivo con todas tus notas, carpetas y tags. Guárdalo fuera de este navegador (por ejemplo en la nube o en una USB)."
    >
      {counts && <BackupCounts {...counts} />}
      <Button className="mt-4 flex items-center gap-2" onClick={handleExport}>
        <Download className="size-4" />
        Descargar respaldo
      </Button>
    </BackupSection>
  )
}
