import type { Note } from "../../types/note"
import { CanvasEditor } from "../editor/CanvasEditor"
import { ListEditor } from "../editor/ListEditor"
import { DocumentEditor } from "../editor/DocumentEditor"

export function NoteBody({ note }: { note: Note }) {
  switch (note.type) {
    case "canvas":
      return <CanvasEditor note={note} />
    case "list":
      return <ListEditor note={note} />
    case "document":
      return <DocumentEditor note={note} />
  }
}
