import { useRef, useState, type DragEvent } from 'react'
import { getNoteDragId, isNoteDrag } from '../lib/noteDrag'
import { noteDragState } from '../lib/noteDragState'

export function useNoteDropTarget (onDropNote: (noteId: string) => void) {
  const [isOver, setIsOver] = useState(false)
  const depthRef = useRef(0)

  function handleDragEnter (e: DragEvent) {
    if (!isNoteDrag(e.dataTransfer)) return
    e.preventDefault()
    depthRef.current += 1
    setIsOver(true)
  }

  function handleDragOver (e: DragEvent) {
    if (!isNoteDrag(e.dataTransfer)) return
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  function handleDragLeave (e: DragEvent) {
    if (!isNoteDrag(e.dataTransfer)) return
    depthRef.current = Math.max(0, depthRef.current - 1)
    if (depthRef.current === 0) setIsOver(false)
  }

  function handleDrop (e: DragEvent) {
    const noteId = getNoteDragId(e.dataTransfer)
    depthRef.current = 0
    setIsOver(false)
    noteDragState.set(false)
    if (!noteId) return

    e.preventDefault()
    onDropNote(noteId)
  }

  return {
    isOver,
    dropProps: {
      onDragEnter: handleDragEnter,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    },
  }
}