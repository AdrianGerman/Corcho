import type { Note } from "../../types/note"
import { CanvasEditor } from "../editor/CanvasEditor"
import { ListEditor } from "../editor/ListEditor"

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
      return <ListEditor note={note} />
    case "document":
      return (
        <EditorPlaceholder>
          Aquí va el editor de texto (TipTap).
        </EditorPlaceholder>
      )
  }
}
