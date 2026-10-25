import type { JSONContent } from '@tiptap/core'
import type { Note } from '../types/note'
import { parseDocumentContent } from './documentContent'

function collectText (node: JSONContent): string {
  if (node.text) return node.text
  const inner = (node.content ?? []).map(collectText).join('')
  return node.type === 'doc' ? inner : `${inner} `
}

export function getNoteText (note: Note): string {
  switch (note.type) {
    case 'list':
      return note.content.map((item) => item.text).join(' ')
    case 'document': {
      const json = parseDocumentContent(note.content)
      return json ? collectText(json).replace(/\s+/g, ' ').trim() : ''
    }
    case 'canvas':
      return ''
  }
}