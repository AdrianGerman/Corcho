import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../lib/db"
import { NoteGrid } from "../components/note/NoteGrid"
import { FolderGrid } from "../components/folder/FolderGrid"
import { SectionTitle } from "../components/ui/SectionTitle"

export function HomePage() {
  const folders = useLiveQuery(() => db.folders.toArray(), [])
  const recentNotes = useLiveQuery(
    () => db.notes.orderBy("updatedAt").reverse().limit(10).toArray(),
    [],
  )

  return (
    <div className="p-6">
      <section className="mb-8">
        <SectionTitle>Carpetas</SectionTitle>
        <FolderGrid folders={folders} emptyMessage="Aún no hay carpetas." />
      </section>

      <section>
        <SectionTitle>Notas recientes</SectionTitle>
        <NoteGrid notes={recentNotes} emptyMessage="Aún no hay notas." />
      </section>
    </div>
  )
}
