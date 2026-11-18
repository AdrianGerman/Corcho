import { db } from './db'
import { getTrashDaysLeft, TRASH_RETENTION_MS } from './trashRetention'
import type { TrashEntry } from '../types/trash'

export async function moveNoteToTrash (id: string) {
  await db.transaction('rw', db.notes, db.trash, async () => {
    const note = await db.notes.get(id)
    if (!note) return

    await db.trash.put({ ...note, deletedAt: Date.now() })
    await db.notes.delete(id)
  })
}

export async function restoreNoteFromTrash (id: string) {
  await db.transaction(
    'rw',
    db.notes,
    db.trash,
    db.folders,
    db.tags,
    async () => {
      const trashed = await db.trash.get(id)
      if (!trashed) return

      const { deletedAt: _deletedAt, ...note } = trashed

      const folder = note.folderId
        ? await db.folders.get(note.folderId)
        : undefined
      const existingTags = await db.tags.bulkGet(note.tagIds)

      await db.notes.put({
        ...note,
        folderId: folder ? note.folderId : null,
        tagIds: note.tagIds.filter((_, index) => existingTags[index]),
      })
      await db.trash.delete(id)
    },
  )
}

export async function deleteNotePermanently (id: string) {
  await db.trash.delete(id)
}

export async function emptyTrash () {
  await db.trash.clear()
}

export async function purgeExpiredTrash () {
  const cutoff = Date.now() - TRASH_RETENTION_MS
  await db.trash.where('deletedAt').below(cutoff).delete()
}

export async function listTrashEntries (): Promise<TrashEntry[]> {
  const now = Date.now()
  const trashedNotes = await db.trash.orderBy('deletedAt').reverse().toArray()

  return trashedNotes.map((note) => ({
    note,
    daysLeft: getTrashDaysLeft(note.deletedAt, now),
  }))
}