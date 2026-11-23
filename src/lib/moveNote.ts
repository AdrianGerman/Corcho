import { db } from './db'
import { updateNoteFolder } from './notes'

export interface NoteMove {
  noteId: string
  previousFolderId: string | null
}

export async function moveNoteToFolder (
  noteId: string,
  folderId: string | null,
): Promise<NoteMove | null> {
  const note = await db.notes.get(noteId)
  if (!note || note.folderId === folderId) return null

  await updateNoteFolder(noteId, folderId)
  return { noteId, previousFolderId: note.folderId }
}

export async function undoNoteMove ({
  noteId,
  previousFolderId,
}: NoteMove): Promise<boolean> {
  const note = await db.notes.get(noteId)
  if (!note) return false

  const folder = previousFolderId
    ? await db.folders.get(previousFolderId)
    : undefined

  await updateNoteFolder(noteId, folder ? previousFolderId : null)
  return true
}