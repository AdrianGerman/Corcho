import type { JSONContent } from '@tiptap/core'
import { escapeMarkdown } from './escapeMarkdown'

type TextMark = NonNullable<JSONContent['marks']>[number]

function wrapKeepingSpaces (text: string, wrap: (core: string) => string) {
  const match = /^(\s*)([\s\S]*?)(\s*)$/.exec(text)
  if (!match || !match[2]) return text
  return `${match[1]}${wrap(match[2])}${match[3]}`
}

function applyMark (text: string, mark: TextMark) {
  switch (mark.type) {
    case 'bold':
      return wrapKeepingSpaces(text, (core) => `**${core}**`)
    case 'italic':
      return wrapKeepingSpaces(text, (core) => `*${core}*`)
    case 'strike':
      return wrapKeepingSpaces(text, (core) => `~~${core}~~`)
    case 'code':
      return wrapKeepingSpaces(text, (core) => `\`${core}\``)
    case 'link':
      return wrapKeepingSpaces(
        text,
        (core) => `[${core}](${String(mark.attrs?.href ?? '')})`,
      )
    default:
      return text
  }
}

function renderText (node: JSONContent) {
  const marks = node.marks ?? []
  const text = node.text ?? ''
  const isCode = marks.some((mark) => mark.type === 'code')
  return marks.reduce(applyMark, isCode ? text : escapeMarkdown(text))
}

function renderInline (nodes: JSONContent[] = []): string {
  return nodes
    .map((node) => {
      switch (node.type) {
        case 'text':
          return renderText(node)
        case 'hardBreak':
          return '  \n'
        default:
          return renderInline(node.content)
      }
    })
    .join('')
}

function renderCodeBlock (node: JSONContent) {
  const code = (node.content ?? []).map((child) => child.text ?? '').join('')
  const language = String(node.attrs?.language ?? '')

  let fence = '```'
  while (code.includes(fence)) fence += '`'

  return `${fence}${language}\n${code}\n${fence}`
}

function quote (text: string) {
  if (!text) return ''
  return text
    .split('\n')
    .map((line) => (line ? `> ${line}` : '>'))
    .join('\n')
}

function renderListItem (item: JSONContent, marker: string) {
  const body = (item.content ?? []).map(renderBlock).filter(Boolean).join('\n')
  const indent = ' '.repeat(marker.length)
  const lines = body
    .split('\n')
    .map((line, index) => (index === 0 || !line ? line : indent + line))

  return marker + lines.join('\n')
}

function renderList (list: JSONContent, getMarker: (index: number) => string) {
  return (list.content ?? [])
    .map((item, index) => renderListItem(item, getMarker(index)))
    .join('\n')
}

function renderBlock (node: JSONContent): string {
  switch (node.type) {
    case 'paragraph':
      return renderInline(node.content).trim()
    case 'heading': {
      const text = renderInline(node.content).trim()
      if (!text) return ''
      const level = Math.min(Math.max(Number(node.attrs?.level ?? 1), 1), 6)
      return `${'#'.repeat(level)} ${text}`
    }
    case 'bulletList':
      return renderList(node, () => '- ')
    case 'orderedList': {
      const start = Number(node.attrs?.start ?? 1)
      return renderList(node, (index) => `${start + index}. `)
    }
    case 'blockquote':
      return quote(renderBlocks(node.content))
    case 'codeBlock':
      return renderCodeBlock(node)
    case 'horizontalRule':
      return '---'
    default:
      return renderBlocks(node.content)
  }
}

function renderBlocks (nodes: JSONContent[] = []): string {
  return nodes.map(renderBlock).filter(Boolean).join('\n\n')
}

export function documentToMarkdown (json: JSONContent) {
  return renderBlocks(json.content)
}