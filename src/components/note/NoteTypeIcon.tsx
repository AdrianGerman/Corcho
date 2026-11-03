import clsx from 'clsx'
import type { NoteType } from '../../types/note'
import { noteTypeMeta } from '../../lib/noteTypeMeta'

interface NoteTypeIconProps {
  type: NoteType
  className?: string
}

export function NoteTypeIcon({ type, className }: NoteTypeIconProps) {
  const { icon: Icon, previewClass, iconClass } = noteTypeMeta[type]

  return (
    <span
      className={clsx(
        'flex shrink-0 items-center justify-center rounded-lg',
        previewClass,
        className,
      )}
    >
      <Icon className={clsx('size-1/2', iconClass)} />
    </span>
  )
}