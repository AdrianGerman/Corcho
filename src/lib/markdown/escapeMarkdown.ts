const MARKDOWN_SPECIALS = /([\\`*_[\]])/g

export function escapeMarkdown (text: string) {
  return text.replace(MARKDOWN_SPECIALS, '\\$1')
}