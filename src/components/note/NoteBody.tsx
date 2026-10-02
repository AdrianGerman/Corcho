import type { Note } from "../../types/note"
import { CanvasEditor } from "../editor/CanvasEditor"

function EditorPlaceholder({ children }: { children: string }) {
  return (
    <p className="p-6 text-sm text-neutral-400 dark:text-neutral-600">
      {children}
    </p>
  )
}

export function NoteBody({ note }: { note: Note }) {
  switch (note.type) {
    case "canvas":
      return <CanvasEditor note={note} />
    case "list":
      return (
        <EditorPlaceholder>
          {`Aquí va el editor de lista (${note.content.length} ítems).`}
        </EditorPlaceholder>
      )
    case "document":
      return (
        <EditorPlaceholder>
          Aquí va el editor de texto (TipTap).
        </EditorPlaceholder>
      )
  }
}
