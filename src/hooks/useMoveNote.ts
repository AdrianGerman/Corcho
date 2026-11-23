import { moveNoteToFolder, undoNoteMove } from '../lib/moveNote'
import type { Folder } from '../types/note'
import { useToast } from './useToast'

export function useMoveNote () {
  const { showToast } = useToast()

  return async function moveNote (noteId: string, folder: Folder | null) {
    const move = await moveNoteToFolder(noteId, folder?.id ?? null)
    if (!move) return

    showToast(
      folder ? `Nota movida a «${folder.name}»` : 'Nota sacada de su carpeta',
      'success',
      {
        label: 'Deshacer',
        onClick: async () => {
          const undone = await undoNoteMove(move)
          if (undone) showToast('Movimiento deshecho')
        },
      },
    )
  }
}