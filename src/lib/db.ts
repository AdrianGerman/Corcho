import Dexie, { type Table } from 'dexie'
import type { Note, Folder, Tag } from '../types/note'
import type { TrashedNote } from '../types/trash'

export class CorchoDatabase extends Dexie {
  notes!: Table<Note, string>
  folders!: Table<Folder, string>
  tags!: Table<Tag, string>
  trash!: Table<TrashedNote, string>

  constructor () {
    super('corcho-db')
    this.version(1).stores({
      notes: 'id, type, folderId, name, updatedAt, *tagIds',
      folders: 'id, name',
      tags: 'id, name',
    })
    this.version(2).stores({
      trash: 'id, deletedAt',
    })
    this.version(3).stores({
      notes: 'id, type, folderId, name, updatedAt, pinnedAt, *tagIds',
    })
  }
}

export const db = new CorchoDatabase()