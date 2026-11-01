import { db } from './db'
import { formatFileDate } from './formatDate'
import { BACKUP_VERSION } from './parseBackup'
import type { BackupFile } from '../types/backup'

export type RestoreMode = 'merge' | 'replace'

export async function createBackup (): Promise<BackupFile> {
  const [folders, tags, notes] = await db.transaction(
    'r',
    db.folders,
    db.tags,
    db.notes,
    () =>
      Promise.all([
        db.folders.toArray(),
        db.tags.toArray(),
        db.notes.toArray(),
      ]),
  )

  return {
    app: 'corcho',
    version: BACKUP_VERSION,
    exportedAt: Date.now(),
    folders,
    tags,
    notes,
  }
}

export function downloadBackup (backup: BackupFile) {
  const blob = new Blob([JSON.stringify(backup)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `corcho-respaldo-${formatFileDate(backup.exportedAt)}.json`
  link.click()

  URL.revokeObjectURL(url)
}

// Todo ocurre en una sola transacción: si algo falla a la mitad,
// Dexie revierte los cambios y tus datos actuales quedan intactos.
export async function restoreBackup (backup: BackupFile, mode: RestoreMode) {
  await db.transaction('rw', db.folders, db.tags, db.notes, async () => {
    if (mode === 'replace') {
      await Promise.all([
        db.folders.clear(),
        db.tags.clear(),
        db.notes.clear(),
      ])
    }

    await db.folders.bulkPut(backup.folders)
    await db.tags.bulkPut(backup.tags)
    await db.notes.bulkPut(backup.notes)
  })
}