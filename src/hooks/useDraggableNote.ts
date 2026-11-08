import { useState, type DragEvent } from 'react'
import { setNoteDragData } from '../lib/noteDrag'
import { noteDragState } from '../lib/noteDragState'

export function useDraggableNote (noteId: string) {
  const [isDragging, setIsDragging] = useState(false)

  function handleDragStart (e: DragEvent<HTMLElement>) {
    setNoteDragData(e.dataTransfer, noteId)
    setTimeout(() => {
      setIsDragging(true)
      noteDragState.set(true)
    }, 0)
  }

  function handleDragEnd () {
    setIsDragging(false)
    noteDragState.set(false)
  }

  return {
    isDragging,
    dragProps: {
      draggable: true,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
    },
  }
}