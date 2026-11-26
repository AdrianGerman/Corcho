import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../lib/db"
import { NoteGrid } from "../components/note/NoteGrid"
import { FolderGrid } from "../components/folder/FolderGrid"
import { SectionTitle } from "../components/ui/SectionTitle"

export function HomePage() {
  const folders = useLiveQuery(() => db.folders.toArray(), [])
  const pinnedNotes = useLiveQuery(
    () => db.notes.orderBy("pinnedAt").reverse().toArray(),
    [],
  )
  const recentNotes = useLiveQuery(
    () =>
      db.notes
        .orderBy("updatedAt")
        .reverse()
        .filter((note) => note.pinnedAt === undefined)
        .limit(10)
        .toArray(),
    [],
  )

  const hasPinnedNotes = !!pinnedNotes?.length

  return (
    <div className="p-6">
      <section className="mb-8">
        <SectionTitle>Carpetas</SectionTitle>
        <FolderGrid folders={folders} emptyMessage="Aún no hay carpetas." />
      </section>

      {hasPinnedNotes && (
        <section className="mb-8">
          <SectionTitle>Fijadas</SectionTitle>
          <NoteGrid notes={pinnedNotes} emptyMessage="No hay notas fijadas." />
        </section>
      )}

      <section>
        <SectionTitle>Notas recientes</SectionTitle>
        <NoteGrid
          notes={recentNotes}
          emptyMessage={
            hasPinnedNotes ? "No hay más notas." : "Aún no hay notas."
          }
        />
      </section>
    </div>
  )
}
