import { FileText, ListChecks, Shapes, type LucideIcon } from 'lucide-react'
import type { NoteType } from '../types/note'

interface NoteTypeMeta {
  label: string
  icon: LucideIcon
  previewClass: string
  iconClass: string
}

export const noteTypeMeta: Record<NoteType, NoteTypeMeta> = {
  canvas: {
    label: 'Pizarra',
    icon: Shapes,
    previewClass: 'bg-violet-100 dark:bg-violet-500/15',
    iconClass: 'text-violet-600 dark:text-violet-300',
  },
  list: {
    label: 'Lista',
    icon: ListChecks,
    previewClass: 'bg-emerald-100 dark:bg-emerald-500/15',
    iconClass: 'text-emerald-600 dark:text-emerald-300',
  },
  document: {
    label: 'Hoja',
    icon: FileText,
    previewClass: 'bg-sky-100 dark:bg-sky-500/15',
    iconClass: 'text-sky-600 dark:text-sky-300',
  },
}

export const noteTypes = Object.keys(noteTypeMeta) as NoteType[]