const SNIPPET_CHARS_BEFORE = 30
const SNIPPET_CHARS_AFTER = 70

export function normalizeText (value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function buildSnippet (text: string, query: string) {
  const index = normalizeText(text).indexOf(normalizeText(query))
  if (index === -1) return null

  const start = Math.max(0, index - SNIPPET_CHARS_BEFORE)
  const end = Math.min(text.length, index + query.length + SNIPPET_CHARS_AFTER)
  const prefix = start > 0 ? '…' : ''
  const suffix = end < text.length ? '…' : ''

  return `${prefix}${text.slice(start, end).trim()}${suffix}`
}