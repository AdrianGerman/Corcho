import type { BackupFile } from '../types/backup'
import type { Folder, Note, Tag } from '../types/note'
import { noteTypes } from './noteTypeMeta'

export const BACKUP_VERSION = 1

function isRecord (value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isArrayOf<T> (
  value: unknown,
  guard: (item: unknown) => item is T,
): value is T[] {
  return Array.isArray(value) && value.every(guard)
}

function isStringArray (value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function isFolder (value: unknown): value is Folder {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.createdAt === 'number' &&
    typeof value.updatedAt === 'number'
  )
}

function isTag (value: unknown): value is Tag {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string'
  )
}

function isListItem (value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.text === 'string' &&
    typeof value.done === 'boolean' &&
    typeof value.order === 'number'
  )
}

function hasValidContent (note: Record<string, unknown>): boolean {
  switch (note.type) {
    case 'canvas':
      return isRecord(note.content)
    case 'list':
      return Array.isArray(note.content) && note.content.every(isListItem)
    case 'document':
      return typeof note.content === 'string'
    default:
      return false
  }
}

function isNote (value: unknown): value is Note {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.type === 'string' &&
    (noteTypes as string[]).includes(value.type) &&
    (value.folderId === null || typeof value.folderId === 'string') &&
    isStringArray(value.tagIds) &&
    typeof value.createdAt === 'number' &&
    typeof value.updatedAt === 'number' &&
    hasValidContent(value)
  )
}

function parseJson (text: string): unknown {
  try {
    return JSON.parse(text)
  } catch {
    throw new Error('El archivo no es un JSON válido.')
  }
}

export function parseBackup (text: string): BackupFile {
  const data = parseJson(text)

  if (!isRecord(data)) {
    throw new Error('Este archivo no es un respaldo de Corcho.')
  }

  const { app, version, exportedAt, folders, tags, notes } = data

  if (app !== 'corcho') {
    throw new Error('Este archivo no es un respaldo de Corcho.')
  }
  if (typeof version !== 'number' || version > BACKUP_VERSION) {
    throw new Error('Este respaldo viene de una versión más nueva de Corcho.')
  }
  if (
    !isArrayOf(folders, isFolder) ||
    !isArrayOf(tags, isTag) ||
    !isArrayOf(notes, isNote)
  ) {
    throw new Error('El respaldo está dañado o incompleto.')
  }

  return {
    app,
    version,
    exportedAt: typeof exportedAt === 'number' ? exportedAt : Date.now(),
    folders,
    tags,
    notes,
  }
}