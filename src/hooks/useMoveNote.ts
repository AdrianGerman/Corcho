import { moveNoteToFolder } from '../lib/moveNote'
import type { Folder } from '../types/note'
import { useToast } from './useToast'

export function useMoveNote () {
  const { showToast } = useToast()

  return async function moveNote (noteId: string, folder: Folder | null) {
    const moved = await moveNoteToFolder(noteId, folder?.id ?? null)
    if (!moved) return

    showToast(
      folder ? `Nota movida a «${folder.name}»` : 'Nota sacada de su carpeta',
    )
  }
}