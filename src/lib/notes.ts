import { db } from './db'
import type { Note, NoteType } from '../types/note'

function initialContent (type: NoteType) {
  switch (type) {
    case 'canvas':
      return {}
    case 'list':
      return []
    case 'document':
      return ''
  }
}

export async function createNote (params: {
  name: string
  type: NoteType
  folderId: string | null
  tagIds: string[]
}): Promise<Note> {
  const now = Date.now()

  const note = {
    id: crypto.randomUUID(),
    name: params.name.trim() || 'Sin título',
    folderId: params.folderId,
    tagIds: params.tagIds,
    createdAt: now,
    updatedAt: now,
    type: params.type,
    content: initialContent(params.type),
  } as Note

  await db.notes.add(note)
  return note
}

export async function renameNote (id: string, name: string) {
  await db.notes.update(id, {
    name: name.trim() || 'Sin título',
    updatedAt: Date.now(),
  })
}

export async function deleteNote (id: string) {
  await db.notes.delete(id)
}

export async function createFolder (name: string) {
  const now = Date.now()
  const folder = {
    id: crypto.randomUUID(),
    name: name.trim(),
    createdAt: now,
    updatedAt: now,
  }
  await db.folders.add(folder)
  return folder
}

export async function deleteFolder (id: string) {
  await db.notes.where('folderId').equals(id).modify({ folderId: null })
  await db.folders.delete(id)
}

export async function createTag (name: string) {
  const tag = {
    id: crypto.randomUUID(),
    name: name.trim(),
  }
  await db.tags.add(tag)
  return tag
}