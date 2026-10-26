import { db } from './db'
import { getNoteText } from './noteText'
import { buildSnippet, normalizeText } from './textSearch'
import type { Note } from '../types/note'

export interface NoteSearchResult {
  note: Note
  snippet: string | null
}

function byMostRecent (a: NoteSearchResult, b: NoteSearchResult) {
  return b.note.updatedAt - a.note.updatedAt
}

export async function searchNotes (query: string): Promise<NoteSearchResult[]> {
  const trimmed = query.trim()
  const needle = normalizeText(trimmed)
  if (!needle) return []

  const notes = await db.notes.toArray()
  const nameMatches: NoteSearchResult[] = []
  const contentMatches: NoteSearchResult[] = []

  for (const note of notes) {
    if (normalizeText(note.name).includes(needle)) {
      nameMatches.push({ note, snippet: null })
      continue
    }

    const text = getNoteText(note)
    if (normalizeText(text).includes(needle)) {
      contentMatches.push({ note, snippet: buildSnippet(text, trimmed) })
    }
  }

  return [...nameMatches.sort(byMostRecent), ...contentMatches.sort(byMostRecent)]
}