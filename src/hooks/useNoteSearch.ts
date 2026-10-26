import { useLiveQuery } from 'dexie-react-hooks'
import { searchNotes } from '../lib/searchNotes'

export function useNoteSearch (query: string) {
  return useLiveQuery(() => searchNotes(query), [query])
}