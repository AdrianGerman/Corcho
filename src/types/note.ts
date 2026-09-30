import type { TLEditorSnapshot } from 'tldraw'

export type NoteType = 'canvas' | 'list' | 'document'

export interface Folder {
  id: string
  name: string
  createdAt: number
  updatedAt: number
}

export interface Tag {
  id: string
  name: string
  color?: string
}

export interface ListItem {
  id: string
  text: string
  done: boolean
  order: number
}

export type CanvasContent = TLEditorSnapshot | Record<string, never>
export type ListContent = ListItem[]
export type DocumentContent = string

interface NoteBase {
  id: string
  name: string
  folderId: string | null
  tagIds: string[]
  createdAt: number
  updatedAt: number
}

export interface CanvasNote extends NoteBase {
  type: 'canvas'
  content: CanvasContent
}

export interface ListNote extends NoteBase {
  type: 'list'
  content: ListContent
}

export interface DocumentNote extends NoteBase {
  type: 'document'
  content: DocumentContent
}

export type Note = CanvasNote | ListNote | DocumentNote