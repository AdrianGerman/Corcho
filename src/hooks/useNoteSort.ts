import { useState } from 'react'
import {
  DEFAULT_NOTE_SORT,
  isNoteSortKey,
  type NoteSortKey,
} from '../lib/noteSort'

const STORAGE_KEY = 'corcho-note-sort'

function getInitialSort (): NoteSortKey {
  const stored = localStorage.getItem(STORAGE_KEY)
  return isNoteSortKey(stored) ? stored : DEFAULT_NOTE_SORT
}

export function useNoteSort () {
  const [sortKey, setSortKeyState] = useState(getInitialSort)

  function setSortKey (key: NoteSortKey) {
    setSortKeyState(key)
    localStorage.setItem(STORAGE_KEY, key)
  }

  return { sortKey, setSortKey }
}