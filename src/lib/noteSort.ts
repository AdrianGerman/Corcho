import type { Note } from '../types/note'
import { noteTypeMeta } from './noteTypeMeta'

export type NoteSortKey = 'updated' | 'created' | 'name' | 'type'

export const noteSortOptions: { key: NoteSortKey; label: string }[] = [
  { key: 'updated', label: 'Última modificación' },
  { key: 'created', label: 'Fecha de creación' },
  { key: 'name', label: 'Nombre (A-Z)' },
  { key: 'type', label: 'Tipo' },
]

export const DEFAULT_NOTE_SORT: NoteSortKey = 'updated'

export function isNoteSortKey (value: unknown): value is NoteSortKey {
  return noteSortOptions.some((option) => option.key === value)
}

const textCollator = new Intl.Collator('es', {
  sensitivity: 'base',
  numeric: true,
})

const comparators: Record<NoteSortKey, (a: Note, b: Note) => number> = {
  updated: (a, b) => b.updatedAt - a.updatedAt,
  created: (a, b) => b.createdAt - a.createdAt,
  name: (a, b) => textCollator.compare(a.name, b.name),
  type: (a, b) =>
    textCollator.compare(
      noteTypeMeta[a.type].label,
      noteTypeMeta[b.type].label,
    ) || textCollator.compare(a.name, b.name),
}

export function sortNotes (notes: Note[], key: NoteSortKey): Note[] {
  return [...notes].sort(comparators[key])
}