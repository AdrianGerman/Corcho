import type { Editor } from 'tldraw'
import { renderCanvasThumbnail } from './canvasThumbnail'
import { updateCanvasThumbnail } from './notes'

const IDLE_DELAY_MS = 1500

async function saveThumbnail (editor: Editor, noteId: string) {
  try {
    await updateCanvasThumbnail(noteId, await renderCanvasThumbnail(editor))
  } catch {
    /* empty */
  }
}

export function startCanvasThumbnailSync (
  editor: Editor,
  noteId: string,
  hasThumbnail: boolean,
) {
  let timeout: ReturnType<typeof setTimeout> | undefined

  if (!hasThumbnail && editor.getCurrentPageShapeIds().size > 0) {
    saveThumbnail(editor, noteId)
  }

  const stopListening = editor.store.listen(
    () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        timeout = undefined
        saveThumbnail(editor, noteId)
      }, IDLE_DELAY_MS)
    },
    { scope: 'document', source: 'user' },
  )

  return () => {
    stopListening()
    if (timeout !== undefined) {
      clearTimeout(timeout)
      saveThumbnail(editor, noteId)
    }
  }
}