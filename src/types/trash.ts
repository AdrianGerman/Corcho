import type { Note } from './note'

export type TrashedNote = Note & { deletedAt: number }

export interface TrashEntry {
  note: TrashedNote
  daysLeft: number
}