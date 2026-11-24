import { db } from './db'

export async function setNotePinned (id: string, pinned: boolean) {
  await db.notes
    .where('id')
    .equals(id)
    .modify((note) => {
      if (pinned) note.pinnedAt = Date.now()
      else delete note.pinnedAt
    })
}