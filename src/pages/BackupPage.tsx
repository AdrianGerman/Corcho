import { ExportBackupSection } from "../components/backup/ExportBackupSection"
import { ImportBackupSection } from "../components/backup/ImportBackupSection"

export function BackupPage() {
  return (
    <div className="max-w-2xl p-6">
      <h2 className="mb-1 text-lg font-semibold text-(--text)">Respaldo</h2>
      <p className="mb-5 text-sm text-(--text-muted)">
        Tus notas viven solo en este navegador. Si borras los datos del sitio o
        cambias de navegador, se pierden: un respaldo te protege de eso.
      </p>

      <div className="flex flex-col gap-4">
        <ExportBackupSection />
        <ImportBackupSection />
      </div>
    </div>
  )
}
