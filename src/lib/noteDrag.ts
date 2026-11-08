export const NOTE_DRAG_TYPE = 'application/x-corcho-note'

export function setNoteDragData (dataTransfer: DataTransfer, noteId: string) {
  dataTransfer.setData(NOTE_DRAG_TYPE, noteId)
  dataTransfer.effectAllowed = 'move'
}

export function isNoteDrag (dataTransfer: DataTransfer) {
  return dataTransfer.types.includes(NOTE_DRAG_TYPE)
}

export function getNoteDragId (dataTransfer: DataTransfer) {
  return dataTransfer.getData(NOTE_DRAG_TYPE) || null
}