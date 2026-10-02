import { getSnapshot, type Editor } from 'tldraw'
import { updateNoteContent } from './notes'

const SAVE_DELAY_MS = 500

export function startCanvasAutosave (editor: Editor, noteId: string) {
  let timeout: ReturnType<typeof setTimeout> | undefined

  function save () {
    timeout = undefined
    updateNoteContent(noteId, getSnapshot(editor.store))
  }

  const stopListening = editor.store.listen(
    () => {
      clearTimeout(timeout)
      timeout = setTimeout(save, SAVE_DELAY_MS)
    },
    { scope: 'document', source: 'user' },
  )

  return () => {
    stopListening()
    if (timeout !== undefined) {
      clearTimeout(timeout)
      save()
    }
  }
}