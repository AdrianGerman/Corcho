import Dexie, { type Table } from 'dexie'
import type { Note, Folder, Tag } from '../types/note'

export class CorchoDatabase extends Dexie {
  notes!: Table<Note, string>
  folders!: Table<Folder, string>
  tags!: Table<Tag, string>

  constructor () {
    super('corcho-db')
    this.version(1).stores({
      notes: 'id, type, folderId, name, updatedAt, *tagIds',
      folders: 'id, name',
      tags: 'id, name',
    })
  }
}

export const db = new CorchoDatabase()