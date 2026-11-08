import { db } from './db'
import { updateNoteFolder } from './notes'

export async function moveNoteToFolder (
  noteId: string,
  folderId: string | null,
) {
  const note = await db.notes.get(noteId)
  if (!note || note.folderId === folderId) return false

  await updateNoteFolder(noteId, folderId)
  return true
}