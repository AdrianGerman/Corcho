import type { DocumentNote, ListNote } from '../../types/note'
import { parseDocumentContent } from '../documentContent'
import { documentToMarkdown } from './documentToMarkdown'
import { listToMarkdown } from './listToMarkdown'

export function noteToMarkdown (note: ListNote | DocumentNote) {
  const body = (() => {
    switch (note.type) {
      case 'list':
        return listToMarkdown(note.content)
      case 'document': {
        const json = parseDocumentContent(note.content)
        return json ? documentToMarkdown(json) : ''
      }
    }
  })()

  return body ? `${body}\n` : ''
}