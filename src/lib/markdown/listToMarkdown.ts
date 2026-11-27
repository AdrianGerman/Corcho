import type { ListItem } from '../../types/note'
import { escapeMarkdown } from './escapeMarkdown'

export function listToMarkdown (items: ListItem[]) {
  const lines = items
    .filter((item) => item.text.trim())
    .map(
      (item) =>
        `- [${item.done ? 'x' : ' '}] ${escapeMarkdown(item.text.trim())}`,
    )

  return lines.join('\n')
}