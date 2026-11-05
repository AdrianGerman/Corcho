import { useMemo } from "react"
import type { Note } from "../../types/note"
import { getNoteText } from "../../lib/noteText"
import { DocumentPreview } from "./DocumentPreview"
import { ListPreview } from "./ListPreview"
import { PreviewPlaceholder } from "./PreviewPlaceholder"

interface NotePreviewProps {
  note: Note
}

function PreviewContent({ note, text }: { note: Note; text: string }) {
  switch (note.type) {
    case "canvas":
      return <PreviewPlaceholder type="canvas" grid />
    case "list":
      return note.content.length ? (
        <ListPreview items={note.content} />
      ) : (
        <PreviewPlaceholder type="list" />
      )
    case "document":
      return text ? (
        <DocumentPreview text={text} />
      ) : (
        <PreviewPlaceholder type="document" />
      )
  }
}

export function NotePreview({ note }: NotePreviewProps) {
  const text = useMemo(() => getNoteText(note), [note])

  return (
    <div className="relative h-28 overflow-hidden bg-(--surface-hover)">
      <PreviewContent note={note} text={text} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-(--surface-hover) to-transparent" />
    </div>
  )
}
