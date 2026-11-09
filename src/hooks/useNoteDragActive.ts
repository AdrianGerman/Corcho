import { useSyncExternalStore } from 'react'
import { noteDragState } from '../lib/noteDragState'

export function useNoteDragActive () {
  return useSyncExternalStore(
    noteDragState.subscribe,
    noteDragState.getSnapshot,
  )
}