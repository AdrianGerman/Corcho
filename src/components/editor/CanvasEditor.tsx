import { useCallback, useState } from "react"
import { Tldraw, loadSnapshot, type Editor } from "tldraw"
import "tldraw/tldraw.css"
import type { CanvasNote } from "../../types/note"
import { startCanvasAutosave } from "../../lib/canvasAutosave"
import { syncCanvasTheme } from "../../lib/canvasTheme"

interface CanvasEditorProps {
  note: CanvasNote
}

export function CanvasEditor({ note }: CanvasEditorProps) {
  const [initialContent] = useState(note.content)
  const noteId = note.id

  const handleMount = useCallback(
    (editor: Editor) => {
      if ("document" in initialContent) {
        loadSnapshot(editor.store, initialContent)
        editor.clearHistory()
      }

      const stopThemeSync = syncCanvasTheme(editor)
      const stopAutosave = startCanvasAutosave(editor, noteId)

      return () => {
        stopThemeSync()
        stopAutosave()
      }
    },
    [initialContent, noteId],
  )

  return (
    <div className="absolute inset-0">
      <Tldraw onMount={handleMount} />
    </div>
  )
}
