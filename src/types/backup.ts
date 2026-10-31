import type { Folder, Note, Tag } from './note'

export interface BackupFile {
  app: 'corcho'
  version: number
  exportedAt: number
  folders: Folder[]
  tags: Tag[]
  notes: Note[]
}