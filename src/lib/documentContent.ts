import type { JSONContent } from '@tiptap/core'

export function parseDocumentContent (content: string): JSONContent | undefined {
  if (!content) return undefined
  try {
    return JSON.parse(content)
  } catch {
    return undefined
  }
}

export function serializeDocumentContent (json: JSONContent): string {
  return JSON.stringify(json)
}